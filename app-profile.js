function profileEscapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setProfileTab(tab) {
  var root = document.getElementById("profileView");
  var tabs = document.querySelectorAll("[data-profile-tab]");
  var activeTab = tab === "poker21" || tab === "achievements" || tab === "friends" ? tab : "club";
  if (root) {
    root.classList.toggle("profile-view--tab-poker21", activeTab === "poker21");
    root.classList.toggle("profile-view--tab-club", activeTab === "club");
    root.classList.toggle("profile-view--tab-achievements", activeTab === "achievements");
    root.classList.toggle("profile-view--tab-friends", activeTab === "friends");
    root.dataset.profileActiveTab = activeTab;
  }
  tabs.forEach(function (btn) {
    var isActive = btn.getAttribute("data-profile-tab") === activeTab;
    btn.classList.toggle("profile-tabs__btn--active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  try {
    if (typeof updateProfileExitBtnVisibility === "function") updateProfileExitBtnVisibility();
  } catch (eProfileTabAuthSync) {}
  if (activeTab === "poker21" && typeof initProfilePokerPlus === "function") {
    try {
      setTimeout(function () {
        initProfilePokerPlus();
      }, 0);
    } catch (eLazyPpProfile) {}
  }
  if (activeTab === "poker21") initProfilePoker21Tabs();
  if (activeTab === "achievements") refreshProfileAchievementsShowcase();
}

function setProfilePoker21Tab(tab) {
  var section = document.getElementById("profilePokerPlusSection");
  var tabs = document.querySelectorAll("[data-profile-poker21-tab]");
  var panels = document.querySelectorAll("[data-profile-poker21-tab-panel]");
  var activeTab = tab === "skills" ? "skills" : "stats";
  if (section && section.dataset) section.dataset.profilePoker21ActiveTab = activeTab;
  tabs.forEach(function (btn) {
    var isActive = btn.getAttribute("data-profile-poker21-tab") === activeTab;
    btn.classList.toggle("profile-pokerplus-view-tabs__btn--active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  panels.forEach(function (panel) {
    var isActive = panel.getAttribute("data-profile-poker21-tab-panel") === activeTab;
    panel.hidden = !isActive;
  });
}

function initProfilePoker21Tabs() {
  var section = document.getElementById("profilePokerPlusSection");
  if (!section) return;
  var tabs = document.querySelectorAll("[data-profile-poker21-tab]");
  if (!tabs.length) return;
  if (section.dataset.profilePoker21TabsBound !== "1") {
    section.dataset.profilePoker21TabsBound = "1";
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setProfilePoker21Tab(btn.getAttribute("data-profile-poker21-tab"));
      });
    });
  }
  setProfilePoker21Tab(section.dataset.profilePoker21ActiveTab || "stats");
}

function initProfileTabs() {
  var root = document.getElementById("profileView");
  if (!root) return;
  var tabs = document.querySelectorAll("[data-profile-tab]");
  if (!tabs.length) return;
  if (root.dataset.profileTabsBound !== "1") {
    root.dataset.profileTabsBound = "1";
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setProfileTab(btn.getAttribute("data-profile-tab"));
      });
    });
  }
  initProfilePoker21Tabs();
  initProfilePublicCardButton();
  initProfilePublicShowcase();
  initProfileAchievementsShowcase();
  setProfileTab("club");
  if (typeof initProfilePokerPlus === "function") {
    setTimeout(function () {
      try {
        initProfilePokerPlus();
      } catch (eProfilePokerPlusPreload) {}
    }, 0);
  }
}

function profilePublicCardMemberIdFromAuth() {
  try {
    if (typeof window.pokerResolveMyChatMemberId === "function") {
      var resolved = window.pokerResolveMyChatMemberId();
      if (resolved != null && String(resolved).trim()) return String(resolved).trim();
    }
  } catch (eResolvedSelfCard) {}
  try {
    var auth = window.__pokerTelegramAuth;
    var user = auth && auth.user ? auth.user : null;
    if (!user || !(auth.status === "verified" || auth.status === "dev_skip")) return "";
    if (user.memberId != null && String(user.memberId).trim()) return String(user.memberId).trim();
    if (user.id == null || String(user.id).trim() === "") return "";
    var raw = String(user.id).trim();
    if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0 || raw.indexOf("ID") === 0) return raw;
    if (user.is_vk || user.vk) return "vk_" + raw;
    return "tg_" + raw;
  } catch (eAuthSelfCard) {}
  return "";
}

function profilePublicCardFallbackDtId() {
  try {
    var el = document.getElementById("profileUserId");
    var text = el ? String(el.textContent || "").trim() : "";
    if (/^ID\d{6}$/.test(text)) return text;
  } catch (eElDtId) {}
  try {
    var cached =
      (typeof sessionStorage !== "undefined" && sessionStorage.getItem("poker_dt_id")) ||
      (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
      "";
    cached = String(cached || "").trim();
    if (/^ID\d{6}$/.test(cached)) return cached;
  } catch (eCachedDtId) {}
  return "";
}

function profilePublicCardDisplayName() {
  try {
    var textEl = document.getElementById("profileUserNameText");
    var text = textEl ? String(textEl.textContent || "").trim() : "";
    if (text && text !== "Добавьте имя") return text;
  } catch (eTextSelfCard) {}
  try {
    var name = typeof getProfileGreetingName === "function" ? getProfileGreetingName() : "";
    if (name && name !== "NoName") return name;
  } catch (eNameSelfCard) {}
  try {
    if (typeof resolveMyChatDisplayName === "function") return resolveMyChatDisplayName();
  } catch (eResolveNameSelfCard) {}
  return "Игрок";
}

function profilePublicCardAvatarUrl() {
  try {
    if (typeof pokerReadAvatarCacheEntry === "function") {
      var cached = pokerReadAvatarCacheEntry();
      var cachedAvatar = cached && cached.avatar ? String(cached.avatar).trim() : "";
      if (cachedAvatar) return cachedAvatar;
    }
  } catch (eCachedAvatarSelfCard) {}
  try {
    var avatar = document.getElementById("profileAvatar");
    var src = avatar ? String(avatar.currentSrc || avatar.src || "").trim() : "";
    if (src && src.indexOf("profile-pokerist.jpg") < 0) return src;
  } catch (eAvatarSelfCard) {}
  try {
    var auth = window.__pokerTelegramAuth;
    var photo = auth && auth.user && auth.user.photo_url ? String(auth.user.photo_url).trim() : "";
    if (photo && photo.indexOf("http") === 0) return photo;
  } catch (ePhotoSelfCard) {}
  return "";
}

function openProfilePublicCard() {
  var btn = document.getElementById("profileOpenPublicCardBtn");
  var id = profilePublicCardMemberIdFromAuth() || profilePublicCardFallbackDtId();
  if (!id) {
    if (btn) {
      var prevText = btn.textContent;
      btn.textContent = "Войдите";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = prevText || "Открыть";
        btn.disabled = false;
      }, 1400);
    }
    return;
  }
  if (btn) btn.disabled = true;
  var openPromise = null;
  try {
    if (typeof window.pokerOpenChatUserModalSafe === "function") {
      openPromise = window.pokerOpenChatUserModalSafe(id, profilePublicCardDisplayName(), profilePublicCardAvatarUrl(), { selfProfile: true });
    } else if (typeof window.openChatUserModalById === "function") {
      window.openChatUserModalById(id, profilePublicCardDisplayName(), profilePublicCardAvatarUrl(), { selfProfile: true });
      openPromise = Promise.resolve(true);
    }
  } catch (eOpenSelfCard) {
    openPromise = Promise.resolve(false);
  }
  Promise.resolve(openPromise).then(function (ok) {
    if (!ok && btn) {
      var prevText = btn.textContent;
      btn.textContent = "Ошибка";
      setTimeout(function () {
        btn.textContent = prevText || "Открыть";
      }, 1400);
    }
  }).catch(function () {
    if (btn) {
      var prevText = btn.textContent;
      btn.textContent = "Ошибка";
      setTimeout(function () {
        btn.textContent = prevText || "Открыть";
      }, 1400);
    }
  }).finally(function () {
    if (btn) btn.disabled = false;
  });
}

function initProfilePublicCardButton() {
  var btn = document.getElementById("profileOpenPublicCardBtn");
  if (!btn || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", openProfilePublicCard);
}

var profilePublicShowcaseData = null;
var profilePublicShowcaseStatus = null;
var profilePublicShowcaseArtSeq = 0;
var profilePublicShowcaseLoading = false;
var profilePublicShowcaseInitialPending = false;
var profileHeroGenderValue = "male";
var POKER_PROFILE_GENDER_STORAGE_KEY = "poker_profile_gender";
var profilePublicShowcaseLatestRatingNick = "";
var profilePublicShowcaseArtEnsureSeq = 0;

function normalizeProfileHeroGender(value) {
  var raw = String(value || "").trim().toLowerCase();
  if (raw === "female" || raw === "f" || raw === "woman" || raw === "ж" || raw === "жен" || raw === "женский") return "female";
  return "male";
}

function profileHeroGenderText(value) {
  return normalizeProfileHeroGender(value) === "female" ? "Пол: Ж" : "Пол: М";
}

function profileReadStoredHeroGender() {
  try {
    var raw =
      (typeof localStorage !== "undefined" && localStorage.getItem(POKER_PROFILE_GENDER_STORAGE_KEY)) ||
      (typeof sessionStorage !== "undefined" && sessionStorage.getItem(POKER_PROFILE_GENDER_STORAGE_KEY)) ||
      "";
    return normalizeProfileHeroGender(raw);
  } catch (eProfileGenderStorage) {}
  return "male";
}

function profileWriteStoredHeroGender(value) {
  var gender = normalizeProfileHeroGender(value);
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(POKER_PROFILE_GENDER_STORAGE_KEY, gender);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(POKER_PROFILE_GENDER_STORAGE_KEY, gender);
  } catch (eProfileGenderWrite) {}
}

function profileDefaultHeroArt(value) {
  var gender = normalizeProfileHeroGender(value);
  return {
    src: gender === "female" ? "./assets/chat-profile-default-hero-female.webp?v=3.001" : "./assets/chat-profile-default-hero-male.webp",
    nick: gender === "female" ? "Стандартный герой Ж" : "Стандартный герой М",
    defaultHero: true,
    gender: gender,
  };
}

function profileGenderFromData(data) {
  var d = data && typeof data === "object" ? data : {};
  return normalizeProfileHeroGender(d.profileGender || d.gender || d.sex || profileHeroGenderValue || profileReadStoredHeroGender());
}

function renderProfileHeroGenderControl(saving) {
  var row = document.getElementById("profileHeroGender");
  if (!row) return;
  var gender = normalizeProfileHeroGender(profileHeroGenderValue);
  Array.prototype.slice.call(row.querySelectorAll("[data-profile-gender]")).forEach(function (btn) {
    var active = normalizeProfileHeroGender(btn.getAttribute("data-profile-gender")) === gender;
    btn.classList.toggle("profile-hero-gender__btn--active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.disabled = !!saving;
  });
}

function setProfileHeroGenderFeedback(text, timeout) {
  var feedback = document.getElementById("profileHeroGenderFeedback");
  var row = document.getElementById("profileHeroGender");
  var value = String(text || "").trim();
  if (feedback) feedback.textContent = value;
  if (row) row.classList.toggle("profile-hero-gender--has-feedback", !!value);
  if (value && timeout) {
    setTimeout(function () {
      if (!feedback || String(feedback.textContent || "").trim() === value) {
        setProfileHeroGenderFeedback("");
      }
    }, timeout);
  }
}

function setProfileHeroGender(value, opts) {
  opts = opts || {};
  profileHeroGenderValue = normalizeProfileHeroGender(value);
  profileWriteStoredHeroGender(profileHeroGenderValue);
  if (profilePublicShowcaseData && typeof profilePublicShowcaseData === "object") {
    profilePublicShowcaseData.profileGender = profileHeroGenderValue;
  }
  renderProfileHeroGenderControl(!!opts.saving);
  if (opts.syncArt !== false) {
    profilePublicShowcaseSyncArt(profileAchievementRatingNickFromData(profilePublicShowcaseData || {}));
  }
}

function saveProfileHeroGender(value) {
  var next = normalizeProfileHeroGender(value);
  var prev = normalizeProfileHeroGender(profileHeroGenderValue);
  if (next === prev) return;
  setProfileHeroGender(next, { saving: true });
  setProfileHeroGenderFeedback("Сохраняем...");
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  var canServer =
    !!base &&
    ((typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) ||
      (typeof pokerCanSyncGuestProfileToServer === "function" && pokerCanSyncGuestProfileToServer()));
  if (!canServer) {
    renderProfileHeroGenderControl(false);
    setProfileHeroGenderFeedback("Сохранено локально", 1800);
    return;
  }
  fetch(base + "/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerGuestOrAuthedPostBody({ profileGender: next })),
  })
    .then(function (r) {
      return r.json().catch(function () {
        return { ok: false, error: r.status === 401 ? "Откройте в Telegram" : "Ошибка " + r.status };
      });
    })
    .then(function (data) {
      if (!data || !data.ok) {
        setProfileHeroGender(prev);
        setProfileHeroGenderFeedback((data && data.error) || "Ошибка", 2200);
      } else {
        if (typeof pokerClearProfileUserInfoCache === "function") pokerClearProfileUserInfoCache();
        else {
          pokerProfileUserInfoCache = null;
          pokerProfileUserInfoCacheAt = 0;
        }
        setProfileHeroGenderFeedback("Сохранено", 1800);
      }
      renderProfileHeroGenderControl(false);
    })
    .catch(function () {
      setProfileHeroGender(prev);
      renderProfileHeroGenderControl(false);
      setProfileHeroGenderFeedback(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети", 2200);
    });
}

function initProfileHeroGenderControl() {
  var row = document.getElementById("profileHeroGender");
  if (row && row.dataset.bound !== "1") {
    row.dataset.bound = "1";
    row.addEventListener("click", function (event) {
      var btn = event && event.target ? event.target.closest("[data-profile-gender]") : null;
      if (!btn || btn.disabled || !row.contains(btn)) return;
      saveProfileHeroGender(btn.getAttribute("data-profile-gender"));
    });
  }
  setProfileHeroGender(profileHeroGenderValue || profileReadStoredHeroGender(), { syncArt: false });
}

function profilePublicShowcaseFormatXp(value) {
  if (typeof pokerProfileFormatRake === "function") return pokerProfileFormatRake(value);
  var n = Math.max(0, Math.floor(Number(value) || 0));
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function profilePublicShowcaseDisplayName(data) {
  var d = data && typeof data === "object" ? data : {};
  var raw =
    (d.chatDisplayName != null && String(d.chatDisplayName).trim()) ||
    (d.contactName != null && String(d.contactName).trim()) ||
    (d.userName != null && String(d.userName).trim()) ||
    profilePublicCardDisplayName();
  return String(raw || "Игрок").trim();
}

function profilePublicShowcaseStatusFromData(data) {
  var d = data && typeof data === "object" ? data : {};
  if (d.statusPoints != null && d.statusPoints !== "" && typeof pokerProfileStatusFromRake === "function") {
    return pokerProfileStatusFromRake(d.statusPoints);
  }
  if (d.level != null && d.level !== "") {
    var level = Math.max(0, Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, parseInt(d.level, 10) || 0));
    return {
      points: null,
      level: level,
      nextLevel: Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, level + 1),
      levelStart: 0,
      nextStart: 0,
      valuePercent: Math.max(0, Math.min(100, parseInt(d.statusValue, 10) || 0)),
    };
  }
  return profilePublicShowcaseStatus;
}

function profilePublicShowcaseApplyAvatar(title) {
  var img = document.getElementById("profilePublicAvatar");
  var placeholder = document.getElementById("profilePublicAvatarPlaceholder");
  if (!img || !placeholder) return;
  var src = profilePublicCardAvatarUrl();
  if (src) {
    img.src = src;
    img.alt = title || "Игрок";
    img.style.display = "";
    placeholder.style.display = "none";
  } else {
    img.removeAttribute("src");
    img.alt = "";
    img.style.display = "none";
    placeholder.textContent = (title || "И")[0];
    placeholder.style.display = "";
  }
}

function profilePublicShowcaseHideArt(artImg) {
  if (!artImg) return;
  artImg.onerror = null;
  artImg.onload = null;
  artImg.removeAttribute("src");
  artImg.alt = "";
  artImg.hidden = true;
  artImg.style.display = "none";
  artImg.classList.remove("chat-user-modal__rating-art-img--avatar-fallback", "chat-user-modal__rating-art-img--default-hero");
}

function setProfilePublicShowcaseLoading(isLoading, opts) {
  opts = opts || {};
  if (!isLoading && profilePublicShowcaseInitialPending && !opts.force) return;
  var wasLoading = profilePublicShowcaseLoading;
  profilePublicShowcaseLoading = !!isLoading;
  var root = document.getElementById("profilePublicShowcase");
  if (root) root.classList.toggle("profile-public-showcase--loading", profilePublicShowcaseLoading);
  if (profilePublicShowcaseLoading && !wasLoading) {
    profilePublicShowcaseSyncKnownArt(profilePublicShowcaseData);
  } else if (wasLoading && !profilePublicShowcaseLoading) {
    profilePublicShowcaseSyncKnownArt(profilePublicShowcaseData);
  }
}

function profilePublicShowcaseSyncArt(nick, opts) {
  opts = opts || {};
  var artWrap = document.getElementById("profilePublicRatingArt");
  var artImg = document.getElementById("profilePublicRatingArtImg");
  if (!artWrap || !artImg) return;
  var art = null;
  if (!opts.forceDefault && nick && typeof window.pokerGetSummerRatingPlayerArt === "function") {
    try {
      art = window.pokerGetSummerRatingPlayerArt(nick);
    } catch (eProfilePublicArt) {}
  }
  if (!art || !art.src) {
    if (!opts.forceDefault && nick && typeof window.pokerGetSummerRatingPlayerArt !== "function" && typeof profileEnsureLazyScriptDomains === "function") {
      var ensureSeq = ++profilePublicShowcaseArtEnsureSeq;
      profileEnsureLazyScriptDomains(["rating-summer"]).then(function () {
        if (ensureSeq !== profilePublicShowcaseArtEnsureSeq) return;
        if (typeof window.pokerGetSummerRatingPlayerArt === "function") {
          profilePublicShowcaseSyncArt(nick, opts);
        }
      }).catch(function () {});
    }
    if (opts.allowDefault === false) {
      if (!artImg.src) {
        profilePublicShowcaseArtSeq += 1;
        profilePublicShowcaseHideArt(artImg);
      }
      return;
    }
    var avatarFallback = !opts.forceDefault ? profilePublicCardAvatarUrl() : "";
    art = avatarFallback ? { src: avatarFallback, nick: nick || "Фото профиля", avatarFallback: true } : profileDefaultHeroArt(profileHeroGenderValue);
  }
  artWrap.hidden = false;
  if (art && art.src) {
    var seq = (profilePublicShowcaseArtSeq += 1);
    var alt = art.avatarFallback ? "Фото профиля " + (art.nick || nick || "") : "Образ рейтинга " + (art.nick || nick || "");
    var nextSrc = art.src;
    var currentSrc = artImg.currentSrc || artImg.src || "";
    var resolvedSrc = nextSrc;
    try {
      resolvedSrc = new URL(nextSrc, document.baseURI).href;
    } catch (eProfilePublicArtUrl) {}
    artImg.onerror = null;
    artImg.onload = null;
    artImg.classList.toggle("chat-user-modal__rating-art-img--avatar-fallback", art.avatarFallback === true);
    artImg.classList.toggle("chat-user-modal__rating-art-img--default-hero", art.defaultHero === true);
    artImg.alt = alt;
    if (currentSrc === resolvedSrc && artImg.complete && artImg.naturalWidth > 0) {
      artImg.hidden = false;
      artImg.style.display = "";
      return;
    }
    artImg.hidden = true;
    artImg.style.display = "none";
    artImg.onload = function () {
      if (seq !== profilePublicShowcaseArtSeq) return;
      artImg.hidden = false;
      artImg.style.display = "";
    };
    artImg.onerror = function () {
      if (seq !== profilePublicShowcaseArtSeq) return;
      if (art.defaultHero !== true && opts.allowDefault !== false) {
        profilePublicShowcaseSyncArt("", { forceDefault: true });
        return;
      }
      profilePublicShowcaseHideArt(artImg);
    };
    artImg.src = nextSrc;
    if (artImg.complete && artImg.naturalWidth > 0) {
      artImg.onload();
    }
  } else {
    profilePublicShowcaseArtSeq += 1;
    profilePublicShowcaseHideArt(artImg);
  }
}

function profilePublicShowcaseSyncKnownArt(data) {
  var hasData = data && typeof data === "object";
  var nick = hasData ? profileAchievementRatingNickFromData(data) : "";
  if (profilePublicShowcaseLoading) {
    profilePublicShowcaseSyncArt(nick, { allowDefault: false });
  } else if (nick) {
    profilePublicShowcaseSyncArt(nick);
  } else if (hasData) {
    profilePublicShowcaseSyncArt("");
  } else {
    profilePublicShowcaseSyncArt("", { allowDefault: false });
  }
}

function profilePublicShowcaseApplyStatus(status) {
  profilePublicShowcaseStatus = status || null;
  var section = document.getElementById("profilePublicStatusSection");
  var scale = document.getElementById("profilePublicStatusScale");
  var xp = document.getElementById("profilePublicStatusXp");
  var levelText = document.getElementById("profilePublicLevelText");
  var actions = document.getElementById("profilePokerPlusRefreshAction");
  var refreshBtn = document.getElementById("profileStatusRefreshBtn");
  var legacyRefreshBtn = document.getElementById("profilePokerPlusRefreshBtn");
  var pointsBtn = document.getElementById("profileStatusPointsInfoBtn");
  var currentCard = document.getElementById("profilePublicStatusCardCurrent");
  var nextCard = document.getElementById("profilePublicStatusCardNext");
  if (!scale || !levelText) return;
  if (actions) actions.hidden = false;
  if (refreshBtn) {
    refreshBtn.hidden = false;
    if (!String(refreshBtn.textContent || "").trim()) refreshBtn.textContent = "Обновить";
  }
  if (legacyRefreshBtn && legacyRefreshBtn.parentNode === actions) legacyRefreshBtn.hidden = true;
  if (pointsBtn) {
    pointsBtn.hidden = false;
    pointsBtn.textContent = "Как получить уровень";
  }
  if (!status || status.level == null) {
    if (section) section.hidden = true;
    if (xp) {
      xp.textContent = "";
      xp.hidden = true;
    }
    if (refreshBtn) refreshBtn.hidden = true;
    if (legacyRefreshBtn) legacyRefreshBtn.hidden = true;
    if (pointsBtn) pointsBtn.textContent = "Как привязать профиль";
    scale.style.setProperty("--status-value", "0");
    levelText.classList.add("chat-user-modal__level-text--unlinked");
    levelText.textContent = "Привяжите аккаунт";
    levelText.setAttribute("aria-label", "Привяжите аккаунт Poker21, чтобы уровень начал обновляться.");
    levelText.hidden = false;
    return;
  }
  if (section) section.hidden = false;
  levelText.classList.remove("chat-user-modal__level-text--unlinked");
  levelText.removeAttribute("aria-label");
  var level = Math.max(0, Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, parseInt(status.level, 10) || 0));
  if (level <= 0) {
    if (section) section.hidden = false;
    if (xp) {
      xp.textContent = "";
      xp.hidden = true;
    }
    if (currentCard) currentCard.textContent = "Привяжите";
    if (nextCard) nextCard.textContent = "аккаунт";
    scale.style.setProperty("--status-value", "0");
    levelText.classList.add("chat-user-modal__level-text--unlinked");
    levelText.textContent = "Привяжите аккаунт";
    levelText.setAttribute("aria-label", "Привяжите аккаунт Poker21, чтобы уровень начал обновляться.");
    levelText.hidden = false;
    return;
  }
  var nextLevel = status.nextLevel != null ? status.nextLevel : Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, level + 1);
  scale.style.setProperty("--status-value", String(Math.max(0, Math.min(100, parseInt(status.valuePercent, 10) || 0))));
  if (currentCard) currentCard.textContent = pokerProfileStatusCardLabel(level);
  if (nextCard) nextCard.textContent = pokerProfileStatusCardLabel(nextLevel);
  levelText.innerHTML =
    '<span class="chat-user-modal__level-num">' +
    profileEscapeHtml(String(level)) +
    '</span><span class="chat-user-modal__level-rest">из 100</span>';
  levelText.hidden = false;
  if (xp) {
    var points = Number(status.points);
    var levelStart = Number(status.levelStart) || 0;
    var nextStart = Number(status.nextStart) || 0;
    if (isFinite(points) && nextStart > levelStart && level < (POKER_PROFILE_MAX_STATUS_LEVEL || 100)) {
      var currentXp = Math.max(0, Math.floor(points - levelStart));
      var neededXp = Math.max(0, Math.floor(nextStart - levelStart));
      xp.textContent = profilePublicShowcaseFormatXp(currentXp) + " / " + profilePublicShowcaseFormatXp(neededXp) + " XP";
      xp.hidden = false;
    } else if (isFinite(points) && level >= (POKER_PROFILE_MAX_STATUS_LEVEL || 100)) {
      xp.textContent = profilePublicShowcaseFormatXp(points) + " XP · максимум";
      xp.hidden = false;
    } else {
      xp.textContent = "";
      xp.hidden = true;
    }
  }
}

function refreshProfilePublicShowcase(profileData) {
  var root = document.getElementById("profilePublicShowcase");
  if (!root) return;
  if (profileData && typeof profileData === "object") profilePublicShowcaseData = profileData;
  var data = profilePublicShowcaseData || {};
  var title = profilePublicShowcaseDisplayName(data);
  var titleEl = document.getElementById("profilePublicTitle");
  var verified = document.getElementById("profilePublicVerifiedBadge");
  var loginSub = document.getElementById("profilePublicLoginSub");
  var lastSeen = document.getElementById("profilePublicLastSeen");
  var respect = document.getElementById("profilePublicRespectVal");
  var specialtyBadge = document.getElementById("profilePublicSpecialtyBadge");
  var ageBadge = document.getElementById("profilePublicAgeBadge");
  var cityBadge = document.getElementById("profilePublicCityBadge");
  setProfileHeroGender(profileGenderFromData(data), { syncArt: false });
  if (titleEl) titleEl.textContent = title;
  profilePublicShowcaseApplyAvatar(title);
  if (verified) verified.classList.toggle("chat-user-modal__verified--hidden", data && data.pokerPlusVerified !== true);
  if (specialtyBadge) {
    var specialtyText = pokerProfileSpecialtyBadgeText(data && (data.profileSpecialty || data.specialty));
    specialtyBadge.textContent = specialtyText;
    specialtyBadge.hidden = !specialtyText;
    specialtyBadge.classList.toggle("profile-public-showcase__specialty-badge--cash", specialtyText === "Кеш-игрок");
    specialtyBadge.classList.toggle("profile-public-showcase__specialty-badge--mtt", specialtyText === "МТТ-игрок");
  }
  if (ageBadge) {
    var ageText = pokerProfileAgeBadgeText(data && (data.profileBirthDate || data.birthDate));
    ageBadge.textContent = ageText;
    ageBadge.hidden = !ageText;
  }
  if (cityBadge) {
    var cityText = data && (data.profileCity || data.city) != null ? String(data.profileCity || data.city).trim() : "";
    cityBadge.textContent = cityText;
    cityBadge.hidden = !cityText;
  }
  if (loginSub) {
    var login = data && data.userName != null ? String(data.userName).trim() : "";
    loginSub.textContent = login && login !== title ? login : "";
    loginSub.hidden = !loginSub.textContent;
  }
  if (lastSeen) {
    if (data && data.chatOnline) {
      lastSeen.textContent = "В сети";
      lastSeen.hidden = false;
    } else {
      lastSeen.textContent = "";
      lastSeen.hidden = true;
    }
  }
  if (respect) {
    var rv = document.getElementById("profileRespectValue");
    var raw = rv ? String(rv.textContent || "").trim() : "";
    respect.textContent = raw || "\u2014";
  }
  profilePublicShowcaseSyncKnownArt(profilePublicShowcaseData);
  profilePublicShowcaseApplyStatus(profilePublicShowcaseStatusFromData(data));
}

function loadProfilePublicShowcaseInitial() {
  profilePublicShowcaseInitialPending = true;
  if (typeof loadCurrentProfileUserInfo !== "function") {
    refreshProfilePublicShowcase();
    profilePublicShowcaseInitialPending = false;
    setProfilePublicShowcaseLoading(false, { force: true });
    return;
  }
  setProfilePublicShowcaseLoading(true);
  loadCurrentProfileUserInfo()
    .then(function (data) {
      refreshProfilePublicShowcase(data && data.ok ? data : null);
    })
    .catch(function () {
      refreshProfilePublicShowcase();
    })
    .finally(function () {
      profilePublicShowcaseInitialPending = false;
      setProfilePublicShowcaseLoading(false, { force: true });
    });
}

function initProfilePublicShowcase() {
  initProfileHeroGenderControl();
  loadProfilePublicShowcaseInitial();
  var avatar = document.getElementById("profileAvatar");
  if (avatar && avatar.dataset.profilePublicShowcaseBound !== "1") {
    avatar.dataset.profilePublicShowcaseBound = "1";
    avatar.addEventListener("load", function () {
      refreshProfilePublicShowcase();
    });
  }
  if (!window.__pokerProfilePublicShowcaseStatusBound) {
    window.__pokerProfilePublicShowcaseStatusBound = true;
    window.addEventListener("poker-profile-avatar-change", function () {
      refreshProfilePublicShowcase();
    });
    window.addEventListener("poker-pokerplus-status-change", function (event) {
      var detail = event && event.detail ? event.detail : {};
      if (detail.linked === false) {
        profilePublicShowcaseApplyStatus(null);
      } else if (detail.level != null && detail.points != null) {
        profilePublicShowcaseApplyStatus({
          points: detail.points,
          level: detail.level,
          nextLevel: detail.nextLevel != null ? detail.nextLevel : Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, (parseInt(detail.level, 10) || 0) + 1),
          levelStart: detail.levelStart != null ? detail.levelStart : 0,
          nextStart: detail.nextStart != null ? detail.nextStart : 0,
          valuePercent: detail.valuePercent != null ? detail.valuePercent : 0,
        });
      } else if (detail.level != null && !profilePublicShowcaseStatus) {
        profilePublicShowcaseApplyStatus({
          points: null,
          level: detail.level,
          nextLevel: Math.min(POKER_PROFILE_MAX_STATUS_LEVEL || 100, (parseInt(detail.level, 10) || 0) + 1),
          levelStart: 0,
          nextStart: 0,
          valuePercent: 0,
        });
      }
      if (detail.pokerPlusNickname) {
        profilePublicShowcaseLatestRatingNick = String(detail.pokerPlusNickname || "").trim();
        if (!profilePublicShowcaseData || typeof profilePublicShowcaseData !== "object") profilePublicShowcaseData = {};
        profilePublicShowcaseData.pokerPlusNickname = profilePublicShowcaseLatestRatingNick;
        profilePublicShowcaseSyncArt(profilePublicShowcaseLatestRatingNick);
      }
    });
  }
}

var profileAchievementsShowcaseSeq = 0;
var profileAchievementsShowcasePromise = null;
var PROFILE_ACHIEVEMENTS_CACHE_VERSION = "v1";
var PROFILE_ACHIEVEMENTS_CACHE_MAX_AGE = 6 * 60 * 60 * 1000;

function profileAchievementsCacheKey(data) {
  var userId = profileAchievementUserIdFromData(data);
  if (!userId) return "";
  return "poker_profile_achievements_" + PROFILE_ACHIEVEMENTS_CACHE_VERSION + ":" + userId;
}

function readProfileAchievementsCache(data) {
  try {
    var key = profileAchievementsCacheKey(data);
    if (!key || typeof localStorage === "undefined") return null;
    var cached = JSON.parse(localStorage.getItem(key) || "null");
    if (!cached || !cached.result || Date.now() - Number(cached.ts || 0) > PROFILE_ACHIEVEMENTS_CACHE_MAX_AGE) return null;
    return cached.result;
  } catch (eProfileAchievementsCacheRead) {
    return null;
  }
}

function writeProfileAchievementsCache(data, result) {
  try {
    var key = profileAchievementsCacheKey(data);
    if (!key || !result || typeof localStorage === "undefined") return;
    localStorage.setItem(key, JSON.stringify({
      ts: Date.now(),
      result: {
        totalRewardHtml: result.totalRewardHtml || "",
        achievementsHtml: result.achievementsHtml || "",
        ranksHtml: result.ranksHtml || "",
      },
    }));
  } catch (eProfileAchievementsCacheWrite) {}
}

function applyProfileAchievementsResult(result) {
  var showcase = document.getElementById("profileAchievementsShowcase");
  var total = document.getElementById("profileRatingTotal");
  var achievements = document.getElementById("profileAchievementsList");
  var ranks = document.getElementById("profileSeasonRanks");
  if (!showcase || !achievements || !ranks || !result) return false;
  if (total) total.innerHTML = result.totalRewardHtml || renderProfileRatingTotalState("empty");
  achievements.innerHTML = result.achievementsHtml || "";
  ranks.innerHTML = result.ranksHtml || "";
  showcase.hidden = false;
  return true;
}

function renderProfileRatingTotalState(state) {
  var label = state === "empty"
    ? "Турнирный рейтинг пока не найден"
    : (state === "error" ? "Турнирный рейтинг не загрузился" : "Загружаем турнирный рейтинг...");
  return (
    '<div class="chat-user-modal__rating-tabs chat-user-modal__rating-tabs--profile-state">' +
      '<button type="button" class="chat-user-modal__rating-tab chat-user-modal__rating-tab--state chat-user-modal__rating-tab--' +
        state +
        '" disabled aria-disabled="true">' +
        '<span class="chat-user-modal__rating-tab-main">' + label + "</span>" +
      "</button>" +
    "</div>"
  );
}

function profileAchievementRatingNickFromData(data) {
  var raw = data && (data.pokerPlusNickname || data.poker21Nickname || data.ratingNick || data.nickname || data.nick);
  var nick = String(raw || "").trim();
  if (nick) {
    profilePublicShowcaseLatestRatingNick = nick;
    return nick;
  }
  return String(profilePublicShowcaseLatestRatingNick || "").trim();
}

function profileAchievementUserIdFromData(data) {
  var raw =
    (data && (data.userId || data.memberId || data.accountId || data.dtId)) ||
    profilePublicCardMemberIdFromAuth() ||
    profilePublicCardFallbackDtId();
  return String(raw || "").trim();
}

function renderProfileAchievementsShowcaseLoading() {
  var showcase = document.getElementById("profileAchievementsShowcase");
  var total = document.getElementById("profileRatingTotal");
  var achievements = document.getElementById("profileAchievementsList");
  var ranks = document.getElementById("profileSeasonRanks");
  if (showcase) showcase.hidden = false;
  if (total) total.innerHTML = renderProfileRatingTotalState("loading");
  if (achievements) {
    achievements.innerHTML =
      '<div class="chat-user-modal__achievements-loading" role="status" aria-live="polite">' +
        "Идет загрузка достижений..." +
      "</div>";
  }
  if (ranks) {
    ranks.innerHTML =
      '<div class="chat-user-modal__achievements-loading" role="status" aria-live="polite">' +
        "Идет загрузка истории сезонов..." +
      "</div>";
  }
}

function profileEnsureLazyScriptDomains(domains) {
  var list = Array.isArray(domains) ? domains : String(domains || "").split(/[\s,]+/);
  var normalized = [];
  list.forEach(function (domain) {
    var name = String(domain || "").trim();
    if (name && normalized.indexOf(name) === -1) normalized.push(name);
  });
  if (!normalized.length) return Promise.resolve(true);
  if (typeof window.pokerEnsureScriptDomains === "function") {
    return Promise.resolve(window.pokerEnsureScriptDomains(normalized)).catch(function () { return true; });
  }
  var withDeps = [];
  function addDomain(domain) {
    if (!domain || withDeps.indexOf(domain) !== -1) return;
    if (domain === "rating-winter" || domain === "rating-spring" || domain === "rating-summer") addDomain("rating-common");
    withDeps.push(domain);
  }
  normalized.forEach(addDomain);
  var chain = Promise.resolve(true);
  withDeps.forEach(function (domain) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('script[type="application/poker-lazy"][data-poker-lazy-domain][src]'))
      .filter(function (script) {
        return String(script.getAttribute("data-poker-lazy-domain") || "").split(/[\s,]+/).indexOf(domain) !== -1;
      });
    nodes.forEach(function (sourceNode) {
      chain = chain.then(function () {
        if (sourceNode.getAttribute("data-poker-loaded") === "1") return true;
        var src = sourceNode.getAttribute("src");
        if (!src) return true;
        return new Promise(function (resolve) {
          var existing = Array.prototype.slice.call(document.querySelectorAll("script[src]"))
            .some(function (script) { return script !== sourceNode && script.getAttribute("src") === src; });
          if (existing) {
            sourceNode.setAttribute("data-poker-loaded", "1");
            resolve(true);
            return;
          }
          var script = document.createElement("script");
          script.src = src;
          script.async = false;
          script.setAttribute("data-poker-lazy-loaded-from", domain);
          script.onload = function () {
            sourceNode.setAttribute("data-poker-loaded", "1");
            resolve(true);
          };
          script.onerror = function () { resolve(false); };
          (document.head || document.documentElement).appendChild(script);
        });
      });
    });
  });
  return chain.then(function () { return true; });
}

function ensureProfileAchievementsBuilder() {
  function hasBuilder() {
    return typeof window.pokerBuildProfileAchievements === "function";
  }
  function waitForBuilder() {
    if (hasBuilder()) return Promise.resolve(true);
    return new Promise(function (resolve) {
      var tries = 0;
      function tick() {
        if (hasBuilder()) {
          resolve(true);
          return;
        }
        tries += 1;
        if (tries >= 10) {
          resolve(false);
          return;
        }
        window.setTimeout(tick, 120);
      }
      tick();
    });
  }
  function ensureRatingData() {
    return profileEnsureLazyScriptDomains(["rating-winter", "rating-spring", "rating-summer"]);
  }
  function ensureChatBuilderScript() {
    if (hasBuilder()) return Promise.resolve(true);
    return profileEnsureLazyScriptDomains(["chat"]).then(function () {
      try {
        if (typeof window.pokerEnsureChatUserModalReady === "function") window.pokerEnsureChatUserModalReady();
      } catch (eEnsureChatAfterLoad) {}
      return true;
    });
  }
  if (hasBuilder()) {
    return ensureRatingData().then(function () { return true; });
  }
  try {
    if (typeof window.pokerEnsureChatUserModalReady === "function" && window.pokerEnsureChatUserModalReady()) {
      return ensureRatingData().then(function () {
        return waitForBuilder();
      });
    }
  } catch (eEnsureChatBuilder) {}
  if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
    try {
      return Promise.resolve(window.pokerEnsureGlobalModalsHtml())
        .then(function () {
          return ensureChatBuilderScript().then(function () {
            return ensureRatingData().then(function () {
              return waitForBuilder();
            });
          });
        })
        .catch(function () { return false; });
    } catch (eGlobalBuilder) {}
  }
  return ensureChatBuilderScript()
    .then(waitForBuilder)
    .then(function (ready) {
      if (!ready) return false;
      return ensureRatingData().then(function () { return true; });
    });
}

function refreshProfileAchievementsShowcase(profileData) {
  var showcase = document.getElementById("profileAchievementsShowcase");
  var total = document.getElementById("profileRatingTotal");
  var achievements = document.getElementById("profileAchievementsList");
  var ranks = document.getElementById("profileSeasonRanks");
  if (!showcase || !achievements || !ranks) return Promise.resolve(false);
  if (profileAchievementsShowcasePromise) return profileAchievementsShowcasePromise;
  var seq = ++profileAchievementsShowcaseSeq;
  var dataReady = profileData && profileData.ok
    ? Promise.resolve(profileData)
    : (typeof loadCurrentProfileUserInfo === "function" ? loadCurrentProfileUserInfo() : Promise.resolve(null));
  var resolvedProfileData = profileData && profileData.ok ? profileData : null;
  var cachedData = profileData && profileData.ok ? profileData : pokerProfileUserInfoCache;
  var cachedResult = readProfileAchievementsCache(cachedData);
  if (cachedResult) applyProfileAchievementsResult(cachedResult);
  else renderProfileAchievementsShowcaseLoading();
  profileAchievementsShowcasePromise = Promise.resolve(dataReady)
    .then(function (data) {
      if (seq !== profileAchievementsShowcaseSeq) return false;
      resolvedProfileData = data && data.ok ? data : resolvedProfileData;
      if (!cachedResult) {
        cachedResult = readProfileAchievementsCache(data);
        if (cachedResult) applyProfileAchievementsResult(cachedResult);
      }
      return ensureProfileAchievementsBuilder().then(function (ready) {
        if (!ready || typeof window.pokerBuildProfileAchievements !== "function") throw new Error("achievement-builder-unavailable");
        return window.pokerBuildProfileAchievements({
          ratingNick: profileAchievementRatingNickFromData(data),
          profileData: data || {},
          userId: profileAchievementUserIdFromData(data),
          isSelfProfile: true,
        });
      });
    })
    .then(function (result) {
      if (seq !== profileAchievementsShowcaseSeq || !result) return false;
      writeProfileAchievementsCache(resolvedProfileData || pokerProfileUserInfoCache, result);
      applyProfileAchievementsResult(result);
      return true;
    })
    .catch(function () {
      if (seq !== profileAchievementsShowcaseSeq) return false;
      if (cachedResult) return true;
      if (total) total.innerHTML = renderProfileRatingTotalState("error");
      achievements.innerHTML =
        '<div class="chat-user-modal__achievements-loading" role="status" aria-live="polite">' +
          "Идет загрузка достижений..." +
        "</div>";
      ranks.innerHTML =
        '<div class="chat-user-modal__achievements-loading" role="status" aria-live="polite">' +
          "Идет загрузка истории сезонов..." +
        "</div>";
      return false;
    })
    .finally(function () {
      profileAchievementsShowcasePromise = null;
    });
  return profileAchievementsShowcasePromise;
}

function initProfileAchievementsShowcase() {
  var showcase = document.getElementById("profileAchievementsShowcase");
  var profileView = document.getElementById("profileView");
  if (!showcase || !profileView) return;
  if (showcase.dataset.bound !== "1") {
    showcase.dataset.bound = "1";
    profileView.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var card = event && event.target ? event.target.closest("[data-chat-achievement-info]") : null;
      if (!card || !showcase.contains(card)) return;
      if (typeof window.pokerOpenChatAchievementInfoModal !== "function") return;
      event.preventDefault();
      window.pokerOpenChatAchievementInfoModal(card);
    });
    profileView.addEventListener("click", function (event) {
      var card = event && event.target ? event.target.closest("[data-chat-achievement-info]") : null;
      if (card && showcase.contains(card) && typeof window.pokerOpenChatAchievementInfoModal === "function") {
        event.preventDefault();
        window.pokerOpenChatAchievementInfoModal(card);
        return;
      }
      var totalBtn = event && event.target ? event.target.closest("[data-profile-rating-total]") : null;
      if (totalBtn) {
        if (totalBtn.disabled || totalBtn.getAttribute("aria-disabled") === "true") return;
        var nick = profileAchievementRatingNickFromData(pokerProfileUserInfoCache);
        if (typeof window.pokerOpenLatestTournamentRatingPlayerModal === "function") {
          window.pokerOpenLatestTournamentRatingPlayerModal(nick);
        } else if (typeof openWinterRatingPlayerModalReady === "function") {
          openWinterRatingPlayerModalReady(nick, { season: "summer" });
        }
        return;
      }
    });
  }
  var idle = window.requestIdleCallback || function (callback) {
    return window.setTimeout(callback, 1800);
  };
  idle(function () {
    try {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && (connection.saveData || /(^|-)2g$/i.test(String(connection.effectiveType || "")))) return;
    } catch (eProfileAchievementsConnection) {}
    refreshProfileAchievementsShowcase();
  }, { timeout: 5000 });
}

function syncProfileStatusVisibility(isVerified) {
  var statusSection = document.getElementById("profileStatusSection");
  if (!statusSection) return;
  statusSection.classList.toggle("profile-guest-hidden", !isVerified);
}

function syncProfileVerifiedContentVisibility(isVerified) {
  var verifiedContent = document.getElementById("profileVerifiedContent");
  var avatarBlock = document.getElementById("profileAvatarBlock");
  var profileView = document.getElementById("profileView");
  var profileTabs = document.getElementById("profileTabs");
  var heroCard = document.querySelector("#profileView .profile-hero-card");
  var chatRow = document.getElementById("profileChatNameRow");
  var saveWrap = document.getElementById("profileChatNameSaveWrap");
  var chatNameWrap = document.querySelector("#profileView .profile-chat-name");
  var friendsWrap = document.querySelector("#profileView .profile-friends");
  var publicShowcase = document.getElementById("profilePublicShowcase");
  var achievementsWrap = document.getElementById("profileAchievementsShowcase");
  if (verifiedContent) verifiedContent.hidden = !isVerified;
  if (avatarBlock) avatarBlock.hidden = !isVerified;
  if (profileTabs) profileTabs.hidden = !isVerified;
  if (heroCard) heroCard.hidden = !isVerified;
  if (publicShowcase) publicShowcase.hidden = !isVerified;
  if (achievementsWrap) achievementsWrap.hidden = !isVerified;
  if (chatRow) chatRow.classList.toggle("profile-guest-hidden", !isVerified);
  if (saveWrap) saveWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (chatNameWrap) chatNameWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (friendsWrap) friendsWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (profileView) profileView.classList.toggle("profile-view--guest", !isVerified);
  if (!isVerified && typeof closeProfileNameEditor === "function") closeProfileNameEditor();
}

function syncProfileLoadingVisibility(isLoading) {
  var note = document.getElementById("profileLoadingNote");
  var profileView = document.getElementById("profileView");
  setProfilePublicShowcaseLoading(!!isLoading);
  if (note) {
    note.hidden = !isLoading;
    note.classList.toggle("profile-loading-note--hidden", !isLoading);
  }
  if (profileView) profileView.classList.toggle("profile-view--loading-account", !!isLoading);
}

function pokerClearUiCachesAfterAuthSwitch() {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(POKER_CHAT_CONTACTS_CACHE_KEY);
      localStorage.removeItem(POKER_CHAT_GENERAL_DISK_KEY);
      localStorage.removeItem(POKER_CHAT_PERSONAL_DISK_KEY);
    }
  } catch (eLocalCache) {}
  try {
    if (typeof sessionStorage !== "undefined") {
      var removeKeys = [];
      for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        if (key && key.indexOf("poker_avatar_data:") === 0) removeKeys.push(key);
      }
      removeKeys.forEach(function (key) {
        try { sessionStorage.removeItem(key); } catch (eRm) {}
      });
    }
  } catch (eSessionCache) {}
}

function initProfileExitBtn() {
  var btn = document.getElementById("profileExitBtn");
  if (!btn) return;
  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", function () {
    var authState = null;
    try {
      authState = typeof pokerProfileAuthState === "function" ? pokerProfileAuthState() : null;
    } catch (eProfileAuthClick) {}
    var hasAccountSession = !!(authState && authState.hasAccountSession);
    if (!authState) {
      try {
        var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
        var isGuest = false;
        var auth = window.__pokerTelegramAuth;
        isGuest = !!(auth && auth.status === "guest");
        if (!isGuest && typeof pokerReadPwaGuestMode === "function") isGuest = !!pokerReadPwaGuestMode();
        hasAccountSession = hasSession && !isGuest;
      } catch (eGuestClick) {}
    }
    if (hasAccountSession) {
      if (typeof window.__pokerClearSessionsAndReloadForLogin === "function") window.__pokerClearSessionsAndReloadForLogin();
      return;
    }
    if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow({ forceOverlay: true });
  });
}

function initProfileP21Id() {
  var nameInput = document.getElementById("profileChatDisplayNameInput");
  var saveBtn = document.getElementById("profileSaveBtn");
  var feedback = document.getElementById("profileSaveFeedback");
  if (!nameInput && !saveBtn) return;
  var base = getApiBase();
  var canServer = base && (pokerApiHasCredential() || pokerCanSyncGuestProfileToServer());
  if (canServer) {
    var profileInfoPromise = pokerApiHasCredential()
      ? loadCurrentProfileUserInfo()
      : fetch(base + "/api/users" + pokerRafflesApiQueryLeading()).then(function (r) { return r.json(); });
    profileInfoPromise
      .then(function (data) {
        if (!data || !data.ok) return;
        try {
          var sdn = data.chatDisplayName != null && String(data.chatDisplayName).trim() ? String(data.chatDisplayName).trim() : "";
          window.__pokerChatDisplayName = sdn;
          pokerWriteStoredProfileDisplayName(sdn);
          if (nameInput) nameInput.value = sdn;
          if (typeof updateProfileUserName === "function") updateProfileUserName();
        } catch (eSd) {}
      })
      .catch(function () {});
  }
  function saveP21Id() {
    var nameVal = nameInput ? String(nameInput.value || "").trim().slice(0, 80) : "";
    var base = getApiBase();
    if (!base || (!pokerApiHasCredential() && !pokerCanSyncGuestProfileToServer())) {
      try {
        window.__pokerChatDisplayName = nameVal;
        pokerWriteStoredProfileDisplayName(nameVal);
        updateProfileUserName();
        closeProfileNameEditor();
      } catch (eLoc) {}
      if (feedback) {
        feedback.textContent = "Сохранено локально. Войдите в аккаунт или откройте в Telegram, чтобы синхронизировать.";
        feedback.classList.add("profile-save-feedback--visible");
        setTimeout(function () {
          feedback.textContent = "";
          feedback.classList.remove("profile-save-feedback--visible");
        }, 4000);
      }
      return;
    }
    fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ chatDisplayName: nameVal })),
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: r.status === 401 ? "Откройте в Telegram" : "Ошибка " + r.status }; });
      })
        .then(function (data) {
        try {
          window.__pokerChatDisplayName = nameVal;
          pokerWriteStoredProfileDisplayName(nameVal);
          updateProfileUserName();
          if (data && data.ok) closeProfileNameEditor();
        } catch (eOkNm) {}
        if (feedback) {
          var msg = data && data.ok ? "Сохранено" : (data && data.error) || "Ошибка";
          var m = String(msg).toLowerCase();
          if (/telegram|телеграм|откройте/.test(m) && pokerApiHasCredential()) msg = "Откройте приложение в Telegram";
          feedback.textContent = msg;
          feedback.classList.add("profile-save-feedback--visible");
          setTimeout(function () {
            feedback.textContent = "";
            feedback.classList.remove("profile-save-feedback--visible");
          }, 2500);
        }
      })
      .catch(function () {
        if (feedback) {
          feedback.textContent = POKER_NET_ERR;
          feedback.classList.add("profile-save-feedback--visible");
          setTimeout(function () {
            feedback.textContent = "";
            feedback.classList.remove("profile-save-feedback--visible");
          }, 2500);
        }
      });
  }
  if (saveBtn) saveBtn.addEventListener("click", saveP21Id);
  initProfileNameEditor();
}

var cashoutDepositFormBound = false;
function initCashoutDepositForm() {
  var form = document.getElementById("cashoutDepositForm");
  var wrapP21 = document.getElementById("cashoutFormIdWrapP21");
  var wrapXpoker = document.getElementById("cashoutFormIdWrapXpoker");
  var displayP21 = document.getElementById("cashoutP21IdDisplay");
  var radioP21 = document.getElementById("cashoutPlatformPoker21");
  var radioXpoker = document.getElementById("cashoutPlatformXpoker");
  if (!form || !wrapP21 || !wrapXpoker) return;

  function getStoredP21ForCashout() {
    return (typeof window !== "undefined" && window.__pokerPlusUserId) || "";
  }

  function togglePlatform() {
    var isP21 = radioP21 && radioP21.checked;
    if (wrapP21) wrapP21.classList.toggle("cashout-form-id-wrap--hidden", !isP21);
    if (wrapXpoker) wrapXpoker.classList.toggle("cashout-form-id-wrap--hidden", isP21);
  }

  if (!cashoutDepositFormBound) {
    cashoutDepositFormBound = true;
    if (radioP21) radioP21.addEventListener("change", togglePlatform);
    if (radioXpoker) radioXpoker.addEventListener("change", togglePlatform);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var amountEl = document.getElementById("cashoutAmount");
      var amount = amountEl ? amountEl.value : "";
      var isP21 = radioP21 && radioP21.checked;
      var id = isP21 ? (displayP21 && displayP21.value) || "" : ((document.getElementById("cashoutXpokerId") && document.getElementById("cashoutXpokerId").value) || "");
      var platform = isP21 ? "Poker21" : "Xpoker";
      var lines = ["Заявка на пополнение", "Сумма: " + (amount.trim() || "—") + " руб.", "Платформа: " + platform, "ID: " + (id.trim() || "—")];
      window.__pendingDepositMessage = lines.join("\n");
      window.__pendingOpenManagerFromCashout = { userId: "tg_2144406710", userName: "Анна" };
      if (typeof setView === "function") setView("chat");
    });
  }

  togglePlatform();
  if (displayP21) displayP21.value = getStoredP21ForCashout().replace(/\D/g, "").slice(0, 6) || "—";
}

function initProfilePersonal() {
  var textarea = document.getElementById("profilePersonalInput");
  var saveBtn = document.getElementById("profilePersonalSaveBtn");
  var feedback = document.getElementById("profilePersonalFeedback");
  if (!textarea || !saveBtn) return;
  if (saveBtn.dataset.personalBound === "1") return;
  saveBtn.dataset.personalBound = "1";
  var base = getApiBase();
  var canServer =
    !!base &&
    ((typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) ||
      (typeof pokerCanSyncGuestProfileToServer === "function" && pokerCanSyncGuestProfileToServer()));
  if (canServer) {
    var profileInfoPromise = typeof pokerApiHasCredential === "function" && pokerApiHasCredential()
      ? loadCurrentProfileUserInfo()
      : fetch(base + "/api/users" + pokerRafflesApiQueryLeading()).then(function (r) { return r.json(); });
    profileInfoPromise
      .then(function (data) {
        if (data && data.ok && data.personalInfo != null) textarea.value = data.personalInfo;
      })
      .catch(function () {});
  }
  function savePersonal() {
    var val = (textarea.value || "").trim().slice(0, 500);
    if (!base || !canServer) {
      if (feedback) {
        feedback.textContent = "Войдите в аккаунт или откройте в Telegram, чтобы сохранить.";
        feedback.classList.add("profile-personal__feedback--visible");
        setTimeout(function () {
          feedback.textContent = "";
          feedback.classList.remove("profile-personal__feedback--visible");
        }, 3500);
      }
      return;
    }
    var personalSaveLabel = saveBtn.textContent ? saveBtn.textContent.trim() : "Сохранить";
    saveBtn.disabled = true;
    saveBtn.textContent = "Сохраняем…";
    fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ personalInfo: val })),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.status === 401 ? "Откройте в Telegram" : "Ошибка " + r.status };
        });
      })
      .then(function (data) {
        saveBtn.disabled = false;
        saveBtn.textContent = personalSaveLabel;
        if (feedback) {
          var msg = data && data.ok ? "Сохранено" : (data && data.error) || "Ошибка";
          var m = String(msg).toLowerCase();
          if (/telegram|телеграм|откройте/.test(m) && typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
            msg = "Откройте приложение в Telegram";
          }
          feedback.textContent = msg;
          feedback.classList.add("profile-personal__feedback--visible");
          setTimeout(function () {
            feedback.textContent = "";
            feedback.classList.remove("profile-personal__feedback--visible");
          }, 2500);
        }
      })
      .catch(function () {
        saveBtn.disabled = false;
        saveBtn.textContent = personalSaveLabel;
        if (feedback) {
          feedback.textContent = POKER_NET_ERR;
          feedback.classList.add("profile-personal__feedback--visible");
          setTimeout(function () {
            feedback.textContent = "";
            feedback.classList.remove("profile-personal__feedback--visible");
          }, 2500);
        }
      });
  }
  saveBtn.addEventListener("click", savePersonal);
}

function pokerProfileFormatBirthDateRu(value) {
  var raw = String(value || "").trim();
  var m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  return m[3] + "." + m[2] + "." + m[1];
}

function pokerProfilePluralYears(age) {
  var n = Math.abs(Number(age) || 0);
  var mod100 = n % 100;
  var mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return "лет";
  if (mod10 === 1) return "год";
  if (mod10 >= 2 && mod10 <= 4) return "года";
  return "лет";
}

function pokerProfileAgeFromBirthDate(value) {
  var raw = String(value || "").trim();
  var m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  var year = Number(m[1]);
  var month = Number(m[2]);
  var day = Number(m[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  var now = new Date();
  var age = now.getFullYear() - year;
  var currentMonth = now.getMonth() + 1;
  var currentDay = now.getDate();
  if (currentMonth < month || (currentMonth === month && currentDay < day)) age -= 1;
  if (!isFinite(age) || age < 0 || age > 130) return null;
  return age;
}

function pokerProfileAgeBadgeText(value) {
  var age = pokerProfileAgeFromBirthDate(value);
  if (age == null) return "";
  return age + " " + pokerProfilePluralYears(age);
}

function pokerProfileSpecialtyLabel(value) {
  var raw = String(value || "").trim().toLowerCase();
  if (raw === "mtt" || raw === "мтт") return "МТТ";
  if (raw === "cash" || raw === "кеш" || raw === "кэш") return "Кеш";
  return "";
}

function pokerProfileSpecialtyBadgeText(value) {
  var label = pokerProfileSpecialtyLabel(value);
  if (label === "МТТ") return "МТТ-игрок";
  if (label === "Кеш") return "Кеш-игрок";
  return "";
}

function pokerProfileNormalizeCity(value) {
  return String(value || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

var pokerProfileCityCatalogPromise = null;
var pokerProfileCityLookup = null;
var POKER_PROFILE_EXTRA_CITIES = [
  // Беларусь
  "Минск", "Брест", "Витебск", "Гомель", "Гродно", "Могилёв", "Барановичи", "Бобруйск", "Борисов", "Мозырь", "Пинск",
  // Казахстан
  "Астана", "Алматы", "Шымкент", "Караганда", "Актобе", "Тараз", "Павлодар", "Усть-Каменогорск", "Семей", "Атырау",
  "Костанай", "Кызылорда", "Уральск", "Петропавловск", "Актау", "Темиртау", "Туркестан",
  // Узбекистан
  "Ташкент", "Самарканд", "Наманган", "Андижан", "Бухара", "Фергана", "Нукус", "Карши", "Коканд", "Маргилан", "Джизак", "Навои", "Термез", "Ургенч",
  // Кыргызстан
  "Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок", "Узген", "Нарын", "Талас",
  // Таджикистан
  "Душанбе", "Худжанд", "Бохтар", "Куляб", "Истаравшан", "Турсунзаде", "Пенджикент",
  // Азербайджан
  "Баку", "Гянджа", "Сумгаит", "Ленкорань", "Мингечевир", "Нахичевань", "Шеки", "Ширван",
  // Армения
  "Ереван", "Гюмри", "Ванадзор", "Вагаршапат", "Раздан", "Абовян", "Капан",
  // Молдова
  "Кишинёв", "Бельцы", "Бендеры", "Тирасполь", "Кагул", "Оргеев", "Сороки", "Унгены",
  // Туркменистан
  "Ашхабад", "Туркменабад", "Дашогуз", "Мары", "Балканабад", "Туркменбаши"
];

function pokerProfileCityKey(value) {
  return pokerProfileNormalizeCity(value).toLocaleLowerCase("ru-RU").replace(/ё/g, "е");
}

function pokerProfileLoadCityCatalog() {
  if (pokerProfileCityLookup) return Promise.resolve(pokerProfileCityLookup);
  if (pokerProfileCityCatalogPromise) return pokerProfileCityCatalogPromise;
  pokerProfileCityCatalogPromise = fetch("./assets/profile-cities.json?v=3.001", { cache: "force-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("City catalog unavailable");
      return response.json();
    })
    .then(function (data) {
      var cities = Array.isArray(data && data.cities) ? data.cities : [];
      var aliases = data && data.aliases && typeof data.aliases === "object" ? data.aliases : {};
      var lookup = Object.create(null);
      cities.forEach(function (city) {
        var normalized = pokerProfileNormalizeCity(city);
        var key = pokerProfileCityKey(normalized);
        if (key && normalized) lookup[key] = normalized;
      });
      POKER_PROFILE_EXTRA_CITIES.forEach(function (city) {
        var normalized = pokerProfileNormalizeCity(city);
        var key = pokerProfileCityKey(normalized);
        if (key && normalized) lookup[key] = normalized;
      });
      Object.keys(aliases).forEach(function (alias) {
        var canonical = pokerProfileNormalizeCity(aliases[alias]);
        if (canonical) lookup[pokerProfileCityKey(alias)] = canonical;
      });
      if (!Object.keys(lookup).length) throw new Error("City catalog is empty");
      pokerProfileCityLookup = lookup;
      return lookup;
    })
    .finally(function () {
      pokerProfileCityCatalogPromise = null;
    });
  return pokerProfileCityCatalogPromise;
}

function pokerProfileResolveRealCity(value) {
  var normalized = pokerProfileNormalizeCity(value);
  if (!normalized) return Promise.resolve("");
  return pokerProfileLoadCityCatalog().then(function (lookup) {
    return lookup[pokerProfileCityKey(normalized)] || "";
  });
}

var profileHeroCityWidthObserver = null;
var profileHeroCityWidthResizeBound = false;

function pokerProfileSyncHeroCityWidth() {
  var city = document.getElementById("profileHeroCity");
  var controls = document.querySelector(".profile-public-showcase__identity-controls");
  var birth = document.getElementById("profileHeroBirthDate");
  if (!city || !controls) return;
  var cityRect = city.getBoundingClientRect ? city.getBoundingClientRect() : null;
  var birthRect = birth && birth.getBoundingClientRect ? birth.getBoundingClientRect() : null;
  var controlsRect = controls.getBoundingClientRect ? controls.getBoundingClientRect() : null;
  var width = cityRect && birthRect && birthRect.right > cityRect.left
    ? Math.ceil(birthRect.right - cityRect.left)
    : (controlsRect && controlsRect.width ? Math.ceil(controlsRect.width) : Math.ceil(controls.offsetWidth || 0));
  if (width >= 160) city.style.setProperty("--profile-hero-city-width", width + "px");
}

function pokerProfileQueueHeroCityWidthSync() {
  pokerProfileSyncHeroCityWidth();
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(function () {
      pokerProfileSyncHeroCityWidth();
    });
  }
}

function initProfileHeroCityWidthSync() {
  var city = document.getElementById("profileHeroCity");
  var controls = document.querySelector(".profile-public-showcase__identity-controls");
  if (!city || !controls || city.dataset.widthSyncBound === "1") {
    pokerProfileQueueHeroCityWidthSync();
    return;
  }
  city.dataset.widthSyncBound = "1";
  if (typeof ResizeObserver === "function") {
    profileHeroCityWidthObserver = new ResizeObserver(function () {
      pokerProfileQueueHeroCityWidthSync();
    });
    profileHeroCityWidthObserver.observe(controls);
  }
  if (!profileHeroCityWidthResizeBound) {
    profileHeroCityWidthResizeBound = true;
    window.addEventListener("resize", pokerProfileQueueHeroCityWidthSync);
    window.addEventListener("orientationchange", pokerProfileQueueHeroCityWidthSync);
  }
  pokerProfileQueueHeroCityWidthSync();
}

var PROFILE_MTT_PREFERENCE_VALUES = ["under500", "1k5k", "5kplus", "offline"];
var PROFILE_CASH_PREFERENCE_VALUES = ["up-to-5-10", "10-20-20-40", "25-50-50-100", "50-100-plus"];

function pokerProfileNormalizePreferenceList(value, allowed, maxCount) {
  var raw = Array.isArray(value)
    ? value
    : String(value || "")
        .split(/[,\s]+/)
        .filter(Boolean);
  var allowedMap = {};
  var out = [];
  allowed.forEach(function (item) {
    allowedMap[item] = true;
  });
  raw.forEach(function (item) {
    var key = String(item || "").trim();
    if (!allowedMap[key] || out.indexOf(key) !== -1) return;
    if (maxCount && out.length >= maxCount) return;
    out.push(key);
  });
  return out;
}

function pokerProfileMttPreferences(value) {
  return pokerProfileNormalizePreferenceList(value, PROFILE_MTT_PREFERENCE_VALUES, 0);
}

function pokerProfileCashPreferences(value) {
  return pokerProfileNormalizePreferenceList(value, PROFILE_CASH_PREFERENCE_VALUES, 2);
}

function initProfilePlayerDetails() {
  var section = document.getElementById("profileHeroBirthDate") || document.getElementById("profilePlayerDetailsSection");
  var birthInput = document.getElementById("profileBirthDateInput");
  var birthSave = document.getElementById("profileBirthDateSaveBtn");
  var cityInput = document.getElementById("profileCityInput");
  var citySave = document.getElementById("profileCitySaveBtn");
  var cityFeedback = document.getElementById("profileCityFeedback");
  var specialtyBtns = document.querySelectorAll("[data-profile-specialty]");
  var preferencesWrap = document.getElementById("profileHeroPreferences");
  var preferencesMtt = document.getElementById("profileHeroPreferencesMtt");
  var preferencesCash = document.getElementById("profileHeroPreferencesCash");
  var preferenceBtns = document.querySelectorAll("[data-profile-preference-kind][data-profile-preference]");
  var preferenceFeedback = document.getElementById("profileHeroPreferencesFeedback");
  var feedback = document.getElementById("profileBirthDateFeedback") || document.getElementById("profilePlayerDetailsFeedback");
  var specialtyFeedback = document.getElementById("profileSpecialtyFeedback");
  if (!section || section.dataset.playerDetailsBound === "1") return;
  section.dataset.playerDetailsBound = "1";
  initProfileHeroCityWidthSync();
  var selectedSpecialty = "";
  var selectedMttPreferences = [];
  var selectedCashPreferences = [];
  var base = getApiBase();
  var canServer =
    !!base &&
    ((typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) ||
      (typeof pokerCanSyncGuestProfileToServer === "function" && pokerCanSyncGuestProfileToServer()));
  if (birthInput) {
    birthInput.min = "1965-01-01";
    birthInput.max = "2010-12-31";
  }
  if (cityInput) {
    cityInput.addEventListener("focus", function () {
      pokerProfileLoadCityCatalog().catch(function () {});
    });
    cityInput.addEventListener("input", function () {
      cityInput.setCustomValidity("");
    });
  }
  function showDetailsFeedback(text, ms) {
    if (!feedback) return;
    feedback.textContent = text || "";
    if (ms !== 0) {
      setTimeout(function () {
        if (feedback.textContent === text) feedback.textContent = "";
      }, ms || 2500);
    }
  }
  function showSpecialtyFeedback(text, ms) {
    if (!specialtyFeedback) {
      showDetailsFeedback(text, ms);
      return;
    }
    specialtyFeedback.textContent = text || "";
    if (ms !== 0) {
      setTimeout(function () {
        if (specialtyFeedback.textContent === text) specialtyFeedback.textContent = "";
      }, ms || 2500);
    }
  }
  function showCityFeedback(text, ms) {
    if (!cityFeedback) {
      showDetailsFeedback(text, ms);
      return;
    }
    cityFeedback.textContent = text || "";
    if (ms !== 0) {
      setTimeout(function () {
        if (cityFeedback.textContent === text) cityFeedback.textContent = "";
      }, ms || 2500);
    }
  }
  function showPreferenceFeedback(text, ms) {
    if (!preferenceFeedback) {
      showSpecialtyFeedback(text, ms);
      return;
    }
    preferenceFeedback.textContent = text || "";
    if (ms !== 0) {
      setTimeout(function () {
        if (preferenceFeedback.textContent === text) preferenceFeedback.textContent = "";
      }, ms || 2500);
    }
  }
  function setBirthDateState(value) {
    var saved = String(value || "").trim();
    var savedYearMatch = saved.match(/^(\d{4})-\d{2}-\d{2}$/);
    var savedYear = savedYearMatch ? Number(savedYearMatch[1]) : 0;
    var savedAllowed = !!saved && savedYear >= 1965 && savedYear <= 2010;
    section.classList.toggle("profile-hero-birth--saved", savedAllowed);
    if (birthInput) {
      birthInput.value = saved;
      birthInput.disabled = savedAllowed;
    }
    if (birthSave) {
      birthSave.hidden = savedAllowed;
      birthSave.disabled = savedAllowed;
    }
    if (saved && !savedAllowed) showDetailsFeedback("Исправьте год рождения: допустимо от 1965 до 2010.", 0);
    pokerProfileQueueHeroCityWidthSync();
    var ageBadge = document.getElementById("profilePublicAgeBadge");
    if (ageBadge) {
      var ageText = pokerProfileAgeBadgeText(saved);
      ageBadge.textContent = ageText;
      ageBadge.hidden = !ageText;
    }
  }
  function setCityState(value) {
    var city = pokerProfileNormalizeCity(value);
    if (cityInput) cityInput.value = city;
    var cityBadge = document.getElementById("profilePublicCityBadge");
    if (cityBadge) {
      cityBadge.textContent = city;
      cityBadge.hidden = !city;
    }
  }
  function setSpecialtyState(value) {
    var selected = String(value || "").trim().toLowerCase();
    selectedSpecialty = selected === "mtt" || selected === "cash" ? selected : "";
    specialtyBtns.forEach(function (btn) {
      var active = btn.getAttribute("data-profile-specialty") === selectedSpecialty;
      btn.classList.toggle("profile-player-details__toggle-btn--active", active);
      btn.classList.toggle("profile-hero-specialty__btn--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (preferencesWrap) {
      preferencesWrap.hidden = !selectedSpecialty;
      preferencesWrap.classList.toggle("profile-hero-preferences--mtt", selectedSpecialty === "mtt");
      preferencesWrap.classList.toggle("profile-hero-preferences--cash", selectedSpecialty === "cash");
    }
    if (preferencesMtt) preferencesMtt.hidden = selectedSpecialty !== "mtt";
    if (preferencesCash) preferencesCash.hidden = selectedSpecialty !== "cash";
    setPreferenceState(selectedSpecialty);
    pokerProfileQueueHeroCityWidthSync();
  }
  function setPreferenceState(kind, values) {
    if (kind === "mtt" && values !== undefined) selectedMttPreferences = pokerProfileMttPreferences(values);
    if (kind === "cash" && values !== undefined) selectedCashPreferences = pokerProfileCashPreferences(values);
    preferenceBtns.forEach(function (btn) {
      var btnKind = btn.getAttribute("data-profile-preference-kind") || "";
      var val = btn.getAttribute("data-profile-preference") || "";
      var list = btnKind === "cash" ? selectedCashPreferences : selectedMttPreferences;
      var active = list.indexOf(val) !== -1;
      btn.classList.toggle("profile-hero-preferences__chip--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.disabled = !selectedSpecialty || btnKind !== selectedSpecialty;
    });
  }
  function mergeProfileUserInfo(updates) {
    try {
      if (typeof pokerProfileUserInfoCache === "object" && pokerProfileUserInfoCache) {
        Object.keys(updates).forEach(function (key) {
          pokerProfileUserInfoCache[key] = updates[key];
        });
        pokerProfileUserInfoCacheAt = Date.now();
        if (typeof window.pokerWriteCurrentProfileUserInfoCache === "function") {
          window.pokerWriteCurrentProfileUserInfoCache(pokerProfileUserInfoCache);
        }
      }
    } catch (eMergeProfileDetails) {}
    if (typeof refreshProfilePublicShowcase === "function") {
      refreshProfilePublicShowcase(pokerProfileUserInfoCache || updates);
    }
  }
  function loadPlayerDetails() {
    if (!canServer) return;
    var profileInfoPromise = typeof pokerApiHasCredential === "function" && pokerApiHasCredential()
      ? loadCurrentProfileUserInfo()
      : fetch(base + "/api/users" + pokerRafflesApiQueryLeading()).then(function (r) { return r.json(); });
    profileInfoPromise
      .then(function (data) {
        if (!data || !data.ok) return;
        setBirthDateState(data.profileBirthDate || data.birthDate || "");
        setPreferenceState("mtt", data.profileMttPreferences || data.mttPreferences || []);
        setPreferenceState("cash", data.profileCashPreferences || data.cashPreferences || []);
        setSpecialtyState(data.profileSpecialty || data.specialty || "");
        setCityState(data.profileCity || data.city || "");
      })
      .catch(function () {});
  }
  function postPlayerDetails(body, opts) {
    opts = opts || {};
    if (!base || !canServer) {
      showDetailsFeedback("Войдите в аккаунт или откройте в Telegram, чтобы сохранить.", 3500);
      return Promise.resolve(null);
    }
    if (opts.buttons) {
      opts.buttons.forEach(function (btn) {
        if (btn) btn.disabled = true;
      });
    }
    return fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody(body)),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.status === 401 ? "Откройте в Telegram" : "Ошибка " + r.status };
        });
      })
      .then(function (data) {
        if (data && data.ok) {
          if (opts.feedback === "specialty") showSpecialtyFeedback("Сохранено");
          else if (opts.feedback === "city") showCityFeedback("Сохранено");
          else showDetailsFeedback("Сохранено");
          return data;
        }
        if (opts.feedback === "specialty") showSpecialtyFeedback((data && data.error) || "Ошибка", 3500);
        else if (opts.feedback === "city") showCityFeedback((data && data.error) || "Ошибка", 3500);
        else showDetailsFeedback((data && data.error) || "Ошибка", 3500);
        return data || null;
      })
      .catch(function () {
        if (opts.feedback === "specialty") showSpecialtyFeedback(POKER_NET_ERR, 3500);
        else if (opts.feedback === "city") showCityFeedback(POKER_NET_ERR, 3500);
        else showDetailsFeedback(POKER_NET_ERR, 3500);
        return null;
      })
      .finally(function () {
        if (opts.buttons) {
          opts.buttons.forEach(function (btn) {
            if (btn) btn.disabled = false;
          });
        }
      });
  }
  if (birthSave) {
    birthSave.addEventListener("click", function () {
      var val = birthInput ? String(birthInput.value || "").trim() : "";
      if (!val) {
        showDetailsFeedback("Укажите дату рождения.", 2500);
        return;
      }
      var birthYearMatch = val.match(/^(\d{4})-\d{2}-\d{2}$/);
      var birthYear = birthYearMatch ? Number(birthYearMatch[1]) : 0;
      if (birthYear < 1965 || birthYear > 2010) {
        showDetailsFeedback("Год рождения должен быть от 1965 до 2010.", 3500);
        return;
      }
      postPlayerDetails({ birthDate: val }, { buttons: [birthSave] }).then(function (data) {
        if (data && data.ok) {
          setBirthDateState(val);
          mergeProfileUserInfo({ profileBirthDate: val });
        }
      });
    });
  }
  if (citySave) {
    citySave.addEventListener("click", function () {
      var rawCity = pokerProfileNormalizeCity(cityInput ? cityInput.value : "");
      citySave.disabled = true;
      pokerProfileResolveRealCity(rawCity)
        .then(function (city) {
          if (rawCity && !city) {
            if (cityInput) cityInput.setCustomValidity("Введите корректное название города");
            showCityFeedback("Введите корректное название города.", 3500);
            return null;
          }
          if (cityInput) {
            cityInput.setCustomValidity("");
            cityInput.value = city;
          }
          return postPlayerDetails({ profileCity: city }, { buttons: [citySave], feedback: "city" }).then(function (data) {
            if (data && data.ok) {
              setCityState(city);
              mergeProfileUserInfo({ profileCity: city });
            }
            return data;
          });
        })
        .catch(function () {
          showCityFeedback("Не удалось проверить город. Попробуйте ещё раз.", 3500);
        })
        .finally(function () {
          citySave.disabled = false;
        });
    });
  }
  specialtyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-profile-specialty") || "";
      setSpecialtyState(next);
      var body = { specialty: next };
      if (next === "mtt") body.cashPreferences = [];
      if (next === "cash") body.mttPreferences = [];
      postPlayerDetails(body, { buttons: Array.prototype.slice.call(specialtyBtns), feedback: "specialty" }).then(function (data) {
        if (data && data.ok) {
          var updates = { profileSpecialty: next };
          if (next === "mtt") {
            selectedCashPreferences = [];
            updates.profileCashPreferences = [];
            setPreferenceState("cash", []);
          }
          if (next === "cash") {
            selectedMttPreferences = [];
            updates.profileMttPreferences = [];
            setPreferenceState("mtt", []);
          }
          mergeProfileUserInfo(updates);
        }
        else loadPlayerDetails();
      });
    });
  });
  preferenceBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.getAttribute("data-profile-preference-kind") || "";
      var value = btn.getAttribute("data-profile-preference") || "";
      if (!selectedSpecialty || kind !== selectedSpecialty || !value) return;
      var list = kind === "cash" ? selectedCashPreferences.slice() : selectedMttPreferences.slice();
      var idx = list.indexOf(value);
      if (idx !== -1) {
        list.splice(idx, 1);
      } else {
        if (kind === "cash" && list.length >= 2) {
          showPreferenceFeedback("Можно выбрать максимум 2 лимита кеша", 2500);
          return;
        }
        list.push(value);
      }
      if (kind === "cash") selectedCashPreferences = pokerProfileCashPreferences(list);
      else selectedMttPreferences = pokerProfileMttPreferences(list);
      setPreferenceState(kind);
      var body = kind === "cash"
        ? { specialty: "cash", cashPreferences: selectedCashPreferences }
        : { specialty: "mtt", mttPreferences: selectedMttPreferences };
      postPlayerDetails(body, { buttons: Array.prototype.slice.call(preferenceBtns), feedback: "specialty" }).then(function (data) {
        if (data && data.ok) {
          mergeProfileUserInfo(kind === "cash"
            ? { profileSpecialty: "cash", profileCashPreferences: selectedCashPreferences.slice() }
            : { profileSpecialty: "mtt", profileMttPreferences: selectedMttPreferences.slice() });
        }
        else loadPlayerDetails();
      });
    });
  });
  loadPlayerDetails();
}

function syncProfileStatusVisual() {
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  if (!input || !visual) return;
  var val = Math.min(100, Math.max(0, parseInt(input.value, 10) || 0));
  visual.style.setProperty("--status-value", String(val));
}

function pokerProfileRakeNumber(value) {
  var raw = value != null ? String(value).trim() : "";
  if (!raw) return 0;
  var normalized = raw.replace(/\s+/g, "").replace(",", ".");
  var n = Number(normalized);
  return isFinite(n) && n > 0 ? n : 0;
}

var POKER_PROFILE_MAX_STATUS_LEVEL = 100;
var POKER_PROFILE_LEVEL_BANDS = [
  { until: 10, step: 3000 },
  { until: 25, step: 7000 },
  { until: 40, step: 15000 },
  { until: 60, step: 30000 },
  { until: 80, step: 60000 },
  { until: 100, step: 100000 },
];

function pokerProfilePickCounterNumber(total, keys) {
  var src = total && typeof total === "object" ? total : {};
  for (var i = 0; i < keys.length; i++) {
    var value = src[keys[i]];
    if (value != null && value !== "" && isFinite(Number(value))) return pokerProfileRakeNumber(value);
  }
  return 0;
}

function pokerProfileTotalCounterFromProfile(profile) {
  var p = profile && typeof profile === "object" ? profile : {};
  if (p.totalCounter && typeof p.totalCounter === "object") return p.totalCounter;
  if (p.total_counter && typeof p.total_counter === "object") return p.total_counter;
  return p;
}

function pokerProfileStatusFromPoints(value) {
  var points = pokerProfileRakeNumber(value);
  var level = 1;
  var levelStart = 0;
  for (var b = 0; b < POKER_PROFILE_LEVEL_BANDS.length; b++) {
    var band = POKER_PROFILE_LEVEL_BANDS[b];
    while (level < band.until) {
      var nextStartCandidate = levelStart + band.step;
      if (points < nextStartCandidate) {
        return {
          points: points,
          level: level,
          nextLevel: Math.min(POKER_PROFILE_MAX_STATUS_LEVEL, level + 1),
          levelStart: levelStart,
          nextStart: nextStartCandidate,
          valuePercent: Math.floor(Math.min(99, Math.max(0, ((points - levelStart) / Math.max(1, band.step)) * 100))),
        };
      }
      levelStart = nextStartCandidate;
      level++;
    }
  }
  return {
    points: points,
    level: POKER_PROFILE_MAX_STATUS_LEVEL,
    nextLevel: POKER_PROFILE_MAX_STATUS_LEVEL,
    levelStart: levelStart,
    nextStart: levelStart,
    valuePercent: 100,
  };
}

function pokerProfileStatusFromRake(value) {
  return pokerProfileStatusFromPoints(value);
}

function pokerProfileStatusFromProfile(profile, linked) {
  var total = pokerProfileTotalCounterFromProfile(profile);
  var fee = pokerProfilePickCounterNumber(total, ["fee"]);
  var mttCountRaw = pokerProfilePickCounterNumber(total, ["mttCount", "mtt_count"]);
  var mttItm = pokerProfilePickCounterNumber(total, ["mttItmCount", "mtt_itm_count"]);
  var mttFirst = pokerProfilePickCounterNumber(total, ["mttFirstCount", "mtt_1st_count", "mtt_first_count", "mttFirstPlaceCount", "mtt_first_place_count"]);
  var sngCountRaw = pokerProfilePickCounterNumber(total, ["sngCount", "sng_count"]);
  var sngItm = pokerProfilePickCounterNumber(total, ["sngItmCount", "sng_itm_count"]);
  var sngFirst = pokerProfilePickCounterNumber(total, ["sngFirstCount", "sng_1st_count", "sng_first_count", "sngFirstPlaceCount", "sng_first_place_count"]);
  var mttCount = Math.max(mttCountRaw, mttItm, mttFirst);
  var sngCount = Math.max(sngCountRaw, sngItm, sngFirst);
  var points =
    fee +
    mttCount * 300 +
    Math.max(0, mttItm - mttFirst) * 700 +
    mttFirst * 3000 +
    sngCount * 60 +
    Math.max(0, sngItm - sngFirst) * 140 +
    sngFirst * 400 +
    (linked === false ? 0 : 500);
  return pokerProfileStatusFromPoints(points);
}

function pokerProfileStatusCardLabel(level) {
  var n = parseInt(level, 10);
  if (!isFinite(n)) n = 1;
  n = Math.min(POKER_PROFILE_MAX_STATUS_LEVEL, Math.max(0, n));
  return String(n).replace(/[^\d]/g, "");
}

function pokerProfileFormatRake(value) {
  var n = Math.max(0, Math.floor(Number(value) || 0));
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var POKER_PROFILE_STATUS_FISH_ASSETS = [
  "./assets/profile-status-fish-level-01.png",
  "./assets/profile-status-fish-level-02.png",
  "./assets/profile-status-fish-level-03.png",
  "./assets/profile-status-fish-level-04.png",
  "./assets/profile-status-fish-level-05.png",
  "./assets/profile-status-fish-level-06.png",
  "./assets/profile-status-fish-level-07.png",
  "./assets/profile-status-fish-level-08.png",
  "./assets/profile-status-fish-level-09.png",
  "./assets/profile-status-fish-level-10.png",
  "./assets/profile-status-fish-level-11.png",
  "./assets/profile-status-fish-level-12.png",
  "./assets/profile-status-fish-level-13.png",
  "./assets/profile-status-fish-level-14.png",
  "./assets/profile-status-fish-level-15.png",
  "./assets/profile-status-fish-level-16.png",
  "./assets/profile-status-fish-level-17.png",
  "./assets/profile-status-fish-level-18.png",
  "./assets/profile-status-fish-level-19.png",
  "./assets/profile-status-fish-level-20.png",
  "./assets/profile-status-fish-level-21.png",
  "./assets/profile-status-fish-level-22.png",
  "./assets/profile-status-fish-level-23.png",
  "./assets/profile-status-fish-level-24.png",
  "./assets/profile-status-fish-level-25.png",
  "./assets/profile-status-fish-level-26.png",
  "./assets/profile-status-fish-level-27.png",
  "./assets/profile-status-fish-level-28.png",
  "./assets/profile-status-fish-level-29.png",
  "./assets/profile-status-fish-level-30.png",
  "./assets/profile-status-fish-level-31.png",
  "./assets/profile-status-fish-level-32.png",
  "./assets/profile-status-fish-level-33.png",
  "./assets/profile-status-fish-level-34.png",
  "./assets/profile-status-fish-level-35.png",
  "./assets/profile-status-fish-level-36.png",
  "./assets/profile-status-fish-level-37.png",
  "./assets/profile-status-fish-level-38.png",
  "./assets/profile-status-fish-level-39.png",
  "./assets/profile-status-fish-level-40.png",
  "./assets/profile-status-fish-level-41.png",
  "./assets/profile-status-fish-level-42.png",
  "./assets/profile-status-fish-level-43.png",
  "./assets/profile-status-fish-level-44.png",
  "./assets/profile-status-fish-level-45.png",
  "./assets/profile-status-fish-level-46.png",
  "./assets/profile-status-fish-level-47.png",
  "./assets/profile-status-fish-level-48.png",
  "./assets/profile-status-fish-level-49.png",
  "./assets/profile-status-fish-level-50.png",
  "./assets/profile-status-fish-level-51.png",
  "./assets/profile-status-fish-level-52.png",
  "./assets/profile-status-fish-level-53.png",
  "./assets/profile-status-fish-level-54.png",
  "./assets/profile-status-fish-level-55.png",
];

var POKER_PROFILE_CURRENT_STATUS_LEVEL = 0;

function pokerProfileStatusFishLevel(level) {
  var n = parseInt(level, 10);
  if (!isFinite(n)) n = 0;
  if (n < 0) n = 0;
  return Math.min(POKER_PROFILE_MAX_STATUS_LEVEL, n);
}

function pokerProfileStatusFishSrc(level) {
  var assetLevel = Math.max(1, pokerProfileStatusFishLevel(level));
  return POKER_PROFILE_STATUS_FISH_ASSETS[assetLevel - 1];
}

function pokerProfileStatusFishIconHtml(level, extraClass) {
  return "";
}

function pokerProfileApplyStatusFish(fish, level) {
  if (!fish) return;
  fish.hidden = true;
  fish.setAttribute("aria-hidden", "true");
}

function pokerProfileRenderFishCollection() {
  var grid = document.getElementById("profileFishCollectionGrid");
  if (!grid) return;
  var currentLevel = pokerProfileStatusFishLevel(POKER_PROFILE_CURRENT_STATUS_LEVEL);
  grid.innerHTML = POKER_PROFILE_STATUS_FISH_ASSETS.map(function (src, index) {
    var level = index + 1;
    var unlocked = level <= currentLevel;
    var classes =
      "profile-fish-collection__item" +
      (unlocked ? " profile-fish-collection__item--unlocked" : " profile-fish-collection__item--locked") +
      (level === currentLevel ? " profile-fish-collection__item--current" : "");
    return (
      '<div class="' +
      classes +
      '" role="listitem" aria-label="Уровень ' +
      profileEscapeHtml(String(level)) +
      (unlocked ? " открыт" : " закрыт") +
      '">' +
      '<span class="profile-fish-collection__level">' +
      profileEscapeHtml(String(level)) +
      "</span>" +
      '<img class="profile-fish-collection__img" src="' +
      profileEscapeHtml(src) +
      '" alt="" aria-hidden="true" loading="lazy" decoding="async" />' +
      "</div>"
    );
  }).join("");
}

function closeProfileFishCollectionModal() {
  var modal = document.getElementById("profileFishCollectionModal");
  if (!modal) return;
  modal.classList.remove("profile-fish-collection-modal--open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("profile-fish-collection-open");
}

function openProfileFishCollectionModal() {
  var modal = document.getElementById("profileFishCollectionModal");
  if (!modal) modal = createProfileFishCollectionModal();
  pokerProfileRenderFishCollection();
  modal.classList.add("profile-fish-collection-modal--open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("profile-fish-collection-open");
  var closeBtn = document.getElementById("profileFishCollectionClose");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

function createProfileFishCollectionModal() {
  var modal = document.createElement("div");
  modal.className = "profile-fish-collection-modal";
  modal.id = "profileFishCollectionModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML =
    '<div class="profile-fish-collection-modal__backdrop" data-profile-fish-collection-close></div>' +
    '<section class="profile-fish-collection-modal__panel" role="dialog" aria-modal="true" aria-labelledby="profileFishCollectionTitle">' +
    '<header class="profile-fish-collection-modal__header">' +
    '<h3 class="profile-fish-collection-modal__title" id="profileFishCollectionTitle">Рыбки статуса</h3>' +
    '<button type="button" class="profile-fish-collection-modal__close" id="profileFishCollectionClose" aria-label="Закрыть">×</button>' +
    "</header>" +
    '<div class="profile-fish-collection__grid" id="profileFishCollectionGrid" role="list"></div>' +
    "</section>";
  document.body.appendChild(modal);
  modal.addEventListener("click", function (e) {
    if (e.target && e.target.closest("[data-profile-fish-collection-close]")) {
      closeProfileFishCollectionModal();
    }
  });
  var closeBtn = modal.querySelector("#profileFishCollectionClose");
  if (closeBtn) closeBtn.addEventListener("click", closeProfileFishCollectionModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("profile-fish-collection-modal--open")) {
      closeProfileFishCollectionModal();
    }
  });
  return modal;
}

function initProfileFishCollectionModal() {
  var fish = document.querySelector("#profileStatusVisual .profile-status__fish");
  if (!fish || fish.getAttribute("data-fish-collection-bound") === "1") return;
  fish.setAttribute("data-fish-collection-bound", "1");
  fish.addEventListener("click", function (e) {
    e.preventDefault();
    openProfileFishCollectionModal();
  });
  fish.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProfileFishCollectionModal();
    }
  });
}

function closeProfilePointsInfoModal() {
  var modal = document.getElementById("profilePointsInfoModal");
  if (!modal) return;
  modal.classList.remove("profile-points-info-modal--open");
  modal.setAttribute("aria-hidden", "true");
}

function ensureProfilePointsInfoModal() {
  var modal = document.getElementById("profilePointsInfoModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "profile-points-info-modal";
  modal.id = "profilePointsInfoModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML =
    '<div class="profile-points-info-modal__backdrop" data-profile-points-info-close></div>' +
    '<section class="profile-points-info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="profilePointsInfoTitle">' +
      '<header class="profile-points-info-modal__header">' +
        '<h3 class="profile-points-info-modal__title" id="profilePointsInfoTitle">За что дают очки</h3>' +
        '<button type="button" class="profile-points-info-modal__close" aria-label="Закрыть" data-profile-points-info-close>×</button>' +
      "</header>" +
      '<div class="profile-points-info-modal__body">' +
        '<p class="profile-points-info-modal__lead">Уровень считается за всё время по привязанному профилю Poker21.</p>' +
        '<ul class="profile-points-info-modal__list">' +
          "<li><strong>Кеш:</strong> 1 очко за 1 ₽ рейка.</li>" +
          "<li><strong>MTT:</strong> 300 очков за участие.</li>" +
          "<li><strong>MTT ITM:</strong> 700 очков, если попал в призы.</li>" +
          "<li><strong>Победа в MTT:</strong> 3000 очков вместо ITM-бонуса.</li>" +
          "<li><strong>SNG:</strong> 60 очков за участие.</li>" +
          "<li><strong>SNG ITM:</strong> 140 очков, если попал в призы.</li>" +
          "<li><strong>Победа в SNG:</strong> 400 очков вместо ITM-бонуса.</li>" +
          "<li><strong>Привязка Poker21:</strong> 500 очков.</li>" +
        "</ul>" +
        '<h4 class="profile-points-info-modal__subtitle">Сколько очков нужно на уровень</h4>' +
        '<ul class="profile-points-info-modal__level-list">' +
          "<li><strong>1-10:</strong> +3 000 очков за уровень.</li>" +
          "<li><strong>10-25:</strong> +7 000 очков за уровень.</li>" +
          "<li><strong>25-40:</strong> +15 000 очков за уровень.</li>" +
          "<li><strong>40-60:</strong> +30 000 очков за уровень.</li>" +
          "<li><strong>60-80:</strong> +60 000 очков за уровень.</li>" +
          "<li><strong>80-100:</strong> +100 000 очков за уровень.</li>" +
        "</ul>" +
        '<p class="profile-points-info-modal__note">Участие считается всегда. Если есть победа, бонус ITM за эту игру отдельно не складывается.</p>' +
      "</div>" +
    "</section>";
  document.body.appendChild(modal);
  modal.addEventListener("click", function (e) {
    if (e.target && e.target.closest("[data-profile-points-info-close]")) {
      closeProfilePointsInfoModal();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("profile-points-info-modal--open")) {
      closeProfilePointsInfoModal();
    }
  });
  return modal;
}

function openProfilePointsInfoModal() {
  var modal = ensureProfilePointsInfoModal();
  modal.classList.add("profile-points-info-modal--open");
  modal.setAttribute("aria-hidden", "false");
}

function initProfilePointsInfoButton() {
  var btn = document.getElementById("profileStatusPointsInfoBtn");
  if (!btn || btn.getAttribute("data-profile-points-info-bound") === "1") return;
  btn.setAttribute("data-profile-points-info-bound", "1");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openProfilePointsInfoModal();
  });
}

function setProfileStatus(value) {
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  if (!input || !visual) return;
  var val = Math.min(100, Math.max(0, parseInt(value, 10) || 0));
  input.value = val;
  visual.style.setProperty("--status-value", String(val));
}

function setProfileStatusUnlinked() {
  var section = document.getElementById("profileStatusSection");
  var title = document.getElementById("profileStatusTitle");
  var progressText = document.getElementById("profileStatusProgressText");
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  var fish = visual ? visual.querySelector(".profile-status__fish") : null;
  var cards = document.querySelectorAll("#profileStatusSection .profile-status__card");
  if (!input || !visual) return;
  POKER_PROFILE_CURRENT_STATUS_LEVEL = 0;
  if (section && section.classList) section.classList.add("profile-status--unlinked");
  input.value = 0;
  visual.style.setProperty("--status-value", "0");
  if (title) {
    title.hidden = false;
    title.textContent = "Привяжите аккаунт";
  }
  if (progressText) {
    progressText.hidden = false;
    progressText.textContent = "Привяжите аккаунт Poker21, чтобы уровень начал обновляться.";
  }
  if (cards[0]) cards[0].textContent = "Привяжите";
  if (cards[1]) cards[1].textContent = "аккаунт";
  if (fish) {
    pokerProfileApplyStatusFish(fish, 0);
    fish.setAttribute("aria-label", "Привяжите аккаунт Poker21, чтобы уровень начал обновляться.");
    fish.removeAttribute("title");
    fish.removeAttribute("data-status-tip");
  }
  profilePublicShowcaseApplyStatus(null);
}

function setProfileStatusFromRake(value) {
  var section = document.getElementById("profileStatusSection");
  var title = document.getElementById("profileStatusTitle");
  var progressText = document.getElementById("profileStatusProgressText");
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  var fish = visual ? visual.querySelector(".profile-status__fish") : null;
  var cards = document.querySelectorAll("#profileStatusSection .profile-status__card");
  if (!input || !visual) return;
  var status = pokerProfileStatusFromRake(value);
  POKER_PROFILE_CURRENT_STATUS_LEVEL = status.level;
  if (section && section.classList) section.classList.remove("profile-status--unlinked");
  input.value = status.valuePercent;
  visual.style.setProperty("--status-value", String(status.valuePercent));
  if (title) {
    title.hidden = false;
    title.textContent = "Ваш уровень " + status.level + " из " + POKER_PROFILE_MAX_STATUS_LEVEL;
  }
  if (progressText) progressText.hidden = false;
  if (cards[0]) cards[0].textContent = pokerProfileStatusCardLabel(status.level);
  if (cards[1]) cards[1].textContent = pokerProfileStatusCardLabel(status.nextLevel);
  if (fish) {
    pokerProfileApplyStatusFish(fish, status.level);
    var currentLevelRake = Math.max(0, status.points - status.levelStart);
    var neededRake = Math.max(0, status.nextStart - status.levelStart);
    var leftRake = Math.max(0, status.nextStart - status.points);
    var tip =
      status.level >= POKER_PROFILE_MAX_STATUS_LEVEL
        ? "Максимальный уровень. Набито " + pokerProfileFormatRake(status.points) + " очков"
        : "До уровня " +
          status.nextLevel +
          ": набито " +
          pokerProfileFormatRake(currentLevelRake) +
          " из " +
          pokerProfileFormatRake(neededRake) +
          " очков. Осталось " +
          pokerProfileFormatRake(leftRake) +
          " очков";
    if (progressText) progressText.textContent = tip;
    fish.setAttribute("aria-label", tip);
    fish.removeAttribute("title");
    fish.removeAttribute("data-status-tip");
  }
  profilePublicShowcaseApplyStatus(status);
}

function setProfileStatusFromProfile(profile, linked) {
  var status = pokerProfileStatusFromProfile(profile, linked);
  setProfileStatusFromRake(status.points);
}

function loadProfileRespect() {
  var el = document.getElementById("profileRespectValue");
  if (!el) return;
  var cachedScore = pokerReadProfileStorage(POKER_PROFILE_RESPECT_CACHE_KEY);
  if (cachedScore !== "") el.textContent = cachedScore;
  var base = getApiBase();
  if (!base) {
    if (cachedScore === "") el.textContent = "\u2014";
    return;
  }
  if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
    if (cachedScore === "") el.textContent = "\u2014";
    return;
  }
  var q = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  if (!q || q === "?initData=") {
    if (cachedScore === "") el.textContent = "\u2014";
    return;
  }
  fetch(base + "/api/respect" + q)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok && data.score !== undefined && data.score !== null) {
        var scoreText = String(data.score);
        el.textContent = scoreText;
        pokerWriteProfileStorage(POKER_PROFILE_RESPECT_CACHE_KEY, scoreText);
        refreshProfilePublicShowcase();
      } else {
        if (cachedScore === "") el.textContent = "\u2014";
        refreshProfilePublicShowcase();
      }
    })
    .catch(function () {
      if (cachedScore === "") el.textContent = "\u2014";
      refreshProfilePublicShowcase();
    });
}

function initProfileRespectVotersButton() {
  var btn = document.getElementById("profileRespectOpenVotersBtn");
  if (!btn || btn.getAttribute("data-respect-voters-bound") === "1") return;
  btn.setAttribute("data-respect-voters-bound", "1");
  btn.addEventListener("click", function () {
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    var myId =
      typeof window.pokerResolveMyChatMemberId === "function" ? window.pokerResolveMyChatMemberId() : null;
    if (!myId) {
      if (tg && tg.showAlert) tg.showAlert("Не удалось определить аккаунт.");
      else if (typeof alert === "function") alert("Не удалось определить аккаунт.");
      return;
    }
    if (typeof window.pokerOpenRespectVotersModal === "function") {
      window.pokerOpenRespectVotersModal(myId, { hideVoteButtons: true });
    }
  });
}
