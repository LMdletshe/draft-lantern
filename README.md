# Draft Lantern

An AI-assisted, beginner-friendly, patch-agnostic League-inspired champion comp builder.

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
feature-scoped CSS lives in `src/styles`. On Vercel, `api/riot-player.js` runs
as a serverless function for Riot API lookups.

The interface is responsive across desktop, tablet, and phone layouts. Mobile
views use touch-sized controls, a swipeable view navigation bar, single-column
champion and analysis cards, compact draft slots, and a full-screen champion
detail dialog.

The app loads the full official champion roster, icons, metadata, and
passive/spell kit text from Riot's public Data Dragon CDN. If that request
fails, it falls back to the built-in curated starter pool and initials
automatically.

## What It Does

- Builds a five-role team draft.
- Includes a searchable Champion Explorer for the full loaded roster.
- Shows champion roles, damage type, difficulty, attributes, strengths,
  weaknesses, team contribution scores, and general hard-counter targets.
- Shows a current-patch S-to-D Champion Tier model, filterable by role, with
  plausible off-role picks separated from natural-role picks.
- Adds Riot Data Dragon attributes and optional Riot Scout mastery/recent-game
  signals directly into champion evaluations.
- Revamps Matchups around hard counters first: direct curated counters, latest
  patch kit evidence, role-native fit, threat profile, and team context all feed
  the counter ranking.
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
- Suggests hard counter picks with evidence labels, proof confidence, reasons,
  and lane advice instead of generic repeated recommendations.
- Uses a server-side Riot API scout, when `RIOT_API_KEY` is configured, to look
  up a Riot ID, ranked profile, champion mastery, and recent match patterns
  without exposing the API key to the browser.
- Highlights curated champion-pair synergies.
- Opens a champion guide with strengths, weaknesses, lane advice, teamfight
  advice, partners, and general answers.
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
  counter targets.
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
    compositions.js
  core/
    dom.js
    state.js
    utils.js
    app.js
  features/
    learn.js
    riot-scout.js
    team-builder.js
    premade-comps.js
    matchups.js
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

## Riot Data Layer

The app uses public Data Dragon endpoints for the full champion roster,
champion visuals, official metadata, and champion detail files containing
passive/spell descriptions. Data Dragon does not require a Riot API key and can
run directly in the browser. The original curated champions keep richer matchup
advice; the rest receive complete modeled profiles from Riot combat attributes,
champion class, role, spell-kit keywords, and champion-specific archetype
traits.

Account lookup, match history, ranked data, and champion mastery use the
server-side Vercel function in `api/riot-player.js`. Set `RIOT_API_KEY` in the
Vercel project environment variables for production. For local Vercel
development, copy `.env.example` to `.env.local` and add a valid Riot
development, personal, or production key.

The frontend never receives the Riot key. It only calls `/api/riot-player`,
which forwards requests to Riot with `X-Riot-Token` from the server environment.
The recommendations remain matchup-theory-first, with Riot player data used as
extra scouting context. The hard-counter model prioritizes curated direct
counter rules, latest Data Dragon spell-kit evidence, role fit, champion
attributes, and local matchup rules. The S-to-D Champion Tier view is a Draft
Lantern model based on current Data Dragon roster attributes, local role-fit and
matchup rules, and optional player-specific Scout data. Riot does not provide a
free global champion tier-list or champion-vs-champion win-rate endpoint, so the
app labels these as model-based rather than live global win-rate data.
