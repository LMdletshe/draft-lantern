# Draft Lantern File Structure

Draft Lantern is a static browser app. Files are grouped by runtime responsibility so related changes stay local and the app can still deploy without a build step.

## Current layout

```text
index.html
api/
  riot-player.js          # Optional server-side Riot API proxy, not exposed in the current UI
src/
  data/
    app-config.js          # Roles, scoring keys, trait groups, role overrides, recommendation config
    champions.js           # Hand-curated champion starter pool
    compositions.js        # Pair synergies, best-comp templates, variations, favorite-core profiles
    runes.js               # Dated Riot rune catalogue fallback
    counter-matchups.js     # Directed role-specific counter research and full rune plans
    ability-evidence.js     # Reviewed official ability descriptions and source URLs
  core/
    state.js               # Mutable app state
    dom.js                 # Shared DOM references
    utils.js               # Escaping, champion hydration, Data Dragon roster/kit loading, profile helpers
    app.js                 # Bootstrap, view switching, event listeners, initial render calls
  features/
    team-builder.js        # Champion grid, draft slots, role selection, reset/select/clear actions
    draft-analysis.js      # Team scores, warnings, comp identity, game plan rendering
    recommendations.js     # Next-pick scoring and recommendation rendering
    favorite-builder.js    # Favorite-core controls and generated team variants
    premade-comps.js       # Premade comp list/detail rendering and loading
    matchups.js            # Counter finder, champion explorer, champion dialog, general draft scoring
    counter-evidence.js    # Shared exact-pair queries, kit review checks, interaction rendering
    runes.js               # Researched rune pages, catalogue refresh, legality/effect checks
    persistence.js         # Saved drafts and share links
    draft-room.js          # Guided two-team draft room and comparison view
    learn.js               # How-to-play tab controller
  guides/
    top-lane-theory.js
    jungle-theory.js
    mid-lane-theory.js
    adc-theory.js
    support-theory.js
    team-theory.js
  styles/
    styles.css             # Global shell, team builder, recommendations, warnings
    premade.css            # Premade comp styles
    matchups.css           # Champion explorer, matchups, and champion dialog
    draft-room.css         # Two-team draft room and comparison styles
    learn.css              # How-to-play styles
    responsive.css         # Shared breakpoints and mobile overrides
docs/
  file-structure.md
  counter-research.md       # Evidence boundaries, coverage, and manual review workflow
tests/
  runes.test.cjs            # Directed pairing, role filtering, kit changes, rune legality/effects, offline cases
```

## Script order

`index.html` intentionally loads plain browser scripts in dependency order:

1. `src/data/app-config.js`
2. `src/data/champions.js`
3. `src/data/compositions.js`
4. `src/data/runes.js`, `counter-matchups.js`, and `ability-evidence.js`
5. `src/core/state.js`, `dom.js`, and `utils.js`
6. Feature modules, with `counter-evidence.js` before `runes.js` and `matchups.js`
7. `src/core/app.js`
8. Learning guide modules and optional feature extensions

Do not convert files to ES modules unless the deployment model is changed deliberately. The current app works as a no-build static site.

## Ownership rules

- Put static role, trait, and general scoring config in `src/data/app-config.js`.
- Put researched champion-pair interactions and their rune plans in
  `src/data/counter-matchups.js`; record reviewed ability facts in
  `src/data/ability-evidence.js`. Generic trait scores must not manufacture an
  exact-counter entry or rune page.
- Put hand-curated champion entries in `src/data/champions.js`.
- Put best-comp templates, variations, and pair/favorite composition data in `src/data/compositions.js`.
- Put shared helpers and Data Dragon roster/kit hydration in `src/core/utils.js`.
- Put feature-specific rendering and behavior in the matching `src/features` file.
- Keep reviewed rune identities/effects in `src/data/runes.js` and rune page
  validation/rendering in `src/features/runes.js`. Both counter views must use
  `src/features/counter-evidence.js` for the same directed pairing and role.
- Keep `src/core/app.js` small. It should wire events, switch views, and start the app.
- Put static guide content in `src/guides`; each guide should render only its own role or topic.
- Keep general UI styles in `src/styles/styles.css`; feature-specific styles belong in their matching stylesheet.
- Keep responsive overrides in `src/styles/responsive.css` unless they only affect one isolated feature.
- Avoid embedding a feature inside an unrelated guide file.

## Next cleanup targets

- Split the large guide controller `src/features/learn.js` into role-guide data and rendering helpers.
- Add a simple browser smoke test that clicks each main tab and checks for console errors.
