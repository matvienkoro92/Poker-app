# Robokassa notification ingress

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
