// Personal/group chat loader: fetch, unread sync and older pagination.

function initChatPersonalLoader(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function (prefix) { return prefix || "?"; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getChatWithUserName = typeof opts.getChatWithUserName === "function" ? opts.getChatWithUserName : function () { return ""; };
  var setChatWithUserName = typeof opts.setChatWithUserName === "function" ? opts.setChatWithUserName : function () {};
  var getChatWithPeerAvatarUrl = typeof opts.getChatWithPeerAvatarUrl === "function" ? opts.getChatWithPeerAvatarUrl : function () { return ""; };
  var setChatWithPeerAvatarUrl = typeof opts.setChatWithPeerAvatarUrl === "function" ? opts.setChatWithPeerAvatarUrl : function () {};
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getConvTitle = typeof opts.getConvTitle === "function" ? opts.getConvTitle : function () { return null; };
  var getConvTitleId = typeof opts.getConvTitleId === "function" ? opts.getConvTitleId : function () { return null; };
  var getConvPeerAvatarPh = typeof opts.getConvPeerAvatarPh === "function" ? opts.getConvPeerAvatarPh : function () { return null; };
  var getConvPeerAvatar = typeof opts.getConvPeerAvatar === "function" ? opts.getConvPeerAvatar : function () { return null; };
  var getChatLongPollTimeoutMs = typeof opts.getChatLongPollTimeoutMs === "function" ? opts.getChatLongPollTimeoutMs : function () { return 25000; };
  var getPersonalBurstUntil = typeof opts.getPersonalBurstUntil === "function" ? opts.getPersonalBurstUntil : function () { return 0; };
  var getPersonalHasMoreBefore = typeof opts.getPersonalHasMoreBefore === "function" ? opts.getPersonalHasMoreBefore : function () { return false; };
  var setPersonalHasMoreBefore = typeof opts.setPersonalHasMoreBefore === "function" ? opts.setPersonalHasMoreBefore : function () {};
  var setChatIsAdmin = typeof opts.setChatIsAdmin === "function" ? opts.setChatIsAdmin : function () {};
  var setChatPeerTypingActive = typeof opts.setChatPeerTypingActive === "function" ? opts.setChatPeerTypingActive : function () {};
  var setConvGroupCanChangeAvatar = typeof opts.setConvGroupCanChangeAvatar === "function" ? opts.setConvGroupCanChangeAvatar : function () {};
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getChatIsEditingMessage = typeof opts.getChatIsEditingMessage === "function" ? opts.getChatIsEditingMessage : function () { return false; };
  var getLastPersonalMessagesSig = typeof opts.getLastPersonalMessagesSig === "function" ? opts.getLastPersonalMessagesSig : function () { return null; };
  var setLastPersonalMessagesSig = typeof opts.setLastPersonalMessagesSig === "function" ? opts.setLastPersonalMessagesSig : function () {};
  var getOptimisticPersonalPayload = typeof opts.getOptimisticPersonalPayload === "function" ? opts.getOptimisticPersonalPayload : function () { return null; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var pokerChatScheduleLongPoll = typeof opts.pokerChatScheduleLongPoll === "function" ? opts.pokerChatScheduleLongPoll : function () {};
  var mergeOptimisticPersonalIntoMessages = typeof opts.mergeOptimisticPersonalIntoMessages === "function" ? opts.mergeOptimisticPersonalIntoMessages : function (messages) { return messages || []; };
  var mergeIncomingPushPersonalIntoMessages = typeof opts.mergeIncomingPushPersonalIntoMessages === "function" ? opts.mergeIncomingPushPersonalIntoMessages : function (messages) { return messages || []; };
  var dedupePersonalMessagesForRender = typeof opts.dedupePersonalMessagesForRender === "function" ? opts.dedupePersonalMessagesForRender : function (messages) { return messages || []; };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var setTextContentIfChanged = typeof opts.setTextContentIfChanged === "function" ? opts.setTextContentIfChanged : function (el, value) { if (el) el.textContent = value; };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var enrichPersonalThreadPeerMeta = typeof opts.enrichPersonalThreadPeerMeta === "function" ? opts.enrichPersonalThreadPeerMeta : function (messages) { return messages || []; };
  var setChatConvTitleIdText = typeof opts.setChatConvTitleIdText === "function" ? opts.setChatConvTitleIdText : function () {};
  var setChatPeerVerified = typeof opts.setChatPeerVerified === "function" ? opts.setChatPeerVerified : function () {};
  var setChatConvTitleFish = typeof opts.setChatConvTitleFish === "function" ? opts.setChatConvTitleFish : function () {};
  var updateConvTypingUi = typeof opts.updateConvTypingUi === "function" ? opts.updateConvTypingUi : function () {};
  var syncConvGroupAvatarEditUi = typeof opts.syncConvGroupAvatarEditUi === "function" ? opts.syncConvGroupAvatarEditUi : function () {};
  var applyConvPeerAvatarHeader = typeof opts.applyConvPeerAvatarHeader === "function" ? opts.applyConvPeerAvatarHeader : function () {};
  var pokerChatRequestPollBurst = typeof opts.pokerChatRequestPollBurst === "function" ? opts.pokerChatRequestPollBurst : function () {};
  var normalizePeerIdForChat = typeof opts.normalizePeerIdForChat === "function" ? opts.normalizePeerIdForChat : function (id) { return String(id || ""); };
  var lastViewedPersonal = opts.lastViewedPersonal || {};
  var pokerChatMessageIsNewerThanViewed = typeof opts.pokerChatMessageIsNewerThanViewed === "function" ? opts.pokerChatMessageIsNewerThanViewed : function () { return false; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerReadChatMessageSoundEnabled = typeof opts.pokerReadChatMessageSoundEnabled === "function" ? opts.pokerReadChatMessageSoundEnabled : function () { return false; };
  var pokerPlayChatMessageNotificationSound = typeof opts.pokerPlayChatMessageNotificationSound === "function" ? opts.pokerPlayChatMessageNotificationSound : function () {};
  var saveChatLastViewed = typeof opts.saveChatLastViewed === "function" ? opts.saveChatLastViewed : function () {};
  var personalRenderSignature = typeof opts.personalRenderSignature === "function" ? opts.personalRenderSignature : function () { return ""; };
  var pokerWritePersonalPeerSnapshotToDisk = typeof opts.pokerWritePersonalPeerSnapshotToDisk === "function" ? opts.pokerWritePersonalPeerSnapshotToDisk : function () {};
  var chatMessagesDomHasOptimisticNode = typeof opts.chatMessagesDomHasOptimisticNode === "function" ? opts.chatMessagesDomHasOptimisticNode : function () { return false; };
  var canFastAppendMessages = typeof opts.canFastAppendMessages === "function" ? opts.canFastAppendMessages : function () { return false; };
  var fastAppendChatMessages = typeof opts.fastAppendChatMessages === "function" ? opts.fastAppendChatMessages : function () { return false; };
  var buildPersonalMessagesBodyHtml = typeof opts.buildPersonalMessagesBodyHtml === "function" ? opts.buildPersonalMessagesBodyHtml : function () { return ""; };
  var bindChatMsgNameProfileButtons = typeof opts.bindChatMsgNameProfileButtons === "function" ? opts.bindChatMsgNameProfileButtons : function () {};
  var attachContextMenuForOthers = typeof opts.attachContextMenuForOthers === "function" ? opts.attachContextMenuForOthers : function () {};
  var refreshChatSelfPinBars = typeof opts.refreshChatSelfPinBars === "function" ? opts.refreshChatSelfPinBars : function () {};
  var scheduleSyncChatScrollBottomButtons = typeof opts.scheduleSyncChatScrollBottomButtons === "function" ? opts.scheduleSyncChatScrollBottomButtons : function () {};
  var schedulePersonalRender = typeof opts.schedulePersonalRender === "function" ? opts.schedulePersonalRender : function () {};
  var scheduleChatPostRenderSync = typeof opts.scheduleChatPostRenderSync === "function" ? opts.scheduleChatPostRenderSync : function (fn) { if (typeof fn === "function") fn(); };
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var applyConvGroupDescription = typeof opts.applyConvGroupDescription === "function" ? opts.applyConvGroupDescription : function () {};
  var updateUnreadDots = typeof opts.updateUnreadDots === "function" ? opts.updateUnreadDots : function () {};
  var renderMessages = typeof opts.renderMessages === "function" ? opts.renderMessages : function () {};
  var fastPrependChatMessages = typeof opts.fastPrependChatMessages === "function" ? opts.fastPrependChatMessages : function () { return false; };
  var PERSONAL_FETCH_TIMEOUT_MS = 14000;

function pokerFetchPersonalJson(url, opts) {
  opts = opts || {};
  var timeoutMs = Number(opts.timeoutMs) || PERSONAL_FETCH_TIMEOUT_MS;
  var controller = null;
  var timeoutId = null;
  var fetchOpts = { cache: "no-store" };
  try {
    if (typeof AbortController !== "undefined") {
      controller = new AbortController();
      fetchOpts.signal = controller.signal;
      timeoutId = setTimeout(function () {
        try {
          controller.abort();
        } catch (eAbortPersonal) {}
      }, timeoutMs);
    }
  } catch (eAbortPersonalSetup) {}
  try {
    window.__pokerChatPersonalLastFetch = {
      peer: String(opts.peer || ""),
      url: String(url || "").replace(/(initData|pwaSession|pwaVkSession)=([^&]*)/g, "$1=***"),
      startedAt: Date.now(),
      timeoutMs: timeoutMs,
    };
  } catch (eTracePersonalStart) {}
  return fetch(url, fetchOpts)
    .then(function (r) {
      return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; });
    })
    .finally(function () {
      if (timeoutId) clearTimeout(timeoutId);
    });
}

function clearPersonalLoadingFallback(peerId, text) {
  var el = getMessagesEl();
  if (!el) return;
  try {
    var currentText = String(el.textContent || "");
    if (!/Загрузка|Loading/i.test(currentText)) return;
    el.innerHTML = '<p class="chat-empty">' + escapeHtml(text || "Загружаем сообщения…") + "</p>";
    setTimeout(function () {
      try {
        updateChatHeaderStats();
        updateUnreadDots();
      } catch (ePersonalFallbackUi) {}
    }, 0);
  } catch (ePersonalFallback) {
    try {
      el.innerHTML = '<p class="chat-empty">' + escapeHtml(text || "Сообщений пока нет") + "</p>";
    } catch (ePersonalFallbackHtml) {}
  }
}

function loadMessages(opts) {
  opts = opts || {};
  if (!getChatWithUserId() || !getMessagesEl()) return;
  var loadForPeer = getChatWithUserId();
  var isGroupLoad = loadForPeer && String(loadForPeer).indexOf("group_") === 0;
  var loadPersonalSeq = (window.__pokerLoadPersonalSeq = (window.__pokerLoadPersonalSeq || 0) + 1);
  var pollQs = "";
  if (typeof window.__pokerPersonalPollRev === "string" && window.__pokerPersonalPollRev.length > 0) {
    pollQs = "&poll=1&sinceRev=" + encodeURIComponent(window.__pokerPersonalPollRev);
  }
  if (opts.waitForChange && pollQs) {
    pollQs += "&wait=1&waitTimeoutMs=" + encodeURIComponent(String(getChatLongPollTimeoutMs()));
  }
  var personalCacheBeforeReq =
    loadForPeer && personalMessagesCache[loadForPeer] && Array.isArray(personalMessagesCache[loadForPeer])
      ? personalMessagesCache[loadForPeer]
      : [];
  var usePersonalDiff =
    Date.now() < (getPersonalBurstUntil() || 0) &&
    personalCacheBeforeReq.length > 0;
  var diffQs = "";
  if (usePersonalDiff) {
    var lastPersonalMsg = personalCacheBeforeReq[personalCacheBeforeReq.length - 1];
    if (lastPersonalMsg && lastPersonalMsg.id != null && lastPersonalMsg.id !== "") {
      diffQs += "&afterId=" + encodeURIComponent(String(lastPersonalMsg.id));
    }
    if (lastPersonalMsg && lastPersonalMsg.time) {
      diffQs += "&afterTime=" + encodeURIComponent(String(lastPersonalMsg.time));
    }
  }
  var fastGroupQs = isGroupLoad ? "&skipPresence=1" : "";
  var bareOpen = !opts.waitForChange && !usePersonalDiff && !opts.__fullOpen;
  var fastOpenQs = !opts.waitForChange && !usePersonalDiff ? "&fastOpen=1" : "";
  if (bareOpen) fastOpenQs += "&messagesBare=1";
  var url = base + "/api/chat" + pokerApiAuthQuery("?") + "&with=" + encodeURIComponent(loadForPeer) + fastGroupQs + fastOpenQs + pollQs + diffQs;
  if (bareOpen) {
    setTimeout(function () {
      try {
        if (!peerChatIdsEqual(getChatWithUserId(), loadForPeer)) return;
        if (!getConvView() || getConvView().classList.contains("chat-conv-view--hidden")) return;
        loadMessages(Object.assign({}, opts, { __fullOpen: true, __fallbackTimerStarted: true }));
      } catch (ePersonalFullOpenStart) {}
    }, 900);
  }
  if (!opts.waitForChange && !usePersonalDiff && !opts.__fallbackTimerStarted) {
    setTimeout(function () {
      try {
        if (!peerChatIdsEqual(getChatWithUserId(), loadForPeer)) return;
        if (!getConvView() || getConvView().classList.contains("chat-conv-view--hidden")) return;
        clearPersonalLoadingFallback(loadForPeer, "Загружаем сообщения…");
      } catch (ePersonalFallbackTimer) {}
    }, 2200);
  }
  pokerFetchPersonalJson(url, { timeoutMs: opts.waitForChange ? getChatLongPollTimeoutMs() + 5000 : PERSONAL_FETCH_TIMEOUT_MS, peer: loadForPeer })
    .then(function (data) {
    if (
      loadPersonalSeq !== window.__pokerLoadPersonalSeq &&
      (!peerChatIdsEqual(getChatWithUserId(), loadForPeer) || !getConvView() || getConvView().classList.contains("chat-conv-view--hidden"))
    ) return;
    if (!peerChatIdsEqual(getChatWithUserId(), loadForPeer)) return;
    if (data && data.notModified === true && data.pollRev) {
      if (typeof data.pollRev === "string") window.__pokerPersonalPollRev = data.pollRev;
      if (data.trace && data.trace.serverNowMs) {
        pokerChatRecordTrace("personal-wait-timeout", { rttMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)), waited: !!data.waited, peer: loadForPeer });
      }
      if (opts.waitForChange) pokerChatScheduleLongPoll("personal", 0);
      return;
    }
    if (data && data.ok) {
      if (
        data.messagesBare === true &&
        Array.isArray(data.messages) &&
        data.messages.length === 0 &&
        !opts.__fullOpen &&
        !opts.waitForChange &&
        !usePersonalDiff
      ) {
        setTimeout(function () {
          try {
            if (!peerChatIdsEqual(getChatWithUserId(), loadForPeer)) return;
            if (!getConvView() || getConvView().classList.contains("chat-conv-view--hidden")) return;
            loadMessages(Object.assign({}, opts, { __fullOpen: true, __fallbackTimerStarted: true }));
          } catch (ePersonalBareEmptyFull) {}
        }, 0);
        return;
      }
      setPersonalHasMoreBefore(loadForPeer, !!data.hasMoreBefore);
      if (data.pollRev && typeof data.pollRev === "string") {
        window.__pokerPersonalPollRev = data.pollRev;
      }
      if (data.isAdmin !== undefined) setChatIsAdmin(!!data.isAdmin);
      if (data.isAdmin && typeof window.pokerMarkAdminAccess === "function") {
        window.pokerMarkAdminAccess("chat-personal");
      }
      setChatPeerTypingActive(!!data.peerTyping);
      var prevPersonalMessages =
        getChatWithUserId() && personalMessagesCache[getChatWithUserId()] && Array.isArray(personalMessagesCache[getChatWithUserId()])
          ? personalMessagesCache[getChatWithUserId()]
          : [];
      var prevPersonalLatest = prevPersonalMessages.length
        ? String(prevPersonalMessages[prevPersonalMessages.length - 1].id || "") + "|" + String(prevPersonalMessages[prevPersonalMessages.length - 1].time || "")
        : "";
      var messages = data.messages || [];
      if (data.partial === true && personalCacheBeforeReq.length) {
        messages = personalCacheBeforeReq.concat(messages || []);
      }
      var pendingEditP = window._pendingPersonalEditMessage;
      if (pendingEditP && pendingEditP.id && getChatWithUserId()) {
        var pePid = String(pendingEditP.id);
        messages = messages.map(function (mp) {
          if (mp && String(mp.id) === pePid) return pendingEditP;
          return mp;
        });
        window._pendingPersonalEditMessage = null;
      }
      var pending = window._pendingPersonalMessage;
      var pendingPeer = window._pendingPersonalWith;
      if (pending && pending.id && getChatWithUserId() && pendingPeer && peerChatIdsEqual(getChatWithUserId(), pendingPeer)) {
        if (!messages.some(function (m) { return String(m.id) === String(pending.id); })) {
          messages = messages.concat([pending]);
        } else {
          window._pendingPersonalMessage = null;
          window._pendingPersonalWith = null;
        }
      }
      messages = mergeOptimisticPersonalIntoMessages(messages);
      messages = mergeIncomingPushPersonalIntoMessages(messages, loadForPeer);
      messages = dedupePersonalMessagesForRender(messages);
      if (Array.isArray(messages) && !getChatIsEditingMessage()) {
        try {
          var earlyMessagesEl = getMessagesEl();
          var earlyNeedsRender = !!(
            earlyMessagesEl &&
            /Загрузка|Loading/i.test(String(earlyMessagesEl.textContent || ""))
          );
          if (earlyNeedsRender) {
            var earlySig = personalRenderSignature(getChatWithUserId() || loadForPeer || "", messages, data.partial === true);
            personalMessagesCache[getChatWithUserId() || loadForPeer] = messages.slice();
            personalMessagesCacheMeta[getChatWithUserId() || loadForPeer] = { ts: Date.now(), source: "live-early" };
            setLastPersonalMessagesSig(earlySig);
            renderMessages(messages);
            try {
              pokerWritePersonalPeerSnapshotToDisk(getChatWithUserId() || loadForPeer, messages);
            } catch (eSnapEarlyP) {}
          }
        } catch (eEarlyPersonalRender) {
          try {
            window.__pokerChatPersonalLastRenderError = {
              message: eEarlyPersonalRender && eEarlyPersonalRender.message ? String(eEarlyPersonalRender.message) : String(eEarlyPersonalRender || ""),
              at: Date.now(),
            };
          } catch (eTraceEarlyRender) {}
        }
      }
      if (
        window._pendingPersonalMessage &&
        window._pendingPersonalWith &&
        peerChatIdsEqual(window._pendingPersonalWith, loadForPeer) &&
        pokerChatMessageHasPersistedId(window._pendingPersonalMessage.id) &&
        messages.some(function (m) { return pokerChatMessageHasPersistedId(m.id) && String(m.id) === String(window._pendingPersonalMessage.id); })
      ) {
        window._pendingPersonalMessage = null;
        window._pendingPersonalWith = null;
      }
      var isGrpThread =
        data.isGroupChat === true || (getChatWithUserId() && String(getChatWithUserId()).indexOf("group_") === 0);
      if (isGrpThread && data.groupTitle && getConvTitle()) {
        var gt = String(data.groupTitle).trim();
        if (gt) {
          setTextContentIfChanged(getConvTitle(), gt);
          setChatWithUserName(gt);
        }
      } else if (!isGrpThread) {
        var titleName =
          data.contactName != null && String(data.contactName).trim()
            ? String(data.contactName).trim()
            : data.chatDisplayName != null && String(data.chatDisplayName).trim()
              ? String(data.chatDisplayName).trim()
              : data.userName != null && String(data.userName).trim()
                ? String(data.userName).trim()
                : "";
        if (!titleName && messages.length && getChatWithUserId()) {
          var myIdName = resolveMyChatMemberId();
          for (var ni = messages.length - 1; ni >= 0; ni--) {
            var nm = messages[ni];
            if (!nm || !nm.from) continue;
            if (myIdName && peerChatIdsEqual(nm.from, myIdName)) continue;
            if (!peerChatIdsEqual(nm.from, getChatWithUserId())) continue;
            if (nm.fromName && String(nm.fromName).trim()) {
              titleName = String(nm.fromName).trim();
              break;
            }
          }
        }
        if (titleName) {
          setChatWithUserName(titleName);
          if (getConvTitle()) setTextContentIfChanged(getConvTitle(), titleName);
        }
      }
      if (!isGrpThread && Array.isArray(messages) && messages.length && getChatWithUserId()) {
        messages = enrichPersonalThreadPeerMeta(messages, getChatWithUserId(), {
          fromName: getChatWithUserName() || "",
          fromAvatar: getChatWithPeerAvatarUrl() || "",
          fromP21Id: data.otherP21Id != null ? data.otherP21Id : "",
          fromPokerPlusVerified: data.otherPokerPlusVerified === true,
        });
      }
      var pt = data.participantsCount != null ? data.participantsCount : "—";
      var ol = data.onlineCount != null ? data.onlineCount : "—";
      window.lastConvStats = pt + " уч · " + ol + " онл";
      if (getConvTitleId()) {
        if (isGrpThread) {
          setChatConvTitleIdText(pt !== "—" ? String(pt) + " уч." : "");
        } else {
          var titleP21 =
            data.otherP21Id != null && String(data.otherP21Id).trim() !== "" ? String(data.otherP21Id).trim() : null;
          setChatConvTitleIdText(titleP21 || "");
          setChatPeerVerified(data.otherPokerPlusVerified === true);
          setChatConvTitleFish(data.otherStatusLevel != null ? data.otherStatusLevel : "");
          updateConvTypingUi();
        }
      }
      var peerAvData = "";
      if (isGrpThread) {
        peerAvData = data.groupAvatar != null && String(data.groupAvatar).trim() ? String(data.groupAvatar).trim() : "";
      } else {
        peerAvData = data.otherAvatar != null && String(data.otherAvatar).trim() ? String(data.otherAvatar).trim() : "";
      }
      if (!peerAvData && !isGrpThread && messages.length && getChatWithUserId()) {
        var myIdL = resolveMyChatMemberId();
        for (var li = messages.length - 1; li >= 0; li--) {
          var ml = messages[li];
          if (!ml || !ml.from) continue;
          if (myIdL && peerChatIdsEqual(ml.from, myIdL)) continue;
          if (!peerChatIdsEqual(ml.from, getChatWithUserId())) continue;
          if (ml.fromAvatar) {
            peerAvData = String(ml.fromAvatar).trim();
            break;
          }
        }
      }
      if (isGrpThread) {
        setConvGroupCanChangeAvatar(
          data.iCanChangeGroupAvatar === true || data.iCanChangeGroupAvatar === false
            ? !!data.iCanChangeGroupAvatar
            : !!(data.isAdmin || data.iAmGroupCreator)
        );
        syncConvGroupAvatarEditUi();
        if (peerAvData) {
          setChatWithPeerAvatarUrl(peerAvData);
          applyConvPeerAvatarHeader(peerAvData, getChatWithUserName());
        } else {
          applyConvPeerAvatarHeader("", "");
          if (getConvPeerAvatarPh()) {
            getConvPeerAvatarPh().textContent = "\uD83D\uDC65";
            getConvPeerAvatarPh().classList.remove("chat-conv-peer-avatar--hidden");
          }
          if (getConvPeerAvatar()) getConvPeerAvatar().classList.add("chat-conv-peer-avatar--hidden");
        }
      } else {
        setConvGroupCanChangeAvatar(false);
        syncConvGroupAvatarEditUi();
      }
      if (!isGrpThread && peerAvData) {
        setChatWithPeerAvatarUrl(peerAvData);
        applyConvPeerAvatarHeader(peerAvData, getChatWithUserName());
      }
      var latest = messages.length ? (messages[messages.length - 1].time || "") : "";
      var nextPersonalLatest = messages.length
        ? String(messages[messages.length - 1].id || "") + "|" + String(messages[messages.length - 1].time || "")
        : "";
      if (nextPersonalLatest && nextPersonalLatest !== prevPersonalLatest) {
        pokerChatRequestPollBurst("personal");
      }
      var isChatViewActive = !!document.querySelector('[data-view="chat"].view--active');
      var peerLvKey = getChatWithUserId() ? normalizePeerIdForChat(getChatWithUserId()) : "";
      var lastView = peerLvKey && lastViewedPersonal[peerLvKey] != null ? lastViewedPersonal[peerLvKey] : "";
      var personalLastSet = !!(peerLvKey && lastViewedPersonal[peerLvKey] != null);
      var peerNorm = peerLvKey;
      var myIdUnread = resolveMyChatMemberId();
      var unreadCount = personalLastSet
        ? messages.filter(function (m) {
            if (!pokerChatMessageIsNewerThanViewed(m.time, lastView)) return false;
            if (isGrpThread) {
              return !!(myIdUnread && !peerChatIdsEqual(m.from, myIdUnread));
            }
            return normalizePeerIdForChat(m.from) === peerNorm;
          }).length
        : 0;
      // Звук лички (PWA и Mini App): когда открыт другой экран / другой диалог; общий чат в TWA по-прежнему без звука.
      if (pokerApiHasCredential() && pokerReadChatMessageSoundEnabled()) {
        var isOnPersonal = !!(isChatViewActive && getChatActiveTab() === "personal" && getConvView() && !getConvView().classList.contains("chat-conv-view--hidden"));
        if (!isOnPersonal && personalLastSet && unreadCount > 0) {
          var lastUnreadP = null;
          try {
            var unreadMsgsP = messages.filter(function (m) {
              if (!pokerChatMessageIsNewerThanViewed(m.time, lastView)) return false;
              if (isGrpThread) {
                return !!(myIdUnread && !peerChatIdsEqual(m.from, myIdUnread));
              }
              return normalizePeerIdForChat(m.from) === peerNorm;
            });
            lastUnreadP = unreadMsgsP.length ? unreadMsgsP[unreadMsgsP.length - 1] : null;
          } catch (eUnreadP) {}
          if (lastUnreadP) {
            var keyP = String(lastUnreadP.id || "") + "|" + String(lastUnreadP.time || "");
            var map = window.__pokerChatSoundedPersonalByWith || (window.__pokerChatSoundedPersonalByWith = {});
            if (keyP && map[String(getChatWithUserId())] !== keyP) {
              map[String(getChatWithUserId())] = keyP;
              pokerPlayChatMessageNotificationSound();
            }
          }
        }
      }
      if (isChatViewActive && getChatActiveTab() === "personal" && getConvView() && !getConvView().classList.contains("chat-conv-view--hidden") && peerLvKey) {
        if (latest && !isNaN(Date.parse(String(latest).trim()))) {
          lastViewedPersonal[peerLvKey] = latest;
          saveChatLastViewed();
        }
        window.chatPersonalUnread = false;
        window.chatPersonalUnreadCount = 0;
      } else if (getChatWithUserId() && personalLastSet && unreadCount > 0) {
        window.chatPersonalUnread = true;
        window.chatPersonalUnreadCount = unreadCount;
      } else {
        window.chatPersonalUnread = false;
        window.chatPersonalUnreadCount = 0;
      }
      if (Array.isArray(messages) && !getChatIsEditingMessage()) {
        var sig = personalRenderSignature(getChatWithUserId() || "", messages, data.partial === true);
        var shouldRenderPersonalMessages = sig !== getLastPersonalMessagesSig();
        try {
          var msgElForRenderCheck = getMessagesEl();
          if (!shouldRenderPersonalMessages && msgElForRenderCheck) {
            shouldRenderPersonalMessages = /Загрузка|Loading/i.test(String(msgElForRenderCheck.textContent || ""));
          }
        } catch (ePersonalRenderCheck) {}
        if (shouldRenderPersonalMessages) {
          personalMessagesCache[getChatWithUserId()] = messages.slice();
          personalMessagesCacheMeta[getChatWithUserId()] = { ts: Date.now(), source: "live" };
          try {
            pokerWritePersonalPeerSnapshotToDisk(getChatWithUserId(), personalMessagesCache[getChatWithUserId()]);
          } catch (eSnapP) {}
          var fastAppendedPersonal = false;
          if (
            data.partial === true &&
            getMessagesEl() &&
            !chatMessagesDomHasOptimisticNode(getMessagesEl()) &&
            !getOptimisticPersonalPayload() &&
            !(window._pendingPersonalMessage && window._pendingPersonalMessage.id) &&
            canFastAppendMessages(prevPersonalMessages, messages)
          ) {
            fastAppendedPersonal = fastAppendChatMessages(
              getMessagesEl(),
              messages.slice(prevPersonalMessages.length),
              buildPersonalMessagesBodyHtml,
              function () {
                setLastPersonalMessagesSig(sig);
                bindChatMsgNameProfileButtons(getMessagesEl());
                attachContextMenuForOthers(getMessagesEl(), "personal", getMessagesEl());
                try { refreshChatSelfPinBars(); } catch (ePinFastP) {}
                try { scheduleSyncChatScrollBottomButtons(); } catch (eSbFastP) {}
              }
            );
          }
          if (!fastAppendedPersonal) schedulePersonalRender(messages, sig);
        }
      }
      scheduleChatPostRenderSync(function () {
        updateChatHeaderStats();
        applyConvGroupDescription();
        updateUnreadDots();
      });
      if (opts.waitForChange) pokerChatScheduleLongPoll("personal", 0);
      if (data.trace && data.trace.serverNowMs && messages.length) {
        var lastMsgP = messages[messages.length - 1];
        pokerChatRecordTrace("personal-delivery", {
          peer: loadForPeer,
          serverToClientMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)),
          msgAgeMs: lastMsgP && lastMsgP.time ? Math.max(0, Date.now() - Date.parse(String(lastMsgP.time))) : null,
          partial: !!data.partial,
        });
      }
    } else if (getConvView() && !getConvView().classList.contains("chat-conv-view--hidden") && getMessagesEl()) {
      if (!opts.waitForChange && (Number(opts.__retryCount || 0) || 0) < 2) {
        var apiRetry = Number(opts.__retryCount || 0) || 0;
        setTimeout(function () {
          try {
            loadMessages(Object.assign({}, opts, { __retryCount: apiRetry + 1, __fallbackTimerStarted: true }));
          } catch (ePersonalApiRetry) {}
        }, apiRetry ? 1800 : 700);
        clearPersonalLoadingFallback(loadForPeer, "Загружаем сообщения…");
      } else {
        getMessagesEl().innerHTML = '<p class="chat-empty">' + escapeHtml((data && data.error) || "Ошибка загрузки") + "</p>";
      }
      if (opts.waitForChange) pokerChatScheduleLongPoll("personal", 1200);
    }
  })
    .catch(function (err) {
      try {
        window.__pokerChatPersonalLastError = {
          peer: String(loadForPeer || ""),
          message: err && err.message ? String(err.message) : String(err || ""),
          name: err && err.name ? String(err.name) : "",
          at: Date.now(),
        };
      } catch (eTracePersonalErr) {}
      if (
        loadPersonalSeq !== window.__pokerLoadPersonalSeq &&
        (!peerChatIdsEqual(getChatWithUserId(), loadForPeer) || !getConvView() || getConvView().classList.contains("chat-conv-view--hidden"))
      ) return;
      if (!peerChatIdsEqual(getChatWithUserId(), loadForPeer)) return;
      if (!opts.waitForChange && (Number(opts.__retryCount || 0) || 0) < 2) {
        var retryCount = Number(opts.__retryCount || 0) || 0;
        setTimeout(function () {
          try {
            loadMessages(Object.assign({}, opts, { __retryCount: retryCount + 1, __fallbackTimerStarted: true }));
          } catch (ePersonalRetry) {}
        }, retryCount ? 1800 : 700);
        clearPersonalLoadingFallback(loadForPeer, "Загружаем сообщения…");
        return;
      }
      if (getConvView() && !getConvView().classList.contains("chat-conv-view--hidden") && getMessagesEl()) {
        getMessagesEl().innerHTML = '<p class="chat-empty">' + escapeHtml(POKER_NET_ERR) + "</p>";
      }
      if (opts.waitForChange) pokerChatScheduleLongPoll("personal", 1200);
    });
}
window.__pokerLoadOlderPersonalMessages = function () {
  try {
    if (!getChatWithUserId() || !getMessagesEl()) return;
    var peerId = String(getChatWithUserId());
    var cache = personalMessagesCache[peerId] && Array.isArray(personalMessagesCache[peerId]) ? personalMessagesCache[peerId] : [];
    if (!cache.length) return;
    var oldest = cache[0];
    var prevTop = getMessagesEl().scrollTop;
    var prevHeight = getMessagesEl().scrollHeight;
    var urlOlder =
      base +
      "/api/chat" +
      pokerApiAuthQuery("?") +
      "&with=" +
      encodeURIComponent(peerId) +
      "&beforeId=" +
      encodeURIComponent(String(oldest.id || "")) +
      "&beforeTime=" +
      encodeURIComponent(String(oldest.time || ""));
    fetch(urlOlder, { cache: "no-store" })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; }); })
      .then(function (data) {
        if (!peerChatIdsEqual(getChatWithUserId(), peerId)) return;
        if (!data || !data.ok || !Array.isArray(data.messages) || !data.messages.length) {
          setPersonalHasMoreBefore(peerId, !!(data && data.hasMoreBefore));
          if (typeof renderMessages === "function") renderMessages(cache);
          return;
        }
        setPersonalHasMoreBefore(peerId, !!data.hasMoreBefore);
        var merged = data.messages.concat(cache);
        personalMessagesCache[peerId] = merged.slice();
        personalMessagesCacheMeta[peerId] = { ts: Date.now(), source: "live" };
        if (
          getMessagesEl() &&
          Array.isArray(data.messages) &&
          data.messages.length
        ) {
          var fastPrependedPersonal = fastPrependChatMessages(
            getMessagesEl(),
            data.messages,
            buildPersonalMessagesBodyHtml,
            getPersonalHasMoreBefore(peerId) ? "personal" : null,
            function () {
              setLastPersonalMessagesSig(personalRenderSignature(peerId, merged, false));
              bindChatMsgNameProfileButtons(getMessagesEl());
              attachContextMenuForOthers(getMessagesEl(), "personal", getMessagesEl());
              try { refreshChatSelfPinBars(); } catch (ePinPreP) {}
              try { scheduleSyncChatScrollBottomButtons(); } catch (eSbPreP) {}
            }
          );
          if (fastPrependedPersonal) return;
        }
        renderMessages(merged);
        requestAnimationFrame(function () {
          try {
            if (getMessagesEl()) getMessagesEl().scrollTop = Math.max(0, getMessagesEl().scrollHeight - prevHeight + prevTop);
          } catch (eScrollOldP) {}
        });
      });
  } catch (eOlderP) {}
};

  return {
    loadMessages: loadMessages,
    loadOlderPersonalMessages: window.__pokerLoadOlderPersonalMessages,
  };
}
