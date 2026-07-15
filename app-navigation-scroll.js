// Navigation scroll helpers: body locks, panel scrollports, and per-view scroll restoration.

/** Сброс inline-блокировки фона (модалки «Устав», чат и т.п.) — иначе залипает position:fixed + top */
function pokerClearBodyDocumentScrollLockInline() {
  try {
    var b = document.body;
    if (!b || !b.style) return;
    b.style.overflow = "";
    b.style.position = "";
    b.style.removeProperty("top");
    b.style.removeProperty("left");
    b.style.removeProperty("right");
    b.style.removeProperty("width");
  } catch (eClr) {}
}

/** Страховка: после чата/модалки вернуть скролл документа (не трогаем экран чата). */
function pokerEnsureUnlockedDocumentScrollForNonChat() {
  try {
    var view = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    if (view === "chat") return;
    if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
    if (document.body) {
      pokerClearBodyDocumentScrollLockInline();
    }
    if (document.documentElement && document.documentElement.style && document.documentElement.style.overflow === "hidden") {
      document.documentElement.style.overflow = "";
    }
  } catch (eDocUnlock) {}
}

/* На старте страницы сразу снимаем возможный залипший lock (актуально для локального браузера после reload). */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerEnsureUnlockedDocumentScrollForNonChat);
} else {
  pokerEnsureUnlockedDocumentScrollForNonChat();
}

function pokerIsDownloadViewActive() {
  try {
    return !!(document.body && document.body.getAttribute && document.body.getAttribute("data-view") === "download");
  } catch (eDv) {
    return false;
  }
}

/** Скролл документа перенесён в .card__content на длинных/панельных экранах (локальный Chrome / единый UX). */
function pokerGetPanelScrollCardContentEl() {
  try {
    var v = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    if (v !== "download" && v !== "hall-of-fame" && v !== "home" && v !== "cashout" && v !== "transfers" && v !== "spring-rating" && v !== "summer-rating" && v !== "raffles" && v !== "profile" && v !== "video-lessons" && v !== "equilator" && v !== "admin-bonuses" && v !== "player-crm") return null;
    var card = document.querySelector("main.card");
    return card ? card.querySelector(".card__content") : null;
  } catch (ePan) {
    return null;
  }
}

function pokerGetDownloadCardContentScrollEl() {
  try {
    if (!pokerIsDownloadViewActive()) return null;
    return pokerGetPanelScrollCardContentEl();
  } catch (eDl) {
    return null;
  }
}

/** Сброс прокрутки окна (html/body) — при смене экрана иначе остаётся Y с предыдущей страницы. */
function scrollMainDocumentToTop(opts) {
  try {
    opts = opts || {};
    var force = opts === true || opts.force === true;
    var activeView = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    if (!force && activeView === "home") {
      if (getMainDocumentScrollY() > 2) return;
      if (typeof pokerHasRecentMainScrollUserIntent === "function" && pokerHasRecentMainScrollUserIntent(2500)) return;
    }
    if (
      typeof pokerIsActiveIosPwaChatComposerKeyboard === "function" &&
      pokerIsActiveIosPwaChatComposerKeyboard()
    ) {
      return;
    }
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) dl.scrollTop = 0;
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
    var se = document.scrollingElement || document.documentElement;
    if (se) se.scrollTop = 0;
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  } catch (e) {}
}

function getMainDocumentScrollY() {
  try {
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) return dl.scrollTop || 0;
    var se = document.scrollingElement || document.documentElement;
    return (se && se.scrollTop) || document.documentElement.scrollTop || document.body.scrollTop || 0;
  } catch (eY) {
    return 0;
  }
}

function setMainDocumentScrollY(y) {
  try {
    y = Math.max(0, y);
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) {
      var maxY = Math.max(0, (dl.scrollHeight || 0) - (dl.clientHeight || 0));
      dl.scrollTop = Math.min(y, maxY);
      return;
    }
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, y);
    }
    var se = document.scrollingElement || document.documentElement;
    if (se) se.scrollTop = y;
    if (document.documentElement) document.documentElement.scrollTop = y;
    if (document.body) document.body.scrollTop = y;
  } catch (e2) {}
}

var pokerLastMainScrollUserIntentAt = 0;
var pokerLastMainScrollDirection = "";
var pokerLastMainScrollDirectionAt = 0;
var pokerLastMainTouchY = null;
var pokerLastMainScrollTopObserved = 0;
var pokerRestoringHomeScrollJump = false;
(function pokerBindMainScrollUserIntent() {
  function mark() {
    pokerLastMainScrollUserIntentAt = Date.now();
  }
  function markWheel(e) {
    mark();
    var dy = e && Number(e.deltaY);
    if (dy > 0) {
      pokerLastMainScrollDirection = "down";
      pokerLastMainScrollDirectionAt = Date.now();
    } else if (dy < 0) {
      pokerLastMainScrollDirection = "up";
      pokerLastMainScrollDirectionAt = Date.now();
    }
  }
  function markTouchStart(e) {
    mark();
    var t = e && e.touches && e.touches.length ? e.touches[0] : null;
    pokerLastMainTouchY = t ? Number(t.clientY) : null;
  }
  function markTouchMove(e) {
    mark();
    var t = e && e.touches && e.touches.length ? e.touches[0] : null;
    if (!t || pokerLastMainTouchY == null) return;
    var y = Number(t.clientY);
    var dy = y - pokerLastMainTouchY;
    if (dy < -3) {
      pokerLastMainScrollDirection = "down";
      pokerLastMainScrollDirectionAt = Date.now();
    } else if (dy > 3) {
      pokerLastMainScrollDirection = "up";
      pokerLastMainScrollDirectionAt = Date.now();
    }
    pokerLastMainTouchY = y;
  }
  function guardHomeScrollJump() {
    mark();
    if (pokerRestoringHomeScrollJump) return;
    var y = getMainDocumentScrollY();
    var prev = pokerLastMainScrollTopObserved || 0;
    var view = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    var recentUpwardGesture = pokerLastMainScrollDirection === "up" && Date.now() - pokerLastMainScrollDirectionAt < 900;
    if (
      view === "home" &&
      prev > 300 &&
      y < prev - 24 &&
      !recentUpwardGesture
    ) {
      pokerRestoringHomeScrollJump = true;
      setMainDocumentScrollY(prev);
      requestAnimationFrame(function () {
        setMainDocumentScrollY(prev);
        pokerRestoringHomeScrollJump = false;
        pokerLastMainScrollTopObserved = getMainDocumentScrollY();
      });
      return;
    }
    pokerLastMainScrollTopObserved = y;
  }
  function bindPanelScrollIntent() {
    try {
      var card = document.querySelector("main.card");
      var panel = card ? card.querySelector(".card__content") : null;
      if (!panel || panel.dataset.pokerScrollIntentBound === "1") return;
      panel.dataset.pokerScrollIntentBound = "1";
      pokerLastMainScrollTopObserved = getMainDocumentScrollY();
      panel.addEventListener("scroll", guardHomeScrollJump, { passive: true });
      panel.addEventListener("touchstart", markTouchStart, { passive: true });
      panel.addEventListener("touchmove", markTouchMove, { passive: true });
      panel.addEventListener("wheel", markWheel, { passive: true });
      panel.addEventListener("pointerdown", mark, { passive: true });
    } catch (ePanelScrollIntent) {}
  }
  try {
    window.addEventListener("touchstart", markTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", markTouchMove, { passive: true, capture: true });
    window.addEventListener("touchend", function () {
      pokerLastMainTouchY = null;
    }, { passive: true, capture: true });
    window.addEventListener("wheel", markWheel, { passive: true, capture: true });
    window.addEventListener("pointerdown", mark, { passive: true, capture: true });
    document.addEventListener("scroll", guardHomeScrollJump, { passive: true, capture: true });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindPanelScrollIntent);
    else bindPanelScrollIntent();
  } catch (eBindMainScrollIntent) {}
})();

function pokerGetLastMainScrollUserIntentAt() {
  return pokerLastMainScrollUserIntentAt || 0;
}
window.pokerGetLastMainScrollUserIntentAt = pokerGetLastMainScrollUserIntentAt;

function pokerHasRecentMainScrollUserIntent(ms) {
  return Date.now() - pokerGetLastMainScrollUserIntentAt() < (Number(ms) || 0);
}
window.pokerHasRecentMainScrollUserIntent = pokerHasRecentMainScrollUserIntent;

function pokerScheduleScrollMainDocumentToTop(delay, expectedView) {
  var scheduledAt = Date.now();
  var startY = getMainDocumentScrollY();
  setTimeout(function () {
    if (pokerLastMainScrollUserIntentAt >= scheduledAt) return;
    if (pokerHasRecentMainScrollUserIntent(900)) return;
    if (expectedView && document.body && document.body.getAttribute && document.body.getAttribute("data-view") !== expectedView) return;
    if (Math.abs(getMainDocumentScrollY() - startY) > 2) return;
    scrollMainDocumentToTop();
  }, Math.max(0, Number(delay) || 0));
}
window.pokerScheduleScrollMainDocumentToTop = pokerScheduleScrollMainDocumentToTop;

function clampMainDocumentScrollY(y) {
  try {
    y = Math.max(0, Number(y) || 0);
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) {
      var maxPanel = Math.max(0, (dl.scrollHeight || 0) - (dl.clientHeight || 0));
      return Math.min(y, maxPanel);
    }
    var h = Math.max(
      document.documentElement.scrollHeight || 0,
      document.body.scrollHeight || 0
    );
    var se = document.scrollingElement;
    if (se && se.scrollHeight) h = Math.max(h, se.scrollHeight);
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    var maxY = Math.max(0, h - vh);
    return Math.min(y, maxY);
  } catch (eClamp) {
    return Math.max(0, y);
  }
}

/** Запоминание scrollY по имени экрана; восстановление только при setView(..., { fromBack: true }) */
var viewScrollMemory = Object.create(null);
/** Прокрутка окна отдельно по каждой вкладке зала славы */
var hallFamePanelScrollMemory = Object.create(null);

function scrollHomeToTop(force) {
  if (!document.body || (document.body.getAttribute && document.body.getAttribute("data-view") !== "home")) return;
  if (!force) {
    try {
      if (getMainDocumentScrollY() > 2) return;
    } catch (eHomeScrollY) {}
    try {
      if (typeof pokerHasRecentMainScrollUserIntent === "function" && pokerHasRecentMainScrollUserIntent(2500)) return;
    } catch (eHomeScrollIntent) {}
  }
  scrollMainDocumentToTop({ force: !!force });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    scrollHomeToTop();
  });
} else {
  scrollHomeToTop();
}
window.addEventListener("pageshow", function (e) {
  if (e && e.persisted) scrollHomeToTop(true);
});
