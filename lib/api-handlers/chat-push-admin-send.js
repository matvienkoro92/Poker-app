/**
 * POST /api/chat-push-admin-send — Web Push только админам (TELEGRAM_ADMIN_ID), у кого есть подписка как у чата.
 * Тело: initData | pwaSession | pwaVkSession + title, text (или body).
 */
"use strict";

const { authRequired, parseBody, setCors } = require("../api-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  let body;
  try {
    body = parseBody(req);
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const auth = authRequired(req, body, BOT_TOKEN, {
    adminOnly: true,
    authError: "Откройте в Telegram или войдите в PWA",
    adminError: "Только для администраторов",
  });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });

  const {
    broadcastAdminOnlyWebPushInner,
    readVapidEnv,
    CHAT_PUSH_ADMIN_TITLE_MAX,
    CHAT_PUSH_ADMIN_BODY_MAX,
  } = require("../chat-webpush-notify");
  const title = String(body.title || "").trim().slice(0, CHAT_PUSH_ADMIN_TITLE_MAX);
  const text = String(body.text || body.body || "").trim().slice(0, CHAT_PUSH_ADMIN_BODY_MAX);
  if (!title || !text) {
    return res.status(400).json({ ok: false, error: "Укажите заголовок и текст" });
  }
  if (!readVapidEnv().pushConfigured) {
    return res.status(503).json({ ok: false, error: "Пуши не настроены на сервере (VAPID)" });
  }

  try {
    const out = await broadcastAdminOnlyWebPushInner({ title, body: text });
    if (!out || !out.ok) {
      return res.status(400).json({ ok: false, error: (out && out.error) || "Не удалось отправить" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
