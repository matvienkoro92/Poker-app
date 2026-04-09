/**
 * Ручная рассылка подписчикам газеты (из админской кнопки в мини‑апке).
 *
 * POST /api/gazette-manual-subscribers
 *   body: { initData: string }
 *
 * Только для админов (TELEGRAM_ADMIN_ID). Без CRON_SECRET.
 * Рассылает личное сообщение всем chat_id из poker_app:gazette_subscribers
 * и дублирует то же объявление в общий чат клуба (Redis poker_app:chat_messages).
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const GAZETTE_SUBSCRIBERS_KEY = "poker_app:gazette_subscribers";
const GENERAL_CHAT_KEY = "poker_app:chat_messages";
const MAX_CHAT_MESSAGES = 100;
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
/** Ссылка на Mini App в Telegram — в рассылке всегда используем её, чтобы по клику открывалось приложение в Telegram */
const TELEGRAM_APP_URL = "https://t.me/Poker_dvatuza_bot/DvaTuza";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) return null;
  return await res.json();
}

function isAdmin(userId) {
  const id = String(userId).replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

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
  "📰 Вестник Два туза\n\nВ газете появилась новая новость!";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!REDIS_URL || !REDIS_TOKEN || !MINI_APP_URL) {
    return res
      .status(500)
      .json({ ok: false, error: "Server not configured for gazette-manual-subscribers" });
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

  if (!isAdmin(myId)) {
    return res.status(403).json({ ok: false, error: "Только для админов" });
  }

  const results = await redisPipeline([["SMEMBERS", GAZETTE_SUBSCRIBERS_KEY]]);
  if (!results || !results[0] || results[0].result === undefined) {
    return res.status(500).json({ ok: false, error: "Redis unavailable" });
  }

  const chatIds = Array.isArray(results[0].result) ? results[0].result : [];
  // GET: только вернуть статистику, без рассылки
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      sent: 0,
      total: chatIds.length,
      statsOnly: true,
    });
  }

  const headline = (body.headline && String(body.headline).trim()) || "";
  const articleIndex = body.articleIndex != null
    ? (typeof body.articleIndex === "number" ? body.articleIndex : parseInt(body.articleIndex, 10))
    : null;
  const numIndex = Number.isNaN(articleIndex) ? null : articleIndex;

  let messageText =
    headline.length > 0
      ? "📰 Вестник Два туза\n\nВ газете новая новость:\n\n«" + headline + "»"
      : DEFAULT_MESSAGE;

  const baseAppUrl = String(TELEGRAM_APP_URL)
    .replace(/\/$/, "")
    .replace(/[)\s]+$/, "");
  const newsLink =
    numIndex != null && numIndex >= 0
      ? baseAppUrl + "?startapp=news_" + numIndex
      : baseAppUrl + "?startapp=news";

  if (!messageText.includes("http")) {
    messageText = messageText + "\n\nОткрыть новость: " + newsLink;
  }

  let sent = 0;
  for (const chatId of chatIds) {
    const r = await sendTelegramMessage(chatId, messageText);
    if (r && r.ok) sent++;
  }

  const linkText =
    newsLink ||
    baseAppUrl + "?startapp=news" ||
    MINI_APP_URL ||
    "Откройте приложение и раздел «Газета» в меню.";
  const chatMessageText =
    headline.length > 0
      ? "📰 Новая новость в газете «Вестник Два туза»:\n\n" + headline + "\n\n" + linkText
      : "📰 В газете «Вестник Два туза» новая новость!\n\n" + linkText;
  const systemMsg = {
    id: "msg_gazette_manual_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
    from: "system_gazette",
    fromName: "📰 Вестник Два туза",
    text: chatMessageText,
    time: new Date().toISOString(),
  };
  const chatResults = await redisPipeline([
    ["LPUSH", GENERAL_CHAT_KEY, JSON.stringify(systemMsg)],
    ["LTRIM", GENERAL_CHAT_KEY, "0", String(MAX_CHAT_MESSAGES - 1)],
  ]);
  const chatPosted = !!(chatResults && !chatResults.some((r) => r && r.error));

  return res.status(200).json({
    ok: true,
    sent,
    total: chatIds.length,
    chatPosted,
  });
};

