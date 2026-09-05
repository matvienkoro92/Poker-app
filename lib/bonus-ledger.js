"use strict";

const crypto = require("crypto");
const { atomicWrite } = require("./redis-atomic");
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
const bonusExpenseRangeSummaryCache = new Map();

function clearBonusRangeSummaryCache() {
  bonusRangeSummaryCache.clear();
  bonusExpenseRangeSummaryCache.clear();
}

const CREDIT_TYPES = new Set(["credit", "adjustment", "promo_reward", "promo_ticket", "admin_credit"]);
const DEBIT_TYPES = new Set(["debit", "admin_debit"]);
const OPERATION_TYPES = new Set(Array.from(CREDIT_TYPES).concat(Array.from(DEBIT_TYPES)));

function parsePositiveAmount(value) {
  const amount = Math.floor(Number(value));
  if (!Number.isSafeInteger(amount) || amount <= 0) {
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
    ["LPUSH", BONUS_LEDGER_ALL_KEY, e.id],
    ["INCR", BONUS_LEDGER_VERSION_KEY],
  ];
  commands.splice(3, 0, Number(e.balance_after) > 0
    ? ["SADD", BONUS_NONZERO_USERS_KEY, e.user_id]
    : ["SREM", BONUS_NONZERO_USERS_KEY, e.user_id]);
  return commands;
}

function redisRowsOk(rows) {
  return !!(Array.isArray(rows) && rows.length && rows.every((row) => row && !row.error && Object.prototype.hasOwnProperty.call(row, "result")));
}

async function acquireRedisLock(key, ttlSec) {
  const value = crypto.randomBytes(10).toString("hex");
  const rows = await redisPipeline([["SET", key, value, "NX", "EX", String(Math.max(1, Number(ttlSec) || 10))]], { context: "bonus-ledger.lock", throwOnError: true });
  const result = rows && rows[0] ? rows[0].result : null;
  const ok = result === "OK" || result === true || String(result || "").toUpperCase() === "OK";
  return ok ? { key, value } : null;
}

async function releaseRedisLock(lock) {
  if (!lock || !lock.key) return;
  try {
    await redisPipeline([["EVAL", "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end", "1", lock.key, lock.value]], { context: "bonus-ledger.unlock", throwOnError: true });
  } catch (e) {}
}

async function getBonusBalance(userId) {
  const id = String(userId || "").trim();
  if (!id) return 0;
  const rows = await redisPipeline([["HGET", BONUS_BALANCES_KEY, id]], { context: "bonus-ledger.balance", throwOnError: true });
  if (!redisRowsOk(rows)) throw new Error("bonus_balance_unavailable");
  const raw = rows && rows[0] ? rows[0].result : null;
  const value = raw == null ? 0 : Number(raw);
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("invalid_bonus_balance");
  return value;
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
  const entries = await completeLedgerEntries();
  const totals = {
    totalCredited: 0,
    totalDebited: 0,
    creditCount: 0,
    debitCount: 0,
    operationsCount: 0,
  };
  entries.forEach((entry) => {
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

async function completeLedgerIds() {
  const ids = new Set();
  let cursor = "0";
  const deadline = Date.now() + 20000;
  for (let page = 0; page < 2000; page++) {
    if (Date.now() > deadline) throw new Error("bonus_history_scan_timeout");
    const rows = await redisPipeline([["SCAN", cursor, "MATCH", BONUS_LEDGER_ENTRY_PREFIX + "*", "COUNT", "500"]], { throwOnError: true, timeoutMs: 4500, context: "bonus-ledger.history-scan" });
    const result = rows[0].result;
    if (!Array.isArray(result) || !Array.isArray(result[1])) throw new Error("bonus_history_unavailable");
    for (const key of result[1]) ids.add(String(key).slice(BONUS_LEDGER_ENTRY_PREFIX.length));
    cursor = String(result[0]);
    if (cursor === "0") return [...ids];
  }
  throw new Error("bonus_history_scan_incomplete");
}

async function completeLedgerEntries() {
  const ids = await completeLedgerIds();
  const entries = [];
  for (let offset = 0; offset < ids.length; offset += 500) {
    const chunk = ids.slice(offset, offset + 500);
    const rows = await redisPipeline([["MGET", ...chunk.map(id => BONUS_LEDGER_ENTRY_PREFIX + id)]], { throwOnError: true, context: "bonus-ledger.complete-entries" });
    const values = rows[0] && rows[0].result;
    if (!Array.isArray(values) || values.length !== chunk.length) throw new Error("bonus_history_unavailable");
    for (const raw of values) {
      const entry = parseLedgerEntry(raw);
      if (!entry) throw new Error("bonus_history_entry_missing");
      entries.push(entry);
    }
  }
  return entries;
}

async function buildBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone) {
  const baseRows = await redisPipeline([["GET", BONUS_TOTAL_BALANCE_KEY]], { throwOnError: true, context: "bonus-ledger.total" });
  const ids = await completeLedgerIds();
  let currentBalance = Math.max(0, parseInt(baseRows && baseRows[0] && baseRows[0].result || "0", 10) || 0);
  if (!(baseRows && baseRows[0] && baseRows[0].result != null)) {
    const legacyRows = await redisPipeline([["HGETALL", BONUS_BALANCES_KEY]], {
      allowLargeRedisRead: true,
      context: "bonus-ledger.total-balance-backfill",
      throwOnError: true,
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
      ["SET", BONUS_TOTAL_BALANCE_KEY, String(currentBalance), "NX"],
    ];
    if (nonzeroUsers.length) backfillCommands.push(["SADD", BONUS_NONZERO_USERS_KEY, ...nonzeroUsers]);
    await redisPipeline(backfillCommands, { context: "bonus-ledger.total-balance-backfill-write",
      throwOnError: true });
    const totalRows = await redisPipeline([["GET", BONUS_TOTAL_BALANCE_KEY]], { throwOnError: true });
    currentBalance = Number(totalRows[0].result);
  }
  const from = String(rangeFrom || "").slice(0, 10);
  const to = String(rangeTo || "").slice(0, 10);
  const hasRange = /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to) && from <= to;
  if (!ids.length) return { dailyDebits: [], dailyReturns: [], returnEntries: [], currentBalance, balanceStart: currentBalance, balanceEnd: currentBalance, creditedDuringRange: 0, debitedDuringRange: 0, returnedDuringRange: 0 };
  const rows = [];
  const entryChunkSize = 500;
  for (let index = 0; index < ids.length; index += entryChunkSize) {
    const chunk = ids.slice(index, index + entryChunkSize);
    const chunkRows = await redisPipeline([
      ["MGET", ...chunk.map((ledgerId) => BONUS_LEDGER_ENTRY_PREFIX + ledgerId)],
    ], {
      allowLargeRedisRead: true,
      maxRedisMultiReadFields: entryChunkSize,
      context: "bonus-ledger.daily-debits.entries",
      throwOnError: true,
      timeoutMs: 4500,
    });
    const values = chunkRows && chunkRows[0] && Array.isArray(chunkRows[0].result)
      ? chunkRows[0].result
      : [];
    chunk.forEach((ledgerId, valueIndex) => {
      rows.push({ result: values[valueIndex] == null ? null : values[valueIndex] });
    });
  }
  const totals = {};
  let netDuringRange = 0;
  let netAfterRange = 0;
  let creditedDuringRange = 0;
  let debitedDuringRange = 0;
  const reviewCandidates = [];
  (rows || []).forEach((row) => {
    const entry = parseLedgerEntry(row && row.result);
    if (!entry) throw new Error("bonus_history_entry_missing");
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
  const reviewValues = [];
  for (let offset = 0; offset < reviewIds.length; offset += 500) {
    const chunk = reviewIds.slice(offset, offset + 500);
    const result = await redisPipeline([["HMGET", BONUS_ISSUE_REVIEWS_KEY, ...chunk]], {
      throwOnError: true, context: "bonus-ledger.daily-returns.reviews", timeoutMs: 4500,
    });
    const values = result[0] && result[0].result;
    if (!Array.isArray(values) || values.length !== chunk.length) throw new Error("bonus_reviews_unavailable");
    reviewValues.push(...values);
  }
  const returnsByDate = {};
  const returnEntries = [];
  let returnedDuringRange = 0;
  reviewCandidates.forEach((candidate, index) => {
    let review = null;
    try { review = reviewValues[index] ? JSON.parse(String(reviewValues[index])) : null; } catch (e) { throw new Error("bonus_review_invalid"); }
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
      throwOnError: true,
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
    .then(async (value) => {
      const latest = await redisPipeline([["GET", BONUS_LEDGER_VERSION_KEY]], { throwOnError: true });
      if (String(latest[0].result || "0") !== ledgerVersion) throw new Error("bonus_history_changed_retry");
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

async function getBonusLedgerExpenseRangeSummary(limit, rangeFrom, rangeTo, timeZone, options) {
  const summary = await getBonusLedgerRangeSummary(limit, rangeFrom, rangeTo, timeZone);
  return { debitedDuringRange: summary.debitedDuringRange, returnedDuringRange: summary.returnedDuringRange };
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
    const operationId = String(data.operationId || "");
    if (operationId && !/^[A-Za-z0-9_-]{16,100}$/.test(operationId)) throw Object.assign(new Error("invalid_operation_id"), { status: 400 });
    const request = { ...data, userId };
    delete request.operationId;
    const fingerprint = crypto.createHash("sha256").update(JSON.stringify(Object.keys(request).sort().map(key => [key, request[key]]))).digest("hex");
    const requestKey = operationId ? "poker_app:bonus_request:" + crypto.createHash("sha256").update(userId + ":" + String(data.adminId || "") + ":" + operationId).digest("hex") : "";
    if (requestKey) {
      const saved = await redisPipeline([["GET", requestKey]], { throwOnError: true });
      if (saved[0].result) {
        const previous = JSON.parse(saved[0].result);
        if (previous.fingerprint !== fingerprint) throw Object.assign(new Error("operation_id_conflict"), { status: 409 });
        return { ...previous.result, replayed: true };
      }
    }
    const balanceBefore = await getBonusBalance(userId);
    const entry = buildBonusLedgerEntry(Object.assign({}, data, { userId, balanceBefore }));
    const commands = bonusLedgerWriteCommands(entry);
    if (requestKey) commands.push(["SET", requestKey, JSON.stringify({ fingerprint, result: { entry, bonusBalance: entry.balance_after } })]);
    await atomicWrite(commands, {
      locks: [lock],
      balances: [{ key: BONUS_BALANCES_KEY, userId, value: balanceBefore }],
      totalKey: BONUS_TOTAL_BALANCE_KEY, balanceKey: BONUS_BALANCES_KEY,
      context: "bonus-ledger.commit",
    });
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
  getBonusLedgerExpenseRangeSummary,
  getBonusLedgerRangeSummary,
  getBonusLedgerTotals,
  getBonusDebitOperations,
  getBonusDebitOperationsPage,
  getBonusOperations,
  parsePositiveAmount,
  redisRowsOk,
  releaseRedisLock,
};
