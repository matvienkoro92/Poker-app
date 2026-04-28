// Chat message HTML body builders.

function initChatMessageBodyBuilders(opts) {
  opts = opts || {};
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var pokerChatDisplayImageSrc = typeof opts.pokerChatDisplayImageSrc === "function" ? opts.pokerChatDisplayImageSrc : function (src) { return src || ""; };
  var chatMsgImageAttrs = typeof opts.chatMsgImageAttrs === "function" ? opts.chatMsgImageAttrs : function () { return ""; };
  var chatMsgVoiceOnlyNoCaption = typeof opts.chatMsgVoiceOnlyNoCaption === "function" ? opts.chatMsgVoiceOnlyNoCaption : function () { return false; };
  var chatVoiceMessageHtml = typeof opts.chatVoiceMessageHtml === "function" ? opts.chatVoiceMessageHtml : function () { return ""; };
  var chatDocumentBlockHtml = typeof opts.chatDocumentBlockHtml === "function" ? opts.chatDocumentBlockHtml : function () { return ""; };
  var chatDayDividerHtmlBeforeMessage = typeof opts.chatDayDividerHtmlBeforeMessage === "function" ? opts.chatDayDividerHtmlBeforeMessage : function () { return ""; };
  var chatMessageBodyHtml = typeof opts.chatMessageBodyHtml === "function" ? opts.chatMessageBodyHtml : function (m) { return escapeHtml((m && m.text) || ""); };
  var chatProfileStatusLevelHtml = typeof opts.chatProfileStatusLevelHtml === "function" ? opts.chatProfileStatusLevelHtml : function () { return ""; };
  var pokerProfileStatusFishLevel = typeof opts.pokerProfileStatusFishLevel === "function" ? opts.pokerProfileStatusFishLevel : function (level) { return level; };
  var pokerProfileStatusFishIconHtml = typeof opts.pokerProfileStatusFishIconHtml === "function" ? opts.pokerProfileStatusFishIconHtml : function () { return ""; };
  var chatPokerPlusVerifiedBadgeHtml = typeof opts.chatPokerPlusVerifiedBadgeHtml === "function" ? opts.chatPokerPlusVerifiedBadgeHtml : function () { return ""; };
  var sortChatReactionEmojiKeys = typeof opts.sortChatReactionEmojiKeys === "function" ? opts.sortChatReactionEmojiKeys : function (keys) { return keys || []; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getChatMsgAvatarImgAttrs = typeof opts.getChatMsgAvatarImgAttrs === "function" ? opts.getChatMsgAvatarImgAttrs : function () { return ""; };

function buildGeneralMessagesBodyHtml(messages) {
  var myIdRender = resolveMyChatMemberId();
  return (messages || []).map(function (m, i) {
    var prev = i > 0 ? messages[i - 1] : null;
    var next = i < messages.length - 1 ? messages[i + 1] : null;
    var sameUser = function (a, b) {
      if (!a || !b || a.from == null || a.from === "" || b.from == null || b.from === "") return false;
      return peerChatIdsEqual(a.from, b.from);
    };
    var isFirstInGroup = !prev || !sameUser(prev, m);
    var isLastInGroup = !next || !sameUser(next, m);
    var isOwn = !!(myIdRender && peerChatIdsEqual(m.from, myIdRender));
    var cls = isOwn ? "chat-msg chat-msg--own" : "chat-msg chat-msg--other";
    var dataAttrs = "";
    if (isOwn && pokerChatMessageHasPersistedId(m.id)) {
      dataAttrs = ' data-msg-id="' + escapeHtml(m.id) + '" data-msg-own="true"';
      if (!m.image && !m.voice && !m.document && (m.text != null)) dataAttrs += ' data-msg-text="' + escapeHtml(String(m.text || "")) + '"';
    } else if (!isOwn && pokerChatMessageHasPersistedId(m.id)) {
      dataAttrs = ' data-msg-id="' + escapeHtml(m.id) + '" data-msg-from="' + escapeHtml(m.from || "") + '" data-msg-from-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"';
    }
    if (m.__clientOptimistic) dataAttrs += ' data-optimistic="true"';
    var time = m.time ? new Date(m.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
    var text = chatMessageBodyHtml(m);
    var imgBlock = m.image ? '<img class="chat-msg__image" src="' + escapeHtml(pokerChatDisplayImageSrc(m.image)) + '" alt="Картинка"' + chatMsgImageAttrs(i, messages.length) + " />" : "";
    var editedBadge = m.edited ? '<span class="chat-msg__edited">(отредактировано)</span>' : "";
    var voiceOnlyG = chatMsgVoiceOnlyNoCaption(m);
    var voiceBlock = m.voice ? chatVoiceMessageHtml(m.voice, voiceOnlyG ? { footerToolbarHtml: '<span class="chat-msg__time">' + time + "</span>" + editedBadge } : undefined) : "";
    var documentBlock = m.document ? chatDocumentBlockHtml(m.document, m.documentName || "document.pdf") : "";
    var replyBlock = m.replyTo ? '<div class="chat-msg__reply"><strong>' + escapeHtml(m.replyTo.fromName || "Игрок") + ':</strong> ' + escapeHtml(String(m.replyTo.text || "").slice(0, 80)) + (String(m.replyTo.text || "").length > 80 ? "…" : "") + '</div>' : "";
    var adminBadge = m.fromAdmin ? '<span class="chat-msg__admin">(админ)</span>' : "";
    var avatarEl = isLastInGroup ? (m.fromAvatar ? '<img class="chat-msg__avatar" src="' + escapeHtml(m.fromAvatar) + '" alt=""' + getChatMsgAvatarImgAttrs() + " />" : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + (m.fromName || "И")[0] + "</span>") : '<span class="chat-msg__avatar-spacer"></span>';
    var nameEl = "";
    if (!isOwn) {
      var nameStr = escapeHtml(m.fromName || "Игрок");
      var statusLevel = m.fromStatusLevel != null && m.fromStatusLevel !== "" ? pokerProfileStatusFishLevel(m.fromStatusLevel) : "";
      var levelStr = chatProfileStatusLevelHtml(statusLevel);
      var fishIconStr = pokerProfileStatusFishIconHtml(statusLevel, "chat-msg__status-fish");
      var verifiedStr = chatPokerPlusVerifiedBadgeHtml(m.fromPokerPlusVerified);
      var respectVal = m.fromRespect !== undefined && m.fromRespect !== null ? (m.fromRespect === 0 ? "\u2014" : String(m.fromRespect)) : "\u2014";
      var respectClass = "chat-msg__respect";
      if (m.fromRespect > 0) respectClass += " chat-msg__respect--positive";
      else if (m.fromRespect < 0) respectClass += " chat-msg__respect--negative";
      var respectDataAttrs = m.from ? ' data-user-id="' + escapeHtml(m.from) + '" data-user-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"' : "";
      var metaLineTop = '<div class="chat-msg__meta-line">' + '<span class="chat-msg__name">' + nameStr + "</span>" + verifiedStr + levelStr + fishIconStr + "</div>";
      var respectPart = '<span class="chat-msg__respect-row chat-msg__respect-inline"' + respectDataAttrs + '><span class="' + respectClass + '" title="Уважение в чате">Ув: ' + escapeHtml(respectVal) + "</span></span>";
      var metaLineRespect = '<div class="chat-msg__meta-line chat-msg__meta-sub">' + respectPart + "</div>";
      var pmAvatarAttr = m.fromAvatar ? ' data-pm-avatar="' + escapeHtml(m.fromAvatar) + '"' : "";
      nameEl = '<div class="chat-msg__meta-stack"><button type="button" class="chat-msg__name-btn" data-pm-id="' + escapeHtml(m.from) + '" data-pm-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"' + pmAvatarAttr + ">" + metaLineTop + "</button>" + metaLineRespect + "</div>";
    }
    var textBlock = (text || imgBlock || voiceBlock || documentBlock) ? '<div class="chat-msg__text">' + imgBlock + voiceBlock + documentBlock + text + '</div>' : "";
    var reactionsHtml = "";
    if (pokerChatMessageHasPersistedId(m.id) && m.reactions && typeof m.reactions === "object") {
      var emKeysG = [];
      for (var em in m.reactions) if (Object.prototype.hasOwnProperty.call(m.reactions, em) && Array.isArray(m.reactions[em]) && m.reactions[em].length > 0) emKeysG.push(em);
      var pills = [];
      sortChatReactionEmojiKeys(emKeysG).forEach(function (emj) {
        var count = m.reactions[emj].length;
        var iReacted = myIdRender && m.reactions[emj].indexOf(myIdRender) >= 0;
        pills.push('<button type="button" class="chat-msg__reaction ' + (iReacted ? 'chat-msg__reaction--mine' : '') + '" data-msg-id="' + escapeHtml(m.id) + '" data-emoji="' + escapeHtml(emj) + '" data-source="general">' + escapeHtml(emj) + ' <span class="chat-msg__reaction-count">' + count + '</span></button>');
      });
      reactionsHtml = pills.join("");
    }
    var reactionsRow = pokerChatMessageHasPersistedId(m.id) ? '<div class="chat-msg__reactions-wrap"><span class="chat-msg__reactions">' + reactionsHtml + '</span></div>' : "";
    var metaBlock = isFirstInGroup ? nameEl + adminBadge : "";
    var bodyClass = "chat-msg__body" + (text && text.trim() ? " chat-msg__body--has-text" : "") + (isOwn && m.image ? " chat-msg__body--own-image" : "");
    var footerHtmlG = voiceOnlyG ? "" : '<div class="chat-msg__footer"><span class="chat-msg__time">' + time + '</span>' + editedBadge + "</div>";
    var bodyMainClsG = "chat-msg__body-main" + (!textBlock ? " chat-msg__body-main--solo-footer" : "") + (m.image ? " chat-msg__body-main--with-image" : "") + (voiceOnlyG ? " chat-msg__body-main--voice-inline-time" : "");
    var bodyMainHtmlG = '<div class="' + bodyMainClsG + '">' + textBlock + footerHtmlG + "</div>";
    var dayDividerG = chatDayDividerHtmlBeforeMessage(prev, m);
    return dayDividerG + '<div class="' + cls + '"' + dataAttrs + '><div class="chat-msg__row">' + avatarEl + '<div class="' + bodyClass + '"><div class="chat-msg__meta">' + metaBlock + '</div>' + replyBlock + bodyMainHtmlG + reactionsRow + '</div></div></div>';
  }).join("");
}
function getPersonalReceiptState(m, isOwn) {
  var delivered = false;
  var read = false;
  if (!isOwn || !m) return { delivered: false, read: false };
  var status = (m.deliveryStatus || m.status || m.state) != null ? String(m.deliveryStatus || m.status || m.state) : "";
  status = status.toLowerCase();
  if (status) {
    if (status.indexOf("read") >= 0 || status.indexOf("seen") >= 0 || status.indexOf("прочит") >= 0) {
      delivered = true;
      read = true;
    } else if (status.indexOf("deliver") >= 0 || status.indexOf("delivered") >= 0 || status.indexOf("достав") >= 0) {
      delivered = true;
    } else if (status.indexOf("sent") >= 0 || status.indexOf("send") >= 0 || status.indexOf("отправ") >= 0) {
      delivered = false;
      read = false;
    }
  }
  if (m.peerHasRead === true) {
    delivered = true;
    read = true;
  }
  if (m.delivered === true || m.isDelivered === true || m.deliveredAt || m.delivered_at) delivered = true;
  if (m.read === true || m.isRead === true || m.seen === true || m.isSeen === true || m.readAt || m.read_at || m.seenAt || m.seen_at) {
    delivered = true;
    read = true;
  }
  if (Array.isArray(m.readBy) && m.readBy.length) {
    delivered = true;
    read = true;
  }
  if (Array.isArray(m.seenBy) && m.seenBy.length) {
    delivered = true;
    read = true;
  }
  if (
    !read &&
    !delivered &&
    pokerChatMessageHasPersistedId(m.id) &&
    m.__clientOptimistic !== true &&
    m.__pushPlaceholder !== true
  ) {
    delivered = true;
  }
  return { delivered: delivered, read: read };
}
function buildPersonalMessagesBodyHtml(messages) {
  var myIdRenderP = resolveMyChatMemberId();
  function personalReceiptHtmlInline(m, isOwn) {
    if (!isOwn) return "";
    var receipt = getPersonalReceiptState(m, isOwn);
    return '<div class="chat-msg__ticks' + (receipt.delivered ? ' chat-msg__ticks--delivered' : ' chat-msg__ticks--sent') + (receipt.read ? ' chat-msg__ticks--read' : '') + '" aria-hidden="true">' + (receipt.delivered ? "✓✓" : "✓") + "</div>";
  }
  return (messages || []).map(function (m, i) {
    var prev = i > 0 ? messages[i - 1] : null;
    var next = i < messages.length - 1 ? messages[i + 1] : null;
    if (m && m.groupSystemEvent) {
      var dayDivSys = chatDayDividerHtmlBeforeMessage(prev, m);
      var sysLine;
      if (
        m.groupSystemEvent === "members_added" &&
        m.groupSystemMembersAdded &&
        Array.isArray(m.groupSystemMembersAdded.members) &&
        m.groupSystemMembersAdded.members.length
      ) {
        var plMa = m.groupSystemMembersAdded;
        var actorMa = plMa.actorLabel != null && String(plMa.actorLabel).trim() ? String(plMa.actorLabel).trim() : "";
        var prefixHtmlMa = escapeHtml(actorMa || "Участник") + " добавил(а) в группу: ";
        var sepJoinMa = '<span class="chat-msg__group-system-sep">, </span>';
        var peerPartsMa = plMa.members.map(function (mem) {
          if (!mem || !mem.userId) return "";
          var uidM = String(mem.userId);
          var dispM = mem.displayName != null && String(mem.displayName).trim() ? String(mem.displayName).trim() : uidM;
          var tgM = mem.telegramUsername != null && String(mem.telegramUsername).trim() ? String(mem.telegramUsername).trim().replace(/^@/, "") : "";
          var innerM = escapeHtml(dispM);
          if (tgM) innerM += ' <span class="chat-msg__group-system-tg">@' + escapeHtml(tgM) + "</span>";
          return '<button type="button" class="chat-msg__group-system-peer chat-msg__name-btn" data-pm-id="' + escapeHtml(uidM) + '" data-pm-name="' + escapeHtml(dispM) + '">' + innerM + "</button>";
        }).filter(Boolean);
        sysLine = '<span class="chat-msg__group-system-prefix">' + prefixHtmlMa + "</span>" + peerPartsMa.join(sepJoinMa);
      } else {
        sysLine = escapeHtml(String(m.text || "").trim()) || "Событие в группе";
      }
      return dayDivSys + '<div class="chat-msg chat-msg--group-system" role="status"><div class="chat-msg__group-system-inner">' + sysLine + "</div></div>";
    }
    var sameUser = function (a, b) {
      if (!a || !b || a.from == null || a.from === "" || b.from == null || b.from === "") return false;
      return peerChatIdsEqual(a.from, b.from);
    };
    var isFirstInGroup = !prev || !sameUser(prev, m);
    var isLastInGroup = !next || !sameUser(next, m);
    var isOwn = !!(myIdRenderP && peerChatIdsEqual(m.from, myIdRenderP));
    var cls = isOwn ? "chat-msg chat-msg--own" : "chat-msg chat-msg--other";
    var dataAttrs = "";
    if (isOwn && pokerChatMessageHasPersistedId(m.id)) {
      dataAttrs = ' data-msg-id="' + escapeHtml(m.id) + '" data-msg-own="true"';
      if (!m.image && !m.voice && !m.document && (m.text != null)) dataAttrs += ' data-msg-text="' + escapeHtml(String(m.text || "")) + '"';
    } else if (!isOwn && pokerChatMessageHasPersistedId(m.id)) {
      dataAttrs = ' data-msg-id="' + escapeHtml(m.id) + '" data-msg-from="' + escapeHtml(m.from || "") + '" data-msg-from-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"';
    }
    if (m.__clientOptimistic) dataAttrs += ' data-optimistic="true"';
    var time = m.time ? new Date(m.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
    var text = chatMessageBodyHtml(m);
    var imgBlock = m.image ? '<img class="chat-msg__image" src="' + escapeHtml(pokerChatDisplayImageSrc(m.image)) + '" alt="Картинка"' + chatMsgImageAttrs(i, messages.length) + " />" : "";
    var editedBadge = m.edited ? '<span class="chat-msg__edited">(отредактировано)</span>' : "";
    var ticksEarlyP = personalReceiptHtmlInline(m, isOwn);
    var voiceOnlyP = chatMsgVoiceOnlyNoCaption(m);
    var voiceBlock = m.voice ? chatVoiceMessageHtml(m.voice, voiceOnlyP ? { footerToolbarHtml: '<span class="chat-msg__time">' + time + "</span>" + editedBadge + ticksEarlyP } : undefined) : "";
    var documentBlock = m.document ? chatDocumentBlockHtml(m.document, m.documentName || "document.pdf") : "";
    var replyBlock = m.replyTo ? '<div class="chat-msg__reply"><strong>' + escapeHtml(m.replyTo.fromName || "Игрок") + ':</strong> ' + escapeHtml(String(m.replyTo.text || "").slice(0, 80)) + (String(m.replyTo.text || "").length > 80 ? "…" : "") + '</div>' : "";
    var adminBadge = m.fromAdmin ? '<span class="chat-msg__admin">(админ)</span>' : "";
    var avatarEl = isLastInGroup ? (m.fromAvatar ? '<img class="chat-msg__avatar" src="' + escapeHtml(m.fromAvatar) + '" alt=""' + getChatMsgAvatarImgAttrs() + " />" : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + (m.fromName || "И")[0] + "</span>") : '<span class="chat-msg__avatar-spacer"></span>';
    var nameElP = "";
    if (!isOwn) {
      var nameStrP = escapeHtml(m.fromName || "Игрок");
      var statusLevelP = m.fromStatusLevel != null && m.fromStatusLevel !== "" ? pokerProfileStatusFishLevel(m.fromStatusLevel) : "";
      var levelStrP = chatProfileStatusLevelHtml(statusLevelP);
      var fishIconStrP = pokerProfileStatusFishIconHtml(statusLevelP, "chat-msg__status-fish");
      var verifiedStrP = chatPokerPlusVerifiedBadgeHtml(m.fromPokerPlusVerified);
      var respectValP = m.fromRespect !== undefined && m.fromRespect !== null ? (m.fromRespect === 0 ? "\u2014" : String(m.fromRespect)) : "\u2014";
      var respectClassP = "chat-msg__respect";
      if (m.fromRespect > 0) respectClassP += " chat-msg__respect--positive";
      else if (m.fromRespect < 0) respectClassP += " chat-msg__respect--negative";
      var respectDataAttrsP = m.from ? ' data-user-id="' + escapeHtml(m.from) + '" data-user-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"' : "";
      var metaLineTopP = '<div class="chat-msg__meta-line"><span class="chat-msg__name">' + nameStrP + "</span>" + verifiedStrP + levelStrP + fishIconStrP + "</div>";
      var respectPartP = '<span class="chat-msg__respect-row chat-msg__respect-inline"' + respectDataAttrsP + '><span class="' + respectClassP + '" title="Уважение в чате">Ув: ' + escapeHtml(respectValP) + "</span></span>";
      var metaLineRespectP = '<div class="chat-msg__meta-line chat-msg__meta-sub">' + respectPartP + "</div>";
      var pmAvatarAttrP = m.fromAvatar ? ' data-pm-avatar="' + escapeHtml(m.fromAvatar) + '"' : "";
      nameElP = '<div class="chat-msg__meta-stack"><button type="button" class="chat-msg__name-btn" data-pm-id="' + escapeHtml(m.from) + '" data-pm-name="' + escapeHtml(m.fromName || m.fromDtId || "Игрок") + '"' + pmAvatarAttrP + ">" + metaLineTopP + "</button>" + metaLineRespectP + "</div>";
    }
    var textBlock = (text || imgBlock || voiceBlock || documentBlock) ? '<div class="chat-msg__text">' + imgBlock + voiceBlock + documentBlock + text + '</div>' : "";
    var reactionsHtmlP = "";
    if (pokerChatMessageHasPersistedId(m.id) && m.reactions && typeof m.reactions === "object") {
      var emKeysP = [];
      for (var emp in m.reactions) if (Object.prototype.hasOwnProperty.call(m.reactions, emp) && Array.isArray(m.reactions[emp]) && m.reactions[emp].length > 0) emKeysP.push(emp);
      var pillsP = [];
      sortChatReactionEmojiKeys(emKeysP).forEach(function (empj) {
        var countP = m.reactions[empj].length;
        var iReactedP = myIdRenderP && m.reactions[empj].indexOf(myIdRenderP) >= 0;
        pillsP.push('<button type="button" class="chat-msg__reaction ' + (iReactedP ? 'chat-msg__reaction--mine' : '') + '" data-msg-id="' + escapeHtml(m.id) + '" data-emoji="' + escapeHtml(empj) + '" data-source="personal" data-with="' + escapeHtml(getChatWithUserId() || "") + '">' + escapeHtml(empj) + ' <span class="chat-msg__reaction-count">' + countP + '</span></button>');
      });
      reactionsHtmlP = pillsP.join("");
    }
    var reactionsRowP = pokerChatMessageHasPersistedId(m.id) ? '<div class="chat-msg__reactions-wrap"><span class="chat-msg__reactions">' + reactionsHtmlP + '</span></div>' : "";
    var metaBlockP = isFirstInGroup ? nameElP + adminBadge : "";
    var bodyClassP = "chat-msg__body" + (text && text.trim() ? " chat-msg__body--has-text" : "") + (isOwn && m.image ? " chat-msg__body--own-image" : "");
    var footerHtmlP = voiceOnlyP ? "" : '<div class="chat-msg__footer"><span class="chat-msg__time">' + time + '</span>' + editedBadge + ticksEarlyP + "</div>";
    var bodyMainClsP = "chat-msg__body-main" + (!textBlock ? " chat-msg__body-main--solo-footer" : "") + (m.image ? " chat-msg__body-main--with-image" : "") + (voiceOnlyP ? " chat-msg__body-main--voice-inline-time" : "");
    var bodyMainHtmlP = '<div class="' + bodyMainClsP + '">' + textBlock + footerHtmlP + "</div>";
    var dayDividerP = chatDayDividerHtmlBeforeMessage(prev, m);
    return dayDividerP + '<div class="' + cls + '"' + dataAttrs + '><div class="chat-msg__row">' + avatarEl + '<div class="' + bodyClassP + '"><div class="chat-msg__meta">' + metaBlockP + '</div>' + replyBlock + bodyMainHtmlP + reactionsRowP + '</div></div></div>';
  }).join("");
}
function renderLoadOlderButtonHtml(source) {
  var label = "Загрузить ещё";
  return '<div class="chat-load-older"><button type="button" class="chat-load-older__btn" data-chat-load-older="' + escapeHtml(source) + '">' + label + "</button></div>";
}

  return {
    buildGeneralMessagesBodyHtml: buildGeneralMessagesBodyHtml,
    buildPersonalMessagesBodyHtml: buildPersonalMessagesBodyHtml,
    renderLoadOlderButtonHtml: renderLoadOlderButtonHtml,
    getPersonalReceiptState: getPersonalReceiptState,
  };
}
