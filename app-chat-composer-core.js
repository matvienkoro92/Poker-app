// Chat composer core: drafts, textarea mounting, focus, and send-button busy state.

function initChatComposerCore(opts) {
  opts = opts || {};
  var chatSharedComposerEl = opts.chatSharedComposerEl || null;
  var chatComposerPool = opts.chatComposerPool || null;
  var chatGeneralComposerMount = opts.chatGeneralComposerMount || null;
  var chatPersonalComposerMount = opts.chatPersonalComposerMount || null;
  var generalSendBtn = opts.generalSendBtn || null;
  var sendBtn = opts.sendBtn || null;
  var chatComposerDrafts = opts.chatComposerDrafts || { general: "", personal: "" };

  function getChatComposerEl() {
    return typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl() : null;
  }

  function setChatComposerEl(el) {
    if (typeof opts.setChatComposerEl === "function") opts.setChatComposerEl(el);
  }

  function getChatComposerMounted() {
    return typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted() : "detached";
  }

  function setChatComposerMounted(value) {
    if (typeof opts.setChatComposerMounted === "function") opts.setChatComposerMounted(value);
  }

  function getChatActiveTab() {
    return typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab() : "";
  }

  function getChatGeneralComposerEl() {
    return typeof opts.getChatGeneralComposerEl === "function" ? opts.getChatGeneralComposerEl() : null;
  }

  function setChatGeneralComposerEl(el) {
    if (typeof opts.setChatGeneralComposerEl === "function") opts.setChatGeneralComposerEl(el);
  }

  function getChatPersonalComposerEl() {
    return typeof opts.getChatPersonalComposerEl === "function" ? opts.getChatPersonalComposerEl() : null;
  }

  function setChatPersonalComposerEl(el) {
    if (typeof opts.setChatPersonalComposerEl === "function") opts.setChatPersonalComposerEl(el);
  }

  function getDirectTelegramChatComposer(mode) {
    return typeof opts.getDirectTelegramChatComposer === "function" ? opts.getDirectTelegramChatComposer(mode) : null;
  }

  function ensureTelegramDedicatedChatComposers() {
    return typeof opts.ensureTelegramDedicatedChatComposers === "function" ? !!opts.ensureTelegramDedicatedChatComposers() : false;
  }

  function isTelegramChatRuntimeSafe() {
    try {
      if (typeof opts.isTelegramChatRuntime === "function") return !!opts.isTelegramChatRuntime();
      if (typeof isTelegramChatRuntime === "function") return !!isTelegramChatRuntime();
    } catch (eTgRuntime) {}
    return false;
  }

  function scheduleTelegramIosChatComposerOverlaySync() {
    if (typeof opts.scheduleTelegramIosChatComposerOverlaySync === "function") opts.scheduleTelegramIosChatComposerOverlaySync();
  }

  function resizeChatTextareaSafe(ta) {
    if (typeof opts.resizeChatTextarea === "function") opts.resizeChatTextarea(ta);
    else if (typeof resizeChatTextarea === "function") resizeChatTextarea(ta);
  }

  function updateGeneralSendBtnIconSafe() {
    if (typeof opts.updateGeneralSendBtnIcon === "function") opts.updateGeneralSendBtnIcon();
  }

  function updatePersonalSendBtnIconSafe() {
    if (typeof opts.updatePersonalSendBtnIcon === "function") opts.updatePersonalSendBtnIcon();
  }

  function flushChatComposerToDrafts() {
    var directGeneralComposer = getDirectTelegramChatComposer("general");
    var directPersonalComposer = getDirectTelegramChatComposer("personal");
    var chatComposerEl = getChatComposerEl();
    if (directGeneralComposer || directPersonalComposer) {
      if (directGeneralComposer) chatComposerDrafts.general = directGeneralComposer.value != null ? String(directGeneralComposer.value) : "";
      if (directPersonalComposer) chatComposerDrafts.personal = directPersonalComposer.value != null ? String(directPersonalComposer.value) : "";
      return;
    }
    if (!chatComposerEl) return;
    try {
      if (chatGeneralComposerMount && chatGeneralComposerMount.contains(chatComposerEl)) {
        chatComposerDrafts.general = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
        return;
      }
      if (chatPersonalComposerMount && chatPersonalComposerMount.contains(chatComposerEl)) {
        chatComposerDrafts.personal = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
        return;
      }
    } catch (eFlushDom) {}
    if (getChatComposerMounted() === "general") chatComposerDrafts.general = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    else if (getChatComposerMounted() === "personal") chatComposerDrafts.personal = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
  }

  function getChatGeneralText() {
    var directComposer = getDirectTelegramChatComposer("general");
    var chatComposerEl = getChatComposerEl();
    if (directComposer) return directComposer.value != null ? String(directComposer.value) : "";
    if (!chatComposerEl) return chatComposerDrafts.general != null ? String(chatComposerDrafts.general) : "";
    try {
      if (chatGeneralComposerMount && chatGeneralComposerMount.contains(chatComposerEl)) {
        return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
      }
    } catch (eGG) {}
    if (getChatComposerMounted() === "general") return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    return chatComposerDrafts.general != null ? String(chatComposerDrafts.general) : "";
  }

  function getChatPersonalText() {
    var directComposer = getDirectTelegramChatComposer("personal");
    var chatComposerEl = getChatComposerEl();
    if (directComposer) return directComposer.value != null ? String(directComposer.value) : "";
    if (!chatComposerEl) return chatComposerDrafts.personal != null ? String(chatComposerDrafts.personal) : "";
    try {
      if (chatPersonalComposerMount && chatPersonalComposerMount.contains(chatComposerEl)) {
        return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
      }
    } catch (eGP) {}
    if (getChatComposerMounted() === "personal") return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    return chatComposerDrafts.personal != null ? String(chatComposerDrafts.personal) : "";
  }

  function shouldAutoFocusChatComposerOnDesktop() {
    try {
      if (typeof window.__pokerIsChatPhysicalKeyboardContext === "function") {
        return !!window.__pokerIsChatPhysicalKeyboardContext();
      }
    } catch (ePkCtx) {}
    try {
      if ((navigator.maxTouchPoints || 0) > 0) return false;
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) return false;
    } catch (eAfUa) {}
    return true;
  }

  function focusChatComposerForDesktop() {
    var chatComposerEl = getChatComposerEl();
    if (!chatComposerEl || !shouldAutoFocusChatComposerOnDesktop()) return;
    setTimeout(function () {
      var current = getChatComposerEl();
      try {
        if (!current || getChatComposerMounted() === "detached" || current.disabled) return;
        if (current.focus) current.focus({ preventScroll: true });
      } catch (eFocusDesk1) {
        try {
          if (current && current.focus) current.focus();
        } catch (eFocusDesk2) {}
      }
    }, 0);
  }

  function focusChatComposerForReply(mode, messagesScrollEl) {
    var replyMode = mode === "personal" ? "personal" : "general";
    try {
      mountChatComposer(replyMode);
    } catch (eMountReplyComposer) {}
    var targetComposer = null;
    try {
      targetComposer = isTelegramChatRuntimeSafe() ? getDirectTelegramChatComposer(replyMode) : getChatComposerEl();
      if (!targetComposer) targetComposer = getChatComposerEl();
    } catch (eReplyComposerFind) {
      targetComposer = getChatComposerEl();
    }
    if (!targetComposer) return;
    setChatComposerEl(targetComposer);
    try {
      targetComposer.disabled = false;
      targetComposer.hidden = false;
      targetComposer.removeAttribute("tabindex");
      targetComposer.removeAttribute("aria-hidden");
      targetComposer.style.removeProperty("display");
      targetComposer.style.removeProperty("pointer-events");
    } catch (eReplyComposerPrep) {}
    var prevScrollTop = messagesScrollEl ? messagesScrollEl.scrollTop : null;
    try {
      targetComposer.focus({ preventScroll: true });
    } catch (eReplyFocus1) {
      try {
        targetComposer.focus();
      } catch (eReplyFocus2) {}
    }
    try {
      var len = String(targetComposer.value || "").length;
      if (typeof targetComposer.setSelectionRange === "function") targetComposer.setSelectionRange(len, len);
    } catch (eReplyCaret) {}
    try {
      if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
        window.__pokerActivateChatKeyboardViewport(targetComposer);
      }
    } catch (eReplyKb) {}
    requestAnimationFrame(function () {
      try {
        if (messagesScrollEl && prevScrollTop != null) messagesScrollEl.scrollTop = prevScrollTop;
      } catch (eReplyScroll) {}
      try {
        if (typeof updateChatMessagesKeyboardPad === "function") updateChatMessagesKeyboardPad();
      } catch (eReplyPad) {}
      try {
        if (typeof window.__pokerSyncPwaChatVisualViewportInset === "function") {
          window.__pokerSyncPwaChatVisualViewportInset();
        }
      } catch (eReplyVv) {}
    });
  }

  function mountChatComposer(mode) {
    if (!chatSharedComposerEl || !chatComposerPool) return;
    mode = mode || "detached";
    var nextMounted = mode === "general" || mode === "personal" ? mode : "detached";
    var useDedicated = (nextMounted === "general" || nextMounted === "personal") && ensureTelegramDedicatedChatComposers();
    var chatComposerEl;
    var chatGeneralComposerEl = getChatGeneralComposerEl();
    var chatPersonalComposerEl = getChatPersonalComposerEl();
    if (useDedicated) {
      flushChatComposerToDrafts();
      setChatComposerMounted(nextMounted);
      if (nextMounted === "general") {
        chatComposerEl = chatGeneralComposerEl;
        setChatComposerEl(chatComposerEl);
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.value = chatComposerDrafts.general || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
        if (chatPersonalComposerEl) chatPersonalComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.disabled = true;
      } else if (nextMounted === "personal") {
        chatComposerEl = chatPersonalComposerEl;
        setChatComposerEl(chatComposerEl);
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.value = chatComposerDrafts.personal || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
        if (chatGeneralComposerEl) chatGeneralComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.disabled = true;
      } else {
        chatComposerEl = getChatActiveTab() === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl;
        setChatComposerEl(chatComposerEl);
        chatSharedComposerEl.value = "";
        chatSharedComposerEl.placeholder = "";
        chatSharedComposerEl.blur();
        chatSharedComposerEl.disabled = true;
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        if (chatGeneralComposerEl) chatGeneralComposerEl.setAttribute("tabindex", "-1");
        if (chatPersonalComposerEl) chatPersonalComposerEl.setAttribute("tabindex", "-1");
      }
      try {
        if (nextMounted === "general") resizeChatTextareaSafe(chatGeneralComposerEl);
        if (nextMounted === "personal") resizeChatTextareaSafe(chatPersonalComposerEl);
      } catch (eRtDed) {}
      try { updateGeneralSendBtnIconSafe(); } catch (eGd) {}
      try { updatePersonalSendBtnIconSafe(); } catch (ePd) {}
      scheduleTelegramIosChatComposerOverlaySync();
      return;
    }
    if (isTelegramChatRuntimeSafe()) {
      setChatComposerMounted("detached");
      setChatComposerEl(getChatActiveTab() === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl);
      return;
    }
    chatComposerEl = chatSharedComposerEl;
    setChatComposerEl(chatComposerEl);
    var contained =
      nextMounted === "detached"
        ? chatComposerPool.contains(chatSharedComposerEl)
        : nextMounted === "general"
          ? chatGeneralComposerMount && chatGeneralComposerMount.contains(chatSharedComposerEl)
          : chatPersonalComposerMount && chatPersonalComposerMount.contains(chatSharedComposerEl);
    var same = nextMounted === getChatComposerMounted() && contained;
    if (!same) {
      flushChatComposerToDrafts();
      setChatComposerMounted(nextMounted);
      if (nextMounted === "general" && chatGeneralComposerMount) {
        chatGeneralComposerMount.appendChild(chatSharedComposerEl);
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.value = chatComposerDrafts.general || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
      } else if (nextMounted === "personal" && chatPersonalComposerMount) {
        chatPersonalComposerMount.appendChild(chatSharedComposerEl);
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.value = chatComposerDrafts.personal || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
      } else {
        setChatComposerMounted("detached");
        chatComposerPool.appendChild(chatSharedComposerEl);
        chatComposerEl.value = "";
        chatComposerEl.placeholder = "";
        chatComposerEl.blur();
        chatComposerEl.disabled = false;
        chatComposerEl.setAttribute("tabindex", "-1");
      }
    } else {
      if (nextMounted === "general") {
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.removeAttribute("tabindex");
      } else if (nextMounted === "personal") {
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.removeAttribute("tabindex");
      } else {
        chatComposerEl.setAttribute("tabindex", "-1");
      }
    }
    try { resizeChatTextareaSafe(chatComposerEl); } catch (eR) {}
    try { updateGeneralSendBtnIconSafe(); } catch (eG) {}
    try { updatePersonalSendBtnIconSafe(); } catch (eP) {}
    scheduleTelegramIosChatComposerOverlaySync();
    if (nextMounted === "general" || nextMounted === "personal") focusChatComposerForDesktop();
  }

  function setGeneralSendBusy(busy) {
    if (!generalSendBtn) return;
    generalSendBtn.disabled = false;
    generalSendBtn.classList.remove("chat-send-btn--waiting");
    generalSendBtn.setAttribute("aria-busy", busy ? "true" : "false");
    if (busy) {
      generalSendBtn.textContent = "\u2191";
      generalSendBtn.title = "Отправка…";
      generalSendBtn.setAttribute("aria-label", "Отправка…");
      generalSendBtn.classList.remove("chat-send-btn--mic");
    } else {
      updateGeneralSendBtnIconSafe();
    }
  }

  function setPersonalSendBusy(busy) {
    if (!sendBtn) return;
    sendBtn.disabled = false;
    sendBtn.classList.remove("chat-send-btn--waiting");
    sendBtn.setAttribute("aria-busy", busy ? "true" : "false");
    if (busy) {
      sendBtn.textContent = "\u2191";
      sendBtn.title = "Отправка…";
      sendBtn.setAttribute("aria-label", "Отправка…");
      sendBtn.classList.remove("chat-send-btn--mic");
    } else {
      updatePersonalSendBtnIconSafe();
    }
  }

  return {
    flushChatComposerToDrafts: flushChatComposerToDrafts,
    focusChatComposerForDesktop: focusChatComposerForDesktop,
    focusChatComposerForReply: focusChatComposerForReply,
    getChatGeneralText: getChatGeneralText,
    getChatPersonalText: getChatPersonalText,
    mountChatComposer: mountChatComposer,
    setGeneralSendBusy: setGeneralSendBusy,
    setPersonalSendBusy: setPersonalSendBusy,
    shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
  };
}
