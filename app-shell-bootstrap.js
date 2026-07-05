// Final shell startup: home widgets, early modal hooks, visitor counters, and eager chat listeners.
function tryInitWinterRatingLightboxEarly() {
  try {
    if (typeof initWinterRatingLightbox === "function") initWinterRatingLightbox();
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("initWinterRatingLightbox early", e);
  }
}

function pokerRunShellReadyBootstrap() {
  runGazetteAndTasksInit();
  if (typeof updateSpringRatingPromoDateFromVar === "function") updateSpringRatingPromoDateFromVar();
  tryInitWinterRatingLightboxEarly();
  if (typeof window.pokerPrewarmLikelyViewAssets === "function") window.pokerPrewarmLikelyViewAssets();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerRunShellReadyBootstrap);
} else {
  pokerRunShellReadyBootstrap();
}

function pokerRefreshRaffleBadgeSoon() {
  if (typeof fetchRaffleBadge === "function") fetchRaffleBadge();
}

pokerRefreshRaffleBadgeSoon();
setTimeout(pokerRefreshRaffleBadgeSoon, 300);

(function pokerTrackVisitorOnceWithTelegramIdFix() {
  var v0 = typeof getVisitorId === "function" ? getVisitorId() : "";
  updateVisitorCounter();
  if (typeof isTelegramWebApp !== "function" || !isTelegramWebApp()) return;
  if (v0 && String(v0).indexOf("tg_") === 0) return;
  var start = Date.now();
  var upgraded = false;
  function tick() {
    if (upgraded) return;
    var v1 = typeof getVisitorId === "function" ? getVisitorId() : "";
    if (v1 && v1 !== v0 && String(v1).indexOf("tg_") === 0) {
      upgraded = true;
      updateVisitorCounter();
      return;
    }
    if (Date.now() - start < 3200) setTimeout(tick, 220);
  }
  setTimeout(tick, 200);
})();

if (typeof initChat === "function") initChat();
if (typeof initPokerShowsPlayer === "function") initPokerShowsPlayer();

(function preinitChat() {
  var idle = window.requestIdleCallback || function (cb) {
    setTimeout(cb, 150);
  };
  idle(function () {
    if (window.chatListenersAttached) return;
    if (typeof initChat === "function") initChat();
  });
})();
