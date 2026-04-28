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

function buildChatContactRowHtml(c, friendSet, pinOrderRender, icons) {
  icons = icons || {};
  var chatSwipePinIconSvg = icons.pin || "";
  var chatSwipeUnpinIconSvg = icons.unpin || "";
  var firstChar = function (name) { return (name || "?").toString().replace(/^@/, "")[0] || "?"; };

  var isGroupRow = !!(c && c.isGroupChat);
  var isPinned = false;
  for (var pix = 0; pix < pinOrderRender.length; pix++) {
    if (peerChatIdsEqual(pinOrderRender[pix], c.id)) {
      isPinned = true;
      break;
    }
  }
  var isFriendContact = chatContactMatchesFriendSet(c, friendSet);
  var pinIcon = !isPinned
    ? ""
    : '<span class="chat-contact__pin-icon" aria-hidden="true" title="Закреплён">📌</span>';
  var swipePinAria = isPinned ? "Открепить диалог" : "Закрепить диалог";
  var swipePinBtnClass =
    "chat-contact-swipe__pin" + (isPinned ? " chat-contact-swipe__pin--unpin" : "");
  var roleClass = isGroupRow
    ? " chat-contact__role--group"
    : c.admin
      ? " chat-contact__role--admin"
      : isFriendContact
        ? " chat-contact__role--friend"
        : "";
  var roleInnerHtml;
  if (isGroupRow) {
    var mcN = c.memberCount != null ? Number(c.memberCount) : 0;
    roleInnerHtml =
      '<span class="chat-contact__group-kind">Общий чат</span>' +
      (mcN > 0
        ? '<span class="chat-contact__group-count">' + escapeHtml(String(mcN) + " уч.") + "</span>"
        : "");
  } else if (c.admin) {
    roleInnerHtml = escapeHtml("Админ");
  } else if (isFriendContact) {
    roleInnerHtml =
      '<span class="chat-contact__role-friend-icon" aria-hidden="true">\uD83D\uDC64</span>' +
      escapeHtml("Друг");
  } else {
    roleInnerHtml = escapeHtml("Игрок");
  }
  var onlineHtml = isGroupRow
    ? '<span class="chat-contact__online" aria-hidden="true"></span>'
    : '<span class="chat-contact__online' + (c.online ? ' chat-contact__online--visible' : '') + '" aria-label="онлайн">онлайн</span>';
  var unreadNum = c.unreadCount > 0 ? (c.unreadCount > 99 ? "99+" : String(c.unreadCount)) : "";
  var unreadBadge = '<span class="chat-contact__unread' + (c.unreadCount > 0 ? ' chat-contact__unread--visible' : '') + '" aria-label="' + (c.unreadCount > 0 ? 'Непрочитано: ' + (c.unreadCount > 99 ? '99+' : c.unreadCount) : '') + '">' + unreadNum + '</span>';
  var displayTitle = chatListRowDisplayTitle(c, friendSet);
  var effectiveAlias = chatListRowAlias(c, friendSet);
  var hasAlias = effectiveAlias !== "";
  var initial = isGroupRow ? "\uD83D\uDC65" : firstChar(displayTitle);
  var verifiedBadgeHtml = !isGroupRow
    ? '<span class="chat-contact__verified' +
      (c.pokerPlusVerified ? "" : " chat-contact__verified--hidden") +
      '" title="PokerPlus verified" aria-label="PokerPlus verified">✓</span>'
    : "";
  var statusLevelContactHtml = !isGroupRow ? chatContactStatusLevelHtml(c.statusLevel) : "";
  var fishContactHtml = !isGroupRow ? pokerProfileStatusFishIconHtml(c.statusLevel, "chat-contact__status-fish") : "";
  var nameBlockInner;
  if (isGroupRow) {
    nameBlockInner = '<span class="chat-contact__label">' + escapeHtml(displayTitle || c.name || c.id || "") + "</span>";
  } else if (isFriendContact) {
    if (hasAlias) {
      nameBlockInner =
        '<span class="chat-contact__name-stack chat-contact__name-stack--friend">' +
        '<span class="chat-contact__friend-name-nick">' +
        '<span class="chat-contact__name-line">' +
        '<span class="chat-contact__label chat-contact__label--primary">' +
        escapeHtml(effectiveAlias) +
        "</span>" +
        verifiedBadgeHtml +
        statusLevelContactHtml +
        fishContactHtml +
        "</span>" +
        '<span class="chat-contact__friend-nick">' +
        escapeHtml(pokerNormalizeLegacyAccountLabel(c.name || c.id || "")) +
        "</span></span></span>";
    } else {
      nameBlockInner =
        '<span class="chat-contact__name-line"><span class="chat-contact__label">' +
        escapeHtml(displayTitle || c.name || c.id || "") +
        "</span>" +
        verifiedBadgeHtml +
        statusLevelContactHtml +
        fishContactHtml +
        "</span>";
    }
  } else if (hasAlias) {
    nameBlockInner =
      '<span class="chat-contact__name-stack">' +
      '<span class="chat-contact__name-line">' +
      '<span class="chat-contact__label chat-contact__label--primary">' +
      escapeHtml(effectiveAlias) +
      "</span>" +
      verifiedBadgeHtml +
      statusLevelContactHtml +
      fishContactHtml +
      "</span>" +
      '<span class="chat-contact__login-sub">' +
      escapeHtml(pokerNormalizeLegacyAccountLabel(c.name || c.id || "")) +
      "</span></span>";
  } else {
    nameBlockInner =
      '<span class="chat-contact__name-line"><span class="chat-contact__label">' +
      escapeHtml(displayTitle || c.name || c.id || "") +
      "</span>" +
      verifiedBadgeHtml +
      statusLevelContactHtml +
      fishContactHtml +
      "</span>";
  }
  var avatarEl = isGroupRow
    ? c.avatar
      ? '<img class="chat-contact__avatar chat-contact__avatar--group" src="' +
        escapeHtml(c.avatar) +
        '" alt="" width="40" height="40" loading="lazy" decoding="async" />'
      : '<span class="chat-contact__avatar chat-contact__avatar--placeholder chat-contact__avatar--group" aria-hidden="true">\uD83D\uDC65</span>'
    : c.avatar
      ? '<img class="chat-contact__avatar" src="' +
        escapeHtml(c.avatar) +
        '" alt="" width="40" height="40" loading="lazy" decoding="async" />'
      : '<span class="chat-contact__avatar chat-contact__avatar--placeholder">' + initial + "</span>";
  var nameCellPart = pinIcon
    ? '<span class="chat-contact__name-pin-row">' + pinIcon + nameBlockInner + "</span>"
    : nameBlockInner;
  var innerBtn =
    '<button type="button" class="chat-contact" tabindex="-1" data-chat-id="' +
    escapeHtml(c.id) +
    '" data-chat-name="' +
    escapeHtml(displayTitle) +
    '" data-chat-friend="' +
    (isFriendContact ? "1" : "0") +
    '" data-chat-group="' +
    (isGroupRow ? "1" : "0") +
    '" data-chat-initial="' +
    escapeHtml(initial) +
    '" data-chat-online="' +
    (c.online ? "1" : "0") +
    '"' +
    (c.pokerPlusVerified ? ' data-chat-verified="1"' : "") +
    (c.statusLevel != null && c.statusLevel !== "" ? ' data-chat-status-level="' + escapeHtml(String(pokerProfileStatusFishLevel(c.statusLevel))) + '"' : "") +
    ">" +
    avatarEl +
    '<span class="chat-contact__label-wrap"><span class="chat-contact__label-block">' +
    nameCellPart +
    '<span class="chat-contact__role' +
    roleClass +
    '">' +
    roleInnerHtml +
    '</span></span><span class="chat-contact__right">' +
    onlineHtml +
    "</span></span>" +
    unreadBadge +
    "</button>";
  if (isGroupRow) {
    return (
      '<div class="chat-contact-swipe chat-contact-swipe--group">' +
      '<div class="chat-contact-swipe__actions" aria-hidden="true">' +
      '<button type="button" class="' +
      swipePinBtnClass +
      '" tabindex="-1" data-chat-swipe-pin="1" aria-label="' +
      escapeHtml(swipePinAria) +
      '" title="' +
      escapeHtml(swipePinAria) +
      '"><span class="chat-contact-swipe__pin-icon" aria-hidden="true">' +
      (isPinned ? chatSwipeUnpinIconSvg : chatSwipePinIconSvg) +
      "</span></button>" +
      "</div>" +
      '<div class="chat-contact-swipe__panel">' +
      innerBtn +
      "</div></div>"
    );
  }
  var swipeFriendBtn = isFriendContact
    ? '<button type="button" class="chat-contact-swipe__friend chat-contact-swipe__friend--remove" tabindex="-1" data-chat-swipe-remove-friend="1" aria-label="Удалить из друзей" title="Удалить из друзей"><span class="chat-contact-swipe__friend-icon" aria-hidden="true">−</span></button>'
    : '<button type="button" class="chat-contact-swipe__friend" tabindex="-1" data-chat-swipe-add-friend="1" aria-label="В друзья" title="В друзья"><span class="chat-contact-swipe__friend-icon" aria-hidden="true">+</span></button>';
  var swipeWrapClass = "chat-contact-swipe chat-contact-swipe--wide-actions";
  return (
    '<div class="' +
    swipeWrapClass +
    '">' +
    '<div class="chat-contact-swipe__actions" aria-hidden="true">' +
    '<button type="button" class="' +
    swipePinBtnClass +
    '" tabindex="-1" data-chat-swipe-pin="1" aria-label="' +
    escapeHtml(swipePinAria) +
    '" title="' +
    escapeHtml(swipePinAria) +
    '"><span class="chat-contact-swipe__pin-icon" aria-hidden="true">' +
    (isPinned ? chatSwipeUnpinIconSvg : chatSwipePinIconSvg) +
    "</span></button>" +
    swipeFriendBtn +
    "</div>" +
    '<div class="chat-contact-swipe__panel">' +
    innerBtn +
    "</div></div>"
  );
}
