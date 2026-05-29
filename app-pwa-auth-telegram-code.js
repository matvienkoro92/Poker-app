// PWA Telegram username/code login form.
(function initPwaAuthTelegramCodeLoginModule() {
  function pokerMountPwaUsernameCodeLogin(mount, initialMode, deps) {
    deps = deps || {};
    if (!mount) return;
    if (mount.querySelector(".auth-banner__code-login")) return;
    var wrap = document.createElement("div");
    wrap.className = "auth-banner__code-login";
    var backRow =
      ((deps.shouldUseOverlayAuthScreen ? deps.shouldUseOverlayAuthScreen() : false) || (deps.isOverlayAuthScreenActive ? deps.isOverlayAuthScreenActive() : false))
        ? '<div class="auth-banner__code-row auth-banner__code-row--back">' +
          '<button type="button" class="pwa-auth-screen__back-icon-btn" id="authPwaCodeBackBtn" aria-label="' + pwaAuthT("backToChoice") + '">' +
          '<span class="pwa-auth-screen__back-icon" aria-hidden="true">←</span>' +
          "</button>" +
          "</div>"
        : "";
    var botUser = "";
    try {
      var mx = String((deps.telegramAppUrl || "") || "").match(/t\.me\/([a-zA-Z0-9_]+)/i);
      if (mx) botUser = mx[1];
    } catch (eBot) {}
    var botUrl = botUser ? "https://t.me/" + botUser : "";
    var linkTme =
      botUrl && botUser
        ? '<a href="' + botUrl + '" target="_blank" rel="noopener noreferrer" class="auth-banner__code-intro-link">t.me/' + botUser + "</a>"
        : '<a href="https://t.me/Poker_dvatuza_bot" target="_blank" rel="noopener noreferrer" class="auth-banner__code-intro-link">t.me/Poker_dvatuza_bot</a>';
    wrap.innerHTML =
      backRow +
      '<div class="auth-banner__code-intro-wrap" role="note">' +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro1") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro2") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro3") + " " + linkTme + ".</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro4") + " " + linkTme + " " + pwaAuthT("usernameIntro5") + "</p>" +
      "</div>" +
      '<div class="auth-banner__code-row">' +
        '<input type="text" class="auth-banner__code-input" id="authPwaUsernameInput" placeholder="' + pwaAuthT("usernamePlaceholder") + '" autocomplete="off" />' +
      "</div>" +
      '<label class="auth-banner__code-row" style="justify-content:flex-start;gap:10px;font-size:14px;color:#cbd5e1;">' +
        '<input type="checkbox" id="authPwaRememberPassword" />' +
        '<span>' + pwaAuthT("rememberPassword") + "</span>" +
      "</label>" +
      '<div class="auth-banner__mode-switch">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaLoginModeBtn">' + pwaAuthT("login") + "</button>" +
        '<button type="button" class="auth-banner__mode-link" id="authPwaRegisterModeBtn">' + pwaAuthT("switchToRegister") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaCodeSendRow">' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--send" id="authPwaCodeSendBtn">' + pwaAuthT("sendCode") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-hint auth-banner__code-hint--hidden" id="authPwaCodeHint" role="status" aria-live="polite"></div>' +
      '<div class="auth-banner__code-row auth-banner__code-row--verify" id="authPwaCodeVerifyRow">' +
        '<input type="text" class="auth-banner__code-input auth-banner__code-input--otp" id="authPwaCodeInput" placeholder="' + pwaAuthT("codeFromTelegram") + '" inputmode="numeric" autocomplete="one-time-code" />' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--verify" id="authPwaCodeVerifyBtn">' + pwaAuthT("done") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaPasswordRow">' +
        '<div class="auth-banner__password-wrap">' +
          '<input type="password" class="auth-banner__code-input auth-banner__password-input" id="authPwaPasswordInput" placeholder="' + pwaAuthT("setPassword") + '" autocomplete="current-password" />' +
          '<button type="button" class="auth-banner__password-toggle" id="authPwaPasswordToggle" aria-label="' + pwaAuthT("showPassword") + '" aria-pressed="false">👁</button>' +
        "</div>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaPasswordConfirmRow">' +
        '<input type="password" class="auth-banner__code-input" id="authPwaPasswordConfirmInput" placeholder="' + pwaAuthT("confirmPassword") + '" autocomplete="new-password" />' +
      "</div>" +
      '<div class="auth-banner__primary-action" id="authPwaRegisterActionRow">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaRegisterSubmitBtn">' + pwaAuthT("register") + "</button>" +
      "</div>" +
      '<div class="auth-banner__secondary-action" id="authPwaRegisterBottomRow">' +
      "</div>";
    mount.appendChild(wrap);

    var backBtn = wrap.querySelector("#authPwaCodeBackBtn");
    var userInput = wrap.querySelector("#authPwaUsernameInput");
    var passwordInput = wrap.querySelector("#authPwaPasswordInput");
    var passwordToggle = wrap.querySelector("#authPwaPasswordToggle");
    var loginModeBtn = wrap.querySelector("#authPwaLoginModeBtn");
    var registerModeBtn = wrap.querySelector("#authPwaRegisterModeBtn");
    var rememberPassword = wrap.querySelector("#authPwaRememberPassword");
    var rememberPasswordRow = rememberPassword ? rememberPassword.parentElement : null;
    var passwordConfirmInput = wrap.querySelector("#authPwaPasswordConfirmInput");
    var codeSendRow = wrap.querySelector("#authPwaCodeSendRow");
    var codeVerifyRow = wrap.querySelector("#authPwaCodeVerifyRow");
    var passwordRow = wrap.querySelector("#authPwaPasswordRow");
    var passwordConfirmRow = wrap.querySelector("#authPwaPasswordConfirmRow");
    var codeInput = wrap.querySelector("#authPwaCodeInput");
    var sendBtn = wrap.querySelector("#authPwaCodeSendBtn");
    var verifyBtn = wrap.querySelector("#authPwaCodeVerifyBtn");
    var registerSubmitBtn = wrap.querySelector("#authPwaRegisterSubmitBtn");
    var registerBottomRow = wrap.querySelector("#authPwaRegisterBottomRow");
    var hint = wrap.querySelector("#authPwaCodeHint");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var TG_LOGIN_LAST_KEY = "poker_auth_last_tg_username";

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        (deps.remountCurrentAuthEnterScreen || function () {})();
      });
    }
    function shortenPwaAuthHintForUi(raw, isError) {
      var s = raw != null ? String(raw).trim() : "";
      if (!isError || !s) return s;
      if (s.indexOf("\n\n") !== -1 || s.length > 320) {
        return getPwaAuthLocale() === "en"
          ? "Unable to continue. Please check the username and the steps above."
          : "Не удалось. Проверьте @username и шаги в инструкции выше.";
      }
      return s;
    }
    function setHint(text, isError) {
      var display = shortenPwaAuthHintForUi(text, !!isError);
      if (!hint) {
        if (isError && display && (deps.shouldUseOverlayAuthScreen ? deps.shouldUseOverlayAuthScreen() : false)) {
          try {
            alert(display);
          } catch (eA) {}
        }
        return;
      }
      hint.innerHTML = "";
      hint.textContent = display || "";
      hint.classList.toggle("auth-banner__code-hint--error", !!isError);
      hint.classList.toggle("auth-banner__code-hint--hidden", !display);
    }
    function showCodeSentToBotHint() {
      if (!hint) {
        if ((deps.shouldUseOverlayAuthScreen ? deps.shouldUseOverlayAuthScreen() : false)) {
          try {
            alert(pwaAuthT("sentTelegramCode"));
          } catch (eAl) {}
        }
        return;
      }
      hint.classList.remove("auth-banner__code-hint--hidden");
      hint.classList.remove("auth-banner__code-hint--error");
      hint.innerHTML = "";
      hint.textContent = pwaAuthT("sentTelegramCode");
    }
    function normalizeUsernameInput() {
      var raw = userInput && userInput.value ? userInput.value : "";
      return String(raw).trim().replace(/^@+/, "").toLowerCase();
    }
    function readLastUsername() {
      try {
        var raw = typeof localStorage !== "undefined" ? localStorage.getItem(TG_LOGIN_LAST_KEY) : "";
        raw = String(raw || "").trim().replace(/^@+/, "").toLowerCase();
        return /^[a-z0-9_]{5,32}$/.test(raw) ? raw : "";
      } catch (eLastUser) {
        return "";
      }
    }
    function saveLastUsername(username) {
      try {
        if (typeof localStorage === "undefined") return;
        var v = String(username || "").trim().replace(/^@+/, "").toLowerCase();
        if (v) localStorage.setItem(TG_LOGIN_LAST_KEY, v);
      } catch (eSaveUser) {}
    }
    var lastUsername = readLastUsername();
    if (userInput && lastUsername) userInput.value = "@" + lastUsername;
    if (passwordInput) passwordInput.value = pokerReadSavedPassword();
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", function () {
        var show = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", show ? "text" : "password");
        passwordToggle.setAttribute("aria-pressed", show ? "true" : "false");
        passwordToggle.setAttribute("aria-label", show ? pwaAuthT("hidePassword") : pwaAuthT("showPassword"));
      });
    }
    if (rememberPassword) rememberPassword.checked = pokerShouldRememberPassword();
    function passwordValue() {
      return String(passwordInput && passwordInput.value ? passwordInput.value : "");
    }
    function passwordConfirmValue() {
      return String(passwordConfirmInput && passwordConfirmInput.value ? passwordConfirmInput.value : "");
    }
    function persistPassword() {
      pokerPersistPasswordPreference(passwordValue(), !!(rememberPassword && rememberPassword.checked));
    }
    var authMode = initialMode === "register" ? "register" : "login";
    function syncAuthModeUi() {
      var registerMode = authMode === "register";
      wrap.setAttribute("data-auth-mode", authMode);
      if (passwordRow && registerMode && passwordConfirmRow && passwordRow.nextSibling !== passwordConfirmRow) {
        wrap.insertBefore(passwordRow, passwordConfirmRow);
      }
      if (passwordRow && !registerMode && rememberPasswordRow && passwordRow.nextSibling !== rememberPasswordRow) {
        wrap.insertBefore(passwordRow, rememberPasswordRow);
      }
      if (loginModeBtn) loginModeBtn.style.display = registerMode ? "none" : "";
      if (registerModeBtn) registerModeBtn.textContent = registerMode ? pwaAuthT("switchToLogin") : pwaAuthT("switchToRegister");
      if (registerModeBtn && registerBottomRow && registerMode && registerModeBtn.parentElement !== registerBottomRow) {
        registerBottomRow.appendChild(registerModeBtn);
      }
      if (registerModeBtn && loginModeBtn && !registerMode && registerModeBtn.parentElement !== loginModeBtn.parentElement) {
        loginModeBtn.parentElement.appendChild(registerModeBtn);
      }
      if (codeSendRow) codeSendRow.style.display = registerMode ? "" : "none";
      if (codeVerifyRow) codeVerifyRow.style.display = registerMode ? "" : "none";
      if (passwordRow) passwordRow.style.display = "";
      if (passwordConfirmRow) passwordConfirmRow.style.display = registerMode ? "" : "none";
      if (registerSubmitBtn) registerSubmitBtn.style.display = registerMode ? "" : "none";
      if (registerBottomRow) registerBottomRow.style.display = registerMode ? "flex" : "none";
    }
    function switchTelegramToPasswordSetup() {
      authMode = "register";
      syncAuthModeUi();
      setHint(pwaAuthT("telegramPasswordSetupHint"), true);
      if (sendBtn && sendBtn.focus) sendBtn.focus();
    }
    function completeTelegramPasswordAuth(data, username) {
      if (!(data && data.ok && data.user && data.pwaSession)) return false;
      try {
        saveLastUsername(username);
      } catch (eSaveLastUsername) {}
      try {
        persistPassword();
      } catch (ePersistPassword) {}
      try {
        if (data.dtId) {
          sessionStorage.setItem("poker_dt_id", data.dtId);
          if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
        }
      } catch (eDtSave) {}
      var u = null;
      try {
        u = normalizeVerifiedUser(data.user, null);
      } catch (eNormalizeUser) {
        u = data.user || null;
      }
      var savedSession = false;
      try {
        savedSession = pokerSavePwaTgSession(
          data.pwaSession,
          data.user,
          {
            gazettePlannerAccess: data.gazettePlannerAccess === true,
            adminAccess: data.adminAccess === true,
            adminReportAccess: data.adminReportAccess === true,
            authMethod: "telegram",
          }
        );
      } catch (eSaveSession) {
        savedSession = false;
      }
      if (!savedSession) {
        try {
          pwaSessionPersistenceWarning();
        } catch (ePersistWarning) {}
      }
      try {
        pokerSavePwaGuestMode(false);
      } catch (eClearGuest) {}
      var nextAuth = { status: "verified", user: u, error: null };
      if (data.gazettePlannerAccess === true) nextAuth.gazettePlannerAccess = true;
      if (data.adminAccess === true) nextAuth.adminAccess = true;
      if (data.adminReportAccess === true) nextAuth.adminReportAccess = true;
      try {
        window.__pokerTelegramAuth = nextAuth;
      } catch (eSetAuth) {}
      try {
        if (typeof pokerMaybeRememberMemberIdFromUser === "function") pokerMaybeRememberMemberIdFromUser(u);
      } catch (eRememberMember) {}
      try {
        pokerSetAuthMethod("telegram");
      } catch (eSetMethod) {}
      try {
        setHint("", false);
      } catch (eClearHint) {}
      try {
        (deps.updateHeaderGreeting || function () {})();
      } catch (eUpdateGreeting) {}
      try {
        (deps.showAuthorized || function () {})(u);
      } catch (eShowAuthorized) {}
      try {
        if (typeof pokerForceClosePwaAuthScreenAfterSuccess === "function") pokerForceClosePwaAuthScreenAfterSuccess();
      } catch (eForceCloseAuth) {}
      try {
        (deps.loadHeaderAvatar || function () {})();
      } catch (eLoadAvatar) {}
      try {
        window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true } }));
      } catch (eDispatch) {}
      return true;
    }
    function telegramPasswordLogin(username, password, fallbackMessage, allowSetupSwitch) {
      return pokerAuthFetch(base + "/api/auth-pwa-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          typeof pokerApiAuthJsonBody === "function"
            ? pokerApiAuthJsonBody({ action: "login", username: username, password: password })
            : { action: "login", username: username, password: password }
        ),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
        .then(function (data) {
          if (completeTelegramPasswordAuth(data, username)) return true;
          if (data && data.passwordSetupRequired && allowSetupSwitch) {
            switchTelegramToPasswordSetup();
            return true;
          }
          setHint(fallbackMessage || (data && data.error) || pwaAuthT("loginFailed"), true);
          return false;
        })
        .catch(function () {
          setHint(fallbackMessage || pwaAuthT("networkRetry"), true);
          return false;
        });
    }
    if (loginModeBtn) {
      var loginInflightId = 0;
      function setLoginBusy(on) {
        if (!loginModeBtn) return;
        loginModeBtn.disabled = !!on;
        loginModeBtn.textContent = on ? pwaAuthT("checkingPassword") : pwaAuthT("login");
      }
      loginModeBtn.addEventListener("click", function () {
        authMode = "login";
        syncAuthModeUi();
        var username = normalizeUsernameInput();
        if (!/^[a-z0-9_]{5,32}$/.test(username)) {
          setHint(pwaAuthT("invalidUsernameShort"), true);
          return;
        }
        setHint(pwaAuthT("checkingPassword"), false);
        var runId = ++loginInflightId;
        var watchdog = setTimeout(function () {
          if (loginInflightId !== runId) return;
          loginInflightId++;
          setLoginBusy(false);
          setHint(pwaAuthT("networkRetry"), true);
        }, 9000);
        setLoginBusy(true);
        telegramPasswordLogin(username, passwordValue(), "", true).then(function (result) {
          if (loginInflightId !== runId) return result;
          clearTimeout(watchdog);
          setLoginBusy(false);
          return result;
        }, function (err) {
          if (loginInflightId === runId) {
            clearTimeout(watchdog);
            setLoginBusy(false);
          }
          return Promise.reject(err);
        });
      });
    }
    if (registerModeBtn) {
      registerModeBtn.addEventListener("click", function () {
        authMode = authMode === "register" ? "login" : "register";
        syncAuthModeUi();
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var username = normalizeUsernameInput();
        if (!/^[a-z0-9_]{5,32}$/.test(username)) {
          setHint(pwaAuthT("invalidUsernameLong"), true);
          return;
        }
        sendBtn.disabled = true;
        sendBtn.textContent = pwaAuthT("sendingCode");
        if (hint) {
          hint.innerHTML = "";
          hint.classList.add("auth-banner__code-hint--hidden");
          hint.classList.remove("auth-banner__code-hint--error");
        }
        pokerAuthFetch(base + "/api/auth-pwa-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            typeof pokerApiAuthJsonBody === "function"
              ? pokerApiAuthJsonBody({ action: "request", username: username })
              : { action: "request", username: username }
          ),
        })
          .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
          .then(function (data) {
            if (data && data.ok) {
              saveLastUsername(username);
              showCodeSentToBotHint();
              if (codeInput && codeInput.focus) codeInput.focus();
            } else {
              setHint((data && data.error) || pwaAuthT("sendCodeFailed"), true);
            }
          })
          .catch(function () {
            setHint(pwaAuthT("networkRetry"), true);
          })
          .then(function (result) {
            sendBtn.disabled = false;
            sendBtn.textContent = pwaAuthT("sendCode");
            return result;
          }, function (err) {
            sendBtn.disabled = false;
            sendBtn.textContent = pwaAuthT("sendCode");
            return Promise.reject(err);
          });
      });
    }
    var verifyInflight = false;
    function tryVerifyCode(opts) {
      opts = opts || {};
      var fromButton = !!opts.fromButton;
      if (verifyInflight || !codeInput) return;
      var username = normalizeUsernameInput();
      var code = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
      if (codeInput.value !== code) codeInput.value = code;
      if (!/^[a-z0-9_]{5,32}$/.test(username)) {
        if (code.length >= 6 || fromButton) setHint(pwaAuthT("invalidUsernameShort"), true);
        return;
      }
      if (passwordValue() !== passwordConfirmValue()) {
        setHint(pwaAuthT("passwordsMismatch"), true);
        return;
      }
      if (!/^\d{6}$/.test(code)) {
        if (fromButton) setHint(pwaAuthT("enterTelegramCode"), true);
        return;
      }
      verifyInflight = true;
      codeInput.disabled = true;
      if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.textContent = pwaAuthT("verifying");
      }
      if (registerSubmitBtn) registerSubmitBtn.disabled = true;
      pokerAuthFetch(base + "/api/auth-pwa-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          typeof pokerApiAuthJsonBody === "function"
            ? pokerApiAuthJsonBody({ action: "verify", username: username, code: code, password: passwordValue() })
            : { action: "verify", username: username, code: code, password: passwordValue() }
        ),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
        .then(function (data) {
          if (completeTelegramPasswordAuth(data, username)) return true;
          var err = (data && data.error) || pwaAuthT("codeNotVerified");
          if (passwordValue() && /ист[её]к|expired/i.test(err)) {
            return telegramPasswordLogin(username, passwordValue(), err, false);
          }
          setHint(err, true);
          return false;
        })
        .catch(function () {
          if (passwordValue()) {
            return telegramPasswordLogin(username, passwordValue(), pwaAuthT("networkRetry"), false);
          }
          setHint(pwaAuthT("networkRetry"), true);
          return false;
        })
        .then(function (result) {
          verifyInflight = false;
          if (codeInput) codeInput.disabled = false;
          if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.textContent = pwaAuthT("done");
          }
          if (registerSubmitBtn) registerSubmitBtn.disabled = false;
          return result;
        }, function (err) {
          verifyInflight = false;
          if (codeInput) codeInput.disabled = false;
          if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.textContent = pwaAuthT("done");
          }
          if (registerSubmitBtn) registerSubmitBtn.disabled = false;
          return Promise.reject(err);
        });
    }
    if (verifyBtn) {
      verifyBtn.addEventListener("click", function () {
        tryVerifyCode({ fromButton: true });
      });
    }
    if (registerSubmitBtn) {
      registerSubmitBtn.addEventListener("click", function () {
        tryVerifyCode({ fromButton: true });
      });
    }
    syncAuthModeUi();
    if (codeInput) {
      codeInput.addEventListener("input", function () {
        var d = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
        if (codeInput.value !== d) codeInput.value = d;
        if (d.length === 6) tryVerifyCode();
      });
      codeInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          tryVerifyCode({ fromButton: true });
        }
      });
    }
  }

  window.pokerMountPwaUsernameCodeLogin = pokerMountPwaUsernameCodeLogin;
})();
