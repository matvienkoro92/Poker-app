"use strict";

const { normalizeStoredMessageFromId } = require("./chat-core");

const CHAT_GROUP_TITLE_MAX = 100;
const CHAT_GROUP_DESCRIPTION_MAX = 2000;
const CHAT_GROUP_MEMBERS_MAX = 50;

function sanitizeGroupTitle(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_GROUP_TITLE_MAX);
}

function sanitizeGroupDescription(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_GROUP_DESCRIPTION_MAX);
}

function sanitizeGroupAvatarInput(raw) {
  if (!raw || typeof raw !== "string") return null;
  const s = String(raw).trim();
  const m = s.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,(.+)$/);
  if (!m || !m[2] || m[2].length > 220000) return null;
  if (s.length > 480000) return null;
  return s;
}

function groupMetaHasMember(meta, myId) {
  if (!meta || !Array.isArray(meta.members) || !myId) return false;
  const mine = normalizeStoredMessageFromId(String(myId));
  return meta.members.some((m) => normalizeStoredMessageFromId(String(m)) === mine);
}

function readGroupMetaOnlyFlag(req) {
  const q = (req && req.query) || {};
  if (q.metaonly === "1" || q.metaOnly === "1" || q.groupmetaonly === "1" || q.groupMetaOnly === "1") return true;
  for (const k of Object.keys(q)) {
    if (String(k).toLowerCase() === "metaonly" && String(q[k]) === "1") return true;
  }
  return false;
}

function readContactsMetaOnlyFlag(req) {
  const q = (req && req.query) || {};
  return q.contactsmetaonly === "1" || q.contactsMetaOnly === "1";
}

function pipelineCommandResults(pipeRes) {
  if (pipeRes == null) return [];
  if (Array.isArray(pipeRes)) return pipeRes;
  if (typeof pipeRes === "object" && Array.isArray(pipeRes.result)) return pipeRes.result;
  return [];
}

module.exports = {
  CHAT_GROUP_DESCRIPTION_MAX,
  CHAT_GROUP_MEMBERS_MAX,
  CHAT_GROUP_TITLE_MAX,
  groupMetaHasMember,
  pipelineCommandResults,
  readContactsMetaOnlyFlag,
  readGroupMetaOnlyFlag,
  sanitizeGroupAvatarInput,
  sanitizeGroupDescription,
  sanitizeGroupTitle,
};
