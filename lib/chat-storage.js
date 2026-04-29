"use strict";

const GENERAL_KEY = "poker_app:chat_messages";
const GENERAL_PINNED_KEY = "poker_app:general_chat_pinned";
const CHAT_GROUP_META_PREFIX = "poker_app:chat_group_meta:";
const CHAT_GROUP_MSG_PREFIX = "poker_app:chat_group_msgs:";
const USER_CHAT_GROUPS_SET_PREFIX = "poker_app:user_chat_groups:";
const CHAT_THREAD_META_PREFIX = "poker_app:chat_thread_meta:";
const CHAT_THREAD_MSG_INDEX_PREFIX = "poker_app:chat_thread_msg_index:";

function groupMetaKey(id) {
  return CHAT_GROUP_META_PREFIX + String(id).trim();
}

function groupMsgsKey(id) {
  return CHAT_GROUP_MSG_PREFIX + String(id).trim();
}

function userChatGroupsKey(userId) {
  return USER_CHAT_GROUPS_SET_PREFIX + String(userId);
}

function threadMetaKeyByStorageKey(redisKey) {
  return CHAT_THREAD_META_PREFIX + String(redisKey || "").trim();
}

function threadMessageIndexKey(redisKey) {
  return CHAT_THREAD_MSG_INDEX_PREFIX + String(redisKey || "").trim();
}

function buildThreadPreviewText(msg) {
  if (!msg || typeof msg !== "object") return "";
  const name = msg.fromName != null ? String(msg.fromName).trim() : "";
  let snippet = "";
  if (msg.image) snippet = "[Фото]";
  else if (msg.voice) snippet = "[Голосовое]";
  else if (msg.document) snippet = "[Документ]";
  else if (msg.text) snippet = String(msg.text).trim().replace(/\s+/g, " ").slice(0, 50);
  if (snippet && snippet.length >= 50) snippet += "…";
  if (name && snippet) return `${name}: ${snippet}`.slice(0, 140);
  if (name) return name.slice(0, 140);
  return snippet.slice(0, 140);
}

module.exports = {
  CHAT_GROUP_META_PREFIX,
  CHAT_GROUP_MSG_PREFIX,
  CHAT_THREAD_META_PREFIX,
  CHAT_THREAD_MSG_INDEX_PREFIX,
  GENERAL_KEY,
  GENERAL_PINNED_KEY,
  USER_CHAT_GROUPS_SET_PREFIX,
  buildThreadPreviewText,
  groupMetaKey,
  groupMsgsKey,
  threadMessageIndexKey,
  threadMetaKeyByStorageKey,
  userChatGroupsKey,
};
