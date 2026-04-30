"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("./resolve-telegram-auth");

const DEFAULT_ADMIN_IDS = ["388008256", "2144406710", "1897001087"];

const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .concat(DEFAULT_ADMIN_IDS)
  .filter((id, index, arr) => arr.indexOf(id) === index);

function normalizeTelegramId(userId) {
  return String(userId || "").replace(/^tg_/, "").trim();
}

function isAdmin(userId) {
  const id = normalizeTelegramId(userId);
  return Boolean(id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id));
}

function setCors(res, methods, headers) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", methods || "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", headers || "Content-Type");
}

function parseBody(req) {
  if (!req || req.body == null || req.body === "") return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  if (typeof req.body === "object") return req.body;
  return {};
}

function authRequired(req, body, botToken, opts) {
  const options = opts || {};
  const identity = resolveTelegramIdentity(req, body || {}, botToken || "");
  if (!identity) {
    return {
      ok: false,
      status: 401,
      error: options.authError || "Auth required",
    };
  }
  const memberId = memberIdFromIdentity(identity);
  if (!memberId) {
    return {
      ok: false,
      status: 401,
      error: options.memberError || "Member not resolved",
    };
  }
  const admin = isAdmin(memberId);
  if (options.adminOnly && !admin) {
    return {
      ok: false,
      status: 403,
      error: options.adminError || "Admin only",
      identity,
      memberId,
      isAdmin: false,
    };
  }
  return { ok: true, identity, memberId, isAdmin: admin };
}

module.exports = {
  ADMIN_IDS,
  authRequired,
  isAdmin,
  normalizeTelegramId,
  parseBody,
  setCors,
};
