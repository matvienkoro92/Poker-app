function initPwaAuthRestoreRuntime(deps) {
  deps = deps || {};
  var normalizeVerifiedUser = deps.normalizeVerifiedUser || function (user) { return user || null; };
  var pokerMaybeRememberMemberIdFromUser = deps.pokerMaybeRememberMemberIdFromUser || function () {};
  var pokerSetAuthMethod = deps.pokerSetAuthMethod || function () {};
  var updateHeaderGreeting = deps.updateHeaderGreeting || function () {};
  var showAuthorized = deps.showAuthorized || function () {};
  var loadHeaderAvatar = deps.loadHeaderAvatar || function () {};
  var tryFinishVkOAuth = deps.tryFinishVkOAuth || function () { return false; };
  var tryFinishTelegramLoginRedirect = deps.tryFinishTelegramLoginRedirect || function () { return false; };
  var showPwaAuthScreen = deps.showPwaAuthScreen || function () {};
  var setPwaAuthIdentifyingPhase = deps.setPwaAuthIdentifyingPhase || function () {};
  var hideIdentifyingMini = deps.hideIdentifyingMini || function () {};
  var resetBannerForPwaLogin = deps.resetBannerForPwaLogin || function () {};
  var showPwaStandaloneEntryScreen = deps.showPwaStandaloneEntryScreen || function () {};
  var getPwaAuthScreenEl = deps.getPwaAuthScreenEl || function () { return null; };
  var identifyMinMs = deps.identifyMinMs || 620;
  var tgSessionKey = deps.tgSessionKey || (typeof POKER_PWA_TG_SESSION_KEY !== "undefined" ? POKER_PWA_TG_SESSION_KEY : "");
  var vkSessionKey = deps.vkSessionKey || (typeof POKER_PWA_VK_SESSION_KEY !== "undefined" ? POKER_PWA_VK_SESSION_KEY : "");
  var restoreTimeoutMs = deps.restoreTimeoutMs || 2200;

  function shouldKeepGuestMode() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.status === "guest") return true;
    } catch (eAuthGuest) {}
    try {
      return typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestMode) {
      return false;
    }
  }

  function restoreSavedPwaAuthBeforeGate() {
    if (shouldKeepGuestMode()) return false;
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


  function attemptPwaSideAuthRestore(hideBootOverlay) {
    if (shouldKeepGuestMode()) return false;
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
    if (shouldKeepGuestMode()) return false;
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
    return pokerRestoreWithTimeout(pokerReadPwaSessionRecordSafely(tgSessionKey)
      .then(function (so) {
        if (restorePwaSideAuthRecord(so, { hideBootOverlay: hideBootOverlay })) return true;
        return pokerReadPwaSessionRecordSafely(vkSessionKey).then(function (soV) {
          return restorePwaSideAuthRecord(soV, { hideBootOverlay: hideBootOverlay, vk: true });
        });
      })
      .catch(function () {
        return false;
      }));
  }

  function pokerReadPwaSessionRecordSafely(key) {
    try {
      return Promise.resolve(pokerReadPwaSessionRecordAsync(key)).catch(function () {
        return null;
      });
    } catch (eReadSession) {
      return Promise.resolve(null);
    }
  }

  function pokerRestoreWithTimeout(promise) {
    return new Promise(function (resolve) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        resolve(false);
      }, restoreTimeoutMs);
      promise
        .then(function (value) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(!!value);
        })
        .catch(function () {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(false);
        });
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
      if (shouldKeepGuestMode()) {
        try {
          setPwaAuthIdentifyingPhase(false);
        } catch (eGuestPhase) {}
        return;
      }
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
      if (shouldKeepGuestMode()) {
        setPwaAuthIdentifyingPhase(false);
        return;
      }
      if (restored) {
        setPwaAuthIdentifyingPhase(false);
        return;
      }
      setTimeout(finishPwaStandaloneIdentifyUi, identifyMinMs);
    });
    /* Фолбэк: если основной таймер не отработал или фаза залипла — снять «идентификацию» и показать кнопки входа. */
    setTimeout(function () {
      try {
        if (!getPwaAuthScreenEl() || !getPwaAuthScreenEl().classList.contains("pwa-auth-screen--identifying")) return;
        finishPwaStandaloneIdentifyUi();
      } catch (eWd) {}
    }, 5000);
  }


  return {
    restoreSavedPwaAuthBeforeGate: restoreSavedPwaAuthBeforeGate,
    attemptPwaSideAuthRestore: attemptPwaSideAuthRestore,
    restorePwaSideAuthRecord: restorePwaSideAuthRecord,
    attemptPwaSideAuthRestoreAsync: attemptPwaSideAuthRestoreAsync,
    runPwaStandaloneUnidentifiedFlow: runPwaStandaloneUnidentifiedFlow
  };
}
