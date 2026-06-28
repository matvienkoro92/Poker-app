"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId, getDtIdByUserId, getPreferredUserIdByDtId } = require("../account-id");
const { readPokerPlusProfile } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const {
  broadcastAllChatPushSubscribersInner,
  readVapidEnv,
} = require("../chat-webpush-notify");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const { canReachTelegramBot, requiredBotHandle, telegramHandleUrl } = require("../telegram-participation-gate");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const EVENTS_KEY = "poker_app:private_cash_events";
const EVENT_PREFIX = "poker_app:private_cash_event:";
const PARTICIPANTS_PREFIX = "poker_app:private_cash_participants:";
const SUBSCRIBERS_KEY = "poker_app:private_cash_subscribers";
const ACCOUNT_SUBSCRIBERS_KEY = "poker_app:private_cash_account_subscribers";
const BOT_SUBSCRIBED_AT_KEY = "poker_app:bot_subscribed_at";
const BOT_UNSUBSCRIBED_AT_KEY = "poker_app:bot_unsubscribed_at";
const WARNINGS_KEY = "poker_app:private_cash_warning_cards";
const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const PROFILE_HASH_KEY = "poker_app:pokerplus_profiles";
const PROFILE_BIRTH_DATE_KEY = "poker_app:profile_birth_dates";
const PROFILE_SPECIALTY_KEY = "poker_app:profile_specialties";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const MAX_EVENTS = 12;
const IN_GAME_SEAT_COUNT = 7;
const HOUSE_PLAYER = {
  accountId: "tg_388008256",
  displayName: "ПокерМанки",
  telegramUsername: "roman1_matvienko",
  status: "approved",
  seatGroup: "inGame",
  seatIndex: -1,
  joinedAt: "house",
  house: true,
};
const PRESET_AVATAR_SRC_BY_ID = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
  fox: "./assets/avatar-fox.jpg",
  chip: "./assets/avatar-chip.jpg",
  koala: "./assets/avatar-koala.jpg",
  raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg",
  rabbit: "./assets/avatar-rabbit.jpg",
  chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg",
  wolf: "./assets/avatar-wolf.jpg",
  owl: "./assets/avatar-owl.jpg",
  bat: "./assets/avatar-bat.jpg",
  gorilla: "./assets/avatar-gorilla.jpg",
};
const PRESET_AVATAR_IDS = Object.keys(PRESET_AVATAR_SRC_BY_ID);
const { getAvatars } = createChatProfileLookupHelpers({
  AVATAR_PREFIX,
  DT_IDS_KEY,
  POKERPLUS_BIND_HASH_KEY,
  PRESET_AVATAR_IDS,
  PRESET_AVATAR_SRC_BY_ID,
  PROFILE_HASH_KEY,
  RESPECT_SCORE_KEY,
  normalizePeerChatUserId: (id) => String(id || "").trim(),
  pokerProfileFeeFromCachedProfile: () => null,
  pokerProfileStatusFromRakeServer: () => ({}),
  redisPipeline,
});
const GAME_TYPES = new Set([
  "Холдем",
  "Холдем 3-1 флоп",
  "Холдем 3-1 терн",
  "Омаха5",
  "Омаха6",
]);

function cleanText(value, max) {
  return String(value == null ? "" : value)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, max || 240);
}

function cleanMultilineText(value, max) {
  return String(value == null ? "" : value)
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => cleanText(line, 180))
    .filter(Boolean)
    .join("\n")
    .slice(0, max || 900);
}

function cleanDate(value) {
  const s = cleanText(value, 16);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

function cleanTime(value) {
  const s = cleanText(value, 8);
  return /^\d{2}:\d{2}$/.test(s) ? s : "";
}

function privateCashOpenUrl() {
  const fallback = "https://t.me/Poker_dvatuza_bot/DvaTuza";
  const base = String(resolveTelegramOpenButtonUrl(process.env.MINI_APP_URL || process.env.APP_URL || fallback) || fallback)
    .trim()
    .replace(/\/+$/, "");
  return base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=private_cash";
}

function eventLine(event) {
  const parts = [event && event.date, event && event.time, event && event.gameType, event && event.stakes, event && event.buyIn ? "вход " + event.buyIn : ""]
    .filter(Boolean);
  return parts.join(" · ");
}

function subscriberTelegramIdFromMemberId(memberId) {
  const m = String(memberId || "").trim().match(/^tg_(\d+)$/);
  return m && m[1] ? m[1] : "";
}

async function resolveSubscriberIdentity(auth) {
  const viewer = await resolveViewer(auth);
  let chatId = subscriberTelegramIdFromMemberId(viewer.memberId);
  if (!chatId && viewer.accountId) {
    try {
      const preferred = await getPreferredUserIdByDtId(viewer.accountId);
      chatId = subscriberTelegramIdFromMemberId(preferred);
    } catch (e) {}
  }
  return {
    viewer,
    chatId,
    accountId: viewer.accountId,
  };
}

async function readPrivateCashSubscriberChatIds() {
  const rows = await redisPipeline([["SMEMBERS", SUBSCRIBERS_KEY]]);
  const raw = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
  return [...new Set(raw.map((id) => String(id || "").trim()).filter(Boolean))];
}

async function notifyPrivateCashSubscribers(text, options) {
  const message = cleanText(text, 1900);
  if (!message) return { ok: false, error: "empty" };
  const ids = await readPrivateCashSubscriberChatIds();
  const openUrl = privateCashOpenUrl();
  const results = [];
  for (let i = 0; i < ids.length; i += 1) {
    const sent = await sendTelegramMessage(BOT_TOKEN, {
      chatId: ids[i],
      text: message,
      buttonText: (options && options.buttonText) || "Открыть приватный кеш",
      buttonUrl: openUrl,
    });
    results.push(sent);
  }
  return {
    ok: true,
    recipients: ids.length,
    sent: results.filter((item) => item && item.ok).length,
  };
}

function approvedVisibleCount(rows, ignoredAccountId) {
  return (Array.isArray(rows) ? rows : []).filter((row, index) => {
    const p = normalizeParticipant(row);
    if (!p.accountId || p.accountId === ignoredAccountId || p.status === "rejected") return false;
    return participantSeatIndex(p, index) < IN_GAME_SEAT_COUNT;
  }).length;
}

function participantSeatGroupLabel(row) {
  const p = normalizeParticipant(row);
  return p.seatIndex >= IN_GAME_SEAT_COUNT ? "резерв" : "игру";
}

function cleanGameType(value) {
  const s = cleanText(value, 40);
  return GAME_TYPES.has(s) ? s : "";
}

function cleanAccessLevel(value) {
  const n = Number.parseInt(String(value == null ? "" : value), 10);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(99, n));
}

function normalizeProfileBirthDate(value) {
  const raw = cleanText(value, 16);
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  const year = Number.parseInt(m[1], 10);
  const month = Number.parseInt(m[2], 10);
  const day = Number.parseInt(m[3], 10);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day ||
    d.getTime() > Date.now()
  ) {
    return "";
  }
  return raw;
}

function profileAgeFromBirthDate(value) {
  const raw = normalizeProfileBirthDate(value);
  if (!raw) return 0;
  const parts = raw.split("-").map((part) => Number.parseInt(part, 10));
  const today = new Date();
  let age = today.getFullYear() - parts[0];
  const month = parts[1] - 1;
  const day = parts[2];
  if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) age -= 1;
  return age >= 1 && age <= 120 ? age : 0;
}

function normalizeProfileSpecialty(value) {
  const raw = cleanText(value, 40).toLowerCase();
  if (raw === "mtt" || raw === "мтт" || raw === "tournament" || raw === "tournaments") return "mtt";
  if (raw === "cash" || raw === "кеш" || raw === "кэш") return "cash";
  return "";
}

function parseJson(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return fallback;
  }
}

function eventKey(id) {
  return EVENT_PREFIX + String(id || "").trim();
}

function participantsKey(id) {
  return PARTICIPANTS_PREFIX + String(id || "").trim();
}

function eventSortValue(event) {
  return String((event && event.date) || "") + "T" + String((event && event.time) || "99:99");
}

function sortedEvents(events) {
  return (Array.isArray(events) ? events.slice() : [])
    .sort((a, b) => eventSortValue(a).localeCompare(eventSortValue(b)));
}

function makeId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return crypto.randomBytes(16).toString("hex");
}

function displayFromIdentity(identity, accountId, memberId, redisDisplay, redisUsername) {
  const stored = cleanText(redisDisplay, 80);
  if (stored) return stored;
  const first = cleanText(identity && identity.firstName, 40);
  const last = cleanText(identity && identity.lastName, 40);
  const full = [first, last].filter(Boolean).join(" ").trim();
  if (full) return full;
  const username = cleanText(redisUsername || (identity && (identity.telegramUsername || identity.pwaUsername)), 40).replace(/^@+/, "");
  if (username) return "@" + username;
  return accountId || memberId || "Игрок";
}

async function resolveViewer(auth) {
  const memberId = String(auth.memberId || "").trim();
  const accountId = memberId && !memberId.startsWith("guest_")
    ? await ensureDtIdForUserId(memberId)
    : memberId;
  let displayRaw = "";
  let userRaw = "";
  try {
    const rows = await redisPipeline([
      ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId || ""],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, memberId || ""],
      ["HGET", USERNAMES_KEY, memberId || ""],
    ]);
    displayRaw = (rows && rows[0] && rows[0].result) || (rows && rows[1] && rows[1].result) || "";
    userRaw = (rows && rows[2] && rows[2].result) || "";
  } catch (e) {}
  return {
    memberId,
    accountId: String(accountId || memberId || "").trim(),
    displayName: displayFromIdentity(auth.identity, accountId, memberId, displayRaw, userRaw),
    telegramUsername: cleanText(userRaw || (auth.identity && (auth.identity.telegramUsername || auth.identity.pwaUsername)), 60).replace(/^@+/, ""),
  };
}

function normalizeEvent(raw) {
  const event = raw && typeof raw === "object" ? raw : {};
  return {
    id: cleanText(event.id, 80),
    date: cleanText(event.date, 16),
    time: cleanText(event.time, 8),
    gameType: cleanGameType(event.gameType),
    stakes: cleanText(event.stakes, 80),
    buyIn: cleanText(event.buyIn, 80),
    accessLevel: cleanAccessLevel(event.accessLevel),
    description: cleanText(event.description, 500),
    combinations: cleanMultilineText(event.combinations, 900),
    status: event.status === "closed" ? "closed" : "active",
    createdAt: cleanText(event.createdAt, 40),
    createdBy: cleanText(event.createdBy, 80),
  };
}

function hashPairsToRows(raw) {
  const out = [];
  if (!Array.isArray(raw)) return out;
  for (let i = 0; i + 1 < raw.length; i += 2) {
    const row = parseJson(raw[i + 1], null);
    if (row && typeof row === "object") out.push(row);
  }
  return out;
}

function normalizeParticipant(row) {
  const p = row && typeof row === "object" ? row : {};
  const status = p.status === "approved" || p.status === "rejected" ? p.status : "pending";
  const rawSeatIndex = Number.parseInt(p.seatIndex, 10);
  return {
    accountId: cleanText(p.accountId, 80),
    memberId: cleanText(p.memberId, 80),
    displayName: cleanText(p.displayName, 80) || "Игрок",
    telegramUsername: cleanText(p.telegramUsername, 60).replace(/^@+/, ""),
    status,
    joinedAt: cleanText(p.joinedAt, 40),
    approvedAt: cleanText(p.approvedAt, 40),
    rejectedAt: cleanText(p.rejectedAt, 40),
    warningCount: Math.max(0, Math.min(99, Number.parseInt(p.warningCount, 10) || 0)),
    seatIndex: Number.isFinite(rawSeatIndex) && rawSeatIndex >= 0 ? rawSeatIndex : -1,
  };
}

function publicSeatParticipant(row, avatars, seatIndex) {
  const p = normalizeParticipant(row);
  if (!p.accountId) return null;
  if (p.status === "rejected") return null;
  return {
    accountId: p.accountId,
    displayName: p.displayName,
    telegramUsername: p.telegramUsername,
    avatar: avatars && avatars[p.accountId] ? avatars[p.accountId] : "",
    status: p.status,
    seatGroup: seatIndex >= IN_GAME_SEAT_COUNT ? "reserve" : "inGame",
    seatIndex,
    joinedAt: p.joinedAt,
  };
}

function publicHouseParticipant(event) {
  if (!event || event.status !== "active") return null;
  return Object.assign({}, HOUSE_PLAYER);
}

async function privateCashProfileLookupId(accountId) {
  const id = cleanText(accountId, 80);
  if (!id) return "";
  if (/^ID\d{6}$/.test(id)) return id;
  try {
    return cleanText(await getDtIdByUserId(id), 80) || id;
  } catch (e) {
    return id;
  }
}

async function enrichPrivateCashParticipants(rows) {
  const list = (Array.isArray(rows) ? rows : []).filter((row) => row && row.accountId);
  if (!list.length) return;
  const lookupPairs = await Promise.all(list.map(async (row) => ({
    row,
    lookupId: await privateCashProfileLookupId(row.accountId),
  })));
  const lookupIds = lookupPairs.map((item) => item.lookupId).filter(Boolean);
  if (!lookupIds.length) return;
  const [birthRows, specialtyRows, profiles] = await Promise.all([
    redisPipeline(lookupIds.map((id) => ["HGET", PROFILE_BIRTH_DATE_KEY, id])),
    redisPipeline(lookupIds.map((id) => ["HGET", PROFILE_SPECIALTY_KEY, id])),
    Promise.all(lookupIds.map((id) => readPokerPlusProfile(id).catch(() => null))),
  ]);
  lookupPairs.forEach((item, index) => {
    const row = item.row;
    const profile = profiles[index];
    const status = profile ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true }) : null;
    const level = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
    const age = profileAgeFromBirthDate(birthRows && birthRows[index] && birthRows[index].result);
    const specialty = normalizeProfileSpecialty(specialtyRows && specialtyRows[index] && specialtyRows[index].result);
    if (level > 0) row.level = level;
    if (age > 0) row.profileAge = age;
    if (specialty) row.profileSpecialty = specialty;
  });
}

function participantSeatIndex(row, fallbackIndex) {
  const p = normalizeParticipant(row);
  return p.seatIndex >= 0 ? p.seatIndex : fallbackIndex;
}

function pickPrivateCashSeat(rows, accountId, old) {
  const occupied = new Set();
  let reserveCount = 0;
  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const p = normalizeParticipant(row);
    if (!p.accountId || p.accountId === accountId || p.status === "rejected") return;
    const seatIndex = participantSeatIndex(p, index);
    if (seatIndex >= 0 && seatIndex < IN_GAME_SEAT_COUNT) occupied.add(seatIndex);
    else reserveCount += 1;
  });
  const oldSeatIndex = participantSeatIndex(old, -1);
  if (old && old.accountId && oldSeatIndex >= 0 && oldSeatIndex < IN_GAME_SEAT_COUNT && !occupied.has(oldSeatIndex)) {
    return oldSeatIndex;
  }
  const available = [];
  for (let i = 0; i < IN_GAME_SEAT_COUNT; i += 1) {
    if (!occupied.has(i)) available.push(i);
  }
  if (available.length) return available[crypto.randomInt(available.length)];
  return IN_GAME_SEAT_COUNT + reserveCount;
}

function normalizePenalty(raw) {
  const p = raw && typeof raw === "object" ? raw : {};
  const blocked = Array.isArray(p.blockedEventIds) ? p.blockedEventIds : [];
  return {
    warningCount: Math.max(0, Math.min(99, Number.parseInt(p.warningCount, 10) || 0)),
    blockedEventIds: blocked.map((id) => cleanText(id, 80)).filter(Boolean),
    skipNextGames: Math.max(0, Math.min(12, Number.parseInt(p.skipNextGames, 10) || 0)),
    updatedAt: cleanText(p.updatedAt, 40),
  };
}

function publicPenalty(penalty) {
  return {
    warningCount: penalty.warningCount,
    skipNextGames: penalty.skipNextGames,
  };
}

function nextEventIdAfter(events, eventId) {
  const ordered = sortedEvents(events).filter((event) => event && event.id);
  const index = ordered.findIndex((event) => event.id === eventId);
  if (index < 0) return "";
  for (let i = index + 1; i < ordered.length; i += 1) {
    if (ordered[i].status === "active") return ordered[i].id;
  }
  return "";
}

function bookingBlockForEvent(event, events, penalty) {
  if (!event || !event.id || !penalty) return null;
  if (penalty.blockedEventIds.includes(event.id)) {
    return { warningCount: penalty.warningCount, reason: "blocked_event" };
  }
  if (penalty.skipNextGames > 0) {
    const ordered = sortedEvents(events).filter((row) => row && row.status === "active" && !penalty.blockedEventIds.includes(row.id));
    if (ordered.length && ordered[0].id === event.id) {
      return { warningCount: penalty.warningCount, reason: "next_game" };
    }
  }
  return null;
}

async function loadState(auth) {
  const viewer = await resolveViewer(auth);
  const idRows = await redisPipeline([["LRANGE", EVENTS_KEY, "0", String(MAX_EVENTS - 1)]]);
  const ids = (idRows && idRows[0] && Array.isArray(idRows[0].result) ? idRows[0].result : [])
    .map((id) => cleanText(id, 80))
    .filter(Boolean);
  const eventRows = ids.length ? await redisPipeline(ids.map((id) => ["GET", eventKey(id)])) : [];
  const events = [];
  for (let i = 0; i < ids.length; i += 1) {
    const event = normalizeEvent(parseJson(eventRows && eventRows[i] && eventRows[i].result, null));
    if (event.id) events.push(event);
  }
  const participantCommands = [];
  events.forEach((event) => {
    participantCommands.push(["HGETALL", participantsKey(event.id)]);
  });
  const participantRows = participantCommands.length ? await redisPipeline(participantCommands) : [];
  const participantsByEvent = participantRows.map((row) => hashPairsToRows(row && row.result)
    .map(normalizeParticipant)
    .sort((a, b) => String(a.joinedAt || "").localeCompare(String(b.joinedAt || ""))));
  const avatarIds = [...new Set(participantsByEvent.flat().map((row) => row.accountId).filter(Boolean))];
  const avatars = avatarIds.length ? await getAvatars(avatarIds) : {};
  let viewerPenalty = null;
  if (!auth.isAdmin && viewer.accountId) {
    const penaltyRows = await redisPipeline([["HGET", WARNINGS_KEY, viewer.accountId]]);
    viewerPenalty = normalizePenalty(parseJson(penaltyRows && penaltyRows[0] && penaltyRows[0].result, null));
  }
  const publicParticipantsToEnrich = [];
  events.forEach((event, index) => {
    const rows = participantsByEvent[index] || [];
    const visibleRows = rows.filter((row) => row.status !== "rejected");
    event.houseParticipant = publicHouseParticipant(event);
    event.seatedParticipants = visibleRows
      .map((row, visibleIndex) => publicSeatParticipant(row, avatars, participantSeatIndex(row, visibleIndex)))
      .filter(Boolean);
    if (event.houseParticipant) publicParticipantsToEnrich.push(event.houseParticipant);
    publicParticipantsToEnrich.push(...event.seatedParticipants);
    if (auth.isAdmin) event.participants = rows;
    else {
      event.myParticipant = rows.find((row) => row.accountId === viewer.accountId) || null;
      event.bookingBlock = bookingBlockForEvent(event, events, viewerPenalty);
    }
  });
  await enrichPrivateCashParticipants(publicParticipantsToEnrich);
  let privateCashSubscribed = false;
  if (viewer.accountId || subscriberTelegramIdFromMemberId(viewer.memberId)) {
    const subRows = await redisPipeline([
      ["SISMEMBER", ACCOUNT_SUBSCRIBERS_KEY, viewer.accountId || ""],
      ["SISMEMBER", SUBSCRIBERS_KEY, subscriberTelegramIdFromMemberId(viewer.memberId) || ""],
    ]);
    privateCashSubscribed = !!(
      (subRows && subRows[0] && Number(subRows[0].result) === 1) ||
      (subRows && subRows[1] && Number(subRows[1].result) === 1)
    );
  }
  return {
    ok: true,
    isAdmin: !!auth.isAdmin,
    viewer,
    privateCashSubscribed,
    privateCashPenalty: viewerPenalty ? publicPenalty(viewerPenalty) : null,
    events,
    activeEvent: events.find((event) => event.status === "active") || null,
  };
}

async function broadcastCreated(event) {
  if (!readVapidEnv().pushConfigured) return { ok: false, skipped: true, error: "vapid" };
  const bits = [event.date, event.time, event.gameType, event.stakes, event.buyIn ? "вход " + event.buyIn : ""].filter(Boolean).join(" · ");
  return await broadcastAllChatPushSubscribersInner({
    title: "Открыта запись на приватный кеш",
    body: bits ? bits : "Открыта новая запись. Займите место в списке.",
    openUrl: "./",
  });
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Redis is not configured" });

  if (req.method === "GET") {
    const auth = authRequired(req, {}, BOT_TOKEN, {
      authError: "Откройте в Telegram или войдите в PWA",
    });
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    try {
      return res.status(200).json(await loadState(auth));
    } catch (e) {
      console.error("[private-cash] GET", e);
      return res.status(500).json({ ok: false, error: "Ошибка сервера" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 12_288)) return;
  if (rateLimit(req, res, { bucket: "private_cash", limit: 20, windowMs: 60_000 })) return;

  let body;
  try {
    body = parseBody(req);
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN, {
    authError: "Откройте в Telegram или войдите в PWA",
  });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });

  const action = cleanText(body.action, 40);
  try {
    if (action === "subscribe") {
      const wantSubscribe = body.subscribe !== false && body.unsubscribe !== true && body.unsub !== true;
      const sub = await resolveSubscriberIdentity(auth);
      if (!sub.chatId && wantSubscribe) {
        const botHandle = requiredBotHandle();
        const botUrl = telegramHandleUrl(botHandle);
        return res.status(400).json({
          ok: false,
          code: "BOT_REQUIRED",
          error:
            "Уведомления о приватном кеше приходят в Telegram. Откройте " +
            botHandle +
            ", нажмите Start или отправьте /start, затем вернитесь и нажмите «Подписаться» снова.",
          openUrl: botUrl,
          botUrl,
        });
      }
      if (wantSubscribe) {
        const reachable = await canReachTelegramBot(sub.chatId, BOT_TOKEN);
        if (!reachable) {
          const botHandle = requiredBotHandle();
          const botUrl = telegramHandleUrl(botHandle);
          return res.status(403).json({
            ok: false,
            code: "BOT_REQUIRED",
            error:
              "Бот клуба не видит ваш чат. Откройте " +
              botHandle +
              ", нажмите Start или отправьте /start, затем вернитесь и нажмите «Подписаться» снова.",
            openUrl: botUrl,
            botUrl,
          });
        }
      }
      const now = String(Date.now());
      const commands = [];
      if (wantSubscribe) {
        if (sub.chatId) {
          commands.push(["SADD", SUBSCRIBERS_KEY, sub.chatId]);
          commands.push(["HSETNX", BOT_SUBSCRIBED_AT_KEY, sub.chatId, now]);
          commands.push(["HDEL", BOT_UNSUBSCRIBED_AT_KEY, sub.chatId]);
        }
        if (sub.accountId) {
          commands.push(["SADD", ACCOUNT_SUBSCRIBERS_KEY, sub.accountId]);
          commands.push(["HSETNX", BOT_SUBSCRIBED_AT_KEY, sub.accountId, now]);
          commands.push(["HDEL", BOT_UNSUBSCRIBED_AT_KEY, sub.accountId]);
        }
      } else {
        if (sub.chatId) {
          commands.push(["SREM", SUBSCRIBERS_KEY, sub.chatId]);
          commands.push(["HSET", BOT_UNSUBSCRIBED_AT_KEY, sub.chatId, now]);
        }
        if (sub.accountId) {
          commands.push(["SREM", ACCOUNT_SUBSCRIBERS_KEY, sub.accountId]);
          commands.push(["HSET", BOT_UNSUBSCRIBED_AT_KEY, sub.accountId, now]);
        }
      }
      if (!commands.length) commands.push(["SREM", SUBSCRIBERS_KEY, ""]);
      await redisPipeline(commands);
      return res.status(200).json({ ok: true, subscribed: wantSubscribe, state: await loadState(auth) });
    }

    if (action === "create") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администраторов" });
      const date = cleanDate(body.date);
      const time = cleanTime(body.time);
      const gameType = cleanGameType(body.gameType);
      const stakes = cleanText(body.stakes, 80);
      const buyIn = cleanText(body.buyIn, 80);
      const accessLevel = cleanAccessLevel(body.accessLevel);
      const description = cleanText(body.description, 500);
      const combinations = cleanMultilineText(body.combinations, 900);
      const shouldSendPush = body.sendPush === true || body.sendPush === "true" || body.sendPush === 1 || body.sendPush === "1";
      if (!date || !time || !gameType || !stakes || !buyIn) {
        return res.status(400).json({ ok: false, error: "Укажите дату, время, вид игры, ставки и вход" });
      }
      const viewer = await resolveViewer(auth);
      const event = normalizeEvent({
        id: makeId(),
        date,
        time,
        gameType,
        stakes,
        buyIn,
        accessLevel,
        description,
        combinations,
        status: "active",
        createdAt: new Date().toISOString(),
        createdBy: viewer.accountId,
      });
      await redisPipeline([
        ["SET", eventKey(event.id), JSON.stringify(event)],
        ["LPUSH", EVENTS_KEY, event.id],
        ["LTRIM", EVENTS_KEY, "0", String(MAX_EVENTS - 1)],
      ]);
      let push = { ok: true, skipped: true };
      if (shouldSendPush) {
        try {
          push = await broadcastCreated(event);
        } catch (ePush) {
          push = { ok: false, error: "push_failed" };
        }
      }
      let subscribersNotify = { ok: true, skipped: true };
      try {
        subscribersNotify = await notifyPrivateCashSubscribers(
          "Открыта запись на приватный кеш. " + eventLine(event) + ". Займите место в списке.",
          { buttonText: "Записаться" }
        );
      } catch (eNotify) {
        subscribersNotify = { ok: false, error: "notify_failed" };
      }
      return res.status(200).json({ ok: true, push, subscribersNotify, state: await loadState(auth) });
    }

    if (action === "join") {
      const eventId = cleanText(body.eventId, 80);
      if (!eventId) return res.status(400).json({ ok: false, error: "Не найден кеш" });
      const rawEvent = await redisPipeline([["GET", eventKey(eventId)]]);
      const event = normalizeEvent(parseJson(rawEvent && rawEvent[0] && rawEvent[0].result, null));
      if (!event.id || event.status !== "active") return res.status(404).json({ ok: false, error: "Запись закрыта" });
      const viewer = await resolveViewer(auth);
      if (event.accessLevel > 0) {
        const lookupId = await privateCashProfileLookupId(viewer.accountId);
        const profile = lookupId ? await readPokerPlusProfile(lookupId).catch(() => null) : null;
        const status = profile ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true }) : null;
        const viewerLevel = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
        if (viewerLevel < event.accessLevel) {
          return res.status(403).json({
            ok: false,
            error: viewerLevel > 0
              ? "Для этой игры нужен уровень " + event.accessLevel + "+. Ваш уровень: " + viewerLevel + "."
              : "Для этой игры нужен уровень " + event.accessLevel + "+. Привяжите аккаунт Poker21 в профиле.",
            code: "PRIVATE_CASH_LEVEL_REQUIRED",
            requiredLevel: event.accessLevel,
            currentLevel: viewerLevel,
            requiresPoker21Profile: viewerLevel <= 0,
          });
        }
      }
      const penaltyRows = await redisPipeline([["HGET", WARNINGS_KEY, viewer.accountId]]);
      const penalty = normalizePenalty(parseJson(penaltyRows && penaltyRows[0] && penaltyRows[0].result, null));
      const allIdsRows = await redisPipeline([["LRANGE", EVENTS_KEY, "0", String(MAX_EVENTS - 1)]]);
      const allIds = (allIdsRows && allIdsRows[0] && Array.isArray(allIdsRows[0].result) ? allIdsRows[0].result : [])
        .map((id) => cleanText(id, 80))
        .filter(Boolean);
      const allEventRows = allIds.length ? await redisPipeline(allIds.map((id) => ["GET", eventKey(id)])) : [];
      const allEvents = allIds.map((id, index) => normalizeEvent(parseJson(allEventRows && allEventRows[index] && allEventRows[index].result, null))).filter((row) => row.id);
      const block = bookingBlockForEvent(event, allEvents, penalty);
      if (block) {
        if (!penalty.blockedEventIds.includes(event.id)) {
          penalty.blockedEventIds.push(event.id);
          penalty.skipNextGames = Math.max(0, penalty.skipNextGames - 1);
          penalty.updatedAt = new Date().toISOString();
          await redisPipeline([["HSET", WARNINGS_KEY, viewer.accountId, JSON.stringify(penalty)]]);
        }
        return res.status(403).json({ ok: false, error: "У вас две желтые карточки. Вы пропускаете эту игру и следующую, бронь недоступна." });
      }
      const key = participantsKey(eventId);
      const oldRows = await redisPipeline([
        ["HGET", key, viewer.accountId],
        ["HGETALL", key],
      ]);
      const old = normalizeParticipant(parseJson(oldRows && oldRows[0] && oldRows[0].result, null));
      if (old.accountId && old.status === "rejected") {
        return res.status(409).json({ ok: false, error: "Эта заявка уже отклонена админом." });
      }
      const rows = hashPairsToRows(oldRows && oldRows[1] && oldRows[1].result).map(normalizeParticipant);
      const seatIndex = pickPrivateCashSeat(rows, viewer.accountId, old);
      const participant = normalizeParticipant({
        accountId: viewer.accountId,
        memberId: viewer.memberId,
        displayName: viewer.displayName,
        telegramUsername: viewer.telegramUsername,
        status: old.status === "approved" ? "approved" : "pending",
        joinedAt: old.joinedAt || new Date().toISOString(),
        approvedAt: old.approvedAt || "",
        seatIndex,
      });
      await redisPipeline([["HSET", key, viewer.accountId, JSON.stringify(participant)]]);
      try {
        const target = participant.seatIndex >= IN_GAME_SEAT_COUNT ? "резерв" : "список игры";
        await notifyPrivateCashSubscribers(
          viewer.displayName + " подал заявку на приватный кеш в " + target + ". " + eventLine(event) + ".",
          { buttonText: "Открыть список" }
        );
      } catch (eNotifyJoin) {}
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    if (action === "cancel") {
      const eventId = cleanText(body.eventId, 80);
      if (!eventId) return res.status(400).json({ ok: false, error: "Не найден кеш" });
      const rawEvent = await redisPipeline([["GET", eventKey(eventId)]]);
      const event = normalizeEvent(parseJson(rawEvent && rawEvent[0] && rawEvent[0].result, null));
      if (!event.id || event.status !== "active") return res.status(404).json({ ok: false, error: "Запись закрыта" });
      const viewer = await resolveViewer(auth);
      const key = participantsKey(eventId);
      const rows = await redisPipeline([["HGET", key, viewer.accountId]]);
      const current = normalizeParticipant(parseJson(rows && rows[0] && rows[0].result, null));
      if (!current.accountId) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      if (current.status !== "pending") {
        return res.status(409).json({ ok: false, error: "Отменить можно только заявку, которую еще не подтвердили." });
      }
      const allRows = await redisPipeline([["HGETALL", key]]);
      const beforeRows = hashPairsToRows(allRows && allRows[0] && allRows[0].result).map(normalizeParticipant);
      const hadGameSeat = current.seatIndex >= 0 && current.seatIndex < IN_GAME_SEAT_COUNT;
      await redisPipeline([["HDEL", key, viewer.accountId]]);
      if (hadGameSeat && approvedVisibleCount(beforeRows, current.accountId) < IN_GAME_SEAT_COUNT) {
        try {
          await notifyPrivateCashSubscribers(
            "В приватном кеше освободилось место. " + eventLine(event) + ". Можно успеть записаться.",
            { buttonText: "Занять место" }
          );
        } catch (eNotifyCancel) {}
      }
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    if (action === "approve") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администраторов" });
      const eventId = cleanText(body.eventId, 80);
      const accountId = cleanText(body.accountId, 80);
      if (!eventId || !accountId) return res.status(400).json({ ok: false, error: "Не найдена заявка" });
      const key = participantsKey(eventId);
      const rows = await redisPipeline([
        ["HGET", key, accountId],
        ["GET", eventKey(eventId)],
      ]);
      const current = normalizeParticipant(parseJson(rows && rows[0] && rows[0].result, null));
      if (!current.accountId) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      current.status = "approved";
      current.approvedAt = new Date().toISOString();
      await redisPipeline([["HSET", key, accountId, JSON.stringify(current)]]);
      try {
        const event = normalizeEvent(parseJson(rows && rows[1] && rows[1].result, null));
        await notifyPrivateCashSubscribers(
          current.displayName + " принят в " + participantSeatGroupLabel(current) + " на приватный кеш. " + eventLine(event) + ".",
          { buttonText: "Смотреть состав" }
        );
      } catch (eNotifyApprove) {}
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    if (action === "reject") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администраторов" });
      const eventId = cleanText(body.eventId, 80);
      const accountId = cleanText(body.accountId, 80);
      if (!eventId || !accountId) return res.status(400).json({ ok: false, error: "Не найдена заявка" });
      const key = participantsKey(eventId);
      const rows = await redisPipeline([
        ["HGET", key, accountId],
        ["HGET", WARNINGS_KEY, accountId],
        ["LRANGE", EVENTS_KEY, "0", String(MAX_EVENTS - 1)],
        ["HGETALL", key],
        ["GET", eventKey(eventId)],
      ]);
      const current = normalizeParticipant(parseJson(rows && rows[0] && rows[0].result, null));
      if (!current.accountId) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      const penalty = normalizePenalty(parseJson(rows && rows[1] && rows[1].result, null));
      penalty.warningCount += 1;
      penalty.updatedAt = new Date().toISOString();
      current.status = "rejected";
      current.rejectedAt = penalty.updatedAt;
      current.warningCount = penalty.warningCount;
      if (penalty.warningCount >= 2) {
        if (!penalty.blockedEventIds.includes(eventId)) penalty.blockedEventIds.push(eventId);
        const ids = (rows && rows[2] && Array.isArray(rows[2].result) ? rows[2].result : [])
          .map((id) => cleanText(id, 80))
          .filter(Boolean);
        const eventRows = ids.length ? await redisPipeline(ids.map((id) => ["GET", eventKey(id)])) : [];
        const allEvents = ids.map((id, index) => normalizeEvent(parseJson(eventRows && eventRows[index] && eventRows[index].result, null))).filter((row) => row.id);
        const nextId = nextEventIdAfter(allEvents, eventId);
        if (nextId) {
          if (!penalty.blockedEventIds.includes(nextId)) penalty.blockedEventIds.push(nextId);
        } else {
          penalty.skipNextGames = Math.max(penalty.skipNextGames, 1);
        }
      }
      await redisPipeline([
        ["HSET", key, accountId, JSON.stringify(current)],
        ["HSET", WARNINGS_KEY, accountId, JSON.stringify(penalty)],
      ]);
      try {
        const event = normalizeEvent(parseJson(rows && rows[4] && rows[4].result, null));
        await notifyPrivateCashSubscribers(
          "По приватному кешу обновлен результат заявки: " + current.displayName + " не принят в игру. " + eventLine(event) + ".",
          { buttonText: "Открыть приватный кеш" }
        );
        const beforeRows = hashPairsToRows(rows && rows[3] && rows[3].result).map(normalizeParticipant);
        if (current.seatIndex >= 0 && current.seatIndex < IN_GAME_SEAT_COUNT && approvedVisibleCount(beforeRows, current.accountId) < IN_GAME_SEAT_COUNT) {
          await notifyPrivateCashSubscribers(
            "В приватном кеше освободилось место. " + eventLine(event) + ". Можно записаться или перейти из резерва.",
            { buttonText: "Открыть список" }
          );
        }
      } catch (eNotifyReject) {}
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    return res.status(400).json({ ok: false, error: "Unknown action" });
  } catch (e) {
    console.error("[private-cash] POST", e);
    return res.status(500).json({ ok: false, error: "Ошибка сервера" });
  }
};
