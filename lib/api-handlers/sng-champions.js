"use strict";

const crypto = require("crypto");
const { authRequired, isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { PROFILE_HASH_KEY, PROFILE_SYNC_AT_HASH_KEY } = require("../pokerplus");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { getJson, isConfigured: redisConfigured, pipeline: redisPipeline, setJson } = require("../redis");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:sng_champions";
const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const PROFILE_CITY_KEY = "poker_app:profile_cities";
const TELEGRAM_VISIBLE_HASH = "poker_app:telegram_visible";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CAPACITY = 32;
const MIN_JOIN_LEVEL = 1;
const PLAYER_NAME_MAX = 80;
const PRIZE_TEXT_MAX = 160;
const BUY_IN_MAX = 80;
const DESCRIPTION_MAX = 280;
const DEFAULT_TITLE = "СНГ Лига Чемпионов Два Туза";
const READY_WINDOW_MS = 24 * 60 * 60 * 1000;
const SNG_APPLICATION_NOTIFY_USERNAMES = (process.env.SNG_CHAMPIONS_APPLICATION_NOTIFY_USERNAMES || "roman1787443")
  .split(",")
  .map((item) => cleanHandle(item))
  .filter(Boolean);
const SNG_APPLICATION_NOTIFY_CHAT_IDS = (process.env.SNG_CHAMPIONS_APPLICATION_NOTIFY_CHAT_IDS || process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256")
  .split(",")
  .map((item) => telegramChatIdFromMemberId(item))
  .filter(Boolean);

const PRESET_AVATAR_SRC_BY_ID = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
  monkey: "./assets/daily-poker-monkey.webp",
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
  redisPipeline,
});

function cleanText(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanHandle(value) {
  return cleanText(value, 80).replace(/^@+/, "").toLowerCase();
}

function cleanMultilineText(value, max) {
  return String(value == null ? "" : value)
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function telegramChatIdFromMemberId(memberId) {
  const raw = cleanText(memberId, 40);
  const numeric = raw.startsWith("tg_") ? raw.slice(3) : raw;
  return /^\d{5,20}$/.test(numeric) ? numeric : "";
}

function withStartApp(rawUrl, startapp) {
  const source = cleanText(rawUrl, 512);
  const start = cleanText(startapp, 80);
  if (!source || !start) return source;
  try {
    const url = new URL(source);
    url.searchParams.set("startapp", start);
    return url.toString();
  } catch (error) {
    const clean = source.replace(/([?&])startapp=[^&#]*&?/i, "$1").replace(/[?&]$/, "");
    return clean + (clean.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(start);
  }
}

function sngOpenUrl() {
  const fallback = "https://t.me/Poker_dvatuza_bot/DvaTuza";
  const base = String(resolveTelegramOpenButtonUrl(process.env.MINI_APP_URL || process.env.APP_URL || fallback) || fallback)
    .trim()
    .replace(/\/+$/, "");
  return withStartApp(base, "sng_champions");
}

function buildEntryStatusNotification(action, entry, state) {
  const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
  if (!chatId) return null;
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const messages = {
    approve: "Ваша заявка принята в турнир СНГ Лиги Чемпионов, с вашего баланса списана 1000р, ожидайте сообщения о времени старта турнира",
    requestBalance: "Админ не смог добавить вас в турнир СНГ лига чемпионов Два туза из-за отсутствия 1000р на счету, пополните баланс, чтобы участвовать в турнире.",
    reject: "Ваша заявка на " + title + " отклонена.\n\nЕсли это ошибка или вы уже пополнили баланс, напишите администратору.",
  };
  return {
    action,
    chatId,
    text: messages[action] || "",
  };
}

function entryPairOpponentName(id, rawPlayers, enrichedPlayers) {
  const raw = rawPlayers.get(id) || {};
  const enriched = enrichedPlayers.get(id) || raw;
  const nick = cleanText(enriched.pokerPlusNickname || raw.pokerPlusNickname, PLAYER_NAME_MAX);
  const name = cleanText(raw.displayName || raw.telegramUsername, PLAYER_NAME_MAX);
  if (nick && name && nick.toLowerCase() !== name.toLowerCase()) return nick + " (" + name + ")";
  if (nick) return nick;
  return entryPublicName(raw && raw.id ? raw : enriched);
}

function roundStageLabelForState(state, round) {
  if (round && round.loserBracket) {
    const loserIndex = Number(round.index) || 0;
    if (loserIndex === 1 || loserIndex === 2) return "L 1/8";
    if (loserIndex === 3 || loserIndex === 4) return "L 1/4";
    if (loserIndex === 5 || loserIndex === 6) return "L 1/2";
    if (loserIndex === 7) return "L финал";
    if (loserIndex === 8) return "Финал сетки №2";
    if (loserIndex === 9) return "Гранд-финал";
    return cleanText(round.name, 40) || "сетку №2";
  }
  const rounds = Array.isArray(state && state.rounds) ? state.rounds : [];
  const index = rounds.findIndex((item) => item && round && item.id === round.id);
  if (index >= 0 && rounds.length) {
    const remaining = rounds.length - index;
    if (remaining === 1) return "Финал";
    if (remaining === 2) return "1/2";
    if (remaining === 3) return "1/4";
    if (remaining === 4) return "1/8";
    if (remaining === 5) return "1/16";
  }
  const matches = Array.isArray(round && round.matches) ? round.matches.length : 0;
  if (matches >= 16) return "1/16";
  if (matches === 8) return "1/8";
  if (matches === 4) return "1/4";
  if (matches === 2) return "1/2";
  if (matches === 1) return "Финал";
  return cleanText(round && round.name, 40) || "следующий раунд";
}

function bracketLabelForRound(round) {
  return round && round.loserBracket ? "Сетка №2" : "Сетка Винеров";
}

function nextRoundForMatch(state, round, match) {
  if (!state || !round || !match) return null;
  const roundIndex = Number(round.index) || 1;
  const nextRoundIndex = roundIndex + 1;
  const rounds = round && round.loserBracket ? (state.loserRounds || []) : (state.rounds || []);
  const nextRound = rounds.find((item) => item && Number(item.index) === nextRoundIndex);
  if (!nextRound) return null;
  const matchIndex = Number(match.index) || 1;
  const sameSizeLowerRound = round && round.loserBracket && [1, 3, 5].includes(roundIndex);
  const targetIndex = sameSizeLowerRound ? matchIndex : Math.ceil(matchIndex / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  return targetMatch ? nextRound : null;
}

function buildBracketParticipantNotifications(state, action, text) {
  const selectedIds = new Set(
    (state && state.bracket && Array.isArray(state.bracket.playerIds) ? state.bracket.playerIds : [])
      .filter(Boolean)
  );
  const seen = new Set();
  return (state && Array.isArray(state.entries) ? state.entries : [])
    .filter((entry) => entry && (!selectedIds.size || selectedIds.has(entry.id)))
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return {
        action,
        chatId,
        text,
      };
    })
    .filter(Boolean);
}

async function buildWinnerAdvancedNotifications(state, round, match, winnerId) {
  const nextRound = nextRoundForMatch(state, round, match);
  if (!nextRound) return [];
  const nextStage = roundStageLabelForState(state, nextRound);
  if (!nextStage || nextStage === "1/16") return [];
  const players = entryMap(state);
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const enrichedPlayers = new Map();
  enrichedEntries.forEach((entry) => {
    if (entry && entry.id) enrichedPlayers.set(entry.id, entry);
  });
  const loserId = playableIds(match).find((id) => id && id !== winnerId) || "";
  const winnerName = entryPairOpponentName(winnerId, players, enrichedPlayers);
  const loserName = entryPairOpponentName(loserId, players, enrichedPlayers);
  const text =
    "Сетка: " +
    bracketLabelForRound(round) +
    "\n" +
    winnerName +
    " прошел " +
    loserName +
    " и прошел в раунд " +
    nextStage +
    ".";
  return buildBracketParticipantNotifications(state, "winnerAdvanced", text);
}

async function buildMatchStartedNotifications(state, round, match) {
  const stage = roundStageLabelForState(state, round);
  if (!stage || stage === "1/16") return [];
  const ids = playableIds(match);
  if (ids.length < 2) return [];
  const tablePassword = cleanText(match && match.tablePassword, 4);
  const players = entryMap(state);
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const enrichedPlayers = new Map();
  enrichedEntries.forEach((entry) => {
    if (entry && entry.id) enrichedPlayers.set(entry.id, entry);
  });
  const firstName = entryPairOpponentName(ids[0], players, enrichedPlayers);
  const secondName = entryPairOpponentName(ids[1], players, enrichedPlayers);
  return buildBracketParticipantNotifications(
    state,
    "matchStarted",
    "Сетка: " + bracketLabelForRound(round) + "\n" +
      "Открыт матч " + stage + ", сыграют " + firstName + " и " + secondName + "." +
      (tablePassword ? "\nПароль стола: " + tablePassword : "")
  );
}

async function buildMatchReadyReminderNotifications(state, round, match) {
  const ids = playableIds(match);
  if (ids.length < 2) return [];
  const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  const stage = roundStageLabelForState(state, round);
  const players = entryMap(state);
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const enrichedPlayers = new Map();
  enrichedEntries.forEach((entry) => {
    if (entry && entry.id) enrichedPlayers.set(entry.id, entry);
  });
  return ids
    .filter((id) => ready[id] !== true)
    .map((id) => {
      const entry = players.get(id);
      const opponentId = ids.find((item) => item && item !== id) || "";
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId) return null;
      return {
        action: "matchReadyReminder",
        chatId,
        text:
          "Сетка: " + bracketLabelForRound(round) + "\n" +
          "Напоминаем об игре (" + stage + ", соперник: " +
          entryPairOpponentName(opponentId, players, enrichedPlayers) +
          "), подтвердите свою готовность.",
      };
    })
    .filter(Boolean);
}

function pendingOpponentSnapshot(state) {
  const snapshot = new Map();
  const allRounds = []
    .concat((state && Array.isArray(state.rounds) ? state.rounds : []))
    .concat((state && Array.isArray(state.loserRounds) ? state.loserRounds : []));
  allRounds.forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const ids = playableIds(match);
      if (!match || !match.id || ids.length !== 1 || cleanText(match.winnerId, 80)) return;
      snapshot.set(match.id, ids[0]);
    });
  });
  return snapshot;
}

async function buildOpponentResolvedNotifications(state, beforeSnapshot) {
  if (!beforeSnapshot || !beforeSnapshot.size) return [];
  const players = entryMap(state);
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const enrichedPlayers = new Map();
  enrichedEntries.forEach((entry) => {
    if (entry && entry.id) enrichedPlayers.set(entry.id, entry);
  });
  const notifications = [];
  const allRounds = []
    .concat((state && Array.isArray(state.rounds) ? state.rounds : []))
    .concat((state && Array.isArray(state.loserRounds) ? state.loserRounds : []));
  allRounds.forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const waitingId = beforeSnapshot.get(match && match.id);
      if (!waitingId || cleanText(match && match.winnerId, 80)) return;
      const ids = playableIds(match);
      if (ids.length < 2 || !ids.includes(waitingId)) return;
      const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
      if (ready[waitingId] === true) return;
      const opponentId = ids.find((id) => id && id !== waitingId) || "";
      if (!opponentId) return;
      const entry = players.get(waitingId);
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId) return;
      notifications.push({
        action: "opponentResolved",
        chatId,
        text:
          "Сетка: " + bracketLabelForRound(round) + "\n" +
          "В вашей паре " + roundStageLabelForState(state, round) +
          " определился соперник: " +
          entryPairOpponentName(opponentId, players, enrichedPlayers) +
          ". Нажмите «Готов».",
      });
    });
  });
  return notifications;
}

async function buildRoundOnePairNotifications(state) {
  const players = entryMap(state);
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const enrichedPlayers = new Map();
  enrichedEntries.forEach((entry) => {
    if (entry && entry.id) enrichedPlayers.set(entry.id, entry);
  });
  const firstRound = (state.rounds || []).find((round) => round && Number(round.index) === 1);
  const notifications = [];
  (firstRound && Array.isArray(firstRound.matches) ? firstRound.matches : []).forEach((match) => {
    const ids = playableIds(match);
    if (ids.length !== 2) return;
    ids.forEach((id, index) => {
      const entry = players.get(id);
      const opponent = players.get(ids[index === 0 ? 1 : 0]);
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId) return;
      notifications.push({
        action: "roundOnePairs",
        chatId,
        text:
          "Сетка: Сетка Винеров\n" +
          "Турнир стартовал. Пары сформированы случайным образом. Ваш соперник - " +
          entryPairOpponentName(opponent && opponent.id, players, enrichedPlayers) +
          ". Нажмите кнопку готов в приложении.",
      });
    });
  });
  return notifications;
}

function entryPublicName(entry) {
  return cleanText(
    (entry && (entry.pokerPlusNickname || entry.displayName || entry.telegramUsername || entry.accountId)) || "Игрок",
    PLAYER_NAME_MAX
  ) || "Игрок";
}

function entryLevelLabel(entry) {
  const level = Number(entry && entry.level);
  if (!Number.isFinite(level)) return "не указан";
  return Math.floor(level) > 0 ? String(Math.floor(level)) : "Привяжите аккаунт";
}

function entryLevelValue(entry) {
  const level = Number(entry && entry.level);
  return Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0;
}

function entryPoker21Id(entry) {
  return cleanText(entry && (entry.pokerPlusUserId || entry.p21Id || entry.poker21Id || entry.pokerPlusId), 80);
}

function joinLevelError(entry) {
  if (entryPoker21Id(entry)) {
    return "Заявку могут подать только игроки уровня " + String(MIN_JOIN_LEVEL) + "+. Ваш уровень: " + String(entryLevelValue(entry)) + ".";
  }
  return "Заявку могут подать только игроки уровня " + String(MIN_JOIN_LEVEL) + "+. Привяжите аккаунт Poker21 в профиле, чтобы уровень подтянулся.";
}

async function buildApprovedParticipantBroadcastNotifications(state, approvedEntry) {
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const approvedRows = enrichedEntries.filter((entry) => entry && entry.status === "approved");
  const approvedTarget = approvedRows.find((entry) => entry.accountId === approvedEntry.accountId) || approvedEntry;
  const number = Math.max(1, approvedRows.findIndex((entry) => entry.accountId === approvedEntry.accountId) + 1);
  const spotsLeft = Math.max(0, CAPACITY - number);
  const nick = entryPublicName(approvedTarget);
  const level = entryLevelLabel(approvedTarget);
  const text =
    "Принят новый участник в СНГ-турнир Лига чемпионов.\n\n" +
    "Номер: " + String(number) + "/" + String(CAPACITY) + "\n" +
    "Осталось мест: " + String(spotsLeft) + "\n" +
    "Ник: " + nick + "\n" +
    "Уровень: " + level;
  const seen = new Set();
  return approvedRows
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return {
        action: "approvedParticipantBroadcast",
        chatId,
        text,
      };
    })
    .filter(Boolean);
}

async function resolveSngApplicationNotifyChatIds() {
  const seen = new Set();
  const ids = SNG_APPLICATION_NOTIFY_CHAT_IDS.filter((id) => {
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  if (!SNG_APPLICATION_NOTIFY_USERNAMES.length) return ids;
  try {
    const rows = await redisPipeline([["HGETALL", USERNAMES_KEY]], { context: "sng-champions.notify-usernames" });
    const raw = rows && rows[0] && rows[0].result;
    const map = Array.isArray(raw)
      ? raw.reduce((acc, item, index, arr) => {
          if (index % 2 === 0 && item != null) acc[String(item)] = arr[index + 1];
          return acc;
        }, {})
      : raw && typeof raw === "object"
        ? raw
        : {};
    Object.keys(map).forEach((memberId) => {
      const username = cleanHandle(map[memberId]);
      if (!SNG_APPLICATION_NOTIFY_USERNAMES.includes(username)) return;
      const chatId = telegramChatIdFromMemberId(memberId);
      if (chatId && !seen.has(chatId)) {
        seen.add(chatId);
        ids.push(chatId);
      }
    });
  } catch (error) {
    console.warn("sng-champions: notify username lookup failed", error && error.message ? error.message : error);
  }
  return ids;
}

function buildNewApplicationNotification(entry, state) {
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const name = entryPublicName(entry);
  const level = entryLevelLabel(entry);
  const telegram = cleanHandle(entry && entry.telegramUsername);
  const poker21Id = entryPoker21Id(entry) || cleanText(entry && entry.accountId, 40);
  const parts = [
    "Новая заявка в " + title,
    "",
    "Игрок: " + name,
    telegram ? "Telegram: @" + telegram : "",
    "Уровень: " + level,
    "ID Poker21: " + poker21Id,
  ].filter(Boolean);
  return parts.join("\n");
}

async function notifySngApplication(entry, state) {
  if (!BOT_TOKEN || !entry) return;
  const ids = await resolveSngApplicationNotifyChatIds();
  if (!ids.length) return;
  const url = sngOpenUrl();
  const text = buildNewApplicationNotification(entry, state);
  for (const chatId of ids) {
    const result = await sendTelegramMessage(BOT_TOKEN, {
      chatId,
      text,
      buttonText: url ? "Открыть СНГ Лигу" : undefined,
      buttonUrl: url || undefined,
    });
    if (!result || !result.ok) {
      console.warn("sng-champions: application notification failed", {
        chatId,
        hint: result && (result.hint || result.error || result.error_code),
      });
    }
  }
}

async function notifyEntryStatus(notification) {
  if (!notification || !BOT_TOKEN || !notification.chatId || !notification.text) return;
  const url = sngOpenUrl();
  const result = await sendTelegramMessage(BOT_TOKEN, {
    chatId: notification.chatId,
    text: notification.text,
    buttonText: url ? "СНГ Лига чемпионов" : undefined,
    buttonUrl: url || undefined,
  });
  if (!result || !result.ok) {
    console.warn("sng-champions: player notification failed", {
      action: notification.action,
      chatId: notification.chatId,
      hint: result && (result.hint || result.error || result.error_code),
    });
  }
}

function entryId() {
  return "sng_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
}

function matchId(roundIndex, index) {
  return "sng_r" + String(roundIndex) + "_" + String(index);
}

function loserMatchId(roundIndex, index) {
  return "sng_l" + String(roundIndex) + "_" + String(index);
}

function defaultState() {
  return {
    version: 1,
    title: DEFAULT_TITLE,
    description: "",
    status: "draft",
    capacity: CAPACITY,
    buyIn: "0р",
    prizes: [
      { place: 1, text: "30 000р" },
      { place: 2, text: "билет на нок за 10 000р от клуба" },
    ],
    entries: [],
    bracket: null,
    rounds: [],
    loserRounds: [],
    currentRoundId: "",
    history: [],
    updatedAt: new Date().toISOString(),
  };
}

function normalizePrizes(raw) {
  const fallback = defaultState().prizes;
  const rows = Array.isArray(raw) ? raw : [];
  const normalized = rows.map((item, index) => {
    const row = item && typeof item === "object" ? item : {};
    return {
      place: Math.max(1, Math.floor(Number(row.place) || index + 1)),
      text: cleanText(row.text, PRIZE_TEXT_MAX),
    };
  }).filter((item) => item.text);
  return normalized.length ? normalized.slice(0, 6) : fallback;
}

function normalizeEntry(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  const status = ["pending", "approved", "rejected", "balance_requested"].includes(row.status) ? row.status : "pending";
  const level = Number(row.level);
  return {
    id: cleanText(row.id, 80) || entryId(),
    accountId: cleanText(row.accountId, 40),
    memberId: cleanText(row.memberId, 40),
    displayName: cleanText(row.displayName, PLAYER_NAME_MAX),
    pokerPlusNickname: cleanText(row.pokerPlusNickname, PLAYER_NAME_MAX),
    pokerPlusUserId: cleanText(row.pokerPlusUserId, 80),
    level: Number.isFinite(level) ? Math.max(0, Math.floor(level)) : null,
    profileCity: cleanText(row.profileCity || row.city, 40),
    telegramUsername: cleanText(row.telegramUsername, 64),
    status,
    joinedAt: cleanText(row.joinedAt, 40),
    approvedAt: cleanText(row.approvedAt, 40),
    rejectedAt: cleanText(row.rejectedAt, 40),
    balanceRequestedAt: cleanText(row.balanceRequestedAt, 40),
    selectedForBracket: row.selectedForBracket === true,
  };
}

async function getProfileCities(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", PROFILE_CITY_KEY, ...ids]], { context: "sng-champions.profile-cities" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      const city = cleanText(values[index], 40);
      if (city) out[id] = city;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getTelegramVisibility(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", TELEGRAM_VISIBLE_HASH, ...ids]], { context: "sng-champions.telegram-visibility" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      if (String(values[index] || "") === "1") out[id] = true;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getTelegramUsernames(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", USERNAMES_KEY, ...ids]], { context: "sng-champions.telegram-usernames" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      const username = cleanText(values[index], 64);
      if (username) out[id] = username;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getPokerPlusBoundAccountIds(pokerPlusIds) {
  const wanted = new Set((pokerPlusIds || []).map((id) => cleanText(id, 80)).filter(Boolean));
  const out = {};
  if (!wanted.size) return out;
  try {
    const rows = await redisPipeline([["HGETALL", POKERPLUS_BIND_HASH_KEY]], { context: "sng-champions.pokerplus-bound-accounts" });
    const pairs = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    for (let i = 0; i < pairs.length; i += 2) {
      const accountId = cleanText(pairs[i], 40);
      const pokerPlusId = cleanText(pairs[i + 1], 80);
      if (!accountId || !wanted.has(pokerPlusId)) continue;
      if (!out[pokerPlusId]) out[pokerPlusId] = [];
      out[pokerPlusId].push(accountId);
    }
  } catch (e) {
    return out;
  }
  return out;
}

function sngNicknameKey(value) {
  return cleanText(value, PLAYER_NAME_MAX)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е");
}

async function getProfileCityNickIndex(entries) {
  const wantedNicks = new Set((entries || []).flatMap((entry) => [
    entry && entry.pokerPlusNickname,
    entry && entry.displayName,
  ]).map(sngNicknameKey).filter(Boolean));
  const out = {};
  if (!wantedNicks.size) return out;
  try {
    const baseRows = await redisPipeline([
      ["HGETALL", PROFILE_CITY_KEY],
      ["HGETALL", POKERPLUS_BIND_HASH_KEY],
    ], { context: "sng-champions.profile-city-nick-base" });
    const cityPairs = baseRows && baseRows[0] && Array.isArray(baseRows[0].result) ? baseRows[0].result : [];
    const bindPairs = baseRows && baseRows[1] && Array.isArray(baseRows[1].result) ? baseRows[1].result : [];
    const cityByAccount = {};
    for (let i = 0; i < cityPairs.length; i += 2) {
      const accountId = cleanText(cityPairs[i], 40);
      const city = cleanText(cityPairs[i + 1], 40);
      if (accountId && city) cityByAccount[accountId] = city;
    }
    const profileIds = [];
    const profileIdToCity = {};
    for (let i = 0; i < bindPairs.length; i += 2) {
      const accountId = cleanText(bindPairs[i], 40);
      const profileId = cleanText(bindPairs[i + 1], 80);
      const city = cityByAccount[accountId];
      if (!profileId || !city) continue;
      if (!profileIdToCity[profileId]) profileIds.push(profileId);
      profileIdToCity[profileId] = city;
    }
    if (!profileIds.length) return out;
    const profileRows = await redisPipeline(profileIds.map((id) => ["HGET", PROFILE_HASH_KEY, id]), { context: "sng-champions.profile-city-nick-profiles" });
    profileIds.forEach((profileId, index) => {
      const profile = parsePokerPlusProfileLite(profileRows && profileRows[index] && profileRows[index].result, null);
      const nick = sngNicknameKey(pokerPlusNicknameFromProfile(profile));
      if (nick && wantedNicks.has(nick) && !out[nick]) out[nick] = profileIdToCity[profileId] || "";
    });
  } catch (e) {
    return out;
  }
  return out;
}

function profileCityForEntry(entry, profileCities, boundAccountIds, cityByNick) {
  if (!entry || !profileCities) return cleanText(entry && entry.profileCity, 40);
  const linkedIds = boundAccountIds && entry.pokerPlusUserId ? boundAccountIds[entry.pokerPlusUserId] || [] : [];
  const nickCity =
    (cityByNick && cityByNick[sngNicknameKey(entry.pokerPlusNickname)]) ||
    (cityByNick && cityByNick[sngNicknameKey(entry.displayName)]) ||
    "";
  return (
    profileCities[entry.accountId] ||
    profileCities[entry.memberId] ||
    profileCities[entry.pokerPlusUserId] ||
    linkedIds.map((id) => profileCities[id]).find(Boolean) ||
    nickCity ||
    cleanText(entry.profileCity || entry.city, 40) ||
    ""
  );
}

function normalizeState(raw) {
  const state = raw && typeof raw === "object" ? raw : defaultState();
  state.version = 1;
  state.title = cleanText(state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  if (state.title === "СНГ Лига Чемпионов") state.title = DEFAULT_TITLE;
  state.description = cleanMultilineText(state.description, DESCRIPTION_MAX);
  state.status = ["draft", "open", "bracket", "completed"].includes(state.status) ? state.status : "draft";
  state.capacity = CAPACITY;
  state.buyIn = cleanText(state.buyIn || defaultState().buyIn, BUY_IN_MAX) || defaultState().buyIn;
  state.prizes = normalizePrizes(state.prizes);
  state.entries = Array.isArray(state.entries) ? state.entries.map(normalizeEntry).filter((entry) => entry.accountId) : [];
  state.bracket = state.bracket && typeof state.bracket === "object" ? state.bracket : null;
  state.rounds = Array.isArray(state.rounds) ? state.rounds : [];
  state.loserRounds = Array.isArray(state.loserRounds) ? state.loserRounds : [];
  state.currentRoundId = cleanText(state.currentRoundId, 80);
  state.winnersBracketWinnerId = cleanText(state.winnersBracketWinnerId, 80);
  state.history = Array.isArray(state.history) ? state.history.map(normalizeHistoryItem).filter((item) => item.completedAt && item.winners.length) : [];
  return state;
}

function normalizeHistoryWinner(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  const place = Math.max(1, Math.floor(Number(row.place) || 0));
  return {
    place,
    entryId: cleanText(row.entryId || row.id, 80),
    accountId: cleanText(row.accountId, 40),
    memberId: cleanText(row.memberId, 40),
    displayName: cleanText(row.displayName, PLAYER_NAME_MAX),
    pokerPlusNickname: cleanText(row.pokerPlusNickname, PLAYER_NAME_MAX),
    telegramUsername: cleanText(row.telegramUsername, 64),
  };
}

function normalizeHistoryItem(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  return {
    title: cleanText(row.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE,
    completedAt: cleanText(row.completedAt, 40),
    season: cleanText(row.season, 40),
    winners: Array.isArray(row.winners) ? row.winners.map(normalizeHistoryWinner).filter((item) => item.place && item.entryId) : [],
  };
}

async function loadState() {
  if (!redisConfigured()) return defaultState();
  return normalizeState(await getJson(STATE_KEY, defaultState(), { context: "sng-champions.load" }));
}

async function saveState(state) {
  state.updatedAt = new Date().toISOString();
  await setJson(STATE_KEY, state, { context: "sng-champions.save" });
}

function setShortPublicCacheHeaders(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(5, Number(seconds) || 30);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=" + ttl + ", stale-while-revalidate=" + ttl);
}

function publicHomeSummary(state) {
  const entries = Array.isArray(state && state.entries) ? state.entries : [];
  const counts = {
    pending: entries.filter((entry) => entry && (entry.status === "pending" || entry.status === "balance_requested")).length,
    approved: entries.filter((entry) => entry && entry.status === "approved").length,
    rejected: entries.filter((entry) => entry && entry.status === "rejected").length,
    balanceRequested: entries.filter((entry) => entry && entry.status === "balance_requested").length,
  };
  return {
    ok: true,
    summary: true,
    status: state.status,
    title: state.title,
    capacity: CAPACITY,
    counts,
    updatedAt: state.updatedAt || "",
  };
}

function publicStateVersion(state) {
  const entries = Array.isArray(state && state.entries) ? state.entries : [];
  const counts = {
    pending: entries.filter((entry) => entry && (entry.status === "pending" || entry.status === "balance_requested")).length,
    approved: entries.filter((entry) => entry && entry.status === "approved").length,
    rejected: entries.filter((entry) => entry && entry.status === "rejected").length,
    balanceRequested: entries.filter((entry) => entry && entry.status === "balance_requested").length,
  };
  const revision = [
    cleanText(state && state.updatedAt, 40),
    cleanText(state && state.status, 40),
    cleanText(state && state.currentRoundId, 80),
    counts.pending,
    counts.approved,
    counts.rejected,
    counts.balanceRequested,
  ].join("|");
  return {
    ok: true,
    mode: "version",
    status: state.status,
    currentRoundId: state.currentRoundId || "",
    updatedAt: state.updatedAt || "",
    revision,
    counts,
    serverTime: new Date().toISOString(),
  };
}

function displayNameFromIdentity(identity, fallback) {
  const first = cleanText(identity && identity.firstName, 40);
  const last = cleanText(identity && identity.lastName, 40);
  const username = cleanText(identity && (identity.telegramUsername || identity.pwaUsername), 40);
  const name = [first, last].filter(Boolean).join(" ");
  if (name) return name;
  if (username) return "@" + username.replace(/^@+/, "");
  return fallback || "Игрок";
}

function pokerPlusNicknameFromProfile(profile) {
  return cleanText(
    profile && (profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName || profile.display_name),
    PLAYER_NAME_MAX
  );
}

function parsePokerPlusProfileLite(rawProfile, syncedAtRaw) {
  const raw = rawProfile != null ? String(rawProfile) : "";
  if (!raw) return null;
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const syncedAt = syncedAtRaw != null ? Number(String(syncedAtRaw).trim()) || null : null;
  if (syncedAt) parsed.syncedAt = syncedAt;
  return parsed;
}

async function readPokerPlusProfilesLite(ids) {
  const unique = [...new Set((Array.isArray(ids) ? ids : []).map((id) => cleanText(id, 80)).filter(Boolean))];
  if (!unique.length) return new Map();
  const rows = await redisPipeline(unique.flatMap((id) => [
    ["HGET", PROFILE_HASH_KEY, id],
    ["HGET", PROFILE_SYNC_AT_HASH_KEY, id],
  ]), { context: "sng-champions.profile-lite" });
  const out = new Map();
  unique.forEach((id, index) => {
    const profileRow = rows && rows[index * 2];
    const syncRow = rows && rows[index * 2 + 1];
    const profile = parsePokerPlusProfileLite(profileRow && profileRow.result, syncRow && syncRow.result);
    if (profile) out.set(id, profile);
  });
  return out;
}

async function enrichEntries(entries) {
  const rows = Array.isArray(entries) ? entries.map((entry) => ({ ...entry })) : [];
  const lookupRows = rows.filter((entry) => entry && (entry.accountId || entry.memberId));
  if (!lookupRows.length) return rows;

  let bindRows = [];
  try {
    bindRows = await redisPipeline(lookupRows.flatMap((entry) => [
      ["HGET", POKERPLUS_BIND_HASH_KEY, entry.accountId || ""],
      ["HGET", POKERPLUS_BIND_HASH_KEY, entry.memberId || ""],
    ]));
  } catch (error) {
    bindRows = [];
  }

  const candidatesByIndex = lookupRows.map((entry, index) => {
    const accountId = cleanText(entry.accountId, 40);
    const p21Id = cleanText(
      (bindRows[index * 2] && bindRows[index * 2].result) ||
        (bindRows[index * 2 + 1] && bindRows[index * 2 + 1].result),
      80
    );
    return [p21Id, accountId].filter(Boolean);
  });
  const profileMap = await readPokerPlusProfilesLite(candidatesByIndex.flat());

  lookupRows.forEach((entry, index) => {
    const candidates = candidatesByIndex[index] || [];
    let profile = null;
    let profileId = "";
    for (const id of candidates) {
      profile = profileMap.get(id) || null;
      profileId = id;
      if (profile) break;
    }
    if (!profile) return;
    const nickname = pokerPlusNicknameFromProfile(profile);
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    const level = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
    const profilePoker21Id = cleanText(profile && (profile.pokerPlusUserId || profile.Id || profile.userId || profile.p21Id), 80);
    if (profileId || profilePoker21Id) entry.pokerPlusUserId = profileId || profilePoker21Id;
    if (nickname) {
      entry.pokerPlusNickname = nickname;
      entry.displayName = nickname;
    }
    entry.level = level;
  });

  return rows;
}

function shuffle(items) {
  const out = (items || []).slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function roundName(roundIndex, count) {
  if (count === 1) return "Финал";
  if (roundIndex === 1) return "1ый раунд";
  return String(roundIndex) + "ый раунд";
}

function makeMatch(roundIndex, index, playerIds) {
  const ids = (playerIds || []).filter(Boolean);
  return {
    id: matchId(roundIndex, index),
    index,
    playerIds: ids,
    winnerId: "",
    readyById: {},
    readyDeadlineAt: "",
    playingAt: "",
    tablePassword: "",
    autoWinnerId: "",
    liveScore: null,
    score: null,
  };
}

function makeRound(roundIndex, playerIds) {
  const matches = [];
  for (let i = 0; i < playerIds.length; i += 2) {
    matches.push(makeMatch(roundIndex, matches.length + 1, playerIds.slice(i, i + 2)));
  }
  return {
    id: "round_" + String(roundIndex),
    index: roundIndex,
    name: roundName(roundIndex, matches.length),
    startedAt: new Date().toISOString(),
    matches,
  };
}

function makeEmptyRound(roundIndex, matchCount) {
  const matches = [];
  const count = Math.max(1, Math.floor(Number(matchCount) || 1));
  for (let i = 0; i < count; i += 1) {
    matches.push(makeMatch(roundIndex, i + 1, []));
  }
  return {
    id: "round_" + String(roundIndex),
    index: roundIndex,
    name: roundName(roundIndex, matches.length),
    startedAt: new Date().toISOString(),
    matches,
  };
}

function makeEmptyLoserRound(roundIndex, matchCount) {
  const matches = [];
  const count = Math.max(1, Math.floor(Number(matchCount) || 1));
  for (let i = 0; i < count; i += 1) {
    matches.push({
      ...makeMatch(roundIndex, i + 1, []),
      id: loserMatchId(roundIndex, i + 1),
      loserBracket: true,
    });
  }
  return {
    id: "loser_round_" + String(roundIndex),
    index: roundIndex,
    name: roundIndex === 9 ? "Гранд-финал" : "Нижняя сетка " + String(roundIndex),
    startedAt: new Date().toISOString(),
    loserBracket: true,
    matches,
  };
}

function makeBracketRounds(playerIds) {
  const firstRound = makeRound(1, playerIds);
  const rounds = [firstRound];
  let matchCount = firstRound.matches.length;
  let roundIndex = 2;
  while (matchCount > 1) {
    matchCount = Math.ceil(matchCount / 2);
    rounds.push(makeEmptyRound(roundIndex, matchCount));
    roundIndex += 1;
  }
  return rounds;
}

function makeLoserBracketRounds() {
  return [8, 8, 4, 4, 2, 2, 1, 1, 1].map((count, index) => makeEmptyLoserRound(index + 1, count));
}

function playableIds(match) {
  return (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
}

function normalizeMatchRuntime(match) {
  if (!match || typeof match !== "object") return;
  const ids = playableIds(match);
  const ready = match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  const normalizedReady = {};
  ids.forEach((id) => {
    if (ready[id] === true || ready[id] === "true") normalizedReady[id] = true;
  });
  match.readyById = normalizedReady;
  match.readyDeadlineAt = cleanText(match.readyDeadlineAt, 40);
  match.playingAt = cleanText(match.playingAt, 40);
  match.completedAt = cleanText(match.completedAt, 40);
  match.tablePassword = cleanText(match.tablePassword, 4);
  match.autoWinnerId = cleanText(match.autoWinnerId, 80);
  if (match.liveScore && typeof match.liveScore === "object") {
    const first = Number(match.liveScore.first);
    const second = Number(match.liveScore.second);
    match.liveScore = Number.isFinite(first) && Number.isFinite(second)
      ? { first: Math.max(0, Math.floor(first)), second: Math.max(0, Math.floor(second)) }
      : null;
  } else {
    match.liveScore = null;
  }
  if (match.score && typeof match.score === "object") {
    const winner = Number(match.score.winner);
    const loser = Number(match.score.loser);
    match.score = Number.isFinite(winner) && Number.isFinite(loser)
      ? {
        winnerId: cleanText(match.score.winnerId, 80),
        loserId: cleanText(match.score.loserId, 80),
        winner: Math.max(0, Math.floor(winner)),
        loser: Math.max(0, Math.floor(loser)),
        text: cleanText(match.score.text, 12),
      }
      : null;
  } else {
    match.score = null;
  }
}

function matchRequiresScore(state, found) {
  return !!(found && found.match && playableIds(found.match).length >= 2 && matchWinTarget(state, found));
}

function matchWinTarget(state, found) {
  const label = roundStageLabelForState(state, found && found.round).toLowerCase();
  if (label === "1/2" || label.includes("полуфинал") || label.includes("l 1/2")) return 2;
  if (label.includes("финал")) return 3;
  return 0;
}

function normalizeIntermediateMatchScore(rawScore, targetWins) {
  const score = rawScore && typeof rawScore === "object" ? rawScore : null;
  const first = Number(score && score.first);
  const second = Number(score && score.second);
  if (!score || !Number.isFinite(first) || !Number.isFinite(second)) {
    return { ok: false, error: "Укажите промежуточный счёт матча" };
  }
  const firstGames = Math.floor(first);
  const secondGames = Math.floor(second);
  if (firstGames < 0 || secondGames < 0) return { ok: false, error: "Счёт не может быть отрицательным" };
  if (!targetWins) return { ok: false, error: "Для этого этапа промежуточный счёт не используется" };
  if (firstGames >= targetWins || secondGames >= targetWins) {
    return { ok: false, error: "При достижении нужного числа побед выберите победителя пары" };
  }
  return { ok: true, score: { first: firstGames, second: secondGames } };
}

function normalizeMatchScore(rawScore, match, winnerId, targetWins) {
  const ids = playableIds(match);
  const loserId = ids.find((id) => id && id !== winnerId) || "";
  const score = rawScore && typeof rawScore === "object" ? rawScore : null;
  const winnerScore = Number(score && score.winner);
  const loserScore = Number(score && score.loser);
  if (!score || !Number.isFinite(winnerScore) || !Number.isFinite(loserScore)) {
    return { ok: false, error: "Укажите счёт матча" };
  }
  const winnerGames = Math.floor(winnerScore);
  const loserGames = Math.floor(loserScore);
  if (winnerGames < 1 || loserGames < 0 || winnerGames <= loserGames) {
    return { ok: false, error: "Счёт должен быть в пользу выбранного победителя" };
  }
  if (targetWins && (winnerGames !== targetWins || loserGames >= targetWins)) {
    return { ok: false, error: "Итоговый счёт должен соответствовать формату игры до " + String(targetWins) + " побед" };
  }
  return {
    ok: true,
    score: {
      winnerId,
      loserId,
      winner: winnerGames,
      loser: loserGames,
      text: `${winnerGames}-${loserGames}`,
    },
  };
}

function normalizeRoundsRuntime(state) {
  (state.rounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach(normalizeMatchRuntime);
  });
  (state.loserRounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach(normalizeMatchRuntime);
  });
}

function readyDeadlineFrom(nowMs) {
  return new Date(nowMs + READY_WINDOW_MS).toISOString();
}

function ensureMatchReadyTimer(match, nowMs) {
  normalizeMatchRuntime(match);
  if (!match || cleanText(match.winnerId, 80)) return false;
  const ids = playableIds(match);
  if (ids.length < 2 || match.readyDeadlineAt) return false;
  match.readyDeadlineAt = readyDeadlineFrom(nowMs);
  return true;
}

function matchReadyCount(match) {
  const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  return playableIds(match).filter((id) => ready[id] === true).length;
}

function matchAllPlayersReady(match) {
  const ids = playableIds(match);
  return ids.length >= 2 && matchReadyCount(match) === ids.length;
}

function autoWinnerFromExpiredMatch(match, nowMs) {
  normalizeMatchRuntime(match);
  if (!match || cleanText(match.winnerId, 80)) return "";
  const deadlineMs = Date.parse(match.readyDeadlineAt || "");
  if (!Number.isFinite(deadlineMs) || nowMs < deadlineMs) return "";
  const ids = playableIds(match);
  if (ids.length < 2) return "";
  const readyIds = ids.filter((id) => match.readyById && match.readyById[id] === true);
  return readyIds.length === 1 ? readyIds[0] : "";
}

function entryMap(state) {
  const map = new Map();
  (state.entries || []).forEach((entry) => {
    if (entry && entry.id) map.set(entry.id, entry);
  });
  return map;
}

function historyWinnerFromEntry(entry, place) {
  const row = entry && typeof entry === "object" ? entry : {};
  return normalizeHistoryWinner({
    place,
    entryId: row.id,
    accountId: row.accountId,
    memberId: row.memberId,
    displayName: row.pokerPlusNickname || row.displayName,
    pokerPlusNickname: row.pokerPlusNickname,
    telegramUsername: row.telegramUsername,
  });
}

function matchLosers(match) {
  const ids = Array.isArray(match && match.playerIds) ? match.playerIds : [];
  const winnerId = cleanText(match && match.winnerId, 80);
  return ids.filter((id) => id && id !== winnerId);
}

function sngTopWinners(state, championId) {
  const players = entryMap(state);
  const rounds = Array.isArray(state && state.rounds) ? state.rounds : [];
  const loserRounds = Array.isArray(state && state.loserRounds) ? state.loserRounds : [];
  const finalRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 1);
  const semiRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 2);
  const finalMatch = finalRound && finalRound.matches ? finalRound.matches[0] : null;
  const grandFinalRound = loserRounds.find((round) => round && Number(round.index) === 9);
  const grandFinalMatch = grandFinalRound && Array.isArray(grandFinalRound.matches) ? grandFinalRound.matches[0] : null;
  const rows = [];
  const seen = new Set();

  function add(entryId, place) {
    if (!entryId || seen.has(entryId)) return;
    const entry = players.get(entryId);
    if (!entry) return;
    seen.add(entryId);
    rows.push(historyWinnerFromEntry(entry, place));
  }

  add(championId, 1);
  matchLosers(grandFinalMatch || finalMatch).forEach((id) => add(id, 2));
  (semiRound && Array.isArray(semiRound.matches) ? semiRound.matches : []).forEach((match) => {
    matchLosers(match).forEach((id) => add(id, 3));
  });

  return rows.filter((row) => row && row.place && row.entryId);
}

function recordSngHistory(state, championId) {
  const winners = sngTopWinners(state, championId);
  if (!winners.length) return;
  const completedAt = state.completedAt || new Date().toISOString();
  const entry = normalizeHistoryItem({
    title: state.title || DEFAULT_TITLE,
    completedAt,
    season: completedAt.slice(0, 7),
    winners,
  });
  const key = entry.completedAt || JSON.stringify(entry.winners);
  const existing = (state.history || []).filter((item) => {
    const itemKey = item && (item.completedAt || JSON.stringify(item.winners || []));
    return itemKey !== key;
  });
  state.history = [entry].concat(existing).slice(0, 12);
}

function findRoundByMatchId(state, matchIdValue) {
  const id = cleanText(matchIdValue, 80);
  for (const round of state.rounds || []) {
    const match = (round && Array.isArray(round.matches) ? round.matches : []).find((item) => item && item.id === id);
    if (match) return { bracket: "winners", round, match };
  }
  for (const round of state.loserRounds || []) {
    const match = (round && Array.isArray(round.matches) ? round.matches : []).find((item) => item && item.id === id);
    if (match) return { bracket: "losers", round, match };
  }
  return null;
}

function roundHasPlayableOpenMatch(round) {
  return (round && Array.isArray(round.matches) ? round.matches : []).some((match) => {
    const players = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
    return players.length >= 2 && !cleanText(match && match.winnerId, 80);
  });
}

function updateCurrentRoundId(state) {
  if (!state || state.status !== "bracket") return;
  const current = (state.rounds || []).find((round) => round && round.id === state.currentRoundId);
  if (roundHasPlayableOpenMatch(current)) return;
  const next = (state.rounds || []).find(roundHasPlayableOpenMatch);
  state.currentRoundId = next ? next.id : "";
}

function ensureNextRound(state, round) {
  const nextRoundIndex = (Number(round && round.index) || 1) + 1;
  let nextRound = (state.rounds || []).find((item) => item && Number(item.index) === nextRoundIndex);
  if (nextRound) return nextRound;
  nextRound = makeEmptyRound(nextRoundIndex, Math.ceil(((round && round.matches && round.matches.length) || 1) / 2));
  state.rounds = state.rounds || [];
  state.rounds.push(nextRound);
  return nextRound;
}

function ensureLoserRounds(state) {
  if (!state) return [];
  state.loserRounds = Array.isArray(state.loserRounds) && state.loserRounds.length
    ? state.loserRounds
    : makeLoserBracketRounds();
  return state.loserRounds;
}

function placePlayerInMatch(match, playerId, slot, nowMs) {
  if (!match || !playerId) return false;
  const players = Array.isArray(match.playerIds) ? match.playerIds.slice(0, 2) : [];
  while (players.length < 2) players.push("");
  players[Math.max(0, Math.min(1, Number(slot) || 0))] = playerId;
  match.playerIds = players;
  ensureMatchReadyTimer(match, nowMs || Date.now());
  return true;
}

function placePlayerInMatchEmptySlot(match, playerId, slot, nowMs) {
  if (!match || !playerId) return false;
  const targetSlot = Math.max(0, Math.min(1, Number(slot) || 0));
  const players = Array.isArray(match.playerIds) ? match.playerIds.slice(0, 2) : [];
  while (players.length < 2) players.push("");
  if (players[targetSlot] === playerId) return false;
  if (players[targetSlot]) return false;
  players[targetSlot] = playerId;
  match.playerIds = players;
  ensureMatchReadyTimer(match, nowMs || Date.now());
  return true;
}

function loserFromMatch(match, winnerId) {
  const ids = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
  return ids.find((id) => id && id !== winnerId) || "";
}

function mirroredIndex(index, count) {
  const safeCount = Math.max(1, Math.floor(Number(count) || 1));
  const safeIndex = Math.max(1, Math.min(safeCount, Math.floor(Number(index) || 1)));
  return safeCount + 1 - safeIndex;
}

function shiftedIndex(index, count) {
  const safeCount = Math.max(1, Math.floor(Number(count) || 1));
  const safeIndex = Math.max(1, Math.min(safeCount, Math.floor(Number(index) || 1)));
  return ((safeIndex - 1 + Math.floor(safeCount / 2)) % safeCount) + 1;
}

function firstLoserRoundTarget(matchIndex) {
  const map = {
    1: { match: 1, slot: 0 },
    16: { match: 1, slot: 1 },
    8: { match: 2, slot: 0 },
    9: { match: 2, slot: 1 },
    5: { match: 3, slot: 0 },
    12: { match: 3, slot: 1 },
    4: { match: 4, slot: 0 },
    13: { match: 4, slot: 1 },
    3: { match: 5, slot: 0 },
    14: { match: 5, slot: 1 },
    6: { match: 6, slot: 0 },
    11: { match: 6, slot: 1 },
    7: { match: 7, slot: 0 },
    10: { match: 7, slot: 1 },
    2: { match: 8, slot: 0 },
    15: { match: 8, slot: 1 },
  };
  return map[Math.max(1, Math.min(16, Math.floor(Number(matchIndex) || 1)))] || { match: Math.ceil((Number(matchIndex) || 1) / 2), slot: ((Number(matchIndex) || 1) - 1) % 2 };
}

function winnerBracketLoserTarget(round, match) {
  const winnerRoundIndex = Number(round && round.index) || 1;
  const matchIndex = Number(match && match.index) || 1;
  let targetRoundIndex = 0;
  let targetMatchIndex = 0;
  let slot = 1;

  if (winnerRoundIndex === 1) {
    targetRoundIndex = 1;
    const target = firstLoserRoundTarget(matchIndex);
    targetMatchIndex = target.match;
    slot = target.slot;
  } else if (winnerRoundIndex === 2) {
    targetRoundIndex = 2;
    targetMatchIndex = shiftedIndex(matchIndex, 8);
    slot = 1;
  } else if (winnerRoundIndex === 3) {
    targetRoundIndex = 4;
    targetMatchIndex = shiftedIndex(matchIndex, 4);
    slot = 1;
  } else if (winnerRoundIndex === 4) {
    targetRoundIndex = 6;
    targetMatchIndex = mirroredIndex(matchIndex, 2);
    slot = 1;
  } else if (winnerRoundIndex === 5) {
    targetRoundIndex = 8;
    targetMatchIndex = 1;
    slot = 1;
  } else {
    return null;
  }

  return { targetRoundIndex, targetMatchIndex, slot };
}

function placeWinnerBracketLoser(state, round, match, winnerId, nowMs) {
  const loserId = loserFromMatch(match, winnerId);
  if (!loserId) return false;
  const rounds = ensureLoserRounds(state);
  const target = winnerBracketLoserTarget(round, match);
  if (!target) return false;
  const targetRoundIndex = target.targetRoundIndex;
  const targetMatchIndex = target.targetMatchIndex;
  const slot = target.slot;
  const targetRound = rounds[targetRoundIndex - 1];
  const targetMatch = targetRound && targetRound.matches ? targetRound.matches[targetMatchIndex - 1] : null;
  return placePlayerInMatch(targetMatch, loserId, slot, nowMs);
}

function seedLoserBracketFromWinnerResults(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  const rounds = ensureLoserRounds(state);
  let changed = false;
  (Array.isArray(state.rounds) ? state.rounds : []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const winnerId = cleanText(match && match.winnerId, 80);
      const loserId = loserFromMatch(match, winnerId);
      const target = winnerId && loserId ? winnerBracketLoserTarget(round, match) : null;
      if (!target) return;
      const targetRound = rounds[target.targetRoundIndex - 1];
      const targetMatch = targetRound && targetRound.matches ? targetRound.matches[target.targetMatchIndex - 1] : null;
      if (placePlayerInMatchEmptySlot(targetMatch, loserId, target.slot, nowMs)) changed = true;
    });
  });
  return changed;
}

function placeLoserBracketWinner(state, round, match, winnerId, nowMs) {
  const rounds = ensureLoserRounds(state);
  const roundIndex = Number(round && round.index) || 1;
  const matchIndex = Number(match && match.index) || 1;
  let targetRoundIndex = 0;
  let targetMatchIndex = 0;
  let slot = 0;

  if ([1, 3, 5].includes(roundIndex)) {
    targetRoundIndex = roundIndex + 1;
    targetMatchIndex = matchIndex;
    slot = 0;
  } else if ([2, 4, 6].includes(roundIndex)) {
    targetRoundIndex = roundIndex + 1;
    targetMatchIndex = Math.ceil(matchIndex / 2);
    slot = (matchIndex - 1) % 2;
  } else if (roundIndex === 7) {
    targetRoundIndex = 8;
    targetMatchIndex = 1;
    slot = 0;
  } else if (roundIndex === 8) {
    targetRoundIndex = 9;
    targetMatchIndex = 1;
    slot = 1;
  } else if (roundIndex === 9) {
    state.status = "completed";
    state.currentRoundId = "";
    state.completedAt = new Date().toISOString();
    state.winnerId = winnerId;
    recordSngHistory(state, winnerId);
    return true;
  } else {
    return false;
  }

  const targetRound = rounds[targetRoundIndex - 1];
  const targetMatch = targetRound && targetRound.matches ? targetRound.matches[targetMatchIndex - 1] : null;
  return placePlayerInMatch(targetMatch, winnerId, slot, nowMs);
}

function placeWinnerInNextRound(state, round, match, winnerId, nowMs) {
  if (!state || state.status !== "bracket") return false;
  if (!round || !match || !winnerId) return false;
  if ((round.matches || []).length === 1) {
    ensureLoserRounds(state);
    state.winnersBracketWinnerId = winnerId;
    const grandFinal = state.loserRounds && state.loserRounds[8] && state.loserRounds[8].matches ? state.loserRounds[8].matches[0] : null;
    placePlayerInMatch(grandFinal, winnerId, 0, nowMs);
    placeWinnerBracketLoser(state, round, match, winnerId, nowMs);
    return true;
  }
  const nextRound = ensureNextRound(state, round);
  const targetIndex = Math.ceil((Number(match.index) || 1) / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  if (!targetMatch) return false;
  const slot = ((Number(match.index) || 1) - 1) % 2;
  placePlayerInMatch(targetMatch, winnerId, slot, nowMs);
  placeWinnerBracketLoser(state, round, match, winnerId, nowMs);
  updateCurrentRoundId(state);
  return true;
}

function placeMatchWinner(state, found, winnerId, nowMs) {
  if (!found || !found.round || !found.match) return false;
  if (found.bracket === "losers") return placeLoserBracketWinner(state, found.round, found.match, winnerId, nowMs);
  return placeWinnerInNextRound(state, found.round, found.match, winnerId, nowMs);
}

function applyExpiredReadyMatches(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  normalizeRoundsRuntime(state);
  let changed = false;
  let progressed = true;
  while (progressed && state.status === "bracket") {
    progressed = false;
    const allRounds = []
      .concat((state.rounds || []).map((round) => ({ bracket: "winners", round })))
      .concat((state.loserRounds || []).map((round) => ({ bracket: "losers", round })));
    for (const item of allRounds) {
      const round = item.round;
      for (const match of round && Array.isArray(round.matches) ? round.matches : []) {
        const winnerId = autoWinnerFromExpiredMatch(match, nowMs);
        if (!winnerId) continue;
        match.winnerId = winnerId;
        match.autoWinnerId = winnerId;
        match.completedAt = new Date(nowMs || Date.now()).toISOString();
        placeMatchWinner(state, { bracket: item.bracket, round, match }, winnerId, nowMs);
        changed = true;
        progressed = true;
      }
    }
  }
  updateCurrentRoundId(state);
  return changed;
}

function ensureReadyTimersForOpenMatches(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  ensureLoserRounds(state);
  const seeded = seedLoserBracketFromWinnerResults(state, nowMs);
  normalizeRoundsRuntime(state);
  let changed = seeded;
  (state.rounds || []).concat(state.loserRounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      if (ensureMatchReadyTimer(match, nowMs)) changed = true;
    });
  });
  return changed;
}

async function publicState(state, context) {
  const accountId = context && context.accountId ? String(context.accountId) : "";
  const isAdmin = !!(context && context.isAdmin);
  normalizeRoundsRuntime(state);
  const enrichedEntries = await enrichEntries(state.entries || []);
  const boundAccountIds = await getPokerPlusBoundAccountIds(enrichedEntries.map((entry) => entry.pokerPlusUserId));
  const accountIds = enrichedEntries.flatMap((entry) => [
    entry.accountId,
    entry.memberId,
    entry.pokerPlusUserId,
    ...(boundAccountIds[entry.pokerPlusUserId] || []),
  ]);
  const [avatars, profileCities, profileCitiesByNick, telegramVisibility, telegramUsernames] = await Promise.all([
    getAvatars(accountIds),
    getProfileCities(accountIds),
    getProfileCityNickIndex(enrichedEntries),
    getTelegramVisibility(accountIds),
    getTelegramUsernames(accountIds),
  ]);
  const entries = enrichedEntries.map((entry) => {
    const linkedIds = boundAccountIds[entry.pokerPlusUserId] || [];
    const telegramIds = [entry.accountId, entry.memberId, entry.pokerPlusUserId].concat(linkedIds);
    const telegramIsPublic = telegramIds.some((id) => telegramVisibility[id]);
    const telegramUsername = cleanText(entry.telegramUsername, 64) || telegramIds.map((id) => telegramUsernames[id]).find(Boolean) || "";
    return {
      id: entry.id,
      accountId: entry.accountId,
      displayName: entry.displayName,
      pokerPlusNickname: entry.pokerPlusNickname || "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
      profileCity: profileCityForEntry(entry, profileCities, boundAccountIds, profileCitiesByNick),
      avatar: avatars[entry.accountId] || "",
      telegramUsername: isAdmin || telegramIsPublic ? telegramUsername : "",
      status: entry.status,
      joinedAt: entry.joinedAt,
      approvedAt: entry.approvedAt,
      rejectedAt: isAdmin ? entry.rejectedAt : "",
      balanceRequestedAt: isAdmin ? entry.balanceRequestedAt : "",
      selectedForBracket: entry.selectedForBracket === true,
      mine: accountId && entry.accountId === accountId,
    };
  });
  const playersById = {};
  entries.forEach((entry) => {
    playersById[entry.id] = {
      id: entry.id,
      displayName: entry.displayName,
      pokerPlusNickname: entry.pokerPlusNickname || "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
      profileCity: entry.profileCity || "",
      avatar: entry.avatar || "",
      telegramUsername: entry.telegramUsername || "",
      status: entry.status,
      selectedForBracket: entry.selectedForBracket === true,
    };
  });
  return {
    ok: true,
    isAdmin,
    status: state.status,
    title: state.title,
    description: state.description || "",
    updatedAt: state.updatedAt || "",
    revision: publicStateVersion(state).revision,
    capacity: CAPACITY,
    buyIn: state.buyIn || defaultState().buyIn,
    prizes: state.prizes,
    entries,
    counts: {
      pending: entries.filter((entry) => entry.status === "pending" || entry.status === "balance_requested").length,
      approved: entries.filter((entry) => entry.status === "approved").length,
      rejected: entries.filter((entry) => entry.status === "rejected").length,
      balanceRequested: entries.filter((entry) => entry.status === "balance_requested").length,
    },
    myEntry: entries.find((entry) => entry.mine) || null,
    myEntryId: (entries.find((entry) => entry.mine) || {}).id || "",
    bracket: state.bracket,
    rounds: state.rounds || [],
    loserRounds: state.loserRounds || [],
    currentRoundId: state.currentRoundId || "",
    playersById,
    serverTime: new Date().toISOString(),
  };
}

function publicAchievementHistory(state) {
  return (Array.isArray(state && state.history) ? state.history : []).map((item) => ({
    title: item.title || DEFAULT_TITLE,
    completedAt: item.completedAt || "",
    season: item.season || "",
    winners: (Array.isArray(item.winners) ? item.winners : []).map((winner) => ({
      place: winner.place,
      entryId: winner.entryId,
      accountId: winner.accountId,
      memberId: winner.memberId,
      displayName: winner.displayName,
      pokerPlusNickname: winner.pokerPlusNickname,
      telegramUsername: winner.telegramUsername,
      nick: winner.pokerPlusNickname || winner.displayName,
    })),
  }));
}

async function optionalContext(req, body) {
  const identity = resolveTelegramIdentity(req, body || {}, BOT_TOKEN);
  if (!identity) return { identity: null, memberId: "", accountId: "", isAdmin: false };
  const memberId = memberIdFromIdentity(identity);
  const accountId = memberId ? await ensureDtIdForUserId(memberId) : "";
  return {
    identity,
    memberId,
    accountId: accountId || "",
    isAdmin: isAdminIdentity(identity, memberId),
  };
}

function findEntryByAccount(state, accountId) {
  return (state.entries || []).find((entry) => entry && entry.accountId === accountId) || null;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });

  if (req.method === "GET") {
    const mode = String((req.query && req.query.mode) || "").trim();
    const summaryMode = req.query && (req.query.summary === "1" || req.query.summary === "true" || req.query.homeSummary === "1");
    const state = await loadState();
    const nowMs = Date.now();
    const timerChanged = ensureReadyTimersForOpenMatches(state, nowMs);
    const autoChanged = applyExpiredReadyMatches(state, nowMs);
    if (timerChanged || autoChanged) await saveState(state);
    if (mode === "achievements") {
      res.setHeader("Cache-Control", "public, max-age=45, s-maxage=45");
      return res.status(200).json({ ok: true, rows: publicAchievementHistory(state) });
    }
    if (mode === "version") {
      setShortPublicCacheHeaders(res, 10);
      return res.status(200).json(publicStateVersion(state));
    }
    if (summaryMode) {
      setShortPublicCacheHeaders(res, 45);
      return res.status(200).json(publicHomeSummary(state));
    }
    const context = await optionalContext(req, {});
    return res.status(200).json(await publicState(state, context));
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body = {};
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Auth required" });
  const accountId = await ensureDtIdForUserId(auth.memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось определить аккаунт" });

  const action = cleanText(body.action, 40);
  const state = await loadState();
  const actionNowMs = Date.now();
  let changed = ensureReadyTimersForOpenMatches(state, actionNowMs);
  changed = applyExpiredReadyMatches(state, actionNowMs) || changed;
  if (changed) {
    await saveState(state);
    changed = false;
  }
  let playerNotifications = [];
  let applicationNotificationEntry = null;

  try {
    if (action === "open") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      const buyIn = cleanText(body.buyIn, BUY_IN_MAX) || defaultState().buyIn;
      const description = cleanMultilineText(body.description, DESCRIPTION_MAX);
      const prizes = normalizePrizes([
        { place: 1, text: body.prize1 },
        { place: 2, text: body.prize2 },
      ]);
      Object.assign(state, defaultState(), {
        status: "open",
        description,
        buyIn,
        prizes,
        openedAt: new Date().toISOString(),
      });
      changed = true;
    } else if (action === "updateSettings") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      state.description = cleanMultilineText(body.description, DESCRIPTION_MAX);
      state.buyIn = cleanText(body.buyIn, BUY_IN_MAX) || defaultState().buyIn;
      state.prizes = normalizePrizes([
        { place: 1, text: body.prize1 },
        { place: 2, text: body.prize2 },
      ]);
      changed = true;
    } else if (action === "join") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Запись сейчас закрыта" });
      const current = findEntryByAccount(state, accountId);
      if (current && current.status !== "rejected") {
        return res.status(409).json({ ok: false, error: "Вы уже подали заявку" });
      }
      const identity = auth.identity || {};
      const entry = normalizeEntry({
        id: current && current.id || entryId(),
        accountId,
        memberId: auth.memberId,
        displayName: displayNameFromIdentity(identity, accountId),
        telegramUsername: identity.telegramUsername || identity.pwaUsername || "",
        status: "pending",
        joinedAt: current && current.joinedAt || new Date().toISOString(),
      });
      const enrichedEntry = (await enrichEntries([entry]))[0] || entry;
      if (entryLevelValue(enrichedEntry) < MIN_JOIN_LEVEL) {
        return res.status(403).json({
          ok: false,
          error: joinLevelError(enrichedEntry),
          code: "SNG_MIN_LEVEL_REQUIRED",
          requiredLevel: MIN_JOIN_LEVEL,
          level: entryLevelValue(enrichedEntry),
        });
      }
      const acceptedEntry = normalizeEntry({
        ...entry,
        displayName: enrichedEntry.displayName || entry.displayName,
        pokerPlusNickname: enrichedEntry.pokerPlusNickname || entry.pokerPlusNickname,
        pokerPlusUserId: enrichedEntry.pokerPlusUserId || entry.pokerPlusUserId,
        level: entryLevelValue(enrichedEntry),
        profileCity: enrichedEntry.profileCity || entry.profileCity,
      });
      state.entries = (state.entries || []).filter((item) => item.accountId !== accountId);
      state.entries.push(acceptedEntry);
      applicationNotificationEntry = acceptedEntry;
      changed = true;
    } else if (action === "cancel") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Запись сейчас закрыта" });
      const current = findEntryByAccount(state, accountId);
      if (!current || current.status === "rejected") return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      state.entries = (state.entries || []).filter((entry) => entry.accountId !== accountId);
      changed = true;
    } else if (action === "approve" || action === "reject" || action === "requestBalance") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Менять заявки можно только при открытой записи" });
      const targetAccountId = cleanText(body.accountId, 40);
      const current = findEntryByAccount(state, targetAccountId);
      if (!current) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      const wasApproved = current.status === "approved";
      current.status = action === "approve" ? "approved" : action === "reject" ? "rejected" : "balance_requested";
      if (action === "approve") current.approvedAt = new Date().toISOString();
      if (action === "reject") current.rejectedAt = new Date().toISOString();
      if (action === "requestBalance") current.balanceRequestedAt = new Date().toISOString();
      playerNotifications = [buildEntryStatusNotification(action, current, state)].filter(Boolean);
      if (action === "approve" && !wasApproved) {
        playerNotifications = playerNotifications.concat(await buildApprovedParticipantBroadcastNotifications(state, current));
      }
      changed = true;
    } else if (action === "formPairs") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Сначала откройте запись" });
      const approved = (state.entries || []).filter((entry) => entry.status === "approved");
      if (approved.length < CAPACITY) return res.status(400).json({ ok: false, error: "Нужно 32 подтвержденных игрока" });
      const selected = shuffle(approved).slice(0, CAPACITY);
      const playerIds = selected.map((entry) => entry.id);
      const rounds = makeBracketRounds(playerIds);
      const loserRounds = makeLoserBracketRounds();
      const round = rounds[0];
      const readyDeadlineAt = readyDeadlineFrom(Date.now());
      (round.matches || []).forEach((match) => {
        normalizeMatchRuntime(match);
        match.readyDeadlineAt = readyDeadlineAt;
      });
      const selectedSet = new Set(playerIds);
      (state.entries || []).forEach((entry) => {
        entry.selectedForBracket = selectedSet.has(entry.id);
      });
      state.status = "bracket";
      state.bracket = {
        formedAt: new Date().toISOString(),
        playerIds,
      };
      state.rounds = rounds;
      state.loserRounds = loserRounds;
      state.currentRoundId = round.id;
      changed = true;
    } else if (action === "broadcastRoundOnePairs") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const firstRound = (state.rounds || []).find((round) => round && Number(round.index) === 1);
      const firstMatches = firstRound && Array.isArray(firstRound.matches) ? firstRound.matches : [];
      if (!firstMatches.length) return res.status(404).json({ ok: false, error: "Пары 1/16 не найдены" });
      playerNotifications = await buildRoundOnePairNotifications(state);
      state.bracket = state.bracket && typeof state.bracket === "object" ? state.bracket : {};
      state.bracket.roundOnePairsNotifiedAt = new Date().toISOString();
      changed = true;
    } else if (action === "setReady") {
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const current = findEntryByAccount(state, accountId);
      const playerId = current && current.id ? current.id : "";
      const matchPlayers = playableIds(match);
      if (!match || !playerId || !matchPlayers.includes(playerId)) {
        return res.status(403).json({ ok: false, error: "Вы не участник этой пары" });
      }
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      ensureMatchReadyTimer(match, Date.now());
      const deadlineMs = Date.parse(match.readyDeadlineAt || "");
      if (Number.isFinite(deadlineMs) && Date.now() >= deadlineMs) {
        const expiredChanged = applyExpiredReadyMatches(state, Date.now());
        if (expiredChanged) await saveState(state);
        return res.status(409).json({ ok: false, error: "Таймер готовности уже истек" });
      }
      match.readyById = match.readyById && typeof match.readyById === "object" ? match.readyById : {};
      match.readyById[playerId] = true;
      changed = true;
    } else if (action === "setPlaying") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const matchPlayers = playableIds(match);
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const tablePassword = cleanText(body.tablePassword, 4);
      if (!/^\d{4}$/.test(tablePassword)) return res.status(400).json({ ok: false, error: "Укажите пароль стола из 4 цифр" });
      if (!match.playingAt) {
        match.tablePassword = tablePassword;
        match.playingAt = new Date().toISOString();
        playerNotifications = playerNotifications.concat(await buildMatchStartedNotifications(state, found && found.round, match));
        changed = true;
      }
    } else if (action === "remindMatchReady") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const matchPlayers = playableIds(match);
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const reminders = await buildMatchReadyReminderNotifications(state, found && found.round, match);
      if (!reminders.length) return res.status(409).json({ ok: false, error: "Все игроки в паре уже готовы" });
      playerNotifications = playerNotifications.concat(reminders);
    } else if (action === "setMatchScore") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (playableIds(match).length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const scoreResult = normalizeIntermediateMatchScore(body.score, matchWinTarget(state, found));
      if (!scoreResult.ok) return res.status(400).json({ ok: false, error: scoreResult.error });
      match.liveScore = scoreResult.score;
      changed = true;
    } else if (action === "setWinner") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const round = found && found.round;
      const match = found && found.match;
      const winnerId = cleanText(body.playerId, 80);
      const matchPlayers = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
      if (!match || !winnerId || !matchPlayers.includes(winnerId)) {
        return res.status(400).json({ ok: false, error: "Пара не найдена" });
      }
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Победитель пары уже выбран" });
      const players = entryMap(state);
      if (!players.has(winnerId)) return res.status(404).json({ ok: false, error: "Игрок не найден" });
      let matchScore = null;
      if (matchRequiresScore(state, found)) {
        const scoreResult = normalizeMatchScore(body.score, match, winnerId, matchWinTarget(state, found));
        if (!scoreResult.ok) return res.status(400).json({ ok: false, error: scoreResult.error });
        matchScore = scoreResult.score;
      }
      const pendingBefore = pendingOpponentSnapshot(state);
      const completedAt = new Date().toISOString();
      match.winnerId = winnerId;
      match.liveScore = null;
      match.score = matchScore;
      match.completedAt = completedAt;
      placeMatchWinner(state, found, winnerId, Date.now());
      playerNotifications = playerNotifications.concat(await buildOpponentResolvedNotifications(state, pendingBefore));
      playerNotifications = playerNotifications.concat(await buildWinnerAdvancedNotifications(state, round, match, winnerId));
      updateCurrentRoundId(state);
      changed = true;
    } else if (action === "reset") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      Object.assign(state, defaultState());
      changed = true;
    } else {
      return res.status(400).json({ ok: false, error: "Неизвестное действие" });
    }
  } catch (error) {
    return res.status(error.status || 500).json({ ok: false, error: error.message || "Ошибка" });
  }

  if (changed) await saveState(state);
  if (applicationNotificationEntry) {
    try {
      const enriched = (await enrichEntries([applicationNotificationEntry]))[0] || applicationNotificationEntry;
      await notifySngApplication(enriched, state);
    } catch (error) {
      console.warn("sng-champions: application notification crashed", {
        error: error && error.message ? error.message : String(error || ""),
      });
    }
  }
  if (playerNotifications.length) {
    for (const notification of playerNotifications) {
      try {
        await notifyEntryStatus(notification);
      } catch (error) {
        console.warn("sng-champions: player notification crashed", {
          action: notification.action,
          chatId: notification.chatId,
          error: error && error.message ? error.message : String(error || ""),
        });
      }
    }
  }
  return res.status(200).json(await publicState(state, { ...auth, accountId }));
};
