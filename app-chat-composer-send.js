// Chat composer input binding, send button taps, textarea sizing, and send icon state.

function initChatComposerSendRuntime(opts) {
  opts = opts || {};
  var generalSendBtn = opts.generalSendBtn || null;
  var sendBtn = opts.sendBtn || null;
  var chatSharedComposerEl = opts.chatSharedComposerEl || null;
  var chatGeneralComposerMount = opts.chatGeneralComposerMount || null;
  var chatPersonalComposerMount = opts.chatPersonalComposerMount || null;
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var setChatComposerEl = typeof opts.setChatComposerEl === "function" ? opts.setChatComposerEl : function () {};
  var getChatComposerMounted = typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted : function () { return "detached"; };
  var getChatGeneralComposerEl = typeof opts.getChatGeneralComposerEl === "function" ? opts.getChatGeneralComposerEl : function () { return null; };
  var getChatPersonalComposerEl = typeof opts.getChatPersonalComposerEl === "function" ? opts.getChatPersonalComposerEl : function () { return null; };
  var getChatGeneralText = typeof opts.getChatGeneralText === "function" ? opts.getChatGeneralText : function () { return ""; };
  var getChatPersonalText = typeof opts.getChatPersonalText === "function" ? opts.getChatPersonalText : function () { return ""; };
  var getGeneralImage = typeof opts.getGeneralImage === "function" ? opts.getGeneralImage : function () { return null; };
  var getGeneralVoice = typeof opts.getGeneralVoice === "function" ? opts.getGeneralVoice : function () { return null; };
  var getGeneralDocument = typeof opts.getGeneralDocument === "function" ? opts.getGeneralDocument : function () { return null; };
  var getPersonalImage = typeof opts.getPersonalImage === "function" ? opts.getPersonalImage : function () { return null; };
  var getPersonalVoice = typeof opts.getPersonalVoice === "function" ? opts.getPersonalVoice : function () { return null; };
  var getPersonalDocument = typeof opts.getPersonalDocument === "function" ? opts.getPersonalDocument : function () { return null; };
  var getSendingGeneral = typeof opts.getSendingGeneral === "function" ? opts.getSendingGeneral : function () { return false; };
  var getSendingPrivate = typeof opts.getSendingPrivate === "function" ? opts.getSendingPrivate : function () { return false; };
  var flushChatComposerToDrafts = typeof opts.flushChatComposerToDrafts === "function" ? opts.flushChatComposerToDrafts : function () {};
  var sendGeneral = typeof opts.sendGeneral === "function" ? opts.sendGeneral : function () {};
  var sendMessage = typeof opts.sendMessage === "function" ? opts.sendMessage : function () {};
  var isChatComposerVirtualKeyboardOpenForRetention =
    typeof opts.isChatComposerVirtualKeyboardOpenForRetention === "function" ? opts.isChatComposerVirtualKeyboardOpenForRetention : null;
  var chatComposerValueHasTextForHeight =
    typeof opts.chatComposerValueHasTextForHeight === "function" ? opts.chatComposerValueHasTextForHeight : null;
  var chatComposerValueForHeight =
    typeof opts.chatComposerValueForHeight === "function" ? opts.chatComposerValueForHeight : null;
  var isTelegramChatRuntime =
    typeof opts.isTelegramChatRuntime === "function" ? opts.isTelegramChatRuntime : function () { return false; };
  var shouldUseNativeTelegramIosChatComposerFlow =
    typeof opts.shouldUseNativeTelegramIosChatComposerFlow === "function" ? opts.shouldUseNativeTelegramIosChatComposerFlow : function () { return false; };
  var updateChatMessagesKeyboardPad =
    typeof opts.updateChatMessagesKeyboardPad === "function" ? opts.updateChatMessagesKeyboardPad : function () {};
  var pokerChatSendTypingState =
    typeof opts.pokerChatSendTypingState === "function" ? opts.pokerChatSendTypingState : function () {};
  var pokerChatScheduleTypingStop =
    typeof opts.pokerChatScheduleTypingStop === "function" ? opts.pokerChatScheduleTypingStop : function () {};
  var clearChatTypingStopTimer =
    typeof opts.clearChatTypingStopTimer === "function" ? opts.clearChatTypingStopTimer : function () {};
  var showTemplatesMenu = typeof opts.showTemplatesMenu === "function" ? opts.showTemplatesMenu : function () {};

  function composerForMode(mode) {
    return mode === "general"
      ? getChatGeneralComposerEl() || (chatGeneralComposerMount && chatGeneralComposerMount.querySelector("textarea"))
      : getChatPersonalComposerEl() || (chatPersonalComposerMount && chatPersonalComposerMount.querySelector("textarea"));
  }

  function hasSendableContent(mode) {
    try {
      flushChatComposerToDrafts();
    } catch (eFlushSendable) {}
    if (mode === "general") return !!(getChatGeneralText().trim() || getGeneralImage() || getGeneralVoice() || getGeneralDocument());
    return !!(getChatPersonalText().trim() || getPersonalImage() || getPersonalVoice() || getPersonalDocument());
  }

  function updateGeneralSendBtnIcon() {
    if (!generalSendBtn) return;
    if (getSendingGeneral()) return;
    var hasContent = hasSendableContent("general");
    generalSendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
    generalSendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
    generalSendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
    generalSendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
  }

  function updatePersonalSendBtnIcon() {
    if (!sendBtn) return;
    if (getSendingPrivate()) return;
    var hasContent = hasSendableContent("personal");
    sendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
    sendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
    sendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
    sendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
  }

  function resizeChatTextarea(ta) {
    if (ta && chatComposerValueHasTextForHeight && !chatComposerValueHasTextForHeight(ta.value || "")) {
      try {
        ta.style.height = "44px";
        ta.style.minHeight = "44px";
        ta.style.overflowY = "hidden";
        ta.style.removeProperty("max-height");
      } catch (eEmojiOnlyTaHeight) {}
      return;
    }
    if (ta && (isTelegramChatRuntime() || shouldUseNativeTelegramIosChatComposerFlow(ta))) {
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
        measureValue: chatComposerValueForHeight ? chatComposerValueForHeight(ta.value || "") : ta.value,
      });
    }
  }

  function markClosedKeyboardSendFocusSuppression(mode) {
    try {
      if (!hasSendableContent(mode)) return;
      var composer = composerForMode(mode);
      if (!composer) composer = getChatComposerEl() || chatSharedComposerEl;
      if (
        composer &&
        typeof isChatComposerVirtualKeyboardOpenForRetention === "function" &&
        isChatComposerVirtualKeyboardOpenForRetention(composer)
      ) return;
      window.__pokerChatSuppressFocusAfterSendUntil = Date.now() + 2500;
      window.__pokerChatSuppressFocusAfterSendMode = mode;
      window.__pokerChatSuppressFocusAfterEmojiOnlySendUntil = Date.now() + 2500;
      window.__pokerChatSuppressFocusAfterEmojiOnlySendMode = mode;
    } catch (eClosedKeyboardSendSuppress) {}
  }

  function bindChatSendTap(btn, run, options) {
    if (!btn || typeof run !== "function") return;
    options = options || {};
    var key = "_pokerChatSendTapBound";
    if (btn[key]) {
      if (!options.replace) return;
      if (typeof btn._pokerChatSendTapUnbind === "function") {
        try {
          btn._pokerChatSendTapUnbind();
        } catch (eUnbindTap) {}
      }
      btn[key] = false;
    }
    btn[key] = true;
    var lastInvoke = 0;
    function sendButtonMode() {
      return btn === generalSendBtn || (btn && btn.id === "chatGeneralSendBtn") ? "general" : "personal";
    }
    function keepComposerFocusOnPress(e) {
      try {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        var mode = sendButtonMode();
        if (hasSendableContent(mode)) return;
        if (typeof window.__pokerKeepChatComposerFocusAfterSend === "function") {
          window.__pokerKeepChatComposerFocusAfterSend(mode);
        } else {
          var composer = getChatComposerEl();
          if (composer && composer.focus) composer.focus({ preventScroll: true });
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
    var pointerDownHandler = function (e) {
      if (e && e.isPrimary === false) return;
      keepComposerFocusOnPress(e);
    };
    var mouseDownHandler = function (e) { keepComposerFocusOnPress(e); };
    var clickHandler = function (e) { invoke(e); };
    var pointerUpHandler = function (e) {
      if (!e.isPrimary) return;
      if (e.pointerType === "mouse") return;
      invoke(e);
    };
    btn.addEventListener("pointerdown", pointerDownHandler, { passive: false, capture: true });
    btn.addEventListener("mousedown", mouseDownHandler, { capture: true });
    btn.addEventListener("click", clickHandler);
    btn.addEventListener(
      "pointerup",
      pointerUpHandler,
      { passive: false }
    );
    btn._pokerChatSendTapUnbind = function () {
      try { btn.removeEventListener("pointerdown", pointerDownHandler, true); } catch (eRemovePointerDown) {}
      try { btn.removeEventListener("mousedown", mouseDownHandler, true); } catch (eRemoveMouseDown) {}
      try { btn.removeEventListener("click", clickHandler); } catch (eRemoveClick) {}
      try { btn.removeEventListener("pointerup", pointerUpHandler); } catch (eRemovePointerUp) {}
    };
  }

  function isDirectMountedChatComposer(ta, mode) {
    if (!ta) return false;
    if (mode === "general") return ta === getChatGeneralComposerEl() || (!!chatGeneralComposerMount && chatGeneralComposerMount.contains(ta));
    if (mode === "personal") return ta === getChatPersonalComposerEl() || (!!chatPersonalComposerMount && chatPersonalComposerMount.contains(ta));
    return false;
  }

  function bindChatComposerInputEvents(ta) {
    if (!ta || ta.__pokerChatInputEventsBound) return;
    ta.__pokerChatInputEventsBound = true;
    ta.addEventListener("input", function () {
      setChatComposerEl(ta);
      flushChatComposerToDrafts();
      resizeChatTextarea(ta);
      try {
        if (document.body.classList.contains("chat-keyboard-open") && !shouldUseNativeTelegramIosChatComposerFlow(ta)) {
          var rafI = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
          rafI(function () {
            try {
              updateChatMessagesKeyboardPad();
            } catch (eSynI) {}
          });
        }
      } catch (ePadSyn) {}
      updateGeneralSendBtnIcon();
      updatePersonalSendBtnIcon();
      if (isDirectMountedChatComposer(ta, "personal") || getChatComposerMounted() === "personal") {
        if ((ta.value || "").trim()) {
          pokerChatSendTypingState(true);
          pokerChatScheduleTypingStop();
        } else {
          clearChatTypingStopTimer();
          pokerChatSendTypingState(false);
        }
      }
      try {
        var trimmedV = (ta.value || "").trim();
        var chatTemplatesModal = document.getElementById("chatTemplatesModal");
        var modalOpen = chatTemplatesModal && chatTemplatesModal.getAttribute("aria-hidden") === "false";
        if (!modalOpen && trimmedV === "/") {
          ta.value = "";
          flushChatComposerToDrafts();
          updateGeneralSendBtnIcon();
          updatePersonalSendBtnIcon();
          resizeChatTextarea(ta);
          if (isDirectMountedChatComposer(ta, "general") || getChatComposerMounted() === "general") showTemplatesMenu("general");
          else if (isDirectMountedChatComposer(ta, "personal") || getChatComposerMounted() === "personal") showTemplatesMenu("personal");
        }
      } catch (err) {}
    });
    ta.addEventListener("focus", function () {
      setChatComposerEl(ta);
      resizeChatTextarea(ta);
      if ((isDirectMountedChatComposer(ta, "personal") || getChatComposerMounted() === "personal") && (ta.value || "").trim()) {
        pokerChatSendTypingState(true);
        pokerChatScheduleTypingStop();
      }
    });
    ta.addEventListener("change", function () {
      setChatComposerEl(ta);
      flushChatComposerToDrafts();
      updateGeneralSendBtnIcon();
      updatePersonalSendBtnIcon();
    });
    ta.addEventListener("blur", function () {
      if (isDirectMountedChatComposer(ta, "personal") || getChatComposerMounted() === "personal") {
        clearChatTypingStopTimer();
        pokerChatSendTypingState(false);
      }
    });
    ta.addEventListener("keydown", function (e) {
      setChatComposerEl(ta);
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
      if (isDirectMountedChatComposer(ta, "personal") || getChatComposerMounted() === "personal") {
        e.preventDefault();
        sendMessage();
      } else if (isDirectMountedChatComposer(ta, "general") || getChatComposerMounted() === "general") {
        e.preventDefault();
        sendGeneral();
      }
    });
    resizeChatTextarea(ta);
  }

  function bindInitialComposerInputEvents() {
    [chatSharedComposerEl, getChatGeneralComposerEl(), getChatPersonalComposerEl()].forEach(bindChatComposerInputEvents);
  }

  function bindPersonalTouchSendFallback() {
    if (!sendBtn || !getChatComposerEl() || !document.getElementById("chatPersonalVoiceBtn") || sendBtn._pokerChatPersonalTouchSendFallbackBound) return;
    sendBtn._pokerChatPersonalTouchSendFallbackBound = true;
    sendBtn.addEventListener(
      "touchend",
      function (e) {
        var hasContentP = getChatPersonalText().trim() || getPersonalImage() || getPersonalVoice() || getPersonalDocument();
        if (!hasContentP) return;
        e.preventDefault();
        e.stopPropagation();
        sendMessage();
      },
      { passive: false }
    );
  }

  bindInitialComposerInputEvents();
  bindPersonalTouchSendFallback();
  updateGeneralSendBtnIcon();
  updatePersonalSendBtnIcon();

  return {
    bindChatSendTap: bindChatSendTap,
    bindChatComposerInputEvents: bindChatComposerInputEvents,
    bindInitialComposerInputEvents: bindInitialComposerInputEvents,
    hasSendableContent: hasSendableContent,
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
    updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
  };
}
