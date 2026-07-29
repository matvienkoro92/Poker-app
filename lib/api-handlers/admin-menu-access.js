"use strict";

const { authRequired, parseBody, setCors } = require("../api-auth");
const { rateLimit } = require("../api-limits");
const { TOKEN_TTL_SEC, safeEqual, signAccessToken } = require("../admin-menu-access-token");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function passwordForScope(scope) {
  if (scope === "crm") return String(process.env.CRM_MENU_PASSWORD || "");
  if (scope === "calculations") return String(process.env.CALCULATIONS_MENU_PASSWORD || process.env.CRM_MENU_PASSWORD || "");
  if (scope === "admin") return String(process.env.ADMIN_MENU_PASSWORD || "");
  return "";
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
    token: signAccessToken(scope, auth.memberId, BOT_TOKEN),
    expiresIn: TOKEN_TTL_SEC,
  });
};
