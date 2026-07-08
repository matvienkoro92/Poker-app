const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const crypto = require("crypto");
/**
 * Ручная рассылка подписчикам розыгрышей (из админской кнопки в мини‑апке).
 *
 * POST /api/raffle-manual-subscribers
 *   body: { initData: string, endDate?, message?, broadcastIdempotencyKey?: string }
 *   body.retryFailedOnly === true — досылка тем из текущего SMEMBERS, кому в последней рассылке не было успеха
 *   (все, кроме successfulChatIds из отчёта; user_blocked из отчёта пропускаем). Тот же messageText из отчёта.
 *   Старый отчёт без successfulChatIds — fallback: только не-user_blocked из last.failures.
 *
 *   body.purgeBlockedSubscribers === true — проверка getChat по каждому id в poker_app:raffle_subscribers;
 *   из набора удаляются те, кто заблокировал бота, удалил аккаунт и т.п. (ответ Telegram 403 / not found).
 *
 * Только для админов (TELEGRAM_ADMIN_ID). Без CRON_SECRET.
 * Рассылает личное сообщение всем chat_id из poker_app:raffle_subscribers.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const RAFFLE_SUBSCRIBERS_KEY = "poker_app:raffle_subscribers";
/** Последний отчёт ручной рассылки (для админа: кто не получил / ошибки Telegram) */
const RAFFLE_LAST_MANUAL_BROADCAST_KEY = "poker_app:raffle_last_manual_broadcast";
/** Один клик «Разослать» — одна полная отправка (защита от двойного запроса) */
const RAFFLE_MANUAL_BC_IDEM_PREFIX = "poker_app:raffle_manual_bc_idem:";
const MAX_IDS_IN_LOG = 5000;
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
/** Каноническая ссылка на Mini App в Telegram — используем её, чтобы не тянуть в рассылку кривые URL из окружения */
const TELEGRAM_APP_URL = "https://t.me/Poker_dvatuza_bot/DvaTuza";

/** true — удалить из подписчиков (заблокировал бота, чат не найден, деактивирован) */
async function telegramSubscriberShouldRemove(chatId) {
  if (!BOT_TOKEN) return { remove: false };
  const url =
    "https://api.telegram.org/bot" +
    BOT_TOKEN +
    "/getChat?chat_id=" +
    encodeURIComponent(String(chatId));
  try {
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));
    if (data && data.ok) return { remove: false };
    const desc = String((data && data.description) || "").toLowerCase();
    const code = data && data.error_code;
    if (code === 429) return { remove: false, rateLimited: true };
    if (code === 403) return { remove: true };
    if (desc.includes("blocked")) return { remove: true };
    if (desc.includes("bot was blocked")) return { remove: true };
    if (desc.includes("user is deactivated")) return { remove: true };
    if (desc.includes("deactivated")) return { remove: true };
    if (desc.includes("chat not found")) return { remove: true };
    if (desc.includes("not found")) return { remove: true };
    if (code === 400 && (desc.includes("chat") || desc.includes("peer"))) return { remove: true };
    return { remove: false };
  } catch (e) {
    return { remove: false };
  }
}

function buildRafflesTelegramLink() {
  const baseAppUrl = String(
    TELEGRAM_APP_URL || MINI_APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza"
  )
    .replace(/\/$/, "")
    .replace(/[)\s]+$/, "");
  return baseAppUrl + "?startapp=raffles";
}

async function sendTelegramMessage(chatId, text, buttonUrl) {
  if (!BOT_TOKEN) return { ok: false, error: "No BOT_TOKEN" };
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: String(chatId),
    text: text,
    disable_web_page_preview: true,
  };
  if (buttonUrl) {
    payload.reply_markup = {
      inline_keyboard: [[
        {
          text: "Открыть розыгрыши",
          url: buttonUrl,
        },
      ]],
    };
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
const DEFAULT_CASH_MESSAGE =
  "🎲 В клубе стартовал новый розыгрыш беккинг-байинов на кеш. Столы Бонус гейм на Poker21. Итоги (время).";

function normalizeBroadcastPrizeKind(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(s)) return "cash";
  if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(s)) return "tournament_ticket";
  return "";
}

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

function pluralizeRafflesRu(n) {
  const v = Math.abs(Number(n) || 0) % 100;
  const d = v % 10;
  if (v >= 11 && v <= 19) return "розыгрышей";
  if (d === 1) return "розыгрыш";
  if (d >= 2 && d <= 4) return "розыгрыша";
  return "розыгрышей";
}

function formatRubForMessage(value) {
  const n = Math.max(0, Math.round(Number(value) || 0));
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

function buildSubscriberBroadcastMessage(body) {
  const endDateRaw = (body && body.endDate) || (body && body.end_date) || "";
  const endDateFormatted = formatEndDateForMessage(endDateRaw);
  const prizeKind = normalizeBroadcastPrizeKind(body && (body.prizeKind || body.prize_kind || body.rafflePrizeKind || body.raffle_prize_kind));
  const customLine =
    body && (body.message || body.msg) ? String(body.message || body.msg).trim() : "";
  const activeRafflesSummary =
    body &&
    (body.activeRafflesSummary === true ||
      body.active_raffles_summary === true ||
      body.compactActiveRafflesSummary === true);
  let messageText = "";
  if (activeRafflesSummary) {
    messageText = customLine;
    if (!messageText) {
      const activeCount = Math.max(0, parseInt(String(body.activeRafflesCount || body.active_raffles_count || ""), 10) || 0);
      const activeTotalPrize = Number(body.activeRafflesTotalPrize || body.active_raffles_total_prize || 0) || 0;
      if (activeCount > 1) {
        messageText =
          "🎲 Стартовали " +
          activeCount +
          " " +
          pluralizeRafflesRu(activeCount) +
          " на общую сумму " +
          formatRubForMessage(activeTotalPrize) +
          ".\n\nЗаходи и участвуй.";
      }
    }
  }
  if (!messageText) {
    messageText = prizeKind === "cash" ? DEFAULT_CASH_MESSAGE : DEFAULT_MESSAGE;
    if (endDateFormatted) {
      messageText = messageText.replace(/\(время\)/, endDateFormatted);
    } else {
      messageText = messageText.replace(/\s*\(время\)\.?/, " — смотрите в приложении.");
    }
    if (customLine) {
      messageText = customLine + "\n\n" + messageText;
    }
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

  if (!redisConfigured()) {
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

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const myId = memberIdFromIdentity(identity);
  if (!identity || !myId) {
    return res.status(401).json({ ok: false, error: "Войдите в приложение (Telegram или PWA)." });
  }

  if (!isAdminIdentity(identity, myId)) {
    return res.status(403).json({ ok: false, error: "Только для админов" });
  }

  const purgeBlockedSubscribers =
    body.purgeBlockedSubscribers === true || body.purge_blocked_subscribers === true;

  if (req.method === "POST" && purgeBlockedSubscribers) {
    if (!BOT_TOKEN) {
      return res.status(500).json({ ok: false, error: "Нет TELEGRAM_BOT_TOKEN" });
    }
    async function loadSubscriberChatIdsPurge() {
      const results = await redisPipeline([["SMEMBERS", RAFFLE_SUBSCRIBERS_KEY]]);
      if (!results || !results[0] || results[0].result === undefined) return null;
      return Array.isArray(results[0].result) ? results[0].result : [];
    }
    const allIds = await loadSubscriberChatIdsPurge();
    if (allIds === null) {
      return res.status(500).json({ ok: false, error: "Redis unavailable" });
    }
    const unique = [...new Set(allIds.map((id) => String(id)))];
    const toRemove = [];
    let rateLimited = false;
    const CHUNK = 10;
    const PAUSE_MS = 120;
    for (let i = 0; i < unique.length; i += CHUNK) {
      const part = unique.slice(i, i + CHUNK);
      const outs = await Promise.all(part.map((id) => telegramSubscriberShouldRemove(id)));
      for (let j = 0; j < part.length; j++) {
        if (outs[j] && outs[j].rateLimited) rateLimited = true;
        if (outs[j] && outs[j].remove) toRemove.push(String(part[j]));
      }
      if (i + CHUNK < unique.length && PAUSE_MS > 0) {
        await new Promise((r) => setTimeout(r, PAUSE_MS));
      }
    }
    if (toRemove.length) {
      const cmds = toRemove.map((id) => ["SREM", RAFFLE_SUBSCRIBERS_KEY, id]);
      for (let c = 0; c < cmds.length; c += 200) {
        const slice = cmds.slice(c, c + 200);
        await redisPipeline(slice);
      }
    }
    const after = await loadSubscriberChatIdsPurge();
    const remaining = after ? after.length : Math.max(0, unique.length - toRemove.length);
    return res.status(200).json({
      ok: true,
      purgeBlocked: true,
      checked: unique.length,
      removed: toRemove.length,
      remaining,
      rateLimitedHint: rateLimited
        ? "Был ответ Telegram 429 (лимит). При большом списке повторите очистку позже."
        : undefined,
    });
  }

  if (!MINI_APP_URL) {
    return res
      .status(500)
      .json({ ok: false, error: "Server not configured for raffle-manual-subscribers" });
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
  const rafflesButtonUrl = buildRafflesTelegramLink();

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
    if (!last || typeof last !== "object") {
      return res.status(400).json({
        ok: false,
        error: "Нет сохранённого отчёта рассылки. Сначала сделайте рассылку.",
      });
    }

    const currentIds = await loadSubscriberChatIds();
    if (currentIds === null) {
      return res.status(500).json({ ok: false, error: "Redis unavailable" });
    }

    messageText =
      typeof last.messageText === "string" && last.messageText.trim().length > 0
        ? last.messageText
        : buildSubscriberBroadcastMessage(body);

    const blockedSet = new Set(
      (last.failures || [])
        .filter((f) => f && f.hint === "user_blocked" && f.chatId != null)
        .map((f) => String(f.chatId))
    );

    const hasSuccessList = Array.isArray(last.successfulChatIds);
    const successSet = hasSuccessList ? new Set(last.successfulChatIds.map(String)) : new Set();

    if (hasSuccessList) {
      const seen = new Set();
      chatIds = [];
      for (const id of currentIds) {
        const s = String(id);
        if (!s || seen.has(s)) continue;
        if (successSet.has(s)) continue;
        if (blockedSet.has(s)) continue;
        seen.add(s);
        chatIds.push(s);
      }
      if (!chatIds.length) {
        return res.status(400).json({
          ok: false,
          error:
            "Некому досылать: все текущие подписчики уже получили сообщение в последней рассылке (заблокировавших бота не трогаем).",
        });
      }
      if (last.successfulTruncated) {
        responseExtra.warning =
          "Список успешных доставок в отчёте обрезан — досылка может быть неполной. При сомнении сделайте полную рассылку.";
      }
    } else {
      if (!Array.isArray(last.failures) || last.failures.length === 0) {
        return res.status(400).json({
          ok: false,
          error:
            "Старый отчёт без списка успешных id. Сделайте новую рассылку или обновите сервер.",
        });
      }
      const seen = new Set();
      chatIds = [];
      for (const f of last.failures) {
        if (!f || f.chatId == null) continue;
        if (f.hint === "user_blocked") continue;
        const s = String(f.chatId);
        if (!s || seen.has(s)) continue;
        seen.add(s);
        chatIds.push(s);
      }
      if (!chatIds.length) {
        return res.status(400).json({
          ok: false,
          error:
            "В отчёте только заблокировавшие бота (или пусто). Досылка по старому формату невозможна.",
        });
      }
      if ((last.failuresTruncated || 0) > 0) {
        responseExtra.warning =
          "Отчёт без списка успехов — досылаем только по ошибкам из отчёта (часть могла быть обрезана).";
      }
    }
  } else {
    const ids = await loadSubscriberChatIds();
    if (ids === null) {
      return res.status(500).json({ ok: false, error: "Redis unavailable" });
    }
    chatIds = ids;
    messageText = buildSubscriberBroadcastMessage(body);
  }

  const idemRaw = (body.broadcastIdempotencyKey || body.idempotencyKey || "").trim().slice(0, 128);
  let idemRedisKey = null;
  if (idemRaw) {
    idemRedisKey =
      RAFFLE_MANUAL_BC_IDEM_PREFIX +
      crypto
        .createHash("sha256")
        .update(String(myId) + "\n" + idemRaw + "\n" + (retryFailedOnly ? "retry" : "full"))
        .digest("hex");
    const prevRes = await redisPipeline([["GET", idemRedisKey]]);
    const prevStr = prevRes && prevRes[0] && prevRes[0].result != null ? String(prevRes[0].result) : "";
    if (prevStr) {
      if (prevStr === "__pending__") {
        return res.status(409).json({
          ok: false,
          error: "Рассылка уже выполняется. Дождитесь окончания или откройте отчёт.",
        });
      }
      try {
        const prev = JSON.parse(prevStr);
        if (prev && prev.ok === true && typeof prev.sent === "number" && typeof prev.total === "number") {
          return res.status(200).json(Object.assign({}, prev, { idempotentReplay: true }));
        }
      } catch (eIdem) {}
    }
    const claimRes = await redisPipeline([["SET", idemRedisKey, "__pending__", "NX", "EX", "900"]]);
    const cr0 = claimRes && claimRes[0];
    const claimed =
      cr0 &&
      !cr0.error &&
      (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
    if (!claimed) {
      const againRes = await redisPipeline([["GET", idemRedisKey]]);
      const againStr = againRes && againRes[0] && againRes[0].result != null ? String(againRes[0].result) : "";
      if (againStr === "__pending__") {
        return res.status(409).json({
          ok: false,
          error: "Рассылка уже выполняется. Дождитесь окончания или откройте отчёт.",
        });
      }
      try {
        const prev2 = JSON.parse(againStr);
        if (prev2 && prev2.ok === true && typeof prev2.sent === "number") {
          return res.status(200).json(Object.assign({}, prev2, { idempotentReplay: true }));
        }
      } catch (eIdem2) {}
      return res.status(409).json({
        ok: false,
        error: "Повторите рассылку через минуту или обновите страницу.",
      });
    }
  }

  const broadcastStartedAt = new Date().toISOString();
  const failures = [];
  const successfulChatIds = [];
  let sent = 0;
  const SAVE_EVERY = 25;

  async function persistBroadcastLog(final, processedCount) {
    const succ = successfulChatIds.slice(0, MAX_IDS_IN_LOG);
    const logPayload = {
      at: broadcastStartedAt,
      inProgress: !final,
      sent,
      processed: processedCount,
      total: chatIds.length,
      messageText,
      successfulChatIds: succ,
      successfulTruncated: successfulChatIds.length > MAX_IDS_IN_LOG,
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
    const r = await sendTelegramMessage(chatId, messageText, rafflesButtonUrl);
    if (r && r.ok) {
      sent++;
      successfulChatIds.push(String(chatId));
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

  const responseJson = {
    ok: true,
    sent,
    total: chatIds.length,
    failuresSample: failures.slice(0, 30),
    failuresTotal: failures.length,
    retry: retryFailedOnly,
    ...(responseExtra.warning ? { warning: responseExtra.warning } : {}),
  };

  if (idemRedisKey) {
    try {
      await redisPipeline([["SET", idemRedisKey, JSON.stringify(responseJson), "EX", "86400"]]);
    } catch (eIdemSave) {}
  }

  return res.status(200).json(responseJson);
};
