// Chat user profile, friends, and respect modals.

function initChatUserModals(opts) {
  opts = opts || {};
  var existingChatUserModal = document.getElementById("chatUserModal");
  if (existingChatUserModal) existingChatUserModal.__pokerRuntimeOpts = opts;
  if (existingChatUserModal && existingChatUserModal.dataset.chatUserModalBound === "1") return;
  if (existingChatUserModal) existingChatUserModal.dataset.chatUserModalBound = "1";
  var base = opts.base || (typeof getApiBase === "function" ? getApiBase() : "");
  var tg = opts.tg || (window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null);
  var CHAT_NEWS_REACTIONS = ["❤️", "🔥", "👍", "👏", "😂", "😮", "😢", "😡"];
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
  var openConversation = function () {
    var runtimeOpts = chatUserModalEl && chatUserModalEl.__pokerRuntimeOpts || {};
    if (typeof runtimeOpts.openConversation === "function") {
      return runtimeOpts.openConversation.apply(null, arguments);
    }
  };
  var updateCurrentPeerTitle = function () {
    var runtimeOpts = chatUserModalEl && chatUserModalEl.__pokerRuntimeOpts || {};
    if (typeof runtimeOpts.updateCurrentPeerTitle === "function") {
      return runtimeOpts.updateCurrentPeerTitle.apply(null, arguments);
    }
  };

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
      "был онлайн: " +
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
  var CHAT_USER_PROFILE_CACHE_PREFIX = "poker_chat_user_profile_v2:";
  var CHAT_USER_PROFILE_CACHE_MS = 60000;
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

  function chatUserModalProfileCacheKey(id) {
    return CHAT_USER_PROFILE_CACHE_PREFIX + encodeURIComponent(String(id || "").trim());
  }

  function chatUserModalReadProfileCache(id) {
    try {
      if (typeof sessionStorage === "undefined") return null;
      var raw = sessionStorage.getItem(chatUserModalProfileCacheKey(id));
      if (!raw) return null;
      var entry = JSON.parse(raw);
      if (!entry || !entry.data || !entry.data.ok) return null;
      if (Date.now() - Number(entry.ts || 0) > CHAT_USER_PROFILE_CACHE_MS) return null;
      return entry.data;
    } catch (eChatUserProfileCacheRead) {
      return null;
    }
  }

  function chatUserModalWriteProfileCache(id, data) {
    try {
      if (typeof sessionStorage === "undefined" || !data || !data.ok) return;
      sessionStorage.setItem(chatUserModalProfileCacheKey(id), JSON.stringify({ ts: Date.now(), data: data }));
    } catch (eChatUserProfileCacheWrite) {}
  }
  var modalLevelFish = document.getElementById("chatUserModalLevelFish");
  var modalLevelText = document.getElementById("chatUserModalLevelText");
  var modalRespectOpenVoters = document.getElementById("chatUserModalRespectOpenVoters");
  var modalRespectVal = document.getElementById("chatUserModalRespectVal");
  var modalGender = document.getElementById("chatUserModalGender");
  var modalBirthBadge = document.getElementById("chatUserModalBirthBadge");
  var modalPlayerStats = document.getElementById("chatUserModalPlayerStats");
  var modalPlayerStatsSection = modalPlayerStats && modalPlayerStats.closest
    ? modalPlayerStats.closest(".chat-user-modal__player-stats")
    : null;
  var modalRatingTabs = document.getElementById("chatUserModalRatingTabs");
  var modalRatingTab = document.getElementById("chatUserModalRatingTab");
  var modalRatingTabSum = document.getElementById("chatUserModalRatingTabSum");
  var modalNews = document.getElementById("chatUserModalNews");
  var modalNewsList = document.getElementById("chatUserModalNewsList");
  var modalNewsCount = document.getElementById("chatUserModalNewsCount");
  var modalNewsAll = document.getElementById("chatUserModalNewsAll");
  var modalNewsDialog = document.getElementById("chatUserModalNewsDialog");
  var modalNewsTitle = document.getElementById("chatUserModalNewsTitle");
  var modalNewsFullList = document.getElementById("chatUserModalNewsFullList");
  var modalWallComposer = document.getElementById("chatUserModalWallComposer");
  var modalWallText = document.getElementById("chatUserModalWallText");
  var chatUserModalNewsRows = [];
  var chatUserModalWallPosts = [];
  var chatUserModalWallCanManage = false;
  var chatUserModalWallAccountId = "";
  var chatUserModalWallTab = "tournaments";
  var chatUserModalNewsSeq = 0;
  var chatUserModalNewsFeedback = {};
  var chatUserModalNewsCommentsOpen = {};
  var chatUserModalNewsLongPressTimer = 0;
  var chatUserModalNewsLongPressTriggered = false;
  var chatUserModalRatingTotalCache = {};
  var chatUserModalRatingTotalRequests = {};
  var chatUserModalRatingTotalSeq = 0;
  var modalRatingRanks = document.getElementById("chatUserModalRatingRanks");
  var modalSummerRank = document.getElementById("chatUserModalSummerRank");
  var modalSpringRank = document.getElementById("chatUserModalSpringRank");
  var modalWinterRank = document.getElementById("chatUserModalWinterRank");
  var modalAchievements = document.getElementById("chatUserModalAchievements");
  var modalAchievementsList = document.getElementById("chatUserModalAchievementsList");
  var modalProfileTabMain = document.getElementById("chatUserModalProfileTabMain");
  var modalProfileTabAchievements = document.getElementById("chatUserModalProfileTabAchievements");
  var chatUserModalProfileTab = "main";
  var chatUserModalHideCompetitiveStats = false;
  var chatUserModalAchievementsLoader = null;
  var chatUserModalAchievementsStarted = false;
  var modalStatusScale = document.getElementById("chatUserModalStatusScale");
  var modalStatusXp = document.getElementById("chatUserModalStatusXp");
  var modalStatusFish = modalStatusScale ? modalStatusScale.querySelector(".chat-user-modal__status-fish") : null;
  var modalStatusSection = modalStatusScale && modalStatusScale.closest ? modalStatusScale.closest(".chat-user-modal__status") : null;
  var modalStatusCards = modalStatusScale ? modalStatusScale.querySelectorAll(".chat-user-modal__status-card") : [];
  var modalPersonalBlock = document.getElementById("chatUserModalPersonalBlock");
  var modalWriteBtn = document.getElementById("chatUserModalWriteBtn");
  var modalCopyProfileBtn = document.getElementById("chatUserModalCopyProfileBtn");
  var modalSuperpowerBtn = document.getElementById("chatUserModalSuperpowerBtn");
  var superpowerModal = document.getElementById("profileSuperpowerModal");
  var superpowerModalArt = document.getElementById("profileSuperpowerModalArt");
  var superpowerModalTitle = document.getElementById("profileSuperpowerModalTitle");
  var superpowerModalLead = document.getElementById("profileSuperpowerModalLead");
  var superpowerModalMoves = document.getElementById("profileSuperpowerModalMoves");
  var superpowerModalUltimateTitle = document.getElementById("profileSuperpowerModalUltimateTitle");
  var superpowerModalUltimateText = document.getElementById("profileSuperpowerModalUltimateText");
  var modalBlockBtn = document.getElementById("chatUserModalBlockBtn");
  var modalRespectUp = document.getElementById("chatUserModalRespectUp");
  var modalRespectDown = document.getElementById("chatUserModalRespectDown");
  var modalRespectHint = document.getElementById("chatUserModalRespectHint");
  var modalRespectControl = chatUserModalEl.querySelector(".chat-user-modal__respect-control");
  var modalRespectActions = chatUserModalEl.querySelector(".chat-user-modal__respect-actions");
  function startChatUserModalAchievementsLoad() {
    if (chatUserModalAchievementsStarted || typeof chatUserModalAchievementsLoader !== "function") return;
    chatUserModalAchievementsStarted = true;
    Promise.resolve(chatUserModalAchievementsLoader()).catch(function () {});
  }
  function setChatUserModalAchievementsLoader(loader) {
    chatUserModalAchievementsLoader = typeof loader === "function" ? loader : null;
    chatUserModalAchievementsStarted = false;
    if (chatUserModalProfileTab === "achievements") startChatUserModalAchievementsLoad();
  }
  function setChatUserModalProfileTab(tab) {
    chatUserModalProfileTab = tab === "achievements" ? "achievements" : "main";
    chatUserModalEl.querySelectorAll("[data-chat-user-profile-panel]").forEach(function (panel) {
      panel.classList.toggle(
        "chat-user-modal__profile-panel--tab-hidden",
        panel.getAttribute("data-chat-user-profile-panel") !== chatUserModalProfileTab
      );
    });
    [modalProfileTabMain, modalProfileTabAchievements].forEach(function (btn) {
      if (!btn) return;
      var active = btn.getAttribute("data-chat-user-profile-tab") === chatUserModalProfileTab;
      btn.classList.toggle("chat-user-modal__profile-tab--active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (chatUserModalProfileTab === "achievements") startChatUserModalAchievementsLoad();
  }
  [modalProfileTabMain, modalProfileTabAchievements].forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      setChatUserModalProfileTab(btn.getAttribute("data-chat-user-profile-tab"));
    });
  });
  var modalAddFriend = document.getElementById("chatUserModalAddFriend");
  var modalFriendRow = modalAddFriend && modalAddFriend.closest ? modalAddFriend.closest(".chat-user-modal__friend-row") : null;
  var modalEditFriendName = document.getElementById("chatUserModalEditFriendName");
  var modalRemoveFriend = document.getElementById("chatUserModalRemoveFriend");
  var modalFriendMsg = document.getElementById("chatUserModalFriendMsg");
  var modalLoginSub = document.getElementById("chatUserModalLoginSub");
  var modalSpecialtyBadge = document.getElementById("chatUserModalSpecialtyBadge");
  var modalLastSeen = document.getElementById("chatUserModalLastSeen");
  var modalVerifiedBadge = document.getElementById("chatUserModalVerifiedBadge");
  var modalBackdrop = chatUserModalEl.querySelector(".chat-user-modal__backdrop");
  var modalClose = chatUserModalEl.querySelector(".chat-user-modal__close");
  var chatUserModalPeerLogin = "";
  var chatUserModalContactName = "";
  var chatUserModalRatingNick = "";
  var chatUserModalProfileGender = "male";
  var chatUserModalAchievementIdentity = null;
  var chatUserModalClubChoiceScriptReady = null;
  var chatUserModalSngAchievementsReady = null;
  var chatUserModalRanksSeq = 0;
  var chatUserModalOpenSeq = 0;
  var chatUserModalBlockedByMe = false;
  var chatUserModalBlockBusy = false;
  var chatUserModalBlockSeq = 0;
  var chatUserModalSuperpower = null;
  var CHAT_USER_SUPERPOWERS = {
    "porquinho": {
      title: "🐗 Поркиньо",
      art: "./assets/sng-finalist-porquinho.webp",
      lead: "Поркиньо превращает обычные жёлуди в тяжёлые покерные снаряды и закидывает ими всю арену.",
      moves: [
        ["Жёлудевый беспредел", "выпускает серию раскалённых желудей, которые рикошетят от стен и противников."],
        ["Шесть тузов", "достаёт невозможную комбинацию из шести тузов и временно усиливает скорость, удачу и урон всей команды."],
        ["Пивной кураж", "делает глоток пива Poker21, после чего перестаёт чувствовать удары и становится ещё наглее."],
      ],
      ultimateTitle: "«Я пздц омашист!»",
      ultimateText: "Поркиньо подбрасывает шесть тузов, открывает бутылку пива и вызывает гигантский дождь из взрывающихся желудей. Последний жёлудь превращается в огромную фишку Poker21 и падает прямо на противника.",
    },
    "поркиньо": null,
    "поркиньё": null,
    "штукатур": {
      title: "🧱 Штукатур",
      art: "./assets/sng-finalist-shtukatur.webp",
      lead: "Штукатур управляет кирпичом, бетоном и штукатуркой, создавая стены прямо во время боя.",
      moves: [
        ["Непробиваемая кладка", "мгновенно поднимает перед командой толстую кирпичную защиту."],
        ["Быстрая отделка", "замазывает трещины в броне союзников и частично восстанавливает им здоровье."],
        ["Цементные оковы", "заливает ноги противника раствором, временно обездвиживая его."],
      ],
      ultimateTitle: "«Под ключ!»",
      ultimateText: "Штукатур возводит вокруг врага целую комнату из кирпича, оштукатуривает её со всех сторон, а затем одним ударом шпателя обрушивает конструкцию внутрь. После атаки остаётся идеально ровная стена с логотипом Poker21.",
    },
    "shtukatur": null,
    "hakas": {
      title: "🦅 Hakas",
      art: "./assets/sng-finalist-hakas.webp",
      lead: "Hakas сражается вместе со своим орлом и использует силу гор, ветра и степи.",
      moves: [
        ["Атака орла", "выпускает орла, который пикирует на противника и сбивает его с ног."],
        ["Глаз хищника", "орёл отмечает слабое место врага, увеличивая урон следующей атаки."],
        ["Степной вихрь", "Hakas вызывает мощный поток ветра, который отбрасывает противников назад."],
      ],
      ultimateTitle: "«Крылья Хакасии»",
      ultimateText: "Над ареной темнеет небо, появляется огромный силуэт орла, состоящий из оранжевой энергии. Hakas указывает на врага, и орёл стремительно пикирует вниз, создавая ударную волну в форме двух тузов.",
    },
    "хакас": null,
    "aza32": {
      title: "🎖 Aza32",
      art: "./assets/sng-finalist-aza.webp",
      lead: "Aza32 управляет боевым дроном, анализирует арену и атакует противников с высокой точностью.",
      moves: [
        ["Дрон-разведчик", "запускает дрон, который отслеживает движения противников."],
        ["Точечный удар", "дрон выпускает импульсный заряд точно в выбранную цель."],
        ["Дымовая завеса", "скрывает команду в густом дыму и мешает врагам прицеливаться."],
      ],
      ultimateTitle: "«Протокол 21»",
      ultimateText: "Aza32 активирует сразу несколько дронов. Они окружают противника, сканируют его, формируют в воздухе символ «21», а затем одновременно выпускают мощный энергетический залп. Финальный дрон сбрасывает взрывную фишку Poker21.",
    },
    "aza": null,
    "аза32": null,
    "аза": null,
  };
  CHAT_USER_SUPERPOWERS["поркиньо"] = CHAT_USER_SUPERPOWERS.porquinho;
  CHAT_USER_SUPERPOWERS["поркиньё"] = CHAT_USER_SUPERPOWERS.porquinho;
  CHAT_USER_SUPERPOWERS.shtukatur = CHAT_USER_SUPERPOWERS["штукатур"];
  CHAT_USER_SUPERPOWERS["хакас"] = CHAT_USER_SUPERPOWERS.hakas;
  CHAT_USER_SUPERPOWERS.aza = CHAT_USER_SUPERPOWERS.aza32;
  CHAT_USER_SUPERPOWERS["аза32"] = CHAT_USER_SUPERPOWERS.aza32;
  CHAT_USER_SUPERPOWERS["аза"] = CHAT_USER_SUPERPOWERS.aza32;

  function chatUserSuperpowerKey(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
  }
  function chatUserSuperpowerFor(values) {
    for (var index = 0; index < values.length; index += 1) {
      var power = CHAT_USER_SUPERPOWERS[chatUserSuperpowerKey(values[index])];
      if (power) return power;
    }
    return null;
  }
  function syncChatUserModalSuperpower(data, fallbackName, fallbackRatingNick) {
    chatUserModalSuperpower = chatUserSuperpowerFor([
      chatUserModalRatingNickFromData(data),
      data && data.pokerPlusNickname,
      data && data.poker21Nickname,
      fallbackRatingNick,
      fallbackName,
      chatUserModalUserName,
    ]);
    if (modalSuperpowerBtn) modalSuperpowerBtn.hidden = !chatUserModalSuperpower;
  }
  function closeChatUserSuperpowerModal() {
    if (!superpowerModal) return;
    superpowerModal.classList.remove("profile-superpower-modal--open");
    superpowerModal.setAttribute("aria-hidden", "true");
  }
  function openChatUserSuperpowerModal() {
    var power = chatUserModalSuperpower;
    if (!power || !superpowerModal) return;
    if (superpowerModalArt) {
      superpowerModalArt.src = power.art;
      superpowerModalArt.alt = power.title;
    }
    if (superpowerModalTitle) superpowerModalTitle.textContent = power.title;
    if (superpowerModalLead) superpowerModalLead.textContent = power.lead;
    if (superpowerModalMoves) {
      superpowerModalMoves.innerHTML = power.moves.map(function (move) {
        return "<li><strong>" + escapeHtml(move[0]) + "</strong><span>" + escapeHtml(move[1]) + "</span></li>";
      }).join("");
    }
    if (superpowerModalUltimateTitle) superpowerModalUltimateTitle.textContent = power.ultimateTitle;
    if (superpowerModalUltimateText) superpowerModalUltimateText.textContent = power.ultimateText;
    superpowerModal.setAttribute("aria-hidden", "false");
    superpowerModal.classList.add("profile-superpower-modal--open");
  }
  function chatUserModalFormatXp(value) {
    if (typeof pokerProfileFormatRake === "function") return pokerProfileFormatRake(value);
    var n = Math.max(0, Math.floor(Number(value) || 0));
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function chatUserModalFormatBirthDate(value) {
    var raw = String(value || "").trim();
    var m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return "";
    return m[3] + "." + m[2] + "." + m[1];
  }
  function chatUserModalBirthDateValue(value) {
    var raw = String(value || "").trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : "";
  }
  function chatUserModalSpecialtyLabel(value) {
    var raw = String(value || "").trim().toLowerCase();
    if (raw === "mtt" || raw === "мтт") return "МТТ";
    if (raw === "cash" || raw === "кеш" || raw === "кэш") return "Кеш";
    return "";
  }
  function chatUserModalPersonalParts(data) {
    var personalText = (data && data.personalInfo != null) ? String(data.personalInfo).trim() : "";
    var specialtyText = chatUserModalSpecialtyLabel(data && (data.profileSpecialty || data.specialty));
    var personalParts = [];
    if (specialtyText) personalParts.push("Специализация: " + specialtyText);
    if (personalText) personalParts.push(personalText);
    return personalParts;
  }
  function chatUserModalApplyPersonalInfo(data, forceVisible) {
    var personalParts = chatUserModalPersonalParts(data);
    if (modalPersonal) modalPersonal.textContent = personalParts.join("\n") || "—";
    if (modalPersonalBlock) {
      if (personalParts.length || forceVisible) modalPersonalBlock.classList.remove("chat-user-modal__personal-block--hidden");
      else modalPersonalBlock.classList.add("chat-user-modal__personal-block--hidden");
    }
    return personalParts.length;
  }
  var modalBirthAdmin = null;
  function chatUserModalEnsureBirthAdmin() {
    if (!modalPersonalBlock) return null;
    if (modalBirthAdmin) return modalBirthAdmin;
    var wrap = document.createElement("div");
    wrap.className = "chat-user-modal__birth-admin";
    wrap.id = "chatUserModalBirthAdmin";
    wrap.hidden = true;
    wrap.innerHTML =
      '<span class="chat-user-modal__birth-admin-label">ДР игрока</span>' +
      '<input class="chat-user-modal__birth-admin-input" id="chatUserModalBirthAdminInput" type="date" aria-label="Дата рождения игрока" />' +
      '<button class="chat-user-modal__birth-admin-save" id="chatUserModalBirthAdminSave" type="button">Сохранить</button>' +
      '<span class="chat-user-modal__birth-admin-msg" id="chatUserModalBirthAdminMsg" aria-live="polite"></span>';
    modalPersonalBlock.appendChild(wrap);
    modalBirthAdmin = wrap;
    var save = wrap.querySelector("#chatUserModalBirthAdminSave");
    if (save) {
      save.addEventListener("click", function () {
        var targetId = String(wrap.getAttribute("data-target-user-id") || "").trim();
        var input = wrap.querySelector("#chatUserModalBirthAdminInput");
        var msg = wrap.querySelector("#chatUserModalBirthAdminMsg");
        var value = input ? String(input.value || "").trim() : "";
        if (!targetId || !base || typeof pokerApiAuthJsonBody !== "function") return;
        if (!value) {
          if (msg) msg.textContent = "Выберите дату";
          return;
        }
        save.disabled = true;
        if (input) input.disabled = true;
        if (msg) msg.textContent = "Сохраняю...";
        fetch(base + "/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetId, birthDate: value }))
        })
          .then(function (r) {
            return r.json().then(function (data) {
              if (!r.ok || !data || data.ok === false) throw new Error((data && data.error) || "Ошибка сохранения");
              return data;
            });
          })
          .then(function () {
            var profileData = wrap._profileData && typeof wrap._profileData === "object" ? wrap._profileData : {};
            profileData.profileBirthDate = value;
            profileData.birthDate = value;
            profileData.isAdmin = true;
            profileData.ok = true;
            wrap._profileData = profileData;
            chatUserModalWriteProfileCache(targetId, profileData);
            var openId = String(wrap.getAttribute("data-open-user-id") || targetId).trim();
            if (openId && openId !== targetId) chatUserModalWriteProfileCache(openId, profileData);
            if (String(chatUserModalUserId || "") === targetId || String(chatUserModalUserId || "") === openId) {
              chatUserModalApplyPersonalInfo(profileData, true);
              chatUserModalRenderBirthAdmin(profileData, openId || targetId, false);
            }
            if (msg) msg.textContent = "Сохранено";
          })
          .catch(function (err) {
            if (msg) msg.textContent = err && err.message ? err.message : "Ошибка сохранения";
          })
          .finally(function () {
            save.disabled = false;
            if (input) input.disabled = false;
          });
      });
    }
    return wrap;
  }
  function chatUserModalRenderBirthAdmin(data, id, openingSelfProfile) {
    var existing = document.getElementById("chatUserModalBirthAdmin");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    modalBirthAdmin = null;
    return false;
  }
  function updateChatUserModalSpecialtyBadge(value) {
    if (!modalSpecialtyBadge) return;
    var label = chatUserModalSpecialtyLabel(value);
    modalSpecialtyBadge.textContent = label ? label + "-игрок" : "";
    modalSpecialtyBadge.hidden = !label;
    modalSpecialtyBadge.classList.toggle("chat-user-modal__specialty-badge--cash", label === "Кеш");
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
    closeChatUserModalNews();
    closeChatUserSuperpowerModal();
    chatUserModalEl.classList.remove("chat-user-modal--profile-loading");
    chatUserModalEl.removeAttribute("aria-busy");
    chatUserModalEl.setAttribute("aria-hidden", "true");
    chatUserModalEl.classList.remove("chat-user-modal--open");
    document.dispatchEvent(new CustomEvent("poker:chat-user-modal-close"));
  }
  function chatUserModalNewsDate(value) {
    var date = new Date(value || 0);
    if (!Number.isFinite(date.getTime())) return "";
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  }
  function chatUserModalNewsDayKey(value) {
    var date = new Date(value || 0);
    if (!Number.isFinite(date.getTime())) return "unknown";
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  function chatUserModalNewsIcon(type) {
    var icons = {
      level: '<svg viewBox="0 0 24 24"><path d="m12 3 4.3 4.3-2.2 2.2L12 7.4 9.9 9.5 7.7 7.3 12 3Z"/><path d="m12 9.3 4.3 4.3-2.2 2.2-2.1-2.1-2.1 2.1-2.2-2.2L12 9.3Z"/><path d="M5 20h14"/></svg>',
      rating: '<svg viewBox="0 0 24 24"><path d="M5 18V13M12 18V9M19 18V5"/><path d="m4 8 5-4 4 3 6-5"/><path d="M16 2h3v3"/></svg>',
      achievement: '<svg viewBox="0 0 24 24"><path d="M8 3h8v5a4 4 0 0 1-8 0V3Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/></svg>',
      daily: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>',
      birthday: '<svg viewBox="0 0 24 24"><path d="M4 12h16v8H4v-8ZM3 9h18v4H3V9Z"/><path d="M12 9v11M12 9H8.5a2.5 2.5 0 1 1 2.5-2.5L12 9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5L12 9Z"/></svg>',
      personal: '<svg viewBox="0 0 24 24"><path d="M5 4h14v13H9l-4 3V4Z"/><path d="M8 8h8M8 12h6"/></svg>',
    };
    return icons[type] || icons.achievement;
  }
  function chatUserModalWallAvatarUrl() {
    try {
      if (chatUserModalRatingNick && typeof window.pokerGetSummerRatingPlayerArt === "function") {
        var art = window.pokerGetSummerRatingPlayerArt(chatUserModalRatingNick);
        if (art && art.src) return String(art.src);
      }
    } catch (eChatUserWallRatingAvatar) {}
    try {
      if (modalRatingArtImg &&
          !modalRatingArtImg.classList.contains("chat-user-modal__rating-art-img--avatar-fallback") &&
          !modalRatingArtImg.classList.contains("chat-user-modal__rating-art-img--default-hero")) {
        var artSrc = String(modalRatingArtImg.currentSrc || modalRatingArtImg.src || "").trim();
        if (artSrc) return artSrc;
      }
    } catch (eChatUserWallCurrentArt) {}
    return String(chatUserModalHeroAvatarUrl || "").trim();
  }
  function chatUserModalNewsItem(row) {
    var type = String(row && row.type || "achievement");
    var rowId = String(row && row.id || "");
    var feedback = chatUserModalNewsFeedback[rowId] || {};
    var reactions = feedback.reactions || {};
    var playerStyle = row && row.playerAccent && row.playerRgb
      ? ' style="--player-news-accent:' + escapeHtml(row.playerAccent) + ';--player-news-rgb:' + escapeHtml(row.playerRgb) + '"'
      : "";
    var reactionButtons = CHAT_NEWS_REACTIONS.map(function (emoji) {
      var count = Math.max(0, Number(reactions[emoji]) || 0);
      if (!count) return "";
      return '<button type="button" class="chat-user-modal__news-reaction' +
        (feedback.myReaction === emoji ? " chat-user-modal__news-reaction--mine" : "") +
        '" data-profile-event-reaction="' + escapeHtml(emoji) + '" aria-label="Поставить реакцию ' + escapeHtml(emoji) + '">' +
        escapeHtml(emoji) + (count ? '<span data-profile-event-reaction-users="' + escapeHtml(emoji) + '" title="Кто поставил">' + count + "</span>" : "") + "</button>";
    }).join("");
    var comments = Array.isArray(feedback.comments) ? feedback.comments.slice().sort(function (a, b) {
      return String(a && a.at || "").localeCompare(String(b && b.at || ""));
    }) : [];
    var commentsHtml = comments.length
      ? comments.map(function (comment) {
          var authorName = String(comment.author || "Игрок");
          var authorAvatar = String(comment.authorAvatar || "");
          var authorProfileId = String(comment.authorProfileId || comment.memberId || "");
          var commentReactions = comment.reactions || {};
          var commentReactionHtml = CHAT_NEWS_REACTIONS.map(function (emoji) {
            var count = Math.max(0, Number(commentReactions[emoji]) || 0);
            if (!count) return "";
            return '<button type="button" class="chat-user-modal__comment-reaction' +
              (comment.myReaction === emoji ? " chat-user-modal__comment-reaction--mine" : "") +
              '" data-profile-comment-reaction="' + escapeHtml(emoji) + '" data-comment-id="' + escapeHtml(comment.id || "") + '">' +
              escapeHtml(emoji) + (count ? '<span data-profile-comment-reaction-users="' + escapeHtml(emoji) + '">' + count + "</span>" : "") + "</button>";
          }).join("");
          var replyQuote = comment.replyTo
            ? '<blockquote class="home-news-comment-quote"><strong>' + escapeHtml(comment.replyTo.fromName || "Игрок") +
              '</strong><span>' + escapeHtml(String(comment.replyTo.text || "").slice(0, 160)) + "</span></blockquote>"
            : "";
          return '<div class="chat-user-modal__news-comment" data-profile-comment-id="' + escapeHtml(comment.id || "") + '">' +
            '<button type="button" class="chat-user-modal__news-comment-author" data-profile-event-author' +
              ' data-user-id="' + escapeHtml(authorProfileId) + '"' +
              ' data-user-name="' + escapeHtml(authorName) + '"' +
              ' data-user-avatar="' + escapeHtml(authorAvatar) + '">' +
              (authorAvatar
                ? '<img src="' + escapeHtml(authorAvatar) + '" alt="">'
                : '<span aria-hidden="true">' + escapeHtml((authorName || "И").charAt(0).toUpperCase()) + "</span>") +
              "<strong>" + escapeHtml(authorName) + "</strong>" +
            '</button>' +
            (comment.isMine ? '<button type="button" class="chat-user-modal__news-comment-delete" data-profile-comment-delete="' +
              escapeHtml(comment.id || "") + '" aria-label="Удалить комментарий" title="Удалить комментарий">×</button>' : "") +
            replyQuote + '<p>' + escapeHtml(comment.text || "") + '</p><span class="chat-user-modal__comment-reactions">' + commentReactionHtml + "</span></div>";
        }).join("")
      : '<p class="chat-user-modal__news-comments-empty">Комментариев пока нет</p>';
    var wallAvatar = type === "personal" ? chatUserModalWallAvatarUrl() : "";
    var wallControls = type === "personal" && chatUserModalWallCanManage
      ? '<span class="chat-user-modal__wall-controls">' +
          '<button type="button" data-wall-edit="' + escapeHtml(row.postId || "") + '">Редактировать</button>' +
          '<button type="button" data-wall-pin="' + escapeHtml(row.postId || "") + '">' +
            (row.pinned ? "Открепить" : "Закрепить") +
          "</button>" +
        "</span>"
      : "";
    var pinBadge = type === "personal" && row.pinned
      ? '<span class="chat-user-modal__wall-pinned">📌 Закреплено</span>'
      : "";
    var structuredNews = row && row.newsTitle && Array.isArray(row.newsLines) && row.newsLines.length
      ? '<span class="chat-user-modal__news-player-title">' + escapeHtml(row.newsTitle) + '</span>' +
        '<span class="chat-user-modal__news-event-lines">' + row.newsLines.map(function (line) {
          return "<strong>" + escapeHtml(line) + "</strong>";
        }).join("") + "</span>"
      : "<strong>" + escapeHtml(row && row.text || "") + "</strong>";
    return '<article class="chat-user-modal__news-item chat-user-modal__news-item--' + escapeHtml(type) +
      '" data-profile-event-id="' + escapeHtml(rowId) + '"' + playerStyle + ">" +
      '<span class="chat-user-modal__news-icon' + (wallAvatar ? ' chat-user-modal__news-icon--avatar' : '') + '" aria-hidden="true">' +
        (wallAvatar ? '<img src="' + escapeHtml(wallAvatar) + '" alt="">' : chatUserModalNewsIcon(type)) + "</span>" +
      '<span class="chat-user-modal__news-copy">' + pinBadge + structuredNews +
        (row && row.image ? '<img class="chat-user-modal__wall-image" src="' + escapeHtml(row.image) + '" alt="Фото к записи" loading="lazy">' : "") +
        (row && row.editedAt ? '<small class="chat-user-modal__wall-edited">изменено</small>' : "") + wallControls +
        '<span class="chat-user-modal__news-actions">' + reactionButtons +
          '<button type="button" class="chat-user-modal__news-comment-toggle' +
            (chatUserModalNewsCommentsOpen[rowId] ? " chat-user-modal__news-comment-toggle--active" : "") +
            '" data-profile-event-comments aria-label="Открыть комментарии">💬 <b>Комментировать</b>' +
            (feedback.commentCount ? "<span>" + Number(feedback.commentCount) + "</span>" : "") + "</button>" +
        "</span>" +
        '<span class="chat-user-modal__news-comments"' + (chatUserModalNewsCommentsOpen[rowId] ? "" : " hidden") + ">" +
          '<span class="chat-user-modal__news-comments-list">' + commentsHtml + "</span>" +
          '<form class="chat-user-modal__news-comment-form">' +
            '<input type="text" maxlength="500" placeholder="Написать комментарий…" aria-label="Комментарий к событию">' +
            '<button type="submit">Отправить</button>' +
          "</form>" +
        "</span>" +
      "</span>" +
    "</article>";
  }
  function chatUserModalNewsGroups(rows) {
    var groups = [];
    (rows || []).forEach(function (row) {
      var key = chatUserModalNewsDayKey(row && row.at);
      var group = groups[groups.length - 1];
      if (!group || group.key !== key) {
        group = { key: key, at: row && row.at, rows: [] };
        groups.push(group);
      }
      group.rows.push(row);
    });
    return groups.map(function (group) {
      return '<section class="chat-user-modal__news-day"><div class="chat-user-modal__news-date"><span>' +
        escapeHtml(chatUserModalNewsDate(group.at)) + '</span></div><div class="chat-user-modal__news-day-list">' +
        group.rows.map(chatUserModalNewsItem).join("") + "</div></section>";
    }).join("");
  }
  function chatUserModalNewsSkeleton() {
    return '<div class="chat-user-modal__news-loading" role="status" aria-label="Загрузка событий">' +
      '<span class="chat-user-modal__news-loading-label">Загрузка…</span>' +
      [0, 1, 2].map(function () {
        return '<span class="chat-user-modal__news-skeleton">' +
          '<i class="chat-user-modal__news-skeleton-icon"></i>' +
          '<i class="chat-user-modal__news-skeleton-copy"><b></b><b></b></i>' +
        "</span>";
      }).join("") +
    "</div>";
  }
  function showChatUserModalNewsLoading() {
    if (modalNewsList) modalNewsList.innerHTML = chatUserModalNewsSkeleton();
    if (modalNewsCount) modalNewsCount.textContent = "Загрузка…";
    if (modalNewsAll) modalNewsAll.hidden = true;
    if (modalNews) modalNews.hidden = false;
  }
  function chatUserModalWallRows() {
    return chatUserModalWallPosts.map(function (post) {
      return {
        id: "wall:" + String(chatUserModalWallAccountId || chatUserModalUserId || "") + ":" + String(post.id || ""),
        postId: String(post.id || ""),
        type: "personal",
        text: String(post.text || ""),
        image: String(post.image || ""),
        at: post.createdAt,
        editedAt: post.editedAt,
        pinned: !!post.pinned,
      };
    });
  }
  function chatUserModalWallEmpty() {
    return '<div class="chat-user-modal__wall-empty">' +
      (chatUserModalWallCanManage
        ? "<strong>На стене пока пусто</strong><span>Напишите первую личную запись.</span>"
        : "<strong>Личных записей пока нет</strong>") +
    "</div>";
  }
  function chatUserModalActiveRows() {
    return chatUserModalWallTab === "personal" ? chatUserModalWallRows() : chatUserModalNewsRows;
  }
  function syncChatUserModalWallTabs() {
    document.querySelectorAll("[data-chat-user-wall-personal-count]").forEach(function (count) {
      count.textContent = "(" + chatUserModalWallPosts.length + ")";
    });
    document.querySelectorAll("[data-wall-tab]").forEach(function (button) {
      var active = button.getAttribute("data-wall-tab") === chatUserModalWallTab;
      button.classList.toggle("chat-user-modal__wall-tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (modalWallComposer) modalWallComposer.hidden = !(chatUserModalWallTab === "personal" && chatUserModalWallCanManage);
  }
  function renderChatUserModalWall() {
    var rows = chatUserModalActiveRows();
    var content = rows.length ? chatUserModalNewsGroups(rows) : chatUserModalWallEmpty();
    if (modalNewsList) modalNewsList.innerHTML = rows.length > 5 ? chatUserModalNewsGroups(rows.slice(0, 5)) : content;
    if (modalNewsCount) {
      var wallCount = rows.length;
      var wallCountMod10 = wallCount % 10;
      var wallCountMod100 = wallCount % 100;
      var wallCountWord = wallCountMod10 === 1 && wallCountMod100 !== 11
        ? "запись"
        : wallCountMod10 >= 2 && wallCountMod10 <= 4 && (wallCountMod100 < 12 || wallCountMod100 > 14)
          ? "записи"
          : "записей";
      modalNewsCount.textContent = wallCount + (chatUserModalWallTab === "personal" ? " " + wallCountWord : " событий");
    }
    if (modalNewsAll) modalNewsAll.hidden = !rows.length;
    if (modalNews) modalNews.hidden = false;
    if (modalNewsDialog && !modalNewsDialog.hidden && modalNewsFullList) modalNewsFullList.innerHTML = content;
    syncChatUserModalWallTabs();
  }
  function chatUserModalWallRequest(payload) {
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var body = typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(payload) : payload;
    return fetch(base + "/api/profile-wall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || !data || !data.ok) throw new Error(data && data.error || "Ошибка");
        return data;
      });
    });
  }
  function loadChatUserModalWall(seq, identity) {
    var wallIdentity = identity && typeof identity === "object" ? identity : { userId: identity };
    var targetAccountId = String(wallIdentity.accountId || wallIdentity.dtId || "").trim();
    var targetUserId = String(wallIdentity.chatUserId || wallIdentity.userId || chatUserModalUserId || "").trim();
    return chatUserModalWallRequest({
      action: "list",
      targetAccountId: targetAccountId,
      targetUserId: targetUserId,
    }).then(function (data) {
      if (seq !== chatUserModalNewsSeq) return;
      chatUserModalWallPosts = Array.isArray(data.posts) ? data.posts : [];
      chatUserModalWallCanManage = data.canManage === true;
      chatUserModalWallAccountId = String(data.accountId || "");
      renderChatUserModalWall();
      var ids = chatUserModalWallRows().map(function (row) { return row.id; });
      if (ids.length) {
        chatUserModalFeedbackRequest({ action: "list", eventIds: ids }).then(function (feedbackData) {
          if (seq !== chatUserModalNewsSeq) return;
          Object.assign(chatUserModalNewsFeedback, feedbackData.feedback || {});
          renderChatUserModalWall();
        }).catch(function () {});
      }
    }).catch(function () {
      if (seq !== chatUserModalNewsSeq) return;
      chatUserModalWallPosts = [];
      chatUserModalWallCanManage = chatUserModalEl.classList.contains("chat-user-modal--self");
      renderChatUserModalWall();
    });
  }
  function applyChatUserModalNewsRows(rows, seq) {
    if (seq !== chatUserModalNewsSeq) return false;
    var nextRows = Array.isArray(rows) ? rows : [];
    if (!nextRows.length) return false;
    chatUserModalNewsRows = nextRows;
    renderChatUserModalWall();
    return true;
  }
  function resetChatUserModalNews() {
    chatUserModalNewsSeq += 1;
    chatUserModalNewsRows = [];
    chatUserModalWallPosts = [];
    chatUserModalWallCanManage = false;
    chatUserModalWallAccountId = "";
    chatUserModalWallTab = "tournaments";
    chatUserModalNewsFeedback = {};
    chatUserModalNewsCommentsOpen = {};
    if (modalNews) modalNews.hidden = true;
    if (modalNewsList) modalNewsList.innerHTML = "";
    closeChatUserModalNews();
  }
  function loadChatUserModalNews(identity) {
    var seq = ++chatUserModalNewsSeq;
    showChatUserModalNewsLoading();
    loadChatUserModalWall(seq, identity);
    if (typeof window.pokerGetPlayerNews !== "function") {
      renderChatUserModalWall();
      return;
    }
    var cachedRows = typeof window.pokerReadCachedPlayerNews === "function"
      ? window.pokerReadCachedPlayerNews(identity)
      : [];
    applyChatUserModalNewsRows(cachedRows, seq);
    Promise.resolve(window.pokerGetPlayerNews(identity, {
      onUpdate: function (rows) {
        applyChatUserModalNewsRows(rows, seq);
      },
    })).then(function (rows) {
      if (seq !== chatUserModalNewsSeq) return;
      if (!applyChatUserModalNewsRows(rows, seq)) renderChatUserModalWall();
      loadChatUserModalNewsFeedback();
    }).catch(function () {
      if (seq === chatUserModalNewsSeq) renderChatUserModalWall();
    });
  }
  function renderChatUserModalNewsRows() {
    renderChatUserModalWall();
  }
  function chatUserModalFeedbackRequest(payload) {
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var body = typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(payload) : payload;
    return fetch(base + "/api/profile-event-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || !data || !data.ok) throw new Error(data && data.error || "Ошибка");
        return data;
      });
    });
  }
  function loadChatUserModalNewsFeedback() {
    var ids = chatUserModalNewsRows.map(function (row) { return String(row && row.id || ""); }).filter(Boolean);
    if (!ids.length) return;
    chatUserModalFeedbackRequest({ action: "list", eventIds: ids }).then(function (data) {
      chatUserModalNewsFeedback = data.feedback || {};
      renderChatUserModalNewsRows();
    }).catch(function () {});
  }
  function updateChatUserModalNewsFeedback(eventId, feedback) {
    chatUserModalNewsFeedback[eventId] = feedback || {};
    renderChatUserModalNewsRows();
  }
  function sendChatUserModalOptimisticReaction(eventId, emoji, commentId) {
    var current = chatUserModalNewsFeedback[eventId] || {};
    var snapshot = JSON.parse(JSON.stringify(current));
    var target = current;
    if (commentId) {
      target = (Array.isArray(current.comments) ? current.comments : []).find(function (row) {
        return String(row.id) === String(commentId);
      });
    }
    if (!target) return Promise.resolve();
    target.reactions = target.reactions || {};
    var previous = String(target.myReaction || "");
    if (previous) target.reactions[previous] = Math.max(0, (Number(target.reactions[previous]) || 0) - 1);
    target.myReaction = previous === emoji ? "" : emoji;
    if (target.myReaction) target.reactions[emoji] = (Number(target.reactions[emoji]) || 0) + 1;
    updateChatUserModalNewsFeedback(eventId, current);
    return chatUserModalFeedbackRequest({ action: commentId ? "comment-reaction" : "reaction", eventId: eventId, commentId: commentId || "", emoji: emoji })
      .then(function (data) { updateChatUserModalNewsFeedback(eventId, data.feedback); })
      .catch(function (error) {
        updateChatUserModalNewsFeedback(eventId, snapshot);
        if (typeof alertText === "function") alertText(error.message || "Не удалось поставить реакцию");
      });
  }
  function handleChatUserModalNewsInteraction(event) {
    if (chatUserModalNewsLongPressTriggered) {
      chatUserModalNewsLongPressTriggered = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    var target = event.target;
    var wallTab = target && target.closest ? target.closest("[data-wall-tab]") : null;
    if (wallTab) {
      chatUserModalWallTab = wallTab.getAttribute("data-wall-tab") === "personal" ? "personal" : "tournaments";
      renderChatUserModalWall();
      return;
    }
    var editButton = target && target.closest ? target.closest("[data-wall-edit]") : null;
    var pinButton = target && target.closest ? target.closest("[data-wall-pin]") : null;
    if (editButton || pinButton) {
      event.preventDefault();
      var postId = (editButton || pinButton).getAttribute(editButton ? "data-wall-edit" : "data-wall-pin");
      var post = chatUserModalWallPosts.find(function (row) { return String(row.id) === String(postId); });
      if (!post) return;
      var nextText = post.text;
      if (editButton) {
        nextText = window.prompt("Редактировать запись", post.text);
        if (nextText == null || !String(nextText).trim()) return;
      }
      (editButton || pinButton).disabled = true;
      chatUserModalWallRequest({
        action: editButton ? "edit" : "pin",
        targetUserId: chatUserModalUserId,
        postId: postId,
        text: nextText,
      }).then(function (data) {
        chatUserModalWallPosts = data.posts || [];
        renderChatUserModalWall();
      }).catch(function (error) {
        (editButton || pinButton).disabled = false;
        if (typeof alertText === "function") alertText(error.message || "Не удалось изменить запись");
      });
      return;
    }
    var authorButton = target && target.closest ? target.closest("[data-profile-event-author]") : null;
    if (authorButton) {
      event.preventDefault();
      var authorId = authorButton.getAttribute("data-user-id");
      if (authorId && typeof window.openChatUserModalById === "function") {
        closeChatUserModalNews();
        window.openChatUserModalById(
          authorId,
          authorButton.getAttribute("data-user-name") || "Игрок",
          authorButton.getAttribute("data-user-avatar") || ""
        );
      }
      return;
    }
    var item = target && target.closest ? target.closest("[data-profile-event-id]") : null;
    var eventId = item && item.getAttribute("data-profile-event-id");
    if (!eventId) return;
    var deleteComment = target.closest("[data-profile-comment-delete]");
    if (deleteComment) {
      event.preventDefault();
      var deleteCommentId = deleteComment.getAttribute("data-profile-comment-delete");
      if (!window.confirm("Удалить комментарий?")) return;
      deleteComment.disabled = true;
      chatUserModalFeedbackRequest({ action: "delete-comment", eventId: eventId, commentId: deleteCommentId })
        .then(function (data) { updateChatUserModalNewsFeedback(eventId, data.feedback); })
        .catch(function (error) {
          deleteComment.disabled = false;
          if (typeof alertText === "function") alertText(error.message || "Не удалось удалить комментарий");
        });
      return;
    }
    var commentReaction = target.closest("[data-profile-comment-reaction]");
    if (commentReaction) {
      event.preventDefault();
      var commentId = commentReaction.getAttribute("data-comment-id");
      var comment = ((chatUserModalNewsFeedback[eventId] || {}).comments || []).find(function (row) { return String(row.id) === String(commentId); });
      var commentUsersTrigger = target.closest("[data-profile-comment-reaction-users]");
      if (commentUsersTrigger && typeof window.pokerShowProfileReactionUsers === "function") {
        window.pokerShowProfileReactionUsers(comment || {}, commentUsersTrigger.getAttribute("data-profile-comment-reaction-users"));
        return;
      }
      sendChatUserModalOptimisticReaction(eventId, commentReaction.getAttribute("data-profile-comment-reaction"), commentId);
      return;
    }
    var reaction = target.closest("[data-profile-event-reaction]");
    if (reaction) {
      event.preventDefault();
      var usersTrigger = target.closest("[data-profile-event-reaction-users]");
      if (usersTrigger && typeof window.pokerShowProfileReactionUsers === "function") {
        window.pokerShowProfileReactionUsers(chatUserModalNewsFeedback[eventId] || {}, usersTrigger.getAttribute("data-profile-event-reaction-users"));
        return;
      }
      sendChatUserModalOptimisticReaction(eventId, reaction.getAttribute("data-profile-event-reaction"), "");
      return;
    }
    if (target.closest("[data-profile-event-comments]")) {
      event.preventDefault();
      chatUserModalNewsCommentsOpen[eventId] = !chatUserModalNewsCommentsOpen[eventId];
      renderChatUserModalNewsRows();
    }
  }
  function handleChatUserModalNewsSubmit(event) {
    if (event.target === modalWallComposer) {
      event.preventDefault();
      var wallText = String(modalWallText && modalWallText.value || "").trim();
      var wallClubShare = modalWallComposer.querySelector("#chatUserModalWallClubShare");
      if (!wallText) return;
      var publishButton = modalWallComposer.querySelector("button[type=submit]");
      if (publishButton) publishButton.disabled = true;
      chatUserModalWallRequest({
        action: "create",
        targetUserId: chatUserModalUserId,
        text: wallText,
        shareToClub: !!(wallClubShare && wallClubShare.checked),
      }).then(function (data) {
        chatUserModalWallPosts = data.posts || [];
        if (modalWallText) modalWallText.value = "";
        if (wallClubShare) wallClubShare.checked = true;
        if (publishButton) publishButton.disabled = false;
        renderChatUserModalWall();
      }).catch(function (error) {
        if (publishButton) publishButton.disabled = false;
        if (typeof alertText === "function") alertText(error.message || "Не удалось опубликовать запись");
      });
      return;
    }
    var form = event.target && event.target.closest ? event.target.closest(".chat-user-modal__news-comment-form") : null;
    if (!form) return;
    event.preventDefault();
    var item = form.closest("[data-profile-event-id]");
    var eventId = item && item.getAttribute("data-profile-event-id");
    var input = form.querySelector("input");
    var text = String(input && input.value || "").trim();
    if (!eventId || !text) return;
    var submit = form.querySelector("button");
    if (submit) {
      submit.disabled = true;
      submit.classList.add("is-sending");
      submit.setAttribute("aria-busy", "true");
      submit.textContent = "Отправка…";
    }
    chatUserModalFeedbackRequest({ action: "comment", eventId: eventId, text: text }).then(function (data) {
      chatUserModalNewsCommentsOpen[eventId] = true;
      updateChatUserModalNewsFeedback(eventId, data.feedback);
    }).catch(function (error) {
      if (submit) {
        submit.disabled = false;
        submit.classList.remove("is-sending");
        submit.removeAttribute("aria-busy");
        submit.textContent = "Отправить";
      }
      if (typeof alertText === "function") alertText(error.message || "Не удалось отправить комментарий");
    });
  }
  function openChatUserModalNews() {
    if (!modalNewsDialog) return;
    if (modalNewsTitle) modalNewsTitle.textContent = "Стена · " + String(chatUserModalRatingNick || chatUserModalUserName || "игрок");
    // Keep the full event dialog outside the scrollable profile card.
    // Otherwise mobile WebKit positions and clips the fixed dialog inside that card.
    if (modalNewsDialog.parentNode !== document.body) document.body.appendChild(modalNewsDialog);
    modalNewsDialog.hidden = false;
    renderChatUserModalWall();
    if (modalNewsFullList) modalNewsFullList.scrollTop = 0;
  }
  function closeChatUserModalNews() {
    if (modalNewsDialog) modalNewsDialog.hidden = true;
  }
  function revealChatUserModal(seq) {
    if (seq !== chatUserModalOpenSeq || !chatUserModalUserId) return;
    chatUserModalEl.setAttribute("aria-hidden", "false");
    chatUserModalEl.classList.add("chat-user-modal--open");
    document.dispatchEvent(new CustomEvent("poker:chat-user-modal-open"));
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
      ? "..."
      : chatUserModalBlockedByMe
        ? "Разблок"
        : "Блок";
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
    var pokerPlusProfile = data && data.pokerPlusProfile && typeof data.pokerPlusProfile === "object"
      ? data.pokerPlusProfile
      : data && data.poker21Profile && typeof data.poker21Profile === "object"
        ? data.poker21Profile
        : null;
    var raw =
      data && (data.pokerPlusNickname || data.poker21Nickname || data.ratingNick || data.nickname || data.nick) ||
      pokerPlusProfile && (pokerPlusProfile.nickname || pokerPlusProfile.Nike || pokerPlusProfile.nick || pokerPlusProfile.name);
    return String(raw || "").trim();
  }
  function normalizeChatUserModalProfileGender(value) {
    var raw = String(value || "").trim().toLowerCase();
    if (raw === "female" || raw === "f" || raw === "woman" || raw === "ж" || raw === "жен" || raw === "женский") return "female";
    return "male";
  }
  function chatUserModalGenderText(value) {
    return normalizeChatUserModalProfileGender(value) === "female" ? "Пол: Ж" : "Пол: М";
  }
  function chatUserModalDefaultHeroArt(value) {
    var gender = normalizeChatUserModalProfileGender(value);
    return {
      src: gender === "female" ? "./assets/chat-profile-default-hero-female.webp?v=3.001" : "./assets/chat-profile-default-hero-male.webp",
      nick: gender === "female" ? "Стандартный герой Ж" : "Стандартный герой М",
      defaultHero: true,
      gender: gender,
    };
  }
  function syncChatUserModalGender(value) {
    chatUserModalProfileGender = normalizeChatUserModalProfileGender(value);
    if (modalGender) {
      modalGender.textContent = chatUserModalGenderText(chatUserModalProfileGender);
      modalGender.hidden = false;
    }
  }
  function syncChatUserModalBirthBadge(value) {
    if (!modalBirthBadge) return;
    var full = chatUserModalFormatBirthDate(value);
    var parts = full ? full.split(".") : [];
    modalBirthBadge.textContent = parts.length === 3 ? "ДР: " + parts[0] + "." + parts[1] : "";
    modalBirthBadge.hidden = parts.length !== 3;
  }
  function syncChatUserModalRatingTab(nick) {
    chatUserModalRatingNick = String(nick || "").trim();
    var hasNick = !!chatUserModalRatingNick;
    var ratingHidden = chatUserModalHideCompetitiveStats || !hasNick;
    if (modalRatingTabs) modalRatingTabs.hidden = ratingHidden;
    if (modalRatingTabSum) {
      var cacheKey = chatUserModalRatingTotalCacheKey(chatUserModalRatingNick);
      modalRatingTabSum.textContent = hasNick
        ? (chatUserModalRatingTotalCache[cacheKey] || "Загрузка...")
        : "";
      modalRatingTabSum.hidden = ratingHidden;
    }
    if (modalRatingTab) {
      modalRatingTab.hidden = ratingHidden;
      modalRatingTab.disabled = ratingHidden;
      modalRatingTab.setAttribute("aria-disabled", ratingHidden ? "true" : "false");
      if (!ratingHidden) {
        modalRatingTab.setAttribute("title", "Призовые в турнирах " + chatUserModalRatingNick);
        modalRatingTab.setAttribute("aria-label", "Призовые в турнирах " + chatUserModalRatingNick + ". Подробнее");
      } else {
        modalRatingTab.removeAttribute("title");
        modalRatingTab.setAttribute("aria-label", "Призовые в турнирах. Подробнее");
      }
    }
    if (hasNick) loadChatUserModalRatingTotalReward(chatUserModalRatingNick);
  }
  function hideChatUserModalRatingArtImg() {
    if (!modalRatingArtImg) return;
    modalRatingArtImg.onerror = null;
    modalRatingArtImg.onload = null;
    modalRatingArtImg.style.display = "none";
    modalRatingArtImg.removeAttribute("src");
    modalRatingArtImg.alt = "";
    modalRatingArtImg.hidden = true;
    modalRatingArtImg.classList.remove("chat-user-modal__rating-art-img--avatar-fallback", "chat-user-modal__rating-art-img--default-hero");
  }
  function showChatUserModalRatingAvatarFallback() {
    if (!modalRatingArt || !modalRatingArtImg) return Promise.resolve(false);
    hideChatUserModalRatingArtImg();
    modalRatingArt.hidden = false;
    if (modalHero) modalHero.classList.add("chat-user-modal__hero--art");
    return Promise.resolve(false);
  }
  function applyChatUserModalRoundRatingArt(art, nick) {
    if (!modalAvatar || !modalAvatarPlaceholder || !art || !art.src || art.defaultHero === true) return;
    if (nick && chatUserModalRatingNick && !chatUserModalSameRatingNick(chatUserModalRatingNick, nick)) return;
    // A photo uploaded by the player is their primary round avatar.
    // Rating character art still remains in the large profile artwork.
    if (/^data:image\//i.test(String(chatUserModalHeroAvatarUrl || "").trim())) return;
    modalAvatar.src = art.src;
    modalAvatar.alt = "Персональный образ " + (art.nick || nick || chatUserModalUserName || "игрока");
    modalAvatar.onerror = function () {
      applyChatUserModalBaseAvatar(
        chatUserModalHeroAvatarUrl,
        chatUserModalUserId,
        chatUserModalUserName || "Игрок"
      );
    };
    modalAvatar.classList.add("chat-user-modal__avatar--rating-art");
    modalAvatar.style.display = "";
    modalAvatarPlaceholder.style.display = "none";
  }
  function chatUserModalStableFallbackAvatar(value) {
    var presets = typeof POKER_PROFILE_AVATAR_PRESETS !== "undefined" && Array.isArray(POKER_PROFILE_AVATAR_PRESETS)
      ? POKER_PROFILE_AVATAR_PRESETS
      : [
          "tiger", "raccoon", "skull", "phoenix", "octopus", "cat", "robot", "bulldog",
          "monkey", "fox", "chip", "koala", "raven", "crocodile", "rabbit", "chameleon",
          "panda", "wolf", "owl", "bat", "gorilla",
        ].map(function (id) {
          return { src: id === "monkey" ? "./assets/daily-poker-monkey.webp" : "./assets/avatar-" + id + ".jpg" };
        });
    var source = String(value || "Игрок");
    var hash = 0;
    for (var i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    var preset = presets[hash % presets.length];
    return String(preset && preset.src || "./assets/avatar-chip.jpg");
  }
  function applyChatUserModalBaseAvatar(avatarUrl, id, title) {
    if (!modalAvatar || !modalAvatarPlaceholder) return;
    var fallback = chatUserModalStableFallbackAvatar(id || title);
    var requested = String(avatarUrl || "").trim();
    modalAvatar.classList.remove("chat-user-modal__avatar--rating-art");
    modalAvatar.src = requested || fallback;
    modalAvatar.alt = title || "Игрок";
    modalAvatar.onerror = function () {
      modalAvatar.onerror = null;
      modalAvatar.src = fallback;
    };
    modalAvatar.style.display = "";
    modalAvatarPlaceholder.style.display = "none";
  }
  function syncChatUserModalRatingArt(nick) {
    var art = null;
    if (nick && typeof window.pokerGetSummerRatingPlayerArt === "function") {
      art = window.pokerGetSummerRatingPlayerArt(nick);
    }
    if (!modalRatingArt || !modalRatingArtImg) return Promise.resolve(false);
    if (!art || !art.src) {
      art = chatUserModalDefaultHeroArt(chatUserModalProfileGender);
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
        applyChatUserModalRoundRatingArt(art, nick);
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
      modalRatingArtImg.classList.toggle("chat-user-modal__rating-art-img--default-hero", art.defaultHero === true);
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
    var text = chatUserModalRatingTotalRewardText(ratingNick);
    var cacheKey = chatUserModalRatingTotalCacheKey(ratingNick);
    if (text && cacheKey) chatUserModalRatingTotalCache[cacheKey] = text;
    modalRatingTabSum.textContent = text;
    modalRatingTabSum.hidden = !text;
    if (modalRatingTab && text) {
      modalRatingTab.setAttribute("aria-label", "Призовые в турнирах " + text + ". Подробнее");
    }
  }
  function chatUserModalRatingTotalCacheKey(nick) {
    return String(nick || "").trim().replace(/^@+/, "").toLowerCase();
  }
  function loadChatUserModalRatingTotalReward(nick) {
    var ratingNick = String(nick || "").trim();
    var cacheKey = chatUserModalRatingTotalCacheKey(ratingNick);
    if (!cacheKey) return Promise.resolve("");
    chatUserModalRatingTotalSeq += 1;
    var seq = chatUserModalRatingTotalSeq;
    if (!chatUserModalRatingTotalRequests[cacheKey]) {
      var ready = typeof window.pokerEnsureScriptDomains === "function"
        ? Promise.resolve(window.pokerEnsureScriptDomains(["rating-summer"]))
        : Promise.resolve(false);
      chatUserModalRatingTotalRequests[cacheKey] = ready.then(function () {
        var text = chatUserModalRatingTotalRewardText(ratingNick);
        if (text) chatUserModalRatingTotalCache[cacheKey] = text;
        return text;
      }).catch(function () {
        return chatUserModalRatingTotalRewardText(ratingNick);
      }).then(function (text) {
        delete chatUserModalRatingTotalRequests[cacheKey];
        return text;
      });
    }
    return chatUserModalRatingTotalRequests[cacheKey].then(function (text) {
      if (seq !== chatUserModalRatingTotalSeq || !chatUserModalSameRatingNick(chatUserModalRatingNick, ratingNick)) return text;
      if (modalRatingTabSum) {
        modalRatingTabSum.textContent = text || "—";
        modalRatingTabSum.hidden = false;
      }
      if (modalRatingTab) {
        modalRatingTab.setAttribute("aria-label", text
          ? "Призовые в турнирах " + text + ". Подробнее"
          : "Призовые в турнирах. Подробнее");
      }
      return text;
    });
  }
  function chatUserModalRatingTotalRewardText(nick) {
    var ratingNick = String(nick || "").trim();
    var getTotalReward = typeof window.pokerGetRatingPlayerTotalReward === "function"
      ? window.pokerGetRatingPlayerTotalReward
      : (typeof window.pokerGetWinterRatingPlayerTotalReward === "function" ? window.pokerGetWinterRatingPlayerTotalReward : null);
    if (!ratingNick || !getTotalReward) return "";
    return chatUserModalFormatAchievementRub(getTotalReward(ratingNick));
  }
  function chatUserModalRatingTotalHtml(ratingNick) {
    var text = chatUserModalRatingTotalRewardText(ratingNick);
    if (!text) return "";
    return (
      '<div class="chat-user-modal__rating-tabs">' +
        '<button type="button" class="chat-user-modal__rating-tab" data-profile-rating-total="1" aria-label="Призовые в турнирах ' + escapeHtml(text) + '. Подробнее">' +
          '<span class="chat-user-modal__rating-tab-main">Призовые в турнирах <span class="chat-user-modal__rating-tab-sum">' + escapeHtml(text) + "</span></span>" +
          '<span class="chat-user-modal__rating-tab-more">Подробнее &gt;&gt;</span>' +
        "</button>" +
      "</div>"
    );
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
  function chatUserModalManualAchievements(ratingNick) {
    if (!String(ratingNick || "").trim()) return [];
    var rows = [];
    var poker21LeaderboardWinners = [
      { aliases: ["ПокерМанки", "Манки"], place: 1, reward: 250000 },
      { aliases: ["Waaarr", "Waaarrr", "Waaar", "Ваар"], place: 2, reward: 150000 },
      { aliases: ["Coo1er91", "NeCoo1er91", "Кулер"], place: 3, reward: 100000 },
    ];
    var leaderboardWin = poker21LeaderboardWinners.find(function (winner) {
      return winner.aliases.some(function (alias) { return chatUserModalSameRatingNick(alias, ratingNick); });
    });
    if (leaderboardWin) {
      rows.push({
        title: "Лидерборд Poker21",
        rows: [{ label: leaderboardWin.place + " место · " + leaderboardWin.reward.toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " ₽" }],
        info: "Ачивка за попадание в топ-3 лидерборда Poker21.",
        image: "./assets/home-mtt-leaderboard-winners.webp?v=1",
      });
    }
    if (chatUserModalSameRatingNick("Coo1er91", ratingNick) || chatUserModalSameRatingNick("Кулер", ratingNick)) {
      rows.push({
        title: "Пухомет",
        rows: [{ label: "Особая ачивка Кулера" }],
        info: "Особая клубная ачивка для Кулера.",
        image: "./assets/chat-profile-achievement-puhomet.webp",
      });
    }
    return rows;
  }
  function chatUserModalIsRybnadzor(ratingNick) {
    return ["Рыбнадзор", "МужНаЧас", "Муж на час"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalIsFox(ratingNick) {
    return ["Фокс", "мистерFox", "Мистер Fox", "MrFox", "Mr Fox"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalIsHakas(ratingNick) {
    return ["Hakas", "Хакас"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalIsAza32(ratingNick) {
    return ["Aza32", "Aza", "Аза32", "Аза"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalIsPorquinho(ratingNick) {
    return ["Porquinho", "Поркиньо", "Поркиньё"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalIsShtukatur(ratingNick) {
    return ["Штукатур", "Shtukatur"].some(function (nick) {
      return chatUserModalSameRatingNick(nick, ratingNick);
    });
  }
  function chatUserModalSngChampionBannerHtml(ratingNick) {
    var placement = (chatUserModalIsHakas(ratingNick) || chatUserModalIsAza32(ratingNick)) ? {
      badge: "Победители",
      name: "Hakas + Aza32",
      result: "Чемпионы командного турнира",
      arts: ["./assets/sng-finalist-aza.webp", "./assets/sng-finalist-hakas.webp"],
      className: "team-winner",
      title: "1ый командный СНГ-нокаут баттл Два туза",
    } : (chatUserModalIsPorquinho(ratingNick) || chatUserModalIsShtukatur(ratingNick)) ? {
      badge: "Финалисты",
      name: "Porquinho + Штукатур",
      result: "Финалисты командного турнира",
      arts: ["./assets/sng-finalist-porquinho.webp", "./assets/sng-finalist-shtukatur.webp"],
      className: "team-runner-up",
      title: "1ый командный СНГ-нокаут баттл Два туза",
    } : chatUserModalIsRybnadzor(ratingNick) ? {
      badge: "Победитель",
      name: "МужНаЧас",
      result: "Чемпион турнира",
      art: "./assets/summer-rating-player-rybnadzor.webp",
      className: "winner",
    } : chatUserModalIsFox(ratingNick) ? {
      badge: "2 место",
      name: "мистерFox",
      result: "Финалист турнира",
      art: "./assets/summer-rating-league2-player-mr-fox.webp",
      className: "runner-up",
    } : null;
    if (!placement) return "";
    var artHtml = placement.arts
      ? placement.arts.map(function (art) {
          return '<img src="' + escapeHtml(art) + '" alt="" loading="lazy" decoding="async">';
        }).join("")
      : '<img src="' + escapeHtml(placement.art) + '" alt="" loading="lazy" decoding="async">';
    return '<button type="button" class="chat-user-modal__sng-champion-banner chat-user-modal__sng-champion-banner--' + escapeHtml(placement.className) + '" data-chat-sng-champion-open="1" aria-label="Смотреть первый СНГ-баттл Лиги чемпионов Два туза">' +
      '<span class="chat-user-modal__sng-champion-art" aria-hidden="true">' + artHtml + '</span>' +
      '<span class="chat-user-modal__sng-champion-copy">' +
        '<small>' + escapeHtml(placement.title || "1ый СНГ-баттл Лига чемпионов Два туза") + '</small>' +
        '<em>' + escapeHtml(placement.badge) + '</em>' +
        '<strong>' + escapeHtml(placement.name) + '</strong>' +
        '<b>' + escapeHtml(placement.result) + '</b>' +
      '</span>' +
      '<span class="chat-user-modal__sng-champion-watch">Смотреть</span>' +
    '</button>';
  }
  function chatUserModalOfflineTournamentWins(ratingNick) {
    if (!String(ratingNick || "").trim()) return [];
    var records = [
      {
        nick: "Em13!!",
        label: "Май · APC42 Мейн Калининград",
        detail: "1 место. Выигрыш 2 300 000р в мейне в Калининграде. Отобрался с сателлита за 300р в сателлит за 1200р, там выиграл путевку за 120 000р в Калининград, включающую билет на мейн, и выиграл Мейн.",
      },
      {
        nick: "ПокерМанки",
        label: "Июнь · 239 Калининград Супер баунти",
        detail: "Оффлайн победа: 6 место в турнире за 20 000р. Выигрыш 120 000р: 100 000р за 6 место и 20 000р за 2 нокаута.",
      },
    ];
    return records.filter(function (row) {
      return chatUserModalSameRatingNick(row.nick, ratingNick);
    }).map(function (row) {
      return { label: row.label, detail: row.detail };
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
  function chatUserModalClubChoiceDescription(nick, monthKey, description) {
    var text = String(description || "").trim();
    if (text) return text;
    if (String(monthKey || "") === "2026-05" && chatUserModalSameRatingNick(nick, "Em13!!")) {
      return "Выигрыш 2 300 000р в мейне в Калининграде за 1е место. Отобрался с сателлита за 300р в сателлит за 1200р, там выиграл путевку за 120 000р в Калининград, включающую билет на мейн, и выиграл Мейн.";
    }
    return "";
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
  function chatUserModalRaffleTargetKeys(ratingNick, profileData, userId) {
    var keys = [];
    chatUserModalRaffleAddKey(keys, "user", userId || chatUserModalUserId);
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
        chatUserModalSameRatingNick(row && row.name, nick) ||
        chatUserModalSameRatingNick(row && row.nick, nick)
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
      if (cached && !cached.activeOnly && !cached.archiveDeferred) return Promise.resolve(Array.isArray(cached.raffles) ? cached.raffles : []);
    } catch (eCachedRaffles) {}
    try {
      var compactCached = window._raffleAchievementsCache && window._raffleAchievementsCache.data && window._raffleAchievementsCache.data.ok ? window._raffleAchievementsCache.data : null;
      if (compactCached && Date.now() - (window._raffleAchievementsCache.time || 0) < 10 * 60 * 1000) {
        return Promise.resolve(Array.isArray(compactCached.raffles) ? compactCached.raffles : []);
      }
    } catch (eCachedRaffleAchievements) {}
    if (!base || typeof fetch !== "function") return Promise.resolve([]);
    var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    return fetch(base + "/api/raffles" + query + "&mode=achievements", { cache: "default" })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          try { window._raffleAchievementsCache = { data: data, time: Date.now() }; } catch (eSetRafflesCache) {}
          return Array.isArray(data.raffles) ? data.raffles : [];
        }
        return [];
      })
      .catch(function () { return []; });
  }
  function getChatUserModalRaffleLuckReady(ratingNick, profileData, userId) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
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
          var place = index + 1;
          items.push({
            label:
              String(place) + " место в розыгрыше" +
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
      var apiBase = base || (typeof getApiBase === "function" ? getApiBase() : "");
      if (apiBase && typeof fetch === "function") {
        fetch(apiBase.replace(/\/$/, "") + "/api/club-choice-vote?mode=achievements", { cache: "default" })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data && data.ok && Array.isArray(data.rows)) {
              window.POKER_CLUB_CHOICE_ACHIEVEMENTS = data.rows;
              resolve(true);
              return;
            }
            loadClubChoiceStaticRows(resolve);
          })
          .catch(function () {
            loadClubChoiceStaticRows(resolve);
          });
        return;
      }
      loadClubChoiceStaticRows(resolve);
    });
    return chatUserModalClubChoiceScriptReady;
  }
  function loadClubChoiceStaticRows(resolve) {
      if (typeof document === "undefined") {
        resolve(false);
        return;
      }
      var script = document.createElement("script");
      var appVersion = (document.documentElement && document.documentElement.getAttribute("data-app-version")) || "3.624";
      script.src = "./club-choice-achievements.js?v=" + encodeURIComponent(appVersion);
      script.async = false;
      script.onload = function () { resolve(true); };
      script.onerror = function () { resolve(false); };
      (document.head || document.documentElement).appendChild(script);
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
  function getChatUserModalClubChoiceReady(ratingNick, profileData, userId) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
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
        }).slice(0, 1).forEach(function (winner, index) {
          if (!chatUserModalRaffleRowsMatch(winner, targetKeys, ratingNick)) return;
          var place = parseInt(winner && winner.place, 10) || (index + 1);
          var votes = winner && winner.votes != null ? parseInt(winner.votes, 10) : null;
          var description = chatUserModalClubChoiceDescription(winner && winner.nick, monthKey, winner && winner.description);
          list.push({
            label:
              (month ? month.charAt(0).toUpperCase() + month.slice(1) + " · " : "") +
              "Топ" + String(place) +
              (votes != null && isFinite(votes) ? ": " + chatUserModalVoteCountText(votes) : ""),
            detail: description,
          });
        });
        return list;
      }, []);
    });
  }
  function chatUserModalSngRows() {
    var source = window.POKER_SNG_CHAMPIONS_ACHIEVEMENTS || window.pokerSngChampionsAchievements || [];
    return Array.isArray(source) ? source : [];
  }
  function chatUserModalSngAchievementsForRows(targetKeys, ratingNick) {
    return chatUserModalSngRows().reduce(function (list, seasonRow) {
      var completedAt = String(seasonRow && seasonRow.completedAt || "").trim();
      var season = String(seasonRow && seasonRow.season || "").trim();
      (Array.isArray(seasonRow && seasonRow.winners) ? seasonRow.winners : []).forEach(function (winner) {
        if (!chatUserModalRaffleRowsMatch(winner, targetKeys, ratingNick)) return;
        var place = parseInt(winner && winner.place, 10) || 0;
        if (!place || place > 2) return;
        var label = String(place) + " место";
        if (place === 1) label += " · Чемпион СНГ сезона";
        else if (place === 2) label += " · Финалист СНГ сезона";
        if (season) label += " · " + season;
        list.push({
          label: label,
          detail: completedAt ? "Турнир завершен: " + completedAt.slice(0, 10) : "",
        });
      });
      return list;
    }, []);
  }
  function getChatUserModalSngAchievementsReady(ratingNick, profileData, userId) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
    if (!targetKeys.length && !String(ratingNick || "").trim()) return Promise.resolve([]);
    if (chatUserModalSngRows().length) return Promise.resolve(chatUserModalSngAchievementsForRows(targetKeys, ratingNick));
    var apiBase = base || (typeof getApiBase === "function" ? getApiBase() : "");
    if (!apiBase || typeof fetch !== "function") return Promise.resolve([]);
    if (!chatUserModalSngAchievementsReady) {
      chatUserModalSngAchievementsReady = fetch(apiBase.replace(/\/$/, "") + "/api/sng-champions?mode=achievements", { cache: "default" })
        .then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.ok && Array.isArray(data.rows)) window.POKER_SNG_CHAMPIONS_ACHIEVEMENTS = data.rows;
          return chatUserModalSngRows();
        })
        .catch(function () { return []; });
    }
    return chatUserModalSngAchievementsReady.then(function () {
      return chatUserModalSngAchievementsForRows(targetKeys, ratingNick);
    });
  }
  function getChatUserModalTournamentAchievementsReady(ratingNick) {
    var nick = String(ratingNick || "").trim();
    if (!nick) return Promise.resolve(null);
    function readStats() {
      return typeof window.pokerGetTournamentAchievementStatsReady === "function"
        ? window.pokerGetTournamentAchievementStatsReady(nick)
        : Promise.resolve(null);
    }
    if (typeof window.pokerGetTournamentAchievementStatsReady === "function") return readStats();
    if (typeof window.pokerEnsureScriptDomains === "function") {
      return Promise.resolve(window.pokerEnsureScriptDomains(["app"]))
        .then(readStats)
        .catch(function () { return null; });
    }
    return Promise.resolve(null);
  }
  function getChatUserModalRespectScoreReady(userId, isSelfProfile) {
    var uid = String(userId || chatUserModalUserId || "").trim();
    if (typeof fetch !== "function") return Promise.resolve(null);
    if (!uid && !isSelfProfile) return Promise.resolve(null);
    var url = "";
    if (isSelfProfile) {
      var selfQuery = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
      url = base + "/api/respect" + selfQuery;
    } else {
      var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "&initData=";
      url = base + "/api/respect?userId=" + encodeURIComponent(uid) + query;
    }
    return fetch(url, { cache: "no-store" })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok || data.score == null) return null;
        var score = parseInt(data.score, 10);
        return score === score ? score : null;
      })
      .catch(function () { return null; });
  }
  function getChatUserModalFriendsCountReady(userId, isSelfProfile) {
    if (!isSelfProfile || !base || typeof fetch !== "function") return Promise.resolve(null);
    var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    return fetch(base + "/api/friends" + query + "&_t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.friends)) return null;
        return data.friends.filter(function (row) { return !!row; }).length;
      })
      .catch(function () { return null; });
  }
  function getChatUserModalReferralsCountReady(isSelfProfile) {
    if (!isSelfProfile || !base || typeof fetch !== "function") return Promise.resolve(null);
    var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    return fetch(base + "/api/referrals" + query + "&summary=1", { cache: "default" })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) return null;
        var totals = data.totals || {};
        var invited = Array.isArray(data.invited) ? data.invited : [];
        var count = parseInt(totals.invited, 10);
        return count === count ? count : invited.length;
      })
      .catch(function () { return null; });
  }
  function getChatUserModalGuestbookReviewReady(profileData, userId) {
    if (!base || typeof fetch !== "function") return Promise.resolve(false);
    var targetIds = [
      userId,
      profileData && profileData.userId,
      profileData && profileData.accountId,
      profileData && profileData.dtId,
      profileData && profileData.chatUserId,
      profileData && profileData.memberId,
    ].map(function (value) { return String(value || "").trim(); }).filter(Boolean);
    if (!targetIds.length) return Promise.resolve(false);
    var body = { action: "list" };
    if (typeof pokerApiAuthJsonBody === "function") body = pokerApiAuthJsonBody(body);
    return fetch(base + "/api/club-guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    }).then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.posts)) return false;
        return data.posts.some(function (post) {
          if (!post || post.type !== "review") return false;
          return [post.authorProfileId, post.authorId].some(function (value) {
            var id = String(value || "").trim();
            return !!id && targetIds.indexOf(id) >= 0;
          });
        });
      }).catch(function () { return false; });
  }
  function getChatUserModalRaffleWinCountReady(ratingNick, profileData, userId) {
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
    if (!targetKeys.length && !String(ratingNick || "").trim()) return Promise.resolve(0);
    return getChatUserModalRafflesReady().then(function (raffles) {
      var count = 0;
      (Array.isArray(raffles) ? raffles : []).forEach(function (raffle) {
        if (!raffle || raffle.status === "cancelled") return;
        (Array.isArray(raffle.winners) ? raffle.winners : []).forEach(function (winner) {
          if (chatUserModalRaffleWinnerExpired(winner)) return;
          if (chatUserModalRaffleRowsMatch(winner, targetKeys, ratingNick)) count += 1;
        });
      });
      return count;
    }).catch(function () { return 0; });
  }
  function chatUserModalPickNumberFromObject(source, keys) {
    if (!source || typeof source !== "object") return 0;
    for (var i = 0; i < keys.length; i++) {
      var value = source[keys[i]];
      if (value == null || value === "") continue;
      var n = parseInt(String(value).replace(/[^\d-]/g, ""), 10);
      if (n === n && n > 0) return n;
    }
    return 0;
  }
  function chatUserModalPrivateCash2040PlayedCount(ratingNick, profileData, userId) {
    var keys = [
      "privateCash2040Played",
      "privateCash2040PlayedCount",
      "privateCash20_40Played",
      "privateCash20_40PlayedCount",
      "privateCashPlayed2040",
      "privateCashPlayed20_40",
      "clubPrivateCash2040Played",
      "clubPrivateCash2040PlayedCount",
      "private_cash_2040_played",
      "private_cash_2040_played_count",
      "private_cash_2040_count",
      "private_cash_played_2040",
      "cash2040Played",
      "cash2040PlayedCount",
      "cash20_40Played",
      "cash20_40PlayedCount"
    ];
    var sources = [
      profileData,
      profileData && profileData.totalCounter,
      profileData && profileData.total_counter,
      profileData && profileData.achievements,
      profileData && profileData.privateCash,
      profileData && profileData.private_cash,
      profileData && profileData.cashGames,
      profileData && profileData.cash_games
    ];
    for (var i = 0; i < sources.length; i++) {
      var count = chatUserModalPickNumberFromObject(sources[i], keys);
      if (count > 0) return count;
    }
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
    var rows = typeof window !== "undefined" && Array.isArray(window.POKER_PRIVATE_CASH_RESULTS)
      ? window.POKER_PRIVATE_CASH_RESULTS
      : [];
    if (!rows.length || (!targetKeys.length && !String(ratingNick || "").trim())) return 0;
    return rows.reduce(function (sum, row) {
      if (!row || row.cancelled || row.status === "cancelled") return sum;
      var stakes = String(row.stakes || row.blinds || row.limit || row.game || "").replace(/\s+/g, "").toLowerCase();
      if (stakes && stakes.indexOf("20/40") === -1 && stakes.indexOf("20-40") === -1 && stakes.indexOf("2040") === -1) return sum;
      var players = Array.isArray(row.players) ? row.players : Array.isArray(row.participants) ? row.participants : [];
      if (players.length) {
        return sum + (players.some(function (player) {
          return chatUserModalRaffleRowsMatch(player, targetKeys, ratingNick);
        }) ? 1 : 0);
      }
      return sum + (chatUserModalRaffleRowsMatch(row, targetKeys, ratingNick) ? 1 : 0);
    }, 0);
  }
  function chatUserModalNormalizeClubAdminText(value) {
    return String(value || "").trim().toLowerCase().replace(/ё/g, "е").replace(/^@+/, "");
  }
  function chatUserModalIsClubAdminId(value) {
    var id = chatUserModalNormalizeClubAdminText(value);
    if (!id) return false;
    var bare = id.replace(/^tg_/, "");
    var ids = ["tg_2144406710", "tg_1897001087"];
    try {
      if (typeof CHAT_ADMIN_IDS !== "undefined" && Array.isArray(CHAT_ADMIN_IDS) && CHAT_ADMIN_IDS.length) {
        ids = CHAT_ADMIN_IDS;
      }
    } catch (eReadChatAdminIds) {}
    return ids.some(function (adminId) {
      var normalized = chatUserModalNormalizeClubAdminText(adminId);
      return normalized === id || normalized.replace(/^tg_/, "") === bare;
    });
  }
  function chatUserModalClubAdminNameValues(ratingNick, profileData) {
    var values = [ratingNick];
    var keys = [
      "name",
      "userName",
      "username",
      "telegramUsername",
      "displayName",
      "firstName",
      "contactName",
      "nickname",
      "nick",
      "pokerPlusNickname",
      "poker21Nickname",
      "ratingNick",
    ];
    keys.forEach(function (key) {
      if (profileData && profileData[key] != null) values.push(profileData[key]);
    });
    return values.map(chatUserModalNormalizeClubAdminText).filter(Boolean);
  }
  function chatUserModalIsClubAdminUser(ratingNick, profileData, userId) {
    if (chatUserModalIsClubAdminId(userId)) return true;
    var idKeys = ["userId", "memberId", "accountId", "dtId", "id", "telegramId", "telegram_id", "tgId"];
    for (var i = 0; i < idKeys.length; i++) {
      if (profileData && chatUserModalIsClubAdminId(profileData[idKeys[i]])) return true;
    }
    var adminNames = {
      "анна": true,
      "аня": true,
      "anna": true,
      "anya": true,
      "qweenpoker": true,
      "вика": true,
      "vika": true,
      "vikipoker": true,
    };
    return chatUserModalClubAdminNameValues(ratingNick, profileData).some(function (name) {
      return adminNames[name] === true;
    });
  }
  function syncChatUserModalCompetitivePrivacy(ratingNick, profileData, userId) {
    chatUserModalHideCompetitiveStats = chatUserModalIsClubAdminUser(ratingNick, profileData, userId);
    if (modalPlayerStatsSection) modalPlayerStatsSection.hidden = chatUserModalHideCompetitiveStats;
    if (modalRatingTabs && chatUserModalHideCompetitiveStats) modalRatingTabs.hidden = true;
    if (modalRatingRanks && chatUserModalHideCompetitiveStats) modalRatingRanks.hidden = true;
  }
  function getChatUserModalSelfBetWinsReady(ratingNick, profileData, userId) {
    var base = typeof getApiBase === "function" ? getApiBase().replace(/\/$/, "") : "";
    var targetKeys = chatUserModalRaffleTargetKeys(ratingNick, profileData, userId);
    return fetch(base + "/api/tournament-bet?mode=achievements", { cache: "default" }).then(function (response) {
      if (!response.ok) throw new Error("self bet achievements unavailable");
      return response.json();
    }).then(function (data) {
      var rows = data && Array.isArray(data.rows) ? data.rows : [];
      var row = rows.find(function (item) { return chatUserModalRaffleRowsMatch(item, targetKeys, ratingNick); });
      return Math.max(0, Number(row && row.wins) || 0);
    }).catch(function () { return 0; });
  }
  function getChatUserModalAchievementMetricsReady(ratingNick, profileData, userId, isSelfProfile) {
    var isClubAdmin = chatUserModalIsClubAdminUser(ratingNick, profileData, userId);
    var privateCash2040Played = chatUserModalPrivateCash2040PlayedCount(ratingNick, profileData, userId);
    if (isClubAdmin) {
      return Promise.resolve({
        tournaments: null,
        raffleWins: 0,
        respect: null,
        friends: null,
        referrals: null,
        guestbookReview: false,
        privateCash2040Played: privateCash2040Played,
        selfBetWins: 0,
        isClubAdmin: true,
        isSelfProfile: !!isSelfProfile,
      });
    }
    return Promise.all([
      getChatUserModalTournamentAchievementsReady(ratingNick),
      getChatUserModalRaffleWinCountReady(ratingNick, profileData, userId),
      getChatUserModalRespectScoreReady(userId, isSelfProfile),
      getChatUserModalFriendsCountReady(userId, isSelfProfile),
      getChatUserModalReferralsCountReady(isSelfProfile),
      getChatUserModalGuestbookReviewReady(profileData, userId),
      getChatUserModalSelfBetWinsReady(ratingNick, profileData, userId),
    ]).then(function (parts) {
      return {
        tournaments: parts && parts[0] || null,
        raffleWins: parts && parts[1] != null ? parts[1] : 0,
        respect: parts && parts[2] != null ? parts[2] : null,
        friends: parts && parts[3] != null ? parts[3] : null,
        referrals: parts && parts[4] != null ? parts[4] : null,
        guestbookReview: !!(parts && parts[5]),
        privateCash2040Played: privateCash2040Played,
        selfBetWins: parts && parts[6] != null ? parts[6] : 0,
        isClubAdmin: false,
        isSelfProfile: !!isSelfProfile,
      };
    });
  }
  function chatUserModalAchievementMeta(title) {
    var key = String(title || "").toLowerCase();
    if (key.indexOf("оставил отзыв") >= 0) return { mod: "club-review", label: "ОСТАВИЛ<br>ОТЗЫВ", img: "./assets/chat-profile-achievement-club-review-v2.webp?v=1" };
    if (key.indexOf("снг") >= 0) return { mod: "sng-champion", label: "СНГ<br>ЛИГА<br>ЧЕМПИОНОВ", img: "./assets/chat-profile-achievement-sng-champion-card.webp" };
    if (key.indexOf("админ") >= 0) return { mod: "club-admin", label: "АДМИН<br>КЛУБА", img: "./assets/home-hall-of-fame-medal.png" };
    if (key.indexOf("народ") >= 0 || key.indexOf("выбор клуба") >= 0) return { mod: "club-choice", label: "НАРОДНЫЙ<br>ГЕРОЙ", img: "./assets/home-hall-of-fame-medal.png" };
    if (key.indexOf("счастлив") >= 0) return { mod: "lucky-month", label: "СЧАСТЛИВЧИК<br>МЕСЯЦА", img: "./assets/home-menu-icon-raffle-tickets.webp" };
    if (key.indexOf("оффлайн") >= 0 || key.indexOf("offline") >= 0) return { mod: "offline-win", label: "ОФФЛАЙН<br>ПОБЕДА", img: "./assets/chat-profile-achievement-offline-win.webp" };
    if (key.indexOf("ставк") >= 0 && key.indexOf("себя") >= 0) return { mod: "self-bet-win", label: "ПОБЕДИТЕЛЬ<br>СТАВКИ<br>НА СЕБЯ", img: "./assets/tournament-bet-self-hero-v2.jpg" };
    if (key.indexOf("лидерборд") >= 0 && key.indexOf("poker21") >= 0) return { mod: "poker21-leaderboard", label: "ЛИДЕРБОРД<br>POKER21<br>ТОП-3", img: "./assets/home-mtt-leaderboard-winners.webp?v=1" };
    if (key.indexOf("первый") >= 0) return { mod: "first-win", label: "ПЕРВЫЙ<br>ЗАНОС", img: "./assets/tournament-day-trophy.png" };
    if (key.indexOf("король") >= 0) return { mod: "tournament-king", label: "КОРОЛЬ<br>ТУРНИРОВ", img: "./assets/chat-profile-achievement-cup.webp" };
    if (key.indexOf("миллион") >= 0) return { mod: "millionaire", label: "МИЛЛИОНЕР<br>КЛУБА", img: "./assets/chat-profile-achievement-top-win.webp" };
    if (key.indexOf("вице") >= 0 && key.indexOf("месяц") >= 0) return { mod: "month-vice-champion", label: "ВИЦЕ<br>ЧЕМПИОН<br>МЕСЯЦА", img: "./assets/chat-profile-achievement-month-vice-champion.webp" };
    if (key.indexOf("чемпион месяца") >= 0) return { mod: "month-champion", label: "ЧЕМПИОН<br>МЕСЯЦА", img: "./assets/chat-profile-achievement-month-champion.webp" };
    if (key.indexOf("золот") >= 0) return { mod: "gold-ticket", label: "ЗОЛОТОЙ<br>БИЛЕТ", img: "./assets/home-menu-icon-raffle-tickets.webp" };
    if (key.indexOf("приват") >= 0 && key.indexOf("кеш") >= 0) return { mod: "private-cash", label: "КЛУБНЫЙ<br>КЕШ<br>20/40", img: "./assets/home-club-choice-private-cash-glow.webp" };
    if (key.indexOf("уважаем") >= 0 || key.indexOf("любим") >= 0) return { mod: "favorite", label: "УВАЖАЕМЫЙ<br>ЧЕЛОВЕК", img: "./assets/home-menu-icon-level-fish.png" };
    if (key.indexOf("команд") >= 0) return { mod: "team-player", label: "КОМАНДНЫЙ<br>ИГРОК", img: "./assets/chat-profile-achievement-team-friends-v2.webp" };
    if (key.indexOf("амбассад") >= 0) return { mod: "ambassador", label: "АМБАССАДОР", img: "./assets/chat-profile-achievement-ambassador.webp" };
    if (key.indexOf("пухом") >= 0) return { mod: "puhomet", label: "ПУХОМЕТ", img: "./assets/chat-profile-achievement-puhomet.webp" };
    if (key.indexOf("топ10") >= 0) return { mod: "top10", label: "ТОП-10<br>РЕЙТИНГА", img: "./assets/chat-profile-achievement-top10.webp" };
    if (key.indexOf("герой дня") >= 0) return { mod: "cup", label: "ГЕРОЙ<br>ДНЯ", img: "./assets/chat-profile-achievement-cup.webp" };
    if (key.indexOf("занос") >= 0 && key.indexOf("50") >= 0) return { mod: "big-win", label: "ЗАНОС<br>ОТ 50<br>ДО 100К", img: "./assets/chat-profile-achievement-50k.webp" };
    if (key.indexOf("занос") >= 0 && key.indexOf("100") >= 0) return { mod: "big-win-plus", label: "ЗАНОС<br>ОТ 100К", img: "./assets/chat-profile-achievement-100k.webp" };
    if (key.indexOf("больш") >= 0 && key.indexOf("занос") >= 0) return { mod: "big-win", label: "БОЛЬШОЙ<br>ЗАНОС", img: "./assets/chat-profile-achievement-top-win.webp" };
    if (key.indexOf("топ занос клуба") >= 0) return { mod: "top-win-2026", label: "ТОП ЗАНОС<br>КЛУБА<br>2026", img: "./assets/chat-profile-achievement-top-win-2026.webp" };
    if (key.indexOf("занос") >= 0) return { mod: "top-win", label: "ТОП<br>ЗАНОС", img: "./assets/chat-profile-achievement-top-win.webp" };
    if (key.indexOf("легенд") >= 0) return { mod: "legend", label: "ЛЕГЕНДА<br>КЛУБА", img: "./assets/chat-profile-achievement-legend.webp" };
    if (key.indexOf("весн") >= 0) return { mod: "cup-spring", label: "КУБОК<br>ВЕСНЫ", img: "./assets/chat-profile-achievement-cup-spring.webp" };
    if (key.indexOf("зим") >= 0) return { mod: "cup-winter", label: "КУБОК<br>ЗИМЫ", img: "./assets/chat-profile-achievement-cup-winter.webp" };
    if (key.indexOf("лет") >= 0) return { mod: "cup-summer", label: "КУБОК<br>ЛЕТА", img: "./assets/chat-profile-achievement-cup-summer.webp" };
    return { mod: "cup", label: "КУБОК<br>РЕЙТИНГА", img: "./assets/chat-profile-achievement-cup.webp" };
  }
  function chatUserModalEncodeData(value) {
    try {
      return encodeURIComponent(String(value == null ? "" : value));
    } catch (eEncodeAchievementData) {
      return "";
    }
  }
  function chatUserModalDecodeData(value) {
    try {
      return decodeURIComponent(String(value || ""));
    } catch (eDecodeAchievementData) {
      return String(value || "");
    }
  }
  function chatUserModalAchievementRule(title) {
    var key = String(title || "").toLowerCase();
    if (key.indexOf("оставил отзыв") >= 0) return "Опубликуйте отзыв о клубе в книге отзывов и жалоб. Достижение выдается один раз и не имеет уровней.";
    if (key.indexOf("снг") >= 0) return "Даётся гранд-финалистам турнира СНГ Лига Чемпионов Два Туза: 1 место получает статус чемпиона СНГ сезона, 2 место — финалиста.";
    if (key.indexOf("админ") >= 0) return "Особая клубная ачивка для администраторов клуба. Для Вики и Ани показывается только эта карточка.";
    if (key.indexOf("оффлайн") >= 0 || key.indexOf("offline") >= 0) return "Ручная клубная ачивка за победу в живом оффлайн-турнире. Записи добавляются администратором клуба.";
    if (key.indexOf("ставк") >= 0 && key.indexOf("себя") >= 0) return "За каждую победу среди участников события «Ставка на себя» начисляется одна ачивка. Победа засчитывается после выбора победителя и выплаты банка.";
    if (key.indexOf("лидерборд") >= 0 && key.indexOf("poker21") >= 0) return "Даётся игрокам, занявшим 1, 2 или 3 место в итоговом лидерборде Poker21. В карточке показываются место и полученная награда.";
    if (key.indexOf("первый") >= 0) return "Открывается за первую победу в клубном турнире. Считается 1 место в турнирах, которые попали в рейтинговую историю клуба.";
    if (key.indexOf("король") >= 0) return "Считаются первые места в турнирах из общей рейтинговой истории: зима, весна и лето. Уровни: 1, 15, 50, 100 и 250 побед.";
    if (key.indexOf("занос") >= 0 && key.indexOf("50") >= 0 && key.indexOf("100") >= 0) return "Открывается за разовый призовой выигрыш от 50 000 ₽ до 99 999 ₽ в одном турнире.";
    if (key.indexOf("занос") >= 0 && key.indexOf("100") >= 0) return "Открывается за разовый призовой выигрыш от 100 000 ₽ и выше в одном турнире.";
    if (key.indexOf("больш") >= 0 && key.indexOf("50") >= 0) return "Открывается за разовый призовой выигрыш от 50 000 ₽ до 99 999 ₽ в одном турнире.";
    if (key.indexOf("больш") >= 0 && key.indexOf("100") >= 0) return "Открывается за разовый призовой выигрыш от 100 000 ₽ и выше в одном турнире.";
    if (key.indexOf("миллион") >= 0) return "Суммируются все призовые игрока из клубной турнирной истории. У достижения есть уровни по общей сумме выигрышей.";
    if (key.indexOf("вице") >= 0 && key.indexOf("месяц") >= 0) return "Дается за топ-2 месяца по сумме призовых. Считается только общая сумма выигрышей игрока за месяц.";
    if (key.indexOf("чемпион месяца") >= 0) return "Дается за топ-1 месяца по сумме призовых. Считается только общая сумма выигрышей игрока за месяц.";
    if (key.indexOf("золот") >= 0) return "Считаются победы игрока в розыгрышах клуба. У достижения есть уровни по количеству выигранных розыгрышей.";
    if (key.indexOf("приват") >= 0 && key.indexOf("кеш") >= 0) return "Считаются сыгранные сессии приватного клубного кеша 20/40. Результаты будут попадать из блока результатов в разделе «Приватный кеш». Уровни: 1, 5, 15, 30, 50 и 100 сессий.";
    if (key.indexOf("уважаем") >= 0 || key.indexOf("любим") >= 0) return "Считается уважение от игроков. У достижения есть уровни по набранной репутации.";
    if (key.indexOf("команд") >= 0) return "Считаются принятые друзья в профиле игрока. У достижения есть уровни по размеру покерного круга.";
    if (key.indexOf("амбассад") >= 0) return "Считаются приглашенные игроки по реферальной системе клуба. У достижения есть уровни по количеству приглашенных.";
    if (key.indexOf("весн") >= 0) return "Дается за топ-3 место в весеннем рейтинге клуба. В карточке показывается место и лига.";
    if (key.indexOf("зим") >= 0) return "Дается за топ-3 место в зимнем рейтинге клуба. В карточке показывается итоговое место за сезон.";
    if (key.indexOf("лет") >= 0) return "Летний рейтинг сейчас идет. Когда сезон завершится, здесь появятся места и награды по итогам лета.";
    if (key.indexOf("легенд") >= 0) return "Особая клубная ачивка для игроков, которые отмечены клубом как легенды Два туза.";
    if (key.indexOf("топ занос") >= 0) return "Показывает попадание игрока в список крупнейших разовых турнирных заносов клуба.";
    if (key.indexOf("счастлив") >= 0) return "Дается игрокам из топ-3 месяца по количеству побед в розыгрышах.";
    if (key.indexOf("народ") >= 0 || key.indexOf("выбор клуба") >= 0) return "Дается победителю клубного голосования за достижение месяца.";
    if (key.indexOf("пухом") >= 0) return "Особая клубная ачивка для Кулера.";
    if (key.indexOf("топ10") >= 0) return "Дается за попадание в топ-10 сезонного рейтинга клуба.";
    return "Клубное достижение. Открывается автоматически, когда игрок выполняет условие карточки.";
  }
  function chatUserModalAchievementInfoFrom(title, rows, options, tier) {
    var progress = [];
    var levels = [];
    if (options && options.hideProgress === true) {
      return {
        rule: options.info || chatUserModalAchievementRule(title),
        progress: "",
        levels: "",
      };
    }
    if (tier && options && options.tier) {
      var tierOptions = options.tier;
      var unit = tierOptions.unit || "";
      var valueText = tierOptions.format ? tierOptions.format(tier.value) : String(Math.floor(tier.value));
      if (tier.current) progress.push("Текущий уровень: " + (tier.current.label || valueText + (unit ? " " + unit : "")));
      else progress.push("Текущий уровень: не открыт");
      if (tier.next) {
        var nextText = tierOptions.format ? tierOptions.format(tier.next.value) : String(tier.next.value);
        progress.push("Прогресс: " + valueText + " / " + nextText + (unit ? " " + unit : ""));
      } else if (tier.current) {
        progress.push("Прогресс: " + valueText + (unit ? " " + unit : "") + " · максимум");
      }
      levels = (Array.isArray(tierOptions.tiers) ? tierOptions.tiers : []).map(function (item, index) {
        return String(index + 1) + ". " + String(item && item.label || item && item.value || "");
      }).filter(Boolean);
    } else {
      var progressRows = Array.isArray(options && options.progressRows) ? options.progressRows : rows;
      progress = progressRows.map(function (item) {
        var label = String(item && (item.label || chatUserModalAchievementPlaceLabel(item.row, item.season)) || "");
        var detail = String(item && item.detail || "").trim();
        return label + (detail ? "\n" + detail : "");
      }).filter(Boolean);
      if (!progress.length) progress.push(options && options.placeholder || "Пока не открыто");
    }
    return {
      rule: options.info || chatUserModalAchievementRule(title),
      progress: progress.join("\n"),
      levels: levels.join("\n"),
    };
  }
  function chatUserModalTierState(value, tiers) {
    var val = Math.max(0, Number(value) || 0);
    var list = (Array.isArray(tiers) ? tiers : []).slice().sort(function (a, b) {
      return (Number(a.value) || 0) - (Number(b.value) || 0);
    });
    var current = null;
    var next = null;
    for (var i = 0; i < list.length; i++) {
      var threshold = Number(list[i] && list[i].value) || 0;
      if (val >= threshold) current = list[i];
      else if (!next) next = list[i];
    }
    return {
      value: val,
      tiers: list,
      current: current,
      next: next,
      level: current ? list.indexOf(current) + 1 : 0,
      maxLevel: list.length,
    };
  }
  function chatUserModalTierStars(state) {
    var max = Math.max(0, Number(state && state.maxLevel) || 0);
    var level = Math.max(0, Number(state && state.level) || 0);
    var out = "";
    for (var i = 0; i < max; i++) out += i < level ? "★" : "☆";
    return out;
  }
  function chatUserModalTierDetailsHtml(options) {
    var state = chatUserModalTierState(options.value, options.tiers);
    var unit = options.unit || "";
    var valueText = options.format ? options.format(state.value) : String(Math.floor(state.value));
    var detail = "";
    if (state.current) {
      detail += '<span class="chat-user-modal__achievement-detail">' + escapeHtml(state.current.label || valueText + (unit ? " " + unit : "")) + "</span>";
    } else {
      detail += '<span class="chat-user-modal__achievement-detail">' + escapeHtml(options.lockedLabel || "Пока не открыто") + "</span>";
    }
    if (state.next) {
      var nextText = options.format ? options.format(state.next.value) : String(state.next.value);
      detail += '<span class="chat-user-modal__achievement-detail">' +
        escapeHtml(valueText + " / " + nextText + (unit ? " " + unit : "")) +
        "</span>";
    } else if (state.current) {
      detail += '<span class="chat-user-modal__achievement-detail">' + escapeHtml(valueText + (unit ? " " + unit : "") + " · максимум") + "</span>";
    }
    return {
      html: detail,
      stars: chatUserModalTierStars(state),
      locked: !state.current,
      value: state.value,
      current: state.current,
      next: state.next,
      level: state.level,
      maxLevel: state.maxLevel,
    };
  }
  function chatUserModalAchievementCardHtml(icon, title, rows, options) {
    options = options || {};
    rows = Array.isArray(rows) ? rows : [];
    var meta = chatUserModalAchievementMeta(title);
    var tier = options.tier ? chatUserModalTierDetailsHtml(options.tier) : null;
    var starRows = Array.isArray(options.progressRows) ? options.progressRows : rows;
    var stars = tier ? tier.stars : starRows.map(function () { return "★"; }).join(" ");
    var details = tier ? tier.html : (
      rows.map(function (item) {
        var detail = String(item && item.detail || "").trim();
        return '<span class="chat-user-modal__achievement-detail">' +
          escapeHtml(item.label || chatUserModalAchievementPlaceLabel(item.row, item.season)) +
          "</span>" +
          (detail ? '<span class="chat-user-modal__achievement-detail chat-user-modal__achievement-detail--story">' + escapeHtml(detail) + "</span>" : "");
      }).join("") || '<span class="chat-user-modal__achievement-detail">' + escapeHtml(options.placeholder || "—") + "</span>"
    );
    var isLocked = options.locked === true || (tier ? tier.locked : !rows.length);
    var info = chatUserModalAchievementInfoFrom(title, rows, options, tier);
    var badge = String(options.badge || "").trim();
    var achievementValue = Math.max(0, parseInt(tier ? tier.value : rows.length, 10) || 0);
    var attrs = ' role="button" tabindex="0" data-chat-achievement-info="1"' +
      ' data-chat-achievement-title="' + escapeHtml(chatUserModalEncodeData(title)) + '"' +
      ' data-chat-achievement-value="' + escapeHtml(achievementValue) + '"' +
      ' data-chat-achievement-state="' + escapeHtml(chatUserModalEncodeData(isLocked ? "Пока не открыто" : "Открыто")) + '"' +
      ' data-chat-achievement-rule="' + escapeHtml(chatUserModalEncodeData(info.rule)) + '"' +
      ' data-chat-achievement-progress="' + escapeHtml(chatUserModalEncodeData(info.progress)) + '"' +
      ' data-chat-achievement-levels="' + escapeHtml(chatUserModalEncodeData(info.levels)) + '"' +
      ' aria-label="' + escapeHtml("Открыть описание достижения " + title) + '"';
    if (options.action) {
      attrs += ' data-chat-achievement-action="' + escapeHtml(options.action) + '"';
      attrs += ' data-chat-achievement-action-label="' + escapeHtml(chatUserModalEncodeData(options.actionLabel || options.ariaLabel || "Открыть раздел")) + '"';
    }
    return '<article class="chat-user-modal__achievement chat-user-modal__achievement--' + escapeHtml(meta.mod) +
      (options.extraClass ? " " + escapeHtml(options.extraClass) : "") +
      (isLocked ? " chat-user-modal__achievement--locked" : "") + '"' + attrs + ">" +
      '<span class="chat-user-modal__achievement-title">' + meta.label + "</span>" +
      '<span class="chat-user-modal__achievement-icon" aria-hidden="true"><img src="' + escapeHtml(meta.img) + '" alt="" loading="lazy" decoding="async" /></span>' +
      (badge ? '<span class="chat-user-modal__achievement-badge">' + escapeHtml(badge) + "</span>" : "") +
      '<span class="chat-user-modal__achievement-main">' +
        '<span class="chat-user-modal__achievement-details">' + details + "</span>" +
      "</span>" +
      '<span class="chat-user-modal__achievement-stars" aria-hidden="true">' + escapeHtml(stars.trim()) + "</span>" +
    "</article>";
  }
  function chatUserModalAchievementGroupClass(title) {
    var key = String(title || "").toLowerCase();
    if (key.indexOf("куб") >= 0) return "cups";
    if (key.indexOf("соц") >= 0) return "social";
    return "wins";
  }
  function chatUserModalAchievementGroupHtml(title, html) {
    html = String(html || "");
    if (!html) return "";
    return '<section class="chat-user-modal__achievement-group chat-user-modal__achievement-group--' + escapeHtml(chatUserModalAchievementGroupClass(title)) + '">' +
      '<h5 class="chat-user-modal__achievement-group-title">' + escapeHtml(title) + "</h5>" +
      '<div class="chat-user-modal__achievement-group-list">' + html + "</div>" +
    "</section>";
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
      actionLabel: "Открыть рейтинг лета",
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
  function chatUserModalRubShort(value) {
    var n = Number(value) || 0;
    if (n >= 1000000) return (Math.round(n / 100000) / 10).toString().replace(".", ",").replace(/,0$/, "") + "м";
    if (n >= 1000) return Math.round(n / 1000) + "к";
    return String(Math.round(n));
  }
  function chatUserModalDateStamp(dateStr) {
    var parts = String(dateStr || "").split(".");
    if (parts.length < 3) return 0;
    var day = parseInt(parts[0], 10) || 0;
    var month = parseInt(parts[1], 10) || 0;
    var year = parseInt(parts[2], 10) || 0;
    return year * 10000 + month * 100 + day;
  }
  function chatUserModalBestWinRows(rows, limit) {
    return (Array.isArray(rows) ? rows : []).slice().sort(function (a, b) {
      return chatUserModalDateStamp(b && b.date) - chatUserModalDateStamp(a && a.date);
    }).slice(0, limit || 3).map(function (row) {
      var date = row && row.date ? String(row.date) : "";
      var amount = chatUserModalFormatAchievementRub(row && row.reward);
      return {
        label: (amount || "0 ₽") + (date ? ", " + date : ""),
      };
    });
  }
  function chatUserModalMonthChampionRows(rows) {
    return (Array.isArray(rows) ? rows : []).slice(0, 4).map(function (row) {
      var month = typeof pokerRatingAchievementMonthLabel === "function"
        ? pokerRatingAchievementMonthLabel(row && row.monthKey)
        : String(row && row.monthKey || "");
      var amount = chatUserModalFormatAchievementRub(row && row.reward);
      var place = row && row.place ? String(row.place) + " место" : "топ-3";
      return { label: "Месяц: " + (month || "—") + " · " + place + (amount ? " · " + amount : "") };
    });
  }
  function chatUserModalAchievementsHtml(results, ratingNick, metrics) {
    var luckyMonth = Array.isArray(results && results[4]) ? results[4] : [];
    var clubChoice = Array.isArray(results && results[5]) ? results[5] : [];
    var sngChampions = Array.isArray(results && results[6]) ? results[6] : [];
    metrics = metrics || {};
    if (metrics.isClubAdmin) {
      return chatUserModalAchievementGroupHtml("Социальные", chatUserModalAchievementCardHtml("★", "Админ клуба", [{ label: "Команда клуба" }], {
        info: "Особая клубная ачивка для администраторов клуба. Для Вики и Ани остальные достижения скрыты.",
      }));
    }
    var tournamentStats = metrics.tournaments || {};
    var tournamentKingWins = tournamentStats && tournamentStats.firstPlaces || 0;
    var dayHeroRows = chatUserModalBestWinRows(tournamentStats && tournamentStats.dayHeroes, 1000);
    var manualAchievements = chatUserModalManualAchievements(ratingNick);
    var offlineWins = chatUserModalOfflineTournamentWins(ratingNick);
    if (!String(ratingNick || "").trim() && !luckyMonth.length && !clubChoice.length && !metrics.isSelfProfile) {
      return chatUserModalAchievementGroupHtml("Кубки", chatUserModalSummerCupCardHtml()) +
        chatUserModalAchievementGroupHtml("Турниры", chatUserModalAchievementCardHtml("🏆", "Победа в оффлайн турнире", [], {
          placeholder: "Нет оффлайн побед",
        }));
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
    var monthChampionRows = chatUserModalMonthChampionRows(tournamentStats && tournamentStats.monthlyChampions);
    var viceMonthChampionRows = chatUserModalMonthChampionRows(tournamentStats && tournamentStats.viceMonthlyChampions);
    var cupsHtml =
      chatUserModalAchievementCardHtml("🏆", "Кубок зимы", chatUserModalSeasonCupRows("winter", results && results[2]), {
        extraClass: "chat-user-modal__achievement--season-cup",
      }) +
      chatUserModalAchievementCardHtml("🏆", "Кубок весны", chatUserModalSeasonCupRows("spring", results && results[1]), {
        extraClass: "chat-user-modal__achievement--season-cup",
      }) +
      chatUserModalSummerCupCardHtml() +
      chatUserModalAchievementCardHtml("★", "СНГ Лига Чемпионов", sngChampions, {
        placeholder: "Гранд-финалист",
        image: "./assets/chat-profile-achievement-sng-champion-card.webp",
        infoImage: "./assets/chat-profile-achievement-sng-champion-card.webp",
      });
    var winsHtml =
      chatUserModalAchievementCardHtml("♠", "Победитель ставки на себя", [], {
        image: "./assets/tournament-bet-self-hero-v2.jpg",
        tier: {
          value: metrics.selfBetWins || 0,
          tiers: [
            { value: 1, label: "1 победа" },
            { value: 5, label: "5 побед" },
            { value: 10, label: "10 побед" },
            { value: 25, label: "25 побед" },
            { value: 50, label: "50 побед" },
            { value: 100, label: "100 побед" },
          ],
          unit: "побед",
          lockedLabel: "Нет побед",
        },
      }) +
      chatUserModalAchievementCardHtml("★", "Герой дня", dayHeroRows.slice(0, 3), {
        badge: "15к в августе",
        tier: {
          value: dayHeroRows.length,
          tiers: [
            { value: 1, label: "1 раз" },
            { value: 5, label: "5 раз" },
            { value: 15, label: "15 раз" },
            { value: 30, label: "30 раз" },
            { value: 100, label: "100 раз" },
          ],
          unit: "раз",
          lockedLabel: "Нет",
        },
        progressRows: dayHeroRows,
        info: "Игрок с самым крупным единичным турнирным заносом за день среди всего клуба. Считается с 1 января 2026 года.",
      }) +
      chatUserModalAchievementCardHtml("♛", "Король турниров", [], {
        tier: {
          value: tournamentKingWins,
          tiers: [
            { value: 1, label: "1 победа" },
            { value: 15, label: "15 побед" },
            { value: 50, label: "50 побед" },
            { value: 100, label: "100 побед" },
            { value: 250, label: "250 побед" },
          ],
          unit: "побед",
          lockedLabel: "Нет побед",
        },
      }) +
      chatUserModalAchievementCardHtml("₽", "Занос от 100к", chatUserModalBestWinRows(tournamentStats && tournamentStats.bigWins100, 3), {
        placeholder: "100к+",
        progressRows: chatUserModalBestWinRows(tournamentStats && tournamentStats.bigWins100, 1000),
      }) +
      chatUserModalAchievementCardHtml("₽", "Занос от 50 до 100к", chatUserModalBestWinRows(tournamentStats && tournamentStats.bigWins50, 3), {
        placeholder: "50к-99к",
        progressRows: chatUserModalBestWinRows(tournamentStats && tournamentStats.bigWins50, 1000),
      }) +
      chatUserModalAchievementCardHtml("🏆", "Победа в оффлайн турнире", offlineWins, {
        placeholder: "Нет оффлайн побед",
        progressRows: offlineWins,
      }) +
      chatUserModalAchievementCardHtml("₽", "Миллионер клуба", [], {
        tier: {
          value: tournamentStats && tournamentStats.totalReward || 0,
          tiers: [
            { value: 1000000, label: "1 миллион" },
            { value: 2000000, label: "2 миллиона" },
            { value: 3000000, label: "3 миллиона" },
            { value: 4000000, label: "4 миллиона" },
            { value: 5000000, label: "5 миллионов" },
          ],
          unit: "₽",
          format: function (value) { return chatUserModalRubShort(value); },
          lockedLabel: "До 1м ₽",
        },
      }) +
      chatUserModalAchievementCardHtml("★", "Чемпион месяца", monthChampionRows, {
        placeholder: "Нет месяца",
      }) +
      chatUserModalAchievementCardHtml("★", "Вице-чемпион месяца", viceMonthChampionRows, {
        placeholder: "Нет месяца",
      }) +
      chatUserModalAchievementCardHtml("₽", "Топ занос клуба 2026", topWins) +
      chatUserModalAchievementCardHtml("10", "Топ10", top10);
    var goldTicketHtml = chatUserModalAchievementCardHtml("🎟", "Золотой билет", [], {
      tier: {
        value: metrics.raffleWins || 0,
        tiers: [
          { value: 1, label: "1 победа" },
          { value: 15, label: "15 побед" },
          { value: 50, label: "50 побед" },
          { value: 100, label: "100 побед" },
          { value: 300, label: "300 побед" },
        ],
        unit: "побед",
        lockedLabel: "Нет побед",
      },
    });
    var heroHtml = chatUserModalAchievementCardHtml("◆", "Народный герой", clubChoice, {
      placeholder: "Топ-1 месяца",
    });
    var manualHtml = manualAchievements.map(function (item) {
      return chatUserModalAchievementCardHtml("★", item.title, item.rows, {
        info: item.info,
        image: item.image,
      });
    }).join("");
    var socialHtml =
      chatUserModalAchievementCardHtml("★", "Легенда", legends) +
      manualHtml +
      heroHtml +
      chatUserModalAchievementCardHtml("✎", "Оставил отзыв", metrics.guestbookReview ? [{ label: "Отзыв опубликован" }] : [], {
        placeholder: "Оставьте отзыв о клубе",
        info: "Опубликуйте отзыв о клубе в книге отзывов и жалоб. Достижение выдается один раз и не имеет уровней.",
        hideProgress: true,
      }) +
      chatUserModalAchievementCardHtml("★", "Уважаемый человек", [], {
        tier: {
          value: metrics.respect != null ? metrics.respect : 0,
          tiers: [
            { value: 1, label: "1 уважение" },
            { value: 10, label: "10 уважения" },
            { value: 25, label: "25 уважения" },
            { value: 50, label: "50 уважения" },
            { value: 100, label: "100 уважения" },
          ],
          unit: "уважения",
          lockedLabel: "До 10 уважения",
        },
      }) +
      chatUserModalAchievementCardHtml("☘", "Командный игрок", [], {
        tier: {
          value: metrics.friends != null ? metrics.friends : 0,
          tiers: [
            { value: 1, label: "1 друг" },
            { value: 5, label: "5 друзей" },
            { value: 10, label: "10 друзей" },
            { value: 25, label: "25 друзей" },
            { value: 50, label: "50 друзей" },
            { value: 100, label: "100 друзей" },
          ],
          unit: "друзей",
          lockedLabel: metrics.friends == null ? "Только в своем профиле" : "До 1 друга",
        },
      }) +
      chatUserModalAchievementCardHtml("↗", "Амбассадор", [], {
        tier: {
          value: metrics.referrals != null ? metrics.referrals : 0,
          tiers: [
            { value: 1, label: "1 приглашенный" },
            { value: 5, label: "5 приглашенных" },
            { value: 10, label: "10 приглашенных" },
            { value: 25, label: "25 приглашенных" },
            { value: 50, label: "50 приглашенных" },
            { value: 100, label: "100 приглашенных" },
          ],
          unit: "приглашенных",
          lockedLabel: metrics.referrals == null ? "Только в своем профиле" : "Нет приглашенных",
        },
      }) +
      chatUserModalAchievementCardHtml("🎟", "Счастливчик месяца", luckyMonth, {
        placeholder: "Топ-3 по количеству побед в розыгрышах за месяц",
      }) +
      goldTicketHtml;
    return chatUserModalSngChampionBannerHtml(ratingNick) + [
      chatUserModalAchievementGroupHtml("Кубки", cupsHtml),
      chatUserModalAchievementGroupHtml("Заносы", winsHtml),
      chatUserModalAchievementGroupHtml("Социальные", socialHtml),
    ].join("");
  }
  function renderChatUserModalAchievements(results, ratingNick, metrics) {
    if (!modalAchievements || !modalAchievementsList) return;
    var html = chatUserModalAchievementsHtml(results, ratingNick, metrics);
    modalAchievementsList.innerHTML = html;
    modalAchievements.hidden = !html;
  }
  function chatUserAchievementInfoLines(text) {
    return String(text || "").split(/\n+/).map(function (line) {
      return String(line || "").trim();
    }).filter(Boolean);
  }
  function ensureChatUserAchievementInfoModal() {
    var modal = document.getElementById("chatAchievementInfoModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "chat-achievement-info-modal";
    modal.id = "chatAchievementInfoModal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="chat-achievement-info-modal__backdrop" data-chat-achievement-info-close="1"></div>' +
      '<section class="chat-achievement-info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="chatAchievementInfoTitle">' +
        '<button type="button" class="chat-achievement-info-modal__close" data-chat-achievement-info-close="1" aria-label="Закрыть">×</button>' +
        '<p class="chat-achievement-info-modal__eyebrow">Достижение</p>' +
        '<h3 class="chat-achievement-info-modal__title" id="chatAchievementInfoTitle"></h3>' +
        '<span class="chat-achievement-info-modal__state" id="chatAchievementInfoState"></span>' +
        '<div class="chat-achievement-info-modal__body">' +
          '<section class="chat-achievement-info-modal__section">' +
            '<h4>Как получить</h4>' +
            '<p id="chatAchievementInfoRule"></p>' +
          '</section>' +
          '<section class="chat-achievement-info-modal__section" id="chatAchievementInfoProgressSection">' +
            '<h4>Прогресс</h4>' +
            '<ul id="chatAchievementInfoProgress"></ul>' +
          '</section>' +
          '<section class="chat-achievement-info-modal__section" id="chatAchievementInfoLevelsSection">' +
            '<h4>Уровни</h4>' +
            '<ul id="chatAchievementInfoLevels"></ul>' +
          '</section>' +
        '</div>' +
        '<button type="button" class="chat-achievement-info-modal__action" id="chatAchievementInfoAction" hidden></button>' +
      '</section>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (event) {
      var closeBtn = event.target && event.target.closest ? event.target.closest("[data-chat-achievement-info-close]") : null;
      if (closeBtn) closeChatUserAchievementInfoModal();
      var actionBtn = event.target && event.target.closest ? event.target.closest("[data-chat-achievement-info-action]") : null;
      if (actionBtn) runChatUserAchievementInfoAction(actionBtn.getAttribute("data-chat-achievement-info-action") || "");
    });
    return modal;
  }
  function closeChatUserAchievementInfoModal() {
    var modal = document.getElementById("chatAchievementInfoModal");
    if (!modal) return;
    modal.classList.remove("chat-achievement-info-modal--open");
    modal.setAttribute("aria-hidden", "true");
  }
  function renderChatUserAchievementInfoList(id, lines) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = chatUserAchievementInfoLines(lines).map(function (line) {
      return "<li>" + escapeHtml(line) + "</li>";
    }).join("");
  }
  function runChatUserAchievementInfoAction(action) {
    closeChatUserAchievementInfoModal();
    if (action === "summer-rating") openChatUserModalSummerRatingFromAchievement();
  }
  function openChatUserAchievementInfoModal(card) {
    if (!card) return;
    var modal = ensureChatUserAchievementInfoModal();
    var title = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-title"));
    var state = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-state"));
    var rule = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-rule"));
    var progress = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-progress"));
    var levels = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-levels"));
    var action = card.getAttribute("data-chat-achievement-action") || "";
    var actionLabel = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-action-label")) || "Открыть раздел";
    var titleEl = document.getElementById("chatAchievementInfoTitle");
    var stateEl = document.getElementById("chatAchievementInfoState");
    var ruleEl = document.getElementById("chatAchievementInfoRule");
    var progressSection = document.getElementById("chatAchievementInfoProgressSection");
    var levelsSection = document.getElementById("chatAchievementInfoLevelsSection");
    var actionBtn = document.getElementById("chatAchievementInfoAction");
    if (titleEl) titleEl.textContent = title || "Достижение";
    if (stateEl) {
      stateEl.textContent = state || "Пока не открыто";
      stateEl.classList.toggle("chat-achievement-info-modal__state--locked", state !== "Открыто");
    }
    if (ruleEl) ruleEl.textContent = rule || "Описание достижения пока не заполнено.";
    renderChatUserAchievementInfoList("chatAchievementInfoProgress", progress);
    renderChatUserAchievementInfoList("chatAchievementInfoLevels", levels);
    if (progressSection) progressSection.hidden = !chatUserAchievementInfoLines(progress).length;
    if (levelsSection) levelsSection.hidden = !chatUserAchievementInfoLines(levels).length;
    if (actionBtn) {
      actionBtn.hidden = !action;
      actionBtn.textContent = actionLabel;
      if (action) actionBtn.setAttribute("data-chat-achievement-info-action", action);
      else actionBtn.removeAttribute("data-chat-achievement-info-action");
    }
    modal.classList.add("chat-achievement-info-modal--open");
    modal.setAttribute("aria-hidden", "false");
    var closeBtn = modal.querySelector(".chat-achievement-info-modal__close");
    if (closeBtn && typeof closeBtn.focus === "function") closeBtn.focus();
  }
  window.pokerOpenChatAchievementInfoModal = openChatUserAchievementInfoModal;
  function chatUserModalRatingRanksHtml(results, ratingNick) {
    var hasNick = !!String(ratingNick || "").trim();
    var summerHtml = hasNick ? chatUserModalRatingPlacesHtml(results && results[0]) : "—";
    var springHtml = hasNick ? chatUserModalRatingPlacesHtml(results && results[1]) : "—";
    var winterHtml = hasNick ? chatUserModalRatingPlacesHtml(results && results[2]) : "—";
    return (
      '<div class="chat-user-modal__rating-rank-row">' +
        '<span class="chat-user-modal__rating-rank-label">Лето</span>' +
        '<span class="chat-user-modal__rating-rank-value">' + summerHtml + "</span>" +
      "</div>" +
      '<div class="chat-user-modal__rating-rank-row">' +
        '<span class="chat-user-modal__rating-rank-label">Весна</span>' +
        '<span class="chat-user-modal__rating-rank-value">' + springHtml + "</span>" +
      "</div>" +
      '<div class="chat-user-modal__rating-rank-row">' +
        '<span class="chat-user-modal__rating-rank-label">Зима</span>' +
        '<span class="chat-user-modal__rating-rank-value">' + winterHtml + "</span>" +
      "</div>"
    );
  }
  function chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, season) {
    if ((season === "summer" || season === "spring") && typeof window.pokerEnsureScriptDomains === "function") {
      return Promise.resolve(window.pokerEnsureScriptDomains(["rating-" + season]))
        .then(function () { return getPlaces(ratingNick, season); })
        .catch(function () { return getPlaces(ratingNick, season); });
    }
    return getPlaces(ratingNick, season);
  }
  window.pokerBuildProfileAchievements = function (options) {
    options = options && typeof options === "object" ? options : {};
    var ratingNick = String(options.ratingNick || "").trim();
    var profileData = options.profileData || null;
    var userId = options.userId || "";
    var getPlaces = typeof window.pokerGetTournamentRatingPlacesReady === "function"
      ? window.pokerGetTournamentRatingPlacesReady
      : null;
    var placesReady = getPlaces && ratingNick
      ? Promise.all([
          chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "summer"),
          chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "spring"),
          chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "winter"),
        ])
      : Promise.resolve([null, null, null]);
    return Promise.all([
      placesReady,
      ratingNick ? getChatUserModalSingleTopWinsReady() : Promise.resolve([]),
      getChatUserModalRaffleLuckReady(ratingNick, profileData, userId),
      getChatUserModalClubChoiceReady(ratingNick, profileData, userId),
      getChatUserModalSngAchievementsReady(ratingNick, profileData, userId),
      getChatUserModalAchievementMetricsReady(ratingNick, profileData, userId, options.isSelfProfile === true),
    ]).then(function (parts) {
      var places = parts && parts[0] ? parts[0] : [];
      var results = [
        places[0],
        places[1],
        places[2],
        parts && parts[1],
        parts && parts[2],
        parts && parts[3],
        parts && parts[4],
      ];
      var achievementsHtml = chatUserModalAchievementsHtml(results, ratingNick, parts && parts[5]);
      if (options.isSelfProfile === true) chatUserModalSyncAchievementNotifications(achievementsHtml, places[0]);
      return {
        totalRewardHtml: chatUserModalRatingTotalHtml(ratingNick),
        achievementsHtml: achievementsHtml,
        ranksHtml: chatUserModalRatingRanksHtml(results, ratingNick),
        results: results,
        metrics: parts && parts[5],
      };
    });
  };

  function chatUserModalAchievementNotificationRows(html) {
    if (!html || typeof document === "undefined") return [];
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    return Array.prototype.slice.call(wrap.querySelectorAll("[data-chat-achievement-title][data-chat-achievement-value]")).map(function (card) {
      var title = chatUserModalDecodeData(card.getAttribute("data-chat-achievement-title"));
      var value = Math.max(0, parseInt(card.getAttribute("data-chat-achievement-value"), 10) || 0);
      return {
        key: String(title || "").trim().toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 80),
        title: String(title || "").trim().slice(0, 80),
        value: value,
      };
    }).filter(function (row) { return !!row.key && !!row.title; });
  }

  function chatUserModalShowAchievementNotification(row) {
    if (!row || !row.title || typeof document === "undefined") return;
    var previous = document.querySelector(".achievement-earned-toast");
    if (previous) previous.remove();
    var toast = document.createElement("aside");
    toast.className = "achievement-earned-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "assertive");
    toast.innerHTML =
      '<span class="achievement-earned-toast__icon" aria-hidden="true">🏆</span>' +
      '<span class="achievement-earned-toast__copy"><strong>Новая ачивка: ' + escapeHtml(row.title) + '</strong>' +
      '<small>' + escapeHtml(row.message || "Достижение добавлено в ваш профиль") + '</small></span>' +
      '<button type="button" class="achievement-earned-toast__action">Посмотреть</button>' +
      '<button type="button" class="achievement-earned-toast__close" aria-label="Закрыть">×</button>';
    document.body.appendChild(toast);
    var action = toast.querySelector(".achievement-earned-toast__action");
    if (action) action.addEventListener("click", function () {
      toast.remove();
      var profileNav = document.querySelector('[data-view-target="profile"]');
      if (profileNav) profileNav.click();
      else if (typeof setView === "function") setView("profile");
      var attempts = 0;
      var openAchievements = function () {
        if (typeof setProfileTab === "function") {
          setProfileTab("achievements");
          return;
        }
        var tab = document.querySelector('[data-profile-tab="achievements"]');
        if (tab) {
          tab.click();
          return;
        }
        attempts += 1;
        if (attempts < 20) setTimeout(openAchievements, 100);
      };
      openAchievements();
    });
    var close = toast.querySelector(".achievement-earned-toast__close");
    if (close) close.addEventListener("click", function () { toast.remove(); });
    requestAnimationFrame(function () { toast.classList.add("achievement-earned-toast--visible"); });
    setTimeout(function () {
      if (!toast.isConnected) return;
      toast.classList.remove("achievement-earned-toast--visible");
      setTimeout(function () { toast.remove(); }, 240);
    }, 10000);
  }

  function chatUserModalSyncAchievementNotifications(html, ratingPlaces) {
    var rows = chatUserModalAchievementNotificationRows(html);
    if (!rows.length || typeof fetch !== "function") return;
    var currentRatingPlaces = (Array.isArray(ratingPlaces) ? ratingPlaces : []).map(function (row) {
      return {
        league: Math.max(0, parseInt(row && row.league, 10) || 0),
        place: Math.max(0, parseInt(row && row.place, 10) || 0),
      };
    }).filter(function (row) { return (row.league === 1 || row.league === 2) && row.place > 0; });
    var base = (typeof API_BASE !== "undefined" ? API_BASE : "") || "";
    var body = typeof pokerApiAuthJsonBody === "function"
      ? pokerApiAuthJsonBody({ achievements: rows, ratingPlaces: currentRatingPlaces })
      : { achievements: rows, ratingPlaces: currentRatingPlaces };
    fetch(base.replace(/\/$/, "") + "/api/achievement-notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    }).then(function (response) {
      if (!response.ok) throw new Error("achievement-notifications-" + response.status);
      return response.json();
    }).then(function (data) {
      var fresh = data && Array.isArray(data.newAchievements) ? data.newAchievements : [];
      fresh.forEach(function (row, index) {
        setTimeout(function () { chatUserModalShowAchievementNotification(row); }, index * 10500);
      });
    }).catch(function () {});
  }
  function syncChatUserModalRatingRanks(nick) {
    chatUserModalRanksSeq += 1;
    var seq = chatUserModalRanksSeq;
    var ratingNick = String(nick || "").trim();
    var hasNick = !!ratingNick;
    if (modalRatingRanks) modalRatingRanks.hidden = chatUserModalHideCompetitiveStats || !hasNick;
    if (modalSummerRank) modalSummerRank.textContent = hasNick ? "Загрузка..." : "—";
    if (modalSpringRank) modalSpringRank.textContent = hasNick ? "Загрузка..." : "—";
    if (modalWinterRank) modalWinterRank.textContent = hasNick ? "Загрузка..." : "—";
    renderChatUserModalAchievementsLoading();
    if (!hasNick) {
      return Promise.all([
        getChatUserModalRaffleLuckReady("", chatUserModalAchievementIdentity),
        getChatUserModalClubChoiceReady("", chatUserModalAchievementIdentity),
        getChatUserModalSngAchievementsReady("", chatUserModalAchievementIdentity),
        getChatUserModalAchievementMetricsReady("", chatUserModalAchievementIdentity, chatUserModalUserId, chatUserModalEl.classList.contains("chat-user-modal--self")),
      ]).then(function (extraRows) {
        if (seq !== chatUserModalRanksSeq) return;
        var results = [null, null, null, null, extraRows && extraRows[0], extraRows && extraRows[1], extraRows && extraRows[2]];
        renderChatUserModalAchievements(results, "", extraRows && extraRows[3]);
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
        getChatUserModalSngAchievementsReady(ratingNick, chatUserModalAchievementIdentity),
        getChatUserModalAchievementMetricsReady(ratingNick, chatUserModalAchievementIdentity, chatUserModalUserId, chatUserModalEl.classList.contains("chat-user-modal--self")),
      ]).then(function (extraRows) {
        if (seq !== chatUserModalRanksSeq) return;
        var results = [null, null, null, null, extraRows && extraRows[0], extraRows && extraRows[1], extraRows && extraRows[2]];
        renderChatUserModalAchievements(results, ratingNick, extraRows && extraRows[3]);
        return results;
      }).catch(function () {
        if (seq === chatUserModalRanksSeq) renderChatUserModalAchievements(null);
        return [];
      });
    }
    return Promise.all([
      chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "summer"),
      chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "spring"),
      chatUserModalGetSeasonPlacesReady(getPlaces, ratingNick, "winter"),
      getChatUserModalSingleTopWinsReady(),
      getChatUserModalRaffleLuckReady(ratingNick, chatUserModalAchievementIdentity),
      getChatUserModalClubChoiceReady(ratingNick, chatUserModalAchievementIdentity),
      getChatUserModalSngAchievementsReady(ratingNick, chatUserModalAchievementIdentity),
      getChatUserModalAchievementMetricsReady(ratingNick, chatUserModalAchievementIdentity, chatUserModalUserId, chatUserModalEl.classList.contains("chat-user-modal--self")),
    ]).then(function (results) {
      if (seq !== chatUserModalRanksSeq) return;
      setChatUserModalRatingRankValue(modalSummerRank, results && results[0]);
      setChatUserModalRatingRankValue(modalSpringRank, results && results[1]);
      setChatUserModalRatingRankValue(modalWinterRank, results && results[2]);
      syncChatUserModalRatingTotalReward(ratingNick);
      renderChatUserModalAchievements(results, ratingNick, results && results[7]);
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
    var telegramHidden = !!(data && data.telegramVisible === false && data.isAdmin !== true);
    function hidePrivateTelegramLabel(value) {
      var text = String(value || "").trim();
      if (telegramHidden && /^@[A-Za-z0-9_]{5,32}$/.test(text)) return "";
      return text;
    }
    chatUserModalPeerLogin = telegramHidden
      ? "TG скрыт"
      : (data && data.userName ? String(data.userName) : "");
    var contactNm =
      data && data.contactName != null && String(data.contactName).trim()
        ? String(data.contactName).trim()
        : "";
    chatUserModalContactName = contactNm;
    var peerChatDisp =
      data && data.chatDisplayName != null && String(data.chatDisplayName).trim()
        ? String(data.chatDisplayName).trim()
        : "";
    var ratingNick = hidePrivateTelegramLabel(chatUserModalRatingNickFromData(data));
    var safeFallbackName = hidePrivateTelegramLabel(fallbackName);
    var titleDisp = contactNm || ratingNick || peerChatDisp || (chatUserModalPeerLogin !== "TG скрыт" ? chatUserModalPeerLogin : "") || safeFallbackName || "Игрок";
    if (modalTitle) modalTitle.textContent = titleDisp;
    chatUserModalUserName = titleDisp;
    if (modalAvatar) modalAvatar.alt = titleDisp;
    if (modalAvatarPlaceholder && (!modalAvatar || modalAvatar.style.display === "none")) {
      modalAvatarPlaceholder.textContent = (titleDisp || "И")[0];
    }
    if (modalLoginSub) {
      if (chatUserModalPeerLogin === "TG скрыт") {
        modalLoginSub.textContent = "TG скрыт";
        modalLoginSub.hidden = false;
      } else if (contactNm && chatUserModalPeerLogin) {
        modalLoginSub.textContent = chatUserModalPeerLogin;
        modalLoginSub.hidden = false;
      } else if (ratingNick && chatUserModalPeerLogin) {
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
      modalAddFriend.textContent = pending ? "Отменить" : "Добавить";
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
    function setRespectButton(button, text, label, action, disabled) {
      button.disabled = !!disabled;
      button.textContent = text;
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("data-rv-action", action);
    }
    function respectHintText(prefix) {
      return prefix;
    }
    if (!v) {
      setRespectButton(modalRespectUp, "+", "Поднять уважение", "up", false);
      setRespectButton(modalRespectDown, "\u2212", "Уменьшить уважение", "down", false);
      if (modalRespectHint) {
        modalRespectHint.textContent = "";
        modalRespectHint.hidden = true;
      }
      return;
    }
    if (v === "up") {
      setRespectButton(modalRespectUp, "+", "Поднять уважение", "up", true);
      setRespectButton(modalRespectDown, "\u2212", "Отменить уважение", "withdraw", false);
      if (modalRespectHint) {
        modalRespectHint.textContent = respectHintText("Вы подняли уважение");
        modalRespectHint.hidden = false;
      }
      return;
    }
    if (v === "down") {
      setRespectButton(modalRespectDown, "\u2212", "Уменьшить уважение", "down", true);
      setRespectButton(modalRespectUp, "+", "Вернуть уважение", "withdraw", false);
      if (modalRespectHint) {
        modalRespectHint.textContent = respectHintText("Вы уменьшили уважение");
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
  function chatUserModalSpecialtyValue(data) {
    var raw = String(data && (data.profileSpecialty || data.specialty || data.pokerSpecialty) || "").trim().toLowerCase();
    if (raw === "mtt" || raw === "мтт") return "mtt";
    if (raw === "cash" || raw === "кеш" || raw === "кэш") return "cash";
    return "";
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
    var specialty = chatUserModalSpecialtyValue(data);
    var blocks = {};
    if (visibility.cash) {
      blocks.cash =
        chatUserModalStatHtml("Рейк", st.fee, "") +
        chatUserModalStatHtml("Раздачи", st.hands, "") +
        chatUserModalOptionalStatHtml("BB", st.bb, "") +
        chatUserModalNonNegativeStatHtml("Кеш", st.winnings, "") +
        chatUserModalOptionalNonNegativeStatHtml("OFC", st.ofcWinnings, "");
    }
    if (visibility.mtt) {
      blocks.mtt =
        chatUserModalNonNegativeStatHtml("MTT", st.mttWinnings, "") +
        chatUserModalOptionalStatHtml("MTT р.", st.mttRound, "") +
        chatUserModalOptionalStatHtml("MTT игр", st.mttCount, "") +
        chatUserModalOptionalStatHtml("MTT ITM", st.mttItmCount, "") +
        chatUserModalOptionalStatHtml("MTT 1-е", st.mttFirstCount, "");
    }
    if (visibility.sng) {
      blocks.sng =
        chatUserModalNonNegativeStatHtml("SNG", st.sngWinnings, "") +
        chatUserModalOptionalStatHtml("SNG р.", st.sngRound, "") +
        chatUserModalOptionalStatHtml("SNG игр", st.sngCount, "") +
        chatUserModalOptionalStatHtml("SNG ITM", st.sngItmCount, "") +
        chatUserModalOptionalStatHtml("SNG 1-е", st.sngFirstCount, "");
    }
    var order = specialty === "mtt" ? ["mtt", "cash", "sng"] : specialty === "cash" ? ["cash", "mtt", "sng"] : ["cash", "mtt", "sng"];
    var html = order.map(function (key) { return blocks[key] || ""; }).join("");
    modalPlayerStats.innerHTML =
      html || '<p class="chat-user-modal__player-stats-private">Статистика данного игрока является приватной и доступна только секретным службам</p>';
  }
  function applyChatUserModalStatusLevel(level) {
    var rawLevel = level != null ? String(level).trim() : "";
    if (!rawLevel) return false;
    var modalLevel = Math.min(100, Math.max(0, parseInt(rawLevel, 10) || 0));
    if (modalLevelText) {
      if (modalLevel > 0) {
        modalLevelText.classList.remove("chat-user-modal__level-text--unlinked");
        modalLevelText.innerHTML = '<span class="chat-user-modal__level-num">' +
          escapeHtml(rawLevel) +
          '</span><span class="chat-user-modal__level-rest">/ 100</span>';
      } else {
        modalLevelText.classList.add("chat-user-modal__level-text--unlinked");
        modalLevelText.textContent = "Привяжите аккаунт";
      }
      modalLevelText.hidden = false;
    }
    if (modalStatusCards[0]) modalStatusCards[0].textContent = modalLevel > 0 ? pokerProfileStatusCardLabel(modalLevel) : "Привяжите";
    if (modalStatusCards[1]) modalStatusCards[1].textContent = modalLevel > 0 ? pokerProfileStatusCardLabel(Math.min(100, modalLevel + 1)) : "аккаунт";
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
    var userName = String(name || "").trim();
    if (/^@[A-Za-z0-9_]{5,32}$/.test(userName)) userName = "Игрок";
    if (!userName) userName = "Игрок";
    if (!id || !chatUserModalEl) {
      if (id) openConversation(id, userName, avatarUrl);
      return;
    }
    var openOptions = options && typeof options === "object" ? options : {};
    var deferReveal = openOptions.deferReveal === true;
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
    syncChatUserModalCompetitivePrivacy(fallbackRatingNick || userName, null, id);
    syncChatUserModalSuperpower(null, userName, fallbackRatingNick);
    setChatUserModalAchievementsLoader(null);
    setChatUserModalProfileTab("main");
    syncChatUserModalGender("male");
    syncChatUserModalBirthBadge("");
    var cachedBlockedByMe = false;
    try {
      cachedBlockedByMe = !!(window.__pokerChatDmBlockStateByPeer && window.__pokerChatDmBlockStateByPeer[String(id)] === true);
    } catch (eCachedBlockState) {}
    chatUserModalBlockedByMe = cachedBlockedByMe;
    chatUserModalEl.classList.toggle("chat-user-modal--self", openingSelfProfile);
    if (modalWriteBtn) modalWriteBtn.style.display = openingSelfProfile ? "none" : "";
    if (modalRespectControl) modalRespectControl.classList.toggle("chat-user-modal__respect-control--self", openingSelfProfile);
    if (modalRespectActions) modalRespectActions.style.display = openingSelfProfile ? "none" : "";
    setChatUserModalBlockState(cachedBlockedByMe, true);
    syncChatUserModalRatingTab("");
    resetChatUserModalNews();
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
      applyChatUserModalBaseAvatar(avatarUrl, id, userName);
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
    updateChatUserModalSpecialtyBadge("");
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
    if (modalBirthAdmin) {
      modalBirthAdmin.hidden = true;
      modalBirthAdmin._profileData = null;
      modalBirthAdmin.removeAttribute("data-target-user-id");
      modalBirthAdmin.removeAttribute("data-open-user-id");
    }
    if (!openingSelfProfile && !deferReveal) {
      chatUserModalEl.classList.add("chat-user-modal--profile-loading");
      chatUserModalEl.setAttribute("aria-busy", "true");
    } else {
      chatUserModalEl.classList.remove("chat-user-modal--profile-loading");
      chatUserModalEl.removeAttribute("aria-busy");
    }
    // News keeps its compact loading screen visible until the profile data and
    // main artwork are ready. Other entry points retain the immediate shell.
    var deferredRevealTimer = 0;
    var deferredRevealDone = false;
    function revealDeferredProfile() {
      if (!deferReveal || deferredRevealDone) return;
      deferredRevealDone = true;
      revealChatUserModal(openSeq);
    }
    if (!deferReveal) {
      revealChatUserModal(openSeq);
    } else {
      deferredRevealTimer = window.setTimeout(function () {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        chatUserModalEl.classList.remove("chat-user-modal--profile-loading");
        chatUserModalEl.removeAttribute("aria-busy");
        revealDeferredProfile();
      }, 3500);
    }
    var initialBlockPromise = openingSelfProfile ? Promise.resolve(false) : refreshChatUserModalBlockState(id);
    var profileUrl = openingSelfProfile
      ? base + "/api/users" + pokerApiAuthQuery("?")
      : base + "/api/users?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
    var cachedProfileData = chatUserModalReadProfileCache(id);
    var profileDataPromise = cachedProfileData
      ? Promise.resolve(cachedProfileData)
      : fetch(profileUrl)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          chatUserModalWriteProfileCache(id, data);
          return data;
        });
    if (cachedProfileData) {
      fetch(profileUrl)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          chatUserModalWriteProfileCache(id, data);
          if (openSeq === chatUserModalOpenSeq && String(chatUserModalUserId) === String(id)) {
            updateChatUserModalSpecialtyBadge(data && (data.profileSpecialty || data.specialty || data.pokerSpecialty));
            syncChatUserModalBirthBadge(data && (data.profileBirthDate || data.birthDate));
            var birthAdminVisible = chatUserModalRenderBirthAdmin(data, id, openingSelfProfile);
            chatUserModalApplyPersonalInfo(data, birthAdminVisible);
            if (data && data.ok) {
              var freshRatingNick = chatUserModalRatingNickFromData(data) || fallbackRatingNick;
              syncChatUserModalCompetitivePrivacy(freshRatingNick || userName, data, id);
              syncChatUserModalSuperpower(data, userName, freshRatingNick);
              syncChatUserModalTitleFromProfileData(data, userName);
              syncChatUserModalRatingTab(freshRatingNick);
              loadChatUserModalNews({
                userId: id,
                accountId: data && (data.accountId || data.dtId || data.userId),
                chatUserId: data && data.chatUserId,
                ratingNick: freshRatingNick,
                displayName: userName,
                p21Id: data && (data.p21Id || data.poker21Id || data.pokerPlusUserId),
                profileBirthDate: data && (data.profileBirthDate || data.birthDate),
                avatarUrl: avatarUrl,
              });
              syncChatUserModalRatingArt(freshRatingNick);
              setChatUserModalAchievementsLoader(function () {
                return syncChatUserModalRatingRanks(freshRatingNick) || Promise.resolve([]);
              });
            }
          }
        })
        .catch(function () {});
    }
    var profilePromise = profileDataPromise
      .then(function (data) {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        if (modalP21) modalP21.textContent = "";
        updateChatUserModalSpecialtyBadge(data && (data.profileSpecialty || data.specialty || data.pokerSpecialty));
        var birthAdminVisible = chatUserModalRenderBirthAdmin(data, id, openingSelfProfile);
        chatUserModalApplyPersonalInfo(data, birthAdminVisible);
        var modalStatusLevel = data && data.level != null ? data.level : (fallbackStatusLevel || null);
        if (data && data.ok) syncChatUserModalGender(data.profileGender || data.gender || data.sex || "male");
        syncChatUserModalBirthBadge(data && (data.profileBirthDate || data.birthDate));
        if (!applyChatUserModalStatusLevel(modalStatusLevel) && modalLevelText) {
          modalLevelText.textContent = openingSelfProfile
            ? "Обновите свой уровень во вкладке Профиль Poker21"
            : "Уровень Poker21 не обновлен";
          modalLevelText.hidden = false;
        }
        syncChatUserModalStatusXp(data && data.statusPoints != null ? data.statusPoints : null);
        if (modalStatusScale && data && data.statusValue != null) modalStatusScale.style.setProperty("--status-value", String(data.statusValue));
        var ratingNick = data && data.ok ? chatUserModalRatingNickFromData(data) : "";
        ratingNick = ratingNick || fallbackRatingNick;
        syncChatUserModalCompetitivePrivacy(ratingNick || userName, data, id);
        if (!chatUserModalHideCompetitiveStats) renderChatUserModalPlayerStats(data);
        syncChatUserModalSuperpower(data, userName, ratingNick);
        chatUserModalAchievementIdentity = data && data.ok ? data : null;
        syncChatUserModalRatingTab(ratingNick);
        loadChatUserModalNews({
          userId: id,
          accountId: data && (data.accountId || data.dtId || data.userId),
          chatUserId: data && data.chatUserId,
          ratingNick: ratingNick,
          displayName: userName,
          p21Id: data && (data.p21Id || data.poker21Id || data.pokerPlusUserId),
          profileBirthDate: data && (data.profileBirthDate || data.birthDate),
          avatarUrl: avatarUrl,
        });
        setChatUserModalAchievementsLoader(function () {
          return syncChatUserModalRatingRanks(ratingNick) || Promise.resolve([]);
        });
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
        return waitChatUserModalAsset(ratingArtPromise, 1800).then(function () { return null; });
      })
      .catch(function () {
        if (openSeq !== chatUserModalOpenSeq || String(chatUserModalUserId) !== String(id)) return;
        syncChatUserModalGender("male");
        syncChatUserModalBirthBadge("");
        if (modalPersonal) modalPersonal.textContent = "—";
        if (modalPlayerStats) renderChatUserModalPlayerStats(null);
        if (modalLastSeen) modalLastSeen.hidden = true;
        applyChatUserModalStatusLevel(fallbackStatusLevel);
        syncChatUserModalRatingTab(fallbackRatingNick);
        loadChatUserModalNews({ userId: id, ratingNick: fallbackRatingNick, displayName: userName });
        syncChatUserModalSuperpower(null, userName, fallbackRatingNick);
        setChatUserModalAchievementsLoader(function () {
          return syncChatUserModalRatingRanks(fallbackRatingNick) || Promise.resolve([]);
        });
        var fallbackArtPromise = syncChatUserModalRatingArt(fallbackRatingNick);
        return waitChatUserModalAsset(fallbackArtPromise, 1800).then(function () { return null; });
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
    Promise.resolve(initialBlockPromise).catch(function () {});
    profilePromise.then(function () {
      window.clearTimeout(deferredRevealTimer);
      if (openSeq === chatUserModalOpenSeq && String(chatUserModalUserId) === String(id)) {
        chatUserModalEl.classList.remove("chat-user-modal--profile-loading");
        chatUserModalEl.removeAttribute("aria-busy");
      }
      revealDeferredProfile();
    }, function () {
      window.clearTimeout(deferredRevealTimer);
      if (openSeq === chatUserModalOpenSeq && String(chatUserModalUserId) === String(id)) {
        chatUserModalEl.classList.remove("chat-user-modal--profile-loading");
        chatUserModalEl.removeAttribute("aria-busy");
      }
      revealDeferredProfile();
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
  if (modalCopyProfileBtn) {
    modalCopyProfileBtn.addEventListener("click", function () {
      var profileId = String(chatUserModalUserId || "").trim();
      if (!profileId) return;
      var startParam = "player_profile_" + profileId.replace(/[^A-Za-z0-9_-]/g, "_");
      var link = "";
      if (typeof buildMiniAppStartLink === "function") link = buildMiniAppStartLink(startParam);
      if (!link && typeof pokerBuildWebsiteStartLink === "function") link = pokerBuildWebsiteStartLink(startParam);
      if (!link && window.location) {
        var baseUrl = String(window.location.origin || "") + String(window.location.pathname || "/");
        link = baseUrl + (baseUrl.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(startParam);
      }
      function showCopiedMessage(ok) {
        var previous = document.querySelector(".chat-user-modal__copy-toast");
        if (previous) previous.remove();
        var toast = document.createElement("div");
        toast.className = "chat-user-modal__copy-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.textContent = ok ? "Ссылка на профиль скопирована" : "Не удалось скопировать ссылку";
        document.body.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add("chat-user-modal__copy-toast--visible"); });
        setTimeout(function () {
          toast.classList.remove("chat-user-modal__copy-toast--visible");
          setTimeout(function () { toast.remove(); }, 220);
        }, 2200);
      }
      function fallbackCopy() {
        try {
          var input = document.createElement("textarea");
          input.value = link;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          var copied = document.execCommand("copy");
          input.remove();
          showCopiedMessage(copied);
        } catch (eFallbackCopy) {
          showCopiedMessage(false);
        }
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(link).then(function () {
          showCopiedMessage(true);
        }).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }
  if (modalSuperpowerBtn) modalSuperpowerBtn.addEventListener("click", openChatUserSuperpowerModal);
  if (superpowerModal) {
    superpowerModal.addEventListener("click", function (event) {
      if (event.target && event.target.closest("[data-profile-superpower-close]")) closeChatUserSuperpowerModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && superpowerModal.classList.contains("profile-superpower-modal--open")) {
        closeChatUserSuperpowerModal();
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
  if (modalNewsAll) modalNewsAll.addEventListener("click", openChatUserModalNews);
  if (modalNews) {
    modalNews.addEventListener("pointerdown", function (event) {
      var item = event.target.closest("[data-profile-event-id]");
      var comment = event.target.closest("[data-profile-comment-id]");
      if (!item || event.target.closest("button, input, textarea")) return;
      if (!comment && event.target.closest(".chat-user-modal__news-actions, .chat-user-modal__news-comments")) return;
      clearTimeout(chatUserModalNewsLongPressTimer);
      chatUserModalNewsLongPressTriggered = false;
      var eventId = item.getAttribute("data-profile-event-id");
      var commentId = comment && comment.getAttribute("data-profile-comment-id");
      chatUserModalNewsLongPressTimer = window.setTimeout(function () {
        chatUserModalNewsLongPressTriggered = true;
        if (typeof window.pokerOpenProfileReactionPicker !== "function") return;
        window.pokerOpenProfileReactionPicker(function (emoji) {
          sendChatUserModalOptimisticReaction(eventId, emoji, commentId);
        });
      }, 280);
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) {
      modalNews.addEventListener(type, function () { clearTimeout(chatUserModalNewsLongPressTimer); });
    });
    modalNews.addEventListener("click", handleChatUserModalNewsInteraction);
    modalNews.addEventListener("submit", handleChatUserModalNewsSubmit);
  }
  if (modalNewsDialog) {
    modalNewsDialog.addEventListener("click", function (event) {
      if (event.target && event.target.closest("[data-chat-user-news-close]")) closeChatUserModalNews();
      else handleChatUserModalNewsInteraction(event);
    });
    modalNewsDialog.addEventListener("submit", handleChatUserModalNewsSubmit);
  }
  function openChatUserModalSummerRatingFromAchievement() {
    closeChatUserModal();
    if (typeof setView === "function") setView("summer-rating");
  }
  if (modalAchievementsList) {
    modalAchievementsList.addEventListener("click", function (e) {
      var sngChampion = e.target && e.target.closest ? e.target.closest("[data-chat-sng-champion-open]") : null;
      if (sngChampion) {
        e.preventDefault();
        closeChatUserModal();
        if (typeof window.openSngChampionsModal === "function") window.openSngChampionsModal();
        return;
      }
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-info]") : null;
      if (!card) return;
      e.preventDefault();
      openChatUserAchievementInfoModal(card);
    });
    modalAchievementsList.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-info]") : null;
      if (!card) return;
      e.preventDefault();
      openChatUserAchievementInfoModal(card);
    });
  }
  if (!window.__pokerChatAchievementInfoDelegationBound) {
    window.__pokerChatAchievementInfoDelegationBound = true;
    document.addEventListener("click", function (e) {
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-info]") : null;
      if (!card || (modalAchievementsList && modalAchievementsList.contains(card))) return;
      e.preventDefault();
      openChatUserAchievementInfoModal(card);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeChatUserAchievementInfoModal();
        return;
      }
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target && e.target.closest ? e.target.closest("[data-chat-achievement-info]") : null;
      if (!card || (modalAchievementsList && modalAchievementsList.contains(card))) return;
      e.preventDefault();
      openChatUserAchievementInfoModal(card);
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
          if (d && d.error === "already_raised") msg = "Вы подняли уважение";
          else if (d && d.error === "already_lowered") msg = "Вы уменьшили уважение";
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
  function openChatUserRespectVoters() {
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    if (chatUserModalUserId && typeof window.pokerOpenRespectVotersModal === "function") {
      window.pokerOpenRespectVotersModal(chatUserModalUserId, { hideVoteButtons: true });
    }
  }
  if (modalRespectControl || modalRespectOpenVoters) {
    (modalRespectControl || modalRespectOpenVoters).addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest(".chat-user-modal__respect-btn")) return;
      openChatUserRespectVoters();
    });
  }
  if (modalAddFriend) {
    function showChatUserFriendAlert(message) {
      var text = String(message || "Ошибка");
      if (tg && tg.showAlert) tg.showAlert(text);
      else if (typeof alert === "function") alert(text);
    }
    modalAddFriend.addEventListener("click", function () {
      var friendBase = typeof getApiBase === "function" ? getApiBase() : base;
      if (!chatUserModalUserId || !friendBase || !pokerApiHasCredential() || modalAddFriend.disabled) return;
      var isPendingCancel = modalAddFriend.getAttribute("data-chat-user-friend-pending") === "1";
      if (isPendingCancel) {
        modalAddFriend.disabled = true;
        fetch(friendBase + "/api/friends", {
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
            } else {
              showChatUserFriendAlert((d && d.error) || "Ошибка");
            }
          })
          .catch(function () {
            modalAddFriend.disabled = false;
            showChatUserFriendAlert(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети");
          });
        return;
      }
      var contactName = (chatUserModalUserName || chatUserModalPeerLogin || "").trim();
      modalAddFriend.disabled = true;
      fetch(friendBase + "/api/friends", {
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
            showChatUserFriendAlert((d && d.error) || "Ошибка");
          }
        })
        .catch(function () {
          modalAddFriend.disabled = false;
          showChatUserFriendAlert(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети");
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
        rvVoteHintEl.textContent = "Вы подняли уважение игроку";
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
          if (d && d.error === "already_raised") msg = "Вы подняли уважение игроку";
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
