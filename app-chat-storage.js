var POKER_CHAT_GENERAL_DISK_KEY = "poker_chat_general_snapshot_v1";
var POKER_CHAT_PERSONAL_DISK_KEY = "poker_chat_personal_snapshot_v1";
var POKER_CHAT_DISK_GENERAL_MAX_MSG = 130;
var POKER_CHAT_DISK_GENERAL_MAX_MEMBERS = 120;
var POKER_CHAT_DISK_PERSONAL_MAX_MSG = 260;
var POKER_CHAT_DISK_PERSONAL_MAX_PEERS = 40;
var POKER_CHAT_OPEN_SNAPSHOT_MAX_MSG = 80;
var pokerChatPersonalSnapshotsHydrated = false;
function pokerTrimChatDiskMessages(arr, max) {
  if (!Array.isArray(arr) || max <= 0) return [];
  if (arr.length <= max) return arr.slice();
  return arr.slice(-max);
}
function pokerWriteGeneralSnapshotToDisk(cache) {
  try {
    if (typeof localStorage === "undefined") return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var fp = pokerChatContactsAuthFingerprint();
    if (!fp || !cache || !Array.isArray(cache.messages)) return;
    var msg = pokerTrimChatDiskMessages(cache.messages, POKER_CHAT_DISK_GENERAL_MAX_MSG);
    var gm = Array.isArray(cache.generalMembers) ? cache.generalMembers.slice(0, POKER_CHAT_DISK_GENERAL_MAX_MEMBERS) : [];
    localStorage.setItem(
      POKER_CHAT_GENERAL_DISK_KEY,
      JSON.stringify({
        fp: fp,
        t: Date.now(),
        messages: msg,
        participantsCount: cache.participantsCount,
        onlineCount: cache.onlineCount,
        generalPinned: cache.generalPinned != null ? cache.generalPinned : null,
        generalMembers: gm.length ? gm : undefined,
      })
    );
  } catch (eWrG) {
    try {
      localStorage.removeItem(POKER_CHAT_GENERAL_DISK_KEY);
    } catch (eRm) {}
  }
}
function pokerTryReadGeneralSnapshotFromDisk() {
  try {
    if (typeof localStorage === "undefined") return null;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return null;
    var fp = pokerChatContactsAuthFingerprint();
    if (!fp) return null;
    var raw = localStorage.getItem(POKER_CHAT_GENERAL_DISK_KEY);
    if (!raw) return null;
    if (raw.length > 1000000) {
      localStorage.removeItem(POKER_CHAT_GENERAL_DISK_KEY);
      return null;
    }
    var pack = JSON.parse(raw);
    if (!pack || typeof pack.fp !== "string" || pack.fp !== fp || !Array.isArray(pack.messages)) return null;
    return {
      messages: pack.messages,
      participantsCount: pack.participantsCount,
      onlineCount: pack.onlineCount,
      generalPinned: pack.generalPinned != null ? pack.generalPinned : null,
      generalMembers: Array.isArray(pack.generalMembers) ? pack.generalMembers : null,
    };
  } catch (eRd) {
    return null;
  }
}
function pokerWritePersonalPeerSnapshotToDisk(peerId, messages) {
  try {
    if (typeof localStorage === "undefined") return;
    var fp = pokerChatContactsAuthFingerprint();
    if (!fp || !peerId || !Array.isArray(messages)) return;
    var key = String(peerId);
    var trimmed = pokerTrimChatDiskMessages(messages, POKER_CHAT_DISK_PERSONAL_MAX_MSG);
    var raw = localStorage.getItem(POKER_CHAT_PERSONAL_DISK_KEY);
    var pack = null;
    try {
      pack = raw ? JSON.parse(raw) : null;
    } catch (eJ) {
      pack = null;
    }
    if (!pack || typeof pack !== "object" || pack.fp !== fp) pack = { fp: fp, peers: {} };
    if (!pack.peers || typeof pack.peers !== "object") pack.peers = {};
    pack.peers[key] = { t: Date.now(), messages: trimmed };
    var pkeys = Object.keys(pack.peers);
    if (pkeys.length > POKER_CHAT_DISK_PERSONAL_MAX_PEERS) {
      pkeys.sort(function (a, b) {
        var ta = (pack.peers[a] && pack.peers[a].t) || 0;
        var tb = (pack.peers[b] && pack.peers[b].t) || 0;
        return tb - ta;
      });
      for (var zi = POKER_CHAT_DISK_PERSONAL_MAX_PEERS; zi < pkeys.length; zi++) {
        delete pack.peers[pkeys[zi]];
      }
    }
    localStorage.setItem(POKER_CHAT_PERSONAL_DISK_KEY, JSON.stringify(pack));
  } catch (eWrP) {
    try {
      localStorage.removeItem(POKER_CHAT_PERSONAL_DISK_KEY);
    } catch (eRmP) {}
  }
}
function pokerHydrateChatSnapshotsFromDisk(opts) {
  try {
    opts = opts || {};
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    if (!pokerChatContactsAuthFingerprint()) return;
    var g = pokerTryReadGeneralSnapshotFromDisk();
    if (
      g &&
      Array.isArray(g.messages) &&
      g.messages.length &&
      (!window._chatGeneralCache || !Array.isArray(window._chatGeneralCache.messages) || !window._chatGeneralCache.messages.length)
    ) {
      window._chatGeneralCache = {
        messages: g.messages,
        participantsCount: g.participantsCount,
        onlineCount: g.onlineCount,
        generalPinned: g.generalPinned != null ? g.generalPinned : null,
        generalMembers: Array.isArray(g.generalMembers) ? g.generalMembers : [],
        __fromDisk: true,
      };
    }
    if (opts.generalOnly) return;
    if (pokerChatPersonalSnapshotsHydrated) return;
    pokerChatPersonalSnapshotsHydrated = true;
    var rawP = localStorage.getItem(POKER_CHAT_PERSONAL_DISK_KEY);
    if (!rawP) return;
    if (rawP.length > 1600000) {
      localStorage.removeItem(POKER_CHAT_PERSONAL_DISK_KEY);
      return;
    }
    var packP = JSON.parse(rawP);
    var fpp = pokerChatContactsAuthFingerprint();
    if (!packP || packP.fp !== fpp || !packP.peers || typeof packP.peers !== "object") return;
    Object.keys(packP.peers).forEach(function (k) {
      var ent = packP.peers[k];
      if (!ent || !Array.isArray(ent.messages) || !ent.messages.length) return;
      if (personalMessagesCache[k] && personalMessagesCache[k].length) return;
      /* bust снимает только RAM после нового непрочитанного — диск всё ещё даёт быстрый первый кадр, loadMessages перезапишет. */
      personalMessagesCache[k] = pokerTrimChatDiskMessages(ent.messages, POKER_CHAT_DISK_PERSONAL_MAX_MSG);
      personalMessagesCacheMeta[k] = { ts: ent.t || 0, source: "disk" };
    });
  } catch (eHyd) {}
}
function getPersonalMessagesSnapshotForOpen(peerId) {
  if (!peerId) return null;
  var cache = personalMessagesCache[peerId];
  if (!Array.isArray(cache) || !cache.length) return null;
  if (cache.length > POKER_CHAT_DISK_PERSONAL_MAX_MSG) {
    cache = pokerTrimChatDiskMessages(cache, POKER_CHAT_DISK_PERSONAL_MAX_MSG);
    personalMessagesCache[peerId] = cache;
  }
  var meta = personalMessagesCacheMeta[peerId] && typeof personalMessagesCacheMeta[peerId] === "object"
    ? personalMessagesCacheMeta[peerId]
    : null;
  return {
    messages: cache,
    meta: meta,
  };
}
function pokerMessagesForFastOpenSnapshot(messages) {
  if (!Array.isArray(messages) || !messages.length) return [];
  if (messages.length <= POKER_CHAT_OPEN_SNAPSHOT_MAX_MSG) return messages.slice();
  return messages.slice(-POKER_CHAT_OPEN_SNAPSHOT_MAX_MSG);
}
