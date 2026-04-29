"use strict";

const { normalizeStoredMessageFromId } = require("./chat-core");
const { pipelineCommandResults } = require("./chat-groups");

async function buildGroupMembersPublicList(options) {
  const opts = options || {};
  const myId = opts.myId;
  const memberIds = opts.memberIds || [];
  const minScore = opts.minScore;
  const creatorIdOpt = opts.creatorId;
  const ordered = [];
  const seen = new Set();
  for (let i = 0; i < memberIds.length; i++) {
    const id = String(memberIds[i] || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ordered.push(id);
  }
  if (!ordered.length) return [];
  const myNorm = normalizeStoredMessageFromId(myId);
  const creatorNormAll =
    creatorIdOpt != null && String(creatorIdOpt).trim() !== ""
      ? normalizeStoredMessageFromId(String(creatorIdOpt).trim())
      : "";
  const fallbackName =
    typeof opts.normalizeLegacyAccountDisplayLabel === "function"
      ? opts.normalizeLegacyAccountDisplayLabel
      : (value) => String(value || "").trim();
  try {
    const [dtIds, avatars, p21Ids, verifiedIds, displayMap, usernameRes, aliasRes, scorePipe, lastSeenPipe] = await Promise.all([
      opts.getDtIds(ordered),
      opts.getAvatars(ordered),
      opts.getP21Ids(ordered),
      opts.getPokerPlusVerifiedIds(ordered),
      opts.getChatDisplayNameMapForIds(ordered),
      opts.redisPipeline([["HMGET", opts.usernamesKey, ...ordered]]),
      opts.redisPipeline([["HMGET", opts.friendAliasKeyPrefix + myId, ...ordered]]),
      opts.redisPipeline(ordered.flatMap((id) => [["ZSCORE", opts.chatOnlineKey, id]])),
      opts.redisPipeline([["HMGET", opts.chatLastSeenHash, ...ordered]]),
    ]);
    const urFirst = pipelineCommandResults(usernameRes)[0];
    const urRow = urFirst && Array.isArray(urFirst.result) ? urFirst.result : [];
    const usernamesForMembers = {};
    ordered.forEach((pid, idx) => {
      const raw = urRow[idx];
      if (raw != null && raw !== false) usernamesForMembers[pid] = String(raw).trim();
    });
    const arFirst = pipelineCommandResults(aliasRes)[0];
    const arRow = arFirst && Array.isArray(arFirst.result) ? arFirst.result : [];
    const aliasByPeer = {};
    ordered.forEach((pid, idx) => {
      const raw = arRow[idx];
      if (raw == null || raw === false) return;
      const cn = typeof opts.sanitizeFriendContactNameForChat === "function" ? opts.sanitizeFriendContactNameForChat(raw) : String(raw || "").trim();
      if (cn) aliasByPeer[pid] = cn;
    });
    const scoreRows = pipelineCommandResults(scorePipe);
    const lastSeenRow =
      lastSeenPipe && lastSeenPipe[0] && Array.isArray(lastSeenPipe[0].result) ? lastSeenPipe[0].result : [];
    return ordered.map((id, i) => {
      const aliasLabel = aliasByPeer[id];
      const baseDisplay =
        fallbackName((displayMap[id] && String(displayMap[id]).trim()) || "") ||
        (usernamesForMembers[id] ? "@" + usernamesForMembers[id] : fallbackName(id));
      const nameOut = (aliasLabel && String(aliasLabel).trim()) || baseDisplay;
      const scRow = scoreRows[i];
      const sc = scRow && scRow.result != null ? scRow.result : null;
      const online = sc != null && parseFloat(sc) >= minScore;
      const lastSeenIso =
        typeof opts.chatLastSeenIsoFromRedisRaw === "function"
          ? opts.chatLastSeenIsoFromRedisRaw(lastSeenRow[i])
          : null;
      const idNorm = normalizeStoredMessageFromId(id);
      const tgUserRaw = usernamesForMembers[id] != null ? String(usernamesForMembers[id]).trim() : "";
      const tgDispRaw =
        displayMap[id] != null && String(displayMap[id]).trim() !== ""
          ? String(displayMap[id]).trim()
          : "";
      const rowOut = {
        id,
        name: nameOut,
        contactName: aliasLabel || undefined,
        telegramUsername: tgUserRaw || null,
        telegramDisplayName: tgDispRaw || null,
        p21Id: p21Ids[id] != null ? p21Ids[id] : null,
        pokerPlusVerified: !!verifiedIds[id],
        dtId: dtIds[id] || null,
        avatar: avatars[id] || null,
        online,
        isYou: idNorm === myNorm,
        admin: typeof opts.isAdmin === "function" ? opts.isAdmin(id) : false,
        isGroupCreator: !!(creatorNormAll && idNorm === creatorNormAll),
      };
      if (!online && lastSeenIso) rowOut.lastSeenAt = lastSeenIso;
      return rowOut;
    });
  } catch (e) {
    return ordered.map((id) => {
      const idNorm = normalizeStoredMessageFromId(id);
      return {
        id,
        name: fallbackName(id),
        telegramUsername: null,
        telegramDisplayName: null,
        p21Id: null,
        dtId: null,
        avatar: null,
        online: false,
        isYou: idNorm === myNorm,
        admin: typeof opts.isAdmin === "function" ? opts.isAdmin(id) : false,
        isGroupCreator: !!(creatorNormAll && idNorm === creatorNormAll),
      };
    });
  }
}

module.exports = {
  buildGroupMembersPublicList,
};
