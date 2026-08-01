/**
 * Загрузка вложений чата в Vercel Blob — в Redis хранится только HTTPS URL.
 * Локально / без BLOB_READ_WRITE_TOKEN: вернуть null, сервер оставляет inline data URL как раньше.
 *
 * Vercel: Storage → Blob → подключить store, в env проекта появится BLOB_READ_WRITE_TOKEN.
 */
"use strict";

const MAX_B64_CHARS = 450000;
const MAX_BINARY_BYTES = 360000;
const MAX_VOICE_B64_CHARS = 1200000;
const MAX_VOICE_BINARY_BYTES = 900000;
const MAX_DOCUMENT_B64_CHARS = 12 * 1024 * 1024;
const MAX_DOCUMENT_BINARY_BYTES = 9 * 1024 * 1024;

function safeMemberId(memberId) {
  return String(memberId || "u")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 40) || "u";
}

async function putChatBlob(kind, memberId, buffer, ext, mime) {
  const token = (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  if (!token) return null;
  let put;
  try {
    ({ put } = require("@vercel/blob"));
  } catch (e) {
    console.error("[chat-media-blob] require @vercel/blob failed", e && e.message ? e.message : e);
    return null;
  }
  const pathname = `chat/${kind}/${safeMemberId(memberId)}/${Date.now()}_${Math.random().toString(36).slice(2, 12)}.${ext}`;
  const out = await put(pathname, buffer, {
    access: "public",
    token,
    contentType: mime,
    addRandomSuffix: false,
  });
  return out && out.url ? String(out.url) : null;
}

/**
 * @param {string} dataUrl
 * @param {string} memberId
 * @returns {Promise<string|null>} public URL или null (fallback на inline)
 */
async function tryUploadChatImageDataUrl(dataUrl, memberId) {
  const token = (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  if (!token) return null;

  const str = String(dataUrl || "");
  const m = str.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,([0-9A-Za-z+/=\s]+)$/i);
  if (!m) return null;
  const subRaw = m[1].toLowerCase();
  const b64 = m[2].replace(/\s/g, "");
  if (b64.length > MAX_B64_CHARS) return null;

  const extMap = { jpeg: "jpg", jpg: "jpg", png: "png", gif: "gif", webp: "webp" };
  const ext = extMap[subRaw] || "jpg";
  const mime = subRaw === "jpg" || subRaw === "jpeg" ? "image/jpeg" : `image/${subRaw}`;

  let buffer;
  try {
    buffer = Buffer.from(b64, "base64");
  } catch (e) {
    return null;
  }
  if (!buffer || buffer.length < 16 || buffer.length > MAX_BINARY_BYTES) return null;

  return putChatBlob("img", memberId, buffer, ext, mime);
}

async function tryUploadChatVoiceDataUrl(dataUrl, memberId) {
  if (!(process.env.BLOB_READ_WRITE_TOKEN || "").trim()) return null;
  const m = String(dataUrl || "").match(/^data:audio\/([^;,]+)(?:;[^,]*)?;base64,([0-9A-Za-z+/=\s]+)$/i);
  if (!m) return null;
  const subtype = String(m[1] || "webm").toLowerCase();
  const b64 = m[2].replace(/\s/g, "");
  if (!b64 || b64.length > MAX_VOICE_B64_CHARS) return null;
  const buffer = Buffer.from(b64, "base64");
  if (!buffer.length || buffer.length > MAX_VOICE_BINARY_BYTES) return null;
  const ext = /mp4|m4a|aac/.test(subtype) ? "m4a" : /mpeg|mp3/.test(subtype) ? "mp3" : /ogg|opus/.test(subtype) ? "ogg" : "webm";
  const mime = ext === "m4a" ? "audio/mp4" : ext === "mp3" ? "audio/mpeg" : ext === "ogg" ? "audio/ogg" : "audio/webm";
  return putChatBlob("voice", memberId, buffer, ext, mime);
}

async function tryUploadChatDocumentDataUrl(dataUrl, memberId) {
  if (!(process.env.BLOB_READ_WRITE_TOKEN || "").trim()) return null;
  const m = String(dataUrl || "").match(/^data:application\/pdf;base64,([0-9A-Za-z+/=\s]+)$/i);
  if (!m) return null;
  const b64 = m[1].replace(/\s/g, "");
  if (!b64 || b64.length > MAX_DOCUMENT_B64_CHARS) return null;
  const buffer = Buffer.from(b64, "base64");
  if (!buffer.length || buffer.length > MAX_DOCUMENT_BINARY_BYTES) return null;
  return putChatBlob("document", memberId, buffer, "pdf", "application/pdf");
}

module.exports = {
  tryUploadChatDocumentDataUrl,
  tryUploadChatImageDataUrl,
  tryUploadChatVoiceDataUrl,
};
