# Matchup recommendation correction — 2026-11-05

## Result

The Matchups shortlist now has a maximum of six picks and no minimum. The dated
all-ranks outcome screen qualifies 23 pairings across 21 supported enemy lanes
and 20 enemy champions. These are single-publisher statistical associations,
not certified hard counters. The other lanes show an explicit evidence gap.

Up to six narrower ability tools are available in a separate collapsed section.
They do not fill the shortlist. The full 2,193-entry ability library remains
available, and Explorer uses the same badge distinction. Authored rune plans
explicitly state that they are not statistically optimized. Teemo, Nasus and
Malphite tools versus Olaf now reference Ragnarok and limit their control plan
to its downtime.

The frozen [strength audit](research/matchups-2026-11-05/README.md) records the
runtime before this correction. Its 1,578-pick results remain intact as historical
evidence. The new shortlist uses only persistent strong-signal records without
unresolved champion/item patch cautions, plus the current kit/rune gates.

## Verified

- `node --test tests/*.test.cjs`: **43 passed, 0 failed**. The five added checks
  exercise empty lanes, scope/sample/source/direction rejection, drift and
  future-patch suppression, a genuine overflow above six eligible fixtures,
  statistical ordering, separate rendered sections and the Olaf exception.
- `node scripts/check-counter-coverage.cjs --live --write-report`: **0 errors**
  against live Riot Data Dragon **16.22.1**, with **581 ability references**,
  **180 rune configurations**, **23 qualifying pairings** and **21/263** lanes.
- JavaScript syntax checks and `git diff --check` pass.
- Render tests invoke the actual production `renderCounters` function with
  source data: Aatrox has no qualifying picks; Garen includes Tryndamere while
  Jax stays out of the main shortlist. Source details, dated labels, authored
  runes and the separate conditional action are present in the generated HTML.

## Browser verification outstanding

The local preview server started, but the desktop browser integration timed
out before creating a tab. Browser inventory then reported a configuration
initialization failure (`Timed out waiting for Statsig values`) with no tabs.
This is an automation integration blocker, not evidence that the application
rendered correctly or incorrectly. No desktop/mobile visual check or real
browser pick-placement check is claimed for this correction. Those checks
remain required before treating this draft as visually verified.
