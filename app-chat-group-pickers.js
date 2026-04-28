// Group chat picker data helpers shared by create/add-member modals.

/** Участники группы: только личные собеседники (Redis chat_partners), как во вкладке «Все» без «друзей без переписки» и без ростера общего чата. + DOM при отсутствии chatPartnerIds в кэше (legacy). */
function pokerBuildGroupModalContactList() {
  var d = window.__pokerLastContactsApiData;
  if ((!d || !Array.isArray(d.contacts) || d.contacts.length === 0) && typeof pokerTryReadContactsCache === "function") {
    try {
      var cCached = pokerTryReadContactsCache();
      if (cCached && cCached.ok && Array.isArray(cCached.contacts) && cCached.contacts.length) {
        d = cCached;
      }
    } catch (eCc) {}
  }
  var partnerAllow = null;
  if (d && Array.isArray(d.chatPartnerIds)) {
    partnerAllow = Object.create(null);
    for (var pai = 0; pai < d.chatPartnerIds.length; pai++) {
      var pav = d.chatPartnerIds[pai];
      if (pav == null || pav === "") continue;
      var ps = String(pav);
      var pvn = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(ps.trim()) : ps.trim();
      partnerAllow[pvn] = true;
      partnerAllow[ps] = true;
    }
  }
  var contactsRaw = d && Array.isArray(d.contacts) ? d.contacts : [];
  var contactsForListLike = contactsRaw.filter(function (c) {
    return !chatContactIsDuplicateOfPinnedDialog(c);
  });
  contactsForListLike = pokerSortContactsByDialogListPins(contactsForListLike);
  var contactsOnly = contactsForListLike.filter(function (c) {
    return c && c.id && !c.isGroupChat && String(c.id).indexOf("group_") !== 0;
  });
  var byId = Object.create(null);
  var myId0 = typeof window.__pokerResolveMyChatMemberId === "function" ? window.__pokerResolveMyChatMemberId() : "";
  var i;
  for (i = 0; i < contactsOnly.length; i++) {
    var c = contactsOnly[i];
    var idc = String(c.id);
    if (myId0 && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(idc, myId0)) continue;
    if (partnerAllow) {
      var idcN = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(idc) : idc;
      if (!partnerAllow[idcN] && !partnerAllow[idc]) continue;
    }
    if (byId[idc]) {
      byId[idc] = Object.assign({}, byId[idc], c);
    } else {
      byId[idc] = c;
    }
  }
  try {
    function mergeGroupPickDomPeer(idRaw, nameHint, onlineHint, adminHint) {
      if (!idRaw) return;
      var ids = normalizePeerIdForChat(String(idRaw).trim());
      if (!ids || ids.indexOf("group_") === 0) return;
      if (ids.indexOf("guest_") === 0) return;
      if (!(ids.indexOf("tg_") === 0 || ids.indexOf("vk_") === 0)) return;
      if (myId0 && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(ids, myId0)) return;
      if (partnerAllow) {
        var idsN = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(ids) : ids;
        if (!partnerAllow[idsN] && !partnerAllow[ids]) return;
      }
      if (byId[ids]) return;
      byId[ids] = {
        id: ids,
        name: (nameHint != null && String(nameHint).trim()) ? String(nameHint).trim() : ids,
        avatar: null,
        online: !!onlineHint,
        admin: !!adminHint,
        unreadCount: 0,
      };
    }
    var dlgV = document.getElementById("chatDialogsView");
    if (dlgV) {
      var admEls = dlgV.querySelectorAll(".chat-dialog-item[data-chat-user-id]");
      for (var ai = 0; ai < admEls.length; ai++) {
        var aEl = admEls[ai];
        var aUid = aEl.getAttribute("data-chat-user-id");
        var aNm = aEl.getAttribute("data-chat-user-name");
        var aOn = !!(aEl.querySelector && aEl.querySelector(".chat-dialog-item__online"));
        mergeGroupPickDomPeer(aUid, aNm || aUid, aOn, true);
      }
    }
    var ccRoot = document.getElementById("chatContacts");
    if (ccRoot) {
      var cBtns = ccRoot.querySelectorAll(".chat-contact[data-chat-id]");
      for (var ci = 0; ci < cBtns.length; ci++) {
        var cb = cBtns[ci];
        if (cb.getAttribute("data-chat-group") === "1") continue;
        var cid = cb.getAttribute("data-chat-id");
        if (!cid) continue;
        var cidN = normalizePeerIdForChat(cid);
        var cnm = cb.getAttribute("data-chat-name");
        var cOn = cb.getAttribute("data-chat-online") === "1";
        var ck = byId[cidN] ? cidN : cid;
        if (byId[ck]) {
          if (cOn && !byId[ck].online) byId[ck].online = true;
          continue;
        }
        mergeGroupPickDomPeer(cid, cnm || cidN || cid, cOn, false);
      }
    }
  } catch (eDomGp) {}
  var out = [];
  for (var k in byId) {
    if (Object.prototype.hasOwnProperty.call(byId, k)) out.push(byId[k]);
  }
  out.sort(function (a, b) {
    var oa = a.online === b.online ? 0 : a.online ? -1 : 1;
    if (oa !== 0) return oa;
    var na = String(a.contactName || a.name || a.id || "").toLowerCase();
    var nb = String(b.contactName || b.name || b.id || "").toLowerCase();
    return na.localeCompare(nb, "ru");
  });
  return out;
}

/**
 * GET /api/friends — источник правды для списка друзей, если mode=contacts пустой или ещё не пришёл.
 * Обновляет __pokerFriendsPickCache и __pokerChatFriendIdsSet для вкладки «Друзья».
 */
window.__pokerFetchFriendsForGroupPick = function (done) {
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
    if (typeof done === "function") done();
    return;
  }
  var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  fetch(base + "/api/friends" + fq)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (data && data.ok && Array.isArray(data.friends)) {
        window.__pokerFriendsPickCache = { ts: Date.now(), friends: data.friends };
        if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(data.friends.length);
        var set = window.__pokerChatFriendIdsSet || {};
        for (var i = 0; i < data.friends.length; i++) {
          var row = data.friends[i];
          if (!row || !row.userId) continue;
          var uid = String(row.userId);
          set[uid] = true;
          try {
            var nx = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(uid) : uid;
            if (nx && nx !== uid) set[nx] = true;
          } catch (eNx) {}
        }
        window.__pokerChatFriendIdsSet = set;
      }
    })
    .catch(function () {})
    .then(function () {
      if (typeof done === "function") done();
    });
};

/**
 * Если пикер пуст, один раз перезапрашиваем mode=contacts (обновятся chatPartnerIds и контакты).
 * Повторные вызовы подряд отключены, чтобы не зациклить сеть при открытой модалке.
 */
window.__pokerFetchGeneralRosterForGroupPickIfEmpty = function (done) {
  function runDone() {
    if (typeof done === "function") {
      try {
        done();
      } catch (eD) {}
    }
  }
  if (window.__pokerGroupPickContactsRetryOnce === false) {
    runDone();
    return;
  }
  window.__pokerGroupPickContactsRetryOnce = false;
  if (typeof window.__pokerReloadChatContacts === "function") {
    try {
      window.__pokerReloadChatContacts({ onLoaded: runDone });
      return;
    } catch (eRel) {}
  }
  runDone();
};
