# Opponent cards on completed all-in showdowns

`visible_opponent_cards` continues to show non-folded winners at the owner's
showdown. It also includes losing contenders when a completed all-in showdown
has at most one contender with chips left and terminal records for all remaining
contenders. An all-in action alone does not qualify. Folded players and ordinary
losing/mucked hands remain hidden.

The replay marks these additions `showdown-allin`; the UI accepts that marker
alongside `showdown-winner`.

For the imported September 7–13 club dataset:

1. `python3 scripts/prepare-club-showdown.py` prepares private add-only patches
   from the original export and the previously exported owner lists.
2. Run `node scripts/backfill-club-showdown.cjs` with Redis environment configured
   to validate against current active histories.
3. Add `--apply` to copy each history to a new version, add only opponent cards,
   verify stored replays and unchanged list/field count, then atomically activate
   if the old version is still current. Old versions remain available.
4. Rerun without `--apply`; zero changes verifies idempotency against live data.

Private artifacts stay under `output/club-hand-showdown/`. Never commit these.
Lists, results, own cards and EV are preserved. Deployment of the UI change is
required before the new disclosure marker is visible in the application.

The preparer includes both winner and all-in disclosures to repair legacy replays
that predate winner-card imports. Pass a player ID as its first argument to scope
a repair, for example `python3 scripts/prepare-club-showdown.py 208238`.

Full disclosure audit: prepare with `--all`, then run the backfill with `--all`
(and `--apply` to repair missing disclosures). This includes hands with no visible
opponents, requires complete per-player hand coverage, and rejects any saved
opponent cards not confirmed by the source disclosure rules. Empty checks preserve
legacy replays without adding a redundant empty field.
