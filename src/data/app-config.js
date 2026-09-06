const roles = ["Top", "Jungle", "Mid", "ADC", "Support"];
const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";

const riotData = {
  status: "offline",
  version: null,
  matchedChampions: 0
};

const roleOverrides = {
  Aatrox: ["Top"],
  Ahri: ["Mid"],
  Akali: ["Mid", "Top"],
  Akshan: ["Mid", "Top"],
  Alistar: ["Support"],
  Ambessa: ["Top"],
  Amumu: ["Jungle", "Support"],
  Anivia: ["Mid"],
  Annie: ["Mid", "Support"],
  Aphelios: ["ADC"],
  Ashe: ["ADC", "Support"],
  "Aurelion Sol": ["Mid"],
  Aurora: ["Mid", "Top"],
  Azir: ["Mid"],
  Bard: ["Support"],
  "Bel'Veth": ["Jungle"],
  Blitzcrank: ["Support"],
  Brand: ["Support", "Mid", "Jungle"],
  Braum: ["Support"],
  Briar: ["Jungle"],
  Caitlyn: ["ADC"],
  Camille: ["Top", "Support"],
  Cassiopeia: ["Mid", "Top"],
  "Cho'Gath": ["Top", "Mid"],
  Corki: ["Mid", "ADC"],
  Darius: ["Top"],
  Diana: ["Jungle", "Mid"],
  "Dr. Mundo": ["Top"],
  Draven: ["ADC"],
  Ekko: ["Jungle", "Mid"],
  Elise: ["Jungle"],
  Evelynn: ["Jungle"],
  Ezreal: ["ADC"],
  Fiddlesticks: ["Jungle", "Support"],
  Fiora: ["Top"],
  Fizz: ["Mid"],
  Galio: ["Mid", "Support"],
  Gangplank: ["Top"],
  Garen: ["Top"],
  Gnar: ["Top"],
  Gragas: ["Top", "Jungle", "Support"],
  Graves: ["Jungle"],
  Gwen: ["Top", "Jungle"],
  Hecarim: ["Jungle"],
  Heimerdinger: ["Mid", "Support", "Top"],
  Hwei: ["Mid", "Support"],
  Illaoi: ["Top"],
  Irelia: ["Top", "Mid"],
  Ivern: ["Jungle"],
  Janna: ["Support"],
  "Jarvan IV": ["Jungle", "Top"],
  Jax: ["Top", "Jungle"],
  Jayce: ["Top", "Mid"],
  Jhin: ["ADC"],
  Jinx: ["ADC"],
  "K'Sante": ["Top"],
  "Kai'Sa": ["ADC"],
  Kalista: ["ADC"],
  Karma: ["Support", "Mid"],
  Karthus: ["Jungle", "Mid"],
  Kassadin: ["Mid"],
  Katarina: ["Mid"],
  Kayle: ["Top", "Mid"],
  Kayn: ["Jungle"],
  Kennen: ["Top", "Mid"],
  "Kha'Zix": ["Jungle"],
  Kindred: ["Jungle"],
  Kled: ["Top"],
  "Kog'Maw": ["ADC"],
  LeBlanc: ["Mid"],
  "Lee Sin": ["Jungle"],
  Leona: ["Support"],
  Lillia: ["Jungle", "Top"],
  Lissandra: ["Mid"],
  Lucian: ["ADC", "Mid"],
  Lulu: ["Support"],
  Lux: ["Support", "Mid"],
  Malphite: ["Top", "Support"],
  Malzahar: ["Mid"],
  Maokai: ["Support", "Jungle", "Top"],
  "Master Yi": ["Jungle"],
  Mel: ["Mid", "Support"],
  Milio: ["Support"],
  "Miss Fortune": ["ADC"],
  Mordekaiser: ["Top", "Jungle"],
  Morgana: ["Support", "Mid", "Jungle"],
  Naafiri: ["Mid"],
  Nami: ["Support"],
  Nasus: ["Top"],
  Nautilus: ["Support", "Jungle"],
  Neeko: ["Mid", "Support"],
  Nidalee: ["Jungle"],
  Nilah: ["ADC"],
  Nocturne: ["Jungle"],
  "Nunu & Willump": ["Jungle"],
  Olaf: ["Top", "Jungle"],
  Orianna: ["Mid"],
  Ornn: ["Top"],
  Pantheon: ["Top", "Support", "Mid"],
  Poppy: ["Top", "Jungle", "Support"],
  Pyke: ["Support"],
  Qiyana: ["Mid", "Jungle"],
  Quinn: ["Top"],
  Rakan: ["Support"],
  Rammus: ["Jungle"],
  "Rek'Sai": ["Jungle"],
  Rell: ["Support", "Jungle"],
  "Renata Glasc": ["Support"],
  Renekton: ["Top"],
  Rengar: ["Jungle", "Top"],
  Riven: ["Top"],
  Rumble: ["Top", "Mid"],
  Ryze: ["Mid", "Top"],
  Samira: ["ADC"],
  Sejuani: ["Jungle", "Top"],
  Senna: ["Support", "ADC"],
  Seraphine: ["Support", "Mid", "ADC"],
  Sett: ["Top", "Support"],
  Shaco: ["Jungle", "Support"],
  Shen: ["Top", "Support"],
  Shyvana: ["Jungle", "Top"],
  Singed: ["Top"],
  Sion: ["Top"],
  Sivir: ["ADC"],
  Skarner: ["Jungle", "Top"],
  Smolder: ["ADC", "Mid"],
  Sona: ["Support"],
  Soraka: ["Support"],
  Swain: ["Support", "Mid"],
  Sylas: ["Mid", "Top"],
  Syndra: ["Mid"],
  "Tahm Kench": ["Support", "Top"],
  Taliyah: ["Mid", "Jungle"],
  Talon: ["Mid", "Jungle"],
  Taric: ["Support"],
  Teemo: ["Top", "Support"],
  Thresh: ["Support"],
  Tristana: ["ADC", "Mid"],
  Trundle: ["Top", "Jungle"],
  Tryndamere: ["Top"],
  "Twisted Fate": ["Mid", "Top"],
  Twitch: ["ADC", "Support"],
  Udyr: ["Jungle", "Top"],
  Urgot: ["Top"],
  Varus: ["ADC"],
  Vayne: ["ADC", "Top"],
  Veigar: ["Mid", "Support"],
  "Vel'Koz": ["Support", "Mid"],
  Vex: ["Mid"],
  Vi: ["Jungle"],
  Viego: ["Jungle"],
  Viktor: ["Mid"],
  Vladimir: ["Mid", "Top"],
  Volibear: ["Top", "Jungle"],
  Warwick: ["Jungle", "Top"],
  Wukong: ["Top", "Jungle"],
  Xayah: ["ADC"],
  Xerath: ["Support", "Mid"],
  "Xin Zhao": ["Jungle"],
  Yasuo: ["Mid", "Top", "ADC"],
  Yone: ["Mid", "Top"],
  Yorick: ["Top"],
  Yuumi: ["Support"],
  Zac: ["Jungle", "Top", "Support"],
  Zed: ["Mid"],
  Zeri: ["ADC"],
  Ziggs: ["ADC", "Mid"],
  Zilean: ["Support", "Mid"],
  Zoe: ["Mid"],
  Zyra: ["Support"]
};

const magicDamageChampions = new Set([
  "Ahri", "Akali", "Amumu", "Anivia", "Annie", "Aurelion Sol", "Aurora", "Azir",
  "Brand", "Cassiopeia", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks",
  "Fizz", "Galio", "Gragas", "Gwen", "Heimerdinger", "Hwei", "Karthus", "Kassadin",
  "Katarina", "Kayle", "Kennen", "LeBlanc", "Lillia", "Lissandra", "Lux", "Malphite",
  "Malzahar", "Mel", "Mordekaiser", "Morgana", "Neeko", "Nidalee", "Orianna",
  "Rumble", "Ryze", "Seraphine", "Shyvana", "Singed", "Sona", "Swain", "Sylas",
  "Syndra", "Taliyah", "Teemo", "Twisted Fate", "Veigar", "Vel'Koz", "Vex",
  "Viktor", "Vladimir", "Xerath", "Ziggs", "Zilean", "Zoe", "Zyra"
]);

const hybridDamageChampions = new Set([
  "Corki", "Ezreal", "Jax", "Kai'Sa", "Kog'Maw", "Shaco", "Smolder", "Varus",
  "Volibear", "Yone"
]);

const beginnerFriendlyChampions = new Set([
  "Amumu", "Annie", "Ashe", "Caitlyn", "Darius", "Garen", "Janna", "Jinx",
  "Leona", "Lux", "Malphite", "Malzahar", "Master Yi", "Miss Fortune", "Morgana",
  "Nautilus", "Nunu & Willump", "Rammus", "Shen", "Sona", "Soraka", "Trundle",
  "Warwick", "Xin Zhao"
]);

const scoreKeys = [
  ["engage", "Engage"],
  ["frontline", "Frontline"],
  ["damage", "Damage"],
  ["pick", "Pick tools"],
  ["poke", "Poke"],
  ["peel", "Peel"],
  ["scaling", "Scaling"]
];

const championTraitGroups = {
  engage: new Set([
    "Alistar", "Amumu", "Annie", "Ashe", "Aurora", "Blitzcrank", "Diana", "Fiddlesticks",
    "Galio", "Gnar", "Gragas", "Hecarim", "Jarvan IV", "Kennen", "Kled", "Leona",
    "Lissandra", "Malphite", "Maokai", "Nautilus", "Neeko", "Nunu & Willump", "Ornn",
    "Poppy", "Rakan", "Rammus", "Rell", "Renekton", "Sejuani", "Seraphine", "Sett",
    "Shen", "Sion", "Skarner", "Vi", "Volibear", "Wukong", "Xin Zhao", "Zac"
  ]),
  poke: new Set([
    "Azir", "Caitlyn", "Corki", "Ezreal", "Jayce", "Jhin", "Karma", "Kog'Maw", "Lux",
    "Miss Fortune", "Nidalee", "Orianna", "Seraphine", "Smolder", "Taliyah", "Teemo",
    "Twisted Fate", "Varus", "Vel'Koz", "Viktor", "Xerath", "Ziggs", "Zoe", "Zyra"
  ]),
  scaling: new Set([
    "Anivia", "Aphelios", "Aurelion Sol", "Azir", "Cassiopeia", "Gangplank", "Gwen",
    "Jax", "Jinx", "Kai'Sa", "Karthus", "Kassadin", "Kayle", "Kindred", "Kog'Maw",
    "Master Yi", "Nasus", "Nilah", "Orianna", "Ryze", "Senna", "Shyvana", "Sivir",
    "Smolder", "Sona", "Tristana", "Twitch", "Vayne", "Veigar", "Viktor", "Vladimir",
    "Yasuo", "Yone", "Zeri"
  ]),
  early: new Set([
    "Aatrox", "Akshan", "Ambessa", "Blitzcrank", "Briar", "Caitlyn", "Camille", "Darius",
    "Draven", "Elise", "Fiora", "Graves", "Irelia", "Jarvan IV", "Jayce", "Kled",
    "Lee Sin", "Leona", "Lucian", "Nidalee", "Olaf", "Pantheon", "Pyke", "Qiyana",
    "Rek'Sai", "Renekton", "Rengar", "Riven", "Samira", "Shaco", "Talon", "Trundle",
    "Udyr", "Urgot", "Vi", "Volibear", "Warwick", "Xin Zhao"
  ]),
  sustain: new Set([
    "Aatrox", "Briar", "Cassiopeia", "Cho'Gath", "Darius", "Dr. Mundo", "Fiora", "Garen",
    "Gwen", "Illaoi", "Mordekaiser", "Nasus", "Nunu & Willump", "Olaf", "Renekton",
    "Soraka", "Swain", "Trundle", "Tryndamere", "Vladimir", "Volibear", "Warwick", "Yorick"
  ]),
  mobility: new Set([
    "Ahri", "Akali", "Akshan", "Ambessa", "Bel'Veth", "Camille", "Diana", "Ekko",
    "Evelynn", "Ezreal", "Fiora", "Fizz", "Irelia", "Jarvan IV", "Kai'Sa", "Kalista",
    "Katarina", "Kassadin", "Kayn", "Kha'Zix", "Kindred", "LeBlanc", "Lee Sin",
    "Lucian", "Nilah", "Nocturne", "Qiyana", "Rakan", "Rek'Sai", "Rengar", "Riven",
    "Samira", "Talon", "Tristana", "Vayne", "Vi", "Viego", "Yasuo", "Yone", "Zed", "Zeri"
  ]),
  peel: new Set([
    "Alistar", "Bard", "Braum", "Galio", "Janna", "Karma", "Lulu", "Maokai", "Milio",
    "Morgana", "Nami", "Nautilus", "Orianna", "Poppy", "Rakan", "Renata Glasc", "Seraphine",
    "Shen", "Sona", "Soraka", "Tahm Kench", "Taric", "Thresh", "Zilean"
  ]),
  splitPush: new Set([
    "Camille", "Fiora", "Gangplank", "Gwen", "Illaoi", "Jax", "Kayle", "Kled",
    "Nasus", "Quinn", "Riven", "Shen", "Singed", "Sion", "Teemo", "Trundle",
    "Tryndamere", "Twisted Fate", "Udyr", "Vayne", "Yorick"
  ]),
  reset: new Set([
    "Aatrox", "Bel'Veth", "Briar", "Darius", "Jinx", "Katarina", "Kha'Zix", "Master Yi",
    "Pyke", "Samira", "Tristana", "Viego"
  ]),
  global: new Set([
    "Ashe", "Briar", "Draven", "Ezreal", "Gangplank", "Jinx", "Karthus", "Nocturne",
    "Pantheon", "Senna", "Shen", "Soraka", "Twisted Fate"
  ]),
  safe: new Set([
    "Ahri", "Anivia", "Caitlyn", "Ezreal", "Gragas", "Janna", "Jayce", "Karma", "Lux",
    "Morgana", "Orianna", "Sivir", "Smolder", "Tristana", "Xayah", "Xerath", "Ziggs", "Zilean"
  ]),
  antiDive: new Set([
    "Alistar", "Anivia", "Braum", "Cassiopeia", "Galio", "Janna", "Lissandra", "Lulu",
    "Malzahar", "Maokai", "Milio", "Morgana", "Poppy", "Renata Glasc", "Shen", "Tahm Kench",
    "Taric", "Vex", "Xayah", "Zilean"
  ]),
  siege: new Set([
    "Azir", "Caitlyn", "Corki", "Ezreal", "Heimerdinger", "Jayce", "Jhin", "Lux",
    "Seraphine", "Tristana", "Varus", "Vel'Koz", "Xerath", "Ziggs", "Zoe", "Zyra"
  ]),
  wombo: new Set([
    "Amumu", "Annie", "Aurora", "Diana", "Fiddlesticks", "Gnar", "Jarvan IV", "Kennen",
    "Lissandra", "Malphite", "Miss Fortune", "Neeko", "Orianna", "Ornn", "Rell",
    "Seraphine", "Sona", "Wukong", "Yasuo"
  ])
};

const explorerCounterOverrides = {
  "Xin Zhao": {
    "Master Yi": {
      bonus: 36,
      reason: "Xin Zhao's early dueling, knock-up, and direct pressure can deny Master Yi the quiet scaling game he wants."
    },
    Karthus: {
      bonus: 34,
      reason: "Xin Zhao can invade and force close-range fights before Karthus has the items and levels to control them."
    },
    Evelynn: {
      bonus: 34,
      reason: "Xin Zhao can contest early camps and river fights before Evelynn reaches her safer post-level-six game."
    },
    Shyvana: {
      bonus: 34,
      reason: "Xin Zhao's early skirmishing can punish Shyvana while she is focused on farming and scaling."
    },
    "Kha'Zix": {
      bonus: 36,
      reason: "Xin Zhao is difficult to burst in a direct duel and can force Kha'Zix into less favorable front-facing fights."
    }
  }
};

const recommendationGoals = {
  balanced: {
    label: "Balanced fit",
    weights: { engage: 1, frontline: 1, damage: 1, pick: 1, poke: 1, peel: 1, scaling: 1 },
    tags: []
  },
  teamfight: {
    label: "Teamfight",
    weights: { engage: 1.6, frontline: 1.35, damage: 1.15, pick: 0.65, poke: 0.55, peel: 1, scaling: 0.85 },
    tags: ["engage", "wombo", "aoe", "lockdown"]
  },
  protect: {
    label: "Protect carries",
    weights: { engage: 0.7, frontline: 1.25, damage: 0.75, pick: 0.55, poke: 0.7, peel: 1.7, scaling: 1.2 },
    tags: ["peel", "shield", "anti-dive", "disengage", "frontline"]
  },
  early: {
    label: "Early pressure",
    weights: { engage: 1.1, frontline: 0.8, damage: 1.2, pick: 1.45, poke: 0.85, peel: 0.55, scaling: 0.35 },
    tags: ["early", "snowball", "duel", "mobility", "pick"]
  },
  scaling: {
    label: "Scaling",
    weights: { engage: 0.7, frontline: 1, damage: 1.2, pick: 0.45, poke: 0.8, peel: 1.2, scaling: 1.75 },
    tags: ["scaling", "marksman", "peel", "safe", "frontline"]
  },
  pick: {
    label: "Pick and poke",
    weights: { engage: 0.75, frontline: 0.55, damage: 1, pick: 1.55, poke: 1.5, peel: 0.65, scaling: 0.7 },
    tags: ["pick", "poke", "range", "siege", "lockdown"]
  }
};

const draftSequence = [
  ...Array.from({ length: 5 }, (_, index) => [
    { type: "ban", side: "Blue", round: index + 1 },
    { type: "ban", side: "Red", round: index + 1 }
  ]).flat(),
  ...roles.flatMap((role) => [
    { type: "pick", side: "Blue", role },
    { type: "pick", side: "Red", role }
  ])
];
