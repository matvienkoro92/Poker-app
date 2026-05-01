// Chat tab/dialog shell: switching chat sections and returning to dialogs.

function initChatTabDialogShell(opts) {
  opts = opts || {};
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return "dialogs"; };
  var setChatActiveTab = typeof opts.setChatActiveTab === "function" ? opts.setChatActiveTab : function () {};
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return null; };
  var setChatWithUserId = typeof opts.setChatWithUserId === "function" ? opts.setChatWithUserId : function () {};
  var getChatWithUserName = typeof opts.getChatWithUserName === "function" ? opts.getChatWithUserName : function () { return null; };
  var setChatWithUserName = typeof opts.setChatWithUserName === "function" ? opts.setChatWithUserName : function () {};
  var setChatPeerTypingActive = typeof opts.setChatPeerTypingActive === "function" ? opts.setChatPeerTypingActive : function () {};
  var getDialogsView = typeof opts.getDialogsView === "function" ? opts.getDialogsView : function () { return null; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getPersonalView = typeof opts.getPersonalView === "function" ? opts.getPersonalView : function () { return null; };
  var getAdminsView = typeof opts.getAdminsView === "function" ? opts.getAdminsView : function () { return null; };
  var getListView = typeof opts.getListView === "function" ? opts.getListView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getConvTitle = typeof opts.getConvTitle === "function" ? opts.getConvTitle : function () { return null; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var setScrollGeneralToBottomOnNextRender = typeof opts.setScrollGeneralToBottomOnNextRender === "function" ? opts.setScrollGeneralToBottomOnNextRender : function () {};
  var setScrollPersonalToBottomOnNextRender = typeof opts.setScrollPersonalToBottomOnNextRender === "function" ? opts.setScrollPersonalToBottomOnNextRender : function () {};
  var pokerPushOpenTraceTransition = typeof opts.pokerPushOpenTraceTransition === "function" ? opts.pokerPushOpenTraceTransition : function () {};
  var pokerPushOpenDebug = typeof opts.pokerPushOpenDebug === "function" ? opts.pokerPushOpenDebug : function () {};
  var pokerPushOpenSetCaller = typeof opts.pokerPushOpenSetCaller === "function" ? opts.pokerPushOpenSetCaller : function () {};
  var pokerPushOpenConsumeCaller = typeof opts.pokerPushOpenConsumeCaller === "function" ? opts.pokerPushOpenConsumeCaller : function () { return ""; };
  var pokerPushOpenStateDebug = typeof opts.pokerPushOpenStateDebug === "function" ? opts.pokerPushOpenStateDebug : function () {};
  var normalizePeerIdForChat = typeof opts.normalizePeerIdForChat === "function" ? opts.normalizePeerIdForChat : function (id) { return String(id || ""); };
  var pokerOpenResolvedChatPeer = typeof opts.pokerOpenResolvedChatPeer === "function" ? opts.pokerOpenResolvedChatPeer : null;
  var pokerOpenChatPeerDirectFallback = typeof opts.pokerOpenChatPeerDirectFallback === "function" ? opts.pokerOpenChatPeerDirectFallback : null;
  var pokerOpenPendingPushDmWithoutContacts = typeof opts.pokerOpenPendingPushDmWithoutContacts === "function" ? opts.pokerOpenPendingPushDmWithoutContacts : null;
  var pokerOpenPushDmHard = typeof opts.pokerOpenPushDmHard === "function" ? opts.pokerOpenPushDmHard : null;
  var pokerGetActivePushDmTarget = typeof opts.pokerGetActivePushDmTarget === "function" ? opts.pokerGetActivePushDmTarget : function () { return ""; };
  var pokerGuardDefaultDialogsOpen = typeof opts.pokerGuardDefaultDialogsOpen === "function" ? opts.pokerGuardDefaultDialogsOpen : null;
  var pokerHydrateChatSnapshotsFromDisk = typeof opts.pokerHydrateChatSnapshotsFromDisk === "function" ? opts.pokerHydrateChatSnapshotsFromDisk : function () {};
  var paintGeneralFromMemoryBeforeFetch = typeof opts.paintGeneralFromMemoryBeforeFetch === "function" ? opts.paintGeneralFromMemoryBeforeFetch : function () {};
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var loadAdminsOnline = typeof opts.loadAdminsOnline === "function" ? opts.loadAdminsOnline : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var updateUnreadDots = typeof opts.updateUnreadDots === "function" ? opts.updateUnreadDots : function () {};
  var mountChatComposer = typeof opts.mountChatComposer === "function" ? opts.mountChatComposer : function () {};
  var syncChatInertForIosAccessory = typeof opts.syncChatInertForIosAccessory === "function" ? opts.syncChatInertForIosAccessory : function () {};
  var scheduleSyncChatScrollBottomButtons = typeof opts.scheduleSyncChatScrollBottomButtons === "function" ? opts.scheduleSyncChatScrollBottomButtons : function () {};
  var pokerUpdateChatDmFocusFromUiState = typeof opts.pokerUpdateChatDmFocusFromUiState === "function" ? opts.pokerUpdateChatDmFocusFromUiState : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};
  var pokerResetChatDialogsViewportArtifacts = typeof opts.pokerResetChatDialogsViewportArtifacts === "function" ? opts.pokerResetChatDialogsViewportArtifacts : function () {};
  var scrollMainDocumentToTop = typeof opts.scrollMainDocumentToTop === "function" ? opts.scrollMainDocumentToTop : null;
  var pokerApplyAppTopPadding = typeof opts.pokerApplyAppTopPadding === "function" ? opts.pokerApplyAppTopPadding : null;
  var setChatPeerVerified = typeof opts.setChatPeerVerified === "function" ? opts.setChatPeerVerified : function () {};
  var setChatConvTitleIdText = typeof opts.setChatConvTitleIdText === "function" ? opts.setChatConvTitleIdText : function () {};
  var clearConvPeerAvatarHeader = typeof opts.clearConvPeerAvatarHeader === "function" ? opts.clearConvPeerAvatarHeader : function () {};
  var syncChatConvGroupAddMembersBtn = typeof opts.syncChatConvGroupAddMembersBtn === "function" ? opts.syncChatConvGroupAddMembersBtn : function () {};
  var pokerPrefetchDiskPeersWarmup = typeof opts.pokerPrefetchDiskPeersWarmup === "function" ? opts.pokerPrefetchDiskPeersWarmup : function () {};
  var updateClubChatPreview = typeof opts.updateClubChatPreview === "function" ? opts.updateClubChatPreview : null;
  var updateAdminShiftOnline = typeof opts.updateAdminShiftOnline === "function" ? opts.updateAdminShiftOnline : function () {};
  var getInlineChatHeaderTopOffsetPx = typeof opts.getInlineChatHeaderTopOffsetPx === "function" ? opts.getInlineChatHeaderTopOffsetPx : function () { return "0px"; };
  var refreshChatSelfPinBars = typeof opts.refreshChatSelfPinBars === "function" ? opts.refreshChatSelfPinBars : function () {};
  var pokerFlushBottomNavAndViewportAfterChatChrome = typeof opts.pokerFlushBottomNavAndViewportAfterChatChrome === "function" ? opts.pokerFlushBottomNavAndViewportAfterChatChrome : null;
  var closeSwitcherDropdown = typeof opts.closeSwitcherDropdown === "function" ? opts.closeSwitcherDropdown : function () {};

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

function setTab(tab) {
  pokerPushOpenTraceTransition("setTab-call", String(tab || ""));
  if (tab === "dialogs") {
    try {
      var dialogsIntentAt = Number(window.__pokerChatDialogOpenIntentAt || 0);
      var dialogsIntentPeer = String(window.__pokerChatDialogOpenIntentPeer || "");
      var dialogsIntentFresh = !!(dialogsIntentAt && Date.now() - dialogsIntentAt < 3500);
      var dialogsConvVisible = !!(getConvView() && !getConvView().classList.contains("chat-conv-view--hidden"));
      if ((getChatWithUserId() || dialogsIntentPeer) && (dialogsConvVisible || dialogsIntentFresh)) {
        pokerPushOpenDebug("setTab-dialogs-open-intent-blocked", String(getChatWithUserId() || dialogsIntentPeer || ""));
        if (!getChatWithUserId() && dialogsIntentPeer) setChatWithUserId(normalizePeerIdForChat(dialogsIntentPeer));
        setChatActiveTab("personal");
        tab = "personal";
      }
    } catch (eSetTabDialogsOpenIntent) {}
  }
  if (tab === "dialogs") {
    try {
      var pendingDialogsDirect = window.__pendingOpenChatPersonalFromDeepLink;
      var pendingDialogsPeer =
        pendingDialogsDirect && pendingDialogsDirect.userId != null
          ? String(pendingDialogsDirect.userId).trim()
          : "";
      if (pendingDialogsPeer) {
        pokerPushOpenDebug("setTab-dialogs-pending-blocked", pendingDialogsPeer);
        window.__pokerForcePushDmPeer = normalizePeerIdForChat(pendingDialogsPeer);
        window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
        window.__pokerForceAllowPendingPushConvOpen = true;
        try {
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) {
            return;
          }
          if (typeof pokerOpenResolvedChatPeer === "function" &&
              pokerOpenResolvedChatPeer(pendingDialogsPeer, pendingDialogsDirect.userName || pendingDialogsPeer)) {
            return;
          }
          if (typeof pokerOpenChatPeerDirectFallback === "function" &&
              pokerOpenChatPeerDirectFallback(pendingDialogsPeer, pendingDialogsDirect.userName || pendingDialogsPeer)) {
            return;
          }
          if (typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
              pokerOpenPendingPushDmWithoutContacts(pendingDialogsPeer, pendingDialogsDirect.userName || pendingDialogsPeer)) {
            return;
          }
          if (typeof pokerOpenPushDmHard === "function") {
            pokerOpenPushDmHard(pendingDialogsPeer, pendingDialogsDirect.userName || pendingDialogsPeer);
            return;
          }
        } finally {
          window.__pokerForceAllowPendingPushConvOpen = false;
        }
      }
    } catch (eSetTabDialogsPending) {}
  }
  setChatActiveTab(tab);
  closeSwitcherDropdown();
  /* Раньше setTab("dialogs") только прятал getDialogsView() первой строкой — список диалогов не показывался; chatRefresh дополнял showDialogs(), что ломало общий/админ таб после setTab("general"). */
  if (tab === "dialogs") {
    pokerPushOpenSetCaller("setTab:dialogs");
    showDialogs();
    return;
  }
  if (tab === "personal" || tab === "general") {
    try {
      if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
        return;
      }
    } catch (eTabPending) {}
  }
  if (getDialogsView()) getDialogsView().classList.add("chat-dialogs-view--hidden");
  if (tab === "general") {
    setChatThreadChromeOpen(true);
    if (getGeneralView()) { getGeneralView().classList.remove("chat-general-view--hidden"); getGeneralView().style.display = ""; }
    if (getPersonalView()) getPersonalView().classList.add("chat-personal-view--hidden");
    if (getAdminsView()) getAdminsView().classList.add("chat-admins-view--hidden");
    window.chatGeneralUnread = false;
    setScrollGeneralToBottomOnNextRender(true);
    try {
      pokerHydrateChatSnapshotsFromDisk();
    } catch (eHydTabG) {}
    /* scrollTop до renderGeneralMessages даёт ложный max (старый/пустой DOM) и дёрганье после fetch */
    try {
      window.__pokerGeneralPollRev = "";
    } catch (ePollTabG) {}
    paintGeneralFromMemoryBeforeFetch();
    loadGeneral();
  } else if (tab === "personal") {
    if (!getChatWithUserId()) {
      try {
        var pendingPersonalDirect = window.__pendingOpenChatPersonalFromDeepLink;
        var pendingPersonalDirectPeer =
          pendingPersonalDirect && pendingPersonalDirect.userId != null
            ? String(pendingPersonalDirect.userId).trim()
            : "";
        if (pendingPersonalDirectPeer) {
          setChatWithUserId(normalizePeerIdForChat(pendingPersonalDirectPeer));
          if (!getChatWithUserName()) setChatWithUserName(pendingPersonalDirect.userName || pendingPersonalDirectPeer);
        }
        var pendingPersonalPeer = pokerGetActivePushDmTarget();
        if (!getChatWithUserId() && pendingPersonalPeer) {
          setChatWithUserId(normalizePeerIdForChat(pendingPersonalPeer));
          if (!getChatWithUserName()) setChatWithUserName(pendingPersonalPeer);
        }
      } catch (eTabPersonalPending) {}
    }
    if (!getChatWithUserId()) {
      pokerPushOpenTraceTransition("setTab-personal-no-with", "");
      try {
        var pendingPersonalRetry = window.__pendingOpenChatPersonalFromDeepLink;
        var pendingPersonalRetryPeer =
          pendingPersonalRetry && pendingPersonalRetry.userId != null
            ? String(pendingPersonalRetry.userId).trim()
            : "";
        if (pendingPersonalRetryPeer) {
          pokerPushOpenDebug("setTab-personal-direct-reroute", pendingPersonalRetryPeer);
          if (typeof pokerOpenPushDmHard === "function" &&
              pokerOpenPushDmHard(
                pendingPersonalRetryPeer,
                pendingPersonalRetry.userName || pendingPersonalRetryPeer,
                pendingPersonalRetry.peerP21Id,
                pendingPersonalRetry.avatar || pendingPersonalRetry.peerAvatar
              )) {
            return;
          }
        }
      } catch (eTabPersonalDirectReroute) {}
      pokerPushOpenSetCaller("setTab:personal-no-with");
      showDialogs();
      updateChatHeaderStats();
      updateUnreadDots();
      return;
    }
    if (getGeneralView()) { getGeneralView().classList.add("chat-general-view--hidden"); getGeneralView().style.display = "none"; }
    if (getPersonalView()) getPersonalView().classList.remove("chat-personal-view--hidden");
    if (getAdminsView()) getAdminsView().classList.add("chat-admins-view--hidden");
    if (getConvView() && !getConvView().classList.contains("chat-conv-view--hidden")) setChatThreadChromeOpen(true);
    setScrollPersonalToBottomOnNextRender(true);
    if (!window.__pokerSuppressSetTabPersonalLoad) loadMessages();
  } else if (tab === "admins") {
    setChatThreadChromeOpen(false);
    if (getGeneralView()) { getGeneralView().classList.add("chat-general-view--hidden"); getGeneralView().style.display = "none"; }
    if (getPersonalView()) getPersonalView().classList.add("chat-personal-view--hidden");
    if (getAdminsView()) getAdminsView().classList.remove("chat-admins-view--hidden");
    loadAdminsOnline();
  }
  if (tab === "personal") window.chatPersonalUnread = false;
  if (tab === "general") {
    mountChatComposer("general");
  } else if (tab === "admins") {
    mountChatComposer("detached");
  } else if (tab === "personal" && getChatWithUserId()) {
    if (getConvView() && !getConvView().classList.contains("chat-conv-view--hidden")) mountChatComposer("personal");
    else mountChatComposer("detached");
  }
  updateChatHeaderStats();
  updateUnreadDots();
  syncChatInertForIosAccessory();
  try {
    scheduleSyncChatScrollBottomButtons();
  } catch (eSbTab) {}
  try {
    pokerUpdateChatDmFocusFromUiState();
  } catch (eDmTab) {}
  pokerChatRefreshLongPollTargets();
}
function showDialogs() {
  var callerLabel = pokerPushOpenConsumeCaller();
  if (callerLabel) window.__pokerLastShowDialogsCaller = callerLabel;
  try {
    pokerPushOpenStateDebug("showDialogs-enter", callerLabel ? "src=" + callerLabel : "");
  } catch (eShowDialogsDbg0) {}
  try {
    var recentDialogOpenAt = Number(window.__pokerChatDialogOpenIntentAt || 0);
    var recentDialogOpenPeer = String(window.__pokerChatDialogOpenIntentPeer || "");
    var isBackFromChatChrome = callerLabel === "conv-back-btn" || callerLabel === "general-back-btn";
    var recentOpenAge = recentDialogOpenAt ? Date.now() - recentDialogOpenAt : Infinity;
    var recentOpenFresh = !!(recentDialogOpenAt && recentOpenAge < 5000);
    if (
      recentOpenFresh &&
      recentDialogOpenPeer &&
      (!isBackFromChatChrome || recentOpenAge < 700)
    ) {
      window.__pokerLastShowDialogsReason = isBackFromChatChrome ? "ignored-recent-open-back" : "ignored-recent-open";
      pokerPushOpenDebug("showDialogs-recent-open-ignored", recentDialogOpenPeer);
      setChatActiveTab("personal");
      if (!getChatWithUserId()) setChatWithUserId(normalizePeerIdForChat(recentDialogOpenPeer));
      return;
    }
  } catch (eRecentOpenBack) {}
  var pendingPeerDialogsCommit = "";
  try {
    var pendingDirectDlg = window.__pendingOpenChatPersonalFromDeepLink;
    var pendingDirectPeerDlg =
      pendingDirectDlg && pendingDirectDlg.userId != null ? String(pendingDirectDlg.userId).trim() : "";
    if (pendingDirectPeerDlg) {
      window.__pokerLastShowDialogsReason = "pending-direct";
      pokerPushOpenDebug("showDialogs-direct-blocked", pendingDirectPeerDlg);
      setChatActiveTab("personal");
      if (!getChatWithUserId()) setChatWithUserId(normalizePeerIdForChat(pendingDirectPeerDlg));
      if (!getChatWithUserName()) setChatWithUserName(pendingDirectDlg.userName || pendingDirectPeerDlg);
      if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
          window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) {
        return;
      }
    }
    var pendingPeerDlgHard = pokerGetActivePushDmTarget();
    pendingPeerDialogsCommit = pendingPeerDlgHard || "";
    window.__pokerLastShowDialogsReason = pendingPeerDlgHard ? "pending-hard" : "";
    if (pendingPeerDlgHard) {
      pokerPushOpenDebug("showDialogs-hard-blocked", pendingPeerDlgHard);
      if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) return;
    }
    var forcedPeerDlg = window.__pokerForcePushDmPeer;
    var forcedUntilDlg = Number(window.__pokerForcePushDmPeerUntil || 0);
    if (
      forcedPeerDlg &&
      forcedUntilDlg > Date.now() &&
      typeof window.chatOpenConvFromDialogs === "function"
    ) {
      window.__pokerLastShowDialogsReason = "forced-reroute";
      pokerPushOpenDebug("showDialogs-blocked", forcedPeerDlg);
      window.chatOpenConvFromDialogs(forcedPeerDlg, forcedPeerDlg);
      return;
    }
  } catch (eForceDialogs) {}
  try {
    if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
      window.__pokerLastShowDialogsReason = "flush-pending";
      return;
    }
  } catch (eDlgPending) {}
  if (pendingPeerDialogsCommit) {
    window.__pokerLastShowDialogsReason = "commit-blocked";
    pokerPushOpenDebug("showDialogs-commit-blocked", pendingPeerDialogsCommit);
    return;
  }
  /* После переписки+клавиатуры blur/onChatInputBlur иногда не успевает снять классы (или фокус ещё в поле) —
     таббар остаётся в «режиме клавиатуры» / с залипшим visualViewport. Сбрасываем всегда при выходе на список. */
  try {
    window.__pokerLastShowDialogsReason = "commit";
    pokerPushOpenTraceTransition("showDialogs-commit", "");
    if (getChatComposerEl() && typeof getChatComposerEl().blur === "function") getChatComposerEl().blur();
    var findDlgBlur = document.getElementById("chatFindByIdInputDialogs");
    if (findDlgBlur && typeof findDlgBlur.blur === "function") findDlgBlur.blur();
  } catch (eDlgBlur) {}
  try {
    if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
      window.__pokerFinalizeChatKeyboardDismiss();
    } else {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
        window.__pokerClearChatKeyboardViewportState();
      }
      if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
        window.__pokerChatDetachVisualViewportListeners();
      }
      if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
    }
  } catch (eDlgKb) {}
  try {
    if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
  } catch (eDlgScr) {}
  try {
    pokerResetChatDialogsViewportArtifacts();
  } catch (eDlgReset) {}
  setChatActiveTab("dialogs");
  setChatThreadChromeOpen(false);
  setChatWithUserId(null);
  setChatPeerVerified(false);
  setChatPeerTypingActive(false);
  setChatWithUserName(null);
  if (getConvTitle()) getConvTitle().textContent = "";
  setChatConvTitleIdText("");
  clearConvPeerAvatarHeader();
  syncChatConvGroupAddMembersBtn();
  if (getDialogsView()) getDialogsView().classList.remove("chat-dialogs-view--hidden");
  if (getGeneralView()) getGeneralView().classList.add("chat-general-view--hidden");
  if (getPersonalView()) getPersonalView().classList.add("chat-personal-view--hidden");
  if (getListView()) getListView().classList.add("chat-list-view--hidden");
  if (getConvView()) getConvView().classList.add("chat-conv-view--hidden");
  if (getGeneralView()) getGeneralView().style.display = "none";
  /* До сети: превью клуба из RAM или сразу с диска (иначе строка «Главный чат» пуста до loadContacts). */
  try {
    pokerHydrateChatSnapshotsFromDisk({ generalOnly: true });
  } catch (eHydDlg) {}
  setTimeout(function () {
    try {
      pokerPrefetchDiskPeersWarmup();
    } catch (eWarmDlg) {}
  }, 350);
  if (window._chatGeneralCache && window._chatGeneralCache.messages && typeof updateClubChatPreview === "function") updateClubChatPreview(window._chatGeneralCache.messages);
  loadContacts();
  setTimeout(function () {
    try {
      loadGeneral();
    } catch (eLoadGenDlg) {}
  }, 0);
  // На некоторых переходах между экранами (в т.ч. download) браузер может
  // сохранить inline-трансформы/позиции для абсолютных элементов.
  // Принудительно возвращаем верхнюю панель общего чата в корректное место.
  try {
    var genHeader = document.querySelector('#chatGeneralView .chat-general-header');
    if (genHeader) {
      genHeader.style.top = getInlineChatHeaderTopOffsetPx();
      genHeader.style.left = "0";
      genHeader.style.right = "0";
      genHeader.style.transform = "none";
      genHeader.style.width = "100%";
      genHeader.style.maxWidth = "none";
    }
  } catch (err) {}
  updateAdminShiftOnline();
  updateChatHeaderStats();
  updateUnreadDots();
  mountChatComposer("detached");
  syncChatInertForIosAccessory();
  try {
    scheduleSyncChatScrollBottomButtons();
  } catch (eSbDlg) {}
  try {
    refreshChatSelfPinBars();
  } catch (ePinDlg) {}
  try {
    if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
  } catch (eDlgFlush) {}
  try {
    setTimeout(function () {
      if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
    }, 120);
  } catch (eDlgFlush2) {}
  try {
    setTimeout(function () {
      if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
    }, 320);
  } catch (eDlgFlush3) {}
  try {
    pokerUpdateChatDmFocusFromUiState();
  } catch (eDmDlg) {}
  pokerChatRefreshLongPollTargets();
}

  return {
    setTab: setTab,
    showDialogs: showDialogs,
  };
}
