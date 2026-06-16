"use strict";

const { REPORT_ADMIN_IDS } = require("../admin-report-access");
const { ID_TO_USER_KEY, DT_IDS_KEY } = require("../account-id");
const { EMAIL_ORIGINALS_KEY } = require("../email-auth");
const { pipeline: redisPipeline, hashPairsToObject, isConfigured: redisConfigured } = require("../redis");
const {
  BONUS_BALANCES_KEY,
  BONUS_LEDGER_ALL_KEY,
  BONUS_LEDGER_ENTRY_PREFIX,
} = require("../bonus-ledger");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CRON_SECRET = process.env.CRON_SECRET;
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const SNAPSHOT_KEY = "poker_app:bonus_balances_weekly_report:last_snapshot";
const LOCK_KEY = "poker_app:bonus_balances_weekly_report:lock";

function splitEnvList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function unique(arr) {
  return arr.filter((item, index) => item && arr.indexOf(item) === index);
}

function reportAdminIds() {
  return unique(
    splitEnvList(process.env.BONUS_BALANCE_REPORT_ADMIN_IDS || process.env.BONUS_BALANCE_REPORT_ADMIN_ID)
      .concat(REPORT_ADMIN_IDS)
      .map((id) => String(id || "").replace(/^tg_/, "").trim())
      .filter(Boolean),
  );
}

function intValue(value) {
  return Math.max(0, parseInt(value || "0", 10) || 0);
}

function rub(value) {
  const n = Math.round(Number(value) || 0);
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

function formatMoscowDateTime(iso) {
  const date = iso ? new Date(iso) : new Date();
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date) + " МСК";
  } catch (e) {
    return date.toISOString();
  }
}

function parseJson(raw) {
  if (!raw) return null;
  try {
    const value = JSON.parse(String(raw));
    return value && typeof value === "object" ? value : null;
  } catch (e) {
    return null;
  }
}

function parseLedgerEntry(raw) {
  const entry = parseJson(raw);
  if (!entry || !entry.id) return null;
  return entry;
}

function nameForBalanceRow(row) {
  const parts = [];
  if (row.telegram) parts.push(row.telegram);
  if (row.dtId) parts.push(row.dtId);
  else if (row.userId) parts.push(row.userId);
  if (row.nickname && parts.indexOf(row.nickname) === -1) parts.push(row.nickname);
  return parts.join(" · ") || "Без имени";
}

function buildBalanceRows(balances, usernames, displayNames, emails, idToUser, dtIds) {
  const reverseDt = {};
  Object.keys(dtIds).forEach((memberId) => {
    const dt = String(dtIds[memberId] || "").trim();
    if (dt && !reverseDt[dt]) reverseDt[dt] = memberId;
  });

  return Object.keys(balances)
    .map((userId) => {
      const balance = intValue(balances[userId]);
      const chatUserId = String(idToUser[userId] || reverseDt[userId] || (/^tg_/.test(userId) ? userId : "") || "").trim();
      const username = String((chatUserId && usernames[chatUserId]) || usernames[userId] || "").replace(/^@+/, "").trim();
      const dtId = /^ID\d{6}$/.test(userId) ? userId : String(dtIds[userId] || "").trim();
      const nickname = String(displayNames[userId] || (chatUserId ? displayNames[chatUserId] : "") || "").trim();
      return {
        userId,
        chatUserId,
        dtId,
        telegram: username ? "@" + username : (chatUserId ? chatUserId.replace(/^tg_/, "tg ") : ""),
        nickname,
        email: String(emails[userId] || "").trim(),
        balance,
      };
    })
    .filter((row) => row.balance > 0)
    .sort((a, b) => b.balance - a.balance || nameForBalanceRow(a).localeCompare(nameForBalanceRow(b), "ru"));
}

async function readLedgerTotalsSince(sinceMs, nowMs) {
  const idsRows = await redisPipeline([["LRANGE", BONUS_LEDGER_ALL_KEY, "0", "4999"]], {
    timeoutMs: 2500,
    context: "bonus-balances-weekly.ledger.ids",
  });
  const ids = idsRows && idsRows[0] && Array.isArray(idsRows[0].result) ? idsRows[0].result.map(String).filter(Boolean) : [];
  const totals = { credited: 0, debited: 0, creditCount: 0, debitCount: 0 };
  if (!ids.length) return totals;
  const rows = await redisPipeline(ids.map((id) => ["GET", BONUS_LEDGER_ENTRY_PREFIX + id]), {
    timeoutMs: 7000,
    context: "bonus-balances-weekly.ledger.entries",
  });
  (rows || []).forEach((row) => {
    const entry = parseLedgerEntry(row && row.result);
    if (!entry) return;
    const createdMs = Date.parse(entry.created_at || entry.createdAt || "");
    if (!Number.isFinite(createdMs) || createdMs < sinceMs || createdMs > nowMs) return;
    const amount = intValue(entry.amount);
    if (!amount) return;
    if (entry.direction === "debit") {
      totals.debited += amount;
      totals.debitCount += 1;
    } else {
      totals.credited += amount;
      totals.creditCount += 1;
    }
  });
  return totals;
}

function splitMessage(text, maxLen) {
  const limit = maxLen || 3900;
  const lines = String(text || "").split("\n");
  const chunks = [];
  let current = "";
  lines.forEach((line) => {
    const next = current ? current + "\n" + line : line;
    if (next.length <= limit) {
      current = next;
      return;
    }
    if (current) chunks.push(current);
    current = line.length > limit ? line.slice(0, limit - 1) : line;
  });
  if (current) chunks.push(current);
  return chunks;
}

function buildReportText(data) {
  const lines = [];
  lines.push("Отчёт по бонусным балансам");
  lines.push("Дата: " + formatMoscowDateTime(data.nowIso));
  lines.push("");
  lines.push("Итого сейчас: " + rub(data.currentTotal));
  lines.push("Итого на прошлой неделе: " + (data.hasPrevious ? rub(data.previousTotal) : "нет снимка"));
  lines.push("Добавилось за неделю: +" + rub(data.credited) + " (" + data.creditCount + ")");
  lines.push("Списалось за неделю: -" + rub(data.debited) + " (" + data.debitCount + ")");
  lines.push("Изменение итога: " + (data.delta >= 0 ? "+" : "-") + rub(Math.abs(data.delta)));
  if (data.periodFromIso) lines.push("Период операций: " + formatMoscowDateTime(data.periodFromIso) + " — " + formatMoscowDateTime(data.nowIso));
  lines.push("");
  lines.push("Балансы игроков:");
  if (!data.rows.length) {
    lines.push("Положительных бонусных балансов нет.");
  } else {
    data.rows.forEach((row, index) => {
      lines.push(String(index + 1) + ". " + nameForBalanceRow(row) + " — " + rub(row.balance));
    });
  }
  return lines.join("\n");
}

async function acquireLock() {
  const rows = await redisPipeline([["SET", LOCK_KEY, String(Date.now()), "NX", "EX", "900"]], {
    timeoutMs: 1200,
    context: "bonus-balances-weekly.lock",
  });
  const value = rows && rows[0] ? rows[0].result : null;
  return value === "OK" || value === true || String(value || "").toUpperCase() === "OK";
}

async function releaseLock() {
  try {
    await redisPipeline([["DEL", LOCK_KEY]], { timeoutMs: 800, context: "bonus-balances-weekly.unlock" });
  } catch (e) {}
}

async function buildReportData() {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const rows = await redisPipeline([
    ["HGETALL", BONUS_BALANCES_KEY],
    ["HGETALL", USERNAMES_KEY],
    ["HGETALL", CHAT_DISPLAY_NAMES_KEY],
    ["HGETALL", EMAIL_ORIGINALS_KEY],
    ["HGETALL", ID_TO_USER_KEY],
    ["HGETALL", DT_IDS_KEY],
    ["GET", SNAPSHOT_KEY],
  ], { timeoutMs: 4500, context: "bonus-balances-weekly.base" });
  if (!rows) throw new Error("redis_read_failed");

  const balances = hashPairsToObject(rows[0] && rows[0].result);
  const usernames = hashPairsToObject(rows[1] && rows[1].result);
  const displayNames = hashPairsToObject(rows[2] && rows[2].result);
  const emails = hashPairsToObject(rows[3] && rows[3].result);
  const idToUser = hashPairsToObject(rows[4] && rows[4].result);
  const dtIds = hashPairsToObject(rows[5] && rows[5].result);
  const previous = parseJson(rows[6] && rows[6].result);
  const previousMs = previous && previous.sentAt ? Date.parse(previous.sentAt) : NaN;
  const sinceMs = Number.isFinite(previousMs) ? previousMs : now - 7 * 24 * 60 * 60 * 1000;
  const ledgerTotals = await readLedgerTotalsSince(sinceMs, now);
  const balanceRows = buildBalanceRows(balances, usernames, displayNames, emails, idToUser, dtIds);
  const currentTotal = Object.keys(balances).reduce((sum, id) => sum + intValue(balances[id]), 0);
  const previousTotal = previous && Number.isFinite(Number(previous.total)) ? Math.max(0, Math.round(Number(previous.total))) : 0;
  return {
    nowIso,
    periodFromIso: new Date(sinceMs).toISOString(),
    rows: balanceRows,
    currentTotal,
    previousTotal,
    hasPrevious: !!previous,
    credited: ledgerTotals.credited,
    debited: ledgerTotals.debited,
    creditCount: ledgerTotals.creditCount,
    debitCount: ledgerTotals.debitCount,
    delta: currentTotal - previousTotal,
  };
}

async function saveSnapshot(data) {
  const snapshot = {
    sentAt: data.nowIso,
    total: data.currentTotal,
    credited: data.credited,
    debited: data.debited,
  };
  await redisPipeline([["SET", SNAPSHOT_KEY, JSON.stringify(snapshot)]], {
    timeoutMs: 1200,
    context: "bonus-balances-weekly.snapshot",
  });
}

async function sendReportToAdmins(text) {
  const adminIds = reportAdminIds();
  const chunks = splitMessage(text);
  const buttonUrl = resolveTelegramOpenButtonUrl(process.env.APP_URL || process.env.WEBAPP_URL || "");
  const results = [];
  for (const adminId of adminIds) {
    for (let i = 0; i < chunks.length; i += 1) {
      const suffix = chunks.length > 1 ? "\n\nЧасть " + String(i + 1) + "/" + String(chunks.length) : "";
      const result = await sendTelegramMessage(BOT_TOKEN, {
        chatId: adminId,
        text: chunks[i] + suffix,
        buttonText: i === 0 ? "Открыть приложение" : "",
        buttonUrl: i === 0 ? buttonUrl : "",
      });
      results.push({ adminId, part: i + 1, ok: !!(result && result.ok), hint: result && result.hint });
    }
  }
  return results;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false, error: "GET or POST only" });

  const auth =
    (req.headers && req.headers["x-cron-secret"]) ||
    (req.query && req.query.secret) ||
    ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || auth !== CRON_SECRET) {
    return res.status(403).json({ ok: false, error: "Invalid or missing CRON_SECRET" });
  }
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Redis is not configured" });
  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Telegram bot token is not configured" });

  const locked = await acquireLock();
  if (!locked) return res.status(200).json({ ok: true, skipped: true, reason: "locked" });
  try {
    const data = await buildReportData();
    const text = buildReportText(data);
    const results = await sendReportToAdmins(text);
    const delivered = results.filter((r) => r.ok).length;
    if (!delivered) {
      return res.status(502).json({
        ok: false,
        error: "telegram_delivery_failed",
        failed: results.filter((r) => !r.ok),
      });
    }
    await saveSnapshot(data);
    return res.status(200).json({
      ok: true,
      admins: reportAdminIds().length,
      messages: results.length,
      delivered,
      failed: results.filter((r) => !r.ok),
      total: data.currentTotal,
      previousTotal: data.previousTotal,
      credited: data.credited,
      debited: data.debited,
      rows: data.rows.length,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e && e.message ? String(e.message) : "bonus_report_failed" });
  } finally {
    await releaseLock();
  }
};
