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
      "Treat mid lane as a repeated imperfect-information strategy game. Every wave, ward, recall, missing timer, and side-lane move changes what the enemy can do next.",
      "Use three currencies: wave, information, and tempo. Wave gives control, information lowers risk, and tempo decides who moves first to river, side lane, tower, or objective.",
      "Action score = immediate lane value + option value created - death risk - opportunity cost. A flashy play is bad if it leaves the next decision node worse.",
      "Priority without a reason is wasted HP and mana. A roam without a paid wave is usually negative value. A quiet crash-reset-window can beat a risky kill attempt.",
      "Score trades in three layers: combat value, wave value, and future initiative. Damage is useful when it secures crash, denies roam, forces potion tax, or creates a real all-in threat.",
      "Respect partial information. If jungle path, support roam angle, or key cooldowns are unknown, lower the value of extended trades and blind river fights."
    ],
    macro: [
      "Mid connects lane control to river access, objective setup, side-lane tempo, and fight structure. Winning lane is not enough if the pressure never becomes map access.",
      "Macro loop: solve wave, secure information, declare role, then execute fight or trade. Repeating this loop prevents mid game from becoming random ARAM.",
      "Crash before roaming unless emergency coverage is required. The wave should pay for the move through bounce timing, plate denial, enemy catch-up time, or objective access.",
      "When lane loosens, assign yourself as side-wave accelerator, pick threat, front-to-back damage source, flank threat, anti-dive tool, or utility setup before choosing where to stand.",
      "Objective fights start before combat. Arrive with wave handled, vision path chosen, role declared, and a plan for whether your team turns, zones, pokes, or finishes.",
      "Communication should be short and standardized: missing ping, danger side, push-mid, move-river, on-my-way, hold-flank. Pings should create action, not noise."
    ],
    responsibilities: [
      "Track wave state, jungle probability, support roam risk, summoner spells, key cooldowns, mana, recall timers, objective timers, and side-lane assignments.",
      "Convert pressure into one of five outputs: clean reset, river vision, jungle hover, side-lane move, or objective setup.",
      "Separate evergreen rules from patch-sensitive rules. Wave control, information, tempo, role identity, and review structure persist; item spikes, role rewards, and champion thresholds move with patches.",
      "Define your fight identity before major fights: zone, peel, poke, delete accessible carry, flank, front-to-back DPS, anti-dive, or engage follow-up.",
      "Punish enemy roams deliberately. Choose push, plate, ward, counter-move, or freeze based on wave and objective state instead of panic-following late.",
      "Review by decision context, not result. A lost fight can be correct if the setup was high value; a won fight can still hide a repeatable bad branch."
    ],
    mistakes: [
      "Roaming because side lanes look fightable while your own wave is unpaid.",
      "Forcing priority with no conversion plan, then losing HP, mana, or recall timing.",
      "Trading for damage while damaging your own wave state or giving enemy jungle a clean punish window.",
      "Following every missing enemy late instead of punishing with push, plates, vision, or a faster counter-move.",
      "Sitting mid after outer towers fall with no plan for side waves, support movement, or objective-side setup.",
      "Entering objective fights without deciding whether your champion should zone, flank, peel, poke, burst, or front-to-back.",
      "Using raw stats alone to judge performance instead of role, archetype, team state, and game phase."
    ],
    laneStates: [
      "Neutral: best for information gathering and flexible response, especially in skill matchups or high jungle uncertainty. Weak for forced roams without setup.",
      "Freeze near your side: punishes melee champions, overextended roamers, and enemy mistakes. Weak when your team needs fast objective movement.",
      "Slow push: builds future priority and roam pressure. Strong for crash into ward, reset, side move, or objective hover. Bad if you cannot escort the wave safely.",
      "Fast push: denies enemy freedom immediately. Strong for reset timing, objective setup, plate chip, and anti-roam pressure. Weak if you lack mana for sustained control.",
      "Crash and bounce: recovers tempo on recall and forces response. Strong for clean reset cycles and anti-roam windows. Bad if the enemy can freeze or hard contest."
    ],
    matchupRules: [
      "Mages into assassins usually win by denying movement, protecting HP, and converting range into crash windows before the assassin gets fog access.",
      "Melee skirmishers into control or artillery mages usually want to preserve HP, pull the lane longer, and punish cooldown or positioning errors.",
      "Control mage mirrors are often tempo lanes: the first clean crash, reset, or objective-side move matters more than small chip damage.",
      "Artillery champions need range plus vision. If wave or vision breaks, their strength collapses quickly to flank and engage angles.",
      "Utility roamers can sacrifice damage for map leverage, but only if the wave escort and first-move timing are real."
    ],
    climb: [
      "Iron: reliable last hitting, camera movement, minimap checks, and basic respect for missing enemies.",
      "Bronze: basic wave states and recall discipline. Learn freeze, slow push, fast push, crash, and bounce with simple examples.",
      "Silver: roam timing and anti-coinflip habits. Learn the roam tax and stop donating waves for low-conversion movement.",
      "Gold: jungle tracking and objective-side movement. Track likely pressure side and move first to river when the wave permits.",
      "Platinum: matchup adaptation and side-lane assignments. Know when your champion should catch side, group, hover, or threaten fog.",
      "Diamond: fight identity and cleaner objective setup. Define your job before the fight and arrive with wave, vision, and cooldowns aligned.",
      "Master: fewer low-value actions under pressure. Use regret-based review, precise KPIs, and cleaner branch comparison.",
      "Grandmaster and Challenger: faster belief updates, patch adaptation, composition precision, opponent prep, and marginal-gain review."
    ],
    kpis: [
      "CS per minute: baseline resource conversion and lane control, adjusted by champion archetype and game state.",
      "Unforced deaths before 14 minutes: high-priority review trigger for lane discipline and jungle respect.",
      "Bad reset count: tempo leakage from recalling on poor waves or staying too long after crash.",
      "First-move rate to river fights: operationalizes useful priority better than simply saying get prio.",
      "Roam conversion rate: separates real movement from coinflips and late follows.",
      "Objective participation near first major setups: measures map relevance, not just lane stats.",
      "Vision actions tied to movement: better than raw ward count because mid wards should unlock a route, reset, hover, or objective."
    ],
    drills: [
      "Last-hit baseline: run focused lanes where the only goal is clean CS windows and camera checks.",
      "Crash-reset drill: play three clean wave cycles and record whether each reset happened after crash or bounce.",
      "Missing-enemy punishment drill: every enemy roam must receive one deliberate answer: push, plate, ward, freeze, or counter-move.",
      "River first-move drill: review the first two river contests and mark whether you moved first, late, or not at all.",
      "Side-lane timer drill: leave side lane based on objective clock and vision state, not feel.",
      "Teamfight role callout: before each major fight, state your duty in notes or out loud, then review whether your positioning matched it.",
      "Review queue drill: review only the three highest-swing moments after each game so improvement stays consistent and focused."
    ]
  };

  const archetypes = [
    ["Control mage", "Push, chip, and deny roams. Wants wave priority and range control, then mid push into objective setup. Teamfight job is zone, peel, and front-to-back damage."],
    ["Burst mage", "Trades around cooldown spikes and fog angles. Wants HP lead or hidden access, then pick creation and reset tempo. Teamfight job is delete the accessible target."],
    ["Artillery mage", "Controls space through range, siege, and anti-entry. Needs safe vision and a front line. Teamfight job is pre-fight chunking and zone control."],
    ["Battle mage", "Survives early and scales into durable space control. Wants resource stability and shorter-range fights. Teamfight job is sustained area control."],
    ["Assassin", "Preserves HP, creates lethal windows, and threatens fog. Wants crash or bounce into hidden angle. Teamfight job is backline access, cleanup, or pressure through absence."],
    ["AD skirmisher or fighter mid", "Pulls longer lanes and punishes oversteps. Wants wave on own side or strong all-in timing. Mid-game job is side pressure and collapse."],
    ["Utility roamer or global mid", "Prioritizes move timing over raw lane domination. Wants wave escort and guaranteed first move. Teamfight job is engage follow-up or numbers advantage."],
    ["Anti-carry setup mid", "Focuses on reliability and target access. Wants guaranteed setup around objectives. Teamfight job is lockdown, peel, chain CC, and anti-dive."]
  ];

  const matrix = [
    ["Control mage vs Assassin", "Deny movement before chasing kills. Protect HP, crash cleanly, ward exits, and make roams expensive."],
    ["Assassin vs Control mage", "Preserve HP until wave, cooldown, or fog creates a lethal window. Bad early trades can remove your entire game plan."],
    ["Skirmisher vs Mage", "Pull the lane long, threaten extended trades, and punish cooldown misses. Avoid being poked out before the fight begins."],
    ["Artillery vs Engage or Assassin", "Your range only works with vision and spacing. If brush, river, or side entrance control breaks, reset the position."],
    ["Utility roamer vs Scaling lane", "Use escorted first move to create side pressure. If the move is late, punish or reset instead of forcing a low-value follow."]
  ];

  const patchRules = [
    ["Evergreen", "Crash before roaming unless emergency coverage is needed."],
    ["Evergreen", "Priority is valuable only if converted into vision, reset, objective access, or side pressure."],
    ["Evergreen", "Side-lane time should shrink as major objective spawn approaches."],
    ["Evergreen", "Teamfight role should be defined before the fight starts."],
    ["Patch-sensitive", "Exact champion waveclear thresholds, first-buy incentives, role rewards, and champion tier placements."],
    ["Patch-sensitive", "Any system reward, item breakpoint, or lane incentive that changes in patch notes must be versioned before the guide treats it as current."]
  ];

  function list(items) {
    return `<ul>${items.map((item) => `<li>${safeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderCards(items) {
    return items.map(([title, detail]) => `
      <article class="guide-card">
        <h4>${safeHtml(title)}</h4>
        <p>${safeHtml(detail)}</p>
      </article>
    `).join("");
  }

  function renderMidTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");

    if (!content || roleTab?.dataset.guideRole !== "Mid" || modeTab?.dataset.learnMode !== "roles") {
      return;
    }

    content.innerHTML = `
      <section class="guide-intro">
        <div>
          <p class="eyebrow">Mid Lane Game Theory</p>
          <h3>Trade, crash, move, and fight for the best next map state.</h3>
          <p>Mid lane is the map's tempo broker. Your pressure matters when it becomes wave control, information, river access, side pressure, or a clearly defined fight job.</p>
        </div>
      </section>

      <div class="guide-dual">
        <article class="guide-section">
          <h3>Micro Rules</h3>
          ${list(sections.micro)}
        </article>
        <article class="guide-section">
          <h3>Macro Rules</h3>
          ${list(sections.macro)}
        </article>
      </div>

      <article class="guide-section">
        <h3>Core Responsibilities</h3>
        ${list(sections.responsibilities)}
      </article>

      <article class="guide-section">
        <h3>Wave State Decisions</h3>
        ${list(sections.laneStates)}
      </article>

      <div class="guide-dual">
        <article class="guide-section">
          <h3>Matchup Laws</h3>
          ${list(sections.matchupRules)}
        </article>
        <article class="guide-section">
          <h3>Common Mistakes</h3>
          ${list(sections.mistakes)}
        </article>
      </div>

      <article class="guide-section">
        <h3>Champion Archetypes</h3>
        <div class="guide-card-grid">
          ${renderCards(archetypes)}
        </div>
      </article>

      <article class="guide-section">
        <h3>Archetype Matchup Matrix</h3>
        <div class="guide-card-grid">
          ${renderCards(matrix)}
        </div>
      </article>

      <article class="guide-section">
        <h3>Evergreen vs Patch-Sensitive</h3>
        <div class="guide-card-grid">
          ${renderCards(patchRules)}
        </div>
      </article>

      <article class="guide-section">
        <h3>Rank Climb Progression</h3>
        ${list(sections.climb)}
      </article>

      <div class="guide-dual">
        <article class="guide-section">
          <h3>Mid KPIs</h3>
          ${list(sections.kpis)}
        </article>
        <article class="guide-section">
          <h3>Practice Drills</h3>
          ${list(sections.drills)}
        </article>
      </div>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderMidTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role], [data-learn-mode], [data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderMidTheory = renderMidTheory;
  scheduleRender();
})();
