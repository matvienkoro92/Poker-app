"use strict";

const { normalizeStoredMessageFromId } = require("./chat-core");

function collectMessageFromIdsForAlias(messages) {
  const ids = [];
  if (!Array.isArray(messages)) return ids;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (m && m.from) ids.push(String(m.from));
    if (m && m.replyTo && m.replyTo.from) ids.push(String(m.replyTo.from));
  }
  return ids;
}

function applyPeerChatDisplayNamesToMessages(messages, displayMap) {
  if (!messages || !displayMap || typeof displayMap !== "object") return;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m) continue;
    const fromNorm = m.from ? normalizeStoredMessageFromId(m.from) : "";
    if (fromNorm && displayMap[fromNorm]) m.fromName = displayMap[fromNorm];
    if (m.replyTo && m.replyTo.from) {
      const rfn = normalizeStoredMessageFromId(m.replyTo.from);
      if (rfn && displayMap[rfn]) m.replyTo.fromName = displayMap[rfn];
    }
  }
}

function applyViewerFriendAliasesToMessages(messages, aliasMap) {
  if (!messages || !aliasMap || typeof aliasMap !== "object") return;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m) continue;
    const fromNorm = m.from ? normalizeStoredMessageFromId(m.from) : "";
    if (fromNorm && aliasMap[fromNorm]) {
      m.fromName = aliasMap[fromNorm];
    }
    if (m.replyTo && m.replyTo.from) {
      const rfn = normalizeStoredMessageFromId(m.replyTo.from);
      if (rfn && aliasMap[rfn]) {
        m.replyTo.fromName = aliasMap[rfn];
      }
    }
  }
}

module.exports = {
  applyPeerChatDisplayNamesToMessages,
  applyViewerFriendAliasesToMessages,
  collectMessageFromIdsForAlias,
};
