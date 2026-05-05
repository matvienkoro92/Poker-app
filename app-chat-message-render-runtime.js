function initChatMessageRenderRuntime(deps) {
  deps = deps || {};
  var generalMessages = deps.generalMessages || null;
  var messagesEl = deps.messagesEl || null;
  var base = deps.base || "";
  var personalMessagesCache = deps.personalMessagesCache || {};
  var personalHasMoreBeforeByPeer = deps.personalHasMoreBeforeByPeer || {};
  var POKER_CHAT_DISK_PERSONAL_MAX_MSG = deps.POKER_CHAT_DISK_PERSONAL_MAX_MSG || 80;
  var chatRenderState = {};
  Object.defineProperties(chatRenderState, {
    chatWithUserId: { get: typeof deps.getChatWithUserId === "function" ? deps.getChatWithUserId : function () { return null; } },
    generalHasMoreBefore: { get: typeof deps.getGeneralHasMoreBefore === "function" ? deps.getGeneralHasMoreBefore : function () { return false; } },
    scrollGeneralToBottomOnNextRender: {
      get: typeof deps.getScrollGeneralToBottomOnNextRender === "function" ? deps.getScrollGeneralToBottomOnNextRender : function () { return false; },
      set: typeof deps.setScrollGeneralToBottomOnNextRender === "function" ? deps.setScrollGeneralToBottomOnNextRender : function () {}
    },
    scrollPersonalToBottomOnNextRender: {
      get: typeof deps.getScrollPersonalToBottomOnNextRender === "function" ? deps.getScrollPersonalToBottomOnNextRender : function () { return false; },
      set: typeof deps.setScrollPersonalToBottomOnNextRender === "function" ? deps.setScrollPersonalToBottomOnNextRender : function () {}
    }
  });
  var buildGeneralMessagesBodyHtml = deps.buildGeneralMessagesBodyHtml || function () { return ""; };
  var buildPersonalMessagesBodyHtml = deps.buildPersonalMessagesBodyHtml || function () { return ""; };
  var renderLoadOlderButtonHtml = deps.renderLoadOlderButtonHtml || function () { return ""; };
  var pokerMaybeClearSelfPinIfIdMissing = deps.pokerMaybeClearSelfPinIfIdMissing || function () {};
  var refreshChatSelfPinBars = deps.refreshChatSelfPinBars || function () {};
  var scheduleSyncChatScrollBottomButtons = deps.scheduleSyncChatScrollBottomButtons || function () {};
  var applyChatMsgTallTextTimeBelowLayout = deps.applyChatMsgTallTextTimeBelowLayout || function () {};
  var pinChatMessagesToBottomImagesOnly = deps.pinChatMessagesToBottomImagesOnly || function () {};
  var settleChatOpeningMediaLayout = deps.settleChatOpeningMediaLayout || function (el, wrapEl, done) { if (typeof done === "function") done(); };
  var pinChatMessagesToBottom = deps.pinChatMessagesToBottom || function () {};
  var bindChatMsgNameProfileButtons = deps.bindChatMsgNameProfileButtons || function () {};
  var pokerApiHasCredential = deps.pokerApiHasCredential || function () { return false; };
  var pokerApiAuthJsonBody = deps.pokerApiAuthJsonBody || function (body) { return body || {}; };
  var prepareChatDeleteConfirm = deps.prepareChatDeleteConfirm || function () {};
  var loadGeneral = deps.loadGeneral || function () {};
  var loadMessages = deps.loadMessages || function () {};
  var startChatEdit = deps.startChatEdit || function () {};
  var resolveMyChatDisplayName = deps.resolveMyChatDisplayName || function () { return ""; };
  var attachContextMenuForOthers = deps.attachContextMenuForOthers || function () {};

  function renderGeneralMessages(messages) {
    messages = (messages || []).filter(function (m) {
      return !(m && m.clubAdmissionNotice);
    });
    var generalMsgWrapEarly = generalMessages ? generalMessages.parentElement : null;
    var openingForceBottomG = chatRenderState.scrollGeneralToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("general", null, messages);
    } catch (ePinG) {}
    if (!messages || messages.length === 0) {
      if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
        generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      generalMessages.innerHTML = '<p class="chat-empty">Нет сообщений. Напишите первым!</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinG2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbGE) {}
      return;
    }
    var bodyHtml = buildGeneralMessagesBodyHtml(messages);
    var html = (chatRenderState.generalHasMoreBefore ? renderLoadOlderButtonHtml("general") : "") + bodyHtml;
    if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
      generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTop = generalMessages.scrollTop;
    var prevScrollHeight = generalMessages.scrollHeight;
    var wasNearBottom = prevScrollHeight - prevScrollTop - generalMessages.clientHeight < 80;
    generalMessages.innerHTML = html;
    function restoreScroll(clearScrollFlag) {
      var maxScroll = generalMessages.scrollHeight - generalMessages.clientHeight;
      if (openingForceBottomG || wasNearBottom || maxScroll <= 0) {
        generalMessages.scrollTop = generalMessages.scrollHeight;
        if (clearScrollFlag && openingForceBottomG) chatRenderState.scrollGeneralToBottomOnNextRender = false;
      } else {
        generalMessages.scrollTop = Math.min(prevScrollTop, Math.max(0, maxScroll));
      }
    }
    if (openingForceBottomG) {
      try {
        if (generalMsgWrapEarly && generalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          generalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettleGFlag) {}
      try {
        generalMessages.scrollTop = generalMessages.scrollHeight;
      } catch (eScG0) {}
      var rafOpenG = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenG(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        try {
          generalMessages.scrollTop = generalMessages.scrollHeight;
        } catch (eScG1) {}
        chatRenderState.scrollGeneralToBottomOnNextRender = false;
        try {
          generalMessages.__pokerChatOpeningStickBottom = true;
        } catch (eStickOG) {}
        pinChatMessagesToBottomImagesOnly(generalMessages);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbG) {}
        settleChatOpeningMediaLayout(generalMessages, generalMsgWrapEarly, function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG2) {}
        });
        rafOpenG(function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG3) {}
        });
      });
    } else {
      restoreScroll(false);
      requestAnimationFrame(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        restoreScroll(true);
        if (wasNearBottom) {
          pinChatMessagesToBottom(generalMessages, false);
        }
      });
    }
    bindChatMsgNameProfileButtons(generalMessages);
    generalMessages.querySelectorAll("[data-chat-load-older=\"general\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderGeneralMessages === "function") window.__pokerLoadOlderGeneralMessages();
      });
    });
    generalMessages.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    generalMessages.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadGeneral();
        });
      });
    });
    generalMessages.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("general", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    attachContextMenuForOthers(generalMessages, "general", generalMessages);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfG) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbG) {}
  }


  function renderMessages(messages) {
    if (!messagesEl) return;
    if (Array.isArray(messages) && messages.length > POKER_CHAT_DISK_PERSONAL_MAX_MSG) {
      messages = messages.slice(-POKER_CHAT_DISK_PERSONAL_MAX_MSG);
      if (chatRenderState.chatWithUserId) personalMessagesCache[chatRenderState.chatWithUserId] = messages;
    }
    var personalMsgWrapEarly = messagesEl.parentElement;
    var openingForceBottomP = chatRenderState.scrollPersonalToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("personal", chatRenderState.chatWithUserId, messages);
    } catch (ePinPM) {}
    if (!messages || messages.length === 0) {
      if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
        personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      messagesEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinPM2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbPE) {}
      return;
    }
    var activePeerForRender = chatRenderState.chatWithUserId ? String(chatRenderState.chatWithUserId) : "";
    var hasMoreBeforePersonal = !!(activePeerForRender && personalHasMoreBeforeByPeer[activePeerForRender]);
    var bodyHtml = buildPersonalMessagesBodyHtml(messages);
    var html = (hasMoreBeforePersonal ? renderLoadOlderButtonHtml("personal") : "") + bodyHtml;
    if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
      personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTopP = messagesEl.scrollTop;
    var prevScrollHeightP = messagesEl.scrollHeight;
    var wasNearBottomP = prevScrollHeightP - prevScrollTopP - messagesEl.clientHeight < 80;
    messagesEl.innerHTML = html;
    function restoreScrollP(clearScrollFlag) {
      var maxScrollP = messagesEl.scrollHeight - messagesEl.clientHeight;
      if (openingForceBottomP || wasNearBottomP || maxScrollP <= 0) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
        if (clearScrollFlag && openingForceBottomP) chatRenderState.scrollPersonalToBottomOnNextRender = false;
      } else {
        messagesEl.scrollTop = Math.min(prevScrollTopP, Math.max(0, maxScrollP));
      }
    }
    if (openingForceBottomP) {
      try {
        if (personalMsgWrapEarly && personalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          personalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettlePFlag) {}
      try {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      } catch (eScP0) {}
      var rafOpenP = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenP(function () {
        applyChatMsgTallTextTimeBelowLayout(messagesEl);
        try {
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } catch (eScP1) {}
        chatRenderState.scrollPersonalToBottomOnNextRender = false;
        try {
          messagesEl.__pokerChatOpeningStickBottom = true;
        } catch (eStickOP) {}
        pinChatMessagesToBottomImagesOnly(messagesEl);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbP) {}
        settleChatOpeningMediaLayout(messagesEl, personalMsgWrapEarly, function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP2) {}
        });
        rafOpenP(function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP3) {}
        });
      });
    } else {
      restoreScrollP(false);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          applyChatMsgTallTextTimeBelowLayout(messagesEl);
          restoreScrollP(true);
          if (wasNearBottomP) {
            pinChatMessagesToBottom(messagesEl, false);
          }
        });
      });
    }
    messagesEl.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id, with: chatRenderState.chatWithUserId })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadMessages();
        });
      });
    });
    messagesEl.querySelectorAll("[data-chat-load-older=\"personal\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderPersonalMessages === "function") window.__pokerLoadOlderPersonalMessages();
      });
    });
    messagesEl.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("personal", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    messagesEl.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    attachContextMenuForOthers(messagesEl, "personal", messagesEl);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfP) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbP) {}
    bindChatMsgNameProfileButtons(messagesEl);
  }


  return {
    renderGeneralMessages: renderGeneralMessages,
    renderMessages: renderMessages
  };
}
