# Partial all-in EV

The yellow line replaces the result only for validated all-ins. Other hands keep their actual result. The UI reports calculated, unresolved, and unaudited counts; unresolved does not mean zero EV adjustment.

## Method

`scripts/calculate-allin-ev.py` reads local raw history and the owner's projection. `scripts/holdem-equity.cpp` exhaustively enumerates legal Hold'em boards with only the contenders' hole cards and board at the lock point removed from the deck. Folded opponents' private cards are not used as dead cards.

Eligibility requires an all-in before the river, no betting/folding on subsequent streets, complete and nonduplicated final cards, and final payouts independently reconciled against `bet_list`, net scores, and evaluated winners. Contributions are checked against incremental actions and uniform antes with unmatched excess returned; incomplete forced-post actions are allowed only if the final contribution ledger reconciles every payout.

Pot layers sharing the same eligible players are merged. Zero-deduction side pots are supported. When a hand has a deduction and multiple distinct eligible-player pots, it is excluded rather than assuming how the deduction is distributed.

For each accepted pot:

`EV net = sum(equity share × net pot) − player's final contribution`.

The net pot uses the hand's **observed total deduction**, not the ambiguous `fee_list` allocation. The displayed EV therefore assumes this total deduction remains fixed across hypothetical runouts. It is not an assertion about hypothetical fee rules or decision quality. Ties split the pot equally; validation tolerates only minor-unit rounding up to the number of contenders.

## Privacy and publishing

Only the owner's EV scalar, status, reason, runout count and method metadata are stored. Opponents' hole cards stay in the local raw source. The versioned backfill checks owner, hand identity, cards, amounts and timestamp, copies the active projection, changes only `ev`, verifies it, and switches with compare-and-set. The prior version is retained.

## Current audited projection

2,664 hands; 75 pre-river contested all-in candidates. 52 calculated (8 cash, 44 MTT), 23 unresolved (16 cash, 7 MTT): 12 with later-street betting, 7 missing final boards, 2 with ambiguous side-pot deductions, and 2 with final payout discrepancies. Other 2,589 hands retain their observed results without adjustment.

## Retrospective showdown equity

For the 12 later-street-betting exclusions, a separate audit looks for the owner's explicit all-in (`type=5`). Nine have no owner all-in; three do. The three receive exact equity against final nonfolded showdown contenders using the board at the owner's first all-in (one preflop and two river). This stores an equity share including ties, not a pot-weighted expected result. Future opponent decisions are conditioned upon; this scalar does not alter the EV line or resolve the EV exclusion.
