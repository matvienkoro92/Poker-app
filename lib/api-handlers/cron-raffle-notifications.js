"use strict";
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false });
  const secret = process.env.CRON_SECRET;
  const auth = req.headers && (req.headers["x-cron-secret"] || String(req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!secret || auth !== secret) return res.status(403).json({ ok: false });
  try {
    const result = await require("./raffles").retryNotifications();
    return res.status(result.failed ? 503 : 200).json({ ok: result.failed === 0, ...result });
  } catch (_) { return res.status(503).json({ ok: false, error: "Notification retry unavailable" }); }
};
