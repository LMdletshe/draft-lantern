function calculateScores(team) {
  const base = Object.fromEntries(scoreKeys.map(([key]) => [key, 0]));
  if (!team.length) return base;

  team.forEach((champion) => {
    scoreKeys.forEach(([key]) => {
      base[key] += champion.scores[key] || 0;
    });
  });

  scoreKeys.forEach(([key]) => {
    base[key] = Math.round((base[key] / (team.length * 5)) * 100);
  });

  return base;
}

function getTeamDamageMix(team) {
  const counts = { Physical: 0, Magic: 0, Mixed: 0, Utility: 0 };
  team.forEach((champion) => {
    counts[getDamageType(champion)] += 1;
  });
  return counts;
}

function countTeamTag(team, tags) {
  return team.filter((champion) => tags.some((tag) => champion.tags.includes(tag))).length;
}

function getDraftWarnings(team) {
  if (!team.length) return [];

  const scores = calculateScores(team);
  const damageMix = getTeamDamageMix(team);
  const warnings = [];
  const addWarning = (id, severity, title, message, fix, needs = []) => {
    warnings.push({ id, severity, title, message, fix, needs });
  };

  if (team.length < 5) {
    addWarning(
      "open-slots",
      "info",
      `${5 - team.length} role${team.length === 4 ? "" : "s"} still open`,
      "The read will become more reliable as the team fills out.",
      "Use the recommendations above to cover the weakest team score.",
      []
    );
  }

  if (team.length >= 3 && scores.frontline < 32) {
    addWarning(
      "frontline",
      "high",
      "No durable front line",
      "Your carries may have nobody who can safely walk into vision or absorb the first enemy cooldowns.",
      "Add a tank or durable fighter with strong frontline value.",
      ["frontline"]
    );
  }

  if (team.length >= 3 && scores.engage < 28 && scores.pick < 30 && scores.poke < 34) {
    addWarning(
      "start-fights",
      "high",
      "No clear way to start",
      "The team may hesitate around objectives because it lacks engage, catch, and meaningful ranged pressure.",
      "Add reliable engage, a strong pick tool, or long-range poke.",
      ["engage", "pick", "poke"]
    );
  }

  if (team.length >= 3 && damageMix.Physical >= team.length - damageMix.Utility && damageMix.Magic === 0 && damageMix.Mixed === 0) {
    addWarning(
      "physical-heavy",
      "medium",
      "All physical damage",
      "Enemy frontliners can buy armor efficiently and become difficult for the whole team to kill.",
      "Add a magic-damage champion in one of the remaining roles.",
      ["magic"]
    );
  }

  if (team.length >= 3 && damageMix.Magic >= team.length - damageMix.Utility && damageMix.Physical === 0 && damageMix.Mixed === 0) {
    addWarning(
      "magic-heavy",
      "medium",
      "All magic damage",
      "Enemy frontliners can stack magic resistance without giving up much value.",
      "Add a physical or mixed-damage champion.",
      ["physical"]
    );
  }

  const waveClearCount = countTeamTag(team, ["aoe", "poke", "siege", "marksman"]);
  if (team.length >= 4 && waveClearCount < 2 && scores.damage < 48) {
    addWarning(
      "wave-clear",
      "medium",
      "Weak wave clear",
      "Defending towers and moving first from lane may be difficult when several minion waves arrive.",
      "Add an AoE mage, marksman, or safe ranged wave-clear pick.",
      ["poke", "damage"]
    );
  }

  const carryCount = countTeamTag(team, ["marksman", "scaling"]);
  if (team.length >= 3 && carryCount >= 1 && scores.peel < 28) {
    addWarning(
      "peel",
      "medium",
      "Backline is exposed",
      "Your main damage dealers may struggle when assassins or divers reach them.",
      "Add peel, shields, disengage, or defensive crowd control.",
      ["peel"]
    );
  }

  const earlyCount = countTeamTag(team, ["early", "snowball"]);
  const scalingCount = countTeamTag(team, ["scaling"]);
  if (team.length >= 4 && scalingCount >= 3 && earlyCount === 0) {
    addWarning(
      "slow-start",
      "medium",
      "Very slow early game",
      "Multiple lanes may need time and items, leaving early objectives difficult to contest.",
      "Add one stable early-pressure champion or avoid early coin-flip fights.",
      ["early", "pick"]
    );
  }

  if (team.length === 5 && scores.scaling < 30) {
    addWarning(
      "late-game",
      "low",
      "Limited late-game insurance",
      "If the early lead stalls, the enemy may outscale your damage or teamfight tools.",
      "Play proactively around early objectives and convert picks into towers.",
      ["scaling"]
    );
  }

  const shortRangeCount = countTeamTag(team, ["low-range", "duel", "frontline"]);
  if (team.length >= 4 && shortRangeCount >= 4 && scores.poke < 25) {
    addWarning(
      "short-range",
      "low",
      "Very short range",
      "Long-range teams can chip you down before your engage reaches them.",
      "Add range, flank from fog of war, or secure vision before walking forward.",
      ["poke", "range"]
    );
  }

  return warnings;
}

function getWarningSuggestions(warning, team) {
  const openRoles = roles.filter((role) => !roleState[role]);
  if (!openRoles.length || !warning.needs.length) return [];

  return champions
    .filter((champion) => !team.some((picked) => picked.name === champion.name))
    .flatMap((champion) => openRoles
      .filter((role) => champion.roles.includes(role)
        || (allowOffRolePicks?.checked && getRoleFit(champion, role).score >= 0.3))
      .map((role) => ({ champion, role })))
    .map(({ champion, role }) => {
      let score = getDifficulty(champion) === "Beginner" ? 5 : 0;
      warning.needs.forEach((need) => {
        if (need === "magic" && getDamageType(champion) === "Magic") score += 18;
        else if (need === "physical" && ["Physical", "Mixed"].includes(getDamageType(champion))) score += 18;
        else if (need === "range" && champion.tags.some((tag) => ["range", "poke", "marksman"].includes(tag))) score += 14;
        else score += (champion.scores[need] || 0) * 4;
        if (champion.tags.includes(need)) score += 8;
      });
      score += scoreRecommendation(champion, team, role, recommendGoal?.value || "balanced").score * 0.18;
      score += getRoleFit(champion, role).score * 8;
      return { champion, role, score };
    })
    .sort((a, b) => b.score - a.score || a.champion.name.localeCompare(b.champion.name))
    .slice(0, 3);
}

function renderDraftWarnings() {
  const team = selectedChampions();
  const warnings = getDraftWarnings(team);

  if (!team.length) {
    warningCount.textContent = "Waiting";
    draftWarnings.innerHTML = `<p class="empty-state">Warnings will appear once the draft has enough picks to reveal a pattern.</p>`;
    return;
  }

  const risks = warnings.filter((warning) => warning.severity !== "info");
  warningCount.textContent = risks.length ? `${risks.length} risk${risks.length === 1 ? "" : "s"}` : "Healthy";

  if (!warnings.length) {
    draftWarnings.innerHTML = `
      <article class="warning-item warning-item--good">
        <span class="warning-icon">OK</span>
        <div><h3>Core needs are covered</h3><p>The team has a workable mix of damage, durability, initiation, and protection.</p></div>
      </article>
    `;
    return;
  }

  draftWarnings.innerHTML = warnings.map((warning) => {
    const suggestions = getWarningSuggestions(warning, team);
    return `
      <article class="warning-item warning-item--${escapeHtml(warning.severity)}">
        <span class="warning-icon">${warning.severity === "high" ? "!" : warning.severity === "medium" ? "?" : "i"}</span>
        <div class="warning-item__body">
          <h3>${escapeHtml(warning.title)}</h3>
          <p>${escapeHtml(warning.message)}</p>
          <strong>Fix: ${escapeHtml(warning.fix)}</strong>
          ${
            suggestions.length
              ? `<div class="warning-suggestions">${suggestions.map((item) => `<button type="button" data-warning-pick="${escapeHtml(item.champion.name)}" data-role="${escapeHtml(item.role)}">${escapeHtml(item.champion.name)} <small>${escapeHtml(item.role)}</small></button>`).join("")}</div>`
              : ""
          }
        </div>
      </article>
    `;
  }).join("");
}

function findPairSynergies(team) {
  const names = new Set(team.map((champion) => champion.name));
  return pairSynergies
    .filter(([a, b]) => names.has(a) && names.has(b))
    .map(([, , reason]) => reason);
}

function getCompIdentity(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0]?.[0] || "engage";

  const labels = {
    engage: "Hard engage",
    frontline: "Front-to-back",
    damage: "Carry damage",
    pick: "Pick comp",
    poke: "Poke and siege",
    peel: "Protect the carry",
    scaling: "Scaling"
  };

  return labels[top];
}

function getCompArchetypes(scores) {
  const labels = {
    engage: "Teamfight",
    frontline: "Front-to-back",
    damage: "Carry-focused",
    pick: "Pick",
    poke: "Poke",
    peel: "Protect",
    scaling: "Scaling"
  };

  return Object.entries(scores)
    .filter(([, value]) => value >= 48)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => labels[key]);
}

function renderScores() {
  const team = selectedChampions();
  const scores = calculateScores(team);

  scoreBars.innerHTML = scoreKeys
    .map(([key, label]) => {
      const value = scores[key];
      return `
        <div class="score-row">
          <div class="score-row__label"><span>${label}</span><span>${value}%</span></div>
          <div class="score-track"><div class="score-fill" style="width: ${value}%"></div></div>
        </div>
      `;
    })
    .join("");

  const average = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / scoreKeys.length);
  const completeBonus = team.length === 5 ? 12 : 0;
  const synergyBonus = findPairSynergies(team).length * 5;
  const rating = Math.min(100, average + completeBonus + synergyBonus);

  teamRating.textContent =
    rating >= 72 ? "Coherent" : rating >= 52 ? "Playable" : team.length ? "Needs shape" : "Starter";
}

function renderGamePlan() {
  const team = selectedChampions();
  if (!team.length) {
    gamePlan.innerHTML = `
      <p class="empty-state">Start by picking a champion for any role. The app will translate the draft into a simple team identity.</p>
    `;
    return;
  }

  const scores = calculateScores(team);
  const identity = getCompIdentity(scores);
  const archetypes = getCompArchetypes(scores);
  const synergies = findPairSynergies(team);
  const damageMix = getTeamDamageMix(team);
  const missing = [];

  if (scores.frontline < 35) missing.push("a durable frontliner");
  if (scores.damage < 35) missing.push("reliable damage");
  if (scores.engage < 30 && scores.pick < 30 && scores.poke < 30) missing.push("a clear way to start fights");
  if (scores.peel < 30 && team.some((champion) => champion.tags.includes("marksman") || champion.tags.includes("scaling"))) {
    missing.push("more protection for your carry");
  }

  const topAdvice = {
    "Hard engage": "Group first, start decisively, and make sure damage dealers are close enough to follow.",
    "Front-to-back": "Let tanks stand first, hit the nearest safe target, and avoid chasing past your carries.",
    "Carry damage": "Protect your damage source until the enemy burns their engage tools.",
    "Pick comp": "Use vision pockets and crowd control to catch one target before objectives.",
    "Poke and siege": "Chip enemies before committing. You want objectives after the enemy team is already low.",
    "Protect the carry": "Play around one main damage dealer and spend crowd control defensively.",
    Scaling: "Avoid forced early coin-flips and look for clean fights after items."
  };

  gamePlan.innerHTML = `
    <div class="archetype-row">
      ${(archetypes.length ? archetypes : [identity]).map((item) => `<span class="archetype-chip">${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="callout"><strong>${identity}:</strong> ${topAdvice[identity]}</div>
    <div class="callout"><strong>Damage mix:</strong> ${damageMix.Physical} physical, ${damageMix.Magic} magic, ${damageMix.Mixed} mixed, and ${damageMix.Utility} utility picks.</div>
    ${
      synergies.length
        ? synergies.map((reason) => `<div class="callout"><strong>Combo:</strong> ${reason}</div>`).join("")
        : `<div class="callout"><strong>Synergy:</strong> Add champions with overlapping tags to unlock clearer combos.</div>`
    }
    ${
      missing.length
        ? `<div class="callout"><strong>Watch out:</strong> This draft may need ${missing.join(", ")}.</div>`
        : `<div class="callout"><strong>Draft check:</strong> The basics are covered: start fights, survive contact, and deal damage.</div>`
    }
  `;
}
