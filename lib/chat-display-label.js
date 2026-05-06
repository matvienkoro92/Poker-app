"use strict";

function chatLastSeenIsoFromRedisRaw(raw) {
  if (raw == null || raw === false) return null;
  const n = parseFloat(String(raw));
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Date(Math.floor(n)).toISOString();
}

function normalizeLegacyAccountDisplayLabel(value) {
  const raw = value != null ? String(value).trim() : "";
  if (!raw) return "";
  if (/^(tg|vk)_ID\d{6}$/.test(raw)) return raw.slice(3);
  if (/^mail_ID\d{6}$/.test(raw)) return raw.slice(5);
  return raw;
}

/** Подпись отправителя: имя важнее Telegram-логина; @username показываем только если имени нет. */
function buildChatDisplayName(identity, redisUsernameRaw) {
  const idObj = identity && typeof identity === "object" ? identity : {};
  const first = (idObj.firstName || "").trim();
  const last = (idObj.lastName || "").trim();
  const nameParts = [first, last].filter(Boolean).join(" ").trim();
  const tgUn = (idObj.telegramUsername || "").replace(/^@+/, "").trim();
  const pwaUn = (idObj.pwaUsername || "").replace(/^@+/, "").trim();
  const rNick = (redisUsernameRaw || "").replace(/^@+/, "").trim();
  const nick = tgUn || pwaUn || rNick;
  const nickDisplay = nick ? "@" + nick : "";
  if (nameParts) return nameParts;
  if (nickDisplay) return nickDisplay;
  return "Игрок";
}

module.exports = {
  buildChatDisplayName,
  chatLastSeenIsoFromRedisRaw,
  normalizeLegacyAccountDisplayLabel,
};
