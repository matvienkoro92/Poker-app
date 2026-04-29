/**
 * GET  /api/chat-push-admin-broadcast — только админ: число и список подписчиков Web Push чата
 *      (включены оповещения и есть сохранённая подписка).
 * POST /api/chat-push-admin-broadcast — рассылка всем таким подписчикам (title + text).
 */
"use strict";

const { authRequired, parseBody, setCors } = require("../api-auth");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  const {
    listActiveChatPushSubscribers,
    broadcastAllChatPushSubscribersInner,
    readVapidEnv,
    CHAT_PUSH_ADMIN_TITLE_MAX,
    CHAT_PUSH_ADMIN_BODY_MAX,
    normalizeAdminPushOpenUrl,
  } = require("../chat-webpush-notify");

  if (req.method === "GET") {
    const auth = authRequired(req, {}, BOT_TOKEN, {
      adminOnly: true,
      authError: "Откройте в Telegram или войдите в PWA",
      adminError: "Только для администраторов",
    });
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    try {
      const { pushConfigured } = readVapidEnv();
      const data = await listActiveChatPushSubscribers();
      return res.status(200).json({
        ok: true,
        pushConfigured,
        titleMax: CHAT_PUSH_ADMIN_TITLE_MAX,
        bodyMax: CHAT_PUSH_ADMIN_BODY_MAX,
        count: data.count,
        subscribers: data.subscribers,
      });
    } catch (e) {
      console.error("[chat-push-admin-broadcast] GET", e);
      return res.status(500).json({ ok: false, error: "Ошибка сервера" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (rejectIfPayloadTooLarge(req, res, 8_192)) return;
  if (rateLimit(req, res, { bucket: "chat_push_admin_broadcast", limit: 6, windowMs: 60_000 })) return;

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

  const title = String(body.title || "").trim().slice(0, CHAT_PUSH_ADMIN_TITLE_MAX);
  const text = String(body.text || body.body || "").trim().slice(0, CHAT_PUSH_ADMIN_BODY_MAX);
  const openUrl = normalizeAdminPushOpenUrl(body.openUrl || body.open_url);
  if (!title || !text) {
    return res.status(400).json({ ok: false, error: "Укажите заголовок и текст" });
  }

  if (!readVapidEnv().pushConfigured) {
    return res.status(503).json({ ok: false, error: "Пуши не настроены на сервере (VAPID)" });
  }

  try {
    const out = await broadcastAllChatPushSubscribersInner({ title, body: text, openUrl });
    if (!out || !out.ok) {
      return res.status(400).json({ ok: false, error: (out && out.error) || "Не удалось отправить" });
    }
    return res.status(200).json({ ok: true, recipients: out.recipients });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
