// Chat emoji picker and emoji-button focus retention runtime.

function initChatEmojiPickerRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var CHAT_EMOJIS = ["🔥","✅","😀","😃","😄","😁","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😗","😋","😛","😜","🤪","😎","🤩","🥳","👍","👎","👏","🙌","🤝","🙏","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","⭐","✨","💯","🎉","🎊","🤔","😐","😑","😶","🙄","😏","😣","😢","😭","😤","😡","🤬","😈","💀","👋","✌️","🤞","💪","🐶","🐱","🎲","♠️","♥️","♦️","♣️"];
    var chatEmojiPickerGrid = document.getElementById("chatEmojiPickerGrid");
    var chatGeneralEmojiBtn = document.getElementById("chatGeneralEmojiBtn");
    var chatPersonalEmojiBtn = document.getElementById("chatPersonalEmojiBtn");
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

    return {
      hideChatEmojiPicker: hideChatEmojiPicker,
      getVisibleChatComposerTextarea: getVisibleChatComposerTextarea,
      insertEmojiAtCursor: insertEmojiAtCursor,
      syncChatComposerAfterEmojiInsert: syncChatComposerAfterEmojiInsert
    };
  }
}
