"use strict";

const { ensureDtIdForUserId } = require("./account-id");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza";
const REMINDER_HASH_KEY = "poker_app:daily_poker_reminders";
const REMINDER_DUE_KEY = "poker_app:daily_poker_reminders_due";

function safeJsonParse(raw) {
  try {
    return raw ? JSON.parse(String(raw)) : null;
  } catch (e) {
    return null;
  }
}

function buildDailyPokerLink() {
  const base = String(MINI_APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza").replace(/\/$/, "");
  return base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=daily_poker";
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_") || memberId.startsWith("vk_")) return "";
  if (/^ID\d{6}$/.test(memberId)) return memberId;
  return await ensureDtIdForUserId(memberId);
}

function telegramChatIdFromAuth(auth) {
  const identity = auth && auth.identity ? auth.identity : null;
  if (!identity || identity.vkId != null) return "";
  if (identity.id != null && String(identity.id).trim()) return String(identity.id).trim();
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (/^tg_\d+$/.test(memberId)) return memberId.replace(/^tg_/, "");
  if (/^\d+$/.test(memberId)) return memberId;
  return "";
}

function normalizeRecord(raw, accountId) {
  const rec = raw && typeof raw === "object" ? raw : {};
  return {
    accountId: String(rec.accountId || accountId || "").trim(),
    chatId: String(rec.chatId || "").trim(),
    subscribed: rec.subscribed === true,
    nextFreeAttemptAt: String(rec.nextFreeAttemptAt || "").trim(),
    lastNotifiedFor: String(rec.lastNotifiedFor || "").trim(),
    subscribedAt: String(rec.subscribedAt || "").trim(),
    updatedAt: String(rec.updatedAt || "").trim(),
  };
}

function dueIsoFromStatus(status) {
  const s = status && typeof status === "object" ? status : {};
  const iso = String(s.nextFreeAttemptAt || "").trim();
  const dueMs = Date.parse(iso);
  if (!Number.isFinite(dueMs)) return "";
  if (!(s.baseAttemptUsedToday === true || s.attemptsLeft === 0 || s.canPlay === false)) return "";
  return iso;
}

async function readReminderRecord(accountId) {
  if (!redisConfigured() || !accountId) return normalizeRecord(null, accountId);
  const rows = await redisPipeline([["HGET", REMINDER_HASH_KEY, accountId]]);
  const raw = rows && rows[0] ? rows[0].result : null;
  return normalizeRecord(safeJsonParse(raw), accountId);
}

async function writeReminderRecord(record) {
  if (!redisConfigured() || !record || !record.accountId) return false;
  const dueIso = String(record.nextFreeAttemptAt || "").trim();
  const dueMs = Date.parse(dueIso);
  const commands = [["HSET", REMINDER_HASH_KEY, record.accountId, JSON.stringify(record)]];
  if (record.subscribed && Number.isFinite(dueMs) && record.lastNotifiedFor !== dueIso) {
    commands.push(["ZADD", REMINDER_DUE_KEY, String(dueMs), record.accountId]);
  } else {
    commands.push(["ZREM", REMINDER_DUE_KEY, record.accountId]);
  }
  const rows = await redisPipeline(commands);
  return !!rows && !(rows[0] && rows[0].error);
}

async function getDailyPokerReminderStatus(auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return { subscribed: false };
  const rec = await readReminderRecord(accountId);
  return {
    subscribed: rec.subscribed === true,
    nextFreeAttemptAt: rec.nextFreeAttemptAt || "",
  };
}

async function setDailyPokerReminderSubscription(auth, opts) {
  const options = opts || {};
  const accountId = await accountIdFromAuth(auth);
  const chatId = telegramChatIdFromAuth(auth);
  if (!accountId) return { ok: false, status: 401, error: "Войдите в аккаунт, чтобы включить уведомления." };
  if (!chatId) {
    return {
      ok: false,
      status: 400,
      error: "Уведомления приходят в Telegram. Войдите через Telegram или откройте мини‑апп в Telegram.",
    };
  }
  if (!redisConfigured()) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };

  const nowIso = new Date().toISOString();
  if (options.unsubscribe) {
    const rows = await redisPipeline([["HDEL", REMINDER_HASH_KEY, accountId], ["ZREM", REMINDER_DUE_KEY, accountId]]);
    if (!rows || (rows[0] && rows[0].error)) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };
    return { ok: true, subscribed: false };
  }

  const prev = await readReminderRecord(accountId);
  const nextFreeAttemptAt = dueIsoFromStatus(options.status || {}) || prev.nextFreeAttemptAt || "";
  const record = normalizeRecord(Object.assign({}, prev, {
    accountId,
    chatId,
    subscribed: true,
    nextFreeAttemptAt,
    subscribedAt: prev.subscribedAt || nowIso,
    updatedAt: nowIso,
  }), accountId);
  const ok = await writeReminderRecord(record);
  if (!ok) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };
  return { ok: true, subscribed: true, nextFreeAttemptAt: record.nextFreeAttemptAt };
}

async function syncDailyPokerReminderDue(auth, status) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId || !redisConfigured()) return { subscribed: false };
  const rec = await readReminderRecord(accountId);
  if (!rec.subscribed) return { subscribed: false };
  const dueIso = dueIsoFromStatus(status || {});
  const next = normalizeRecord(Object.assign({}, rec, {
    nextFreeAttemptAt: dueIso || rec.nextFreeAttemptAt || "",
    updatedAt: new Date().toISOString(),
  }), accountId);
  await writeReminderRecord(next);
  return { subscribed: true, nextFreeAttemptAt: next.nextFreeAttemptAt };
}

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN) return { ok: false, error: "Set TELEGRAM_BOT_TOKEN" };
  const link = buildDailyPokerLink();
  const res = await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: String(chatId),
      text,
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "Открыть крутку дня", url: link }]],
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true };
  const desc = String((data && data.description) || "");
  return { ok: false, error: desc || "Telegram send failed", blocked: /blocked|can't initiate/i.test(desc) };
}

async function tickDailyPokerReminders(limit) {
  if (!redisConfigured()) return { ok: false, status: 503, error: "Redis unavailable" };
  const nowMs = Date.now();
  const batchSize = Math.max(1, Math.min(100, parseInt(limit || "50", 10) || 50));
  const rows = await redisPipeline([["ZRANGEBYSCORE", REMINDER_DUE_KEY, "-inf", String(nowMs), "LIMIT", "0", String(batchSize)]]);
  const accountIds = Array.isArray(rows && rows[0] && rows[0].result) ? rows[0].result : [];
  let sent = 0;
  let removed = 0;
  let skipped = 0;
  const nowIso = new Date(nowMs).toISOString();
  for (const accountId of accountIds) {
    const rec = await readReminderRecord(accountId);
    const dueIso = rec.nextFreeAttemptAt || "";
    const dueMs = Date.parse(dueIso);
    if (!rec.subscribed || !rec.chatId || !Number.isFinite(dueMs) || dueMs > nowMs || rec.lastNotifiedFor === dueIso) {
      await redisPipeline([["ZREM", REMINDER_DUE_KEY, accountId]]);
      skipped++;
      continue;
    }
    const msg = "🎟 Доступна новая крутка за билет в «Раздаче дня».\n\nЗайди в приложение и раздай карты.";
    const result = await sendTelegramMessage(rec.chatId, msg);
    if (result && result.ok) {
      sent++;
      const next = normalizeRecord(Object.assign({}, rec, {
        lastNotifiedFor: dueIso,
        updatedAt: nowIso,
      }), accountId);
      await redisPipeline([
        ["HSET", REMINDER_HASH_KEY, accountId, JSON.stringify(next)],
        ["ZREM", REMINDER_DUE_KEY, accountId],
      ]);
    } else if (result && result.blocked) {
      removed++;
      await redisPipeline([["HDEL", REMINDER_HASH_KEY, accountId], ["ZREM", REMINDER_DUE_KEY, accountId]]);
    } else {
      skipped++;
    }
  }
  return { ok: true, checked: accountIds.length, sent, removed, skipped };
}

module.exports = {
  getDailyPokerReminderStatus,
  setDailyPokerReminderSubscription,
  syncDailyPokerReminderDue,
  tickDailyPokerReminders,
};
