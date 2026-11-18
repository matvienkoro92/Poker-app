# Robokassa notification ingress

## Mandarin invoice callback

URL: https://consult-payment-notify.vercel.app/api/mandarin-webhook

The owner-approved links are `https://secure-app.mandarin.io/link/134987/new1`,
`/new2` and `/new3`: charges 1,100 / 1,650 / 2,180 RUB for player credits
1,000 / 1,500 / 2,000 RUB. Earlier Mandarin links must not be offered. See
`lib/mandarin-payment-links.js` and `docs/mandarin-payments.md` in the parent repo.

The relay forwards only the invoice ID to the main app, which independently
checks invoice status through Mandarin with its link-scoped production API key.
It preserves backend status codes and fails with 503 on transport errors.
GET is rejected with 405. There are no secrets in the relay project.

The address was initially published as an inactive placeholder on 2026-11-17;
the invoice handler replaces that placeholder on 2026-11-18. Real payment delivery
must be verified after deployment without inserting synthetic ledger payments.

## ConexusPay / ButlerPay reserved callback

URL: https://consult-payment-notify.vercel.app/api/conexuspay-webhook

The address is reserved for onboarding. GET/HEAD report
`awaiting_configuration`; POST returns 503 and never acknowledges or stores a
payment. This is not an active integration. Before activation, implement raw-body
RSA verification (`X-Payload-Signature`), expected `partnerCode` binding, strict
`isTest` separation, durable atomic version checks and payment deduplication.
Credentials and partner configuration are still required. No Telegram sending
scenario is added by reserving this endpoint.

Published 2026-11-17 as `dpl_4P9C3AcHXEY3WyRk8RMK6QsZ2ZEc` on the
existing `consult-payment-notify` project. Public checks confirmed GET 200 with
`acceptingPayments: false` and POST 503. Existing Prodamus GET and unsigned
Robokassa POST still return 405 and 400 respectively.

Provider reference: https://butlerpay.app/ru/docs/partner-api/webhooks

## Existing payment relays

Public Result URL: https://consult-payment-notify.vercel.app/api/robokassa-webhook

Vercel project: `consult-payment-notify` (`prj_5B44OnBkpspGqEpLFKuc4KnfFUhx`),
in the existing Roman's projects team. This project exposes only a payment
notification relay, not the club app. The relay forwards original form fields to
the existing `/api/robokassa-webhook` handler at `poker-app-ebon.vercel.app`.
That handler remains responsible for signature validation, ledger deduplication,
Telegram delivery and cron retries. This is a separate public hostname, not
independent payment processing. No secrets are copied to the relay project.

POST form bodies are limited to 16 KiB; GET queries are preserved. Upstream
status and acknowledgement are returned unchanged. Transport failure returns
503, never an invented `OK`. No other app routes are proxied.

Deployment: copy this directory to an isolated folder outside the parent
repository, link it explicitly to the project above, then deploy production.
The parent repository has a different Vercel project binding: do not run an
unlinked deployment inside it. No build or npm dependencies are required.

Validation: `node --test tests/robokassa-notify-relay.test.cjs` from repo root.
The deployed endpoint was checked with empty/invalid-signature requests (400,
403) and an unsupported method (405); no payment was generated. Robokassa
requires email-code confirmation to activate a Result URL change. Verify the
saved URL after confirmation; a successful real callback is still required to
confirm end-to-end Telegram delivery.

Activation verified on 2026-11-13: owner-supplied email code accepted,
Robokassa displayed «Данные успешно сохранены». Reopened technical settings
show the new Result URL with POST and MD5. End-to-end confirmation of a real
successful payment remains pending; switching URL does not resend old payments.

## Prodamus

Public callback: https://consult-payment-notify.vercel.app/api/prodamus-webhook

Added and activated on 2026-11-13. Replaced only the mini-app callback
`https://two-aces.ru/api/prodamus-webhook` in matro.payform.ru settings; the
existing Salebot URL and other notification settings were preserved. The
cabinet displayed «Настройки сохранены» and the new URL persisted after reload.
The relay preserves the raw form body (including multipart boundaries) and
`Sign` header; the existing handler verifies HMAC and owns ledger updates.
Only POST is accepted, with a 64 KiB limit and a 20-second upstream timeout.
Live rejection checks returned 403 for missing Sign, 400 for malformed payload,
and 405 for GET. No synthetic payment was created. Real payment delivery remains
to be observed. Tests: `node --test tests/prodamus-notify-relay.test.cjs
 tests/robokassa-notify-relay.test.cjs`.

Follow-up fix (2026-11-13): Vercel Node helpers preparse URL-encoded bodies
regardless of the Next-style `bodyParser` export. The relay now reconstructs
scalar form fields, preserving bracket field names and decoded values used by
upstream canonical HMAC. Repeated/non-scalar fields remain rejected. Raw bodies
and multipart boundaries remain unchanged when supplied raw. Regression tests
cover Vercel's object body shape. Published as `dpl_4fT7fPWhtYz5evLLjXmMjUFrz2a9`.
Provider retries for actual orders 51116030 and 51115888 (2180 RUB each) were
triggered only on the mini-app callback, not Salebot. Both returned success and
appear once each in the ledger; the upstream request logs show 200 without a
Telegram delivery error. No payment was generated or refunded.
