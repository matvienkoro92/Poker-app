const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
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
 *
 * Если команды «внезапно» перестали отвечать: проверьте в Vercel TELEGRAM_BOT_WEBHOOK_SECRET
 * и setWebhook с тем же secret_token; ответ 403/503 от хоста Telegram помечает доставку как ошибку.
 * Личка через Telegram Business приходит в полях business_message / edited_business_message;
 * для ответа sendMessage нужен тот же business_connection_id, что у входящего Message.
 *
 * Salebot (тот же бот): у Telegram один webhook. Укажите setWebhook на этот хост, а в Vercel задайте
 * TELEGRAM_SALEBOT_FORWARD_URL — полный URL приёма Salebot (как в getWebhookInfo, например
 * https://chatter.salebot.pro/tg_webhook/<токен>). Тогда после обработки (Redis и т.д.) апдейт
 * пересылается POST JSON телом, как от Telegram. При этом /start и /help всё равно подтверждаем
 * здесь, чтобы бот не выглядел «молчаливым», даже если сценарий на стороне Salebot не настроен.
 */
const crypto = require("crypto");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const WEBHOOK_SECRET = (process.env.TELEGRAM_BOT_WEBHOOK_SECRET || "").trim();
const SALEBOT_FORWARD_URL = (process.env.TELEGRAM_SALEBOT_FORWARD_URL || "").trim();
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const DEFAULT_MINI_APP_TME = "https://t.me/Poker_dvatuza_bot/DvaTuza";

const USERNAMES_KEY = "poker_app:visitor_usernames";
const USERNAME_TO_USER_KEY = "poker_app:visitor_username_to_user";
const LATEST_CLUB_CHANNEL_POST_KEY = "poker_app:telegram:club_channel:last_post";
const CLUB_CHANNEL_HANDLE = String(process.env.RAFFLE_CHANNEL || "@Dva_tuza_club")
  .trim()
  .replace(/^https?:\/\/t\.me\//i, "")
  .replace(/^@+/, "")
  .replace(/\/.*$/, "")
  .toLowerCase();

function extractClubChannelPost(update) {
  const message = update && (update.channel_post || update.edited_channel_post);
  if (!message || !message.chat || message.chat.type !== "channel") return null;
  const username = String(message.chat.username || "").trim().replace(/^@+/, "").toLowerCase();
  if (CLUB_CHANNEL_HANDLE && username !== CLUB_CHANNEL_HANDLE) return null;
  const photos = Array.isArray(message.photo) ? message.photo : [];
  const largestPhoto = photos.length ? photos[photos.length - 1] : null;
  const text = String(message.text || message.caption || "").trim().slice(0, 4096);
  const photoFileId = largestPhoto && largestPhoto.file_id ? String(largestPhoto.file_id).trim() : "";
  if (!text && !photoFileId) return null;
  return {
    chatId: String(message.chat.id || ""),
    channel: username ? "@" + username : "",
    messageId: Number(message.message_id) || 0,
    date: Number(message.date) || 0,
    text,
    photoFileId,
    photoMessageId: photoFileId ? Number(message.message_id) || 0 : 0,
    mediaGroupId: String(message.media_group_id || ""),
    updatedAt: new Date().toISOString(),
  };
}

async function usernameRedisCommands(safeId, username) {
  const uname = username != null ? String(username).trim() : "";
  const commands = [];
  const existing = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
  const raw = existing && existing[0] && existing[0].result;
  let previousUsername = "";
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      if (String(raw[i] || "") === safeId) {
        previousUsername = raw[i + 1] != null ? String(raw[i + 1]).trim().toLowerCase() : "";
        break;
      }
    }
  } else if (raw && typeof raw === "object" && raw[safeId] != null) {
    previousUsername = String(raw[safeId] || "").trim().toLowerCase();
  }
  if (!uname) {
    if (previousUsername) commands.push(["HDEL", USERNAME_TO_USER_KEY, previousUsername]);
    commands.push(["HDEL", USERNAMES_KEY, safeId]);
    return commands;
  }
  const normalized = uname.toLowerCase();
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const key = raw[i] != null ? String(raw[i]) : "";
      const val = raw[i + 1] != null ? String(raw[i + 1]).trim().toLowerCase() : "";
      if (key && key !== safeId && key.startsWith("tg_") && val === normalized) commands.push(["HDEL", USERNAMES_KEY, key]);
    }
  } else if (raw && typeof raw === "object") {
    for (const key of Object.keys(raw)) {
      const val = raw[key] != null ? String(raw[key]).trim().toLowerCase() : "";
      if (key !== safeId && String(key).startsWith("tg_") && val === normalized) commands.push(["HDEL", USERNAMES_KEY, String(key)]);
    }
  }
  if (previousUsername && previousUsername !== normalized) commands.push(["HDEL", USERNAME_TO_USER_KEY, previousUsername]);
  commands.push(["HSET", USERNAMES_KEY, safeId, uname]);
  commands.push(["HSET", USERNAME_TO_USER_KEY, normalized, safeId]);
  return commands;
}

function headerSecret(req) {
  const h = req.headers || {};
  let v = h["x-telegram-bot-api-secret-token"] || h["X-Telegram-Bot-Api-Secret-Token"];
  if (v == null || v === "") {
    try {
      for (const k of Object.keys(h)) {
        if (String(k).toLowerCase() === "x-telegram-bot-api-secret-token") {
          v = h[k];
          break;
        }
      }
    } catch (e) {}
  }
  return v != null ? String(v).trim() : "";
}

function parseWebhookJsonBody(req) {
  const raw = req.body;
  if (raw == null || raw === "") return {};
  try {
    if (Buffer.isBuffer(raw)) {
      return JSON.parse(raw.toString("utf8") || "{}");
    }
    if (typeof raw === "string") {
      return JSON.parse(raw || "{}");
    }
    if (typeof raw === "object") return raw;
  } catch (e) {
    return {};
  }
  return {};
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

/**
 * Пересылает тот же JSON Update на приёмник Salebot (как шлёт Telegram).
 * Секрет webhook в заголовке не передаём — у Salebot обычно токен уже в пути.
 */
async function forwardUpdateToSalebot(update) {
  if (!SALEBOT_FORWARD_URL) {
    return { forwarded: false, skipped: true };
  }
  const ctrl = new AbortController();
  const ms = Math.min(
    Math.max(parseInt(String(process.env.TELEGRAM_SALEBOT_FORWARD_TIMEOUT_MS || "4500"), 10) || 4500, 500),
    25000
  );
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(SALEBOT_FORWARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
      signal: ctrl.signal,
    });
    return { forwarded: true, status: res.status, ok: res.ok };
  } catch (e) {
    console.error("telegram-bot-webhook: TELEGRAM_SALEBOT_FORWARD_URL request failed", e && e.message);
    return { forwarded: true, ok: false, error: e && e.message ? String(e.message) : "error" };
  } finally {
    clearTimeout(t);
  }
}

/** Достаём User из типичных полей Update (Bot API). */
function extractTelegramUser(update) {
  if (!update || typeof update !== "object") return null;
  if (update.message && update.message.from) return update.message.from;
  if (update.edited_message && update.edited_message.from) return update.edited_message.from;
  if (update.business_message && update.business_message.from) return update.business_message.from;
  if (update.edited_business_message && update.edited_business_message.from) {
    return update.edited_business_message.from;
  }
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

/** Личное входящее сообщение: обычное, отредактированное или через Telegram Business. */
function getPrivateInboundMessage(update) {
  if (!update || typeof update !== "object") return null;
  const chain = [
    update.message,
    update.edited_message,
    update.business_message,
    update.edited_business_message,
  ];
  for (let i = 0; i < chain.length; i++) {
    const m = chain[i];
    if (m && m.chat && m.chat.type === "private") return m;
  }
  return null;
}

/** Текст команды в личке (/start@BotName …) или null */
function privateMessageCommandText(update) {
  const m = getPrivateInboundMessage(update);
  if (!m) return null;
  const t = m.text != null ? String(m.text).trim() : "";
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

  const update = parseWebhookJsonBody(req);
  if (!update || typeof update !== "object") {
    return res.status(400).json({ ok: false, error: "Invalid body" });
  }

  const salebotForwardPromise = forwardUpdateToSalebot(update);
  const clubChannelPost = extractClubChannelPost(update);
  let channelPostSaved = false;
  if (clubChannelPost && redisConfigured()) {
    const currentRows = await redisPipeline([
      ["GET", LATEST_CLUB_CHANNEL_POST_KEY],
    ], { context: "telegram-bot-webhook.club-channel-post.read" });
    let currentPost = null;
    try {
      currentPost = JSON.parse(String(currentRows && currentRows[0] && currentRows[0].result || ""));
    } catch (e) {}
    const incomingId = Number(clubChannelPost.messageId) || 0;
    const currentId = Number(currentPost && currentPost.messageId) || 0;
    const sameMediaGroup = !!(
      clubChannelPost.mediaGroupId &&
      currentPost &&
      String(currentPost.mediaGroupId || "") === clubChannelPost.mediaGroupId
    );
    if (sameMediaGroup) {
      const currentPhotoMessageId = Number(currentPost.photoMessageId || currentPost.messageId) || 0;
      const incomingPhotoMessageId = Number(clubChannelPost.photoMessageId || clubChannelPost.messageId) || 0;
      clubChannelPost.messageId = Math.max(currentId, incomingId);
      clubChannelPost.date = Math.max(Number(currentPost.date) || 0, Number(clubChannelPost.date) || 0);
      clubChannelPost.text = clubChannelPost.text || String(currentPost.text || "");
      if (
        currentPost.photoFileId &&
        (!clubChannelPost.photoFileId || currentPhotoMessageId <= incomingPhotoMessageId)
      ) {
        clubChannelPost.photoFileId = String(currentPost.photoFileId);
        clubChannelPost.photoMessageId = currentPhotoMessageId;
      }
    } else if (currentPost && currentId > incomingId) {
      const salebot = await salebotForwardPromise;
      return res.status(200).json({ ok: true, skipped: true, channelPostSaved: false, salebot });
    }
    const saved = await redisPipeline([
      ["SET", LATEST_CLUB_CHANNEL_POST_KEY, JSON.stringify(clubChannelPost)],
    ], { context: "telegram-bot-webhook.club-channel-post" });
    channelPostSaved = !!(saved && saved[0] && !saved[0].error);
  }

  const user = extractTelegramUser(update);
  const cmdText = privateMessageCommandText(update);
  const cmd = commandKind(cmdText);

  if (!user || user.is_bot) {
    const salebot = await salebotForwardPromise;
    return res.status(200).json({ ok: true, skipped: !channelPostSaved, channelPostSaved, salebot });
  }

  const idRaw = user.id;
  const n = typeof idRaw === "number" ? idRaw : parseInt(String(idRaw), 10);
  if (!Number.isFinite(n) || n <= 0) {
    const salebot = await salebotForwardPromise;
    return res.status(200).json({ ok: true, skipped: true, salebot });
  }
  const safeId = "tg_" + String(Math.floor(n));

  const uname = user.username != null ? String(user.username).trim() : "";

  const redisReady = redisConfigured();
  const redisCmds = redisReady ? await usernameRedisCommands(safeId, uname) : [];
  const pipe = redisReady ? await redisPipeline(redisCmds) : null;
  let redisOk = false;
  if (redisReady) {
    redisOk = !!(pipe && !(pipe[0] && pipe[0].error));
    if (!redisOk) {
      console.error("telegram-bot-webhook: redis pipeline failed", pipe && pipe[0] && pipe[0].error);
    }
  }

  const pm = getPrivateInboundMessage(update);
  const chatId = pm && pm.chat ? pm.chat.id : null;
  var commandReplyOk = false;
  const shouldReplyHere =
    !!cmd &&
    chatId != null &&
    !!BOT_TOKEN &&
    (cmd === "start" || cmd === "help" || !SALEBOT_FORWARD_URL);
  if (shouldReplyHere) {
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
    var bizConn =
      pm && pm.business_connection_id != null && String(pm.business_connection_id).trim()
        ? String(pm.business_connection_id).trim()
        : "";
    const sent = await sendTelegramMessage(BOT_TOKEN, {
      chatId,
      businessConnectionId: bizConn || undefined,
      text: bodyText,
      buttonText: "Открыть приложение",
      buttonUrl: openUrl || DEFAULT_MINI_APP_TME,
    });
    commandReplyOk = !!(sent && sent.ok);
    if (!commandReplyOk) {
      console.error(
        "telegram-bot-webhook: sendMessage failed",
        sent && sent.hint != null ? sent.hint : "unknown"
      );
    }
  } else if (cmd && chatId != null && !BOT_TOKEN) {
    console.error("telegram-bot-webhook: TELEGRAM_BOT_TOKEN missing, cannot reply to DM command");
  }

  const salebot = await salebotForwardPromise;

  return res.status(200).json({
    ok: true,
    updated: redisOk,
    hasUsername: !!uname,
    replied: commandReplyOk,
    redisOk,
    redisConfigured,
    channelPostSaved,
    salebot,
  });
};
