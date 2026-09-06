function getFavoriteAnchors() {
  return roles
    .filter((role) => favoriteState[role])
    .map((role) => ({ role, champion: getChampion(favoriteState[role]) }))
    .filter((item) => item.champion);
}

function populateFavoriteControls() {
  const previousRole = favoriteRole.value || "Jungle";
  favoriteRole.innerHTML = optionList(roles, roles.includes(previousRole) ? previousRole : "Jungle");
  favoriteRole.value = roles.includes(previousRole) ? previousRole : "Jungle";

  const available = champions
    .filter((champion) => {
      const roleFit = getRoleFit(champion, favoriteRole.value);
      return champion.roles.includes(favoriteRole.value)
        || (allowOffRolePicks?.checked && roleFit.score >= 0.3);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const previousChampion = available.some((champion) => champion.name === favoriteChampion.value)
    ? favoriteChampion.value
    : available[0]?.name;
  favoriteChampion.innerHTML = optionList(available.map((champion) => champion.name), previousChampion);
}

function getPairCompatibility(candidate, teammate) {
  let score = 0;
  const reasons = [];
  const exact = pairSynergies.find(([a, b]) =>
    (a === candidate.name && b === teammate.name) || (b === candidate.name && a === teammate.name));

  if (exact) {
    score += 22;
    reasons.push(exact[2]);
  }

  if (candidate.tags.some((tag) => ["engage", "frontline", "lockdown"].includes(tag))
    && teammate.tags.some((tag) => ["aoe", "wombo", "scaling", "marksman"].includes(tag))) {
    score += 9;
    reasons.push(`${candidate.name} creates space and reliable targets for ${teammate.name}.`);
  }
  if (candidate.tags.some((tag) => ["peel", "shield", "disengage"].includes(tag))
    && teammate.tags.some((tag) => ["marksman", "scaling", "mage"].includes(tag))) {
    score += 10;
    reasons.push(`${candidate.name} protects ${teammate.name} while their damage scales.`);
  }
  if (candidate.tags.some((tag) => ["damage", "burst", "marksman"].includes(tag))
    && teammate.tags.some((tag) => ["engage", "frontline", "lockdown", "pick"].includes(tag))) {
    score += 7;
    reasons.push(`${candidate.name} supplies follow-up damage after ${teammate.name} starts the play.`);
  }
  if (candidate.tags.includes("early") && teammate.tags.includes("scaling")) {
    score += 6;
    reasons.push(`${candidate.name} adds early pressure while ${teammate.name} develops.`);
  }
  if (candidate.tags.includes("poke") && teammate.tags.some((tag) => ["poke", "siege", "pick"].includes(tag))) {
    score += 6;
    reasons.push(`${candidate.name} reinforces the ranged pressure around ${teammate.name}.`);
  }

  return { score, reasons: uniqueList(reasons) };
}

function scoreFavoriteCandidate(candidate, team, role, profile) {
  const recommendation = scoreRecommendation(candidate, team, role);
  let score = recommendation.score;
  const reasons = [...recommendation.reasons];

  scoreKeys.forEach(([key]) => {
    score += (candidate.scores[key] || 0) * (profile.weights[key] || 0);
  });
  profile.tags.forEach((tag) => {
    if (candidate.tags.includes(tag)) score += 6;
  });
  team.forEach((teammate) => {
    const compatibility = getPairCompatibility(candidate, teammate);
    score += compatibility.score;
    reasons.push(...compatibility.reasons);
  });

  return { score, reasons: uniqueList(reasons).slice(0, 3) };
}

function scoreFavoriteTeam(team, profile) {
  const scores = calculateScores(team);
  const damageMix = getTeamDamageMix(team);
  const warnings = getDraftWarnings(team);
  let total = 0;

  scoreKeys.forEach(([key]) => {
    total += scores[key] * (profile.weights[key] || 0.5);
  });
  total += findPairSynergies(team).length * 16;
  total -= warnings.reduce((penalty, warning) => {
    if (warning.severity === "high") return penalty + 26;
    if (warning.severity === "medium") return penalty + 14;
    if (warning.severity === "low") return penalty + 6;
    return penalty;
  }, 0);
  if (damageMix.Physical > 0 && (damageMix.Magic > 0 || damageMix.Mixed > 0)) total += 18;
  if (scores.frontline >= 38 && scores.damage >= 45) total += 14;
  if (scores.engage >= 32 || scores.pick >= 42 || scores.poke >= 48) total += 12;

  return total;
}

function buildFavoriteCandidates(profile) {
  const anchors = getFavoriteAnchors();
  if (!anchors.length) return [];

  const missingRoles = roles.filter((role) => !favoriteState[role]);
  let beam = [{
    picks: { ...favoriteState },
    team: anchors.map((item) => item.champion),
    pathScore: 0,
    reasons: {}
  }];

  missingRoles.forEach((role) => {
    const expanded = [];
    beam.forEach((state) => {
      const usedNames = new Set(state.team.map((champion) => champion.name));
      champions
        .filter((champion) => {
          const roleFit = getRoleFit(champion, role);
          return (champion.roles.includes(role)
            || (allowOffRolePicks?.checked && roleFit.score >= 0.3))
            && !usedNames.has(champion.name);
        })
        .map((champion) => ({ champion, fit: scoreFavoriteCandidate(champion, state.team, role, profile) }))
        .sort((a, b) => b.fit.score - a.fit.score || a.champion.name.localeCompare(b.champion.name))
        .slice(0, 12)
        .forEach(({ champion, fit }) => {
          expanded.push({
            picks: { ...state.picks, [role]: champion.name },
            team: [...state.team, champion],
            pathScore: state.pathScore + fit.score,
            reasons: { ...state.reasons, [role]: fit.reasons }
          });
        });
    });

    beam = expanded
      .sort((a, b) => b.pathScore - a.pathScore)
      .slice(0, 20);
  });

  return beam
    .map((state) => ({
      ...state,
      profile,
      totalScore: state.pathScore + scoreFavoriteTeam(state.team, profile),
      signature: roles.map((role) => state.picks[role]).join("|")
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
}

function getFavoriteVariants() {
  const signatures = new Set();
  const variants = [];
  favoriteCompProfiles.forEach((profile) => {
    const candidates = buildFavoriteCandidates(profile);
    const choice = candidates.find((candidate) => !signatures.has(candidate.signature));
    if (choice) {
      signatures.add(choice.signature);
      variants.push(choice);
    }
  });
  return variants;
}

function getFavoriteVariantSummary(variant) {
  const scores = calculateScores(variant.team);
  const identity = getCompIdentity(scores);
  const warnings = getDraftWarnings(variant.team).filter((warning) => warning.severity !== "info");
  const damageMix = getTeamDamageMix(variant.team);
  const fit = clampPercent(
    58
      + Math.round((scores.engage + scores.frontline + scores.damage + scores.peel) / 20)
      + findPairSynergies(variant.team).length * 3
      - warnings.length * 4
  );

  return {
    identity,
    fit,
    warningText: warnings.length
      ? warnings.slice(0, 2).map((warning) => warning.title).join(", ")
      : "Core team needs are covered.",
    damageText: `${damageMix.Physical} physical, ${damageMix.Magic} magic, ${damageMix.Mixed} mixed`
  };
}

function renderFavoriteBuilder() {
  populateFavoriteControls();
  const anchors = getFavoriteAnchors();

  favoriteCore.innerHTML = anchors.length
    ? anchors.map(({ role, champion }) => `
        <article class="favorite-anchor">
          ${getChampionIconMarkup(champion, "small")}
          <div><span>${escapeHtml(role)}</span><strong>${escapeHtml(champion.name)}</strong></div>
          <button type="button" data-remove-favorite="${escapeHtml(role)}" aria-label="Remove ${escapeHtml(champion.name)} from favorite core">&times;</button>
        </article>
      `).join("")
    : `<p class="empty-state">Add one or more favorite champions. Their roles stay locked while the other lanes are suggested.</p>`;

  if (!anchors.length) {
    favoriteVariantsCache = [];
    favoriteCompSuggestions.innerHTML = "";
    return;
  }

  favoriteVariantsCache = getFavoriteVariants();
  favoriteCompSuggestions.innerHTML = `
    <div class="favorite-suggestion-heading">
      <span>${anchors.length} locked pick${anchors.length === 1 ? "" : "s"}</span>
      <strong>Suggested full teams</strong>
    </div>
    <div class="favorite-variant-grid">
      ${favoriteVariantsCache.map((variant) => {
        const summary = getFavoriteVariantSummary(variant);
        return `
          <article class="favorite-variant">
            <div class="favorite-variant__heading">
              <div><span>${escapeHtml(variant.profile.name)}</span><h3>${escapeHtml(summary.identity)}</h3></div>
              <strong>${summary.fit}% fit</strong>
            </div>
            <p>${escapeHtml(variant.profile.description)}</p>
            <div class="favorite-variant__roster">
              ${roles.map((role) => {
                const champion = getChampion(variant.picks[role]);
                const locked = favoriteState[role] === champion.name;
                const roleFit = getRoleFit(champion, role);
                return `
                  <div class="${locked ? "is-locked" : ""}">
                    <span>${escapeHtml(role)}</span>
                    ${getChampionIconMarkup(champion, "small")}
                    <strong>${escapeHtml(champion.name)}</strong>
                    <small>${locked ? "Favorite" : roleFit.offRole ? "Off-role" : "Suggested"}</small>
                  </div>
                `;
              }).join("")}
            </div>
            <div class="favorite-variant__reasons">
              ${roles.filter((role) => !favoriteState[role]).map((role) => {
                const champion = getChampion(variant.picks[role]);
                const reason = variant.reasons[role]?.[0] || `${champion.name} fills an important ${role} need for this team.`;
                return `<p><strong>${escapeHtml(role)} - ${escapeHtml(champion.name)}:</strong> ${escapeHtml(reason)}</p>`;
              }).join("")}
            </div>
            <div class="favorite-variant__footer">
              <span>${escapeHtml(summary.damageText)}. ${escapeHtml(summary.warningText)}</span>
              <button class="text-button" type="button" data-load-favorite-variant="${escapeHtml(variant.profile.id)}">Use this team</button>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function addFavoriteChampion() {
  const role = favoriteRole.value;
  const champion = getChampion(favoriteChampion.value);
  if (!roles.includes(role) || !champion) return;
  if (!champion.roles.includes(role) && !allowOffRolePicks?.checked) return;
  favoriteState[role] = champion.name;
  roleState[role] = champion.name;
  renderAll();
}

function removeFavoriteChampion(role) {
  favoriteState[role] = null;
  renderAll();
}

function clearFavoriteCore(clearPicks = false) {
  roles.forEach((role) => {
    favoriteState[role] = null;
    if (clearPicks) roleState[role] = null;
  });
}

function lockCurrentPicksAsFavorites() {
  roles.forEach((role) => {
    favoriteState[role] = roleState[role];
  });
  renderAll();
}

function loadFavoriteVariant(profileId) {
  const variant = favoriteVariantsCache.find((item) => item.profile.id === profileId);
  if (!variant) return;
  roles.forEach((role) => {
    roleState[role] = variant.picks[role];
  });
  renderAll();
  setSaveStatus(`${variant.profile.name} favorite team loaded.`);
}
