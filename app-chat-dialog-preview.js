// Chat dialog long-press preview modal and preview message rendering.

function initChatDialogPreviewRuntime(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch] || ch;
    });
  };
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function () { return ""; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a || "") === String(b || ""); };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var getPersonalMessagesSnapshotForOpen =
    typeof opts.getPersonalMessagesSnapshotForOpen === "function" ? opts.getPersonalMessagesSnapshotForOpen : function () { return null; };
  var getPersonalReceiptState =
    typeof opts.getPersonalReceiptState === "function" ? opts.getPersonalReceiptState : function () { return { delivered: false, read: false }; };
  var chatMessageBodyHtml = typeof opts.chatMessageBodyHtml === "function" ? opts.chatMessageBodyHtml : function () { return ""; };
  var pokerChatDisplayImageSrc =
    typeof opts.pokerChatDisplayImageSrc === "function" ? opts.pokerChatDisplayImageSrc : function (value) { return value || ""; };
  var chatMsgImageAttrs = typeof opts.chatMsgImageAttrs === "function" ? opts.chatMsgImageAttrs : function () { return ""; };
  var chatMsgVoiceOnlyNoCaption =
    typeof opts.chatMsgVoiceOnlyNoCaption === "function" ? opts.chatMsgVoiceOnlyNoCaption : function () { return false; };
  var chatVoiceMessageHtml = typeof opts.chatVoiceMessageHtml === "function" ? opts.chatVoiceMessageHtml : function () { return ""; };
  var chatDocumentBlockHtml = typeof opts.chatDocumentBlockHtml === "function" ? opts.chatDocumentBlockHtml : function () { return ""; };
  var CHAT_MSG_AVATAR_IMG_ATTRS = opts.CHAT_MSG_AVATAR_IMG_ATTRS || "";
  var pokerProfileStatusFishLevel =
    typeof opts.pokerProfileStatusFishLevel === "function" ? opts.pokerProfileStatusFishLevel : function () { return ""; };
  var chatProfileStatusLevelHtml =
    typeof opts.chatProfileStatusLevelHtml === "function" ? opts.chatProfileStatusLevelHtml : function () { return ""; };
  var pokerProfileStatusFishIconHtml =
    typeof opts.pokerProfileStatusFishIconHtml === "function" ? opts.pokerProfileStatusFishIconHtml : function () { return ""; };
  var chatPokerPlusVerifiedBadgeHtml =
    typeof opts.chatPokerPlusVerifiedBadgeHtml === "function" ? opts.chatPokerPlusVerifiedBadgeHtml : function () { return ""; };
  var sortChatReactionEmojiKeys =
    typeof opts.sortChatReactionEmojiKeys === "function" ? opts.sortChatReactionEmojiKeys : function (keys) { return keys || []; };
  var chatDayDividerHtmlBeforeMessage =
    typeof opts.chatDayDividerHtmlBeforeMessage === "function" ? opts.chatDayDividerHtmlBeforeMessage : function () { return ""; };
  var bindChatMsgNameProfileButtons =
    typeof opts.bindChatMsgNameProfileButtons === "function" ? opts.bindChatMsgNameProfileButtons : function () {};
  var applyChatMsgTallTextTimeBelowLayout =
    typeof opts.applyChatMsgTallTextTimeBelowLayout === "function" ? opts.applyChatMsgTallTextTimeBelowLayout : function () {};
  var syncChatDialogPreviewAddFriendBtn =
    typeof opts.syncChatDialogPreviewAddFriendBtn === "function" ? opts.syncChatDialogPreviewAddFriendBtn : function () {};
  var pokerChatAddFriendWithPrompt =
    typeof opts.pokerChatAddFriendWithPrompt === "function" ? opts.pokerChatAddFriendWithPrompt : function () {};
  var openConvFromDialogs = typeof opts.openConvFromDialogs === "function" ? opts.openConvFromDialogs : function () {};

  function renderDialogPreviewMessagesInto(targetEl, messages) {
    if (!targetEl) return;
    var CHAT_DIALOG_PREVIEW_MAX = 50;
    var slice =
      messages && messages.length > CHAT_DIALOG_PREVIEW_MAX ? messages.slice(-CHAT_DIALOG_PREVIEW_MAX) : messages;
    if (!slice || slice.length === 0) {
      targetEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      return;
    }
    function personalReceiptHtmlPrev(m, isOwn) {
      if (!isOwn) return "";
      var receipt = getPersonalReceiptState(m, isOwn);
      var textTicks = receipt.delivered ? "✓✓" : "✓";
      var cls =
        "chat-msg__ticks" +
        (receipt.delivered ? " chat-msg__ticks--delivered" : " chat-msg__ticks--sent") +
        (receipt.read ? " chat-msg__ticks--read" : "");
      return '<div class="' + cls + '" aria-hidden="true">' + textTicks + "</div>";
    }
    var myIdRenderP = resolveMyChatMemberId();
    var html = slice
      .map(function (m, i) {
        var prev = i > 0 ? slice[i - 1] : null;
        var next = i < slice.length - 1 ? slice[i + 1] : null;
        var sameUser = function (a, b) {
          if (!a || !b || a.from == null || a.from === "" || b.from == null || b.from === "") return false;
          return peerChatIdsEqual(a.from, b.from);
        };
        var isFirstInGroup = !prev || !sameUser(prev, m);
        var isLastInGroup = !next || !sameUser(next, m);
        var isOwn = !!(myIdRenderP && peerChatIdsEqual(m.from, myIdRenderP));
        var cls = (isOwn ? "chat-msg chat-msg--own" : "chat-msg chat-msg--other") + " chat-msg--dialog-preview";
        var time = m.time ? new Date(m.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
        var text = chatMessageBodyHtml(m);
        var imgBlock = m.image
          ? '<img class="chat-msg__image" src="' +
            escapeHtml(pokerChatDisplayImageSrc(m.image)) +
            '" alt="Картинка"' +
            chatMsgImageAttrs(i, slice.length) +
            " />"
          : "";
        var editedBadge = m.edited ? '<span class="chat-msg__edited">(отредактировано)</span>' : "";
        var ticksPrevDlg = personalReceiptHtmlPrev(m, isOwn);
        var voiceOnlyPrevDlg = chatMsgVoiceOnlyNoCaption(m);
        var voiceBlock = m.voice
          ? chatVoiceMessageHtml(
              m.voice,
              voiceOnlyPrevDlg
                ? { footerToolbarHtml: '<span class="chat-msg__time">' + time + "</span>" + editedBadge + ticksPrevDlg }
                : undefined
            )
          : "";
        var documentBlock = m.document ? chatDocumentBlockHtml(m.document, m.documentName || "document.pdf") : "";
        var replyBlock = m.replyTo
          ? '<div class="chat-msg__reply"><strong>' +
            escapeHtml(m.replyTo.fromName || "Игрок") +
            ":</strong> " +
            escapeHtml(String(m.replyTo.text || "").slice(0, 80)) +
            (String(m.replyTo.text || "").length > 80 ? "…" : "") +
            "</div>"
          : "";
        var adminBadge = m.fromAdmin ? '<span class="chat-msg__admin">(админ)</span>' : "";
        var avLetter = (m.fromName && m.fromName.charAt(0)) || (m.from && m.from.charAt(1)) || "И";
        var avatarEl = isLastInGroup
          ? m.fromAvatar
            ? '<img class="chat-msg__avatar" src="' + escapeHtml(m.fromAvatar) + '" alt=""' + CHAT_MSG_AVATAR_IMG_ATTRS + " />"
            : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + escapeHtml(avLetter) + "</span>"
          : '<span class="chat-msg__avatar-spacer"></span>';
        var nameElP = "";
        if (!isOwn) {
          var nameStrP = escapeHtml(m.fromName || "Игрок");
          var statusLevelP = m.fromStatusLevel != null && m.fromStatusLevel !== "" ? pokerProfileStatusFishLevel(m.fromStatusLevel) : "";
          var levelStrP = chatProfileStatusLevelHtml(statusLevelP);
          var fishIconStrP = pokerProfileStatusFishIconHtml(statusLevelP, "chat-msg__status-fish");
          var verifiedStrP = chatPokerPlusVerifiedBadgeHtml(m.fromPokerPlusVerified);
          var respectValP =
            m.fromRespect !== undefined && m.fromRespect !== null
              ? m.fromRespect === 0
                ? "\u2014"
                : String(m.fromRespect)
              : "\u2014";
          var respectClassP = "chat-msg__respect";
          if (m.fromRespect > 0) respectClassP += " chat-msg__respect--positive";
          else if (m.fromRespect < 0) respectClassP += " chat-msg__respect--negative";
          var metaLineTopP =
            '<div class="chat-msg__meta-line">' +
            '<span class="chat-msg__name">' +
            nameStrP +
            "</span>" +
            verifiedStrP +
            levelStrP +
            fishIconStrP +
            "</div>";
          var respectPartP =
            '<span class="chat-msg__respect-row chat-msg__respect-inline"><span class="' +
            respectClassP +
            '" title="Уважение в чате">Ув: ' +
            escapeHtml(respectValP) +
            "</span></span>";
          var metaLineRespectP = '<div class="chat-msg__meta-line chat-msg__meta-sub">' + respectPartP + "</div>";
          var pmAvatarAttrPrev = m.fromAvatar ? ' data-pm-avatar="' + escapeHtml(m.fromAvatar) + '"' : "";
          nameElP =
            '<div class="chat-msg__meta-stack"><button type="button" class="chat-msg__name-btn" data-pm-id="' +
            escapeHtml(m.from || "") +
            '" data-pm-name="' +
            escapeHtml(m.fromName || m.fromDtId || "Игрок") +
            '"' +
            pmAvatarAttrPrev +
            ">" +
            metaLineTopP +
            "</button>" +
            metaLineRespectP +
            "</div>";
        }
        var textBlock =
          text || imgBlock || voiceBlock || documentBlock
            ? '<div class="chat-msg__text">' + imgBlock + voiceBlock + documentBlock + text + "</div>"
            : "";
        var reactionsHtmlP = "";
        if (m.id && m.reactions && typeof m.reactions === "object") {
          var emKeysPrev = [];
          for (var emp in m.reactions) {
            if (
              Object.prototype.hasOwnProperty.call(m.reactions, emp) &&
              Array.isArray(m.reactions[emp]) &&
              m.reactions[emp].length > 0
            ) {
              emKeysPrev.push(emp);
            }
          }
          var pillsP = [];
          sortChatReactionEmojiKeys(emKeysPrev).forEach(function (emp) {
            var countP = m.reactions[emp].length;
            pillsP.push(
              '<span class="chat-dialog-preview__reaction-pill">' +
                escapeHtml(emp) +
                ' <span class="chat-msg__reaction-count">' +
                countP +
                "</span></span>"
            );
          });
          reactionsHtmlP = pillsP.join("");
        }
        var reactionsRowP = reactionsHtmlP
          ? '<div class="chat-msg__reactions-wrap"><span class="chat-msg__reactions">' + reactionsHtmlP + "</span></div>"
          : "";
        var metaBlockP = isFirstInGroup ? nameElP + adminBadge : "";
        var bodyClassP =
          "chat-msg__body" +
          (text && text.trim() ? " chat-msg__body--has-text" : "") +
          (isOwn && m.image ? " chat-msg__body--own-image" : "");
        var footerHtmlP = voiceOnlyPrevDlg
          ? ""
          : '<div class="chat-msg__footer">' +
            '<span class="chat-msg__time">' +
            time +
            "</span>" +
            editedBadge +
            ticksPrevDlg +
            "</div>";
        var bodyMainClsP =
          "chat-msg__body-main" +
          (!textBlock ? " chat-msg__body-main--solo-footer" : "") +
          (m.image ? " chat-msg__body-main--with-image" : "") +
          (voiceOnlyPrevDlg ? " chat-msg__body-main--voice-inline-time" : "");
        var bodyMainHtmlP = '<div class="' + bodyMainClsP + '">' + textBlock + footerHtmlP + "</div>";
        var dayDividerP = chatDayDividerHtmlBeforeMessage(prev, m);
        return (
          dayDividerP +
          '<div class="' +
          cls +
          '"><div class="chat-msg__row">' +
          avatarEl +
          '<div class="' +
          bodyClassP +
          '"><div class="chat-msg__meta">' +
          metaBlockP +
          "</div>" +
          replyBlock +
          bodyMainHtmlP +
          reactionsRowP +
          "</div></div></div>"
        );
      })
      .join("");
    targetEl.innerHTML = html;
    bindChatMsgNameProfileButtons(targetEl);
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eLayoutPrev) {}
    requestAnimationFrame(function () {
      targetEl.scrollTop = targetEl.scrollHeight;
    });
  }

  function closeChatDialogPreviewModal() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal) return;
    modal.classList.remove("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "true");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eClsPrev) {}
  }

  function openChatDialogPreviewModal(userId, userName, peerP21Id) {
    var modal = document.getElementById("chatDialogPreviewModal");
    var titleEl = document.getElementById("chatDialogPreviewTitle");
    var subEl = document.getElementById("chatDialogPreviewSub");
    var prevMsgEl = document.getElementById("chatDialogPreviewMessages");
    var avatarEl = document.getElementById("chatDialogPreviewAvatar");
    var avatarPh = document.getElementById("chatDialogPreviewAvatarPlaceholder");
    if (!modal || !prevMsgEl || !userId || !base) return;
    if (!pokerApiHasCredential()) return;
    modal.dataset.previewUserId = userId;
    modal.dataset.previewUserName = userName || "";
    modal.dataset.previewP21Id = peerP21Id || "";
    if (titleEl) titleEl.textContent = userName || userId;
    if (subEl) subEl.textContent = "";
    if (avatarEl) {
      avatarEl.style.display = "none";
      avatarEl.removeAttribute("src");
      avatarEl.onerror = null;
    }
    if (avatarPh) {
      var ini = (userName || userId || "?").trim().charAt(0) || "?";
      avatarPh.textContent = ini.toUpperCase();
      avatarPh.style.display = "flex";
    }
    var previewSnapshot = getPersonalMessagesSnapshotForOpen(userId);
    if (previewSnapshot && Array.isArray(previewSnapshot.messages) && previewSnapshot.messages.length) {
      renderDialogPreviewMessagesInto(prevMsgEl, previewSnapshot.messages);
    } else {
      prevMsgEl.innerHTML = '<p class="chat-empty">Загрузка…</p>';
    }
    modal.classList.add("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "false");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eSyncPrev0) {}
    var url = base + "/api/chat" + pokerApiAuthQuery("?") + "&with=" + encodeURIComponent(userId) + "&usersById=1&trackSeen=0&fastOpen=1";
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; });
      })
      .then(function (data) {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        if (!data || !data.ok) {
          prevMsgEl.innerHTML =
            '<p class="chat-empty">' + escapeHtml((data && data.error) || "Не удалось загрузить сообщения") + "</p>";
          return;
        }
        var p21v = data.otherP21Id != null && String(data.otherP21Id).trim() !== "" ? String(data.otherP21Id).trim() : "";
        if (p21v) modal.dataset.previewP21Id = p21v;
        if (subEl) subEl.textContent = "";
        var av = data.otherAvatar != null && String(data.otherAvatar).trim() ? String(data.otherAvatar).trim() : "";
        if (av && avatarEl && avatarPh) {
          avatarEl.onerror = function () {
            avatarEl.style.display = "none";
            avatarPh.style.display = "flex";
          };
          avatarEl.src = av;
          avatarEl.style.display = "";
          avatarPh.style.display = "none";
        }
        var previewMessages = data.messages || [];
        if (typeof pokerHydrateChatMessagesFromUsersById === "function") {
          previewMessages = pokerHydrateChatMessagesFromUsersById(previewMessages, data.usersById);
        }
        renderDialogPreviewMessagesInto(prevMsgEl, previewMessages);
        try {
          syncChatDialogPreviewAddFriendBtn();
        } catch (eSyncPrev1) {}
      })
      .catch(function () {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        prevMsgEl.innerHTML = '<p class="chat-empty">Ошибка сети</p>';
      });
  }

  (function bindChatDialogPreviewModalOnce() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal || modal._chatDialogPreviewModalBound) return;
    modal._chatDialogPreviewModalBound = true;
    var backdrop = document.getElementById("chatDialogPreviewBackdrop");
    var closeBtn = document.getElementById("chatDialogPreviewClose");
    var openBtn = document.getElementById("chatDialogPreviewOpenBtn");
    function onBackdrop(e) {
      if (e.target === backdrop) closeChatDialogPreviewModal();
    }
    if (backdrop) backdrop.addEventListener("click", onBackdrop);
    if (closeBtn) closeBtn.addEventListener("click", closeChatDialogPreviewModal);
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName;
        var p21 = modal.dataset.previewP21Id;
        if (!uid) return;
        closeChatDialogPreviewModal();
        openConvFromDialogs(uid, uname, p21);
      });
    }
    var addFrPrev = document.getElementById("chatDialogPreviewAddFriendBtn");
    if (addFrPrev) {
      addFrPrev.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName || "";
        if (!uid || addFrPrev.disabled) return;
        addFrPrev.disabled = true;
        pokerChatAddFriendWithPrompt(uid, uname, function () {
          try {
            addFrPrev.disabled = false;
          } catch (eEn) {}
        });
      });
    }
  })();

  return {
    closeChatDialogPreviewModal: closeChatDialogPreviewModal,
    openChatDialogPreviewModal: openChatDialogPreviewModal,
    renderDialogPreviewMessagesInto: renderDialogPreviewMessagesInto,
  };
}
