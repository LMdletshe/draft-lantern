const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const root = path.resolve(__dirname, '..');

function setup() {
  const context = vm.createContext({ console });
  ['src/data/app-config.js','src/data/champions.js','src/data/roster-snapshot.js','src/data/compositions.js',
    'src/data/team-synergies.js','src/core/state.js','src/core/utils.js','src/features/team-builder.js',
    'src/features/draft-analysis.js','src/features/favorite-builder.js','src/features/team-synergy.js',
    'src/features/recommendations.js','src/features/matchups.js'].forEach(file => vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file}));
  vm.runInContext('hydrateBuiltInChampionProfiles()',context);
  return { context, ...vm.runInContext('({ teamSynergyResearch, champions, getChampion, inspectSynergyRule, getTeamSynergyShortlist, getResearchedTeamRecommendations, renderSynergyEvidence })',context) };
}

test('every pair has distinct real champions, reviewed ability sources, a plan and limits', () => {
  const api = setup(); const ids = new Set();
  for (const rule of api.teamSynergyResearch.rules) {
    assert.ok(!ids.has(rule.id)); ids.add(rule.id);
    assert.equal(new Set(rule.champions).size,2);
    rule.champions.forEach(name => assert.ok(api.getChampion(name),name));
    assert.ok(rule.why && rule.play && rule.risk && rule.goals.length);
    assert.ok(rule.refs.length >= 2);
    for (const name of rule.champions) assert.ok(rule.refs.some(ref=>api.teamSynergyResearch.abilities[ref]?.champion===name));
    for (const ref of rule.refs) assert.match(api.teamSynergyResearch.abilities[ref].source,/^https:\/\/ddragon\.leagueoflegends\.com\/cdn\/16\.21\.1\/data\/en_US\/champion\//);
    assert.equal(api.inspectSynergyRule(rule).usable,true,rule.id);
  }
});

test('Jinx gets three by default and at most six distinct native support picks', () => {
  const api = setup(); const team = [api.getChampion('Jinx')];
  assert.equal(api.getTeamSynergyShortlist(team,'Support').length,3);
  for (const limit of [6,12,100]) {
    const picks = api.getTeamSynergyShortlist(team,'Support',{limit});
    assert.equal(picks.length,6);
    assert.equal(new Set(picks.map(p=>p.candidate.name)).size,6);
    picks.forEach(p=>assert.ok(p.candidate.roles.includes('Support') && p.links.length));
  }
});

test('sparse, unknown and empty teams never get generic filler', () => {
  const api = setup();
  const sparse = api.getTeamSynergyShortlist([api.getChampion('Lucian')],'Support',{limit:6});
  assert.equal(sparse.length,1); assert.equal(sparse[0].candidate.name,'Nami');
  assert.equal(api.getTeamSynergyShortlist([api.getChampion('Garen')],'Support').length,0);
  assert.equal(api.getTeamSynergyShortlist([],'Support').length,0);
});

test('selected and excluded champions cannot appear, and goal changes retain research gating', () => {
  const api = setup(); const team = [api.getChampion('Jinx'),api.getChampion('Lulu')];
  for (const goalId of ['balanced','teamfight','protect','early','scaling','pick']) {
    const picks = api.getResearchedTeamRecommendations(team,'Support',{goalId,excludedNames:new Set(['Milio'])});
    assert.ok(picks.length);
    for (const pick of picks) {
      assert.ok(!['Jinx','Lulu','Milio'].includes(pick.candidate.name));
      assert.ok(pick.links.every(link=>team.some(t=>t.name===link.ally.name)));
    }
  }
});

test('changed or missing research references suppress affected suggestions', () => {
  const api = setup();
  vm.runInContext("getChampion('Lulu').official.spells[1].description='Changed mechanic'",api.context);
  assert.ok(!api.getResearchedTeamRecommendations([api.getChampion('Jinx')],'Support').some(p=>p.candidate.name==='Lulu'));
  vm.runInContext("delete teamSynergyResearch.abilities['Milio:W']",api.context);
  assert.ok(!api.getResearchedTeamRecommendations([api.getChampion('Jinx')],'Support').some(p=>p.candidate.name==='Milio'));
});

test('mechanics sourced from tooltips also require review when the tooltip changes', () => {
  const api = setup();
  const rule = api.teamSynergyResearch.rules.find(r=>r.id==='sejuani-darius');
  vm.runInContext("getChampion('Sejuani').official.spells[2].tooltip='Allied attacks no longer stack Frost'",api.context);
  assert.equal(api.inspectSynergyRule(rule).usable,false);
});

test('offline sources are dated and missing live kits cannot be called checked', () => {
  const api = setup(); const rule = api.teamSynergyResearch.rules.find(r=>r.id==='lulu-jinx');
  let link = api.getTeamSynergyShortlist([api.getChampion('Jinx')],'Support',{limit:6}).find(p=>p.candidate.name==='Lulu').links[0];
  assert.match(api.renderSynergyEvidence(link),/Dated ability reference/);
  vm.runInContext("riotData.status='ready'; riotData.version='16.21.1'; getChampion('Lulu').official.spells=[]",api.context);
  assert.equal(api.inspectSynergyRule(rule).status,'reviewed-snapshot');
});

test('multiple researched teammates rank above a single partner without duplicate picks', () => {
  const api = setup();
  const picks = api.getResearchedTeamRecommendations([api.getChampion('Jinx'),api.getChampion("Kog'Maw")],'Support');
  assert.equal(picks[0].partners,2);
  const firstSingle = picks.findIndex(p=>p.partners===1);
  assert.ok(firstSingle > 0);
  assert.ok(picks.slice(0,firstSingle).every(p=>p.partners===2));
});

test('replacing a role discards outgoing synergy and changing draft resets expansion', () => {
  const api = setup();
  vm.runInContext(`
    var recommendRole={value:'Support',innerHTML:''}, recommendGoal={value:'balanced'};
    var recommendMore={hidden:false,setAttribute(){},textContent:''};
    var recommendationStatus={textContent:''}, recommendations={innerHTML:''};
    roleState.ADC='Jinx'; renderRecommendations();
    synergySuggestionsExpanded=true; renderRecommendations();
  `,api.context);
  assert.equal(vm.runInContext("(recommendations.innerHTML.match(/class=\"recommendation-card\"/g)||[]).length",api.context),6);
  vm.runInContext("roleState.ADC='Lucian'; renderRecommendations()",api.context);
  assert.equal(vm.runInContext('synergySuggestionsExpanded',api.context),false);
  assert.match(vm.runInContext('recommendationStatus.textContent',api.context),/Fewer than three/);
  vm.runInContext("roleState.ADC=null; roleState.Top='Garen'; roleState.Mid='Orianna'; recommendRole.value='Mid'; renderRecommendations()",api.context);
  assert.equal(vm.runInContext('recommendations.innerHTML',api.context),'');
  assert.match(vm.runInContext('recommendationStatus.textContent',api.context),/No reviewed Mid/);
});
