function getMatchupOutcomeEvidence(rule) {
  if (typeof matchupOutcomeSnapshot === 'undefined') return null;
  const snapshot = matchupOutcomeSnapshot;
  const record = snapshot.records?.[rule.id];
  if (!record || snapshot.rank !== 'all' || snapshot.region !== 'all' || snapshot.mode !== 'ranked'
    || snapshot.provider !== 'LoLalytics' || snapshot.version !== counterMatchupReview.patch
    || (riotData.version && riotData.version !== snapshot.version)
    || rule.role !== rule.enemyRole || record.role !== rule.role || record.enemyRole !== rule.enemyRole
    || record.candidate !== rule.candidate || record.enemy !== rule.enemy || record.runePlan !== rule.runePlan
    || !Array.isArray(record.patchCautions) || record.patchCautions.length || !Array.isArray(record.refs)
    || record.refs.join('|') !== rule.refs.join('|')
    || !getChampion(rule.candidate)?.roles.includes(rule.role) || !getChampion(rule.enemy)?.roles.includes(rule.enemyRole)
    || !inspectCounterRule(rule).usable || !buildResearchedRunePage(rule.runePlan, rule)?.available) return null;
  const validSource = (source, patch) => {
    if (typeof source !== 'string') return false;
    const lane = {Top:'top',Jungle:'jungle',Mid:'middle',ADC:'bottom',Support:'support'}[rule.role];
    const champion = ({'Nunu & Willump':'nunu','Renata Glasc':'renata'})[rule.enemy] || rule.enemy.toLowerCase().replace(/[^a-z0-9]/g,'');
    return source === `https://lolalytics.com/lol/${champion}/counters/?lane=${lane}&vslane=${lane}&tier=all&patch=${patch}`;
  };
  if (!validSource(record.source, snapshot.patch) || !validSource(record.previousSource, snapshot.previousPatch)) return null;
  const current = record.current, previous = record.previous;
  const validNumbers = row => row && row.candidate === rule.candidate && [row.games, row.candidateWinRate, row.candidateDelta2].every(Number.isFinite)
    && Number.isInteger(row.games) && row.games >= 1000 && row.candidateWinRate >= 0 && row.candidateWinRate <= 100;
  if (!validNumbers(current) || !validNumbers(previous) || current.candidateWinRate < 53 || current.candidateDelta2 < 3
    || previous.candidateWinRate < 50 || previous.candidateDelta2 < 1) return null;
  const p = current.candidateWinRate / 100, n = current.games, z = 1.96;
  const lower = (p + z*z/(2*n) - z*Math.sqrt(p*(1-p)/n + z*z/(4*n*n))) / (1 + z*z/n);
  if (lower <= 0.5) return null;
  return record;
}

function getQualifiedMatchupResults(enemy, role, enemyPosition) {
  return getResearchedCounters(enemy, role, enemyPosition, false)
    .filter(result => getMatchupOutcomeEvidence(result.rule))
    .sort((a,b) => {
      const first = getMatchupOutcomeEvidence(a.rule).current, second = getMatchupOutcomeEvidence(b.rule).current;
      return second.candidateDelta2 - first.candidateDelta2 || second.games - first.games || a.candidate.name.localeCompare(b.candidate.name);
    });
}

function getCounterCoverage() {
  const qualified = counterMatchupRules.filter(rule => getMatchupOutcomeEvidence(rule));
  return { championsTotal: champions.length, championsCovered: new Set(qualified.map(rule => rule.enemy)).size,
    rolesTotal: champions.reduce((count, champion) => count + champion.roles.length, 0),
    rolesCovered: new Set(qualified.map(rule => `${rule.enemy}:${rule.enemyRole}`)).size,
    entries: qualified.length, maximumPicks: counterMatchupReview.maximumPicks };
}

function renderMatchupOutcomeEvidence(rule) {
  const evidence = getMatchupOutcomeEvidence(rule);
  if (!evidence) return '';
  const current = evidence.current, previous = evidence.previous;
  return `<div class="matchup-outcome"><strong>Stat-supported option · dated snapshot</strong>
    <p>${escapeHtml(rule.candidate)} game win rate: ${current.candidateWinRate.toFixed(2)}% in ${current.games.toLocaleString()} games. Normalized matchup effect: +${current.candidateDelta2.toFixed(2)} percentage points.</p>
    <p>All ranks · all source-supported regions · ranked mode · ${escapeHtml(rule.role)} vs ${escapeHtml(rule.enemyRole)} · patch ${escapeHtml(matchupOutcomeSnapshot.patch)}. Captured ${escapeHtml(evidence.retrievedAt.slice(0,10))}.</p>
    <details class="counter-sources"><summary>Outcome sources and limits</summary>
      <p><a href="${escapeHtml(evidence.source)}" target="_blank" rel="noopener noreferrer">LoLalytics ${escapeHtml(matchupOutcomeSnapshot.patch)} table</a>. Previous patch ${escapeHtml(matchupOutcomeSnapshot.previousPatch)}: ${previous.candidateWinRate.toFixed(2)}% in ${previous.games.toLocaleString()} games, +${previous.candidateDelta2.toFixed(2)} pp normalized effect. <a href="${escapeHtml(evidence.previousSource)}" target="_blank" rel="noopener noreferrer">Previous-patch table</a>.</p>
      <p>These are pooled game outcomes, not lane-win rates, controlled duels or proof of a hard counter at every rank. The single-publisher screen requires 1,000+ games in each patch and a positive normalized effect; independent tactical validation is still needed. Rune choices below are authored and are not statistically optimized.</p>
    </details></div>`;
}
