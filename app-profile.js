function getProfileGreetingName() {
  var preferredName = "";
  try {
    preferredName = typeof pokerPreferredProfileDisplayName === "function" ? pokerPreferredProfileDisplayName() : "";
  } catch (ePreferredName) {}
  if (preferredName) return preferredName;

  var chatDisplayName = "";
  try {
    chatDisplayName = String(window.__pokerChatDisplayName || "").trim();
  } catch (eChatDisplay) {}
  if (chatDisplayName) return chatDisplayName;

  var tgUsername = "";
  try {
    var auth = window.__pokerTelegramAuth;
    tgUsername =
      auth && auth.user && auth.user.username != null ? String(auth.user.username).trim().replace(/^@+/, "") : "";
  } catch (eAuthUsername) {}
  if (!tgUsername) {
    try {
      var resolvedUser = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      tgUsername = resolvedUser && resolvedUser.username != null ? String(resolvedUser.username).trim().replace(/^@+/, "") : "";
    } catch (eResolvedUsername) {}
  }
  if (tgUsername) return "@" + tgUsername;

  var authMethod = "";
  try {
    authMethod = String(pokerGetAuthMethod() || "").trim().toLowerCase();
  } catch (eAuthMethod) {}
  if (authMethod === "email") return "NoName";

  var linkedEmail = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (eLinkedEmail) {}
  if (linkedEmail) return "NoName";

  return "NoName";
}

function updateProfileUserName() {
  var el = document.getElementById("profileUserName");
  if (!el) return;
  var textEl = document.getElementById("profileUserNameText") || el;
  var name = getProfileGreetingName();
  var isEmptyName = !name || String(name).trim() === "NoName";
  textEl.textContent = isEmptyName ? "Добавьте имя" : name;
  el.classList.toggle("profile-hero-card__name--empty", isEmptyName);
  updateProfileUserMeta();
  pokerScheduleProfileHeroTextFit();
}

function pokerFitProfileTextOneLine(el, cssVarName, maxPx, minPx) {
  if (!el) return;
  var parent = el.parentElement || el;
  var available = Math.floor(el.clientWidth || parent.clientWidth || 0);
  if (!available) return;
  el.style.setProperty(cssVarName, maxPx + "px");
  var size = maxPx;
  while (size > minPx && el.scrollWidth > available + 1) {
    size -= 1;
    el.style.setProperty(cssVarName, size + "px");
  }
}

function pokerFitProfileHeroText() {
  var nameEl = document.getElementById("profileUserName");
  var nameTextEl = document.getElementById("profileUserNameText");
  var idEl = document.getElementById("profileUserId");
  var idRow = idEl && idEl.closest ? idEl.closest(".profile-hero-card__id") : null;
  var vw = Math.max(320, Math.min(window.innerWidth || 390, 900));
  var nameMax = Math.max(18, Math.min(42, Math.round(vw * 0.072)));
  if (nameEl && nameEl.classList.contains("profile-hero-card__name--empty")) {
    nameMax = Math.max(18, Math.min(30, Math.round(vw * 0.064)));
  }
  var idMax = vw <= 430 ? 16 : 15;
  pokerFitProfileTextOneLine(nameTextEl || nameEl, "--profile-name-font-size", nameMax, 10);
  if (idRow && !idRow.hidden) pokerFitProfileTextOneLine(idRow, "--profile-id-font-size", idMax, 10);
}

function pokerScheduleProfileHeroTextFit() {
  var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
  raf(function () {
    pokerFitProfileHeroText();
    raf(pokerFitProfileHeroText);
  });
}

if (!window.__pokerProfileHeroTextFitBound) {
  window.__pokerProfileHeroTextFitBound = true;
  window.addEventListener("resize", pokerScheduleProfileHeroTextFit, { passive: true });
  try {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(pokerScheduleProfileHeroTextFit).catch(function () {});
    }
  } catch (eProfileFontsFit) {}
}

function closeProfileNameEditor() {
  var editor = document.getElementById("profileChatNameEditor");
  if (editor) editor.hidden = true;
}

function openProfileNameEditor() {
  var editor = document.getElementById("profileChatNameEditor");
  var input = document.getElementById("profileChatDisplayNameInput");
  if (!editor || !input) return;
  editor.hidden = false;
  try {
    input.value = pokerPreferredProfileDisplayName() || "";
  } catch (eNamePrefill) {}
  requestAnimationFrame(function () {
    try {
      input.focus({ preventScroll: true });
      input.select();
    } catch (eNameFocus) {}
  });
}

function initProfileNameEditor() {
  var btn = document.getElementById("profileNameEditBtn");
  var input = document.getElementById("profileChatDisplayNameInput");
  if (!btn || !input || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", function () {
    var editor = document.getElementById("profileChatNameEditor");
    if (editor && !editor.hidden) closeProfileNameEditor();
    else openProfileNameEditor();
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeProfileNameEditor();
    } else if (e.key === "Enter") {
      e.preventDefault();
      var saveBtn = document.getElementById("profileSaveBtn");
      if (saveBtn) saveBtn.click();
    }
  });
}

function updateProfileUserMeta() {
  var metaEl = document.getElementById("profileUserMeta");
  if (!metaEl) return;
  var parts = [];
  var dtId = (typeof sessionStorage !== "undefined" && sessionStorage.getItem("poker_dt_id")) || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) || "";
  if (dtId && !document.getElementById("profileUserId")) parts.push("ID: " + dtId);
  var user = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
  var username = user && user.username ? user.username : "";
  if (username && !pokerHideRomanTelegramUsername(username)) parts.push("@" + String(username).replace(/^@+/, ""));
  var linkedEmail = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (eEmailMeta) {}
  if (linkedEmail) parts.push(linkedEmail);
  if (parts.length) metaEl.textContent = " (" + parts.join(", ") + ")";
  else metaEl.textContent = "";
}

function updateProfileHeroPokerPlusId(value) {
  var el = document.getElementById("profileUserId");
  var row = el && el.closest ? el.closest(".profile-hero-card__id") : null;
  if (!el || !row) return;
  var text = "";
  try {
    text = typeof pokerPlusText === "function" ? pokerPlusText(value) : String(value || "").trim();
  } catch (eText) {
    text = String(value || "").trim();
  }
  el.textContent = text || "\u2014";
  row.hidden = !text;
  pokerScheduleProfileHeroTextFit();
}

function loadProfileDebugInfo() {
  return;
}

var pokerProfileUserInfoCache = null;
var pokerProfileUserInfoPromise = null;
var pokerProfileUserInfoCacheAt = 0;
var POKER_PROFILE_USER_INFO_CACHE_MS = 15000;
var POKER_PROFILE_LINKED_EMAIL_CACHE_KEY = "poker_profile_linked_email";
var POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY = "poker_profile_telegram_username";
var POKER_PROFILE_RESPECT_CACHE_KEY = "poker_profile_respect_score";
function pokerReadProfileStorage(key) {
  try {
    return (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) ||
      (typeof localStorage !== "undefined" && localStorage.getItem(key)) ||
      "";
  } catch (e) {
    return "";
  }
}
function pokerWriteProfileStorage(key, value) {
  var text = value != null ? String(value).trim() : "";
  try {
    if (typeof sessionStorage !== "undefined") {
      if (text) sessionStorage.setItem(key, text);
      else sessionStorage.removeItem(key);
    }
  } catch (eSession) {}
  try {
    if (typeof localStorage !== "undefined") {
      if (text) localStorage.setItem(key, text);
      else localStorage.removeItem(key);
    }
  } catch (eLocal) {}
}
function pokerApplyProfileUserInfo(data) {
  if (!data || !data.ok) return;
  try {
    if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
      pokerSetHomeAuthResolved(true);
    }
  } catch (eHomeAuth) {}
  try {
    var linkedEmail = data.email != null ? String(data.email).trim() : "";
    window.__pokerProfileLinkedEmail = linkedEmail;
    pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, linkedEmail);
  } catch (eEmail) {}
  try {
    var tgUsername = data.telegramUsername != null ? String(data.telegramUsername).trim().replace(/^@+/, "") : "";
    window.__pokerProfileTelegramUsername = tgUsername;
    pokerWriteProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY, tgUsername);
  } catch (eTgProfile) {}
  try {
    if (data.pokerPlusStatsVisible != null && typeof window.pokerApplyPokerPlusStatsVisible === "function") {
      window.pokerApplyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    }
  } catch (ePpStatsVisible) {}
}
function loadCurrentProfileUserInfo() {
  var now = Date.now();
  if (pokerProfileUserInfoCache && now - pokerProfileUserInfoCacheAt < POKER_PROFILE_USER_INFO_CACHE_MS) {
    return Promise.resolve(pokerProfileUserInfoCache);
  }
  if (pokerProfileUserInfoPromise) return pokerProfileUserInfoPromise;
  var base = getApiBase();
  var authQ = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  if (!base || !authQ || authQ === "?initData=") return Promise.resolve(null);
  var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
  var authQWithHint = authQ;
  if (cached && authQWithHint) authQWithHint += "&dtIdHint=" + encodeURIComponent(cached);
  pokerProfileUserInfoPromise = fetch(base + "/api/users" + authQWithHint)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      pokerProfileUserInfoCache = data || null;
      pokerProfileUserInfoCacheAt = Date.now();
      pokerApplyProfileUserInfo(pokerProfileUserInfoCache);
      return pokerProfileUserInfoCache;
    })
    .catch(function () {
      return null;
    })
    .finally(function () {
      pokerProfileUserInfoPromise = null;
    });
  return pokerProfileUserInfoPromise;
}

function updateProfileDtId() {
  var el = document.getElementById("profileUserId");
  if (el) updateProfileHeroPokerPlusId(typeof window !== "undefined" ? window.__pokerPlusUserId : "");
  var base = getApiBase();
  var authQ = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
  var authQWithHint = authQ;
  if (cached && authQWithHint && authQWithHint !== "?initData=") {
    authQWithHint += "&dtIdHint=" + encodeURIComponent(cached);
  }
  if (cached) {
    if (!base || !authQ || authQ === "?initData=") return;
  }
  if (!base || !authQ || authQ === "?initData=") {
    return;
  }
  loadCurrentProfileUserInfo()
    .then(function (data) {
      if (data && data.ok && data.dtId) {
        sessionStorage.setItem("poker_dt_id", data.dtId);
        if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
        try {
          if (typeof window.pokerResolveMyChatMemberId === "function") {
            pokerRememberLastMemberId(window.pokerResolveMyChatMemberId());
          }
        } catch (eRememberMid) {}
        if (typeof updateProfileUserMeta === "function") updateProfileUserMeta();
      }
      if (data && data.ok) {
        pokerApplyProfileUserInfo(data);
        if (data.p21Id) updateProfileHeroPokerPlusId(data.p21Id);
        if (typeof syncProfileEmailAuthUi === "function") syncProfileEmailAuthUi();
        if (typeof updateProfileUserMeta === "function") updateProfileUserMeta();
      }
      if (data && data.ok && data.personalInfo != null) {
        var personalInput = document.getElementById("profilePersonalInput");
        if (personalInput) personalInput.value = data.personalInfo;
      }
      if (data && data.ok) {
        try {
          var cdn = data.chatDisplayName != null && String(data.chatDisplayName).trim() ? String(data.chatDisplayName).trim() : "";
          window.__pokerChatDisplayName = cdn;
          pokerWriteStoredProfileDisplayName(cdn);
          var cdnEl = document.getElementById("profileChatDisplayNameInput");
          if (cdnEl) cdnEl.value = cdn;
          if (typeof updateProfileUserName === "function") updateProfileUserName();
          if (typeof updateHeaderGreeting === "function") updateHeaderGreeting();
        } catch (eCdn2) {}
      }
      try {
        if (typeof updateHeaderGreeting === "function") updateHeaderGreeting();
      } catch (eHdrAfterUsers) {}
    })
    .catch(function () {
      updateProfileHeroPokerPlusId(typeof window !== "undefined" ? window.__pokerPlusUserId : "");
    });
  loadProfileDebugInfo();
}

function updateProfileExitBtnVisibility() {
  var btn = document.getElementById("profileExitBtn");
  if (!btn) return;
  var isGuest = false;
  var isVerified = false;
  var isLoading = false;
  try {
    var a = window.__pokerTelegramAuth;
    isGuest = !!(a && a.status === "guest");
    isVerified = !!(a && (a.status === "verified" || a.status === "dev_skip"));
    isLoading = !a || a.status === "unknown" || a.status === "verifying";
  } catch (e) {}
  var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
  var show = !!(hasSession && isVerified) || !isVerified;
  btn.classList.toggle("profile-exit-btn--hidden", !show);
  btn.hidden = !show;
  btn.classList.toggle("profile-exit-btn--auth-cta", !isVerified);
  btn.textContent = hasSession ? "Выйти из аккаунта" : "Войти в аккаунт";
  syncProfileStatusVisibility(hasSession || isVerified);
  syncProfileVerifiedContentVisibility(hasSession || isVerified);
  syncProfileLoadingVisibility(!!(hasSession && isLoading && !isVerified && !isGuest));
}

function pokerClearSessionsAndReloadForLogin() {
  try { localStorage.removeItem(POKER_PWA_TG_SESSION_KEY); } catch (e) {}
  try { localStorage.removeItem(POKER_PWA_VK_SESSION_KEY); } catch (e2) {}
  try { sessionStorage.removeItem(POKER_PWA_TG_SESSION_KEY); } catch (eS) {}
  try { sessionStorage.removeItem(POKER_PWA_VK_SESSION_KEY); } catch (eS2) {}
  try {
    if (typeof pokerClearAuthCookie === "function") {
      pokerClearAuthCookie(POKER_PWA_TG_SESSION_KEY);
      pokerClearAuthCookie(POKER_PWA_VK_SESSION_KEY);
    }
  } catch (eCookie) {}
  try {
    if (typeof pokerClearPwaSessionFromIdb === "function") {
      pokerClearPwaSessionFromIdb(POKER_PWA_TG_SESSION_KEY);
      pokerClearPwaSessionFromIdb(POKER_PWA_VK_SESSION_KEY);
    }
  } catch (eIdb) {}
  try { localStorage.removeItem(POKER_PWA_GUEST_KEY); } catch (eGuest) {}
  try { sessionStorage.removeItem("poker_dt_id"); } catch (e3) {}
  try { sessionStorage.removeItem("poker_p21_id"); } catch (e4) {}
  try { localStorage.removeItem("poker_p21_id"); } catch (e6) {}
  pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, "");
  pokerWriteProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY, "");
  pokerWriteProfileStorage(POKER_PROFILE_RESPECT_CACHE_KEY, "");
  pokerProfileUserInfoCache = null;
  pokerProfileUserInfoCacheAt = 0;
  try { window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null }; } catch (e7) {}
  try {
    delete window.__pokerChatDisplayName;
  } catch (eCdnL) {}
  try {
    delete window.__pokerProfileLinkedEmail;
    delete window.__pokerProfileTelegramUsername;
  } catch (eProfileMetaL) {}
  try {
    pokerWriteStoredProfileDisplayName("");
  } catch (eCdnLs) {}
  try {
    if (typeof window.__pokerShowLoggedOutState === "function") {
      window.__pokerShowLoggedOutState();
      return;
    }
  } catch (eShowLogin) {}
  window.location.reload();
}
window.__pokerClearSessionsAndReloadForLogin = pokerClearSessionsAndReloadForLogin;

function setProfileTab(tab) {
  var root = document.getElementById("profileView");
  var tabs = document.querySelectorAll("[data-profile-tab]");
  var activeTab = tab === "poker21" ? "poker21" : "club";
  if (root) {
    root.classList.toggle("profile-view--tab-poker21", activeTab === "poker21");
    root.classList.toggle("profile-view--tab-club", activeTab !== "poker21");
    root.dataset.profileActiveTab = activeTab;
  }
  tabs.forEach(function (btn) {
    var isActive = btn.getAttribute("data-profile-tab") === activeTab;
    btn.classList.toggle("profile-tabs__btn--active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  if (activeTab === "poker21" && typeof initProfilePokerPlus === "function") {
    try {
      setTimeout(function () {
        initProfilePokerPlus();
      }, 0);
    } catch (eLazyPpProfile) {}
  }
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
  setProfileTab("club");
  if (typeof initProfilePokerPlus === "function") {
    setTimeout(function () {
      try {
        initProfilePokerPlus();
      } catch (eProfilePokerPlusPreload) {}
    }, 0);
  }
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
  var chatRow = document.getElementById("profileChatNameRow");
  var saveWrap = document.getElementById("profileChatNameSaveWrap");
  var chatNameWrap = document.querySelector("#profileView .profile-chat-name");
  var friendsWrap = document.querySelector("#profileView .profile-friends");
  if (verifiedContent) verifiedContent.hidden = !isVerified;
  if (avatarBlock) avatarBlock.hidden = !isVerified;
  if (chatRow) chatRow.classList.toggle("profile-guest-hidden", !isVerified);
  if (saveWrap) saveWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (chatNameWrap) chatNameWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (friendsWrap) friendsWrap.classList.toggle("profile-guest-hidden", !isVerified);
  if (profileView) profileView.classList.toggle("profile-view--guest", !isVerified);
}

function syncProfileLoadingVisibility(isLoading) {
  var note = document.getElementById("profileLoadingNote");
  var profileView = document.getElementById("profileView");
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
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    if (hasSession) {
      if (typeof window.__pokerClearSessionsAndReloadForLogin === "function") window.__pokerClearSessionsAndReloadForLogin();
      return;
    }
    if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow();
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

function initProfilePokerPlus() {
  var section = document.getElementById("profilePokerPlusSection");
  var title = document.getElementById("profilePokerPlusTitle");
  var input = document.getElementById("profilePokerPlusCiphertextInput");
  var bindBtn = document.getElementById("profilePokerPlusBindBtn");
  var refreshBtn = document.getElementById("profilePokerPlusRefreshBtn");
  var unbindBtn = document.getElementById("profilePokerPlusUnbindBtn");
  var feedback = document.getElementById("profilePokerPlusFeedback");
  var emailRow = document.getElementById("profilePokerPlusEmailRow");
  var emailValue = document.getElementById("profilePokerPlusEmailValue");
  var linkedRow = document.getElementById("profilePokerPlusLinkedRow");
  var linkedValue = document.getElementById("profilePokerPlusLinkedValue");
  var verifiedBadge = document.getElementById("profilePokerPlusVerifiedBadge");
  var avatarRow = document.getElementById("profilePokerPlusAvatarRow");
  var avatarImg = document.getElementById("profilePokerPlusAvatarImg");
  var balanceRow = document.getElementById("profilePokerPlusBalanceRow");
  var balanceValue = document.getElementById("profilePokerPlusBalanceValue");
  var balanceToggle = document.getElementById("profilePokerPlusBalanceToggle");
  var registerRow = document.getElementById("profilePokerPlusRegisterRow");
  var registerValue = document.getElementById("profilePokerPlusRegisterValue");
  var positionRow = document.getElementById("profilePokerPlusPositionRow");
  var positionValue = document.getElementById("profilePokerPlusPositionValue");
  var leagueRow = document.getElementById("profilePokerPlusLeagueRow");
  var leagueValue = document.getElementById("profilePokerPlusLeagueValue");
  var groupRow = document.getElementById("profilePokerPlusGroupRow");
  var groupValue = document.getElementById("profilePokerPlusGroupValue");
  var countryRow = document.getElementById("profilePokerPlusCountryRow");
  var countryValue = document.getElementById("profilePokerPlusCountryValue");
  var roleRow = document.getElementById("profilePokerPlusRoleRow");
  var roleValue = document.getElementById("profilePokerPlusRoleValue");
  var lastLoginRow = document.getElementById("profilePokerPlusLastLoginRow");
  var lastLoginValue = document.getElementById("profilePokerPlusLastLoginValue");
  var lastIpRow = document.getElementById("profilePokerPlusLastIpRow");
  var lastIpValue = document.getElementById("profilePokerPlusLastIpValue");
  var statsRow = document.getElementById("profilePokerPlusStatsRow");
  var statsValue = document.getElementById("profilePokerPlusStatsValue");
  var statsVisibleYes = document.getElementById("profilePokerPlusStatsVisibleYes");
  var statsVisibleNo = document.getElementById("profilePokerPlusStatsVisibleNo");
  var statusLinkHint = document.getElementById("profileStatusLinkHint");
  var profileStatusProgressText = document.getElementById("profileStatusProgressText");
  var profileStatusTitle = document.getElementById("profileStatusTitle");
  if (!section || !input || !bindBtn || !refreshBtn || !unbindBtn) return;
  var POKERPLUS_BALANCE_VISIBLE_KEY = "poker_profile_pokerplus_balance_visible";
  var pokerPlusBalanceRaw = "";
  var pokerPlusBalanceVisible = false;
  var pokerPlusStatsVisibleToOthers = false;
  var pokerPlusProfileLinked = false;
  var pokerPlusProfileLoading = false;
  try {
    pokerPlusBalanceVisible = localStorage.getItem(POKERPLUS_BALANCE_VISIBLE_KEY) === "1";
  } catch (eReadPpBalanceVisible) {}

  function setFeedback(text, tone) {
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.style.color = tone === "warn" ? "#f59e0b" : tone ? "#ef4444" : "";
  }

  function auth() {
    var authState = window.__pokerTelegramAuth;
    var isGuest = !!(authState && authState.status === "guest");
    if (!isGuest) {
      try {
        isGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
      } catch (eGuestMode) {}
    }
    var isVerified = !!(authState && (authState.status === "verified" || authState.status === "dev_skip"));
    return { isGuest: isGuest, isVerified: isVerified };
  }

  function pokerPlusText(value) {
    return value != null && String(value).trim() ? String(value).trim() : "";
  }

  function pokerPlusLocale() {
    return typeof getPwaAuthLocale === "function" && getPwaAuthLocale() === "en" ? "en" : "ru";
  }

  function setPokerPlusRefreshButtonText(linked) {
    if (!refreshBtn) return;
    if (linked) refreshBtn.textContent = pokerPlusLocale() === "en" ? "Refresh" : "Обновить";
    else refreshBtn.textContent = pokerPlusLocale() === "en" ? "Check by email" : "Проверить по почте";
  }

  function setPokerPlusInitialLoading(loading) {
    if (!section || !section.classList) return;
    section.classList.toggle("profile-pokerplus-card--loading", !!loading);
    if (loading && title) title.textContent = pokerPlusLocale() === "en" ? "Poker21 Profile" : "Профиль в Poker21";
  }

  function setProfileStatusLoading(loading) {
    var statusSection = document.getElementById("profileStatusSection");
    var statusLoading = document.getElementById("profileStatusLoading");
    pokerPlusProfileLoading = !!loading;
    if (statusSection && statusSection.classList) {
      statusSection.classList.toggle("profile-status--loading", !!loading);
    }
    if (statusLoading) statusLoading.hidden = !loading;
    updateProfileStatusTextVisibility();
  }

  function updateProfileStatusTextVisibility() {
    if (profileStatusTitle) profileStatusTitle.hidden = !!pokerPlusProfileLoading;
    if (profileStatusProgressText) profileStatusProgressText.hidden = !!pokerPlusProfileLoading || !pokerPlusProfileLinked;
    if (statusLinkHint) {
      var state = auth();
      statusLinkHint.hidden = !!pokerPlusProfileLoading || !!pokerPlusProfileLinked || !state.isVerified || !!state.isGuest;
    }
  }

  function pokerPlusWholeNumber(value) {
    var raw = pokerPlusText(value);
    if (!raw) return "";
    var n = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
    if (!isFinite(n)) return raw.replace(/([.,]\d+)\b/, "");
    return String(n < 0 ? Math.ceil(n) : Math.floor(n));
  }

  function renderPokerPlusBalance() {
    var hasBalance = !!pokerPlusBalanceRaw;
    if (balanceRow) balanceRow.hidden = !hasBalance;
    if (balanceValue) balanceValue.textContent = hasBalance ? (pokerPlusBalanceVisible ? pokerPlusWholeNumber(pokerPlusBalanceRaw) + " ₽" : "••••") : "—";
    if (balanceToggle) {
      balanceToggle.hidden = !hasBalance;
      balanceToggle.textContent = pokerPlusBalanceVisible ? "Скрыть" : "Показать";
      balanceToggle.setAttribute("aria-pressed", pokerPlusBalanceVisible ? "true" : "false");
      balanceToggle.setAttribute("aria-label", pokerPlusBalanceVisible ? "Скрыть баланс Poker21" : "Показать баланс Poker21");
    }
  }

  function setPokerPlusBalanceVisible(visible) {
    pokerPlusBalanceVisible = !!visible;
    try {
      if (pokerPlusBalanceVisible) localStorage.setItem(POKERPLUS_BALANCE_VISIBLE_KEY, "1");
      else localStorage.removeItem(POKERPLUS_BALANCE_VISIBLE_KEY);
    } catch (eSavePpBalanceVisible) {}
    renderPokerPlusBalance();
  }

  function renderPokerPlusStatsVisibilityToggle(saving) {
    if (!statsVisibleYes || !statsVisibleNo) return;
    statsVisibleYes.classList.toggle("profile-pokerplus-stats-visibility__btn--active", pokerPlusStatsVisibleToOthers);
    statsVisibleNo.classList.toggle("profile-pokerplus-stats-visibility__btn--active", !pokerPlusStatsVisibleToOthers);
    statsVisibleYes.setAttribute("aria-pressed", pokerPlusStatsVisibleToOthers ? "true" : "false");
    statsVisibleNo.setAttribute("aria-pressed", pokerPlusStatsVisibleToOthers ? "false" : "true");
    statsVisibleYes.disabled = !!saving;
    statsVisibleNo.disabled = !!saving;
  }

  function applyPokerPlusStatsVisible(value) {
    pokerPlusStatsVisibleToOthers = value === true || value === 1 || value === "1" || value === "true";
    renderPokerPlusStatsVisibilityToggle(false);
  }

  window.pokerApplyPokerPlusStatsVisible = applyPokerPlusStatsVisible;

  function savePokerPlusStatsVisible(value) {
    var nextVisible = !!value;
    if (nextVisible === pokerPlusStatsVisibleToOthers) return;
    var prevVisible = pokerPlusStatsVisibleToOthers;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    pokerPlusStatsVisibleToOthers = nextVisible;
    renderPokerPlusStatsVisibilityToggle(true);
    fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ pokerPlusStatsVisible: nextVisible })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          pokerPlusStatsVisibleToOthers = prevVisible;
          setFeedback((data && data.error) || "Не удалось сохранить видимость статистики.", true);
        } else {
          pokerProfileUserInfoCache = null;
          pokerProfileUserInfoCacheAt = 0;
          setFeedback(nextVisible ? "Ваша статистика теперь видна другим." : "Ваша статистика теперь НЕ видна другим.", false);
        }
      })
      .catch(function () {
        pokerPlusStatsVisibleToOthers = prevVisible;
        setFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        renderPokerPlusStatsVisibilityToggle(false);
      });
  }

  function pokerPlusShortStat(value) {
    var n = Number(value);
    if (!isFinite(n)) return pokerPlusText(value);
    var abs = Math.abs(n);
    var sign = n < 0 ? "-" : "";
    if (abs >= 1000000) return sign + (abs / 1000000).toFixed(abs >= 10000000 ? 0 : 1).replace(/\.?0+$/, "") + "M";
    if (abs >= 1000) return sign + Math.round(abs / 1000) + "K";
    return String(value);
  }

  function pokerPlusStatMetricHtml(label, value, tone, icon) {
    var raw = pokerPlusText(value);
    var hasValue = !!raw;
    var rawDisplay = hasValue ? pokerPlusWholeNumber(raw) : "—";
    var cls = "profile-pokerplus-stat";
    if (tone) cls += " profile-pokerplus-stat--" + tone;
    return (
      '<span class="' +
      cls +
      '"><span class="profile-pokerplus-stat__label">' +
      escapeHtml(label) +
      '</span><span class="profile-pokerplus-stat__ring"><span class="profile-pokerplus-stat__icon">' +
      escapeHtml(icon || "") +
      '</span></span><span class="profile-pokerplus-stat__value">' +
      escapeHtml(hasValue ? pokerPlusShortStat(value) : "—") +
      '</span><span class="profile-pokerplus-stat__raw">' +
      escapeHtml(rawDisplay) +
      "</span></span>"
    );
  }

  function pokerPlusStatTone(value) {
    var n = Number(value);
    if (!isFinite(n) || n === 0) return "";
    return n > 0 ? "good" : "bad";
  }

  function pokerPlusPickStat(total, camelKey, snakeKey) {
    if (!total || typeof total !== "object") return null;
    if (total[camelKey] != null && total[camelKey] === total[camelKey]) return total[camelKey];
    if (snakeKey && total[snakeKey] != null && total[snakeKey] === total[snakeKey]) return total[snakeKey];
    return null;
  }

  function renderPokerPlusStats(totalSource) {
    if (!statsValue) return;
    setProfileStatusLoading(false);
    var total = totalSource && typeof totalSource === "object" ? totalSource : {};
    var metrics = [];
    var handsStat = pokerPlusPickStat(total, "hands", "hands");
    var winningsStat = pokerPlusPickStat(total, "winnings", "winnings");
    var mttStat = pokerPlusPickStat(total, "mttWinnings", "mtt_winnings");
    var sngStat = pokerPlusPickStat(total, "sngWinnings", "sng_winnings");
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    setProfileStatusFromRake(feeStat);
    metrics.push(pokerPlusStatMetricHtml("Рейк", feeStat, pokerPlusStatTone(feeStat), "%"));
    metrics.push(pokerPlusStatMetricHtml("Раздачи", handsStat, "", "♠"));
    metrics.push(pokerPlusStatMetricHtml("Кеш", winningsStat, pokerPlusStatTone(winningsStat), "⌁"));
    metrics.push(pokerPlusStatMetricHtml("MTT", mttStat, pokerPlusStatTone(mttStat), "🏆"));
    metrics.push(pokerPlusStatMetricHtml("SNG", sngStat, pokerPlusStatTone(sngStat), "♦"));
    statsValue.innerHTML = '<span class="profile-pokerplus-stats">' + metrics.join("") + "</span>";
    if (statsRow) statsRow.hidden = false;
  }

  function hidePokerPlusStats() {
    if (statsRow) statsRow.hidden = true;
    setProfileStatusLoading(false);
  }

  function renderPokerPlusStatsFallbackIfVisible() {
    if (!section || !section.classList || !section.classList.contains("profile-pokerplus-card--linked")) return;
    renderPokerPlusStats({});
  }

  function pokerPlusDate(value) {
    var raw = pokerPlusText(value);
    if (!raw) return "";
    var n = Number(raw);
    if (!n || n !== n) return raw;
    var ms = n > 100000000000 ? n : n * 1000;
    var d = new Date(ms);
    if (!d || d.getTime() !== d.getTime()) return raw;
    try {
      return d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
    } catch (e) {
      return d.toLocaleDateString();
    }
  }

  function setPokerPlusRow(row, valueEl, value) {
    var text = pokerPlusText(value);
    if (row) row.hidden = !text;
    if (valueEl) valueEl.textContent = text || "—";
  }

  function setPokerPlusLinkedMode(linked) {
    pokerPlusProfileLinked = !!linked;
    if (section && section.classList) section.classList.toggle("profile-pokerplus-card--linked", !!linked);
    updateProfileStatusTextVisibility();
    input.hidden = !!linked;
    bindBtn.hidden = !!linked;
    refreshBtn.hidden = false;
    setPokerPlusRefreshButtonText(!!linked);
    unbindBtn.hidden = !linked;
  }

  function renderProfile(profile, linked) {
    var p = profile && typeof profile === "object" ? profile : null;
    setPokerPlusInitialLoading(false);
    if (!linked || !p) {
      setPokerPlusLinkedMode(false);
      if (title) title.textContent = pokerPlusLocale() === "en" ? "Verification via Poker21" : "Верификация через Poker21";
      if (emailRow) emailRow.hidden = true;
      if (linkedRow) linkedRow.hidden = true;
      if (linkedRow) linkedRow.removeAttribute("data-register-date");
      if (balanceRow) balanceRow.hidden = true;
      pokerPlusBalanceRaw = "";
      renderPokerPlusBalance();
      if (avatarRow) avatarRow.hidden = true;
      if (registerRow) registerRow.hidden = true;
      if (positionRow) positionRow.hidden = true;
      if (leagueRow) leagueRow.hidden = true;
      if (groupRow) groupRow.hidden = true;
      if (countryRow) countryRow.hidden = true;
      if (roleRow) roleRow.hidden = true;
      if (lastLoginRow) lastLoginRow.hidden = true;
      if (lastIpRow) lastIpRow.hidden = true;
      hidePokerPlusStats();
      if (verifiedBadge) verifiedBadge.classList.add("profile-verified-badge--hidden");
      if (avatarImg) avatarImg.removeAttribute("src");
      try { window.__pokerPlusUserId = ""; } catch (eClearPpId) {}
      updateProfileHeroPokerPlusId("");
      return;
    }
    setPokerPlusLinkedMode(true);
    if (title) title.textContent = pokerPlusLocale() === "en" ? "Poker21 Profile" : "Профиль в Poker21";
    if (emailRow) emailRow.hidden = !(p.email && String(p.email).trim());
    if (emailValue) emailValue.textContent = p.email && String(p.email).trim() ? String(p.email).trim() : "—";
    if (linkedRow) linkedRow.hidden = false;
    if (linkedValue) {
      var playerName = pokerPlusText(p.nickname) || "—";
      var playerId = pokerPlusText(p.pokerPlusUserId);
      linkedValue.innerHTML =
        '<span class="profile-pokerplus-player-name">' +
        escapeHtml(playerName) +
        '</span><span class="profile-pokerplus-player-id">' +
        escapeHtml(playerId ? "ID " + playerId : "ID —") +
        "</span>";
    }
    if (linkedRow) {
      var registerDateText = pokerPlusDate(p.registerDate);
      linkedRow.setAttribute("data-register-date", registerDateText ? "Дата регистрации: " + registerDateText : "");
    }
    try { window.__pokerPlusUserId = pokerPlusText(p.pokerPlusUserId); } catch (eSetPpId) {}
    updateProfileHeroPokerPlusId(p.pokerPlusUserId);
    if (verifiedBadge) verifiedBadge.classList.toggle("profile-verified-badge--hidden", !(linked && p.pokerPlusUserId));
    pokerPlusBalanceRaw = pokerPlusText(p.balance);
    renderPokerPlusBalance();
    var avatarUrl = pokerPlusText(p.avatarUrl);
    if (avatarRow) avatarRow.hidden = false;
    if (avatarImg) {
      if (avatarUrl) avatarImg.src = avatarUrl;
      else avatarImg.removeAttribute("src");
    }
    if (registerRow) registerRow.hidden = true;
    if (registerValue) registerValue.textContent = pokerPlusDate(p.registerDate) || "—";
    if (positionRow) positionRow.hidden = true;
    if (positionValue) positionValue.textContent = "—";
    if (leagueRow) leagueRow.hidden = true;
    if (leagueValue) leagueValue.textContent = "—";
    if (groupRow) groupRow.hidden = true;
    if (groupValue) groupValue.textContent = "—";
    setPokerPlusRow(countryRow, countryValue, p.country);
    if (roleRow) roleRow.hidden = true;
    if (roleValue) roleValue.textContent = "—";
    setPokerPlusRow(lastLoginRow, lastLoginValue, pokerPlusDate(p.lastLoginDate));
    setPokerPlusRow(lastIpRow, lastIpValue, p.lastLoginIp);
    renderPokerPlusStats(p.totalCounter && typeof p.totalCounter === "object" ? p.totalCounter : (p.total_counter && typeof p.total_counter === "object" ? p.total_counter : {}));
  }

  function syncVisibility() {
    var state = auth();
    section.hidden = !state.isVerified || !!state.isGuest;
    if (state.isVerified && !state.isGuest && section.dataset.profilePokerPlusLoaded !== "1" && !section.classList.contains("profile-pokerplus-card--linked")) setPokerPlusLinkedMode(false);
    bindBtn.disabled = !state.isVerified || !!state.isGuest;
    refreshBtn.disabled = !state.isVerified || !!state.isGuest;
    unbindBtn.disabled = !state.isVerified || !!state.isGuest;
    input.disabled = !state.isVerified || !!state.isGuest;
    if (!state.isVerified || state.isGuest) {
      setFeedback("", false);
      renderProfile(null, false);
    }
    return state;
  }

  function loadProfile(refresh) {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setProfileStatusLoading(false);
      return Promise.resolve();
    }
    setProfileStatusLoading(true);
    var body = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody({}) : {};
    if (refresh) body.refresh = "1";
    return fetch(base + "/api/pokerplus-player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          renderProfile(null, false);
          setProfileStatusLoading(false);
          if (data && data.error) setFeedback(data.error, true);
          return;
        }
        try {
          renderProfile(data.profile, !!data.linked);
        } catch (renderErr) {
          try { console.error("PokerPlus profile render failed", renderErr); } catch (eLogPpRender) {}
          setProfileStatusLoading(false);
          setFeedback("Данные Poker21 пришли, но не удалось отобразить профиль. Обновите страницу.", true);
          return;
        }
        if (!data.linked) {
          setFeedback("", false);
          if (emailRow) emailRow.hidden = true;
          unbindBtn.hidden = true;
          return;
        }
        if (data.syncError) {
          setFeedback("Показаны сохранённые данные Poker21. Свежее обновление не прошло: " + data.syncError, "warn");
        } else if (refresh) {
          setFeedback("Данные Poker21 обновлены.", false);
        } else {
          setFeedback("", false);
        }
      })
      .catch(function () {
        setFeedback(refresh ? "Не удалось обновить Poker21: сервер обновления не ответил. Старые данные показаны ниже." : POKER_NET_ERR, true);
        renderPokerPlusStatsFallbackIfVisible();
      })
      .finally(function () {
        setPokerPlusInitialLoading(false);
        setProfileStatusLoading(false);
      });
  }

  function bindPokerPlus() {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest) {
      setFeedback("Сначала войдите в аккаунт.", true);
      return;
    }
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setFeedback("Откройте приложение в Telegram или войдите в PWA.", true);
      return;
    }
    var ciphertext = String(input.value || "").trim().toUpperCase();
    input.value = ciphertext;
    if (!ciphertext) {
      setFeedback("Вставьте ключ из PokerPlus.", true);
      return;
    }
    bindBtn.disabled = true;
    refreshBtn.disabled = true;
    unbindBtn.disabled = true;
    setFeedback("Привязываем PokerPlus…", false);
    fetch(base + "/api/pokerplus-bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ ciphertext: ciphertext })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          setFeedback((data && data.error) || "Не удалось привязать PokerPlus.", true);
          return;
        }
        renderProfile(data.profile, true);
        setFeedback("PokerPlus привязан.", false);
        input.value = "";
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        bindBtn.disabled = false;
        refreshBtn.disabled = false;
        unbindBtn.disabled = false;
      });
  }

  function unbindPokerPlus() {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest) {
      setFeedback("Сначала войдите в аккаунт.", true);
      return;
    }
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setFeedback("Откройте приложение в Telegram или войдите в PWA.", true);
      return;
    }
    bindBtn.disabled = true;
    refreshBtn.disabled = true;
    unbindBtn.disabled = true;
    setFeedback("Отвязываем PokerPlus…", false);
    fetch(base + "/api/pokerplus-unbind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({})),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          setFeedback((data && data.error) || "Не удалось отвязать PokerPlus.", true);
          return;
        }
        renderProfile(null, false);
        input.value = "";
        setFeedback("PokerPlus отвязан.", false);
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        bindBtn.disabled = false;
        refreshBtn.disabled = false;
        unbindBtn.disabled = false;
      });
  }

  if (bindBtn.dataset.bound !== "1") {
    bindBtn.dataset.bound = "1";
    bindBtn.addEventListener("click", bindPokerPlus);
  }
  if (refreshBtn.dataset.bound !== "1") {
    refreshBtn.dataset.bound = "1";
    refreshBtn.addEventListener("click", function () {
      setFeedback("Обновляем данные PokerPlus…", false);
      loadProfile(true).finally(function () {});
    });
  }
  if (unbindBtn.dataset.bound !== "1") {
    unbindBtn.dataset.bound = "1";
    unbindBtn.addEventListener("click", unbindPokerPlus);
  }
  if (balanceToggle && balanceToggle.dataset.bound !== "1") {
    balanceToggle.dataset.bound = "1";
    balanceToggle.addEventListener("click", function () {
      setPokerPlusBalanceVisible(!pokerPlusBalanceVisible);
    });
  }
  if (statsVisibleYes && statsVisibleYes.dataset.bound !== "1") {
    statsVisibleYes.dataset.bound = "1";
    statsVisibleYes.addEventListener("click", function () {
      savePokerPlusStatsVisible(true);
    });
  }
  if (statsVisibleNo && statsVisibleNo.dataset.bound !== "1") {
    statsVisibleNo.dataset.bound = "1";
    statsVisibleNo.addEventListener("click", function () {
      savePokerPlusStatsVisible(false);
    });
  }
  if (input.dataset.bound !== "1") {
    input.dataset.bound = "1";
    input.addEventListener("input", function () {
      input.value = String(input.value || "").replace(/\s+/g, "").toUpperCase().slice(0, 64);
    });
  }
  renderPokerPlusStatsVisibilityToggle(false);
  if (typeof loadCurrentProfileUserInfo === "function") {
    loadCurrentProfileUserInfo().then(function (data) {
      if (data && data.ok && data.pokerPlusStatsVisible != null) applyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    });
  }
  var initialState = syncVisibility();
  var profileRoot = document.getElementById("profileView");
  var activeProfileTab = profileRoot && profileRoot.dataset ? profileRoot.dataset.profileActiveTab : "";
  if (initialState.isVerified && !initialState.isGuest && section.dataset.profilePokerPlusLoaded !== "1") {
    section.dataset.profilePokerPlusLoaded = "1";
    if (activeProfileTab === "poker21" && !section.classList.contains("profile-pokerplus-card--linked")) setPokerPlusInitialLoading(true);
    loadProfile(false).catch(function () {
      section.dataset.profilePokerPlusLoaded = "";
    });
  }
}

function syncProfileEmailAuthUi() {
  var section = document.getElementById("profileEmailAuthSection");
  var titleEl = document.getElementById("profileEmailAuthTitle");
  var textEl = document.getElementById("profileEmailAuthText");
  var linkedRow = document.getElementById("profileEmailAuthLinkedRow");
  var linkedValue = document.getElementById("profileEmailAuthLinkedValue");
  var tgLinkedRow = document.getElementById("profileTelegramLinkedRow");
  var tgLinkedValue = document.getElementById("profileTelegramLinkedValue");
  var formWrap = document.getElementById("profileEmailAuthForm");
  var emailInput = document.getElementById("profileEmailAuthInput");
  var codeInput = document.getElementById("profileEmailAuthCodeInput");
  var sendBtn = document.getElementById("profileEmailAuthSendBtn");
  var verifyBtn = document.getElementById("profileEmailAuthVerifyBtn");
  var feedbackEl = document.getElementById("profileEmailAuthFeedback");
  var tgSection = document.getElementById("profileTelegramLinkSection");
  var auth = window.__pokerTelegramAuth;
  var isGuest = !!(auth && auth.status === "guest");
  if (!isGuest) {
    try {
      isGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestMode) {}
  }
  var isVerified = !!(auth && (auth.status === "verified" || auth.status === "dev_skip"));
  var hasStoredSession = false;
  try {
    hasStoredSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
  } catch (eProfileSession) {}
  var showProfileShell = !isGuest && (isVerified || hasStoredSession);
  syncProfileStatusVisibility(showProfileShell);
  syncProfileVerifiedContentVisibility(showProfileShell);
  var authMethod = pokerGetAuthMethod();
  var currentMemberId = "";
  try {
    currentMemberId =
      auth && auth.user && auth.user.memberId != null ? String(auth.user.memberId).trim() : "";
  } catch (eMemberId) {}
  if (!currentMemberId && typeof window.pokerResolveMyChatMemberId === "function") {
    try {
      currentMemberId = String(window.pokerResolveMyChatMemberId() || "").trim();
    } catch (eResolvedMid) {}
  }
  if (/^mail_/.test(currentMemberId) || /^mail_pending_/.test(currentMemberId)) authMethod = "email";
  else if (/^tg_/.test(currentMemberId) || /^vk_/.test(currentMemberId)) authMethod = "telegram";
  var linkedEmail = "";
  var linkedTelegramUsername = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (e) {}
  if (!linkedEmail) linkedEmail = pokerReadProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY);
  try {
    linkedTelegramUsername = String(window.__pokerProfileTelegramUsername || "").trim().replace(/^@+/, "");
  } catch (eTgLinked) {}
  if (!linkedTelegramUsername) {
    linkedTelegramUsername = pokerReadProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY).replace(/^@+/, "");
  }
  if (!linkedTelegramUsername) {
    try {
      linkedTelegramUsername =
        auth && auth.user && auth.user.username != null ? String(auth.user.username).trim().replace(/^@+/, "") : "";
    } catch (eAuthTgUsername) {}
  }
  if (!linkedTelegramUsername) {
    try {
      var resolvedUser = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      linkedTelegramUsername = resolvedUser && resolvedUser.username != null ? String(resolvedUser.username).trim().replace(/^@+/, "") : "";
    } catch (eResolvedTgUsername) {}
  }
  if (!linkedEmail) {
    try {
      linkedEmail = auth && auth.user && auth.user.email != null ? String(auth.user.email).trim() : "";
    } catch (eAuthEmail) {}
  }
  if (linkedEmail && authMethod !== "telegram") authMethod = "email";
  if (section) section.hidden = !!isGuest || !isVerified;
  if (section && section.classList) section.classList.toggle("profile-email-auth--email-linked", !!linkedEmail);
  if (titleEl) titleEl.hidden = true;
  if (linkedRow) linkedRow.hidden = !linkedEmail;
  if (linkedValue && linkedEmail) linkedValue.textContent = linkedEmail;
  if (tgLinkedRow) tgLinkedRow.hidden = !linkedTelegramUsername;
  if (tgLinkedValue && linkedTelegramUsername) tgLinkedValue.textContent = "@" + linkedTelegramUsername;
  if (tgSection) tgSection.hidden = !!isGuest || !isVerified || authMethod !== "email";
  if (textEl) {
    if (isGuest) textEl.textContent = "Гостевой режим не поддерживает привязку почты. Сначала войдите в аккаунт.";
    else if (authMethod === "email" && linkedEmail) textEl.textContent = "Вы вошли по этой почте. Это ваш текущий способ входа.";
    else if (linkedEmail) textEl.textContent = "Эта почта уже привязана. По ней можно входить в аккаунт на экране авторизации.";
    else textEl.textContent = "Привяжите email, чтобы потом можно было входить в аккаунт по почте.";
    textEl.hidden = true;
  }
  if (formWrap) {
    formWrap.hidden = !!isGuest || !isVerified || !!linkedEmail;
    formWrap.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  }
  if (emailInput) emailInput.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (codeInput) codeInput.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (sendBtn) sendBtn.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (verifyBtn) verifyBtn.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (feedbackEl) feedbackEl.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  var disableInputs = !isVerified || isGuest;
  if (emailInput) {
    emailInput.disabled = disableInputs;
    if (linkedEmail && !emailInput.value) emailInput.value = linkedEmail;
  }
  if (codeInput) codeInput.disabled = disableInputs;
  if (sendBtn) sendBtn.disabled = disableInputs;
  if (verifyBtn) verifyBtn.disabled = disableInputs;
}

function initProfileEmailAuth() {
  var emailInput = document.getElementById("profileEmailAuthInput");
  var codeInput = document.getElementById("profileEmailAuthCodeInput");
  var sendBtn = document.getElementById("profileEmailAuthSendBtn");
  var verifyBtn = document.getElementById("profileEmailAuthVerifyBtn");
  var feedback = document.getElementById("profileEmailAuthFeedback");
  var tgLinkBtn = document.getElementById("profileTelegramLinkBtn");
  var tgLinkFeedback = document.getElementById("profileTelegramLinkFeedback");
  if (!emailInput || !codeInput || !sendBtn || !verifyBtn) return;
  if (sendBtn.dataset.bound === "1") {
    syncProfileEmailAuthUi();
    return;
  }
  sendBtn.dataset.bound = "1";
  var base = getApiBase();
  function setFeedback(text, isError) {
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.style.color = isError ? "#ef4444" : "";
  }
  function authBody(extra) {
    return pokerGuestOrAuthedPostBody(extra || {});
  }
  function refreshLinkedEmail() {
    if (!base) return Promise.resolve();
    if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
      return loadCurrentProfileUserInfo()
        .then(function (data) {
          pokerApplyProfileUserInfo(data);
          syncProfileEmailAuthUi();
        })
        .catch(function () {});
    }
    return fetch(base + "/api/auth-email-link" + (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData="))
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          try {
            window.__pokerProfileLinkedEmail = data.email != null ? String(data.email).trim() : "";
            pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, window.__pokerProfileLinkedEmail);
          } catch (eLinkedEmail) {}
          syncProfileEmailAuthUi();
        }
      })
      .catch(function () {});
  }
  codeInput.addEventListener("input", function () {
    codeInput.value = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
  });
  sendBtn.addEventListener("click", function () {
    if (!base) {
      setFeedback("Сервер недоступен.", true);
      return;
    }
    setFeedback("Отправляем код…", false);
    fetch(base + "/api/auth-email-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ action: "request", email: emailInput.value })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        setFeedback(data && data.ok ? "Код отправлен на почту." : ((data && data.error) || "Не удалось отправить код."), !(data && data.ok));
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      });
  });
  verifyBtn.addEventListener("click", function () {
    if (!base) {
      setFeedback("Сервер недоступен.", true);
      return;
    }
    setFeedback("Проверяем код…", false);
    fetch(base + "/api/auth-email-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ action: "verify", email: emailInput.value, code: codeInput.value })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          window.__pokerProfileLinkedEmail = data.email ? String(data.email).trim() : String(emailInput.value || "").trim();
          pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, window.__pokerProfileLinkedEmail);
          setFeedback("Почта привязана.", false);
          syncProfileEmailAuthUi();
          updateProfileUserMeta();
          return;
        }
        setFeedback((data && data.error) || "Не удалось привязать почту.", true);
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      });
  });
  if (tgLinkBtn && tgLinkBtn.dataset.bound !== "1") {
    tgLinkBtn.dataset.bound = "1";
    tgLinkBtn.addEventListener("click", function () {
      try {
        if (tgLinkFeedback) tgLinkFeedback.textContent = "";
        if (typeof window.__pokerOpenPwaLoginScreen === "function") {
          window.__pokerOpenPwaLoginScreen();
          if (tgLinkFeedback) tgLinkFeedback.textContent = "Откройте вход через Telegram и завершите привязку.";
        } else if (tgLinkFeedback) {
          tgLinkFeedback.textContent = "Откройте вход через Telegram на этом устройстве.";
        }
      } catch (eTgLink) {
        if (tgLinkFeedback) tgLinkFeedback.textContent = "Не удалось открыть привязку Telegram.";
      }
    });
  }
  syncProfileEmailAuthUi();
  refreshLinkedEmail();
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

function pokerProfileStatusStepForLevel(level) {
  if (level <= 5) return 10000;
  if (level <= 15) return 20000;
  if (level <= 25) return 35000;
  if (level <= 35) return 50000;
  if (level <= 45) return 75000;
  return 100000;
}

function pokerProfileRakeForLevel(level) {
  var target = Math.min(55, Math.max(1, parseInt(level, 10) || 1));
  var rake = 0;
  for (var lvl = 1; lvl < target; lvl++) {
    rake += pokerProfileStatusStepForLevel(lvl);
  }
  return rake;
}

function pokerProfileStatusFromRake(value) {
  var rake = pokerProfileRakeNumber(value);
  var level = 1;
  var levelStart = 0;
  while (level < 55) {
    var step = pokerProfileStatusStepForLevel(level);
    if (rake < levelStart + step) break;
    levelStart += step;
    level++;
  }
  var nextLevel = Math.min(55, level + 1);
  var nextStart = pokerProfileRakeForLevel(nextLevel);
  var levelSize = Math.max(1, nextStart - levelStart);
  var valuePercent = level >= 55 ? 100 : Math.floor(Math.min(99, Math.max(0, ((rake - levelStart) / levelSize) * 100)));
  return {
    rake: rake,
    level: level,
    nextLevel: nextLevel,
    levelStart: levelStart,
    nextStart: nextStart,
    valuePercent: valuePercent,
  };
}

function pokerProfileStatusCardLabel(level) {
  var n = Math.min(55, Math.max(1, parseInt(level, 10) || 1));
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

var POKER_PROFILE_CURRENT_STATUS_LEVEL = 1;

function pokerProfileStatusFishLevel(level) {
  var n = parseInt(level, 10);
  if (!isFinite(n) || n < 1) n = 1;
  return Math.min(POKER_PROFILE_STATUS_FISH_ASSETS.length, n);
}

function pokerProfileStatusFishSrc(level) {
  return POKER_PROFILE_STATUS_FISH_ASSETS[pokerProfileStatusFishLevel(level) - 1];
}

function pokerProfileStatusFishIconHtml(level, extraClass) {
  if (level == null || level === "") return "";
  var fishLevel = pokerProfileStatusFishLevel(level);
  var cls = "profile-status-fish-inline";
  if (extraClass) cls += " " + String(extraClass);
  return (
    '<img class="' +
    cls +
    '" src="' +
    escapeHtml(pokerProfileStatusFishSrc(fishLevel)) +
    '" alt="" aria-hidden="true" loading="lazy" decoding="async" data-status-fish-level="' +
    escapeHtml(String(fishLevel)) +
    '" />'
  );
}

function pokerProfileApplyStatusFish(fish, level) {
  if (!fish) return;
  var fishLevel = pokerProfileStatusFishLevel(level);
  var img = fish.tagName && String(fish.tagName).toLowerCase() === "img" ? fish : fish.querySelector("img");
  if (img) img.src = pokerProfileStatusFishSrc(fishLevel);
  fish.setAttribute("data-status-fish-level", String(fishLevel));
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
      escapeHtml(String(level)) +
      (unlocked ? " открыт" : " закрыт") +
      '">' +
      '<span class="profile-fish-collection__level">' +
      escapeHtml(String(level)) +
      "</span>" +
      '<img class="profile-fish-collection__img" src="' +
      escapeHtml(src) +
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

function setProfileStatus(value) {
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  if (!input || !visual) return;
  var val = Math.min(100, Math.max(0, parseInt(value, 10) || 0));
  input.value = val;
  visual.style.setProperty("--status-value", String(val));
}

function setProfileStatusFromRake(value) {
  var title = document.getElementById("profileStatusTitle");
  var progressText = document.getElementById("profileStatusProgressText");
  var input = document.getElementById("profileStatusInput");
  var visual = document.getElementById("profileStatusVisual");
  var fish = visual ? visual.querySelector(".profile-status__fish") : null;
  var cards = document.querySelectorAll("#profileStatusSection .profile-status__card");
  if (!input || !visual) return;
  var status = pokerProfileStatusFromRake(value);
  POKER_PROFILE_CURRENT_STATUS_LEVEL = status.level;
  input.value = status.valuePercent;
  visual.style.setProperty("--status-value", String(status.valuePercent));
  if (title) {
    title.textContent = "Ваш уровень " + status.level + " из 55";
  }
  if (cards[0]) cards[0].textContent = pokerProfileStatusCardLabel(status.level);
  if (cards[1]) cards[1].textContent = pokerProfileStatusCardLabel(status.nextLevel);
  if (fish) {
    pokerProfileApplyStatusFish(fish, status.level);
    var currentLevelRake = Math.max(0, status.rake - status.levelStart);
    var neededRake = Math.max(0, status.nextStart - status.levelStart);
    var leftRake = Math.max(0, status.nextStart - status.rake);
    var tip =
      status.level >= 55
        ? "Максимальный уровень. Набито " + pokerProfileFormatRake(status.rake) + " очков"
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
      } else {
        if (cachedScore === "") el.textContent = "\u2014";
      }
    })
    .catch(function () {
      if (cachedScore === "") el.textContent = "\u2014";
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
                    item.remove();
                    if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
                    if (typeof window.chatRefresh === "function") window.chatRefresh();
                    if (!listEl.querySelector(".friends-list-modal__item")) {
                      listEl.innerHTML = "<p class=\"friends-list-modal__empty\">Пока нет друзей</p>";
                      try {
                        if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(0);
                      } catch (eLM) {}
                    }
                  } else {
                    removeBtn.disabled = false;
                    if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
                    else if (typeof alert === "function") alert((d && d.error) || "Ошибка");
                  }
                })
                .catch(function () {
                  removeBtn.disabled = false;
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

function initPokerShowsPlayer() {
  var iframe = document.getElementById("pokerShowsIframe");
  var tabs = document.querySelectorAll(".home-poker-shows__tab[data-poker-show]");
  if (!iframe || !tabs.length) return;
  var playlists = {
    afterdark: "PL2bAZuFpadxGdQdaYJuSUtw9JFgsMB8YV",
    highstakes: "PLzjpJOumIPMiQQhiCWYlawTFz7LNKPino"
  };
  tabs.forEach(function (tab) {
    if (tab.dataset.pokerShowsBound) return;
    tab.dataset.pokerShowsBound = "1";
    tab.addEventListener("click", function () {
      var show = tab.getAttribute("data-poker-show");
      var listId = playlists[show];
      if (!listId) return;
      iframe.src = "https://www.youtube.com/embed/videoseries?list=" + listId + "&rel=0";
      tabs.forEach(function (t) {
        t.classList.toggle("home-poker-shows__tab--active", t === tab);
        t.setAttribute("aria-pressed", t === tab ? "true" : "false");
      });
    });
  });
}

/** Плейсхолдер профиля: лёгкий JPEG (~18 KB), не полноразмерный PNG. */
var POKER_PROFILE_AVATAR_PLACEHOLDER = "./assets/profile-pokerist.jpg";
var POKER_AVATAR_CACHE_TTL_MS = 20 * 60 * 1000;
var POKER_PROFILE_AVATAR_PRESETS = [
  { id: "tiger", src: "./assets/avatar-tiger.jpg", label: "Тигр" },
  { id: "raccoon", src: "./assets/avatar-raccoon.jpg", label: "Енот" },
  { id: "skull", src: "./assets/avatar-skull.jpg", label: "Череп" },
  { id: "phoenix", src: "./assets/avatar-phoenix.jpg", label: "Феникс" },
  { id: "octopus", src: "./assets/avatar-octopus.jpg", label: "Осьминог" },
  { id: "cat", src: "./assets/avatar-cat.jpg", label: "Кот" },
  { id: "robot", src: "./assets/avatar-robot.jpg", label: "Робот" },
  { id: "bulldog", src: "./assets/avatar-bulldog.jpg", label: "Бульдог" },
  { id: "fox", src: "./assets/avatar-fox.jpg", label: "Лис" },
  { id: "chip", src: "./assets/avatar-chip.jpg", label: "Фишка" },
  { id: "koala", src: "./assets/avatar-koala.jpg", label: "Коала" },
  { id: "raven", src: "./assets/avatar-raven.jpg", label: "Ворон" },
  { id: "crocodile", src: "./assets/avatar-crocodile.jpg", label: "Крокодил" },
  { id: "rabbit", src: "./assets/avatar-rabbit.jpg", label: "Кролик" },
  { id: "chameleon", src: "./assets/avatar-chameleon.jpg", label: "Хамелеон" },
  { id: "panda", src: "./assets/avatar-panda.jpg", label: "Панда" },
  { id: "wolf", src: "./assets/avatar-wolf.jpg", label: "Волк" },
  { id: "owl", src: "./assets/avatar-owl.jpg", label: "Сова" },
  { id: "bat", src: "./assets/avatar-bat.jpg", label: "Летучая мышь" },
  { id: "gorilla", src: "./assets/avatar-gorilla.jpg", label: "Горилла" },
];

function pokerAvatarCacheStorageKey() {
  try {
    var id =
      typeof window.pokerResolveMyChatMemberId === "function"
        ? window.pokerResolveMyChatMemberId()
        : "";
    id = id != null ? String(id).trim() : "";
    return id ? "poker_avatar_data_v2:" + id : "";
  } catch (eK) {
    return "";
  }
}

function pokerFindPresetAvatarById(id) {
  id = id != null ? String(id).trim() : "";
  if (!id) return null;
  for (var i = 0; i < POKER_PROFILE_AVATAR_PRESETS.length; i++) {
    if (POKER_PROFILE_AVATAR_PRESETS[i].id === id) return POKER_PROFILE_AVATAR_PRESETS[i];
  }
  return null;
}

function pokerFindPresetAvatarIdBySrc(src) {
  src = src != null ? String(src) : "";
  if (!src) return "";
  for (var i = 0; i < POKER_PROFILE_AVATAR_PRESETS.length; i++) {
    var preset = POKER_PROFILE_AVATAR_PRESETS[i];
    var filename = preset.src.split("/").pop();
    if (src.indexOf(preset.src) >= 0 || (filename && src.indexOf(filename) >= 0)) return preset.id;
  }
  return "";
}

function pokerReadAvatarCacheEntry() {
  var k = pokerAvatarCacheStorageKey();
  if (!k || typeof sessionStorage === "undefined") return null;
  try {
    var raw = sessionStorage.getItem(k);
    if (!raw) return null;
    var o = JSON.parse(raw);
    if (!o || typeof o.t !== "number") return null;
    if (Date.now() - o.t > POKER_AVATAR_CACHE_TTL_MS) return null;
    return { avatar: o.a ? String(o.a) : "", t: o.t };
  } catch (eR) {
    return null;
  }
}

function pokerWriteAvatarCacheEntry(avatarDataUrlOrEmpty) {
  var k = pokerAvatarCacheStorageKey();
  if (!k || typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(
      k,
      JSON.stringify({
        a: avatarDataUrlOrEmpty ? String(avatarDataUrlOrEmpty) : "",
        t: Date.now(),
      })
    );
  } catch (eW) {}
}

function pokerApplyProfileAvatarMirror(src) {
  var m = document.getElementById("profileAvatarMirror");
  if (m && src) {
    m.src = src;
    m.alt = "Покерист";
  }
}

function loadHeaderAvatar() {
  var avatarEl = document.getElementById("authUserAvatar");
  if (!avatarEl) return;
  function applyTelegramPhotoFallback() {
    try {
      var au = window.__pokerTelegramAuth;
      if (au && au.user && au.user.photo_url && String(au.user.photo_url).indexOf("http") === 0) {
        avatarEl.src = au.user.photo_url;
        avatarEl.alt = "Аватар";
        avatarEl.style.display = "";
        return true;
      }
    } catch (eA) {}
    return false;
  }
  var base = getApiBase();
  if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
    if (!applyTelegramPhotoFallback()) avatarEl.style.display = "none";
    return;
  }
  var cached = pokerReadAvatarCacheEntry();
  if (cached) {
    if (cached.avatar) {
      avatarEl.src = cached.avatar;
      avatarEl.alt = "Аватар";
      avatarEl.style.display = "";
      return;
    }
    if (applyTelegramPhotoFallback()) return;
    avatarEl.removeAttribute("src");
    avatarEl.style.display = "none";
    return;
  }
  var hq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  var tsSep = hq.indexOf("?") === 0 ? "&" : "?";
  fetch(base + "/api/avatar" + hq + tsSep + "_ts=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok) {
        pokerWriteAvatarCacheEntry(data.avatar || "");
      }
      if (data && data.ok && data.avatar) {
        avatarEl.src = data.avatar;
        avatarEl.alt = "Аватар";
        avatarEl.style.display = "";
        return;
      }
      if (!applyTelegramPhotoFallback()) {
        avatarEl.removeAttribute("src");
        avatarEl.style.display = "none";
      }
    })
    .catch(function () {
      if (!applyTelegramPhotoFallback()) avatarEl.style.display = "none";
    });
}

function initProfileAvatar() {
  var avatarEl = document.getElementById("profileAvatar");
  var inputEl = document.getElementById("profileAvatarInput");
  var feedbackEl = document.getElementById("profileAvatarFeedback");
  if (!avatarEl || !inputEl) return;

  var base = getApiBase();

  var uploadInProgress = false;
  var avatarPickSessionActive = false;
  var objectUrlPending = null;

  function revokePendingObjectUrl() {
    if (objectUrlPending) {
      try {
        URL.revokeObjectURL(objectUrlPending);
      } catch (eRevO) {}
      objectUrlPending = null;
    }
  }

  function fetchProfileAvatarFromServer() {
    if (uploadInProgress || avatarPickSessionActive) return;
    base = base || getApiBase();
    if (!base) {
      revokePendingObjectUrl();
      avatarEl.src = POKER_PROFILE_AVATAR_PLACEHOLDER;
      avatarEl.dataset.avatarId = "";
      pokerApplyProfileAvatarMirror(POKER_PROFILE_AVATAR_PLACEHOLDER);
      return;
    }
    inputEl.value = "";
    var cached = pokerReadAvatarCacheEntry();
    if (cached) {
      if (uploadInProgress || avatarPickSessionActive) return;
      revokePendingObjectUrl();
      if (cached.avatar) {
        avatarEl.src = cached.avatar;
        avatarEl.alt = "Аватар";
        avatarEl.dataset.avatarId = pokerFindPresetAvatarIdBySrc(cached.avatar) || "";
        pokerApplyProfileAvatarMirror(cached.avatar);
      } else {
        avatarEl.src = POKER_PROFILE_AVATAR_PLACEHOLDER;
        avatarEl.dataset.avatarId = "";
        pokerApplyProfileAvatarMirror(POKER_PROFILE_AVATAR_PLACEHOLDER);
      }
      return;
    }
    var aq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    var tsSep = aq.indexOf("?") === 0 ? "&" : "?";
    fetch(base + "/api/avatar" + aq + tsSep + "_ts=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (uploadInProgress || avatarPickSessionActive) return;
        if (data && data.ok) {
          pokerWriteAvatarCacheEntry(data.avatar || "");
        }
        if (data && data.ok && data.avatar) {
          revokePendingObjectUrl();
          avatarEl.src = data.avatar;
          avatarEl.alt = "Аватар";
          avatarEl.dataset.avatarId = data.avatarId || pokerFindPresetAvatarIdBySrc(data.avatar) || "";
          pokerApplyProfileAvatarMirror(data.avatar);
        } else {
          revokePendingObjectUrl();
          avatarEl.src = POKER_PROFILE_AVATAR_PLACEHOLDER;
          avatarEl.dataset.avatarId = "";
          pokerApplyProfileAvatarMirror(POKER_PROFILE_AVATAR_PLACEHOLDER);
        }
      })
      .catch(function () {
        if (!uploadInProgress && !avatarPickSessionActive) {
          revokePendingObjectUrl();
          avatarEl.src = POKER_PROFILE_AVATAR_PLACEHOLDER;
          pokerApplyProfileAvatarMirror(POKER_PROFILE_AVATAR_PLACEHOLDER);
        }
      });
  }

  if (avatarEl.getAttribute("data-poker-avatar-bound") === "1") {
    fetchProfileAvatarFromServer();
    return;
  }
  avatarEl.setAttribute("data-poker-avatar-bound", "1");

  function showAvatarFeedback(text, isError) {
    if (!feedbackEl) return;
    feedbackEl.textContent = text || "";
    feedbackEl.classList.toggle("profile-avatar-block__feedback--visible", !!text);
    feedbackEl.style.color = isError ? "#ef4444" : "";
    if (text && !isError && !/загрузк|сохранение/i.test(text)) {
      var hideMs = /сохранена|загружена|обновлена/i.test(text) ? 5200 : 3500;
      setTimeout(function () {
        if (feedbackEl.textContent === text) {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
        }
      }, hideMs);
    }
  }

  function getProfileAvatarChoiceModal() {
    var modal = document.getElementById("profileAvatarChoiceModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "profileAvatarChoiceModal";
    modal.className = "profile-avatar-choice-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="profile-avatar-choice-modal__backdrop" data-avatar-close="1"></div>' +
      '<div class="profile-avatar-choice-modal__panel" role="dialog" aria-modal="true" aria-labelledby="profileAvatarChoiceTitle">' +
      '<div class="profile-avatar-choice-modal__head">' +
      '<h2 class="profile-avatar-choice-modal__title" id="profileAvatarChoiceTitle">Выберите аватар</h2>' +
      '<button type="button" class="profile-avatar-choice-modal__close" data-avatar-close="1" aria-label="Закрыть">×</button>' +
      "</div>" +
      '<div class="profile-avatar-choice-modal__grid" id="profileAvatarChoiceGrid"></div>' +
      '<div class="profile-avatar-choice-modal__actions">' +
      '<button type="button" class="profile-avatar-choice-modal__upload" data-avatar-upload="1">Загрузить своё фото</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      var closeBtn = e.target && e.target.closest ? e.target.closest("[data-avatar-close]") : null;
      if (closeBtn) {
        closeProfileAvatarChoiceModal();
        return;
      }
      var uploadBtn = e.target && e.target.closest ? e.target.closest("[data-avatar-upload]") : null;
      if (uploadBtn) {
        closeProfileAvatarChoiceModal();
        openProfileAvatarFilePicker();
        return;
      }
      var btn = e.target && e.target.closest ? e.target.closest(".profile-avatar-choice-modal__item[data-avatar-id]") : null;
      if (!btn) return;
      var id = btn.getAttribute("data-avatar-id");
      if (!id) return;
      savePresetAvatar(id);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("profile-avatar-choice-modal--open")) {
        closeProfileAvatarChoiceModal();
      }
    });
    return modal;
  }

  function renderProfileAvatarChoiceGrid() {
    var modal = getProfileAvatarChoiceModal();
    var grid = document.getElementById("profileAvatarChoiceGrid");
    if (!grid) return;
    var currentId = avatarEl.dataset.avatarId || pokerFindPresetAvatarIdBySrc(avatarEl.getAttribute("src") || avatarEl.src || "");
    grid.innerHTML = POKER_PROFILE_AVATAR_PRESETS.map(function (preset) {
      var active = preset.id === currentId;
      return (
        '<button type="button" class="profile-avatar-choice-modal__item' +
        (active ? " profile-avatar-choice-modal__item--active" : "") +
        '" data-avatar-id="' +
        escapeHtml(preset.id) +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '" aria-label="' +
        escapeHtml(preset.label) +
        '">' +
        '<img class="profile-avatar-choice-modal__img" src="' +
        escapeHtml(preset.src) +
        '" alt="" loading="lazy" decoding="async" />' +
        '<span class="profile-avatar-choice-modal__check" aria-hidden="true">✓</span>' +
        "</button>"
      );
    }).join("");
    modal.classList.toggle("profile-avatar-choice-modal--has-active", !!currentId);
  }

  function openProfileAvatarChoiceModal() {
    if (uploadInProgress || avatarPickSessionActive) return;
    renderProfileAvatarChoiceGrid();
    var modal = getProfileAvatarChoiceModal();
    modal.classList.add("profile-avatar-choice-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("profile-avatar-choice-open");
  }

  window.__pokerOpenProfileAvatarChoiceModal = openProfileAvatarChoiceModal;

  function closeProfileAvatarChoiceModal() {
    var modal = document.getElementById("profileAvatarChoiceModal");
    if (!modal) return;
    modal.classList.remove("profile-avatar-choice-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("profile-avatar-choice-open");
  }

  function savePresetAvatar(id) {
    var preset = pokerFindPresetAvatarById(id);
    if (!preset || uploadInProgress) return;
    base = base || getApiBase();
    if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    uploadInProgress = true;
    showAvatarFeedback("Сохранение…", false);
    var payload =
      typeof pokerApiAuthJsonBody === "function"
        ? pokerApiAuthJsonBody({ avatarId: preset.id })
        : { avatarId: preset.id, initData: tg && tg.initData ? tg.initData : "" };
    fetch(base + "/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.ok ? "Некорректный ответ" : "HTTP " + r.status };
        });
      })
      .then(function (data) {
        if (data && data.ok && data.avatar) {
          var newSrc = data.avatar;
          avatarEl.src = newSrc;
          avatarEl.alt = "Аватар";
          avatarEl.dataset.avatarId = data.avatarId || preset.id;
          pokerWriteAvatarCacheEntry(newSrc);
          pokerApplyProfileAvatarMirror(newSrc);
          loadHeaderAvatar();
          renderProfileAvatarChoiceGrid();
          closeProfileAvatarChoiceModal();
          showAvatarFeedback("Аватар сохранён", false);
        } else {
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка сохранения");
          showAvatarFeedback((data && data.error) || "Ошибка сохранения", true);
        }
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        showAvatarFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        uploadInProgress = false;
      });
  }

  function resizeImage(file, maxW, maxH, quality, cb) {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var objUrl = URL.createObjectURL(file);
    img.onload = function () {
      try {
        URL.revokeObjectURL(objUrl);
      } catch (eRev) {}
      var w = img.width, h = img.height;
      if (w > maxW || h > maxH) {
        var r = Math.min(maxW / w, maxH / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      try {
        var dataUrl = canvas.toDataURL("image/jpeg", quality);
        cb(dataUrl);
      } catch (e) {
        var reader = new FileReader();
        reader.onload = function () { cb(reader.result); };
        reader.readAsDataURL(file);
      }
    };
    img.onerror = function () {
      try {
        URL.revokeObjectURL(objUrl);
      } catch (eRev2) {}
      var reader = new FileReader();
      reader.onload = function () { cb(reader.result); };
      reader.readAsDataURL(file);
    };
    img.src = objUrl;
  }

  function openProfileAvatarFilePicker() {
    if (uploadInProgress || avatarPickSessionActive) return;
    base = base || getApiBase();
    if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    /* Сброс перед click: иначе повторный выбор того же файла не даёт событие change (iOS / часть WebKit). */
    try {
      inputEl.value = "";
    } catch (eInp0) {}
    inputEl.click();
  }

  function uploadAvatar(dataUrl) {
    /* Обработка файла закончилась — сессия выбора снята; дальше только uploadInProgress блокирует повторный pick. */
    avatarPickSessionActive = false;
    uploadInProgress = true;
    showAvatarFeedback("Загрузка на сервер…", false);
    var payload =
      typeof pokerApiAuthJsonBody === "function"
        ? pokerApiAuthJsonBody({ image: dataUrl })
        : { image: dataUrl, initData: tg && tg.initData ? tg.initData : "" };
    fetch(base + "/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.ok ? "Некорректный ответ" : "HTTP " + r.status };
        });
      })
      .then(function (data) {
        if (data && data.ok && data.avatar) {
          revokePendingObjectUrl();
          var newSrc = data.avatar;
          pokerWriteAvatarCacheEntry(newSrc);
          try {
            /* Дважды подряд тот же data: URL — часть движков не перерисовывает img без сброса src. */
            if (String(avatarEl.src || "") === String(newSrc)) {
              avatarEl.src = "";
              var rafA = window.requestAnimationFrame || function (fn) {
                setTimeout(fn, 16);
              };
              rafA(function () {
                avatarEl.src = newSrc;
              });
            } else {
              avatarEl.src = newSrc;
            }
          } catch (eSrcA) {
            avatarEl.src = newSrc;
          }
          avatarEl.alt = "Аватар";
          pokerApplyProfileAvatarMirror(newSrc);
          loadHeaderAvatar();
          showAvatarFeedback("Фотография сохранена", false);
        } else {
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка загрузки");
          showAvatarFeedback((data && data.error) || "Ошибка сохранения", true);
          fetchProfileAvatarFromServer();
          setTimeout(function () {
            feedbackEl.textContent = "";
            feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
            feedbackEl.style.color = "";
          }, 4000);
        }
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        showAvatarFeedback(POKER_NET_ERR, true);
        fetchProfileAvatarFromServer();
        setTimeout(function () {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
          feedbackEl.style.color = "";
        }, 4000);
      })
      .finally(function () {
        uploadInProgress = false;
        avatarPickSessionActive = false;
        try {
          inputEl.value = "";
        } catch (eFin) {}
      });
  }

  function uploadAvatarAfterPick(toSend) {
    var base64 = toSend.replace(/^data:image\/\w+;base64,/, "");
    if (base64.length > 430000) {
      var im = new Image();
      var settled = false;
      var tIm = setTimeout(function () {
        if (settled) return;
        settled = true;
        uploadAvatar(toSend);
      }, 12000);
      im.onload = function () {
        if (settled) return;
        clearTimeout(tIm);
        settled = true;
        var canvas = document.createElement("canvas");
        var w = im.width,
          h = im.height;
        var r = Math.min(420 / w, 420 / h, 1);
        w = Math.round(w * r);
        h = Math.round(h * r);
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(im, 0, 0, w, h);
        try {
          uploadAvatar(canvas.toDataURL("image/jpeg", 0.82));
        } catch (eSm) {
          uploadAvatar(toSend);
        }
      };
      im.onerror = function () {
        if (settled) return;
        clearTimeout(tIm);
        settled = true;
        uploadAvatar(toSend);
      };
      im.src = toSend;
    } else {
      uploadAvatar(toSend);
    }
  }

  avatarEl.addEventListener("click", function () {
    openProfileAvatarChoiceModal();
  });
  avatarEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProfileAvatarChoiceModal();
    }
  });

  inputEl.addEventListener("change", function () {
    var file = inputEl.files && inputEl.files[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) {
      if (tg && tg.showAlert) tg.showAlert("Выберите изображение (JPG, PNG или WebP).");
      inputEl.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      if (tg && tg.showAlert) tg.showAlert("Файл не более 5 МБ.");
      inputEl.value = "";
      return;
    }
    avatarPickSessionActive = true;
    revokePendingObjectUrl();
    try {
      objectUrlPending = URL.createObjectURL(file);
      avatarEl.src = objectUrlPending;
      avatarEl.alt = "Аватар";
    } catch (eOb) {}
    resizeImage(file, 512, 512, 0.88, function (dataUrl) {
      try {
        var base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
        if (base64.length > 430000) {
          resizeImage(file, 420, 420, 0.82, function (dataUrl2) {
            try {
              revokePendingObjectUrl();
              avatarEl.src = dataUrl2;
              try {
                inputEl.value = "";
              } catch (eInp1) {}
              uploadAvatarAfterPick(dataUrl2);
            } catch (eRs2) {
              avatarPickSessionActive = false;
              try {
                inputEl.value = "";
              } catch (eInp2) {}
              showAvatarFeedback("Не удалось подготовить фото", true);
              fetchProfileAvatarFromServer();
            }
          });
        } else {
          revokePendingObjectUrl();
          avatarEl.src = dataUrl;
          try {
            inputEl.value = "";
          } catch (eInp3) {}
          uploadAvatarAfterPick(dataUrl);
        }
      } catch (eRs) {
        avatarPickSessionActive = false;
        try {
          inputEl.value = "";
        } catch (eInp4) {}
        showAvatarFeedback("Не удалось подготовить фото", true);
        fetchProfileAvatarFromServer();
      }
    });
  });

  fetchProfileAvatarFromServer();
}

if (!window.__pokerProfileAvatarDelegatedOpenBound) {
  window.__pokerProfileAvatarDelegatedOpenBound = true;
  document.addEventListener(
    "click",
    function (e) {
      var target = e.target && e.target.closest ? e.target.closest("#profileAvatar") : null;
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        if (typeof initProfileAvatar === "function") initProfileAvatar();
      } catch (eInitAvatar) {}
      if (typeof window.__pokerOpenProfileAvatarChoiceModal === "function") {
        window.__pokerOpenProfileAvatarChoiceModal();
      }
    },
    true
  );
  document.addEventListener(
    "keydown",
    function (e) {
      var target = e.target && e.target.closest ? e.target.closest("#profileAvatar") : null;
      if (!target || (e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault();
      try {
        if (typeof initProfileAvatar === "function") initProfileAvatar();
      } catch (eInitAvatarKey) {}
      if (typeof window.__pokerOpenProfileAvatarChoiceModal === "function") {
        window.__pokerOpenProfileAvatarChoiceModal();
      }
    },
    true
  );
}
