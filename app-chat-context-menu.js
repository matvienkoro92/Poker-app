// Chat context menu: long-press actions, replies, copy, delete and pins.

function initChatContextMenuHandlers(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (body) { return body || {}; };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var pokerEventPathHasChatVoiceUi = typeof opts.pokerEventPathHasChatVoiceUi === "function" ? opts.pokerEventPathHasChatVoiceUi : function () { return false; };
  var getChatIsAdmin = typeof opts.getChatIsAdmin === "function" ? opts.getChatIsAdmin : function () { return false; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var setGeneralReplyTo = typeof opts.setGeneralReplyTo === "function" ? opts.setGeneralReplyTo : function () {};
  var setPersonalReplyTo = typeof opts.setPersonalReplyTo === "function" ? opts.setPersonalReplyTo : function () {};
  var focusChatComposerForReply = typeof opts.focusChatComposerForReply === "function" ? opts.focusChatComposerForReply : function () {};
  var sendReaction = typeof opts.sendReaction === "function" ? opts.sendReaction : function () {};
  var clearChatEditUI = typeof opts.clearChatEditUI === "function" ? opts.clearChatEditUI : function () {};
  var startChatEdit = typeof opts.startChatEdit === "function" ? opts.startChatEdit : function () {};
  var prepareChatDeleteConfirm = typeof opts.prepareChatDeleteConfirm === "function" ? opts.prepareChatDeleteConfirm : function () {};
  var patchCachedDeletedMessage = typeof opts.patchCachedDeletedMessage === "function" ? opts.patchCachedDeletedMessage : function () { return false; };
  var applyDeletedMessageToDom = typeof opts.applyDeletedMessageToDom === "function" ? opts.applyDeletedMessageToDom : function () { return false; };
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var refreshChatSelfPinBars = typeof opts.refreshChatSelfPinBars === "function" ? opts.refreshChatSelfPinBars : function () {};
  var pokerBuildSelfPinRecord = typeof opts.pokerBuildSelfPinRecord === "function" ? opts.pokerBuildSelfPinRecord : function () { return null; };
  var pokerSetSelfPin = typeof opts.pokerSetSelfPin === "function" ? opts.pokerSetSelfPin : function () {};
  var pokerClearSelfPin = typeof opts.pokerClearSelfPin === "function" ? opts.pokerClearSelfPin : function () {};
  var ctxMsgState = null;
  var ctxSourceState = null;
  var ctxOpenedElState = null;

/** Мышь/трекпад: long-press на mousedown ломает выделение текста; меню — через ПКМ (contextmenu). Синхрон с CSS (pointer: fine), без hover — в PWA часто hover: none. */
function pokerChatFinePointerLikeDesktop() {
  try {
    return !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches);
  } catch (eFPD) {
    return false;
  }
}
function attachContextMenuForOthers(container, source, scrollParentOpt) {
  var ctxMenu = document.getElementById("chatContextMenu");
  var ctxBackdrop = document.getElementById("chatContextBackdrop");
  var longPressTimer = null;
  var menuOpenedAt = 0;
  function showMenu(el, msg, coords) {
    ctxMsgState = msg;
    ctxSourceState = source;
    ctxOpenedElState = el;
    if (!ctxMenu) return;
    var isSelfStub = el.classList.contains("chat-msg--self-pin-stub") && !el.classList.contains("chat-msg--global-pin-stub");
    var isGlobalStub = el.classList.contains("chat-msg--global-pin-stub");
    var stub = isSelfStub || isGlobalStub;
    var reactRow = ctxMenu.querySelector(".chat-ctx-menu__reactions");
    if (stub) {
      if (reactRow) reactRow.style.display = "none";
      ctxMenu.querySelectorAll(".chat-ctx-menu__item").forEach(function (item) {
        var a = item.dataset.action;
        if (isGlobalStub) {
          if (a === "unpin-global" && getChatIsAdmin()) item.style.display = "";
          else if (a === "copy" && msg.text) item.style.display = "";
          else item.style.display = "none";
        } else {
          if (a === "unpin") item.style.display = "";
          else if (a === "copy" && msg.text) item.style.display = "";
          else item.style.display = "none";
        }
      });
    } else {
      if (reactRow) reactRow.style.display = "";
      var isOwn = !!msg.own;
      var canEdit = isOwn && !msg.hasImage && !msg.hasVoice && !msg.hasDocument;
      var canDelete = isOwn || !!getChatIsAdmin();
      ctxMenu.querySelectorAll("[data-action=\"delete\"]").forEach(function (item) {
        item.style.display = canDelete ? "" : "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"edit\"]").forEach(function (item) {
        item.style.display = canEdit ? "" : "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"pin\"]").forEach(function (item) {
        item.style.display = msg && pokerChatMessageHasPersistedId(msg.id) ? "" : "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"pin-global\"]").forEach(function (item) {
        item.style.display = source === "general" && getChatIsAdmin() && msg && pokerChatMessageHasPersistedId(msg.id) ? "" : "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"unpin\"]").forEach(function (item) {
        item.style.display = "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"unpin-global\"]").forEach(function (item) {
        item.style.display = "none";
      });
      ctxMenu.querySelectorAll("[data-action=\"reply\"]").forEach(function (item) {
        item.style.display = "";
      });
      ctxMenu.querySelectorAll("[data-action=\"copy\"]").forEach(function (item) {
        item.style.display = "";
      });
    }
    if (ctxBackdrop) {
      ctxBackdrop.classList.add("chat-ctx-backdrop--visible");
      ctxBackdrop.setAttribute("aria-hidden", "false");
    }
    el.classList.add("chat-msg--ctx-highlight");
    /* Не вызывать scrollIntoView: на iOS/WebKit прокручивается вся цепочка предков (включая
       document), из‑за чего «улетает» лента, строка ввода и ломается обратная прокрутка. */
    var GAP = 10;
    var menuWidth = 300;
    var bottomNavHeight = 96;
    var maxBottom = window.innerHeight - bottomNavHeight;
    ctxMenu.style.width = menuWidth + "px";
    ctxMenu.style.maxWidth = (window.innerWidth - 24) + "px";
    ctxMenu.style.maxHeight = Math.max(160, maxBottom - 24) + "px";
    ctxMenu.style.overflowY = "auto";
    ctxMenu.style.top = "-9999px";
    ctxMenu.style.left = "12px";
    ctxMenu.style.visibility = "hidden";
    ctxMenu.classList.add("chat-ctx-menu--visible");
    ctxMenu.setAttribute("aria-hidden", "false");
    menuOpenedAt = Date.now();
    function computeCtxMenuLayout() {
      var menuHeight = ctxMenu.offsetHeight;
      var rect = el.getBoundingClientRect();
      var anchorX = coords && typeof coords.x === "number" ? coords.x : rect.left + rect.width / 2;
      var anchorY = coords && typeof coords.y === "number" ? coords.y : rect.bottom;
      var menuTop = anchorY + GAP;
      if (menuTop + menuHeight > maxBottom) menuTop = anchorY - GAP - menuHeight;
      return { menuHeight: menuHeight, anchorX: anchorX, anchorY: anchorY, menuTop: menuTop };
    }
    function applyCtxMenuLayout(layout) {
      var menuTop = Math.max(12, Math.min(layout.menuTop, maxBottom - layout.menuHeight));
      var actualMenuWidth = Math.min(menuWidth, ctxMenu.offsetWidth || menuWidth, window.innerWidth - 24);
      var menuLeft = Math.max(12, Math.min(Math.round(layout.anchorX - actualMenuWidth / 2), window.innerWidth - actualMenuWidth - 12));
      ctxMenu.style.top = menuTop + "px";
      ctxMenu.style.left = menuLeft + "px";
      ctxMenu.style.visibility = "";
    }
    requestAnimationFrame(function () {
      var layout = computeCtxMenuLayout();
      applyCtxMenuLayout(layout);
    });
  }
  function hideMenu() {
    if (ctxOpenedElState) {
      try {
        ctxOpenedElState.classList.remove("chat-msg--ctx-highlight");
      } catch (eHl) {}
      ctxOpenedElState = null;
    }
    if (ctxBackdrop) {
      ctxBackdrop.classList.remove("chat-ctx-backdrop--visible");
      ctxBackdrop.setAttribute("aria-hidden", "true");
    }
    if (ctxMenu) {
      ctxMenu.style.visibility = "";
      ctxMenu.classList.remove("chat-ctx-menu--visible");
      ctxMenu.setAttribute("aria-hidden", "true");
    }
    ctxMsgState = null;
    ctxSourceState = null;
    if (typeof menuPointerDown !== "undefined") menuPointerDown = false;
    if (typeof currentActiveItem !== "undefined") currentActiveItem = null;
  }
  function attachToEl(el) {
    function onLongPress(coords) {
      var textEl = el.querySelector(".chat-msg__text");
      var text = textEl ? (textEl.textContent || "").trim() : "";
      if (
        (el.classList.contains("chat-msg--self-pin-stub") || el.classList.contains("chat-msg--global-pin-stub")) &&
        el.dataset.msgText
      ) {
        text = String(el.dataset.msgText || "")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .trim();
      }
      var hasImage = !!(el.querySelector(".chat-msg__image") || el.querySelector(".chat-pinned-self__thumb"));
      var hasVoice = !!el.querySelector(".chat-msg__voice");
      var hasDocument = !!el.querySelector(".chat-msg__document");
      var isOwn = el.classList.contains("chat-msg--own");
      showMenu(el, {
        id: el.dataset.msgId,
        from: el.dataset.msgFrom || "",
        fromName: (el.dataset.msgFromName || "Игрок").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"),
        text: text,
        hasImage: hasImage,
        hasVoice: hasVoice,
        hasDocument: hasDocument,
        own: isOwn,
        msgText: isOwn ? (el.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : "",
      }, coords);
    }
    var startX = 0;
    var startY = 0;
    function startTimer(e) {
      if (longPressTimer) return;
      if (pokerEventPathHasChatVoiceUi(e)) return;
      if (e && e.touches && e.touches[0]) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else if (e && e.clientX != null && e.clientY != null) {
        startX = e.clientX;
        startY = e.clientY;
      }
      longPressTimer = setTimeout(function () {
        longPressTimer = null;
        onLongPress({ x: startX, y: startY });
        if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
      }, 500);
    }
    function clearTimer() {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    }
    function onTouchMove(e) {
      if (!longPressTimer) return;
      if (!e.touches || !e.touches[0]) return;
      var dx = Math.abs(e.touches[0].clientX - startX);
      var dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 8 || dy > 8) clearTimer();
    }
    el.addEventListener("touchstart", startTimer, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", clearTimer);
    el.addEventListener("touchcancel", clearTimer);
    if (!pokerChatFinePointerLikeDesktop()) {
      el.addEventListener("mousedown", startTimer);
      el.addEventListener("mouseup", clearTimer);
      el.addEventListener("mouseleave", clearTimer);
    }
    el.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      onLongPress();
    });
  }
  container.querySelectorAll(".chat-msg[data-msg-id]").forEach(attachToEl);
  if (ctxMenu && !ctxMenu.dataset.chatCtxBound) {
    ctxMenu.dataset.chatCtxBound = "1";
    if (ctxBackdrop) ctxBackdrop.addEventListener("click", hideMenu);

    // «Изменить» обрабатываем в capture, чтобы сработать ДО document click (который закрывает меню и обнуляет ctxMsgState).
    function onMenuEditCapture(e) {
      var editBtn = e.target && e.target.closest ? e.target.closest(".chat-ctx-menu__item[data-action=\"edit\"]") : null;
      if (!editBtn) return;
      if (
        ctxOpenedElState &&
        (ctxOpenedElState.classList.contains("chat-msg--self-pin-stub") ||
          ctxOpenedElState.classList.contains("chat-msg--global-pin-stub"))
      ) {
        return;
      }
      var m = ctxMsgState;
      var sr = ctxSourceState;
      if (!m || !m.own) return;
      e.preventDefault();
      e.stopPropagation();
      var msgId = pokerChatMessageHasPersistedId(m.id) ? m.id : null;
      var oldText = (m.msgText != null && m.msgText !== "") ? m.msgText : (m.text || "");
      var fromName = m.fromName || m.fromDtId || "Игрок";
      try { clearChatEditUI(); } catch (err) {}
      startChatEdit(sr, msgId, oldText, fromName);
      hideMenu();
    }
    ctxMenu.addEventListener("touchend", onMenuEditCapture, { capture: true, passive: false });
    ctxMenu.addEventListener("click", onMenuEditCapture, { capture: true });

    function closeIfOutside(e) {
      if (!ctxMenu.classList.contains("chat-ctx-menu--visible")) return;
      if (ctxMenu.contains(e.target)) return;
      if (ctxBackdrop && ctxBackdrop.contains(e.target)) return;
      if (ctxOpenedElState && (e.target === ctxOpenedElState || ctxOpenedElState.contains(e.target))) return;
      hideMenu();
    }
    document.addEventListener("click", closeIfOutside);

    function runAction(action, activeEl) {
      var msg = ctxMsgState;
      var src = ctxSourceState;
      var el = ctxOpenedElState;
      if (!msg) {
        hideMenu();
        return;
      }
      if (action === "react" && activeEl && activeEl.dataset.emoji) {
        sendReaction(msg.id, activeEl.dataset.emoji, src, src === "personal" ? getChatWithUserId() : "");
        hideMenu();
        return;
      }
      if (action === "reply") {
        setGeneralReplyTo(null); setPersonalReplyTo(null);
        var quotePreviewText = (msg.text && msg.text.slice(0, 60)) || (msg.hasImage ? "[Фото]" : msg.hasVoice ? "[Голосовое сообщение]" : msg.hasDocument ? "[Документ]" : "");
        if (msg.text && msg.text.length > 60) quotePreviewText += "…";
        if (src === "general") {
          setGeneralReplyTo(msg);
          var prev = document.getElementById("chatGeneralReplyPreview");
          if (prev) {
            prev.querySelector(".chat-reply-preview__text").textContent = "Ответ на " + (msg.fromName || "Игрок") + ": " + quotePreviewText;
            prev.classList.add("chat-reply-preview--visible");
          }
          focusChatComposerForReply("general", getGeneralMessagesEl());
        } else {
          setPersonalReplyTo(msg);
          var prevP = document.getElementById("chatPersonalReplyPreview");
          if (prevP) {
            prevP.querySelector(".chat-reply-preview__text").textContent = "Ответ на " + (msg.fromName || "Игрок") + ": " + quotePreviewText;
            prevP.classList.add("chat-reply-preview--visible");
          }
          focusChatComposerForReply("personal", getMessagesEl());
        }
        hideMenu();
      } else if (action === "copy") {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        if (msg.text && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(msg.text).then(function () {
            if (tg && tg.showAlert) tg.showAlert("Скопировано");
          });
        }
        hideMenu();
      } else if (action === "edit" && msg.own && el) {
        var msgId = pokerChatMessageHasPersistedId(msg.id) ? msg.id : null;
        var oldTextRaw = (msg.msgText != null && msg.msgText !== "") ? msg.msgText : (msg.text || "");
        var fromName = msg.fromName || msg.fromDtId || "Игрок";
        try { clearChatEditUI(); } catch (eClear) {}
        startChatEdit(src, msgId, oldTextRaw, fromName);
        hideMenu();
      } else if (action === "delete" && (msg.own || getChatIsAdmin())) {
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) {
          hideMenu();
          return;
        }
        var delBody = pokerApiAuthJsonBody({ messageId: msg.id });
        if (src === "personal" && getChatWithUserId()) delBody.with = getChatWithUserId();
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(delBody),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) {
            var patchedCache = patchCachedDeletedMessage(msg.id, src);
            var patchedDom = applyDeletedMessageToDom(msg.id, src);
            if (src === "general") {
              if (!patchedCache || !patchedDom) loadGeneral();
            } else if (!patchedCache || !patchedDom) {
              loadMessages();
            }
          }
        }).finally(function () { hideMenu(); });
      } else if (action === "pin-global" && pokerChatMessageHasPersistedId(msg.id) && src === "general" && getChatIsAdmin()) {
        fetch(base + "/api/chat", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ action: "generalPin", messageId: msg.id })),
        })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            if (d && d.ok) {
              try {
                if (d.generalPinned && typeof d.generalPinned === "object" && pokerChatMessageHasPersistedId(d.generalPinned.id)) {
                  if (!window._chatGeneralCache || typeof window._chatGeneralCache !== "object") {
                    window._chatGeneralCache = { messages: [], generalMembers: [] };
                  }
                  window._chatGeneralCache.generalPinned = d.generalPinned;
                  refreshChatSelfPinBars();
                }
              } catch (ePinOpt) {}
              loadGeneral();
            }
          })
          .finally(function () {
            hideMenu();
          });
      } else if (action === "unpin-global" && src === "general" && getChatIsAdmin()) {
        fetch(base + "/api/chat", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ action: "generalUnpin" })),
        })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            if (d && d.ok) {
              try {
                if (window._chatGeneralCache && typeof window._chatGeneralCache === "object") {
                  window._chatGeneralCache.generalPinned = null;
                }
                refreshChatSelfPinBars();
              } catch (eUnOpt) {}
              loadGeneral();
            }
          })
          .finally(function () {
            hideMenu();
          });
      } else if (action === "pin" && pokerChatMessageHasPersistedId(msg.id) && el) {
        var peerPin = src === "personal" ? getChatWithUserId() : null;
        if (src === "personal" && !peerPin) {
          hideMenu();
          return;
        }
        var rec = pokerBuildSelfPinRecord(msg, el);
        if (rec) {
          pokerSetSelfPin(src, peerPin, rec);
          refreshChatSelfPinBars();
        }
        hideMenu();
      } else if (action === "unpin") {
        var peerUn = src === "personal" ? getChatWithUserId() : null;
        if (src === "personal" && !peerUn) {
          hideMenu();
          return;
        }
        pokerClearSelfPin(src, peerUn);
        refreshChatSelfPinBars();
        hideMenu();
      } else {
        hideMenu();
      }
    }

    // Простой обработчик: кликаем или тапаем по пункту меню.
    function bindMenuButton(btn) {
      function handler(e) {
        e.preventDefault();
        e.stopPropagation();
        if (btn.dataset.action) runAction(btn.dataset.action, btn);
      }
      btn.addEventListener("click", handler);
      btn.addEventListener("touchend", handler, { passive: false });
    }
    ctxMenu.querySelectorAll(".chat-ctx-menu__item").forEach(bindMenuButton);
    ctxMenu.querySelectorAll(".chat-ctx-menu__reaction-emoji").forEach(bindMenuButton);
  }
}

  return {
    pokerChatFinePointerLikeDesktop: pokerChatFinePointerLikeDesktop,
    attachContextMenuForOthers: attachContextMenuForOthers,
  };
}
