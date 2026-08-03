var POKER_CHAT_CONTACTS_CACHE_KEY = "poker_chat_contacts_v8";
var POKER_CHAT_CONTACTS_LIST_FILTER_KEY = "poker_chat_contacts_list_filter";
function pokerChatPeerMetaIdVariants(peerId) {
  var raw = peerId != null ? String(peerId).trim() : "";
  var ids = [];
  function add(value) {
    var s = value != null ? String(value).trim() : "";
    if (!s) return;
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] === s) return;
    }
    ids.push(s);
  }
  add(raw);
  try {
    if (typeof normalizePeerIdForChat === "function") add(normalizePeerIdForChat(raw));
  } catch (ePeerMetaNorm) {}
  return ids;
}
function pokerChatPeerMetaKey(peerId) {
  var ids = pokerChatPeerMetaIdVariants(peerId);
  return ids.length ? ids[ids.length - 1] : "";
}
function pokerChatPeerMetaValue(value) {
  return value != null && String(value).trim() !== "" ? String(value).trim() : "";
}
function pokerChatPeerMetaFromContact(contact) {
  if (!contact || contact.id == null) return null;
  var id = pokerChatPeerMetaValue(contact.id);
  if (!id || (contact.isGroupChat && String(id).indexOf("group_") === 0)) return null;
  var meta = { id: id };
  var name = pokerChatPeerMetaValue(contact.name);
  var contactName = pokerChatPeerMetaValue(contact.contactName);
  var avatar = pokerChatPeerMetaValue(contact.avatar);
  var p21Id = pokerChatPeerMetaValue(contact.p21Id);
  if (name && name !== id) meta.name = name;
  if (contactName && contactName !== id) meta.contactName = contactName;
  if (avatar) meta.avatar = avatar;
  if (p21Id) meta.p21Id = p21Id;
  if (contact.pokerPlusVerified === true) meta.pokerPlusVerified = true;
  return meta;
}
function pokerRememberChatPeerMetaFromContact(contact) {
  var meta = pokerChatPeerMetaFromContact(contact);
  if (!meta) return false;
  var hasUseful = !!(meta.name || meta.contactName || meta.avatar || meta.p21Id || meta.pokerPlusVerified);
  if (!hasUseful) return false;
  window.__pokerChatPeerMetaById = window.__pokerChatPeerMetaById || {};
  var variants = pokerChatPeerMetaIdVariants(meta.id);
  for (var i = 0; i < variants.length; i++) {
    var key = variants[i];
    var prev = window.__pokerChatPeerMetaById[key] || {};
    window.__pokerChatPeerMetaById[key] = Object.assign({}, prev, meta, { id: key });
  }
  return true;
}
function pokerRememberChatPeerMetaFromContactsData(data) {
  if (!data || !Array.isArray(data.contacts)) return;
  for (var i = 0; i < data.contacts.length; i++) pokerRememberChatPeerMetaFromContact(data.contacts[i]);
}
function pokerGetCachedChatPeerMeta(peerId) {
  var ids = pokerChatPeerMetaIdVariants(peerId);
  try {
    if (window.__pokerChatPeerMetaById) {
      for (var i = 0; i < ids.length; i++) {
        if (window.__pokerChatPeerMetaById[ids[i]]) return window.__pokerChatPeerMetaById[ids[i]];
      }
    }
  } catch (ePeerMetaMem) {}
  try {
    var cached = typeof pokerTryReadContactsCache === "function" ? pokerTryReadContactsCache() : null;
    if (cached && Array.isArray(cached.contacts)) {
      pokerRememberChatPeerMetaFromContactsData(cached);
      if (window.__pokerChatPeerMetaById) {
        for (var j = 0; j < ids.length; j++) {
          if (window.__pokerChatPeerMetaById[ids[j]]) return window.__pokerChatPeerMetaById[ids[j]];
        }
      }
    }
  } catch (ePeerMetaCache) {}
  return null;
}
function pokerApplyChatPeerMetaToContact(contact, meta) {
  if (!contact || !meta) return contact;
  var id = contact.id != null ? String(contact.id).trim() : "";
  function needsText(value) {
    var s = value != null ? String(value).trim() : "";
    return !s || (id && s === id);
  }
  if (needsText(contact.name) && meta.name) contact.name = meta.name;
  if (needsText(contact.contactName) && meta.contactName) contact.contactName = meta.contactName;
  if ((contact.avatar == null || String(contact.avatar).trim() === "") && meta.avatar) contact.avatar = meta.avatar;
  if ((contact.p21Id == null || String(contact.p21Id).trim() === "") && meta.p21Id) contact.p21Id = meta.p21Id;
  if (contact.pokerPlusVerified !== true && meta.pokerPlusVerified === true) contact.pokerPlusVerified = true;
  return contact;
}
function pokerMergeChatPeerMetaIntoContactsData(data) {
  if (!data || !Array.isArray(data.contacts)) return data;
  var changed = false;
  for (var i = 0; i < data.contacts.length; i++) {
    var c = data.contacts[i];
    if (!c || c.id == null || c.isGroupChat) continue;
    var before = JSON.stringify({
      name: c.name,
      contactName: c.contactName,
      avatar: c.avatar,
      p21Id: c.p21Id,
      statusLevel: c.statusLevel,
      pokerPlusVerified: c.pokerPlusVerified,
    });
    pokerApplyChatPeerMetaToContact(c, pokerGetCachedChatPeerMeta(c.id));
    var after = JSON.stringify({
      name: c.name,
      contactName: c.contactName,
      avatar: c.avatar,
      p21Id: c.p21Id,
      statusLevel: c.statusLevel,
      pokerPlusVerified: c.pokerPlusVerified,
    });
    if (before !== after) changed = true;
  }
  return changed ? Object.assign({}, data, { contacts: data.contacts }) : data;
}
function pokerGetChatContactsListFilter() {
  try {
    var raw = sessionStorage.getItem(POKER_CHAT_CONTACTS_LIST_FILTER_KEY);
    if (raw === "friends") return "friends";
    return "all";
  } catch (eF) {
    return "all";
  }
}
function pokerSyncChatContactsFilterTabs() {
  var wrap = document.getElementById("chatContactsFilter");
  if (!wrap) return;
  var mode = pokerGetChatContactsListFilter();
  wrap.querySelectorAll(".chat-contacts-filter__tab").forEach(function (btn) {
    var f = btn.getAttribute("data-filter");
    var active = f === mode;
    btn.classList.toggle("chat-contacts-filter__tab--active", !!active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  try {
    var primaryBlock = document.getElementById("chatDialogsPrimaryBlock");
    if (primaryBlock) primaryBlock.classList.toggle("chat-dialogs-block--hidden-by-filter", mode !== "all");
  } catch (ePrimFilter) {}
}

var POKER_DEFAULT_FRIEND_ACCOUNT_IDS = ["ID803668", "ID403173", "ID400800"];

function pokerViewerAccountIdForFriendCount() {
  var candidates = [];
  try {
    var profileId = document.getElementById("profileUserId");
    candidates.push(profileId && profileId.textContent);
  } catch (eProfileFriendCountId) {}
  try { candidates.push(sessionStorage.getItem("poker_dt_id")); } catch (eSessionFriendCountId) {}
  try { candidates.push(localStorage.getItem("poker_dt_id")); } catch (eLocalFriendCountId) {}
  for (var i = 0; i < candidates.length; i += 1) {
    var value = String(candidates[i] || "").trim().toUpperCase();
    if (/^ID\d{6}$/.test(value)) return value;
  }
  return "";
}

function pokerFriendsCountWithDefaults(friendIds) {
  var seen = {};
  (Array.isArray(friendIds) ? friendIds : []).forEach(function (id) {
    var value = String(id || "").trim().toUpperCase();
    if (value) seen[value] = true;
  });
  var viewer = pokerViewerAccountIdForFriendCount();
  POKER_DEFAULT_FRIEND_ACCOUNT_IDS.forEach(function (id) {
    if (id !== viewer) seen[id] = true;
  });
  return Object.keys(seen).length;
}

/** Подписи «Друзья (N)» на кнопке профиля и вкладке списка чатов. count === null — без скобок (нет авторизации). */
function pokerUpdateFriendsCountLabels(count) {
  var hasCount = typeof count === "number" && !isNaN(count);
  var safeCount = hasCount ? Math.max(0, Math.floor(count)) : 0;
  var text =
    hasCount
      ? "Друзья (" + safeCount + ")"
      : "Друзья";
  try {
    var profileBtn = document.getElementById("profileFriendsBtn");
    if (profileBtn) {
      if (profileBtn.classList && profileBtn.classList.contains("profile-friends__btn")) {
        var label = profileBtn.querySelector("span");
        if (label) label.textContent = "Смотреть все";
      } else {
        profileBtn.textContent = text;
      }
    }
    var profileCount = document.getElementById("profileFriendsCount");
    if (profileCount) profileCount.textContent = hasCount ? "(" + safeCount + ")" : "";
    var chatTab = document.getElementById("chatContactsFilterFriends");
    if (chatTab) chatTab.textContent = text;
  } catch (eLbl) {}
}

function pokerUpdateFriendsCountLabelsFromContactsData(data) {
  if (!data || data.confirmedFriendIds !== true) return;
  if (!Array.isArray(data.friendIds)) return;
  pokerUpdateFriendsCountLabels(pokerFriendsCountWithDefaults(data.friendIds));
}

function pokerApplyLocalOutgoingFriendRequest(targetUserId) {
  var uid = targetUserId != null ? String(targetUserId) : "";
  if (!uid) return;
  window.__pokerChatOutgoingFriendRequestIdsSet = window.__pokerChatOutgoingFriendRequestIdsSet || {};
  window.__pokerChatOutgoingFriendRequestIdsSet[uid] = true;
  try {
    var nxUid = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(uid) : uid;
    if (nxUid && nxUid !== uid) window.__pokerChatOutgoingFriendRequestIdsSet[nxUid] = true;
  } catch (eReqNorm) {}
  try {
    if (typeof window.__pokerForceRerenderChatContactsFromCache === "function") {
      window.__pokerForceRerenderChatContactsFromCache();
    } else if (window.__pokerLastContactsApiData && typeof window.__pokerApplyContactsApiResponse === "function") {
      window.__pokerApplyContactsApiResponse(window.__pokerLastContactsApiData, { forceRerender: true });
    }
  } catch (eReqApply) {}
}
window.pokerApplyLocalOutgoingFriendRequest = pokerApplyLocalOutgoingFriendRequest;

function pokerRefreshFriendsCountFromApi() {
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
    pokerUpdateFriendsCountLabels(null);
    return;
  }
  var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  fetch(base + "/api/friends" + fq)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (data && data.ok && Array.isArray(data.friends)) {
        pokerUpdateFriendsCountLabels(data.friends.length);
        try {
          if (typeof window.pokerUpdateFriendsUnreadFromData === "function") window.pokerUpdateFriendsUnreadFromData(data);
        } catch (eFriendsUnread) {}
        if (Array.isArray(data.notices) && data.notices.length) {
          var messages = data.notices.map(function (row) {
            var name = row && (row.contactName || row.userName || row.userId) ? String(row.contactName || row.userName || row.userId) : "Игрок";
            return name + (row && row.status === "accepted" ? " принял заявку в друзья" : " отклонил заявку в друзья");
          });
          var text = messages.join("\n");
          if (text && tg && tg.showAlert) tg.showAlert(text);
          else if (text && typeof alert === "function") alert(text);
        }
      }
    })
    .catch(function () {});
}

function pokerApplyLocalFriendToChatContacts(targetUserId, contactName) {
  var peerIdsEqual =
    typeof window !== "undefined" && typeof window.__pokerPeerChatIdsEqual === "function"
      ? window.__pokerPeerChatIdsEqual
      : function (a, b) { return String(a || "") === String(b || ""); };
  var uid = targetUserId != null ? String(targetUserId) : "";
  if (!uid) return;
  window.__pokerChatFriendIdsSet = window.__pokerChatFriendIdsSet || {};
  window.__pokerChatFriendIdsSet[uid] = true;
  try {
    var nxUid = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(uid) : uid;
    if (nxUid && nxUid !== uid) window.__pokerChatFriendIdsSet[nxUid] = true;
  } catch (eFrNorm) {}
  var data = window.__pokerLastContactsApiData;
  if (data && Array.isArray(data.friendIds)) {
    var hasId = false;
    for (var fi = 0; fi < data.friendIds.length; fi++) {
      if (peerIdsEqual(data.friendIds[fi], uid)) {
        hasId = true;
        break;
      }
    }
    if (!hasId) data.friendIds.push(uid);
  }
  if (data && Array.isArray(data.contacts)) {
    for (var ci = 0; ci < data.contacts.length; ci++) {
      var row = data.contacts[ci];
      if (!row || row.id == null || !peerIdsEqual(row.id, uid)) continue;
      if (contactName != null) row.contactName = String(contactName).trim();
      break;
    }
  }
  try {
    if (typeof pokerApplyLocalFriendToFriendsPickCache === "function") pokerApplyLocalFriendToFriendsPickCache(uid, contactName);
  } catch (eFrCache) {}
  try {
    pokerUpdateFriendsCountLabelsFromContactsData(data);
  } catch (eFrLbl) {}
  try {
    if (typeof window.__pokerForceRerenderChatContactsFromCache === "function") {
      window.__pokerForceRerenderChatContactsFromCache();
    } else if (data && typeof window.__pokerApplyContactsApiResponse === "function") {
      window.__pokerApplyContactsApiResponse(data, { forceRerender: true });
    }
  } catch (eFrApply) {}
}

function pokerApplyLocalFriendToFriendsPickCache(targetUserId, contactName) {
  var peerIdsEqual =
    typeof window !== "undefined" && typeof window.__pokerPeerChatIdsEqual === "function"
      ? window.__pokerPeerChatIdsEqual
      : function (a, b) { return String(a || "") === String(b || ""); };
  var uid = targetUserId != null ? String(targetUserId) : "";
  if (!uid) return;
  var cache = window.__pokerFriendsPickCache;
  if (!cache || !Array.isArray(cache.friends)) return;
  var found = false;
  for (var i = 0; i < cache.friends.length; i++) {
    var row = cache.friends[i];
    if (!row || !row.userId || !peerIdsEqual(row.userId, uid)) continue;
    if (contactName != null) row.contactName = String(contactName).trim();
    found = true;
    break;
  }
  if (!found) {
    cache.friends.push({
      userId: uid,
      contactName: contactName != null ? String(contactName).trim() : "",
      username: "",
    });
  }
  cache.ts = Date.now();
}

function pokerRemoveLocalFriendFromChatContacts(targetUserId) {
  var friendDebugLog =
    typeof window !== "undefined" && typeof window.__pokerDebugChatFriendAction === "function"
      ? window.__pokerDebugChatFriendAction
      : function () {};
  var peerIdsEqual =
    typeof window !== "undefined" && typeof window.__pokerPeerChatIdsEqual === "function"
      ? window.__pokerPeerChatIdsEqual
      : function (a, b) { return String(a || "") === String(b || ""); };
  var uid = targetUserId != null ? String(targetUserId) : "";
  try {
    friendDebugLog("removeLocal:start", {
      targetUserId: targetUserId != null ? String(targetUserId) : "",
      uid: uid,
      hasLastContactsData: !!window.__pokerLastContactsApiData,
      friendIdsCount:
        window.__pokerLastContactsApiData && Array.isArray(window.__pokerLastContactsApiData.friendIds)
          ? window.__pokerLastContactsApiData.friendIds.length
          : null,
      contactsCount:
        window.__pokerLastContactsApiData && Array.isArray(window.__pokerLastContactsApiData.contacts)
          ? window.__pokerLastContactsApiData.contacts.length
          : null,
      friendsPickCount:
        window.__pokerFriendsPickCache && Array.isArray(window.__pokerFriendsPickCache.friends)
          ? window.__pokerFriendsPickCache.friends.length
          : null,
    });
  } catch (eFrDbgStart) {}
  if (!uid) return;
  var data = window.__pokerLastContactsApiData;
  var idsMap = {};
  function addFriendRemovalId(value) {
    if (value == null || value === "") return;
    var raw = String(value).trim();
    if (!raw) return;
    idsMap[raw] = true;
    try {
      var norm = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(raw) : raw;
      if (norm) idsMap[String(norm)] = true;
    } catch (eFrRemoveNorm) {}
  }
  function friendRemovalIdMatches(value) {
    if (value == null || value === "") return false;
    var raw = String(value).trim();
    if (!raw) return false;
    if (idsMap[raw]) return true;
    for (var knownId in idsMap) {
      if (!Object.prototype.hasOwnProperty.call(idsMap, knownId)) continue;
      if (peerIdsEqual(raw, knownId)) return true;
    }
    return false;
  }
  addFriendRemovalId(uid);
  try {
    if (data && Array.isArray(data.contacts)) {
      data.contacts.forEach(function (row) {
        if (!row || row.isGroupChat) return;
        var keys = [row.id, row.dtId, row.accountId, row.userId, row.chatUserId, row.__friendAccountId];
        var matched = false;
        for (var ki = 0; ki < keys.length; ki++) {
          if (friendRemovalIdMatches(keys[ki]) || peerIdsEqual(keys[ki], uid)) {
            matched = true;
            break;
          }
        }
        if (!matched) return;
        keys.forEach(addFriendRemovalId);
      });
    }
  } catch (eFrContactsIds) {}
  try {
    var cacheIds = window.__pokerFriendsPickCache;
    if (cacheIds && Array.isArray(cacheIds.friends)) {
      cacheIds.friends.forEach(function (row) {
        if (!row) return;
        var keys = [row.userId, row.chatUserId, row.accountId, row.id];
        var matched = false;
        for (var ki = 0; ki < keys.length; ki++) {
          if (friendRemovalIdMatches(keys[ki]) || peerIdsEqual(keys[ki], uid)) {
            matched = true;
            break;
          }
        }
        if (!matched) return;
        keys.forEach(addFriendRemovalId);
      });
    }
  } catch (eFrCacheIds) {}
  var ids = Object.keys(idsMap);
  var set = window.__pokerChatFriendIdsSet || {};
  try {
    ids.forEach(function (id) {
      delete set[id];
    });
    friendDebugLog("removeLocal:deletedDirectKey", {
      uid: uid,
      ids: ids,
    });
  } catch (eFrDel) {}
  try {
    var nxUid = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(uid) : uid;
    if (nxUid) delete set[nxUid];
    friendDebugLog("removeLocal:normalizedKey", {
      uid: uid,
      normalizedUid: nxUid || "",
      sameAsUid: nxUid === uid,
    });
  } catch (eFrNormDel) {}
  window.__pokerChatFriendIdsSet = set;
  if (data && Array.isArray(data.friendIds)) {
    try {
      var beforeFriendIdsCount = data.friendIds.length;
      data.friendIds = data.friendIds.filter(function (fid) {
        return !friendRemovalIdMatches(fid);
      });
      friendDebugLog("removeLocal:friendIdsFiltered", {
        uid: uid,
        ids: ids,
        beforeFriendIdsCount: beforeFriendIdsCount,
        afterFriendIdsCount: data.friendIds.length,
      });
    } catch (eFrFriendIds) {
      friendDebugLog("removeLocal:friendIdsFilterError", {
        uid: uid,
        error: eFrFriendIds && eFrFriendIds.message ? eFrFriendIds.message : String(eFrFriendIds || ""),
      });
      throw eFrFriendIds;
    }
  }
  if (data && Array.isArray(data.contacts)) {
    try {
      var matchedContactId = "";
      var hasChatPartnerList = data && Array.isArray(data.chatPartnerIds);
      function isCurrentChatPartner() {
        if (!hasChatPartnerList) return true;
        for (var pi = 0; pi < data.chatPartnerIds.length; pi++) {
          if (friendRemovalIdMatches(data.chatPartnerIds[pi]) || peerIdsEqual(data.chatPartnerIds[pi], uid)) return true;
        }
        return false;
      }
      var keepAsChatPartner = isCurrentChatPartner();
      data.contacts = data.contacts.filter(function (row) {
        if (
          !row ||
          !(
            friendRemovalIdMatches(row.id) ||
            friendRemovalIdMatches(row.dtId) ||
            friendRemovalIdMatches(row.accountId) ||
            friendRemovalIdMatches(row.userId) ||
            friendRemovalIdMatches(row.chatUserId) ||
            friendRemovalIdMatches(row.__friendAccountId)
          )
        ) return true;
        row.contactName = "";
        matchedContactId = String(row.id);
        return keepAsChatPartner;
      });
      friendDebugLog("removeLocal:contactsPatched", {
        uid: uid,
        contactsCount: data.contacts.length,
        matchedContactId: matchedContactId,
        keepAsChatPartner: keepAsChatPartner,
      });
    } catch (eFrContacts) {
      friendDebugLog("removeLocal:contactsPatchError", {
        uid: uid,
        error: eFrContacts && eFrContacts.message ? eFrContacts.message : String(eFrContacts || ""),
      });
      throw eFrContacts;
    }
  }
  try {
    var cache = window.__pokerFriendsPickCache;
    if (cache && Array.isArray(cache.friends)) {
      var beforePickCount = cache.friends.length;
      cache.friends = cache.friends.filter(function (row) {
        if (!row) return true;
        return !(
          friendRemovalIdMatches(row.userId) ||
          friendRemovalIdMatches(row.chatUserId) ||
          friendRemovalIdMatches(row.accountId) ||
          friendRemovalIdMatches(row.id)
        );
      });
      cache.ts = Date.now();
      friendDebugLog("removeLocal:friendsPickFiltered", {
        uid: uid,
        ids: ids,
        beforePickCount: beforePickCount,
        afterPickCount: cache.friends.length,
      });
    }
  } catch (eFrPickDel) {
    friendDebugLog("removeLocal:friendsPickFilterError", {
      uid: uid,
      error: eFrPickDel && eFrPickDel.message ? eFrPickDel.message : String(eFrPickDel || ""),
    });
  }
  try {
    pokerUpdateFriendsCountLabelsFromContactsData(data);
    friendDebugLog("removeLocal:friendsCountUpdated", {
      uid: uid,
      friendIdsCount: data && Array.isArray(data.friendIds) ? data.friendIds.length : null,
    });
  } catch (eFrLblDel) {
    friendDebugLog("removeLocal:friendsCountUpdateError", {
      uid: uid,
      error: eFrLblDel && eFrLblDel.message ? eFrLblDel.message : String(eFrLblDel || ""),
    });
  }
  try {
    if (typeof window.pokerRemoveFriendFromOpenFriendsList === "function") {
      window.pokerRemoveFriendFromOpenFriendsList(uid);
    }
  } catch (eFrOpenListDel) {}
  try {
    if (typeof window.__pokerForceRerenderChatContactsFromCache === "function") {
      window.__pokerForceRerenderChatContactsFromCache();
      friendDebugLog("removeLocal:rerenderFromCache", {
        uid: uid,
        rerenderMode: "forceRerenderChatContactsFromCache",
      });
    } else if (data && typeof window.__pokerApplyContactsApiResponse === "function") {
      window.__pokerApplyContactsApiResponse(data, { forceRerender: true });
      friendDebugLog("removeLocal:rerenderFromApply", {
        uid: uid,
        rerenderMode: "applyContactsApiResponse",
      });
    }
  } catch (eFrApplyDel) {
    friendDebugLog("removeLocal:rerenderError", {
      uid: uid,
      error: eFrApplyDel && eFrApplyDel.message ? eFrApplyDel.message : String(eFrApplyDel || ""),
    });
  }
  try {
    friendDebugLog("removeLocal:done", {
      uid: uid,
      isFriendAfterRemove:
        typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(uid) : false,
    });
  } catch (eFrDbgDone) {}
}


function pokerApplyChatContactsUnreadState(data, opts) {
  opts = opts || {};
  if (!data || !Array.isArray(data.contacts)) return 0;
  // A contacts response can race the request that marks the currently open
  // thread as read. Never let that stale response restore its unread badge.
  try {
    var activeReadPeer = typeof chatWithUserId !== "undefined" ? chatWithUserId : null;
    var activeConversationVisible = !!(
      activeReadPeer &&
      typeof convView !== "undefined" &&
      convView &&
      !convView.classList.contains("chat-conv-view--hidden")
    );
    if (activeConversationVisible) {
      data.contacts.forEach(function (contact) {
        if (contact && peerChatIdsEqual(contact.id, activeReadPeer)) contact.unreadCount = 0;
      });
    }
  } catch (eActiveUnreadReset) {}
  var fromFilterOnly = !!opts.fromFilterOnly;
  try {
    if (!fromFilterOnly && typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
      var nextUC = {};
      for (var ui = 0; ui < data.contacts.length; ui++) {
        var c0 = data.contacts[ui];
        if (!c0 || c0.id == null || String(c0.id) === "") continue;
        var uc0 = Number(c0.unreadCount);
        if (isNaN(uc0)) uc0 = 0;
        nextUC[String(c0.id)] = uc0;
      }
      if (!window.__pokerChatContactsUnreadSoundPrimed) {
        window.__pokerChatContactsUnreadSoundPrimed = true;
        window.__pokerChatContactsUnreadSnap = nextUC;
      } else {
        var prevUC = window.__pokerChatContactsUnreadSnap || {};
        var anyIncOther = false;
        var activePeer = typeof chatWithUserId !== "undefined" ? chatWithUserId : null;
        for (var uk in nextUC) {
          if (!Object.prototype.hasOwnProperty.call(nextUC, uk)) continue;
          var ucN = nextUC[uk];
          var pu = prevUC[uk];
          if (pu == null || isNaN(pu)) pu = 0;
          if (ucN > pu && (!activePeer || !peerChatIdsEqual(uk, activePeer))) {
            anyIncOther = true;
            try {
              if (typeof personalMessagesCache !== "undefined") delete personalMessagesCache[uk];
              if (typeof personalMessagesCacheMeta !== "undefined") personalMessagesCacheMeta[uk] = { ts: 0, bust: true };
            } catch (eInvPeer) {}
          }
        }
        window.__pokerChatContactsUnreadSnap = nextUC;
        if (
          anyIncOther &&
          typeof pokerReadChatMessageSoundEnabled === "function" &&
          pokerReadChatMessageSoundEnabled() &&
          typeof pokerPlayChatMessageNotificationSound === "function"
        ) {
          pokerPlayChatMessageNotificationSound();
        }
      }
    }
  } catch (eContSound) {}
  var sumPersonalUnreads = 0;
  for (var su = 0; su < data.contacts.length; su++) {
    var sc = data.contacts[su];
    if (!sc) continue;
    var suc = Number(sc.unreadCount);
    if (!isNaN(suc) && suc > 0) sumPersonalUnreads += suc;
  }
  window.chatPersonalUnreadTotalFromContacts = sumPersonalUnreads;
  return sumPersonalUnreads;
}

function pokerBuildChatContactsFriendSet(data) {
  var friendSet = {};
  if (data && data.confirmedFriendIds === true && data.friendIds && Array.isArray(data.friendIds)) {
    for (var fi = 0; fi < data.friendIds.length; fi++) {
      var fid = data.friendIds[fi];
      if (fid == null || String(fid) === "") continue;
      var fstr = String(fid);
      friendSet[fstr] = true;
      try {
        var fnorm = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(fstr) : fstr;
        if (fnorm && fnorm !== fstr) friendSet[fnorm] = true;
      } catch (eFnFr) {}
    }
    try {
      pokerUpdateFriendsCountLabelsFromContactsData(data);
    } catch (eFc) {}
  }
  window.__pokerChatFriendIdsSet = friendSet;
  var requestSet = {};
  if (data && Array.isArray(data.friendRequestOutgoingIds)) {
    for (var rq = 0; rq < data.friendRequestOutgoingIds.length; rq++) {
      var rid = data.friendRequestOutgoingIds[rq];
      if (rid == null || String(rid) === "") continue;
      var rstr = String(rid);
      requestSet[rstr] = true;
      try {
        var rnorm = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(rstr) : rstr;
        if (rnorm && rnorm !== rstr) requestSet[rnorm] = true;
      } catch (eRqNorm) {}
    }
  }
  window.__pokerChatOutgoingFriendRequestIdsSet = requestSet;
  try {
    var fpcM = window.__pokerFriendsPickCache && Array.isArray(window.__pokerFriendsPickCache.friends)
      ? window.__pokerFriendsPickCache.friends
      : [];
    for (var fmj = 0; fmj < fpcM.length; fmj++) {
      var frv = fpcM[fmj];
      if (!frv || !frv.userId) continue;
      var um = String(frv.userId);
      window.__pokerChatFriendIdsSet[um] = true;
      try {
        var fn2 = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(um) : um;
        if (fn2 && fn2 !== um) window.__pokerChatFriendIdsSet[fn2] = true;
      } catch (eFn2) {}
    }
  } catch (eFpcM) {}
  return friendSet;
}

function pokerBuildChatContactsListState(data) {
  var contacts = data && Array.isArray(data.contacts) ? data.contacts : [];
  var contactsForList = contacts.filter(function (c) {
    return !chatContactIsDuplicateOfPinnedDialog(c);
  });
  var contactsFilterMode = pokerGetChatContactsListFilter();
  var showFriendsOnly = contactsFilterMode === "friends";
  if (!showFriendsOnly && data && Array.isArray(data.chatPartnerIds)) {
    contactsForList = contactsForList.filter(function (c) {
      if (!c || c.isGroupChat) return true;
      for (var cpi = 0; cpi < data.chatPartnerIds.length; cpi++) {
        if (peerChatIdsEqual(data.chatPartnerIds[cpi], c.id)) return true;
      }
      return false;
    });
  }
  contactsForList = pokerSortContactsByDialogListPins(contactsForList);
  return {
    contactsForList: contactsForList,
    contactsFilterMode: contactsFilterMode,
    showFriendsOnly: showFriendsOnly,
  };
}

function pokerApplyChatContactsFriendsOnlyList(contactsForList, friendSet, friendsRowsForList) {
  contactsForList = chatBuildFriendContactsFromFriendsApi(friendsRowsForList, contactsForList);
  contactsForList.forEach(function (c) {
    if (!c) return;
    if (c.id != null) friendSet[String(c.id)] = true;
    if (c.dtId != null) friendSet[String(c.dtId)] = true;
    if (c.__friendAccountId) friendSet[String(c.__friendAccountId)] = true;
  });
  return contactsForList;
}

function pokerApplyChatContactsMetaState(data, callbacks) {
  callbacks = callbacks || {};
  data = data || {};
  window.chatAdminUnread = data.adminUnread || {};
  var genUnread = data.generalUnreadCount != null ? data.generalUnreadCount : 0;
  window.chatGeneralUnreadCount = genUnread;
  window.chatGeneralUnread = genUnread > 0;
  var total = data.participantsCount != null ? data.participantsCount : "—";
  var prevOnline = "—";
  try {
    var prevStatsMatch = String(window.lastListStats || "").match(/·\s*([^ ]+)\s+онл/);
    if (prevStatsMatch && prevStatsMatch[1]) prevOnline = prevStatsMatch[1];
  } catch (ePrevListOnline) {}
  var online = data.onlineCount != null ? data.onlineCount : prevOnline;
  window.lastListStats = total + " конт · " + online + " онл";
  if (typeof callbacks.updateHeaderStats === "function") callbacks.updateHeaderStats();
  if (data.generalChatParticipantsCount != null) {
    if (!window._chatGeneralCache || typeof window._chatGeneralCache !== "object") {
      window._chatGeneralCache = { messages: [], generalMembers: [] };
    }
    window._chatGeneralCache.participantsCount = data.generalChatParticipantsCount;
    if (data.generalChatOnlineCount != null) {
      window._chatGeneralCache.onlineCount = data.generalChatOnlineCount;
    }
    try {
      if (typeof callbacks.syncRoster === "function") callbacks.syncRoster();
    } catch (eRosterContacts) {}
  }
  if (data.generalChatPreview != null && typeof callbacks.updatePreviewText === "function") {
    callbacks.updatePreviewText(data.generalChatPreview);
  }
}

function pokerRefreshChatContactsGroupPickers(callbacks) {
  callbacks = callbacks || {};
  try {
    var cgMx = document.getElementById("chatCreateGroupModal");
    if (
      cgMx &&
      !cgMx.classList.contains("chat-create-group-modal--hidden") &&
      typeof window.__pokerRefreshCreateGroupPickers === "function"
    ) {
      window.__pokerRefreshCreateGroupPickers();
    }
    var gaMx = document.getElementById("chatGroupAddMembersModal");
    if (
      gaMx &&
      !gaMx.classList.contains("chat-create-group-modal--hidden") &&
      typeof window.__pokerRefreshGroupAddPickers === "function"
    ) {
      window.__pokerRefreshGroupAddPickers();
    }
    var pickModalOpen =
      (cgMx && !cgMx.classList.contains("chat-create-group-modal--hidden")) ||
      (gaMx && !gaMx.classList.contains("chat-create-group-modal--hidden"));
    if (
      pickModalOpen &&
      typeof window.__pokerFetchGeneralRosterForGroupPickIfEmpty === "function" &&
      typeof callbacks.buildGroupModalContactList === "function" &&
      callbacks.buildGroupModalContactList().length === 0
    ) {
      window.__pokerFetchGeneralRosterForGroupPickIfEmpty(function () {
        try {
          if (typeof window.__pokerRefreshCreateGroupPickers === "function") {
            window.__pokerRefreshCreateGroupPickers();
          }
          if (typeof window.__pokerRefreshGroupAddPickers === "function") {
            window.__pokerRefreshGroupAddPickers();
          }
        } catch (ePickF) {}
      });
    }
  } catch (ePkRf) {}
}

function pokerBindChatContactsFilterHandler(contactsEl, callbacks) {
  callbacks = callbacks || {};
  if (!contactsEl || contactsEl._chatContactsFilterBound) return;
  contactsEl._chatContactsFilterBound = true;
  var filterWrapEl = document.getElementById("chatContactsFilter");
  if (!filterWrapEl) return;
  filterWrapEl.addEventListener("click", function (e) {
    var tb = e.target && e.target.closest ? e.target.closest(".chat-contacts-filter__tab") : null;
    if (!tb || !filterWrapEl.contains(tb)) return;
    var fv = tb.getAttribute("data-filter");
    if (fv !== "friends" && fv !== "all") return;
    try {
      sessionStorage.setItem(POKER_CHAT_CONTACTS_LIST_FILTER_KEY, fv === "friends" ? "friends" : "all");
    } catch (eStF) {}
    pokerSyncChatContactsFilterTabs();
    if (fv === "friends" && typeof window.__pokerFetchFriendsForGroupPick === "function") {
      contactsEl.innerHTML =
        '<div class="chat-contacts-list-block">' +
        '<p class="chat-empty">Загружаем друзей…</p>' +
        "</div>";
      window.__pokerFetchFriendsForGroupPick(function () {
        if (window.__pokerLastContactsApiData && typeof callbacks.applyContactsApiResponse === "function") {
          callbacks.applyContactsApiResponse(window.__pokerLastContactsApiData, {
            fromFilterOnly: true,
            forceRerender: true,
            friendsFetchDone: true,
          });
        }
      });
    } else if (window.__pokerLastContactsApiData && typeof callbacks.applyContactsApiResponse === "function") {
      callbacks.applyContactsApiResponse(window.__pokerLastContactsApiData, { fromFilterOnly: true });
    }
  });
}

function pokerHydrateChatContactsFromInstantCache(opts) {
  opts = opts || {};
  try {
    var metaOnly = !!opts.metaOnly;
    var c0 = !metaOnly && window.__pokerLastContactsApiData && Array.isArray(window.__pokerLastContactsApiData.contacts)
      ? window.__pokerLastContactsApiData
      : pokerTryReadContactsCache();
    if (!metaOnly && c0 && Array.isArray(c0.contacts)) {
      if (typeof opts.applyContactsApiResponse === "function") {
        opts.applyContactsApiResponse(c0, { fromInstantCache: true });
      }
      if (typeof opts.fireContactsLoaded === "function") opts.fireContactsLoaded();
      return true;
    }
  } catch (eInst) {}
  return false;
}

function pokerPrepareChatContactsFetchData(data, opts) {
  opts = opts || {};
  var metaOnly = !!opts.metaOnly;
  if (metaOnly && data && data.notModified === true && data.pollRev) {
    if (typeof data.pollRev === "string") window.__pokerContactsMetaPollRev = data.pollRev;
    if (data.trace && data.trace.serverNowMs && typeof opts.recordTrace === "function") {
      opts.recordTrace("contacts-wait-timeout", {
        rttMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)),
        waited: !!data.waited,
      });
    }
    if (opts.waitForChange && typeof opts.scheduleLongPoll === "function") opts.scheduleLongPoll("contacts", 0);
    if (typeof opts.fireContactsLoaded === "function") opts.fireContactsLoaded();
    return { handled: true, data: data };
  }
  if (metaOnly && data && data.ok && data.contactsMetaOnly) {
    if (data.pollRev && typeof data.pollRev === "string") window.__pokerContactsMetaPollRev = data.pollRev;
    var baseContactsData = window.__pokerLastContactsApiData;
    if (!baseContactsData && typeof pokerTryReadContactsCache === "function") {
      try {
        baseContactsData = pokerTryReadContactsCache();
      } catch (eMetaCache) {}
    }
    var mergedMeta = typeof opts.mergeContactsMetaPayload === "function"
      ? opts.mergeContactsMetaPayload(baseContactsData, data)
      : null;
    if (!mergedMeta) {
      window.__pokerContactsMetaPollRev = null;
      if (typeof opts.loadContacts === "function") opts.loadContacts({ onLoaded: opts.onContactsLoaded });
      return { handled: true, data: data };
    }
    return { handled: false, data: mergedMeta };
  }
  if (!metaOnly) window.__pokerContactsMetaPollRev = null;
  return { handled: false, data: data };
}

function pokerCompleteChatContactsFetchData(data, opts) {
  opts = opts || {};
  var metaOnly = !!opts.metaOnly;
  try {
    if (data && data.ok && !opts.fastBare) pokerWriteContactsCache(data);
  } catch (eSav) {}
  if (typeof opts.applyContactsApiResponse === "function") opts.applyContactsApiResponse(data);
  if (opts.waitForChange && metaOnly && typeof opts.scheduleLongPoll === "function") {
    opts.scheduleLongPoll("contacts", 0);
  }
  if (data && data.trace && data.trace.serverNowMs && data.ok && metaOnly && typeof opts.recordTrace === "function") {
    opts.recordTrace("contacts-delivery", {
      serverToClientMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)),
      rows: Array.isArray(data.contacts) ? data.contacts.length : 0,
    });
  }
  if (typeof opts.fireContactsLoaded === "function") opts.fireContactsLoaded();
}

function pokerHandleChatContactsFetchError(opts) {
  opts = opts || {};
  if (!opts.contactsInstantFromCache && opts.contactsEl) {
    opts.contactsEl.innerHTML = '<div class="chat-contacts-list-block"><p class="chat-empty">Ошибка</p></div>';
  }
  if (opts.waitForChange && opts.metaOnly && typeof opts.scheduleLongPoll === "function") {
    opts.scheduleLongPoll("contacts", 1200);
  }
  if (typeof opts.fireContactsLoaded === "function") opts.fireContactsLoaded();
  if (window.__openClubChatAfterNextContacts) {
    window.__openClubChatAfterNextContacts = false;
    setTimeout(function () {
      if (typeof opts.tryOpenClubChatFromDialogs === "function") opts.tryOpenClubChatFromDialogs();
      else if (typeof opts.openClubChat === "function") opts.openClubChat();
    }, 0);
  }
}

function pokerChatPeerIdIsFriend(pid) {
  if (!pid) return false;
  var set = window.__pokerChatFriendIdsSet;
  if (!set) return false;
  if (set[String(pid)]) return true;
  try {
    for (var pk in set) {
      if (set[pk] && peerChatIdsEqual(pk, pid)) return true;
    }
  } catch (eR) {}
  return false;
}

function pokerChatPeerIdHasOutgoingFriendRequest(pid) {
  if (!pid) return false;
  var set = window.__pokerChatOutgoingFriendRequestIdsSet;
  if (!set) return false;
  if (set[String(pid)]) return true;
  try {
    for (var pk in set) {
      if (set[pk] && peerChatIdsEqual(pk, pid)) return true;
    }
  } catch (eReq) {}
  return false;
}
window.pokerChatPeerIdHasOutgoingFriendRequest = pokerChatPeerIdHasOutgoingFriendRequest;

function pokerPeerIsInMyChatPartnerList(peerIdRaw) {
  if (peerIdRaw == null || peerIdRaw === "") return false;
  var d = window.__pokerLastContactsApiData;
  if ((!d || !Array.isArray(d.chatPartnerIds)) && typeof pokerTryReadContactsCache === "function") {
    try {
      var cPr = pokerTryReadContactsCache();
      if (cPr && cPr.ok && Array.isArray(cPr.chatPartnerIds)) d = cPr;
    } catch (ePr) {}
  }
  if (!d || !Array.isArray(d.chatPartnerIds)) return true;
  var norm =
    typeof normalizePeerIdForChat === "function"
      ? normalizePeerIdForChat(String(peerIdRaw).trim())
      : String(peerIdRaw).trim();
  for (var pi = 0; pi < d.chatPartnerIds.length; pi++) {
    var p = d.chatPartnerIds[pi];
    if (p == null || p === "") continue;
    var pn =
      typeof normalizePeerIdForChat === "function"
        ? normalizePeerIdForChat(String(p).trim())
        : String(p).trim();
    if (pn === norm) return true;
    if (typeof peerChatIdsEqual === "function" && peerChatIdsEqual(pn, norm)) return true;
  }
  return false;
}

function pokerChatContactsAuthFingerprint() {
  var q = "";
  try {
    if (typeof pokerApiAuthQuery === "function") q = pokerApiAuthQuery("&") || "";
  } catch (eFp) {}
  if (!q || q === "&initData=") return "";
  return q;
}
function pokerTryReadContactsCache() {
  try {
    if (typeof localStorage === "undefined") return null;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return null;
    var fp = pokerChatContactsAuthFingerprint();
    if (!fp) return null;
    var raw = localStorage.getItem(POKER_CHAT_CONTACTS_CACHE_KEY);
    if (!raw) return null;
    if (raw.length > 800000) {
      localStorage.removeItem(POKER_CHAT_CONTACTS_CACHE_KEY);
      return null;
    }
    var pack = JSON.parse(raw);
    if (!pack || typeof pack.fp !== "string" || pack.fp !== fp || pack.data == null) return null;
    return typeof pokerSanitizeContactsPayloadForUi === "function"
      ? pokerSanitizeContactsPayloadForUi(pack.data)
      : pack.data;
  } catch (eRd) {
    return null;
  }
}
function pokerWriteContactsCache(data) {
  try {
    if (typeof localStorage === "undefined" || !data || !data.ok) return;
    var fp = pokerChatContactsAuthFingerprint();
    if (!fp) return;
    var sanitized = typeof pokerSanitizeContactsPayloadForUi === "function"
      ? pokerSanitizeContactsPayloadForUi(data)
      : data;
    localStorage.setItem(POKER_CHAT_CONTACTS_CACHE_KEY, JSON.stringify({ fp: fp, t: Date.now(), data: sanitized }));
  } catch (eWr) {}
}
