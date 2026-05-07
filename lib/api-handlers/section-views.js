const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Просмотры разделов приложения (по data-view / setView).
 * POST /api/section-views — { section, initData? } увеличивает счётчик.
 *   Не считает: TELEGRAM_ADMIN_ID и ники из SECTION_VIEWS_EXCLUDE_USERNAMES (по умолчанию roman1787443).
 * GET /api/section-views?initData=...|pwaSession=... — только админ: { ok, counts: { home: N, ... } }.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

/** Юзернеймы без @, через запятую; не учитываются в просмотрах (кроме админов — те и так отсекаются). */
const EXCLUDE_USERNAMES = (process.env.SECTION_VIEWS_EXCLUDE_USERNAMES || "roman1787443")
  .toString()
  .split(",")
  .map((s) => s.trim().replace(/^@/i, "").toLowerCase())
  .filter(Boolean);

const HASH_KEY = "poker_app:section_views";
const DAY_HASH_PREFIX = "poker_app:section_views:day:";

function normalizeUsername(u) {
  return String(u || "")
    .trim()
    .replace(/^@/i, "")
    .toLowerCase();
}

function isExcludedViewer(username) {
  const n = normalizeUsername(username);
  return n && EXCLUDE_USERNAMES.includes(n);
}

/** Не плюсуем просмотр для админов и исключённых ников (Mini App, PWA Telegram / сессия). */
function shouldSkipSectionViewCountFromIdentity(identity) {
  if (!identity) return false;
  if (identity.vkId != null) return false;
  const myId = memberIdFromIdentity(identity);
  if (myId && isAdminIdentity(identity, myId)) return true;
  if (isExcludedViewer(identity.telegramUsername)) return true;
  return false;
}

function safeSection(raw) {
  if (!raw || typeof raw !== "string") return null;
  const s = raw.trim().slice(0, 64);
  if (!/^[a-z0-9-]+$/.test(s)) return null;
  return s;
}

function hgetallToObject(result) {
  const out = {};
  if (!result) return out;
  if (Array.isArray(result)) {
    for (let i = 0; i + 1 < result.length; i += 2) {
      const k = result[i];
      const v = result[i + 1];
      if (k != null) out[String(k)] = parseInt(v, 10) || 0;
    }
    return out;
  }
  if (typeof result === "object") {
    for (const k of Object.keys(result)) {
      out[k] = parseInt(result[k], 10) || 0;
    }
  }
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!redisConfigured()) {
    return res.status(200).json({ ok: false, error: "Redis not configured", counts: {} });
  }

  if (req.method === "POST") {
    let body = {};
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {}
    const section = safeSection(body.section || body.view || "");
    if (!section) {
      return res.status(400).json({ ok: false, error: "Invalid section" });
    }
    const identityPost = resolveTelegramIdentity(req, body, BOT_TOKEN);
    if (shouldSkipSectionViewCountFromIdentity(identityPost)) {
      return res.status(200).json({ ok: true, skipped: true });
    }
    const dayKey = new Date().toISOString().slice(0, 10);
    const pipe = await redisPipeline([
      ["HINCRBY", HASH_KEY, section, "1"],
      ["HINCRBY", DAY_HASH_PREFIX + dayKey, section, "1"],
    ]);
    if (!pipe || !Array.isArray(pipe) || pipe.some((r) => r && r.error)) {
      return res.status(500).json({ ok: false, error: "Redis error" });
    }
    return res.status(200).json({ ok: true });
  }

  const identityGet = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  const adminId = memberIdFromIdentity(identityGet);
  if (!identityGet || !adminId || !isAdminIdentity(identityGet, adminId)) {
    return res.status(403).json({ ok: false, error: "Not admin" });
  }

  const pipe = await redisPipeline([["HGETALL", HASH_KEY]]);
  if (!pipe || !Array.isArray(pipe) || !pipe[0] || pipe[0].error) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }
  const counts = hgetallToObject(pipe[0].result);
  return res.status(200).json({ ok: true, counts, isAdmin: true });
};
