// Split chat keyboard dock runtime: viewport-events.

function initChatKeyboardDockViewportEvents(opts) {
  opts = opts || {};
  with (opts) {
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
    return {
      resetChatVisualViewportState: resetChatVisualViewportState,
      applyChatVisualViewportFallbackWithoutVv: applyChatVisualViewportFallbackWithoutVv,
      computeChatVisualViewportMetrics: computeChatVisualViewportMetrics,
      syncPwaChatVisualViewportInset: syncPwaChatVisualViewportInset,
      onChatInputFocus: onChatInputFocus,
      isAnyChatKeyboardChromeFocus: isAnyChatKeyboardChromeFocus,
      pokerPwaBlurProceedDespiteDomFocus: pokerPwaBlurProceedDespiteDomFocus,
      isChatKeyboardLayoutEffectivelyClosed: isChatKeyboardLayoutEffectivelyClosed,
      shouldDeferChatKeyboardFinalizeForFocus: shouldDeferChatKeyboardFinalizeForFocus,
      shouldHoldIosPwaChatComposerFocus: shouldHoldIosPwaChatComposerFocus,
      isRecentIosPwaChatComposerUserDismiss: isRecentIosPwaChatComposerUserDismiss,
      markIosPwaChatComposerKeepAlive: markIosPwaChatComposerKeepAlive,
      isIosPwaChatComposerOpeningHoldActive: isIosPwaChatComposerOpeningHoldActive,
      scheduleIosPwaComposerFinalizeIfStillClosed: scheduleIosPwaComposerFinalizeIfStillClosed,
      refocusIosPwaChatComposerAfterTransientBlur: refocusIosPwaChatComposerAfterTransientBlur,
      rescueIosPwaChatComposerBlurUnlessExplicit: rescueIosPwaChatComposerBlurUnlessExplicit,
      onChatInputBlur: onChatInputBlur,
      bindChatComposerKeyboardEvents: bindChatComposerKeyboardEvents
    };
  }
}
