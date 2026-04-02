/**
 * Внутренняя рассылка Web Push по общему чату (отдельный вызов после POST /api/chat).
 * Заголовок X-Chat-Push-Secret = CHAT_PUSH_DISPATCH_SECRET или CRON_SECRET.
 */
"use strict";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Chat-Push-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const secret = process.env.CHAT_PUSH_DISPATCH_SECRET || process.env.CRON_SECRET;
  const auth = (req.headers["x-chat-push-secret"] || "").trim();
  if (!secret || auth !== secret) {
    return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {}

  try {
    const { broadcastGeneralChatPushInner } = require("../chat-webpush-notify");
    await broadcastGeneralChatPushInner(body);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Push failed" });
  }
  return res.status(200).json({ ok: true });
};
