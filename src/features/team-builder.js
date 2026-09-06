function renderChampionGrid() {
  const query = champSearch.value.trim();
  const includeOffRole = Boolean(allowOffRolePicks?.checked);
  const filtered = champions
    .filter((champion) => {
      const roleFit = activeRole === "All" ? null : getRoleFit(champion, activeRole);
      const roleMatch = activeRole === "All"
        || champion.roles.includes(activeRole)
        || (includeOffRole && roleFit.score >= 0.3);
      return roleMatch && championMatchesQuery(champion, query);
    })
    .sort((a, b) => {
      const searchDifference = getChampionSearchRank(b, query) - getChampionSearchRank(a, query);
      if (searchDifference) return searchDifference;
      if (activeRole !== "All") {
        const roleDifference = getRoleFit(b, activeRole).score - getRoleFit(a, activeRole).score;
        if (roleDifference) return roleDifference;
      }
      return a.name.localeCompare(b.name);
    });

  championGrid.innerHTML = filtered
    .map((champion) => {
      const primaryRole = activeRole !== "All" ? activeRole : champion.roles[0];
      const roleFit = getRoleFit(champion, primaryRole);
      const title = champion.official?.title ? `, ${champion.official.title}` : "";
      const sourceTag = champion.generated ? `<span class="tag tag--generated">modeled profile</span>` : "";
      const offRoleTag = roleFit.offRole
        ? `<span class="off-role-note">${escapeHtml(roleFit.label)} ${escapeHtml(primaryRole)}</span>`
        : "";
      return `
        <article class="champion-card">
          <button class="champion-card__pick" type="button" data-champion="${escapeHtml(champion.name)}" data-role="${escapeHtml(primaryRole)}" aria-label="Add ${escapeHtml(champion.name)} as ${escapeHtml(primaryRole)}">
            ${getChampionIconMarkup(champion)}
            <div class="champion-card__body">
              <div class="champion-card__top">
                <h3>${escapeHtml(champion.name)}${escapeHtml(title)}</h3>
                <span class="role-chip">${escapeHtml(champion.roles.join(" / "))}</span>
              </div>
              <p>${escapeHtml(champion.style)}. ${escapeHtml(champion.beginner)}</p>
              <div class="tags">
                ${champion.tags.slice(0, 3).map((tag) => `<span class="tag tag--${escapeHtml(tag)}">${escapeHtml(tag)}</span>`).join("")}
                ${offRoleTag}
                ${sourceTag}
              </div>
            </div>
          </button>
          <button class="champion-card__info" type="button" data-details="${escapeHtml(champion.name)}" aria-label="View ${escapeHtml(champion.name)} details" title="Champion details">i</button>
        </article>
      `;
    })
    .join("");

  if (!filtered.length) {
    championGrid.innerHTML = `<p class="empty-state">No champions found. Try a role, name, or idea like "poke", "engage", "scaling", or "peel".</p>`;
  }
}

function renderDraftSlots() {
  draftSlots.innerHTML = roles
    .map((role) => {
      const champion = roleState[role] ? getChampion(roleState[role]) : null;
      if (!champion) {
        return `
          <article class="slot">
            <div class="slot__role"><span>${escapeHtml(role)}</span></div>
            <p class="slot__empty">Choose a ${escapeHtml(role)} champion from the pool.</p>
          </article>
        `;
      }

      const roleFit = getRoleFit(champion, role);
      return `
        <article class="slot is-filled">
          <div class="slot__role">
            <span>${escapeHtml(role)}</span>
            <button class="slot__clear" type="button" aria-label="Clear ${escapeHtml(role)}" data-clear="${escapeHtml(role)}">&times;</button>
          </div>
          <div class="slot__pick">
            ${getChampionIconMarkup(champion, "small")}
            <div class="slot__pick-text">
              <h3 class="slot__champ">${escapeHtml(champion.name)}</h3>
              <p class="slot__empty">${escapeHtml(champion.style)}</p>
            </div>
          </div>
          <div class="tags">
            ${roleFit.offRole ? `<span class="off-role-note">${escapeHtml(roleFit.label)}</span>` : ""}
            ${champion.tags.slice(0, 5).map((tag) => `<span class="tag tag--${escapeHtml(tag)}">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function selectedChampions() {
  return roles.map((role) => roleState[role]).filter(Boolean).map(getChampion).filter(Boolean);
}

function selectChampion(name, role) {
  const champion = getChampion(name);
  if (!champion) return;
  const targetRole = roles.includes(role) ? role : champion.roles[0];
  const wasEmpty = !roleState[targetRole];
  if (favoriteState[targetRole] && favoriteState[targetRole] !== name) {
    favoriteState[targetRole] = null;
  }
  roleState[targetRole] = name;
  if (wasEmpty && recommendRole?.value === targetRole) {
    recommendRole.value = roles.find((candidateRole) => !roleState[candidateRole]) || targetRole;
  }
  renderAll();
}

function clearRole(role) {
  roleState[role] = null;
  favoriteState[role] = null;
  if (recommendRole) recommendRole.value = role;
  renderAll();
}

function resetDraft() {
  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = null;
  });
  if (recommendRole) recommendRole.value = "Top";
  renderAll();
}
