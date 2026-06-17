// Chat lifecycle: chat globals, initChat, bootstrap, and chat push refresh hooks.

// Чат: общий + личные сообщения

var chatPollInterval = null;
var chatIsEditingMessage = false;
window.chatGeneralUnread = false;
window.chatPersonalUnread = false;
var chatWithUserId = null;
var chatWithUserPokerPlusVerified = false;
/** Один кадр перед сетью — достаточно для отрисовки optimistic-пузыря; два кадра добавляли лишнюю микрозадержку. */
function pokerChatRunAfterPaint(fn) {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 0);
  }
}
var personalMessagesCache = {};
var personalMessagesCacheMeta = {};
var personalHasMoreBeforeByPeer = {};
var generalHasMoreBefore = false;
var chatWithUserName = null;
var chatWithPeerAvatarUrl = null;
/* "dialogs" = список чатов; иначе loadGeneral() перерисовывал скрытый общий чат и сбрасывал scroll */
var chatActiveTab = "dialogs";
var chatIsAdmin = false;
/** Доступ к главному чату: open | member | pending | need_apply (с сервера) */
var clubChatAccess = "open";
/** Для админа: сколько заявок в очереди (бейдж у «Главный чат») */
window.chatClubPendingReviewCount = 0;
var chatClubAdminLongPressTimer = null;
var chatListenersAttached = false;

function initChat() {
  var dialogsView = document.getElementById("chatDialogsView");
  function updateAdminShiftOnline() {
    if (typeof pokerUpdateChatAdminShiftOnline === "function") pokerUpdateChatAdminShiftOnline(dialogsView);
  }
  var dialogsGuestGate = document.getElementById("chatDialogsGuestGate");
  var dialogsGuestAuthBtn = document.getElementById("chatDialogsGuestAuthBtn");
  var dialogsPrimaryBlock = document.getElementById("chatDialogsPrimaryBlock");
  var generalView = document.getElementById("chatGeneralView");
  var personalView = document.getElementById("chatPersonalView");
  var adminsView = document.getElementById("chatAdminsView");
  var generalMessages = document.getElementById("chatGeneralMessages");
  var chatSharedComposerEl = document.getElementById("chatSharedComposer");
  var chatComposerEl = chatSharedComposerEl;
  var chatGeneralComposerMount = document.getElementById("chatGeneralComposerMount");
  var chatPersonalComposerMount = document.getElementById("chatPersonalComposerMount");
  var chatComposerPool = document.getElementById("chatComposerPool");
  var chatGeneralInputArea = document.getElementById("chatGeneralInputArea");
  var chatPersonalInputArea = document.getElementById("chatPersonalInputArea");
  var chatGeneralComposerEl = null;
  var chatPersonalComposerEl = null;
  var chatGeneralKeyboardDebugEl = document.getElementById("chatGeneralKeyboardDebug");
  var chatPersonalKeyboardDebugEl = document.getElementById("chatPersonalKeyboardDebug");
  function ensureChatKeyboardDebugFloatingPanel() {
    return null;
  }
  var chatIosComposeOverlay = document.getElementById("chatIosComposeOverlay");
  var chatIosComposeOverlayBackdrop = document.getElementById("chatIosComposeOverlayBackdrop");
  var chatIosComposeOverlayClose = document.getElementById("chatIosComposeOverlayClose");
  var chatIosComposeOverlayCancel = document.getElementById("chatIosComposeOverlayCancel");
  var chatIosComposeOverlaySend = document.getElementById("chatIosComposeOverlaySend");
  var chatIosComposeOverlayTextarea = document.getElementById("chatIosComposeOverlayTextarea");
  var chatIosComposeOverlayTitle = document.getElementById("chatIosComposeOverlayTitle");
  var chatIosComposeOverlayMode = "";
  var chatIosComposeOverlayOpening = false;
  var chatComposerDrafts = { general: "", personal: "" };
  var chatComposerMounted = "detached";
  var chatTmaIosComposerOverlayHost = null;
  var chatTmaIosComposerOverlaySyncQueued = false;
  var chatTmaIosComposerOverlayActiveKey = null;
  var chatTmaIosComposerOverlayViewportHandler = null;
  var chatTmaIosComposerOverlayViewportRaf = null;
  var chatTmaIosComposerOverlayLastTop = null;
  var chatTmaIosComposerOverlayLastInnerHeight = 0;
  var chatComposerSendRuntime = null;
  function updateGeneralSendBtnIcon() {
    if (chatComposerSendRuntime && typeof chatComposerSendRuntime.updateGeneralSendBtnIcon === "function") {
      return chatComposerSendRuntime.updateGeneralSendBtnIcon();
    }
  }
  function updatePersonalSendBtnIcon() {
    if (chatComposerSendRuntime && typeof chatComposerSendRuntime.updatePersonalSendBtnIcon === "function") {
      return chatComposerSendRuntime.updatePersonalSendBtnIcon();
    }
  }
  function resizeChatTextarea(ta) {
    if (chatComposerSendRuntime && typeof chatComposerSendRuntime.resizeChatTextarea === "function") {
      return chatComposerSendRuntime.resizeChatTextarea(ta);
    }
    if (ta && typeof pokerAutosizeTextarea === "function") {
      pokerAutosizeTextarea(ta, { maxHeight: 140, minHeight: 44, measureValue: ta.value });
    }
  }
  function bindChatComposerInputEvents(ta) {
    if (chatComposerSendRuntime && typeof chatComposerSendRuntime.bindChatComposerInputEvents === "function") {
      return chatComposerSendRuntime.bindChatComposerInputEvents(ta);
    }
  }
  var chatTmaIosComposerPortalStates = {
    general: chatGeneralInputArea
      ? { key: "general", area: chatGeneralInputArea, spacer: null, portaled: false }
      : null,
    personal: chatPersonalInputArea
      ? { key: "personal", area: chatPersonalInputArea, spacer: null, portaled: false }
      : null
  };
  var generalSendBtn = document.getElementById("chatGeneralSendBtn");
  var listView = document.getElementById("chatListView");
  var convView = document.getElementById("chatConvView");
  var contactsEl = document.getElementById("chatContacts");
  var findByIdInput = document.getElementById("chatFindByIdInput");
  var findByIdBtn = document.getElementById("chatFindByIdBtn");
  var findByIdInputDialogs = document.getElementById("chatFindByIdInputDialogs");
  var chatNewGroupBtn = document.getElementById("chatNewGroupBtn");
  var backBtn = document.getElementById("chatBackBtn");
  var chatGeneralBackBtn = document.getElementById("chatGeneralBackBtn");
  var chatDialogClub = document.getElementById("chatDialogClub");
  var chatHeaderAvatarRuntime = null;
  if (typeof initChatHeaderAvatarRuntime === "function") {
    var chatHeaderAvatarDeps = {};
    Object.defineProperties(chatHeaderAvatarDeps, {
      chatActiveTab: { get: function () { return chatActiveTab; } },
      chatWithUserId: { get: function () { return chatWithUserId; }, set: function (value) { chatWithUserId = value; } },
      chatWithUserPokerPlusVerified: { get: function () { return chatWithUserPokerPlusVerified; }, set: function (value) { chatWithUserPokerPlusVerified = !!value; } },
      chatWithPeerAvatarUrl: { get: function () { return chatWithPeerAvatarUrl; }, set: function (value) { chatWithPeerAvatarUrl = value; } },
      convView: { get: function () { return convView; } }
    });
    Object.assign(chatHeaderAvatarDeps, {
      peerChatIdsEqual: peerChatIdsEqual
    });
    chatHeaderAvatarRuntime = initChatHeaderAvatarRuntime(chatHeaderAvatarDeps) || {};
  }
  chatHeaderAvatarRuntime = chatHeaderAvatarRuntime || {};
  var convTitle = chatHeaderAvatarRuntime.convTitle || document.getElementById("chatConvTitle");
  var convTitleFish = chatHeaderAvatarRuntime.convTitleFish || document.getElementById("chatConvTitleFish");
  var convTitleLevel = chatHeaderAvatarRuntime.convTitleLevel || document.getElementById("chatConvTitleLevel");
  var convTitleId = chatHeaderAvatarRuntime.convTitleId || document.getElementById("chatConvTitleId");
  var convVerifiedBadge = chatHeaderAvatarRuntime.convVerifiedBadge || document.getElementById("chatConvVerifiedBadge");
  var convPeerAvatarWrap = chatHeaderAvatarRuntime.convPeerAvatarWrap || document.getElementById("chatConvPeerAvatarWrap");
  var convGroupAvatarFile = chatHeaderAvatarRuntime.convGroupAvatarFile || document.getElementById("chatConvGroupAvatarFile");
  var applyConvGroupDescription = chatHeaderAvatarRuntime.applyConvGroupDescription || function () {};
  var setChatConvTitleFish = chatHeaderAvatarRuntime.setChatConvTitleFish || function () {};
  var syncChatConvTitleMetaVisibility = chatHeaderAvatarRuntime.syncChatConvTitleMetaVisibility || function () {};
  var normalizeChatConvTitlePeerId = chatHeaderAvatarRuntime.normalizeChatConvTitlePeerId || function (peerId) { return peerId != null ? String(peerId).trim() : ""; };
  var setTextContentIfChanged = chatHeaderAvatarRuntime.setTextContentIfChanged || function (el, txt) { if (el) el.textContent = txt != null ? String(txt) : ""; };
  var scheduleChatPostRenderSync = chatHeaderAvatarRuntime.scheduleChatPostRenderSync || function (fn) { if (typeof fn === "function") setTimeout(fn, 0); };
  var updateChatHeaderStats = chatHeaderAvatarRuntime.updateChatHeaderStats || function () {};
  var rememberChatConvTitleP21Id = chatHeaderAvatarRuntime.rememberChatConvTitleP21Id || function () { return ""; };
  var resolveChatConvTitleP21Id = chatHeaderAvatarRuntime.resolveChatConvTitleP21Id || function () { return ""; };
  var setChatConvTitleIdText = chatHeaderAvatarRuntime.setChatConvTitleIdText || function () {};
  var setChatPeerVerified = chatHeaderAvatarRuntime.setChatPeerVerified || function () {};
  var getInlineChatHeaderTopOffsetPx = chatHeaderAvatarRuntime.getInlineChatHeaderTopOffsetPx || function () { return "50px"; };
  var syncConvGroupAvatarEditUi = chatHeaderAvatarRuntime.syncConvGroupAvatarEditUi || function () {};
  var applyConvPeerAvatarHeader = chatHeaderAvatarRuntime.applyConvPeerAvatarHeader || function () {};
  var clearConvPeerAvatarHeader = chatHeaderAvatarRuntime.clearConvPeerAvatarHeader || function () {};
  var getConvGroupCanChangeAvatar = chatHeaderAvatarRuntime.getConvGroupCanChangeAvatar || function () { return false; };
  var setConvGroupCanChangeAvatar = chatHeaderAvatarRuntime.setConvGroupCanChangeAvatar || function () {};
  var chatGuestGateRuntime = typeof initChatGuestGateRuntime === "function"
    ? initChatGuestGateRuntime({
        getDialogsGuestGate: function () { return dialogsGuestGate; },
        setDialogsGuestGate: function (value) { dialogsGuestGate = value; },
        dialogsGuestAuthBtn: dialogsGuestAuthBtn,
        dialogsPrimaryBlock: dialogsPrimaryBlock,
        contactsEl: contactsEl,
        findByIdInputDialogs: findByIdInputDialogs,
        chatNewGroupBtn: chatNewGroupBtn
      })
    : {};
  var syncChatWebsiteGuestGate =
    chatGuestGateRuntime && typeof chatGuestGateRuntime.syncChatWebsiteGuestGate === "function"
      ? chatGuestGateRuntime.syncChatWebsiteGuestGate
      : function () { return false; };
  var forceHideChatGuestGateForTelegram =
    chatGuestGateRuntime && typeof chatGuestGateRuntime.forceHideChatGuestGateForTelegram === "function"
      ? chatGuestGateRuntime.forceHideChatGuestGateForTelegram
      : function () { return false; };
  if (chatGuestGateRuntime && typeof chatGuestGateRuntime.bindGuestAuthButton === "function") {
    chatGuestGateRuntime.bindGuestAuthButton();
  }
  try {
    syncChatWebsiteGuestGate();
  } catch (eGuestGateInit) {}
  var messagesEl = document.getElementById("chatMessages");
  var sendBtn = document.getElementById("chatSendBtn");
  var switcherBtn = document.getElementById("chatSwitcherBtn");
  var switcherDropdown = document.getElementById("chatSwitcherDropdown");
  var switcherLabel = document.getElementById("chatSwitcherLabel");
  var switcherOptions = document.querySelectorAll(".chat-switcher-option");
  var templatesHintGeneral = document.getElementById("chatTemplatesHintGeneral");
  var templatesHintPersonal = document.getElementById("chatTemplatesHintPersonal");
  if (!generalView || !personalView || !generalMessages) return;
  if (!chatComposerEl || !chatGeneralComposerMount || !chatPersonalComposerMount || !chatComposerPool) return;
  var chatKeyboardDebugRuntime = typeof initChatKeyboardDebugRuntime === "function"
    ? initChatKeyboardDebugRuntime({
        getChatActiveTab: function () { return chatActiveTab; },
        getGeneralView: function () { return generalView; },
        getConvView: function () { return convView; },
        getChatGeneralInputArea: function () { return chatGeneralInputArea; },
        getChatPersonalInputArea: function () { return chatPersonalInputArea; },
        getChatGeneralComposerEl: function () { return chatGeneralComposerEl; },
        getChatPersonalComposerEl: function () { return chatPersonalComposerEl; },
        getChatComposerEl: function () { return chatComposerEl; },
        setChatComposerEl: function (value) { chatComposerEl = value; },
        getGeneralMessages: function () { return generalMessages; },
        getMessagesEl: function () { return messagesEl; },
        getChatGeneralKeyboardDebugEl: function () { return chatGeneralKeyboardDebugEl; },
        getChatPersonalKeyboardDebugEl: function () { return chatPersonalKeyboardDebugEl; },
        getVisibleMessagesEl: function () { return typeof getVisibleMessagesEl === "function" ? getVisibleMessagesEl() : null; },
        isTelegramChatRuntime: function () { return typeof isTelegramChatRuntime === "function" && isTelegramChatRuntime(); },
        pokerPwaStandaloneForKeyboardInset: function () { return typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset(); },
        isIosLikeForChatViewport: function () { return typeof isIosLikeForChatViewport === "function" && isIosLikeForChatViewport(); },
        bindChatComposerKeyboardEvents: function (target) { if (typeof bindChatComposerKeyboardEvents === "function") bindChatComposerKeyboardEvents(target); },
        markPwaIosChatFocusActivation: function (target, label, cooldownMs) { return typeof markPwaIosChatFocusActivation === "function" && markPwaIosChatFocusActivation(target, label, cooldownMs); },
        onChatInputFocus: function (target) { if (typeof onChatInputFocus === "function") onChatInputFocus(target); }
      })
    : {};
  var shouldShowChatKeyboardDebugPanel = chatKeyboardDebugRuntime.shouldShowChatKeyboardDebugPanel || function () { return false; };
  var isPokerIosPwaKeyboardRuntime = chatKeyboardDebugRuntime.isPokerIosPwaKeyboardRuntime || function () { return false; };
  var getActiveChatInputArea = chatKeyboardDebugRuntime.getActiveChatInputArea || function () { return null; };
  var getChatKeyboardDebugSnapshot = chatKeyboardDebugRuntime.getChatKeyboardDebugSnapshot || function () { return null; };
  var logChatKeyboardDebug = chatKeyboardDebugRuntime.logChatKeyboardDebug || function () {};
  var pumpChatKeyboardDebugSnapshot = chatKeyboardDebugRuntime.pumpChatKeyboardDebugSnapshot || function () {};
  var installChatKeyboardDebugObservers = chatKeyboardDebugRuntime.installChatKeyboardDebugObservers || function () {};

  function ensureTelegramIosChatComposerOverlayHost() {
    return null;
  }
  function syncTelegramIosChatComposerSpacerHeight(state) {
    if (!state || !state.spacer || !state.area) return;
    try {
      var rect = state.area.getBoundingClientRect();
      var h = Math.max(56, Math.round(rect && rect.height ? rect.height : state.area.offsetHeight || 0));
      state.spacer.style.height = h + "px";
    } catch (eTmaSpacerH) {}
  }
  function portalTelegramIosChatComposerState(state) {
    restoreTelegramIosChatComposerState(state);
  }
  function restoreTelegramIosChatComposerState(state) {
    if (!state || !state.area || !state.portaled) return;
    try {
      if (state.spacer && state.spacer.parentNode) {
        state.spacer.parentNode.insertBefore(state.area, state.spacer);
        state.spacer.parentNode.removeChild(state.spacer);
      }
    } catch (eTmaRestoreArea) {}
    try {
      state.area.removeAttribute("data-chat-overlay-mode");
    } catch (eTmaRestoreAttr) {}
    state.portaled = false;
  }
  function setTelegramIosChatComposerOverlayClasses(active) {
    try {
      document.documentElement.classList.remove("chat-tma-ios-composer-overlay-active");
      document.body.classList.remove("chat-tma-ios-composer-overlay-active");
      var host = document.getElementById("chatTmaIosComposerOverlay");
      if (host && host.parentNode) host.parentNode.removeChild(host);
    } catch (eTmaOverlayCls) {}
  }
  function clearTelegramIosChatComposerOverlayViewportPosition() {
    chatTmaIosComposerOverlayLastTop = null;
    chatTmaIosComposerOverlayLastInnerHeight = 0;
  }
  function syncTelegramIosChatComposerOverlayViewportPosition() {
    clearTelegramIosChatComposerOverlayViewportPosition();
  }
  function scheduleTelegramIosChatComposerOverlayViewportPositionSync() {
    if (chatTmaIosComposerOverlayViewportRaf != null) return;
    var raf = window.requestAnimationFrame || function (fn) {
      return setTimeout(fn, 0);
    };
    chatTmaIosComposerOverlayViewportRaf = raf(function () {
      chatTmaIosComposerOverlayViewportRaf = null;
      syncTelegramIosChatComposerOverlayViewportPosition();
    });
  }
  function detachTelegramIosChatComposerOverlayViewportSync() {
    try {
      if (chatTmaIosComposerOverlayViewportRaf != null) {
        (window.cancelAnimationFrame || clearTimeout)(chatTmaIosComposerOverlayViewportRaf);
        chatTmaIosComposerOverlayViewportRaf = null;
      }
    } catch (eTmaOverlayRafOff) {}
    chatTmaIosComposerOverlayViewportHandler = null;
    clearTelegramIosChatComposerOverlayViewportPosition();
  }
  function attachTelegramIosChatComposerOverlayViewportSync() {
    detachTelegramIosChatComposerOverlayViewportSync();
  }
  function getTelegramIosChatComposerOverlayTargetKey() {
    if (String(document.body.getAttribute("data-view") || "") !== "chat") return null;
    if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
      return "general";
    }
    if (
      chatActiveTab === "personal" &&
      convView &&
      !convView.classList.contains("chat-conv-view--hidden") &&
      personalView &&
      !personalView.classList.contains("chat-personal-view--hidden")
    ) {
      return "personal";
    }
    return null;
  }
  function syncTelegramIosChatComposerOverlayMount() {
    restoreTelegramIosChatComposerState(chatTmaIosComposerPortalStates.general);
    restoreTelegramIosChatComposerState(chatTmaIosComposerPortalStates.personal);
    chatTmaIosComposerOverlayActiveKey = null;
    setTelegramIosChatComposerOverlayClasses(false);
    try {
      clearChatMessagesKeyboardPad();
      clearChatComposerDockClass();
      stripChatInputAreaTransforms();
      setChatKeyboardOpenClasses(false);
    } catch (eTmaOverlayMount) {}
  }
  function scheduleTelegramIosChatComposerOverlaySync() {
    if (chatTmaIosComposerOverlaySyncQueued) return;
    chatTmaIosComposerOverlaySyncQueued = true;
    var raf = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 0);
    };
    raf(function () {
      chatTmaIosComposerOverlaySyncQueued = false;
      syncTelegramIosChatComposerOverlayMount();
    });
  }
  function syncTelegramIosChatComposerOverlayFromArea(area) {}
  try {
    if (typeof ResizeObserver !== "undefined") {
      var tmaComposerOverlayResizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry && entry.target) syncTelegramIosChatComposerOverlayFromArea(entry.target);
        });
      });
      if (chatGeneralInputArea) tmaComposerOverlayResizeObserver.observe(chatGeneralInputArea);
      if (chatPersonalInputArea) tmaComposerOverlayResizeObserver.observe(chatPersonalInputArea);
    }
  } catch (eTmaRo) {}
  function shouldUseDedicatedTelegramIosChatComposer() {
    return isTelegramChatRuntime();
  }
  function ensureTelegramIosMinimalComposerBlock(area, mount, sendButton) {
    if (isTelegramChatRuntime()) return;
    if (!area || !mount || !sendButton) return;
    var shell = area.querySelector(".chat-tma-ios-minimal-block");
    if (!shell) {
      shell = document.createElement("div");
      shell.className = "chat-tma-ios-minimal-block";
      area.appendChild(shell);
    }
    var composerSlot = shell.querySelector(".chat-tma-ios-minimal-block__composer");
    if (!composerSlot) {
      composerSlot = document.createElement("div");
      composerSlot.className = "chat-tma-ios-minimal-block__composer";
      shell.appendChild(composerSlot);
    }
    var actionSlot = shell.querySelector(".chat-tma-ios-minimal-block__action");
    if (!actionSlot) {
      actionSlot = document.createElement("div");
      actionSlot.className = "chat-tma-ios-minimal-block__action";
      shell.appendChild(actionSlot);
    }
    if (!composerSlot.contains(mount)) composerSlot.appendChild(mount);
    if (!actionSlot.contains(sendButton)) actionSlot.appendChild(sendButton);
    area.classList.add("chat-input-area--tma-minimal-block");
    var legacyWrap = area.querySelector(".chat-input-wrap");
    if (legacyWrap) legacyWrap.classList.add("chat-input-wrap--tma-hidden");
  }
  function createDedicatedChatComposer(id, placeholder, ariaLabel) {
    if (!chatSharedComposerEl) return null;
    var ta = chatSharedComposerEl.cloneNode(false);
    ta.id = id;
    ta.value = "";
    ta.placeholder = placeholder || "";
    if (ariaLabel) ta.setAttribute("aria-label", ariaLabel);
    else ta.removeAttribute("aria-label");
    ta.removeAttribute("tabindex");
    return ta;
  }
  function ensureDirectChatComposers() {
    if (!chatGeneralComposerEl) {
      chatGeneralComposerEl = createDedicatedChatComposer("chatGeneralComposer", "Сообщение в общий чат...", "Сообщение в общий чат");
      if (chatGeneralComposerEl && chatGeneralComposerMount && !chatGeneralComposerMount.contains(chatGeneralComposerEl)) {
        chatGeneralComposerMount.appendChild(chatGeneralComposerEl);
      }
      try {
        if (typeof bindChatComposerInputEvents === "function") bindChatComposerInputEvents(chatGeneralComposerEl);
        if (typeof bindChatComposerKeyboardEvents === "function") bindChatComposerKeyboardEvents(chatGeneralComposerEl);
      } catch (eBindGenComposer) {}
    }
    if (!chatPersonalComposerEl) {
      chatPersonalComposerEl = createDedicatedChatComposer("chatPersonalComposer", "Сообщение...", "");
      if (chatPersonalComposerEl && chatPersonalComposerMount && !chatPersonalComposerMount.contains(chatPersonalComposerEl)) {
        chatPersonalComposerMount.appendChild(chatPersonalComposerEl);
      }
      try {
        if (typeof bindChatComposerInputEvents === "function") bindChatComposerInputEvents(chatPersonalComposerEl);
        if (typeof bindChatComposerKeyboardEvents === "function") bindChatComposerKeyboardEvents(chatPersonalComposerEl);
      } catch (eBindPersonalComposer) {}
    }
    try {
      if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
    } catch (eUpdGenComposer) {}
    try {
      if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
    } catch (eUpdPersonalComposer) {}
    return !!(chatGeneralComposerEl && chatPersonalComposerEl);
  }
  function ensureTelegramDedicatedChatComposers() {
    if (!isTelegramChatRuntime()) return false;
    if (!ensureDirectChatComposers()) return false;
    try {
      if (chatComposerPool) {
        chatComposerPool.setAttribute("hidden", "hidden");
        chatComposerPool.setAttribute("aria-hidden", "true");
      }
      if (chatSharedComposerEl) {
        chatSharedComposerEl.value = "";
        chatSharedComposerEl.blur();
        chatSharedComposerEl.disabled = true;
        chatSharedComposerEl.hidden = true;
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("aria-hidden", "true");
        chatSharedComposerEl.style.setProperty("display", "none", "important");
        chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
      }
    } catch (eTgEnsurePool) {}
    return !!(chatGeneralComposerEl && chatPersonalComposerEl);
  }
  if (shouldUseDedicatedTelegramIosChatComposer()) {
    ensureTelegramDedicatedChatComposers();
    ensureTelegramIosMinimalComposerBlock(chatGeneralInputArea, chatGeneralComposerMount, generalSendBtn);
    ensureTelegramIosMinimalComposerBlock(chatPersonalInputArea, chatPersonalComposerMount, sendBtn);
  }
  function getDirectTelegramChatComposer(mode) {
    if (mode === "general") {
      return chatGeneralComposerEl || null;
    }
    if (mode === "personal") {
      return chatPersonalComposerEl || null;
    }
    return null;
  }
  function getDirectChatComposer(mode) {
    if (!shouldUseDedicatedTelegramIosChatComposer()) return null;
    if (!ensureDirectChatComposers()) return null;
    if (mode === "general") return chatGeneralComposerEl || null;
    if (mode === "personal") return chatPersonalComposerEl || null;
    return chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl;
  }
  var chatKeyboardOverlay = typeof initChatKeyboardOverlay === "function" ? initChatKeyboardOverlay({
    chatIosComposeOverlay: chatIosComposeOverlay,
    chatIosComposeOverlayBackdrop: chatIosComposeOverlayBackdrop,
    chatIosComposeOverlayClose: chatIosComposeOverlayClose,
    chatIosComposeOverlayCancel: chatIosComposeOverlayCancel,
    chatIosComposeOverlaySend: chatIosComposeOverlaySend,
    chatIosComposeOverlayTextarea: chatIosComposeOverlayTextarea,
    chatIosComposeOverlayTitle: chatIosComposeOverlayTitle,
    chatGeneralInputArea: chatGeneralInputArea,
    chatPersonalInputArea: chatPersonalInputArea,
    chatGeneralComposerEl: chatGeneralComposerEl,
    chatPersonalComposerEl: chatPersonalComposerEl,
    chatComposerDrafts: chatComposerDrafts,
    getMode: function () { return chatIosComposeOverlayMode; },
    setMode: function (value) { chatIosComposeOverlayMode = value; },
    setOpening: function (value) { chatIosComposeOverlayOpening = !!value; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatGeneralText: function () { return getChatGeneralText(); },
    getChatPersonalText: function () { return getChatPersonalText(); },
    isTelegramChatRuntime: isTelegramChatRuntime,
    sendGeneral: function (text) { return sendGeneral(text); },
    sendMessage: function (text) { return sendMessage(text); },
  }) : {};
  var shouldUseTelegramIosComposeOverlay = chatKeyboardOverlay.shouldUseTelegramIosComposeOverlay || function () { return false; };
  var openTelegramIosComposeOverlay = chatKeyboardOverlay.openTelegramIosComposeOverlay || function () { return false; };
  var closeTelegramIosComposeOverlay = chatKeyboardOverlay.closeTelegramIosComposeOverlay || function () {};

  function forceDetachSharedChatComposerForTelegram() {
    if (!chatSharedComposerEl || !chatComposerPool) return;
    try {
      if (!chatComposerPool.contains(chatSharedComposerEl)) chatComposerPool.appendChild(chatSharedComposerEl);
    } catch (eComposerPoolMove) {}
    try {
      chatSharedComposerEl.blur();
      chatSharedComposerEl.disabled = true;
      chatSharedComposerEl.hidden = true;
      chatSharedComposerEl.value = "";
      chatSharedComposerEl.setAttribute("tabindex", "-1");
      chatSharedComposerEl.setAttribute("aria-hidden", "true");
      chatSharedComposerEl.style.setProperty("display", "none", "important");
      chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
    } catch (eComposerPoolHide) {}
  }
  function bindChatComposerAreaDirectFocus(area, mode) {
    if (!area || area.__pokerDirectComposerAreaFocusBound) return;
    if (isTelegramChatRuntime()) return;
    area.__pokerDirectComposerAreaFocusBound = true;
    function shouldIgnoreAreaFocusTarget(target) {
      if (!target || !target.closest) return false;
      return !!target.closest(
        ".chat-attach-btn, .chat-attach-dropdown, .chat-emoji-btn, .chat-send-btn, .chat-scroll-bottom-btn, .chat-reply-preview__cancel, .chat-image-preview, .chat-voice-preview, .chat-upload-progress"
      );
    }
    function primeIosPwaComposerOpenFromAreaGesture(composer, label, shouldFocus) {
      try {
        if (!composer || !isChatThreadComposerKeyboardDom(composer)) return false;
        chatComposerEl = composer;
        var nowPrime = Date.now();
        markPwaChatKeyboardOpenIntent(composer, label || "area-gesture-prime");
        markPwaChatKeyboardScrolledOpenHold(composer, label || "area-gesture-prime", 3600);
        window.__pokerChatManualFocusIntentUntil = Math.max(Number(window.__pokerChatManualFocusIntentUntil) || 0, nowPrime + 2200);
        window.__pokerChatManualFocusIntentTarget = composer;
        window.__pokerChatKeyboardFocusAtMs = nowPrime;
        window.__pokerChatKeyboardOpeningUntil = Math.max(Number(window.__pokerChatKeyboardOpeningUntil) || 0, nowPrime + 1800);
        if (shouldFocus && document.activeElement !== composer && composer.focus) {
          try {
            composer.focus({ preventScroll: true });
          } catch (ePrimeFocus1) {
            try { composer.focus(); } catch (ePrimeFocus2) {}
          }
        }
        if (markPwaIosChatFocusActivation(composer, label || "area-gesture-prime", 120)) {
          setTimeout(function () {
            try {
              if (document.activeElement === composer) onChatInputFocus(composer);
            } catch (ePrimeFocusActivate) {}
          }, 0);
        }
        return true;
      } catch (ePrimeAreaGesture) {
        return false;
      }
    }
    function focusDirectComposerFromArea(event) {
      if (String(document.body.getAttribute("data-view") || "") !== "chat") return;
      if (mode === "general" && chatActiveTab !== "general") return;
      if (mode === "personal" && chatActiveTab !== "personal") return;
      var target = event && event.target ? event.target : null;
      if (shouldIgnoreAreaFocusTarget(target)) return;
      if (!isTelegramChatRuntime()) {
        var pwaComposer =
          (area.querySelector && area.querySelector("textarea.chat-input--textarea, textarea.chat-input")) ||
          getDirectChatComposer(mode) ||
          chatSharedComposerEl;
        if (!pwaComposer) return;
        chatComposerEl = pwaComposer;
        try {
          pwaComposer.disabled = false;
          pwaComposer.hidden = false;
          pwaComposer.removeAttribute("tabindex");
          pwaComposer.removeAttribute("aria-hidden");
          pwaComposer.style.removeProperty("display");
          pwaComposer.style.removeProperty("pointer-events");
        } catch (ePwaComposerPrep) {}
        try {
          if (typeof bindChatComposerKeyboardEvents === "function") bindChatComposerKeyboardEvents(pwaComposer);
        } catch (ePwaBindKb) {}
        var isIosPwaThreadComposerArea = false;
        try {
          isIosPwaThreadComposerArea =
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport() &&
            isChatThreadComposerKeyboardDom(pwaComposer);
        } catch (ePwaAreaModeCheck) {}
        if (isIosPwaThreadComposerArea && event) {
          var evType = String(event.type || "");
          var pointerType = String(event.pointerType || "");
          var nowAreaFocus = Date.now();
          var lastAreaFocusAt = Number(window.__pokerChatPwaAreaFocusGestureAt) || 0;
          var lastAreaFocusTarget = window.__pokerChatPwaAreaFocusGestureTarget || null;
          var directComposerTap = !!(target === pwaComposer || (target && pwaComposer.contains && pwaComposer.contains(target)));
          if (evType === "pointerdown" && pointerType && pointerType !== "mouse") {
            primeIosPwaComposerOpenFromAreaGesture(pwaComposer, "area-pointerdown", !directComposerTap);
            window.__pokerChatPwaAreaFocusGestureAt = nowAreaFocus;
            window.__pokerChatPwaAreaFocusGestureTarget = pwaComposer;
            return;
          }
          if (evType === "click" && lastAreaFocusTarget === pwaComposer && nowAreaFocus - lastAreaFocusAt < 900) {
            try {
              var preventAreaClickDefault = false;
              try {
                preventAreaClickDefault =
                  !directComposerTap &&
                  document.body.classList.contains("chat-keyboard-open") &&
                  typeof window.__pokerIsChatKeyboardLayoutEffectivelyClosed === "function" &&
                  !window.__pokerIsChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true });
              } catch (ePwaAreaClickDefaultCheck) {}
              if (preventAreaClickDefault && event.preventDefault) event.preventDefault();
            } catch (ePwaAreaClickPrevent) {}
            return;
          }
          if (evType === "touchstart") {
            primeIosPwaComposerOpenFromAreaGesture(pwaComposer, "area-touchstart", !directComposerTap);
            window.__pokerChatPwaAreaFocusGestureAt = nowAreaFocus;
            window.__pokerChatPwaAreaFocusGestureTarget = pwaComposer;
            try {
              var preventAreaTouchDefault = false;
              try {
                preventAreaTouchDefault =
                  !directComposerTap &&
                  document.body.classList.contains("chat-keyboard-open") &&
                  typeof window.__pokerIsChatKeyboardLayoutEffectivelyClosed === "function" &&
                  !window.__pokerIsChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true });
              } catch (ePwaAreaTouchDefaultCheck) {}
              if (preventAreaTouchDefault && event.preventDefault) event.preventDefault();
            } catch (ePwaAreaTouchPrevent) {}
          }
        }
        if (isIosPwaThreadComposerArea && (target === pwaComposer || (target && pwaComposer.contains && pwaComposer.contains(target)))) {
          return;
        }
        try {
          if (isIosPwaThreadComposerArea) {
            if (!window.__pokerChatKeyboardFocusAtMs || Date.now() - Number(window.__pokerChatKeyboardFocusAtMs) > 260) {
              window.__pokerChatKeyboardFocusAtMs = Date.now();
            }
            window.__pokerChatKeyboardOpeningUntil = Date.now() + 1200;
            markPwaChatKeyboardOpenIntent(pwaComposer, "area-prefocus");
          }
        } catch (ePwaAreaPrefocusDock) {}
        try {
          if (pwaComposer.focus) pwaComposer.focus({ preventScroll: true });
        } catch (ePwaFocusFirst) {
          try {
            if (pwaComposer.focus) pwaComposer.focus();
          } catch (ePwaFocusSecond) {}
        }
        try {
          if (isIosPwaThreadComposerArea) {
            try {
              var ihPwaArea = window.innerHeight || 0;
              if (ihPwaArea > 200) window.__pokerChatInnerHBaseline = Math.max(Number(window.__pokerChatInnerHBaseline) || 0, ihPwaArea);
            } catch (ePwaAreaBase) {}
            if (markPwaIosChatFocusActivation(pwaComposer, "area-gesture", 260)) {
              setTimeout(function () {
                try {
                  if (document.activeElement === pwaComposer) onChatInputFocus(pwaComposer);
                } catch (ePwaAreaGestureFocusLate) {}
              }, 0);
            }
          }
        } catch (ePwaAreaGestureActivate) {}
        return;
      }
      if (!ensureTelegramDedicatedChatComposers()) return;
      forceDetachSharedChatComposerForTelegram();
      var directComposer = getDirectTelegramChatComposer(mode);
      if (!directComposer) return;
      chatComposerEl = directComposer;
      try {
        directComposer.disabled = false;
        directComposer.hidden = false;
        directComposer.removeAttribute("tabindex");
        directComposer.removeAttribute("aria-hidden");
        directComposer.style.removeProperty("display");
        directComposer.style.removeProperty("pointer-events");
      } catch (eComposerAreaPrep) {}
      if (target === directComposer || (target && directComposer.contains && directComposer.contains(target))) {
        try {
          if (
            !isTelegramChatRuntime() &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            onChatInputFocus(directComposer);
            forceIosPwaChatTextareaDock(directComposer, "direct-target");
          }
        } catch (ePwaDirectTargetFocus) {}
        return;
      }
      var isEarlyGesture = !!(event && (event.type === "touchstart" || event.type === "pointerdown"));
      try {
        if (directComposer.focus) directComposer.focus({ preventScroll: true });
        if (
          !isTelegramChatRuntime() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset() &&
          typeof isIosLikeForChatViewport === "function" &&
          isIosLikeForChatViewport()
        ) {
          setTimeout(function () {
            try {
              onChatInputFocus(directComposer);
              forceIosPwaChatTextareaDock(directComposer, "area-focus");
            } catch (ePwaAreaFocusActivate) {}
          }, 0);
        }
        if (!isEarlyGesture) {
          var len = String(directComposer.value || "").length;
          if (typeof directComposer.setSelectionRange === "function") directComposer.setSelectionRange(len, len);
        }
      } catch (eComposerAreaFocus1) {
        try {
          if (directComposer && directComposer.focus) directComposer.focus();
        } catch (eComposerAreaFocus2) {}
      }
    }
    area.addEventListener("pointerdown", focusDirectComposerFromArea, true);
    area.addEventListener("touchstart", focusDirectComposerFromArea, { passive: false, capture: true });
    area.addEventListener("click", focusDirectComposerFromArea, true);
  }
  bindChatComposerAreaDirectFocus(chatGeneralInputArea, "general");
  bindChatComposerAreaDirectFocus(chatPersonalInputArea, "personal");

  var chatGeneralScrollBottomBtn = document.getElementById("chatGeneralScrollBottomBtn");
  var chatPersonalScrollBottomBtn = document.getElementById("chatPersonalScrollBottomBtn");
  var chatScrollBottom = typeof initChatScrollBottom === "function" ? initChatScrollBottom({
    generalMessages: generalMessages,
    messagesEl: messagesEl,
    generalView: generalView,
    convView: convView,
    chatGeneralScrollBottomBtn: chatGeneralScrollBottomBtn,
    chatPersonalScrollBottomBtn: chatPersonalScrollBottomBtn,
    getChatActiveTab: function () { return chatActiveTab; },
    isChatPhysicalKeyboardContext: typeof isChatPhysicalKeyboardContext === "function" ? isChatPhysicalKeyboardContext : null,
  }) : {};
  var chatMessagesBottomGap = chatScrollBottom.chatMessagesBottomGap || function () { return 0; };
  var chatMessagesNearBottom = chatScrollBottom.chatMessagesNearBottom || function () { return true; };
  var chatMessagesShouldFollowKeyboardLift = chatScrollBottom.chatMessagesShouldFollowKeyboardLift || function () { return false; };
  var rememberChatMessagesBottomAffinity = chatScrollBottom.rememberChatMessagesBottomAffinity || function () { return false; };
  var scheduleChatKeyboardBottomFollow = chatScrollBottom.scheduleChatKeyboardBottomFollow || function () {};
  var scheduleSyncChatScrollBottomButtons = chatScrollBottom.scheduleSyncChatScrollBottomButtons || function () {};
  var snapChatMessagesToBottomIfPinned = chatScrollBottom.snapChatMessagesToBottomIfPinned || function () {};

  var chatComposerCore = typeof initChatComposerCore === "function" ? initChatComposerCore({
    chatSharedComposerEl: chatSharedComposerEl,
    chatComposerPool: chatComposerPool,
    chatGeneralComposerMount: chatGeneralComposerMount,
    chatPersonalComposerMount: chatPersonalComposerMount,
    generalSendBtn: generalSendBtn,
    sendBtn: sendBtn,
    chatComposerDrafts: chatComposerDrafts,
    getChatActiveTab: function () { return chatActiveTab; },
    getChatComposerEl: function () { return chatComposerEl; },
    setChatComposerEl: function (value) { chatComposerEl = value; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    setChatComposerMounted: function (value) { chatComposerMounted = value; },
    getChatGeneralComposerEl: function () { return chatGeneralComposerEl; },
    setChatGeneralComposerEl: function (value) { chatGeneralComposerEl = value; },
    getChatPersonalComposerEl: function () { return chatPersonalComposerEl; },
    setChatPersonalComposerEl: function (value) { chatPersonalComposerEl = value; },
    getDirectTelegramChatComposer: getDirectTelegramChatComposer,
    ensureTelegramDedicatedChatComposers: ensureTelegramDedicatedChatComposers,
    isTelegramChatRuntime: isTelegramChatRuntime,
    scheduleTelegramIosChatComposerOverlaySync: scheduleTelegramIosChatComposerOverlaySync,
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
    updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
  }) : {};
  var flushChatComposerToDrafts = chatComposerCore.flushChatComposerToDrafts || function () {};
  var getChatGeneralText = chatComposerCore.getChatGeneralText || function () { return chatComposerDrafts.general || ""; };
  var getChatPersonalText = chatComposerCore.getChatPersonalText || function () { return chatComposerDrafts.personal || ""; };
  var focusChatComposerForDesktop = chatComposerCore.focusChatComposerForDesktop || function () {};
  var focusChatComposerForReply = chatComposerCore.focusChatComposerForReply || function () {};
  var mountChatComposer = chatComposerCore.mountChatComposer || function () {};
  var setGeneralSendBusy = chatComposerCore.setGeneralSendBusy || function () {};
  var setPersonalSendBusy = chatComposerCore.setPersonalSendBusy || function () {};
  var shouldAutoFocusChatComposerOnDesktop = chatComposerCore.shouldAutoFocusChatComposerOnDesktop || function () { return true; };

  var base = getApiBase();
  /* учётные данные чата: pokerApiAuth* (Mini App initData или PWA pwaSession) */

  var chatBootstrapPrefetchRuntime = null;
  function pokerPrefetchDiskPeersWarmup() {
    if (chatBootstrapPrefetchRuntime && typeof chatBootstrapPrefetchRuntime.pokerPrefetchDiskPeersWarmup === "function") {
      return chatBootstrapPrefetchRuntime.pokerPrefetchDiskPeersWarmup();
    }
  }
  function scheduleChatBootstrapFetch() {
    if (chatBootstrapPrefetchRuntime && typeof chatBootstrapPrefetchRuntime.scheduleChatBootstrapFetch === "function") {
      return chatBootstrapPrefetchRuntime.scheduleChatBootstrapFetch();
    }
  }

  try {
    pokerHydrateChatSnapshotsFromDisk();
    syncClubChatRosterUi();
  } catch (eHydInit) {}

  var chatPresenceTyping = typeof initChatPresenceTyping === "function" ? initChatPresenceTyping({
    getBase: function () { return base; },
    getChatActiveTab: function () { return chatActiveTab; },
    getChatWithUserId: function () { return chatWithUserId; },
    getConvView: function () { return convView; },
    getConvTitleId: function () { return convTitleId; },
    resolveChatConvTitleP21Id: resolveChatConvTitleP21Id,
    setChatConvTitleIdText: setChatConvTitleIdText,
    setTextContentIfChanged: setTextContentIfChanged,
    syncChatConvTitleMetaVisibility: syncChatConvTitleMetaVisibility,
  }) : {};
  var pokerUpdateChatDmFocusFromUiState = chatPresenceTyping.pokerUpdateChatDmFocusFromUiState || function () {};
  var updateConvTypingUi = chatPresenceTyping.updateConvTypingUi || function () {};
  var pokerChatSendTypingState = chatPresenceTyping.pokerChatSendTypingState || function () {};
  var pokerChatScheduleTypingStop = chatPresenceTyping.pokerChatScheduleTypingStop || function () {};
  var clearChatTypingStopTimer = chatPresenceTyping.clearChatTypingStopTimer || function () {};

  initChatUserModals({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    openConversation: function (userId, userName, avatarUrl) {
      setTab("personal");
      showConv(userId, userName, undefined, avatarUrl);
    },
    updateCurrentPeerTitle: function (userId, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, userId)) {
        chatWithUserName = title;
        if (convTitle) convTitle.textContent = title;
        applyConvPeerAvatarHeader(chatWithPeerAvatarUrl, title);
      }
    },
  });
  var chatNameBtnLongPressHandled = false;
  var chatNameBtnLongPressTimer = null;

  if (!base) {
    var wrapNoBase = generalMessages.parentElement;
    if (wrapNoBase && wrapNoBase.classList) wrapNoBase.classList.remove("chat-messages-wrap--settling");
    generalMessages.innerHTML = "<p class=\"chat-empty\">Не задан адрес API.</p>";
    return;
  }

  function syncChatConvGroupAddMembersBtn() {
    var b = document.getElementById("chatConvGroupAddMembersBtn");
    if (!b) return;
    var grp = !!(chatWithUserId && String(chatWithUserId).indexOf("group_") === 0);
    var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    b.hidden = !grp || !cred;
  }
  var chatVoiceMedia = typeof initChatVoiceMedia === "function" ? initChatVoiceMedia({ escapeHtml: escapeHtml }) : {};
  var pokerNormalizeVoiceDataUrl = chatVoiceMedia.pokerNormalizeVoiceDataUrl || function (dataUrl) { return dataUrl; };
  var chatVoiceMessageHtml = chatVoiceMedia.chatVoiceMessageHtml || function () { return ""; };
  var appendChatVoiceToTextWrap = chatVoiceMedia.appendChatVoiceToTextWrap || function () {};
  var chatMsgVoiceOnlyNoCaption = chatVoiceMedia.chatMsgVoiceOnlyNoCaption || function () { return false; };

  window.lastGeneralStats = "";
  window.lastListStats = "";
  window.lastConvStats = "";
  window.__pokerChatNetworkOnline = !(typeof navigator !== "undefined" && navigator.onLine === false);
  function closeSwitcherDropdown() {}
  /** iOS WKWebView: навигация между полями над клавиатурой. Один textarea переносится mountChatComposer; inert на поддеревьях чата при списке диалогов / общем / переписке. */
  function syncChatInertForIosAccessory() {
    try {
      var dlg = document.getElementById("chatDialogsView");
      var gen = document.getElementById("chatGeneralView");
      var per = document.getElementById("chatPersonalView");
      if (!dlg || !gen || !per) return;
      var dialogsShown = !dlg.classList.contains("chat-dialogs-view--hidden");
      var generalShown = !gen.classList.contains("chat-general-view--hidden");
      var convShown = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
      var supportsInert = typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
      if (supportsInert) {
        if (dialogsShown) {
          dlg.removeAttribute("inert");
          gen.setAttribute("inert", "");
          per.setAttribute("inert", "");
        } else if (generalShown) {
          dlg.setAttribute("inert", "");
          gen.removeAttribute("inert");
          per.setAttribute("inert", "");
        } else if (convShown) {
          dlg.setAttribute("inert", "");
          gen.setAttribute("inert", "");
          per.removeAttribute("inert");
        } else {
          dlg.setAttribute("inert", "");
          gen.setAttribute("inert", "");
          per.setAttribute("inert", "");
        }
      } else {
        if (chatComposerEl) {
          var composerFocus =
            !dialogsShown &&
            ((generalShown && chatComposerMounted === "general") || (convShown && chatComposerMounted === "personal"));
          chatComposerEl.tabIndex = composerFocus ? 0 : -1;
        }
      }
      /* Вне экрана диалогов поле поиска скрыто (display:none), но на части iOS WK всё равно попадает в «цепочку» клавиатуры ◀ ▶ — убираем из tab order. Тап по полю на экране «Чаты» остаётся (focus по клику для tabindex=-1). */
      var findDlg = document.getElementById("chatFindByIdInputDialogs");
      if (findDlg && typeof findDlg.setAttribute === "function") {
        if (dialogsShown) findDlg.removeAttribute("tabindex");
        else findDlg.setAttribute("tabindex", "-1");
      }
    } catch (eInert) {}
  }
  var chatTabDialogShell = initChatTabDialogShell({
    getChatActiveTab: function () { return chatActiveTab; },
    setChatActiveTab: function (value) { chatActiveTab = value; },
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    setChatPeerTypingActive: chatPresenceTyping.setChatPeerTypingActive,
    getDialogsView: function () { return dialogsView; },
    getGeneralView: function () { return generalView; },
    getPersonalView: function () { return personalView; },
    getAdminsView: function () { return adminsView; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getConvTitle: function () { return convTitle; },
    getChatComposerEl: function () { return chatComposerEl; },
    setScrollGeneralToBottomOnNextRender: function (value) { scrollGeneralToBottomOnNextRender = !!value; },
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    pokerPushOpenTraceTransition: pokerPushOpenTraceTransition,
    pokerPushOpenDebug: pokerPushOpenDebug,
    pokerPushOpenSetCaller: pokerPushOpenSetCaller,
    pokerPushOpenConsumeCaller: pokerPushOpenConsumeCaller,
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    normalizePeerIdForChat: normalizePeerIdForChat,
    pokerOpenResolvedChatPeer: typeof pokerOpenResolvedChatPeer === "function" ? pokerOpenResolvedChatPeer : null,
    pokerOpenChatPeerDirectFallback: typeof pokerOpenChatPeerDirectFallback === "function" ? pokerOpenChatPeerDirectFallback : null,
    pokerOpenPendingPushDmWithoutContacts: typeof pokerOpenPendingPushDmWithoutContacts === "function" ? pokerOpenPendingPushDmWithoutContacts : null,
    pokerOpenPushDmHard: typeof pokerOpenPushDmHard === "function" ? pokerOpenPushDmHard : null,
    pokerGetActivePushDmTarget: function () {
      if (typeof pokerGetActivePushDmTarget === "function") return pokerGetActivePushDmTarget();
      return "";
    },
    pokerGuardDefaultDialogsOpen: typeof pokerGuardDefaultDialogsOpen === "function" ? pokerGuardDefaultDialogsOpen : null,
    pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
    paintGeneralFromMemoryBeforeFetch: paintGeneralFromMemoryBeforeFetch,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    loadMessages: function (opts) { return loadMessages(opts); },
    loadAdminsOnline: function () { return loadAdminsOnline(); },
    loadContacts: function (opts) { return loadContacts(opts); },
    updateChatHeaderStats: updateChatHeaderStats,
    updateUnreadDots: updateUnreadDots,
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerResetChatDialogsViewportArtifacts: function () {
      if (typeof pokerResetChatDialogsViewportArtifacts === "function") return pokerResetChatDialogsViewportArtifacts();
    },
    scrollMainDocumentToTop: typeof scrollMainDocumentToTop === "function" ? scrollMainDocumentToTop : null,
    pokerApplyAppTopPadding: typeof pokerApplyAppTopPadding === "function" ? pokerApplyAppTopPadding : null,
    setChatPeerVerified: setChatPeerVerified,
    setChatConvTitleIdText: setChatConvTitleIdText,
    clearConvPeerAvatarHeader: clearConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    pokerPrefetchDiskPeersWarmup: pokerPrefetchDiskPeersWarmup,
    updateClubChatPreview: function (messages) {
      if (typeof updateClubChatPreview === "function") return updateClubChatPreview(messages);
    },
    updateAdminShiftOnline: updateAdminShiftOnline,
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    refreshChatSelfPinBars: function () {
      if (typeof refreshChatSelfPinBars === "function") return refreshChatSelfPinBars();
    },
    pokerFlushBottomNavAndViewportAfterChatChrome: typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function" ? pokerFlushBottomNavAndViewportAfterChatChrome : null,
    closeSwitcherDropdown: closeSwitcherDropdown,
  });
  var setTab = chatTabDialogShell.setTab;
  var showDialogs = chatTabDialogShell.showDialogs;

  var scrollGeneralToBottomOnNextRender = false;
  var scrollPersonalToBottomOnNextRender = false;
  var chatDialogsMeta = initChatDialogsMeta({
    getChatIsAdmin: function () { return chatIsAdmin; },
    getClubChatAccess: function () { return clubChatAccess; },
    getDialogsView: function () { return dialogsView; },
    setTextContentIfChanged: setTextContentIfChanged,
    peerChatIdsEqual: peerChatIdsEqual,
  });
  var updateClubChatPendingBadge = chatDialogsMeta.updateClubChatPendingBadge;
  var updateDialogUnreadBadges = chatDialogsMeta.updateDialogUnreadBadges;
  var updateClubChatPreview = chatDialogsMeta.updateClubChatPreview;
  var updateClubChatPreviewText = chatDialogsMeta.updateClubChatPreviewText;
  var enrichPersonalThreadPeerMeta = chatDialogsMeta.enrichPersonalThreadPeerMeta;

  var chatOpenPeerHydrate = typeof initChatOpenPeerHydrate === "function"
    ? initChatOpenPeerHydrate({
        base: base,
        pokerApiAuthQuery: pokerApiAuthQuery,
        peerChatIdsEqual: peerChatIdsEqual,
        getChatWithUserId: function () { return chatWithUserId; },
        getChatWithUserName: function () { return chatWithUserName; },
        setChatWithUserName: function (value) { chatWithUserName = value; },
        setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
        getConvTitle: function () { return convTitle; },
        setTextContentIfChanged: setTextContentIfChanged,
        setChatConvTitleIdText: setChatConvTitleIdText,
        setChatPeerVerified: setChatPeerVerified,
        setChatConvTitleFish: setChatConvTitleFish,
        applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
        pokerTryReadContactsCache: typeof pokerTryReadContactsCache === "function" ? pokerTryReadContactsCache : null,
        pokerGetCachedChatPeerMeta: typeof pokerGetCachedChatPeerMeta === "function" ? pokerGetCachedChatPeerMeta : null,
        pokerPushOpenDebug: pokerPushOpenDebug,
        loadContacts: function (opts) { return loadContacts(opts); },
      })
    : {};
  var hydrateOpenDmHeaderFromContactsLocal =
    chatOpenPeerHydrate.hydrateOpenDmHeaderFromContactsLocal || function () { return false; };
  var scheduleDmHeaderHydrateLocal =
    chatOpenPeerHydrate.scheduleDmHeaderHydrateLocal || function () {};

  var chatContactsLoader = initChatContactsLoader({
    base: base,
    CHAT_LONG_POLL_TIMEOUT_MS: CHAT_LONG_POLL_TIMEOUT_MS,
    getContactsEl: function () { return contactsEl; },
    getLastViewedPersonal: function () { return lastViewedPersonal; },
    getLastViewedGeneral: function () { return lastViewedGeneral; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    pokerApiAuthQuery: pokerApiAuthQuery,
    forceHideChatGuestGateForTelegram: forceHideChatGuestGateForTelegram,
    getPokerResolvedTelegramUser: typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser : null,
    pokerReadPwaGuestMode: typeof pokerReadPwaGuestMode === "function" ? pokerReadPwaGuestMode : null,
    pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
    syncChatWebsiteGuestGate: syncChatWebsiteGuestGate,
    updateDialogUnreadBadges: updateDialogUnreadBadges,
    updateChatNavDot: function () {
      if (typeof updateChatNavDot === "function") return updateChatNavDot();
    },
    pokerSanitizeContactsPayloadForUi: typeof pokerSanitizeContactsPayloadForUi === "function" ? pokerSanitizeContactsPayloadForUi : null,
    tryOpenClubChatFromDialogs: function () {
      if (typeof tryOpenClubChatFromDialogs === "function") return tryOpenClubChatFromDialogs();
    },
    openClubChat: function () {
      if (typeof openClubChat === "function") return openClubChat();
    },
    pokerApiHasCredential: pokerApiHasCredential,
    pokerSyncChatContactsFilterTabs: pokerSyncChatContactsFilterTabs,
    pokerApplyChatContactsUnreadState: pokerApplyChatContactsUnreadState,
    prefetchTopPersonalDialogs: prefetchTopPersonalDialogs,
    pokerBuildChatContactsListState: pokerBuildChatContactsListState,
    pokerBuildChatContactsFriendSet: pokerBuildChatContactsFriendSet,
    pokerRefreshChatContactsGroupPickers: pokerRefreshChatContactsGroupPickers,
    pokerBuildGroupModalContactList: typeof pokerBuildGroupModalContactList === "function" ? pokerBuildGroupModalContactList : null,
    chatCachedFriendRows: chatCachedFriendRows,
    pokerApplyChatContactsFriendsOnlyList: pokerApplyChatContactsFriendsOnlyList,
    pokerApplyChatContactsMetaState: pokerApplyChatContactsMetaState,
    updateChatHeaderStats: updateChatHeaderStats,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateClubChatPreviewText: updateClubChatPreviewText,
    pokerRenderChatContactsListResult: pokerRenderChatContactsListResult,
    pokerBindChatContactsFilterHandler: pokerBindChatContactsFilterHandler,
    pokerHydrateChatContactsFromInstantCache: pokerHydrateChatContactsFromInstantCache,
    pokerPrepareChatContactsFetchData: pokerPrepareChatContactsFetchData,
    pokerCompleteChatContactsFetchData: pokerCompleteChatContactsFetchData,
    pokerHandleChatContactsFetchError: pokerHandleChatContactsFetchError,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    pokerMergeChatPeerMetaIntoContactsData: typeof pokerMergeChatPeerMetaIntoContactsData === "function" ? pokerMergeChatPeerMetaIntoContactsData : null,
    pokerRememberChatPeerMetaFromContactsData: typeof pokerRememberChatPeerMetaFromContactsData === "function" ? pokerRememberChatPeerMetaFromContactsData : null,
    pokerHydrateOpenDmHeaderFromContacts: hydrateOpenDmHeaderFromContactsLocal,
    getChatWithUserId: function () { return chatWithUserId; },
  });
  var applyContactsApiResponse = chatContactsLoader.applyContactsApiResponse || function () {};
  var buildContactsRequestUrl = chatContactsLoader.buildContactsRequestUrl;
  var mergeContactsMetaPayload = chatContactsLoader.mergeContactsMetaPayload;
  var loadContacts = chatContactsLoader.loadContacts;
  try {
    window.__pokerReloadChatContacts = loadContacts;
    window.__pokerKickChatContactsLoad = function (opts) {
      return loadContacts(opts || {});
    };
    if (!window.__pokerChatAuthReloadBound) {
      window.__pokerChatAuthReloadBound = true;
      window.addEventListener("poker-telegram-auth", function () {
        setTimeout(function () {
          try {
            if (typeof window.__pokerKickChatContactsLoad === "function") {
              window.__pokerKickChatContactsLoad({ forceRerender: true });
            }
          } catch (eAuthReloadContacts) {}
        }, 0);
      });
    }
  } catch (eExposeContactsKick) {}

  var chatClubGate = initChatClubGate({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    getOpenClubChat: function () { return openClubChat; },
    getChatIsAdmin: function () { return chatIsAdmin; },
    getClubChatAccess: function () { return clubChatAccess; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    getGeneralView: function () { return generalView; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralMessages: function () { return generalMessages; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    loadContacts: function (opts) { return loadContacts(opts); },
    loadGeneral: function (opts) { return loadGeneral(opts); },
    updateClubChatPreview: function (messages) {
      if (typeof updateClubChatPreview === "function") return updateClubChatPreview(messages);
    },
    escapeHtml: escapeHtml,
  });
  var tryOpenClubChatFromDialogs = chatClubGate.tryOpenClubChatFromDialogs;
  var submitClubChatApplication = chatClubGate.submitClubChatApplication;
  var updateGeneralInputLocked = chatClubGate.updateGeneralInputLocked;
  var renderGeneralAccessGate = chatClubGate.renderGeneralAccessGate;
  window.tryOpenClubChatFromDialogs = tryOpenClubChatFromDialogs;

  var chatOpenShell = initChatOpenShell({
    POKER_CHAT_NEED_AUTH_PWA_MSG: POKER_CHAT_NEED_AUTH_PWA_MSG,
    POKER_NET_ERR: POKER_NET_ERR,
    getDialogsView: function () { return dialogsView; },
    getGeneralView: function () { return generalView; },
    getPersonalView: function () { return personalView; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getChatActiveTab: function () { return chatActiveTab; },
    setChatActiveTab: function (value) { chatActiveTab = value; },
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    setChatPeerTypingActive: chatPresenceTyping.setChatPeerTypingActive,
    getConvTitle: function () { return convTitle; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getGeneralMessages: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    getPersonalMessagesCache: function () { return personalMessagesCache; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerDrafts: function () { return chatComposerDrafts; },
    setScrollGeneralToBottomOnNextRender: function (value) { scrollGeneralToBottomOnNextRender = !!value; },
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    pokerResetChatDialogsViewportArtifacts: function () {
      if (typeof pokerResetChatDialogsViewportArtifacts === "function") return pokerResetChatDialogsViewportArtifacts();
    },
    updateGeneralInputLocked: updateGeneralInputLocked,
    updateChatHeaderStats: updateChatHeaderStats,
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    getPokerChatTelegramAuthState: typeof getPokerChatTelegramAuthState === "function" ? getPokerChatTelegramAuthState : null,
    escapeHtml: escapeHtml,
    isTelegramWebApp: typeof isTelegramWebApp === "function" ? isTelegramWebApp : null,
    pokerNotifyChatAuthPending: typeof pokerNotifyChatAuthPending === "function" ? pokerNotifyChatAuthPending : null,
    pokerNotifyChatVerificationRequired: typeof pokerNotifyChatVerificationRequired === "function" ? pokerNotifyChatVerificationRequired : null,
    paintGeneralFromMemoryBeforeFetch: paintGeneralFromMemoryBeforeFetch,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    setChatConvTitleIdText: setChatConvTitleIdText,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    updateUnreadDots: updateUnreadDots,
    pokerApiHasCredential: pokerApiHasCredential,
    loadMessages: function (opts) { return loadMessages(opts); },
    pokerPushOpenDebug: pokerPushOpenDebug,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerSafeChatAlert: pokerSafeChatAlert,
    setTab: setTab,
    showConv: function (userId, userName, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt) {
      if (typeof showConv === "function") {
        return showConv(userId, userName, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt);
      }
    },
    resizeChatTextarea: resizeChatTextarea,
  });
  var openClubChat = chatOpenShell.openClubChat;
  var openPushDmImmediate = chatOpenShell.openPushDmImmediate;
  var openConvFromDialogs = chatOpenShell.openConvFromDialogs;

  window.chatSetTab = setTab;
  window.chatShowDialogs = showDialogs;
  window.chatOpenConvFromDialogs = openConvFromDialogs;
  window.__pokerOpenPushDmImmediate = openPushDmImmediate;
  window.openClubChat = openClubChat;
  try {
    if (window.__pendingOpenChatPersonalFromDeepLink || window.__pokerPendingChatDeepLinkNeedsLateFlush) {
      pokerPushOpenStateDebug("chat-exports-ready", "");
      setTimeout(function () {
        try {
          if (
            window.__pendingOpenChatPersonalFromDeepLink &&
            typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function"
          ) {
            pokerPushOpenStateDebug("chat-exports-flush", "");
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
          window.__pokerPendingChatDeepLinkNeedsLateFlush = false;
        } catch (eLateFlushChatExports) {}
      }, 0);
    }
  } catch (eChatExportsReady) {}



  var openChatClubAccessModal = initChatClubAccessModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    updateClubChatPendingBadge: updateClubChatPendingBadge,
    refreshGeneralAfterClubAccessChange: function () {
      loadGeneral();
    },
    reloadContactsAfterClubAccessChange: function () {
      loadContacts();
    },
    ensureGlobalModalsHtml: typeof pokerEnsureGlobalModalsHtml === "function" ? pokerEnsureGlobalModalsHtml : null,
  });

  var showTemplatesMenu = initChatTemplatesModal({
    escapeHtml: escapeHtml,
    applyTemplateToComposer: function (channel, text) {
      if (!chatComposerEl || (channel !== "general" && channel !== "personal")) return;
      if (channel === "general") chatComposerDrafts.general = text;
      else chatComposerDrafts.personal = text;
      chatComposerEl.value = text;
      if (typeof resizeChatTextarea === "function") resizeChatTextarea(chatComposerEl);
    },
    sendTemplateMessage: function (channel, text) {
      try {
        if (channel === "general") sendGeneral(text);
        else if (channel === "personal") sendMessage(text);
        else if (chatComposerEl) chatComposerEl.focus();
      } catch (e) {
        if (chatComposerEl) chatComposerEl.focus();
      }
    },
  });

  var CHAT_LAST_VIEWED_KEY = "chat_last_viewed";
  var stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(CHAT_LAST_VIEWED_KEY) || "{}");
  } catch (e) { stored = {}; }
  var lastViewedGeneral = stored && stored.general != null ? stored.general : null;
  try {
    if (lastViewedGeneral !== null && lastViewedGeneral !== undefined && String(lastViewedGeneral).trim() === "") lastViewedGeneral = null;
    else if (lastViewedGeneral != null && isNaN(Date.parse(String(lastViewedGeneral).trim()))) lastViewedGeneral = null;
  } catch (eLvGen) {
    lastViewedGeneral = null;
  }
  var lastViewedPersonal = {};
  try {
    var rawPersonal = stored && stored.personal && typeof stored.personal === "object" ? stored.personal : {};
    Object.keys(rawPersonal).forEach(function (k) {
      var v = rawPersonal[k];
      if (v == null || String(v).trim() === "") return;
      if (isNaN(Date.parse(String(v).trim()))) return;
      lastViewedPersonal[normalizePeerIdForChat(k)] = v;
    });
  } catch (ePers) {
    lastViewedPersonal = {};
  }
  function saveChatLastViewed() {
    try {
      localStorage.setItem(CHAT_LAST_VIEWED_KEY, JSON.stringify({ general: lastViewedGeneral, personal: lastViewedPersonal }));
    } catch (e) {}
  }
  var lastGeneralMessagesSig = null;
  var lastPersonalMessagesSig = null;
  var chatRenderFrameGeneral = 0;
  var chatRenderFramePersonal = 0;

  function scheduleGeneralRender(messages, sig) {
    if (chatRenderFrameGeneral) {
      try { cancelAnimationFrame(chatRenderFrameGeneral); } catch (eCancelG) {}
      chatRenderFrameGeneral = 0;
    }
    var run = function () {
      chatRenderFrameGeneral = 0;
      lastGeneralMessagesSig = sig;
      renderGeneralMessages(messages);
    };
    if (typeof requestAnimationFrame === "function") {
      chatRenderFrameGeneral = requestAnimationFrame(run);
    } else {
      setTimeout(run, 0);
    }
  }
  function schedulePersonalRender(messages, sig) {
    if (chatRenderFramePersonal) {
      try { cancelAnimationFrame(chatRenderFramePersonal); } catch (eCancelP) {}
      chatRenderFramePersonal = 0;
    }
    var run = function () {
      chatRenderFramePersonal = 0;
      lastPersonalMessagesSig = sig;
      renderMessages(messages);
    };
    if (typeof requestAnimationFrame === "function") {
      chatRenderFramePersonal = requestAnimationFrame(run);
    } else {
      setTimeout(run, 0);
    }
  }

  function chatProfileStatusLevelHtml(level) {
    if (level == null || level === "") return "";
    var statusLevel = pokerProfileStatusFishLevel(level);
    return '<span class="chat-msg__status-level">Уровень: ' + escapeHtml(String(statusLevel)) + "</span>";
  }
  function chatContactStatusLevelHtml(level) {
    if (level == null || level === "") return "";
    var statusLevel = pokerProfileStatusFishLevel(level);
    return '<span class="chat-contact__status-level">Уровень: ' + escapeHtml(String(statusLevel)) + "</span>";
  }
  var chatMessageBodyBuilders = initChatMessageBodyBuilders({
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatMsgImageAttrs: chatMsgImageAttrs,
    chatMsgVoiceOnlyNoCaption: chatMsgVoiceOnlyNoCaption,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    chatDayDividerHtmlBeforeMessage: chatDayDividerHtmlBeforeMessage,
    chatMessageBodyHtml: chatMessageBodyHtml,
    chatProfileStatusLevelHtml: chatProfileStatusLevelHtml,
    pokerProfileStatusFishLevel: pokerProfileStatusFishLevel,
    pokerProfileStatusFishIconHtml: pokerProfileStatusFishIconHtml,
    chatPokerPlusVerifiedBadgeHtml: chatPokerPlusVerifiedBadgeHtml,
    sortChatReactionEmojiKeys: sortChatReactionEmojiKeys,
    getChatWithUserId: function () { return chatWithUserId; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
  });
  var buildGeneralMessagesBodyHtml = chatMessageBodyBuilders.buildGeneralMessagesBodyHtml;
  var buildPersonalMessagesBodyHtml = chatMessageBodyBuilders.buildPersonalMessagesBodyHtml;
  var renderLoadOlderButtonHtml = chatMessageBodyBuilders.renderLoadOlderButtonHtml;
  var getPersonalReceiptState = chatMessageBodyBuilders.getPersonalReceiptState;

  function fastAppendChatMessages(targetEl, newMessages, buildHtml, sigSetter) {
    if (!targetEl || !Array.isArray(newMessages) || !newMessages.length) return false;
    var wrap = targetEl.parentElement;
    if (wrap && wrap.classList) wrap.classList.remove("chat-messages-wrap--settling");
    var prevScrollTop = targetEl.scrollTop;
    var prevScrollHeight = targetEl.scrollHeight;
    var wasNearBottom = prevScrollHeight - prevScrollTop - targetEl.clientHeight < 80;
    var emptyEl = targetEl.querySelector(".chat-empty");
    if (emptyEl) targetEl.innerHTML = "";
    targetEl.insertAdjacentHTML("beforeend", buildHtml(newMessages));
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eFastLayout) {}
    if (wasNearBottom || scrollGeneralToBottomOnNextRender || scrollPersonalToBottomOnNextRender) {
      targetEl.scrollTop = targetEl.scrollHeight;
    } else {
      targetEl.scrollTop = prevScrollTop;
    }
    if (typeof sigSetter === "function") sigSetter();
    return true;
  }
  function fastPrependChatMessages(targetEl, oldMessages, buildHtml, loadOlderSource, sigSetter) {
    if (!targetEl || !Array.isArray(oldMessages) || !oldMessages.length) return false;
    var prevTop = targetEl.scrollTop;
    var prevHeight = targetEl.scrollHeight;
    var firstChild = targetEl.firstChild;
    var html = (loadOlderSource ? renderLoadOlderButtonHtml(loadOlderSource) : "") + buildHtml(oldMessages);
    targetEl.insertAdjacentHTML("afterbegin", html);
    if (firstChild && firstChild.parentNode === targetEl) {
      var dupOlder = targetEl.querySelectorAll('[data-chat-load-older="' + loadOlderSource + '"]');
      if (dupOlder.length > 1) {
        try { dupOlder[dupOlder.length - 1].closest(".chat-load-older").remove(); } catch (eDupOlder) {}
      }
    }
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eFastPreLayout) {}
    targetEl.scrollTop = Math.max(0, targetEl.scrollHeight - prevHeight + prevTop);
    if (typeof sigSetter === "function") sigSetter();
    return true;
  }

  /** Сразу показать последний известный общий чат из памяти/disk до ответа /api/chat — без «пустого» ожидания. */
  function paintGeneralFromMemoryBeforeFetch() {
    try {
      if (!generalMessages || !generalView) return;
      if (generalView.classList.contains("chat-general-view--hidden")) return;
      if (chatActiveTab !== "general") return;
      if (!document.querySelector('[data-view="chat"].view--active')) return;
      var cache = window._chatGeneralCache;
      if (!cache || !Array.isArray(cache.messages) || cache.messages.length === 0) return;
      if (cache.__fromDisk) return;
      if (typeof getPokerChatTelegramAuthState === "function" && getPokerChatTelegramAuthState() !== "ok") return;
      scrollGeneralToBottomOnNextRender = true;
      updateGeneralInputLocked(false);
      renderGeneralMessages(cache.messages);
      try {
        lastGeneralMessagesSig = generalMessagesSignature(cache.messages);
      } catch (eSigP) {}
      if (cache.participantsCount != null) {
        window.lastGeneralStats = String(cache.participantsCount) + " уч";
        updateChatHeaderStats();
      }
      try {
        syncClubChatRosterUi();
      } catch (eRosterP) {}
      try {
        refreshChatSelfPinBars();
      } catch (ePinP) {}
    } catch (ePaintG) {}
  }

  /** Пока POST в полёте, любая перезагрузка ленты с сервера снова рисует исходный список — без этого optimistic пропадает до ответа API. */
  var chatOutgoingHelpers = initChatOutgoingHelpers({
    tg: tg,
    escapeHtml: escapeHtml,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    resolveMyChatMemberId: resolveMyChatMemberId,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    getSendingGeneral: function () { return sendingGeneral; },
    getSendingPrivate: function () { return sendingPrivate; },
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    sendGeneral: function (payload) { return sendGeneral(payload); },
    sendMessage: function (payload) { return sendMessage(payload); },
  });
  var chatOutgoingState = chatOutgoingHelpers.state;
  var chatCloneRetryPayload = chatOutgoingHelpers.chatCloneRetryPayload;
  var buildChatFailedActionsHtml = chatOutgoingHelpers.buildChatFailedActionsHtml;
  var attachFailedChatActions = chatOutgoingHelpers.attachFailedChatActions;
  var markLatestOptimisticMessageFailed = chatOutgoingHelpers.markLatestOptimisticMessageFailed;
  var retryFailedOutgoingChat = chatOutgoingHelpers.retryFailedOutgoingChat;
  var chatPushPlaceholderFromPayload = chatOutgoingHelpers.chatPushPlaceholderFromPayload;
  var mergeIncomingPushGeneralIntoMessages = chatOutgoingHelpers.mergeIncomingPushGeneralIntoMessages;
  var mergeIncomingPushPersonalIntoMessages = chatOutgoingHelpers.mergeIncomingPushPersonalIntoMessages;
  var mergeOptimisticGeneralIntoMessages = chatOutgoingHelpers.mergeOptimisticGeneralIntoMessages;
  var mergeOptimisticPersonalIntoMessages = chatOutgoingHelpers.mergeOptimisticPersonalIntoMessages;
  var dedupeGeneralMessagesForRender = chatOutgoingHelpers.dedupeGeneralMessagesForRender;
  var dedupePersonalMessagesForRender = chatOutgoingHelpers.dedupePersonalMessagesForRender;

  function updateUnreadDots() {
    if (typeof updateChatNavDot === "function") updateChatNavDot();
  }
  window.chatGeneralUnread = false;
  window.chatPersonalUnread = false;
  window.chatGeneralUnreadCount = 0;
  window.chatPersonalUnreadCount = 0;
  /** Сумма непрочитанных по всем личным диалогам из ответа mode=contacts (для бейджа таббара и PWA icon). */
  window.chatPersonalUnreadTotalFromContacts = undefined;

  var reactionPickerEl = document.getElementById("chatReactionPicker");
  var currentReactionPickerClose = null;

  /** Порядок плашек реакций (как в пикере; 🔥 первым). Синхронизировать с CHAT_REACTION_EMOJI_* в lib/api-handlers/chat.js */
  var CHAT_REACTION_DISPLAY_ORDER = [
    "🔥",
    "✅",
    "👍",
    "👎",
    "❤️",
    "😂",
    "🤣",
    "😮",
    "😢",
    "🙏",
    "😍",
    "🥰",
    "😊",
    "🎉",
    "👏",
    "🙌",
    "💯",
    "✨",
    "⭐",
    "🤔",
    "😤",
    "🥳",
    "🤝",
    "💪",
    "😉",
    "😎",
    "🤩",
    "😭",
    "🤯",
    "♠️",
    "♥️",
    "♦️",
    "♣️",
    "🃏",
    "🎲",
    "🎰",
    "💰",
    "🤑",
    "🏆",
    "👑",
    "🧠",
  ];
  var CHAT_REACTION_ORDER_IDX = {};
  CHAT_REACTION_DISPLAY_ORDER.forEach(function (emOrd, idxOrd) {
    CHAT_REACTION_ORDER_IDX[emOrd] = idxOrd;
  });
  function sortChatReactionEmojiKeys(keys) {
    return keys.slice().sort(function (a, b) {
      var ia = Object.prototype.hasOwnProperty.call(CHAT_REACTION_ORDER_IDX, a) ? CHAT_REACTION_ORDER_IDX[a] : 10000;
      var ib = Object.prototype.hasOwnProperty.call(CHAT_REACTION_ORDER_IDX, b) ? CHAT_REACTION_ORDER_IDX[b] : 10000;
      if (ia !== ib) return ia - ib;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  var chatReactionHandlers = initChatReactionHandlers({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    sortChatReactionEmojiKeys: sortChatReactionEmojiKeys,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    getChatWithUserId: function () { return chatWithUserId; },
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getPersonalMessagesCache: function () { return personalMessagesCache; },
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    loadGeneral: function () { return loadGeneral(); },
    loadMessages: function () { return loadMessages(); },
    openConversation: function (userId, userName, p21Id) {
      showConv(userId, userName, p21Id);
      setTab("personal");
    },
  });
  var buildChatReactionsPillsHtml = chatReactionHandlers.buildChatReactionsPillsHtml;
  var syncChatMessageReactionsDom = chatReactionHandlers.syncChatMessageReactionsDom;
  var patchCachedMessageReactions = chatReactionHandlers.patchCachedMessageReactions;
  var patchCachedEditedMessage = chatReactionHandlers.patchCachedEditedMessage;
  var patchCachedDeletedMessage = chatReactionHandlers.patchCachedDeletedMessage;
  var chatMsgElById = chatReactionHandlers.chatMsgElById;
  var optimisticToggleChatReaction = chatReactionHandlers.optimisticToggleChatReaction;
  var sendReaction = chatReactionHandlers.sendReaction;

  var chatPolling = initChatPolling({
    base: base,
    pokerApiAuthQuery: pokerApiAuthQuery,
    getDialogsView: function () { return dialogsView; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralView: function () { return generalView; },
    getConvView: function () { return convView; },
    getChatWithUserId: function () { return chatWithUserId; },
    pokerApiHasCredential: pokerApiHasCredential,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    loadContacts: function (opts) { return loadContacts(opts); },
    loadMessages: function (opts) { return loadMessages(opts); },
  });
  var CHAT_POLL_TICK_MS = chatPolling.constants.CHAT_POLL_TICK_MS;
  var CHAT_HIDDEN_IDLE_MS = chatPolling.constants.CHAT_HIDDEN_IDLE_MS;
  var CHAT_LONG_POLL_TIMEOUT_MS = chatPolling.constants.CHAT_LONG_POLL_TIMEOUT_MS;
  var chatBurstUntilByScope = chatPolling.state.chatBurstUntilByScope;
  var chatLastPollAt = chatPolling.state.chatLastPollAt;
  var pokerChatRequestPollBurst = chatPolling.pokerChatRequestPollBurst;
  var pokerChatPollIntervalForScope = chatPolling.pokerChatPollIntervalForScope;
  var pokerChatShouldRunPoll = chatPolling.pokerChatShouldRunPoll;
  var pokerChatCanRunLongPoll = chatPolling.pokerChatCanRunLongPoll;
  var pokerChatStopLongPoll = chatPolling.pokerChatStopLongPoll;
  var pokerChatScheduleLongPoll = chatPolling.pokerChatScheduleLongPoll;
  var pokerChatRefreshLongPollTargets = chatPolling.pokerChatRefreshLongPollTargets;
  var pokerChatRecordTrace = chatPolling.pokerChatRecordTrace;


  var chatSelfPins = initChatSelfPins({
    tg: tg,
    normalizePeerIdForChat: normalizePeerIdForChat,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    escapeHtml: escapeHtml,
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    attachContextMenuForOthers: function (container, source, scrollParentOpt) {
      if (typeof attachContextMenuForOthers === "function") return attachContextMenuForOthers(container, source, scrollParentOpt);
    },
  });
  var pokerSelfPinStorageKey = chatSelfPins.pokerSelfPinStorageKey;
  var pokerLoadSelfPinsBucket = chatSelfPins.pokerLoadSelfPinsBucket;
  var pokerPersistSelfPinsBucket = chatSelfPins.pokerPersistSelfPinsBucket;
  var pokerGetSelfPin = chatSelfPins.pokerGetSelfPin;
  var pokerSetSelfPin = chatSelfPins.pokerSetSelfPin;
  var pokerClearSelfPin = chatSelfPins.pokerClearSelfPin;
  var pokerMaybeClearSelfPinIfIdMissing = chatSelfPins.pokerMaybeClearSelfPinIfIdMissing;
  var pokerBuildSelfPinRecord = chatSelfPins.pokerBuildSelfPinRecord;
  var pokerRenderSelfPinnedInnerHtml = chatSelfPins.pokerRenderSelfPinnedInnerHtml;
  var scrollChatListToMessageById = chatSelfPins.scrollChatListToMessageById;
  var bindChatPinnedBarNavigate = chatSelfPins.bindChatPinnedBarNavigate;
  var refreshChatSelfPinBars = chatSelfPins.refreshChatSelfPinBars;

  var chatGeneralLoader = initChatGeneralLoader({
    base: base,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    getPokerChatTelegramAuthState: typeof getPokerChatTelegramAuthState === "function" ? getPokerChatTelegramAuthState : null,
    getChatLongPollTimeoutMs: function () { return CHAT_LONG_POLL_TIMEOUT_MS; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralView: function () { return generalView; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getGeneralBurstUntil: function () { return chatBurstUntilByScope.general || 0; },
    getGeneralHasMoreBefore: function () { return generalHasMoreBefore; },
    setGeneralHasMoreBefore: function (value) { generalHasMoreBefore = !!value; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    getLastViewedGeneral: function () { return lastViewedGeneral; },
    setLastViewedGeneral: function (value) { lastViewedGeneral = value; },
    saveChatLastViewed: saveChatLastViewed,
    getLastGeneralMessagesSig: function () { return lastGeneralMessagesSig; },
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    getScrollGeneralToBottomOnNextRender: function () { return scrollGeneralToBottomOnNextRender; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getOptimisticGeneralPayload: function () { return chatOutgoingState.optimisticGeneralPayload; },
    POKER_NET_ERR: POKER_NET_ERR,
    mergeOptimisticGeneralIntoMessages: mergeOptimisticGeneralIntoMessages,
    mergeIncomingPushGeneralIntoMessages: mergeIncomingPushGeneralIntoMessages,
    dedupeGeneralMessagesForRender: dedupeGeneralMessagesForRender,
    peerChatIdsEqual: peerChatIdsEqual,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerChatMessageIsNewerThanViewed: pokerChatMessageIsNewerThanViewed,
    isTelegramWebApp: isTelegramWebApp,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadChatMessageSoundEnabled: pokerReadChatMessageSoundEnabled,
    pokerPlayChatMessageNotificationSound: pokerPlayChatMessageNotificationSound,
    pokerWriteGeneralSnapshotToDisk: pokerWriteGeneralSnapshotToDisk,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    generalRenderSignature: generalRenderSignature,
    chatMessagesDomHasOptimisticNode: chatMessagesDomHasOptimisticNode,
    canFastAppendMessages: canFastAppendMessages,
    fastAppendChatMessages: fastAppendChatMessages,
    buildGeneralMessagesBodyHtml: buildGeneralMessagesBodyHtml,
    bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
    attachContextMenuForOthers: attachContextMenuForOthers,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    scheduleGeneralRender: scheduleGeneralRender,
    renderGeneralAccessGate: renderGeneralAccessGate,
    updateGeneralInputLocked: updateGeneralInputLocked,
    scheduleChatPostRenderSync: scheduleChatPostRenderSync,
    updateChatHeaderStats: updateChatHeaderStats,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateUnreadDots: updateUnreadDots,
    updateDialogUnreadBadges: typeof updateDialogUnreadBadges === "function" ? updateDialogUnreadBadges : null,
    updateClubChatPreview: typeof updateClubChatPreview === "function" ? updateClubChatPreview : null,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    pokerChatRecordTrace: pokerChatRecordTrace,
    renderGeneralMessages: renderGeneralMessages,
    fastPrependChatMessages: fastPrependChatMessages,
    generalMessagesSignature: generalMessagesSignature,
  });
  var loadGeneral = chatGeneralLoader.loadGeneral;

  var generalReplyTo = null;
  var personalReplyTo = null;
  var generalImage = null;
  var personalImage = null;
  var generalDocument = null;
  var personalDocument = null;
  var generalVoice = null;
  var personalVoice = null;


  // Редактирование сообщения через окно ввода:
  // - по кнопке "Изменить" (в контекстном меню) заполняем input заново
  // - по "Отправить" выполняем PATCH и обновляем список сообщений
  var chatEditMode = false;
  var chatEditMessageId = null;
  var chatEditSource = null; // "general" | "personal"
  var chatEditWith = null; // используется для PATCH personal
  var chatEditFromName = null;

  var chatEditDeleteUi = initChatEditDeleteUi({
    escapeHtml: escapeHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getChatWithUserId: function () { return chatWithUserId; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerDraft: function (mode) { return chatComposerDrafts[mode] || ""; },
    setChatComposerDraft: function (mode, value) { chatComposerDrafts[mode] = value; },
    setChatEditMode: function (value) { chatEditMode = !!value; },
    setChatEditMessageId: function (value) { chatEditMessageId = value; },
    setChatEditSource: function (value) { chatEditSource = value; },
    setChatEditWith: function (value) { chatEditWith = value; },
    getChatEditFromName: function () { return chatEditFromName; },
    setChatEditFromName: function (value) { chatEditFromName = value; },
    setChatIsEditingMessage: function (value) { chatIsEditingMessage = !!value; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    setGeneralImage: function (value) { generalImage = value; },
    setGeneralVoice: function (value) { generalVoice = value; },
    setGeneralDocument: function (value) { generalDocument = value; },
    setPersonalImage: function (value) { personalImage = value; },
    setPersonalVoice: function (value) { personalVoice = value; },
    setPersonalDocument: function (value) { personalDocument = value; },
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: function () { if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon(); },
    updatePersonalSendBtnIcon: function () { if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon(); },
    mountChatComposer: mountChatComposer,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    chatMsgElById: chatMsgElById,
  });
  var clearChatEditUI = chatEditDeleteUi.clearChatEditUI;
  var applyEditedMessageToDom = chatEditDeleteUi.applyEditedMessageToDom;
  var applyDeletedMessageToDom = chatEditDeleteUi.applyDeletedMessageToDom;
  var startChatEdit = chatEditDeleteUi.startChatEdit;

  var chatMediaLayoutRuntime = typeof initChatMediaLayoutRuntime === "function"
    ? initChatMediaLayoutRuntime({
      snapChatMessagesToBottomIfPinned: snapChatMessagesToBottomIfPinned
    })
    : {};
  function resizeImage(file, maxW, maxH, quality) {
    if (chatMediaLayoutRuntime && typeof chatMediaLayoutRuntime.resizeImage === "function") {
      return chatMediaLayoutRuntime.resizeImage(file, maxW, maxH, quality);
    }
    return Promise.reject(new Error("chat media layout runtime unavailable"));
  }

  // Уровень приходит из Poker21 all-time формулы профиля; визуальная карточная/рыбная шкала больше не используется.
  function levelToStatusText(level) {
    var n = parseInt(level, 10);
    if (isNaN(n) || n < 1) return null;
    if (n === 53) return "джокер обычный";
    if (n === 54) return "джокер сияющий";
    if (n >= 55) return "Бог покера";
    var value = ((n - 1) % 13) + 2;
    var cardName = value <= 10 ? String(value) : value === 11 ? "валет" : value === 12 ? "дама" : value === 13 ? "король" : "туз";
    var suit = n <= 13 ? "треф" : n <= 26 ? "бубны" : n <= 39 ? "черви" : "пики";
    return cardName + " " + suit;
  }
  function pinChatMessagesToBottomImagesOnly(el) {
    if (chatMediaLayoutRuntime && typeof chatMediaLayoutRuntime.pinChatMessagesToBottomImagesOnly === "function") {
      chatMediaLayoutRuntime.pinChatMessagesToBottomImagesOnly(el);
    }
  }
  function settleChatOpeningMediaLayout(el, wrapEl, onDone) {
    if (chatMediaLayoutRuntime && typeof chatMediaLayoutRuntime.settleChatOpeningMediaLayout === "function") {
      chatMediaLayoutRuntime.settleChatOpeningMediaLayout(el, wrapEl, onDone);
    } else if (typeof onDone === "function") {
      onDone();
    }
  }
  function pinChatMessagesToBottom(el, aggressive) {
    if (chatMediaLayoutRuntime && typeof chatMediaLayoutRuntime.pinChatMessagesToBottom === "function") {
      chatMediaLayoutRuntime.pinChatMessagesToBottom(el, aggressive);
    }
  }
  /** При длинном тексте время внизу пузыря (колонка), а не справа от последней строки. */
  var CHAT_MSG_TALL_TEXT_LINE_THRESHOLD = 5;
  var CHAT_MSG_TALL_TEXT_MEASURE_TAIL_LIMIT = 90;
  function applyChatMsgTallTextTimeBelowLayout(root) {
    if (!root || !root.querySelectorAll) return;
    var mains = root.querySelectorAll(".chat-msg__body-main");
    var startIndex = Math.max(0, mains.length - CHAT_MSG_TALL_TEXT_MEASURE_TAIL_LIMIT);
    for (var i = startIndex; i < mains.length; i++) {
      var main = mains[i];
      if (
        main.classList.contains("chat-msg__body-main--with-image") ||
        main.classList.contains("chat-msg__body-main--solo-footer") ||
        main.classList.contains("chat-msg__body-main--voice-inline-time")
      ) {
        main.classList.remove("chat-msg__body-main--time-below");
        continue;
      }
      var textEl = main.querySelector(".chat-msg__text");
      if (!textEl) {
        main.classList.remove("chat-msg__body-main--time-below");
        continue;
      }
      var lh = parseFloat(window.getComputedStyle(textEl).lineHeight);
      if (!isFinite(lh) || lh <= 0) {
        var fs = parseFloat(window.getComputedStyle(textEl).fontSize) || 14;
        lh = fs * 1.35;
      }
      var lines = Math.max(1, Math.round(textEl.scrollHeight / lh));
      if (lines >= CHAT_MSG_TALL_TEXT_LINE_THRESHOLD) main.classList.add("chat-msg__body-main--time-below");
      else main.classList.remove("chat-msg__body-main--time-below");
    }
  }
  function chatMessageCalendarDayKey(ts) {
    if (ts == null || ts === "") return "";
    var d = new Date(ts);
    if (isNaN(d.getTime())) return "";
    var mo = d.getMonth() + 1;
    var da = d.getDate();
    return d.getFullYear() + "-" + (mo < 10 ? "0" : "") + mo + "-" + (da < 10 ? "0" : "") + da;
  }
  var CHAT_MONTH_GENITIVE_RU = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  /** Подпись разделителя: «6 апреля» (локальная дата сообщения). */
  function chatMessageDateLabelRu(ts) {
    if (ts == null || ts === "") return "";
    var d = new Date(ts);
    if (isNaN(d.getTime())) return "";
    var day = d.getDate();
    var mo = d.getMonth();
    if (mo < 0 || mo > 11) return "";
    return day + " " + CHAT_MONTH_GENITIVE_RU[mo];
  }
  /** Разделитель при смене дня относительно предыдущего сообщения в ленте (локальный календарь). */
  function chatDayDividerHtmlBeforeMessage(prevMsg, msg) {
    if (!msg || !msg.time) return "";
    var kCur = chatMessageCalendarDayKey(msg.time);
    if (!kCur) return "";
    if (!prevMsg || !prevMsg.time) return "";
    var kPrev = chatMessageCalendarDayKey(prevMsg.time);
    if (kPrev === kCur) return "";
    var lab = chatMessageDateLabelRu(msg.time);
    if (!lab) return "";
    return '<div class="chat-day-divider" role="separator" aria-label="' + escapeHtml(lab) + '"><span class="chat-day-divider__label">' + escapeHtml(lab) + "</span></div>";
  }

  /** Низ ленты — сразу и с высоким приоритетом; старые фото — lazy, без перегруза канала. */
  var CHAT_MSG_IMG_TAIL_PRIORITIZED = 5;
  function chatMsgImageAttrs(idx, len) {
    if (len <= CHAT_MSG_IMG_TAIL_PRIORITIZED || idx >= len - CHAT_MSG_IMG_TAIL_PRIORITIZED) {
      return ' loading="eager" decoding="async" fetchpriority="high"';
    }
    return ' loading="lazy" decoding="async"';
  }
  var CHAT_MSG_AVATAR_IMG_ATTRS = ' width="36" height="36" loading="lazy" decoding="async"';

  function chatDocumentBlockHtml(documentUrl, documentName) {
    var rawUrl = documentUrl != null ? String(documentUrl) : "";
    if (!rawUrl) return "";
    var name = documentName != null && String(documentName).trim() ? String(documentName).trim() : "document.pdf";
    var docHref = escapeHtml(rawUrl);
    var docNameEsc = escapeHtml(name);
    return (
      '<span class="chat-msg__document chat-msg__document-wrap" data-document-name="' +
      docNameEsc +
      '">' +
      '<a class="chat-msg__document-link chat-msg__document-link--view" href="' +
      docHref +
      '">📄 ' +
      docNameEsc +
      '</a>' +
      '<div class="chat-msg__document-actions">' +
      '<button type="button" class="chat-msg__document-btn chat-msg__document-btn--download" data-chat-pdf-download="1">Скачать</button>' +
      '<button type="button" class="chat-msg__document-btn chat-msg__document-btn--share" data-chat-pdf-share="1">Поделиться</button>' +
      "</div></span>"
    );
  }

  function bindChatMsgNameProfileButtons(rootEl) {
    if (!rootEl || typeof window.openChatUserModalById !== "function") return;
    rootEl.querySelectorAll(".chat-msg__name-btn").forEach(function (btn) {
      var avatar = btn.dataset.pmAvatar || "";
      function openUserModal() {
        window.openChatUserModalById(btn.dataset.pmId, btn.dataset.pmName, avatar);
      }
      btn.addEventListener("click", function () {
        if (chatNameBtnLongPressHandled) {
          chatNameBtnLongPressHandled = false;
          return;
        }
        openUserModal();
      });
      btn.addEventListener(
        "touchstart",
        function () {
          if (chatNameBtnLongPressTimer) return;
          chatNameBtnLongPressTimer = setTimeout(function () {
            chatNameBtnLongPressTimer = null;
            chatNameBtnLongPressHandled = true;
            if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
            openUserModal();
          }, 500);
        },
        { passive: true }
      );
      btn.addEventListener("touchend", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("touchcancel", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("mousedown", function () {
        if (chatNameBtnLongPressTimer) return;
        chatNameBtnLongPressTimer = setTimeout(function () {
          chatNameBtnLongPressTimer = null;
          chatNameBtnLongPressHandled = true;
          if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
          openUserModal();
        }, 500);
      });
      btn.addEventListener("mouseup", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("mouseleave", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
    });
  }

  var chatMessageRenderRuntime = null;
  function renderGeneralMessages(messages) {
    if (chatMessageRenderRuntime && typeof chatMessageRenderRuntime.renderGeneralMessages === "function") {
      return chatMessageRenderRuntime.renderGeneralMessages(messages);
    }
  }

  var chatContextMenuHandlers = initChatContextMenuHandlers({
    base: base,
    tg: tg,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    pokerEventPathHasChatVoiceUi: pokerEventPathHasChatVoiceUi,
    getChatIsAdmin: function () { return chatIsAdmin; },
    getChatWithUserId: function () { return chatWithUserId; },
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    focusChatComposerForReply: focusChatComposerForReply,
    sendReaction: sendReaction,
    clearChatEditUI: clearChatEditUI,
    startChatEdit: startChatEdit,
    prepareChatDeleteConfirm: prepareChatDeleteConfirm,
    patchCachedDeletedMessage: patchCachedDeletedMessage,
    applyDeletedMessageToDom: applyDeletedMessageToDom,
    loadGeneral: function () { return loadGeneral(); },
    loadMessages: function () { return loadMessages(); },
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerBuildSelfPinRecord: pokerBuildSelfPinRecord,
    pokerSetSelfPin: pokerSetSelfPin,
    pokerClearSelfPin: pokerClearSelfPin,
  });
  var pokerChatFinePointerLikeDesktop = chatContextMenuHandlers.pokerChatFinePointerLikeDesktop;
  var attachContextMenuForOthers = chatContextMenuHandlers.attachContextMenuForOthers;


  var sendingGeneral = false;
  var sendingGeneralSince = 0;
  var chatGeneralSender = initChatGeneralSender({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    chatOutgoingState: chatOutgoingState,
    escapeHtml: escapeHtml,
    getGeneralMessagesEl: function () { return generalMessages; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
    getSendingGeneral: function () { return sendingGeneral; },
    setSendingGeneral: function (value) { sendingGeneral = !!value; },
    getSendingGeneralSince: function () { return sendingGeneralSince; },
    setSendingGeneralSince: function (value) { sendingGeneralSince = Number(value) || 0; },
    getGeneralImage: function () { return generalImage; },
    setGeneralImage: function (value) { generalImage = value; },
    getGeneralVoice: function () { return generalVoice; },
    setGeneralVoice: function (value) { generalVoice = value; },
    getGeneralDocument: function () { return generalDocument; },
    setGeneralDocument: function (value) { generalDocument = value; },
    getGeneralReplyTo: function () { return generalReplyTo; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    getChatEditMode: function () { return chatEditMode; },
    getChatEditSource: function () { return chatEditSource; },
    getChatEditMessageId: function () { return chatEditMessageId; },
    getChatActiveTab: function () { return chatActiveTab; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    getChatComposerEl: function () { return chatComposerEl; },
    clearGeneralComposerDraft: function () { chatComposerDrafts.general = ""; },
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    getChatGeneralText: getChatGeneralText,
    pokerApiHasCredential: pokerApiHasCredential,
    setGeneralSendBusy: setGeneralSendBusy,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    patchCachedEditedMessage: patchCachedEditedMessage,
    applyEditedMessageToDom: applyEditedMessageToDom,
    clearChatEditUI: clearChatEditUI,
    chatMsgElById: chatMsgElById,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    appendChatVoiceToTextWrap: appendChatVoiceToTextWrap,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pinChatMessagesToBottom: typeof pinChatMessagesToBottom === "function" ? pinChatMessagesToBottom : null,
    pokerChatRunAfterPaint: pokerChatRunAfterPaint,
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
    shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
    focusChatComposerForDesktop: focusChatComposerForDesktop,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    generalMessagesSignature: generalMessagesSignature,
    renderGeneralMessages: renderGeneralMessages,
    chatCloneRetryPayload: chatCloneRetryPayload,
    markLatestOptimisticMessageFailed: markLatestOptimisticMessageFailed,
  });
  var appendOptimisticGeneralMessage = chatGeneralSender.appendOptimisticGeneralMessage;
  var sendGeneral = chatGeneralSender.sendGeneral;

  var chatConversationShell = initChatConversationShell({
    tg: tg,
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getConvTitle: function () { return convTitle; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getConvPeerAvatarPh: function () { return convPeerAvatarPh; },
    getConvPeerAvatar: function () { return convPeerAvatar; },
    getMessagesEl: function () { return messagesEl; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    setPersonalImage: function (value) { personalImage = value; },
    setPersonalVoice: function (value) { personalVoice = value; },
    setConvGroupCanChangeAvatar: setConvGroupCanChangeAvatar,
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    pokerGetActivePushDmTarget: function () {
      if (typeof pokerGetActivePushDmTarget === "function") return pokerGetActivePushDmTarget();
      return "";
    },
    pokerPushOpenDebug: pokerPushOpenDebug,
    pokerGuardDefaultDialogsOpen: typeof pokerGuardDefaultDialogsOpen === "function" ? pokerGuardDefaultDialogsOpen : null,
    pokerPushOpenTraceTransition: pokerPushOpenTraceTransition,
    setChatConvTitleIdText: setChatConvTitleIdText,
    clearConvPeerAvatarHeader: clearConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    updateChatHeaderStats: updateChatHeaderStats,
    loadContacts: loadContacts,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    setChatConvTitleFish: setChatConvTitleFish,
    peerChatIdsEqual: peerChatIdsEqual,
    setChatPeerVerified: setChatPeerVerified,
    normalizePeerIdForChat: normalizePeerIdForChat,
    syncConvGroupAvatarEditUi: syncConvGroupAvatarEditUi,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    applyConvGroupDescription: applyConvGroupDescription,
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    pokerHydrateOpenDmHeaderFromContacts: hydrateOpenDmHeaderFromContactsLocal,
    pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
    getPersonalMessagesSnapshotForOpen: getPersonalMessagesSnapshotForOpen,
    pokerMessagesForFastOpenSnapshot: pokerMessagesForFastOpenSnapshot,
    personalRenderSignature: personalRenderSignature,
    renderMessages: renderMessages,
    pokerSchedulePushDmHeaderHydrate: scheduleDmHeaderHydrateLocal,
    loadMessages: function (opts) { return loadMessages(opts); },
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
  });
  var showList = chatConversationShell.showList;
  var showConv = chatConversationShell.showConv;






  var chatFriendActions = initChatFriendActions({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerApiHasCredential: pokerApiHasCredential,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatPeerIdIsFriend: typeof pokerChatPeerIdIsFriend === "function" ? pokerChatPeerIdIsFriend : null,
    pokerApplyLocalFriendToChatContacts: typeof pokerApplyLocalFriendToChatContacts === "function" ? pokerApplyLocalFriendToChatContacts : null,
    pokerRemoveLocalFriendFromChatContacts: typeof pokerRemoveLocalFriendFromChatContacts === "function" ? pokerRemoveLocalFriendFromChatContacts : null,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
  });
  var pokerDebugChatFriendAction = chatFriendActions.pokerDebugChatFriendAction;
  var syncChatDialogPreviewAddFriendBtn = chatFriendActions.syncChatDialogPreviewAddFriendBtn;
  var pokerChatAddFriendWithPrompt = chatFriendActions.pokerChatAddFriendWithPrompt;
  try {
    window.__pokerDebugChatFriendAction = pokerDebugChatFriendAction;
  } catch (eDbgExpose) {}

  var chatOverscrollDebugRuntime = typeof initChatOverscrollDebugRuntime === "function"
    ? initChatOverscrollDebugRuntime({
      shouldShowChatKeyboardDebugPanel: shouldShowChatKeyboardDebugPanel,
      logChatKeyboardDebug: logChatKeyboardDebug,
      getChatKeyboardDebugSnapshot: getChatKeyboardDebugSnapshot,
      getVisibleMessagesEl: function () { return typeof getVisibleMessagesEl === "function" ? getVisibleMessagesEl() : null; },
      getActiveChatInputArea: getActiveChatInputArea,
      isTelegramChatRuntime: isTelegramChatRuntime,
      generalView: function () { return generalView; },
      convView: function () { return convView; },
      chatActiveTab: function () { return chatActiveTab; },
      chatComposerMounted: function () { return chatComposerMounted; },
      chatSharedComposerEl: function () { return chatSharedComposerEl; },
      chatGeneralComposerEl: function () { return chatGeneralComposerEl; },
      chatPersonalComposerEl: function () { return chatPersonalComposerEl; },
      chatComposerEl: function () { return chatComposerEl; },
    })
    : {};
  function pokerDebugChatOverscroll(stage, payload) {
    if (chatOverscrollDebugRuntime && typeof chatOverscrollDebugRuntime.pokerDebugChatOverscroll === "function") {
      chatOverscrollDebugRuntime.pokerDebugChatOverscroll(stage, payload);
    }
  }
  function collectChatOverscrollSnapshot(stage, focusTarget, extra) {
    if (chatOverscrollDebugRuntime && typeof chatOverscrollDebugRuntime.collectChatOverscrollSnapshot === "function") {
      chatOverscrollDebugRuntime.collectChatOverscrollSnapshot(stage, focusTarget, extra);
    }
  }


  if (typeof initChatContactSwipeActions === "function") {
    initChatContactSwipeActions({
      contactsEl: contactsEl,
      base: base,
      tg: tg,
      POKER_NET_ERR: POKER_NET_ERR,
      loadContacts: function (opts) { return loadContacts(opts); },
      pokerApiAuthJsonBody: pokerApiAuthJsonBody,
      pokerDebugChatFriendAction: typeof pokerDebugChatFriendAction === "function" ? pokerDebugChatFriendAction : null,
      pokerChatAddFriendWithPrompt: typeof pokerChatAddFriendWithPrompt === "function" ? pokerChatAddFriendWithPrompt : null,
      pokerRemoveLocalFriendFromChatContacts: typeof pokerRemoveLocalFriendFromChatContacts === "function" ? pokerRemoveLocalFriendFromChatContacts : null,
      pokerApplyLocalFriendToChatContacts: typeof pokerApplyLocalFriendToChatContacts === "function" ? pokerApplyLocalFriendToChatContacts : null,
      pokerChatPeerIdIsFriend: typeof pokerChatPeerIdIsFriend === "function" ? pokerChatPeerIdIsFriend : null,
    });
  }

  function loadAdminsOnline() {
    if (!adminsView || !pokerApiHasCredential()) return;
    var url = base + "/api/chat" + pokerApiAuthQuery("?") + "&mode=adminOnline";
    fetch(url, { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.onlineAdminIds)) return;
      var onlineSet = new Set(data.onlineAdminIds);
      adminsView.querySelectorAll(".chat-manager-btn[data-chat-user-id]").forEach(function (btn) {
        var id = btn.dataset.chatUserId;
        var onEl = btn.querySelector(".chat-admins-view__online");
        if (onEl) onEl.classList.toggle("chat-admins-view__online--visible", onlineSet.has(id));
      });
    }).catch(function () {});
  }

  function prepareChatDeleteConfirm() {
    try {
      var active = document.activeElement;
      if (active && active === chatComposerEl && typeof active.blur === "function") {
        active.blur();
      }
    } catch (e) {}
    if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
      window.__pokerFinalizeChatKeyboardDismiss();
    } else {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
        window.__pokerClearChatKeyboardViewportState();
      }
    }
  }

  chatMessageRenderRuntime = typeof initChatMessageRenderRuntime === "function"
    ? initChatMessageRenderRuntime({
      generalMessages: generalMessages,
      messagesEl: messagesEl,
      base: base,
      personalMessagesCache: personalMessagesCache,
      personalHasMoreBeforeByPeer: personalHasMoreBeforeByPeer,
      POKER_CHAT_DISK_PERSONAL_MAX_MSG: POKER_CHAT_DISK_PERSONAL_MAX_MSG,
      getChatWithUserId: function () { return chatWithUserId; },
      getGeneralHasMoreBefore: function () { return generalHasMoreBefore; },
      getScrollGeneralToBottomOnNextRender: function () { return scrollGeneralToBottomOnNextRender; },
      setScrollGeneralToBottomOnNextRender: function (value) { scrollGeneralToBottomOnNextRender = !!value; },
      getScrollPersonalToBottomOnNextRender: function () { return scrollPersonalToBottomOnNextRender; },
      setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
      buildGeneralMessagesBodyHtml: buildGeneralMessagesBodyHtml,
      buildPersonalMessagesBodyHtml: buildPersonalMessagesBodyHtml,
      renderLoadOlderButtonHtml: renderLoadOlderButtonHtml,
      pokerMaybeClearSelfPinIfIdMissing: pokerMaybeClearSelfPinIfIdMissing,
      refreshChatSelfPinBars: refreshChatSelfPinBars,
      scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
      applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
      pinChatMessagesToBottomImagesOnly: pinChatMessagesToBottomImagesOnly,
      settleChatOpeningMediaLayout: settleChatOpeningMediaLayout,
      pinChatMessagesToBottom: pinChatMessagesToBottom,
      bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
      pokerApiHasCredential: pokerApiHasCredential,
      pokerApiAuthJsonBody: pokerApiAuthJsonBody,
      prepareChatDeleteConfirm: prepareChatDeleteConfirm,
      loadGeneral: function () { return loadGeneral(); },
      loadMessages: function () { return loadMessages(); },
      startChatEdit: startChatEdit,
      resolveMyChatDisplayName: resolveMyChatDisplayName,
      attachContextMenuForOthers: attachContextMenuForOthers
    })
    : null;
  function renderMessages(messages) {
    if (chatMessageRenderRuntime && typeof chatMessageRenderRuntime.renderMessages === "function") {
      return chatMessageRenderRuntime.renderMessages(messages);
    }
  }

  var chatDialogPreviewRuntime = typeof initChatDialogPreviewRuntime === "function"
    ? initChatDialogPreviewRuntime({
        base: base,
        escapeHtml: escapeHtml,
        pokerApiAuthQuery: pokerApiAuthQuery,
        pokerApiHasCredential: pokerApiHasCredential,
        peerChatIdsEqual: peerChatIdsEqual,
        resolveMyChatMemberId: resolveMyChatMemberId,
        getPersonalMessagesSnapshotForOpen: typeof getPersonalMessagesSnapshotForOpen === "function" ? getPersonalMessagesSnapshotForOpen : null,
        getPersonalReceiptState: typeof getPersonalReceiptState === "function" ? getPersonalReceiptState : null,
        chatMessageBodyHtml: chatMessageBodyHtml,
        pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
        chatMsgImageAttrs: chatMsgImageAttrs,
        chatMsgVoiceOnlyNoCaption: chatMsgVoiceOnlyNoCaption,
        chatVoiceMessageHtml: chatVoiceMessageHtml,
        chatDocumentBlockHtml: chatDocumentBlockHtml,
        CHAT_MSG_AVATAR_IMG_ATTRS: CHAT_MSG_AVATAR_IMG_ATTRS,
        pokerProfileStatusFishLevel: typeof pokerProfileStatusFishLevel === "function" ? pokerProfileStatusFishLevel : null,
        chatProfileStatusLevelHtml: typeof chatProfileStatusLevelHtml === "function" ? chatProfileStatusLevelHtml : null,
        pokerProfileStatusFishIconHtml: typeof pokerProfileStatusFishIconHtml === "function" ? pokerProfileStatusFishIconHtml : null,
        chatPokerPlusVerifiedBadgeHtml: typeof chatPokerPlusVerifiedBadgeHtml === "function" ? chatPokerPlusVerifiedBadgeHtml : null,
        sortChatReactionEmojiKeys: sortChatReactionEmojiKeys,
        chatDayDividerHtmlBeforeMessage: chatDayDividerHtmlBeforeMessage,
        bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
        applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
        syncChatDialogPreviewAddFriendBtn: typeof syncChatDialogPreviewAddFriendBtn === "function" ? syncChatDialogPreviewAddFriendBtn : null,
        pokerChatAddFriendWithPrompt: typeof pokerChatAddFriendWithPrompt === "function" ? pokerChatAddFriendWithPrompt : null,
        openConvFromDialogs: openConvFromDialogs,
      })
    : {};
  var openChatDialogPreviewModal = chatDialogPreviewRuntime.openChatDialogPreviewModal || function () {};

  var chatPersonalLoader = initChatPersonalLoader({
    base: base,
    POKER_NET_ERR: POKER_NET_ERR,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    getChatWithUserId: function () { return chatWithUserId; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getMessagesEl: function () { return messagesEl; },
    getConvView: function () { return convView; },
    getConvTitle: function () { return convTitle; },
    getConvTitleId: function () { return convTitleId; },
    getConvPeerAvatarPh: function () { return convPeerAvatarPh; },
    getConvPeerAvatar: function () { return convPeerAvatar; },
    getChatLongPollTimeoutMs: function () { return CHAT_LONG_POLL_TIMEOUT_MS; },
    getPersonalBurstUntil: function () { return chatBurstUntilByScope.personal || 0; },
    getPersonalHasMoreBefore: function (peerId) { return !!personalHasMoreBeforeByPeer[peerId]; },
    setPersonalHasMoreBefore: function (peerId, value) { personalHasMoreBeforeByPeer[peerId] = !!value; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setChatPeerTypingActive: chatPresenceTyping.setChatPeerTypingActive,
    setConvGroupCanChangeAvatar: setConvGroupCanChangeAvatar,
    getChatActiveTab: function () { return chatActiveTab; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getLastPersonalMessagesSig: function () { return lastPersonalMessagesSig; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    getOptimisticPersonalPayload: function () { return chatOutgoingState.optimisticPersonalPayload; },
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    mergeOptimisticPersonalIntoMessages: mergeOptimisticPersonalIntoMessages,
    mergeIncomingPushPersonalIntoMessages: mergeIncomingPushPersonalIntoMessages,
    dedupePersonalMessagesForRender: dedupePersonalMessagesForRender,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setTextContentIfChanged: setTextContentIfChanged,
    resolveMyChatMemberId: resolveMyChatMemberId,
    enrichPersonalThreadPeerMeta: enrichPersonalThreadPeerMeta,
    setChatConvTitleIdText: setChatConvTitleIdText,
    setChatPeerVerified: setChatPeerVerified,
    setChatConvTitleFish: setChatConvTitleFish,
    updateConvTypingUi: updateConvTypingUi,
    syncConvGroupAvatarEditUi: syncConvGroupAvatarEditUi,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    normalizePeerIdForChat: normalizePeerIdForChat,
    lastViewedPersonal: lastViewedPersonal,
    pokerChatMessageIsNewerThanViewed: pokerChatMessageIsNewerThanViewed,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadChatMessageSoundEnabled: pokerReadChatMessageSoundEnabled,
    pokerPlayChatMessageNotificationSound: pokerPlayChatMessageNotificationSound,
    saveChatLastViewed: saveChatLastViewed,
    personalRenderSignature: personalRenderSignature,
    pokerWritePersonalPeerSnapshotToDisk: pokerWritePersonalPeerSnapshotToDisk,
    chatMessagesDomHasOptimisticNode: chatMessagesDomHasOptimisticNode,
    canFastAppendMessages: canFastAppendMessages,
    fastAppendChatMessages: fastAppendChatMessages,
    buildPersonalMessagesBodyHtml: buildPersonalMessagesBodyHtml,
    bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
    attachContextMenuForOthers: attachContextMenuForOthers,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    schedulePersonalRender: schedulePersonalRender,
    scheduleChatPostRenderSync: scheduleChatPostRenderSync,
    updateChatHeaderStats: updateChatHeaderStats,
    applyConvGroupDescription: applyConvGroupDescription,
    updateUnreadDots: updateUnreadDots,
    renderMessages: renderMessages,
    fastPrependChatMessages: fastPrependChatMessages,
  });
  var loadMessages = chatPersonalLoader.loadMessages;

  var sendingPrivate = false;
  var chatPersonalSender = initChatPersonalSender({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    chatOutgoingState: chatOutgoingState,
    escapeHtml: escapeHtml,
    getMessagesEl: function () { return messagesEl; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
    getSendingPrivate: function () { return sendingPrivate; },
    setSendingPrivate: function (value) { sendingPrivate = !!value; },
    getChatWithUserId: function () { return chatWithUserId; },
    getPersonalImage: function () { return personalImage; },
    setPersonalImage: function (value) { personalImage = value; },
    getPersonalVoice: function () { return personalVoice; },
    setPersonalVoice: function (value) { personalVoice = value; },
    getPersonalDocument: function () { return personalDocument; },
    setPersonalDocument: function (value) { personalDocument = value; },
    getPersonalReplyTo: function () { return personalReplyTo; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    getChatEditMode: function () { return chatEditMode; },
    getChatEditSource: function () { return chatEditSource; },
    getChatEditMessageId: function () { return chatEditMessageId; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    getChatComposerEl: function () { return chatComposerEl; },
    clearPersonalComposerDraft: function () { chatComposerDrafts.personal = ""; },
    getChatTypingStopTimer: chatPresenceTyping.getChatTypingStopTimer,
    setChatTypingStopTimer: chatPresenceTyping.setChatTypingStopTimer,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    getChatPersonalText: getChatPersonalText,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadPwaGuestMode: pokerReadPwaGuestMode,
    setPersonalSendBusy: setPersonalSendBusy,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    patchCachedEditedMessage: patchCachedEditedMessage,
    applyEditedMessageToDom: applyEditedMessageToDom,
    clearChatEditUI: clearChatEditUI,
    chatMsgElById: chatMsgElById,
    loadMessages: function (opts) { return loadMessages(opts); },
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    appendChatVoiceToTextWrap: appendChatVoiceToTextWrap,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerChatSendTypingState: pokerChatSendTypingState,
    pinChatMessagesToBottom: typeof pinChatMessagesToBottom === "function" ? pinChatMessagesToBottom : null,
    pokerChatRunAfterPaint: pokerChatRunAfterPaint,
    resizeChatTextarea: resizeChatTextarea,
    updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
    shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
    focusChatComposerForDesktop: focusChatComposerForDesktop,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    personalMessagesCache: personalMessagesCache,
    personalMessagesCacheMeta: personalMessagesCacheMeta,
    personalRenderSignature: personalRenderSignature,
    renderMessages: renderMessages,
    chatCloneRetryPayload: chatCloneRetryPayload,
    markLatestOptimisticMessageFailed: markLatestOptimisticMessageFailed,
  });
  var appendOptimisticPersonalMessage = chatPersonalSender.appendOptimisticPersonalMessage;
  var sendMessage = chatPersonalSender.sendMessage;

  /**
   * Фоновое обновление кэшей чата (contacts + general, trackSeen=0) до захода на вкладку «Чат».
   * Не трогает lastViewed / звук; DOM списка обновляет только если уже data-view=chat.
   */
  function ingestBootstrapGeneralSnapshot(data) {
    if (!data || !data.ok) return;
    chatIsAdmin = !!data.isAdmin;
    if (data.isAdmin && typeof window.pokerMarkAdminAccess === "function") {
      window.pokerMarkAdminAccess("chat-bootstrap");
    }
    if (data.clubChatAccess != null) clubChatAccess = data.clubChatAccess;
    if (data.clubChatPendingReviewCount != null) {
      window.chatClubPendingReviewCount = Math.max(0, parseInt(data.clubChatPendingReviewCount, 10) || 0);
    } else if (!data.isAdmin) {
      window.chatClubPendingReviewCount = 0;
    }
    var access = data.clubChatAccess != null ? data.clubChatAccess : "open";
    var noGeneralAccess = !chatIsAdmin && (access === "need_apply" || access === "pending" || access === "revoked");
    var messages = data.messages || [];
    if (noGeneralAccess) messages = [];
    var pendingBg = window._pendingGeneralMessage;
    if (pendingBg && pendingBg.id && !messages.some(function (m) { return m.id === pendingBg.id; })) {
      messages = messages.concat([pendingBg]);
    } else if (pendingBg && pendingBg.id) {
      window._pendingGeneralMessage = null;
    }
    messages = mergeOptimisticGeneralIntoMessages(messages);
    window._chatGeneralCache = {
      messages: messages,
      participantsCount: data.participantsCount,
      onlineCount: data.onlineCount,
      generalPinned: data.generalPinned != null ? data.generalPinned : null,
      generalMembers: Array.isArray(data.generalMembers) ? data.generalMembers : [],
    };
    if (!noGeneralAccess) {
      try {
        pokerWriteGeneralSnapshotToDisk(window._chatGeneralCache);
      } catch (eSnapB) {}
    }
    try {
      refreshChatSelfPinBars();
    } catch (ePinB) {}
    var totalB = data.participantsCount != null ? data.participantsCount : "—";
    window.lastGeneralStats = totalB !== "—" ? String(totalB) + " уч" : "";
    try {
      updateChatHeaderStats();
    } catch (eHdrB) {}
    try {
      syncClubChatRosterUi();
    } catch (eRosterB) {}
    try {
      if (typeof updateClubChatPreview === "function") updateClubChatPreview(messages);
    } catch (ePrevB) {}
    try {
      if (typeof updateDialogUnreadBadges === "function") updateDialogUnreadBadges();
    } catch (eDlgB) {}
  }

  if (typeof initChatBootstrapPrefetchRuntime === "function") {
    var chatBootstrapPrefetchDeps = {};
    Object.defineProperties(chatBootstrapPrefetchDeps, {
      personalMessagesCache: { get: function () { return personalMessagesCache; } },
      chatWithUserId: { get: function () { return chatWithUserId; } },
      lastViewedPersonal: { get: function () { return lastViewedPersonal; } },
      lastViewedGeneral: { get: function () { return lastViewedGeneral; } },
      base: { get: function () { return base; } }
    });
    Object.assign(chatBootstrapPrefetchDeps, {
      pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
      peerChatIdsEqual: peerChatIdsEqual,
      prefetchPersonalMessages: prefetchPersonalMessages,
      pokerReadPwaGuestMode: typeof pokerReadPwaGuestMode === "function" ? pokerReadPwaGuestMode : null,
      pokerApiHasCredential: typeof pokerApiHasCredential === "function" ? pokerApiHasCredential : null,
      pokerChatContactsAuthFingerprint: pokerChatContactsAuthFingerprint,
      pokerApiAuthQuery: pokerApiAuthQuery,
      pokerWriteContactsCache: pokerWriteContactsCache,
      applyContactsApiResponse: applyContactsApiResponse,
      prefetchTopPersonalDialogs: prefetchTopPersonalDialogs,
      ingestBootstrapGeneralSnapshot: ingestBootstrapGeneralSnapshot,
      isTelegramWebApp: typeof isTelegramWebApp === "function" ? isTelegramWebApp : null
    });
    chatBootstrapPrefetchRuntime = initChatBootstrapPrefetchRuntime(chatBootstrapPrefetchDeps) || {};
  }

  if (!chatListenersAttached) {
    chatListenersAttached = true;
    window.chatListenersAttached = true;
    document.addEventListener("visibilitychange", function () {
      try {
        if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
      } catch (eVisDm) {}
    });
    try {
      window.addEventListener("blur", function () {
        try {
          if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
        } catch (eBl) {}
      });
      window.addEventListener("focus", function () {
        try {
          if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
        } catch (eFo) {}
      });
      window.addEventListener("pagehide", function () {
        try {
          if (typeof window.__pokerStopChatDmFocusSession === "function") window.__pokerStopChatDmFocusSession();
        } catch (ePh) {}
      });
    } catch (eWinDm) {}
    (function schedulePrefetchChatContactsCache() {
      var runBoot = function () {
        try {
          if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
            window.__pokerScheduleChatBootstrapFetch();
          }
        } catch (ePf) {}
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runBoot, 0);
      } else {
        var idle = window.requestIdleCallback || function (cb) {
          setTimeout(cb, 120);
        };
        idle(runBoot);
      }
    })();
    var chatEmojiPicker = document.getElementById("chatEmojiPicker");
    var chatEmojiPickerTargetInput = null;
    var chatEmojiPickerRuntime = null;
    var isChatPhysicalKeyboardContext = null;
    var pokerPwaStandaloneForKeyboardInset = null;
    var isIosLikeForChatViewport = null;
    var isChatKeyboardLayoutEffectivelyClosed = null;
    var isRecentIosPwaChatComposerUserDismiss = null;
    var clearPendingChatKeyboardDismissTimers = null;
    var markIosPwaChatComposerKeepAlive = null;
    var maybeApplyCssOnlyIosPwaChatComposerDock = null;
    var updateChatMessagesKeyboardPad = null;
    var isChatComposerVirtualKeyboardOpenForRetention = null;
    function hideChatEmojiPicker() {
      if (chatEmojiPickerRuntime && typeof chatEmojiPickerRuntime.hideChatEmojiPicker === "function") {
        return chatEmojiPickerRuntime.hideChatEmojiPicker();
      }
      if (!chatEmojiPicker) return;
      chatEmojiPicker.classList.add("chat-emoji-picker--hidden");
      chatEmojiPicker.setAttribute("aria-hidden", "true");
      chatEmojiPickerTargetInput = null;
    }
    if (typeof initChatKeyboardDockRuntime === "function") {
      var chatKeyboardDockRuntimeDeps = {};
      Object.defineProperties(chatKeyboardDockRuntimeDeps, {
        CHAT_SCROLL_BOTTOM_NEAR_PX: { get: function () { return 100; } },
        CHAT_SCROLL_BOTTOM_REARM_PX: { get: function () { return 220; } },
        chatActiveTab: { get: function () { return chatActiveTab; } },
        chatComposerEl: { get: function () { return chatComposerEl; }, set: function (value) { chatComposerEl = value; } },
        chatComposerMounted: { get: function () { return chatComposerMounted; } },
        chatSharedComposerEl: { get: function () { return chatSharedComposerEl; } },
        chatGeneralComposerEl: { get: function () { return chatGeneralComposerEl; }, set: function (value) { chatGeneralComposerEl = value; } },
        chatPersonalComposerEl: { get: function () { return chatPersonalComposerEl; }, set: function (value) { chatPersonalComposerEl = value; } },
        chatGeneralComposerMount: { get: function () { return chatGeneralComposerMount; } },
        chatPersonalComposerMount: { get: function () { return chatPersonalComposerMount; } },
        chatIosComposeOverlayOpening: { get: function () { return chatIosComposeOverlayOpening; }, set: function (value) { chatIosComposeOverlayOpening = value; } },
        chatEmojiPicker: { get: function () { return chatEmojiPicker; } },
        chatEmojiPickerTargetInput: { get: function () { return chatEmojiPickerTargetInput; }, set: function (value) { chatEmojiPickerTargetInput = value; } },
        generalView: { get: function () { return generalView; } },
        convView: { get: function () { return convView; } },
        generalMessages: { get: function () { return generalMessages; } },
        messagesEl: { get: function () { return messagesEl; } }
      });
      Object.assign(chatKeyboardDockRuntimeDeps, {
        chatMessagesBottomGap: chatMessagesBottomGap,
        chatMessagesNearBottom: chatMessagesNearBottom,
        chatMessagesShouldFollowKeyboardLift: chatMessagesShouldFollowKeyboardLift,
        scheduleChatKeyboardBottomFollow: scheduleChatKeyboardBottomFollow,
        shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
        resizeChatTextarea: resizeChatTextarea,
        getActiveChatInputArea: getActiveChatInputArea,
        getDirectChatComposer: getDirectChatComposer,
        isPokerIosPwaKeyboardRuntime: isPokerIosPwaKeyboardRuntime,
        syncChatInertForIosAccessory: syncChatInertForIosAccessory,
        shouldUseTelegramIosComposeOverlay: shouldUseTelegramIosComposeOverlay,
        openTelegramIosComposeOverlay: openTelegramIosComposeOverlay,
        detachTelegramIosChatComposerOverlayViewportSync: detachTelegramIosChatComposerOverlayViewportSync,
        scheduleTelegramIosChatComposerOverlaySync: scheduleTelegramIosChatComposerOverlaySync,
        logChatKeyboardDebug: logChatKeyboardDebug,
        collectChatOverscrollSnapshot: collectChatOverscrollSnapshot,
        hideChatEmojiPicker: hideChatEmojiPicker
      });
      initChatKeyboardDockRuntime(chatKeyboardDockRuntimeDeps);
      isChatPhysicalKeyboardContext = typeof chatKeyboardDockRuntimeDeps.isChatPhysicalKeyboardContext === "function" ? chatKeyboardDockRuntimeDeps.isChatPhysicalKeyboardContext : null;
      pokerPwaStandaloneForKeyboardInset = typeof chatKeyboardDockRuntimeDeps.pokerPwaStandaloneForKeyboardInset === "function" ? chatKeyboardDockRuntimeDeps.pokerPwaStandaloneForKeyboardInset : null;
      isIosLikeForChatViewport = typeof chatKeyboardDockRuntimeDeps.isIosLikeForChatViewport === "function" ? chatKeyboardDockRuntimeDeps.isIosLikeForChatViewport : null;
      isChatKeyboardLayoutEffectivelyClosed = typeof chatKeyboardDockRuntimeDeps.isChatKeyboardLayoutEffectivelyClosed === "function" ? chatKeyboardDockRuntimeDeps.isChatKeyboardLayoutEffectivelyClosed : null;
      isRecentIosPwaChatComposerUserDismiss = typeof chatKeyboardDockRuntimeDeps.isRecentIosPwaChatComposerUserDismiss === "function" ? chatKeyboardDockRuntimeDeps.isRecentIosPwaChatComposerUserDismiss : null;
      clearPendingChatKeyboardDismissTimers = typeof chatKeyboardDockRuntimeDeps.clearPendingChatKeyboardDismissTimers === "function" ? chatKeyboardDockRuntimeDeps.clearPendingChatKeyboardDismissTimers : null;
      markIosPwaChatComposerKeepAlive = typeof chatKeyboardDockRuntimeDeps.markIosPwaChatComposerKeepAlive === "function" ? chatKeyboardDockRuntimeDeps.markIosPwaChatComposerKeepAlive : null;
      maybeApplyCssOnlyIosPwaChatComposerDock = typeof chatKeyboardDockRuntimeDeps.maybeApplyCssOnlyIosPwaChatComposerDock === "function" ? chatKeyboardDockRuntimeDeps.maybeApplyCssOnlyIosPwaChatComposerDock : null;
      updateChatMessagesKeyboardPad = typeof chatKeyboardDockRuntimeDeps.updateChatMessagesKeyboardPad === "function" ? chatKeyboardDockRuntimeDeps.updateChatMessagesKeyboardPad : null;
      isChatComposerVirtualKeyboardOpenForRetention = typeof chatKeyboardDockRuntimeDeps.isChatComposerVirtualKeyboardOpenForRetention === "function" ? chatKeyboardDockRuntimeDeps.isChatComposerVirtualKeyboardOpenForRetention : null;
    }

    if (typeof initChatViewGlue === "function") {
      var chatViewGlueDeps = {};
      Object.defineProperties(chatViewGlueDeps, {
        chatActiveTab: { get: function () { return chatActiveTab; }, set: function (value) { chatActiveTab = value; } },
        chatWithUserId: { get: function () { return chatWithUserId; }, set: function (value) { chatWithUserId = value; } },
        chatWithUserName: { get: function () { return chatWithUserName; }, set: function (value) { chatWithUserName = value; } },
        chatWithPeerAvatarUrl: { get: function () { return chatWithPeerAvatarUrl; }, set: function (value) { chatWithPeerAvatarUrl = value; } },
        scrollGeneralToBottomOnNextRender: { get: function () { return scrollGeneralToBottomOnNextRender; }, set: function (value) { scrollGeneralToBottomOnNextRender = !!value; } },
        lastGeneralMessagesSig: { get: function () { return lastGeneralMessagesSig; }, set: function (value) { lastGeneralMessagesSig = value; } },
        convGroupCanChangeAvatar: { get: function () { return getConvGroupCanChangeAvatar(); } }
      });
      Object.assign(chatViewGlueDeps, {
        convView: convView,
        generalView: generalView,
        generalMessages: generalMessages,
        setTab: setTab,
        showConv: showConv,
        renderGeneralMessages: renderGeneralMessages,
        generalMessagesSignature: generalMessagesSignature,
        updateChatHeaderStats: updateChatHeaderStats,
        syncClubChatRosterUi: syncClubChatRosterUi,
        tg: tg,
        base: base,
        showDialogs: showDialogs,
        backBtn: backBtn,
        convTitle: convTitle,
        resolveMyChatMemberId: resolveMyChatMemberId,
        peerChatIdsEqual: peerChatIdsEqual,
        convPeerAvatarWrap: convPeerAvatarWrap,
        convGroupAvatarFile: convGroupAvatarFile,
        applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
        resizeImage: resizeImage,
        findByIdBtn: findByIdBtn,
        findByIdInput: findByIdInput
      });
      initChatViewGlue(chatViewGlueDeps);
    }
    if (typeof initChatAttachmentsRuntime === "function") {
      var chatAttachmentsDeps = {};
      Object.defineProperties(chatAttachmentsDeps, {
        generalImage: { get: function () { return generalImage; }, set: function (value) { generalImage = value; } },
        generalDocument: { get: function () { return generalDocument; }, set: function (value) { generalDocument = value; } },
        personalImage: { get: function () { return personalImage; }, set: function (value) { personalImage = value; } },
        personalDocument: { get: function () { return personalDocument; }, set: function (value) { personalDocument = value; } }
      });
      Object.assign(chatAttachmentsDeps, {
        resizeImage: resizeImage,
        updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
        updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
        openConvFromDialogs: openConvFromDialogs,
        escapeHtml: escapeHtml,
        tg: tg
      });
      initChatAttachmentsRuntime(chatAttachmentsDeps);
    }
    if (typeof initChatEmojiPickerRuntime === "function") {
      var chatEmojiPickerDeps = {};
      Object.defineProperties(chatEmojiPickerDeps, {
        chatActiveTab: { get: function () { return chatActiveTab; } },
        chatComposerEl: { get: function () { return chatComposerEl; }, set: function (value) { chatComposerEl = value; } },
        chatSharedComposerEl: { get: function () { return chatSharedComposerEl; } },
        chatGeneralComposerEl: { get: function () { return chatGeneralComposerEl; } },
        chatPersonalComposerEl: { get: function () { return chatPersonalComposerEl; } },
        chatGeneralInputArea: { get: function () { return chatGeneralInputArea; } },
        chatPersonalInputArea: { get: function () { return chatPersonalInputArea; } },
        chatEmojiPickerTargetInput: { get: function () { return chatEmojiPickerTargetInput; }, set: function (value) { chatEmojiPickerTargetInput = value; } }
      });
      Object.assign(chatEmojiPickerDeps, {
        chatEmojiPicker: chatEmojiPicker,
        getDirectChatComposer: getDirectChatComposer,
        isPokerIosPwaKeyboardRuntime: isPokerIosPwaKeyboardRuntime,
        isTelegramChatRuntime: isTelegramChatRuntime,
        isChatPhysicalKeyboardContext: isChatPhysicalKeyboardContext,
        pokerPwaStandaloneForKeyboardInset: pokerPwaStandaloneForKeyboardInset,
        isIosLikeForChatViewport: isIosLikeForChatViewport,
        isChatKeyboardLayoutEffectivelyClosed: isChatKeyboardLayoutEffectivelyClosed,
        isRecentIosPwaChatComposerUserDismiss: isRecentIosPwaChatComposerUserDismiss,
        clearPendingChatKeyboardDismissTimers: clearPendingChatKeyboardDismissTimers,
        markIosPwaChatComposerKeepAlive: markIosPwaChatComposerKeepAlive,
        maybeApplyCssOnlyIosPwaChatComposerDock: maybeApplyCssOnlyIosPwaChatComposerDock,
        updateChatMessagesKeyboardPad: updateChatMessagesKeyboardPad,
        resizeChatTextarea: resizeChatTextarea,
        flushChatComposerToDrafts: flushChatComposerToDrafts,
        updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
        updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
        showTemplatesMenu: showTemplatesMenu,
        tg: tg
      });
      chatEmojiPickerRuntime = initChatEmojiPickerRuntime(chatEmojiPickerDeps) || {};
    }
    var generalVoiceBtn = document.getElementById("chatGeneralVoiceBtn");
    var generalVoiceRemove = document.getElementById("chatGeneralVoiceRemove");
    var generalVoicePreviewEl = document.getElementById("chatGeneralVoicePreview");
    if (typeof initChatComposerSendRuntime === "function") {
      chatComposerSendRuntime = initChatComposerSendRuntime({
        generalSendBtn: generalSendBtn,
        sendBtn: sendBtn,
        chatSharedComposerEl: chatSharedComposerEl,
        chatGeneralComposerMount: chatGeneralComposerMount,
        chatPersonalComposerMount: chatPersonalComposerMount,
        getChatComposerEl: function () { return chatComposerEl; },
        setChatComposerEl: function (value) { chatComposerEl = value; },
        getChatComposerMounted: function () { return chatComposerMounted; },
        getChatGeneralComposerEl: function () { return chatGeneralComposerEl; },
        getChatPersonalComposerEl: function () { return chatPersonalComposerEl; },
        getChatGeneralText: getChatGeneralText,
        getChatPersonalText: getChatPersonalText,
        getGeneralImage: function () { return generalImage; },
        getGeneralVoice: function () { return generalVoice; },
        getGeneralDocument: function () { return generalDocument; },
        getPersonalImage: function () { return personalImage; },
        getPersonalVoice: function () { return personalVoice; },
        getPersonalDocument: function () { return personalDocument; },
        getSendingGeneral: function () { return sendingGeneral; },
        getSendingPrivate: function () { return sendingPrivate; },
        flushChatComposerToDrafts: flushChatComposerToDrafts,
        sendGeneral: function () { return sendGeneral(); },
        sendMessage: function () { return sendMessage(); },
        isChatComposerVirtualKeyboardOpenForRetention: isChatComposerVirtualKeyboardOpenForRetention,
        chatComposerValueHasTextForHeight: typeof chatComposerValueHasTextForHeight === "function" ? chatComposerValueHasTextForHeight : null,
        chatComposerValueForHeight: typeof chatComposerValueForHeight === "function" ? chatComposerValueForHeight : null,
        isTelegramChatRuntime: isTelegramChatRuntime,
        shouldUseNativeTelegramIosChatComposerFlow: typeof shouldUseNativeTelegramIosChatComposerFlow === "function" ? shouldUseNativeTelegramIosChatComposerFlow : null,
        updateChatMessagesKeyboardPad: updateChatMessagesKeyboardPad,
        pokerChatSendTypingState: pokerChatSendTypingState,
        pokerChatScheduleTypingStop: pokerChatScheduleTypingStop,
        clearChatTypingStopTimer: clearChatTypingStopTimer,
        showTemplatesMenu: showTemplatesMenu,
      }) || null;
    }
    if (typeof initChatVoiceRecordingRuntime === "function") {
      initChatVoiceRecordingRuntime({
        tg: tg,
        generalVoiceBtn: generalVoiceBtn,
        generalVoiceRemove: generalVoiceRemove,
        generalVoicePreviewEl: generalVoicePreviewEl,
        generalSendBtn: generalSendBtn,
        sendBtn: sendBtn,
        bindChatSendTap: chatComposerSendRuntime && chatComposerSendRuntime.bindChatSendTap,
        getChatGeneralText: getChatGeneralText,
        getChatPersonalText: getChatPersonalText,
        getGeneralImage: function () { return generalImage; },
        getGeneralVoice: function () { return generalVoice; },
        setGeneralVoice: function (value) { generalVoice = value; },
        getGeneralDocument: function () { return generalDocument; },
        getPersonalImage: function () { return personalImage; },
        getPersonalVoice: function () { return personalVoice; },
        setPersonalVoice: function (value) { personalVoice = value; },
        getPersonalDocument: function () { return personalDocument; },
        sendGeneral: function () { return sendGeneral(); },
        sendMessage: function () { return sendMessage(); },
        updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
        updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
        pokerNormalizeVoiceDataUrl: pokerNormalizeVoiceDataUrl,
      });
    }
    if (typeof initChatReplyRetryGlue === "function") {
      var chatReplyRetryDeps = {};
      Object.defineProperties(chatReplyRetryDeps, {
        chatEditMode: { get: function () { return chatEditMode; } },
        chatEditSource: { get: function () { return chatEditSource; } },
        generalReplyTo: { get: function () { return generalReplyTo; }, set: function (value) { generalReplyTo = value; } },
        personalReplyTo: { get: function () { return personalReplyTo; }, set: function (value) { personalReplyTo = value; } }
      });
      Object.assign(chatReplyRetryDeps, {
        generalMessages: generalMessages,
        messagesEl: messagesEl,
        updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
        updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
        clearChatEditUI: clearChatEditUI,
        retryFailedOutgoingChat: retryFailedOutgoingChat
      });
      initChatReplyRetryGlue(chatReplyRetryDeps);
    }
  }

  initChatBootstrap({
    dialogsView: dialogsView,
    chatGeneralBackBtn: chatGeneralBackBtn,
    tg: tg,
    openConvFromDialogs: openConvFromDialogs,
    showDialogs: showDialogs,
    pokerPushOpenSetCaller: pokerPushOpenSetCaller,
    pokerPushOpenDebug: pokerPushOpenDebug,
  });

  initChatDialogActions({
    base: base,
    tg: tg,
    initData: typeof initData !== "undefined" ? initData : "",
    dialogsView: dialogsView,
    findByIdInputDialogs: findByIdInputDialogs,
    escapeHtml: escapeHtml,
    openConvFromDialogs: openConvFromDialogs,
    tryOpenClubChatFromDialogs: tryOpenClubChatFromDialogs,
    openChatDialogPreviewModal: openChatDialogPreviewModal,
    openChatClubAccessModal: openChatClubAccessModal,
    prefetchPersonalMessages: typeof prefetchPersonalMessages === "function" ? prefetchPersonalMessages : null,
    pokerApiAuthQuery: typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery : null,
    showDialogs: showDialogs,
    getChatIsAdmin: function () { return chatIsAdmin; },
  });

  initChatGroupAddMembersModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    loadMessages: loadMessages,
    getChatWithUserId: function () { return chatWithUserId; },
  });

  initChatGroupInfoModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    resizeImage: resizeImage,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateCurrentGroupMeta: function (groupId, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        chatWithUserName = title;
        if (convTitle) convTitle.textContent = title;
        applyConvGroupDescription();
      }
    },
    updateCurrentGroupAvatar: function (groupId, avatarUrl, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        chatWithPeerAvatarUrl = avatarUrl;
        applyConvPeerAvatarHeader(avatarUrl, chatWithUserName || title);
      }
    },
    handleGroupRemoved: function (groupId, caller) {
      try {
        delete personalMessagesCache[groupId];
      } catch (eC) {}
      try {
        delete personalMessagesCacheMeta[groupId];
      } catch (eC2) {}
      lastPersonalMessagesSig = null;
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        pokerPushOpenSetCaller(caller);
        showDialogs();
      }
    },
  });

  initChatCreateGroupModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    openConvFromDialogs: openConvFromDialogs,
    resizeImage: resizeImage,
  });

  var chatPollLoop = initChatPollingLoop({
    currentInterval: chatPollInterval,
    constants: chatPolling.constants,
    state: chatPolling.state,
    getChatActiveTab: function () { return chatActiveTab; },
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralView: function () { return generalView; },
    getConvView: function () { return convView; },
    getAdminsView: function () { return adminsView; },
    loadGeneral: loadGeneral,
    loadMessages: loadMessages,
    loadContacts: loadContacts,
    loadAdminsOnline: loadAdminsOnline,
    updateChatHeaderStats: updateChatHeaderStats,
    pokerChatCanRunLongPoll: pokerChatCanRunLongPoll,
    pokerChatShouldRunPoll: pokerChatShouldRunPoll,
    pokerChatStopLongPoll: pokerChatStopLongPoll,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
  });
  chatPollInterval = chatPollLoop.chatPollInterval;

  initChatPushOpenHandlers({
    chatOutgoingState: chatOutgoingState,
    personalMessagesCache: personalMessagesCache,
    getChatActiveTab: function () { return chatActiveTab; },
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralView: function () { return generalView; },
    getConvView: function () { return convView; },
    getDialogsView: function () { return dialogsView; },
    getListView: function () { return listView; },
    loadGeneral: loadGeneral,
    loadContacts: loadContacts,
    loadMessages: loadMessages,
    renderGeneralMessages: renderGeneralMessages,
    renderMessages: renderMessages,
    mergeIncomingPushGeneralIntoMessages: typeof mergeIncomingPushGeneralIntoMessages === "function" ? mergeIncomingPushGeneralIntoMessages : null,
    mergeIncomingPushPersonalIntoMessages: typeof mergeIncomingPushPersonalIntoMessages === "function" ? mergeIncomingPushPersonalIntoMessages : null,
    chatPushPlaceholderFromPayload: typeof chatPushPlaceholderFromPayload === "function" ? chatPushPlaceholderFromPayload : null,
    pokerNormalizeWebAppStartParam: typeof pokerNormalizeWebAppStartParam === "function" ? pokerNormalizeWebAppStartParam : null,
    pokerStartAppQueryFromUrlSearchParams: typeof pokerStartAppQueryFromUrlSearchParams === "function" ? pokerStartAppQueryFromUrlSearchParams : null,
    pokerResolveChatPeerLabel: typeof pokerResolveChatPeerLabel === "function" ? pokerResolveChatPeerLabel : null,
    peerChatIdsEqual: typeof peerChatIdsEqual === "function" ? peerChatIdsEqual : null,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
  });

}
