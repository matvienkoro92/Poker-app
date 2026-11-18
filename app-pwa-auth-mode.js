function initPwaAuthModeRuntime() {
  function getTelegramWebAppNow() {
    return typeof isTelegramWebApp === "function" && isTelegramWebApp() && window.Telegram && window.Telegram.WebApp
      ? window.Telegram.WebApp
      : null;
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

  function isPwaStandaloneAuth() {
    return isPwaStandaloneMode();
  }

  function shouldUseOverlayAuthScreen() {
    return isPwaStandaloneMode();
  }

  function shouldSuppressMiniAppPwaLoginBanner() {
    return false;
  }

  function getVkAppIdForPwa() {
    var el = document.getElementById("app");
    var id = el && el.getAttribute("data-vk-app-id");
    id = id != null ? String(id).trim() : "";
    return /^\d+$/.test(id) ? id : "";
  }

  function getTelegramBotIdFromAppAttr() {
    var el = document.getElementById("app");
    var raw = el && el.getAttribute("data-telegram-bot-id");
    raw = raw != null ? String(raw).trim() : "";
    if (!/^\d+$/.test(raw)) return 0;
    var n = parseInt(raw, 10);
    return n > 0 ? n : 0;
  }

  return {
    getVkAppIdForPwa: getVkAppIdForPwa,
    getTelegramBotIdFromAppAttr: getTelegramBotIdFromAppAttr,
    getTelegramWebAppNow: getTelegramWebAppNow,
    isPwaStandaloneAuth: isPwaStandaloneAuth,
    isPwaStandaloneMode: isPwaStandaloneMode,
    shouldSuppressMiniAppPwaLoginBanner: shouldSuppressMiniAppPwaLoginBanner,
    shouldUseOverlayAuthScreen: shouldUseOverlayAuthScreen,
  };
}
