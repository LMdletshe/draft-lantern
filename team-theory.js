(function () {
  const safeHtml = typeof escapeHtml === "function"
    ? escapeHtml
    : (value) => String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      })[character]);

  const sections = {
    macro: [
      "Treat team play as a repeated imperfect-information game. Every wave, ward, recall, cooldown, death timer, and objective spawn changes the next team state.",
      "Macro is the map-level question: should we push, reset, group, split, ward, trade, contest, or force? Good macro looks 30-90 seconds ahead.",
      "Before any objective, check win condition, wave state, vision, reset timing, numbers, power spikes, and fallback trade.",
      "Do not group by habit. Group when your comp wins grouped fights, when objective setup demands it, or when side-lane cost is already handled.",
      "If contest is bad, trade immediately: tower, plates, side wave, deep vision, reset, or opposite-side objective. Doing nothing is the worst cross-map call.",
      "High-level teams chain states: crash wave into vision, vision into pick threat, pick threat into objective, objective into reset, reset into next wave setup."
    ],
    micro: [
      "Micro is the short-window question: can we trade, engage, dodge, peel, kite, burst, or disengage in the next few seconds?",
      "Trade when cooldowns, wave, item spikes, numbers, and jungle information favor you. If those variables are bad, farm or hold space.",
      "Teamfights are not just damage races. Decide whether your comp wins by front-to-back, pick, dive, poke, peel, split pressure, or objective turn.",
      "Target priority is the highest-value enemy you can safely affect, not always the enemy carry and not always the closest champion.",
      "Use minimax when uncertain: choose the line with the best guaranteed result if the enemy responds correctly.",
      "Avoid low-value hero plays when the stable line wins the next objective, wave, or reset."
    ],
    decisionRules: [
      "If your waves are pushed, vision is set, and your power spike is active: force or threaten objective.",
      "If your waves are bad but the enemy cannot start quickly: fix wave first, then move.",
      "If you are late, dark, and down cooldowns: do not face-check; trade cross-map or stall with poke.",
      "If you get a pick before objective: convert immediately into vision, tower, Baron, dragon, or reset timing.",
      "If enemy split pressure costs more than your group value creates: answer side first or force fast before the side wave breaks you.",
      "If your ideal call fails, take the least embarrassing fallback: disengage, catch wave, ward defensively, or reset."
    ],
    objectives: [
      "Early game: prioritize stable lanes, plates, first tower pressure, first Herald or safe dragon only when lane priority and jungle path support it.",
      "Mid game: dragons, Herald, towers, and Baron setup become wave-plus-vision problems. Arrive before spawn, not on spawn.",
      "Late game: Baron, Elder, inhibitors, and death timers decide the game. One face-check or bad recall can outweigh five minutes of good farming.",
      "Baron should usually start as threat state first: control vision, force checks, punish entry, then decide start, turn, or disengage.",
      "Dragon stacking is valuable, but not every dragon is worth a losing fight. Compare the objective to tower, reset, wave, and side-map trades.",
      "Towers and inhibitors are objectives too. If neutral contest is structurally bad, guaranteed structure damage can be the correct macro call."
    ],
    vision: [
      "Vision is a decision-quality multiplier. A ward is good when it changes what your team is allowed to do next.",
      "Ward the next play, not the last play. Objective vision should be started 30-60 seconds before the fight.",
      "When ahead, use vision to protect pressure and trap enemy paths. When behind, pull vision back and prevent face-check deaths.",
      "Sweeping is not only clearing wards; it is hiding your next move, flank, Baron turn, invade, or pick threat.",
      "Do not enter dark river one by one. Move as a pair or wait for stronger information unless the trade is already worth the risk."
    ],
    communication: [
      "Shotcalling should be clear, short, and state-based. Use pings and brief calls instead of emotional explanations.",
      "Default hierarchy: jungle or support often leads objective and vision calls; mid supports rotations; top and ADC call side pressure, item spikes, and fight readiness.",
      "Good call templates: setup dragon, sweep Baron, push mid then move, back off, trade tower, wait item, fight on ult, peel carry, turn on jungler.",
      "Every player should provide information: missing, Flash timers, ult status, item spike, wave state, Teleport, enemy path, ward location.",
      "Do not spam. Repeated pings are useful only when the game state changes or the team has not seen lethal information."
    ],
    teamfight: [
      "Engage only when power spike, formation, cooldowns, vision, and follow-up make the fight favorable.",
      "If the fight is bad, avoid, kite back, clear wave, poke, or force enemy to start into worse terrain.",
      "Protect carries when enemy dive is the main threat. Dive enemy carries when your backline is safe and follow-up is guaranteed.",
      "After winning a fight, transition immediately: tower, dragon, Baron, inhibitor, vision reset, or safe recall.",
      "After losing a fight, stop the second loss: defend waves, avoid stagger deaths, give the doomed objective, and prepare the next stable line."
    ],
    mistakes: [
      "Leaving a bad wave to contest an objective late and losing both wave and fight.",
      "Starting Baron or dragon because it is alive instead of because wave, vision, numbers, and turn threat are favorable.",
      "Chasing low-health enemies while a tower, dragon, Baron, or side wave is the real reward.",
      "Grouping mid forever with no side-wave assignment, no vision plan, and no objective timer.",
      "Taking a 4v5 because one teammate is catching a necessary side wave or resetting for a spike.",
      "Using pings emotionally instead of communicating the next playable action."
    ],
    climb: [
      "Iron to Bronze: stop random fights, farm safely, ward basic paths, and take obvious towers after kills.",
      "Silver to Gold: connect waves to objectives. Push before moving, reset before fights, and stop contesting late through darkness.",
      "Platinum to Emerald: trade cross-map deliberately, assign side lanes, set vision before spawn, and punish enemy over-rotation.",
      "Diamond to Master: chain tempo states, sync recalls, force fights on spikes, and play objective threat instead of coinflip starts.",
      "Master and above: compress information faster, deny enemy options, communicate minimally, and optimize tiny timing edges around waves and vision."
    ],
    kpis: [
      "Objective setup grade: wave ready, reset ready, vision ready, numbers ready, cooldowns ready.",
      "Neutral objective control: dragons, Heralds, Barons taken versus traded or conceded correctly.",
      "Turret and plate conversion after kills, crashes, Heralds, and Baron buffs.",
      "Vision score with context: wards placed or cleared before meaningful plays, not decorative ward count.",
      "Deaths before major objectives and stagger deaths after lost fights.",
      "Gold and XP difference at 10 and 20 minutes by role, especially when leads fail to convert.",
      "Lead conversion: whether an advantage at 15 minutes became towers, dragons, Baron setup, or game end pressure."
    ],
    drills: [
      "Objective review: for every dragon, Herald, and Baron, mark wave, reset, vision, numbers, and cooldowns as ready or not ready.",
      "Crash-and-go drill: push a wave, then immediately ward, reset, roam, invade, or objective hover. No idle time after crash.",
      "Fight identity drill: before major fights, state whether your comp wants front-to-back, pick, dive, poke, peel, or split pressure.",
      "Shotcall drill: restrict yourself to short calls for a session: push mid, setup dragon, back, turn, peel, trade tower, wait item.",
      "Death audit: review every death and label it as no vision, bad wave, cooldown greed, overchase, late contest, or mechanical error.",
      "Post-game checklist: objective status, death causes, CS/XP gaps, vision errors, and one personal goal for the next game."
    ]
  };

  const concepts = [
    { title: "Macro", text: "Map-level strategy: wave assignments, rotations, vision, objectives, resets, tower pressure, and grouping or splitting at the right time." },
    { title: "Micro", text: "Short-window execution: trades, cooldown use, spacing, kiting, peeling, engaging, and target selection." },
    { title: "Tempo", text: "Time advantage. A crashed wave, forced recall, pick, or reset window buys time to act before the enemy can answer." },
    { title: "Power spikes", text: "Moments when levels, items, ultimates, summoners, or composition state make a fight high probability." },
    { title: "Resource allocation", text: "Gold, XP, time, waves, vision, and cooldowns should flow toward the champion or side of the map that converts them best." },
    { title: "Risk control", text: "The best play is not always the highest upside play. Strong teams avoid lines that lose the whole map when wrong." }
  ];

  const waveTypes = [
    { title: "Freeze", text: "Use to deny farm, stay safe, bait ganks, or hold enemy overextended. Weak when your team needs fast objective movement." },
    { title: "Slow push", text: "Use to build a large wave that buys time for dive, roam, objective setup, or reset. Requires coordination when it crashes." },
    { title: "Fast push / crash", text: "Use for recall, tower plates, tempo, immediate roam, or objective movement. Expect the wave to bounce back afterward." }
  ];

  const compPresets = [
    {
      id: "golden",
      name: "Golden rule balance",
      rule: "1 engager + 1 poke champion + 1 scaler + 1 assassin + 1 split-pusher",
      plan: "Draft one clear way to start fights, one lane that can threaten sides, one late-game insurance policy, one backline threat, and one champion that softens enemies before objectives.",
      comps: [
        {
          title: "Stable ladder comp",
          identity: "front-to-back with side pressure",
          champions: [
            { role: "Top", name: "Fiora", job: "split-pusher", reason: "forces side answers and wins long side-lane resource games" },
            { role: "Jungle", name: "Sejuani", job: "engager", reason: "starts fights reliably and protects objective zones" },
            { role: "Mid", name: "Zed", job: "assassin", reason: "threatens carries and punishes isolated rotations" },
            { role: "ADC", name: "Jinx", job: "scaler", reason: "turns one reset into a won fight if protected" },
            { role: "Support", name: "Karma", job: "poke", reason: "wins early lane tempo and controls objective entry" }
          ],
          watch: "Do not force 5v5 before Jinx has items unless Sejuani finds a clean engage. Fiora should pressure side before the objective timer, not after it starts."
        },
        {
          title: "Siege into pick",
          identity: "poke first, engage second",
          champions: [
            { role: "Top", name: "Camille", job: "split-pusher", reason: "creates side pressure and locks down priority targets" },
            { role: "Jungle", name: "Jarvan IV", job: "engager", reason: "gives the team a simple go button" },
            { role: "Mid", name: "Xerath", job: "poke", reason: "chips enemies before river fights and sieges towers" },
            { role: "ADC", name: "Kai'Sa", job: "scaler", reason: "follows engage and becomes a late-game cleanup threat" },
            { role: "Support", name: "Pyke", job: "assassin", reason: "turns poke damage and crowd control into executions" }
          ],
          watch: "This comp is explosive but fragile. If Jarvan misses the first engage, kite back and let Xerath/Kai'Sa reset the fight instead of chasing."
        },
        {
          title: "Objective trap comp",
          identity: "vision denial into sudden engage",
          champions: [
            { role: "Top", name: "Jayce", job: "poke / split", reason: "pressures side lanes and chunks enemies before checks" },
            { role: "Jungle", name: "Nocturne", job: "assassin", reason: "punishes separated carries and denies clean information" },
            { role: "Mid", name: "Azir", job: "scaler", reason: "anchors late fights and controls space" },
            { role: "ADC", name: "Ashe", job: "engager", reason: "starts picks from range and gives scouting information" },
            { role: "Support", name: "Zyra", job: "poke", reason: "controls choke points and punishes face-checks" }
          ],
          watch: "The team needs vision first. Nocturne ult is much stronger when Jayce/Zyra have already made the enemy walk through bad angles."
        }
      ]
    },
    {
      id: "front-to-back",
      name: "Front-to-back teamfight",
      rule: "frontline + engage + control mage + hypercarry + peel",
      plan: "Make the game simple: protect the main carry, fight through your tanks, and win objectives with reliable spacing.",
      comps: [
        {
          title: "Classic carry shell",
          identity: "protect the ADC",
          champions: [
            { role: "Top", name: "Ornn", job: "frontline / engage", reason: "scales the team and starts fights from range" },
            { role: "Jungle", name: "Sejuani", job: "engage", reason: "locks down targets and buys space" },
            { role: "Mid", name: "Orianna", job: "control / scaling", reason: "pairs with engage and zones choke points" },
            { role: "ADC", name: "Jinx", job: "scaler", reason: "wins extended fights after first takedown" },
            { role: "Support", name: "Lulu", job: "peel", reason: "keeps Jinx alive against dive" }
          ],
          watch: "If the enemy outranges you, do not walk through river late. Set vision early and make them enter your Ornn/Sejuani/Orianna zone."
        },
        {
          title: "Anti-dive wall",
          identity: "absorb engage, then counter-hit",
          champions: [
            { role: "Top", name: "Malphite", job: "engage / armor", reason: "punishes physical carries and starts decisive fights" },
            { role: "Jungle", name: "Maokai", job: "control", reason: "controls entrances with saplings and point-click lockdown" },
            { role: "Mid", name: "Viktor", job: "scaler / waveclear", reason: "stalls waves and dominates grouped zones" },
            { role: "ADC", name: "Xayah", job: "self-peel", reason: "survives dive better than most carries" },
            { role: "Support", name: "Braum", job: "peel / frontline", reason: "blocks engage and protects the carry line" }
          ],
          watch: "Avoid random river starts before Viktor and Xayah are online. This comp is strongest when enemies must walk into layered control."
        }
      ]
    },
    {
      id: "pick-siege",
      name: "Pick and siege",
      rule: "poke + waveclear + catch tool + tower pressure + disengage",
      plan: "Chip enemies first, threaten catches second, then convert health leads into towers and neutral setup.",
      comps: [
        {
          title: "Long-range squeeze",
          identity: "poke before objectives",
          champions: [
            { role: "Top", name: "Jayce", job: "poke / side", reason: "wins side tempo and makes enemies too low to contest" },
            { role: "Jungle", name: "Nidalee", job: "poke / early tempo", reason: "snowballs lanes and controls entrances with spears" },
            { role: "Mid", name: "Ahri", job: "pick", reason: "turns one charm into tower or dragon pressure" },
            { role: "ADC", name: "Caitlyn", job: "siege", reason: "takes plates and towers when enemies are chunked" },
            { role: "Support", name: "Karma", job: "poke / disengage", reason: "wins lane tempo and helps the team kite back" }
          ],
          watch: "Do not start low-percentage all-ins. Your win condition is health bars, towers, and traps around fog, not fair 5v5s."
        },
        {
          title: "Catch into turret damage",
          identity: "pick one, then hit structure",
          champions: [
            { role: "Top", name: "Gnar", job: "side / engage threat", reason: "pressures side and threatens Mega Gnar fights" },
            { role: "Jungle", name: "Elise", job: "pick / dive", reason: "punishes overextended lanes and early towers" },
            { role: "Mid", name: "Syndra", job: "burst / poke", reason: "controls mid wave and deletes caught targets" },
            { role: "ADC", name: "Varus", job: "poke / pick", reason: "adds engage from range and objective chip" },
            { role: "Support", name: "Thresh", job: "pick / peel", reason: "creates catches while saving carries from bad angles" }
          ],
          watch: "If you fall behind, clear waves and fish for picks instead of forcing front-to-back fights into stronger scaling."
        }
      ]
    },
    {
      id: "split-map",
      name: "Split-pressure map",
      rule: "side threat + waveclear + disengage + objective DPS + hard engage threat",
      plan: "Make the enemy answer side lane, then either take the cross-map objective or collapse when they overcommit.",
      comps: [
        {
          title: "1-3-1 pressure",
          identity: "side lanes create the fight",
          champions: [
            { role: "Top", name: "Fiora", job: "split-pusher", reason: "demands a real answer in side lane" },
            { role: "Jungle", name: "Maokai", job: "engage / disengage", reason: "holds mid and controls objective fog" },
            { role: "Mid", name: "Taliyah", job: "waveclear / pick", reason: "moves quickly between side lanes and cuts rotations" },
            { role: "ADC", name: "Ezreal", job: "safe DPS", reason: "holds mid without needing heavy peel" },
            { role: "Support", name: "Thresh", job: "peel / pick", reason: "protects mid and catches greedy rotations" }
          ],
          watch: "Do not ARAM. Fiora only matters if the team keeps mid safe and forces the enemy to choose between side wave and objective."
        },
        {
          title: "Global side pressure",
          identity: "answer side, then arrive first",
          champions: [
            { role: "Top", name: "Shen", job: "global / peel", reason: "can side lane while still joining fights" },
            { role: "Jungle", name: "Nocturne", job: "global engage", reason: "turns side pressure into instant collapse" },
            { role: "Mid", name: "Twisted Fate", job: "global pick", reason: "finds number advantages and controls side waves" },
            { role: "ADC", name: "Kai'Sa", job: "dive / scaling", reason: "follows global engage and cleans fights" },
            { role: "Support", name: "Rakan", job: "engage / peel", reason: "bridges the gap between pick and 5v5" }
          ],
          watch: "This comp wins through numbers advantages. Track enemy Teleport and do not ult into losing waves unless the kill converts to a major objective."
        }
      ]
    },
    {
      id: "dive",
      name: "Dive snowball",
      rule: "primary engage + dive follow-up + assassin threat + early jungle + reset carry",
      plan: "Attack the enemy backline fast, layer crowd control, and convert kills before scaling comps stabilize.",
      comps: [
        {
          title: "Backline collapse",
          identity: "go together or do not go",
          champions: [
            { role: "Top", name: "Kennen", job: "flank engage", reason: "turns fog and Flash into fight wins" },
            { role: "Jungle", name: "Jarvan IV", job: "primary engage", reason: "locks carries in place for follow-up" },
            { role: "Mid", name: "Akali", job: "assassin", reason: "finishes isolated carries after the first cooldowns" },
            { role: "ADC", name: "Kai'Sa", job: "dive scaler", reason: "joins backline threats and cleans resets" },
            { role: "Support", name: "Rakan", job: "engage / follow-up", reason: "chains crowd control and protects exits" }
          ],
          watch: "Do not trickle in. Dive comps lose when engage, follow-up, and damage arrive at different times."
        },
        {
          title: "Early tempo dive",
          identity: "snowball lanes into Herald",
          champions: [
            { role: "Top", name: "Renekton", job: "early setup", reason: "creates dive windows and point-click pressure" },
            { role: "Jungle", name: "Elise", job: "early dive", reason: "executes tower dives and converts lanes into tempo" },
            { role: "Mid", name: "Qiyana", job: "assassin / flank", reason: "dominates river fights when terrain is available" },
            { role: "ADC", name: "Samira", job: "reset carry", reason: "snowballs chaotic fights when CC is layered" },
            { role: "Support", name: "Nautilus", job: "engage", reason: "gives bot lane and river a reliable start button" }
          ],
          watch: "This comp must create early gold. If the first dives fail, slow the game down with wave catches instead of forcing worse dives."
        }
      ]
    }
  ];

  const compRules = [
    "Every comp needs either reliable engage or reliable disengage. Having neither makes objective fights random.",
    "Draft at least one champion who can start a play from fog, range, flank, or point-click crowd control.",
    "Do not stack five champions that all need gold. Pick one or two main carries, then add setup, peel, waveclear, or pressure.",
    "Protect your scaler with peel, frontline, or enough poke that enemies cannot freely dive them.",
    "If you draft split pressure, also draft waveclear or disengage so the four-player group does not collapse.",
    "Check damage mix. Too much physical or too much magic lets the enemy itemize cheaply.",
    "Check waveclear before locking a low-range fight comp. Losing mid wave makes every objective harder.",
    "Objective DPS matters. A comp that cannot kill Baron or dragon quickly must win vision and picks first.",
    "Avoid five low-CC champions unless the players are much better mechanically. Crowd control is the ladder-friendly insurance policy.",
    "Your comp should have a first 10 minutes plan, a first two objectives plan, and a late-game plan. If it only works in one phase, play that phase on purpose."
  ];

  const compExamples = [
    { type: "Engagers", champions: "Ornn, Malphite, Sejuani, Jarvan IV, Maokai, Ashe, Nautilus, Leona, Rakan" },
    { type: "Poke champions", champions: "Jayce, Xerath, Nidalee, Zoe, Caitlyn, Varus, Ezreal, Karma, Zyra" },
    { type: "Scalers", champions: "Kayle, Ornn, Lillia, Graves, Azir, Viktor, Jinx, Kai'Sa, Kog'Maw, Lulu" },
    { type: "Assassins", champions: "Kha'Zix, Nocturne, Zed, Akali, Qiyana, Talon, Pyke, Evelynn" },
    { type: "Split-pushers", champions: "Fiora, Camille, Jax, Tryndamere, Yorick, Gwen, Jayce, Trundle" },
    { type: "Peel / disengage", champions: "Lulu, Milio, Braum, Thresh, Janna, Gragas, Maokai, Xayah, Orianna" },
    { type: "Waveclear anchors", champions: "Azir, Viktor, Orianna, Taliyah, Sivir, Xayah, Ziggs, Anivia" },
    { type: "Pick tools", champions: "Ahri, Twisted Fate, Ashe, Varus, Thresh, Blitzcrank, Nautilus, Elise" }
  ];

  function list(items, className = "") {
    return `<ul class="guide-list ${className}">${items.map((item) => `<li>${safeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderPrinciples(items) {
    return items.map((item, index) => `
      <div class="team-principle">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <strong>${safeHtml(item.title)}</strong>
          <p>${safeHtml(item.text)}</p>
        </div>
      </div>
    `).join("");
  }

  function renderTeamTheory() {
    const content = document.querySelector("#learnGuideContent");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || modeTab?.dataset.learnMode !== "team") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Team Strategy Game Theory</p>
          <h3>Play the map as a repeated information game: waves, vision, tempo, objectives, fights, and communication all change the next state.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose team actions by future map value, not noise. The correct call improves the next wave, reset, vision line, fight setup, objective, or tower state.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Macro</p>
          <h3>Win the map before the fight starts</h3>
          ${list(sections.macro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Micro</p>
          <h3>Fight only when the short window is good</h3>
          ${list(sections.micro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Core Concepts</p>
        <h3>The six ideas behind every team decision</h3>
        <div class="team-principles">
          ${renderPrinciples(concepts)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Decision Tree</p>
        <h3>Default team action rules</h3>
        ${list(sections.decisionRules, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Wave Management</p>
        <h3>Turn minions into time</h3>
        <div class="team-principles">
          ${renderPrinciples(waveTypes)}
        </div>
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Objectives</p>
          <h3>Contest, trade, or threaten</h3>
          ${list(sections.objectives)}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Vision</p>
          <h3>Make information playable</h3>
          ${list(sections.vision)}
        </section>
      </div>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Communication</p>
          <h3>Keep calls short and state-based</h3>
          ${list(sections.communication, "guide-list--checks")}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Teamfights</p>
          <h3>Declare the fight identity first</h3>
          ${list(sections.teamfight)}
        </section>
      </div>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section guide-section--warning">
          <p class="eyebrow">Common Mistakes</p>
          <h3>Decisions that throw map value</h3>
          ${list(sections.mistakes)}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Review KPIs</p>
          <h3>Measure team decisions</h3>
          ${list(sections.kpis)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Climb Path</p>
        <h3>What team skill to master next</h3>
        ${list(sections.climb, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Practice Routine</p>
        <h3>Repeatable drills for better team play</h3>
        ${list(sections.drills)}
      </section>
    `;
  }

  function renderCompCard(comp) {
    return `
      <article class="rule-comp-card">
        <div class="rule-comp-card__header">
          <div>
            <p class="eyebrow">${safeHtml(comp.identity)}</p>
            <h3>${safeHtml(comp.title)}</h3>
          </div>
        </div>
        <div class="rule-comp-roster">
          ${comp.champions.map((champion) => `
            <div class="rule-role-card">
              <span>${safeHtml(champion.role)}</span>
              <strong>${safeHtml(champion.name)}</strong>
              <em>${safeHtml(champion.job)}</em>
              <p>${safeHtml(champion.reason)}</p>
            </div>
          `).join("")}
        </div>
        <div class="rule-comp-warning">
          <strong>Watch out:</strong> ${safeHtml(comp.watch)}
        </div>
      </article>
    `;
  }

  function renderCompBuilder() {
    const presetSelect = document.querySelector("#goldenRulePreset");
    const output = document.querySelector("#goldenRuleResults");
    if (!presetSelect || !output) return;

    const preset = compPresets.find((item) => item.id === presetSelect.value) || compPresets[0];
    output.innerHTML = `
      <div class="rule-builder-summary">
        <div>
          <p class="eyebrow">Draft Rule</p>
          <h3>${safeHtml(preset.rule)}</h3>
          <p>${safeHtml(preset.plan)}</p>
        </div>
      </div>
      <div class="rule-comp-grid">
        ${preset.comps.map(renderCompCard).join("")}
      </div>
    `;
  }

  function injectCompBuilderStyles() {
    if (document.querySelector("#goldenRuleBuilderStyles")) return;
    const style = document.createElement("style");
    style.id = "goldenRuleBuilderStyles";
    style.textContent = `
      .golden-rule-builder {
        margin: 22px 0;
        padding: 18px;
        border: 1px solid rgba(245, 197, 92, 0.28);
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(245, 197, 92, 0.1), rgba(73, 197, 182, 0.08)), rgba(255, 255, 255, 0.035);
        box-shadow: 0 18px 42px rgba(0, 0, 0, 0.16);
      }

      .golden-rule-builder__top {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(220px, 340px);
        gap: 16px;
        align-items: end;
      }

      .golden-rule-builder h2,
      .golden-rule-builder h3,
      .golden-rule-builder p {
        margin: 0;
      }

      .golden-rule-builder__copy p {
        margin-top: 8px;
        color: rgba(246, 242, 226, 0.72);
        line-height: 1.55;
      }

      .golden-rule-builder__control {
        display: grid;
        gap: 8px;
      }

      .golden-rule-builder__control span {
        color: rgba(246, 242, 226, 0.72);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .golden-rule-builder__control select {
        width: 100%;
        min-height: 42px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 8px;
        background: rgba(7, 11, 22, 0.86);
        color: #f6f2e2;
        padding: 0 12px;
        font: inherit;
      }

      .rule-builder-summary {
        margin-top: 18px;
        padding: 14px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.045);
      }

      .rule-builder-summary h3 {
        margin-top: 4px;
        font-size: clamp(1rem, 2vw, 1.35rem);
      }

      .rule-builder-summary p {
        margin-top: 8px;
        color: rgba(246, 242, 226, 0.72);
        line-height: 1.55;
      }

      .rule-comp-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 14px;
        margin-top: 14px;
      }

      .rule-comp-card {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        background: rgba(7, 11, 22, 0.58);
        padding: 14px;
      }

      .rule-comp-card__header h3 {
        margin-top: 2px;
        font-size: 1.08rem;
      }

      .rule-comp-roster {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
        gap: 10px;
        margin-top: 12px;
      }

      .rule-role-card {
        min-height: 132px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.045);
        padding: 10px;
      }

      .rule-role-card span,
      .rule-role-card em {
        display: block;
        color: rgba(246, 242, 226, 0.62);
        font-size: 0.76rem;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .rule-role-card strong {
        display: block;
        margin-top: 5px;
        color: #f6f2e2;
        font-size: 1rem;
      }

      .rule-role-card em {
        margin-top: 4px;
        color: #f5c55c;
      }

      .rule-role-card p {
        margin-top: 7px;
        color: rgba(246, 242, 226, 0.68);
        font-size: 0.86rem;
        line-height: 1.45;
      }

      .rule-comp-warning {
        margin-top: 12px;
        border-radius: 8px;
        background: rgba(245, 197, 92, 0.1);
        color: rgba(246, 242, 226, 0.76);
        padding: 10px;
        line-height: 1.48;
      }

      .rule-cheat-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
        gap: 14px;
        margin-top: 14px;
      }

      .rule-cheat-card {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.04);
        padding: 14px;
      }

      .rule-cheat-list {
        margin: 10px 0 0;
        padding-left: 20px;
        color: rgba(246, 242, 226, 0.72);
        line-height: 1.52;
      }

      .rule-example-list {
        display: grid;
        gap: 10px;
        margin-top: 10px;
      }

      .rule-example-row {
        display: grid;
        gap: 4px;
        padding: 9px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .rule-example-row:first-child {
        border-top: 0;
        padding-top: 0;
      }

      .rule-example-row strong {
        color: #f6f2e2;
      }

      .rule-example-row span {
        color: rgba(246, 242, 226, 0.66);
        line-height: 1.45;
      }

      @media (max-width: 840px) {
        .golden-rule-builder__top,
        .rule-cheat-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function mountCompRuleBuilder() {
    const premadePanel = document.querySelector(".premade-panel");
    const premadeLayout = premadePanel?.querySelector(".premade-layout");
    if (!premadePanel || !premadeLayout || document.querySelector("#goldenRuleBuilder")) return;

    injectCompBuilderStyles();
    premadeLayout.insertAdjacentHTML("beforebegin", `
      <section id="goldenRuleBuilder" class="golden-rule-builder" aria-label="Golden rule team composition builder">
        <div class="golden-rule-builder__top">
          <div class="golden-rule-builder__copy">
            <p class="eyebrow">Golden Rule Builder</p>
            <h2>Build comps by jobs, then pick champions</h2>
            <p>Choose a draft rule and use the suggested teams as templates. The goal is to make every champion answer a team need instead of collecting five strong picks that do not play the same game.</p>
          </div>
          <label class="golden-rule-builder__control">
            <span>Comp rule</span>
            <select id="goldenRulePreset">
              ${compPresets.map((preset) => `<option value="${safeHtml(preset.id)}">${safeHtml(preset.name)}</option>`).join("")}
            </select>
          </label>
        </div>
        <div id="goldenRuleResults" aria-live="polite"></div>
        <div class="rule-cheat-grid">
          <article class="rule-cheat-card">
            <p class="eyebrow">Rules of Thumb</p>
            <h3>Quick draft checks</h3>
            <ol class="rule-cheat-list">
              ${compRules.map((rule) => `<li>${safeHtml(rule)}</li>`).join("")}
            </ol>
          </article>
          <article class="rule-cheat-card">
            <p class="eyebrow">Champion Buckets</p>
            <h3>Examples by job</h3>
            <div class="rule-example-list">
              ${compExamples.map((example) => `
                <div class="rule-example-row">
                  <strong>${safeHtml(example.type)}</strong>
                  <span>${safeHtml(example.champions)}</span>
                </div>
              `).join("")}
            </div>
          </article>
        </div>
      </section>
    `);

    document.querySelector("#goldenRulePreset")?.addEventListener("change", renderCompBuilder);
    renderCompBuilder();
  }

  function scheduleRender() {
    window.setTimeout(renderTeamTheory, 0);
  }

  function scheduleCompBuilder() {
    window.setTimeout(mountCompRuleBuilder, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }

    if (event.target.closest("[data-view='premadeView']")) {
      scheduleCompBuilder();
    }
  });

  window.renderTeamTheory = renderTeamTheory;
  window.mountCompRuleBuilder = mountCompRuleBuilder;
  scheduleRender();
  scheduleCompBuilder();
})();
