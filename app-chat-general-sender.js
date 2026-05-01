// General chat sender: edit, optimistic append and POST flow.

function initChatGeneralSender(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var chatOutgoingState = opts.chatOutgoingState || {};
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getChatMsgAvatarImgAttrs = typeof opts.getChatMsgAvatarImgAttrs === "function" ? opts.getChatMsgAvatarImgAttrs : function () { return ""; };
  var getSendingGeneral = typeof opts.getSendingGeneral === "function" ? opts.getSendingGeneral : function () { return false; };
  var setSendingGeneral = typeof opts.setSendingGeneral === "function" ? opts.setSendingGeneral : function () {};
  var getSendingGeneralSince = typeof opts.getSendingGeneralSince === "function" ? opts.getSendingGeneralSince : function () { return 0; };
  var setSendingGeneralSince = typeof opts.setSendingGeneralSince === "function" ? opts.setSendingGeneralSince : function () {};
  var getGeneralImage = typeof opts.getGeneralImage === "function" ? opts.getGeneralImage : function () { return null; };
  var setGeneralImage = typeof opts.setGeneralImage === "function" ? opts.setGeneralImage : function () {};
  var getGeneralVoice = typeof opts.getGeneralVoice === "function" ? opts.getGeneralVoice : function () { return null; };
  var setGeneralVoice = typeof opts.setGeneralVoice === "function" ? opts.setGeneralVoice : function () {};
  var getGeneralDocument = typeof opts.getGeneralDocument === "function" ? opts.getGeneralDocument : function () { return null; };
  var setGeneralDocument = typeof opts.setGeneralDocument === "function" ? opts.setGeneralDocument : function () {};
  var getGeneralReplyTo = typeof opts.getGeneralReplyTo === "function" ? opts.getGeneralReplyTo : function () { return null; };
  var setGeneralReplyTo = typeof opts.setGeneralReplyTo === "function" ? opts.setGeneralReplyTo : function () {};
  var getChatEditMode = typeof opts.getChatEditMode === "function" ? opts.getChatEditMode : function () { return false; };
  var getChatEditSource = typeof opts.getChatEditSource === "function" ? opts.getChatEditSource : function () { return ""; };
  var getChatEditMessageId = typeof opts.getChatEditMessageId === "function" ? opts.getChatEditMessageId : function () { return ""; };
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getChatIsEditingMessage = typeof opts.getChatIsEditingMessage === "function" ? opts.getChatIsEditingMessage : function () { return false; };
  var getChatComposerMounted = typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted : function () { return ""; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var clearGeneralComposerDraft = typeof opts.clearGeneralComposerDraft === "function" ? opts.clearGeneralComposerDraft : function () {};
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var getChatGeneralText = typeof opts.getChatGeneralText === "function" ? opts.getChatGeneralText : function () { return ""; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var setGeneralSendBusy = typeof opts.setGeneralSendBusy === "function" ? opts.setGeneralSendBusy : function () {};
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (body) { return body || {}; };
  var patchCachedEditedMessage = typeof opts.patchCachedEditedMessage === "function" ? opts.patchCachedEditedMessage : function () {};
  var applyEditedMessageToDom = typeof opts.applyEditedMessageToDom === "function" ? opts.applyEditedMessageToDom : function () {};
  var clearChatEditUI = typeof opts.clearChatEditUI === "function" ? opts.clearChatEditUI : function () {};
  var chatMsgElById = typeof opts.chatMsgElById === "function" ? opts.chatMsgElById : function () { return null; };
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
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
  var pinChatMessagesToBottom = typeof opts.pinChatMessagesToBottom === "function" ? opts.pinChatMessagesToBottom : null;
  var pokerChatRunAfterPaint = typeof opts.pokerChatRunAfterPaint === "function" ? opts.pokerChatRunAfterPaint : function (fn) { if (typeof fn === "function") fn(); };
  var resizeChatTextarea = typeof opts.resizeChatTextarea === "function" ? opts.resizeChatTextarea : function () {};
  var updateGeneralSendBtnIcon = typeof opts.updateGeneralSendBtnIcon === "function" ? opts.updateGeneralSendBtnIcon : function () {};
  var shouldAutoFocusChatComposerOnDesktop = typeof opts.shouldAutoFocusChatComposerOnDesktop === "function" ? opts.shouldAutoFocusChatComposerOnDesktop : function () { return false; };
  var focusChatComposerForDesktop = typeof opts.focusChatComposerForDesktop === "function" ? opts.focusChatComposerForDesktop : function () {};
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var pokerChatRequestPollBurst = typeof opts.pokerChatRequestPollBurst === "function" ? opts.pokerChatRequestPollBurst : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var setLastGeneralMessagesSig = typeof opts.setLastGeneralMessagesSig === "function" ? opts.setLastGeneralMessagesSig : function () {};
  var generalMessagesSignature = typeof opts.generalMessagesSignature === "function" ? opts.generalMessagesSignature : function () { return ""; };
  var renderGeneralMessages = typeof opts.renderGeneralMessages === "function" ? opts.renderGeneralMessages : function () {};
  var chatCloneRetryPayload = typeof opts.chatCloneRetryPayload === "function" ? opts.chatCloneRetryPayload : function () { return null; };
  var markLatestOptimisticMessageFailed = typeof opts.markLatestOptimisticMessageFailed === "function" ? opts.markLatestOptimisticMessageFailed : function () {};

function appendOptimisticGeneralMessage(text, image, voice, docAttachment, replyTo) {
  if (!getGeneralMessagesEl()) return;
  var emptyEl = getGeneralMessagesEl().querySelector(".chat-empty");
  if (emptyEl) getGeneralMessagesEl().innerHTML = "";
  var authAvatarEl = document.getElementById("authUserAvatar");
  var myAvatarUrl = (authAvatarEl && authAvatarEl.src && authAvatarEl.src.indexOf("data:") !== 0 && authAvatarEl.src.indexOf("http") === 0) ? authAvatarEl.src : "";
  var myNmOpt = resolveMyChatDisplayName();
  var placeholderLetter = "Я";
  try {
    if (myNmOpt && typeof myNmOpt === "string" && myNmOpt.length) {
      for (var ci = 0; ci < myNmOpt.length; ci++) {
        var ch = myNmOpt.charAt(ci);
        if (ch.trim()) {
          placeholderLetter = ch;
          break;
        }
      }
    }
  } catch (ePl) {}
  var optAvatarEl = myAvatarUrl
    ? '<img class="chat-msg__avatar" src="' + escapeHtml(myAvatarUrl) + '" alt=""' + getChatMsgAvatarImgAttrs() + " />"
    : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + escapeHtml(placeholderLetter) + "</span>";
  var time = "";
  try {
    time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  } catch (eTime) {
    time = "";
  }
  var replyBlock = replyTo ? '<div class="chat-msg__reply"><strong>' + escapeHtml(replyTo.fromName || "Игрок") + ":</strong> " + escapeHtml(String(replyTo.text || "").slice(0, 80)) + (String(replyTo.text || "").length > 80 ? "…" : "") + "</div>" : "";
  var textContent = "";
  if (image) {
    textContent =
      '<img class="chat-msg__image" src="' +
      escapeHtml(pokerChatDisplayImageSrc(image)) +
      '" alt="Картинка" loading="eager" decoding="async" fetchpriority="high" />';
  } else if (voice) {
    textContent = chatVoiceMessageHtml(voice, {
      footerToolbarHtml: '<span class="chat-msg__time">' + escapeHtml(time) + "</span>",
    });
  } else if (docAttachment && docAttachment.dataUrl && docAttachment.fileName) textContent = chatDocumentBlockHtml(docAttachment.dataUrl, docAttachment.fileName);
  else if (text) {
    try {
      textContent = linkTgUsernames(linkAppIds(linkUrls(escapeHtml(text).replace(/\n/g, "<br>"))));
    } catch (eLink) {
      textContent = escapeHtml(text).replace(/\n/g, "<br>");
    }
  }
  var optBodyClass =
    "chat-msg__body" +
    (text && !image && !voice && !docAttachment ? " chat-msg__body--has-text" : "") +
    (image ? " chat-msg__body--own-image" : "");
  var textBlockG = textContent ? '<div class="chat-msg__text">' + textContent + "</div>" : "";
  var footerHtmlOptG = voice
    ? ""
    : '<div class="chat-msg__footer"><span class="chat-msg__time">' + escapeHtml(time) + "</span></div>";
  var bodyMainClsOptG =
    "chat-msg__body-main" +
    (!textBlockG ? " chat-msg__body-main--solo-footer" : "") +
    (image ? " chat-msg__body-main--with-image" : "") +
    (voice ? " chat-msg__body-main--voice-inline-time" : "");
  var bodyMainHtmlOptG = '<div class="' + bodyMainClsOptG + '">' + textBlockG + footerHtmlOptG + "</div>";
  var html = '<div class="chat-msg chat-msg--own" data-optimistic="true"><div class="chat-msg__row">' + optAvatarEl + '<div class="' + optBodyClass + '"><div class="chat-msg__meta"></div>' + replyBlock + bodyMainHtmlOptG + "</div></div></div>";
  var wrap = document.createElement("div");
  var newNode = null;
  try {
    wrap.innerHTML = html;
    newNode = wrap.firstElementChild;
  } catch (eInner) {}
  if (!newNode) {
    newNode = document.createElement("div");
    newNode.className = "chat-msg chat-msg--own";
    newNode.setAttribute("data-optimistic", "true");
    var row = document.createElement("div");
    row.className = "chat-msg__row";
    var body = document.createElement("div");
    body.className =
      "chat-msg__body" +
      (text && !image && !voice && !docAttachment ? " chat-msg__body--has-text" : "") +
      (image ? " chat-msg__body--own-image" : "");
    var textWrap = document.createElement("div");
    textWrap.className = "chat-msg__text";
    if (image && typeof image === "string") {
      var im = document.createElement("img");
      im.className = "chat-msg__image";
      im.alt = "Картинка";
      im.src = pokerChatDisplayImageSrc(image) || image;
      textWrap.appendChild(im);
    } else if (voice && typeof voice === "string") {
      appendChatVoiceToTextWrap(textWrap, voice, {
        footerToolbarHtml:
          '<span class="chat-msg__time">' + escapeHtml(time) + "</span>",
      });
    } else {
      textWrap.textContent = text != null ? String(text) : "";
    }
    body.appendChild(textWrap);
    row.appendChild(body);
    newNode.appendChild(row);
  }
  getGeneralMessagesEl().appendChild(newNode);
  requestAnimationFrame(function () {
    applyChatMsgTallTextTimeBelowLayout(getGeneralMessagesEl());
  });
  try {
    getGeneralMessagesEl().scrollTop = getGeneralMessagesEl().scrollHeight;
  } catch (eScroll) {}
}
function sendGeneral(overrideText) {
  if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
  var overridePayload = overrideText && typeof overrideText === "object" ? overrideText : null;
  var rawGeneral = getChatGeneralText();
  var text = overridePayload ? String(overridePayload.text || "").trim() : rawGeneral != null ? String(rawGeneral).trim() : "";
  // Сообщение из chat-шаблона: подставляем текст напрямую,
  // чтобы не зависеть от того, успело ли обновиться нужное поле.
  if (!overridePayload && typeof overrideText === "string") text = String(overrideText).trim();
  // Редактирование сообщения: отправляем PATCH, а не POST нового.
  if (getChatEditMode() && getChatEditSource() === "general" && getChatEditMessageId()) {
    if (!text || getSendingGeneral()) return;
    if (!pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте в Telegram.");
      else if (typeof alert === "function") alert("Войдите через Telegram, чтобы отправлять сообщения в общий чат.");
      return;
    }
    setSendingGeneral(true);
    setGeneralSendBusy(true);
    fetch(base + "/api/chat", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({ action: "edit", messageId: String(getChatEditMessageId()), text: text })
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
        setSendingGeneral(false);
        setGeneralSendBusy(false);
        var d = pack.d;
        if (d && d.ok) {
          var srvMsg = d.message && typeof d.message === "object" ? d.message : null;
          if (srvMsg && srvMsg.id) window._pendingGeneralEdit = srvMsg;
          patchCachedEditedMessage(getChatEditMessageId(), (srvMsg && srvMsg.text) || text, "general", srvMsg);
          applyEditedMessageToDom(getChatEditMessageId(), (srvMsg && srvMsg.text) || text, "general");
          clearChatEditUI();
          if (!getGeneralMessagesEl() || !chatMsgElById(getGeneralMessagesEl(), getChatEditMessageId())) loadGeneral();
        } else {
          var errG = (d && d.error) || "Ошибка";
          if (tg && tg.showAlert) tg.showAlert(errG);
          else if (typeof alert === "function") alert(errG);
        }
      })
      .catch(function () {
        setSendingGeneral(false);
        setGeneralSendBusy(false);
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
    return;
  }
  if (getSendingGeneral()) {
    if (Date.now() - getSendingGeneralSince() < 45000) {
      if (text || getGeneralImage() || getGeneralVoice() || getGeneralDocument()) {
        if (tg && tg.showAlert) tg.showAlert("Подождите, предыдущее сообщение ещё отправляется…");
        else if (typeof alert === "function") alert("Подождите, предыдущее сообщение ещё отправляется…");
      }
      return;
    }
    setSendingGeneral(false);
    setGeneralSendBusy(false);
  }
  var generalImageOut = overridePayload ? (overridePayload.image || null) : getGeneralImage();
  var generalVoiceOut = overridePayload ? (overridePayload.voice || null) : getGeneralVoice();
  var generalDocumentOut = overridePayload ? (overridePayload.document || null) : getGeneralDocument();
  var generalReplyOut = overridePayload ? (overridePayload.replyTo || null) : getGeneralReplyTo();
  if (!text && !generalImageOut && !generalVoiceOut && !generalDocumentOut) {
    if (rawGeneral != null && String(rawGeneral).length > 0) {
      if (tg && tg.showAlert) tg.showAlert("Введите текст сообщения, не только пробелы.");
      else if (typeof alert === "function") alert("Введите текст сообщения, не только пробелы.");
    }
    return;
  }
  var genArea = document.getElementById("chatGeneralInputArea");
  if (genArea && genArea.classList.contains("chat-input-area--locked")) {
    if (tg && tg.showAlert) tg.showAlert("Нет доступа к общему чату.");
    return;
  }
  if (!pokerApiHasCredential()) {
    if (tg && tg.showAlert) tg.showAlert("Откройте в Telegram.");
    else if (typeof alert === "function") alert("Войдите через Telegram, чтобы отправлять сообщения в общий чат.");
    return;
  }
  try {
    var body = pokerApiAuthJsonBody({ text: text });
    if (generalImageOut) body.image = generalImageOut;
    if (generalVoiceOut) body.voice = generalVoiceOut;
    if (generalDocumentOut) { body.document = generalDocumentOut.dataUrl; body.documentName = generalDocumentOut.fileName; }
    if (generalReplyOut) {
      var replyText = (generalReplyOut.text && String(generalReplyOut.text).trim()) || (generalReplyOut.hasImage ? "[Фото]" : generalReplyOut.hasVoice ? "[Голосовое сообщение]" : generalReplyOut.hasDocument ? "[Документ]" : "\u2014");
      body.replyTo = { id: generalReplyOut.id, from: generalReplyOut.from, fromName: generalReplyOut.fromName || "Игрок", text: replyText };
    }
    var optText = text;
    var optImage = generalImageOut || null;
    var optVoice = generalVoiceOut || null;
    var optDocument = generalDocumentOut ? { dataUrl: generalDocumentOut.dataUrl, fileName: generalDocumentOut.fileName } : null;
    var optReply = generalReplyOut ? { fromName: generalReplyOut.fromName || "Игрок", text: generalReplyOut.text || "" } : null;
    chatOutgoingState.optimisticGeneralPayload = {
      text: optText || "",
      image: optImage || null,
      voice: optVoice || null,
      document: optDocument,
      replyTo: body.replyTo || null,
      from: resolveMyChatMemberId(),
      time: new Date().toISOString(),
      __domAppended: false,
    };
    setSendingGeneral(true);
    setSendingGeneralSince(Date.now());
    setGeneralSendBusy(true);
    try {
      appendOptimisticGeneralMessage(optText, optImage, optVoice, optDocument, optReply);
      if (chatOutgoingState.optimisticGeneralPayload) chatOutgoingState.optimisticGeneralPayload.__domAppended = true;
    } catch (e) {
      /* Не блокировать POST: в TG WKWebView innerHTML/append иногда падает — лента подтянется через mergeOptimistic + loadGeneral. */
      if (typeof console !== "undefined" && console.error) console.error("appendOptimisticGeneralMessage failed", e);
    }
    /* Не ставим scrollGeneralToBottomOnNextRender при отправке — лишний полный render; скролл вниз даёт pinChatMessagesToBottom. */
    try {
      if (getGeneralMessagesEl() && typeof pinChatMessagesToBottom === "function") pinChatMessagesToBottom(getGeneralMessagesEl(), true);
      if (getGeneralMessagesEl()) try { void getGeneralMessagesEl().offsetHeight; } catch (eFlushG) {}
    } catch (ePinG) {}
    pokerChatRunAfterPaint(function () {
      clearGeneralComposerDraft();
      if (getChatComposerMounted() === "general" && getChatComposerEl()) {
        getChatComposerEl().value = "";
        try { resizeChatTextarea(getChatComposerEl()); } catch (e) {}
        try { updateGeneralSendBtnIcon(); } catch (e) {}
        if (typeof window.__pokerKeepChatComposerFocusAfterSend === "function") {
          window.__pokerKeepChatComposerFocusAfterSend("general");
        } else if (shouldAutoFocusChatComposerOnDesktop()) {
          focusChatComposerForDesktop();
        } else {
          setTimeout(function () {
            try {
              if (getChatComposerEl() && getChatComposerEl().focus) getChatComposerEl().focus({ preventScroll: true });
            } catch (eFocusSendG) {}
          }, 50);
        }
      }
      setGeneralReplyTo(null);
      setGeneralImage(null);
      setGeneralDocument(null);
      setGeneralVoice(null);
      var prevEl = document.getElementById("chatGeneralReplyPreview");
      if (prevEl) { prevEl.classList.remove("chat-reply-preview--visible"); prevEl.querySelector(".chat-reply-preview__text").textContent = ""; }
      var imgPrev = document.getElementById("chatGeneralImagePreview");
      if (imgPrev) { imgPrev.classList.remove("chat-image-preview--visible"); imgPrev.innerHTML = ""; }
      var voicePrev = document.getElementById("chatGeneralVoicePreview");
      if (voicePrev) voicePrev.classList.add("chat-voice-preview--hidden");
      var bodyStrG = JSON.stringify(body);
      var hasMediaG = !!(body.image || body.voice || body.document);
      function applyGeneralPostResponse(data, httpOk) {
        setSendingGeneral(false);
        setSendingGeneralSince(0);
        setGeneralSendBusy(false);
        var d = data && typeof data === "object" ? data : { ok: false, error: "Ошибка ответа" };
        if (!httpOk && !d.error) d.error = "Ошибка отправки";
        if (httpOk && d && d.ok) {
          if (d.trace && d.trace.serverNowMs) {
            pokerChatRecordTrace("general-send-ack", {
              ackMs: Math.max(0, Date.now() - Number(d.trace.serverNowMs || 0)),
              messageId: d.message && d.message.id ? String(d.message.id) : "",
            });
          }
          chatOutgoingState.optimisticGeneralPayload = null;
          chatOutgoingState.failedGeneralPayload = null;
          pokerChatRequestPollBurst("general");
          pokerChatRefreshLongPollTargets();
          var msg = d.message;
          if (msg && pokerChatMessageHasPersistedId(msg.id)) {
            window._pendingGeneralMessage = msg;
            var cache = window._chatGeneralCache || { messages: [], participantsCount: null, onlineCount: null, generalMembers: [] };
            if (Array.isArray(cache.messages) && !cache.messages.some(function (m) { return String(m.id) === String(msg.id); })) {
              var msgs = cache.messages.concat([msg]);
              window._chatGeneralCache = Object.assign({}, cache, { messages: msgs });
              setLastGeneralMessagesSig(null);
              if (getChatActiveTab() === "general" && !getChatIsEditingMessage()) {
                setLastGeneralMessagesSig(generalMessagesSignature(msgs));
                renderGeneralMessages(msgs);
              }
            }
          }
          loadGeneral();
        } else {
          chatOutgoingState.optimisticGeneralPayload = null;
          chatOutgoingState.failedGeneralPayload = chatCloneRetryPayload({
            text: optText || "",
            image: optImage || null,
            voice: optVoice || null,
            document: optDocument,
            replyTo: body.replyTo || null,
          });
          markLatestOptimisticMessageFailed(getGeneralMessagesEl(), "general");
          var errT = (d && d.error) || "Ошибка";
          if (tg && tg.showAlert) tg.showAlert(errT);
          else if (typeof alert === "function") alert(errT);
        }
      }
      function failGeneralPostNetwork() {
        chatOutgoingState.optimisticGeneralPayload = null;
        chatOutgoingState.failedGeneralPayload = chatCloneRetryPayload({
          text: optText || "",
          image: optImage || null,
          voice: optVoice || null,
          document: optDocument,
          replyTo: body.replyTo || null,
        });
        setSendingGeneral(false);
        setSendingGeneralSince(0);
        setGeneralSendBusy(false);
        markLatestOptimisticMessageFailed(getGeneralMessagesEl(), "general");
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      }
      if (hasMediaG && typeof XMLHttpRequest !== "undefined") {
        var xhrG = new XMLHttpRequest();
        xhrG.addEventListener("load", function () {
          var parsed = null;
          try {
            parsed = JSON.parse(xhrG.responseText || "{}");
          } catch (eJ) {
            parsed = { ok: false, error: "Не удалось разобрать ответ сервера" };
          }
          var okHttp = xhrG.status >= 200 && xhrG.status < 300;
          if (!okHttp && parsed && !parsed.error) {
            if (xhrG.status === 413) parsed.error = "Вложение слишком большое.";
            else parsed.error = "Ошибка " + (xhrG.status || "");
          }
          applyGeneralPostResponse(parsed, okHttp);
        });
        xhrG.addEventListener("error", failGeneralPostNetwork);
        xhrG.addEventListener("abort", failGeneralPostNetwork);
        xhrG.open("POST", base + "/api/chat");
        xhrG.setRequestHeader("Content-Type", "application/json");
        xhrG.send(bodyStrG);
      } else {
        fetch(base + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: bodyStrG,
        })
          .then(function (r) {
            return r.json().catch(function () {
              return { ok: false, error: "Не удалось разобрать ответ сервера" };
            }).then(function (data) {
              var d = data && typeof data === "object" ? data : { ok: false, error: "Ошибка ответа" };
              if (!r.ok && !d.error) d.error = "Ошибка " + (r.status || "") + (r.statusText ? " " + r.statusText : "");
              return { d: d, ok: r.ok };
            });
          })
          .then(function (pack) {
            applyGeneralPostResponse(pack.d, pack.ok);
          })
          .catch(failGeneralPostNetwork);
      }
    });
  } catch (err) {
    chatOutgoingState.optimisticGeneralPayload = null;
    setSendingGeneral(false);
    setSendingGeneralSince(0);
    setGeneralSendBusy(false);
    if (typeof console !== "undefined" && console.error) console.error("sendGeneral failed", err);
    if (tg && tg.showAlert) tg.showAlert("Не удалось отправить сообщение");
    else if (typeof alert === "function") alert("Не удалось отправить сообщение");
  }
}

  return {
    appendOptimisticGeneralMessage: appendOptimisticGeneralMessage,
    sendGeneral: sendGeneral,
  };
}
