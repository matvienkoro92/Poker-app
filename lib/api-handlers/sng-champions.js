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
const CAPACITY = 32;
const PLAYER_NAME_MAX = 80;
const PRIZE_TEXT_MAX = 160;
const BUY_IN_MAX = 80;
const DESCRIPTION_MAX = 280;
const DEFAULT_TITLE = "СНГ Лига Чемпионов Два Туза";

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

function sngOpenUrl() {
  const fallback = "https://t.me/Poker_dvatuza_bot/DvaTuza";
  const base = String(resolveTelegramOpenButtonUrl(process.env.MINI_APP_URL || process.env.APP_URL || fallback) || fallback)
    .trim()
    .replace(/\/+$/, "");
  return base ? base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=sng_champions" : "";
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

function buildPairFormationNotification(entry, state) {
  const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
  if (!chatId) return null;
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  return {
    action: "formPairs",
    chatId,
    text: "Стартовало формирование пар турнира " + title + ". Ожидайте свою пару и время старта матча.",
  };
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

async function buildApprovedParticipantBroadcastNotifications(state, approvedEntry) {
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const approvedRows = enrichedEntries.filter((entry) => entry && entry.status === "approved");
  const approvedTarget = approvedRows.find((entry) => entry.accountId === approvedEntry.accountId) || approvedEntry;
  const number = Math.max(1, approvedRows.findIndex((entry) => entry.accountId === approvedEntry.accountId) + 1);
  const nick = entryPublicName(approvedTarget);
  const level = entryLevelLabel(approvedTarget);
  const text =
    "Принят новый участник в СНГ-турнир Лига чемпионов.\n\n" +
    "Номер: " + String(number) + "/" + String(CAPACITY) + "\n" +
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

async function notifyEntryStatus(notification) {
  if (!notification || !BOT_TOKEN || !notification.chatId || !notification.text) return;
  const url = sngOpenUrl();
  const result = await sendTelegramMessage(BOT_TOKEN, {
    chatId: notification.chatId,
    text: notification.text,
    inlineButton: url ? { text: "СНГ Лига чемпионов", url } : null,
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
    winnerId: ids.length === 1 ? ids[0] : "",
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

function advanceIfRoundComplete(state) {
  if (!state || state.status !== "bracket") return false;
  const round = (state.rounds || []).find((item) => item && item.id === state.currentRoundId);
  if (!round) return false;
  const winners = (round.matches || []).map((match) => cleanText(match && match.winnerId, 80)).filter(Boolean);
  if (!winners.length || winners.length !== (round.matches || []).length) return false;
  if (winners.length === 1) {
    state.status = "completed";
    state.currentRoundId = "";
    state.completedAt = new Date().toISOString();
    state.winnerId = winners[0];
    recordSngHistory(state, winners[0]);
    return true;
  }
  const nextRound = makeRound((Number(round.index) || 1) + 1, winners);
  state.rounds.push(nextRound);
  state.currentRoundId = nextRound.id;
  return true;
}

async function publicState(state, context) {
  const accountId = context && context.accountId ? String(context.accountId) : "";
  const isAdmin = !!(context && context.isAdmin);
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
  let changed = false;
  let playerNotifications = [];

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
      state.entries = (state.entries || []).filter((item) => item.accountId !== accountId);
      state.entries.push(entry);
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
      const round = makeRound(1, playerIds);
      const selectedSet = new Set(playerIds);
      (state.entries || []).forEach((entry) => {
        entry.selectedForBracket = selectedSet.has(entry.id);
      });
      state.status = "bracket";
      state.bracket = {
        formedAt: new Date().toISOString(),
        playerIds,
      };
      state.rounds = [round];
      state.currentRoundId = round.id;
      playerNotifications = selected.map((entry) => buildPairFormationNotification(entry, state)).filter(Boolean);
      changed = true;
    } else if (action === "setWinner") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const round = (state.rounds || []).find((item) => item && item.id === state.currentRoundId);
      if (!round) return res.status(404).json({ ok: false, error: "Раунд не найден" });
      const match = (round.matches || []).find((item) => item && item.id === cleanText(body.matchId, 80));
      const winnerId = cleanText(body.playerId, 80);
      if (!match || !winnerId || !match.playerIds || !match.playerIds.includes(winnerId)) {
        return res.status(400).json({ ok: false, error: "Пара не найдена" });
      }
      const players = entryMap(state);
      if (!players.has(winnerId)) return res.status(404).json({ ok: false, error: "Игрок не найден" });
      match.winnerId = winnerId;
      advanceIfRoundComplete(state);
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
