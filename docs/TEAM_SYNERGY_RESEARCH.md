# Team Builder synergy research

Reviewed 2026-10-24 against live Riot Data Dragon **16.21.1**: **195 champion
pairs, all 173 champions, 239 referenced abilities**. All **263 supported
champion-role combinations** have a usable partner in another role. Full records and official
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
  verified current kit. Selected tooltips are retained when their short
  descriptions omit the required mechanic, such as Sejuani's allied melee
  stacking, Xayah's Rakan buff or Seraphine's upgraded control on slowed enemies.

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

Every champion and supported role has at least one playable researched partner.
The per-champion examples are in `TEAM_SYNERGY_COVERAGE.md`.
Coverage includes knock-up follow-up, Ball delivery, Bullet Time setup,
Sejuani melee skirmishes, repeated-attack protection, selected bot-lane chains,
Kalista's bound ally, Galio/Shen dive follow-up and Nilah healing interactions.
It also covers poison-assisted Twin Fang, terrain-dependent control, delayed
protection, sleep/stasis timing and targeted catches. Every arbitrary pair is
not covered, and not every open role has three or six suitable choices.
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
confirmed all 239 reviewed ability records against Data Dragon 16.21.1.

Run `node scripts/check-team-synergy.cjs --live --write-audit` to check source
names, descriptions and required tooltips against official data, verify role
coverage, and regenerate the human-readable audit. A new patch requires explicit
review; the script does not generate new pairings from tags or fill quotas.
