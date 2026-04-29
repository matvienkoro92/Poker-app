/** Лайтбокс скринов топ‑15: слушатели ×/«Назад» должны быть до первого открытия из зала славы (раньше они вешались только из initWinterRating при заходе в рейтинг зимы/весны). */
function tryInitWinterRatingLightboxEarly() {
  try {
    if (typeof initWinterRatingLightbox === "function") initWinterRatingLightbox();
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("initWinterRatingLightbox early", e);
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    runGazetteAndTasksInit();
    updateSpringRatingPromoDateFromVar();
    tryInitWinterRatingLightboxEarly();
  });
} else {
  runGazetteAndTasksInit();
  updateSpringRatingPromoDateFromVar();
  tryInitWinterRatingLightboxEarly();
}

setTimeout(function () {
  if (typeof fetchRaffleBadge === "function") fetchRaffleBadge();
}, 300);

// Восстановление скролла при «Назад» (чтобы body не оставался overflow: hidden после модалок)
window.addEventListener("popstate", function () {
  try {
    if (typeof pokerClearBodyDocumentScrollLockInline === "function") pokerClearBodyDocumentScrollLockInline();
  } catch (ePop) {}
});


// Розыгрыши: список, создание (админ), участие, жеребьёвка

// Счётчик уникальных и повторных посетителей (стабильный ID: Telegram → localStorage → sessionStorage)
function getVisitorId() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.initData) {
    const params = new URLSearchParams(tg.initData);
    const userStr = params.get("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) return "tg_" + user.id;
      } catch (e) {}
    }
  }
  /* Часть клиентов TG отдаёт user в initDataUnsafe раньше или без подписанной строки initData */
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id != null) {
    return "tg_" + tg.initDataUnsafe.user.id;
  }
  try {
    var _auth = window.__pokerTelegramAuth;
    if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
      if (_auth.user.memberId != null && String(_auth.user.memberId).trim() !== "") return String(_auth.user.memberId).trim();
      return "tg_" + _auth.user.id;
    }
  } catch (eAuth) {}
  try {
    let id = localStorage.getItem("poker_visitor_id");
    if (id) return id;
    id = sessionStorage.getItem("poker_visitor_id");
    if (id) {
      try { localStorage.setItem("poker_visitor_id", id); } catch (e) {}
      return id;
    }
    id = "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
    try { localStorage.setItem("poker_visitor_id", id); } catch (e) {}
    sessionStorage.setItem("poker_visitor_id", id);
    return id;
  } catch (e) {
    return "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
  }
}

// Эквилятор: расчёт эквити (Монте-Карло + оценка руки)


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
  var idle = window.requestIdleCallback || function (cb) { setTimeout(cb, 150); };
  idle(function () {
    if (window.chatListenersAttached) return;
    if (typeof initChat === "function") initChat();
  });
})();
