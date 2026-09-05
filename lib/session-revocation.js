"use strict";
const { pipeline } = require("./redis");
const VERSION_KEY = "poker_app:session_versions";
async function sessionClaims(memberId) {
  let accountId = /^(?:mail_|tg_|vk_)(ID\d{6})$/.exec(memberId || "")?.[1] || "";
  if (!accountId) {
    const rows = await pipeline([["HGET", "poker_app:visitor_dt_ids", memberId]], { throwOnError: true, context: "session.account" });
    accountId = String(rows[0].result || "");
  }
  const subject = accountId || memberId;
  const rows = await pipeline([["HGET", VERSION_KEY, subject]], { throwOnError: true, context: "session.version" });
  return { sessionAccount: subject, sessionVersion: String(rows[0].result || "0") };
}
async function issuePwaSession(user, token, ttl) {
  const claims = await sessionClaims(user.memberId || "tg_" + user.id);
  if (user.passwordProof) {
    const proof = user.passwordProof;
    const rows = await pipeline([["HGET", "poker_app:account_passwords", proof.accountId]], { throwOnError: true });
    if (claims.sessionAccount !== proof.accountId || rows[0].result !== proof.passwordRecord) throw new Error("credentials_changed_retry");
  }
  return require("./poker-pwa-session").signPwaSession({ ...user, ...claims }, token, ttl);
}
async function issuePwaVkSession(user, ttl) {
  const claims = await sessionClaims("vk_" + user.vkId);
  return require("./poker-pwa-vk-session").signPwaVkSession({ ...user, ...claims }, ttl);
}
async function rejectRevokedSessions(req, res) {
  if (req.method === "OPTIONS") return false;
  let body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } }
  const query = { ...Object.fromEntries(new URL(req.url || "/", "https://local.invalid").searchParams), ...(req.query || {}) };
  const secret = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  for (const bag of [body, query]) {
    for (const name of ["pwaSession", "pwa_session", "pwaVkSession", "pwa_vk_session"]) {
      if (!bag[name]) continue;
      const vk = /vk/i.test(name);
      const identity = vk ? require("./poker-pwa-vk-session").verifyPwaVkSessionToken(bag[name]) : require("./poker-pwa-session").verifyPwaSessionToken(bag[name], secret);
      if (!identity) continue; // Endpoint retains responsibility for malformed credentials.
      const current = await sessionClaims(vk ? "vk_" + identity.vkId : identity.memberId || "tg_" + identity.id);
      if ((identity.sessionAccount && identity.sessionAccount !== current.sessionAccount) || String(identity.sessionVersion || "0") !== current.sessionVersion) {
        res.status(401).json({ ok: false, error: "Сессия завершена. Войдите снова.", code: "session_revoked" });
        return true;
      }
    }
  }
  return false;
}
module.exports = { sessionClaims, issuePwaSession, issuePwaVkSession, rejectRevokedSessions };
