/**
 * Ручная рассылка подписчикам розыгрышей (из админской кнопки в мини‑апке).
 *
 * POST /api/raffle-manual-subscribers
 *   body: { initData: string, endDate?, message? }
 *   body.retryFailedOnly === true — повтор только по chat_id из last.failures (тот же messageText из отчёта, если есть).
 *
 * Только для админов (TELEGRAM_ADMIN_ID). Без CRON_SECRET.
 * Рассылает личное сообщение всем chat_id из poker_app:raffle_subscribers.
 */
const crypto = require("crypto");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const RAFFLE_SUBSCRIBERS_KEY = "poker_app:raffle_subscribers";
/** Последний отчёт ручной рассылки (для админа: кто не получил / ошибки Telegram) */
const RAFFLE_LAST_MANUAL_BROADCAST_KEY = "poker_app:raffle_last_manual_broadcast";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
/** Каноническая ссылка на Mini App в Telegram — используем её, чтобы не тянуть в рассылку кривые URL из окружения */
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

function validateUser(initData) {
  if (!initData || !BOT_TOKEN) return null;
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + "=" + v)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    return user.id
      ? {
          id: user.id,
          firstName: user.first_name || "",
          username: user.username || "",
        }
      : null;
  } catch (e) {
    return null;
  }
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
  "🎲 В клубе стартовал новый розыгрыш беккинг-билетов. Итоги (время).";

function formatEndDateForMessage(isoDate) {
  if (!isoDate || typeof isoDate !== "string") return "";
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }) + " МСК";
  } catch (e) {
    return "";
  }
}

function buildSubscriberBroadcastMessage(body) {
  const endDateRaw = (body && body.endDate) || (body && body.end_date) || "";
  const endDateFormatted = formatEndDateForMessage(endDateRaw);
  let messageText = DEFAULT_MESSAGE;
  if (endDateFormatted) {
    messageText = messageText.replace(/\(время\)/, endDateFormatted);
  } else {
    messageText = messageText.replace(/\s*\(время\)\.?/, " — смотрите в приложении.");
  }
  const customLine =
    body && (body.message || body.msg) ? String(body.message || body.msg).trim() : "";
  if (customLine) {
    messageText = customLine + "\n\n" + messageText;
  }
  if (!messageText.includes("http")) {
    const baseAppUrl = String(
      TELEGRAM_APP_URL || MINI_APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza"
    )
      .replace(/\/$/, "")
      .replace(/[)\s]+$/, "");
    const rafflesLink = baseAppUrl + "?startapp=raffles";
    messageText = messageText + "\n\nОткрыть раздел розыгрышей: " + rafflesLink;
  }
  return messageText;
}

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
      .json({ ok: false, error: "Server not configured for raffle-manual-subscribers" });
  }

  let body = {};
  if (req.method === "POST") {
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    } catch (e) {
      body = {};
    }
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

  async function loadSubscriberChatIds() {
    const results = await redisPipeline([["SMEMBERS", RAFFLE_SUBSCRIBERS_KEY]]);
    if (!results || !results[0] || results[0].result === undefined) {
      return null;
    }
    return Array.isArray(results[0].result) ? results[0].result : [];
  }

  // GET: статистика подписчиков или последний сохранённый отчёт рассылки
  if (req.method === "GET") {
    const wantLastLog =
      req.query.lastLog === "1" ||
      req.query.last_log === "1" ||
      req.query.lastLog === "true";
    if (wantLastLog) {
      const logRes = await redisPipeline([["GET", RAFFLE_LAST_MANUAL_BROADCAST_KEY]]);
      const rawLog = logRes && logRes[0] && logRes[0].result;
      let last = null;
      if (rawLog && typeof rawLog === "string") {
        try {
          last = JSON.parse(rawLog);
        } catch (e) {
          last = null;
        }
      }
      return res.status(200).json({ ok: true, last });
    }
    const chatIds = await loadSubscriberChatIds();
    if (chatIds === null) {
      return res.status(500).json({ ok: false, error: "Redis unavailable" });
    }
    return res.status(200).json({
      ok: true,
      sent: 0,
      total: chatIds.length,
      statsOnly: true,
    });
  }

  const retryFailedOnly =
    body.retryFailedOnly === true || body.retry_failed_only === true;
  const responseExtra = {};

  let chatIds;
  let messageText;

  if (retryFailedOnly) {
    const logRes = await redisPipeline([["GET", RAFFLE_LAST_MANUAL_BROADCAST_KEY]]);
    const rawLog = logRes && logRes[0] && logRes[0].result;
    let last = null;
    if (rawLog && typeof rawLog === "string") {
      try {
        last = JSON.parse(rawLog);
      } catch (e) {
        last = null;
      }
    }
    if (!last || !Array.isArray(last.failures) || last.failures.length === 0) {
      return res.status(400).json({
        ok: false,
        error:
          "В последнем отчёте нет неудач для повтора. Сначала сделайте рассылку и откройте отчёт.",
      });
    }
    const seen = new Set();
    chatIds = [];
    for (const f of last.failures) {
      if (f && f.chatId != null && String(f.chatId) && !seen.has(String(f.chatId))) {
        seen.add(String(f.chatId));
        chatIds.push(String(f.chatId));
      }
    }
    if (!chatIds.length) {
      return res.status(400).json({ ok: false, error: "Не удалось извлечь chat_id из отчёта." });
    }
    messageText =
      typeof last.messageText === "string" && last.messageText.trim().length > 0
        ? last.messageText
        : buildSubscriberBroadcastMessage(body);
    if ((last.failuresTruncated || 0) > 0) {
      responseExtra.warning =
        "В отчёте обрезан список ошибок — повтор уйдёт не всем. Остальным при необходимости сделайте полную рассылку.";
    }
  } else {
    const ids = await loadSubscriberChatIds();
    if (ids === null) {
      return res.status(500).json({ ok: false, error: "Redis unavailable" });
    }
    chatIds = ids;
    messageText = buildSubscriberBroadcastMessage(body);
  }

  const broadcastStartedAt = new Date().toISOString();
  const failures = [];
  let sent = 0;
  const SAVE_EVERY = 25;

  async function persistBroadcastLog(final, processedCount) {
    const logPayload = {
      at: broadcastStartedAt,
      inProgress: !final,
      sent,
      processed: processedCount,
      total: chatIds.length,
      messageText,
      failures: failures.slice(0, 500),
      failuresTruncated: failures.length > 500 ? failures.length - 500 : 0,
      ...(retryFailedOnly ? { retryBroadcast: true } : {}),
    };
    try {
      await redisPipeline([
        ["SET", RAFFLE_LAST_MANUAL_BROADCAST_KEY, JSON.stringify(logPayload)],
      ]);
    } catch (e) {
      /* не блокируем ответ */
    }
  }

  for (let i = 0; i < chatIds.length; i++) {
    const chatId = chatIds[i];
    const r = await sendTelegramMessage(chatId, messageText);
    if (r && r.ok) {
      sent++;
    } else {
      failures.push({
        chatId: String(chatId),
        hint: (r && r.hint) || "error",
      });
    }
    const processed = i + 1;
    if (processed % SAVE_EVERY === 0 || processed === chatIds.length) {
      await persistBroadcastLog(processed === chatIds.length, processed);
    }
  }

  if (chatIds.length === 0) {
    await persistBroadcastLog(true, 0);
  }

  return res.status(200).json({
    ok: true,
    sent,
    total: chatIds.length,
    failuresSample: failures.slice(0, 30),
    failuresTotal: failures.length,
    retry: retryFailedOnly,
    ...(responseExtra.warning ? { warning: responseExtra.warning } : {}),
  });
};

