"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { isConfigured: isRedisConfigured, pipeline } = require("../redis");
const {
  agentSendChipsToPlayer,
  changeGroupMemberChips,
  getAgentBalances,
  getChangeChipsOrderStatus,
  hasPokerPlusConfig,
} = require("../pokerplus");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const DEFAULT_AGENT_ID = String(process.env.POKERPLUS_AGENT_ID || "").trim();
const IDEMPOTENCY_PREFIX = "poker_app:pokerplus_chips:idempotency:";
const AUDIT_IDS_KEY = "poker_app:pokerplus_chips:audit_ids";
const AUDIT_PREFIX = "poker_app:pokerplus_chips:audit:";
const IDEMPOTENCY_TTL_SECONDS = 60 * 60 * 24 * 400;

function safeText(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max || 200);
}

function operationFingerprint(action, body, agentId) {
  return crypto.createHash("sha256").update(JSON.stringify({
    action,
    agentId: safeText(agentId, 40),
    userId: safeText(body.userId || body.user_id, 40),
    chips: safeText(body.chips, 40),
  })).digest("hex");
}

function poker21OrderId(idempotencyKey) {
  const hex = crypto.createHash("sha256").update(idempotencyKey).digest("hex");
  return (BigInt("0x" + hex) % 100000000000000000000n).toString().padStart(20, "0");
}

async function readIdempotency(key) {
  const rows = await pipeline([["GET", key]], { context: "pokerplus-chips.idempotency-read", throwOnError: true });
  const raw = rows && rows[0] && rows[0].result;
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

async function reserveIdempotency(key, record) {
  const rows = await pipeline(
    [["SET", key, JSON.stringify(record), "NX", "EX", String(IDEMPOTENCY_TTL_SECONDS)]],
    { context: "pokerplus-chips.idempotency-reserve", throwOnError: true }
  );
  return !!(rows && rows[0] && rows[0].result === "OK");
}

async function completeOperation(idempotencyKey, record) {
  const auditId = crypto.randomUUID();
  const completed = Object.assign({}, record, { status: "completed", auditId, completedAt: new Date().toISOString() });
  await pipeline([
    ["SET", idempotencyKey, JSON.stringify(completed), "EX", String(IDEMPOTENCY_TTL_SECONDS)],
    ["SET", AUDIT_PREFIX + auditId, JSON.stringify(completed)],
    ["LPUSH", AUDIT_IDS_KEY, auditId],
    ["LTRIM", AUDIT_IDS_KEY, "0", "4999"],
  ], { context: "pokerplus-chips.complete", throwOnError: true });
  return completed;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type, Idempotency-Key");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!hasPokerPlusConfig()) return res.status(500).json({ ok: false, error: "Poker21 server config missing" });

  let body;
  try { body = parseBody(req); } catch (e) { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  const auth = authRequired(req, body, BOT_TOKEN, { adminOnly: true, adminError: "Только для администраторов" });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });

  const action = safeText((req.method === "GET" ? req.query && req.query.action : body.action) || "agentBalance", 40);
  const agentId = safeText((req.method === "GET" ? req.query && req.query.agentId : body.agentId) || DEFAULT_AGENT_ID, 40);
  try {
    if (action === "agentBalance") {
      const balance = await getAgentBalances({ agentId });
      return res.status(200).json({ ok: true, balance });
    }
    if (action === "orderStatus") {
      const order = await getChangeChipsOrderStatus({ orderId: req.method === "GET" ? req.query && req.query.orderId : body.orderId });
      return res.status(200).json({ ok: true, order });
    }
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Money operations require POST" });
    if (action !== "change" && action !== "agentTransfer") return res.status(400).json({ ok: false, error: "Unknown action" });
    if (!isRedisConfigured()) return res.status(503).json({ ok: false, error: "Idempotency storage is unavailable" });

    const rawKey = safeText(req.headers && req.headers["idempotency-key"] || body.idempotencyKey, 160);
    if (!rawKey) return res.status(400).json({ ok: false, error: "idempotencyKey is required" });
    const key = IDEMPOTENCY_PREFIX + crypto.createHash("sha256").update(rawKey).digest("hex");
    const orderId = poker21OrderId(rawKey);
    const fingerprint = operationFingerprint(action, body, agentId);
    const existing = await readIdempotency(key);
    if (existing) {
      if (existing.fingerprint !== fingerprint) return res.status(409).json({ ok: false, error: "Idempotency key was used for another operation" });
      if (existing.status === "completed") return res.status(200).json({ ok: true, idempotentReplay: true, operation: existing });
      return res.status(409).json({ ok: false, error: "Operation is already processing; reconcile before retry", operation: existing });
    }

    const pending = {
      status: "processing",
      action,
      fingerprint,
      requestedBy: String(auth.memberId),
      userId: safeText(body.userId || body.user_id, 40),
      chips: safeText(body.chips, 40),
      agentId: action === "agentTransfer" ? agentId : "",
      reference: safeText(body.reference, 160),
      orderId: action === "change" ? orderId : "",
      createdAt: new Date().toISOString(),
    };
    if (!await reserveIdempotency(key, pending)) {
      const raced = await readIdempotency(key);
      return res.status(409).json({ ok: false, error: "Operation is already processing", operation: raced });
    }

    const result = action === "agentTransfer"
      ? await agentSendChipsToPlayer({ agentId, userId: body.userId || body.user_id, chips: body.chips })
      : await changeGroupMemberChips({ userId: body.userId || body.user_id, chips: body.chips, orderId });
    const completed = await completeOperation(key, Object.assign({}, pending, { result }));
    return res.status(200).json({ ok: true, operation: completed });
  } catch (e) {
    return res.status(e && e.statusCode ? e.statusCode : 502).json({
      ok: false,
      error: e && e.message ? String(e.message).replace(/PokerPlus/g, "Poker21") : "Poker21 chips operation failed",
    });
  }
};
