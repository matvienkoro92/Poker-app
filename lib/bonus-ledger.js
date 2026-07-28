"use strict";

const crypto = require("crypto");
const { pipeline: redisPipeline } = require("./redis");

const BONUS_BALANCES_KEY = "poker_app:bonus_balances";
const BONUS_USERS_KEY = "poker_app:bonus_users";
const BONUS_NONZERO_USERS_KEY = "poker_app:bonus_nonzero_users";
const BONUS_TOTAL_BALANCE_KEY = "poker_app:bonus_total_balance";
const BONUS_LEDGER_ENTRY_PREFIX = "poker_app:bonus_ledger:";
const BONUS_LEDGER_USER_PREFIX = "poker_app:bonus_ledger_user:";
const BONUS_LEDGER_ALL_KEY = "poker_app:bonus_ledger_all";
const BONUS_LEDGER_VERSION_KEY = "poker_app:bonus_ledger_version";
const BONUS_BALANCE_LOCK_PREFIX = "poker_app:bonus_balance_lock:";
const BONUS_ISSUE_REVIEWS_KEY = "poker_app:bonus_issue_reviews";
const BONUS_RANGE_SUMMARY_CACHE_TTL_MS = Math.max(5000, Number(process.env.BONUS_RANGE_SUMMARY_CACHE_TTL_MS) || 30000);
const bonusRangeSummaryCache = new Map();

function clearBonusRangeSummaryCache() {
  bonusRangeSummaryCache.clear();
}

async function ensureBonusBalanceIndexes() {
  const currentRows = await redisPipeline([["GET", BONUS_TOTAL_BALANCE_KEY]], {
    context: "bonus-ledger.balance-index-ready",
    timeoutMs: 2500,
  });
  if (currentRows && currentRows[0] && currentRows[0].result != null) return;
  const legacyRows = await redisPipeline([["HGETALL", BONUS_BALANCES_KEY]], {
    allowLargeRedisRead: true,
    context: "bonus-ledger.balance-index-backfill",
    timeoutMs: 4500,
  });
  const pairs = legacyRows && legacyRows[0] && Array.isArray(legacyRows[0].result) ? legacyRows[0].result : [];
  let total = 0;
  const nonzeroUsers = [];
  for (let index = 0; index < pairs.length - 1; index += 2) {
    const balance = Math.max(0, parseInt(pairs[index + 1] || "0", 10) || 0);
    total += balance;
    if (balance > 0) nonzeroUsers.push(String(pairs[index]));
  }
  const commands = [
    ["SET", BONUS_TOTAL_BALANCE_KEY, String(total), "NX"],
  ];
  if (nonzeroUsers.length) commands.push(["SADD", BONUS_NONZERO_USERS_KEY, ...nonzeroUsers]);
  await redisPipeline(commands, { context: "bonus-ledger.balance-index-backfill-write" });
}

const CREDIT_TYPES = new Set(["credit", "adjustment", "promo_reward", "promo_ticket", "admin_credit"]);
const DEBIT_TYPES = new Set(["debit", "admin_debit"]);
const OPERATION_TYPES = new Set(Array.from(CREDIT_TYPES).concat(Array.from(DEBIT_TYPES)));

function parsePositiveAmount(value) {
  const amount = Math.floor(Number(value));
  if (!Number.isFinite(amount) || amount <= 0) {
    const err = new Error("amount_must_be_positive");
    err.status = 400;
    throw err;
  }
  return amount;
}

function normalizeDirection(rawDirection, operationType) {
  const explicit = String(rawDirection || "").trim().toLowerCase();
  const op = String(operationType || "").trim();
  if (explicit === "credit" || explicit === "debit") return explicit;
  if (DEBIT_TYPES.has(op)) return "debit";
  return "credit";
}

function normalizeOperationType(raw) {
  const operationType = String(raw || "").trim();
  if (!OPERATION_TYPES.has(operationType)) {
    const err = new Error("invalid_operation_type");
    err.status = 400;
    throw err;
  }
  return operationType;
}

function makeLedgerId(nowMs) {
  return "bonus_" + String(nowMs || Date.now()) + "_" + crypto.randomBytes(6).toString("hex");
}

function sanitizeComment(value) {
  return String(value || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, 500);
}

function sanitizeLedgerText(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, Math.max(1, Number(maxLength) || 160));
}

function buildBonusLedgerEntry(input) {
  const data = input || {};
  const userId = String(data.userId || data.user_id || "").trim();
  if (!userId) {
    const err = new Error("user_id_required");
    err.status = 400;
    throw err;
  }
  const operationType = normalizeOperationType(data.operationType || data.operation_type);
  const direction = normalizeDirection(data.direction, operationType);
  const amount = parsePositiveAmount(data.amount);
  const balanceBefore = Math.max(0, parseInt(data.balanceBefore || data.balance_before || "0", 10) || 0);
  const balanceAfter = direction === "debit" ? balanceBefore - amount : balanceBefore + amount;
  if (balanceAfter < 0) {
    const err = new Error("insufficient_bonus_balance");
    err.status = 400;
    throw err;
  }
  const nowIso = data.createdAt || data.created_at || new Date().toISOString();
  const nowMs = Date.parse(nowIso);
  return {
    id: data.id || makeLedgerId(Number.isFinite(nowMs) ? nowMs : Date.now()),
    user_id: userId,
    amount,
    direction,
    operation_type: operationType,
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    source: String(data.source || "").trim().slice(0, 120),
    source_id: String(data.sourceId || data.source_id || "").trim().slice(0, 160),
    admin_id: data.adminId || data.admin_id ? String(data.adminId || data.admin_id).trim().slice(0, 160) : null,
    comment: sanitizeComment(data.comment),
    tournament_id: sanitizeLedgerText(data.tournamentId || data.tournament_id, 160),
    tournament_title: sanitizeLedgerText(data.tournamentTitle || data.tournament_title, 240),
    tournament_time: sanitizeLedgerText(data.tournamentTime || data.tournament_time, 40),
    tournament_buyin: sanitizeLedgerText(data.tournamentBuyin || data.tournament_buyin, 80),
    created_at: nowIso,
  };
}

function bonusLedgerWriteCommands(entry) {
  const e = entry || {};
  if (!e.id || !e.user_id) throw new Error("invalid_bonus_ledger_entry");
  const raw = JSON.stringify(e);
  const balanceDelta = Number(e.balance_after) - Number(e.balance_before);
  const commands = [
    ["HSET", BONUS_BALANCES_KEY, e.user_id, String(e.balance_after)],
    ["SADD", BONUS_USERS_KEY, e.user_id],
    ["INCRBY", BONUS_TOTAL_BALANCE_KEY, String(balanceDelta)],
    ["SET", BONUS_LEDGER_ENTRY_PREFIX + e.id, raw],
    ["LPUSH", BONUS_LEDGER_USER_PREFIX + e.user_id, e.id],
    ["LTRIM", BONUS_LEDGER_USER_PREFIX + e.user_id, "0", "499"],
    ["LPUSH", BONUS_LEDGER_ALL_KEY, e.id],
    ["LTRIM", BONUS_LEDGER_ALL_KEY, "0", "4999"],
    ["INCR", BONUS_LEDGER_VERSION_KEY],
  ];
  commands.splice(3, 0, Number(e.balance_after) > 0
    ? ["SADD", BONUS_NONZERO_USERS_KEY, e.user_id]
    : ["SREM", BONUS_NONZERO_USERS_KEY, e.user_id]);
  return commands;
}

function redisRowsOk(rows) {
  return !!(rows && Array.isArray(rows) && rows.every((row) => !row || !row.error));
}

async function acquireRedisLock(key, ttlSec) {
  const value = crypto.randomBytes(10).toString("hex");
  const rows = await redisPipeline([["SET", key, value, "NX", "EX", String(Math.max(1, Number(ttlSec) || 10))]]);
  const result = rows && rows[0] ? rows[0].result : null;
  const ok = result === "OK" || result === true || String(result || "").toUpperCase() === "OK";
  return ok ? { key, value } : null;
}

async function releaseRedisLock(lock) {
  if (!lock || !lock.key) return;
  try {
    await redisPipeline([["DEL", lock.key]]);
  } catch (e) {}
}

async function getBonusBalance(userId) {
  const id = String(userId || "").trim();
  if (!id) return 0;
  const rows = await redisPipeline([["HGET", BONUS_BALANCES_KEY, id]]);
  const raw = rows && rows[0] ? rows[0].result : null;
  return Math.max(0, parseInt(raw || "0", 10) || 0);
}

function parseLedgerEntry(raw) {
  if (!raw) return null;
  try {
    const e = JSON.parse(String(raw));
    if (!e || !e.id) return null;
    return e;
  } catch (error) {
    return null;
  }
}

async function getBonusOperations(userId, limit) {
  const id = String(userId || "").trim();
  if (!id) return [];
  const safeLimit = Math.max(1, Math.min(200, parseInt(limit || "25", 10) || 25));
  const idsRows = await redisPipeline([["LRANGE", BONUS_LEDGER_USER_PREFIX + id, "0", String(safeLimit - 1)]]);
  const ids = idsRows && idsRows[0] && Array.isArray(idsRows[0].result) ? idsRows[0].result.map(String).filter(Boolean) : [];
  if (!ids.length) return [];
  const rows = await redisPipeline(ids.map((ledgerId) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + ledgerId]));
  return (rows || []).map((row) => parseLedgerEntry(row && row.result)).filter(Boolean);
}

async function getBonusLedgerTotals(limit) {
  const safeLimit = Math.max(1, Math.min(5000, parseInt(limit || "5000", 10) || 5000));
  const idsRows = await redisPipeline([["LRANGE", BONUS_LEDGER_ALL_KEY, "0", String(safeLimit - 1)]], {
    allowLargeRedisRead: safeLimit > 2000,
    context: "bonus-ledger.totals.ids",
    timeoutMs: 4500,
  });
  const ids = idsRows && idsRows[0] && Array.isArray(idsRows[0].result) ? idsRows[0].result.map(String).filter(Boolean) : [];
  const totals = {
    totalCredited: 0,
    totalDebited: 0,
    creditCount: 0,
    debitCount: 0,
    operationsCount: 0,
  };
  if (!ids.length) return totals;
  const rows = await redisPipeline(ids.map((ledgerId) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + ledgerId]), {
    allowLargeRedisRead: ids.length > 500,
    context: "bonus-ledger.totals.entries",
    timeoutMs: 4500,
  });
  (rows || []).forEach((row) => {
    const entry = parseLedgerEntry(row && row.result);
    if (!entry) return;
    const amount = Math.max(0, parseInt(entry.amount || "0", 10) || 0);
    if (!amount) return;
    totals.operationsCount += 1;
    if (entry.direction === "debit") {
      totals.totalDebited += amount;
      totals.debitCount += 1;
    } else {
      totals.totalCredited += amount;
      totals.creditCount += 1;
    }
  });
  return totals;
}

async function getBonusDebitOperations(limit) {
  const safeLimit = Math.max(1, Math.min(5000, parseInt(limit || "1000", 10) || 1000));
  const idsRows = await redisPipeline([["LRANGE", BONUS_LEDGER_ALL_KEY, "0", String(safeLimit - 1)]], {
    allowLargeRedisRead: safeLimit > 2000,
    context: "bonus-ledger.debit-operations.ids",
    timeoutMs: 4500,
  });
  const ids = idsRows && idsRows[0] && Array.isArray(idsRows[0].result)
    ? idsRows[0].result.map(String).filter(Boolean)
    : [];
  if (!ids.length) return [];
  const rows = await redisPipeline(ids.map((ledgerId) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + ledgerId]), {
    allowLargeRedisRead: ids.length > 500,
    maxRedisReadCommands: Math.max(220, ids.length + 5),
    context: "bonus-ledger.debit-operations.entries",
    timeoutMs: 4500,
  });
  return (rows || [])
    .map((row) => parseLedgerEntry(row && row.result))
    .filter((entry) => entry && entry.direction === "debit")
    .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
}

async function getBonusDebitOperationsPage(cursor, limit) {
  const safeCursor = Math.max(0, parseInt(cursor || "0", 10) || 0);
  const safeLimit = Math.max(1, Math.min(200, parseInt(limit || "75", 10) || 75));
  const scanChunk = Math.max(100, Math.min(500, safeLimit * 3));
  const operations = [];
  let offset = safeCursor;
  let exhausted = false;

  while (operations.length < safeLimit && !exhausted) {
    const idsRows = await redisPipeline([
      ["LRANGE", BONUS_LEDGER_ALL_KEY, String(offset), String(offset + scanChunk - 1)],
    ], {
      context: "bonus-ledger.debit-page.ids",
      timeoutMs: 4500,
    });
    const ids = idsRows && idsRows[0] && Array.isArray(idsRows[0].result)
      ? idsRows[0].result.map(String).filter(Boolean)
      : [];
    if (!ids.length) {
      exhausted = true;
      break;
    }
    const chunkStart = offset;
    offset += ids.length;
    exhausted = ids.length < scanChunk;
    const rows = await redisPipeline(ids.map((ledgerId) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + ledgerId]), {
      maxRedisReadCommands: Math.max(220, ids.length + 5),
      context: "bonus-ledger.debit-page.entries",
      timeoutMs: 4500,
    });
    for (let index = 0; index < (rows || []).length; index += 1) {
      const row = rows[index];
      const entry = parseLedgerEntry(row && row.result);
      if (!entry || entry.direction !== "debit" || String(entry.operation_type || "") !== "admin_debit") continue;
      operations.push(entry);
      if (operations.length >= safeLimit) {
        offset = chunkStart + index + 1;
        exhausted = false;
        break;
      }
    }
  }

  return {
    operations,
    nextCursor: exhausted ? null : String(offset),
    hasMore: !exhausted,
  };
}

function bonusLedgerDateKey(value, timeZone) {
  const date = new Date(value || "");
  if (!Number.isFinite(date.getTime()) || !timeZone) return String(value || "").slice(0, 10);
  try {
    const businessDate = new Date(date.getTime() - 6 * 60 * 60 * 1000);
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(businessDate);
    const map = {};
    parts.forEach((part) => { if (part.type !== "literal") map[part.type] = part.value; });
    return map.year + "-" + map.month + "-" + map.day;
  } catch (e) {
    return String(value || "").slice(0, 10);
  }
}

async function buildBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone) {
  const safeLimit = Math.max(1, Math.min(5000, parseInt(limit || "5000", 10) || 5000));
  const baseRows = await redisPipeline([
    ["LRANGE", BONUS_LEDGER_ALL_KEY, "0", String(safeLimit - 1)],
    ["GET", BONUS_TOTAL_BALANCE_KEY],
  ], {
    allowLargeRedisRead: safeLimit > 2000,
    context: "bonus-ledger.daily-debits.ids",
    timeoutMs: 4500,
  });
  const ids = baseRows && baseRows[0] && Array.isArray(baseRows[0].result) ? baseRows[0].result.map(String).filter(Boolean) : [];
  let currentBalance = Math.max(0, parseInt(baseRows && baseRows[1] && baseRows[1].result || "0", 10) || 0);
  if (!(baseRows && baseRows[1] && baseRows[1].result != null)) {
    const legacyRows = await redisPipeline([["HGETALL", BONUS_BALANCES_KEY]], {
      allowLargeRedisRead: true,
      context: "bonus-ledger.total-balance-backfill",
      timeoutMs: 4500,
    });
    const balancePairs = legacyRows && legacyRows[0] && Array.isArray(legacyRows[0].result) ? legacyRows[0].result : [];
    const nonzeroUsers = [];
    for (let i = 0; i < balancePairs.length - 1; i += 2) {
      const balance = Math.max(0, parseInt(balancePairs[i + 1] || "0", 10) || 0);
      currentBalance += balance;
      if (balance > 0) nonzeroUsers.push(String(balancePairs[i]));
    }
    const backfillCommands = [
      ["SET", BONUS_TOTAL_BALANCE_KEY, String(currentBalance)],
    ];
    if (nonzeroUsers.length) backfillCommands.push(["SADD", BONUS_NONZERO_USERS_KEY, ...nonzeroUsers]);
    await redisPipeline(backfillCommands, { context: "bonus-ledger.total-balance-backfill-write" });
  }
  const from = String(rangeFrom || "").slice(0, 10);
  const to = String(rangeTo || "").slice(0, 10);
  const hasRange = /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to) && from <= to;
  if (!ids.length) return { dailyDebits: [], dailyReturns: [], returnEntries: [], currentBalance, balanceStart: currentBalance, balanceEnd: currentBalance, creditedDuringRange: 0, debitedDuringRange: 0, returnedDuringRange: 0 };
  const rows = await redisPipeline(ids.map((ledgerId) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + ledgerId]), {
    allowLargeRedisRead: ids.length > 500,
    maxRedisReadCommands: Math.max(220, ids.length + 5),
    context: "bonus-ledger.daily-debits.entries",
    timeoutMs: 4500,
  });
  const totals = {};
  let netDuringRange = 0;
  let netAfterRange = 0;
  let creditedDuringRange = 0;
  let debitedDuringRange = 0;
  const reviewCandidates = [];
  (rows || []).forEach((row) => {
    const entry = parseLedgerEntry(row && row.result);
    if (!entry) return;
    const date = bonusLedgerDateKey(entry.created_at, timeZone);
    const amount = Math.max(0, parseInt(entry.amount || "0", 10) || 0);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !amount) return;
    const delta = entry.direction === "debit" ? -amount : amount;
    if (hasRange && date >= from && date <= to) {
      netDuringRange += delta;
      if (entry.direction === "debit") debitedDuringRange += amount;
      else creditedDuringRange += amount;
    }
    if (hasRange && date > to) netAfterRange += delta;
    if (entry.direction !== "debit") return;
    const userId = String(entry.user_id || "").trim();
    if (!userId) return;
    const adminId = String(entry.admin_id || "").replace(/^tg_/, "").trim();
    const key = date + "\n" + userId + "\n" + adminId;
    if (!totals[key]) totals[key] = { date, userId, adminId, amount: 0 };
    totals[key].amount += amount;
    if (!hasRange || (date >= from && date <= to)) {
      reviewCandidates.push({
        id: String(entry.id || ""),
        date,
        userId,
        adminId,
        debitAmount: amount,
        tournamentTitle: String(entry.tournament_title || ""),
      });
    }
  });
  const reviewIds = reviewCandidates.map((entry) => entry.id).filter(Boolean);
  const reviewRows = reviewIds.length
    ? await redisPipeline([["HMGET", BONUS_ISSUE_REVIEWS_KEY, ...reviewIds]], {
        allowLargeRedisRead: reviewIds.length > 500,
        context: "bonus-ledger.daily-returns.reviews",
        timeoutMs: 4500,
      })
    : [];
  const reviewValues = reviewRows && reviewRows[0] && Array.isArray(reviewRows[0].result) ? reviewRows[0].result : [];
  const returnsByDate = {};
  const returnEntries = [];
  let returnedDuringRange = 0;
  reviewCandidates.forEach((candidate, index) => {
    let review = null;
    try { review = reviewValues[index] ? JSON.parse(String(reviewValues[index])) : null; } catch (e) {}
    if (!review || review.status !== "plus") return;
    const amount = Math.max(0, Number(review.amount) || 0);
    if (!amount) return;
    returnedDuringRange += amount;
    returnsByDate[candidate.date] = (returnsByDate[candidate.date] || 0) + amount;
    returnEntries.push({
      id: candidate.id,
      date: candidate.date,
      userId: candidate.userId,
      adminId: candidate.adminId,
      amount,
      debitAmount: candidate.debitAmount,
      tournamentTitle: candidate.tournamentTitle,
      verifiedAt: String(review.verifiedAt || ""),
      verifiedBy: String(review.adminId || ""),
    });
  });
  const balanceEnd = hasRange ? Math.max(0, currentBalance - netAfterRange) : currentBalance;
  return {
    dailyDebits: Object.keys(totals).map((key) => totals[key]).sort((a, b) => a.date.localeCompare(b.date) || a.userId.localeCompare(b.userId)),
    dailyReturns: Object.keys(returnsByDate).sort().map((date) => ({ date, amount: returnsByDate[date] })),
    returnEntries: returnEntries.sort((a, b) => String(b.verifiedAt || b.date).localeCompare(String(a.verifiedAt || a.date))),
    currentBalance,
    balanceStart: hasRange ? Math.max(0, balanceEnd - netDuringRange) : currentBalance,
    balanceEnd,
    creditedDuringRange,
    debitedDuringRange,
    returnedDuringRange,
  };
}

async function getBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone) {
  const versionRows = await redisPipeline([["GET", BONUS_LEDGER_VERSION_KEY]], {
    timeoutMs: 1600,
    context: "bonus-ledger.range-summary.version",
  });
  const ledgerVersion = versionRows && versionRows[0] && versionRows[0].result != null
    ? String(versionRows[0].result)
    : "0";
  const key = [ledgerVersion, limit || 5000, rangeFrom || "", rangeTo || "", timeZone || ""].join("\n");
  const now = Date.now();
  for (const [cacheKey, cached] of bonusRangeSummaryCache.entries()) {
    if (!cached || now - cached.at > BONUS_RANGE_SUMMARY_CACHE_TTL_MS) bonusRangeSummaryCache.delete(cacheKey);
  }
  const hit = bonusRangeSummaryCache.get(key);
  if (hit && now - hit.at <= BONUS_RANGE_SUMMARY_CACHE_TTL_MS) {
    return hit.promise ? await hit.promise : hit.value;
  }
  const entry = { at: now, promise: null, value: null };
  entry.promise = buildBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone)
    .then((value) => {
      entry.at = Date.now();
      entry.value = value;
      entry.promise = null;
      return value;
    })
    .catch((error) => {
      bonusRangeSummaryCache.delete(key);
      throw error;
    });
  bonusRangeSummaryCache.set(key, entry);
  while (bonusRangeSummaryCache.size > 24) {
    const oldestKey = bonusRangeSummaryCache.keys().next().value;
    if (!oldestKey) break;
    bonusRangeSummaryCache.delete(oldestKey);
  }
  return entry.promise;
}

async function getBonusLedgerDailyDebits(limit) {
  const summary = await getBonusLedgerRangeSummary(limit);
  return summary.dailyDebits;
}

async function addBonusOperation(input) {
  const data = input || {};
  const userId = String(data.userId || data.user_id || "").trim();
  if (!userId) {
    const err = new Error("user_id_required");
    err.status = 400;
    throw err;
  }
  const lock = await acquireRedisLock(BONUS_BALANCE_LOCK_PREFIX + userId, 10);
  if (!lock) {
    const err = new Error("bonus_balance_locked");
    err.status = 409;
    throw err;
  }
  try {
    await ensureBonusBalanceIndexes();
    const balanceBefore = await getBonusBalance(userId);
    const entry = buildBonusLedgerEntry(Object.assign({}, data, { userId, balanceBefore }));
    const rows = await redisPipeline(bonusLedgerWriteCommands(entry));
    if (!redisRowsOk(rows)) {
      const err = new Error("bonus_ledger_write_failed");
      err.status = 500;
      throw err;
    }
    clearBonusRangeSummaryCache();
    return { entry, bonusBalance: entry.balance_after };
  } finally {
    await releaseRedisLock(lock);
  }
}

module.exports = {
  BONUS_BALANCES_KEY,
  BONUS_NONZERO_USERS_KEY,
  BONUS_TOTAL_BALANCE_KEY,
  BONUS_BALANCE_LOCK_PREFIX,
  BONUS_LEDGER_ALL_KEY,
  BONUS_LEDGER_ENTRY_PREFIX,
  BONUS_LEDGER_USER_PREFIX,
  BONUS_LEDGER_VERSION_KEY,
  BONUS_USERS_KEY,
  OPERATION_TYPES,
  acquireRedisLock,
  addBonusOperation,
  bonusLedgerWriteCommands,
  buildBonusLedgerEntry,
  getBonusBalance,
  getBonusLedgerDailyDebits,
  getBonusLedgerRangeSummary,
  getBonusLedgerTotals,
  getBonusDebitOperations,
  getBonusDebitOperationsPage,
  getBonusOperations,
  parsePositiveAmount,
  redisRowsOk,
  releaseRedisLock,
};
