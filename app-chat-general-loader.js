// General chat loader: fetch, access gate, unread sync and older pagination.

function initChatGeneralLoader(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function (prefix) { return prefix || "?"; };
  var getPokerChatTelegramAuthState = typeof opts.getPokerChatTelegramAuthState === "function" ? opts.getPokerChatTelegramAuthState : null;
  var getChatLongPollTimeoutMs = typeof opts.getChatLongPollTimeoutMs === "function" ? opts.getChatLongPollTimeoutMs : function () { return 25000; };
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getGeneralBurstUntil = typeof opts.getGeneralBurstUntil === "function" ? opts.getGeneralBurstUntil : function () { return 0; };
  var getGeneralHasMoreBefore = typeof opts.getGeneralHasMoreBefore === "function" ? opts.getGeneralHasMoreBefore : function () { return false; };
  var setGeneralHasMoreBefore = typeof opts.setGeneralHasMoreBefore === "function" ? opts.setGeneralHasMoreBefore : function () {};
  var setChatIsAdmin = typeof opts.setChatIsAdmin === "function" ? opts.setChatIsAdmin : function () {};
  var setClubChatAccess = typeof opts.setClubChatAccess === "function" ? opts.setClubChatAccess : function () {};
  var getLastViewedGeneral = typeof opts.getLastViewedGeneral === "function" ? opts.getLastViewedGeneral : function () { return null; };
  var setLastViewedGeneral = typeof opts.setLastViewedGeneral === "function" ? opts.setLastViewedGeneral : function () {};
  var saveChatLastViewed = typeof opts.saveChatLastViewed === "function" ? opts.saveChatLastViewed : function () {};
  var getLastGeneralMessagesSig = typeof opts.getLastGeneralMessagesSig === "function" ? opts.getLastGeneralMessagesSig : function () { return null; };
  var setLastGeneralMessagesSig = typeof opts.setLastGeneralMessagesSig === "function" ? opts.setLastGeneralMessagesSig : function () {};
  var getScrollGeneralToBottomOnNextRender = typeof opts.getScrollGeneralToBottomOnNextRender === "function" ? opts.getScrollGeneralToBottomOnNextRender : function () { return false; };
  var getChatIsEditingMessage = typeof opts.getChatIsEditingMessage === "function" ? opts.getChatIsEditingMessage : function () { return false; };
  var getOptimisticGeneralPayload = typeof opts.getOptimisticGeneralPayload === "function" ? opts.getOptimisticGeneralPayload : function () { return null; };
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var mergeOptimisticGeneralIntoMessages = typeof opts.mergeOptimisticGeneralIntoMessages === "function" ? opts.mergeOptimisticGeneralIntoMessages : function (messages) { return messages || []; };
  var mergeIncomingPushGeneralIntoMessages = typeof opts.mergeIncomingPushGeneralIntoMessages === "function" ? opts.mergeIncomingPushGeneralIntoMessages : function (messages) { return messages || []; };
  var dedupeGeneralMessagesForRender = typeof opts.dedupeGeneralMessagesForRender === "function" ? opts.dedupeGeneralMessagesForRender : function (messages) { return messages || []; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var pokerChatMessageIsNewerThanViewed = typeof opts.pokerChatMessageIsNewerThanViewed === "function" ? opts.pokerChatMessageIsNewerThanViewed : function () { return false; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerReadChatMessageSoundEnabled = typeof opts.pokerReadChatMessageSoundEnabled === "function" ? opts.pokerReadChatMessageSoundEnabled : function () { return false; };
  var pokerPlayChatMessageNotificationSound = typeof opts.pokerPlayChatMessageNotificationSound === "function" ? opts.pokerPlayChatMessageNotificationSound : function () {};
  var pokerWriteGeneralSnapshotToDisk = typeof opts.pokerWriteGeneralSnapshotToDisk === "function" ? opts.pokerWriteGeneralSnapshotToDisk : function () {};
  var refreshChatSelfPinBars = typeof opts.refreshChatSelfPinBars === "function" ? opts.refreshChatSelfPinBars : function () {};
  var pokerChatRequestPollBurst = typeof opts.pokerChatRequestPollBurst === "function" ? opts.pokerChatRequestPollBurst : function () {};
  var generalRenderSignature = typeof opts.generalRenderSignature === "function" ? opts.generalRenderSignature : function () { return ""; };
  var chatMessagesDomHasOptimisticNode = typeof opts.chatMessagesDomHasOptimisticNode === "function" ? opts.chatMessagesDomHasOptimisticNode : function () { return false; };
  var canFastAppendMessages = typeof opts.canFastAppendMessages === "function" ? opts.canFastAppendMessages : function () { return false; };
  var fastAppendChatMessages = typeof opts.fastAppendChatMessages === "function" ? opts.fastAppendChatMessages : function () { return false; };
  var buildGeneralMessagesBodyHtml = typeof opts.buildGeneralMessagesBodyHtml === "function" ? opts.buildGeneralMessagesBodyHtml : function () { return ""; };
  var bindChatMsgNameProfileButtons = typeof opts.bindChatMsgNameProfileButtons === "function" ? opts.bindChatMsgNameProfileButtons : function () {};
  var attachContextMenuForOthers = typeof opts.attachContextMenuForOthers === "function" ? opts.attachContextMenuForOthers : function () {};
  var scheduleSyncChatScrollBottomButtons = typeof opts.scheduleSyncChatScrollBottomButtons === "function" ? opts.scheduleSyncChatScrollBottomButtons : function () {};
  var scheduleGeneralRender = typeof opts.scheduleGeneralRender === "function" ? opts.scheduleGeneralRender : function () {};
  var renderGeneralAccessGate = typeof opts.renderGeneralAccessGate === "function" ? opts.renderGeneralAccessGate : function () {};
  var updateGeneralInputLocked = typeof opts.updateGeneralInputLocked === "function" ? opts.updateGeneralInputLocked : function () {};
  var scheduleChatPostRenderSync = typeof opts.scheduleChatPostRenderSync === "function" ? opts.scheduleChatPostRenderSync : function (fn) { if (typeof fn === "function") fn(); };
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var syncClubChatRosterUi = typeof opts.syncClubChatRosterUi === "function" ? opts.syncClubChatRosterUi : function () {};
  var updateUnreadDots = typeof opts.updateUnreadDots === "function" ? opts.updateUnreadDots : function () {};
  var updateDialogUnreadBadges = typeof opts.updateDialogUnreadBadges === "function" ? opts.updateDialogUnreadBadges : null;
  var updateClubChatPreview = typeof opts.updateClubChatPreview === "function" ? opts.updateClubChatPreview : null;
  var pokerChatScheduleLongPoll = typeof opts.pokerChatScheduleLongPoll === "function" ? opts.pokerChatScheduleLongPoll : function () {};
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var renderGeneralMessages = typeof opts.renderGeneralMessages === "function" ? opts.renderGeneralMessages : function () {};
  var fastPrependChatMessages = typeof opts.fastPrependChatMessages === "function" ? opts.fastPrependChatMessages : function () { return false; };
  var generalMessagesSignature = typeof opts.generalMessagesSignature === "function" ? opts.generalMessagesSignature : function () { return ""; };
  var generalFetchController = null;

function loadGeneral(opts) {
  opts = opts || {};
  var genVisEarly = getGeneralView() && !getGeneralView().classList.contains("chat-general-view--hidden");
  if (typeof getPokerChatTelegramAuthState === "function" && getChatActiveTab() === "general" && genVisEarly) {
    if (getPokerChatTelegramAuthState() !== "ok") {
      /* Экран «нужно войти»: не дергать API и не затирать текст подсказки опросом */
      return;
    }
  }
  /* mode=general с trackSeen по умолчанию помечает ленту прочитанной в Redis — без этого фоновый
     loadGeneral (например из showDialogs при пустом кэше) снимал бейдж, хотя пользователь не заходил в общий чат. */
  var chatViewActiveForGeneral = !!document.querySelector('[data-view="chat"].view--active');
  var userActuallyViewingGeneral =
    chatViewActiveForGeneral &&
    getChatActiveTab() === "general" &&
    getGeneralView() &&
    !getGeneralView().classList.contains("chat-general-view--hidden");
  var trackSeenQs = userActuallyViewingGeneral ? "" : "&trackSeen=0";
  var pollQs = "";
  if (!opts.skipPoll && typeof window.__pokerGeneralPollRev === "string" && window.__pokerGeneralPollRev.length > 0) {
    pollQs = "&poll=1&sinceRev=" + encodeURIComponent(window.__pokerGeneralPollRev);
  }
  if (opts.waitForChange && pollQs) {
    pollQs += "&wait=1&waitTimeoutMs=" + encodeURIComponent(String(getChatLongPollTimeoutMs()));
  }
  var generalCacheBeforeReq =
    window._chatGeneralCache && Array.isArray(window._chatGeneralCache.messages) ? window._chatGeneralCache.messages : [];
  var useGeneralDiff =
    Date.now() < (getGeneralBurstUntil() || 0) &&
    generalCacheBeforeReq.length > 0;
  var diffQs = "";
  if (useGeneralDiff) {
    var lastGeneralMsg = generalCacheBeforeReq[generalCacheBeforeReq.length - 1];
    if (lastGeneralMsg && lastGeneralMsg.id != null && lastGeneralMsg.id !== "") {
      diffQs += "&afterId=" + encodeURIComponent(String(lastGeneralMsg.id));
    }
    if (lastGeneralMsg && lastGeneralMsg.time) {
      diffQs += "&afterTime=" + encodeURIComponent(String(lastGeneralMsg.time));
    }
  }
  var url = base + "/api/chat" + pokerApiAuthQuery("?") + "&mode=general&usersById=1" + trackSeenQs + pollQs + diffQs;
  var loadGeneralSeq = (window.__pokerLoadGeneralSeq = (window.__pokerLoadGeneralSeq || 0) + 1);
  var generalFetchOpts = { cache: "no-store" };
  var controllerForGeneralReq = null;
  try {
    if (typeof AbortController !== "undefined") {
      if (generalFetchController) {
        try {
          generalFetchController.abort();
        } catch (eAbortPrevGeneral) {}
      }
      controllerForGeneralReq = new AbortController();
      generalFetchController = controllerForGeneralReq;
      generalFetchOpts.signal = controllerForGeneralReq.signal;
    }
  } catch (eGeneralAbortSetup) {}
  fetch(url, generalFetchOpts).then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; }); }).then(function (data) {
    if (loadGeneralSeq !== window.__pokerLoadGeneralSeq) return;
    if (data && data.notModified === true && data.pollRev) {
      if (data.trace && data.trace.serverNowMs) {
        pokerChatRecordTrace("general-wait-timeout", { rttMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)), waited: !!data.waited });
      }
      if (opts.waitForChange) pokerChatScheduleLongPoll("general", 0);
      return;
    }
      if (data && data.ok) {
      setGeneralHasMoreBefore(!!data.hasMoreBefore);
      if (data.pollRev && typeof data.pollRev === "string") {
        window.__pokerGeneralPollRev = data.pollRev;
      }
      setChatIsAdmin(!!data.isAdmin);
      if (data.isAdmin && typeof window.pokerMarkAdminAccess === "function") {
        window.pokerMarkAdminAccess("chat-general");
      }
      var chatIsAdmin = !!data.isAdmin;
      if (data.clubChatAccess != null) setClubChatAccess(data.clubChatAccess);
      if (data.clubChatPendingReviewCount != null) {
        window.chatClubPendingReviewCount = Math.max(0, parseInt(data.clubChatPendingReviewCount, 10) || 0);
      } else if (!data.isAdmin) {
        window.chatClubPendingReviewCount = 0;
      }
      var access = data.clubChatAccess != null ? data.clubChatAccess : "open";
      var noGeneralAccess =
        !chatIsAdmin && (access === "need_apply" || access === "pending" || access === "revoked");
      var messages = data.messages || [];
      if (typeof pokerHydrateChatMessagesFromUsersById === "function") {
        messages = pokerHydrateChatMessagesFromUsersById(messages, data.usersById);
      }
      if (data.partial === true && generalCacheBeforeReq.length) {
        messages = generalCacheBeforeReq.concat(messages || []);
      }
      if (noGeneralAccess) {
        messages = [];
      }
      var pendingEditG = window._pendingGeneralEdit;
      if (pendingEditG && pendingEditG.id) {
        var peId = String(pendingEditG.id);
        messages = messages.map(function (mg) {
          if (mg && String(mg.id) === peId) return pendingEditG;
          return mg;
        });
        window._pendingGeneralEdit = null;
      }
      var pending = window._pendingGeneralMessage;
      if (pending && pending.id) {
        if (!messages.some(function (m) { return String(m.id) === String(pending.id); })) {
          messages = messages.concat([pending]);
        } else {
          window._pendingGeneralMessage = null;
        }
      }
      messages = mergeOptimisticGeneralIntoMessages(messages);
      messages = mergeIncomingPushGeneralIntoMessages(messages);
      messages = dedupeGeneralMessagesForRender(messages);
      var prevGeneralCache =
        window._chatGeneralCache && typeof window._chatGeneralCache === "object" ? window._chatGeneralCache : {};
      var prevGeneralMessages = Array.isArray(prevGeneralCache.messages) ? prevGeneralCache.messages : [];
      var prevGeneralLatest = prevGeneralMessages.length
        ? String(prevGeneralMessages[prevGeneralMessages.length - 1].id || "") + "|" + String(prevGeneralMessages[prevGeneralMessages.length - 1].time || "")
        : "";
      var nextGeneralMembers = Array.isArray(data.generalMembers)
        ? data.generalMembers
        : (Array.isArray(prevGeneralCache.generalMembers) ? prevGeneralCache.generalMembers : []);
      var nextGeneralLatest = messages.length
        ? String(messages[messages.length - 1].id || "") + "|" + String(messages[messages.length - 1].time || "")
        : "";
      window._chatGeneralCache = {
        messages: messages,
        participantsCount: data.participantsCount,
        onlineCount: data.onlineCount,
        generalPinned: data.generalPinned != null ? data.generalPinned : null,
        generalMembers: nextGeneralMembers,
        __fromDisk: false,
      };
      if (!noGeneralAccess) {
        try {
          pokerWriteGeneralSnapshotToDisk(window._chatGeneralCache);
        } catch (eSnapG) {}
      }
      /* Полоса закрепления (глобальное / личное) зависит от generalPinned в кэше; без этого при том же
         наборе сообщений renderGeneralMessages не вызывается — после открепления админом плашка залипала. */
      try {
        refreshChatSelfPinBars();
      } catch (ePinLoadG) {}
      if (nextGeneralLatest && nextGeneralLatest !== prevGeneralLatest) {
        pokerChatRequestPollBurst("general");
      }
      var latest = messages.length ? (messages[messages.length - 1].time || "") : "";
      var isChatViewActive = !!document.querySelector('[data-view="chat"].view--active');
      var isGeneralScreenVisible = getGeneralView() && !getGeneralView().classList.contains("chat-general-view--hidden");
      var lastViewedGeneralNow = getLastViewedGeneral();
      var lastView = lastViewedGeneralNow != null ? lastViewedGeneralNow : "";
      var myMemberIdForUnread = resolveMyChatMemberId();
      /* Локальный пересчёт для звука; бейдж «главный чат» и chatGeneralUnreadCount вне открытого
         экрана общего чата задаёт только loadContacts (server generalUnreadCount), иначе гонка с loadGeneral. */
      var unreadCount = 0;
      if (lastViewedGeneralNow != null && myMemberIdForUnread) {
        unreadCount = messages.filter(function (m) {
          return pokerChatMessageIsNewerThanViewed(m.time, lastView) && !peerChatIdsEqual(m.from, myMemberIdForUnread);
        }).length;
      }
      // Звуковое уведомление: фоновый unread плюс реально новый входящий месседж в открытом общем чате.
      if (pokerApiHasCredential() && pokerReadChatMessageSoundEnabled()) {
        var isOnGeneral = !!(isChatViewActive && getChatActiveTab() === "general" && isGeneralScreenVisible);
        var shouldSoundGeneral =
          lastViewedGeneralNow != null &&
          unreadCount > 0 &&
          (!isOnGeneral || !!(prevGeneralLatest && nextGeneralLatest && nextGeneralLatest !== prevGeneralLatest));
        if (shouldSoundGeneral) {
          var lastUnread = null;
          try {
            var unreadMsgs = messages.filter(function (m) {
              return pokerChatMessageIsNewerThanViewed(m.time, lastView) && !peerChatIdsEqual(m.from, myMemberIdForUnread);
            });
            lastUnread = unreadMsgs.length ? unreadMsgs[unreadMsgs.length - 1] : null;
          } catch (eUnread) {}
          if (lastUnread) {
            var key = String(lastUnread.id || "") + "|" + String(lastUnread.time || "");
            if (key && window.__pokerChatSoundedGeneralKey !== key) {
              window.__pokerChatSoundedGeneralKey = key;
              pokerPlayChatMessageNotificationSound();
            }
          }
        }
      }
      if (isChatViewActive && getChatActiveTab() === "general" && isGeneralScreenVisible) {
        if (latest && !isNaN(Date.parse(String(latest).trim()))) {
          setLastViewedGeneral(latest);
          saveChatLastViewed();
        }
        window.chatGeneralUnread = false;
        window.chatGeneralUnreadCount = 0;
      }
      /* Вне экрана «главный чат» не трогаем chatGeneralUnread* — только mode=contacts. */
      var total = data.participantsCount != null ? data.participantsCount : "—";
      window.lastGeneralStats = total !== "—" ? String(total) + " уч" : "";
      /* Не трогаем DOM общего чата, пока экран скрыт — иначе scrollTop обнуляется и при входе лента «сверху». */
      if (isChatViewActive && getChatActiveTab() === "general" && isGeneralScreenVisible && !getChatIsEditingMessage()) {
        if (noGeneralAccess) {
          setLastGeneralMessagesSig("");
          renderGeneralAccessGate(access);
          updateGeneralInputLocked(true);
        } else {
          updateGeneralInputLocked(false);
          var sig = generalRenderSignature(messages, data.partial === true);
          if (getScrollGeneralToBottomOnNextRender() || sig !== getLastGeneralMessagesSig()) {
            var fastAppendedGeneral = false;
            if (
              data.partial === true &&
              getGeneralMessagesEl() &&
              !chatMessagesDomHasOptimisticNode(getGeneralMessagesEl()) &&
              !getOptimisticGeneralPayload() &&
              !(window._pendingGeneralMessage && window._pendingGeneralMessage.id) &&
              canFastAppendMessages(prevGeneralMessages, messages)
            ) {
              fastAppendedGeneral = fastAppendChatMessages(
                getGeneralMessagesEl(),
                messages.slice(prevGeneralMessages.length),
                buildGeneralMessagesBodyHtml,
                function () {
                  setLastGeneralMessagesSig(sig);
                  bindChatMsgNameProfileButtons(getGeneralMessagesEl());
                  attachContextMenuForOthers(getGeneralMessagesEl(), "general", getGeneralMessagesEl());
                  try { refreshChatSelfPinBars(); } catch (ePinFastG) {}
                  try { scheduleSyncChatScrollBottomButtons(); } catch (eSbFastG) {}
                }
              );
            }
            if (!fastAppendedGeneral) scheduleGeneralRender(messages, sig);
          }
        }
      } else if (!noGeneralAccess) {
        updateGeneralInputLocked(false);
      }
      scheduleChatPostRenderSync(function () {
        updateChatHeaderStats();
        try {
          syncClubChatRosterUi();
        } catch (eRosterG) {}
        updateUnreadDots();
        if (typeof updateDialogUnreadBadges === "function") updateDialogUnreadBadges();
        if (typeof updateClubChatPreview === "function") updateClubChatPreview(messages);
      });
      if (opts.waitForChange) pokerChatScheduleLongPoll("general", 0);
      if (data.trace && data.trace.serverNowMs && messages.length) {
        var lastMsgG = messages[messages.length - 1];
        pokerChatRecordTrace("general-delivery", {
          serverToClientMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)),
          msgAgeMs: lastMsgG && lastMsgG.time ? Math.max(0, Date.now() - Date.parse(String(lastMsgG.time))) : null,
          partial: !!data.partial,
        });
      }
    } else if (
      getChatActiveTab() === "general" &&
      getGeneralView() &&
      !getGeneralView().classList.contains("chat-general-view--hidden") &&
      getGeneralMessagesEl()
    ) {
      var wrapErr = getGeneralMessagesEl().parentElement;
      if (wrapErr && wrapErr.classList) wrapErr.classList.remove("chat-messages-wrap--settling");
      getGeneralMessagesEl().innerHTML = "<p class=\"chat-empty\">" + (data && data.error ? escapeHtml(data.error) : "Ошибка загрузки") + "</p>";
      updateGeneralInputLocked(false);
      if (opts.waitForChange) pokerChatScheduleLongPoll("general", 1200);
    }
  }).catch(function (err) {
    if (err && err.name === "AbortError" && controllerForGeneralReq && generalFetchController !== controllerForGeneralReq) return;
    if (
      getChatActiveTab() === "general" &&
      getGeneralView() &&
      !getGeneralView().classList.contains("chat-general-view--hidden") &&
      getGeneralMessagesEl()
    ) {
      var wrapCatch = getGeneralMessagesEl().parentElement;
      if (wrapCatch && wrapCatch.classList) wrapCatch.classList.remove("chat-messages-wrap--settling");
      getGeneralMessagesEl().innerHTML = "<p class=\"chat-empty\">" + escapeHtml(POKER_NET_ERR) + "</p>";
      updateGeneralInputLocked(false);
    }
    if (opts.waitForChange) pokerChatScheduleLongPoll("general", 1200);
  }).finally(function () {
    if (controllerForGeneralReq && generalFetchController === controllerForGeneralReq) {
      generalFetchController = null;
    }
  });
}
window.__pokerLoadOlderGeneralMessages = function () {
  try {
    var cache = window._chatGeneralCache && Array.isArray(window._chatGeneralCache.messages) ? window._chatGeneralCache.messages : [];
    if (!cache.length) return;
    var oldest = cache[0];
    var prevTop = getGeneralMessagesEl() ? getGeneralMessagesEl().scrollTop : 0;
    var prevHeight = getGeneralMessagesEl() ? getGeneralMessagesEl().scrollHeight : 0;
    var q = "&mode=general&usersById=1&beforeId=" + encodeURIComponent(String(oldest.id || "")) + "&beforeTime=" + encodeURIComponent(String(oldest.time || ""));
    fetch(base + "/api/chat" + pokerApiAuthQuery("?") + q, { cache: "no-store" })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; }); })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.messages) || !data.messages.length) {
          setGeneralHasMoreBefore(!!(data && data.hasMoreBefore));
          if (typeof renderGeneralMessages === "function") renderGeneralMessages(cache);
          return;
        }
        setGeneralHasMoreBefore(!!data.hasMoreBefore);
        var olderMessages = data.messages;
        if (typeof pokerHydrateChatMessagesFromUsersById === "function") {
          olderMessages = pokerHydrateChatMessagesFromUsersById(olderMessages, data.usersById);
        }
        var merged = olderMessages.concat(cache);
        window._chatGeneralCache = Object.assign({}, window._chatGeneralCache || {}, { messages: merged });
        if (
          getGeneralMessagesEl() &&
          Array.isArray(data.messages) &&
          data.messages.length
        ) {
          var fastPrependedGeneral = fastPrependChatMessages(
            getGeneralMessagesEl(),
            olderMessages,
            buildGeneralMessagesBodyHtml,
            getGeneralHasMoreBefore() ? "general" : null,
            function () {
              setLastGeneralMessagesSig(generalMessagesSignature(merged));
              bindChatMsgNameProfileButtons(getGeneralMessagesEl());
              attachContextMenuForOthers(getGeneralMessagesEl(), "general", getGeneralMessagesEl());
              try { refreshChatSelfPinBars(); } catch (ePinPreG) {}
              try { scheduleSyncChatScrollBottomButtons(); } catch (eSbPreG) {}
            }
          );
          if (fastPrependedGeneral) return;
        }
        renderGeneralMessages(merged);
        requestAnimationFrame(function () {
          try {
            if (getGeneralMessagesEl()) getGeneralMessagesEl().scrollTop = Math.max(0, getGeneralMessagesEl().scrollHeight - prevHeight + prevTop);
          } catch (eScrollOldG) {}
        });
      });
  } catch (eOlderGen) {}
};

  return {
    loadGeneral: loadGeneral,
    loadOlderGeneralMessages: window.__pokerLoadOlderGeneralMessages,
  };
}
