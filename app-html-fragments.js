// Lazy HTML fragments for heavy views. Keeps first-load DOM light while
// preserving existing data-view routing.
(function () {
  var loading = Object.create(null);
  var nestedFragmentLoading = Object.create(null);

  function findFragmentHost(viewName) {
    var view = String(viewName || "").trim();
    if (!view) return null;
    return document.querySelector('[data-view="' + view.replace(/"/g, '\\"') + '"][data-html-fragment]');
  }

  function runFragmentHooks(viewName) {
    function safeCall(fn) {
      try {
        if (typeof fn === "function") fn();
      } catch (eHook) {}
    }
    if (viewName === "video-lessons") safeCall(window.pokerInitVideoLessonsModals);
    if (viewName === "download") safeCall(window.pokerUpdateDownloadInfoSubsections);
    if (viewName === "schedule") safeCall(window.updateTournamentDayBlock);
    if (viewName === "winter-rating") safeCall(window.pokerInitWinterRatingWeekTops);
    if (viewName === "hall-of-fame") {
      safeCall(window.pokerInitHallOfFamePanelShareButtons);
      safeCall(window.pokerInitHallFishRatingModal);
      safeCall(window.pokerInitWinterRatingWeekTops);
    }
    if (viewName === "player-crm") safeCall(window.pokerInitPlayerCrm);
    if (viewName === "global-modals") {
      if (!window.__pokerHomeGlobalModalsReinitDone && typeof window.runGazetteAndTasksInit === "function") {
        window.__pokerHomeGlobalModalsReinitDone = true;
        safeCall(window.runGazetteAndTasksInit);
      }
      safeCall(window.pokerInitAdminReportModal);
      safeCall(window.pokerInitBroadcastReportsModal);
      safeCall(window.pokerInitVisitorsAdminUi);
      safeCall(window.pokerInitShareStatsAdminModal);
      safeCall(window.pokerInitTrackingLinksAdminModal);
      safeCall(window.pokerInitAuthDebugModal);
      safeCall(window.pokerInitRomanGazetteTaskPlanner);
      safeCall(window.pokerInitDailyPredictionModal);
      safeCall(window.pokerInitImageLightbox);
      safeCall(window.pokerInitPartnershipModal);
      safeCall(window.initHomeFreerollModal);
      safeCall(window.__pokerInitSiteHomeInstructionModal);
    }
  }

  function hydrateHost(host, html, viewName) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var next = wrap.querySelector('[data-view="' + String(viewName || "").replace(/"/g, '\\"') + '"]');
    if (!next) throw new Error("Fragment has no view: " + viewName);
    next.removeAttribute("data-html-fragment");
    next.removeAttribute("data-html-fragment-view");
    host.parentNode.replaceChild(next, host);
    runFragmentHooks(viewName);
    return next;
  }

  function fetchNestedFragment(src) {
    if (!nestedFragmentLoading[src]) {
      nestedFragmentLoading[src] = fetch(src, { cache: "no-store" })
        .then(function (res) {
          if (!res.ok) throw new Error("Failed to load nested HTML fragment " + src + ": " + res.status);
          return res.text();
        });
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

  function hydrateGlobalModalSubfragments(root) {
    var hosts = Array.prototype.slice.call(root.querySelectorAll("[data-global-modal-fragment]"));
    if (!hosts.length) return Promise.resolve(root);
    return Promise.all(hosts.map(function (host) {
      var src = String(host.getAttribute("data-global-modal-fragment") || "").trim();
      if (!src) return true;
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
    loading[src] = fetch(src, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load HTML fragment " + src + ": " + res.status);
        return res.text();
      })
      .then(function (html) {
        var currentHost = findFragmentHost(viewName);
        if (!currentHost) return true;
        hydrateHost(currentHost, html, viewName);
        return true;
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
    loading[src] = fetch(src, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load HTML fragment " + src + ": " + res.status);
        return res.text();
      })
      .then(function (html) {
        var currentHost = document.getElementById("globalModalsFragmentHost");
        if (!currentHost) return true;
        var wrap = document.createElement("div");
        wrap.innerHTML = html;
        return hydrateGlobalModalSubfragments(wrap).then(function () {
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

  (function pokerEagerHydrateGlobalModals() {
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
      setTimeout(run, 0);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
      schedule();
    }
  })();

  (function pokerEagerHydratePrimaryViews() {
    var queue = [
      "chat",
      "download",
      "profile",
      "raffles"
    ];
    var index = 0;
    function runNext(deadline) {
      var started = Date.now();
      while (index < queue.length) {
        var viewName = queue[index++];
        try {
          window.pokerEnsureViewHtml(viewName);
        } catch (eViewHydrate) {}
        if (
          deadline &&
          typeof deadline.timeRemaining === "function" &&
          deadline.timeRemaining() < 8
        ) break;
        if (!deadline && Date.now() - started > 18) break;
      }
      if (index >= queue.length) return;
      schedule(runNext);
    }
    function schedule(fn) {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(fn, { timeout: 700 });
      } else {
        setTimeout(fn, 80);
      }
    }
    function start() {
      schedule(runNext);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
      start();
    }
  })();

  function findGlobalModalClickTarget(from) {
    return from && from.closest
      ? from.closest("#gazetteOpenBtn,#clubCharterOpenBtn,#headerClubWelcomeBtn,#homeWelcomeTitleBtn,#dailyPredictionBtn,#siteHomeInstructionBtn,#vpnProxyOpenBtn,#adminVisitorsBtn,#visitorsAdminBroadcastBtn,#adminPushToAdminsBtn,#adminPushToAllChatSubsBtn,#adminAuthDebugBtn,#adminShareStatsBtn,#adminTrackingLinksBtn,#adminReportBtn,#adminBroadcastReportsBtn,#romanTaskPlannerOpenBtn,#partnershipOpenBtn,.hall-photo-album__btn,.hall-shame-board__thumb-btn,.video-lessons__mtt-grid,.video-lessons__coach-student-gallery,.video-lessons__coach-reviews-grid,a.chat-msg__document-link--view,button[data-chat-pdf-download],button[data-chat-pdf-share],[data-open-image-lightbox],[data-open-pdf-viewer]")
      : null;
  }

  function finishTargetPrewarm(target) {
    if (!target || !target.closest || !target.closest("#adminReportBtn")) return Promise.resolve(true);
    try {
      var adminReportInit = window["poker" + "InitAdminReportModal"];
      if (typeof adminReportInit === "function") {
        return Promise.resolve(adminReportInit()).then(function () { return true; });
      }
    } catch (eAdminReportInit) {}
    return Promise.resolve(true);
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
    var htmlPromise = Promise.resolve(hasGlobalModalsHost ? window.pokerEnsureGlobalModalsHtml() : true);
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
      var hasGlobalModalsHost = !!document.getElementById("globalModalsFragmentHost");
      var needsLazyScripts = false;
      try {
        needsLazyScripts = typeof window.pokerHasGlobalModalScriptsForTarget === "function" && window.pokerHasGlobalModalScriptsForTarget(target);
      } catch (eModalScriptNeed) {}
      if (!hasGlobalModalsHost && !needsLazyScripts) return;
      var originalTarget = e.target;
      e.preventDefault();
      e.stopPropagation();
      prewarmGlobalModalTarget(target).then(function () {
        try {
          if (originalTarget && originalTarget.dispatchEvent) {
            var ev = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
            ev.__pokerLazyRedispatched = true;
            originalTarget.dispatchEvent(ev);
          } else {
            target.click();
          }
        } catch (eClick) {}
      });
    },
    true
  );
})();
