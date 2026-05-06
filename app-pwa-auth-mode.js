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

  return {
    getTelegramWebAppNow: getTelegramWebAppNow,
    isPwaStandaloneAuth: isPwaStandaloneAuth,
    isPwaStandaloneMode: isPwaStandaloneMode,
    shouldSuppressMiniAppPwaLoginBanner: shouldSuppressMiniAppPwaLoginBanner,
    shouldUseOverlayAuthScreen: shouldUseOverlayAuthScreen,
  };
}
