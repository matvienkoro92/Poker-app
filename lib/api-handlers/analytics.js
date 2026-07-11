"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { isConfigured: redisConfigured } = require("../redis");
const { recordAnalyticsEvent, resolveAnalyticsAccount, safeId } = require("../analytics-tracking");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 4096)) return;
  if (rateLimit(req, res, { bucket: "analytics", limit: 120, windowMs: 60_000 })) return;
  if (!redisConfigured()) return res.status(200).json({ ok: false, error: "redis_not_configured" });

  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}; } catch (e) {}
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const memberId = memberIdFromIdentity(identity);
  if (identity && memberId && isAdminIdentity(identity, memberId)) return res.status(200).json({ ok: true, skipped: true });
  const accountId = memberId ? await resolveAnalyticsAccount(memberId) : "";
  const eventType = String(body.type || "").trim();
  if (eventType !== "session_started" && eventType !== "section_opened" && eventType !== "referral_opened" && !accountId) {
    return res.status(200).json({ ok: true, skipped: true, reason: "verified_account_required" });
  }
  const result = await recordAnalyticsEvent({
    installationId: safeId(body.installation_id || body.installationId, 128),
    sessionId: safeId(body.session_id || body.sessionId, 128),
    eventId: safeId(body.event_id || body.eventId, 128),
    type: eventType,
    section: body.section || body.name,
    atMs: body.at_ms || body.atMs,
    accountId,
  });
  return res.status(result.ok ? 200 : 400).json(result);
};
