"use strict";

const crypto = require("crypto");
const { parseBody, setCors } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");

const CRM_CAMPAIGN_METRICS_PREFIX = "poker_app:crm_campaign_metrics:";
const CRM_CAMPAIGN_EVENTS_PREFIX = "poker_app:crm_campaign_events:";
const CRM_CAMPAIGN_OPEN_USERS_PREFIX = "poker_app:crm_campaign_open_users:";

function safeCampaignId(raw) {
  const id = String(raw || "").trim();
  return /^crm_[a-f0-9]{10}$/i.test(id) ? id : "";
}

function safeAccountId(raw) {
  return String(raw || "")
    .trim()
    .replace(/[^a-zA-Z0-9_:-]/g, "_")
    .slice(0, 128);
}

function safeText(raw, maxLen) {
  return String(raw || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLen || 160);
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 16_000)) return;
  if (rateLimit(req, res, { bucket: "player_crm_push_event", limit: 120, windowMs: 60_000 })) return;

  let body = {};
  try {
    body = parseBody(req);
  } catch (eParse) {
    return res.status(400).json({ ok: false, error: "Bad JSON" });
  }

  const campaignId = safeCampaignId(body.campaignId || body.campaign_id);
  const eventType = safeText(body.type || body.event || "push_open", 32);
  if (!campaignId || !["push_open", "push_click"].includes(eventType)) {
    return res.status(400).json({ ok: false, error: "Bad campaign event" });
  }
  if (!redisConfigured()) return res.status(200).json({ ok: false, error: "redis_not_configured" });

  const accountId = safeAccountId(body.accountId || body.account_id);
  const now = new Date().toISOString();
  const event = {
    id: "crm_evt_" + crypto.randomBytes(6).toString("hex"),
    type: eventType,
    campaignId,
    accountId,
    tag: safeText(body.tag, 120),
    openUrl: safeText(body.openUrl || body.open_url, 220),
    at: now,
  };

  const metricsKey = CRM_CAMPAIGN_METRICS_PREFIX + campaignId;
  const eventsKey = CRM_CAMPAIGN_EVENTS_PREFIX + campaignId;
  const usersKey = CRM_CAMPAIGN_OPEN_USERS_PREFIX + campaignId;
  const commands = [
    ["HINCRBY", metricsKey, "pushOpens", "1"],
    ["HINCRBY", metricsKey, "pushClicks", "1"],
    ["HSET", metricsKey, "lastPushOpenAt", now],
    ["LPUSH", eventsKey, JSON.stringify(event)],
    ["LTRIM", eventsKey, "0", "199"],
  ];
  if (accountId) commands.push(["SADD", usersKey, accountId]);

  const results = await redisPipeline(commands, { timeoutMs: 5000 });
  if (!results || !Array.isArray(results) || results.some((row) => row && row.error)) {
    return res.status(200).json({ ok: false, error: "redis_write_failed" });
  }

  let uniqueUsers = 0;
  if (accountId) {
    const uniqueResults = await redisPipeline([["SCARD", usersKey]], { timeoutMs: 5000 });
    uniqueUsers = Number(uniqueResults && uniqueResults[0] && uniqueResults[0].result) || 0;
    if (uniqueUsers > 0) {
      await redisPipeline([["HSET", metricsKey, "pushOpenUsers", String(uniqueUsers)]], { timeoutMs: 5000 }).catch(function () {});
    }
  }

  return res.status(200).json({ ok: true, recorded: true, campaignId, pushOpenUsers: uniqueUsers || undefined });
};
