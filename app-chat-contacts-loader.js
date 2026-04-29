// Chat contacts loader: request URL, meta merge, contacts fetch and apply pipeline.

function initChatContactsLoader(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var CHAT_LONG_POLL_TIMEOUT_MS = Number(opts.CHAT_LONG_POLL_TIMEOUT_MS) || 25000;
  var getContactsEl = typeof opts.getContactsEl === "function" ? opts.getContactsEl : function () { return null; };
  var getLastViewedPersonal = typeof opts.getLastViewedPersonal === "function" ? opts.getLastViewedPersonal : function () { return {}; };
  var getLastViewedGeneral = typeof opts.getLastViewedGeneral === "function" ? opts.getLastViewedGeneral : function () { return null; };
  var setChatIsAdmin = typeof opts.setChatIsAdmin === "function" ? opts.setChatIsAdmin : function () {};
  var setClubChatAccess = typeof opts.setClubChatAccess === "function" ? opts.setClubChatAccess : function () {};
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function () { return "?"; };
  var forceHideChatGuestGateForTelegram = typeof opts.forceHideChatGuestGateForTelegram === "function" ? opts.forceHideChatGuestGateForTelegram : function () {};
  var getPokerResolvedTelegramUser = typeof opts.getPokerResolvedTelegramUser === "function" ? opts.getPokerResolvedTelegramUser : null;
  var pokerReadPwaGuestMode = typeof opts.pokerReadPwaGuestMode === "function" ? opts.pokerReadPwaGuestMode : null;
  var pokerHydrateChatSnapshotsFromDisk = typeof opts.pokerHydrateChatSnapshotsFromDisk === "function" ? opts.pokerHydrateChatSnapshotsFromDisk : function () {};
  var syncChatWebsiteGuestGate = typeof opts.syncChatWebsiteGuestGate === "function" ? opts.syncChatWebsiteGuestGate : function () { return false; };
  var updateDialogUnreadBadges = typeof opts.updateDialogUnreadBadges === "function" ? opts.updateDialogUnreadBadges : function () {};
  var updateChatNavDot = typeof opts.updateChatNavDot === "function" ? opts.updateChatNavDot : function () {};
  var pokerSanitizeContactsPayloadForUi = typeof opts.pokerSanitizeContactsPayloadForUi === "function" ? opts.pokerSanitizeContactsPayloadForUi : null;
  var tryOpenClubChatFromDialogs = typeof opts.tryOpenClubChatFromDialogs === "function" ? opts.tryOpenClubChatFromDialogs : null;
  var openClubChat = typeof opts.openClubChat === "function" ? opts.openClubChat : null;
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerSyncChatContactsFilterTabs = typeof opts.pokerSyncChatContactsFilterTabs === "function" ? opts.pokerSyncChatContactsFilterTabs : function () {};
  var pokerApplyChatContactsUnreadState = typeof opts.pokerApplyChatContactsUnreadState === "function" ? opts.pokerApplyChatContactsUnreadState : function () {};
  var prefetchTopPersonalDialogs = typeof opts.prefetchTopPersonalDialogs === "function" ? opts.prefetchTopPersonalDialogs : function () {};
  var pokerBuildChatContactsListState = typeof opts.pokerBuildChatContactsListState === "function" ? opts.pokerBuildChatContactsListState : function () { return { contactsForList: [], showFriendsOnly: false }; };
  var pokerBuildChatContactsFriendSet = typeof opts.pokerBuildChatContactsFriendSet === "function" ? opts.pokerBuildChatContactsFriendSet : function () { return {}; };
  var pokerRefreshChatContactsGroupPickers = typeof opts.pokerRefreshChatContactsGroupPickers === "function" ? opts.pokerRefreshChatContactsGroupPickers : function () {};
  var pokerBuildGroupModalContactList = typeof opts.pokerBuildGroupModalContactList === "function" ? opts.pokerBuildGroupModalContactList : null;
  var chatCachedFriendRows = typeof opts.chatCachedFriendRows === "function" ? opts.chatCachedFriendRows : function () { return []; };
  var pokerApplyChatContactsFriendsOnlyList = typeof opts.pokerApplyChatContactsFriendsOnlyList === "function" ? opts.pokerApplyChatContactsFriendsOnlyList : function (rows) { return rows || []; };
  var pokerApplyChatContactsMetaState = typeof opts.pokerApplyChatContactsMetaState === "function" ? opts.pokerApplyChatContactsMetaState : function () {};
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var syncClubChatRosterUi = typeof opts.syncClubChatRosterUi === "function" ? opts.syncClubChatRosterUi : function () {};
  var updateClubChatPreviewText = typeof opts.updateClubChatPreviewText === "function" ? opts.updateClubChatPreviewText : function () {};
  var pokerRenderChatContactsListResult = typeof opts.pokerRenderChatContactsListResult === "function" ? opts.pokerRenderChatContactsListResult : function () { return false; };
  var pokerBindChatContactsFilterHandler = typeof opts.pokerBindChatContactsFilterHandler === "function" ? opts.pokerBindChatContactsFilterHandler : function () {};
  var pokerHydrateChatContactsFromInstantCache = typeof opts.pokerHydrateChatContactsFromInstantCache === "function" ? opts.pokerHydrateChatContactsFromInstantCache : function () { return false; };
  var pokerPrepareChatContactsFetchData = typeof opts.pokerPrepareChatContactsFetchData === "function" ? opts.pokerPrepareChatContactsFetchData : function (data) { return { handled: false, data: data }; };
  var pokerCompleteChatContactsFetchData = typeof opts.pokerCompleteChatContactsFetchData === "function" ? opts.pokerCompleteChatContactsFetchData : function () {};
  var pokerHandleChatContactsFetchError = typeof opts.pokerHandleChatContactsFetchError === "function" ? opts.pokerHandleChatContactsFetchError : function () {};
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var pokerChatScheduleLongPoll = typeof opts.pokerChatScheduleLongPoll === "function" ? opts.pokerChatScheduleLongPoll : function () {};

function clearContactsLoadingSkeletonFallback(text) {
  var el = getContactsEl();
  if (!el) return;
  try {
    var hasSkeleton = !!(el.querySelector && el.querySelector(".chat-empty--skeleton"));
    if (!hasSkeleton && String(el.textContent || "").trim()) return;
    el.innerHTML =
      '<div class="chat-contacts-list-block">' +
      '<p class="chat-empty">' + String(text || "Диалогов пока нет") + "</p>" +
      "</div>";
  } catch (eClearContactsSkeleton) {}
}

function buildContactsRequestUrl(opts) {
  opts = opts || {};
  var lastViewedParam = "";
  try {
    var lv = Object.assign({}, getLastViewedPersonal() || {});
    if (getLastViewedGeneral() != null) lv.general = getLastViewedGeneral();
    lastViewedParam = "&lastViewed=" + encodeURIComponent(JSON.stringify(lv));
  } catch (eLvCt) {}
  var extra = opts.metaOnly ? "&contactsMetaOnly=1" : "";
  if (opts.metaOnly && window.__pokerContactsMetaPollRev) {
    extra += "&poll=1&sinceRev=" + encodeURIComponent(window.__pokerContactsMetaPollRev);
  }
  if (opts.metaOnly && opts.waitForChange && window.__pokerContactsMetaPollRev) {
    extra += "&wait=1&waitTimeoutMs=" + encodeURIComponent(String(CHAT_LONG_POLL_TIMEOUT_MS));
  }
  return base + "/api/chat" + pokerApiAuthQuery("?") + "&mode=contacts" + lastViewedParam + extra;
}

function mergeContactsMetaPayload(fullData, metaData) {
  if (!fullData || !fullData.ok || !Array.isArray(fullData.contacts)) return null;
  if (!metaData || !metaData.ok || !metaData.contactsMetaOnly || !Array.isArray(metaData.contacts)) return null;
  var prevById = Object.create(null);
  for (var pi = 0; pi < fullData.contacts.length; pi++) {
    var prev = fullData.contacts[pi];
    if (!prev || prev.id == null || String(prev.id) === "") continue;
    prevById[String(prev.id)] = prev;
  }
  var nextContacts = [];
  for (var mi = 0; mi < metaData.contacts.length; mi++) {
    var metaRow = metaData.contacts[mi];
    if (!metaRow || metaRow.id == null || String(metaRow.id) === "") continue;
    var rowId = String(metaRow.id);
    if (!prevById[rowId]) return null;
    var mergedRow = Object.assign({}, prevById[rowId], metaRow);
    nextContacts.push(mergedRow);
  }
  for (var pk in prevById) {
    if (!Object.prototype.hasOwnProperty.call(prevById, pk)) continue;
    var exists = false;
    for (var ni = 0; ni < nextContacts.length; ni++) {
      if (String(nextContacts[ni].id) === pk) {
        exists = true;
        break;
      }
    }
    if (!exists) nextContacts.push(prevById[pk]);
  }
  var merged = Object.assign({}, fullData, metaData, {
    contacts: nextContacts,
    contactsMetaOnly: false,
  });
  return merged;
}


function loadContacts(opts) {
  opts = opts || {};
  try {
    window.__pokerReloadChatContacts = loadContacts;
  } catch (eRelAssign) {}
  var onContactsLoaded = typeof opts.onLoaded === "function" ? opts.onLoaded : null;
  function fireContactsLoaded() {
    if (!onContactsLoaded) return;
    try {
      onContactsLoaded();
    } catch (eFireLc) {}
  }
  if (!getContactsEl()) return;
  var isTelegramMiniChat = !!(window.Telegram && window.Telegram.WebApp);
  if (isTelegramMiniChat) {
    forceHideChatGuestGateForTelegram();
  }
  var hasResolvedTelegramIdentityForChat = false;
  try {
    var chatResolvedUser =
      typeof getPokerResolvedTelegramUser === "function"
        ? getPokerResolvedTelegramUser()
        : null;
    if (
      chatResolvedUser &&
      ((chatResolvedUser.username && String(chatResolvedUser.username).trim()) ||
        (chatResolvedUser.first_name && String(chatResolvedUser.first_name).trim()) ||
        (chatResolvedUser.last_name && String(chatResolvedUser.last_name).trim()))
    ) {
      hasResolvedTelegramIdentityForChat = true;
    }
  } catch (eChatResolvedIdentity) {}
  if (!isTelegramMiniChat && !hasResolvedTelegramIdentityForChat && typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) {
    window.__pokerChatContactsUnreadSoundPrimed = false;
    window.__pokerChatContactsUnreadSnap = {};
    window.chatPersonalUnreadTotalFromContacts = 0;
    var clubPrevG = document.getElementById("chatDialogClubPreview");
    if (clubPrevG) {
      clubPrevG.classList.remove("chat-dialog-item__preview--skeleton");
      clubPrevG.removeAttribute("aria-busy");
      clubPrevG.textContent = "Войдите в аккаунт";
    }
    if (!getContactsEl().querySelector(".chat-guest-cta")) {
      getContactsEl().innerHTML =
        '<div class="chat-contacts-list-block">' +
        '<div class="chat-guest-cta">' +
        '<p class="chat-empty chat-empty--guest-msg">Чтобы писать в чате, войдите в свой аккаунт</p>' +
        '<button type="button" class="profile-exit-btn" id="chatGuestLoginBtn">Войти в аккаунт</button>' +
        "</div></div>";
      var gBtn = document.getElementById("chatGuestLoginBtn");
      if (gBtn) {
        gBtn.addEventListener("click", function () {
          if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow();
        });
      }
    }
    return;
  }
  try {
    pokerHydrateChatSnapshotsFromDisk({ generalOnly: true });
  } catch (eHydCt) {}
  var url = buildContactsRequestUrl(opts);
  var contactsFetchGen = (window.__pokerContactsFetchGen || 0) + 1;
  window.__pokerContactsFetchGen = contactsFetchGen;
  var contactsInstantFromCache = false;
  var metaOnly = !!opts.metaOnly;
function applyContactsApiResponse(data, opts) {
  if (syncChatWebsiteGuestGate()) {
    updateDialogUnreadBadges();
    updateChatNavDot();
    return;
  }
  opts = opts || {};
    if (typeof pokerSanitizeContactsPayloadForUi === "function") {
      data = pokerSanitizeContactsPayloadForUi(data);
    }
    var fromFilterOnly = !!opts.fromFilterOnly;
    var fromInstantCache = !!opts.fromInstantCache;
    var forceRerender = !!opts.forceRerender;
    if (data && data.ok) {
      setChatIsAdmin(!!data.isAdmin);
      if (data.clubChatAccess) setClubChatAccess(data.clubChatAccess);
      if (data.clubChatPendingReviewCount != null) {
        window.chatClubPendingReviewCount = Math.max(0, parseInt(data.clubChatPendingReviewCount, 10) || 0);
      } else if (!data.isAdmin) {
        window.chatClubPendingReviewCount = 0;
      }
      if (window.__openClubChatAfterNextContacts) {
        window.__openClubChatAfterNextContacts = false;
        setTimeout(function () {
          if (typeof tryOpenClubChatFromDialogs === "function") tryOpenClubChatFromDialogs();
          else if (typeof openClubChat === "function") openClubChat();
        }, 0);
      }
    }
    if (data && data.ok && Array.isArray(data.contacts)) {
      window.__pokerLastContactsApiData = data;
      var filterRowEl = document.getElementById("chatContactsFilter");
      if (filterRowEl) {
        var credF = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
        filterRowEl.classList.toggle("chat-contacts-filter--hidden", !credF);
        if (credF) pokerSyncChatContactsFilterTabs();
      }
      try {
        pokerApplyChatContactsUnreadState(data, { fromFilterOnly: fromFilterOnly });
      } catch (eContactsUnreadState) {}
      if (!fromFilterOnly && !metaOnly) {
        if (fromInstantCache) {
          setTimeout(function () {
            try {
              prefetchTopPersonalDialogs(data.contacts);
            } catch (ePrefInstant) {}
          }, 250);
        } else {
          try {
            prefetchTopPersonalDialogs(data.contacts);
          } catch (ePrefContacts) {}
        }
      }
      var contactsListState;
      try {
        contactsListState = pokerBuildChatContactsListState(data);
      } catch (eContactsListState) {
        contactsListState = { contactsForList: data.contacts || [], showFriendsOnly: false };
      }
      var contactsForList = Array.isArray(contactsListState.contactsForList) ? contactsListState.contactsForList : [];
      var showFriendsOnly = !!contactsListState.showFriendsOnly;
      var friendSet = {};
      try {
        friendSet = pokerBuildChatContactsFriendSet(data) || {};
      } catch (eContactsFriendSet) {}
      try {
        pokerRefreshChatContactsGroupPickers({
          buildGroupModalContactList: pokerBuildGroupModalContactList,
        });
      } catch (eContactsPickers) {}
      if (showFriendsOnly) {
        var friendsRowsForList = chatCachedFriendRows();
        if (!friendsRowsForList.length && typeof window.__pokerFetchFriendsForGroupPick === "function" && !opts.friendsFetchDone) {
          getContactsEl().innerHTML =
            '<div class="chat-contacts-list-block">' +
            '<p class="chat-empty">Загружаем друзей…</p>' +
            "</div>";
          window.__pokerFetchFriendsForGroupPick(function () {
            try {
              applyContactsApiResponse(data, { fromFilterOnly: true, forceRerender: true, friendsFetchDone: true });
            } catch (eFriendsApplyAfterFetch) {}
          });
          updateDialogUnreadBadges();
          updateChatNavDot();
          return;
        }
        contactsForList = pokerApplyChatContactsFriendsOnlyList(contactsForList, friendSet, friendsRowsForList);
      }
      try {
        pokerApplyChatContactsMetaState(data, {
          updateHeaderStats: updateChatHeaderStats,
          syncRoster: syncClubChatRosterUi,
          updatePreviewText: updateClubChatPreviewText,
        });
      } catch (eContactsMetaState) {}
      try {
        if (pokerRenderChatContactsListResult({
          contactsEl: getContactsEl(),
          contactsForList: contactsForList,
          friendSet: friendSet,
          showFriendsOnly: showFriendsOnly,
          forceRerender: forceRerender,
          updateDialogUnreadBadges: updateDialogUnreadBadges,
          updateChatNavDot: updateChatNavDot,
          attachDialogButtons: window.chatAttachDialogButtons,
        })) return;
      } catch (eContactsRender) {
        try {
          console.error("[chat] contacts list render failed", {
            message: eContactsRender && eContactsRender.message ? eContactsRender.message : String(eContactsRender),
            stack: eContactsRender && eContactsRender.stack ? String(eContactsRender.stack).slice(0, 600) : "",
            contactsCount: contactsForList && contactsForList.length,
            firstContact: contactsForList && contactsForList[0]
              ? {
                  id: contactsForList[0].id,
                  name: contactsForList[0].name,
                  isGroupChat: contactsForList[0].isGroupChat,
                  statusLevel: contactsForList[0].statusLevel,
                }
              : null,
          });
        } catch (eContactsRenderLog) {}
        clearContactsLoadingSkeletonFallback("Не удалось отрисовать список диалогов");
        return;
      }
      clearContactsLoadingSkeletonFallback(showFriendsOnly ? "Здесь будут друзья, с которыми у вас уже есть личные диалоги." : "Диалогов пока нет");
    }
  }
  try {
    window.__pokerApplyContactsApiResponse = applyContactsApiResponse;
  } catch (eExposeContactsApply) {}
  try {
    window.__pokerForceRerenderChatContactsFromCache = function () {
      var cachedData = window.__pokerLastContactsApiData;
      if (!cachedData || typeof window.__pokerApplyContactsApiResponse !== "function") return;
      setTimeout(function () {
        try {
          if (getContactsEl()) getContactsEl().innerHTML = "";
          window.__pokerApplyContactsApiResponse(cachedData, { forceRerender: true });
        } catch (eForceRe) {}
      }, 0);
    };
  } catch (eExposeContactsForce) {}
  pokerBindChatContactsFilterHandler(getContactsEl(), {
    applyContactsApiResponse: applyContactsApiResponse,
  });
  contactsInstantFromCache = pokerHydrateChatContactsFromInstantCache({
    metaOnly: metaOnly,
    applyContactsApiResponse: applyContactsApiResponse,
    fireContactsLoaded: fireContactsLoaded,
  });
  fetch(url, { cache: "no-store" })
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (contactsFetchGen !== window.__pokerContactsFetchGen) return;
      var contactsFetchDataState = pokerPrepareChatContactsFetchData(data, {
        metaOnly: metaOnly,
        waitForChange: opts.waitForChange,
        recordTrace: pokerChatRecordTrace,
        scheduleLongPoll: pokerChatScheduleLongPoll,
        fireContactsLoaded: fireContactsLoaded,
        mergeContactsMetaPayload: mergeContactsMetaPayload,
        loadContacts: loadContacts,
        onContactsLoaded: onContactsLoaded,
      });
      if (contactsFetchDataState.handled) return;
      data = contactsFetchDataState.data;
      pokerCompleteChatContactsFetchData(data, {
        metaOnly: metaOnly,
        waitForChange: opts.waitForChange,
        applyContactsApiResponse: applyContactsApiResponse,
        scheduleLongPoll: pokerChatScheduleLongPoll,
        recordTrace: pokerChatRecordTrace,
        fireContactsLoaded: fireContactsLoaded,
      });
    })
    .catch(function () {
      if (contactsFetchGen !== window.__pokerContactsFetchGen) return;
      pokerHandleChatContactsFetchError({
        contactsInstantFromCache: contactsInstantFromCache,
        contactsEl: getContactsEl(),
        waitForChange: opts.waitForChange,
        metaOnly: metaOnly,
        scheduleLongPoll: pokerChatScheduleLongPoll,
        fireContactsLoaded: fireContactsLoaded,
        tryOpenClubChatFromDialogs: tryOpenClubChatFromDialogs,
        openClubChat: openClubChat,
      });
    });
}

  return {
    buildContactsRequestUrl: buildContactsRequestUrl,
    mergeContactsMetaPayload: mergeContactsMetaPayload,
    loadContacts: loadContacts,
  };
}
