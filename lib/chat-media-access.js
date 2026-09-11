"use strict";
const crypto = require("crypto");
const TTL_SECONDS = 3600;
function secret() {
  return String(process.env.CHAT_MEDIA_SIGNING_SECRET || process.env.BLOB_READ_WRITE_TOKEN || process.env.CHAT_BLOB_READ_WRITE_TOKEN || "").trim();
}
function isChatBlobUrl(src) {
  try {
    const url = new URL(src);
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      /^[a-z0-9-]+\.(?:public|private)\.blob\.vercel-storage\.com$/i.test(url.hostname) && url.pathname.startsWith("/chat/");
  } catch (_) { return false; }
}
function signature(src, memberId, expires) {
  return crypto.createHmac("sha256", secret()).update(JSON.stringify([src, memberId, expires])).digest("hex");
}
function signMedia(src, memberId, now = Date.now()) {
  if (!isChatBlobUrl(src) || !secret()) return src;
  const expires = Math.floor(now / 1000) + TTL_SECONDS;
  return "/api/chat-image?" + new URLSearchParams({ src, expires: String(expires), grant: signature(src, memberId, expires) });
}
function verifyMedia(src, memberId, expiresRaw, grant, now = Date.now()) {
  const expires = Number(expiresRaw);
  if (!secret() || !isChatBlobUrl(src) || !Number.isSafeInteger(expires) || expires < Math.floor(now / 1000) ||
      expires > Math.floor(now / 1000) + TTL_SECONDS || !/^[a-f0-9]{64}$/.test(String(grant || ""))) return false;
  return crypto.timingSafeEqual(Buffer.from(grant, "hex"), Buffer.from(signature(src, memberId, expires), "hex"));
}
// Only called on an authorized chat response. The grant is bound to its reader,
// not to the uploader; copying the URL to another account grants no access.
function protectChatResponse(value, memberId) {
  if (Array.isArray(value)) return value.map(v => protectChatResponse(v, memberId));
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, child] of Object.entries(value)) {
    out[key] = ["image", "voice", "document", "imageSrc"].includes(key) && typeof child === "string"
      ? signMedia(child, memberId) : protectChatResponse(child, memberId);
  }
  return out;
}
module.exports = { isChatBlobUrl, signMedia, verifyMedia, protectChatResponse };
