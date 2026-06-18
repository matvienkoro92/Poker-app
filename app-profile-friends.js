function pokerRemoveFriendFromOpenFriendsList(userId, chatUserId) {
  var listEl = document.getElementById("friendsListModalList");
  if (!listEl) return false;
  var ids = [userId, chatUserId].map(function (id) {
    return String(id || "").trim();
  }).filter(Boolean);
  if (!ids.length) return false;
  var removed = false;
  listEl.querySelectorAll('.friends-list-modal__item[data-section="friends"]').forEach(function (item) {
    var itemUserId = String(item.getAttribute("data-user-id") || "").trim();
    var itemChatUserId = String(item.getAttribute("data-chat-user-id") || "").trim();
    if (ids.indexOf(itemUserId) !== -1 || ids.indexOf(itemChatUserId) !== -1) {
      item.remove();
      removed = true;
    }
  });
  if (!removed) return false;
  var remaining = listEl.querySelectorAll('.friends-list-modal__item[data-section="friends"]').length;
  try {
    if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(remaining);
    if (typeof window.pokerRefreshProfileFriendsPreview === "function") window.pokerRefreshProfileFriendsPreview();
  } catch (eFriendCount) {}
  return true;
}
window.pokerRemoveFriendFromOpenFriendsList = pokerRemoveFriendFromOpenFriendsList;

var POKER_FRIENDS_UNREAD_KEY = "poker_profile_friends_unread_v1";
var POKER_FRIENDS_SEEN_KEY = "poker_profile_friends_seen_v1";

function pokerFriendsReadJson(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (eReadFriendsSeen) {
    return fallback;
  }
}

function pokerFriendsWriteJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value || {}));
  } catch (eWriteFriendsSeen) {}
}

function pokerFriendsRowId(row) {
  return String((row && (row.userId || row.chatUserId || row.id)) || "").trim();
}

function pokerFriendsUniqueSorted(ids) {
  var seen = {};
  var out = [];
  (Array.isArray(ids) ? ids : []).forEach(function (id) {
    var s = String(id || "").trim();
    if (!s || seen[s]) return;
    seen[s] = true;
    out.push(s);
  });
  return out.sort();
}

function pokerFriendsDataState(data) {
  var incoming = Array.isArray(data && data.incoming) ? data.incoming : [];
  var friends = Array.isArray(data && data.friends) ? data.friends : [];
  var notices = Array.isArray(data && data.notices) ? data.notices : [];
  return {
    incomingIds: pokerFriendsUniqueSorted(incoming.map(pokerFriendsRowId)),
    friendIds: pokerFriendsUniqueSorted(friends.map(pokerFriendsRowId)),
    acceptedNoticeIds: pokerFriendsUniqueSorted(notices.filter(function (row) {
      return row && row.status === "accepted";
    }).map(pokerFriendsRowId)),
  };
}

function pokerFriendsHasNewIncoming(state, seen) {
  var seenIncoming = {};
  ((seen && Array.isArray(seen.incomingIds)) ? seen.incomingIds : []).forEach(function (id) {
    seenIncoming[String(id || "").trim()] = true;
  });
  return (state.incomingIds || []).some(function (id) { return !seenIncoming[id]; });
}

function pokerReadFriendsUnreadFlag() {
  var raw = pokerFriendsReadJson(POKER_FRIENDS_UNREAD_KEY, null);
  return !!(raw && raw.unread);
}

function pokerWriteFriendsUnreadFlag(unread) {
  pokerFriendsWriteJson(POKER_FRIENDS_UNREAD_KEY, {
    unread: !!unread,
    updatedAt: new Date().toISOString(),
  });
}

function pokerApplyFriendsUnreadIndicators(unread) {
  var active = !!unread;
  try {
    var profileNav = document.querySelector('.bottom-nav__item[data-view-target="profile"]');
    if (profileNav) {
      profileNav.classList.toggle("bottom-nav__item--friends-unread", active);
      profileNav.setAttribute("data-friends-unread", active ? "1" : "0");
    }
  } catch (eNavUnread) {}
  try {
    var panel = document.getElementById("profileFriendsPanel");
    if (panel) panel.classList.toggle("profile-friends--unread", active);
    var btn = document.getElementById("profileFriendsBtn");
    if (btn) {
      btn.classList.toggle("profile-friends__btn--unread", active);
      btn.setAttribute("data-friends-unread", active ? "1" : "0");
    }
  } catch (ePanelUnread) {}
}

function pokerRefreshFriendsUnreadIndicators() {
  pokerApplyFriendsUnreadIndicators(pokerReadFriendsUnreadFlag());
}

function pokerUpdateFriendsUnreadFromData(data) {
  if (!data || !data.ok) return;
  var state = pokerFriendsDataState(data);
  var seen = pokerFriendsReadJson(POKER_FRIENDS_SEEN_KEY, null);
  var explicitNewFriend = state.acceptedNoticeIds.length > 0;
  var explicitIncoming = state.incomingIds.length > 0 && pokerFriendsHasNewIncoming(state, seen);
  if (!seen && !explicitIncoming && !explicitNewFriend) {
    pokerFriendsWriteJson(POKER_FRIENDS_SEEN_KEY, {
      incomingIds: state.incomingIds,
      friendIds: state.friendIds,
      seenAt: new Date().toISOString(),
    });
  }
  if (explicitIncoming || explicitNewFriend) pokerWriteFriendsUnreadFlag(true);
  pokerRefreshFriendsUnreadIndicators();
}

function pokerMarkFriendsSeen(data) {
  var state = pokerFriendsDataState(data || {});
  pokerFriendsWriteJson(POKER_FRIENDS_SEEN_KEY, {
    incomingIds: state.incomingIds,
    friendIds: state.friendIds,
    seenAt: new Date().toISOString(),
  });
  pokerWriteFriendsUnreadFlag(false);
  pokerRefreshFriendsUnreadIndicators();
}

window.pokerUpdateFriendsUnreadFromData = pokerUpdateFriendsUnreadFromData;
window.pokerMarkFriendsSeen = pokerMarkFriendsSeen;
window.pokerRefreshFriendsUnreadIndicators = pokerRefreshFriendsUnreadIndicators;

function initProfileFriends() {
  var btn = document.getElementById("profileFriendsBtn");
  var modal = document.getElementById("friendsListModal");
  var listEl = document.getElementById("friendsListModalList");
  var previewEl = document.getElementById("profileFriendsPreview");
  if (!btn || !modal || !listEl) return;
  if (btn.dataset.friendsBound) return;
  btn.dataset.friendsBound = "1";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function alertText(text) {
    if (tg && tg.showAlert) tg.showAlert(text);
    else if (typeof alert === "function") alert(text);
  }

  function closeFriendsModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("friends-list-modal--open");
  }

  function displayData(row) {
    row = row || {};
    var tgLine = row.userName || row.userId || "Игрок";
    var contact = row.contactName != null && String(row.contactName).trim() ? String(row.contactName).trim() : "";
    var modalName = contact ? contact : tgLine.indexOf("@") === 0 ? tgLine.slice(1) : tgLine;
    return { tgLine: tgLine, contact: contact, modalName: modalName };
  }

  function previewLevel(row) {
    var raw = row && (row.statusLevel != null ? row.statusLevel : row.level != null ? row.level : row.pokerPlusStatusLevel);
    var n = parseInt(String(raw == null ? 0 : raw), 10);
    if (!isFinite(n) || n < 0) n = 0;
    return Math.min(100, n);
  }

  function previewAvatar(row) {
    return String((row && (row.avatarUrl || row.avatar || row.photoUrl)) || "./assets/avatar-chip.jpg").trim() || "./assets/avatar-chip.jpg";
  }

  function inviteSlotHtml() {
    return (
      '<button type="button" class="profile-friends__invite" id="profileFriendsInviteBtn" aria-label="Пригласить друга">' +
      '<span class="profile-friends__invite-plus" aria-hidden="true">+</span>' +
      '<span class="profile-friends__invite-text">Пригласить<br>друга</span>' +
      "</button>"
    );
  }

  function wirePreviewButtons() {
    if (!previewEl) return;
    previewEl.querySelectorAll(".profile-friends__avatar-btn").forEach(function (avatarBtn) {
      avatarBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = avatarBtn.dataset.userId || "";
        var chatId = avatarBtn.dataset.chatUserId || "";
        var name = avatarBtn.dataset.userName || "Игрок";
        var avatar = avatarBtn.dataset.avatarUrl || "";
        if ((id || chatId) && typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(id || chatId, name, avatar);
        } else {
          btn.click();
        }
      });
    });
    previewEl.querySelectorAll(".profile-friends__invite").forEach(function (inviteBtn) {
      inviteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var refBtn = document.getElementById("clubReferralsOpenBtn");
        if (refBtn && typeof refBtn.click === "function") refBtn.click();
        else alertText("Откройте пригласительные ссылки в меню.");
      });
    });
  }

  function renderFriendsPreview(friends) {
    if (!previewEl) return;
    var rows = Array.isArray(friends) ? friends.slice(0, 3) : [];
    var html = rows.map(function (row) {
      var meta = displayData(row);
      var avatar = previewAvatar(row);
      var level = previewLevel(row);
      return (
        '<button type="button" class="profile-friends__avatar-btn" data-user-id="' + esc(row && row.userId || "") +
        '" data-chat-user-id="' + esc(row && row.chatUserId || "") +
        '" data-user-name="' + esc(meta.modalName) +
        '" data-avatar-url="' + esc(avatar) +
        '" aria-label="Открыть профиль ' + esc(meta.modalName) + '">' +
        '<span class="profile-friends__avatar-ring"><img src="' + esc(avatar) + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="profile-friends__level-badge">' + esc(level) + "</span>" +
        "</button>"
      );
    }).join("");
    previewEl.innerHTML = html + inviteSlotHtml();
    wirePreviewButtons();
  }

  function renderPreviewLoading() {
    if (!previewEl) return;
    previewEl.innerHTML =
      '<span class="profile-friends__avatar-skeleton"></span>' +
      '<span class="profile-friends__avatar-skeleton"></span>' +
      '<span class="profile-friends__avatar-skeleton"></span>' +
      inviteSlotHtml();
    wirePreviewButtons();
  }

  function renderRow(row, section, actionsHtml, noteHtml) {
    var meta = displayData(row);
    var htmlLabels = meta.contact
      ? '<span class="friends-list-modal__item-labels">' +
        '<span class="friends-list-modal__item-name">' + esc(meta.contact) + "</span>" +
        '<span class="friends-list-modal__item-login">' + esc(meta.tgLine) + "</span></span>"
      : '<span class="friends-list-modal__item-labels friends-list-modal__item-labels--single">' +
        '<span class="friends-list-modal__item-name">' + esc(meta.tgLine) + "</span>" +
        (noteHtml || "") +
        "</span>";
    return (
      '<div class="friends-list-modal__item" data-section="' + esc(section) +
      '" data-user-id="' + esc(row.userId || "") +
      '" data-chat-user-id="' + esc(row.chatUserId || "") +
      '" data-user-name="' + esc(meta.modalName) + '">' +
      htmlLabels +
      '<div class="friends-list-modal__item-actions">' + actionsHtml + "</div></div>"
    );
  }

  function renderSection(title, rows, section, renderer) {
    rows = Array.isArray(rows) ? rows : [];
    if (!rows.length) return "";
    return (
      '<section class="friends-list-modal__section" data-friends-section="' + esc(section) + '">' +
      '<h4 class="friends-list-modal__section-title">' + esc(title) + "</h4>" +
      rows.map(function (row) { return renderer(row); }).join("") +
      "</section>"
    );
  }

  function wireProfileButtons() {
    listEl.querySelectorAll(".friends-list-modal__btn--profile").forEach(function (profileBtn) {
      profileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = profileBtn.closest(".friends-list-modal__item");
        if (!item) return;
        var id = item.dataset.userId;
        var chatId = item.dataset.chatUserId || "";
        var name = item.dataset.userName;
        if ((id || chatId) && typeof window.openChatUserModalById === "function") {
          closeFriendsModal();
          window.openChatUserModalById(id || chatId, name);
        }
      });
    });
  }

  function afterMutate() {
    if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
    if (typeof window.chatRefresh === "function") window.chatRefresh();
    if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
    loadFriends();
  }

  function postFriendAction(targetUserId, action, button) {
    var base = getApiBase();
    if (!base || !targetUserId) return;
    if (button) button.disabled = true;
    fetch(base + "/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetUserId, action: action })),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok) {
          alertText(action === "accept" ? "Заявка принята" : "Заявка отклонена");
          afterMutate();
        } else {
          if (button) button.disabled = false;
          alertText((d && d.error) || "Ошибка");
        }
      })
      .catch(function () {
        if (button) button.disabled = false;
        alertText(POKER_NET_ERR);
      });
  }

  function deleteFriend(targetUserId, kind, button) {
    var base = getApiBase();
    if (!base || !targetUserId) return;
    var text = "Убрать этого человека из друзей?";
    var confirmed = typeof window.confirm === "function" ? window.confirm(text) : true;
    if (!confirmed) return;
    if (button) button.disabled = true;
    fetch(base + "/api/friends", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetUserId, list: kind })),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok) {
          if (typeof pokerRemoveLocalFriendFromChatContacts === "function") {
            pokerRemoveLocalFriendFromChatContacts(targetUserId);
          }
          afterMutate();
        } else {
          if (button) button.disabled = false;
          alertText((d && d.error) || "Ошибка");
        }
      })
      .catch(function () {
        if (button) button.disabled = false;
        alertText(POKER_NET_ERR);
      });
  }

  function wireActionButtons() {
    wireProfileButtons();
    listEl.querySelectorAll(".friends-list-modal__btn--accept").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        postFriendAction(item && item.dataset.userId, "accept", button);
      });
    });
    listEl.querySelectorAll(".friends-list-modal__btn--reject").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        postFriendAction(item && item.dataset.userId, "reject", button);
      });
    });
    listEl.querySelectorAll(".friends-list-modal__btn--remove").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        var kind = button.getAttribute("data-delete-kind") || "friends";
        deleteFriend(item && item.dataset.userId, kind, button);
      });
    });
  }

  function renderFriendsData(data) {
    var friends = Array.isArray(data && data.friends) ? data.friends : [];
    var incoming = Array.isArray(data && data.incoming) ? data.incoming : [];
    var outgoing = Array.isArray(data && data.outgoing) ? data.outgoing : [];
    var notices = Array.isArray(data && data.notices) ? data.notices : [];
    try {
      if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(friends.length);
    } catch (eFcModal) {}
    try { pokerUpdateFriendsUnreadFromData(data); } catch (eUnreadData) {}
    renderFriendsPreview(friends);
    var chunks = [];
    chunks.push(renderSection("Друзья", friends, "friends", function (row) {
      return renderRow(
        row,
        "friends",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>' +
          '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--remove" data-delete-kind="friends">Удалить из друзей</button>'
      );
    }));
    chunks.push(renderSection("Входящие заявки", incoming, "incoming", function (row) {
      return renderRow(
        row,
        "incoming",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--accept">Принять</button>' +
          '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--reject">Отклонить</button>'
      );
    }));
    chunks.push(renderSection("Исходящие заявки", outgoing, "outgoing", function (row) {
      return renderRow(
        row,
        "outgoing",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>' +
          '<span class="friends-list-modal__status">Ожидает ответа</span>'
      );
    }));
    chunks.push(renderSection("Ответы", notices, "notices", function (row) {
      var status = row && row.status === "accepted" ? "принял заявку" : "отклонил заявку";
      return renderRow(
        row,
        "notices",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>',
        '<span class="friends-list-modal__item-login">Игрок ' + esc(status) + "</span>"
      );
    }));
    var html = chunks.join("");
    listEl.innerHTML = html || '<p class="friends-list-modal__empty">Пока нет друзей и заявок</p>';
    wireActionButtons();
  }

  function loadFriends() {
    var base = getApiBase();
    if (!base) return;
    listEl.innerHTML = '<p class="friends-list-modal__loading">Загрузка...</p>';
    var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    fetch(base + "/api/friends" + fq)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok) {
          listEl.innerHTML = '<p class="friends-list-modal__empty">Ошибка загрузки</p>';
          try {
            if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
          } catch (eRe) {}
          return;
        }
        renderFriendsData(data);
        try { pokerMarkFriendsSeen(data); } catch (eSeenFriends) {}
      })
      .catch(function () {
        listEl.innerHTML = '<p class="friends-list-modal__empty">' + esc(POKER_NET_ERR) + "</p>";
      });
  }

  function loadFriendsPreview() {
    var base = getApiBase();
    if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
      try {
        if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(null);
      } catch (eNoCred) {}
      renderFriendsPreview([]);
      return;
    }
    renderPreviewLoading();
    var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    fetch(base + "/api/friends" + fq)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok) {
          renderFriendsPreview([]);
          return;
        }
        try { pokerUpdateFriendsUnreadFromData(data); } catch (ePreviewUnread) {}
        renderFriendsPreview(Array.isArray(data.friends) ? data.friends : []);
        try {
          if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(Array.isArray(data.friends) ? data.friends.length : 0);
        } catch (ePreviewCount) {}
      })
      .catch(function () {
        renderFriendsPreview([]);
      });
  }

  var backdrop = modal.querySelector(".friends-list-modal__backdrop");
  var closeBtn = modal.querySelector(".friends-list-modal__close");
  if (backdrop) backdrop.addEventListener("click", closeFriendsModal);
  if (closeBtn) closeBtn.addEventListener("click", closeFriendsModal);
  btn.addEventListener("click", function () {
    var base = getApiBase();
    if (!base) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
      alertText("Войдите в приложение (Telegram или PWA).");
      return;
    }
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("friends-list-modal--open");
    loadFriends();
  });

  window.pokerRefreshProfileFriendsPreview = loadFriendsPreview;
  window.pokerRenderProfileFriendsPreview = renderFriendsPreview;
  loadFriendsPreview();
}

pokerRefreshFriendsUnreadIndicators();
document.addEventListener("DOMContentLoaded", pokerRefreshFriendsUnreadIndicators);
