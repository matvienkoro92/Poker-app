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
  setHallOfFameSubtabActive(section);

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

window.showHallOfFamePanel = showHallOfFamePanel;
window.openHallOfFameSectionModal = showHallOfFamePanel;

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
  if (p === "blog_top15" || p === "hall_top15" || p === "hall_fame_top2026") return "top2026";
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
    if (typeof showHallOfFamePanel === "function") showHallOfFamePanel(section || "legends");
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
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(function () {
        hallFameCopyDone(true);
      })
      .catch(function () {
        hallFameCopyDone(false);
      });
  } else {
    try {
      var ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      hallFameCopyDone(true);
    } catch (e) {
      hallFameCopyDone(false);
    }
  }
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

(function initHallOfFamePanelShareButtons() {
  var root = document.getElementById("hallOfFameView");
  if (!root) return;
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
})();

window.navigateToHallFameSection = navigateToHallFameSection;
window.getHallFameSectionShareUrl = getHallFameSectionShareUrl;
