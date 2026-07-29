const { pipeline: redisPipeline, isConfigured: redisConfigured, sscanall } = require("../redis");
/**
 * Ручная рассылка подписчикам рейтинга (из админской кнопки в мини‑апке).
 *
 * POST /api/rating-manual-subscribers
 *   body: { initData: string }
 *
 * Только для админов (TELEGRAM_ADMIN_ID). Без CRON_SECRET.
 * Рассылает личное сообщение всем chat_id из poker_app:rating_subscribers.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const RATING_SUBSCRIBERS_KEY = "poker_app:rating_subscribers";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN) return { ok: false, error: "No BOT_TOKEN" };
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: String(chatId),
      text: text,
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true };
  const desc = (data && data.description) || "";
  if (desc.indexOf("can't initiate") !== -1 || desc.indexOf("blocked") !== -1) {
    return { ok: false, hint: "user_blocked" };
  }
  return { ok: false, hint: desc || "Ошибка Telegram" };
}

const DEFAULT_MESSAGE =
  "🏆 Рейтинг турнирщиков обновлён!\n\nАктуальная таблица и топы недели — в приложении клуба.";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!redisConfigured() || !MINI_APP_URL) {
    return res
      .status(500)
      .json({ ok: false, error: "Server not configured for rating-manual-subscribers" });
  }

  let body = {};
  if (req.method === "POST") {
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    } catch (e) {
      body = {};
    }
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const myId = memberIdFromIdentity(identity);
  if (!identity || !myId) {
    return res.status(401).json({ ok: false, error: "Войдите в приложение (Telegram или PWA)." });
  }

  if (!isAdminIdentity(identity, myId)) {
    return res.status(403).json({ ok: false, error: "Только для админов" });
  }

  const chatIds = await sscanall(RATING_SUBSCRIBERS_KEY, {
    context: "rating.manual-subscribers",
    count: 400,
    maxPages: 50,
  });
  if (!Array.isArray(chatIds)) {
    return res.status(500).json({ ok: false, error: "Redis unavailable" });
  }
  // GET: только вернуть статистику, без рассылки
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      sent: 0,
      total: chatIds.length,
      statsOnly: true,
    });
  }

  let messageText = DEFAULT_MESSAGE;
  if (!messageText.includes("http")) {
    const baseAppUrl = String(
      MINI_APP_URL && MINI_APP_URL.indexOf("t.me/") !== -1 ? MINI_APP_URL : "https://t.me/Poker_dvatuza_bot/DvaTuza"
    )
      .replace(/\/$/, "")
      .replace(/[)\s]+$/, "");
    const ratingLink = baseAppUrl + "?startapp=spring_rating";
    messageText = messageText + "\n\nОткрыть рейтинг: " + ratingLink;
  }

  let sent = 0;
  for (const chatId of chatIds) {
    const r = await sendTelegramMessage(chatId, messageText);
    if (r && r.ok) sent++;
  }

  return res.status(200).json({
    ok: true,
    sent,
    total: chatIds.length,
  });
};
