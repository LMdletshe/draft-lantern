function getPremadeTeam(comp) {
  return roles.map((role) => getChampion(comp.picks[role])).filter(Boolean);
}

function getPremadeVariants(comp) {
  return premadeCompVariants[comp.id] || [];
}

function getPremadeOfferItems(comp, team) {
  const scores = calculateScores(team);
  const strongestScores = scoreKeys
    .map(([key, label]) => ({ key, label, value: scores[key] || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => `${item.label}: ${item.value}%`);

  return uniqueList([
    ...(comp.pros || []),
    ...strongestScores
  ]).slice(0, 6);
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

function renderVariantRoster(picks) {
  return roles.map((role) => {
    const champion = getChampion(picks[role]);
    return `
      <div>
        ${champion ? getChampionIconMarkup(champion, "small") : `<span class="champion-icon champion-icon--small" aria-hidden="true">${escapeHtml(role.slice(0, 2).toUpperCase())}</span>`}
        <span>${escapeHtml(role)}</span>
        <strong>${escapeHtml(champion?.name || picks[role])}</strong>
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
          <strong>${escapeHtml(comp.tier || comp.difficulty)}</strong>
        </div>
        <p>${escapeHtml(comp.summary)}</p>
        <small>${escapeHtml(comp.bestWhen || "Best when the team can play around this comp's main identity.")}</small>
        <div class="premade-mini-roster">
          ${roles.map((role) => {
            const champion = getChampion(comp.picks[role]);
            return champion
              ? getChampionIconMarkup(champion, "small")
              : `<span class="champion-icon champion-icon--small" aria-hidden="true">${escapeHtml(role.slice(0, 2).toUpperCase())}</span>`;
          }).join("")}
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
  const offerItems = getPremadeOfferItems(comp, team);
  const variants = getPremadeVariants(comp);

  premadeDetails.innerHTML = `
    <header class="premade-details__header">
      <div>
        <div class="archetype-row">
          <span class="archetype-chip">${escapeHtml(comp.category)}</span>
          <span class="archetype-chip">${escapeHtml(comp.difficulty)}</span>
          ${comp.tier ? `<span class="archetype-chip">${escapeHtml(comp.tier)}</span>` : ""}
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
          <button class="premade-pick" type="button" ${champion ? `data-details="${escapeHtml(champion.name)}"` : ""} aria-label="${champion ? `View ${escapeHtml(champion.name)} details` : `${escapeHtml(role)} champion loading`}">
            <span>${escapeHtml(role)}</span>
            ${champion ? getChampionIconMarkup(champion) : `<span class="champion-icon" aria-hidden="true">${escapeHtml(role.slice(0, 2).toUpperCase())}</span>`}
            <strong>${escapeHtml(champion?.name || comp.picks[role])}</strong>
            <small>${escapeHtml(champion?.style || "Loads when Riot roster data is ready")}</small>
          </button>
        `;
      }).join("")}
    </div>

    <section class="premade-library-section">
      <div class="comparison-subheading"><span>Library read</span><strong>What this comp offers</strong></div>
      <div class="premade-offer-grid">
        ${offerItems.map((item) => `<div><span>Offer</span><strong>${escapeHtml(item)}</strong></div>`).join("")}
      </div>
    </section>

    <div class="premade-context-grid">
      <section>
        <h3>Pick this when</h3>
        <p>${escapeHtml(comp.bestWhen || "Your team can play around this comp's main identity and avoid fighting against its plan.")}</p>
      </section>
      <section>
        <h3>Needs to function</h3>
        <p>${escapeHtml(comp.needs || comp.rule)}</p>
      </section>
    </div>

    ${variants.length ? `
      <section class="premade-variations-section">
        <div class="comparison-subheading"><span>Template variations</span><strong>Same idea, different rosters</strong></div>
        <div class="premade-variation-grid">
          ${variants.map((variant) => `
            <article class="premade-variation-card">
              <header>
                <div>
                  <span>Variation</span>
                  <h3>${escapeHtml(variant.name)}</h3>
                </div>
                <button class="text-button" type="button" data-load-premade="${escapeHtml(comp.id)}" data-load-variant="${escapeHtml(variant.id)}">Load variation</button>
              </header>
              <p>${escapeHtml(variant.summary)}</p>
              <small>${escapeHtml(variant.bestWhen)}</small>
              <div class="premade-variation-roster">
                ${renderVariantRoster(variant.picks)}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}

    <div class="premade-overview-grid">
      <section class="premade-strengths">
        <h3>Power profile</h3>
        <div class="premade-score-grid">${renderPremadeScoreSnapshot(team)}</div>
        <div class="premade-key-rule"><span>Golden rule</span><strong>${escapeHtml(comp.rule)}</strong></div>
      </section>

      <section class="premade-pros-cons">
        <div>
          <h3>Best offers</h3>
          <ul>${comp.pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Watch-outs</h3>
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

function loadPremadeComp(id, variantId) {
  const comp = premadeComps.find((item) => item.id === id);
  if (!comp) return;

  const variant = getPremadeVariants(comp).find((item) => item.id === variantId);
  const picks = variant?.picks || comp.picks;

  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = getChampion(picks[role]) ? picks[role] : null;
  });
  if (recommendRole) recommendRole.value = "Top";
  switchView("builderView");
  renderAll();
  setSaveStatus(`${variant?.name || comp.name} loaded.`);
}
