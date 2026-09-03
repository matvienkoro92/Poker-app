"use strict";

const crypto = require("crypto");
const chipsHandler = require("./pokerplus-chips");

const WEBHOOK_SECRET = String(process.env.POKERPLUS_PAYMENT_WEBHOOK_SECRET || "").trim();

function signatureFor(rawBody, secret) {
  return crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
}

function validSignature(rawBody, supplied, secret) {
  const actual = String(supplied || "").replace(/^sha256=/i, "").trim().toLowerCase();
  const expected = signatureFor(rawBody, secret);
  if (!/^[a-f0-9]{64}$/.test(actual)) return false;
  return crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
}

function parsePaymentEvent(rawBody) {
  const body = JSON.parse(rawBody);
  const paymentId = String(body.paymentId || body.payment_id || "").trim();
  const event = String(body.event || body.status || "").trim().toLowerCase();
  const userId = String(body.poker21UserId || body.poker21_user_id || body.userId || "").trim();
  const currency = String(body.currency || "RUB").trim().toUpperCase();
  const amount = Number(body.amountRub != null ? body.amountRub : body.amount);
  if (!/^[A-Za-z0-9_.:-]{6,160}$/.test(paymentId)) throw new Error("Invalid paymentId");
  if (!["payment.succeeded", "succeeded", "paid"].includes(event)) throw new Error("Payment is not confirmed");
  if (!/^\d+$/.test(userId)) throw new Error("Invalid Poker21 user ID");
  if (currency !== "RUB") throw new Error("Unsupported currency");
  if (!Number.isFinite(amount) || amount <= 0 || Math.round(amount * 100) !== amount * 100) throw new Error("Invalid payment amount");
  return { paymentId, userId, amount, currency };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://two-aces.ru");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Poker21-Payment-Signature");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!WEBHOOK_SECRET) return res.status(503).json({ ok: false, error: "Payment webhook is not configured" });
  const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
  const signature = req.headers && req.headers["x-poker21-payment-signature"];
  if (!validSignature(rawBody, signature, WEBHOOK_SECRET)) return res.status(401).json({ ok: false, error: "Invalid signature" });
  try {
    const payment = parsePaymentEvent(rawBody);
    const result = await chipsHandler.processDirectChange({
      userId: payment.userId,
      chips: payment.amount,
      idempotencyKey: "payment:" + payment.paymentId,
      reference: payment.paymentId,
      requestedBy: "payment-webhook",
    });
    return res.status(200).json({ ok: true, paymentId: payment.paymentId, operation: result.operation, idempotentReplay: !!result.idempotentReplay });
  } catch (error) {
    return res.status(error && error.statusCode ? error.statusCode : 400).json({
      ok: false,
      error: error && error.message ? String(error.message).replace(/PokerPlus/g, "Poker21") : "Payment processing failed",
      details: error && error.details ? error.details : undefined,
    });
  }
};

module.exports.parsePaymentEvent = parsePaymentEvent;
module.exports.signatureFor = signatureFor;
module.exports.validSignature = validSignature;
