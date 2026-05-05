// PWA на весь экран: 100dvh не сжимается с клавиатурой — поднимаем экран входа по visualViewport
(function initPwaAuthVisualViewportLift() {
  var vvHandler = null;
  function isPwaDisplayStandalone() {
    try {
      if (window.__pokerDisplayStandaloneBoot === true) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
      if (window.navigator && window.navigator.standalone) return true;
    } catch (e) {}
    return false;
  }
  function syncPwaAuthVvInset() {
    var screen = document.getElementById("pwaAuthScreen");
    if (!screen || screen.classList.contains("pwa-auth-screen--hidden")) {
      document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      return;
    }
    if (!document.documentElement.classList.contains("pwa-auth-vv-lift")) return;
    if (!window.visualViewport) {
      document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      return;
    }
    var vv = window.visualViewport;
    var ih = window.innerHeight || 0;
    if (!ih) return;
    var vvh = Number(vv.height) || 0;
    var offsetTop = Number(vv.offsetTop) || 0;
    var heightLoss = Math.max(0, Math.round(ih - vvh));
    var overlap = Math.max(0, Math.round(ih - vvh - offsetTop));
    if (overlap < 20 && heightLoss > overlap + 6) {
      overlap = Math.max(overlap, Math.round(heightLoss - Math.max(0, offsetTop)));
    }
    if (overlap < 8 && vvh + 24 < ih) {
      overlap = Math.max(overlap, heightLoss);
    }
    var cap = Math.min(460, Math.round(ih * 0.62));
    var inset = Math.max(0, Math.min(overlap, cap));
    document.documentElement.style.setProperty("--pwa-auth-vv-inset", inset + "px");
  }
  function detachVv() {
    if (vvHandler && window.visualViewport && window.visualViewport.removeEventListener) {
      try {
        window.visualViewport.removeEventListener("resize", vvHandler);
        window.visualViewport.removeEventListener("scroll", vvHandler);
      } catch (eDet) {}
    }
    vvHandler = null;
  }
  function clearPwaAuthKb() {
    document.documentElement.classList.remove("pwa-auth-vv-lift");
    document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
    detachVv();
  }
  function attachVv() {
    if (vvHandler) return;
    vvHandler = function () {
      syncPwaAuthVvInset();
    };
    if (window.visualViewport && window.visualViewport.addEventListener) {
      window.visualViewport.addEventListener("resize", vvHandler);
      window.visualViewport.addEventListener("scroll", vvHandler);
    }
  }
  function onFocusIn(ev) {
    if (!isPwaDisplayStandalone()) return;
    var screen = document.getElementById("pwaAuthScreen");
    if (!screen || screen.classList.contains("pwa-auth-screen--hidden")) return;
    var t = ev.target;
    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
    if (!screen.contains(t)) return;
    document.documentElement.classList.add("pwa-auth-vv-lift");
    syncPwaAuthVvInset();
    attachVv();
    requestAnimationFrame(function () {
      syncPwaAuthVvInset();
      requestAnimationFrame(function () {
        syncPwaAuthVvInset();
      });
    });
    setTimeout(syncPwaAuthVvInset, 80);
    setTimeout(syncPwaAuthVvInset, 260);
  }
  function onFocusOut() {
    var screen = document.getElementById("pwaAuthScreen");
    function maybeClear() {
      var a = document.activeElement;
      if (screen && a && screen.contains(a) && (a.tagName === "INPUT" || a.tagName === "TEXTAREA")) return;
      clearPwaAuthKb();
    }
    setTimeout(maybeClear, 0);
    setTimeout(maybeClear, 100);
    setTimeout(maybeClear, 320);
    setTimeout(maybeClear, 550);
    setTimeout(maybeClear, 900);
  }
  if (window.visualViewport && window.visualViewport.addEventListener && !window.__pokerPwaAuthVvInsetFlushAttached) {
    window.__pokerPwaAuthVvInsetFlushAttached = true;
    var authInsetFlushT = null;
    window.visualViewport.addEventListener("resize", function () {
      clearTimeout(authInsetFlushT);
      authInsetFlushT = setTimeout(function () {
        if (document.documentElement.classList.contains("pwa-auth-vv-lift")) return;
        var ih = window.innerHeight || 0;
        var vvh = Number(window.visualViewport.height) || 0;
        if (!ih || vvh < ih - 36) return;
        document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      }, 120);
    });
  }
  document.addEventListener("focusin", onFocusIn, true);
  document.addEventListener("focusout", onFocusOut, true);
})();
