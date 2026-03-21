/**
 * Подписанная сессия PWA после верификации через Telegram Login Widget.
 * Тот же BOT_TOKEN, что и для Mini App.
 */
const crypto = require("crypto");

const PWA_SESS_PREFIX = "pwa_sess_v1:";

function signPwaSession(user, botToken, ttlSec) {
  if (!user || user.id == null || !botToken) return null;
  const exp = Math.floor(Date.now() / 1000) + (ttlSec || 60 * 60 * 24 * 30);
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

module.exports = { signPwaSession, verifyPwaSessionToken };
