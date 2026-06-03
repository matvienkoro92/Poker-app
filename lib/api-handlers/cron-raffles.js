/**
 * Cron/QStash entrypoint for raffle lifecycle:
 * completes expired active raffles, settles ready windows, and starts due daily raffles.
 */
const CRON_SECRET = process.env.CRON_SECRET;
const rafflesHandler = require("./raffles");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "GET or POST only" });
  }

  const auth =
    (req.headers && req.headers["x-cron-secret"]) ||
    (req.query && req.query.secret) ||
    ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || auth !== CRON_SECRET) {
    return res.status(403).json({ ok: false, error: "Invalid or missing CRON_SECRET" });
  }

  const proxyReq = Object.assign({}, req, {
    method: "GET",
    query: Object.assign({}, req.query || {}, {
      action: "tick",
      secret: CRON_SECRET,
    }),
    body: undefined,
    headers: Object.assign({}, req.headers || {}, {
      "x-cron-secret": CRON_SECRET,
    }),
  });

  return rafflesHandler(proxyReq, res);
};
