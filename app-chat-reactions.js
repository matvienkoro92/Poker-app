// Chat reactions, edit/delete cache patch helpers and reaction picker wiring.

function initChatReactionHandlers(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function (prefix) { return prefix || "?"; };
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (body) { return body || {}; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var sortChatReactionEmojiKeys = typeof opts.sortChatReactionEmojiKeys === "function" ? opts.sortChatReactionEmojiKeys : function (keys) { return keys || []; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return !!id; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getPersonalMessagesCache = typeof opts.getPersonalMessagesCache === "function" ? opts.getPersonalMessagesCache : function () { return {}; };
  var setLastGeneralMessagesSig = typeof opts.setLastGeneralMessagesSig === "function" ? opts.setLastGeneralMessagesSig : function () {};
  var setLastPersonalMessagesSig = typeof opts.setLastPersonalMessagesSig === "function" ? opts.setLastPersonalMessagesSig : function () {};
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var openConversation = typeof opts.openConversation === "function" ? opts.openConversation : function () {};
  var reactionPickerEl = document.getElementById("chatReactionPicker");
  var currentReactionPickerClose = null;

function buildChatReactionsPillsHtml(msgId, reactions, source, withIdForPersonal) {
  var myIdR = resolveMyChatMemberId();
  if (!msgId || !reactions || typeof reactions !== "object") return "";
  var keysR = [];
  for (var emK in reactions) {
    if (
      Object.prototype.hasOwnProperty.call(reactions, emK) &&
      Array.isArray(reactions[emK]) &&
      reactions[emK].length > 0
    ) {
      keysR.push(emK);
    }
  }
  var pillsR = [];
  sortChatReactionEmojiKeys(keysR).forEach(function (emR) {
    var countR = reactions[emR].length;
    var iReactedR = myIdR && reactions[emR].indexOf(myIdR) >= 0;
    var dataWithR = source === "personal" && withIdForPersonal ? ' data-with="' + escapeHtml(withIdForPersonal) + '"' : "";
    pillsR.push(
      '<button type="button" class="chat-msg__reaction ' + (iReactedR ? "chat-msg__reaction--mine" : "") + '" data-msg-id="' + escapeHtml(msgId) + '" data-emoji="' + escapeHtml(emR) + '" data-source="' + escapeHtml(source || "general") + '"' + dataWithR + ">" + escapeHtml(emR) + ' <span class="chat-msg__reaction-count">' + countR + "</span></button>"
    );
  });
  return pillsR.join("");
}

function syncChatMessageReactionsDom(msgEl, msgId, reactions, source, withIdForPersonal) {
  if (!msgEl || !msgId) return;
  var bodyR = msgEl.querySelector(".chat-msg__body");
  if (!bodyR) return;
  var innerR = buildChatReactionsPillsHtml(msgId, reactions || {}, source, withIdForPersonal);
  var wrapR = bodyR.querySelector(".chat-msg__reactions-wrap");
  if (!innerR) {
    if (wrapR) wrapR.remove();
    return;
  }
  if (!wrapR) {
    wrapR = document.createElement("div");
    wrapR.className = "chat-msg__reactions-wrap";
    wrapR.innerHTML = '<span class="chat-msg__reactions">' + innerR + "</span>";
    bodyR.appendChild(wrapR);
  } else {
    var spanR = wrapR.querySelector(".chat-msg__reactions");
    if (!spanR) wrapR.innerHTML = '<span class="chat-msg__reactions">' + innerR + "</span>";
    else spanR.innerHTML = innerR;
  }
}

function patchCachedMessageReactions(msgId, reactions, isGeneral) {
  var rClean = reactions && typeof reactions === "object" ? reactions : {};
  if (isGeneral && window._chatGeneralCache && Array.isArray(window._chatGeneralCache.messages)) {
    window._chatGeneralCache.messages.forEach(function (m) {
      if (m && m.id === msgId) m.reactions = rClean;
    });
  } else if (!isGeneral && getChatWithUserId()) {
    var personalMessagesCacheR = getPersonalMessagesCache();
    if (!personalMessagesCacheR[getChatWithUserId()] || !Array.isArray(personalMessagesCacheR[getChatWithUserId()])) return;
    personalMessagesCacheR[getChatWithUserId()].forEach(function (m) {
      if (m && m.id === msgId) m.reactions = rClean;
    });
  }
}

function patchCachedEditedMessage(msgId, newText, source, serverMessage) {
  if (!msgId) return false;
  var hit = false;
  var textSafe = newText != null ? String(newText) : "";
  if (source === "general" && window._chatGeneralCache && Array.isArray(window._chatGeneralCache.messages)) {
    window._chatGeneralCache.messages.forEach(function (m) {
      if (!m || String(m.id) !== String(msgId)) return;
      m.text = textSafe;
      m.edited = true;
      if (serverMessage && serverMessage.editedAt) m.editedAt = serverMessage.editedAt;
      hit = true;
    });
    return hit;
  }
  if (source === "personal" && getChatWithUserId()) {
    var personalMessagesCacheE = getPersonalMessagesCache();
    if (!personalMessagesCacheE[getChatWithUserId()] || !Array.isArray(personalMessagesCacheE[getChatWithUserId()])) return hit;
    personalMessagesCacheE[getChatWithUserId()].forEach(function (m) {
      if (!m || String(m.id) !== String(msgId)) return;
      m.text = textSafe;
      m.edited = true;
      if (serverMessage && serverMessage.editedAt) m.editedAt = serverMessage.editedAt;
      hit = true;
    });
  }
  return hit;
}

function patchCachedDeletedMessage(msgId, source) {
  if (!msgId) return false;
  if (source === "general" && window._chatGeneralCache && Array.isArray(window._chatGeneralCache.messages)) {
    var prevG = window._chatGeneralCache.messages.length;
    window._chatGeneralCache.messages = window._chatGeneralCache.messages.filter(function (m) {
      return !m || String(m.id) !== String(msgId);
    });
    return window._chatGeneralCache.messages.length !== prevG;
  }
  if (source === "personal" && getChatWithUserId()) {
    var personalMessagesCacheD = getPersonalMessagesCache();
    if (!personalMessagesCacheD[getChatWithUserId()] || !Array.isArray(personalMessagesCacheD[getChatWithUserId()])) return false;
    var prevP = personalMessagesCacheD[getChatWithUserId()].length;
    personalMessagesCacheD[getChatWithUserId()] = personalMessagesCacheD[getChatWithUserId()].filter(function (m) {
      return !m || String(m.id) !== String(msgId);
    });
    return personalMessagesCacheD[getChatWithUserId()].length !== prevP;
  }
  return false;
}

function chatMsgElById(root, msgId) {
  if (!root || !msgId) return null;
  var sel = '.chat-msg[data-msg-id="' + String(msgId).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"]';
  return root.querySelector(sel);
}

/** Мгновенный отклик UI до ответа сервера (toggle как на бэкенде). */
function optimisticToggleChatReaction(msgId, emoji, source, withId) {
  var myIdO = resolveMyChatMemberId();
  if (!myIdO || !msgId || !emoji) return;
  var rootO = source === "personal" ? getMessagesEl() : getGeneralMessagesEl();
  if (!rootO) return;
  var msgElO = chatMsgElById(rootO, msgId);
  if (!msgElO) return;
  var bodyO = msgElO.querySelector(".chat-msg__body");
  if (!bodyO) return;
  var wrapO = bodyO.querySelector(".chat-msg__reactions-wrap");
  var reactionsSpanO = wrapO && wrapO.querySelector(".chat-msg__reactions");
  var btnO = null;
  if (reactionsSpanO) {
    reactionsSpanO.querySelectorAll(".chat-msg__reaction").forEach(function (b) {
      if (b.dataset.emoji === emoji) btnO = b;
    });
  }
  if (!btnO) {
    if (!wrapO) {
      wrapO = document.createElement("div");
      wrapO.className = "chat-msg__reactions-wrap";
      wrapO.innerHTML = '<span class="chat-msg__reactions"></span>';
      bodyO.appendChild(wrapO);
      reactionsSpanO = wrapO.querySelector(".chat-msg__reactions");
    }
    btnO = document.createElement("button");
    btnO.type = "button";
    btnO.className = "chat-msg__reaction chat-msg__reaction--mine";
    btnO.setAttribute("data-msg-id", String(msgId));
    btnO.setAttribute("data-emoji", emoji);
    btnO.setAttribute("data-source", source || "general");
    if (source === "personal") {
      var wO = withId || getChatWithUserId() || "";
      if (wO) btnO.setAttribute("data-with", wO);
    }
    btnO.innerHTML = escapeHtml(emoji) + ' <span class="chat-msg__reaction-count">1</span>';
    reactionsSpanO.appendChild(btnO);
    return;
  }
  var countElO = btnO.querySelector(".chat-msg__reaction-count");
  var countO = countElO ? parseInt(countElO.textContent, 10) || 0 : 0;
  var hadMineO = btnO.classList.contains("chat-msg__reaction--mine");
  if (hadMineO) {
    if (countO <= 1) {
      btnO.remove();
      if (reactionsSpanO && reactionsSpanO.children.length === 0 && wrapO) wrapO.remove();
    } else {
      if (countElO) countElO.textContent = String(countO - 1);
      btnO.classList.remove("chat-msg__reaction--mine");
    }
  } else {
    if (countElO) countElO.textContent = String(countO + 1);
    btnO.classList.add("chat-msg__reaction--mine");
  }
}

function sendReaction(msgId, emoji, source, withId) {
  if (!msgId || !emoji || !pokerApiHasCredential()) return;
  if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
  optimisticToggleChatReaction(msgId, emoji, source, withId);
  var body = pokerApiAuthJsonBody({ action: "reaction", messageId: msgId, emoji: emoji });
  if (source === "personal" && withId) body.with = withId;
  fetch(base + "/api/chat", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var rootA = source === "personal" ? getMessagesEl() : getGeneralMessagesEl();
      var msgElA = rootA ? chatMsgElById(rootA, msgId) : null;
      var withP = source === "personal" ? (withId || getChatWithUserId() || "") : "";
      if (d && d.ok && d.message) {
        var rFix = d.message.reactions && typeof d.message.reactions === "object" ? d.message.reactions : {};
        patchCachedMessageReactions(msgId, rFix, source !== "personal");
        if (msgElA) syncChatMessageReactionsDom(msgElA, msgId, rFix, source || "general", withP);
        else {
          setLastGeneralMessagesSig(null);
          setLastPersonalMessagesSig(null);
          if (source === "general") loadGeneral();
          else loadMessages();
        }
        return;
      }
      if (d && d.ok) {
        setLastGeneralMessagesSig(null);
        setLastPersonalMessagesSig(null);
        if (source === "general") loadGeneral();
        else loadMessages();
        return;
      }
      setLastGeneralMessagesSig(null);
      setLastPersonalMessagesSig(null);
      if (source === "general") loadGeneral();
      else loadMessages();
    })
    .catch(function () {
      setLastGeneralMessagesSig(null);
      setLastPersonalMessagesSig(null);
      if (source === "general") loadGeneral();
      else loadMessages();
    });
}
function showReactionPicker(btn) {
  if (!reactionPickerEl) return;
  var rect = btn.getBoundingClientRect();
  reactionPickerEl.dataset.msgId = btn.dataset.msgId || "";
  reactionPickerEl.dataset.source = btn.dataset.source || "general";
  reactionPickerEl.dataset.with = btn.dataset.with || "";
  reactionPickerEl.style.left = rect.left + "px";
  reactionPickerEl.style.top = (rect.top - 8) + "px";
  reactionPickerEl.classList.remove("chat-reaction-picker--hidden");
  reactionPickerEl.setAttribute("aria-hidden", "false");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var h = reactionPickerEl.offsetHeight || 120;
      var w = reactionPickerEl.offsetWidth || 200;
      reactionPickerEl.style.top = Math.max(8, rect.top - h - 8) + "px";
      reactionPickerEl.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - w - 8)) + "px";
    });
  });
  function closePicker(ev) {
    if (ev && ev.target && ev.target.closest && ev.target.closest(".chat-reaction-picker")) return;
    reactionPickerEl.classList.add("chat-reaction-picker--hidden");
    reactionPickerEl.setAttribute("aria-hidden", "true");
    document.removeEventListener("click", closePicker);
    currentReactionPickerClose = null;
  }
  currentReactionPickerClose = closePicker;
  setTimeout(function () {
    document.addEventListener("click", closePicker);
  }, 0);
}
document.body.addEventListener("click", function (e) {
  var reactionBtn = e.target && e.target.closest ? e.target.closest(".chat-msg__reaction") : null;
  var addReactBtn = e.target && e.target.closest ? e.target.closest(".chat-msg__react-btn") : null;
  var pickerEmoji = e.target && e.target.closest ? e.target.closest(".chat-reaction-picker__emoji") : null;
  if (reactionBtn) {
    e.preventDefault();
    sendReaction(reactionBtn.dataset.msgId, reactionBtn.dataset.emoji, reactionBtn.dataset.source || "general", reactionBtn.dataset.with || "");
  } else if (addReactBtn) {
    e.preventDefault();
    showReactionPicker(addReactBtn);
  } else if (pickerEmoji) {
    e.preventDefault();
    e.stopPropagation();
    var msgId = reactionPickerEl && reactionPickerEl.dataset.msgId;
    var source = reactionPickerEl && reactionPickerEl.dataset.source;
    var withId = reactionPickerEl && reactionPickerEl.dataset.with;
    if (msgId && pickerEmoji.dataset.emoji) {
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      sendReaction(msgId, pickerEmoji.dataset.emoji, source || "general", withId || "");
      if (currentReactionPickerClose) {
        currentReactionPickerClose();
      } else if (reactionPickerEl) {
        reactionPickerEl.classList.add("chat-reaction-picker--hidden");
        reactionPickerEl.setAttribute("aria-hidden", "true");
      }
    }
  }
});
document.body.addEventListener("click", function (e) {
  var idLink = e.target && e.target.closest ? e.target.closest(".chat-msg__id-link") : null;
  if (!idLink || !idLink.dataset || !idLink.dataset.appId) return;
  e.preventDefault();
  e.stopPropagation();
  var id = idLink.dataset.appId;
  if (!id || !/^ID\d{6}$/.test(id)) return;
  fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok && data.userId) {
        showConv(data.userId, data.userName || data.userId, data.p21Id);
        setTab("personal");
      } else {
        if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
      }
    })
    .catch(function () {
      if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
    });
});

  return {
    buildChatReactionsPillsHtml: buildChatReactionsPillsHtml,
    syncChatMessageReactionsDom: syncChatMessageReactionsDom,
    patchCachedMessageReactions: patchCachedMessageReactions,
    patchCachedEditedMessage: patchCachedEditedMessage,
    patchCachedDeletedMessage: patchCachedDeletedMessage,
    chatMsgElById: chatMsgElById,
    optimisticToggleChatReaction: optimisticToggleChatReaction,
    sendReaction: sendReaction,
    showReactionPicker: showReactionPicker,
  };
}
