/**
 * Просмотры разделов приложения (по data-view / setView).
 * POST /api/section-views — { section, initData? } увеличивает счётчик.
 *   Не считает: TELEGRAM_ADMIN_ID и ники из SECTION_VIEWS_EXCLUDE_USERNAMES (по умолчанию roman1787443).
 * GET /api/section-views?initData=... — только админ: { ok, counts: { home: N, ... } }.
 */
const crypto = require("crypto");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** Юзернеймы без @, через запятую; не учитываются в просмотрах (кроме админов — те и так отсекаются). */
const EXCLUDE_USERNAMES = (process.env.SECTION_VIEWS_EXCLUDE_USERNAMES || "roman1787443")
  .toString()
  .split(",")
  .map((s) => s.trim().replace(/^@/i, "").toLowerCase())
  .filter(Boolean);

const HASH_KEY = "poker_app:section_views";

function isAdmin(userId) {
  const id = String(userId).replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

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

/** Не плюсуем просмотр для этого пользователя (по валидному initData). */
function shouldSkipSectionViewCount(user) {
  if (!user || user.id == null) return false;
  if (isAdmin("tg_" + user.id)) return true;
  if (isExcludedViewer(user.username)) return true;
  return false;
}

function validateUser(initData) {
  if (!initData || !BOT_TOKEN) return null;
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
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    return user.id ? { id: user.id, username: (user.username || "").trim() } : null;
  } catch (e) {
    return null;
  }
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = REDIS_URL.replace(/\/$/, "");
  const url = base + "/pipeline";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) return null;
  return res.json();
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

  if (!REDIS_URL || !REDIS_TOKEN) {
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
    const postInit = body.initData || body.init_data || "";
    const postUser = postInit ? validateUser(String(postInit)) : null;
    if (postUser && shouldSkipSectionViewCount(postUser)) {
      return res.status(200).json({ ok: true, skipped: true });
    }
    const pipe = await redisPipeline([["HINCRBY", HASH_KEY, section, "1"]]);
    if (!pipe || !Array.isArray(pipe) || pipe.some((r) => r && r.error)) {
      return res.status(500).json({ ok: false, error: "Redis error" });
    }
    return res.status(200).json({ ok: true });
  }

  const initDataGet = (req.query.initData || "").toString();
  const userGet = validateUser(initDataGet);
  const adminId = userGet ? "tg_" + userGet.id : null;
  if (!userGet || !isAdmin(adminId)) {
    return res.status(403).json({ ok: false, error: "Not admin" });
  }

  const pipe = await redisPipeline([["HGETALL", HASH_KEY]]);
  if (!pipe || !Array.isArray(pipe) || !pipe[0] || pipe[0].error) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }
  const counts = hgetallToObject(pipe[0].result);
  return res.status(200).json({ ok: true, counts, isAdmin: true });
};
