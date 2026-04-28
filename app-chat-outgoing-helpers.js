// Chat outgoing, optimistic and push-placeholder helpers.

function initChatOutgoingHelpers(opts) {
  opts = opts || {};
  var state = {
    optimisticGeneralPayload: null,
    optimisticPersonalPayload: null,
    failedGeneralPayload: null,
    failedPersonalPayloadByPeer: {},
    incomingPushGeneralPayload: null,
    incomingPushPersonalPayloadByPeer: {},
  };
  var tg = opts.tg || null;
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var resolveMyChatDisplayName = typeof opts.resolveMyChatDisplayName === "function" ? opts.resolveMyChatDisplayName : function () { return ""; };
  var getSendingGeneral = typeof opts.getSendingGeneral === "function" ? opts.getSendingGeneral : function () { return false; };
  var getSendingPrivate = typeof opts.getSendingPrivate === "function" ? opts.getSendingPrivate : function () { return false; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var sendGeneral = typeof opts.sendGeneral === "function" ? opts.sendGeneral : function () {};
  var sendMessage = typeof opts.sendMessage === "function" ? opts.sendMessage : function () {};

/** Пока POST в полёте, любая перезагрузка ленты с сервера снова рисует исходный список — без этого optimistic пропадает до ответа API. */
function chatCloneRetryPayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  var out = {
    text: payload.text != null ? String(payload.text) : "",
    image: payload.image || null,
    voice: payload.voice || null,
    document: payload.document ? {
      dataUrl: payload.document.dataUrl || "",
      fileName: payload.document.fileName || "document.pdf",
    } : null,
    replyTo: payload.replyTo ? Object.assign({}, payload.replyTo) : null,
    with: payload.with != null ? String(payload.with) : "",
  };
  return out;
}
function buildChatFailedActionsHtml(source) {
  var safeSource = escapeHtml(source || "");
  return '<div class="chat-msg__send-state"><span class="chat-msg__send-error">Не отправлено</span><button type="button" class="chat-msg__retry-btn" data-chat-retry="' + safeSource + '">Повторить</button></div>';
}
function attachFailedChatActions(node, source) {
  if (!node) return;
  node.classList.add("chat-msg--failed");
  node.setAttribute("data-send-failed", "true");
  var body = node.querySelector(".chat-msg__body");
  if (!body) return;
  var footer = body.querySelector(".chat-msg__footer");
  if (footer) {
    var ticks = footer.querySelector(".chat-msg__ticks");
    if (ticks && ticks.parentNode) ticks.parentNode.removeChild(ticks);
    var oldState = footer.querySelector(".chat-msg__send-state");
    if (oldState && oldState.parentNode) oldState.parentNode.removeChild(oldState);
    footer.insertAdjacentHTML("beforeend", buildChatFailedActionsHtml(source));
    return;
  }
  var bodyMain = body.querySelector(".chat-msg__body-main") || body;
  var oldStateWrap = body.querySelector(".chat-msg__send-state");
  if (oldStateWrap && oldStateWrap.parentNode) oldStateWrap.parentNode.removeChild(oldStateWrap);
  bodyMain.insertAdjacentHTML("beforeend", buildChatFailedActionsHtml(source));
}
function markLatestOptimisticMessageFailed(targetEl, source) {
  if (!targetEl || !targetEl.querySelectorAll) return null;
  var list = targetEl.querySelectorAll('[data-optimistic="true"]');
  if (!list || !list.length) return null;
  var node = list[list.length - 1];
  if (!node) return null;
  node.removeAttribute("data-optimistic");
  attachFailedChatActions(node, source);
  return node;
}
function retryFailedOutgoingChat(source) {
  var mode = source === "general" ? "general" : "personal";
  var payload = null;
  if (mode === "general") payload = chatCloneRetryPayload(state.failedGeneralPayload);
  else {
    var peerKey = getChatWithUserId() != null ? String(getChatWithUserId()) : "";
    payload = peerKey ? chatCloneRetryPayload(state.failedPersonalPayloadByPeer[peerKey]) : null;
  }
  if (!payload) {
    if (tg && tg.showAlert) tg.showAlert("Не удалось найти сообщение для повторной отправки");
    else if (typeof alert === "function") alert("Не удалось найти сообщение для повторной отправки");
    return;
  }
  if (mode === "general" && getGeneralMessagesEl()) {
    var failedGen = getGeneralMessagesEl().querySelector('[data-send-failed="true"]');
    if (failedGen && failedGen.parentNode) failedGen.parentNode.removeChild(failedGen);
    state.failedGeneralPayload = null;
    sendGeneral(payload);
    return;
  }
  if (mode === "personal" && getMessagesEl()) {
    var failedPm = getMessagesEl().querySelector('[data-send-failed="true"]');
    if (failedPm && failedPm.parentNode) failedPm.parentNode.removeChild(failedPm);
    if (payload.with) delete state.failedPersonalPayloadByPeer[payload.with];
    sendMessage(payload);
  }
}
function chatPushPlaceholderFromPayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  var bodyRaw = payload.body != null ? String(payload.body).trim() : "";
  if (!bodyRaw) return null;
  var senderLabel = "";
  var textRaw = bodyRaw;
  var colonIdx = bodyRaw.indexOf(": ");
  if (colonIdx > 0) {
    senderLabel = bodyRaw.slice(0, colonIdx).trim();
    textRaw = bodyRaw.slice(colonIdx + 2).trim();
  }
  if (!textRaw) textRaw = "Новое сообщение";
  return {
    id: "push_" + String(Date.now()) + "_" + Math.random().toString(36).slice(2, 8),
    fromName: senderLabel || "Игрок",
    text: textRaw,
    time: new Date().toISOString(),
    __pushPlaceholder: true,
  };
}
function mergeIncomingPushGeneralIntoMessages(messages) {
  messages = messages || [];
  var ph = state.incomingPushGeneralPayload;
  if (!ph) return messages;
  var phTime = ph.time ? new Date(ph.time).getTime() : 0;
  var hasReal = messages.some(function (m) {
    if (!m || m.__pushPlaceholder) return false;
    var mt = m.time ? new Date(m.time).getTime() : 0;
    if (ph.text && String(m.text || "").trim() !== String(ph.text || "").trim()) return false;
    if (ph.fromName && String(m.fromName || "").trim() !== String(ph.fromName || "").trim()) return false;
    return !isNaN(mt) && !isNaN(phTime) ? Math.abs(mt - phTime) < 180000 : true;
  });
  if (hasReal) {
    state.incomingPushGeneralPayload = null;
    return messages;
  }
  return messages.concat([ph]);
}
function mergeIncomingPushPersonalIntoMessages(messages, peerId) {
  messages = messages || [];
  var key = peerId != null ? String(peerId) : "";
  var ph = key ? state.incomingPushPersonalPayloadByPeer[key] : null;
  if (!ph) return messages;
  var phTime = ph.time ? new Date(ph.time).getTime() : 0;
  var hasReal = messages.some(function (m) {
    if (!m || m.__pushPlaceholder) return false;
    var mt = m.time ? new Date(m.time).getTime() : 0;
    if (ph.text && String(m.text || "").trim() !== String(ph.text || "").trim()) return false;
    if (ph.from && m.from && !peerChatIdsEqual(ph.from, m.from)) return false;
    return !isNaN(mt) && !isNaN(phTime) ? Math.abs(mt - phTime) < 180000 : true;
  });
  if (hasReal) {
    delete state.incomingPushPersonalPayloadByPeer[key];
    return messages;
  }
  return messages.concat([ph]);
}
function mergeOptimisticGeneralIntoMessages(messages) {
  messages = messages || [];
  if (!state.optimisticGeneralPayload || !getSendingGeneral()) return messages;
  if (state.optimisticGeneralPayload.__domAppended) return messages;
  var myId = resolveMyChatMemberId();
  if (!myId || !state.optimisticGeneralPayload.from || !peerChatIdsEqual(state.optimisticGeneralPayload.from, myId)) return messages;
  var og = state.optimisticGeneralPayload;
  var ogTime = new Date(og.time).getTime();
  if (isNaN(ogTime)) return messages;
  for (var iGen = messages.length - 1; iGen >= 0 && iGen >= messages.length - 35; iGen--) {
    var mG = messages[iGen];
    if (!mG || mG.from == null || mG.from === "") continue;
    if (!peerChatIdsEqual(mG.from, myId)) continue;
    var mt = mG.time ? new Date(mG.time).getTime() : 0;
    if (mt < ogTime - 4000) continue;
    if (og.text && String(mG.text || "").trim() === String(og.text || "").trim()) return messages;
    if (og.image && mG.image && Math.abs(mt - ogTime) < 180000) return messages;
    if (og.voice && mG.voice && Math.abs(mt - ogTime) < 180000) return messages;
    if (og.document && mG.document && Math.abs(mt - ogTime) < 180000) return messages;
  }
  var synG = {
    from: og.from,
    fromName: resolveMyChatDisplayName() || "Вы",
    text: og.text || "",
    time: og.time,
    __clientOptimistic: true,
  };
  if (og.image) synG.image = og.image;
  if (og.voice) synG.voice = og.voice;
  if (og.document && og.document.dataUrl) {
    synG.document = og.document.dataUrl;
    synG.documentName = og.document.fileName || "document.pdf";
  }
  if (og.replyTo) synG.replyTo = og.replyTo;
  return messages.concat([synG]);
}
function mergeOptimisticPersonalIntoMessages(messages) {
  messages = messages || [];
  if (!state.optimisticPersonalPayload || !getSendingPrivate()) return messages;
  var myIdP = resolveMyChatMemberId();
  if (!myIdP || !state.optimisticPersonalPayload.from || !peerChatIdsEqual(state.optimisticPersonalPayload.from, myIdP)) return messages;
  var ogp = state.optimisticPersonalPayload;
  var ogpTime = new Date(ogp.time).getTime();
  if (isNaN(ogpTime)) return messages;
  for (var iP = messages.length - 1; iP >= 0 && iP >= messages.length - 35; iP--) {
    var mP = messages[iP];
    if (!mP || mP.from == null || mP.from === "") continue;
    if (!peerChatIdsEqual(mP.from, myIdP)) continue;
    var mpt = mP.time ? new Date(mP.time).getTime() : 0;
    if (mpt < ogpTime - 4000) continue;
    if (ogp.text && String(mP.text || "").trim() === String(ogp.text || "").trim()) return messages;
    if (ogp.image && mP.image && Math.abs(mpt - ogpTime) < 180000) return messages;
    if (ogp.voice && mP.voice && Math.abs(mpt - ogpTime) < 180000) return messages;
    if (ogp.document && mP.document && Math.abs(mpt - ogpTime) < 180000) return messages;
  }
  var synP = {
    from: ogp.from,
    fromName: resolveMyChatDisplayName() || "Вы",
    text: ogp.text || "",
    time: ogp.time,
    __clientOptimistic: true,
  };
  if (ogp.image) synP.image = ogp.image;
  if (ogp.voice) synP.voice = ogp.voice;
  if (ogp.document && ogp.document.dataUrl) {
    synP.document = ogp.document.dataUrl;
    synP.documentName = ogp.document.fileName || "document.pdf";
  }
  if (ogp.replyTo) synP.replyTo = ogp.replyTo;
  return messages.concat([synP]);
}
function dedupeGeneralMessagesForRender(messages) {
  messages = Array.isArray(messages) ? messages : [];
  var out = [];
  var seenId = Object.create(null);
  var myId = resolveMyChatMemberId();
  for (var i = 0; i < messages.length; i++) {
    var m = messages[i];
    if (!m) continue;
    var persistedId = pokerChatMessageHasPersistedId(m.id) ? String(m.id) : "";
    if (persistedId) {
      var optimisticDupIdx = -1;
      var persistedDupIdx = -1;
      var mtPersisted = m.time ? new Date(m.time).getTime() : NaN;
      for (var oi = out.length - 1; oi >= 0 && oi >= out.length - 12; oi--) {
        var prevOpt = out[oi];
        if (!prevOpt || !peerChatIdsEqual(prevOpt.from || "", m.from || "")) continue;
        var optTime = prevOpt.time ? new Date(prevOpt.time).getTime() : NaN;
        var sameTextPersisted = String(prevOpt.text || "").trim() === String(m.text || "").trim();
        var sameKindPersisted =
          (!!prevOpt.image === !!m.image) &&
          (!!prevOpt.voice === !!m.voice) &&
          (!!prevOpt.document === !!m.document);
        var sameReplyPersisted =
          String((prevOpt.replyTo && prevOpt.replyTo.id) || "") === String((m.replyTo && m.replyTo.id) || "");
        var closePersisted = !isNaN(mtPersisted) && !isNaN(optTime) ? Math.abs(mtPersisted - optTime) < 15000 : sameTextPersisted;
        if (!(sameTextPersisted && sameKindPersisted && sameReplyPersisted && closePersisted)) continue;
        if (pokerChatMessageHasPersistedId(prevOpt.id)) {
          persistedDupIdx = oi;
          break;
        }
        optimisticDupIdx = oi;
        break;
      }
      if (persistedDupIdx >= 0) {
        var prevPersisted = out[persistedDupIdx];
        var prevPersistedTime = prevPersisted && prevPersisted.time ? new Date(prevPersisted.time).getTime() : NaN;
        var closeOwnPersisted =
          peerChatIdsEqual(prevPersisted && prevPersisted.from || "", myId || "") &&
          !isNaN(mtPersisted) &&
          !isNaN(prevPersistedTime) &&
          Math.abs(mtPersisted - prevPersistedTime) < 4000;
        if (closeOwnPersisted) {
          out[persistedDupIdx] = m;
          seenId[persistedId] = true;
          continue;
        }
      }
      if (optimisticDupIdx >= 0) out.splice(optimisticDupIdx, 1);
      if (seenId[persistedId]) continue;
      seenId[persistedId] = true;
      out.push(m);
      continue;
    }
    var duplicateIdx = -1;
    var mt = m.time ? new Date(m.time).getTime() : NaN;
    for (var j = out.length - 1; j >= 0 && j >= out.length - 12; j--) {
      var prev = out[j];
      if (!prev || pokerChatMessageHasPersistedId(prev.id)) continue;
      if (!peerChatIdsEqual(prev.from || "", m.from || "")) continue;
      var pmt = prev.time ? new Date(prev.time).getTime() : NaN;
      var sameText = String(prev.text || "").trim() === String(m.text || "").trim();
      var sameKind =
        (!!prev.image === !!m.image) &&
        (!!prev.voice === !!m.voice) &&
        (!!prev.document === !!m.document);
      var sameReply =
        String((prev.replyTo && prev.replyTo.id) || "") === String((m.replyTo && m.replyTo.id) || "");
      var closeByTime = !isNaN(mt) && !isNaN(pmt) ? Math.abs(mt - pmt) < 5000 : sameText;
      if (sameText && sameKind && sameReply && closeByTime) {
        duplicateIdx = j;
        break;
      }
    }
    if (duplicateIdx >= 0) {
      var prevMsg = out[duplicateIdx];
      if (prevMsg.__clientOptimistic && !m.__clientOptimistic) out[duplicateIdx] = m;
      continue;
    }
    out.push(m);
  }
  return out;
}
function dedupePersonalMessagesForRender(messages) {
  messages = Array.isArray(messages) ? messages : [];
  var out = [];
  var seenId = Object.create(null);
  for (var i = 0; i < messages.length; i++) {
    var m = messages[i];
    if (!m) continue;
    var persistedId = pokerChatMessageHasPersistedId(m.id) ? String(m.id) : "";
    if (persistedId) {
      var optimisticDupIdx = -1;
      var persistedDupIdx = -1;
      var mtPersisted = m.time ? new Date(m.time).getTime() : NaN;
      for (var oi = out.length - 1; oi >= 0 && oi >= out.length - 12; oi--) {
        var prevOpt = out[oi];
        if (!prevOpt || !peerChatIdsEqual(prevOpt.from || "", m.from || "")) continue;
        var optTime = prevOpt.time ? new Date(prevOpt.time).getTime() : NaN;
        var sameTextPersisted = String(prevOpt.text || "").trim() === String(m.text || "").trim();
        var sameKindPersisted =
          (!!prevOpt.image === !!m.image) &&
          (!!prevOpt.voice === !!m.voice) &&
          (!!prevOpt.document === !!m.document);
        var sameReplyPersisted =
          String((prevOpt.replyTo && prevOpt.replyTo.id) || "") === String((m.replyTo && m.replyTo.id) || "");
        var closePersisted = !isNaN(mtPersisted) && !isNaN(optTime) ? Math.abs(mtPersisted - optTime) < 15000 : sameTextPersisted;
        if (!(sameTextPersisted && sameKindPersisted && sameReplyPersisted && closePersisted)) continue;
        if (pokerChatMessageHasPersistedId(prevOpt.id)) {
          persistedDupIdx = oi;
          break;
        }
        optimisticDupIdx = oi;
        break;
      }
      if (persistedDupIdx >= 0) {
        var prevPersisted = out[persistedDupIdx];
        var prevPersistedTime = prevPersisted && prevPersisted.time ? new Date(prevPersisted.time).getTime() : NaN;
        var closeOwnPersisted =
          peerChatIdsEqual(prevPersisted && prevPersisted.from || "", resolveMyChatMemberId() || "") &&
          !isNaN(mtPersisted) &&
          !isNaN(prevPersistedTime) &&
          Math.abs(mtPersisted - prevPersistedTime) < 4000;
        if (closeOwnPersisted) {
          out[persistedDupIdx] = m;
          seenId[persistedId] = true;
          continue;
        }
      }
      if (optimisticDupIdx >= 0) out.splice(optimisticDupIdx, 1);
      if (seenId[persistedId]) continue;
      seenId[persistedId] = true;
      out.push(m);
      continue;
    }
    var duplicateIdx = -1;
    var mt = m.time ? new Date(m.time).getTime() : NaN;
    for (var j = out.length - 1; j >= 0 && j >= out.length - 12; j--) {
      var prev = out[j];
      if (!prev || pokerChatMessageHasPersistedId(prev.id)) continue;
      if (!peerChatIdsEqual(prev.from || "", m.from || "")) continue;
      var pmt = prev.time ? new Date(prev.time).getTime() : NaN;
      var sameText = String(prev.text || "").trim() === String(m.text || "").trim();
      var sameKind =
        (!!prev.image === !!m.image) &&
        (!!prev.voice === !!m.voice) &&
        (!!prev.document === !!m.document);
      var sameReply =
        String((prev.replyTo && prev.replyTo.id) || "") === String((m.replyTo && m.replyTo.id) || "");
      var closeByTime = !isNaN(mt) && !isNaN(pmt) ? Math.abs(mt - pmt) < 5000 : sameText;
      if (sameText && sameKind && sameReply && closeByTime) {
        duplicateIdx = j;
        break;
      }
    }
    if (duplicateIdx >= 0) {
      var prevMsg = out[duplicateIdx];
      if (prevMsg.__clientOptimistic && !m.__clientOptimistic) out[duplicateIdx] = m;
      continue;
    }
    out.push(m);
  }
  return out;
}

  return {
    state: state,
    chatCloneRetryPayload: chatCloneRetryPayload,
    buildChatFailedActionsHtml: buildChatFailedActionsHtml,
    attachFailedChatActions: attachFailedChatActions,
    markLatestOptimisticMessageFailed: markLatestOptimisticMessageFailed,
    retryFailedOutgoingChat: retryFailedOutgoingChat,
    chatPushPlaceholderFromPayload: chatPushPlaceholderFromPayload,
    mergeIncomingPushGeneralIntoMessages: mergeIncomingPushGeneralIntoMessages,
    mergeIncomingPushPersonalIntoMessages: mergeIncomingPushPersonalIntoMessages,
    mergeOptimisticGeneralIntoMessages: mergeOptimisticGeneralIntoMessages,
    mergeOptimisticPersonalIntoMessages: mergeOptimisticPersonalIntoMessages,
    dedupeGeneralMessagesForRender: dedupeGeneralMessagesForRender,
    dedupePersonalMessagesForRender: dedupePersonalMessagesForRender,
  };
}
