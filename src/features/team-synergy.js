// This shortlist is intentionally separate from the broad model used by draft
// simulations and full-team variants. A modeled tag match cannot qualify a pick.
function inspectSynergyRule(rule) {
  let current = 0;
  for (const ref of rule.refs) {
    const evidence = teamSynergyResearch.abilities[ref];
    if (!evidence || !rule.champions.includes(evidence.champion)) return { usable: false, status: "missing-reference" };
    const champion = getChampion(evidence.champion);
    if (!champion) return { usable: false, status: "missing-champion" };
    const actual = evidence.slot === "P" ? champion.official?.passive
      : champion.official?.spells?.["QWER".indexOf(evidence.slot)];
    if (!actual) continue;
    const normalize = (text) => stripRiotText(text).toLowerCase().replace(/\s+/g, " ").trim();
    if (actual.name !== evidence.name || normalize(actual.description) !== normalize(evidence.description)
      || (evidence.tooltip && actual.tooltip && normalize(actual.tooltip) !== normalize(evidence.tooltip))) {
      return { usable: false, status: "needs-review" };
    }
    if (!evidence.tooltip || actual.tooltip) current += 1;
  }
  return { usable: true, status: current === rule.refs.length && riotData.status === "ready" ? "current-kit" : "reviewed-snapshot" };
}

function getResearchedTeamRecommendations(team, role, options = {}) {
  if (!team.length || !roles.includes(role)) return [];
  const goalId = options.goalId || "balanced";
  const excludedNames = options.excludedNames || new Set();
  return champions.filter((candidate) => candidate.roles.includes(role)
    && !team.some((ally) => ally.name === candidate.name) && !excludedNames.has(candidate.name))
    .map((candidate) => {
      const links = teamSynergyResearch.rules
        .filter((rule) => rule.champions.includes(candidate.name))
        .map((rule) => ({ rule, ally: team.find((ally) => ally.name !== candidate.name && rule.champions.includes(ally.name)), inspection: inspectSynergyRule(rule) }))
        .filter((link) => link.ally && link.inspection.usable)
        .sort((a, b) => Number(b.rule.goals.includes(goalId)) - Number(a.rule.goals.includes(goalId))
          || a.rule.priority - b.rule.priority || a.rule.id.localeCompare(b.rule.id));
      if (!links.length) return null;
      const fit = scoreRecommendation(candidate, team, role, goalId);
      const partners = new Set(links.map((link) => link.ally.name)).size;
      const goalMatches = links.filter((link) => link.rule.goals.includes(goalId)).length;
      return { ...fit, links, partners, goalMatches };
    })
    .filter(Boolean)
    .sort((a, b) => b.partners - a.partners || b.goalMatches - a.goalMatches
      || a.links[0].rule.priority - b.links[0].rule.priority
      || b.score - a.score || a.candidate.name.localeCompare(b.candidate.name));
}

function getTeamSynergyShortlist(team, role, options = {}) {
  const limit = Number(options.limit) >= 6 ? 6 : 3;
  return getResearchedTeamRecommendations(team, role, options).slice(0, limit);
}

function renderSynergyEvidence(link) {
  const { rule, inspection, ally } = link;
  return `<section class="synergy-link">
    <h4>With ${escapeHtml(ally.name)}</h4>
    <p>${escapeHtml(rule.why)}</p>
    <p><strong>Play it:</strong> ${escapeHtml(rule.play)}</p>
    <p><strong>Limits:</strong> ${escapeHtml(rule.risk)}</p>
    <details class="synergy-sources">
      <summary>Research and ability sources</summary>
      <p>${inspection.status === "current-kit" ? `Ability text matches loaded patch ${escapeHtml(riotData.version)}.` : `Dated ability reference ${escapeHtml(teamSynergyResearch.patch)}; live verification unavailable.`} Tactical review ${escapeHtml(teamSynergyResearch.date)}. Component mechanics are sourced; the synergy plan is authored analysis, not a tested win-rate advantage.</p>
      <ul>${rule.refs.map((ref) => {
        const ability = teamSynergyResearch.abilities[ref];
        // Tooltip templates contain unresolved game variables; hide those while
        // retaining their mechanic text for the few rules that require it.
        const text = stripRiotText(ability.tooltip || ability.description).replace(/\{\{[^}]*\}\}/g, "[game value]");
        return `<li><a href="${escapeHtml(ability.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ability.champion)} ${escapeHtml(ability.slot)} · ${escapeHtml(ability.name)}</a><span>${escapeHtml(text)}</span></li>`;
      }).join("")}</ul>
    </details>
  </section>`;
}
