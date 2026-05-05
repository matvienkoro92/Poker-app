// Split chat keyboard dock runtime: foundation.

function initChatKeyboardDockFoundation(opts) {
  opts = opts || {};
  with (opts) {
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

    return {
      getVisibleMessagesEl: getVisibleMessagesEl,
      clearChatMessagesKeyboardPad: clearChatMessagesKeyboardPad,
      hardResetTelegramChatMessagesKeyboardPad: hardResetTelegramChatMessagesKeyboardPad,
      updateChatMessagesKeyboardPad: updateChatMessagesKeyboardPad,
      scrollDocumentToZero: scrollDocumentToZero,
      clearChatKeyboardViewportState: clearChatKeyboardViewportState,
      isTelegramChatDefaultMode: isTelegramChatDefaultMode,
      enforceTelegramChatDefaultComposerState: enforceTelegramChatDefaultComposerState,
      setChatKeyboardOpen: setChatKeyboardOpen,
      pokerPwaStandaloneForKeyboardInset: pokerPwaStandaloneForKeyboardInset,
      isIosLikeForChatViewport: isIosLikeForChatViewport,
      isChatPhysicalKeyboardContext: isChatPhysicalKeyboardContext,
      shouldUseChatVisualViewportLift: shouldUseChatVisualViewportLift,
      applyChatIosAccessoryInsetFromViewport: applyChatIosAccessoryInsetFromViewport,
      getPwaChatThreadAccessoryInsetPx: getPwaChatThreadAccessoryInsetPx,
      readStoredPwaIosChatKeyboardCoverPx: readStoredPwaIosChatKeyboardCoverPx,
      getPwaIosChatComputedKeyboardCoverFloorPx: getPwaIosChatComputedKeyboardCoverFloorPx,
      writeStoredPwaIosChatKeyboardCoverPx: writeStoredPwaIosChatKeyboardCoverPx,
      getPwaIosChatEarlyKeyboardCoverPx: getPwaIosChatEarlyKeyboardCoverPx,
      setPwaIosChatEarlyKeyboardFallback: setPwaIosChatEarlyKeyboardFallback,
      clearPwaIosChatEarlyKeyboardFallbackIfViewportLive: clearPwaIosChatEarlyKeyboardFallbackIfViewportLive,
      markPwaIosChatFocusActivation: markPwaIosChatFocusActivation,
      pokerStripForcedViewportShellHeights: pokerStripForcedViewportShellHeights,
      shouldPreserveActivePwaChatDock: shouldPreserveActivePwaChatDock,
      stripChatInputAreaTransforms: stripChatInputAreaTransforms,
      clearChatComposerDockClass: clearChatComposerDockClass,
      resetChatKeyboardDockRuntimeState: resetChatKeyboardDockRuntimeState,
      scrubTelegramIosChatInputAreaDock: scrubTelegramIosChatInputAreaDock,
      attachTelegramIosChatInputAreaDockGuard: attachTelegramIosChatInputAreaDockGuard,
      updateChatKeyboardInnerHeightBaseline: updateChatKeyboardInnerHeightBaseline,
      setTelegramIosShellFocusOverrides: setTelegramIosShellFocusOverrides,
      setNativeTelegramIosComposerFocusClasses: setNativeTelegramIosComposerFocusClasses,
      setChatKeyboardOpenClasses: setChatKeyboardOpenClasses,
      scrollVisibleChatMessagesToBottom: scrollVisibleChatMessagesToBottom,
      detachTelegramMiniAppChatThreadRootScrollLock: detachTelegramMiniAppChatThreadRootScrollLock,
      attachTelegramMiniAppChatThreadRootScrollLock: attachTelegramMiniAppChatThreadRootScrollLock,
      shouldSkipPwaChatRootScrollDuringComposerOpen: shouldSkipPwaChatRootScrollDuringComposerOpen,
      isIosPwaChatThreadViewportClearlyClosed: isIosPwaChatThreadViewportClearlyClosed,
      finalizeIosPwaChatThreadClosedKeyboard: finalizeIosPwaChatThreadClosedKeyboard,
      pwaChatThreadRootScrollToZero: pwaChatThreadRootScrollToZero,
      detachPwaChatThreadRootScrollLock: detachPwaChatThreadRootScrollLock,
      attachPwaChatThreadRootScrollLock: attachPwaChatThreadRootScrollLock,
      repairChatFocusViewportOverscroll: repairChatFocusViewportOverscroll,
      scheduleChatKeyboardPostDismissPasses: scheduleChatKeyboardPostDismissPasses,
      clearPendingChatKeyboardDismissTimers: clearPendingChatKeyboardDismissTimers,
      markPwaChatKeyboardOpenIntent: markPwaChatKeyboardOpenIntent,
      markPwaChatKeyboardDismissCleanup: markPwaChatKeyboardDismissCleanup,
      markPwaChatKeyboardScrolledOpenHold: markPwaChatKeyboardScrolledOpenHold,
      clearPwaChatKeyboardOpenHolds: clearPwaChatKeyboardOpenHolds,
      shouldAbortPwaChatKeyboardCleanupForOpening: shouldAbortPwaChatKeyboardCleanupForOpening,
      isChatComposerVirtualKeyboardOpenForRetention: isChatComposerVirtualKeyboardOpenForRetention,
      shouldSkipChatComposerFocusAfterClosedKeyboardSend: shouldSkipChatComposerFocusAfterClosedKeyboardSend,
      keepChatComposerFocusAfterSend: keepChatComposerFocusAfterSend,
      finalizeChatKeyboardDismiss: finalizeChatKeyboardDismiss,
      forcePwaChatKeyboardCleanupIfClosed: forcePwaChatKeyboardCleanupIfClosed
    };
  }
}
