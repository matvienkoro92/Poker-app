const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Ручное уведомление об обновлении рейтинга (через админскую кнопку в мини‑апке).
 * Только для админов (по TELEGRAM_ADMIN_ID). Без CRON_SECRET.
 *
 * POST /api/rating-manual
 *   body: { initData: string, action?: "spring_rating_notify" }
 *
 * Берёт MINI_APP_URL и кладёт два сообщения в общий чат:
 *   - про Лигу 1 весеннего рейтинга
 *   - про Лигу 2 весеннего рейтинга
 */
const crypto = require("crypto");
const { isAdmin, isAdminUsername } = require("../api-auth");

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";

const GENERAL_CHAT_KEY = "poker_app:chat_messages";
const MAX_CHAT_MESSAGES = 100;
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
const { triggerGeneralChatWebPushFromStoredMessage } = require("../chat-webpush-notify");

function validateUser(initData) {
  const user = require("../resolve-telegram-auth").validateMiniAppInitData(initData, BOT_TOKEN);
  return user;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!redisConfigured() || !MINI_APP_URL) {
    return res
      .status(500)
      .json({ ok: false, error: "Server not configured for rating-manual" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (e) {
    body = {};
  }

  const initData =
    req.query.initData || req.query.init_data || body.initData || body.init_data || "";
  const user = validateUser(initData);
  if (!user) {
    return res
      .status(401)
      .json({ ok: false, error: "Откройте приложение в Telegram (нет initData)" });
  }

  const myId = "tg_" + user.id;
  if (!isAdmin(myId)) {
    return res.status(403).json({ ok: false, error: "Только для админов" });
  }

  const nowIso = new Date().toISOString();

  const baseAppUrl = String(MINI_APP_URL && MINI_APP_URL.indexOf("t.me/") !== -1 ? MINI_APP_URL : "https://t.me/Poker_dvatuza_bot/DvaTuza")
    .replace(/\/$/, "")
    .replace(/[)\s]+$/, "");
  const ratingLink = baseAppUrl + "?startapp=spring_rating";
  const msg = {
    id: "msg_rating_spring_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    from: "rating_spring",
    fromName: "Рейтинг турнирщиков весны",
    text:
      "🏆 Обновилась итоговая таблица рейтинга турнирщиков.\n\nОткрыть рейтинг: " +
      ratingLink,
    time: nowIso,
  };

  let chatPipe;
  try {
    chatPipe = await redisPipeline([
      ["LPUSH", GENERAL_CHAT_KEY, JSON.stringify(msg)],
      ["LTRIM", GENERAL_CHAT_KEY, "0", String(MAX_CHAT_MESSAGES - 1)],
    ]);
  } catch (e) {
    return res
      .status(500)
      .json({ ok: false, error: "Не удалось сохранить сообщение в чат" });
  }
  if (!chatPipe || chatPipe.some((r) => r && r.error)) {
    return res
      .status(500)
      .json({ ok: false, error: "Не удалось сохранить сообщение в чат" });
  }
  try {
    await triggerGeneralChatWebPushFromStoredMessage(msg);
  } catch (ePush) {
    console.error(
      "[rating-manual] triggerGeneralChatWebPushFromStoredMessage",
      ePush && ePush.message ? ePush.message : ePush
    );
  }

  return res.status(200).json({
    ok: true,
    sentToChat: true,
  });
};
