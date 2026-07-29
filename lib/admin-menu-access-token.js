"use strict";

const crypto = require("crypto");

const TOKEN_PREFIX = "admin_menu_access_v1:";
const TOKEN_TTL_SEC = 30 * 60;

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""), "utf8");
  const b = Buffer.from(String(right || ""), "utf8");
  if (!a.length || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function signAccessToken(scope, memberId, secret) {
  const payload = Buffer.from(JSON.stringify({
    scope: String(scope || ""),
    memberId: String(memberId || ""),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC,
    nonce: crypto.randomBytes(8).toString("hex"),
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", String(secret || "")).update(TOKEN_PREFIX + payload).digest("base64url");
  return payload + "." + signature;
}

function verifyAccessToken(token, scopes, memberId, secret) {
  const parts = String(token || "").split(".");
  if (parts.length !== 2 || !secret) return false;
  const expected = crypto.createHmac("sha256", String(secret)).update(TOKEN_PREFIX + parts[0]).digest("base64url");
  if (!safeEqual(parts[1], expected)) return false;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
  } catch (error) {
    return false;
  }
  const allowedScopes = Array.isArray(scopes) ? scopes.map(String) : [String(scopes || "")];
  return allowedScopes.includes(String(payload.scope || "")) &&
    String(payload.memberId || "") === String(memberId || "") &&
    Number(payload.exp || 0) > Math.floor(Date.now() / 1000);
}

module.exports = {
  TOKEN_TTL_SEC,
  safeEqual,
  signAccessToken,
  verifyAccessToken,
};
