"use strict";

const crypto = require("crypto");
const { ensureDtIdForUserId, ID_TO_USER_KEY } = require("../account-id");
const { authRequired, isAdmin, isAdminUsername, parseBody, setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { isAdminReportId, isAdminReportUsername } = require("../admin-report-access");
const { isBonusAdminUsername } = require("../bonus-admin-access");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { usernameSearchIndexCommands } = require("../username-search-index");
const { checkTelegramParticipationGate } = require("../telegram-participation-gate");
const { syncDailyPokerReminderDue } = require("../daily-poker-reminders");
const {
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromCachedProfile,
  pokerProfileStatusFromRakeServer,
} = require("../chat-profile-status");
const {
  BONUS_BALANCE_LOCK_PREFIX,
  acquireRedisLock,
  bonusLedgerWriteCommands,
  buildBonusLedgerEntry,
  getBonusBalance,
  getBonusLedgerRangeSummary,
  redisRowsOk,
  releaseRedisLock,
} = require("../bonus-ledger");
const {
  checkDailyIdentityConflict,
  dailyIdentityWriteCommands,
  pokerPlusIdForAccount,
} = require("../multi-account-guard");
const { normalizeRaffleDeviceId } = require("../raffle-core");
const {
  HAND_NAMES,
  applyAttemptToState,
  applyTicketlessStreakToState,
  dealDailyPokerHand,
  evaluateSevenCardHand,
  getNextAttemptType,
  normalizeDailyPokerState,
  publicStatePayload,
  rewardForHandRank,
  TICKETLESS_STREAK_TARGET,
  TICKETLESS_STREAK_TICKET_AMOUNT,
} = require("../daily-poker");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const DAILY_POKER_REQUIRED_CHANNEL = process.env.RAFFLE_CHANNEL || "@Dva_tuza_club";

const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const POKERPLUS_PROFILE_HASH_KEY = "poker_app:pokerplus_profiles";
const DAILY_POKER_USERS_KEY = "poker_app:daily_poker_users";
const DAILY_POKER_STATE_PREFIX = "poker_app:daily_poker_state:";
const DAILY_POKER_GAME_PREFIX = "poker_app:daily_poker_game:";
const DAILY_POKER_GAMES_USER_PREFIX = "poker_app:daily_poker_games_user:";
const DAILY_POKER_GAMES_DATE_PREFIX = "poker_app:daily_poker_games_date:";
const DAILY_POKER_IDEM_PREFIX = "poker_app:daily_poker_idem:";
const DAILY_POKER_LOCK_PREFIX = "poker_app:daily_poker_lock:";
const DAILY_POKER_TICKET_PREFIX = "poker_app:daily_poker_ticket:";
const DAILY_POKER_TICKETS_USER_PREFIX = "poker_app:daily_poker_tickets_user:";
const DAILY_POKER_IDENTITY_PREFIX = "poker_app:daily_poker_identity:";
const DAILY_POKER_PLAYED_COUNT_KEY = "poker_app:daily_poker_played_count";
const DAILY_POKER_TICKET_COUNT_KEY = "poker_app:daily_poker_ticket_count";
const DAILY_POKER_LAST_GAME_AT_KEY = "poker_app:daily_poker_last_game_at";
const DAILY_POKER_MANUAL_LIMIT_KEY = "poker_app:daily_poker_manual_limits";
const DAILY_POKER_WINNERS_CACHE_PREFIX = "poker_app:daily_poker_winners_cache:v6:";
const DAILY_POKER_SPIN_STATS_CACHE_PREFIX = "poker_app:daily_poker_spin_stats_cache:v1:";
const DAILY_POKER_WINNERS_CACHE_TTL_SECONDS = 24 * 60 * 60;
const DAILY_POKER_WINNERS_CACHE_MAX_LIMIT = 300;
const ROMAN_DAILY_POKER_LIMIT = 100;
const ROMAN_DAILY_POKER_USERNAMES = new Set(["roman1787443", "roman1_matvienko"]);
const ROMAN_DAILY_POKER_IDS = new Set(["388008256"]);
const POKERPLUS_NAME_MAX = 80;
const DAILY_POKER_GAME_FETCH_CHUNK = 500;
const DAILY_POKER_HAND_ORDER = [
  "royal_flush",
  "straight_flush",
  "four_of_a_kind",
  "full_house",
  "flush",
  "straight",
  "three_of_a_kind",
  "two_pair",
  "pair",
  "high_card",
];

function routeSegments(req) {
  const pathname = String((req && req.url) || "").split("?")[0];
  const parts = pathname.split("/").filter(Boolean);
  const apiIndex = parts.indexOf("api");
  const start = apiIndex >= 0 ? apiIndex + 1 : 0;
  return parts.slice(start);
}

function queryPathSegments(req) {
  let raw = req && req.query ? (req.query.path || req.query.route || req.query.p) : "";
  if (!raw && req && req.url) {
    try {
      const qs = String(req.url).split("?")[1] || "";
      const params = new URLSearchParams(qs);
      raw = params.get("path") || params.get("route") || params.get("p") || "";
    } catch (e) {}
  }
  const joined = Array.isArray(raw) ? raw.join("/") : String(raw || "");
  let value = joined;
  try {
    value = decodeURIComponent(joined);
  } catch (e) {}
  return value.split("/").map((part) => part.trim()).filter(Boolean);
}

function apiError(res, status, error, extra) {
  return res.status(status).json(Object.assign({ ok: false, success: false, error }, extra || {}));
}

function normalizeRomanUsername(value) {
  return String(value || "").replace(/^@+/, "").trim().toLowerCase();
}

function normalizeRomanId(value) {
  return String(value || "").replace(/^tg_/, "").trim();
}

function isRomanDailyPokerIdentity(auth) {
  const identity = auth && auth.identity ? auth.identity : auth || {};
  const usernames = [
    identity.telegramUsername,
    identity.pwaUsername,
    identity.username,
    auth && auth.telegramUsername,
    auth && auth.pwaUsername,
    auth && auth.username,
  ];
  if (usernames.some((username) => ROMAN_DAILY_POKER_USERNAMES.has(normalizeRomanUsername(username)))) return true;
  const ids = [
    auth && auth.memberId,
    identity.id,
    identity.userId,
    identity.telegramId,
    identity.telegram_id,
  ];
  return ids.some((id) => ROMAN_DAILY_POKER_IDS.has(normalizeRomanId(id)));
}

function dailyPokerGamesDateKey(accountId, gameDate) {
  return DAILY_POKER_GAMES_DATE_PREFIX + accountId + ":" + gameDate;
}

function dailyPokerIdentityKey(gameDate) {
  return DAILY_POKER_IDENTITY_PREFIX + String(gameDate || "");
}

function dailyPokerWinnersCacheKey(admin, gameDate) {
  return DAILY_POKER_WINNERS_CACHE_PREFIX + (admin ? "admin" : "public") + ":" + String(gameDate || "");
}

function sliceDailyPokerWinnersPayload(payload, limit, cached, summaryOnly) {
  const source = payload && typeof payload === "object" ? payload : {};
  const winners = summaryOnly ? [] : (Array.isArray(source.winners) ? source.winners.slice(0, limit) : []);
  let dailyDebitStats = Array.isArray(source.dailyDebitStats) ? source.dailyDebitStats : [];
  if (summaryOnly && !dailyDebitStats.length && Array.isArray(source.dailyDebits)) {
    const totals = new Map();
    source.dailyDebits.forEach((row) => {
      const date = String(row && row.date || "");
      const adminId = String(row && row.adminId || "").replace(/^tg_/, "");
      if (!date || !adminId) return;
      const key = date + ":" + adminId;
      const current = totals.get(key) || { date, adminId, amount: 0 };
      current.amount += safeInteger(row.amount);
      totals.set(key, current);
    });
    dailyDebitStats = Array.from(totals.values());
  }
  return Object.assign({}, source, {
    winners,
    dailyDebits: summaryOnly ? [] : source.dailyDebits,
    debitedUsers: summaryOnly ? [] : source.debitedUsers,
    dailyDebitStats,
    cached: !!cached,
  });
}

async function readDailyPokerWinnersCache(admin, gameDate, limit, summaryOnly) {
  try {
    const rows = await redisPipeline([["GET", dailyPokerWinnersCacheKey(admin, gameDate)]], { timeoutMs: 2000 });
    const raw = rows && rows[0] ? rows[0].result : null;
    if (!raw) return null;
    const parsed = JSON.parse(String(raw));
    if (!parsed || parsed.ok !== true || !Array.isArray(parsed.winners)) return null;
    return sliceDailyPokerWinnersPayload(parsed, limit, true, summaryOnly);
  } catch (e) {
    return null;
  }
}

async function writeDailyPokerWinnersCache(admin, gameDate, payload) {
  try {
    const cachePayload = sliceDailyPokerWinnersPayload(
      Object.assign({}, payload || {}, { cached: false, generatedAt: new Date().toISOString() }),
      DAILY_POKER_WINNERS_CACHE_MAX_LIMIT,
      false
    );
    await redisPipeline([
      [
        "SET",
        dailyPokerWinnersCacheKey(admin, gameDate),
        JSON.stringify(cachePayload),
        "EX",
        String(DAILY_POKER_WINNERS_CACHE_TTL_SECONDS),
      ],
    ], { timeoutMs: 3000 }).catch(function () {});
  } catch (e) {}
}

function safeInteger(value) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

function compactAmount(value) {
  const n = Math.max(0, safeInteger(value));
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

async function readDailyPokerGameRows(gameIds, options) {
  const ids = Array.isArray(gameIds) ? gameIds.map((id) => String(id || "").trim()).filter(Boolean) : [];
  if (!ids.length) return [];
  const opts = options || {};
  const rows = [];
  for (let i = 0; i < ids.length; i += DAILY_POKER_GAME_FETCH_CHUNK) {
    const chunk = ids.slice(i, i + DAILY_POKER_GAME_FETCH_CHUNK);
    const chunkRows = await redisPipeline([
      ["MGET", ...chunk.map((gameId) => DAILY_POKER_GAME_PREFIX + gameId)],
    ], Object.assign({}, opts, {
      maxRedisMultiReadFields: Math.max(DAILY_POKER_GAME_FETCH_CHUNK, chunk.length),
    }));
    const values = chunkRows && chunkRows[0] && Array.isArray(chunkRows[0].result)
      ? chunkRows[0].result
      : [];
    chunk.forEach((gameId, index) => {
      rows.push({ result: values[index] == null ? null : values[index] });
    });
  }
  return rows;
}

function dailyPokerTicketTitle(handRank, amount) {
  const rank = String(handRank || "");
  if (rank === "royal_flush") return "Билет на Нокаут за " + compactAmount(amount) + " ₽";
  if (rank === "straight_flush") return "Билет на турнир за " + compactAmount(amount) + " ₽";
  if (rank === "four_of_a_kind") return "Билет за " + compactAmount(amount) + " ₽";
  if (rank === "full_house") return "Билет за " + compactAmount(amount) + " ₽";
  return "Билет за " + compactAmount(amount) + " ₽";
}

function dailyPokerWinnerPrize(game) {
  const row = game && typeof game === "object" ? game : {};
  const parts = [];
  const ticketAmount = safeInteger(row.ticket_balance_credited);
  const bonusAmount = safeInteger(row.bonus_credited);
  const streakTicketAmount = safeInteger(row.ticketless_streak_ticket_balance_credited);
  if (ticketAmount > 0) parts.push(dailyPokerTicketTitle(row.hand_rank, ticketAmount));
  if (bonusAmount > 0) parts.push("+" + compactAmount(bonusAmount) + " бонусов");
  if (row.extra_attempt_granted === true) parts.push("доп. попытка");
  if (streakTicketAmount > 0) parts.push("Билет " + compactAmount(streakTicketAmount) + " ₽ за серию");
  return parts.join(" + ");
}

function dailyPokerGameHasPrize(game) {
  return !!dailyPokerWinnerPrize(game);
}

function dailyPokerPrizeTotals(game) {
  const row = game && typeof game === "object" ? game : {};
  const ticketAmount = safeInteger(row.ticket_balance_credited) + safeInteger(row.ticketless_streak_ticket_balance_credited);
  const bonusAmount = safeInteger(row.bonus_credited);
  return {
    ticketAmount,
    bonusAmount,
    totalAmount: ticketAmount + bonusAmount,
  };
}

function pluralRu(count, one, few, many) {
  const n = Math.abs(safeInteger(count));
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function dailyPokerAggregatePrizeText(row) {
  const totals = row || {};
  const parts = [];
  const ticketAmount = safeInteger(totals.ticketTotal);
  const bonusAmount = safeInteger(totals.bonusTotal);
  const extraAttempts = safeInteger(totals.extraAttempts);
  if (ticketAmount > 0) parts.push(compactAmount(ticketAmount) + " ₽");
  if (bonusAmount > 0) parts.push(compactAmount(bonusAmount) + " бонусов");
  if (!parts.length && extraAttempts > 0) {
    parts.push(compactAmount(extraAttempts) + " " + pluralRu(extraAttempts, "доп. попытка", "доп. попытки", "доп. попыток"));
  }
  return parts.length ? "Всего: " + parts.join(" + ") : "Всего: 0";
}

function mapByKeys(keys, values) {
  const out = {};
  (keys || []).forEach((key, index) => {
    if (!key) return;
    const value = values && values[index] != null ? String(values[index]).trim() : "";
    if (value) out[key] = value;
  });
  return out;
}

function publicDailyPokerNameFallback(accountId) {
  const id = String(accountId || "").trim();
  return id ? "Игрок " + id.slice(-4) : "Игрок";
}

function sanitizePokerPlusName(raw) {
  if (raw == null || raw === false) return "";
  return String(raw)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, POKERPLUS_NAME_MAX);
}

function pokerPlusProfileFromRaw(raw) {
  if (raw == null || raw === false) return null;
  let profile = null;
  try {
    profile = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    profile = null;
  }
  return profile && typeof profile === "object" ? profile : null;
}

function pokerPlusNameFromProfile(profile) {
  const p = profile && typeof profile === "object" ? profile : null;
  if (!p) return "";
  return sanitizePokerPlusName(
    p.displayName ||
    p.display_name ||
    p.fullName ||
    p.full_name ||
    p.playerName ||
    p.player_name ||
    p.name ||
    p.nickname ||
    p.Nike ||
    p.nick
  );
}

function pokerPlusNicknameFromProfile(profile) {
  const p = profile && typeof profile === "object" ? profile : null;
  if (!p) return "";
  return sanitizePokerPlusName(p.nickname || p.Nike || p.nick || p.name || p.displayName || p.display_name);
}

function pokerPlusUserIdFromProfile(profile, fallback) {
  const p = profile && typeof profile === "object" ? profile : null;
  return sanitizePokerPlusName(
    (p && (p.pokerPlusUserId || p.pokerPlusUserID || p.poker21UserId || p.poker21Id || p.Id || p.id)) ||
    fallback
  );
}

function pokerPlusStatusLevelFromProfile(profile) {
  if (!profile || typeof profile !== "object") return 0;
  const fee = pokerProfileFeeFromCachedProfile(profile);
  if (fee == null && !profile) return 0;
  const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
  const level = status && Number.isFinite(Number(status.level)) ? Math.trunc(Number(status.level)) : 0;
  return Math.max(0, Math.min(100, level));
}

function hasOptionalPromoAuthCredential(req) {
  const q = (req && req.query) || {};
  return [
    q.initData,
    q.init_data,
    q.pwaSession,
    q.pwa_session,
    q.pwaVkSession,
    q.pwa_vk_session,
  ].some((value) => String(value || "").trim() !== "");
}

function isDailyPokerWinnersAdminRequest(req) {
  if (!hasOptionalPromoAuthCredential(req)) return false;
  try {
    const auth = authRequired(req, {}, BOT_TOKEN);
    return !!(auth && auth.ok && auth.isAdmin);
  } catch (e) {
    return false;
  }
}

function isDailyPokerAdminProfile(profile) {
  const row = profile || {};
  const accountId = String(row.accountId || "").trim();
  const chatId = String(row.chatId || "").trim();
  const username = String(row.username || "").replace(/^@+/, "").trim();
  if (isAdmin(accountId) || isAdmin(chatId)) return true;
  if (isAdminUsername(username) || isAdminReportUsername(username) || isBonusAdminUsername(username)) return true;
  if (isAdminReportId(accountId) || isAdminReportId(chatId)) return true;
  if (ROMAN_DAILY_POKER_USERNAMES.has(normalizeRomanUsername(username))) return true;
  if (ROMAN_DAILY_POKER_IDS.has(normalizeRomanId(accountId)) || ROMAN_DAILY_POKER_IDS.has(normalizeRomanId(chatId))) return true;
  return false;
}

async function dailyPokerWinnerProfileMap(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => String(id || "").trim()).filter(Boolean)));
  if (!ids.length) return {};
  const rows = await redisPipeline([
    ["HMGET", ID_TO_USER_KEY, ...ids],
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...ids],
    ["HMGET", USERNAMES_KEY, ...ids],
    ["HMGET", POKERPLUS_PROFILE_HASH_KEY, ...ids],
    ["HMGET", POKERPLUS_BIND_HASH_KEY, ...ids],
  ], {
    context: "daily-poker.winners.profiles",
    allowLargeRedisRead: true,
  });
  const chatIds = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result.map((id) => String(id || "").trim()) : [];
  const accountDisplay = rows && rows[1] && Array.isArray(rows[1].result) ? rows[1].result : [];
  const accountUsernames = rows && rows[2] && Array.isArray(rows[2].result) ? rows[2].result : [];
  const profileRows = rows && rows[3] && Array.isArray(rows[3].result) ? rows[3].result : [];
  const pokerPlusIds = rows && rows[4] && Array.isArray(rows[4].result) ? rows[4].result : [];
  const linkedChatIds = Array.from(new Set(chatIds.filter(Boolean)));
  let linkedDisplay = {};
  let linkedUsername = {};
  if (linkedChatIds.length) {
    const linkedRows = await redisPipeline([
      ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...linkedChatIds],
      ["HMGET", USERNAMES_KEY, ...linkedChatIds],
    ], {
      context: "daily-poker.winners.linked-profiles",
      allowLargeRedisRead: true,
    });
    linkedDisplay = mapByKeys(linkedChatIds, linkedRows && linkedRows[0] ? linkedRows[0].result : []);
    linkedUsername = mapByKeys(linkedChatIds, linkedRows && linkedRows[1] ? linkedRows[1].result : []);
  }
  const out = {};
  ids.forEach((accountId, index) => {
    const chatId = chatIds[index] || "";
    const username = String(
      (chatId && linkedUsername[chatId] ? linkedUsername[chatId] : "") ||
      accountUsernames[index] ||
      ""
    ).replace(/^@+/, "").trim();
    const displayName =
      String(accountDisplay[index] || "").trim() ||
      (chatId && linkedDisplay[chatId] ? linkedDisplay[chatId] : "") ||
      (username ? "@" + username : "") ||
      publicDailyPokerNameFallback(accountId);
    const pokerPlusProfile = pokerPlusProfileFromRaw(profileRows[index]);
    const pokerPlusName = pokerPlusNameFromProfile(pokerPlusProfile);
    const pokerPlusNickname = pokerPlusNicknameFromProfile(pokerPlusProfile);
    const pokerPlusUserId = pokerPlusUserIdFromProfile(pokerPlusProfile, pokerPlusIds[index]);
    const publicDisplayName = pokerPlusName || pokerPlusNickname || publicDailyPokerNameFallback(accountId);
    const profile = {
      accountId,
      chatId,
      username,
      displayName: publicDisplayName,
      telegramDisplayName: displayName,
      pokerPlusName,
      pokerPlusNickname,
      pokerPlusUserId,
      pokerPlusStatusLevel: pokerPlusStatusLevelFromProfile(pokerPlusProfile),
    };
    profile.isAdmin = isDailyPokerAdminProfile(profile);
    out[accountId] = profile;
  });
  return out;
}

async function getDailyPokerGamesTodayStats(accountId, meta) {
  if (!accountId || !meta || !meta.gameDate) return { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
  const rows = await redisPipeline([["LRANGE", dailyPokerGamesDateKey(accountId, meta.gameDate), "0", "-1"]], {
    context: "daily-poker.today-stats.ids",
    allowLargeRedisRead: true,
  });
  const ids = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result.map((id) => String(id || "").trim()).filter(Boolean) : [];
  if (!ids.length) return { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
  const gameRows = await redisPipeline(ids.map((id) => ["GET", DAILY_POKER_GAME_PREFIX + id]), {
    context: "daily-poker.today-stats.games",
    allowLargeRedisRead: true,
  });
  const extraAttemptsGrantedToday = (gameRows || []).reduce((count, row) => {
    try {
      const game = row && row.result ? JSON.parse(String(row.result)) : null;
      return count + (game && game.extra_attempt_granted === true ? 1 : 0);
    } catch (e) {
      return count;
    }
  }, 0);
  return {
    gamesPlayedToday: ids.length,
    extraAttemptsGrantedToday,
  };
}

async function getDailyPokerManualLimit(accountId, meta) {
  if (!accountId || !meta || !meta.gameDate) return 0;
  const rows = await redisPipeline([["HGET", DAILY_POKER_MANUAL_LIMIT_KEY, accountId]]);
  return Math.max(0, safeInteger(rows && rows[0] && rows[0].result));
}

function romanDailyPokerStatePayload(gamesPlayedToday, meta, bonusBalance, extraAttemptsGrantedToday, streakState, dailyLimit) {
  const serverTime = meta && meta.serverTime ? meta.serverTime : new Date().toISOString();
  const streak = normalizeDailyPokerState(streakState);
  const played = Math.max(0, safeInteger(gamesPlayedToday));
  const extraGranted = Math.max(0, safeInteger(extraAttemptsGrantedToday));
  const limit = Math.max(1, safeInteger(dailyLimit) || ROMAN_DAILY_POKER_LIMIT);
  const attemptsLeft = Math.max(0, limit + extraGranted - played);
  const nextFreeAttemptAt = meta && meta.nextFreeAttemptAt ? meta.nextFreeAttemptAt : "";
  const secondsUntilNextAttempt = Math.max(0, Math.ceil((Date.parse(nextFreeAttemptAt) - Date.parse(serverTime)) / 1000) || 0);
  const payload = {
    canPlay: attemptsLeft > 0,
    attemptsLeft,
    baseAttemptUsedToday: false,
    extraAttemptGrantedToday: false,
    extraAttemptUsedToday: false,
    nextFreeAttemptAt,
    serverTime,
    bonusBalance: Math.max(0, safeInteger(bonusBalance)),
    specialDailyLimit: true,
    dailyPlayLimit: limit,
    dailyGamesPlayed: played,
    dailyExtraAttemptsGranted: extraGranted,
    ticketlessStreak: Math.max(0, safeInteger(streak.ticketlessStreak)),
    ticketlessStreakTarget: TICKETLESS_STREAK_TARGET,
    ticketlessStreakTicketAmount: TICKETLESS_STREAK_TICKET_AMOUNT,
  };
  if (attemptsLeft <= 0) payload.secondsUntilNextAttempt = secondsUntilNextAttempt;
  return payload;
}

function configuredTimeZone() {
  const raw = String(process.env.DAILY_POKER_TIMEZONE || process.env.POKER_APP_TIMEZONE || process.env.TZ || "Europe/Moscow").trim();
  const timeZone = raw.replace(/^:+/, "") || "Europe/Moscow";
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return timeZone;
  } catch (e) {
    return "Europe/Moscow";
  }
}

function timeZoneParts(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  const out = {};
  formatter.formatToParts(date).forEach((part) => {
    if (part.type !== "literal") out[part.type] = part.value;
  });
  return {
    year: Number(out.year),
    month: Number(out.month),
    day: Number(out.day),
    hour: Number(out.hour === "24" ? "0" : out.hour),
    minute: Number(out.minute),
    second: Number(out.second),
  };
}

function offsetMsAt(utcMs, timeZone) {
  const parts = timeZoneParts(new Date(utcMs), timeZone);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUtc - utcMs;
}

function zonedLocalToUtcMs(parts, timeZone) {
  let guess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour || 0, parts.minute || 0, parts.second || 0);
  for (let i = 0; i < 4; i += 1) {
    guess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour || 0, parts.minute || 0, parts.second || 0) - offsetMsAt(guess, timeZone);
  }
  return guess;
}

function dailyWindow(now, timeZone) {
  const nowDate = now instanceof Date ? now : new Date();
  const parts = timeZoneParts(nowDate, timeZone);
  const gameDate = [
    String(parts.year).padStart(4, "0"),
    String(parts.month).padStart(2, "0"),
    String(parts.day).padStart(2, "0"),
  ].join("-");
  const nextLocalMs = Date.UTC(parts.year, parts.month - 1, parts.day + 1);
  const nextDate = new Date(nextLocalMs);
  const nextUtcMs = zonedLocalToUtcMs({
    year: nextDate.getUTCFullYear(),
    month: nextDate.getUTCMonth() + 1,
    day: nextDate.getUTCDate(),
    hour: 0,
    minute: 0,
    second: 0,
  }, timeZone);
  return {
    gameDate,
    timeZone,
    serverTime: nowDate.toISOString(),
    nextFreeAttemptAt: new Date(nextUtcMs).toISOString(),
  };
}

function stateKey(userId) {
  return DAILY_POKER_STATE_PREFIX + userId + ":rolling";
}

function legacyStateKey(userId, gameDate) {
  return DAILY_POKER_STATE_PREFIX + userId + ":" + gameDate;
}

function idemKey(userId, key) {
  const hash = crypto.createHash("sha256").update(userId + "\n" + key).digest("hex");
  return DAILY_POKER_IDEM_PREFIX + hash;
}

function gameIdFromNow(nowMs) {
  return "dpg_" + String(nowMs || Date.now()) + "_" + crypto.randomBytes(6).toString("hex");
}

function ticketIdFromNow(nowMs) {
  return "dpt_" + String(nowMs || Date.now()) + "_" + crypto.randomBytes(6).toString("hex");
}

function safeIdempotencyKey(raw) {
  const key = String(raw || "").trim();
  if (!key || key.length > 160) return "";
  return key;
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId) return "";
  if (memberId.startsWith("guest_")) return "";
  if (/^ID\d{6}$/.test(memberId)) return memberId;
  return await ensureDtIdForUserId(memberId);
}

async function rememberUsername(identity, memberId) {
  const username = identity ? String(identity.telegramUsername || identity.pwaUsername || "").replace(/^@+/, "").trim() : "";
  if (!username || !memberId) return;
  try {
    await redisPipeline([
      ["HSET", USERNAMES_KEY, memberId, username],
      ...usernameSearchIndexCommands(memberId, username),
      ["DEL", "poker_app:private_cash_search_ready:v1"],
    ]);
  } catch (e) {}
}

function previousGameDate(gameDate) {
  const parts = String(gameDate || "").split("-").map((part) => parseInt(part, 10));
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return "";
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] - 1));
  return [
    String(date.getUTCFullYear()).padStart(4, "0"),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function dateKeyFromUtcDate(date) {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) return "";
  return [
    String(date.getUTCFullYear()).padStart(4, "0"),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function gameDateParts(gameDate) {
  const parts = String(gameDate || "").split("-").map((part) => parseInt(part, 10));
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null;
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (
    date.getUTCFullYear() !== parts[0] ||
    date.getUTCMonth() !== parts[1] - 1 ||
    date.getUTCDate() !== parts[2]
  ) {
    return null;
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}

function shiftGameDate(gameDate, days) {
  const parts = gameDateParts(gameDate);
  if (!parts) return "";
  return dateKeyFromUtcDate(new Date(Date.UTC(parts.year, parts.month - 1, parts.day + safeInteger(days))));
}

function gameDatesBetween(startGameDate, endGameDate) {
  const start = String(startGameDate || "").trim();
  let current = String(endGameDate || "").trim();
  if (!gameDateParts(start) || !gameDateParts(current) || current < start) return [];
  const out = [];
  for (let i = 0; i < 370 && current && current >= start; i += 1) {
    out.push(current);
    if (current === start) break;
    current = previousGameDate(current);
  }
  return out;
}

function weekDatesEndingAt(gameDate) {
  const parts = gameDateParts(gameDate);
  if (!parts) return [];
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  const daysSinceMonday = (date.getUTCDay() + 6) % 7;
  const start = shiftGameDate(gameDate, -daysSinceMonday);
  return gameDatesBetween(start, gameDate);
}

function previousWeekDatesFor(gameDate) {
  const currentWeekDates = weekDatesEndingAt(gameDate);
  const currentWeekStart = currentWeekDates.length ? currentWeekDates[currentWeekDates.length - 1] : "";
  const previousWeekStart = currentWeekStart ? shiftGameDate(currentWeekStart, -7) : "";
  const previousWeekEnd = currentWeekStart ? shiftGameDate(currentWeekStart, -1) : "";
  return previousWeekStart && previousWeekEnd ? gameDatesBetween(previousWeekStart, previousWeekEnd) : [];
}

function monthBoundsForGameDate(gameDate, offsetMonths) {
  const parts = gameDateParts(gameDate);
  if (!parts) return { start: "", end: "" };
  const start = new Date(Date.UTC(parts.year, parts.month - 1 + safeInteger(offsetMonths), 1));
  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0));
  return {
    start: dateKeyFromUtcDate(start),
    end: dateKeyFromUtcDate(end),
  };
}

function emptyDailyPokerSpinStats() {
  return {
    totalUniquePlayers: 0,
    totalSpins: 0,
    todayUniquePlayers: 0,
    todayTotalSpins: 0,
    weekUniquePlayers: 0,
    weekTotalSpins: 0,
    previousWeekUniquePlayers: 0,
    previousWeekTotalSpins: 0,
    monthUniquePlayers: 0,
    monthTotalSpins: 0,
    previousMonthUniquePlayers: 0,
    previousMonthTotalSpins: 0,
    firstSpinAt: "",
    firstSpinDate: "",
    handCounts: emptyDailyPokerHandCounts(),
    consolationBonusCount: 0,
    consolationBonusAmount: 0,
  };
}

function emptyDailyPokerHandCounts() {
  const out = {};
  DAILY_POKER_HAND_ORDER.forEach((rank) => {
    out[rank] = 0;
  });
  return out;
}

function normalizeDailyPokerHandCounts(value) {
  const out = emptyDailyPokerHandCounts();
  const source = value && typeof value === "object" ? value : {};
  Object.keys(source).forEach((rank) => {
    const key = String(rank || "").trim();
    if (!key) return;
    out[key] = Math.max(0, safeInteger(source[key]));
  });
  return out;
}

function normalizeDailyPokerGameDate(value) {
  const s = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

function dailyPokerFirstSpinMeta(game) {
  if (!game || typeof game !== "object") return null;
  const date = normalizeDailyPokerGameDate(game.game_date);
  const createdAt = String(game.created_at || "").trim();
  const createdMs = Date.parse(createdAt);
  if (Number.isFinite(createdMs)) {
    return {
      at: new Date(createdMs).toISOString(),
      date: new Date(createdMs - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),
      ms: createdMs,
    };
  }
  if (date) {
    return {
      at: date + "T00:00:00.000Z",
      date,
      ms: Date.parse(date + "T00:00:00.000Z"),
    };
  }
  return null;
}

async function getDailyPokerSpinStats(accountIds, meta) {
  const ids = Array.from(new Set((accountIds || []).map((id) => String(id || "").trim()).filter(Boolean)));
  const gameDate = meta && meta.gameDate ? String(meta.gameDate) : "";
  const weekDates = weekDatesEndingAt(gameDate);
  const previousWeekDates = previousWeekDatesFor(gameDate);
  const currentMonth = monthBoundsForGameDate(gameDate, 0);
  const previousMonth = monthBoundsForGameDate(gameDate, -1);
  const monthDates = currentMonth.start ? gameDatesBetween(currentMonth.start, gameDate) : [];
  const previousMonthDates = previousMonth.start && previousMonth.end ? gameDatesBetween(previousMonth.start, previousMonth.end) : [];
  if (!ids.length || !gameDate) {
    return emptyDailyPokerSpinStats();
  }
  const cacheKey = DAILY_POKER_SPIN_STATS_CACHE_PREFIX + gameDate;
  const cachedRows = await redisPipeline([["GET", cacheKey]], {
    context: "daily-poker.winners.spin-stats-cache",
    timeoutMs: 2000,
  });
  const cachedRaw = cachedRows && cachedRows[0] ? cachedRows[0].result : null;
  if (cachedRaw) {
    try {
      const cached = JSON.parse(String(cachedRaw));
      if (cached && typeof cached === "object") return Object.assign(emptyDailyPokerSpinStats(), cached);
    } catch (e) {}
  }
  const dates = Array.from(new Set(monthDates.concat(previousMonthDates, weekDates, previousWeekDates)));
  const weekDateSet = new Set(weekDates);
  const previousWeekDateSet = new Set(previousWeekDates);
  const monthDateSet = new Set(monthDates);
  const previousMonthDateSet = new Set(previousMonthDates);
  const todayUsers = new Set();
  const weekUsers = new Set();
  const previousWeekUsers = new Set();
  const monthUsers = new Set();
  const previousMonthUsers = new Set();
  let todayTotalSpins = 0;
  let weekTotalSpins = 0;
  let previousWeekTotalSpins = 0;
  let monthTotalSpins = 0;
  let previousMonthTotalSpins = 0;
  const rows = await redisPipeline(ids.flatMap((accountId) =>
    dates.map((date) => ["LLEN", dailyPokerGamesDateKey(accountId, date)])
  ), {
    context: "daily-poker.winners.spin-stats",
    allowLargeRedisRead: true,
    maxRedisReadCommands: Math.max(220, ids.length * dates.length + 5),
  });
  let index = 0;
  ids.forEach((accountId) => {
    dates.forEach((date) => {
      const row = rows && rows[index] ? rows[index] : null;
      index += 1;
      const spinCount = Math.max(0, safeInteger(row && row.result));
      if (!spinCount) return;
      if (weekDateSet.has(date)) {
        weekUsers.add(accountId);
        weekTotalSpins += spinCount;
      }
      if (previousWeekDateSet.has(date)) {
        previousWeekUsers.add(accountId);
        previousWeekTotalSpins += spinCount;
      }
      if (monthDateSet.has(date)) {
        monthUsers.add(accountId);
        monthTotalSpins += spinCount;
      }
      if (previousMonthDateSet.has(date)) {
        previousMonthUsers.add(accountId);
        previousMonthTotalSpins += spinCount;
      }
      if (date === gameDate) {
        todayUsers.add(accountId);
        todayTotalSpins += spinCount;
      }
    });
  });
  const stats = {
    todayUniquePlayers: todayUsers.size,
    todayTotalSpins,
    weekUniquePlayers: weekUsers.size,
    weekTotalSpins,
    previousWeekUniquePlayers: previousWeekUsers.size,
    previousWeekTotalSpins,
    monthUniquePlayers: monthUsers.size,
    monthTotalSpins,
    previousMonthUniquePlayers: previousMonthUsers.size,
    previousMonthTotalSpins,
  };
  await redisPipeline([["SET", cacheKey, JSON.stringify(stats), "EX", String(DAILY_POKER_WINNERS_CACHE_TTL_SECONDS)]], {
    context: "daily-poker.winners.spin-stats-cache-write",
    timeoutMs: 2000,
  }).catch(() => null);
  return stats;
}

function stateHasAttemptData(state) {
  const s = normalizeDailyPokerState(state);
  return !!(s.baseAttemptUsed || s.extraAttemptGranted || s.extraAttemptUsed || s.createdAt || s.updatedAt);
}

function newestState(states) {
  let best = null;
  let bestMs = 0;
  states.forEach((state) => {
    if (!stateHasAttemptData(state)) return;
    const s = normalizeDailyPokerState(state);
    const ms = Date.parse(s.updatedAt || s.baseAttemptAt || s.createdAt || "");
    const safeMs = Number.isFinite(ms) ? ms : 0;
    if (!best || safeMs >= bestMs) {
      best = state;
      bestMs = safeMs;
    }
  });
  return normalizeDailyPokerState(best);
}

async function readDailyPokerState(userId, meta) {
  const currentDate = meta && meta.gameDate ? meta.gameDate : "";
  const prevDate = previousGameDate(currentDate);
  const keys = [stateKey(userId)];
  if (currentDate) keys.push(legacyStateKey(userId, currentDate));
  if (prevDate) keys.push(legacyStateKey(userId, prevDate));
  const rows = await redisPipeline(keys.map((key) => ["GET", key]));
  const states = (rows || []).map((row) => {
    try {
      return row && row.result ? JSON.parse(String(row.result)) : null;
    } catch (e) {
      return null;
    }
  });
  return newestState(states);
}

async function claimIdempotency(key) {
  const rows = await redisPipeline([["GET", key]]);
  const raw = rows && rows[0] ? rows[0].result : null;
  if (raw) {
    if (raw === "__pending__") return { ok: false, status: 409, pending: true };
    try {
      return { ok: false, replay: true, payload: JSON.parse(String(raw)) };
    } catch (e) {
      return { ok: false, status: 409, pending: true };
    }
  }
  const claimRows = await redisPipeline([["SET", key, "__pending__", "NX", "EX", "180"]]);
  const result = claimRows && claimRows[0] ? claimRows[0].result : null;
  const claimed = result === "OK" || result === true || String(result || "").toUpperCase() === "OK";
  return claimed ? { ok: true } : { ok: false, status: 409, pending: true };
}

function prizeTextForHand(handRank, reward, streakReward) {
  const balanceHint = " Бонус начислен на ваш баланс выше. Можете копить дальше или обменять на билеты от 300 ₽, если уже хватает.";
  if (handRank === "royal_flush") return "Роял-флеш! Джекпот — билет на Нокаут за 10 000 ₽ зачислен на баланс." + balanceHint;
  if (handRank === "straight_flush") return "Стрит-флеш! Билет на турнир за 3 000 ₽ из расписания зачислен на баланс." + balanceHint;
  if (handRank === "four_of_a_kind") return "Каре! Билет за 500 ₽ зачислен на баланс." + balanceHint;
  if (handRank === "full_house") return "Фулл-хаус! Билет за 300 ₽ зачислен на баланс." + balanceHint;
  if (handRank === "flush") {
    return reward && reward.grantsExtraAttempt
      ? "Флеш! +50 бонусов на баланс и еще одна попытка сегодня." + balanceHint
      : "Флеш! +50 бонусов на баланс." + balanceHint;
  }
  if (handRank === "straight") {
    return reward && reward.grantsExtraAttempt
      ? "Стрит! +50 бонусов на баланс и еще одна попытка сегодня." + balanceHint
      : "Стрит! +50 бонусов на баланс." + balanceHint;
  }
  if (handRank === "three_of_a_kind") {
    return reward && reward.grantsExtraAttempt ? "Сет! Ты получаешь еще одну попытку сегодня." : "Сет! Дополнительная попытка сегодня уже была выдана.";
  }
  if (streakReward && streakReward.ticketAmount > 0) return "7 дней без билета! Билет 300 ₽ зачислен." + balanceHint;
  return "Сегодня без приза. Возвращайся завтра за новой раздачей.";
}

async function attachDailyPokerParticipationGate(payload, auth) {
  const reminder = await syncDailyPokerReminderDue(auth, payload).catch(() => null);
  const withReminder = Object.assign({}, payload, {
    dailyPokerReminderSubscribed: !!(reminder && reminder.subscribed),
    dailyPokerReminderNextFreeAttemptAt: reminder && reminder.nextFreeAttemptAt ? reminder.nextFreeAttemptAt : "",
  });
  const gate = await checkTelegramParticipationGate(auth.memberId, BOT_TOKEN, {
    channelHandle: DAILY_POKER_REQUIRED_CHANNEL,
    featureText: "игры в «Раздачу дня»",
    actionText: "нажмите «Раздать карты» снова",
  });
  if (gate.ok) return Object.assign({}, withReminder, { subscriptionRequired: false });
  return Object.assign({}, withReminder, {
    subscriptionRequired: true,
    code: gate.code,
    missing: gate.missing,
    missingRequirements: gate.missingRequirements,
    botUrl: gate.botUrl,
    channelUrl: gate.channelUrl,
    openUrl: gate.openUrl,
  });
}

async function handleStatus(req, res, auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");
  await rememberUsername(auth.identity, auth.memberId);
  const meta = dailyWindow(new Date(), configuredTimeZone());
  const state = await readDailyPokerState(accountId, meta);
  const isRomanDailyPoker = isRomanDailyPokerIdentity(auth);
  const manualDailyLimit = await getDailyPokerManualLimit(accountId, meta);
  if (isRomanDailyPoker || manualDailyLimit > 0) {
    const stats = await getDailyPokerGamesTodayStats(accountId, meta);
    const bonusBalance = await getBonusBalance(accountId);
    const payload = romanDailyPokerStatePayload(
      stats.gamesPlayedToday,
      meta,
      bonusBalance,
      stats.extraAttemptsGrantedToday,
      state,
      isRomanDailyPoker ? ROMAN_DAILY_POKER_LIMIT : manualDailyLimit
    );
    return res.status(200).json(await attachDailyPokerParticipationGate(payload, auth));
  }
  const bonusBalance = await getBonusBalance(accountId);
  const payload = publicStatePayload(state, meta, bonusBalance);
  return res.status(200).json(await attachDailyPokerParticipationGate(payload, auth));
}

function dailyPokerWinnersPayload(meta, spinStats, extra) {
  const extras = extra || {};
  const stats = Object.assign(emptyDailyPokerSpinStats(), spinStats || {});
  const totalUniquePlayers = Math.max(0, safeInteger(extras.totalUniquePlayers != null ? extras.totalUniquePlayers : stats.totalUniquePlayers));
  const totalSpins = Math.max(0, safeInteger(extras.totalSpins != null ? extras.totalSpins : stats.totalSpins));
  const todayUniquePlayers = Math.max(0, safeInteger(stats.todayUniquePlayers));
  const todayTotalSpins = Math.max(0, safeInteger(stats.todayTotalSpins));
  const weekUniquePlayers = Math.max(0, safeInteger(stats.weekUniquePlayers));
  const weekTotalSpins = Math.max(0, safeInteger(stats.weekTotalSpins));
  const previousWeekUniquePlayers = Math.max(0, safeInteger(stats.previousWeekUniquePlayers));
  const previousWeekTotalSpins = Math.max(0, safeInteger(stats.previousWeekTotalSpins));
  const monthUniquePlayers = Math.max(0, safeInteger(stats.monthUniquePlayers));
  const monthTotalSpins = Math.max(0, safeInteger(stats.monthTotalSpins));
  const previousMonthUniquePlayers = Math.max(0, safeInteger(stats.previousMonthUniquePlayers));
  const previousMonthTotalSpins = Math.max(0, safeInteger(stats.previousMonthTotalSpins));
  const firstSpinAt = String(extras.firstSpinAt || stats.firstSpinAt || "").trim();
  const firstSpinDate = normalizeDailyPokerGameDate(extras.firstSpinDate || stats.firstSpinDate || (firstSpinAt ? firstSpinAt.slice(0, 10) : ""));
  const handCounts = normalizeDailyPokerHandCounts(stats.handCounts);
  const consolationBonusCount = Math.max(0, safeInteger(stats.consolationBonusCount));
  const consolationBonusAmount = Math.max(0, safeInteger(stats.consolationBonusAmount));
  return Object.assign({
    ok: true,
    period: "all_time",
    gameDate: meta.gameDate,
    spinStats: {
      totalUniquePlayers,
      totalSpins,
      todayUniquePlayers,
      todayTotalSpins,
      weekUniquePlayers,
      weekTotalSpins,
      previousWeekUniquePlayers,
      previousWeekTotalSpins,
      monthUniquePlayers,
      monthTotalSpins,
      previousMonthUniquePlayers,
      previousMonthTotalSpins,
      firstSpinAt,
      firstSpinDate,
      handCounts,
      consolationBonusCount,
      consolationBonusAmount,
    },
    totalUniquePlayers,
    totalSpins,
    todayUniquePlayers,
    todayTotalSpins,
    weekUniquePlayers,
    weekTotalSpins,
    previousWeekUniquePlayers,
    previousWeekTotalSpins,
    monthUniquePlayers,
    monthTotalSpins,
    previousMonthUniquePlayers,
    previousMonthTotalSpins,
    firstSpinAt,
    firstSpinDate,
    handCounts,
    consolationBonusCount,
    consolationBonusAmount,
  }, extras);
}

async function buildDailyPokerRangeSummary(meta, admin, rangeFrom, rangeTo, balanceFrom, balanceTo) {
  const dates = gameDatesBetween(rangeFrom, rangeTo);
  const identityRows = await redisPipeline(dates.map((date) => ["HGETALL", dailyPokerIdentityKey(date)]), {
    context: "daily-poker.summary.range-identities",
    maxRedisReadCommands: Math.max(220, dates.length + 5),
  });
  const accountsByDate = new Map();
  dates.forEach((date, index) => {
    const pairs = identityRows && identityRows[index] && Array.isArray(identityRows[index].result)
      ? identityRows[index].result
      : [];
    const accounts = new Set();
    for (let pairIndex = 1; pairIndex < pairs.length; pairIndex += 2) {
      const accountId = String(pairs[pairIndex] || "").trim();
      if (accountId) accounts.add(accountId);
    }
    accountsByDate.set(date, Array.from(accounts));
  });

  const indexedAccountCount = Array.from(accountsByDate.values()).reduce((sum, accounts) => sum + accounts.length, 0);
  if (!indexedAccountCount && dates.length) {
    const usersRows = await redisPipeline([["SMEMBERS", DAILY_POKER_USERS_KEY]], {
      context: "daily-poker.summary.legacy-users",
      allowLargeRedisRead: true,
    });
    const knownUsers = usersRows && usersRows[0] && Array.isArray(usersRows[0].result)
      ? usersRows[0].result.map((id) => String(id || "").trim()).filter(Boolean)
      : [];
    const legacyChecks = [];
    dates.forEach((date) => {
      knownUsers.forEach((accountId) => legacyChecks.push({ date, accountId }));
    });
    const legacyRows = legacyChecks.length
      ? await redisPipeline(legacyChecks.map((row) => ["LLEN", dailyPokerGamesDateKey(row.accountId, row.date)]), {
          context: "daily-poker.summary.legacy-date-index",
          allowLargeRedisRead: true,
          maxRedisReadCommands: Math.max(220, legacyChecks.length + 5),
        })
      : [];
    legacyChecks.forEach((check, index) => {
      if (safeInteger(legacyRows && legacyRows[index] && legacyRows[index].result) <= 0) return;
      const accounts = accountsByDate.get(check.date) || [];
      if (!accounts.includes(check.accountId)) accounts.push(check.accountId);
      accountsByDate.set(check.date, accounts);
    });
  }

  const listRequests = [];
  dates.forEach((date) => {
    (accountsByDate.get(date) || []).forEach((accountId) => {
      listRequests.push({ date, accountId, command: ["LRANGE", dailyPokerGamesDateKey(accountId, date), "0", "-1"] });
    });
  });
  const listRows = listRequests.length
    ? await redisPipeline(listRequests.map((request) => request.command), {
        context: "daily-poker.summary.range-game-ids",
        allowLargeRedisRead: listRequests.length > 500,
        maxRedisReadCommands: Math.max(220, listRequests.length + 5),
      })
    : [];
  const gameIds = [];
  const seenGameIds = new Set();
  listRequests.forEach((request, index) => {
    const ids = listRows && listRows[index] && Array.isArray(listRows[index].result) ? listRows[index].result : [];
    ids.forEach((rawId) => {
      const id = String(rawId || "").trim();
      if (!id || seenGameIds.has(id)) return;
      seenGameIds.add(id);
      gameIds.push(id);
    });
  });
  const gameRows = gameIds.length
    ? await readDailyPokerGameRows(gameIds, {
        context: "daily-poker.summary.range-games",
        allowLargeRedisRead: true,
        maxRedisReadCommands: DAILY_POKER_GAME_FETCH_CHUNK,
      })
    : [];

  const users = new Set();
  const daily = new Map();
  let totalSpins = 0;
  let totalBonusAmount = 0;
  let totalTicketAmount = 0;
  (gameRows || []).forEach((row) => {
    let game = null;
    try { game = row && row.result ? JSON.parse(String(row.result)) : null; } catch (e) {}
    if (!game) return;
    const firstSpin = dailyPokerFirstSpinMeta(game);
    const date = firstSpin && firstSpin.date ? firstSpin.date : normalizeDailyPokerGameDate(game.game_date);
    if (!date || date < rangeFrom || date > rangeTo) return;
    const userId = String(game.user_id || "").trim();
    if (userId) users.add(userId);
    const totals = dailyPokerPrizeTotals(game);
    const bonusAmount = Math.max(0, safeInteger(totals && totals.bonusAmount));
    const ticketAmount = Math.max(0, safeInteger(totals && totals.ticketAmount));
    const aggregate = daily.get(date) || { date, userIds: new Set(), totalSpins: 0, bonusAmount: 0, ticketAmount: 0 };
    if (userId) aggregate.userIds.add(userId);
    aggregate.totalSpins += 1;
    aggregate.bonusAmount += bonusAmount;
    aggregate.ticketAmount += ticketAmount;
    daily.set(date, aggregate);
    totalSpins += 1;
    totalBonusAmount += bonusAmount;
    totalTicketAmount += ticketAmount;
  });
  const dailyStats = Array.from(daily.values()).sort((a, b) => a.date.localeCompare(b.date)).map((row) => ({
    date: row.date,
    userIds: admin ? Array.from(row.userIds) : undefined,
    uniquePlayers: row.userIds.size,
    totalSpins: row.totalSpins,
    bonusAmount: row.bonusAmount,
    ticketAmount: row.ticketAmount,
  }));

  let bonusBalanceSummary = null;
  if (admin) {
    try {
      bonusBalanceSummary = await getBonusLedgerRangeSummary(
        5000,
        balanceFrom || rangeFrom,
        balanceTo || rangeTo,
        configuredTimeZone()
      );
    } catch (error) {
      console.error("[daily-poker] range summary bonus details unavailable", error && error.message ? error.message : error);
    }
  }
  const dailyDebits = bonusBalanceSummary && Array.isArray(bonusBalanceSummary.dailyDebits) ? bonusBalanceSummary.dailyDebits : [];
  const dailyDebitStatsMap = new Map();
  dailyDebits.forEach((row) => {
    const date = String(row && row.date || "");
    const adminId = String(row && row.adminId || "").replace(/^tg_/, "");
    if (!date || !adminId) return;
    const key = date + ":" + adminId;
    const current = dailyDebitStatsMap.get(key) || { date, adminId, amount: 0 };
    current.amount += safeInteger(row.amount);
    dailyDebitStatsMap.set(key, current);
  });

  return dailyPokerWinnersPayload(meta, {
    totalUniquePlayers: users.size,
    totalSpins,
  }, {
    period: "custom",
    range: { from: rangeFrom, to: rangeTo },
    isAdmin: admin,
    totalUniquePlayers: users.size,
    totalSpins,
    totalBonusAmount,
    totalPrizeRubles: totalBonusAmount + totalTicketAmount,
    totalDebitedAmount: bonusBalanceSummary ? bonusBalanceSummary.debitedDuringRange : 0,
    dailyDebitStats: Array.from(dailyDebitStatsMap.values()),
    dailyReturnStats: bonusBalanceSummary ? bonusBalanceSummary.dailyReturns : [],
    dailyStats,
    bonusBalanceStart: bonusBalanceSummary ? bonusBalanceSummary.balanceStart : 0,
    bonusBalanceEnd: bonusBalanceSummary ? bonusBalanceSummary.balanceEnd : 0,
    bonusBalanceCredited: bonusBalanceSummary ? bonusBalanceSummary.creditedDuringRange : 0,
    bonusBalanceDebited: bonusBalanceSummary ? bonusBalanceSummary.debitedDuringRange : 0,
    bonusBalanceReturned: bonusBalanceSummary ? bonusBalanceSummary.returnedDuringRange : 0,
    rangeTotalSpinsStart: 0,
    rangeTotalSpinsEnd: totalSpins,
    winners: [],
  });
}

async function handleWinners(req, res) {
  const meta = dailyWindow(new Date(), configuredTimeZone());
  const emptySpinStats = emptyDailyPokerSpinStats();
  const admin = isDailyPokerWinnersAdminRequest(req);
  const summaryOnly = String(req && req.query ? req.query.summary : "") === "1";
  const limit = Math.max(1, Math.min(admin ? 300 : 100, safeInteger(req && req.query ? req.query.limit : 0) || 50));
  const rangeFrom = normalizeDailyPokerGameDate(req && req.query ? req.query.from : "");
  const rangeTo = normalizeDailyPokerGameDate(req && req.query ? req.query.to : "");
  const hasRange = !!(rangeFrom && rangeTo && rangeFrom <= rangeTo);
  const balanceFrom = normalizeDailyPokerGameDate(req && req.query ? req.query.balanceFrom : "");
  const balanceTo = normalizeDailyPokerGameDate(req && req.query ? req.query.balanceTo : "");
  const hasBalanceRange = !!(balanceFrom && balanceTo && balanceFrom <= balanceTo);
  const rangeDates = summaryOnly && hasRange ? gameDatesBetween(rangeFrom, rangeTo) : [];
  const rangeFitsFastSummary = rangeDates.length > 0 && rangeDates[rangeDates.length - 1] === rangeFrom;
  if (summaryOnly && hasRange && rangeFitsFastSummary) {
    const payload = await buildDailyPokerRangeSummary(
      meta,
      admin,
      rangeFrom,
      rangeTo,
      hasBalanceRange ? balanceFrom : "",
      hasBalanceRange ? balanceTo : ""
    );
    return res.status(200).json(sliceDailyPokerWinnersPayload(payload, limit, false, true));
  }
  const cachedPayload = hasRange ? null : await readDailyPokerWinnersCache(admin, meta.gameDate, limit, summaryOnly);
  if (cachedPayload) return res.status(200).json(cachedPayload);
  function cachePayload(payload) {
    return hasRange ? Promise.resolve() : writeDailyPokerWinnersCache(admin, meta.gameDate, payload);
  }
  const usersRows = await redisPipeline([["SMEMBERS", DAILY_POKER_USERS_KEY]], {
    context: "daily-poker.winners.users",
    allowLargeRedisRead: true,
  });
  const users = usersRows && usersRows[0] && Array.isArray(usersRows[0].result)
    ? usersRows[0].result.map((id) => String(id || "").trim()).filter(Boolean)
    : [];
  if (!users.length) {
    const payload = dailyPokerWinnersPayload(meta, emptySpinStats, { isAdmin: admin, totalWinners: 0, totalPrizeRubles: 0, winners: [] });
    await cachePayload(payload);
    return res.status(200).json(sliceDailyPokerWinnersPayload(payload, limit, false, summaryOnly));
  }

  const profiles = await dailyPokerWinnerProfileMap(users);
  const publicUsers = users.filter((userId) => profiles[userId] && !profiles[userId].isAdmin);
  if (!publicUsers.length) {
    const payload = dailyPokerWinnersPayload(meta, emptySpinStats, { isAdmin: admin, totalWinners: 0, totalPrizeRubles: 0, winners: [] });
    await cachePayload(payload);
    return res.status(200).json(sliceDailyPokerWinnersPayload(payload, limit, false, summaryOnly));
  }

  const spinStats = await getDailyPokerSpinStats(publicUsers, meta);
  const gameListRows = await redisPipeline([
    ["HMGET", DAILY_POKER_PLAYED_COUNT_KEY, ...publicUsers],
    ...publicUsers.map((userId) => ["LRANGE", DAILY_POKER_GAMES_USER_PREFIX + userId, "0", "-1"]),
  ], {
    context: "daily-poker.winners.user-game-ids",
    allowLargeRedisRead: true,
    maxRedisReadCommands: Math.max(220, publicUsers.length + 5),
  });
  const playedCountRow = gameListRows && gameListRows[0] && Array.isArray(gameListRows[0].result) ? gameListRows[0].result : [];
  const idRows = Array.isArray(gameListRows) ? gameListRows.slice(1) : [];
  const spinCountByUser = {};
  let totalSpins = 0;
  const totalUniquePlayers = publicUsers.length;
  const seenIds = new Set();
  const gameIds = [];
  (idRows || []).forEach((row, index) => {
    const userId = publicUsers[index];
    const ids = row && Array.isArray(row.result) ? row.result : [];
    spinCountByUser[userId] = Math.max(safeInteger(playedCountRow[index]), ids.length);
    totalSpins += spinCountByUser[userId];
    ids.forEach((id) => {
      const gameId = String(id || "").trim();
      if (gameId && !seenIds.has(gameId)) {
        seenIds.add(gameId);
        gameIds.push(gameId);
      }
    });
  });
  if (!gameIds.length) {
    const spinStatsWithTotal = Object.assign({}, emptySpinStats, { totalUniquePlayers, totalSpins });
    const payload = dailyPokerWinnersPayload(meta, spinStatsWithTotal, { isAdmin: admin, totalWinners: 0, totalPrizeRubles: 0, winners: [] });
    await cachePayload(payload);
    return res.status(200).json(sliceDailyPokerWinnersPayload(payload, limit, false, summaryOnly));
  }

  const gameRows = await readDailyPokerGameRows(gameIds, {
    context: "daily-poker.winners.games",
    allowLargeRedisRead: true,
    maxRedisReadCommands: DAILY_POKER_GAME_FETCH_CHUNK,
  });
  const parsedGames = (gameRows || []).map((row) => {
    try {
      return row && row.result ? JSON.parse(String(row.result)) : null;
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
  const spinStatsWithTotal = Object.assign({}, spinStats, { totalUniquePlayers, totalSpins });
  const aggregates = new Map();
  const dailyAggregates = new Map();
  const handCounts = emptyDailyPokerHandCounts();
  let consolationBonusCount = 0;
  let consolationBonusAmount = 0;
  let firstSpinAt = "";
  let firstSpinDate = "";
  let firstSpinMs = Infinity;
  let rangeTotalSpinsStart = 0;
  let rangeTotalSpinsEnd = 0;
  parsedGames.forEach((game) => {
    const userId = String(game && game.user_id || "").trim();
    if (!game || !userId || !profiles[userId] || profiles[userId].isAdmin) return;
    const handRank = String(game.hand_rank || "").trim();
    if (handRank) handCounts[handRank] = safeInteger(handCounts[handRank]) + 1;
    const consolationAmount = safeInteger(game.ticketless_streak_ticket_balance_credited) ||
      (game.ticketless_streak_awarded === true ? TICKETLESS_STREAK_TICKET_AMOUNT : 0);
    if (consolationAmount > 0) {
      consolationBonusCount += 1;
      consolationBonusAmount += consolationAmount;
    }
    const firstSpin = dailyPokerFirstSpinMeta(game);
    if (hasRange && firstSpin && firstSpin.date) {
      if (firstSpin.date < rangeFrom) rangeTotalSpinsStart += 1;
      if (firstSpin.date <= rangeTo) rangeTotalSpinsEnd += 1;
    }
    if (hasRange && (!firstSpin || firstSpin.date < rangeFrom || firstSpin.date > rangeTo)) return;
    if (firstSpin && firstSpin.date) {
      const daily = dailyAggregates.get(firstSpin.date) || { date: firstSpin.date, userIds: new Set(), totalSpins: 0, bonusAmount: 0, ticketAmount: 0 };
      daily.userIds.add(userId);
      daily.totalSpins += 1;
      dailyAggregates.set(firstSpin.date, daily);
    }
    if (firstSpin && Number.isFinite(firstSpin.ms) && firstSpin.ms < firstSpinMs) {
      firstSpinMs = firstSpin.ms;
      firstSpinAt = firstSpin.at;
      firstSpinDate = firstSpin.date;
    }
    if (!dailyPokerGameHasPrize(game)) return;
    const totals = dailyPokerPrizeTotals(game);
    if (firstSpin && firstSpin.date && totals.bonusAmount > 0) {
      const daily = dailyAggregates.get(firstSpin.date);
      if (daily) daily.bonusAmount += safeInteger(totals.bonusAmount);
    }
    if (firstSpin && firstSpin.date && totals.ticketAmount > 0) {
      const daily = dailyAggregates.get(firstSpin.date);
      if (daily) daily.ticketAmount += safeInteger(totals.ticketAmount);
    }
    const prizeText = dailyPokerWinnerPrize(game);
    const createdAt = String(game.created_at || "");
    const current = aggregates.get(userId) || {
      userId,
      ticketTotal: 0,
      bonusTotal: 0,
      totalPrizeAmount: 0,
      extraAttempts: 0,
      winsCount: 0,
      lastWonAt: "",
      lastPrize: "",
      lastHandName: "",
      lastPremiumHandAt: "",
      lastPremiumHandPrize: "",
      lastPremiumHandRank: "",
      lastPremiumHandName: "",
      bestPrizeAmount: -1,
      bestPrize: "",
      bestHandName: "",
    };
    current.ticketTotal += totals.ticketAmount;
    current.bonusTotal += totals.bonusAmount;
    current.totalPrizeAmount += totals.totalAmount;
    current.extraAttempts += game.extra_attempt_granted === true ? 1 : 0;
    current.winsCount += 1;
    if (!current.lastWonAt || createdAt > current.lastWonAt) {
      current.lastWonAt = createdAt;
      current.lastPrize = prizeText;
      current.lastHandName = String(game.hand_name || "");
    }
    const premiumHandRank = String(game.hand_rank || "");
    const isPremiumTicketHand = ["full_house", "four_of_a_kind", "straight_flush", "royal_flush"].includes(premiumHandRank);
    if (isPremiumTicketHand && safeInteger(game.ticket_balance_credited) > 0 &&
        (!current.lastPremiumHandAt || createdAt > current.lastPremiumHandAt)) {
      current.lastPremiumHandAt = createdAt;
      current.lastPremiumHandPrize = dailyPokerTicketTitle(premiumHandRank, safeInteger(game.ticket_balance_credited));
      current.lastPremiumHandRank = premiumHandRank;
      current.lastPremiumHandName = String(game.hand_name || HAND_NAMES[premiumHandRank] || "Выигрышная комбинация");
    }
    if (totals.totalAmount > current.bestPrizeAmount) {
      current.bestPrizeAmount = totals.totalAmount;
      current.bestPrize = prizeText;
      current.bestHandName = String(game.hand_name || "");
    }
    aggregates.set(userId, current);
  });

  const prizeRecipients = Array.from(aggregates.values());
  const dailyStats = Array.from(dailyAggregates.values()).sort((a, b) => a.date.localeCompare(b.date)).map((row) => ({
    date: row.date,
    userIds: admin ? Array.from(row.userIds) : undefined,
    uniquePlayers: row.userIds.size,
    totalSpins: row.totalSpins,
    bonusAmount: row.bonusAmount,
    ticketAmount: row.ticketAmount,
  }));
  const totalBonusAmount = dailyStats.reduce((sum, row) => sum + safeInteger(row.bonusAmount), 0);
  const winners = prizeRecipients.filter((winner) => safeInteger(winner.totalPrizeAmount) > 0);
  const totalPrizeRubles = winners.reduce((sum, winner) => sum + safeInteger(winner.totalPrizeAmount), 0);
  winners.sort((a, b) =>
    safeInteger(b.ticketTotal) - safeInteger(a.ticketTotal) ||
    safeInteger(b.totalPrizeAmount) - safeInteger(a.totalPrizeAmount) ||
    safeInteger(b.bonusTotal) - safeInteger(a.bonusTotal) ||
    safeInteger(b.winsCount) - safeInteger(a.winsCount) ||
    String(b.lastWonAt || "").localeCompare(String(a.lastWonAt || ""))
  );
  const limited = winners.slice(0, DAILY_POKER_WINNERS_CACHE_MAX_LIMIT);
  const spinStatsWithGameTotals = Object.assign({}, spinStatsWithTotal, {
    handCounts,
    consolationBonusCount,
    consolationBonusAmount,
  });
  let dailyDebits = [];
  let bonusBalanceSummary = null;
  if (admin) {
    try {
      bonusBalanceSummary = await getBonusLedgerRangeSummary(
        5000,
        hasBalanceRange ? balanceFrom : (hasRange ? rangeFrom : ""),
        hasBalanceRange ? balanceTo : (hasRange ? rangeTo : ""),
        configuredTimeZone()
      );
      dailyDebits = bonusBalanceSummary.dailyDebits;
    } catch (error) {
      console.error("[daily-poker] bonus debit details unavailable", error && error.message ? error.message : error);
    }
  }
  const selectedDebits = dailyDebits.filter((row) => !hasRange || (row.date >= rangeFrom && row.date <= rangeTo));
  const dailyDebitStatsMap = new Map();
  selectedDebits.forEach((row) => {
    const date = String(row && row.date || "");
    const adminId = String(row && row.adminId || "").replace(/^tg_/, "");
    if (!date || !adminId) return;
    const key = date + ":" + adminId;
    const current = dailyDebitStatsMap.get(key) || { date, adminId, amount: 0 };
    current.amount += safeInteger(row.amount);
    dailyDebitStatsMap.set(key, current);
  });
  const dailyDebitStats = Array.from(dailyDebitStatsMap.values());
  const totalDebitedAmount = selectedDebits.reduce((sum, row) => {
    return sum + safeInteger(row.amount);
  }, 0);
  const debitedByUser = {};
  selectedDebits.forEach((row) => {
    const userId = String(row.userId || "").trim();
    if (!userId) return;
    if (!debitedByUser[userId]) debitedByUser[userId] = { userId, amount: 0, issues: [] };
    debitedByUser[userId].amount += safeInteger(row.amount);
    debitedByUser[userId].issues.push({
      adminId: String(row.adminId || "").replace(/^tg_/, ""),
      date: String(row.date || ""),
      amount: safeInteger(row.amount),
    });
  });
  const debitUserIds = Object.keys(debitedByUser);
  const debitProfiles = debitUserIds.length ? await dailyPokerWinnerProfileMap(debitUserIds) : {};
  const debitedUsers = debitUserIds.map((userId) => {
    const profile = debitProfiles[userId] || {};
    return {
      id: userId,
      displayName: profile.displayName || publicDailyPokerNameFallback(userId),
      telegramUsername: profile.telegramUsername || "",
      pokerPlusName: profile.pokerPlusName || "",
      pokerPlusNickname: profile.pokerPlusNickname || "",
      pokerPlusUserId: profile.pokerPlusUserId || "",
      amount: debitedByUser[userId].amount,
      issues: debitedByUser[userId].issues.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))),
    };
  }).sort((a, b) => b.amount - a.amount || a.displayName.localeCompare(b.displayName));
  const rawReturnEntries = bonusBalanceSummary && Array.isArray(bonusBalanceSummary.returnEntries)
    ? bonusBalanceSummary.returnEntries.filter((row) => !hasRange || (row.date >= rangeFrom && row.date <= rangeTo))
    : [];
  const returnUserIds = Array.from(new Set(rawReturnEntries.map((row) => String(row && row.userId || "")).filter(Boolean)));
  const returnProfiles = returnUserIds.length ? await dailyPokerWinnerProfileMap(returnUserIds) : {};
  const returnedUsers = rawReturnEntries.map((row) => {
    const userId = String(row && row.userId || "");
    const profile = returnProfiles[userId] || {};
    return {
      id: userId,
      displayName: profile.displayName || publicDailyPokerNameFallback(userId),
      telegramUsername: profile.telegramUsername || "",
      pokerPlusName: profile.pokerPlusName || "",
      pokerPlusNickname: profile.pokerPlusNickname || "",
      pokerPlusUserId: profile.pokerPlusUserId || "",
      amount: safeInteger(row && row.amount),
      debitAmount: safeInteger(row && row.debitAmount),
      date: String(row && row.date || ""),
      returnedAt: String(row && row.verifiedAt || ""),
      adminId: String(row && row.adminId || ""),
      verifiedBy: String(row && row.verifiedBy || ""),
      tournamentTitle: String(row && row.tournamentTitle || ""),
    };
  });
  const payload = dailyPokerWinnersPayload(meta, spinStatsWithGameTotals, {
    period: hasRange ? "custom" : "all_time",
    range: hasRange ? { from: rangeFrom, to: rangeTo } : undefined,
    isAdmin: admin,
    firstSpinAt,
    firstSpinDate,
    totalWinners: winners.length,
    totalBonusAmount,
    totalDebitedAmount,
    debitedUsers,
    returnedUsers,
    dailyDebits,
    dailyDebitStats,
    dailyStats,
    bonusBalanceStart: bonusBalanceSummary ? bonusBalanceSummary.balanceStart : 0,
    bonusBalanceEnd: bonusBalanceSummary ? bonusBalanceSummary.balanceEnd : 0,
    bonusBalanceCredited: bonusBalanceSummary ? bonusBalanceSummary.creditedDuringRange : 0,
    bonusBalanceDebited: bonusBalanceSummary ? bonusBalanceSummary.debitedDuringRange : 0,
    bonusBalanceReturned: bonusBalanceSummary ? bonusBalanceSummary.returnedDuringRange : 0,
    dailyReturnStats: bonusBalanceSummary ? bonusBalanceSummary.dailyReturns : [],
    rangeTotalSpinsStart: hasRange ? rangeTotalSpinsStart : 0,
    rangeTotalSpinsEnd: hasRange ? rangeTotalSpinsEnd : totalSpins,
    totalPrizeRubles,
    winners: limited.map((winner) => {
      const profile = profiles[winner.userId] || {};
      const row = {
        id: winner.userId,
        displayName: profile.displayName || publicDailyPokerNameFallback(winner.userId),
        pokerPlusName: profile.pokerPlusName || "",
        pokerPlusNickname: profile.pokerPlusNickname || "",
        pokerPlusUserId: profile.pokerPlusUserId || "",
        pokerPlusStatusLevel: safeInteger(profile.pokerPlusStatusLevel),
        handName: winner.bestHandName || winner.lastHandName,
        prize: dailyPokerAggregatePrizeText(winner),
        totalPrizeAmount: safeInteger(winner.totalPrizeAmount),
        ticketTotal: safeInteger(winner.ticketTotal),
        bonusTotal: safeInteger(winner.bonusTotal),
        extraAttempts: safeInteger(winner.extraAttempts),
        winsCount: safeInteger(winner.winsCount),
        spinCount: safeInteger(spinCountByUser[winner.userId]),
        bestPrize: winner.bestPrize || "",
        lastPrize: winner.lastPrize || "",
        lastWonAt: winner.lastWonAt,
        lastPremiumHandAt: winner.lastPremiumHandAt || "",
        lastPremiumHandPrize: winner.lastPremiumHandPrize || "",
        lastPremiumHandRank: winner.lastPremiumHandRank || "",
        lastPremiumHandName: winner.lastPremiumHandName || "",
      };
      if (admin) {
        row.telegramUsername = profile.username || "";
        row.telegramDisplayName = profile.telegramDisplayName || "";
      }
      return row;
    }),
  });
  await cachePayload(payload);
  return res.status(200).json(sliceDailyPokerWinnersPayload(payload, limit, false, summaryOnly));
}

async function handlePlay(req, res, body, auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");
  await rememberUsername(auth.identity, auth.memberId);
  const dailyPokerP21Id = await pokerPlusIdForAccount(accountId);
  if (!dailyPokerP21Id) {
    return apiError(res, 403, "Привяжите аккаунт Poker21 в профиле, чтобы участвовать в «Раздаче дня».", {
      code: "POKER21_REQUIRED",
      requiresPoker21Profile: true,
    });
  }
  const gate = await checkTelegramParticipationGate(auth.memberId, BOT_TOKEN, {
    channelHandle: DAILY_POKER_REQUIRED_CHANNEL,
    featureText: "игры в «Раздачу дня»",
    actionText: "нажмите «Раздать карты» снова",
  });
  if (!gate.ok) {
    return apiError(res, gate.status || 403, gate.error, {
      code: gate.code,
      missing: gate.missing,
      missingRequirements: gate.missingRequirements,
      botUrl: gate.botUrl,
      channelUrl: gate.channelUrl,
      openUrl: gate.openUrl,
    });
  }
  const idemRaw = safeIdempotencyKey(body.idempotencyKey || body.idempotency_key);
  if (!idemRaw) return apiError(res, 400, "idempotencyKey required");

  const idemRedisKey = idemKey(accountId, idemRaw);
  const claim = await claimIdempotency(idemRedisKey);
  if (!claim.ok) {
    if (claim.replay && claim.payload) return res.status(200).json(Object.assign({}, claim.payload, { idempotentReplay: true }));
    return apiError(res, claim.status || 409, "Раздача уже выполняется. Подождите несколько секунд.");
  }

  const meta = dailyWindow(new Date(), configuredTimeZone());
  const dailyLock = await acquireRedisLock(DAILY_POKER_LOCK_PREFIX + accountId + ":" + meta.gameDate, 12);
  if (!dailyLock) {
    await redisPipeline([["DEL", idemRedisKey]]);
    return apiError(res, 409, "Раздача уже выполняется. Подождите несколько секунд.");
  }

  let bonusLock = null;
  try {
    const currentState = await readDailyPokerState(accountId, meta);
    const isRomanDailyPoker = isRomanDailyPokerIdentity(auth);
    const manualDailyLimit = await getDailyPokerManualLimit(accountId, meta);
    const hasSpecialDailyLimit = isRomanDailyPoker || manualDailyLimit > 0;
    const specialDailyLimit = isRomanDailyPoker ? ROMAN_DAILY_POKER_LIMIT : manualDailyLimit;
    let romanStats = { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
    let attemptType = getNextAttemptType(currentState, meta.serverTime);
    if (hasSpecialDailyLimit) {
      romanStats = await getDailyPokerGamesTodayStats(accountId, meta);
      const romanAttemptsLimit = specialDailyLimit + romanStats.extraAttemptsGrantedToday;
      attemptType = romanStats.gamesPlayedToday < romanAttemptsLimit ? "base" : null;
    }
    if (!attemptType) {
      await redisPipeline([["DEL", idemRedisKey]]);
      const bonusBalance = await getBonusBalance(accountId);
      const status = hasSpecialDailyLimit
        ? romanDailyPokerStatePayload(
            romanStats.gamesPlayedToday,
            meta,
            bonusBalance,
            romanStats.extraAttemptsGrantedToday,
            currentState,
            specialDailyLimit
          )
        : publicStatePayload(currentState, meta, bonusBalance);
      return apiError(res, 429, "Сегодняшняя попытка уже использована", status);
    }

    const nowIso = meta.serverTime || new Date().toISOString();
    const dailyPokerDeviceId = normalizeRaffleDeviceId(body.deviceId || body.device_id || body.guestDeviceId || body.guest_device_id);
    const dailyIdentity = {
      accountId,
      memberId: auth.memberId,
      telegramUserId: auth.memberId,
      p21Id: dailyPokerP21Id,
      deviceId: dailyPokerDeviceId,
    };
    const dailyIdentityKeyForDate = dailyPokerIdentityKey(meta.gameDate);
    if (!isRomanDailyPoker) {
      const dailyConflict = await checkDailyIdentityConflict(dailyIdentityKeyForDate, accountId, dailyIdentity);
      if (!dailyConflict.ok) {
        await redisPipeline([["DEL", idemRedisKey]]);
        return apiError(res, 403, dailyConflict.error || "Эта попытка уже использована через другой аккаунт.", {
          code: dailyConflict.code || "MULTI_ACCOUNT",
        });
      }
    }
    const nowMs = Date.parse(nowIso);
    const dealt = dealDailyPokerHand();
    const cards = dealt.holeCards.concat(dealt.boardCards);
    const evaluated = evaluateSevenCardHand(cards);
    const reward = rewardForHandRank(evaluated.rank, attemptType === "base" ? {} : currentState);
    const gameId = gameIdFromNow(nowMs);
    const ticketId = reward.ticketAmount > 0 ? ticketIdFromNow(nowMs) : null;
    let nextState = applyAttemptToState(currentState, attemptType, reward, nowIso);
    const streakResult = applyTicketlessStreakToState(nextState, attemptType, reward, nowIso, meta.gameDate);
    nextState = streakResult.state;
    const streakReward = streakResult.streakReward;
    const streakTicketId = streakReward && streakReward.ticketAmount > 0 ? ticketIdFromNow(nowMs) : null;

    let bonusBalance = await getBonusBalance(accountId);
    const commands = [];
    const credits = [];

    if (reward.bonusAmount > 0) {
      const isStraightBonus = evaluated.rank === "straight";
      credits.push({
        amount: reward.bonusAmount,
        operationType: "promo_reward",
        source: isStraightBonus ? "daily_poker_straight" : "daily_poker_flush",
        sourceId: gameId,
        comment: isStraightBonus ? "Стрит в игре Раздача дня" : "Флеш в игре Раздача дня",
      });
    }
    if (reward.ticketAmount > 0) {
      credits.push({
        amount: reward.ticketAmount,
        operationType: "promo_ticket",
        source: "daily_poker_ticket",
        sourceId: ticketId,
        comment: reward.title + " за игру Раздача дня",
      });
    }
    if (streakReward && streakReward.ticketAmount > 0) {
      credits.push({
        amount: streakReward.ticketAmount,
        operationType: "promo_ticket",
        source: "daily_poker_ticketless_streak",
        sourceId: streakTicketId,
        comment: streakReward.title + " за игру Раздача дня",
      });
    }

    if (credits.length) {
      bonusLock = await acquireRedisLock(BONUS_BALANCE_LOCK_PREFIX + accountId, 10);
      if (!bonusLock) {
        await redisPipeline([["DEL", idemRedisKey]]);
        return apiError(res, 409, "Бонусный баланс обновляется. Попробуйте ещё раз.");
      }
      bonusBalance = await getBonusBalance(accountId);
      credits.forEach((credit) => {
        const ledger = buildBonusLedgerEntry({
          userId: accountId,
          amount: credit.amount,
          direction: "credit",
          operationType: credit.operationType,
          balanceBefore: bonusBalance,
          source: credit.source,
          sourceId: credit.sourceId,
          comment: credit.comment,
          createdAt: nowIso,
        });
        bonusBalance = ledger.balance_after;
        commands.push(...bonusLedgerWriteCommands(ledger));
      });
    }

    const game = {
      id: gameId,
      user_id: accountId,
      game_date: meta.gameDate,
      attempt_type: attemptType,
      idempotency_key: idemRaw,
      hole_cards_json: dealt.holeCards,
      board_cards_json: dealt.boardCards,
      hand_rank: evaluated.rank,
      hand_name: evaluated.name,
      reward_type: reward.type,
      reward_amount: reward.ticketAmount || reward.bonusAmount || 0,
      ticket_id: ticketId,
      bonus_credited: reward.bonusAmount || 0,
      ticket_balance_credited: reward.ticketAmount || 0,
      extra_attempt_granted: reward.grantsExtraAttempt === true,
      ticketless_streak: nextState.ticketlessStreak,
      ticketless_streak_awarded: streakResult.awarded === true,
      ticketless_streak_before_award: streakResult.ticketlessStreakBeforeAward || 0,
      ticketless_streak_ticket_id: streakTicketId,
      ticketless_streak_ticket_balance_credited: streakReward ? streakReward.ticketAmount || 0 : 0,
      created_at: nowIso,
    };

    commands.push(
      ["SET", stateKey(accountId), JSON.stringify(nextState)],
      ["SET", DAILY_POKER_GAME_PREFIX + gameId, JSON.stringify(game)],
      ["LPUSH", DAILY_POKER_GAMES_USER_PREFIX + accountId, gameId],
      ["LTRIM", DAILY_POKER_GAMES_USER_PREFIX + accountId, "0", "499"],
      ["LPUSH", dailyPokerGamesDateKey(accountId, meta.gameDate), gameId],
      ["SADD", DAILY_POKER_USERS_KEY, accountId],
      ["HINCRBY", DAILY_POKER_PLAYED_COUNT_KEY, accountId, "1"],
      ["HSET", DAILY_POKER_LAST_GAME_AT_KEY, accountId, nowIso]
    );
    if (!isRomanDailyPoker) {
      commands.push(...dailyIdentityWriteCommands(dailyIdentityKeyForDate, accountId, dailyIdentity));
    }

    if (ticketId) {
      const ticket = {
        id: ticketId,
        user_id: accountId,
        source: "daily_poker",
        source_id: gameId,
        amount: reward.ticketAmount,
        title: reward.title,
        status: "issued",
        created_at: nowIso,
      };
      commands.push(
        ["SET", DAILY_POKER_TICKET_PREFIX + ticketId, JSON.stringify(ticket)],
        ["LPUSH", DAILY_POKER_TICKETS_USER_PREFIX + accountId, ticketId],
        ["HINCRBY", DAILY_POKER_TICKET_COUNT_KEY, accountId, "1"]
      );
    }
    if (streakTicketId && streakReward) {
      const ticket = {
        id: streakTicketId,
        user_id: accountId,
        source: "daily_poker_ticketless_streak",
        source_id: gameId,
        amount: streakReward.ticketAmount,
        title: streakReward.title,
        status: "issued",
        created_at: nowIso,
      };
      commands.push(
        ["SET", DAILY_POKER_TICKET_PREFIX + streakTicketId, JSON.stringify(ticket)],
        ["LPUSH", DAILY_POKER_TICKETS_USER_PREFIX + accountId, streakTicketId],
        ["HINCRBY", DAILY_POKER_TICKET_COUNT_KEY, accountId, "1"]
      );
    }

    const statePayload = hasSpecialDailyLimit
      ? romanDailyPokerStatePayload(
          romanStats.gamesPlayedToday + 1,
          meta,
          bonusBalance,
          romanStats.extraAttemptsGrantedToday + (reward.grantsExtraAttempt === true ? 1 : 0),
          nextState,
          specialDailyLimit
        )
      : publicStatePayload(nextState, meta, bonusBalance);
    const responsePayload = Object.assign({
      success: true,
      holeCards: dealt.holeCards,
      boardCards: dealt.boardCards,
      handRank: evaluated.rank,
      handName: evaluated.name,
      reward: Object.assign({}, reward, { message: prizeTextForHand(evaluated.rank, reward, streakReward) }),
      bonusBalance,
      attemptsLeft: statePayload.attemptsLeft,
      nextFreeAttemptAt: statePayload.nextFreeAttemptAt,
      serverTime: meta.serverTime,
      ticketlessStreak: statePayload.ticketlessStreak,
      ticketlessStreakTarget: statePayload.ticketlessStreakTarget,
      ticketlessStreakTicketAmount: statePayload.ticketlessStreakTicketAmount,
    }, {
      canPlay: statePayload.canPlay,
      baseAttemptUsedToday: statePayload.baseAttemptUsedToday,
      extraAttemptGrantedToday: statePayload.extraAttemptGrantedToday,
      extraAttemptUsedToday: statePayload.extraAttemptUsedToday,
    });
    if (streakReward && streakReward.ticketAmount > 0) {
      responsePayload.ticketlessStreakAward = {
        amount: streakReward.ticketAmount,
        title: streakReward.title,
        ticketId: streakTicketId,
        message: "Серия без билета: 7/7 — билет 300 ₽ зачислен.",
      };
    }
    if (statePayload.specialDailyLimit) {
      responsePayload.specialDailyLimit = true;
      responsePayload.dailyPlayLimit = statePayload.dailyPlayLimit;
      responsePayload.dailyGamesPlayed = statePayload.dailyGamesPlayed;
      responsePayload.dailyExtraAttemptsGranted = statePayload.dailyExtraAttemptsGranted;
    }
    const reminder = await syncDailyPokerReminderDue(auth, responsePayload).catch(() => null);
    responsePayload.dailyPokerReminderSubscribed = !!(reminder && reminder.subscribed);
    responsePayload.dailyPokerReminderNextFreeAttemptAt = reminder && reminder.nextFreeAttemptAt ? reminder.nextFreeAttemptAt : "";

    commands.push(["SET", idemRedisKey, JSON.stringify(responsePayload), "EX", "172800"]);

    const rows = await redisPipeline(commands);
    if (!redisRowsOk(rows)) {
      await redisPipeline([["DEL", idemRedisKey]]);
      return apiError(res, 500, "Не удалось сохранить раздачу");
    }

    return res.status(200).json(responsePayload);
  } finally {
    if (bonusLock) await releaseRedisLock(bonusLock);
    await releaseRedisLock(dailyLock);
  }
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  let body = {};
  try {
    body = req.method === "POST" ? parseBody(req) : {};
  } catch (e) {
    return apiError(res, 400, "Invalid JSON");
  }

  const segments = routeSegments(req);
  const promoIndex = segments.indexOf("promo");
  let tail = promoIndex >= 0 ? segments.slice(promoIndex + 1) : segments.slice(1);
  if (!tail.length) tail = queryPathSegments(req);
  if (tail[0] !== "daily-poker") return apiError(res, 404, "Not found");
  if (req.method === "GET" && tail[1] === "winners") return handleWinners(req, res);

  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");
  if (await rejectBlockedAppUser(req, res, auth)) return;

  if (req.method === "GET" && tail[1] === "status") return handleStatus(req, res, auth);
  if (req.method === "POST" && tail[1] === "play") return handlePlay(req, res, body, auth);
  return apiError(res, 404, "Not found");
};

module.exports._internals = {
  buildDailyPokerRangeSummary,
  dailyWindow,
  configuredTimeZone,
  dailyPokerWinnerPrize,
  isRomanDailyPokerIdentity,
  prizeTextForHand,
  romanDailyPokerStatePayload,
};
