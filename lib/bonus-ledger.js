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
  getBonusOperations,
  parsePositiveAmount,
  redisRowsOk,
  releaseRedisLock,
};
