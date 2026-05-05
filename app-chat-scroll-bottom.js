// Chat scroll-bottom controls and keyboard-follow behavior.

function initChatScrollBottom(opts) {
  opts = opts || {};
  var generalMessages = opts.generalMessages || null;
  var messagesEl = opts.messagesEl || null;
  var generalView = opts.generalView || null;
  var convView = opts.convView || null;
  var chatGeneralScrollBottomBtn = opts.chatGeneralScrollBottomBtn || null;
  var chatPersonalScrollBottomBtn = opts.chatPersonalScrollBottomBtn || null;
  var CHAT_SCROLL_BOTTOM_NEAR_PX = opts.nearPx || 100;
  var CHAT_SCROLL_BOTTOM_REARM_PX = opts.rearmPx || 220;
  var chatScrollBottomBtnRaf = null;

  function getChatActiveTab() {
    return typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab() : "";
  }

  function isChatPhysicalKeyboardContextSafe() {
    try {
      if (typeof opts.isChatPhysicalKeyboardContext === "function") return !!opts.isChatPhysicalKeyboardContext();
      if (typeof isChatPhysicalKeyboardContext === "function") return !!isChatPhysicalKeyboardContext();
    } catch (ePhys) {}
    return false;
  }

  function chatMessagesBottomGap(el) {
    if (!el) return 0;
    try {
      var max = Math.max(0, (Number(el.scrollHeight) || 0) - (Number(el.clientHeight) || 0));
      return Math.max(0, max - (Number(el.scrollTop) || 0));
    } catch (eGap) {
      return 0;
    }
  }

  function chatMessagesNearBottom(el, thresholdPx) {
    if (!el) return true;
    try {
      var th = thresholdPx != null ? thresholdPx : CHAT_SCROLL_BOTTOM_NEAR_PX;
      var max = el.scrollHeight - el.clientHeight;
      if (max <= 8) return true;
      return max - el.scrollTop <= th;
    } catch (e) {
      return true;
    }
  }

  function rememberChatMessagesBottomAffinity(el) {
    if (!el) return false;
    var near = false;
    try {
      near = chatMessagesNearBottom(el, CHAT_SCROLL_BOTTOM_REARM_PX);
      el.__pokerChatUserNearBottom = near;
      if (near) {
        el.__pokerChatUserReturnedBottomAt = Date.now();
        el.__pokerChatKeyboardBottomFollowCancelledAt = 0;
        if (!document.body.classList.contains("chat-keyboard-open")) {
          el.__pokerChatOpeningStickBottom = true;
        }
      }
    } catch (eRememberBottom) {}
    return near;
  }

  function chatMessagesShouldFollowKeyboardLift(el) {
    if (!el) return false;
    try {
      if (chatMessagesNearBottom(el, CHAT_SCROLL_BOTTOM_REARM_PX)) return true;
      var returnedAt = Number(el.__pokerChatUserReturnedBottomAt) || 0;
      var cancelledAt = Number(el.__pokerChatKeyboardBottomFollowCancelledAt) || 0;
      if (returnedAt && returnedAt > cancelledAt && Date.now() - returnedAt < 5000) {
        var relaxed = Math.max(CHAT_SCROLL_BOTTOM_REARM_PX, Math.round((Number(el.clientHeight) || 0) * 0.35));
        if (chatMessagesBottomGap(el) <= relaxed) return true;
      }
      return !!el.__pokerChatOpeningStickBottom && chatMessagesBottomGap(el) <= Math.max(CHAT_SCROLL_BOTTOM_REARM_PX, 260);
    } catch (eShouldFollow) {
      return chatMessagesNearBottom(el, CHAT_SCROLL_BOTTOM_REARM_PX);
    }
  }

  function clearChatMessagesKeyboardBottomFollow(el) {
    if (!el) return;
    try {
      el.__pokerChatOpeningStickBottom = false;
      el.__pokerChatUserNearBottom = false;
      el.__pokerChatKeyboardBottomFollowUntil = 0;
      el.__pokerChatKeyboardBottomFollowCancelledAt = Date.now();
    } catch (eClearFollow) {}
  }

  function scheduleChatKeyboardBottomFollow(el, reason) {
    if (!el || isChatPhysicalKeyboardContextSafe()) return;
    try {
      el.__pokerChatOpeningStickBottom = true;
      el.__pokerChatUserReturnedBottomAt = Date.now();
      el.__pokerChatKeyboardBottomFollowUntil = Date.now() + 1600;
      var token = (Number(el.__pokerChatKeyboardBottomFollowToken) || 0) + 1;
      el.__pokerChatKeyboardBottomFollowToken = token;
      var snap = function () {
        try {
          if (!el || el.__pokerChatKeyboardBottomFollowToken !== token) return;
          if (!document.body.classList.contains("chat-keyboard-open")) return;
          if (!el.__pokerChatOpeningStickBottom) return;
          if (Date.now() > (Number(el.__pokerChatKeyboardBottomFollowUntil) || 0)) return;
          el.scrollTop = el.scrollHeight;
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSnapFollow) {}
      };
      var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      setTimeout(snap, 0);
      raf(function () {
        snap();
        raf(snap);
      });
      [80, 180, 360, 700, 1200].forEach(function (ms) {
        setTimeout(snap, ms);
      });
    } catch (eScheduleFollow) {}
  }

  function handleChatMessagesScrollForBottomState(el) {
    rememberChatMessagesBottomAffinity(el);
    scheduleSyncChatScrollBottomButtons();
  }

  function snapChatMessagesToBottomIfPinned(messagesScrollEl) {
    if (!messagesScrollEl) return;
    try {
      var wrap = messagesScrollEl.parentElement;
      if (wrap && wrap.classList && wrap.classList.contains("chat-messages-wrap--settling")) {
        messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
        return;
      }
    } catch (eW) {}
    if (!chatMessagesNearBottom(messagesScrollEl, CHAT_SCROLL_BOTTOM_NEAR_PX)) {
      try {
        if (messagesScrollEl.__pokerChatOpeningStickBottom) {
          messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
        }
      } catch (eStickSnap) {}
      return;
    }
    try {
      messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
    } catch (eS) {}
  }

  function pokerSnapChatOpeningStickToBottomIfActive(el, which) {
    if (!el || !el.__pokerChatOpeningStickBottom) return;
    try {
      if (which === "general") {
        if (getChatActiveTab() !== "general" || !generalView || generalView.classList.contains("chat-general-view--hidden")) return;
      } else if (which === "personal") {
        if (getChatActiveTab() !== "personal" || !convView || convView.classList.contains("chat-conv-view--hidden")) return;
      }
      el.scrollTop = el.scrollHeight;
    } catch (eSnapStick) {}
  }

  function pokerBindOpeningStickClearOnUserIntent(el) {
    if (!el || el.__pokerOpeningStickIntentBound) return;
    try {
      el.__pokerOpeningStickIntentBound = true;
    } catch (eB) {}
    el.addEventListener("wheel", function (ev) {
      if (!el.__pokerChatOpeningStickBottom) return;
      var dy = ev.deltaY;
      if (typeof dy === "number" && dy < -1) clearChatMessagesKeyboardBottomFollow(el);
    }, { passive: true });
    var ty0 = null;
    el.addEventListener("touchstart", function (ev) {
      ty0 = ev.touches && ev.touches[0] ? ev.touches[0].clientY : null;
    }, { passive: true });
    el.addEventListener("touchmove", function (ev) {
      if (!el.__pokerChatOpeningStickBottom || ty0 == null) return;
      var y = ev.touches && ev.touches[0] ? ev.touches[0].clientY : null;
      if (y != null && y - ty0 > 14) {
        clearChatMessagesKeyboardBottomFollow(el);
        ty0 = null;
      }
    }, { passive: true });
    el.addEventListener("touchend", function () {
      ty0 = null;
    }, { passive: true });
  }

  function syncChatScrollBottomButtons() {
    try {
      if (
        chatGeneralScrollBottomBtn &&
        getChatActiveTab() === "general" &&
        generalView &&
        !generalView.classList.contains("chat-general-view--hidden") &&
        generalMessages
      ) {
        var showG = !chatMessagesNearBottom(generalMessages, CHAT_SCROLL_BOTTOM_NEAR_PX);
        chatGeneralScrollBottomBtn.classList.toggle("chat-scroll-bottom-btn--hidden", !showG);
        chatGeneralScrollBottomBtn.setAttribute("aria-hidden", showG ? "false" : "true");
      } else if (chatGeneralScrollBottomBtn) {
        chatGeneralScrollBottomBtn.classList.add("chat-scroll-bottom-btn--hidden");
        chatGeneralScrollBottomBtn.setAttribute("aria-hidden", "true");
      }
    } catch (eG) {}
    try {
      if (
        chatPersonalScrollBottomBtn &&
        getChatActiveTab() === "personal" &&
        convView &&
        !convView.classList.contains("chat-conv-view--hidden") &&
        messagesEl
      ) {
        var showP = !chatMessagesNearBottom(messagesEl, CHAT_SCROLL_BOTTOM_NEAR_PX);
        chatPersonalScrollBottomBtn.classList.toggle("chat-scroll-bottom-btn--hidden", !showP);
        chatPersonalScrollBottomBtn.setAttribute("aria-hidden", showP ? "false" : "true");
      } else if (chatPersonalScrollBottomBtn) {
        chatPersonalScrollBottomBtn.classList.add("chat-scroll-bottom-btn--hidden");
        chatPersonalScrollBottomBtn.setAttribute("aria-hidden", "true");
      }
    } catch (eP) {}
  }

  function scheduleSyncChatScrollBottomButtons() {
    if (chatScrollBottomBtnRaf != null) return;
    var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
    chatScrollBottomBtnRaf = raf(function () {
      chatScrollBottomBtnRaf = null;
      syncChatScrollBottomButtons();
    });
  }

  try {
    window.__pokerSyncChatScrollBottomButtons = syncChatScrollBottomButtons;
    window.__pokerScheduleSyncChatScrollBottomButtons = scheduleSyncChatScrollBottomButtons;
  } catch (eSbWin) {}

  if (generalMessages) {
    generalMessages.addEventListener("scroll", function () {
      handleChatMessagesScrollForBottomState(generalMessages);
    }, { passive: true });
  }
  if (messagesEl) {
    messagesEl.addEventListener("scroll", function () {
      handleChatMessagesScrollForBottomState(messagesEl);
    }, { passive: true });
  }
  if (generalMessages) pokerBindOpeningStickClearOnUserIntent(generalMessages);
  if (messagesEl) pokerBindOpeningStickClearOnUserIntent(messagesEl);
  if (typeof ResizeObserver !== "undefined" && generalMessages) {
    try {
      var roG = new ResizeObserver(function () {
        pokerSnapChatOpeningStickToBottomIfActive(generalMessages, "general");
        scheduleSyncChatScrollBottomButtons();
      });
      roG.observe(generalMessages);
    } catch (eRoG) {}
  }
  if (typeof ResizeObserver !== "undefined" && messagesEl) {
    try {
      var roP = new ResizeObserver(function () {
        pokerSnapChatOpeningStickToBottomIfActive(messagesEl, "personal");
        scheduleSyncChatScrollBottomButtons();
      });
      roP.observe(messagesEl);
    } catch (eRoP) {}
  }
  window.addEventListener("resize", scheduleSyncChatScrollBottomButtons, { passive: true });

  if (chatGeneralScrollBottomBtn) {
    chatGeneralScrollBottomBtn.addEventListener("click", function () {
      try {
        if (generalMessages) {
          generalMessages.scrollTop = generalMessages.scrollHeight;
          rememberChatMessagesBottomAffinity(generalMessages);
        }
      } catch (eCG) {}
      var twHg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twHg && twHg.HapticFeedback && typeof twHg.HapticFeedback.impactOccurred === "function") {
        try {
          twHg.HapticFeedback.impactOccurred("light");
        } catch (eHg) {}
      }
      scheduleSyncChatScrollBottomButtons();
    });
  }
  if (chatPersonalScrollBottomBtn) {
    chatPersonalScrollBottomBtn.addEventListener("click", function () {
      try {
        if (messagesEl) {
          messagesEl.scrollTop = messagesEl.scrollHeight;
          rememberChatMessagesBottomAffinity(messagesEl);
        }
      } catch (eCP) {}
      var twHp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twHp && twHp.HapticFeedback && typeof twHp.HapticFeedback.impactOccurred === "function") {
        try {
          twHp.HapticFeedback.impactOccurred("light");
        } catch (eHp) {}
      }
      scheduleSyncChatScrollBottomButtons();
    });
  }

  return {
    chatMessagesBottomGap: chatMessagesBottomGap,
    chatMessagesNearBottom: chatMessagesNearBottom,
    chatMessagesShouldFollowKeyboardLift: chatMessagesShouldFollowKeyboardLift,
    clearChatMessagesKeyboardBottomFollow: clearChatMessagesKeyboardBottomFollow,
    rememberChatMessagesBottomAffinity: rememberChatMessagesBottomAffinity,
    scheduleChatKeyboardBottomFollow: scheduleChatKeyboardBottomFollow,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    snapChatMessagesToBottomIfPinned: snapChatMessagesToBottomIfPinned,
    syncChatScrollBottomButtons: syncChatScrollBottomButtons,
  };
}
