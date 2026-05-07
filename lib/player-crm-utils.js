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

const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;

function mskDateKeyFromMs(value) {
  const ms = Number(value);
  return Number.isFinite(ms) && ms > 0 ? new Date(ms + MSK_OFFSET_MS).toISOString().slice(0, 10) : "";
}

function addDaysToDateKey(key, days) {
  const ms = Date.parse(String(key || "") + "T00:00:00.000Z");
  return Number.isFinite(ms) ? new Date(ms + (Number(days) || 0) * 86400000).toISOString().slice(0, 10) : "";
}

function rangeFromMskDateKeys(rangeKey, from, to) {
  function parts(key) {
    const m = String(key || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) } : null;
  }
  const a = parts(from);
  const b = parts(to);
  if (!a || !b) return null;
  return {
    key: rangeKey,
    from,
    to,
    fromMs: Date.UTC(a.y, a.m - 1, a.d) - MSK_OFFSET_MS,
    toMs: Date.UTC(b.y, b.m - 1, b.d + 1) - MSK_OFFSET_MS - 1,
  };
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
  return rangeFromMskDateKeys("custom", from, to);
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
  const today = mskDateKeyFromMs(Date.now());
  function out(rangeKey, from, to) { return rangeFromMskDateKeys(rangeKey, from, to); }
  if (normalized === "month_2026_02") {
    return out(normalized, "2026-02-01", "2026-02-28");
  }
  if (normalized === "month_2026_03") {
    return out(normalized, "2026-03-01", "2026-03-31");
  }
  if (normalized === "month_2026_04") {
    return out(normalized, "2026-04-01", "2026-04-30");
  }
  if (normalized === "month_2026_05") {
    return out(normalized, "2026-05-01", "2026-05-31");
  }
  if (normalized === "period_2026_02_04") {
    return out(normalized, "2026-02-01", "2026-04-30");
  }
  if (normalized === "today") {
    return out(normalized, today, today);
  }
  if (normalized === "yesterday") {
    const yesterday = addDaysToDateKey(today, -1);
    return out(normalized, yesterday, yesterday);
  }
  if (normalized === "current_week") {
    const day = new Date(today + "T00:00:00.000Z").getUTCDay() || 7;
    const from = addDaysToDateKey(today, -day + 1);
    return out(normalized, from, today);
  }
  if (normalized === "last_week") {
    const day = new Date(today + "T00:00:00.000Z").getUTCDay() || 7;
    const to = addDaysToDateKey(today, -day);
    const from = addDaysToDateKey(to, -6);
    return out(normalized, from, to);
  }
  if (normalized === "current_month") {
    return out(normalized, today.slice(0, 8) + "01", today);
  }
  if (normalized === "last_month") {
    const y = Number(today.slice(0, 4));
    const m = Number(today.slice(5, 7));
    const first = new Date(Date.UTC(y, m - 2, 1)).toISOString().slice(0, 10);
    const last = new Date(Date.UTC(y, m - 1, 0)).toISOString().slice(0, 10);
    return out(normalized, first, last);
  }
  const days = Math.max(1, Number(normalized) || 30);
  return out(String(days), addDaysToDateKey(today, -(days - 1)), today);
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
  return mskDateKeyFromMs(ms);
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
  mskDateKeyFromMs,
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
