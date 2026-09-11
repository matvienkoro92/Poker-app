# Payment webhook

`POST /api/pokerplus-payment-webhook` receives confirmed RUB payments and passes them to the existing idempotent Poker21 chip operation. `POKERPLUS_PAYMENT_WEBHOOK_SECRET` must be configured; otherwise the endpoint returns 503.

The dedicated `api/pokerplus-payment-webhook.mjs` Web Request entry preserves the original request bytes. It must not be routed through the shared JSON-parsing API handler. Vercel Web Request functions are documented at https://vercel.com/docs/functions/runtimes/node-js.

The sender signs the exact UTF-8 request body with HMAC-SHA256 and supplies the hex signature in `X-Poker21-Payment-Signature` (optionally prefixed with `sha256=`). Parsing happens only after signature verification. Body limit: 64 KiB. An already parsed object is rejected, never serialized back for verification.

Amounts accept positive decimal numbers or decimal strings with at most two fractional digits. The parser validates integer kopecks before converting to the existing chip API's numeric amount. Invalid precision, booleans, hexadecimal strings and unsafe amounts are rejected. The existing configured chip-operation limit still applies.

Repeated delivery uses the same `payment:<paymentId>` idempotency key and existing Poker21 order ID/reconciliation logic.

Validation: `node --test tests/pokerplus-payment-webhook.test.js tests/pokerplus-chips.test.js`. Tests call the Web Request entry locally and mock chip processing; no live payments are made. After deployment, routing and provider delivery still require verification in the hosting environment.
