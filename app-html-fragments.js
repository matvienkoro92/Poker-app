// Lazy HTML fragments for heavy views. Keeps first-load DOM light while
// preserving existing data-view routing.
(function () {
  var loading = Object.create(null);

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
    if (viewName === "hall-of-fame") safeCall(window.pokerInitHallOfFamePanelShareButtons);
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
        var nodes = [];
        while (wrap.firstChild) nodes.push(wrap.removeChild(wrap.firstChild));
        nodes.forEach(function (node) {
          currentHost.parentNode.insertBefore(node, currentHost);
        });
        currentHost.parentNode.removeChild(currentHost);
        runFragmentHooks("global-modals");
        return true;
      });
    return loading[src];
  };

  document.addEventListener(
    "click",
    function (e) {
      if (e.__pokerLazyRedispatched) return;
      var target = e.target && e.target.closest
        ? e.target.closest("#gazetteOpenBtn,#clubCharterOpenBtn,#headerClubWelcomeBtn,#homeWelcomeTitleBtn,#dailyPredictionBtn,#siteHomeInstructionBtn,#vpnProxyOpenBtn,#adminVisitorsBtn,#visitorsAdminBroadcastBtn,#adminPushToAdminsBtn,#adminPushToAllChatSubsBtn,#adminAuthDebugBtn,#adminShareStatsBtn,#adminTrackingLinksBtn,#adminReportBtn,#adminBroadcastReportsBtn,#romanTaskPlannerOpenBtn,#partnershipOpenBtn,.hall-photo-album__btn,.hall-shame-board__thumb-btn,.video-lessons__mtt-grid,.video-lessons__coach-student-gallery,.video-lessons__coach-reviews-grid,a.chat-msg__document-link--view,button[data-chat-pdf-download],button[data-chat-pdf-share],[data-open-image-lightbox],[data-open-pdf-viewer]")
        : null;
      if (!target) return;
      var hasGlobalModalsHost = !!document.getElementById("globalModalsFragmentHost");
      if (!hasGlobalModalsHost) return;
      var originalTarget = e.target;
      e.preventDefault();
      e.stopPropagation();
      Promise.resolve(window.pokerEnsureGlobalModalsHtml()).then(function () {
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
