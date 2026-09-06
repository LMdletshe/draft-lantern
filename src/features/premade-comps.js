function getPremadeTeam(comp) {
  return roles.map((role) => getChampion(comp.picks[role])).filter(Boolean);
}

function populatePremadeFilter() {
  const current = premadeFilter.value || "All";
  const categories = ["All", ...uniqueList(premadeComps.map((comp) => comp.category)).sort()];
  premadeFilter.innerHTML = optionList(categories, categories.includes(current) ? current : "All");
}

function renderPremadeScoreSnapshot(team) {
  const scores = calculateScores(team);
  const featuredKeys = ["engage", "frontline", "damage", "peel", "scaling"];
  return featuredKeys.map((key) => {
    const label = scoreKeys.find(([scoreKey]) => scoreKey === key)?.[1] || key;
    return `
      <div class="premade-score">
        <div><span>${escapeHtml(label)}</span><strong>${scores[key]}%</strong></div>
        <div class="premade-score__track"><span style="width: ${scores[key]}%"></span></div>
      </div>
    `;
  }).join("");
}

function renderPremadeComps() {
  if (!premadeFilter || !premadeList || !premadeDetails) return;
  if (!premadeFilter.innerHTML) populatePremadeFilter();

  const category = premadeFilter.value || "All";
  const filtered = premadeComps.filter((comp) => category === "All" || comp.category === category);
  if (!filtered.some((comp) => comp.id === activePremadeId)) {
    activePremadeId = filtered[0]?.id || premadeComps[0].id;
  }

  premadeList.innerHTML = filtered.map((comp) => {
    const team = getPremadeTeam(comp);
    return `
      <button class="premade-list-item ${comp.id === activePremadeId ? "is-active" : ""}" type="button" data-premade="${escapeHtml(comp.id)}">
        <div class="premade-list-item__heading">
          <div>
            <span>${escapeHtml(comp.category)}</span>
            <h3>${escapeHtml(comp.name)}</h3>
          </div>
          <strong>${escapeHtml(comp.difficulty)}</strong>
        </div>
        <p>${escapeHtml(comp.summary)}</p>
        <div class="premade-mini-roster">
          ${team.map((champion) => getChampionIconMarkup(champion, "small")).join("")}
        </div>
      </button>
    `;
  }).join("");

  const comp = premadeComps.find((item) => item.id === activePremadeId);
  if (!comp) {
    premadeDetails.innerHTML = `<p class="empty-state">No premade compositions match this filter.</p>`;
    return;
  }

  const team = getPremadeTeam(comp);
  const scores = calculateScores(team);
  const archetypes = getCompArchetypes(scores);
  const warnings = getDraftWarnings(team).filter((warning) => warning.severity !== "info");

  premadeDetails.innerHTML = `
    <header class="premade-details__header">
      <div>
        <div class="archetype-row">
          <span class="archetype-chip">${escapeHtml(comp.category)}</span>
          <span class="archetype-chip">${escapeHtml(comp.difficulty)}</span>
          ${archetypes.slice(0, 2).map((item) => `<span class="archetype-chip">${escapeHtml(item)}</span>`).join("")}
        </div>
        <h2>${escapeHtml(comp.name)}</h2>
        <p>${escapeHtml(comp.summary)}</p>
      </div>
      <button class="text-button premade-load-button" type="button" data-load-premade="${escapeHtml(comp.id)}">Load into builder</button>
    </header>

    <div class="premade-roster">
      ${roles.map((role) => {
        const champion = getChampion(comp.picks[role]);
        return `
          <button class="premade-pick" type="button" data-details="${escapeHtml(champion.name)}" aria-label="View ${escapeHtml(champion.name)} details">
            <span>${escapeHtml(role)}</span>
            ${getChampionIconMarkup(champion)}
            <strong>${escapeHtml(champion.name)}</strong>
            <small>${escapeHtml(champion.style)}</small>
          </button>
        `;
      }).join("")}
    </div>

    <div class="premade-overview-grid">
      <section class="premade-strengths">
        <h3>Why it works</h3>
        <div class="premade-score-grid">${renderPremadeScoreSnapshot(team)}</div>
        <div class="premade-key-rule"><span>Golden rule</span><strong>${escapeHtml(comp.rule)}</strong></div>
      </section>

      <section class="premade-pros-cons">
        <div>
          <h3>Pros</h3>
          <ul>${comp.pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Cons</h3>
          <ul>${comp.cons.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
      </section>
    </div>

    <section class="phase-playbook">
      <div class="comparison-subheading"><span>Game plan</span><strong>Early to late</strong></div>
      <div class="phase-playbook__grid">
        <article>
          <span>1</span>
          <div><h3>Early game</h3><p>${escapeHtml(comp.phases.early)}</p></div>
        </article>
        <article>
          <span>2</span>
          <div><h3>Mid game</h3><p>${escapeHtml(comp.phases.mid)}</p></div>
        </article>
        <article>
          <span>3</span>
          <div><h3>Late game</h3><p>${escapeHtml(comp.phases.late)}</p></div>
        </article>
      </div>
    </section>

    <div class="premade-footer-grid">
      <section>
        <h3>Flexible swaps</h3>
        <div class="premade-swaps">
          ${comp.alternatives.map((swap) => `
            <div>
              <span>${escapeHtml(swap.role)}</span>
              <strong>${escapeHtml(swap.from)} to ${escapeHtml(swap.to)}</strong>
            </div>
          `).join("")}
        </div>
      </section>
      <section>
        <h3>Draft risks</h3>
        <p>${warnings.length ? escapeHtml(warnings.slice(0, 3).map((warning) => warning.title).join(", ")) : "No major structural warning. Execution and positioning remain the main challenges."}</p>
      </section>
    </div>
  `;
}

function loadPremadeComp(id) {
  const comp = premadeComps.find((item) => item.id === id);
  if (!comp) return;

  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = getChampion(comp.picks[role]) ? comp.picks[role] : null;
  });
  if (recommendRole) recommendRole.value = "Top";
  switchView("builderView");
  renderAll();
  setSaveStatus(`${comp.name} loaded.`);
}
