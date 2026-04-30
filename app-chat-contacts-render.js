function chatContactsRenderEscapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function chatContactsNormalizeLegacyLabel(value) {
  if (typeof pokerNormalizeLegacyAccountLabel === "function") return pokerNormalizeLegacyAccountLabel(value);
  var raw = value != null ? String(value).trim() : "";
  if (!raw) return "";
  if (/^(tg|vk)_ID\d{6}$/.test(raw)) return raw.slice(3);
  if (/^mail_ID\d{6}$/.test(raw)) return raw.slice(5);
  return raw;
}

function chatContactsStatusFishLevel(level) {
  if (typeof pokerProfileStatusFishLevel === "function") return pokerProfileStatusFishLevel(level);
  var n = Math.max(0, Math.floor(Number(level) || 0));
  if (!n) return 0;
  return Math.max(1, Math.min(55, n));
}

function chatContactsStatusFishIconHtml(level, extraClass) {
  if (typeof pokerProfileStatusFishIconHtml === "function") return pokerProfileStatusFishIconHtml(level, extraClass);
  return "";
}

function chatContactsIdsEqual(a, b) {
  if (typeof peerChatIdsEqual === "function") return peerChatIdsEqual(a, b);
  if (!a || !b) return false;
  var norm = function (raw) {
    var s = String(raw || "").trim();
    if (!s) return "";
    if (s.indexOf("group_") === 0 || s.indexOf("tg_") === 0 || s.indexOf("vk_") === 0 || s.indexOf("guest_") === 0) return s;
    if (/^\d+$/.test(s)) return "tg_" + s;
    return "tg_" + s;
  };
  return norm(a) === norm(b);
}

function chatContactsMatchesFriendSet(c, friendSet) {
  if (typeof chatContactMatchesFriendSet === "function") return chatContactMatchesFriendSet(c, friendSet);
  if (!c || c.isGroupChat || !friendSet) return false;
  var keys = [c.id, c.dtId, c.accountId, c.userId, c.chatUserId, c.__friendAccountId];
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] != null && keys[i] !== "" && friendSet[String(keys[i])]) return true;
  }
  return false;
}

function chatContactsRowAlias(c, friendSet) {
  if (typeof chatListRowAlias === "function") return chatListRowAlias(c, friendSet);
  if (!chatContactsMatchesFriendSet(c, friendSet) || !c) return "";
  var alias = c.contactName != null && String(c.contactName).trim() ? String(c.contactName).trim() : "";
  if (!alias) return "";
  return chatContactsNormalizeLegacyLabel(alias);
}

function chatContactsRowDisplayTitle(c, friendSet) {
  if (typeof chatListRowDisplayTitle === "function") return chatListRowDisplayTitle(c, friendSet);
  var alias = chatContactsRowAlias(c, friendSet);
  return alias || chatContactsNormalizeLegacyLabel(c && c.name ? c.name : c && c.id ? c.id : "");
}

function chatContactStatusLevelHtml(level) {
  if (level == null || level === "") return "";
  var statusLevel = chatContactsStatusFishLevel(level);
  if (!statusLevel) return "";
  return '<span class="chat-contact__status-level">Уровень: ' + chatContactsRenderEscapeHtml(String(statusLevel)) + "</span>";
}

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
  var statusLevel = level != null && level !== "" ? chatContactsStatusFishLevel(level) : 0;
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
    if (typeof pokerProfileStatusFishSrc === "function") fishEl.src = pokerProfileStatusFishSrc(statusLevel);
    else fishEl.removeAttribute("src");
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

function syncChatContactAvatar(btn, c) {
  if (!btn || !c) return;
  var current = btn.querySelector(".chat-contact__avatar");
  var isGroupRow = !!c.isGroupChat;
  var avatar = c.avatar != null && String(c.avatar).trim() ? String(c.avatar).trim() : "";
  var initial = btn.dataset && btn.dataset.chatInitial ? btn.dataset.chatInitial : (isGroupRow ? "\uD83D\uDC65" : "?");
  if (avatar) {
    var img = current && current.tagName === "IMG" ? current : document.createElement("img");
    img.className = "chat-contact__avatar" + (isGroupRow ? " chat-contact__avatar--group" : "");
    if (img.getAttribute("src") !== avatar) img.setAttribute("src", avatar);
    img.alt = "";
    img.width = 40;
    img.height = 40;
    img.loading = "lazy";
    img.decoding = "async";
    img.onerror = function () {
      var place = document.createElement("span");
      place.className = "chat-contact__avatar chat-contact__avatar--placeholder" + (isGroupRow ? " chat-contact__avatar--group" : "");
      place.textContent = initial;
      if (img.parentNode) img.parentNode.replaceChild(place, img);
    };
    if (current !== img) {
      if (current && current.parentNode) current.parentNode.replaceChild(img, current);
      else btn.insertBefore(img, btn.firstChild || null);
    }
    return;
  }
  if (!current || current.tagName !== "IMG") return;
  var fallback = document.createElement("span");
  fallback.className = "chat-contact__avatar chat-contact__avatar--placeholder" + (isGroupRow ? " chat-contact__avatar--group" : "");
  fallback.textContent = initial;
  if (current.parentNode) current.parentNode.replaceChild(fallback, current);
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
    var isFriendContact = chatContactsMatchesFriendSet(c, friendSet);
    var displayTitle = chatContactsRowDisplayTitle(c, friendSet);
    var effectiveAlias = chatContactsRowAlias(c, friendSet);
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
    syncChatContactAvatar(btn, c);
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
      if (chatContactsIdsEqual(pinOrderRender[pix], c.id)) {
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
  if (!c || c.id == null || String(c.id) === "") return "";
  for (var pix = 0; pix < pinOrderRender.length; pix++) {
    if (chatContactsIdsEqual(pinOrderRender[pix], c.id)) {
      isPinned = true;
      break;
    }
  }
  var isFriendContact = chatContactsMatchesFriendSet(c, friendSet);
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
        ? '<span class="chat-contact__group-count">' + chatContactsRenderEscapeHtml(String(mcN) + " уч.") + "</span>"
        : "");
  } else if (c.admin) {
    roleInnerHtml = chatContactsRenderEscapeHtml("Админ");
  } else if (isFriendContact) {
    roleInnerHtml =
      '<span class="chat-contact__role-friend-icon" aria-hidden="true">\uD83D\uDC64</span>' +
      chatContactsRenderEscapeHtml("Друг");
  } else {
    roleInnerHtml = chatContactsRenderEscapeHtml("Игрок");
  }
  var onlineHtml = isGroupRow
    ? '<span class="chat-contact__online" aria-hidden="true"></span>'
    : '<span class="chat-contact__online' + (c.online ? ' chat-contact__online--visible' : '') + '" aria-label="онлайн">онлайн</span>';
  var unreadNum = c.unreadCount > 0 ? (c.unreadCount > 99 ? "99+" : String(c.unreadCount)) : "";
  var unreadBadge = '<span class="chat-contact__unread' + (c.unreadCount > 0 ? ' chat-contact__unread--visible' : '') + '" aria-label="' + (c.unreadCount > 0 ? 'Непрочитано: ' + (c.unreadCount > 99 ? '99+' : c.unreadCount) : '') + '">' + unreadNum + '</span>';
  var displayTitle = chatContactsRowDisplayTitle(c, friendSet);
  var effectiveAlias = chatContactsRowAlias(c, friendSet);
  var hasAlias = effectiveAlias !== "";
  var initial = isGroupRow ? "\uD83D\uDC65" : firstChar(displayTitle);
  var verifiedBadgeHtml = !isGroupRow
    ? '<span class="chat-contact__verified' +
      (c.pokerPlusVerified ? "" : " chat-contact__verified--hidden") +
      '" title="PokerPlus verified" aria-label="PokerPlus verified">✓</span>'
    : "";
  var statusLevelContactHtml = !isGroupRow ? chatContactStatusLevelHtml(c.statusLevel) : "";
  var fishContactHtml = !isGroupRow ? chatContactsStatusFishIconHtml(c.statusLevel, "chat-contact__status-fish") : "";
  var nameBlockInner;
  if (isGroupRow) {
    nameBlockInner = '<span class="chat-contact__label">' + chatContactsRenderEscapeHtml(displayTitle || c.name || c.id || "") + "</span>";
  } else if (isFriendContact) {
    if (hasAlias) {
      nameBlockInner =
        '<span class="chat-contact__name-stack chat-contact__name-stack--friend">' +
        '<span class="chat-contact__friend-name-nick">' +
        '<span class="chat-contact__name-line">' +
        '<span class="chat-contact__label chat-contact__label--primary">' +
        chatContactsRenderEscapeHtml(effectiveAlias) +
        "</span>" +
        verifiedBadgeHtml +
        statusLevelContactHtml +
        fishContactHtml +
        "</span>" +
        '<span class="chat-contact__friend-nick">' +
        chatContactsRenderEscapeHtml(chatContactsNormalizeLegacyLabel(c.name || c.id || "")) +
        "</span></span></span>";
    } else {
      nameBlockInner =
        '<span class="chat-contact__name-line"><span class="chat-contact__label">' +
        chatContactsRenderEscapeHtml(displayTitle || c.name || c.id || "") +
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
      chatContactsRenderEscapeHtml(effectiveAlias) +
      "</span>" +
      verifiedBadgeHtml +
      statusLevelContactHtml +
      fishContactHtml +
      "</span>" +
      '<span class="chat-contact__login-sub">' +
      chatContactsRenderEscapeHtml(chatContactsNormalizeLegacyLabel(c.name || c.id || "")) +
      "</span></span>";
  } else {
    nameBlockInner =
      '<span class="chat-contact__name-line"><span class="chat-contact__label">' +
      chatContactsRenderEscapeHtml(displayTitle || c.name || c.id || "") +
      "</span>" +
      verifiedBadgeHtml +
      statusLevelContactHtml +
      fishContactHtml +
      "</span>";
  }
  var avatarEl = isGroupRow
    ? c.avatar
      ? '<img class="chat-contact__avatar chat-contact__avatar--group" src="' +
        chatContactsRenderEscapeHtml(c.avatar) +
        '" alt="" width="40" height="40" loading="lazy" decoding="async" />'
      : '<span class="chat-contact__avatar chat-contact__avatar--placeholder chat-contact__avatar--group" aria-hidden="true">\uD83D\uDC65</span>'
    : c.avatar
      ? '<img class="chat-contact__avatar" src="' +
        chatContactsRenderEscapeHtml(c.avatar) +
        '" alt="" width="40" height="40" loading="lazy" decoding="async" />'
      : '<span class="chat-contact__avatar chat-contact__avatar--placeholder">' + initial + "</span>";
  var nameCellPart = pinIcon
    ? '<span class="chat-contact__name-pin-row">' + pinIcon + nameBlockInner + "</span>"
    : nameBlockInner;
  var innerBtn =
    '<button type="button" class="chat-contact" tabindex="-1" data-chat-id="' +
    chatContactsRenderEscapeHtml(c.id) +
    '" data-chat-name="' +
    chatContactsRenderEscapeHtml(displayTitle) +
    '" data-chat-friend="' +
    (isFriendContact ? "1" : "0") +
    '" data-chat-group="' +
    (isGroupRow ? "1" : "0") +
    '" data-chat-initial="' +
    chatContactsRenderEscapeHtml(initial) +
    '" data-chat-online="' +
    (c.online ? "1" : "0") +
    '"' +
    (c.pokerPlusVerified ? ' data-chat-verified="1"' : "") +
    (c.statusLevel != null && c.statusLevel !== "" ? ' data-chat-status-level="' + chatContactsRenderEscapeHtml(String(chatContactsStatusFishLevel(c.statusLevel))) + '"' : "") +
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
      chatContactsRenderEscapeHtml(swipePinAria) +
      '" title="' +
      chatContactsRenderEscapeHtml(swipePinAria) +
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
    chatContactsRenderEscapeHtml(swipePinAria) +
    '" title="' +
    chatContactsRenderEscapeHtml(swipePinAria) +
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

function chatContactsRenderDefaultIcons() {
  return {
    pin:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>' +
      "</svg>",
    unpin:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>' +
      '<line x1="3.5" y1="3.5" x2="20.5" y2="20.5" stroke-width="2.35"/>' +
      "</svg>",
  };
}

function chatContactsSameList(existing, contactsForList, friendSet, pinOrderRender) {
  return existing.length === contactsForList.length && contactsForList.every(function (c, i) {
    var btn = existing[i];
    if (!btn || btn.dataset.chatId !== c.id) return false;
    if (!c || c.id == null) return false;
    var wantName = chatContactsRowDisplayTitle(c, friendSet);
    if ((btn.getAttribute("data-chat-name") || "") !== wantName) return false;
    var wantFriend = chatContactsMatchesFriendSet(c, friendSet);
    if ((btn.getAttribute("data-chat-friend") || "") !== (wantFriend ? "1" : "0")) return false;
    if ((btn.getAttribute("data-chat-group") || "") !== (c.isGroupChat ? "1" : "0")) return false;
    var wantStatusLevel = !c.isGroupChat && c.statusLevel != null && c.statusLevel !== "" ? String(chatContactsStatusFishLevel(c.statusLevel)) : "";
    if ((btn.getAttribute("data-chat-status-level") || "") !== wantStatusLevel) return false;
    if ((btn.getAttribute("data-chat-verified") || "") !== (c.pokerPlusVerified ? "1" : "")) return false;
    if (c.isGroupChat) {
      var imgG = btn.querySelector("img.chat-contact__avatar");
      var haveG = imgG && imgG.getAttribute("src") ? String(imgG.getAttribute("src")).slice(0, 160) : "";
      var wantG = c.avatar && String(c.avatar) ? String(c.avatar).slice(0, 160) : "";
      if (haveG !== wantG) return false;
    }
    var wantPinned = false;
    for (var pxi = 0; pxi < pinOrderRender.length; pxi++) {
      if (chatContactsIdsEqual(pinOrderRender[pxi], c.id)) {
        wantPinned = true;
        break;
      }
    }
    var havePinIcon = !!btn.querySelector(".chat-contact__pin-icon");
    if (wantPinned !== havePinIcon) return false;
    var wrapPin = btn.closest(".chat-contact-swipe");
    var pinActBtn = wrapPin && wrapPin.querySelector(".chat-contact-swipe__pin");
    if (!pinActBtn) return false;
    if (wantPinned !== pinActBtn.classList.contains("chat-contact-swipe__pin--unpin")) return false;
    return true;
  });
}

function chatContactsPatchSameList(existing, contactsForList) {
  contactsForList.forEach(function (c, i) {
    var btn = existing[i];
    if (!btn) return;
    btn.dataset.chatOnline = c.online ? "1" : "0";
    if (c.pokerPlusVerified) btn.dataset.chatVerified = "1";
    else try {
      delete btn.dataset.chatVerified;
    } catch (eVerD) {
      btn.removeAttribute("data-chat-verified");
    }
    var verEl = btn.querySelector(".chat-contact__verified");
    if (verEl) verEl.classList.toggle("chat-contact__verified--hidden", !c.pokerPlusVerified);
    if (!c.isGroupChat) syncChatContactStatusMeta(btn, c.statusLevel, c.pokerPlusVerified);
    var onEl = btn.querySelector(".chat-contact__online");
    if (onEl) {
      var nowVisible = !!c.online;
      if (onEl.classList.contains("chat-contact__online--visible") !== nowVisible) {
        onEl.classList.toggle("chat-contact__online--visible", nowVisible);
      }
    }
    var unreadEl = btn.querySelector(".chat-contact__unread");
    var needUnread = c.unreadCount > 0;
    var unreadText = c.unreadCount > 99 ? "99+" : String(c.unreadCount);
    if (unreadEl) {
      unreadEl.classList.toggle("chat-contact__unread--visible", needUnread);
      unreadEl.textContent = unreadText;
      unreadEl.setAttribute("aria-label", needUnread ? "Непрочитано: " + unreadText : "");
    }
  });
}

function chatContactsAttachAvatarFallbacks(contactsEl) {
  if (!contactsEl || !contactsEl.querySelectorAll) return;
  contactsEl.querySelectorAll(".chat-contact img.chat-contact__avatar").forEach(function (img) {
    img.onerror = function () {
      var contact = this.closest(".chat-contact");
      if (!contact) return;
      var initial = contact.dataset.chatInitial || "?";
      var place = document.createElement("span");
      place.className = "chat-contact__avatar chat-contact__avatar--placeholder";
      place.textContent = initial;
      if (this.parentNode) this.parentNode.replaceChild(place, this);
    };
  });
}

function renderChatContactsListDom(opts) {
  opts = opts || {};
  var contactsEl = opts.contactsEl;
  var contactsForList = opts.contactsForList;
  var friendSet = opts.friendSet || {};
  var forceRerender = !!opts.forceRerender;
  if (!contactsEl || !Array.isArray(contactsForList) || !contactsForList.length) return "";

  var block = contactsEl.querySelector(".chat-dialogs-block");
  var existing = block ? block.querySelectorAll(".chat-contact-swipe .chat-contact") : [];
  var pinsSnapForSameList = pokerLoadChatDialogListPins();

  if (!forceRerender && chatContactsSameList(existing, contactsForList, friendSet, pinsSnapForSameList) && existing.length > 0) {
    chatContactsPatchSameList(existing, contactsForList);
    return "updated";
  }

  if (!forceRerender && block && existing.length > 0 && patchExistingContactsList(block, contactsForList, friendSet, pinsSnapForSameList)) {
    return "patched";
  }

  var pinOrderRender = pokerLoadChatDialogListPins();
  var icons = chatContactsRenderDefaultIcons();
  var contactButtons = contactsForList.map(function (c) {
    try {
      return buildChatContactRowHtml(c, friendSet, pinOrderRender, icons);
    } catch (eBuildContact) {
      try {
        console.error("[chat] contact row render failed", {
          error: eBuildContact && eBuildContact.message ? eBuildContact.message : String(eBuildContact),
          contact: c && typeof c === "object" ? { id: c.id, name: c.name, isGroupChat: c.isGroupChat } : c,
        });
      } catch (eLogContact) {}
      return "";
    }
  }).filter(Boolean).join("");
  if (!contactButtons) return "";
  contactsEl.innerHTML =
    '<div class="chat-contacts-list-block"><div class="chat-dialogs-block">' +
    contactButtons +
    "</div></div>";
  chatContactsAttachAvatarFallbacks(contactsEl);
  return "rebuilt";
}

function pokerRenderChatContactsListResult(opts) {
  opts = opts || {};
  var contactsEl = opts.contactsEl;
  var contactsForList = Array.isArray(opts.contactsForList) ? opts.contactsForList : [];
  var friendSet = opts.friendSet || {};
  var showFriendsOnly = !!opts.showFriendsOnly;
  if (!contactsEl) return false;
  if (contactsForList.length === 0) {
    var emptyText = "Общайтесь в чате клуба, чтобы найти друзей, но помните, что за столом друзей нет.";
    if (showFriendsOnly) emptyText = "Здесь будут друзья, с которыми у вас уже есть личные диалоги.";
    contactsEl.innerHTML =
      '<div class="chat-contacts-list-block">' +
      '<p class="chat-empty">' + chatContactsRenderEscapeHtml(emptyText) + "</p>" +
      "</div>";
    if (typeof opts.updateDialogUnreadBadges === "function") opts.updateDialogUnreadBadges();
    if (typeof opts.updateChatNavDot === "function") opts.updateChatNavDot();
    return false;
  }
  var contactsRenderMode = renderChatContactsListDom({
    contactsEl: contactsEl,
    contactsForList: contactsForList,
    friendSet: friendSet,
    forceRerender: !!opts.forceRerender,
  });
  if (contactsRenderMode) {
    if (typeof opts.updateDialogUnreadBadges === "function") opts.updateDialogUnreadBadges();
    if (contactsRenderMode === "rebuilt" && typeof opts.attachDialogButtons === "function") {
      opts.attachDialogButtons();
    }
    if (typeof opts.updateChatNavDot === "function") opts.updateChatNavDot();
    return true;
  }
  return false;
}
