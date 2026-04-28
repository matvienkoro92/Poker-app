var POKER_CHAT_CONTACTS_CACHE_KEY = "poker_chat_contacts_v7";
var POKER_CHAT_CONTACTS_LIST_FILTER_KEY = "poker_chat_contacts_list_filter";
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

/** Подписи «Друзья (N)» на кнопке профиля и вкладке списка чатов. count === null — без скобок (нет авторизации). */
function pokerUpdateFriendsCountLabels(count) {
  var text =
    typeof count === "number" && !isNaN(count)
      ? "Друзья (" + Math.max(0, Math.floor(count)) + ")"
      : "Друзья";
  try {
    var profileBtn = document.getElementById("profileFriendsBtn");
    if (profileBtn) profileBtn.textContent = text;
    var chatTab = document.getElementById("chatContactsFilterFriends");
    if (chatTab) chatTab.textContent = text;
  } catch (eLbl) {}
}

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
    if (typeof pokerUpdateFriendsCountLabels === "function" && data && Array.isArray(data.friendIds)) {
      pokerUpdateFriendsCountLabels(data.friendIds.length);
    }
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
  var set = window.__pokerChatFriendIdsSet || {};
  try {
    delete set[uid];
    friendDebugLog("removeLocal:deletedDirectKey", {
      uid: uid,
      hadDirectKeyBefore: !!set[uid],
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
  var data = window.__pokerLastContactsApiData;
  if (data && Array.isArray(data.friendIds)) {
    try {
      var beforeFriendIdsCount = data.friendIds.length;
      data.friendIds = data.friendIds.filter(function (fid) {
        return !peerIdsEqual(fid, uid);
      });
      friendDebugLog("removeLocal:friendIdsFiltered", {
        uid: uid,
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
          if (peerIdsEqual(data.chatPartnerIds[pi], uid)) return true;
        }
        return false;
      }
      var keepAsChatPartner = isCurrentChatPartner();
      data.contacts = data.contacts.filter(function (row) {
        if (!row || row.id == null || !peerIdsEqual(row.id, uid)) return true;
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
        return row && row.userId != null ? !peerIdsEqual(row.userId, uid) : true;
      });
      cache.ts = Date.now();
      friendDebugLog("removeLocal:friendsPickFiltered", {
        uid: uid,
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
    if (typeof pokerUpdateFriendsCountLabels === "function" && data && Array.isArray(data.friendIds)) {
      pokerUpdateFriendsCountLabels(data.friendIds.length);
    }
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
  if (data && data.friendIds && Array.isArray(data.friendIds)) {
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
      if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(data.friendIds.length);
    } catch (eFc) {}
  }
  window.__pokerChatFriendIdsSet = friendSet;
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
    if (typeof pokerUpdateFriendsCountLabels === "function" && fpcM.length > 0) pokerUpdateFriendsCountLabels(fpcM.length);
  } catch (eFpcM) {}
  return friendSet;
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
