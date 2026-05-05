// Chat reply-cancel controls and failed-message retry listeners.

function initChatReplyRetryGlue(opts) {
  opts = opts || {};
  with (opts) {
    updateGeneralSendBtnIcon();
    var generalReplyCancel = document.querySelector("#chatGeneralReplyPreview .chat-reply-preview__cancel");
    if (generalReplyCancel) generalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "general") {
        clearChatEditUI();
        return;
      }
      generalReplyTo = null;
      var p = document.getElementById("chatGeneralReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    updatePersonalSendBtnIcon();
    var personalReplyCancel = document.querySelector("#chatPersonalReplyPreview .chat-reply-preview__cancel");
    if (personalReplyCancel) personalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "personal") {
        clearChatEditUI();
        return;
      }
      personalReplyTo = null;
      var p = document.getElementById("chatPersonalReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    if (generalMessages) {
      generalMessages.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "general"));
      });
    }
    if (messagesEl) {
      messagesEl.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "personal"));
      });
    }

  }
}
