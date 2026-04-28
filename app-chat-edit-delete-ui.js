// Chat edit/delete UI helpers.

function initChatEditDeleteUi(opts) {
  opts = opts || {};
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var linkTgUsernames = typeof opts.linkTgUsernames === "function" ? opts.linkTgUsernames : function (s) { return s; };
  var linkAppIds = typeof opts.linkAppIds === "function" ? opts.linkAppIds : function (s) { return s; };
  var linkUrls = typeof opts.linkUrls === "function" ? opts.linkUrls : function (s) { return s; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var getChatComposerDraft = typeof opts.getChatComposerDraft === "function" ? opts.getChatComposerDraft : function () { return ""; };
  var setChatComposerDraft = typeof opts.setChatComposerDraft === "function" ? opts.setChatComposerDraft : function () {};
  var setChatEditMode = typeof opts.setChatEditMode === "function" ? opts.setChatEditMode : function () {};
  var setChatEditMessageId = typeof opts.setChatEditMessageId === "function" ? opts.setChatEditMessageId : function () {};
  var setChatEditSource = typeof opts.setChatEditSource === "function" ? opts.setChatEditSource : function () {};
  var setChatEditWith = typeof opts.setChatEditWith === "function" ? opts.setChatEditWith : function () {};
  var getChatEditFromName = typeof opts.getChatEditFromName === "function" ? opts.getChatEditFromName : function () { return ""; };
  var setChatEditFromName = typeof opts.setChatEditFromName === "function" ? opts.setChatEditFromName : function () {};
  var setChatIsEditingMessage = typeof opts.setChatIsEditingMessage === "function" ? opts.setChatIsEditingMessage : function () {};
  var setGeneralReplyTo = typeof opts.setGeneralReplyTo === "function" ? opts.setGeneralReplyTo : function () {};
  var setPersonalReplyTo = typeof opts.setPersonalReplyTo === "function" ? opts.setPersonalReplyTo : function () {};
  var setGeneralImage = typeof opts.setGeneralImage === "function" ? opts.setGeneralImage : function () {};
  var setGeneralVoice = typeof opts.setGeneralVoice === "function" ? opts.setGeneralVoice : function () {};
  var setGeneralDocument = typeof opts.setGeneralDocument === "function" ? opts.setGeneralDocument : function () {};
  var setPersonalImage = typeof opts.setPersonalImage === "function" ? opts.setPersonalImage : function () {};
  var setPersonalVoice = typeof opts.setPersonalVoice === "function" ? opts.setPersonalVoice : function () {};
  var setPersonalDocument = typeof opts.setPersonalDocument === "function" ? opts.setPersonalDocument : function () {};
  var resizeChatTextarea = typeof opts.resizeChatTextarea === "function" ? opts.resizeChatTextarea : function () {};
  var updateGeneralSendBtnIcon = typeof opts.updateGeneralSendBtnIcon === "function" ? opts.updateGeneralSendBtnIcon : function () {};
  var updatePersonalSendBtnIcon = typeof opts.updatePersonalSendBtnIcon === "function" ? opts.updatePersonalSendBtnIcon : function () {};
  var mountChatComposer = typeof opts.mountChatComposer === "function" ? opts.mountChatComposer : function () {};
  var applyChatMsgTallTextTimeBelowLayout = typeof opts.applyChatMsgTallTextTimeBelowLayout === "function" ? opts.applyChatMsgTallTextTimeBelowLayout : function () {};
  var chatMsgElById = typeof opts.chatMsgElById === "function" ? opts.chatMsgElById : function () { return null; };

function getQuotePreviewText(t) {
  var s = (t == null ? "" : String(t)).trim();
  if (!s) return "—";
  var max = 60;
  var out = s.slice(0, max);
  if (s.length > max) out += "…";
  return out;
}

function clearChatEditUI() {
  setChatEditMode(false);
  setChatEditMessageId(null);
  setChatEditSource(null);
  setChatEditWith(null);
  setChatEditFromName(null);
  setChatIsEditingMessage(false);

  setGeneralReplyTo(null);
  setPersonalReplyTo(null);

  try {
    setChatComposerDraft("general", "");
    setChatComposerDraft("personal", "");
    if (getChatComposerEl()) {
      getChatComposerEl().value = "";
      try { resizeChatTextarea(getChatComposerEl()); } catch (eResizeG) {}
    }
  } catch (e) {}

  var prevG = document.getElementById("chatGeneralReplyPreview");
  if (prevG) {
    prevG.classList.remove("chat-reply-preview--visible");
    var txG = prevG.querySelector(".chat-reply-preview__text");
    if (txG) txG.textContent = "";
  }
  var prevP = document.getElementById("chatPersonalReplyPreview");
  if (prevP) {
    prevP.classList.remove("chat-reply-preview--visible");
    var txP = prevP.querySelector(".chat-reply-preview__text");
    if (txP) txP.textContent = "";
  }

  // Сбрасываем вложения (на всякий случай): режим редактирования только для текста.
  setGeneralImage(null); setGeneralVoice(null); setGeneralDocument(null);
  setPersonalImage(null); setPersonalVoice(null); setPersonalDocument(null);

  var imgPrevG = document.getElementById("chatGeneralImagePreview");
  if (imgPrevG) { imgPrevG.classList.remove("chat-image-preview--visible"); imgPrevG.innerHTML = ""; }
  var voicePrevG = document.getElementById("chatGeneralVoicePreview");
  if (voicePrevG) voicePrevG.classList.add("chat-voice-preview--hidden");
  var fileInG = document.getElementById("chatGeneralFileInput");
  if (fileInG) fileInG.value = "";
  var pdfInG = document.getElementById("chatGeneralPdfInput");
  if (pdfInG) pdfInG.value = "";

  var imgPrevP = document.getElementById("chatPersonalImagePreview");
  if (imgPrevP) { imgPrevP.classList.remove("chat-image-preview--visible"); imgPrevP.innerHTML = ""; }
  var voicePrevP = document.getElementById("chatPersonalVoicePreview");
  if (voicePrevP) voicePrevP.classList.add("chat-voice-preview--hidden");
  var fileInP = document.getElementById("chatPersonalFileInput");
  if (fileInP) fileInP.value = "";
  var pdfInP = document.getElementById("chatPersonalPdfInput");
  if (pdfInP) pdfInP.value = "";

  try { if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon(); } catch (e3) {}
  try { if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon(); } catch (e4) {}
}

function applyEditedMessageToDom(messageId, newText, source) {
  if (!messageId) return;
  var selector = '.chat-msg[data-msg-id="' + String(messageId).replace(/"/g, '\\"') + '"]';
  var root = source === "personal" ? getMessagesEl() : getGeneralMessagesEl();
  if (!root) return;
  var msgEl = root.querySelector(selector);
  if (!msgEl) return;
  var textEl = msgEl.querySelector(".chat-msg__text");
  if (textEl) {
    var safeHtml = linkTgUsernames(linkAppIds(linkUrls(escapeHtml(String(newText)).replace(/\n/g, "<br>"))));
    textEl.innerHTML = safeHtml;
  }
  var footer = msgEl.querySelector(".chat-msg__footer");
  if (footer && !footer.querySelector(".chat-msg__edited")) {
    var span = document.createElement("span");
    span.className = "chat-msg__edited";
    span.textContent = "(отредактировано)";
    footer.insertBefore(span, footer.lastElementChild);
  }
  requestAnimationFrame(function () {
    applyChatMsgTallTextTimeBelowLayout(root);
  });
}

function applyDeletedMessageToDom(messageId, source) {
  if (!messageId) return false;
  var root = source === "personal" ? getMessagesEl() : getGeneralMessagesEl();
  if (!root) return false;
  var msgEl = chatMsgElById(root, messageId);
  if (!msgEl) return false;
  var next = msgEl.nextElementSibling;
  if (next && next.classList && next.classList.contains("chat-day-divider")) {
    var afterDivider = next.nextElementSibling;
    if (!afterDivider || !afterDivider.classList || !afterDivider.classList.contains("chat-msg")) {
      next.remove();
    }
  }
  msgEl.remove();
  if (!root.querySelector(".chat-msg")) {
    root.innerHTML = '<p class="chat-empty">Сообщений пока нет</p>';
  } else {
    requestAnimationFrame(function () {
      try {
        applyChatMsgTallTextTimeBelowLayout(root);
      } catch (eDelLayout) {}
    });
  }
  return true;
}

function startChatEdit(src, msgId, oldText, fromName) {
  if (!src) return;
  // UI редактирования показываем всегда, а режим PATCH включаем только если есть id.
  setChatEditMode(!!msgId);
  setChatEditMessageId(msgId || null);
  setChatEditSource(src);
  setChatEditWith(src === "personal" ? getChatWithUserId() : null);
  setChatEditFromName(fromName || "Игрок");

  setChatIsEditingMessage(true);

  // Сбрасываем предыдущие reply/вложения и показываем редактор.
  setGeneralReplyTo(null);
  setPersonalReplyTo(null);

  if (src === "general") {
    mountChatComposer("general");
    if (getChatComposerEl()) {
      setChatComposerDraft("general", String(oldText == null ? "" : oldText));
      getChatComposerEl().value = getChatComposerDraft("general");
      try { resizeChatTextarea(getChatComposerEl()); } catch (e) {}
      if (getChatComposerEl().focus) getChatComposerEl().focus();
    }
    var prevG = document.getElementById("chatGeneralReplyPreview");
    if (prevG) {
      var txG = prevG.querySelector(".chat-reply-preview__text");
      if (txG) txG.textContent = "Редактирование: " + (getChatEditFromName() || "Игрок") + ": " + getQuotePreviewText(oldText);
      prevG.classList.add("chat-reply-preview--visible");
    }
    // Подсказка: редактирование только для текста — убираем вложения.
    setGeneralImage(null); setGeneralVoice(null); setGeneralDocument(null);
    var imgPrevG2 = document.getElementById("chatGeneralImagePreview");
    if (imgPrevG2) { imgPrevG2.classList.remove("chat-image-preview--visible"); imgPrevG2.innerHTML = ""; }
    var voicePrevG2 = document.getElementById("chatGeneralVoicePreview");
    if (voicePrevG2) voicePrevG2.classList.add("chat-voice-preview--hidden");
  } else {
    mountChatComposer("personal");
    if (getChatComposerEl()) {
      setChatComposerDraft("personal", String(oldText == null ? "" : oldText));
      getChatComposerEl().value = getChatComposerDraft("personal");
      try { resizeChatTextarea(getChatComposerEl()); } catch (e2) {}
      if (getChatComposerEl().focus) getChatComposerEl().focus();
    }
    var prevP = document.getElementById("chatPersonalReplyPreview");
    if (prevP) {
      var txP = prevP.querySelector(".chat-reply-preview__text");
      if (txP) txP.textContent = "Редактирование: " + (getChatEditFromName() || "Игрок") + ": " + getQuotePreviewText(oldText);
      prevP.classList.add("chat-reply-preview--visible");
    }
    setPersonalImage(null); setPersonalVoice(null); setPersonalDocument(null);
    var imgPrevP2 = document.getElementById("chatPersonalImagePreview");
    if (imgPrevP2) { imgPrevP2.classList.remove("chat-image-preview--visible"); imgPrevP2.innerHTML = ""; }
    var voicePrevP2 = document.getElementById("chatPersonalVoicePreview");
    if (voicePrevP2) voicePrevP2.classList.add("chat-voice-preview--hidden");
  }

  try { if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon(); } catch (e) {}
  try { if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon(); } catch (e) {}
}

  return {
    clearChatEditUI: clearChatEditUI,
    applyEditedMessageToDom: applyEditedMessageToDom,
    applyDeletedMessageToDom: applyDeletedMessageToDom,
    startChatEdit: startChatEdit,
  };
}
