# Matchup recommendation and ability-tool contract

Matchups must separate a whole-matchup recommendation from an ability that can
answer one part of an opponent's kit. Six is a maximum, never a coverage quota.
An empty shortlist states an evidence gap and is not filled with ability tools.

## Stat-supported shortlist

The frozen all-ranks LoLalytics snapshot is dated 2026-11-05 and scoped to
ranked mode, all source-supported regions, exact same-role pairings, current
patch 16.22 and previous patch 16.21. It is not a live feed. Current source URLs,
game counts, game win rates, normalized effects, previous-patch observations
and snapshot date appear with each qualifying pick.

A pick requires all of the following:

- An explicit directed ability rule with usable source evidence and a legal
  rune page, both champions native to the selected role.
- At least 1,000 games in both snapshots, current candidate game win rate of
  at least 53%, current normalized Delta 2 of at least +3 percentage points,
  and a nominal 95% raw-WR Wilson lower bound above 50%.
- Previous candidate game win rate of at least 50% and Delta 2 of at least +1.
- Matching champion identities, rule references, rune-plan identifier, rank,
  region, mode, source-table lane filters and patch.
- No unresolved champion or ADC-item patch caution. A later loaded Riot patch,
  changed referenced ability or unusable rune page withholds qualification.

The first snapshot qualifies 23 pairings across 21 of 263 app-supported enemy
lanes. The shortlist is sorted by normalized current effect, sample size and
name, then capped at six. The UI calls these **stat-supported options**, not
certified hard counters. These observational game results do not establish
lane dominance, equal-skill duels, causality or the same advantage at every rank.
Independent tactical review and further corroboration remain necessary before
stronger claims. Raw-WR intervals are descriptive and are not Delta 2 intervals.

## Separate ability tools and runes

The 2,193 directed ability entries still cover 173 champions and 263 supported
roles. Those counts describe ability-plan availability, not qualifying matchup
coverage. Up to six non-qualifying ability tools appear in a collapsed section
with explicit limitations and an **Add conditional pick** action. Explorer uses
the same qualification badge and calls the rest ability interactions.

Every authored plan includes named abilities, timing, failure conditions and
legal runes. Pages are explicitly **not statistically optimized**. There are no
matchup-conditioned rune outcome samples. Unsupported pairs receive no generic
page. Team Builder retains its separate researched synergy shortlist.

Riot ability names, normalized descriptions, selected full mechanic tooltips
and rune effects are checked against reviewed snapshots. Drift withholds the
affected plan. Missing live kit data uses dated references; it does not convert
the outcome snapshot into live evidence. Matching text alone does not verify
balance numbers, ability collision exceptions or recommendation strength.

The Teemo, Nasus and Malphite tools versus Olaf explicitly cite Ragnarok and
limit their control plan to its downtime. More generally, projectile defense,
spell shields, attack denial, untargetability and control removal require exact
opponent exceptions; an isolated interaction cannot certify the full matchup.

## Review and verification

- Preserve the frozen [2026-11-05 strength audit](research/matchups-2026-11-05/README.md)
  as a record of the library before this correction. Its 1,578 displayed-pick
  findings are historical, not the new shortlist's coverage.
- Publish a new dated snapshot for new evidence. Record scope, retrieval times,
  source filters and patch cautions; never change numbers to meet a pick quota.
- Run `node --test tests/*.test.cjs` and
  `node scripts/check-counter-coverage.cjs --live --write-report`.
- Verify a qualifying lane, an empty lane, expanded conditional tools, source
  details, authored runes, correct team-slot placement and a narrow screen.
- The source audit checks legality, drift and eligibility; it does not certify
  hard counters or automatically rewrite research decisions.