const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {parsePage,sourceUrl,wilson,assessStats}=require('../scripts/lib/matchup-validation.cjs');

const request={enemy:'Aatrox',role:'Top',patch:'16.22'};
const fixture=`<html><head><title>Aatrox counters</title></head><body>
  ALL RANKS Patch 16.22 <h2>Aatrox top vs top Counters</h2>
  <div q:key="aatrox_top_ranked_list_all_16.22_all__top">Average All Ranks Win Rate: 49.96%</div>
  <a href="/lol/aatrox/vs/jax/build/?tier=all"><span>Jax</span> 53.27% VS Δ<sub>1</sub> 2.13 • Δ<sub>2</sub> 2.63 51.14% VS 1,010 Games</a>
  </body></html>`;

test('source parsing reverses the enemy perspective and retains sample size',()=>{
  const page=parsePage(fixture,request);
  assert.deepEqual(page.errors,[]);
  assert.equal(page.rows.length,1);
  assert.equal(page.rows[0].candidateWinRate,46.73);
  assert.equal(page.rows[0].candidateDelta2,-2.63);
  assert.equal(page.rows[0].games,1010);
});
test('rank, patch, lane and regional source mismatches fail closed',()=>{
  for(const html of [fixture.replace('ALL RANKS','EMERALD+'),fixture.replaceAll('16.22','16.21'),fixture.replace('top vs top','top vs jungle'),fixture.replace('_ranked_list_all_','_ranked_list_kr_')]) {
    assert.equal(parsePage(html,request).verifiedScope,false);
  }
  assert.equal(parsePage('<h1>Access denied</h1>',request).verifiedScope,false);
  const url=new URL(sourceUrl('Renata Glasc','Support','16.22'));
  assert.equal(url.pathname,'/lol/renata/counters/');
  assert.equal(url.searchParams.get('lane'),'support');
  assert.equal(url.searchParams.get('vslane'),'support');
  assert.equal(new URL(sourceUrl('Nunu & Willump','Jungle','16.22')).pathname,'/lol/nunu/counters/');
});
test('extreme low-volume results and raw win rates without a normalized edge cannot qualify',()=>{
  assert.equal(assessStats({games:100,candidateWinRate:80,candidateDelta2:20}).status,'insufficient-current-sample');
  assert.equal(assessStats({games:5000,candidateWinRate:54,candidateDelta2:-2}).status,'contradictory-current-signal');
  assert.equal(assessStats({games:5000,candidateWinRate:49,candidateDelta2:4}).status,'no-positive-current-signal');
});
test('a strong current association cannot invent previous-patch corroboration',()=>{
  const current={games:2000,candidateWinRate:56,candidateDelta2:4};
  assert.equal(assessStats(current,null).status,'provisional-strong-signal');
  assert.equal(assessStats(current,{games:200,candidateWinRate:56,candidateDelta2:4}).status,'provisional-strong-signal');
  assert.equal(assessStats(current,{games:5000,candidateWinRate:53,candidateDelta2:2}).status,'persistent-strong-signal');
  const prior={games:5000,candidateWinRate:53,candidateDelta2:2};
  assert.deepEqual(assessStats(null,prior).previous,prior);
  assert.equal(assessStats(null,prior).status,'missing-current-sample');
});
test('raw win-rate uncertainty is broad for small samples and is never a counter certificate',()=>{
  const interval=wilson(50,100);
  assert.ok(Math.abs(interval.lower-40.383)<0.01);
  assert.ok(Math.abs(interval.upper-59.617)<0.01);
  assert.equal(wilson(50,0),null);
  assert.ok(wilson(55,1000).lower>50);
});
test('frozen audit covers every directed rule and exactly six slots per supported lane without certifying them',()=>{
  const directory=path.join(__dirname,'../docs/research/matchups-2026-11-05');
  const entries=JSON.parse(fs.readFileSync(path.join(directory,'entries.json')));
  const lanes=JSON.parse(fs.readFileSync(path.join(directory,'lanes.json')));
  const sources=JSON.parse(fs.readFileSync(path.join(directory,'sources.json')));
  assert.equal(entries.length,2193);
  assert.equal(new Set(entries.map(e=>e.id)).size,2193);
  assert.equal(lanes.length,263);
  assert.equal(sources.length,526);
  assert.ok(sources.every(s=>s.verifiedScope&&/^[a-f0-9]{64}$/.test(s.sha256)&&!Number.isNaN(Date.parse(s.retrievedAt))));
  assert.ok(lanes.every(l=>l.displayed.length===6&&new Set(l.displayed.map(p=>p.candidate)).size===6));
  assert.ok(entries.every(e=>e.hardCounterCertified===false&&e.runeOptimizationStatus==='not-empirically-validated'));
  for(const entry of entries) {
    if(entry.role!==entry.enemyRole) {assert.equal(entry.statistics.status,'cross-role-team-context');assert.equal(entry.currentSource,null);continue;}
    const result=assessStats(entry.statistics.current,entry.statistics.previous);
    assert.equal(result.status,entry.statistics.status,entry.id);
    if(entry.statistics.current) assert.equal(entry.statistics.current.candidateWinRate,Number((100-entry.statistics.current.enemyWinRate).toFixed(2)));
  }
});
