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
  getBonusDebitOperations,
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
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const BONUS_ISSUE_REVIEWS_KEY = "poker_app:bonus_issue_reviews";

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

function tournamentBuyinAmount(value) {
  const amount = Number(String(value || "").replace(/[^\d]/g, ""));
  return Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
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
    tournamentId: entry.tournament_id || "",
    tournamentTitle: entry.tournament_title || "",
    tournamentTime: entry.tournament_time || "",
    tournamentBuyin: entry.tournament_buyin || "",
    createdAt: entry.created_at,
  };
}

function bonusBusinessDateKey(value) {
  const ms = Date.parse(String(value || ""));
  return Number.isFinite(ms) ? new Date(ms - 3 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";
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

function rowSearchText(row) {
  return [row.userId, row.chatUserId, row.username, row.nickname, row.email, row.phone]
    .map((value) => normalizeSearch(value))
    .join(" ");
}

function mostUsefulRow(rows) {
  return rows.slice().sort((a, b) =>
    b.bonusBalance - a.bonusBalance ||
    b.dailyPokerGamesPlayed - a.dailyPokerGamesPlayed ||
    b.ticketsWon - a.ticketsWon ||
    String(b.lastGameAt || "").localeCompare(String(a.lastGameAt || "")) ||
    a.userId.localeCompare(b.userId)
  )[0];
}

function consolidateLinkedBonusUsers(users) {
  const standalone = [];
  const linked = new Map();

  users.forEach((row) => {
    const chatUserId = String(row.chatUserId || "").trim();
    if (!chatUserId) {
      standalone.push(row);
      return;
    }
    if (!linked.has(chatUserId)) linked.set(chatUserId, []);
    linked.get(chatUserId).push(row);
  });

  linked.forEach((rows) => {
    if (rows.length === 1) {
      standalone.push(rows[0]);
      return;
    }

    const positive = rows.filter((row) => row.bonusBalance > 0);
    const visible = positive.length ? positive : [mostUsefulRow(rows)];
    const primary = mostUsefulRow(visible);
    const hidden = rows.filter((row) => visible.indexOf(row) === -1);
    const aliases = rows.map(rowSearchText).join(" ");

    visible.forEach((row) => {
      const merged = Object.assign({}, row, { searchAliases: aliases });
      if (row === primary) {
        merged.dailyPokerGamesPlayed += hidden.reduce((sum, item) => sum + item.dailyPokerGamesPlayed, 0);
        merged.ticketsWon += hidden.reduce((sum, item) => sum + item.ticketsWon, 0);
        merged.lastGameAt = rows.reduce((latest, item) =>
          String(item.lastGameAt || "") > String(latest || "") ? item.lastGameAt : latest,
        merged.lastGameAt);
        merged.linkedAccountCount = rows.length;
        merged.historyUserIds = [row].concat(hidden).map((item) => item.userId);
      }
      standalone.push(merged);
    });
  });

  return standalone;
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

  users = consolidateLinkedBonusUsers(users);

  if (search) {
    users = users.filter((row) => {
      const hay = [
        row.userId,
        row.chatUserId,
        row.username,
        row.nickname,
        row.email,
        row.phone,
        row.searchAliases,
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
    delete row.searchAliases;
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
  const requestedIds = String(req.query.relatedUserIds || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 100);
  const accountIds = [accountId];
  for (const requestedId of requestedIds) {
    const resolved = await resolveTargetAccountId(requestedId);
    if (resolved && accountIds.indexOf(resolved) === -1) accountIds.push(resolved);
  }
  const operationGroups = await Promise.all(accountIds.map((id) => getBonusOperations(id, limit)));
  const seen = new Set();
  const operations = operationGroups
    .flat()
    .filter((entry) => {
      if (!entry || seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    })
    .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")))
    .slice(0, limit)
    .map(publicLedgerEntry);
  return res.status(200).json({ ok: true, userId: accountId, userIds: accountIds, operations });
}

async function handleBonusIssues(req, res) {
  const limit = Math.max(1, Math.min(5000, parseInt(req.query.limit || "1500", 10) || 1500));
  const entries = (await getBonusDebitOperations(limit))
    .filter((entry) => String(entry?.operation_type || '') === 'admin_debit');
  const userIds = Array.from(new Set(entries.map((entry) => String(entry.user_id || "")).filter(Boolean)));
  let idToUser = {};
  let displayNames = {};
  let usernames = {};
  let poker21Ids = {};
  let reviews = {};
  if (entries.length) {
    const reviewRows = await redisPipeline([
      ["HMGET", BONUS_ISSUE_REVIEWS_KEY, ...entries.map((entry) => String(entry.id || ""))],
    ], { allowLargeRedisRead: true, context: "admin.bonus-issues.reviews" });
    const values = reviewRows && reviewRows[0] && Array.isArray(reviewRows[0].result) ? reviewRows[0].result : [];
    entries.forEach((entry, index) => {
      try {
        reviews[String(entry.id || "")] = values[index] ? JSON.parse(String(values[index])) : null;
      } catch (e) {
        reviews[String(entry.id || "")] = null;
      }
    });
  }
  if (userIds.length) {
    const accountRows = await redisPipeline([
      ["HMGET", ID_TO_USER_KEY, ...userIds],
      ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...userIds],
      ["HMGET", POKERPLUS_BIND_HASH_KEY, ...userIds],
    ], { allowLargeRedisRead: true, context: "admin.bonus-issues.accounts" });
    const chatIds = accountRows && accountRows[0] && Array.isArray(accountRows[0].result)
      ? accountRows[0].result.map((value) => String(value || ""))
      : [];
    userIds.forEach((id, index) => {
      idToUser[id] = chatIds[index] || "";
      const directNames = accountRows && accountRows[1] && Array.isArray(accountRows[1].result) ? accountRows[1].result : [];
      displayNames[id] = String(directNames[index] || "");
      const directPoker21Ids = accountRows && accountRows[2] && Array.isArray(accountRows[2].result) ? accountRows[2].result : [];
      poker21Ids[id] = String(directPoker21Ids[index] || "");
    });
    const uniqueChatIds = Array.from(new Set(chatIds.filter(Boolean)));
    if (uniqueChatIds.length) {
      const profileRows = await redisPipeline([
        ["HMGET", USERNAMES_KEY, ...uniqueChatIds],
        ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...uniqueChatIds],
        ["HMGET", POKERPLUS_BIND_HASH_KEY, ...uniqueChatIds],
      ], { allowLargeRedisRead: true, context: "admin.bonus-issues.profiles" });
      uniqueChatIds.forEach((id, index) => {
        usernames[id] = String(profileRows && profileRows[0] && profileRows[0].result && profileRows[0].result[index] || "").replace(/^@+/, "");
        displayNames[id] = String(profileRows && profileRows[1] && profileRows[1].result && profileRows[1].result[index] || "");
        poker21Ids[id] = String(profileRows && profileRows[2] && profileRows[2].result && profileRows[2].result[index] || "");
      });
    }
  }
  const operations = entries.map((entry) => {
    const row = publicLedgerEntry(entry);
    const chatId = idToUser[row.userId] || "";
    row.businessDate = bonusBusinessDateKey(row.createdAt);
    row.displayName = displayNames[row.userId] || displayNames[chatId] || (usernames[chatId] ? "@" + usernames[chatId] : row.userId);
    row.username = usernames[chatId] || "";
    row.poker21Id = poker21Ids[row.userId] || poker21Ids[chatId] || "";
    const review = reviews[row.id];
    row.reviewVerified = !!(review && review.verifiedAt);
    row.reviewVerifiedAt = review && review.verifiedAt || "";
    row.reviewVerifiedBy = review && review.adminId || "";
    row.reviewStatus = review && review.status || "";
    row.reviewAmount = Number(review && review.amount) || 0;
    return row;
  });
  return res.status(200).json({ ok: true, operations });
}

async function handleBonusIssueReview(req, res, body, auth, operationId) {
  const id = String(operationId || "").trim();
  if (!id) return apiError(res, 400, "Операция не указана");
  const status = String(body && body.status || "").trim().toLowerCase();
  if (status !== "minus" && status !== "plus") return apiError(res, 400, "Выберите результат проверки");
  const amount = status === "plus" ? Number(body && body.amount) : 0;
  if (status === "plus" && (!Number.isFinite(amount) || amount <= 0)) {
    return apiError(res, 400, "Укажите сумму снятия");
  }
  const entries = await getBonusDebitOperations(5000);
  const entry = entries.find((item) =>
    String(item && item.id || "") === id &&
    String(item && item.operation_type || "") === "admin_debit"
  );
  if (!entry) return apiError(res, 404, "Списание не найдено");
  const review = {
    verifiedAt: new Date().toISOString(),
    adminId: String(auth.memberId || ""),
    status,
    amount: status === "plus" ? Math.round(amount * 100) / 100 : 0,
  };
  const result = await redisPipeline([
    ["HSET", BONUS_ISSUE_REVIEWS_KEY, id, JSON.stringify(review)],
  ], { context: "admin.bonus-issues.review" });
  if (!result) return apiError(res, 503, "Не удалось сохранить проверку");
  await logAdminAction({
    action: status === "plus" ? "bonus_issue_removed" : "bonus_issue_not_removed",
    admin_id: auth.memberId,
    ledger_id: id,
    user_id: String(entry.user_id || ""),
    amount: Number(entry.amount || 0),
    removed_amount: review.amount,
  });
  return res.status(200).json({ ok: true, operationId: id, review });
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
  const tournament = body.tournament && typeof body.tournament === "object" ? body.tournament : {};
  const tournamentId = String(tournament.id || body.tournamentId || "").trim();
  const tournamentTitle = String(tournament.title || body.tournamentTitle || "").trim();
  const tournamentTime = String(tournament.time || body.tournamentTime || "").trim();
  const tournamentBuyin = String(tournament.buyin || body.tournamentBuyin || "").trim();
  if (direction === "debit" && (!tournamentId || !tournamentTitle)) {
    return apiError(res, 400, "Выберите турнир из расписания");
  }
  if (direction === "debit") {
    const expectedAmount = tournamentBuyinAmount(tournamentBuyin);
    if (expectedAmount <= 0) {
      return apiError(res, 400, "Для бесплатного турнира списание не требуется");
    }
    if (amount !== expectedAmount) {
      return apiError(res, 400, "Сумма списания должна совпадать с бай-ином турнира");
    }
  }
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
      tournamentId,
      tournamentTitle,
      tournamentTime,
      tournamentBuyin,
    });
    await logAdminAction({
      action: operationType,
      admin_id: auth.memberId,
      user_id: accountId,
      amount,
      comment,
      tournament_id: tournamentId,
      tournament_title: tournamentTitle,
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
  if (req.method === "GET" && tail[0] === "bonus-issues") return handleBonusIssues(req, res);
  if (req.method === "POST" && tail[0] === "bonus-issues" && tail[2] === "verify") return handleBonusIssueReview(req, res, body, auth, tail[1]);
  if (req.method === "GET" && tail[0] === "users" && tail[2] === "bonus-ledger") return handleUserLedger(req, res, tail[1]);
  if (req.method === "POST" && tail[0] === "users" && tail[2] === "bonus-credit") return handleManualBonus(req, res, body, auth, tail[1], "credit");
  if (req.method === "POST" && tail[0] === "users" && tail[2] === "bonus-debit") return handleManualBonus(req, res, body, auth, tail[1], "debit");

  return apiError(res, 404, "Not found");
};
