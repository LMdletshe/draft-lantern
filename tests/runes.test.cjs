const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const root = path.resolve(__dirname, "..");

function setup() {
  const context = vm.createContext({ console });
  ["src/data/app-config.js", "src/data/champions.js", "src/data/roster-snapshot.js", "src/core/utils.js", "src/data/runes.js", "src/data/counter-matchups.js", "src/data/counter-roster.js", "src/data/counter-options.js", "src/data/ability-evidence.js", "src/features/counter-evidence.js", "src/features/runes.js", "src/features/matchups.js"]
    .forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));
  // Exercise the actual production offline roster and role assignments. The
  // fixture does not invent champion identities or infer roles from the rules.
  vm.runInContext(`
    hydrateBuiltInChampionProfiles();
    riotData.version = counterMatchupReview.patch;
    riotData.status = 'ready';
  `, context);
  return { context, ...vm.runInContext("({ champions, roles, runeIndex, bundledRuneCatalogue, bundledChampionRoster, counterMatchupRules, counterRunePlans, reviewedAbilityEvidence, getChampion, getMatchupRunePage, renderMatchupRunes, loadRuneCatalogue, inspectCounterRule, getResearchedCounters, getResearchedExplorerMatchups, getCounterCoverage, getEvidenceBackedDifficulty, renderResearchedCounterCard })", context) };
}

function validatePage(page, index) {
  assert.ok(page);
  assert.equal(page.available, true, page.reviewReason);
  assert.equal(page.primary.length, 4);
  assert.equal(page.secondary.length, 2);
  assert.equal(page.shards.length, 3);
  assert.notEqual(page.primaryTree, page.secondaryTree);
  assert.equal(new Set([...page.primary, ...page.secondary]).size, 6);
  page.primary.forEach((id, row) => {
    assert.equal(index.get(id).tree, page.primaryTree);
    assert.equal(index.get(id).row, row);
  });
  page.secondary.forEach((id) => {
    assert.equal(index.get(id).tree, page.secondaryTree);
    assert.ok(index.get(id).row > 0);
  });
  assert.notEqual(index.get(page.secondary[0]).row, index.get(page.secondary[1]).row);
}

function cataloguePayload(api) {
  return JSON.parse(JSON.stringify(api.bundledRuneCatalogue.trees)).map((tree) => ({
    ...tree, slots: tree.slots.map((runes) => ({ runes: runes.map((rune) => ({ ...rune, longDesc: rune.effect })) }))
  }));
}

test("every researched direction, role and alternative has references and a legal page", () => {
  const api = setup();
  const ids = new Set();
  const usedPlans = new Set();
  for (const rule of api.counterMatchupRules) {
    assert.ok(!ids.has(rule.id), rule.id); ids.add(rule.id);
    assert.ok(api.roles.includes(rule.role) && api.roles.includes(rule.enemyRole));
    assert.notEqual(rule.candidate, rule.enemy, rule.id);
    assert.ok(api.getChampion(rule.candidate)?.roles.includes(rule.role), rule.id);
    assert.ok(api.getChampion(rule.enemy)?.roles.includes(rule.enemyRole), rule.id);
    assert.equal(api.inspectCounterRule(rule).status, "current-kit", rule.id);
    assert.ok(rule.refs.length >= 2 && rule.why && rule.play && rule.risk && rule.runeWhy);
    const page = api.getMatchupRunePage(api.getChampion(rule.candidate), api.getChampion(rule.enemy), rule.role, rule);
    validatePage(page, api.runeIndex); usedPlans.add(rule.runePlan);
    if (page.alternative) { validatePage(page.alternative.page, api.runeIndex); usedPlans.add(rule.alternative.plan); }
  }
  assert.equal(usedPlans.size, Object.keys(api.counterRunePlans).length);
});

test("every bundled champion and supported role has at least three distinct native picks and legal runes", () => {
  const api = setup();
  assert.equal(api.champions.length, api.bundledChampionRoster.champions.length);
  assert.equal(api.champions.length, 173);
  for (const enemy of api.champions) {
    assert.ok(api.getResearchedExplorerMatchups(enemy).length, `${enemy.name} needs an Explorer plan`);
    for (const role of enemy.roles) {
      const answers = api.getResearchedCounters(enemy, role, role, false);
      assert.ok(new Set(answers.map(answer => answer.candidate.name)).size >= 3, `${enemy.name} as ${role} needs three distinct native picks`);
      for (const answer of answers) validatePage(api.getMatchupRunePage(answer.candidate, enemy, role, answer.rule), api.runeIndex);
    }
  }
  const coverage = api.getCounterCoverage();
  assert.equal(coverage.championsCovered, 173);
  assert.equal(coverage.rolesTotal, 263);
  assert.equal(coverage.rolesCovered, coverage.rolesTotal);
  assert.equal(coverage.entries, api.counterMatchupRules.length);
  assert.equal(coverage.minimumPicks, 3);
});

test("offline startup retains every champion and marks the kit as a dated reference", () => {
  const api = setup();
  vm.runInContext("riotData.status='offline'; riotData.version=null;", api.context);
  const coverage = api.getCounterCoverage();
  assert.equal(coverage.championsCovered, api.champions.length);
  const row = api.getResearchedCounters(api.getChampion("Locke"), "Jungle", "Jungle")[0];
  assert.equal(row.inspection.status, "reviewed-snapshot");
  assert.match(api.renderResearchedCounterCard(row, 0), /Dated reference/);
  assert.doesNotMatch(api.renderResearchedCounterCard(row, 0), /Kit checked/);
});

test("coverage drops when a lane has fewer than three usable picks or a new champion appears", () => {
  const api = setup();
  api.getChampion("Milio").official.spells[3].description = "A changed ability without the reviewed cleanse.";
  const remaining = api.getResearchedCounters(api.getChampion("Renata Glasc"), "Support", "Support");
  assert.ok(remaining.length < 3);
  assert.ok(!remaining.some(answer => answer.candidate.name === "Milio"));
  assert.ok(api.getCounterCoverage().rolesCovered < 263);
  const coverage = api.getCounterCoverage();
  api.champions.push({ name: "Future unreviewed champion", roles: ["Support"], tags: [], scores: {} });
  assert.equal(api.getCounterCoverage().championsTotal, 174);
  assert.equal(api.getCounterCoverage().championsCovered, coverage.championsCovered);
  assert.equal(api.getResearchedCounters(api.getChampion("Future unreviewed champion"), "Support", "Support").length, 0);
});

test("Malphite results require a researched direction; high generic scores cannot add Aatrox", () => {
  const api = setup();
  const results = api.getResearchedCounters(api.getChampion("Malphite"), "Top", "Top", true);
  assert.equal(results.length, 3);
  assert.equal(results[0].candidate.name, "Sylas");
  assert.ok(!results.some((result) => result.candidate.name === "Aatrox"));
  assert.equal(api.getMatchupRunePage(api.getChampion("Aatrox"), api.getChampion("Malphite"), "Top"), null);
  assert.equal(results[0].rule.kind, "direct");
  assert.equal(results[1].rule.kind, "conditional");
});

test("unknown pairs and reverse directions never receive a generic rune page", () => {
  const api = setup();
  assert.equal(api.getMatchupRunePage(api.getChampion("Malphite"), api.getChampion("Sylas"), "Top"), null);
  const enemy = { ...api.getChampion("Annie"), name: "Unresearched enemy" };
  assert.equal(api.getResearchedCounters(enemy, "Mid", "Mid", true).length, 0);
  assert.equal(api.getMatchupRunePage(api.getChampion("Lissandra"), enemy, "Mid"), null);
  assert.match(api.renderMatchupRunes(api.getChampion("Lissandra"), enemy, "Mid"), /No researched rune plan/);
});

test("role and cross-role context are enforced", () => {
  const api = setup();
  assert.equal(api.getMatchupRunePage(api.getChampion("Sylas"), api.getChampion("Malphite"), "Mid"), null);
  const ashe = api.getChampion("Ashe");
  assert.ok(api.getResearchedCounters(ashe, "Support", "ADC").some((result) => result.candidate.name === "Braum"));
  assert.ok(!api.getResearchedCounters(ashe, "ADC", "ADC").some((result) => result.candidate.name === "Braum"));
  const sameRole = api.getResearchedCounters(ashe, "Support", "Support");
  assert.ok(sameRole.every((row) => row.rule.enemyRole === "Support" && row.rule.role === "Support"));
  assert.ok(sameRole.some((row) => row.rule.id === "Braum:Ashe:Support:Support"));
});

test("Explorer uses the same researched pairing and rune page", () => {
  const api = setup();
  const poppy = api.getChampion("Poppy");
  const row = api.getResearchedExplorerMatchups(poppy, "Top").find((result) => result.opponent.name === "Riven");
  assert.ok(row);
  const finder = api.getResearchedCounters(api.getChampion("Riven"), "Top", "Top").find((result) => result.candidate.name === "Poppy");
  assert.equal(finder.rule.id, row.rule.id);
  assert.ok(api.getMatchupRunePage(poppy, row.opponent, row.rule.role, row.rule).primary.includes(8437));
});

test("changed ability text removes the affected counter and its rune page", () => {
  const api = setup();
  api.getChampion("Poppy").official.spells[1].description = "This ability no longer stops dashes.";
  const rule = api.counterMatchupRules.find((row) => row.candidate === "Poppy" && row.enemy === "Riven");
  assert.equal(api.inspectCounterRule(rule).usable, false);
  assert.ok(!api.getResearchedCounters(api.getChampion("Riven"), "Top", "Top").some((row) => row.candidate.name === "Poppy"));
  assert.equal(api.getMatchupRunePage(api.getChampion("Poppy"), api.getChampion("Riven"), "Top"), null);
});

test("missing live ability data is identified as a dated reference", () => {
  const api = setup();
  delete api.getChampion("Poppy").official;
  const rule = api.counterMatchupRules.find((row) => row.candidate === "Poppy" && row.enemy === "Riven");
  assert.equal(api.inspectCounterRule(rule).status, "reviewed-snapshot");
  const row = api.getResearchedCounters(api.getChampion("Riven"), "Top", "Top")[0];
  assert.match(api.renderResearchedCounterCard(row, 0), /Dated reference/);
});

test("rendered cards name the interaction and failure window without invented proof percentages", () => {
  const api = setup();
  const row = api.getResearchedCounters(api.getChampion("Malphite"), "Top", "Top")[0];
  const html = api.renderResearchedCounterCard(row, 0);
  assert.match(html, /Hijack/); assert.match(html, /When it fails/); assert.match(html, /Second Wind/);
  assert.doesNotMatch(html, /% proof|Hard-counter confidence|General advantage/);
  assert.notEqual(api.getEvidenceBackedDifficulty(99).key, "hard");
});

test("researched exceptions prevent misleading blanket counter claims", () => {
  const api = setup();
  const find = (candidate, enemy) => api.counterMatchupRules.find((rule) => rule.candidate === candidate && rule.enemy === enemy);
  assert.match(find("Poppy", "Vi").risk, /does not cancel.*unstoppable/i);
  assert.match(find("Poppy", "Hecarim").risk, /unstoppable/i);
  assert.match(find("Morgana", "Blitzcrank").risk, /removes.*shields/i);
  assert.match(find("Lulu", "Pyke").risk, /shield alone does not/i);
  assert.match(find("Rammus", "Master Yi").risk, /immune.*slowing.*true damage/i);
  assert.match(find("Vayne", "Garen").runeWhy, /above 60% health/);
});

test("resource and champion restrictions are respected by researched pages", () => {
  const api = setup();
  for (const rule of api.counterMatchupRules.filter((rule) => ["Rumble", "Yasuo", "Shen"].includes(rule.candidate))) {
    const page = api.getMatchupRunePage(api.getChampion(rule.candidate), api.getChampion(rule.enemy), rule.role);
    assert.ok(![...page.primary, ...page.secondary].some((id) => id === 8009 || id === 8226));
  }
  const cass = api.getMatchupRunePage(api.getChampion("Cassiopeia"), api.getChampion("Sylas"), "Mid");
  assert.ok(![...cass.primary, ...cass.secondary].includes(8304));
});

test("catalogue failures keep a dated fallback", async () => {
  const api = setup();
  api.context.fetch = async () => { throw new Error("offline"); };
  await api.loadRuneCatalogue("future");
  assert.match(api.renderMatchupRunes(api.getChampion("Sylas"), api.getChampion("Malphite"), "Top"), /Bundled rune snapshot 16\.21\.1/);
});

test("live rune effects are loaded and changed effects require review", async () => {
  const api = setup();
  const payload = cataloguePayload(api);
  api.context.fetch = async () => ({ ok: true, json: async () => payload });
  await api.loadRuneCatalogue("current-test");
  assert.match(api.renderMatchupRunes(api.getChampion("Sylas"), api.getChampion("Malphite"), "Top"), /Riot rune catalogue current-test/);
  payload.flatMap((tree) => tree.slots.flatMap((slot) => slot.runes)).find((rune) => rune.id === 8444).longDesc = "A completely different effect";
  await api.loadRuneCatalogue("changed-test");
  const page = api.getMatchupRunePage(api.getChampion("Sylas"), api.getChampion("Malphite"), "Top");
  assert.equal(page.available, false);
  assert.match(page.reviewReason, /effect changed/);
  const answers = api.getResearchedCounters(api.getChampion("Malphite"), "Top", "Top");
  assert.ok(!answers.some(answer => answer.candidate.name === "Sylas"));
  assert.ok(api.getCounterCoverage().rolesCovered < api.getCounterCoverage().rolesTotal);
});

test("removed and relocated runes suppress incompatible pages", async () => {
  for (const move of [false, true]) {
    const api = setup();
    const payload = cataloguePayload(api);
    const precision = payload.find((tree) => tree.id === 8000);
    const rune = precision.slots[0].runes.find((row) => row.id === 8010);
    precision.slots[0].runes = precision.slots[0].runes.filter((row) => row.id !== 8010);
    if (move) precision.slots[1].runes.push(rune);
    api.context.fetch = async () => ({ ok: true, json: async () => payload });
    await api.loadRuneCatalogue("changed");
    const html = api.renderMatchupRunes(api.getChampion("Sylas"), api.getChampion("Malphite"), "Top");
    assert.match(html, /needs review/); assert.doesNotMatch(html, /<details/);
  }
});

test("malformed catalogue and wrong supplied rule cannot produce a false page", async () => {
  const api = setup();
  api.context.fetch = async () => ({ ok: true, json: async () => [] });
  await api.loadRuneCatalogue("invalid");
  const sylas = api.getChampion("Sylas"), malphite = api.getChampion("Malphite");
  validatePage(api.getMatchupRunePage(sylas, malphite, "Top"), api.runeIndex);
  assert.equal(api.getMatchupRunePage(sylas, malphite, "Top", api.counterMatchupRules[0]), null);
  assert.equal(api.renderMatchupRunes(null, null), "");
});
