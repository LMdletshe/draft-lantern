const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
function setup() {
  const context = vm.createContext({ console });
  ["src/data/app-config.js", "src/data/champions.js", "src/core/utils.js", "src/data/runes.js", "src/features/runes.js"]
    .forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file }));
  vm.runInContext("hydrateBuiltInChampionProfiles()", context);
  const api = vm.runInContext("({ champions, roles, runeIndex, bundledRuneCatalogue, getChampion, getMatchupRunePage, renderMatchupRunes, loadRuneCatalogue })", context);
  return { context, ...api };
}

function validatePage(page, index) {
  assert.equal(page.available, true);
  assert.equal(page.primary.length, 4);
  assert.equal(page.secondary.length, 2);
  assert.equal(page.shards.length, 3);
  assert.notEqual(page.primaryTree, page.secondaryTree);
  assert.equal(new Set([...page.primary, ...page.secondary]).size, 6);
  page.primary.forEach((id, row) => {
    assert.equal(index.get(id).tree, page.primaryTree);
    assert.equal(index.get(id).row, row);
  });
  page.secondary.forEach((id) => {
    assert.equal(index.get(id).tree, page.secondaryTree);
    assert.ok(index.get(id).row > 0);
  });
  assert.notEqual(index.get(page.secondary[0]).row, index.get(page.secondary[1]).row);
}

function cataloguePayload(api) {
  return JSON.parse(JSON.stringify(api.bundledRuneCatalogue.trees)).map((tree) => ({
    ...tree, slots: tree.slots.map((runes) => ({ runes }))
  }));
}

test("every built-in matchup and role produces a legal, complete rune page offline", () => {
  const api = setup();
  let count = 0;
  for (const champion of api.champions) for (const role of api.roles) for (const enemy of api.champions) {
    if (champion === enemy) continue;
    validatePage(api.getMatchupRunePage(champion, enemy, role), api.runeIndex);
    count += 1;
  }
  assert.ok(count > 3000);
});

test("the same champion adapts defenses to ranged harassment versus close trades", () => {
  const api = setup();
  const garen = api.getChampion("Garen");
  const poke = api.getMatchupRunePage(garen, api.getChampion("Caitlyn"), "Top");
  const melee = api.getMatchupRunePage(garen, api.getChampion("Darius"), "Top");
  assert.ok(poke.secondary.includes(8444), "Second Wind against poke");
  assert.ok(melee.secondary.includes(8473), "Bone Plating for short trades");
  assert.match(poke.reasons.join(" "), /Caitlyn/);
  assert.match(melee.reasons.join(" "), /Darius/);
});

test("marksmen adapt their finishing rune against durable opponents", () => {
  const api = setup();
  const jinx = api.getChampion("Jinx");
  assert.ok(api.getMatchupRunePage(jinx, api.getChampion("Malphite"), "ADC").primary.includes(8017));
  assert.ok(api.getMatchupRunePage(jinx, api.getChampion("Caitlyn"), "ADC").primary.includes(8014));
});

test("support versus jungle role changes the secondary plan", () => {
  const api = setup();
  const champion = api.getChampion("Maokai");
  const enemy = api.getChampion("Darius");
  assert.ok(api.getMatchupRunePage(champion, enemy, "Support").secondary.includes(8306));
  assert.ok(api.getMatchupRunePage(champion, enemy, "Jungle").secondary.includes(9111));
});

test("manaless champions do not receive mana-dependent runes", () => {
  const api = setup();
  const enemy = api.getChampion("Darius");
  for (const name of ["Garen", "Akali", "Kennen", "Shen", "Vladimir", "Yasuo"]) {
    const champion = api.getChampion(name) || { ...api.getChampion("Annie"), name, official: { tags: ["Mage"], partype: "Energy" } };
    for (const role of api.roles) {
      const page = api.getMatchupRunePage(champion, enemy, role);
      assert.ok(![...page.primary, ...page.secondary].some((id) => id === 8009 || id === 8226), name);
    }
  }
});

test("enchanters can take Guardian against a burst threat", () => {
  const api = setup();
  const page = api.getMatchupRunePage(api.getChampion("Lulu"), api.getChampion("Annie"), "Support");
  assert.equal(page.primary[0], 8465);
});

test("unknown roster additions use a labeled archetype fallback", () => {
  const api = setup();
  const champion = { ...api.getChampion("Annie"), name: "New mage", official: { tags: ["Mage"], partype: "Mana" } };
  const page = api.getMatchupRunePage(champion, api.getChampion("Garen"));
  validatePage(page, api.runeIndex);
  assert.equal(page.source, "Archetype fallback + matchup rules");
  assert.equal(page.primary[0], 8229);
  assert.equal(page.role, "Mid");
});

test("offline catalogue failure retains the dated fallback and useful advice", async () => {
  const api = setup();
  api.context.fetch = async () => { throw new Error("offline"); };
  await api.loadRuneCatalogue("future-patch");
  assert.match(api.renderMatchupRunes(api.getChampion("Garen"), api.getChampion("Darius"), "Top"), /Bundled rune snapshot 16\.21\.1/);
});

test("live catalogue refresh identifies its patch and does not claim win-rate data", async () => {
  const api = setup();
  api.context.fetch = async () => ({ ok: true, json: async () => cataloguePayload(api) });
  await api.loadRuneCatalogue("test-patch");
  const html = api.renderMatchupRunes(api.getChampion("Garen"), api.getChampion("Darius"), "Top");
  assert.match(html, /Riot rune catalogue test-patch/);
  assert.match(html, /no rune win-rate data/);
});

test("a removed or relocated rune suppresses the incompatible page", async () => {
  for (const relocate of [false, true]) {
    const api = setup();
    const payload = cataloguePayload(api);
    const precision = payload.find((tree) => tree.id === 8000);
    const conqueror = precision.slots[0].runes.find((rune) => rune.id === 8010);
    precision.slots[0].runes = precision.slots[0].runes.filter((rune) => rune.id !== 8010);
    if (relocate) precision.slots[1].runes.push(conqueror);
    api.context.fetch = async () => ({ ok: true, json: async () => payload });
    await api.loadRuneCatalogue("changed-patch");
    const html = api.renderMatchupRunes(api.getChampion("Garen"), api.getChampion("Darius"), "Top");
    assert.match(html, /Suggested runes need review/);
    assert.doesNotMatch(html, /<details/);
  }
});

test("malformed catalogues leave the fallback intact", async () => {
  const api = setup();
  api.context.fetch = async () => ({ ok: true, json: async () => [{ id: 8000, slots: [] }] });
  await api.loadRuneCatalogue("invalid");
  validatePage(api.getMatchupRunePage(api.getChampion("Garen"), api.getChampion("Darius")), api.runeIndex);
  assert.match(api.renderMatchupRunes(api.getChampion("Garen"), api.getChampion("Darius")), /Bundled rune snapshot/);
});

test("rendering escapes opponent content and handles absent picks", () => {
  const api = setup();
  assert.equal(api.renderMatchupRunes(null, null), "");
  const enemy = { ...api.getChampion("Darius"), name: '<img src=x onerror="alert(1)">' };
  const html = api.renderMatchupRunes(api.getChampion("Garen"), enemy, "Top");
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;img/);
});
