# Mandarin invoice payments

Current approved links:

| URL suffix | Provider charge | Player credit | Production variable |
| --- | --- | --- | --- |
| `/new1` | 1,100 RUB | 1,000 RUB | `MANDARIN_API_KEY` |
| `/new2` | 1,650 RUB | 1,500 RUB | `MANDARIN_API_KEY_2` |
| `/new3` | 2,180 RUB | 2,000 RUB | `MANDARIN_API_KEY_3` |

All links use `https://secure-app.mandarin.io/link/134987`. Earlier links are
retired. Each amount joins least-loaded routing only when its matching key is
configured. Routing compares gross receipts for the Moscow operational day
[06:00,06:00), without counting unpaid links.

The owner confirmed all three amounts and enabled invoice callbacks and API
integration. All three variables were verified present as sensitive Production
variables in Vercel `poker-app`; no secret values were retrieved or printed.
No key is stored in source, relays, previews or client responses.

## Notification path

Mandarin posts JSON to
https://consult-payment-notify.vercel.app/api/mandarin-webhook. The relay
forwards only `invoice_id` to the main app. The incoming body is a trigger,
never proof of payment: the main app performs an authenticated GET to
`https://secure-app.mandarin.io/api/v1/public/invoices/{id}/check-state/`, with
`X-Api-Key`, no redirects and a timeout. An inaccessible invoice is rejected.
The three configured link-scoped keys are checked in parallel with a bounded
timeout. Each response must match the charge bound to that key. A missing or
inaccessible key does not block verification through a different valid key.

Only an authoritative `paid` RUB invoice for the exact configured charge, zero remaining amount,
matching total paid, and matching successful cash payment breakdown is saved.
Timestamp comes from the successful API payment breakdown, never the webhook
or invoice creation time. Partial/processing invoices are acknowledged without
saving a receipt. Unknown amounts, unsupported methods or inconsistent API data
are rejected for review. No raw callback body, card, email or phone is stored.

A ledger compare-and-set deduplicates by provider plus invoice ID. Amount and
first confirmed timestamp cannot be overwritten by retries. The receipt shows
in Deposits with a tick; assigning it requires deposit admin authorization and
a valid room/player (or exact split). The server owns amount and time. The receipt retains gross, while the deposit
operation and pending-payment display use 1,000 / 1,500 / 2,000 RUB; grossAmount
retains the actual charge on the operation. This nominal display also applies to
Robokassa and Prodamus totals and Telegram notifications, per owner request.
Shift reports compare nominal amounts and separately state gross receipts. Duplicate
or cross-provider assignments are rejected. Voiding an assignment reopens the
receipt without double-counting provider receipts.

`/api/cron-mandarin` runs every minute with the existing cron authorization.
It delivers only the owner's approved scenarios: the support forum's existing
«Приходы» topic and the configured withdrawals group (MANDARIN_WITHDRAWALS_CHAT_ID,
or existing PRODAMUS_WITHDRAWALS_CHAT_ID). Each target has an independent delivery
flag, plus locking and retries. Topic delivery also uses the shared durable
pending queue and sent markers. No personal player notifications or unrelated
group commands are added. As with other Telegram sends, a process crash between
Telegram accepting a message and persisting its marker may repeat that message;
it cannot duplicate the payment or deposit.

## Validation and release

Tests use fake invoices, API keys and Telegram, never production payments.
Browser QA uses an isolated in-memory ledger. Final real end-to-end confirmation
requires the next actual payment and its invoice ID.

Deploy the main app first, then the relay. For this unrelated release, use
`--build-env DAY_HERO_PUSH_SKIP=1` to suppress the existing day-hero notification
step during the production build. No git push is implied.

Official invoice API and callback format:
https://docs.mandarin.io/public/quick_start.html#проверка-статуса-счета

Published 2026-11-18: main app `dpl_7GMqJYtfrUFkhpZuZUiCccVjhso3`,
notification relay `dpl_CB86axFFm1wwRmqB1qcFsy6PmSMy` on the original hostname.
Main API returned 400 for an empty JSON callback (production credentials present),
and the unauthenticated cron returned 403. The build skipped day-hero pushes.
162 relevant tests passed, followed by 28 tests after adding durable-save failure
coverage and bounding retries; all 965 JavaScript files passed syntax checks.
Mobile fixture QA confirmed tick assignment, immutable amount, one remaining
provider total and no horizontal overflow. No synthetic payments or Telegram
test messages were inserted into production. Live delivery remains to be observed.

Deployment cleanup pending: temporary-folder project binding was missing and
CLI accidentally created `consult-payment-notify-deploy` (deployment
`dpl_5mCivdCjJWEobJ1VFyrc7C9nQTk3`). It is not used by the configured webhook.
Deletion was blocked by automatic approval review because deleting a project is
irreversible and requires explicit user authorization. Do not retry deletion
without that authorization. The correct project is `consult-payment-notify`.


## Three-link and nominal-display update

All three key names and all three link amounts were confirmed on 2026-11-18.
Tests cover each link/key binding, rejection of swapped amounts, a valid key
surviving another key's failure, nominal pending views, confirmations and split
allocation totals for all three providers, Telegram nominal amounts, and shift
reports with separate gross totals. Mobile QA shows three nominal pending rows
and a total of 4,500 RUB; tick contrast was corrected. No historical ledger rows
are rewritten; original receipt amounts and their audit amounts remain intact.

Published three-link/nominal update as `dpl_EzgMXdWCyZ1Yi2ftXQu28XEkhg5h`
on `two-aces.ru`. Production build passed with `DAY_HERO_PUSH_SKIP=1`.
179 targeted tests passed, then the added shift reconciliation test passed in
the four-test nominal suite. CSS syntax passed for 119 files; edited JavaScript
passed syntax checks. No real payment or Telegram test message was generated.
