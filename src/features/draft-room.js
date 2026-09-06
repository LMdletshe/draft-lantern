function getDraftTeam(side) {
  const state = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  return roles.map((role) => getChampion(state[role])).filter(Boolean);
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getTeamPhaseScores(team) {
  if (!team.length) return { early: 0, mid: 0, late: 0 };

  const scores = calculateScores(team);
  const earlyCount = countTeamTag(team, ["early", "snowball"]);
  const scalingCount = countTeamTag(team, ["scaling"]);
  const safeCount = countTeamTag(team, ["safe", "sustain"]);

  return {
    early: clampPercent(28 + earlyCount * 12 + safeCount * 4 + scores.pick * 0.18 + scores.engage * 0.14 - scalingCount * 3),
    mid: clampPercent(scores.engage * 0.24 + scores.pick * 0.24 + scores.damage * 0.24 + scores.frontline * 0.14 + scores.poke * 0.14),
    late: clampPercent(scores.scaling * 0.38 + scores.damage * 0.24 + scores.peel * 0.18 + scores.frontline * 0.12 + scores.poke * 0.08)
  };
}

function getPrimaryThreats(team) {
  return [...team]
    .map((champion) => ({
      champion,
      score: (champion.scores.damage || 0) * 4 + (champion.scores.pick || 0) * 2 + (champion.scores.scaling || 0) * 2 + (champion.tags.includes("marksman") ? 4 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => item.champion);
}

function getComparisonLeader(blueValue, redValue, threshold = 7) {
  const difference = blueValue - redValue;
  if (Math.abs(difference) < threshold) return "Even";
  return difference > 0 ? "Blue" : "Red";
}

function getVersusPlan(team, enemy, side) {
  if (!team.length) {
    return {
      win: "Add picks to reveal this team's win condition.",
      fight: "The fight plan will appear as the composition takes shape.",
      avoid: "No major warning yet."
    };
  }

  const scores = calculateScores(team);
  const enemyScores = calculateScores(enemy);
  const identity = getCompIdentity(scores);
  const plans = {
    "Hard engage": "Group with your damage dealers, find a flank or grouped target, and start before the enemy can spread out.",
    "Front-to-back": "Keep the formation compact: frontline first, carries behind, and hit the nearest safe target.",
    "Carry damage": "Buy time for the main damage dealer and avoid splitting the fight across multiple targets.",
    "Pick comp": "Control fog of war and turn one catch into an objective before the enemy can regroup.",
    "Poke and siege": "Arrive first, chip health bars, and only commit after the enemy is too low to contest.",
    "Protect the carry": "Hold crowd control defensively and force the enemy to cross your frontline to reach the carry.",
    Scaling: "Reduce early risk, trade objectives when necessary, and fight after key item breakpoints."
  };

  let avoid = "Avoid chasing beyond your vision after the first target falls.";
  if (enemyScores.engage >= 58) avoid = "Do not group tightly in narrow entrances where the enemy can land a multi-person engage.";
  else if (enemyScores.pick >= 58) avoid = "Do not move through unwarded jungle alone; the enemy is strongest when someone is isolated.";
  else if (enemyScores.poke >= 58) avoid = "Do not arrive late to objectives and walk through repeated ranged damage.";
  else if (enemyScores.scaling >= 62) avoid = "Do not let a winning early game drift into low-value farming; convert leads into towers and objectives.";

  const threats = getPrimaryThreats(enemy).map((champion) => champion.name);
  const threatText = threats.length ? `Track ${threats.join(" and ")} before committing.` : "Track the enemy's main damage cooldowns.";

  return {
    win: `${plans[identity]} ${threatText}`,
    fight: scores.engage >= scores.peel
      ? `${side} should call one clear target and make sure follow-up damage is close before engaging.`
      : `${side} should let the enemy enter first, protect the backline, and counter-engage after key cooldowns are used.`,
    avoid
  };
}

function getLaneComparisons() {
  return roles.map((role) => {
    const blueChampion = getChampion(draftRoomState.blue[role]);
    const redChampion = getChampion(draftRoomState.red[role]);
    if (!blueChampion || !redChampion) {
      return { role, blueChampion, redChampion, leader: "Pending", note: "Both picks are needed." };
    }

    const blueFit = scoreCounter(redChampion, blueChampion).score;
    const redFit = scoreCounter(blueChampion, redChampion).score;
    const leader = getComparisonLeader(blueFit, redFit, 8);
    const note = leader === "Even"
      ? "Broadly even; execution and jungle attention matter more."
      : `${leader} has the cleaner general matchup pattern.`;
    return { role, blueChampion, redChampion, leader, note };
  });
}

function getObjectivePlans(blueTeam, redTeam) {
  const blueScores = calculateScores(blueTeam);
  const redScores = calculateScores(redTeam);
  const bluePhases = getTeamPhaseScores(blueTeam);
  const redPhases = getTeamPhaseScores(redTeam);
  const objectives = [
    {
      name: "Early dragons",
      blue: bluePhases.early + blueScores.engage * 0.25,
      red: redPhases.early + redScores.engage * 0.25,
      even: "Set vision first and avoid starting while lanes are missing.",
      leader: "Use earlier lane pressure to enter the river first and force the other team to face-check."
    },
    {
      name: "Baron setup",
      blue: blueScores.damage * 0.35 + blueScores.frontline * 0.3 + blueScores.pick * 0.2 + blueScores.scaling * 0.15,
      red: redScores.damage * 0.35 + redScores.frontline * 0.3 + redScores.pick * 0.2 + redScores.scaling * 0.15,
      even: "Clear vision in layers and do not start Baron without knowing where the main enemy threat is.",
      leader: "Threaten Baron to pull the enemy into poor vision, then turn onto the first isolated target."
    },
    {
      name: "Tower siege",
      blue: blueScores.poke * 0.45 + blueScores.damage * 0.35 + blueScores.peel * 0.2,
      red: redScores.poke * 0.45 + redScores.damage * 0.35 + redScores.peel * 0.2,
      even: "Push side waves before grouping so the siege creates map pressure.",
      leader: "Use the range advantage to damage the tower or defenders without forcing a full dive."
    },
    {
      name: "Jungle fights",
      blue: blueScores.engage * 0.4 + blueScores.pick * 0.35 + blueScores.frontline * 0.25,
      red: redScores.engage * 0.4 + redScores.pick * 0.35 + redScores.frontline * 0.25,
      even: "The first team to establish vision and formation will have the practical advantage.",
      leader: "Fight in narrow terrain where crowd control and target access are easiest to coordinate."
    }
  ];

  return objectives.map((objective) => {
    const winner = getComparisonLeader(objective.blue, objective.red, 7);
    return {
      name: objective.name,
      winner,
      advice: winner === "Even" ? objective.even : `${winner}: ${objective.leader}`
    };
  });
}

function renderComparisonMeter(label, blueValue, redValue) {
  const total = blueValue + redValue;
  const blueWidth = total ? Math.round((blueValue / total) * 100) : 50;
  const leader = getComparisonLeader(blueValue, redValue);
  return `
    <div class="comparison-meter">
      <div class="comparison-meter__label">
        <span>${blueValue}%</span>
        <strong>${escapeHtml(label)}</strong>
        <span>${redValue}%</span>
      </div>
      <div class="comparison-meter__track">
        <span class="comparison-meter__blue" style="width: ${blueWidth}%"></span>
        <span class="comparison-meter__red" style="width: ${100 - blueWidth}%"></span>
      </div>
      <small>${leader === "Even" ? "Even" : `${leader} edge`}</small>
    </div>
  `;
}

function renderDraftComparison() {
  const blueTeam = getDraftTeam("Blue");
  const redTeam = getDraftTeam("Red");
  comparisonStatus.textContent = `${blueTeam.length}/5 vs ${redTeam.length}/5`;

  if (!blueTeam.length && !redTeam.length) {
    draftComparison.innerHTML = `<p class="empty-state">Team comparison will update live as both sides make their picks.</p>`;
    return;
  }

  const blueScores = calculateScores(blueTeam);
  const redScores = calculateScores(redTeam);
  const bluePhases = getTeamPhaseScores(blueTeam);
  const redPhases = getTeamPhaseScores(redTeam);
  const bluePlan = getVersusPlan(blueTeam, redTeam, "Blue");
  const redPlan = getVersusPlan(redTeam, blueTeam, "Red");
  const blueWarnings = getDraftWarnings(blueTeam).filter((warning) => warning.severity !== "info");
  const redWarnings = getDraftWarnings(redTeam).filter((warning) => warning.severity !== "info");
  const blueThreats = getPrimaryThreats(blueTeam);
  const redThreats = getPrimaryThreats(redTeam);
  const laneComparisons = getLaneComparisons();
  const objectivePlans = getObjectivePlans(blueTeam, redTeam);

  draftComparison.innerHTML = `
    <div class="phase-grid">
      ${renderComparisonMeter("Early game", bluePhases.early, redPhases.early)}
      ${renderComparisonMeter("Mid game", bluePhases.mid, redPhases.mid)}
      ${renderComparisonMeter("Late game", bluePhases.late, redPhases.late)}
    </div>

    <div class="comparison-layout">
      <article class="team-plan team-plan--blue">
        <div class="team-plan__heading"><span>Blue plan</span><strong>${escapeHtml(blueTeam.length ? getCompIdentity(blueScores) : "Waiting")}</strong></div>
        <p><strong>Win condition:</strong> ${escapeHtml(bluePlan.win)}</p>
        <p><strong>Fight shape:</strong> ${escapeHtml(bluePlan.fight)}</p>
        <p><strong>Avoid:</strong> ${escapeHtml(bluePlan.avoid)}</p>
        <div class="threat-row"><span>Primary threats</span>${blueThreats.length ? blueThreats.map((champion) => `<strong>${escapeHtml(champion.name)}</strong>`).join("") : "<em>Waiting for picks</em>"}</div>
        <div class="risk-line">${blueWarnings.length ? `${blueWarnings.length} draft risk${blueWarnings.length === 1 ? "" : "s"}: ${escapeHtml(blueWarnings.slice(0, 2).map((warning) => warning.title).join(", "))}` : "No major draft warning."}</div>
      </article>

      <div class="trait-comparison">
        ${scoreKeys.map(([key, label]) => renderComparisonMeter(label, blueScores[key], redScores[key])).join("")}
      </div>

      <article class="team-plan team-plan--red">
        <div class="team-plan__heading"><span>Red plan</span><strong>${escapeHtml(redTeam.length ? getCompIdentity(redScores) : "Waiting")}</strong></div>
        <p><strong>Win condition:</strong> ${escapeHtml(redPlan.win)}</p>
        <p><strong>Fight shape:</strong> ${escapeHtml(redPlan.fight)}</p>
        <p><strong>Avoid:</strong> ${escapeHtml(redPlan.avoid)}</p>
        <div class="threat-row"><span>Primary threats</span>${redThreats.length ? redThreats.map((champion) => `<strong>${escapeHtml(champion.name)}</strong>`).join("") : "<em>Waiting for picks</em>"}</div>
        <div class="risk-line">${redWarnings.length ? `${redWarnings.length} draft risk${redWarnings.length === 1 ? "" : "s"}: ${escapeHtml(redWarnings.slice(0, 2).map((warning) => warning.title).join(", "))}` : "No major draft warning."}</div>
      </article>
    </div>

    <div class="comparison-detail-grid">
      <section class="lane-comparison">
        <div class="comparison-subheading"><span>Lane read</span><strong>General patterns</strong></div>
        ${laneComparisons.map((lane) => `
          <div class="lane-comparison__row">
            <span>${escapeHtml(lane.blueChampion?.name || "Open")}</span>
            <div><strong>${escapeHtml(lane.role)}: ${escapeHtml(lane.leader)}</strong><small>${escapeHtml(lane.note)}</small></div>
            <span>${escapeHtml(lane.redChampion?.name || "Open")}</span>
          </div>
        `).join("")}
      </section>

      <section class="objective-plan">
        <div class="comparison-subheading"><span>Objective planner</span><strong>Where each comp works</strong></div>
        ${objectivePlans.map((objective) => `
          <div class="objective-plan__row">
            <strong>${escapeHtml(objective.name)}</strong>
            <span class="objective-winner objective-winner--${objective.winner.toLowerCase()}">${escapeHtml(objective.winner)}</span>
            <p>${escapeHtml(objective.advice)}</p>
          </div>
        `).join("")}
      </section>
    </div>
  `;
}

function getDraftUsedNames() {
  return new Set([
    ...draftRoomState.blueBans,
    ...draftRoomState.redBans,
    ...Object.values(draftRoomState.blue),
    ...Object.values(draftRoomState.red)
  ].filter(Boolean));
}

function canDraftChampionBeBanned(champion, used) {
  const blocked = new Set([...used, champion.name]);
  return roles.every((role) => {
    const remainingSpots = Number(!draftRoomState.blue[role]) + Number(!draftRoomState.red[role]);
    const availableForRole = champions.filter((candidate) => candidate.roles.includes(role) && !blocked.has(candidate.name)).length;
    return availableForRole >= remainingSpots;
  });
}

function getDraftTurnLabel(turn) {
  if (!turn) return "Draft complete";
  if (turn.type === "ban") return `${turn.side} ban ${turn.round} of 5`;
  return `${turn.side} picks ${turn.role}`;
}

function renderDraftTeamPicks(side, container) {
  const picks = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  container.innerHTML = roles.map((role) => {
    const champion = getChampion(picks[role]);
    return `
      <article class="draft-pick-slot ${champion ? "is-filled" : ""}">
        <span>${escapeHtml(role)}</span>
        ${
          champion
            ? `<div>${getChampionIconMarkup(champion, "small")}<strong>${escapeHtml(champion.name)}</strong></div>`
            : `<p>Open</p>`
        }
      </article>
    `;
  }).join("");
}

function renderDraftBans(items, container) {
  container.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const champion = getChampion(items[index]);
    return champion
      ? `<span class="ban-pick" title="${escapeHtml(champion.name)}">${getChampionIconMarkup(champion, "small")}</span>`
      : `<span class="ban-pick is-empty">-</span>`;
  }).join("");
}

function getDraftSuggestions(turn, used) {
  if (!turn) return [];
  if (turn.type === "ban") {
    return champions
      .filter((champion) => !used.has(champion.name) && canDraftChampionBeBanned(champion, used))
      .map((champion) => ({
        candidate: champion,
        score: Object.values(champion.scores).reduce((sum, value) => sum + value, 0),
        reasons: [`Flexible threat with ${champion.style.toLowerCase()}.`]
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  const team = getDraftTeam(turn.side);
  return getRecommendationsForTeam(team, turn.role, used);
}

function renderDraftRoom() {
  const turn = draftSequence[draftRoomState.turn];
  const used = getDraftUsedNames();
  draftTurn.innerHTML = turn
    ? `<span class="turn-side turn-side--${turn.side.toLowerCase()}">${escapeHtml(turn.side)}</span><strong>${escapeHtml(getDraftTurnLabel(turn))}</strong><p>${turn.type === "ban" ? "Remove a champion you do not want either team to use." : `Choose a ${turn.role} champion that helps the current team.`}</p>`
    : `<strong>Draft complete</strong><p>Both teams are ready. Compare their identities before loading one into the Team Builder.</p>`;

  renderDraftBans(draftRoomState.blueBans, blueBans);
  renderDraftBans(draftRoomState.redBans, redBans);
  renderDraftTeamPicks("Blue", bluePicks);
  renderDraftTeamPicks("Red", redPicks);

  const blueTeam = getDraftTeam("Blue");
  const redTeam = getDraftTeam("Red");
  blueIdentity.textContent = blueTeam.length ? getCompIdentity(calculateScores(blueTeam)) : "Waiting";
  redIdentity.textContent = redTeam.length ? getCompIdentity(calculateScores(redTeam)) : "Waiting";
  renderDraftComparison();

  const suggestions = getDraftSuggestions(turn, used);
  draftSuggestions.innerHTML = suggestions.length
    ? `<span>Smart ideas:</span>${suggestions.map((item) => `<button type="button" data-draft-champion="${escapeHtml(item.candidate.name)}">${escapeHtml(item.candidate.name)}</button>`).join("")}`
    : "";

  if (!turn) {
    draftChampionGrid.innerHTML = `
      <button class="draft-finish-button draft-finish-button--blue" type="button" data-load-side="Blue">Load Blue into builder</button>
      <button class="draft-finish-button draft-finish-button--red" type="button" data-load-side="Red">Load Red into builder</button>
    `;
    return;
  }

  const query = draftSearch.value.trim().toLowerCase();
  const available = champions
    .filter((champion) => !used.has(champion.name))
    .filter((champion) => turn.type !== "ban" || canDraftChampionBeBanned(champion, used))
    .filter((champion) => turn.type === "ban" || champion.roles.includes(turn.role))
    .filter((champion) => !query || championMatchesQuery(champion, query))
    .slice(0, 80);

  draftChampionGrid.innerHTML = available.map((champion) => `
    <button class="draft-champion-button" type="button" data-draft-champion="${escapeHtml(champion.name)}">
      ${getChampionIconMarkup(champion, "small")}
      <span>${escapeHtml(champion.name)}</span>
    </button>
  `).join("");
}

function chooseDraftChampion(name) {
  const turn = draftSequence[draftRoomState.turn];
  const champion = getChampion(name);
  if (!turn || !champion || getDraftUsedNames().has(name)) return;
  if (turn.type === "ban" && !canDraftChampionBeBanned(champion, getDraftUsedNames())) return;
  if (turn.type === "pick" && !champion.roles.includes(turn.role)) return;

  draftRoomState.history.push(JSON.stringify({
    turn: draftRoomState.turn,
    blue: draftRoomState.blue,
    red: draftRoomState.red,
    blueBans: draftRoomState.blueBans,
    redBans: draftRoomState.redBans
  }));

  if (turn.type === "ban") {
    const bans = turn.side === "Blue" ? draftRoomState.blueBans : draftRoomState.redBans;
    bans.push(name);
  } else {
    const picks = turn.side === "Blue" ? draftRoomState.blue : draftRoomState.red;
    picks[turn.role] = name;
  }

  draftRoomState.turn += 1;
  draftSearch.value = "";
  renderDraftRoom();
}

function undoDraftRoom() {
  const snapshot = draftRoomState.history.pop();
  if (!snapshot) return;
  const previous = JSON.parse(snapshot);
  draftRoomState.turn = previous.turn;
  draftRoomState.blue = previous.blue;
  draftRoomState.red = previous.red;
  draftRoomState.blueBans = previous.blueBans;
  draftRoomState.redBans = previous.redBans;
  renderDraftRoom();
}

function resetDraftRoom() {
  draftRoomState.turn = 0;
  draftRoomState.blue = Object.fromEntries(roles.map((role) => [role, null]));
  draftRoomState.red = Object.fromEntries(roles.map((role) => [role, null]));
  draftRoomState.blueBans = [];
  draftRoomState.redBans = [];
  draftRoomState.history = [];
  draftSearch.value = "";
  renderDraftRoom();
}

function loadDraftSide(side) {
  const source = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = source[role];
  });
  switchView("builderView");
  renderAll();
}
