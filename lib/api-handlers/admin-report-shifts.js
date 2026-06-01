const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Отчёты админов за смену (общие для всех админов).
 * GET /api/admin-report-shifts?initData=... — список отчётов (только админ).
 * POST /api/admin-report-shifts — сохранить отчёт (body: initData + поля отчёта, только админ).
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { REPORT_ADMIN_IDS, isAdminReportIdentity } = require("../admin-report-access");
const { ADMIN_IDS } = require("../api-auth");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const REDIS_KEY = "poker_app:admin_report_shifts";
const RAKEBACK_DRAFT_KEY_PREFIX = "poker_app:admin_report_rakeback_draft:";
const MAX_REPORTS = 500;
const RAKEBACK_ENTRY_REPORT_DRIFT_MS = 30 * 60 * 60 * 1000;
const RAKEBACK_EDITOR_IDS = new Set(["1897001087"]);
const RAKEBACK_EDITOR_USERNAMES = new Set([]);
const RAKEBACK_WRITER_IDS = new Set(["1897001087", "388008256", "2144406710"]);
const RAKEBACK_WRITER_USERNAMES = new Set(["roman1787443", "roman1_matvienko"]);
const RAKEBACK_ROW_COLORS = new Set([
  "#332411", "#173520", "#152b46", "#331b24", "#2d2344", "#26313a",
  "#4a3205", "#73510b", "#9a6b10",
  "#63330e", "#965019", "#c96b20",
  "#064b2f", "#087a48", "#0a9f5c",
  "#064b4b", "#087878", "#0f9f9a",
  "#123a66", "#155996", "#1d75c7",
  "#3a2466", "#5b35a0", "#7c4ddb",
  "#5f1b45", "#8f2869", "#c23a8a",
  "#5f1d1d", "#8f2b2b", "#bd3a3a",
  "#2c3440", "#46515f",
]);
const REPORT_DAY_MS = 24 * 60 * 60 * 1000;
const REPORT_WEEK_MS = 7 * REPORT_DAY_MS;
const REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
const REPORT_DAY_CUTOFF_MS = 18 * 60 * 60 * 1000;
const REPORT_LIST_CACHE_KEY_PREFIX = "poker_app:admin_report_shifts:list_cache:";
const REPORT_LIST_CACHE_TTL_SEC = 120;
const REPORT_LIST_MEMORY_CACHE_TTL_MS = 45 * 1000;
const reportListMemoryCache = new Map();
const REPORT_NOTIFY_ADMIN_IDS = Array.from(new Set([].concat(REPORT_ADMIN_IDS || [], ADMIN_IDS || [])
  .map((id) => String(id || "").replace(/^tg_/, "").trim())
  .filter(Boolean)));

/** Храним реальное время сохранения; отчётную дату по cutoff 18:00 МСК считает фронт. */
function createdAtISOForReport() {
  return new Date().toISOString();
}

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN || !chatId) return { ok: false, chatId: String(chatId || ""), error: "missing_config" };
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: String(chatId), text: text || "", disable_web_page_preview: true }),
    });
    const data = await r.json().catch(() => ({}));
    if (data && data.ok) return { ok: true, chatId: String(chatId) };
    return {
      ok: false,
      chatId: String(chatId),
      error: (data && data.description) || r.statusText || "send_failed",
    };
  } catch (e) {
    return { ok: false, chatId: String(chatId), error: e && e.message ? String(e.message) : "fetch_failed" };
  }
}

async function deleteReportById(reportId) {
  const id = String(reportId || "").trim();
  if (!id) return false;
  const results = await redisPipeline([["LRANGE", REDIS_KEY, "0", String(MAX_REPORTS - 1)]]);
  const rawList = results && results[0] && results[0].result;
  const list = Array.isArray(rawList) ? rawList : [];
  const kept = [];
  let removed = false;
  for (const str of list) {
    try {
      const r = JSON.parse(str);
      if (r.id === id) {
        removed = true;
      } else {
        kept.push(str);
      }
    } catch (e) {
      kept.push(str);
    }
  }
  const commands = [["DEL", REDIS_KEY]];
  for (const json of kept) {
    commands.push(["RPUSH", REDIS_KEY, json]);
  }
  await redisPipeline(commands);
  await clearReportListCache();
  return removed;
}

async function readReportsList() {
  const results = await redisPipeline([["LRANGE", REDIS_KEY, "0", String(MAX_REPORTS - 1)]]);
  const rawList = results && results[0] && results[0].result;
  const list = Array.isArray(rawList) ? rawList : [];
  const reports = [];
  for (const str of list) {
    try {
      reports.push(JSON.parse(str));
    } catch (e) {}
  }
  return reports;
}

function parseStoredReport(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function toReportNumber(raw) {
  const n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function normalizeRakebackRowColor(raw) {
  const color = String(raw || "").trim().toLowerCase();
  return RAKEBACK_ROW_COLORS.has(color) ? color : "";
}

function normalizeRakebackRowTime(raw) {
  if (raw == null || raw === "") return "";
  const direct = typeof raw === "number" ? raw : Number(raw);
  if (Number.isFinite(direct)) return direct;
  const parsed = Date.parse(String(raw));
  return Number.isFinite(parsed) ? parsed : "";
}

function normalizeRakebackRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const room = String(row.room || "").trim();
      const playerId = String(row.playerId || row.id || "").trim();
      const rake = toReportNumber(row.rake);
      const rakeZero = row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true;
      const percent = toReportNumber(row.percent);
      const amountRaw = row.amount != null ? toReportNumber(row.amount) : rake * percent / 100;
      const amount = Math.round(amountRaw * 100) / 100;
      const roomAmountRaw = row.roomAmount != null && row.roomAmount !== ""
        ? toReportNumber(row.roomAmount)
        : (row.chipAmount != null && row.chipAmount !== "" ? toReportNumber(row.chipAmount) : amount);
      const roomAmount = Math.round(roomAmountRaw * 100) / 100;
      const reportedAmountRaw = row.reportedAmount != null ? toReportNumber(row.reportedAmount) : amount;
      const reportedAmount = Math.round(reportedAmountRaw * 100) / 100;
      const color = normalizeRakebackRowColor(row.color || row.rowColor || row.highlightColor);
      const createdAt = normalizeRakebackRowTime(row.createdAt || row.addedAt || row.created);
      const standardAt = normalizeRakebackRowTime(row.standardAt || row.orderAt || row.sortAt || createdAt);
      const carryForward = row.carryForward === true || row.templateCarryForward === true;
      const discount15 = row.discount15 === true || row.subtract15 === true;
      const hasTemplateDefaults = carryForward && !rakeZero && rake === 0 && amount === 0 && (percent !== 0 || discount15);
      const templateLike = !carryForward && !rakeZero && rake === 0 && percent === 0 && amount === 0;
      const reportedAt = templateLike ? "" : String(row.reportedAt || "").trim();
      const reportId = templateLike ? "" : String(row.reportId || "").trim();
      const accounted = !templateLike && (row.accounted === true || !!reportedAt || !!reportId);
      const saved = row.saved === true && !templateLike;
      const hasEntryData = !templateLike && (rake !== 0 || rakeZero || amount !== 0 || saved || accounted || hasTemplateDefaults);
      const reportedAtTime = normalizeRakebackRowTime(reportedAt);
      let entryAddedAt = normalizeRakebackRowTime(row.entryAddedAt || row.firstAddedAt || (hasEntryData ? row.addedAt : ""));
      if (reportedAtTime && (!entryAddedAt || reportedAtTime < entryAddedAt)) entryAddedAt = reportedAtTime;
      if (reportedAtTime && entryAddedAt && reportedAtTime - entryAddedAt > RAKEBACK_ENTRY_REPORT_DRIFT_MS) entryAddedAt = reportedAtTime;
      if (hasEntryData && createdAt && !entryAddedAt) entryAddedAt = createdAt;
      if (!room && !playerId && rake === 0 && percent === 0 && amount === 0 && !carryForward) return null;
      if (carryForward && !rakeZero && !accounted && rake === 0 && amount === 0 && !hasTemplateDefaults) return null;
      if (templateLike && !accounted) return null;
      return {
        groupId: String(row.groupId || "").trim(),
        kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
        room: room || "Покер21",
        playerId,
        rake,
        rakeZero,
        percent,
        carryForward,
        discount15,
        saved,
        ownerId: String(row.ownerId || row.authorId || "").trim(),
        color,
        createdAt,
        standardAt,
        entryAddedAt: entryAddedAt || (hasEntryData ? (createdAt || reportedAtTime) : ""),
        roomAmount,
        chipAmount: row.chipAmount != null && row.chipAmount !== "" ? toReportNumber(row.chipAmount) : null,
        amount,
        reportedAmount,
        accounted,
        reportedAt,
        reportId,
      };
    })
    .filter(Boolean);
}

function mskDateFromReportTs(ts) {
  return new Date(Number(ts) + REPORT_MSK_SHIFT_MS);
}

function weekStartMsForReport(ts) {
  const msk = mskDateFromReportTs(ts);
  const y = msk.getUTCFullYear();
  const m = msk.getUTCMonth();
  const d = msk.getUTCDate();
  const wd = msk.getUTCDay();
  const daysFromMonday = (wd + 6) % 7;
  const mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * REPORT_DAY_MS;
  return mondayStartMskMs - REPORT_MSK_SHIFT_MS;
}

function reportBusinessTimestampMs(ts) {
  const raw = Number(ts);
  if (!Number.isFinite(raw)) return raw;
  const shifted = new Date(raw - REPORT_DAY_CUTOFF_MS + REPORT_MSK_SHIFT_MS);
  return Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate(),
    12,
    0,
    0,
    0,
  ) - REPORT_MSK_SHIFT_MS;
}

function reportStoredDateTimestampMs(report) {
  const raw = String((report && report.date) || "").trim();
  if (!raw) return NaN;
  const match = raw.match(/^(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{2,4}))?$/);
  if (!match) return NaN;
  const day = Number(match[1]);
  const month = Number(match[2]);
  let year = match[3] ? Number(match[3]) : NaN;
  if (!Number.isFinite(year)) {
    const created = normalizeRakebackRowTime(report && report.createdAt);
    year = created
      ? Number(new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", year: "numeric" }).format(new Date(created)))
      : new Date().getFullYear();
  }
  if (year < 100) year += 2000;
  if (!day || !month || month < 1 || month > 12) return NaN;
  return Date.UTC(year, month - 1, day, 12, 0, 0, 0) - REPORT_MSK_SHIFT_MS;
}

function reportEffectiveTimestampMs(report) {
  const stored = reportStoredDateTimestampMs(report);
  if (Number.isFinite(stored)) return stored;
  const raw = normalizeRakebackRowTime(report && report.createdAt);
  return raw ? reportBusinessTimestampMs(raw) : 0;
}

function currentReportWeekStartMs() {
  return weekStartMsForReport(reportBusinessTimestampMs(Date.now()));
}

function reportWeekStartMs(report) {
  const reportTime = reportEffectiveTimestampMs(report);
  return reportTime ? weekStartMsForReport(reportTime) : NaN;
}

function currentWeekReportsCacheKey(currentWeekStart) {
  return REPORT_LIST_CACHE_KEY_PREFIX + "currentWeek:" + String(currentWeekStart || 0);
}

function readReportListMemoryCache(currentWeekStart) {
  const key = currentWeekReportsCacheKey(currentWeekStart);
  const cached = reportListMemoryCache.get(key);
  if (!cached || !cached.expiresAt || cached.expiresAt <= Date.now()) {
    reportListMemoryCache.delete(key);
    return null;
  }
  return cached.value || null;
}

function writeReportListMemoryCache(currentWeekStart, value) {
  const key = currentWeekReportsCacheKey(currentWeekStart);
  reportListMemoryCache.set(key, {
    expiresAt: Date.now() + REPORT_LIST_MEMORY_CACHE_TTL_MS,
    value,
  });
}

async function readCurrentWeekReportsCache(currentWeekStart) {
  const memory = readReportListMemoryCache(currentWeekStart);
  if (memory) return memory;
  const key = currentWeekReportsCacheKey(currentWeekStart);
  const results = await redisPipeline([["GET", key]], { timeoutMs: 800, context: "admin-report-shifts.currentWeekCache.get" });
  const raw = results && results[0] && results[0].result;
  if (!raw) return null;
  try {
    const cached = JSON.parse(String(raw));
    if (!cached || cached.currentWeekStart !== currentWeekStart || !Array.isArray(cached.reports)) return null;
    writeReportListMemoryCache(currentWeekStart, cached);
    return cached;
  } catch (e) {
    return null;
  }
}

async function writeCurrentWeekReportsCache(currentWeekStart, value) {
  if (!value || !Array.isArray(value.reports)) return;
  writeReportListMemoryCache(currentWeekStart, value);
  const key = currentWeekReportsCacheKey(currentWeekStart);
  await redisPipeline([["SET", key, JSON.stringify(value), "EX", String(REPORT_LIST_CACHE_TTL_SEC)]], {
    timeoutMs: 1600,
    context: "admin-report-shifts.currentWeekCache.set",
  });
}

async function clearReportListCache() {
  reportListMemoryCache.clear();
  const currentWeekStart = currentReportWeekStartMs();
  await redisPipeline([
    ["DEL", currentWeekReportsCacheKey(currentWeekStart)],
    ["DEL", currentWeekReportsCacheKey(currentWeekStart - REPORT_WEEK_MS)],
    ["DEL", currentWeekReportsCacheKey(currentWeekStart + REPORT_WEEK_MS)],
  ], { timeoutMs: 1600, context: "admin-report-shifts.currentWeekCache.clear" });
}

function filterReportsForListScope(reports, scope) {
  const list = Array.isArray(reports) ? reports : [];
  const normalizedScope = String(scope || "").trim().toLowerCase();
  if (!normalizedScope || normalizedScope === "all") {
    return { reports: list, scope: "all", currentWeekStart: currentReportWeekStartMs(), hasArchive: false };
  }
  const currentWeekStart = currentReportWeekStartMs();
  let hasArchive = false;
  const filtered = [];
  for (const report of list) {
    const weekStart = reportWeekStartMs(report);
    const isCurrentWeek = Number.isFinite(weekStart) && weekStart === currentWeekStart;
    if (isCurrentWeek) {
      if (normalizedScope === "currentweek" || normalizedScope === "current-week" || normalizedScope === "current") filtered.push(report);
    } else {
      hasArchive = true;
      if (normalizedScope === "archive" || normalizedScope === "past" || normalizedScope === "pastweeks" || normalizedScope === "past-weeks") filtered.push(report);
    }
  }
  if (normalizedScope === "currentweek" || normalizedScope === "current-week" || normalizedScope === "current") {
    return { reports: filtered, scope: "currentWeek", currentWeekStart, hasArchive };
  }
  if (normalizedScope === "archive" || normalizedScope === "past" || normalizedScope === "pastweeks" || normalizedScope === "past-weeks") {
    return { reports: filtered, scope: "archive", currentWeekStart, hasArchive: filtered.length > 0 };
  }
  return { reports: list, scope: "all", currentWeekStart, hasArchive };
}

async function readReportsForListScope(scope) {
  const normalizedScope = String(scope || "").trim().toLowerCase();
  if (normalizedScope !== "currentweek" && normalizedScope !== "current-week" && normalizedScope !== "current") {
    return filterReportsForListScope(await readReportsList(), scope);
  }
  const currentWeekStart = currentReportWeekStartMs();
  const cached = await readCurrentWeekReportsCache(currentWeekStart);
  if (cached) return { reports: cached.reports, scope: "currentWeek", currentWeekStart, hasArchive: !!cached.hasArchive };
  const results = await redisPipeline([["LRANGE", REDIS_KEY, "0", String(MAX_REPORTS - 1)]], {
    timeoutMs: 6500,
    context: "admin-report-shifts.currentWeekList",
  });
  const rawList = results && results[0] && results[0].result;
  const list = Array.isArray(rawList) ? rawList : [];
  const reports = [];
  let hasArchive = false;
  for (const str of list) {
    const report = parseStoredReport(str);
    if (!report) continue;
    const weekStart = reportWeekStartMs(report);
    if (Number.isFinite(weekStart) && weekStart === currentWeekStart) {
      reports.push(report);
    } else {
      hasArchive = true;
    }
  }
  const result = { reports, scope: "currentWeek", currentWeekStart, hasArchive };
  writeCurrentWeekReportsCache(currentWeekStart, result).catch(() => {});
  return result;
}

function dayStartMsForReport(ts) {
  const msk = mskDateFromReportTs(ts);
  return Date.UTC(msk.getUTCFullYear(), msk.getUTCMonth(), msk.getUTCDate(), 0, 0, 0, 0) - REPORT_MSK_SHIFT_MS;
}

function rakebackHistoryRowKey(row) {
  if (!row) return "";
  return [
    String(row.reportId || "").trim(),
    String(row.groupId || "").trim(),
    row.kind === "addon" ? "addon" : "base",
    String(row.room || "").trim(),
    String(row.playerId || "").trim(),
    String(row.rake || 0),
    String(row.amount || 0),
  ].join("|");
}

function appendRecentReportRakebackRows(draft, reports) {
  const baseDraft = draft || { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  const rows = filterDeletedRakebackRows(baseDraft.rows, baseDraft.deletedTemplates, baseDraft.deletedRows);
  const historyResetAt = normalizeRakebackRowTime(baseDraft.historyResetAt);
  const currentWeekStart = currentReportWeekStartMs();
  const previousWeekStart = currentWeekStart - REPORT_WEEK_MS;
  const seen = new Set(rows.map(rakebackHistoryRowKey));
  const deletedKeys = new Set(normalizeRakebackDeletedTemplates(baseDraft.deletedTemplates).map(rakebackDeletedRowKey).filter(Boolean));
  const appended = [];
  for (const report of Array.isArray(reports) ? reports : []) {
    const reportRawTime = normalizeRakebackRowTime(report && report.createdAt);
    if (historyResetAt && reportRawTime && reportRawTime <= historyResetAt) continue;
    const reportTime = reportEffectiveTimestampMs(report);
    const reportWeekStart = reportTime ? weekStartMsForReport(reportTime) : NaN;
    if (!reportTime || (reportWeekStart !== currentWeekStart && reportWeekStart !== previousWeekStart)) continue;
    const reportRows = normalizeRakebackRows(report && report.rakebackRows);
    for (const row of reportRows) {
      if (!row) continue;
      if (deletedKeys.has(rakebackDeletedRowKey(row)) && isDeletedRakebackTemplateRow(row)) continue;
      const historyRow = {
        ...row,
        accounted: true,
        saved: true,
        reportId: row.reportId || report.id || "",
        reportedAt: row.reportedAt || report.createdAt || "",
        ownerId: row.ownerId || report.authorId || "",
        entryAddedAt: row.entryAddedAt || row.reportedAt || report.createdAt || reportTime,
        createdAt: row.createdAt || reportTime,
      };
      const key = rakebackHistoryRowKey(historyRow);
      if (key && !seen.has(key)) {
        seen.add(key);
        appended.push(historyRow);
      }
    }
  }
  if (!appended.length) return { ...baseDraft, rows };
  return { ...baseDraft, rows: rows.concat(appended) };
}

function restoreReportRakebackRowsIntoDraft(draft, reports, targetWeekStart) {
  const baseDraft = draft || { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  const rows = filterDeletedRakebackRows(baseDraft.rows, baseDraft.deletedTemplates, baseDraft.deletedRows);
  const seen = new Set(rows.map(rakebackHistoryRowKey));
  const deletedKeys = new Set(normalizeRakebackDeletedTemplates(baseDraft.deletedTemplates).map(rakebackDeletedRowKey).filter(Boolean));
  const restoredDeletedRowKeys = new Set();
  const restoredRows = [];
  const manualOnlyReports = [];
  for (const report of Array.isArray(reports) ? reports : []) {
    const reportTime = reportEffectiveTimestampMs(report);
    if (!reportTime || weekStartMsForReport(reportTime) !== targetWeekStart) continue;
    const reportRows = normalizeRakebackRows(report && report.rakebackRows);
    if (!reportRows.length) {
      const manualRakeback = toReportNumber(report && report.rakeback);
      if (manualRakeback) {
        manualOnlyReports.push({
          id: String((report && report.id) || ""),
          createdAt: String((report && report.createdAt) || ""),
          authorId: String((report && report.authorId) || ""),
          authorName: String((report && report.authorName) || ""),
          rakeback: manualRakeback,
        });
      }
      continue;
    }
    for (const row of reportRows) {
      if (!row) continue;
      if (deletedKeys.has(rakebackDeletedRowKey(row)) && isDeletedRakebackTemplateRow(row)) continue;
      const historyRow = {
        ...row,
        accounted: true,
        saved: true,
        reportId: row.reportId || report.id || "",
        reportedAt: row.reportedAt || report.createdAt || "",
        ownerId: row.ownerId || report.authorId || "",
        entryAddedAt: row.entryAddedAt || row.reportedAt || report.createdAt || reportTime,
        createdAt: row.createdAt || reportTime,
      };
      const deletedRowKey = rakebackDeletedStoredRowKey(historyRow);
      if (deletedRowKey) restoredDeletedRowKeys.add(deletedRowKey);
      const key = rakebackHistoryRowKey(historyRow);
      if (key && !seen.has(key)) {
        seen.add(key);
        restoredRows.push(historyRow);
      }
    }
  }
  const deletedRows = normalizeRakebackDeletedRows(baseDraft.deletedRows)
    .filter((row) => !restoredDeletedRowKeys.has(rakebackDeletedStoredRowKey(row)));
  return {
    rows: rows.concat(restoredRows),
    deletedTemplates: normalizeRakebackDeletedTemplates(baseDraft.deletedTemplates),
    deletedRows,
    restoredRows,
    restoredDeletedRowKeys,
    manualOnlyReports,
  };
}

function rakebackCarryForwardKey(row) {
  if (!row || row.kind === "addon") return "";
  const room = String(row.room || "").trim();
  const playerId = String(row.playerId || row.id || "").trim();
  return room && playerId ? room + "\u0000" + playerId : "";
}

function rakebackRowTimelineMs(row) {
  return normalizeRakebackRowTime(
    (row && (row.entryAddedAt || row.reportedAt || row.createdAt || row.addedAt || row.created || row.standardAt)) || ""
  ) || 0;
}

function hasRakebackCarryForwardDefaults(row) {
  return !!row && toReportNumber(row.percent) !== 0;
}

function isRakebackCarryForwardTemplateRow(row) {
  if (!row || row.kind === "addon" || row.isAddon) return false;
  if (row.accounted === true || row.reportedAt || row.reportId) return false;
  if (row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true) return false;
  if (toReportNumber(row.rake) !== 0 || toReportNumber(row.amount) !== 0 || toReportNumber(row.reportedAmount) !== 0) return false;
  return row.carryForward === true || row.templateCarryForward === true;
}

function ensureCurrentWeekRakebackCarryForwardRows(draft) {
  const baseDraft = draft || { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  const rows = filterDeletedRakebackRows(baseDraft.rows, baseDraft.deletedTemplates, baseDraft.deletedRows);
  const historyResetAt = normalizeRakebackRowTime(baseDraft.historyResetAt);
  const currentWeekStart = currentReportWeekStartMs();
  const previousWeekStart = currentWeekStart - REPORT_WEEK_MS;
  const currentTemplateKeys = new Set();
  const latestPreviousByKey = new Map();
  for (const row of rows) {
    const key = rakebackCarryForwardKey(row);
    if (!key) continue;
    const stamp = rakebackRowTimelineMs(row);
    if (historyResetAt && stamp && stamp <= historyResetAt) continue;
    const weekStart = stamp ? weekStartMsForReport(stamp) : NaN;
    if (weekStart === currentWeekStart && isRakebackCarryForwardTemplateRow(row)) currentTemplateKeys.add(key);
    if (weekStart === previousWeekStart) {
      if (!hasRakebackCarryForwardDefaults(row)) continue;
      const prev = latestPreviousByKey.get(key);
      if (!prev || rakebackRowTimelineMs(prev) <= stamp) latestPreviousByKey.set(key, row);
    }
  }
  const now = Date.now();
  const appended = [];
  for (const [key, row] of latestPreviousByKey.entries()) {
    if (currentTemplateKeys.has(key)) continue;
    appended.push({
      groupId: "",
      kind: "base",
      room: row.room || "Покер21",
      playerId: row.playerId || "",
      rake: 0,
      rakeZero: false,
      percent: row.percent || 0,
      carryForward: true,
      discount15: false,
      saved: false,
      ownerId: "",
      color: "",
      createdAt: now,
      standardAt: now,
      entryAddedAt: now,
      amount: 0,
      reportedAmount: 0,
      accounted: false,
      reportedAt: "",
      reportId: "",
    });
    currentTemplateKeys.add(key);
  }
  if (!appended.length) return { ...baseDraft, rows };
  return { ...baseDraft, rows: rows.concat(appended) };
}

function normalizeRakebackDeletedTemplates(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const room = String(item.room || "").trim();
    const playerId = String(item.playerId || item.id || "").trim();
    if (!room || !playerId) continue;
    const key = room + "\u0000" + playerId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      room,
      playerId,
      deletedAt: normalizeRakebackRowTime(item.deletedAt) || Date.now(),
      deletedBy: String(item.deletedBy || item.ownerId || "").trim(),
    });
  }
  return out;
}

function canMergeRakebackDeletion(item, userId, options = {}) {
  if (options.canManageAll) return true;
  const currentUserId = String(userId || "").trim();
  const ownerId = String(item && (item.ownerId || item.authorId) || "").trim();
  const deletedBy = String(item && item.deletedBy || "").trim();
  if (ownerId && ownerId !== currentUserId) return false;
  if (deletedBy && deletedBy !== currentUserId) return false;
  return true;
}

function mergeRakebackDeletedTemplates(existingItems, incomingItems, userId, options = {}) {
  const byKey = new Map();
  for (const item of normalizeRakebackDeletedTemplates(existingItems)) {
    byKey.set(String(item.room || "").trim() + "\u0000" + String(item.playerId || "").trim(), item);
  }
  for (const item of normalizeRakebackDeletedTemplates(incomingItems)) {
    if (!canMergeRakebackDeletion(item, userId, options)) continue;
    const key = String(item.room || "").trim() + "\u0000" + String(item.playerId || "").trim();
    if (!key || key === "\u0000") continue;
    byKey.set(key, {
      ...item,
      deletedBy: item.deletedBy || userId || "",
    });
  }
  return Array.from(byKey.values());
}

function mergeRakebackDeletedRows(existingItems, incomingItems, userId, options = {}) {
  const byKey = new Map();
  for (const item of normalizeRakebackDeletedRows(existingItems)) {
    byKey.set(rakebackDeletedStoredRowKey(item), item);
  }
  for (const item of normalizeRakebackDeletedRows(incomingItems)) {
    if (!canMergeRakebackDeletion(item, userId, options)) continue;
    const key = rakebackDeletedStoredRowKey(item);
    if (!key) continue;
    byKey.set(key, {
      ...item,
      deletedBy: item.deletedBy || userId || "",
    });
  }
  return Array.from(byKey.values());
}

function rakebackDeletedRowKey(row) {
  if (!row) return "";
  const room = String(row.room || "").trim();
  const playerId = String(row.playerId || row.id || "").trim();
  return room && playerId ? room + "\u0000" + playerId : "";
}

function isDeletedRakebackTemplateRow(row) {
  if (!row) return false;
  const kind = row.kind === "addon" || row.isAddon ? "addon" : "base";
  if (kind === "addon") return false;
  if (row.accounted || row.reportedAt || row.reportId) return false;
  if (row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true) return false;
  if (toReportNumber(row.rake) !== 0 ||
    toReportNumber(row.roomAmount) !== 0 ||
    toReportNumber(row.chipAmount) !== 0 ||
    toReportNumber(row.amount) !== 0 ||
    toReportNumber(row.reportedAmount) !== 0) {
    return false;
  }
  return row.carryForward === true || row.templateCarryForward === true;
}

function rakebackDeletedStoredRowKey(row) {
  if (!row) return "";
  const groupId = String(row.groupId || "").trim();
  const kind = row.kind === "addon" || row.isAddon ? "addon" : "base";
  const room = String(row.room || "").trim();
  const playerId = String(row.playerId || row.id || "").trim();
  if (!groupId || !room || !playerId) return "";
  return [
    groupId,
    kind,
    room,
    playerId,
    String(row.reportId || "").trim(),
    String(row.reportedAt || "").trim(),
  ].join("|");
}

function normalizeRakebackDeletedRows(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const groupId = String(item.groupId || "").trim();
    const kind = item.kind === "addon" || item.isAddon ? "addon" : "base";
    const room = String(item.room || "").trim();
    const playerId = String(item.playerId || item.id || "").trim();
    const reportId = String(item.reportId || "").trim();
    const reportedAt = String(item.reportedAt || "").trim();
    const key = rakebackDeletedStoredRowKey({ groupId, kind, room, playerId, reportId, reportedAt });
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({
      groupId,
      kind,
      room,
      playerId,
      reportId,
      reportedAt,
      ownerId: String(item.ownerId || item.authorId || "").trim(),
      deletedAt: normalizeRakebackRowTime(item.deletedAt) || Date.now(),
      deletedBy: String(item.deletedBy || item.ownerId || "").trim(),
    });
  }
  return out;
}

function filterDeletedRakebackRows(rows, deletedTemplates, deletedRows) {
  const deletedKeys = new Set(normalizeRakebackDeletedTemplates(deletedTemplates).map(rakebackDeletedRowKey).filter(Boolean));
  const deletedRowKeys = new Set(normalizeRakebackDeletedRows(deletedRows).map(rakebackDeletedStoredRowKey).filter(Boolean));
  if (!deletedKeys.size && !deletedRowKeys.size) return normalizeRakebackRows(rows);
  return normalizeRakebackRows(rows).filter((row) => {
    const storedKey = rakebackDeletedStoredRowKey(row);
    if (storedKey && deletedRowKeys.has(storedKey)) return false;
    return !deletedKeys.has(rakebackDeletedRowKey(row)) || !isDeletedRakebackTemplateRow(row);
  });
}

function canManageAllRakebackRows(identity, userId) {
  const ids = [
    userId,
    identity && identity.id,
    identity && identity.memberId,
  ];
  for (const id of ids) {
    const normalized = String(id || "").replace(/^tg_/, "").trim();
    if (RAKEBACK_EDITOR_IDS.has(normalized)) return true;
  }
  const usernames = [
    identity && identity.telegramUsername,
    identity && identity.pwaUsername,
    identity && identity.username,
  ];
  for (const username of usernames) {
    const normalized = String(username || "").replace(/^@+/, "").trim().toLowerCase();
    if (RAKEBACK_EDITOR_USERNAMES.has(normalized)) return true;
  }
  return false;
}

function canWriteOwnRakebackRows(identity, userId) {
  if (canManageAllRakebackRows(identity, userId)) return true;
  if (isAdminReportIdentity(identity, userId)) return true;
  const ids = [
    userId,
    identity && identity.id,
    identity && identity.memberId,
  ];
  for (const id of ids) {
    const normalized = String(id || "").replace(/^tg_/, "").trim();
    if (RAKEBACK_WRITER_IDS.has(normalized)) return true;
  }
  const usernames = [
    identity && identity.telegramUsername,
    identity && identity.pwaUsername,
    identity && identity.username,
  ];
  for (const username of usernames) {
    const normalized = String(username || "").replace(/^@+/, "").trim().toLowerCase();
    if (RAKEBACK_WRITER_USERNAMES.has(normalized)) return true;
  }
  return false;
}

function rakebackRowStorageKey(row) {
  if (!row) return "";
  const kind = row.kind === "addon" ? "addon" : "base";
  return [
    String(row.groupId || "").trim(),
    kind,
    String(row.room || "").trim(),
    String(row.playerId || "").trim(),
    String(row.reportId || "").trim(),
    String(row.reportedAt || "").trim(),
    kind === "addon" ? String(row.createdAt || row.entryAddedAt || row.standardAt || "").trim() : "",
  ].join("|");
}

function isRakebackRowAccounted(row) {
  return !!(row && (row.accounted === true || row.reportedAt || row.reportId));
}

function rakebackDraftOwnerId(row, currentUserId) {
  return isRakebackCarryForwardTemplateRow(row) ? "" : (row.ownerId || currentUserId);
}

function mergeRakebackDraftRows(existingRows, incomingRows, userId, options = {}) {
  const currentUserId = String(userId || "").trim();
  if (options.canManageAll) {
    if (options.allowAccountedOverwrite) {
      return normalizeRakebackRows(incomingRows).map((row) => ({
        ...row,
        ownerId: rakebackDraftOwnerId(row, currentUserId),
      }));
    }
    const existing = normalizeRakebackRows(existingRows);
    const accountedByKey = new Map(existing.filter(isRakebackRowAccounted).map((row) => [rakebackRowStorageKey(row), row]));
    const seenAccounted = new Set();
    const merged = normalizeRakebackRows(incomingRows).map((row) => {
      const key = rakebackRowStorageKey(row);
      if (accountedByKey.has(key)) {
        seenAccounted.add(key);
        return accountedByKey.get(key);
      }
      return {
        ...row,
        ownerId: rakebackDraftOwnerId(row, currentUserId),
      };
    });
    for (const [key, row] of accountedByKey.entries()) {
      if (!seenAccounted.has(key)) merged.push(row);
    }
    return merged;
  }
  const incoming = normalizeRakebackRows(incomingRows).filter((row) => {
    const ownerId = String(row.ownerId || "").trim();
    return !ownerId || ownerId === currentUserId;
  }).map((row) => ({
    ...row,
    ownerId: rakebackDraftOwnerId(row, currentUserId),
  }));
  const kept = normalizeRakebackRows(existingRows).filter((row) => {
    if (!row.ownerId) return isRakebackCarryForwardTemplateRow(row);
    return row.ownerId !== currentUserId;
  });
  return kept.concat(incoming);
}

function normalizeRakebackGroupIdList(values) {
  return new Set((Array.isArray(values) ? values : [])
    .map((value) => String(value || "").trim())
    .filter(Boolean));
}

function canPatchRakebackDraftRow(row, userId, options = {}) {
  if (!row) return false;
  if (isRakebackRowAccounted(row) && options.allowAccountedOverwrite !== true) return false;
  if (options.canManageAll) return true;
  const currentUserId = String(userId || "").trim();
  const ownerId = String(row.ownerId || "").trim();
  return !ownerId || !currentUserId || ownerId === currentUserId;
}

function mergeRakebackDraftPatchRows(existingRows, incomingRows, deletedGroupIds, deletedRowKeys, userId, options = {}) {
  const currentUserId = String(userId || "").trim();
  const existing = normalizeRakebackRows(existingRows);
  const deleteSet = normalizeRakebackGroupIdList(deletedGroupIds);
  const rowDeleteSet = normalizeRakebackGroupIdList(deletedRowKeys);
  const existingByGroup = new Map();
  const existingGroups = new Map();
  const existingByKey = new Map();
  for (const row of existing) {
    const groupId = String(row && row.groupId || "").trim();
    const key = rakebackRowStorageKey(row);
    if (groupId && !existingByGroup.has(groupId)) existingByGroup.set(groupId, row);
    if (groupId) {
      if (!existingGroups.has(groupId)) existingGroups.set(groupId, []);
      existingGroups.get(groupId).push(row);
    }
    if (key) existingByKey.set(key, row);
  }

  const incomingByKey = new Map();
  const incomingByGroup = new Map();
  for (const row of normalizeRakebackRows(incomingRows)) {
    const groupId = String(row && row.groupId || "").trim();
    const key = rakebackRowStorageKey(row);
    if (!groupId) continue;
    if (!key) continue;
    if (deleteSet.has(groupId) || rowDeleteSet.has(key)) continue;
    const existingRow = existingByKey.get(key) || existingByGroup.get(groupId);
    const permissionRow = existingRow || row;
    if (!canPatchRakebackDraftRow(permissionRow, currentUserId, options)) continue;
    const prepared = {
      ...row,
      ownerId: rakebackDraftOwnerId(row, currentUserId),
    };
    incomingByKey.set(key, prepared);
    if (!incomingByGroup.has(groupId)) incomingByGroup.set(groupId, []);
    incomingByGroup.get(groupId).push(prepared);
  }

  const merged = [];
  const usedIncomingKeys = new Set();
  const replacedGroups = new Set();
  const canReplaceGroup = (groupId) => {
    const groupRows = existingGroups.get(groupId) || [];
    return groupRows.every((row) => canPatchRakebackDraftRow(row, currentUserId, options));
  };
  for (const row of existing) {
    const groupId = String(row && row.groupId || "").trim();
    const key = rakebackRowStorageKey(row);
    if (groupId && deleteSet.has(groupId) && canPatchRakebackDraftRow(row, currentUserId, options)) continue;
    if (key && rowDeleteSet.has(key) && canPatchRakebackDraftRow(row, currentUserId, options)) continue;
    if (groupId && incomingByGroup.has(groupId) && canReplaceGroup(groupId)) {
      if (!replacedGroups.has(groupId)) {
        for (const incomingRow of incomingByGroup.get(groupId)) {
          merged.push(incomingRow);
          usedIncomingKeys.add(rakebackRowStorageKey(incomingRow));
        }
        replacedGroups.add(groupId);
      }
      continue;
    }
    if (key && incomingByKey.has(key) && canPatchRakebackDraftRow(row, currentUserId, options)) {
      const incomingRow = incomingByKey.get(key);
      merged.push(incomingRow);
      usedIncomingKeys.add(key);
      continue;
    }
    merged.push(row);
  }
  for (const [key, row] of incomingByKey.entries()) {
    const groupId = String(row && row.groupId || "").trim();
    if (usedIncomingKeys.has(key) || replacedGroups.has(groupId)) continue;
    merged.push(row);
  }
  return merged;
}

function cleanDraftDate(raw) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "shared") return "shared";
  return value.replace(/[^\d.:-]/g, "").slice(0, 32) || "today";
}

function rakebackDraftKey(date) {
  return RAKEBACK_DRAFT_KEY_PREFIX + cleanDraftDate(date);
}

function rakebackDraftMetaKey(date) {
  return rakebackDraftKey(date) + ":meta";
}

async function readRakebackDraftMeta(date) {
  const results = await redisPipeline([["GET", rakebackDraftMetaKey(date)]]);
  const raw = results && results[0] && results[0].result;
  if (!raw) return { updatedAt: null };
  try {
    const parsed = JSON.parse(raw);
    return {
      updatedAt: parsed && parsed.updatedAt ? String(parsed.updatedAt) : null,
    };
  } catch (e) {
    return { updatedAt: null };
  }
}

async function writeRakebackDraftMeta(date, draft) {
  if (!draft || !draft.updatedAt) return;
  await redisPipeline([["SET", rakebackDraftMetaKey(date), JSON.stringify({
    updatedAt: draft.updatedAt,
    updatedBy: draft.updatedBy || "",
    rowsCount: Array.isArray(draft.rows) ? draft.rows.length : 0,
  })]]);
}

async function readRakebackDraft(date) {
  const results = await redisPipeline([["GET", rakebackDraftKey(date)]]);
  const raw = results && results[0] && results[0].result;
  if (!raw) return { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  try {
    const parsed = JSON.parse(raw);
    const deletedTemplates = normalizeRakebackDeletedTemplates(parsed && parsed.deletedTemplates);
    const deletedRows = normalizeRakebackDeletedRows(parsed && parsed.deletedRows);
    return {
      rows: filterDeletedRakebackRows(parsed && parsed.rows, deletedTemplates, deletedRows),
      deletedTemplates,
      deletedRows,
      updatedAt: parsed && parsed.updatedAt ? parsed.updatedAt : null,
      updatedBy: parsed && parsed.updatedBy ? parsed.updatedBy : "",
      historyResetAt: parsed && parsed.historyResetAt ? parsed.historyResetAt : "",
    };
  } catch (e) {
    return { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  }
}

async function enrichRakebackDraftWithReportDates(draft) {
  if (!draft || !Array.isArray(draft.rows) || draft.rows.length === 0) return draft || { rows: [], updatedAt: null };
  const reportIds = new Set(draft.rows.map((row) => String(row && row.reportId || "").trim()).filter(Boolean));
  if (reportIds.size === 0) return draft;
  const reports = await readReportsList();
  const reportById = new Map();
  for (const report of reports) {
    if (report && report.id) reportById.set(String(report.id), report);
  }
  return {
    ...draft,
    rows: draft.rows.map((row) => {
      if (!row || !row.reportId) return row;
      const report = reportById.get(String(row.reportId));
      const reportTime = normalizeRakebackRowTime((report && report.createdAt) || row.reportedAt);
      if (!reportTime) return row;
      const entryAddedAt = normalizeRakebackRowTime(row.entryAddedAt || row.firstAddedAt);
      const nextEntryAddedAt = entryAddedAt && entryAddedAt <= reportTime && reportTime - entryAddedAt <= RAKEBACK_ENTRY_REPORT_DRIFT_MS
        ? entryAddedAt
        : reportTime;
      return {
        ...row,
        createdAt: row.createdAt || reportTime,
        reportedAt: row.reportedAt || (report && report.createdAt) || String(reportTime),
        entryAddedAt: nextEntryAddedAt,
      };
    }),
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  let bodyPre = {};
  if (req.method !== "GET" && req.body != null) {
    try {
      bodyPre = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }
  const identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  const userId = memberIdFromIdentity(identity);
  const isAdminUser = identity && userId && isAdminReportIdentity(identity, userId);

  if (!isAdminUser) {
    return res.status(403).json({ ok: false, error: "Только для админов" });
  }

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Сервер не настроен" });
  }

  if (req.method === "GET") {
    if (req.query && (req.query.rakebackDraft === "1" || req.query.rakebackDraft === "true")) {
      const date = cleanDraftDate(req.query.date);
      const knownUpdatedAt = String((req.query && (req.query.knownUpdatedAt || req.query.updatedAt)) || "").trim();
      if (knownUpdatedAt) {
        const meta = await readRakebackDraftMeta(date);
        if (meta.updatedAt && meta.updatedAt === knownUpdatedAt) {
          return res.status(200).json({ ok: true, rakebackDraft: { notModified: true, updatedAt: meta.updatedAt } });
        }
      }
      let storedDraft = await readRakebackDraft(date);
      if (storedDraft.updatedAt) await writeRakebackDraftMeta(date, storedDraft);
      if (knownUpdatedAt && storedDraft.updatedAt && storedDraft.updatedAt === knownUpdatedAt) {
        return res.status(200).json({ ok: true, rakebackDraft: { notModified: true, updatedAt: storedDraft.updatedAt } });
      }
      storedDraft = { ...storedDraft, rows: filterDeletedRakebackRows(storedDraft.rows, storedDraft.deletedTemplates, storedDraft.deletedRows) };
      storedDraft = appendRecentReportRakebackRows(storedDraft, await readReportsList());
      storedDraft = ensureCurrentWeekRakebackCarryForwardRows(storedDraft);
      const draft = await enrichRakebackDraftWithReportDates(storedDraft);
      return res.status(200).json({ ok: true, rakebackDraft: draft });
    }
    const listScope = req.query && (req.query.scope || req.query.period || req.query.range);
    const scoped = await readReportsForListScope(listScope);
    return res.status(200).json({ ok: true, reports: scoped.reports, scope: scoped.scope, currentWeekStart: scoped.currentWeekStart, hasArchive: scoped.hasArchive });
  }

  if (req.method === "POST") {
    const body = bodyPre;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Body required" });
    }
    const action = String(body.action || "").trim().toLowerCase();
    if (action === "delete") {
      if (!isAdminReportIdentity(identity, userId)) {
        return res.status(403).json({ ok: false, error: "Нет доступа к удалению отправленных отчётов" });
      }
      if (!body.id) return res.status(400).json({ ok: false, error: "id required" });
      await deleteReportById(body.id);
      return res.status(200).json({ ok: true, deleted: body.id });
    }
    if (action === "rakeback_draft_save") {
      const date = cleanDraftDate(body.date);
      const previous = await readRakebackDraft(date);
      const canManageAll = canManageAllRakebackRows(identity, userId);
      if (!canWriteOwnRakebackRows(identity, userId)) {
        return res.status(403).json({ ok: false, error: "Нет доступа к редактированию рейкбек-черновика" });
      }
      const mergeOptions = { canManageAll };
      const incomingRows = normalizeRakebackRows(body.rakebackRows);
      const ignoreEmptyTemplateDeletesAfterReset = !!previous.historyResetAt && incomingRows.length === 0;
      const deletedTemplates = ignoreEmptyTemplateDeletesAfterReset
        ? []
        : mergeRakebackDeletedTemplates(previous.deletedTemplates, body.deletedTemplates, userId, mergeOptions);
      const deletedRows = ignoreEmptyTemplateDeletesAfterReset
        ? []
        : mergeRakebackDeletedRows(previous.deletedRows, body.deletedRows, userId, mergeOptions);
      const patchMode = body.rakebackPatch === true || body.patchRakebackRows === true;
      const mergeConfig = {
        canManageAll,
        allowAccountedOverwrite: canManageAll && body.allowAccountedRakebackOverwrite === true,
      };
      const rows = filterDeletedRakebackRows(patchMode
        ? mergeRakebackDraftPatchRows(
          previous.rows,
          incomingRows,
          body.deleteRakebackGroupIds || body.deletedRakebackGroupIds || body.deletedGroupIds,
          body.deleteRakebackRowKeys || body.deletedRakebackRowKeys || body.deletedRowKeys,
          userId,
          mergeConfig,
        )
        : mergeRakebackDraftRows(previous.rows, incomingRows, userId, mergeConfig), deletedTemplates, deletedRows);
      const draft = {
        rows,
        deletedTemplates,
        deletedRows,
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
        historyResetAt: previous.historyResetAt || (body.historyResetAt ? String(body.historyResetAt) : ""),
      };
      await redisPipeline([
        ["SET", rakebackDraftKey(date), JSON.stringify(draft)],
        ["SET", rakebackDraftMetaKey(date), JSON.stringify({
          updatedAt: draft.updatedAt,
          updatedBy: draft.updatedBy,
          rowsCount: rows.length,
        })],
      ]);
      return res.status(200).json({ ok: true, rakebackDraft: draft });
    }
    if (action === "rakeback_restore_report_rows") {
      const date = cleanDraftDate(body.date || "shared");
      const previous = await readRakebackDraft(date);
      const requestedWeekStart = Number(body.weekStart || body.weekStartMs);
      const targetWeekStart = Number.isFinite(requestedWeekStart)
        ? requestedWeekStart
        : currentReportWeekStartMs();
      const reports = await readReportsList();
      const restored = restoreReportRakebackRowsIntoDraft(previous, reports, targetWeekStart);
      const draft = {
        rows: restored.rows,
        deletedTemplates: restored.deletedTemplates,
        deletedRows: restored.deletedRows,
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
      };
      await redisPipeline([
        ["SET", rakebackDraftKey(date), JSON.stringify(draft)],
        ["SET", rakebackDraftMetaKey(date), JSON.stringify({
          updatedAt: draft.updatedAt,
          updatedBy: draft.updatedBy,
          rowsCount: draft.rows.length,
        })],
      ]);
      return res.status(200).json({
        ok: true,
        rakebackDraft: draft,
        restored: {
          targetWeekStart,
          rowsAdded: restored.restoredRows.length,
          deletedRowsRemoved: restored.restoredDeletedRowKeys.size,
          manualOnlyReports: restored.manualOnlyReports,
        },
      });
    }

    const authorName =
      (identity.firstName && String(identity.firstName).trim()) ||
      (identity.telegramUsername ? "@" + String(identity.telegramUsername).replace(/^@+/, "") : "") ||
      (identity.pwaUsername ? "@" + String(identity.pwaUsername).replace(/^@+/, "") : "") ||
      "Админ";
    const tgNumericId = identity.vkId != null ? null : identity.id;
    const report = {
      id: Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8),
      createdAt: createdAtISOForReport(tgNumericId != null ? String(tgNumericId) : ""),
      authorId: userId,
      authorName: authorName.trim() || "Админ",
      date: body.date || "",
      weekday: body.weekday || "",
      comment: body.comment || "",
      total: body.total != null ? body.total : 0,
      deposit: body.deposit,
      cashout: body.cashout,
      prodamus: body.prodamus,
      robokassa: body.robokassa,
      romaCrypto: body.romaCrypto,
      botCryptoDep: body.botCryptoDep,
      botExchipDep: body.botExchipDep,
      botExchipCashout: body.botExchipCashout,
      bonuses: body.bonuses,
      transfers: body.transfers,
      ret: body.ret,
      sergeyMarina: body.sergeyMarina,
      rakeback: body.rakeback,
      rakebackRows: normalizeRakebackRows(body.rakebackRows),
      extraName: body.extraName,
      extraAmount: body.extraAmount,
      extraFields: Array.isArray(body.extraFields) ? body.extraFields : [],
    };

    const json = JSON.stringify(report);
    await redisPipeline([["LPUSH", REDIS_KEY, json], ["LTRIM", REDIS_KEY, "0", String(MAX_REPORTS - 1)]]);
    await clearReportListCache();

    // Дублируем отчёт в Telegram (личные сообщения админам) — выводим все пункты.
    let telegramNotify = { attempted: false, sent: [], failed: [] };
    if (BOT_TOKEN && REPORT_NOTIFY_ADMIN_IDS.length > 0) {
      function escVal(v) {
        if (v == null || v === "") return "—";
        return String(v);
      }
      const lines = [];
      lines.push("📄 Отчёт за смену");
      if (report.weekday || report.date) lines.push(((report.weekday || "").toString().trim() ? report.weekday : "") + (report.date ? " · " + report.date : ""));
      if (report.authorName) lines.push("Отправил: " + report.authorName);
      lines.push("Депозит: " + escVal(report.deposit) + " ₽");
      lines.push("Выводы: " + escVal(report.cashout) + " ₽");
      lines.push("Продамус: " + escVal(report.prodamus) + " ₽");
      lines.push("Робокасса: " + escVal(report.robokassa) + " ₽");
      lines.push("Рома крипта: " + escVal(report.romaCrypto) + " ₽");
      lines.push("Бот крипта деп: " + escVal(report.botCryptoDep) + " ₽");
      lines.push("Бот эксчип деп: " + escVal(report.botExchipDep) + " ₽");
      lines.push("Бот эксчип вывод: " + escVal(report.botExchipCashout) + " ₽");
      lines.push("Бонусы: " + escVal(report.bonuses) + " ₽");
      lines.push("Переводы: " + escVal(report.transfers) + " ₽");
      lines.push("Возврат: " + escVal(report.ret) + " ₽");
      lines.push("Сергей/Марина: " + escVal(report.sergeyMarina) + " ₽");
      // Доп. строки: либо extraFields (актуальный форма), либо legacy extraName/extraAmount — не оба,
      // иначе одна и та же сумма дублируется (клиент шлёт и массив, и агрегат в extraAmount).
      if (Array.isArray(report.extraFields) && report.extraFields.length > 0) {
        report.extraFields.forEach((f) => {
          const name = (f && (f.name != null ? f.name : f.extraName)) != null ? String(f.name || f.extraName) : "Доп.";
          const amount = f && (f.amount != null || f.extraAmount != null) ? (f.amount != null ? f.amount : f.extraAmount) : "—";
          lines.push(name + ": " + escVal(amount) + " ₽");
        });
      } else if (report.extraName || report.extraAmount != null) {
        lines.push(escVal(report.extraName) + ": " + escVal(report.extraAmount) + " ₽");
      }
      if (report.rakeback != null && report.rakeback !== "") lines.push("Рейкбек: " + escVal(report.rakeback) + " ₽");
      if (report.comment) lines.push("Комментарий: " + escVal(report.comment));
      const notifyResults = await Promise.all(REPORT_NOTIFY_ADMIN_IDS.map((adminId) => sendTelegramMessage(adminId, lines.join("\n"))));
      telegramNotify = {
        attempted: true,
        sent: notifyResults.filter((item) => item && item.ok).map((item) => item.chatId),
        failed: notifyResults.filter((item) => !item || !item.ok).map((item) => ({
          chatId: item && item.chatId ? item.chatId : "",
          error: item && item.error ? item.error : "unknown",
        })),
      };
    }
    return res.status(200).json({ ok: true, report, telegramNotify });
  }

  if (req.method === "PUT") {
    const body = bodyPre;
    if (!body || typeof body !== "object" || !body.id) {
      return res.status(400).json({ ok: false, error: "Body must contain id" });
    }
    if (!isAdminReportIdentity(identity, userId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к редактированию отправленных отчётов" });
    }
    const results = await redisPipeline([["LRANGE", REDIS_KEY, "0", String(MAX_REPORTS - 1)]]);
    const rawList = results && results[0] && results[0].result;
    const list = Array.isArray(rawList) ? rawList : [];
    let found = null;
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      try {
        const r = JSON.parse(list[i]);
        if (r.id === body.id) {
          found = r;
          index = i;
          break;
        }
      } catch (e) {}
    }
    if (!found || index < 0) {
      return res.status(404).json({ ok: false, error: "Отчёт не найден" });
    }
    const updated = {
      id: found.id,
      createdAt: found.createdAt,
      authorId: found.authorId,
      authorName: found.authorName,
      date: body.date != null ? body.date : found.date,
      weekday: body.weekday != null ? body.weekday : found.weekday,
      comment: body.comment != null ? body.comment : found.comment,
      total: body.total != null ? body.total : found.total,
      deposit: body.deposit,
      cashout: body.cashout,
      prodamus: body.prodamus,
      robokassa: body.robokassa,
      romaCrypto: body.romaCrypto,
      botCryptoDep: body.botCryptoDep,
      botExchipDep: body.botExchipDep,
      botExchipCashout: body.botExchipCashout,
      bonuses: body.bonuses,
      transfers: body.transfers,
      ret: body.ret,
      sergeyMarina: body.sergeyMarina,
      rakeback: body.rakeback != null ? body.rakeback : found.rakeback,
      rakebackRows: Array.isArray(body.rakebackRows) ? normalizeRakebackRows(body.rakebackRows) : (found.rakebackRows || []),
      extraName: body.extraName,
      extraAmount: body.extraAmount,
      extraFields: Array.isArray(body.extraFields) ? body.extraFields : (found.extraFields || []),
    };
    const updatedJson = JSON.stringify(updated);
    await redisPipeline([["LSET", REDIS_KEY, String(index), updatedJson]]);
    await clearReportListCache();
    return res.status(200).json({ ok: true, report: updated });
  }

  if (req.method === "DELETE") {
    let body = { ...bodyPre };
    if (req.query && req.query.id) body.id = req.query.id;
    if (!body || typeof body !== "object" || !body.id) {
      return res.status(400).json({ ok: false, error: "id required" });
    }
    if (!isAdminReportIdentity(identity, userId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к удалению отправленных отчётов" });
    }
    await deleteReportById(body.id);
    return res.status(200).json({ ok: true, deleted: body.id });
  }

  return res.status(405).json({ ok: false, error: "GET, POST, PUT or DELETE only" });
};
