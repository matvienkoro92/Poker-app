/**
 * Подписанная сессия PWA после верификации через Telegram Login Widget.
 * Тот же BOT_TOKEN, что и для Mini App.
 *
 * Долгий TTL: пользователь остаётся в системе, пока сам не нажмёт «Выйти из профиля»
 * (токен удаляется с устройства). Истечение на сервере — запас на годы, не «раз в месяц».
 */
const crypto = require("crypto");

const PWA_SESS_PREFIX = "pwa_sess_v1:";
/** ~10 лет; явный выход — только через клиент (удаление из localStorage). */
const PWA_SESSION_TTL_SECONDS = 60 * 60 * 24 * 365 * 10;

function signPwaSession(user, botToken, ttlSec) {
  if (!user || user.id == null || !botToken) return null;
  const ttl = ttlSec != null ? ttlSec : PWA_SESSION_TTL_SECONDS;
  const exp = Math.floor(Date.now() / 1000) + ttl;
  const payload = JSON.stringify({
    uid: user.id,
    exp,
    un: user.username ? String(user.username).replace(/^@/, "").trim() : "",
  });
  const sig = crypto.createHmac("sha256", botToken).update(PWA_SESS_PREFIX + payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyPwaSessionToken(token, botToken) {
  if (!token || !botToken) return null;
  const s = String(token);
  const dot = s.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = s.slice(0, dot);
  const sig = s.slice(dot + 1);
  const expected = crypto.createHmac("sha256", botToken).update(PWA_SESS_PREFIX + payload).digest("hex");
  if (sig !== expected || sig.length < 32) return null;
  let data;
  try {
    data = JSON.parse(payload);
  } catch (e) {
    return null;
  }
  if (!data || data.uid == null || data.exp == null) return null;
  if (Math.floor(Date.now() / 1000) > Number(data.exp)) return null;
  return { id: Number(data.uid), username: data.un || "" };
}

module.exports = { signPwaSession, verifyPwaSessionToken, PWA_SESSION_TTL_SECONDS };
