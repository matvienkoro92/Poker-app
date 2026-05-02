// Chat dialogs meta: unread badges, club preview and peer metadata enrichment.

function initChatDialogsMeta(opts) {
  opts = opts || {};
  var getChatIsAdmin = typeof opts.getChatIsAdmin === "function" ? opts.getChatIsAdmin : function () { return false; };
  var getClubChatAccess = typeof opts.getClubChatAccess === "function" ? opts.getClubChatAccess : function () { return "open"; };
  var getDialogsView = typeof opts.getDialogsView === "function" ? opts.getDialogsView : function () { return null; };
  var setTextContentIfChanged = typeof opts.setTextContentIfChanged === "function" ? opts.setTextContentIfChanged : function (el, txt) { if (el) el.textContent = txt != null ? String(txt) : ""; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a || "") === String(b || ""); };

function updateClubChatPendingBadge() {
  var badge = document.getElementById("chatDialogClubPendingBadge");
  if (!badge) return;
  var n = window.chatClubPendingReviewCount || 0;
  if (!getChatIsAdmin() || n <= 0) {
    badge.textContent = "";
    badge.classList.remove("chat-dialog-item__pending-review-badge--visible");
    badge.setAttribute("aria-hidden", "true");
    badge.setAttribute("aria-label", "");
    return;
  }
  var txt = n > 99 ? "99+" : String(n);
  badge.textContent = txt;
  badge.classList.add("chat-dialog-item__pending-review-badge--visible");
  badge.setAttribute("aria-hidden", "false");
  badge.setAttribute("aria-label", "Заявок на рассмотрение: " + txt);
}

function updateDialogUnreadBadges() {
  var clubEl = document.getElementById("chatDialogClubUnread");
  if (clubEl) {
    var n = window.chatGeneralUnreadCount || 0;
    var txt = n > 99 ? "99+" : (n > 0 ? String(n) : "");
    clubEl.textContent = txt;
    clubEl.classList.toggle("chat-dialog-item__unread--visible", n > 0);
    clubEl.setAttribute("aria-hidden", n > 0 ? "false" : "true");
    clubEl.setAttribute("aria-label", n > 0 ? "Непрочитанных: " + txt : "");
  }
  var adminUnread = window.chatAdminUnread || {};
  if (getDialogsView()) getDialogsView().querySelectorAll(".chat-dialog-item__unread[data-dialog-unread-for]").forEach(function (el) {
    var id = el.getAttribute("data-dialog-unread-for");
    var n = id ? (adminUnread[id] || 0) : 0;
    var txt = n > 99 ? "99+" : (n > 0 ? String(n) : "");
    el.textContent = txt;
    el.classList.toggle("chat-dialog-item__unread--visible", n > 0);
    el.setAttribute("aria-hidden", n > 0 ? "false" : "true");
    el.setAttribute("aria-label", n > 0 ? "Непрочитанных: " + txt : "");
  });
  updateClubChatPendingBadge();
}

function updateClubChatPreview(messages) {
  var el = document.getElementById("chatDialogClubPreview");
  if (!el) return;
  el.classList.remove("chat-dialog-item__preview--skeleton");
  el.removeAttribute("aria-busy");
  if (getClubChatAccess() === "need_apply") {
    setTextContentIfChanged(el, "Нажмите, чтобы подать заявку");
    return;
  }
  if (getClubChatAccess() === "pending") {
    setTextContentIfChanged(el, "Заявка на рассмотрении…");
    return;
  }
  if (getClubChatAccess() === "revoked") {
    setTextContentIfChanged(el, "Доступ отозван");
    return;
  }
  if (!messages || messages.length === 0) {
    setTextContentIfChanged(el, "Нет сообщений");
    return;
  }
  var last = messages[messages.length - 1];
  var name = (last.fromName || "Игрок").trim();
  var snippet = "";
  if (last.image) snippet = "[Фото]";
  else if (last.voice) snippet = "[Голосовое]";
  else if (last.document) snippet = "[Документ]";
  else if (last.text) snippet = String(last.text).trim().replace(/\s+/g, " ").slice(0, 50);
  if (snippet && snippet.length >= 50) snippet += "…";
  setTextContentIfChanged(el, snippet ? name + ": " + snippet : name);
}

function updateClubChatPreviewText(previewText) {
  var el = document.getElementById("chatDialogClubPreview");
  if (!el) return;
  el.classList.remove("chat-dialog-item__preview--skeleton");
  el.removeAttribute("aria-busy");
  if (getClubChatAccess() === "need_apply") {
    setTextContentIfChanged(el, "Нажмите, чтобы подать заявку");
    return;
  }
  if (getClubChatAccess() === "pending") {
    setTextContentIfChanged(el, "Заявка на рассмотрении…");
    return;
  }
  if (getClubChatAccess() === "revoked") {
    setTextContentIfChanged(el, "Доступ отозван");
    return;
  }
  var txt = previewText != null ? String(previewText).trim() : "";
  setTextContentIfChanged(el, txt || "Нет сообщений");
}

function enrichPersonalThreadPeerMeta(messages, peerId, fallbackMeta) {
  var pid = peerId != null ? String(peerId).trim() : "";
  var list = Array.isArray(messages) ? messages : [];
  var meta = fallbackMeta && typeof fallbackMeta === "object" ? Object.assign({}, fallbackMeta) : {};
  if (!pid || !list.length) return list;
  for (var i = list.length - 1; i >= 0; i--) {
    var m = list[i];
    if (!m || !m.from || !peerChatIdsEqual(m.from, pid)) continue;
    if (!meta.fromName && m.fromName != null && String(m.fromName).trim()) meta.fromName = String(m.fromName).trim();
    if (!meta.fromDtId && m.fromDtId != null && String(m.fromDtId).trim()) meta.fromDtId = String(m.fromDtId).trim();
    if (!meta.fromAvatar && m.fromAvatar != null && String(m.fromAvatar).trim()) meta.fromAvatar = String(m.fromAvatar).trim();
    if ((meta.fromP21Id == null || String(meta.fromP21Id).trim() === "") && m.fromP21Id != null && String(m.fromP21Id).trim() !== "") {
      meta.fromP21Id = String(m.fromP21Id).trim();
    }
    if (meta.fromRespect === undefined || meta.fromRespect === null) {
      if (m.fromRespect !== undefined && m.fromRespect !== null) meta.fromRespect = m.fromRespect;
    }
    if (meta.fromPokerPlusVerified !== true && m.fromPokerPlusVerified === true) meta.fromPokerPlusVerified = true;
    if ((meta.fromStatusLevel == null || String(meta.fromStatusLevel).trim() === "") && m.fromStatusLevel != null && String(m.fromStatusLevel).trim() !== "") {
      meta.fromStatusLevel = String(m.fromStatusLevel).trim();
    }
  }
  if (!meta.fromName && meta.fromDtId) meta.fromName = meta.fromDtId;
  for (var j = 0; j < list.length; j++) {
    var row = list[j];
    if (!row || !row.from || !peerChatIdsEqual(row.from, pid)) continue;
    if (meta.fromName && (!row.fromName || !String(row.fromName).trim())) row.fromName = meta.fromName;
    if (meta.fromDtId && (!row.fromDtId || !String(row.fromDtId).trim())) row.fromDtId = meta.fromDtId;
    if (meta.fromAvatar && (!row.fromAvatar || !String(row.fromAvatar).trim())) row.fromAvatar = meta.fromAvatar;
    if (
      meta.fromP21Id != null &&
      String(meta.fromP21Id).trim() !== "" &&
      (row.fromP21Id == null || String(row.fromP21Id).trim() === "")
    ) {
      row.fromP21Id = meta.fromP21Id;
    }
    if ((row.fromRespect === undefined || row.fromRespect === null) && meta.fromRespect !== undefined && meta.fromRespect !== null) {
      row.fromRespect = meta.fromRespect;
    }
    if (meta.fromPokerPlusVerified === true) row.fromPokerPlusVerified = true;
    if (
      meta.fromStatusLevel != null &&
      String(meta.fromStatusLevel).trim() !== "" &&
      (row.fromStatusLevel == null || String(row.fromStatusLevel).trim() === "")
    ) {
      row.fromStatusLevel = meta.fromStatusLevel;
    }
  }
  return list;
}

  return {
    updateClubChatPendingBadge: updateClubChatPendingBadge,
    updateDialogUnreadBadges: updateDialogUnreadBadges,
    updateClubChatPreview: updateClubChatPreview,
    updateClubChatPreviewText: updateClubChatPreviewText,
    enrichPersonalThreadPeerMeta: enrichPersonalThreadPeerMeta,
  };
}
