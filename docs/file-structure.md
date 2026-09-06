# Draft Lantern File Structure

Draft Lantern is a static browser app. Keep files grouped by responsibility so features can be changed without searching through unrelated code.

## Current layout

```text
index.html
src/
  core/
    app.js              # Main app runtime, champion data, draft state, recommendations, matchup logic
  features/
    learn.js            # How-to-play tab controller
    comp-builder.js     # Golden-rule premade comp builder
  guides/
    top-lane-theory.js
    jungle-theory.js
    mid-lane-theory.js
    adc-theory.js
    support-theory.js
    team-theory.js
  styles/
    styles.css          # App-wide UI styles
    learn.css           # How-to-play guide styles
docs/
  file-structure.md
```

## Ownership rules

- Put new feature behavior in `src/features` unless it is core draft state or shared recommendation logic.
- Put static guide content in `src/guides`; guide files should render only their own role or topic.
- Keep `src/core/app.js` focused on the base app until it can be split safely into data, state, scoring, and view modules.
- Keep CSS grouped by surface area. General app styles stay in `src/styles/styles.css`; learning-guide-only styles stay in `src/styles/learn.css`.
- Avoid embedding a feature inside an unrelated guide file. The premade comp builder is separated from `team-theory.js` for this reason.

## Next cleanup target

`src/core/app.js` is still the largest file. The safe next split is:

1. `src/data/champions.js` for champion definitions and role metadata.
2. `src/data/premade-comps.js` for premade composition data.
3. `src/core/scoring.js` for team strength, warning, and recommendation calculations.
4. `src/core/draft-room.js` for guided draft room state and rendering.
5. `src/core/app.js` as the coordinator that wires DOM events to those modules.

Do that split in one feature area at a time and verify the deployed app after each pass.
