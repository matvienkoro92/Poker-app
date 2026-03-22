/**
 * Публичные сведения о боте для Login Widget (popup): числовой id без утечки токена.
 * GET /api/telegram-bot-info → { ok, botId, username }
 */
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const botToken =
    process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  if (!botToken) return res.status(503).json({ ok: false, error: "Server config" });

  try {
    const r = await fetch(`https://api.telegram.org/bot${botToken}/getMe`, { method: "GET" });
    const j = await r.json().catch(() => ({}));
    if (!j || !j.ok || !j.result || j.result.id == null) {
      return res.status(502).json({ ok: false, error: "Telegram API" });
    }
    return res.status(200).json({
      ok: true,
      botId: j.result.id,
      username: j.result.username != null ? String(j.result.username) : "",
    });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "Network" });
  }
};
