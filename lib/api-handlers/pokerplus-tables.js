const { getPlayingTables, hasPokerPlusConfig } = require("../pokerplus");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!hasPokerPlusConfig()) return res.status(500).json({ ok: false, error: "PokerPlus server config missing" });

  try {
    const tables = await getPlayingTables();
    return res.status(200).json({ ok: true, tables });
  } catch (e) {
    return res.status(e && e.statusCode ? e.statusCode : 502).json({ ok: false, error: e && e.message ? String(e.message) : "PokerPlus tables failed" });
  }
};
