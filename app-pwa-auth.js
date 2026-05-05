// Авторизация через Telegram: обязательная проверка подписи initData на сервере (/api/auth-telegram)
(function initTelegramAuth() {
  window.__pokerTelegramAuth = { status: "unknown", user: null, error: null };
  try {
    localStorage.removeItem(POKER_PWA_GUEST_KEY);
  } catch (eLegacyGuest) {}

  /** Актуальный WebApp (не замыкание на старый объект — иногда initData появляется с задержкой). */
  function getTelegramWebAppNow() {
    return isTelegramWebApp() && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  }

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

  function restoreSavedPwaAuthBeforeGate() {
    try {
      if (typeof pokerReadPwaTgSessionRecord === "function") {
        var tgRecord = pokerReadPwaTgSessionRecord();
        if (tgRecord && tgRecord.user && tgRecord.user.id != null && tgRecord.token) {
          var tgUser = normalizeVerifiedUser(tgRecord.user, null);
          var tgAuth = { status: "verified", user: tgUser, error: null };
          if (tgRecord.gazettePlannerAccess === true) tgAuth.gazettePlannerAccess = true;
          if (tgRecord.adminAccess === true) tgAuth.adminAccess = true;
          if (tgRecord.adminReportAccess === true) tgAuth.adminReportAccess = true;
          window.__pokerTelegramAuth = tgAuth;
          pokerMaybeRememberMemberIdFromUser(tgUser);
          pokerSetAuthMethod(tgRecord.authMethod || "telegram");
          return true;
        }
      }
    } catch (eRestoreTgEarly) {}
    try {
      if (typeof pokerReadPwaVkSessionRecord === "function") {
        var vkRecord = pokerReadPwaVkSessionRecord();
        if (vkRecord && vkRecord.user && vkRecord.user.id != null && vkRecord.token) {
          var vkUser = normalizeVerifiedUser(vkRecord.user, null);
          window.__pokerTelegramAuth = { status: "verified", user: vkUser, error: null };
          pokerMaybeRememberMemberIdFromUser(vkUser);
          pokerSetAuthMethod(vkRecord.authMethod || "vk");
          return true;
        }
      }
    } catch (eRestoreVkEarly) {}
    return false;
  }

  function isPwaStandaloneMode() {
    try {
      if (window.__pokerDisplayStandaloneBoot === true) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
      if (window.navigator && window.navigator.standalone) return true;
    } catch (e) {}
    return false;
  }
  /**
   * PWA с иконки: WebApp может отдать initDataUnsafe.user без подписанного initData.
   * Старый критерий «есть user → Mini App» ломал вход: ждали initData, экран TWO ACES/«идентификация» зависал.
   * Режим display-mode: standalone / navigator.standalone достаточен: в Mini App Telegram это обычно не так.
   * Нельзя отключать PWA-экран по непустому initData — telegram-web-app.js кладёт tgWebAppData в sessionStorage;
   * после Safari/Mini App с тем же origin в установленном PWA подтягивается чужой initData → ветка Mini App,
   * shouldSuppress гасит баннер, вход не крепится — пользователь видит пустой/белый экран.
   */
  function isPwaStandaloneAuth() {
    return isPwaStandaloneMode();
  }
  function shouldUseOverlayAuthScreen() {
    return isPwaStandaloneMode();
  }
  /**
   * Не показываем карточку «Верификация для входа в PWA» внутри клиента Telegram (Mini App / WebView).
   * Скрипт telegram-web-app.js есть и в обычном браузере — отличаем по platform / version WebApp.
   */
  function shouldSuppressMiniAppPwaLoginBanner() {
    return false;
  }
  function showPwaAuthScreen() {
    if (!shouldUseOverlayAuthScreen() || !pwaAuthScreenEl) return;
    pwaAuthScreenEl.classList.remove("pwa-auth-screen--hidden");
    pwaAuthScreenEl.setAttribute("aria-hidden", "false");
    try {
      /* Сначала preinit: критический CSS в index.html держит #pwaAuthScreen видимым при гонках с --hidden */
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (e) {}
  }
  function hidePwaAuthScreen() {
    if (!pwaAuthScreenEl) return;
    try {
      pwaAuthScreenEl.classList.remove("pwa-auth-screen--identifying");
    } catch (eId) {}
    pwaAuthScreenEl.classList.add("pwa-auth-screen--hidden");
    pwaAuthScreenEl.setAttribute("aria-hidden", "true");
    try {
      document.body.classList.remove("pwa-auth-gated");
      document.body.classList.remove("pwa-auth-preinit");
    } catch (e) {}
  }

  function isOverlayAuthScreenActive() {
    if (!pwaAuthScreenEl) return false;
    if (document.body && document.body.classList.contains("pwa-auth-gated")) return true;
    return pwaAuthScreenEl.getAttribute("aria-hidden") === "false";
  }

  function rerenderCurrentPwaAuthScreen() {
    if (!shouldUseOverlayAuthScreen() && !isOverlayAuthScreenActive()) {
      syncPwaAuthLanguageUi();
      return;
    }
    var mount = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!mount) {
      syncPwaAuthLanguageUi();
      return;
    }
    syncPwaAuthLanguageUi();
    if (mount.querySelector(".auth-banner__email-login")) {
      var emailWrap = mount.querySelector(".auth-banner__email-login");
      var emailMode = emailWrap && emailWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      mountPwaEmailLogin(mount, emailMode);
      return;
    }
    if (mount.querySelector(".auth-banner__code-login")) {
      var tgWrap = mount.querySelector(".auth-banner__code-login");
      var tgMode = tgWrap && tgWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      var actionsMount = ensurePwaVerificationForm(mount) || mount;
      mountPwaUsernameCodeLogin(actionsMount, tgMode);
      return;
    }
    remountPwaStandaloneEnterScreen();
  }

  function showIdentifyingMini() {
    if (!identifyingMiniEl) return;
    identifyingMiniEl.classList.remove("auth-identifying-mini--hidden");
    identifyingMiniEl.setAttribute("aria-busy", "true");
  }

  function hideIdentifyingMini() {
    if (!identifyingMiniEl) return;
    identifyingMiniEl.classList.add("auth-identifying-mini--hidden");
    identifyingMiniEl.setAttribute("aria-busy", "false");
  }

  function setPwaAuthScreenNotice(message) {
    if (!pwaAuthScreenEl) return;
    var inner = pwaAuthScreenEl.querySelector(".pwa-auth-screen__inner");
    if (!inner) return;
    var notice = inner.querySelector(".pwa-auth-screen__notice");
    var text = message != null ? String(message).trim() : "";
    if (!text) {
      if (notice) notice.remove();
      return;
    }
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "pwa-auth-screen__notice";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      inner.appendChild(notice);
    }
    notice.textContent = text;
  }

  function hideLegacyInlineAuthUi() {
    hideIdentifyingMini();
    if (banner) {
      banner.classList.add("auth-banner--hidden");
      banner.classList.remove("auth-banner--verifying");
    }
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) {
      hintEl.textContent = "";
      hintEl.style.display = "none";
    }
  }

  function openOverlayAuthEntryScreen() {
    try {
      pokerSavePwaGuestMode(false);
    } catch (eGuestOff) {}
    try {
      if (window.__pokerTelegramAuth && window.__pokerTelegramAuth.status === "guest") {
        window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
      }
    } catch (eAuthReset) {}
    try {
      if (typeof setView === "function") setView("home");
    } catch (eSetViewAuth) {}
    hideLegacyInlineAuthUi();
    setPwaAuthScreenNotice("");
    if (pwaAuthScreenEl) {
      pwaAuthScreenEl.classList.remove("pwa-auth-screen--hidden");
      pwaAuthScreenEl.setAttribute("aria-hidden", "false");
    }
    try {
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (eBodyAuthOpen) {}
    try {
      setPwaAuthIdentifyingPhase(false);
    } catch (eOpenAuthId) {}
    remountPwaStandaloneEnterScreen();
    ensureOverlayAuthEntryMounted();
    setTimeout(function () {
      ensureOverlayAuthEntryMounted();
    }, 0);
    setTimeout(function () {
      ensureOverlayAuthEntryMounted();
    }, 120);
  }

  /** PWA: экран «идентификация» поверх приложения (не внутри скрытого #app). */
  var PWA_AUTH_IDENTIFY_MIN_MS = 620;
  function setPwaAuthIdentifyingPhase(on) {
    if (!pwaAuthScreenEl) return;
    var panel = document.getElementById("pwaAuthIdentifyingPanel");
    try {
      if (on) {
        /* Без панели в DOM (старый кэш HTML) нельзя вешать --identifying: CSS прячет .pwa-auth-screen__inner → пустой экран. */
        if (panel) {
          pwaAuthScreenEl.classList.add("pwa-auth-screen--identifying");
          panel.hidden = false;
          panel.setAttribute("aria-busy", "true");
        }
      } else {
        pwaAuthScreenEl.classList.remove("pwa-auth-screen--identifying");
        if (panel) {
          panel.hidden = true;
          panel.setAttribute("aria-busy", "false");
        }
      }
    } catch (ePwaId) {}
  }

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

  function mountAuthEnterButtons(mount, opts) {
    opts = opts || {};
    var standaloneMode = !!opts.standaloneMode;
    var includeGuest = !!opts.includeGuest;
    var mountedAttr = opts.mountedAttr || "data-pwa-enter-mounted";
    var emailBtnId = opts.emailBtnId || "authEnterEmailBtn";
    var telegramBtnId = opts.telegramBtnId || "authEnterTelegramBtn";
    var guestBtnId = opts.guestBtnId || "authEnterGuestBtn";
    var guestBlock = includeGuest
      ? '<div class="pwa-auth-screen__guest-block">' +
        '<button type="button" class="pwa-auth-screen__enter-btn pwa-auth-screen__enter-btn--secondary" id="' + guestBtnId + '">' + pwaAuthT("enterGuest") + "</button>" +
        '<p class="pwa-auth-screen__guest-note">' + pwaAuthT("guestNote") + "</p>" +
        "</div>"
      : "";
    var wrapperClass = standaloneMode ? "pwa-auth-screen__enter-actions" : "auth-banner__verify-actions pwa-auth-screen__enter-actions";
    if (!mount) return false;
    if (mount.getAttribute(mountedAttr) === "1") return true;
    mount.setAttribute(mountedAttr, "1");
    mount.innerHTML =
      '<div class="' + wrapperClass + '">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="' + emailBtnId + '">' + pwaAuthT("enterEmail") + "</button>" +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="' + telegramBtnId + '">' + pwaAuthT("enterTelegram") + "</button>" +
        guestBlock +
      "</div>";
    var emailBtn = mount.querySelector("#" + emailBtnId);
    var btn = mount.querySelector("#" + telegramBtnId);
    var guestBtn = includeGuest ? mount.querySelector("#" + guestBtnId) : null;
    if (!emailBtn || !btn || (includeGuest && !guestBtn)) return true;
    emailBtn.addEventListener("click", function () {
      pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e0) {}
      mount.innerHTML = "";
      mountPwaEmailLogin(mount);
    });
    btn.addEventListener("click", function () {
      pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e) {}
      mount.innerHTML = "";
      var actionsMount = ensurePwaVerificationForm(mount) || mount;
      mountPwaUsernameCodeLogin(actionsMount);
    });
    if (guestBtn) {
      guestBtn.addEventListener("click", function () {
        pokerSavePwaGuestMode(false);
        try {
          window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        } catch (eAuth) {}
        updateHeaderGreeting();
        updateProfileExitBtnVisibility();
        hidePwaAuthScreen();
        hideIdentifyingMini();
        try {
          if (banner) {
            banner.classList.add("auth-banner--hidden");
            banner.classList.remove("auth-banner--verifying");
          }
        } catch (eB) {}
        try {
          mount.innerHTML = "";
        } catch (eM) {}
      });
    }
    return true;
  }

  function mountPwaStandaloneEnterButton() {
    var m = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!m) return false;
    return mountAuthEnterButtons(m, {
      standaloneMode: true,
      includeGuest: true,
      mountedAttr: "data-pwa-enter-mounted",
      emailBtnId: "pwaAuthEnterEmailBtn",
      telegramBtnId: "pwaAuthEnterTelegramBtn",
      guestBtnId: "pwaAuthEnterGuestBtn"
    });
  }

  function mountMiniAppAuthEnterButtons() {
    var mount = document.getElementById("authBannerLoginMount");
    if (!mount) return false;
    return mountAuthEnterButtons(mount, {
      standaloneMode: false,
      includeGuest: false,
      mountedAttr: "data-miniapp-auth-enter-mounted",
      emailBtnId: "miniAppAuthEnterEmailBtn",
      telegramBtnId: "miniAppAuthEnterTelegramBtn"
    });
  }

  function remountPwaStandaloneEnterScreen() {
    var m = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!m) return;
    m.innerHTML = "";
    try {
      m.removeAttribute("data-pwa-enter-mounted");
    } catch (eRm) {}
    mountPwaStandaloneEnterButton();
  }

  function ensureOverlayAuthEntryMounted() {
    var mount = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!mount) return false;
    if (mount.querySelector(".pwa-auth-screen__enter-actions, .auth-banner__email-login, .auth-banner__code-login")) {
      return true;
    }
    try {
      mount.innerHTML = "";
      mount.removeAttribute("data-pwa-enter-mounted");
      mount.removeAttribute("data-pwa-widget-mounted");
    } catch (eEnsureMount) {}
    return !!mountPwaStandaloneEnterButton();
  }

  function remountCurrentAuthEnterScreen() {
    if (shouldUseOverlayAuthScreen() || isOverlayAuthScreenActive()) {
      remountPwaStandaloneEnterScreen();
      return;
    }
    var mount = document.getElementById("authBannerLoginMount");
    if (!mount) return;
    mount.innerHTML = "";
    try {
      mount.removeAttribute("data-miniapp-auth-enter-mounted");
      mount.removeAttribute("data-pwa-widget-mounted");
    } catch (eMiniRm) {}
    mountMiniAppAuthEnterButtons();
  }

  function showPwaStandaloneEntryScreen() {
    if (!shouldUseOverlayAuthScreen()) return;
    try {
      showPwaAuthScreen();
    } catch (eShowPwa) {}
    try {
      setPwaAuthIdentifyingPhase(false);
    } catch (eIdOff) {}
    try {
      hideIdentifyingMini();
    } catch (eMini) {}
    try {
      resetBannerForPwaLogin();
    } catch (eBanner) {}
    try {
      remountPwaStandaloneEnterScreen();
    } catch (eRemount) {}
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

  function updateHeaderGreeting() {
    var el = document.getElementById("headerGreeting");
    syncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
      window.__pokerSyncProfileGuestWebsiteMode();
    }
    if (!el) return;
    if (isSiteHomeInstructionMode()) {
      el.textContent = "Войти";
      return;
    }
    var profileName = pokerPreferredProfileDisplayName();
    if (profileName) {
      el.textContent = "Привет, " + profileName + "!";
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
    el.textContent = dn ? "Привет, " + dn + "!" : "Привет!";
  }

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
    var showAuthBtn = showInstructionBtn && !hasResolvedAuth;
    var instructionBtn = document.getElementById("siteHomeInstructionBtn");
    var authBtn = document.getElementById("siteHomeAuthBtn");
    var pwaInstallBtn = document.getElementById("pwaInstallBtn");
    var greetingArrow = document.getElementById("headerGreetingArrow");
    var hideInstructionBtn = !showInstructionBtn || isStandaloneMode;
    var hideAuthBtn = !showAuthBtn || isStandaloneMode;
    if (root) root.classList.toggle("site-home-header-mode", isSiteMode);
    if (instructionBtn) {
      instructionBtn.hidden = hideInstructionBtn;
      if (hideInstructionBtn) instructionBtn.style.display = "none";
      else instructionBtn.style.removeProperty("display");
    }
    if (authBtn) {
      authBtn.hidden = hideAuthBtn;
      if (hideAuthBtn) authBtn.style.display = "none";
      else authBtn.style.removeProperty("display");
    }
    if (pwaInstallBtn && isTelegramMode) {
      pwaInstallBtn.hidden = true;
      pwaInstallBtn.style.display = "none";
    } else if (pwaInstallBtn) {
      pwaInstallBtn.style.removeProperty("display");
    }
    if (greetingArrow) greetingArrow.hidden = !isSiteMode;
  }
  window.__pokerSyncSiteHomeInstructionMode = syncSiteHomeInstructionMode;

  function initSiteHomeInstructionModal() {
    var modal = document.getElementById("siteHomeInstructionModal");
    var openBtn = document.getElementById("siteHomeInstructionBtn");
    var authBtn = document.getElementById("siteHomeAuthBtn");
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
    function handleOpenAccountAuth(e) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") {
        window.__pokerOpenSharedAccountAuthFlow();
      }
    }
    openBtn.onclick = handleOpenInstructionModal;
    openBtn.addEventListener("pointerdown", handleOpenInstructionModal, { passive: false, capture: true });
    openBtn.addEventListener("touchstart", handleOpenInstructionModal, { passive: false });
    openBtn.addEventListener("click", handleOpenInstructionModal);
    if (authBtn) {
      authBtn.onclick = handleOpenAccountAuth;
      authBtn.addEventListener("click", handleOpenAccountAuth);
    }
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

  function openSharedAccountAuthFlow() {
    try {
      if (typeof window.__pokerOpenPwaLoginScreen === "function") {
        window.__pokerOpenPwaLoginScreen();
        return;
      }
    } catch (eOpenPwaLogin) {}
  }
  window.__pokerOpenSharedAccountAuthFlow = openSharedAccountAuthFlow;

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
    setBannerVerifying();
    showUnauthorized();
    pokerAuthFetch(base + "/api/auth-telegram-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, payload, {
          dtIdHint:
            (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
            sessionStorage.getItem("poker_dt_id") ||
            "",
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
    return pokerFetchRetry(
      base + "/api/auth-telegram",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData: initData,
          wantPwaSession: !!wantPwaSession,
          dtIdHint:
            (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
            sessionStorage.getItem("poker_dt_id") ||
            "",
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
  function attemptPwaSideAuthRestore(hideBootOverlay) {
    if (tryFinishVkOAuth()) return true;
    if (tryFinishTelegramLoginRedirect()) return true;
    try {
      var so = pokerReadPwaTgSessionRecord();
      if (so && so.user && so.user.id != null && so.token) {
        var uP = normalizeVerifiedUser(so.user, null);
        var _authRestore = { status: "verified", user: uP, error: null };
        if (so.gazettePlannerAccess === true) _authRestore.gazettePlannerAccess = true;
        if (so.adminAccess === true) _authRestore.adminAccess = true;
        if (so.adminReportAccess === true) _authRestore.adminReportAccess = true;
        window.__pokerTelegramAuth = _authRestore;
        pokerMaybeRememberMemberIdFromUser(uP);
        pokerSetAuthMethod(so.authMethod || "telegram");
        updateHeaderGreeting();
        showAuthorized(uP);
        loadHeaderAvatar();
        if (typeof hideBootOverlay === "function") hideBootOverlay();
        try {
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uP, pwa: true } }));
        } catch (eP) {}
        return true;
      }
    } catch (eLs) {}
    try {
      var soV = pokerReadPwaVkSessionRecord();
      if (soV && soV.user && soV.user.id != null && soV.token) {
        var uVk = normalizeVerifiedUser(soV.user, null);
        window.__pokerTelegramAuth = { status: "verified", user: uVk, error: null };
        pokerSetAuthMethod(soV.authMethod || "vk");
        updateHeaderGreeting();
        showAuthorized(uVk);
        loadHeaderAvatar();
        if (typeof hideBootOverlay === "function") hideBootOverlay();
        try {
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uVk, pwa: true, vk: true } }));
        } catch (eVkLs) {}
        return true;
      }
    } catch (eLsVk) {}
    return false;
  }

  function restorePwaSideAuthRecord(record, opts) {
    var options = opts || {};
    if (!record || !record.user || record.user.id == null || !record.token) return false;
    var u = normalizeVerifiedUser(record.user, null);
    var _authRestore = { status: "verified", user: u, error: null };
    if (record.gazettePlannerAccess === true) _authRestore.gazettePlannerAccess = true;
    if (record.adminAccess === true) _authRestore.adminAccess = true;
    if (record.adminReportAccess === true) _authRestore.adminReportAccess = true;
    window.__pokerTelegramAuth = _authRestore;
    try {
      if (options.vk) {
        if (typeof pokerSavePwaVkSession === "function") pokerSavePwaVkSession(record.token, record.user);
      } else if (typeof pokerSavePwaTgSession === "function") {
        pokerSavePwaTgSession(record.token, record.user, {
          authMethod: record.authMethod || "telegram",
          gazettePlannerAccess: record.gazettePlannerAccess === true,
          adminAccess: record.adminAccess === true,
          adminReportAccess: record.adminReportAccess === true,
        });
      }
    } catch (eRehydratePwaAuth) {}
    pokerMaybeRememberMemberIdFromUser(u);
    pokerSetAuthMethod(record.authMethod || (options.vk ? "vk" : "telegram"));
    updateHeaderGreeting();
    showAuthorized(u);
    loadHeaderAvatar();
    if (typeof options.hideBootOverlay === "function") options.hideBootOverlay();
    try {
      window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, vk: !!options.vk } }));
    } catch (ePwaRestoreDispatch) {}
    return true;
  }

  function attemptPwaSideAuthRestoreAsync(hideBootOverlay) {
    if (attemptPwaSideAuthRestore(hideBootOverlay)) return Promise.resolve(true);
    if (typeof pokerReadPwaSessionRecordAsync !== "function") return Promise.resolve(false);
    return pokerReadPwaSessionRecordAsync(POKER_PWA_TG_SESSION_KEY)
      .then(function (so) {
        if (restorePwaSideAuthRecord(so, { hideBootOverlay: hideBootOverlay })) return true;
        return pokerReadPwaSessionRecordAsync(POKER_PWA_VK_SESSION_KEY).then(function (soV) {
          return restorePwaSideAuthRecord(soV, { hideBootOverlay: hideBootOverlay, vk: true });
        });
      })
      .catch(function () {
        return false;
      });
  }

  /** PWA без initData: сначала видимый экран идентификации, затем вход (или сразу в приложение при restore сессии). */
  function runPwaStandaloneUnidentifiedFlow(hideBootOverlay) {
    if (restoreSavedPwaAuthBeforeGate()) {
      updateHeaderGreeting();
      try {
        var restoredAuth = window.__pokerTelegramAuth;
        if (restoredAuth && restoredAuth.user) {
          showAuthorized(restoredAuth.user);
          loadHeaderAvatar();
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: restoredAuth.user, pwa: true, restored: true } }));
        }
      } catch (eEarlyStandaloneRestore) {}
      try {
        if (typeof hideBootOverlay === "function") hideBootOverlay();
      } catch (eEarlyStandaloneBoot) {}
      return;
    }
    showPwaAuthScreen();
    setPwaAuthIdentifyingPhase(true);
    try {
      if (typeof hideBootOverlay === "function") hideBootOverlay();
    } catch (eBoot0) {}
    if (attemptPwaSideAuthRestore(hideBootOverlay)) {
      setPwaAuthIdentifyingPhase(false);
      return;
    }
    try {
      window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
      updateHeaderGreeting();
    } catch (eHdr) {}
    function finishPwaStandaloneIdentifyUi() {
      try {
        showPwaStandaloneEntryScreen();
      } catch (ePwaFlow) {
        try {
          setPwaAuthIdentifyingPhase(false);
          document.body.classList.remove("pwa-auth-gated");
          document.body.classList.remove("pwa-auth-preinit");
        } catch (e2) {}
        if (typeof window.__pokerHideBootOverlay === "function") {
          try {
            window.__pokerHideBootOverlay();
          } catch (e3) {}
        }
      } finally {
        try {
          setPwaAuthIdentifyingPhase(false);
        } catch (eF) {}
      }
    }
    attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
      if (restored) {
        setPwaAuthIdentifyingPhase(false);
        return;
      }
      setTimeout(finishPwaStandaloneIdentifyUi, PWA_AUTH_IDENTIFY_MIN_MS);
    });
    /* Фолбэк: если основной таймер не отработал или фаза залипла — снять «идентификацию» и показать кнопки входа. */
    setTimeout(function () {
      try {
        if (!pwaAuthScreenEl || !pwaAuthScreenEl.classList.contains("pwa-auth-screen--identifying")) return;
        finishPwaStandaloneIdentifyUi();
      } catch (eWd) {}
    }, 5000);
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
