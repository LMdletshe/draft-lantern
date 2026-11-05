# Matchups strength validation — 5 November 2026

**Decision: the six-picks-per-lane library does not meet the intended standard of six deeply validated hard counters. Both the original library and the expansion need eligibility and ranking changes.** This audit is evidence for that decision, not a certification of all the recommendations.

The audit covers the exact library released in commit `72a84e3d49b71fd52cdd93e04721771a517f765c`: 2,193 directed entries, including the original 855 and the 1,338-entry expansion. It evaluates the actual six displayed picks for every one of 263 supported champion-role combinations across 173 champions: 1,578 displayed suggestions. Different roles remain separate; eight cross-role entries receive no substitute same-lane statistic.

## Evidence collected

- **526 verified public LoLalytics tables:** all 263 supported lanes on patches 16.22 and 16.21, pooled all ranks, all source-supported regions, ranked mode. These tables contain 34,458 published matchup rows. This is one statistics publisher, not two independent datasets. These aggregate game results do not measure isolated lane wins or controlled equal-skill duels.
- **Current Riot audit:** all 581 referenced ability records and all 180 rune configurations passed the existing live source/legality checker against Data Dragon 16.22.1. This confirms text/required-tooltip agreement and legal rune selections, not matchup superiority or optimal runes. The captured checker result is in [official-source-audit.json](official-source-audit.json).
- **Mechanic review:** inspected the 40 candidate ability groups used by the expansion, their current stored official descriptions and required tooltips, and selected consequential opponent exceptions. See [the mechanic review](mechanic-review.md). There were no controlled in-game tests, replay outcome studies or independent tactical reviews of all 2,193 pairings.
- Source URLs, actual retrieval timestamps, HTTP metadata, page hashes, confirmed filters and row counts are frozen in [sources.json](sources.json). Per-entry observations, original explanations, source links, flags and decisions are in [entries.csv](entries.csv) and [entries.json](entries.json). [lanes.md](lanes.md) summarizes every displayed lane.

The official patch notes identify champion and item changes that a text comparison alone misses: [Riot patch 26.22](https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-22-notes/). The client data uses the version `16.22.1`; the patch notes call this release `26.22`. Previous-patch results remain historical context, especially for Mel's rework, other changed champions and the ADC item changes. They are never relabelled as current evidence.

## Results for the actual displayed picks

| Evidence category | First three slots | Slots four to six | All six slots |
| --- | ---: | ---: | ---: |
| Strong current association, positive previous-patch screen | 16 | 8 | 24 |
| Strong current association, previous-patch screen not met | 1 | 1 | 2 |
| Modest positive current association | 56 | 23 | 79 |
| At least 1,000 games, normalized effect favors the enemy by 1+ percentage point | 20 | 30 | 50 |
| At least 1,000 games, remaining non-positive normalized effect or raw win rate below 50% | 26 | 45 | 71 |
| Published current sample, fewer than 1,000 games | 411 | 422 | 833 |
| No matching published current-patch sample | 259 | 260 | 519 |
| Total | 789 | 789 | 1,578 |

**1,352 of the 1,578 displayed suggestions (85.7%) lack the current sample required by this screen.** This means insufficient evidence, not proof that they are bad picks. Seventeen supported lanes have no current-patch matchup rows meeting the publisher's 100-game publication floor at all. The audit never fills these gaps from another rank, role, patch or reverse direction.

**121 displayed suggestions fail the positive current-signal screen despite having at least 1,000 games.** Fifty have a normalized effect at least one point in the wrong direction. This is evidence against promoting them as strong counters, not proof that their isolated ability interaction is false.

No lane has six displayed suggestions passing the persistent strong-signal screen. The audit certifies **zero hard counters**, because a statistical screen by itself is insufficient for that certification. This does not mean the game has no hard counters.

The original library also fails the assumption: across all its 855 entries, 18 pass the persistent strong-signal screen, 25 have a sufficiently sampled negative effect of at least one point, and 31 have other non-positive current evidence. Across all 1,338 expansion entries the corresponding counts are 12, 46 and 62. Source-file origin and displayed slot are different comparisons: older entries can occupy slots four to six, while some expansion entries can enter earlier slots.

## Concrete checks

These are frozen observations from the cited all-ranks tables, viewed from the suggested champion's perspective. Positive Delta 2 favors the suggestion; negative favors the opponent. All numbers below are game outcomes, not lane GD or solo-kill rates.

| Suggested pick → opponent | Origin / displayed slot | Current games | Candidate game WR | Candidate normalized Delta 2 | Previous Delta 2 | Decision |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Jax → Aatrox, Top | Expansion / 4 | 1,010 | 46.73% | -2.63 pp | -0.03 pp | Contradictory current signal; dodging the passive attack is not enough to recommend the whole matchup |
| Jax → Garen, Top | Original / 1 | 2,288 | 44.32% | -3.16 pp | -4.52 pp | Contradictory in both snapshots despite the Q interaction |
| Ezreal → Yasuo, ADC | Expansion / 5 | 1,083 | 39.98% | -4.87 pp | -1.96 pp | Moving out of one tornado does not establish a favourable lane |
| Teemo → Aatrox, Top | Expansion / 6 | 1,194 | 52.26% | +0.14 pp | -1.23 pp | Raw WR looks positive; normalized advantage is negligible and historical direction differs |
| Nautilus → Yuumi, Support | Original / 6 | 2,066 | 57.31% | +5.49 pp | +4.15 pp | Strong association worth tactical review; the authored detached-Yuumi R plan is too narrow to explain the overall result |
| Malphite → Tryndamere, Top | Original / 2 | 1,277 | 58.34% | +6.71 pp | +5.55 pp | Strong association and a plausible broader kit explanation; candidate for full tactical validation |

Table sources: [Aatrox](https://lolalytics.com/lol/aatrox/counters/?lane=top&vslane=top&tier=all&patch=16.22), [Garen](https://lolalytics.com/lol/garen/counters/?lane=top&vslane=top&tier=all&patch=16.22), [Yasuo ADC](https://lolalytics.com/lol/yasuo/counters/?lane=bottom&vslane=bottom&tier=all&patch=16.22), [Yuumi](https://lolalytics.com/lol/yuumi/counters/?lane=support&vslane=support&tier=all&patch=16.22), [Tryndamere](https://lolalytics.com/lol/tryndamere/counters/?lane=top&vslane=top&tier=all&patch=16.22). Exact previous-patch URLs and each observation are retained in the data files.

## Screening method and limits

1. Confirm the returned page identifies **all ranks, the requested patch, the enemy champion and both exact lanes**. Confirm the page's public SSR scope key identifies all regions and ranked mode. Reject inaccessible or mismatched pages; do not trust the URL alone. The source's `ranked` mode was verified; this audit does not independently audit the publisher's match ingestion or queue classification.
2. Use the named candidate row, not the top few counters in a search snippet. The source table is from the enemy's perspective: candidate game WR is `100 - enemy WR`; candidate Delta 2 is the negative of the enemy's reported Delta 2. Preserve the source's baseline and both deltas rather than inventing a replacement normalized formula.
3. Require **1,000 current-patch games** before applying an effect category. This conservative audit policy is not a universal League definition. Source rows below 100 games are unpublished; their absence does not prove zero games.
4. A strong current screen requires candidate game WR **at least 53%**, normalized Delta 2 **at least +3 pp**, and a nominal 95% Wilson lower bound on the raw WR **above 50%**. Persistent means the previous patch also has **1,000+ games**, raw WR **at least 50%** and Delta 2 **at least +1 pp**. Changed-kit/item flags remain separate and can invalidate practical transfer of history.
5. The Wilson interval describes uncertainty in the **rounded raw game WR** only. It is not a confidence interval for Delta 2. Repeated players, overlapping matchups, mixed ranks, builds, mastery, draft choices and publisher sampling violate a simple randomized independent-trial interpretation. The intervals are unadjusted descriptive screens across many comparisons, not family-wise significance tests. The policy does not assign a probability that a pick is a hard counter.
6. Same-role game results do not prove lane dominance. A losing lane can win the game; a winning lane can lose it. Support results depend on both ADCs; jungle results include pathing, clears, lanes, objectives and teams. Pooled all-ranks evidence does not establish the same advantage at each individual rank. Rune legality and general synergy do not establish the best complete page for an exact opponent.

## Tactical and rune conclusions

The expansion contains 183 mobility-before-impact plans, 220 damage-mitigation plans, 250 untargetability/mist plans, and 48 shared death-prevention plans. Those statements can describe real abilities while applying to many opponents, which is insufficient to justify a champion-specific recommendation. Projectile defense, attack denial and control immunity need the exact interaction checked, including what still lands and whether the opponent can defeat it on demand. The [mechanic review](mechanic-review.md) distinguishes the inspected ability facts from the untested pair-specific exceptions.

The stored explanations for **Teemo, Nasus and Malphite versus Olaf** omit the defining Ragnarok exception. Their blind/slow/cripple plan cannot be assumed to work while Olaf is immune to disables. These entries need an explicit pre-R or R-downtime scope and a full matchup reassessment; adding a disclaimer does not make them hard counters. See [Riot's current Olaf ability record](https://ddragon.leagueoflegends.com/cdn/16.22.1/data/en_US/champion/Olaf.json).

All 180 rune configurations remain **authored tactical pages**. This audit validates source agreement, legal slots and existing resource restrictions, but collects no matchup-conditioned rune win-rate samples. **Zero pages are certified statistically optimal.** Even a favourable champion matchup sample cannot validate the specific six-rune-plus-shards configuration used in that game.

## Required product correction

The intended claim should be **up to six qualifying counter picks**, with fewer when evidence is insufficient. Do not promise a minimum of three or six strong counters for every champion. Separate independently reviewed matchup advantages from useful ability tools. A recommendation should carry patch/rank/role scope, sample size, normalized effect, tactical review and limitations; rune optimization needs its own evidence. Prioritize the 121 sufficiently sampled non-positive displayed picks, then the 1,352 under-supported ones, and explicitly re-review the Olaf exceptions. The currently deployed app was not changed by this audit.

Before a pick is promoted to a strongly validated counter, it still needs a second suitable source or other independent corroboration, lane-specific evidence where lane dominance is claimed, an opponent-aware tactical review and patch/item checks. No script should infer this approval from the numeric screen.

## Reproduce

```powershell
node scripts/collect-matchup-evidence.cjs C:/path/to/local-cache 16.22,16.21
node scripts/audit-matchup-strength.cjs C:/path/to/local-cache C:/path/to/new-audit
node scripts/check-counter-coverage.cjs --live
node --test tests/*.test.cjs
```

The collector requests public HTML at three concurrent requests with per-worker pacing and stops on access protection/rate limiting. Original HTML is retained in the local cache outside the repository; hashes permit comparison, but the raw HTML is not bundled here. Re-running against the network creates a later snapshot, not a reconstruction of this frozen one. The stored source commit identifies the audited runtime rules. Changes to the auditor's criteria must be explicit and regenerate the report; passing software tests is not evidence that the suggested champion wins.
