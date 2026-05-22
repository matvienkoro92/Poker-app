"use strict";

const { ensureDtIdForUserId } = require("../account-id");
const { authRequired, setCors } = require("../api-auth");
const { isConfigured: redisConfigured } = require("../redis");
const { getBonusBalance, getBonusOperations } = require("../bonus-ledger");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function apiError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_")) return "";
  if (/^ID\d{6}$/.test(memberId)) return memberId;
  return await ensureDtIdForUserId(memberId);
}

function publicOperation(entry) {
  return {
    id: entry.id,
    amount: entry.amount,
    direction: entry.direction,
    operationType: entry.operation_type,
    balanceBefore: entry.balance_before,
    balanceAfter: entry.balance_after,
    source: entry.source,
    sourceId: entry.source_id,
    adminId: entry.admin_id || null,
    comment: entry.comment || "",
    createdAt: entry.created_at,
  };
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return apiError(res, 405, "GET only");
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  const pathname = String(req.url || "").split("?")[0];
  if (!/\/api\/user\/bonus-balance\/?$/i.test(pathname)) return apiError(res, 404, "Not found");

  const auth = authRequired(req, {}, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");

  const bonusBalance = await getBonusBalance(accountId);
  const recentOperations = (await getBonusOperations(accountId, 10)).map(publicOperation);
  return res.status(200).json({ bonusBalance, recentOperations });
};
