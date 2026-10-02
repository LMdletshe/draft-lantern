(function () {
  const fallbackRoles = ["Top", "Jungle", "Mid", "ADC", "Support"];
  const guideRoles = typeof roles !== "undefined" ? roles : fallbackRoles;
  const safeHtml = typeof escapeHtml === "function"
    ? escapeHtml
    : (value) => String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      })[character]);

  const fundamentalsByRank = [
    {
      tier: "Iron to Bronze",
      goal: "Stop losing games to avoidable deaths and missed income.",
      habits: [
        "Look at the minimap before every wave and before walking past river.",
        "Recall when you can buy a meaningful item instead of staying on low health for one more wave.",
        "Fight only when your key spell is available and a teammate can actually follow.",
        "After a kill, take the guaranteed wave, plate, camp, or objective before chasing."
      ]
    },
    {
      tier: "Silver to Gold",
      goal: "Convert lane actions into map value instead of playing isolated fights.",
      habits: [
        "Crash the wave before roaming, warding, recalling, or starting an objective.",
        "Track the enemy jungler from visible starts, camp timers, and lane movement.",
        "Use pings early: danger before the play, on-my-way before moving, retreat after the reward is taken.",
        "Respect item and level spikes; a level-six or completed-item fight is not the same fight as thirty seconds earlier."
      ]
    },
    {
      tier: "Platinum to Emerald",
      goal: "Win with tempo, vision control, and repeatable decisions.",
      habits: [
        "Reset before major objectives so you arrive with items, wards, health, and cooldowns.",
        "Move with the player who has priority; do not invade or ward deep when nearby lanes cannot move.",
        "Trade sides deliberately when contesting is low percentage.",
        "Identify the fight condition before grouping: engage first, peel, poke, pick, split, or front-to-back."
      ]
    },
    {
      tier: "Diamond and above",
      goal: "Reduce variance and punish small timing errors consistently.",
      habits: [
        "Track tempo windows: who reset first, who can move first, who loses a wave by moving.",
        "Deny information before objectives, then force the enemy to choose between face-checking and surrendering space.",
        "Hold critical cooldowns for the enemy's real win condition instead of spending them on low-value targets.",
        "Review deaths by cause: wave state, vision, cooldown tracking, spacing, objective timing, or greed."
      ]
    }
  ];

  const roleGuides = {
    Top: {
      identity: "Manage the isolated lane, create side-lane pressure, and arrive at decisive fights on useful timings.",
      focus: "Wave control, trading discipline, matchup knowledge, side-lane pressure, and teleport timing.",
      micro: [
        "Trade around the enemy's important cooldowns instead of exchanging damage at random.",
        "Use the minion advantage: avoid fighting inside a large enemy wave and punish when your wave is larger.",
        "Keep enough health to protect the next wave. Winning one trade is not useful if you must immediately recall.",
        "Position between the enemy and the wave only when you know the jungler cannot punish you.",
        "Track level spikes. Level two, three, six, and first completed item often decide whether a trade is legal."
      ],
      macro: [
        "Before pushing past the river, account for the enemy jungler and the next objective.",
        "Build a slow push when you want time to recall, roam, invade, or prepare a teleport play.",
        "In mid game, occupy the side lane opposite the next major objective when teleport is available.",
        "Join early when your team needs your engage; keep splitting when your team can safely avoid a fight.",
        "If you draw two enemies side lane and survive, your team should take space elsewhere. If you die, the pressure failed."
      ],
      responsibilities: ["Keep side waves controlled", "Track the enemy top laner's movement", "Provide frontline, engage, or split pressure", "Save teleport for meaningful map plays", "Know when grouping is more valuable than one extra wave"],
      phases: {
        Early: "Protect your first three waves, learn the opponent's trading pattern, and avoid dying to the first jungle path.",
        Mid: "Push a safe side wave before moving. Arrive at dragon or Herald with resources spent and a clear job.",
        Late: "Do not show deep in a side lane without vision. Decide whether your team needs your body in the fight or your pressure elsewhere."
      },
      climb: [
        "Low elo: stop dying to obvious ganks while pushing without vision.",
        "Gold+: use wave crashes to recall first or move first.",
        "Emerald+: control side-lane tempo without missing objective timers.",
        "High elo: force numbers advantages by making the enemy answer waves at bad times."
      ],
      drills: ["Practice last-hitting under tower", "Review the first death of every lane", "Pause before teleport and ask what objective it wins", "Count enemy jungle paths before crossing river"],
      mistakes: ["Teleporting after a fight is already lost", "Perma-pushing with no jungle information", "Leaving side waves to group without purpose", "Fighting in large enemy waves", "Grouping while a free side wave dies to tower"]
    },
    Jungle: {
      identity: "Convert information and lane pressure into efficient paths, favorable fights, and secured objectives.",
      focus: "Pathing, camera movement, tracking, objective setup, tempo, and choosing high-percentage plays.",
      micro: [
        "Kite camps toward the next destination to save time and health.",
        "Use crowd control after a teammate's setup when possible instead of stacking both abilities at once.",
        "Enter fights from angles that threaten the backline without abandoning your own carries.",
        "Save Smite for the objective threshold unless using it creates a clearly winning fight.",
        "Gank through the escape route when possible; entering from the obvious river angle often gives the target a free exit."
      ],
      macro: [
        "Choose the first clear from lane matchups: path toward lanes that can assist or are likely to be volatile.",
        "Track the enemy jungler from their start, visible camps, lane arrival times, and missing objectives.",
        "Trade sides of the map when contesting is unrealistic; take camps, plates, vision, or the opposite objective.",
        "Recall before objectives so wards, health, items, and Smite are ready when setup begins.",
        "Cover a crashing wave when your laner dies or recalls. Saving the wave can be more valuable than a low-odds gank."
      ],
      responsibilities: ["Track both junglers' likely positions", "Play around lanes with priority", "Control neutral objectives", "Cover vulnerable waves and punish overextension", "Choose the highest percentage play instead of the loudest ping"],
      phases: {
        Early: "Follow a deliberate first path. Gank when the lane state creates a real opportunity, not merely because a teammate asks.",
        Mid: "Link camps to objectives and active lanes. Place vision, clear an area, then start or threaten the objective.",
        Late: "Avoid face-checking alone or dying before an objective. Your survival and Smite often matter more than one extra camp."
      },
      climb: [
        "Low elo: full clear efficiently and stop forcing ganks into bad waves.",
        "Gold+: track enemy jungle starts and punish the opposite side when they show.",
        "Emerald+: sync recalls with objective setup and lane priority.",
        "High elo: use tempo to deny camps, cover dives, and force cross-map trades."
      ],
      drills: ["Predict enemy jungle position every minute", "Review failed ganks for lane state", "Practice first clear speed", "Ping objective setup 60 seconds early"],
      mistakes: ["Forcing ganks with no setup", "Starting objectives while nearby lanes are losing priority", "Repeating a failed play instead of trading the map", "Dying before Smite objectives", "Ignoring crashing waves"]
    },
    Mid: {
      identity: "Control the center of the map, manage wave priority, and connect safely to jungle and side-lane plays.",
      focus: "Spacing, wave clear, roam timing, vision angles, threat management, and tempo.",
      micro: [
        "Stand diagonally from the enemy so one skillshot cannot hit both you and the wave.",
        "Use abilities with a purpose: secure priority, punish a cooldown, or prepare a kill rather than spending all mana on harmless poke.",
        "Hold key crowd control when an assassin still has their movement ability.",
        "Respect fog-of-war angles after the enemy support or jungler disappears.",
        "Keep the wave in a state that supports your champion: control mages want space, assassins want all-in windows, roamers want crash timers."
      ],
      macro: [
        "Push the wave before roaming; leaving a wave without a strong reason gives away gold and your tower.",
        "Use priority to move with your jungler, establish river vision, or threaten a side lane.",
        "After the first towers fall, take the safe lane your team composition requires and keep mid wave covered.",
        "Move before objectives spawn instead of clearing one unnecessary extra wave.",
        "When you cannot roam, make the enemy lose something by crashing the wave or damaging tower."
      ],
      responsibilities: ["Maintain central wave control", "Support jungle contests", "Communicate enemy roams", "Provide damage, engage, pick, or zone control", "Protect mid tower because it controls jungle entrances"],
      phases: {
        Early: "Balance trading with wave control. Keep enough health and mana to move when the jungler contests river.",
        Mid: "Catch waves, then disappear from vision with teammates. The threat of a move can be as valuable as the move itself.",
        Late: "Protect your position and major cooldowns. Clear safely, then fight from an angle suited to your champion."
      },
      climb: [
        "Low elo: stop roaming on bad waves and missing free farm.",
        "Gold+: move with jungle priority instead of wandering alone.",
        "Emerald+: hide on timers after pushing mid to create pressure without committing.",
        "High elo: use wave states to force the enemy mid to choose between farm, vision, and tempo."
      ],
      drills: ["Review every roam: did the wave justify it?", "Track missing support timings", "Practice last-hitting while trading", "Call jungle skirmishes before they happen"],
      mistakes: ["Roaming on a bad wave", "Using the escape or control spell for minor poke", "Walking into an unwarded river alone", "Letting mid tower fall for a low-value side move", "Ignoring enemy support roams"]
    },
    ADC: {
      identity: "Generate reliable damage while staying alive long enough for repeated attacks to decide the fight.",
      focus: "Last-hitting, spacing, target access, threat tracking, item timing, and safe resource collection.",
      micro: [
        "Attack the safest valuable target; walking through danger to reach a carry usually lowers your total damage.",
        "Track the enemy abilities that can reach you and step forward only after those threats are used or controlled.",
        "Use attack-move and short movement inputs so attacking does not lock you in place unnecessarily.",
        "Preserve health before an all-in. A small trade is bad when it removes your ability to contest the next wave.",
        "Before fights, name the enemy spell that kills you. Your positioning should answer that spell first."
      ],
      macro: [
        "Take the safest available farm after lane phase, usually the central wave when your team can protect it.",
        "Push a wave before rotating, but do not remain for one more wave when the objective setup has started.",
        "Recall on item completion timings and before objectives rather than arriving with unspent gold.",
        "Stand near peel and vision; do not enter dark jungle corridors first.",
        "If no one can protect mid, collect the closest safe side wave and rejoin before the fight window."
      ],
      responsibilities: ["Maintain consistent farm", "Survive the first enemy engage", "Damage reachable targets", "Help take towers and neutral objectives quickly", "Communicate when key threats are missing or used"],
      phases: {
        Early: "Prioritize clean farm and favorable two-versus-two trades. Match recalls so you do not return to a broken wave.",
        Mid: "Collect safe waves and rotate with support. Avoid isolated side-lane farming unless threats are visible.",
        Late: "Fight front to back, preserve mobility, and reposition after every major enemy cooldown."
      },
      climb: [
        "Low elo: improve farm and stop taking isolated deaths before objectives.",
        "Gold+: recall on item spikes and avoid fighting with unspent gold.",
        "Emerald+: track engage cooldowns and deal damage only from legal positions.",
        "High elo: manage waves and fog so you collect resources without giving engage angles."
      ],
      drills: ["Practice 10-minute CS benchmarks", "Review every death before objective spawn", "Call the spell that kills you before each fight", "Kite front-to-back in practice tool"],
      mistakes: ["Chasing the enemy backline through frontline", "Farming alone while opponents are missing", "Using mobility aggressively before the fight starts", "Arriving to objectives with unspent gold", "Standing where one flank wins the whole fight"]
    },
    Support: {
      identity: "Create safe information, protect or start plays, and make the map easier for teammates to use.",
      focus: "Lane positioning, vision timing, roam windows, cooldown tracking, tempo, and fight setup.",
      micro: [
        "Stand parallel with your ADC so both players can trade when one enemy steps forward.",
        "Threaten key abilities without immediately casting them; holding a hook or shield changes how opponents can move.",
        "Use brush control to drop enemy vision and create repeated pressure.",
        "In fights, identify whether your job is engage, peel, or follow-up before committing.",
        "Do not spend defensive cooldowns on poke if the enemy still has their real engage available."
      ],
      macro: [
        "Roam after pushing the wave, after a recall, or when the ADC can farm safely; do not abandon a frozen lane.",
        "Move with the jungler to establish vision rather than warding deep alone.",
        "Refresh objective vision before the spawn timer, then recall to replace wards and return with the team.",
        "Shadow the teammate applying pressure and keep escape routes or flank paths visible.",
        "Deny vision in layers: river first, then entrances, then deeper wards only when teammates can cover."
      ],
      responsibilities: ["Control and deny vision", "Track engage and defensive cooldowns", "Protect vulnerable carries", "Start or support coordinated map plays", "Make objective entrances safe before carries arrive"],
      phases: {
        Early: "Contest lane space with your ADC, identify the level-two timing, and ward according to the likely jungle path.",
        Mid: "Connect lanes and jungle through vision. Use roam windows to create numbers advantages without sacrificing your ADC.",
        Late: "Prepare objectives with teammates, protect approach routes, and avoid being caught while placing the final ward."
      },
      climb: [
        "Low elo: stop face-checking and stop roaming while the ADC loses a frozen wave.",
        "Gold+: time wards around objective spawns instead of placing them randomly.",
        "Emerald+: move with jungle and mid to create safe fog control.",
        "High elo: manage vision tempo so the enemy must face-check on your terms."
      ],
      drills: ["Ward 60-45 seconds before objectives", "Review every death while warding", "Track level two every lane", "Name your fight job before engaging"],
      mistakes: ["Warding alone with no information", "Roaming while the ADC is trapped under tower", "Engaging when the team cannot reach the target", "Using peel before the real dive starts", "Leaving objective vision too late"]
    }
  };

  const teamPlayGuide = {
    principles: [
      { title: "Information before commitment", text: "Count visible enemies, check major cooldowns, and identify who can arrive before starting a fight or objective." },
      { title: "Waves create time", text: "Push nearby lanes before objectives. An enemy must answer the wave or surrender gold, tower damage, and map position." },
      { title: "Spend before fighting", text: "Coordinate recalls so the team arrives with completed items, health, wards, and objective tools." },
      { title: "One clear win condition", text: "Agree whether the composition wants engage, front-to-back fights, picks, poke, or split pressure, then avoid plays that contradict it." },
      { title: "Vision is a team action", text: "Deep vision is only safe after lane priority. If teammates cannot move, ward defensively and preserve tempo." },
      { title: "Review deaths, not losses", text: "Most improvement comes from understanding the first avoidable death or the decision that gave away objective control." }
    ],
    micro: [
      "Layer crowd control instead of overlapping every disabling ability.",
      "Focus the same reachable target and announce target changes early.",
      "Protect important damage dealers without stacking so closely that one ability hits everyone.",
      "Track and communicate game-changing ultimates, summoner spells, and defensive items.",
      "Disengage after winning a trade when continuing would turn the fight into a coin flip.",
      "Before entering fog, decide who can safely walk first. Carries should not be the vision tool."
    ],
    macro: [
      "Assign lanes so every safe wave is collected without leaving the objective side empty.",
      "Move vision forward only after gaining lane priority; retreat vision when pressure is lost.",
      "Trade objectives when contesting would require a late, blind entrance.",
      "Create numbers advantages by moving together through fog rather than showing five players in one lane.",
      "After a won fight, take the highest guaranteed reward, then reset before opponents respawn.",
      "When ahead, reduce randomness: push waves, deny vision, force face-checks, take guaranteed objectives."
    ],
    phases: {
      Early: ["Track the first jungle paths", "Protect vulnerable lanes and camps", "Contest only when nearby lanes can move", "Use early leads for plates, camps, or the first objective"],
      Mid: ["Push side and mid waves before grouping", "Set vision 45-60 seconds before objectives", "Use picks to create safe objectives", "Avoid splitting recalls across the team"],
      Late: ["Do not enter dark areas one at a time", "Keep the main damage source protected", "Manage side waves before Baron or Elder", "Convert one won fight into the game-ending objective"]
    },
    calls: [
      { call: "Objective", meaning: "Push lanes, spend gold, establish vision, and arrive together before spawn." },
      { call: "Reset", meaning: "Stop extending, recall together, buy, and return without giving the enemy a numbers advantage." },
      { call: "Trade", meaning: "Do not contest the enemy's play; immediately take value elsewhere." },
      { call: "Turn", meaning: "Stop hitting the objective and focus the approaching enemy team." },
      { call: "Disengage", meaning: "Break contact together and preserve the lead instead of chasing." },
      { call: "No flash", meaning: "Mark a target as punishable for the next five minutes and path vision around that side." }
    ],
    review: [
      "First death: what information was ignored?",
      "First objective lost: were waves pushed and recalls synchronized?",
      "Big teamfight lost: did the team use the correct fight pattern for its comp?",
      "Lead thrown: did the team chase kills instead of taking guaranteed map value?",
      "Low impact game: was farm missed, tempo wasted, or pressure applied on the wrong side?"
    ]
  };

  let activeLearnMode = "roles";
  let activeLearnRole = "Top";
  const roleGuideControls = document.querySelector("#roleGuideControls");
  const learnGuideContent = document.querySelector("#learnGuideContent");
  if (!roleGuideControls || !learnGuideContent) return;

  function guideList(items, className = "") {
    return `<ul class="guide-list ${className}">${items.map((item) => `<li>${safeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderRankLadder() {
    return `
      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Climb Framework</p>
        <h3>What changes as the games get harder</h3>
        <div class="team-principles">
          ${fundamentalsByRank.map((band, index) => `
            <div class="team-principle">
              <span>0${index + 1}</span>
              <div>
                <strong>${safeHtml(band.tier)}: ${safeHtml(band.goal)}</strong>
                ${guideList(band.habits)}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderRoleGuide() {
    const guide = roleGuides[activeLearnRole] || roleGuides.Top;
    roleGuideControls.innerHTML = guideRoles.map((role) => `
      <button
        class="role-guide-tab ${role === activeLearnRole ? "is-active" : ""}"
        type="button"
        data-guide-role="${safeHtml(role)}"
        role="tab"
        aria-selected="${role === activeLearnRole}"
      >${safeHtml(role)}</button>
    `).join("");

    learnGuideContent.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">${safeHtml(activeLearnRole)} Fundamentals</p>
          <h3>${safeHtml(guide.identity)}</h3>
        </div>
        <p><strong>Primary focus:</strong> ${safeHtml(guide.focus)}</p>
      </header>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Micro</p>
          <h3>Control your champion</h3>
          ${guideList(guide.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Macro</p>
          <h3>Control your map impact</h3>
          ${guideList(guide.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Game Timeline</p>
            <h3>What changes through the match</h3>
          </div>
        </div>
        <div class="guide-phases">
          ${Object.entries(guide.phases).map(([phase, text]) => `
            <div class="guide-phase">
              <span>${safeHtml(phase)}</span>
              <p>${safeHtml(text)}</p>
            </div>
          `).join("")}
        </div>
      </section>

      <div class="guide-dual guide-dual--compact">
        <section class="guide-section">
          <p class="eyebrow">Responsibilities</p>
          <h3>Your non-negotiables</h3>
          ${guideList(guide.responsibilities, "guide-list--checks")}
        </section>
        <section class="guide-section guide-section--warning">
          <p class="eyebrow">Common Mistakes</p>
          <h3>Decisions that lose pressure</h3>
          ${guideList(guide.mistakes)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Role Climb Path</p>
        <h3>What to master next</h3>
        ${guideList(guide.climb, "guide-list--checks")}
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Practice Routine</p>
        <h3>Repeatable drills that improve this role</h3>
        ${guideList(guide.drills)}
      </section>
    `;
  }

  function renderTeamGuide() {
    roleGuideControls.innerHTML = "";
    learnGuideContent.innerHTML = `
      <header class="guide-intro">
        <div>
          <p class="eyebrow">Five Players, One Plan</p>
          <h3>Turn individual advantages into coordinated map control.</h3>
        </div>
        <p>Team play is mostly timing: create information, prepare waves, move together, and commit to the same decision.</p>
      </header>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Shared Rules</p>
        <h3>Principles behind reliable team play</h3>
        <div class="team-principles">
          ${teamPlayGuide.principles.map((principle, index) => `
            <div class="team-principle">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>${safeHtml(principle.title)}</strong>
                <p>${safeHtml(principle.text)}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <div class="guide-dual">
        <section class="guide-section">
          <span class="guide-section__number">01</span>
          <p class="eyebrow">Team Micro</p>
          <h3>Execute fights together</h3>
          ${guideList(teamPlayGuide.micro)}
        </section>
        <section class="guide-section">
          <span class="guide-section__number">02</span>
          <p class="eyebrow">Team Macro</p>
          <h3>Move around the map together</h3>
          ${guideList(teamPlayGuide.macro)}
        </section>
      </div>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Game Timeline</p>
        <h3>Team priorities by phase</h3>
        <div class="guide-phases">
          ${Object.entries(teamPlayGuide.phases).map(([phase, items]) => `
            <div class="guide-phase">
              <span>${safeHtml(phase)}</span>
              ${guideList(items)}
            </div>
          `).join("")}
        </div>
      </section>

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Simple Calls</p>
        <h3>Use short words with an agreed meaning</h3>
        <div class="team-calls">
          ${teamPlayGuide.calls.map((item) => `
            <div class="team-call">
              <strong>${safeHtml(item.call)}</strong>
              <p>${safeHtml(item.meaning)}</p>
            </div>
          `).join("")}
        </div>
      </section>

      ${renderRankLadder()}

      <section class="guide-section guide-section--wide">
        <p class="eyebrow">Review Checklist</p>
        <h3>What to look at after a game</h3>
        ${guideList(teamPlayGuide.review, "guide-list--checks")}
      </section>
    `;
  }

  function renderHowToPlay() {
    document.querySelectorAll(".learn-mode-tab").forEach((button) => {
      const isActive = button.dataset.learnMode === activeLearnMode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    roleGuideControls.classList.toggle("is-hidden", activeLearnMode !== "roles");
    if (activeLearnMode === "team") renderTeamGuide();
    else renderRoleGuide();
  }

  document.querySelectorAll(".learn-mode-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeLearnMode = button.dataset.learnMode;
      renderHowToPlay();
    });
  });

  roleGuideControls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-guide-role]");
    if (!button) return;
    activeLearnRole = button.dataset.guideRole;
    renderHowToPlay();
  });

  renderHowToPlay();
})();
