function pokerRemoveFriendFromOpenFriendsList(userId, chatUserId) {
  var listEl = document.getElementById("friendsListModalList");
  if (!listEl) return false;
  var ids = [userId, chatUserId].map(function (id) {
    return String(id || "").trim();
  }).filter(Boolean);
  if (!ids.length) return false;
  var removed = false;
  listEl.querySelectorAll(".friends-list-modal__item").forEach(function (item) {
    var itemUserId = String(item.getAttribute("data-user-id") || "").trim();
    var itemChatUserId = String(item.getAttribute("data-chat-user-id") || "").trim();
    if (ids.indexOf(itemUserId) !== -1 || ids.indexOf(itemChatUserId) !== -1) {
      item.remove();
      removed = true;
    }
  });
  if (!removed) return false;
  var remaining = listEl.querySelectorAll(".friends-list-modal__item").length;
  if (remaining === 0) {
    listEl.innerHTML = "<p class=\"friends-list-modal__empty\">Пока нет друзей</p>";
  }
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
  function closeFriendsModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("friends-list-modal--open");
  }
  var backdrop = modal.querySelector(".friends-list-modal__backdrop");
  var closeBtn = modal.querySelector(".friends-list-modal__close");
  if (backdrop) backdrop.addEventListener("click", closeFriendsModal);
  if (closeBtn) closeBtn.addEventListener("click", closeFriendsModal);
  btn.addEventListener("click", function () {
    var base = getApiBase();
    if (!base) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    listEl.innerHTML = "<p class=\"friends-list-modal__loading\">Загрузка…</p>";
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("friends-list-modal--open");
    var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    fetch(base + "/api/friends" + fq)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.friends)) {
          listEl.innerHTML = "<p class=\"friends-list-modal__empty\">Ошибка загрузки</p>";
          try {
            if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
          } catch (eRe) {}
          return;
        }
        if (data.friends.length === 0) {
          listEl.innerHTML = "<p class=\"friends-list-modal__empty\">Пока нет друзей</p>";
          try {
            if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(0);
          } catch (eZ) {}
          return;
        }
        try {
          if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(data.friends.length);
        } catch (eFcModal) {}
        listEl.innerHTML = data.friends.map(function (f) {
          var tgLine = f.userName || f.userId || "Игрок";
          var contact = f.contactName != null && String(f.contactName).trim() ? String(f.contactName).trim() : "";
          var forModal = contact
            ? contact
            : tgLine.indexOf("@") === 0
              ? tgLine.slice(1)
              : tgLine;
          var esc = function (s) {
            return String(s || "")
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;");
          };
          var id = esc(f.userId || "");
          var chatUserId = esc(f.chatUserId || "");
          var dataName = esc(forModal);
          var htmlLabels = contact
            ? '<span class="friends-list-modal__item-labels">' +
              '<span class="friends-list-modal__item-name">' +
              esc(contact) +
              "</span>" +
              '<span class="friends-list-modal__item-login">' +
              esc(tgLine) +
              "</span></span>"
            : '<span class="friends-list-modal__item-labels friends-list-modal__item-labels--single">' +
              '<span class="friends-list-modal__item-name">' +
              esc(tgLine) +
              "</span></span>";
          return (
            '<div class="friends-list-modal__item" data-user-id="' +
            id +
            '" data-chat-user-id="' +
            chatUserId +
            '" data-user-name="' +
            dataName +
            '">' +
            htmlLabels +
            '<div class="friends-list-modal__item-actions">' +
            '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>' +
            '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--remove">Удалить из друзей</button>' +
            "</div></div>"
          );
        }).join("");
        listEl.querySelectorAll(".friends-list-modal__item").forEach(function (item) {
          var profileBtn = item.querySelector(".friends-list-modal__btn--profile");
          var removeBtn = item.querySelector(".friends-list-modal__btn--remove");
          if (profileBtn) {
            profileBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var id = item.dataset.userId;
              var chatId = item.dataset.chatUserId || "";
              var name = item.dataset.userName;
              if ((id || chatId) && typeof window.openChatUserModalById === "function") {
                closeFriendsModal();
                window.openChatUserModalById(id || chatId, name);
              }
            });
          }
          if (removeBtn) {
            removeBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var idRaw = item.getAttribute("data-user-id");
              if (!idRaw || !base) return;
              var confirmed =
                typeof window.confirm === "function"
                  ? window.confirm("Убрать этого человека из друзей?")
                  : true;
              if (!confirmed) return;
              removeBtn.disabled = true;
              var removedSnapshot = item.cloneNode(true);
              var nextSibling = item.nextSibling;
              var removedUserId = item.getAttribute("data-user-id");
              var removedChatUserId = item.getAttribute("data-chat-user-id");
              if (typeof pokerRemoveLocalFriendFromChatContacts === "function") {
                pokerRemoveLocalFriendFromChatContacts(removedUserId || removedChatUserId);
              } else {
                pokerRemoveFriendFromOpenFriendsList(removedUserId, removedChatUserId);
              }
              fetch(base + "/api/friends", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: idRaw })),
              })
                .then(function (r) {
                  return r.json();
                })
                .then(function (d) {
                  if (d && d.ok) {
                    if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
                    if (typeof window.chatRefresh === "function") window.chatRefresh();
                  } else {
                    removeBtn.disabled = false;
                    var alreadyRestored = false;
                    try {
                      listEl.querySelectorAll(".friends-list-modal__item").forEach(function (row) {
                        if (
                          String(row.getAttribute("data-user-id") || "") === String(removedUserId || "") ||
                          String(row.getAttribute("data-chat-user-id") || "") === String(removedChatUserId || "")
                        ) {
                          alreadyRestored = true;
                        }
                      });
                    } catch (eFriendRestoreCheck) {}
                    if (removedSnapshot && listEl && !alreadyRestored) {
                      var emptyEl = listEl.querySelector(".friends-list-modal__empty");
                      if (emptyEl) emptyEl.remove();
                      if (nextSibling && nextSibling.parentNode === listEl) listEl.insertBefore(removedSnapshot, nextSibling);
                      else listEl.appendChild(removedSnapshot);
                    }
                    if (typeof pokerApplyLocalFriendToChatContacts === "function") {
                      pokerApplyLocalFriendToChatContacts(removedUserId || removedChatUserId, removedSnapshot ? removedSnapshot.getAttribute("data-user-name") || "" : "");
                    }
                    if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
                    else if (typeof alert === "function") alert((d && d.error) || "Ошибка");
                  }
                })
                .catch(function () {
                  removeBtn.disabled = false;
                  if (removedSnapshot && listEl && !listEl.contains(removedSnapshot)) {
                    var emptyElCatch = listEl.querySelector(".friends-list-modal__empty");
                    if (emptyElCatch) emptyElCatch.remove();
                    if (nextSibling && nextSibling.parentNode === listEl) listEl.insertBefore(removedSnapshot, nextSibling);
                    else listEl.appendChild(removedSnapshot);
                  }
                  if (typeof pokerApplyLocalFriendToChatContacts === "function") {
                    pokerApplyLocalFriendToChatContacts(removedUserId || removedChatUserId, removedSnapshot ? removedSnapshot.getAttribute("data-user-name") || "" : "");
                  }
                  if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
                  else if (typeof alert === "function") alert(POKER_NET_ERR);
                });
            });
          }
        });
      })
      .catch(function () {
        listEl.innerHTML = "<p class=\"friends-list-modal__empty\">" + POKER_NET_ERR + "</p>";
      });
  });
}
