// Chat dialogs: opening rows, long-press previews, admin club access, and search suggestions.

function initChatDialogActions(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var initData = opts.initData || "";
  var dialogsView = opts.dialogsView || null;
  var findByIdInputDialogs = opts.findByIdInputDialogs || null;
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch] || ch;
    });
  };
  var openConvFromDialogs = typeof opts.openConvFromDialogs === "function" ? opts.openConvFromDialogs : function () {};
  var tryOpenClubChatFromDialogs = typeof opts.tryOpenClubChatFromDialogs === "function" ? opts.tryOpenClubChatFromDialogs : function () {};
  var openChatDialogPreviewModal = typeof opts.openChatDialogPreviewModal === "function" ? opts.openChatDialogPreviewModal : function () {};
  var openChatClubAccessModal = typeof opts.openChatClubAccessModal === "function" ? opts.openChatClubAccessModal : function () {};
  var prefetchPersonalMessages = typeof opts.prefetchPersonalMessages === "function" ? opts.prefetchPersonalMessages : function () {};
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function () { return ""; };
  var showDialogs = typeof opts.showDialogs === "function" ? opts.showDialogs : function () {};
  var getChatIsAdmin = typeof opts.getChatIsAdmin === "function" ? opts.getChatIsAdmin : function () { return false; };
  var chatClubAdminLongPressTimer = null;

  function runDialogActionForBtn(btn) {
    var raw = (btn.dataset.chatUserId || "").trim();
    var userName = btn.dataset.chatUserName || "Менеджер";
    if (!raw) return;
    function doShow(tgUserId) { openConvFromDialogs(tgUserId, userName); }
    if (raw.startsWith("tg_") && raw !== "tg_roman") {
      doShow(raw);
    } else if (raw === "tg_roman") {
      var romanUsername = "roman1787443";
      fetch(base + "/api/users?username=" + encodeURIComponent(romanUsername) + pokerApiAuthQuery("&"))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.ok && data.userId) doShow(data.userId);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
      return;
    } else if (/^ID\d{6}$/.test(raw.toUpperCase())) {
      var id = raw.toUpperCase();
      fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.ok && data.userId) doShow(data.userId);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
    } else {
      doShow("tg_" + raw);
    }
  }

  function initDialogRows() {
    if (!dialogsView) return;
    function openDialogsViewItem(el) {
      if (!el || !dialogsView.contains(el)) return;
      if (el.blur) el.blur();
      if (el.classList && el.classList.contains("chat-dialog-item--find-user")) {
        if (findByIdInputDialogs) findByIdInputDialogs.focus();
        return;
      }
      if (el.classList && el.classList.contains("chat-dialog-item--club")) {
        if (el._clubLongPressHandled) {
          el._clubLongPressHandled = false;
          return;
        }
        tryOpenClubChatFromDialogs();
        return;
      }
      if (el.classList && el.classList.contains("chat-contact") && el.dataset.chatId) {
        var rowAv = "";
        var imgRow = el.querySelector("img.chat-contact__avatar");
        if (imgRow) {
          try {
            rowAv = imgRow.getAttribute("src") || imgRow.src || "";
          } catch (eRowAv) {
            rowAv = "";
          }
        }
        openConvFromDialogs(el.dataset.chatId, el.dataset.chatName, "", rowAv || undefined, el.dataset.chatVerified === "1", el.dataset.chatStatusLevel || "");
        return;
      }
      if (el.getAttribute && el.getAttribute("data-chat-user-id")) {
        runDialogActionForBtn(el);
      }
    }
    var dialogsSelector = ".chat-dialog-item--club, .chat-dialog-item--find-user, .chat-dialog-item[data-chat-user-id], .chat-contact";
    function dialogRowEligibleForPlayerPreview(btn) {
      if (!btn || !btn.classList) return false;
      if (btn.classList.contains("chat-dialog-item--find-user")) return false;
      if (btn.classList.contains("chat-dialog-item--club")) return false;
      if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
        if (btn.getAttribute("data-chat-group") === "1") return false;
        return true;
      }
      if (btn.getAttribute && btn.getAttribute("data-chat-user-id")) return true;
      return false;
    }
    function getDialogPreviewPeerFromBtn(btn) {
      if (!btn) return null;
      if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
        if (btn.getAttribute("data-chat-group") === "1") return null;
        return {
          userId: btn.dataset.chatId,
          userName: btn.dataset.chatName || "",
          p21Id: "",
        };
      }
      var uid = btn.getAttribute("data-chat-user-id");
      if (uid) {
        var uname = btn.getAttribute("data-chat-user-name") || "";
        if (!uname) {
          var lab = btn.querySelector(".chat-dialog-item__label");
          if (lab) uname = (lab.textContent || "").trim();
        }
        return { userId: uid, userName: uname, p21Id: "" };
      }
      return null;
    }
    var CHAT_DIALOG_TAP_MOVE_THRESHOLD = 18;
    function attachChatDialogButton(btn) {
      if (btn._chatDialogAttached) return;
      btn._chatDialogAttached = true;
      function detachMoveListeners() {
        document.removeEventListener("pointermove", onDocMove, true);
        document.removeEventListener("pointerup", onDocUp, true);
        document.removeEventListener("pointercancel", onDocUp, true);
      }
      function onDocMove(e) {
        if (!btn._chatTapTracking || e.pointerId !== btn._chatTapPtrId) return;
        if (
          Math.abs(e.clientX - btn._chatTapStartX) > CHAT_DIALOG_TAP_MOVE_THRESHOLD ||
          Math.abs(e.clientY - btn._chatTapStartY) > CHAT_DIALOG_TAP_MOVE_THRESHOLD
        ) {
          btn._chatTapWasScroll = true;
          if (btn._dialogPreviewLpTimer) {
            clearTimeout(btn._dialogPreviewLpTimer);
            btn._dialogPreviewLpTimer = null;
          }
        }
      }
      function onDocUp(e) {
        if (e.pointerId !== btn._chatTapPtrId) return;
        btn._chatTapTracking = false;
        if (btn._dialogPreviewLpTimer) {
          clearTimeout(btn._dialogPreviewLpTimer);
          btn._dialogPreviewLpTimer = null;
        }
        detachMoveListeners();
      }
      btn.addEventListener(
        "pointerdown",
        function (e) {
          if (e.button != null && e.button !== 0) return;
          btn._chatTapWasScroll = false;
          btn._chatTapTracking = true;
          btn._chatTapPtrId = e.pointerId;
          btn._chatTapStartX = e.clientX;
          btn._chatTapStartY = e.clientY;
          try {
            var preId = null;
            if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
              preId = String(btn.dataset.chatId);
            } else {
              var duPre = btn.getAttribute("data-chat-user-id");
              if (duPre && !btn.classList.contains("chat-dialog-item--club")) preId = String(duPre);
            }
            if (preId) prefetchPersonalMessages(preId);
          } catch (eWarmTap) {}
          if (dialogRowEligibleForPlayerPreview(btn)) {
            if (btn._dialogPreviewLpTimer) {
              clearTimeout(btn._dialogPreviewLpTimer);
              btn._dialogPreviewLpTimer = null;
            }
            btn._dialogPreviewLpTimer = setTimeout(function () {
              btn._dialogPreviewLpTimer = null;
              if (!dialogRowEligibleForPlayerPreview(btn)) return;
              var peer = getDialogPreviewPeerFromBtn(btn);
              if (!peer || !peer.userId) return;
              btn._dialogPreviewLongPressHandled = true;
              btn._chatTapWasScroll = false;
              if (typeof tg !== "undefined" && tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
              openChatDialogPreviewModal(peer.userId, peer.userName, peer.p21Id);
            }, 550);
          }
          document.addEventListener("pointermove", onDocMove, true);
          document.addEventListener("pointerup", onDocUp, true);
          document.addEventListener("pointercancel", onDocUp, true);
        },
        { passive: true }
      );
      btn.addEventListener(
        "click",
        function (e) {
          if (btn._dialogPreviewLongPressHandled) {
            e.preventDefault();
            e.stopPropagation();
            btn._dialogPreviewLongPressHandled = false;
            return;
          }
          if (btn._chatTapWasScroll) {
            e.preventDefault();
            e.stopPropagation();
            btn._chatTapWasScroll = false;
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          try {
            openDialogsViewItem(btn);
          } catch (eOpenDialogItem) {
            try {
              console.error("chat dialog open failed", eOpenDialogItem);
            } catch (eLogOpenDialog) {}
            try {
              showDialogs();
            } catch (eRecoverDialog) {}
          }
        },
        { capture: true }
      );
    }
    function attachAllChatDialogButtons() {
      if (!dialogsView) return;
      dialogsView.querySelectorAll(dialogsSelector).forEach(attachChatDialogButton);
    }
    attachAllChatDialogButtons();
    window.chatAttachDialogButtons = attachAllChatDialogButtons;

    (function bindClubChatAdminLongPress() {
      var btn = document.getElementById("chatDialogClub");
      if (!btn || btn._clubAdminLpBound) return;
      btn._clubAdminLpBound = true;
      function clearT() {
        if (chatClubAdminLongPressTimer) {
          clearTimeout(chatClubAdminLongPressTimer);
          chatClubAdminLongPressTimer = null;
        }
      }
      function startPress() {
        clearT();
        chatClubAdminLongPressTimer = setTimeout(function () {
          chatClubAdminLongPressTimer = null;
          if (!getChatIsAdmin()) return;
          btn._clubLongPressHandled = true;
          if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
          openChatClubAccessModal();
        }, 650);
      }
      btn.addEventListener("touchstart", startPress, { passive: true });
      btn.addEventListener("touchend", clearT);
      btn.addEventListener("touchcancel", clearT);
      btn.addEventListener("mousedown", startPress);
      btn.addEventListener("mouseup", clearT);
      btn.addEventListener("mouseleave", clearT);
    })();
  }

  function initFindSuggestions() {
    if (!findByIdInputDialogs) return;
    var suggestEl = document.getElementById("chatFindSuggest");
    var suggestListEl = document.getElementById("chatFindSuggestList");
    var findSuggestDebounce = null;
    var lastSuggestions = [];

    function hideSuggest() {
      if (suggestEl) {
        suggestEl.classList.add("chat-find-suggest--hidden");
        suggestEl.setAttribute("aria-hidden", "true");
        if (findByIdInputDialogs) findByIdInputDialogs.setAttribute("aria-expanded", "false");
      }
      lastSuggestions = [];
    }
    function openFromSuggestItem(btn) {
      if (!btn || !btn.dataset.userId) return;
      openConvFromDialogs(btn.dataset.userId, btn.dataset.userName);
      findByIdInputDialogs.value = "";
      hideSuggest();
    }
    var CHAT_SUGGEST_TAP_MOVE_THRESHOLD = 18;
    function attachSuggestItemButton(btn) {
      if (!btn || btn._chatSuggestAttached) return;
      btn._chatSuggestAttached = true;
      function detachMoveListeners() {
        document.removeEventListener("pointermove", onDocMove, true);
        document.removeEventListener("pointerup", onDocUp, true);
        document.removeEventListener("pointercancel", onDocUp, true);
      }
      function onDocMove(e) {
        if (!btn._chatSuggestTapTracking || e.pointerId !== btn._chatSuggestPtrId) return;
        if (
          Math.abs(e.clientX - btn._chatSuggestStartX) > CHAT_SUGGEST_TAP_MOVE_THRESHOLD ||
          Math.abs(e.clientY - btn._chatSuggestStartY) > CHAT_SUGGEST_TAP_MOVE_THRESHOLD
        ) {
          btn._chatSuggestTapWasScroll = true;
        }
      }
      function onDocUp(e) {
        if (e.pointerId !== btn._chatSuggestPtrId) return;
        btn._chatSuggestTapTracking = false;
        detachMoveListeners();
      }
      btn.addEventListener(
        "pointerdown",
        function (e) {
          if (e.button != null && e.button !== 0) return;
          btn._chatSuggestTapWasScroll = false;
          btn._chatSuggestTapTracking = true;
          btn._chatSuggestPtrId = e.pointerId;
          btn._chatSuggestStartX = e.clientX;
          btn._chatSuggestStartY = e.clientY;
          document.addEventListener("pointermove", onDocMove, true);
          document.addEventListener("pointerup", onDocUp, true);
          document.addEventListener("pointercancel", onDocUp, true);
        },
        { passive: true }
      );
      btn.addEventListener(
        "click",
        function (e) {
          if (btn._chatSuggestTapWasScroll) {
            e.preventDefault();
            e.stopPropagation();
            btn._chatSuggestTapWasScroll = false;
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          openFromSuggestItem(btn);
        },
        { capture: true }
      );
    }
    function showSuggest(items) {
      lastSuggestions = items || [];
      if (!suggestListEl || !suggestEl) return;
      if (!items || items.length === 0) {
        hideSuggest();
        return;
      }
      suggestListEl.innerHTML = items.map(function (s) {
        return '<button type="button" class="chat-find-suggest__item" data-user-id="' + escapeHtml(s.userId) + '" data-user-name="' + escapeHtml(s.userName || s.userId) + '">' + escapeHtml(s.userName || s.userId) + '</button>';
      }).join("");
      suggestListEl.querySelectorAll(".chat-find-suggest__item").forEach(attachSuggestItemButton);
      suggestEl.classList.remove("chat-find-suggest--hidden");
      suggestEl.setAttribute("aria-hidden", "false");
      if (findByIdInputDialogs) findByIdInputDialogs.setAttribute("aria-expanded", "true");
    }
    function fetchSuggest() {
      var raw = (findByIdInputDialogs.value || "").trim().replace(/^@/, "");
      if (raw.length < 1) { hideSuggest(); return; }
      var byId = /^\d{6}$/.test(raw) || /^ID\d{6}$/i.test(raw);
      if (byId) { hideSuggest(); return; }
      var url = base + "/api/users?username=" + encodeURIComponent(raw) + "&suggest=1" + pokerApiAuthQuery("&");
      fetch(url).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.ok && Array.isArray(data.suggestions)) showSuggest(data.suggestions);
        else hideSuggest();
      }).catch(function () { hideSuggest(); });
    }

    findByIdInputDialogs.addEventListener("input", function () {
      clearTimeout(findSuggestDebounce);
      var raw = (findByIdInputDialogs.value || "").trim();
      if (raw.length < 1) { hideSuggest(); return; }
      findSuggestDebounce = setTimeout(fetchSuggest, 280);
    });
    findByIdInputDialogs.addEventListener("focus", function () {
      if (
        typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
        window.__pokerIsChatPhysicalKeyboardContext()
      ) {
        if (lastSuggestions.length) showSuggest(lastSuggestions);
        return;
      }
      if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
        window.__pokerActivateChatKeyboardViewport();
      } else {
        if (!isTelegramChatRuntime()) {
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
        }
      }
      try {
        findByIdInputDialogs.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch (eSi) {}
      if (lastSuggestions.length) showSuggest(lastSuggestions);
    });
    findByIdInputDialogs.addEventListener("blur", function (e) {
      try {
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
          window.__pokerFinalizeChatKeyboardDismiss();
        } else {
          if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
            window.__pokerClearChatKeyboardViewportState();
          }
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        }
      } catch (eDlgFin) {}
      var relatedTarget = e.relatedTarget;
      setTimeout(function () {
        if (document.activeElement && suggestEl && suggestEl.contains(document.activeElement)) return;
        if (relatedTarget && suggestEl && suggestEl.contains(relatedTarget)) return;
        hideSuggest();
      }, 380);
    });
    if (suggestEl) {
      suggestEl.addEventListener("mousedown", function (e) {
        if (e.target && e.target.closest && e.target.closest(".chat-find-suggest__item")) return;
        e.preventDefault();
      });
      suggestEl.addEventListener("pointerdown", function (e) {
        if (e.target && e.target.closest && e.target.closest(".chat-find-suggest__item")) return;
        if (e.pointerType === "mouse") e.preventDefault();
      }, { passive: false });
    }

    function findByIdAndOpenDialogs() {
      var raw = (findByIdInputDialogs.value || "").trim();
      var idPart = raw.replace(/^@/, "").toUpperCase();
      var byId = /^\d{6}$/.test(idPart) || /^ID\d{6}$/.test(idPart) || (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart));
      var url;
      if (byId) {
        var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
        url = base + "/api/users?id=" + encodeURIComponent(id) + "&initData=" + encodeURIComponent(initData);
      } else {
        var nick = raw.replace(/^@/, "").trim();
        if (!nick) {
          if (tg && tg.showAlert) tg.showAlert("Введите ID (ID123456) или ник в Telegram");
          return;
        }
        url = base + "/api/users?username=" + encodeURIComponent(nick) + "&initData=" + encodeURIComponent(initData);
      }
      hideSuggest();
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          findByIdInputDialogs.value = "";
          if (data && data.ok && data.userId) openConvFromDialogs(data.userId, data.userName || data.userId, data.p21Id);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () {
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    }
    findByIdInputDialogs.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (suggestEl && !suggestEl.classList.contains("chat-find-suggest--hidden") && lastSuggestions.length > 0) {
          openConvFromDialogs(lastSuggestions[0].userId, lastSuggestions[0].userName || lastSuggestions[0].userId);
          findByIdInputDialogs.value = "";
          hideSuggest();
        } else {
          findByIdAndOpenDialogs();
        }
      }
    });
  }

  initDialogRows();
  initFindSuggestions();

  return {
    runDialogActionForBtn: runDialogActionForBtn,
  };
}
