"use strict";

function createChatReadReceiptHelpers(deps) {
  const {
    CHAT_GENERAL_SEEN_HASH,
    CHAT_GENERAL_UNREAD_HASH,
    CHAT_SEEN_CURSOR_KEY,
    chatMessageTimeMs,
    normalizeStoredMessageFromId,
    redisPipeline,
    unreadHashKey,
  } = deps;

  function seenCursorField(viewerId, peerId) {
    return `${String(viewerId)}|${String(peerId)}`;
  }

  async function getSeenCursor(viewerId, peerId) {
    const r = await redisPipeline([["HGET", CHAT_SEEN_CURSOR_KEY, seenCursorField(viewerId, peerId)]]);
    if (!r || !r[0] || r[0].result == null) return "";
    return String(r[0].result).trim();
  }

  async function bumpSeenCursor(viewerId, peerId, latestIso) {
    if (!latestIso || String(latestIso).trim() === "") return;
    const cur = await getSeenCursor(viewerId, peerId);
    const curMs = chatMessageTimeMs(cur);
    const newMs = chatMessageTimeMs(latestIso);
    if (Number.isNaN(newMs)) return;
    let out = String(latestIso).trim();
    if (!Number.isNaN(curMs) && curMs > newMs) out = cur;
    await redisPipeline([
      ["HSET", CHAT_SEEN_CURSOR_KEY, seenCursorField(viewerId, peerId), out],
      ["HDEL", unreadHashKey(viewerId), String(peerId)],
    ]);
  }

  async function getGeneralLastSeen(userId) {
    const r = await redisPipeline([["HGET", CHAT_GENERAL_SEEN_HASH, String(userId)]]);
    if (!r || !r[0] || r[0].result == null) return "";
    return String(r[0].result).trim();
  }

  async function bumpGeneralLastSeen(userId, latestIso) {
    if (!latestIso || String(latestIso).trim() === "") return;
    const cur = await getGeneralLastSeen(userId);
    const curMs = chatMessageTimeMs(cur);
    const newMs = chatMessageTimeMs(latestIso);
    if (Number.isNaN(newMs)) return;
    let out = String(latestIso).trim();
    if (!Number.isNaN(curMs) && curMs > newMs) out = cur;
    await redisPipeline([
      ["HSET", CHAT_GENERAL_SEEN_HASH, String(userId), out],
      ["HDEL", CHAT_GENERAL_UNREAD_HASH, String(userId)],
    ]);
  }

  function applyPeerReadReceiptsToMyMessages(messages, myId, peerCursorIso) {
    const peerMs = chatMessageTimeMs(peerCursorIso);
    if (Number.isNaN(peerMs)) return;
    const myNorm = normalizeStoredMessageFromId(myId);
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (!m) continue;
      const fromN = m.from != null ? normalizeStoredMessageFromId(m.from) : "";
      if (fromN !== myNorm) continue;
      const t = chatMessageTimeMs(m.time);
      if (Number.isNaN(t)) continue;
      if (t <= peerMs) m.peerHasRead = true;
    }
  }

  return {
    applyPeerReadReceiptsToMyMessages,
    bumpGeneralLastSeen,
    bumpSeenCursor,
    getGeneralLastSeen,
    getSeenCursor,
    seenCursorField,
  };
}

module.exports = {
  createChatReadReceiptHelpers,
};
