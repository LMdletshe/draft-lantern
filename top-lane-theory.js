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
      "Treat top lane as a repeated decision game, not one isolated duel. Every trade changes the next wave, recall, jungle window, and side-lane state.",
      "Use a minimax trade rule: choose the line with the best guaranteed outcome if the opponent responds well, not the line with the flashiest best case.",
      "Short trade when you have a temporary cooldown, range, level, or item edge and the wave will not punish you.",
      "Extended trade or all-in only when you also win the continuation: minion wave, jungle context, escape route, crash, and recall outcome.",
      "Do nothing when upside is small and downside is catastrophic. Passing a bad trade is an active decision.",
      "Randomize your trade timing, brush usage, ward timing, and fake recall frequency enough that the opponent cannot read one repeated pattern."
    ],
    macro: [
      "Evaluate actions by the future state they create: crash into recall, slow push into roam, freeze into denial, hard shove into tempo.",
      "A freeze is a commitment device: it forces the opponent to walk into dangerous last-hits. It is strongest when you win trades on approach or have jungle cover.",
      "A slow push commits you to a future crash that can buy recall timing, deep vision, a dive, Herald cover, or a teleport setup.",
      "A hard shove is a tempo grab. Convert the time into a ward, reset, plate, roam, objective hover, or jungle cover.",
      "A neutral hold preserves optionality when jungle information is poor or both champions can punish overcommitment.",
      "Side-lane pressure only counts if the enemy answer costs them something and you survive the collapse. Pressure without information is gambling."
    ],
    responsibilities: [
      "Track the lane as a sequence of states: HP, cooldowns, wave size, recall timers, jungle probability, teleport status, and objective timer.",
      "Separate patch-resilient fundamentals from patch-sensitive details. Waves, spacing, tempo, vision, and tradeoffs stay; objective numbers and teleport rules change.",
      "Create side pressure before objectives, then decide whether teleport, grouping, or forcing an answer gives the highest team value.",
      "Use visible posture as signaling: walking forward, holding cooldowns, starting recall, warding on vision, and hovering river all communicate intent.",
      "Maintain probabilities for jungle location instead of binary guesses. Unknown jungle plus extended wave equals high risk until proven otherwise.",
      "Ask which state transition raises team win probability most, not only whether you can beat the enemy top in lane."
    ],
    mistakes: [
      "Choosing a high-upside all-in that loses the wave, recall, or jungle continuation if it fails.",
      "Freezing when you cannot punish the enemy's approach or when your team needs your crash timing elsewhere.",
      "Slow-pushing without a plan for the crash, then giving the opponent a clean reset or gank angle.",
      "Teleporting because a fight started, not because your arrival changes the fight odds and the side-lane cost is recoverable.",
      "Warding randomly instead of placing vision to answer the next decision that matters.",
      "Showing on side wave before a major objective when fog pressure would create more value."
    ],
    climb: [
      "Iron to Bronze: reduce catastrophic downside. Stop taking extended trades with unknown jungle and bad waves.",
      "Silver to Gold: learn wave commitments. Freeze to deny, slow-push to crash, hard shove to create tempo, neutral hold when information is bad.",
      "Platinum to Emerald: connect lane states to objective states. Push first, move first, reset first, or trade cross-map deliberately.",
      "Diamond and above: manage information and mixed strategies. Make your timing less predictable while reading the opponent's signals and recall incentives.",
      "High-level default: play stable patterns first, then add mind games. A clever play that loses to the obvious response is not a good play."
    ],
    drills: [
      "Before each trade, say the reason: cooldown edge, level spike, item edge, minion advantage, or enemy mistake.",
      "After each wave, classify the state: freeze, slow push, hard shove, neutral hold, bounce, or crash.",
      "Review every death and label the failed variable: wave, jungle information, cooldown tracking, spacing, recall timing, or objective timer.",
      "Practice the top-lane action checklist: crash and recall, freeze, all-in, short trade, thin and ward, or hold spacing.",
      "Before teleporting, answer three questions: will I arrive before first contact, what side-lane value do I lose, and what objective does this win?",
      "When ahead, test whether your side pressure forces a high-cost answer. If not, convert your lead through grouped objectives instead."
    ],
    matchupClasses: [
      { title: "Early bully vs scaler", text: "Treat it as a repeated game with different time horizons. Deny early, but avoid dives that flip the lane back. Examples: Renekton, Darius, Jayce, or Pantheon pressuring Kayle, Nasus, Ornn, Jax, or Camille." },
      { title: "Ranged harass vs melee all-in", text: "Track cooldowns and wave length. The melee player needs brush, minion cover, or a baited gap-close window. Examples: Teemo, Quinn, Jayce, Vayne, or Gnar into Irelia, Tryndamere, Jax, Riven, or Kled." },
      { title: "Sustain tank vs attrition bruiser", text: "Preserve health floor and recall value. Overtrading into sustain resets usually loses the resource game. Examples: Dr. Mundo, Sion, Cho'Gath, Ornn, or Tahm Kench into Aatrox, Mordekaiser, Darius, Illaoi, or Sett." },
      { title: "Split pusher vs teamfighter", text: "This is a future-state problem. Side pressure is correct only when the enemy answer cost is higher than your grouping value. Examples: Fiora, Jax, Tryndamere, Yorick, or Camille against Malphite, Ornn, Kennen, Rumble, or Gnar." },
      { title: "Proxy or roam specialist vs freeze punisher", text: "Leave lane only after banking tempo. Roaming while the wave punishes you is usually fake pressure. Examples: Singed, Sion, Quinn, Shen, or Pantheon trying to move against Darius, Sett, Irelia, Renekton, or Olaf holding punish freezes." },
      { title: "Volatile kill lane vs volatile kill lane", text: "Use mixed timing and downside protection. Repeating the same all-in timing becomes exploitable. Examples: Riven, Irelia, Fiora, Camille, Jax, Tryndamere, Yone, Aatrox, Kled, or Gwen in snowball-heavy skill matchups." }
    ],
    decisionRules: [
      "If you want to recall and can crash cleanly: hard shove and recall.",
      "If the best future state is denial and you can protect it: freeze.",
      "If edge minus risk is large and the reward converts into wave, plate, tower, or objective: all-in.",
      "If you have a short-lived edge and the wave is safe: short trade.",
      "If jungle probability is high and the wave is extended: thin the wave, ward, and protect the bounce.",
      "If none of those are true: hold spacing and last-hit. Not every wave requires a play."
    ],
    macroRules: [
      "Teleport to an objective when your arrival materially changes fight odds and the side-lane cost is recoverable.",
      "Hold teleport when side pressure creates more value than joining or when arrival is too late to affect first contact.",
      "Mirror an enemy side-lane threat when ignoring it collapses your structure or wave economy.",
      "Place vision to answer a decision in the next 20-60 seconds, not because the trinket is available.",
      "Visible wards are signals. If the enemy sees the ward, assume they update their pathing too.",
      "Contest objectives when lane priority, cooldowns, health, and arrival timing beat the enemy's setup; otherwise trade opposite side immediately."
    ]
  };

  function list(items, className = "") {
    return `<ul class="guide-list ${className}">${items.map((item) => `<li>${safeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderTopLaneTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || roleTab?.dataset.guideRole !== "Top" || modeTab?.dataset.learnMode !== "roles") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Top Lane Game Theory</p>
          <h3>Play the lane as a repeated information game: waves, trades, recalls, vision, teleport, and objectives all change the next state.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose actions by future value, not immediate damage. The correct top-lane decision is the one that improves the next wave, recall, side-lane, or objective state.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Trade like a minimax player</h3>
          ${list(sections.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Use waves as commitments</h3>
          ${list(sections.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Decision Tree</p>
        <h3>Default action rules</h3>
        ${list(sections.decisionRules, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Matchup Classes</p>
        <h3>Think in strategic types before champion names</h3>
        <div class="team-principles">
          ${sections.matchupClasses.map((item, index) => `
            <div class="team-principle">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>${safeHtml(item.title)}</strong>
                <p>${safeHtml(item.text)}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Teleport, Vision, Objectives</p>
        <h3>Turn side lane into team value</h3>
        ${list(sections.macroRules)}
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Responsibilities</p>
          <h3>Your non-negotiables</h3>
          ${list(sections.responsibilities, "guide-list--checks")}
        </section>
        <section class="guide-section guide-section--warning">
          <p class="eyebrow">Common Mistakes</p>
          <h3>Decisions that lose pressure</h3>
          ${list(sections.mistakes)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Role Climb Path</p>
        <h3>What to master next</h3>
        ${list(sections.climb, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Practice Routine</p>
        <h3>Repeatable drills that improve top lane</h3>
        ${list(sections.drills)}
      </section>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderTopLaneTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role]") || event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderTopLaneTheory = renderTopLaneTheory;
  scheduleRender();
})();
