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
