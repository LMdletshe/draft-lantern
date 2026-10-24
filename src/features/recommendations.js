function getRecommendationGoalProfile(goalId) {
  return recommendationGoals[goalId] || recommendationGoals.balanced;
}

function getWarningWeight(warning) {
  if (warning.severity === "high") return 14;
  if (warning.severity === "medium") return 8;
  if (warning.severity === "low") return 4;
  return 0;
}

function scoreRecommendation(candidate, team, role, goalId = "balanced") {
  const currentScores = calculateScores(team);
  const nextTeam = [...team, candidate];
  const nextScores = calculateScores(nextTeam);
  const goal = getRecommendationGoalProfile(goalId);
  const roleFit = getRoleFit(candidate, role);
  let score = 34;
  const reasons = [];
  const needs = scoreKeys
    .map(([key, label]) => ({ key, label, value: currentScores[key] }))
    .sort((a, b) => a.value - b.value);

  needs.slice(0, 3).forEach((need, index) => {
    const contribution = candidate.scores[need.key] || 0;
    const needWeight = 1 + Math.max(0, 45 - need.value) / 45;
    score += contribution * (3.5 - index * 0.75) * needWeight * (goal.weights[need.key] || 1) * 0.45;
    if (contribution >= 4) reasons.push(`Adds strong ${need.label.toLowerCase()} where the team is currently light.`);
  });

  let compatibilityScore = 0;
  team.forEach((teammate) => {
    const compatibility = getPairCompatibility(candidate, teammate);
    compatibilityScore += compatibility.score;
    reasons.push(...compatibility.reasons);
  });
  if (compatibilityScore) {
    score += Math.min(24, compatibilityScore);
  }

  const mix = getTeamDamageMix(team);
  const candidateDamage = getDamageType(candidate);
  if (candidateDamage === "Magic" && mix.Magic === 0 && (mix.Physical + mix.Mixed) >= 2) {
    score += 12;
    reasons.push("Balances a physical-heavy damage profile.");
  }
  if (candidateDamage === "Physical" && mix.Physical === 0 && mix.Magic >= 2) {
    score += 12;
    reasons.push("Adds physical damage so armor and magic resist choices are harder.");
  }

  const currentWarnings = getDraftWarnings(team).filter((warning) => warning.severity !== "info");
  const nextWarningIds = new Set(getDraftWarnings(nextTeam).map((warning) => warning.id));
  const fixedWarnings = currentWarnings.filter((warning) => !nextWarningIds.has(warning.id));
  if (fixedWarnings.length) {
    score += fixedWarnings.reduce((total, warning) => total + getWarningWeight(warning), 0);
    reasons.unshift(`Fixes ${fixedWarnings[0].title.toLowerCase()}.`);
  }

  const goalMatches = goal.tags.filter((tag) => getChampionCombatTraits(candidate).has(tag));
  if (goalMatches.length) {
    score += Math.min(16, goalMatches.length * 4);
    reasons.push(`Fits the ${goal.label.toLowerCase()} goal through ${goalMatches.slice(0, 2).join(" and ")}.`);
  }

  const scoreImprovement = scoreKeys.reduce((total, [key]) => {
    const weightedDelta = Math.max(0, nextScores[key] - currentScores[key]) * (goal.weights[key] || 1);
    return total + weightedDelta;
  }, 0);
  score += Math.min(12, scoreImprovement * 0.22);

  ["marksman", "assassin", "scaling", "frontline"].forEach((tag) => {
    if (candidate.tags.includes(tag) && countTeamTag(team, [tag]) >= 2) score -= 6;
  });

  if (getDifficulty(candidate) === "Beginner") {
    score += 4;
    reasons.push("Beginner-friendly execution.");
  }

  if (roleFit.offRole) {
    score -= Math.round((1 - roleFit.score) * 24);
    reasons.push(`${roleFit.label} for ${role}; use it for the kit fit, not conventional lane comfort.`);
  } else {
    score += candidate.roles[0] === role ? 7 : 4;
  }

  let category = goal.label;
  if (fixedWarnings.length) category = "Fixes draft";
  else if (compatibilityScore >= 14) category = "Best synergy";
  else if (roleFit.offRole) category = "Off-role option";
  else if (getDifficulty(candidate) === "Beginner") category = "Easy execution";

  return {
    candidate,
    role,
    score: Math.max(1, Math.min(99, Math.round(score))),
    reasons: uniqueList(reasons).slice(0, 3),
    roleFit,
    category,
    fixedWarnings: fixedWarnings.map((warning) => warning.id)
  };
}

function getRecommendationRole() {
  const requested = recommendRole?.value;
  return requested || roles.find((role) => !roleState[role]) || "Top";
}

function getRecommendationsForTeam(team, role, excludedNames = new Set(), options = {}) {
  const includeOffRole = Boolean(options.includeOffRole);
  const goalId = options.goalId || "balanced";
  const limit = options.limit || 4;
  return champions
    .filter((champion) => {
      const roleFit = getRoleFit(champion, role);
      return (champion.roles.includes(role) || (includeOffRole && roleFit.score >= 0.3))
        && !team.some((picked) => picked.name === champion.name)
        && !excludedNames.has(champion.name);
    })
    .map((champion) => scoreRecommendation(champion, team, role, goalId))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    .slice(0, limit);
}

let synergySuggestionsExpanded = false;
let synergySuggestionContext = "";

function renderRecommendations() {
  if (!recommendRole) return;

  const previous = recommendRole.value;
  recommendRole.innerHTML = optionList(roles, previous || roles.find((role) => !roleState[role]) || "Top");
  const role = getRecommendationRole();
  recommendRole.value = role;
  // A replacement must fit the four remaining slots, not its outgoing pick.
  const team = roles.filter((slot) => slot !== role && roleState[slot])
    .map((slot) => getChampion(roleState[slot])).filter(Boolean);
  const goalId = recommendGoal?.value || "balanced";
  const context = JSON.stringify([role, goalId, roles.map((slot) => roleState[slot])]);
  if (context !== synergySuggestionContext) synergySuggestionsExpanded = false;
  synergySuggestionContext = context;
  const qualified = getResearchedTeamRecommendations(team, role, {
    goalId, excludedNames: new Set(selectedChampions().map((champion) => champion.name))
  });
  const picks = qualified.slice(0, synergySuggestionsExpanded ? 6 : 3);
  recommendMore.hidden = qualified.length <= 3;
  recommendMore.setAttribute("aria-expanded", String(synergySuggestionsExpanded));
  recommendMore.textContent = synergySuggestionsExpanded ? "Show top three picks" : "Show up to six picks";
  recommendationStatus.textContent = !team.length
    ? "Add a champion in another role first to find researched partners."
    : !qualified.length
      ? `No reviewed ${role} synergy picks for these teammates yet. Browse the champion pool to choose manually; generic matches are not used to fill this list.`
      : `Showing ${picks.length} of ${qualified.length} qualifying ${role} picks${roleState[role] ? ` to replace ${roleState[role]}` : ""}. Native roles only. ${qualified.length < 3 ? "Fewer than three qualify; no filler picks." : ""}`;

  recommendations.innerHTML = picks
    .map((result, index) => `
      <article class="recommendation-card">
        <div class="recommendation-card__top">
          ${getChampionIconMarkup(result.candidate, "small")}
          <div>
            <h3>${escapeHtml(result.candidate.name)}</h3>
            <span>${escapeHtml(result.role)} &middot; ${escapeHtml(getDifficulty(result.candidate))} &middot; ${result.partners} researched partner${result.partners === 1 ? "" : "s"}</span>
          </div>
          <strong aria-label="Suggestion ${index + 1}">#${index + 1}</strong>
        </div>
        ${renderSynergyEvidence(result.links[0])}
        ${result.links.length > 1 ? `<details class="synergy-other"><summary>${result.links.length - 1} more researched connection${result.links.length > 2 ? "s" : ""}</summary>${result.links.slice(1).map(renderSynergyEvidence).join("")}</details>` : ""}
        <details class="synergy-fit"><summary>Modeled team fit</summary><p>${escapeHtml(result.reasons.join(" "))} These broad traits help order qualifying picks; they do not prove the combo or a win-rate advantage.</p></details>
        <div class="recommendation-card__actions">
          <button class="text-button" type="button" data-recommend="${escapeHtml(result.candidate.name)}" data-role="${escapeHtml(result.role)}">Add pick</button>
          <button class="icon-button icon-button--small" type="button" data-details="${escapeHtml(result.candidate.name)}" aria-label="View ${escapeHtml(result.candidate.name)} details">i</button>
        </div>
      </article>
    `)
    .join("");
}
