function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeChampionName(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getChampionIconMarkup(champion, size = "default") {
  const sizeClass = size === "small" ? " champion-icon--small" : "";
  const label = `${champion.name} icon`;

  if (champion.official?.iconUrl) {
    return `<img class="champion-icon${sizeClass}" src="${escapeHtml(champion.official.iconUrl)}" alt="${escapeHtml(label)}" loading="lazy" />`;
  }

  return `<span class="champion-icon${sizeClass}" aria-hidden="true">${escapeHtml(getInitials(champion.name))}</span>`;
}

function setDataStatus(status, detail = "") {
  if (!dataStatus) return;

  dataStatus.classList.remove("is-loading", "is-ready", "is-offline");
  dataStatus.classList.add(`is-${status}`);

  if (status === "loading") {
    dataStatus.textContent = "Loading Riot data";
    dataStatus.title = "Trying to load official champion icons from Riot Data Dragon.";
    return;
  }

  if (status === "ready") {
    dataStatus.textContent = `Riot roster ${detail}`;
    dataStatus.title = `Official champion roster, icons, and combat attributes loaded from Riot Data Dragon ${riotData.version}. Every champion receives a complete modeled profile; curated entries keep additional hand-tuned advice.`;
    return;
  }

  dataStatus.textContent = "Curated offline data";
  dataStatus.title = detail || "Using the built-in champion pool and fallback initials.";
}

function getChampion(name) {
  return champions.find((champion) => champion.name === name);
}

function getDamageType(champion) {
  if (hybridDamageChampions.has(champion.name)) return "Mixed";
  if (magicDamageChampions.has(champion.name)) return "Magic";
  if (champion.tags.includes("utility") || champion.tags.includes("peel")) return "Utility";
  return "Physical";
}

function getChampionInfo(champion) {
  return champion.profile?.info || champion.official?.info || {
    attack: champion.scores.damage * 2,
    defense: champion.scores.frontline * 2,
    magic: getDamageType(champion) === "Magic" ? champion.scores.damage * 2 : 2,
    difficulty: beginnerFriendlyChampions.has(champion.name) ? 3 : 6
  };
}

function getDifficulty(champion) {
  if (beginnerFriendlyChampions.has(champion.name) || champion.tags.includes("beginner")) {
    return "Beginner";
  }

  const officialDifficulty = getChampionInfo(champion).difficulty || 0;
  if (officialDifficulty >= 8) return "Advanced";
  if (officialDifficulty <= 4) return "Beginner";

  const demandingTraits = ["mobility", "assassin", "pick", "duel"];
  const demandingCount = demandingTraits.filter((trait) => champion.tags.includes(trait)).length;
  return demandingCount >= 2 ? "Advanced" : "Intermediate";
}

function getChampionStrengths(champion) {
  if (champion.profile?.strengths?.length) {
    return champion.profile.strengths;
  }

  const sortedScores = scoreKeys
    .map(([key, label]) => ({ key, label, value: champion.scores[key] || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => item.label);
  return uniqueList([...sortedScores, ...champion.goodInto.slice(0, 2).map((item) => `Strong into ${item.replaceAll("-", " ")}`)]);
}

function getChampionWeaknesses(champion) {
  if (champion.profile?.weaknesses?.length) {
    return champion.profile.weaknesses;
  }

  return champion.weakInto.length
    ? champion.weakInto.slice(0, 4).map((item) => item.replaceAll("-", " "))
    : ["coordinated pressure", "poor positioning"];
}

function getLanePlan(champion) {
  if (champion.profile?.lanePlan) return champion.profile.lanePlan;

  if (champion.tags.includes("early") || champion.tags.includes("snowball")) {
    return "Use your early pressure to gain lane control, then move first to nearby fights.";
  }
  if (champion.tags.includes("scaling")) {
    return "Prioritize safe farm and avoid trading health for low-value fights before your items arrive.";
  }
  if (champion.tags.includes("poke") || champion.tags.includes("range")) {
    return "Keep the wave between you and the enemy, then chip them down before committing.";
  }
  if (champion.tags.includes("engage")) {
    return "Preserve your main engage cooldown until an ally can follow or the enemy mispositions.";
  }
  return "Trade around your strongest cooldown and keep enough health to contest the next objective.";
}

function getTeamfightPlan(champion) {
  if (champion.profile?.teamfightPlan) return champion.profile.teamfightPlan;

  if (champion.tags.includes("peel") || champion.tags.includes("anti-assassin")) {
    return "Stay close to the main carry and spend crowd control on enemies who dive them.";
  }
  if (champion.tags.includes("engage") || champion.tags.includes("wombo")) {
    return "Look for a grouped target, signal the engage, and make sure your damage is in range.";
  }
  if (champion.tags.includes("pick") || champion.tags.includes("assassin")) {
    return "Approach from fog of war and threaten isolated targets before the full fight starts.";
  }
  if (champion.tags.includes("marksman") || champion.tags.includes("scaling")) {
    return "Hit the safest target from behind your frontline and save movement tools for danger.";
  }
  return "Play around the strongest teammate and use your highest-impact spell before chasing.";
}

const championSearchAliases = {
  cc: ["crowd control", "lockdown", "engage", "pick"],
  hook: ["hook", "engage", "pick"],
  tank: ["tank", "frontline", "durable"],
  carry: ["marksman", "damage", "scaling"],
  assassin: ["assassin", "burst", "pick", "mobility"],
  enchanter: ["support", "utility", "peel", "shield"],
  disengage: ["disengage", "peel", "anti-dive", "anti-engage"],
  engage: ["engage", "hard-engage", "lockdown", "wombo"],
  early: ["early", "snowball", "duel"],
  late: ["late", "scaling"],
  ranged: ["range", "poke", "marksman"],
  aoe: ["aoe", "wombo", "teamfight"]
};

function getChampionSearchHaystack(champion) {
  return [
    champion.name,
    champion.style,
    champion.beginner,
    champion.official?.title || "",
    champion.official?.blurb || "",
    champion.profile?.powerCurve || "",
    champion.profile?.fightPattern || "",
    ...champion.roles,
    ...champion.tags,
    ...(champion.profile?.strengths || []),
    ...(champion.profile?.weaknesses || []),
    ...(champion.official?.tags || []),
    ...champion.goodInto,
    ...champion.weakInto
  ]
    .join(" ")
    .toLowerCase()
    .replaceAll("-", " ");
}

function getSearchTokens(query) {
  return query
    .toLowerCase()
    .replaceAll("-", " ")
    .match(/[a-z0-9']+/g) || [];
}

function championMatchesQuery(champion, query) {
  if (!query) return true;
  const haystack = getChampionSearchHaystack(champion);
  return getSearchTokens(query).every((token) => {
    const aliases = championSearchAliases[token] || [token];
    return aliases.some((term) => haystack.includes(term.replaceAll("-", " ")));
  });
}

function getChampionSearchRank(champion, query) {
  if (!query) return 0;
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = getSearchTokens(query);
  let rank = 0;
  if (champion.name.toLowerCase() === normalizedQuery) rank += 100;
  else if (champion.name.toLowerCase().startsWith(normalizedQuery)) rank += 70;
  tokens.forEach((token) => {
    if (champion.tags.some((tag) => tag.replaceAll("-", " ").includes(token))) rank += 18;
    if (champion.roles.some((role) => role.toLowerCase() === token)) rank += 8;
  });
  return rank;
}

function getChampionCombatTraits(champion) {
  const traits = new Set([
    ...champion.tags,
    ...champion.goodInto,
    ...(champion.official?.tags || []).map((tag) => tag.toLowerCase())
  ]);
  const scores = champion.scores || {};

  if ((scores.engage || 0) >= 4 || traits.has("engage")) {
    traits.add("engage");
    traits.add("hard-engage");
    traits.add("lockdown");
  }
  if ((scores.frontline || 0) >= 4 || traits.has("frontline")) {
    traits.add("frontline");
    traits.add("tank");
  }
  if ((scores.peel || 0) >= 4 || traits.has("peel") || traits.has("anti-dive")) {
    traits.add("peel");
    traits.add("disengage");
  }
  if ((scores.poke || 0) >= 4 || traits.has("poke") || traits.has("marksman")) {
    traits.add("range");
    traits.add("poke");
  }
  if ((scores.pick || 0) >= 4) {
    traits.add("pick");
    traits.add("lockdown");
  }
  if (traits.has("assassin")) {
    traits.add("burst");
    traits.add("dive");
    traits.add("squishy");
  }
  if (traits.has("fighter") && traits.has("mobility")) traits.add("dive");
  if (!traits.has("range") && !traits.has("poke") && (traits.has("fighter") || traits.has("tank") || traits.has("duel"))) {
    traits.add("low-range");
  }
  if (!traits.has("mobility") && (traits.has("marksman") || traits.has("mage"))) traits.add("immobile");
  if ((getChampionInfo(champion).defense || 0) <= 4 && !traits.has("tank")) traits.add("squishy");

  return traits;
}

function getRoleFit(champion, role) {
  if (champion.roles.includes(role)) {
    return { score: champion.roles[0] === role ? 1 : 0.94, label: "Natural role", offRole: false };
  }

  const traits = getChampionCombatTraits(champion);
  const roleTraits = {
    Top: ["fighter", "tank", "duel", "frontline", "sustain", "split-push"],
    Jungle: ["fighter", "tank", "assassin", "skirmish", "early", "engage", "mobility"],
    Mid: ["mage", "assassin", "burst", "poke", "pick", "scaling"],
    ADC: ["marksman", "range", "damage", "scaling", "safe"],
    Support: ["support", "utility", "peel", "engage", "pick", "shield", "disengage"]
  };
  const matches = roleTraits[role].filter((trait) => traits.has(trait)).length;
  let score = 0.3 + Math.min(0.42, matches * 0.09);

  if (role === "Jungle" && !traits.has("skirmish") && !traits.has("early") && !traits.has("mobility")) score -= 0.12;
  if (role === "ADC" && !traits.has("marksman") && !traits.has("range")) score -= 0.16;
  if (role === "Support" && !traits.has("utility") && !traits.has("peel") && !traits.has("engage") && !traits.has("pick")) score -= 0.12;

  score = Math.max(0.2, Math.min(0.78, score));
  return {
    score,
    label: score >= 0.58 ? "Plausible off-role" : "Experimental off-role",
    offRole: true
  };
}

function uniqueList(values) {
  return [...new Set(values.filter(Boolean))];
}

function clampScore(value) {
  return Math.max(1, Math.min(5, value));
}

function getSpecificChampionTraits(name) {
  const labels = {
    engage: "engage",
    poke: "poke",
    scaling: "scaling",
    early: "early",
    sustain: "sustain",
    mobility: "mobility",
    peel: "peel",
    splitPush: "split-push",
    reset: "reset",
    global: "global",
    safe: "safe",
    antiDive: "anti-dive",
    siege: "siege",
    wombo: "wombo"
  };

  return Object.entries(championTraitGroups)
    .filter(([, names]) => names.has(name))
    .map(([key]) => labels[key]);
}

function getDefaultOfficialInfo(official) {
  const tags = official.tags || [];
  return {
    attack: tags.includes("Marksman") ? 8 : tags.includes("Fighter") || tags.includes("Assassin") ? 7 : 4,
    defense: tags.includes("Tank") ? 8 : tags.includes("Fighter") ? 6 : 3,
    magic: tags.includes("Mage") ? 8 : tags.includes("Support") ? 6 : 3,
    difficulty: tags.includes("Assassin") ? 7 : tags.includes("Marksman") ? 6 : 5
  };
}

function getOfficialRecord(official, version) {
  return {
    id: official.id,
    key: official.key,
    title: official.title,
    tags: official.tags || [],
    blurb: official.blurb || "",
    info: { ...getDefaultOfficialInfo(official), ...(official.info || {}) },
    partype: official.partype || "",
    iconUrl: `${DDRAGON_BASE_URL}/cdn/${version}/img/champion/${official.image.full}`
  };
}

function getRolesForOfficialChampion(official) {
  if (roleOverrides[official.name]) {
    return roleOverrides[official.name];
  }

  const officialTags = official.tags || [];
  if (officialTags.includes("Marksman")) return ["ADC"];
  if (officialTags.includes("Support")) return ["Support"];
  if (officialTags.includes("Assassin")) return ["Mid", "Jungle"];
  if (officialTags.includes("Mage")) return ["Mid", "Support"];
  if (officialTags.includes("Tank")) return ["Top", "Support", "Jungle"];
  if (officialTags.includes("Fighter")) return ["Top", "Jungle"];
  return ["Mid"];
}

function getGeneratedTags(official, rolesForChampion) {
  const officialTags = official.tags || [];
  const info = { ...getDefaultOfficialInfo(official), ...(official.info || {}) };
  const tags = [];

  if (officialTags.includes("Tank")) tags.push("frontline", "engage", "peel");
  if (officialTags.includes("Fighter")) tags.push("duel", "frontline", "damage");
  if (officialTags.includes("Mage")) tags.push("poke", "burst", "scaling");
  if (officialTags.includes("Assassin")) tags.push("pick", "burst", "mobility");
  if (officialTags.includes("Marksman")) tags.push("marksman", "range", "scaling", "damage");
  if (officialTags.includes("Support")) tags.push("utility", "peel", "vision");

  if (rolesForChampion.includes("Jungle")) tags.push("skirmish");
  if (rolesForChampion.includes("Support")) tags.push("utility");
  if (rolesForChampion.includes("ADC")) tags.push("marksman");
  if (rolesForChampion.includes("Top")) tags.push("duel");

  if (info.attack >= 8) tags.push("damage");
  if (info.defense >= 8) tags.push("frontline");
  if (info.magic >= 8 && !officialTags.includes("Tank")) tags.push("burst");
  tags.push(...getSpecificChampionTraits(official.name));

  return uniqueList(tags).slice(0, 9);
}

function getGeneratedScores(official, tags) {
  const scores = { engage: 1, frontline: 1, damage: 2, pick: 1, poke: 1, peel: 1, scaling: 2 };
  const officialTags = official.tags || [];
  const info = { ...getDefaultOfficialInfo(official), ...(official.info || {}) };

  if (officialTags.includes("Tank")) {
    scores.engage += 2;
    scores.frontline += 4;
    scores.peel += 2;
  }

  if (officialTags.includes("Fighter")) {
    scores.engage += 1;
    scores.frontline += 2;
    scores.damage += 2;
  }

  if (officialTags.includes("Mage")) {
    scores.damage += 2;
    scores.poke += 3;
    scores.pick += 1;
    scores.scaling += 1;
  }

  if (officialTags.includes("Assassin")) {
    scores.damage += 2;
    scores.pick += 4;
    scores.engage += 1;
  }

  if (officialTags.includes("Marksman")) {
    scores.damage += 3;
    scores.poke += 1;
    scores.scaling += 2;
  }

  if (officialTags.includes("Support")) {
    scores.peel += 3;
    scores.pick += 1;
  }

  if (tags.includes("engage")) scores.engage += 1;
  if (tags.includes("range")) scores.poke += 1;
  if (tags.includes("mobility")) scores.pick += 1;
  if (tags.includes("vision")) scores.peel += 1;
  if (tags.includes("wombo")) scores.engage += 1;
  if (tags.includes("anti-dive")) scores.peel += 2;
  if (tags.includes("siege")) scores.poke += 1;
  if (tags.includes("early")) scores.pick += 1;
  if (tags.includes("scaling")) scores.scaling += 1;
  if (tags.includes("split-push")) scores.damage += 1;

  scores.damage += info.attack >= 8 || info.magic >= 8 ? 1 : 0;
  scores.frontline += info.defense >= 8 ? 1 : 0;

  return Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, clampScore(value)]));
}

function getGeneratedMatchups(tags, rolesForChampion = []) {
  const goodInto = [];
  const weakInto = [];

  if (tags.includes("frontline") || tags.includes("engage")) {
    goodInto.push("immobile", "low-range", "dive");
    weakInto.push("poke", "kite", "disengage");
  }

  if (tags.includes("marksman") || tags.includes("scaling")) {
    goodInto.push("frontline", "low-threat", "group");
    weakInto.push("dive", "assassin", "pick");
  }

  if (tags.includes("poke") || tags.includes("range")) {
    goodInto.push("low-range", "immobile", "siege");
    weakInto.push("dive", "hard-engage", "assassin");
  }

  if (tags.includes("pick") || tags.includes("burst") || tags.includes("mobility")) {
    goodInto.push("immobile", "squishy", "low-peel");
    weakInto.push("frontline", "peel", "tank");
  }

  if (tags.includes("peel") || tags.includes("utility")) {
    goodInto.push("dive", "assassin", "burst");
    weakInto.push("poke", "range", "hard-engage");
  }

  if (tags.includes("early")) {
    goodInto.push("scaling", "low-pressure");
    weakInto.push("disengage");
  }

  if (tags.includes("sustain")) {
    goodInto.push("poke", "short-trade");
    weakInto.push("burst", "anti-heal");
  }

  if (tags.includes("mobility")) {
    goodInto.push("skillshot", "immobile");
    weakInto.push("point-click", "lockdown");
  }

  if (tags.includes("split-push")) {
    goodInto.push("scaling", "low-mobility");
    weakInto.push("wave-clear", "global");
  }

  if (tags.includes("anti-dive")) {
    goodInto.push("dive", "assassin", "engage");
    weakInto.push("poke", "siege");
  }

  if (rolesForChampion.includes("Jungle") && tags.includes("early")) {
    goodInto.push("farming-jungle");
    weakInto.push("counter-gank");
  }

  return {
    goodInto: uniqueList(goodInto).slice(0, 6),
    weakInto: uniqueList(weakInto).slice(0, 6)
  };
}

function getGeneratedStyle(official, rolesForChampion, tags) {
  const patterns = [
    ["engage", "Engage"],
    ["poke", "Poke"],
    ["scaling", "Scaling"],
    ["early", "Early-pressure"],
    ["split-push", "Split-push"],
    ["peel", "Protective"],
    ["pick", "Pick"],
    ["duel", "Dueling"]
  ];
  const identity = patterns.find(([tag]) => tags.includes(tag))?.[1] || "Flexible";
  const classText = (official.tags || []).join(" / ") || "champion";
  return `${identity} ${classText.toLowerCase()} for ${rolesForChampion[0]}`;
}

function getGeneratedBeginnerTip(official, rolesForChampion, tags) {
  if (tags.includes("engage")) {
    return "Start only when nearby teammates can immediately follow your main crowd-control or gap-closing spell.";
  }

  if (tags.includes("split-push")) {
    return "Pressure a side lane when your team is safe, then watch the map before committing to the next wave.";
  }

  if (tags.includes("poke")) {
    return "Use range before the fight starts and preserve a safe path backward when enemies engage.";
  }

  if (tags.includes("early") && rolesForChampion.includes("Jungle")) {
    return "Use early strength to contest river and help lanes, but avoid forcing fights without lane support.";
  }

  if (rolesForChampion.includes("ADC")) {
    return "Stay behind your team and hit the safest target you can reach.";
  }

  if (rolesForChampion.includes("Support") && (tags.includes("peel") || tags.includes("utility"))) {
    return "Use vision and cooldowns to protect carries or set up one clear target.";
  }

  if (rolesForChampion.includes("Jungle")) {
    return "Path toward lanes with crowd control and fight around objectives with your team nearby.";
  }

  if (rolesForChampion.includes("Top")) {
    return "Manage side-lane pressure, then join fights when your strongest spell can matter.";
  }

  if ((official.tags || []).includes("Assassin")) {
    return "Look for isolated carries after key defensive spells are down.";
  }

  return "Clear waves safely, move with your team, and use your strongest spell before objectives.";
}

function getGeneratedPowerCurve(tags) {
  if (tags.includes("early") && tags.includes("scaling")) return "Strong early tools with useful late-game value";
  if (tags.includes("early")) return "Early and mid-game focused";
  if (tags.includes("scaling")) return "Improves strongly with levels and items";
  return "Most reliable in the mid game";
}

function getGeneratedFightPattern(tags) {
  if (tags.includes("poke") || tags.includes("siege")) return "Damage enemies from range before committing to a full fight.";
  if (tags.includes("engage") || tags.includes("wombo")) return "Create the opening, then layer allied damage and crowd control.";
  if (tags.includes("peel") || tags.includes("anti-dive")) return "Protect the backline and punish enemies after they commit forward.";
  if (tags.includes("split-push")) return "Create side-lane pressure and join only when the map state favors it.";
  if (tags.includes("pick") || tags.includes("mobility")) return "Threaten isolated targets from fog of war or a flank.";
  return "Fight around the closest safe target and your strongest cooldowns.";
}

function createGeneratedProfile(official, rolesForChampion, tags, scores, matchups) {
  const info = { ...getDefaultOfficialInfo(official), ...(official.info || {}) };
  const strengths = scoreKeys
    .map(([key, label]) => ({ label, value: scores[key] || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => item.label);

  if (tags.includes("early")) strengths.push("Early pressure");
  if (tags.includes("mobility")) strengths.push("Target access and repositioning");
  if (tags.includes("sustain")) strengths.push("Sustain in extended trades");
  if (tags.includes("global")) strengths.push("Cross-map influence");
  if (tags.includes("split-push")) strengths.push("Side-lane pressure");
  matchups.goodInto.slice(0, 2).forEach((item) => {
    strengths.push(`Strong into ${item.replaceAll("-", " ")}`);
  });

  const weaknesses = matchups.weakInto
    .slice(0, 4)
    .map((item) => item.replaceAll("-", " "));

  return {
    info,
    powerCurve: getGeneratedPowerCurve(tags),
    fightPattern: getGeneratedFightPattern(tags),
    strengths: uniqueList(strengths).slice(0, 5),
    weaknesses: uniqueList(weaknesses),
    lanePlan: getGeneratedBeginnerTip(official, rolesForChampion, tags),
    teamfightPlan: getGeneratedFightPattern(tags)
  };
}

function getPseudoOfficialChampion(champion) {
  const officialTags = [];
  if (champion.tags.includes("marksman")) officialTags.push("Marksman");
  if (champion.tags.includes("frontline") || champion.tags.includes("engage")) officialTags.push("Tank");
  if (champion.tags.includes("utility") || champion.tags.includes("peel")) officialTags.push("Support");
  if (champion.tags.includes("poke") || champion.tags.includes("burst")) officialTags.push("Mage");
  if (champion.tags.includes("duel") || champion.tags.includes("sustain")) officialTags.push("Fighter");
  if (champion.tags.includes("mobility") || champion.tags.includes("pick")) officialTags.push("Assassin");

  return {
    name: champion.name,
    tags: uniqueList(officialTags).slice(0, 2),
    info: {
      attack: clampScore(champion.scores.damage || 2) * 2,
      defense: clampScore(champion.scores.frontline || 2) * 2,
      magic: getDamageType(champion) === "Magic" ? clampScore(champion.scores.damage || 2) * 2 : 3,
      difficulty: beginnerFriendlyChampions.has(champion.name) ? 3 : champion.tags.includes("mobility") ? 8 : 6
    }
  };
}

function hydrateChampionProfile(champion, official = null) {
  const source = official || getPseudoOfficialChampion(champion);
  champion.tags = uniqueList([...champion.tags, ...getSpecificChampionTraits(champion.name)]);
  champion.profile = createGeneratedProfile(
    source,
    champion.roles,
    champion.tags,
    champion.scores,
    { goodInto: champion.goodInto, weakInto: champion.weakInto }
  );
  champion.dataLevel = champion.generated ? "modeled" : "curated";
  return champion;
}

function hydrateBuiltInChampionProfiles() {
  champions.forEach((champion) => hydrateChampionProfile(champion));
}

function createGeneratedChampion(official, version) {
  const rolesForChampion = getRolesForOfficialChampion(official);
  const tags = getGeneratedTags(official, rolesForChampion);
  const scores = getGeneratedScores(official, tags);
  const matchups = getGeneratedMatchups(tags, rolesForChampion);

  return {
    name: official.name,
    roles: rolesForChampion,
    style: getGeneratedStyle(official, rolesForChampion, tags),
    tags,
    scores,
    goodInto: matchups.goodInto,
    weakInto: matchups.weakInto,
    beginner: getGeneratedBeginnerTip(official, rolesForChampion, tags),
    profile: createGeneratedProfile(official, rolesForChampion, tags, scores, matchups),
    generated: true,
    dataLevel: "modeled",
    official: getOfficialRecord(official, version)
  };
}

async function loadRiotDataDragon() {
  setDataStatus("loading");

  try {
    const versionsResponse = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
    if (!versionsResponse.ok) {
      throw new Error(`Version request failed: ${versionsResponse.status}`);
    }

    const versions = await versionsResponse.json();
    const version = versions[0];
    if (!version) {
      throw new Error("No Riot Data Dragon versions returned.");
    }

    const championsResponse = await fetch(`${DDRAGON_BASE_URL}/cdn/${version}/data/en_US/champion.json`);
    if (!championsResponse.ok) {
      throw new Error(`Champion request failed: ${championsResponse.status}`);
    }

    const payload = await championsResponse.json();
    const officialChampions = Object.values(payload.data || {});
    const curatedByName = new Map(champions.map((champion) => [normalizeChampionName(champion.name), champion]));

    const expandedChampions = officialChampions
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((official) => {
        const curatedChampion = curatedByName.get(normalizeChampionName(official.name));
        if (!curatedChampion) {
          return createGeneratedChampion(official, version);
        }

        curatedChampion.official = getOfficialRecord(official, version);
        curatedChampion.tags = uniqueList([
          ...curatedChampion.tags,
          ...getSpecificChampionTraits(official.name)
        ]);
        hydrateChampionProfile(curatedChampion, official);
        return curatedChampion;
      });

    champions.length = 0;
    champions.push(...expandedChampions);

    riotData.status = "ready";
    riotData.version = version;
    riotData.matchedChampions = champions.filter((champion) => champion.official).length;
    setDataStatus("ready", `${champions.length} champs`);
    populateMatchupControls();
    renderAll();
  } catch (error) {
    riotData.status = "offline";
    riotData.version = null;
    riotData.matchedChampions = 0;
    setDataStatus("offline", "Riot Data Dragon could not be reached, so the app is using built-in data.");
  }
}
