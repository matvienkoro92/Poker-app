// Chat presence, typing state, and open-DM focus pings.

function initChatPresenceTyping(opts) {
  opts = opts || {};
  var chatPeerTypingActive = false;
  var chatTypingLastSentAt = 0;
  var chatTypingStopTimer = 0;
  var chatDmFocusPingTimer = null;
  var chatDmFocusSessionHeld = false;
  var CHAT_DM_FOCUS_PING_MS = 22000;

  function getBase() {
    return typeof opts.getBase === "function" ? opts.getBase() : opts.base || "";
  }

  function getChatWithUserId() {
    return typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId() : "";
  }

  function getChatActiveTab() {
    return typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab() : "";
  }

  function getConvView() {
    return typeof opts.getConvView === "function" ? opts.getConvView() : null;
  }

  function getConvTitleId() {
    return typeof opts.getConvTitleId === "function" ? opts.getConvTitleId() : null;
  }

  function setTextContentIfChangedSafe(el, txt) {
    if (typeof opts.setTextContentIfChanged === "function") opts.setTextContentIfChanged(el, txt);
    else if (el && el.textContent !== String(txt || "")) el.textContent = String(txt || "");
  }

  function pokerChatDmFocusBrowserForegroundOk() {
    try {
      if (typeof document === "undefined" || document.visibilityState !== "visible") return false;
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.isActive === "boolean") return tg.isActive;
      if (typeof document.hasFocus === "function" && !document.hasFocus()) return false;
      return true;
    } catch (eFg) {
      return false;
    }
  }

  function postChatDmFocusPing(peerId) {
    if (!peerId || typeof fetch !== "function") return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    try {
      fetch(getBase() + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: "dmFocusPing", with: peerId })),
      }).catch(function () {});
    } catch (ePing) {}
  }

  function stopChatDmFocusSession() {
    if (chatDmFocusPingTimer) {
      clearInterval(chatDmFocusPingTimer);
      chatDmFocusPingTimer = null;
    }
    if (!chatDmFocusSessionHeld) return;
    chatDmFocusSessionHeld = false;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    try {
      fetch(getBase() + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: "dmFocusClear" })),
      }).catch(function () {});
    } catch (eClr) {}
  }

  function pokerUpdateChatDmFocusFromUiState() {
    var viewChat = false;
    try {
      viewChat = document.body && document.body.getAttribute("data-view") === "chat";
    } catch (eVw) {}
    var convView = getConvView();
    var convOpen = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
    var peer = getChatWithUserId() && String(getChatWithUserId()).trim() ? String(getChatWithUserId()).trim() : "";
    var shouldPing =
      viewChat && pokerChatDmFocusBrowserForegroundOk() && getChatActiveTab() === "personal" && convOpen && !!peer;
    if (!shouldPing) {
      stopChatDmFocusSession();
      return;
    }
    postChatDmFocusPing(peer);
    if (!chatDmFocusPingTimer) {
      chatDmFocusSessionHeld = true;
      chatDmFocusPingTimer = setInterval(function () {
        var v2 = false;
        try {
          v2 = document.body && document.body.getAttribute("data-view") === "chat";
        } catch (eV2) {}
        var fg2 = pokerChatDmFocusBrowserForegroundOk();
        var co2 = !!(getConvView() && !getConvView().classList.contains("chat-conv-view--hidden"));
        var p2 = getChatWithUserId() && String(getChatWithUserId()).trim() ? String(getChatWithUserId()).trim() : "";
        if (!v2 || !fg2 || getChatActiveTab() !== "personal" || !co2 || !p2) {
          stopChatDmFocusSession();
          return;
        }
        postChatDmFocusPing(p2);
      }, CHAT_DM_FOCUS_PING_MS);
    }
  }

  function updateConvTypingUi() {
    var convTitleId = getConvTitleId();
    var convView = getConvView();
    var chatWithUserId = getChatWithUserId();
    if (!convTitleId) return;
    if (getChatActiveTab() !== "personal" || !chatWithUserId || !convView || convView.classList.contains("chat-conv-view--hidden")) return;
    if (String(chatWithUserId).indexOf("group_") === 0) return;
    if (chatPeerTypingActive) {
      var stableP21 = typeof opts.resolveChatConvTitleP21Id === "function" ? opts.resolveChatConvTitleP21Id(chatWithUserId) : "";
      if (stableP21) {
        if (typeof opts.setChatConvTitleIdText === "function") opts.setChatConvTitleIdText(stableP21);
      } else {
        setTextContentIfChangedSafe(convTitleId, "печатает…");
        if (typeof opts.syncChatConvTitleMetaVisibility === "function") opts.syncChatConvTitleMetaVisibility();
      }
    }
  }

  function pokerChatSendTypingState(active) {
    var chatWithUserId = getChatWithUserId();
    var on = !!active;
    if (!chatWithUserId || String(chatWithUserId).indexOf("group_") === 0) return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var now = Date.now();
    if (on && now - chatTypingLastSentAt < 2500) return;
    chatTypingLastSentAt = now;
    fetch(getBase() + "/api/chat", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({
          action: "typing",
          with: chatWithUserId,
          active: on ? 1 : 0,
        })
      ),
    }).catch(function () {});
  }

  function clearChatTypingStopTimer() {
    if (chatTypingStopTimer) {
      clearTimeout(chatTypingStopTimer);
      chatTypingStopTimer = 0;
    }
  }

  function pokerChatScheduleTypingStop() {
    clearChatTypingStopTimer();
    chatTypingStopTimer = setTimeout(function () {
      chatTypingStopTimer = 0;
      pokerChatSendTypingState(false);
    }, 3200);
  }

  function setChatPeerTypingActive(value) {
    chatPeerTypingActive = !!value;
  }

  try {
    window.__pokerStopChatDmFocusSession = stopChatDmFocusSession;
    window.pokerUpdateChatDmFocusFromUiState = pokerUpdateChatDmFocusFromUiState;
  } catch (eExpose) {}

  return {
    clearChatTypingStopTimer: clearChatTypingStopTimer,
    getChatTypingStopTimer: function () { return chatTypingStopTimer; },
    pokerChatScheduleTypingStop: pokerChatScheduleTypingStop,
    pokerChatSendTypingState: pokerChatSendTypingState,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    setChatPeerTypingActive: setChatPeerTypingActive,
    setChatTypingStopTimer: function (value) { chatTypingStopTimer = value; },
    stopChatDmFocusSession: stopChatDmFocusSession,
    updateConvTypingUi: updateConvTypingUi,
  };
}
