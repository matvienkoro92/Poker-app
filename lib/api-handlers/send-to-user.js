/**
 * Отправить сообщение пользователю через бота.
 * POST /api/send-to-user
 * Body: { secret, user_id, text } или для админа: { initData, user_id, text }
 * Опционально: button_text + button_url, либо open_app_button: true (кнопка «Открыть приложение», URL из env).
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { isAdminIdentity } = require("../api-auth");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const CRON_SECRET = process.env.CRON_SECRET;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (rejectIfPayloadTooLarge(req, res, 16_384)) return;
  if (rateLimit(req, res, { bucket: "send_to_user", limit: 30, windowMs: 60_000 })) return;

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const secret = req.headers["x-cron-secret"] || req.query?.secret || body.secret;
  const cronOk = !!(CRON_SECRET && secret === CRON_SECRET);
  const identity = !cronOk ? resolveTelegramIdentity(req, body, BOT_TOKEN) : null;
  const adminId = identity ? memberIdFromIdentity(identity) : null;
  const adminOk = !cronOk && identity && adminId && isAdminIdentity(identity, adminId);

  if (!cronOk && !adminOk) {
    return res.status(403).json({ ok: false, error: "Invalid secret or not admin" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Bot not configured" });
  }

  const userId = body.user_id || body.userId;
  const text = (body.text || body.message || "").trim().slice(0, 4096);

  if (!userId || !text) {
    return res.status(400).json({ ok: false, error: "user_id and text required" });
  }

  const chatId = String(userId).replace(/^tg_/, "");
  if (!/^\d+$/.test(chatId)) {
    return res.status(400).json({ ok: false, error: "Invalid user_id" });
  }

  let btnText = String(body.button_text || body.buttonText || "").trim();
  let btnUrl = String(body.button_url || body.buttonUrl || "").trim();
  if (body.open_app_button === true || body.inline_open === true) {
    if (!btnText) btnText = "Открыть приложение";
    if (!btnUrl) btnUrl = resolveTelegramOpenButtonUrl("");
  }

  const result = await sendTelegramMessage(BOT_TOKEN, {
    chat_id: chatId,
    text,
    buttonText: btnText || undefined,
    buttonUrl: btnUrl || undefined,
  });
  if (result.ok) {
    return res.status(200).json({ ok: true, sent: true });
  }
  return res.status(500).json({ ok: false, error: result.hint || "Ошибка отправки" });
};
