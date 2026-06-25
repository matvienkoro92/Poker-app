function setHallOfFameSubtabActive(section) {
  var view = document.getElementById("hallOfFameView") || document.querySelector('[data-view="hall-of-fame"]');
  if (!view) return;
  var tabs = view.querySelectorAll(".hall-of-fame__subtab[data-hall-section]");
  tabs.forEach(function (btn) {
    var on = btn.getAttribute("data-hall-section") === section;
    btn.classList.toggle("hall-of-fame__subtab--active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
}

var HALL_TOP2026_QUOTES = [
  "Да какие проценты, это покер, ты хоть все проценты пересчитай тебе это не поможет, понимаю когда фул на каре, стрит флэш на флэш рояль вот это жëтское, а это так флэш закрыл сет, несчастный детский уровень (C) Владимир",
  "Ты пасть закрой башка лошадиная,чепушило ты (с) Морпех",
  "А почему ты а не Я?, ебать дахуище мозга, как дало так и дало, все одинаковые, мне вообще раз в год прет и че теперь, говорить что всё вокруг гавно а вот мне не повезло, иди умойся в себя приди, сколько соплей это пиздэсь,!!! (с) John",
  "Игру-то понимать надо (с) Кулер",
  "Ебаный дракон всю масть сбил (с) Зевс",
  "Перед тем как поставить 3333р и проиграть раздачу - Сколько бы поставить, чтобы было красиво? (с) Кулер"
];

function initHallTop2026Quotes() {
  var openBtn = document.getElementById("hallTop2026QuotesOpen");
  var wrap = document.getElementById("hallTop2026QuoteModal");
  var textEl = document.getElementById("hallTop2026QuoteText");
  var countEl = document.getElementById("hallTop2026QuoteCount");
  var prevBtn = document.getElementById("hallTop2026QuotePrev");
  var nextBtn = document.getElementById("hallTop2026QuoteNext");
  var closeBtn = document.getElementById("hallTop2026QuoteClose");
  if (!wrap || !openBtn || !textEl || !prevBtn || !nextBtn || !closeBtn) return;
  if (wrap.getAttribute("data-quote-bound") === "1") return;
  wrap.setAttribute("data-quote-bound", "1");
  var quoteIndex = 0;
  function renderQuote() {
    textEl.textContent = HALL_TOP2026_QUOTES[quoteIndex] || "";
    if (countEl) countEl.textContent = (quoteIndex + 1) + "/" + HALL_TOP2026_QUOTES.length;
  }
  function moveQuote(dir) {
    quoteIndex = (quoteIndex + dir + HALL_TOP2026_QUOTES.length) % HALL_TOP2026_QUOTES.length;
    renderQuote();
  }
  function setQuoteModalOpen(open) {
    if (open) {
      wrap.hidden = false;
      wrap.setAttribute("aria-hidden", "false");
      renderQuote();
      setTimeout(function () {
        try { closeBtn.focus({ preventScroll: true }); } catch (eFocus) {}
      }, 0);
      return;
    }
    wrap.hidden = true;
    wrap.setAttribute("aria-hidden", "true");
    try { openBtn.focus({ preventScroll: true }); } catch (eOpenFocus) {}
  }
  openBtn.addEventListener("click", function () { setQuoteModalOpen(true); });
  closeBtn.addEventListener("click", function () { setQuoteModalOpen(false); });
  wrap.addEventListener("click", function (e) {
    if (e && e.target === wrap) setQuoteModalOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (!wrap.hidden && e && e.key === "Escape") setQuoteModalOpen(false);
  });
  prevBtn.addEventListener("click", function () { moveQuote(-1); });
  nextBtn.addEventListener("click", function () { moveQuote(1); });
  renderQuote();
}

function getHallTop2026PlaqueNick(nick, place) {
  var text = String(nick || "").trim();
  if (place === 1 && /^sarmat1305$/i.test(text)) return "Сармат";
  return text;
}

function normalizeHallTop2026PlaqueAmount(text) {
  var value = String(text || "").replace(/\s*₽/g, "р").replace(/\s+/g, " ").trim();
  return value.replace(/\s+р$/i, "р");
}

function readHallTop2026Rows(list) {
  return Array.prototype.map.call(list.querySelectorAll(".winter-rating__single-top-item"), function (item) {
    var nickEl = item.querySelector(".winter-rating__single-top-nick");
    var amountEl = item.querySelector(".winter-rating__single-top-amount");
    return {
      nick: String(nickEl && nickEl.textContent || "").trim(),
      amount: normalizeHallTop2026PlaqueAmount(amountEl && amountEl.textContent)
    };
  }).filter(function (row) {
    return !!row.nick;
  });
}

function fitHallTop2026TextLine(el, minSize) {
  if (!el) return;
  el.style.fontSize = "";
  el.style.transform = "";
  if (!el.clientWidth) return;
  var size = parseFloat(window.getComputedStyle ? window.getComputedStyle(el).fontSize : "") || 10;
  while (el.scrollWidth > el.clientWidth && size > minSize) {
    size -= 0.25;
    el.style.fontSize = size.toFixed(2) + "px";
  }
  if (el.scrollWidth > el.clientWidth) {
    var scale = Math.max(0.78, Math.min(1, el.clientWidth / Math.max(1, el.scrollWidth)));
    el.style.transform = "scaleX(" + scale.toFixed(3) + ")";
  }
}

function fitHallTop2026PlaqueText(plaque) {
  var nameEl = plaque && plaque.querySelector("span:first-child");
  var amountEl = plaque && plaque.querySelector("small");
  fitHallTop2026TextLine(nameEl, 8.2);
  fitHallTop2026TextLine(amountEl, 7.2);
}

function fitHallTop2026Plaques() {
  Array.prototype.forEach.call(document.querySelectorAll("[data-hall-top2026-place]"), fitHallTop2026PlaqueText);
}

function updateHallTop2026Plaques() {
  var list = document.getElementById("hallFameSingleTopList");
  if (!list) return false;
  var rows = readHallTop2026Rows(list);
  if (!rows.length) return false;
  Array.prototype.forEach.call(document.querySelectorAll("[data-hall-top2026-place]"), function (plaque) {
    var place = Number(plaque.getAttribute("data-hall-top2026-place"));
    var fixedName = String(plaque.getAttribute("data-hall-top2026-fixed-name") || "").trim();
    if (!place || (!fixedName && !rows[place - 1])) return;
    var row = rows[place - 1] || {};
    var nameEl = plaque.querySelector("span:first-child");
    var amountEl = plaque.querySelector("small");
    var fixedAmount = String(plaque.getAttribute("data-hall-top2026-fixed-amount") || "").trim();
    var plaqueNick = fixedName || getHallTop2026PlaqueNick(row.nick, place);
    if (nameEl) nameEl.textContent = plaqueNick;
    if (amountEl) amountEl.textContent = fixedAmount || row.amount || "";
  });
  var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
  raf(fitHallTop2026Plaques);
  return true;
}

function initHallTop2026PlaqueSync() {
  var list = document.getElementById("hallFameSingleTopList");
  if (!list) return;
  updateHallTop2026Plaques();
  if (list.getAttribute("data-hall-top2026-plaque-bound") === "1") return;
  list.setAttribute("data-hall-top2026-plaque-bound", "1");
  if (typeof MutationObserver === "function") {
    list.__hallTop2026PlaqueObserver = new MutationObserver(updateHallTop2026Plaques);
    list.__hallTop2026PlaqueObserver.observe(list, { childList: true, subtree: true });
  }
  [80, 240, 700, 1400].forEach(function (delay) {
    setTimeout(updateHallTop2026Plaques, delay);
  });
}

/**
 * Переключение разделов зала славы в одном экране (как лиги в рейтинге), без модалок.
 * @param {string} section
 * @param {{ activeSubtabBtn?: HTMLElement }} [opts] — кнопка вкладки для focus({ preventScroll }) после смены панели
 */
function showHallOfFamePanel(section, opts) {
  opts = opts || {};
  var view = document.getElementById("hallOfFameView");
  if (!view) return;
  var yBefore = getMainDocumentScrollY();
  var activePanel = view.querySelector(".hall-of-fame__panel.hall-of-fame__panel--active[data-hall-panel]");
  var prevSection = activePanel ? activePanel.getAttribute("data-hall-panel") : null;
  if (prevSection && prevSection !== section) {
    hallFamePanelScrollMemory[prevSection] = yBefore;
  }
  var restoreY = Object.prototype.hasOwnProperty.call(hallFamePanelScrollMemory, section)
    ? hallFamePanelScrollMemory[section]
    : yBefore;

  view.querySelectorAll(".hall-of-fame__panel[data-hall-panel]").forEach(function (panel) {
    var on = panel.getAttribute("data-hall-panel") === section;
    panel.classList.toggle("hall-of-fame__panel--active", on);
    if (on) panel.removeAttribute("hidden");
    else panel.setAttribute("hidden", "");
  });
  view.classList.toggle("hall-of-fame--top2026", section === "top2026");
  setHallOfFameSubtabActive(section);
  if (section === "top2026") {
    try {
      if (typeof window.pokerInitWinterRatingWeekTops === "function") window.pokerInitWinterRatingWeekTops();
      if (typeof window.updateWinterRatingWeekTopPreviews === "function") window.updateWinterRatingWeekTopPreviews();
    } catch (eTop2026Init) {}
    scheduleHallTop2026ViewerLoginUpdate();
    initHallTop2026Quotes();
    initHallTop2026PlaqueSync();
  }

  function applyHallFameScroll() {
    setMainDocumentScrollY(clampMainDocumentScrollY(restoreY));
  }
  applyHallFameScroll();
  var rafH = window.requestAnimationFrame || function (fn) {
    setTimeout(fn, 16);
  };
  rafH(function () {
    applyHallFameScroll();
    rafH(function () {
      applyHallFameScroll();
      rafH(applyHallFameScroll);
    });
  });
  [0, 48, 120, 220].forEach(function (ms) {
    setTimeout(applyHallFameScroll, ms);
  });

  var subBtn = opts.activeSubtabBtn;
  if (subBtn && typeof subBtn.focus === "function") {
    setTimeout(function () {
      try {
        subBtn.focus({ preventScroll: true });
      } catch (eFocus) {
        try {
          subBtn.focus();
        } catch (eFocus2) {}
      }
      applyHallFameScroll();
    }, 0);
    setTimeout(applyHallFameScroll, 32);
  }
}

window.pokerUpdateHallTop2026Plaques = updateHallTop2026Plaques;

window.showHallOfFamePanel = showHallOfFamePanel;
window.openHallOfFameSectionModal = showHallOfFamePanel;

function getHallTop2026ViewerLoginText() {
  var user = null;
  try {
    user = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
  } catch (eResolvedViewer) {}
  try {
    if (!user && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      user = window.Telegram.WebApp.initDataUnsafe.user || null;
    }
  } catch (eUnsafeViewer) {}
  try {
    if (!user && window.__pokerTelegramAuth && window.__pokerTelegramAuth.user) {
      user = window.__pokerTelegramAuth.user;
    }
  } catch (eAuthViewer) {}
  var username = user && user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  return username ? "@" + username : "";
}

function fitHallTop2026ViewerLogin(el) {
  if (!el || !el.textContent) return;
  el.style.fontSize = "";
  var size = parseFloat(window.getComputedStyle ? window.getComputedStyle(el).fontSize : "") || 6;
  var minSize = 3.2;
  while (el.scrollWidth > el.clientWidth && size > minSize) {
    size -= 0.25;
    el.style.fontSize = size.toFixed(2) + "px";
  }
}

function updateHallTop2026ViewerLogin() {
  var text = getHallTop2026ViewerLoginText();
  var els = document.querySelectorAll(".hall-of-fame__top2026-trophy-login");
  if (!els.length) return;
  els.forEach(function (el) {
    if (!text) {
      el.textContent = "";
      el.setAttribute("hidden", "");
      return;
    }
    el.textContent = text;
    el.removeAttribute("hidden");
    el.setAttribute("title", text);
    var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
    raf(function () { fitHallTop2026ViewerLogin(el); });
  });
}

function scheduleHallTop2026ViewerLoginUpdate() {
  [0, 180, 700].forEach(function (delay) {
    setTimeout(updateHallTop2026ViewerLogin, delay);
  });
}

window.pokerUpdateHallTop2026ViewerLogin = updateHallTop2026ViewerLogin;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleHallTop2026ViewerLoginUpdate);
} else {
  scheduleHallTop2026ViewerLoginUpdate();
}
window.addEventListener("poker-telegram-auth", scheduleHallTop2026ViewerLoginUpdate);
window.addEventListener("resize", function () {
  setTimeout(updateHallTop2026ViewerLogin, 80);
  setTimeout(fitHallTop2026Plaques, 80);
});

/** Уникальный startapp для каждой вкладки зала славы (плюс legacy для топ‑15). */
var HALL_FAME_SECTION_STARTAPP = {
  legends: "hall_fame_legends",
  cups: "hall_fame_cups",
  top2026: "hall_fame_top2026",
  photos: "hall_fame_photos",
  shame: "hall_fame_shame"
};

var HALL_FAME_SHARE_INTRO = {
  legends: "Зал славы — Легенды клуба «Два туза»",
  cups: "Зал славы — Кубки",
  top2026: "Зал славы — Топ выигрышей за один турнир (2026)",
  photos: "Зал славы — Фотоальбом",
  shame: "Зал славы — Доска позора"
};

function getHallFameSectionStartParam(section) {
  return HALL_FAME_SECTION_STARTAPP[section] || null;
}

/** Прямая ссылка в мини‑апп на вкладку зала славы */
function getHallFameSectionShareUrl(section) {
  var p = getHallFameSectionStartParam(section);
  if (!p || typeof buildMiniAppStartLink !== "function") return "";
  return buildMiniAppStartLink(p);
}

function resolveHallFameSectionFromStartParam(startParam) {
  if (!startParam) return null;
  var p = String(startParam).trim();
  /* Литералы: эта функция вызывается из раннего runGazetteAndTasksInit до присвоения HALL_FAME_SECTION_STARTAPP */
  if (p === "hall_fame" || p === "blog_top15" || p === "hall_top15" || p === "hall_fame_top2026") return "top2026";
  if (p === "hall_fame_legends") return "legends";
  if (p === "hall_fame_cups") return "cups";
  if (p === "hall_fame_photos") return "photos";
  if (p === "hall_fame_shame") return "shame";
  return null;
}

/**
 * Открыть зал славы на нужной вкладке (deep link + кнопки «Поделиться»).
 */
function navigateToHallFameSection(section) {
  if (typeof setView === "function") setView("hall-of-fame");
  setTimeout(function () {
    if (section === "top2026") {
      try {
        if (typeof window.updateWinterRatingWeekTopPreviews === "function") {
          window.updateWinterRatingWeekTopPreviews();
        }
      } catch (ePrev) {}
    }
    if (typeof showHallOfFamePanel === "function") showHallOfFamePanel(section || "top2026");
  }, 480);
}

/**
 * Зал славы → блок «Топ выигрышей за один турнир» (топ‑15).
 * Legacy: …?startapp=blog_top15 | hall_top15; новая ссылка: hall_fame_top2026
 */
function navigateToHallFameBlogTop15() {
  navigateToHallFameSection("top2026");
}

/** Обратная совместимость: теперь отдаём каноническую ссылку hall_fame_top2026 */
function getHallFameBlogTop15ShareUrl() {
  return getHallFameSectionShareUrl("top2026");
}

function hallFameCopyDone(ok) {
  var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tgLocal && tgLocal.showAlert) {
    tgLocal.showAlert(ok ? "Ссылка скопирована" : "Не удалось скопировать");
  } else if (ok) {
    alert("Ссылка скопирована");
  } else {
    alert("Не удалось скопировать");
  }
}

function hallFameCopyUrlToClipboard(url) {
  if (!url) {
    hallFameCopyDone(false);
    return;
  }
  pokerCopyTextToClipboard(url).then(function (copied) {
    hallFameCopyDone(copied);
  });
}

function hallFameOpenTelegramShareForSection(section) {
  var url = getHallFameSectionShareUrl(section);
  if (!url) {
    var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg0 && tg0.showAlert) {
      tg0.showAlert("Задайте в index.html атрибут data-telegram-app-url у #app.");
    } else {
      alert("Не задан URL мини‑приложения (data-telegram-app-url).");
    }
    return;
  }
  var intro = HALL_FAME_SHARE_INTRO[section] || "Зал славы «Два туза»";
  var text = intro + "\n\n" + url;
  var shareUrl =
    typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(url, intro) : "";
  if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
  pokerTryPwaWebShare({ title: intro, text: text, url: url }).then(function (pwaOk) {
    if (pwaOk) return;
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
    else if (tg && tg.openLink) tg.openLink(shareUrl);
    else window.open(shareUrl, "_blank", "noopener,noreferrer");
  });
}

function initHallOfFamePanelShareButtons() {
  var root = document.getElementById("hallOfFameView");
  if (!root || root.dataset.hallShareBound === "1") return;
  root.dataset.hallShareBound = "1";
  root.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("[data-hall-fame-share][data-hall-fame-action]") : null;
    if (!btn) return;
    var section = btn.getAttribute("data-hall-fame-share");
    var action = btn.getAttribute("data-hall-fame-action");
    if (!section || (action !== "copy" && action !== "share")) return;
    e.preventDefault();
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    if (action === "share") {
      hallFameOpenTelegramShareForSection(section);
    } else {
      var url = getHallFameSectionShareUrl(section);
      if (!url) {
        var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg0 && tg0.showAlert) {
          tg0.showAlert("Задайте в index.html атрибут data-telegram-app-url у #app.");
        } else {
          alert("Не задан URL мини‑приложения (data-telegram-app-url).");
        }
        return;
      }
      hallFameCopyUrlToClipboard(url);
    }
  });
}
window.pokerInitHallOfFamePanelShareButtons = initHallOfFamePanelShareButtons;
initHallOfFamePanelShareButtons();

var hallFishRatingRowsCache = null;
var hallFishRatingRowsPromise = null;
var hallFishAchievementRowsCache = null;
var hallFishAchievementRowsPromise = null;
var hallFishBirthdayRowsCache = null;
var hallFishBirthdayRowsPromise = null;
var hallFishCurrentIdsCache = null;
var hallFishCurrentIdsPromise = null;
var hallFishProfileLoadingObserver = null;
var hallFishActiveTab = "levels";
var hallFishActiveAchievementTab = "big50";
var hallFishPrefetchedProfiles = Object.create(null);
var HALL_FISH_LINK_HINT = "Чтобы попасть в рейтинг уровней, привяжите профиль из Покер21 в графе «Профиль».";
var HALL_FISH_ROWS_SESSION_CACHE_KEY = "poker_hall_fish_level_rows_v2";
var HALL_FISH_ROWS_SESSION_CACHE_MS = 60000;
var HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY = "poker_hall_fish_birthdays_v1";

function hallFishEsc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hallFishGetApiBase() {
  try {
    return typeof getApiBase === "function" ? getApiBase() : "";
  } catch (eBase) {
    return "";
  }
}

function hallFishReadRowsSessionCache() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    var raw = sessionStorage.getItem(HALL_FISH_ROWS_SESSION_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (!entry || !Array.isArray(entry.rows)) return null;
    if (Date.now() - Number(entry.ts || 0) > HALL_FISH_ROWS_SESSION_CACHE_MS) return null;
    return entry.rows;
  } catch (eHallFishRowsCacheRead) {
    return null;
  }
}

function hallFishWriteRowsSessionCache(rows) {
  try {
    if (typeof sessionStorage === "undefined" || !Array.isArray(rows)) return;
    sessionStorage.setItem(HALL_FISH_ROWS_SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), rows: rows }));
  } catch (eHallFishRowsCacheWrite) {}
}

function hallFishReadBirthdaysSessionCache() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    var raw = sessionStorage.getItem(HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (!entry || !Array.isArray(entry.rows)) return null;
    if (Date.now() - Number(entry.ts || 0) > HALL_FISH_ROWS_SESSION_CACHE_MS) return null;
    return entry.rows;
  } catch (eHallFishBirthdaysCacheRead) {
    return null;
  }
}

function hallFishWriteBirthdaysSessionCache(rows) {
  try {
    if (typeof sessionStorage === "undefined" || !Array.isArray(rows)) return;
    sessionStorage.setItem(HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), rows: rows }));
  } catch (eHallFishBirthdaysCacheWrite) {}
}

function hallFishRefreshVisibleRows(rows) {
  try {
    var modal = document.getElementById("hallFishRatingModal");
    if (!modal || modal.hidden) return;
    if (hallFishActiveTab === "birthdays") {
      hallFishSetBirthdaysState("", rows);
      return;
    }
    if (hallFishActiveTab === "achievements") {
      hallFishAchievementRowsCache = null;
      return;
    }
    hallFishLoadCurrentIds()
      .then(function (ids) {
        hallFishSetModalState("", rows, ids);
      })
      .catch(function () {});
  } catch (eHallFishVisibleRefresh) {}
}

function hallFishFetchRows() {
  if (hallFishRatingRowsPromise) return hallFishRatingRowsPromise;
  var base = hallFishGetApiBase();
  if (!base) return Promise.reject(new Error("no-api-base"));
  var q = "?publicLevels=1";
  hallFishRatingRowsPromise = fetch(base + "/api/player-crm" + q, { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok) throw new Error((data && data.error) || "bad-response");
      hallFishRatingRowsCache = hallFishRowsFromCrmData(data);
      hallFishAchievementRowsCache = null;
      hallFishBirthdayRowsCache = null;
      hallFishWriteRowsSessionCache(hallFishRatingRowsCache);
      return hallFishRatingRowsCache;
    })
    .finally(function () {
      hallFishRatingRowsPromise = null;
    });
  return hallFishRatingRowsPromise;
}

function hallFishEnsureModal() {
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "hall-fish-modal";
  modal.id = "hallFishRatingModal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="hall-fish-modal__backdrop" data-hall-fish-close></div>' +
    '<section class="hall-fish-modal__panel" role="dialog" aria-modal="true" aria-label="Рейтинги игроков">' +
      '<button type="button" class="hall-fish-modal__close" data-hall-fish-close aria-label="Закрыть">×</button>' +
      '<div class="hall-fish-modal__tabs" role="tablist" aria-label="Рейтинги игроков">' +
        '<button type="button" class="hall-fish-modal__tab hall-fish-modal__tab--active" data-hall-fish-tab="levels" role="tab" aria-selected="true">Игроки по уровню</button>' +
        '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="achievements" role="tab" aria-selected="false">Топы по ачивкам</button>' +
        '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="birthdays" role="tab" aria-selected="false">Дни рождения</button>' +
      '</div>' +
      '<div class="hall-fish-modal__body" id="hallFishRatingBody"></div>' +
    '</section>';
  document.body.appendChild(modal);
  return modal;
}

function hallFishRegistrationMap(rows) {
  var map = {};
  (Array.isArray(rows) ? rows : []).forEach(function (row) {
    var id = String((row && (row.accountId || row.dtId)) || "").trim();
    if (id) map[id] = row;
  });
  return map;
}

function hallFishTelegramLabel(row) {
  if (!row) return "";
  if (row.telegramUsername) return String(row.telegramUsername).replace(/^@?/, "@");
  if (Array.isArray(row.telegramIds) && row.telegramIds.length) return row.telegramIds[0];
  return "";
}

function hallFishRowsFromCrmData(data) {
  if (Array.isArray(data && data.levelRows)) {
    return data.levelRows
      .map(function (row) {
        var poker21Nick = String((row && (row.pokerPlusNickname || row.poker21Nickname || row.nickname)) || "").trim();
        return {
          accountId: String((row && row.accountId) || "").trim(),
          name: String(poker21Nick || (row && row.name) || "").trim(),
          pokerPlusNickname: poker21Nick,
          telegram: String((row && row.telegram) || "").trim(),
          profileBirthDate: String((row && row.profileBirthDate) || "").trim(),
          level: Number(row && row.level) || 0,
          fee: Number(row && row.fee) || 0,
        };
      })
      .filter(function (row) { return row.level > 0; })
      .sort(function (a, b) {
        return b.level - a.level || b.fee - a.fee || String(a.name).localeCompare(String(b.name), "ru");
      });
  }
  var registrations = hallFishRegistrationMap(data && data.registeredAccounts);
  return (Array.isArray(data && data.pokerPlusAccounts) ? data.pokerPlusAccounts : [])
    .map(function (row) {
      var accountId = String((row && row.accountId) || "").trim();
      var reg = registrations[accountId] || null;
      var level = Number(row && row.level) || 0;
      var poker21Nick = String((row && (row.pokerPlusNickname || row.poker21Nickname || row.nickname)) || "").trim();
      return {
        accountId: accountId,
        name: String(poker21Nick || (reg && reg.name) || accountId || "").trim(),
        pokerPlusNickname: poker21Nick,
        telegram: hallFishTelegramLabel(reg),
        profileBirthDate: String((row && row.profileBirthDate) || "").trim(),
        level: level,
        fee: Number(row && row.fee) || 0,
      };
    })
    .filter(function (row) { return row.level > 0; })
    .sort(function (a, b) {
      return b.level - a.level || b.fee - a.fee || String(a.name).localeCompare(String(b.name), "ru");
    });
}

function hallFishIdVariants(id) {
  var raw = String(id || "").trim();
  var out = [];
  function add(value) {
    var s = String(value || "").trim();
    if (!s) return;
    if (out.indexOf(s) === -1) out.push(s);
    var up = s.toUpperCase();
    if (out.indexOf(up) === -1) out.push(up);
  }
  add(raw);
  var noPrefix = raw.replace(/^(tg_|mail_)/i, "").replace(/^ID/i, "");
  add(noPrefix);
  if (/^\d+$/.test(noPrefix)) add("ID" + noPrefix);
  return out;
}

function hallFishReadLocalCurrentIds() {
  var ids = [];
  function add(value) {
    var s = String(value || "").trim();
    if (s && ids.indexOf(s) === -1) ids.push(s);
  }
  try { add(window.__pokerPlusUserId); } catch (eWinP21) {}
  try {
    var profileId = document.getElementById("profileUserId");
    add(profileId && profileId.textContent);
  } catch (eProfileId) {}
  try { add(sessionStorage.getItem("poker_dt_id")); } catch (eSessId) {}
  try { add(localStorage.getItem("poker_dt_id")); } catch (eLocalId) {}
  return ids;
}

function hallFishCurrentPoker21Linked() {
  try {
    if (window.__pokerHallFishPoker21Linked === true) return true;
    if (window.__pokerHeaderPoker21Linked === true) return true;
    if (String(window.__pokerPlusUserId || "").trim()) return true;
  } catch (eLinked) {}
  return false;
}

function hallFishSetSubtitle(subtitle) {
  if (!subtitle) return;
  var linked = hallFishCurrentPoker21Linked();
  subtitle.hidden = !!linked;
  subtitle.textContent = linked ? "" : HALL_FISH_LINK_HINT;
}

function hallFishLoadCurrentIds() {
  if (hallFishCurrentIdsCache) return Promise.resolve(hallFishCurrentIdsCache.slice());
  if (hallFishCurrentIdsPromise) return hallFishCurrentIdsPromise;
  var localIds = hallFishReadLocalCurrentIds();
  var base = hallFishGetApiBase();
  var hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  if (!base || !hasCred || typeof pokerApiAuthQuery !== "function") {
    hallFishCurrentIdsCache = localIds;
    return Promise.resolve(localIds.slice());
  }
  var q = pokerApiAuthQuery("?");
  try {
    var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
    if (cached) q += "&dtIdHint=" + encodeURIComponent(cached);
  } catch (eHint) {}
  hallFishCurrentIdsPromise = fetch(base + "/api/users" + q, { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var ids = localIds.slice();
      function add(value) {
        var s = String(value || "").trim();
        if (s && ids.indexOf(s) === -1) ids.push(s);
      }
      if (data && data.ok) {
        try {
          window.__pokerHallFishPoker21Linked = !!(data.pokerPlusVerified || data.p21Id || data.pokerPlusUserId);
        } catch (eLinkedFlag) {}
        add(data.p21Id);
        add(data.pokerPlusUserId);
        add(data.dtId);
        add(data.accountId);
      }
      hallFishCurrentIdsCache = ids;
      return ids.slice();
    })
    .catch(function () {
      hallFishCurrentIdsCache = localIds;
      return localIds.slice();
    })
    .finally(function () {
      hallFishCurrentIdsPromise = null;
    });
  return hallFishCurrentIdsPromise;
}

function hallFishFindMyRank(rows, currentIds) {
  var variants = {};
  (Array.isArray(currentIds) ? currentIds : []).forEach(function (id) {
    hallFishIdVariants(id).forEach(function (v) { variants[v] = true; });
  });
  if (!Object.keys(variants).length) return 0;
  for (var i = 0; i < rows.length; i += 1) {
    var rowVariants = hallFishIdVariants(rows[i] && rows[i].accountId);
    for (var j = 0; j < rowVariants.length; j += 1) {
      if (variants[rowVariants[j]]) return i + 1;
    }
  }
  return 0;
}

function hallFishFindMyLevelRow(rows, currentIds) {
  rows = Array.isArray(rows) ? rows : [];
  var variants = {};
  (Array.isArray(currentIds) ? currentIds : []).forEach(function (id) {
    hallFishIdVariants(id).forEach(function (v) { variants[v] = true; });
  });
  if (!Object.keys(variants).length) return null;
  for (var i = 0; i < rows.length; i += 1) {
    var rowVariants = hallFishIdVariants(rows[i] && rows[i].accountId);
    for (var j = 0; j < rowVariants.length; j += 1) {
      if (variants[rowVariants[j]]) return { row: rows[i], rank: i + 1 };
    }
  }
  return null;
}

function hallFishMyRankText(rows, currentIds) {
  rows = Array.isArray(rows) ? rows : [];
  var total = rows.length;
  if (!total) return "Ваш рейтинг —/—";
  var rank = hallFishFindMyRank(rows, currentIds);
  return "Ваш рейтинг " + (rank ? String(rank) : "—") + "/" + String(total);
}

function hallFishLevelRowHtml(row, rank, extraClass) {
  var userId = String(row && row.accountId || "").trim();
  var name = row && (row.name || row.telegram) || "Игрок";
  var sub = row && row.telegram ? String(row.telegram) : ((userId ? userId + " / " : "") + "без TG");
  return '<button type="button" class="hall-fish-level-row' + (extraClass ? " " + hallFishEsc(extraClass) : "") + '" data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level="' + hallFishEsc(row && row.level) + '" aria-label="Открыть профиль ' + hallFishEsc(name) + '">' +
    '<span class="hall-fish-level-row__rank">' + hallFishEsc(rank) + '</span>' +
    '<span><span class="hall-fish-level-row__name">' + hallFishEsc(row && row.name || "—") + '</span>' +
    '<span class="hall-fish-level-row__tg">' + hallFishEsc(sub) + '</span></span>' +
    '<span class="hall-fish-level-row__level">' + hallFishEsc(row && row.level) + ' ур.</span>' +
  '</button>';
}

function hallFishRenderRows(rows, currentIds) {
  if (!rows.length) return '<div class="hall-fish-modal__notice">Пока нет игроков с уровнем.</div>';
  var mine = hallFishFindMyLevelRow(rows, currentIds);
  return '<div class="hall-fish-level-list">' + rows.map(function (row, idx) {
    var isMine = mine && mine.rank === idx + 1;
    return hallFishLevelRowHtml(row, idx + 1, isMine ? "hall-fish-level-row--mine" : "");
  }).join("") + '</div>' +
    (mine ? '<div class="hall-fish-level-sticky-mine" aria-label="Ваша строка рейтинга">' +
      hallFishLevelRowHtml(mine.row, mine.rank, "hall-fish-level-row--mine hall-fish-level-row--sticky") +
    '</div>' : '');
}

function hallFishRenderLevelSkeleton() {
  var rows = [];
  for (var i = 1; i <= 6; i += 1) {
    rows.push(
      '<div class="hall-fish-level-row hall-fish-level-row--skeleton" aria-hidden="true">' +
        '<span class="hall-fish-level-row__rank">' + i + '</span>' +
        '<span><span class="hall-fish-skeleton-line hall-fish-skeleton-line--name"></span>' +
        '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--sub"></span></span>' +
        '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--value"></span>' +
      '</div>'
    );
  }
  return '<div class="hall-fish-level-list hall-fish-level-list--skeleton" role="status" aria-live="polite" aria-label="Загрузка рейтинга">' + rows.join("") + '</div>';
}

function hallFishRenderAchievementSkeleton() {
  return '<div class="hall-fish-achievement-shell hall-fish-achievement-shell--skeleton" role="status" aria-live="polite" aria-label="Загрузка топов по ачивкам">' +
    '<div class="hall-fish-achievement-subtabs hall-fish-achievement-subtabs--skeleton">' +
      '<span class="hall-fish-skeleton-pill"></span><span class="hall-fish-skeleton-pill"></span><span class="hall-fish-skeleton-pill"></span>' +
    '</div>' +
    hallFishRenderLevelSkeleton() +
  '</div>';
}

function hallFishRenderBirthdaysSkeleton() {
  var cells = [];
  for (var i = 0; i < 35; i += 1) cells.push('<span class="hall-fish-birthday-calendar__cell hall-fish-birthday-calendar__cell--skeleton"></span>');
  return '<div class="hall-fish-birthdays hall-fish-birthdays--skeleton" role="status" aria-live="polite" aria-label="Загрузка дней рождения">' +
    '<div class="hall-fish-birthday-calendar">' +
      '<div class="hall-fish-skeleton-line hall-fish-skeleton-line--calendar-title"></div>' +
      '<div class="hall-fish-birthday-calendar__grid">' + cells.join("") + '</div>' +
    '</div>' +
  '</div>';
}

function hallFishNormalizeNick(nick) {
  if (typeof normalizeWinterNick === "function") return normalizeWinterNick(nick);
  return String(nick || "").trim().replace(/^@+/, "").replace(/\s+/g, " ").toLowerCase();
}

function hallFishFormatNumber(value) {
  var n = Number(value) || 0;
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function hallFishFormatRub(value) {
  if (typeof formatRewardRound === "function") return formatRewardRound(value) + " ₽";
  return hallFishFormatNumber(value) + " ₽";
}

function hallFishLevelRowsByNick(rows) {
  var map = {};
  (Array.isArray(rows) ? rows : []).forEach(function (row) {
    var names = [row && row.name, row && row.pokerPlusNickname, row && row.telegram];
    names.forEach(function (name) {
      var key = hallFishNormalizeNick(String(name || "").replace(/^@+/, ""));
      if (key && !map[key]) map[key] = row;
    });
  });
  return map;
}

function hallFishPlayerMetaByNick(nick, map) {
  var key = hallFishNormalizeNick(nick);
  var row = key && map ? map[key] : null;
  if (!row) return { nick: nick || "Игрок", accountId: "", telegram: "" };
  return {
    nick: row.name || row.pokerPlusNickname || nick || "Игрок",
    accountId: String(row.accountId || "").trim(),
    telegram: String(row.telegram || "").trim(),
  };
}

function hallFishRowsWithRank(rows) {
  return (Array.isArray(rows) ? rows : [])
    .filter(function (row) { return row && (Number(row.value) || 0) > 0; })
    .sort(function (a, b) {
      return (Number(b.value) || 0) - (Number(a.value) || 0) ||
        (Number(b.tie) || 0) - (Number(a.tie) || 0) ||
        String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
    })
    .slice(0, 10)
    .map(function (row, index) {
      return Object.assign({ rank: index + 1 }, row);
    });
}

function hallFishAggregateTournamentAchievements(levelRows) {
  var allRows = typeof pokerRatingAchievementAllTournamentRows === "function" ? pokerRatingAchievementAllTournamentRows() : [];
  var byNick = {};
  var byMonth = {};
  var metaByNick = hallFishLevelRowsByNick(levelRows);
  function entry(nick) {
    var key = hallFishNormalizeNick(nick);
    if (!key) return null;
    if (!byNick[key]) {
      var meta = hallFishPlayerMetaByNick(nick, metaByNick);
      byNick[key] = {
        key: key,
        nick: meta.nick || nick || "Игрок",
        accountId: meta.accountId,
        telegram: meta.telegram,
        big50: 0,
        big50Best: 0,
        big100: 0,
        big100Best: 0,
        firstPlaces: 0,
        monthChampion: 0,
        monthChampionBest: 0,
      };
    }
    return byNick[key];
  }
  (Array.isArray(allRows) ? allRows : []).forEach(function (row) {
    var nick = row && row.nick;
    var item = entry(nick);
    if (!item) return;
    var reward = Number(row && row.reward) || 0;
    if (reward >= 100000) {
      item.big100 += 1;
      if (reward > item.big100Best) item.big100Best = reward;
    } else if (reward >= 50000) {
      item.big50 += 1;
      if (reward > item.big50Best) item.big50Best = reward;
    }
    if (Number(row && row.place) === 1) item.firstPlaces += 1;
    var parts = String((row && row.date) || "").split(".");
    if (parts.length === 3) {
      var monthKey = parts[1] + "." + parts[2];
      if (!byMonth[monthKey]) byMonth[monthKey] = {};
      if (!byMonth[monthKey][item.key]) byMonth[monthKey][item.key] = { key: item.key, reward: 0 };
      byMonth[monthKey][item.key].reward += reward;
    }
  });
  Object.keys(byMonth).forEach(function (monthKey) {
    var monthRows = Object.keys(byMonth[monthKey]).map(function (key) { return byMonth[monthKey][key]; })
      .filter(function (row) { return (Number(row.reward) || 0) > 0; })
      .sort(function (a, b) {
        return (Number(b.reward) || 0) - (Number(a.reward) || 0) ||
          String(a.key || "").localeCompare(String(b.key || ""), "ru");
      });
    if (!monthRows.length) return;
    monthRows.slice(0, 3).forEach(function (row) {
      var item = byNick[row.key];
      if (!item) return;
      item.monthChampion += 1;
      if ((Number(row.reward) || 0) > item.monthChampionBest) item.monthChampionBest = Number(row.reward) || 0;
    });
  });
  var list = Object.keys(byNick).map(function (key) { return byNick[key]; });
  return {
    big50: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.big50, tie: row.big50Best, valueText: row.big50 + " зан.", extraText: row.big50Best ? "лучший " + hallFishFormatRub(row.big50Best) : "" });
    })),
    big100: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.big100, tie: row.big100Best, valueText: row.big100 + " зан.", extraText: row.big100Best ? "лучший " + hallFishFormatRub(row.big100Best) : "" });
    })),
    king: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.firstPlaces, tie: row.big100Best || row.big50Best, valueText: row.firstPlaces + " побед", extraText: "1 место в турнирах" });
    })),
    monthChampion: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.monthChampion, tie: row.monthChampionBest, valueText: row.monthChampion + " раз", extraText: "топ месяца по заносам" });
    })),
  };
}

function hallFishAggregateClubChoiceRows(rows, levelRows) {
  var map = {};
  var metaByNick = hallFishLevelRowsByNick(levelRows);
  (Array.isArray(rows) ? rows : []).forEach(function (month) {
    (Array.isArray(month && month.winners) ? month.winners : []).forEach(function (winner) {
      var nick = String((winner && winner.nick) || "").trim();
      var key = hallFishNormalizeNick(nick);
      if (!key) return;
      if (!map[key]) {
        var meta = hallFishPlayerMetaByNick(nick, metaByNick);
        map[key] = { nick: meta.nick || nick, accountId: String((winner && winner.accountId) || meta.accountId || "").trim(), telegram: meta.telegram, value: 0, tie: 0 };
      }
      map[key].value += 1;
      map[key].tie += Number(winner && winner.votes) || 0;
    });
  });
  return hallFishRowsWithRank(Object.keys(map).map(function (key) {
    var row = map[key];
    return Object.assign({}, row, { valueText: row.value + " раз", extraText: row.tie ? row.tie + " голосов" : "Народный герой" });
  }));
}

function hallFishReferralsRows(data) {
  return hallFishRowsWithRank((Array.isArray(data && data.ranking) ? data.ranking : []).map(function (row) {
    var nick = String((row && (row.name || row.telegramLogin || row.accountId)) || "Игрок").trim();
    var login = String((row && row.telegramLogin) || "").trim();
    return {
      nick: nick,
      accountId: String((row && row.accountId) || "").trim(),
      telegram: login ? "@" + login.replace(/^@+/, "") : "",
      value: Number(row && row.invitedCount) || 0,
      tie: Number(row && row.totalPoker21Level) || 0,
      valueText: (Number(row && row.invitedCount) || 0) + " чел.",
      extraText: row && row.poker21LinkedInvited ? "Покер21: " + row.poker21LinkedInvited : "",
    };
  }));
}

function hallFishAchievementSpecs(data) {
  return [
    { key: "big50", title: "Заносы 50-100к", sectionTitle: "Заносы от 50 до 100к", description: "Считаются турнирные заносы от 50 000 ₽ до 99 999 ₽. В топе выше игроки с большим количеством таких заносов.", rows: data && data.big50 },
    { key: "big100", title: "Заносы 100к+", sectionTitle: "Заносы от 100к", description: "Считаются турнирные заносы от 100 000 ₽ и выше. При равенстве выше игрок с более крупным лучшим заносом.", rows: data && data.big100 },
    { key: "king", title: "Король МТТ", sectionTitle: "Король турниров", description: "Даётся за первые места в турнирах клуба. Чем больше побед, тем выше позиция в топе.", rows: data && data.king },
    { key: "monthChampion", title: "Чемп месяца", sectionTitle: "Чемпион месяца", description: "Начисляется игрокам, которые вошли в топ-3 месяца по сумме заносов. В зачёт идёт каждый месяц отдельно.", rows: data && data.monthChampion },
    { key: "clubChoice", title: "Народный герой", sectionTitle: "Народный герой", description: "Даётся победителям голосования клуба за достижение месяца. В топе учитывается количество побед и голоса.", rows: data && data.clubChoice },
  ];
}

function hallFishAchievementSectionHtml(title, rows, description) {
  var list = Array.isArray(rows) ? rows : [];
  return '<section class="hall-fish-achievement-section">' +
    '<h4 class="hall-fish-achievement-section__title">' + hallFishEsc(title) + '</h4>' +
    (description ? '<p class="hall-fish-achievement-section__description">' + hallFishEsc(description) + '</p>' : '') +
    (list.length ? '<div class="hall-fish-level-list hall-fish-achievement-list">' + list.map(function (row) {
      var userId = String(row.accountId || "").trim();
      var name = row.nick || "Игрок";
      var sub = row.telegram || row.extraText || "";
      var attrs = userId
        ? ' data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level=""'
        : ' disabled aria-disabled="true"';
      return '<button type="button" class="hall-fish-level-row hall-fish-achievement-row"' + attrs + ' aria-label="' + hallFishEsc(name) + '">' +
        '<span class="hall-fish-level-row__rank">' + hallFishEsc(row.rank) + '</span>' +
        '<span><span class="hall-fish-level-row__name">' + hallFishEsc(name) + '</span>' +
        '<span class="hall-fish-level-row__tg">' + hallFishEsc(sub) + '</span></span>' +
        '<span class="hall-fish-level-row__level">' + hallFishEsc(row.valueText || row.value) + '</span>' +
      '</button>';
    }).join("") + '</div>' : '<div class="hall-fish-modal__notice hall-fish-modal__notice--compact">Пока нет данных.</div>') +
  '</section>';
}

function hallFishRenderAchievementRows(data) {
  var specs = hallFishAchievementSpecs(data);
  var active = specs.some(function (spec) { return spec.key === hallFishActiveAchievementTab; })
    ? hallFishActiveAchievementTab
    : "big50";
  hallFishActiveAchievementTab = active;
  var activeSpec = specs.filter(function (spec) { return spec.key === active; })[0] || specs[0];
  return '<div class="hall-fish-achievements">' +
    '<div class="hall-fish-achievement-tabs-shell" aria-label="Фильтры топов по ачивкам">' +
      '<div class="hall-fish-achievement-tabs-shell__head">' +
        '<span class="hall-fish-achievement-tabs-shell__eyebrow">Топы по ачивкам</span>' +
        '<span class="hall-fish-achievement-tabs-shell__hint">выберите достижение</span>' +
      '</div>' +
    '<div class="hall-fish-achievement-tabs" role="tablist" aria-label="Топы по ачивкам">' +
      specs.map(function (spec) {
        var isActive = spec.key === active;
        return '<button type="button" class="hall-fish-achievement-tab' + (isActive ? " hall-fish-achievement-tab--active" : "") + '" data-hall-fish-achievement-tab="' + hallFishEsc(spec.key) + '" role="tab" aria-selected="' + (isActive ? "true" : "false") + '">' + hallFishEsc(spec.title) + '</button>';
      }).join("") +
    '</div>' +
    '</div>' +
    hallFishAchievementSectionHtml(activeSpec.sectionTitle || activeSpec.title, activeSpec.rows, activeSpec.description) +
  '</div>';
}

function hallFishBirthDateParts(value) {
  var m = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  var month = parseInt(m[2], 10);
  var day = parseInt(m[3], 10);
  if (!month || month < 1 || month > 12 || !day || day < 1 || day > 31) return null;
  return { month: month, day: day };
}

function hallFishBirthdayRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map(function (row) {
      var parts = hallFishBirthDateParts(row && (row.profileBirthDate || row.birthDate || row.birthday));
      if (!parts) return null;
      return {
        accountId: String((row && row.accountId) || "").trim(),
        nick: String((row && (row.name || row.pokerPlusNickname || row.telegram)) || "Игрок").trim(),
        telegram: String((row && row.telegram) || "").trim(),
        month: parts.month,
        day: parts.day,
      };
    })
    .filter(Boolean);
}

function hallFishBirthdayDateForYear(row, year) {
  var date = new Date(year, Number(row && row.month) - 1, Number(row && row.day));
  if (date.getMonth() !== Number(row && row.month) - 1) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function hallFishFormatBirthdayDate(row, year) {
  var date = hallFishBirthdayDateForYear(row, year || (new Date()).getFullYear());
  if (!date) return "";
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function hallFishUpcomingBirthdays(rows) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return hallFishBirthdayRows(rows).map(function (row) {
    var next = hallFishBirthdayDateForYear(row, today.getFullYear());
    if (!next) return null;
    if (next < today) next = hallFishBirthdayDateForYear(row, today.getFullYear() + 1);
    if (!next) return null;
    return Object.assign({}, row, {
      nextDate: next,
      daysLeft: Math.round((next - today) / 86400000),
    });
  }).filter(Boolean).sort(function (a, b) {
    return a.daysLeft - b.daysLeft || String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
  });
}

function hallFishRenderBirthdays(rows) {
  var birthdays = hallFishBirthdayRows(rows);
  if (!birthdays.length) return '<div class="hall-fish-modal__notice">Пока нет игроков с указанной датой рождения.</div>';
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var monthRowsByDay = {};
  birthdays.forEach(function (row) {
    if (Number(row.month) !== month + 1) return;
    if (!monthRowsByDay[row.day]) monthRowsByDay[row.day] = [];
    monthRowsByDay[row.day].push(row);
  });
  Object.keys(monthRowsByDay).forEach(function (day) {
    monthRowsByDay[day].sort(function (a, b) { return String(a.nick || "").localeCompare(String(b.nick || ""), "ru"); });
  });
  var first = new Date(year, month, 1);
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var offset = (first.getDay() + 6) % 7;
  var cells = [];
  for (var empty = 0; empty < offset; empty += 1) cells.push('<span class="hall-fish-birthday-calendar__cell hall-fish-birthday-calendar__cell--empty"></span>');
  for (var day = 1; day <= daysInMonth; day += 1) {
    var marked = monthRowsByDay[day] || [];
    var isToday = day === now.getDate();
    cells.push(
      '<span class="hall-fish-birthday-calendar__cell' + (marked.length ? " hall-fish-birthday-calendar__cell--marked" : "") + (isToday ? " hall-fish-birthday-calendar__cell--today" : "") + '">' +
        '<span class="hall-fish-birthday-calendar__day">' + hallFishEsc(day) + '</span>' +
        (marked.length ? '<span class="hall-fish-birthday-calendar__names">' + marked.slice(0, 3).map(function (row) { return hallFishEsc(row.nick); }).join("<br>") + (marked.length > 3 ? "<br>+" + hallFishEsc(marked.length - 3) : "") + '</span>' : "") +
      '</span>'
    );
  }
  var upcoming = hallFishUpcomingBirthdays(rows).slice(0, 2);
  var upcomingHtml = upcoming.length
    ? upcoming.map(function (row) {
        var label = row.daysLeft === 0 ? "сегодня" : (row.daysLeft === 1 ? "завтра" : "через " + row.daysLeft + " дн.");
        var userId = String(row.accountId || "").trim();
        var name = row.nick || "Игрок";
        var attrs = userId
          ? ' data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level=""'
          : ' disabled aria-disabled="true"';
        return '<button type="button" class="hall-fish-birthday-next__row"' + attrs + ' aria-label="' + hallFishEsc("Открыть профиль " + name) + '">' +
          '<strong>' + hallFishEsc(row.nick) + '</strong>' +
          '<span>' + hallFishEsc(hallFishFormatBirthdayDate(row, row.nextDate.getFullYear())) + ' · ' + hallFishEsc(label) + '</span>' +
        '</button>';
      }).join("")
    : '<div class="hall-fish-modal__notice hall-fish-modal__notice--compact">Ближайших дней рождения нет.</div>';
  return '<div class="hall-fish-birthdays">' +
    '<div class="hall-fish-birthday-calendar">' +
      '<div class="hall-fish-birthday-calendar__title">' + hallFishEsc(now.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })) + '</div>' +
      '<div class="hall-fish-birthday-calendar__weekdays"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>' +
      '<div class="hall-fish-birthday-calendar__grid">' + cells.join("") + '</div>' +
    '</div>' +
    '<section class="hall-fish-birthday-next">' +
      '<h4 class="hall-fish-achievement-section__title">Ближайшие дни рождения</h4>' +
      upcomingHtml +
    '</section>' +
  '</div>';
}

function hallFishClearProfileLoadingRows() {
  if (hallFishProfileLoadingObserver) {
    try {
      hallFishProfileLoadingObserver.disconnect();
    } catch (eHallFishDisconnect) {}
    hallFishProfileLoadingObserver = null;
  }
  document.querySelectorAll(".hall-fish-level-row--loading,.hall-fish-birthday-next__row--loading").forEach(function (row) {
    row.classList.remove("hall-fish-level-row--loading");
    row.classList.remove("hall-fish-birthday-next__row--loading");
    row.removeAttribute("aria-busy");
    row.disabled = false;
    var level = row.querySelector(".hall-fish-level-row__level");
    if (level && level.dataset.originalText) {
      level.textContent = level.dataset.originalText;
      delete level.dataset.originalText;
    }
  });
}

function hallFishSetProfileRowLoading(row) {
  if (!row) return;
  hallFishClearProfileLoadingRows();
  var level = row.querySelector(".hall-fish-level-row__level");
  if (level && !level.dataset.originalText) level.dataset.originalText = level.textContent || "";
  if (level) level.textContent = "Загрузка...";
  row.classList.add("hall-fish-level-row--loading");
  if (row.classList && row.classList.contains("hall-fish-birthday-next__row")) row.classList.add("hall-fish-birthday-next__row--loading");
  row.setAttribute("aria-busy", "true");
  row.disabled = true;
}

function hallFishLevelFromRow(row) {
  if (!row) return "";
  var attr = String(row.getAttribute("data-user-level") || "").trim();
  if (attr) return attr;
  var level = row.querySelector(".hall-fish-level-row__level");
  var text = String((level && (level.dataset.originalText || level.textContent)) || "").trim();
  var match = text.match(/\d+/);
  return match && match[0] ? match[0] : "";
}

function hallFishClearLoadingWhenProfileOpens() {
  var modal = document.getElementById("chatUserModal");
  function isOpen() {
    return !!(modal && modal.classList.contains("chat-user-modal--open"));
  }
  if (isOpen()) {
    hallFishClearProfileLoadingRows();
    return;
  }
  if (modal && typeof MutationObserver !== "undefined") {
    hallFishProfileLoadingObserver = new MutationObserver(function () {
      if (isOpen()) hallFishClearProfileLoadingRows();
    });
    hallFishProfileLoadingObserver.observe(modal, { attributes: true, attributeFilter: ["class", "aria-hidden"] });
  }
}

function hallFishStatusFishLevel(level) {
  if (typeof pokerProfileStatusFishLevel === "function") return pokerProfileStatusFishLevel(level);
  var n = parseInt(level, 10);
  if (!isFinite(n) || n < 1) n = 1;
  return Math.min(100, n);
}

function hallFishStatusFishSrc(level) {
  if (typeof pokerProfileStatusFishSrc === "function") return pokerProfileStatusFishSrc(level);
  var fishLevel = hallFishStatusFishLevel(level);
  return "./assets/profile-status-fish-level-" + (fishLevel < 10 ? "0" : "") + fishLevel + ".png";
}

function hallFishEnsureProfileModal() {
  if (typeof window.openChatUserModalById === "function") return true;
  if (typeof initChatUserModals !== "function") return false;
  initChatUserModals({
    base: hallFishGetApiBase(),
    tg: window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null,
  });
  return typeof window.openChatUserModalById === "function";
}

function hallFishPrefetchProfile(userId) {
  var id = String(userId || "").trim();
  if (!id || hallFishPrefetchedProfiles[id]) return;
  var base = hallFishGetApiBase();
  if (!base || typeof fetch !== "function") return;
  if (typeof pokerApiAuthQuery !== "function") return;
  hallFishPrefetchedProfiles[id] = true;
  fetch(base + "/api/users?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&"), { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      try {
        if (data && data.ok && typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("poker_chat_user_profile_v2:" + encodeURIComponent(id), JSON.stringify({ ts: Date.now(), data: data }));
        }
      } catch (eProfilePrefetchCache) {}
    })
    .catch(function () {});
}

function hallFishPrefetchTopProfiles(rows) {
  if (!Array.isArray(rows) || !rows.length) return;
  rows.slice(0, 4).forEach(function (row, index) {
    setTimeout(function () {
      hallFishPrefetchProfile(row && row.accountId);
    }, 350 + index * 180);
  });
}

function hallFishSetModalState(message, rows, currentIds) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("levels");
  if (myRank) {
    myRank.hidden = false;
    myRank.textContent = rows ? hallFishMyRankText(rows, currentIds) : "Ваш рейтинг —/—";
  }
  if (body) body.innerHTML = rows ? hallFishRenderRows(rows, currentIds) : hallFishRenderLevelSkeleton();
  if (rows) hallFishPrefetchTopProfiles(rows);
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishSetAchievementState(message, data) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("achievements");
  if (myRank) myRank.hidden = true;
  if (body) body.innerHTML = data ? hallFishRenderAchievementRows(data) : hallFishRenderAchievementSkeleton();
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishSetBirthdaysState(message, rows) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("birthdays");
  if (myRank) myRank.hidden = true;
  if (body) body.innerHTML = rows ? hallFishRenderBirthdays(rows) : hallFishRenderBirthdaysSkeleton();
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishUpdateTabs(activeTab) {
  hallFishActiveTab = activeTab === "achievements" || activeTab === "birthdays" ? activeTab : "levels";
  var modal = hallFishEnsureModal();
  var panel = modal ? modal.querySelector(".hall-fish-modal__panel") : null;
  if (panel) {
    panel.classList.toggle("hall-fish-modal__panel--achievements", hallFishActiveTab === "achievements");
    panel.classList.toggle("hall-fish-modal__panel--birthdays", hallFishActiveTab === "birthdays");
    panel.classList.toggle("hall-fish-modal__panel--levels", hallFishActiveTab === "levels");
  }
  document.querySelectorAll("[data-hall-fish-tab]").forEach(function (tab) {
    var isActive = tab.getAttribute("data-hall-fish-tab") === hallFishActiveTab;
    tab.classList.toggle("hall-fish-modal__tab--active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function hallFishCloseModal() {
  hallFishClearProfileLoadingRows();
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) modal.hidden = true;
  if (document.body) document.body.classList.remove("player-crm-dialog-modal-open");
}

function hallFishLoadRows() {
  if (hallFishRatingRowsCache) return Promise.resolve(hallFishRatingRowsCache);
  var cachedRows = hallFishReadRowsSessionCache();
  if (cachedRows) {
    hallFishRatingRowsCache = cachedRows;
    hallFishFetchRows()
      .then(function (freshRows) {
        hallFishRefreshVisibleRows(freshRows);
      })
      .catch(function () {});
    return Promise.resolve(cachedRows);
  }
  return hallFishFetchRows();
}

function hallFishLoadBirthdayRows() {
  if (hallFishBirthdayRowsCache) return Promise.resolve(hallFishBirthdayRowsCache);
  if (hallFishBirthdayRowsPromise) return hallFishBirthdayRowsPromise;
  var cachedRows = hallFishReadBirthdaysSessionCache();
  if (cachedRows) {
    hallFishBirthdayRowsCache = cachedRows;
    return Promise.resolve(cachedRows);
  }
  var base = hallFishGetApiBase();
  if (!base) return hallFishLoadRows();
  hallFishBirthdayRowsPromise = fetch(base + "/api/player-crm?publicBirthdays=1", { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.birthdayRows)) throw new Error((data && data.error) || "bad-response");
      hallFishBirthdayRowsCache = data.birthdayRows;
      hallFishWriteBirthdaysSessionCache(hallFishBirthdayRowsCache);
      return hallFishBirthdayRowsCache;
    })
    .catch(function () {
      return hallFishLoadRows();
    })
    .finally(function () {
      hallFishBirthdayRowsPromise = null;
    });
  return hallFishBirthdayRowsPromise;
}

function hallFishLoadClubChoiceAchievementRows() {
  var base = hallFishGetApiBase();
  if (!base) return Promise.resolve([]);
  return fetch(base + "/api/club-choice-vote?mode=achievements", { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      return data && data.ok && Array.isArray(data.rows) ? data.rows : [];
    })
    .catch(function () {
      return Array.isArray(window.POKER_CLUB_CHOICE_ACHIEVEMENTS) ? window.POKER_CLUB_CHOICE_ACHIEVEMENTS : [];
    });
}

function hallFishLoadReferralRows() {
  var base = hallFishGetApiBase();
  var hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  if (!base || !hasCred || typeof pokerApiAuthQuery !== "function") return Promise.resolve([]);
  return fetch(base + "/api/referrals" + pokerApiAuthQuery("?") + "&_t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      return data && data.ok ? hallFishReferralsRows(data) : [];
    })
    .catch(function () { return []; });
}

function hallFishLoadAchievementRows() {
  if (hallFishAchievementRowsCache) return Promise.resolve(hallFishAchievementRowsCache);
  if (hallFishAchievementRowsPromise) return hallFishAchievementRowsPromise;
  hallFishAchievementRowsPromise = hallFishLoadRows()
    .then(function (levelRows) {
      var tournamentData = hallFishAggregateTournamentAchievements(levelRows);
      return Promise.all([hallFishLoadClubChoiceAchievementRows(), hallFishLoadReferralRows()])
        .then(function (parts) {
          hallFishAchievementRowsCache = Object.assign({}, tournamentData, {
            clubChoice: hallFishAggregateClubChoiceRows(parts[0], levelRows),
            referrals: parts[1],
          });
          return hallFishAchievementRowsCache;
        });
    })
    .finally(function () {
      hallFishAchievementRowsPromise = null;
    });
  return hallFishAchievementRowsPromise;
}

function openHallFishAchievementTab() {
  hallFishSetAchievementState("Загрузка…");
  hallFishLoadAchievementRows()
    .then(function (data) {
      hallFishSetAchievementState("", data);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("achievements");
      if (myRank) myRank.hidden = true;
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить топы по ачивкам. Попробуйте ещё раз позже.</div>';
    });
}

function openHallFishBirthdaysTab() {
  hallFishSetBirthdaysState("Загрузка…");
  hallFishLoadBirthdayRows()
    .then(function (rows) {
      hallFishSetBirthdaysState("", rows);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("birthdays");
      if (myRank) myRank.hidden = true;
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить дни рождения. Попробуйте ещё раз позже.</div>';
    });
}

function openHallFishRatingModal() {
  hallFishSetModalState("Загрузка…");
  Promise.all([hallFishLoadRows(), hallFishLoadCurrentIds()])
    .then(function (result) {
      hallFishSetModalState("", result[0], result[1]);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("levels");
      if (myRank) {
        myRank.hidden = false;
        myRank.textContent = "Ваш рейтинг —/—";
      }
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить уровни. Попробуйте ещё раз позже.</div>';
    });
}
window.openHallFishRatingModal = openHallFishRatingModal;

function initHallFishRatingModal() {
  if (window.__pokerHallFishRatingBound) return;
  window.__pokerHallFishRatingBound = true;
  document.addEventListener("click", function (e) {
    var openBtn = e.target && e.target.closest ? e.target.closest("#headerPokerStatus,.header-greeting--status,[data-hall-fish-open]") : null;
    if (openBtn) {
      e.preventDefault();
      openHallFishRatingModal();
      return;
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest("[data-hall-fish-close]")) hallFishCloseModal();
  });
  document.addEventListener("click", function (e) {
    var tab = e.target && e.target.closest ? e.target.closest("[data-hall-fish-tab]") : null;
    if (!tab) return;
    e.preventDefault();
    var tabKey = tab.getAttribute("data-hall-fish-tab");
    if (tabKey === "achievements") openHallFishAchievementTab();
    else if (tabKey === "birthdays") openHallFishBirthdaysTab();
    else openHallFishRatingModal();
  });
  document.addEventListener("pointerenter", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    hallFishPrefetchProfile(row.getAttribute("data-user-id"));
  }, true);
  document.addEventListener("touchstart", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    hallFishPrefetchProfile(row.getAttribute("data-user-id"));
  }, { passive: true });
  document.addEventListener("click", function (e) {
    var tab = e.target && e.target.closest ? e.target.closest("[data-hall-fish-achievement-tab]") : null;
    if (!tab) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishActiveAchievementTab = String(tab.getAttribute("data-hall-fish-achievement-tab") || "big50").trim() || "big50";
    if (hallFishAchievementRowsCache) hallFishSetAchievementState("", hallFishAchievementRowsCache);
    else openHallFishAchievementTab();
  });
  document.addEventListener("click", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    var userId = String(row.getAttribute("data-user-id") || "").trim();
    if (!userId || !hallFishEnsureProfileModal()) return;
    var rowLevel = hallFishLevelFromRow(row);
    e.preventDefault();
    e.stopPropagation();
    hallFishSetProfileRowLoading(row);
    window.openChatUserModalById(userId, row.getAttribute("data-user-name") || "Игрок", null, {
      level: rowLevel,
      ratingNick: row.getAttribute("data-user-name") || "",
    });
    hallFishClearLoadingWhenProfileOpens();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hallFishCloseModal();
  });
}

window.pokerInitHallFishRatingModal = initHallFishRatingModal;
initHallFishRatingModal();

window.pokerPrefetchHallFishRatingData = function () {
  hallFishLoadRows().catch(function () {});
  hallFishLoadBirthdayRows().catch(function () {});
  hallFishLoadCurrentIds().catch(function () {});
};

function syncInitialHallFameSectionFromStartParam() {
  var startParam = "";
  try {
    var qs = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
    startParam =
      typeof pokerStartAppQueryFromUrlSearchParams === "function"
        ? pokerStartAppQueryFromUrlSearchParams(qs)
        : qs.get("startapp") || "";
    if (typeof pokerNormalizeWebAppStartParam === "function") startParam = pokerNormalizeWebAppStartParam(startParam);
  } catch (eHallStartParam) {}
  var section = resolveHallFameSectionFromStartParam(startParam) || window.__pendingHallFameSection || "";
  if (!section) return;
  var view = document.getElementById("hallOfFameView");
  if (!view || !view.classList.contains("view--active")) return;
  var activePanel = view.querySelector(".hall-of-fame__panel--active[data-hall-panel]");
  if (activePanel && activePanel.getAttribute("data-hall-panel") === section) return;
  showHallOfFamePanel(section);
}

setTimeout(syncInitialHallFameSectionFromStartParam, 0);
setTimeout(syncInitialHallFameSectionFromStartParam, 640);

window.navigateToHallFameSection = navigateToHallFameSection;
window.getHallFameSectionShareUrl = getHallFameSectionShareUrl;
