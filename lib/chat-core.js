"use strict";

const TELEGRAM_ROMAN_NUMERIC = String(process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256").replace(/^tg_/, "");

function isGroupChatId(s) {
  const t = String(s || "").trim();
  return /^group_[a-z0-9_]{8,72}$/i.test(t);
}

function normalizePeerChatUserId(raw) {
  const s = String(raw || "").trim();
  if (!s) return s;
  if (isGroupChatId(s)) return s;
  if (s.toLowerCase() === "tg_roman") return "tg_" + TELEGRAM_ROMAN_NUMERIC;
  if (s.startsWith("tg_") || s.startsWith("vk_")) return s;
  return "tg_" + s;
}

function normalizeStoredMessageFromId(from) {
  if (from == null || from === "") return from;
  const s = String(from).trim();
  if (s.startsWith("tg_") || s.startsWith("vk_") || s.startsWith("guest_")) return s;
  if (/^\d+$/.test(s)) return `tg_${s}`;
  return s;
}

function chatMessageTimeMs(t) {
  if (t == null || t === "") return NaN;
  const ms = Date.parse(String(t).trim());
  return Number.isNaN(ms) ? NaN : ms;
}

function chatMessageIsNewerThanLastViewed(messageTime, lastViewed) {
  const msgMs = chatMessageTimeMs(messageTime);
  if (Number.isNaN(msgMs)) return false;
  if (lastViewed == null || lastViewed === "") return true;
  const lastMs = chatMessageTimeMs(lastViewed);
  if (Number.isNaN(lastMs)) return true;
  return msgMs > lastMs;
}

function mergeReadCursors(isoA, isoB) {
  const a = isoA != null ? String(isoA).trim() : "";
  const b = isoB != null ? String(isoB).trim() : "";
  const ma = chatMessageTimeMs(a);
  const mb = chatMessageTimeMs(b);
  const na = Number.isNaN(ma);
  const nb = Number.isNaN(mb);
  if (na && nb) return "";
  if (na) return b;
  if (nb) return a;
  return mb >= ma ? b : a;
}

function convKey(id1, id2) {
  const a = String(id1).replace(/^tg_/, "");
  const b = String(id2).replace(/^tg_/, "");
  return "poker_app:chat:" + (a < b ? a + "_" + b : b + "_" + a);
}

module.exports = {
  TELEGRAM_ROMAN_NUMERIC,
  chatMessageIsNewerThanLastViewed,
  chatMessageTimeMs,
  convKey,
  isGroupChatId,
  mergeReadCursors,
  normalizePeerChatUserId,
  normalizeStoredMessageFromId,
};
