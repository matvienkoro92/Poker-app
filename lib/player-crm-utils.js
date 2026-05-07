"use strict";

function normalizeCrmEmail(value) {
  return String(value || "").replace(/^@+/, "").trim().toLowerCase();
}

function nowIso() {
  return new Date().toISOString();
}

function daysAgoFromMs(ms) {
  const n = Number(ms);
  if (!Number.isFinite(n) || n <= 0) return 999;
  return Math.max(0, Math.floor((Date.now() - n) / 86400000));
}

function daysAgoFromIso(iso) {
  const ms = Date.parse(String(iso || ""));
  return Number.isFinite(ms) ? daysAgoFromMs(ms) : 999;
}

function normalizeDateOnly(value) {
  const s = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const ms = Date.parse(s + "T00:00:00.000Z");
  return Number.isFinite(ms) ? s : "";
}

function rangeFromInput(input) {
  const raw = input && typeof input === "object" ? input : {};
  let from = normalizeDateOnly(raw.from);
  let to = normalizeDateOnly(raw.to);
  if (!from || !to) return null;
  if (from > to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return {
    key: "custom",
    from,
    to,
    fromMs: Date.parse(from + "T00:00:00.000Z"),
    toMs: Date.parse(to + "T23:59:59.999Z"),
  };
}

function periodFromInput(value) {
  const s = String(value || "").trim();
  return [
    "7",
    "30",
    "90",
    "today",
    "yesterday",
    "month_2026_02",
    "month_2026_03",
    "month_2026_04",
    "month_2026_05",
    "period_2026_02_04",
    "current_week",
    "last_week",
    "current_month",
    "last_month",
    "all",
  ].includes(s) ? s : "30";
}

function rangeForPeriodKey(key) {
  const normalized = periodFromInput(key);
  if (normalized === "all") return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function out(rangeKey, fromDate, toDate) {
    return {
      key: rangeKey,
      from: dateKey(fromDate),
      to: dateKey(toDate),
      fromMs: new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime(),
      toMs: new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999).getTime(),
    };
  }
  if (normalized === "month_2026_02") {
    return out(normalized, new Date(2026, 1, 1), new Date(2026, 1, 28));
  }
  if (normalized === "month_2026_03") {
    return out(normalized, new Date(2026, 2, 1), new Date(2026, 2, 31));
  }
  if (normalized === "month_2026_04") {
    return out(normalized, new Date(2026, 3, 1), new Date(2026, 3, 30));
  }
  if (normalized === "month_2026_05") {
    return out(normalized, new Date(2026, 4, 1), new Date(2026, 4, 31));
  }
  if (normalized === "period_2026_02_04") {
    return out(normalized, new Date(2026, 1, 1), new Date(2026, 3, 30));
  }
  if (normalized === "today") {
    return out(normalized, today, today);
  }
  if (normalized === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return out(normalized, yesterday, yesterday);
  }
  if (normalized === "current_week") {
    const day = today.getDay() || 7;
    const from = new Date(today);
    from.setDate(today.getDate() - day + 1);
    return out(normalized, from, today);
  }
  if (normalized === "last_week") {
    const day = today.getDay() || 7;
    const to = new Date(today);
    to.setDate(today.getDate() - day);
    const from = new Date(to);
    from.setDate(to.getDate() - 6);
    return out(normalized, from, to);
  }
  if (normalized === "current_month") {
    return out(normalized, new Date(today.getFullYear(), today.getMonth(), 1), today);
  }
  if (normalized === "last_month") {
    return out(normalized, new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0));
  }
  const days = Math.max(1, Number(normalized) || 30);
  const toMs = Date.now();
  return {
    key: String(days),
    from: new Date(toMs - (days - 1) * 86400000).toISOString().slice(0, 10),
    to: new Date(toMs).toISOString().slice(0, 10),
    fromMs: toMs - days * 86400000,
    toMs,
  };
}

function eventInRange(event, range) {
  if (!range) return false;
  const ms = Date.parse(String(event && event.at ? event.at : ""));
  return Number.isFinite(ms) && ms >= range.fromMs && ms <= range.toMs;
}

function msInRange(ms, range) {
  return range && Number.isFinite(ms) && ms >= range.fromMs && ms <= range.toMs;
}

function safeJson(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return fallback;
  }
}

function redisSet(raw) {
  return new Set(Array.isArray(raw) ? raw.map((x) => String(x)) : []);
}

function normalizeTgId(id) {
  const s = String(id || "").trim();
  if (!s) return "";
  if (s.startsWith("tg_")) return s;
  if (/^\d+$/.test(s)) return "tg_" + s;
  return s;
}

function toNumericTelegramId(id) {
  const s = String(id || "").replace(/^tg_/, "").trim();
  return /^\d+$/.test(s) ? s : "";
}

function personalChatKey(id1, id2) {
  const a = String(id1 || "").replace(/^tg_/, "");
  const b = String(id2 || "").replace(/^tg_/, "");
  return "poker_app:chat:" + (a < b ? a + "_" + b : b + "_" + a);
}

function unique(arr) {
  return [...new Set((arr || []).map((x) => String(x || "").trim()).filter(Boolean))];
}

function isoFromMs(value) {
  const ms = Number(value);
  return Number.isFinite(ms) && ms > 0 ? new Date(ms).toISOString() : "";
}

function dateKeyFromMs(ms) {
  const n = Number(ms);
  return Number.isFinite(n) && n > 0 ? new Date(n).toISOString().slice(0, 10) : "";
}

function dateKeyFromIso(value) {
  const ms = Date.parse(String(value || ""));
  return dateKeyFromMs(ms);
}

function earliestIso(values) {
  let best = 0;
  (Array.isArray(values) ? values : []).forEach((value) => {
    let ms = 0;
    if (typeof value === "number" || /^\d+$/.test(String(value || ""))) {
      ms = Number(value);
    } else {
      ms = Date.parse(String(value || ""));
    }
    if (Number.isFinite(ms) && ms > 0 && (!best || ms < best)) best = ms;
  });
  return best ? new Date(best).toISOString() : "";
}

function addDaily(map, date, amount) {
  const key = normalizeDateOnly(date);
  if (!key) return;
  map[key] = (Number(map[key]) || 0) + (Number(amount) || 0);
}

function mapTotal(map) {
  return Object.values(map || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function dateKeysBetween(from, to) {
  const start = Date.parse(from + "T00:00:00.000Z");
  const end = Date.parse(to + "T00:00:00.000Z");
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) return [];
  const out = [];
  for (let ms = start; ms <= end; ms += 86400000) out.push(new Date(ms).toISOString().slice(0, 10));
  return out;
}

function crmDateInRange(value, range) {
  if (!range) return true;
  const ms = Date.parse(String(value || ""));
  return Number.isFinite(ms) && ms >= range.fromMs && ms <= range.toMs;
}

module.exports = {
  normalizeCrmEmail,
  nowIso,
  daysAgoFromMs,
  daysAgoFromIso,
  normalizeDateOnly,
  rangeFromInput,
  periodFromInput,
  rangeForPeriodKey,
  eventInRange,
  msInRange,
  safeJson,
  redisSet,
  normalizeTgId,
  toNumericTelegramId,
  personalChatKey,
  unique,
  isoFromMs,
  dateKeyFromMs,
  dateKeyFromIso,
  earliestIso,
  addDaily,
  mapTotal,
  dateKeysBetween,
  crmDateInRange,
};
