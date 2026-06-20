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
      "был онлайн\n" +
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
var chatUserModalHeroAvatarUrl = "";
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
  var modalRatingArt = document.getElementById("chatUserModalRatingArt");
  var modalRatingArtImg = document.getElementById("chatUserModalRatingArtImg");
  var modalHero = modalRatingArt && modalRatingArt.closest ? modalRatingArt.closest(".chat-user-modal__hero") : null;
  var modalP21 = document.getElementById("chatUserModalP21");
  var modalPersonal = document.getElementById("chatUserModalPersonal");
  var modalLevelFish = document.getElementById("chatUserModalLevelFish");
  var modalLevelText = document.getElementById("chatUserModalLevelText");
  var modalRespectVal = document.getElementById("chatUserModalRespectVal");
  var modalPlayerStats = document.getElementById("chatUserModalPlayerStats");
  var modalRatingTabs = document.getElementById("chatUserModalRatingTabs");
  var modalRatingTab = document.getElementById("chatUserModalRatingTab");
  var modalRatingTabSum = document.getElementById("chatUserModalRatingTabSum");
  var modalRatingRanks = document.getElementById("chatUserModalRatingRanks");
  var modalSummerRank = document.getElementById("chatUserModalSummerRank");
  var modalSpringRank = document.getElementById("chatUserModalSpringRank");
  var modalWinterRank = document.getElementById("chatUserModalWinterRank");
  var modalAchievements = document.getElementById("chatUserModalAchievements");
  var modalAchievementsList = document.getElementById("chatUserModalAchievementsList");
  var modalStatusScale = document.getElementById("chatUserModalStatusScale");
  var modalStatusXp = document.getElementById("chatUserModalStatusXp");
  var modalStatusFish = modalStatusScale ? modalStatusScale.querySelector(".chat-user-modal__status-fish") : null;
  var modalStatusSection = modalStatusScale && modalStatusScale.closest ? modalStatusScale.closest(".chat-user-modal__status") : null;
  var modalStatusCards = modalStatusScale ? modalStatusScale.querySelectorAll(".chat-user-modal__status-card") : [];
  var modalPersonalBlock = document.getElementById("chatUserModalPersonalBlock");
  var modalWriteBtn = document.getElementById("chatUserModalWriteBtn");
  var modalBlockBtn = document.getElementById("chatUserModalBlockBtn");
  var modalRespectUp = document.getElementById("chatUserModalRespectUp");
  var modalRespectDown = document.getElementById("chatUserModalRespectDown");
  var modalRespectHint = document.getElementById("chatUserModalRespectHint");
  var modalRespectActions = chatUserModalEl.querySelector(".chat-user-modal__respect-actions");
  var modalAddFriend = document.getElementById("chatUserModalAddFriend");
  var modalFriendRow = modalAddFriend && modalAddFriend.closest ? modalAddFriend.closest(".chat-user-modal__friend-row") : null;
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
  var chatUserModalRatingNick = "";
  var chatUserModalAchievementIdentity = null;
  var chatUserModalClubChoiceScriptReady = null;
  var chatUserModalRanksSeq = 0;
  var chatUserModalOpenSeq = 0;
  var chatUserModalBlockedByMe = false;
  var chatUserModalBlockBusy = false;
  var chatUserModalBlockSeq = 0;
  function chatUserModalFormatXp(value) {
    if (typeof pokerProfileFormatRake === "function") return pokerProfileFormatRake(value);
    var n = Math.max(0, Math.floor(Number(value) || 0));
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function syncChatUserModalStatusXp(pointsValue) {
    if (!modalStatusXp) return;
    if (pointsValue == null || pointsValue === "" || typeof pokerProfileStatusFromRake !== "function") {
      modalStatusXp.textContent = "";
      modalStatusXp.hidden = true;
      return;
    }
    var status = pokerProfileStatusFromRake(pointsValue);
    if (!status) {
      modalStatusXp.textContent = "";
      modalStatusXp.hidden = true;
      return;
    }
    var currentXp = Math.max(0, Math.floor((Number(status.points) || 0) - (Number(status.levelStart) || 0)));
    var neededXp = Math.max(0, Math.floor((Number(status.nextStart) || 0) - (Number(status.levelStart) || 0)));
    var leftXp = Math.max(0, Math.floor((Number(status.nextStart) || 0) - (Number(status.points) || 0)));
    modalStatusXp.textContent = status.level >= 100 || neededXp <= 0
      ? chatUserModalFormatXp(status.points) + " XP · максимум"
      : chatUserModalFormatXp(currentXp) + " / " + chatUserModalFormatXp(neededXp) + " XP";
    modalStatusXp.hidden = false;
  }
  function closeChatUserModal() {
    chatUserModalOpenSeq += 1;
    chatUserModalEl.setAttribute("aria-hidden", "true");
    chatUserModalEl.classList.remove("chat-user-modal--open");
  }
  function revealChatUserModal(seq) {
    if (seq !== chatUserModalOpenSeq || !chatUserModalUserId) return;
    chatUserModalEl.setAttribute("aria-hidden", "false");
    chatUserModalEl.classList.add("chat-user-modal--open");
  }
  function waitChatUserModalAsset(promise, timeoutMs) {
    if (!promise || typeof promise.then !== "function") return Promise.resolve();
    var delay = Math.max(300, Number(timeoutMs) || 2200);
    return new Promise(function (resolve) {
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        resolve();
      }
      var timer = window.setTimeout(finish, delay);
      Promise.resolve(promise).then(function () {
        window.clearTimeout(timer);
        finish();
      }).catch(function () {
        window.clearTimeout(timer);
        finish();
      });
    });
  }
  function chatUserModalIsSelf(id) {
    try {
      var myId = typeof resolveMyChatMemberId === "function" ? resolveMyChatMemberId() : "";
      if (!myId || !id) return false;
      if (typeof peerChatIdsEqual === "function") return peerChatIdsEqual(myId, id);
      return String(myId) === String(id);
    } catch (eSelf) {
      return false;
    }
  }
  function setChatUserModalBlockState(blocked, busy) {
    chatUserModalBlockedByMe = !!blocked;
    chatUserModalBlockBusy = !!busy;
    if (!modalBlockBtn) return;
    var isSelfModal = chatUserModalEl && chatUserModalEl.classList.contains("chat-user-modal--self");
    var canUse = !!(base && typeof pokerApiHasCredential === "function" && pokerApiHasCredential() && chatUserModalUserId && !isSelfModal && !chatUserModalIsSelf(chatUserModalUserId));
    modalBlockBtn.hidden = !canUse;
    if (!canUse) return;
    modalBlockBtn.disabled = chatUserModalBlockBusy;
    modalBlockBtn.classList.toggle("chat-user-modal__block-btn--active", chatUserModalBlockedByMe);
    modalBlockBtn.textContent = chatUserModalBlockBusy
      ? "Сохраняем..."
      : chatUserModalBlockedByMe
        ? "Разблокировать"
        : "Блокировать";
    modalBlockBtn.setAttribute(
      "aria-label",
      chatUserModalBlockedByMe ? "Разблокировать игрока" : "Заблокировать игрока"
    );
  }
  function rememberChatUserModalBlockState(userId, blocked) {
    if (!userId) return;
    try {
      var map = window.__pokerChatDmBlockStateByPeer || {};
      map[String(userId)] = !!blocked;
      window.__pokerChatDmBlockStateByPeer = map;
    } catch (eRememberBlock) {}
  }
  function refreshChatUserModalBlockState(id) {
    if (!modalBlockBtn || !id || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setChatUserModalBlockState(false, false);
      return Promise.resolve(false);
    }
    if (chatUserModalIsSelf(id)) {
      setChatUserModalBlockState(false, false);
      return Promise.resolve(false);
    }
    var seq = ++chatUserModalBlockSeq;
    setChatUserModalBlockState(chatUserModalBlockedByMe, true);
    return fetch(base + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ action: "dmBlockStatus", userId: id })),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (seq !== chatUserModalBlockSeq || !chatUserModalUserId || String(chatUserModalUserId) !== String(id)) return;
        if (!data || !data.ok) {
          setChatUserModalBlockState(chatUserModalBlockedByMe, false);
          return;
        }
        var blocked = data.blockedByMe === true;
        rememberChatUserModalBlockState(id, blocked);
        setChatUserModalBlockState(blocked, false);
        return true;
      })
      .catch(function () {
        if (seq !== chatUserModalBlockSeq || !chatUserModalUserId || String(chatUserModalUserId) !== String(id)) return;
        setChatUserModalBlockState(chatUserModalBlockedByMe, false);
        return false;
      });
  }
  function chatUserModalRatingNickFromData(data) {
    var raw =
      data && (data.pokerPlusNickname || data.poker21Nickname || data.ratingNick || data.nickname || data.nick);
    return String(raw || "").trim();
  }
  function syncChatUserModalRatingTab(nick) {
    chatUserModalRatingNick = String(nick || "").trim();
    var hasNick = !!chatUserModalRatingNick;
    if (modalRatingTabs) modalRatingTabs.hidden = !hasNick;
    if (modalRatingTabSum) {
      modalRatingTabSum.textContent = hasNick ? "Загрузка..." : "";
      modalRatingTabSum.hidden = !hasNick;
    }
    if (modalRatingTab) {
      modalRatingTab.hidden = !hasNick;
      modalRatingTab.disabled = !hasNick;
      modalRatingTab.setAttribute("aria-disabled", hasNick ? "false" : "true");
      if (hasNick) {
        modalRatingTab.setAttribute("title", "Общий выигрыш в турнирах " + chatUserModalRatingNick);
        modalRatingTab.setAttribute("aria-label", "Общий выигрыш в турнирах " + chatUserModalRatingNick + ". Подробнее");
      } else {
        modalRatingTab.removeAttribute("title");
        modalRatingTab.setAttribute("aria-label", "Общий выигрыш в турнирах. Подробнее");
      }
    }
  }
  function hideChatUserModalRatingArtImg() {
    if (!modalRatingArtImg) return;
    modalRatingArtImg.onerror = null;
    modalRatingArtImg.onload = null;
    modalRatingArtImg.style.display = "none";
    modalRatingArtImg.removeAttribute("src");
    modalRatingArtImg.alt = "";
    modalRatingArtImg.hidden = true;
    modalRatingArtImg.classList.remove("chat-user-modal__rating-art-img--avatar-fallback");
  }
  function showChatUserModalRatingAvatarFallback() {
    if (!modalRatingArt || !modalRatingArtImg) return Promise.resolve(false);
    hideChatUserModalRatingArtImg();
    modalRatingArt.hidden = false;
    if (modalHero) modalHero.classList.add("chat-user-modal__hero--art");
    return Promise.resolve(false);
  }
  function syncChatUserModalRatingArt(nick) {
    var art = null;
    if (nick && typeof window.pokerGetSummerRatingPlayerArt === "function") {
      art = window.pokerGetSummerRatingPlayerArt(nick);
    }
    if (!modalRatingArt || !modalRatingArtImg) return Promise.resolve(false);
    if (!art || !art.src) {
      return showChatUserModalRatingAvatarFallback();
    }
    return new Promise(function (resolve) {
      var settled = false;
      function done(ok) {
        if (settled) return;
        settled = true;
        modalRatingArtImg.onload = null;
        resolve(!!ok);
      }
      modalRatingArtImg.onload = function () {
        done(true);
      };
      modalRatingArtImg.onerror = function () {
        Promise.resolve(showChatUserModalRatingAvatarFallback()).then(function () {
          done(false);
        }).catch(function () {
          done(false);
        });
      };
      modalRatingArtImg.classList.remove("chat-user-modal__rating-art-img--avatar-fallback");
      modalRatingArtImg.src = art.src;
      modalRatingArtImg.alt = "Образ рейтинга " + (art.nick || nick);
      modalRatingArtImg.hidden = false;
      modalRatingArtImg.style.display = "";
      modalRatingArt.hidden = false;
      if (modalHero) modalHero.classList.add("chat-user-modal__hero--art");
      window.setTimeout(function () {
        if (modalRatingArtImg && modalRatingArtImg.complete && modalRatingArtImg.naturalWidth > 0) done(true);
      }, 0);
    });
  }
  function chatUserModalRatingPlaceText(place) {
    var n = place != null ? parseInt(place, 10) : 0;
    return n > 0 ? String(n) : "—";
  }
  function chatUserModalRatingPlacesHtml(places) {
    places = Array.isArray(places) ? places : [];
    var byLeague = {};
    places.forEach(function (row) {
      var league = row && row.league != null ? String(row.league).trim() : "";
      if (league !== "1" && league !== "2") league = "1";
      if (!byLeague[league]) byLeague[league] = row;
    });
    return ["1", "2"].map(function (league) {
      var row = byLeague[league];
      var placeText = row ? chatUserModalRatingPlaceText(row.place) : "—";
      return '<span class="chat-user-modal__rating-rank-line chat-user-modal__rating-rank-line--league-' + escapeHtml(league) + '">' +
        '<span class="chat-user-modal__rating-rank-league">Лига ' + escapeHtml(league) + "</span>" +
        '<span class="chat-user-modal__rating-rank-place">' + escapeHtml(placeText) + "</span>" +
        '<span class="chat-user-modal__rating-rank-place-label">место</span>' +
      "</span>";
    }).join("");
  }
  function setChatUserModalRatingRankValue(el, places) {
    if (!el) return;
    el.innerHTML = chatUserModalRatingPlacesHtml(places);
  }
  function chatUserModalSeasonLabel(season) {
    if (season === "summer") return "Лето 2026";
    if (season === "spring") return "Весна 2026";
    if (season === "winter") return "Зима 2025-2026";
    return "Рейтинг";
  }
  function chatUserModalAchievementPlaceLabel(row, season) {
    var label = chatUserModalSeasonLabel(season);
    var league = row && row.league != null ? String(row.league).trim() : "";
    return label + (league ? ", лига " + league : "");
  }
  function chatUserModalFormatAchievementRub(value) {
    var n = Number(value);
    if (!isFinite(n) || !n) return "";
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  }
  function chatUserModalWinCountText(n) {
    var raw = parseInt(n, 10) || 0;
    var v = Math.abs(raw) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return raw + " раз";
    if (d === 1) return raw + " раз";
    if (d >= 2 && d <= 4) return raw + " раза";
    return raw + " раз";
  }
  function chatUserModalVoteCountText(n) {
    var raw = parseInt(n, 10) || 0;
    var v = Math.abs(raw) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return raw + " голосов";
    if (d === 1) return raw + " голос";
    if (d >= 2 && d <= 4) return raw + " голоса";
    return raw + " голосов";
  }
  function syncChatUserModalRatingTotalReward(nick) {
    if (!modalRatingTabSum) return;
    var ratingNick = String(nick || "").trim();
    var getTotalReward = typeof window.pokerGetRatingPlayerTotalReward === "function"
      ? window.pokerGetRatingPlayerTotalReward
      : (typeof window.pokerGetWinterRatingPlayerTotalReward === "function" ? window.pokerGetWinterRatingPlayerTotalReward : null);
    if (!ratingNick || !getTotalReward) {
      modalRatingTabSum.textContent = "";
      modalRatingTabSum.hidden = true;
      return;
    }
    var text = chatUserModalFormatAchievementRub(getTotalReward(ratingNick));
    modalRatingTabSum.textContent = text;
    modalRatingTabSum.hidden = !text;
    if (modalRatingTab && text) {
      modalRatingTab.setAttribute("aria-label", "Общий выигрыш в турнирах " + text + ". Подробнее");
    }
  }
  function chatUserModalSameRatingNick(a, b) {
    if (typeof winterRatingSamePlayer === "function") return winterRatingSamePlayer(a, b);
    var an = typeof normalizeWinterNick === "function" ? normalizeWinterNick(a) : String(a || "").trim();
    var bn = typeof normalizeWinterNick === "function" ? normalizeWinterNick(b) : String(b || "").trim();
    return !!an && !!bn && an.toLowerCase() === bn.toLowerCase();
  }
  function chatUserModalIsLegendNick(nick) {
    var legends = [
      "Waaarr",
      "Coo1er91",
      "Emil13",
      "Рыбнадзор",
      "AndrushaMorf",
      "Shummmx",
      "WhiskeyClub",
      "Пряник",
      "Siropchik",
      "Хулинадо",
      "Shockin",
      "qoqoEpta",
    ];
    return legends.some(function (legendNick) {
      return chatUserModalSameRatingNick(legendNick, nick);
    });
  }
  function getChatUserModalSingleTopWinsReady() {
    function readWins() {
      return typeof window.pokerGetSingleTopWinsReady === "function"
        ? window.pokerGetSingleTopWinsReady(15)
        : Promise.resolve([]);
    }
    if (typeof window.pokerGetSingleTopWinsReady === "function") return readWins();
    if (typeof window.pokerEnsureScriptDomains === "function") {
      return Promise.resolve(window.pokerEnsureScriptDomains(["app"]))
        .then(readWins)
        .catch(function () { return []; });
    }
    return Promise.resolve([]);
  }
  function chatUserModalRaffleDate(raffle) {
    var raw = raffle && (raffle.drawnAt || raffle.completedAt || raffle.completed_at || raffle.endDate || raffle.createdAt);
    if (!raw) return null;
    var d = new Date(raw);
    return isFinite(d.getTime()) ? d : null;
  }
  function chatUserModalRaffleMonthKey(raffle) {
    var d = chatUserModalRaffleDate(raffle);
    if (!d) return "";
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }
  function chatUserModalRaffleMonthLabel(key) {
    var parts = String(key || "").split("-");
    if (parts.length !== 2) return "";
    var d = new Date(parseInt(parts[0], 10), (parseInt(parts[1], 10) || 1) - 1, 1);
    if (!isFinite(d.getTime())) return "";
    try {
      return d.toLocaleDateString("ru-RU", { month: "long" });
    } catch (eRaffleMonthLabel) {
      return String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
    }
  }
  function chatUserModalRafflePrizeAmount(prize) {
    var text = prize != null ? String(prize).replace(/\u00a0|\u202f/g, " ") : "";
    if (!text) return 0;
    var currencyMatch = text.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
    if (!currencyMatch) return 0;
    var value = parseFloat(currencyMatch[1].replace(/\s+/g, "").replace(",", "."));
    return isFinite(value) && value > 0 ? value : 0;
  }
  function chatUserModalRaffleWinnerPrizeText(raffle, winner) {
    if (winner && winner.prize) return winner.prize;
    var groupIndex = winner && winner.groupIndex != null ? parseInt(winner.groupIndex, 10) : -1;
    var groups = raffle && Array.isArray(raffle.groups) ? raffle.groups : [];
    if (groupIndex >= 0 && groups[groupIndex] && groups[groupIndex].prize) return groups[groupIndex].prize;
    return "";
  }
  function chatUserModalRaffleWinnerExpired(winner) {
    if (!winner) return false;
    var state = String(winner.winnerReadyState || "").toLowerCase();
    return winner.winnerReadyExpired === true || winner.winnerBurned === true || state === "missed" || state === "burned";
  }
  function chatUserModalRaffleAddKey(keys, type, value) {
    var raw = String(value == null ? "" : value).trim();
    if (!raw) return;
    if (type === "tg") raw = raw.replace(/^@+/, "");
    var key = type + ":" + raw.toLowerCase();
    if (keys.indexOf(key) === -1) keys.push(key);
  }
  function chatUserModalRaffleWinnerKeys(row) {
    var keys = [];
    chatUserModalRaffleAddKey(keys, "account", row && (row.accountId || row.dtId));
    chatUserModalRaffleAddKey(keys, "account", row && row.memberId);
    chatUserModalRaffleAddKey(keys, "user", row && row.userId);
    chatUserModalRaffleAddKey(keys, "p21", row && (row.p21Id || row.poker21Id || row.pokerPlusId || row.pokerPlusUserId));
    chatUserModalRaffleAddKey(keys, "tg", row && (row.telegramUsername || row.telegram || row.telegramLogin));
    chatUserModalRaffleAddKey(keys, "nick", row && (row.pokerPlusNickname || row.poker21Nickname || row.ratingNick || row.nickname || row.nick));
    chatUserModalRaffleAddKey(keys, "name", row && row.name);
    return keys;
  }
  function chatUserModalRaffleTargetKeys(ratingNick, profileData) {
    var keys = [];
    chatUserModalRaffleAddKey(keys, "user", chatUserModalUserId);
    chatUserModalRaffleAddKey(keys, "account", profileData && (profileData.accountId || profileData.dtId || profileData.memberId));
    chatUserModalRaffleAddKey(keys, "p21", profileData && (profileData.p21Id || profileData.poker21Id || profileData.pokerPlusId || profileData.pokerPlusUserId));
    chatUserModalRaffleAddKey(keys, "tg", profileData && (profileData.telegramUsername || profileData.userName || profileData.username));
    chatUserModalRaffleAddKey(keys, "nick", ratingNick);
    chatUserModalRaffleAddKey(keys, "nick", profileData && (profileData.pokerPlusNickname || profileData.poker21Nickname || profileData.ratingNick || profileData.nickname || profileData.nick));
    chatUserModalRaffleAddKey(keys, "name", profileData && (profileData.chatDisplayName || profileData.contactName || profileData.displayName || profileData.name));
    return keys;
  }
  function chatUserModalRaffleRowsMatch(row, targetKeys, ratingNick) {
    var keys = chatUserModalRaffleWinnerKeys(row);
    for (var i = 0; i < keys.length; i++) {
      if (targetKeys.indexOf(keys[i]) !== -1) return true;
    }
    var nick = String(ratingNick || "").trim();
    return !!(
      nick &&
      (
        chatUserModalSameRatingNick(row && row.pokerPlusNickname, nick) ||
        chatUserModalSameRatingNick(row && row.name, nick)
      )
    );
  }
  function chatUserModalRaffleLeaderId(row) {
    var keys = chatUserModalRaffleWinnerKeys(row);
    return keys.find(function (key) {
      return key.indexOf("p21:") === 0 || key.indexOf("account:") === 0 || key.indexOf("user:") === 0;
    }) || keys[0] || "";
  }
  function getChatUserModalRafflesReady() {
    try {
      var cached = window._rafflesCache && window._rafflesCache.data && window._rafflesCache.data.ok ? window._rafflesCache.data : null;
      if (cached) return Promise.resolve(Array.isArray(cached.raffles) ? cached.raffles : []);
    } catch (eCachedRaffles) {}
    if (!base || typeof fetch !== "function") return Promise.resolve([]);
    var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    return fetch(base + "/api/raffles" + query + "&_t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          try { window._rafflesCache = { data: data, time: Date.now() }; } catch (eSetRafflesCache) {}
          return Array.isArray(data.raffles) ? data.raffles : [];
        }
        return [];
      })
      .catch(function () { return []; });
  }
  function getChatUserModalRaffleLuckReady(ratingNick, profileData) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData);
    if (!targetKeys.length && !String(ratingNick || "").trim()) return Promise.resolve([]);
    return getChatUserModalRafflesReady().then(function (raffles) {
      var now = Date.now();
      var byMonth = {};
      (Array.isArray(raffles) ? raffles : []).forEach(function (raffle) {
        if (!raffle || raffle.status === "cancelled") return;
        var d = chatUserModalRaffleDate(raffle);
        if (!d || d.getTime() > now) return;
        var key = chatUserModalRaffleMonthKey(raffle);
        if (!key) return;
        if (!byMonth[key]) byMonth[key] = {};
        (Array.isArray(raffle.winners) ? raffle.winners : []).forEach(function (winner) {
          if (chatUserModalRaffleWinnerExpired(winner)) return;
          var id = chatUserModalRaffleLeaderId(winner);
          if (!id) return;
          if (!byMonth[key][id]) byMonth[key][id] = { row: winner, count: 0, totalPrize: 0 };
          byMonth[key][id].count += 1;
          byMonth[key][id].totalPrize += chatUserModalRafflePrizeAmount(chatUserModalRaffleWinnerPrizeText(raffle, winner));
        });
      });
      return Object.keys(byMonth).sort().reverse().reduce(function (items, key) {
        var rows = Object.keys(byMonth[key]).map(function (id) {
          return byMonth[key][id];
        }).sort(function (a, b) {
          if (b.count !== a.count) return b.count - a.count;
          if ((b.totalPrize || 0) !== (a.totalPrize || 0)) return (b.totalPrize || 0) - (a.totalPrize || 0);
          return String(chatUserModalRaffleLeaderId(a.row)).localeCompare(String(chatUserModalRaffleLeaderId(b.row)), "ru");
        });
        rows.slice(0, 3).forEach(function (leader, index) {
          if (!chatUserModalRaffleRowsMatch(leader.row, targetKeys, ratingNick)) return;
          var amount = chatUserModalFormatAchievementRub(leader.totalPrize);
          var month = chatUserModalRaffleMonthLabel(key);
          items.push({
            label:
              "Топ" + String(index + 1) +
              (month ? " " + month : "") +
              ": " + chatUserModalWinCountText(leader.count) +
              (amount ? ", " + amount : ""),
          });
        });
        return items;
      }, []);
    });
  }
  function chatUserModalClubChoiceRows() {
    var source = window.POKER_CLUB_CHOICE_ACHIEVEMENTS || window.pokerClubChoiceAchievements || [];
    return Array.isArray(source) ? source : [];
  }
  function chatUserModalEnsureClubChoiceRowsReady() {
    if (window.POKER_CLUB_CHOICE_ACHIEVEMENTS || window.pokerClubChoiceAchievements) return Promise.resolve(true);
    if (chatUserModalClubChoiceScriptReady) return chatUserModalClubChoiceScriptReady;
    chatUserModalClubChoiceScriptReady = new Promise(function (resolve) {
      if (typeof document === "undefined") {
        resolve(false);
        return;
      }
      var script = document.createElement("script");
      script.src = "./club-choice-achievements.js?v=3.593";
      script.async = false;
      script.onload = function () { resolve(true); };
      script.onerror = function () { resolve(false); };
      (document.head || document.documentElement).appendChild(script);
    });
    return chatUserModalClubChoiceScriptReady;
  }
  function chatUserModalClubChoiceWinners(row) {
    if (!row || typeof row !== "object") return [];
    if (Array.isArray(row.winners)) return row.winners;
    if (Array.isArray(row.top)) return row.top;
    if (Array.isArray(row.players)) return row.players;
    return [];
  }
  function chatUserModalClubChoiceMonthKey(row) {
    return String(row && (row.month || row.monthKey || row.period || row.key) || "").trim();
  }
  function getChatUserModalClubChoiceReady(ratingNick, profileData) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData);
    if (!targetKeys.length && !String(ratingNick || "").trim()) return Promise.resolve([]);
    return chatUserModalEnsureClubChoiceRowsReady().then(function () {
      var rows = chatUserModalClubChoiceRows();
      return rows.reduce(function (list, monthRow) {
        var monthKey = chatUserModalClubChoiceMonthKey(monthRow);
        var month = chatUserModalRaffleMonthLabel(monthKey);
        chatUserModalClubChoiceWinners(monthRow).slice().sort(function (a, b) {
          var pa = parseInt(a && a.place, 10) || 999;
          var pb = parseInt(b && b.place, 10) || 999;
          if (pa !== pb) return pa - pb;
          return (parseInt(b && b.votes, 10) || 0) - (parseInt(a && a.votes, 10) || 0);
        }).slice(0, 2).forEach(function (winner, index) {
          if (!chatUserModalRaffleRowsMatch(winner, targetKeys, ratingNick)) return;
          var place = parseInt(winner && winner.place, 10) || (index + 1);
          var votes = winner && winner.votes != null ? parseInt(winner.votes, 10) : null;
          list.push({
            label:
              "Топ" + String(place) +
              (month ? " " + month : "") +
              (votes != null && isFinite(votes) ? ": " + chatUserModalVoteCountText(votes) : ""),
          });
        });
        return list;
      }, []);
    });
  }
  function chatUserModalAchievementMeta(title) {
    var key = String(title || "").toLowerCase();
    if (key.indexOf("выбор клуба") >= 0) return { mod: "club-choice", label: "ВЫБОР<br>КЛУБА", img: "./assets/home-hall-of-fame-medal.png" };
    if (key.indexOf("счастлив") >= 0) return { mod: "lucky-month", label: "СЧАСТЛИВЧИК<br>МЕСЯЦА", img: "./assets/home-menu-icon-raffle-tickets.png" };
    if (key.indexOf("топ10") >= 0) return { mod: "top10", label: "ТОП-10<br>РЕЙТИНГА", img: "./assets/chat-profile-achievement-top10.png" };
    if (key.indexOf("занос") >= 0) return { mod: "top-win", label: "ТОП<br>ЗАНОС<br>2026", img: "./assets/chat-profile-achievement-top-win.png" };
    if (key.indexOf("легенд") >= 0) return { mod: "legend", label: "ЛЕГЕНДА<br>КЛУБА", img: "./assets/chat-profile-achievement-legend.png" };
    if (key.indexOf("весн") >= 0) return { mod: "cup-spring", label: "КУБОК<br>ВЕСНЫ", img: "./assets/chat-profile-achievement-cup-spring.png" };
    if (key.indexOf("зим") >= 0) return { mod: "cup-winter", label: "КУБОК<br>ЗИМЫ", img: "./assets/chat-profile-achievement-cup-winter.png" };
    if (key.indexOf("лет") >= 0) return { mod: "cup-summer", label: "КУБОК<br>ЛЕТА", img: "./assets/chat-profile-achievement-cup-summer.png" };
    return { mod: "cup", label: "КУБОК<br>РЕЙТИНГА", img: "./assets/chat-profile-achievement-cup.png" };
  }
  function chatUserModalAchievementCardHtml(icon, title, rows, options) {
    options = options || {};
    rows = Array.isArray(rows) ? rows : [];
    var meta = chatUserModalAchievementMeta(title);
    var stars = rows.map(function () { return "★"; }).join(" ");
    var details = rows.map(function (item) {
      return '<span class="chat-user-modal__achievement-detail">' +
        escapeHtml(item.label || chatUserModalAchievementPlaceLabel(item.row, item.season)) +
        "</span>";
    }).join("") || '<span class="chat-user-modal__achievement-detail">' + escapeHtml(options.placeholder || "—") + "</span>";
    var isLocked = options.locked === true || !rows.length;
    var attrs = "";
    if (options.action) {
      attrs += ' role="button" tabindex="0" data-chat-achievement-action="' + escapeHtml(options.action) + '"';
      attrs += ' aria-label="' + escapeHtml(options.ariaLabel || title) + '"';
    }
    return '<article class="chat-user-modal__achievement chat-user-modal__achievement--' + escapeHtml(meta.mod) +
      (options.extraClass ? " " + escapeHtml(options.extraClass) : "") +
      (isLocked ? " chat-user-modal__achievement--locked" : "") + '"' + attrs + ">" +
      '<span class="chat-user-modal__achievement-title">' + meta.label + "</span>" +
      '<span class="chat-user-modal__achievement-icon" aria-hidden="true"><img src="' + escapeHtml(meta.img) + '" alt="" loading="lazy" decoding="async" /></span>' +
      '<span class="chat-user-modal__achievement-main">' +
        '<span class="chat-user-modal__achievement-details">' + details + "</span>" +
      "</span>" +
      '<span class="chat-user-modal__achievement-stars" aria-hidden="true">' + escapeHtml(stars.trim()) + "</span>" +
    "</article>";
  }
  function chatUserModalSeasonCupRows(seasonKey, rows) {
    if (seasonKey === "summer") return [];
    rows = Array.isArray(rows) ? rows : [];
    return rows.reduce(function (items, row) {
      var place = row && row.place != null ? parseInt(row.place, 10) : 0;
      if (!place || place < 1 || place > 3) return items;
      var label = String(place) + " место";
      if (seasonKey === "spring" && row.league) label += ", Лига " + row.league;
      else if (seasonKey === "winter") label += ", зима";
      items.push({ label: label, row: row, season: seasonKey });
      return items;
    }, []);
  }
  function chatUserModalSummerCupCardHtml() {
    return chatUserModalAchievementCardHtml("🏆", "Кубок лета", [], {
      locked: true,
      placeholder: "Сейчас идет",
      action: "summer-rating",
      ariaLabel: "Кубок лета сейчас идет. Открыть рейтинг лета",
      extraClass: "chat-user-modal__achievement--season-cup chat-user-modal__achievement--season-cup-current",
    });
  }
  function renderChatUserModalAchievementsLoading() {
    if (!modalAchievements || !modalAchievementsList) return;
    modalAchievementsList.innerHTML =
      '<div class="chat-user-modal__achievements-loading" role="status" aria-live="polite">' +
        "Идет загрузка достижений..." +
      "</div>";
    modalAchievements.hidden = false;
  }
  function renderChatUserModalAchievements(results, ratingNick) {
    if (!modalAchievements || !modalAchievementsList) return;
    var luckyMonth = Array.isArray(results && results[4]) ? results[4] : [];
    var clubChoice = Array.isArray(results && results[5]) ? results[5] : [];
    if (!String(ratingNick || "").trim() && !luckyMonth.length && !clubChoice.length) {
      modalAchievementsList.innerHTML = chatUserModalSummerCupCardHtml();
      modalAchievements.hidden = false;
      return;
    }
    var seasons = [
      { key: "summer", rows: results && results[0] },
      { key: "spring", rows: results && results[1] },
      { key: "winter", rows: results && results[2] },
    ];
    var top10 = [];
    var topWins = [];
    var legends = chatUserModalIsLegendNick(ratingNick)
      ? [{ label: "Легенда Два туза" }]
      : [];
    seasons.forEach(function (season) {
      (Array.isArray(season.rows) ? season.rows : []).forEach(function (row) {
        var place = row && row.place != null ? parseInt(row.place, 10) : 0;
        if (!place || place < 1) return;
        var item = { season: season.key, row: row };
        if (place <= 10) top10.push(item);
      });
    });
    (Array.isArray(results && results[3]) ? results[3] : []).forEach(function (row, index) {
      if (!chatUserModalSameRatingNick(row && row.nick, ratingNick)) return;
      var amount = chatUserModalFormatAchievementRub(row && row.reward);
      topWins.push({
        label: String(index + 1) + " место" + (amount ? ", " + amount : ""),
      });
    });
    var html =
      chatUserModalAchievementCardHtml("🏆", "Кубок весны", chatUserModalSeasonCupRows("spring", results && results[1]), {
        extraClass: "chat-user-modal__achievement--season-cup",
      }) +
      chatUserModalAchievementCardHtml("🏆", "Кубок зимы", chatUserModalSeasonCupRows("winter", results && results[2]), {
        extraClass: "chat-user-modal__achievement--season-cup",
      }) +
      chatUserModalAchievementCardHtml("★", "Легенда", legends) +
      chatUserModalAchievementCardHtml("₽", "Топ занос", topWins) +
      chatUserModalAchievementCardHtml("🎟", "Счастливчик месяца", luckyMonth, {
        placeholder: "Топ-3 месяца",
      }) +
      chatUserModalAchievementCardHtml("◆", "Выбор клуба", clubChoice, {
        placeholder: "Топ-2 месяца",
      }) +
      chatUserModalAchievementCardHtml("10", "Топ10", top10) +
      chatUserModalSummerCupCardHtml();
    modalAchievementsList.innerHTML = html;
    modalAchievements.hidden = !html;
  }
  function syncChatUserModalRatingRanks(nick) {
    chatUserModalRanksSeq += 1;
    var seq = chatUserModalRanksSeq;
    var ratingNick = String(nick || "").trim();
    var hasNick = !!ratingNick;
    if (modalRatingRanks) modalRatingRanks.hidden = !hasNick;
    if (modalSummerRank) modalSummerRank.textContent = hasNick ? "Загрузка..." : "—";
    if (modalSpringRank) modalSpringRank.textContent = hasNick ? "Загрузка..." : "—";
    if (modalWinterRank) modalWinterRank.textContent = hasNick ? "Загрузка..." : "—";
    renderChatUserModalAchievementsLoading();
    if (!hasNick) {
      return Promise.all([
        getChatUserModalRaffleLuckReady("", chatUserModalAchievementIdentity),
        getChatUserModalClubChoiceReady("", chatUserModalAchievementIdentity),
      ]).then(function (extraRows) {
        if (seq !== chatUserModalRanksSeq) return;
        var results = [null, null, null, null, extraRows && extraRows[0], extraRows && extraRows[1]];
        renderChatUserModalAchievements(results, "");
        return results;
      }).catch(function () {
        if (seq === chatUserModalRanksSeq) renderChatUserModalAchievements(null);
        return [];
      });
    }
    var getPlaces = typeof window.pokerGetTournamentRatingPlacesReady === "function"
      ? window.pokerGetTournamentRatingPlacesReady
      : null;
    if (!getPlaces) {
      if (modalSummerRank) modalSummerRank.textContent = "—";
      if (modalSpringRank) modalSpringRank.textContent = "—";
      if (modalWinterRank) modalWinterRank.textContent = "—";
      return Promise.all([
        getChatUserModalRaffleLuckReady(ratingNick, chatUserModalAchievementIdentity),
        getChatUserModalClubChoiceReady(ratingNick, chatUserModalAchievementIdentity),
      ]).then(function (extraRows) {
        if (seq !== chatUserModalRanksSeq) return;
        var results = [null, null, null, null, extraRows && extraRows[0], extraRows && extraRows[1]];
        renderChatUserModalAchievements(results, ratingNick);
        return results;
      }).catch(function () {
        if (seq === chatUserModalRanksSeq) renderChatUserModalAchievements(null);
        return [];
      });
    }
    function getSeasonPlacesReady(season) {
      if ((season === "summer" || season === "spring") && typeof window.pokerEnsureScriptDomains === "function") {
        return Promise.resolve(window.pokerEnsureScriptDomains(["app"]))
          .then(function () { return getPlaces(ratingNick, season); })
          .catch(function () { return getPlaces(ratingNick, season); });
      }
      return getPlaces(ratingNick, season);
    }
    return Promise.all([
      getSeasonPlacesReady("summer"),
      getSeasonPlacesReady("spring"),
      getSeasonPlacesReady("winter"),
      getChatUserModalSingleTopWinsReady(),
      getChatUserModalRaffleLuckReady(ratingNick, chatUserModalAchievementIdentity),
      getChatUserModalClubChoiceReady(ratingNick, chatUserModalAchievementIdentity),
    ]).then(function (results) {
      if (seq !== chatUserModalRanksSeq) return;
      setChatUserModalRatingRankValue(modalSummerRank, results && results[0]);
      setChatUserModalRatingRankValue(modalSpringRank, results && results[1]);
      setChatUserModalRatingRankValue(modalWinterRank, results && results[2]);
      syncChatUserModalRatingTotalReward(ratingNick);
      renderChatUserModalAchievements(results, ratingNick);
    }).catch(function () {
      if (seq !== chatUserModalRanksSeq) return;
      if (modalSummerRank) modalSummerRank.textContent = "—";
      if (modalSpringRank) modalSpringRank.textContent = "—";
      if (modalWinterRank) modalWinterRank.textContent = "—";
      renderChatUserModalAchievements(null);
      return [];
    });
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
  function updateChatUserModalFriendState(isFriend, displayTitle, requestOutgoing) {
    if (chatUserModalEl.classList.contains("chat-user-modal--self")) {
      if (modalFriendRow) modalFriendRow.style.display = "none";
      if (modalAddFriend) modalAddFriend.style.display = "none";
      if (modalEditFriendName) modalEditFriendName.style.display = "none";
      if (modalRemoveFriend) modalRemoveFriend.style.display = "none";
      if (modalFriendMsg) {
        modalFriendMsg.textContent = "";
        modalFriendMsg.style.display = "none";
      }
      return;
    }
    var pending = !isFriend && !!requestOutgoing;
    if (modalFriendRow) modalFriendRow.style.display = "";
    if (modalAddFriend) {
      modalAddFriend.style.display = isFriend ? "none" : "";
      modalAddFriend.disabled = !!isFriend;
      modalAddFriend.textContent = pending ? "Отменить заявку" : "Добавить в друзья";
      modalAddFriend.setAttribute("data-chat-user-friend-pending", pending ? "1" : "0");
      modalAddFriend.classList.toggle("chat-user-modal__friend-btn--added", !!isFriend);
      modalAddFriend.classList.toggle("chat-user-modal__friend-btn--pending", pending);
    }
    if (modalEditFriendName) {
      modalEditFriendName.style.display = "none";
      modalEditFriendName.disabled = true;
    }
    if (modalRemoveFriend) {
      modalRemoveFriend.style.display = isFriend ? "inline-flex" : "none";
      modalRemoveFriend.disabled = false;
    }
    if (modalFriendMsg) {
      if (isFriend) {
        modalFriendMsg.textContent = "Теперь " + (displayTitle || "Игрок") + " ваш друг";
        modalFriendMsg.style.display = "";
      } else if (pending) {
        modalFriendMsg.textContent = "Заявка в друзья отправлена";
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
    function currentRespectText() {
      var raw = modalRespectVal ? String(modalRespectVal.textContent || "").trim() : "";
      return raw && raw !== "\u2014" ? raw : "\u2014";
    }
    function respectHintText(prefix) {
      return prefix + ". Сейчас уважение: " + currentRespectText();
    }
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
        modalRespectHint.textContent = respectHintText("Вы уже подняли уважение игрока");
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
        modalRespectHint.textContent = respectHintText("Вы уменьшили уважение игроку");
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
  function chatUserModalBool(value) {
    return value === true || value === 1 || value === "1" || value === "true";
  }
  function chatUserModalStatsVisibility(data) {
    var visibility = data && data.pokerPlusStatsVisibility && typeof data.pokerPlusStatsVisibility === "object" ? data.pokerPlusStatsVisibility : null;
    if (visibility) {
      return {
        cash: chatUserModalBool(visibility.cash),
        mtt: chatUserModalBool(visibility.mtt),
        sng: chatUserModalBool(visibility.sng),
      };
    }
    var visible = data && data.pokerPlusStatsVisible === true;
    return { cash: visible, mtt: visible, sng: visible };
  }
  function renderChatUserModalPlayerStats(data) {
    if (!modalPlayerStats) return;
    var visibility = chatUserModalStatsVisibility(data);
    if (!data || !visibility.cash && !visibility.mtt && !visibility.sng) {
      modalPlayerStats.innerHTML =
        '<p class="chat-user-modal__player-stats-private">Статистика данного игрока является приватной и доступна только секретным службам</p>';
      return;
    }
    var st = data.pokerPlusStats && typeof data.pokerPlusStats === "object" ? data.pokerPlusStats : {};
    var html = "";
    if (visibility.cash) {
      html +=
        chatUserModalStatHtml("Рейк", st.fee, "") +
        chatUserModalStatHtml("Раздачи", st.hands, "") +
        chatUserModalOptionalStatHtml("BB", st.bb, "") +
        chatUserModalNonNegativeStatHtml("Кеш", st.winnings, "") +
        chatUserModalOptionalNonNegativeStatHtml("OFC", st.ofcWinnings, "");
    }
    if (visibility.mtt) {
      html +=
        chatUserModalNonNegativeStatHtml("MTT", st.mttWinnings, "") +
        chatUserModalOptionalStatHtml("MTT р.", st.mttRound, "") +
        chatUserModalOptionalStatHtml("MTT игр", st.mttCount, "") +
        chatUserModalOptionalStatHtml("MTT ITM", st.mttItmCount, "") +
        chatUserModalOptionalStatHtml("MTT 1-е", st.mttFirstCount, "");
    }
    if (visibility.sng) {
      html +=
        chatUserModalNonNegativeStatHtml("SNG", st.sngWinnings, "") +
        chatUserModalOptionalStatHtml("SNG р.", st.sngRound, "") +
        chatUserModalOptionalStatHtml("SNG игр", st.sngCount, "") +
        chatUserModalOptionalStatHtml("SNG ITM", st.sngItmCount, "") +
        chatUserModalOptionalStatHtml("SNG 1-е", st.sngFirstCount, "");
    }
    modalPlayerStats.innerHTML =
      html || '<p class="chat-user-modal__player-stats-private">Статистика данного игрока является приватной и доступна только секретным службам</p>';
  }
  function applyChatUserModalStatusLevel(level) {
    var rawLevel = level != null ? String(level).trim() : "";
    if (!rawLevel) return false;
    if (modalLevelText) {
      modalLevelText.innerHTML = '<span class="chat-user-modal__level-num">' +
        escapeHtml(rawLevel) +
        '</span><span class="chat-user-modal__level-rest">из 100</span>';
      modalLevelText.hidden = false;
    }
    var modalLevel = Math.min(100, Math.max(0, parseInt(rawLevel, 10) || 0));
    if (modalStatusCards[0]) modalStatusCards[0].textContent = pokerProfileStatusCardLabel(modalLevel);
    if (modalStatusCards[1]) modalStatusCards[1].textContent = pokerProfileStatusCardLabel(Math.min(100, modalLevel + 1));
    if (modalStatusSection) modalStatusSection.hidden = false;
    pokerProfileApplyStatusFish(modalLevelFish, rawLevel);
    if (modalLevelFish) modalLevelFish.hidden = false;
    pokerProfileApplyStatusFish(modalStatusFish, rawLevel);
    if (modalTitleFish) {
      var modalFishLevel = pokerProfileStatusFishLevel(rawLevel);
      modalTitleFish.src = pokerProfileStatusFishSrc(modalFishLevel);
      modalTitleFish.setAttribute("data-status-fish-level", String(modalFishLevel));
      modalTitleFish.hidden = false;
    }
    return true;
  }
  function openChatUserModalById(id, name, avatarUrl, options) {
    var userName = name || "Игрок";
    if (!id || !chatUserModalEl) {
      if (id) openConversation(id, userName, avatarUrl);
      return;
    }
    var openOptions = options && typeof options === "object" ? options : {};
    var fallbackStatusLevel = openOptions.level != null && openOptions.level !== "" ? String(openOptions.level).trim() : "";
    var fallbackRatingNick = openOptions.ratingNick != null ? String(openOptions.ratingNick).trim() : "";
    var openingSelfProfile = openOptions.selfProfile === true || chatUserModalIsSelf(id);
    chatUserModalUserId = id;
    chatUserModalUserName = userName;
    chatUserModalHeroAvatarUrl = String(avatarUrl || "").trim();
    var openSeq = ++chatUserModalOpenSeq;
    chatUserModalPeerLogin = "";
    chatUserModalContactName = "";
    chatUserModalAchievementIdentity = null;
    var cachedBlockedByMe = false;
    try {
      cachedBlockedByMe = !!(window.__pokerChatDmBlockStateByPeer && window.__pokerChatDmBlockStateByPeer[String(id)] === true);
    } catch (eCachedBlockState) {}
    chatUserModalBlockedByMe = cachedBlockedByMe;
    chatUserModalEl.classList.toggle("chat-user-modal--self", openingSelfProfile);
    if (modalWriteBtn) modalWriteBtn.style.display = openingSelfProfile ? "none" : "";
    if (modalRespectActions) modalRespectActions.style.display = openingSelfProfile ? "none" : "";
    setChatUserModalBlockState(cachedBlockedByMe, true);
    syncChatUserModalRatingTab("");
    chatUserModalRanksSeq += 1;
    if (modalRatingRanks) modalRatingRanks.hidden = true;
    if (modalSummerRank) modalSummerRank.textContent = "—";
    if (modalSpringRank) modalSpringRank.textContent = "—";
    if (modalWinterRank) modalWinterRank.textContent = "—";
    renderChatUserModalAchievementsLoading();
    syncChatUserModalRatingArt("");
    if (modalLoginSub) {
      modalLoginSub.textContent = "";
      modalLoginSub.hidden = true;
    }
    if (modalLastSeen) {
      modalLastSeen.textContent = "";
      modalLastSeen.hidden = true;
    }
    if (modalStatusXp) {
      modalStatusXp.textContent = "";
      modalStatusXp.hidden = true;
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
    syncChatUserModalRatingArt("");
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
    if (fallbackStatusLevel) applyChatUserModalStatusLevel(fallbackStatusLevel);
    if (typeof updateChatUserModalRespectButtons === "function") {
      if (modalRespectUp) modalRespectUp.disabled = true;
      if (modalRespectDown) modalRespectDown.disabled = true;
    }
    if (modalRespectHint) {
      modalRespectHint.textContent = "";
      modalRespectHint.hidden = true;
    }
    if (typeof updateChatUserModalFriendState === "function") updateChatUserModalFriendState(false, null);
    if (modalPersonalBlock) modalPersonalBlock.classList.add("chat-user-modal__personal-block--hidden");
    var initialBlockPromise = openingSelfProfile ? Promise.resolve(false) : refreshChatUserModalBlockState(id);
    var profileUrl = openingSelfProfile
      ? base + "/api/users" + pokerApiAuthQuery("?")
      : base + "/api/users?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
    var profilePromise = fetch(profileUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        if (modalP21) modalP21.textContent = "";
        var personalText = (data && data.personalInfo != null) ? String(data.personalInfo).trim() : "";
        if (modalPersonal) modalPersonal.textContent = personalText || "—";
        if (modalPersonalBlock) {
          if (personalText) modalPersonalBlock.classList.remove("chat-user-modal__personal-block--hidden");
          else modalPersonalBlock.classList.add("chat-user-modal__personal-block--hidden");
        }
        var modalStatusLevel = data && data.level != null ? data.level : (fallbackStatusLevel || null);
        if (!applyChatUserModalStatusLevel(modalStatusLevel) && modalLevelText) {
          modalLevelText.textContent = openingSelfProfile
            ? "Обновите свой уровень во вкладке Профиль Poker21"
            : "Уровень Poker21 не обновлен";
          modalLevelText.hidden = false;
        }
        syncChatUserModalStatusXp(data && data.statusPoints != null ? data.statusPoints : null);
        if (modalStatusScale && data && data.statusValue != null) modalStatusScale.style.setProperty("--status-value", String(data.statusValue));
        renderChatUserModalPlayerStats(data);
        var ratingRanksPromise = Promise.resolve([]);
        var ratingNick = data && data.ok ? chatUserModalRatingNickFromData(data) : "";
        ratingNick = ratingNick || fallbackRatingNick;
        chatUserModalAchievementIdentity = data && data.ok ? data : null;
        syncChatUserModalRatingTab(ratingNick);
        ratingRanksPromise = syncChatUserModalRatingRanks(ratingNick) || Promise.resolve([]);
        var ratingArtPromise = syncChatUserModalRatingArt(ratingNick) || Promise.resolve(false);
        if (data && data.ok) {
          if (modalVerifiedBadge) modalVerifiedBadge.classList.toggle("chat-user-modal__verified--hidden", data.pokerPlusVerified !== true);
          var titleDisp = syncChatUserModalTitleFromProfileData(data, userName);
          if (modalAvatar && modalAvatarPlaceholder && modalAvatar.style.display !== "none") {
            modalAvatar.alt = titleDisp;
          } else if (modalAvatarPlaceholder) {
            modalAvatarPlaceholder.textContent = (titleDisp || "И")[0];
          }
          if (typeof updateChatUserModalFriendState === "function") updateChatUserModalFriendState(!!data.isFriend, titleDisp, !!data.friendRequestOutgoing);
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
        return Promise.all([
          waitChatUserModalAsset(ratingRanksPromise, 2600),
          waitChatUserModalAsset(ratingArtPromise, 2600),
        ]).then(function () { return null; });
      })
      .catch(function () {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        if (modalPersonal) modalPersonal.textContent = "—";
        if (modalPlayerStats) renderChatUserModalPlayerStats(null);
        if (modalLastSeen) modalLastSeen.hidden = true;
        applyChatUserModalStatusLevel(fallbackStatusLevel);
        syncChatUserModalRatingTab(fallbackRatingNick);
        var fallbackRanksPromise = syncChatUserModalRatingRanks(fallbackRatingNick);
        var fallbackArtPromise = syncChatUserModalRatingArt(fallbackRatingNick);
        return Promise.all([
          waitChatUserModalAsset(fallbackRanksPromise, 1800),
          waitChatUserModalAsset(fallbackArtPromise, 1800),
        ]).then(function () { return null; });
      });
    var respectPromise = fetch(base + "/api/respect?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        if (modalRespectVal) modalRespectVal.textContent = (data && data.score !== undefined && data.score !== null) ? String(data.score) : "—";
        if (data && data.ok && typeof updateChatUserModalRespectButtons === "function") updateChatUserModalRespectButtons(data.myVote || null);
      })
      .catch(function () {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        if (typeof updateChatUserModalRespectButtons === "function") updateChatUserModalRespectButtons(null);
      });
    Promise.all([
      profilePromise.catch(function () {}),
      respectPromise.catch(function () {}),
      Promise.resolve(initialBlockPromise).catch(function () {}),
    ]).then(function () {
      revealChatUserModal(openSeq);
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
  if (modalBlockBtn) {
    modalBlockBtn.addEventListener("click", function () {
      if (!chatUserModalUserId || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential() || chatUserModalBlockBusy) return;
      var uid = chatUserModalUserId;
      var nextBlocked = !chatUserModalBlockedByMe;
      if (nextBlocked) {
        var ok = true;
        try {
          ok = typeof window.confirm === "function"
            ? window.confirm("Заблокировать игрока? Он не сможет писать вам в личные сообщения.")
            : true;
        } catch (eConfirmBlock) {
          ok = true;
        }
        if (!ok) return;
      }
      setChatUserModalBlockState(chatUserModalBlockedByMe, true);
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: nextBlocked ? "dmBlock" : "dmUnblock", userId: uid })),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа" }; });
        })
        .then(function (data) {
          if (!chatUserModalUserId || String(chatUserModalUserId) !== String(uid)) return;
          if (data && data.ok) {
            var blocked = data.blockedByMe === true;
            rememberChatUserModalBlockState(uid, blocked);
            setChatUserModalBlockState(blocked, false);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
            if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
            if (tg && tg.showAlert) tg.showAlert(blocked ? "Игрок заблокирован" : "Игрок разблокирован");
          } else {
            setChatUserModalBlockState(chatUserModalBlockedByMe, false);
            if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          }
        })
        .catch(function () {
          if (!chatUserModalUserId || String(chatUserModalUserId) !== String(uid)) return;
          setChatUserModalBlockState(chatUserModalBlockedByMe, false);
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }
  if (modalRatingTab) {
    modalRatingTab.addEventListener("click", function () {
      var nick = String(chatUserModalRatingNick || "").trim();
      if (!nick || modalRatingTab.disabled) return;
      if (typeof window.pokerOpenLatestTournamentRatingPlayerModal === "function") {
        window.pokerOpenLatestTournamentRatingPlayerModal(nick);
      } else if (typeof openWinterRatingPlayerModalReady === "function") {
        openWinterRatingPlayerModalReady(nick, { season: "summer" });
      }
    });
  }
  function openChatUserModalSummerRatingFromAchievement() {
    closeChatUserModal();
    if (typeof setView === "function") setView("summer-rating");
  }
  if (modalAchievementsList) {
    modalAchievementsList.addEventListener("click", function (e) {
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-action]") : null;
      if (!card || card.getAttribute("data-chat-achievement-action") !== "summer-rating") return;
      openChatUserModalSummerRatingFromAchievement();
    });
    modalAchievementsList.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-action]") : null;
      if (!card || card.getAttribute("data-chat-achievement-action") !== "summer-rating") return;
      e.preventDefault();
      openChatUserModalSummerRatingFromAchievement();
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
                if (modalRespectVal && data2.score != null) modalRespectVal.textContent = String(data2.score);
                updateChatUserModalRespectButtons(data2.myVote || null);
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
      var isPendingCancel = modalAddFriend.getAttribute("data-chat-user-friend-pending") === "1";
      if (isPendingCancel) {
        modalAddFriend.disabled = true;
        fetch(base + "/api/friends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ action: "cancel", targetUserId: chatUserModalUserId })),
        })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            modalAddFriend.disabled = false;
            if (d && d.ok) {
              try {
                var set = window.__pokerChatOutgoingFriendRequestIdsSet || {};
                delete set[String(chatUserModalUserId)];
                if (typeof normalizePeerIdForChat === "function") {
                  var nxUid = normalizePeerIdForChat(chatUserModalUserId);
                  if (nxUid) delete set[nxUid];
                }
                for (var key in set) {
                  if (set[key] && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(key, chatUserModalUserId)) delete set[key];
                }
                window.__pokerChatOutgoingFriendRequestIdsSet = set;
              } catch (eClearModalReq) {}
              updateChatUserModalFriendState(false, chatUserModalUserName || chatUserModalPeerLogin || "Игрок", false);
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (typeof window.chatRefresh === "function") window.chatRefresh();
              if (tg && tg.showAlert) tg.showAlert(d.message || "Заявка отменена");
              else if (typeof alert === "function") alert(d.message || "Заявка отменена");
            } else if (tg && tg.showAlert) {
              tg.showAlert((d && d.error) || "Ошибка");
            }
          })
          .catch(function () {
            modalAddFriend.disabled = false;
          });
        return;
      }
      var contactName = (chatUserModalUserName || chatUserModalPeerLogin || "").trim();
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
          modalAddFriend.disabled = false;
          if (d && d.ok) {
            if (d.pending && typeof window.pokerApplyLocalOutgoingFriendRequest === "function") {
              window.pokerApplyLocalOutgoingFriendRequest(chatUserModalUserId);
            }
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
            if (d.pending) updateChatUserModalFriendState(false, chatUserModalUserName || chatUserModalPeerLogin || "Игрок", true);
            if (tg && tg.showAlert) tg.showAlert(d.message || "Заявка отправлена");
            else if (typeof alert === "function") alert(d.message || "Заявка отправлена");
          } else {
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

(function initChatUserModalFallbackOpen() {
  function ensureReady(opts) {
    if (
      typeof window.openChatUserModalById === "function" &&
      window.openChatUserModalById.__pokerFallback !== true
    ) {
      return true;
    }
    if (typeof initChatUserModals !== "function") return false;
    if (!document.getElementById("chatUserModal")) return false;
    try {
      initChatUserModals(opts || {
        base: typeof getApiBase === "function" ? getApiBase() : "",
        tg: window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null,
      });
    } catch (eInitUserModal) {}
    return (
      typeof window.openChatUserModalById === "function" &&
      window.openChatUserModalById.__pokerFallback !== true
    );
  }

  window.pokerEnsureChatUserModalReady = ensureReady;

  window.pokerOpenChatUserModalSafe = function (id, name, avatarUrl, opts) {
    if (!id) return Promise.resolve(false);
    if (ensureReady()) {
      window.openChatUserModalById(id, name || "Игрок", avatarUrl || "", opts);
      return Promise.resolve(true);
    }
    if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
      var ready = null;
      try {
        ready = window.pokerEnsureGlobalModalsHtml();
      } catch (eEnsureGlobalModal) {
        ready = null;
      }
      if (ready && typeof ready.then === "function") {
        return ready.then(function () {
          if (!ensureReady()) return false;
          window.openChatUserModalById(id, name || "Игрок", avatarUrl || "", opts);
          return true;
        }).catch(function () {
          return false;
        });
      }
    }
    return Promise.resolve(false);
  };

  if (typeof window.openChatUserModalById !== "function") {
    var fallbackOpenChatUserModalById = function (id, name, avatarUrl, opts) {
      return window.pokerOpenChatUserModalSafe(id, name, avatarUrl, opts);
    };
    fallbackOpenChatUserModalById.__pokerFallback = true;
    window.openChatUserModalById = fallbackOpenChatUserModalById;
  }
})();
