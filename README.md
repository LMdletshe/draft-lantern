# Draft Lantern

An AI-assisted, beginner-friendly League of Legends draft and matchup planner.

This started as a self-directed experiment to test how well AI could help turn
a personal idea into a usable app. I chose a competitive gaming context because
drafting has real decision pressure: roles, counters, synergy, scaling, team
fight plans, and trade-offs. The project became a practical way to explore
AI-assisted development while building something connected to how I think about
games and strategy.

Production: https://lol-helper30.vercel.app

Open `index.html` in a browser to use it. The app is fully static. Data lives
in `src/data`, shared runtime helpers live in `src/core`, feature modules live
in `src/features`, role and team learning content lives in `src/guides`, and
feature-scoped CSS lives in `src/styles`.

The interface is responsive across desktop, tablet, and phone layouts. Mobile
views use touch-sized controls, a swipeable view navigation bar, single-column
champion and analysis cards, compact draft slots, and a full-screen champion
detail dialog.

The app loads the full official champion roster, icons, metadata, and
passive/spell kit text from Riot's public Data Dragon CDN. If that request
fails, it keeps the complete dated 173-champion roster snapshot. Counter and
rune plans remain available with offline labels, and failed icons use initials.

## What It Does

- Builds a five-role team draft.
- Includes a searchable Champion Explorer for the full loaded roster.
- Shows champion roles, damage type, difficulty, attributes, strengths,
  weaknesses, team contribution scores, and researched counter matchups.
- Shows a current-patch S-to-D Champion Tier model, filterable by role, with
  plausible off-role picks separated from natural-role picks.
- Adds Riot Data Dragon attributes and spell-kit traits directly into champion
  evaluations.
- Finds champion-specific counters using named ability interactions, the roles
  of both champions, an execution plan, and explicit failure conditions.
- Locks one or more favorite champions into their preferred roles and generates
  complete synergy teams around them.
- Produces balanced, teamfight, and safer-scaling variants, explaining each
  suggested lane pick and preserving the favorite core when a team is loaded.
- Includes a best-comp library covering beginner engage, wombo combo,
  front-to-back, protect-the-carry, pick, poke, dive, split-pressure,
  objective-control, early-skirmish, and anti-dive styles.
- Each library comp explains what it offers, when to pick it, what it needs to
  function, its golden rule, playable roster variations, flexible champion
  swaps, and separate early-, mid-, and late-game plans.
- Loads any premade template or named variation directly into the Team Builder
  for editing and deeper analysis.
- Recommends the next pick based on the role, missing team needs, damage mix,
  beginner difficulty, and known pair synergies.
- Scores general comp traits like engage, frontline, damage, pick tools, poke,
  peel, and scaling.
- Detects broad comp archetypes and explains the team's game plan in beginner
  language.
- Flags composition risks such as one-sided damage, missing frontline, weak
  initiation, exposed carries, weak wave clear, slow early pressure, and short
  range. Open roles receive suggested fixes.
- Shares the same researched counter entries between Matchups and Champion
  Explorer. Direct mechanical counters and conditional lane answers have
  separate labels; broad trait scores cannot create counter entries.
- Gives each researched matchup a complete rune plan: keystone, three primary
  runes, two secondary runes, and three stat shards. Expand **Matchup rune plan**
  for the opponent-specific reasoning, current rune effects, and any researched
  alternative. Unsupported pairs show a coverage gap instead of a generic page.
- Highlights curated champion-pair synergies.
- Opens a champion guide with strengths, weaknesses, lane advice, teamfight
  advice, partners, and researched answers.
- Includes a guided two-team draft room with five bans and five role picks per
  side.
- Compares both drafted teams across early, mid, and late game; engage,
  frontline, damage, pick, poke, peel, and scaling.
- Explains each team's win condition, fight shape, primary threats, lane
  patterns, draft risks, and plans for dragons, Baron, towers, and jungle
  fights.
- Saves teams in the browser and creates shareable team links.
- Shows all Riot Data Dragon champions when the CDN is reachable.
- Builds a complete modeled profile for every Riot-loaded champion, including
  combat attributes, passive/spell kit traits, power curve, fight pattern,
  strengths, weaknesses, plans, matchup traits, contribution scores, and ranked
  counter entries where research is available.
- Marks modeled profiles separately while preserving richer hand-curated
  advice for champions that have it.

## File Structure

```text
api/
  riot-player.js
index.html
src/
  data/
    app-config.js
    champions.js
    roster-snapshot.js
    compositions.js
    runes.js
    counter-matchups.js
    counter-roster.js
    ability-evidence.js
  core/
    dom.js
    state.js
    utils.js
    app.js
  features/
    learn.js
    team-builder.js
    premade-comps.js
    matchups.js
    counter-evidence.js
    runes.js
    persistence.js
    draft-room.js
  guides/
    top-lane-theory.js
    jungle-theory.js
    mid-lane-theory.js
    adc-theory.js
    support-theory.js
    team-theory.js
  styles/
    styles.css
    premade.css
    matchups.css
    draft-room.css
    learn.css
    responsive.css
docs/
  file-structure.md
  counter-research.md
  counter-coverage.md
scripts/
  check-counter-coverage.cjs
```

See `docs/file-structure.md` for ownership rules and the next safe cleanup
steps.

## Editing The Data

Hand-curated champion entries live in the `champions` array in
`src/data/champions.js`. Best-comp library templates, their named variations,
and favorite-core profiles live in `src/data/compositions.js`. Generated
full-roster entries are created from Riot Data Dragon at runtime.

Useful fields:

- `roles`: Where the champion can be selected.
- `tags`: General play-pattern labels used for synergy and counter logic.
- `scores`: Trait values from 1 to 5.
- `goodInto`: Enemy traits this champion generally likes facing.
- `weakInto`: Enemy traits this champion generally dislikes.
- `beginner`: Short plain-English advice shown on champion cards.

Pair combos live in `pairSynergies`. Common role assignments live in
`roleOverrides`.

## Counter Research And Matchup Runes

The purpose of Matchups is to identify specific counter interactions and choose
runes that help execute them. The reviewed library contains **855 directed
entries covering all 173 champions and all 263 supported champion-role
combinations** on patch **16.21.1**. Every supported lane has at least **three
distinct native same-role picks**, each with legal runes, and every champion
has an outgoing Explorer plan. The finder defaults to three suggestions.
The coverage badge is calculated from usable entries and drops when evidence
changes leave a lane with fewer than three usable picks, or a new champion
has no reviewed answers. Results are ordered by
authored interaction type and priority, not measured win rates or synthetic
confidence. [The coverage audit](docs/counter-coverage.md) lists every role.

Full-roster coverage means each champion has researched answers. It does not
assign a rune page to every arbitrary champion pair, off-role matchup, or
future patch. Only explicitly researched directed pairings receive a plan.

`src/data/counter-matchups.js`, `src/data/counter-roster.js`, and
`src/data/counter-options.js` own the exact
pairings and rune plans.
`src/data/ability-evidence.js` records the official ability text and source URLs
used in review. `src/features/counter-evidence.js` checks the loaded kit text
against that reference and supplies both counter views. A changed referenced
ability withholds that entry pending review. Missing live kit data is labelled
as a dated reference. Matching descriptions do not certify balance strength;
numbers and gameplay changes still require manual patch review.

`src/data/runes.js` contains the reviewed Riot rune catalogue snapshot.
`src/features/runes.js` refreshes names, icons, slots, and effects from the same
Data Dragon version as the roster. A removed, relocated, or changed-effect rune
withholds its page pending review. Offline pages identify their bundled patch.
The tactical plans and stat shards are authored analysis, not statistically
validated optimal pages. No rune API key is needed. See
[`docs/counter-research.md`](docs/counter-research.md) for the review process.

Run the offline recommendation checks with `node --test tests/runes.test.cjs`.
Audit against the current official roster and rune catalogue with
`node scripts/check-counter-coverage.cjs --live`. Add `--write-report` to
refresh the coverage table after a successful audit. The audit never rewrites
matchup decisions or reviewed ability evidence.

## Riot Data Layer

The app uses public Data Dragon endpoints for the full champion roster,
champion visuals, official metadata, and champion detail files containing
passive/spell descriptions. Data Dragon does not require a Riot API key and can
run directly in the browser. The original curated champions keep richer matchup
advice; the rest receive complete modeled profiles from Riot combat attributes,
champion class, role, spell-kit keywords, and champion-specific archetype
traits.

The counter library uses manually reviewed named interactions; Data Dragon
supplies ability facts, not a matchup ranking. The separate S-to-D Champion
Tier view, team scores, and draft comparisons remain Draft Lantern models based
on roster attributes, role fit, and local rules. They do not establish that a
champion is an exact counter. This app does not ingest champion matchup or rune
win-rate datasets.
