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

  function scheduleRender() {
    window.setTimeout(renderTeamTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderTeamTheory = renderTeamTheory;
  scheduleRender();
})();
