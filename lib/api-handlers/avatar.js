/**
 * Аватар пользователя. GET — получить, POST — загрузить (авторизация как в /api/friends: initData / pwaSession / pwaVkSession + image base64).
 * Redis: poker_app:avatar:{userId}
 * Макс. размер: 80KB (base64), рекомендуемый 200x200 px.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getDtIdByUserId } = require("../account-id");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MAX_SIZE = 80 * 1024;

async function redisCommand(cmd, key, ...args) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([[cmd, key, ...args].filter((x) => x !== undefined)]),
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data && data[0] ? data[0].result : null;
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
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    body = {};
  }

  const targetUserId = String(
    (req.query && (req.query.userId || req.query.user_id)) || body.userId || ""
  ).trim();

  if (req.method === "GET") {
    let userId = targetUserId;
    if (!userId) {
      const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
      if (!identity) {
        return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
      }
      userId = memberIdFromIdentity(identity);
    }
    if (!userId) return res.status(400).json({ ok: false, error: "userId или авторизация нужны" });

    const accountId = userId.startsWith("ID") ? userId : (userId.startsWith("guest_") ? userId : await getDtIdByUserId(userId));
    const key = "poker_app:avatar:" + String((accountId || userId)).replace(/[^a-zA-Z0-9_-]/g, "_");
    let data = await redisCommand("GET", key);
    if ((!data || typeof data !== "string") && accountId && accountId !== userId) {
      const legacyKey = "poker_app:avatar:" + String(userId).replace(/[^a-zA-Z0-9_-]/g, "_");
      data = await redisCommand("GET", legacyKey);
      if (data && typeof data === "string") {
        await redisCommand("SET", key, data);
      }
    }
    if (!data || typeof data !== "string") return res.status(200).json({ ok: true, avatar: null });
    return res.status(200).json({ ok: true, avatar: data.startsWith("data:") ? data : null });
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  }
  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const accountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });

  const image = body.image || body.avatar || body.data;
  if (!image || typeof image !== "string") {
    return res.status(400).json({ ok: false, error: "image (base64 data URL) обязателен" });
  }

  const base64 = image.replace(/^data:image\/\w+;base64,/, "");
  if (Buffer.byteLength(base64, "base64") > MAX_SIZE) {
    return res.status(400).json({ ok: false, error: "Изображение слишком большое (макс. 80 KB)" });
  }

  const key = "poker_app:avatar:" + String(accountId).replace(/[^a-zA-Z0-9_-]/g, "_");
  const stored = "data:image/jpeg;base64," + base64;
  const result = await redisCommand("SET", key, stored);

  if (result === undefined || result === null) {
    return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
  }
  return res.status(200).json({ ok: true, avatar: stored });
};
