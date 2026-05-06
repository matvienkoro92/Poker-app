function initPwaAuthOverlayRuntime(ctx) {
  var runtime = ctx || {};

  function shouldUseOverlayAuthScreen() {
    return !!(runtime.shouldUseOverlayAuthScreen && runtime.shouldUseOverlayAuthScreen());
  }

  function pwaAuthScreenEl() {
    return runtime.pwaAuthScreenEl || document.getElementById("pwaAuthScreen");
  }

  function pwaAuthLoginMountEl() {
    return runtime.pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
  }

  function identifyingMiniEl() {
    return runtime.identifyingMiniEl || document.getElementById("authIdentifyingMini");
  }

  function showPwaAuthScreen() {
    var screen = pwaAuthScreenEl();
    if (!shouldUseOverlayAuthScreen() || !screen) return;
    screen.classList.remove("pwa-auth-screen--hidden");
    screen.setAttribute("aria-hidden", "false");
    try {
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (e) {}
  }

  function hidePwaAuthScreen() {
    var screen = pwaAuthScreenEl();
    if (!screen) return;
    try {
      screen.classList.remove("pwa-auth-screen--identifying");
    } catch (eId) {}
    screen.classList.add("pwa-auth-screen--hidden");
    screen.setAttribute("aria-hidden", "true");
    try {
      document.body.classList.remove("pwa-auth-gated");
      document.body.classList.remove("pwa-auth-preinit");
    } catch (e) {}
  }

  function isOverlayAuthScreenActive() {
    var screen = pwaAuthScreenEl();
    if (!screen) return false;
    if (document.body && document.body.classList.contains("pwa-auth-gated")) return true;
    return screen.getAttribute("aria-hidden") === "false";
  }

  function rerenderCurrentPwaAuthScreen() {
    if (!shouldUseOverlayAuthScreen() && !isOverlayAuthScreenActive()) {
      if (runtime.syncPwaAuthLanguageUi) runtime.syncPwaAuthLanguageUi();
      return;
    }
    var mount = pwaAuthLoginMountEl();
    if (!mount) {
      if (runtime.syncPwaAuthLanguageUi) runtime.syncPwaAuthLanguageUi();
      return;
    }
    if (runtime.syncPwaAuthLanguageUi) runtime.syncPwaAuthLanguageUi();
    if (mount.querySelector(".auth-banner__email-login")) {
      var emailWrap = mount.querySelector(".auth-banner__email-login");
      var emailMode = emailWrap && emailWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      if (runtime.mountPwaEmailLogin) runtime.mountPwaEmailLogin(mount, emailMode);
      return;
    }
    if (mount.querySelector(".auth-banner__code-login")) {
      var tgWrap = mount.querySelector(".auth-banner__code-login");
      var tgMode = tgWrap && tgWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      var actionsMount = runtime.ensurePwaVerificationForm ? runtime.ensurePwaVerificationForm(mount) || mount : mount;
      if (runtime.mountPwaUsernameCodeLogin) runtime.mountPwaUsernameCodeLogin(actionsMount, tgMode);
      return;
    }
    if (runtime.remountPwaStandaloneEnterScreen) runtime.remountPwaStandaloneEnterScreen();
  }

  function showIdentifyingMini() {
    var el = identifyingMiniEl();
    if (!el) return;
    el.classList.remove("auth-identifying-mini--hidden");
    el.setAttribute("aria-busy", "true");
  }

  function hideIdentifyingMini() {
    var el = identifyingMiniEl();
    if (!el) return;
    el.classList.add("auth-identifying-mini--hidden");
    el.setAttribute("aria-busy", "false");
  }

  function setPwaAuthScreenNotice(message) {
    var screen = pwaAuthScreenEl();
    if (!screen) return;
    var inner = screen.querySelector(".pwa-auth-screen__inner");
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
    if (runtime.banner) {
      runtime.banner.classList.add("auth-banner--hidden");
      runtime.banner.classList.remove("auth-banner--verifying");
    }
    if (runtime.bannerRetry) runtime.bannerRetry.hidden = true;
    if (runtime.bannerLink) runtime.bannerLink.style.display = "none";
    if (runtime.hintEl) {
      runtime.hintEl.textContent = "";
      runtime.hintEl.style.display = "none";
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
    var screen = pwaAuthScreenEl();
    if (screen) {
      screen.classList.remove("pwa-auth-screen--hidden");
      screen.setAttribute("aria-hidden", "false");
    }
    try {
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (eBodyAuthOpen) {}
    try {
      setPwaAuthIdentifyingPhase(false);
    } catch (eOpenAuthId) {}
    if (runtime.remountPwaStandaloneEnterScreen) runtime.remountPwaStandaloneEnterScreen();
    if (runtime.ensureOverlayAuthEntryMounted) runtime.ensureOverlayAuthEntryMounted();
    setTimeout(function () {
      if (runtime.ensureOverlayAuthEntryMounted) runtime.ensureOverlayAuthEntryMounted();
    }, 0);
    setTimeout(function () {
      if (runtime.ensureOverlayAuthEntryMounted) runtime.ensureOverlayAuthEntryMounted();
    }, 120);
  }

  function setPwaAuthIdentifyingPhase(on) {
    var screen = pwaAuthScreenEl();
    if (!screen) return;
    var panel = document.getElementById("pwaAuthIdentifyingPanel");
    try {
      if (on) {
        if (panel) {
          screen.classList.add("pwa-auth-screen--identifying");
          panel.hidden = false;
          panel.setAttribute("aria-busy", "true");
        }
        screen.setAttribute("aria-busy", "true");
        if (runtime.appEl) runtime.appEl.setAttribute("aria-busy", "true");
        showIdentifyingMini();
      } else {
        screen.classList.remove("pwa-auth-screen--identifying");
        screen.setAttribute("aria-busy", "false");
        if (panel) {
          panel.hidden = true;
          panel.setAttribute("aria-busy", "false");
        }
        if (runtime.appEl) runtime.appEl.setAttribute("aria-busy", "false");
        hideIdentifyingMini();
      }
    } catch (eIdPhase) {}
  }

  return {
    hideLegacyInlineAuthUi: hideLegacyInlineAuthUi,
    hideIdentifyingMini: hideIdentifyingMini,
    hidePwaAuthScreen: hidePwaAuthScreen,
    isOverlayAuthScreenActive: isOverlayAuthScreenActive,
    openOverlayAuthEntryScreen: openOverlayAuthEntryScreen,
    rerenderCurrentPwaAuthScreen: rerenderCurrentPwaAuthScreen,
    setPwaAuthIdentifyingPhase: setPwaAuthIdentifyingPhase,
    setPwaAuthScreenNotice: setPwaAuthScreenNotice,
    showIdentifyingMini: showIdentifyingMini,
    showPwaAuthScreen: showPwaAuthScreen,
  };
}
