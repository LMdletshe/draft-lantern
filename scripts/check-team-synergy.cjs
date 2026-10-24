const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ console });
for (const file of ['src/data/app-config.js','src/data/champions.js','src/data/roster-snapshot.js',
  'src/data/compositions.js','src/data/team-synergies.js','src/core/utils.js',
  'src/features/draft-analysis.js','src/features/favorite-builder.js','src/features/recommendations.js',
  'src/features/team-synergy.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
vm.runInContext('hydrateBuiltInChampionProfiles()',context);
const api = vm.runInContext('({champions,roles,teamSynergyResearch,getChampion,getTeamSynergyCoverage,inspectSynergyRule})',context);

async function run() {
  const source = api.teamSynergyResearch;
  const coverage = api.getTeamSynergyCoverage();
  assert.equal(coverage.championsCovered,coverage.championsTotal,'Champion coverage gap');
  assert.equal(coverage.rolesCovered,coverage.rolesTotal,'Supported role coverage gap');
  assert.equal(coverage.pairs,source.rules.length,'Unusable pairing');
  const result = {...coverage, patch:source.patch,reviewed:source.date,abilities:Object.keys(source.abilities).length,liveChecked:false};
  if (process.argv.includes('--live')) {
    const get = async url => {
      const response = await fetch(url);
      if (!response.ok) throw Error(`${response.status}: ${url}`);
      return response.json();
    };
    const base = 'https://ddragon.leagueoflegends.com';
    const latest = (await get(`${base}/api/versions.json`))[0];
    assert.equal(latest,source.patch,'New patch requires explicit research review');
    const refsByUrl = new Map();
    for (const [ref,ability] of Object.entries(source.abilities)) {
      if (!refsByUrl.has(ability.source)) refsByUrl.set(ability.source,[]);
      refsByUrl.get(ability.source).push([ref,ability]);
    }
    const queue = [...refsByUrl];
    let matched = 0;
    await Promise.all(Array.from({length:6},async()=>{
      while (queue.length) {
        const [url,refs] = queue.shift();
        const payload = await get(url);
        const champion = Object.values(payload.data)[0];
        for (const [ref,ability] of refs) {
          const actual = ability.slot==='P'?champion.passive:champion.spells['QWER'.indexOf(ability.slot)];
          assert.equal(actual?.name,ability.name,`${ref}: name changed`);
          assert.equal(actual?.description,ability.description,`${ref}: description changed`);
          if (ability.tooltip) assert.equal(actual?.tooltip,ability.tooltip,`${ref}: tooltip changed`);
          matched += 1;
        }
      }
    }));
    result.liveChecked = true;
    result.liveAbilitiesMatched = matched;
  }
  if (process.argv.includes('--write-audit')) {
    const lines = ['# Team synergy coverage audit','',`Reviewed ${source.date}, Riot Data Dragon ${source.patch}.`,
      '',`${coverage.championsCovered}/${coverage.championsTotal} champions and ${coverage.rolesCovered}/${coverage.rolesTotal} supported champion-role combinations have at least one usable partner in another role. ${coverage.pairs} reviewed pairs; ${result.abilities} referenced abilities.`,
      '', 'This is coverage of researched tactical options, not every possible pair, three picks in every open role, or measured win-rate superiority. An entry below names a partner and their compatible native role for each supported role of the anchor champion.',
      '', '| Champion | Supported role → example partner (different role) |','|---|---|'];
    for (const champion of [...api.champions].sort((a,b)=>a.name.localeCompare(b.name))) {
      const options = champion.roles.map(role=>{
        const rule = source.rules.find(rule=>rule.champions.includes(champion.name) && api.inspectSynergyRule(rule).usable
          && api.getChampion(rule.champions.find(name=>name!==champion.name)).roles.some(partnerRole=>partnerRole!==role));
        const partner = api.getChampion(rule.champions.find(name=>name!==champion.name));
        return `${role} → ${partner.name} (${partner.roles.find(partnerRole=>partnerRole!==role)})`;
      });
      lines.push(`| ${champion.name} | ${options.join('; ')} |`);
    }
    fs.writeFileSync(path.join(root,'docs/TEAM_SYNERGY_COVERAGE.md'),lines.join('\n')+'\n');
  }
  console.log(JSON.stringify(result,null,2));
}
run().catch(error=>{console.error(error);process.exitCode=1;});
