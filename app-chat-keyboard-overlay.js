// Telegram/iOS composer overlay shell. Currently disabled by policy, but isolated from chat lifecycle.

function initChatKeyboardOverlay(opts) {
  opts = opts || {};
  var chatIosComposeOverlay = opts.chatIosComposeOverlay || null;
  var chatIosComposeOverlayBackdrop = opts.chatIosComposeOverlayBackdrop || null;
  var chatIosComposeOverlayClose = opts.chatIosComposeOverlayClose || null;
  var chatIosComposeOverlayCancel = opts.chatIosComposeOverlayCancel || null;
  var chatIosComposeOverlaySend = opts.chatIosComposeOverlaySend || null;
  var chatIosComposeOverlayTextarea = opts.chatIosComposeOverlayTextarea || null;
  var chatIosComposeOverlayTitle = opts.chatIosComposeOverlayTitle || null;
  var chatGeneralInputArea = opts.chatGeneralInputArea || null;
  var chatPersonalInputArea = opts.chatPersonalInputArea || null;
  var chatGeneralComposerEl = opts.chatGeneralComposerEl || null;
  var chatPersonalComposerEl = opts.chatPersonalComposerEl || null;
  var chatComposerDrafts = opts.chatComposerDrafts || { general: "", personal: "" };

  function getMode() {
    return typeof opts.getMode === "function" ? opts.getMode() : "";
  }

  function setMode(value) {
    if (typeof opts.setMode === "function") opts.setMode(value);
  }

  function setOpening(value) {
    if (typeof opts.setOpening === "function") opts.setOpening(!!value);
  }

  function getChatComposerMounted() {
    return typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted() : "";
  }

  function getChatComposerEl() {
    return typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl() : null;
  }

  function setChatComposerElValue(value) {
    var el = getChatComposerEl();
    if (el) el.value = value;
  }

  function shouldUseTelegramIosComposeOverlay() {
    return false;
  }

  function closeTelegramIosComposeOverlay(opts2) {
    if (!chatIosComposeOverlay) return;
    opts2 = opts2 || {};
    chatIosComposeOverlay.classList.add("chat-ios-compose-overlay--hidden");
    chatIosComposeOverlay.setAttribute("aria-hidden", "true");
    if (chatIosComposeOverlayTextarea) {
      if (!opts2.keepDraft) {
        if (getMode() === "general") chatComposerDrafts.general = String(chatIosComposeOverlayTextarea.value || "");
        else if (getMode() === "personal") chatComposerDrafts.personal = String(chatIosComposeOverlayTextarea.value || "");
      }
      try { chatIosComposeOverlayTextarea.blur(); } catch (eBlurOv) {}
    }
    if (getMode() === "general" && chatGeneralInputArea) {
      chatGeneralInputArea.classList.remove("chat-input-area--ios-overlay-gate");
    } else if (getMode() === "personal" && chatPersonalInputArea) {
      chatPersonalInputArea.classList.remove("chat-input-area--ios-overlay-gate");
    }
    setMode("");
    setOpening(false);
    if (typeof setTelegramIosKeyboardRootLock === "function") setTelegramIosKeyboardRootLock(false);
  }

  function openTelegramIosComposeOverlay(mode) {
    if (!shouldUseTelegramIosComposeOverlay()) return false;
    if (mode !== "general" && mode !== "personal") return false;
    setMode(mode);
    setOpening(true);
    if (chatIosComposeOverlayTitle) {
      chatIosComposeOverlayTitle.textContent = mode === "general" ? "Сообщение в общий чат" : "Сообщение собеседнику";
    }
    var currentDraft = mode === "general"
      ? (typeof opts.getChatGeneralText === "function" ? opts.getChatGeneralText() : "")
      : (typeof opts.getChatPersonalText === "function" ? opts.getChatPersonalText() : "");
    if (chatIosComposeOverlayTextarea) {
      chatIosComposeOverlayTextarea.value = currentDraft || "";
    }
    if (mode === "general" && chatGeneralInputArea) {
      chatGeneralInputArea.classList.add("chat-input-area--ios-overlay-gate");
    } else if (mode === "personal" && chatPersonalInputArea) {
      chatPersonalInputArea.classList.add("chat-input-area--ios-overlay-gate");
    }
    chatIosComposeOverlay.classList.remove("chat-ios-compose-overlay--hidden");
    chatIosComposeOverlay.setAttribute("aria-hidden", "false");
    if (typeof setTelegramIosKeyboardRootLock === "function") setTelegramIosKeyboardRootLock(true);
    setTimeout(function () {
      setOpening(false);
      try {
        if (chatIosComposeOverlayTextarea) chatIosComposeOverlayTextarea.focus();
      } catch (eFocusOverlay) {}
    }, 30);
    return true;
  }

  function submitTelegramIosComposeOverlay() {
    if (!getMode() || !chatIosComposeOverlayTextarea) return;
    var text = String(chatIosComposeOverlayTextarea.value || "");
    if (getMode() === "general") {
      chatComposerDrafts.general = text;
      if (chatGeneralComposerEl) chatGeneralComposerEl.value = text;
      if (getChatComposerMounted() === "general") setChatComposerElValue(text);
      closeTelegramIosComposeOverlay({ keepDraft: true });
      if (typeof opts.sendGeneral === "function") opts.sendGeneral(text);
      return;
    }
    if (getMode() === "personal") {
      chatComposerDrafts.personal = text;
      if (chatPersonalComposerEl) chatPersonalComposerEl.value = text;
      if (getChatComposerMounted() === "personal") setChatComposerElValue(text);
      closeTelegramIosComposeOverlay({ keepDraft: true });
      if (typeof opts.sendMessage === "function") opts.sendMessage(text);
    }
  }

  [chatIosComposeOverlayBackdrop, chatIosComposeOverlayClose, chatIosComposeOverlayCancel].forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      closeTelegramIosComposeOverlay();
    });
  });
  if (chatIosComposeOverlaySend) {
    chatIosComposeOverlaySend.addEventListener("click", function () {
      submitTelegramIosComposeOverlay();
    });
  }
  if (chatIosComposeOverlayTextarea) {
    chatIosComposeOverlayTextarea.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeTelegramIosComposeOverlay();
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitTelegramIosComposeOverlay();
      }
    });
  }

  function bindTelegramIosComposeOverlayGate(area, mode) {
    if (typeof opts.isTelegramChatRuntime === "function" && opts.isTelegramChatRuntime()) return;
    if (!area || area.__pokerIosOverlayGateBound) return;
    area.__pokerIosOverlayGateBound = true;
    function gateOpen(event) {
      if (!shouldUseTelegramIosComposeOverlay()) return;
      if (chatIosComposeOverlay && !chatIosComposeOverlay.classList.contains("chat-ios-compose-overlay--hidden")) return;
      var target = event && event.target ? event.target : null;
      if (target && target.closest) {
        if (target.closest(".chat-attach-btn, .chat-emoji-btn, .chat-send-btn, .chat-voice-preview, .chat-image-preview, .chat-reply-preview, .chat-scroll-bottom-btn")) {
          return;
        }
      }
      if (openTelegramIosComposeOverlay(mode)) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }
    area.addEventListener("touchstart", gateOpen, { passive: false, capture: true });
    area.addEventListener("click", gateOpen, true);
  }

  bindTelegramIosComposeOverlayGate(chatGeneralInputArea, "general");
  bindTelegramIosComposeOverlayGate(chatPersonalInputArea, "personal");

  return {
    closeTelegramIosComposeOverlay: closeTelegramIosComposeOverlay,
    openTelegramIosComposeOverlay: openTelegramIosComposeOverlay,
    shouldUseTelegramIosComposeOverlay: shouldUseTelegramIosComposeOverlay,
    submitTelegramIosComposeOverlay: submitTelegramIosComposeOverlay,
  };
}
