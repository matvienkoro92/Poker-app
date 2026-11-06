"use strict";

// Apply the app ban before dispatch, including games with their own auth flow.
async function rejectBlockedAuthenticatedRequest(req, res) {
  if (req.method === "OPTIONS") return false;
  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  if (!body || typeof body !== "object") body = {};
  const query = {
    ...Object.fromEntries(new URL(req.url || "/", "https://local.invalid").searchParams),
    ...(req.query || {}),
  };
  const { resolveTelegramIdentity, memberIdFromIdentity } = require("./resolve-telegram-auth");
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  const request = { ...req, query };
  const identity = resolveTelegramIdentity(request, body, token);
  if (!identity) return false;
  return require("./app-user-blocks").rejectBlockedAppUser(request, res, {
    identity,
    memberId: memberIdFromIdentity(identity),
  });
}

module.exports = { rejectBlockedAuthenticatedRequest };
