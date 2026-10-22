// Advice is authored locally. Riot supplies rune identities, not recommended pages.
const runePresetGroups = {
  duelist: ["Aatrox", "Akali", "Ambessa", "Bel'Veth", "Camille", "Cassiopeia", "Darius", "Diana", "Fiora", "Garen", "Gwen", "Hecarim", "Illaoi", "Irelia", "Jarvan IV", "Jax", "Katarina", "Kayn", "Kled", "Lee Sin", "Lillia", "Mordekaiser", "Nilah", "Olaf", "Rek'Sai", "Riven", "Samira", "Sett", "Singed", "Sylas", "Udyr", "Urgot", "Vi", "Viego", "Volibear", "Wukong", "Xin Zhao"],
  tempo: ["Aphelios", "Ashe", "Jinx", "Kalista", "Kayle", "Kog'Maw", "Master Yi", "Nocturne", "Tristana", "Tryndamere", "Twitch", "Vayne", "Xayah", "Yasuo", "Yone", "Yunara", "Zeri"],
  precision: ["Akshan", "Briar", "Draven", "Ezreal", "Lucian", "Miss Fortune", "Pantheon", "Quinn", "Renekton", "Teemo", "Trundle", "Warwick"],
  fleet: ["Bard", "Caitlyn", "Graves", "Jhin", "Senna", "Smolder"],
  hail: ["Kai'Sa", "Pyke"],
  burst: ["Ahri", "Annie", "Aurora", "Ekko", "Elise", "Evelynn", "Fizz", "LeBlanc", "Lissandra", "Naafiri", "Neeko", "Qiyana", "Rengar", "Talon", "Vex", "Zed", "Zoe"],
  harvest: ["Brand", "Karthus", "Shaco"],
  tank: ["Cho'Gath", "Dr. Mundo", "K'Sante", "Malphite", "Nasus", "Ornn", "Poppy", "Shen", "Sion", "Skarner", "Tahm Kench", "Yorick"],
  engage: ["Alistar", "Amumu", "Galio", "Leona", "Maokai", "Nautilus", "Nunu & Willump", "Rakan", "Rammus", "Rell", "Sejuani", "Thresh", "Zac"],
  enchanter: ["Ivern", "Janna", "Karma", "Lulu", "Milio", "Nami", "Renata Glasc", "Seraphine", "Sona", "Soraka", "Yuumi"],
  aery: ["Kennen", "Vladimir"]
};
const runeManalessChampions = new Set([
  "Aatrox", "Akali", "Ambessa", "Bel'Veth", "Briar", "Dr. Mundo", "Garen", "Gnar", "Katarina", "Kennen", "Kled", "Lee Sin", "Mordekaiser", "Rek'Sai", "Renekton", "Rengar", "Riven", "Rumble", "Sett", "Shen", "Shyvana", "Tryndamere", "Viego", "Vladimir", "Yasuo", "Yone", "Zac", "Zed"
]);
const runeBurstChampions = new Set(["Annie", "Diana", "Fizz", "LeBlanc", "Lissandra", "Malphite", "Neeko", "Syndra", "Veigar", "Vex"]);
const runeGuardianChampions = new Set(["Janna", "Lulu", "Milio", "Renata Glasc", "Sona", "Soraka", "Yuumi"]);
const runeMeleeMages = new Set(["Akali", "Diana", "Ekko", "Fizz", "Galio", "Gragas", "Gwen", "Kassadin", "Katarina", "Lillia", "Mordekaiser", "Rumble", "Singed", "Sylas"]);
const runePresetByChampion = new Map(Object.entries(runePresetGroups)
  .flatMap(([preset, names]) => names.map((name) => [name, preset])));
let runeCatalogue = bundledRuneCatalogue;
let runeCatalogueIsLive = false;
let runeIndex = indexRuneCatalogue(runeCatalogue.trees);

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
            if (!Number.isInteger(rune.id) || typeof rune.name !== "string"
              || !/^perk-images\/[\w/.-]+\.png$/.test(rune.icon)) throw new Error("Invalid rune entry");
            return { id: rune.id, name: rune.name, key: rune.key, icon: rune.icon };
          });
        })
      };
    });
    if (new Set(trees.map((tree) => tree.id)).size !== knownTrees.length) throw new Error("Duplicate rune trees");
    runeCatalogue = { version, trees };
    runeIndex = indexRuneCatalogue(trees);
    runeCatalogueIsLive = true;
  } catch {
    // The bundled, dated snapshot keeps advice available without a network dependency.
    runeCatalogueIsLive = false;
  }
}

function getRuneMatchupRole(champion, enemy, requestedRole) {
  if (roles.includes(requestedRole)) return requestedRole;
  return champion.roles.find((role) => enemy.roles.includes(role)) || champion.roles[0];
}

function getRuneEnemyPattern(enemy) {
  const classes = enemy.official?.tags || [];
  const traits = getChampionProfileSignals(enemy);
  const burst = classes.includes("Assassin") || traits.has("assassin") || runeBurstChampions.has(enemy.name);
  const ranged = classes.includes("Marksman") || traits.has("marksman")
    || (classes.includes("Mage") && !runeMeleeMages.has(enemy.name));
  const poke = !burst && (ranged || (enemy.scores.poke || 0) >= 4);
  const durable = classes.includes("Tank") || (enemy.scores.frontline || 0) >= 4;
  return { burst, poke, durable };
}

function getRunePreset(champion, role) {
  const preset = runePresetByChampion.get(champion.name);
  const classes = champion.official?.tags || [];
  const hardControl = !["Dr. Mundo", "Nasus", "Yorick"].includes(champion.name)
    && (preset === "tank" || getChampionProfileSignals(champion).has("lockdown"));
  if (role === "Support" && preset === "tank") return hardControl ? "engage" : "duelist";
  if (role === "Support" && preset === "harvest") return "mage";
  if (role === "Jungle" && preset === "tank") return hardControl ? "engage" : "duelist";
  if (preset) return preset;
  if (classes.includes("Marksman") || champion.tags.includes("marksman")) return "precision";
  if (classes.includes("Assassin") || champion.tags.includes("assassin")) return "burst";
  if (classes.includes("Mage")) return "mage";
  if (classes.includes("Tank")) return role === "Top" ? "tank" : hardControl ? "engage" : "duelist";
  if (classes.includes("Support")) return "enchanter";
  if (classes.includes("Fighter") || champion.tags.includes("duel")) return "duelist";
  if (role === "Support") return (champion.scores.peel || 0) >= 4 ? "enchanter" : "engage";
  return (champion.scores.poke || 0) >= 3 ? "mage" : "duelist";
}

function getMatchupRunePage(champion, enemy, requestedRole) {
  if (!champion || !enemy) return null;
  const role = getRuneMatchupRole(champion, enemy, requestedRole);
  const preset = getRunePreset(champion, role);
  const pattern = getRuneEnemyPattern(enemy);
  const hasMana = !runeManalessChampions.has(champion.name)
    && !/energy|fury|rage|heat|health|none|flow|ferocity|blood well/i.test(champion.official?.partype || "");
  const marksman = role === "ADC" || champion.official?.tags?.includes("Marksman") || champion.tags.includes("marksman");
  const defensiveRune = pattern.poke ? 8444 : 8473;
  const resourceRune = hasMana && marksman ? 8009 : 9111;
  const manaRune = hasMana ? 8226 : 8275;
  const reasons = [];
  let primary;
  let secondary;
  let alternative = "";

  if (["duelist", "tempo", "precision", "fleet"].includes(preset)) {
    const keystone = { duelist: 8010, tempo: 8008, precision: 8005, fleet: 8021 }[preset];
    primary = [keystone, preset === "fleet" && role !== "Jungle" ? 9101 : resourceRune,
      marksman && !["precision", "tempo"].includes(preset) ? 9103 : 9104,
      marksman ? (pattern.durable ? 8017 : 8014) : 8299];
    if (role === "Support") secondary = [8345, 8347];
    else if (role === "Jungle") secondary = [8304, 8347];
    else if (!marksman || pattern.burst) secondary = [defensiveRune, 8451];
    else if (pattern.poke) secondary = [8304, 8345];
    else secondary = [8233, 8236];
    reasons.push({ duelist: "Conqueror supports repeated hits and longer fights.", tempo: "Lethal Tempo suits an attack-focused fight with time to keep hitting.", precision: "Press the Attack rewards committing several attacks to one target.", fleet: "Fleet Footwork offers recovery and movement for a steadier lane." }[preset]);
    if (marksman && pattern.durable) reasons.push(`Cut Down adds pressure against ${enemy.name}'s durable frontline profile.`);
    if (preset === "fleet") alternative = "Press the Attack is an aggressive alternative when you can safely stay in range for repeated attacks.";
  } else if (["burst", "hail", "harvest"].includes(preset)) {
    primary = [preset === "hail" ? 9923 : preset === "harvest" ? 8128 : 8112,
      getChampionProfileSignals(champion).has("mobility") ? 8143 : 8139, 8140, 8106];
    secondary = hasMana && role !== "Jungle" ? [8226, 8210] : [9111, 8014];
    if (role !== "Jungle" && pattern.burst) secondary = [8473, 8451];
    reasons.push(preset === "hail" ? "Hail of Blades favors a fast opening sequence of attacks."
      : preset === "harvest" ? "Dark Harvest fits repeated opportunities to finish weakened targets."
        : "Electrocute favors a short spell-and-attack burst before backing away.");
  } else if (["tank", "engage"].includes(preset)) {
    primary = [preset === "tank" ? 8437 : 8439,
      preset === "tank" ? (champion.name === "Shen" ? 8401 : 8446) : 8463,
      role === "Jungle" ? 8429 : defensiveRune, 8451];
    secondary = role === "Support" ? [8306, 8347]
      : preset === "tank" && hasMana ? [8226, 8210] : [9111, 9105];
    reasons.push(preset === "tank" ? "Grasp of the Undying favors controlled lane trades and durable side-lane play."
      : "Aftershock rewards landing hard crowd control before absorbing the return damage.");
  } else if (preset === "enchanter" && role === "Support" && pattern.burst && runeGuardianChampions.has(champion.name)) {
    primary = [8465, 8463, 8473, 8453];
    secondary = [manaRune, 8210];
    reasons.push(`Guardian and Bone Plating favor protecting your carry through ${enemy.name}'s first burst.`);
    alternative = "Summon Aery is a more proactive alternative when you can trade and shield repeatedly without risking an all-in.";
  } else {
    const enchanter = preset === "enchanter";
    primary = [enchanter || preset === "aery" ? 8214 : 8229, manaRune, 8210,
      role === "Jungle" ? 8232 : enchanter ? 8236 : 8237];
    secondary = enchanter ? [8463, 8453]
      : pattern.burst && role !== "Jungle" ? [8473, 8451] : [8345, 8347];
    reasons.push(enchanter ? "Summon Aery supports frequent poke, shielding, and supportive trades."
      : preset === "aery" ? "Summon Aery adds value to repeated lane trades."
        : "Arcane Comet rewards ranged spell pressure; land control or a slow to make the follow-up easier.");
  }

  const allIds = [...primary, ...secondary];
  const primaryTree = runeIndex.get(primary[0])?.tree;
  const secondaryTree = runeIndex.get(secondary[0])?.tree;
  const available = primary.every((id, row) => runeIndex.get(id)?.tree === primaryTree && runeIndex.get(id)?.row === row)
    && secondary.every((id) => runeIndex.get(id)?.tree === secondaryTree && runeIndex.get(id)?.row > 0)
    && primaryTree !== secondaryTree && runeIndex.get(secondary[0])?.row !== runeIndex.get(secondary[1])?.row
    && new Set(allIds).size === 6;

  if (allIds.includes(8444)) reasons.push(`Second Wind helps recover from ${enemy.name}'s repeated ranged harassment.`);
  else if (allIds.includes(8473)) reasons.push(`Bone Plating helps with a short sequence of hits; avoid letting ${enemy.name} remove it with free poke first.`);
  else if (role === "Jungle") reasons.push("The secondary choices support clear-to-reset tempo and repeated map plays, where lane-only sustain is less useful.");
  else if (allIds.includes(8345)) reasons.push(`Biscuit Delivery offers lane sustain while you manage ${enemy.name}'s pressure.`);
  else reasons.push(`Keep the ${role} plan in mind: trade around ${enemy.name}'s key cooldowns and preserve your own fight pattern.`);

  const defensiveLane = role !== "Jungle" && (pattern.poke || pattern.burst);
  const attackShard = ["duelist", "tempo", "precision", "fleet", "hail"].includes(preset) ? "Attack speed"
    : ["tank", "engage", "enchanter"].includes(preset) ? "Ability haste" : "Adaptive force";
  return {
    role, preset, primary, secondary, available, primaryTree, secondaryTree, reasons: uniqueList(reasons), alternative,
    shards: [attackShard, ["tank", "engage"].includes(preset) ? "Scaling health" : "Adaptive force", defensiveLane ? "Flat health" : "Scaling health"],
    shardReason: defensiveLane ? "Flat health gives a safer early lane into this opponent's pressure." : "Scaling health favors durability as levels increase.",
    source: runePresetByChampion.has(champion.name) ? "Champion preset + matchup rules" : "Archetype fallback + matchup rules"
  };
}

function renderRuneIcon(rune) {
  return `<img src="${DDRAGON_BASE_URL}/cdn/img/${escapeHtml(rune.icon)}" alt="" aria-hidden="true" loading="lazy" width="28" height="28" onerror="this.hidden=true">`;
}

function renderMatchupRunes(champion, enemy, requestedRole) {
  const page = getMatchupRunePage(champion, enemy, requestedRole);
  if (!page) return "";
  const keystone = runeIndex.get(page.primary[0]);
  const catalogueLabel = `${runeCatalogueIsLive ? "Riot rune catalogue" : "Bundled rune snapshot"} ${runeCatalogue.version}`;
  if (!page.available) return `<div class="matchup-runes matchup-runes--unavailable"><strong>Suggested runes need review</strong><p>The planned page is unavailable in ${escapeHtml(catalogueLabel)}. Check the current client before choosing runes.</p></div>`;
  const treeName = (id) => runeCatalogue.trees.find((tree) => tree.id === id)?.name || "Runes";
  const renderRunes = (ids) => ids.map((id) => {
    const rune = runeIndex.get(id);
    return `<li>${renderRuneIcon(rune)}<span>${escapeHtml(rune.name)}</span></li>`;
  }).join("");
  return `
    <details class="matchup-runes">
      <summary>
        ${renderRuneIcon(keystone)}
        <span><strong>Suggested runes</strong><span>${escapeHtml(keystone.name)} + ${escapeHtml(treeName(page.secondaryTree))}</span></span>
        <span class="matchup-runes__toggle" aria-hidden="true">+</span>
      </summary>
      <div class="matchup-runes__body">
        <p class="matchup-runes__context">${escapeHtml(champion.name)} as ${escapeHtml(page.role)} vs ${escapeHtml(enemy.name)}</p>
        <div class="matchup-runes__trees">
          <section><h4>Primary · ${escapeHtml(treeName(page.primaryTree))}</h4><ul>${renderRunes(page.primary)}</ul></section>
          <section><h4>Secondary · ${escapeHtml(treeName(page.secondaryTree))}</h4><ul>${renderRunes(page.secondary)}</ul></section>
        </div>
        <h4>Stat shards · offense / flex / defense</h4>
        <ol class="matchup-runes__shards">${page.shards.map((shard) => `<li>${escapeHtml(shard)}</li>`).join("")}</ol>
        <p class="matchup-runes__shard-note">${escapeHtml(page.shardReason)}</p>
        <h4>Why this setup</h4>
        <ul class="matchup-runes__reasons">${page.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>
        ${page.alternative ? `<p class="matchup-runes__alternative"><strong>Alternative:</strong> ${escapeHtml(page.alternative)}</p>` : ""}
        <p class="matchup-runes__source">${escapeHtml(page.source)}. ${escapeHtml(catalogueLabel)}. Suggested starting point; no rune win-rate data.</p>
      </div>
    </details>`;
}
