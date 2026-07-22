"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { rateLimit } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const TOKEN_PREFIX = "admin_menu_access_v1:";
const TOKEN_TTL_SEC = 30 * 60;

function passwordForScope(scope) {
  if (scope === "crm") return String(process.env.CRM_MENU_PASSWORD || "");
  if (scope === "calculations") return String(process.env.CALCULATIONS_MENU_PASSWORD || process.env.CRM_MENU_PASSWORD || "");
  if (scope === "admin") return String(process.env.ADMIN_MENU_PASSWORD || "");
  return "";
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""), "utf8");
  const b = Buffer.from(String(right || ""), "utf8");
  if (!a.length || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function signAccessToken(scope, memberId) {
  const payload = Buffer.from(JSON.stringify({
    scope,
    memberId: String(memberId || ""),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC,
    nonce: crypto.randomBytes(8).toString("hex"),
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", BOT_TOKEN).update(TOKEN_PREFIX + payload).digest("base64url");
  return payload + "." + signature;
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (rateLimit(req, res, { bucket: "admin_menu_access", limit: 8, windowMs: 60_000 })) return;

  let body;
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN, { adminOnly: true, adminError: "Admin only" });
  if (!auth.ok) return res.status(auth.status || 403).json({ ok: false, error: auth.error || "Admin only" });

  const scope = String(body.scope || "").trim().toLowerCase();
  const configuredPassword = passwordForScope(scope);
  if (!configuredPassword) return res.status(503).json({ ok: false, error: "Пароль раздела не настроен" });
  if (!safeEqual(body.password, configuredPassword)) {
    return res.status(403).json({ ok: false, error: "Неверный пароль" });
  }

  return res.status(200).json({
    ok: true,
    token: signAccessToken(scope, auth.memberId),
    expiresIn: TOKEN_TTL_SEC,
  });
};
