"use strict";

const crypto = require("crypto");
const { pipeline: redisPipeline } = require("./redis");

const BONUS_BALANCES_KEY = "poker_app:bonus_balances";
const BONUS_USERS_KEY = "poker_app:bonus_users";
const BONUS_LEDGER_ENTRY_PREFIX = "poker_app:bonus_ledger:";
const BONUS_LEDGER_USER_PREFIX = "poker_app:bonus_ledger_user:";
const BONUS_LEDGER_ALL_KEY = "poker_app:bonus_ledger_all";
const BONUS_BALANCE_LOCK_PREFIX = "poker_app:bonus_balance_lock:";

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
    created_at: nowIso,
  };
}

function bonusLedgerWriteCommands(entry) {
  const e = entry || {};
  if (!e.id || !e.user_id) throw new Error("invalid_bonus_ledger_entry");
  const raw = JSON.stringify(e);
  return [
    ["HSET", BONUS_BALANCES_KEY, e.user_id, String(e.balance_after)],
    ["SADD", BONUS_USERS_KEY, e.user_id],
    ["SET", BONUS_LEDGER_ENTRY_PREFIX + e.id, raw],
    ["LPUSH", BONUS_LEDGER_USER_PREFIX + e.user_id, e.id],
    ["LTRIM", BONUS_LEDGER_USER_PREFIX + e.user_id, "0", "499"],
    ["LPUSH", BONUS_LEDGER_ALL_KEY, e.id],
    ["LTRIM", BONUS_LEDGER_ALL_KEY, "0", "4999"],
  ];
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

function bonusLedgerDateKey(value, timeZone) {
  const date = new Date(value || "");
  if (!Number.isFinite(date.getTime()) || !timeZone) return String(value || "").slice(0, 10);
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
    const map = {};
    parts.forEach((part) => { if (part.type !== "literal") map[part.type] = part.value; });
    return map.year + "-" + map.month + "-" + map.day;
  } catch (e) {
    return String(value || "").slice(0, 10);
  }
}

async function getBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone) {
  const safeLimit = Math.max(1, Math.min(5000, parseInt(limit || "5000", 10) || 5000));
  const baseRows = await redisPipeline([
    ["LRANGE", BONUS_LEDGER_ALL_KEY, "0", String(safeLimit - 1)],
    ["HGETALL", BONUS_BALANCES_KEY],
  ], {
    allowLargeRedisRead: safeLimit > 2000,
    context: "bonus-ledger.daily-debits.ids",
    timeoutMs: 4500,
  });
  const ids = baseRows && baseRows[0] && Array.isArray(baseRows[0].result) ? baseRows[0].result.map(String).filter(Boolean) : [];
  const balancePairs = baseRows && baseRows[1] && Array.isArray(baseRows[1].result) ? baseRows[1].result : [];
  let currentBalance = 0;
  for (let i = 1; i < balancePairs.length; i += 2) currentBalance += Math.max(0, parseInt(balancePairs[i] || "0", 10) || 0);
  const from = String(rangeFrom || "").slice(0, 10);
  const to = String(rangeTo || "").slice(0, 10);
  const hasRange = /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to) && from <= to;
  if (!ids.length) return { dailyDebits: [], currentBalance, balanceStart: currentBalance, balanceEnd: currentBalance, creditedDuringRange: 0, debitedDuringRange: 0 };
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
  });
  const balanceEnd = hasRange ? Math.max(0, currentBalance - netAfterRange) : currentBalance;
  return {
    dailyDebits: Object.keys(totals).map((key) => totals[key]).sort((a, b) => a.date.localeCompare(b.date) || a.userId.localeCompare(b.userId)),
    currentBalance,
    balanceStart: hasRange ? Math.max(0, balanceEnd - netDuringRange) : currentBalance,
    balanceEnd,
    creditedDuringRange,
    debitedDuringRange,
  };
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
    const balanceBefore = await getBonusBalance(userId);
    const entry = buildBonusLedgerEntry(Object.assign({}, data, { userId, balanceBefore }));
    const rows = await redisPipeline(bonusLedgerWriteCommands(entry));
    if (!redisRowsOk(rows)) {
      const err = new Error("bonus_ledger_write_failed");
      err.status = 500;
      throw err;
    }
    return { entry, bonusBalance: entry.balance_after };
  } finally {
    await releaseRedisLock(lock);
  }
}

module.exports = {
  BONUS_BALANCES_KEY,
  BONUS_BALANCE_LOCK_PREFIX,
  BONUS_LEDGER_ALL_KEY,
  BONUS_LEDGER_ENTRY_PREFIX,
  BONUS_LEDGER_USER_PREFIX,
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
  getBonusOperations,
  parsePositiveAmount,
  redisRowsOk,
  releaseRedisLock,
};
