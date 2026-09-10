"use strict";
const { notifySharedResults } = require("../friend-news");
module.exports = async function (req, res) {
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false });
  const token = String(req.headers && req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!process.env.CRON_SECRET || token !== process.env.CRON_SECRET) return res.status(403).json({ ok: false });
  try { return res.status(200).json(await notifySharedResults()); }
  catch (error) { console.error("[cron-friend-news]", error.message); return res.status(503).json({ ok: false }); }
};
