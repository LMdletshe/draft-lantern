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
