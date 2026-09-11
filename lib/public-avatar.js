"use strict";
const { createHash } = require("node:crypto");

// Keep public profile JSON small; the existing public avatar endpoint serves
// uploaded images only when a visible <img> actually needs them.
function publicAvatarUrl(avatar, accountId) {
  if (typeof avatar !== "string" || !avatar.startsWith("data:image/")) return avatar || "";
  if (!accountId) return "";
  const version = createHash("sha256").update(avatar).digest("hex").slice(0, 16);
  return "/api/avatar?userId=" + encodeURIComponent(accountId) + "&format=image&v=" + version;
}

function sendAvatarImage(res, avatar) {
  const match = String(avatar || "").match(/^data:(image\/(?:jpeg|png|webp|gif|avif));base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) return res.status(404).end();
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 320 * 1024) return res.status(404).end();
  res.setHeader("Content-Type", match[1]);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  return res.status(200).send(bytes);
}

function publicLevelRows(rows) {
  return rows.map(row => ({ ...row, avatarUrl: publicAvatarUrl(row.avatarUrl, row.accountId) }));
}

module.exports = { publicAvatarUrl, publicLevelRows, sendAvatarImage };
