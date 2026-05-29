// PWA email login/register form.
(function initPwaAuthEmailLoginModule() {
  function pokerMountPwaEmailLogin(mount, initialMode, deps) {
    deps = deps || {};
    if (!mount) return;
    if (mount.querySelector(".auth-banner__email-login")) return;
    var wrap = document.createElement("div");
    wrap.className = "auth-banner__email-login auth-banner__code-login";
    wrap.innerHTML =
      '<div class="auth-banner__code-row auth-banner__code-row--back">' +
        '<button type="button" class="pwa-auth-screen__back-icon-btn" id="authPwaEmailBackBtn" aria-label="' + pwaAuthT("backToChoice") + '">' +
          '<span class="pwa-auth-screen__back-icon" aria-hidden="true">←</span>' +
        "</button>" +
      "</div>" +
      '<div class="auth-banner__code-intro-wrap" role="note">' +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro1") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro2") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro3") + "</p>" +
      "</div>" +
      '<div class="auth-banner__code-row">' +
        '<input type="email" class="auth-banner__code-input" id="authPwaEmailInput" placeholder="your@email.com" autocomplete="email" />' +
      "</div>" +
      '<label class="auth-banner__code-row" style="justify-content:flex-start;gap:10px;font-size:14px;color:#cbd5e1;">' +
        '<input type="checkbox" id="authPwaEmailRememberPassword" />' +
        '<span>' + pwaAuthT("rememberPassword") + "</span>" +
      "</label>" +
      '<div class="auth-banner__mode-switch">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaEmailLoginModeBtn">' + pwaAuthT("login") + "</button>" +
        '<button type="button" class="auth-banner__mode-link" id="authPwaEmailRegisterModeBtn">' + pwaAuthT("switchToRegister") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailCodeSendRow">' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--send" id="authPwaEmailSendBtn">' + pwaAuthT("emailSendCode") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-hint auth-banner__code-hint--hidden" id="authPwaEmailHint" role="status" aria-live="polite"></div>' +
      '<div class="auth-banner__code-row auth-banner__code-row--verify" id="authPwaEmailCodeVerifyRow">' +
        '<input type="text" class="auth-banner__code-input auth-banner__code-input--otp" id="authPwaEmailCodeInput" placeholder="' + pwaAuthT("emailCodePlaceholder") + '" inputmode="numeric" autocomplete="one-time-code" />' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--verify" id="authPwaEmailVerifyBtn">' + pwaAuthT("emailVerify") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailPasswordRow">' +
        '<div class="auth-banner__password-wrap">' +
          '<input type="password" class="auth-banner__code-input auth-banner__password-input" id="authPwaEmailPasswordInput" placeholder="' + pwaAuthT("setPassword") + '" autocomplete="current-password" />' +
        '<button type="button" class="auth-banner__password-toggle" id="authPwaEmailPasswordToggle" aria-label="' + pwaAuthT("showPassword") + '" aria-pressed="false">👁</button>' +
        "</div>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailPasswordConfirmRow">' +
        '<input type="password" class="auth-banner__code-input" id="authPwaEmailPasswordConfirmInput" placeholder="' + pwaAuthT("confirmPassword") + '" autocomplete="new-password" />' +
      "</div>" +
      '<div class="auth-banner__primary-action" id="authPwaEmailRegisterActionRow">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaEmailRegisterSubmitBtn">' + pwaAuthT("register") + "</button>" +
      "</div>" +
      '<div class="auth-banner__secondary-action" id="authPwaEmailRegisterBottomRow">' +
      "</div>";
    mount.appendChild(wrap);

    var backBtn = wrap.querySelector("#authPwaEmailBackBtn");
    var emailInput = wrap.querySelector("#authPwaEmailInput");
    var passwordInput = wrap.querySelector("#authPwaEmailPasswordInput");
    var passwordToggle = wrap.querySelector("#authPwaEmailPasswordToggle");
    var loginModeBtn = wrap.querySelector("#authPwaEmailLoginModeBtn");
    var registerModeBtn = wrap.querySelector("#authPwaEmailRegisterModeBtn");
    var rememberPassword = wrap.querySelector("#authPwaEmailRememberPassword");
    var rememberPasswordRow = rememberPassword ? rememberPassword.parentElement : null;
    var passwordConfirmInput = wrap.querySelector("#authPwaEmailPasswordConfirmInput");
    var codeSendRow = wrap.querySelector("#authPwaEmailCodeSendRow");
    var codeVerifyRow = wrap.querySelector("#authPwaEmailCodeVerifyRow");
    var passwordRow = wrap.querySelector("#authPwaEmailPasswordRow");
    var passwordConfirmRow = wrap.querySelector("#authPwaEmailPasswordConfirmRow");
    var codeInput = wrap.querySelector("#authPwaEmailCodeInput");
    var sendBtn = wrap.querySelector("#authPwaEmailSendBtn");
    var verifyBtn = wrap.querySelector("#authPwaEmailVerifyBtn");
    var registerSubmitBtn = wrap.querySelector("#authPwaEmailRegisterSubmitBtn");
    var registerBottomRow = wrap.querySelector("#authPwaEmailRegisterBottomRow");
    var hint = wrap.querySelector("#authPwaEmailHint");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var EMAIL_LAST_KEY = "poker_auth_last_email";

    function setEmailHint(text, isError, isSuccess) {
      if (!hint) return;
      hint.textContent = text || "";
      hint.classList.toggle("auth-banner__code-hint--error", !!isError);
      hint.classList.toggle("auth-banner__code-hint--success", !!isSuccess && !isError);
      hint.classList.toggle("auth-banner__code-hint--hidden", !text);
    }
    function normalizeEmailInput() {
      return String(emailInput && emailInput.value ? emailInput.value : "").trim().toLowerCase();
    }
    if (emailInput) {
      emailInput.addEventListener("input", function () {
        resetEmailRegisterVerification();
      });
    }
    function readLastEmail() {
      try {
        var raw = typeof localStorage !== "undefined" ? localStorage.getItem(EMAIL_LAST_KEY) : "";
        raw = String(raw || "").trim().toLowerCase();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : "";
      } catch (eLastEmail) {
        return "";
      }
    }
    function saveLastEmail(email) {
      try {
        if (typeof localStorage === "undefined") return;
        var v = String(email || "").trim().toLowerCase();
        if (v) localStorage.setItem(EMAIL_LAST_KEY, v);
      } catch (eSaveEmail) {}
    }
    function getEmailDtIdHint() {
      try {
        var v = (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) || "";
        v = String(v || "").trim().toUpperCase();
        return /^ID\d{6}$/.test(v) ? v : "";
      } catch (eDtHint) {
        return "";
      }
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        (deps.remountCurrentAuthEnterScreen || function () {})();
      });
    }
    var lastEmail = readLastEmail();
    if (emailInput && lastEmail) emailInput.value = lastEmail;
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
    if (codeInput) {
      codeInput.addEventListener("input", function () {
        codeInput.value = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
        resetEmailRegisterVerification();
      });
    }
    var authMode = initialMode === "register" ? "register" : "login";
    var emailCodeConfirmed = false;
    function resetEmailRegisterVerification() {
      emailCodeConfirmed = false;
    }
    function switchEmailToPasswordSetup() {
      authMode = "register";
      resetEmailRegisterVerification();
      syncAuthModeUi();
      setEmailHint(pwaAuthT("emailPasswordSetupHint"), true);
      if (sendBtn && sendBtn.focus) sendBtn.focus();
    }
    function syncAuthModeUi() {
      var registerMode = authMode === "register";
      wrap.setAttribute("data-auth-mode", authMode);
      if (passwordRow && registerMode && passwordConfirmRow && passwordRow.nextSibling !== passwordConfirmRow) {
        wrap.insertBefore(passwordRow, passwordConfirmRow);
      }
      if (passwordRow && !registerMode && rememberPasswordRow && passwordRow.nextSibling !== rememberPasswordRow) {
        wrap.insertBefore(passwordRow, rememberPasswordRow);
      }
      if (loginModeBtn) {
        loginModeBtn.style.display = registerMode ? "none" : "";
      }
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
    function completeEmailPasswordAuth(data, email) {
      if (!(data && data.ok && data.user && data.pwaSession)) return false;
      saveLastEmail(email);
      persistPassword();
      var u = normalizeVerifiedUser(data.user, null);
      try {
        if (data.dtId) {
          sessionStorage.setItem("poker_dt_id", data.dtId);
          if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
        }
      } catch (eDtSave) {}
      if (
        !pokerSavePwaTgSession(
          data.pwaSession,
          data.user,
          {
            gazettePlannerAccess: data.gazettePlannerAccess === true,
            adminAccess: data.adminAccess === true,
            adminReportAccess: data.adminReportAccess === true,
            authMethod: "email",
          }
        )
      ) {
        pwaSessionPersistenceWarning();
      }
      pokerSavePwaGuestMode(false);
      window.__pokerTelegramAuth = { status: "verified", user: u, error: null };
      if (data.gazettePlannerAccess === true) window.__pokerTelegramAuth.gazettePlannerAccess = true;
      if (data.adminAccess === true) window.__pokerTelegramAuth.adminAccess = true;
      if (data.adminReportAccess === true) window.__pokerTelegramAuth.adminReportAccess = true;
      pokerMaybeRememberMemberIdFromUser(u);
      pokerSetAuthMethod("email");
      (deps.updateHeaderGreeting || function () {})();
      (deps.showAuthorized || function () {})(u);
      (deps.loadHeaderAvatar || function () {})();
      try {
        window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, email: true } }));
      } catch (eEmailDispatch) {}
      try {
        pokerClearUiCachesAfterAuthSwitch();
      } catch (eClearUiCaches) {}
      return true;
    }
    if (loginModeBtn) {
      loginModeBtn.addEventListener("click", function () {
        authMode = "login";
        syncAuthModeUi();
        var email = normalizeEmailInput();
        setEmailHint(pwaAuthT("emailCheckingPassword"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "login",
            email: email,
            password: passwordValue(),
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && completeEmailPasswordAuth(data, email)) {
              return;
            }
            if (data && data.passwordSetupRequired) {
              switchEmailToPasswordSetup();
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (registerModeBtn) {
      registerModeBtn.addEventListener("click", function () {
        authMode = authMode === "register" ? "login" : "register";
        if (authMode !== "register") resetEmailRegisterVerification();
        syncAuthModeUi();
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        resetEmailRegisterVerification();
        setEmailHint(pwaAuthT("emailSendingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "request",
            email: email,
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (r) { return r.json().catch(function () { return {}; }); })
          .then(function (data) {
            var okMsg = pwaAuthT("emailSentDefault");
            if (data && data.ok) saveLastEmail(email);
            if (data && data.ok && data.mode === "register") okMsg = pwaAuthT("emailSentRegister");
            if (data && data.ok && data.mode === "login") okMsg = pwaAuthT("emailSentLogin");
            setEmailHint(data && data.ok ? okMsg : ((data && data.error) || pwaAuthT("emailSendFailed")), !(data && data.ok), !!(data && data.ok));
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (verifyBtn) {
      verifyBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        var code = String(codeInput && codeInput.value ? codeInput.value : "").trim();
        setEmailHint(pwaAuthT("emailCheckingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            email: email,
            code: code,
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && data.ok) {
              emailCodeConfirmed = true;
              saveLastEmail(email);
              setEmailHint(pwaAuthT("emailCodeConfirmed"), false);
              if (passwordInput && passwordInput.focus) passwordInput.focus();
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (registerSubmitBtn) {
      registerSubmitBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        var code = String(codeInput && codeInput.value ? codeInput.value : "").trim();
        if (!passwordValue()) {
          setEmailHint(pwaAuthT("passwordRequired"), true);
          return;
        }
        if (passwordValue() !== passwordConfirmValue()) {
          setEmailHint(pwaAuthT("passwordsMismatch"), true);
          return;
        }
        setEmailHint(pwaAuthT("emailCheckingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            email: email,
            code: code,
            password: passwordValue(),
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && completeEmailPasswordAuth(data, email)) {
              return;
            }
            if (pack.res.ok && data.ok && data.passwordRequired) {
              emailCodeConfirmed = true;
              setEmailHint(pwaAuthT("passwordRequired"), true);
              if (passwordInput && passwordInput.focus) passwordInput.focus();
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    syncAuthModeUi();
  }

  window.pokerMountPwaEmailLogin = pokerMountPwaEmailLogin;
})();
