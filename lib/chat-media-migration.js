"use strict";
const crypto = require("crypto");
const { pipeline } = require("./redis");
function migrationKey(src) {
  return "poker_app:chat_media_migration:" + crypto.createHash("sha256").update(src).digest("hex");
}
async function migratedMedia(src) {
  const rows = await pipeline([["GET", migrationKey(src)]], {context:"chat.media-migration",throwOnError:true});
  return rows[0].result || src;
}
module.exports = {migrationKey,migratedMedia};
