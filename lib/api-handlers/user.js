"use strict";

const { ensureDtIdForUserId } = require("../account-id");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { isConfigured: redisConfigured } = require("../redis");
const { getBonusBalance, getBonusOperations } = require("../bonus-ledger");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function apiError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_")) return "";
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

function routeTail(req) {
  const pathname = String(req.url || "").split("?")[0];
  const parts = pathname.split("/").filter(Boolean);
  const userIndex = parts.indexOf("user");
  let tail = userIndex >= 0 ? parts.slice(userIndex + 1) : [];
  if (!tail.length && req.query) {
    const raw = req.query.path || req.query.route || req.query.p || "";
    const joined = Array.isArray(raw) ? raw.join("/") : String(raw || "");
    let value = joined;
    try {
      value = decodeURIComponent(joined);
    } catch (e) {}
    tail = value.split("/").map((part) => part.trim()).filter(Boolean);
  }
  if (!tail.length && req.url) {
    try {
      const qs = String(req.url).split("?")[1] || "";
      const params = new URLSearchParams(qs);
      const joined = params.get("path") || params.get("route") || params.get("p") || "";
      let value = joined;
      try {
        value = decodeURIComponent(joined);
      } catch (e) {}
      tail = value.split("/").map((part) => part.trim()).filter(Boolean);
    } catch (e) {}
  }
  return tail;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  const tail = routeTail(req);
  const welcome = tail[0] === "welcome-bonus";
  const levelRewards = tail[0] === "level-rewards";
  if (!welcome && !levelRewards && tail[0] !== "bonus-balance") return apiError(res, 404, "Not found");
  if (req.method !== "GET" && !(welcome && req.method === "POST")) return apiError(res, 405, "Method not allowed");

  let body = {};
  try { if (req.method === "POST") body = parseBody(req); }
  catch { return apiError(res, 400, "Некорректный запрос"); }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok && welcome && req.method === "GET") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({guest:require("../welcome-bonus").active()});
  }
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");
  if (await rejectBlockedAppUser(req, res, auth)) return;
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");

  if (welcome) {
    res.setHeader("Cache-Control", "no-store");
    try {
      return res.status(200).json(await require("../welcome-bonus").run(accountId, auth, BOT_TOKEN, req.method === "POST", body.deviceId));
    } catch {
      return apiError(res, 503, "Не удалось проверить бонус. Попробуйте ещё раз.");
    }
  }
  if (levelRewards) return res.status(200).json({ok:true, items:require("../level-game-rewards").gameLevelRewards()});
  const bonusBalance = await getBonusBalance(accountId);
  const recentOperations = (await getBonusOperations(accountId, 10)).map(publicOperation);
  return res.status(200).json({ bonusBalance, recentOperations });
};
