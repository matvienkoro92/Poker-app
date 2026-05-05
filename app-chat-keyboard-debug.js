// Chat keyboard debug runtime isolated from chat lifecycle.
function initChatKeyboardDebugRuntime(deps) {
  deps = deps || {};
  var chatKeyboardDebugLog = [];
  var chatKeyboardDebugPanel = null;
  var chatKeyboardDebugObserver = null;
  var chatKeyboardDebugFocusBound = false;
  var chatKeyboardDebugTickerStarted = false;
  var chatKeyboardDebugLastSnapshotKey = "";

  function value(fn, fallback) {
    try {
      return typeof fn === "function" ? fn() : fallback;
    } catch (eValue) {
      return fallback;
    }
  }
  function getChatActiveTab() { return value(deps.getChatActiveTab, "dialogs"); }
  function getGeneralView() { return value(deps.getGeneralView, null); }
  function getConvView() { return value(deps.getConvView, null); }
  function getChatGeneralInputArea() { return value(deps.getChatGeneralInputArea, null); }
  function getChatPersonalInputArea() { return value(deps.getChatPersonalInputArea, null); }
  function getChatGeneralComposerEl() { return value(deps.getChatGeneralComposerEl, null); }
  function getChatPersonalComposerEl() { return value(deps.getChatPersonalComposerEl, null); }
  function getChatComposerEl() { return value(deps.getChatComposerEl, null); }
  function setChatComposerEl(valueNext) { if (typeof deps.setChatComposerEl === "function") deps.setChatComposerEl(valueNext); }
  function getGeneralMessages() { return value(deps.getGeneralMessages, null); }
  function getMessagesEl() { return value(deps.getMessagesEl, null); }
  function getChatGeneralKeyboardDebugEl() { return value(deps.getChatGeneralKeyboardDebugEl, null); }
  function getChatPersonalKeyboardDebugEl() { return value(deps.getChatPersonalKeyboardDebugEl, null); }
  function isTelegramChatRuntimeSafe() { return !!(typeof deps.isTelegramChatRuntime === "function" && deps.isTelegramChatRuntime()); }
  function pokerPwaStandaloneForKeyboardInsetSafe() { return !!(typeof deps.pokerPwaStandaloneForKeyboardInset === "function" && deps.pokerPwaStandaloneForKeyboardInset()); }
  function isIosLikeForChatViewportSafe() { return !!(typeof deps.isIosLikeForChatViewport === "function" && deps.isIosLikeForChatViewport()); }
  function markPwaIosChatFocusActivationSafe(target, label, cooldownMs) {
    return !!(typeof deps.markPwaIosChatFocusActivation === "function" && deps.markPwaIosChatFocusActivation(target, label, cooldownMs));
  }
  function onChatInputFocusSafe(target) { if (typeof deps.onChatInputFocus === "function") deps.onChatInputFocus(target); }
  function ensureChatKeyboardDebugFloatingPanel() {
    return chatKeyboardDebugPanel;
  }

  function isChatKeyboardDebugAllowedEnvironment() {
    try {
      var h = (window.location && window.location.hostname ? window.location.hostname : "").toLowerCase();
      if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0" || h === "") return true;
      return /(?:\?|&)chatKeyboardDebug=1(?:&|$)/.test(String(location.search || ""));
    } catch (eDbgEnv) {
      return false;
    }
  }
  function shouldShowChatKeyboardDebugPanel() {
    try {
      if (!isChatKeyboardDebugAllowedEnvironment()) {
        try {
          if (window.localStorage && localStorage.getItem("poker_chat_keyboard_debug")) {
            localStorage.removeItem("poker_chat_keyboard_debug");
          }
        } catch (eDbgStorageClear) {}
        return false;
      }
      var pwaIos =
        document.documentElement &&
        document.documentElement.classList &&
        document.documentElement.classList.contains("poker-ios-pwa");
      if (!pwaIos) return false;
      if (window.localStorage && localStorage.getItem("poker_chat_keyboard_debug") === "1") return true;
      return /(?:\?|&)chatKeyboardDebug=1(?:&|$)/.test(String(location.search || ""));
    } catch (eDbgShow) {
      return false;
    }
  }
  function isPokerIosPwaKeyboardRuntime() {
    try {
      var root = document.documentElement;
      return !!(
        root &&
        root.classList &&
        root.classList.contains("poker-ios-pwa") &&
        document.body &&
        String(document.body.getAttribute("data-view") || "") === "chat"
      );
    } catch (eIosPwaRuntime) {
      return false;
    }
  }
  function isChatKeyboardDebugTarget(node) {
    try {
      if (!node || !node.closest) return false;
      return !!node.closest(
        ".chat-input-area, .chat-input-wrap, .chat-tma-ios-minimal-block, .chat-messages, .chat-messages-wrap, .chat-general-view, .chat-conv-view, .chat-container"
      );
    } catch (eDbgTarget) {
      return false;
    }
  }
  function getChatKeyboardDebugNodeLabel(node) {
    try {
      if (!node) return "none";
      var id = node.id ? "#" + node.id : "";
      var cls = "";
      if (node.classList && node.classList.length) cls = "." + Array.prototype.slice.call(node.classList, 0, 3).join(".");
      return String((node.tagName || "node").toLowerCase()) + id + cls;
    } catch (eDbgLabel) {
      return "node";
    }
  }
  function getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) {
    try {
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var wrapRect = wrap && wrap.getBoundingClientRect ? wrap.getBoundingClientRect() : null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      return {
        areaTop: areaRect ? Math.round(areaRect.top) : 0,
        areaH: areaRect ? Math.round(areaRect.height) : 0,
        wrapTop: wrapRect ? Math.round(wrapRect.top) : 0,
        wrapH: wrapRect ? Math.round(wrapRect.height) : 0,
        taTop: taRect ? Math.round(taRect.top) : 0,
        taH: taRect ? Math.round(taRect.height) : 0,
        msgsTop: msgsRect ? Math.round(msgsRect.top) : 0,
        msgsH: msgsRect ? Math.round(msgsRect.height) : 0,
        msgPad: msgs && msgs.style ? String(msgs.style.paddingBottom || "") : "",
        msgScroll: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgScrollH: msgs ? Math.round(msgs.scrollHeight || 0) : 0,
        msgClientH: msgs ? Math.round(msgs.clientHeight || 0) : 0,
        areaPos: area ? String(getComputedStyle(area).position || "") : "",
        areaBottom: area ? String(getComputedStyle(area).bottom || "") : "",
        areaTransform: area ? String(getComputedStyle(area).transform || "") : "",
        areaDisplay: area ? String(getComputedStyle(area).display || "") : "",
        areaVis: area ? String(getComputedStyle(area).visibility || "") : "",
        taBottom: taRect ? Math.round(taRect.bottom) : 0
      };
    } catch (eDbgGeom) {
      return null;
    }
  }
  function getChatKeyboardDebugStableState() {
    try {
      var area = getActiveChatInputArea();
      var cs = area && window.getComputedStyle ? getComputedStyle(area) : null;
      var isDocked =
        !!(
          area &&
          area.classList &&
          area.classList.contains("chat-input-area--vv-dock") &&
          cs &&
          cs.position === "fixed"
        );
      if (isDocked) return "docked";
      if (document.body && document.body.classList && document.body.classList.contains("chat-keyboard-open")) return "flow";
      var active = document.activeElement;
      if (
        active &&
        active.closest &&
        active.closest(".chat-input-area") &&
        String(active.tagName || "").toUpperCase() === "TEXTAREA"
      ) {
        return "focused";
      }
      return "closed";
    } catch (eDbgStable) {
      return "unknown";
    }
  }
  function getActiveChatInputArea() {
    if (getChatActiveTab() === "general" && getGeneralView() && !getGeneralView().classList.contains("chat-general-view--hidden")) {
      return getChatGeneralInputArea() || null;
    }
    if (getChatActiveTab() === "personal" && getConvView() && !getConvView().classList.contains("chat-conv-view--hidden")) {
      return getChatPersonalInputArea() || null;
    }
    return null;
  }
  function getChatKeyboardDebugSnapshot() {
    try {
      var area = getActiveChatInputArea();
      if (!area) {
        area =
          (getChatGeneralInputArea() && !getChatGeneralInputArea().closest(".chat-general-view--hidden") && getChatGeneralInputArea()) ||
          (getChatPersonalInputArea() && !getChatPersonalInputArea().closest(".chat-conv-view--hidden") && getChatPersonalInputArea()) ||
          getChatGeneralInputArea() ||
          getChatPersonalInputArea() ||
          null;
      }
      var wrap = area && area.querySelector ? area.querySelector(".chat-input-wrap, .chat-tma-ios-minimal-block") : null;
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        getChatGeneralComposerEl() ||
        getChatPersonalComposerEl() ||
        getChatComposerEl() ||
        null;
      var msgs = null;
      if (area && area === getChatGeneralInputArea()) msgs = getGeneralMessages() || null;
      else if (area && area === getChatPersonalInputArea()) msgs = getMessagesEl() || null;
      else if (typeof deps.getVisibleMessagesEl === "function") msgs = deps.getVisibleMessagesEl() || null;
      var vv = window.visualViewport || null;
      var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var active = document.activeElement || null;
      var appEl = document.getElementById("app");
      var appRect = appEl && appEl.getBoundingClientRect ? appEl.getBoundingClientRect() : null;
      var bodyRect = document.body && document.body.getBoundingClientRect ? document.body.getBoundingClientRect() : null;
      var docRect = document.documentElement && document.documentElement.getBoundingClientRect ? document.documentElement.getBoundingClientRect() : null;
      var container =
        area && area.closest
          ? area.closest(".chat-container, .chat-general-view, .chat-dialogs-view")
          : null;
      var containerRect = container && container.getBoundingClientRect ? container.getBoundingClientRect() : null;
      var safeBottom = 0;
      try {
        var rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
        safeBottom = Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0);
      } catch (eDbgSafe) {}
      var geom = getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) || {};
      return {
        ih: window.innerHeight || 0,
        iw: window.innerWidth || 0,
        vvh: vv ? Math.round(Number(vv.height) || 0) : 0,
        vvTop: vv ? Math.round(Number(vv.offsetTop) || 0) : 0,
        vvPageTop: vv ? Math.round(Number(vv.pageTop) || 0) : 0,
        tgVh: tw ? Math.round(Number(tw.viewportHeight) || 0) : 0,
        tgVs: tw ? Math.round(Number(tw.viewportStableHeight) || 0) : 0,
        appTop: appRect ? Math.round(appRect.top) : 0,
        appH: appRect ? Math.round(appRect.height) : 0,
        bodyTop: bodyRect ? Math.round(bodyRect.top) : 0,
        bodyH: bodyRect ? Math.round(bodyRect.height) : 0,
        docTop: docRect ? Math.round(docRect.top) : 0,
        docH: docRect ? Math.round(docRect.height) : 0,
        contTop: containerRect ? Math.round(containerRect.top) : 0,
        contH: containerRect ? Math.round(containerRect.height) : 0,
        areaTop: geom.areaTop || 0,
        areaH: geom.areaH || 0,
        wrapTop: geom.wrapTop || 0,
        wrapH: geom.wrapH || 0,
        msgsTop: geom.msgsTop || 0,
        msgsH: geom.msgsH || 0,
        taTop: geom.taTop || 0,
        taH: geom.taH || 0,
        taBottom: geom.taBottom || 0,
        msgPad: geom.msgPad || "",
        msgScroll: geom.msgScroll || 0,
        msgScrollH: geom.msgScrollH || 0,
        msgClientH: geom.msgClientH || 0,
        areaPos: geom.areaPos || "",
        areaBottom: geom.areaBottom || "",
        areaTransform: geom.areaTransform || "",
        areaDisplay: geom.areaDisplay || "",
        areaVis: geom.areaVis || "",
        safeBottom: safeBottom,
        version: String(document.documentElement.getAttribute("data-app-version") || ""),
        iosPwa: document.documentElement.classList.contains("poker-ios-pwa") ? 1 : 0,
        stableState: getChatKeyboardDebugStableState(),
        winY: Math.round(window.scrollY || 0),
        active: getChatKeyboardDebugNodeLabel(active),
        areaNode: getChatKeyboardDebugNodeLabel(area),
        containerNode: getChatKeyboardDebugNodeLabel(container),
        wrapNode: getChatKeyboardDebugNodeLabel(wrap),
        taNode: getChatKeyboardDebugNodeLabel(ta),
        htmlKb: document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0,
        bodyKb: document.body.classList.contains("chat-keyboard-open") ? 1 : 0
      };
    } catch (eDbgSnap) {
      return null;
    }
  }
  function renderChatKeyboardDebugPanel() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    var snap = getChatKeyboardDebugSnapshot();
    var tail = chatKeyboardDebugLog.slice(-6);
    var lines = [];
    if (snap) {
      lines.push(
        "ver:" + snap.version +
          " iosPwa:" + snap.iosPwa +
          " " +
        "ih:" + snap.ih + " iw:" + snap.iw +
          " vv:" + snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop +
          " tg:" + snap.tgVh + "/" + snap.tgVs
      );
      lines.push(
        "app:" + snap.appTop + "+" + snap.appH +
          " body:" + snap.bodyTop + "+" + snap.bodyH +
          " doc:" + snap.docTop + "+" + snap.docH
      );
      lines.push(
        "cont:" + snap.contTop + "+" + snap.contH +
        " msgs:" + snap.msgsTop + "+" + snap.msgsH +
        " area:" + snap.areaTop + "+" + snap.areaH +
          " wrap:" + snap.wrapTop + "+" + snap.wrapH +
          " ta:" + snap.taTop + "+" + snap.taH + "/" + snap.taBottom
      );
      lines.push(
        "pos:" + snap.areaPos +
          " bottom:" + snap.areaBottom +
          " dock:" + (Number(window.__pokerChatThreadDockBottomCssPx) || 0) + "/" + (Number(window.__pokerChatLastAppliedDockBottom) || 0) +
          " state:" + snap.stableState +
          " wd:" + Math.max(0, Math.round(((Number(window.__pokerChatPwaDockWatchdogUntil) || 0) - Date.now()) / 100)) +
          " pad:" + snap.msgPad +
          " scr:" + snap.msgScroll + "/" + snap.msgScrollH + "/" + snap.msgClientH +
          " winY:" + snap.winY
      );
      lines.push(
        "tr:" + snap.areaTransform +
          " dsp:" + snap.areaDisplay +
          " vis:" + snap.areaVis +
          " kb:" + snap.htmlKb + "/" + snap.bodyKb +
          " safe:" + snap.safeBottom
      );
      lines.push(
        "act:" + snap.active
      );
      lines.push(
        "areaN:" + snap.areaNode
      );
      lines.push(
        "contN:" + snap.containerNode
      );
    }
    tail.forEach(function (item) {
      lines.push(item);
    });
    var floatingPanel = ensureChatKeyboardDebugFloatingPanel();
    try {
      document.documentElement.classList.add("chat-keyboard-debug-on");
    } catch (eDbgCls) {}
    if (floatingPanel) {
      floatingPanel.textContent = lines.join("\n");
      floatingPanel.hidden = false;
      floatingPanel.setAttribute("aria-hidden", "false");
    }
    [getChatGeneralKeyboardDebugEl(), getChatPersonalKeyboardDebugEl()].forEach(function (panel) {
      if (!panel) return;
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      panel.textContent = lines.join("\n");
    });
  }
  function logChatKeyboardDebug(source, extra) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot() || {};
      var line =
        String(source || "evt") +
        " ih=" + (snap.ih || 0) +
        " vv=" + (snap.vvh || 0) + "/" + (snap.vvTop || 0) +
        " area=" + (snap.areaTop || 0) + "+" + (snap.areaH || 0) +
        " ta=" + (snap.taTop || 0) + "+" + (snap.taH || 0);
      if (extra) line += " " + extra;
      chatKeyboardDebugLog.push(line);
      if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
    } catch (eDbgLog) {}
    renderChatKeyboardDebugPanel();
  }
  function pumpChatKeyboardDebugSnapshot(source) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot();
      if (!snap) return;
      var key = [
        snap.ih,
        snap.vvh,
        snap.vvTop,
        snap.tgVh,
        snap.tgVs,
        snap.areaTop,
        snap.areaH,
        snap.wrapTop,
        snap.wrapH,
        snap.taTop,
        snap.taH,
        snap.msgPad,
        snap.msgScroll,
        snap.areaPos,
        snap.areaBottom,
        snap.areaTransform,
        snap.active,
        snap.areaNode
      ].join("|");
      if (key !== chatKeyboardDebugLastSnapshotKey) {
        chatKeyboardDebugLastSnapshotKey = key;
        chatKeyboardDebugLog.push(
          String(source || "tick") +
            " ih=" + snap.ih +
            " vv=" + snap.vvh + "/" + snap.vvTop +
            " area=" + snap.areaTop + "+" + snap.areaH +
            " ta=" + snap.taTop + "+" + snap.taH +
            " act=" + snap.active
        );
        if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
      }
    } catch (eDbgPump) {}
    renderChatKeyboardDebugPanel();
  }
  function installChatKeyboardDebugObservers() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      if (chatKeyboardDebugObserver) chatKeyboardDebugObserver.disconnect();
    } catch (eDbgObsOff) {}
    try {
      chatKeyboardDebugObserver = new MutationObserver(function (records) {
        var parts = [];
        records.forEach(function (rec) {
          if (!rec || !rec.target) return;
          if (!isChatKeyboardDebugTarget(rec.target)) return;
          var id = getChatKeyboardDebugNodeLabel(rec.target);
          parts.push(id + ":" + rec.attributeName);
        });
        if (parts.length) logChatKeyboardDebug("mut", parts.join(","));
      });
      [
        document.documentElement,
        document.body,
        document.querySelector('.view[data-view="chat"]'),
        getChatGeneralInputArea(),
        getChatPersonalInputArea(),
        getGeneralView(),
        getConvView(),
        getGeneralMessages(),
        getMessagesEl()
      ].forEach(function (node) {
        if (!node || !chatKeyboardDebugObserver) return;
        chatKeyboardDebugObserver.observe(node, {
          attributes: true,
          attributeFilter: ["class", "style"],
          childList: true,
          subtree: true
        });
      });
    } catch (eDbgObs) {}
    try {
      if (!chatKeyboardDebugFocusBound) {
        chatKeyboardDebugFocusBound = true;
        document.addEventListener(
          "focusin",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusin*", getChatKeyboardDebugNodeLabel(target));
            try {
              if (
                target &&
                String(target.tagName || "").toUpperCase() === "TEXTAREA" &&
                target.closest &&
                target.closest(".chat-input-area") &&
                (!isTelegramChatRuntimeSafe() || isPokerIosPwaKeyboardRuntime()) &&
                (
                  isPokerIosPwaKeyboardRuntime() ||
                  (
                    pokerPwaStandaloneForKeyboardInsetSafe() &&
                    isIosLikeForChatViewportSafe()
                  )
                )
              ) {
                setChatComposerEl(target);
                var hadPwaFocusinKeyboardBinding = !!target.__pokerChatKeyboardEventsBound;
                if (typeof deps.bindChatComposerKeyboardEvents === "function") deps.bindChatComposerKeyboardEvents(target);
                if (markPwaIosChatFocusActivationSafe(target, hadPwaFocusinKeyboardBinding ? "focusin-bound" : "focusin", hadPwaFocusinKeyboardBinding ? 120 : 260)) {
                  setTimeout(function () {
                    try {
                      onChatInputFocusSafe(target);
                    } catch (ePwaFocusInActivate) {}
                  }, 0);
                }
              }
            } catch (ePwaFocusInFallback) {}
          },
          true
        );
        document.addEventListener(
          "focusout",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusout*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "touchstart",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!target) return;
            if (!isChatKeyboardDebugTarget(target) && !(target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("touch*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "selectionchange",
          function () {
            pumpChatKeyboardDebugSnapshot("sel*");
          },
          true
        );
      }
    } catch (eDbgFocusBind) {}
    try {
      if (window.visualViewport && window.visualViewport.addEventListener && !window.__pokerChatKeyboardDebugVvBound) {
        window.__pokerChatKeyboardDebugVvBound = true;
        window.visualViewport.addEventListener("resize", function () {
          logChatKeyboardDebug("vv-resize");
        });
        window.visualViewport.addEventListener("scroll", function () {
          logChatKeyboardDebug("vv-scroll");
        });
      }
    } catch (eDbgVv) {}
    try {
      if (!window.__pokerChatKeyboardDebugWinBound) {
        window.__pokerChatKeyboardDebugWinBound = true;
        window.addEventListener("resize", function () {
          logChatKeyboardDebug("win-resize");
        });
        window.addEventListener("scroll", function () {
          logChatKeyboardDebug("win-scroll");
        }, true);
      }
    } catch (eDbgWin) {}
    try {
      if (!chatKeyboardDebugTickerStarted) {
        chatKeyboardDebugTickerStarted = true;
        window.setInterval(function () {
          pumpChatKeyboardDebugSnapshot("tick");
        }, 180);
      }
    } catch (eDbgTicker) {}
  }
  renderChatKeyboardDebugPanel();

  return {
    shouldShowChatKeyboardDebugPanel: shouldShowChatKeyboardDebugPanel,
    isPokerIosPwaKeyboardRuntime: isPokerIosPwaKeyboardRuntime,
    getActiveChatInputArea: getActiveChatInputArea,
    getChatKeyboardDebugSnapshot: getChatKeyboardDebugSnapshot,
    logChatKeyboardDebug: logChatKeyboardDebug,
    pumpChatKeyboardDebugSnapshot: pumpChatKeyboardDebugSnapshot,
    installChatKeyboardDebugObservers: installChatKeyboardDebugObservers,
    renderChatKeyboardDebugPanel: renderChatKeyboardDebugPanel
  };
}
