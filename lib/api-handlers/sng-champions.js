"use strict";

const crypto = require("crypto");
const { authRequired, isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { readPokerPlusProfile } = require("../pokerplus");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { getJson, isConfigured: redisConfigured, pipeline: redisPipeline, setJson } = require("../redis");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:sng_champions";
const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
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

function nextRoundForMatch(state, round, match) {
  if (!state || !round || !match) return null;
  const nextRoundIndex = (Number(round.index) || 1) + 1;
  const nextRound = (state.rounds || []).find((item) => item && Number(item.index) === nextRoundIndex);
  if (!nextRound) return null;
  const targetIndex = Math.ceil((Number(match.index) || 1) / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  return targetMatch ? nextRound : null;
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
    winnerName +
    " прошел " +
    loserName +
    " и прошел в раунд " +
    nextStage +
    ".";
  const selectedIds = new Set(
    (state.bracket && Array.isArray(state.bracket.playerIds) ? state.bracket.playerIds : [])
      .filter(Boolean)
  );
  const seen = new Set();
  return (state.entries || [])
    .filter((entry) => entry && (!selectedIds.size || selectedIds.has(entry.id)))
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return {
        action: "winnerAdvanced",
        chatId,
        text,
      };
    })
    .filter(Boolean);
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
  return Number.isFinite(level) && level >= 0 ? String(Math.floor(level)) : "не указан";
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
    telegramUsername: cleanText(row.telegramUsername, 64),
    status,
    joinedAt: cleanText(row.joinedAt, 40),
    approvedAt: cleanText(row.approvedAt, 40),
    rejectedAt: cleanText(row.rejectedAt, 40),
    balanceRequestedAt: cleanText(row.balanceRequestedAt, 40),
    selectedForBracket: row.selectedForBracket === true,
  };
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
  state.currentRoundId = cleanText(state.currentRoundId, 80);
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

  await Promise.all(lookupRows.map(async (entry, index) => {
    const accountId = cleanText(entry.accountId, 40);
    const p21Id = cleanText(
      (bindRows[index * 2] && bindRows[index * 2].result) ||
        (bindRows[index * 2 + 1] && bindRows[index * 2 + 1].result),
      80
    );
    const candidates = [p21Id, accountId].filter(Boolean);
    let profile = null;
    for (const id of candidates) {
      profile = await readPokerPlusProfile(id).catch(() => null);
      if (profile) break;
    }
    if (!profile) return;
    const nickname = pokerPlusNicknameFromProfile(profile);
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    const level = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
    const profilePoker21Id = cleanText(profile && (profile.pokerPlusUserId || profile.Id || profile.userId || profile.p21Id), 80);
    if (p21Id || profilePoker21Id) entry.pokerPlusUserId = p21Id || profilePoker21Id;
    if (nickname) {
      entry.pokerPlusNickname = nickname;
      entry.displayName = nickname;
    }
    entry.level = level;
  }));

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
    autoWinnerId: "",
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
  match.autoWinnerId = cleanText(match.autoWinnerId, 80);
}

function normalizeRoundsRuntime(state) {
  (state.rounds || []).forEach((round) => {
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
  const finalRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 1);
  const semiRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 2);
  const finalMatch = finalRound && finalRound.matches ? finalRound.matches[0] : null;
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
  matchLosers(finalMatch).forEach((id) => add(id, 2));
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
    if (match) return { round, match };
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

function placeWinnerInNextRound(state, round, match, winnerId, nowMs) {
  if (!state || state.status !== "bracket") return false;
  if (!round || !match || !winnerId) return false;
  if ((round.matches || []).length === 1) {
    state.status = "completed";
    state.currentRoundId = "";
    state.completedAt = new Date().toISOString();
    state.winnerId = winnerId;
    recordSngHistory(state, winnerId);
    return true;
  }
  const nextRound = ensureNextRound(state, round);
  const targetIndex = Math.ceil((Number(match.index) || 1) / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  if (!targetMatch) return false;
  const slot = ((Number(match.index) || 1) - 1) % 2;
  const players = Array.isArray(targetMatch.playerIds) ? targetMatch.playerIds.slice(0, 2) : [];
  while (players.length < 2) players.push("");
  players[slot] = winnerId;
  targetMatch.playerIds = players;
  ensureMatchReadyTimer(targetMatch, nowMs || Date.now());
  updateCurrentRoundId(state);
  return true;
}

function applyExpiredReadyMatches(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  normalizeRoundsRuntime(state);
  let changed = false;
  let progressed = true;
  while (progressed && state.status === "bracket") {
    progressed = false;
    for (const round of state.rounds || []) {
      for (const match of round && Array.isArray(round.matches) ? round.matches : []) {
        const winnerId = autoWinnerFromExpiredMatch(match, nowMs);
        if (!winnerId) continue;
        match.winnerId = winnerId;
        match.autoWinnerId = winnerId;
        placeWinnerInNextRound(state, round, match, winnerId, nowMs);
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
  normalizeRoundsRuntime(state);
  let changed = false;
  (state.rounds || []).forEach((round) => {
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
  const avatars = await getAvatars(enrichedEntries.map((entry) => entry.accountId));
  const entries = enrichedEntries.map((entry) => ({
    id: entry.id,
    accountId: entry.accountId,
    displayName: entry.displayName,
    pokerPlusNickname: entry.pokerPlusNickname || "",
    level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
    avatar: avatars[entry.accountId] || "",
    telegramUsername: isAdmin ? entry.telegramUsername : "",
    status: entry.status,
    joinedAt: entry.joinedAt,
    approvedAt: entry.approvedAt,
    rejectedAt: isAdmin ? entry.rejectedAt : "",
    balanceRequestedAt: isAdmin ? entry.balanceRequestedAt : "",
    selectedForBracket: entry.selectedForBracket === true,
    mine: accountId && entry.accountId === accountId,
  }));
  const playersById = {};
  entries.forEach((entry) => {
    playersById[entry.id] = {
      id: entry.id,
      displayName: entry.displayName,
      pokerPlusNickname: entry.pokerPlusNickname || "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
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
      if (!match.playingAt) {
        match.playingAt = new Date().toISOString();
        changed = true;
      }
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
      if (!matchAllPlayersReady(match)) return res.status(409).json({ ok: false, error: "Оба игрока должны нажать «Готов»" });
      const players = entryMap(state);
      if (!players.has(winnerId)) return res.status(404).json({ ok: false, error: "Игрок не найден" });
      match.winnerId = winnerId;
      placeWinnerInNextRound(state, round, match, winnerId, Date.now());
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
