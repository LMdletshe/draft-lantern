(function () {
  const safeHtml = typeof escapeHtml === "function"
    ? escapeHtml
    : (value) => String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        "&gt;": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      })[character]);

  const sections = {
    micro: [
      "Treat jungle as a repeated information game. Every clear, reveal, gank, reset, invade, and objective changes the next board state.",
      "Judge plays by value after the next reset, not by whether a kill looks possible right now.",
      "A good gank starts from lane state: wave position, allied setup, enemy escape route, HP, cooldowns, summoners, and enemy jungle timing.",
      "Fight the enemy jungler only when lane access, item or level edge, cooldown edge, and exit route are favorable.",
      "Smite is the last input, not the full secure. First win access, zoning, burst timing, and turn threat.",
      "Passing on a low-value gank is active discipline. Use the saved time to clear, reset, track, cover, or trade cross-map."
    ],
    macro: [
      "Your first clear is an opening strategy, not a script. Route toward the lane, river, reset, or objective state your team can actually use.",
      "Route value = farm tempo + lane conversion + information gained + future objective leverage - duel risk - lost opposite-side resources - delayed reset spike.",
      "Mirror when the enemy's obvious play can be punished by arriving first in fog. Cross-map when contesting loses more than trading camps, plates, dive pressure, or tower damage.",
      "Objectives are board-state converters, not trophies. Take them when the next map state is better than the trade you give up.",
      "Baron is threat first and monster second. Use it to force bad face-checks; do not start just because it is alive.",
      "If you cannot contest, do not simply leave. Immediately convert the opposite side into camps, vision, plates, tower pressure, a dive, or a reset lead."
    ],
    responsibilities: [
      "Track lane priority, wave direction, key cooldowns, summoner spells, item timing, objective timers, camp availability, fog ownership, and turn-vs-secure state.",
      "Keep a probability map for the enemy jungler instead of binary guesses. You only need enough certainty to avoid bad blind plays.",
      "Convert initiative fast: kill into wave crash, crash into invade, invade into objective access, objective access into vision, vision into pick or denial.",
      "Choose between covering weak side and snowballing strong side by asking which move creates the stronger next state.",
      "Your value often appears through allies: saved waves, denied dives, protected recalls, lane tempo, vision control, and forced enemy pathing mistakes.",
      "Separate evergreen fundamentals from patch details. Tracking, priority, counterganks, fog pressure, and objective access last longer than exact clears or tier lists."
    ],
    mistakes: [
      "Following a memorized clear after lanes already changed.",
      "Ganking because you are nearby instead of because the wave, setup, and exit make the play high value.",
      "Starting objectives with no lane move, no fog control, no turn threat, and no answer to the enemy collapse.",
      "Hovering mid too long while camps respawn and no wave state changes.",
      "Repeating bot ganks because two kills are possible while ignoring wave timing, brush control, and dragon setup.",
      "Diving with unknown exit route or unknown countergank timing.",
      "Taking a jungle duel because the matchup should win while ignoring lane priority and missing information."
    ],
    openingQuestions: [
      "Which lane is most convertible if I spend time there?",
      "Which enemy lane is most punishable by wave position, mobility, summoner spells, or setup weakness?",
      "Who wins equal-number river fights before first reset?",
      "Which side hosts the more valuable first contest for our comp?",
      "What information changes my route: leash, late lane arrival, ward reveal, wave posture, or enemy camp reveal?"
    ],
    trackingRules: [
      "Use leash, late lane arrivals, warded entrances, lane posture, scuttle timing, and first reveal to shrink enemy route options.",
      "When the enemy appears, ask which quadrant is down, what camp sequence is likely next, and which lane they can reach before you.",
      "If a lane plays far forward without vision, update enemy jungle probability toward that side unless stronger information says otherwise.",
      "An uncontested scuttle, missing camp, or strange recall timing is information about where the enemy can and cannot be.",
      "Perfect tracking is not required. You need enough confidence to avoid bad blind fights and take cleaner trades."
    ],
    objectiveRules: [
      "Objective value = reward + next-state access + denial value - camp loss - wave loss - death risk - steal risk - opposite-side concession.",
      "Early dragons are tempo objectives. Take them when lanes can move, your champion finishes safely, and the enemy cannot trade more elsewhere.",
      "Soul point and soul fights are setup objectives. Recall early, place vision first, hold turn threat, and make enemies enter your controlled area.",
      "Herald and structures can beat early dragon when they create plates, tower pressure, side control, or repeat invade access.",
      "Baron is best when the enemy's only winning line is walking into a losing corridor. If you cannot turn before secure, the start may help them.",
      "Check current Smite breakpoints in-game, but keep the principle stable: synchronize burst and zoning before trusting the button."
    ],
    climb: [
      "Iron to Bronze: clear consistently, stop random river deaths, gank only lanes with setup or overextension, and spend gold on time.",
      "Silver to Gold: track first clear direction, punish visible routes, convert kills into camps or objectives, and stop starting dragons with losing lanes.",
      "Platinum to Emerald: path from lane states, shadow predictable ganks, trade cross-map cleanly, and review every failed objective setup.",
      "Diamond to Master: control tempo through reset timing, fog ownership, lane-priority sequencing, and turn-threat discipline.",
      "Master and above: win through prediction and denial. Force lower-value enemy routes, hide your own options, and convert small timing edges cleanly."
    ],
    drills: [
      "Before queue, choose a default first route and two conditions that change it.",
      "After first reset, write one action that created value and one action that lost value.",
      "Before each objective, check recalls, lane priority, vision, enemy route, and cross-map trade.",
      "Label every gank as wave-supported, cooldown-supported, information-supported, or forced. Forced ganks should become rare.",
      "After every enemy jungle reveal, predict their next quadrant before looking at the outcome."
    ]
  };

  const targetFramework = [
    { title: "Top lane", text: "Good when the lane is long, enemy is extended, wave can freeze or stack, and enemy jungle route is readable. Convert into Herald, plates, weak-side release, or camp denial. Examples: Jarvan IV, Sejuani, Elise, Rek'Sai, or Lee Sin ganking for Renekton, Darius, Camille, Jax, or Irelia setup." },
    { title: "Mid lane", text: "Good with allied push, setup CC, enemy Flash down, or a route that preserves tempo. Convert into river control, raptor invade, dragon access, or side-lane move. Examples: Vi, Xin Zhao, Nocturne, Lillia, or Maokai pairing with Ahri, Annie, Lissandra, Galio, or Twisted Fate." },
    { title: "Bot lane", text: "Good when allied wave creates a 3v2 or dive, support can move, and the play links to dragon or first tower. Avoid coinflips just because two kills are possible. Examples: Zac, Rammus, Amumu, Jarvan IV, or Nocturne attacking with Nautilus, Leona, Thresh, Rakan, or Ashe setup." },
    { title: "Enemy jungler", text: "Good with first move, item or level edge, known cooldown edge, and nearby lanes that arrive first. Convert into camp denial, tempo lead, or forced objective control. Examples: Kindred, Graves, Nidalee, Lee Sin, or Xin Zhao invading Amumu, Karthus, Fiddlesticks, Shyvana, or Evelynn when lanes can move." },
    { title: "Countergank", text: "Good when enemy prey is obvious, your ally can bait safely, and you arrive first in fog. Convert into a tempo swing, objective access, or collapsed enemy route. Examples: Poppy, Ivern, Maokai, Sejuani, or Wukong shadowing obvious Lee Sin, Elise, Jarvan IV, Nocturne, or Zac gank paths." }
  ];

  const archetypes = [
    { title: "Early gank utility", text: "Creates lane tempo before first contest. Wants 3-4 camp or side-skewed routes, lane setup, and early access through priority. Examples: Jarvan IV, Elise, Lee Sin, Rek'Sai, Nunu, Xin Zhao." },
    { title: "Farming fighter", text: "Converts camp efficiency into level and item pressure. Wants high-camp routes, river 1v1 strength, and first access to neutrals. Examples: Graves, Viego, Bel'Veth, Master Yi, Udyr, Diana." },
    { title: "Tank engage", text: "Turns structured fights with reliable initiation and frontline value. Wants safe clear or hover routes into lanes that can follow. Examples: Sejuani, Amumu, Zac, Rammus, Maokai, Skarner." },
    { title: "Assassin pick", text: "Uses fog and isolated targets before objectives. Wants angles, flank paths, and picks instead of front-door starts. Examples: Kha'Zix, Rengar, Evelynn, Shaco, Kayn, Nocturne." },
    { title: "AP control", text: "Wins through clear-to-positioning, choke control, anti-engage, poke, and objective-zone setup. Examples: Fiddlesticks, Karthus, Lillia, Brand, Taliyah, Morgana." },
    { title: "Countergank utility", text: "Wins by reading the enemy first. Wants mirror routes, shadow timings, disengage, peel, and follow-up around likely attacks. Examples: Ivern, Poppy, Trundle, Maokai, Nunu, Sejuani." }
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

  function renderJungleTheory() {
    const content = document.querySelector("#learnGuideContent");
    const roleTab = document.querySelector(".role-guide-tab.is-active");
    const modeTab = document.querySelector(".learn-mode-tab.is-active");
    if (!content || roleTab?.dataset.guideRole !== "Jungle" || modeTab?.dataset.learnMode !== "roles") return;

    content.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Jungle Game Theory</p>
          <h3>Play the map as a repeated information game: clears, ganks, tracking, resets, fog, and objectives all change the next state.</h3>
        </div>
        <p><strong>Primary focus:</strong> choose routes by future value, not immediate action. The correct jungle decision is the one that improves the next lane, camp, vision, reset, or objective state.</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Gank and fight from information</h3>
          ${list(sections.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Route for the next board state</h3>
          ${list(sections.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Opening Plan</p>
        <h3>Loading screen route questions</h3>
        ${list(sections.openingQuestions, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Target Selection</p>
        <h3>Think in conversion types before chasing kills</h3>
        <div class="team-principles">
          ${renderPrinciples(targetFramework)}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Champion Classes</p>
        <h3>Pick a route that fits your jungle identity</h3>
        <div class="team-principles">
          ${renderPrinciples(archetypes)}
        </div>
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Tracking</p>
          <h3>Shrink the enemy route tree</h3>
          ${list(sections.trackingRules, "guide-list--checks")}
        </section>
        <section class="guide-section">
          <p class="eyebrow">Objectives</p>
          <h3>Secure access before Smite</h3>
          ${list(sections.objectiveRules)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Dive Rule</p>
        <h3>Only dive when the continuation is already won</h3>
        <p>A dive is high value only when the allied wave grants time, allied damage finishes before turret aggro flips the fight, the exit route is known, and the enemy jungler cannot counter-arrive or still loses if they do. If one condition is unknown, hover the crash, take vision, and deny the next play instead.</p>
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

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Practice Routine</p>
        <h3>Repeatable drills that improve jungle</h3>
        ${list(sections.drills)}
      </section>
    `;
  }

  function scheduleRender() {
    window.setTimeout(renderJungleTheory, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-guide-role]") || event.target.closest("[data-learn-mode]") || event.target.closest("[data-view='learnView']")) {
      scheduleRender();
    }
  });

  window.renderJungleTheory = renderJungleTheory;
  scheduleRender();
})();
