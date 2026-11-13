# Robokassa payment notifications

Shop: `Consult_R`. Result URL after activation:
`https://poker-app-ebon.vercel.app/api/robokassa-webhook`, POST.

Production environment requires `ROBOKASSA_PASSWORD2` containing the existing
production Password #2 from this shop. `ROBOKASSA_HASH_ALGORITHM` defaults to
`md5`, matching the shop setting. Never commit the password or change it merely
for integration. Optional `ROBOKASSA_WITHDRAWALS_CHAT_ID` overrides the existing
`PRODAMUS_WITHDRAWALS_CHAT_ID`; otherwise both providers notify the same group.

Deploy the handler before switching Result URL. Without Password #2 the handler
returns 503 and the cron is inactive. Preserve Success URL, Fail URL and payment
creation settings. After adding the secret, redeploy and verify unsigned requests
are rejected. Then change only Result URL and its method in the shop settings.
Verify delivery with the owner's next real successful payment; no fake payment
should be inserted into the production ledger. Production notifications are
signed using `OutSum:InvId:Password#2` plus sorted `Shp_*` parameters. Six-decimal
amounts must represent exact kopecks. Test callbacks are not saved.

Payments are stored in the existing deposit ledger, separately from Prodamus.
The amount and first receipt timestamp are immutable on retry. Robokassa's
standard ResultURL does not include an authenticated payment timestamp, so
`confirmedAt` is the first receipt time; delayed callbacks near a shift boundary
require reconciliation against the cabinet. Pre-activation payments are not
backfilled. The pending-payment confirmation takes its amount from the server,
links the operation to the provider invoice and prevents a second active link.
Cancellation reopens the pending payment.

Telegram delivery is retried by `/api/cron-robokassa` each minute, at most five
pending payments per run. A short Redis lock suppresses concurrent sends and
`notifiedAt` prevents normal callback retries from sending again. As with any
Telegram send without an idempotency key, a crash between Telegram accepting the
message and saving `notifiedAt` can cause a repeated notification. It cannot
create a duplicate payment or deposit. Group policy allows only sendMessage to
the configured Robokassa/Prodamus group for this notification scope.

The same cron produces one shift summary after 18:00 and 02:00 Moscow, comparing
callback payments with active deposit operations for [06:00,18:00) and
[18:00,02:00). Cabinet verification remains separate. Reports retry during the
following hour if sending fails. A crashed cron after claiming a shift report
requires manual review of the claim key; do not resend automatically without
checking Telegram history.

Validation: `node --test tests/robokassa.test.cjs tests/admin-deposits.test.js
 tests/deposit-payment-forms.test.js tests/prodamus-polling.test.cjs` and
`npm run check:handlers`. The fixtures use fake secrets and mock Redis/Telegram.
Reference: https://docs.robokassa.ru/ru/notifications-and-redirects

## Email fallback (prepared, requires mailbox secrets and deployment)

The existing minute cron can read payment notifications from Yandex IMAP over
TLS. Configure production `ROBOKASSA_MAIL_USER`, `ROBOKASSA_MAIL_PASSWORD`
(a Yandex app password, never a normal account password), and
`ROBOKASSA_MAIL_SINCE` (an explicit ISO timestamp with timezone, e.g.
`2026-11-13T00:00:00+03:00` to include November 13). Enable IMAP in Yandex Mail.
Enter secrets directly in Vercel, never in chat or tracked files. Redeploy after
configuration. Missing configuration leaves email polling disabled.

The mailbox is opened read-only: no messages are marked read, moved, or deleted.
Only exact `robot@robokassa.ru` / `Notification from ROBOKASSA` messages with a
valid, full-body Robokassa DKIM signature and signed From/Subject are imported.
If Robokassa does not sign these emails, they are rejected; inspect a real
message before considering the fallback active. Unsigned email is not proof of
payment. At most five candidates are processed per minute; a Redis UID cursor
scoped to account and UIDVALIDITY advances only after saving. Temporary failures
retry. Invalid messages are counted as rejected; no message body is logged or
stored. The first live scan must verify imported/rejected counts and the ledger.

Email and webhook use the same normalized invoice ID and existing ledger CAS,
so retries and simultaneous delivery cannot create a second payment. Existing
amounts and timestamps remain immutable. Email imports use the mail server's
receipt time, which can differ from the actual payment time; shift-boundary
reconciliation still requires the provider cabinet. A failed mailbox scan
prevents that run's shift summary, avoiding a knowingly incomplete report.
Telegram uses the existing approved payment notification scenario and pending
payment retry path. Importing a payment does not assign it to a player or create
a channel income operation automatically.

Validation: `node --test tests/robokassa-mail.test.cjs tests/robokassa.test.cjs`.

## Issuing a balanced payment link

The deposit panel has one `Выдать ссылку` button. The admin selects player credit
of 1,000, 1,500 or 2,000 RUB; the resulting card shows both the credit and the
actual provider charge. `issue-payment-link` is protected by the deposit admin
identity and section access token. It uses a fresh server ledger snapshot and
compares accepted gross amounts in the current Moscow operational day
[06:00,06:00), regardless of the UI report period or selected manager. Active
linked deposit operations replace their callback rows, so each payment counts
once. Active manual income also counts. Issued but unpaid links do not count as
accepted payments and do not create deposit income. At equal accepted totals the
providers alternate. A compare-and-set write serializes tie handling across
admins and retains the last 200 issuance results for safe retries.

Both providers have verified links for player credit of 1,000 and 2,000 RUB
(charges 1,100 and 2,180 RUB). Credit of 1,500 RUB currently uses Robokassa only
(charge 1,650 RUB): no matching Prodamus link is available. Creating a Prodamus
link requires the owner's exact material-access details; do not invent them.
Add a verified Prodamus 1,650 RUB link to `lib/deposit-link-routing.js` when supplied.

Tests: `node --test tests/deposit-link-routing.test.cjs` and
`node scripts/smoke-deposit-link-routing.cjs` (mock provider API, mobile 320/390px).

## Personal payment requests (disabled)

Owner request (2026-11-13): personal payment links are disabled. The deposit
panel offers only ordinary shared links for 1,000 / 1,500 / 2,000 RUB credit.
The API rejects `unique: true`, even if shop secrets are configured. Private
`/dep`, the payment menu button and support dialogs remain enabled.

Existing order/payment data is retained; callbacks may still reconcile any
previously issued personal orders. No new personal order or signed payment URL
can be issued through the deposit API. Historical callback compatibility does
not enable personal link creation.

## Prodamus Telegram group command

Admins of the mini app may send `/ссылка 1000`, `/ссылка 1500` or `/ссылка 2000`
in the group identified by `PRODAMUS_WITHDRAWALS_CHAT_ID`. The same exact phrases
without `/` are accepted, and an optional `@Poker_dvatuza_bot` mention is allowed.
Replies use the same server-side routing, amount mapping and ledger CAS as the
app. The bot replies to the original message with provider, player credit,
charged amount and the URL. No deposit income is created by the command.

Other groups, private chats, edited messages, bots and non-admin senders are
ignored. The group policy allows this scope only for `sendMessage` in the
configured Prodamus group. Group updates never go to Salebot. Message IDs provide
stable issuance request IDs; a Redis claim suppresses concurrent and repeated
Telegram deliveries. Failed sends are retried through Telegram webhook retries.
A crash after Telegram accepted a reply but before the delivery mark was saved
can still repeat the reply; it cannot create deposit income.

Plain text and Cyrillic commands must reach the bot: the group must already
permit the bot to receive those messages (for example through existing admin
status). Do not broaden bot permissions automatically. These Cyrillic commands
are parsed as text; they are not registered in Telegram's Latin-only command menu.

Owner override (2026-11-13): newly issued shared payment links are pinned by
player credit: 1,000 and 1,500 RUB → Robokassa, 2,000 RUB → Prodamus. This
supersedes the earlier automatic balancing rule until the owner changes it.
Prior issuance IDs still return their original link for safe retries. Charges
remain 1,100 / 1,650 / 2,180 RUB respectively.
