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
    name: "AoE Wombo Combo",
    category: "Teamfight",
    difficulty: "Beginner",
    tier: "Best beginner 5v5",
    summary: "Layer large area-of-effect ultimates onto one clear engage.",
    bestWhen: "Your team wants simple objective fights and the enemy has several immobile or short-range champions.",
    needs: "Ultimate cooldown tracking, grouped objective setup, and one player calling the first engage.",
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
    name: "Protect the Hypercarry",
    category: "Protect",
    difficulty: "Beginner",
    tier: "Best scaling shell",
    summary: "Build a durable shell around one scaling reset carry.",
    bestWhen: "Your ADC is comfortable carrying late fights and the enemy has dive threats that must cross your frontline.",
    needs: "Patience before two items, disciplined front-to-back spacing, and peel cooldowns saved for the real threat.",
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
    tier: "Best map pressure",
    summary: "Use global pressure and reliable crowd control to create unfair fights.",
    bestWhen: "The enemy splits side waves carelessly or your team can track flashes and punish isolated targets.",
    needs: "Vision denial, side-wave control, and everyone collapsing on the same target instead of chasing separate kills.",
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
    tier: "Best tower setup",
    summary: "Arrive first, control space, and damage enemies before they can engage.",
    bestWhen: "You have winning lanes or reliable wave priority and want to turn that tempo into towers and dragons.",
    needs: "First move to objectives, trap lines before fights start, and restraint when enemies are already losing health.",
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
    name: "Reliable Engage Core",
    category: "Beginner",
    difficulty: "Beginner",
    tier: "Best low-elo starter",
    summary: "A forgiving team with obvious buttons, durable champions, and reliable crowd control.",
    bestWhen: "Your group needs clear jobs, simple target selection, and champions that still function after small mistakes.",
    needs: "One target call, grouped follow-up, and patience to wait for key engage cooldowns.",
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
    tier: "Best standard fight",
    summary: "Two tanks hold the line while Jinx deals damage from a protected backline.",
    bestWhen: "The enemy must walk into you and your ADC can safely hit the nearest target.",
    needs: "A stable formation, flank control, and carries who resist chasing past the frontline.",
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
    tier: "Best answer to assassins",
    summary: "Invite the enemy forward, stop their dive, and win the second half of the fight.",
    bestWhen: "The enemy draft relies on assassins, divers, or one explosive engage to reach your carries.",
    needs: "Defensive cooldown discipline and enough poke/wave clear to avoid being forced into bad starts.",
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
    tier: "Best snowball pick",
    summary: "Catch one target with reliable crowd control, then let Jinx clean up the fight.",
    bestWhen: "The enemy face-checks fog, lacks cleanse tools, or has fragile carries that can be locked down.",
    needs: "Vision pockets, burst on the first target, and immediate objective conversion after the catch.",
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
  },
  {
    id: "dive-reset",
    name: "Dive and Reset",
    category: "Dive",
    difficulty: "Advanced",
    tier: "Best backline access",
    summary: "Collapse onto the enemy backline fast, then use resets and follow-up shields to keep the dive alive.",
    bestWhen: "The enemy carries are immobile, their peel is thin, or your team can coordinate one explosive flank.",
    needs: "Synchronized engage timing, flank vision, and no trickling in after the first diver commits.",
    picks: { Top: "Camille", Jungle: "Nocturne", Mid: "Galio", ADC: "Kai'Sa", Support: "Rakan" },
    pros: [
      "Threatens carries from multiple angles.",
      "Galio and Rakan add follow-up protection after the first dive.",
      "Kai'Sa can join the same target instead of playing a slow front-to-back fight."
    ],
    cons: [
      "Very punishable if engage and follow-up arrive at different times.",
      "Can struggle into heavy disengage and point-click peel.",
      "Needs flank setup rather than random mid-lane starts."
    ],
    phases: {
      early: "Stabilize lanes and track enemy flashes. Nocturne should path toward lanes with setup while Camille avoids wasting health before level-six windows.",
      mid: "Use side pressure to pull the enemy apart, then dive the exposed carry with Nocturne, Galio, Rakan, and Kai'Sa arriving together.",
      late: "Do not start through the enemy frontline. Threaten fog and side angles, force defensive cooldowns, then commit only when the backline path is real."
    },
    rule: "Dive is a timing test: first entry, follow-up crowd control, and damage must land as one play.",
    alternatives: [
      { role: "Top", from: "Camille", to: "Malphite" },
      { role: "ADC", from: "Kai'Sa", to: "Samira" }
    ]
  },
  {
    id: "one-three-one",
    name: "1-3-1 Side Pressure",
    category: "Split",
    difficulty: "Advanced",
    tier: "Best side-lane map comp",
    summary: "Win through side-lane pressure, global collapses, and forcing the enemy to answer too many lanes.",
    bestWhen: "Your side-laners win isolated lanes and the enemy team wants slow grouped fights.",
    needs: "Strong wave discipline, map awareness, and no unnecessary 5v5s while side pressure is building.",
    picks: { Top: "Fiora", Jungle: "Nocturne", Mid: "Twisted Fate", ADC: "Ezreal", Support: "Janna" },
    pros: [
      "Excellent side-lane threat with Fiora and Twisted Fate.",
      "Nocturne turns split pressure into sudden numbers advantages.",
      "Ezreal and Janna can safely hold mid while side lanes work."
    ],
    cons: [
      "Weak if the team groups mid and ignores side-wave assignments.",
      "Requires clean vision because isolated champions can be collapsed on.",
      "Objective starts are risky if side waves are not already winning."
    ],
    phases: {
      early: "Keep lanes healthy and collect safe farm. The goal is not constant fighting; it is reaching side-lane assignments with enough map tools online.",
      mid: "Send Fiora and Twisted Fate to side lanes while Ezreal and Janna hold mid. Use Nocturne ultimate when the enemy overcommits to one side.",
      late: "Pressure two lanes before Baron or Elder. If the enemy sends one answer, threaten the collapse; if they group, take towers and jungle camps."
    },
    rule: "Side pressure is only real when mid is safe and the side waves force expensive enemy answers.",
    alternatives: [
      { role: "Top", from: "Fiora", to: "Tryndamere" },
      { role: "Support", from: "Janna", to: "Morgana" }
    ]
  },
  {
    id: "early-skirmish",
    name: "Early Skirmish Snowball",
    category: "Early",
    difficulty: "Intermediate",
    tier: "Best tempo snowball",
    summary: "Win lanes and river fights early, then convert the lead before scaling comps stabilize.",
    bestWhen: "Your team is confident fighting early and the enemy draft needs time to scale.",
    needs: "Fast resets, river vision, and discipline to cash out kills into dragons, towers, and Herald.",
    picks: { Top: "Renekton", Jungle: "Lee Sin", Mid: "Ahri", ADC: "Draven", Support: "Nautilus" },
    pros: [
      "Strong early lanes and river priority.",
      "Many tools to start short skirmishes before the enemy is ready.",
      "Can break the game open through bot lane and first objectives."
    ],
    cons: [
      "Falls off if early kills do not become structures or objectives.",
      "Can over-force when the enemy survives the first few plays.",
      "Needs confident execution from the jungle and bot lane."
    ],
    phases: {
      early: "Fight for level and wave advantages. Lee Sin should path toward lanes with crowd control, and bot lane should convert hooks into Draven cash-outs.",
      mid: "Use the gold lead to invade, take towers, and force dragon fights while the enemy carries are still behind.",
      late: "If the game slows down, play for picks and flanks rather than honest front-to-back fights into stronger scaling."
    },
    rule: "Kills are only good if they become tempo; spend the lead before the enemy reaches item breakpoints.",
    alternatives: [
      { role: "Top", from: "Renekton", to: "Darius" },
      { role: "Jungle", from: "Lee Sin", to: "Xin Zhao" }
    ]
  },
  {
    id: "objective-zone",
    name: "Objective Zone Control",
    category: "Control",
    difficulty: "Intermediate",
    tier: "Best dragon and Baron setup",
    summary: "Own the space around objectives with tanks, zone control, safe DPS, and layered counter-engage.",
    bestWhen: "Your team can arrive first and the enemy has to walk through narrow entrances.",
    needs: "Vision setup before spawn timers and patience to fight inside controlled terrain.",
    picks: { Top: "Ornn", Jungle: "Maokai", Mid: "Viktor", ADC: "Xayah", Support: "Rakan" },
    pros: [
      "Excellent control of choke points and river entrances.",
      "Xayah and Rakan give strong safety plus engage/counter-engage.",
      "Ornn and Maokai make face-checking extremely dangerous."
    ],
    cons: [
      "Less explosive if the team arrives late to objectives.",
      "Can be split apart by strong side-lane pressure.",
      "Needs carries to stay inside the controlled zone instead of chasing."
    ],
    phases: {
      early: "Farm toward stable first items and protect vision around river. Do not trade too much health right before dragon spawns.",
      mid: "Move first, place saplings and control wards, then make the enemy walk into Viktor, Maokai, Ornn, and Xayah feathers.",
      late: "Set up Baron and Elder early. If the enemy face-checks, engage; if they wait, use zone control to secure the objective."
    },
    rule: "This comp wins the area before it wins the fight; arrive first or slow down.",
    alternatives: [
      { role: "Mid", from: "Viktor", to: "Orianna" },
      { role: "ADC", from: "Xayah", to: "Jinx" }
    ]
  }
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
