const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const {loadLibrary,slug,assessStats}=require('./lib/matchup-validation.cjs');
const root=path.resolve(__dirname,'..');
const cache=path.resolve(process.argv[2]||path.join(root,'.matchup-evidence-cache'));
const destination=path.resolve(process.argv[3]||path.join(root,'work/matchup-strength-audit'));
const api=loadLibrary(root);
const currentPatch='16.22',previousPatch='16.21';
const changedChampions=new Set(['Aurelion Sol','Corki','Kayle','Locke','Maokai','Mel','Naafiri','Rumble','Shen','Smolder','Thresh','Viktor','Yasuo','Zaahen']);
const pages=new Map(),added=new Set(api.sixPickCounterRules.map(r=>r.id));
const cohorts=[];
const count=(rows,key)=>rows.reduce((out,row)=>{out[row[key]]=(out[row[key]]||0)+1;return out;},{});
for(const enemy of api.champions) for(const role of enemy.roles) for(const patch of [currentPatch,previousPatch]) {
  const file=path.join(cache,`${slug(enemy.name)}-${role}-${patch}.json`);
  if(!fs.existsSync(file)) throw Error(`Missing source page ${file}`);
  const page=JSON.parse(fs.readFileSync(file));
  if(!page.verifiedScope || page.enemy!==enemy.name || page.role!==role || page.patch!==patch) throw Error(`Unverified source scope ${file}: ${page.errors.join('; ')}`);
  pages.set(`${enemy.name}:${role}:${patch}`,page);
}
function observation(rule,patch) {
  if(rule.role!==rule.enemyRole) return null;
  return pages.get(`${rule.enemy}:${rule.enemyRole}:${patch}`).rows.find(r=>r.candidate===rule.candidate)||null;
}
function family(rule) {
  if(!added.has(rule.id)) return 'original-authored-plan';
  if(/can change position before/.test(rule.why)) return 'mobility-before-impact';
  if(/prevent lethal damage/.test(rule.why)) return 'shared-death-prevention';
  if(/temporary magic shield|defensive channel|damage-reduction window/.test(rule.why)) return 'damage-mitigation';
  if(/untargetable|outside the mist/.test(rule.why)) return 'untargetability-or-mist';
  if(/projectile|missile/.test(rule.why)) return 'projectile-defense';
  if(/attack-speed reduction/.test(rule.why)) return 'attack-speed-reduction';
  if(/basic attacks|attack sequence/.test(rule.why)) return 'attack-denial';
  if(/remove eligible control|prevent .*slowing effect|prevent the disabling/.test(rule.why)) return 'control-prevention-or-removal';
  return 'specific-other-interaction';
}
const selected=new Map();
for(const enemy of api.champions) for(const role of enemy.roles) {
  const shown=api.getMatchupSuggestions(enemy,role,role,false);
  for(let index=0;index<shown.length;index++) selected.set(shown[index].rule.id,index+1);
}
const entries=api.counterMatchupRules.map(rule=>{
  const sourceGroup=added.has(rule.id)?'six-pick-expansion':'original-library';
  const current=observation(rule,currentPatch),previous=observation(rule,previousPatch);
  const stats=rule.role===rule.enemyRole?assessStats(current,previous):{status:'cross-role-team-context',reason:'Different roles: this audit does not substitute a same-lane sample for this pairing.'};
  const page=api.getMatchupRunePage(api.getChampion(rule.candidate),api.getChampion(rule.enemy),rule.role,rule);
  const patchCautions=[...new Set([rule.candidate,rule.enemy].filter(c=>changedChampions.has(c)))];
  if(rule.role==='ADC') patchCautions.push("Doran's Bow item change; both patches are not an identical item environment");
  const requiresException=rule.enemy==='Olaf' && ['Teemo','Nasus','Malphite'].includes(rule.candidate);
  const inspection=api.inspectCounterRule(rule);
  return {id:rule.id,candidate:rule.candidate,enemy:rule.enemy,role:rule.role,enemyRole:rule.enemyRole,
    sourceGroup,displaySlot:selected.get(rule.id)||null,authoredKind:rule.kind,family:family(rule),
    abilityTextMatchesSnapshot:inspection.usable,runePageLegal:!!page?.available,
    runeOptimizationStatus:'not-empirically-validated',
    pairMechanicReview:requiresException?'missing-defining-opponent-exception':'not-independently-tested',
    mechanicRefs:rule.refs,mechanicSources:rule.refs.map(ref=>api.reviewedAbilityEvidence.abilities[ref].source),
    why:rule.why,play:rule.play,risk:rule.risk,runePlan:rule.runePlan,runeWhy:rule.runeWhy,
    currentSource:rule.role===rule.enemyRole?pages.get(`${rule.enemy}:${rule.enemyRole}:${currentPatch}`).url:null,
    previousSource:rule.role===rule.enemyRole?pages.get(`${rule.enemy}:${rule.enemyRole}:${previousPatch}`).url:null,
    patchCautions,statistics:stats,hardCounterCertified:false};
});
for(const enemy of api.champions) for(const role of enemy.roles) {
  const rows=entries.filter(e=>e.enemy===enemy.name&&e.role===role&&e.enemyRole===role&&e.displaySlot).sort((a,b)=>a.displaySlot-b.displaySlot);
  cohorts.push({enemy:enemy.name,role,displayed:rows.map(r=>({id:r.id,slot:r.displaySlot,candidate:r.candidate,status:r.statistics.status})),
    currentPublishedMatchupRows:pages.get(`${enemy.name}:${role}:${currentPatch}`).rows.length,
    strongSignalCount:rows.filter(r=>/strong-signal$/.test(r.statistics.status)).length,
    persistentStrongSignalCount:rows.filter(r=>r.statistics.status==='persistent-strong-signal').length});
}
const sourcePages=[...pages.values()].map(({rows,errors,...page})=>({...page,publishedRows:rows.length}));
const shown=entries.filter(r=>r.displaySlot);
const sourceTimes=sourcePages.map(page=>page.retrievedAt).sort();
const summary={date:sourceTimes.at(-1).slice(0,10),retrievedFrom:sourceTimes[0],retrievedThrough:sourceTimes.at(-1),rank:'all',region:'all source-supported regions',mode:'source ranked mode',
  criteria:{minimumCurrentGames:1000,strongRawWinRate:53,strongNormalizedDelta2:3,rawWilsonZ:1.96,minimumPreviousGames:1000,previousRawWinRate:50,previousNormalizedDelta2:1,negativeNormalizedDelta2:-1},
  currentPatch,previousPatch,source:'LoLalytics public counters pages',
  sourceCommit:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),
  entries:entries.length,originalEntries:entries.filter(e=>!added.has(e.id)).length,expansionEntries:added.size,
  champions:api.champions.length,roleCohorts:cohorts.length,sourcePages:sourcePages.length,
  publishedMatchupRows:[...pages.values()].reduce((n,p)=>n+p.rows.length,0),
  currentRulesWithPublishedSample:entries.filter(e=>e.statistics.current).length,
  previousRulesWithPublishedSample:entries.filter(e=>e.statistics.previous).length,
  statusesAllEntries:count(entries.map(e=>e.statistics),'status'),
  displayedEntries:shown.length,statusesDisplayed:count(shown.map(e=>e.statistics),'status'),
  originalLibraryStatuses:count(entries.filter(e=>e.sourceGroup==='original-library').map(e=>e.statistics),'status'),
  expansionStatuses:count(entries.filter(e=>e.sourceGroup==='six-pick-expansion').map(e=>e.statistics),'status'),
  firstThreeStatuses:count(shown.filter(e=>e.displaySlot<=3).map(e=>e.statistics),'status'),
  addedDisplaySlotsStatuses:count(shown.filter(e=>e.displaySlot>3).map(e=>e.statistics),'status'),
  families:count(entries.filter(e=>added.has(e.id)),'family'),
  cohortsWithSixPersistentStrongSignals:cohorts.filter(c=>c.persistentStrongSignalCount===6).length,
  cohortsWithNoPublishedCurrentRows:cohorts.filter(c=>!c.currentPublishedMatchupRows).length,
  certifiedHardCounters:0,empiricallyOptimizedRunePages:0};
fs.mkdirSync(destination,{recursive:true});
fs.writeFileSync(path.join(destination,'summary.json'),JSON.stringify(summary,null,2)+'\n');
fs.writeFileSync(path.join(destination,'entries.json'),'[\n'+entries.map(entry=>JSON.stringify(entry)).join(',\n')+'\n]\n');
fs.writeFileSync(path.join(destination,'sources.json'),JSON.stringify(sourcePages,null,2)+'\n');
fs.writeFileSync(path.join(destination,'lanes.json'),JSON.stringify(cohorts,null,2)+'\n');
const csv=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
const columns=['id','sourceGroup','displaySlot','candidate','enemy','role','enemyRole','authoredKind','family','status','currentGames','candidateWinRate','candidateDelta2','raw95Lower','raw95Upper','previousGames','previousCandidateWinRate','previousCandidateDelta2','patchCautions','pairMechanicReview','runeOptimizationStatus','currentSource','previousSource'];
const rows=entries.map(e=>({...e,status:e.statistics.status,currentGames:e.statistics.current?.games,candidateWinRate:e.statistics.current?.candidateWinRate,candidateDelta2:e.statistics.current?.candidateDelta2,raw95Lower:e.statistics.rawWinRate95Interval?.lower,raw95Upper:e.statistics.rawWinRate95Interval?.upper,previousGames:e.statistics.previous?.games,previousCandidateWinRate:e.statistics.previous?.candidateWinRate,previousCandidateDelta2:e.statistics.previous?.candidateDelta2,patchCautions:e.patchCautions.join('; ')}));
fs.writeFileSync(path.join(destination,'entries.csv'),[columns.map(csv).join(','),...rows.map(row=>columns.map(col=>csv(row[col])).join(','))].join('\n')+'\n');
const labels={'persistent-strong-signal':'S','provisional-strong-signal':'s','modest-positive-signal':'+','contradictory-current-signal':'X','no-positive-current-signal':'0','insufficient-current-sample':'?','missing-current-sample':'—'};
fs.writeFileSync(path.join(destination,'lanes.md'),[
  '# All supported lanes — frozen evidence screen','',
  'Scope: pooled all ranks, source ranked mode, current patch 16.22 with separate 16.21 context. These are the actual displayed picks from the audited runtime, not a replacement recommendation list. Read the matching audit report before interpreting the codes.','',
  '**S** = strong current/positive previous screen; **s** = strong current only; **+** = modest positive current signal; **X** = 1,000+ games and normalized effect at least one point against the pick; **0** = other non-positive current result at 1,000+ games; **?** = fewer than 1,000 published games; **—** = no matching published current sample. No code certifies a hard counter.','',
  '| Enemy | App-supported role | Displayed picks 1 → 6 and screen | Published current opponent rows |','| --- | --- | --- | ---: |',
  ...cohorts.map(c=>`| ${c.enemy} | ${c.role} | ${c.displayed.map(r=>`${r.slot}. ${r.candidate} **${labels[r.status]}**`).join('; ')} | ${c.currentPublishedMatchupRows} |`),''].join('\n'));
console.log(JSON.stringify(summary,null,2));
