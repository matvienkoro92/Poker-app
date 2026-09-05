/**
 * «Найди Пиханину»: GET — остаток призов, POST — выигрыш.
 */
const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const NOTIFY_CHAT_ID = process.env.TELEGRAM_NOTIFY_CHAT_ID || "5053253480";
const KEY = "poker_app:pikhanina_claimed_count";
const MAX_PRIZES = Math.max(0, parseInt(process.env.PIKHANINA_MAX_PRIZES, 10) || 15);

function validateTelegramWebAppData(initData, botToken) {
  const user = require("../resolve-telegram-auth").validateMiniAppInitData(initData, botToken);
  return user;
}

async function redisGet(key) {
  const data = await redisPipeline([["GET", key]]);
  return data && data[0] && data[0].result !== undefined ? data[0].result : null;
}

async function redisIncr(key) {
  const data = await redisPipeline([["INCR", key]]);
  return Array.isArray(data) && data[0] && data[0].result !== undefined ? data[0].result : null;
}

async function redisSet(key, value) {
  const data = await redisPipeline([["SET", key, String(value)]]);
  return Array.isArray(data) && data[0] && data[0].result === "OK";
}

async function sendTelegram(botToken, chatId, text) {
  if (!botToken || !chatId) return false;
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: String(chatId), text, disable_web_page_preview: true }),
  });
  return res.ok;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Сброс счётчика: GET или POST ?reset=1&secret=СЕКРЕТ (секрет из настроек Vercel)
  const resetSecret = process.env.PIKHANINA_RESET_SECRET || process.env.CRON_SECRET;
  if ((req.query.reset === "1" || req.query.reset === "true") && resetSecret && req.query.secret === resetSecret) {
    const ok = await redisSet(KEY, 0);
    if (ok) return res.status(200).json({ ok: true, reset: true, message: "Счётчик обнулён, призов снова " + MAX_PRIZES });
    return res.status(500).json({ ok: false, error: "Не удалось обнулить счётчик" });
  }

  // GET — остаток призов (всего 10, когда выбьют все — остаток 0)
  if (req.method === "GET") {
    const raw = await redisGet(KEY);
    const claimed = Math.max(0, parseInt(raw, 10) || 0);
    const remaining = Math.max(0, MAX_PRIZES - claimed);
    return res.status(200).json({ remaining });
  }

  // POST — выигрыш
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Server config: set TELEGRAM_BOT_TOKEN" });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const initData = body.initData || body.init_data;
  const promoCode = body.promoCode || body.promo_code;
  if (!initData || !promoCode || typeof promoCode !== "string") {
    return res.status(400).json({ ok: false, error: "initData and promoCode required" });
  }

  const user = validateTelegramWebAppData(initData, BOT_TOKEN);
  if (!user) return res.status(401).json({ ok: false, error: "Invalid initData" });

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Без имени";
  const username = user.username ? "@" + user.username : "—";
  const text = [
    "🎟 Кто-то выбил приз 200р в «Найди Пиханину»",
    "",
    "Кто: " + name,
    "Username: " + username,
    "ID: " + user.id,
    "Промокод: " + promoCode,
  ].join("\n");

  await redisIncr(KEY);

  const sent = await sendTelegram(BOT_TOKEN, NOTIFY_CHAT_ID.trim(), text);
  if (!sent) return res.status(500).json({ ok: false, error: "Failed to send Telegram message" });

  return res.status(200).json({ ok: true });
};
