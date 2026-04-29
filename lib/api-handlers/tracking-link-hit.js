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
  if (!initData || !BOT_TOKEN) return { username: "", firstName: "" };
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + "=" + v)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
    if (calculatedHash !== hash) return { username: "", firstName: "" };
    const user = JSON.parse(params.get("user") || "{}");
    return {
      username: (user.username || "").trim(),
      firstName: (user.first_name || "").trim(),
    };
  } catch (e) {
    return { username: "", firstName: "" };
  }
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
  if (!check || !Array.isArray(check) || check[0]?.error || !check[0]?.result) {
    return res.status(200).json({ ok: true, recorded: false });
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

  return res.status(200).json({ ok: true, recorded: true });
};
