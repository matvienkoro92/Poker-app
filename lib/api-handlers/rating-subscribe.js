/**
 * Подписка на пуши об обновлении рейтинга турнирщиков.
 * POST body: { initData[, unsubscribe] } или { pwaSession[, unsubscribe] } (PWA после Telegram Login).
 * Переменные: TELEGRAM_BOT_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
 */
const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { verifyPwaSessionToken } = require("../poker-pwa-session");
const {
  hasAnyBotSubscription,
  recordBotSubscriptionTransition,
} = require("../bot-subscription-events");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const RATING_SUBSCRIBERS_KEY = "poker_app:rating_subscribers";

function validateTelegramWebAppData(initData, botToken) {
  const user = require("../resolve-telegram-auth").validateMiniAppInitData(initData, botToken);
  return user;
}

async function redisCommand(command, ...args) {
  if (!redisConfigured()) return { error: "not_configured" };
  const data = await redisPipeline([[command, ...args]]);
  if (!Array.isArray(data) || !data[0]) return { error: "request_failed" };
  if (data[0].error) return { error: "redis_error" };
  return { result: data[0].result };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  var userId = null;
  const initData = body.initData || body.init_data;
  if (initData) {
    const user = validateTelegramWebAppData(String(initData), BOT_TOKEN);
    if (user && user.id != null) userId = String(user.id);
  }
  if (!userId) {
    const bPwa = String(body.pwaSession || body.pwa_session || "").trim();
    if (bPwa) {
      const pv = verifyPwaSessionToken(bPwa, BOT_TOKEN);
      if (pv && pv.id != null) userId = String(pv.id);
    }
  }
  if (!userId) {
    const vkHint = String(body.pwaVkSession || body.pwa_vk_session || "").trim();
    if (vkHint) {
      return res.status(400).json({
        ok: false,
        error:
          "Уведомления о рейтинге приходят в Telegram. Войдите через Telegram в приложении или откройте мини‑апп в Telegram.",
      });
    }
    return res.status(400).json({
      ok: false,
      error: "Откройте в Telegram или войдите через Telegram на сайте (PWA).",
    });
  }
  const unsubscribe = !!(body.unsubscribe || body.unsub);
  const wasBotSubscribed = await hasAnyBotSubscription(redisPipeline, userId);

  if (unsubscribe) {
    const out = await redisPipeline([["SREM", RATING_SUBSCRIBERS_KEY, userId]]);
    if (!out || (out[0] && out[0].error)) {
      return res.status(503).json({ ok: false, error: "Сервис временно недоступен" });
    }
    const isBotSubscribed = await hasAnyBotSubscription(redisPipeline, userId);
    await recordBotSubscriptionTransition(redisPipeline, userId, wasBotSubscribed, isBotSubscribed);
    return res.status(200).json({ ok: true, subscribed: false });
  }

  const out = await redisPipeline([["SADD", RATING_SUBSCRIBERS_KEY, userId]]);
  if (!out || (out[0] && out[0].error)) {
    return res.status(503).json({ ok: false, error: "Сервис временно недоступен. Попробуйте позже." });
  }
  const isBotSubscribed = await hasAnyBotSubscription(redisPipeline, userId);
  await recordBotSubscriptionTransition(redisPipeline, userId, wasBotSubscribed, isBotSubscribed);
  return res.status(200).json({ ok: true, subscribed: true });
};
