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
const RAKEBACK_FULL_ACCESS_IDS = new Set(["388008256", "2144406710", "1897001087"]);
const RAKEBACK_FULL_ACCESS_USERNAMES = new Set(["roman1787443", "roman1_matvienko"]);
const RAKEBACK_ROW_COLORS = new Set(["#332411", "#173520", "#152b46", "#331b24", "#2d2344", "#26313a"]);
const REPORT_DAY_MS = 24 * 60 * 60 * 1000;
const REPORT_WEEK_MS = 7 * REPORT_DAY_MS;
const REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
const REPORT_NOTIFY_ADMIN_IDS = Array.from(new Set([].concat(REPORT_ADMIN_IDS || [], ADMIN_IDS || [])
  .map((id) => String(id || "").replace(/^tg_/, "").trim())
  .filter(Boolean)));

/** Храним реальное время сохранения; отчётную дату по cutoff 16:00 МСК считает фронт. */
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
      const reportedAmountRaw = row.reportedAmount != null ? toReportNumber(row.reportedAmount) : amount;
      const reportedAmount = Math.round(reportedAmountRaw * 100) / 100;
      const color = normalizeRakebackRowColor(row.color || row.rowColor || row.highlightColor);
      const createdAt = normalizeRakebackRowTime(row.createdAt || row.addedAt || row.created);
      const standardAt = normalizeRakebackRowTime(row.standardAt || row.orderAt || row.sortAt || createdAt);
      const carryForward = row.carryForward === true || row.templateCarryForward === true;
      const templateLike = !carryForward && !rakeZero && rake === 0 && percent === 0 && amount === 0;
      const reportedAt = templateLike ? "" : String(row.reportedAt || "").trim();
      const reportId = templateLike ? "" : String(row.reportId || "").trim();
      const accounted = !templateLike && (row.accounted === true || !!reportedAt || !!reportId);
      const saved = row.saved === true && !templateLike;
      const hasEntryData = !templateLike && (rake !== 0 || rakeZero || amount !== 0 || saved || accounted);
      const reportedAtTime = normalizeRakebackRowTime(reportedAt);
      let entryAddedAt = normalizeRakebackRowTime(row.entryAddedAt || row.firstAddedAt || (hasEntryData ? row.addedAt : ""));
      if (reportedAtTime && (!entryAddedAt || reportedAtTime < entryAddedAt)) entryAddedAt = reportedAtTime;
      if (reportedAtTime && entryAddedAt && reportedAtTime - entryAddedAt > RAKEBACK_ENTRY_REPORT_DRIFT_MS) entryAddedAt = reportedAtTime;
      if (hasEntryData && createdAt && !entryAddedAt) entryAddedAt = createdAt;
      if (!room && !playerId && rake === 0 && percent === 0 && amount === 0 && !carryForward) return null;
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
        discount15: row.discount15 === true || row.subtract15 === true,
        saved,
        ownerId: String(row.ownerId || row.authorId || "").trim(),
        color,
        createdAt,
        standardAt,
        entryAddedAt: entryAddedAt || (hasEntryData ? (createdAt || reportedAtTime) : ""),
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
  const currentWeekStart = weekStartMsForReport(Date.now());
  const previousWeekStart = currentWeekStart - REPORT_WEEK_MS;
  const seen = new Set(rows.map(rakebackHistoryRowKey));
  const deletedKeys = new Set(normalizeRakebackDeletedTemplates(baseDraft.deletedTemplates).map(rakebackDeletedRowKey).filter(Boolean));
  const deletedRowKeys = new Set(normalizeRakebackDeletedRows(baseDraft.deletedRows).map(rakebackDeletedStoredRowKey).filter(Boolean));
  let latestCurrentWeekReportDay = 0;
  for (const report of Array.isArray(reports) ? reports : []) {
    const reportTime = normalizeRakebackRowTime(report && report.createdAt);
    if (!reportTime || weekStartMsForReport(reportTime) !== currentWeekStart) continue;
    if (!Array.isArray(report && report.rakebackRows) || report.rakebackRows.length === 0) continue;
    latestCurrentWeekReportDay = Math.max(latestCurrentWeekReportDay, dayStartMsForReport(reportTime));
  }
  const appended = [];
  for (const report of Array.isArray(reports) ? reports : []) {
    const reportTime = normalizeRakebackRowTime(report && report.createdAt);
    const reportWeekStart = reportTime ? weekStartMsForReport(reportTime) : NaN;
    if (!reportTime || (reportWeekStart !== currentWeekStart && reportWeekStart !== previousWeekStart)) continue;
    if (reportWeekStart === currentWeekStart && latestCurrentWeekReportDay && dayStartMsForReport(reportTime) < latestCurrentWeekReportDay) continue;
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
      if (deletedRowKeys.has(rakebackDeletedStoredRowKey(historyRow))) continue;
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

function ensureCurrentWeekRakebackCarryForwardRows(draft) {
  const baseDraft = draft || { rows: [], deletedTemplates: [], deletedRows: [], updatedAt: null };
  const rows = filterDeletedRakebackRows(baseDraft.rows, baseDraft.deletedTemplates, baseDraft.deletedRows);
  const currentWeekStart = weekStartMsForReport(Date.now());
  const previousWeekStart = currentWeekStart - REPORT_WEEK_MS;
  const currentKeys = new Set();
  const latestPreviousByKey = new Map();
  for (const row of rows) {
    const key = rakebackCarryForwardKey(row);
    if (!key) continue;
    const stamp = rakebackRowTimelineMs(row);
    const weekStart = stamp ? weekStartMsForReport(stamp) : NaN;
    if (weekStart === currentWeekStart) currentKeys.add(key);
    if (weekStart === previousWeekStart) {
      const prev = latestPreviousByKey.get(key);
      if (!prev || rakebackRowTimelineMs(prev) <= stamp) latestPreviousByKey.set(key, row);
    }
  }
  const now = Date.now();
  const appended = [];
  for (const [key, row] of latestPreviousByKey.entries()) {
    if (currentKeys.has(key)) continue;
    appended.push({
      groupId: "",
      kind: "base",
      room: row.room || "Покер21",
      playerId: row.playerId || "",
      rake: 0,
      rakeZero: false,
      percent: row.percent || 0,
      carryForward: true,
      discount15: !!row.discount15,
      saved: false,
      ownerId: row.ownerId || "",
      color: row.color || "",
      createdAt: now,
      standardAt: now,
      entryAddedAt: now,
      amount: 0,
      reportedAmount: 0,
      accounted: false,
      reportedAt: "",
      reportId: "",
    });
    currentKeys.add(key);
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

function mergeRakebackDeletedTemplates(existingItems, incomingItems, userId) {
  const byKey = new Map();
  for (const item of normalizeRakebackDeletedTemplates(existingItems)) {
    byKey.set(String(item.room || "").trim() + "\u0000" + String(item.playerId || "").trim(), item);
  }
  for (const item of normalizeRakebackDeletedTemplates(incomingItems)) {
    const key = String(item.room || "").trim() + "\u0000" + String(item.playerId || "").trim();
    if (!key || key === "\u0000") continue;
    byKey.set(key, {
      ...item,
      deletedBy: item.deletedBy || userId || "",
    });
  }
  return Array.from(byKey.values());
}

function mergeRakebackDeletedRows(existingItems, incomingItems, userId) {
  const byKey = new Map();
  for (const item of normalizeRakebackDeletedRows(existingItems)) {
    byKey.set(rakebackDeletedStoredRowKey(item), item);
  }
  for (const item of normalizeRakebackDeletedRows(incomingItems)) {
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
    if (RAKEBACK_FULL_ACCESS_IDS.has(normalized)) return true;
  }
  const usernames = [
    identity && identity.telegramUsername,
    identity && identity.pwaUsername,
    identity && identity.username,
  ];
  for (const username of usernames) {
    const normalized = String(username || "").replace(/^@+/, "").trim().toLowerCase();
    if (RAKEBACK_FULL_ACCESS_USERNAMES.has(normalized)) return true;
  }
  return false;
}

function rakebackRowStorageKey(row) {
  if (!row) return "";
  return [
    String(row.groupId || "").trim(),
    row.kind === "addon" ? "addon" : "base",
    String(row.room || "").trim(),
    String(row.playerId || "").trim(),
    String(row.reportId || "").trim(),
    String(row.reportedAt || "").trim(),
  ].join("|");
}

function isRakebackRowAccounted(row) {
  return !!(row && (row.accounted === true || row.reportedAt || row.reportId));
}

function mergeRakebackDraftRows(existingRows, incomingRows, userId, options = {}) {
  const currentUserId = String(userId || "").trim();
  if (options.canManageAll) {
    if (options.allowAccountedOverwrite) {
      return normalizeRakebackRows(incomingRows).map((row) => ({
        ...row,
        ownerId: row.ownerId || currentUserId,
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
      ownerId: row.ownerId || currentUserId,
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
    ownerId: currentUserId,
  }));
  const kept = normalizeRakebackRows(existingRows).filter((row) => {
    if (!row.ownerId) return false;
    return row.ownerId !== currentUserId;
  });
  return kept.concat(incoming);
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
    const reports = await readReportsList();
    return res.status(200).json({ ok: true, reports });
  }

  if (req.method === "POST") {
    const body = bodyPre;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Body required" });
    }
    const action = String(body.action || "").trim().toLowerCase();
    if (action === "delete") {
      if (!body.id) return res.status(400).json({ ok: false, error: "id required" });
      await deleteReportById(body.id);
      return res.status(200).json({ ok: true, deleted: body.id });
    }
    if (action === "rakeback_draft_save") {
      const date = cleanDraftDate(body.date);
      const previous = await readRakebackDraft(date);
      const canManageAll = canManageAllRakebackRows(identity, userId);
      const deletedTemplates = mergeRakebackDeletedTemplates(previous.deletedTemplates, body.deletedTemplates, userId);
      const deletedRows = mergeRakebackDeletedRows(previous.deletedRows, body.deletedRows, userId);
      const rows = filterDeletedRakebackRows(mergeRakebackDraftRows(previous.rows, body.rakebackRows, userId, {
        canManageAll,
        allowAccountedOverwrite: canManageAll && body.allowAccountedRakebackOverwrite === true,
      }), deletedTemplates, deletedRows);
      const draft = {
        rows,
        deletedTemplates,
        deletedRows,
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
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
      if (report.rakeback != null && report.rakeback !== "") lines.push("Рейкбек: " + escVal(report.rakeback) + " ₽");
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
    return res.status(200).json({ ok: true, report: updated });
  }

  if (req.method === "DELETE") {
    let body = { ...bodyPre };
    if (req.query && req.query.id) body.id = req.query.id;
    if (!body || typeof body !== "object" || !body.id) {
      return res.status(400).json({ ok: false, error: "id required" });
    }
    await deleteReportById(body.id);
    return res.status(200).json({ ok: true, deleted: body.id });
  }

  return res.status(405).json({ ok: false, error: "GET, POST, PUT or DELETE only" });
};
