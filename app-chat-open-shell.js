// Chat open shell: club chat, push-DM immediate open and dialog-to-conversation bridge.

function initChatOpenShell(opts) {
  opts = opts || {};
  var POKER_CHAT_NEED_AUTH_PWA_MSG = opts.POKER_CHAT_NEED_AUTH_PWA_MSG || "";
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var getDialogsView = typeof opts.getDialogsView === "function" ? opts.getDialogsView : function () { return null; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getPersonalView = typeof opts.getPersonalView === "function" ? opts.getPersonalView : function () { return null; };
  var getListView = typeof opts.getListView === "function" ? opts.getListView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return "dialogs"; };
  var setChatActiveTab = typeof opts.setChatActiveTab === "function" ? opts.setChatActiveTab : function () {};
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return null; };
  var setChatWithUserId = typeof opts.setChatWithUserId === "function" ? opts.setChatWithUserId : function () {};
  var getChatWithUserName = typeof opts.getChatWithUserName === "function" ? opts.getChatWithUserName : function () { return ""; };
  var setChatWithUserName = typeof opts.setChatWithUserName === "function" ? opts.setChatWithUserName : function () {};
  var setChatPeerTypingActive = typeof opts.setChatPeerTypingActive === "function" ? opts.setChatPeerTypingActive : function () {};
  var getConvTitle = typeof opts.getConvTitle === "function" ? opts.getConvTitle : function () { return null; };
  var getChatWithPeerAvatarUrl = typeof opts.getChatWithPeerAvatarUrl === "function" ? opts.getChatWithPeerAvatarUrl : function () { return null; };
  var setChatWithPeerAvatarUrl = typeof opts.setChatWithPeerAvatarUrl === "function" ? opts.setChatWithPeerAvatarUrl : function () {};
  var getGeneralMessages = typeof opts.getGeneralMessages === "function" ? opts.getGeneralMessages : function () { return null; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getPersonalMessagesCache = typeof opts.getPersonalMessagesCache === "function" ? opts.getPersonalMessagesCache : function () { return {}; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var getChatComposerDrafts = typeof opts.getChatComposerDrafts === "function" ? opts.getChatComposerDrafts : function () { return { general: "", personal: "" }; };
  var setScrollGeneralToBottomOnNextRender = typeof opts.setScrollGeneralToBottomOnNextRender === "function" ? opts.setScrollGeneralToBottomOnNextRender : function () {};
  var setScrollPersonalToBottomOnNextRender = typeof opts.setScrollPersonalToBottomOnNextRender === "function" ? opts.setScrollPersonalToBottomOnNextRender : function () {};
  var getInlineChatHeaderTopOffsetPx = typeof opts.getInlineChatHeaderTopOffsetPx === "function" ? opts.getInlineChatHeaderTopOffsetPx : function () { return "0px"; };
  var pokerResetChatDialogsViewportArtifacts = typeof opts.pokerResetChatDialogsViewportArtifacts === "function" ? opts.pokerResetChatDialogsViewportArtifacts : function () {};
  var updateGeneralInputLocked = typeof opts.updateGeneralInputLocked === "function" ? opts.updateGeneralInputLocked : function () {};
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var mountChatComposer = typeof opts.mountChatComposer === "function" ? opts.mountChatComposer : function () {};
  var syncChatInertForIosAccessory = typeof opts.syncChatInertForIosAccessory === "function" ? opts.syncChatInertForIosAccessory : function () {};
  var scheduleSyncChatScrollBottomButtons = typeof opts.scheduleSyncChatScrollBottomButtons === "function" ? opts.scheduleSyncChatScrollBottomButtons : function () {};
  var pokerUpdateChatDmFocusFromUiState = typeof opts.pokerUpdateChatDmFocusFromUiState === "function" ? opts.pokerUpdateChatDmFocusFromUiState : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};
  var getPokerChatTelegramAuthState = typeof opts.getPokerChatTelegramAuthState === "function" ? opts.getPokerChatTelegramAuthState : function () { return "ok"; };
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var isTelegramWebApp = typeof opts.isTelegramWebApp === "function" ? opts.isTelegramWebApp : function () { return false; };
  var pokerNotifyChatAuthPending = typeof opts.pokerNotifyChatAuthPending === "function" ? opts.pokerNotifyChatAuthPending : null;
  var pokerNotifyChatVerificationRequired = typeof opts.pokerNotifyChatVerificationRequired === "function" ? opts.pokerNotifyChatVerificationRequired : null;
  var paintGeneralFromMemoryBeforeFetch = typeof opts.paintGeneralFromMemoryBeforeFetch === "function" ? opts.paintGeneralFromMemoryBeforeFetch : function () {};
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var pokerPushOpenStateDebug = typeof opts.pokerPushOpenStateDebug === "function" ? opts.pokerPushOpenStateDebug : function () {};
  var setChatConvTitleIdText = typeof opts.setChatConvTitleIdText === "function" ? opts.setChatConvTitleIdText : function () {};
  var applyConvPeerAvatarHeader = typeof opts.applyConvPeerAvatarHeader === "function" ? opts.applyConvPeerAvatarHeader : function () {};
  var syncChatConvGroupAddMembersBtn = typeof opts.syncChatConvGroupAddMembersBtn === "function" ? opts.syncChatConvGroupAddMembersBtn : function () {};
  var updateUnreadDots = typeof opts.updateUnreadDots === "function" ? opts.updateUnreadDots : function () {};
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var pokerPushOpenDebug = typeof opts.pokerPushOpenDebug === "function" ? opts.pokerPushOpenDebug : function () {};
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var pokerSafeChatAlert = typeof opts.pokerSafeChatAlert === "function" ? opts.pokerSafeChatAlert : function () {};
  var setTab = typeof opts.setTab === "function" ? opts.setTab : function () {};
  var showConv = typeof opts.showConv === "function" ? opts.showConv : function () {};
  var resizeChatTextarea = typeof opts.resizeChatTextarea === "function" ? opts.resizeChatTextarea : null;

function openClubChat() {
  function applyClubGeneralHeaderLayout() {
    try {
      var genHeader = document.querySelector("#chatGeneralView .chat-general-header");
      if (genHeader) {
        genHeader.style.top = getInlineChatHeaderTopOffsetPx();
        genHeader.style.left = "0";
        genHeader.style.right = "0";
        genHeader.style.transform = "none";
        genHeader.style.width = "100%";
      genHeader.style.maxWidth = "none";
    }
  } catch (err) {}
  try {
    var rafDlg = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
    rafDlg(function () {
      try {
        pokerResetChatDialogsViewportArtifacts();
      } catch (eDlgResetRaf1) {}
      rafDlg(function () {
        try {
          pokerResetChatDialogsViewportArtifacts();
        } catch (eDlgResetRaf2) {}
      });
    });
  } catch (eDlgResetRaf) {}
}
function setChatThreadChromeOpen(on) {
  try {
    if (typeof window.pokerSetChatConversationOpenClass === "function") {
      window.pokerSetChatConversationOpenClass(!!on);
      return;
    }
  } catch (eThreadChromeGlobal) {}
  try {
    if (document.body && document.body.classList) document.body.classList.toggle("chat-conversation-open", !!on);
    if (document.documentElement && document.documentElement.classList) document.documentElement.classList.toggle("chat-conversation-open", !!on);
  } catch (eThreadChromeClass) {}
  try {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  } catch (eThreadChromePad) {}
}
  function openClubChatShell() {
    try {
      window.__pokerChatConvBackSeq = (Number(window.__pokerChatConvBackSeq || 0) || 0) + 1;
    } catch (eClubSeq) {}
    try {
      updateGeneralInputLocked(false);
    } catch (eOpenG) {}
    if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
    if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
    if (getGeneralView()) {
      getGeneralView().classList.remove("chat-general-view--hidden");
      getGeneralView().style.display = "";
    }
    if (getPersonalView()) getPersonalView().classList.add("chat-personal-view--hidden");
    setChatThreadChromeOpen(true);
    window.chatGeneralUnread = false;
    setChatActiveTab("general");
    setScrollGeneralToBottomOnNextRender(true);
    updateChatHeaderStats();
    applyClubGeneralHeaderLayout();
    mountChatComposer("general");
    syncChatInertForIosAccessory();
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbClub) {}
    try {
      pokerUpdateChatDmFocusFromUiState();
    } catch (eDmClub) {}
    pokerChatRefreshLongPollTargets();
  }

  var st = typeof getPokerChatTelegramAuthState === "function" ? getPokerChatTelegramAuthState() : "ok";
  if (st !== "ok") {
    openClubChatShell();
    updateGeneralInputLocked(true);
    var gateBlockInner;
    if (st === "pending") {
      gateBlockInner =
        '<p class="chat-empty">' +
        escapeHtml(
          "Выполняется проверка входа через Telegram. Подождите несколько секунд и снова откройте «Главный чат» или вернитесь на главную."
        ) +
        "</p>";
    } else if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
      gateBlockInner =
        '<p class="chat-empty">' +
        escapeHtml("Чтобы общаться в чатах, сначала войдите: откройте Mini App из бота Telegram.") +
        "</p>";
    } else {
      gateBlockInner = POKER_CHAT_NEED_AUTH_PWA_MSG.split("\n")
        .map(function (line) {
          return '<p class="chat-empty">' + escapeHtml(line) + "</p>";
        })
        .join("");
    }
    if (getGeneralMessages()) {
      var wrapNeedLogin = getGeneralMessages().parentElement;
      if (wrapNeedLogin && wrapNeedLogin.classList) wrapNeedLogin.classList.remove("chat-messages-wrap--settling");
      getGeneralMessages().innerHTML =
        '<div class="chat-general-gate chat-general-gate--need-login">' + gateBlockInner + "</div>";
    }
    if (st === "pending") {
      if (typeof pokerNotifyChatAuthPending === "function") pokerNotifyChatAuthPending();
    } else if (typeof pokerNotifyChatVerificationRequired === "function") {
      pokerNotifyChatVerificationRequired();
    }
    return;
  }

  openClubChatShell();
  /* Без сброса pollRev следующий loadGeneral может вернуть notModified без тела — превью в списке уже
     обновлено полным ответом, а лента ещё на старом кэше до следующего полного запроса. */
  try {
    window.__pokerGeneralPollRev = "";
  } catch (ePollOpen) {}
  paintGeneralFromMemoryBeforeFetch();
  loadGeneral();
}
function openPushDmImmediate(userId, userName, peerP21Id, peerAvatarOpt) {
  try {
    pokerPushOpenStateDebug("openPushDmImmediate-enter", String(userId || ""));
  } catch (ePushImmDbg0) {}
  var uid = userId != null ? String(userId).trim() : "";
  if (!uid) return;
  function ensurePushDmShellStable() {
    try {
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
      if (getGeneralView()) {
        getGeneralView().classList.add("chat-general-view--hidden");
        getGeneralView().style.display = "none";
      }
      if (getPersonalView()) getPersonalView().classList.remove("chat-personal-view--hidden");
      if (getListView()) getListView().classList.add("chat-list-view--hidden");
      if (getConvView()) getConvView().classList.remove("chat-conv-view--hidden");
      setChatThreadChromeOpen(true);
      setChatActiveTab("personal");
      setChatWithUserId(uid);
      setChatWithUserName(userName || uid);
      updateChatHeaderStats();
      updateUnreadDots();
      syncChatInertForIosAccessory();
    } catch (ePushDmStable) {}
  }
  if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
  if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
  if (getGeneralView()) {
    getGeneralView().classList.add("chat-general-view--hidden");
    getGeneralView().style.display = "none";
  }
  if (getPersonalView()) getPersonalView().classList.remove("chat-personal-view--hidden");
  if (getListView()) getListView().classList.add("chat-list-view--hidden");
  if (getConvView()) getConvView().classList.remove("chat-conv-view--hidden");
  setChatThreadChromeOpen(true);
  setChatActiveTab("personal");
  setChatWithUserId(uid);
  setChatWithUserName(userName || uid);
  setChatPeerTypingActive(false);
  if (getConvTitle()) getConvTitle().textContent = getChatWithUserName();
  setChatConvTitleIdText("");
  if (peerAvatarOpt != null && String(peerAvatarOpt).trim()) {
    setChatWithPeerAvatarUrl(String(peerAvatarOpt).trim());
    applyConvPeerAvatarHeader(getChatWithPeerAvatarUrl(), getChatWithUserName());
  } else {
    setChatWithPeerAvatarUrl(null);
    applyConvPeerAvatarHeader("", getChatWithUserName());
  }
  syncChatConvGroupAddMembersBtn();
  setScrollPersonalToBottomOnNextRender(true);
  if (getMessagesEl() && (!getPersonalMessagesCache()[uid] || !getPersonalMessagesCache()[uid].length)) {
    getMessagesEl().innerHTML = '<p class="chat-empty">Загрузка...</p>';
    getMessagesEl().scrollTop = 0;
  }
  mountChatComposer("personal");
  syncChatInertForIosAccessory();
  updateChatHeaderStats();
  updateUnreadDots();
  try {
    pokerUpdateChatDmFocusFromUiState();
  } catch (ePushImmFocus) {}
  pokerChatRefreshLongPollTargets();
  try {
    scheduleSyncChatScrollBottomButtons();
  } catch (ePushImmScroll) {}
  if (typeof loadMessages === "function" && typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
    loadMessages();
  }
  [120, 420, 900].forEach(function (ms) {
    setTimeout(function () {
      try {
        var convVisible = !!(getConvView() && !getConvView().classList.contains("chat-conv-view--hidden"));
        var samePeer = !!(getChatWithUserId() && peerChatIdsEqual(getChatWithUserId(), uid));
        if (convVisible && samePeer) return;
        pokerPushOpenDebug("openPushDmImmediate-stabilize", uid + " @" + ms);
        ensurePushDmShellStable();
        if (typeof loadMessages === "function" && typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
          loadMessages();
        }
      } catch (ePushImmStabilize) {}
    }, ms);
  });
  try {
    pokerPushOpenStateDebug("openPushDmImmediate-done", String(uid || ""));
  } catch (ePushImmDbg1) {}
}
function openConvFromDialogs(userId, userName, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt) {
  try {
    pokerPushOpenStateDebug("openConvFromDialogs-enter", String(userId || ""));
  } catch (eOpenConvDbg0) {}
  if (!userId) return;
  var openBackSeq = Number(window.__pokerChatConvBackSeq || 0) || 0;
  try {
    window.__pokerChatDialogOpenIntentAt = Date.now();
    window.__pokerChatDialogOpenIntentPeer = String(userId || "");
  } catch (eOpenConvIntent) {}
  var openConvIsGroup = String(userId).indexOf("group_") === 0;
  if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
  function ensureDialogConvShellStable() {
    try {
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
      if (getGeneralView()) {
        getGeneralView().classList.add("chat-general-view--hidden");
        getGeneralView().style.display = "none";
      }
      if (getPersonalView()) getPersonalView().classList.remove("chat-personal-view--hidden");
      if (getListView()) getListView().classList.add("chat-list-view--hidden");
      if (getConvView()) getConvView().classList.remove("chat-conv-view--hidden");
      setChatThreadChromeOpen(true);
      setChatActiveTab("personal");
      setChatWithUserId(userId);
      setChatWithUserName(userName || userId);
      updateChatHeaderStats();
      updateUnreadDots();
      syncChatInertForIosAccessory();
      pokerChatRefreshLongPollTargets();
    } catch (eDialogConvStable) {}
  }
  try {
    var myOpenConvId = typeof resolveMyChatMemberId === "function" ? resolveMyChatMemberId() : "";
    if (myOpenConvId && !openConvIsGroup && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(userId, myOpenConvId)) {
      var selfMsg =
        "Это личный чат с самим собой — входящие от игроков здесь не отображаются. Откройте диалог с игроком из списка контактов ниже или найдите человека по ID / нику.";
      pokerSafeChatAlert(selfMsg);
      return;
    }
  } catch (eOpenConvSelfGuard) {}
  if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
  if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
  if (getGeneralView()) {
    getGeneralView().classList.add("chat-general-view--hidden");
    getGeneralView().style.display = "none";
  }
  if (getPersonalView()) getPersonalView().classList.remove("chat-personal-view--hidden");
  if (getListView()) getListView().classList.add("chat-list-view--hidden");
  if (getConvView()) getConvView().classList.remove("chat-conv-view--hidden");
  // Важно: `setTab("personal")` внутри `setTab()` проверяет `getChatWithUserId()`.
  // Если вызвать `setTab()` до `showConv()`, чат может не открыться.
  // Поэтому сначала выставляем нужные поля, затем фиксируем таб и грузим сообщения.
  setChatWithUserId(userId);
  setChatWithUserName(userName || userId);
  setChatPeerTypingActive(false);
  window.__pokerSuppressSetTabPersonalLoad = true;
  try {
    setTab("personal");
  } finally {
    window.__pokerSuppressSetTabPersonalLoad = false;
  }
  showConv(userId, userName || userId, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt);
  try {
    pokerPushOpenStateDebug("openConvFromDialogs-done", String(userId || ""));
  } catch (eOpenConvDbg1) {}
  pokerChatRefreshLongPollTargets();
  [140, 420, 900].forEach(function (ms) {
    setTimeout(function () {
      try {
        if ((Number(window.__pokerChatConvBackSeq || 0) || 0) !== openBackSeq) return;
        var convVisible = !!(getConvView() && !getConvView().classList.contains("chat-conv-view--hidden"));
        var samePeer = !!(getChatWithUserId() && peerChatIdsEqual(getChatWithUserId(), userId));
        if (convVisible && samePeer && getChatActiveTab() === "personal") return;
        pokerPushOpenDebug("openConvFromDialogs-stabilize", String(userId || "") + " @" + ms);
        ensureDialogConvShellStable();
        if (typeof loadMessages === "function" && typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
          loadMessages();
        }
      } catch (eOpenConvStabilize) {}
    }, ms);
  });
  if (window.__pendingDepositMessage && getChatComposerEl()) {
    getChatComposerDrafts().personal = String(window.__pendingDepositMessage);
    getChatComposerEl().value = getChatComposerDrafts().personal;
    try {
      if (typeof resizeChatTextarea === "function") resizeChatTextarea(getChatComposerEl());
    } catch (eDep) {}
    window.__pendingDepositMessage = null;
  }
}

  return {
    openClubChat: openClubChat,
    openPushDmImmediate: openPushDmImmediate,
    openConvFromDialogs: openConvFromDialogs,
  };
}
