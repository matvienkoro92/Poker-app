"use strict";

const { resolveAccountId, ID_TO_USER_KEY, DT_IDS_KEY } = require("../account-id");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { isBonusAdminIdentity } = require("../bonus-admin-access");
const { EMAIL_ORIGINALS_KEY } = require("../email-auth");
const { pipeline: redisPipeline, hashPairsToObject, isConfigured: redisConfigured } = require("../redis");
const {
  BONUS_BALANCES_KEY,
  BONUS_USERS_KEY,
  addBonusOperation,
  getBonusLedgerTotals,
  getBonusOperations,
  parsePositiveAmount,
} = require("../bonus-ledger");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const DAILY_POKER_USERS_KEY = "poker_app:daily_poker_users";
const DAILY_POKER_PLAYED_COUNT_KEY = "poker_app:daily_poker_played_count";
const DAILY_POKER_TICKET_COUNT_KEY = "poker_app:daily_poker_ticket_count";
const DAILY_POKER_LAST_GAME_AT_KEY = "poker_app:daily_poker_last_game_at";
const ADMIN_ACTION_LOG_KEY = "poker_app:admin_action_log";

function apiError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

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

function intValue(value) {
  return parseInt(value || "0", 10) || 0;
}

function mapObject(raw) {
  return hashPairsToObject(raw);
}

function publicLedgerEntry(entry) {
  return {
    id: entry.id,
    userId: entry.user_id,
    amount: entry.amount,
    direction: entry.direction,
    operationType: entry.operation_type,
    balanceBefore: entry.balance_before,
    balanceAfter: entry.balance_after,
    source: entry.source,
    sourceId: entry.source_id,
    adminId: entry.admin_id || null,
    comment: entry.comment || "",
    createdAt: entry.created_at,
  };
}

function normalizeSearch(value) {
  return String(value || "").trim().replace(/^@+/, "").toLowerCase();
}

async function resolveTargetAccountId(raw) {
  const id = decodeURIComponent(String(raw || "")).trim();
  if (!id) return "";
  if (/^ID\d{6}$/.test(id)) return id;
  const resolved = await resolveAccountId(id);
  return resolved || "";
}

async function logAdminAction(action) {
  try {
    await redisPipeline([
      ["LPUSH", ADMIN_ACTION_LOG_KEY, JSON.stringify(Object.assign({ created_at: new Date().toISOString() }, action || {}))],
      ["LTRIM", ADMIN_ACTION_LOG_KEY, "0", "1999"],
    ]);
  } catch (e) {}
}

function nicknameForUser(row) {
  if (row.nickname) return row.nickname;
  if (row.username) return "@" + row.username;
  return row.userId;
}

async function handleBonusBalances(req, res) {
  const [rows, bonusTotals] = await Promise.all([
    redisPipeline([
      ["SMEMBERS", BONUS_USERS_KEY],
      ["SMEMBERS", DAILY_POKER_USERS_KEY],
      ["HGETALL", BONUS_BALANCES_KEY],
      ["HGETALL", DAILY_POKER_PLAYED_COUNT_KEY],
      ["HGETALL", DAILY_POKER_TICKET_COUNT_KEY],
      ["HGETALL", DAILY_POKER_LAST_GAME_AT_KEY],
      ["HGETALL", USERNAMES_KEY],
      ["HGETALL", CHAT_DISPLAY_NAMES_KEY],
      ["HGETALL", EMAIL_ORIGINALS_KEY],
      ["HGETALL", ID_TO_USER_KEY],
      ["HGETALL", DT_IDS_KEY],
    ]),
    getBonusLedgerTotals(5000),
  ]);
  if (!rows) return apiError(res, 500, "Redis error");

  const bonusUsers = new Set(Array.isArray(rows[0].result) ? rows[0].result.map(String) : []);
  const pokerUsers = new Set(Array.isArray(rows[1].result) ? rows[1].result.map(String) : []);
  const balances = mapObject(rows[2].result);
  const played = mapObject(rows[3].result);
  const tickets = mapObject(rows[4].result);
  const lastGame = mapObject(rows[5].result);
  const usernames = mapObject(rows[6].result);
  const displayNames = mapObject(rows[7].result);
  const emails = mapObject(rows[8].result);
  const idToUser = mapObject(rows[9].result);
  const dtIds = mapObject(rows[10].result);

  const reverseDt = {};
  Object.keys(dtIds).forEach((memberId) => {
    const dt = String(dtIds[memberId] || "").trim();
    if (dt && !reverseDt[dt]) reverseDt[dt] = memberId;
  });

  const search = normalizeSearch(req.query.search);
  const ids = new Set();
  Object.keys(balances).forEach((id) => ids.add(id));
  Object.keys(played).forEach((id) => ids.add(id));
  Object.keys(tickets).forEach((id) => ids.add(id));
  bonusUsers.forEach((id) => ids.add(id));
  pokerUsers.forEach((id) => ids.add(id));

  if (search) {
    Object.keys(idToUser).forEach((dtId) => {
      const memberId = String(idToUser[dtId] || "");
      const username = String(usernames[memberId] || "").toLowerCase();
      const display = String(displayNames[dtId] || displayNames[memberId] || "").toLowerCase();
      const email = String(emails[dtId] || "").toLowerCase();
      if (
        normalizeSearch(dtId).indexOf(search) !== -1 ||
        normalizeSearch(memberId).indexOf(search) !== -1 ||
        username.indexOf(search) !== -1 ||
        display.indexOf(search) !== -1 ||
        email.indexOf(search) !== -1
      ) {
        ids.add(dtId);
      }
    });
  }

  const minBalance = req.query.minBalance != null && req.query.minBalance !== "" ? Number(req.query.minBalance) : null;
  const maxBalance = req.query.maxBalance != null && req.query.maxBalance !== "" ? Number(req.query.maxBalance) : null;

  let users = Array.from(ids).filter(Boolean).map((userId) => {
    const chatUserId = idToUser[userId] || reverseDt[userId] || "";
    const username = chatUserId && usernames[chatUserId] ? String(usernames[chatUserId]).replace(/^@+/, "").trim() : "";
    const nickname = String(displayNames[userId] || (chatUserId ? displayNames[chatUserId] : "") || "").trim();
    return {
      userId,
      chatUserId: chatUserId || null,
      username: username || null,
      nickname: nickname || null,
      email: emails[userId] || null,
      phone: null,
      bonusBalance: intValue(balances[userId]),
      dailyPokerGamesPlayed: intValue(played[userId]),
      ticketsWon: intValue(tickets[userId]),
      lastGameAt: lastGame[userId] || null,
    };
  });

  if (search) {
    users = users.filter((row) => {
      const hay = [
        row.userId,
        row.chatUserId,
        row.username,
        row.nickname,
        row.email,
        row.phone,
      ].map((x) => normalizeSearch(x)).join(" ");
      return hay.indexOf(search) !== -1;
    });
  }
  if (Number.isFinite(minBalance)) users = users.filter((row) => row.bonusBalance >= minBalance);
  if (Number.isFinite(maxBalance)) users = users.filter((row) => row.bonusBalance <= maxBalance);

  const sortBy = String(req.query.sortBy || "bonus_balance_desc");
  users.sort((a, b) => {
    if (sortBy === "bonus_balance_asc") return a.bonusBalance - b.bonusBalance || a.userId.localeCompare(b.userId);
    if (sortBy === "games_desc") return b.dailyPokerGamesPlayed - a.dailyPokerGamesPlayed || a.userId.localeCompare(b.userId);
    if (sortBy === "tickets_desc") return b.ticketsWon - a.ticketsWon || a.userId.localeCompare(b.userId);
    if (sortBy === "last_game_desc") return String(b.lastGameAt || "").localeCompare(String(a.lastGameAt || "")) || a.userId.localeCompare(b.userId);
    if (sortBy === "user_id") return a.userId.localeCompare(b.userId);
    return b.bonusBalance - a.bonusBalance || String(b.lastGameAt || "").localeCompare(String(a.lastGameAt || ""));
  });

  const page = Math.max(1, parseInt(req.query.page || "1", 10) || 1);
  const limit = Math.max(1, Math.min(500, parseInt(req.query.limit || "25", 10) || 25));
  const total = users.length;
  const paged = users.slice((page - 1) * limit, (page - 1) * limit + limit);
  paged.forEach((row) => {
    row.displayName = nicknameForUser(row);
  });

  return res.status(200).json({
    ok: true,
    isAdmin: true,
    users: paged,
    total,
    page,
    limit,
    bonusTotals,
  });
}

async function handleUserLedger(req, res, userId) {
  const accountId = await resolveTargetAccountId(userId);
  if (!accountId) return apiError(res, 404, "Пользователь не найден");
  const limit = Math.max(1, Math.min(200, parseInt(req.query.limit || "50", 10) || 50));
  const operations = (await getBonusOperations(accountId, limit)).map(publicLedgerEntry);
  return res.status(200).json({ ok: true, userId: accountId, operations });
}

async function handleManualBonus(req, res, body, auth, targetUserId, direction) {
  const accountId = await resolveTargetAccountId(targetUserId);
  if (!accountId) return apiError(res, 404, "Пользователь не найден");
  let amount;
  try {
    amount = parsePositiveAmount(body.amount);
  } catch (e) {
    return apiError(res, e.status || 400, "Сумма должна быть больше 0");
  }
  const comment = String(body.comment || "").trim();
  const operationType = direction === "debit" ? "admin_debit" : "admin_credit";
  try {
    const result = await addBonusOperation({
      userId: accountId,
      amount,
      direction,
      operationType,
      source: "admin_manual",
      sourceId: auth.memberId,
      adminId: auth.memberId,
      comment,
    });
    await logAdminAction({
      action: operationType,
      admin_id: auth.memberId,
      user_id: accountId,
      amount,
      comment,
      ledger_id: result.entry.id,
    });
    return res.status(200).json({
      ok: true,
      userId: accountId,
      bonusBalance: result.bonusBalance,
      operation: publicLedgerEntry(result.entry),
    });
  } catch (e) {
    if (e && e.message === "insufficient_bonus_balance") return apiError(res, 400, "Нельзя списать больше текущего баланса");
    return apiError(res, (e && e.status) || 500, "Операция не выполнена");
  }
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  let body = {};
  if (req.method === "POST") {
    try {
      body = parseBody(req);
    } catch (e) {
      return apiError(res, 400, "Invalid JSON");
    }
  }

  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 403, auth.error || "Auth required");
  if (!isBonusAdminIdentity(auth.identity, auth.memberId)) return apiError(res, 403, "Bonus admin only");

  const segments = routeSegments(req);
  const adminIndex = segments.indexOf("admin");
  let tail = adminIndex >= 0 ? segments.slice(adminIndex + 1) : segments.slice(1);
  if (!tail.length) tail = queryPathSegments(req);

  if (req.method === "GET" && tail[0] === "bonus-balances") return handleBonusBalances(req, res);
  if (req.method === "GET" && tail[0] === "users" && tail[2] === "bonus-ledger") return handleUserLedger(req, res, tail[1]);
  if (req.method === "POST" && tail[0] === "users" && tail[2] === "bonus-credit") return handleManualBonus(req, res, body, auth, tail[1], "credit");
  if (req.method === "POST" && tail[0] === "users" && tail[2] === "bonus-debit") return handleManualBonus(req, res, body, auth, tail[1], "debit");

  return apiError(res, 404, "Not found");
};
