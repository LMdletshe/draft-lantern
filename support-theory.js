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
      "Treat support as an information-and-coordination role first. Mechanics matter, but your biggest edge is making better fights happen and bad fights not happen.",
      "Lane is a repeated game over space, cooldowns, minion access, and follow-up. You win when the enemy must choose between farm, health, safety, and wave control.",
      "Trade on enemy obligations: ADC last-hits, key cooldowns down, level 2/3 spike, enemy support misposition, or stacked-wave pressure.",
      "Stand where your champion can actually influence the lane. Tank supports usually line up or step ahead; mages pivot next to ADC; enchanters stay parallel and preserve peel.",
      "If the wave is bad, the fight is probably bad. Large enemy waves turn good engages into losing all-ins.",
      "Use minimax logic when unsure: avoid the line that loses hardest if wrong. With no Flash, no vision, and no numbers, peel or reset instead of forcing."
    ],
    macro: [
      "Manage three flows: resources, information, and tempo. Health, mana, cooldowns, summoners, XP, gold, wave state, wards, pings, and first move all matter together.",
      "Roaming is tempo conversion, not a lifestyle. Leave lane when the wave, reset, enemy recall, safe ADC state, or objective timer pays for the move.",
      "Ward one play ahead. Place vision where the next decision happens, not where the last fight happened.",
      "Do not ward alone in mid and late game unless enemy location is already constrained. If your death gives Baron or dragon, the ward was not worth it.",
      "Shotcall with short state-based pings: objective, on-my-way, danger, back, assist. The best support calls are brief, local, and timed before the state collapses.",
      "Objective calls are valuation problems. Contest, delay, trade tower, reset, or cross-map based on wave, vision, numbers, burst, and fallback value."
    ],
    responsibilities: [
      "Track lane pressure line, level 2 race, minion cover, key enemy cooldowns, summoners, ADC safety, jungle position, support quest timing, and objective timers.",
      "Convert lane state into tempo, tempo into information, and information into safe fights, picks, towers, or neutral objectives.",
      "Set and deny vision around the next play. Control wards should be contestable, durable, and linked to the space your team wants to own.",
      "Roam with a legal reason: crash, recall, enemy reset, safe ADC, objective setup, or synced jungle path.",
      "Before teamfights, decide whether your duty is engage, peel, counter-engage, pick setup, zone control, or carry protection.",
      "Review support games by process: random trades, illegal roams, warding deaths, weak objective setup, and engage-versus-peel errors."
    ],
    mistakes: [
      "Standing behind ADC as a default when your champion needs to contest space.",
      "Overforcing hooks or all-ins through enemy minions or into larger waves.",
      "Roaming while your ADC is catching a frozen or threatened wave.",
      "Warding the river alone right before Baron or dragon with no teammate escort and unknown enemies.",
      "Arriving at objective on spawn instead of setting vision and reset 30-60 seconds earlier.",
      "Engaging forward while your fed carry is exposed to divers.",
      "Typing long arguments instead of using short pings and playing the next stable line."
    ],
    laneRules: [
      "If enemy ADC must last-hit cannon and your duo can threaten: step up and tax health or cooldowns.",
      "If enemy support used the key engage, shield, heal, hook, or poke spell: trade before it returns.",
      "If your duo will hit level 2 first: help secure the ninth minion, step up early, and threaten before the enemy reacts.",
      "If enemy wave is large: respect minion damage, use cover, and avoid all-ins unless the outcome is guaranteed.",
      "If your lane just crashed or both bot laners reset: look for a legal roam, ward line, mid hover, or jungle sync."
    ],
    roamRules: [
      "Crash then move: strongest default roam because ADC loses less and enemy bot must answer wave.",
      "Recall then move: buy tempo and arrive with wards, sweep, or boots while bot wave is stable.",
      "Enemy bot recalls then move: punish their reset by creating mid, river, or objective pressure.",
      "ADC safe alone then move: acceptable when ADC has range, escape, wave near tower, or enemy threat is constrained.",
      "Objective setup then move: leave to establish vision or pair with jungle before the fight, not after it starts.",
      "If none of those are true, staying bot is usually better than gambling a low-probability roam."
    ],
    visionRules: [
      "A good ward answers a question: can bot play up, can mid overextend, can jungle invade, is dragon contestable, is Baron a bait, or can a flank arrive?",
      "When ahead, ward the entrances that protect your pressure and let your team keep hitting tower, dragon, or Baron.",
      "When behind, pull vision back to your jungle entrances, defensive river paths, and the flank that prevents face-check deaths.",
      "Do not automatically clear a pit ward while taking objective if hitting it reveals HP and creates a steal window.",
      "Sweep with purpose: deny the enemy's next route or engage angle, not just the nearest ward for score."
    ],
    objectiveRules: [
      "Before major calls, ask: who moves first, who shows first, who secures better, who loses more by trading, and what stable fallback remains?",
      "Dragon is good when bot-mid priority, reset timing, jungler path, and vision line are aligned. If two are missing, delay, trade, or cross-map.",
      "Herald is a tower-conversion objective. Value it when it opens mid, breaks first tower, or cashes a lane with priority.",
      "Baron is a support-led map check: vision, numbers, turn threat, and enough damage to avoid a coinflip. If support must ward alone to start it, setup is incomplete.",
      "Towers matter. If the river play is unsafe, spend tempo on guaranteed structure damage or a safer vision line."
    ],
    fightRules: [
      "Default front-to-back and protect the primary damage source unless comp, angle, cooldowns, and follow-up clearly justify engage.",
      "Engage forward only when allies are in range, enemy peel or mobility is constrained, and your backline will not die for your move.",
      "Peel when enemy divers, assassins, or engage tools threaten your carry line. Stopping the threat is often better than chasing a backline target.",
      "Read fights through a resource ledger: HP, mana, cooldowns, ultimates, summoners, item actives, wave interference, local numbers, and Smite state.",
      "Picture three lines: frontline, carry line, and threat line. Do not drift so far that you cannot affect threats crossing toward your carry."
    ],
    climb: [
      "Iron to Bronze: shrink champion pool, learn level 2, use minions as cover, stop random hooks, and stop wardless deaths.",
      "Silver to Gold: attach every move to a wave state, roam only from crash/reset/safe ADC/objective setup, and buy control wards consistently.",
      "Platinum to Emerald: plan 30-60 seconds ahead, set vision before spawn, cancel bad roams faster, and stop coinflip objective starts.",
      "Diamond to Master: optimize resets, support-jungle synchronization, anti-pick vision habits, and objective setup discipline.",
      "Master and above: play the composition precisely, adapt engage versus peel by draft, minimize communication noise, and convert tiny setup advantages cleanly."
    ],
    kpis: [
      "Percentage of trades started on enemy last-hit, cooldown-down, level-spike, or jungle-hover windows.",
      "Legal roam percentage: crash, recall, enemy reset, safe ADC, or objective setup versus random roams.",
      "Objective setup grade 30-60 seconds before spawn: wave ready, reset ready, vision ready, numbers ready.",
      "Deaths while warding alone before dragon, Baron, or even-soul fights.",
      "Control wards bought, replaced, and used in contestable zones rather than decorative zones.",
      "Carry proximity in major fights: close enough to peel, follow, or disengage when the threat crosses.",
      "Post-loss process discipline: stopped or reviewed when tilt degraded decision quality."
    ],
    drills: [
      "Trade audit: tag every trade you start as last-hit, cooldown down, level spike, jungle hover, or random. Eliminate random starts.",
      "Roam legality log: for twenty games, tag every roam as crash, recall, enemy reset, objective setup, safe ADC, or suspect.",
      "Warding death tracker: every river or enemy-jungle death gets one question: what information did I actually have?",
      "Objective setup review: grade each dragon, Herald, and Baron on wave, reset, vision, and numbers before the fight.",
      "Cooldown ledger: before each major skirmish, track enemy Flash, enemy engage, your disengage, carry Flash, and jungler Smite.",
      "Carry-line drill: in every major fight, review whether you were close enough to peel or follow instantly."
    ]
  };

  const matchupShells = [
    { title: "Engage into enchanter", text: "Force short, decisive windows after key shield, heal, or disengage cooldowns. Throw: bleeding too much poke before commit. Examples: Leona, Nautilus, Rell, Alistar, or Blitzcrank into Lulu, Janna, Nami, Milio, or Sona." },
    { title: "Engage into mage or poke", text: "Survive first, use minions as cover, then punish missed skillshots or wave states that let you close distance. Examples: Nautilus, Leona, Rakan, Rell, or Alistar into Lux, Zyra, Brand, Xerath, or Vel'Koz." },
    { title: "Enchanter into engage", text: "Trade on enemy entry timing, deny the clean commit, and extend fights. Throw: using peel spell for poke. Examples: Janna, Lulu, Milio, Nami, or Renata Glasc into Leona, Nautilus, Rell, Alistar, or Pyke." },
    { title: "Mage or poke into enchanter", text: "Build HP lead and wave control into plate pressure. Throw: overpushing without jungle cover. Examples: Zyra, Brand, Lux, Karma, Xerath, or Vel'Koz into Soraka, Sona, Yuumi, Lulu, or Milio." },
    { title: "Catch or pick into immobile lane", text: "Threaten fog and misposition punish more than raw DPS trades. Throw: repeating the same hook angle every wave. Examples: Thresh, Blitzcrank, Pyke, Bard, or Morgana into Jhin, Ashe, Varus, Kog'Maw, or Aphelios lanes." }
  ];

  const archetypes = [
    { title: "Engage support", text: "Creates pressure by standing in credible threat range. Wants level spikes, brush control, ally follow-up, and decisive windows. Examples: Leona, Nautilus, Rell, Alistar, Rakan, Maokai." },
    { title: "Catch support", text: "Wins through fog, angle variation, and punishment of predictable movement. Wants vision denial and enemy route pressure. Examples: Thresh, Blitzcrank, Pyke, Bard, Morgana, Renata Glasc." },
    { title: "Enchanter utility", text: "Wins by protecting carries, extending fights, denying engage, and turning cooldown trades into longer-resource wins. Examples: Lulu, Janna, Nami, Milio, Soraka, Sona, Yuumi." },
    { title: "Mage poke", text: "Wins lane through HP tax, wave pressure, and spell angles. Needs jungle respect and clean pivoting beside ADC. Examples: Zyra, Brand, Lux, Xerath, Vel'Koz, Karma, Seraphine." },
    { title: "Warden anti-engage", text: "Wins by making enemy commit fail. Wants carry proximity, cooldown patience, and front-to-back discipline. Examples: Braum, Taric, Tahm Kench, Poppy support, Galio support, Shen support." }
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

  function renderSupportTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || roleTab?.dataset.guideRole !== "Support" || modeTab?.dataset.learnMode !== "roles") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Support Climbing Framework</p>
          <h3>Play support as a flow-control role: lane pressure, information, tempo, vision, roams, and fight duties all change the next state.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose actions by team value, not activity. The correct support decision creates better information, safer fights, cleaner objectives, or higher-value map movement.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Trade on obligations, not moods</h3>
          ${list(sections.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Convert tempo into information</h3>
          ${list(sections.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Decision Tree</p>
        <h3>Default lane action rules</h3>
        ${list(sections.laneRules, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Matchup Shells</p>
        <h3>Think in lane patterns before champion names</h3>
        <div class="team-principles">
          ${renderPrinciples(matchupShells)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Champion Classes</p>
        <h3>Know how your support creates value</h3>
        <div class="team-principles">
          ${renderPrinciples(archetypes)}
        </div>
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Roaming</p>
          <h3>Earn the right to leave lane</h3>
          ${list(sections.roamRules, "guide-list--checks")}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Vision</p>
          <h3>Ward one play ahead</h3>
          ${list(sections.visionRules)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Objectives</p>
        <h3>Contest, trade, or reset with a fallback</h3>
        ${list(sections.objectiveRules)}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Teamfighting</p>
        <h3>Default peel, fork into engage when verified</h3>
        ${list(sections.fightRules)}
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Responsibilities</p>
          <h3>Your non-negotiables</h3>
          ${list(sections.responsibilities, "guide-list--checks")}
        </section>
        <section class="guide-section guide-section--warning">
          <p class="eyebrow">Common Mistakes</p>
          <h3>Decisions that lose map control</h3>
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
          <h3>Measure process, not just assists</h3>
          ${list(sections.kpis)}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Practice Routine</p>
          <h3>Repeatable drills that improve support</h3>
          ${list(sections.drills)}
        </section>
      </div>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderSupportTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role]") || event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderSupportTheory = renderSupportTheory;
  scheduleRender();
})();
