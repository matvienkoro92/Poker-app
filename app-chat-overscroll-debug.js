// Chat overscroll diagnostics for keyboard/layout debugging.

function initChatOverscrollDebugRuntime(deps) {
  deps = deps || {};

  function shouldShowChatKeyboardDebugPanelSafe() {
    try {
      return typeof deps.shouldShowChatKeyboardDebugPanel === "function" && !!deps.shouldShowChatKeyboardDebugPanel();
    } catch (e) {
      return false;
    }
  }

  function logChatKeyboardDebugSafe(stage, suffix) {
    try {
      if (typeof deps.logChatKeyboardDebug === "function") deps.logChatKeyboardDebug(stage, suffix);
    } catch (e) {}
  }

  function getDep(name) {
    return typeof deps[name] === "function" ? deps[name]() : deps[name];
  }

  function pokerDebugChatOverscroll(stage, payload) {
    if (!shouldShowChatKeyboardDebugPanelSafe()) return;
    try {
      var suffix = "";
      if (payload && typeof payload === "object") {
        var parts = [];
        Object.keys(payload).forEach(function (key) {
          var value = payload[key];
          if (value == null || value === "") return;
          parts.push(String(key) + "=" + String(value));
        });
        if (parts.length) suffix = parts.join(" ");
      }
      logChatKeyboardDebugSafe(String(stage || "overscroll"), suffix);
    } catch (eDbgOver) {}
  }

  function collectChatOverscrollSnapshot(stage, focusTarget, extra) {
    if (!shouldShowChatKeyboardDebugPanelSafe()) return;
    try {
      var snap = typeof deps.getChatKeyboardDebugSnapshot === "function" ? deps.getChatKeyboardDebugSnapshot() || {} : {};
      var rootStyle = null;
      try {
        rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
      } catch (eDbgRootStyle) {}
      var viewChat = document.querySelector('.view[data-view="chat"]');
      var viewRect = viewChat && viewChat.getBoundingClientRect ? viewChat.getBoundingClientRect() : null;
      var generalView = getDep("generalView");
      var convView = getDep("convView");
      var generalRect = generalView && generalView.getBoundingClientRect ? generalView.getBoundingClientRect() : null;
      var convRect = convView && convView.getBoundingClientRect ? convView.getBoundingClientRect() : null;
      var msgs = typeof deps.getVisibleMessagesEl === "function" ? deps.getVisibleMessagesEl() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      var area = typeof deps.getActiveChatInputArea === "function" ? deps.getActiveChatInputArea() : null;
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var chatGeneralComposerEl = getDep("chatGeneralComposerEl");
      var chatPersonalComposerEl = getDep("chatPersonalComposerEl");
      var chatComposerEl = getDep("chatComposerEl");
      var chatSharedComposerEl = getDep("chatSharedComposerEl");
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        chatGeneralComposerEl ||
        chatPersonalComposerEl ||
        chatComposerEl ||
        null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var scrollEl = document.scrollingElement || document.documentElement || document.body;
      var payload = {
        event: stage || "",
        state: typeof deps.getChatKeyboardDebugStableState === "function" ? deps.getChatKeyboardDebugStableState() : (snap.stableState || ""),
        focus: typeof deps.getChatKeyboardDebugNodeLabel === "function" ? deps.getChatKeyboardDebugNodeLabel(focusTarget || document.activeElement) : "",
        activeTab: getDep("chatActiveTab") || "",
        mounted: getDep("chatComposerMounted") || "",
        runtimeTg: typeof deps.isTelegramChatRuntime === "function" && deps.isTelegramChatRuntime() ? 1 : 0,
        activeShared: ta === chatSharedComposerEl ? 1 : 0,
        activeGeneral: ta === chatGeneralComposerEl ? 1 : 0,
        activePersonal: ta === chatPersonalComposerEl ? 1 : 0,
        view: viewRect ? Math.round(viewRect.top) + "+" + Math.round(viewRect.height) : "",
        gen: generalRect ? Math.round(generalRect.top) + "+" + Math.round(generalRect.height) : "",
        conv: convRect ? Math.round(convRect.top) + "+" + Math.round(convRect.height) : "",
        msgs: msgsRect ? Math.round(msgsRect.top) + "+" + Math.round(msgsRect.height) : "",
        area: areaRect ? Math.round(areaRect.top) + "+" + Math.round(areaRect.height) : "",
        ta: taRect ? Math.round(taRect.top) + "+" + Math.round(taRect.height) : "",
        msgScr: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgH: msgs ? Math.round(msgs.scrollHeight || 0) + "/" + Math.round(msgs.clientHeight || 0) : "",
        rootScr: scrollEl ? Math.round(scrollEl.scrollTop || 0) : 0,
        winY: Math.round(window.scrollY || 0),
        vv: snap.vvh ? snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop : "",
        tgV: snap.tgVh ? snap.tgVh + "/" + snap.tgVs : "",
        kb: (document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0) + "/" + (document.body.classList.contains("chat-keyboard-open") ? 1 : 0),
        areaPos: snap.areaPos || "",
        areaBottom: snap.areaBottom || "",
        areaTf: snap.areaTransform || "",
        areaCls: area && area.className ? String(area.className).replace(/\s+/g, ".") : "",
        taId: ta && ta.id ? ta.id : "",
        docVv: rootStyle ? String(rootStyle.getPropertyValue("--chat-vv-inset") || "").trim() : "",
        docAcc: rootStyle ? String(rootStyle.getPropertyValue("--chat-ios-accessory-inset") || "").trim() : "",
        dockBottom: Number(window.__pokerChatThreadDockBottomCssPx) || 0,
        lastPad: Number(window.__pokerChatMessagesKeyboardPadLast) || 0,
        lastCover: Number(window.__pokerChatTgKeyboardCoverLast) || 0,
        lastDock: Number(window.__pokerChatLastAppliedDockBottom) || 0,
        focusAge: Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0)),
        openingUntil: Math.max(0, (Number(window.__pokerChatKeyboardOpeningUntil) || 0) - Date.now())
      };
      if (extra && typeof extra === "object") {
        Object.keys(extra).forEach(function (key) {
          payload[key] = extra[key];
        });
      }
      pokerDebugChatOverscroll("snap", payload);
    } catch (eDbgCollect) {
      logChatKeyboardDebugSafe("snap-err", String((eDbgCollect && eDbgCollect.message) || eDbgCollect || ""));
    }
  }

  return {
    pokerDebugChatOverscroll: pokerDebugChatOverscroll,
    collectChatOverscrollSnapshot: collectChatOverscrollSnapshot,
  };
}
