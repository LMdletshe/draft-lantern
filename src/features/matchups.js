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
  const kitRead = getKitCounterFactors(enemy, candidate);
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

  score += kitRead.scoreDelta;
  evidence += kitRead.evidence;
  reasons.push(...kitRead.positives.map((factor) => factor.reason));

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
    kitFactors: kitRead.positives.slice(0, 3),
    smartFactors: uniqueList([...kitRead.positives, ...smartRead.positives]).slice(0, 4),
    smartRisks: smartRead.negatives.slice(0, 2),
    tier: getEvidenceBackedDifficulty(finalScore)
  };
}

function getEvidenceBackedDifficulty(score) {
  // Draft Room model scores cannot certify an exact counter.
  if (score >= 64) return { key: "modeled", label: "Modeled edge", className: "is-edge" };
  if (score >= 48) return { key: "even", label: "Modeled even", className: "is-even" };
  return { key: "difficult", label: "Modeled difficult", className: "is-difficult" };
}

function getKitCounterFactors(enemy, candidate) {
  const enemySignals = getChampionProfileSignals(enemy);
  const candidateSignals = getChampionProfileSignals(candidate);
  const checks = [
    {
      label: "Reliable lockdown",
      candidateAny: ["point-click", "lockdown", "crowd-control"],
      enemyAny: ["mobility", "dash", "assassin", "dive"],
      score: 14,
      evidence: 2,
      reason: `${candidate.name} has reliable control that can punish ${enemy.name}'s mobility or commit window.`
    },
    {
      label: "Anti-dive tools",
      candidateAny: ["peel", "disengage", "anti-dive", "spell-shield", "untargetable", "unstoppable"],
      enemyAny: ["dive", "assassin", "burst", "hard-engage"],
      score: 13,
      evidence: 2,
      reason: `${candidate.name}'s kit can break the first engage that ${enemy.name} usually needs.`
    },
    {
      label: "Range denial",
      candidateAny: ["range", "poke", "kite", "siege"],
      enemyAny: ["low-range", "immobile", "frontline"],
      score: 11,
      evidence: 1,
      reason: `${candidate.name} can threaten ${enemy.name} before ${enemy.name} reaches effective range.`
    },
    {
      label: "Tank shred",
      candidateAny: ["frontline-check", "high-dps", "marksman"],
      enemyAny: ["tank", "frontline", "durable", "sustain"],
      score: 11,
      evidence: 1,
      reason: `${candidate.name} brings sustained damage that directly attacks ${enemy.name}'s durability plan.`
    },
    {
      label: "Safety into pick",
      candidateAny: ["safe", "spell-shield", "untargetable", "unstoppable", "peel"],
      enemyAny: ["pick", "burst", "lockdown", "assassin"],
      score: 10,
      evidence: 1,
      reason: `${candidate.name} has defensive kit texture that lowers ${enemy.name}'s pick threat.`
    },
    {
      label: "Tempo punish",
      candidateAny: ["early", "duel", "skirmish", "snowball"],
      enemyAny: ["scaling", "item-reliant", "farming-jungle"],
      score: 10,
      evidence: 1,
      reason: `${candidate.name} can contest ${enemy.name} before the scaling or farm pattern stabilizes.`
    },
    {
      label: "Zone control",
      candidateAny: ["zone-control", "wave-clear", "global"],
      enemyAny: ["split-push", "roam", "proxy", "low-range"],
      score: 8,
      evidence: 1,
      reason: `${candidate.name} can slow down ${enemy.name}'s map or space-control pattern.`
    }
  ];

  const positives = checks.filter((check) =>
    traitsHaveAny(candidateSignals, check.candidateAny) && traitsHaveAny(enemySignals, check.enemyAny)
  );

  return {
    positives,
    scoreDelta: positives.reduce((total, item) => total + item.score, 0),
    evidence: positives.reduce((total, item) => total + item.evidence, 0)
  };
}

function populateExplorerControls() {
  const currentRole = explorerRole.value || "All";
  explorerRole.innerHTML = optionList(["All", ...roles], currentRole);

  const strengthOptions = [
    ["all", "All researched answers"],
    ["hard", "Direct counters"]
  ];
  const currentStrength = explorerStrength.value || "all";
  explorerStrength.innerHTML = strengthOptions
    .map(([value, label]) => `<option value="${value}" ${value === currentStrength ? "selected" : ""}>${label}</option>`)
    .join("");
}

function populateTierControls() {
  if (!tierRole) return;
  const currentRole = tierRole.value || "All";
  tierRole.innerHTML = optionList(["All", ...roles], currentRole);
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
  const traits = getChampionProfileSignals(champion);
  const scoreTotal = scoreKeys.reduce((total, [key]) => total + ((scores[key] || 0) * (weights[key] || 1)), 0);
  const scoreMax = scoreKeys.reduce((total, [key]) => total + (5 * (weights[key] || 1)), 0);
  let score = 25 + (scoreTotal / Math.max(1, scoreMax)) * 38;
  const reasons = [];

  score += roleFit.offRole ? (roleFit.score - 0.58) * 18 : roleFit.score * 5;
  score += getRoleTraitBonus(champion, role);
  score += Math.min(4, (info.attack || 0) * 0.24 + (info.defense || 0) * 0.16 + (info.magic || 0) * 0.16);

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

  const finalScore = Math.max(1, Math.min(99, Math.round(score)));
  return {
    champion,
    role,
    score: finalScore,
    tier: getChampionTier(finalScore),
    roleFit,
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

  tierList.innerHTML = `
    <div class="tier-list__note">
      <strong>${escapeHtml(dataSourceLabel)}</strong>
      <span>Model-based S to D ranking from Riot champion attributes, role fit, archetype value, and matchup rules. This is not a live global win-rate feed.</span>
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
                        <small>${escapeHtml(item.role)}${item.roleFit.offRole ? " off-role" : ""} &middot; ${item.score}/100</small>
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

function getRankedExplorerMatchups(champion, role = "All") {
  return getResearchedExplorerMatchups(champion, role);
}

function getExplorerMatchups(champion) {
  const strength = explorerStrength.value || "all";
  return getRankedExplorerMatchups(champion, explorerRole.value || "All")
    .filter((result) => strength !== "hard" || result.rule.kind === "direct");
}

function getExplorerOpponentPlan(champion, opponent) {
  return getResearchedCounterRule(champion, opponent)?.play || "No researched plan for this pairing yet.";
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
  const researchedCount = getRankedExplorerMatchups(champion).length;
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
        <span>${researchedCount} researched counter plan${researchedCount === 1 ? "" : "s"}</span>
        ${champion.roles.map((role) => `<button class="text-button" type="button" data-explorer-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
      </div>
    </div>

    <div class="explorer-profile-facts">
      <div><span>Patch tier model</span><strong>${escapeHtml(tierEval.tier.label)} as ${escapeHtml(evalRole)} (${tierEval.score}/100)</strong></div>
      <div><span>Role fit</span><strong>${escapeHtml(tierEval.roleFit.label)}${tierEval.roleFit.offRole ? ` for ${escapeHtml(evalRole)}` : ""}</strong></div>
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

  explorerCounterResults.innerHTML = `
    <div class="explorer-counter-heading">
      <div><p class="eyebrow">Who ${escapeHtml(champion.name)} counters</p><h2>${matchups.length} researched answer${matchups.length === 1 ? "" : "s"}</h2></div>
      <p>Named ability interactions and role-specific plans. Review ${escapeHtml(counterMatchupReview.patch)}; no matchup win-rate feed. ${getCounterCoverage().championsCovered}/${champions.length} loaded champions have researched answers in every supported role.</p>
    </div>
    ${matchups.length
      ? `<div class="explorer-matchup-grid">${matchups.map((result, index) => renderResearchedCounterCard(result, index, true)).join("")}</div>`
      : `<p class="empty-state">No researched ${explorerStrength.value === "hard" ? "direct counter" : "answer"} entry for ${escapeHtml(champion.name)} with these opponent-role filters yet. The library covers ${new Set(counterMatchupRules.map((rule) => rule.enemy)).size} opponents; an empty result means research is missing, not that no counter exists.</p>`}
  `;
}


function renderResearchedCounterCard(result, index, explorer = false) {
  const shownChampion = explorer ? result.opponent : result.candidate;
  return `<article class="${explorer ? "explorer-matchup-card" : "counter-card"}">
    <div class="counter-card__top">
      ${getChampionIconMarkup(shownChampion, "small")}
      <div><span class="counter-card__rank">Researched answer ${index + 1}</span><h3>${escapeHtml(shownChampion.name)}</h3><small>${escapeHtml(result.rule.role)} vs ${escapeHtml(result.rule.enemyRole)}</small></div>
    </div>
    <span class="difficulty-pill ${result.tier.className}">${escapeHtml(result.tier.label)}</span>
    ${renderCounterInteraction(result)}
    ${renderMatchupRunes(result.candidate, result.opponent, result.rule.role, result.rule)}
    <div class="counter-card__actions">
      ${explorer
        ? `<button class="text-button" type="button" data-details="${escapeHtml(result.opponent.name)}">View ${escapeHtml(result.opponent.name)}</button>`
        : `<button class="text-button" type="button" data-counter-pick="${escapeHtml(result.candidate.name)}" data-role="${escapeHtml(result.rule.role)}">Use in team</button><button class="icon-button icon-button--small" type="button" data-details="${escapeHtml(result.candidate.name)}" aria-label="View ${escapeHtml(result.candidate.name)} details">i</button>`}
    </div>
  </article>`;
}

function renderCounters() {
  const enemy = getChampion(enemyPick.value);
  if (!enemy) {
    matchupOverview.innerHTML = "";
    counterResults.innerHTML = '<p class="empty-state">Choose an enemy champion to see researched counter interactions.</p>';
    return;
  }
  const role = allyRole.value || enemyRole.value;
  const limit = Number.parseInt(counterCount?.value || "6", 10);
  const candidates = getResearchedCounters(enemy, role, enemyRole.value, Boolean(matchupOffRole?.checked)).slice(0, limit);
  const coverage = getCounterCoverage();
  const waitingReview = counterMatchupRules.filter((rule) => rule.enemy === enemy.name && rule.role === role && rule.enemyRole === enemyRole.value && !inspectCounterRule(rule).usable).length;
  matchupOverview.innerHTML = `
    <div class="matchup-overview__enemy">
      ${getChampionIconMarkup(enemy, "small")}<div><span>Facing ${escapeHtml(enemy.name)} as enemy ${escapeHtml(enemyRole.value)}</span><strong>${escapeHtml(enemy.style)}</strong></div>
    </div>
    <div class="matchup-overview__notes">
      <span><strong>Showing:</strong> ${candidates.length} researched ${escapeHtml(role)} answer${candidates.length === 1 ? "" : "s"}.</span>
      <span><strong>Basis:</strong> Specific champion abilities, execution windows, and failure conditions. Direct mechanic denial is listed before conditional lane pressure; this is not a measured win-rate ranking.</span>
      <span><strong>Coverage:</strong> ${coverage.championsCovered}/${coverage.championsTotal} champions · ${coverage.rolesCovered}/${coverage.rolesTotal} supported roles · ${coverage.entries} usable directed entries. Tactical review ${escapeHtml(counterMatchupReview.patch)}.</span>
      <span><strong>Loaded data:</strong> ${escapeHtml(getRiotDataSourceLabel())}.</span>
    </div>`;
  counterResults.innerHTML = candidates.length
    ? candidates.map((result, index) => renderResearchedCounterCard(result, index)).join("")
    : `<p class="empty-state">${waitingReview ? "The ability evidence changed and these entries need review." : "No researched counter entry is available for this champion and role combination yet. Choose your matching lane role for the researched lane answers."} This does not mean the champion has no counters. ${riotData.status !== "ready" ? `Using the dated ${escapeHtml(bundledChampionRoster.version)} full-roster snapshot.` : ""}</p>`;
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
  const sameRoleCounters = sortResearchedCounters(counterMatchupRules
    .filter((rule) => rule.enemy === champion.name && rule.role === rule.enemyRole)
    .map(makeResearchedCounterResult)).slice(0, 3);

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
      <h3>Researched answers</h3>
      <div class="detail-answer-row">
        ${sameRoleCounters.length ? sameRoleCounters.map((item) => `<span>${escapeHtml(item.candidate.name)} <small>${escapeHtml(item.rule.role)} · ${escapeHtml(item.tier.label)}</small></span>`).join("") : "<p>No researched same-role entry yet.</p>"}
      </div>
    </div>
    <div class="dialog-actions">
      ${champion.roles.map((role) => `<button class="text-button" type="button" data-dialog-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
    </div>
  `;

  if (typeof championDialog.showModal === "function") championDialog.showModal();
  else championDialog.setAttribute("open", "");
}
