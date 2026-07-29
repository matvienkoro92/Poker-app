"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { recordAnalyticsEvent, resolveAnalyticsAccount, safeId } = require("../analytics-tracking");
const { mskDateKeyFromMs } = require("../player-crm-utils");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const SECTION_VIEWS_HASH_KEY = "poker_app:section_views";
const SECTION_VIEWS_DAY_HASH_PREFIX = "poker_app:section_views:day:";
const SECTION_VIEWS_EXCLUDE_USERNAMES = new Set(
  String(process.env.SECTION_VIEWS_EXCLUDE_USERNAMES || "roman1787443")
    .split(",")
    .map((value) => value.trim().replace(/^@/, "").toLowerCase())
    .filter(Boolean)
);

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
  if (result.ok && !result.duplicate && eventType === "section_opened") {
    const section = String(body.section || body.name || "").trim().toLowerCase();
    const username = String(identity && identity.telegramUsername || "").trim().replace(/^@/, "").toLowerCase();
    if (/^[a-z0-9-]{1,64}$/.test(section) && !SECTION_VIEWS_EXCLUDE_USERNAMES.has(username)) {
      const dayKey = mskDateKeyFromMs(Date.now());
      await redisPipeline([
        ["HINCRBY", SECTION_VIEWS_HASH_KEY, section, "1"],
        ["HINCRBY", SECTION_VIEWS_DAY_HASH_PREFIX + dayKey, section, "1"],
      ], { context: "analytics.section-views" }).catch(() => {});
    }
  }
  return res.status(result.ok ? 200 : 400).json(result);
};
