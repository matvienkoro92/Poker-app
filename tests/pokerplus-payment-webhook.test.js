"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

process.env.POKERPLUS_PAYMENT_WEBHOOK_SECRET = "webhook-test-secret";
const webhook = require("../lib/api-handlers/pokerplus-payment-webhook");

test("payment webhook signature rejects tampering", () => {
  const raw = JSON.stringify({ event: "payment.succeeded", paymentId: "pay_123456", poker21UserId: "208238", amountRub: 100, currency: "RUB" });
  const signature = webhook.signatureFor(raw, "webhook-test-secret");
  assert.equal(webhook.validSignature(raw, signature, "webhook-test-secret"), true);
  assert.equal(webhook.validSignature(raw.replace("100", "101"), signature, "webhook-test-secret"), false);
});

test("payment event accepts only confirmed RUB payments with a Poker21 ID", () => {
  const payment = webhook.parsePaymentEvent(JSON.stringify({
    event: "payment.succeeded",
    paymentId: "pay_123456",
    poker21UserId: "208238",
    amountRub: 100,
    currency: "RUB",
  }));
  assert.deepEqual(payment, { paymentId: "pay_123456", userId: "208238", amount: 100, currency: "RUB" });
  assert.throws(() => webhook.parsePaymentEvent(JSON.stringify({ event: "pending", paymentId: "pay_123456", poker21UserId: "208238", amountRub: 100 })), /not confirmed/);
  assert.throws(() => webhook.parsePaymentEvent(JSON.stringify({ event: "paid", paymentId: "pay_123456", poker21UserId: "208238", amountRub: 10.001 })), /Invalid payment amount/);
});

test("payment amounts accept kopecks without accepting excess precision or coercions", () => {
  const parse = amountRub => webhook.parsePaymentEvent(JSON.stringify({ event: "paid", paymentId: "pay_123456", poker21UserId: "208238", amountRub })).amount;
  for (const amount of [0.29, 1.01, 19.99, "0.29", "100.00"]) assert.equal(parse(amount), Number(amount));
  for (const amount of [0, -1, true, [], {}, "", "1.001", "0x10", "1e3", "90071992547409.92"]) {
    assert.throws(() => parse(amount), /Invalid payment amount/);
  }
});

test("deployed Web Request entry preserves signed bytes and payment replay keys", async t => {
  const chips = require("../lib/api-handlers/pokerplus-chips");
  const calls = [];
  const seen = new Set();
  t.mock.method(chips, "processDirectChange", async input => {
    calls.push(input);
    const replay = seen.has(input.idempotencyKey);
    seen.add(input.idempotencyKey);
    return { operation: { id: "test-operation" }, idempotentReplay: replay };
  });
  const { default: entry } = await import("../api/pokerplus-payment-webhook.mjs");
  const raw = '{\n  "event": "paid", "paymentId": "pay_123456",\n "poker21UserId": "208238", "amountRub": 0.29, "note": "Оплата"\n}\n';
  const send = (body, signature = webhook.signatureFor(body, "webhook-test-secret")) => entry.fetch(new Request("https://example.com/api/pokerplus-payment-webhook", {
    method: "POST", headers: { "content-type": "application/json", "x-poker21-payment-signature": signature }, body,
  }));
  const first = await send(raw);
  assert.equal(first.status, 200);
  assert.equal((await first.json()).idempotentReplay, false);
  const replay = await send(raw);
  assert.equal(replay.status, 200);
  assert.equal((await replay.json()).idempotentReplay, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].chips, 0.29);
  assert.equal(calls[0].idempotencyKey, "payment:pay_123456");
  assert.deepEqual(calls[0], calls[1]);
  assert.equal((await send(raw.replace("0.29", "0.30"), webhook.signatureFor(raw, "webhook-test-secret"))).status, 401);
  assert.equal((await send(raw, "")).status, 401);
  assert.equal((await send('{"broken":')).status, 400);
  assert.equal((await send("x".repeat(65537))).status, 413);
  assert.equal((await entry.fetch(new Request("https://example.com/api/pokerplus-payment-webhook"))).status, 405);
  assert.equal(calls.length, 2, "Rejected requests must never reach chip processing");
});

test("parsed JSON is rejected rather than re-serialized for signature checking", async () => {
  const response = { setHeader() {}, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  await webhook({ method: "POST", headers: {}, body: { amount: 100 } }, response);
  assert.equal(response.code, 400);
  assert.equal(response.body.error, "Raw payment body required");
});
