// Progressive HTML hydration for view sections. Lightweight skeletons are
// built immediately; complete sections are hydrated in the background.
(function () {
  var loading = Object.create(null);
  var nestedFragmentLoading = Object.create(null);
  var adminReportShellScriptPromises = Object.create(null);
  var adminReportSentShellModule = null;
  var adminReportRakebackShellModule = null;
  var FRAGMENT_CACHE_PREFIX = "poker_html_fragment_v10:";
  var FRAGMENT_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
  var INLINE_GLOBAL_MODAL_IDS = [
    "partnershipModal"
  ];
  var ADMIN_GLOBAL_MODAL_IDS = [
    "visitorsAdminModal",
    "visitorsBroadcastModal",
    "adminPushBroadcastModal",
    "adminChatPushAllModal",
    "adminAuthDebugModal",
    "shareStatsAdminModal",
    "trackingLinksAdminModal",
    "trackingLinksVisitorsModal",
    "adminReportModal",
    "broadcastReportsModal",
  ];

  var VIEW_SKELETON_TITLES = {
    "winter-rating": "Рейтинг",
    "chat": "Чаты",
    "download": "Скачать",
    "bonus-game": "Бонусная игра",
    "cooler-game": "Кулер",
    "plasterer-game": "Штукатур",
    "raffles": "Розыгрыши",
    "poker-tasks": "Задания клуба",
    "video-lessons": "Видеоуроки",
    "hall-of-fame": "Зал славы",
    "cashout": "Депозит",
    "transfers": "Переводы",
    "profile": "Профиль",
    "admin-bonuses": "Бонусы",
    "player-crm": "Игроки",
    "schedule": "Расписание",
    "streams": "Трансляции",
    "equilator": "Эквилятор",
    "learn-play-hub": "Обучение",
  };

  function skeletonMarkup(viewName, overlay) {
    var title = VIEW_SKELETON_TITLES[String(viewName || "")] || "Раздел";
    return (
      '<div class="poker-section-skeleton' + (overlay ? ' poker-section-skeleton--overlay' : '') + '" data-poker-fragment-skeleton aria-hidden="true">' +
        '<div class="poker-section-skeleton__head">' +
          '<span class="poker-section-skeleton__icon"></span>' +
          '<span class="poker-section-skeleton__title">' + title + '</span>' +
        '</div>' +
        '<span class="poker-section-skeleton__line poker-section-skeleton__line--wide"></span>' +
        '<span class="poker-section-skeleton__line poker-section-skeleton__line--short"></span>' +
        '<div class="poker-section-skeleton__cards">' +
          '<span class="poker-section-skeleton__card"></span>' +
          '<span class="poker-section-skeleton__card"></span>' +
          '<span class="poker-section-skeleton__card"></span>' +
        '</div>' +
      '</div>'
    );
  }

  function ensureViewSkeleton(viewName, overlay) {
    var view = String(viewName || "").trim();
    var host = document.querySelector('[data-view="' + view.replace(/"/g, '\\"') + '"]');
    if (!host || host.querySelector("[data-poker-fragment-skeleton]")) return host;
    host.insertAdjacentHTML("afterbegin", skeletonMarkup(viewName, !!overlay));
    host.setAttribute("aria-busy", "true");
    return host;
  }

  function buildInitialViewSkeletons() {
    Array.prototype.slice.call(document.querySelectorAll("[data-html-fragment-view]")).forEach(function (host) {
      ensureViewSkeleton(host.getAttribute("data-html-fragment-view") || host.getAttribute("data-view") || "", false);
    });
  }

  buildInitialViewSkeletons();
  window.pokerEnsureViewLoadingSkeleton = function (viewName) {
    return ensureViewSkeleton(viewName, true);
  };
  window.pokerClearViewLoadingSkeleton = function (viewName) {
    var view = String(viewName || "").trim();
    var host = document.querySelector('[data-view="' + view.replace(/"/g, '\\"') + '"]');
    if (!host) return;
    Array.prototype.slice.call(host.querySelectorAll("[data-poker-fragment-skeleton]")).forEach(function (node) {
      if (node.parentNode) node.parentNode.removeChild(node);
    });
    host.removeAttribute("aria-busy");
  };

  function findFragmentHost(viewName) {
    var view = String(viewName || "").trim();
    if (!view) return null;
    return document.querySelector('[data-view="' + view.replace(/"/g, '\\"') + '"][data-html-fragment]');
  }

  function readCachedFragmentText(src) {
    try {
      if (typeof sessionStorage === "undefined") return "";
      var raw = sessionStorage.getItem(FRAGMENT_CACHE_PREFIX + src);
      if (!raw) return "";
      var entry = JSON.parse(raw);
      if (!entry || typeof entry.html !== "string") return "";
      if (Date.now() - Number(entry.ts || 0) > FRAGMENT_CACHE_TTL_MS) return "";
      return entry.html;
    } catch (eFragmentCacheRead) {
      return "";
    }
  }

  function writeCachedFragmentText(src, html) {
    try {
      if (typeof sessionStorage === "undefined" || typeof html !== "string" || !html) return;
      sessionStorage.setItem(FRAGMENT_CACHE_PREFIX + src, JSON.stringify({ ts: Date.now(), html: html }));
    } catch (eFragmentCacheWrite) {}
  }

  function fetchFragmentText(src, label) {
    var cached = readCachedFragmentText(src);
    if (cached) return Promise.resolve(cached);
    return fetch(src, { cache: "reload" })
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + label + " " + src + ": " + res.status);
        return res.text();
      })
      .then(function (html) {
        writeCachedFragmentText(src, html);
        return html;
      });
  }

  function runFragmentHooks(viewName) {
    function safeCall(fn) {
      try {
        if (typeof fn === "function") fn();
      } catch (eHook) {}
    }
    function runHomeGlobalModalInit() {
      if (window.__pokerHomeGlobalModalsReinitDone || typeof window.runGazetteAndTasksInit !== "function") return;
      var attempts = Number(window.__pokerHomeGlobalModalsReinitAttempts || 0);
      try {
        window.runGazetteAndTasksInit();
        if ((document.getElementById("gazetteOpenBtn") || document.querySelector("[data-gazette-open]")) && typeof window.openGazette !== "function") {
          throw new Error("gazette init pending");
        }
        window.__pokerHomeGlobalModalsReinitDone = true;
      } catch (eGazetteInit) {
        window.__pokerHomeGlobalModalsReinitAttempts = attempts + 1;
        if (attempts < 5) {
          setTimeout(function () {
            runHomeGlobalModalInit();
          }, 120);
        }
      }
    }
    if (viewName === "video-lessons") safeCall(window.pokerInitVideoLessonsModals);
    if (viewName === "download") {
      safeCall(window.pokerUpdateDownloadInfoSubsections);
      safeCall(window.pokerInitDownloadRefActions);
    }
    if (viewName === "schedule") safeCall(window.updateTournamentDayBlock);
    if (viewName === "winter-rating") safeCall(window.pokerInitWinterRatingWeekTops);
    if (viewName === "raffles") safeCall(window.pokerInitRafflesHeroShare);
    if (viewName === "transfers") safeCall(window.pokerInitTransfers);
    if (viewName === "hall-of-fame") {
      safeCall(window.pokerInitHallOfFamePanelShareButtons);
      safeCall(window.pokerInitHallFishRatingModal);
      safeCall(window.pokerPrefetchHallFishRatingData);
      safeCall(window.pokerInitWinterRatingWeekTops);
    }
    if (viewName === "player-crm") safeCall(window.pokerInitPlayerCrm);
    if (viewName === "global-modals") {
      runHomeGlobalModalInit();
      safeCall(window.pokerInitAdminReportModal);
      safeCall(window.pokerInitBroadcastReportsModal);
      safeCall(window.pokerInitVisitorsAdminUi);
      safeCall(window.pokerInitShareStatsAdminModal);
      safeCall(window.pokerInitTrackingLinksAdminModal);
      safeCall(window.pokerInitAuthDebugModal);
      safeCall(window.pokerInitRomanGazetteTaskPlanner);
      safeCall(window.pokerInitDailyPredictionModal);
      safeCall(window.pokerInitImageLightbox);
      safeCall(window.initWinterRatingLightbox);
      safeCall(window.initWinterRatingPlayerModal);
      safeCall(window.pokerInitWinterRatingWeekTops);
      safeCall(window.pokerInitPartnershipModal);
      safeCall(window.initHomeFreerollModal);
      safeCall(window.__pokerInitSiteHomeInstructionModal);
      safeCall(window.pokerEnsureChatUserModalReady);
    }
  }

  function hydrateHost(host, html, viewName) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var next = wrap.querySelector('[data-view="' + String(viewName || "").replace(/"/g, '\\"') + '"]');
    if (!next) throw new Error("Fragment has no view: " + viewName);
    next.removeAttribute("data-html-fragment");
    next.removeAttribute("data-html-fragment-view");
    var keepLoadingSkeleton = !!(
      host.classList &&
      host.classList.contains("view--active") &&
      document.body &&
      document.body.classList.contains("poker-view-section-loading")
    );
    if (keepLoadingSkeleton) {
      next.insertAdjacentHTML("afterbegin", skeletonMarkup(viewName, true));
      next.setAttribute("aria-busy", "true");
    } else {
      next.removeAttribute("aria-busy");
    }
    host.parentNode.replaceChild(next, host);
    runFragmentHooks(viewName);
    return next;
  }

  function fetchNestedFragment(src) {
    if (!nestedFragmentLoading[src]) {
      nestedFragmentLoading[src] = fetchFragmentText(src, "nested HTML fragment");
    }
    return nestedFragmentLoading[src];
  }

  function replaceGlobalModalFragmentHost(host, html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var parent = host.parentNode;
    if (!parent) return;
    while (wrap.firstChild) parent.insertBefore(wrap.firstChild, host);
    parent.removeChild(host);
  }

  function isAdminGlobalModalFragment(src) {
    return /(?:^|\/)global-modals-admin\.html(?:[?#].*)?$/.test(String(src || ""));
  }

  function hasAnyAdminGlobalModal() {
    return ADMIN_GLOBAL_MODAL_IDS.some(function (id) {
      return !!document.getElementById(id);
    });
  }

  function removeExistingAdminGlobalModals(root) {
    if (!root) return;
    ADMIN_GLOBAL_MODAL_IDS.forEach(function (id) {
      if (!document.getElementById(id)) return;
      var node = root.querySelector ? root.querySelector("#" + id) : null;
      if (node && node.parentNode) node.parentNode.removeChild(node);
    });
  }

  function removeExistingInlineGlobalModals(root) {
    if (!root) return;
    INLINE_GLOBAL_MODAL_IDS.forEach(function (id) {
      if (!document.getElementById(id)) return;
      var node = root.querySelector ? root.querySelector("#" + id) : null;
      if (node && node.parentNode) node.parentNode.removeChild(node);
    });
  }

  function hydrateGlobalModalSubfragments(root) {
    var hosts = Array.prototype.slice.call(root.querySelectorAll("[data-global-modal-fragment]"));
    if (!hosts.length) return Promise.resolve(root);
    return Promise.all(hosts.map(function (host) {
      var src = String(host.getAttribute("data-global-modal-fragment") || "").trim();
      if (!src) return true;
      if (isAdminGlobalModalFragment(src) && hasAnyAdminGlobalModal()) {
        if (host.parentNode) host.parentNode.removeChild(host);
        return true;
      }
      return fetchNestedFragment(src).then(function (html) {
        replaceGlobalModalFragmentHost(host, html);
        return true;
      });
    })).then(function () {
      return hydrateGlobalModalSubfragments(root);
    });
  }

  window.pokerEnsureViewHtml = function (viewName) {
    var host = findFragmentHost(viewName);
    if (!host) return false;
    var src = String(host.getAttribute("data-html-fragment") || "").trim();
    if (!src) return false;
    if (loading[src]) return loading[src];
    loading[src] = fetchFragmentText(src, "HTML fragment")
      .then(function (html) {
        var currentHost = findFragmentHost(viewName);
        if (!currentHost) return true;
        hydrateHost(currentHost, html, viewName);
        return true;
      })
      .catch(function (err) {
        delete loading[src];
        throw err;
      });
    return loading[src];
  };

  window.pokerEnsureGlobalModalsHtml = function () {
    var host = document.getElementById("globalModalsFragmentHost");
    if (!host) {
      runFragmentHooks("global-modals");
      return Promise.resolve(true);
    }
    var src = String(host.getAttribute("data-html-fragment") || "").trim();
    if (!src) return Promise.resolve(false);
    if (loading[src]) return loading[src];
    loading[src] = fetchFragmentText(src, "HTML fragment")
      .then(function (html) {
        var currentHost = document.getElementById("globalModalsFragmentHost");
        if (!currentHost) return true;
        var wrap = document.createElement("div");
        wrap.innerHTML = html;
        return hydrateGlobalModalSubfragments(wrap).then(function () {
          removeExistingAdminGlobalModals(wrap);
          removeExistingInlineGlobalModals(wrap);
          var nodes = [];
          while (wrap.firstChild) nodes.push(wrap.removeChild(wrap.firstChild));
          nodes.forEach(function (node) {
            currentHost.parentNode.insertBefore(node, currentHost);
          });
          currentHost.parentNode.removeChild(currentHost);
          runFragmentHooks("global-modals");
          return true;
        });
      });
    return loading[src];
  };

  window.pokerEnsureAdminReportModalHtml = function () {
    if (document.getElementById("adminReportModal")) {
      runFragmentHooks("global-modals");
      return Promise.resolve(true);
    }
    var host = document.getElementById("globalModalsFragmentHost");
    if (!host) return window.pokerEnsureGlobalModalsHtml();
    var src = "./html-fragments/global-modals-admin.html?v=3.865";
    if (!loading[src]) {
      loading[src] = fetchFragmentText(src, "admin modal HTML fragment")
        .then(function (html) {
          if (document.getElementById("adminReportModal")) return true;
          var currentHost = document.getElementById("globalModalsFragmentHost");
          var parent = currentHost ? currentHost.parentNode : document.body;
          if (!parent) return false;
          var wrap = document.createElement("div");
          wrap.innerHTML = html;
          while (wrap.firstChild) parent.insertBefore(wrap.firstChild, currentHost || null);
          runFragmentHooks("global-modals");
          return true;
        });
    }
    return loading[src];
  };

  (function pokerEagerHydrateGlobalModals() {
    if (window.__pokerAllowEagerGlobalModals !== true) return;
    function run() {
      try {
        if (document.getElementById("globalModalsFragmentHost")) {
          window.pokerEnsureGlobalModalsHtml();
        } else {
          runFragmentHooks("global-modals");
        }
      } catch (eEagerGlobalModals) {}
    }
    function schedule() {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(run, { timeout: 2600 });
      } else {
        setTimeout(run, 900);
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
      schedule();
    }
  })();

  (function pokerProgressivelyHydrateViews() {
    var primaryStructureQueue = [
      { view: "profile" },
      { view: "summer-rating", html: "winter-rating" },
      { view: "chat" },
      { view: "download" },
      { view: "raffles" },
      { view: "schedule" },
      { view: "hall-of-fame" },
      { view: "daily-poker" },
    ];
    var secondaryStructureQueue = [
      { view: "learn-play-hub" },
      { view: "bonus-game" },
      { view: "cooler-game" },
      { view: "plasterer-game" },
      { view: "poker-tasks" },
      { view: "video-lessons" },
      { view: "cashout" },
      { view: "transfers" },
      { view: "equilator" },
      { view: "streams" },
      { view: "spring-rating", html: "winter-rating" },
      { view: "winter-rating", html: "winter-rating" },
    ];
    var mainScriptQueue = [
      { view: "profile" },
      { view: "summer-rating", html: "winter-rating" },
      { view: "chat" },
    ];
    var fastConnectionScriptQueue = [
      { view: "raffles" },
      { view: "schedule" },
      { view: "hall-of-fame" },
      { view: "daily-poker" },
      { view: "poker-tasks" },
    ];
    var adminQueue = [
      { view: "admin-bonuses" },
      { view: "player-crm" },
    ];
    var started = false;
    var adminStarted = false;

    function connectionTier() {
      try {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!connection) return "standard";
        if (connection.saveData) return "constrained";
        var effectiveType = String(connection.effectiveType || "").toLowerCase();
        if (/(^|-)2g$/.test(effectiveType)) return "constrained";
        if (effectiveType === "3g") return "moderate";
        if (effectiveType === "4g") return "fast";
      } catch (eConnection) {}
      return "standard";
    }

    function schedule(fn, timeout) {
      function runWhenVisible() {
        if (!document.hidden) {
          fn();
          return;
        }
        document.addEventListener("visibilitychange", function onVisible() {
          if (document.hidden) return;
          document.removeEventListener("visibilitychange", onVisible);
          fn();
        });
      }
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(runWhenVisible, { timeout: timeout || 900 });
      } else {
        setTimeout(runWhenVisible, Math.min(timeout || 900, 180));
      }
    }

    function hydrateStructure(entry) {
      var jobs = [];
      try {
        var htmlReady = window.pokerEnsureViewHtml(entry.html || entry.view);
        if (htmlReady && typeof htmlReady.then === "function") jobs.push(htmlReady);
      } catch (eViewHtml) {}
      try {
        var stylesReady = typeof window.pokerEnsureViewStyles === "function"
          ? window.pokerEnsureViewStyles(entry.view)
          : false;
        if (stylesReady && typeof stylesReady.then === "function") jobs.push(stylesReady);
      } catch (eViewStyles) {}
      return Promise.all(jobs).then(function () { return true; });
    }

    function hydrateScripts(entry) {
      var ready = false;
      try {
        ready = typeof window.pokerEnsureViewScripts === "function"
          ? window.pokerEnsureViewScripts(entry.view)
          : false;
      } catch (eViewScripts) {}
      return Promise.resolve(ready).then(function () { return true; });
    }

    function runQueue(entries, worker, maxParallel) {
      var queue = entries.slice();
      var active = 0;
      return new Promise(function (resolve) {
        function pump() {
          if (!queue.length && active === 0) {
            resolve(true);
            return;
          }
          while (active < maxParallel && queue.length) {
            var entry = queue.shift();
            active += 1;
            Promise.resolve(worker(entry)).catch(function () {
              return false;
            }).then(function () {
              active -= 1;
              schedule(pump, 700);
            });
          }
        }
        pump();
      });
    }

    function hasAdminAccess() {
      try {
        var auth = window.__pokerTelegramAuth || null;
        if (auth && auth.adminAccess === true) return true;
      } catch (eAuth) {}
      try {
        var record = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (record && record.adminAccess === true) return true;
      } catch (eRecord) {}
      return false;
    }

    function maybePreloadAdminViews() {
      if (adminStarted || !hasAdminAccess()) return;
      adminStarted = true;
      schedule(function () {
        runQueue(adminQueue, hydrateStructure, 1).then(function () {
          return runQueue(adminQueue, hydrateScripts, 1);
        });
      }, 2200);
    }

    function startPublicQueues() {
      var tier = connectionTier();
      var structureParallel = tier === "fast" ? 2 : 1;
      runQueue(primaryStructureQueue, hydrateStructure, structureParallel).then(function () {
        if (tier !== "constrained") {
          schedule(function () {
            var scripts = tier === "fast"
              ? mainScriptQueue.concat(fastConnectionScriptQueue)
              : (tier === "moderate" ? mainScriptQueue.slice(0, 2) : mainScriptQueue);
            runQueue(scripts, hydrateScripts, 1);
          }, tier === "fast" ? 700 : 1400);
        }
        if (tier !== "constrained") {
          schedule(function () {
            runQueue(secondaryStructureQueue, hydrateStructure, 1);
          }, tier === "fast" ? 1100 : 2200);
        }
        maybePreloadAdminViews();
      });
      if (tier === "constrained") {
        maybePreloadAdminViews();
      }
    }

    function start() {
      if (started) return;
      started = true;
      schedule(startPublicQueues, 900);
    }
    window.addEventListener("poker-admin-access", maybePreloadAdminViews);
    window.addEventListener("poker-telegram-auth", maybePreloadAdminViews);
    setTimeout(maybePreloadAdminViews, 4200);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
      start();
    }
  })();

  (function pokerIdleWarmCommonImages() {
    if (window.__pokerAllowIdleWarmCommonImages !== true) return;
    var assets = [
      "./assets/chat-profile-achievement-top-win.webp",
      "./assets/chat-profile-achievement-top-win-2026.webp",
      "./assets/chat-profile-achievement-offline-win.webp",
      "./assets/chat-profile-achievement-cup.webp",
      "./assets/chat-profile-achievement-top10.webp",
      "./assets/chat-profile-achievement-legend.webp",
      "./assets/chat-profile-achievement-cup-winter.webp",
      "./assets/chat-profile-achievement-cup-spring.webp",
      "./assets/chat-profile-achievement-cup-summer.webp",
      "./assets/chat-profile-achievement-sng-champion-card.webp",
      "./assets/chat-profile-default-hero-male.webp",
      "./assets/chat-profile-default-hero-female.webp"
    ];
    function warm() {
      assets.forEach(function (src) {
        try {
          var img = new Image();
          img.decoding = "async";
          img.loading = "eager";
          img.src = src;
          if (img.decode) img.decode().catch(function () {});
        } catch (eWarmImage) {}
      });
    }
    function schedule() {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(warm, { timeout: 3200 });
      } else {
        setTimeout(warm, 1800);
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
      schedule();
    }
  })();

  function findGlobalModalClickTarget(from) {
    return from && from.closest
      ? from.closest("[data-gazette-open],#gazetteOpenBtn,#clubCharterOpenBtn,#headerClubWelcomeBtn,#homeWelcomeTitleBtn,#dailyPredictionBtn,#siteHomeInstructionBtn,#vpnProxyOpenBtn,#adminVisitorsBtn,#visitorsAdminBroadcastBtn,#adminPushToAdminsBtn,#adminPushToAllChatSubsBtn,#adminAuthDebugBtn,#adminShareStatsBtn,#adminTrackingLinksBtn,#adminReportBtn,#adminBroadcastReportsBtn,#romanTaskPlannerOpenBtn,#partnershipOpenBtn,.hall-photo-album__btn,.hall-shame-board__thumb-btn,.video-lessons__mtt-grid,.video-lessons__coach-student-gallery,.video-lessons__coach-reviews-grid,a.chat-msg__document-link--view,button[data-chat-pdf-download],button[data-chat-pdf-share],[data-open-image-lightbox],[data-open-pdf-viewer]")
      : null;
  }

  function isAdminReportButtonTarget(target) {
    return !!(target && target.closest && target.closest("#adminReportBtn"));
  }

  function isAdminBroadcastReportsButtonTarget(target) {
    return !!(target && target.closest && target.closest("#adminBroadcastReportsBtn"));
  }

  function getAdminReportShellUsers() {
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        users.push(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } catch (eTg) {}
    try {
      var auth = window.__pokerTelegramAuth || null;
      if (auth) users.push(auth);
      if (auth && auth.user) users.push(auth.user);
    } catch (eAuth) {}
    try {
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec) users.push(rec);
      if (rec && rec.user) users.push(rec.user);
    } catch (eRec) {}
    return users;
  }

  function adminReportShellIdentityMatches(users, idsList, usernamesList, emailsList) {
    var idsAllowed = Array.isArray(idsList) ? idsList : [];
    var usernamesAllowed = Array.isArray(usernamesList) ? usernamesList : [];
    var emailsAllowed = Array.isArray(emailsList) ? emailsList : [];
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var ids = [u.id, u.memberId, u.telegramId, u.telegram_id, u.uid, u.userId, u.user_id];
      for (var j = 0; j < ids.length; j++) {
        var rawId = ids[j] != null ? String(ids[j]).replace(/^tg_/, "").trim() : "";
        if (idsAllowed.indexOf(rawId) >= 0) return true;
      }
      var names = [u.username, u.telegramUsername, u.pwaUsername];
      for (var k = 0; k < names.length; k++) {
        var username = names[k] != null ? String(names[k]).replace(/^@+/, "").trim().toLowerCase() : "";
        if (usernamesAllowed.indexOf(username) >= 0) return true;
      }
      var emails = [u.email, u.pwaEmail, u.mail];
      for (var m = 0; m < emails.length; m++) {
        var email = emails[m] != null ? String(emails[m]).trim().toLowerCase() : "";
        if (emailsAllowed.indexOf(email) >= 0) return true;
      }
    }
    return false;
  }

  function canViewAdminReportSentShell() {
    try {
      var auth = window.__pokerTelegramAuth || null;
      if (auth && (auth.adminAccess === true || auth.adminReportAccess === true)) return true;
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && (rec.adminAccess === true || rec.adminReportAccess === true)) return true;
    } catch (eAuth) {}
    return adminReportShellIdentityMatches(
      getAdminReportShellUsers(),
      ["388008256", "2144406710", "1897001087"],
      ["roman1787443", "roman1_matvienko"],
      ["matvienkoro92@gmail.com"]
    );
  }

  function canViewAdminReportCalculationsShell() {
    return adminReportShellIdentityMatches(
      getAdminReportShellUsers(),
      ["388008256", "2144406710"],
      ["roman1787443", "roman1_matvienko"],
      ["matvienkoro92@gmail.com"]
    );
  }

  function shouldOpenAdminReportRakebackByDefault() {
    return adminReportShellIdentityMatches(
      getAdminReportShellUsers(),
      ["1897001087", "388008256"],
      [],
      []
    );
  }

  function canPermanentlyDeleteAdminReportRakebackRows() {
    return adminReportShellIdentityMatches(
      getAdminReportShellUsers(),
      ["1897001087"],
      [],
      []
    );
  }

  function setAdminReportShellTab(name) {
    var modal = document.getElementById("adminReportModal");
    if (!modal) return "form";
    var sentAllowed = canViewAdminReportSentShell();
    var calculationsAllowed = canViewAdminReportCalculationsShell();
    var activeName = String(name || "form");
    if (activeName === "sent" && !sentAllowed) activeName = "form";
    if (activeName === "calculations" && !calculationsAllowed) activeName = "form";
    Array.prototype.slice.call(modal.querySelectorAll(".admin-report-tab")).forEach(function (tab) {
      var tabName = tab.getAttribute("data-admin-report-tab") || "form";
      if (tabName === "sent") tab.hidden = !sentAllowed;
      if (tabName === "calculations") tab.hidden = !calculationsAllowed;
      var selected = tabName === activeName;
      tab.classList.toggle("admin-report-tab--active", selected);
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    });
    Array.prototype.slice.call(modal.querySelectorAll(".admin-report-panel")).forEach(function (panel) {
      var panelName = panel.getAttribute("data-admin-report-panel") || "form";
      if (panelName === "sent") panel.hidden = !sentAllowed;
      else if (panelName === "calculations") panel.hidden = !calculationsAllowed;
      else panel.hidden = false;
      panel.classList.toggle("admin-report-panel--active", panelName === activeName);
    });
    return activeName;
  }

  function syncAdminReportShellAccess() {
    var modal = document.getElementById("adminReportModal");
    if (!modal) return false;
    var sentAllowed = canViewAdminReportSentShell();
    var calculationsAllowed = canViewAdminReportCalculationsShell();
    Array.prototype.slice.call(modal.querySelectorAll(".admin-report-tab")).forEach(function (tab) {
      var tabName = tab.getAttribute("data-admin-report-tab") || "";
      if (tabName === "sent") tab.hidden = !sentAllowed;
      if (tabName === "calculations") tab.hidden = !calculationsAllowed;
    });
    Array.prototype.slice.call(modal.querySelectorAll(".admin-report-panel")).forEach(function (panel) {
      var panelName = panel.getAttribute("data-admin-report-panel") || "";
      if (panelName === "sent") panel.hidden = !sentAllowed;
      if (panelName === "calculations") panel.hidden = !calculationsAllowed;
    });
    var activePanel = modal.querySelector(".admin-report-panel--active");
    var activeName = activePanel ? activePanel.getAttribute("data-admin-report-panel") : "form";
    if ((activeName === "sent" && !sentAllowed) || (activeName === "calculations" && !calculationsAllowed)) {
      setAdminReportShellTab("form");
    }
    return sentAllowed || calculationsAllowed;
  }

  function getAdminReportShellAssetVersion() {
    return document.documentElement ? String(document.documentElement.getAttribute("data-app-version") || "").trim() : "";
  }

  function loadAdminReportShellScript(file) {
    file = String(file || "").trim();
    if (!file) return Promise.resolve(false);
    if (file === "app-admin-reports-sent.js" && window.AdminReportSentTab && typeof window.AdminReportSentTab.init === "function") {
      return Promise.resolve(true);
    }
    if (adminReportShellScriptPromises[file]) return adminReportShellScriptPromises[file];
    adminReportShellScriptPromises[file] = new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-admin-report-module="' + file + '"]');
      if (existing && existing.getAttribute("data-admin-report-loaded") === "1") {
        resolve(true);
        return;
      }
      if (existing) {
        existing.addEventListener("load", function () { resolve(true); }, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      var script = document.createElement("script");
      var version = getAdminReportShellAssetVersion();
      script.src = "./" + file + (version ? "?v=" + encodeURIComponent(version) : "");
      script.async = true;
      if (/^app-admin-reports-rakeback(?:-data)?\.js$/.test(file)) {
        try { script.fetchPriority = "high"; } catch (eFetchPriority) {}
      }
      script.dataset.adminReportModule = file;
      script.onload = function () {
        script.setAttribute("data-admin-report-loaded", "1");
        resolve(true);
      };
      script.onerror = function () {
        delete adminReportShellScriptPromises[file];
        reject(new Error("Failed to load script " + file));
      };
      (document.head || document.documentElement).appendChild(script);
    });
    return adminReportShellScriptPromises[file];
  }

  function buildAdminReportSentShellLoadingHtml() {
    return (
      '<div class="admin-report-sent-current admin-report-sent-current--loading">' +
        '<details class="admin-report-sent-week" open>' +
          '<summary class="admin-report-sent-archive__summary">Текущая неделя</summary>' +
          '<div class="admin-report-sent-week__inner">' +
            '<details class="admin-report-sent-week-subspoiler" open>' +
              '<summary class="admin-report-sent-day-title">Итого по неделе</summary>' +
              '<div class="admin-report-sent-week-subspoiler__inner">' +
                '<p class="admin-report-sent-period-hint">Обновляю текущую неделю…</p>' +
              "</div>" +
            "</details>" +
            '<details class="admin-report-sent-week-subspoiler">' +
              '<summary class="admin-report-sent-day-title">По дням</summary>' +
              '<div class="admin-report-sent-week-subspoiler__inner">' +
                '<p class="admin-report-sent-period-hint">Дни появятся сразу после ответа сервера.</p>' +
              "</div>" +
            "</details>" +
          "</div>" +
        "</details>" +
      "</div>" +
      '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
        '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
        '<div class="admin-report-sent-archive__inner">' +
          '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
        "</div>" +
      "</details>"
    );
  }

  function openAdminReportSentShell(forceRefresh) {
    var sentList = document.getElementById("adminReportSentList");
    if (!sentList) return Promise.resolve(false);
    if (!canViewAdminReportSentShell()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Нет доступа к отправленным отчётам.</p>';
      return Promise.resolve(false);
    }
    var existingModule = adminReportSentShellModule || null;
    if (existingModule && typeof existingModule.open === "function") {
      return Promise.resolve(existingModule.open(forceRefresh));
    }
    sentList.innerHTML = buildAdminReportSentShellLoadingHtml();
    return loadAdminReportShellScript("app-admin-reports-sent.js")
      .then(function () {
        if (!window.AdminReportSentTab || typeof window.AdminReportSentTab.init !== "function") {
          throw new Error("AdminReportSentTab is not available");
        }
        if (!adminReportSentShellModule) {
          adminReportSentShellModule = window.AdminReportSentTab.init({
            list: sentList,
            cacheTtlMs: 5 * 60 * 1000,
            netErrorMessage: window.POKER_NET_ERR || "Ошибка сети",
            callbacks: {
              canView: canViewAdminReportSentShell,
              editReport: function () {},
              syncAccess: syncAdminReportShellAccess,
            },
          });
        }
        return adminReportSentShellModule.open(forceRefresh);
      })
      .catch(function () {
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
        return false;
      });
  }

  function prewarmAdminReportSentShell() {
    if (!canViewAdminReportSentShell()) return;
    var sentList = document.getElementById("adminReportSentList");
    if (!sentList || String(sentList.innerHTML || "").trim()) return;
    openAdminReportSentShell(false).catch(function () {});
  }

  function getAdminReportRakebackShellTemplates() {
    var staticData = window.AdminReportRakebackStaticData || {};
    var templates = staticData.templates || {};
    return {
      P21: templates.P21 || [],
      X: templates.X || [],
      Supr: templates.Supr || [],
      PP: templates.PP || [],
    };
  }

  function hasAdminReportRakebackShellTemplates() {
    var templates = getAdminReportRakebackShellTemplates();
    return !!(templates.P21.length || templates.X.length || templates.Supr.length || templates.PP.length);
  }

  function loadAdminReportRakebackShellTemplates() {
    return loadAdminReportShellScript("app-admin-reports-rakeback-data.js")
      .then(function () {
        return getAdminReportRakebackShellTemplates();
      });
  }

  function getAdminReportRakebackShellActiveRoom() {
    var activeTab = document.querySelector(".admin-report-rakeback-room-tab--active[data-rakeback-room-tab], .admin-report-rakeback-room-tab[aria-selected='true'][data-rakeback-room-tab]");
    return activeTab ? activeTab.getAttribute("data-rakeback-room-tab") : "P21";
  }

  function buildAdminReportRakebackShellPlaceholderHtml(open) {
    return (
      '<tr class="admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates" data-rakeback-generated="1" data-rakeback-shell-placeholder="1">' +
        '<td colspan="7">' +
          '<button type="button" class="admin-report-rakeback-template-toggle" data-rakeback-template-toggle data-rakeback-shell-placeholder-toggle aria-expanded="' + (open ? "true" : "false") + '" aria-label="' + (open ? "Скрыть пустые записи недели" : "Показать пустые записи недели") + '" title="' + (open ? "Скрыть шаблоны" : "Показать шаблоны") + '">' +
            "<span>Пустые записи недели</span>" +
          "</button>" +
        "</td>" +
      "</tr>"
    );
  }

  function renderAdminReportRakebackShellPlaceholder(open) {
    var body = document.getElementById("adminReportRakebackTableBody");
    if (!body) return false;
    body.innerHTML = buildAdminReportRakebackShellPlaceholderHtml(open);
    return true;
  }

  function bindAdminReportRakebackShellPlaceholder() {
    var body = document.getElementById("adminReportRakebackTableBody");
    if (!body || body.dataset.rakebackShellPlaceholderBound === "1") return;
    body.dataset.rakebackShellPlaceholderBound = "1";
    body.addEventListener("click", function (event) {
      var toggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-shell-placeholder-toggle]") : null;
      if (!toggle || !body.contains(toggle)) return;
      event.preventDefault();
      event.stopPropagation();
      window.__adminReportRakebackTemplateOpenRequested = true;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Скрыть пустые записи недели");
      toggle.setAttribute("title", "Скрыть шаблоны");
      var statusEl = document.getElementById("adminReportRakebackStatus");
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = "Загружаю шаблоны…";
      }
      openAdminReportRakebackShell().catch(function () {});
    });
  }

  function initAdminReportRakebackShellModule() {
    if (adminReportRakebackShellModule && typeof adminReportRakebackShellModule.open === "function") {
      return adminReportRakebackShellModule;
    }
    if (window.__adminReportRakebackShellModule && typeof window.__adminReportRakebackShellModule.open === "function") {
      adminReportRakebackShellModule = window.__adminReportRakebackShellModule;
      return adminReportRakebackShellModule;
    }
    if (!window.AdminReportRakebackTab || typeof window.AdminReportRakebackTab.init !== "function") {
      throw new Error("AdminReportRakebackTab is not available");
    }
    var modal = document.getElementById("adminReportModal");
    var archiveBtn = document.getElementById("adminReportRakebackArchiveBtn");
    adminReportRakebackShellModule = window.AdminReportRakebackTab.init({
      modal: modal,
      body: document.getElementById("adminReportRakebackTableBody"),
      addBtn: document.getElementById("adminReportRakebackAddBtn"),
      archiveBtn: archiveBtn,
      refreshBtn: document.getElementById("adminReportRakebackRefreshBtn"),
      roomTabs: modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : [],
      searchInput: document.getElementById("adminReportRakebackSearch"),
      sortSelect: document.getElementById("adminReportRakebackSort"),
      totalEl: document.getElementById("adminReportRakebackTotal"),
      roomTotalLabelEl: document.getElementById("adminReportRakebackRoomTotalLabel"),
      roomTotalEl: document.getElementById("adminReportRakebackRoomTotal"),
      statusEl: document.getElementById("adminReportRakebackStatus"),
      summaryEl: modal ? modal.querySelector(".admin-report-rakeback-summary") : null,
      templates: getAdminReportRakebackShellTemplates(),
      templatesLoaded: hasAdminReportRakebackShellTemplates(),
      templatesMayExist: true,
      loadTemplates: loadAdminReportRakebackShellTemplates,
      canPermanentlyDelete: canPermanentlyDeleteAdminReportRakebackRows,
      templatesOpen: window.__adminReportRakebackTemplateOpenRequested === true,
      activeRoom: getAdminReportRakebackShellActiveRoom(),
    });
    window.__adminReportRakebackShellModule = adminReportRakebackShellModule;
    if (archiveBtn) {
      archiveBtn.onclick = function () {
        var nextArchiveMode = !(adminReportRakebackShellModule &&
          typeof adminReportRakebackShellModule.isArchiveMode === "function" &&
          adminReportRakebackShellModule.isArchiveMode());
        adminReportRakebackShellModule.setArchiveMode(nextArchiveMode);
      };
    }
    return adminReportRakebackShellModule;
  }

  function openAdminReportRakebackShell() {
    var body = document.getElementById("adminReportRakebackTableBody");
    var statusEl = document.getElementById("adminReportRakebackStatus");
    var openRequested = window.__adminReportRakebackTemplateOpenRequested === true;
    if (statusEl && !adminReportRakebackShellModule) {
      statusEl.hidden = !openRequested;
      statusEl.textContent = openRequested ? "Загружаю шаблоны…" : "";
    }
    if (body && !adminReportRakebackShellModule) {
      renderAdminReportRakebackShellPlaceholder(openRequested);
      bindAdminReportRakebackShellPlaceholder();
    }
    loadAdminReportRakebackShellTemplates().catch(function () {});
    return loadAdminReportShellScript("app-admin-reports-rakeback.js").then(function () {
      var module = initAdminReportRakebackShellModule();
      if (window.__adminReportRakebackTemplateOpenRequested === true && module && typeof module.setTemplateRowsOpen === "function") {
        module.setTemplateRowsOpen(true);
      }
      var count = module.open();
      if (statusEl && !/шаблон/i.test(String(statusEl.textContent || ""))) {
        statusEl.hidden = true;
        statusEl.textContent = "";
      }
      return count;
    }).catch(function () {
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = "Не удалось загрузить рейкбек.";
      } else if (body && !body.querySelector("[data-rakeback-row]")) {
        body.innerHTML = '<tr class="admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates" data-rakeback-generated="1"><td colspan="7">Не удалось загрузить рейкбек.</td></tr>';
      }
      return 0;
    });
  }
  window.pokerOpenAdminReportRakebackShell = openAdminReportRakebackShell;

  function closeAdminReportShellModal() {
    var modal = document.getElementById("adminReportModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
    if (document.documentElement) document.documentElement.classList.remove("admin-report-modal-open");
    if (document.body) {
      document.body.classList.remove("admin-report-modal-open");
      document.body.style.overflow = "";
    }
  }

  function bindAdminReportShellModal() {
    var modal = document.getElementById("adminReportModal");
    if (!modal || modal.dataset.adminReportShellBound === "1") return;
    modal.dataset.adminReportShellBound = "1";
    var closeBtn = document.getElementById("adminReportModalClose");
    var backdrop = document.getElementById("adminReportModalBackdrop");
    if (closeBtn) closeBtn.addEventListener("click", closeAdminReportShellModal);
    if (backdrop) backdrop.addEventListener("click", closeAdminReportShellModal);
    modal.addEventListener("click", function (e) {
      var tab = e.target && e.target.closest ? e.target.closest("[data-admin-report-tab]") : null;
      if (!tab || !modal.contains(tab)) return;
      var name = tab.getAttribute("data-admin-report-tab") || "form";
      var fullReportOpener = window.pokerOpenAdminReportModal;
      if (typeof fullReportOpener === "function" && name !== "rakeback") return;
      if (name === "sent" && !canViewAdminReportSentShell()) return;
      if (name === "calculations" && !canViewAdminReportCalculationsShell()) return;
      e.preventDefault();
      e.stopPropagation();
      var activeName = setAdminReportShellTab(name);
      if (activeName === "sent") openAdminReportSentShell(false).catch(function () {});
      if (activeName === "rakeback") openAdminReportRakebackShell().catch(function () {});
    });
  }

  function openAdminReportShellModal() {
    var modal = document.getElementById("adminReportModal");
    if (!modal) return false;
    bindAdminReportShellModal();
    syncAdminReportShellAccess();
    modal.setAttribute("aria-hidden", "false");
    if (document.documentElement) document.documentElement.classList.add("admin-report-modal-open");
    if (document.body) {
      document.body.classList.add("admin-report-modal-open");
      document.body.style.overflow = "hidden";
    }
    var initialTab = shouldOpenAdminReportRakebackByDefault() ? "rakeback" : "form";
    setAdminReportShellTab(initialTab);
    if (initialTab === "rakeback") openAdminReportRakebackShell().catch(function () {});
    return true;
  }

  function openAdminReportShellWhenReady() {
    if (document.getElementById("adminReportModal")) return Promise.resolve(openAdminReportShellModal());
    var ensureAdminHtml = typeof window.pokerEnsureAdminReportModalHtml === "function"
      ? window.pokerEnsureAdminReportModalHtml
      : window.pokerEnsureGlobalModalsHtml;
    if (typeof ensureAdminHtml !== "function") return Promise.resolve(false);
    return Promise.resolve(ensureAdminHtml())
      .then(function () {
        return openAdminReportShellModal();
      })
      .catch(function () {
        return false;
      });
  }

  function finishTargetPrewarm(target) {
    if (isAdminBroadcastReportsButtonTarget(target)) {
      return loadAdminReportShellScript("app-admin-broadcast-reports.js")
        .then(function () {
          try {
            if (typeof window.pokerInitBroadcastReportsModal === "function") {
              window.pokerInitBroadcastReportsModal();
            }
          } catch (eBroadcastInit) {}
          return true;
        })
        .catch(function () {
          return true;
        });
    }
    if (!isAdminReportButtonTarget(target)) return Promise.resolve(true);
    try {
      var adminReportInit = window["poker" + "InitAdminReportModal"];
      if (typeof adminReportInit === "function") {
        adminReportInit();
      }
    } catch (eAdminReportInit) {}
    return Promise.resolve(true);
  }

  function isAdminReportTargetReady(target) {
    return !!(
      target &&
      target.closest &&
      target.closest("#adminReportBtn") &&
      target.dataset &&
      target.dataset.adminReportBound === "1"
    );
  }

  function prewarmGlobalModalTarget(target) {
    if (!target) return Promise.resolve(false);
    if (target.__pokerGlobalModalPrewarmPromise) return target.__pokerGlobalModalPrewarmPromise;
    var hasGlobalModalsHost = !!document.getElementById("globalModalsFragmentHost");
    var needsLazyScripts = false;
    try {
      needsLazyScripts = typeof window.pokerHasGlobalModalScriptsForTarget === "function" && window.pokerHasGlobalModalScriptsForTarget(target);
    } catch (eModalScriptNeed) {}
    if (!hasGlobalModalsHost && !needsLazyScripts) return Promise.resolve(true);
    var ensureAdminHtml = isAdminReportButtonTarget(target) || isAdminBroadcastReportsButtonTarget(target)
      ? window.pokerEnsureAdminReportModalHtml
      : null;
    var htmlPromise = Promise.resolve(hasGlobalModalsHost
      ? (typeof ensureAdminHtml === "function" ? ensureAdminHtml() : window.pokerEnsureGlobalModalsHtml())
      : true);
    var scriptPromise = Promise.resolve(true);
    if (typeof window.pokerEnsureGlobalModalScriptsForTarget === "function") {
      scriptPromise = Promise.resolve(window.pokerEnsureGlobalModalScriptsForTarget(target));
    }
    target.__pokerGlobalModalPrewarmPromise = Promise.all([htmlPromise, scriptPromise])
      .then(function () { return finishTargetPrewarm(target); })
      .catch(function (err) {
        try {
          delete target.__pokerGlobalModalPrewarmPromise;
        } catch (eDeletePrewarm) {
          target.__pokerGlobalModalPrewarmPromise = null;
        }
        throw err;
      });
    return target.__pokerGlobalModalPrewarmPromise;
  }

  function openPrewarmedGlobalModalTarget(target, originalTarget) {
    if (isAdminReportButtonTarget(target)) {
      try {
        var openAdminReportModal = window.pokerOpenAdminReportModal;
        if (typeof openAdminReportModal === "function") {
          return !!openAdminReportModal();
        }
      } catch (eAdminReportDirectOpen) {}
      try {
        var adminReportEv = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
        adminReportEv.__pokerLazyRedispatched = true;
        target.dispatchEvent(adminReportEv);
        return true;
      } catch (eAdminReportClick) {}
    }
    try {
      if (originalTarget && originalTarget.dispatchEvent) {
        var ev = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
        ev.__pokerLazyRedispatched = true;
        originalTarget.dispatchEvent(ev);
      } else if (target && typeof target.click === "function") {
        target.click();
      }
    } catch (eClick) {}
    return false;
  }

  window.pokerPrewarmGlobalModalTarget = prewarmGlobalModalTarget;
  window.pokerPrewarmAdminReportModal = function () {
    return prewarmGlobalModalTarget(document.getElementById("adminReportBtn"));
  };

  function maybePrewarmFromEvent(e) {
    if (e && e.__pokerLazyRedispatched) return;
    var target = e && e.target ? findGlobalModalClickTarget(e.target) : null;
    if (!target) return;
    prewarmGlobalModalTarget(target).catch(function () {});
  }

  ["pointerover", "focusin", "touchstart"].forEach(function (eventName) {
    document.addEventListener(eventName, maybePrewarmFromEvent, { capture: true, passive: true });
  });

  (function prewarmDesktopAdminReport() {
    if (window.__pokerAllowEagerAdminReportPrewarm !== true) return;
    function run() {
      var btn = document.getElementById("adminReportBtn");
      if (!btn) return;
      var desktopish = false;
      try {
        desktopish = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
      } catch (eMq) {}
      if (!desktopish && window.innerWidth < 768) return;
      prewarmGlobalModalTarget(btn).catch(function () {});
    }
    function schedule() {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(run, { timeout: 450 });
      } else {
        setTimeout(run, 120);
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
      schedule();
    }
  })();

  document.addEventListener(
    "click",
    function (e) {
      if (e.__pokerLazyRedispatched) return;
      var target = e.target ? findGlobalModalClickTarget(e.target) : null;
      if (!target) return;
      if (isAdminReportTargetReady(target)) return;
      var hasGlobalModalsHost = !!document.getElementById("globalModalsFragmentHost");
      var needsLazyScripts = false;
      try {
        needsLazyScripts = typeof window.pokerHasGlobalModalScriptsForTarget === "function" && window.pokerHasGlobalModalScriptsForTarget(target);
      } catch (eModalScriptNeed) {}
      if (!hasGlobalModalsHost && !needsLazyScripts) return;
      var originalTarget = e.target;
      e.preventDefault();
      e.stopPropagation();
      var shellOpened = false;
      var adminReportShellPromise = isAdminReportButtonTarget(target)
        ? openAdminReportShellWhenReady().then(function (opened) {
          shellOpened = !!opened;
          return opened;
        })
        : Promise.resolve(false);
      adminReportShellPromise.catch(function () {});
      prewarmGlobalModalTarget(target).then(function () {
        if (isAdminReportButtonTarget(target) && shellOpened) {
          return;
        }
        openPrewarmedGlobalModalTarget(target, originalTarget);
      }).catch(function () {
        if (isAdminReportButtonTarget(target) && shellOpened) {
          return;
        }
      });
    },
    true
  );
})();
