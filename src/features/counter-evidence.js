function normalizeCounterEvidence(text) {
  return stripRiotText(text).toLowerCase().replace(/\s+/g, " ").trim();
}

function inspectCounterRule(rule) {
  let current = 0;
  const changed = [];
  for (const ref of rule.refs) {
    const reviewed = reviewedAbilityEvidence.abilities[ref];
    if (!reviewed) return { usable: false, status: "missing-reference", changed: [ref] };
    const champion = getChampion(reviewed.champion);
    const actual = reviewed.slot === "P" ? champion?.official?.passive
      : champion?.official?.spells?.["QWER".indexOf(reviewed.slot)];
    if (!actual) continue;
    if (normalizeCounterEvidence(actual.description) !== normalizeCounterEvidence(reviewed.description)
      || actual.name !== reviewed.name) changed.push(ref);
    else current += 1;
  }
  return {
    usable: changed.length === 0,
    status: changed.length ? "needs-review" : current === rule.refs.length ? "current-kit" : "reviewed-snapshot",
    changed
  };
}

function getResearchedCounterRule(champion, enemy, role, enemyPosition) {
  if (!champion || !enemy) return null;
  return counterMatchupRules
    .filter((rule) => rule.candidate === champion.name && rule.enemy === enemy.name)
    .filter((rule) => !role || rule.role === role)
    .filter((rule) => !enemyPosition || rule.enemyRole === enemyPosition)
    .filter((rule) => inspectCounterRule(rule).usable)
    .sort((a, b) => (a.kind === "direct" ? 0 : 1) - (b.kind === "direct" ? 0 : 1)
      || a.priority - b.priority || a.role.localeCompare(b.role))[0] || null;
}

function makeResearchedCounterResult(rule) {
  const candidate = getChampion(rule.candidate);
  const opponent = getChampion(rule.enemy);
  const inspection = inspectCounterRule(rule);
  if (!candidate || !opponent || !inspection.usable) return null;
  return {
    candidate, opponent, rule, inspection,
    roleFit: getRoleFit(candidate, rule.role),
    tier: rule.kind === "direct"
      ? { key: "hard", label: "Direct mechanic counter", className: "is-hard" }
      : { key: "conditional", label: "Conditional lane answer", className: "is-edge" }
  };
}

function sortResearchedCounters(results) {
  return results.filter(Boolean).sort((a, b) =>
    (a.rule.kind === "direct" ? 0 : 1) - (b.rule.kind === "direct" ? 0 : 1)
    || a.rule.priority - b.rule.priority
    || a.candidate.name.localeCompare(b.candidate.name)
    || a.opponent.name.localeCompare(b.opponent.name));
}

function getResearchedCounters(enemy, role, enemyPosition, includeOffRole = false) {
  if (!enemy) return [];
  return sortResearchedCounters(counterMatchupRules
    .filter((rule) => rule.enemy === enemy.name && rule.role === role && rule.enemyRole === enemyPosition)
    .map(makeResearchedCounterResult)
    .filter((result) => result && (includeOffRole || !result.roleFit.offRole)));
}

function getResearchedExplorerMatchups(champion, opponentRole = "All") {
  if (!champion) return [];
  return sortResearchedCounters(counterMatchupRules
    .filter((rule) => rule.candidate === champion.name && (opponentRole === "All" || rule.enemyRole === opponentRole))
    .map(makeResearchedCounterResult));
}

function getCounterEvidenceStatus(inspection) {
  return inspection.status === "current-kit"
    ? `Ability text matches loaded patch ${riotData.version || counterMatchupReview.patch}`
    : `Reviewed ability snapshot ${counterMatchupReview.patch}`;
}

function renderCounterInteraction(result) {
  const { rule, inspection } = result;
  const context = rule.role === rule.enemyRole ? `${rule.role} matchup`
    : `${rule.role} answer to enemy ${rule.enemyRole}; team context`;
  return `
    <div class="counter-proof"><span>${escapeHtml(context)}</span><strong>${inspection.status === "current-kit" ? "Kit checked" : "Dated reference"}</strong></div>
    <div class="counter-interaction"><h4>Specific interaction</h4><p>${escapeHtml(rule.why)}</p></div>
    <div class="lane-tip"><strong>Execute the counter:</strong> ${escapeHtml(rule.play)}</div>
    <div class="counter-risk"><strong>When it fails:</strong> ${escapeHtml(rule.risk)}</div>
    <details class="counter-sources">
      <summary>Evidence and patch review</summary>
      <p>${escapeHtml(getCounterEvidenceStatus(inspection))}. Tactical review: ${escapeHtml(counterMatchupReview.patch)} (${escapeHtml(counterMatchupReview.date)}). Official abilities support the interaction; the counter plan is authored analysis, not Riot matchup statistics.</p>
      <ul>${uniqueList(rule.refs).map((ref) => {
        const ability = reviewedAbilityEvidence.abilities[ref];
        return `<li><a href="${escapeHtml(ability.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ability.champion)} ${escapeHtml(ability.slot)} · ${escapeHtml(ability.name)}</a><span>${escapeHtml(ability.description)}</span></li>`;
      }).join("")}</ul>
    </details>`;
}
