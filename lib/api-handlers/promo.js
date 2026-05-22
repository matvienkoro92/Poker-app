"use strict";

const crypto = require("crypto");
const { ensureDtIdForUserId } = require("../account-id");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { pipeline: redisPipeline, getJson, isConfigured: redisConfigured } = require("../redis");
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
  dealDailyPokerHand,
  evaluateSevenCardHand,
  getAttemptsLeft,
  getNextAttemptType,
  normalizeDailyPokerState,
  publicStatePayload,
  rewardForHandRank,
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

function stateKey(userId, gameDate) {
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

async function readDailyPokerState(userId, gameDate) {
  return normalizeDailyPokerState(await getJson(stateKey(userId, gameDate), null));
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

function prizeTextForHand(handRank, reward) {
  if (handRank === "royal_flush") return "Роял-флеш! Джекпот — билет на турнир 10 000 ₽.";
  if (handRank === "straight_flush") return "Стрит-флеш! Ты выиграл билет на турнир 3000 ₽.";
  if (handRank === "four_of_a_kind") return "Каре! Ты выиграл билет на турнир 1000 ₽.";
  if (handRank === "full_house") return "Фулл-хаус! Ты выиграл билет на турнир 500 ₽.";
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
  return "Сегодня без приза. Возвращайся завтра за новой раздачей.";
}

async function handleStatus(req, res, auth) {
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");
  await rememberUsername(auth.identity, auth.memberId);
  const meta = dailyWindow(new Date(), configuredTimeZone());
  const state = await readDailyPokerState(accountId, meta.gameDate);
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
    const currentState = await readDailyPokerState(accountId, meta.gameDate);
    const attemptType = getNextAttemptType(currentState);
    if (!attemptType) {
      await redisPipeline([["DEL", idemRedisKey]]);
      const bonusBalance = await getBonusBalance(accountId);
      const status = publicStatePayload(currentState, meta, bonusBalance);
      return apiError(res, 429, "Сегодняшняя попытка уже использована", status);
    }

    const dealt = dealDailyPokerHand();
    const cards = dealt.holeCards.concat(dealt.boardCards);
    const evaluated = evaluateSevenCardHand(cards);
    const reward = rewardForHandRank(evaluated.rank, currentState);
    const nowIso = new Date().toISOString();
    const nowMs = Date.parse(nowIso);
    const gameId = gameIdFromNow(nowMs);
    const ticketId = reward.ticketAmount > 0 ? ticketIdFromNow(nowMs) : null;
    const nextState = applyAttemptToState(currentState, attemptType, reward, nowIso);

    let bonusBalance = await getBonusBalance(accountId);
    const commands = [];

    if (reward.bonusAmount > 0) {
      bonusLock = await acquireRedisLock(BONUS_BALANCE_LOCK_PREFIX + accountId, 10);
      if (!bonusLock) {
        await redisPipeline([["DEL", idemRedisKey]]);
        return apiError(res, 409, "Бонусный баланс обновляется. Попробуйте ещё раз.");
      }
      bonusBalance = await getBonusBalance(accountId);
      const ledger = buildBonusLedgerEntry({
        userId: accountId,
        amount: reward.bonusAmount,
        direction: "credit",
        operationType: "promo_reward",
        balanceBefore: bonusBalance,
        source: "daily_poker_flush",
        sourceId: gameId,
        comment: "Флеш в игре Раздача дня",
        createdAt: nowIso,
      });
      bonusBalance = ledger.balance_after;
      commands.push(...bonusLedgerWriteCommands(ledger));
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
      extra_attempt_granted: reward.grantsExtraAttempt === true,
      created_at: nowIso,
    };

    commands.push(
      ["SET", stateKey(accountId, meta.gameDate), JSON.stringify(nextState)],
      ["SET", DAILY_POKER_GAME_PREFIX + gameId, JSON.stringify(game)],
      ["LPUSH", DAILY_POKER_GAMES_USER_PREFIX + accountId, gameId],
      ["LTRIM", DAILY_POKER_GAMES_USER_PREFIX + accountId, "0", "499"],
      ["LPUSH", DAILY_POKER_GAMES_DATE_PREFIX + accountId + ":" + meta.gameDate, gameId],
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

    const statePayload = publicStatePayload(nextState, meta, bonusBalance);
    const responsePayload = Object.assign({
      success: true,
      holeCards: dealt.holeCards,
      boardCards: dealt.boardCards,
      handRank: evaluated.rank,
      handName: evaluated.name,
      reward: Object.assign({}, reward, { message: prizeTextForHand(evaluated.rank, reward) }),
      bonusBalance,
      attemptsLeft: getAttemptsLeft(nextState),
      nextFreeAttemptAt: meta.nextFreeAttemptAt,
      serverTime: meta.serverTime,
    }, {
      canPlay: statePayload.canPlay,
      baseAttemptUsedToday: statePayload.baseAttemptUsedToday,
      extraAttemptGrantedToday: statePayload.extraAttemptGrantedToday,
      extraAttemptUsedToday: statePayload.extraAttemptUsedToday,
    });

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
};
