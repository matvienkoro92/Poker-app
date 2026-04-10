/**
 * Входящие апдейты Telegram Bot API (webhook).
 * Сохраняет актуальный @username в poker_app:visitor_usernames для tg_<id>,
 * чтобы вход в PWA по username находил пользователя без обязательного захода в Mini App.
 *
 * Настройка:
 * 1. Vercel: TELEGRAM_BOT_WEBHOOK_SECRET — длинная случайная строка (как CRON_SECRET).
 * 2. setWebhook с тем же secret_token:
 *    POST https://api.telegram.org/bot<TOKEN>/setWebhook
 *    { "url": "https://<хост>/api/telegram-bot-webhook", "secret_token": "<тот же секрет>" }
 *
 * При пустом username у пользователя поле в хеше удаляется (устаревший ник не остаётся).
 */
const crypto = require("crypto");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const WEBHOOK_SECRET = (process.env.TELEGRAM_BOT_WEBHOOK_SECRET || "").trim();

const USERNAMES_KEY = "poker_app:visitor_usernames";

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
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
  } catch (e) {
    return null;
  }
}

function headerSecret(req) {
  const h = req.headers || {};
  const v = h["x-telegram-bot-api-secret-token"] || h["X-Telegram-Bot-Api-Secret-Token"];
  return v != null ? String(v).trim() : "";
}

function secretsEqual(a, b) {
  const ba = Buffer.from(String(a), "utf8");
  const bb = Buffer.from(String(b), "utf8");
  if (ba.length !== bb.length) return false;
  try {
    return crypto.timingSafeEqual(ba, bb);
  } catch (e) {
    return false;
  }
}

/** Достаём User из типичных полей Update (Bot API). */
function extractTelegramUser(update) {
  if (!update || typeof update !== "object") return null;
  if (update.message && update.message.from) return update.message.from;
  if (update.edited_message && update.edited_message.from) return update.edited_message.from;
  if (update.callback_query && update.callback_query.from) return update.callback_query.from;
  if (update.inline_query && update.inline_query.from) return update.inline_query.from;
  if (update.chosen_inline_result && update.chosen_inline_result.from) return update.chosen_inline_result.from;
  if (update.shipping_query && update.shipping_query.from) return update.shipping_query.from;
  if (update.pre_checkout_query && update.pre_checkout_query.from) return update.pre_checkout_query.from;
  if (update.chat_join_request && update.chat_join_request.from) return update.chat_join_request.from;
  const mcm = update.my_chat_member;
  if (mcm && mcm.new_chat_member && mcm.new_chat_member.user && !mcm.new_chat_member.user.is_bot) {
    return mcm.new_chat_member.user;
  }
  if (mcm && mcm.from && !mcm.from.is_bot) return mcm.from;
  const cm = update.chat_member;
  if (cm && cm.new_chat_member && cm.new_chat_member.user && !cm.new_chat_member.user.is_bot) {
    return cm.new_chat_member.user;
  }
  if (cm && cm.from && !cm.from.is_bot) return cm.from;
  if (update.poll_answer && update.poll_answer.user) return update.poll_answer.user;
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Telegram-Bot-Api-Secret-Token");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  if (!WEBHOOK_SECRET) {
    return res.status(503).json({
      ok: false,
      error: "TELEGRAM_BOT_WEBHOOK_SECRET not configured",
    });
  }
  if (!secretsEqual(headerSecret(req), WEBHOOK_SECRET)) {
    return res.status(403).json({ ok: false, error: "Invalid secret" });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let update;
  try {
    update = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const user = extractTelegramUser(update);
  if (!user || user.is_bot) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const idRaw = user.id;
  const n = typeof idRaw === "number" ? idRaw : parseInt(String(idRaw), 10);
  if (!Number.isFinite(n) || n <= 0) {
    return res.status(200).json({ ok: true, skipped: true });
  }
  const safeId = "tg_" + String(Math.floor(n));

  const uname = user.username != null ? String(user.username).trim() : "";
  const commands = uname ? [["HSET", USERNAMES_KEY, safeId, uname]] : [["HDEL", USERNAMES_KEY, safeId]];

  const pipe = await redisPipeline(commands);
  if (!pipe || (pipe[0] && pipe[0].error)) {
    console.error("telegram-bot-webhook: redis pipeline failed", pipe && pipe[0] && pipe[0].error);
    return res.status(500).json({ ok: false, error: "Redis error" });
  }

  return res.status(200).json({ ok: true, updated: true, hasUsername: !!uname });
};
