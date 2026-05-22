"use strict";

const crypto = require("crypto");
const { ensureDtIdForUserId } = require("../account-id");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const {
  BONUS_BALANCE_LOCK_PREFIX,
  acquireRedisLock,
  bonusLedgerWriteCommands,
  buildBonusLedgerEntry,
  getBonusBalance,
  redisRowsOk,
  releaseRedisLock,
} = require("../bonus-ledger");
const {
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

const USERNAMES_KEY = "poker_app:visitor_usernames";
const DAILY_POKER_USERS_KEY = "poker_app:daily_poker_users";
const DAILY_POKER_STATE_PREFIX = "poker_app:daily_poker_state:";
const DAILY_POKER_GAME_PREFIX = "poker_app:daily_poker_game:";
const DAILY_POKER_GAMES_USER_PREFIX = "poker_app:daily_poker_games_user:";
const DAILY_POKER_GAMES_DATE_PREFIX = "poker_app:daily_poker_games_date:";
const DAILY_POKER_IDEM_PREFIX = "poker_app:daily_poker_idem:";
const DAILY_POKER_LOCK_PREFIX = "poker_app:daily_poker_lock:";
const DAILY_POKER_TICKET_PREFIX = "poker_app:daily_poker_ticket:";
const DAILY_POKER_TICKETS_USER_PREFIX = "poker_app:daily_poker_tickets_user:";
const DAILY_POKER_PLAYED_COUNT_KEY = "poker_app:daily_poker_played_count";
const DAILY_POKER_TICKET_COUNT_KEY = "poker_app:daily_poker_ticket_count";
const DAILY_POKER_LAST_GAME_AT_KEY = "poker_app:daily_poker_last_game_at";
const ROMAN_DAILY_POKER_LIMIT = 100;
const ROMAN_DAILY_POKER_USERNAMES = new Set(["roman1787443", "roman1_matvienko"]);
const ROMAN_DAILY_POKER_IDS = new Set(["388008256"]);

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

function safeInteger(value) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

async function getDailyPokerGamesTodayStats(accountId, meta) {
  if (!accountId || !meta || !meta.gameDate) return { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
  const rows = await redisPipeline([["LRANGE", dailyPokerGamesDateKey(accountId, meta.gameDate), "0", "-1"]]);
  const ids = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result.map((id) => String(id || "").trim()).filter(Boolean) : [];
  if (!ids.length) return { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
  const gameRows = await redisPipeline(ids.map((id) => ["GET", DAILY_POKER_GAME_PREFIX + id]));
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

function romanDailyPokerStatePayload(gamesPlayedToday, meta, bonusBalance, extraAttemptsGrantedToday, streakState) {
  const serverTime = meta && meta.serverTime ? meta.serverTime : new Date().toISOString();
  const streak = normalizeDailyPokerState(streakState);
  const played = Math.max(0, safeInteger(gamesPlayedToday));
  const extraGranted = Math.max(0, safeInteger(extraAttemptsGrantedToday));
  const attemptsLeft = Math.max(0, ROMAN_DAILY_POKER_LIMIT + extraGranted - played);
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
    dailyPlayLimit: ROMAN_DAILY_POKER_LIMIT,
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
    await redisPipeline([["HSET", USERNAMES_KEY, memberId, username]]);
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
  if (handRank === "royal_flush") return "Роял-флеш! Джекпот — билет на Нокаут за 10 000 ₽ зачислен на баланс.";
  if (handRank === "straight_flush") return "Стрит-флеш! Билет на турнир за 3 000 ₽ из расписания зачислен на баланс.";
  if (handRank === "four_of_a_kind") return "Каре! Билет на Нокаут Мистери за 1 200 ₽ зачислен на баланс.";
  if (handRank === "full_house") return "Фулл-хаус! Билет на любой турнир за 500 ₽ из расписания зачислен на баланс.";
  if (handRank === "flush") {
    return reward && reward.grantsExtraAttempt
      ? "Флеш! +50 бонусов на баланс и еще одна попытка сегодня."
      : "Флеш! +50 бонусов на баланс.";
  }
  if (handRank === "straight") {
    return reward && reward.grantsExtraAttempt ? "Стрит! Ты получаешь еще одну попытку сегодня." : "Стрит! Дополнительная попытка сегодня уже была выдана.";
  }
  if (handRank === "three_of_a_kind") {
    return reward && reward.grantsExtraAttempt ? "Сет! Ты получаешь еще одну попытку сегодня." : "Сет! Дополнительная попытка сегодня уже была выдана.";
  }
  if (streakReward && streakReward.ticketAmount > 0) return "7 дней без билета! Билет 300 ₽ зачислен.";
  return "Сегодня без приза. Возвращайся завтра за новой раздачей.";
}

async function handleStatus(req, res, auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");
  await rememberUsername(auth.identity, auth.memberId);
  const meta = dailyWindow(new Date(), configuredTimeZone());
  const state = await readDailyPokerState(accountId, meta);
  const isRomanDailyPoker = isRomanDailyPokerIdentity(auth);
  if (isRomanDailyPoker) {
    const stats = await getDailyPokerGamesTodayStats(accountId, meta);
    const bonusBalance = await getBonusBalance(accountId);
    return res.status(200).json(romanDailyPokerStatePayload(
      stats.gamesPlayedToday,
      meta,
      bonusBalance,
      stats.extraAttemptsGrantedToday,
      state
    ));
  }
  const bonusBalance = await getBonusBalance(accountId);
  return res.status(200).json(publicStatePayload(state, meta, bonusBalance));
}

async function handlePlay(req, res, body, auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");
  await rememberUsername(auth.identity, auth.memberId);
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
    let romanStats = { gamesPlayedToday: 0, extraAttemptsGrantedToday: 0 };
    let attemptType = getNextAttemptType(currentState, meta.serverTime);
    if (isRomanDailyPoker) {
      romanStats = await getDailyPokerGamesTodayStats(accountId, meta);
      const romanAttemptsLimit = ROMAN_DAILY_POKER_LIMIT + romanStats.extraAttemptsGrantedToday;
      attemptType = romanStats.gamesPlayedToday < romanAttemptsLimit ? "base" : null;
    }
    if (!attemptType) {
      await redisPipeline([["DEL", idemRedisKey]]);
      const bonusBalance = await getBonusBalance(accountId);
      const status = isRomanDailyPoker
        ? romanDailyPokerStatePayload(
            romanStats.gamesPlayedToday,
            meta,
            bonusBalance,
            romanStats.extraAttemptsGrantedToday,
            currentState
          )
        : publicStatePayload(currentState, meta, bonusBalance);
      return apiError(res, 429, "Сегодняшняя попытка уже использована", status);
    }

    const nowIso = meta.serverTime || new Date().toISOString();
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
      credits.push({
        amount: reward.bonusAmount,
        operationType: "promo_reward",
        source: "daily_poker_flush",
        sourceId: gameId,
        comment: "Флеш в игре Раздача дня",
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

    const statePayload = isRomanDailyPoker
      ? romanDailyPokerStatePayload(
          romanStats.gamesPlayedToday + 1,
          meta,
          bonusBalance,
          romanStats.extraAttemptsGrantedToday + (reward.grantsExtraAttempt === true ? 1 : 0),
          nextState
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

  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");

  const segments = routeSegments(req);
  const promoIndex = segments.indexOf("promo");
  let tail = promoIndex >= 0 ? segments.slice(promoIndex + 1) : segments.slice(1);
  if (!tail.length) tail = queryPathSegments(req);
  if (tail[0] !== "daily-poker") return apiError(res, 404, "Not found");
  if (req.method === "GET" && tail[1] === "status") return handleStatus(req, res, auth);
  if (req.method === "POST" && tail[1] === "play") return handlePlay(req, res, body, auth);
  return apiError(res, 404, "Not found");
};

module.exports._internals = {
  dailyWindow,
  configuredTimeZone,
  isRomanDailyPokerIdentity,
  romanDailyPokerStatePayload,
};
