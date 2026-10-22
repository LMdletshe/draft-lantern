// Only researched, directed champion matchups can select a rune plan here.
let runeCatalogue = bundledRuneCatalogue;
let runeCatalogueIsLive = false;
let runeIndex = indexRuneCatalogue(runeCatalogue.trees);
const reviewedRuneIndex = indexRuneCatalogue(bundledRuneCatalogue.trees);

function indexRuneCatalogue(trees) {
  const index = new Map();
  trees.forEach((tree) => tree.slots.forEach((slot, row) => slot.forEach((rune) => {
    index.set(rune.id, { ...rune, tree: tree.id, row });
  })));
  return index;
}

async function loadRuneCatalogue(version) {
  try {
    const response = await fetch(`${DDRAGON_BASE_URL}/cdn/${encodeURIComponent(version)}/data/en_US/runesReforged.json`);
    if (!response.ok) throw new Error("Rune catalogue unavailable");
    const data = await response.json();
    const knownTrees = [8000, 8100, 8200, 8300, 8400];
    if (!Array.isArray(data) || data.length !== knownTrees.length) throw new Error("Invalid rune trees");
    const trees = data.map((tree) => {
      if (!knownTrees.includes(tree.id) || !Array.isArray(tree.slots) || tree.slots.length !== 4) throw new Error("Invalid rune slots");
      return {
        id: tree.id, name: String(tree.name), icon: tree.icon,
        slots: tree.slots.map((slot) => {
          if (!Array.isArray(slot.runes) || !slot.runes.length) throw new Error("Empty rune slot");
          return slot.runes.map((rune) => {
            if (!Number.isInteger(rune.id) || typeof rune.name !== "string" || typeof rune.longDesc !== "string"
              || !/^perk-images\/[\w/.-]+\.png$/.test(rune.icon)) throw new Error("Invalid rune entry");
            return { id: rune.id, name: rune.name, key: rune.key, icon: rune.icon, effect: stripRiotText(rune.longDesc) };
          });
        })
      };
    });
    if (new Set(trees.map((tree) => tree.id)).size !== knownTrees.length) throw new Error("Duplicate rune trees");
    runeCatalogue = { version, trees };
    runeIndex = indexRuneCatalogue(trees);
    runeCatalogueIsLive = true;
  } catch {
    runeCatalogue = bundledRuneCatalogue;
    runeIndex = indexRuneCatalogue(runeCatalogue.trees);
    runeCatalogueIsLive = false;
  }
}

function buildResearchedRunePage(planId, rule) {
  const plan = counterRunePlans[planId];
  if (!plan) return null;
  const [primary, secondary, shards] = plan;
  const ids = [...primary, ...secondary];
  const primaryTree = runeIndex.get(primary[0])?.tree;
  const secondaryTree = runeIndex.get(secondary[0])?.tree;
  const legal = primary.length === 4 && secondary.length === 2 && shards.length === 3
    && primary.every((id, row) => runeIndex.get(id)?.tree === primaryTree && runeIndex.get(id)?.row === row)
    && secondary.every((id) => runeIndex.get(id)?.tree === secondaryTree && runeIndex.get(id)?.row > 0)
    && primaryTree !== secondaryTree && runeIndex.get(secondary[0])?.row !== runeIndex.get(secondary[1])?.row
    && new Set(ids).size === 6;
  const effectsMatch = ids.every((id) => {
    const actual = runeIndex.get(id), reviewed = reviewedRuneIndex.get(id);
    return actual && reviewed && normalizeCounterEvidence(actual.effect) === normalizeCounterEvidence(reviewed.effect);
  });
  return {
    primary, secondary, shards, primaryTree, secondaryTree,
    available: legal && effectsMatch,
    reviewReason: !legal ? "A selected rune is unavailable or moved to an incompatible slot."
      : !effectsMatch ? "A selected rune's effect changed after this matchup plan was reviewed." : "",
    role: rule.role, rule, reasons: [rule.runeWhy], source: "Researched champion matchup"
  };
}

function getMatchupRunePage(champion, enemy, requestedRole, suppliedRule = null) {
  if (!champion || !enemy) return null;
  const rule = suppliedRule || getResearchedCounterRule(champion, enemy, requestedRole);
  if (!rule || rule.candidate !== champion.name || rule.enemy !== enemy.name
    || (requestedRole && rule.role !== requestedRole) || !inspectCounterRule(rule).usable) return null;
  const page = buildResearchedRunePage(rule.runePlan, rule);
  if (page && rule.alternative) page.alternative = { ...rule.alternative, page: buildResearchedRunePage(rule.alternative.plan, rule) };
  return page;
}

function renderRuneIcon(rune) {
  return `<img src="${DDRAGON_BASE_URL}/cdn/img/${escapeHtml(rune.icon)}" alt="" aria-hidden="true" loading="lazy" width="28" height="28" onerror="this.hidden=true">`;
}

function renderRunePageChoices(page) {
  const treeName = (id) => runeCatalogue.trees.find((tree) => tree.id === id)?.name || "Runes";
  const renderRunes = (ids) => ids.map((id) => {
    const rune = runeIndex.get(id);
    return `<li>${renderRuneIcon(rune)}<span>${escapeHtml(rune.name)}</span></li>`;
  }).join("");
  return `<div class="matchup-runes__trees">
    <section><h4>Primary · ${escapeHtml(treeName(page.primaryTree))}</h4><ul>${renderRunes(page.primary)}</ul></section>
    <section><h4>Secondary · ${escapeHtml(treeName(page.secondaryTree))}</h4><ul>${renderRunes(page.secondary)}</ul></section>
    </div><h4>Stat shards · offense / flex / defense</h4>
    <ol class="matchup-runes__shards">${page.shards.map((shard) => `<li>${escapeHtml(shard)}</li>`).join("")}</ol>`;
}

function renderMatchupRunes(champion, enemy, requestedRole, rule = null) {
  if (!champion || !enemy) return "";
  const page = getMatchupRunePage(champion, enemy, requestedRole, rule);
  if (!page) return `<p class="empty-state">No researched rune plan for this exact champion pairing and role yet.</p>`;
  const catalogueLabel = `${runeCatalogueIsLive ? "Riot rune catalogue" : "Bundled rune snapshot"} ${runeCatalogue.version}`;
  if (!page.available) return `<div class="matchup-runes matchup-runes--unavailable"><strong>Matchup rune plan needs review</strong><p>${escapeHtml(page.reviewReason)} ${escapeHtml(catalogueLabel)}.</p></div>`;
  const keystone = runeIndex.get(page.primary[0]);
  const secondaryName = runeCatalogue.trees.find((tree) => tree.id === page.secondaryTree)?.name;
  return `<details class="matchup-runes">
    <summary>${renderRuneIcon(keystone)}<span><strong>Matchup rune plan</strong><span>${escapeHtml(keystone.name)} + ${escapeHtml(secondaryName)}</span></span><span class="matchup-runes__toggle" aria-hidden="true">+</span></summary>
    <div class="matchup-runes__body">
      <p class="matchup-runes__context">${escapeHtml(champion.name)} as ${escapeHtml(page.role)} vs ${escapeHtml(enemy.name)}</p>
      <h4>Why this page for this opponent</h4>
      <p class="matchup-runes__reason">${escapeHtml(page.rule.runeWhy)}</p>
      ${renderRunePageChoices(page)}
      ${page.alternative?.page?.available ? `<details class="counter-sources matchup-runes__alternative-page"><summary>Alternative · ${escapeHtml(runeIndex.get(page.alternative.page.primary[0]).name)}</summary><p>${escapeHtml(page.alternative.why)}</p>${renderRunePageChoices(page.alternative.page)}</details>` : ""}
      <details class="counter-sources"><summary>Current rune effects</summary><ul>${[...page.primary, ...page.secondary].map((id) => `<li><strong>${escapeHtml(runeIndex.get(id).name)}</strong><span>${escapeHtml(runeIndex.get(id).effect)}</span></li>`).join("")}</ul></details>
      <p class="matchup-runes__source">${escapeHtml(page.source)} reviewed on ${escapeHtml(counterMatchupReview.patch)}. ${escapeHtml(catalogueLabel)}. Chosen to execute the specific counter interaction; no measured matchup rune win rate.</p>
    </div></details>`;
}
