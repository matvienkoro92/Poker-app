// View router: tab navigation, view switching, route clicks, and active-view classes.

// Простая навигация по разделам (вкладки внизу)
const navItems = document.querySelectorAll("[data-view-target]:not(.bonus-game-back)");
const footer = document.querySelector(".card__footer");

function setDownloadPage(pageName) {
  var downloadPages = document.querySelectorAll(".download-page[data-download-page]");
  downloadPages.forEach(function (page) {
    if (page.dataset.downloadPage === pageName) {
      page.classList.add("download-page--active");
    } else {
      page.classList.remove("download-page--active");
    }
  });
  var dlCc = typeof pokerGetDownloadCardContentScrollEl === "function" ? pokerGetDownloadCardContentScrollEl() : null;
  if (dlCc) dlCc.scrollTop = 0;
  try {
    if (typeof window.pokerUpdateDownloadInfoSubsections === "function") window.pokerUpdateDownloadInfoSubsections();
  } catch (eDownloadInfo) {}
  try {
    if (typeof window.pokerInitDownloadRefActions === "function") window.pokerInitDownloadRefActions();
  } catch (eDownloadRef) {}
}

var POKER_DOWNLOAD_REF_SECTIONS = {
  poker21: {
    title: "Poker21",
    startParam: "download_poker21",
    shareText: "Скачай Poker21 и подай заявку в клуб «Два туза».",
  },
  xpoker: {
    title: "Xpoker",
    startParam: "download_xpoker",
    shareText: "Скачай Xpoker и вступай в клуб «Два туза» по ID.",
  },
  pppoker: {
    title: "PPPoker",
    startParam: "download_pppoker",
    shareText: "Скачай PPPoker и вступай в клуб «Два туза» по ID.",
  },
  supremapoker: {
    title: "Supremapoker",
    startParam: "download_supremapoker",
    shareText: "Скачай Supremapoker и вступай в клуб «Два туза» по ID.",
  },
};

function pokerBuildDownloadReferralLink(sectionKey) {
  var item = POKER_DOWNLOAD_REF_SECTIONS[String(sectionKey || "").trim()];
  if (!item) return "";
  if (typeof pokerBuildPersonalInviteLink === "function") return pokerBuildPersonalInviteLink(item.startParam);
  if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(item.startParam);
  return "";
}

function pokerShowDownloadRefFeedback(btn, ok) {
  if (!btn) return;
  var originalLabel = btn.getAttribute("aria-label") || "";
  btn.classList.add("download-ref-action--copied");
  btn.setAttribute("aria-label", ok ? "Ссылка скопирована" : "Не удалось скопировать ссылку");
  clearTimeout(btn.__downloadRefTimer);
  btn.__downloadRefTimer = setTimeout(function () {
    btn.classList.remove("download-ref-action--copied");
    if (originalLabel) btn.setAttribute("aria-label", originalLabel);
  }, 1400);
}

function pokerCopyDownloadReferralLink(sectionKey, btn) {
  var link = pokerBuildDownloadReferralLink(sectionKey);
  if (!link) return;
  var done = function (copied) {
    pokerShowDownloadRefFeedback(btn, copied);
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (copied && tg && tg.showToast) tg.showToast("Скопировано");
    else if (!copied && tg && tg.showAlert) tg.showAlert("Ссылка: " + link);
    else if (!copied) alert("Ссылка: " + link);
    if (typeof recordShareButtonClick === "function") recordShareButtonClick("download_ref_copy");
  };
  if (typeof pokerCopyTextToClipboard === "function") {
    pokerCopyTextToClipboard(link).then(done).catch(function () { done(false); });
    return;
  }
  done(false);
}

function pokerShareDownloadReferralLink(sectionKey) {
  var item = POKER_DOWNLOAD_REF_SECTIONS[String(sectionKey || "").trim()];
  var link = pokerBuildDownloadReferralLink(sectionKey);
  if (!item || !link) return;
  var text = item.shareText || ("Скачай " + item.title + " и вступай в клуб «Два туза».");
  var textWithLink = text + "\n" + link;
  var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function"
    ? pokerBuildTelegramShareUrlDialog(link, text)
    : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(text);
  function fallback() {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
    else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
    else window.open(shareUrl, "_blank", "noopener");
    if (typeof recordShareButtonClick === "function") recordShareButtonClick("download_ref_share");
  }
  if (typeof pokerTryPwaWebShare === "function") {
    pokerTryPwaWebShare({ title: item.title, text: textWithLink, url: link }).then(function (ok) {
      if (ok) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("download_ref_share");
        return;
      }
      fallback();
    }).catch(fallback);
    return;
  }
  fallback();
}

function pokerInitDownloadRefActions() {}

window.pokerInitDownloadRefActions = pokerInitDownloadRefActions;

function pokerGetViewNodes() {
  return document.querySelectorAll(".view[data-view]");
}

/** Inert только у экранов .view — не у body[data-view] и пр., иначе весь документ (в т.ч. .bottom-nav) перестаёт получать клики. */
function pokerSyncInertForViewScreensOnly() {
  try {
    if (typeof HTMLElement === "undefined" || !("inert" in HTMLElement.prototype)) return;
    /* Снять ошибочный inert с body после старых сборок */
    if (document.body) document.body.removeAttribute("inert");
    pokerGetViewNodes().forEach(function (view) {
      if (!view.classList || !view.classList.contains("view")) return;
      if (view.classList.contains("view--active")) view.removeAttribute("inert");
      else view.setAttribute("inert", "");
    });
  } catch (e) {}
}

function pokerGetStablePlayerCrmViewportHeight() {
  var values = [];
  function add(value) {
    var n = Number(value) || 0;
    if (n >= 320 && n < 2200) values.push(n);
  }
  try {
    add(window.visualViewport && window.visualViewport.height);
  } catch (eVvHeight) {}
  try {
    add(window.innerHeight);
  } catch (eInnerHeight) {}
  try {
    add(document.documentElement && document.documentElement.clientHeight);
  } catch (eDocHeight) {}
  try {
    add(window.screen && window.screen.availHeight);
    add(window.screen && window.screen.height);
  } catch (eScreenHeight) {}
  if (!values.length) return 0;
  return Math.round(Math.max.apply(Math, values));
}

window.pokerGetStablePlayerCrmViewportHeight = pokerGetStablePlayerCrmViewportHeight;

function pokerApplyPlayerCrmStandaloneLayout() {
  var root = document.getElementById("playerCrmView");
  if (!root) return;
  pokerPortalPlayerCrmRoot(root);
  var section = root.querySelector(".player-crm");
  var back = root.querySelector('[data-crm-close="player-crm"], .bonus-game-back');
  window.__pokerPlayerCrmStandaloneOpen = true;
  root.classList.add("view--active", "player-crm-standalone");
  root.removeAttribute("inert");
  root.removeAttribute("aria-hidden");
  root.style.setProperty("position", "fixed", "important");
  root.style.setProperty("top", "0", "important");
  root.style.setProperty("right", "0", "important");
  root.style.setProperty("bottom", "0", "important");
  root.style.setProperty("left", "0", "important");
  root.style.setProperty("min-height", "0", "important");
  root.style.setProperty("height", "auto", "important");
  root.style.setProperty("max-height", "none", "important");
  root.style.setProperty("overflow", "hidden", "important");
  root.style.setProperty("display", "flex", "important");
  root.style.setProperty("flex-direction", "column", "important");
  root.style.setProperty("align-items", "stretch", "important");
  root.style.setProperty("gap", "10px", "important");
  root.style.setProperty("visibility", "visible", "important");
  root.style.setProperty("opacity", "1", "important");
  root.style.setProperty("z-index", "2147483600", "important");
  root.style.setProperty("pointer-events", "auto", "important");
  root.style.setProperty("isolation", "isolate", "important");
  root.style.setProperty("box-sizing", "border-box", "important");
  root.style.setProperty("padding", "max(46px, calc(env(safe-area-inset-top, 0px) + 34px)) 12px 0", "important");
  root.style.setProperty("background", "linear-gradient(150deg, #030407 0%, #070a10 42%, #020307 100%)", "important");
  if (back) {
    back.style.setProperty("display", "inline-flex", "important");
    back.style.setProperty("position", "relative", "important");
    back.style.setProperty("top", "auto", "important");
    back.style.setProperty("left", "auto", "important");
    back.style.setProperty("right", "auto", "important");
    back.style.setProperty("bottom", "auto", "important");
    back.style.setProperty("flex", "0 0 auto", "important");
    back.style.setProperty("z-index", "3", "important");
    back.style.setProperty("margin", "0 0 14px", "important");
  }
  if (section) {
    section.style.setProperty("display", "block", "important");
    section.style.setProperty("visibility", "visible", "important");
    section.style.setProperty("opacity", "1", "important");
    section.style.setProperty("flex", "1 1 auto", "important");
    section.style.setProperty("position", "relative", "important");
    section.style.setProperty("top", "auto", "important");
    section.style.setProperty("right", "auto", "important");
    section.style.setProperty("bottom", "auto", "important");
    section.style.setProperty("left", "auto", "important");
    section.style.setProperty("z-index", "2", "important");
    section.style.setProperty("width", "100%", "important");
    section.style.setProperty("max-width", "1120px", "important");
    section.style.setProperty("min-width", "0", "important");
    section.style.setProperty("min-height", "0", "important");
    section.style.setProperty("height", "auto", "important");
    section.style.setProperty("max-height", "none", "important");
    section.style.setProperty("margin", "0 auto", "important");
    section.style.setProperty("overflow-x", "hidden", "important");
    section.style.setProperty("overflow-y", "auto", "important");
    section.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
    section.style.setProperty("overscroll-behavior-y", "contain", "important");
    section.style.setProperty("touch-action", "pan-y pinch-zoom", "important");
    section.style.setProperty("box-sizing", "border-box", "important");
    section.style.setProperty("padding", "0 0 16px", "important");
    section.style.setProperty("color", "var(--text, #f4ead6)", "important");
    section.style.setProperty("transform", "none", "important");
  }
}

window.pokerSyncPlayerCrmStandaloneLayout = pokerApplyPlayerCrmStandaloneLayout;

function pokerRenderPlayerCrmOpeningFallback() {
  var stats = document.getElementById("playerCrmStats");
  var analytics = document.getElementById("playerCrmAnalytics");
  var statsText = stats && stats.textContent ? stats.textContent.trim() : "";
  var analyticsText = analytics && analytics.textContent ? analytics.textContent.trim() : "";
  if (stats && (!statsText || /Загрузка (?:CRM|дашборда)/i.test(statsText))) {
    stats.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Дашборд открывается. Данные появятся через несколько секунд.</div>";
  }
  if (analytics && (!analyticsText || /График загрузится после открытия (?:CRM|дашборда)/i.test(analyticsText))) {
    analytics.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Готовим график и сводку игроков.</div>";
  }
}

function pokerRenderPlayerCrmOpenError(message) {
  var stats = document.getElementById("playerCrmStats");
  if (!stats) return;
  stats.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">" + (message || "Дашборд не догрузился. Закрой и открой раздел ещё раз.") + "</div>";
}

function pokerSyncPlayerCrmShellTabs(tabName) {
  var root = document.getElementById("playerCrmView");
  if (!root) return;
  var tabs = root.querySelectorAll(".player-crm__tab[data-crm-tab]");
  var panels = root.querySelectorAll(".player-crm__tab-panel[data-crm-panel]");
  if (!tabs.length || !panels.length) return;
  var target = tabName || window.__pokerPlayerCrmPendingTab || "";
  if (!target) {
    var active = root.querySelector(".player-crm__tab--active[data-crm-tab]");
    target = active ? active.getAttribute("data-crm-tab") : "stats";
  }
  var hasTarget = false;
  tabs.forEach(function (tab) {
    if (tab.getAttribute("data-crm-tab") === target) hasTarget = true;
  });
  if (!hasTarget) target = "stats";
  window.__pokerPlayerCrmPendingTab = target;
  tabs.forEach(function (tab) {
    tab.classList.toggle("player-crm__tab--active", tab.getAttribute("data-crm-tab") === target);
  });
  panels.forEach(function (panel) {
    panel.classList.toggle("player-crm__tab-panel--active", panel.getAttribute("data-crm-panel") === target);
  });
}

function pokerBindPlayerCrmShellTabs() {
  var root = document.getElementById("playerCrmView");
  if (!root || root.dataset.crmShellTabsBound === "1") return;
  root.dataset.crmShellTabsBound = "1";
  root.addEventListener("click", function (e) {
    var tab = e.target && e.target.closest ? e.target.closest(".player-crm__tab[data-crm-tab]") : null;
    if (!tab || !root.contains(tab)) return;
    pokerSyncPlayerCrmShellTabs(tab.getAttribute("data-crm-tab") || "stats");
  });
  pokerSyncPlayerCrmShellTabs();
}

function pokerForcePlayerCrmVisible() {
  var root = document.getElementById("playerCrmView");
  if (!root) return;
  if (window.__pokerPlayerCrmStandaloneOpen) {
    pokerApplyPlayerCrmStandaloneLayout();
    return;
  }
  pokerPortalPlayerCrmRoot(root);
  var section = root.querySelector(".player-crm");
  var active = root.classList && root.classList.contains("view--active");
  var isCrmView = false;
  try {
    isCrmView = document.body && document.body.getAttribute("data-view") === "player-crm";
  } catch (eBodyView) {}
  if (!active && !isCrmView) {
    pokerResetPlayerCrmForcedVisibility();
    return;
  }
  var h = pokerGetStablePlayerCrmViewportHeight();
  var shellHeight = h >= 320 ? Math.round(h) + "px" : "100vh";
  root.style.setProperty("position", "fixed", "important");
  root.style.setProperty("top", "0", "important");
  root.style.setProperty("right", "0", "important");
  root.style.setProperty("bottom", "auto", "important");
  root.style.setProperty("left", "0", "important");
  root.style.setProperty("min-height", shellHeight, "important");
  root.style.setProperty("height", shellHeight, "important");
  root.style.setProperty("max-height", shellHeight, "important");
  root.style.setProperty("overflow", "hidden", "important");
  root.style.setProperty("display", "flex", "important");
  root.style.setProperty("flex-direction", "column", "important");
  root.style.setProperty("align-items", "stretch", "important");
  root.style.setProperty("gap", "8px", "important");
  root.style.setProperty("visibility", "visible", "important");
  root.style.setProperty("opacity", "1", "important");
  root.style.setProperty("z-index", "2147483000", "important");
  root.style.setProperty("pointer-events", "auto", "important");
  root.style.setProperty("isolation", "isolate", "important");
  root.style.setProperty("background", "linear-gradient(150deg, #030407 0%, #070a10 42%, #020307 100%)", "important");
  if (section) {
    section.style.setProperty("display", "block", "important");
    section.style.setProperty("visibility", "visible", "important");
    section.style.setProperty("opacity", "1", "important");
    section.style.setProperty("flex", "1 1 auto", "important");
    section.style.setProperty("position", "absolute", "important");
    section.style.setProperty("top", "max(74px, calc(env(safe-area-inset-top, 0px) + 62px))", "important");
    section.style.setProperty("right", "max(12px, var(--screen-gutter-x, 12px))", "important");
    section.style.setProperty("bottom", "0", "important");
    section.style.setProperty("left", "max(12px, var(--screen-gutter-x, 12px))", "important");
    section.style.setProperty("z-index", "2", "important");
    section.style.setProperty("width", "auto", "important");
    section.style.setProperty("max-width", "100%", "important");
    section.style.setProperty("min-height", "0", "important");
    section.style.setProperty("height", "auto", "important");
    section.style.setProperty("max-height", "none", "important");
    section.style.removeProperty("max-height");
    section.style.setProperty("margin", "0 auto", "important");
    section.style.setProperty("overflow-x", "hidden", "important");
    section.style.setProperty("overflow-y", "auto", "important");
    section.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
    section.style.setProperty("box-sizing", "border-box", "important");
    section.style.setProperty("padding-bottom", "max(12px, calc(env(safe-area-inset-bottom, 0px) + 12px))", "important");
    section.style.setProperty("transform", "none", "important");
  }
}

function pokerSchedulePlayerCrmViewportSync() {
  [0, 32, 90, 180, 360, 720, 1200, 2200, 3600].forEach(function (delay) {
    setTimeout(function () {
      try {
        if (!window.__pokerPlayerCrmStandaloneOpen && document.body && document.body.getAttribute("data-view") !== "player-crm") return;
        pokerForcePlayerCrmVisible();
        if (typeof window.pokerSyncPlayerCrmViewportShell === "function") {
          window.pokerSyncPlayerCrmViewportShell();
        }
      } catch (eCrmSync) {}
    }, delay);
  });
}

var playerCrmBlackScreenRescueBound = false;

function pokerInstallPlayerCrmBlackScreenRescue() {
  if (playerCrmBlackScreenRescueBound) return;
  playerCrmBlackScreenRescueBound = true;
  function applyRescue() {
    try {
      if (!window.__pokerPlayerCrmStandaloneOpen && (!document.body || document.body.getAttribute("data-view") !== "player-crm")) return;
      pokerForcePlayerCrmVisible();
      var root = document.getElementById("playerCrmView");
      var section = root && root.querySelector(".player-crm");
      if (!root || !section || !section.getBoundingClientRect) return;
      var rect = section.getBoundingClientRect();
      var hidden =
        rect.height < 120 ||
        rect.bottom < 180 ||
        rect.top > Math.max(180, (window.innerHeight || 0) - 220);
      if (!hidden) return;
      if (window.__pokerPlayerCrmStandaloneOpen) {
        pokerApplyPlayerCrmStandaloneLayout();
        return;
      }
      root.style.setProperty("min-height", "100vh", "important");
      root.style.setProperty("height", "100vh", "important");
      root.style.setProperty("max-height", "100vh", "important");
      section.style.setProperty("position", "absolute", "important");
      section.style.setProperty("top", "74px", "important");
      section.style.setProperty("right", "12px", "important");
      section.style.setProperty("bottom", "0", "important");
      section.style.setProperty("left", "12px", "important");
      section.style.setProperty("display", "block", "important");
      section.style.setProperty("visibility", "visible", "important");
      section.style.setProperty("opacity", "1", "important");
      section.style.setProperty("overflow-y", "auto", "important");
      section.style.setProperty("color", "#f4ead6", "important");
    } catch (eCrmRescue) {}
  }
  try {
    var observer = new MutationObserver(applyRescue);
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ["data-view", "class"] });
  } catch (eCrmObserver) {}
  [0, 50, 150, 350, 700, 1400, 2600, 4200].forEach(function (delay) {
    setTimeout(applyRescue, delay);
  });
}

pokerInstallPlayerCrmBlackScreenRescue();

function pokerPortalPlayerCrmRoot(root) {
  if (!root || !document.body || root.parentNode === document.body) return;
  try {
    if (!window.__pokerPlayerCrmRootPlaceholder) {
      window.__pokerPlayerCrmRootPlaceholder = document.createComment("player-crm-view-placeholder");
    }
    var placeholder = window.__pokerPlayerCrmRootPlaceholder;
    if (!placeholder.parentNode && root.parentNode) {
      root.parentNode.insertBefore(placeholder, root);
    }
    document.body.appendChild(root);
  } catch (ePortal) {}
}

function pokerResetPlayerCrmForcedVisibility() {
  var root = document.getElementById("playerCrmView");
  if (!root) return;
  var section = root.querySelector(".player-crm");
  var back = root.querySelector('[data-crm-close="player-crm"], .bonus-game-back');
  [
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "min-height",
    "height",
    "max-height",
    "overflow",
    "overflow-y",
    "display",
    "flex-direction",
    "align-items",
    "gap",
    "visibility",
    "opacity",
    "z-index",
    "pointer-events",
    "isolation",
    "box-sizing",
    "padding",
    "background"
  ].forEach(function (prop) {
    try {
      root.style.removeProperty(prop);
    } catch (eRootStyle) {}
  });
  if (section) {
    [
      "display",
      "visibility",
      "opacity",
      "flex",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "width",
      "max-width",
      "min-height",
      "height",
      "max-height",
      "margin",
      "overflow-x",
      "overflow-y",
      "-webkit-overflow-scrolling",
      "box-sizing",
      "padding",
      "padding-bottom",
      "color",
      "overscroll-behavior-y",
      "touch-action",
      "transform"
    ].forEach(function (prop) {
      try {
        section.style.removeProperty(prop);
      } catch (eSectionStyle) {}
    });
  }
  if (back) {
    [
      "display",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "flex",
      "z-index",
      "margin"
    ].forEach(function (prop) {
      try {
        back.style.removeProperty(prop);
      } catch (eBackStyle) {}
    });
  }
  root.classList.remove("view--active", "player-crm-standalone");
  try {
    var placeholder = window.__pokerPlayerCrmRootPlaceholder;
    if (placeholder && placeholder.parentNode && root.parentNode !== placeholder.parentNode) {
      placeholder.parentNode.insertBefore(root, placeholder);
      placeholder.parentNode.removeChild(placeholder);
    }
  } catch (eRestoreRoot) {}
}

function pokerClosePlayerCrmStandalone() {
  playerCrmOpenToken += 1;
  window.__pokerPlayerCrmStandaloneOpen = false;
  if (document.documentElement) document.documentElement.classList.remove("player-crm-standalone-open");
  if (document.body) document.body.classList.remove("player-crm-standalone-open");
  pokerResetPlayerCrmForcedVisibility();
  try {
    pokerSyncInertForViewScreensOnly();
  } catch (eCloseCrmInert) {}
  try {
    var active = document.querySelector('.view.view--active[data-view]');
    if (!active && typeof setView === "function") setView("home");
  } catch (eCloseCrmView) {}
}

window.pokerClosePlayerCrmStandalone = pokerClosePlayerCrmStandalone;

function pokerSyncViewHtmlScrollClasses(viewName) {
  var root = document.documentElement;
  if (!root || !root.classList) return;
  root.classList.toggle("app-view-home-html-scroll", viewName === "home");
  root.classList.toggle("app-view-download-html-scroll", viewName === "download");
  root.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  root.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  root.classList.toggle("app-view-summer-rating-html-scroll", viewName === "summer-rating");
  root.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  root.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  root.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  root.classList.toggle("app-view-equilator-html-scroll", viewName === "equilator");
  root.classList.toggle("app-view-transfers-html-scroll", viewName === "transfers");
  root.classList.toggle("app-view-daily-poker-html-scroll", viewName === "daily-poker");
  root.classList.toggle("app-view-admin-bonuses-html-scroll", viewName === "admin-bonuses");
  root.classList.toggle("app-view-player-crm-html-scroll", viewName === "player-crm");
  var appEl = document.getElementById("app");
  if (appEl) appEl.classList.toggle("app--view-home", viewName === "home");
}

(function pokerInitInactiveViewsInert() {
  function apply() {
    pokerSyncInertForViewScreensOnly();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();

// При запуске: главная / локальный браузер (скролл на body на всех не-chat экранах без initData)
(function () {
  var initialView = document.querySelector(".view--active[data-view]");
  var viewName = initialView ? initialView.getAttribute("data-view") : "";
  if (viewName === "home") {
    document.documentElement.classList.add("app-view-home");
  }
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-summer-rating-html-scroll", viewName === "summer-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  document.documentElement.classList.toggle("app-view-equilator-html-scroll", viewName === "equilator");
  document.documentElement.classList.toggle("app-view-transfers-html-scroll", viewName === "transfers");
  document.documentElement.classList.toggle("app-view-admin-bonuses-html-scroll", viewName === "admin-bonuses");
  document.documentElement.classList.toggle("app-view-player-crm-html-scroll", viewName === "player-crm");
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* long-scroll без главной/дашборда и без «Скачать»: прокрутка через body для старых длинных экранов. */
  var longScrollInit =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScrollInit);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScrollInit);
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
      if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
    } catch (eSiteHomeInit) {}
  });
} else {
  try {
    if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
  } catch (eSiteHomeInitNow) {}
}

/** Открытие диалога менеджера из депозита после setView("chat"): не полагаться на фиксированный таймаут. */
function pokerTryConsumePendingManagerFromCashout() {
  var pm = window.__pendingOpenManagerFromCashout;
  if (!pm || !pm.userId) return;
  if (typeof window.chatOpenConvFromDialogs !== "function") return;
  window.__pendingOpenManagerFromCashout = null;
  window.chatOpenConvFromDialogs(pm.userId, pm.userName || "Менеджер");
}

function pokerChatDomainScriptsReady() {
  return typeof initChatUserModals === "function" &&
    typeof initChatGeneralLoader === "function" &&
    typeof initChatPersonalLoader === "function";
}

function pokerHasHydratedRafflesView() {
  return !!(
    document.querySelector('.view[data-view="raffles"]:not([data-html-fragment]) .raffles-hero') ||
    document.getElementById("rafflesActiveChooser") ||
    document.getElementById("rafflesTabs")
  );
}

function pokerEnsureRafflesAfterShell() {
  if (pokerEnsureRafflesAfterShell.pending) return;
  pokerEnsureRafflesAfterShell.pending = true;
  var htmlReady = typeof window.pokerEnsureViewHtml === "function"
    ? window.pokerEnsureViewHtml("raffles")
    : true;
  var scriptsReady = typeof window.pokerEnsureViewScripts === "function"
    ? window.pokerEnsureViewScripts("raffles")
    : true;
  Promise.all([Promise.resolve(htmlReady), Promise.resolve(scriptsReady)])
    .then(function () {
      pokerEnsureRafflesAfterShell.pending = false;
      if (!document.body || document.body.getAttribute("data-view") !== "raffles") return;
      setView("raffles", { htmlReady: true, scriptsReady: true });
    })
    .catch(function (err) {
      pokerEnsureRafflesAfterShell.pending = false;
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert) {
        window.Telegram.WebApp.showAlert("Не удалось загрузить розыгрыши. Попробуйте ещё раз.");
      }
      if (typeof console !== "undefined" && console.warn) console.warn("raffles shell hydration", err);
    });
}

var pokerPendingViewNavigationSeq = 0;
var pokerPendingViewNavigation = null;
var pokerSectionLoadingOverlayTimer = null;
var pokerSectionLoadingOverlayShownAt = 0;

var POKER_SECTION_LOADING_LABELS = {
  "profile": "Загружаем профиль",
  "chat": "Загружаем чаты",
  "winter-rating": "Загружаем рейтинг",
  "spring-rating": "Загружаем рейтинг",
  "summer-rating": "Загружаем рейтинг",
  "raffles": "Загружаем розыгрыши",
  "daily-poker": "Загружаем раздачу дня",
  "learn-play-hub": "Загружаем обучение",
  "bonus-game": "Загружаем бонусную игру",
  "cooler-game": "Загружаем игру",
  "plasterer-game": "Загружаем игру",
  "poker-tasks": "Загружаем задания клуба",
  "hall-of-fame": "Загружаем зал славы",
  "schedule": "Загружаем расписание",
  "download": "Загружаем раздел",
  "streams": "Загружаем трансляции",
  "cashout": "Загружаем депозит",
  "transfers": "Загружаем переводы",
  "video-lessons": "Загружаем видеоуроки",
  "equilator": "Загружаем эквилятор",
  "player-crm": "Загружаем игроков",
  "admin-bonuses": "Загружаем бонусы"
};

function pokerSectionLoadingLabel(viewName) {
  return POKER_SECTION_LOADING_LABELS[String(viewName || "")] || "Загружаем раздел";
}

function pokerShowSectionLoadingOverlay(viewName) {
  if (document.getElementById("appBootOverlay")) return;
  var overlay = document.getElementById("pokerSectionLoadingOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "pokerSectionLoadingOverlay";
    overlay.className = "app-boot-overlay app-boot-overlay--section";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.setAttribute("aria-busy", "true");
    overlay.innerHTML =
      '<div class="app-boot-overlay__panel">' +
        '<img src="./assets/app-boot-poker21-plus-chip.webp?v=1" alt="" class="app-boot-overlay__logo" width="132" height="132" decoding="async" aria-hidden="true" />' +
        '<div class="app-boot-overlay__conn-title" data-poker-section-loader-title></div>' +
        '<div class="app-boot-overlay__progress" aria-hidden="true"><span class="app-boot-overlay__progress-bar"></span></div>' +
        '<p class="app-boot-overlay__text">Подготавливаем раздел…</p>' +
      '</div>';
    (document.body || document.documentElement).appendChild(overlay);
  }
  if (pokerSectionLoadingOverlayTimer) {
    clearTimeout(pokerSectionLoadingOverlayTimer);
    pokerSectionLoadingOverlayTimer = null;
  }
  overlay.classList.remove("app-boot-overlay--hidden", "app-boot-overlay--finishing");
  overlay.setAttribute("data-loading-view", String(viewName || ""));
  overlay.setAttribute("aria-hidden", "false");
  overlay.setAttribute("aria-busy", "true");
  var title = overlay.querySelector("[data-poker-section-loader-title]");
  if (title) title.textContent = pokerSectionLoadingLabel(viewName);
  var progress = overlay.querySelector(".app-boot-overlay__progress-bar");
  if (progress) {
    progress.style.animation = "none";
    void progress.offsetWidth;
    progress.style.removeProperty("animation");
  }
  pokerSectionLoadingOverlayShownAt = Date.now();
}

function pokerHideSectionLoadingOverlay(viewName, immediate) {
  var overlay = document.getElementById("pokerSectionLoadingOverlay");
  if (!overlay) return;
  var loadingView = overlay.getAttribute("data-loading-view") || "";
  if (viewName && loadingView && loadingView !== String(viewName)) return;
  var wait = immediate ? 0 : Math.max(0, 520 - (Date.now() - pokerSectionLoadingOverlayShownAt));
  if (pokerSectionLoadingOverlayTimer) clearTimeout(pokerSectionLoadingOverlayTimer);
  pokerSectionLoadingOverlayTimer = setTimeout(function () {
    pokerSectionLoadingOverlayTimer = null;
    var current = document.getElementById("pokerSectionLoadingOverlay");
    if (!current) return;
    current.classList.add("app-boot-overlay--finishing");
    var status = current.querySelector(".app-boot-overlay__text");
    if (status) status.textContent = "Готово";
    setTimeout(function () {
      current.classList.add("app-boot-overlay--hidden");
      current.setAttribute("aria-hidden", "true");
      current.setAttribute("aria-busy", "false");
    }, 180);
  }, wait);
}

function pokerShowViewLoadingShell(viewName) {
  var body = document.body;
  if (body) {
    body.setAttribute("data-view", viewName || "");
    body.setAttribute("data-poker-loading-view", viewName || "");
    body.classList.add("poker-view-section-loading");
    body.classList.remove("poker-view-section-load-error");
  }
  pokerGetViewNodes().forEach(function (view) {
    view.classList.toggle("view--active", view.dataset.view === viewName);
  });
  navItems.forEach(function (item) {
    item.classList.toggle("bottom-nav__item--active", item.dataset.viewTarget === viewName);
  });
  if (footer) footer.classList.toggle("card__footer--hidden", viewName !== "home");
  try {
    pokerSyncViewHtmlScrollClasses(viewName);
    pokerSyncInertForViewScreensOnly();
  } catch (ePendingLayout) {}
  try {
    if (typeof window.pokerEnsureViewLoadingSkeleton === "function") {
      window.pokerEnsureViewLoadingSkeleton(viewName);
    }
  } catch (ePendingSkeleton) {}
  pokerShowSectionLoadingOverlay(viewName);
}

function pokerClearViewLoadingShell(viewName) {
  if (document.body && document.body.getAttribute("data-poker-loading-view") === String(viewName || "")) {
    document.body.removeAttribute("data-poker-loading-view");
    document.body.classList.remove("poker-view-section-loading", "poker-view-section-load-error");
  }
  try {
    if (typeof window.pokerClearViewLoadingSkeleton === "function") {
      window.pokerClearViewLoadingSkeleton(viewName);
    }
  } catch (eClearPendingSkeleton) {}
  pokerHideSectionLoadingOverlay(viewName, false);
}

function pokerBeginProgressiveViewNavigation(viewName, navOpts) {
  var htmlReady = true;
  var scriptsReady = true;
  try {
    if (!navOpts.htmlReady && typeof window.pokerEnsureViewHtml === "function") {
      var htmlViewName = (viewName === "spring-rating" || viewName === "summer-rating") ? "winter-rating" : viewName;
      htmlReady = window.pokerEnsureViewHtml(htmlViewName);
    }
  } catch (eHtmlView) {
    htmlReady = true;
  }
  try {
    if (!navOpts.scriptsReady && typeof window.pokerEnsureViewScripts === "function") {
      scriptsReady = window.pokerEnsureViewScripts(viewName);
    }
  } catch (eScriptsView) {
    scriptsReady = true;
  }

  var waits = [];
  if (htmlReady && typeof htmlReady.then === "function") waits.push(Promise.resolve(htmlReady));
  if (scriptsReady && typeof scriptsReady.then === "function") waits.push(Promise.resolve(scriptsReady));
  if (!waits.length) return false;

  var fromView = "";
  try {
    fromView = document.body ? (document.body.getAttribute("data-view") || "") : "";
  } catch (eFromView) {}
  var fromScrollY = 0;
  try {
    fromScrollY = getMainDocumentScrollY();
  } catch (eFromScroll) {}
  var token = ++pokerPendingViewNavigationSeq;
  pokerPendingViewNavigation = { token: token, view: viewName };
  pokerShowViewLoadingShell(viewName);

  Promise.all(waits).then(function () {
    var pending = pokerPendingViewNavigation;
    if (!pending || pending.token !== token || pending.view !== viewName) return;
    var nextOpts = {};
    Object.keys(navOpts).forEach(function (key) {
      nextOpts[key] = navOpts[key];
    });
    nextOpts.htmlReady = true;
    nextOpts.scriptsReady = true;
    nextOpts.fromPendingShell = true;
    nextOpts.pendingFromView = fromView;
    nextOpts.pendingFromScrollY = fromScrollY;
    setView(viewName, nextOpts);
  }).catch(function (err) {
    var pending = pokerPendingViewNavigation;
    if (!pending || pending.token !== token || pending.view !== viewName) return;
    if (document.body) {
      document.body.classList.remove("poker-view-section-loading");
      document.body.classList.add("poker-view-section-load-error");
    }
    pokerHideSectionLoadingOverlay(viewName, true);
    var activeSkeleton = document.querySelector('.view--active[data-view="' + String(viewName || "").replace(/"/g, '\\"') + '"] .poker-section-skeleton__title');
    if (activeSkeleton) activeSkeleton.textContent = "Не удалось загрузить. Нажмите раздел ещё раз";
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert) {
      window.Telegram.WebApp.showAlert("Не удалось загрузить раздел. Попробуйте ещё раз.");
    }
    if (typeof console !== "undefined" && console.warn) console.warn("progressive view load", err);
  });
  return true;
}

function setView(viewName, navOpts) {
  navOpts = navOpts || {};
  if (
    viewName === "player-crm" &&
    (typeof window.pokerHasAdminMenuAccess !== "function" || !window.pokerHasAdminMenuAccess("crm"))
  ) {
    viewName = "home";
    navOpts = {};
  }
  var previousPendingNavigation = pokerPendingViewNavigation;
  if (previousPendingNavigation) {
    pokerPendingViewNavigationSeq += 1;
    pokerPendingViewNavigation = null;
    pokerClearViewLoadingShell(previousPendingNavigation.view);
  }
  if (pokerBeginProgressiveViewNavigation(viewName, navOpts)) return;
  try {
    pokerPushOpenStateDebug("setView-enter", String(viewName || ""));
  } catch (eSetViewDbg0) {}
  var restoreScrollOnEnter = navOpts.fromBack === true;
  try {
    if (viewName !== "chat" && viewName !== "keyboard-lab") {
      setTelegramIosKeyboardRootLock(false);
    }
  } catch (eTgKbUnlockView) {}
  /* Чаты всегда открываются (нижнее меню). Верификация — pokerEnsure на диалогах/отправке. */
  var prevView = "";
  try {
    if (navOpts.fromPendingShell) prevView = String(navOpts.pendingFromView || "");
    else if (document.body && document.body.getAttribute) prevView = document.body.getAttribute("data-view") || "";
  } catch (ePrev) {}
  try {
    if (viewName === "raffles" && prevView === "home" && typeof window !== "undefined") {
      if (navOpts && navOpts.raffleCompletedTarget) {
        window.__pokerRafflesOpenActiveTab = false;
      } else if (navOpts && navOpts.raffleActiveTarget) {
        window.__pendingRaffleCompletedId = "";
        window.__pokerRafflesOpenActiveTab = true;
      } else {
        window.__pendingRaffleCompletedId = "";
        window.__pokerRafflesOpenActiveTab = true;
      }
    }
  } catch (eRafflesHomeEntry) {}
  /* Уход с чата по таббару/жесту: blur и полный сброс клавиатуры/ visualViewport — иначе на iOS залипают
     html.chat-keyboard-open (overflow:hidden), inset и таббар «парит» с зазором снизу до главной. */
  if (prevView === "chat" && viewName !== "chat") {
    try {
      if (document.body && document.body.classList) document.body.classList.remove("chat-conversation-open");
      if (document.documentElement && document.documentElement.classList) document.documentElement.classList.remove("chat-conversation-open");
    } catch (eChatConvClassLeave) {}
    try {
      var compLeave = document.getElementById("chatSharedComposer");
      if (compLeave && document.activeElement === compLeave && typeof compLeave.blur === "function") compLeave.blur();
      var dlgLeave = document.getElementById("chatFindByIdInputDialogs");
      if (dlgLeave && document.activeElement === dlgLeave && typeof dlgLeave.blur === "function") dlgLeave.blur();
      var findLeave = document.getElementById("chatFindByIdInput");
      if (findLeave && document.activeElement === findLeave && typeof findLeave.blur === "function") findLeave.blur();
    } catch (eBlurLeaveChat) {}
    try {
      if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
        window.__pokerFinalizeChatKeyboardDismiss();
      } else {
        if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
          window.__pokerClearChatKeyboardViewportState();
        }
        if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
          window.__pokerChatDetachVisualViewportListeners();
        }
      }
    } catch (eFinKb) {}
    try {
      var twLeave = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twLeave && typeof twLeave.expand === "function") twLeave.expand();
    } catch (eTwExp) {}
    try {
      if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
    } catch (eRes) {}
    try {
      if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
    } catch (ePadL) {}
    try {
      var bnavLeaveChat = document.querySelector(".bottom-nav");
      if (bnavLeaveChat) {
        bnavLeaveChat.classList.add("bottom-nav--no-transition");
        var rafLvc = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafLvc(function () {
          rafLvc(function () {
            bnavLeaveChat.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavLvc) {}
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb2) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk2) {}
      try {
        var tw2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tw2 && typeof tw2.expand === "function") tw2.expand();
      } catch (eTw2) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv) {}
    }, 120);
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb3) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk3) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv2) {}
    }, 380);
  }
  if (prevView && prevView !== viewName) {
    viewScrollMemory[prevView] = navOpts.fromPendingShell
      ? (Number(navOpts.pendingFromScrollY) || 0)
      : getMainDocumentScrollY();
  }
  if (document.body) {
    pokerClearBodyDocumentScrollLockInline();
    document.body.setAttribute("data-view", viewName || "");
    pokerSyncViewHtmlScrollClasses(viewName);
    document.body.classList.remove("view--active");
    document.documentElement.classList.remove("view--active");
    try {
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
        window.__pokerSyncProfileGuestWebsiteMode();
      }
    } catch (eProfileGuestSync) {}
    try {
      if (viewName !== "home" && prevView === "home") {
        var olH = document.querySelector(".view[data-view=\"home\"] .home-welcome-outline");
        if (olH) olH.style.removeProperty("--home-welcome-outline-frame-h");
      }
    } catch (eHof) {}
  }
  try {
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
  } catch (eSiteHomeHdrView) {}
  try {
    if (viewName === "chat") {
      var guestChatGate = document.getElementById("chatDialogsGuestGate");
      var isTelegramMiniView = !!(window.Telegram && window.Telegram.WebApp);
      if (
        guestChatGate &&
        document.documentElement &&
        document.documentElement.classList &&
        (isTelegramMiniView ||
          document.documentElement.classList.contains("poker-ios-pwa") ||
          document.documentElement.classList.contains("poker-android-pwa"))
      ) {
        guestChatGate.hidden = true;
      }
    }
  } catch (eGuestGatePwaHide) {}
  /* После data-view: иначе при выходе из чата ensure видел data-view=chat и выходил раньше времени */
  if (viewName !== "chat") pokerEnsureUnlockedDocumentScrollForNonChat();
  if (prevView === "chat" && viewName !== "chat") {
    try {
      if (typeof window.__pokerStopChatDmFocusSession === "function") window.__pokerStopChatDmFocusSession();
    } catch (eDmLv) {}
    try {
      var rafPostChat = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafPostChat(function () {
        try {
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        } catch (ePostNv) {}
      });
    } catch (ePostChat) {}
  }
  pokerGetViewNodes().forEach(function (view) {
    if (view.dataset.view === viewName) {
      view.classList.add("view--active");
    } else {
      view.classList.remove("view--active");
    }
  });
  pokerClearViewLoadingShell(viewName);
  if (viewName !== "player-crm") {
    pokerResetPlayerCrmForcedVisibility();
  }
  try {
    pokerSyncInertForViewScreensOnly();
  } catch (eInactiveViewsInert) {}
  // Мгновенный финальный вид нижней навигации при возврате на главную (без 250ms «доезда» поверх контента).
  if (viewName === "home" && prevView !== "home") {
    try {
      var bnavNt = document.querySelector(".bottom-nav");
      if (bnavNt) {
        bnavNt.classList.add("bottom-nav--no-transition");
        var rafNavNt = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
        rafNavNt(function () {
          rafNavNt(function () {
            bnavNt.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavNt) {}
  }
  navItems.forEach(function (item) {
    if (item.dataset.viewTarget === viewName) {
      item.classList.add("bottom-nav__item--active");
    } else {
      item.classList.remove("bottom-nav__item--active");
    }
  });
  if (footer) {
    if (viewName === "home") {
      footer.classList.remove("card__footer--hidden");
      fetchVisitorStatsOnly();
      if (typeof fetchRaffleBadge === "function") fetchRaffleBadge();
      if (typeof tryChillRadioPlay === "function") tryChillRadioPlay();
    } else {
      footer.classList.add("card__footer--hidden");
    }
  }
  if (viewName === "home") {
    initPokerShowsPlayer();
    if (typeof updateTournamentDayBlock === "function") updateTournamentDayBlock();
    try {
      var runHomeChatSummary = function () {
        if (typeof window.__pokerScheduleChatHomeSummaryFetch === "function") {
          window.__pokerScheduleChatHomeSummaryFetch();
        }
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runHomeChatSummary, 0);
      } else {
        var idleChatBoot = window.requestIdleCallback || function (cb) { setTimeout(cb, 80); };
        idleChatBoot(runHomeChatSummary);
      }
    } catch (eChatBootHome) {}
    if (!window.chatListenersAttached && typeof initChat === "function") {
      var idle = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
      idle(function () {
        var canInitHomeChat = false;
        try {
          canInitHomeChat = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
        } catch (eHomeChatCred) {}
        if (!canInitHomeChat && window.Telegram && window.Telegram.WebApp) {
          try {
            canInitHomeChat = !!String(window.Telegram.WebApp.initData || "");
          } catch (eHomeChatTg) {}
        }
        if (canInitHomeChat) initChat();
      });
    }
    try {
      if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") {
        var rafHof = window.requestAnimationFrame || function (fn) { setTimeout(fn, 0); };
        rafHof(function () {
          rafHof(function () {
            pokerUpdateHomeWelcomeOutlineFrame();
          });
        });
      }
    } catch (eHomeOf) {}
  }
  if (viewName === "chat") {
    try {
      pokerPushOpenStateDebug("setView-chat-branch", "");
    } catch (eSetViewDbg1) {}
    try {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
    } catch (eChatKbCls) {}
    /* Один expand вместо burst: повторы дергали viewportChanged/padding и таббар подпрыгивал */
    if (prevView !== "chat" && typeof window.tryTelegramWebAppExpand === "function") {
      window.tryTelegramWebAppExpand();
    }
    try {
      if (prevView !== "chat") {
        var bnavChat = document.querySelector(".bottom-nav");
        if (bnavChat) {
          bnavChat.classList.add("bottom-nav--no-transition");
          var rafNavChat = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          rafNavChat(function () {
            rafNavChat(function () {
              bnavChat.classList.remove("bottom-nav--no-transition");
            });
          });
        }
      }
    } catch (eNavChat) {}
    if (prevView !== "chat") {
      try {
        var rafDmEnter = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafDmEnter(function () {
          try {
            if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
          } catch (eDmEnt) {}
        });
      } catch (eRafDm) {}
    }
    if (!window.chatListenersAttached && typeof initChat === "function") {
      try {
        pokerPushOpenStateDebug("setView-chat-initChat", "listeners=0");
      } catch (eSetViewDbg2) {}
      var runChatInit = function () {
        if (!window.chatListenersAttached && typeof initChat === "function") initChat();
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runChatInit, 0);
      } else {
        var idleChat = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
        idleChat(runChatInit);
      }
    } else if (window.chatListenersAttached) {
      try {
        pokerPushOpenStateDebug("setView-chat-refresh-path", "listeners=1");
      } catch (eSetViewDbg3) {}
      if (window.__pendingOpenClubChatGeneral) {
        window.__pendingOpenClubChatGeneral = false;
        if (typeof window.tryOpenClubChatFromDialogs === "function") window.tryOpenClubChatFromDialogs();
        else if (typeof window.openClubChat === "function") window.openClubChat();
      } else if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.chatOpenConvFromDialogs === "function") {
        try {
          var pendingDmSetView = window.__pendingOpenChatPersonalFromDeepLink;
          var pendingPeerSetView =
            pendingDmSetView && pendingDmSetView.userId != null ? String(pendingDmSetView.userId).trim() : "";
          pokerPushOpenStateDebug("setView-chat-open-pending", pendingPeerSetView || "");
          if (
            pendingPeerSetView &&
            typeof pokerOpenResolvedChatPeer === "function" &&
            pokerOpenResolvedChatPeer(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            window.__pendingOpenChatPersonalFromDeepLink = null;
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
            pokerOpenPendingPushDmWithoutContacts(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenChatPeerDirectFallback === "function" &&
            pokerOpenChatPeerDirectFallback(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else {
            if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
            }
          }
        } catch (eSetViewOpenPending) {
          try {
            window.__pokerForceAllowPendingPushConvOpen = false;
          } catch (eSetViewForceReset) {}
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        }
      } else if (window.__pendingOpenChatPersonalFromDeepLink) {
        try {
          pokerPushOpenStateDebug(
            "setView-chat-wait-exports",
            "openConv=" + (typeof window.chatOpenConvFromDialogs) + " pushImm=" + (typeof window.__pokerOpenPushDmImmediate)
          );
        } catch (eSetViewDbg4) {}
        window.__pokerPendingChatDeepLinkNeedsLateFlush = true;
      } else if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) {
      } else if (!pokerShouldSkipAutoShowChatDialogs("setView-refresh-path") && typeof window.chatShowDialogs === "function") {
        window.chatShowDialogs();
      }
    }
  }
  function restoreSeasonalRatingSectionToWinter() {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    if (!ratingSection || !winterView) return;
    ratingSection.classList.remove("spring-rating", "summer-rating");
    if (ratingSection.parentNode !== winterView) winterView.appendChild(ratingSection);
  }
  function moveRatingSectionToSeason(viewNameForSeason) {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    var placeholderId = viewNameForSeason === "summer-rating" ? "summerRatingSectionPlaceholder" : "springRatingSectionPlaceholder";
    var placeholder = document.getElementById(placeholderId);
    if (!ratingSection || !placeholder) return;
    if (ratingSection.parentNode === winterView) winterView.removeChild(ratingSection);
    ratingSection.classList.add("spring-rating");
    ratingSection.classList.toggle("summer-rating", viewNameForSeason === "summer-rating");
    if (ratingSection.parentNode !== placeholder) placeholder.appendChild(ratingSection);
  }
  if (viewName === "winter-rating") {
    restoreSeasonalRatingSectionToWinter();
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
  }
  if (viewName === "spring-rating" || viewName === "summer-rating") {
    moveRatingSectionToSeason(viewName);
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
    if (typeof initSpringRatingViewScrollButton === "function") {
      initSpringRatingViewScrollButton();
      requestAnimationFrame(updateSpringRatingViewScrollButton);
    }
  }
  if (viewName === "profile") {
    try {
      pokerRememberTransportMemberIdFromEnvironment();
    } catch (eRememberEnvProfile) {}
    updateProfileUserName();
    updateProfileExitBtnVisibility();
    updateProfileDtId();
    try {
      if (typeof loadProfileDebugInfo === "function") loadProfileDebugInfo();
    } catch (eProfileDebugInit) {}
    try {
      if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
    } catch (eFrC) {}
    initProfileKeyboardViewportCleanup();
    initProfileTabs();
    initProfileP21Id();
    initProfilePokerPlus();
    initProfileEmailAuth();
    initProfilePersonal();
    if (typeof initProfilePlayerDetails === "function") initProfilePlayerDetails();
    initProfileAvatar();
    syncProfileStatusVisual();
    initProfileFishCollectionModal();
    if (typeof initProfilePointsInfoButton === "function") initProfilePointsInfoButton();
    loadProfileRespect();
    initProfileRespectVotersButton();
    initProfileFriends();
    initProfileExitBtn();
    initProfileChatPush();
  }
  if (viewName === "download" || viewName === "cashout") {
    try {
      if (typeof updateCashoutManager === "function") updateCashoutManager();
    } catch (eCashoutManagerView) {}
  }
  if (viewName === "cashout") {
    initCashoutDepositForm();
  }
  if (viewName === "streams") {
    initStreams();
    // После initStreams: и при первом полном init, и при раннем return (__streamsInitAttached)
    // нужно съесть __pendingStreamsRoomId (deep link из Telegram / ?startapp=streams_…).
    if (typeof consumePendingStreamsWatchRoom === "function") consumePendingStreamsWatchRoom();
  } else {
    if (typeof streamsCleanup === "function") streamsCleanup();
  }
  if (viewName === "bonus-game") {
    initBonusGame();
    if (typeof bonusPikhaninaInterval !== "undefined" && bonusPikhaninaInterval) clearInterval(bonusPikhaninaInterval);
    if (typeof updatePikhaninaStats === "function" && typeof updateBonusStats === "function") {
      bonusPikhaninaInterval = setInterval(function () {
        updatePikhaninaStats();
        updateBonusStats();
      }, 60000);
    }
  } else if (typeof bonusPikhaninaInterval !== "undefined" && bonusPikhaninaInterval) {
    clearInterval(bonusPikhaninaInterval);
    bonusPikhaninaInterval = null;
  }
  if (viewName === "daily-poker" && typeof initDailyPoker === "function") initDailyPoker();
  if (viewName === "admin-bonuses" && typeof initAdminBonuses === "function") initAdminBonuses();
  if (viewName === "cooler-game") initCoolerGame();
  if (viewName === "plasterer-game") initPlastererGame();
  if (viewName === "raffles") {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    if (pokerHasHydratedRafflesView() && typeof initRaffles === "function") {
      initRaffles();
    } else {
      pokerEnsureRafflesAfterShell();
    }
  }
  if (viewName === "equilator") initEquilator();
  if (viewName === "video-lessons") {
    initVideoLessons();
    if (window.__pendingVideoLessonsOpenReviews) {
      window.__pendingVideoLessonsOpenReviews = false;
      try {
        if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("deep:vl_reviews_nikolay", "");
      } catch (eVlDeep) {}
      var rafVlReviews = window.requestAnimationFrame || function (cb) {
        setTimeout(cb, 16);
      };
      rafVlReviews(function () {
        rafVlReviews(function () {
          var revOpenBtn = document.getElementById("videoLessonsReviewsOpenBtn");
          if (revOpenBtn && typeof revOpenBtn.click === "function") revOpenBtn.click();
        });
      });
    }
  }
  if (viewName === "poker-tasks") {
    if (typeof window.pokerInitHomeTasks === "function") window.pokerInitHomeTasks();
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var streakScreen = document.getElementById("pokerStreakScreen");
    var resultScreen = document.getElementById("pokerStreakResultScreen");
    var pokerTasksView = document.querySelector('[data-view="poker-tasks"]');
    if (startScreen) startScreen.style.display = "";
    if (streakScreen) {
      streakScreen.classList.add("poker-streak-screen--hidden");
      streakScreen.style.display = "none";
    }
    if (resultScreen) {
      resultScreen.classList.add("poker-streak-result-screen--hidden");
      resultScreen.style.display = "none";
    }
    if (pokerTasksView) pokerTasksView.classList.remove("poker-tasks--task-visible");
    if (typeof window.refreshMttStats === "function") window.refreshMttStats();
    initClubTasksPlanner();
  }
  var headerGreeting = document.getElementById("headerGreeting");
  var headerSwitcherWrap = document.getElementById("headerChatSwitcherWrap");
  var greetingWrap = headerGreeting && headerGreeting.closest(".header-greeting-wrap");
  if (greetingWrap) greetingWrap.classList.toggle("header-greeting--hidden", viewName === "chat");
  if (headerSwitcherWrap) headerSwitcherWrap.classList.toggle("header-chat-switcher--hidden", viewName !== "chat");
  if (viewName === "chat") {
    document.documentElement.classList.add("app-view-chat");
    document.documentElement.classList.remove("app-view-winter-rating", "app-view-home");
    if (typeof updateChatNavDot === "function") updateChatNavDot();
    if (window.chatListenersAttached && typeof window.chatRefresh === "function") {
      window.chatRefresh();
    } else if (typeof initChat === "function") {
      initChat();
    }
    try {
      if (
        !window.__pendingOpenClubChatGeneral &&
        !window.__pendingOpenChatPersonalFromDeepLink &&
        !pokerShouldSkipAutoShowChatDialogs("setView-enter") &&
        typeof window.chatShowDialogs === "function"
      ) {
        setTimeout(function () {
          try {
            if (
              document.body &&
              document.body.getAttribute("data-view") === "chat" &&
              !window.__pendingOpenClubChatGeneral &&
              !window.__pendingOpenChatPersonalFromDeepLink &&
              !pokerShouldSkipAutoShowChatDialogs("setView-enter-later") &&
              typeof window.chatShowDialogs === "function"
            ) {
              window.chatShowDialogs();
            }
          } catch (eChatShowDialogsLater) {}
        }, 0);
      }
    } catch (eChatShowDialogsEnter) {}
    try {
      [0, 250, 900].forEach(function (delay) {
        setTimeout(function () {
          try {
            var contacts = document.getElementById("chatContacts");
            if (!contacts || !contacts.querySelector || !contacts.querySelector(".chat-empty--skeleton")) return;
            if (typeof window.__pokerKickChatContactsLoad === "function") {
              window.__pokerKickChatContactsLoad({ forceRerender: true });
            } else if (typeof window.__pokerReloadChatContacts === "function") {
              window.__pokerReloadChatContacts({ forceRerender: true });
            } else if (!pokerShouldSkipAutoShowChatDialogs("contacts-kick:" + delay) && typeof window.chatShowDialogs === "function") {
              window.chatShowDialogs();
            }
          } catch (eChatContactsKick) {}
        }, delay);
      });
    } catch (eChatContactsKickSetup) {}
    try {
      pokerTryConsumePendingManagerFromCashout();
    } catch (eCashoutMgr) {}
    try {
      if (window.__pokerPushNeedsFullChatBootstrap) {
        pokerPushOpenStateDebug("setView-chat-full-bootstrap", "");
        window.__pokerPushNeedsFullChatBootstrap = false;
        try {
          window.__pokerContactsMetaPollRev = null;
          window.__pokerGeneralPollRev = "";
          window.__pokerPersonalPollRev = "";
        } catch (eChatBootstrapRevReset) {}
        setTimeout(function () {
          try {
            if (typeof loadContacts === "function") loadContacts();
          } catch (eChatBootstrapContacts) {}
          try {
            if (typeof loadGeneral === "function") loadGeneral();
          } catch (eChatBootstrapGeneral) {}
          try {
            if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
              window.__pokerScheduleChatBootstrapFetch();
            }
          } catch (eChatBootstrapFetch) {}
        }, 0);
      }
    } catch (eChatBootstrapWrap) {}
    try {
      if (window.__pendingOpenChatPersonalFromDeepLink) {
        var pendingAfterChatRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var pendingAfterChatPeer =
          pendingAfterChatRefresh && pendingAfterChatRefresh.userId != null
            ? String(pendingAfterChatRefresh.userId).trim()
            : "";
        if (pendingAfterChatPeer) {
          setTimeout(function () {
            try {
              pokerPushOpenStateDebug("setView-chat-post-refresh-open", pendingAfterChatPeer);
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenResolvedChatPeer === "function" &&
                pokerOpenResolvedChatPeer(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                window.__pendingOpenChatPersonalFromDeepLink = null;
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
                pokerOpenPendingPushDmWithoutContacts(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                pokerSchedulePendingPushDmContactsReload(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                );
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function"
              ) {
                if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
                  window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
                }
              }
            } catch (eChatPostRefreshOpen) {}
          }, 0);
        }
      }
    } catch (eChatPostRefreshWrap) {}
  } else if (viewName === "winter-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-spring-rating", "app-view-summer-rating");
    document.documentElement.classList.add("app-view-winter-rating");
  } else if (viewName === "spring-rating" || viewName === "summer-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-winter-rating", "app-view-spring-rating", "app-view-summer-rating");
    document.documentElement.classList.add(viewName === "summer-rating" ? "app-view-summer-rating" : "app-view-spring-rating");
  } else if (viewName === "home") {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating", "app-view-summer-rating");
    document.documentElement.classList.add("app-view-home");
    restoreSeasonalRatingSectionToWinter();
  } else {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating", "app-view-summer-rating", "app-view-home");
    restoreSeasonalRatingSectionToWinter();
  }
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* Длинные экраны без :has() в CSS — часть WebView Telegram не крутит страницу; главную/дашборд сюда не включать. */
  var longScroll =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScroll);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScroll);
  /* Видеоуроки: внутренний scrollport в .card__content (как профиль); класс app-view-video-lessons-html-scroll — см. styles.css */
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  /* Зал славы: класс на html — внутренний scrollport в .card__content (как «Скачать»); раньше был scroll на <html>. */
  document.documentElement.classList.toggle("app-view-hall-html-scroll", viewName === "hall-of-fame");
  /* Скачать: scrollport в .card__content (локальный Chrome + TG); класс на html — цепочка высот/overflow */
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  /* Главная, депозит, рейтинг весны, профиль, видеоуроки: тот же внутренний scrollport в .card__content, что и у «Скачать». */
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-summer-rating-html-scroll", viewName === "summer-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  document.documentElement.classList.toggle("app-view-equilator-html-scroll", viewName === "equilator");
  document.documentElement.classList.toggle("app-view-daily-poker-html-scroll", viewName === "daily-poker");
  document.documentElement.classList.toggle("app-view-admin-bonuses-html-scroll", viewName === "admin-bonuses");
  document.documentElement.classList.toggle("app-view-player-crm-html-scroll", viewName === "player-crm");
  var appEl = document.getElementById("app");
  if (appEl) appEl.classList.toggle("app--view-home", viewName === "home");
  try {
    if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
  } catch (eTgClear) {}
  if (viewName === "hall-of-fame") {
    var hallSection = window.__pendingHallFameSection || "top2026";
    window.__pendingHallFameSection = "";
    var rafHall = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    rafHall(function () {
      rafHall(function () {
        if (typeof showHallOfFamePanel === "function") showHallOfFamePanel(hallSection);
      });
    });
  }
  if (viewName === "player-crm") {
    try {
      pokerForcePlayerCrmVisible();
      pokerSchedulePlayerCrmViewportSync();
      var rafCrm = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafCrm(function () {
        pokerForcePlayerCrmVisible();
        if (typeof window.pokerInitPlayerCrm === "function") window.pokerInitPlayerCrm();
        else if (typeof window.pokerSyncPlayerCrmViewportShell === "function") window.pokerSyncPlayerCrmViewportShell();
      });
      setTimeout(function () {
        pokerForcePlayerCrmVisible();
        if (typeof window.pokerInitPlayerCrm === "function") window.pokerInitPlayerCrm();
        else if (typeof window.pokerSyncPlayerCrmViewportShell === "function") window.pokerSyncPlayerCrmViewportShell();
      }, 260);
      setTimeout(pokerForcePlayerCrmVisible, 700);
      setTimeout(pokerForcePlayerCrmVisible, 1400);
    } catch (eCrmViewInit) {}
  }
  if (viewName === "download" && navOpts.downloadPage && typeof setDownloadPage === "function") {
    setDownloadPage(navOpts.downloadPage);
  }
  try {
    if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("view:" + (viewName || "unknown"), "");
  } catch (eTrackView) {}
  if (viewName && viewName !== prevView) {
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen(viewName);
      if (typeof window.pokerAdminRefreshSectionViewsDebounced === "function") window.pokerAdminRefreshSectionViewsDebounced();
    } catch (eSecView) {}
  }
  /* С верха при обычной навигации; по «Назад» — восстанавливаем сохранённый Y (после смены классов на html/body). */
  if (viewName !== prevView) {
    var rafScroll = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    if (restoreScrollOnEnter && Object.prototype.hasOwnProperty.call(viewScrollMemory, viewName)) {
      var yBack = viewScrollMemory[viewName];
      var restoreScheduledAt = Date.now();
      var restoreMainScrollIfStillIdle = function () {
        try {
          if (
            typeof window.pokerGetLastMainScrollUserIntentAt === "function" &&
            window.pokerGetLastMainScrollUserIntentAt() >= restoreScheduledAt
          ) {
            return;
          }
        } catch (eRestoreIntent) {}
        setMainDocumentScrollY(yBack);
      };
      rafScroll(function () {
        restoreMainScrollIfStillIdle();
        rafScroll(function () {
          restoreMainScrollIfStillIdle();
        });
      });
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 0);
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 50);
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 120);
    } else {
      scrollMainDocumentToTop({ force: true });
      /* Чат: только синхронный сброс — повторный rAF доводил окно и давал «вверх—вниз» в первые сотни мс вместе с лентой. */
      if (viewName !== "chat" && viewName !== "home" && viewName !== "profile") {
        rafScroll(function () {
          if (typeof window.pokerScheduleScrollMainDocumentToTop === "function") {
            window.pokerScheduleScrollMainDocumentToTop(0);
            return;
          }
          scrollMainDocumentToTop();
        });
        if (typeof window.pokerScheduleScrollMainDocumentToTop === "function") {
          window.pokerScheduleScrollMainDocumentToTop(0);
          window.pokerScheduleScrollMainDocumentToTop(50);
        } else {
          setTimeout(scrollMainDocumentToTop, 0);
          setTimeout(scrollMainDocumentToTop, 50);
        }
      }
    }
  }
  try {
    pokerApplyBottomTabbarPad();
    if (viewName === "home") {
      var rafBtp = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafBtp(function () {
        rafBtp(function () {
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        });
      });
      setTimeout(function () {
        if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
      }, 150);
    }
  } catch (eBtpSetView) {}
}


navItems.forEach(function (item) {
  item.addEventListener("click", function (e) {
    var target = item.dataset.viewTarget;
    if (target) {
      if (target === "player-crm" && typeof pokerOpenPlayerCrmFromHome === "function") {
        e.preventDefault();
        e.stopImmediatePropagation();
        pokerOpenPlayerCrmFromHome();
        return;
      }
      var downloadPage = target === "download" ? item.getAttribute("data-download-page") || item.getAttribute("data-download-page-target") || "main" : "";
      if (downloadPage) setView(target, { downloadPage: downloadPage });
      else setView(target);
      if (target === "download" && typeof setDownloadPage === "function") setDownloadPage("main");
      if (downloadPage && downloadPage !== "main" && typeof setDownloadPage === "function") setDownloadPage(downloadPage);
    }
  });
});

function pokerFinalizeChatFromTabOpen() {
  [0, 80, 240, 700, 1400, 2400].forEach(function (delay) {
    setTimeout(function () {
      try {
        if (typeof initChat === "function" && !window.chatListenersAttached) initChat();
      } catch (eInitChatTab) {}
      try {
        if (
          document.body &&
          document.body.getAttribute("data-view") === "chat" &&
          !window.__pendingOpenClubChatGeneral &&
          !window.__pendingOpenChatPersonalFromDeepLink &&
          !pokerShouldSkipAutoShowChatDialogs("tab-finalize:" + delay) &&
          typeof window.chatShowDialogs === "function"
        ) {
          window.chatShowDialogs();
        }
      } catch (eShowChatTab) {}
      try {
        var contacts = document.getElementById("chatContacts");
        var clubPreview = document.getElementById("chatDialogClubPreview");
        var contactsStuck = !!(contacts && contacts.querySelector && contacts.querySelector(".chat-empty--skeleton"));
        var clubPreviewStuck = !!(clubPreview && clubPreview.classList && clubPreview.classList.contains("chat-dialog-item__preview--skeleton"));
        if (!contactsStuck && !clubPreviewStuck) return;
        if (typeof window.__pokerKickChatContactsLoad === "function") {
          window.__pokerKickChatContactsLoad({ forceRerender: true });
        } else if (typeof window.__pokerReloadChatContacts === "function") {
          window.__pokerReloadChatContacts({ forceRerender: true });
        }
      } catch (eKickChatContactsTab) {}
    }, delay);
  });
}

function pokerShouldSkipAutoShowChatDialogs(label) {
  try {
    var intentAt = Number(window.__pokerChatDialogOpenIntentAt || 0);
    var intentFresh = !!(intentAt && Date.now() - intentAt < 5000);
    var conv = document.getElementById("chatConvView");
    var personal = document.getElementById("chatPersonalView");
    var general = document.getElementById("chatGeneralView");
    var convVisible = !!(conv && !conv.classList.contains("chat-conv-view--hidden"));
    var personalVisible = !!(personal && !personal.classList.contains("chat-personal-view--hidden"));
    var generalVisible = !!(
      general &&
      !general.classList.contains("chat-general-view--hidden") &&
      general.style.display !== "none"
    );
    var chromeOpen = !!(
      document.body &&
      document.body.classList &&
      document.body.classList.contains("chat-conversation-open")
    );
    var skip = !!(intentFresh || convVisible || personalVisible || generalVisible || chromeOpen);
    if (skip && typeof pokerPushOpenStateDebug === "function") {
      pokerPushOpenStateDebug("auto-show-dialogs-skipped", String(label || ""));
    }
    return skip;
  } catch (eAutoShowGuard) {
    return false;
  }
}

function pokerOpenChatFromTab() {
  if (window.__pokerChatTabOpenInFlight) return;
  window.__pokerChatTabOpenInFlight = true;
  setTimeout(function () {
    window.__pokerChatTabOpenInFlight = false;
  }, 900);
  function activateChatNow() {
    try {
      setView("chat", { htmlReady: true });
    } catch (eSetChatImmediate) {
      try { setView("chat"); } catch (eSetChatFallback) {}
    }
    pokerFinalizeChatFromTabOpen();
  }
  try {
    var htmlReady = typeof window.pokerEnsureViewHtml === "function"
      ? window.pokerEnsureViewHtml("chat")
      : false;
    if (htmlReady && typeof htmlReady.then === "function") {
      htmlReady.then(activateChatNow).catch(function () {
        setView("chat");
        pokerFinalizeChatFromTabOpen();
      });
      return;
    }
  } catch (eChatHtml) {}
  activateChatNow();
}

function pokerWarmPlayerCrmScripts() {
  try {
    return typeof window.pokerEnsureViewScripts === "function"
      ? window.pokerEnsureViewScripts("player-crm")
      : false;
  } catch (eCrmWarm) {
    return false;
  }
}

function pokerWarmPlayerCrmHtml() {
  try {
    return typeof window.pokerEnsureViewHtml === "function"
      ? window.pokerEnsureViewHtml("player-crm")
      : false;
  } catch (eCrmHtmlWarm) {
    return false;
  }
}

var playerCrmOpenInFlight = false;
var playerCrmOpenToken = 0;

function pokerFinalizePlayerCrmDirectOpen() {
  pokerApplyPlayerCrmStandaloneLayout();
  pokerRenderPlayerCrmOpeningFallback();
  pokerBindPlayerCrmShellTabs();
  pokerSchedulePlayerCrmViewportSync();
  try {
    if (typeof window.pokerInitPlayerCrm === "function") {
      var initResult = window.pokerInitPlayerCrm();
      if (initResult && typeof initResult.catch === "function") {
        initResult.catch(function (err) {
          pokerRenderPlayerCrmOpenError("Дашборд открыт, но модуль данных не стартовал. Обнови приложение и открой дашборд ещё раз.");
          if (typeof console !== "undefined" && console.warn) console.warn("player CRM init", err);
        });
      }
    } else if (typeof window.pokerSyncPlayerCrmViewportShell === "function") {
      window.pokerSyncPlayerCrmViewportShell();
    }
  } catch (eCrmFinalize) {}
}

function pokerContinuePlayerCrmScriptsOpen(openToken) {
  if (openToken !== playerCrmOpenToken || !window.__pokerPlayerCrmStandaloneOpen) return;
  var scriptsReady = pokerWarmPlayerCrmScripts();
  if (typeof window.pokerInitPlayerCrm === "function") {
    pokerFinalizePlayerCrmDirectOpen();
    return;
  }
  if (scriptsReady && typeof scriptsReady.then === "function") {
    scriptsReady.then(function () {
      [0, 40, 160, 420].forEach(function (delay) {
        setTimeout(function () {
          if (openToken !== playerCrmOpenToken || !window.__pokerPlayerCrmStandaloneOpen) return;
          pokerFinalizePlayerCrmDirectOpen();
        }, delay);
      });
    }).catch(function (err) {
      if (openToken !== playerCrmOpenToken) return;
      playerCrmOpenInFlight = false;
      pokerRenderPlayerCrmOpenError("Дашборд открыт, но скрипты данных не загрузились. Обнови раздел через несколько секунд.");
      if (typeof console !== "undefined" && console.warn) console.warn("player CRM warm open", err);
    });
    return;
  }
  [180, 520, 1100, 2200, 4200].forEach(function (delay, idx) {
    setTimeout(function () {
      if (openToken !== playerCrmOpenToken || !window.__pokerPlayerCrmStandaloneOpen) return;
      if (typeof window.pokerInitPlayerCrm === "function") {
        pokerFinalizePlayerCrmDirectOpen();
        return;
      }
      var retryReady = pokerWarmPlayerCrmScripts();
      if (retryReady && typeof retryReady.then === "function") {
        retryReady.then(function () {
          if (openToken === playerCrmOpenToken && window.__pokerPlayerCrmStandaloneOpen) pokerFinalizePlayerCrmDirectOpen();
        }).catch(function (err) {
          if (idx === 4) pokerRenderPlayerCrmOpenError("Дашборд открыт, но скрипты данных не загрузились. Обнови раздел через несколько секунд.");
          if (typeof console !== "undefined" && console.warn) console.warn("player CRM warm retry", err);
        });
        return;
      }
      if (idx === 4 && typeof window.pokerInitPlayerCrm !== "function") {
        pokerRenderPlayerCrmOpenError("Дашборд открылся, но модуль данных не стартовал. Обнови приложение и открой дашборд ещё раз.");
      }
    }, delay);
  });
}

function pokerContinuePlayerCrmWarmOpen(openToken) {
  if (openToken !== playerCrmOpenToken || !window.__pokerPlayerCrmStandaloneOpen) return;
  var htmlReady = pokerWarmPlayerCrmHtml();
  if (htmlReady && typeof htmlReady.then === "function") {
    htmlReady.then(function () {
      if (openToken !== playerCrmOpenToken || !window.__pokerPlayerCrmStandaloneOpen) return;
      pokerFinalizePlayerCrmDirectOpen();
      pokerContinuePlayerCrmScriptsOpen(openToken);
    }).catch(function (err) {
      if (openToken !== playerCrmOpenToken) return;
      playerCrmOpenInFlight = false;
      pokerRenderPlayerCrmOpenError("Дашборд открыт, но разметка не загрузилась. Обнови раздел через несколько секунд.");
      if (typeof console !== "undefined" && console.warn) console.warn("player CRM html warm open", err);
    });
    return;
  }
  pokerFinalizePlayerCrmDirectOpen();
  pokerContinuePlayerCrmScriptsOpen(openToken);
}

function pokerOpenPlayerCrmFromHome() {
  if (playerCrmOpenInFlight && window.__pokerPlayerCrmStandaloneOpen) {
    pokerFinalizePlayerCrmDirectOpen();
    return;
  }
  playerCrmOpenInFlight = true;
  playerCrmOpenToken += 1;
  var openToken = playerCrmOpenToken;
  setTimeout(function () {
    playerCrmOpenInFlight = false;
  }, 450);

  function activateCrmNow() {
    try {
      var active = document.querySelector('.view.view--active[data-view]:not([data-view="player-crm"])');
      if (!active && typeof setView === "function") setView("home", { htmlReady: true, scriptsReady: true });
    } catch (eSetCrmImmediate) {}
    pokerFinalizePlayerCrmDirectOpen();
  }

  activateCrmNow();
  setTimeout(function () {
    pokerContinuePlayerCrmWarmOpen(openToken);
  }, 0);
}

(function bindPlayerCrmFastOpen() {
  function closeHeaderMenuForCrmButton(btn) {
    var menu = btn && btn.closest ? btn.closest(".header-more-menu") : null;
    if (!menu) return;
    menu.hidden = true;
    var toggle = document.getElementById("headerMoreMenuBtn");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    }
  }
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-crm-open="player-crm"]'));
  var legacyBtn = document.getElementById("adminCrmBtn");
  if (legacyBtn && buttons.indexOf(legacyBtn) < 0) buttons.push(legacyBtn);
  buttons.forEach(function (btn) {
    if (!btn || btn.__pokerPlayerCrmFastOpenBound) return;
    btn.__pokerPlayerCrmFastOpenBound = true;
    btn.addEventListener("touchend", function (e) {
      if (btn.disabled || btn.hidden || btn.getAttribute("aria-hidden") === "true") return;
      if (window.__touchWasScroll && window.__touchWasScroll()) return;
      e.preventDefault();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      else e.stopPropagation();
      closeHeaderMenuForCrmButton(btn);
      pokerOpenPlayerCrmFromHome();
    }, { passive: false });
    btn.addEventListener("click", function (e) {
      if (btn.disabled || btn.hidden || btn.getAttribute("aria-hidden") === "true") return;
      e.preventDefault();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      else e.stopPropagation();
      closeHeaderMenuForCrmButton(btn);
      pokerOpenPlayerCrmFromHome();
    });
  });
})();

(function bindPlayerCrmStandaloneClose() {
  function handle(e) {
    var close = e.target && e.target.closest ? e.target.closest('[data-crm-close="player-crm"]') : null;
    if (!close) return;
    e.preventDefault();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    else e.stopPropagation();
    pokerClosePlayerCrmStandalone();
  }
  document.addEventListener("click", handle, true);
  document.addEventListener("touchend", function (e) {
    if (window.__touchWasScroll && window.__touchWasScroll()) return;
    handle(e);
  }, { passive: false, capture: true });
})();

(function bindChatTabFastOpen() {
  var btn = document.getElementById("chatNavBtn");
  if (!btn || btn.__pokerFastOpenBound) return;
  btn.__pokerFastOpenBound = true;
  btn.addEventListener("pointerdown", function () {
    pokerOpenChatFromTab();
  }, { passive: true });
  btn.addEventListener("touchend", function (e) {
    e.preventDefault();
    e.stopPropagation();
    pokerOpenChatFromTab();
  }, { passive: false });
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    pokerOpenChatFromTab();
  });
})();

(function bindGlobalClickSound() {
  if (window.__pokerClickSoundGlobalBound) return;
  var lastPointerSoundAt = 0;

  function clickSoundTarget(e) {
    if (!e || !e.target || !e.target.closest) return null;
    var interactive = e.target.closest("button, a[href], .feature--link, .home-mini-icon-item, .hero__link, .bottom-nav__item, [data-view-target], .feature, [role=\"button\"], [role=\"menuitem\"], [data-menu-item]");
    if (!interactive || e.target.closest("audio") || interactive.getAttribute("aria-hidden") === "true") return null;
    if (interactive.disabled || interactive.getAttribute("disabled") != null) return null;
    return interactive;
  }

  function playBundledClickSound() {
    if (typeof playClickSound === "function") {
      playClickSound();
      return;
    }
    var audio = document.__pokerClickAudio;
    if (!audio) {
      audio = document.__pokerClickAudio = new Audio("./assets/gta-sa-menu.mp3?v=2026070602");
      audio.preload = "auto";
      audio.volume = 0.78;
      try {
        audio.load();
      } catch (errLoad) {}
    }
    audio.pause();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  }

  document.addEventListener("pointerdown", function (e) {
    if (!clickSoundTarget(e)) return;
    lastPointerSoundAt = Date.now();
    try {
      playBundledClickSound();
    } catch (ePointerSound) {}
  }, true);

  document.addEventListener("click", function (e) {
    if (!clickSoundTarget(e) || Date.now() - lastPointerSoundAt < 420) return;
    try {
      playBundledClickSound();
    } catch (eClickSound) {}
  }, true);
})();

(function scrollVsTap() {
  var touchStartX = 0;
  var touchStartY = 0;
  var touchMoved = false;
  var scrollThreshold = 12;
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length && !touchMoved) {
      var dx = e.touches[0].clientX - touchStartX;
      var dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dx) > scrollThreshold || Math.abs(dy) > scrollThreshold) touchMoved = true;
    }
  }, { passive: true });
  window.__touchWasScroll = function () { return touchMoved; };
  document.addEventListener("touchend", function () {
    setTimeout(function () { touchMoved = false; }, 0);
  }, { passive: true });
})();

var viewHandledInTouchend = false;

function pokerEventPointInsideElement(e, el) {
  if (!e || !el || !el.getBoundingClientRect) return true;
  var touch = null;
  try {
    if (e.changedTouches && e.changedTouches.length) touch = e.changedTouches[0];
    else if (e.touches && e.touches.length) touch = e.touches[0];
  } catch (eTouchPoint) {}
  if (!touch || touch.clientX == null || touch.clientY == null) return true;
  try {
    var rect = el.getBoundingClientRect();
    var pad = 6;
    return (
      touch.clientX >= rect.left - pad &&
      touch.clientX <= rect.right + pad &&
      touch.clientY >= rect.top - pad &&
      touch.clientY <= rect.bottom + pad
    );
  } catch (eRect) {
    return true;
  }
}

document.addEventListener("touchend", function (e) {
  if (!e.target || !e.target.closest) return;
  if (window.__touchWasScroll && window.__touchWasScroll()) return;
  var backBtn = e.target.closest(".bonus-game-back[data-view-target]");
  if (backBtn) {
    if (!pokerEventPointInsideElement(e, backBtn)) return;
    e.preventDefault();
    e.stopPropagation();
    viewHandledInTouchend = true;
    var target = backBtn.getAttribute("data-view-target");
    var currentView = document.body && document.body.getAttribute ? document.body.getAttribute("data-view") : "";
    if (target) setView(target, currentView === "equilator" && target === "home" ? undefined : { fromBack: true });
    return;
  }
  if (e.target.closest("[data-download-back]")) {
    e.preventDefault();
    e.stopPropagation();
    viewHandledInTouchend = true;
    setDownloadPage("main");
  }
}, { passive: false });

/** Клик по UI голоса в чате: <audio class="chat-msg__voice"> (в т.ч. кнопка play внутри UA shadow) или обёртка .chat-msg__voice-wrap. */
function pokerEventPathHasChatVoiceUi(e) {
  try {
    if (e && e.target && e.target.closest) {
      if (e.target.closest(".chat-msg__voice-wrap")) return true;
      if (e.target.closest("audio.chat-msg__voice")) return true;
    }
  } catch (e0) {}
  try {
    var path = typeof e.composedPath === "function" ? e.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var n = path[i];
      if (!n || !n.nodeName) continue;
      if (n.nodeName === "AUDIO" && n.classList && n.classList.contains("chat-msg__voice")) return true;
      if (n.classList && n.classList.contains("chat-msg__voice-wrap")) return true;
    }
  } catch (e1) {}
  return false;
}

function handleViewLinkClick(e) {
  if (e.target && e.target.closest && e.target.closest("#chatDialogsView")) return;
  if (pokerEventPathHasChatVoiceUi(e)) return;
  var hallTop15Link = e.target.closest("a[data-hall-top15]");
  if (hallTop15Link) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
  if (viewHandledInTouchend) {
    viewHandledInTouchend = false;
    e.preventDefault();
    return;
  }
  var hallSubEarly = e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (hallSubEarly) {
    e.preventDefault();
    e.stopPropagation();
    var secEarly = hallSubEarly.getAttribute("data-hall-section");
    if (secEarly && typeof showHallOfFamePanel === "function") {
      showHallOfFamePanel(secEarly, { activeSubtabBtn: hallSubEarly });
    }
    return;
  }
  var spring2024Btn = e.target.closest("#springRating2024InfoBtn");
  if (spring2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRating2024Modal();
    return;
  }
  var summer2024Btn = e.target.closest("#summerRating2024InfoBtn");
  if (summer2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2024Modal();
    return;
  }
  var summer2025Btn = e.target.closest("#summerRating2025InfoBtn");
  if (summer2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2025Modal();
    return;
  }
  var autumn2025Btn = e.target.closest("#autumnRating2025InfoBtn");
  if (autumn2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openAutumnRating2025Modal();
    return;
  }
  var springBtn = e.target.closest("#springRatingInfoBtn");
  if (springBtn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRatingInfoModal();
    return;
  }
  var backBtn = e.target.closest(".bonus-game-back[data-view-target]");
  if (backBtn) {
    e.preventDefault();
    e.stopPropagation();
    var target = backBtn.getAttribute("data-view-target");
    var currentView = document.body && document.body.getAttribute ? document.body.getAttribute("data-view") : "";
    if (target) setView(target, currentView === "equilator" && target === "home" ? undefined : { fromBack: true });
    return;
  }
  var link = e.target.closest("a[data-view-target]");
  if (!link || link.getAttribute("data-download-page")) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  if (view) setView(view);
}

document.addEventListener("click", handleViewLinkClick);

/* Зал славы: mousedown по подвкладке без preventDefault даёт фокус кнопке → WebKit скроллит к табам. */
document.addEventListener("mousedown", function (e) {
  var sub = e.target && e.target.closest && e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (!sub || e.button !== 0) return;
  e.preventDefault();
}, true);

document.addEventListener("touchend", function (e) {
  var top15 = e.target.closest("a[data-hall-top15]");
  if (top15) {
    if (window.__touchWasScroll && window.__touchWasScroll()) return;
    e.preventDefault();
    viewHandledInTouchend = true;
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
}, { passive: false });

document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-view-target][data-download-page], [data-view-target][data-download-page-target]");
  if (!link) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  var page = link.getAttribute("data-download-page") || link.getAttribute("data-download-page-target");
  if (view) setView(view, page ? { downloadPage: page } : undefined);
  if (page && typeof setDownloadPage === "function") setDownloadPage(page);
});

document.addEventListener("click", function (e) {
  var downloadCopyBtn = e.target.closest("[data-download-ref-copy]");
  if (downloadCopyBtn) {
    e.preventDefault();
    e.stopPropagation();
    pokerCopyDownloadReferralLink(downloadCopyBtn.getAttribute("data-download-ref-copy"), downloadCopyBtn);
    return;
  }
  var downloadShareBtn = e.target.closest("[data-download-ref-share]");
  if (downloadShareBtn) {
    e.preventDefault();
    e.stopPropagation();
    pokerShareDownloadReferralLink(downloadShareBtn.getAttribute("data-download-ref-share"));
    return;
  }
  var appBtn = e.target.closest("[data-download-app]");
  if (appBtn) {
    var app = appBtn.dataset.downloadApp;
    if (app) setDownloadPage(app);
    return;
  }
  if (e.target.closest("[data-download-back]")) setDownloadPage("main");
});
