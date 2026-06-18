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
  } catch (eFriendCount) {}
  return true;
}
window.pokerRemoveFriendFromOpenFriendsList = pokerRemoveFriendFromOpenFriendsList;

function initProfileFriends() {
  var btn = document.getElementById("profileFriendsBtn");
  var modal = document.getElementById("friendsListModal");
  var listEl = document.getElementById("friendsListModalList");
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
      })
      .catch(function () {
        listEl.innerHTML = '<p class="friends-list-modal__empty">' + esc(POKER_NET_ERR) + "</p>";
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
}
