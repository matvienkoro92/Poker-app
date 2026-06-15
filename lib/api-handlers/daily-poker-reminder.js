"use strict";

const { authRequired, parseBody, setCors } = require("../api-auth");
const { setDailyPokerReminderSubscription } = require("../daily-poker-reminders");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  let body;
  try {
    body = parseBody(req);
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Auth required" });

  const result = await setDailyPokerReminderSubscription(auth, {
    unsubscribe: !!(body.unsubscribe || body.unsub),
    status: {
      canPlay: body.canPlay,
      attemptsLeft: body.attemptsLeft,
      baseAttemptUsedToday: body.baseAttemptUsedToday,
      nextFreeAttemptAt: body.nextFreeAttemptAt,
    },
  });
  if (!result.ok) return res.status(result.status || 500).json({ ok: false, error: result.error || "Не удалось обновить подписку." });
  return res.status(200).json(result);
};
