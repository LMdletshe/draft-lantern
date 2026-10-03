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
  const enemyTraits = getChampionProfileSignals(enemy);
  const candidateTraits = getChampionProfileSignals(candidate);
  const enemyWeaknesses = new Set(enemy.weakInto);
  const roleFit = getRoleFit(candidate, role);
  const smartRead = getSmartMatchupFactors(enemy, candidate);
  let evidence = 0;

  candidate.goodInto.forEach((trait) => {
    if (enemyTraits.has(trait)) {
      score += 8;
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

  score += smartRead.scoreDelta;
  evidence += smartRead.positiveEvidence;
  reasons.push(...smartRead.positives.map((factor) => factor.reason));

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
    smartFactors: smartRead.positives.slice(0, 3),
    smartRisks: smartRead.negatives.slice(0, 2),
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
  const enemyTraits = getChampionProfileSignals(enemy);
  const candidateTraits = getChampionProfileSignals(candidate);

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
  if (candidateTraits.has("wave-clear") && enemyTraits.has("split-push")) {
    tips.push("Clear waves first, then move while their side-lane pressure is temporarily neutralized.");
  }
  if (candidateTraits.has("frontline-check") && enemyTraits.has("frontline")) {
    tips.push("Hit the closest durable target safely; your sustained damage matters more than chasing carries.");
  }

  return uniqueList(tips).slice(0, 2);
}

function championHasAnyTag(champion, tags) {
  const traits = typeof getChampionProfileSignals === "function"
    ? getChampionProfileSignals(champion)
    : new Set(champion.tags || []);
  return tags.some((tag) => traits.has(tag));
}

function getEnemyThreatProfile(enemy) {
  const scores = enemy.scores || {};
  const profile = [];
  if ((scores.engage || 0) >= 4 || championHasAnyTag(enemy, ["dive", "engage", "lockdown"])) {
    profile.push({ key: "dive", label: "dive/engage", answerTags: ["peel", "safe", "kite", "disengage"], note: "deny the first engage and punish the overextension" });
  }
  if ((scores.poke || 0) >= 4 || championHasAnyTag(enemy, ["poke", "siege", "range"])) {
    profile.push({ key: "poke", label: "poke/siege", answerTags: ["engage", "dive", "sustain", "pick"], note: "force commitment before repeated poke wins space" });
  }
  if ((scores.pick || 0) >= 4 || championHasAnyTag(enemy, ["pick", "global", "burst"])) {
    profile.push({ key: "pick", label: "pick pressure", answerTags: ["safe", "peel", "frontline", "vision"], note: "move with vision and avoid isolated paths" });
  }
  if ((scores.frontline || 0) >= 4 || championHasAnyTag(enemy, ["frontline", "tank", "sustain"])) {
    profile.push({ key: "frontline", label: "frontline", answerTags: ["damage", "scaling", "poke", "marksman"], note: "bring sustained damage or range to cut through the front" });
  }
  if ((scores.scaling || 0) >= 4 || championHasAnyTag(enemy, ["scaling", "reset"])) {
    profile.push({ key: "scaling", label: "scaling", answerTags: ["early", "pick", "engage", "snowball"], note: "attack before item breakpoints and convert early leads" });
  }
  return profile.length
    ? profile
    : [{ key: "general", label: "general threat", answerTags: ["safe", "pick", "damage", "frontline"], note: "choose a reliable lane pattern and play around cooldowns" }];
}

function getSelectedTeamContext(role) {
  return Object.entries(roleState)
    .filter(([teamRole, name]) => name && teamRole !== role)
    .map(([, name]) => getChampion(name))
    .filter(Boolean);
}

function getDamageNeed(team) {
  if (!team.length) return null;
  const physical = team.filter((champion) => getDamageType(champion) === "Physical").length;
  const magic = team.filter((champion) => getDamageType(champion) === "Magic").length;
  if (physical >= 3 && magic === 0) return "Magic";
  if (magic >= 3 && physical === 0) return "Physical";
  return null;
}

function classifySmartCounter(result, enemy, role, team) {
  const candidate = result.candidate;
  const threats = getEnemyThreatProfile(enemy);
  const damageNeed = getDamageNeed(team);
  const matchedThreats = threats.filter((threat) => championHasAnyTag(candidate, threat.answerTags));
  const reasons = [...result.reasons];
  let smartScore = result.score;
  let label = result.tier.label;
  let bucket = result.tier.key;

  if (matchedThreats.length) {
    smartScore += matchedThreats.length * 8;
    bucket = `answers ${matchedThreats[0].label}`;
    label = `Answers ${matchedThreats[0].label}`;
    reasons.unshift(`${candidate.name} has tools to ${matchedThreats[0].note}.`);
  }

  if (damageNeed && getDamageType(candidate) === damageNeed) {
    smartScore += 7;
    bucket = "damage fix";
    label = `${damageNeed} damage fix`;
    reasons.unshift(`${candidate.name} helps balance your team's ${damageNeed.toLowerCase()} damage profile.`);
  }

  if (team.length) {
    const compFit = scoreRecommendation(candidate, team, role, "balanced");
    smartScore += Math.max(-6, Math.min(12, (compFit.score - 60) * 0.22));
    if (compFit.reasons?.[0]) reasons.push(compFit.reasons[0]);
    if (compFit.score >= 72 && bucket === result.tier.key) {
      bucket = "team fit";
      label = "Best for your team";
    }
  }

  if (getDifficulty(candidate) === "Beginner") {
    smartScore += 4;
    if (["hard", "strong", "favorable"].includes(result.tier.key) && bucket === result.tier.key) {
      bucket = "beginner safe";
      label = "Beginner-safe answer";
    }
  }

  if (result.roleFit?.offRole) {
    smartScore -= 8;
    if (smartScore >= 58) {
      bucket = "off-role option";
      label = "Off-role option";
    }
  }

  return {
    ...result,
    smartScore,
    smartLabel: label,
    smartBucket: bucket,
    smartReasons: uniqueList(reasons).slice(0, 4),
    matchedThreats
  };
}

function pickBestHardCounters(items, limit) {
  const tierRank = {
    hard: 5,
    strong: 4,
    favorable: 3,
    even: 2,
    difficult: 1
  };

  return [...items]
    .sort((a, b) => {
      const tierDelta = (tierRank[b.tier.key] || 0) - (tierRank[a.tier.key] || 0);
      return tierDelta
        || b.score - a.score
        || b.smartScore - a.smartScore
        || a.candidate.name.localeCompare(b.candidate.name);
    })
    .slice(0, limit);
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

function populateTierControls() {
  if (!tierRole) return;
  const currentRole = tierRole.value || "All";
  tierRole.innerHTML = optionList(["All", ...roles], currentRole);
}

function getChampionRecentScoutMatches(champion) {
  const scout = riotScoutProfile || window.riotScoutProfile;
  const matches = scout?.recent?.matches || [];
  return matches.filter((match) => getChampionByRiotApiName(match.championName)?.name === champion.name);
}

function getScoutChampionContext(champion, role = "") {
  const scout = riotScoutProfile || window.riotScoutProfile;
  if (!scout?.ok) {
    return {
      score: 0,
      label: "No Riot Scout lookup loaded",
      detail: "Scout a Riot ID to add mastery and recent-match signals.",
      reasons: []
    };
  }

  const mastery = (scout.mastery || [])
    .map((entry, index) => ({ ...entry, index }))
    .find((entry) => getChampionByRiotChampionId(entry.championId)?.name === champion.name);
  const recentMatches = getChampionRecentScoutMatches(champion);
  const roleMatches = role ? recentMatches.filter((match) => getRoleFromRiotPosition(match.teamPosition) === role) : recentMatches;
  const wins = recentMatches.filter((match) => match.win).length;
  const winRate = recentMatches.length ? Math.round((wins / recentMatches.length) * 100) : 0;
  const reasons = [];
  let score = 0;

  if (mastery) {
    const masteryRankBonus = Math.max(0, 8 - mastery.index * 2);
    const levelBonus = Math.min(5, Math.floor((mastery.championLevel || 0) / 2));
    score += masteryRankBonus + levelBonus;
    reasons.push(`Mastery level ${mastery.championLevel || "?"} with ${(mastery.championPoints || 0).toLocaleString()} points.`);
  }

  if (recentMatches.length) {
    score += Math.min(8, recentMatches.length * 2);
    if (winRate >= 60) score += 4;
    if (winRate <= 35) score -= 3;
    reasons.push(`${recentMatches.length} recent game${recentMatches.length === 1 ? "" : "s"} at ${winRate}% WR.`);
  }

  if (role && roleMatches.length) {
    score += Math.min(4, roleMatches.length * 2);
    reasons.push(`${roleMatches.length} recent ${role} game${roleMatches.length === 1 ? "" : "s"}.`);
  }

  if (!reasons.length) {
    return {
      score: 0,
      label: "No player-specific signal",
      detail: "The champion was not visible in recent games or top mastery.",
      reasons: []
    };
  }

  return {
    score: Math.max(-5, Math.min(16, score)),
    label: recentMatches.length ? `${recentMatches.length} recent, ${winRate}% WR` : "Mastery signal",
    detail: reasons.join(" "),
    reasons
  };
}

function getRoleTierWeights(role) {
  const weights = {
    Top: { engage: 0.7, frontline: 1.1, damage: 1.1, pick: 0.65, poke: 0.55, peel: 0.45, scaling: 0.95 },
    Jungle: { engage: 1.15, frontline: 0.85, damage: 0.95, pick: 1.05, poke: 0.35, peel: 0.35, scaling: 0.55 },
    Mid: { engage: 0.55, frontline: 0.35, damage: 1.25, pick: 1.2, poke: 1.05, peel: 0.4, scaling: 0.95 },
    ADC: { engage: 0.25, frontline: 0.2, damage: 1.65, pick: 0.45, poke: 0.85, peel: 0.25, scaling: 1.3 },
    Support: { engage: 1.15, frontline: 0.75, damage: 0.3, pick: 1.05, poke: 0.75, peel: 1.55, scaling: 0.35 }
  };
  return weights[role] || recommendationGoals.balanced.weights;
}

function getRoleTraitBonus(champion, role) {
  const traits = getChampionProfileSignals(champion);
  const roleTraits = {
    Top: ["duel", "sustain", "frontline", "split-push", "durable", "wave-clear"],
    Jungle: ["early", "skirmish", "mobility", "engage", "pick", "map-pressure"],
    Mid: ["burst", "poke", "wave-clear", "pick", "mobility", "scaling"],
    ADC: ["marksman", "range", "high-dps", "safe", "scaling", "frontline-check"],
    Support: ["utility", "peel", "engage", "pick", "disengage", "low-income-value"]
  };
  return (roleTraits[role] || []).filter((trait) => traits.has(trait)).length * 1.8;
}

function getChampionTier(score) {
  if (score >= 78) return { key: "S", label: "S tier", className: "is-s-tier" };
  if (score >= 70) return { key: "A", label: "A tier", className: "is-a-tier" };
  if (score >= 58) return { key: "B", label: "B tier", className: "is-b-tier" };
  if (score >= 52) return { key: "C", label: "C tier", className: "is-c-tier" };
  return { key: "D", label: "D tier", className: "is-d-tier" };
}

function getChampionTierByKey(key) {
  const tiers = {
    S: { key: "S", label: "S tier", className: "is-s-tier" },
    A: { key: "A", label: "A tier", className: "is-a-tier" },
    B: { key: "B", label: "B tier", className: "is-b-tier" },
    C: { key: "C", label: "C tier", className: "is-c-tier" },
    D: { key: "D", label: "D tier", className: "is-d-tier" }
  };
  return tiers[key] || tiers.D;
}

function getRankedTier(index, total) {
  const percentile = (index + 1) / Math.max(1, total);
  if (percentile <= 0.08) return getChampionTierByKey("S");
  if (percentile <= 0.28) return getChampionTierByKey("A");
  if (percentile <= 0.68) return getChampionTierByKey("B");
  if (percentile <= 0.9) return getChampionTierByKey("C");
  return getChampionTierByKey("D");
}

function getChampionTierScore(champion, role = champion.roles[0]) {
  const scores = champion.scores || {};
  const info = getChampionInfo(champion);
  const roleFit = getRoleFit(champion, role);
  const weights = getRoleTierWeights(role);
  const scout = getScoutChampionContext(champion, role);
  const traits = getChampionProfileSignals(champion);
  const scoreTotal = scoreKeys.reduce((total, [key]) => total + ((scores[key] || 0) * (weights[key] || 1)), 0);
  const scoreMax = scoreKeys.reduce((total, [key]) => total + (5 * (weights[key] || 1)), 0);
  let score = 25 + (scoreTotal / Math.max(1, scoreMax)) * 38;
  const reasons = [];

  score += roleFit.offRole ? (roleFit.score - 0.58) * 18 : roleFit.score * 5;
  score += getRoleTraitBonus(champion, role);
  score += Math.min(4, (info.attack || 0) * 0.24 + (info.defense || 0) * 0.16 + (info.magic || 0) * 0.16);
  score += scout.score;

  if (traits.has("early") && traits.has("scaling")) {
    score += 3.5;
    reasons.push("Has both early pressure and scaling insurance.");
  }
  if (champion.roles.length > 1) {
    score += Math.min(2.5, champion.roles.length * 0.9);
    reasons.push("Flexible role profile gives draft value.");
  }
  if (getDifficulty(champion) === "Beginner") {
    score += 1;
    reasons.push("Lower execution floor makes the pick easier to convert.");
  } else if (getDifficulty(champion) === "Advanced") {
    score -= 1.5;
    reasons.push("High execution demand lowers blind climb reliability.");
  }
  if (roleFit.offRole) {
    reasons.push(`${roleFit.label} for ${role}, so the score is role-fit adjusted.`);
  } else {
    reasons.push(`Natural ${role} profile.`);
  }
  if (scout.reasons.length) {
    reasons.push(scout.detail);
  }

  const finalScore = Math.max(1, Math.min(99, Math.round(score)));
  return {
    champion,
    role,
    score: finalScore,
    tier: getChampionTier(finalScore),
    roleFit,
    scout,
    reasons: uniqueList(reasons).slice(0, 4)
  };
}

function getBestTierRole(champion) {
  return champion.roles
    .map((role) => getChampionTierScore(champion, role))
    .sort((a, b) => b.score - a.score || a.role.localeCompare(b.role))[0];
}

function getChampionTierRows(role = "All", includeOffRole = true) {
  const tierKeys = ["S", "A", "B", "C", "D"];
  const rows = Object.fromEntries(tierKeys.map((tier) => [tier, []]));
  const items = [];

  champions.forEach((champion) => {
    let item = null;
    if (role === "All") {
      item = getBestTierRole(champion);
    } else if (champion.roles.includes(role)) {
      item = getChampionTierScore(champion, role);
    } else if (includeOffRole) {
      const roleFit = getRoleFit(champion, role);
      if (roleFit.score >= 0.58) item = getChampionTierScore(champion, role);
    }

    if (item) items.push(item);
  });

  items
    .sort((a, b) => b.score - a.score || a.champion.name.localeCompare(b.champion.name))
    .forEach((item, index) => {
      const rankedItem = { ...item, tier: getRankedTier(index, items.length) };
      rows[rankedItem.tier.key].push(rankedItem);
    });

  return rows;
}

function renderChampionTierList() {
  if (!tierList) return;
  if (!tierRole.innerHTML) populateTierControls();

  const role = tierRole.value || "All";
  const includeOffRole = Boolean(tierIncludeOffRole?.checked);
  const rows = getChampionTierRows(role, includeOffRole);
  const dataSourceLabel = getRiotDataSourceLabel();
  const scoutLabel = (riotScoutProfile || window.riotScoutProfile)?.ok
    ? "Riot Scout mastery and recent games are included."
    : "Scout a Riot ID to personalize mastery and recent-pick weighting.";

  tierList.innerHTML = `
    <div class="tier-list__note">
      <strong>${escapeHtml(dataSourceLabel)}</strong>
      <span>Model-based S to D ranking from Riot champion attributes, role fit, archetype value, matchup rules, and optional Scout data. This is not a live global win-rate feed.</span>
      <span>${escapeHtml(scoutLabel)}</span>
    </div>
    ${["S", "A", "B", "C", "D"].map((tierKey) => {
      const items = rows[tierKey] || [];
      return `
        <section class="tier-row tier-row--${tierKey.toLowerCase()}">
          <div class="tier-row__label">
            <strong>${tierKey}</strong>
            <span>${items.length} pick${items.length === 1 ? "" : "s"}</span>
          </div>
          <div class="tier-row__champions">
            ${
              items.length
                ? items.map((item) => `
                    <button type="button" class="tier-chip ${item.tier.className}" data-tier-champion="${escapeHtml(item.champion.name)}" title="${escapeHtml(item.reasons.join(" "))}">
                      ${getChampionIconMarkup(item.champion, "small")}
                      <span>
                        <strong>${escapeHtml(item.champion.name)}</strong>
                        <small>${escapeHtml(item.role)}${item.roleFit.offRole ? " off-role" : ""} &middot; ${item.score}/100${item.scout.score ? " &middot; Scout +" + item.scout.score : ""}</small>
                      </span>
                    </button>
                  `).join("")
                : `<p class="empty-state">No champions meet this tier with the current filters.</p>`
            }
          </div>
        </section>
      `;
    }).join("")}
  `;
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
  const championSignals = getChampionProfileSignals(champion);
  const opponentSignals = getChampionProfileSignals(opponent);
  const smartRead = getSmartMatchupFactors(opponent, champion);
  let positiveMatches = 0;
  let negativeMatches = 0;

  champion.goodInto.forEach((trait) => {
    if (opponentSignals.has(trait)) {
      score += 8;
      positiveMatches += 1;
      reasons.push(`${champion.name} naturally performs well into ${trait.replaceAll("-", " ")} champions like ${opponent.name}.`);
    } else if (opponent.weakInto.includes(trait)) {
      score += 5;
      positiveMatches += 1;
      reasons.push(`${opponent.name} tends to struggle with ${trait.replaceAll("-", " ")} pressure.`);
    }
  });

  championSignals.forEach((trait) => {
    if (opponent.weakInto.includes(trait)) {
      score += 6;
      positiveMatches += 1;
      reasons.push(`${champion.name}'s ${trait.replaceAll("-", " ")} tools attack a known weakness in ${opponent.name}'s pattern.`);
    }
  });

  opponent.goodInto.forEach((trait) => {
    if (championSignals.has(trait)) {
      score -= 6;
      negativeMatches += 1;
    }
  });

  score += smartRead.scoreDelta;
  positiveMatches += smartRead.positiveEvidence;
  negativeMatches += smartRead.negatives.length;
  reasons.push(...smartRead.positives.map((factor) => factor.reason));

  if (positiveMatches > 3) score -= (positiveMatches - 3) * 3;
  if (negativeMatches > 2) score += (negativeMatches - 2) * 2;

  if (championSignals.has("early") && opponentSignals.has("scaling")) {
    score += 7;
    reasons.push(`${champion.name} can pressure ${opponent.name} before their scaling plan is ready.`);
  }
  if (championSignals.has("duel") && ["assassin", "scaling", "low-range"].some((tag) => opponentSignals.has(tag))) {
    score += 5;
    reasons.push(`${champion.name} is comfortable forcing direct skirmishes against this pattern.`);
  }
  if (championSignals.has("engage") && opponentSignals.has("immobile")) {
    score += 6;
    reasons.push(`${opponent.name} has limited ways to avoid ${champion.name}'s engage.`);
  }
  if (championSignals.has("peel") && ["dive", "assassin", "burst"].some((tag) => opponentSignals.has(tag))) {
    score += 6;
    reasons.push(`${champion.name}'s defensive tools reduce ${opponent.name}'s main way of reaching carries.`);
  }
  if (championSignals.has("poke") && opponentSignals.has("low-range")) {
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
    reasons: uniqueList(reasons).slice(0, 3),
    smartFactors: smartRead.positives.slice(0, 3),
    smartRisks: smartRead.negatives.slice(0, 2)
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
  const evalRole = explorerRole.value && explorerRole.value !== "All"
    ? explorerRole.value
    : tierRole?.value && tierRole.value !== "All"
      ? tierRole.value
      : champion.roles[0];
  const tierEval = getChampionTierScore(champion, evalRole);
  const matchups = getExplorerMatchups(champion);
  const hardCount = getRankedExplorerMatchups(champion)
    .filter((result) => result.tier.key === "hard").length;
  const dataSourceLabel = getRiotDataSourceLabel();

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
      <div><span>Patch tier model</span><strong>${escapeHtml(tierEval.tier.label)} as ${escapeHtml(evalRole)} (${tierEval.score}/100)</strong></div>
      <div><span>Role fit</span><strong>${escapeHtml(tierEval.roleFit.label)}${tierEval.roleFit.offRole ? ` for ${escapeHtml(evalRole)}` : ""}</strong></div>
      <div><span>Riot Scout signal</span><strong>${escapeHtml(tierEval.scout.label)}</strong></div>
      <div><span>Power curve</span><strong>${escapeHtml(champion.profile?.powerCurve || "Most reliable in the mid game")}</strong></div>
      <div><span>Fight pattern</span><strong>${escapeHtml(champion.profile?.fightPattern || getTeamfightPlan(champion))}</strong></div>
      <div><span>Riot attributes</span><strong>Attack ${info.attack || 0}/10, defense ${info.defense || 0}/10, magic ${info.magic || 0}/10, complexity ${info.difficulty || 0}/10</strong></div>
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
      <p>${escapeHtml(dataSourceLabel)} + kit/archetype analysis, not live patch win-rate data.</p>
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
              ${result.smartFactors?.length ? `<div class="smart-read">${result.smartFactors.map((factor) => `<span>${escapeHtml(factor.label)}</span>`).join("")}</div>` : ""}
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
  const limit = Number.parseInt(counterCount?.value || "6", 10);
  const team = getSelectedTeamContext(role);
  const threats = getEnemyThreatProfile(enemy);
  const smartPool = champions
    .filter((champion) => champion.name !== enemy.name)
    .filter((champion) => champion.roles.includes(role) || includeOffRole)
    .map((champion) => classifySmartCounter(scoreCounter(enemy, champion, role), enemy, role, team))
    .sort((a, b) => b.smartScore - a.smartScore || b.score - a.score || a.candidate.name.localeCompare(b.candidate.name));

  const candidates = pickBestHardCounters(smartPool, limit);
  const hardCount = smartPool.filter((result) => result.tier.key === "hard").length;
  const strongCount = smartPool.filter((result) => result.tier.key === "strong").length;
  const threatText = threats.map((threat) => threat.label).join(", ");
  const dataSourceLabel = getRiotDataSourceLabel();

  matchupOverview.innerHTML = `
    <div class="matchup-overview__enemy">
      ${getChampionIconMarkup(enemy, "small")}
      <div>
        <span>Facing ${escapeHtml(enemy.name)}</span>
        <strong>${escapeHtml(enemy.style)}</strong>
      </div>
    </div>
    <div class="matchup-overview__notes">
      <span><strong>Threat profile:</strong> ${escapeHtml(threatText)}</span>
      <span><strong>Attack:</strong> ${escapeHtml(threats.map((threat) => threat.note).join(" "))}</span>
      <span><strong>Data:</strong> ${escapeHtml(dataSourceLabel)}</span>
      <span><strong>Hard-counter pool:</strong> ${hardCount} hard and ${strongCount} strong answers found. Suggestions always show the highest ranked hard-counter candidates from the current patch roster model${includeOffRole ? ", including off-role options" : ""}.</span>
    </div>
  `;

  if (!candidates.length) {
    counterResults.innerHTML = `<p class="empty-state">No reliable hard counter was found for these filters. Try enabling off-role counters or changing the role.</p>`;
    return;
  }

  counterResults.innerHTML = candidates
    .map((result, index) => {
      const difficulty = result.tier;
      const laneAdvice = getMatchupAdvice(enemy, result.candidate);
      const reasons = result.smartReasons.length
        ? result.smartReasons.join(" ")
        : `${result.candidate.name} has a reasonable pattern into ${enemy.name}, but execution and wave state still matter.`;
      const confidence = Math.max(1, Math.min(99, Math.round(result.smartScore)));

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
          ${result.smartFactors?.length ? `<div class="smart-read">${result.smartFactors.map((factor) => `<span>${escapeHtml(factor.label)}</span>`).join("")}</div>` : ""}
          ${result.smartRisks?.length ? `<div class="counter-risk"><strong>Watch:</strong> ${escapeHtml(result.smartRisks.map((factor) => factor.label.toLowerCase()).join(", "))}</div>` : ""}
          <div class="lane-tip"><strong>How to win:</strong> ${escapeHtml(laneAdvice.join(" ") || getLanePlan(result.candidate))}</div>
          <div class="meter"><span>Smart fit confidence</span><span>${confidence}%</span></div>
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
