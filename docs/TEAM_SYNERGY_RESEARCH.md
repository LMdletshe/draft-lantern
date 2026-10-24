# Team Builder synergy research

Reviewed 2026-10-24 against live Riot Data Dragon **16.21.1**: **79 champion
pairs, 56 champions, 81 referenced abilities**. Full records and official
source URLs live in `src/data/team-synergies.js`.

## Shortlist contract

- Show up to three picks initially; a button expands to at most six. The
  button appears only when more than three distinct candidates qualify.
- A candidate must have a supported native role and at least one reviewed
  interaction with a selected teammate who will remain in the draft.
- Exclude already selected champions. For a replacement, remove the outgoing
  champion from the synergy context before evaluating candidates.
- Fewer than three or six is valid. An empty team asks for a first pick;
  an unreviewed combination gets an explicit empty state and manual pool access.
- Changed referenced ability names, descriptions or required tooltips withhold
  the affected plan. Missing live data is labeled a dated reference, never a
  verified current kit. Stored tooltips are needed for Zac and Gragas knock-ups
  and Sejuani's allied melee stacking because their short descriptions omit them.

## Research standard and ranking

Each pair identifies the component abilities, a concrete interaction, an
execution sequence and a failure condition. Examples are an airborne effect
enabling Yasuo R, a carrier delivering Orianna's Ball, a root setting up
Caitlyn's trap, or Braum marks being completed by Jinx's attacks. Shared tags
alone cannot qualify a candidate.

Eligible candidates are ordered by distinct researched teammates, interactions
matching the chosen goal, authored interaction priority, then the existing
modeled composition fit and a stable name tie-break. The visible number is a
shortlist position, not a win probability or evidence percentage. The broader
fit model remains available under its own disclosure on each card.

Official abilities support the mechanics. The combination plan and order are
authored tactical analysis; no duo win-rate dataset, rank-specific advantage,
full-team optimality, or guarantee of winning is established. Enemy draft,
champion familiarity, resources, positioning and execution still matter.

## Coverage limits

This is an initial reviewed library, not all 173 champions or every supported
role. Coverage includes knock-up follow-up, Ball delivery, Bullet Time setup,
Sejuani melee skirmishes, repeated-attack protection, selected bot-lane chains,
Kalista's bound ally, Galio/Shen dive follow-up and Nilah healing interactions.
Some combinations can have no eligible suggestion. Do not add a pair merely
to meet a quota; review its actual mechanics first.

The next-pick strip uses this research gate. Favorite-core full-team variants,
Draft Room suggestions, broad draft warnings and premade templates continue to
use their existing modeled/curated logic; they are not newly research-verified
by this change.

## Validation

`node --test tests/*.test.cjs` checks research structure, caps and deduplication,
no-filler behavior, selected/excluded picks, goal changes, changed mechanics,
dated sources, multi-partner ranking, replacements and expansion resets,
alongside existing matchup/rune regression tests. Live source comparison
confirmed all 81 reviewed ability records against Data Dragon 16.21.1.
