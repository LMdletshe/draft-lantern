# Draft Lantern

An AI-assisted League of Legends draft planner for exploring team composition, champion synergy, and researched matchups.

## The idea

Drafting asks players to weigh several decisions at once. A pick has a role, a lane matchup, a place in the team’s game plan, and trade-offs that may change as the draft develops. I built Draft Lantern as a way to make those relationships easier to explore, especially for players who are still learning how champions fit together.

The project began as a self-directed experiment in using AI to turn a personal idea into a working app. League drafting gave that experiment a practical problem to solve. It also gave me a space to learn how recommendation logic, source evidence, interface design, and limits in the underlying data affect the advice a tool can responsibly show.

Link to live page: https://lol-helper30.vercel.app/

## The product question

How can a player compare picks and understand the reasoning behind them without treating every recommendation as a guaranteed counter?

Draft Lantern brings champion exploration, five-role team building, researched synergy, matchup research, rune plans, premade compositions, and a two-team draft room into one browser app. It explains team needs and trade-offs alongside suggestions so players can use the information while making their own decisions.

## What the app includes

- **Champion Explorer** with roster search, roles, champion details, modeled profiles, and matchup tools.
- **Team Builder** for five-role drafts, team balance, composition risks, game plans, and next-pick ideas.
- **Team synergy suggestions** with three researched options by default and an option to expand to six when enough reviewed pairings qualify. The library describes ability interactions and limitations. Its pair research is tactical analysis, not measured duo win rates.
- **Matchup research** with up to six stat-supported picks when the evidence qualifies. Lanes with fewer qualifying picks show a shorter list. Conditional ability interactions appear separately and do not fill the outcome-based shortlist.
- **Matchup rune plans** for researched directed pairings, including rune choices, reasoning, and validation against the loaded rune catalogue. These are authored tactical plans, not statistically proven optimal pages.
- **Premade compositions** with team styles, variations, swaps, and early-, mid-, and late-game plans.
- **Draft Room** for comparing two teams, their win conditions, strengths, risks, and game stages.
- **Saved drafts and share links** stored through the browser.
- **Learning guides** for roles, team concepts, and general play patterns.

## How recommendations work

Draft Lantern combines Riot’s public Data Dragon roster and champion ability descriptions with authored champion profiles, reviewed ability interactions, team-role rules, and dated game-outcome research.

Matchup recommendations depend on the available outcome evidence. The published all-ranks snapshot dated 2026-11-05 contains 23 qualifying pairings across 21 of 263 supported enemy lanes. A pairing must pass sample, patch, effect, and evidence checks to appear in the stat-supported shortlist. This is a limited snapshot of game-result associations. It does not establish that a pick is a hard counter or predict an individual lane result.

The separate ability library provides researched interactions for champions and roles. Having an authored interaction does not guarantee a qualifying outcome-based pick for every lane. Likewise, a rune page is available only for pairings with a reviewed plan. When evidence is missing, changed, or no longer matches the loaded game data, the app can withhold a recommendation or show the limitation instead of filling the list with a generic choice.

## Current limits

- Matchup outcomes come from a dated snapshot and are not a live matchup feed.
- The outcome snapshot is pooled across ranks and does not personalize results to a player’s rank, region, or play style.
- Ability interactions describe tactical possibilities. They do not prove matchup superiority.
- Team synergy pairings are researched descriptions of how abilities can work together, not pair-specific win-rate estimates.
- Rune plans reflect reviewed game information and authored reasoning, not experimentally validated optimal pages.
- Champion tiers, team scores, and draft comparisons are product models. They are not official Riot rankings.
- The optional Riot account lookup API requires a server-side `RIOT_API_KEY`. It is separate from the browser champion and matchup features.

## Run locally

The browser app uses plain JavaScript and does not need an install step for basic local use. Open `index.html` in a browser, or serve the repository with a local static server.

To prepare the static Vercel output:

```bash
node scripts/build-site.cjs
```

This generates the site in `dist/`. For local recommendation checks:

```bash
node --test tests/*.test.cjs
```

To check matchup coverage against the current Riot roster and rune catalogue:

```bash
node scripts/check-counter-coverage.cjs --live
```

Add `--write-report` to update the generated coverage report after a successful audit. The audit does not rewrite reviewed matchup evidence.

## Project layout

- `index.html` loads the browser app and its styles.
- `src/data/` contains champion, composition, matchup, rune, and evidence data.
- `src/core/` contains shared app state, browser helpers, and startup wiring.
- `src/features/` contains the Team Builder, Matchups, rune, draft, and other feature logic.
- `src/guides/` contains learning content.
- `src/styles/` contains shared, feature, and responsive styles.
- `api/riot-player.js` is the optional server-side Riot account lookup.
- `docs/` describes file ownership, research methods, and coverage.
- `scripts/` contains local build and coverage tools.

See [the file structure guide](docs/file-structure.md) for code ownership. See [the counter research guide](docs/counter-research.md) for the evidence contract and review process, and [the counter coverage report](docs/counter-coverage.md) for current supported lanes.

## Data and privacy

The browser loads public champion information from Riot Data Dragon when available and falls back to a bundled roster snapshot. Saved drafts stay in the browser unless a player shares a generated draft link. The optional account lookup uses a server-side key and is not required for the core draft planner.

Keep real API keys and local environment files out of Git. Use `.env.example` only for blank or fictional setup values.

## Credits

Draft Lantern is an independent fan project. League of Legends names and assets belong to Riot Games. Draft Lantern is not endorsed by Riot Games.
