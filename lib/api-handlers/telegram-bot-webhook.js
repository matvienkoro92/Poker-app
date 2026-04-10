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
 *
 * Ответы в личку: /start и /help — приветствие + кнопка «Открыть приложение» (иначе после
 * setWebhook бот «молчит», если раньше команды обрабатывались другим скриптом через getUpdates).
 */
const crypto = require("crypto");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const WEBHOOK_SECRET = (process.env.TELEGRAM_BOT_WEBHOOK_SECRET || "").trim();
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const DEFAULT_MINI_APP_TME = "https://t.me/Poker_dvatuza_bot/DvaTuza";

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

function isPrivateMessage(update) {
  const m = update.message;
  return !!(m && m.chat && m.chat.type === "private");
}

/** Текст команды в личке (/start@BotName …) или null */
function privateMessageCommandText(update) {
  if (!isPrivateMessage(update)) return null;
  const t = update.message.text != null ? String(update.message.text).trim() : "";
  if (!t || t[0] !== "/") return null;
  return t;
}

function commandKind(text) {
  if (!text) return null;
  const head = text.split(/\s/)[0].toLowerCase();
  const m = head.match(/^\/([a-z0-9_]+)(?:@[a-z0-9_]+)?$/i);
  const cmdName = m ? m[1] : null;
  if (cmdName === "start") return "start";
  if (cmdName === "help") return "help";
  if (head[0] === "/") return "other";
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

  let update;
  try {
    update = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const user = extractTelegramUser(update);
  const cmdText = privateMessageCommandText(update);
  const cmd = commandKind(cmdText);

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
  const redisCmds = uname ? [["HSET", USERNAMES_KEY, safeId, uname]] : [["HDEL", USERNAMES_KEY, safeId]];

  const redisConfigured = !!(REDIS_URL && REDIS_TOKEN);
  const pipe = redisConfigured ? await redisPipeline(redisCmds) : null;
  let redisOk = false;
  if (redisConfigured) {
    redisOk = !!(pipe && !(pipe[0] && pipe[0].error));
    if (!redisOk) {
      console.error("telegram-bot-webhook: redis pipeline failed", pipe && pipe[0] && pipe[0].error);
    }
  }

  const chatId = update.message && update.message.chat ? update.message.chat.id : null;
  if (cmd && chatId != null && BOT_TOKEN) {
    const openUrl = resolveTelegramOpenButtonUrl(DEFAULT_MINI_APP_TME);
    let bodyText = "";
    if (cmd === "start" || cmd === "help") {
      bodyText =
        "Привет! Это бот клуба «Два туза».\n\n" +
        "Откройте приложение кнопкой ниже — расписание, чат, газета, розыгрыши и вход в PWA.";
    } else {
      bodyText =
        "Команды бота обрабатываются здесь. Основные разделы — в мини-приложении, откройте его кнопкой ниже.";
    }
    await sendTelegramMessage(BOT_TOKEN, {
      chatId,
      text: bodyText,
      buttonText: "Открыть приложение",
      buttonUrl: openUrl || DEFAULT_MINI_APP_TME,
    });
  } else if (cmd && chatId != null && !BOT_TOKEN) {
    console.error("telegram-bot-webhook: TELEGRAM_BOT_TOKEN missing, cannot reply to DM command");
  }

  return res.status(200).json({
    ok: true,
    updated: redisOk,
    hasUsername: !!uname,
    replied: !!(cmd && chatId != null && BOT_TOKEN),
    redisOk,
    redisConfigured,
  });
};
