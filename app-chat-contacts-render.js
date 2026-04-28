function chatContactsRenderSetTextContentIfChanged(el, txt) {
  if (!el) return;
  var next = txt != null ? String(txt) : "";
  if (el.textContent !== next) el.textContent = next;
}

function syncChatContactStatusMeta(btn, level, isVerified) {
  if (!btn || !btn.querySelector) return;
  var nameLineEl = btn.querySelector(".chat-contact__name-line");
  if (!nameLineEl) return;
  var labelEl =
    nameLineEl.querySelector(".chat-contact__label--primary") ||
    nameLineEl.querySelector(".chat-contact__label");
  var verifiedEl = nameLineEl.querySelector(".chat-contact__verified");
  if (verifiedEl) {
    verifiedEl.classList.toggle("chat-contact__verified--hidden", !isVerified);
    if (labelEl && verifiedEl.previousSibling !== labelEl) {
      nameLineEl.insertBefore(verifiedEl, labelEl.nextSibling);
    }
  }
  var statusLevel = level != null && level !== "" ? pokerProfileStatusFishLevel(level) : 0;
  var levelEl = nameLineEl.querySelector(".chat-contact__status-level");
  var fishEl = nameLineEl.querySelector(".chat-contact__status-fish");
  if (statusLevel) {
    if (!levelEl) {
      levelEl = document.createElement("span");
      levelEl.className = "chat-contact__status-level";
    }
    levelEl.textContent = "Уровень: " + String(statusLevel);
    var levelAfter = verifiedEl || labelEl;
    if (levelAfter) nameLineEl.insertBefore(levelEl, levelAfter.nextSibling);
    else nameLineEl.appendChild(levelEl);
    if (!fishEl) {
      fishEl = document.createElement("img");
      fishEl.className = "profile-status-fish-inline chat-contact__status-fish";
      fishEl.alt = "";
      fishEl.setAttribute("aria-hidden", "true");
      fishEl.loading = "lazy";
      fishEl.decoding = "async";
    }
    fishEl.src = pokerProfileStatusFishSrc(statusLevel);
    fishEl.setAttribute("data-status-fish-level", String(statusLevel));
    nameLineEl.insertBefore(fishEl, levelEl.nextSibling);
    btn.dataset.chatStatusLevel = String(statusLevel);
  } else {
    if (levelEl && levelEl.parentNode) levelEl.parentNode.removeChild(levelEl);
    if (fishEl && fishEl.parentNode) fishEl.parentNode.removeChild(fishEl);
    try { delete btn.dataset.chatStatusLevel; } catch (eStatusDel) {}
    btn.removeAttribute("data-chat-status-level");
  }
}

function patchExistingContactsList(block, contactsForList, friendSet, pinOrderRender) {
  if (!block || !Array.isArray(contactsForList) || !contactsForList.length) return false;
  var wraps = block.querySelectorAll(".chat-contact-swipe");
  if (!wraps || !wraps.length || wraps.length !== contactsForList.length) return false;
  var existingById = Object.create(null);
  for (var wi = 0; wi < wraps.length; wi++) {
    var wrap = wraps[wi];
    var btn = wrap && wrap.querySelector ? wrap.querySelector(".chat-contact") : null;
    var id = btn && btn.dataset && btn.dataset.chatId ? String(btn.dataset.chatId) : "";
    if (!id || existingById[id]) return false;
    existingById[id] = wrap;
  }
  for (var ci = 0; ci < contactsForList.length; ci++) {
    var row = contactsForList[ci];
    if (!row || !row.id || !existingById[String(row.id)]) return false;
  }
  var frag = document.createDocumentFragment();
  contactsForList.forEach(function (c) {
    var wrap = existingById[String(c.id)];
    var btn = wrap && wrap.querySelector ? wrap.querySelector(".chat-contact") : null;
    if (!wrap || !btn) return;
    var isGroupRow = !!(c && c.isGroupChat);
    var isFriendContact = chatContactMatchesFriendSet(c, friendSet);
    var displayTitle = chatListRowDisplayTitle(c, friendSet);
    var effectiveAlias = chatListRowAlias(c, friendSet);
    var hasAlias = effectiveAlias !== "";
    var labelEl = btn.querySelector(".chat-contact__label");
    var primaryLabel = btn.querySelector(".chat-contact__label--primary");
    var nickEl = btn.querySelector(".chat-contact__friend-nick, .chat-contact__login-sub");
    var nextMainText = isGroupRow ? String(c.name || displayTitle || "") : String((hasAlias ? effectiveAlias : c.name) || displayTitle || "");
    if (primaryLabel) chatContactsRenderSetTextContentIfChanged(primaryLabel, nextMainText);
    else if (labelEl) chatContactsRenderSetTextContentIfChanged(labelEl, nextMainText);
    if (nickEl) chatContactsRenderSetTextContentIfChanged(nickEl, hasAlias ? String(c.name || "") : "");
    btn.setAttribute("data-chat-name", displayTitle);
    btn.setAttribute("data-chat-friend", isFriendContact ? "1" : "0");
    btn.setAttribute("data-chat-group", isGroupRow ? "1" : "0");
    btn.dataset.chatOnline = c.online ? "1" : "0";
    if (c.pokerPlusVerified) btn.dataset.chatVerified = "1";
    else {
      try { delete btn.dataset.chatVerified; } catch (eVerDel) {}
      btn.removeAttribute("data-chat-verified");
    }
    syncChatContactStatusMeta(btn, c.statusLevel, c.pokerPlusVerified);
    var onlineEl = btn.querySelector(".chat-contact__online");
    if (onlineEl) onlineEl.classList.toggle("chat-contact__online--visible", !isGroupRow && !!c.online);
    var unreadEl = btn.querySelector(".chat-contact__unread");
    var unreadCount = Math.max(0, Number(c.unreadCount) || 0);
    var needUnread = unreadCount > 0;
    var unreadText = unreadCount > 99 ? "99+" : String(unreadCount);
    if (unreadEl) {
      unreadEl.classList.toggle("chat-contact__unread--visible", needUnread);
      chatContactsRenderSetTextContentIfChanged(unreadEl, needUnread ? unreadText : "");
      unreadEl.setAttribute("aria-label", needUnread ? "Непрочитано: " + unreadText : "");
    }
    var isPinned = false;
    for (var pix = 0; pix < pinOrderRender.length; pix++) {
      if (peerChatIdsEqual(pinOrderRender[pix], c.id)) {
        isPinned = true;
        break;
      }
    }
    var pinIcon = btn.querySelector(".chat-contact__pin-icon");
    var pinRow = btn.querySelector(".chat-contact__name-pin-row");
    var labelBlock = btn.querySelector(".chat-contact__label-block");
    if (isPinned && !pinIcon && labelBlock) {
      if (!pinRow) {
        pinRow = document.createElement("span");
        pinRow.className = "chat-contact__name-pin-row";
        while (labelBlock.firstChild) pinRow.appendChild(labelBlock.firstChild);
        labelBlock.appendChild(pinRow);
      }
      var pinSpan = document.createElement("span");
      pinSpan.className = "chat-contact__pin-icon";
      pinSpan.setAttribute("aria-hidden", "true");
      pinSpan.setAttribute("title", "Закреплён");
      pinSpan.textContent = "\uD83D\uDCCC";
      pinRow.insertBefore(pinSpan, pinRow.firstChild || null);
    } else if (!isPinned && pinIcon && pinIcon.parentNode) {
      pinIcon.parentNode.removeChild(pinIcon);
    }
    var pinBtn = wrap.querySelector(".chat-contact-swipe__pin");
    if (pinBtn) {
      var pinLabel = isPinned ? "Открепить диалог" : "Закрепить диалог";
      pinBtn.classList.toggle("chat-contact-swipe__pin--unpin", isPinned);
      pinBtn.setAttribute("aria-label", pinLabel);
      pinBtn.setAttribute("title", pinLabel);
    }
    frag.appendChild(wrap);
  });
  block.appendChild(frag);
  return true;
}
