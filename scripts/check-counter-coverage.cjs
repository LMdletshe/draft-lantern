const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const useLive = process.argv.includes("--live");
const writeReport = process.argv.includes("--write-report");
const context = vm.createContext({ console, fetch });
const files = [
  "src/data/app-config.js", "src/data/champions.js", "src/data/roster-snapshot.js",
  "src/core/utils.js", "src/data/runes.js", "src/data/counter-matchups.js",
  "src/data/counter-roster.js", "src/data/counter-options.js", "src/data/ability-evidence.js",
  "src/features/counter-evidence.js", "src/features/runes.js", "src/features/matchups.js"
];
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
vm.runInContext("hydrateBuiltInChampionProfiles()", context);

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}

async function main() {
  if (useLive) {
    const base = "https://ddragon.leagueoflegends.com";
    const version = (await getJson(`${base}/api/versions.json`))[0];
    const roster = await getJson(`${base}/cdn/${version}/data/en_US/champion.json`);
    const queue = Object.values(roster.data);
    const officialChampions = [];
    await Promise.all(Array.from({ length: 8 }, async () => {
      while (queue.length) {
        const item = queue.shift();
        const detail = await getJson(`${base}/cdn/${version}/data/en_US/champion/${item.id}.json`);
        officialChampions.push(detail.data[item.id]);
      }
    }));
    context.loadedResearch = { version, champions: officialChampions };
    await vm.runInContext(`(async () => {
      const curated = new Map(champions.filter(c => !c.generated).map(c => [c.name, c]));
      const expanded = loadedResearch.champions.sort((a,b) => a.name.localeCompare(b.name)).map(official => {
        const champion = curated.get(official.name);
        if (!champion) return createGeneratedChampion(official, loadedResearch.version, official);
        champion.roles = getRolesForOfficialChampion(official);
        champion.official = getOfficialRecord(official, loadedResearch.version, official);
        return hydrateChampionProfile(champion, official);
      });
      champions.length = 0; champions.push(...expanded);
      riotData.status = 'ready'; riotData.version = loadedResearch.version;
      await loadRuneCatalogue(loadedResearch.version);
      if (!runeCatalogueIsLive) throw new Error('Live rune catalogue failed; live validation cannot use fallback data');
    })()`, context);
  }

  const audit = vm.runInContext(`(() => {
    const errors = [];
    const rows = [];
    for (const rule of counterMatchupRules) {
      const candidate = getChampion(rule.candidate), enemy = getChampion(rule.enemy);
      if (!candidate || !enemy || !candidate.roles.includes(rule.role) || !enemy.roles.includes(rule.enemyRole)) {
        errors.push({id:rule.id, reason:'Unknown champion or unsupported role'}); continue;
      }
      if (!inspectCounterRule(rule).usable) errors.push({id:rule.id, reason:'Changed or missing ability reference'});
      const page = getMatchupRunePage(candidate, enemy, rule.role, rule);
      if (!page?.available || page.alternative && !page.alternative.page?.available) errors.push({id:rule.id, reason:'Rune page needs review'});
    }
    for (const enemy of champions) {
      if (!getResearchedExplorerMatchups(enemy).length) errors.push({id:enemy.name, reason:'No outgoing Explorer plan'});
      for (const role of enemy.roles) {
        const answers = getResearchedCounters(enemy, role, role);
        if (new Set(answers.map(answer => answer.candidate.name)).size < counterMatchupReview.minimumPicks) errors.push({id:enemy.name+':'+role, reason:'Fewer than '+counterMatchupReview.minimumPicks+' distinct native same-role picks'});
        rows.push({enemy:enemy.name, role, answers:answers.map(a=>({champion:a.candidate.name, type:a.rule.kind, plan:a.rule.runePlan}))});
      }
    }
    return { reviewPatch:counterMatchupReview.patch, loadedPatch:riotData.version || bundledChampionRoster.version,
      source:riotData.status === 'ready' ? 'live Riot Data Dragon' : 'bundled dated roster',
      coverage:getCounterCoverage(), abilityReferences:Object.keys(reviewedAbilityEvidence.abilities).length,
      runePlans:Object.keys(counterRunePlans).length, rows, errors };
  })()`, context);
  if (writeReport && !audit.errors.length) {
    const lines = ["# Counter coverage audit", "",
      `Research patch: **${audit.reviewPatch}**. Validated with **${audit.source} ${audit.loadedPatch}**.`, "",
      `Coverage: **${audit.coverage.championsCovered}/${audit.coverage.championsTotal} champions**, **${audit.coverage.rolesCovered}/${audit.coverage.rolesTotal} supported role combinations**, **${audit.coverage.entries} directed entries**, **${audit.runePlans} full rune plans**, and **${audit.abilityReferences} referenced official abilities**.`, "",
      "Every row has at least three distinct native same-role picks, each with a legal rune page. Both mechanical counters and conditional lane plans are included. The order reflects authored interaction type and priority, not measured win rates. Cross-role team-context entries are additional to this table.", "",
      "Only explicitly researched pairings receive pages. Coverage of every champion does not mean every arbitrary champion pair, off-role matchup, or future patch has been reviewed.", "",
      "Reproduce with `node scripts/check-counter-coverage.cjs --live --write-report`. The command reports drift and never rewrites ability evidence or matchup decisions.", "",
      "| Enemy | Role | Researched answers |", "| --- | --- | --- |",
      ...audit.rows.map(row => `| ${row.enemy} | ${row.role} | ${row.answers.map(answer => `${answer.champion} (${answer.type === 'direct' ? 'mechanical' : 'conditional'})`).join('; ')} |`), ""
    ];
    fs.writeFileSync(path.join(root, "docs/counter-coverage.md"), lines.join("\n"));
  }
  const { rows, ...summary } = audit;
  console.log(JSON.stringify(summary, null, 2));
  if (audit.errors.length) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
