# Counter research contract

Matchups and the Champion Explorer counter cards exist to answer a concrete
question: which champion ability answers this opponent's ability, and which
runes help execute that plan in the selected role?

The library has 855 directed entries covering all 173 champions and all 263
supported champion-role combinations, reviewed on 2026-10-22 using Riot Data
Dragon 16.21.1. Every supported lane has at least three distinct native same-role
picks, each with a legal page, and every champion has a researched outgoing
Explorer plan. Three is the minimum coverage target, not a claim that three
hard counters exist or that every arbitrary cross-role query has three answers. The complete
dated roster remains available offline. See [the audit](counter-coverage.md).

Coverage does not mean every arbitrary champion pair or every possible
off-role choice is recommended. Unsupported directed pairings still receive
no automatic page. The app must not fill those gaps using class tags, broad
scores, reversed pairings, or generic champion rune presets. The Explorer
defaults to all researched answers, with a separate direct-counter filter.

## What an entry establishes

Each entry names the candidate, opponent, both roles, specific abilities,
execution conditions, failure conditions, and a full rune plan with an
opponent-specific explanation. A support answer to an enemy ADC is labelled as
team context rather than a solo-lane matchup.

"Direct mechanic counter" means an ability directly answers part of the
opponent's kit. It does not promise a winning lane or game. "Conditional lane
answer" identifies pressure that depends more heavily on spacing, trades, or
wave control. Results use authored type and priority, not a percentage of
confidence or observed win rate. Team composition, skill, jungle pressure,
items, balance, and execution can change the practical outcome.

Official source links in each card point to versioned Riot champion JSON.
Those sources establish the quoted ability facts. The interaction analysis,
pick priority, rune choices, and stat shards are authored judgments. The app
does not ingest matchup samples, rank-filtered win rates, rune win rates, or
item win rates, so it cannot certify statistically optimal picks or pages.

## Patch handling

- Ability names and normalized descriptions are compared with the reviewed
  snapshots. A changed referenced ability withholds that counter entry and its
  rune plan. Missing live kit data uses the explicitly dated reference.
- Rune pages must contain a legal primary tree, two secondary runes from
  different rows of another tree, and three shards. A removed or relocated rune
  withholds the page. Changed rune effect text also withholds the page.
- The loaded catalogue patch and the tactical review patch are shown
  separately. Offline rune data uses the labelled bundled snapshot.
- Matching text is only a drift check. Ability numbers, interactions omitted
  from Data Dragon summaries, item changes, and overall balance require manual
  review. Never update the review date or snapshots just to make a failing
  comparison pass.
- Coverage counts use current usable entries and legal rune pages. An ability
  change, rune change, new champion, or newly supported role can reduce the
  displayed coverage. A lane counts as covered only with three distinct usable
  native picks. Invalid primary rune pages are also withheld from results;
  the finder reports a shortage instead of filling it with generic picks.
  Offline source labels never claim a live kit check.

## Adding or reviewing a pairing

1. Verify both champions' roles and the exact direction of the matchup.
2. Read current official ability descriptions and patch notes. Research any
   interaction the summaries do not establish; do not infer exceptions such as
   unstoppable movement, shield removal, or execute protection from keywords.
3. Write the named interaction, the required timing/positioning, and the
   opponent's strongest way to defeat it. Use a conditional label when the
   proposed advantage depends primarily on lane pressure.
4. Choose a complete legal rune plan that supports that interaction. Explain
   the actual current rune effect. Provide an alternative only when there is
   a concrete reason to switch the full page.
5. Add the rule and versioned ability snapshots. Keep a source for every
   referenced ability. Review all rules affected by shared rune or ability
   changes before updating a snapshot.
6. Run `node --test tests/runes.test.cjs`. Check both views in a browser, the
   correct role combination, an unsupported pairing, and a narrow screen.
7. Run `node scripts/check-counter-coverage.cjs --live --write-report`. This
   checks the current official roster, references, role assignments, and pages;
   it requires three distinct native picks per supported lane and reports gaps
   and drift without updating the research to suppress errors.

Examples of exceptions retained in the current research include Poppy W not
stopping Vi's or Hecarim's unstoppable ultimates, Blitzcrank R removing shields,
and Pyke's execute requiring real health rather than a larger shield. Rune
reasoning uses the current Cut Down effect against targets above 60% health,
rather than describing it as a bonus-health tank counter.
