// Split chat keyboard dock runtime: lifecycle.

function initChatKeyboardDockLifecycle(opts) {
  opts = opts || {};
  with (opts) {
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


    return {
      isIosPwaChatThreadLifecycleDockActive: isIosPwaChatThreadLifecycleDockActive,
      suspendIosPwaChatThreadDockForPageLifecycle: suspendIosPwaChatThreadDockForPageLifecycle,
      resumeIosPwaChatThreadDockAfterPageLifecycle: resumeIosPwaChatThreadDockAfterPageLifecycle
    };
  }
}
