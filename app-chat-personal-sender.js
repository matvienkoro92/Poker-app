// Personal/group chat sender: edit, optimistic append, uploads and reply flow.

function initChatPersonalSender(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var chatOutgoingState = opts.chatOutgoingState || {};
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getChatMsgAvatarImgAttrs = typeof opts.getChatMsgAvatarImgAttrs === "function" ? opts.getChatMsgAvatarImgAttrs : function () { return ""; };
  var getSendingPrivate = typeof opts.getSendingPrivate === "function" ? opts.getSendingPrivate : function () { return false; };
  var setSendingPrivate = typeof opts.setSendingPrivate === "function" ? opts.setSendingPrivate : function () {};
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getPersonalImage = typeof opts.getPersonalImage === "function" ? opts.getPersonalImage : function () { return null; };
  var setPersonalImage = typeof opts.setPersonalImage === "function" ? opts.setPersonalImage : function () {};
  var getPersonalVoice = typeof opts.getPersonalVoice === "function" ? opts.getPersonalVoice : function () { return null; };
  var setPersonalVoice = typeof opts.setPersonalVoice === "function" ? opts.setPersonalVoice : function () {};
  var getPersonalDocument = typeof opts.getPersonalDocument === "function" ? opts.getPersonalDocument : function () { return null; };
  var setPersonalDocument = typeof opts.setPersonalDocument === "function" ? opts.setPersonalDocument : function () {};
  var getPersonalReplyTo = typeof opts.getPersonalReplyTo === "function" ? opts.getPersonalReplyTo : function () { return null; };
  var setPersonalReplyTo = typeof opts.setPersonalReplyTo === "function" ? opts.setPersonalReplyTo : function () {};
  var getChatEditMode = typeof opts.getChatEditMode === "function" ? opts.getChatEditMode : function () { return false; };
  var getChatEditSource = typeof opts.getChatEditSource === "function" ? opts.getChatEditSource : function () { return ""; };
  var getChatEditMessageId = typeof opts.getChatEditMessageId === "function" ? opts.getChatEditMessageId : function () { return ""; };
  var getChatComposerMounted = typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted : function () { return ""; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var clearPersonalComposerDraft = typeof opts.clearPersonalComposerDraft === "function" ? opts.clearPersonalComposerDraft : function () {};
  var getChatTypingStopTimer = typeof opts.getChatTypingStopTimer === "function" ? opts.getChatTypingStopTimer : function () { return 0; };
  var setChatTypingStopTimer = typeof opts.setChatTypingStopTimer === "function" ? opts.setChatTypingStopTimer : function () {};
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var getChatPersonalText = typeof opts.getChatPersonalText === "function" ? opts.getChatPersonalText : function () { return ""; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerReadPwaGuestMode = typeof opts.pokerReadPwaGuestMode === "function" ? opts.pokerReadPwaGuestMode : function () { return false; };
  var setPersonalSendBusy = typeof opts.setPersonalSendBusy === "function" ? opts.setPersonalSendBusy : function () {};
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (body) { return body || {}; };
  var patchCachedEditedMessage = typeof opts.patchCachedEditedMessage === "function" ? opts.patchCachedEditedMessage : function () {};
  var applyEditedMessageToDom = typeof opts.applyEditedMessageToDom === "function" ? opts.applyEditedMessageToDom : function () {};
  var clearChatEditUI = typeof opts.clearChatEditUI === "function" ? opts.clearChatEditUI : function () {};
  var chatMsgElById = typeof opts.chatMsgElById === "function" ? opts.chatMsgElById : function () { return null; };
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var pokerChatDisplayImageSrc = typeof opts.pokerChatDisplayImageSrc === "function" ? opts.pokerChatDisplayImageSrc : function (src) { return src || ""; };
  var chatVoiceMessageHtml = typeof opts.chatVoiceMessageHtml === "function" ? opts.chatVoiceMessageHtml : function () { return ""; };
  var chatDocumentBlockHtml = typeof opts.chatDocumentBlockHtml === "function" ? opts.chatDocumentBlockHtml : function () { return ""; };
  var linkTgUsernames = typeof opts.linkTgUsernames === "function" ? opts.linkTgUsernames : function (s) { return s; };
  var linkAppIds = typeof opts.linkAppIds === "function" ? opts.linkAppIds : function (s) { return s; };
  var linkUrls = typeof opts.linkUrls === "function" ? opts.linkUrls : function (s) { return s; };
  var appendChatVoiceToTextWrap = typeof opts.appendChatVoiceToTextWrap === "function" ? opts.appendChatVoiceToTextWrap : function () {};
  var applyChatMsgTallTextTimeBelowLayout = typeof opts.applyChatMsgTallTextTimeBelowLayout === "function" ? opts.applyChatMsgTallTextTimeBelowLayout : function () {};
  var resolveMyChatDisplayName = typeof opts.resolveMyChatDisplayName === "function" ? opts.resolveMyChatDisplayName : function () { return ""; };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var pokerChatSendTypingState = typeof opts.pokerChatSendTypingState === "function" ? opts.pokerChatSendTypingState : function () {};
  var pinChatMessagesToBottom = typeof opts.pinChatMessagesToBottom === "function" ? opts.pinChatMessagesToBottom : null;
  var pokerChatRunAfterPaint = typeof opts.pokerChatRunAfterPaint === "function" ? opts.pokerChatRunAfterPaint : function (fn) { if (typeof fn === "function") fn(); };
  var resizeChatTextarea = typeof opts.resizeChatTextarea === "function" ? opts.resizeChatTextarea : function () {};
  var updatePersonalSendBtnIcon = typeof opts.updatePersonalSendBtnIcon === "function" ? opts.updatePersonalSendBtnIcon : function () {};
  var shouldAutoFocusChatComposerOnDesktop = typeof opts.shouldAutoFocusChatComposerOnDesktop === "function" ? opts.shouldAutoFocusChatComposerOnDesktop : function () { return false; };
  var focusChatComposerForDesktop = typeof opts.focusChatComposerForDesktop === "function" ? opts.focusChatComposerForDesktop : function () {};
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var pokerChatRequestPollBurst = typeof opts.pokerChatRequestPollBurst === "function" ? opts.pokerChatRequestPollBurst : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var setLastPersonalMessagesSig = typeof opts.setLastPersonalMessagesSig === "function" ? opts.setLastPersonalMessagesSig : function () {};
  var chatCloneRetryPayload = typeof opts.chatCloneRetryPayload === "function" ? opts.chatCloneRetryPayload : function () { return null; };
  var markLatestOptimisticMessageFailed = typeof opts.markLatestOptimisticMessageFailed === "function" ? opts.markLatestOptimisticMessageFailed : function () {};

function appendOptimisticPersonalMessage(text, image, voice, docAttachment, replyTo) {
  if (!getMessagesEl()) return false;
  try {
    var emptyEl = getMessagesEl().querySelector(".chat-empty");
    if (emptyEl) getMessagesEl().innerHTML = "";
    var authAvatarEl = document.getElementById("authUserAvatar");
    var myAvatarUrl = (authAvatarEl && authAvatarEl.src && authAvatarEl.src.indexOf("data:") !== 0 && authAvatarEl.src.indexOf("http") === 0) ? authAvatarEl.src : "";
    var myNmOptP = resolveMyChatDisplayName();
    var initial = "Я";
    try {
      if (myNmOptP && typeof myNmOptP === "string" && myNmOptP.length) {
        for (var cip = 0; cip < myNmOptP.length; cip++) {
          var chp = myNmOptP.charAt(cip);
          if (chp.trim()) {
            initial = chp;
            break;
          }
        }
      }
    } catch (eIni) {}
    var optAvatarEl = myAvatarUrl
      ? '<img class="chat-msg__avatar" src="' + escapeHtml(myAvatarUrl) + '" alt=""' + getChatMsgAvatarImgAttrs() + " />"
      : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + escapeHtml(initial) + "</span>";
    var timeP = "";
    try {
      timeP = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    } catch (eTimeP) {}
    var replyBlock = replyTo ? '<div class="chat-msg__reply"><strong>' + escapeHtml(String(replyTo.fromName || "Игрок").slice(0, 100)) + ":</strong> " + escapeHtml(String(replyTo.text || "").slice(0, 80)) + (String(replyTo.text || "").length > 80 ? "…" : "") + "</div>" : "";
    var ticks = '<span class="chat-msg__ticks chat-msg__ticks--sent" aria-hidden="true">✓</span>';
    var textContent = "";
    if (image) {
      textContent =
        '<img class="chat-msg__image" src="' +
        escapeHtml(pokerChatDisplayImageSrc(String(image))) +
        '" alt="Картинка" loading="eager" decoding="async" fetchpriority="high" />';
    }
    else if (voice) {
      textContent = chatVoiceMessageHtml(String(voice), {
        footerToolbarHtml: '<span class="chat-msg__time">' + escapeHtml(timeP) + "</span>" + ticks,
      });
    } else if (docAttachment && docAttachment.dataUrl && docAttachment.fileName) textContent = chatDocumentBlockHtml(docAttachment.dataUrl, docAttachment.fileName);
    else if (text) {
      try {
        textContent = linkTgUsernames(linkAppIds(linkUrls(escapeHtml(String(text)).replace(/\n/g, "<br>"))));
      } catch (eLinkP) {
        textContent = escapeHtml(String(text)).replace(/\n/g, "<br>");
      }
    }
    var optBodyClassP =
      "chat-msg__body" +
      (text && !image && !voice && !docAttachment ? " chat-msg__body--has-text" : "") +
      (image ? " chat-msg__body--own-image" : "");
    var optBodyMainP =
      '<div class="chat-msg__body-main' +
      (image ? " chat-msg__body-main--with-image" : "") +
      (voice ? " chat-msg__body-main--voice-inline-time" : "") +
      '"><div class="chat-msg__text">' +
      textContent +
      "</div>" +
      (voice
        ? ""
        : '<div class="chat-msg__footer"><span class="chat-msg__time">' + escapeHtml(timeP) + "</span>" + ticks + "</div>") +
      "</div>";
    var html = '<div class="chat-msg chat-msg--own" data-optimistic="true"><div class="chat-msg__row">' + optAvatarEl + '<div class="' + optBodyClassP + '"><div class="chat-msg__meta"></div>' + replyBlock + optBodyMainP + '</div></div></div>';
    var wrap = document.createElement("div");
    var first = null;
    try {
      wrap.innerHTML = html;
      first = wrap.firstElementChild;
    } catch (eInnP) {}
    if (!first) {
      first = document.createElement("div");
      first.className = "chat-msg chat-msg--own";
      first.setAttribute("data-optimistic", "true");
      var rowP = document.createElement("div");
      rowP.className = "chat-msg__row";
      var bodyP = document.createElement("div");
      bodyP.className =
        "chat-msg__body" +
        (text && !image && !voice && !docAttachment ? " chat-msg__body--has-text" : "") +
        (image ? " chat-msg__body--own-image" : "");
      var twP = document.createElement("div");
      twP.className = "chat-msg__text";
      if (image && typeof image === "string") {
        var imP = document.createElement("img");
        imP.className = "chat-msg__image";
        imP.alt = "Картинка";
        imP.src = pokerChatDisplayImageSrc(image) || image;
        twP.appendChild(imP);
        var bmImg = document.createElement("div");
        bmImg.className = "chat-msg__body-main chat-msg__body-main--with-image";
        bmImg.appendChild(twP);
        bodyP.appendChild(bmImg);
      } else if (voice && typeof voice === "string") {
        appendChatVoiceToTextWrap(twP, voice, {
          footerToolbarHtml: '<span class="chat-msg__time">' + escapeHtml(timeP) + "</span>" + ticks,
        });
        var bmVoice = document.createElement("div");
        bmVoice.className = "chat-msg__body-main chat-msg__body-main--voice-inline-time";
        bmVoice.appendChild(twP);
        bodyP.appendChild(bmVoice);
      } else {
        twP.textContent = text != null ? String(text) : "";
        bodyP.appendChild(twP);
      }
      rowP.appendChild(bodyP);
      first.appendChild(rowP);
    }
    getMessagesEl().appendChild(first);
    requestAnimationFrame(function () {
      applyChatMsgTallTextTimeBelowLayout(getMessagesEl());
    });
    getMessagesEl().scrollTop = getMessagesEl().scrollHeight;
    return true;
  } catch (e) {
    return false;
  }
}
function sendMessage(overrideText) {
  if (pokerEnsureChatTelegramVerified && !pokerEnsureChatTelegramVerified()) return;
  var overridePayload = overrideText && typeof overrideText === "object" ? overrideText : null;
  var text = overridePayload ? String(overridePayload.text || "").trim() : getChatPersonalText().trim();
  // Сообщение из chat-шаблона: подставляем текст напрямую.
  if (!overridePayload && typeof overrideText === "string") text = overrideText.trim();
  // Редактирование сообщения: отправляем PATCH, а не новое сообщение.
  if (getChatEditMode() && getChatEditSource() === "personal" && getChatEditMessageId()) {
    if (!text || getSendingPrivate()) return;
    if (!getChatWithUserId() || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте чат и убедитесь, что всё загружено");
      return;
    }
    setSendingPrivate(true);
    setPersonalSendBusy(true);
    fetch(base + "/api/chat", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({
          action: "edit",
          messageId: String(getChatEditMessageId()),
          text: text,
          with: getChatWithUserId(),
        })
      ),
    })
      .then(function (r) {
        return r
          .json()
          .catch(function () {
            return { ok: false, error: "Не удалось разобрать ответ сервера" };
          })
          .then(function (data) {
            var d = data && typeof data === "object" ? data : { ok: false, error: "Ошибка ответа" };
            if (!r.ok && !d.error) d.error = "Ошибка " + (r.status || "");
            return { d: d, httpOk: r.ok };
          });
      })
      .then(function (pack) {
        setSendingPrivate(false);
        setPersonalSendBusy(false);
        var d = pack.d;
        if (d && d.ok) {
          var srvPm = d.message && typeof d.message === "object" ? d.message : null;
          if (srvPm && srvPm.id) window._pendingPersonalEditMessage = srvPm;
          patchCachedEditedMessage(getChatEditMessageId(), (srvPm && srvPm.text) || text, "personal", srvPm);
          applyEditedMessageToDom(getChatEditMessageId(), (srvPm && srvPm.text) || text, "personal");
          clearChatEditUI();
          if (!getMessagesEl() || !chatMsgElById(getMessagesEl(), getChatEditMessageId())) loadMessages();
        } else {
          var errP = (d && d.error) || "Ошибка";
          if (tg && tg.showAlert) tg.showAlert(errP);
          else if (typeof alert === "function") alert(errP);
        }
      })
      .catch(function () {
        setSendingPrivate(false);
        setPersonalSendBusy(false);
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
    return;
  }
  var personalImageOut = overridePayload ? (overridePayload.image || null) : getPersonalImage();
  var personalVoiceOut = overridePayload ? (overridePayload.voice || null) : getPersonalVoice();
  var personalDocumentOut = overridePayload ? (overridePayload.document || null) : getPersonalDocument();
  var personalReplyOut = overridePayload ? (overridePayload.replyTo || null) : getPersonalReplyTo();
  var personalWithOut = overridePayload && overridePayload.with ? String(overridePayload.with) : getChatWithUserId();
  if ((!text && !personalImageOut && !personalVoiceOut && !personalDocumentOut) || !personalWithOut || !pokerApiHasCredential() || getSendingPrivate()) {
    if (!personalWithOut && (text || personalImageOut || personalVoiceOut || personalDocumentOut)) {
      if (tg && tg.showAlert) tg.showAlert("Выберите собеседника"); else alert("Выберите собеседника");
    }
    if (!pokerApiHasCredential() && (text || personalImageOut || personalVoiceOut || personalDocumentOut)) {
      var isStandalone =
        !!(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
        !!(window.navigator && window.navigator.standalone);
      var isGuest = isStandalone && pokerReadPwaGuestMode();
      var guestMsg = "Войдите в свой аккаунт, чтобы написать сообщение";
      if (isGuest) {
        if (tg && tg.showAlert) tg.showAlert(guestMsg);
        else if (typeof alert === "function") alert(guestMsg);
      } else {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram");
        else if (typeof alert === "function") alert("Войдите через Telegram (кнопка на главной вверху), чтобы писать в чат.");
      }
    }
    return;
  }
  if (!getMessagesEl()) {
    if (tg && tg.showAlert) tg.showAlert("Ошибка: чат не загружен");
    return;
  }
  var body = pokerApiAuthJsonBody({ with: personalWithOut, text: text });
  if (personalImageOut) body.image = personalImageOut;
  if (personalVoiceOut) body.voice = personalVoiceOut;
  if (personalDocumentOut) { body.document = personalDocumentOut.dataUrl; body.documentName = personalDocumentOut.fileName; }
  if (personalReplyOut) {
    var replyTextP = (personalReplyOut.text && String(personalReplyOut.text).trim()) || (personalReplyOut.hasImage ? "[Фото]" : personalReplyOut.hasVoice ? "[Голосовое сообщение]" : personalReplyOut.hasDocument ? "[Документ]" : "\u2014");
    body.replyTo = { id: personalReplyOut.id, from: personalReplyOut.from, fromName: personalReplyOut.fromName || "Игрок", text: replyTextP };
  }
  var optText = text;
  var optImage = personalImageOut || null;
  var optVoice = personalVoiceOut || null;
  var optDocument = personalDocumentOut ? { dataUrl: personalDocumentOut.dataUrl, fileName: personalDocumentOut.fileName } : null;
  var optReply = personalReplyOut ? { fromName: personalReplyOut.fromName || "Игрок", text: personalReplyOut.text || "" } : null;
  chatOutgoingState.optimisticPersonalPayload = {
    text: optText || "",
    image: optImage || null,
    voice: optVoice || null,
    document: optDocument,
    replyTo: body.replyTo || null,
    from: resolveMyChatMemberId(),
    time: new Date().toISOString(),
    with: personalWithOut,
  };
  if (getChatTypingStopTimer()) {
    clearTimeout(getChatTypingStopTimer());
    setChatTypingStopTimer(0);
  }
  pokerChatSendTypingState(false);
  setSendingPrivate(true);
  /* Пока POST в полёте, ответ GET, начатый до отправки, не должен перерисовывать ленту без нового сообщения — иначе оптимистичное фото исчезает до loadMessages после ответа. */
  window.__pokerLoadPersonalSeq = (window.__pokerLoadPersonalSeq || 0) + 1;
  setPersonalSendBusy(true);
  try {
    appendOptimisticPersonalMessage(optText, optImage, optVoice, optDocument, optReply);
  } catch (err) {
    if (typeof console !== "undefined" && console.error) console.error("appendOptimisticPersonalMessage failed", err);
  }
  /* См. sendGeneral: флаг scrollPersonalToBottomOnNextRender даёт settling (opacity:0) — не при отправке. */
  try {
    if (typeof pinChatMessagesToBottom === "function") pinChatMessagesToBottom(getMessagesEl(), true);
    if (getMessagesEl()) try { void getMessagesEl().offsetHeight; } catch (eFlushP) {}
  } catch (ePin) {}
  pokerChatRunAfterPaint(function () {
    clearPersonalComposerDraft();
    if (getChatComposerMounted() === "personal" && getChatComposerEl()) {
      getChatComposerEl().value = "";
      try { resizeChatTextarea(getChatComposerEl()); } catch (e) {}
      try { updatePersonalSendBtnIcon(); } catch (e) {}
      if (shouldAutoFocusChatComposerOnDesktop()) {
        focusChatComposerForDesktop();
      } else {
        setTimeout(function () {
          try {
            var composerAfterSend = getChatComposerEl && getChatComposerEl();
            if (
              composerAfterSend &&
              document.body &&
              document.body.getAttribute("data-view") === "chat" &&
              getChatComposerMounted &&
              getChatComposerMounted() === "personal" &&
              !composerAfterSend.disabled &&
              !composerAfterSend.hidden
            ) {
              if (composerAfterSend.focus) composerAfterSend.focus({ preventScroll: true });
            }
          } catch (e) {}
        }, 50);
        setTimeout(function () {
          try {
            if (typeof window.__pokerIsChatKeyboardLayoutEffectivelyClosed === "function" &&
                !window.__pokerIsChatKeyboardLayoutEffectivelyClosed()) {
              return;
            }
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eKbSendP) {}
        }, 220);
      }
    }
    setPersonalReplyTo(null);
    setPersonalImage(null);
    setPersonalDocument(null);
    setPersonalVoice(null);
    var prevEl = document.getElementById("chatPersonalReplyPreview");
    if (prevEl) { prevEl.classList.remove("chat-reply-preview--visible"); prevEl.querySelector(".chat-reply-preview__text").textContent = ""; }
    var imgPrev = document.getElementById("chatPersonalImagePreview");
    if (imgPrev) { imgPrev.classList.remove("chat-image-preview--visible"); imgPrev.innerHTML = ""; }
    var voicePrevP = document.getElementById("chatPersonalVoicePreview");
    if (voicePrevP) voicePrevP.classList.add("chat-voice-preview--hidden");
    var hasUpload = !!(body.document || body.image || body.voice);
    var progressWrap = document.getElementById("chatPersonalUploadProgress");
    var progressFill = document.getElementById("chatPersonalUploadProgressFill");
    var progressLabel = document.getElementById("chatPersonalUploadProgressLabel");
    function hideProgress() {
      if (progressWrap) {
        progressWrap.classList.remove("chat-upload-progress--visible");
        progressWrap.setAttribute("aria-hidden", "true");
      }
      if (progressFill) progressFill.style.width = "0%";
    }
    function handleResponse(data) {
      setSendingPrivate(false);
      setPersonalSendBusy(false);
      hideProgress();
      if (data && data.ok) {
        if (data.trace && data.trace.serverNowMs) {
          pokerChatRecordTrace("personal-send-ack", {
            ackMs: Math.max(0, Date.now() - Number(data.trace.serverNowMs || 0)),
            peer: getChatWithUserId() || "",
            messageId: data.message && data.message.id ? String(data.message.id) : "",
          });
        }
        chatOutgoingState.optimisticPersonalPayload = null;
        if (personalWithOut) delete chatOutgoingState.failedPersonalPayloadByPeer[String(personalWithOut)];
        pokerChatRequestPollBurst("personal");
        pokerChatRefreshLongPollTargets();
        /* Не удаляем optimistic до renderMessages: иначе пузырь пропадает на время запроса loadMessages. */
        var msg = data.message;
        if (msg && pokerChatMessageHasPersistedId(msg.id) && getChatWithUserId()) {
          window._pendingPersonalMessage = msg;
          window._pendingPersonalWith = getChatWithUserId();
        }
        setLastPersonalMessagesSig(null);
        loadMessages();
      } else {
        chatOutgoingState.optimisticPersonalPayload = null;
        if (personalWithOut) {
          chatOutgoingState.failedPersonalPayloadByPeer[String(personalWithOut)] = chatCloneRetryPayload({
            text: optText || "",
            image: optImage || null,
            voice: optVoice || null,
            document: optDocument,
            replyTo: body.replyTo || null,
            with: personalWithOut,
          });
        }
        markLatestOptimisticMessageFailed(getMessagesEl(), "personal");
        clearPersonalComposerDraft();
        if (getChatComposerMounted() === "personal" && getChatComposerEl()) getChatComposerEl().value = "";
        if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
      }
    }
    function handleError() {
      chatOutgoingState.optimisticPersonalPayload = null;
      if (personalWithOut) {
        chatOutgoingState.failedPersonalPayloadByPeer[String(personalWithOut)] = chatCloneRetryPayload({
          text: optText || "",
          image: optImage || null,
          voice: optVoice || null,
          document: optDocument,
          replyTo: body.replyTo || null,
          with: personalWithOut,
        });
      }
      setSendingPrivate(false);
      setPersonalSendBusy(false);
      hideProgress();
      markLatestOptimisticMessageFailed(getMessagesEl(), "personal");
      clearPersonalComposerDraft();
      if (getChatComposerMounted() === "personal" && getChatComposerEl()) getChatComposerEl().value = "";
      if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
      if (tg && tg.showAlert) tg.showAlert("Не удалось отправить. Проверьте интернет или уменьшите файл (до 8 МБ).");
    }
    if (hasUpload && progressWrap && progressFill && typeof XMLHttpRequest !== "undefined") {
      if (progressLabel) progressLabel.textContent = "Отправка…";
      progressWrap.classList.add("chat-upload-progress--visible");
      progressWrap.setAttribute("aria-hidden", "false");
      progressFill.style.width = "0%";
      var bodyStr = JSON.stringify(body);
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable && progressFill) progressFill.style.width = Math.round((e.loaded / e.total) * 100) + "%";
        else if (progressFill) progressFill.style.width = "50%";
      });
      xhr.addEventListener("load", function () {
        var data = null;
        try {
          data = JSON.parse(xhr.responseText || "{}");
        } catch (err) {}
        if (xhr.status >= 200 && xhr.status < 300) {
          handleResponse(data);
        } else {
          var errMsg = "Не удалось отправить";
          if (xhr.status === 413) errMsg = "Файл слишком большой. Попробуйте документ до 8 МБ.";
          else if (data && data.error) errMsg = data.error;
          handleResponse({ ok: false, error: errMsg });
        }
      });
      xhr.addEventListener("error", handleError);
      xhr.addEventListener("abort", handleError);
      xhr.open("POST", base + "/api/chat");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(bodyStr);
    } else {
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(function (r) {
        if (!r.ok) {
          return r.text().then(function (t) {
            var errMsg = "Не удалось отправить";
            if (r.status === 413) errMsg = "Файл слишком большой. Попробуйте документ до 8 МБ.";
            else {
              try {
                var j = JSON.parse(t);
                if (j && j.error) errMsg = j.error;
              } catch (e) {}
            }
            return { ok: false, error: errMsg };
          });
        }
        return r.json();
      }).then(function (data) {
        handleResponse(data);
      }).catch(handleError);
    }
  });
}

  return {
    appendOptimisticPersonalMessage: appendOptimisticPersonalMessage,
    sendMessage: sendMessage,
  };
}
