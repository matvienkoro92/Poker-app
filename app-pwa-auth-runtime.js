// Авторизация через Telegram: обязательная проверка подписи initData на сервере (/api/auth-telegram)
(function initTelegramAuth() {
  window.__pokerTelegramAuth = { status: "unknown", user: null, error: null };
  try {
    localStorage.removeItem(POKER_PWA_GUEST_KEY);
  } catch (eLegacyGuest) {}

  var banner = document.getElementById("authBanner");
  var bannerLink = document.getElementById("authBannerLink");
  var bannerText = document.getElementById("authBannerText");
  var bannerRetry = document.getElementById("authBannerRetry");
  var userEl = document.getElementById("authUser");
  var appEl = document.getElementById("app");
  var pwaAuthScreenEl = document.getElementById("pwaAuthScreen");
  var pwaAuthLoginMountEl = document.getElementById("pwaAuthLoginMount");
  var telegramAppUrl = (appEl && appEl.getAttribute("data-telegram-app-url")) || "";
  var hintEl = document.getElementById("authBannerHint");
  var identifyingMiniEl = document.getElementById("authIdentifyingMini");
  var authFlowGeneration = 0;
  var pwaAuthLanguageUi = typeof window.pokerInitPwaAuthLanguageUi === "function"
    ? window.pokerInitPwaAuthLanguageUi({ rerender: function () { rerenderCurrentPwaAuthScreen(); } })
    : null;
  var getPwaAuthLocale = pwaAuthLanguageUi && pwaAuthLanguageUi.getLocale ? pwaAuthLanguageUi.getLocale : function () { return "ru"; };
  var setPwaAuthLocale = pwaAuthLanguageUi && pwaAuthLanguageUi.setLocale ? pwaAuthLanguageUi.setLocale : function () {};
  var pwaAuthT = pwaAuthLanguageUi && pwaAuthLanguageUi.t ? pwaAuthLanguageUi.t : function () { return ""; };
  var syncPwaAuthLanguageUi = pwaAuthLanguageUi && pwaAuthLanguageUi.syncAuth ? pwaAuthLanguageUi.syncAuth : function () {};
  var syncProfileLanguageUi = pwaAuthLanguageUi && pwaAuthLanguageUi.syncProfile ? pwaAuthLanguageUi.syncProfile : function () {};
  var syncGlobalAppLanguageUi = pwaAuthLanguageUi && pwaAuthLanguageUi.syncGlobal ? pwaAuthLanguageUi.syncGlobal : function () {};
  var pwaAuthModeRuntime = typeof initPwaAuthModeRuntime === "function" ? initPwaAuthModeRuntime() : {};
  var getTelegramWebAppNow = pwaAuthModeRuntime.getTelegramWebAppNow || function () {
    return isTelegramWebApp() && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  };
  var isPwaStandaloneMode = pwaAuthModeRuntime.isPwaStandaloneMode || function () { return false; };
  var isPwaStandaloneAuth = pwaAuthModeRuntime.isPwaStandaloneAuth || isPwaStandaloneMode;
  var shouldUseOverlayAuthScreen = pwaAuthModeRuntime.shouldUseOverlayAuthScreen || isPwaStandaloneMode;
  var shouldSuppressMiniAppPwaLoginBanner = pwaAuthModeRuntime.shouldSuppressMiniAppPwaLoginBanner || function () { return false; };
  var pwaAuthOverlayContext = {
    appEl: appEl,
    banner: banner,
    bannerLink: bannerLink,
    bannerRetry: bannerRetry,
    hintEl: hintEl,
    identifyingMiniEl: identifyingMiniEl,
    ensureOverlayAuthEntryMounted: ensureOverlayAuthEntryMounted,
    ensurePwaVerificationForm: ensurePwaVerificationForm,
    mountPwaEmailLogin: mountPwaEmailLogin,
    mountPwaUsernameCodeLogin: mountPwaUsernameCodeLogin,
    pwaAuthLoginMountEl: pwaAuthLoginMountEl,
    pwaAuthScreenEl: pwaAuthScreenEl,
    remountPwaStandaloneEnterScreen: remountPwaStandaloneEnterScreen,
    shouldUseOverlayAuthScreen: shouldUseOverlayAuthScreen,
    syncPwaAuthLanguageUi: syncPwaAuthLanguageUi,
  };
  var pwaAuthOverlayRuntime = typeof initPwaAuthOverlayRuntime === "function"
    ? initPwaAuthOverlayRuntime(pwaAuthOverlayContext)
    : {};
  var showPwaAuthScreen = pwaAuthOverlayRuntime.showPwaAuthScreen || function () {};
  var hidePwaAuthScreen = pwaAuthOverlayRuntime.hidePwaAuthScreen || function () {};
  var isOverlayAuthScreenActive = pwaAuthOverlayRuntime.isOverlayAuthScreenActive || function () { return false; };
  var rerenderCurrentPwaAuthScreen = pwaAuthOverlayRuntime.rerenderCurrentPwaAuthScreen || function () {};
  var setPwaAuthScreenNotice = pwaAuthOverlayRuntime.setPwaAuthScreenNotice || function () {};
  var hideLegacyInlineAuthUi = pwaAuthOverlayRuntime.hideLegacyInlineAuthUi || function () {};
  var showIdentifyingMini = pwaAuthOverlayRuntime.showIdentifyingMini || function () {};
  var hideIdentifyingMini = pwaAuthOverlayRuntime.hideIdentifyingMini || function () {};
  var openOverlayAuthEntryScreen = pwaAuthOverlayRuntime.openOverlayAuthEntryScreen || function () {};
  var setPwaAuthIdentifyingPhase = pwaAuthOverlayRuntime.setPwaAuthIdentifyingPhase || function () {};

  var pwaAuthRestoreRuntime = null;
  function restoreSavedPwaAuthBeforeGate() {
    return !!(pwaAuthRestoreRuntime && pwaAuthRestoreRuntime.restoreSavedPwaAuthBeforeGate && pwaAuthRestoreRuntime.restoreSavedPwaAuthBeforeGate());
  }

  /** PWA: экран «идентификация» поверх приложения (не внутри скрытого #app). */
  var PWA_AUTH_IDENTIFY_MIN_MS = 620;

  /* Резерв к data-onauth: иногда eval/callback виджета не срабатывает, а postMessage от oauth.telegram.org всё равно приходит. */
  if (!window.__pokerTelegramOauthMessageBridge) {
    window.__pokerTelegramOauthMessageBridge = true;
    window.addEventListener(
      "message",
      function (ev) {
        try {
          if (!ev || String(ev.origin) !== "https://oauth.telegram.org") return;
          var raw = ev.data;
          var data = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (!data || data.event !== "auth_user" || data.init) return;
          var auth = data.auth_data;
          if (!auth || auth.hash == null || auth.id == null || auth.auth_date == null) return;
          if (typeof window.__pokerTelegramWidgetAuth === "function") {
            window.__pokerTelegramWidgetAuth(auth);
          }
        } catch (eBr) {}
      },
      false
    );
  }

  if (!isTelegramWebApp()) {
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
  } else if (bannerLink && telegramAppUrl && telegramAppUrl.indexOf("t.me") !== -1 && telegramAppUrl.indexOf("YourBotName") === -1) {
    bannerLink.href = telegramAppUrl;
    /* Не показываем «Открыть в Telegram»: во встроенном браузере TG часто есть WebApp, но без initData — нужен Login Widget */
    bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
  } else {
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "block";
  }

  function getVkAppIdForPwa() {
    var el = document.getElementById("app");
    var id = el && el.getAttribute("data-vk-app-id");
    id = id != null ? String(id).trim() : "";
    return /^\d+$/.test(id) ? id : "";
  }

  function deliverVkOAuthCode(code, redirectUri) {
    var base = getTelegramAuthApiBase();
    if (!base) return;
    setBannerVerifying();
    showUnauthorized();
    pokerAuthFetch(base + "/api/auth-vk-pwa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code, redirect_uri: redirectUri }),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var res = pack.res;
        var data = pack.data || {};
        if (res.ok && data.ok && data.user && data.pwaVkSession) {
          var u = normalizeVerifiedUser(data.user, null);
          if (!pokerSavePwaVkSession(data.pwaVkSession, data.user)) pwaSessionPersistenceWarning();
          pokerSavePwaGuestMode(false);
          window.__pokerTelegramAuth = { status: "verified", user: u, error: null };
          pokerMaybeRememberMemberIdFromUser(u);
          pokerSetAuthMethod("vk");
          updateHeaderGreeting();
          showAuthorized(u);
          loadHeaderAvatar();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, vk: true } }));
          } catch (eVk) {}
          try {
            var uUrl = new URL(window.location.href);
            uUrl.searchParams.delete("code");
            uUrl.searchParams.delete("state");
            window.history.replaceState({}, "", uUrl.pathname + uUrl.search + uUrl.hash);
          } catch (eU) {}
          return;
        }
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure(data && data.error ? String(data.error) : "Не удалось войти через ВКонтакте.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      })
      .catch(function () {
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure("Ошибка сети при входе через ВКонтакте.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      });
  }

  function tryFinishVkOAuth() {
    try {
      var sp = new URLSearchParams(window.location.search || "");
      var code = sp.get("code");
      var state = sp.get("state") || "";
      if (!code || state !== "vk_pwa") return false;
      var redirect = window.location.origin + "/";
      deliverVkOAuthCode(code, redirect);
      return true;
    } catch (eVk2) {
      return false;
    }
  }

  /** В WebView Mini App редирект после Login Widget часто ломается — выход в системный браузер. */
  function mountTelegramExternalBrowserEscapeBtn(mount) {
    if (!mount || isPwaAuthLocalHost() || !isTelegramWebApp()) return;
    if (mount.querySelector(".auth-banner__external-browser-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "auth-banner__external-browser-btn";
    btn.textContent = "Открыть в браузере для входа";
    btn.addEventListener("click", function () {
      var wtg = getTelegramWebAppNow();
      var u = getTelegramWidgetAuthCallbackUrl();
      if (!u || !/^https:\/\//i.test(u)) {
        try {
          u = (getTelegramAuthApiBase() || window.location.origin).replace(/\/$/, "") + "/";
        } catch (eO) {
          u = "";
        }
      }
      if (wtg && typeof wtg.openLink === "function") {
        try {
          wtg.openLink(u, { try_instant_view: false });
        } catch (eL) {
          try {
            wtg.openLink(u);
          } catch (eL2) {}
        }
      } else if (u) {
        window.open(u, "_blank", "noopener,noreferrer");
      }
    });
    mount.appendChild(btn);
  }

  /** Опционально в #app: data-telegram-bot-id="123456789" — иначе id подтягивается с GET /api/telegram-bot-info */
  function getTelegramBotIdFromAppAttr() {
    var el = document.getElementById("app");
    var raw = el && el.getAttribute("data-telegram-bot-id");
    raw = raw != null ? String(raw).trim() : "";
    if (!/^\d+$/.test(raw)) return 0;
    var n = parseInt(raw, 10);
    return n > 0 ? n : 0;
  }

  function whenTelegramWidgetJsReady(cb) {
    if (typeof cb !== "function") return;
    if (window.Telegram && window.Telegram.Login && typeof window.Telegram.Login.auth === "function") {
      cb();
      return;
    }
    var n = 0;
    var t = setInterval(function () {
      n += 1;
      if (window.Telegram && window.Telegram.Login && typeof window.Telegram.Login.auth === "function") {
        clearInterval(t);
        cb();
        return;
      }
      if (n >= 60) {
        clearInterval(t);
      }
    }, 100);
  }

  /**
   * Запасной вход: официальный popup oauth.telegram.org (не iframe на странице).
   * Помогает, когда postMessage из встроенного виджета не доходит до родителя.
   */
  function mountTelegramLoginPopupButton(mount) {
    if (!mount || isPwaAuthLocalHost()) return;
    if (mount.querySelector(".auth-banner__tg-popup-login-btn")) return;
    function addBtn(botIdNum) {
      if (!botIdNum || botIdNum < 1) return;
      if (mount.querySelector(".auth-banner__tg-popup-login-btn")) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "auth-banner__tg-popup-login-btn";
      btn.textContent = "Войти через Telegram (отдельное окно)";
      btn.addEventListener("click", function () {
        if (!window.Telegram || !window.Telegram.Login || typeof window.Telegram.Login.auth !== "function") {
          if (hintEl) {
            hintEl.textContent = "Подождите загрузки страницы или обновите её, затем нажмите снова.";
            hintEl.style.display = "block";
          }
          return;
        }
        try {
          window.Telegram.Login.auth({ bot_id: botIdNum }, function (user) {
            if (user && typeof window.__pokerTelegramWidgetAuth === "function") {
              window.__pokerTelegramWidgetAuth(user);
            }
          });
        } catch (ePop) {
          setBannerFailure(
            "Не удалось открыть окно входа. Разрешите всплывающие окна для сайта или откройте страницу в обычном браузере.",
            false
          );
        }
      });
      mount.appendChild(btn);
    }
    var botIdAttr = getTelegramBotIdFromAppAttr();
    if (botIdAttr > 0) {
      whenTelegramWidgetJsReady(function () {
        addBtn(botIdAttr);
      });
      return;
    }
    if (mount.getAttribute("data-tg-popup-fetch-started") === "1") return;
    mount.setAttribute("data-tg-popup-fetch-started", "1");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    pokerFetchWithTimeout(base + "/api/telegram-bot-info", { method: "GET", cache: "no-store" }, 14000)
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var d = pack.data || {};
        if (pack.res.ok && d.ok && d.botId != null) {
          var id = parseInt(d.botId, 10);
          if (id > 0) {
            whenTelegramWidgetJsReady(function () {
              addBtn(id);
            });
            return;
          }
        }
        try {
          mount.removeAttribute("data-tg-popup-fetch-started");
        } catch (eR) {}
      })
      .catch(function () {
        try {
          mount.removeAttribute("data-tg-popup-fetch-started");
        } catch (eR2) {}
      });
  }

  function mountVkLoginForPwa(mount) {
    if (!mount || isPwaAuthLocalHost()) return;
    var appId = getVkAppIdForPwa();
    if (!appId) return;
    if (mount.querySelector(".auth-banner__vk-login-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "auth-banner__vk-login-btn";
    btn.textContent = "Войти через ВКонтакте";
    btn.addEventListener("click", function () {
      var redirect = window.location.origin + "/";
      var authUrl =
        "https://oauth.vk.com/authorize?client_id=" +
        encodeURIComponent(appId) +
        "&display=page&redirect_uri=" +
        encodeURIComponent(redirect) +
        "&response_type=code&state=vk_pwa&v=5.131";
      window.location.href = authUrl;
    });
    mount.appendChild(btn);
  }

  function mountPwaUsernameCodeLogin(mount, initialMode) {
    if (typeof window.pokerMountPwaUsernameCodeLogin !== "function") return;
    return window.pokerMountPwaUsernameCodeLogin(mount, initialMode, {
      telegramAppUrl: telegramAppUrl,
      shouldUseOverlayAuthScreen: shouldUseOverlayAuthScreen,
      isOverlayAuthScreenActive: isOverlayAuthScreenActive,
      remountCurrentAuthEnterScreen: remountCurrentAuthEnterScreen,
      updateHeaderGreeting: updateHeaderGreeting,
      showAuthorized: showAuthorized,
      loadHeaderAvatar: loadHeaderAvatar
    });
  }

  function ensurePwaVerificationForm(mount) {
    if (!mount) return null;
    if (shouldUseOverlayAuthScreen()) {
      if (!mount.querySelector(".pwa-auth-screen__enter-actions, .auth-banner__email-login, .auth-banner__code-login")) {
        try {
          mount.innerHTML = "";
        } catch (eClearOverlayVerify) {}
      }
      return mount;
    }
    var form = mount.querySelector(".auth-banner__verify-form");
    if (!form) {
      mount.innerHTML =
        '<div class="auth-banner__verify-form">' +
          '<div class="auth-banner__verify-actions"></div>' +
        "</div>";
      form = mount.querySelector(".auth-banner__verify-form");
    }
    return form ? form.querySelector(".auth-banner__verify-actions") : null;
  }

  var pwaAuthEntryScreenRuntime = typeof initPwaAuthEntryScreenRuntime === "function"
    ? initPwaAuthEntryScreenRuntime({
      pwaAuthT: pwaAuthT,
      getPwaAuthLoginMountEl: function () { return pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount"); },
      shouldUseOverlayAuthScreen: shouldUseOverlayAuthScreen,
      isOverlayAuthScreenActive: isOverlayAuthScreenActive,
      ensurePwaVerificationForm: ensurePwaVerificationForm,
      mountPwaEmailLogin: mountPwaEmailLogin,
      mountPwaUsernameCodeLogin: mountPwaUsernameCodeLogin,
      pokerSavePwaGuestMode: pokerSavePwaGuestMode,
      updateHeaderGreeting: updateHeaderGreeting,
      updateProfileExitBtnVisibility: updateProfileExitBtnVisibility,
      hidePwaAuthScreen: hidePwaAuthScreen,
      hideIdentifyingMini: hideIdentifyingMini,
      showPwaAuthScreen: showPwaAuthScreen,
      setPwaAuthIdentifyingPhase: setPwaAuthIdentifyingPhase,
      resetBannerForPwaLogin: resetBannerForPwaLogin,
      getBanner: function () { return banner; },
    })
    : {};
  function mountPwaStandaloneEnterButton() {
    return !!(pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.mountPwaStandaloneEnterButton && pwaAuthEntryScreenRuntime.mountPwaStandaloneEnterButton());
  }

  function mountMiniAppAuthEnterButtons() {
    return !!(pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.mountMiniAppAuthEnterButtons && pwaAuthEntryScreenRuntime.mountMiniAppAuthEnterButtons());
  }

  function remountPwaStandaloneEnterScreen() {
    if (pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.remountPwaStandaloneEnterScreen) pwaAuthEntryScreenRuntime.remountPwaStandaloneEnterScreen();
  }

  function ensureOverlayAuthEntryMounted() {
    return !!(pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.ensureOverlayAuthEntryMounted && pwaAuthEntryScreenRuntime.ensureOverlayAuthEntryMounted());
  }

  function remountCurrentAuthEnterScreen() {
    if (pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.remountCurrentAuthEnterScreen) pwaAuthEntryScreenRuntime.remountCurrentAuthEnterScreen();
  }

  function showPwaStandaloneEntryScreen() {
    if (pwaAuthEntryScreenRuntime && pwaAuthEntryScreenRuntime.showPwaStandaloneEntryScreen) pwaAuthEntryScreenRuntime.showPwaStandaloneEntryScreen();
  }

  function mountPwaEmailLogin(mount, initialMode) {
    if (typeof window.pokerMountPwaEmailLogin !== "function") return;
    return window.pokerMountPwaEmailLogin(mount, initialMode, {
      remountCurrentAuthEnterScreen: remountCurrentAuthEnterScreen,
      updateHeaderGreeting: updateHeaderGreeting,
      showAuthorized: showAuthorized,
      loadHeaderAvatar: loadHeaderAvatar
    });
  }

  function showAuthorized(user) {
    bumpAuthFlowGeneration();
    pokerSetHomeAuthResolved(true);
    try {
      if (typeof setView === "function") setView("home");
    } catch (eSetHomeAfterAuth) {}
    if (userEl) {
      var textEl = userEl.querySelector("#authUserText");
      if (textEl) {
        var dn = pokerPreferredProfileDisplayName() || telegramUserDisplayName(user);
        textEl.textContent = dn ? "Привет, " + dn + "!" : "Вы вошли";
      }
      userEl.classList.remove("auth-user--hidden");
      loadHeaderAvatar();
    }
    if (banner) {
      banner.classList.add("auth-banner--hidden");
      banner.classList.remove("auth-banner--verifying");
    }
    hidePwaAuthScreen();
    hideIdentifyingMini();
    if (bannerRetry) bannerRetry.hidden = true;
    syncSiteHomeInstructionMode();
    try {
      if (typeof updateProfileExitBtnVisibility === "function") updateProfileExitBtnVisibility();
      if (typeof syncProfileEmailAuthUi === "function") syncProfileEmailAuthUi();
    } catch (eProfileSyncAuth) {}
    try {
      if (typeof pokerForceClosePwaAuthScreenAfterSuccess === "function") pokerForceClosePwaAuthScreenAfterSuccess();
    } catch (eForceCloseAuthUi) {}
  }

  function hasActiveVerifiedAuthState() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) return true;
    } catch (eAuthState) {}
    return false;
  }

  function showUnauthorized(force) {
    if (!force && hasActiveVerifiedAuthState()) {
      try {
        pokerSetHomeAuthResolved(true);
        hidePwaAuthScreen();
        hideIdentifyingMini();
        if (banner) {
          banner.classList.add("auth-banner--hidden");
          banner.classList.remove("auth-banner--verifying");
        }
        if (userEl) userEl.classList.remove("auth-user--hidden");
        syncSiteHomeInstructionMode();
      } catch (eKeepAuth) {}
      return;
    }
    if (!force) {
      try {
        var hasStoredSessionForRestore =
          (typeof pokerReadPwaTgSessionToken === "function" && pokerReadPwaTgSessionToken()) ||
          (typeof pokerReadPwaVkSessionToken === "function" && pokerReadPwaVkSessionToken());
        var authNow = window.__pokerTelegramAuth;
        var canTryStoredSession =
          hasStoredSessionForRestore &&
          !(authNow && (authNow.status === "invalid" || authNow.status === "guest"));
        if (canTryStoredSession && typeof attemptPwaSideAuthRestoreAsync === "function") {
          try {
            setPwaAuthIdentifyingPhase(true);
          } catch (eIdStored) {}
          attemptPwaSideAuthRestoreAsync().then(function (restored) {
            try {
              setPwaAuthIdentifyingPhase(false);
            } catch (eIdStoredOff) {}
            if (!restored) showUnauthorized(true);
          });
          return;
        }
      } catch (eStoredRestore) {}
    }
    pokerSetHomeAuthResolved(false);
    if (userEl) userEl.classList.add("auth-user--hidden");
    if (shouldUseOverlayAuthScreen()) {
      if (pokerReadPwaGuestMode()) {
        try {
          window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        } catch (eGuest) {}
        updateHeaderGreeting();
        try {
          if (typeof window.__pokerResetHeaderPoker21GuestStatus === "function") window.__pokerResetHeaderPoker21GuestStatus();
        } catch (eGuestFish) {}
        hidePwaAuthScreen();
        hideIdentifyingMini();
        if (banner) banner.classList.add("auth-banner--hidden");
        return;
      }
      if (banner) banner.classList.add("auth-banner--hidden");
      showPwaStandaloneEntryScreen();
    } else {
      if (banner) banner.classList.add("auth-banner--hidden");
    }
  }

  function setHeaderGreetingLoginActive(active) {
    var el = document.getElementById("headerGreeting");
    if (!el) return;
    var on = !!active;
    var statusActive = !on && pokerHeaderPoker21Linked();
    el.classList.toggle("header-greeting--auth", on);
    el.classList.toggle("header-greeting--status", statusActive);
    if ("disabled" in el) el.disabled = !(on || statusActive);
    if (on) {
      el.setAttribute("title", "Войти в аккаунт");
      el.setAttribute("aria-label", "Войти в аккаунт");
    } else if (statusActive) {
      el.setAttribute("title", "Игроки по уровню");
      el.setAttribute("aria-label", "Открыть игроков по уровню");
    } else {
      el.removeAttribute("title");
      el.removeAttribute("aria-label");
    }
  }

  function pokerHeaderPoker21Linked() {
    try {
      return window.__pokerHeaderPoker21Linked === true;
    } catch (eLinked) {
      return false;
    }
  }

  function pokerHeaderPoker21Nickname() {
    try {
      return String(window.__pokerHeaderPoker21Nickname || "").trim();
    } catch (eName) {
      return "";
    }
  }

  function openHeaderPoker21Levels(e) {
    if (typeof window.__pokerOpenHallFishRatingModal === "function") {
      window.__pokerOpenHallFishRatingModal(e);
      return;
    }
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (typeof window.openHallFishRatingModal === "function") {
      window.openHallFishRatingModal();
      return;
    }
    var deadline = Date.now() + 6000;
    function openWhenReady() {
      if (typeof window.openHallFishRatingModal === "function") {
        window.openHallFishRatingModal();
        return;
      }
      if (Date.now() <= deadline) setTimeout(openWhenReady, 32);
    }
    openWhenReady();
  }

  function formatHeaderGreeting(name) {
    var displayName = name != null ? String(name).trim() : "";
    return displayName ? "Привет, " + displayName + "!" : "Привет!";
  }

  function updateHeaderGreeting() {
    var el = document.getElementById("headerGreeting");
    syncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
      window.__pokerSyncProfileGuestWebsiteMode();
    }
    if (!el) return;
    if (isSiteHomeInstructionMode()) {
      setHeaderGreetingLoginActive(true);
      el.textContent = "Войти";
      return;
    }
    setHeaderGreetingLoginActive(false);
    var poker21Name = pokerHeaderPoker21Nickname();
    if (poker21Name) {
      el.textContent = formatHeaderGreeting(poker21Name);
      return;
    }
    var profileName = pokerPreferredProfileDisplayName();
    if (profileName) {
      el.textContent = formatHeaderGreeting(profileName);
      return;
    }
    var u = null;
    var auth = window.__pokerTelegramAuth;
    if (auth && (auth.status === "invalid" || auth.status === "network")) {
      u = null;
    } else if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) {
      u = auth.user;
    } else {
      var tgGreeting = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgGreeting && tgGreeting.initDataUnsafe && tgGreeting.initDataUnsafe.user) {
        u = tgGreeting.initDataUnsafe.user;
      }
    }
    var dn = telegramUserDisplayName(u);
    el.textContent = formatHeaderGreeting(dn);
  }
  window.__pokerUpdateHeaderGreeting = updateHeaderGreeting;

  function hasResolvedHomeAuthUser() {
    try {
      if (window.__pokerHomeAuthResolved === true) return true;
    } catch (eHomeFlag) {}
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && (auth.status === "invalid" || auth.status === "network" || auth.status === "guest")) return false;
      if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) return true;
    } catch (eAuthHome) {}
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return true;
    } catch (eCredHome) {}
    try {
      var tgNow = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgNow && tgNow.initDataUnsafe && tgNow.initDataUnsafe.user) return true;
    } catch (eTgHome) {}
    try {
      if (pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken()) return true;
    } catch (eSessionHome) {}
    return false;
  }

  function isSiteHomeInstructionMode() {
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    var bodyView = document.body && document.body.getAttribute("data-view");
    return !isStandaloneMode && !hasResolvedAuth && bodyView === "home";
  }

  function isTelegramHomeInstructionMode() {
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    var bodyView = document.body && document.body.getAttribute("data-view");
    return !isStandaloneMode && isTelegramMini && bodyView === "home";
  }

  function syncSiteHomeInstructionMode() {
    var root = document.documentElement;
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    var isSiteMode = isSiteHomeInstructionMode();
    var isTelegramMode = isTelegramHomeInstructionMode();
    var showInstructionBtn = isSiteMode || isTelegramMode;
    var instructionBtn = document.getElementById("siteHomeInstructionBtn");
    var authBtn = document.getElementById("siteHomeAuthBtn");
    var pwaInstallBtn = document.getElementById("pwaInstallBtn");
    var greetingArrow = document.getElementById("headerGreetingArrow");
    var hideInstructionBtn = !showInstructionBtn || isStandaloneMode;
    if (root) root.classList.toggle("site-home-header-mode", isSiteMode);
    if (instructionBtn) {
      instructionBtn.hidden = hideInstructionBtn;
      if (hideInstructionBtn) instructionBtn.style.display = "none";
      else instructionBtn.style.removeProperty("display");
    }
    if (authBtn) syncHeaderAuthMenuButton();
    if (pwaInstallBtn && isTelegramMode) {
      pwaInstallBtn.hidden = true;
      pwaInstallBtn.style.display = "none";
    } else if (pwaInstallBtn) {
      pwaInstallBtn.style.removeProperty("display");
    }
    if (greetingArrow) greetingArrow.hidden = !isSiteMode;
    setHeaderGreetingLoginActive(isSiteMode && !hasResolvedAuth && !isStandaloneMode);
    bindSharedAccountAuthTriggers();
  }
  window.__pokerSyncSiteHomeInstructionMode = syncSiteHomeInstructionMode;

  function handleSharedAccountAuthClick(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    openSharedAccountAuthFlow({ forceOverlay: true });
  }

  function headerAuthMenuHasAccountSession() {
    var hasSession = false;
    var isGuest = false;
    try {
      hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    } catch (eSession) {}
    try {
      var auth = window.__pokerTelegramAuth;
      isGuest = !!(auth && auth.status === "guest");
      if (!isGuest && typeof pokerReadPwaGuestMode === "function") isGuest = !!pokerReadPwaGuestMode();
    } catch (eGuest) {}
    return !!(hasSession && !isGuest);
  }

  function closeHeaderMoreMenuFromAction(btn) {
    var menu = btn && btn.closest ? btn.closest(".header-more-menu") : null;
    if (!menu) return;
    menu.hidden = true;
    var toggle = document.getElementById("headerMoreMenuBtn");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    }
  }

  function syncHeaderAuthMenuButton() {
    var authBtn = document.getElementById("siteHomeAuthBtn");
    if (!authBtn) return;
    var isLogout = headerAuthMenuHasAccountSession();
    var label = authBtn.querySelector(".header-menu-action__title");
    var hint = authBtn.querySelector(".header-menu-action__hint");
    var icon = authBtn.querySelector(".header-menu-action__icon");
    var text = isLogout ? "Выйти из аккаунта" : "Войти в аккаунт";
    authBtn.hidden = false;
    authBtn.style.removeProperty("display");
    authBtn.dataset.headerAuthAction = isLogout ? "logout" : "login";
    authBtn.classList.toggle("header-menu-action--logout", isLogout);
    authBtn.title = text;
    authBtn.setAttribute("aria-label", text);
    if (label) label.textContent = text;
    if (hint) hint.textContent = isLogout ? "Сменить пользователя" : "Аккаунт клуба";
    if (icon) icon.textContent = isLogout ? "🚪" : "🔐";
  }
  window.__pokerSyncHeaderAuthMenuButton = syncHeaderAuthMenuButton;

  function handleHeaderAuthMenuClick(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    var target = e && e.currentTarget ? e.currentTarget : e && e.target;
    closeHeaderMoreMenuFromAction(target);
    if (headerAuthMenuHasAccountSession()) {
      if (typeof window.__pokerClearSessionsAndReloadForLogin === "function") {
        window.__pokerClearSessionsAndReloadForLogin();
      } else if (window.location && typeof window.location.reload === "function") {
        window.location.reload();
      }
      return;
    }
    openSharedAccountAuthFlow({ forceOverlay: true });
  }

  function bindSharedAccountAuthTriggers() {
    var authBtn = document.getElementById("siteHomeAuthBtn");
    var greetingBtn = document.getElementById("headerGreeting");
    if (authBtn && authBtn.dataset.accountMenuBound !== "1") {
      authBtn.dataset.accountMenuBound = "1";
      authBtn.addEventListener("click", handleHeaderAuthMenuClick);
    }
    if (greetingBtn && greetingBtn.dataset.authEntryBound !== "1") {
      greetingBtn.dataset.authEntryBound = "1";
      greetingBtn.addEventListener("click", function (e) {
        if (pokerHeaderPoker21Linked()) {
          openHeaderPoker21Levels(e);
          return;
        }
        if (!isSiteHomeInstructionMode()) return;
        handleSharedAccountAuthClick(e);
      });
    }
  }

  function initSiteHomeInstructionModal() {
    var modal = document.getElementById("siteHomeInstructionModal");
    var openBtn = document.getElementById("siteHomeInstructionBtn");
    var closeBtn = document.getElementById("siteHomeInstructionModalClose");
    var backdrop = document.getElementById("siteHomeInstructionModalBackdrop");
    var tabIphone = document.getElementById("siteHomeInstructionTabIphone");
    var tabAndroid = document.getElementById("siteHomeInstructionTabAndroid");
    var panelIphone = document.getElementById("siteHomeInstructionPanelIphone");
    var panelAndroid = document.getElementById("siteHomeInstructionPanelAndroid");
    if (!modal || !openBtn || !closeBtn || !backdrop) return;

    function setTab(name) {
      var iphoneOn = name !== "android";
      if (tabIphone) {
        tabIphone.classList.toggle("club-charter-modal__menu-item--active", iphoneOn);
        tabIphone.setAttribute("aria-selected", iphoneOn ? "true" : "false");
      }
      if (tabAndroid) {
        tabAndroid.classList.toggle("club-charter-modal__menu-item--active", !iphoneOn);
        tabAndroid.setAttribute("aria-selected", iphoneOn ? "false" : "true");
      }
      if (panelIphone) panelIphone.hidden = !iphoneOn;
      if (panelAndroid) panelAndroid.hidden = iphoneOn;
    }

    function openModal() {
      setTab("iphone");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("club-charter-modal-open");
      try {
        if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
      } catch (eTgInstructionOpen) {}
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      if (!document.querySelector('.club-charter-modal[aria-hidden="false"]')) {
        document.documentElement.classList.remove("club-charter-modal-open");
      }
    }

    function handleOpenInstructionModal(e) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      openModal();
    }
    openBtn.onclick = handleOpenInstructionModal;
    openBtn.addEventListener("pointerdown", handleOpenInstructionModal, { passive: false, capture: true });
    openBtn.addEventListener("touchstart", handleOpenInstructionModal, { passive: false });
    openBtn.addEventListener("click", handleOpenInstructionModal);
    bindSharedAccountAuthTriggers();
    if (tabIphone) tabIphone.addEventListener("click", function () { setTab("iphone"); });
    if (tabAndroid) tabAndroid.addEventListener("click", function () { setTab("android"); });
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
    window.__pokerOpenSiteHomeInstructionModal = openModal;
  }
  window.__pokerInitSiteHomeInstructionModal = initSiteHomeInstructionModal;

  function openSharedAccountAuthFlow(opts) {
    try {
      var forceOverlay = !!(opts && opts.forceOverlay === true);
      var wtg = getTelegramWebAppNow();
      if (wtg && wtg.initData) { runVerifyFlow(); return; }
      if (forceOverlay || shouldUseOverlayAuthScreen()) openOverlayAuthEntryScreen();
      else { resetBannerForPwaLogin(); mountTelegramLoginWidgetForPwa();
        if (banner) { banner.classList.remove("auth-banner--hidden"); try { banner.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (eScroll) {} } }
    } catch (eOpenPwaLogin) {}
  }
  window.__pokerOpenSharedAccountAuthFlow = openSharedAccountAuthFlow;
  window.__pokerOpenLogin = openSharedAccountAuthFlow;

  function bindSharedLoginActionButtons() {
    var root = document.documentElement || document.body;
    if (!root || root.dataset.pokerLoginActionBound === "1") return;
    root.dataset.pokerLoginActionBound = "1";
    document.addEventListener("click", function (e) {
      var target = e && e.target;
      var btn = target && target.closest ? target.closest("[data-poker-login-action]") : null;
      if (!btn) return;
      handleSharedAccountAuthClick(e);
    });
  }
  window.__pokerBindSharedLoginActionButtons = bindSharedLoginActionButtons;
  bindSharedLoginActionButtons();

  function isWebsiteGuestProfileMode() {
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    var isPwaGuest = false;
    try {
      isPwaGuest = !!pokerReadPwaGuestMode();
    } catch (ePwaGuestProfile) {}
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    return !hasSession && !hasResolvedAuth && !isStandaloneMode && !isPwaGuest;
  }

  function syncProfileGuestWebsiteMode() {
    var chatRow = document.getElementById("profileChatNameRow");
    var saveWrap = document.getElementById("profileChatNameSaveWrap");
    var personalSection = document.getElementById("profilePersonalSection");
    var guestMode = isWebsiteGuestProfileMode();
    if (chatRow) chatRow.classList.toggle("profile-guest-hidden", guestMode);
    if (saveWrap) saveWrap.classList.toggle("profile-guest-hidden", guestMode);
    if (personalSection) personalSection.classList.toggle("profile-guest-hidden", guestMode);
    syncProfileStatusVisibility(!guestMode);
    syncProfileVerifiedContentVisibility(!guestMode);
  }
  window.__pokerSyncProfileGuestWebsiteMode = syncProfileGuestWebsiteMode;

  function setBannerVerifying() {
    if (shouldUseOverlayAuthScreen()) {
      hideLegacyInlineAuthUi();
      setPwaAuthScreenNotice("");
      showPwaAuthScreen();
      setPwaAuthIdentifyingPhase(true);
      return;
    }
    if (!shouldUseOverlayAuthScreen()) {
      if (banner) banner.classList.add("auth-banner--hidden");
      /* Mini App: баннер убран из DOM раньше ломал виджет; полоса «идентификация» должна быть видна */
      showIdentifyingMini();
      return;
    }
    if (bannerText) bannerText.textContent = "Профиль прогружается…";
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
    if (bannerRetry) bannerRetry.hidden = true;
    if (banner) {
      banner.classList.remove("auth-banner--hidden");
      banner.classList.add("auth-banner--verifying");
    }
    showIdentifyingMini();
  }

  function setBannerFailure(message, showRetry) {
    if (shouldUseOverlayAuthScreen()) {
      setPwaAuthIdentifyingPhase(false);
      openOverlayAuthEntryScreen();
      setPwaAuthScreenNotice(message || "Вход не подтверждён.");
      return;
    }
    if (!shouldUseOverlayAuthScreen()) {
      hideIdentifyingMini();
      if (bannerText) bannerText.textContent = message || "Вход не подтверждён.";
      if (banner) {
        banner.classList.remove("auth-banner--verifying");
        if (shouldSuppressMiniAppPwaLoginBanner()) {
          banner.classList.add("auth-banner--hidden");
        } else {
          banner.classList.remove("auth-banner--hidden");
        }
      }
      if (bannerRetry) bannerRetry.hidden = !showRetry;
      if (bannerLink) bannerLink.style.display = "none";
      return;
    }
    if (bannerText) bannerText.textContent = message || "Вход не подтверждён.";
    if (banner) {
      banner.classList.remove("auth-banner--verifying");
      banner.classList.remove("auth-banner--hidden");
    }
    hideIdentifyingMini();
    if (bannerRetry) bannerRetry.hidden = !showRetry;
    if (bannerLink) bannerLink.style.display = "none";
  }

  function resetBannerForPwaLogin() {
    if (shouldUseOverlayAuthScreen()) {
      hideLegacyInlineAuthUi();
      setPwaAuthScreenNotice("");
      return;
    }
    if (bannerText) bannerText.textContent = "";
    if (banner) banner.classList.add("auth-banner--hidden");
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) {
      hintEl.textContent = "";
      hintEl.style.display = "none";
    }
    hideIdentifyingMini();
    if (!shouldUseOverlayAuthScreen()) return;
    var cb = getTelegramWidgetAuthCallbackUrl();
    var dom = "";
    try {
      dom = new URL(cb).hostname;
    } catch (eDom) {}
    if (bannerText) {
      if (isPwaAuthLocalHost()) {
        bannerText.textContent =
          "Локальный запуск: кнопка «Войти через Telegram» здесь не работает — в BotFather привязан боевой домен. Используйте ссылку ниже или откройте Mini App в Telegram.";
      } else if (isTelegramWebApp()) {
        bannerText.textContent =
          "После «подтвердите в Telegram» переключитесь в приложение Telegram (свайп снизу / кнопка «Домой») и нажмите «Принять» / «Разрешить» в диалоге — нового сообщения в списке чатов может не быть. Затем вернитесь в Mini App. Не помогает — «Открыть в браузере для входа».";
      } else {
        bannerText.textContent =
          "Вход с сайта: нажмите «Log in / Войти через Telegram» — подтвердите в приложении Telegram. Telegram сам решает, нужен ли номер или подтверждение по аккаунту. Если код/подтверждение не приходит — проверьте «Избранное / Saved Messages» и чат с ботом и попробуйте «Войти через Telegram (отдельное окно)».";
      }
    }
    if (banner) banner.classList.remove("auth-banner--verifying");
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    hideIdentifyingMini();
    if (hintEl) {
      if (isPwaAuthLocalHost()) {
        var elApp = document.getElementById("app");
        var prodBase = elApp && elApp.getAttribute("data-api-base");
        prodBase = prodBase ? String(prodBase).trim().replace(/\/$/, "") : "";
        hintEl.textContent =
          "Сообщение «Bot domain invalid» на localhost — нормально. Вход через виджет только на развёрнутом сайте (тот же домен, что в @BotFather)." +
          (prodBase ? " Боевой URL: " + prodBase : "");
      } else if (isTelegramWebApp()) {
        hintEl.textContent =
          "Текст «сообщение отправлено в Telegram» — это не обязательно новый чат: чаще нужно открыть само приложение Telegram и подтвердить запрос там. Уведомление может быть в шторке, а не в списке диалогов. После подтверждения вернитесь в Mini App — страница должна обновить вход. Домен в @BotFather: " +
          (dom || "example.com") +
          ". URL возврата: " +
          cb +
          ".";
      } else {
        hintEl.textContent =
          "Подтверждение — в приложении Telegram; в адресе страницы могут появиться параметры id и hash (это не SMS-код). Если вы не получили код/подтверждение, откройте «Избранное / Saved Messages» и чат с ботом (или попробуйте вход через «отдельное окно»). Домен в @BotFather (/setdomain) — hostname, например " +
          (dom || "example.com") +
          ", без https://. Страница: " +
          cb +
          ".";
      }
      hintEl.style.display = "block";
    }
  }

  /** Отправка данных виджета на сервер (и редирект с ?hash=… в URL, и callback data-onauth). */
  function deliverTelegramLoginWidgetPayload(payload, stripUrlParams) {
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var sig =
      payload && payload.hash != null && payload.id != null && payload.auth_date != null
        ? "tglog:" + String(payload.hash) + ":" + String(payload.id) + ":" + String(payload.auth_date)
        : "";
    if (sig) {
      if (window.__pokerTgLoginInflightSig === sig) return;
      window.__pokerTgLoginInflightSig = sig;
    }
    var authLinkDtIdHint =
      (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
      sessionStorage.getItem("poker_dt_id") ||
      "";
    var authLinkPwaSession = typeof pokerReadEmailPwaSessionToken === "function" ? pokerReadEmailPwaSessionToken() : "";
    setBannerVerifying();
    showUnauthorized();
    pokerAuthFetch(base + "/api/auth-telegram-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, payload, {
          dtIdHint: authLinkDtIdHint,
          linkPwaSession: authLinkPwaSession,
        })
      ),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var res = pack.res;
        var data = pack.data || {};
        if (res.ok && data.ok && data.user && data.pwaSession) {
          var u = normalizeVerifiedUser(data.user, null);
          if (
            !pokerSavePwaTgSession(
              data.pwaSession,
              data.user,
              {
                gazettePlannerAccess: data.gazettePlannerAccess === true,
                adminAccess: data.adminAccess === true,
                adminReportAccess: data.adminReportAccess === true,
                authMethod: "telegram",
              }
            )
          )
            pwaSessionPersistenceWarning();
          pokerSavePwaGuestMode(false);
          var _authTgWidget = { status: "verified", user: u, error: null };
          if (data.gazettePlannerAccess === true) _authTgWidget.gazettePlannerAccess = true;
          if (data.adminAccess === true) _authTgWidget.adminAccess = true;
          if (data.adminReportAccess === true) _authTgWidget.adminReportAccess = true;
          window.__pokerTelegramAuth = _authTgWidget;
          pokerMaybeRememberMemberIdFromUser(u);
          pokerSetAuthMethod("telegram");
          updateHeaderGreeting();
          showAuthorized(u);
          loadHeaderAvatar();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true } }));
          } catch (e2) {}
          if (stripUrlParams) {
            try {
              var uUrl = new URL(window.location.href);
              ["id", "first_name", "last_name", "username", "photo_url", "auth_date", "hash"].forEach(function (k) {
                uUrl.searchParams.delete(k);
              });
              var lh = String(uUrl.hash || "");
              if (lh) {
                var stripped = lh.replace(/[#?&]tgAuthResult=[A-Za-z0-9\-_=]*/, "");
                uUrl.hash = stripped === "#" || stripped === "" ? "" : stripped;
              }
              window.history.replaceState({}, "", uUrl.pathname + uUrl.search + uUrl.hash);
            } catch (eU) {}
          }
          return;
        }
        if (sig) {
          try {
            window.__pokerTgLoginInflightSig = "";
          } catch (eSig) {}
        }
        updateHeaderGreeting();
        showUnauthorized();
        var errMsg = "Не удалось подтвердить вход через Telegram.";
        if (data && data.error) {
          errMsg = String(data.error);
          if (res.status === 401 || errMsg.indexOf("Invalid") !== -1) {
            errMsg +=
              " Проверьте TELEGRAM_BOT_TOKEN на сервере (тот же бот, что в t.me/…) и домен в @BotFather — он должен совпадать с hostname в адресной строке.";
          }
        } else if (!res.ok) {
          errMsg = "Сервер ответил HTTP " + res.status + ". Проверьте деплой и переменные окружения (TELEGRAM_BOT_TOKEN).";
        }
        setBannerFailure(errMsg, false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      })
      .catch(function () {
        if (sig) {
          try {
            window.__pokerTgLoginInflightSig = "";
          } catch (eSig2) {}
        }
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure("Сеть: не удалось вызвать /api/auth-telegram-login. Проверьте интернет, блокировщики и что data-api-base указывает на живой API.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      });
  }

  function mountTelegramLoginWidgetForPwa() {
    var mount = shouldUseOverlayAuthScreen() && pwaAuthLoginMountEl ? pwaAuthLoginMountEl : document.getElementById("authBannerLoginMount");
    /*
     * v7: отдельная форма верификации в баннере + кнопка popup Telegram.Login.auth.
     * data-onauth + __pokerTelegramOauthMessageBridge; редирект — tryFinishTelegramLoginRedirect.
     */
    var WIDGET_MOUNT_VER = "7";
    var LOCAL_MOUNT_MARK = "local";
    if (!mount) return;

    if (shouldUseOverlayAuthScreen()) {
      try {
        mount.removeAttribute("data-pwa-widget-mounted");
      } catch (eOverlayWidgetAttr) {}
      return ensureOverlayAuthEntryMounted();
    }

    if (shouldUseOverlayAuthScreen() && mount.getAttribute("data-pwa-widget-mounted")) {
      mount.removeAttribute("data-pwa-widget-mounted");
      mount.innerHTML = "";
    }
    if (isPwaAuthLocalHost()) {
      if (mount.getAttribute("data-pwa-widget-mounted") === LOCAL_MOUNT_MARK) return;
      mount.innerHTML = "";
      var localActions = ensurePwaVerificationForm(mount) || mount;
      if (shouldUseOverlayAuthScreen()) {
        mountPwaUsernameCodeLogin(localActions);
        mount.setAttribute("data-pwa-widget-mounted", LOCAL_MOUNT_MARK);
        return;
      }
      var elApp2 = document.getElementById("app");
      var prodUrl = elApp2 && elApp2.getAttribute("data-api-base");
      prodUrl = prodUrl ? String(prodUrl).trim().replace(/\/$/, "") : "";
      var msg = document.createElement("p");
      msg.className = "auth-banner__local-login-msg";
      msg.textContent =
        "Виджет Telegram на localhost не показываем — будет «Bot domain invalid». Войдите на боевом сайте или через Mini App.";
      localActions.appendChild(msg);
      if (prodUrl && /^https:\/\//i.test(prodUrl)) {
        var a = document.createElement("a");
        a.href = prodUrl + "/";
        a.className = "auth-banner__local-login-link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        try {
          a.textContent = "Открыть " + new URL(prodUrl).hostname;
        } catch (eA) {
          a.textContent = "Открыть боевой сайт";
        }
        localActions.appendChild(a);
      }
      mount.setAttribute("data-pwa-widget-mounted", LOCAL_MOUNT_MARK);
      if (!shouldUseOverlayAuthScreen()) mountMiniAppAuthEnterButtons();
      return;
    }
    if (mount.getAttribute("data-pwa-widget-mounted") === LOCAL_MOUNT_MARK) {
      mount.removeAttribute("data-pwa-widget-mounted");
      mount.innerHTML = "";
    }
    if (mount.getAttribute("data-pwa-widget-mounted") === WIDGET_MOUNT_VER) {
      var mountedActions = ensurePwaVerificationForm(mount) || mount;
      if (!shouldUseOverlayAuthScreen()) {
        mountMiniAppAuthEnterButtons();
        return;
      }
      mountPwaUsernameCodeLogin(mountedActions);
      if (!shouldUseOverlayAuthScreen()) {
        mountVkLoginForPwa(mountedActions);
        mountTelegramExternalBrowserEscapeBtn(mountedActions);
        mountTelegramLoginPopupButton(mountedActions);
      }
      return;
    }
    var bot = "";
    try {
      var m = String(telegramAppUrl || "").match(/t\.me\/([^\/\?#]+)/i);
      if (m) bot = m[1];
    } catch (e1) {}
    mount.innerHTML = "";
    var actionsMount = ensurePwaVerificationForm(mount) || mount;
    try {
      actionsMount.removeAttribute("data-tg-popup-fetch-started");
    } catch (eRm) {}
    window.__pokerTelegramWidgetAuth = function (user) {
      try {
        if (!user || user.hash == null || user.id == null || user.auth_date == null) return;
        deliverTelegramLoginWidgetPayload(user, false);
      } catch (eCb) {}
    };
    if (bot && !shouldUseOverlayAuthScreen()) {
      var script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", bot);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "14");
      script.setAttribute("data-userpic", "true");
      script.setAttribute("data-onauth", "window.__pokerTelegramWidgetAuth(user)");
      actionsMount.appendChild(script);
    }
    mount.setAttribute("data-pwa-widget-mounted", WIDGET_MOUNT_VER);
    if (shouldUseOverlayAuthScreen()) {
      if (!mountPwaStandaloneEnterButton()) mountPwaUsernameCodeLogin(actionsMount);
    } else {
      mountMiniAppAuthEnterButtons();
    }
    if (!shouldUseOverlayAuthScreen()) {
      mountVkLoginForPwa(mount);
      mountTelegramExternalBrowserEscapeBtn(mount);
      mountTelegramLoginPopupButton(mount);
    }
  }

  function tryFinishTelegramLoginRedirect() {
    try {
      var sp = new URLSearchParams(window.location.search || "");
      if (sp.get("hash") && sp.get("id") && sp.get("auth_date")) {
        var payloadQ = {};
        sp.forEach(function (v, k) {
          payloadQ[k] = v;
        });
        deliverTelegramLoginWidgetPayload(payloadQ, true);
        return true;
      }
    } catch (e3) {}
    try {
      var authObj = parseTelegramWidgetTgAuthResultFromHash();
      if (authObj && authObj.hash && authObj.id != null && authObj.auth_date != null) {
        deliverTelegramLoginWidgetPayload(authObj, true);
        return true;
      }
    } catch (e4) {}
    return false;
  }

  function resetBannerForOutsideTelegram() {
    /* Раньше здесь была ссылка «Открыть в Telegram»; в WebView TG без initData это ломало ожидания — тот же сценарий, что и PWA */
    resetBannerForPwaLogin();
    mountTelegramLoginWidgetForPwa();
  }

  function postAuthTelegram(initData, wantPwaSession) {
    var base = getTelegramAuthApiBase();
    if (!base) return Promise.reject(new Error("no_base"));
    var authLinkDtIdHint =
      (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
      sessionStorage.getItem("poker_dt_id") ||
      "";
    var authLinkPwaSession = typeof pokerReadEmailPwaSessionToken === "function" ? pokerReadEmailPwaSessionToken() : "";
    return pokerFetchRetry(
      base + "/api/auth-telegram",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData: initData,
          wantPwaSession: !!wantPwaSession,
          dtIdHint: authLinkDtIdHint,
          linkPwaSession: authLinkPwaSession,
        }),
        cache: "no-store",
      },
      { timeoutMs: POKER_FETCH_TIMEOUT_MS, maxAttempts: 3, retryDelayMs: 750 }
    ).then(function (res) {
      return res
        .json()
        .catch(function () {
          return {};
        })
        .then(function (data) {
          return { res: res, data: data || {} };
        });
    });
  }

  /**
   * PWA / браузер без Telegram WebApp: OAuth VK, редирект виджета, сессия из storage.
   * Вынесено в одну функцию — для standalone PWA обязательно вызывать и при наличии объекта WebApp без initData
   * (в index.html всегда подключается telegram-web-app.js).
   */
  pwaAuthRestoreRuntime = typeof initPwaAuthRestoreRuntime === "function"
    ? initPwaAuthRestoreRuntime({
      normalizeVerifiedUser: normalizeVerifiedUser,
      pokerMaybeRememberMemberIdFromUser: pokerMaybeRememberMemberIdFromUser,
      pokerSetAuthMethod: pokerSetAuthMethod,
      updateHeaderGreeting: updateHeaderGreeting,
      showAuthorized: showAuthorized,
      loadHeaderAvatar: loadHeaderAvatar,
      tryFinishVkOAuth: tryFinishVkOAuth,
      tryFinishTelegramLoginRedirect: tryFinishTelegramLoginRedirect,
      showPwaAuthScreen: showPwaAuthScreen,
      setPwaAuthIdentifyingPhase: setPwaAuthIdentifyingPhase,
      hideIdentifyingMini: hideIdentifyingMini,
      resetBannerForPwaLogin: resetBannerForPwaLogin,
      showPwaStandaloneEntryScreen: showPwaStandaloneEntryScreen,
      getPwaAuthScreenEl: function () { return pwaAuthScreenEl; },
      identifyMinMs: PWA_AUTH_IDENTIFY_MIN_MS,
      tgSessionKey: POKER_PWA_TG_SESSION_KEY,
      vkSessionKey: POKER_PWA_VK_SESSION_KEY
    })
    : null;
  function attemptPwaSideAuthRestore(hideBootOverlay) {
    return !!(pwaAuthRestoreRuntime && pwaAuthRestoreRuntime.attemptPwaSideAuthRestore && pwaAuthRestoreRuntime.attemptPwaSideAuthRestore(hideBootOverlay));
  }
  function restorePwaSideAuthRecord(record, opts) {
    return !!(pwaAuthRestoreRuntime && pwaAuthRestoreRuntime.restorePwaSideAuthRecord && pwaAuthRestoreRuntime.restorePwaSideAuthRecord(record, opts));
  }
  function attemptPwaSideAuthRestoreAsync(hideBootOverlay) {
    if (!pwaAuthRestoreRuntime || !pwaAuthRestoreRuntime.attemptPwaSideAuthRestoreAsync) return Promise.resolve(false);
    return pwaAuthRestoreRuntime.attemptPwaSideAuthRestoreAsync(hideBootOverlay);
  }
  function runPwaStandaloneUnidentifiedFlow(hideBootOverlay) {
    if (pwaAuthRestoreRuntime && pwaAuthRestoreRuntime.runPwaStandaloneUnidentifiedFlow) {
      pwaAuthRestoreRuntime.runPwaStandaloneUnidentifiedFlow(hideBootOverlay);
    }
  }

  function runVerifyFlow() {
    function hideBootOverlay() {
      try {
        if (typeof window.__pokerHideBootOverlay === "function") window.__pokerHideBootOverlay();
      } catch (eHide) {}
    }
    var wtg = getTelegramWebAppNow();
    var initData = wtg && wtg.initData ? String(wtg.initData) : "";
    var userUnsafe = wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user;

    var restoredAtStart = restoreSavedPwaAuthBeforeGate();

    if (isPwaStandaloneAuth()) {
      runPwaStandaloneUnidentifiedFlow(hideBootOverlay);
      return;
    }

    if (!wtg) {
      if (restoredAtStart) {
        updateHeaderGreeting();
        try {
          var authNoTg = window.__pokerTelegramAuth;
          if (authNoTg && authNoTg.user) {
            showAuthorized(authNoTg.user);
            loadHeaderAvatar();
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: authNoTg.user, pwa: true, restored: true } }));
          }
        } catch (eRestoreNoTg) {}
        setTimeout(hideBootOverlay, 80);
        return;
      }
      attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
        if (restored) return;
        window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
        updateHeaderGreeting();
        showUnauthorized();
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
        setTimeout(hideBootOverlay, 120);
      });
      return;
    }

    if (!initData) {
      if (restoredAtStart) {
        updateHeaderGreeting();
        try {
          var authNoInit = window.__pokerTelegramAuth;
          if (authNoInit && authNoInit.user) {
            showAuthorized(authNoInit.user);
            loadHeaderAvatar();
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: authNoInit.user, pwa: true, restored: true } }));
          }
        } catch (eRestoreNoInit) {}
        setTimeout(hideBootOverlay, 80);
        return;
      }
      attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
        if (restored) return;
        window.__pokerTelegramAuth = { status: "no_init_data", user: null, error: null };
        updateHeaderGreeting();
        showUnauthorized();
        resetBannerForPwaLogin();
        hideIdentifyingMini();
        if (userUnsafe && bannerText) {
          bannerText.textContent =
            "Пустой initData в Mini App — это не про токен на сервере: Telegram не передал подпись сессии. Чаще всего страницу открыли обычной ссылкой из чата, а не кнопкой Web App у бота. Закройте мини-приложение и откройте снова из меню/кнопки бота; пока не получится — войдите через виджет ниже или «отдельное окно».";
        }
        mountTelegramLoginWidgetForPwa();
        if (banner) {
          banner.classList.remove("auth-banner--verifying");
          if (shouldSuppressMiniAppPwaLoginBanner()) {
            banner.classList.add("auth-banner--hidden");
          } else {
            banner.classList.remove("auth-banner--hidden");
          }
        }
        setTimeout(hideBootOverlay, 120);
      });
      return;
    }

    var restoredBeforeInitDataRefresh = false;
    try {
      restoredBeforeInitDataRefresh = attemptPwaSideAuthRestore(hideBootOverlay);
    } catch (ePreInitRestore) {}
    var hadVerifiedBeforeInitDataRefresh = restoredBeforeInitDataRefresh || hasActiveVerifiedAuthState();
    if (!hadVerifiedBeforeInitDataRefresh) window.__pokerTelegramAuth = { status: "verifying", user: null, error: null };
    var verifyFlowGeneration = bumpAuthFlowGeneration();
    if (!hadVerifiedBeforeInitDataRefresh) setBannerVerifying();
    if (hadVerifiedBeforeInitDataRefresh) {
      hidePwaAuthScreen();
      hideIdentifyingMini();
    }
    updateHeaderGreeting();
    // В PWA держим загрузочный оверлей чуть дольше, чтобы не мигал экран входа.
    setTimeout(hideBootOverlay, isPwaStandaloneMode() ? 1600 : 200);

    var maxAuthAttempts = 5;
    var attempts = 0;
    function keepRestoredAuthIfPossible() {
      if (!hadVerifiedBeforeInitDataRefresh) return false;
      try {
        var authKeep = window.__pokerTelegramAuth;
        if (!authKeep || !authKeep.user || authKeep.status !== "verified") return false;
        updateHeaderGreeting();
        showAuthorized(authKeep.user);
        hideBootOverlay();
        return true;
      } catch (eKeepRestored) {
        return false;
      }
    }
    function tryOnce() {
      if (verifyFlowGeneration !== authFlowGeneration) return;
      attempts += 1;
      postAuthTelegram(initData, true)
        .then(function (pack) {
          if (verifyFlowGeneration !== authFlowGeneration) return;
          var res = pack.res;
          var data = pack.data || {};
          if (res.ok && data.ok && data.user) {
            var u = normalizeVerifiedUser(data.user, userUnsafe);
            var _authMini = { status: "verified", user: u, error: null };
            if (data.gazettePlannerAccess === true) _authMini.gazettePlannerAccess = true;
            if (data.adminAccess === true) _authMini.adminAccess = true;
            if (data.adminReportAccess === true) _authMini.adminReportAccess = true;
            window.__pokerTelegramAuth = _authMini;
            pokerMaybeRememberMemberIdFromUser(u);
            pokerSetAuthMethod("telegram");
            if (data.pwaSession && data.user) {
              if (
                !pokerSavePwaTgSession(
                  data.pwaSession,
                  data.user,
                  {
                    gazettePlannerAccess: data.gazettePlannerAccess === true,
                    adminAccess: data.adminAccess === true,
                    adminReportAccess: data.adminReportAccess === true,
                  }
                )
              )
                pwaSessionPersistenceWarning();
              pokerSavePwaGuestMode(false);
            }
            updateHeaderGreeting();
            showAuthorized(u);
            hideBootOverlay();
            try {
              window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u } }));
            } catch (e1) {}
            return;
          }
          if (res.status === 401 || (data && String(data.error || "").indexOf("Invalid") !== -1)) {
            if (keepRestoredAuthIfPossible()) return;
            window.__pokerTelegramAuth = { status: "invalid", user: null, error: data.error || "invalid" };
            updateHeaderGreeting();
            showUnauthorized();
            setBannerFailure("Вход не подтверждён. Откройте приложение через официального бота в Telegram.", false);
            hideBootOverlay();
            try {
              window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "invalid" } }));
            } catch (e2) {}
            return;
          }
          if (res.status === 500 && data && data.error === "Server config") {
            var uDev = normalizeVerifiedUser(null, userUnsafe);
            window.__pokerTelegramAuth = { status: "dev_skip", user: uDev, error: "server_config" };
            if (uDev) {
              pokerMaybeRememberMemberIdFromUser(uDev);
              updateHeaderGreeting();
              showAuthorized(uDev);
              hideBootOverlay();
              if (typeof console !== "undefined" && console.warn) {
                console.warn("[poker] auth-telegram: на сервере не задан TELEGRAM_BOT_TOKEN — вход без криптопроверки (только для разработки).");
              }
              try {
                window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uDev, dev: true } }));
              } catch (e3) {}
            } else {
              showUnauthorized();
              setBannerFailure("Не удалось подтвердить профиль.", true);
              hideBootOverlay();
            }
            return;
          }
          if (attempts < maxAuthAttempts) {
            setTimeout(tryOnce, authRetryDelayMs(attempts));
            return;
          }
          if (keepRestoredAuthIfPossible()) return;
          window.__pokerTelegramAuth = { status: "network", user: null, error: "bad_response" };
          updateHeaderGreeting();
          showUnauthorized();
          setBannerFailure(
            "Не удалось связаться с сервером (таймаут или нет сети). Нажмите «Повторить проверку», при необходимости смените Wi‑Fi / мобильный интернет или отключите VPN.",
            true
          );
          if (!pokerTryBootOverlayNetworkError("Нет связи с сервером или таймаут. Нажмите «Повторить».")) hideBootOverlay();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "network" } }));
          } catch (e4) {}
        })
        .catch(function () {
          if (verifyFlowGeneration !== authFlowGeneration) return;
          if (attempts < maxAuthAttempts) {
            setTimeout(tryOnce, authRetryDelayMs(attempts));
            return;
          }
          if (keepRestoredAuthIfPossible()) return;
          window.__pokerTelegramAuth = { status: "network", user: null, error: "fetch" };
          updateHeaderGreeting();
          showUnauthorized();
          setBannerFailure(
            "Не удалось связаться с сервером (таймаут или нет сети). Нажмите «Повторить проверку», при необходимости смените Wi‑Fi / мобильный интернет или отключите VPN.",
            true
          );
          if (!pokerTryBootOverlayNetworkError("Нет связи с сервером или таймаут. Нажмите «Повторить».")) hideBootOverlay();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "network" } }));
          } catch (e5) {}
        });
    }
    tryOnce();
  }

  /** Пауза между попытками /api/auth-telegram (VPN и прокси часто дают таймауты на первых запросах). */
  function authRetryDelayMs(attemptSoFar) {
    var n = Math.max(0, attemptSoFar - 1);
    return Math.min(450 + n * 550 + n * n * 220, 9000);
  }

  /** В Mini App initData иногда заполняется не с первого кадра — ждём перед отказом. */
  function waitForInitDataThenVerify(maxWaitMs, intervalMs) {
    var wtg = getTelegramWebAppNow();
    if (!wtg || wtg.initData) {
      runVerifyFlow();
      return;
    }
    var start = Date.now();
    var t = setInterval(function () {
      var w = getTelegramWebAppNow();
      if (w && w.initData) {
        clearInterval(t);
        runVerifyFlow();
        return;
      }
      if (Date.now() - start >= maxWaitMs) {
        clearInterval(t);
        runVerifyFlow();
      }
    }, intervalMs);
  }

  var lastAuthAutoRetryTs = 0;
  function maybeRetryAuthWhenNetworkBack() {
    var now = Date.now();
    if (now - lastAuthAutoRetryTs < 2500) return;
    try {
      var a = window.__pokerTelegramAuth;
      if (!a || a.status !== "network") return;
      var w = getTelegramWebAppNow();
      if (!w || !w.initData) return;
      lastAuthAutoRetryTs = now;
      runVerifyFlow();
    } catch (eNet) {}
  }

  if (bannerRetry) {
    bannerRetry.addEventListener("click", function () {
      var wtg = getTelegramWebAppNow();
      if (!wtg || !wtg.initData) {
        if (!isTelegramWebApp() && typeof window.location !== "undefined" && window.location.reload) {
          window.location.reload();
        } else {
          resetBannerForPwaLogin();
          mountTelegramLoginWidgetForPwa();
        }
        return;
      }
      runVerifyFlow();
    });
  }

  window.pokerRetryTelegramAuthVerification = function () {
    /* В PWA объект WebApp есть, initData часто пуст — иначе кнопка «Повторить» на оверлее ничего не делала */
    if (isPwaStandaloneAuth()) {
      runVerifyFlow();
      return;
    }
    var wtgR = getTelegramWebAppNow();
    if (wtgR && wtgR.initData) {
      runVerifyFlow();
      return;
    }
    if (!isTelegramWebApp() && typeof window.location !== "undefined" && window.location.reload) {
      window.location.reload();
    }
  };

  window.addEventListener("online", maybeRetryAuthWhenNetworkBack);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      setTimeout(maybeRetryAuthWhenNetworkBack, 400);
      setTimeout(function () {
        tryFinishTelegramLoginRedirect();
      }, 380);
      setTimeout(function () {
        try {
          var w = getTelegramWebAppNow();
          var a = window.__pokerTelegramAuth;
          if (w && w.initData && a && a.status === "no_init_data") {
            runVerifyFlow();
          }
        } catch (eVis) {}
      }, 520);
    }
  });
  window.addEventListener(
    "pageshow",
    function () {
      tryFinishTelegramLoginRedirect();
    },
    false
  );

  var wtgBoot = getTelegramWebAppNow();
  if (isPwaStandaloneAuth()) {
    /* В PWA initData из Telegram не придёт — не ждём таймер в WebApp-ветке (полоска в #app всё равно скрыта). */
    runVerifyFlow();
  } else if (isTelegramWebApp() && wtgBoot && !wtgBoot.initData) {
    // initData иногда появляется с задержкой даже при открытии кнопкой бота.
    // Не блокируем первый рендер на 25с: ждём немного и пускаем verify/виджет.
    showPwaAuthScreen();
    setPwaAuthIdentifyingPhase(true);
    waitForInitDataThenVerify(5000, 300);
  } else {
    runVerifyFlow();
  }

  window.__pokerOpenPwaLoginScreen = function () {
    try {
      openOverlayAuthEntryScreen();
    } catch (ePwaOpen) {}
  };

  window.__pokerShowLoggedOutState = function () {
    try {
      updateHeaderGreeting();
    } catch (eHdr) {}
    try {
      if (typeof window.__pokerResetHeaderPoker21GuestStatus === "function") window.__pokerResetHeaderPoker21GuestStatus();
    } catch (eGuestFish) {}
    try {
      openOverlayAuthEntryScreen();
    } catch (eShowEntry) {}
    try {
      showUnauthorized(true);
    } catch (eUnauth) {}
    try {
      updateProfileExitBtnVisibility();
    } catch (eExitBtn) {}
    try {
      if (typeof loadHeaderAvatar === "function") loadHeaderAvatar();
    } catch (eAvatar) {}
  };

  (function pokerBindBootOverlayRetryOnce() {
    function bind() {
      var btn = document.getElementById("appBootOverlayRetryBtn");
      if (!btn || btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        pokerResetBootOverlayLoading();
        if (typeof window.pokerRetryTelegramAuthVerification === "function") window.pokerRetryTelegramAuthVerification();
        else if (window.location && typeof window.location.reload === "function") window.location.reload();
      });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
    else bind();
  })();

  /* Редкий залипший шлюз: #app скрыт по gated, экран входа остался --hidden — без UI */
  setTimeout(function pokerPwaStaleGateRecover() {
    try {
      if (!isPwaStandaloneMode()) return;
      var el = document.getElementById("pwaAuthScreen");
      if (!el || !document.body.classList.contains("pwa-auth-gated")) return;
      if (!el.classList.contains("pwa-auth-screen--hidden")) return;
      el.classList.remove("pwa-auth-screen--hidden");
      el.setAttribute("aria-hidden", "false");
      try {
        document.body.classList.add("pwa-auth-preinit");
      } catch (ePre) {}
      try {
        setPwaAuthIdentifyingPhase(false);
      } catch (eId) {}
      try {
        showPwaStandaloneEntryScreen();
      } catch (eMount) {}
    } catch (eRec) {}
  }, 10000);
})();
