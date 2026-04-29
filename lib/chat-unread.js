"use strict";

const CHAT_UNREAD_HASH_PREFIX = "poker_app:chat_unread:";
const CHAT_GENERAL_UNREAD_HASH = "poker_app:chat_general_unread";

function unreadHashKey(viewerId) {
  return CHAT_UNREAD_HASH_PREFIX + String(viewerId || "").trim();
}

async function resetThreadUnread(redisPipeline, viewerId, peerId) {
  const v = String(viewerId || "").trim();
  const p = String(peerId || "").trim();
  if (!v || !p) return;
  await redisPipeline([["HDEL", unreadHashKey(v), p]]);
}

async function resetGeneralUnread(redisPipeline, userId) {
  const id = String(userId || "").trim();
  if (!id) return;
  await redisPipeline([["HDEL", CHAT_GENERAL_UNREAD_HASH, id]]);
}

async function incrementThreadUnreadForRecipients(redisPipeline, recipientIds, peerId) {
  const p = String(peerId || "").trim();
  const ids = [...new Set((Array.isArray(recipientIds) ? recipientIds : []).map((x) => String(x || "").trim()).filter(Boolean))];
  if (!p || !ids.length) return;
  const cmds = [];
  for (let i = 0; i < ids.length; i++) cmds.push(["HINCRBY", unreadHashKey(ids[i]), p, 1]);
  await redisPipeline(cmds);
}

async function incrementGeneralUnreadForRecipients(redisPipeline, recipientIds) {
  const ids = [...new Set((Array.isArray(recipientIds) ? recipientIds : []).map((x) => String(x || "").trim()).filter(Boolean))];
  if (!ids.length) return;
  const cmds = [];
  for (let i = 0; i < ids.length; i++) cmds.push(["HINCRBY", CHAT_GENERAL_UNREAD_HASH, ids[i], 1]);
  await redisPipeline(cmds);
}

module.exports = {
  CHAT_GENERAL_UNREAD_HASH,
  CHAT_UNREAD_HASH_PREFIX,
  incrementGeneralUnreadForRecipients,
  incrementThreadUnreadForRecipients,
  resetGeneralUnread,
  resetThreadUnread,
  unreadHashKey,
};
