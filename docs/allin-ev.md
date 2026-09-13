# Partial all-in EV

The yellow line replaces the result only for validated all-ins. Other hands keep their actual result. The UI reports calculated, unresolved, and unaudited counts; unresolved does not mean zero EV adjustment.

## Method

`scripts/calculate-allin-ev.py` reads local raw history and the owner's projection. `scripts/holdem-equity.cpp` exhaustively enumerates legal Hold'em boards with only the contenders' hole cards and board at the lock point removed from the deck. Folded opponents' private cards are not used as dead cards.

Eligibility requires an all-in before the river, no betting/folding on subsequent streets, nonduplicated available cards, and final payouts independently reconciled against `bet_list`, net scores, and evaluated winners when the full board is present. A completed hand without the final board can also qualify if its contributions reconcile, there is one eligibility pot, terminal and runout records cover every contender, and the final payout ledger balances. Its validation is explicitly marked `completed_ledger_without_final_board`. Contributions are checked against incremental actions and uniform antes with unmatched excess returned; incomplete forced-post actions are allowed only if the final contribution ledger reconciles every payout.

Pot layers sharing the same eligible players are merged. Zero-deduction side pots are supported. With deductions in multiple distinct eligible-player pots, net pot amounts are accepted only if winner payouts uniquely determine them through a full-rank linear system, with every inferred net pot between zero and its gross amount. Otherwise the hand remains excluded.

For each accepted pot:

`EV net = sum(equity share × net pot) − player's final contribution`.

The net pot uses the hand's **observed total deduction**, not the ambiguous `fee_list` allocation. The displayed EV therefore assumes this total deduction remains fixed across hypothetical runouts. It is not an assertion about hypothetical fee rules or decision quality. Ties split the pot equally. Zero-sum payout remainders strictly below one table unit (100 minor units) are accepted only among evaluated tied winners and explicitly recorded; other payout discrepancies remain excluded.

## Privacy and publishing

Only the owner's EV scalar, status, reason, runout count and method metadata are stored. Opponents' hole cards stay in the local raw source. The versioned backfill checks owner, hand identity, cards, amounts and timestamp, copies the active projection, changes only `ev`, verifies it, and switches with compare-and-set. The prior version is retained.

## Current audited projection

2,664 hands; 75 pre-river contested all-in candidates. 59 calculated (13 cash, 46 MTT), 16 unresolved (10 cash, 5 MTT with later-street betting, and 1 cash hand with underdetermined side-pot deductions). Other 2,589 hands retain their observed results without adjustment.

## Retrospective showdown equity

For later-street-betting exclusions, exact retrospective equity is calculated at the matched effective all-in, whether the owner or opponent declared it. An opponent all-in is matched when the owner's recorded contributions cover it or the owner also goes all-in; an owner's all-in is matched when a final contender covers it. The known board at that point is used against final nonfolded contenders. This includes ties and conditions on later opponents' decisions, so it is shown beside the actual result but does not alter the pot-weighted EV line.
