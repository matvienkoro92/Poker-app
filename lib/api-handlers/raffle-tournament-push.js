"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { isConfigured } = require("../redis");
const { defaultService } = require("../raffle-tournament-push");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!isConfigured()) return res.status(503).json({ ok: false, error: "Сервис временно недоступен" });
  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}; }
  catch (e) { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  const identity = resolveTelegramIdentity(req, body, token);
  const memberId = identity && memberIdFromIdentity(identity);
  if (!memberId || memberId.startsWith("guest_")) return res.status(401).json({ ok: false, error: "Войдите в аккаунт, чтобы включить уведомления о розыгрышах." });
  if (await rejectBlockedAppUser(req, res, identity, memberId)) return;
  try {
    const accountId = await ensureDtIdForUserId(memberId);
    if (!accountId) throw new Error("Не удалось определить аккаунт. Войдите снова.");
    const service = defaultService();
    const action = body.action || "status";
    if (action === "status") return res.status(200).json({ ok: true, ...await service.status(accountId) });
    if (action !== "enable" && action !== "disable") return res.status(400).json({ ok: false, error: "Unknown action" });
    const result = await service.setSubscription(accountId, action === "enable");
    return res.status(result.ok ? 200 : 409).json(result);
  } catch (e) {
    return res.status(503).json({ ok: false, error: "Не удалось сохранить или проверить подписку. Попробуйте ещё раз." });
  }
};
