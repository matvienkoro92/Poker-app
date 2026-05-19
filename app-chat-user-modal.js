// Chat user profile, friends, and respect modals.

function initChatUserModals(opts) {
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
  var openConversation = typeof opts.openConversation === "function" ? opts.openConversation : function () {};
  var updateCurrentPeerTitle = typeof opts.updateCurrentPeerTitle === "function" ? opts.updateCurrentPeerTitle : function () {};

function syncChatRespectDisplayForUser(userId, score) {
  if (!userId || score == null || typeof document === "undefined") return;
  var n = typeof score === "number" ? score : parseInt(score, 10);
  if (isNaN(n)) n = 0;
  var label = n === 0 ? "\u2014" : String(n);
  document.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
    if (row.getAttribute("data-user-id") !== String(userId)) return;
    var sp = row.querySelector(".chat-msg__respect");
    if (!sp) return;
    sp.textContent = "Ув: " + label;
    sp.classList.remove("chat-msg__respect--positive", "chat-msg__respect--negative");
    if (n > 0) sp.classList.add("chat-msg__respect--positive");
    else if (n < 0) sp.classList.add("chat-msg__respect--negative");
  });
}
window.syncChatRespectDisplayForUser = syncChatRespectDisplayForUser;

function pokerFormatChatLastSeenRu(iso) {
  if (!iso) return "";
  try {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return (
      "был онлайн " +
      d.toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  } catch (eLs) {
    return "";
  }
}
window.pokerFormatChatLastSeenRu = pokerFormatChatLastSeenRu;

var chatUserModalEl = document.getElementById("chatUserModal");
var chatUserModalUserId = null;
var chatUserModalUserName = null;
if (chatUserModalEl) {
  var modalTitle = document.getElementById("chatUserModalTitle");
  var modalTitleFish = null;
  if (modalTitle && modalTitle.parentNode) {
    modalTitleFish = document.createElement("img");
    modalTitleFish.className = "profile-status-fish-inline chat-user-modal__title-fish";
    modalTitleFish.alt = "";
    modalTitleFish.setAttribute("aria-hidden", "true");
    modalTitleFish.loading = "lazy";
    modalTitleFish.decoding = "async";
    modalTitleFish.hidden = true;
    modalTitle.parentNode.insertBefore(modalTitleFish, modalTitle.nextSibling);
  }
  var modalAvatar = document.getElementById("chatUserModalAvatar");
  var modalAvatarPlaceholder = document.getElementById("chatUserModalAvatarPlaceholder");
  var modalP21 = document.getElementById("chatUserModalP21");
  var modalPersonal = document.getElementById("chatUserModalPersonal");
  var modalLevelFish = document.getElementById("chatUserModalLevelFish");
  var modalLevelText = document.getElementById("chatUserModalLevelText");
  var modalRespectVal = document.getElementById("chatUserModalRespectVal");
  var modalPlayerStats = document.getElementById("chatUserModalPlayerStats");
  var modalStatusScale = document.getElementById("chatUserModalStatusScale");
  var modalStatusFish = modalStatusScale ? modalStatusScale.querySelector(".chat-user-modal__status-fish") : null;
  var modalStatusSection = modalStatusScale && modalStatusScale.closest ? modalStatusScale.closest(".chat-user-modal__status") : null;
  var modalStatusCards = modalStatusScale ? modalStatusScale.querySelectorAll(".chat-user-modal__status-card") : [];
  var modalPersonalBlock = document.getElementById("chatUserModalPersonalBlock");
  var modalWriteBtn = document.getElementById("chatUserModalWriteBtn");
  var modalRespectUp = document.getElementById("chatUserModalRespectUp");
  var modalRespectDown = document.getElementById("chatUserModalRespectDown");
  var modalRespectHint = document.getElementById("chatUserModalRespectHint");
  var modalAddFriend = document.getElementById("chatUserModalAddFriend");
  var modalEditFriendName = document.getElementById("chatUserModalEditFriendName");
  var modalRemoveFriend = document.getElementById("chatUserModalRemoveFriend");
  var modalFriendMsg = document.getElementById("chatUserModalFriendMsg");
  var modalLoginSub = document.getElementById("chatUserModalLoginSub");
  var modalLastSeen = document.getElementById("chatUserModalLastSeen");
  var modalVerifiedBadge = document.getElementById("chatUserModalVerifiedBadge");
  var modalBackdrop = chatUserModalEl.querySelector(".chat-user-modal__backdrop");
  var modalClose = chatUserModalEl.querySelector(".chat-user-modal__close");
  var chatUserModalPeerLogin = "";
  var chatUserModalContactName = "";
  function closeChatUserModal() {
    chatUserModalEl.setAttribute("aria-hidden", "true");
    chatUserModalEl.classList.remove("chat-user-modal--open");
  }
  function syncChatUserModalTitleFromProfileData(data, fallbackName) {
    chatUserModalPeerLogin = data && data.userName ? String(data.userName) : "";
    var contactNm =
      data && data.contactName != null && String(data.contactName).trim()
        ? String(data.contactName).trim()
        : "";
    chatUserModalContactName = contactNm;
    var peerChatDisp =
      data && data.chatDisplayName != null && String(data.chatDisplayName).trim()
        ? String(data.chatDisplayName).trim()
        : "";
    var titleDisp = contactNm || peerChatDisp || chatUserModalPeerLogin || (fallbackName || "Игрок");
    if (modalTitle) modalTitle.textContent = titleDisp;
    chatUserModalUserName = titleDisp;
    if (modalAvatar) modalAvatar.alt = titleDisp;
    if (modalAvatarPlaceholder && (!modalAvatar || modalAvatar.style.display === "none")) {
      modalAvatarPlaceholder.textContent = (titleDisp || "И")[0];
    }
    if (modalLoginSub) {
      if (contactNm && chatUserModalPeerLogin) {
        modalLoginSub.textContent = chatUserModalPeerLogin;
        modalLoginSub.hidden = false;
      } else if (peerChatDisp && chatUserModalPeerLogin) {
        modalLoginSub.textContent = chatUserModalPeerLogin;
        modalLoginSub.hidden = false;
      } else {
        modalLoginSub.textContent = "";
        modalLoginSub.hidden = true;
      }
    }
    return titleDisp;
  }
  function updateChatUserModalFriendState(isFriend, displayTitle) {
    if (modalAddFriend) {
      modalAddFriend.style.display = isFriend ? "none" : "";
      modalAddFriend.disabled = !!isFriend;
      modalAddFriend.classList.toggle("chat-user-modal__friend-btn--added", !!isFriend);
    }
    if (modalEditFriendName) {
      modalEditFriendName.style.display = isFriend ? "inline-flex" : "none";
      modalEditFriendName.disabled = false;
    }
    if (modalRemoveFriend) {
      modalRemoveFriend.style.display = isFriend ? "inline-flex" : "none";
      modalRemoveFriend.disabled = false;
    }
    if (modalFriendMsg) {
      if (isFriend) {
        modalFriendMsg.textContent = "Теперь " + (displayTitle || "Игрок") + " ваш друг";
        modalFriendMsg.style.display = "";
      } else {
        modalFriendMsg.textContent = "";
        modalFriendMsg.style.display = "none";
      }
    }
  }
  function updateChatUserModalRespectButtons(myVote) {
    if (!modalRespectUp || !modalRespectDown) return;
    var v = myVote === "up" || myVote === "down" ? myVote : null;
    if (!v) {
      modalRespectUp.disabled = false;
      modalRespectUp.textContent = "Поднять уважение";
      modalRespectUp.setAttribute("data-rv-action", "up");
      modalRespectDown.disabled = false;
      modalRespectDown.textContent = "Уменьшить уважение";
      modalRespectDown.setAttribute("data-rv-action", "down");
      if (modalRespectHint) {
        modalRespectHint.textContent = "";
        modalRespectHint.hidden = true;
      }
      return;
    }
    if (v === "up") {
      modalRespectUp.disabled = true;
      modalRespectUp.textContent = "Поднять уважение";
      modalRespectUp.setAttribute("data-rv-action", "up");
      modalRespectDown.disabled = false;
      modalRespectDown.textContent = "Отменить уважение";
      modalRespectDown.setAttribute("data-rv-action", "withdraw");
      if (modalRespectHint) {
        modalRespectHint.textContent = "Вы уже подняли уважение игрока";
        modalRespectHint.hidden = false;
      }
      return;
    }
    if (v === "down") {
      modalRespectDown.disabled = true;
      modalRespectDown.textContent = "Уменьшить уважение";
      modalRespectDown.setAttribute("data-rv-action", "down");
      modalRespectUp.disabled = false;
      modalRespectUp.textContent = "Вернуть уважение";
      modalRespectUp.setAttribute("data-rv-action", "withdraw");
      if (modalRespectHint) {
        modalRespectHint.textContent = "Вы уменьшили уважение игроку";
        modalRespectHint.hidden = false;
      }
    }
  }
  function chatUserModalFormatStat(value, suffix) {
    var n = Number(value);
    if (!isFinite(n)) return "\u2014";
    var text = String(n < 0 ? Math.ceil(n) : Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return suffix ? text + suffix : text;
  }
  function chatUserModalStatHtml(label, value, suffix) {
    return (
      '<span class="chat-user-modal__player-stat"><span class="chat-user-modal__player-stat-label">' +
      escapeHtml(label) +
      '</span><span class="chat-user-modal__player-stat-value">' +
      escapeHtml(chatUserModalFormatStat(value, suffix)) +
      "</span></span>"
    );
  }
  function chatUserModalNonNegativeStatHtml(label, value, suffix) {
    var n = Number(value);
    if (isFinite(n) && n < 0) return "";
    return chatUserModalStatHtml(label, value, suffix);
  }
  function chatUserModalOptionalStatHtml(label, value, suffix) {
    if (value == null || value !== value || String(value).trim() === "") return "";
    return chatUserModalStatHtml(label, value, suffix);
  }
  function chatUserModalOptionalNonNegativeStatHtml(label, value, suffix) {
    if (value == null || value !== value || String(value).trim() === "") return "";
    var n = Number(value);
    if (isFinite(n) && n < 0) return "";
    return chatUserModalStatHtml(label, value, suffix);
  }
  function renderChatUserModalPlayerStats(data) {
    if (!modalPlayerStats) return;
    if (!data || data.pokerPlusStatsVisible !== true) {
      modalPlayerStats.innerHTML =
        '<p class="chat-user-modal__player-stats-private">Статистика данного игрока является приватной и доступна только секретным службам</p>';
      return;
    }
    var st = data.pokerPlusStats && typeof data.pokerPlusStats === "object" ? data.pokerPlusStats : {};
    modalPlayerStats.innerHTML =
      chatUserModalStatHtml("Рейк", st.fee, "") +
      chatUserModalStatHtml("Раздачи", st.hands, "") +
      chatUserModalOptionalStatHtml("BB", st.bb, "") +
      chatUserModalNonNegativeStatHtml("Кеш", st.winnings, "") +
      chatUserModalOptionalNonNegativeStatHtml("OFC", st.ofcWinnings, "") +
      chatUserModalNonNegativeStatHtml("MTT", st.mttWinnings, "") +
      chatUserModalOptionalStatHtml("MTT р.", st.mttRound, "") +
      chatUserModalOptionalStatHtml("MTT игр", st.mttCount, "") +
      chatUserModalOptionalStatHtml("MTT ITM", st.mttItmCount, "") +
      chatUserModalOptionalStatHtml("MTT 1-е", st.mttFirstCount, "") +
      chatUserModalNonNegativeStatHtml("SNG", st.sngWinnings, "") +
      chatUserModalOptionalStatHtml("SNG р.", st.sngRound, "") +
      chatUserModalOptionalStatHtml("SNG игр", st.sngCount, "") +
      chatUserModalOptionalStatHtml("SNG ITM", st.sngItmCount, "") +
      chatUserModalOptionalStatHtml("SNG 1-е", st.sngFirstCount, "");
  }
  function openChatUserModalById(id, name, avatarUrl) {
    var userName = name || "Игрок";
    if (!id || !chatUserModalEl) {
      if (id) openConversation(id, userName, avatarUrl);
      return;
    }
    chatUserModalUserId = id;
    chatUserModalUserName = userName;
    chatUserModalPeerLogin = "";
    chatUserModalContactName = "";
    if (modalLoginSub) {
      modalLoginSub.textContent = "";
      modalLoginSub.hidden = true;
    }
    if (modalLastSeen) {
      modalLastSeen.textContent = "";
      modalLastSeen.hidden = true;
    }
    if (modalEditFriendName) modalEditFriendName.style.display = "none";
    if (modalRemoveFriend) modalRemoveFriend.style.display = "none";
    if (modalVerifiedBadge) modalVerifiedBadge.classList.add("chat-user-modal__verified--hidden");
    if (modalTitle) modalTitle.textContent = userName;
    if (modalAvatar && modalAvatarPlaceholder) {
      if (avatarUrl) {
        modalAvatar.src = avatarUrl;
        modalAvatar.alt = userName;
        modalAvatar.style.display = "";
        modalAvatarPlaceholder.style.display = "none";
      } else {
        modalAvatar.removeAttribute("src");
        modalAvatar.style.display = "none";
        modalAvatarPlaceholder.textContent = (userName || "И")[0];
        modalAvatarPlaceholder.style.display = "";
      }
    }
    if (modalP21) modalP21.textContent = "";
    if (modalPersonal) modalPersonal.textContent = "Загрузка…";
    if (modalPlayerStats) modalPlayerStats.textContent = "Загрузка...";
    if (modalLevelFish) modalLevelFish.hidden = true;
    if (modalLevelText) {
      modalLevelText.textContent = "";
      modalLevelText.hidden = true;
    }
    if (modalRespectVal) modalRespectVal.textContent = "—";
    if (modalStatusScale) modalStatusScale.style.setProperty("--status-value", "0");
    if (modalStatusSection) modalStatusSection.hidden = true;
    if (modalStatusCards[0]) modalStatusCards[0].textContent = "1";
    if (modalStatusCards[1]) modalStatusCards[1].textContent = "2";
    pokerProfileApplyStatusFish(modalStatusFish, 1);
    if (modalTitleFish) modalTitleFish.hidden = true;
    if (typeof updateChatUserModalRespectButtons === "function") {
      if (modalRespectUp) modalRespectUp.disabled = true;
      if (modalRespectDown) modalRespectDown.disabled = true;
    }
    if (modalRespectHint) {
      modalRespectHint.textContent = "";
      modalRespectHint.hidden = true;
    }
    if (typeof updateChatUserModalFriendState === "function") updateChatUserModalFriendState(false, null);
    chatUserModalEl.setAttribute("aria-hidden", "false");
    chatUserModalEl.classList.add("chat-user-modal--open");
    if (modalPersonalBlock) modalPersonalBlock.classList.add("chat-user-modal__personal-block--hidden");
    fetch(base + "/api/users?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (modalP21) modalP21.textContent = "";
        var personalText = (data && data.personalInfo != null) ? String(data.personalInfo).trim() : "";
        if (modalPersonal) modalPersonal.textContent = personalText || "—";
        if (modalPersonalBlock) {
          if (personalText) modalPersonalBlock.classList.remove("chat-user-modal__personal-block--hidden");
          else modalPersonalBlock.classList.add("chat-user-modal__personal-block--hidden");
        }
        var modalStatusLevel = data && data.level != null ? data.level : null;
        if (modalLevelText && modalStatusLevel != null) {
          modalLevelText.textContent = "Уровень " + modalStatusLevel + " из 55";
          modalLevelText.hidden = false;
        } else if (modalLevelText) {
          modalLevelText.textContent = "Обновите свой уровень во вкладке Профиль Poker21";
          modalLevelText.hidden = false;
        }
        if (modalStatusLevel != null) {
          var modalLevel = Math.min(55, Math.max(1, parseInt(modalStatusLevel, 10) || 1));
          if (modalStatusCards[0]) modalStatusCards[0].textContent = pokerProfileStatusCardLabel(modalLevel);
          if (modalStatusCards[1]) modalStatusCards[1].textContent = pokerProfileStatusCardLabel(Math.min(55, modalLevel + 1));
          if (modalStatusSection) modalStatusSection.hidden = false;
          pokerProfileApplyStatusFish(modalLevelFish, modalStatusLevel);
          if (modalLevelFish) modalLevelFish.hidden = false;
          pokerProfileApplyStatusFish(modalStatusFish, modalStatusLevel);
          if (modalTitleFish) {
            var modalFishLevel = pokerProfileStatusFishLevel(modalStatusLevel);
            modalTitleFish.src = pokerProfileStatusFishSrc(modalFishLevel);
            modalTitleFish.setAttribute("data-status-fish-level", String(modalFishLevel));
            modalTitleFish.hidden = false;
          }
        }
        if (modalStatusScale && data && data.statusValue != null) modalStatusScale.style.setProperty("--status-value", String(data.statusValue));
        renderChatUserModalPlayerStats(data);
        if (data && data.ok) {
          if (modalVerifiedBadge) modalVerifiedBadge.classList.toggle("chat-user-modal__verified--hidden", data.pokerPlusVerified !== true);
          var titleDisp = syncChatUserModalTitleFromProfileData(data, userName);
          if (modalAvatar && modalAvatarPlaceholder && modalAvatar.style.display !== "none") {
            modalAvatar.alt = titleDisp;
          } else if (modalAvatarPlaceholder) {
            modalAvatarPlaceholder.textContent = (titleDisp || "И")[0];
          }
          if (typeof updateChatUserModalFriendState === "function") updateChatUserModalFriendState(!!data.isFriend, titleDisp);
          if (modalLastSeen) {
            if (data.chatOnline) {
              modalLastSeen.textContent = "В сети";
              modalLastSeen.hidden = false;
            } else if (data.chatLastSeenAt) {
              var lsTxt = pokerFormatChatLastSeenRu(data.chatLastSeenAt);
              if (lsTxt) {
                modalLastSeen.textContent = lsTxt;
                modalLastSeen.hidden = false;
              } else {
                modalLastSeen.hidden = true;
              }
            } else {
              modalLastSeen.hidden = true;
            }
          }
        }
      })
      .catch(function () {
        if (modalPersonal) modalPersonal.textContent = "—";
        if (modalLastSeen) modalLastSeen.hidden = true;
      });
    fetch(base + "/api/respect?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && typeof updateChatUserModalRespectButtons === "function") updateChatUserModalRespectButtons(data.myVote || null);
        if (modalRespectVal) modalRespectVal.textContent = (data && data.score !== undefined && data.score !== null) ? String(data.score) : "—";
      })
      .catch(function () {
        if (typeof updateChatUserModalRespectButtons === "function") updateChatUserModalRespectButtons(null);
      });
  }
  window.openChatUserModalById = openChatUserModalById;
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeChatUserModal);
  if (modalClose) modalClose.addEventListener("click", closeChatUserModal);
  if (modalWriteBtn) {
    modalWriteBtn.addEventListener("click", function () {
      if (chatUserModalUserId) {
        var uid = chatUserModalUserId;
        var uname = chatUserModalUserName || "Игрок";
        closeChatUserModal();
        if (typeof setView === "function") setView("chat");
        if (typeof window.chatOpenConvFromDialogs === "function") window.chatOpenConvFromDialogs(uid, uname);
        else openConversation(uid, uname, null);
      }
    });
  }
  function chatUserModalPostRespect(action) {
    if (!chatUserModalUserId || !base || !pokerApiHasCredential()) return;
    if (action !== "up" && action !== "down" && action !== "withdraw") return;
    if (modalRespectUp) modalRespectUp.disabled = true;
    if (modalRespectDown) modalRespectDown.disabled = true;
    fetch(base + "/api/respect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: chatUserModalUserId, action: action })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (d && d.ok) {
          if (modalRespectVal && d.score != null && d.score !== "") modalRespectVal.textContent = String(d.score);
          if (d.score != null && d.score !== "" && typeof window.syncChatRespectDisplayForUser === "function") {
            window.syncChatRespectDisplayForUser(chatUserModalUserId, d.score);
          }
          var nextVote =
            action === "withdraw" ? null : action === "up" ? "up" : action === "down" ? "down" : null;
          updateChatUserModalRespectButtons(nextVote);
        } else {
          fetch(base + "/api/respect?userId=" + encodeURIComponent(chatUserModalUserId) + pokerApiAuthQuery("&"))
            .then(function (r2) {
              return r2.json();
            })
            .then(function (data2) {
              if (data2 && data2.ok) {
                updateChatUserModalRespectButtons(data2.myVote || null);
                if (modalRespectVal && data2.score != null) modalRespectVal.textContent = String(data2.score);
              }
            });
          var msg = (d && d.error) || "Ошибка";
          if (d && d.error === "already_raised") msg = "Вы уже подняли уважение игрока";
          else if (d && d.error === "already_lowered") msg = "Вы уменьшили уважение игроку";
          if (tg && tg.showAlert) tg.showAlert(msg);
        }
      })
      .catch(function () {
        fetch(base + "/api/respect?userId=" + encodeURIComponent(chatUserModalUserId) + pokerApiAuthQuery("&"))
          .then(function (r3) {
            return r3.json();
          })
          .then(function (data3) {
            if (data3 && data3.ok) updateChatUserModalRespectButtons(data3.myVote || null);
          });
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
      });
  }
  if (modalRespectUp) {
    modalRespectUp.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || !pokerApiHasCredential()) return;
      if (modalRespectUp.disabled) return;
      var a = modalRespectUp.getAttribute("data-rv-action") || "up";
      chatUserModalPostRespect(a === "withdraw" ? "withdraw" : "up");
    });
  }
  if (modalRespectDown) {
    modalRespectDown.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || !pokerApiHasCredential()) return;
      if (modalRespectDown.disabled) return;
      var a = modalRespectDown.getAttribute("data-rv-action") || "down";
      chatUserModalPostRespect(a === "withdraw" ? "withdraw" : "down");
    });
  }
  if (modalAddFriend) {
    modalAddFriend.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || !pokerApiHasCredential() || modalAddFriend.disabled) return;
      var defaultContact = (chatUserModalUserName || "").trim();
      var prompted = null;
      try {
        prompted =
          typeof window.prompt === "function"
            ? window.prompt(
                "Имя контакта в списке друзей (над логином в Telegram).\nМожно оставить как есть или изменить:",
                defaultContact
              )
            : defaultContact;
      } catch (ePrompt) {
        prompted = defaultContact;
      }
      if (prompted === null) return;
      var contactName = String(prompted).trim();
      modalAddFriend.disabled = true;
      fetch(base + "/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({ targetUserId: chatUserModalUserId, contactName: contactName })
        ),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (d) {
          if (d && d.ok) {
            chatUserModalContactName = contactName;
            var tdAdd =
              contactName && contactName.length > 0
                ? contactName
                : chatUserModalPeerLogin || chatUserModalUserName || "Игрок";
            if (modalTitle) modalTitle.textContent = tdAdd;
            chatUserModalUserName = tdAdd;
            if (modalLoginSub) {
              if (contactName && contactName.length > 0 && chatUserModalPeerLogin) {
                modalLoginSub.textContent = chatUserModalPeerLogin;
                modalLoginSub.hidden = false;
              } else {
                modalLoginSub.textContent = "";
                modalLoginSub.hidden = true;
              }
            }
            if (modalAvatar) modalAvatar.alt = tdAdd;
            if (modalAvatarPlaceholder && (!modalAvatar || modalAvatar.style.display === "none")) {
              modalAvatarPlaceholder.textContent = (tdAdd || "И")[0];
            }
            updateChatUserModalFriendState(true, tdAdd);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
            updateCurrentPeerTitle(chatUserModalUserId, tdAdd);
          } else {
            modalAddFriend.disabled = false;
            if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
          }
        })
        .catch(function () {
          modalAddFriend.disabled = false;
        });
    });
  }
  if (modalEditFriendName) {
    modalEditFriendName.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || !pokerApiHasCredential() || modalEditFriendName.disabled) return;
      var defEd =
        (chatUserModalContactName || chatUserModalUserName || chatUserModalPeerLogin || "").trim();
      var promptedEd = null;
      try {
        promptedEd =
          typeof window.prompt === "function"
            ? window.prompt(
                "Как показывать этого человека в ваших чатах (вместо логина).\nПустое значение — снова показывать логин.",
                defEd
              )
            : defEd;
      } catch (ePrEd) {
        promptedEd = defEd;
      }
      if (promptedEd === null) return;
      var newCn = String(promptedEd).trim();
      modalEditFriendName.disabled = true;
      fetch(base + "/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: chatUserModalUserId, contactName: newCn })),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (d) {
          modalEditFriendName.disabled = false;
          if (d && d.ok) {
            chatUserModalContactName = newCn;
            var tdEd = newCn || chatUserModalPeerLogin || chatUserModalUserName || "Игрок";
            if (modalTitle) modalTitle.textContent = tdEd;
            chatUserModalUserName = tdEd;
            if (modalLoginSub) {
              if (newCn && chatUserModalPeerLogin) {
                modalLoginSub.textContent = chatUserModalPeerLogin;
                modalLoginSub.hidden = false;
              } else {
                modalLoginSub.textContent = "";
                modalLoginSub.hidden = true;
              }
            }
            if (modalAvatar) modalAvatar.alt = tdEd;
            if (modalAvatarPlaceholder && (!modalAvatar || modalAvatar.style.display === "none")) {
              modalAvatarPlaceholder.textContent = (tdEd || "И")[0];
            }
            updateChatUserModalFriendState(true, tdEd);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
            updateCurrentPeerTitle(chatUserModalUserId, tdEd);
          } else if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
        })
        .catch(function () {
          modalEditFriendName.disabled = false;
        });
    });
  }
  if (modalRemoveFriend) {
    modalRemoveFriend.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || !pokerApiHasCredential() || modalRemoveFriend.disabled) return;
      if (!confirm("Убрать этого человека из друзей? В чатах снова будет отображаться логин.")) return;
      modalRemoveFriend.disabled = true;
      var prevContactName = chatUserModalContactName;
      var prevTitle = chatUserModalUserName;
      var tdRmOptimistic = chatUserModalPeerLogin || chatUserModalUserName || "Игрок";
      chatUserModalContactName = "";
      if (modalTitle) modalTitle.textContent = tdRmOptimistic;
      chatUserModalUserName = tdRmOptimistic;
      if (modalLoginSub) {
        modalLoginSub.textContent = "";
        modalLoginSub.hidden = true;
      }
      updateChatUserModalFriendState(false, null);
      if (typeof pokerRemoveLocalFriendFromChatContacts === "function") pokerRemoveLocalFriendFromChatContacts(chatUserModalUserId);
      if (typeof window.pokerRemoveFriendFromOpenFriendsList === "function") {
        window.pokerRemoveFriendFromOpenFriendsList(chatUserModalUserId);
      }
      updateCurrentPeerTitle(chatUserModalUserId, tdRmOptimistic);
      fetch(base + "/api/friends", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: chatUserModalUserId })),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (d) {
          modalRemoveFriend.disabled = false;
          if (d && d.ok) {
            chatUserModalContactName = "";
            var tdRm = chatUserModalPeerLogin || chatUserModalUserName || "Игрок";
            if (modalTitle) modalTitle.textContent = tdRm;
            chatUserModalUserName = tdRm;
            if (modalLoginSub) {
              modalLoginSub.textContent = "";
              modalLoginSub.hidden = true;
            }
            if (modalAvatar) modalAvatar.alt = tdRm;
            if (modalAvatarPlaceholder && (!modalAvatar || modalAvatar.style.display === "none")) {
              modalAvatarPlaceholder.textContent = (tdRm || "И")[0];
            }
            updateChatUserModalFriendState(false, null);
            if (typeof window.pokerRemoveFriendFromOpenFriendsList === "function") {
              window.pokerRemoveFriendFromOpenFriendsList(chatUserModalUserId);
            }
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
            updateCurrentPeerTitle(chatUserModalUserId, tdRm);
          } else {
            chatUserModalContactName = prevContactName;
            chatUserModalUserName = prevTitle;
            if (modalTitle) modalTitle.textContent = prevContactName || prevTitle || "Игрок";
            if (modalLoginSub) {
              if (prevContactName && chatUserModalPeerLogin) {
                modalLoginSub.textContent = chatUserModalPeerLogin;
                modalLoginSub.hidden = false;
              } else {
                modalLoginSub.textContent = "";
                modalLoginSub.hidden = true;
              }
            }
            updateChatUserModalFriendState(true, prevContactName || prevTitle);
            if (typeof pokerApplyLocalFriendToChatContacts === "function") {
              pokerApplyLocalFriendToChatContacts(chatUserModalUserId, prevContactName || prevTitle || "");
            }
            if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
          }
        })
        .catch(function () {
          modalRemoveFriend.disabled = false;
          chatUserModalContactName = prevContactName;
          chatUserModalUserName = prevTitle;
          if (modalTitle) modalTitle.textContent = prevContactName || prevTitle || "Игрок";
          if (modalLoginSub) {
            if (prevContactName && chatUserModalPeerLogin) {
              modalLoginSub.textContent = chatUserModalPeerLogin;
              modalLoginSub.hidden = false;
            } else {
              modalLoginSub.textContent = "";
              modalLoginSub.hidden = true;
            }
          }
          updateChatUserModalFriendState(true, prevContactName || prevTitle);
          if (typeof pokerApplyLocalFriendToChatContacts === "function") {
            pokerApplyLocalFriendToChatContacts(chatUserModalUserId, prevContactName || prevTitle || "");
          }
        });
    });
  }
}
var respectVotersModalEl = document.getElementById("respectVotersModal");
if (respectVotersModalEl && !respectVotersModalEl.dataset.bound) {
  respectVotersModalEl.dataset.bound = "1";
  var rvUpEl = document.getElementById("respectVotersModalUp");
  var rvDownEl = document.getElementById("respectVotersModalDown");
  var rvBtnUp = document.getElementById("respectVotersModalBtnUp");
  var rvBtnDown = document.getElementById("respectVotersModalBtnDown");
  var rvVoteHintEl = document.getElementById("respectVotersModalVoteHint");
  function applyRespectVotersModalVoteState(myVote) {
    if (!rvBtnUp || !rvBtnDown) return;
    if (respectVotersModalEl.classList.contains("respect-voters-modal--no-vote")) {
      if (rvVoteHintEl) {
        rvVoteHintEl.textContent = "";
        rvVoteHintEl.hidden = true;
      }
      return;
    }
    var v = myVote === "up" || myVote === "down" ? myVote : null;
    if (!v) {
      rvBtnUp.disabled = false;
      rvBtnUp.textContent = "Поднять уважение";
      rvBtnUp.setAttribute("data-rv-action", "up");
      rvBtnDown.disabled = false;
      rvBtnDown.textContent = "Уменьшить уважение";
      rvBtnDown.setAttribute("data-rv-action", "down");
      if (rvVoteHintEl) {
        rvVoteHintEl.textContent = "";
        rvVoteHintEl.hidden = true;
      }
      return;
    }
    if (v === "up") {
      rvBtnUp.disabled = true;
      rvBtnUp.textContent = "Поднять уважение";
      rvBtnUp.setAttribute("data-rv-action", "up");
      rvBtnDown.disabled = false;
      rvBtnDown.textContent = "Отменить уважение";
      rvBtnDown.setAttribute("data-rv-action", "withdraw");
      if (rvVoteHintEl) {
        rvVoteHintEl.textContent = "Вы уже подняли уважение игрока";
        rvVoteHintEl.hidden = false;
      }
      return;
    }
    if (v === "down") {
      rvBtnDown.disabled = true;
      rvBtnDown.textContent = "Уменьшить уважение";
      rvBtnDown.setAttribute("data-rv-action", "down");
      rvBtnUp.disabled = false;
      rvBtnUp.textContent = "Вернуть уважение";
      rvBtnUp.setAttribute("data-rv-action", "withdraw");
      if (rvVoteHintEl) {
        rvVoteHintEl.textContent = "Вы уменьшили уважение игроку";
        rvVoteHintEl.hidden = false;
      }
    }
  }
  function closeRespectVotersModal() {
    respectVotersModalEl.classList.remove("respect-voters-modal--open", "respect-voters-modal--no-vote");
    respectVotersModalEl.setAttribute("aria-hidden", "true");
    if (rvVoteHintEl) {
      rvVoteHintEl.textContent = "";
      rvVoteHintEl.hidden = true;
    }
  }
  function postRespectVotersModalAction(action) {
    var targetId = respectVotersModalEl.dataset.targetUserId;
    if (!targetId || !base || !pokerApiHasCredential()) return;
    if (respectVotersModalEl.classList.contains("respect-voters-modal--no-vote")) return;
    if (action !== "up" && action !== "down" && action !== "withdraw") return;
    if (rvBtnUp) rvBtnUp.disabled = true;
    if (rvBtnDown) rvBtnDown.disabled = true;
    fetch(base + "/api/respect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetId, action: action })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (d && d.ok) {
          if (d.score != null && d.score !== "" && typeof window.syncChatRespectDisplayForUser === "function") {
            window.syncChatRespectDisplayForUser(targetId, d.score);
          }
          loadRespectVotersList(targetId);
        } else {
          loadRespectVotersList(targetId);
          var msg = (d && d.error) || "Ошибка";
          if (d && d.error === "already_raised") msg = "Вы уже подняли уважение игрока";
          else if (d && d.error === "already_lowered") msg = "Вы уменьшили уважение игроку";
          if (tg && tg.showAlert) tg.showAlert(msg);
        }
      })
      .catch(function () {
        loadRespectVotersList(targetId);
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
      });
  }
  function loadRespectVotersList(userId) {
    if (!userId || !rvUpEl || !rvDownEl || !base || !pokerApiHasCredential()) return;
    rvUpEl.textContent = "";
    rvDownEl.textContent = "Загрузка…";
    fetch(base + "/api/respect?userId=" + encodeURIComponent(userId) + pokerApiAuthQuery("&") + "&list=1")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok) {
          if (data.canViewVoters === false) {
            rvUpEl.textContent = "Список виден только владельцу профиля или админу";
            rvDownEl.textContent = "Список виден только владельцу профиля или админу";
            applyRespectVotersModalVoteState(data.myVote || null);
            return;
          }
          var up = Array.isArray(data.up) ? data.up : [];
          var down = Array.isArray(data.down) ? data.down : [];
          var vd =
            data.voterDisplay && typeof data.voterDisplay === "object" ? data.voterDisplay : {};
          function respectVoterLineLabel(uid) {
            var id = String(uid || "").trim();
            if (!id) return "—";
            if (vd[id] != null && String(vd[id]).trim()) return String(vd[id]).trim();
            return id;
          }
          rvUpEl.textContent = up.map(respectVoterLineLabel).join(", ") || "Никто";
          rvDownEl.textContent = down.map(respectVoterLineLabel).join(", ") || "Никто";
          applyRespectVotersModalVoteState(data.myVote || null);
        } else {
          rvUpEl.textContent = "—";
          rvDownEl.textContent = "—";
          applyRespectVotersModalVoteState(null);
        }
      })
      .catch(function () {
        rvUpEl.textContent = "—";
        rvDownEl.textContent = "Ошибка загрузки";
        applyRespectVotersModalVoteState(null);
      });
  }
  window._loadRespectVotersList = loadRespectVotersList;
  window.pokerOpenRespectVotersModal = function (userId, opts) {
    if (!userId || !respectVotersModalEl) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
    respectVotersModalEl.dataset.targetUserId = userId;
    if (opts && opts.hideVoteButtons) {
      respectVotersModalEl.classList.add("respect-voters-modal--no-vote");
    } else {
      respectVotersModalEl.classList.remove("respect-voters-modal--no-vote");
    }
    respectVotersModalEl.classList.add("respect-voters-modal--open");
    respectVotersModalEl.setAttribute("aria-hidden", "false");
    loadRespectVotersList(userId);
  };
  var rvBackdrop = respectVotersModalEl.querySelector(".respect-voters-modal__backdrop");
  var rvClose = respectVotersModalEl.querySelector(".respect-voters-modal__close");
  if (rvBackdrop) rvBackdrop.addEventListener("click", closeRespectVotersModal);
  if (rvClose) rvClose.addEventListener("click", closeRespectVotersModal);
  if (rvBtnUp) {
    rvBtnUp.addEventListener("click", function () {
      if (rvBtnUp.disabled) return;
      var a = rvBtnUp.getAttribute("data-rv-action") || "up";
      postRespectVotersModalAction(a === "withdraw" ? "withdraw" : "up");
    });
  }
  if (rvBtnDown) {
    rvBtnDown.addEventListener("click", function () {
      if (rvBtnDown.disabled) return;
      var a = rvBtnDown.getAttribute("data-rv-action") || "down";
      postRespectVotersModalAction(a === "withdraw" ? "withdraw" : "down");
    });
  }
}
}
