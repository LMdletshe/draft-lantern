const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const lanes = { Top:'top', Jungle:'jungle', Mid:'middle', ADC:'bottom', Support:'support' };
function loadLibrary(root) {
  const context = vm.createContext({console});
  for (const file of ['src/data/app-config.js','src/data/champions.js','src/data/roster-snapshot.js','src/core/utils.js','src/data/runes.js','src/data/counter-matchups.js','src/data/counter-roster.js','src/data/counter-options.js','src/data/counter-six-options.js','src/data/ability-evidence.js','src/data/matchup-outcomes.js','src/features/counter-evidence.js','src/features/matchup-outcomes.js','src/features/runes.js','src/features/matchups.js']) {
    vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'), context, {filename:file});
  }
  vm.runInContext('hydrateBuiltInChampionProfiles()',context);
  return vm.runInContext(`({ champions, counterMatchupRules, sixPickCounterRules, counterRunePlans,
    reviewedAbilityEvidence, bundledRuneCatalogue, getChampion, getMatchupSuggestions,
    inspectCounterRule, getMatchupRunePage, counterMatchupReview })`,context);
}
function slug(name) { return ({'Nunu & Willump':'nunu','Renata Glasc':'renata'})[name] || name.toLowerCase().replace(/[^a-z0-9]/g,''); }
function cleanHtml(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ')
    .replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
}
function sourceUrl(enemy, role, patch) {
  const url = new URL(`https://lolalytics.com/lol/${slug(enemy)}/counters/`);
  for (const [key,value] of Object.entries({lane:lanes[role],vslane:lanes[role],tier:'all',patch})) url.searchParams.set(key,value);
  return url.href;
}
function parsePage(html, request) {
  const text = cleanHtml(html);
  const title = cleanHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const heading = `${request.enemy} ${lanes[request.role]} vs ${lanes[request.role]} Counters`;
  const errors = [];
  if (!text.includes('ALL RANKS')) errors.push('All-ranks filter not confirmed');
  if (!text.includes(`Patch ${request.patch}`)) errors.push('Requested patch not confirmed');
  if (!text.includes(heading)) errors.push('Requested champion and both lane directions not confirmed');
  // This is the source's SSR cache key, exposed in its returned page. It
  // confirms all regions, ranked mode and all ranks rather than trusting URL filters.
  const expectedKey = `${slug(request.enemy)}_${lanes[request.role]}_ranked_list_all_${request.patch}_all__${lanes[request.role]}`;
  if (!html.includes(expectedKey)) errors.push('All-region ranked source scope not confirmed');
  const rows = [];
  for (const match of html.matchAll(/<a\b[^>]*href="([^"\s]*\/vs\/[^"\s]*\/build\/[^"\s]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const rowText = cleanHtml(match[2]);
    const values = rowText.match(/^(.+?) ([\d.]+)% VS Δ\s*1 ([+−-]?[\d.]+) • Δ\s*2 ([+−-]?[\d.]+) ([\d.]+)% VS ([\d,]+) Games$/);
    if (!values) continue;
    const [ ,candidate,enemyWinRate,enemyDelta1,enemyDelta2,opponentsVsCandidateWinRate,games] = values;
    const number = value => Number(value.replace(/,/g,'').replace('−','-'));
    const row = {candidate,enemyWinRate:number(enemyWinRate),enemyDelta1:number(enemyDelta1),enemyDelta2:number(enemyDelta2),opponentsVsCandidateWinRate:number(opponentsVsCandidateWinRate),games:number(games)};
    if (row.games < 1 || row.enemyWinRate < 0 || row.enemyWinRate > 100 || Math.abs(row.enemyDelta2)>100) {errors.push('Invalid numeric row');continue;}
    if (rows.some(existing=>existing.candidate===candidate)) {errors.push('Duplicate candidate row');continue;}
    // The page is viewed from the enemy's perspective: lower enemy win rate
    // and negative enemy Delta 2 favor the suggested candidate.
    rows.push({...row,candidateWinRate:Number((100-row.enemyWinRate).toFixed(2)),candidateDelta2:-row.enemyDelta2});
  }
  // An empty low-volume/off-role page is a valid missing sample, not a parser success.
  if (!rows.length && text.includes('Games') && /\d+(?:\.\d+)?% VS/.test(text)) errors.push('Numeric matchup content could not be parsed');
  return { ...request,title,verifiedScope:errors.length===0,errors,
    reportedAverageWinRate:Number(text.match(/Average All Ranks Win Rate: ([\d.]+)%/)?.[1])||null,
    pageMinimumGames:100,rows,sha256:crypto.createHash('sha256').update(html).digest('hex') };
}
function wilson(winRate,games,z=1.96) {
  if (!(games>0) || !(winRate>=0 && winRate<=100)) return null;
  const p=winRate/100, d=1+z*z/games, center=(p+z*z/(2*games))/d;
  const half=z*Math.sqrt(p*(1-p)/games+z*z/(4*games*games))/d;
  return {lower:100*(center-half),upper:100*(center+half)};
}
function assessStats(current,previous) {
  if (!current) return {status:'missing-current-sample',previous:previous||null,reason:'No matching row in the verified current-patch page (source only lists 100+ game matchups).'};
  const interval=wilson(current.candidateWinRate,current.games);
  const base={current,previous:previous||null,rawWinRate95Interval:interval};
  if (current.games<1000) return {...base,status:'insufficient-current-sample',reason:'Fewer than 1,000 current-patch games; descriptive evidence only.'};
  if (current.candidateDelta2<=-1) return {...base,status:'contradictory-current-signal',reason:'Normalized matchup effect favors the enemy by at least one percentage point.'};
  if (current.candidateDelta2<=0 || current.candidateWinRate<50) return {...base,status:'no-positive-current-signal',reason:'Current normalized effect or raw game win rate does not favor the suggested pick.'};
  if (current.candidateDelta2>=3 && current.candidateWinRate>=53 && interval.lower>50) {
    if (previous && previous.games>=1000 && previous.candidateDelta2>=1 && previous.candidateWinRate>=50) return {...base,status:'persistent-strong-signal',reason:'Strong current association and a positive previous-patch association; still requires tactical and patch review.'};
    return {...base,status:'provisional-strong-signal',reason:'Strong current association without sufficient positive previous-patch corroboration.'};
  }
  return {...base,status:'modest-positive-signal',reason:'Some positive association, below the predeclared strong-effect threshold.'};
}
module.exports={lanes,slug,cleanHtml,sourceUrl,parsePage,wilson,assessStats,loadLibrary};
