# Reservation confirmation incident, 26 October 2026

Read-only audit of ledger revision 971. Live ledger was not changed during diagnosis; a subsequent owner-authorized restoration is recorded below. Private snapshot is under `output/deposit-incident-2026-10-26/private/` (not for commit).

## Recorded facts

All times below are Asia/Novosibirsk (UTC+7), matching the screenshot.

- Denis, Poker21 676837, Alfa bank, withdrawal entry `2ee12302-18f7-438a-b6fc-6b770d7f655a`, total 50,000 ₽.
- Anya released the earlier Exchip reservation, then created a standard reservation for the full amount, ID `c6f56181-b547-4768-a91b-05a75cb6276a`, at 20:52:10.774.
- At 22:19:32.048, a distinct `confirm-reservation` request, `70d9e0be-099e-4c29-856c-90205eee1705`, was accepted under Vika's account. Its payload explicitly targets that withdrawal and reservation, with depositor Poker21 865851. It contains no explicit amount; the server used the entire reservation amount, 50,000 ₽.
- At 22:38:00.333, a different withdrawal, Poker21 973892, recorded a 3,000 ₽ confirmation with the same depositor 865851. Its entry, reservation and request IDs are different. This is 18 minutes 28 seconds later and cannot have caused the earlier transaction.
- The immediately preceding payment at 22:19:06.012 was a distinct 5,000 ₽ confirmation for another withdrawal, Poker21 461298, depositor 253212.

The audit proves two separate requests rather than display contamination or a single backend confirmation applied to two entries. It does not establish the human's intention, exact UI gesture or which device submitted the request. No reliable reproduction of the original wrong-target gesture was obtained; do not describe the hardening as proof of that root cause or blame an operator.

## Hardening

- Confirmation shows recipient, bank, withdrawal room/ID and reservation amount together.
- At the owner’s request on 27 October, manual amount entry was removed. Confirmation remains one button. Opening a reservation captures an immutable context containing the exact form node, withdrawal ID, reservation ID, amount, editor version and dialog generation. Submission must match this context and the current reservation. The amount is transmitted automatically, without an editable field.
- The server independently validates the automatically supplied `amount` to be an integer equal to the selected reservation amount for all payment sources, including owner, Allfriends and Exchip. Old clients without the field receive a refresh instruction and cannot mutate the ledger. Successful pre-existing request retries still follow the existing idempotency check.
- Closed editor contents are removed; confirmation submissions are accepted only from the live editor. While a previous write has an unknown outcome, a different operation cannot be opened. The retry notice identifies the pending amount and withdrawal, and retries the original request unchanged.
- No partial reservation settlement or automatic real-ledger reversal is introduced.

## Verification

105 ledger/API/notification tests passed, including missing/wrong amounts for all sources, 3,000 against a 50,000 reservation, correct settlement of the other withdrawal, and retry idempotency.

Browser regression at 320 and 390 px passed: a changed form target sends no request, closed form is removed, actual 3,000 payment plus lost-response retry leaves 50,000 frozen. Owner-payment browser checks also passed at both sizes, preserving deposit accounting. Owner-payment checks also confirm there is no manual amount field. Screenshots reviewed.

The owner explicitly confirmed no actual payout occurred and authorized restoration. On a fresh snapshot at revision 972, the erroneous payment was voided and a new standard reservation was created atomically by compare-and-set, producing revision 974. New reservation: `404be4f4-2da6-4157-9c09-35041b8c313f`. Paid 0 ₽; reserved 50,000 ₽; available 0 ₽; remaining 50,000 ₽. Original payment and reservation history are retained. No external payout or Telegram message was initiated by the restoration. Before/after private snapshots were retained.
