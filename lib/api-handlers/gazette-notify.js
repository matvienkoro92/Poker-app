const { pipeline: redisPipeline, sscanall, isConfigured: redisConfigured } = require("../redis");
/**
 * Рассылка пуша «новая новость в газете» всем подписчикам и/или пост в общий чат со ссылкой.
 * Вызывать вручную или по крону после публикации новости.
 * GET/POST с заголовком X-Cron-Secret или query secret=CRON_SECRET.
 * Body: message, headline, postToChat; newsId — уникальный id новости (рассылка по этой новости только один раз); articleIndex — номер новости (0,1,2…) для ссылки в сообщении.
 * Переменные: TELEGRAM_BOT_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, CRON_SECRET, MINI_APP_URL (ссылка на приложение, например https://t.me/BotName/app).
 */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CRON_SECRET = process.env.CRON_SECRET;
const GAZETTE_SUBSCRIBERS_KEY = "poker_app:gazette_subscribers";
const GAZETTE_NOTIFIED_IDS_KEY = "poker_app:gazette_notified_ids";
const GENERAL_CHAT_KEY = "poker_app:chat_messages";
const MAX_CHAT_MESSAGES = 100;
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
const { sendTelegramMessage: tgSendDm } = require("../telegram-bot-send");
const { triggerGeneralChatWebPushFromStoredMessage } = require("../chat-webpush-notify");

function buildNewsLink(articleIndex) {
  if (!MINI_APP_URL) return "";
  const sep = MINI_APP_URL.includes("?") ? "&" : "?";
  const startapp = typeof articleIndex === "number" && articleIndex >= 0 ? "news_" + articleIndex : "news";
  return MINI_APP_URL + sep + "startapp=" + startapp;
}

const DEFAULT_MESSAGE_BASE = "📰 Вестник Два туза\n\nВ газете новая новость!";

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

  const auth = req.headers["x-cron-secret"] || (req.query && req.query.secret) || (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || auth !== CRON_SECRET) {
    return res.status(403).json({ ok: false, error: "Invalid or missing CRON_SECRET" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  let messageText = DEFAULT_MESSAGE_BASE;
  let headline = "";
  let postToChat = false;
  let newsId = null;
  let articleIndex = null;
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (body.message && typeof body.message === "string") messageText = body.message;
    if (body.headline && typeof body.headline === "string") headline = body.headline.trim();
    if (body.title && typeof body.title === "string" && !headline) headline = body.title.trim();
    if (body.postToChat === true || body.post_to_chat === true) postToChat = true;
    if (body.newsId != null) newsId = String(body.newsId);
    if (body.articleIndex != null) articleIndex = typeof body.articleIndex === "number" ? body.articleIndex : parseInt(body.articleIndex, 10);
    if (Number.isNaN(articleIndex)) articleIndex = null;
  } catch (e) {}

  const link = buildNewsLink(articleIndex);
  if (!messageText.includes("http") && link) {
    messageText = messageText + "\n\nОткрыть новость: " + link;
  } else if (!link && messageText === DEFAULT_MESSAGE_BASE) {
    messageText = messageText + " Откройте приложение и раздел «Газета».";
  }

  if (newsId && redisConfigured()) {
    // Атомарная бронь новости исключает двойную рассылку при одновременных cron/deploy вызовах.
    const claimResults = await redisPipeline([["SADD", GAZETTE_NOTIFIED_IDS_KEY, newsId]]);
    if (claimResults && claimResults[0] && Number(claimResults[0].result) === 0) {
      return res.status(200).json({ ok: true, alreadySent: true, sent: 0, total: 0 });
    }
  }

  const chatIds = await sscanall(GAZETTE_SUBSCRIBERS_KEY, {
    context: "gazette-notify.subscribers",
    count: 250,
    maxPages: 100,
  });
  if (!chatIds) {
    return res.status(500).json({ ok: false, error: "Redis unavailable" });
  }
  let sent = 0;
  const btnUrl = link && link.startsWith("http") ? link : "";
  const btnText = btnUrl ? "Открыть новость" : "";
  for (const chatId of chatIds) {
    const r = await tgSendDm(BOT_TOKEN, {
      chat_id: chatId,
      text: messageText,
      buttonText: btnText || undefined,
      buttonUrl: btnUrl || undefined,
    });
    if (r && r.ok) sent++;
  }

  let chatPosted = false;
  if (postToChat && redisConfigured()) {
    const linkText = link || MINI_APP_URL || "Откройте приложение и раздел «Газета» в меню.";
    const chatMessageText = headline
      ? "📰 Новая новость в газете «Вестник Два туза»:\n\n" + headline + "\n\n" + linkText
      : "📰 В газете «Вестник Два туза» новая новость!\n\n" + linkText;
    const systemMsg = {
      id: "msg_gazette_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
      from: "system_gazette",
      fromName: "📰 Вестник Два туза",
      text: chatMessageText,
      time: new Date().toISOString(),
    };
    const chatResults = await redisPipeline([
      ["LPUSH", GENERAL_CHAT_KEY, JSON.stringify(systemMsg)],
      ["LTRIM", GENERAL_CHAT_KEY, "0", String(MAX_CHAT_MESSAGES - 1)],
    ]);
    if (chatResults && !chatResults.some((r) => r && r.error)) chatPosted = true;
    if (chatPosted) {
      try {
        await triggerGeneralChatWebPushFromStoredMessage(systemMsg);
      } catch (ePush) {
        console.error(
          "[gazette-notify] triggerGeneralChatWebPushFromStoredMessage",
          ePush && ePush.message ? ePush.message : ePush
        );
      }
    }
  }

  return res.status(200).json({
    ok: true,
    sent,
    total: chatIds.length,
    alreadySent: false,
    chatPosted: postToChat ? chatPosted : undefined,
  });
};
