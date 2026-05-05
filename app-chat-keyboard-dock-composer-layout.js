// Split chat keyboard dock runtime: composer-layout.

function initChatKeyboardDockComposerLayout(opts) {
  opts = opts || {};
  with (opts) {
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

    return {
      isChatThreadComposerKeyboardDom: isChatThreadComposerKeyboardDom,
      isHardDisabledChatComposerFlowTarget: isHardDisabledChatComposerFlowTarget,
      hardDisableChatComposerViewportLift: hardDisableChatComposerViewportLift,
      getChatComposerKeyboardGapPx: getChatComposerKeyboardGapPx,
      getChatScreenSafeAreaBottomPx: getChatScreenSafeAreaBottomPx,
      getChatComposerMandatoryBottomOffsetPx: getChatComposerMandatoryBottomOffsetPx,
      isTelegramMiniAppChatThreadIos: isTelegramMiniAppChatThreadIos,
      shouldUseTelegramChatThreadVisualViewportDock: shouldUseTelegramChatThreadVisualViewportDock,
      isPassiveTelegramIosChatThread: isPassiveTelegramIosChatThread,
      shouldDisableTelegramIosChatKeyboardDock: shouldDisableTelegramIosChatKeyboardDock,
      shouldUseNativeTelegramIosChatComposerFlow: shouldUseNativeTelegramIosChatComposerFlow,
      getTelegramChatRootShiftPx: getTelegramChatRootShiftPx,
      clearTelegramChatRootShiftCompensation: clearTelegramChatRootShiftCompensation,
      applyTelegramChatRootShiftCompensation: applyTelegramChatRootShiftCompensation,
      ensureTelegramChatRootShiftCompensationBindings: ensureTelegramChatRootShiftCompensationBindings,
      getTelegramMiniAppChatThreadFocusSession: getTelegramMiniAppChatThreadFocusSession,
      shouldShowTelegramMiniAppChatThreadDebugOverlay: shouldShowTelegramMiniAppChatThreadDebugOverlay,
      ensureTelegramMiniAppChatThreadDebugOverlay: ensureTelegramMiniAppChatThreadDebugOverlay,
      hideTelegramMiniAppChatThreadDebugOverlay: hideTelegramMiniAppChatThreadDebugOverlay,
      updateTelegramMiniAppChatThreadDebugOverlay: updateTelegramMiniAppChatThreadDebugOverlay,
      computeTelegramMiniAppIosThreadCover: computeTelegramMiniAppIosThreadCover,
      clampTelegramMiniAppIosThreadCover: clampTelegramMiniAppIosThreadCover,
      scheduleTelegramMiniAppChatThreadKeyboardSync: scheduleTelegramMiniAppChatThreadKeyboardSync,
      applyChatThreadComposerKeyboardDockFromCover: applyChatThreadComposerKeyboardDockFromCover,
      shouldUseCssOnlyIosPwaChatComposerDock: shouldUseCssOnlyIosPwaChatComposerDock,
      isPwaChatManualFocusIntentActive: isPwaChatManualFocusIntentActive,
      getCssOnlyIosPwaChatComposerBottomPx: getCssOnlyIosPwaChatComposerBottomPx,
      isIosPwaChatThreadKeyboardOpenConfirmed: isIosPwaChatThreadKeyboardOpenConfirmed,
      shouldApplyIosPwaChatComposerDockNow: shouldApplyIosPwaChatComposerDockNow,
      isIosPwaChatComposerLikelyActiveSession: isIosPwaChatComposerLikelyActiveSession,
      maybeApplyCssOnlyIosPwaChatComposerDock: maybeApplyCssOnlyIosPwaChatComposerDock,
      applyCssOnlyIosPwaChatComposerDock: applyCssOnlyIosPwaChatComposerDock,
      forceIosPwaChatTextareaDock: forceIosPwaChatTextareaDock,
      ensurePwaChatDockWatchdog: ensurePwaChatDockWatchdog,
      syncTelegramMiniAppChatThreadKeyboard: syncTelegramMiniAppChatThreadKeyboard
    };
  }
}
