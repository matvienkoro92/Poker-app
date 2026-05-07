// Main chat access management modal.

function initChatClubAccessModal(opts) {
  opts = opts || {};
  var base = opts.base || (typeof getApiBase === "function" ? getApiBase() : "");
  var tg = opts.tg || (window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null);
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
  var updateClubChatPendingBadge = typeof opts.updateClubChatPendingBadge === "function"
    ? opts.updateClubChatPendingBadge
    : function () {};
  var refreshGeneralAfterClubAccessChange = typeof opts.refreshGeneralAfterClubAccessChange === "function"
    ? opts.refreshGeneralAfterClubAccessChange
    : function () {};
  var reloadContactsAfterClubAccessChange = typeof opts.reloadContactsAfterClubAccessChange === "function"
    ? opts.reloadContactsAfterClubAccessChange
    : function () {};
  var ensureGlobalModalsHtml = typeof opts.ensureGlobalModalsHtml === "function" ? opts.ensureGlobalModalsHtml : null;

function closeChatClubAccessModal() {
  var modal = document.getElementById("chatClubAccessModal");
  if (modal) {
    modal.classList.add("chat-club-access-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
  }
}

function bindChatClubAccessModalDelegation() {
  var modal = document.getElementById("chatClubAccessModal");
  if (!modal || modal.getAttribute("data-delegation-bound") === "1") return;
  modal.setAttribute("data-delegation-bound", "1");
  modal.addEventListener("click", function (e) {
    var profBtn = e.target && e.target.closest ? e.target.closest("[data-club-profile]") : null;
    if (profBtn) {
      e.preventDefault();
      e.stopPropagation();
      var puid = profBtn.getAttribute("data-club-uid");
      var puname = profBtn.getAttribute("data-club-uname") || "";
      if (puid && typeof window.openChatUserModalById === "function") {
        window.openChatUserModalById(puid, puname);
      }
      return;
    }
    var closeTarget = e.target && e.target.closest ? e.target.closest("[data-chat-club-modal-close]") : null;
    if (closeTarget && modal.contains(closeTarget)) {
      e.preventDefault();
      e.stopPropagation();
      closeChatClubAccessModal();
      return;
    }
    var btn = e.target && e.target.closest ? e.target.closest("[data-club-act]") : null;
    if (!btn || !modal.contains(btn)) return;
    e.preventDefault();
    e.stopPropagation();
    var act = btn.getAttribute("data-club-act");
    var uid = btn.getAttribute("data-club-uid");
    if (act === "approve") clubAdminPatchAction("clubChatApprove", uid);
    else if (act === "reject") clubAdminPatchAction("clubChatReject", uid);
    else if (act === "revoke") clubAdminPatchAction("clubChatRevoke", uid);
  });
}

function formatClubChatJoinedAt(iso) {
  if (!iso || String(iso).trim() === "") return "дата неизвестна";
  var d = new Date(String(iso).trim());
  if (isNaN(d.getTime())) return "дата неизвестна";
  try {
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "дата неизвестна";
  }
}

function openChatClubAccessModal() {
  var modal = document.getElementById("chatClubAccessModal");
  var pendingEl = document.getElementById("chatClubAdminPendingList");
  var membersEl = document.getElementById("chatClubAdminMembersList");
  var pendingSub = document.getElementById("chatClubAdminPendingSubtitle");
  var membersSub = document.getElementById("chatClubAdminMembersSubtitle");
  var hintEl = document.getElementById("chatClubAdminModalHint");
  if (!pokerApiHasCredential()) return;
  if (!modal) {
    if (!openChatClubAccessModal._ensuringHtml && ensureGlobalModalsHtml) {
      openChatClubAccessModal._ensuringHtml = true;
      Promise.resolve(ensureGlobalModalsHtml())
        .then(function () {
          openChatClubAccessModal._ensuringHtml = false;
          openChatClubAccessModal();
        })
        .catch(function () {
          openChatClubAccessModal._ensuringHtml = false;
        });
    }
    return;
  }
  bindChatClubAccessModalDelegation();
  if (pendingSub) pendingSub.textContent = "Заявки";
  if (membersSub) membersSub.textContent = "В чате";
  if (pendingEl) pendingEl.innerHTML = "<p class=\"chat-empty\">Загрузка…</p>";
  if (membersEl) membersEl.innerHTML = "";
  if (hintEl) hintEl.textContent = "";
  modal.classList.remove("chat-club-access-modal--hidden");
  modal.setAttribute("aria-hidden", "false");
  fetch(base + "/api/chat" + pokerApiAuthQuery("?") + "&mode=clubChatManage", { cache: "no-store" })
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      if (!d || !d.ok) {
        if (hintEl) hintEl.textContent = (d && d.error) || "Ошибка загрузки";
        return;
      }
      function rowHtml(u, type) {
        var id = escapeHtml(u.userId || "");
        var nm = escapeHtml(u.name || u.userId || "");
        var unameAttr = escapeHtml(String(u.name || u.userId || "").trim());
        var adminBadge = u.isAdmin ? '<span class="chat-club-access-modal__badge">админ</span>' : "";
        var btns = "";
        if (type === "pending") {
          btns =
            '<button type="button" class="chat-club-access-modal__btn" data-club-act="approve" data-club-uid="' +
            id +
            '">Принять</button>' +
            '<button type="button" class="chat-club-access-modal__btn chat-club-access-modal__btn--danger" data-club-act="reject" data-club-uid="' +
            id +
            '">Отклонить</button>';
        } else if (type === "inChat" && !u.isAdmin) {
          btns =
            '<button type="button" class="chat-club-access-modal__btn chat-club-access-modal__btn--danger" data-club-act="revoke" data-club-uid="' +
            id +
            '">Убрать из чата</button>';
        }
        var nameBlock =
          type === "inChat" && id
            ? '<button type="button" class="chat-club-access-modal__profile-btn" data-club-profile="1" data-club-uid="' +
              id +
              '" data-club-uname="' +
              unameAttr +
              '" title="Профиль">' +
              nm +
              "</button>"
            : nm;
        var joinedLine = "";
        if (type === "inChat") {
          if (u.isAdmin) {
            joinedLine =
              '<span class="chat-club-access-modal__joined">Администратор</span>';
          } else {
            joinedLine =
              '<span class="chat-club-access-modal__joined">Вступил: ' +
              escapeHtml(formatClubChatJoinedAt(u.joinedAt)) +
              "</span>";
          }
        }
        var nameCol =
          '<span class="chat-club-access-modal__name-col">' +
          '<span class="chat-club-access-modal__name-line">' +
          nameBlock +
          adminBadge +
          "</span>" +
          joinedLine +
          "</span>";
        return (
          '<div class="chat-club-access-modal__row">' +
          nameCol +
          '<span class="chat-club-access-modal__actions">' +
          btns +
          "</span></div>"
        );
      }
      var pend = Array.isArray(d.pending) ? d.pending : [];
      var inChat = Array.isArray(d.inChat) ? d.inChat : [];
      var cnt = typeof d.inChatCount === "number" ? d.inChatCount : inChat.length;
      if (pendingSub) pendingSub.textContent = "Заявки (" + pend.length + ")";
      if (membersSub) membersSub.textContent = "В чате (" + cnt + ")";
      if (pendingEl) {
        pendingEl.innerHTML = pend.length ? pend.map(function (u) { return rowHtml(u, "pending"); }).join("") : '<p class="chat-empty">Нет заявок</p>';
      }
      if (membersEl) {
        membersEl.innerHTML = inChat.length ? inChat.map(function (u) { return rowHtml(u, "inChat"); }).join("") : '<p class="chat-empty">Пока никого</p>';
      }
      if (hintEl) {
        hintEl.textContent = d.gateEnabled
          ? "Долгое нажатие на «Главный чат» в списке открывает это окно. В счёт «В чате» входят админы и игроки с одобренным доступом."
          : "Режим заявок выключен на сервере (CLUB_CHAT_REQUIRE_APPLICATION=0).";
      }
      if (typeof d.pendingCount === "number") {
        window.chatClubPendingReviewCount = Math.max(0, d.pendingCount);
      }
      updateClubChatPendingBadge();
    })
    .catch(function () {
      if (hintEl) hintEl.textContent = POKER_NET_ERR;
    });
}

function clubAdminPatchAction(action, userId) {
  if (!pokerApiHasCredential() || !userId) return;
  fetch(base + "/api/chat", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ action: action, userId: userId })),
  })
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      if (d && d.ok) {
        openChatClubAccessModal();
        /* Модалка тянет clubChatManage; шапка/кэш общего чата (participantsCount, generalMembers) — только из mode=general */
        refreshGeneralAfterClubAccessChange();
        reloadContactsAfterClubAccessChange();
      } else if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
    })
    .catch(function () {
      if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
    });
}

bindChatClubAccessModalDelegation();

  try {
    window.__pokerOpenChatClubAccessModal = openChatClubAccessModal;
  } catch (eExposeClubAccess) {}
  return openChatClubAccessModal;
}
