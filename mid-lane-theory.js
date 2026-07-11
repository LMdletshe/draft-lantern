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
    micro: [
      "Treat mid lane as a repeated information game. Every wave, ward, recall, missing timer, and side-lane move changes the next state.",
      "Use three currencies: wave, information, and tempo. Wave gives control, information lowers risk, and tempo decides who moves first.",
      "Action value = immediate lane value + option value created - death risk - opportunity cost.",
      "Priority without a reason is wasted HP and mana. A roam without a paid wave is usually fake pressure.",
      "Score trades by combat value, wave value, and future initiative. Damage matters when it secures crash, denies roam, forces potion tax, or creates all-in threat.",
      "If jungle path, support roam angle, or key cooldowns are unknown, lower the value of extended trades and blind river fights."
    ],
    macro: [
      "Mid connects lane control to river access, objective setup, side-lane tempo, and fight structure.",
      "Use the macro loop: solve wave, secure information, declare role, then execute fight or trade.",
      "Crash before roaming unless emergency coverage is required. The wave should pay for the move.",
      "After lane loosens, assign yourself before moving: side-wave accelerator, pick threat, front-to-back damage, flank threat, anti-dive, or utility setup.",
      "Objective fights start before combat. Arrive with wave handled, vision path chosen, role declared, and a turn-or-finish plan.",
      "Ping with purpose: missing, danger side, push mid, move river, on my way, hold flank. Pings should create action, not noise."
    ],
    responsibilities: [
      "Track wave state, jungle probability, support roam risk, summoner spells, key cooldowns, mana, recall timers, objective timers, and side-lane assignments.",
      "Convert pressure into one of five outputs: clean reset, river vision, jungle hover, side-lane move, or objective setup.",
      "Define your fight identity before major fights: zone, peel, poke, delete accessible carry, flank, front-to-back DPS, anti-dive, or engage follow-up.",
      "Punish enemy roams deliberately. Choose push, plate, ward, counter-move, or freeze instead of panic-following late.",
      "Review decisions by context, not result. A won fight can hide a bad habit; a lost fight can still be the correct setup.",
      "Separate evergreen rules from patch details. Wave control, information, tempo, role identity, and review habits last longer than item numbers."
    ],
    mistakes: [
      "Roaming because side lanes look fightable while your own wave is unpaid.",
      "Forcing priority with no conversion plan, then losing HP, mana, or recall timing.",
      "Trading for damage while ruining your wave state or giving enemy jungle a clean punish window.",
      "Following every missing enemy late instead of punishing with push, plates, vision, or a faster counter-move.",
      "Sitting mid after outer towers fall with no plan for side waves, support movement, or objective-side setup.",
      "Entering objective fights without deciding whether to zone, flank, peel, poke, burst, or front-to-back.",
      "Judging your game by raw stats alone instead of role, archetype, team state, and phase."
    ],
    laneStates: [
      "If the wave is neutral and information is poor: hold spacing, last-hit, and collect information.",
      "If you can freeze near your side and punish approach: hold the freeze and deny movement.",
      "If you need a future move: slow push, escort the wave, then crash into ward, reset, roam, or hover.",
      "If you need immediate tempo: fast push to reset, cover objective, chip plate, or stop an enemy roam.",
      "If you need to recover tempo: crash and bounce, then recall or move before the enemy can freeze."
    ],
    matchupRules: [
      "Mage into assassin: deny movement first, protect HP, crash cleanly, and make every roam expensive. Examples: Orianna, Viktor, Syndra, Azir, or Taliyah into Zed, Talon, Fizz, Qiyana, or Katarina.",
      "Assassin into mage: preserve HP until wave, cooldown, or fog creates a real lethal window. Examples: Zed, Talon, Fizz, Akali, or Qiyana looking for angles against Lux, Xerath, Veigar, Viktor, or Orianna.",
      "Skirmisher into mage: pull the lane longer, threaten extended trades, and punish missed cooldowns. Examples: Yone, Yasuo, Irelia, Sylas, or Naafiri into Syndra, Hwei, Anivia, Taliyah, or Lissandra.",
      "Artillery into engage: range works only with vision and spacing. If river or side entrance control breaks, reset the position. Examples: Xerath, Vel'Koz, Ziggs, Lux, or Hwei against Lissandra, Galio, Pantheon, Annie, or Twisted Fate engage setup.",
      "Utility roamer into scaling lane: use escorted first move to create side pressure; if the move is late, punish or reset instead. Examples: Twisted Fate, Galio, Taliyah, Ryze, or Pantheon into Aurelion Sol, Veigar, Kassadin, Corki, or Azir."
    ],
    climb: [
      "Iron to Bronze: reliable last hitting, camera movement, minimap checks, and respect for missing enemies.",
      "Silver to Gold: wave states, recall discipline, roam timing, and anti-coinflip movement.",
      "Platinum to Emerald: jungle tracking, objective-side movement, matchup adaptation, and side-lane assignments.",
      "Diamond to Master: fight identity, cleaner objective setup, role-specific KPIs, and fewer low-value actions under pressure.",
      "Master and above: faster belief updates, patch adaptation, composition precision, opponent prep, and marginal-gain review."
    ],
    kpis: [
      "CS per minute shows baseline resource conversion, but it must be adjusted by champion archetype and game state.",
      "Unforced deaths before 14 minutes reveal lane discipline and jungle respect problems.",
      "Bad reset count catches tempo leaks from recalling on poor waves or staying too long after crash.",
      "First-move rate to river fights measures useful priority better than simply saying get prio.",
      "Roam conversion rate separates real movement from coinflips and late follows.",
      "Objective participation near first major setups measures map relevance, not only lane stats.",
      "Vision tied to movement is better than raw ward count. Mid wards should unlock route, reset, hover, or objective access."
    ],
    drills: [
      "Last-hit baseline: play focused lanes where the only goals are clean CS windows and camera checks.",
      "Crash-reset drill: play three clean wave cycles and record whether each reset happened after crash or bounce.",
      "Missing-enemy punishment drill: every enemy roam must receive one deliberate answer: push, plate, ward, freeze, or counter-move.",
      "River first-move drill: review the first two river contests and mark whether you moved first, late, or not at all.",
      "Side-lane timer drill: leave side lane based on objective clock and vision state, not feel.",
      "Teamfight role callout: before each major fight, state your duty, then review whether your positioning matched it."
    ]
  };

  const archetypes = [
    { title: "Control mage", text: "Push, chip, and deny roams. Wants wave priority and range control, then objective setup. Fight job: zone, peel, front-to-back damage. Examples: Orianna, Viktor, Syndra, Azir, Anivia, Hwei." },
    { title: "Burst mage", text: "Trades around cooldown spikes and fog angles. Wants HP lead or hidden access. Fight job: delete the accessible target. Examples: Annie, Syndra, LeBlanc, Vex, Zoe, Veigar." },
    { title: "Artillery mage", text: "Controls space through range, siege, and anti-entry. Needs safe vision and a front line. Fight job: pre-fight chunking and zone control. Examples: Xerath, Vel'Koz, Ziggs, Lux, Hwei, Jayce." },
    { title: "Battle mage", text: "Survives early and scales into durable space control. Wants stable resources and shorter-range fights. Fight job: sustained area control. Examples: Swain, Vladimir, Cassiopeia, Ryze, Sylas, Aurelion Sol." },
    { title: "Assassin", text: "Preserves HP, creates lethal windows, and threatens fog. Wants crash or bounce into hidden angle. Fight job: backline access, cleanup, or pressure through absence. Examples: Zed, Talon, Fizz, Qiyana, Akali, Katarina." },
    { title: "AD skirmisher", text: "Pulls longer lanes and punishes oversteps. Wants wave on own side or strong all-in timing. Fight job: side pressure and collapse. Examples: Yasuo, Yone, Irelia, Tristana, Tryndamere, Naafiri." },
    { title: "Utility roamer", text: "Prioritizes move timing over raw lane domination. Wants wave escort and guaranteed first move. Fight job: engage follow-up or numbers advantage. Examples: Twisted Fate, Galio, Taliyah, Pantheon, Lissandra, Ryze." },
    { title: "Anti-carry setup", text: "Focuses on reliability and target access. Wants guaranteed setup around objectives. Fight job: lockdown, peel, chain CC, and anti-dive. Examples: Malzahar, Lissandra, Annie, Galio, Vex, Karma." }
  ];

  const patchRules = [
    { title: "Evergreen", text: "Crash before roaming unless emergency coverage is needed." },
    { title: "Evergreen", text: "Priority is valuable only when converted into vision, reset, objective access, side pressure, or a protected recall." },
    { title: "Evergreen", text: "Side-lane time should shrink as major objective spawn approaches." },
    { title: "Evergreen", text: "Teamfight role should be defined before the fight starts." },
    { title: "Patch-sensitive", text: "Exact champion waveclear thresholds, first-buy incentives, role rewards, item breakpoints, and tier placements." },
    { title: "Patch-sensitive", text: "Any system reward or lane incentive from patch notes needs a version check before being treated as current." }
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

  function renderMidTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || roleTab?.dataset.guideRole !== "Mid" || modeTab?.dataset.learnMode !== "roles") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Mid Lane Game Theory</p>
          <h3>Play mid as a repeated information game: waves, trades, recalls, roams, fog, and objectives all change the next state.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose actions by future map value, not immediate damage. The correct mid-lane decision improves your next wave, reset, river move, side-lane assignment, or fight role.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Trade for wave, information, and tempo</h3>
          ${list(sections.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Turn lane pressure into map access</h3>
          ${list(sections.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Decision Tree</p>
        <h3>Default wave and roam rules</h3>
        ${list(sections.laneStates, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Matchup Classes</p>
        <h3>Think in strategic types before champion names</h3>
        ${list(sections.matchupRules)}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Champion Classes</p>
        <h3>Know your job before you move</h3>
        <div class="team-principles">
          ${renderPrinciples(archetypes)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Patch Awareness</p>
        <h3>Keep the fundamentals stable and version the details</h3>
        <div class="team-principles">
          ${renderPrinciples(patchRules)}
        </div>
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Responsibilities</p>
          <h3>Your non-negotiables</h3>
          ${list(sections.responsibilities, "guide-list--checks")}
        </section>
        <section class="guide-section guide-section--warning">
          <p class="eyebrow">Common Mistakes</p>
          <h3>Decisions that lose tempo</h3>
          ${list(sections.mistakes)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Role Climb Path</p>
        <h3>What to master next</h3>
        ${list(sections.climb, "guide-list--checks")}
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Review KPIs</p>
          <h3>Measure decisions, not just scoreboards</h3>
          ${list(sections.kpis)}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Practice Routine</p>
          <h3>Repeatable drills that improve mid lane</h3>
          ${list(sections.drills)}
        </section>
      </div>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderMidTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role]") || event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderMidTheory = renderMidTheory;
  scheduleRender();
})();
