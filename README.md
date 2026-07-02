# Draft Lantern

A beginner-friendly, patch-agnostic League-inspired champion comp builder.

Production: https://lol-helper30.vercel.app

Open `index.html` in a browser to use it. The app is fully static and keeps its
champion data in `app.js`, so matchup logic can be edited without a backend or
live patch-stat dependency.

The interface is responsive across desktop, tablet, and phone layouts. Mobile
views use touch-sized controls, a swipeable view navigation bar, single-column
champion and analysis cards, compact draft slots, and a full-screen champion
detail dialog.

The app loads the full official champion roster, icons, and metadata from
Riot's public Data Dragon CDN. If that request fails, it falls back to the
built-in curated starter pool and initials automatically.

## What It Does

- Builds a five-role team draft.
- Includes a searchable Champion Explorer for the full loaded roster.
- Shows champion roles, damage type, difficulty, attributes, strengths,
  weaknesses, team contribution scores, and general hard-counter targets.
- Filters the champions a selected pick counters by opponent role and matchup
  strength, with reasons and simple matchup plans.
- Locks one or more favorite champions into their preferred roles and generates
  complete synergy teams around them.
- Produces balanced, teamfight, and safer-scaling variants, explaining each
  suggested lane pick and preserving the favorite core when a team is loaded.
- Includes a dedicated library of premade team compositions covering beginner
  engage, wombo combo, front-to-back, protect-the-carry, pick, poke, siege, and
  anti-dive styles.
- Each premade team explains its pros, cons, golden rule, flexible champion
  swaps, and separate early-, mid-, and late-game plans.
- Loads any premade composition directly into the Team Builder for editing and
  deeper analysis.
- Recommends the next pick based on the role, missing team needs, damage mix,
  beginner difficulty, and known pair synergies.
- Scores general comp traits like engage, frontline, damage, pick tools, poke,
  peel, and scaling.
- Detects broad comp archetypes and explains the team's game plan in beginner
  language.
- Flags composition risks such as one-sided damage, missing frontline, weak
  initiation, exposed carries, weak wave clear, slow early pressure, and short
  range. Open roles receive suggested fixes.
- Suggests general counter-pick ideas with matchup difficulty, reasons, and lane
  advice.
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
  combat attributes, power curve, fight pattern, strengths, weaknesses, plans,
  matchup traits, contribution scores, and ranked counter targets.
- Marks modeled profiles separately while preserving richer hand-curated
  advice for champions that have it.

## Editing The Data

Hand-curated champion entries live in the `champions` array in `app.js`.
Generated full-roster entries are created from Riot Data Dragon at runtime.

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

The current integration uses public Data Dragon endpoints and does not require a
Riot API key. It is used for the full champion roster, champion visuals, and
official metadata. The original curated champions keep richer matchup advice;
the rest receive complete modeled profiles from Riot combat attributes,
champion class, role, and champion-specific archetype traits.

A real Riot API key would be needed for account lookup, match history, mastery,
or large-scale matchup statistics. That would also require a small backend or
serverless function so the key is not exposed in the browser.

The current app deliberately does not ask for or store a Riot API key. Its
recommendations remain patch-agnostic and are based on broad champion identity,
team needs, and curated synergy patterns.
