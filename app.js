const roles = ["Top", "Jungle", "Mid", "ADC", "Support"];
const DDRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";

const riotData = {
  status: "offline",
  version: null,
  matchedChampions: 0
};

const champions = [
  {
    name: "Malphite",
    roles: ["Top"],
    style: "Hard engage tank",
    tags: ["engage", "frontline", "wombo", "anti-carry"],
    scores: { engage: 5, frontline: 5, damage: 2, pick: 2, poke: 1, peel: 3, scaling: 2 },
    goodInto: ["immobile", "marksman", "dive"],
    weakInto: ["poke", "split-push", "sustain"],
    beginner: "Press R when teammates are close enough to follow."
  },
  {
    name: "Garen",
    roles: ["Top"],
    style: "Simple bruiser",
    tags: ["frontline", "duel", "anti-assassin", "sustain"],
    scores: { engage: 2, frontline: 4, damage: 3, pick: 2, poke: 1, peel: 2, scaling: 2 },
    goodInto: ["assassin", "low-range", "burst"],
    weakInto: ["kite", "poke", "range"],
    beginner: "Great when you want fewer mechanics and a clear side-lane plan."
  },
  {
    name: "Shen",
    roles: ["Top"],
    style: "Protective tank",
    tags: ["frontline", "peel", "global", "duel"],
    scores: { engage: 3, frontline: 4, damage: 2, pick: 2, poke: 1, peel: 5, scaling: 3 },
    goodInto: ["dive", "assassin", "burst"],
    weakInto: ["split-push", "poke", "range"],
    beginner: "Look for ult saves when enemies commit onto your carries."
  },
  {
    name: "Darius",
    roles: ["Top"],
    style: "Lane bully bruiser",
    tags: ["frontline", "duel", "snowball", "low-range"],
    scores: { engage: 2, frontline: 4, damage: 4, pick: 2, poke: 1, peel: 2, scaling: 2 },
    goodInto: ["low-range", "tank", "sustain"],
    weakInto: ["kite", "range", "poke"],
    beginner: "Strong when enemies have to walk into him."
  },
  {
    name: "Ornn",
    roles: ["Top"],
    style: "Scaling engage tank",
    tags: ["engage", "frontline", "scaling", "wombo"],
    scores: { engage: 4, frontline: 5, damage: 2, pick: 2, poke: 2, peel: 3, scaling: 5 },
    goodInto: ["immobile", "tank", "scaling"],
    weakInto: ["split-push", "kite", "range"],
    beginner: "A safe teamfight anchor with upgrades for late game."
  },
  {
    name: "Sejuani",
    roles: ["Jungle"],
    style: "Engage jungler",
    tags: ["engage", "frontline", "pick", "wombo"],
    scores: { engage: 5, frontline: 5, damage: 2, pick: 4, poke: 1, peel: 3, scaling: 3 },
    goodInto: ["immobile", "dive", "low-range"],
    weakInto: ["kite", "poke", "range"],
    beginner: "Pairs well with melee lanes that help stack her stun."
  },
  {
    name: "Xin Zhao",
    roles: ["Jungle"],
    style: "Early dueling diver",
    tags: ["early", "duel", "engage", "dive", "frontline", "pick"],
    scores: { engage: 4, frontline: 3, damage: 4, pick: 3, poke: 1, peel: 2, scaling: 2 },
    goodInto: ["scaling", "immobile", "low-range", "assassin"],
    weakInto: ["disengage", "kite", "peel", "range"],
    beginner: "Use strong early dueling to contest the river, then engage with teammates close enough to follow."
  },
  {
    name: "Amumu",
    roles: ["Jungle"],
    style: "Teamfight starter",
    tags: ["engage", "frontline", "wombo", "lockdown"],
    scores: { engage: 5, frontline: 4, damage: 3, pick: 3, poke: 1, peel: 3, scaling: 3 },
    goodInto: ["immobile", "low-range", "dive"],
    weakInto: ["invade", "range", "disengage"],
    beginner: "Simple idea: land Q, press R when several enemies group."
  },
  {
    name: "Jarvan IV",
    roles: ["Jungle"],
    style: "Early engage fighter",
    tags: ["engage", "dive", "pick", "early"],
    scores: { engage: 4, frontline: 3, damage: 3, pick: 4, poke: 1, peel: 2, scaling: 2 },
    goodInto: ["immobile", "scaling", "low-range"],
    weakInto: ["dash", "disengage", "kite"],
    beginner: "Good when your lanes have damage but need someone to start fights."
  },
  {
    name: "Nocturne",
    roles: ["Jungle"],
    style: "Pick and dive threat",
    tags: ["dive", "pick", "anti-carry", "global"],
    scores: { engage: 3, frontline: 2, damage: 4, pick: 5, poke: 1, peel: 1, scaling: 3 },
    goodInto: ["immobile", "marksman", "poke"],
    weakInto: ["peel", "frontline", "group"],
    beginner: "Punishes isolated carries and messy map movement."
  },
  {
    name: "Maokai",
    roles: ["Jungle", "Support"],
    style: "Catch and peel tank",
    tags: ["engage", "frontline", "peel", "vision"],
    scores: { engage: 4, frontline: 4, damage: 2, pick: 4, poke: 2, peel: 5, scaling: 3 },
    goodInto: ["dive", "immobile", "assassin"],
    weakInto: ["kite", "poke", "split-push"],
    beginner: "Controls bushes and makes fights easy to start or stop."
  },
  {
    name: "Ahri",
    roles: ["Mid"],
    style: "Mobile pick mage",
    tags: ["pick", "mobility", "burst", "safe"],
    scores: { engage: 2, frontline: 1, damage: 3, pick: 5, poke: 2, peel: 2, scaling: 3 },
    goodInto: ["immobile", "mage", "low-peel"],
    weakInto: ["tank", "long-range", "point-click"],
    beginner: "Charm creates clear picks before big fights."
  },
  {
    name: "Annie",
    roles: ["Mid", "Support"],
    style: "Simple burst mage",
    tags: ["burst", "wombo", "pick", "beginner"],
    scores: { engage: 3, frontline: 1, damage: 4, pick: 4, poke: 2, peel: 2, scaling: 3 },
    goodInto: ["low-range", "assassin", "immobile"],
    weakInto: ["long-range", "poke", "tank"],
    beginner: "Track stun, flash Tibbers when allies can follow."
  },
  {
    name: "Orianna",
    roles: ["Mid"],
    style: "Control mage",
    tags: ["wombo", "scaling", "poke", "peel"],
    scores: { engage: 3, frontline: 1, damage: 4, pick: 2, poke: 4, peel: 4, scaling: 5 },
    goodInto: ["group", "low-range", "frontline"],
    weakInto: ["assassin", "dive", "long-range"],
    beginner: "Best with a teammate who can carry the ball into enemies."
  },
  {
    name: "Twisted Fate",
    roles: ["Mid"],
    style: "Map control picker",
    tags: ["pick", "global", "utility", "early"],
    scores: { engage: 2, frontline: 1, damage: 2, pick: 5, poke: 2, peel: 2, scaling: 3 },
    goodInto: ["immobile", "scaling", "split-push"],
    weakInto: ["assassin", "dive", "burst"],
    beginner: "Turns side lanes into numbers advantages."
  },
  {
    name: "Lux",
    roles: ["Mid", "Support"],
    style: "Long-range poke",
    tags: ["poke", "pick", "shield", "siege"],
    scores: { engage: 1, frontline: 1, damage: 4, pick: 4, poke: 5, peel: 3, scaling: 3 },
    goodInto: ["low-range", "immobile", "siege"],
    weakInto: ["dive", "assassin", "hard-engage"],
    beginner: "Stays far back and fishes for bindings before fights."
  },
  {
    name: "Jinx",
    roles: ["ADC"],
    style: "Scaling reset carry",
    tags: ["scaling", "marksman", "aoe", "reset"],
    scores: { engage: 1, frontline: 1, damage: 5, pick: 1, poke: 3, peel: 1, scaling: 5 },
    goodInto: ["frontline", "low-threat", "group"],
    weakInto: ["dive", "assassin", "pick"],
    beginner: "Needs protection; wins fights after the first takedown."
  },
  {
    name: "Ashe",
    roles: ["ADC", "Support"],
    style: "Utility marksman",
    tags: ["pick", "utility", "kite", "vision"],
    scores: { engage: 3, frontline: 1, damage: 3, pick: 5, poke: 3, peel: 3, scaling: 3 },
    goodInto: ["immobile", "low-range", "melee"],
    weakInto: ["dive", "assassin", "burst"],
    beginner: "Arrow gives the whole team an obvious target."
  },
  {
    name: "Miss Fortune",
    roles: ["ADC"],
    style: "AoE teamfight carry",
    tags: ["wombo", "marksman", "poke", "aoe"],
    scores: { engage: 1, frontline: 1, damage: 5, pick: 1, poke: 4, peel: 1, scaling: 3 },
    goodInto: ["group", "low-mobility", "frontline"],
    weakInto: ["dive", "assassin", "disengage"],
    beginner: "Huge with allies who hold enemies inside Bullet Time."
  },
  {
    name: "Caitlyn",
    roles: ["ADC"],
    style: "Lane and siege marksman",
    tags: ["poke", "siege", "range", "early"],
    scores: { engage: 1, frontline: 1, damage: 4, pick: 2, poke: 5, peel: 1, scaling: 3 },
    goodInto: ["low-range", "immobile", "scaling"],
    weakInto: ["dive", "hard-engage", "assassin"],
    beginner: "Pushes lanes and chips towers before 5v5s."
  },
  {
    name: "Ezreal",
    roles: ["ADC"],
    style: "Safe poke marksman",
    tags: ["poke", "safe", "mobility", "scaling"],
    scores: { engage: 1, frontline: 1, damage: 4, pick: 1, poke: 5, peel: 1, scaling: 4 },
    goodInto: ["dive", "poke", "skillshot"],
    weakInto: ["tank", "sustain", "frontline"],
    beginner: "Good when fights are messy and you need self-safety."
  },
  {
    name: "Leona",
    roles: ["Support"],
    style: "All-in engage support",
    tags: ["engage", "frontline", "lockdown", "dive"],
    scores: { engage: 5, frontline: 4, damage: 1, pick: 4, poke: 1, peel: 3, scaling: 2 },
    goodInto: ["immobile", "low-range", "squishy"],
    weakInto: ["poke", "disengage", "range"],
    beginner: "Very clear job: lock one target down so allies can hit them."
  },
  {
    name: "Nautilus",
    roles: ["Support"],
    style: "Reliable catch support",
    tags: ["engage", "frontline", "pick", "lockdown"],
    scores: { engage: 5, frontline: 4, damage: 1, pick: 5, poke: 1, peel: 3, scaling: 2 },
    goodInto: ["immobile", "marksman", "low-range"],
    weakInto: ["poke", "disengage", "peel"],
    beginner: "Point-and-click ultimate makes target selection easy."
  },
  {
    name: "Lulu",
    roles: ["Support"],
    style: "Carry protector",
    tags: ["peel", "shield", "anti-assassin", "enchanter"],
    scores: { engage: 1, frontline: 1, damage: 1, pick: 1, poke: 2, peel: 5, scaling: 4 },
    goodInto: ["dive", "assassin", "burst"],
    weakInto: ["poke", "hard-engage", "range"],
    beginner: "Makes one carry much harder to kill."
  },
  {
    name: "Janna",
    roles: ["Support"],
    style: "Disengage enchanter",
    tags: ["peel", "disengage", "shield", "anti-dive"],
    scores: { engage: 1, frontline: 1, damage: 1, pick: 1, poke: 2, peel: 5, scaling: 4 },
    goodInto: ["dive", "engage", "assassin"],
    weakInto: ["poke", "siege", "hook"],
    beginner: "Best when the enemy team wants to jump forward."
  },
  {
    name: "Morgana",
    roles: ["Support", "Mid"],
    style: "Anti-catch utility",
    tags: ["pick", "shield", "anti-engage", "utility"],
    scores: { engage: 2, frontline: 1, damage: 2, pick: 4, poke: 3, peel: 4, scaling: 3 },
    goodInto: ["lockdown", "hook", "pick"],
    weakInto: ["poke", "frontline", "sustain"],
    beginner: "Black Shield can erase one important crowd-control attempt."
  }
];

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

const pairSynergies = [
  ["Malphite", "Orianna", "Malphite brings the ball into a clean Shockwave setup."],
  ["Malphite", "Miss Fortune", "Unstoppable Force holds targets for Bullet Time."],
  ["Amumu", "Miss Fortune", "Curse of the Sad Mummy gives Miss Fortune a safe ultimate window."],
  ["Jarvan IV", "Orianna", "Jarvan traps grouped enemies for a ball delivery combo."],
  ["Leona", "Miss Fortune", "Leona keeps enemies still while Bullet Time channels."],
  ["Nautilus", "Jinx", "Reliable lockdown helps Jinx get the first reset."],
  ["Lulu", "Jinx", "Lulu covers Jinx while she scales into teamfights."],
  ["Janna", "Jinx", "Janna disengage buys Jinx the space she needs."],
  ["Ashe", "Twisted Fate", "Double global pick tools make side-lane catches simple."],
  ["Nocturne", "Twisted Fate", "Paranoia plus Destiny creates scary map pressure."],
  ["Shen", "Nocturne", "Shen can follow Nocturne dives with Stand United."],
  ["Caitlyn", "Lux", "Long range trap-and-binding pressure wins lane and sieges."],
  ["Ezreal", "Lux", "Double poke softens targets before objectives."],
  ["Sejuani", "Darius", "Melee pressure helps Sejuani stack her passive in skirmishes."]
];

const premadeComps = [
  {
    id: "wombo-combo",
    name: "Wombo Combo",
    category: "Teamfight",
    difficulty: "Beginner",
    summary: "Layer large area-of-effect ultimates onto one clear engage.",
    picks: { Top: "Malphite", Jungle: "Amumu", Mid: "Orianna", ADC: "Miss Fortune", Support: "Leona" },
    pros: [
      "Extremely clear 5v5 win condition.",
      "Multiple champions can start the fight.",
      "Mixed damage makes defensive itemization awkward."
    ],
    cons: [
      "Much weaker while major ultimates are unavailable.",
      "Can waste every cooldown on the same target.",
      "Side-lane pressure and disengage are limited."
    ],
    phases: {
      early: "Play stable lanes and protect Amumu from early invades. Do not force low-value fights before the team has its key ultimates.",
      mid: "Group first around dragons and narrow jungle entrances. Put Orianna's ball on Malphite or Amumu, then let Miss Fortune ult after enemies are locked down.",
      late: "Control vision and threaten a flank instead of walking directly at the enemy. Layer engage spells one after another so the enemy cannot escape between them."
    },
    rule: "The first engage creates the opening; the follow-up ultimates actually win the fight.",
    alternatives: [
      { role: "Jungle", from: "Amumu", to: "Jarvan IV" },
      { role: "Support", from: "Leona", to: "Nautilus" }
    ]
  },
  {
    id: "protect-jinx",
    name: "Protect the Jinx",
    category: "Protect",
    difficulty: "Beginner",
    summary: "Build a durable shell around one scaling reset carry.",
    picks: { Top: "Shen", Jungle: "Maokai", Mid: "Orianna", ADC: "Jinx", Support: "Lulu" },
    pros: [
      "Exceptional peel and front-to-back fighting.",
      "Strong late-game scaling and reset potential.",
      "Shen can protect Jinx or join fights from a side lane."
    ],
    cons: [
      "Early damage can feel low before Jinx has items.",
      "The team becomes much weaker if Jinx is caught first.",
      "Poor target selection can split protection across too many allies."
    ],
    phases: {
      early: "Prioritize safe farm for Jinx and avoid unnecessary bot-lane all-ins. Maokai should cover vulnerable lanes and Shen should watch for defensive ultimate opportunities.",
      mid: "Move as a group around Jinx when contesting objectives. Maokai controls entrances while Orianna and Lulu save shields and crowd control for enemy divers.",
      late: "Fight front-to-back and hit the nearest safe target. Spend Shen, Lulu, and Orianna protection to keep Jinx alive until the first reset changes the fight."
    },
    rule: "Do not chase away from Jinx; make the enemy cross the whole team to reach her.",
    alternatives: [
      { role: "Support", from: "Lulu", to: "Janna" },
      { role: "Jungle", from: "Maokai", to: "Sejuani" }
    ]
  },
  {
    id: "global-pick",
    name: "Global Pick Squad",
    category: "Pick",
    difficulty: "Intermediate",
    summary: "Use global pressure and reliable crowd control to create unfair fights.",
    picks: { Top: "Shen", Jungle: "Nocturne", Mid: "Twisted Fate", ADC: "Ashe", Support: "Nautilus" },
    pros: [
      "Excellent at catching isolated enemies.",
      "Strong side-lane and cross-map pressure.",
      "Several reliable tools identify one target for the team."
    ],
    cons: [
      "Less comfortable in a fair front-to-back 5v5.",
      "Requires vision and coordinated target selection.",
      "Loses value when the enemy stays grouped and plays patiently."
    ],
    phases: {
      early: "Keep lanes healthy and communicate which enemy has no flash. Twisted Fate and Nocturne should reach level six without taking desperate early fights.",
      mid: "Push side waves, remove vision, and use Ashe arrow or Nautilus ultimate to begin a numbers advantage. Shen, Nocturne, and Twisted Fate can collapse from multiple angles.",
      late: "Avoid blind 5v5 engages into a prepared team. Use darkness, vision denial, and side-wave pressure to isolate one target before Baron or Elder."
    },
    rule: "One caught enemy is an objective; do not keep chasing after the advantage is secured.",
    alternatives: [
      { role: "Mid", from: "Twisted Fate", to: "Ahri" },
      { role: "Support", from: "Nautilus", to: "Leona" }
    ]
  },
  {
    id: "siege-net",
    name: "Siege and Traps",
    category: "Poke",
    difficulty: "Intermediate",
    summary: "Arrive first, control space, and damage enemies before they can engage.",
    picks: { Top: "Ornn", Jungle: "Jarvan IV", Mid: "Lux", ADC: "Caitlyn", Support: "Morgana" },
    pros: [
      "Strong range, wave clear, and objective setup.",
      "Caitlyn traps and Lux bindings make narrow entrances dangerous.",
      "Ornn provides the frontline and late-game insurance."
    ],
    cons: [
      "Vulnerable when caught before setting up the area.",
      "Jarvan can trap teammates in a bad fight if he commits too early.",
      "Needs patience; forced tower dives are often unnecessary."
    ],
    phases: {
      early: "Use Caitlyn and Morgana lane pressure to gain priority without overextending. Lux clears safely while Jarvan plays toward lanes that can follow his early engage.",
      mid: "Reach objectives first, place traps and bindings across entrances, and let Ornn threaten anyone who walks forward. Take towers after the enemy has already lost health.",
      late: "Protect the siege formation and avoid entering dark jungle corridors. Poke first, then use Ornn or Jarvan only when a damaged target can be finished."
    },
    rule: "The team wins before the full fight by controlling space and lowering health bars.",
    alternatives: [
      { role: "ADC", from: "Caitlyn", to: "Ezreal" },
      { role: "Support", from: "Morgana", to: "Lux" }
    ]
  },
  {
    id: "simple-engage",
    name: "Beginner Engage",
    category: "Beginner",
    difficulty: "Beginner",
    summary: "A forgiving team with obvious buttons, durable champions, and reliable crowd control.",
    picks: { Top: "Garen", Jungle: "Amumu", Mid: "Annie", ADC: "Ashe", Support: "Leona" },
    pros: [
      "Every player has a straightforward job.",
      "Reliable crowd control makes target selection obvious.",
      "Durable frontline forgives small positioning mistakes."
    ],
    cons: [
      "Short range makes disciplined poke teams difficult.",
      "Engages are predictable when flash and ultimates are down.",
      "The team can overcommit by running at the first visible enemy."
    ],
    phases: {
      early: "Farm safely, track Annie's stun, and let Leona or Amumu start only when nearby teammates can follow. Ashe should use slows to extend good trades rather than force every fight.",
      mid: "Group around the first completed items and contest objectives with vision. Pick one target, chain crowd control, then take the nearest objective instead of scattering.",
      late: "Stay together and protect Ashe from flanks. Amumu or Leona starts, Annie adds burst, and Garen prevents enemies from freely reaching the backline."
    },
    rule: "Choose one target together; five simple decisions beat five separate clever ones.",
    alternatives: [
      { role: "Top", from: "Garen", to: "Malphite" },
      { role: "Support", from: "Leona", to: "Nautilus" }
    ]
  },
  {
    id: "front-to-back",
    name: "Front-to-Back Fortress",
    category: "Teamfight",
    difficulty: "Beginner",
    summary: "Two tanks hold the line while Jinx deals damage from a protected backline.",
    picks: { Top: "Ornn", Jungle: "Sejuani", Mid: "Annie", ADC: "Jinx", Support: "Janna" },
    pros: [
      "Very durable frontline and excellent disengage.",
      "Strong scaling through Ornn upgrades and Jinx damage.",
      "Easy formation to understand in teamfights."
    ],
    cons: [
      "Early objective damage and lane pressure can be modest.",
      "Jinx remains the main sustained damage source.",
      "Chasing breaks the formation that makes the comp strong."
    ],
    phases: {
      early: "Accept a calm early game and avoid losing too much health before objectives. Sejuani should play around lanes that can help stack her crowd control.",
      mid: "Group in a clear formation with Ornn and Sejuani in front. Annie threatens burst on anyone who crosses the frontline while Janna protects Jinx.",
      late: "Do not dive past the enemy tanks. Hit the nearest safe target, deny flanks, and let Jinx's range and resets carry extended fights."
    },
    rule: "Your formation is a resource; keep the tanks in front and Jinx behind them.",
    alternatives: [
      { role: "Top", from: "Ornn", to: "Shen" },
      { role: "Mid", from: "Annie", to: "Orianna" }
    ]
  },
  {
    id: "anti-dive",
    name: "Anti-Dive Shelter",
    category: "Protect",
    difficulty: "Intermediate",
    summary: "Invite the enemy forward, stop their dive, and win the second half of the fight.",
    picks: { Top: "Shen", Jungle: "Maokai", Mid: "Annie", ADC: "Ezreal", Support: "Janna" },
    pros: [
      "Difficult for assassins and divers to reach the backline.",
      "Ezreal remains safe while the team controls space.",
      "Strong counter-engage and defensive crowd control."
    ],
    cons: [
      "Can struggle to force fights against patient opponents.",
      "Tower damage and sustained front-to-back damage are modest.",
      "Using defensive spells too early leaves a later opening."
    ],
    phases: {
      early: "Keep lanes stable and deny easy snowballs. Maokai covers river entrances while Ezreal and Janna avoid committing to risky extended trades.",
      mid: "Poke around objectives and make the enemy spend mobility to reach you. Counter with Maokai, Annie, Janna, and Shen after the dive has committed.",
      late: "Hold formation and wait for the enemy's key threat to enter. Layer defensive crowd control, save the carry, then chase only after the dive tools are gone."
    },
    rule: "The enemy's first move is the signal; your counter-engage is the winning move.",
    alternatives: [
      { role: "ADC", from: "Ezreal", to: "Jinx" },
      { role: "Support", from: "Janna", to: "Lulu" }
    ]
  },
  {
    id: "catch-reset",
    name: "Catch into Reset",
    category: "Pick",
    difficulty: "Intermediate",
    summary: "Catch one target with reliable crowd control, then let Jinx clean up the fight.",
    picks: { Top: "Darius", Jungle: "Jarvan IV", Mid: "Ahri", ADC: "Jinx", Support: "Nautilus" },
    pros: [
      "Many ways to lock down one exposed target.",
      "Strong early and mid-game skirmishing.",
      "One takedown can activate Jinx and turn into a full team wipe."
    ],
    cons: [
      "Limited protection if enemies reach Jinx cleanly.",
      "Darius can be kited by long-range teams.",
      "A failed catch may leave the team without an escape plan."
    ],
    phases: {
      early: "Use Darius lane pressure and Jarvan's early movement to create small advantages. Ahri and Nautilus should hold crowd control until an enemy movement spell is used.",
      mid: "Control vision near objectives and threaten a hook, charm, or Jarvan engage. Focus the trapped target so Jinx receives her first reset immediately.",
      late: "Avoid long front-to-back fights against heavier scaling. Find a flank or isolated target, burst them quickly, and use Jinx's speed to finish or disengage."
    },
    rule: "The first takedown is more important than reaching the enemy carry immediately.",
    alternatives: [
      { role: "Jungle", from: "Jarvan IV", to: "Nocturne" },
      { role: "Support", from: "Nautilus", to: "Leona" }
    ]
  }
];

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

const roleState = Object.fromEntries(roles.map((role) => [role, null]));
const favoriteState = Object.fromEntries(roles.map((role) => [role, null]));
const scoreKeys = [
  ["engage", "Engage"],
  ["frontline", "Frontline"],
  ["damage", "Damage"],
  ["pick", "Pick tools"],
  ["poke", "Poke"],
  ["peel", "Peel"],
  ["scaling", "Scaling"]
];

const favoriteCompProfiles = [
  {
    id: "balanced",
    name: "Balanced",
    description: "Covers the basic needs without leaning too hard into one plan.",
    weights: { engage: 1, frontline: 1.1, damage: 1.1, pick: 0.8, poke: 0.7, peel: 1, scaling: 0.9 },
    tags: []
  },
  {
    id: "teamfight",
    name: "Teamfight",
    description: "Adds reliable initiation and area damage for grouped objective fights.",
    weights: { engage: 1.5, frontline: 1.2, damage: 1.2, pick: 0.6, poke: 0.5, peel: 0.8, scaling: 0.9 },
    tags: ["engage", "wombo", "aoe", "lockdown"]
  },
  {
    id: "protect",
    name: "Safe Scaling",
    description: "Builds a sturdier formation with peel and late-game insurance.",
    weights: { engage: 0.7, frontline: 1.25, damage: 0.9, pick: 0.5, poke: 0.6, peel: 1.55, scaling: 1.35 },
    tags: ["peel", "shield", "frontline", "scaling", "disengage"]
  }
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

let activeRole = "All";
let selectedDetailChampion = null;
let activePremadeId = premadeComps[0].id;
let favoriteVariantsCache = [];
let activeExplorerChampion = "Xin Zhao";

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

const draftRoomState = {
  turn: 0,
  blue: Object.fromEntries(roles.map((role) => [role, null])),
  red: Object.fromEntries(roles.map((role) => [role, null])),
  blueBans: [],
  redBans: [],
  history: []
};

const championGrid = document.querySelector("#championGrid");
const champSearch = document.querySelector("#champSearch");
const draftSlots = document.querySelector("#draftSlots");
const scoreBars = document.querySelector("#scoreBars");
const gamePlan = document.querySelector("#gamePlan");
const teamRating = document.querySelector("#teamRating");
const dataStatus = document.querySelector("#dataStatus");
const enemyRole = document.querySelector("#enemyRole");
const enemyPick = document.querySelector("#enemyPick");
const allyRole = document.querySelector("#allyRole");
const counterFocus = document.querySelector("#counterFocus");
const counterCount = document.querySelector("#counterCount");
const matchupOffRole = document.querySelector("#matchupOffRole");
const counterResults = document.querySelector("#counterResults");
const matchupOverview = document.querySelector("#matchupOverview");
const recommendRole = document.querySelector("#recommendRole");
const recommendGoal = document.querySelector("#recommendGoal");
const recommendCount = document.querySelector("#recommendCount");
const allowOffRolePicks = document.querySelector("#allowOffRolePicks");
const recommendations = document.querySelector("#recommendations");
const savedDrafts = document.querySelector("#savedDrafts");
const saveStatus = document.querySelector("#saveStatus");
const championDialog = document.querySelector("#championDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const championDetails = document.querySelector("#championDetails");
const draftTurn = document.querySelector("#draftTurn");
const draftSearch = document.querySelector("#draftSearch");
const draftChampionGrid = document.querySelector("#draftChampionGrid");
const draftSuggestions = document.querySelector("#draftSuggestions");
const blueBans = document.querySelector("#blueBans");
const redBans = document.querySelector("#redBans");
const bluePicks = document.querySelector("#bluePicks");
const redPicks = document.querySelector("#redPicks");
const blueIdentity = document.querySelector("#blueIdentity");
const redIdentity = document.querySelector("#redIdentity");
const draftWarnings = document.querySelector("#draftWarnings");
const warningCount = document.querySelector("#warningCount");
const draftComparison = document.querySelector("#draftComparison");
const comparisonStatus = document.querySelector("#comparisonStatus");
const premadeFilter = document.querySelector("#premadeFilter");
const premadeList = document.querySelector("#premadeList");
const premadeDetails = document.querySelector("#premadeDetails");
const favoriteRole = document.querySelector("#favoriteRole");
const favoriteChampion = document.querySelector("#favoriteChampion");
const favoriteCore = document.querySelector("#favoriteCore");
const favoriteCompSuggestions = document.querySelector("#favoriteCompSuggestions");
const explorerRosterCount = document.querySelector("#explorerRosterCount");
const explorerSearch = document.querySelector("#explorerSearch");
const explorerRole = document.querySelector("#explorerRole");
const explorerStrength = document.querySelector("#explorerStrength");
const explorerSearchResults = document.querySelector("#explorerSearchResults");
const explorerProfile = document.querySelector("#explorerProfile");
const explorerCounterResults = document.querySelector("#explorerCounterResults");

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

function calculateScores(team) {
  const base = Object.fromEntries(scoreKeys.map(([key]) => [key, 0]));
  if (!team.length) return base;

  team.forEach((champion) => {
    scoreKeys.forEach(([key]) => {
      base[key] += champion.scores[key] || 0;
    });
  });

  scoreKeys.forEach(([key]) => {
    base[key] = Math.round((base[key] / (team.length * 5)) * 100);
  });

  return base;
}

function getTeamDamageMix(team) {
  const counts = { Physical: 0, Magic: 0, Mixed: 0, Utility: 0 };
  team.forEach((champion) => {
    counts[getDamageType(champion)] += 1;
  });
  return counts;
}

function countTeamTag(team, tags) {
  return team.filter((champion) => tags.some((tag) => champion.tags.includes(tag))).length;
}

function getDraftWarnings(team) {
  if (!team.length) return [];

  const scores = calculateScores(team);
  const damageMix = getTeamDamageMix(team);
  const warnings = [];
  const addWarning = (id, severity, title, message, fix, needs = []) => {
    warnings.push({ id, severity, title, message, fix, needs });
  };

  if (team.length < 5) {
    addWarning(
      "open-slots",
      "info",
      `${5 - team.length} role${team.length === 4 ? "" : "s"} still open`,
      "The read will become more reliable as the team fills out.",
      "Use the recommendations above to cover the weakest team score.",
      []
    );
  }

  if (team.length >= 3 && scores.frontline < 32) {
    addWarning(
      "frontline",
      "high",
      "No durable front line",
      "Your carries may have nobody who can safely walk into vision or absorb the first enemy cooldowns.",
      "Add a tank or durable fighter with strong frontline value.",
      ["frontline"]
    );
  }

  if (team.length >= 3 && scores.engage < 28 && scores.pick < 30 && scores.poke < 34) {
    addWarning(
      "start-fights",
      "high",
      "No clear way to start",
      "The team may hesitate around objectives because it lacks engage, catch, and meaningful ranged pressure.",
      "Add reliable engage, a strong pick tool, or long-range poke.",
      ["engage", "pick", "poke"]
    );
  }

  if (team.length >= 3 && damageMix.Physical >= team.length - damageMix.Utility && damageMix.Magic === 0 && damageMix.Mixed === 0) {
    addWarning(
      "physical-heavy",
      "medium",
      "All physical damage",
      "Enemy frontliners can buy armor efficiently and become difficult for the whole team to kill.",
      "Add a magic-damage champion in one of the remaining roles.",
      ["magic"]
    );
  }

  if (team.length >= 3 && damageMix.Magic >= team.length - damageMix.Utility && damageMix.Physical === 0 && damageMix.Mixed === 0) {
    addWarning(
      "magic-heavy",
      "medium",
      "All magic damage",
      "Enemy frontliners can stack magic resistance without giving up much value.",
      "Add a physical or mixed-damage champion.",
      ["physical"]
    );
  }

  const waveClearCount = countTeamTag(team, ["aoe", "poke", "siege", "marksman"]);
  if (team.length >= 4 && waveClearCount < 2 && scores.damage < 48) {
    addWarning(
      "wave-clear",
      "medium",
      "Weak wave clear",
      "Defending towers and moving first from lane may be difficult when several minion waves arrive.",
      "Add an AoE mage, marksman, or safe ranged wave-clear pick.",
      ["poke", "damage"]
    );
  }

  const carryCount = countTeamTag(team, ["marksman", "scaling"]);
  if (team.length >= 3 && carryCount >= 1 && scores.peel < 28) {
    addWarning(
      "peel",
      "medium",
      "Backline is exposed",
      "Your main damage dealers may struggle when assassins or divers reach them.",
      "Add peel, shields, disengage, or defensive crowd control.",
      ["peel"]
    );
  }

  const earlyCount = countTeamTag(team, ["early", "snowball"]);
  const scalingCount = countTeamTag(team, ["scaling"]);
  if (team.length >= 4 && scalingCount >= 3 && earlyCount === 0) {
    addWarning(
      "slow-start",
      "medium",
      "Very slow early game",
      "Multiple lanes may need time and items, leaving early objectives difficult to contest.",
      "Add one stable early-pressure champion or avoid early coin-flip fights.",
      ["early", "pick"]
    );
  }

  if (team.length === 5 && scores.scaling < 30) {
    addWarning(
      "late-game",
      "low",
      "Limited late-game insurance",
      "If the early lead stalls, the enemy may outscale your damage or teamfight tools.",
      "Play proactively around early objectives and convert picks into towers.",
      ["scaling"]
    );
  }

  const shortRangeCount = countTeamTag(team, ["low-range", "duel", "frontline"]);
  if (team.length >= 4 && shortRangeCount >= 4 && scores.poke < 25) {
    addWarning(
      "short-range",
      "low",
      "Very short range",
      "Long-range teams can chip you down before your engage reaches them.",
      "Add range, flank from fog of war, or secure vision before walking forward.",
      ["poke", "range"]
    );
  }

  return warnings;
}

function getWarningSuggestions(warning, team) {
  const openRoles = roles.filter((role) => !roleState[role]);
  if (!openRoles.length || !warning.needs.length) return [];

  return champions
    .filter((champion) => !team.some((picked) => picked.name === champion.name))
    .flatMap((champion) => openRoles
      .filter((role) => champion.roles.includes(role)
        || (allowOffRolePicks?.checked && getRoleFit(champion, role).score >= 0.3))
      .map((role) => ({ champion, role })))
    .map(({ champion, role }) => {
      let score = getDifficulty(champion) === "Beginner" ? 5 : 0;
      warning.needs.forEach((need) => {
        if (need === "magic" && getDamageType(champion) === "Magic") score += 18;
        else if (need === "physical" && ["Physical", "Mixed"].includes(getDamageType(champion))) score += 18;
        else if (need === "range" && champion.tags.some((tag) => ["range", "poke", "marksman"].includes(tag))) score += 14;
        else score += (champion.scores[need] || 0) * 4;
        if (champion.tags.includes(need)) score += 8;
      });
      score += scoreRecommendation(champion, team, role, recommendGoal?.value || "balanced").score * 0.18;
      score += getRoleFit(champion, role).score * 8;
      return { champion, role, score };
    })
    .sort((a, b) => b.score - a.score || a.champion.name.localeCompare(b.champion.name))
    .slice(0, 3);
}

function renderDraftWarnings() {
  const team = selectedChampions();
  const warnings = getDraftWarnings(team);

  if (!team.length) {
    warningCount.textContent = "Waiting";
    draftWarnings.innerHTML = `<p class="empty-state">Warnings will appear once the draft has enough picks to reveal a pattern.</p>`;
    return;
  }

  const risks = warnings.filter((warning) => warning.severity !== "info");
  warningCount.textContent = risks.length ? `${risks.length} risk${risks.length === 1 ? "" : "s"}` : "Healthy";

  if (!warnings.length) {
    draftWarnings.innerHTML = `
      <article class="warning-item warning-item--good">
        <span class="warning-icon">OK</span>
        <div><h3>Core needs are covered</h3><p>The team has a workable mix of damage, durability, initiation, and protection.</p></div>
      </article>
    `;
    return;
  }

  draftWarnings.innerHTML = warnings.map((warning) => {
    const suggestions = getWarningSuggestions(warning, team);
    return `
      <article class="warning-item warning-item--${escapeHtml(warning.severity)}">
        <span class="warning-icon">${warning.severity === "high" ? "!" : warning.severity === "medium" ? "?" : "i"}</span>
        <div class="warning-item__body">
          <h3>${escapeHtml(warning.title)}</h3>
          <p>${escapeHtml(warning.message)}</p>
          <strong>Fix: ${escapeHtml(warning.fix)}</strong>
          ${
            suggestions.length
              ? `<div class="warning-suggestions">${suggestions.map((item) => `<button type="button" data-warning-pick="${escapeHtml(item.champion.name)}" data-role="${escapeHtml(item.role)}">${escapeHtml(item.champion.name)} <small>${escapeHtml(item.role)}</small></button>`).join("")}</div>`
              : ""
          }
        </div>
      </article>
    `;
  }).join("");
}

function getRecommendationGoalProfile(goalId) {
  return recommendationGoals[goalId] || recommendationGoals.balanced;
}

function getWarningWeight(warning) {
  if (warning.severity === "high") return 14;
  if (warning.severity === "medium") return 8;
  if (warning.severity === "low") return 4;
  return 0;
}

function scoreRecommendation(candidate, team, role, goalId = "balanced") {
  const currentScores = calculateScores(team);
  const nextTeam = [...team, candidate];
  const nextScores = calculateScores(nextTeam);
  const goal = getRecommendationGoalProfile(goalId);
  const roleFit = getRoleFit(candidate, role);
  let score = 34;
  const reasons = [];
  const needs = scoreKeys
    .map(([key, label]) => ({ key, label, value: currentScores[key] }))
    .sort((a, b) => a.value - b.value);

  needs.slice(0, 3).forEach((need, index) => {
    const contribution = candidate.scores[need.key] || 0;
    const needWeight = 1 + Math.max(0, 45 - need.value) / 45;
    score += contribution * (3.5 - index * 0.75) * needWeight * (goal.weights[need.key] || 1) * 0.45;
    if (contribution >= 4) reasons.push(`Adds strong ${need.label.toLowerCase()} where the team is currently light.`);
  });

  let compatibilityScore = 0;
  team.forEach((teammate) => {
    const compatibility = getPairCompatibility(candidate, teammate);
    compatibilityScore += compatibility.score;
    reasons.push(...compatibility.reasons);
  });
  if (compatibilityScore) {
    score += Math.min(24, compatibilityScore);
  }

  const mix = getTeamDamageMix(team);
  const candidateDamage = getDamageType(candidate);
  if (candidateDamage === "Magic" && mix.Magic === 0 && (mix.Physical + mix.Mixed) >= 2) {
    score += 12;
    reasons.push("Balances a physical-heavy damage profile.");
  }
  if (candidateDamage === "Physical" && mix.Physical === 0 && mix.Magic >= 2) {
    score += 12;
    reasons.push("Adds physical damage so armor and magic resist choices are harder.");
  }

  const currentWarnings = getDraftWarnings(team).filter((warning) => warning.severity !== "info");
  const nextWarningIds = new Set(getDraftWarnings(nextTeam).map((warning) => warning.id));
  const fixedWarnings = currentWarnings.filter((warning) => !nextWarningIds.has(warning.id));
  if (fixedWarnings.length) {
    score += fixedWarnings.reduce((total, warning) => total + getWarningWeight(warning), 0);
    reasons.unshift(`Fixes ${fixedWarnings[0].title.toLowerCase()}.`);
  }

  const goalMatches = goal.tags.filter((tag) => getChampionCombatTraits(candidate).has(tag));
  if (goalMatches.length) {
    score += Math.min(16, goalMatches.length * 4);
    reasons.push(`Fits the ${goal.label.toLowerCase()} goal through ${goalMatches.slice(0, 2).join(" and ")}.`);
  }

  const scoreImprovement = scoreKeys.reduce((total, [key]) => {
    const weightedDelta = Math.max(0, nextScores[key] - currentScores[key]) * (goal.weights[key] || 1);
    return total + weightedDelta;
  }, 0);
  score += Math.min(12, scoreImprovement * 0.22);

  ["marksman", "assassin", "scaling", "frontline"].forEach((tag) => {
    if (candidate.tags.includes(tag) && countTeamTag(team, [tag]) >= 2) score -= 6;
  });

  if (getDifficulty(candidate) === "Beginner") {
    score += 4;
    reasons.push("Beginner-friendly execution.");
  }

  if (roleFit.offRole) {
    score -= Math.round((1 - roleFit.score) * 24);
    reasons.push(`${roleFit.label} for ${role}; use it for the kit fit, not conventional lane comfort.`);
  } else {
    score += candidate.roles[0] === role ? 7 : 4;
  }

  let category = goal.label;
  if (fixedWarnings.length) category = "Fixes draft";
  else if (compatibilityScore >= 14) category = "Best synergy";
  else if (roleFit.offRole) category = "Off-role option";
  else if (getDifficulty(candidate) === "Beginner") category = "Easy execution";

  return {
    candidate,
    role,
    score: Math.max(1, Math.min(99, Math.round(score))),
    reasons: uniqueList(reasons).slice(0, 3),
    roleFit,
    category,
    fixedWarnings: fixedWarnings.map((warning) => warning.id)
  };
}

function getRecommendationRole() {
  const requested = recommendRole?.value;
  return requested || roles.find((role) => !roleState[role]) || "Top";
}

function getRecommendationsForTeam(team, role, excludedNames = new Set(), options = {}) {
  const includeOffRole = Boolean(options.includeOffRole);
  const goalId = options.goalId || "balanced";
  const limit = options.limit || 4;
  return champions
    .filter((champion) => {
      const roleFit = getRoleFit(champion, role);
      return (champion.roles.includes(role) || (includeOffRole && roleFit.score >= 0.3))
        && !team.some((picked) => picked.name === champion.name)
        && !excludedNames.has(champion.name);
    })
    .map((champion) => scoreRecommendation(champion, team, role, goalId))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    .slice(0, limit);
}

function renderRecommendations() {
  if (!recommendRole) return;

  const previous = recommendRole.value;
  recommendRole.innerHTML = optionList(roles, previous || roles.find((role) => !roleState[role]) || "Top");
  const role = getRecommendationRole();
  recommendRole.value = role;
  const team = selectedChampions();
  const goalId = recommendGoal?.value || "balanced";
  const limit = Number.parseInt(recommendCount?.value || "8", 10);
  const picks = getRecommendationsForTeam(team, role, new Set(), {
    includeOffRole: Boolean(allowOffRolePicks?.checked),
    goalId,
    limit
  });

  recommendations.innerHTML = picks
    .map((result) => `
      <article class="recommendation-card">
        <div class="recommendation-card__top">
          ${getChampionIconMarkup(result.candidate, "small")}
          <div>
            <h3>${escapeHtml(result.candidate.name)}</h3>
            <span>${escapeHtml(result.category)} &middot; ${escapeHtml(result.role)} &middot; ${escapeHtml(getDifficulty(result.candidate))}</span>
          </div>
          <strong>${result.score}</strong>
        </div>
        ${result.roleFit.offRole ? `<span class="off-role-note">${escapeHtml(result.roleFit.label)}</span>` : ""}
        <p>${escapeHtml(result.reasons.join(" ") || result.candidate.beginner)}</p>
        <div class="recommendation-card__actions">
          <button class="text-button" type="button" data-recommend="${escapeHtml(result.candidate.name)}" data-role="${escapeHtml(result.role)}">Add pick</button>
          <button class="icon-button icon-button--small" type="button" data-details="${escapeHtml(result.candidate.name)}" aria-label="View ${escapeHtml(result.candidate.name)} details">i</button>
        </div>
      </article>
    `)
    .join("");
}

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

function findPairSynergies(team) {
  const names = new Set(team.map((champion) => champion.name));
  return pairSynergies
    .filter(([a, b]) => names.has(a) && names.has(b))
    .map(([, , reason]) => reason);
}

function getCompIdentity(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0]?.[0] || "engage";

  const labels = {
    engage: "Hard engage",
    frontline: "Front-to-back",
    damage: "Carry damage",
    pick: "Pick comp",
    poke: "Poke and siege",
    peel: "Protect the carry",
    scaling: "Scaling"
  };

  return labels[top];
}

function getCompArchetypes(scores) {
  const labels = {
    engage: "Teamfight",
    frontline: "Front-to-back",
    damage: "Carry-focused",
    pick: "Pick",
    poke: "Poke",
    peel: "Protect",
    scaling: "Scaling"
  };

  return Object.entries(scores)
    .filter(([, value]) => value >= 48)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => labels[key]);
}

function renderScores() {
  const team = selectedChampions();
  const scores = calculateScores(team);

  scoreBars.innerHTML = scoreKeys
    .map(([key, label]) => {
      const value = scores[key];
      return `
        <div class="score-row">
          <div class="score-row__label"><span>${label}</span><span>${value}%</span></div>
          <div class="score-track"><div class="score-fill" style="width: ${value}%"></div></div>
        </div>
      `;
    })
    .join("");

  const average = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / scoreKeys.length);
  const completeBonus = team.length === 5 ? 12 : 0;
  const synergyBonus = findPairSynergies(team).length * 5;
  const rating = Math.min(100, average + completeBonus + synergyBonus);

  teamRating.textContent =
    rating >= 72 ? "Coherent" : rating >= 52 ? "Playable" : team.length ? "Needs shape" : "Starter";
}

function renderGamePlan() {
  const team = selectedChampions();
  if (!team.length) {
    gamePlan.innerHTML = `
      <p class="empty-state">Start by picking a champion for any role. The app will translate the draft into a simple team identity.</p>
    `;
    return;
  }

  const scores = calculateScores(team);
  const identity = getCompIdentity(scores);
  const archetypes = getCompArchetypes(scores);
  const synergies = findPairSynergies(team);
  const damageMix = getTeamDamageMix(team);
  const missing = [];

  if (scores.frontline < 35) missing.push("a durable frontliner");
  if (scores.damage < 35) missing.push("reliable damage");
  if (scores.engage < 30 && scores.pick < 30 && scores.poke < 30) missing.push("a clear way to start fights");
  if (scores.peel < 30 && team.some((champion) => champion.tags.includes("marksman") || champion.tags.includes("scaling"))) {
    missing.push("more protection for your carry");
  }

  const topAdvice = {
    "Hard engage": "Group first, start decisively, and make sure damage dealers are close enough to follow.",
    "Front-to-back": "Let tanks stand first, hit the nearest safe target, and avoid chasing past your carries.",
    "Carry damage": "Protect your damage source until the enemy burns their engage tools.",
    "Pick comp": "Use vision pockets and crowd control to catch one target before objectives.",
    "Poke and siege": "Chip enemies before committing. You want objectives after the enemy team is already low.",
    "Protect the carry": "Play around one main damage dealer and spend crowd control defensively.",
    Scaling: "Avoid forced early coin-flips and look for clean fights after items."
  };

  gamePlan.innerHTML = `
    <div class="archetype-row">
      ${(archetypes.length ? archetypes : [identity]).map((item) => `<span class="archetype-chip">${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="callout"><strong>${identity}:</strong> ${topAdvice[identity]}</div>
    <div class="callout"><strong>Damage mix:</strong> ${damageMix.Physical} physical, ${damageMix.Magic} magic, ${damageMix.Mixed} mixed, and ${damageMix.Utility} utility picks.</div>
    ${
      synergies.length
        ? synergies.map((reason) => `<div class="callout"><strong>Combo:</strong> ${reason}</div>`).join("")
        : `<div class="callout"><strong>Synergy:</strong> Add champions with overlapping tags to unlock clearer combos.</div>`
    }
    ${
      missing.length
        ? `<div class="callout"><strong>Watch out:</strong> This draft may need ${missing.join(", ")}.</div>`
        : `<div class="callout"><strong>Draft check:</strong> The basics are covered: start fights, survive contact, and deal damage.</div>`
    }
  `;
}

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
  const enemyTraits = getChampionCombatTraits(enemy);
  const candidateTraits = getChampionCombatTraits(candidate);
  const enemyWeaknesses = new Set(enemy.weakInto);
  const roleFit = getRoleFit(candidate, role);
  let evidence = 0;

  candidate.goodInto.forEach((trait) => {
    if (enemyTraits.has(trait)) {
      score += 10;
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

  if ((candidateTraits.has("peel") || candidateTraits.has("anti-dive"))
    && ["dive", "assassin", "burst"].some((tag) => enemyTraits.has(tag))) {
    score += 9;
    evidence += 1;
    reasons.push("Peel lowers the value of enemy dive or burst.");
  }

  if ((candidateTraits.has("poke") || candidateTraits.has("range"))
    && (enemyTraits.has("low-range") || enemyTraits.has("immobile"))) {
    score += 9;
    evidence += 1;
    reasons.push("Range can punish low-range champions before they start fights.");
  }

  if (candidateTraits.has("lockdown") && (enemyTraits.has("mobility") || enemyTraits.has("assassin"))) {
    score += 8;
    evidence += 1;
    reasons.push(`Reliable control can stop ${enemy.name} after their first movement commitment.`);
  }

  if (candidateTraits.has("sustain") && enemyTraits.has("poke")) {
    score += 7;
    evidence += 1;
    reasons.push("Sustain reduces the value of repeated poke trades.");
  }

  if ((candidateTraits.has("early") || candidateTraits.has("duel")) && enemyTraits.has("scaling")) {
    score += 8;
    evidence += 1;
    reasons.push(`${candidate.name} can force pressure before ${enemy.name}'s scaling plan is ready.`);
  }

  if ((candidateTraits.has("tank") || candidateTraits.has("frontline"))
    && (enemyTraits.has("burst") || enemyTraits.has("assassin"))) {
    score += 6;
    evidence += 1;
    reasons.push(`${candidate.name} is difficult for ${enemy.name} to remove in one burst window.`);
  }

  if (candidateTraits.has("hard-engage") && (enemyTraits.has("immobile") || enemyTraits.has("squishy"))) {
    score += 7;
    evidence += 1;
    reasons.push(`${enemy.name} has limited room for error against reliable engage.`);
  }

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
    tier: getMatchupDifficulty(finalScore, evidence, Boolean(override))
  };
}

function getMatchupDifficulty(score, evidence = 0, hasOverride = false) {
  if (hasOverride || (score >= 84 && evidence >= 2)) return { key: "hard", label: "Hard counter", className: "is-hard" };
  if (score >= 72 && evidence >= 2) return { key: "strong", label: "Strong counter", className: "is-favorable" };
  if (score >= 60) return { key: "favorable", label: "Favorable", className: "is-edge" };
  if (score >= 46) return { key: "even", label: "Even", className: "is-even" };
  return { key: "difficult", label: "Difficult", className: "is-difficult" };
}

function getMatchupAdvice(enemy, candidate) {
  const tips = [];
  const enemyTraits = getChampionCombatTraits(enemy);
  const candidateTraits = getChampionCombatTraits(candidate);

  if ((candidateTraits.has("poke") || candidateTraits.has("range")) && enemyTraits.has("low-range")) {
    tips.push(`Keep ${enemy.name} at the edge of your range and avoid giving them a clean all-in.`);
  }
  if (["engage", "burst", "assassin"].some((tag) => enemyTraits.has(tag))) {
    tips.push(`Track ${enemy.name}'s main engage cooldown; trade more confidently while it is unavailable.`);
  }
  if (candidateTraits.has("scaling") && ["early", "snowball"].some((tag) => enemyTraits.has(tag))) {
    tips.push("A quiet lane is a win. Give up risky farm rather than feeding their early snowball.");
  }
  if (candidateTraits.has("sustain")) {
    tips.push("Take short trades, recover, and repeat instead of committing to one long fight.");
  }
  if (candidateTraits.has("pick") || candidateTraits.has("lockdown")) {
    tips.push("Hold crowd control until the enemy uses their movement tool or walks away from the wave.");
  }

  return uniqueList(tips).slice(0, 2);
}

function populateExplorerControls() {
  const currentRole = explorerRole.value || "All";
  explorerRole.innerHTML = optionList(["All", ...roles], currentRole);

  const strengthOptions = [
    ["hard", "Hard counters"],
    ["favored", "All favorable"],
    ["all", "All matchups"]
  ];
  const currentStrength = explorerStrength.value || "hard";
  explorerStrength.innerHTML = strengthOptions
    .map(([value, label]) => `<option value="${value}" ${value === currentStrength ? "selected" : ""}>${label}</option>`)
    .join("");
}

function getExplorerTier(score) {
  if (score >= 84) return { key: "hard", label: "Hard counter", className: "is-hard" };
  if (score >= 66) return { key: "favored", label: "Favored", className: "is-favored" };
  if (score >= 55) return { key: "edge", label: "Slight edge", className: "is-edge" };
  if (score >= 43) return { key: "even", label: "Even", className: "is-even" };
  return { key: "unfavorable", label: "Unfavorable", className: "is-unfavorable" };
}

function scoreChampionIntoOpponent(champion, opponent) {
  let score = 50;
  const reasons = [];
  let positiveMatches = 0;
  let negativeMatches = 0;

  champion.goodInto.forEach((trait) => {
    if (opponent.tags.includes(trait)) {
      score += 8;
      positiveMatches += 1;
      reasons.push(`${champion.name} naturally performs well into ${trait.replaceAll("-", " ")} champions like ${opponent.name}.`);
    } else if (opponent.weakInto.includes(trait)) {
      score += 5;
      positiveMatches += 1;
      reasons.push(`${opponent.name} tends to struggle with ${trait.replaceAll("-", " ")} pressure.`);
    }
  });

  champion.tags.forEach((trait) => {
    if (opponent.weakInto.includes(trait)) {
      score += 6;
      positiveMatches += 1;
      reasons.push(`${champion.name}'s ${trait.replaceAll("-", " ")} tools attack a known weakness in ${opponent.name}'s pattern.`);
    }
  });

  opponent.goodInto.forEach((trait) => {
    if (champion.tags.includes(trait)) {
      score -= 6;
      negativeMatches += 1;
    }
  });

  if (positiveMatches > 3) score -= (positiveMatches - 3) * 3;
  if (negativeMatches > 2) score += (negativeMatches - 2) * 2;

  if (champion.tags.includes("early") && opponent.tags.includes("scaling")) {
    score += 7;
    reasons.push(`${champion.name} can pressure ${opponent.name} before their scaling plan is ready.`);
  }
  if (champion.tags.includes("duel") && opponent.tags.some((tag) => ["assassin", "scaling", "low-range"].includes(tag))) {
    score += 5;
    reasons.push(`${champion.name} is comfortable forcing direct skirmishes against this pattern.`);
  }
  if (champion.tags.includes("engage") && opponent.tags.includes("immobile")) {
    score += 6;
    reasons.push(`${opponent.name} has limited ways to avoid ${champion.name}'s engage.`);
  }
  if (champion.tags.includes("peel") && opponent.tags.some((tag) => ["dive", "assassin", "burst"].includes(tag))) {
    score += 6;
    reasons.push(`${champion.name}'s defensive tools reduce ${opponent.name}'s main way of reaching carries.`);
  }
  if (champion.tags.includes("poke") && opponent.tags.includes("low-range")) {
    score += 6;
    reasons.push(`${champion.name} can apply pressure before ${opponent.name} reaches effective range.`);
  }

  const override = explorerCounterOverrides[champion.name]?.[opponent.name];
  if (override) {
    score += override.bonus;
    reasons.unshift(override.reason);
  }

  const sharesRole = champion.roles.some((role) => opponent.roles.includes(role));
  if (!sharesRole) {
    score = Math.min(score, 75);
  }

  const finalScore = Math.max(5, Math.min(95, Math.round(score)));
  if (!reasons.length) {
    const strongest = scoreKeys
      .map(([key, label]) => ({ label, value: champion.scores[key] || 0 }))
      .sort((a, b) => b.value - a.value)[0]?.label.toLowerCase();
    reasons.push(`${champion.name}'s ${strongest || "core"} strengths give it a workable general plan into ${opponent.name}.`);
  }

  return {
    opponent,
    score: finalScore,
    tier: getExplorerTier(finalScore),
    reasons: uniqueList(reasons).slice(0, 3)
  };
}

function getRankedExplorerMatchups(champion, role = "All") {
  const results = champions
    .filter((opponent) => opponent.name !== champion.name)
    .filter((opponent) => role === "All" || opponent.roles.includes(role))
    .map((opponent) => scoreChampionIntoOpponent(champion, opponent))
    .sort((a, b) => b.score - a.score || a.opponent.name.localeCompare(b.opponent.name));

  const eligible = results.filter((result) =>
    champion.roles.some((championRole) => result.opponent.roles.includes(championRole))
  );
  const hardSlots = Math.min(8, Math.max(2, Math.ceil(eligible.length * 0.12)));
  const hardNames = new Set(
    eligible
      .filter((result) => result.score >= 54)
      .slice(0, hardSlots)
      .map((result) => result.opponent.name)
  );

  return results.map((result) => ({
    ...result,
    tier: hardNames.has(result.opponent.name)
      ? { key: "hard", label: "Hard counter", className: "is-hard" }
      : getExplorerTier(result.score)
  }));
}

function getExplorerMatchups(champion) {
  const role = explorerRole.value || "All";
  const strength = explorerStrength.value || "hard";

  return getRankedExplorerMatchups(champion, role)
    .filter((result) => {
      if (strength === "hard") return result.tier.key === "hard";
      if (strength === "favored") return result.score >= 55;
      return true;
    });
}

function getExplorerOpponentPlan(champion, opponent) {
  const advice = getMatchupAdvice(opponent, champion);
  if (advice.length) return advice.join(" ");
  if (champion.tags.includes("early") && opponent.tags.includes("scaling")) {
    return "Contest early space and objectives before the opponent reaches comfortable item breakpoints.";
  }
  if (champion.tags.includes("frontline") && opponent.tags.includes("burst")) {
    return "Absorb the first burst window, then continue the fight while their main cooldowns are unavailable.";
  }
  return getLanePlan(champion);
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
  const matchups = getExplorerMatchups(champion);
  const hardCount = getRankedExplorerMatchups(champion)
    .filter((result) => result.tier.key === "hard").length;

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
        <span>${hardCount} general hard counter${hardCount === 1 ? "" : "s"}</span>
        ${champion.roles.map((role) => `<button class="text-button" type="button" data-explorer-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
      </div>
    </div>

    <div class="explorer-profile-facts">
      <div><span>Power curve</span><strong>${escapeHtml(champion.profile?.powerCurve || "Most reliable in the mid game")}</strong></div>
      <div><span>Fight pattern</span><strong>${escapeHtml(champion.profile?.fightPattern || getTeamfightPlan(champion))}</strong></div>
      <div><span>Best into</span><strong>${escapeHtml(champion.goodInto.slice(0, 3).map((item) => item.replaceAll("-", " ")).join(", "))}</strong></div>
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

  const filterLabel = explorerStrength.options?.[explorerStrength.selectedIndex]?.text || "matchups";
  explorerCounterResults.innerHTML = `
    <div class="explorer-counter-heading">
      <div>
        <p class="eyebrow">Who ${escapeHtml(champion.name)} Counters</p>
        <h2>${matchups.length} ${escapeHtml(filterLabel.toLowerCase())}${explorerRole.value === "All" ? "" : ` in ${escapeHtml(explorerRole.value)}`}</h2>
      </div>
      <p>General kit and archetype analysis, not live patch win-rate data.</p>
    </div>
    ${
      matchups.length
        ? `<div class="explorer-matchup-grid">${matchups.map((result) => `
            <article class="explorer-matchup-card">
              <div class="explorer-matchup-card__heading">
                ${getChampionIconMarkup(result.opponent, "small")}
                <div><h3>${escapeHtml(result.opponent.name)}</h3><span>${escapeHtml(result.opponent.roles.join(" / "))}</span></div>
                <span class="explorer-tier ${result.tier.className}">${escapeHtml(result.tier.label)}</span>
              </div>
              <div class="explorer-advantage"><span>General advantage</span><strong>${result.score}%</strong></div>
              <p>${escapeHtml(result.reasons.join(" ") || `${champion.name}'s general game plan matches well into ${result.opponent.name}.`)}</p>
              <div class="explorer-plan"><strong>How to play it:</strong> ${escapeHtml(getExplorerOpponentPlan(champion, result.opponent))}</div>
              <button class="text-button" type="button" data-details="${escapeHtml(result.opponent.name)}">View ${escapeHtml(result.opponent.name)}</button>
            </article>
          `).join("")}</div>`
        : `<p class="empty-state">No matchups meet these filters. Try "All favorable" or another opponent role.</p>`
    }
  `;
}

function renderCounters() {
  const enemy = getChampion(enemyPick.value);
  if (!enemy) {
    matchupOverview.innerHTML = "";
    counterResults.innerHTML = `<p class="empty-state">Choose an enemy champion to see general counter-pick ideas.</p>`;
    return;
  }

  const role = allyRole.value || enemyRole.value;
  const includeOffRole = Boolean(matchupOffRole?.checked);
  const focus = counterFocus?.value || "hard";
  const limit = Number.parseInt(counterCount?.value || "6", 10);
  const ranked = champions
    .filter((champion) => champion.name !== enemy.name)
    .filter((champion) => champion.roles.includes(role) || includeOffRole)
    .map((champion) => scoreCounter(enemy, champion, role))
    .sort((a, b) => {
      const tierOrder = { hard: 4, strong: 3, favorable: 2, even: 1, difficult: 0 };
      return (tierOrder[b.tier.key] || 0) - (tierOrder[a.tier.key] || 0)
        || b.score - a.score
        || b.roleFit.score - a.roleFit.score
        || a.candidate.name.localeCompare(b.candidate.name);
    });

  let focusedCandidates = ranked;
  if (focus === "hard") {
    const counters = ranked.filter((result) => ["hard", "strong"].includes(result.tier.key));
    const favorableFallbacks = ranked.filter((result) => result.tier.key === "favorable");
    focusedCandidates = [...counters, ...favorableFallbacks];
  } else if (focus === "strong") {
    focusedCandidates = ranked.filter((result) => result.score >= 56);
  }
  const candidates = focusedCandidates.slice(0, limit);
  const hardCount = ranked.filter((result) => result.tier.key === "hard").length;
  const strongCount = ranked.filter((result) => result.tier.key === "strong").length;

  matchupOverview.innerHTML = `
    <div class="matchup-overview__enemy">
      ${getChampionIconMarkup(enemy, "small")}
      <div>
        <span>Facing ${escapeHtml(enemy.name)}</span>
        <strong>${escapeHtml(enemy.style)}</strong>
      </div>
    </div>
    <div class="matchup-overview__notes">
      <span><strong>Respect:</strong> ${escapeHtml(getChampionStrengths(enemy).slice(0, 2).join(" and ").toLowerCase())}</span>
      <span><strong>Attack:</strong> ${escapeHtml(getChampionWeaknesses(enemy).slice(0, 2).join(" and "))}</span>
      <span><strong>Counter read:</strong> ${hardCount} hard and ${strongCount} strong general answer${hardCount + strongCount === 1 ? "" : "s"} found${includeOffRole ? ", including off-role options" : ""}.</span>
    </div>
  `;

  if (!candidates.length) {
    counterResults.innerHTML = `<p class="empty-state">No reliable hard or favorable counter was found for these filters. Try enabling off-role counters or switch to "All ranked options".</p>`;
    return;
  }

  counterResults.innerHTML = candidates
    .map((result, index) => {
      const difficulty = result.tier;
      const laneAdvice = getMatchupAdvice(enemy, result.candidate);
      const reasons = result.reasons.length
        ? result.reasons.join(" ")
        : `${result.candidate.name} has the strongest available general pattern into ${enemy.name}, but execution still matters.`;

      return `
        <article class="counter-card">
          <div class="counter-card__top">
            ${getChampionIconMarkup(result.candidate, "small")}
            <div>
              <span class="counter-card__rank">${escapeHtml(difficulty.label)} ${index + 1}</span>
              <h3>${escapeHtml(result.candidate.name)}</h3>
              <small>${escapeHtml(result.candidate.roles.join(" / "))}</small>
            </div>
            <span class="difficulty-pill ${difficulty.className}">${difficulty.label}</span>
          </div>
          ${result.roleFit.offRole ? `<span class="off-role-note">${escapeHtml(result.roleFit.label)} ${escapeHtml(role)}</span>` : ""}
          <p>${escapeHtml(reasons)}</p>
          <div class="lane-tip"><strong>How to win:</strong> ${escapeHtml(laneAdvice.join(" ") || getLanePlan(result.candidate))}</div>
          <div class="meter"><span>Counter confidence</span><span>${result.score}%</span></div>
          <div class="counter-card__actions">
            <button class="text-button" type="button" data-counter-pick="${escapeHtml(result.candidate.name)}" data-role="${escapeHtml(role)}">Use in team</button>
            <button class="icon-button icon-button--small" type="button" data-details="${escapeHtml(result.candidate.name)}" aria-label="View ${escapeHtml(result.candidate.name)} details">i</button>
          </div>
        </article>
      `;
    })
    .join("");
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
  const sameRoleCounters = champions
    .filter((candidate) => candidate.name !== champion.name && candidate.roles.some((role) => champion.roles.includes(role)))
    .map((candidate) => scoreCounter(champion, candidate))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

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
      <h3>General answers</h3>
      <div class="detail-answer-row">
        ${sameRoleCounters.map((item) => `<span>${escapeHtml(item.candidate.name)} <small>${item.score}% fit</small></span>`).join("")}
      </div>
    </div>
    <div class="dialog-actions">
      ${champion.roles.map((role) => `<button class="text-button" type="button" data-dialog-pick="${escapeHtml(champion.name)}" data-role="${escapeHtml(role)}">Add as ${escapeHtml(role)}</button>`).join("")}
    </div>
  `;

  if (typeof championDialog.showModal === "function") championDialog.showModal();
  else championDialog.setAttribute("open", "");
}

const SAVED_DRAFTS_KEY = "draft-lantern-saved-teams";

function getSavedTeams() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_DRAFTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setSaveStatus(message) {
  saveStatus.textContent = message;
  window.clearTimeout(setSaveStatus.timeout);
  setSaveStatus.timeout = window.setTimeout(() => {
    saveStatus.textContent = "";
  }, 2600);
}

function refreshSavedTeams() {
  const saved = getSavedTeams();
  savedDrafts.innerHTML = saved.length
    ? saved.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("")
    : `<option value="">No saved teams</option>`;
  document.querySelector("#loadDraft").disabled = !saved.length;
  document.querySelector("#deleteDraft").disabled = !saved.length;
}

function saveCurrentTeam() {
  const team = selectedChampions();
  if (!team.length) {
    setSaveStatus("Add at least one champion first.");
    return;
  }

  const saved = getSavedTeams();
  const name = team.map((champion) => champion.name).join(" + ");
  saved.unshift({
    id: `${Date.now()}`,
    name,
    picks: { ...roleState }
  });
  localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(saved.slice(0, 20)));
  refreshSavedTeams();
  setSaveStatus("Team saved on this device.");
}

function loadSavedTeam() {
  const selected = getSavedTeams().find((item) => item.id === savedDrafts.value);
  if (!selected) return;
  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = getChampion(selected.picks[role]) ? selected.picks[role] : null;
  });
  renderAll();
  setSaveStatus("Saved team loaded.");
}

function deleteSavedTeam() {
  const saved = getSavedTeams().filter((item) => item.id !== savedDrafts.value);
  localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(saved));
  refreshSavedTeams();
  setSaveStatus("Saved team deleted.");
}

function getShareUrl() {
  const picks = Object.fromEntries(roles.map((role) => [role, roleState[role]]));
  const payload = encodeURIComponent(JSON.stringify(picks));
  return `${window.location.href.split("#")[0]}#team=${payload}`;
}

async function shareCurrentTeam() {
  if (!selectedChampions().length) {
    setSaveStatus("Add at least one champion first.");
    return;
  }

  const url = getShareUrl();
  window.location.hash = url.split("#")[1];
  try {
    await navigator.clipboard.writeText(url);
    setSaveStatus("Team link copied.");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = url;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    setSaveStatus("Team link copied.");
  }
}

function loadTeamFromHash() {
  if (!window.location.hash.startsWith("#team=")) return;
  try {
    const picks = JSON.parse(decodeURIComponent(window.location.hash.slice(6)));
    clearFavoriteCore();
    roles.forEach((role) => {
      roleState[role] = typeof picks[role] === "string" ? picks[role] : null;
    });
  } catch {
    window.location.hash = "";
  }
}

function getDraftTeam(side) {
  const state = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  return roles.map((role) => getChampion(state[role])).filter(Boolean);
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getTeamPhaseScores(team) {
  if (!team.length) return { early: 0, mid: 0, late: 0 };

  const scores = calculateScores(team);
  const earlyCount = countTeamTag(team, ["early", "snowball"]);
  const scalingCount = countTeamTag(team, ["scaling"]);
  const safeCount = countTeamTag(team, ["safe", "sustain"]);

  return {
    early: clampPercent(28 + earlyCount * 12 + safeCount * 4 + scores.pick * 0.18 + scores.engage * 0.14 - scalingCount * 3),
    mid: clampPercent(scores.engage * 0.24 + scores.pick * 0.24 + scores.damage * 0.24 + scores.frontline * 0.14 + scores.poke * 0.14),
    late: clampPercent(scores.scaling * 0.38 + scores.damage * 0.24 + scores.peel * 0.18 + scores.frontline * 0.12 + scores.poke * 0.08)
  };
}

function getPrimaryThreats(team) {
  return [...team]
    .map((champion) => ({
      champion,
      score: (champion.scores.damage || 0) * 4 + (champion.scores.pick || 0) * 2 + (champion.scores.scaling || 0) * 2 + (champion.tags.includes("marksman") ? 4 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => item.champion);
}

function getComparisonLeader(blueValue, redValue, threshold = 7) {
  const difference = blueValue - redValue;
  if (Math.abs(difference) < threshold) return "Even";
  return difference > 0 ? "Blue" : "Red";
}

function getVersusPlan(team, enemy, side) {
  if (!team.length) {
    return {
      win: "Add picks to reveal this team's win condition.",
      fight: "The fight plan will appear as the composition takes shape.",
      avoid: "No major warning yet."
    };
  }

  const scores = calculateScores(team);
  const enemyScores = calculateScores(enemy);
  const identity = getCompIdentity(scores);
  const plans = {
    "Hard engage": "Group with your damage dealers, find a flank or grouped target, and start before the enemy can spread out.",
    "Front-to-back": "Keep the formation compact: frontline first, carries behind, and hit the nearest safe target.",
    "Carry damage": "Buy time for the main damage dealer and avoid splitting the fight across multiple targets.",
    "Pick comp": "Control fog of war and turn one catch into an objective before the enemy can regroup.",
    "Poke and siege": "Arrive first, chip health bars, and only commit after the enemy is too low to contest.",
    "Protect the carry": "Hold crowd control defensively and force the enemy to cross your frontline to reach the carry.",
    Scaling: "Reduce early risk, trade objectives when necessary, and fight after key item breakpoints."
  };

  let avoid = "Avoid chasing beyond your vision after the first target falls.";
  if (enemyScores.engage >= 58) avoid = "Do not group tightly in narrow entrances where the enemy can land a multi-person engage.";
  else if (enemyScores.pick >= 58) avoid = "Do not move through unwarded jungle alone; the enemy is strongest when someone is isolated.";
  else if (enemyScores.poke >= 58) avoid = "Do not arrive late to objectives and walk through repeated ranged damage.";
  else if (enemyScores.scaling >= 62) avoid = "Do not let a winning early game drift into low-value farming; convert leads into towers and objectives.";

  const threats = getPrimaryThreats(enemy).map((champion) => champion.name);
  const threatText = threats.length ? `Track ${threats.join(" and ")} before committing.` : "Track the enemy's main damage cooldowns.";

  return {
    win: `${plans[identity]} ${threatText}`,
    fight: scores.engage >= scores.peel
      ? `${side} should call one clear target and make sure follow-up damage is close before engaging.`
      : `${side} should let the enemy enter first, protect the backline, and counter-engage after key cooldowns are used.`,
    avoid
  };
}

function getLaneComparisons() {
  return roles.map((role) => {
    const blueChampion = getChampion(draftRoomState.blue[role]);
    const redChampion = getChampion(draftRoomState.red[role]);
    if (!blueChampion || !redChampion) {
      return { role, blueChampion, redChampion, leader: "Pending", note: "Both picks are needed." };
    }

    const blueFit = scoreCounter(redChampion, blueChampion).score;
    const redFit = scoreCounter(blueChampion, redChampion).score;
    const leader = getComparisonLeader(blueFit, redFit, 8);
    const note = leader === "Even"
      ? "Broadly even; execution and jungle attention matter more."
      : `${leader} has the cleaner general matchup pattern.`;
    return { role, blueChampion, redChampion, leader, note };
  });
}

function getObjectivePlans(blueTeam, redTeam) {
  const blueScores = calculateScores(blueTeam);
  const redScores = calculateScores(redTeam);
  const bluePhases = getTeamPhaseScores(blueTeam);
  const redPhases = getTeamPhaseScores(redTeam);
  const objectives = [
    {
      name: "Early dragons",
      blue: bluePhases.early + blueScores.engage * 0.25,
      red: redPhases.early + redScores.engage * 0.25,
      even: "Set vision first and avoid starting while lanes are missing.",
      leader: "Use earlier lane pressure to enter the river first and force the other team to face-check."
    },
    {
      name: "Baron setup",
      blue: blueScores.damage * 0.35 + blueScores.frontline * 0.3 + blueScores.pick * 0.2 + blueScores.scaling * 0.15,
      red: redScores.damage * 0.35 + redScores.frontline * 0.3 + redScores.pick * 0.2 + redScores.scaling * 0.15,
      even: "Clear vision in layers and do not start Baron without knowing where the main enemy threat is.",
      leader: "Threaten Baron to pull the enemy into poor vision, then turn onto the first isolated target."
    },
    {
      name: "Tower siege",
      blue: blueScores.poke * 0.45 + blueScores.damage * 0.35 + blueScores.peel * 0.2,
      red: redScores.poke * 0.45 + redScores.damage * 0.35 + redScores.peel * 0.2,
      even: "Push side waves before grouping so the siege creates map pressure.",
      leader: "Use the range advantage to damage the tower or defenders without forcing a full dive."
    },
    {
      name: "Jungle fights",
      blue: blueScores.engage * 0.4 + blueScores.pick * 0.35 + blueScores.frontline * 0.25,
      red: redScores.engage * 0.4 + redScores.pick * 0.35 + redScores.frontline * 0.25,
      even: "The first team to establish vision and formation will have the practical advantage.",
      leader: "Fight in narrow terrain where crowd control and target access are easiest to coordinate."
    }
  ];

  return objectives.map((objective) => {
    const winner = getComparisonLeader(objective.blue, objective.red, 7);
    return {
      name: objective.name,
      winner,
      advice: winner === "Even" ? objective.even : `${winner}: ${objective.leader}`
    };
  });
}

function renderComparisonMeter(label, blueValue, redValue) {
  const total = blueValue + redValue;
  const blueWidth = total ? Math.round((blueValue / total) * 100) : 50;
  const leader = getComparisonLeader(blueValue, redValue);
  return `
    <div class="comparison-meter">
      <div class="comparison-meter__label">
        <span>${blueValue}%</span>
        <strong>${escapeHtml(label)}</strong>
        <span>${redValue}%</span>
      </div>
      <div class="comparison-meter__track">
        <span class="comparison-meter__blue" style="width: ${blueWidth}%"></span>
        <span class="comparison-meter__red" style="width: ${100 - blueWidth}%"></span>
      </div>
      <small>${leader === "Even" ? "Even" : `${leader} edge`}</small>
    </div>
  `;
}

function renderDraftComparison() {
  const blueTeam = getDraftTeam("Blue");
  const redTeam = getDraftTeam("Red");
  comparisonStatus.textContent = `${blueTeam.length}/5 vs ${redTeam.length}/5`;

  if (!blueTeam.length && !redTeam.length) {
    draftComparison.innerHTML = `<p class="empty-state">Team comparison will update live as both sides make their picks.</p>`;
    return;
  }

  const blueScores = calculateScores(blueTeam);
  const redScores = calculateScores(redTeam);
  const bluePhases = getTeamPhaseScores(blueTeam);
  const redPhases = getTeamPhaseScores(redTeam);
  const bluePlan = getVersusPlan(blueTeam, redTeam, "Blue");
  const redPlan = getVersusPlan(redTeam, blueTeam, "Red");
  const blueWarnings = getDraftWarnings(blueTeam).filter((warning) => warning.severity !== "info");
  const redWarnings = getDraftWarnings(redTeam).filter((warning) => warning.severity !== "info");
  const blueThreats = getPrimaryThreats(blueTeam);
  const redThreats = getPrimaryThreats(redTeam);
  const laneComparisons = getLaneComparisons();
  const objectivePlans = getObjectivePlans(blueTeam, redTeam);

  draftComparison.innerHTML = `
    <div class="phase-grid">
      ${renderComparisonMeter("Early game", bluePhases.early, redPhases.early)}
      ${renderComparisonMeter("Mid game", bluePhases.mid, redPhases.mid)}
      ${renderComparisonMeter("Late game", bluePhases.late, redPhases.late)}
    </div>

    <div class="comparison-layout">
      <article class="team-plan team-plan--blue">
        <div class="team-plan__heading"><span>Blue plan</span><strong>${escapeHtml(blueTeam.length ? getCompIdentity(blueScores) : "Waiting")}</strong></div>
        <p><strong>Win condition:</strong> ${escapeHtml(bluePlan.win)}</p>
        <p><strong>Fight shape:</strong> ${escapeHtml(bluePlan.fight)}</p>
        <p><strong>Avoid:</strong> ${escapeHtml(bluePlan.avoid)}</p>
        <div class="threat-row"><span>Primary threats</span>${blueThreats.length ? blueThreats.map((champion) => `<strong>${escapeHtml(champion.name)}</strong>`).join("") : "<em>Waiting for picks</em>"}</div>
        <div class="risk-line">${blueWarnings.length ? `${blueWarnings.length} draft risk${blueWarnings.length === 1 ? "" : "s"}: ${escapeHtml(blueWarnings.slice(0, 2).map((warning) => warning.title).join(", "))}` : "No major draft warning."}</div>
      </article>

      <div class="trait-comparison">
        ${scoreKeys.map(([key, label]) => renderComparisonMeter(label, blueScores[key], redScores[key])).join("")}
      </div>

      <article class="team-plan team-plan--red">
        <div class="team-plan__heading"><span>Red plan</span><strong>${escapeHtml(redTeam.length ? getCompIdentity(redScores) : "Waiting")}</strong></div>
        <p><strong>Win condition:</strong> ${escapeHtml(redPlan.win)}</p>
        <p><strong>Fight shape:</strong> ${escapeHtml(redPlan.fight)}</p>
        <p><strong>Avoid:</strong> ${escapeHtml(redPlan.avoid)}</p>
        <div class="threat-row"><span>Primary threats</span>${redThreats.length ? redThreats.map((champion) => `<strong>${escapeHtml(champion.name)}</strong>`).join("") : "<em>Waiting for picks</em>"}</div>
        <div class="risk-line">${redWarnings.length ? `${redWarnings.length} draft risk${redWarnings.length === 1 ? "" : "s"}: ${escapeHtml(redWarnings.slice(0, 2).map((warning) => warning.title).join(", "))}` : "No major draft warning."}</div>
      </article>
    </div>

    <div class="comparison-detail-grid">
      <section class="lane-comparison">
        <div class="comparison-subheading"><span>Lane read</span><strong>General patterns</strong></div>
        ${laneComparisons.map((lane) => `
          <div class="lane-comparison__row">
            <span>${escapeHtml(lane.blueChampion?.name || "Open")}</span>
            <div><strong>${escapeHtml(lane.role)}: ${escapeHtml(lane.leader)}</strong><small>${escapeHtml(lane.note)}</small></div>
            <span>${escapeHtml(lane.redChampion?.name || "Open")}</span>
          </div>
        `).join("")}
      </section>

      <section class="objective-plan">
        <div class="comparison-subheading"><span>Objective planner</span><strong>Where each comp works</strong></div>
        ${objectivePlans.map((objective) => `
          <div class="objective-plan__row">
            <strong>${escapeHtml(objective.name)}</strong>
            <span class="objective-winner objective-winner--${objective.winner.toLowerCase()}">${escapeHtml(objective.winner)}</span>
            <p>${escapeHtml(objective.advice)}</p>
          </div>
        `).join("")}
      </section>
    </div>
  `;
}

function getDraftUsedNames() {
  return new Set([
    ...draftRoomState.blueBans,
    ...draftRoomState.redBans,
    ...Object.values(draftRoomState.blue),
    ...Object.values(draftRoomState.red)
  ].filter(Boolean));
}

function canDraftChampionBeBanned(champion, used) {
  const blocked = new Set([...used, champion.name]);
  return roles.every((role) => {
    const remainingSpots = Number(!draftRoomState.blue[role]) + Number(!draftRoomState.red[role]);
    const availableForRole = champions.filter((candidate) => candidate.roles.includes(role) && !blocked.has(candidate.name)).length;
    return availableForRole >= remainingSpots;
  });
}

function getDraftTurnLabel(turn) {
  if (!turn) return "Draft complete";
  if (turn.type === "ban") return `${turn.side} ban ${turn.round} of 5`;
  return `${turn.side} picks ${turn.role}`;
}

function renderDraftTeamPicks(side, container) {
  const picks = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  container.innerHTML = roles.map((role) => {
    const champion = getChampion(picks[role]);
    return `
      <article class="draft-pick-slot ${champion ? "is-filled" : ""}">
        <span>${escapeHtml(role)}</span>
        ${
          champion
            ? `<div>${getChampionIconMarkup(champion, "small")}<strong>${escapeHtml(champion.name)}</strong></div>`
            : `<p>Open</p>`
        }
      </article>
    `;
  }).join("");
}

function renderDraftBans(items, container) {
  container.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const champion = getChampion(items[index]);
    return champion
      ? `<span class="ban-pick" title="${escapeHtml(champion.name)}">${getChampionIconMarkup(champion, "small")}</span>`
      : `<span class="ban-pick is-empty">-</span>`;
  }).join("");
}

function getDraftSuggestions(turn, used) {
  if (!turn) return [];
  if (turn.type === "ban") {
    return champions
      .filter((champion) => !used.has(champion.name) && canDraftChampionBeBanned(champion, used))
      .map((champion) => ({
        candidate: champion,
        score: Object.values(champion.scores).reduce((sum, value) => sum + value, 0),
        reasons: [`Flexible threat with ${champion.style.toLowerCase()}.`]
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  const team = getDraftTeam(turn.side);
  return getRecommendationsForTeam(team, turn.role, used);
}

function renderDraftRoom() {
  const turn = draftSequence[draftRoomState.turn];
  const used = getDraftUsedNames();
  draftTurn.innerHTML = turn
    ? `<span class="turn-side turn-side--${turn.side.toLowerCase()}">${escapeHtml(turn.side)}</span><strong>${escapeHtml(getDraftTurnLabel(turn))}</strong><p>${turn.type === "ban" ? "Remove a champion you do not want either team to use." : `Choose a ${turn.role} champion that helps the current team.`}</p>`
    : `<strong>Draft complete</strong><p>Both teams are ready. Compare their identities before loading one into the Team Builder.</p>`;

  renderDraftBans(draftRoomState.blueBans, blueBans);
  renderDraftBans(draftRoomState.redBans, redBans);
  renderDraftTeamPicks("Blue", bluePicks);
  renderDraftTeamPicks("Red", redPicks);

  const blueTeam = getDraftTeam("Blue");
  const redTeam = getDraftTeam("Red");
  blueIdentity.textContent = blueTeam.length ? getCompIdentity(calculateScores(blueTeam)) : "Waiting";
  redIdentity.textContent = redTeam.length ? getCompIdentity(calculateScores(redTeam)) : "Waiting";
  renderDraftComparison();

  const suggestions = getDraftSuggestions(turn, used);
  draftSuggestions.innerHTML = suggestions.length
    ? `<span>Smart ideas:</span>${suggestions.map((item) => `<button type="button" data-draft-champion="${escapeHtml(item.candidate.name)}">${escapeHtml(item.candidate.name)}</button>`).join("")}`
    : "";

  if (!turn) {
    draftChampionGrid.innerHTML = `
      <button class="draft-finish-button draft-finish-button--blue" type="button" data-load-side="Blue">Load Blue into builder</button>
      <button class="draft-finish-button draft-finish-button--red" type="button" data-load-side="Red">Load Red into builder</button>
    `;
    return;
  }

  const query = draftSearch.value.trim().toLowerCase();
  const available = champions
    .filter((champion) => !used.has(champion.name))
    .filter((champion) => turn.type !== "ban" || canDraftChampionBeBanned(champion, used))
    .filter((champion) => turn.type === "ban" || champion.roles.includes(turn.role))
    .filter((champion) => !query || championMatchesQuery(champion, query))
    .slice(0, 80);

  draftChampionGrid.innerHTML = available.map((champion) => `
    <button class="draft-champion-button" type="button" data-draft-champion="${escapeHtml(champion.name)}">
      ${getChampionIconMarkup(champion, "small")}
      <span>${escapeHtml(champion.name)}</span>
    </button>
  `).join("");
}

function chooseDraftChampion(name) {
  const turn = draftSequence[draftRoomState.turn];
  const champion = getChampion(name);
  if (!turn || !champion || getDraftUsedNames().has(name)) return;
  if (turn.type === "ban" && !canDraftChampionBeBanned(champion, getDraftUsedNames())) return;
  if (turn.type === "pick" && !champion.roles.includes(turn.role)) return;

  draftRoomState.history.push(JSON.stringify({
    turn: draftRoomState.turn,
    blue: draftRoomState.blue,
    red: draftRoomState.red,
    blueBans: draftRoomState.blueBans,
    redBans: draftRoomState.redBans
  }));

  if (turn.type === "ban") {
    const bans = turn.side === "Blue" ? draftRoomState.blueBans : draftRoomState.redBans;
    bans.push(name);
  } else {
    const picks = turn.side === "Blue" ? draftRoomState.blue : draftRoomState.red;
    picks[turn.role] = name;
  }

  draftRoomState.turn += 1;
  draftSearch.value = "";
  renderDraftRoom();
}

function undoDraftRoom() {
  const snapshot = draftRoomState.history.pop();
  if (!snapshot) return;
  const previous = JSON.parse(snapshot);
  draftRoomState.turn = previous.turn;
  draftRoomState.blue = previous.blue;
  draftRoomState.red = previous.red;
  draftRoomState.blueBans = previous.blueBans;
  draftRoomState.redBans = previous.redBans;
  renderDraftRoom();
}

function resetDraftRoom() {
  draftRoomState.turn = 0;
  draftRoomState.blue = Object.fromEntries(roles.map((role) => [role, null]));
  draftRoomState.red = Object.fromEntries(roles.map((role) => [role, null]));
  draftRoomState.blueBans = [];
  draftRoomState.redBans = [];
  draftRoomState.history = [];
  draftSearch.value = "";
  renderDraftRoom();
}

function loadDraftSide(side) {
  const source = side === "Blue" ? draftRoomState.blue : draftRoomState.red;
  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = source[role];
  });
  switchView("builderView");
  renderAll();
}

function switchView(viewId) {
  document.querySelectorAll(".app-view").forEach((view) => view.classList.toggle("is-hidden", view.id !== viewId));
  document.querySelectorAll(".view-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  if (viewId === "draftRoomView") renderDraftRoom();
  if (viewId === "premadeView") renderPremadeComps();
  if (viewId === "championExplorerView") renderChampionExplorer();
  window.scrollTo({ top: document.querySelector(".view-tabs").offsetTop - 12, behavior: "smooth" });
}

function renderAll() {
  renderChampionGrid();
  renderDraftSlots();
  renderScores();
  renderGamePlan();
  renderDraftWarnings();
  renderFavoriteBuilder();
  renderRecommendations();
  renderCounters();
  renderDraftRoom();
  renderPremadeComps();
  renderChampionExplorer();
}

document.querySelectorAll(".role-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeRole = button.dataset.role;
    document.querySelectorAll(".role-tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    renderChampionGrid();
  });
});

champSearch.addEventListener("input", renderChampionGrid);

championGrid.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-champion]");
  if (pick) selectChampion(pick.dataset.champion, pick.dataset.role);
});

draftSlots.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clear]");
  if (!button) return;
  clearRole(button.dataset.clear);
});

document.querySelector("#resetDraft").addEventListener("click", resetDraft);

enemyRole.addEventListener("change", () => {
  populateEnemyPicks();
  allyRole.value = enemyRole.value;
  renderCounters();
});

enemyPick.addEventListener("change", renderCounters);
allyRole.addEventListener("change", renderCounters);
counterFocus.addEventListener("change", renderCounters);
counterCount.addEventListener("change", renderCounters);
matchupOffRole.addEventListener("change", renderCounters);

recommendRole.addEventListener("change", renderRecommendations);
recommendGoal.addEventListener("change", () => {
  renderRecommendations();
  renderDraftWarnings();
});
recommendCount.addEventListener("change", renderRecommendations);
allowOffRolePicks.addEventListener("change", renderAll);

favoriteRole.addEventListener("change", populateFavoriteControls);
document.querySelector("#addFavorite").addEventListener("click", addFavoriteChampion);
document.querySelector("#clearFavorites").addEventListener("click", () => {
  clearFavoriteCore();
  renderAll();
});
document.querySelector("#useCurrentPicks").addEventListener("click", lockCurrentPicksAsFavorites);
favoriteCore.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-favorite]");
  if (button) removeFavoriteChampion(button.dataset.removeFavorite);
});
favoriteCompSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-favorite-variant]");
  if (button) loadFavoriteVariant(button.dataset.loadFavoriteVariant);
});

recommendations.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-recommend]");
  if (pick) selectChampion(pick.dataset.recommend, pick.dataset.role);
});

draftWarnings.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-warning-pick]");
  if (pick) selectChampion(pick.dataset.warningPick, pick.dataset.role);
});

counterResults.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-counter-pick]");
  if (!pick) return;
  selectChampion(pick.dataset.counterPick, pick.dataset.role);
  switchView("builderView");
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-details]");
  if (detailButton) showChampionDetails(detailButton.dataset.details);

  const dialogPick = event.target.closest("[data-dialog-pick]");
  if (dialogPick) {
    selectChampion(dialogPick.dataset.dialogPick, dialogPick.dataset.role);
    championDialog.close();
  }
});

document.querySelector("#closeChampionDialog").addEventListener("click", () => championDialog.close());
championDialog.addEventListener("click", (event) => {
  if (event.target === championDialog) championDialog.close();
});

document.querySelectorAll(".view-tab").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

explorerSearch.addEventListener("input", renderExplorerSearchResults);
explorerSearch.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const query = explorerSearch.value.trim().toLowerCase();
  const exact = champions.find((champion) => champion.name.toLowerCase() === query);
  const firstMatch = exact || champions.find((champion) => champion.name.toLowerCase().startsWith(query));
  if (firstMatch) selectExplorerChampion(firstMatch.name);
});
explorerRole.addEventListener("change", renderChampionExplorer);
explorerStrength.addEventListener("change", renderChampionExplorer);
explorerSearchResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-explorer-champion]");
  if (button) selectExplorerChampion(button.dataset.explorerChampion);
});
explorerProfile.addEventListener("click", (event) => {
  const button = event.target.closest("[data-explorer-pick]");
  if (!button) return;
  selectChampion(button.dataset.explorerPick, button.dataset.role);
  switchView("builderView");
});

premadeFilter.addEventListener("change", renderPremadeComps);
premadeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-premade]");
  if (!button) return;
  activePremadeId = button.dataset.premade;
  renderPremadeComps();
});
premadeDetails.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-premade]");
  if (button) loadPremadeComp(button.dataset.loadPremade);
});

document.querySelector("#saveDraft").addEventListener("click", saveCurrentTeam);
document.querySelector("#shareDraft").addEventListener("click", shareCurrentTeam);
document.querySelector("#loadDraft").addEventListener("click", loadSavedTeam);
document.querySelector("#deleteDraft").addEventListener("click", deleteSavedTeam);

draftSearch.addEventListener("input", renderDraftRoom);
draftChampionGrid.addEventListener("click", (event) => {
  const championButton = event.target.closest("[data-draft-champion]");
  const loadButton = event.target.closest("[data-load-side]");
  if (championButton) chooseDraftChampion(championButton.dataset.draftChampion);
  if (loadButton) loadDraftSide(loadButton.dataset.loadSide);
});
draftSuggestions.addEventListener("click", (event) => {
  const championButton = event.target.closest("[data-draft-champion]");
  if (championButton) chooseDraftChampion(championButton.dataset.draftChampion);
});
document.querySelector("#undoDraftRoom").addEventListener("click", undoDraftRoom);
document.querySelector("#resetDraftRoom").addEventListener("click", resetDraftRoom);

hydrateBuiltInChampionProfiles();
loadTeamFromHash();
populateMatchupControls();
refreshSavedTeams();
renderAll();
loadRiotDataDragon();
