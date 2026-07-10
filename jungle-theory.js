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
      "Treat jungle as a repeated, partially visible resource-allocation game. Every route, gank, invade, reset, and objective changes the next board state.",
      "Evaluate plays by expected value after the next reset, not by whether a kill looks possible right now.",
      "A good gank is a lane-state decision: wave position, allied setup, enemy escape route, HP, cooldowns, summoner spells, and enemy jungle timing matter more than map distance.",
      "Fight the enemy jungler only when you have lane access, level or item edge, known cooldown edge, or a clearly winning escape path.",
      "Smite is the final input, not the whole secure. Objective security comes from access, zoning, burst timing, turn threat, and then Smite.",
      "The climb pattern is fewer low-EV actions and cleaner conversion of each initiative into the next advantaged state."
    ],
    macro: [
      "Your first clear is an opening strategy, not a memorized script. It should point you toward the lane, river, reset, or objective state your champion and lanes can actually use.",
      "Route EV = farm tempo + lane conversion + information gained + future objective leverage - duel risk - lost opposite-side resources - delayed reset spike.",
      "Mirror when the enemy's obvious play can be punished by arriving first in fog. Cross-map when contesting loses more than trading camps, plates, dive pressure, or structure damage.",
      "Objectives are board-state converters, not trophies. A dragon, Herald, Grub, or Baron is good when it creates better access to the next map state than the alternative.",
      "Baron starts with threat first and monster damage second. Use Baron to force bad checks through fog; do not start only because it is alive.",
      "When you cannot contest, do not simply leave. Convert the opposite side into camps, vision, plates, tower damage, a dive, or a reset advantage."
    ],
    responsibilities: [
      "Track lane priority, wave direction, champion cooldowns, summoner spell status, item timing, objective timers, camp availability, fog ownership, and whether the next fight is a turn fight or a pure secure.",
      "Maintain a probability map for enemy jungle position instead of making binary guesses. You only need enough certainty to choose the higher-EV action.",
      "Convert initiative immediately: kill into wave crash, crash into invade, invade into objective access, objective access into vision, vision into the next pick or denial.",
      "Separate evergreen jungle fundamentals from patch-sensitive details. Tracking, priority, counterganks, fog pressure, objective access, and review habits last longer than tier lists or exact clears.",
      "Choose between covering a weak lane and snowballing a winning lane by asking which move creates the stronger next state, not which lane is emotionally loudest.",
      "Your scoreboard value often appears through allies: saved waves, denied dives, protected recalls, lane tempo, vision control, and forced enemy pathing mistakes."
    ],
    mistakes: [
      "Following a memorized clear after lane states already changed.",
      "Ganking because you are nearby instead of because the wave, setup, and exit make the gank high value.",
      "Starting objectives with no lane move, no fog control, no turn threat, and no plan for the enemy collapse.",
      "Hovering mid too long and bleeding camps for no conversion.",
      "Repeating bot ganks because two enemies are there while ignoring wave crash timing, support brush control, and dragon setup.",
      "Diving with an unknown exit route or unknown countergank timing.",
      "Fighting the enemy jungler because the champion matchup should win while ignoring lane priority and missing information."
    ],
    openingQuestions: [
      "Which lane is most convertible if I spend time there?",
      "Which enemy lane is most punishable by wave position, mobility, summoner spells, or setup weakness?",
      "Who wins equal-number river fights before the first reset?",
      "Which side of the map hosts the more valuable first contest for our team composition?",
      "What information would make me change my route: leash, late lane arrival, ward reveal, wave posture, or enemy camp reveal?"
    ],
    trackingRules: [
      "Use leash information, late lane arrivals, warded entrances, lane posture, scuttle timing, and the enemy's first reveal to shrink their possible routes.",
      "When the enemy appears, ask which quadrant must be down, which camp sequence is likely next, and which lane they can reach before you.",
      "If a lane plays far forward without vision, update the enemy jungle probability toward that side unless you have a stronger reveal.",
      "An uncontested scuttle, missing camp, or strange recall timing is information. It may tell you where the enemy cannot be as much as where they can be.",
      "Tracking does not require perfect knowledge. It requires enough confidence to avoid bad blind fights and take cleaner trades."
    ],
    objectiveRules: [
      "Objective EV = reward + next-state access + denial value - camp loss - wave loss - death risk - steal risk - opposite-side concession.",
      "Early dragons are tempo objectives. Take them when your lanes can move, your champion can finish safely, and the enemy cannot trade more on the other side.",
      "Soul point and soul fights are setup objectives. Recall early, place vision first, hold turn threat, and make the enemy walk into your controlled area.",
      "Herald and structures can beat an early dragon when they create plates, tower pressure, side control, or a repeat invade into the next quadrant.",
      "Baron is strongest when the enemy's only winning line is face-checking a losing corridor. If you cannot turn before secure, the start may be the enemy's opportunity.",
      "Current Smite breakpoints should be checked in-game, but the principle stays: combine burst packets and zoning before trusting the button."
    ],
    climb: [
      "Iron to Bronze: clear consistently, stop random river deaths, gank only lanes with setup or overextension, and spend gold on time.",
      "Silver to Gold: track first clear direction, punish visible enemy routes, convert kills into camps or objectives, and stop starting dragons with losing lanes.",
      "Platinum to Emerald: path from lane states instead of habit, shadow predictable ganks, trade cross-map cleanly, and review every failed objective setup.",
      "Diamond to Master: control tempo through reset timing, fog ownership, lane-priority sequencing, and turn-threat discipline around objectives.",
      "Master and above: win through prediction and denial: force the enemy into lower-value routes, hide your own options, and convert small timing edges without overextending."
    ],
    drills: [
      "Before queue: choose a default first route and two conditions that change it.",
      "After first reset: write the one action that created value and the one action that lost value. Keep it concrete.",
      "Objective review: pause 45 seconds before spawn and check recalls, lane priority, vision, enemy route, and cross-map trade.",
      "Gank review: label each gank as wave-supported, cooldown-supported, information-supported, or forced. Forced ganks should become rare.",
      "Tracking drill: after every enemy jungle reveal, predict their next quadrant before looking at the minimap outcome."
    ]
  };

  const targetFramework = [
    {
      target: "Top lane",
      good: "Long lane, enemy overextended, wave can freeze or stack into a dive, and the enemy jungle route is readable.",
      bad: "Huge hostile wave, no exit, no allied HP or cooldowns, or enemy top wins the 2v2.",
      conversion: "Herald setup, plates, weak-side release, enemy camp denial, or a clean reset for your top.",
      trap: "Forcing top only because the lane is physically long."
    },
    {
      target: "Mid lane",
      good: "Allied push, setup CC, enemy Flash down, or the route preserves tempo into river or raptors.",
      bad: "Short lane with no setup, enemy support can move first, or dive math is unclear.",
      conversion: "River control, raptor invade, dragon access, or mid push into side-lane move.",
      trap: "Hovering mid while camps respawn and no wave state changes."
    },
    {
      target: "Bot lane",
      good: "Allied wave creates a 3v2 or dive, support can move, or the play links directly to dragon or first tower.",
      bad: "No vision, enemy support owns brush, wave crashes the wrong direction, or your bot lane cannot follow.",
      conversion: "Dragon, plates, lane pressure shift, first tower, or enemy bot forced off a large wave.",
      trap: "Repeating coinflip bot plays because two kills are available in theory."
    },
    {
      target: "Enemy jungler",
      good: "You have first move, item or level edge, cooldown edge, and nearby lanes can arrive first.",
      bad: "Blind river duel, no lane access, missing side-lane information, or unclear enemy support position.",
      conversion: "Camp denial, tempo lead, forced objective control, or a safer reset window.",
      trap: "Taking a duel because the matchup chart says you win."
    },
    {
      target: "Countergank",
      good: "The enemy lane is obvious prey, your ally can bait safely, and you arrive first while hidden.",
      bad: "Your ally is too low to turn, enemy already reset vision, or you arrive after the commitment window.",
      conversion: "Double-kill swing, tempo reset, objective access, or enemy jungle route collapse.",
      trap: "Showing early and letting the enemy cancel the play for free."
    }
  ];

  const archetypes = [
    ["Early gank utility", "Creates lane tempo before the first major contest. Wants 3-4 camp or side-skewed routes, lane setup, and early access through priority."],
    ["Farming fighter", "Converts camp efficiency into level and item pressure. Wants high-camp routes, strong river 1v1s, and objective starts when first to the area."],
    ["Tank engage", "Turns structured fights with reliable initiation and frontline value. Wants safe clear or hover routes into lanes that can follow."],
    ["Assassin pick", "Uses fog and isolated targets to create burst advantages before objectives. Wants angles, flank paths, and picks instead of front-door starts."],
    ["AP control or tempo mage", "Wins through clear-to-positioning, choke control, anti-engage, poke, and objective-zone setup."],
    ["Countergank utility", "Wins by reading the enemy first. Wants mirror routes, shadow timings, disengage, peel, and follow-up around likely attacks."]
  ];

  function list(items) {
    return `<ul>${items.map((item) => `<li>${safeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderTargetCards() {
    return targetFramework.map((item) => `
      <article class="guide-card">
        <h4>${safeHtml(item.target)}</h4>
        <p><strong>Good when:</strong> ${safeHtml(item.good)}</p>
        <p><strong>Bad when:</strong> ${safeHtml(item.bad)}</p>
        <p><strong>Convert into:</strong> ${safeHtml(item.conversion)}</p>
        <p><strong>Common trap:</strong> ${safeHtml(item.trap)}</p>
      </article>
    `).join("");
  }

  function renderArchetypes() {
    return archetypes.map(([name, detail]) => `
      <article class="guide-card">
        <h4>${safeHtml(name)}</h4>
        <p>${safeHtml(detail)}</p>
      </article>
    `).join("");
  }

  function renderJungleTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");

    if (!content || roleTab?.dataset.guideRole !== "Jungle" || modeTab?.dataset.learnMode !== "roles") {
      return;
    }

    content.innerHTML = `
      <section class="guide-intro">
        <div>
          <p class="eyebrow">Jungle Game Theory</p>
          <h3>Win the next board state, not just the current fight.</h3>
          <p>Jungle is a hidden-information role. Your job is to route, reveal, deny, and convert resources so each minute gives your team a better position than the enemy jungler can create.</p>
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
        <h3>Loading Screen Route Questions</h3>
        ${list(sections.openingQuestions)}
      </article>

      <article class="guide-section">
        <h3>Target Selection Framework</h3>
        <div class="guide-card-grid">
          ${renderTargetCards()}
        </div>
      </article>

      <article class="guide-section">
        <h3>Champion Archetypes</h3>
        <div class="guide-card-grid">
          ${renderArchetypes()}
        </div>
      </article>

      <div class="guide-dual">
        <article class="guide-section">
          <h3>Tracking Rules</h3>
          ${list(sections.trackingRules)}
        </article>
        <article class="guide-section">
          <h3>Objective Rules</h3>
          ${list(sections.objectiveRules)}
        </article>
      </div>

      <article class="guide-section">
        <h3>Dive Rule</h3>
        <p>A dive is high EV only when the allied wave grants time, allied damage finishes before turret aggro flips the fight, the exit route is known, and the enemy jungler cannot counter-arrive or still loses if they do. If one condition is unknown, hover the crash, take vision, and deny the next play instead.</p>
      </article>

      <article class="guide-section">
        <h3>Rank Climb Progression</h3>
        ${list(sections.climb)}
      </article>

      <div class="guide-dual">
        <article class="guide-section">
          <h3>Common Mistakes</h3>
          ${list(sections.mistakes)}
        </article>
        <article class="guide-section">
          <h3>Practice Drills</h3>
          ${list(sections.drills)}
        </article>
      </div>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderJungleTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role], [data-learn-mode], [data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderJungleTheory = renderJungleTheory;
  scheduleRender();
})();
