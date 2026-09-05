const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * POST /api/tracking-link-hit
 * body: { ref: "ref_xxxxxxxx" | "xxxxxxxx", visitor_id, initData? }
 * Учитывает переход по созданной в админке ссылке (главная).
 */
const crypto = require("crypto");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const META_HASH = "poker_app:track_links:meta";
const TOTALS_HASH = "poker_app:track_links:totals";
const UNIQUE_HASH = "poker_app:track_links:unique";

function parseUserFromInitData(initData) {
  const user = require("../resolve-telegram-auth").validateMiniAppInitData(initData, BOT_TOKEN);
  return { username: user ? user.username || "" : "", firstName: user ? user.first_name || "" : "" };
}

function normalizeSlug(ref) {
  if (!ref || typeof ref !== "string") return null;
  let s = ref.trim().toLowerCase();
  if (s.startsWith("ref_")) s = s.slice(4);
  if (!/^[a-f0-9]{8}$/.test(s)) return null;
  return s;
}

function safeVisitorId(id) {
  if (!id || typeof id !== "string") return null;
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
  return safe || null;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  if (!redisConfigured()) {
    return res.status(200).json({ ok: false, error: "redis_not_configured" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {}

  const slug = normalizeSlug(body.ref || body.refId || body.slug);
  const visitorId = safeVisitorId(body.visitor_id || body.visitorId);
  if (!slug || !visitorId) {
    return res.status(400).json({ ok: false, error: "Invalid ref or visitor_id" });
  }

  const initData = body.initData || body.init_data || "";
  const { username, firstName } = parseUserFromInitData(initData);

  const check = await redisPipeline([["HGET", META_HASH, slug]]);
  const metaStr = check && Array.isArray(check) && check[0] && check[0].result;
  if (!check || !Array.isArray(check) || check[0]?.error || !metaStr) {
    return res.status(200).json({ ok: true, recorded: false });
  }
  let meta = {};
  try {
    meta = JSON.parse(metaStr);
  } catch (e) {
    meta = {};
  }

  const usersKey = `poker_app:track_links:users:${slug}`;
  const logKey = `poker_app:track_links:log:${slug}`;
  const entry = JSON.stringify({
    t: new Date().toISOString(),
    visitorId,
    username: username || "",
    firstName: firstName || "",
  });

  const pipe1 = await redisPipeline([
    ["HINCRBY", TOTALS_HASH, slug, "1"],
    ["SADD", usersKey, visitorId],
    ["LPUSH", logKey, entry],
    ["LTRIM", logKey, "0", "499"],
  ]);
  if (!pipe1 || !Array.isArray(pipe1) || pipe1.some((r) => r && r.error)) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }

  const saddAdded = parseInt(pipe1[1] && pipe1[1].result, 10) || 0;
  if (saddAdded === 1) {
    await redisPipeline([["HINCRBY", UNIQUE_HASH, slug, "1"]]);
  }

  return res.status(200).json({
    ok: true,
    recorded: true,
    link: {
      id: slug,
      label: meta && meta.label ? String(meta.label).slice(0, 200) : "",
      params: meta && meta.params && typeof meta.params === "object" && !Array.isArray(meta.params) ? meta.params : {},
      createdAt: meta && meta.createdAt ? meta.createdAt : null,
    },
  });
};
