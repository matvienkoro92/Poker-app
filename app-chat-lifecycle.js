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
  var chatKeyboardDebugLog = [];
  var chatKeyboardDebugPanel = null;
  var chatKeyboardDebugObserver = null;
  var chatKeyboardDebugFocusBound = false;
  var chatKeyboardDebugTickerStarted = false;
  var chatKeyboardDebugLastSnapshotKey = "";
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
  var convTitle = document.getElementById("chatConvTitle");
  var convTitleFish = document.getElementById("chatConvTitleFish");
  var convTitleLevel = document.getElementById("chatConvTitleLevel");
  var convTitleId = document.getElementById("chatConvTitleId");
  var convVerifiedBadge = document.getElementById("chatConvVerifiedBadge");
  var chatConvTitleIdPeerId = "";
  var chatConvTitleP21ByPeer = {};
  var convGroupDescEl = document.getElementById("chatConvGroupDesc");
  /** Описание группы не дублируем под шапкой чата — только в модалке «Информация о группе». */
  function applyConvGroupDescription() {
    if (!convGroupDescEl) return;
    convGroupDescEl.textContent = "";
    convGroupDescEl.classList.add("chat-conv-group-desc--hidden");
    convGroupDescEl.setAttribute("aria-hidden", "true");
  }
  function setChatConvTitleFish(level) {
    if (!convTitleFish) return;
    var fishLevel = level != null && level !== "" ? pokerProfileStatusFishLevel(level) : 0;
    if (!fishLevel) {
      convTitleFish.hidden = true;
      convTitleFish.removeAttribute("src");
      convTitleFish.removeAttribute("data-status-fish-level");
      if (convTitleLevel) {
        convTitleLevel.hidden = true;
        convTitleLevel.textContent = "";
        convTitleLevel.removeAttribute("data-status-level");
      }
      return;
    }
    convTitleFish.src = pokerProfileStatusFishSrc(fishLevel);
    convTitleFish.setAttribute("data-status-fish-level", String(fishLevel));
    convTitleFish.hidden = false;
    if (convTitleLevel) {
      convTitleLevel.textContent = "Уровень: " + String(fishLevel);
      convTitleLevel.setAttribute("data-status-level", String(fishLevel));
      convTitleLevel.hidden = false;
    }
  }
  function syncChatConvTitleMetaVisibility() {
    var wrap = convTitleId && convTitleId.closest ? convTitleId.closest(".chat-conv-peer-title-chip__id") : null;
    if (!wrap) return;
    var hasId = !!(convTitleId && String(convTitleId.textContent || "").trim());
    wrap.hidden = !hasId;
  }
  function normalizeChatConvTitlePeerId(peerId) {
    var raw = peerId != null ? String(peerId).trim() : "";
    if (!raw) return "";
    try {
      if (typeof normalizePeerIdForChat === "function") return normalizePeerIdForChat(raw);
    } catch (eTitlePeerNorm) {}
    return raw;
  }
  function getOpenPersonalTitlePeerId() {
    try {
      if (!chatWithUserId || String(chatWithUserId).indexOf("group_") === 0) return "";
      if (convView && convView.classList && convView.classList.contains("chat-conv-view--hidden")) return "";
      return normalizeChatConvTitlePeerId(chatWithUserId);
    } catch (eTitlePeerOpen) {
      return "";
    }
  }
  function isChatConvTitleTransientMeta(value) {
    var s = value != null ? String(value).trim() : "";
    return s === "печатает…" || s === "typing…";
  }
  function setTextContentIfChanged(el, txt) {
    if (!el) return;
    var next = txt != null ? String(txt) : "";
    if (el.textContent !== next) el.textContent = next;
  }
  function scheduleChatPostRenderSync(fn) {
    if (typeof fn !== "function") return;
    var run = function () {
      try {
        fn();
      } catch (ePostRender) {}
    };
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(function () {
        setTimeout(run, 0);
      });
      return;
    }
    setTimeout(run, 0);
  }
  function updateChatHeaderStats() {
    var el = document.getElementById("chatHeaderStats");
    if (!el) return;
    if (window.__pokerChatNetworkOnline === false) {
      setTextContentIfChanged(el, "Нет сети");
      return;
    }
    var txt = "";
    if (chatActiveTab === "general") txt = window.lastGeneralStats || "";
    else if (chatActiveTab === "admins") txt = "Админы";
    else if (chatWithUserId && convView && !convView.classList.contains("chat-conv-view--hidden")) txt = window.lastConvStats || "";
    else txt = window.lastListStats || "";
    setTextContentIfChanged(el, txt);
  }
  function rememberChatConvTitleP21Id(peerId, value) {
    var key = normalizeChatConvTitlePeerId(peerId);
    var clean = value != null ? String(value).trim() : "";
    if (!key || !clean || isChatConvTitleTransientMeta(clean)) return "";
    chatConvTitleP21ByPeer[key] = clean;
    chatConvTitleIdPeerId = key;
    return clean;
  }
  function resolveChatConvTitleP21Id(peerId) {
    var key = normalizeChatConvTitlePeerId(peerId);
    if (!key) return "";
    try {
      var current = convTitleId ? String(convTitleId.textContent || "").trim() : "";
      if (
        current &&
        !isChatConvTitleTransientMeta(current) &&
        chatConvTitleIdPeerId &&
        (
          chatConvTitleIdPeerId === key ||
          (typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatConvTitleIdPeerId, key))
        )
      ) return current;
    } catch (eTitleCurrent) {}
    if (chatConvTitleP21ByPeer[key]) return chatConvTitleP21ByPeer[key];
    try {
      var meta = typeof pokerGetCachedChatPeerMeta === "function" ? pokerGetCachedChatPeerMeta(key) : null;
      if (meta && meta.p21Id != null && String(meta.p21Id).trim()) return rememberChatConvTitleP21Id(key, meta.p21Id);
    } catch (eTitleCached) {}
    return "";
  }
  function setChatConvTitleIdText(value) {
    if (!convTitleId) return;
    var clean = value != null ? String(value).trim() : "";
    var peerKey = getOpenPersonalTitlePeerId();
    if (peerKey && clean && !isChatConvTitleTransientMeta(clean)) {
      clean = rememberChatConvTitleP21Id(peerKey, clean);
    } else if (peerKey && !clean) {
      clean = resolveChatConvTitleP21Id(peerKey);
    } else if (!peerKey && !clean) {
      chatConvTitleIdPeerId = "";
    }
    setTextContentIfChanged(convTitleId, clean);
    syncChatConvTitleMetaVisibility();
  }
  var convPeerAvatar = document.getElementById("chatConvPeerAvatar");
  var convPeerAvatarPh = document.getElementById("chatConvPeerAvatarPh");
  var convPeerAvatarWrap = document.getElementById("chatConvPeerAvatarWrap");
  var convGroupAvatarFile = document.getElementById("chatConvGroupAvatarFile");
  var convGroupCanChangeAvatar = false;
  function setChatPeerVerified(on) {
    chatWithUserPokerPlusVerified = !!on;
    if (convVerifiedBadge) convVerifiedBadge.classList.toggle("chat-verified-badge--hidden", !chatWithUserPokerPlusVerified);
    syncChatConvTitleMetaVisibility();
  }
  function getInlineChatHeaderTopOffsetPx() {
    try {
      var root = document.documentElement;
      if (
        root &&
        root.classList &&
        (root.classList.contains("poker-ios-pwa") || root.classList.contains("poker-android-pwa"))
      ) {
        return "0px";
      }
    } catch (ePwaHeaderClassTop) {}
    try {
      if (typeof isPwaStandaloneMode === "function" && isPwaStandaloneMode()) return "0px";
    } catch (ePwaHeadTop) {}
    try {
      if (typeof window.__pokerIsChatPhysicalKeyboardContext === "function" && window.__pokerIsChatPhysicalKeyboardContext()) {
        return "0px";
      }
    } catch (eDeskHeadTop) {}
    return "50px";
  }
  function syncConvGroupAvatarEditUi() {
    if (!convPeerAvatarWrap) return;
    var on = !!(
      convGroupCanChangeAvatar &&
      chatWithUserId &&
      String(chatWithUserId).indexOf("group_") === 0
    );
    convPeerAvatarWrap.classList.toggle("chat-conv-peer-avatar-wrap--editable", on);
    if (on) {
      convPeerAvatarWrap.setAttribute("aria-hidden", "false");
      convPeerAvatarWrap.setAttribute("aria-label", "Сменить аватар группы");
      convPeerAvatarWrap.setAttribute("role", "button");
      convPeerAvatarWrap.setAttribute("tabindex", "0");
    } else {
      convPeerAvatarWrap.setAttribute("aria-hidden", "true");
      convPeerAvatarWrap.removeAttribute("aria-label");
      convPeerAvatarWrap.setAttribute("role", "presentation");
      convPeerAvatarWrap.setAttribute("tabindex", "-1");
    }
  }
  function applyConvPeerAvatarHeader(url, displayName) {
    if (!convPeerAvatar || !convPeerAvatarPh) return;
    var nm = displayName != null && String(displayName).trim() ? String(displayName).trim() : "";
    convPeerAvatarPh.textContent = nm ? nm.charAt(0) : "?";
    var u = url != null && String(url).trim() ? String(url).trim() : "";
    convPeerAvatar.onload = null;
    convPeerAvatar.onerror = null;
    if (!u) {
      convPeerAvatar.removeAttribute("src");
      try {
        convPeerAvatar.removeAttribute("fetchpriority");
      } catch (eRmFp) {}
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatar.alt = "";
      return;
    }
    convPeerAvatar.alt = nm || "";
    try {
      convPeerAvatar.setAttribute("decoding", "async");
      convPeerAvatar.setAttribute("fetchpriority", "high");
    } catch (eFp) {}
    convPeerAvatar.onload = function () {
      convPeerAvatar.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.add("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.onerror = function () {
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.src = u;
    if (convPeerAvatar.complete) {
      if (convPeerAvatar.naturalWidth > 0) convPeerAvatar.onload();
      else convPeerAvatar.onerror();
    }
  }
  function clearConvPeerAvatarHeader() {
    chatWithPeerAvatarUrl = null;
    convGroupCanChangeAvatar = false;
    syncConvGroupAvatarEditUi();
    applyConvPeerAvatarHeader("", "");
    applyConvGroupDescription("");
  }
  function isWebsiteGuestChatGateMode() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (isTelegramMini) return false;
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    var isPwaGuest = false;
    try {
      isPwaGuest = !!pokerReadPwaGuestMode();
    } catch (ePwaGuestChat) {}
    var isPwaLike = false;
    try {
      isPwaLike =
        !!(
          document.documentElement &&
          document.documentElement.classList &&
          (document.documentElement.classList.contains("poker-ios-pwa") ||
            document.documentElement.classList.contains("poker-android-pwa"))
        );
    } catch (ePwaLikeChat) {}
    var hasTelegramIdentity = false;
    try {
      var resolvedUser =
        typeof getPokerResolvedTelegramUser === "function"
          ? getPokerResolvedTelegramUser()
          : null;
      if (
        resolvedUser &&
        ((resolvedUser.username && String(resolvedUser.username).trim()) ||
          (resolvedUser.first_name && String(resolvedUser.first_name).trim()) ||
          (resolvedUser.last_name && String(resolvedUser.last_name).trim()))
      ) {
        hasTelegramIdentity = true;
      }
    } catch (eResolvedChatUser) {}
    try {
      if (!hasTelegramIdentity) {
        var tgChat = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var tgUser = tgChat && tgChat.initDataUnsafe ? tgChat.initDataUnsafe.user : null;
        if (
          tgUser &&
          ((tgUser.username && String(tgUser.username).trim()) ||
            (tgUser.first_name && String(tgUser.first_name).trim()) ||
            (tgUser.last_name && String(tgUser.last_name).trim()))
        ) {
          hasTelegramIdentity = true;
        }
      }
    } catch (eTelegramChatUser) {}
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    return !hasSession && !hasTelegramIdentity && !isStandaloneMode && !isPwaGuest && !isPwaLike;
  }
  function forceHideChatGuestGateForTelegram() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (!isTelegramMini) return false;
    var isGuestTelegram = false;
    try {
      isGuestTelegram = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestTelegram) {}
    if (isGuestTelegram) return false;
    try {
      if (dialogsGuestGate) {
        dialogsGuestGate.hidden = true;
        dialogsGuestGate.style.display = "none";
        if (dialogsGuestGate.parentNode) dialogsGuestGate.parentNode.removeChild(dialogsGuestGate);
        dialogsGuestGate = null;
      }
    } catch (eDlgGateHide) {}
    try {
      if (contactsEl) {
        var guestBlocks = contactsEl.querySelectorAll(".chat-guest-cta");
        var i;
        for (i = 0; i < guestBlocks.length; i++) {
          guestBlocks[i].hidden = true;
          guestBlocks[i].style.display = "none";
          if (guestBlocks[i].parentNode) guestBlocks[i].parentNode.removeChild(guestBlocks[i]);
        }
      }
    } catch (eContactsGateHide) {}
    return true;
  }
  function syncChatWebsiteGuestGate() {
    if (forceHideChatGuestGateForTelegram()) return false;
    var isPwaGuest = false;
    try {
      isPwaGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eChatPwaGuestMode) {}
    var guestMode = isWebsiteGuestChatGateMode();
    var contactsFilter = document.getElementById("chatContactsFilter");
    var findWrap = findByIdInputDialogs ? findByIdInputDialogs.closest(".chat-find-by-id") : null;
    if (isPwaGuest) {
      if (dialogsGuestGate) dialogsGuestGate.hidden = true;
      if (dialogsPrimaryBlock) dialogsPrimaryBlock.classList.remove("profile-guest-hidden");
      if (contactsFilter) contactsFilter.classList.remove("profile-guest-hidden");
      if (contactsEl) contactsEl.classList.remove("profile-guest-hidden");
      if (findWrap) findWrap.classList.remove("profile-guest-hidden");
      if (chatNewGroupBtn) chatNewGroupBtn.classList.remove("profile-guest-hidden");
      return false;
    }
    if (dialogsGuestGate) dialogsGuestGate.hidden = !guestMode;
    if (dialogsPrimaryBlock) dialogsPrimaryBlock.classList.toggle("profile-guest-hidden", guestMode);
    if (contactsFilter) contactsFilter.classList.toggle("profile-guest-hidden", guestMode);
    if (contactsEl) contactsEl.classList.toggle("profile-guest-hidden", guestMode);
    if (findWrap) findWrap.classList.toggle("profile-guest-hidden", guestMode);
    if (chatNewGroupBtn) chatNewGroupBtn.classList.toggle("profile-guest-hidden", guestMode);
    if (!guestMode) return false;
    if (contactsEl) {
      contactsEl.innerHTML = "";
    }
    return true;
  }
  if (dialogsGuestAuthBtn && dialogsGuestAuthBtn.dataset.bound !== "1") {
    dialogsGuestAuthBtn.dataset.bound = "1";
    dialogsGuestAuthBtn.addEventListener("click", function () {
      if (typeof window.__pokerOpenSiteHomeInstructionModal === "function") {
        window.__pokerOpenSiteHomeInstructionModal();
      }
    });
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
  function isChatKeyboardDebugAllowedEnvironment() {
    try {
      var h = (window.location && window.location.hostname ? window.location.hostname : "").toLowerCase();
      if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0" || h === "") return true;
      return /(?:\?|&)chatKeyboardDebug=1(?:&|$)/.test(String(location.search || ""));
    } catch (eDbgEnv) {
      return false;
    }
  }
  function shouldShowChatKeyboardDebugPanel() {
    try {
      if (!isChatKeyboardDebugAllowedEnvironment()) {
        try {
          if (window.localStorage && localStorage.getItem("poker_chat_keyboard_debug")) {
            localStorage.removeItem("poker_chat_keyboard_debug");
          }
        } catch (eDbgStorageClear) {}
        return false;
      }
      var pwaIos =
        document.documentElement &&
        document.documentElement.classList &&
        document.documentElement.classList.contains("poker-ios-pwa");
      if (!pwaIos) return false;
      if (window.localStorage && localStorage.getItem("poker_chat_keyboard_debug") === "1") return true;
      return /(?:\?|&)chatKeyboardDebug=1(?:&|$)/.test(String(location.search || ""));
    } catch (eDbgShow) {
      return false;
    }
  }
  function isPokerIosPwaKeyboardRuntime() {
    try {
      var root = document.documentElement;
      return !!(
        root &&
        root.classList &&
        root.classList.contains("poker-ios-pwa") &&
        document.body &&
        String(document.body.getAttribute("data-view") || "") === "chat"
      );
    } catch (eIosPwaRuntime) {
      return false;
    }
  }
  function isChatKeyboardDebugTarget(node) {
    try {
      if (!node || !node.closest) return false;
      return !!node.closest(
        ".chat-input-area, .chat-input-wrap, .chat-tma-ios-minimal-block, .chat-messages, .chat-messages-wrap, .chat-general-view, .chat-conv-view, .chat-container"
      );
    } catch (eDbgTarget) {
      return false;
    }
  }
  function getChatKeyboardDebugNodeLabel(node) {
    try {
      if (!node) return "none";
      var id = node.id ? "#" + node.id : "";
      var cls = "";
      if (node.classList && node.classList.length) cls = "." + Array.prototype.slice.call(node.classList, 0, 3).join(".");
      return String((node.tagName || "node").toLowerCase()) + id + cls;
    } catch (eDbgLabel) {
      return "node";
    }
  }
  function getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) {
    try {
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var wrapRect = wrap && wrap.getBoundingClientRect ? wrap.getBoundingClientRect() : null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      return {
        areaTop: areaRect ? Math.round(areaRect.top) : 0,
        areaH: areaRect ? Math.round(areaRect.height) : 0,
        wrapTop: wrapRect ? Math.round(wrapRect.top) : 0,
        wrapH: wrapRect ? Math.round(wrapRect.height) : 0,
        taTop: taRect ? Math.round(taRect.top) : 0,
        taH: taRect ? Math.round(taRect.height) : 0,
        msgsTop: msgsRect ? Math.round(msgsRect.top) : 0,
        msgsH: msgsRect ? Math.round(msgsRect.height) : 0,
        msgPad: msgs && msgs.style ? String(msgs.style.paddingBottom || "") : "",
        msgScroll: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgScrollH: msgs ? Math.round(msgs.scrollHeight || 0) : 0,
        msgClientH: msgs ? Math.round(msgs.clientHeight || 0) : 0,
        areaPos: area ? String(getComputedStyle(area).position || "") : "",
        areaBottom: area ? String(getComputedStyle(area).bottom || "") : "",
        areaTransform: area ? String(getComputedStyle(area).transform || "") : "",
        areaDisplay: area ? String(getComputedStyle(area).display || "") : "",
        areaVis: area ? String(getComputedStyle(area).visibility || "") : "",
        taBottom: taRect ? Math.round(taRect.bottom) : 0
      };
    } catch (eDbgGeom) {
      return null;
    }
  }
  function getChatKeyboardDebugStableState() {
    try {
      var area = getActiveChatInputArea();
      var cs = area && window.getComputedStyle ? getComputedStyle(area) : null;
      var isDocked =
        !!(
          area &&
          area.classList &&
          area.classList.contains("chat-input-area--vv-dock") &&
          cs &&
          cs.position === "fixed"
        );
      if (isDocked) return "docked";
      if (document.body && document.body.classList && document.body.classList.contains("chat-keyboard-open")) return "flow";
      var active = document.activeElement;
      if (
        active &&
        active.closest &&
        active.closest(".chat-input-area") &&
        String(active.tagName || "").toUpperCase() === "TEXTAREA"
      ) {
        return "focused";
      }
      return "closed";
    } catch (eDbgStable) {
      return "unknown";
    }
  }
  function getActiveChatInputArea() {
    if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
      return chatGeneralInputArea || null;
    }
    if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
      return chatPersonalInputArea || null;
    }
    return null;
  }
  function getChatKeyboardDebugSnapshot() {
    try {
      var area = getActiveChatInputArea();
      if (!area) {
        area =
          (chatGeneralInputArea && !chatGeneralInputArea.closest(".chat-general-view--hidden") && chatGeneralInputArea) ||
          (chatPersonalInputArea && !chatPersonalInputArea.closest(".chat-conv-view--hidden") && chatPersonalInputArea) ||
          chatGeneralInputArea ||
          chatPersonalInputArea ||
          null;
      }
      var wrap = area && area.querySelector ? area.querySelector(".chat-input-wrap, .chat-tma-ios-minimal-block") : null;
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        chatGeneralComposerEl ||
        chatPersonalComposerEl ||
        chatComposerEl ||
        null;
      var msgs = null;
      if (area && area === chatGeneralInputArea) msgs = generalMessages || null;
      else if (area && area === chatPersonalInputArea) msgs = messagesEl || null;
      else if (getVisibleMessagesEl && typeof getVisibleMessagesEl === "function") msgs = getVisibleMessagesEl() || null;
      var vv = window.visualViewport || null;
      var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var active = document.activeElement || null;
      var appEl = document.getElementById("app");
      var appRect = appEl && appEl.getBoundingClientRect ? appEl.getBoundingClientRect() : null;
      var bodyRect = document.body && document.body.getBoundingClientRect ? document.body.getBoundingClientRect() : null;
      var docRect = document.documentElement && document.documentElement.getBoundingClientRect ? document.documentElement.getBoundingClientRect() : null;
      var container =
        area && area.closest
          ? area.closest(".chat-container, .chat-general-view, .chat-dialogs-view")
          : null;
      var containerRect = container && container.getBoundingClientRect ? container.getBoundingClientRect() : null;
      var safeBottom = 0;
      try {
        var rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
        safeBottom = Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0);
      } catch (eDbgSafe) {}
      var geom = getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) || {};
      return {
        ih: window.innerHeight || 0,
        iw: window.innerWidth || 0,
        vvh: vv ? Math.round(Number(vv.height) || 0) : 0,
        vvTop: vv ? Math.round(Number(vv.offsetTop) || 0) : 0,
        vvPageTop: vv ? Math.round(Number(vv.pageTop) || 0) : 0,
        tgVh: tw ? Math.round(Number(tw.viewportHeight) || 0) : 0,
        tgVs: tw ? Math.round(Number(tw.viewportStableHeight) || 0) : 0,
        appTop: appRect ? Math.round(appRect.top) : 0,
        appH: appRect ? Math.round(appRect.height) : 0,
        bodyTop: bodyRect ? Math.round(bodyRect.top) : 0,
        bodyH: bodyRect ? Math.round(bodyRect.height) : 0,
        docTop: docRect ? Math.round(docRect.top) : 0,
        docH: docRect ? Math.round(docRect.height) : 0,
        contTop: containerRect ? Math.round(containerRect.top) : 0,
        contH: containerRect ? Math.round(containerRect.height) : 0,
        areaTop: geom.areaTop || 0,
        areaH: geom.areaH || 0,
        wrapTop: geom.wrapTop || 0,
        wrapH: geom.wrapH || 0,
        msgsTop: geom.msgsTop || 0,
        msgsH: geom.msgsH || 0,
        taTop: geom.taTop || 0,
        taH: geom.taH || 0,
        taBottom: geom.taBottom || 0,
        msgPad: geom.msgPad || "",
        msgScroll: geom.msgScroll || 0,
        msgScrollH: geom.msgScrollH || 0,
        msgClientH: geom.msgClientH || 0,
        areaPos: geom.areaPos || "",
        areaBottom: geom.areaBottom || "",
        areaTransform: geom.areaTransform || "",
        areaDisplay: geom.areaDisplay || "",
        areaVis: geom.areaVis || "",
        safeBottom: safeBottom,
        version: String(document.documentElement.getAttribute("data-app-version") || ""),
        iosPwa: document.documentElement.classList.contains("poker-ios-pwa") ? 1 : 0,
        stableState: getChatKeyboardDebugStableState(),
        winY: Math.round(window.scrollY || 0),
        active: getChatKeyboardDebugNodeLabel(active),
        areaNode: getChatKeyboardDebugNodeLabel(area),
        containerNode: getChatKeyboardDebugNodeLabel(container),
        wrapNode: getChatKeyboardDebugNodeLabel(wrap),
        taNode: getChatKeyboardDebugNodeLabel(ta),
        htmlKb: document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0,
        bodyKb: document.body.classList.contains("chat-keyboard-open") ? 1 : 0
      };
    } catch (eDbgSnap) {
      return null;
    }
  }
  function renderChatKeyboardDebugPanel() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    var snap = getChatKeyboardDebugSnapshot();
    var tail = chatKeyboardDebugLog.slice(-6);
    var lines = [];
    if (snap) {
      lines.push(
        "ver:" + snap.version +
          " iosPwa:" + snap.iosPwa +
          " " +
        "ih:" + snap.ih + " iw:" + snap.iw +
          " vv:" + snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop +
          " tg:" + snap.tgVh + "/" + snap.tgVs
      );
      lines.push(
        "app:" + snap.appTop + "+" + snap.appH +
          " body:" + snap.bodyTop + "+" + snap.bodyH +
          " doc:" + snap.docTop + "+" + snap.docH
      );
      lines.push(
        "cont:" + snap.contTop + "+" + snap.contH +
        " msgs:" + snap.msgsTop + "+" + snap.msgsH +
        " area:" + snap.areaTop + "+" + snap.areaH +
          " wrap:" + snap.wrapTop + "+" + snap.wrapH +
          " ta:" + snap.taTop + "+" + snap.taH + "/" + snap.taBottom
      );
      lines.push(
        "pos:" + snap.areaPos +
          " bottom:" + snap.areaBottom +
          " dock:" + (Number(window.__pokerChatThreadDockBottomCssPx) || 0) + "/" + (Number(window.__pokerChatLastAppliedDockBottom) || 0) +
          " state:" + snap.stableState +
          " wd:" + Math.max(0, Math.round(((Number(window.__pokerChatPwaDockWatchdogUntil) || 0) - Date.now()) / 100)) +
          " pad:" + snap.msgPad +
          " scr:" + snap.msgScroll + "/" + snap.msgScrollH + "/" + snap.msgClientH +
          " winY:" + snap.winY
      );
      lines.push(
        "tr:" + snap.areaTransform +
          " dsp:" + snap.areaDisplay +
          " vis:" + snap.areaVis +
          " kb:" + snap.htmlKb + "/" + snap.bodyKb +
          " safe:" + snap.safeBottom
      );
      lines.push(
        "act:" + snap.active
      );
      lines.push(
        "areaN:" + snap.areaNode
      );
      lines.push(
        "contN:" + snap.containerNode
      );
    }
    tail.forEach(function (item) {
      lines.push(item);
    });
    var floatingPanel = ensureChatKeyboardDebugFloatingPanel();
    try {
      document.documentElement.classList.add("chat-keyboard-debug-on");
    } catch (eDbgCls) {}
    if (floatingPanel) {
      floatingPanel.textContent = lines.join("\n");
      floatingPanel.hidden = false;
      floatingPanel.setAttribute("aria-hidden", "false");
    }
    [chatGeneralKeyboardDebugEl, chatPersonalKeyboardDebugEl].forEach(function (panel) {
      if (!panel) return;
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      panel.textContent = lines.join("\n");
    });
  }
  function logChatKeyboardDebug(source, extra) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot() || {};
      var line =
        String(source || "evt") +
        " ih=" + (snap.ih || 0) +
        " vv=" + (snap.vvh || 0) + "/" + (snap.vvTop || 0) +
        " area=" + (snap.areaTop || 0) + "+" + (snap.areaH || 0) +
        " ta=" + (snap.taTop || 0) + "+" + (snap.taH || 0);
      if (extra) line += " " + extra;
      chatKeyboardDebugLog.push(line);
      if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
    } catch (eDbgLog) {}
    renderChatKeyboardDebugPanel();
  }
  function pumpChatKeyboardDebugSnapshot(source) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot();
      if (!snap) return;
      var key = [
        snap.ih,
        snap.vvh,
        snap.vvTop,
        snap.tgVh,
        snap.tgVs,
        snap.areaTop,
        snap.areaH,
        snap.wrapTop,
        snap.wrapH,
        snap.taTop,
        snap.taH,
        snap.msgPad,
        snap.msgScroll,
        snap.areaPos,
        snap.areaBottom,
        snap.areaTransform,
        snap.active,
        snap.areaNode
      ].join("|");
      if (key !== chatKeyboardDebugLastSnapshotKey) {
        chatKeyboardDebugLastSnapshotKey = key;
        chatKeyboardDebugLog.push(
          String(source || "tick") +
            " ih=" + snap.ih +
            " vv=" + snap.vvh + "/" + snap.vvTop +
            " area=" + snap.areaTop + "+" + snap.areaH +
            " ta=" + snap.taTop + "+" + snap.taH +
            " act=" + snap.active
        );
        if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
      }
    } catch (eDbgPump) {}
    renderChatKeyboardDebugPanel();
  }
  function installChatKeyboardDebugObservers() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      if (chatKeyboardDebugObserver) chatKeyboardDebugObserver.disconnect();
    } catch (eDbgObsOff) {}
    try {
      chatKeyboardDebugObserver = new MutationObserver(function (records) {
        var parts = [];
        records.forEach(function (rec) {
          if (!rec || !rec.target) return;
          if (!isChatKeyboardDebugTarget(rec.target)) return;
          var id = getChatKeyboardDebugNodeLabel(rec.target);
          parts.push(id + ":" + rec.attributeName);
        });
        if (parts.length) logChatKeyboardDebug("mut", parts.join(","));
      });
      [
        document.documentElement,
        document.body,
        document.querySelector('.view[data-view="chat"]'),
        chatGeneralInputArea,
        chatPersonalInputArea,
        generalView,
        convView,
        generalMessages,
        messagesEl
      ].forEach(function (node) {
        if (!node || !chatKeyboardDebugObserver) return;
        chatKeyboardDebugObserver.observe(node, {
          attributes: true,
          attributeFilter: ["class", "style"],
          childList: true,
          subtree: true
        });
      });
    } catch (eDbgObs) {}
    try {
      if (!chatKeyboardDebugFocusBound) {
        chatKeyboardDebugFocusBound = true;
        document.addEventListener(
          "focusin",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusin*", getChatKeyboardDebugNodeLabel(target));
            try {
              if (
                target &&
                String(target.tagName || "").toUpperCase() === "TEXTAREA" &&
                target.closest &&
                target.closest(".chat-input-area") &&
                (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
                (
                  isPokerIosPwaKeyboardRuntime() ||
                  (
                    typeof pokerPwaStandaloneForKeyboardInset === "function" &&
                    pokerPwaStandaloneForKeyboardInset() &&
                    typeof isIosLikeForChatViewport === "function" &&
                    isIosLikeForChatViewport()
                  )
                )
              ) {
                chatComposerEl = target;
                var hadPwaFocusinKeyboardBinding = !!target.__pokerChatKeyboardEventsBound;
                if (typeof bindChatComposerKeyboardEvents === "function") bindChatComposerKeyboardEvents(target);
                if (markPwaIosChatFocusActivation(target, hadPwaFocusinKeyboardBinding ? "focusin-bound" : "focusin", hadPwaFocusinKeyboardBinding ? 120 : 260)) {
                  setTimeout(function () {
                    try {
                      onChatInputFocus(target);
                    } catch (ePwaFocusInActivate) {}
                  }, 0);
                }
              }
            } catch (ePwaFocusInFallback) {}
          },
          true
        );
        document.addEventListener(
          "focusout",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusout*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "touchstart",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!target) return;
            if (!isChatKeyboardDebugTarget(target) && !(target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("touch*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "selectionchange",
          function () {
            pumpChatKeyboardDebugSnapshot("sel*");
          },
          true
        );
      }
    } catch (eDbgFocusBind) {}
    try {
      if (window.visualViewport && window.visualViewport.addEventListener && !window.__pokerChatKeyboardDebugVvBound) {
        window.__pokerChatKeyboardDebugVvBound = true;
        window.visualViewport.addEventListener("resize", function () {
          logChatKeyboardDebug("vv-resize");
        });
        window.visualViewport.addEventListener("scroll", function () {
          logChatKeyboardDebug("vv-scroll");
        });
      }
    } catch (eDbgVv) {}
    try {
      if (!window.__pokerChatKeyboardDebugWinBound) {
        window.__pokerChatKeyboardDebugWinBound = true;
        window.addEventListener("resize", function () {
          logChatKeyboardDebug("win-resize");
        });
        window.addEventListener("scroll", function () {
          logChatKeyboardDebug("win-scroll");
        }, true);
      }
    } catch (eDbgWin) {}
    try {
      if (!chatKeyboardDebugTickerStarted) {
        chatKeyboardDebugTickerStarted = true;
        window.setInterval(function () {
          pumpChatKeyboardDebugSnapshot("tick");
        }, 180);
      }
    } catch (eDbgTicker) {}
  }
  renderChatKeyboardDebugPanel();
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

  function syncClubChatRosterUi() {
    var title = document.getElementById("chatDialogClubTitle");
    var titleMeta = document.getElementById("chatDialogClubParticipantsMeta");
    var sub = document.getElementById("chatGeneralHeaderRosterMeta");
    var access = clubChatAccess;
    if (access === "need_apply" || access === "pending") {
      if (title) setTextContentIfChanged(title, "Главный чат");
      if (titleMeta) setTextContentIfChanged(titleMeta, "");
      if (sub) {
        sub.hidden = true;
        sub.textContent = "";
      }
      return;
    }
    var c = window._chatGeneralCache;
    var t = c && c.participantsCount != null ? c.participantsCount : null;
    if (t == null) {
      if (title) setTextContentIfChanged(title, "Главный чат");
      if (titleMeta) setTextContentIfChanged(titleMeta, "");
      if (sub) {
        sub.hidden = true;
        sub.textContent = "";
      }
      return;
    }
    if (title) setTextContentIfChanged(title, "Главный чат");
    if (titleMeta) setTextContentIfChanged(titleMeta, String(t) + " участника");
    if (sub) {
      sub.textContent = "Участников: " + String(t);
      sub.hidden = false;
    }
  }
  try {
    window.__pokerSyncClubChatRosterUi = syncClubChatRosterUi;
  } catch (eSyncRoster) {}

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

  /** Id участника чата (tg_… / vk_…), как на сервере в поле from — пересчитываем при каждом рендере: в PWA initChat часто раньше, чем завершился вход. */
  function resolveMyChatMemberId() {
    try {
      var _auth = window.__pokerTelegramAuth;
      if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
        var u = _auth.user;
        if (u.memberId != null && String(u.memberId).trim() !== "") return String(u.memberId).trim();
        var raw = String(u.id);
        if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0) return raw;
        if (u.is_vk || u.vk) return "vk_" + raw;
        return "tg_" + raw;
      }
    } catch (eA) {}
    try {
      var wtg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user && wtg.initData && String(wtg.initData).trim()) {
        var u0 = wtg.initDataUnsafe.user;
        if (u0 && u0.id != null) return "tg_" + String(u0.id);
      }
    } catch (eT) {}
    return null;
  }
  try {
    window.__pokerResolveMyChatMemberId = resolveMyChatMemberId;
  } catch (eExposeMyChatMemberId) {}

  try {
    window.pokerResolveMyChatMemberId = resolveMyChatMemberId;
  } catch (ePubMy) {}
  function syncChatConvGroupAddMembersBtn() {
    var b = document.getElementById("chatConvGroupAddMembersBtn");
    if (!b) return;
    var grp = !!(chatWithUserId && String(chatWithUserId).indexOf("group_") === 0);
    var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    b.hidden = !grp || !cred;
  }
  function resolveMyChatDisplayName() {
    try {
      var _cdn = window.__pokerChatDisplayName;
      if (_cdn != null && String(_cdn).trim()) return String(_cdn).trim();
    } catch (eCdn) {}
    try {
      var _auth2 = window.__pokerTelegramAuth;
      if (_auth2 && _auth2.user && (_auth2.status === "verified" || _auth2.status === "dev_skip")) {
        if (typeof telegramUserDisplayName === "function") {
          var nm = telegramUserDisplayName(_auth2.user);
          if (nm) return nm;
        }
        var u2 = _auth2.user;
        if (u2.first_name) return String(u2.first_name);
        if (u2.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(u2.username)) {
          return String(u2.username);
        }
        if (u2.username) return String(u2.username);
      }
    } catch (eN) {}
    try {
      var wtgN = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (wtgN && wtgN.initDataUnsafe && wtgN.initDataUnsafe.user) {
        var uCh = wtgN.initDataUnsafe.user;
        return (
          uCh.first_name ||
          (uCh.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(uCh.username)
            ? uCh.username
            : "") ||
          "Вы"
        );
      }
    } catch (eTN) {}
    return "Вы";
  }

  function escapeHtml(s) {
    if (!s) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  var chatVoiceMedia = typeof initChatVoiceMedia === "function" ? initChatVoiceMedia({ escapeHtml: escapeHtml }) : {};
  var pokerNormalizeVoiceDataUrl = chatVoiceMedia.pokerNormalizeVoiceDataUrl || function (dataUrl) { return dataUrl; };
  var chatVoiceMessageHtml = chatVoiceMedia.chatVoiceMessageHtml || function () { return ""; };
  var appendChatVoiceToTextWrap = chatVoiceMedia.appendChatVoiceToTextWrap || function () {};
  var chatMsgVoiceOnlyNoCaption = chatVoiceMedia.chatMsgVoiceOnlyNoCaption || function () { return false; };
  function linkTgUsernames(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/@([a-zA-Z0-9_]{5,32})(?![a-zA-Z0-9_])/g, function (_, u) {
      return '<a href="https://t.me/' + escapeHtml(u) + '" class="chat-msg__tg-link">@' + escapeHtml(u) + '</a>';
    });
  }
  function linkUrls(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/(https?:\/\/[^\s<>&"']+)/g, function (url) {
      var href = url.replace(/&amp;/g, "&");
      return '<a href="' + escapeHtml(href).replace(/"/g, "&quot;") + '" class="chat-msg__link" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
  }
  function linkAppIds(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/\b(ID\d{6})\b/gi, function (_, id) {
      var idUp = id.toUpperCase();
      return '<button type="button" class="chat-msg__id-link" data-app-id="' + escapeHtml(idUp) + '">' + escapeHtml(idUp) + '</button>';
    });
  }
  function chatMessageBodyHtml(m) {
    var raw = (m.text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
    return linkTgUsernames(linkAppIds(linkUrls(raw)));
  }

  window.lastGeneralStats = "";
  window.lastListStats = "";
  window.lastConvStats = "";
  window.__pokerChatNetworkOnline = !(typeof navigator !== "undefined" && navigator.onLine === false);
  function closeSwitcherDropdown() {}  function closeSwitcherDropdown() {}
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
  var buildContactsRequestUrl = chatContactsLoader.buildContactsRequestUrl;
  var mergeContactsMetaPayload = chatContactsLoader.mergeContactsMetaPayload;
  var loadContacts = chatContactsLoader.loadContacts;
  function findChatContactByPeerIdLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return null;
    var data = window.__pokerLastContactsApiData;
    if ((!data || !Array.isArray(data.contacts) || data.contacts.length === 0) && typeof pokerTryReadContactsCache === "function") {
      try {
        var cached = pokerTryReadContactsCache();
        if (cached && cached.ok && Array.isArray(cached.contacts)) data = cached;
      } catch (eChatPeerLocalCache) {}
    }
    if (!data || !Array.isArray(data.contacts)) return null;
    for (var i = 0; i < data.contacts.length; i++) {
      var c = data.contacts[i];
      if (!c || c.id == null) continue;
      if (peerChatIdsEqual(c.id, pid)) return c;
    }
    return null;
  }
  function hydrateOpenDmHeaderFromContactsLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    var found = findChatContactByPeerIdLocal(pid);
    var cachedMeta = null;
    try {
      cachedMeta = typeof pokerGetCachedChatPeerMeta === "function" ? pokerGetCachedChatPeerMeta(pid) : null;
    } catch (eChatPeerLocalMeta) {}
    if (!found && cachedMeta) found = Object.assign({ id: pid }, cachedMeta);
    if (!found) return false;
    try {
      var resolvedName = found.contactName || found.name || (cachedMeta && (cachedMeta.contactName || cachedMeta.name)) || "";
      if (resolvedName) {
        chatWithUserName = resolvedName;
        if (convTitle) setTextContentIfChanged(convTitle, resolvedName);
      }
      var resolvedP21Id = found.p21Id != null ? found.p21Id : cachedMeta && cachedMeta.p21Id != null ? cachedMeta.p21Id : "";
      setChatConvTitleIdText(resolvedP21Id);
      if ((found.pokerPlusVerified === true) || (cachedMeta && cachedMeta.pokerPlusVerified === true)) setChatPeerVerified(true);
      var resolvedStatusLevel = found.statusLevel != null ? found.statusLevel : cachedMeta && cachedMeta.statusLevel != null ? cachedMeta.statusLevel : "";
      if (resolvedStatusLevel != null && String(resolvedStatusLevel).trim() !== "") setChatConvTitleFish(resolvedStatusLevel);
      var resolvedAvatar = found.avatar != null && String(found.avatar).trim()
        ? String(found.avatar).trim()
        : cachedMeta && cachedMeta.avatar != null && String(cachedMeta.avatar).trim()
          ? String(cachedMeta.avatar).trim()
          : "";
      if (resolvedAvatar) {
        chatWithPeerAvatarUrl = resolvedAvatar;
        applyConvPeerAvatarHeader(resolvedAvatar, chatWithUserName || resolvedName || pid);
      } else if (chatWithUserName || resolvedName) {
        applyConvPeerAvatarHeader("", chatWithUserName || resolvedName || pid);
      }
      pokerPushOpenDebug("header-hydrated-local", pid);
      return true;
    } catch (eChatPeerLocalHydrate) {}
    return false;
  }
  function scheduleDmHeaderHydrateLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return;
    try {
      if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
    } catch (eChatPeerLocalHydrateCache) {}
    try {
      clearTimeout(window.__pokerPushDmHeaderHydrateTimer || 0);
    } catch (eChatPeerLocalHydrateClr) {}
    window.__pokerPushDmHeaderHydrateTimer = setTimeout(function () {
      try {
        if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
        loadContacts({
          metaOnly: true,
          onLoaded: function () {
            try {
              if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
              hydrateOpenDmHeaderFromProfileLocal(pid);
            } catch (eChatPeerLocalHydrateLoaded) {}
          },
        });
      } catch (eChatPeerLocalHydrateLoad) {}
    }, 80);
  }
  function hydrateOpenDmHeaderFromProfileLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    fetch(base + "/api/users?userId=" + encodeURIComponent(pid) + pokerApiAuthQuery("&"))
      .then(function (r) {
        return r.json().catch(function () { return { ok: false }; });
      })
      .then(function (data) {
        try {
          if (!data || !data.ok) return;
          if (!chatWithUserId || !peerChatIdsEqual(chatWithUserId, pid)) return;
          var profileName =
            data.contactName != null && String(data.contactName).trim()
              ? String(data.contactName).trim()
              : data.chatDisplayName != null && String(data.chatDisplayName).trim()
                ? String(data.chatDisplayName).trim()
                : data.userName != null && String(data.userName).trim()
                  ? String(data.userName).trim()
                  : "";
          if (profileName) {
            chatWithUserName = profileName;
            if (convTitle) setTextContentIfChanged(convTitle, profileName);
          }
          setChatConvTitleIdText(data.p21Id != null ? data.p21Id : "");
          if (data.pokerPlusVerified === true) setChatPeerVerified(true);
          if (data.statusLevel != null && String(data.statusLevel).trim() !== "") setChatConvTitleFish(data.statusLevel);
          var profileAvatar = data.avatar != null && String(data.avatar).trim() ? String(data.avatar).trim() : "";
          if (profileAvatar) {
            chatWithPeerAvatarUrl = profileAvatar;
            applyConvPeerAvatarHeader(profileAvatar, chatWithUserName || profileName || pid);
          } else if (profileName) {
            applyConvPeerAvatarHeader("", profileName);
          }
          pokerPushOpenDebug("header-profile-hydrated-local", pid);
        } catch (eChatPeerLocalProfileApply) {}
      })
      .catch(function () {});
    return true;
  }
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
    if (!statusLevel) return "";
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


  function resizeImage(file, maxW, maxH, quality) {
    maxW = maxW || 800;
    maxH = maxH || 800;
    if (quality == null || isNaN(quality)) quality = 0.92;
    /* Цель по длине base64 — укладываться в лимит chat.js (450k), без обрыва на q=0.6 */
    var JPEG_MAX_B64 = 400000;
    function jpegBase64Len(dataUrl) {
      var c = dataUrl.indexOf(",");
      return c >= 0 ? dataUrl.length - c - 1 : dataUrl.length;
    }
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.width, h = img.height;
        if (w > maxW || h > maxH) {
          if (w > h) { h = Math.round(h * maxW / w); w = maxW; } else { w = Math.round(w * maxH / h); h = maxH; }
        }
        var canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        if (!ctx) { resolve(url); return; }
        function encodeUnderLimit() {
          var q = quality;
          var dataUrl = null;
          var a;
          for (a = 0; a < 12; a++) {
            dataUrl = canvas.toDataURL("image/jpeg", q);
            if (jpegBase64Len(dataUrl) <= JPEG_MAX_B64) return dataUrl;
            q = Math.max(0.74, q - 0.04);
          }
          return dataUrl;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          var out = encodeUnderLimit();
          if (jpegBase64Len(out) > JPEG_MAX_B64) {
            var w2 = Math.max(480, Math.round(w * 0.85));
            var h2 = Math.max(480, Math.round(h * 0.85));
            canvas.width = w2;
            canvas.height = h2;
            ctx = canvas.getContext("2d");
            if (!ctx) { resolve(out); return; }
            ctx.drawImage(img, 0, 0, w2, h2);
            quality = 0.92;
            out = encodeUnderLimit();
          }
          resolve(out);
        } catch (e) { reject(e); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Не удалось загрузить")); };
      img.src = url;
    });
  }

  // Уровень 1 из 55 = двойка треф (2♣), уровень 2 = тройка треф (3♣), и т.д. параллельно по колоде (трефы 1–13, бубны 14–26, черви 27–39, пики 40–52, джокеры 53–54, 55 = Бог покера).
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
  /** Догрузка img: лёгкий snap по load/error (без скрытия ленты и ожидания стабилизации высоты). */
  function pinChatMessagesToBottomImagesOnly(el) {
    if (!el) return;
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          requestAnimationFrame(function () {
            /* Открытие: scrollHeight растёт по load картинок, scrollTop не догоняет — snapIfPinned молчит.
               Пока пользователь не отмотал вверх, __pokerChatOpeningStickBottom держит низ. */
            try {
              if (el.__pokerChatOpeningStickBottom) {
                el.scrollTop = el.scrollHeight;
              } else {
                snapChatMessagesToBottomIfPinned(el);
              }
            } catch (eSnapImg) {}
          });
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
  }
  function settleChatOpeningMediaLayout(el, wrapEl, onDone) {
    if (!el) {
      if (typeof onDone === "function") onDone();
      return;
    }
    var doneCalled = false;
    function finish() {
      if (doneCalled) return;
      doneCalled = true;
      try {
        if (wrapEl && wrapEl.classList) wrapEl.classList.remove("chat-messages-wrap--settling");
      } catch (eWrapDone) {}
      try {
        if (typeof onDone === "function") onDone();
      } catch (eDoneCb) {}
    }
    var imgs = [];
    try {
      imgs = Array.prototype.slice.call(el.querySelectorAll("img.chat-msg__image"));
    } catch (eImgs) {
      finish();
      return;
    }
    if (!imgs.length) {
      finish();
      return;
    }
    var pending = 0;
    function markReady() {
      pending -= 1;
      if (pending <= 0) finish();
    }
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.complete && im.naturalHeight) continue;
      pending += 1;
      (function (imgNode) {
        var settled = false;
        function doneOne() {
          if (settled) return;
          settled = true;
          try {
            imgNode.removeEventListener("load", onLoad);
            imgNode.removeEventListener("error", onLoad);
          } catch (eImgOff) {}
          markReady();
        }
        function onLoad() {
          var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
          raf(doneOne);
        }
        try {
          imgNode.addEventListener("load", onLoad);
          imgNode.addEventListener("error", onLoad);
        } catch (eImgOn) {
          doneOne();
        }
      })(im);
    }
    if (!pending) {
      finish();
      return;
    }
    setTimeout(finish, 260);
  }
  /** Удерживаем низ ленты: после lazy-картинок / перерасчёта вёрстки scrollTop иначе «отстаёт» и лента прыгает вверх. */
  function pinChatMessagesToBottom(el, aggressive) {
    if (!el) return;
    function snap() {
      try {
        el.scrollTop = el.scrollHeight;
      } catch (eSnap) {}
    }
    /* Тройной snap при открытии без клавиатуры даёт лишний «вверх—вниз» после renderGeneralMessages (уже выставил scroll). */
    var tripleSnap = !aggressive || document.body.classList.contains("chat-keyboard-open");
    if (tripleSnap) {
      snap();
      requestAnimationFrame(function () {
        snap();
        requestAnimationFrame(snap);
      });
    }
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          snapChatMessagesToBottomIfPinned(el);
          /* У низа ленты подтянуть после смещения вёрстки; при прокрутке вверх не трогаем scrollTop. */
          if (document.body.classList.contains("chat-keyboard-open")) {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
              requestAnimationFrame(function () {
                snapChatMessagesToBottomIfPinned(el);
              });
            });
          } else {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
            });
          }
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
    if (aggressive) {
      /* На открытой клавиатуре оставляем «догоняющие» snap; без клавиатуры они дёргают первый вход в общий чат. */
      if (document.body.classList.contains("chat-keyboard-open")) {
        function snapPinned() {
          snapChatMessagesToBottomIfPinned(el);
        }
        setTimeout(snapPinned, 60);
        setTimeout(snapPinned, 200);
        setTimeout(snapPinned, 500);
        if (typeof window.visualViewport !== "undefined" && window.visualViewport.addEventListener) {
          var vvPin = function () {
            snapChatMessagesToBottomIfPinned(el);
          };
          window.visualViewport.addEventListener("resize", vvPin);
          setTimeout(function () {
            try {
              window.visualViewport.removeEventListener("resize", vvPin);
            } catch (eVv) {}
          }, 1200);
        }
      }
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

  function renderGeneralMessages(messages) {
    messages = (messages || []).filter(function (m) {
      return !(m && m.clubAdmissionNotice);
    });
    var generalMsgWrapEarly = generalMessages ? generalMessages.parentElement : null;
    var openingForceBottomG = scrollGeneralToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("general", null, messages);
    } catch (ePinG) {}
    if (!messages || messages.length === 0) {
      if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
        generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      generalMessages.innerHTML = '<p class="chat-empty">Нет сообщений. Напишите первым!</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinG2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbGE) {}
      return;
    }
    var bodyHtml = buildGeneralMessagesBodyHtml(messages);
    var html = (generalHasMoreBefore ? renderLoadOlderButtonHtml("general") : "") + bodyHtml;
    if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
      generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTop = generalMessages.scrollTop;
    var prevScrollHeight = generalMessages.scrollHeight;
    var wasNearBottom = prevScrollHeight - prevScrollTop - generalMessages.clientHeight < 80;
    generalMessages.innerHTML = html;
    function restoreScroll(clearScrollFlag) {
      var maxScroll = generalMessages.scrollHeight - generalMessages.clientHeight;
      if (openingForceBottomG || wasNearBottom || maxScroll <= 0) {
        generalMessages.scrollTop = generalMessages.scrollHeight;
        if (clearScrollFlag && openingForceBottomG) scrollGeneralToBottomOnNextRender = false;
      } else {
        generalMessages.scrollTop = Math.min(prevScrollTop, Math.max(0, maxScroll));
      }
    }
    if (openingForceBottomG) {
      try {
        if (generalMsgWrapEarly && generalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          generalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettleGFlag) {}
      try {
        generalMessages.scrollTop = generalMessages.scrollHeight;
      } catch (eScG0) {}
      var rafOpenG = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenG(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        try {
          generalMessages.scrollTop = generalMessages.scrollHeight;
        } catch (eScG1) {}
        scrollGeneralToBottomOnNextRender = false;
        try {
          generalMessages.__pokerChatOpeningStickBottom = true;
        } catch (eStickOG) {}
        pinChatMessagesToBottomImagesOnly(generalMessages);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbG) {}
        settleChatOpeningMediaLayout(generalMessages, generalMsgWrapEarly, function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG2) {}
        });
        rafOpenG(function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG3) {}
        });
      });
    } else {
      restoreScroll(false);
      requestAnimationFrame(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        restoreScroll(true);
        if (wasNearBottom) {
          pinChatMessagesToBottom(generalMessages, false);
        }
      });
    }
    bindChatMsgNameProfileButtons(generalMessages);
    generalMessages.querySelectorAll("[data-chat-load-older=\"general\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderGeneralMessages === "function") window.__pokerLoadOlderGeneralMessages();
      });
    });
    generalMessages.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    generalMessages.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadGeneral();
        });
      });
    });
    generalMessages.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("general", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    attachContextMenuForOthers(generalMessages, "general", generalMessages);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfG) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbG) {}
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
    setConvGroupCanChangeAvatar: function (value) { convGroupCanChangeAvatar = !!value; },
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


  function pokerDebugChatOverscroll(stage, payload) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var suffix = "";
      if (payload && typeof payload === "object") {
        var parts = [];
        Object.keys(payload).forEach(function (key) {
          var value = payload[key];
          if (value == null || value === "") return;
          parts.push(String(key) + "=" + String(value));
        });
        if (parts.length) suffix = parts.join(" ");
      }
      logChatKeyboardDebug(String(stage || "overscroll"), suffix);
    } catch (eDbgOver) {}
  }
  function collectChatOverscrollSnapshot(stage, focusTarget, extra) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot() || {};
      var rootStyle = null;
      try {
        rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
      } catch (eDbgRootStyle) {}
      var viewChat = document.querySelector('.view[data-view="chat"]');
      var viewRect = viewChat && viewChat.getBoundingClientRect ? viewChat.getBoundingClientRect() : null;
      var generalRect = generalView && generalView.getBoundingClientRect ? generalView.getBoundingClientRect() : null;
      var convRect = convView && convView.getBoundingClientRect ? convView.getBoundingClientRect() : null;
      var msgs = typeof getVisibleMessagesEl === "function" ? getVisibleMessagesEl() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      var area = getActiveChatInputArea();
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        chatGeneralComposerEl ||
        chatPersonalComposerEl ||
        chatComposerEl ||
        null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var scrollEl = document.scrollingElement || document.documentElement || document.body;
      var payload = {
        event: stage || "",
        state: getChatKeyboardDebugStableState(),
        focus: getChatKeyboardDebugNodeLabel(focusTarget || document.activeElement),
        activeTab: chatActiveTab || "",
        mounted: chatComposerMounted || "",
        runtimeTg: isTelegramChatRuntime() ? 1 : 0,
        activeShared: ta === chatSharedComposerEl ? 1 : 0,
        activeGeneral: ta === chatGeneralComposerEl ? 1 : 0,
        activePersonal: ta === chatPersonalComposerEl ? 1 : 0,
        view: viewRect ? Math.round(viewRect.top) + "+" + Math.round(viewRect.height) : "",
        gen: generalRect ? Math.round(generalRect.top) + "+" + Math.round(generalRect.height) : "",
        conv: convRect ? Math.round(convRect.top) + "+" + Math.round(convRect.height) : "",
        msgs: msgsRect ? Math.round(msgsRect.top) + "+" + Math.round(msgsRect.height) : "",
        area: areaRect ? Math.round(areaRect.top) + "+" + Math.round(areaRect.height) : "",
        ta: taRect ? Math.round(taRect.top) + "+" + Math.round(taRect.height) : "",
        msgScr: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgH: msgs ? Math.round(msgs.scrollHeight || 0) + "/" + Math.round(msgs.clientHeight || 0) : "",
        rootScr: scrollEl ? Math.round(scrollEl.scrollTop || 0) : 0,
        winY: Math.round(window.scrollY || 0),
        vv: snap.vvh ? snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop : "",
        tgV: snap.tgVh ? snap.tgVh + "/" + snap.tgVs : "",
        kb: (document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0) + "/" + (document.body.classList.contains("chat-keyboard-open") ? 1 : 0),
        areaPos: snap.areaPos || "",
        areaBottom: snap.areaBottom || "",
        areaTf: snap.areaTransform || "",
        areaCls: area && area.className ? String(area.className).replace(/\s+/g, ".") : "",
        taId: ta && ta.id ? ta.id : "",
        docVv: rootStyle ? String(rootStyle.getPropertyValue("--chat-vv-inset") || "").trim() : "",
        docAcc: rootStyle ? String(rootStyle.getPropertyValue("--chat-ios-accessory-inset") || "").trim() : "",
        dockBottom: Number(window.__pokerChatThreadDockBottomCssPx) || 0,
        lastPad: Number(window.__pokerChatMessagesKeyboardPadLast) || 0,
        lastCover: Number(window.__pokerChatTgKeyboardCoverLast) || 0,
        lastDock: Number(window.__pokerChatLastAppliedDockBottom) || 0,
        focusAge: Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0)),
        openingUntil: Math.max(0, (Number(window.__pokerChatKeyboardOpeningUntil) || 0) - Date.now())
      };
      if (extra && typeof extra === "object") {
        Object.keys(extra).forEach(function (key) {
          payload[key] = extra[key];
        });
      }
      pokerDebugChatOverscroll("snap", payload);
    } catch (eDbgCollect) {
      logChatKeyboardDebug("snap-err", String((eDbgCollect && eDbgCollect.message) || eDbgCollect || ""));
    }
  }


  (function bindChatContactSwipeAndPinList() {
    if (!contactsEl || contactsEl._chatContactSwipePinInit) return;
    contactsEl._chatContactSwipePinInit = true;
    function getSwipeRevealPx(panel) {
      if (!panel) return 52;
      var w = panel.closest(".chat-contact-swipe");
      return w && w.classList.contains("chat-contact-swipe--wide-actions") ? 104 : 52;
    }
    var swipeState = null;
    function getPanelTx(panel) {
      if (!panel || !panel.style || !panel.style.transform) return 0;
      var m = String(panel.style.transform).match(/translateX\(\s*(-?[0-9.]+)px\s*\)/);
      return m ? parseFloat(m[1], 10) : 0;
    }
    function closeOtherSwipePanels(exceptPanel) {
      if (!contactsEl) return;
      contactsEl.querySelectorAll(".chat-contact-swipe__panel").forEach(function (p) {
        if (exceptPanel && p === exceptPanel) return;
        p.style.transform = "";
        p.classList.remove("chat-contact-swipe__panel--open");
        p.classList.remove("chat-contact-swipe__panel--dragging");
        var w0 = p.closest(".chat-contact-swipe");
        if (w0) w0.classList.remove("chat-contact-swipe--show-actions");
      });
    }
    function snapPanel(panel, open) {
      if (!panel) return;
      var rev = getSwipeRevealPx(panel);
      panel.style.transform = open ? "translateX(-" + rev + "px)" : "";
      panel.classList.toggle("chat-contact-swipe__panel--open", !!open);
    }
    contactsEl.addEventListener(
      "click",
      function (e) {
        var cbtn = e.target && e.target.closest ? e.target.closest(".chat-contact") : null;
        if (!cbtn || !contactsEl.contains(cbtn)) return;
        var u = cbtn._suppressNextClickUntil;
        if (u != null && Date.now() < Number(u)) {
          e.preventDefault();
          e.stopPropagation();
          cbtn._suppressNextClickUntil = 0;
          return;
        }
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var pinB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__pin") : null;
        if (!pinB || !contactsEl.contains(pinB)) return;
        e.preventDefault();
        e.stopPropagation();
        var wrap = pinB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        if (!cid) return;
        var removing = pokerContactIsDialogListPinned(cid);
        pokerToggleChatDialogListPin(cid, removing);
        closeOtherSwipePanels(null);
        try {
          if (window.__pokerLastContactsApiData && typeof window.__pokerApplyContactsApiResponse === "function") {
            window.__pokerApplyContactsApiResponse(window.__pokerLastContactsApiData);
          }
        } catch (ePinApplyFast) {}
        if (typeof loadContacts === "function") loadContacts({ metaOnly: true });
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var frB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend") : null;
        pokerDebugChatFriendAction("click:add:received", {
          targetClassName: e.target && e.target.className ? String(e.target.className) : "",
          foundButton: !!frB,
          buttonClassName: frB && frB.className ? String(frB.className) : "",
          contactsContainsButton: !!(frB && contactsEl.contains(frB)),
        });
        if (!frB || !contactsEl.contains(frB)) return;
        if (frB.classList && frB.classList.contains("chat-contact-swipe__friend--remove")) {
          pokerDebugChatFriendAction("click:add:skipRemoveButton", {
            buttonClassName: frB.className ? String(frB.className) : "",
          });
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        var wrap = frB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        var cnm = cbtn && cbtn.getAttribute("data-chat-name");
        pokerDebugChatFriendAction("click:add:resolved", {
          chatId: cid || "",
          chatName: cnm || "",
          isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
          wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
          contactButtonFound: !!cbtn,
          chatGroup: cbtn && cbtn.getAttribute ? cbtn.getAttribute("data-chat-group") : "",
        });
        if (!cid) return;
        closeOtherSwipePanels(null);
        if (typeof pokerChatAddFriendWithPrompt === "function") pokerChatAddFriendWithPrompt(cid, cnm || "", null);
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var rmB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend--remove") : null;
        pokerDebugChatFriendAction("click:remove:received", {
          targetClassName: e.target && e.target.className ? String(e.target.className) : "",
          foundButton: !!rmB,
          buttonClassName: rmB && rmB.className ? String(rmB.className) : "",
          contactsContainsButton: !!(rmB && contactsEl.contains(rmB)),
        });
        if (!rmB || !contactsEl.contains(rmB)) return;
        e.preventDefault();
        e.stopPropagation();
        var wrap = rmB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        var prevName = cbtn && cbtn.getAttribute("data-chat-name");
        pokerDebugChatFriendAction("click:remove:resolved", {
          chatId: cid || "",
          prevName: prevName || "",
          isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
          wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
          contactButtonFound: !!cbtn,
          hasBase: !!base,
          base: base || "",
        });
        if (!cid) return;
        pokerDebugChatFriendAction("click:remove:beforeCloseOtherPanels", {
          chatId: cid || "",
        });
        try {
          closeOtherSwipePanels(null);
          pokerDebugChatFriendAction("click:remove:afterCloseOtherPanels", {
            chatId: cid || "",
          });
        } catch (eClosePanels) {
          pokerDebugChatFriendAction("click:remove:closeOtherPanelsError", {
            chatId: cid || "",
            error: eClosePanels && eClosePanels.message ? eClosePanels.message : String(eClosePanels || ""),
          });
          throw eClosePanels;
        }
        pokerDebugChatFriendAction("click:remove:beforeRemoveLocal", {
          chatId: cid || "",
        });
        try {
          pokerRemoveLocalFriendFromChatContacts(cid);
          pokerDebugChatFriendAction("click:remove:afterRemoveLocal", {
            chatId: cid || "",
          });
        } catch (eRemoveLocal) {
          pokerDebugChatFriendAction("click:remove:removeLocalError", {
            chatId: cid || "",
            error: eRemoveLocal && eRemoveLocal.message ? eRemoveLocal.message : String(eRemoveLocal || ""),
          });
          throw eRemoveLocal;
        }
        pokerDebugChatFriendAction("click:remove:afterOptimistic", {
          chatId: cid || "",
          isFriendAfterOptimistic:
            typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(cid) : false,
          requestUrl: base + "/api/friends",
        });
        fetch(base + "/api/friends", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: cid })),
        })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            pokerDebugChatFriendAction("click:remove:response", {
              chatId: cid || "",
              ok: !!(d && d.ok),
              response: d || null,
              isFriendAfterResponse:
                typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(cid) : false,
            });
            if (d && d.ok) {
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (typeof window.chatRefresh === "function") window.chatRefresh();
            } else if (tg && tg.showAlert) {
              pokerApplyLocalFriendToChatContacts(cid, prevName || "");
              tg.showAlert((d && d.error) || "Ошибка");
            }
          })
          .catch(function () {
            pokerDebugChatFriendAction("click:remove:error", {
              chatId: cid || "",
              requestUrl: base + "/api/friends",
            });
            pokerApplyLocalFriendToChatContacts(cid, prevName || "");
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      },
      true
    );
    function onDocMove(e) {
      if (!swipeState || e.pointerId !== swipeState.ptrId) return;
      var dx = e.clientX - swipeState.startX;
      var dy = e.clientY - swipeState.startY;
      if (swipeState.mode == null) {
        var adx = Math.abs(dx);
        var ady = Math.abs(dy);
        /* Вертикаль только при явном скролле — иначе легкий наклон перехватывал список и срывал свайп. */
        if (ady > 22 && ady > adx * 1.35) {
          swipeState.mode = "vert";
          return;
        }
        /* Горизонталь при доминировании по X (в т.ч. диагональ «в сторону»). */
        if (adx > 10 && adx >= ady * 0.92) {
          swipeState.mode = "horiz";
          swipeState.panel.classList.add("chat-contact-swipe__panel--dragging");
          var wHoriz = swipeState.panel.closest(".chat-contact-swipe");
          if (wHoriz) wHoriz.classList.add("chat-contact-swipe--show-actions");
          closeOtherSwipePanels(swipeState.panel);
          try {
            swipeState.panel.setPointerCapture(e.pointerId);
          } catch (eCap) {}
        } else {
          return;
        }
      }
      if (swipeState.mode !== "horiz") return;
      e.preventDefault();
      var rev = swipeState.revealPx || 52;
      var tx = Math.max(-rev, Math.min(0, swipeState.startTx + dx));
      swipeState.panel.style.transform = "translateX(" + tx + "px)";
      if (Math.abs(dx) > 14) swipeState.didAxisDrag = true;
    }
    function onDocUp(e) {
      if (!swipeState || e.pointerId !== swipeState.ptrId) return;
      var st = swipeState;
      swipeState = null;
      try {
        if (st.panel && st.panel.releasePointerCapture) st.panel.releasePointerCapture(e.pointerId);
      } catch (eRel) {}
      document.removeEventListener("pointermove", onDocMove, true);
      document.removeEventListener("pointerup", onDocUp, true);
      document.removeEventListener("pointercancel", onDocUp, true);
      if (st.mode !== "horiz") return;
      if (st.panel) st.panel.classList.remove("chat-contact-swipe__panel--dragging");
      var txNow = getPanelTx(st.panel);
      var revUp = st.revealPx || 52;
      var snapOpen = txNow <= -revUp / 2;
      snapPanel(st.panel, snapOpen);
      var wUp = st.panel.closest(".chat-contact-swipe");
      if (wUp) wUp.classList.toggle("chat-contact-swipe--show-actions", !!snapOpen);
      if (st.didAxisDrag) {
        var cInner = st.panel.querySelector(".chat-contact");
        if (cInner) cInner._suppressNextClickUntil = Date.now() + 420;
      }
    }
    contactsEl.addEventListener(
      "pointerdown",
      function (e) {
        if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
        var panel = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__panel") : null;
        if (!panel || !contactsEl.contains(panel)) return;
        if (e.target.closest && e.target.closest(".chat-contact-swipe__pin")) return;
        if (e.target.closest && e.target.closest(".chat-contact-swipe__friend")) return;
        var revealPx = getSwipeRevealPx(panel);
        if (swipeState) {
          document.removeEventListener("pointermove", onDocMove, true);
          document.removeEventListener("pointerup", onDocUp, true);
          document.removeEventListener("pointercancel", onDocUp, true);
          if (swipeState.panel) {
            swipeState.panel.classList.remove("chat-contact-swipe__panel--dragging");
            var wPr = swipeState.panel.closest(".chat-contact-swipe");
            if (wPr && !swipeState.panel.classList.contains("chat-contact-swipe__panel--open")) {
              wPr.classList.remove("chat-contact-swipe--show-actions");
            }
          }
          swipeState = null;
        }
        swipeState = {
          ptrId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          startTx: getPanelTx(panel),
          panel: panel,
          mode: null,
          didAxisDrag: false,
          revealPx: revealPx,
        };
        document.addEventListener("pointermove", onDocMove, true);
        document.addEventListener("pointerup", onDocUp, true);
        document.addEventListener("pointercancel", onDocUp, true);
      },
      { passive: true }
    );
    var listScroll = document.querySelector(".chat-dialogs-list");
    if (listScroll && !listScroll._chatSwipeScrollCloseBound) {
      listScroll._chatSwipeScrollCloseBound = true;
      listScroll.addEventListener(
        "scroll",
        function () {
          closeOtherSwipePanels(null);
        },
        { passive: true }
      );
    }
  })();

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

  function renderMessages(messages) {
    if (!messagesEl) return;
    if (Array.isArray(messages) && messages.length > POKER_CHAT_DISK_PERSONAL_MAX_MSG) {
      messages = messages.slice(-POKER_CHAT_DISK_PERSONAL_MAX_MSG);
      if (chatWithUserId) personalMessagesCache[chatWithUserId] = messages;
    }
    var personalMsgWrapEarly = messagesEl.parentElement;
    var openingForceBottomP = scrollPersonalToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("personal", chatWithUserId, messages);
    } catch (ePinPM) {}
    if (!messages || messages.length === 0) {
      if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
        personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      messagesEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinPM2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbPE) {}
      return;
    }
    var activePeerForRender = chatWithUserId ? String(chatWithUserId) : "";
    var hasMoreBeforePersonal = !!(activePeerForRender && personalHasMoreBeforeByPeer[activePeerForRender]);
    var bodyHtml = buildPersonalMessagesBodyHtml(messages);
    var html = (hasMoreBeforePersonal ? renderLoadOlderButtonHtml("personal") : "") + bodyHtml;
    if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
      personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTopP = messagesEl.scrollTop;
    var prevScrollHeightP = messagesEl.scrollHeight;
    var wasNearBottomP = prevScrollHeightP - prevScrollTopP - messagesEl.clientHeight < 80;
    messagesEl.innerHTML = html;
    function restoreScrollP(clearScrollFlag) {
      var maxScrollP = messagesEl.scrollHeight - messagesEl.clientHeight;
      if (openingForceBottomP || wasNearBottomP || maxScrollP <= 0) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
        if (clearScrollFlag && openingForceBottomP) scrollPersonalToBottomOnNextRender = false;
      } else {
        messagesEl.scrollTop = Math.min(prevScrollTopP, Math.max(0, maxScrollP));
      }
    }
    if (openingForceBottomP) {
      try {
        if (personalMsgWrapEarly && personalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          personalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettlePFlag) {}
      try {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      } catch (eScP0) {}
      var rafOpenP = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenP(function () {
        applyChatMsgTallTextTimeBelowLayout(messagesEl);
        try {
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } catch (eScP1) {}
        scrollPersonalToBottomOnNextRender = false;
        try {
          messagesEl.__pokerChatOpeningStickBottom = true;
        } catch (eStickOP) {}
        pinChatMessagesToBottomImagesOnly(messagesEl);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbP) {}
        settleChatOpeningMediaLayout(messagesEl, personalMsgWrapEarly, function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP2) {}
        });
        rafOpenP(function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP3) {}
        });
      });
    } else {
      restoreScrollP(false);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          applyChatMsgTallTextTimeBelowLayout(messagesEl);
          restoreScrollP(true);
          if (wasNearBottomP) {
            pinChatMessagesToBottom(messagesEl, false);
          }
        });
      });
    }
    messagesEl.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id, with: chatWithUserId })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadMessages();
        });
      });
    });
    messagesEl.querySelectorAll("[data-chat-load-older=\"personal\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderPersonalMessages === "function") window.__pokerLoadOlderPersonalMessages();
      });
    });
    messagesEl.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("personal", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    messagesEl.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    attachContextMenuForOthers(messagesEl, "personal", messagesEl);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfP) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbP) {}
    bindChatMsgNameProfileButtons(messagesEl);
  }

  function renderDialogPreviewMessagesInto(targetEl, messages) {
    if (!targetEl) return;
    var CHAT_DIALOG_PREVIEW_MAX = 50;
    var slice =
      messages && messages.length > CHAT_DIALOG_PREVIEW_MAX ? messages.slice(-CHAT_DIALOG_PREVIEW_MAX) : messages;
    if (!slice || slice.length === 0) {
      targetEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      return;
    }
    function personalReceiptHtmlPrev(m, isOwn) {
      if (!isOwn) return "";
      var receipt = typeof getPersonalReceiptState === "function"
        ? getPersonalReceiptState(m, isOwn)
        : { delivered: false, read: false };
      var textTicks = receipt.delivered ? "✓✓" : "✓";
      var cls =
        "chat-msg__ticks" +
        (receipt.delivered ? " chat-msg__ticks--delivered" : " chat-msg__ticks--sent") +
        (receipt.read ? " chat-msg__ticks--read" : "");
      return '<div class="' + cls + '" aria-hidden="true">' + textTicks + "</div>";
    }
    var myIdRenderP = resolveMyChatMemberId();
    var html = slice
      .map(function (m, i) {
        var prev = i > 0 ? slice[i - 1] : null;
        var next = i < slice.length - 1 ? slice[i + 1] : null;
        var sameUser = function (a, b) {
          if (!a || !b || a.from == null || a.from === "" || b.from == null || b.from === "") return false;
          return peerChatIdsEqual(a.from, b.from);
        };
        var isFirstInGroup = !prev || !sameUser(prev, m);
        var isLastInGroup = !next || !sameUser(next, m);
        var isOwn = !!(myIdRenderP && peerChatIdsEqual(m.from, myIdRenderP));
        var cls = (isOwn ? "chat-msg chat-msg--own" : "chat-msg chat-msg--other") + " chat-msg--dialog-preview";
        var time = m.time ? new Date(m.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
        var text = chatMessageBodyHtml(m);
        var imgBlock = m.image
          ? '<img class="chat-msg__image" src="' +
            escapeHtml(pokerChatDisplayImageSrc(m.image)) +
            '" alt="Картинка"' +
            chatMsgImageAttrs(i, slice.length) +
            " />"
          : "";
        var editedBadge = m.edited ? '<span class="chat-msg__edited">(отредактировано)</span>' : "";
        var ticksPrevDlg = personalReceiptHtmlPrev(m, isOwn);
        var voiceOnlyPrevDlg = chatMsgVoiceOnlyNoCaption(m);
        var voiceBlock = m.voice
          ? chatVoiceMessageHtml(
              m.voice,
              voiceOnlyPrevDlg
                ? { footerToolbarHtml: '<span class="chat-msg__time">' + time + "</span>" + editedBadge + ticksPrevDlg }
                : undefined
            )
          : "";
        var documentBlock = m.document ? chatDocumentBlockHtml(m.document, m.documentName || "document.pdf") : "";
        var replyBlock = m.replyTo
          ? '<div class="chat-msg__reply"><strong>' +
            escapeHtml(m.replyTo.fromName || "Игрок") +
            ":</strong> " +
            escapeHtml(String(m.replyTo.text || "").slice(0, 80)) +
            (String(m.replyTo.text || "").length > 80 ? "…" : "") +
            "</div>"
          : "";
        var adminBadge = m.fromAdmin ? '<span class="chat-msg__admin">(админ)</span>' : "";
        var avLetter = (m.fromName && m.fromName.charAt(0)) || (m.from && m.from.charAt(1)) || "И";
        var avatarEl = isLastInGroup
          ? m.fromAvatar
            ? '<img class="chat-msg__avatar" src="' +
              escapeHtml(m.fromAvatar) +
              '" alt=""' +
              CHAT_MSG_AVATAR_IMG_ATTRS +
              " />"
            : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + escapeHtml(avLetter) + "</span>"
          : '<span class="chat-msg__avatar-spacer"></span>';
        var nameElP = "";
        if (!isOwn) {
          var nameStrP = escapeHtml(m.fromName || "Игрок");
          var statusLevelP = m.fromStatusLevel != null && m.fromStatusLevel !== "" ? pokerProfileStatusFishLevel(m.fromStatusLevel) : "";
          var levelStrP = chatProfileStatusLevelHtml(statusLevelP);
          var fishIconStrP = pokerProfileStatusFishIconHtml(statusLevelP, "chat-msg__status-fish");
          var verifiedStrP = chatPokerPlusVerifiedBadgeHtml(m.fromPokerPlusVerified);
          var respectValP =
            m.fromRespect !== undefined && m.fromRespect !== null
              ? m.fromRespect === 0
                ? "\u2014"
                : String(m.fromRespect)
              : "\u2014";
          var respectClassP = "chat-msg__respect";
          if (m.fromRespect > 0) respectClassP += " chat-msg__respect--positive";
          else if (m.fromRespect < 0) respectClassP += " chat-msg__respect--negative";
          var metaLineTopP =
            '<div class="chat-msg__meta-line">' +
            '<span class="chat-msg__name">' +
            nameStrP +
            "</span>" +
            verifiedStrP +
            levelStrP +
            fishIconStrP +
            "</div>";
          var respectPartP =
            '<span class="chat-msg__respect-row chat-msg__respect-inline"><span class="' +
            respectClassP +
            '" title="Уважение в чате">Ув: ' +
            escapeHtml(respectValP) +
            "</span></span>";
          var metaLineRespectP = '<div class="chat-msg__meta-line chat-msg__meta-sub">' + respectPartP + "</div>";
          var pmAvatarAttrPrev = m.fromAvatar ? ' data-pm-avatar="' + escapeHtml(m.fromAvatar) + '"' : "";
          nameElP =
            '<div class="chat-msg__meta-stack"><button type="button" class="chat-msg__name-btn" data-pm-id="' +
            escapeHtml(m.from || "") +
            '" data-pm-name="' +
            escapeHtml(m.fromName || m.fromDtId || "Игрок") +
            '"' +
            pmAvatarAttrPrev +
            ">" +
            metaLineTopP +
            "</button>" +
            metaLineRespectP +
            "</div>";
        }
        var textBlock =
          text || imgBlock || voiceBlock || documentBlock
            ? '<div class="chat-msg__text">' + imgBlock + voiceBlock + documentBlock + text + "</div>"
            : "";
        var reactionsHtmlP = "";
        if (m.id && m.reactions && typeof m.reactions === "object") {
          var emKeysPrev = [];
          for (var emp in m.reactions) {
            if (
              Object.prototype.hasOwnProperty.call(m.reactions, emp) &&
              Array.isArray(m.reactions[emp]) &&
              m.reactions[emp].length > 0
            ) {
              emKeysPrev.push(emp);
            }
          }
          var pillsP = [];
          sortChatReactionEmojiKeys(emKeysPrev).forEach(function (emp) {
            var countP = m.reactions[emp].length;
            pillsP.push(
              '<span class="chat-dialog-preview__reaction-pill">' +
                escapeHtml(emp) +
                ' <span class="chat-msg__reaction-count">' +
                countP +
                "</span></span>"
            );
          });
          reactionsHtmlP = pillsP.join("");
        }
        var reactionsRowP = reactionsHtmlP
          ? '<div class="chat-msg__reactions-wrap"><span class="chat-msg__reactions">' + reactionsHtmlP + "</span></div>"
          : "";
        var metaBlockP = isFirstInGroup ? nameElP + adminBadge : "";
        var bodyClassP =
          "chat-msg__body" +
          (text && text.trim() ? " chat-msg__body--has-text" : "") +
          (isOwn && m.image ? " chat-msg__body--own-image" : "");
        var footerHtmlP = voiceOnlyPrevDlg
          ? ""
          : '<div class="chat-msg__footer">' +
            '<span class="chat-msg__time">' +
            time +
            "</span>" +
            editedBadge +
            ticksPrevDlg +
            "</div>";
        var bodyMainClsP =
          "chat-msg__body-main" +
          (!textBlock ? " chat-msg__body-main--solo-footer" : "") +
          (m.image ? " chat-msg__body-main--with-image" : "") +
          (voiceOnlyPrevDlg ? " chat-msg__body-main--voice-inline-time" : "");
        var bodyMainHtmlP = '<div class="' + bodyMainClsP + '">' + textBlock + footerHtmlP + "</div>";
        var dayDividerP = chatDayDividerHtmlBeforeMessage(prev, m);
        return (
          dayDividerP +
          '<div class="' +
          cls +
          '"><div class="chat-msg__row">' +
          avatarEl +
          '<div class="' +
          bodyClassP +
          '"><div class="chat-msg__meta">' +
          metaBlockP +
          "</div>" +
          replyBlock +
          bodyMainHtmlP +
          reactionsRowP +
          "</div></div></div>"
        );
      })
      .join("");
    targetEl.innerHTML = html;
    bindChatMsgNameProfileButtons(targetEl);
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eLayoutPrev) {}
    requestAnimationFrame(function () {
      targetEl.scrollTop = targetEl.scrollHeight;
    });
  }

  function closeChatDialogPreviewModal() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal) return;
    modal.classList.remove("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "true");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eClsPrev) {}
  }

  function openChatDialogPreviewModal(userId, userName, peerP21Id) {
    var modal = document.getElementById("chatDialogPreviewModal");
    var titleEl = document.getElementById("chatDialogPreviewTitle");
    var subEl = document.getElementById("chatDialogPreviewSub");
    var prevMsgEl = document.getElementById("chatDialogPreviewMessages");
    var avatarEl = document.getElementById("chatDialogPreviewAvatar");
    var avatarPh = document.getElementById("chatDialogPreviewAvatarPlaceholder");
    if (!modal || !prevMsgEl || !userId || !base) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
    modal.dataset.previewUserId = userId;
    modal.dataset.previewUserName = userName || "";
    modal.dataset.previewP21Id = peerP21Id || "";
    if (titleEl) titleEl.textContent = userName || userId;
    if (subEl) {
      subEl.textContent = "";
    }
    if (avatarEl) {
      avatarEl.style.display = "none";
      avatarEl.removeAttribute("src");
      avatarEl.onerror = null;
    }
    if (avatarPh) {
      var ini = (userName || userId || "?").trim().charAt(0) || "?";
      avatarPh.textContent = ini.toUpperCase();
      avatarPh.style.display = "flex";
    }
    var previewSnapshot = getPersonalMessagesSnapshotForOpen(userId);
    if (previewSnapshot && Array.isArray(previewSnapshot.messages) && previewSnapshot.messages.length) {
      renderDialogPreviewMessagesInto(prevMsgEl, previewSnapshot.messages);
    } else {
      prevMsgEl.innerHTML = '<p class="chat-empty">Загрузка…</p>';
    }
    modal.classList.add("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "false");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eSyncPrev0) {}
    var url =
      base + "/api/chat" + pokerApiAuthQuery("?") + "&with=" + encodeURIComponent(userId) + "&trackSeen=0&fastOpen=1";
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: "Ошибка ответа" };
        });
      })
      .then(function (data) {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        if (!data || !data.ok) {
          prevMsgEl.innerHTML =
            '<p class="chat-empty">' + escapeHtml((data && data.error) || "Не удалось загрузить сообщения") + "</p>";
          return;
        }
        var p21v = data.otherP21Id != null && String(data.otherP21Id).trim() !== "" ? String(data.otherP21Id).trim() : "";
        if (p21v) modal.dataset.previewP21Id = p21v;
        if (subEl) {
          subEl.textContent = "";
        }
        var av = data.otherAvatar != null && String(data.otherAvatar).trim() ? String(data.otherAvatar).trim() : "";
        if (av && avatarEl && avatarPh) {
          avatarEl.onerror = function () {
            avatarEl.style.display = "none";
            avatarPh.style.display = "flex";
          };
          avatarEl.src = av;
          avatarEl.style.display = "";
          avatarPh.style.display = "none";
        }
        renderDialogPreviewMessagesInto(prevMsgEl, data.messages || []);
        try {
          syncChatDialogPreviewAddFriendBtn();
        } catch (eSyncPrev1) {}
      })
      .catch(function () {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        prevMsgEl.innerHTML = '<p class="chat-empty">Ошибка сети</p>';
      });
  }

  (function bindChatDialogPreviewModalOnce() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal || modal._chatDialogPreviewModalBound) return;
    modal._chatDialogPreviewModalBound = true;
    var backdrop = document.getElementById("chatDialogPreviewBackdrop");
    var closeBtn = document.getElementById("chatDialogPreviewClose");
    var openBtn = document.getElementById("chatDialogPreviewOpenBtn");
    function onBackdrop(e) {
      if (e.target === backdrop) closeChatDialogPreviewModal();
    }
    if (backdrop) backdrop.addEventListener("click", onBackdrop);
    if (closeBtn) closeBtn.addEventListener("click", closeChatDialogPreviewModal);
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName;
        var p21 = modal.dataset.previewP21Id;
        if (!uid) return;
        closeChatDialogPreviewModal();
        openConvFromDialogs(uid, uname, p21);
      });
    }
    var addFrPrev = document.getElementById("chatDialogPreviewAddFriendBtn");
    if (addFrPrev) {
      addFrPrev.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName || "";
        if (!uid || addFrPrev.disabled) return;
        addFrPrev.disabled = true;
        pokerChatAddFriendWithPrompt(uid, uname, function () {
          try {
            addFrPrev.disabled = false;
          } catch (eEn) {}
        });
      });
    }
  })();

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
    setConvGroupCanChangeAvatar: function (value) { convGroupCanChangeAvatar = !!value; },
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

  function pokerPrefetchDiskPeersWarmup() {
    try {
      pokerHydrateChatSnapshotsFromDisk();
    } catch (eHydW) {}
    var idx = 0;
    for (var pk in personalMessagesCache) {
      if (!Object.prototype.hasOwnProperty.call(personalMessagesCache, pk)) continue;
      if (idx >= 20) break;
      var pid = String(pk);
      if (!pid) continue;
      if (chatWithUserId && peerChatIdsEqual(chatWithUserId, pid)) continue;
      (function (idWarm, delayMs) {
        setTimeout(function () {
          try {
            prefetchPersonalMessages(idWarm);
          } catch (ePf) {}
        }, delayMs);
      })(pid, idx * 40);
      idx++;
    }
  }

  function scheduleChatBootstrapFetch() {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      if (!pokerChatContactsAuthFingerprint()) return;
      if (!base) return;
      var nowB = Date.now();
      if (window.__pokerChatBootstrapCooldownUntil && nowB < window.__pokerChatBootstrapCooldownUntil) return;
      window.__pokerChatBootstrapCooldownUntil = nowB + 2800;
      var genB = (window.__pokerChatBootstrapGen || 0) + 1;
      window.__pokerChatBootstrapGen = genB;
      var lastVP = "";
      try {
        var lvB = Object.assign({}, lastViewedPersonal || {});
        if (lastViewedGeneral != null) lvB.general = lastViewedGeneral;
        lastVP = "&lastViewed=" + encodeURIComponent(JSON.stringify(lvB));
      } catch (eLvB) {}
      var qB = pokerApiAuthQuery("?");
      var urlContactsB = base + "/api/chat" + qB + "&mode=contacts" + lastVP;
      var urlGeneralB = base + "/api/chat" + qB + "&mode=general&trackSeen=0";
      fetch(urlContactsB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dc) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          if (dc && dc.ok) {
            try {
              pokerWriteContactsCache(dc);
            } catch (eWrC) {}
            var onChatV = document.body && document.body.getAttribute("data-view") === "chat";
            if (onChatV) {
              try {
                applyContactsApiResponse(dc);
              } catch (eAppC) {}
            }
            try {
              if (Array.isArray(dc.contacts)) prefetchTopPersonalDialogs(dc.contacts);
            } catch (ePreC) {}
          }
        })
        .catch(function () {});
      fetch(urlGeneralB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dg) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          ingestBootstrapGeneralSnapshot(dg);
        })
        .catch(function () {});
    } catch (eBoot) {}
  }
  try {
    window.__pokerScheduleChatBootstrapFetch = scheduleChatBootstrapFetch;
  } catch (eExBoot) {}

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
    (function () {
      function getVisibleMessagesEl() {
        if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) return generalMessages;
        if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) return messagesEl;
        return null;
      }
      function clearChatMessagesKeyboardPad() {
        try {
          /* На всех лентах чата — иначе после dismiss остаётся inline padding-bottom. */
          document.querySelectorAll(".chat-messages").forEach(function (el) {
            if (el && el.style) el.style.removeProperty("padding-bottom");
          });
        } catch (ePadClr) {}
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbClr) {}
      }
      function hardResetTelegramChatMessagesKeyboardPad() {
        if (!isTelegramChatRuntime()) return;
        try {
          [generalMessages, messagesEl].forEach(function (el) {
            if (!el || !el.style) return;
            el.style.setProperty("padding-bottom", "0px", "important");
            el.style.removeProperty("padding-bottom");
          });
        } catch (eTgPadHard) {}
        try {
          document.documentElement.style.removeProperty("--chat-vv-inset");
          document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
        } catch (eTgPadVars) {}
      }
      /**
       * Нижний отступ ленты: при position:fixed композера — только высота полосы + bottom (реальные пиксели),
       * без max() с --chat-vv-inset (иначе двойной учёт с dock bottom и «прыжки» при вводе).
       * Без fixed — lift по переменным (translate в потоке).
       */
      function updateChatMessagesKeyboardPad() {
        logChatKeyboardDebug("pad-enter");
        collectChatOverscrollSnapshot("pad:enter");
        if (isTelegramChatRuntime() && !shouldUseTelegramChatThreadVisualViewportDock()) {
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-tg-hardoff");
          collectChatOverscrollSnapshot("pad:tg-hardoff");
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isPassiveTelegramIosChatThread()) {
          clearChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-passive");
          return;
        }
        if (shouldUseNativeTelegramIosChatComposerFlow()) {
          clearChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-native");
          return;
        }
        if (!document.body.classList.contains("chat-keyboard-open")) return;
        var box0 = getVisibleMessagesEl();
        if (!box0) return;
        var isIosPwaPad =
          !isTelegramChatRuntime() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset() &&
          typeof isIosLikeForChatViewport === "function" &&
          isIosLikeForChatViewport();
        /* До смены padding: иначе после роста pad расстояние до низа > CHAT_SCROLL_BOTTOM_NEAR_PX и snap «у низа» не сработает. */
        var nearBeforeLift = false;
        var liftScrollTopBefore = 0;
        var liftPadBefore = 0;
        var liftBottomGapBefore = 0;
        var shouldAnchorAfterLift = false;
        try {
          if (!isChatPhysicalKeyboardContext()) {
            nearBeforeLift = chatMessagesShouldFollowKeyboardLift(box0);
            if (nearBeforeLift) {
              try {
                box0.__pokerChatOpeningStickBottom = true;
                box0.__pokerChatUserReturnedBottomAt = Date.now();
              } catch (eStickBeforeLift) {}
            }
            liftScrollTopBefore = Math.max(0, Number(box0.scrollTop) || 0);
            liftPadBefore = parseFloat(box0.style && box0.style.paddingBottom) || 0;
            liftBottomGapBefore = Math.max(0, (Number(box0.scrollHeight) || 0) - (Number(box0.clientHeight) || 0) - liftScrollTopBefore);
            shouldAnchorAfterLift =
              !nearBeforeLift &&
              liftBottomGapBefore <= Math.max(420, Math.round((Number(box0.clientHeight) || 0) * 0.72));
          }
        } catch (eNear0) {}
        if (!isIosPwaPad) clearChatMessagesKeyboardPad();
        var box = getVisibleMessagesEl();
        if (!box) return;
        if (!document.body.classList.contains("chat-keyboard-open")) return;
        var gap = Math.max(3, Math.round(13 / 3));
        var barEl = null;
        try {
          if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
            barEl = document.getElementById("chatGeneralInputArea");
          } else if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
            barEl = document.getElementById("chatPersonalInputArea") || convView.querySelector(".chat-container .chat-input-area");
          }
        } catch (eBarFind) {}
        var barFixed = false;
        var bh = 0;
        var btm = 0;
        var tmaFlowPad = false;
        var cssOnlyPwaPad = false;
        try {
          if (barEl) {
            tmaFlowPad = isTelegramMiniAppChatThreadIos() && isChatThreadComposerKeyboardDom();
            barFixed = !tmaFlowPad && window.getComputedStyle(barEl).position === "fixed";
            if (barFixed) {
              bh = barEl.offsetHeight || 72;
              btm = parseFloat(window.getComputedStyle(barEl).bottom) || 0;
              try {
                cssOnlyPwaPad =
                  isIosPwaPad &&
                  typeof shouldUseCssOnlyIosPwaChatComposerDock === "function" &&
                  shouldUseCssOnlyIosPwaChatComposerDock(document.activeElement || chatComposerEl) &&
                  barEl.classList.contains("chat-input-area--vv-dock");
                if (!cssOnlyPwaPad && isIosPwaPad && chatComposerEl) {
                  cssOnlyPwaPad =
                    shouldUseCssOnlyIosPwaChatComposerDock(chatComposerEl) &&
                    barEl.classList.contains("chat-input-area--vv-dock");
                }
                if (cssOnlyPwaPad) {
                  var cssOnlyPwaBottom = Math.round(Number(window.__pokerChatIosPwaComposerBottomLockPx) || Number(window.__pokerChatThreadDockBottomCssPx) || 0);
                  if (cssOnlyPwaBottom > 0) btm = cssOnlyPwaBottom;
                }
              } catch (eCssOnlyPwaPadDetect) {}
              /*
               * TMA + fixed-композер: padding ленты совпадает с bottom из applyChatThreadComposerKeyboardDockFromCover (__pokerChatThreadDockBottomCssPx).
               * Иначе getComputedStyle даёт 0 на кадре или подмешивается сырой vv — лента и строка дёргаются разными величинами.
               */
              var dockPxStore = Number(window.__pokerChatThreadDockBottomCssPx);
              var isTmaPad = isTelegramChatRuntime();
              if (
                isTmaPad &&
                barEl.classList.contains("chat-input-area--vv-dock") &&
                dockPxStore >= 8
              ) {
                btm = dockPxStore;
              } else if (btm < 8 && !isChatPhysicalKeyboardContext()) {
                /* TMA/WK: иногда bottom ещё 0 на кадре — TG API; сырой vv не подмешиваем в Mini App (глючные кадры vvh). */
                try {
                  if (isTmaPad) {
                    var twPad = window.Telegram && window.Telegram.WebApp;
                    if (twPad && twPad.viewportStableHeight != null && twPad.viewportHeight != null) {
                      var tsPad = Number(twPad.viewportStableHeight);
                      var thPad = Number(twPad.viewportHeight);
                      if (tsPad > 0 && thPad > 0 && tsPad > thPad + 5) {
                        var kbdPad = Math.round(tsPad - thPad);
                        if (kbdPad > 32) btm = kbdPad;
                      }
                    }
                  } else {
                    if (isTelegramChatRuntime()) {
                      var twPad2 = window.Telegram && window.Telegram.WebApp;
                      if (twPad2 && twPad2.viewportStableHeight != null && twPad2.viewportHeight != null) {
                        var tsP2 = Number(twPad2.viewportStableHeight);
                        var thP2 = Number(twPad2.viewportHeight);
                        if (tsP2 > 0 && thP2 > 0 && tsP2 > thP2 + 5) {
                          var kbdP2 = Math.round(tsP2 - thP2);
                          if (kbdP2 > 32) btm = kbdP2;
                        }
                      }
                    }
                    if (btm < 8 && window.visualViewport) {
                      var ihPad = window.innerHeight || 0;
                      var vvPad = Number(window.visualViewport.height) || 0;
                      var otPad = Number(window.visualViewport.offsetTop) || 0;
                      var covPad = Math.max(0, Math.round(ihPad - otPad - vvPad));
                      if (covPad > 32) btm = covPad;
                    }
                  }
                } catch (eBtmFb) {}
              }
            } else if (tmaFlowPad) {
              bh = barEl.offsetHeight || 72;
              btm = 0;
            }
          }
        } catch (eBarPad) {}
        var pad;
        if (barFixed) {
          var isThreadComposerDock =
            typeof isChatThreadComposerKeyboardDom === "function" &&
            isChatThreadComposerKeyboardDom() &&
            typeof isTelegramMiniAppChatThreadIos === "function" &&
            isTelegramMiniAppChatThreadIos();
          if (isThreadComposerDock) {
            pad = Math.round(bh + gap);
            if (pad < 28) pad = 28;
          } else {
            pad = Math.round(bh + btm + gap);
            if (pad < 28) pad = 28;
          }
          try {
            var screenSafeBottomPad = getChatScreenSafeAreaBottomPx();
            if (isIosPwaPad) {
              /* Для iOS PWA считаем запас от реальной видимой строки ввода, а не от клавиатурного cover:
               * иначе снизу появляется лишний резерв и последнее сообщение не доезжает до нужной позиции. */
              var pwaViewportHeight = window.innerHeight || 0;
              var pwaComposerLift = bh;
              try {
                if (barEl && barEl.getBoundingClientRect) {
                  var pwaRect = barEl.getBoundingClientRect();
                  if (pwaRect && isFinite(pwaRect.top) && isFinite(pwaRect.bottom)) {
                    var pwaVisibleBottom = Math.min(pwaViewportHeight || pwaRect.bottom, pwaRect.bottom);
                    var pwaVisibleTop = Math.max(0, pwaRect.top);
                    var pwaOccupied = Math.max(0, pwaVisibleBottom - pwaVisibleTop);
                    if (pwaOccupied > 0) pwaComposerLift = pwaOccupied;
                  }
                }
              } catch (ePwaRectPad) {}
              /* Для scroll range нужен не только видимый блок composer, но и его фиксированный bottom:
               * иначе последнее сообщение визуально уходит под строку и не докручивается до края. */
              if (cssOnlyPwaPad) {
                pad = Math.max(28, Math.round(Math.max(bh, pwaComposerLift) + Math.max(0, btm) + gap));
              } else {
                pad = Math.max(10, Math.round(Math.max(bh, pwaComposerLift) + Math.max(0, btm) - 18));
              }
            } else if (isThreadComposerDock) {
              pad = Math.max(28, Math.round(bh + gap));
            } else {
              pad = Math.max(pad, Math.round(bh + screenSafeBottomPad + 24));
            }
          } catch (ePwaPadCap) {}
        } else if (tmaFlowPad) {
          pad = Math.round(bh + gap + 8);
          if (pad < 44) pad = 44;
        } else {
          var cs = getComputedStyle(document.documentElement);
          var lift = (parseFloat(cs.getPropertyValue("--chat-vv-inset")) || 0) + (parseFloat(cs.getPropertyValue("--chat-ios-accessory-inset")) || 0);
          pad = Math.round(lift + gap);
          if (window.visualViewport && document.body.classList.contains("chat-keyboard-open")) {
            try {
              var ihWin = window.innerHeight || 0;
              var vvh = Number(window.visualViewport.height) || 0;
              var offTop = Number(window.visualViewport.offsetTop) || 0;
              var overlap = Math.max(0, Math.round(ihWin - offTop - vvh));
              if (overlap > 48) {
                var slack = Math.max(0, overlap - lift);
                pad = Math.max(pad, Math.round(lift + gap + Math.min((slack * 0.22) / 3, 56 / 3)));
              }
            } catch (eVv) {}
          }
          if (pad < 28) pad = 28;
          if (isIosLikeForChatViewport()) {
            pad += Math.round(8 / 3);
            try {
              var sw = window.screen && window.screen.width ? Number(window.screen.width) : 0;
              var sh = window.screen && window.screen.height ? Number(window.screen.height) : 0;
              var longSide = Math.max(sw, sh);
              var shortSide = sw > 0 && sh > 0 ? Math.min(sw, sh) : 0;
              var tabletish = shortSide >= 600;
              if (!tabletish && longSide >= 890) pad += Math.round(24 / 3);
              else if (!tabletish && longSide <= 834) pad -= Math.round(6 / 3);
            } catch (ePhPad) {}
          }
        }
        try {
          if (Number(window.__pokerChatSendKeepFocusUntil || 0) > Date.now()) {
            var sendKeepPrevPad = Number(window.__pokerChatMessagesKeyboardPadLast) || 0;
            if (sendKeepPrevPad > 28 && pad < sendKeepPrevPad - 8) pad = sendKeepPrevPad;
          }
          if (cssOnlyPwaPad && barFixed) {
            var cssOnlyPwaPadAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            var lockedCssOnlyPwaPad = Number(window.__pokerChatPwaOpeningMessagesPad) || 0;
            if (cssOnlyPwaPadAge > 0 && cssOnlyPwaPadAge < 1400) {
              if (lockedCssOnlyPwaPad > 28) pad = lockedCssOnlyPwaPad;
              else window.__pokerChatPwaOpeningMessagesPad = pad;
            } else if (cssOnlyPwaPadAge >= 1400) {
              window.__pokerChatPwaOpeningMessagesPad = null;
            }
          } else if (isIosPwaPad && barFixed) {
            var pwaPadAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            var prevPwaPad = Number(window.__pokerChatMessagesKeyboardPadLast) || 0;
            if (prevPwaPad > 28 && pwaPadAge > 0 && pwaPadAge < 900) {
              if (pad > prevPwaPad + 14) pad = prevPwaPad + 14;
              else if (pad < prevPwaPad - 8) pad = prevPwaPad - 8;
            }
          }
        } catch (ePwaPadStabilize) {}
        try {
          window.__pokerChatMessagesKeyboardPadLast = pad;
          updateTelegramMiniAppChatThreadDebugOverlay("pad", {
            pad: pad,
            bottom: btm,
            cover: Number(window.__pokerChatTgKeyboardCoverLast) || 0
          });
        } catch (eDbgPad) {}
        try {
          if (box.style && String(box.style.paddingBottom || "") === pad + "px") {
            logChatKeyboardDebug("pad-same", "pad=" + pad + " btm=" + btm + " fixed=" + (barFixed ? 1 : 0));
            collectChatOverscrollSnapshot("pad:same", {
              pad: pad,
              btm: btm,
              fixed: barFixed ? 1 : 0
            });
            return;
          }
        } catch (ePadSameCheck) {}
        box.style.paddingBottom = pad + "px";
        logChatKeyboardDebug("pad-set", "pad=" + pad + " btm=" + btm + " fixed=" + (barFixed ? 1 : 0));
        collectChatOverscrollSnapshot("pad:set", {
          pad: pad,
          btm: btm,
          fixed: barFixed ? 1 : 0
        });
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbKb) {}
        /* Поднять ленту над композером/клавиатурой (не десктоп): после pad иначе «у низа» ложно ломается и низ остаётся под полем. */
        var shouldSnapAfterLift = !isChatPhysicalKeyboardContext() && nearBeforeLift;
        var anchorDeltaAfterLift = 0;
        try {
          if (!shouldSnapAfterLift && shouldAnchorAfterLift) {
            anchorDeltaAfterLift = Math.max(0, Math.round(pad - liftPadBefore));
          }
        } catch (eAnchorDelta) {}
        try {
          var pwaIosNear =
            !isTelegramChatRuntime() &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport();
          if (pwaIosNear) shouldSnapAfterLift = false;
        } catch (ePwaNear) {}
        try {
          if (!shouldSnapAfterLift && nearBeforeLift && pwaIosNear) {
            anchorDeltaAfterLift = Math.max(anchorDeltaAfterLift, Math.max(0, Math.round(pad - liftPadBefore)));
          }
        } catch (ePwaNearAnchor) {}
        if (nearBeforeLift) {
          scheduleChatKeyboardBottomFollow(box, "pad");
        }
        if (shouldSnapAfterLift) {
          var rafLift = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 0);
          };
          rafLift(function () {
            rafLift(function () {
              try {
                var bx = getVisibleMessagesEl();
                if (bx) bx.scrollTop = bx.scrollHeight;
              } catch (eLift) {}
            });
          });
        }
        if (anchorDeltaAfterLift > 0) {
          var rafAnchorLift = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 0);
          };
          rafAnchorLift(function () {
            rafAnchorLift(function () {
              try {
                var anchoredBox = getVisibleMessagesEl();
                if (!anchoredBox) return;
                if (chatMessagesNearBottom(anchoredBox, CHAT_SCROLL_BOTTOM_NEAR_PX)) return;
                var maxAnchored = Math.max(0, anchoredBox.scrollHeight - anchoredBox.clientHeight);
                anchoredBox.scrollTop = Math.min(maxAnchored, liftScrollTopBefore + anchorDeltaAfterLift);
              } catch (eAnchorLift) {}
            });
          });
        }
      }
      function scrollDocumentToZero() {
        try {
          if (shouldSkipPwaChatRootScrollDuringComposerOpen()) return false;
        } catch (eSkipDocZero) {}
        var se = document.scrollingElement;
        if (se && se.scrollTop !== 0) se.scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
        if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
        return true;
      }
      function clearChatKeyboardViewportState(options) {
        var opts = options || {};
        var doc = document.documentElement;
        try {
          doc.classList.remove("chat-keyboard-open", "chat-vv-lift", "chat-keyboard-open--tma-flow");
        } catch (eDocCls) {}
        try {
          document.body.classList.remove("chat-keyboard-open", "chat-keyboard-open--tma-flow");
        } catch (eBodyCls) {}
        if (opts.keepInsets) return;
        try {
          doc.style.removeProperty("--chat-vv-inset");
          doc.style.removeProperty("--chat-ios-pwa-thread-composer-bottom");
          doc.style.removeProperty("--chat-ios-accessory-inset");
        } catch (eDocVars) {}
      }
      window.__pokerClearChatKeyboardViewportState = clearChatKeyboardViewportState;
      function isTelegramChatDefaultMode() {
        try {
          return (
            isTelegramChatRuntime() &&
            document.body &&
            String(document.body.getAttribute("data-view") || "") === "chat"
          );
        } catch (eTgChatDefault) {
          return false;
        }
      }
      function enforceTelegramChatDefaultComposerState() {
        if (isPokerIosPwaKeyboardRuntime()) return false;
        if (shouldUseTelegramChatThreadVisualViewportDock()) return false;
        if (!isTelegramChatDefaultMode()) return false;
        try {
          clearChatKeyboardViewportState();
        } catch (eTgDefKb) {}
        try {
          clearChatMessagesKeyboardPad();
        } catch (eTgDefPad) {}
        try {
          stripChatInputAreaTransforms();
        } catch (eTgDefTf) {}
        try {
          resetChatKeyboardDockRuntimeState();
        } catch (eTgDefDock) {}
        try {
          var root = document.documentElement;
          if (root && root.style) {
            root.style.removeProperty("--chat-vv-inset");
            root.style.removeProperty("--chat-ios-accessory-inset");
          }
        } catch (eTgDefVars) {}
        return true;
      }
      function setChatKeyboardOpen(open) {
        logChatKeyboardDebug(open ? "kb-open" : "kb-close");
        if (open && hardDisableChatComposerViewportLift(document.activeElement, "kb:hard-disabled")) {
          scrollDocumentToZero();
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) {
          scrollDocumentToZero();
          return;
        }
        if (typeof setChatKeyboardOpenClasses === "function") {
          setChatKeyboardOpenClasses(open);
          scrollDocumentToZero();
          return;
        }
        if (isPassiveTelegramIosChatThread()) {
          clearChatKeyboardViewportState();
          scrollDocumentToZero();
          return;
        }
        var el = getVisibleMessagesEl();
        var savedScroll = el ? el.scrollTop : 0;
        if (open) {
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
        } else {
          clearChatKeyboardViewportState({ keepInsets: true });
        }
        scrollDocumentToZero();
        if (el && savedScroll > 0) {
          requestAnimationFrame(function () {
            el.scrollTop = savedScroll;
            requestAnimationFrame(function () { el.scrollTop = savedScroll; });
          });
        }
      }
      function pokerPwaStandaloneForKeyboardInset() {
        return (
          !!(document.documentElement && document.documentElement.classList && document.documentElement.classList.contains("poker-ios-pwa")) ||
          !!(document.documentElement && document.documentElement.classList && document.documentElement.classList.contains("poker-android-pwa")) ||
          !!(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
          !!(window.navigator && window.navigator.standalone)
        );
      }
      function isIosLikeForChatViewport() {
        return (
          /iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        );
      }
      /**
       * Десктопный Telegram / ПК-браузер: нет виртуальной клавиатуры, перекрывающей низ —
       * не ставим chat-keyboard-open (иначе visualViewport даёт ложный inset и композер уезжает вверх).
       */
      function isChatPhysicalKeyboardContext() {
        try {
          if (
            window.matchMedia &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
            (window.innerWidth || 0) >= 700 &&
            !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")
          ) {
            return true;
          }
          var tg = window.Telegram && window.Telegram.WebApp;
          if (tg && tg.platform) {
            var p = String(tg.platform).toLowerCase();
            if (p === "tdesktop" || p === "macos" || p === "unigram") return true;
            if (p === "weba" || p === "web" || p === "webk") {
              return (navigator.maxTouchPoints || 0) === 0;
            }
          }
        } catch (ePk) {}
        if ((navigator.maxTouchPoints || 0) > 0) return false;
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) return false;
        return true;
      }
      window.__pokerIsChatPhysicalKeyboardContext = isChatPhysicalKeyboardContext;
      function shouldUseChatVisualViewportLift() {
        if (isPassiveTelegramIosChatThread()) return false;
        if (shouldUseNativeTelegramIosChatComposerFlow()) return false;
        if (!window.visualViewport) return false;
        if (pokerPwaStandaloneForKeyboardInset() || isIosLikeForChatViewport()) return true;
        /* Android Chrome / PWA */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0) return true;
        /* Telegram: окно частично поджимается, но без translate поле часто остаётся под клавиатурой — подъём нужен; inset ниже чуть смягчён под TG. */
        if (isTelegramChatRuntime()) return true;
        /* Мобильный Safari/Chrome вне TG: иначе при открытой клавиатуре sync обнулял inset и поле не поднималось. */
        try {
          if (
            (navigator.maxTouchPoints || 0) > 0 &&
            /Mobile|iPhone|Android|webOS|BlackBerry|Opera Mini/i.test(navigator.userAgent || "") &&
            document.body &&
            document.body.classList.contains("chat-keyboard-open") &&
            String(document.body.getAttribute("data-view") || "") === "chat"
          ) {
            return true;
          }
        } catch (eMobLift) {}
        return false;
      }
      /**
       * Доп. подъём только на iOS над системной панелью «стрелки / Готово».
       * На Android панели нет — inset 0, подъём только через --chat-vv-inset.
       */
      function applyChatIosAccessoryInsetFromViewport() {
        var doc = document.documentElement;
        if (!document.body.classList.contains("chat-keyboard-open")) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        if (isTelegramChatRuntime()) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        if (!isIosLikeForChatViewport() || !window.visualViewport) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        var tgAcc = isTelegramChatRuntime();
        var vv = window.visualViewport;
        var ih = window.innerHeight || 0;
        var vvh = Number(vv.height) || 0;
        var offsetTop = Number(vv.offsetTop) || 0;
        var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
        /* Полоса под vv — input accessory / предиктив / «Готово» (на новых iOS иногда >62px; раньше >62 давало acc=0 и поле перекрывалось). */
        var acc = 0;
        if (belowVv >= 8) {
          acc = Math.min(92, Math.round(Math.min(belowVv, 130) * 0.94));
        } else if (
          !tgAcc &&
          pokerPwaStandaloneForKeyboardInset() &&
          ih > 0 &&
          vvh > 0 &&
          ih - vvh > 55
        ) {
          acc = 44;
        } else if (tgAcc || belowVv > 0) {
          /* TG / WK: vv на одном уровне с клавиатурой, belowVv почти 0 — всё равно нужен зазор под системную строку над клавишами. */
          acc = tgAcc ? 40 : 44;
        }
        if (acc < 34 && ih > 0 && vvh > 0 && ih - vvh > 96) {
          acc = Math.max(acc, tgAcc ? 38 : 42);
        }
        doc.style.setProperty("--chat-ios-accessory-inset", acc + "px");
      }
      function getPwaChatThreadAccessoryInsetPx() {
        try {
          if (isTelegramChatRuntime()) return 0;
          if (!isIosLikeForChatViewport()) return 0;
          if (!pokerPwaStandaloneForKeyboardInset()) return 0;
          if (!document.body.classList.contains("chat-keyboard-open")) return 0;
          if (!isChatThreadComposerKeyboardDom()) return 0;
          var vv = window.visualViewport || null;
          var ih = window.innerHeight || 0;
          var acc = 0;
          if (vv && ih > 0) {
            var vvh = Number(vv.height) || 0;
            var offsetTop = Number(vv.offsetTop) || 0;
            var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
            if (belowVv >= 8) {
              acc = Math.min(92, Math.round(Math.min(belowVv, 130) * 0.94));
            } else if (ih > 0 && vvh > 0 && ih - vvh > 55) {
              acc = 44;
            }
          }
          if (acc < 34) {
            var baseIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var curIh = window.innerHeight || 0;
            var winLoss = baseIh > 260 && curIh > 0 ? Math.max(0, Math.round(baseIh - curIh)) : 0;
            if (winLoss > 96) acc = 42;
          }
          return Math.max(0, acc);
        } catch (ePwaAcc) {
          return 0;
        }
      }
      var PWA_IOS_CHAT_KEYBOARD_COVER_STORAGE_KEY = "poker_chat_pwa_ios_keyboard_cover_v1";
      function readStoredPwaIosChatKeyboardCoverPx() {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return 0;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return 0;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return 0;
          if (!window.localStorage) return 0;
          var raw = window.localStorage.getItem(PWA_IOS_CHAT_KEYBOARD_COVER_STORAGE_KEY);
          if (!raw) return 0;
          var parsed = null;
          try {
            parsed = JSON.parse(raw);
          } catch (eStoredJson) {
            parsed = Number(raw) || 0;
          }
          var cover = typeof parsed === "number" ? parsed : Number(parsed && parsed.cover) || 0;
          if (cover < 260 || cover > 460) return 0;
          var storedAt = typeof parsed === "object" && parsed ? Number(parsed.t) || 0 : 0;
          if (storedAt > 0 && Date.now() - storedAt > 1000 * 60 * 60 * 24 * 21) return 0;
          var storedWidth = typeof parsed === "object" && parsed ? Number(parsed.w) || 0 : 0;
          var curWidth = window.screen && window.screen.width ? Number(window.screen.width) || 0 : 0;
          if (storedWidth > 0 && curWidth > 0 && Math.abs(storedWidth - curWidth) > 2) return 0;
          return Math.round(cover);
        } catch (eReadStoredCover) {
          return 0;
        }
      }
      function getPwaIosChatComputedKeyboardCoverFloorPx() {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return 0;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return 0;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return 0;
          var ihNow = window.innerHeight || 0;
          var base = Math.max(ihNow, Number(window.__pokerChatInnerHBaseline) || 0);
          if (base < 260) return 0;
          var cover = Math.round(base * 0.36);
          if (ihNow > 0 && base - ihNow > 80) cover = Math.max(cover, Math.round(base - ihNow));
          return Math.min(390, Math.max(320, cover));
        } catch (eComputedCoverFloor) {
          return 0;
        }
      }
      function writeStoredPwaIosChatKeyboardCoverPx(coverPx) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return;
          if (!window.localStorage) return;
          var cover = Math.round(Number(coverPx) || 0);
          if (cover < 260 || cover > 460) return;
          var floor = getPwaIosChatComputedKeyboardCoverFloorPx();
          if (floor > 0 && cover < floor - 18) return;
          window.localStorage.setItem(
            PWA_IOS_CHAT_KEYBOARD_COVER_STORAGE_KEY,
            JSON.stringify({
              cover: cover,
              t: Date.now(),
              w: window.screen && window.screen.width ? Number(window.screen.width) || 0 : 0,
              h: window.screen && window.screen.height ? Number(window.screen.height) || 0 : 0
            })
          );
        } catch (eWriteStoredCover) {}
      }
      function getPwaIosChatEarlyKeyboardCoverPx() {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return 0;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return 0;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return 0;
          var storedCover = readStoredPwaIosChatKeyboardCoverPx();
          var floorCover = getPwaIosChatComputedKeyboardCoverFloorPx();
          if (storedCover > 0 && floorCover > 0) return Math.max(storedCover, floorCover);
          if (storedCover > 0) return storedCover;
          return floorCover;
        } catch (eEarlyCover) {
          return 0;
        }
      }
      function setPwaIosChatEarlyKeyboardFallback(label) {
        try {
          if (
            typeof shouldUseCssOnlyIosPwaChatComposerDock === "function" &&
            shouldUseCssOnlyIosPwaChatComposerDock(chatComposerEl || document.activeElement)
          ) {
            document.documentElement.style.removeProperty("--chat-keyboard-fallback-inset");
            window.__pokerChatPwaEarlyKeyboardCover = 0;
            window.__pokerChatPwaEarlyKeyboardCoverAt = 0;
            return 0;
          }
          var cover = getPwaIosChatEarlyKeyboardCoverPx();
          if (cover <= 0) return 0;
          document.documentElement.style.setProperty("--chat-keyboard-fallback-inset", cover + "px");
          window.__pokerChatPwaEarlyKeyboardCover = cover;
          window.__pokerChatPwaEarlyKeyboardCoverAt = Date.now();
          collectChatOverscrollSnapshot("pwa-early-fallback:" + (label || ""), { cover: cover });
          return cover;
        } catch (eEarlyFallback) {
          return 0;
        }
      }
      function clearPwaIosChatEarlyKeyboardFallbackIfViewportLive() {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          var vv = window.visualViewport || null;
          var ih = window.innerHeight || 0;
          if (!vv || ih <= 0) return false;
          var vvh = Number(vv.height) || 0;
          var offsetTop = Number(vv.offsetTop) || 0;
          var cover = Math.max(0, Math.round(ih - offsetTop - vvh));
          var base = Number(window.__pokerChatInnerHBaseline) || 0;
          var winLoss = base > 260 && ih > 0 ? Math.max(0, Math.round(base - ih)) : 0;
          var liveCover = Math.max(cover, winLoss);
          if (liveCover < 72) return false;
          document.documentElement.style.removeProperty("--chat-keyboard-fallback-inset");
          window.__pokerChatPwaEarlyKeyboardCover = 0;
          window.__pokerChatPwaEarlyKeyboardCoverAt = 0;
          return true;
        } catch (eClearEarlyFallback) {
          return false;
        }
      }
      function markPwaIosChatFocusActivation(target, label, cooldownMs) {
        try {
          if (!target || !target.closest || !isChatThreadComposerKeyboardDom(target)) return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          markPwaChatKeyboardOpenIntent(target, label || "focus-activation");
          var now = Date.now();
          var lastAt = Number(window.__pokerChatPwaFocusActivationAt) || 0;
          var lastTarget = window.__pokerChatPwaFocusActivationTarget || null;
          var cooldown = Math.max(80, Number(cooldownMs) || 220);
          if (lastTarget === target && lastAt && now - lastAt < cooldown) {
            collectChatOverscrollSnapshot("pwa-focus-activation-skip:" + (label || ""), target);
            return false;
          }
          window.__pokerChatPwaFocusActivationAt = now;
          window.__pokerChatPwaFocusActivationTarget = target;
          return true;
        } catch (eMarkPwaFocusActivation) {
          return true;
        }
      }
      /** PWA/WK: pokerPulseChatFixedViewportHeightAfterKeyboard или гонка кадров оставляют height/min-height на html/body — «отступ» снизу и весь экран сжат до смены раздела */
      function pokerStripForcedViewportShellHeights() {
        try {
          var b = document.body;
          var rootEl = document.documentElement;
          if (b && b.style) {
            b.style.removeProperty("height");
            b.style.removeProperty("min-height");
            b.style.removeProperty("max-height");
            b.style.removeProperty("padding-bottom");
            b.style.removeProperty("padding-top");
          }
          if (rootEl && rootEl.style) {
            rootEl.style.removeProperty("height");
            rootEl.style.removeProperty("min-height");
            rootEl.style.removeProperty("max-height");
            rootEl.style.removeProperty("padding-bottom");
            rootEl.style.removeProperty("padding-top");
          }
          try {
            var appShell = document.getElementById("app");
            if (appShell && appShell.style) {
              appShell.style.removeProperty("padding-bottom");
              appShell.style.removeProperty("padding-top");
              appShell.style.removeProperty("transform");
              appShell.style.removeProperty("margin-bottom");
            }
          } catch (eAppSh) {}
        } catch (eSh) {}
      }
      function shouldPreserveActivePwaChatDock(node) {
        try {
          if (!node) return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset())
          ) return false;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport())
          ) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (!document.body.classList.contains("chat-keyboard-open")) return false;
          var active = document.activeElement;
          if (!active || !node.contains(active)) return false;
          if (!isChatThreadComposerKeyboardDom(active)) return false;
          return node.classList && node.classList.contains("chat-input-area--vv-dock");
        } catch (ePreserveDock) {
          return false;
        }
      }
      function stripChatInputAreaTransforms() {
        try {
          document.querySelectorAll(".chat-general-view .chat-input-area, .chat-container .chat-input-area").forEach(function (node) {
            if (!node || !node.style) return;
            if (shouldPreserveActivePwaChatDock(node)) return;
            /* Явный ноль + reflow — иначе на части WK/TG слой остаётся сдвинутым, снизу «лишнее» место. */
            node.style.setProperty("transform", "translate3d(0, 0, 0)", "");
            try {
              node.style.setProperty("-webkit-transform", "translate3d(0, 0, 0)", "");
            } catch (eW) {}
            try {
              void node.offsetHeight;
            } catch (eOh) {}
            node.style.removeProperty("transform");
            node.style.removeProperty("-webkit-transform");
            node.style.removeProperty("will-change");
            /* Старые inline-смещения после клавиатуры перебивали CSS после dismiss, поэтому чистим margin-bottom явно. */
            node.style.removeProperty("margin-bottom");
            node.style.removeProperty("padding-bottom");
            node.style.removeProperty("padding-top");
            node.style.removeProperty("position");
            node.style.removeProperty("left");
            node.style.removeProperty("width");
            node.style.removeProperty("right");
            node.style.removeProperty("bottom");
            node.style.removeProperty("top");
            node.style.removeProperty("z-index");
            node.style.removeProperty("max-width");
            node.style.removeProperty("box-sizing");
            try {
              node.classList.remove("chat-input-area--vv-dock");
            } catch (eClsDock) {}
          });
        } catch (eSt) {}
      }
      function clearChatComposerDockClass() {
        try {
          var g = document.getElementById("chatGeneralInputArea");
          var p = document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null);
          if (g) g.classList.remove("chat-input-area--vv-dock");
          if (p) p.classList.remove("chat-input-area--vv-dock");
        } catch (eDockCls) {}
      }
      function resetChatKeyboardDockRuntimeState(options) {
        var opts = options || {};
        try {
          if (!opts.preserveActivePwaDock && window.__pokerChatPwaDockWatchdogTimer) {
            clearInterval(window.__pokerChatPwaDockWatchdogTimer);
            window.__pokerChatPwaDockWatchdogTimer = null;
          }
          if (!opts.preserveActivePwaDock) window.__pokerChatPwaDockWatchdogUntil = 0;
          if (!opts.preserveActivePwaDock) window.__pokerChatKeyboardFocusAtMs = 0;
          if (!opts.preserveActivePwaDock) window.__pokerChatLastAppliedDockBottom = null;
          if (!opts.preserveActivePwaDock) window.__pokerChatIosPwaComposerBottomLockPx = null;
          if (!opts.preserveActivePwaDock) window.__pokerChatPwaOpeningMessagesPad = null;
          window.__pokerChatTgKeyboardCoverLast = null;
          if (!opts.preserveActivePwaDock) window.__pokerChatThreadDockBottomCssPx = null;
          window.__pokerChatTmaDockTabKey = null;
          window.__pokerChatTmaThreadLastInnerHeight = null;
          window.__pokerChatTmaThreadFocusSession = null;
          if (window.__pokerChatTmaThreadSyncTimer) {
            clearTimeout(window.__pokerChatTmaThreadSyncTimer);
            window.__pokerChatTmaThreadSyncTimer = null;
          }
          window.__pokerChatTmaThreadSyncRafPending = false;
          if (!opts.preserveActivePwaDock) clearChatComposerDockClass();
          if (window.__pokerChatVvInsetDebounceTimer) {
            clearTimeout(window.__pokerChatVvInsetDebounceTimer);
            window.__pokerChatVvInsetDebounceTimer = null;
          }
          if (!opts.preserveActivePwaDock) {
            try {
              document.documentElement.style.removeProperty("--chat-ios-pwa-thread-composer-bottom");
            } catch (ePwaCssDockVarReset) {}
          }
        } catch (eDockReset) {}
      }
      function scrubTelegramIosChatInputAreaDock(node) {
        if (!node) return;
        try {
          node.classList.remove("chat-input-area--vv-dock");
        } catch (eDockClsScrub) {}
        try {
          if (node.style) {
            node.style.removeProperty("position");
            node.style.removeProperty("left");
            node.style.removeProperty("right");
            node.style.removeProperty("top");
            node.style.removeProperty("bottom");
            node.style.removeProperty("width");
            node.style.removeProperty("max-width");
            node.style.removeProperty("box-sizing");
            node.style.removeProperty("z-index");
          }
        } catch (eDockStyleScrub) {}
      }
      function attachTelegramIosChatInputAreaDockGuard() {
        return;
      }
      function updateChatKeyboardInnerHeightBaseline() {
        try {
          var ihNow = window.innerHeight || 0;
          if (ihNow > 200) {
            var prev = Number(window.__pokerChatInnerHBaseline) || 0;
            window.__pokerChatInnerHBaseline = Math.max(prev, ihNow);
          }
        } catch (eBase) {}
      }
      function setTelegramIosShellFocusOverrides(active) {
        window.__pokerTelegramIosShellFocusOverridesActive = false;
      }
      function setNativeTelegramIosComposerFocusClasses(active) {
        try {
          document.documentElement.classList.remove("chat-tma-ios-composer-minimal", "chat-tma-ios-shell-native");
          document.body.classList.remove("chat-tma-ios-composer-minimal", "chat-tma-ios-shell-native");
        } catch (eTmaNativeCls) {}
        setTelegramIosShellFocusOverrides(false);
      }
      function setChatKeyboardOpenClasses(open) {
        try {
          if (enforceTelegramChatDefaultComposerState()) return;
          if (open && isChatPhysicalKeyboardContext()) {
            clearChatKeyboardViewportState({ keepInsets: true });
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
            return;
          }
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) {
            clearChatKeyboardViewportState({ keepInsets: true });
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
            return;
          }
          if (open) {
            document.documentElement.classList.add("chat-keyboard-open");
            document.body.classList.add("chat-keyboard-open");
          } else {
            clearChatKeyboardViewportState({ keepInsets: true });
          }
          document.documentElement.classList.remove("chat-keyboard-open--tma-flow");
          document.body.classList.remove("chat-keyboard-open--tma-flow");
        } catch (eKbCls) {}
      }
      function scrollVisibleChatMessagesToBottom(options) {
        var isTelegramChat = isTelegramChatRuntime();
        var opts = options || {};
        var shouldSnap = !!opts.force;
        try {
          var visibleBeforePad = getVisibleMessagesEl();
          shouldSnap =
            shouldSnap ||
            !visibleBeforePad ||
            chatMessagesNearBottom(visibleBeforePad, CHAT_SCROLL_BOTTOM_NEAR_PX);
        } catch (eSnapCheck) {
          shouldSnap = true;
        }
        updateChatMessagesKeyboardPad();
        if (!isTelegramChat) {
          try {
            var se = document.scrollingElement;
            if (se && se.scrollTop !== 0) se.scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
            if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
          } catch (eDocSc) {}
        }
        try {
          var visibleMessages = getVisibleMessagesEl();
          if (visibleMessages && !isTelegramChat && shouldSnap) visibleMessages.scrollTop = visibleMessages.scrollHeight;
        } catch (eMsgSc) {}
      }
      function detachTelegramMiniAppChatThreadRootScrollLock() {
        window.__pokerChatTmaRootScrollLockHandler = null;
        window.__pokerChatTmaRootScrollLockRaf = null;
        window.__pokerChatTmaRootScrollLockTimer = null;
      }
      function attachTelegramMiniAppChatThreadRootScrollLock() {
        return;
      }
      function shouldSkipPwaChatRootScrollDuringComposerOpen(focusTarget) {
        try {
          if (isTelegramChatRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var target = focusTarget || document.activeElement || chatComposerEl;
          if (!isChatThreadComposerKeyboardDom(target)) return false;
          if (isPwaChatManualFocusIntentActive(target)) return true;
          if (isIosPwaChatComposerOpeningHoldActive(target)) return true;
          try {
            if (!isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return true;
          } catch (ePwaRootLayoutOpen) {}
          try {
            if ((Number(window.__pokerChatThreadDockBottomCssPx) || 0) > 24) return true;
          } catch (ePwaRootDockOpen) {}
          var now = Date.now();
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          if (openingUntil > now) return true;
          if (focusAt > 0 && now - focusAt < 2600) return true;
          return false;
        } catch (ePwaRootSkip) {
          return false;
        }
      }
      function isIosPwaChatThreadViewportClearlyClosed(focusTarget) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var target = focusTarget || document.activeElement || chatComposerEl;
          if (!isChatThreadComposerKeyboardDom(target) && chatComposerEl && isChatThreadComposerKeyboardDom(chatComposerEl)) {
            target = chatComposerEl;
          }
          if (!isChatThreadComposerKeyboardDom(target)) return false;
          var vv = window.visualViewport || null;
          var ih = window.innerHeight || 0;
          if (!vv || ih < 240) return false;
          var vvh = Number(vv.height) || 0;
          var offsetTop = Number(vv.offsetTop) || 0;
          if (vvh < 160) return false;
          var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
          var heightLoss = Math.max(0, Math.round(ih - vvh));
          var ratio = ih > 0 ? vvh / ih : 0;
          var base = Number(window.__pokerChatInnerHBaseline) || 0;
          var winLoss = base > 260 && ih > 0 ? Math.max(0, Math.round(base - ih)) : 0;
          var focusAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var active = document.activeElement || null;
          var activeComposer = !!(active && isChatThreadComposerKeyboardDom(active));
          if (shouldAbortPwaChatKeyboardCleanupForOpening(target, "viewport-clearly-closed")) return false;
          if (isPwaChatManualFocusIntentActive(target)) return false;
          if (isIosPwaChatComposerOpeningHoldActive(target)) return false;
          if (activeComposer && (openingUntil > Date.now() || (focusAge > 0 && focusAge < 1250))) return false;
          return ratio > 0.9 && belowVv < 22 && heightLoss < 72 && winLoss < 72;
        } catch (ePwaViewportClosed) {
          return false;
        }
      }
      function finalizeIosPwaChatThreadClosedKeyboard(focusTarget, label) {
        try {
          var active = document.activeElement;
          if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || active || chatComposerEl, "closed-finalize")) return false;
          if (active && isIosPwaChatComposerOpeningHoldActive(active)) return false;
          if (active && isChatThreadComposerKeyboardDom(active) && !isRecentIosPwaChatComposerUserDismiss()) return false;
          if (!isIosPwaChatThreadViewportClearlyClosed(focusTarget)) return false;
          collectChatOverscrollSnapshot("pwa-closed-finalize:" + (label || ""), focusTarget || document.activeElement || chatComposerEl);
          finalizeChatKeyboardDismiss();
          return true;
        } catch (ePwaClosedFinalize) {
          return false;
        }
      }
      function pwaChatThreadRootScrollToZero(focusTarget) {
        if (shouldSkipPwaChatRootScrollDuringComposerOpen(focusTarget)) return false;
        try {
          if (window.scrollY) window.scrollTo(0, 0);
        } catch (eWinScroll0) {}
        try {
          var se = document.scrollingElement;
          if (se && se.scrollTop !== 0) se.scrollTop = 0;
        } catch (eSeScroll0) {}
        try {
          if (document.documentElement && document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
        } catch (eHtmlScroll0) {}
        try {
          if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
        } catch (eBodyScroll0) {}
        return true;
      }
      function detachPwaChatThreadRootScrollLock() {
        try {
          if (window.__pokerChatPwaRootScrollLockHandler) {
            window.removeEventListener("scroll", window.__pokerChatPwaRootScrollLockHandler, true);
          }
        } catch (ePwaRootScrollDetach) {}
        try {
          if (window.__pokerChatPwaRootScrollLockTimer) clearTimeout(window.__pokerChatPwaRootScrollLockTimer);
        } catch (ePwaRootTimerDetach) {}
        window.__pokerChatPwaRootScrollLockHandler = null;
        window.__pokerChatPwaRootScrollLockRaf = null;
        window.__pokerChatPwaRootScrollLockTimer = null;
      }
      function attachPwaChatThreadRootScrollLock(focusTarget) {
        try {
          if (
            isTelegramChatRuntime() ||
            typeof pokerPwaStandaloneForKeyboardInset !== "function" ||
            !pokerPwaStandaloneForKeyboardInset() ||
            typeof isIosLikeForChatViewport !== "function" ||
            !isIosLikeForChatViewport() ||
            !isChatThreadComposerKeyboardDom(focusTarget)
          ) {
            return;
          }
          window.__pokerChatPwaRootScrollLockActive = true;
          if (!window.__pokerChatPwaRootScrollLockHandler) {
            window.__pokerChatPwaRootScrollLockHandler = function () {
              if (!window.__pokerChatPwaRootScrollLockActive) return;
              if (!document.body || !document.body.classList.contains("chat-keyboard-open")) return;
              if (String(document.body.getAttribute("data-view") || "") !== "chat") return;
              if (window.__pokerChatPwaRootScrollLockRaf) return;
              var rafLock = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
              window.__pokerChatPwaRootScrollLockRaf = rafLock(function () {
                window.__pokerChatPwaRootScrollLockRaf = null;
                pwaChatThreadRootScrollToZero(focusTarget);
              });
            };
            window.addEventListener("scroll", window.__pokerChatPwaRootScrollLockHandler, true);
          }
          pwaChatThreadRootScrollToZero(focusTarget);
          [40, 120, 260, 520].forEach(function (ms) {
            setTimeout(function () {
              try {
                if (!document.body || !document.body.classList.contains("chat-keyboard-open")) return;
                if (String(document.body.getAttribute("data-view") || "") !== "chat") return;
                pwaChatThreadRootScrollToZero(focusTarget);
              } catch (ePwaRootLockTick) {}
            }, ms);
          });
        } catch (ePwaRootLock) {}
      }
      function repairChatFocusViewportOverscroll(focusTarget) {
        return;
      }
      function scheduleChatKeyboardPostDismissPasses(delays) {
        if (!Array.isArray(delays)) return;
        var dismissCleanupSeq = Number(window.__pokerChatKeyboardCleanupSeq) || 0;
        delays.forEach(function (ms) {
          var timerId = setTimeout(function () {
            if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== dismissCleanupSeq) return;
            if (document.body.classList.contains("chat-keyboard-open")) return;
            try {
              var reopenTarget = document.activeElement || chatComposerEl;
              if (shouldAbortPwaChatKeyboardCleanupForOpening(reopenTarget, "post-dismiss")) return;
              if (isPwaChatManualFocusIntentActive(reopenTarget)) return;
              if (isIosPwaChatComposerOpeningHoldActive(reopenTarget)) return;
              if (Number(window.__pokerChatKeyboardOpeningUntil) > Date.now()) return;
              if (Number(window.__pokerChatPwaFocusKeepAliveUntil) > Date.now()) return;
            } catch (eDismissReopenGuard) {}
            try {
              if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
                pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
              }
            } catch (eD) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScD) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") {
                pokerRepairIosStuckVisualViewportOffset();
              }
            } catch (eVvD) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") {
                pokerPulseChatFixedViewportHeightAfterKeyboard();
              }
            } catch (ePulD) {}
            stripChatInputAreaTransforms();
            pokerStripForcedViewportShellHeights();
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTbD) {}
            try {
              if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
            } catch (eR2) {}
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (eDismissTrack) {}
        });
      }
      function clearPendingChatKeyboardDismissTimers() {
        try {
          var timers = window.__pokerChatDismissTimers;
          if (!Array.isArray(timers)) {
            window.__pokerChatDismissTimers = [];
            return;
          }
          timers.forEach(function (id) {
            try { clearTimeout(id); } catch (eClrTm) {}
          });
          window.__pokerChatDismissTimers = [];
        } catch (eDismissClear) {}
      }
      function markPwaChatKeyboardOpenIntent(target, label) {
        try {
          if (!target || !isChatThreadComposerKeyboardDom(target)) return 0;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return 0;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return 0;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return 0;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return 0;
          var now = Date.now();
          window.__pokerChatKeyboardSessionSeq = (Number(window.__pokerChatKeyboardSessionSeq) || 0) + 1;
          window.__pokerChatKeyboardCleanupSeq = (Number(window.__pokerChatKeyboardCleanupSeq) || 0) + 1;
          window.__pokerChatPwaPointerDismissSeq = (Number(window.__pokerChatPwaPointerDismissSeq) || 0) + 1;
          window.__pokerChatPwaUserDismissAt = 0;
          window.__pokerChatPwaLastOpenIntentAt = now;
          window.__pokerChatPwaLastOpenIntentTarget = target;
          window.__pokerChatPwaLastOpenIntentLabel = label || "";
          window.__pokerChatPwaColdOpenPrimedAt = now;
          window.__pokerChatPwaColdOpenHoldUntil = now + 3600;
          window.__pokerChatPwaColdOpenTarget = target;
          clearPendingChatKeyboardDismissTimers();
          return Number(window.__pokerChatKeyboardSessionSeq) || 0;
        } catch (ePwaOpenIntent) {
          return 0;
        }
      }
      function markPwaChatKeyboardDismissCleanup(label) {
        try {
          window.__pokerChatKeyboardCleanupSeq = (Number(window.__pokerChatKeyboardCleanupSeq) || 0) + 1;
          window.__pokerChatKeyboardDismissCleanupLabel = label || "";
          window.__pokerChatKeyboardDismissCleanupAt = Date.now();
          return Number(window.__pokerChatKeyboardCleanupSeq) || 0;
        } catch (ePwaDismissSeq) {
          return 0;
        }
      }
      function markPwaChatKeyboardScrolledOpenHold(target, label, durationMs) {
        try {
          if (!target || !isChatThreadComposerKeyboardDom(target)) return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var box = getVisibleMessagesEl();
          if (!box) return false;
          var bottomGap = chatMessagesBottomGap(box);
          if (bottomGap <= Math.max(CHAT_SCROLL_BOTTOM_REARM_PX, Math.round((Number(box.clientHeight) || 0) * 0.42))) return false;
          var now = Date.now();
          window.__pokerChatPwaScrolledOpenHoldUntil = now + Math.max(1400, Number(durationMs) || 3200);
          window.__pokerChatPwaScrolledOpenTarget = target;
          window.__pokerChatPwaScrolledOpenLabel = label || "";
          window.__pokerChatPwaScrolledOpenScrollTop = Math.max(0, Number(box.scrollTop) || 0);
          window.__pokerChatPwaScrolledOpenBottomGap = bottomGap;
          return true;
        } catch (ePwaScrolledOpenHold) {
          return false;
        }
      }
      function clearPwaChatKeyboardOpenHolds(label) {
        try {
          window.__pokerChatPwaScrolledOpenHoldUntil = 0;
          window.__pokerChatPwaScrolledOpenTarget = null;
          window.__pokerChatPwaScrolledOpenLabel = "";
          window.__pokerChatPwaColdOpenHoldUntil = 0;
          window.__pokerChatPwaColdOpenTarget = null;
          window.__pokerChatPwaClearedOpenHoldsLabel = label || "";
        } catch (eClearPwaOpenHolds) {}
      }
      function shouldAbortPwaChatKeyboardCleanupForOpening(target, label) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var active = document.activeElement || null;
          var composer = target || active || chatComposerEl || window.__pokerChatManualFocusIntentTarget || window.__pokerChatPwaLastOpenIntentTarget;
          if (!isChatThreadComposerKeyboardDom(composer) && active && isChatThreadComposerKeyboardDom(active)) composer = active;
          if (!isChatThreadComposerKeyboardDom(composer) && chatComposerEl && isChatThreadComposerKeyboardDom(chatComposerEl)) composer = chatComposerEl;
          if (!isChatThreadComposerKeyboardDom(composer)) return false;
          var now = Date.now();
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
          var keepAliveTarget = window.__pokerChatPwaFocusKeepAliveTarget || null;
          var dismissAt = Number(window.__pokerChatPwaUserDismissAt) || 0;
          var lastOpenIntentAt = Number(window.__pokerChatPwaLastOpenIntentAt) || 0;
          var lastOpenTarget = window.__pokerChatPwaLastOpenIntentTarget || null;
          var coldOpenHoldUntil = Number(window.__pokerChatPwaColdOpenHoldUntil) || 0;
          var coldOpenTarget = window.__pokerChatPwaColdOpenTarget || null;
          var scrolledOpenHoldUntil = Number(window.__pokerChatPwaScrolledOpenHoldUntil) || 0;
          var scrolledOpenTarget = window.__pokerChatPwaScrolledOpenTarget || null;
          var focusIsAfterDismiss = !!(focusAt && (!dismissAt || focusAt >= dismissAt));
          var openIsAfterDismiss = !!(lastOpenIntentAt && (!dismissAt || lastOpenIntentAt >= dismissAt));
          if (active === composer && !isRecentIosPwaChatComposerUserDismiss()) return true;
          if (
            dismissAt &&
            now - dismissAt < 900 &&
            !focusIsAfterDismiss &&
            !openIsAfterDismiss &&
            active !== composer &&
            keepAliveUntil <= now
          ) {
            return false;
          }
          if (isPwaChatManualFocusIntentActive(composer)) return true;
          if (isIosPwaChatComposerOpeningHoldActive(composer)) return true;
          if (coldOpenHoldUntil > now && (!coldOpenTarget || coldOpenTarget === composer)) return true;
          if (scrolledOpenHoldUntil > now && (!scrolledOpenTarget || scrolledOpenTarget === composer)) return true;
          if (keepAliveUntil > now && (!keepAliveTarget || keepAliveTarget === composer)) return true;
          if (openingUntil > now && (!active || active === composer || active === document.body || active === document.documentElement)) return true;
          if (focusIsAfterDismiss && focusAt > 0 && now - focusAt < 3600 && active === composer) return true;
          if (openIsAfterDismiss && lastOpenIntentAt > 0 && now - lastOpenIntentAt < 3600 && (!lastOpenTarget || lastOpenTarget === composer)) return true;
          return false;
        } catch (eAbortPwaCleanup) {
          return false;
        }
      }
      try {
        window.__pokerShouldAbortPwaChatKeyboardCleanupForOpening = shouldAbortPwaChatKeyboardCleanupForOpening;
      } catch (eExposePwaCleanupGuard) {}
      function isChatComposerVirtualKeyboardOpenForRetention(target) {
        try {
          if (!target || String(target.tagName || "").toUpperCase() !== "TEXTAREA") return false;
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return true;
          if (typeof isChatKeyboardLayoutEffectivelyClosed === "function" && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return false;
          var now = Date.now();
          var openClass = !!(
            (document.body && document.body.classList && document.body.classList.contains("chat-keyboard-open")) ||
            (document.documentElement && document.documentElement.classList && document.documentElement.classList.contains("chat-keyboard-open"))
          );
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
          var dockBottom = Number(window.__pokerChatThreadDockBottomCssPx) || 0;
          return !!(
            document.activeElement === target ||
            openClass ||
            openingUntil > now ||
            keepAliveUntil > now ||
            dockBottom > 24
          );
        } catch (eSendKeyboardOpenCheck) {
          return false;
        }
      }
      function shouldSkipChatComposerFocusAfterClosedKeyboardSend(target) {
        try {
          if (typeof shouldAutoFocusChatComposerOnDesktop === "function" && shouldAutoFocusChatComposerOnDesktop()) return false;
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
          var touchLike = false;
          try {
            touchLike =
              (navigator.maxTouchPoints || 0) > 0 ||
              /Android|iPad|iPhone|iPod/i.test(navigator.userAgent || "") ||
              isTelegramChatRuntime() ||
              (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset());
          } catch (eSendTouchCtx) {}
          if (!touchLike) return false;
          return !isChatComposerVirtualKeyboardOpenForRetention(target);
        } catch (eSendClosedKeyboardSkip) {
          return false;
        }
      }
      function keepChatComposerFocusAfterSend(mode) {
        try {
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var wantedMode = mode === "general" || mode === "personal" ? mode : chatComposerMounted || chatActiveTab;
          if (wantedMode !== "general" && wantedMode !== "personal") return false;
          var target = null;
          if (wantedMode === "general") {
            target = chatGeneralComposerEl || (chatGeneralComposerMount && chatGeneralComposerMount.querySelector("textarea"));
          } else {
            target = chatPersonalComposerEl || (chatPersonalComposerMount && chatPersonalComposerMount.querySelector("textarea"));
          }
          if (!target) target = chatComposerEl || chatSharedComposerEl;
          if (!target || String(target.tagName || "").toUpperCase() !== "TEXTAREA") return false;
          if (target.disabled || target.hidden) return false;
          try {
            var suppressAnyUntil = Number(window.__pokerChatSuppressFocusAfterSendUntil) || 0;
            var suppressAnyMode = String(window.__pokerChatSuppressFocusAfterSendMode || "");
            if (suppressAnyUntil > Date.now() && (!suppressAnyMode || suppressAnyMode === wantedMode)) {
              window.__pokerChatSuppressFocusAfterSendUntil = 0;
              window.__pokerChatSuppressFocusAfterSendMode = "";
              window.__pokerChatSuppressFocusAfterEmojiOnlySendUntil = 0;
              window.__pokerChatSuppressFocusAfterEmojiOnlySendMode = "";
              try {
                if (typeof isChatKeyboardLayoutEffectivelyClosed === "function" && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) {
                  finalizeChatKeyboardDismiss();
                }
              } catch (eSendSuppressCleanup) {}
              return false;
            }
            var suppressUntil = Number(window.__pokerChatSuppressFocusAfterEmojiOnlySendUntil) || 0;
            var suppressMode = String(window.__pokerChatSuppressFocusAfterEmojiOnlySendMode || "");
            if (suppressUntil > Date.now() && (!suppressMode || suppressMode === wantedMode)) {
              window.__pokerChatSuppressFocusAfterEmojiOnlySendUntil = 0;
              window.__pokerChatSuppressFocusAfterEmojiOnlySendMode = "";
              return false;
            }
          } catch (eSendEmojiOnlySuppress) {}
          if (shouldSkipChatComposerFocusAfterClosedKeyboardSend(target)) {
            try {
              if (typeof isChatKeyboardLayoutEffectivelyClosed === "function" && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) {
                finalizeChatKeyboardDismiss();
              }
            } catch (eSendClosedCleanup) {}
            return false;
          }
          var wasActive = document.activeElement === target;
          var keyboardWasOpen = !!(document.body.classList && document.body.classList.contains("chat-keyboard-open"));
          var prevFocusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          var prevOpeningUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var prevDockBottom = Number(window.__pokerChatThreadDockBottomCssPx) || 0;
          var prevLastDockBottom = Number(window.__pokerChatLastAppliedDockBottom) || 0;
          var prevPad = Number(window.__pokerChatMessagesKeyboardPadLast) || 0;
          clearPendingChatKeyboardDismissTimers();
          window.__pokerChatPwaUserDismissAt = 0;
          window.__pokerChatSendKeepFocusUntil = Date.now() + 900;
          if (wasActive && keyboardWasOpen) {
            window.__pokerChatKeyboardFocusAtMs = prevFocusAt || Date.now() - 1200;
            window.__pokerChatKeyboardOpeningUntil = prevOpeningUntil > Date.now() ? prevOpeningUntil : 0;
          } else {
            window.__pokerChatKeyboardFocusAtMs = Date.now();
            window.__pokerChatKeyboardOpeningUntil = Math.max(prevOpeningUntil, Date.now() + 900);
          }
          chatComposerEl = target;
          try {
            target.removeAttribute("tabindex");
            target.removeAttribute("aria-hidden");
          } catch (eSendPrep) {}
          try {
            if (document.activeElement !== target && target.focus) target.focus({ preventScroll: true });
          } catch (eSendFocus1) {
            try {
              if (document.activeElement !== target && target.focus) target.focus();
            } catch (eSendFocus2) {}
          }
          try {
            if (typeof resizeChatTextarea === "function") resizeChatTextarea(target);
          } catch (eSendResize) {}
          try {
            if (wasActive && keyboardWasOpen && document.activeElement === target) {
              if (prevDockBottom > 0) window.__pokerChatThreadDockBottomCssPx = prevDockBottom;
              if (prevLastDockBottom > 0) window.__pokerChatLastAppliedDockBottom = prevLastDockBottom;
              if (prevPad > 0) window.__pokerChatMessagesKeyboardPadLast = prevPad;
            } else if (document.activeElement === target) {
              if (!isChatPhysicalKeyboardContext() && (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime())) {
                setChatKeyboardOpenClasses(true);
              }
              if (typeof onChatInputFocus === "function") onChatInputFocus(target);
            }
          } catch (eSendFocusState) {}
          try {
            if (typeof updateChatMessagesKeyboardPad === "function") updateChatMessagesKeyboardPad();
          } catch (eSendPad) {}
          try {
            if (typeof syncPwaChatVisualViewportInset === "function") syncPwaChatVisualViewportInset();
          } catch (eSendSync) {}
          return document.activeElement === target;
        } catch (eKeepSendFocus) {
          return false;
        }
      }
      window.__pokerKeepChatComposerFocusAfterSend = keepChatComposerFocusAfterSend;
      function finalizeChatKeyboardDismiss(options) {
        var finalizeOptions = options || {};
        if (!finalizeOptions.force && shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "finalize")) {
          collectChatOverscrollSnapshot("finalize:skip-active-opening", document.activeElement || chatComposerEl);
          return false;
        }
        markPwaChatKeyboardDismissCleanup("finalize");
        clearPwaChatKeyboardOpenHolds("finalize");
        clearPendingChatKeyboardDismissTimers();
        detachPwaChatThreadRootScrollLock();
        try {
          window.__pokerChatPwaRootScrollLockActive = false;
        } catch (ePwaRootInactive) {}
        try {
          window.__pokerChatManualFocusIntentUntil = 0;
          window.__pokerChatManualFocusIntentTarget = null;
        } catch (eManualIntentClear) {}
        try {
          window.__pokerChatKeyboardOpeningUntil = 0;
        } catch (eOpenReset) {}
        setNativeTelegramIosComposerFocusClasses(false);
        resetChatKeyboardDockRuntimeState();
        try {
          if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
            window.__pokerChatDetachVisualViewportListeners();
          }
        } catch (eDet) {}
        var doc = document.documentElement;
          try {
            setChatKeyboardOpenClasses(false);
            /* Сначала явный 0 — сброс кэша calc()/композитинга; remove на следующем кадре. */
            doc.style.setProperty("--chat-vv-inset", "0px");
            doc.style.setProperty("--chat-keyboard-fallback-inset", "0px");
            doc.style.setProperty("--chat-ios-pwa-thread-composer-bottom", "0px");
            doc.style.setProperty("--chat-ios-accessory-inset", "0px");
        } catch (eCls) {}
        try {
          if (document.body && document.body.getAttribute("data-view") === "chat") {
            doc.style.removeProperty("--app-bottom-tabbar-pad");
            if (typeof pokerApplyBottomTabbarPad !== "undefined" && pokerApplyBottomTabbarPad) {
              pokerApplyBottomTabbarPad._lastPad = null;
            }
          }
        } catch (eTbRoot) {}
        stripChatInputAreaTransforms();
        pokerStripForcedViewportShellHeights();
        clearChatMessagesKeyboardPad();
        updateChatKeyboardInnerHeightBaseline();
        try {
          var taKbDone =
            isTelegramChatRuntime()
              ? (chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl)
              : document.getElementById("chatSharedComposer");
          if (taKbDone && typeof resizeChatTextarea === "function") resizeChatTextarea(taKbDone);
        } catch (eTaKb) {}
        try {
          syncPwaChatVisualViewportInset();
        } catch (eSync) {}
        try {
          clearChatKeyboardViewportState();
        } catch (eRm) {}
        stripChatInputAreaTransforms();
        pokerStripForcedViewportShellHeights();
        try {
          if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
        } catch (eScr0) {}
        try {
          if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
        } catch (eVvRep) {}
        try {
          var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tw && typeof tw.expand === "function") tw.expand();
        } catch (eTg) {}
        try {
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        } catch (eNuke) {}
        try {
          if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
        } catch (ePulKb) {}
        try {
          [100, 320].forEach(function (ms) {
            setTimeout(function () {
              try {
                if (document.body.classList.contains("chat-keyboard-open")) return;
                if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "finalize-strip")) return;
              } catch (eKbChk) {}
              pokerStripForcedViewportShellHeights();
            }, ms);
          });
        } catch (ePulStrip) {}
        try {
          if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
        } catch (eRe) {}
        try {
          if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
        } catch (ePad) {}
        try {
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        } catch (eTb) {}
        try {
          var raf = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          raf(function () {
            if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "finalize-raf")) return;
            stripChatInputAreaTransforms();
            pokerStripForcedViewportShellHeights();
            try {
              doc.style.removeProperty("--chat-vv-inset");
              doc.style.removeProperty("--chat-keyboard-fallback-inset");
              doc.style.removeProperty("--chat-ios-pwa-thread-composer-bottom");
              doc.style.removeProperty("--chat-ios-accessory-inset");
            } catch (e2) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScr1) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
            } catch (eVv2) {}
            try {
              if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
            } catch (eNuke2) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
            } catch (ePulKb2) {}
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTb2) {}
          });
        } catch (eRaf) {}
        scheduleChatKeyboardPostDismissPasses([80, 220, 520]);
        try {
          if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
        } catch (eFlushKb) {}
        try {
          setTimeout(function () {
            if (document.body.classList.contains("chat-keyboard-open")) return;
            if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "finalize-flush")) return;
            if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
          }, 180);
        } catch (eFlushKb2) {}
        return true;
      }
      window.__pokerFinalizeChatKeyboardDismiss = finalizeChatKeyboardDismiss;
      function forcePwaChatKeyboardCleanupIfClosed() {
        try {
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (!document.body.classList.contains("chat-keyboard-open")) return false;
          if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "force-cleanup")) return false;
          if (isPwaChatManualFocusIntentActive(document.activeElement || chatComposerEl)) return false;
          if (isIosPwaChatComposerOpeningHoldActive(document.activeElement || chatComposerEl)) return false;
          if (
            document.activeElement &&
            isChatThreadComposerKeyboardDom(document.activeElement) &&
            !isRecentIosPwaChatComposerUserDismiss()
          ) return false;
          if (finalizeIosPwaChatThreadClosedKeyboard(document.activeElement || chatComposerEl, "force-cleanup")) return true;
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          if (openingUntil > Date.now()) return false;
          var pwaLike =
            (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
            (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
          if (!pwaLike) return false;
          if (!isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return false;
          finalizeChatKeyboardDismiss();
          try {
            if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") {
              pokerFlushBottomNavAndViewportAfterChatChrome();
            }
          } catch (eForceFl) {}
          return true;
        } catch (eForcePwaKb) {
          return false;
        }
      }
      window.__pokerForcePwaChatKeyboardCleanupIfClosed = forcePwaChatKeyboardCleanupIfClosed;
      function isIosPwaChatThreadLifecycleDockActive() {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var active = document.activeElement || null;
          if (active && isChatThreadComposerKeyboardDom(active)) return true;
          var docked = document.querySelector(
            ".chat-general-view .chat-input-area.chat-input-area--vv-dock, .chat-container .chat-input-area.chat-input-area--vv-dock"
          );
          return !!docked || !!(document.body && document.body.classList.contains("chat-keyboard-open"));
        } catch (ePwaLifecycleActive) {
          return false;
        }
      }
      function suspendIosPwaChatThreadDockForPageLifecycle(label) {
        try {
          if (!isIosPwaChatThreadLifecycleDockActive()) return false;
          window.__pokerChatPwaLifecycleSuspendAt = Date.now();
          window.__pokerChatKeyboardOpeningUntil = 0;
          detachPwaChatThreadRootScrollLock();
          try {
            window.__pokerChatPwaRootScrollLockActive = false;
          } catch (ePwaLifecycleRootOff) {}
          resetChatKeyboardDockRuntimeState();
          setChatKeyboardOpenClasses(false);
          try {
            document.documentElement.style.removeProperty("--chat-vv-inset");
            document.documentElement.style.removeProperty("--chat-keyboard-fallback-inset");
            document.documentElement.style.removeProperty("--chat-ios-pwa-thread-composer-bottom");
            document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
          } catch (ePwaLifecycleVars) {}
          stripChatInputAreaTransforms();
          clearChatMessagesKeyboardPad();
          collectChatOverscrollSnapshot("pwa-lifecycle-suspend:" + (label || ""), document.activeElement || chatComposerEl);
          return true;
        } catch (ePwaLifecycleSuspend) {
          return false;
        }
      }
      function resumeIosPwaChatThreadDockAfterPageLifecycle(label) {
        try {
          if (document.hidden) return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var active = document.activeElement || null;
          if (!active || !isChatThreadComposerKeyboardDom(active)) return false;
          if (!isIosPwaChatThreadKeyboardOpenConfirmed(active)) return false;
          window.__pokerChatKeyboardFocusAtMs = Date.now() - 220;
          window.__pokerChatKeyboardOpeningUntil = Date.now() + 700;
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
          var applied = applyCssOnlyIosPwaChatComposerDock(active, "lifecycle-resume:" + (label || ""));
          if (applied) {
            attachPwaChatThreadRootScrollLock(active);
            ensurePwaChatDockWatchdog(active);
          }
          return applied;
        } catch (ePwaLifecycleResume) {
          return false;
        }
      }
      if (!window.__pokerIosPwaChatThreadLifecycleDockBound) {
        window.__pokerIosPwaChatThreadLifecycleDockBound = true;
        var schedulePwaLifecycleResume = function (label) {
          [60, 180, 360, 700].forEach(function (ms) {
            setTimeout(function () {
              resumeIosPwaChatThreadDockAfterPageLifecycle(label + ":t" + ms);
            }, ms);
          });
        };
        document.addEventListener("visibilitychange", function () {
          try {
            if (document.hidden) suspendIosPwaChatThreadDockForPageLifecycle("visibility-hidden");
            else schedulePwaLifecycleResume("visibility-visible");
          } catch (ePwaLifecycleVis) {}
        });
        window.addEventListener("pagehide", function () {
          suspendIosPwaChatThreadDockForPageLifecycle("pagehide");
        });
        window.addEventListener("pageshow", function () {
          schedulePwaLifecycleResume("pageshow");
        });
        window.addEventListener("focus", function () {
          schedulePwaLifecycleResume("window-focus");
        });
      }
      /* iOS/WKWebView: blur и высота visualViewport обновляются с задержкой — снимаем «хвост» подъёма, когда vv снова полноэкранный */
      if (!window.__pokerChatVvPostKeyboardCleanupAttached && window.visualViewport && window.visualViewport.addEventListener) {
        window.__pokerChatVvPostKeyboardCleanupAttached = true;
        var vvPostKbTimer = null;
        function onVvAfterKeyboardMaybeClosed() {
          if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "vv-post")) return;
          if (isPwaChatManualFocusIntentActive(document.activeElement || chatComposerEl)) return;
          if (isIosPwaChatComposerOpeningHoldActive(document.activeElement || chatComposerEl)) return;
          if (forcePwaChatKeyboardCleanupIfClosed()) return;
          if (document.body.classList.contains("chat-keyboard-open")) return;
          var ih = window.innerHeight || 0;
          var vvh = Number(window.visualViewport.height) || 0;
          /* iPhone 15: vv иногда близок к полной высоте, но 28px порог не срабатывает — ловим с 12px. */
          if (!ih || vvh < ih - 12) return;
          clearTimeout(vvPostKbTimer);
          var vvCleanupSeq = Number(window.__pokerChatKeyboardCleanupSeq) || 0;
          vvPostKbTimer = setTimeout(function () {
            if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== vvCleanupSeq) return;
            if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "vv-post-late")) return;
            if (isPwaChatManualFocusIntentActive(document.activeElement || chatComposerEl)) return;
            if (isIosPwaChatComposerOpeningHoldActive(document.activeElement || chatComposerEl)) return;
            if (document.body.classList.contains("chat-keyboard-open")) return;
            var ih2 = window.innerHeight || 0;
            var vvh2 = Number(window.visualViewport.height) || 0;
            if (!ih2 || vvh2 < ih2 - 12) return;
            document.documentElement.classList.remove("chat-vv-lift");
            document.documentElement.style.removeProperty("--chat-vv-inset");
            document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
            stripChatInputAreaTransforms();
            try {
              clearChatMessagesKeyboardPad();
            } catch (ePadVv) {}
            try {
              var ihVvUp = window.innerHeight || 0;
              if (ihVvUp > 240) {
                var prevVvB = Number(window.__pokerChatInnerHBaseline) || 0;
                window.__pokerChatInnerHBaseline = Math.max(prevVvB, ihVvUp);
              }
            } catch (eVvBl) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScVv) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
            } catch (eVvP) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
            } catch (ePulVv) {}
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTbV) {}
            try {
              var twP = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              if (twP && typeof twP.expand === "function") twP.expand();
            } catch (eEx) {}
            try {
              if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
            } catch (eFlVv) {}
          }, 110);
        }
        window.visualViewport.addEventListener("resize", onVvAfterKeyboardMaybeClosed);
        window.visualViewport.addEventListener("scroll", onVvAfterKeyboardMaybeClosed);
      }
      window.addEventListener(
        "focus",
        function () {
          try {
            forcePwaChatKeyboardCleanupIfClosed();
          } catch (ePwaFocusCleanup) {}
        },
        true
      );
      if (!window.__pokerIosPwaChatThreadDismissPointerBound) {
        window.__pokerIosPwaChatThreadDismissPointerBound = true;
        var eventHitsChatComposerArea = function (event) {
          try {
            if (!event) return false;
            var point = null;
            if (event.touches && event.touches[0]) point = event.touches[0];
            else if (event.changedTouches && event.changedTouches[0]) point = event.changedTouches[0];
            else point = event;
            var x = Number(point.clientX);
            var y = Number(point.clientY);
            if (!isFinite(x) || !isFinite(y)) return false;
            var areas = document.querySelectorAll(".chat-general-view .chat-input-area, .chat-container .chat-input-area");
            for (var i = 0; i < areas.length; i += 1) {
              var area = areas[i];
              if (!area) continue;
              var rect = area.getBoundingClientRect();
              if (!rect || rect.width <= 0 || rect.height <= 0) continue;
              if (x >= rect.left - 10 && x <= rect.right + 10 && y >= rect.top && y <= rect.bottom + 6) return true;
            }
          } catch (eComposerHitTest) {}
          return false;
        };
        var preservePwaComposerKeyboardFromGesture = function (target, label, durationMs) {
          try {
            var composer = target;
            if (!isChatThreadComposerKeyboardDom(composer)) {
              composer = chatComposerEl || (document.activeElement && isChatThreadComposerKeyboardDom(document.activeElement) ? document.activeElement : null);
            }
            if (!composer || !isChatThreadComposerKeyboardDom(composer)) return false;
            var now = Date.now();
            chatComposerEl = composer;
            markPwaChatKeyboardOpenIntent(composer, label || "gesture-keep-keyboard");
            window.__pokerChatPwaUserDismissAt = 0;
            window.__pokerChatManualFocusIntentUntil = now + Math.max(700, Number(durationMs) || 1400);
            window.__pokerChatManualFocusIntentTarget = composer;
            window.__pokerChatKeyboardFocusAtMs = now;
            window.__pokerChatKeyboardOpeningUntil = now + Math.max(700, Number(durationMs) || 1400);
            if (typeof markIosPwaChatComposerKeepAlive === "function") {
              markIosPwaChatComposerKeepAlive(composer, label || "gesture-keep-keyboard", Math.max(700, Number(durationMs) || 1400));
            }
            try {
              if (composer.focus) composer.focus({ preventScroll: true });
            } catch (eGestureFocus1) {
              try { if (composer.focus) composer.focus(); } catch (eGestureFocus2) {}
            }
            try {
              if (document.activeElement === composer && typeof maybeApplyCssOnlyIosPwaChatComposerDock === "function") {
                maybeApplyCssOnlyIosPwaChatComposerDock(composer, label || "gesture-keep-keyboard");
              }
            } catch (eGestureDock) {}
            try {
              if (typeof updateChatMessagesKeyboardPad === "function") updateChatMessagesKeyboardPad();
            } catch (eGesturePad) {}
            return true;
          } catch (eGestureKeepKeyboard) {
            return false;
          }
        };
        var pwaThreadPointerDismiss = function (event) {
          try {
            if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return;
            var target = event && event.target ? event.target : null;
            if (
              chatEmojiPicker &&
              !chatEmojiPicker.classList.contains("chat-emoji-picker--hidden") &&
              target &&
              target.closest &&
              !target.closest(".chat-input-area, .chat-emoji-btn, .chat-emoji-picker, .chat-attach-dropdown, .chat-context-menu, .chat-scroll-bottom-btn, .chat-back-btn")
            ) {
              var emojiFocusTarget =
                chatEmojiPickerTargetInput ||
                (isChatThreadComposerKeyboardDom(document.activeElement) ? document.activeElement : null) ||
                chatComposerEl;
              var preserveEmojiOutsideKeyboard = false;
              try {
                preserveEmojiOutsideKeyboard =
                  !!(
                    emojiFocusTarget &&
                    isChatThreadComposerKeyboardDom(emojiFocusTarget) &&
                    document.body.classList.contains("chat-keyboard-open") &&
                    typeof isChatKeyboardLayoutEffectivelyClosed === "function" &&
                    !isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })
                  );
              } catch (eEmojiOutsidePreserveCheck) {}
              if (preserveEmojiOutsideKeyboard) {
                preservePwaComposerKeyboardFromGesture(emojiFocusTarget, "emoji-picker-outside", 1600);
              } else {
                try {
                  window.__pokerChatKeyboardOpeningUntil = 0;
                  window.__pokerChatPwaFocusKeepAliveUntil = 0;
                  window.__pokerChatPwaFocusKeepAliveTarget = null;
                  window.__pokerChatPwaFocusKeepAliveReason = "";
                } catch (eEmojiOutsideClosedClear) {}
              }
              hideChatEmojiPicker();
              window.__pokerChatEmojiPickerClosedByOutsideAt = Date.now();
              if (preserveEmojiOutsideKeyboard && emojiFocusTarget && isChatThreadComposerKeyboardDom(emojiFocusTarget)) {
                markIosPwaChatComposerKeepAlive(emojiFocusTarget, "emoji-picker-outside", 1300);
              }
              try {
                if (event && event.cancelable && typeof event.preventDefault === "function") event.preventDefault();
              } catch (eEmojiOutsidePrevent) {}
              try {
                if (event && typeof event.stopPropagation === "function") event.stopPropagation();
              } catch (eEmojiOutsideStop) {}
              return;
            }
            if (Number(window.__pokerChatEmojiPickerClosedByOutsideAt) && Date.now() - Number(window.__pokerChatEmojiPickerClosedByOutsideAt) < 450) return;
            if (!document.body.classList.contains("chat-keyboard-open")) return;
            if (!shouldUseCssOnlyIosPwaChatComposerDock(document.activeElement || chatComposerEl)) return;
            if (
              target &&
              target.closest &&
              target.closest(".chat-input-area, .chat-emoji-btn, .chat-emoji-picker, .chat-attach-dropdown, .chat-context-menu, .chat-scroll-bottom-btn, .chat-back-btn")
            ) {
              markIosPwaChatComposerKeepAlive(target, "composer-chrome", 1200);
              return;
            }
            if (eventHitsChatComposerArea(event)) {
              preservePwaComposerKeyboardFromGesture(document.activeElement || chatComposerEl, "composer-hit-area", 1400);
              return;
            }
            var pointerDismissAt = Date.now();
            var pointerDismissSeq = (Number(window.__pokerChatPwaPointerDismissSeq) || 0) + 1;
            window.__pokerChatPwaPointerDismissSeq = pointerDismissSeq;
            markPwaChatKeyboardDismissCleanup("outside-pointer-dismiss");
            window.__pokerChatPwaUserDismissAt = pointerDismissAt;
            window.__pokerChatManualFocusIntentUntil = 0;
            window.__pokerChatManualFocusIntentTarget = null;
            window.__pokerChatKeyboardOpeningUntil = 0;
            window.__pokerChatPwaFocusKeepAliveUntil = 0;
            window.__pokerChatPwaFocusKeepAliveTarget = null;
            window.__pokerChatPwaFocusKeepAliveReason = "";
            clearPwaChatKeyboardOpenHolds("outside-pointer-dismiss");
            var active = document.activeElement;
            if (active && isChatThreadComposerKeyboardDom(active) && active.blur) active.blur();
            function runPointerDismissCleanup(label) {
              try {
                if ((Number(window.__pokerChatPwaPointerDismissSeq) || 0) !== pointerDismissSeq) return;
                if ((Number(window.__pokerChatPwaUserDismissAt) || 0) !== pointerDismissAt) return;
                var reopenTarget = document.activeElement || chatComposerEl;
                if (isPwaChatManualFocusIntentActive(reopenTarget)) return;
                if (isIosPwaChatComposerOpeningHoldActive(reopenTarget)) return;
                if (Number(window.__pokerChatKeyboardOpeningUntil) > Date.now()) return;
                if (Number(window.__pokerChatPwaFocusKeepAliveUntil) > Date.now()) return;
                forcePwaChatKeyboardCleanupIfClosed();
                if (typeof pokerRepairClosedChatComposerRestingState === "function") {
                  pokerRepairClosedChatComposerRestingState(label);
                }
              } catch (ePwaPointerDismissCleanupRun) {}
            }
            setTimeout(function () {
              try {
                runPointerDismissCleanup("outside-pointer-dismiss");
              } catch (ePwaPointerDismissCleanup) {}
            }, 80);
            setTimeout(function () {
              try {
                runPointerDismissCleanup("outside-pointer-dismiss-late");
              } catch (ePwaPointerDismissCleanupLate) {}
            }, 320);
          } catch (ePwaPointerDismiss) {}
        };
        document.addEventListener("pointerdown", pwaThreadPointerDismiss, true);
        document.addEventListener("touchstart", pwaThreadPointerDismiss, { capture: true, passive: false });
      }
      if (!window.__pokerIosPwaChatComposerGestureGuardBound) {
        window.__pokerIosPwaChatComposerGestureGuardBound = true;
        function shouldGuardIosPwaChatComposerGesture() {
          try {
            if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
            if (!document.body.classList.contains("chat-keyboard-open")) return false;
            if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
            if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
            if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
            return true;
          } catch (eGuardRuntime) {
            return false;
          }
        }
        document.addEventListener(
          "touchmove",
          function (event) {
            if (!shouldGuardIosPwaChatComposerGesture()) return;
            var target = event && event.target ? event.target : null;
            if (!target || !target.closest) return;
            if (target.closest(".chat-input-area")) {
              markIosPwaChatComposerKeepAlive(target, "composer-touchmove", 1200);
              try {
                event.preventDefault();
              } catch (ePreventComposerMove) {}
              return;
            }
          },
          { capture: true, passive: false }
        );
        document.addEventListener(
          "pointerdown",
          function (event) {
            if (!shouldGuardIosPwaChatComposerGesture()) return;
            var target = event && event.target ? event.target : null;
            if (!target || !target.closest) return;
            if (target.closest(".chat-input-area, .chat-emoji-btn, .chat-emoji-picker")) {
              markIosPwaChatComposerKeepAlive(target, "composer-pointerdown", 1200);
            }
          },
          true
        );
      }

      /** Фокус в общем/личном треде: не тянуть --chat-vv-inset для «подъёма» композера (переделывается отдельно). */
      function isChatThreadComposerKeyboardDom(focusTarget) {
        if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
        var target = focusTarget || document.activeElement;
        if (!target) return false;
        var isComposerTarget = false;
        try {
          if (
            isPokerIosPwaKeyboardRuntime() &&
            String(target.tagName || "").toUpperCase() === "TEXTAREA" &&
            target.closest &&
            target.closest(".chat-input-area")
          ) {
            isComposerTarget = true;
          }
          if (!isComposerTarget) {
          isComposerTarget =
            target === chatComposerEl ||
            target === chatGeneralComposerEl ||
            target === chatPersonalComposerEl ||
            (!!chatGeneralComposerMount && chatGeneralComposerMount.contains(target)) ||
            (!!chatPersonalComposerMount && chatPersonalComposerMount.contains(target));
          }
        } catch (eTgt) {}
        if (!isComposerTarget) return false;
        var gen = generalView && !generalView.classList.contains("chat-general-view--hidden");
        var cv = convView && !convView.classList.contains("chat-conv-view--hidden");
        return !!(gen || cv);
      }
      function isHardDisabledChatComposerFlowTarget(focusTarget) {
        if (!isTelegramChatRuntime()) return false;
        if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
        var target = focusTarget || document.activeElement;
        if (!target) return false;
        try {
          if (target === chatSharedComposerEl) return true;
          if (target === chatGeneralComposerEl || target === chatPersonalComposerEl) return true;
          var activeArea =
            chatActiveTab === "personal"
              ? document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null)
              : document.getElementById("chatGeneralInputArea");
          if (activeArea && activeArea.contains && activeArea.contains(target)) return true;
        } catch (eHardChatTarget) {}
        return false;
      }
      function hardDisableChatComposerViewportLift(focusTarget, stageLabel) {
        if (!isTelegramChatRuntime()) return false;
        if (isPokerIosPwaKeyboardRuntime()) return false;
        if (shouldUseTelegramChatThreadVisualViewportDock(focusTarget)) return false;
        if (!isHardDisabledChatComposerFlowTarget(focusTarget)) return false;
        var directComposer = null;
        var shouldSnapToLatest = false;
        try {
          directComposer = getDirectChatComposer(chatActiveTab);
          if (!directComposer) directComposer = getDirectChatComposer(chatActiveTab === "personal" ? "general" : "personal");
        } catch (eHardDirectFind) {}
        try {
          var focusMessagesEl = getVisibleMessagesEl();
          if (focusMessagesEl) {
            shouldSnapToLatest = chatMessagesNearBottom(focusMessagesEl, Math.max(CHAT_SCROLL_BOTTOM_NEAR_PX, 240));
          }
        } catch (eHardNearBottom) {}
        try {
          if (directComposer && focusTarget === chatSharedComposerEl) {
            var carried = chatSharedComposerEl && chatSharedComposerEl.value != null ? String(chatSharedComposerEl.value) : "";
            if (carried && directComposer.value !== carried) directComposer.value = carried;
          }
        } catch (eHardCarry) {}
        try {
          clearPendingChatKeyboardDismissTimers();
          resetChatKeyboardDockRuntimeState();
          window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = 0;
        } catch (eHardTgReset) {}
        try {
          window.__pokerChatPwaSettleToBottomAfterKeyboard = false;
        } catch (eHardSettle) {}
        try {
          if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
            window.__pokerChatDetachVisualViewportListeners();
          }
        } catch (eHardDetach) {}
        try {
          setChatKeyboardOpenClasses(false);
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          stripChatInputAreaTransforms();
        } catch (eHardClear) {}
        try {
          clearTelegramChatRootShiftCompensation();
          ensureTelegramChatRootShiftCompensationBindings();
          applyTelegramChatRootShiftCompensation();
          setTimeout(applyTelegramChatRootShiftCompensation, 60);
          setTimeout(applyTelegramChatRootShiftCompensation, 180);
        } catch (eHardShift) {}
        try {
          if (chatSharedComposerEl) {
            chatSharedComposerEl.blur();
            chatSharedComposerEl.disabled = true;
            chatSharedComposerEl.hidden = true;
            chatSharedComposerEl.setAttribute("tabindex", "-1");
            chatSharedComposerEl.setAttribute("aria-hidden", "true");
            chatSharedComposerEl.style.setProperty("display", "none", "important");
            chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
          }
        } catch (eHardShared) {}
        try {
          if (directComposer) {
            chatComposerEl = directComposer;
            directComposer.disabled = false;
            directComposer.hidden = false;
            directComposer.removeAttribute("tabindex");
            directComposer.removeAttribute("aria-hidden");
            directComposer.style.removeProperty("display");
            directComposer.style.removeProperty("pointer-events");
            if (document.activeElement !== directComposer) {
              setTimeout(function () {
                try {
                  if (!directComposer || document.activeElement === directComposer) return;
                  if (directComposer.focus) directComposer.focus({ preventScroll: true });
                  var len = String(directComposer.value || "").length;
                  if (typeof directComposer.setSelectionRange === "function") directComposer.setSelectionRange(len, len);
                } catch (eHardRefocus1) {
                  try {
                    if (directComposer && directComposer.focus) directComposer.focus();
                  } catch (eHardRefocus2) {}
                }
              }, 0);
            }
          }
        } catch (eHardDirect) {}
        try {
          if (shouldSnapToLatest) {
            var settleToLatest = function () {
              try {
                var focusMessagesLate = getVisibleMessagesEl();
                if (focusMessagesLate) focusMessagesLate.scrollTop = focusMessagesLate.scrollHeight;
              } catch (eHardScrollLate) {}
            };
            var rafSnap = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            setTimeout(settleToLatest, 0);
            setTimeout(settleToLatest, 120);
            rafSnap(function () {
              settleToLatest();
              rafSnap(settleToLatest);
            });
          }
        } catch (eHardScroll) {}
        collectChatOverscrollSnapshot(stageLabel || "focus:hard-disabled", focusTarget);
        return true;
      }
      /** Зазор между низом полосы ввода и верхом клавиатуры (TMA — ровно 5px по UX). */
      function getChatComposerKeyboardGapPx() {
        if (isTelegramChatRuntime()) return 5;
        if (
          isIosLikeForChatViewport() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset()
        ) return 2;
        return isIosLikeForChatViewport() ? 6 : 4;
      }
      function getChatScreenSafeAreaBottomPx() {
        var rootStyle = null;
        var safeBottom = 0;
        try {
          rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
          safeBottom = Math.max(0, Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0));
        } catch (eSafeBottomRead) {}
        return safeBottom;
      }
      function getChatComposerMandatoryBottomOffsetPx() {
        var safeBottom = getChatScreenSafeAreaBottomPx();
        if (
          !isTelegramChatRuntime() &&
          typeof isIosLikeForChatViewport === "function" &&
          isIosLikeForChatViewport() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset()
        ) {
          /* Отрицательный bottom (-safe area) провоцировал первый плохой кадр при focus:
           * строка уезжала вниз ещё до vv-sync, а затем WK/WebView уже сам прокручивал документ вверх/вниз.
           * Для thread composer нижняя граница должна быть неотрицательной. */
          return 0;
        }
        return Math.max(0, safeBottom);
      }
      function isTelegramMiniAppChatThreadIos() {
        return false;
      }
      function shouldUseTelegramChatThreadVisualViewportDock(focusTarget) {
        try {
          return (
            isTelegramChatRuntime() &&
            isIosLikeForChatViewport() &&
            !isChatPhysicalKeyboardContext() &&
            isChatThreadComposerKeyboardDom(focusTarget)
          );
        } catch (eTgThreadDockMode) {
          return false;
        }
      }
      function isPassiveTelegramIosChatThread() {
        return false;
      }
      function shouldDisableTelegramIosChatKeyboardDock(target) {
        return false;
      }
      function shouldUseNativeTelegramIosChatComposerFlow(focusTarget) {
        return false;
      }
      function getTelegramChatRootShiftPx() {
        var shift = 0;
        try {
          shift = Math.max(shift, Math.round(window.scrollY || 0));
        } catch (eTgShiftWin) {}
        try {
          var scrollEl = document.scrollingElement || document.documentElement || document.body;
          shift = Math.max(shift, Math.round((scrollEl && scrollEl.scrollTop) || 0));
        } catch (eTgShiftDoc) {}
        try {
          var appEl = document.getElementById("app");
          if (appEl && appEl.getBoundingClientRect) {
            var appRect = appEl.getBoundingClientRect();
            shift = Math.max(shift, Math.round(Math.max(0, -(appRect.top || 0))));
          }
        } catch (eTgShiftApp) {}
        try {
          if (document.body && document.body.getBoundingClientRect) {
            var bodyRect = document.body.getBoundingClientRect();
            shift = Math.max(shift, Math.round(Math.max(0, -(bodyRect.top || 0))));
          }
        } catch (eTgShiftBody) {}
        return Math.max(0, shift);
      }
      function clearTelegramChatRootShiftCompensation() {
        [generalView, convView].forEach(function (node) {
          if (!node || !node.style) return;
          try {
            node.style.removeProperty("transform");
            node.style.removeProperty("will-change");
          } catch (eTgShiftClear) {}
        });
        window.__pokerTelegramChatRootShiftCompensationActive = false;
      }
      function applyTelegramChatRootShiftCompensation() {
        var hardChatTarget = false;
        try {
          hardChatTarget = isHardDisabledChatComposerFlowTarget();
        } catch (eHardShiftTarget) {}
        var telegramChatRuntime = false;
        try {
          telegramChatRuntime = isTelegramChatRuntime();
        } catch (eTgRuntimeShift) {}
        if (!telegramChatRuntime && !hardChatTarget) {
          clearTelegramChatRootShiftCompensation();
          return;
        }
        if (String(document.body.getAttribute("data-view") || "") !== "chat") {
          clearTelegramChatRootShiftCompensation();
          return;
        }
        var shiftPx = getTelegramChatRootShiftPx();
        var target =
          chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")
            ? convView
            : generalView && !generalView.classList.contains("chat-general-view--hidden")
              ? generalView
              : null;
        if (!telegramChatRuntime && hardChatTarget && target === generalView) {
          /* В PWA общий чат докует composer отдельным fixed-слоем; transform на всей view тащит вниз и шапку. */
          target = null;
          shiftPx = 0;
        }
        [generalView, convView].forEach(function (node) {
          if (!node || !node.style) return;
          if (node === target && shiftPx > 8) {
            try {
              node.style.setProperty("transform", "translateY(" + shiftPx + "px)", "important");
              node.style.setProperty("will-change", "transform");
            } catch (eTgShiftApply) {}
          } else {
            try {
              node.style.removeProperty("transform");
              node.style.removeProperty("will-change");
            } catch (eTgShiftIdle) {}
          }
        });
        window.__pokerTelegramChatRootShiftCompensationActive = !!(target && shiftPx > 8);
      }
      function ensureTelegramChatRootShiftCompensationBindings() {
        if (window.__pokerTelegramChatRootShiftCompensationBound) return;
        window.__pokerTelegramChatRootShiftCompensationBound = true;
        window.addEventListener(
          "scroll",
          function () {
            if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
            applyTelegramChatRootShiftCompensation();
          },
          true
        );
        window.addEventListener("resize", function () {
          if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
          applyTelegramChatRootShiftCompensation();
        });
        try {
          if (window.visualViewport && window.visualViewport.addEventListener) {
            window.visualViewport.addEventListener("resize", function () {
              if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
              applyTelegramChatRootShiftCompensation();
            });
            window.visualViewport.addEventListener("scroll", function () {
              if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
              applyTelegramChatRootShiftCompensation();
            });
          }
        } catch (eTgShiftBindVv) {}
      }
      function getTelegramMiniAppChatThreadFocusSession() {
        var session = window.__pokerChatTmaThreadFocusSession;
        if (!session || typeof session !== "object") {
          session = {
            focusAtMs: Number(window.__pokerChatKeyboardFocusAtMs) || Date.now(),
            lockedCover: 0,
            lastInnerHeight: window.innerHeight || 0,
            lastWinLoss: 0
          };
          window.__pokerChatTmaThreadFocusSession = session;
        }
        return session;
      }
      function shouldShowTelegramMiniAppChatThreadDebugOverlay() {
        return false;
      }
      function ensureTelegramMiniAppChatThreadDebugOverlay() {
        return null;
      }
      function hideTelegramMiniAppChatThreadDebugOverlay() {
        var existing = document.getElementById("chatTmaKeyboardDebug");
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        try {
          var genMetaHide = document.getElementById("chatGeneralHeaderRosterMeta");
          if (genMetaHide && genMetaHide.getAttribute("data-debug-owned") === "1") {
            genMetaHide.textContent = "";
            genMetaHide.hidden = true;
            genMetaHide.removeAttribute("data-debug-owned");
          }
        } catch (eDbgMetaHide) {}
        try {
          var convIdHide = document.getElementById("chatConvTitleId");
          if (convIdHide && convIdHide.getAttribute("data-debug-owned") === "1") {
            convIdHide.textContent = "—";
            convIdHide.removeAttribute("data-debug-owned");
          }
        } catch (eDbgConvHide) {}
      }
      function updateTelegramMiniAppChatThreadDebugOverlay(source, extra) {
        hideTelegramMiniAppChatThreadDebugOverlay();
      }
      function computeTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs) {
        var session = getTelegramMiniAppChatThreadFocusSession();
        var cap = Math.min(176, Math.max(64, Math.round(ih * 0.235)));
        var cover = 0;
        var haveCover = false;
        if (winLossTma >= 18) {
          cover = winLossTma;
          haveCover = true;
        } else if (session.lockedCover >= 18) {
          cover = session.lockedCover;
          haveCover = true;
        } else if (prevCover >= 18) {
          cover = prevCover;
          haveCover = true;
        } else if (focusAgeMs < 260 && tgDiffRaw >= 24) {
          cover = Math.round(tgDiffRaw * 0.52);
          haveCover = true;
        }
        if (!haveCover) return 0;
        if (cover > cap) cover = cap;
        if (cover < 0) cover = 0;
        if (session.lockedCover >= 18) {
          var ihDelta = Math.abs((session.lastInnerHeight || ih) - ih);
          var minLocked = Math.max(0, session.lockedCover - (ihDelta >= 18 ? 10 : 4));
          var maxLocked = Math.min(cap, session.lockedCover + (ihDelta >= 18 ? 14 : 6));
          if (cover < minLocked) cover = minLocked;
          if (cover > maxLocked) cover = maxLocked;
        }
        if (focusAgeMs > 0 && focusAgeMs < 1000 && prevCover >= 18) {
          var minCover = Math.max(0, prevCover - 4);
          var maxCover = Math.min(cap, prevCover + 6);
          if (cover < minCover) cover = minCover;
          if (cover > maxCover) cover = maxCover;
        }
        if (winLossTma >= 18) {
          session.lockedCover = cover;
          session.lastWinLoss = winLossTma;
          session.lastInnerHeight = ih;
        } else if (session.lockedCover < 18 && cover >= 18) {
          session.lockedCover = cover;
          session.lastInnerHeight = ih;
        }
        window.__pokerChatTmaThreadFocusSession = session;
        return cover;
      }
      function clampTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs) {
        return computeTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs);
      }
      function scheduleTelegramMiniAppChatThreadKeyboardSync(delayMs) {
        if (!isTelegramMiniAppChatThreadIos() || !isChatThreadComposerKeyboardDom()) return;
        var delay = Math.max(0, Number(delayMs) || 0);
        if (window.__pokerChatTmaThreadSyncTimer) {
          clearTimeout(window.__pokerChatTmaThreadSyncTimer);
          window.__pokerChatTmaThreadSyncTimer = null;
        }
        var run = function () {
          if (window.__pokerChatTmaThreadSyncRafPending) return;
          window.__pokerChatTmaThreadSyncRafPending = true;
          var raf = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          raf(function () {
            window.__pokerChatTmaThreadSyncRafPending = false;
            try {
              if (!document.body.classList.contains("chat-keyboard-open")) return;
              if (!isTelegramMiniAppChatThreadIos() || !isChatThreadComposerKeyboardDom()) return;
              syncTelegramMiniAppChatThreadKeyboard();
              scrollVisibleChatMessagesToBottom();
            } catch (eTmaSched) {}
          });
        };
        if (delay > 0) {
          window.__pokerChatTmaThreadSyncTimer = setTimeout(function () {
            window.__pokerChatTmaThreadSyncTimer = null;
            run();
          }, delay);
          return;
        }
        run();
      }
      /**
       * coverPx — высота полосы под visual viewport (клавиатура / IME), от низа layout viewport.
       * bottom = coverPx + getChatComposerKeyboardGapPx().
       */
      function applyChatThreadComposerKeyboardDockFromCover(coverPx, focusTarget) {
        collectChatOverscrollSnapshot("dock:enter", focusTarget, { cover: Math.max(0, Math.round(Number(coverPx) || 0)) });
        if (!isPokerIosPwaKeyboardRuntime() && hardDisableChatComposerViewportLift(document.activeElement, "dock:hard-disabled")) return;
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime() && !shouldUseTelegramChatThreadVisualViewportDock()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTgDockOff) {}
          return;
        }
        if (!isPokerIosPwaKeyboardRuntime() && (isPassiveTelegramIosChatThread() || shouldDisableTelegramIosChatKeyboardDock())) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (ePassiveDock) {}
          return;
        }
        var g = document.getElementById("chatGeneralInputArea");
        var p = document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null);
        if (!document.body.classList.contains("chat-keyboard-open") || isChatPhysicalKeyboardContext()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTk0) {}
          return;
        }
        if (!isChatThreadComposerKeyboardDom(focusTarget)) {
          collectChatOverscrollSnapshot("dock:skip-target", focusTarget, {
            cover: Math.max(0, Math.round(Number(coverPx) || 0))
          });
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTk1) {}
          return;
        }
        if (!isPokerIosPwaKeyboardRuntime() && shouldDisableTelegramIosChatKeyboardDock()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTmaFlow) {}
          try {
            updateTelegramMiniAppChatThreadDebugOverlay("apply-flow", { cover: 0, bottom: 0 });
          } catch (eDbgFlow) {}
          return;
        }
        if (maybeApplyCssOnlyIosPwaChatComposerDock(focusTarget, "apply")) {
          return;
        }
        var gap = getChatComposerKeyboardGapPx();
        var coverNum = Math.max(0, Math.round(Number(coverPx) || 0));
        try {
          if (
            coverNum < 96 &&
            !isTelegramChatRuntime() &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport() &&
            isChatThreadComposerKeyboardDom(focusTarget)
          ) {
            var ihFloorDock = window.innerHeight || 0;
            var baseFloorDock = Math.max(ihFloorDock, Number(window.__pokerChatInnerHBaseline) || 0);
            if (baseFloorDock > 260) coverNum = Math.max(coverNum, Math.round(baseFloorDock * 0.34));
          }
        } catch (ePwaDockFloorAlways) {}
        try {
          var earlyPwaCover = Number(window.__pokerChatPwaEarlyKeyboardCover) || 0;
          var earlyPwaAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          if (
            earlyPwaCover > 0 &&
            earlyPwaAge < 900 &&
            (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            try {
              if (clearPwaIosChatEarlyKeyboardFallbackIfViewportLive()) earlyPwaCover = 0;
            } catch (eClearEarlyDock) {}
          }
          if (
            earlyPwaCover > 0 &&
            earlyPwaAge < 900 &&
            (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            coverNum = Math.max(coverNum, earlyPwaCover);
          }
        } catch (ePwaEarlyCoverDock) {}
        var bottomPx = coverNum + gap;
        var pwaAccessoryInset = 0;
        var prevB = null;
        try {
          pwaAccessoryInset = getPwaChatThreadAccessoryInsetPx();
        } catch (ePwaDockAcc) {}
        try {
          var ihLim = window.innerHeight || 0;
          var isTgDock = isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime();
          var iosDock = typeof isIosLikeForChatViewport === "function" && isIosLikeForChatViewport();
          var focusAgeDock = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          var isPwaIosDockFinal =
            !isTgDock &&
            iosDock &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset();
          /*
           * Telegram iOS: не пересчитывать bottom из живого vv/tg здесь — syncPwaChatVisualViewportInset уже выбрал cover.
           * Второй пересчёт + сглаживание давали заметный «второй рывок» строки вверх.
           */
          if (isTgDock && iosDock && ihLim > 200) {
            var hardMaxTg = Math.min(148, Math.max(74, Math.round(ihLim * 0.18)));
            bottomPx = Math.min(hardMaxTg, coverNum + gap);
            if (focusAgeDock > 0 && focusAgeDock < 720) {
              var baseDock = Number(window.__pokerChatInnerHBaseline) || 0;
              var winLossDockFocus = baseDock > 260 && ihLim > 0 ? Math.max(0, Math.round(baseDock - ihLim)) : 0;
              if (winLossDockFocus >= 24) {
                bottomPx = Math.min(bottomPx, Math.max(74, Math.min(136, winLossDockFocus + Math.max(10, gap + 4))));
              }
            }
          } else if (ihLim > 280 && !isTgDock) {
            var bottomMax = Math.min(380, Math.max(200, Math.round(ihLim * 0.4)));
            if (bottomPx > bottomMax) bottomPx = bottomMax;
          } else if (ihLim > 200 && isTgDock && !iosDock) {
            var bottomMaxAnd = Math.min(380, Math.max(160, Math.round(ihLim * 0.44)));
            if (bottomPx > bottomMaxAnd) bottomPx = bottomMaxAnd;
          }
          if (isPwaIosDockFinal) {
            /*
             * iOS PWA: когда включён vv-dock, inline bottom сильнее CSS fallback.
             * Поэтому dock обязан сам держать композер над клавиатурой, иначе строка остаётся
             * у нижней кромки layout viewport и закрывается клавиатурой.
             */
            bottomPx = Math.max(bottomPx, coverNum + getChatComposerKeyboardGapPx());
          }
        } catch (eBm) {}
        try {
          prevB = window.__pokerChatLastAppliedDockBottom;
          var isPwaIosDock =
            (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport();
          var dockEps =
            isTelegramChatRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
              ? 12
              : 2;
          if (prevB != null && prevB > 0 && isPwaIosDock) {
            var focusAgePwaDock = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgePwaDock > 0 && focusAgePwaDock < 900 && bottomPx > prevB + 10) {
              bottomPx = prevB + 10;
            }
            if (bottomPx < 72 && focusAgePwaDock > 0 && focusAgePwaDock < 2200) {
              bottomPx = prevB;
            }
            if (focusAgePwaDock > 0 && focusAgePwaDock < 700 && bottomPx < prevB - 8) {
              bottomPx = prevB - 8;
            }
            if (focusAgePwaDock > 0 && focusAgePwaDock < 1400 && Math.abs(bottomPx - prevB) < 3) {
              bottomPx = prevB;
            }
          }
          if (
            prevB != null &&
            prevB > 0 &&
            Number(window.__pokerChatSendKeepFocusUntil || 0) > Date.now() &&
            bottomPx < prevB - 6
          ) {
            bottomPx = prevB;
          }
          if (
            prevB != null &&
            prevB > 0 &&
            isTelegramChatRuntime() &&
            !isPokerIosPwaKeyboardRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            var focusAgeGrow = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgeGrow > 0 && focusAgeGrow < 720 && bottomPx > prevB + 12) {
              bottomPx = prevB + 12;
            }
          }
          if (
            prevB != null &&
            prevB > 0 &&
            isTelegramChatRuntime() &&
            !isPokerIosPwaKeyboardRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            var focusAgeStab = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgeStab > 0 && focusAgeStab < 1200) {
              var minBottom = Math.max(0, prevB - 6);
              var maxBottom = prevB + 8;
              if (bottomPx < minBottom) bottomPx = minBottom;
              if (bottomPx > maxBottom) bottomPx = maxBottom;
            }
          }
          if (prevB != null && prevB > 0 && Math.abs(bottomPx - prevB) < dockEps) {
            bottomPx = prevB;
          } else {
            window.__pokerChatLastAppliedDockBottom = bottomPx;
          }
        } catch (eStabB) {}
        if (pwaAccessoryInset > 0) {
          try {
            var isPwaIosAcc =
              (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset() &&
              typeof isIosLikeForChatViewport === "function" &&
              isIosLikeForChatViewport();
            if (isPwaIosAcc) pwaAccessoryInset = 0;
          } catch (ePwaAccCap) {}
          bottomPx += Math.min(4, pwaAccessoryInset);
        }
        try {
          var mandatoryBottomOffset = getChatComposerMandatoryBottomOffsetPx();
          if (mandatoryBottomOffset >= 0 && bottomPx < mandatoryBottomOffset) bottomPx = mandatoryBottomOffset;
        } catch (eMandatoryBottom) {}
        try {
          window.__pokerChatThreadDockBottomCssPx = bottomPx;
        } catch (eDockPx) {}
        try {
          if (
            coverNum >= 260 &&
            coverNum <= 460 &&
            bottomPx >= 260 &&
            (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport() &&
            isChatThreadComposerKeyboardDom(focusTarget || document.activeElement)
          ) {
            var storeFocusAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            var storeFloor = getPwaIosChatComputedKeyboardCoverFloorPx();
            if (!(storeFocusAge > 0 && storeFocusAge < 700 && storeFloor > 0 && coverNum < storeFloor - 6)) {
              writeStoredPwaIosChatKeyboardCoverPx(coverNum);
            }
          }
        } catch (eStorePwaCover) {}
          try {
            updateTelegramMiniAppChatThreadDebugOverlay("apply", { cover: coverNum, bottom: bottomPx });
          } catch (eDbgApply) {}
        collectChatOverscrollSnapshot("dock:apply", {
          cover: coverNum,
          bottom: bottomPx
        });
        /*
         * Каждый sync вызывал stripChatInputAreaTransforms: снимались position/bottom и класс vv-dock — на кадр полоса
         * теряла fixed и визуально «прыгала». В TMA+iOS при том же табе обновляем только bottom.
         */
        var tabKey = "";
        if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
          tabKey = "g";
        } else if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
          tabKey = "p";
        }
        var target0 = tabKey === "g" ? g : tabKey === "p" ? p : null;
        if (!target0 && isPokerIosPwaKeyboardRuntime()) {
          try {
            var dockFocusNode = focusTarget || document.activeElement;
            target0 = dockFocusNode && dockFocusNode.closest ? dockFocusNode.closest(".chat-input-area") : null;
            if (target0) tabKey = target0 === g ? "g" : target0 === p ? "p" : "focus";
          } catch (ePwaFocusAreaDock) {}
        }
        var reuseFixedDock =
          !!tabKey &&
          target0 &&
          target0.classList.contains("chat-input-area--vv-dock") &&
          window.getComputedStyle(target0).position === "fixed" &&
          (
            (
              isTelegramChatRuntime() &&
              typeof isIosLikeForChatViewport === "function" &&
              isIosLikeForChatViewport() &&
              window.__pokerChatTmaDockTabKey === tabKey
            ) ||
            (
              (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset()
            )
          );
        try {
          if (reuseFixedDock) {
            target0.style.setProperty("bottom", bottomPx + "px", "important");
            window.__pokerChatThreadDockBottomCssPx = bottomPx;
            return;
          }
        } catch (eLightDock) {}
        stripChatInputAreaTransforms();
        var target = target0;
        if (!target) return;
        target.classList.add("chat-input-area--vv-dock");
        target.style.setProperty("position", "fixed", "important");
        target.style.setProperty("left", "0", "important");
        target.style.setProperty("right", "0", "important");
        target.style.setProperty("width", "100%", "important");
        target.style.setProperty("max-width", "100%", "important");
        target.style.setProperty("box-sizing", "border-box", "important");
        target.style.setProperty("z-index", "120", "important");
        target.style.setProperty("bottom", bottomPx + "px", "important");
        try {
          window.__pokerChatTmaDockTabKey = tabKey;
        } catch (eTkSet) {}
      }
      function shouldUseCssOnlyIosPwaChatComposerDock(focusTarget) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var target = focusTarget || document.activeElement || chatComposerEl;
          if (!isChatThreadComposerKeyboardDom(target) && chatComposerEl && isChatThreadComposerKeyboardDom(chatComposerEl)) {
            target = chatComposerEl;
          }
          return isChatThreadComposerKeyboardDom(target);
        } catch (eCssOnlyDockCheck) {
          return false;
        }
      }
      function isPwaChatManualFocusIntentActive(focusTarget) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var until = Number(window.__pokerChatManualFocusIntentUntil) || 0;
          if (until <= Date.now()) return false;
          var intentTarget = window.__pokerChatManualFocusIntentTarget || null;
          var target = focusTarget || document.activeElement || chatComposerEl || intentTarget;
          if (!target || !isChatThreadComposerKeyboardDom(target)) return false;
          if (intentTarget && intentTarget !== target) return false;
          return true;
        } catch (eManualIntentActive) {
          return false;
        }
      }
      function getCssOnlyIosPwaChatComposerBottomPx() {
        try {
          var now = Date.now();
          var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          var locked = Math.round(Number(window.__pokerChatIosPwaComposerBottomLockPx) || 0);
          if (locked > 0 && (!focusAt || now - focusAt < 2600)) return locked;
          var ih = window.innerHeight || 0;
          var base = Math.max(ih, Number(window.__pokerChatInnerHBaseline) || 0);
          try {
            var vv = window.visualViewport || null;
            if (vv) {
              var vvPack = Math.round((Number(vv.height) || 0) + (Number(vv.offsetTop) || 0));
              if (vvPack > 0) base = Math.max(base, vvPack);
            }
          } catch (eCssDockVvBase) {}
          try {
            var sw = window.screen && window.screen.width ? Number(window.screen.width) || 0 : 0;
            var sh = window.screen && window.screen.height ? Number(window.screen.height) || 0 : 0;
            var screenLong = Math.max(sw, sh);
            if (screenLong > 260 && screenLong < 1400) base = Math.max(base, screenLong);
          } catch (eCssDockScreenBase) {}
          if (base < 260) base = Math.max(260, ih || 0);
          /*
           * iOS PWA shows the system input accessory bar above the keyboard, but this
           * CSS-only dock intentionally keeps --chat-ios-accessory-inset disabled to
           * avoid the old double-keyboard jumps. Include that bar in the locked dock
           * point instead, so composer and feed stay in one coordinate system.
           */
          var accessoryLift = 48;
          try {
            var shortSideLift = Math.min(Number(window.screen && window.screen.width) || 0, Number(window.screen && window.screen.height) || 0);
            var longSideLift = Math.max(Number(window.screen && window.screen.width) || 0, Number(window.screen && window.screen.height) || 0, base);
            if (longSideLift >= 880) accessoryLift = 54;
            else if (shortSideLift > 0 && shortSideLift <= 375) accessoryLift = 46;
            if (base < 720) accessoryLift = Math.min(accessoryLift, 42);
          } catch (eCssDockAccessoryLift) {}
          var fineLift = 4;
          var minBottom = (base < 740 ? 220 : 238) + accessoryLift + fineLift;
          var maxBottom = (base > 900 ? 372 : 344) + accessoryLift + fineLift;
          var bottom = Math.round(base * 0.36) + accessoryLift + fineLift;
          bottom = Math.max(minBottom, Math.min(maxBottom, bottom));
          window.__pokerChatIosPwaComposerBottomLockPx = bottom;
          return bottom;
        } catch (eCssDockBottom) {
          return 0;
        }
      }
      function isIosPwaChatThreadKeyboardOpenConfirmed(focusTarget) {
        try {
          if (!shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) return false;
          var vv = window.visualViewport || null;
          var ih = window.innerHeight || 0;
          if (!vv || ih < 240) return false;
          var vvh = Number(vv.height) || 0;
          var offsetTop = Number(vv.offsetTop) || 0;
          if (vvh < 160) return false;
          var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
          var heightLoss = Math.max(0, Math.round(ih - vvh));
          var ratio = ih > 0 ? vvh / ih : 1;
          var base = Number(window.__pokerChatInnerHBaseline) || 0;
          var winLoss = base > 260 && ih > 0 ? Math.max(0, Math.round(base - ih)) : 0;
          return Math.max(belowVv, heightLoss, winLoss) >= 72 || ratio < 0.86;
        } catch (ePwaOpenConfirmed) {
          return false;
        }
      }
      function shouldApplyIosPwaChatComposerDockNow(focusTarget) {
        try {
          if (!shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) return false;
          if (!isIosPwaChatComposerLikelyActiveSession(focusTarget)) return false;
          var focusAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          if (isPwaChatManualFocusIntentActive(focusTarget)) {
            if (isIosPwaChatThreadKeyboardOpenConfirmed(focusTarget)) return focusAge >= 180;
            return focusAge > 620;
          }
          if (isIosPwaChatThreadKeyboardOpenConfirmed(focusTarget)) return focusAge >= 180;
          if (focusAge < 620) return false;
          return focusAge > 900;
        } catch (ePwaDockNow) {
          return false;
        }
      }
      function isIosPwaChatComposerLikelyActiveSession(focusTarget) {
        try {
          if (!focusTarget || !isChatThreadComposerKeyboardDom(focusTarget)) return false;
          if (document.activeElement === focusTarget) return true;
          if (isRecentIosPwaChatComposerUserDismiss()) return false;
          var active = document.activeElement || null;
          if (
            active &&
            active !== document.body &&
            active !== document.documentElement &&
            String(active.tagName || "").toUpperCase() !== "BODY" &&
            String(active.tagName || "").toUpperCase() !== "HTML"
          ) {
            var tag = String(active.tagName || "").toUpperCase();
            if ((tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") && active !== focusTarget) return false;
          }
          var focusAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          if (focusAge > 0 && focusAge < 3200 && (focusTarget === chatComposerEl || isChatThreadComposerKeyboardDom(focusTarget))) return true;
          return false;
        } catch (ePwaLikelyActive) {
          return false;
        }
      }
      function maybeApplyCssOnlyIosPwaChatComposerDock(focusTarget, label) {
        try {
          if (!shouldApplyIosPwaChatComposerDockNow(focusTarget)) {
            collectChatOverscrollSnapshot("css-only-pwa-dock-wait:" + (label || ""), focusTarget);
            return false;
          }
          return applyCssOnlyIosPwaChatComposerDock(focusTarget, label);
        } catch (eMaybeCssOnlyDock) {
          return false;
        }
      }
      function applyCssOnlyIosPwaChatComposerDock(focusTarget, label) {
        try {
          if (!shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) return false;
          var focusNode = focusTarget || document.activeElement || chatComposerEl;
          try {
            if (
              (!focusNode || !focusNode.closest || !focusNode.closest(".chat-input-area")) &&
              chatComposerEl &&
              isChatThreadComposerKeyboardDom(chatComposerEl)
            ) {
              focusNode = chatComposerEl;
            }
          } catch (eCssOnlyFocusFallback) {}
          if (!isIosPwaChatComposerLikelyActiveSession(focusNode)) return false;
          var area = focusNode && focusNode.closest ? focusNode.closest(".chat-input-area") : null;
          if (!area) return false;
          var bottomPx = getCssOnlyIosPwaChatComposerBottomPx();
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
          try {
            document.documentElement.style.setProperty("--chat-vv-inset", "0px");
            if (bottomPx > 0) document.documentElement.style.setProperty("--chat-ios-pwa-thread-composer-bottom", bottomPx + "px");
            document.documentElement.style.removeProperty("--chat-keyboard-fallback-inset");
            document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
          } catch (eCssOnlyVars) {}
          area.classList.add("chat-input-area--vv-dock");
          area.style.removeProperty("position");
          area.style.removeProperty("left");
          area.style.removeProperty("right");
          area.style.removeProperty("width");
          area.style.removeProperty("max-width");
          area.style.removeProperty("box-sizing");
          area.style.removeProperty("z-index");
          area.style.removeProperty("bottom");
          area.style.removeProperty("top");
          area.style.removeProperty("margin-bottom");
          area.style.removeProperty("transform");
          try {
            area.style.removeProperty("-webkit-transform");
          } catch (eCssOnlyWebkitTransform) {}
          try {
            var cssBottom = bottomPx || (window.getComputedStyle ? Math.round(parseFloat(getComputedStyle(area).bottom) || 0) : 0);
            window.__pokerChatThreadDockBottomCssPx = cssBottom;
            window.__pokerChatLastAppliedDockBottom = cssBottom;
          } catch (eCssOnlyBottom) {
            window.__pokerChatThreadDockBottomCssPx = 0;
          }
          if (!window.__pokerChatKeyboardFocusAtMs) window.__pokerChatKeyboardFocusAtMs = Date.now();
          var cssOnlyFocusAge = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          if (cssOnlyFocusAge < 900 && !isIosPwaChatThreadViewportClearlyClosed(focusNode)) {
            window.__pokerChatKeyboardOpeningUntil = Math.max(Number(window.__pokerChatKeyboardOpeningUntil) || 0, Date.now() + 900);
          }
          try {
            updateChatMessagesKeyboardPad();
          } catch (eCssOnlyPad) {}
          collectChatOverscrollSnapshot("css-only-pwa-dock:" + (label || ""), focusNode);
          return true;
        } catch (eCssOnlyDock) {
          return false;
        }
      }
      function forceIosPwaChatTextareaDock(textarea, label) {
        try {
          if (!textarea || !textarea.closest) return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset())
          ) return false;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport())
          ) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          var area = textarea.closest(".chat-input-area");
          if (!area) return false;
          if (applyCssOnlyIosPwaChatComposerDock(textarea, label || "force")) {
            ensurePwaChatDockWatchdog(textarea);
            return true;
          }
          var ih = window.innerHeight || 0;
          var base = Math.max(ih, Number(window.__pokerChatInnerHBaseline) || 0);
          var cover = 0;
          var vv = window.visualViewport || null;
          if (vv && ih > 0) {
            cover = Math.max(cover, Math.round(ih - (Number(vv.offsetTop) || 0) - (Number(vv.height) || 0)));
          }
          if (base > 260 && ih > 0) cover = Math.max(cover, Math.round(base - ih));
          if (cover < 96) cover = Math.max(cover, Math.round(Math.max(base, ih || 0) * 0.34));
          var bottom = Math.max(72, Math.round(cover + getChatComposerKeyboardGapPx()));
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
          document.documentElement.style.setProperty("--chat-keyboard-fallback-inset", cover + "px");
          area.classList.add("chat-input-area--vv-dock");
          area.style.setProperty("position", "fixed", "important");
          area.style.setProperty("left", "0", "important");
          area.style.setProperty("right", "0", "important");
          area.style.setProperty("width", "100%", "important");
          area.style.setProperty("max-width", "100%", "important");
          area.style.setProperty("box-sizing", "border-box", "important");
          area.style.setProperty("z-index", "2147483000", "important");
          area.style.setProperty("bottom", bottom + "px", "important");
          if (!window.__pokerChatKeyboardFocusAtMs) window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = Date.now() + 1200;
          window.__pokerChatThreadDockBottomCssPx = bottom;
          window.__pokerChatLastAppliedDockBottom = bottom;
          ensurePwaChatDockWatchdog(textarea);
          collectChatOverscrollSnapshot("force-pwa-dock:" + (label || ""), textarea, { cover: cover, bottom: bottom });
          return true;
        } catch (eForcePwaDock) {
          return false;
        }
      }
      function ensurePwaChatDockWatchdog(focusTarget) {
        try {
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset())
          ) return;
          if (
            !isPokerIosPwaKeyboardRuntime() &&
            (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport())
          ) return;
          if (!isChatThreadComposerKeyboardDom(focusTarget)) return;
          window.__pokerChatPwaDockWatchdogUntil = Date.now() + 2800;
          if (window.__pokerChatPwaDockWatchdogTimer) return;
          window.__pokerChatPwaDockWatchdogTimer = setInterval(function () {
            try {
              if (Date.now() > (Number(window.__pokerChatPwaDockWatchdogUntil) || 0)) {
                clearInterval(window.__pokerChatPwaDockWatchdogTimer);
                window.__pokerChatPwaDockWatchdogTimer = null;
                return;
              }
              if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return;
              if (!document.body.classList.contains("chat-keyboard-open")) return;
              var active = document.activeElement;
              if (!isChatThreadComposerKeyboardDom(active || focusTarget)) return;
              if (shouldUseCssOnlyIosPwaChatComposerDock(active || focusTarget)) {
                if (finalizeIosPwaChatThreadClosedKeyboard(active || focusTarget, "watchdog")) return;
                maybeApplyCssOnlyIosPwaChatComposerDock(active || focusTarget, "watchdog");
                return;
              }
              var targetArea =
                chatActiveTab === "personal"
                  ? document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null)
                  : document.getElementById("chatGeneralInputArea");
              if (!targetArea) return;
              var bottom = Math.round(Number(window.__pokerChatThreadDockBottomCssPx) || Number(window.__pokerChatLastAppliedDockBottom) || 0);
              if (bottom < 72) return;
              var cs = window.getComputedStyle ? getComputedStyle(targetArea) : null;
              var currentBottom = cs ? Math.round(parseFloat(cs.bottom) || 0) : 0;
              var needsRepair =
                !targetArea.classList.contains("chat-input-area--vv-dock") ||
                (cs && cs.position !== "fixed") ||
                currentBottom < Math.max(48, bottom - 24);
              if (!needsRepair) return;
              targetArea.classList.add("chat-input-area--vv-dock");
              targetArea.style.setProperty("position", "fixed", "important");
              targetArea.style.setProperty("left", "0", "important");
              targetArea.style.setProperty("right", "0", "important");
              targetArea.style.setProperty("width", "100%", "important");
              targetArea.style.setProperty("max-width", "100%", "important");
              targetArea.style.setProperty("box-sizing", "border-box", "important");
              targetArea.style.setProperty("z-index", "120", "important");
              targetArea.style.setProperty("bottom", bottom + "px", "important");
              collectChatOverscrollSnapshot("pwa-dock-watchdog", { bottom: bottom, current: currentBottom });
            } catch (ePwaDockWatchdogTick) {}
          }, 80);
        } catch (ePwaDockWatchdog) {}
      }
      /**
       * Telegram Mini App: общий/личный тред с фокусом на композере — отдельный конвейер без visualViewport.
       * Высота перекрытия: viewportStableHeight − viewportHeight; резервы winLoss / lastGood; dock + pad.
       */
      function syncTelegramMiniAppChatThreadKeyboard() {
        return false;
      }
      function resetChatVisualViewportState(options) {
        var opts = options || {};
        var doc = document.documentElement;
        hideTelegramMiniAppChatThreadDebugOverlay();
        doc.style.removeProperty("--chat-vv-inset");
        doc.style.removeProperty("--chat-keyboard-fallback-inset");
        doc.style.removeProperty("--chat-ios-pwa-thread-composer-bottom");
        doc.style.removeProperty("--chat-ios-accessory-inset");
        if (opts.clearPad) clearChatMessagesKeyboardPad();
        if (opts.stripComposer) stripChatInputAreaTransforms();
        if (opts.closeKeyboardState) setChatKeyboardOpenClasses(false);
        if (opts.updateBaseline) {
          try {
            var hIdle = window.innerHeight || 0;
            if (hIdle > 200) window.__pokerChatInnerHBaseline = hIdle;
          } catch (eIdleH) {}
        }
      }
      function applyChatVisualViewportFallbackWithoutVv(doc) {
        if (enforceTelegramChatDefaultComposerState()) return;
        var dvNoVv = String(document.body.getAttribute("data-view") || "");
        var useThreadDockFallback =
          isChatThreadComposerKeyboardDom() && (!isTelegramChatRuntime() || shouldUseTelegramChatThreadVisualViewportDock());
        var ihFb = window.innerHeight || 0;
        var capFb = Math.min(520, Math.round(ihFb * 0.55));
        var baseFb = Number(window.__pokerChatInnerHBaseline) || 0;
        var lossFb = baseFb > 260 && ihFb > 0 ? Math.max(0, Math.round(baseFb - ihFb)) : 0;
        var insetFb = Math.min(capFb, Math.max(140, Math.round(lossFb * 0.92)));
        if (insetFb < 170) insetFb = Math.min(capFb, Math.max(insetFb, Math.round(ihFb * 0.36)));
        if (chatComposerEl && document.activeElement === chatComposerEl) {
          insetFb = Math.min(capFb, Math.max(insetFb, Math.round(ihFb * 0.38)));
        }
        if (dvNoVv === "profile") {
          doc.style.setProperty("--chat-vv-inset", insetFb + "px");
          if (isIosLikeForChatViewport()) doc.style.setProperty("--chat-ios-accessory-inset", "44px");
          else doc.style.removeProperty("--chat-ios-accessory-inset");
          updateChatMessagesKeyboardPad();
          return;
        }
        if (dvNoVv === "chat") {
          if (useThreadDockFallback) {
            doc.style.setProperty("--chat-vv-inset", "0px");
            doc.style.removeProperty("--chat-ios-accessory-inset");
            var coverNv = baseFb > 260 && ihFb > 0 ? Math.max(0, Math.round(baseFb - ihFb)) : 0;
            applyChatThreadComposerKeyboardDockFromCover(coverNv);
          } else {
            doc.style.setProperty("--chat-vv-inset", insetFb + "px");
            if (isIosLikeForChatViewport()) doc.style.setProperty("--chat-ios-accessory-inset", "44px");
            else doc.style.removeProperty("--chat-ios-accessory-inset");
          }
          updateChatMessagesKeyboardPad();
        }
      }
      function computeChatVisualViewportMetrics() {
        var vv = window.visualViewport;
        var vvh = Number(vv.height) || 0;
        var ih = window.innerHeight || 0;
        var offsetTop = Number(vv.offsetTop) || 0;
        var heightLoss = Math.max(0, Math.round(ih - vvh));
        var overlap = Math.max(0, Math.round(ih - vvh - offsetTop));
        if (overlap < 20 && heightLoss > overlap + 6) {
          overlap = Math.max(overlap, Math.round(heightLoss - Math.max(0, offsetTop)));
        }
        if (overlap < 8 && vvh + 24 < ih) {
          overlap = Math.max(overlap, heightLoss);
        }
        return { vv: vv, vvh: vvh, ih: ih, offsetTop: offsetTop, heightLoss: heightLoss, overlap: overlap };
      }
      function syncPwaChatVisualViewportInset() {
        logChatKeyboardDebug("vv-sync-enter");
        collectChatOverscrollSnapshot("vv:enter");
        var doc = document.documentElement;
        if (hardDisableChatComposerViewportLift(document.activeElement, "vv:hard-disabled")) {
          logChatKeyboardDebug("vv-sync-hard-disabled");
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isTelegramChatRuntime() && !shouldUseTelegramChatThreadVisualViewportDock()) {
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          stripChatInputAreaTransforms();
          clearTelegramChatRootShiftCompensation();
          applyTelegramChatRootShiftCompensation();
          logChatKeyboardDebug("vv-sync-tg-hardoff");
          collectChatOverscrollSnapshot("vv:tg-hardoff");
          return;
        }
        if (isPassiveTelegramIosChatThread() || shouldDisableTelegramIosChatKeyboardDock()) {
          resetChatVisualViewportState({ clearPad: true, stripComposer: true, closeKeyboardState: true });
          return;
        }
        if (shouldUseNativeTelegramIosChatComposerFlow()) {
          resetChatVisualViewportState({ clearPad: true, stripComposer: true });
          return;
        }
        var cssOnlyTarget = document.activeElement || chatComposerEl;
        if (!document.body.classList.contains("chat-keyboard-open")) {
          if (
            shouldUseCssOnlyIosPwaChatComposerDock(cssOnlyTarget) &&
            (isIosPwaChatComposerOpeningHoldActive(cssOnlyTarget) || isIosPwaChatComposerLikelyActiveSession(cssOnlyTarget))
          ) {
            maybeApplyCssOnlyIosPwaChatComposerDock(cssOnlyTarget, "vv-sync-opening-no-class");
            return;
          }
          resetChatVisualViewportState({ stripComposer: true, updateBaseline: true });
          return;
        }
        if (shouldUseCssOnlyIosPwaChatComposerDock(cssOnlyTarget)) {
          if (finalizeIosPwaChatThreadClosedKeyboard(cssOnlyTarget, "vv-sync-css-only")) return;
          maybeApplyCssOnlyIosPwaChatComposerDock(cssOnlyTarget, "vv-sync-css-only");
          return;
        }
        try {
          if (syncTelegramMiniAppChatThreadKeyboard()) return;
        } catch (eTmaSync) {}
        /* Раньше при !visualViewport сразу снимали переменные — при открытой клавиатуре поле оставалось под клавишами. */
        if (!window.visualViewport) {
          applyChatVisualViewportFallbackWithoutVv(doc);
          return;
        }
        if (!shouldUseChatVisualViewportLift()) {
          resetChatVisualViewportState({ stripComposer: true });
          return;
        }
        var metrics = computeChatVisualViewportMetrics();
        var vv = metrics.vv;
        var vvh = metrics.vvh;
        var ih = metrics.ih;
        if (!ih) return;
        var offsetTop = metrics.offsetTop;
        var heightLoss = metrics.heightLoss;
        var overlap = metrics.overlap;
        var tg = isTelegramChatRuntime();
        var tw = tg && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var useThreadDock =
          isChatThreadComposerKeyboardDom() && (!tg || shouldUseTelegramChatThreadVisualViewportDock());
        /* Telegram: innerHeight иногда совпадает с visualViewport — overlap≈0; stable−height даёт высоту клавиатуры. */
        if (tg && tw) {
          var tgvH = Number(tw.viewportHeight);
          var tgvS = Number(tw.viewportStableHeight);
          if (tgvS > 0 && tgvH > 0 && tgvS > tgvH + 8) {
            var dTg = Math.round(tgvS - tgvH);
            overlap = Math.max(overlap, dTg);
            heightLoss = Math.max(heightLoss, dTg);
          }
        }
        var cap = Math.min(480, Math.round(ih * 0.52));
        if (isIosLikeForChatViewport()) cap = Math.min(520, Math.round(ih * 0.58));
        var rawInset = Math.max(0, Math.min(overlap, cap));
        /* iOS (в т.ч. iPhone 15): innerHeight/vv часто недооценивают клавиатуру — меньший factor оставляет зазор над клавишами. */
        var factor = tg ? 0.84 : 0.88;
        if (isIosLikeForChatViewport()) factor = tg ? 0.9 : 0.93;
        var inset = Math.max(0, Math.round(rawInset * factor));
        var vvRatio = vvh / ih;
        if (vvRatio > 0 && vvRatio < 0.88 && ih > 0) {
          var fromVv = Math.round((ih - vvh) * 0.82);
          inset = Math.max(inset, Math.min(cap, fromVv));
        }
        if (heightLoss >= 40) {
          inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * 0.78)));
        }
        if (vvRatio > 0 && vvRatio < 0.8 && heightLoss >= 48 && inset < 120) {
          inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * (tg ? 0.58 : 0.65))));
        }
        /* iOS: accessory bar + WKWebView недооценивают overlap — доп. подъём (в PWA без TG accessory не дублируем с --chat-ios-accessory-inset). */
        if (isIosLikeForChatViewport()) {
          var iosBoost = tg ? 40 : 46;
          /* PWA: iosBoost=0 + отключённый accessory оставляли поле под клавиатурой; небольшой boost + --chat-ios-accessory-inset (см. applyChatIosAccessoryInsetFromViewport). */
          if (pokerPwaStandaloneForKeyboardInset() && !tg) iosBoost = 20;
          inset = Math.min(cap, inset + iosBoost);
        }
        /*
         * Android (Infinix/XOS и др.): innerHeight падает при клавиатуре, а visualViewport.height остаётся ≈ innerHeight — overlap≈0.
         * Базовая высота — в момент focus (onChatInputFocus) и при закрытой клавиатуре (ветка return выше).
         */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0 && !isIosLikeForChatViewport()) {
          try {
            var baseH = Number(window.__pokerChatInnerHBaseline) || 0;
            var curH = window.innerHeight || 0;
            if (baseH > 260 && curH > 0) {
              var winLoss = Math.round(baseH - curH);
              if (winLoss > 72) {
                var fromWin = Math.min(cap, Math.round(winLoss * 0.92));
                inset = Math.max(inset, fromWin);
              }
            }
          } catch (eAndKb) {}
        }
        /*
         * iOS/PWA (в т.ч. Safari WKWebView): при открытой клавиатуре vv иногда даёт overlap≈0, iosBoost для standalone обнулён —
         * --chat-vv-inset остаётся 0, поле под клавиатурой. Baseline innerHeight в момент focus + падение высоты даёт оценку клавиатуры (без дубля с TG API).
         */
        if (isIosLikeForChatViewport() && !tg) {
          try {
            var baseIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var curIh = window.innerHeight || 0;
            if (baseIh > 260 && curIh > 0) {
              var winLossIh = Math.round(baseIh - curIh);
              if (winLossIh > 64) {
                var fromWinIh = Math.min(cap, Math.round(winLossIh * 0.88));
                inset = Math.max(inset, fromWinIh);
              }
            }
          } catch (eIosIh) {}
        }
        /* Экран чата: vv иногда даёт overlap≈0 и heightLoss≈0 — без фокуса композера kbLikely ложен и поле под клавиатурой. */
        if (String(document.body.getAttribute("data-view") || "") === "chat") {
          var composerKb = chatComposerEl && document.activeElement === chatComposerEl;
          var findDlgEl = document.getElementById("chatFindByIdInputDialogs");
          var findDlgKb = !!(findDlgEl && document.activeElement === findDlgEl);
          var findByIdEl = document.getElementById("chatFindByIdInput");
          var findByIdKb = !!(findByIdEl && document.activeElement === findByIdEl);
          var kbLikely =
            composerKb ||
            findDlgKb ||
            findByIdKb ||
            heightLoss > 48 ||
            (vvh > 0 && ih > 0 && vvh + 100 < ih);
          if (kbLikely) {
            var softFloor = Math.min(cap, Math.max(150, Math.round(ih * 0.32)));
            if (inset < 110) {
              inset = Math.max(inset, softFloor);
            } else if (isIosLikeForChatViewport() && inset < 140 && heightLoss > 88) {
              inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * 0.88)));
            }
            if ((composerKb || findDlgKb || findByIdKb) && inset < Math.min(cap, Math.max(200, Math.round(ih * 0.36)))) {
              inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.38)));
            }
          }
        }
        if (String(document.body.getAttribute("data-view") || "") === "profile") {
          var aeProf = document.activeElement;
          var profRootKb = document.querySelector('.view[data-view="profile"]');
          var profKb = !!(
            aeProf &&
            profRootKb &&
            profRootKb.contains(aeProf) &&
            (aeProf.tagName === "INPUT" || aeProf.tagName === "TEXTAREA") &&
            aeProf.id !== "profileAvatarInput"
          );
          if (profKb) {
            var softFloorProf = Math.min(cap, Math.max(150, Math.round(ih * 0.32)));
            if (inset < 110) inset = Math.max(inset, softFloorProf);
            if (inset < Math.min(cap, Math.max(200, Math.round(ih * 0.36)))) {
              inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.36)));
            }
          }
        }
        var coverPxDock = Math.max(0, Math.round(ih - offsetTop - vvh));
        coverPxDock = Math.max(coverPxDock, overlap);
        if (tg && tw) {
          var tgvHd = Number(tw.viewportHeight);
          var tgvSd = Number(tw.viewportStableHeight);
          if (tgvSd > 0 && tgvHd > 0 && tgvSd > tgvHd + 8) {
            coverPxDock = Math.max(coverPxDock, Math.round(tgvSd - tgvHd));
          }
        }
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0 && !isIosLikeForChatViewport()) {
          try {
            var baseHd = Number(window.__pokerChatInnerHBaseline) || 0;
            var curHd = window.innerHeight || 0;
            if (baseHd > 260 && curHd > 0) {
              var winLossD = Math.round(baseHd - curHd);
              if (winLossD > 48) coverPxDock = Math.max(coverPxDock, winLossD);
            }
          } catch (eDockAnd) {}
        }
        /* iOS: падение innerHeight относительно baseline — и для PWA, и для Telegram; иначе при глючном vv только max() раздувает cover */
        if (isIosLikeForChatViewport()) {
          try {
            var baseId = Number(window.__pokerChatInnerHBaseline) || 0;
            var curId = window.innerHeight || 0;
            if (baseId > 260 && curId > 0) {
              var winLossId = Math.round(baseId - curId);
              if (winLossId > 48) coverPxDock = Math.max(coverPxDock, winLossId);
            }
          } catch (eDockIos) {}
        }
        if (chatComposerEl && document.activeElement === chatComposerEl && coverPxDock < 72 && ih > 0 && vvh > 0) {
          coverPxDock = Math.max(coverPxDock, heightLoss);
        }
        if (useThreadDock) {
          try {
            clearPwaIosChatEarlyKeyboardFallbackIfViewportLive();
          } catch (eClearEarlyBeforeDock) {}
          /*
           * iOS PWA: в standalone/WK visualViewport и innerHeight иногда схлопываются вместе,
           * raw cover остаётся около 0, хотя inset выше уже распознал открытую клавиатуру.
           * Для thread-composer используем этот inset как страховку, иначе полоса не поднимается вовсе.
           */
          if (
            !tg &&
            isIosLikeForChatViewport() &&
            pokerPwaStandaloneForKeyboardInset() &&
            chatComposerEl &&
            document.activeElement === chatComposerEl
          ) {
            var focusAgePwaFloor = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            var baseFloorIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var winLossFloor = baseFloorIh > 260 && ih > 0 ? Math.max(0, Math.round(baseFloorIh - ih)) : 0;
            var pwaThreadDockFloor = Math.max(0, Math.round(inset));
            if (focusAgePwaFloor > 0 && focusAgePwaFloor < 420) {
              if (winLossFloor > 32) pwaThreadDockFloor = Math.max(0, Math.round(winLossFloor));
              else pwaThreadDockFloor = Math.max(0, Math.round(Math.min(inset, heightLoss)));
            }
            if (pwaThreadDockFloor >= 96 && coverPxDock < pwaThreadDockFloor) {
              coverPxDock = pwaThreadDockFloor;
            }
          }
          /* TMA + тред: syncTelegramMiniAppChatThreadKeyboard() в начале sync — без дубля здесь. */
          /*
           * iOS: взрыв vv подрезаем относительно winLoss. Пошаговое уменьшение cover убрано — давало 2 видимых шага
           * «выше нормы → вниз → вниз». Верхняя граница от падения innerHeight: первые кадры vv часто раздувают cover.
           */
          if (isIosLikeForChatViewport() && !isChatPhysicalKeyboardContext()) {
            try {
              var rawVvGap = Math.max(0, Math.round(ih - offsetTop - vvh));
              var bSt = Number(window.__pokerChatInnerHBaseline) || 0;
              var cSt = window.innerHeight || 0;
              var winSt = bSt > 260 && cSt > 0 ? Math.max(0, Math.round(bSt - cSt)) : 0;
              if (winSt > 70 && rawVvGap > winSt + 55) {
                var capFromWin = Math.max(winSt + 32, winSt + Math.round((rawVvGap - winSt) * 0.2));
                coverPxDock = Math.min(coverPxDock, capFromWin);
              }
              if (winSt > 72) {
                var gapKb = Math.round(getChatComposerKeyboardGapPx());
                var slackTop =
                  tg
                    ? Math.max(36, gapKb + 28)
                    : Math.max(44, gapKb + 26);
                if (coverPxDock > winSt + slackTop) coverPxDock = winSt + slackTop;
              }
            } catch (eDockStab) {}
          }
          if (
            !tg &&
            isIosLikeForChatViewport() &&
            pokerPwaStandaloneForKeyboardInset() &&
            chatComposerEl &&
            document.activeElement === chatComposerEl
          ) {
            try {
              var pwaMinCover = Math.max(0, Math.round(inset - getPwaChatThreadAccessoryInsetPx()));
              if (pwaMinCover >= 72 && coverPxDock < pwaMinCover) coverPxDock = pwaMinCover;
              var pwaEarlyCoverFloor = getPwaIosChatEarlyKeyboardCoverPx();
              var pwaEarlyAgeFloor = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
              if (
                pwaEarlyCoverFloor >= 96 &&
                pwaEarlyAgeFloor < 260 &&
                coverPxDock < pwaEarlyCoverFloor &&
                !clearPwaIosChatEarlyKeyboardFallbackIfViewportLive()
              ) {
                coverPxDock = pwaEarlyCoverFloor;
              }
            } catch (ePwaCoverFloor) {}
          }
          /*
           * TG iOS / WKWebView: при наборе vv.height иногда кратковременно сильно занижен → ih - offsetTop - vvh
           * даёт сотни пикселей → fixed bottom огромный → полоса ввода в центре экрана над клавиатурой.
           * Потолок ~52% ih (с запасом под клавиатуру + accessory), не ниже 200px.
           */
          if (!isChatPhysicalKeyboardContext() && ih > 280) {
            var ihRefDock = Math.max(ih, Number(window.__pokerChatInnerHBaseline) || 0);
            if (ihRefDock < 320) ihRefDock = ih;
            var twCap = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            var tgKbHint = 0;
            if (tg && twCap) {
              var tghC = Number(twCap.viewportHeight);
              var tgsC = Number(twCap.viewportStableHeight);
              if (tgsC > 0 && tghC > 0 && tgsC > tghC + 12) {
                tgKbHint = Math.round(tgsC - tghC);
              }
            }
            var winLossDock =
              Number(window.__pokerChatInnerHBaseline) > 260 && ih > 0
                ? Math.max(0, Math.round(Number(window.__pokerChatInnerHBaseline) - ih))
                : 0;
            var pctCap = isIosLikeForChatViewport() ? 0.36 : 0.4;
            var coverDockCap = Math.min(340, Math.max(140, Math.round(ihRefDock * pctCap)));
            if (tgKbHint > 48) {
              coverDockCap = Math.min(coverDockCap, Math.max(140, tgKbHint + 32));
            }
            if (winLossDock > 64) {
              coverDockCap = Math.min(coverDockCap, Math.max(140, winLossDock + 36));
            }
            if (coverPxDock > coverDockCap) coverPxDock = coverDockCap;
          }
          doc.style.setProperty("--chat-vv-inset", "0px");
          doc.style.removeProperty("--chat-ios-accessory-inset");
          applyChatThreadComposerKeyboardDockFromCover(coverPxDock);
        } else {
          doc.style.setProperty("--chat-vv-inset", inset + "px");
          applyChatIosAccessoryInsetFromViewport();
        }
        if (document.body.classList.contains("chat-keyboard-open")) updateChatMessagesKeyboardPad();
        collectChatOverscrollSnapshot("vv:exit", {
          inset: inset,
          cover: coverPxDock,
          tg: tg ? 1 : 0,
          threadDock: useThreadDock ? 1 : 0
        });
      }
      window.__pokerSyncPwaChatVisualViewportInset = syncPwaChatVisualViewportInset;
      try {
        if (!window.__pokerChatTmaViewportEvAttached) {
          var twVp = window.Telegram && window.Telegram.WebApp;
          if (twVp && typeof twVp.onEvent === "function") {
            window.__pokerChatTmaViewportEvAttached = true;
            twVp.onEvent("viewportChanged", function () {
              try {
                if (!document.body.classList.contains("chat-keyboard-open")) return;
                if (isTelegramMiniAppChatThreadIos() && isChatThreadComposerKeyboardDom()) {
                  scheduleTelegramMiniAppChatThreadKeyboardSync(0);
                  return;
                }
                syncPwaChatVisualViewportInset();
              } catch (eVpCh) {}
            });
          }
        }
      } catch (eVpAtt) {}
      var viewportResizeScrollHandler = null;
      var chatWindowResizeHandler = null;
      window.__pokerChatDetachVisualViewportListeners = function () {
        try {
          if (window.__pokerChatVvInsetDebounceTimer) {
            clearTimeout(window.__pokerChatVvInsetDebounceTimer);
            window.__pokerChatVvInsetDebounceTimer = null;
          }
        } catch (eDebDet) {}
        if (
          viewportResizeScrollHandler &&
          typeof window.visualViewport !== "undefined" &&
          window.visualViewport.removeEventListener
        ) {
          try {
            window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          } catch (eVvDet) {}
          viewportResizeScrollHandler = null;
        }
        if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWinDet) {}
          chatWindowResizeHandler = null;
        }
      };
      function onChatInputFocus(focusTarget) {
        logChatKeyboardDebug("focus", focusTarget && focusTarget.id ? focusTarget.id : "");
        collectChatOverscrollSnapshot("focus:start", focusTarget);
        if (hardDisableChatComposerViewportLift(focusTarget, "focus:hard-disabled")) return;
        if (enforceTelegramChatDefaultComposerState()) return;
        markPwaChatKeyboardOpenIntent(focusTarget, "focus");
        if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime() && !shouldUseTelegramChatThreadVisualViewportDock(focusTarget)) {
          try {
            clearPendingChatKeyboardDismissTimers();
            resetChatKeyboardDockRuntimeState();
            window.__pokerChatKeyboardFocusAtMs = Date.now();
          } catch (eTgFocusReset) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTgFocusDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            hardResetTelegramChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTgFocusClear) {}
          try {
            ensureTelegramChatRootShiftCompensationBindings();
            applyTelegramChatRootShiftCompensation();
            setTimeout(applyTelegramChatRootShiftCompensation, 60);
            setTimeout(applyTelegramChatRootShiftCompensation, 180);
          } catch (eTgShiftFocus) {}
          collectChatOverscrollSnapshot("focus:telegram-native", focusTarget);
          return;
        }
        try {
          if (typeof attachTelegramMiniAppChatThreadRootScrollLock === "function") {
            attachTelegramMiniAppChatThreadRootScrollLock();
          }
        } catch (eRootLockOnFocus) {}
        if (isTelegramMiniAppChatThreadIos()) {
          setTelegramIosKeyboardRootLock(true);
          attachTelegramIosChatInputAreaDockGuard();
        }
        updateChatKeyboardInnerHeightBaseline();
        if (isChatPhysicalKeyboardContext()) {
          var elDesk = getVisibleMessagesEl();
          if (elDesk) {
            requestAnimationFrame(function () {
              try {
                elDesk.scrollTop = elDesk.scrollHeight;
              } catch (eSc) {}
            });
          }
          collectChatOverscrollSnapshot("focus:physicalKeyboard", focusTarget);
          return;
        }
        if (shouldDisableTelegramIosChatKeyboardDock(focusTarget) || shouldUseNativeTelegramIosChatComposerFlow(focusTarget)) {
          try {
            resetChatKeyboardDockRuntimeState();
            window.__pokerChatKeyboardFocusAtMs = Date.now();
          } catch (eTmaPassive) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTmaDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTmaClr) {}
          try {
            var visibleMessagesNative = getVisibleMessagesEl();
            if (visibleMessagesNative && chatMessagesNearBottom(visibleMessagesNative, CHAT_SCROLL_BOTTOM_NEAR_PX)) {
              visibleMessagesNative.scrollTop = visibleMessagesNative.scrollHeight;
            }
          } catch (eTmaNativeScroll) {}
          collectChatOverscrollSnapshot("focus:nativeTgFlow", focusTarget);
          return;
        }
        var deferIosPwaThreadKeyboardOpenClass = false;
        var focusBottomMessagesEl = null;
        var shouldFollowChatBottomOnFocus = false;
        try {
          focusBottomMessagesEl = getVisibleMessagesEl();
          shouldFollowChatBottomOnFocus = chatMessagesShouldFollowKeyboardLift(focusBottomMessagesEl);
          if (shouldFollowChatBottomOnFocus && focusBottomMessagesEl) {
            focusBottomMessagesEl.__pokerChatOpeningStickBottom = true;
            focusBottomMessagesEl.__pokerChatUserReturnedBottomAt = Date.now();
          } else {
            markPwaChatKeyboardScrolledOpenHold(focusTarget, "focus-scrolled-feed", 3600);
          }
        } catch (eFocusBottomFollow) {}
        try {
          deferIosPwaThreadKeyboardOpenClass = shouldUseCssOnlyIosPwaChatComposerDock(focusTarget);
        } catch (eDeferPwaOpenClass) {}
        if (!deferIosPwaThreadKeyboardOpenClass) setChatKeyboardOpenClasses(true);
        try {
          clearPendingChatKeyboardDismissTimers();
          var preservePwaDockOnFocus = false;
          try {
            var focusAreaPwa = focusTarget && focusTarget.closest ? focusTarget.closest(".chat-input-area") : null;
            preservePwaDockOnFocus = !!(focusAreaPwa && shouldPreserveActivePwaChatDock(focusAreaPwa));
          } catch (ePreservePwaFocusDock) {}
          resetChatKeyboardDockRuntimeState({ preserveActivePwaDock: preservePwaDockOnFocus });
          window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = Date.now() + 1200;
        } catch (eDockOn) {}
        try {
          attachPwaChatThreadRootScrollLock(focusTarget);
        } catch (ePwaRootLockFocus) {}
        try {
          if (shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) {
            applyCssOnlyIosPwaChatComposerDock(focusTarget, "focus");
          }
        } catch (eCssOnlyFocusDock) {}
        try {
          updateTelegramMiniAppChatThreadDebugOverlay("focus");
        } catch (eDbgFocus) {}
        requestAnimationFrame(function () {
          collectChatOverscrollSnapshot("focus:raf1", focusTarget);
          requestAnimationFrame(function () {
            collectChatOverscrollSnapshot("focus:raf2", focusTarget);
          });
        });
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+120", focusTarget);
        }, 120);
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+320", focusTarget);
        }, 320);
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+700", focusTarget);
        }, 700);
        var isIosChatKb = isIosLikeForChatViewport();
        var isIosPwaChatKb =
          (isIosChatKb || isPokerIosPwaKeyboardRuntime()) &&
          (!isTelegramChatRuntime() || isPokerIosPwaKeyboardRuntime()) &&
          (
            isPokerIosPwaKeyboardRuntime() ||
            (
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset()
            )
          );
        if (isIosPwaChatKb) {
          try {
            if (!isChatThreadComposerKeyboardDom(focusTarget)) {
              setPwaIosChatEarlyKeyboardFallback("focus");
            }
          } catch (ePwaEarlyFocus) {}
        }
        try {
          window.__pokerChatPwaSettleToBottomAfterKeyboard =
            !!shouldFollowChatBottomOnFocus;
        } catch (ePwaSettleFlag) {
          window.__pokerChatPwaSettleToBottomAfterKeyboard = !!shouldFollowChatBottomOnFocus;
        }
        if (shouldFollowChatBottomOnFocus && focusBottomMessagesEl) {
          scheduleChatKeyboardBottomFollow(focusBottomMessagesEl, "focus");
        }
        var isTelegramChatFocus = isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime();
        function runPwaChatComposerDockPass(label) {
          if (!isIosPwaChatKb || !isChatThreadComposerKeyboardDom(focusTarget)) return;
          if (!isIosPwaChatComposerLikelyActiveSession(focusTarget)) {
            collectChatOverscrollSnapshot("focus:pwa-dock:skip-inactive:" + (label || ""), focusTarget);
            return;
          }
          if (shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) {
            maybeApplyCssOnlyIosPwaChatComposerDock(focusTarget, "dock-pass:" + (label || ""));
            ensurePwaChatDockWatchdog(focusTarget);
            return;
          }
          attachPwaChatThreadRootScrollLock(focusTarget);
          try {
            if (!shouldSkipPwaChatRootScrollDuringComposerOpen(focusTarget)) scrollDocumentToZero();
          } catch (ePwaDockScroll0) {}
          try {
            syncPwaChatVisualViewportInset();
          } catch (ePwaDockSync0) {}
          try {
            var targetArea =
              chatActiveTab === "personal"
                ? document.getElementById("chatPersonalInputArea")
                : document.getElementById("chatGeneralInputArea");
            if (!targetArea) return;
            var vvDock = window.visualViewport || null;
            var ihDock = window.innerHeight || 0;
            var baseDock = Number(window.__pokerChatInnerHBaseline) || ihDock || 0;
            var coverDock = 0;
            if (vvDock && ihDock > 0) {
              coverDock = Math.max(
                coverDock,
                Math.round(ihDock - (Number(vvDock.offsetTop) || 0) - (Number(vvDock.height) || 0))
              );
            }
            if (baseDock > 260 && ihDock > 0) {
              coverDock = Math.max(coverDock, Math.round(baseDock - ihDock));
            }
            /*
             * В iOS PWA первые кадры focus часто ещё не дают корректный visualViewport,
             * но клавиатура уже накрывает fixed-низ. Если dock не появился, даём временный
             * нижний floor; последующие vv-события уточнят bottom.
             */
            if (coverDock < 96 && targetArea) {
              var liveViewportReadyDockPass = false;
              try {
                liveViewportReadyDockPass = clearPwaIosChatEarlyKeyboardFallbackIfViewportLive();
              } catch (eLiveDockPass) {}
              var focusAgeDockPass = Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0);
              if (!liveViewportReadyDockPass && focusAgeDockPass < 120) {
                collectChatOverscrollSnapshot("focus:pwa-dock:wait-live:" + (label || ""), focusTarget);
                return;
              }
              coverDock = Math.max(
                coverDock,
                liveViewportReadyDockPass ? 0 : getPwaIosChatEarlyKeyboardCoverPx(),
                liveViewportReadyDockPass ? 0 : Math.round(Math.max(baseDock, ihDock || 0) * 0.34)
              );
            } else if (targetArea) {
              var pwaEarlyCoverDockPass = getPwaIosChatEarlyKeyboardCoverPx();
              if (
                pwaEarlyCoverDockPass >= 96 &&
                Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0) < 260 &&
                !clearPwaIosChatEarlyKeyboardFallbackIfViewportLive()
              ) {
                coverDock = Math.max(coverDock, pwaEarlyCoverDockPass);
              }
            }
            if (shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) {
              try {
                document.documentElement.style.removeProperty("--chat-keyboard-fallback-inset");
              } catch (ePwaCssOnlyFallback) {}
              maybeApplyCssOnlyIosPwaChatComposerDock(focusTarget, "dock-pass:" + (label || ""));
              ensurePwaChatDockWatchdog(focusTarget);
              return;
            }
            try {
              document.documentElement.style.setProperty("--chat-keyboard-fallback-inset", Math.max(0, Math.round(coverDock)) + "px");
            } catch (ePwaFallbackInset) {}
            if (coverDock >= 72) {
              applyChatThreadComposerKeyboardDockFromCover(coverDock, focusTarget);
              ensurePwaChatDockWatchdog(focusTarget);
            }
          } catch (ePwaDockPass) {}
          try {
            collectChatOverscrollSnapshot("focus:pwa-dock:" + (label || ""), focusTarget);
          } catch (ePwaDockSnap) {}
        }
        if (!isIosPwaChatKb) {
          syncPwaChatVisualViewportInset();
          if (!isTelegramChatFocus) {
            scrollVisibleChatMessagesToBottom();
            requestAnimationFrame(function () {
              syncPwaChatVisualViewportInset();
              scrollVisibleChatMessagesToBottom();
            });
          }
        }
        if (isIosChatKb) {
          if (isIosPwaChatKb) {
            requestAnimationFrame(function () {
              collectChatOverscrollSnapshot("focus:pwa-dock:raf-wait", focusTarget);
            });
            [80, 180, 360, 700, 1200, 1900].forEach(function (ms) {
              setTimeout(function () {
                runPwaChatComposerDockPass("t" + ms);
              }, ms);
            });
          } else if (!isTelegramChatFocus) {
            setTimeout(function () {
              syncPwaChatVisualViewportInset();
              scrollVisibleChatMessagesToBottom();
            }, 200);
          }
        } else if (!isIosChatKb && !isTelegramChatFocus) {
          setTimeout(function () {
            syncPwaChatVisualViewportInset();
            scrollVisibleChatMessagesToBottom();
          }, 100);
        }
        /*
         * window.resize на iOS (в т.ч. PWA) часто бьёт раньше/между кадрами visualViewport — overlap на мгновение 0,
         * при iosBoost=0 для standalone inset обнуляется и поле остаётся под клавиатурой. Resize оставляем только под Android.
         */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0) {
          if (chatWindowResizeHandler) {
            try {
              window.removeEventListener("resize", chatWindowResizeHandler);
            } catch (eWr0) {}
            chatWindowResizeHandler = null;
          }
          chatWindowResizeHandler = function () {
            syncPwaChatVisualViewportInset();
          };
          window.addEventListener("resize", chatWindowResizeHandler);
        } else if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWr0b) {}
          chatWindowResizeHandler = null;
        }
        if (typeof window.visualViewport !== "undefined" && window.visualViewport.addEventListener) {
          if (viewportResizeScrollHandler) {
            window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          }
          if (isIosChatKb) {
            /* Две позиции композера: без сглаживания и без частых пересчётов — coalesce в один кадр + один «добор» после конца анимации клавиатуры. */
            var vvCoalesceRaf = null;
            viewportResizeScrollHandler = function () {
              collectChatOverscrollSnapshot("vv:event", focusTarget);
              if (hardDisableChatComposerViewportLift(focusTarget, "vv:event-hard-disabled")) return;
              if (!vvCoalesceRaf) {
                var rafVv = window.requestAnimationFrame || function (fn) {
                  setTimeout(fn, 0);
                };
                vvCoalesceRaf = rafVv(function () {
                  vvCoalesceRaf = null;
                  try {
                    if (shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) {
                      maybeApplyCssOnlyIosPwaChatComposerDock(focusTarget, "vv-raf");
                    } else {
                      syncPwaChatVisualViewportInset();
                    }
                  } catch (eVvIm) {}
                  try {
                    if (!shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) repairChatFocusViewportOverscroll(focusTarget);
                  } catch (eVvRepairRaf) {}
                  collectChatOverscrollSnapshot("vv:raf", focusTarget);
                });
              }
              var skipVv220 =
                isTelegramChatRuntime() &&
                document.body.classList.contains("chat-keyboard-open") &&
                typeof isChatThreadComposerKeyboardDom === "function" &&
                isChatThreadComposerKeyboardDom();
              if (!skipVv220 && isHardDisabledChatComposerFlowTarget(focusTarget)) skipVv220 = true;
              if (!skipVv220 && shouldUseCssOnlyIosPwaChatComposerDock(focusTarget)) skipVv220 = true;
              if (!skipVv220) {
                if (window.__pokerChatVvInsetDebounceTimer) clearTimeout(window.__pokerChatVvInsetDebounceTimer);
                window.__pokerChatVvInsetDebounceTimer = setTimeout(function () {
                  window.__pokerChatVvInsetDebounceTimer = null;
                  try {
                    syncPwaChatVisualViewportInset();
                  } catch (eVvIos) {}
                  try {
                    if (
                      window.__pokerChatPwaSettleToBottomAfterKeyboard &&
                      !isTelegramChatRuntime() &&
                      !(
                        typeof pokerPwaStandaloneForKeyboardInset === "function" &&
                        pokerPwaStandaloneForKeyboardInset() &&
                        typeof isIosLikeForChatViewport === "function" &&
                        isIosLikeForChatViewport()
                      )
                    ) {
                      var settleBox = getVisibleMessagesEl();
                      if (settleBox) settleBox.scrollTop = settleBox.scrollHeight;
                      var settleRaf = window.requestAnimationFrame || function (fn) {
                        setTimeout(fn, 16);
                      };
                      settleRaf(function () {
                        settleRaf(function () {
                          try {
                            var settleBoxLate = getVisibleMessagesEl();
                            if (settleBoxLate) settleBoxLate.scrollTop = settleBoxLate.scrollHeight;
                          } catch (eVvSettleBottomLate) {}
                        });
                      });
                    }
                    window.__pokerChatPwaSettleToBottomAfterKeyboard = false;
                  } catch (eVvSettleBottom) {}
                  try {
                    repairChatFocusViewportOverscroll(focusTarget);
                  } catch (eVvRepairDeb) {}
                  collectChatOverscrollSnapshot("vv:debounced", focusTarget);
                }, 220);
              }
            };
            window.visualViewport.addEventListener("resize", viewportResizeScrollHandler);
          } else {
            var vvSyncPending = false;
            viewportResizeScrollHandler = function () {
              collectChatOverscrollSnapshot("vv:event", focusTarget);
              if (hardDisableChatComposerViewportLift(focusTarget, "vv:event-hard-disabled")) return;
              if (vvSyncPending) return;
              vvSyncPending = true;
              var raf = window.requestAnimationFrame || function (fn) {
                setTimeout(fn, 16);
              };
              raf(function () {
                vvSyncPending = false;
                try {
                  syncPwaChatVisualViewportInset();
                } catch (eVvSyn) {}
                try {
                  repairChatFocusViewportOverscroll(focusTarget);
                } catch (eVvRepair) {}
                collectChatOverscrollSnapshot("vv:raf", focusTarget);
              });
            };
            window.visualViewport.addEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.addEventListener("scroll", viewportResizeScrollHandler);
          }
        }
      }
      window.__pokerActivateChatKeyboardViewport = onChatInputFocus;
      function isAnyChatKeyboardChromeFocus(el) {
        if (!el || (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA")) return false;
        if (chatComposerEl && el === chatComposerEl) return true;
        var id = el.id || "";
        if (id === "chatFindByIdInputDialogs" || id === "chatFindByIdInput") return true;
        return false;
      }
      /** PWA: WK оставляет фокус на textarea при закрытой клавиатуре; по visualViewport видно, что клавиатуры нет — не блокировать finalize. */
      function pokerPwaBlurProceedDespiteDomFocus() {
        try {
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
          if (shouldAbortPwaChatKeyboardCleanupForOpening(document.activeElement || chatComposerEl, "blur-proceed-check")) return false;
          var vv = window.visualViewport;
          var ih = window.innerHeight || 0;
          if (!vv || ih < 240) return false;
          var vvh = Number(vv.height) || 0;
          var loss = Math.max(0, Math.round(ih - vvh));
          var ratio = ih > 0 ? vvh / ih : 1;
          /* iOS PWA: пороги жёстче ломали blur-cleanup — finalize откладывался, залипали fixed-композер и высота shell */
          return loss < 120 && ratio > 0.78;
        } catch (ePwaBf) {
          return false;
        }
      }
      /**
       * iOS TG/WK: после отправки или скрытия клавиатуры document.activeElement иногда остаётся на композере,
       * хотя клавиатура уже закрыта — тогда отложенные finalize отменялись и залипали fixed/bottom + таббар.
       */
      function isChatKeyboardLayoutEffectivelyClosed(options) {
        var opts = options || {};
        try {
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return true;
          var ih = window.innerHeight || 0;
          if (ih < 200) return false;
          var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          var tg = isTelegramChatRuntime();
          if (tw && tg) {
            var tgvH = Number(tw.viewportHeight);
            var tgvS = Number(tw.viewportStableHeight);
            if (tgvS > 0 && tgvH > 0 && tgvS > tgvH + 20) return false;
          }
          var vv = window.visualViewport;
          if (vv) {
            var vvh = Number(vv.height) || 0;
            var offsetTop = Number(vv.offsetTop) || 0;
            var heightLoss = Math.max(0, Math.round(ih - vvh));
            var pwaShell =
              (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
              (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
            if (pwaShell && String(document.body.getAttribute("data-view") || "") === "chat" && isChatThreadComposerKeyboardDom()) {
              var activePwaComposer = document.activeElement || null;
              if (!activePwaComposer || !isChatThreadComposerKeyboardDom(activePwaComposer)) {
                activePwaComposer = chatComposerEl || window.__pokerChatManualFocusIntentTarget || window.__pokerChatPwaLastOpenIntentTarget || null;
              }
              if (
                activePwaComposer &&
                isChatThreadComposerKeyboardDom(activePwaComposer) &&
                (isPwaChatManualFocusIntentActive(activePwaComposer) ||
                  isIosPwaChatComposerOpeningHoldActive(activePwaComposer))
              ) return false;
              var baseLinePwa = Number(window.__pokerChatInnerHBaseline) || 0;
              var winLossPwa = baseLinePwa > 260 && ih > 0 ? Math.max(0, Math.round(baseLinePwa - ih)) : 0;
              var dockBottomPwa = Number(window.__pokerChatThreadDockBottomCssPx) || 0;
              if (winLossPwa > 36 || heightLoss > 90 || (!opts.ignoreDockBottom && dockBottomPwa > 24)) return false;
            }
            if (!pwaShell && heightLoss > 72) return false;
            if (pwaShell && heightLoss > 118) return false;
            var ratio = ih > 0 ? vvh / ih : 1;
            if (!pwaShell && ratio > 0 && ratio < 0.84) return false;
            if (pwaShell && ratio > 0 && ratio < 0.76) return false;
            if (offsetTop > 16 && heightLoss > 20) return false;
            /* TG: иногда innerHeight совпадает с vv.height при открытой клавиатуре — сверяем с базовой высотой окна. */
            var baseLineVv = Number(window.__pokerChatInnerHBaseline) || 0;
            if (baseLineVv > 260 && ih > 0 && ih < baseLineVv - 64) {
              /*
               * Установленная PWA (iOS/Android WK): после blur innerHeight иногда долго ниже «доклавиатурного» baseline,
               * хотя visualViewport уже почти на весь экран — откладывается finalize, залипает fixed + bottom у композера и отступ снизу.
               */
              var pwaLike =
                (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
                (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
              var vvRatio = ih > 0 && vvh > 0 ? vvh / ih : 0;
              if (!(pwaLike && vvRatio > 0.84)) return false;
            }
            return true;
          }
          var baseFb = Number(window.__pokerChatInnerHBaseline) || 0;
          if (baseFb > 260 && ih > 0 && ih < baseFb - 80) {
            var pwaLikeFb =
              (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
              (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
            if (!pwaLikeFb) return false;
          }
          return true;
        } catch (eClsKb) {
          return true;
        }
      }
      function shouldDeferChatKeyboardFinalizeForFocus() {
        if (shouldUseNativeTelegramIosChatComposerFlow()) return false;
        if (!isAnyChatKeyboardChromeFocus(document.activeElement)) return false;
        if (isIosPwaChatComposerOpeningHoldActive(document.activeElement)) return true;
        if (pokerPwaBlurProceedDespiteDomFocus()) return false;
        return !isChatKeyboardLayoutEffectivelyClosed();
      }
      window.__pokerIsChatKeyboardLayoutEffectivelyClosed = isChatKeyboardLayoutEffectivelyClosed;
      function shouldHoldIosPwaChatComposerFocus(target) {
        try {
          if (!target || String(target.tagName || "").toUpperCase() !== "TEXTAREA") return false;
          if (!target.closest || !target.closest(".chat-input-area")) return false;
          if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          if (isRecentIosPwaChatComposerUserDismiss()) return false;
          var now = Date.now();
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
          var keepAliveTarget = window.__pokerChatPwaFocusKeepAliveTarget || null;
          if (keepAliveUntil > now && (!keepAliveTarget || keepAliveTarget === target)) return true;
          if (openingUntil > now) return true;
          if (focusAt > 0 && now - focusAt < 3200) return true;
          return false;
        } catch (eHoldFocusCheck) {
          return false;
        }
      }
      function isRecentIosPwaChatComposerUserDismiss() {
        try {
          var dismissAt = Number(window.__pokerChatPwaUserDismissAt) || 0;
          return !!(dismissAt && Date.now() - dismissAt < 900);
        } catch (ePwaUserDismissCheck) {
          return false;
        }
      }
      function markIosPwaChatComposerKeepAlive(target, label, durationMs) {
        try {
          if (!target || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          var composer = isChatThreadComposerKeyboardDom(target) ? target : chatComposerEl;
          if ((!composer || !isChatThreadComposerKeyboardDom(composer)) && target && target.closest) {
            var targetArea = target.closest(".chat-input-area");
            var areaComposer = targetArea && targetArea.querySelector ? targetArea.querySelector("textarea") : null;
            if (areaComposer && isChatThreadComposerKeyboardDom(areaComposer)) composer = areaComposer;
          }
          if (!composer || !isChatThreadComposerKeyboardDom(composer)) {
            var active = document.activeElement;
            if (active && isChatThreadComposerKeyboardDom(active)) composer = active;
          }
          if (!composer || !isChatThreadComposerKeyboardDom(composer)) return false;
          markPwaChatKeyboardOpenIntent(composer, label || "keep-alive");
          window.__pokerChatPwaFocusKeepAliveTarget = composer;
          window.__pokerChatPwaFocusKeepAliveUntil = Date.now() + Math.max(450, Number(durationMs) || 1200);
          window.__pokerChatPwaFocusKeepAliveReason = label || "";
          window.__pokerChatPwaUserDismissAt = 0;
          clearPendingChatKeyboardDismissTimers();
          return true;
        } catch (eKeepAliveMark) {
          return false;
        }
      }
      function isIosPwaChatComposerOpeningHoldActive(target) {
        try {
          if (!shouldHoldIosPwaChatComposerFocus(target || document.activeElement || chatComposerEl)) return false;
          var now = Date.now();
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
          var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
          return !!(keepAliveUntil > now || openingUntil > now || (focusAt > 0 && now - focusAt < 3200));
        } catch (ePwaOpeningHold) {
          return false;
        }
      }
      function scheduleIosPwaComposerFinalizeIfStillClosed(target, label, delayMs) {
        try {
          var delay = Math.max(120, Number(delayMs) || 260);
          var finalizeClosedSeq = Number(window.__pokerChatKeyboardCleanupSeq) || 0;
          setTimeout(function () {
            try {
              if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== finalizeClosedSeq) return;
              if (!target || String(document.body.getAttribute("data-view") || "") !== "chat") return;
              if (document.activeElement === target) return;
              if (isPwaChatManualFocusIntentActive(target) || isIosPwaChatComposerOpeningHoldActive(target)) return;
              if (shouldAbortPwaChatKeyboardCleanupForOpening(target, "finalize-still-closed")) return;
              if (!isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return;
              collectChatOverscrollSnapshot("pwa-finalize-still-closed:" + (label || ""), target);
              finalizeChatKeyboardDismiss();
            } catch (eFinalizeStillClosed) {}
          }, delay);
        } catch (eScheduleFinalizeStillClosed) {}
      }
      function refocusIosPwaChatComposerAfterTransientBlur(target, label) {
        try {
          if (!shouldHoldIosPwaChatComposerFocus(target)) return false;
          if (isRecentIosPwaChatComposerUserDismiss()) return false;
          var layoutClosedNow = isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true });
          var focusAgeNow = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          if (layoutClosedNow && focusAgeNow > 1900) return false;
          markPwaChatKeyboardOpenIntent(target, "blur-hold:" + (label || ""));
          clearPendingChatKeyboardDismissTimers();
          window.__pokerChatKeyboardOpeningUntil = Math.max(Number(window.__pokerChatKeyboardOpeningUntil) || 0, Date.now() + 900);
          var blurHoldCleanupSeq = Number(window.__pokerChatKeyboardCleanupSeq) || 0;
          var nowHold = Date.now();
          var lastHold = Number(window.__pokerChatPwaLastBlurHoldAt) || 0;
          window.__pokerChatPwaLastBlurHoldAt = nowHold;
          if (nowHold - lastHold > 320) {
            setTimeout(function () {
              try {
                if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurHoldCleanupSeq) return;
                if (!target || String(document.body.getAttribute("data-view") || "") !== "chat") return;
                if (isRecentIosPwaChatComposerUserDismiss()) return;
                if (document.activeElement === target) {
                  maybeApplyCssOnlyIosPwaChatComposerDock(target, "blur-hold-active");
                  updateChatMessagesKeyboardPad();
                  return;
                }
                if (!isIosPwaChatComposerOpeningHoldActive(target) && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) {
                  if (shouldAbortPwaChatKeyboardCleanupForOpening(target, "blur-hold-closed")) return;
                  finalizeChatKeyboardDismiss();
                  return;
                }
                if (target.disabled || target.hidden) return;
                if (target.focus) target.focus({ preventScroll: true });
                setTimeout(function () {
                  try {
                    if (document.activeElement === target) maybeApplyCssOnlyIosPwaChatComposerDock(target, "blur-hold-refocus");
                  } catch (ePwaRefocusDockLate) {}
                }, 0);
              } catch (ePwaRefocusHold) {}
            }, 90);
            setTimeout(function () {
              try {
                if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurHoldCleanupSeq) return;
                if (!target || String(document.body.getAttribute("data-view") || "") !== "chat") return;
                if (document.activeElement === target) return;
                if (isRecentIosPwaChatComposerUserDismiss() || isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) {
                  if (shouldAbortPwaChatKeyboardCleanupForOpening(target, "blur-hold-fallback")) return;
                  finalizeChatKeyboardDismiss();
                }
              } catch (ePwaRefocusFallbackCleanup) {}
            }, 850);
          }
          collectChatOverscrollSnapshot("blur:hold-pwa-focus:" + (label || ""), target);
          return true;
        } catch (eHoldPwaBlur) {
          return false;
        }
      }
      function rescueIosPwaChatComposerBlurUnlessExplicit(target, label) {
        try {
          if (!target || !isChatThreadComposerKeyboardDom(target)) return false;
          if (isRecentIosPwaChatComposerUserDismiss()) return false;
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) return false;
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
          var active = document.activeElement || null;
          if (
            active &&
            active !== document.body &&
            active !== document.documentElement &&
            String(active.tagName || "").toUpperCase() !== "BODY" &&
            String(active.tagName || "").toUpperCase() !== "HTML" &&
            active !== target
          ) {
            return false;
          }
          markPwaChatKeyboardOpenIntent(target, "blur-rescue:" + (label || ""));
          clearPendingChatKeyboardDismissTimers();
          window.__pokerChatPwaUserDismissAt = 0;
          window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = Date.now() + 1800;
          window.__pokerChatManualFocusIntentUntil = Date.now() + 2200;
          window.__pokerChatManualFocusIntentTarget = target;
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
          try {
            applyCssOnlyIosPwaChatComposerDock(target, "blur-rescue:" + (label || ""));
          } catch (eBlurRescueDock) {}
          [0, 40, 120, 260].forEach(function (ms) {
            setTimeout(function () {
              try {
                if (!target || target.disabled || target.hidden) return;
                if (isRecentIosPwaChatComposerUserDismiss()) return;
                if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return;
                var currentActive = document.activeElement || null;
                if (
                  currentActive &&
                  currentActive !== document.body &&
                  currentActive !== document.documentElement &&
                  String(currentActive.tagName || "").toUpperCase() !== "BODY" &&
                  String(currentActive.tagName || "").toUpperCase() !== "HTML" &&
                  currentActive !== target
                ) {
                  return;
                }
                if (document.activeElement !== target && target.focus) target.focus({ preventScroll: true });
                if (document.activeElement === target) applyCssOnlyIosPwaChatComposerDock(target, "blur-rescue-t" + ms);
              } catch (eBlurRescueTick) {}
            }, ms);
          });
          collectChatOverscrollSnapshot("blur:rescue-no-explicit-dismiss:" + (label || ""), target);
          return true;
        } catch (eBlurRescue) {
          return false;
        }
      }
      function onChatInputBlur(focusTarget) {
        logChatKeyboardDebug("blur");
        collectChatOverscrollSnapshot("blur:start");
        try {
          clearTelegramChatRootShiftCompensation();
        } catch (eTgShiftBlur) {}
        if (isTelegramMiniAppChatThreadIos()) {
          setTelegramIosKeyboardRootLock(false);
        }
        if (isTelegramMiniAppChatThreadIos()) {
          hideTelegramMiniAppChatThreadDebugOverlay();
          detachTelegramMiniAppChatThreadRootScrollLock();
          try {
            resetChatKeyboardDockRuntimeState();
          } catch (eTmaBlurReset) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTmaBlurDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTmaBlurClr) {}
          return;
        }
        hideTelegramMiniAppChatThreadDebugOverlay();
        detachTelegramIosChatComposerOverlayViewportSync();
        if (rescueIosPwaChatComposerBlurUnlessExplicit(focusTarget || chatComposerEl, "early")) {
          return;
        }
        if (refocusIosPwaChatComposerAfterTransientBlur(focusTarget || chatComposerEl, "early")) {
          return;
        }
        if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWr1) {}
          chatWindowResizeHandler = null;
        }
        if (viewportResizeScrollHandler && typeof window.visualViewport !== "undefined" && window.visualViewport.removeEventListener) {
          window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
          window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          viewportResizeScrollHandler = null;
        }
        var blurCleanupSeq = Number(window.__pokerChatKeyboardCleanupSeq) || 0;
        function runBlurCleanup() {
          if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurCleanupSeq) return;
          if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || chatComposerEl, "blur-cleanup")) return;
          var active = document.activeElement;
          var pwaBlurCleanup =
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport();
          var deferBlur =
            isAnyChatKeyboardChromeFocus(active) &&
            !isChatKeyboardLayoutEffectivelyClosed(pwaBlurCleanup ? { ignoreDockBottom: true } : null);
          var openingHoldBlur = pwaBlurCleanup && isIosPwaChatComposerOpeningHoldActive(active || focusTarget || chatComposerEl);
          if (openingHoldBlur) deferBlur = true;
          else if (deferBlur && pokerPwaBlurProceedDespiteDomFocus()) deferBlur = false;
          if (deferBlur) return;
          var el = getVisibleMessagesEl();
          var anchorFromBottom = 0;
          var scrollTopBefore = 0;
          var nearBottomBefore = false;
          var hadKeyboardLayoutShift = false;
          if (el) {
            try {
              anchorFromBottom = Math.max(0, el.scrollHeight - el.clientHeight - el.scrollTop);
              scrollTopBefore = Math.max(0, el.scrollTop || 0);
              nearBottomBefore = chatMessagesNearBottom(el, CHAT_SCROLL_BOTTOM_NEAR_PX);
              hadKeyboardLayoutShift =
                document.body.classList.contains("chat-keyboard-open") ||
                document.documentElement.classList.contains("chat-keyboard-open") ||
                !!(el.style && el.style.paddingBottom);
            } catch (eAnc) {}
          }
          var inChat = !!el;
          if (!inChat) scrollDocumentToZero();
          finalizeChatKeyboardDismiss();
          if (!inChat) scrollDocumentToZero();
          /* После dismiss сохраняем позицию: якорь от низа нужен только когда пользователь был у последних сообщений. */
          if (el && hadKeyboardLayoutShift) {
            var rafB = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            rafB(function () {
              rafB(function () {
                try {
                  var max = Math.max(0, el.scrollHeight - el.clientHeight);
                  if (nearBottomBefore) {
                    el.scrollTop = Math.max(0, max - anchorFromBottom);
                  } else {
                    el.scrollTop = Math.min(scrollTopBefore, max);
                  }
                } catch (e3) {}
              });
            });
          }
        }
        try {
          if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
          window.__pokerChatDismissTimers.push(setTimeout(runBlurCleanup, 0));
        } catch (eBlurTimer0) {
          setTimeout(runBlurCleanup, 0);
        }
        /* iOS: blur и visualViewport обновляются не синхронно — повторяем сброс, иначе поле ввода «остаётся выше». */
        [90, 280, 520, 880, 1350, 2200].forEach(function (ms) {
          var timerId = setTimeout(function () {
            if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurCleanupSeq) return;
            if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || chatComposerEl, "blur-timer" + ms)) return;
            if (isPwaChatManualFocusIntentActive(focusTarget || chatComposerEl)) return;
            if (isIosPwaChatComposerOpeningHoldActive(focusTarget || chatComposerEl)) return;
            if (shouldDeferChatKeyboardFinalizeForFocus()) return;
            finalizeChatKeyboardDismiss();
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (eBlurTimerN) {}
        });
        try {
          if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
          window.__pokerChatDismissTimers.push(setTimeout(function () {
            try {
              if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurCleanupSeq) return;
              if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || chatComposerEl, "blur-long")) return;
              if (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) {
                if (isPwaChatManualFocusIntentActive(focusTarget || chatComposerEl)) return;
                if (isIosPwaChatComposerOpeningHoldActive(focusTarget || chatComposerEl)) return;
                finalizeChatKeyboardDismiss();
              }
            } catch (eKbFs) {}
          }, 3200));
        } catch (eBlurTimerLong) {
          setTimeout(function () {
            try {
              if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurCleanupSeq) return;
              if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || chatComposerEl, "blur-long-fallback")) return;
              if (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) {
                if (isPwaChatManualFocusIntentActive(focusTarget || chatComposerEl)) return;
                if (isIosPwaChatComposerOpeningHoldActive(focusTarget || chatComposerEl)) return;
                finalizeChatKeyboardDismiss();
              }
            } catch (eKbFs) {}
          }, 3200);
        }
        /* PWA: повтор без shouldDefer — иначе при «залипшем» activeElement finalize не вызывался до смены экрана */
        [550, 1100].forEach(function (ms) {
          var timerId = setTimeout(function () {
            try {
              if ((Number(window.__pokerChatKeyboardCleanupSeq) || 0) !== blurCleanupSeq) return;
              if (shouldAbortPwaChatKeyboardCleanupForOpening(focusTarget || chatComposerEl, "pwa-blur-timer" + ms)) return;
              if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return;
              if (refocusIosPwaChatComposerAfterTransientBlur(focusTarget || chatComposerEl, "timer" + ms)) return;
              if (isPwaChatManualFocusIntentActive(focusTarget || chatComposerEl)) return;
              if (isIosPwaChatComposerOpeningHoldActive(focusTarget || chatComposerEl)) return;
              finalizeChatKeyboardDismiss();
            } catch (ePwaFin) {}
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (ePwaTimer) {}
        });
      }
      function bindChatComposerKeyboardEvents(ta) {
        if (!ta || ta.__pokerChatKeyboardEventsBound) return;
        ta.__pokerChatKeyboardEventsBound = true;
        function markComposerManualFocusIntent() {
          try {
            if (!ta || String(ta.tagName || "").toUpperCase() !== "TEXTAREA") return;
            if (!ta.closest || !ta.closest(".chat-input-area")) return;
            if (String(document.body.getAttribute("data-view") || "") !== "chat") return;
            window.__pokerChatPwaUserDismissAt = 0;
            window.__pokerChatPwaFocusKeepAliveUntil = 0;
            window.__pokerChatPwaFocusKeepAliveTarget = null;
            window.__pokerChatPwaFocusKeepAliveReason = "";
            if (
              !isTelegramChatRuntime() &&
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset() &&
              typeof isIosLikeForChatViewport === "function" &&
              isIosLikeForChatViewport() &&
              isChatThreadComposerKeyboardDom(ta)
            ) {
              var nowIntent = Date.now();
              markPwaChatKeyboardOpenIntent(ta, "manual-focus-intent");
              window.__pokerChatManualFocusIntentUntil = nowIntent + 2200;
              window.__pokerChatManualFocusIntentTarget = ta;
              window.__pokerChatKeyboardFocusAtMs = nowIntent;
              window.__pokerChatKeyboardOpeningUntil = nowIntent + 1400;
            }
          } catch (eManualFocusIntent) {}
        }
        function scheduleManualFocusDockPass(label) {
          try {
            if (!isPwaChatManualFocusIntentActive(ta)) return;
            [0, 80, 180, 360].forEach(function (delay) {
              setTimeout(function () {
                try {
                  if (!isPwaChatManualFocusIntentActive(ta)) return;
                  chatComposerEl = ta;
                  if (typeof onChatInputFocus === "function") onChatInputFocus(ta);
                  if (typeof forceIosPwaChatTextareaDock === "function") forceIosPwaChatTextareaDock(ta, label || "manual-focus");
                } catch (eManualDockPass) {}
              }, delay);
            });
          } catch (eScheduleManualDock) {}
        }
        ta.addEventListener(
          "touchstart",
          function (event) {
            chatComposerEl = ta;
            markComposerManualFocusIntent();
            if (shouldUseTelegramIosComposeOverlay() && !chatIosComposeOverlayOpening) {
              var modeTouch = ta === chatGeneralComposerEl ? "general" : ta === chatPersonalComposerEl ? "personal" : chatActiveTab;
              if (openTelegramIosComposeOverlay(modeTouch === "general" ? "general" : "personal")) {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                try { ta.blur(); } catch (eTgOvBlur) {}
                return;
              }
            }
            try {
              var ihTs = window.innerHeight || 0;
              if (ihTs > 200) window.__pokerChatInnerHBaseline = ihTs;
            } catch (eTsBl) {}
            try {
              if (
                !isTelegramChatRuntime() &&
                typeof pokerPwaStandaloneForKeyboardInset === "function" &&
                pokerPwaStandaloneForKeyboardInset() &&
                typeof isIosLikeForChatViewport === "function" &&
                isIosLikeForChatViewport() &&
                isChatThreadComposerKeyboardDom(ta)
              ) {
                if (!window.__pokerChatKeyboardFocusAtMs || Date.now() - Number(window.__pokerChatKeyboardFocusAtMs) > 260) {
                  window.__pokerChatKeyboardFocusAtMs = Date.now();
                }
                window.__pokerChatKeyboardOpeningUntil = Date.now() + 1200;
              }
            } catch (ePwaTouchKeyboardState) {}
            scheduleManualFocusDockPass("textarea-touchstart");
          },
          { passive: false }
        );
        ta.addEventListener("focus", function () {
          chatComposerEl = ta;
          markComposerManualFocusIntent();
          if (shouldUseTelegramIosComposeOverlay() && !chatIosComposeOverlayOpening) {
            var modeFocus = ta === chatGeneralComposerEl ? "general" : ta === chatPersonalComposerEl ? "personal" : chatActiveTab;
            if (openTelegramIosComposeOverlay(modeFocus === "general" ? "general" : "personal")) {
              try { ta.blur(); } catch (eTgOvBlur2) {}
              return;
            }
          }
          onChatInputFocus(ta);
          scheduleManualFocusDockPass("textarea-focus");
        });
        ta.addEventListener("blur", function () {
          chatComposerEl = ta;
          onChatInputBlur(ta);
        });
      }
    (function () {
      var chatComposerKeyboardTargets =
        isTelegramChatRuntime()
          ? [chatGeneralComposerEl, chatPersonalComposerEl]
          : [chatSharedComposerEl, chatGeneralComposerEl, chatPersonalComposerEl];
      chatComposerKeyboardTargets.forEach(bindChatComposerKeyboardEvents);
    })();
    })();
    window.chatRefresh = function () {
      pokerPushOpenTraceTransition("chatRefresh-enter", "");
      try {
        var directPendingRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var directPendingPeerRefresh =
          directPendingRefresh && directPendingRefresh.userId != null
            ? String(directPendingRefresh.userId).trim()
            : "";
        if (directPendingPeerRefresh) {
          pokerPushOpenDebug("chatRefresh-direct-pending", directPendingPeerRefresh);
          chatActiveTab = "personal";
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(directPendingPeerRefresh);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) {
            return;
          }
        }
        var hardPendingPeer = typeof pokerGetActivePushDmTarget === "function" ? pokerGetActivePushDmTarget() : "";
        if (hardPendingPeer) {
          pokerPushOpenDebug("chatRefresh-hard-reroute", hardPendingPeer);
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(hardPendingPeer);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          window.__pokerForceAllowPendingPushConvOpen = true;
          try {
            if (typeof pokerOpenResolvedChatPeer === "function" && pokerOpenResolvedChatPeer(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenChatPeerDirectFallback === "function" && pokerOpenChatPeerDirectFallback(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPendingPushDmWithoutContacts === "function" && pokerOpenPendingPushDmWithoutContacts(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPushDmHard === "function") {
              pokerOpenPushDmHard(hardPendingPeer, hardPendingPeer);
            }
            pokerPushOpenDebug("chatRefresh-hard-stop", hardPendingPeer);
            return;
          } finally {
            window.__pokerForceAllowPendingPushConvOpen = false;
          }
        }
        var forcedPeerRefresh = window.__pokerForcePushDmPeer;
        var forcedUntilRefresh = Number(window.__pokerForcePushDmPeerUntil || 0);
        if (
          forcedPeerRefresh &&
          forcedUntilRefresh > Date.now() &&
          typeof pokerOpenPendingPushDmWithoutContacts === "function"
        ) {
          pokerPushOpenDebug("chatRefresh-blocked", forcedPeerRefresh);
          pokerOpenPendingPushDmWithoutContacts(forcedPeerRefresh, forcedPeerRefresh);
          return;
        }
        if (window.__pendingOpenClubChatGeneral) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
        }
        if (window.__pendingOpenChatPersonalFromDeepLink) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
          if (
            typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()
          ) {
            return;
          }
        }
      } catch (eChatRefreshPending) {}
      try {
        var refreshIntentAt = Number(window.__pokerChatDialogOpenIntentAt || 0);
        var refreshIntentPeer = String(window.__pokerChatDialogOpenIntentPeer || "");
        var refreshIntentFresh = !!(refreshIntentAt && Date.now() - refreshIntentAt < 3500);
        var refreshConvVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
        var refreshHasPersonalPeer = !!(chatWithUserId || (refreshIntentFresh && refreshIntentPeer));
        if (chatActiveTab === "dialogs" && refreshHasPersonalPeer && (refreshConvVisible || refreshIntentFresh)) {
          pokerPushOpenTraceTransition("chatRefresh-keep-personal", String(chatWithUserId || refreshIntentPeer || ""));
          chatActiveTab = "personal";
          if (!chatWithUserId && refreshIntentPeer) chatWithUserId = refreshIntentPeer;
        }
      } catch (eChatRefreshKeepPersonal) {}
      /* Сначала setTab — для general выставится scrollGeneralToBottomOnNextRender; иначе отрисовка кэша шла с флагом false и лента мелькала «сверху», затем loadGeneral прокручивал вниз. */
      pokerPushOpenTraceTransition("chatRefresh-before-setTab", String(chatActiveTab || ""));
      setTab(chatActiveTab);
      if (chatWithUserId) showConv(chatWithUserId, chatWithUserName, undefined, chatWithPeerAvatarUrl);
      pokerPushOpenTraceTransition("chatRefresh-after-show", "");
      var genVis = generalView && !generalView.classList.contains("chat-general-view--hidden");
      if (
        chatActiveTab === "general" &&
        genVis &&
        generalMessages &&
        window._chatGeneralCache &&
        !window._chatGeneralCache.__fromDisk &&
        window._chatGeneralCache.messages &&
        window._chatGeneralCache.messages.length
      ) {
        scrollGeneralToBottomOnNextRender = true;
        renderGeneralMessages(window._chatGeneralCache.messages);
        try {
          lastGeneralMessagesSig = generalMessagesSignature(window._chatGeneralCache.messages);
        } catch (eSigSync) {}
        if (window._chatGeneralCache.participantsCount != null) {
          window.lastGeneralStats = String(window._chatGeneralCache.participantsCount) + " уч";
          updateChatHeaderStats();
        }
        try {
          syncClubChatRosterUi();
        } catch (eRosterRf) {}
      }
    };
    document.querySelectorAll(".chat-manager-btn--tg").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (href && href.startsWith("tg://") && tg && tg.openTelegramLink) {
          e.preventDefault();
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          tg.openTelegramLink(href);
        }
      });
    });
    document.querySelectorAll(".chat-manager-btn[data-chat-user-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
        var raw = (btn.dataset.chatUserId || "").trim();
        var userName = btn.dataset.chatUserName || "Менеджер";
        if (!raw) {
          if (tg && tg.showAlert) tg.showAlert("Укажите data-chat-user-id (ID приложения или Telegram ID)");
          return;
        }
        function doShow(tgUserId, peerP21) {
          window.__pokerSuppressSetTabPersonalLoad = true;
          try {
            setTab("personal");
          } finally {
            window.__pokerSuppressSetTabPersonalLoad = false;
          }
          showConv(tgUserId, userName, peerP21);
        }
        if (raw.startsWith("tg_")) {
          doShow(raw);
        } else if (/^ID\d{6}$/.test(raw.toUpperCase())) {
          var id = raw.toUpperCase();
          fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (data && data.ok && data.userId) doShow(data.userId, data.p21Id);
              else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            })
            .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
        } else {
          doShow("tg_" + raw);
        }
      });
    });
    var lastConvBackAt = 0;
    function handleConvBack(e) {
      e.preventDefault();
      e.stopPropagation();
      var now = Date.now();
      if (now - lastConvBackAt < 450) return;
      if ((e.type === "touchend" || e.type === "pointerup") && window.__touchWasScroll && window.__touchWasScroll()) return;
      lastConvBackAt = now;
      try {
        window.__pokerChatConvBackSeq = (Number(window.__pokerChatConvBackSeq || 0) || 0) + 1;
      } catch (eConvBackSeq) {}
      pokerPushOpenSetCaller("conv-back-btn");
      showDialogs();
    }
    function handleConvBackFromHeader(e) {
      var target = e.target && e.target.closest ? e.target.closest("#chatBackBtn, .chat-conv-top__toolbar-back") : null;
      if (!target) return;
      handleConvBack(e);
    }
    if (backBtn) {
      backBtn.addEventListener("touchstart", handleConvBack, { passive: false });
      backBtn.addEventListener("touchend", handleConvBack, { passive: false });
      backBtn.addEventListener("click", handleConvBack);
    }
    var convTopEl = document.querySelector("#chatConvView .chat-conv-top");
    if (convTopEl) {
      convTopEl.addEventListener("click", handleConvBackFromHeader, true);
    }
    var convProfileOpenBtn = document.getElementById("chatConvProfileOpenBtn");
    if (convProfileOpenBtn) {
      convProfileOpenBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var uidP = chatWithUserId;
        if (!uidP) return;
        if (String(uidP).indexOf("group_") === 0) {
          if (typeof window.__pokerOpenChatGroupInfo === "function") window.__pokerOpenChatGroupInfo(uidP);
          return;
        }
        var myOpenP = resolveMyChatMemberId();
        if (myOpenP && peerChatIdsEqual(uidP, myOpenP)) {
          if (tg && tg.showAlert) tg.showAlert("Это вы — свой профиль смотрите в разделе «Профиль».");
          else if (typeof alert === "function") alert("Это вы — свой профиль смотрите в разделе «Профиль».");
          return;
        }
        var nameP = chatWithUserName || (convTitle && convTitle.textContent) || "Игрок";
        var avP = chatWithPeerAvatarUrl || null;
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(uidP, nameP, avP);
        }
      });
    }
    var convGroupAddBtn = document.getElementById("chatConvGroupAddMembersBtn");
    if (convGroupAddBtn) {
      convGroupAddBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var gidA = chatWithUserId;
        if (!gidA || String(gidA).indexOf("group_") !== 0) return;
        if (typeof window.__pokerOpenChatGroupAddMembers === "function") {
          window.__pokerOpenChatGroupAddMembers(gidA);
        }
      });
    }
    if (convPeerAvatarWrap && convGroupAvatarFile) {
      convPeerAvatarWrap.addEventListener("click", function (e) {
        if (!convGroupCanChangeAvatar || !chatWithUserId || String(chatWithUserId).indexOf("group_") !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        convGroupAvatarFile.click();
      });
      convPeerAvatarWrap.addEventListener("keydown", function (e) {
        if (!convGroupCanChangeAvatar) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        convGroupAvatarFile.click();
      });
    }
    if (convGroupAvatarFile) {
      convGroupAvatarFile.addEventListener("change", function () {
        var f = convGroupAvatarFile.files && convGroupAvatarFile.files[0];
        var gidCv = chatWithUserId;
        convGroupAvatarFile.value = "";
        if (!f || !gidCv || String(gidCv).indexOf("group_") !== 0 || !convGroupCanChangeAvatar) return;
        if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
        if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Войдите, чтобы сменить аватар");
          return;
        }
        resizeImage(f, 256, 256, 0.88)
          .then(function (dataUrl) {
            return fetch(base + "/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                pokerApiAuthJsonBody({ action: "updateGroupAvatar", groupId: gidCv, avatar: dataUrl })
              ),
            }).then(function (r) {
              return r.json();
            });
          })
          .then(function (data) {
            if (data && data.ok && data.groupAvatar) {
              chatWithPeerAvatarUrl = data.groupAvatar;
              applyConvPeerAvatarHeader(data.groupAvatar, chatWithUserName || "");
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (tg && tg.showToast) tg.showToast("Аватар обновлён");
            } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
            else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
          })
          .catch(function () {
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
            else if (typeof alert === "function") alert(POKER_NET_ERR);
          });
      });
    }
    if (findByIdBtn && findByIdInput) {
      function findByIdAndOpen() {
        var raw = (findByIdInput.value || "").trim();
        var byId = false;
        var idPart = raw.replace(/^@/, "").toUpperCase();
        if (/^\d{6}$/.test(idPart) || (/^ID\d{6}$/.test(idPart))) {
          byId = true;
        } else if (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart)) {
          byId = true;
        }
        var url;
        if (byId) {
          var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
          url = base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
        } else {
          var nick = raw.replace(/^@/, "").trim();
          if (!nick) {
            if (tg && tg.showAlert) tg.showAlert("Введите ID (ID123456) или ник (@username)");
            return;
          }
          url = base + "/api/users?username=" + encodeURIComponent(nick) + pokerApiAuthQuery("&");
        }
        findByIdBtn.disabled = true;
        fetch(url)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            findByIdBtn.disabled = false;
            findByIdInput.value = "";
            if (data && data.ok && data.userId) {
              showConv(data.userId, data.userName || data.userId, data.p21Id);
            } else {
              if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            }
          })
          .catch(function () {
            findByIdBtn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      }
      findByIdBtn.addEventListener("click", findByIdAndOpen);
      if (findByIdInput) findByIdInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); findByIdAndOpen(); }
      });
    }
      if (findByIdInput) {
        findByIdInput.addEventListener("focus", function () {
        if (
          typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
          window.__pokerIsChatPhysicalKeyboardContext()
        ) {
          return;
        }
        if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
          window.__pokerActivateChatKeyboardViewport();
        } else {
          if (!isTelegramChatRuntime()) {
            document.documentElement.classList.add("chat-keyboard-open");
            document.body.classList.add("chat-keyboard-open");
          }
        }
        try {
          findByIdInput.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } catch (eSi2) {}
      });
      findByIdInput.addEventListener("blur", function () {
        try {
          if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
            window.__pokerFinalizeChatKeyboardDismiss();
          } else {
            if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
              window.__pokerClearChatKeyboardViewportState();
            }
            if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
              pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
            }
          }
        } catch (eFindBlur) {}
      });
    }
    var generalFileInput = document.getElementById("chatGeneralFileInput");
    var generalPdfInput = document.getElementById("chatGeneralPdfInput");
    var generalAttachBtn = document.getElementById("chatGeneralAttachBtn");
    var generalAttachDropdown = document.getElementById("chatGeneralAttachDropdown");
    var generalImagePreview = document.getElementById("chatGeneralImagePreview");
    function closeGeneralAttachDropdown() {
      if (generalAttachDropdown) { generalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); generalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (generalAttachBtn) generalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", generalAttachDropdownOutside);
    }
    function generalAttachDropdownOutside(e) {
      if (generalAttachDropdown && !generalAttachDropdown.contains(e.target) && generalAttachBtn && !generalAttachBtn.contains(e.target)) closeGeneralAttachDropdown();
    }
    if (generalAttachBtn && generalFileInput) {
      generalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (generalAttachDropdown && generalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          generalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          generalAttachDropdown.setAttribute("aria-hidden", "false");
          generalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", generalAttachDropdownOutside); }, 0);
        } else closeGeneralAttachDropdown();
      });
      if (generalAttachDropdown) {
        generalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") generalFileInput.click();
            else if (action === "document" && generalPdfInput) generalPdfInput.click();
            else if (action === "contact" && typeof openConvFromDialogs === "function") openConvFromDialogs(item.getAttribute("data-user-id"), item.getAttribute("data-user-name"));
            closeGeneralAttachDropdown();
          });
        });
      }
      generalFileInput.addEventListener("change", function () {
        var f = generalFileInput.files && generalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        generalDocument = null;
        // До 800px по длинной стороне, JPEG ~0.92; при перегрузе лимита API плавно снижаем q (не «мыло» 0.6).
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          generalImage = dataUrl;
          updateGeneralSendBtnIcon();
          if (generalImagePreview) {
            generalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            generalImagePreview.classList.add("chat-image-preview--visible");
            generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              generalImage = null; generalFileInput.value = "";
              updateGeneralSendBtnIcon();
              generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        generalFileInput.value = "";
      });
      if (generalPdfInput) {
        generalPdfInput.addEventListener("change", function () {
          var f = generalPdfInput.files && generalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            generalPdfInput.value = "";
            return;
          }
          generalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              generalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updateGeneralSendBtnIcon();
              if (generalImagePreview) {
                generalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(generalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                generalImagePreview.classList.add("chat-image-preview--visible");
                generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  generalDocument = null; generalPdfInput.value = "";
                  updateGeneralSendBtnIcon();
                  generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          generalPdfInput.value = "";
        });
      }
    }
    var CHAT_EMOJIS = ["🔥","✅","😀","😃","😄","😁","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😗","😋","😛","😜","🤪","😎","🤩","🥳","👍","👎","👏","🙌","🤝","🙏","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","⭐","✨","💯","🎉","🎊","🤔","😐","😑","😶","🙄","😏","😣","😢","😭","😤","😡","🤬","😈","💀","👋","✌️","🤞","💪","🐶","🐱","🎲","♠️","♥️","♦️","♣️"];
    var chatEmojiPicker = document.getElementById("chatEmojiPicker");
    var chatEmojiPickerGrid = document.getElementById("chatEmojiPickerGrid");
    var chatGeneralEmojiBtn = document.getElementById("chatGeneralEmojiBtn");
    var chatPersonalEmojiBtn = document.getElementById("chatPersonalEmojiBtn");
    var chatEmojiPickerTargetInput = null;
    var chatEmojiPickerOpenedVia = null;
    var chatEmojiPickerClose = null;
    function getVisibleChatComposerTextarea(channel) {
      try {
        var active = document.activeElement;
        if (active && active.matches && active.matches("textarea") && active.closest && active.closest(".chat-input-area")) return active;
        var area = null;
        if (channel === "personal") area = chatPersonalInputArea;
        else if (channel === "general") area = chatGeneralInputArea;
        if (!area && chatActiveTab === "personal") area = chatPersonalInputArea;
        if (!area && chatActiveTab === "general") area = chatGeneralInputArea;
        if (!area) area = chatGeneralInputArea || chatPersonalInputArea;
        var inArea = area && area.querySelector ? area.querySelector("textarea.chat-input--textarea, textarea.chat-input, textarea") : null;
        return inArea || chatComposerEl || chatSharedComposerEl || null;
      } catch (eEmojiVisibleComposer) {
        return chatComposerEl || chatSharedComposerEl || null;
      }
    }
    function isChatEmojiComposerTextarea(ta) {
      try {
        return !!(
          ta &&
          String(ta.tagName || "").toUpperCase() === "TEXTAREA" &&
          ta.closest &&
          ta.closest(".chat-input-area") &&
          !ta.disabled &&
          !ta.hidden
        );
      } catch (eEmojiComposerTextarea) {
        return false;
      }
    }
    function isTouchChatEmojiFocusContext() {
      try {
        if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
      } catch (eEmojiPhysicalCtx) {}
      try {
        if ((navigator.maxTouchPoints || 0) > 0) return true;
        if (/Android|iPad|iPhone|iPod/i.test(navigator.userAgent || "")) return true;
      } catch (eEmojiTouchCtx) {}
      try {
        if (isTelegramChatRuntime()) return true;
      } catch (eEmojiTgCtx) {}
      try {
        if (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) return true;
      } catch (eEmojiPwaCtx) {}
      return false;
    }
    function isChatEmojiKeyboardOpenForComposer(ta) {
      try {
        if (!isChatEmojiComposerTextarea(ta)) return false;
        var now = Date.now();
        var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
        var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
        var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
        var activeKeyboardSignal =
          document.body.classList.contains("chat-keyboard-open") ||
          document.documentElement.classList.contains("chat-keyboard-open") ||
          openingUntil > now ||
          keepAliveUntil > now ||
          (document.activeElement === ta && focusAt > 0 && now - focusAt < 1800);
        if (!activeKeyboardSignal) return false;
        try {
          if (typeof isChatKeyboardLayoutEffectivelyClosed === "function" && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return false;
        } catch (eEmojiOpenClosedCheck) {}
        return true;
      } catch (eEmojiKeyboardOpen) {
        return false;
      }
    }
    function shouldHandleChatEmojiEventWithoutComposerFocus(ta) {
      try {
        if (!isTouchChatEmojiFocusContext()) return false;
        if (!isChatEmojiComposerTextarea(ta)) return false;
        return String(document.body.getAttribute("data-view") || "") === "chat";
      } catch (eEmojiNoFocusEvent) {
        return false;
      }
    }
	    function shouldPreserveChatEmojiComposerFocus(ta) {
	      try {
	        if (!isChatEmojiComposerTextarea(ta) || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
	        var now = Date.now();
	        var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
	        var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
	        var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
	        var keyboardOpenForEmoji =
	          document.body.classList.contains("chat-keyboard-open") ||
	          document.documentElement.classList.contains("chat-keyboard-open") ||
	          openingUntil > now ||
	          keepAliveUntil > now ||
	          (focusAt > 0 && now - focusAt < 1800);
	        var keyboardRecentlyHeld =
	          keyboardOpenForEmoji ||
	          document.activeElement === ta;
	        if (!keyboardRecentlyHeld) return false;
	        if (!keyboardOpenForEmoji && document.activeElement === ta) {
	          try {
	            if (typeof isChatKeyboardLayoutEffectivelyClosed === "function" && isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })) return false;
	          } catch (eEmojiClosedFocus) {}
	        }
	        if (isTouchChatEmojiFocusContext()) return isChatEmojiKeyboardOpenForComposer(ta);
        if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) {
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
          return !!(ta.closest && ta.closest(".chat-input-area"));
        }
        if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
        if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
        return !!(ta.closest && ta.closest(".chat-input-area"));
      } catch (eEmojiPreserveCheck) {
        return false;
      }
    }
    function shouldGuardChatEmojiComposerEvent() {
      try {
        if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
        var now = Date.now();
        var focusAt = Number(window.__pokerChatKeyboardFocusAtMs) || 0;
        var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
        var keepAliveUntil = Number(window.__pokerChatPwaFocusKeepAliveUntil) || 0;
        if (
          !document.body.classList.contains("chat-keyboard-open") &&
          !document.documentElement.classList.contains("chat-keyboard-open") &&
          openingUntil <= now &&
          keepAliveUntil <= now &&
          !(focusAt > 0 && now - focusAt < 1800)
        ) {
          return false;
        }
        if (isTelegramChatRuntime() && !isPokerIosPwaKeyboardRuntime()) {
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
          return true;
        }
        if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
        if (typeof isIosLikeForChatViewport !== "function" || !isIosLikeForChatViewport()) return false;
        return true;
      } catch (eEmojiGuardCheck) {
        return false;
      }
    }
    function primeChatEmojiComposerKeepAlive(ta, label) {
      try {
        if (typeof isRecentIosPwaChatComposerUserDismiss === "function" && isRecentIosPwaChatComposerUserDismiss()) return false;
        if (!ta || !shouldPreserveChatEmojiComposerFocus(ta)) return false;
        chatComposerEl = ta;
        window.__pokerChatPwaUserDismissAt = 0;
        window.__pokerChatKeyboardOpeningUntil = Math.max(Number(window.__pokerChatKeyboardOpeningUntil) || 0, Date.now() + 1100);
        if (!window.__pokerChatKeyboardFocusAtMs) window.__pokerChatKeyboardFocusAtMs = Date.now();
        try {
          if (typeof clearPendingChatKeyboardDismissTimers === "function") clearPendingChatKeyboardDismissTimers();
        } catch (eEmojiClearDismiss) {}
        if (typeof markIosPwaChatComposerKeepAlive === "function") {
          markIosPwaChatComposerKeepAlive(ta, label || "emoji", 1800);
        }
        return true;
      } catch (eEmojiPrimeKeepAlive) {
        return false;
      }
    }
    function preserveChatEmojiComposerFocus(ta, label) {
      try {
        if (!primeChatEmojiComposerKeepAlive(ta, label)) return false;
        chatComposerEl = ta;
        try {
          if (ta.focus) ta.focus({ preventScroll: true });
        } catch (eEmojiFocus1) {
          try {
            if (ta.focus) ta.focus();
          } catch (eEmojiFocus2) {}
        }
        try {
          if (document.activeElement === ta && typeof maybeApplyCssOnlyIosPwaChatComposerDock === "function") {
            maybeApplyCssOnlyIosPwaChatComposerDock(ta, label || "emoji");
          }
        } catch (eEmojiDock) {}
        try {
          if (typeof updateChatMessagesKeyboardPad === "function") updateChatMessagesKeyboardPad();
        } catch (eEmojiPad) {}
        return true;
      } catch (eEmojiPreserve) {
        return false;
      }
    }
    function schedulePreserveChatEmojiComposerFocus(ta, label) {
      if (!ta) return;
      var delays = [0, 80, 180, 360, 700, 1100, 1600];
      delays.forEach(function (delay) {
        setTimeout(function () {
          preserveChatEmojiComposerFocus(ta, label);
        }, delay);
      });
    }
    function preventEmojiFocusSteal(event, ta, label) {
      var targetInput = ta || chatEmojiPickerTargetInput || getVisibleChatComposerTextarea("");
      var preserved = primeChatEmojiComposerKeepAlive(targetInput, label);
      if (preserved) schedulePreserveChatEmojiComposerFocus(targetInput, label);
      preserved = preserveChatEmojiComposerFocus(targetInput, label) || preserved;
      if (!preserved && shouldGuardChatEmojiComposerEvent()) {
        try {
          if (typeof markIosPwaChatComposerKeepAlive === "function") {
            markIosPwaChatComposerKeepAlive(targetInput || (event && event.target) || null, label || "emoji", 1400);
          }
        } catch (eEmojiGuardKeepAlive) {}
        preserved = true;
      }
      if (!preserved && shouldHandleChatEmojiEventWithoutComposerFocus(targetInput)) preserved = true;
      if (!preserved) return false;
      try {
        if (event && event.preventDefault) event.preventDefault();
      } catch (ePreventEmojiFocus) {}
      try {
        if (event && event.stopPropagation) event.stopPropagation();
      } catch (eStopEmojiFocus) {}
      return true;
    }
	    function syncChatComposerAfterEmojiInsert(ta) {
	      try {
	        chatComposerEl = ta;
	        if (typeof flushChatComposerToDrafts === "function") flushChatComposerToDrafts();
      } catch (eEmojiFlush) {}
      try {
        var inputEvent = typeof Event === "function" ? new Event("input", { bubbles: true }) : null;
        if (inputEvent) ta.dispatchEvent(inputEvent);
      } catch (eEmojiInputEvent) {}
      try {
        if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
      } catch (eEmojiGenSend) {}
      try {
        if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
	      } catch (eEmojiPersonalSend) {}
	    }
	    function chatComposerValueHasTextForHeight(value) {
	      try {
	        var s = chatComposerValueForHeight(value);
	        return !!s.replace(/\s+/g, "");
	      } catch (eEmojiTextHeight) {
	        return !!String(value || "").replace(/\s+/g, "");
	      }
	    }
	    function chatComposerValueForHeight(value) {
	      var s = String(value || "");
	      if (!s) return "";
	      try {
	        s = s.replace(/[\u200d\ufe0e\ufe0f]/g, "");
	        s = s.replace(/[\u{1f000}-\u{1faff}\u{2600}-\u{27bf}]/gu, "");
	      } catch (eEmojiHeightNormalize) {}
	      return s;
	    }
	    function insertEmojiAtCursor(ta, emoji) {
	      if (!ta) return;
      var shouldRestoreFocusAfterEmoji = !isTouchChatEmojiFocusContext() || isChatEmojiKeyboardOpenForComposer(ta);
      var start = ta.selectionStart != null ? ta.selectionStart : ta.value.length;
      var end = ta.selectionEnd != null ? ta.selectionEnd : start;
      var text = ta.value;
      var maxLen = ta.getAttribute("maxlength") ? parseInt(ta.getAttribute("maxlength"), 10) : 500;
      var newText = text.slice(0, start) + emoji + text.slice(end);
      if (newText.length > maxLen) newText = newText.slice(0, maxLen);
      ta.value = newText;
      ta.selectionStart = ta.selectionEnd = Math.min(start + emoji.length, newText.length);
      if (shouldRestoreFocusAfterEmoji) {
        try {
          ta.focus({ preventScroll: true });
        } catch (eEmojiInsertFocus1) {
          try { ta.focus(); } catch (eEmojiInsertFocus2) {}
        }
      }
	      if (typeof resizeChatTextarea === "function") resizeChatTextarea(ta);
	      syncChatComposerAfterEmojiInsert(ta);
      if (shouldRestoreFocusAfterEmoji) {
        preserveChatEmojiComposerFocus(ta, "emoji-insert");
        schedulePreserveChatEmojiComposerFocus(ta, "emoji-insert");
      }
    }
    function hideChatEmojiPicker() {
      if (!chatEmojiPicker) return;
      chatEmojiPicker.classList.add("chat-emoji-picker--hidden");
      chatEmojiPicker.setAttribute("aria-hidden", "true");
      chatEmojiPickerTargetInput = null;
      chatEmojiPickerOpenedVia = null;
      if (chatEmojiPickerClose) {
        document.removeEventListener("click", chatEmojiPickerClose);
        chatEmojiPickerClose = null;
      }
    }
    if (chatEmojiPickerGrid && CHAT_EMOJIS.length) {
      CHAT_EMOJIS.forEach(function (emoji) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chat-emoji-picker__emoji";
        btn.textContent = emoji;
        btn.tabIndex = -1;
        btn.setAttribute("aria-label", "Вставить " + emoji);
        var emojiTouchHandledAt = 0;
        var emojiTouchStartY = 0;
        var emojiTouchMoved = false;
        btn.addEventListener("pointerdown", function (e) {
          if (e && e.isPrimary === false) return;
          try {
            if (e && e.stopPropagation) e.stopPropagation();
          } catch (eEmojiPointerStop) {}
        }, { passive: false, capture: true });
        btn.addEventListener("mousedown", function (e) {
          preventEmojiFocusSteal(e, chatEmojiPickerTargetInput, "emoji-picker-mousedown");
        });
        btn.addEventListener("touchstart", function (e) {
          emojiTouchMoved = false;
          try {
            var t = e && e.touches && e.touches[0] ? e.touches[0] : null;
            emojiTouchStartY = t ? Number(t.clientY) || 0 : 0;
          } catch (eEmojiTouchStartY) {
            emojiTouchStartY = 0;
          }
          try {
            if (e && e.stopPropagation) e.stopPropagation();
          } catch (eEmojiTouchStartStop) {}
        }, { passive: true });
        btn.addEventListener("touchmove", function (e) {
          try {
            var t = e && e.touches && e.touches[0] ? e.touches[0] : null;
            var y = t ? Number(t.clientY) || 0 : 0;
            if (emojiTouchStartY && Math.abs(y - emojiTouchStartY) > 8) emojiTouchMoved = true;
          } catch (eEmojiTouchMove) {}
        }, { passive: true });
        btn.addEventListener("touchend", function (e) {
          if (emojiTouchMoved) {
            emojiTouchMoved = false;
            return;
          }
          if (!preventEmojiFocusSteal(e, chatEmojiPickerTargetInput, "emoji-picker-touchend")) return;
          emojiTouchHandledAt = Date.now();
          if (chatEmojiPickerTargetInput) insertEmojiAtCursor(chatEmojiPickerTargetInput, emoji);
        }, { passive: false });
        btn.addEventListener("click", function (e) {
          if (Date.now() - emojiTouchHandledAt < 700) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          preventEmojiFocusSteal(e, chatEmojiPickerTargetInput, "emoji-picker-click");
          e.stopPropagation();
          if (chatEmojiPickerTargetInput) insertEmojiAtCursor(chatEmojiPickerTargetInput, emoji);
        });
        chatEmojiPickerGrid.appendChild(btn);
      });
    }
    // Одиночный клик/тап по смайлу — открыть пикер, долгое нажатие — открыть шаблоны.
    function bindEmojiButton(btn, templatesChannel) {
      if (!btn || !chatEmojiPicker) return;
      if (templatesChannel !== "general" && templatesChannel !== "personal") return;
      btn.tabIndex = -1;
      var longPressTimer = null;
      var longPressTriggered = false;
      var touchTapHandledAt = 0;
      var LONG_PRESS_MS = 550;
      function clearLongPressTimer() {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      }
      function getEmojiTargetInput() {
        var modeInput = null;
        try {
          if (templatesChannel === "general") modeInput = getDirectChatComposer("general") || chatGeneralComposerEl;
          else if (templatesChannel === "personal") modeInput = getDirectChatComposer("personal") || chatPersonalComposerEl;
        } catch (eEmojiModeInput) {}
        return modeInput || getVisibleChatComposerTextarea(templatesChannel);
      }
      function positionEmojiPicker() {
        try {
          var rect = btn.getBoundingClientRect();
          var vv = window.visualViewport || null;
          var margin = 8;
          var gap = 8;
          var viewLeft = vv ? Math.max(0, Number(vv.offsetLeft) || 0) : 0;
          var viewTop = vv ? Math.max(0, Number(vv.offsetTop) || 0) : 0;
          var viewWidth = Math.max(240, Math.round((vv && Number(vv.width)) || window.innerWidth || document.documentElement.clientWidth || 320));
          var viewHeight = Math.max(220, Math.round((vv && Number(vv.height)) || window.innerHeight || document.documentElement.clientHeight || 480));
          var viewRight = viewLeft + viewWidth;
          var viewBottom = viewTop + viewHeight;
          var maxPickerWidth = Math.max(224, viewWidth - margin * 2);
          chatEmojiPicker.style.width = Math.min(304, maxPickerWidth) + "px";
          chatEmojiPicker.style.maxWidth = maxPickerWidth + "px";
          var grid = chatEmojiPicker.querySelector ? chatEmojiPicker.querySelector(".chat-emoji-picker__grid") : null;
          if (grid) {
            var roomAbove = Math.max(96, rect.top - viewTop - gap - margin * 2);
            var roomBelow = Math.max(96, viewBottom - rect.bottom - gap - margin * 2);
            var gridMax = Math.max(104, Math.min(180, Math.max(roomAbove, roomBelow) - 24));
            grid.style.maxHeight = gridMax + "px";
          }
          var pickerRect = chatEmojiPicker.getBoundingClientRect();
          var pickerWidth = Math.max(224, Math.round(pickerRect.width || 304));
          var pickerHeight = Math.max(120, Math.round(pickerRect.height || 224));
          var left = rect.right - pickerWidth;
          left = Math.max(viewLeft + margin, Math.min(left, viewRight - pickerWidth - margin));
          var topAbove = rect.top - pickerHeight - gap;
          var topBelow = rect.bottom + gap;
          var top = topAbove >= viewTop + margin ? topAbove : topBelow;
          top = Math.max(viewTop + margin, Math.min(top, viewBottom - pickerHeight - margin));
          chatEmojiPicker.style.left = Math.round(left) + "px";
          chatEmojiPicker.style.top = Math.round(top) + "px";
        } catch (eEmojiPickerPosition) {
          var fallbackRect = btn.getBoundingClientRect();
          chatEmojiPicker.style.left = Math.max(8, Math.min(fallbackRect.right - 304, window.innerWidth - 312)) + "px";
          chatEmojiPicker.style.top = Math.max(8, fallbackRect.top - 224) + "px";
        }
      }
      function toggleEmojiPicker() {
        var targetInput = getEmojiTargetInput();
        preserveChatEmojiComposerFocus(targetInput, "emoji-toggle");
        if (chatEmojiPicker.classList.contains("chat-emoji-picker--hidden")) {
          chatEmojiPickerTargetInput = targetInput;
          chatEmojiPickerOpenedVia = btn;
          chatEmojiPicker.style.visibility = "hidden";
          chatEmojiPicker.classList.remove("chat-emoji-picker--hidden");
          positionEmojiPicker();
          chatEmojiPicker.style.visibility = "";
          chatEmojiPicker.setAttribute("aria-hidden", "false");
          schedulePreserveChatEmojiComposerFocus(targetInput, "emoji-toggle-open");
          chatEmojiPickerClose = function (ev) {
            if (ev.target && !chatEmojiPicker.contains(ev.target) && ev.target !== btn && !btn.contains(ev.target)) {
              hideChatEmojiPicker();
            }
          };
          setTimeout(function () { document.addEventListener("click", chatEmojiPickerClose); }, 0);
        } else if (chatEmojiPickerOpenedVia === btn) {
          hideChatEmojiPicker();
        }
      }
      function startLongPress() {
        clearLongPressTimer();
        longPressTriggered = false;
        longPressTimer = setTimeout(function () {
          longPressTimer = null;
          longPressTriggered = true;
          hideChatEmojiPicker();
          if (typeof tg !== "undefined" && tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
            try { tg.HapticFeedback.impactOccurred("light"); } catch (eH) {}
          }
          showTemplatesMenu(templatesChannel);
        }, LONG_PRESS_MS);
      }
      btn.addEventListener("touchstart", function (e) {
        preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-touchstart");
        startLongPress();
      }, { passive: false });
      btn.addEventListener("pointerdown", function (e) {
        if (e && e.isPrimary === false) return;
        preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-pointerdown");
      }, { passive: false, capture: true });
      btn.addEventListener("pointerup", function (e) {
        if (e && e.isPrimary === false) return;
        preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-pointerup");
      }, { passive: false, capture: true });
      btn.addEventListener("touchend", function (e) {
        clearLongPressTimer();
        if (!preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-touchend")) return;
        e.stopPropagation();
        touchTapHandledAt = Date.now();
        if (longPressTriggered) {
          longPressTriggered = false;
          return;
        }
        toggleEmojiPicker();
      }, { passive: false });
      btn.addEventListener("touchcancel", function () { clearLongPressTimer(); }, { passive: true });
      btn.addEventListener("mousedown", function (e) {
        preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-mousedown");
        startLongPress();
      });
      btn.addEventListener("focus", function () {
        schedulePreserveChatEmojiComposerFocus(getEmojiTargetInput(), "emoji-btn-focus");
      });
      btn.addEventListener("mouseup", function () { clearLongPressTimer(); });
      btn.addEventListener("mouseleave", function () { clearLongPressTimer(); });
      btn.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });
      btn.addEventListener("click", function (e) {
        if (Date.now() - touchTapHandledAt < 700) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        preventEmojiFocusSteal(e, getEmojiTargetInput(), "emoji-btn-click");
        if (longPressTriggered) {
          longPressTriggered = false;
          e.preventDefault();
          return;
        }
        e.stopPropagation();
        toggleEmojiPicker();
      });
    }
    bindEmojiButton(chatGeneralEmojiBtn, "general");
    bindEmojiButton(chatPersonalEmojiBtn, "personal");
    var generalVoiceBtn = document.getElementById("chatGeneralVoiceBtn");
    var generalVoiceRemove = document.getElementById("chatGeneralVoiceRemove");
    var generalVoicePreviewEl = document.getElementById("chatGeneralVoicePreview");
    var generalSendBtnRef = generalSendBtn;
    var sendBtnRef = sendBtn;
    /** Один тап = одно действие: в TG/WKWebView touchend+preventDefault часто убивает click; pointerup(не-mouse)+click дают дубль — режем по времени. */
    function bindChatSendTap(btn, run) {
      if (!btn || typeof run !== "function") return;
      var key = "_pokerChatSendTapBound";
      if (btn[key]) return;
      btn[key] = true;
      var lastInvoke = 0;
      function sendButtonMode() {
        return btn === generalSendBtnRef || (btn && btn.id === "chatGeneralSendBtn") ? "general" : "personal";
      }
      function hasSendableContent(mode) {
        try {
          flushChatComposerToDrafts();
        } catch (eFlushSendable) {}
        if (mode === "general") return !!(getChatGeneralText().trim() || generalImage || generalVoice || generalDocument);
        return !!(getChatPersonalText().trim() || personalImage || personalVoice || personalDocument);
      }
      function markClosedKeyboardSendFocusSuppression(mode) {
        try {
          if (!hasSendableContent(mode)) return;
          var composer =
            mode === "general"
              ? (chatGeneralComposerEl || (chatGeneralComposerMount && chatGeneralComposerMount.querySelector("textarea")))
              : (chatPersonalComposerEl || (chatPersonalComposerMount && chatPersonalComposerMount.querySelector("textarea")));
          if (!composer) composer = chatComposerEl || chatSharedComposerEl;
          if (composer && isChatComposerVirtualKeyboardOpenForRetention(composer)) return;
          window.__pokerChatSuppressFocusAfterSendUntil = Date.now() + 2500;
          window.__pokerChatSuppressFocusAfterSendMode = mode;
          window.__pokerChatSuppressFocusAfterEmojiOnlySendUntil = Date.now() + 2500;
          window.__pokerChatSuppressFocusAfterEmojiOnlySendMode = mode;
        } catch (eClosedKeyboardSendSuppress) {}
      }
      function keepComposerFocusOnPress(e) {
        try {
          if (e && typeof e.preventDefault === "function") e.preventDefault();
          var mode = sendButtonMode();
          if (hasSendableContent(mode)) return;
          if (typeof window.__pokerKeepChatComposerFocusAfterSend === "function") {
            window.__pokerKeepChatComposerFocusAfterSend(mode);
          } else if (chatComposerEl && chatComposerEl.focus) {
            chatComposerEl.focus({ preventScroll: true });
          }
        } catch (eKeepPress) {}
      }
      function invoke(e) {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        var now = Date.now();
        if (now - lastInvoke < 520) return;
        lastInvoke = now;
        try {
          flushChatComposerToDrafts();
        } catch (eInv) {}
        markClosedKeyboardSendFocusSuppression(sendButtonMode());
        run();
      }
      btn.addEventListener("pointerdown", function (e) {
        if (e && e.isPrimary === false) return;
        keepComposerFocusOnPress(e);
      }, { passive: false, capture: true });
      btn.addEventListener("mousedown", function (e) {
        keepComposerFocusOnPress(e);
      }, { capture: true });
      btn.addEventListener("click", function (e) {
        invoke(e);
      });
      btn.addEventListener(
        "pointerup",
        function (e) {
          if (!e.isPrimary) return;
          if (e.pointerType === "mouse") return;
          invoke(e);
        },
        { passive: false }
      );
    }
    (function initVoiceRecording() {
      var voiceTarget = null;
      var voiceStream = null;
      var voiceChunks = [];
      var voiceRecorder = null;
      /** true с начала onstop до сборки blob или discard — иначе второй тап даёт ветку «!voiceRecorder» и срывает превью. */
      var voiceFinalizeInProgress = false;
      var voiceRecordStartTime = null;
      var voiceRecordTimerInterval = null;
      var generalTimerEl = document.getElementById("chatGeneralVoiceTimer");
      var personalTimerEl = document.getElementById("chatPersonalVoiceTimer");
      var generalBtn = generalVoiceBtn || generalSendBtnRef;
      var personalBtn = document.getElementById("chatPersonalVoiceBtn") || sendBtnRef;
      function stopVoiceTimer() {
        if (voiceRecordTimerInterval) {
          clearInterval(voiceRecordTimerInterval);
          voiceRecordTimerInterval = null;
        }
        voiceRecordStartTime = null;
      }
      function updateVoiceTimer() {
        if (voiceRecordStartTime == null) return;
        var sec = Math.floor((Date.now() - voiceRecordStartTime) / 1000);
        if (generalTimerEl) generalTimerEl.textContent = String(sec);
        if (personalTimerEl) personalTimerEl.textContent = String(sec);
      }
      function startVoiceTimer() {
        stopVoiceTimer();
        voiceRecordStartTime = Date.now();
        if (generalTimerEl) generalTimerEl.textContent = "0";
        if (personalTimerEl) personalTimerEl.textContent = "0";
        updateVoiceTimer();
        voiceRecordTimerInterval = setInterval(updateVoiceTimer, 1000);
      }
      function stopAndDiscard() {
        voiceFinalizeInProgress = false;
        voiceTarget = null;
        stopVoiceTimer();
        if (voiceRecorder && voiceRecorder.state !== "inactive") voiceRecorder.stop();
        voiceRecorder = null;
        if (voiceStream) {
          voiceStream.getTracks().forEach(function (t) { t.stop(); });
          voiceStream = null;
        }
        voiceChunks = [];
      }
      function startRecording(target) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (tg && tg.showAlert) tg.showAlert("Микрофон не поддерживается");
          return;
        }
        voiceFinalizeInProgress = false;
        voiceTarget = target;
        if (target === "general") {
          if (generalBtn) { generalBtn.classList.add("chat-voice-btn--recording"); generalBtn.title = "Остановить запись"; }
          if (generalVoicePreviewEl) {
            generalVoicePreviewEl.classList.remove("chat-voice-preview--hidden");
            generalVoicePreviewEl.classList.add("chat-voice-preview--recording");
          }
        }
        if (target === "personal") {
          if (personalBtn) { personalBtn.classList.add("chat-voice-btn--recording"); personalBtn.title = "Остановить запись"; }
          var pvPrev = document.getElementById("chatPersonalVoicePreview");
          if (pvPrev) {
            pvPrev.classList.remove("chat-voice-preview--hidden");
            pvPrev.classList.add("chat-voice-preview--recording");
          }
        }
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          if (voiceTarget !== target) {
            stream.getTracks().forEach(function (t) { t.stop(); });
            return;
          }
          voiceStream = stream;
          voiceChunks = [];
          var opts = { audioBitsPerSecond: 64000 };
          try {
            voiceRecorder = new MediaRecorder(stream, opts);
          } catch (e) {
            voiceRecorder = new MediaRecorder(stream);
          }
          var savedTarget = target;
          voiceRecorder.ondataavailable = function (e) { if (e.data && e.data.size > 0) voiceChunks.push(e.data); };
          voiceRecorder.onstop = function () {
            stopVoiceTimer();
            var mime = (voiceRecorder && voiceRecorder.mimeType) ? voiceRecorder.mimeType : "audio/webm";
            voiceFinalizeInProgress = true;
            voiceRecorder = null;
            if (voiceStream) {
              voiceStream.getTracks().forEach(function (t) { t.stop(); });
              voiceStream = null;
            }
            var dest = savedTarget;
            var voiceFinalizeDone = false;
            var voiceAssembleDelaysMs = [0, 40, 100, 220, 450, 800];
            function discardEmptyVoiceUi() {
              voiceFinalizeInProgress = false;
              if (dest === "general") {
                if (generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; }
                if (generalVoicePreviewEl) {
                  generalVoicePreviewEl.classList.remove("chat-voice-preview--recording");
                  generalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
                }
              }
              if (dest === "personal") {
                if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
                var pvH = document.getElementById("chatPersonalVoicePreview");
                if (pvH) { pvH.classList.remove("chat-voice-preview--recording"); pvH.classList.add("chat-voice-preview--hidden"); }
              }
              voiceTarget = null;
            }
            function tryAssembleVoiceBlob(attemptIdx) {
              if (voiceFinalizeDone) return;
              if (voiceChunks.length === 0) {
                if (attemptIdx < voiceAssembleDelaysMs.length) {
                  setTimeout(function () {
                    tryAssembleVoiceBlob(attemptIdx + 1);
                  }, voiceAssembleDelaysMs[attemptIdx]);
                } else {
                  voiceFinalizeDone = true;
                  discardEmptyVoiceUi();
                }
                return;
              }
              voiceFinalizeDone = true;
              var blob = new Blob(voiceChunks, { type: mime });
              voiceChunks = [];
              var reader = new FileReader();
              reader.onerror = function () {
                discardEmptyVoiceUi();
              };
              reader.onloadend = function () {
                voiceFinalizeInProgress = false;
                var dataUrl = reader.result;
                if (typeof dataUrl === "string") dataUrl = pokerNormalizeVoiceDataUrl(dataUrl, mime);
                if (dest === "general") {
                  generalVoice = dataUrl;
                  if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
                  if (generalVoicePreviewEl) {
                    generalVoicePreviewEl.classList.remove("chat-voice-preview--recording");
                    generalVoicePreviewEl.classList.remove("chat-voice-preview--hidden");
                  }
                } else if (dest === "personal") {
                  personalVoice = dataUrl;
                  if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
                  var pv = document.getElementById("chatPersonalVoicePreview");
                  if (pv) {
                    pv.classList.remove("chat-voice-preview--recording");
                    pv.classList.remove("chat-voice-preview--hidden");
                  }
                }
                voiceTarget = null;
              };
              reader.readAsDataURL(blob);
            }
            /* WebKit/TG WebView: dataavailable может прийти с задержкой после onstop. */
            setTimeout(function () {
              tryAssembleVoiceBlob(0);
            }, 0);
          };
          try {
            voiceRecorder.start(250);
          } catch (eStartSlice) {
            voiceRecorder.start();
          }
          startVoiceTimer();
        }).catch(function () {
          voiceTarget = null;
          stopVoiceTimer();
          if (target === "general" && generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); } }
          if (target === "personal") {
            if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
            var pvErr = document.getElementById("chatPersonalVoicePreview");
            if (pvErr) { pvErr.classList.remove("chat-voice-preview--recording"); pvErr.classList.add("chat-voice-preview--hidden"); }
          }
          if (tg && tg.showAlert) tg.showAlert("Нет доступа к микрофону");
        });
      }
      function runGeneralSendAction() {
        if (voiceTarget === "general") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          }
          if (generalBtn) {
            generalBtn.classList.remove("chat-voice-btn--recording");
            generalBtn.title = "Голосовое сообщение";
          }
          if (generalSendBtnRef && typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        } else if (voiceTarget === "personal") {
          stopAndDiscard();
          if (personalBtn) personalBtn.classList.remove("chat-voice-btn--recording");
          var pvPrev = document.getElementById("chatPersonalVoicePreview");
          if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          startRecording("general");
        } else if (getChatGeneralText().trim() || generalImage || generalVoice || generalDocument) {
          sendGeneral();
        } else {
          startRecording("general");
        }
      }
      bindChatSendTap(generalBtn, runGeneralSendAction);
      if (generalVoiceRemove && generalVoicePreviewEl) {
        generalVoiceRemove.addEventListener("click", function () {
          generalVoice = null;
          generalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
          if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        });
      }
      var generalVoiceSend = document.getElementById("chatGeneralVoiceSend");
      if (generalVoiceSend) generalVoiceSend.addEventListener("click", function () { sendGeneral(); });
      var generalVoiceStop = document.getElementById("chatGeneralVoiceStop");
      if (generalVoiceStop) generalVoiceStop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (voiceTarget === "general") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          }
          if (generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; }
          if (generalSendBtnRef && typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        }
      });
      var personalVoiceRemove = document.getElementById("chatPersonalVoiceRemove");
      var personalVoicePreviewEl = document.getElementById("chatPersonalVoicePreview");
      function runPersonalSendAction() {
        if (voiceTarget === "personal") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            var pvPrev = document.getElementById("chatPersonalVoicePreview");
            if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          }
          if (personalBtn) {
            personalBtn.classList.remove("chat-voice-btn--recording");
            personalBtn.title = "Голосовое сообщение";
          }
          if (sendBtnRef && typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        } else if (voiceTarget === "general") {
          stopAndDiscard();
          if (generalBtn) generalBtn.classList.remove("chat-voice-btn--recording");
          if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          startRecording("personal");
        } else if (getChatPersonalText().trim() || personalImage || personalVoice || personalDocument) {
          sendMessage();
        } else {
          startRecording("personal");
        }
      }
      bindChatSendTap(personalBtn, runPersonalSendAction);
      if (personalVoiceRemove && personalVoicePreviewEl) {
        personalVoiceRemove.addEventListener("click", function () {
          personalVoice = null;
          personalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
          if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        });
      }
      var personalVoiceSend = document.getElementById("chatPersonalVoiceSend");
      if (personalVoiceSend) personalVoiceSend.addEventListener("click", function () { sendMessage(); });
      var personalVoiceStop = document.getElementById("chatPersonalVoiceStop");
      if (personalVoiceStop) personalVoiceStop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (voiceTarget === "personal") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            var pvPrev = document.getElementById("chatPersonalVoicePreview");
            if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          }
          if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
          if (sendBtnRef && typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        }
      });
    })();

    // Личный чат: запасной touchend только если есть отдельная кнопка 🎤 (personalBtn внутри IIFE выше — снаружи не видна; иначе ReferenceError и обрыв всего app.js после initChat).
    if (sendBtn && chatComposerEl && document.getElementById("chatPersonalVoiceBtn")) {
      sendBtn.addEventListener("touchend", function (e) {
        var hasContentP = getChatPersonalText().trim() || personalImage || personalVoice || personalDocument;
        if (!hasContentP) return;
        e.preventDefault();
        e.stopPropagation();
        sendMessage();
      }, { passive: false });
    }
    function updateGeneralSendBtnIcon() {
      if (!generalSendBtn) return;
      if (sendingGeneral) return;
      var hasContent = getChatGeneralText().trim() || generalImage || generalVoice || generalDocument;
      generalSendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
      generalSendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
      generalSendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
      generalSendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
    }
    function updatePersonalSendBtnIcon() {
      if (!sendBtn) return;
      if (sendingPrivate) return;
      var hasContent = getChatPersonalText().trim() || personalImage || personalVoice || personalDocument;
      sendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
      sendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
      sendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
      sendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
    }
	    function resizeChatTextarea(ta) {
	      if (ta && typeof chatComposerValueHasTextForHeight === "function" && !chatComposerValueHasTextForHeight(ta.value || "")) {
	        try {
	          ta.style.height = "44px";
	          ta.style.minHeight = "44px";
	          ta.style.overflowY = "hidden";
	          ta.style.removeProperty("max-height");
	        } catch (eEmojiOnlyTaHeight) {}
	        return;
	      }
	      if (
	        ta &&
        (
          isTelegramChatRuntime() ||
          (
            typeof shouldUseNativeTelegramIosChatComposerFlow === "function" &&
            shouldUseNativeTelegramIosChatComposerFlow(ta)
          )
        )
      ) {
        try {
          ta.style.height = "44px";
          ta.style.minHeight = "44px";
          ta.style.maxHeight = "44px";
          ta.style.overflowY = "hidden";
        } catch (eTmaFreezeTa) {}
        return;
	      }
	      if (typeof pokerAutosizeTextarea === "function") {
	        pokerAutosizeTextarea(ta, {
	          maxHeight: 140,
	          minHeight: 44,
	          measureValue: typeof chatComposerValueForHeight === "function" ? chatComposerValueForHeight(ta.value || "") : ta.value
	        });
	      }
	    }
    function isDirectMountedChatComposer(ta, mode) {
      if (!ta) return false;
      if (mode === "general") return ta === chatGeneralComposerEl || (!!chatGeneralComposerMount && chatGeneralComposerMount.contains(ta));
      if (mode === "personal") return ta === chatPersonalComposerEl || (!!chatPersonalComposerMount && chatPersonalComposerMount.contains(ta));
      return false;
    }
    function bindChatComposerInputEvents(ta) {
      if (!ta || ta.__pokerChatInputEventsBound) return;
      ta.__pokerChatInputEventsBound = true;
      ta.addEventListener("input", function () {
        chatComposerEl = ta;
        flushChatComposerToDrafts();
        resizeChatTextarea(ta);
        try {
          if (document.body.classList.contains("chat-keyboard-open") && !shouldUseNativeTelegramIosChatComposerFlow(ta)) {
            var rafI = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            rafI(function () {
              try {
                updateChatMessagesKeyboardPad();
              } catch (eSynI) {}
            });
          }
        } catch (ePadSyn) {}
        updateGeneralSendBtnIcon();
        updatePersonalSendBtnIcon();
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          if ((ta.value || "").trim()) {
            pokerChatSendTypingState(true);
            pokerChatScheduleTypingStop();
          } else {
            clearChatTypingStopTimer();
            pokerChatSendTypingState(false);
          }
        }
        try {
          var rawV = ta.value || "";
          var trimmedV = rawV.trim();
          var modalOpen = chatTemplatesModal && chatTemplatesModal.getAttribute("aria-hidden") === "false";
          if (!modalOpen && trimmedV === "/") {
            ta.value = "";
            flushChatComposerToDrafts();
            updateGeneralSendBtnIcon();
            updatePersonalSendBtnIcon();
            resizeChatTextarea(ta);
            if (isDirectMountedChatComposer(ta, "general") || chatComposerMounted === "general") showTemplatesMenu("general");
            else if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") showTemplatesMenu("personal");
          }
        } catch (err) {}
      });
      ta.addEventListener("focus", function () {
        chatComposerEl = ta;
        resizeChatTextarea(ta);
        if ((isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") && (ta.value || "").trim()) {
          pokerChatSendTypingState(true);
          pokerChatScheduleTypingStop();
        }
      });
      ta.addEventListener("change", function () {
        chatComposerEl = ta;
        flushChatComposerToDrafts();
        updateGeneralSendBtnIcon();
        updatePersonalSendBtnIcon();
      });
      ta.addEventListener("blur", function () {
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          clearChatTypingStopTimer();
          pokerChatSendTypingState(false);
        }
      });
      ta.addEventListener("keydown", function (e) {
        chatComposerEl = ta;
        if (e.key !== "Enter" || e.shiftKey) return;
        try {
          if (chatPersonalComposerMount && chatPersonalComposerMount.contains(ta)) {
            e.preventDefault();
            sendMessage();
            return;
          }
          if (chatGeneralComposerMount && chatGeneralComposerMount.contains(ta)) {
            e.preventDefault();
            sendGeneral();
            return;
          }
        } catch (eKd) {}
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          e.preventDefault();
          sendMessage();
        } else if (isDirectMountedChatComposer(ta, "general") || chatComposerMounted === "general") {
          e.preventDefault();
          sendGeneral();
        }
      });
      resizeChatTextarea(ta);
    }
    (function () {
      var chatComposerInputTargets = [
        chatSharedComposerEl,
        chatGeneralComposerEl,
        chatPersonalComposerEl
      ];
      chatComposerInputTargets.forEach(bindChatComposerInputEvents);
    })();
    updateGeneralSendBtnIcon();
    var generalReplyCancel = document.querySelector("#chatGeneralReplyPreview .chat-reply-preview__cancel");
    if (generalReplyCancel) generalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "general") {
        clearChatEditUI();
        return;
      }
      generalReplyTo = null;
      var p = document.getElementById("chatGeneralReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    var personalFileInput = document.getElementById("chatPersonalFileInput");
    var personalPdfInput = document.getElementById("chatPersonalPdfInput");
    var personalAttachBtn = document.getElementById("chatPersonalAttachBtn");
    var personalAttachDropdown = document.getElementById("chatPersonalAttachDropdown");
    var personalImagePreview = document.getElementById("chatPersonalImagePreview");
    function closePersonalAttachDropdown() {
      if (personalAttachDropdown) { personalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); personalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (personalAttachBtn) personalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", personalAttachDropdownOutside);
    }
    function personalAttachDropdownOutside(e) {
      if (personalAttachDropdown && !personalAttachDropdown.contains(e.target) && personalAttachBtn && !personalAttachBtn.contains(e.target)) closePersonalAttachDropdown();
    }
    if (personalAttachBtn && personalFileInput) {
      personalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (personalAttachDropdown && personalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          personalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          personalAttachDropdown.setAttribute("aria-hidden", "false");
          personalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", personalAttachDropdownOutside); }, 0);
        } else closePersonalAttachDropdown();
      });
      if (personalAttachDropdown) {
        personalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") personalFileInput.click();
            else if (action === "document" && personalPdfInput) personalPdfInput.click();
            closePersonalAttachDropdown();
          });
        });
      }
      personalFileInput.addEventListener("change", function () {
        var f = personalFileInput.files && personalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        personalDocument = null;
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          personalImage = dataUrl;
          updatePersonalSendBtnIcon();
          if (personalImagePreview) {
            personalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            personalImagePreview.classList.add("chat-image-preview--visible");
            personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              personalImage = null; personalFileInput.value = "";
              updatePersonalSendBtnIcon();
              personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        personalFileInput.value = "";
      });
      if (personalPdfInput) {
        personalPdfInput.addEventListener("change", function () {
          var f = personalPdfInput.files && personalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            personalPdfInput.value = "";
            return;
          }
          personalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              personalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updatePersonalSendBtnIcon();
              if (personalImagePreview) {
                personalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(personalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                personalImagePreview.classList.add("chat-image-preview--visible");
                personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  personalDocument = null; personalPdfInput.value = "";
                  updatePersonalSendBtnIcon();
                  personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          personalPdfInput.value = "";
        });
      }
    }
    updatePersonalSendBtnIcon();
    var personalReplyCancel = document.querySelector("#chatPersonalReplyPreview .chat-reply-preview__cancel");
    if (personalReplyCancel) personalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "personal") {
        clearChatEditUI();
        return;
      }
      personalReplyTo = null;
      var p = document.getElementById("chatPersonalReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    if (generalMessages) {
      generalMessages.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "general"));
      });
    }
    if (messagesEl) {
      messagesEl.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "personal"));
      });
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
