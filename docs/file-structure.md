# Draft Lantern File Structure

Draft Lantern is a static browser app. Files are grouped by runtime responsibility so related changes stay local and the app can still deploy without a build step.

## Current layout

```text
index.html
src/
  data/
    app-config.js          # Roles, scoring keys, trait groups, role overrides, recommendation config
    champions.js           # Hand-curated champion starter pool
    compositions.js        # Pair synergies, premade comps, favorite-core profiles
  core/
    state.js               # Mutable app state
    dom.js                 # Shared DOM references
    utils.js               # Escaping, champion hydration, Data Dragon loading, profile helpers
    app.js                 # Bootstrap, view switching, event listeners, initial render calls
  features/
    team-builder.js        # Champion grid, draft slots, role selection, reset/select/clear actions
    draft-analysis.js      # Team scores, warnings, comp identity, game plan rendering
    recommendations.js     # Next-pick scoring and recommendation rendering
    favorite-builder.js    # Favorite-core controls and generated team variants
    premade-comps.js       # Premade comp list/detail rendering and loading
    matchups.js            # Matchup finder, champion explorer, counter scoring, champion dialog
    persistence.js         # Saved drafts and share links
    draft-room.js          # Guided two-team draft room and comparison view
    learn.js               # How-to-play tab controller
    comp-builder.js        # Golden-rule premade comp builder
  guides/
    top-lane-theory.js
    jungle-theory.js
    mid-lane-theory.js
    adc-theory.js
    support-theory.js
    team-theory.js
  styles/
    styles.css
    learn.css
docs/
  file-structure.md
```

## Script order

`index.html` intentionally loads plain browser scripts in dependency order:

1. `src/data/app-config.js`
2. `src/data/champions.js`
3. `src/data/compositions.js`
4. `src/core/state.js`
5. `src/core/dom.js`
6. `src/core/utils.js`
7. Feature modules
8. `src/core/app.js`
9. Learning guide modules

Do not convert files to ES modules unless the deployment model is changed deliberately. The current app works as a no-build static site.

## Ownership rules

- Put static role, trait, matchup, and scoring config in `src/data/app-config.js`.
- Put hand-curated champion entries in `src/data/champions.js`.
- Put preset team comps and pair/favorite composition data in `src/data/compositions.js`.
- Put shared helpers and Data Dragon hydration in `src/core/utils.js`.
- Put feature-specific rendering and behavior in the matching `src/features` file.
- Keep `src/core/app.js` small. It should wire events, switch views, and start the app.
- Put static guide content in `src/guides`; each guide should render only its own role or topic.
- Keep general UI styles in `src/styles/styles.css`; learning-guide-only styles stay in `src/styles/learn.css`.
- Avoid embedding a feature inside an unrelated guide file.

## Next cleanup targets

- Move inline golden-rule builder styles from `src/features/comp-builder.js` into a dedicated stylesheet.
- Split the large guide controller `src/features/learn.js` into role-guide data and rendering helpers.
- Add a simple browser smoke test that clicks each main tab and checks for console errors.
