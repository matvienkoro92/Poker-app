const { pipeline: redisPipeline, sscanall, isConfigured: redisConfigured } = require("../redis");
/**
 * Одно сообщение подписчикам рейтинга после обновления (например после пуша).
 * Вызывать из deploy-hook или вручную с CRON_SECRET.
 * GET/POST с заголовком X-Cron-Secret или query secret=CRON_SECRET.
 * Body: ratingId — уникальный id обновления (рассылка по этому id только один раз); message — свой текст.
 * Переменные: TELEGRAM_BOT_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, CRON_SECRET, MINI_APP_URL.
 */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CRON_SECRET = process.env.CRON_SECRET;
const RATING_SUBSCRIBERS_KEY = "poker_app:rating_subscribers";
const RATING_NOTIFIED_IDS_KEY = "poker_app:rating_notified_ids";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
const GENERAL_CHAT_KEY = "poker_app:chat_messages";
const MAX_CHAT_MESSAGES = 100;
const { triggerGeneralChatWebPushFromStoredMessage } = require("../chat-webpush-notify");

async function sendTelegramMessage(chatId, text) {
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

const DEFAULT_MESSAGE = "🏆 Рейтинг турнирщиков обновлён!\n\nАктуальная таблица и топы недели — в приложении клуба.";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const auth =
    (req.headers && req.headers["x-cron-secret"]) ||
    (req.query && req.query.secret) ||
    ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || auth !== CRON_SECRET) {
    return res.status(403).json({ ok: false, error: "Invalid or missing CRON_SECRET" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  let messageText = DEFAULT_MESSAGE;
  let ratingId = null;
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (body.message && typeof body.message === "string") messageText = body.message;
    if (body.ratingId != null) ratingId = String(body.ratingId);
  } catch (e) {}

  if (MINI_APP_URL && !messageText.includes("http")) {
    const baseAppUrl = String(
      MINI_APP_URL.indexOf("t.me/") !== -1 ? MINI_APP_URL : "https://t.me/Poker_dvatuza_bot/DvaTuza"
    )
      .replace(/\/$/, "")
      .replace(/[)\s]+$/, "");
    const ratingLink = baseAppUrl + "?startapp=spring_rating";
    messageText = messageText + "\n\nОткрыть рейтинг: " + ratingLink;
  }

  if (ratingId && redisConfigured()) {
    // SADD одновременно проверяет и резервирует id: два параллельных запуска не смогут разослать одно обновление.
    const claimResults = await redisPipeline([["SADD", RATING_NOTIFIED_IDS_KEY, ratingId]]);
    if (claimResults && claimResults[0] && Number(claimResults[0].result) === 0) {
      return res.status(200).json({ ok: true, alreadySent: true, sent: 0, total: 0 });
    }
  }

  const chatIds = await sscanall(RATING_SUBSCRIBERS_KEY, {
    context: "rating-notify.subscribers",
    count: 250,
    maxPages: 100,
  });
  if (!chatIds) {
    return res.status(500).json({ ok: false, error: "Redis unavailable" });
  }
  let sent = 0;
  for (const chatId of chatIds) {
    const r = await sendTelegramMessage(chatId, messageText);
    if (r && r.ok) sent++;
  }

  // Одно сообщение в общий чат с общей ссылкой на рейтинг турнирщиков (открывает мини‑апп)
  if (MINI_APP_URL && redisConfigured()) {
    const baseAppUrl = String(
      MINI_APP_URL.indexOf("t.me/") !== -1 ? MINI_APP_URL : "https://t.me/Poker_dvatuza_bot/DvaTuza"
    )
      .replace(/\/$/, "")
      .replace(/[)\s]+$/, "");
    const ratingLink = baseAppUrl + "?startapp=spring_rating";
    const nowIso = new Date().toISOString();
    const msg = {
      id: "msg_rating_spring_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
      from: "rating_spring",
      fromName: "Рейтинг турнирщиков весны",
      text:
        "🏆 Обновилась итоговая таблица рейтинга турнирщиков.\n\nОткрыть рейтинг: " +
        ratingLink,
      time: nowIso,
    };
    try {
      const chatPipe = await redisPipeline([
        ["LPUSH", GENERAL_CHAT_KEY, JSON.stringify(msg)],
        ["LTRIM", GENERAL_CHAT_KEY, "0", String(MAX_CHAT_MESSAGES - 1)],
      ]);
      if (chatPipe && !chatPipe.some((r) => r && r.error)) {
        try {
          await triggerGeneralChatWebPushFromStoredMessage(msg);
        } catch (ePush) {
          console.error(
            "[rating-notify] triggerGeneralChatWebPushFromStoredMessage",
            ePush && ePush.message ? ePush.message : ePush
          );
        }
      }
    } catch (e) {
      // молча игнорируем ошибку записи в чат, чтобы не ломать основную рассылку
    }
  }

  return res.status(200).json({
    ok: true,
    sent,
    total: chatIds.length,
    alreadySent: false,
  });
};
