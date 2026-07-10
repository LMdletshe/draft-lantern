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
      "Treat ADC as a sequence of high-value, low-margin decisions. One extra auto is good only if it does not break your next wave, reset, or safety state.",
      "No support parity, no real trade. Bot lane is a linked 2v2; if your support cannot hit or threaten with you, many trades are fake.",
      "Trade only when enough variables are favorable: wave size, support position, enemy cooldowns, range, summoners, and jungle collapse risk.",
      "Damage is not the objective by itself. A good trade creates crash, freeze, plate pressure, recall timing, dragon priority, or a safer all-in threat.",
      "Your safest damage is usually the closest safe target. Backline fantasies are only correct when enemy engage, flank, and dive tools are already controlled.",
      "Survival is a damage multiplier. A living ADC with five more seconds of uptime usually beats a greedy ADC who dies with cooldowns unused."
    ],
    macro: [
      "Win the wave before you contest the objective. Bot priority matters more when dragon, Baron, and tower plays take longer to secure.",
      "Use the ADC macro loop: fix wave, collect safe gold, secure information, arrive early, then choose contest, delay, or cross-map.",
      "Take the safest high-value lane that still lets you arrive on time. Gold matters, but late gold that misses the fight is often fake value.",
      "When support roams, lower lane ambition. Absorb weakside, thin waves, avoid unnecessary trades, and protect your recall timing.",
      "Never be first face into dark river or jungle. Wait for vision, frontline, support, or a safer route before entering contested space.",
      "Cross-map is often better than blind contest. If objective setup is lost, convert side wave, turret, plates, vision line, or tempo instead of donating shutdown."
    ],
    responsibilities: [
      "Track support parity, wave size, enemy engage cooldowns, jungle side, summoner spells, recall gold, item spikes, objective timers, vision line, and enemy dive angles.",
      "Convert lane wins into crash, plate, reset, first tower damage, dragon setup, or safe map expansion.",
      "Protect your income without becoming passive. Stable farm is valuable because it creates item-spike fights, not because farming is the only job.",
      "Before teamfights, identify the fight mode: front-to-back, follow-up pick, or self-peel kite.",
      "Use itemization to solve combat problems: scaling DPS, anti-frontline, tempo burst, waveclear, or survival.",
      "Review ADC games by decision quality: bad recalls, unsupported trades, pre-objective deaths, unsafe catches, and first-death-in-fight patterns."
    ],
    mistakes: [
      "Random autos into a larger enemy wave.",
      "Walking up while support is out of range or moving for vision.",
      "Winning an HP trade but failing to convert it into crash, plate, recall, or objective tempo.",
      "Staying for one more wave or plate when objective regroup timing is already tight.",
      "Entering river first with no vision, no frontline, and no escape path.",
      "Trying to maximize damage during the enemy threat peak instead of after engage tools are spent.",
      "Catching a side wave that is technically valuable but impossible to regroup from on time."
    ],
    tradeRules: [
      "Green trade: support is parallel, enemy wave is not bigger, key enemy cooldown is down, and jungle collapse risk is low. Take short punish or setup trade.",
      "Yellow trade: only one or two variables are favorable. Trade only for last-hit denial, clear support setup, or a small cooldown punish.",
      "Red trade: support is not parallel, enemy wave is bigger, engage cooldown is available, or jungle position is unknown. Prioritize CS, tether range, and information.",
      "If the window already achieved its goal, stop. Overtrading after crash, plate, or reset timing is how ADC leads turn into deaths.",
      "If enemy level 2 or 3 spike is about to happen first, back up before the wave makes the fight illegal."
    ],
    waveRules: [
      "Freeze when the goal is safe farm, denying an overextended enemy, baiting jungle help, or surviving weakside.",
      "Slow push when the goal is a future movement window: dragon setup, support roam, ward timing, dive threat, or reset protection.",
      "Fast push and crash when the goal is recall, plate conversion, enemy death punish, anti-freeze, or immediate objective tempo.",
      "Hold neutral when information is poor and both sides can punish overcommitment.",
      "Before recall, ask whether the wave will bounce back or whether you are donating a full crash. Bad recalls are one of the cleanest ADC leaks."
    ],
    fightRules: [
      "Front-to-back: hit the nearest safe target while preserving angle behind peel. Use when enemy dive threat is high or your team has a real frontline.",
      "Follow-up pick: hold damage until allied CC lands, then burst the caught target. Use when your team wins through hooks, arrows, flanks, or catch tools.",
      "Self-peel kite: spend movement and defensive cooldowns first, damage second. Use when assassins, bruisers, or divers can directly reach you.",
      "Delay entry when enemy engage tools are still hidden. Your first auto is not worth dying before the real fight begins.",
      "Swap targets only when the new target is both higher value and still safe. Unsafe target switches are a common hidden fight-losing habit."
    ],
    objectiveRules: [
      "Objective value = numbers + wave priority + vision + Smite condition + ultimates + item spike - facecheck risk - side-wave loss - enemy zone threat.",
      "Contest when wave, vision, numbers, item spike, and formation are good enough for a real fight.",
      "Delay when your team can poke, threaten, or stall while waves or teammates improve the state.",
      "Cross-map when contest requires face-checking through darkness or arriving second into enemy zone control.",
      "If objective setup is lost, choose the safest conversion: catch wave, trade turret, take plates, set vision line, or reset for the next play."
    ],
    climb: [
      "Iron to Bronze: farm the nearest safe wave, stop unsupported trades, learn push-before-base, and never walk into dark river first.",
      "Silver to Gold: add wave states, support parity, jungle side, dragon timing, first-item timing, and clean crash-reset habits.",
      "Platinum to Emerald: convert lane wins into plates, first tower, objective setup, and safe lane assignments instead of damage for its own sake.",
      "Diamond to Master: manage weakside, arrive early to objective setups, fight from threat budgets, and delay entry until key engage tools are shown.",
      "Master and above: optimize support sync, jungle tracking, cooldown layers, exact HP thresholds, wave timing, side pressure, and patch-specific item decisions."
    ],
    kpis: [
      "Lane CS difference at 10 minutes, segmented by matchup and support state.",
      "Trades started while support was not parallel.",
      "Trades taken into a larger enemy wave.",
      "Bad recall rate and waves lost after won trades.",
      "Deaths within 45 seconds before dragon or Baron.",
      "First death rate in 5v5 fights and seconds alive after first contact.",
      "Side-wave catches that caused missed objective presence."
    ],
    drills: [
      "Support parity drill: before each trade, say whether support can actually hit or threaten with you.",
      "Wave-to-recall drill: every base must happen after crash, bounce, or a clearly protected weakside state.",
      "Threat-budget drill: before each fight, name the enemy spell or champion that can kill you first.",
      "Objective arrival drill: for the first two major objectives, check whether you arrived 20-30 seconds early with wave fixed.",
      "Side-lane safety drill: before catching a wave, name your escape route and regroup timer.",
      "Review routine: after each game, tag one lane error, one macro error, and one fight error."
    ]
  };

  const archetypes = [
    { title: "Hypercarry scaler", text: "Examples: Jinx, Xayah. Play for clean farm, protected pushes, and 2-3 item fights. Fight job: sustained DPS from structured front-to-back or peel setups." },
    { title: "Lane bully snowball", text: "Examples: Draven, Miss Fortune. Push early leads into crash, plate, first tower, and objective timing before the scaling window closes." },
    { title: "Utility control ADC", text: "Example: Ashe. Use slows, arrows, and setup to create favorable starts. Fight job: start, stabilize, chase, pick, or peel." },
    { title: "Caster or poke mobility ADC", text: "Example: Ezreal. Trade on spell-hit windows, preserve safety, and keep mid-game tempo through siege and follow-up angles." }
  ];

  const itemFamilies = [
    { title: "Crit capstone scaling", text: "Use when you can reliably reach multiple items and fight with peel or stable farm path. The problem to solve is maximum sustained auto value." },
    { title: "Repeated-hit anti-frontline", text: "Use when enemy frontline cannot be burst and you will get long DPS windows. The problem to solve is durable targets." },
    { title: "Tempo, wave, or burst access", text: "Use when first-hit pressure, rotations, or mid-game skirmish pace matter more than pure late scaling." },
    { title: "Safety or anti-burst", text: "Use when survival increases total damage more than greedy DPS. The problem to solve is one-rotation threat." }
  ];

  const phases = [
    { title: "Early lane", text: "Convert farm safely while using support parity, wave state, and cooldown windows. Hard rule: do not desync from support unless the isolated value is guaranteed." },
    { title: "Early-mid transition", text: "Turn lane win or stable farm into first tower damage, objective setup, and safe map expansion. Hard rule: fix wave before helping." },
    { title: "Mid game", text: "Take the safest high-value farm while staying close enough for objective fights. Hard rule: never be first face into dark river or jungle." },
    { title: "Late game", text: "Maximize damage uptime without donating shutdown or objective control. Hard rule: survival is a damage multiplier, not passive play." }
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

  function renderAdcTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || roleTab?.dataset.guideRole !== "ADC" || modeTab?.dataset.learnMode !== "roles") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">ADC Climb Theory</p>
          <h3>Play ADC as a low-margin decision game: trades, waves, recalls, safe gold, threat ranges, and objectives all decide your damage uptime.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose actions by future damage value, not immediate autos. The correct ADC decision improves your next wave, reset, item spike, fight entry, or objective state.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Trade only when the lane state allows it</h3>
          ${list(sections.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Turn safe gold into objective-ready damage</h3>
          ${list(sections.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Decision Tree</p>
        <h3>Default lane trade rules</h3>
        ${list(sections.tradeRules, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Wave And Recall Tempo</p>
        <h3>Make the wave pay for every move</h3>
        ${list(sections.waveRules, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Fight Entry</p>
        <h3>Pick the fight mode before you auto</h3>
        ${list(sections.fightRules)}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Objective Decisions</p>
        <h3>Contest, delay, or cross-map deliberately</h3>
        ${list(sections.objectiveRules)}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Champion Classes</p>
        <h3>Know how your damage becomes reliable</h3>
        <div class="team-principles">
          ${renderPrinciples(archetypes)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Item Logic</p>
        <h3>Build for the combat problem</h3>
        <div class="team-principles">
          ${renderPrinciples(itemFamilies)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Game Phases</p>
        <h3>Your job changes as the map opens</h3>
        <div class="team-principles">
          ${renderPrinciples(phases)}
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
          <h3>Decisions that lose damage uptime</h3>
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
          <h3>Measure decisions, not just damage</h3>
          ${list(sections.kpis)}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Practice Routine</p>
          <h3>Repeatable drills that improve ADC</h3>
          ${list(sections.drills)}
        </section>
      </div>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderAdcTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role]") || event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderAdcTheory = renderAdcTheory;
  scheduleRender();
})();
