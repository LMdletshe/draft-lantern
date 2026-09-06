function optionList(items, selected) {
  return items.map((item) => `<option value="${escapeHtml(item)}" ${item === selected ? "selected" : ""}>${escapeHtml(item)}</option>`).join("");
}

function populateMatchupControls() {
  const currentEnemyRole = enemyRole.value || "Top";
  const currentAllyRole = allyRole.value || currentEnemyRole;
  enemyRole.innerHTML = optionList(roles, currentEnemyRole);
  allyRole.innerHTML = optionList(roles, currentAllyRole);
  populateEnemyPicks();
}

function populateEnemyPicks() {
  const role = enemyRole.value || "Top";
  const picks = champions.filter((champion) => champion.roles.includes(role)).map((champion) => champion.name);
  const previous = picks.includes(enemyPick.value) ? enemyPick.value : picks[0];
  if (!picks.length) {
    enemyPick.innerHTML = "";
    return;
  }
  enemyPick.innerHTML = optionList(picks, previous);
}

function scoreCounter(enemy, candidate, role = candidate.roles[0]) {
  let score = 42;
  const reasons = [];
  const enemyTraits = getChampionCombatTraits(enemy);
  const candidateTraits = getChampionCombatTraits(candidate);
  const enemyWeaknesses = new Set(enemy.weakInto);
  const roleFit = getRoleFit(candidate, role);
  let evidence = 0;

  candidate.goodInto.forEach((trait) => {
    if (enemyTraits.has(trait)) {
      score += 10;
      evidence += 1;
      reasons.push(`${candidate.name} naturally attacks ${enemy.name}'s ${trait.replaceAll("-", " ")} pattern.`);
    } else if (enemyWeaknesses.has(trait)) {
      score += 4;
    }
  });

  candidateTraits.forEach((trait) => {
    if (enemyWeaknesses.has(trait)) {
      score += 9;
      evidence += 1;
      reasons.push(`${enemy.name} tends to dislike ${trait.replace("-", " ")} pressure.`);
    }
  });

  enemy.goodInto.forEach((trait) => {
    if (candidateTraits.has(trait)) {
      score -= 8;
    }
  });

  if ((candidateTraits.has("peel") || candidateTraits.has("anti-dive"))
    && ["dive", "assassin", "burst"].some((tag) => enemyTraits.has(tag))) {
    score += 9;
    evidence += 1;
    reasons.push("Peel lowers the value of enemy dive or burst.");
  }

  if ((candidateTraits.has("poke") || candidateTraits.has("range"))
    && (enemyTraits.has("low-range") || enemyTraits.has("immobile"))) {
    score += 9;
    evidence += 1;
    reasons.push("Range can punish low-range champions before they start fights.");
  }

  if (candidateTraits.has("lockdown") && (enemyTraits.has("mobility") || enemyTraits.has("assassin"))) {
    score += 8;
    evidence += 1;
    reasons.push(`Reliable control can stop ${enemy.name} after their first movement commitment.`);
  }

  if (candidateTraits.has("sustain") && enemyTraits.has("poke")) {
    score += 7;
    evidence += 1;
    reasons.push("Sustain reduces the value of repeated poke trades.");
  }

  if ((candidateTraits.has("early") || candidateTraits.has("duel")) && enemyTraits.has("scaling")) {
    score += 8;
    evidence += 1;
    reasons.push(`${candidate.name} can force pressure before ${enemy.name}'s scaling plan is ready.`);
  }

  if ((candidateTraits.has("tank") || candidateTraits.has("frontline"))
    && (enemyTraits.has("burst") || enemyTraits.has("assassin"))) {
    score += 6;
    evidence += 1;
    reasons.push(`${candidate.name} is difficult for ${enemy.name} to remove in one burst window.`);
  }

  if (candidateTraits.has("hard-engage") && (enemyTraits.has("immobile") || enemyTraits.has("squishy"))) {
    score += 7;
    evidence += 1;
    reasons.push(`${enemy.name} has limited room for error against reliable engage.`);
  }

  const override = explorerCounterOverrides[candidate.name]?.[enemy.name];
  if (override) {
    score += override.bonus;
    evidence += 3;
    reasons.unshift(override.reason);
  }

  if (roleFit.offRole) {
    score -= Math.round((1 - roleFit.score) * 16);
  } else {
    score += candidate.roles[0] === role ? 5 : 3;
  }

  const finalScore = Math.max(5, Math.min(97, Math.round(score)));
  return {
    candidate,
    score: finalScore,
    reasons: uniqueList(reasons).slice(0, 3),
    evidence,
    roleFit,
    tier: getMatchupDifficulty(finalScore, evidence, Boolean(override))
  };
}

function getMatchupDifficulty(score, evidence = 0, hasOverride = false) {
  if (hasOverride || (score >= 84 && evidence >= 2)) return { key: "hard", label: "Hard counter", className: "is-hard" };
  if (score >= 72 && evidence >= 2) return { key: "strong", label: "Strong counter", className: "is-favorable" };
  if (score >= 60) return { key: "favorable", label: "Favorable", className: "is-edge" };
  if (score >= 46) return { key: "even", label: "Even", className: "is-even" };
  return { key: "difficult", label: "Difficult", className: "is-difficult" };
}

function getMatchupAdvice(enemy, candidate) {
  const tips = [];
  const enemyTraits = getChampionCombatTraits(enemy);
  const candidateTraits = getChampionCombatTraits(candidate);

  if ((candidateTraits.has("poke") || candidateTraits.has("range")) && enemyTraits.has("low-range")) {
    tips.push(`Keep ${enemy.name} at the edge of your range and avoid giving them a clean all-in.`);
  }
  if (["engage", "burst", "assassin"].some((tag) => enemyTraits.has(tag))) {
    tips.push(`Track ${enemy.name}'s main engage cooldown; trade more confidently while it is unavailable.`);
  }
  if (candidateTraits.has("scaling") && ["early", "snowball"].some((tag) => enemyTraits.has(tag))) {
    tips.push("A quiet lane is a win. Give up risky farm rather than feeding their early snowball.");
  }
  if (candidateTraits.has("sustain")) {
    tips.push("Take short trades, recover, and repeat instead of committing to one long fight.");
  }
  if (candidateTraits.has("pick") || candidateTraits.has("lockdown")) {
    tips.push("Hold crowd control until the enemy uses their movement tool or walks away from the wave.");
  }

  return uniqueList(tips).slice(0, 2);
}

function populateExplorerControls() {
  const currentRole = explorerRole.value || "All";
  explorerRole.innerHTML = optionList(["All", ...roles], currentRole);

  const strengthOptions = [
    ["hard", "Hard counters"],
    ["favored", "All favorable"],
    ["all", "All matchups"]
  ];
  const currentStrength = explorerStrength.value || "hard";
  explorerStrength.innerHTML = strengthOptions
    .map(([value, label]) => `<option value="${value}" ${value === currentStrength ? "selected" : ""}>${label}</option>`)
    .join("");
}

function getExplorerTier(score) {
  if (score >= 84) return { key: "hard", label: "Hard counter", className: "is-hard" };
  if (score >= 66) return { key: "favored", label: "Favored", className: "is-favored" };
  if (score >= 55) return { key: "edge", label: "Slight edge", className: "is-edge" };
  if (score >= 43) return { key: "even", label: "Even", className: "is-even" };
  return { key: "unfavorable", label: "Unfavorable", className: "is-unfavorable" };
}

function scoreChampionIntoOpponent(champion, opponent) {
  let score = 50;
  const reasons = [];
  let positiveMatches = 0;
  let negativeMatches = 0;

  champion.goodInto.forEach((trait) => {
    if (opponent.tags.includes(trait)) {
      score += 8;
      positiveMatches += 1;
      reasons.push(`${champion.name} naturally performs well into ${trait.replaceAll("-", " ")} champions like ${opponent.name}.`);
    } else if (opponent.weakInto.includes(trait)) {
      score += 5;
      positiveMatches += 1;
      reasons.push(`${opponent.name} tends to struggle with ${trait.replaceAll("-", " ")} pressure.`);
    }
  });

  champion.tags.forEach((trait) => {
    if (opponent.weakInto.includes(trait)) {
      score += 6;
      positiveMatches += 1;
      reasons.push(`${champion.name}'s ${trait.replaceAll("-", " ")} tools attack a known weakness in ${opponent.name}'s pattern.`);
    }
  });

  opponent.goodInto.forEach((trait) => {
    if (champion.tags.includes(trait)) {
      score -= 6;
      negativeMatches += 1;
    }
  });

  if (positiveMatches > 3) score -= (positiveMatches - 3) * 3;
  if (negativeMatches > 2) score += (negativeMatches - 2) * 2;

  if (champion.tags.includes("early") && opponent.tags.includes("scaling")) {
    score += 7;
    reasons.push(`${champion.name} can pressure ${opponent.name} before their scaling plan is ready.`);
  }
  if (champion.tags.includes("duel") && opponent.tags.some((tag) => ["assassin", "scaling", "low-range"].includes(tag))) {
    score += 5;
    reasons.push(`${champion.name} is comfortable forcing direct skirmishes against this pattern.`);
  }
  if (champion.tags.includes("engage") && opponent.tags.includes("immobile")) {
    score += 6;
    reasons.push(`${opponent.name} has limited ways to avoid ${champion.name}'s engage.`);
  }
  if (champion.tags.includes("peel") && opponent.tags.some((tag) => ["dive", "assassin", "burst"].includes(tag))) {
    score += 6;
    reasons.push(`${champion.name}'s defensive tools reduce ${opponent.name}'s main way of reaching carries.`);
  }
  if (champion.tags.includes("poke") && opponent.tags.includes("low-range")) {
    score += 6;
    reasons.push(`${champion.name} can apply pressure before ${opponent.name} reaches effective range.`);
  }

  const override = explorerCounterOverrides[champion.name]?.[opponent.name];
  if (override) {
    score += override.bonus;
    reasons.unshift(override.reason);
  }

  const sharesRole = champion.roles.some((role) => opponent.roles.includes(role));
  if (!sharesRole) {
    score = Math.min(score, 75);
  }

  const finalScore = Math.max(5, Math.min(95, Math.round(score)));
  if (!reasons.length) {
    const strongest = scoreKeys
      .map(([key, label]) => ({ label, value: champion.scores[key] || 0 }))
      .sort((a, b) => b.value - a.value)[0]?.label.toLowerCase();
    reasons.push(`${champion.name}'s ${strongest || "core"} strengths give it a workable general plan into ${opponent.name}.`);
  }

  return {
    opponent,
    score: finalScore,
    tier: getExplorerTier(finalScore),
    reasons: uniqueList(reasons).slice(0, 3)
  };
}

function getRankedExplorerMatchups(champion, role = "All") {
  const results = champions
    .filter((opponent) => opponent.name !== champion.name)
    .filter((opponent) => role === "All" || opponent.roles.includes(role))
    .map((opponent) => scoreChampionIntoOpponent(champion, opponent))
    .sort((a, b) => b.score - a.score || a.opponent.name.localeCompare(b.opponent.name));

  const eligible = results.filter((result) =>
    champion.roles.some((championRole) => result.opponent.roles.includes(championRole))
  );
  const hardSlots = Math.min(8, Math.max(2, Math.ceil(eligible.length * 0.12)));
  const hardNames = new Set(
    eligible
      .filter((result) => result.score >= 54)
      .slice(0, hardSlots)
      .map((result) => result.opponent.name)
  );

  return results.map((result) => ({
    ...result,
    tier: hardNames.has(result.opponent.name)
      ? { key: "hard", label: "Hard counter", className: "is-hard" }
      : getExplorerTier(result.score)
  }));
}

function getExplorerMatchups(champion) {
  const role = explorerRole.value || "All";
  const strength = explorerStrength.value || "hard";

  return getRankedExplorerMatchups(champion, role)
    .filter((result) => {
      if (strength === "hard") return result.tier.key === "hard";
      if (strength === "favored") return result.score >= 55;
      return true;
    });
}

function getExplorerOpponentPlan(champion, opponent) {
  const advice = getMatchupAdvice(opponent, champion);
  if (advice.length) return advice.join(" ");
  if (champion.tags.includes("early") && opponent.tags.includes("scaling")) {
    return "Contest early space and objectives before the opponent reaches comfortable item breakpoints.";
  }
  if (champion.tags.includes("frontline") && opponent.tags.includes("burst")) {
    return "Absorb the first burst window, then continue the fight while their main cooldowns are unavailable.";
  }
  return getLanePlan(champion);
}

function renderExplorerSearchResults() {
  const query = explorerSearch.value.trim().toLowerCase();
  if (!query || normalizeChampionName(query) === normalizeChampionName(activeExplorerChampion)) {
    explorerSearchResults.innerHTML = "";
    return;
  }

  const matches = champions
    .filter((champion) => championMatchesQuery(champion, query))
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(query) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(query) ? 0 : 1;
      return aStarts - bStarts || a.name.localeCompare(b.name);
    })
    .slice(0, 10);

  explorerSearchResults.innerHTML = matches.length
    ? matches.map((champion) => `
        <button type="button" data-explorer-champion="${escapeHtml(champion.name)}">
          ${getChampionIconMarkup(champion, "small")}
          <span><strong>${escapeHtml(champion.name)}</strong><small>${escapeHtml(champion.roles.join(" / "))} - ${escapeHtml(champion.style)}</small></span>
        </button>
      `).join("")
    : `<p class="empty-state">No champion matches that search.</p>`;
}

function selectExplorerChampion(name) {
  const champion = getChampion(name);
  if (!champion) return;
  activeExplorerChampion = champion.name;
  explorerSearch.value = champion.name;
  renderChampionExplorer();
}

function renderChampionExplorer() {
  if (!explorerProfile || !explorerCounterResults) return;
  if (!explorerRole.innerHTML || !explorerStrength.innerHTML) populateExplorerControls();

  let champion = getChampion(activeExplorerChampion);
  if (!champion) {
    champion = getChampion("Xin Zhao") || champions[0];
    activeExplorerChampion = champion?.name || "";
  }
  explorerRosterCount.textContent = `${champions.length} champions`;

  if (!champion) {
    explorerProfile.innerHTML = `<p class="empty-state">Champion data is not available yet.</p>`;
    explorerCounterResults.innerHTML = "";
    return;
  }

  if (!explorerSearch.value) explorerSearch.value = champion.name;
  renderExplorerSearchResults();

  const scores = champion.scores;
  const info = getChampionInfo(champion);
  const matchups = getExplorerMatchups(champion);
  const hardCount = getRankedExplorerMatchups(champion)
    .filter((result) => result.tier.key === "hard").length;

  explorerProfile.innerHTML = `
    <div class="explorer-profile__identity">
      ${getChampionIconMarkup(champion)}
      <div>
        <span>${escapeHtml(champion.roles.join(" / "))} &middot; ${escapeHtml(getDamageType(champion))} &middot; ${escapeHtml(getDifficulty(champion))} &middot; ${champion.dataLevel === "curated" ? "Curated profile" : "Modeled full profile"}</span>
        <h2>${escapeHtml(champion.name)}</h2>
        <strong>${escapeHtml(champion.style)}</strong>
        <p>${escapeHtml(champion.beginner)}</p>
      </div>
      <div class="explorer-profile__actions">
        <span>${hardCount} general hard counter${hardCount === 1 ? "" : "s"}</span>
        ${champion.roles.map((role) => `<button class="text-button" type="button" data-explorer-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
      </div>
    </div>

    <div class="explorer-profile-facts">
      <div><span>Power curve</span><strong>${escapeHtml(champion.profile?.powerCurve || "Most reliable in the mid game")}</strong></div>
      <div><span>Fight pattern</span><strong>${escapeHtml(champion.profile?.fightPattern || getTeamfightPlan(champion))}</strong></div>
      <div><span>Best into</span><strong>${escapeHtml(champion.goodInto.slice(0, 3).map((item) => item.replaceAll("-", " ")).join(", "))}</strong></div>
    </div>

    <div class="explorer-attributes">
      <section>
        <h3>Attributes</h3>
        <div class="tags">${champion.tags.map((tag) => `<span class="tag tag--${escapeHtml(tag)}">${escapeHtml(tag)}</span>`).join("")}</div>
      </section>
      <section>
        <h3>Strengths</h3>
        <ul>${getChampionStrengths(champion).slice(0, 5).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h3>Weaknesses</h3>
        <ul>${getChampionWeaknesses(champion).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="explorer-score-section">
        <h3>Combat attributes</h3>
        ${[
          ["Attack", info.attack],
          ["Defense", info.defense],
          ["Magic", info.magic],
          ["Complexity", info.difficulty]
        ].map(([label, value]) => `
          <div class="explorer-score-row">
            <span>${label}</span>
            <div><i style="width: ${Math.max(0, Math.min(10, value || 0)) * 10}%"></i></div>
            <strong>${value || 0}/10</strong>
          </div>
        `).join("")}
      </section>
      <section class="explorer-score-section">
        <h3>Team contribution</h3>
        ${scoreKeys.map(([key, label]) => `
          <div class="explorer-score-row">
            <span>${escapeHtml(label)}</span>
            <div><i style="width: ${(scores[key] || 0) * 20}%"></i></div>
            <strong>${scores[key] || 0}/5</strong>
          </div>
        `).join("")}
      </section>
    </div>
  `;

  const filterLabel = explorerStrength.options?.[explorerStrength.selectedIndex]?.text || "matchups";
  explorerCounterResults.innerHTML = `
    <div class="explorer-counter-heading">
      <div>
        <p class="eyebrow">Who ${escapeHtml(champion.name)} Counters</p>
        <h2>${matchups.length} ${escapeHtml(filterLabel.toLowerCase())}${explorerRole.value === "All" ? "" : ` in ${escapeHtml(explorerRole.value)}`}</h2>
      </div>
      <p>General kit and archetype analysis, not live patch win-rate data.</p>
    </div>
    ${
      matchups.length
        ? `<div class="explorer-matchup-grid">${matchups.map((result) => `
            <article class="explorer-matchup-card">
              <div class="explorer-matchup-card__heading">
                ${getChampionIconMarkup(result.opponent, "small")}
                <div><h3>${escapeHtml(result.opponent.name)}</h3><span>${escapeHtml(result.opponent.roles.join(" / "))}</span></div>
                <span class="explorer-tier ${result.tier.className}">${escapeHtml(result.tier.label)}</span>
              </div>
              <div class="explorer-advantage"><span>General advantage</span><strong>${result.score}%</strong></div>
              <p>${escapeHtml(result.reasons.join(" ") || `${champion.name}'s general game plan matches well into ${result.opponent.name}.`)}</p>
              <div class="explorer-plan"><strong>How to play it:</strong> ${escapeHtml(getExplorerOpponentPlan(champion, result.opponent))}</div>
              <button class="text-button" type="button" data-details="${escapeHtml(result.opponent.name)}">View ${escapeHtml(result.opponent.name)}</button>
            </article>
          `).join("")}</div>`
        : `<p class="empty-state">No matchups meet these filters. Try "All favorable" or another opponent role.</p>`
    }
  `;
}

function renderCounters() {
  const enemy = getChampion(enemyPick.value);
  if (!enemy) {
    matchupOverview.innerHTML = "";
    counterResults.innerHTML = `<p class="empty-state">Choose an enemy champion to see general counter-pick ideas.</p>`;
    return;
  }

  const role = allyRole.value || enemyRole.value;
  const includeOffRole = Boolean(matchupOffRole?.checked);
  const focus = counterFocus?.value || "hard";
  const limit = Number.parseInt(counterCount?.value || "6", 10);
  const ranked = champions
    .filter((champion) => champion.name !== enemy.name)
    .filter((champion) => champion.roles.includes(role) || includeOffRole)
    .map((champion) => scoreCounter(enemy, champion, role))
    .sort((a, b) => {
      const tierOrder = { hard: 4, strong: 3, favorable: 2, even: 1, difficult: 0 };
      return (tierOrder[b.tier.key] || 0) - (tierOrder[a.tier.key] || 0)
        || b.score - a.score
        || b.roleFit.score - a.roleFit.score
        || a.candidate.name.localeCompare(b.candidate.name);
    });

  let focusedCandidates = ranked;
  if (focus === "hard") {
    const counters = ranked.filter((result) => ["hard", "strong"].includes(result.tier.key));
    const favorableFallbacks = ranked.filter((result) => result.tier.key === "favorable");
    focusedCandidates = [...counters, ...favorableFallbacks];
  } else if (focus === "strong") {
    focusedCandidates = ranked.filter((result) => result.score >= 56);
  }
  const candidates = focusedCandidates.slice(0, limit);
  const hardCount = ranked.filter((result) => result.tier.key === "hard").length;
  const strongCount = ranked.filter((result) => result.tier.key === "strong").length;

  matchupOverview.innerHTML = `
    <div class="matchup-overview__enemy">
      ${getChampionIconMarkup(enemy, "small")}
      <div>
        <span>Facing ${escapeHtml(enemy.name)}</span>
        <strong>${escapeHtml(enemy.style)}</strong>
      </div>
    </div>
    <div class="matchup-overview__notes">
      <span><strong>Respect:</strong> ${escapeHtml(getChampionStrengths(enemy).slice(0, 2).join(" and ").toLowerCase())}</span>
      <span><strong>Attack:</strong> ${escapeHtml(getChampionWeaknesses(enemy).slice(0, 2).join(" and "))}</span>
      <span><strong>Counter read:</strong> ${hardCount} hard and ${strongCount} strong general answer${hardCount + strongCount === 1 ? "" : "s"} found${includeOffRole ? ", including off-role options" : ""}.</span>
    </div>
  `;

  if (!candidates.length) {
    counterResults.innerHTML = `<p class="empty-state">No reliable hard or favorable counter was found for these filters. Try enabling off-role counters or switch to "All ranked options".</p>`;
    return;
  }

  counterResults.innerHTML = candidates
    .map((result, index) => {
      const difficulty = result.tier;
      const laneAdvice = getMatchupAdvice(enemy, result.candidate);
      const reasons = result.reasons.length
        ? result.reasons.join(" ")
        : `${result.candidate.name} has the strongest available general pattern into ${enemy.name}, but execution still matters.`;

      return `
        <article class="counter-card">
          <div class="counter-card__top">
            ${getChampionIconMarkup(result.candidate, "small")}
            <div>
              <span class="counter-card__rank">${escapeHtml(difficulty.label)} ${index + 1}</span>
              <h3>${escapeHtml(result.candidate.name)}</h3>
              <small>${escapeHtml(result.candidate.roles.join(" / "))}</small>
            </div>
            <span class="difficulty-pill ${difficulty.className}">${difficulty.label}</span>
          </div>
          ${result.roleFit.offRole ? `<span class="off-role-note">${escapeHtml(result.roleFit.label)} ${escapeHtml(role)}</span>` : ""}
          <p>${escapeHtml(reasons)}</p>
          <div class="lane-tip"><strong>How to win:</strong> ${escapeHtml(laneAdvice.join(" ") || getLanePlan(result.candidate))}</div>
          <div class="meter"><span>Counter confidence</span><span>${result.score}%</span></div>
          <div class="counter-card__actions">
            <button class="text-button" type="button" data-counter-pick="${escapeHtml(result.candidate.name)}" data-role="${escapeHtml(role)}">Use in team</button>
            <button class="icon-button icon-button--small" type="button" data-details="${escapeHtml(result.candidate.name)}" aria-label="View ${escapeHtml(result.candidate.name)} details">i</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function showChampionDetails(name) {
  const champion = getChampion(name);
  if (!champion) return;

  selectedDetailChampion = name;
  dialogTitle.textContent = champion.name;
  const info = getChampionInfo(champion);
  const pairings = pairSynergies
    .filter(([a, b]) => a === champion.name || b === champion.name)
    .map(([a, b, reason]) => ({ partner: a === champion.name ? b : a, reason }))
    .filter((item) => getChampion(item.partner))
    .slice(0, 3);
  const sameRoleCounters = champions
    .filter((candidate) => candidate.name !== champion.name && candidate.roles.some((role) => champion.roles.includes(role)))
    .map((candidate) => scoreCounter(champion, candidate))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  championDetails.innerHTML = `
    <div class="detail-hero">
      ${getChampionIconMarkup(champion)}
      <div>
        <span>${escapeHtml(champion.roles.join(" / "))} &middot; ${escapeHtml(getDamageType(champion))} &middot; ${escapeHtml(getDifficulty(champion))}</span>
        <strong>${escapeHtml(champion.style)}</strong>
        <p>${escapeHtml(champion.beginner)}</p>
      </div>
    </div>
    <div class="detail-profile-facts">
      <div><span>Power curve</span><strong>${escapeHtml(champion.profile?.powerCurve || "Most reliable in the mid game")}</strong></div>
      <div><span>Fight pattern</span><strong>${escapeHtml(champion.profile?.fightPattern || getTeamfightPlan(champion))}</strong></div>
      <div><span>Combat profile</span><strong>Attack ${info.attack}/10, Defense ${info.defense}/10, Magic ${info.magic}/10, Complexity ${info.difficulty}/10</strong></div>
    </div>
    <div class="detail-grid">
      <section>
        <h3>Strengths</h3>
        <ul>${getChampionStrengths(champion).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h3>Weaknesses</h3>
        <ul>${getChampionWeaknesses(champion).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h3>Lane plan</h3>
        <p>${escapeHtml(getLanePlan(champion))}</p>
      </section>
      <section>
        <h3>Teamfight plan</h3>
        <p>${escapeHtml(getTeamfightPlan(champion))}</p>
      </section>
    </div>
    <div class="detail-section">
      <h3>Useful partners</h3>
      ${
        pairings.length
          ? pairings.map((item) => `<p><strong>${escapeHtml(item.partner)}:</strong> ${escapeHtml(item.reason)}</p>`).join("")
          : `<p>Look for teammates who add ${escapeHtml(champion.scores.engage < 3 ? "engage and target access" : "damage and follow-up")} around this pick.</p>`
      }
    </div>
    <div class="detail-section">
      <h3>General answers</h3>
      <div class="detail-answer-row">
        ${sameRoleCounters.map((item) => `<span>${escapeHtml(item.candidate.name)} <small>${item.score}% fit</small></span>`).join("")}
      </div>
    </div>
    <div class="dialog-actions">
      ${champion.roles.map((role) => `<button class="text-button" type="button" data-dialog-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
    </div>
  `;

  if (typeof championDialog.showModal === "function") championDialog.showModal();
  else championDialog.setAttribute("open", "");
}
