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

  function scheduleCompBuilder() {
    window.setTimeout(mountCompRuleBuilder, 0);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-view='premadeView']")) {
      scheduleCompBuilder();
    }
  });

  window.mountCompRuleBuilder = mountCompRuleBuilder;
  scheduleCompBuilder();
})();
