"use strict";

const { ensureDtIdForUserId } = require("./account-id");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza";
const REMINDER_HASH_KEY = "poker_app:tournament_reminders";
const REMINDER_DUE_KEY = "poker_app:tournament_reminders_due";
const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const START_GRACE_MS = 60 * 1000;

const TOURNAMENT_REMINDER_SCHEDULE = [
  { repeat: "daily", category: "Сателлит", name: "К турниру недели", buyin: "0₽", rebuy: "R:100₽ / A:150₽", guarantee: "1 билет за 10 000₽", hour: 10, minute: 0, durationMinutes: 180, priority: 30 },
  { repeat: "daily", category: "Ежедневный", name: "Rebuy DV", buyin: "800₽", rebuy: "R:800₽ / A:800₽", guarantee: "30 000₽", hour: 12, minute: 0, durationMinutes: 180, priority: 45 },
  { repeat: "daily", category: "Ежедневный", name: "Tournament Rebuy", buyin: "100₽", rebuy: "R:100₽ / A:100₽", guarantee: "5 000₽", hour: 14, minute: 0, durationMinutes: 180, priority: 45 },
  { repeat: "daily", category: "Сателлит", name: "К турниру месяца Нокаут", buyin: "50₽", rebuy: "R:200₽ / A:200₽", guarantee: "1 билет за 10 000₽", hour: 15, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Сателлит", name: "Бесплатный сателлит к турниру месяца", buyin: "0₽", rebuy: "—", guarantee: "9 000₽ — 3 билета за 3 000₽", hour: 16, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Ежедневный", name: "Magic Chest", buyin: "50₽", rebuy: "R:50₽", guarantee: "3 000₽", hour: 16, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "PKO/MKO", buyin: "300₽", rebuy: "R:300₽", guarantee: "25 000₽", hour: 17, minute: 0, durationMinutes: 180, priority: 55 },
  { repeat: "weekly", dow: 1, category: "Турнир дня", name: "Magic MKO", buyin: "500₽", rebuy: "R:500₽", guarantee: "170 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 2, category: "Турнир дня", name: "Турнир Тракториста", buyin: "300₽", rebuy: "R:300₽ / A:300₽", guarantee: "150 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 3, category: "Турнир дня", name: "Нокаут", buyin: "5 000₽", rebuy: "R:5 000₽", guarantee: "250 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 3, category: "Турнир дня", name: "Нокаут MKO", buyin: "500₽", rebuy: "R:500₽", guarantee: "50 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 89, levels: "12/10/8" },
  { repeat: "weekly", dow: 4, category: "Турнир дня", name: "Мистери", buyin: "300₽", rebuy: "R:300₽", guarantee: "100 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 5, category: "Турнир дня", name: "Нокаут Прогрессив", buyin: "500₽", rebuy: "R:500₽", guarantee: "170 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 6, category: "Турнир дня", name: "Фриролл", buyin: "0₽", rebuy: "R:400₽ / A:800₽", guarantee: "10 билетов по 10 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 0, category: "Турнир недели", name: "Нокаут Прогрессив", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "700 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 100 },
  { repeat: "daily", category: "Сателлит", name: "Сателлит к Нокауту за 5 000₽", buyin: "250₽", rebuy: "R:250₽ / A:250₽", guarantee: "1 билет за 5 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Сателлит", name: "Сателлит к Нокауту на 1 000 000₽", buyin: "300₽", rebuy: "R:300₽ / A:300₽", guarantee: "1 билет за 10 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 36 },
  { repeat: "daily", category: "Ежедневный", name: "PLO4", buyin: "300₽", rebuy: "—", guarantee: "10 000₽", hour: 20, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "Energetic Tournament", buyin: "200₽", rebuy: "R:200₽ / A:200₽", guarantee: "10 000₽", hour: 22, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "MKO", buyin: "50₽", rebuy: "—", guarantee: "3 000₽", hour: 23, minute: 0, durationMinutes: 180, priority: 45 },
  { date: "2026-05-31", category: "Турнир месяца", name: "Турнир месяца — Нокаут", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "500 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
  { date: "2026-06-28", category: "Турнир месяца", name: "Турнир месяца", buyin: "3 000₽", rebuy: "R:3 000₽ / A:3 000₽", guarantee: "1 000 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
  { date: "2026-07-19", category: "Турнир месяца", name: "Нокаут Прогрессив", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "1 000 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
];

function safeJsonParse(raw) {
  try {
    return raw ? JSON.parse(String(raw)) : null;
  } catch (e) {
    return null;
  }
}

function formatScheduleTime(item) {
  const h = Number(item && item.hour);
  const m = Number(item && item.minute);
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-z0-9а-я]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function tournamentReminderId(item) {
  if (!item) return "";
  const scope = item.date ? "date-" + item.date : item.repeat === "weekly" ? "weekly-" + String(item.dow) : "daily";
  return [scope, formatScheduleTime(item).replace(":", ""), slug(item.name || "tournament")].join("-");
}

const TOURNAMENTS = TOURNAMENT_REMINDER_SCHEDULE.map((item) => ({ ...item, id: tournamentReminderId(item) }));
const TOURNAMENTS_BY_ID = new Map(TOURNAMENTS.map((item) => [item.id, item]));

function normalizeSelectedIds(ids) {
  const raw = Array.isArray(ids) ? ids : [];
  const seen = new Set();
  const out = [];
  for (const id of raw.map((v) => String(v || "").trim()).filter(Boolean)) {
    if (seen.has(id) || !TOURNAMENTS_BY_ID.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
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
    selectedTournamentIds: normalizeSelectedIds(rec.selectedTournamentIds),
    dueMembers: Array.isArray(rec.dueMembers) ? rec.dueMembers.map(String).filter(Boolean) : [],
    lastNotifiedStarts: rec.lastNotifiedStarts && typeof rec.lastNotifiedStarts === "object" ? rec.lastNotifiedStarts : {},
    subscribedAt: String(rec.subscribedAt || "").trim(),
    updatedAt: String(rec.updatedAt || "").trim(),
  };
}

function isoFromMs(ms) {
  return new Date(ms).toISOString();
}

function mskLocalParts(nowMs) {
  const local = new Date(nowMs + MSK_OFFSET_MS);
  return {
    y: local.getUTCFullYear(),
    m: local.getUTCMonth(),
    d: local.getUTCDate(),
    dow: local.getUTCDay(),
  };
}

function mskDateStartUtcMs(y, m0, d, hour, minute) {
  return Date.UTC(y, m0, d, Number(hour) || 0, Number(minute) || 0, 0, 0) - MSK_OFFSET_MS;
}

function nextStartMsForTournament(item, nowMs, lastIso) {
  if (!item) return null;
  const hour = Number(item.hour) || 0;
  const minute = Number(item.minute) || 0;
  let targetMs = null;
  let stepMs = null;
  if (item.date) {
    const parts = String(item.date).split("-").map((v) => parseInt(v, 10));
    if (parts.length !== 3 || parts.some((v) => !Number.isFinite(v))) return null;
    targetMs = mskDateStartUtcMs(parts[0], parts[1] - 1, parts[2], hour, minute);
    stepMs = null;
  } else {
    const p = mskLocalParts(nowMs);
    if (item.repeat === "weekly") {
      const targetDow = Number(item.dow);
      if (!Number.isFinite(targetDow)) return null;
      const dayDelta = (targetDow - p.dow + 7) % 7;
      targetMs = mskDateStartUtcMs(p.y, p.m, p.d + dayDelta, hour, minute);
      stepMs = WEEK_MS;
    } else {
      targetMs = mskDateStartUtcMs(p.y, p.m, p.d, hour, minute);
      stepMs = DAY_MS;
    }
  }
  while (targetMs != null) {
    const iso = isoFromMs(targetMs);
    if (targetMs >= nowMs - START_GRACE_MS && iso !== lastIso) return targetMs;
    if (!stepMs) return null;
    targetMs += stepMs;
  }
  return null;
}

function dueMember(accountId, tournamentId, startIso) {
  return JSON.stringify([String(accountId), String(tournamentId), String(startIso)]);
}

function parseDueMember(member) {
  const parsed = safeJsonParse(member);
  if (Array.isArray(parsed) && parsed.length >= 3) {
    return { accountId: String(parsed[0] || ""), tournamentId: String(parsed[1] || ""), startIso: String(parsed[2] || "") };
  }
  return { accountId: "", tournamentId: "", startIso: "" };
}

function buildDueMembers(record, nowMs) {
  if (!record || !record.subscribed || !record.accountId) return [];
  const members = [];
  for (const id of normalizeSelectedIds(record.selectedTournamentIds)) {
    const item = TOURNAMENTS_BY_ID.get(id);
    const startMs = nextStartMsForTournament(item, nowMs, String(record.lastNotifiedStarts[id] || ""));
    if (!Number.isFinite(startMs)) continue;
    members.push({ member: dueMember(record.accountId, id, isoFromMs(startMs)), score: startMs });
  }
  return members;
}

async function readTournamentReminderRecord(accountId) {
  if (!redisConfigured() || !accountId) return normalizeRecord(null, accountId);
  const rows = await redisPipeline([["HGET", REMINDER_HASH_KEY, accountId]]);
  const raw = rows && rows[0] ? rows[0].result : null;
  return normalizeRecord(safeJsonParse(raw), accountId);
}

async function writeTournamentReminderRecord(record, nowMs) {
  if (!redisConfigured() || !record || !record.accountId) return false;
  const due = buildDueMembers(record, nowMs || Date.now());
  const prevMembers = Array.isArray(record.dueMembers) ? record.dueMembers : [];
  const nextRecord = normalizeRecord({ ...record, dueMembers: due.map((d) => d.member) }, record.accountId);
  const commands = [];
  if (prevMembers.length) commands.push(["ZREM", REMINDER_DUE_KEY, ...prevMembers]);
  commands.push(["HSET", REMINDER_HASH_KEY, nextRecord.accountId, JSON.stringify(nextRecord)]);
  for (const item of due) commands.push(["ZADD", REMINDER_DUE_KEY, String(item.score), item.member]);
  const rows = await redisPipeline(commands);
  return !!rows && !(rows[0] && rows[0].error);
}

async function getTournamentReminderStatus(auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return { ok: true, subscribed: false, selectedTournamentIds: [] };
  const rec = await readTournamentReminderRecord(accountId);
  return { ok: true, subscribed: rec.subscribed === true, selectedTournamentIds: rec.selectedTournamentIds };
}

async function setTournamentReminderSubscription(auth, opts) {
  const options = opts || {};
  const accountId = await accountIdFromAuth(auth);
  const chatId = telegramChatIdFromAuth(auth);
  if (!accountId) return { ok: false, status: 401, error: "Войдите в аккаунт, чтобы включить уведомления." };
  if (!chatId) {
    return { ok: false, status: 400, error: "Уведомления приходят в Telegram. Откройте мини‑апп в Telegram." };
  }
  if (!redisConfigured()) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };

  const prev = await readTournamentReminderRecord(accountId);
  if (options.unsubscribe) {
    const rows = await redisPipeline([
      ...(prev.dueMembers.length ? [["ZREM", REMINDER_DUE_KEY, ...prev.dueMembers]] : []),
      ["HDEL", REMINDER_HASH_KEY, accountId],
    ]);
    if (!rows || (rows[0] && rows[0].error)) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };
    return { ok: true, subscribed: false, selectedTournamentIds: [] };
  }

  const selectedTournamentIds = normalizeSelectedIds(options.selectedTournamentIds);
  if (!selectedTournamentIds.length) return { ok: false, status: 400, error: "Выберите хотя бы один турнир." };
  const nowIso = new Date().toISOString();
  const record = normalizeRecord({
    ...prev,
    accountId,
    chatId,
    subscribed: true,
    selectedTournamentIds,
    subscribedAt: prev.subscribedAt || nowIso,
    updatedAt: nowIso,
  }, accountId);
  const ok = await writeTournamentReminderRecord(record, Date.now());
  if (!ok) return { ok: false, status: 503, error: "Сервис уведомлений временно недоступен." };
  return { ok: true, subscribed: true, selectedTournamentIds: record.selectedTournamentIds };
}

function buildTournamentLink() {
  const base = String(MINI_APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza").replace(/\/$/, "");
  return base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=download";
}

function buildTournamentMessage(item) {
  const parts = [
    "🔔 Стартовал турнир: " + (item.name || "Турнир"),
    "",
    "Категория: " + (item.category || "Турнир"),
    "Приз: " + (item.guarantee || "—"),
    "Вход: " + (item.buyin || "—"),
    "Ребай: " + (item.rebuy || "—"),
    "Время: " + formatScheduleTime(item) + " МСК",
  ];
  return parts.join("\n");
}

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN) return { ok: false, error: "Set TELEGRAM_BOT_TOKEN" };
  const res = await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: String(chatId),
      text,
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "Открыть турниры", url: buildTournamentLink() }]],
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true };
  const desc = String((data && data.description) || "");
  return { ok: false, error: desc || "Telegram send failed", blocked: /blocked|can't initiate/i.test(desc) };
}

async function tickTournamentReminders(limit) {
  if (!redisConfigured()) return { ok: false, status: 503, error: "Redis unavailable" };
  const nowMs = Date.now();
  const batchSize = Math.max(1, Math.min(100, parseInt(limit || "50", 10) || 50));
  const rows = await redisPipeline([["ZRANGEBYSCORE", REMINDER_DUE_KEY, "-inf", String(nowMs), "LIMIT", "0", String(batchSize)]]);
  const members = Array.isArray(rows && rows[0] && rows[0].result) ? rows[0].result : [];
  let sent = 0;
  let removed = 0;
  let skipped = 0;
  const nowIso = new Date(nowMs).toISOString();
  for (const member of members) {
    const parsed = parseDueMember(member);
    const rec = await readTournamentReminderRecord(parsed.accountId);
    const item = TOURNAMENTS_BY_ID.get(parsed.tournamentId);
    const startMs = Date.parse(parsed.startIso);
    if (
      !rec.subscribed ||
      !rec.chatId ||
      !item ||
      rec.selectedTournamentIds.indexOf(parsed.tournamentId) === -1 ||
      !Number.isFinite(startMs) ||
      startMs > nowMs ||
      rec.lastNotifiedStarts[parsed.tournamentId] === parsed.startIso
    ) {
      await redisPipeline([["ZREM", REMINDER_DUE_KEY, member]]);
      skipped++;
      continue;
    }
    const result = await sendTelegramMessage(rec.chatId, buildTournamentMessage(item));
    if (result && result.ok) {
      sent++;
      const next = normalizeRecord({
        ...rec,
        lastNotifiedStarts: { ...rec.lastNotifiedStarts, [parsed.tournamentId]: parsed.startIso },
        updatedAt: nowIso,
      }, rec.accountId);
      await writeTournamentReminderRecord(next, nowMs);
    } else if (result && result.blocked) {
      removed++;
      await redisPipeline([
        ...(rec.dueMembers.length ? [["ZREM", REMINDER_DUE_KEY, ...rec.dueMembers]] : [["ZREM", REMINDER_DUE_KEY, member]]),
        ["HDEL", REMINDER_HASH_KEY, rec.accountId],
      ]);
    } else {
      skipped++;
    }
  }
  return { ok: true, checked: members.length, sent, removed, skipped };
}

module.exports = {
  TOURNAMENT_REMINDER_SCHEDULE: TOURNAMENTS,
  getTournamentReminderStatus,
  setTournamentReminderSubscription,
  tickTournamentReminders,
};
