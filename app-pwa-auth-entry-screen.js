// PWA auth entry buttons and overlay entry-screen mounting.

function initPwaAuthEntryScreenRuntime(deps) {
  deps = deps || {};
  var pwaAuthT = typeof deps.pwaAuthT === "function" ? deps.pwaAuthT : function () { return ""; };

  function getPwaAuthLoginMountEl() {
    return typeof deps.getPwaAuthLoginMountEl === "function"
      ? deps.getPwaAuthLoginMountEl()
      : document.getElementById("pwaAuthLoginMount");
  }

  function mountPwaEmailLogin(mount, initialMode) {
    if (typeof deps.mountPwaEmailLogin === "function") return deps.mountPwaEmailLogin(mount, initialMode);
    return undefined;
  }

  function mountPwaUsernameCodeLogin(mount, initialMode) {
    if (typeof deps.mountPwaUsernameCodeLogin === "function") return deps.mountPwaUsernameCodeLogin(mount, initialMode);
    return undefined;
  }

  function ensurePwaVerificationForm(mount) {
    return typeof deps.ensurePwaVerificationForm === "function" ? deps.ensurePwaVerificationForm(mount) : mount;
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
      if (typeof deps.pokerSavePwaGuestMode === "function") deps.pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e0) {}
      mount.innerHTML = "";
      mountPwaEmailLogin(mount);
    });
    btn.addEventListener("click", function () {
      if (typeof deps.pokerSavePwaGuestMode === "function") deps.pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e) {}
      mount.innerHTML = "";
      var actionsMount = ensurePwaVerificationForm(mount) || mount;
      mountPwaUsernameCodeLogin(actionsMount);
    });
    if (guestBtn) {
      guestBtn.addEventListener("click", function () {
        if (typeof deps.pokerSavePwaGuestMode === "function") deps.pokerSavePwaGuestMode(true);
        try {
          window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        } catch (eAuth) {}
        if (typeof deps.updateHeaderGreeting === "function") deps.updateHeaderGreeting();
        if (typeof deps.updateProfileExitBtnVisibility === "function") deps.updateProfileExitBtnVisibility();
        try {
          if (typeof window.__pokerResetHeaderPoker21GuestStatus === "function") window.__pokerResetHeaderPoker21GuestStatus();
        } catch (eGuestFish) {}
        if (typeof deps.hidePwaAuthScreen === "function") deps.hidePwaAuthScreen();
        if (typeof deps.hideIdentifyingMini === "function") deps.hideIdentifyingMini();
        try {
          var banner = typeof deps.getBanner === "function" ? deps.getBanner() : null;
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
    var m = getPwaAuthLoginMountEl();
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
    var m = getPwaAuthLoginMountEl();
    if (!m) return;
    m.innerHTML = "";
    try {
      m.removeAttribute("data-pwa-enter-mounted");
    } catch (eRm) {}
    mountPwaStandaloneEnterButton();
  }

  function ensureOverlayAuthEntryMounted() {
    var mount = getPwaAuthLoginMountEl();
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
    var useOverlay = false;
    try {
      useOverlay =
        (typeof deps.shouldUseOverlayAuthScreen === "function" && deps.shouldUseOverlayAuthScreen()) ||
        (typeof deps.isOverlayAuthScreenActive === "function" && deps.isOverlayAuthScreenActive());
    } catch (eOverlay) {}
    if (useOverlay) {
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
    if (typeof deps.shouldUseOverlayAuthScreen === "function" && !deps.shouldUseOverlayAuthScreen()) return;
    try {
      if (typeof deps.showPwaAuthScreen === "function") deps.showPwaAuthScreen();
    } catch (eShowPwa) {}
    try {
      if (typeof deps.setPwaAuthIdentifyingPhase === "function") deps.setPwaAuthIdentifyingPhase(false);
    } catch (eIdOff) {}
    try {
      if (typeof deps.hideIdentifyingMini === "function") deps.hideIdentifyingMini();
    } catch (eMini) {}
    try {
      if (typeof deps.resetBannerForPwaLogin === "function") deps.resetBannerForPwaLogin();
    } catch (eBanner) {}
    try {
      remountPwaStandaloneEnterScreen();
    } catch (eRemount) {}
  }

  return {
    mountPwaStandaloneEnterButton: mountPwaStandaloneEnterButton,
    mountMiniAppAuthEnterButtons: mountMiniAppAuthEnterButtons,
    remountPwaStandaloneEnterScreen: remountPwaStandaloneEnterScreen,
    ensureOverlayAuthEntryMounted: ensureOverlayAuthEntryMounted,
    remountCurrentAuthEnterScreen: remountCurrentAuthEnterScreen,
    showPwaStandaloneEntryScreen: showPwaStandaloneEntryScreen,
  };
}
