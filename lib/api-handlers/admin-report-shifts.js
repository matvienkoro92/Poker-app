const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Отчёты админов за смену (общие для всех админов).
 * GET /api/admin-report-shifts?initData=... — список отчётов (только админ).
 * POST /api/admin-report-shifts — сохранить отчёт (body: initData + поля отчёта, только админ).
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { REPORT_ADMIN_IDS, isAdminReportIdentity } = require("../admin-report-access");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const REDIS_KEY = "poker_app:admin_report_shifts";
const RAKEBACK_DRAFT_KEY_PREFIX = "poker_app:admin_report_rakeback_draft:";
const MAX_REPORTS = 500;
/** Смена Вики до 03:00 МСК — отчёт за предыдущий календарный день (createdAt для учёта недель). */
const VIKA_TELEGRAM_ID = "1897001087";

function moscowYMDH(date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    hour12: false,
  });
  const parts = f.formatToParts(date);
  const o = {};
  for (const p of parts) {
    if (p.type !== "literal") o[p.type] = p.value;
  }
  return {
    y: o.year,
    m: o.month,
    d: o.day,
    h: parseInt(o.hour, 10) || 0,
  };
}

function prevCalendarDayYMD(y, m, d) {
  const dt = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  dt.setUTCDate(dt.getUTCDate() - 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return { y: String(yy), m: mm, d: dd };
}

/** Для новых отчётов Вики ночью (00–02 МСК) — метка времени на конец «вчерашней» смены. */
function createdAtISOForReport(userId) {
  const now = new Date();
  if (String(userId) !== VIKA_TELEGRAM_ID) return now.toISOString();
  const p = moscowYMDH(now);
  if (p.h >= 3) return now.toISOString();
  const pd = prevCalendarDayYMD(p.y, p.m, p.d);
  return new Date(`${pd.y}-${pd.m}-${pd.d}T23:30:00+03:00`).toISOString();
}

async function sendTelegramMessage(chatId, text) {
  if (!BOT_TOKEN || !chatId) return;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: String(chatId), text: text || "", disable_web_page_preview: true }),
    });
  } catch (e) {}
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

function toReportNumber(raw) {
  const n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function normalizeRakebackRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const room = String(row.room || "").trim();
      const playerId = String(row.playerId || row.id || "").trim();
      const rake = toReportNumber(row.rake);
      const percent = toReportNumber(row.percent);
      const amountRaw = row.amount != null ? toReportNumber(row.amount) : rake * percent / 100;
      const amount = Math.round(amountRaw * 100) / 100;
      if (!room && !playerId && rake === 0 && percent === 0 && amount === 0) return null;
      return {
        groupId: String(row.groupId || "").trim(),
        kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
        room: room || "Покер21",
        playerId,
        rake,
        percent,
        discount15: row.discount15 === true || row.subtract15 === true,
        saved: row.saved === true,
        ownerId: String(row.ownerId || row.authorId || "").trim(),
        amount,
      };
    })
    .filter(Boolean);
}

function rakebackRowSignature(row) {
  if (!row) return "";
  return [
    row.groupId || "",
    row.kind || "base",
    row.room || "",
    row.playerId || "",
    row.rake,
    row.percent,
    row.discount15 ? "1" : "0",
    row.amount,
  ].join("|");
}

function mergeRakebackDraftRows(existingRows, incomingRows, userId) {
  const currentUserId = String(userId || "").trim();
  const incoming = normalizeRakebackRows(incomingRows).map((row) => ({
    ...row,
    ownerId: row.ownerId || currentUserId,
  }));
  const incomingOwners = new Set(incoming.map((row) => row.ownerId).filter(Boolean));
  const incomingSignatures = new Set(incoming.map(rakebackRowSignature));
  const kept = normalizeRakebackRows(existingRows).filter((row) => {
    if (!row.ownerId) return !incomingSignatures.has(rakebackRowSignature(row));
    if (row.ownerId === currentUserId) return false;
    return !incomingOwners.has(row.ownerId);
  });
  return kept.concat(incoming);
}

function cleanDraftDate(raw) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "shared") return "shared";
  return value.replace(/[^\d.:-]/g, "").slice(0, 32) || "today";
}

async function readRakebackDraft(date) {
  const key = RAKEBACK_DRAFT_KEY_PREFIX + cleanDraftDate(date);
  const results = await redisPipeline([["GET", key]]);
  const raw = results && results[0] && results[0].result;
  if (!raw) return { rows: [], updatedAt: null };
  try {
    const parsed = JSON.parse(raw);
    return {
      rows: normalizeRakebackRows(parsed && parsed.rows),
      updatedAt: parsed && parsed.updatedAt ? parsed.updatedAt : null,
    };
  } catch (e) {
    return { rows: [], updatedAt: null };
  }
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
      const draft = await readRakebackDraft(req.query.date);
      return res.status(200).json({ ok: true, rakebackDraft: draft });
    }
    const results = await redisPipeline([["LRANGE", REDIS_KEY, "0", String(MAX_REPORTS - 1)]]);
    const rawList = results && results[0] && results[0].result;
    const list = Array.isArray(rawList) ? rawList : [];
    const reports = [];
    for (const str of list) {
      try {
        reports.push(JSON.parse(str));
      } catch (e) {}
    }
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
      const rows = mergeRakebackDraftRows(previous.rows, body.rakebackRows, userId);
      const draft = {
        rows,
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
      };
      await redisPipeline([["SET", RAKEBACK_DRAFT_KEY_PREFIX + date, JSON.stringify(draft)]]);
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
    if (BOT_TOKEN && Array.isArray(REPORT_ADMIN_IDS) && REPORT_ADMIN_IDS.length > 0) {
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
      if (Array.isArray(report.rakebackRows) && report.rakebackRows.length > 0) {
        report.rakebackRows.forEach((row) => {
          const label = [row.room, row.playerId].filter(Boolean).join(" · ");
          if (!label) return;
          lines.push("Рейкбек " + label + ": " + escVal(row.rake) + " × " + escVal(row.percent) + "% = " + escVal(row.amount) + " ₽");
        });
      }
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
      await Promise.all(REPORT_ADMIN_IDS.map((adminId) => sendTelegramMessage(adminId, lines.join("\n"))));
    }
    return res.status(200).json({ ok: true, report });
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
