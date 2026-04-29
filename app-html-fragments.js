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
    try {
      if (viewName === "video-lessons" && typeof window.pokerInitVideoLessonsModals === "function") {
        window.pokerInitVideoLessonsModals();
      }
      if (viewName === "hall-of-fame" && typeof window.pokerInitHallOfFamePanelShareButtons === "function") {
        window.pokerInitHallOfFamePanelShareButtons();
      }
      if (viewName === "global-modals") {
        if (typeof window.pokerInitAdminReportModal === "function") window.pokerInitAdminReportModal();
        if (typeof window.pokerInitBroadcastReportsModal === "function") window.pokerInitBroadcastReportsModal();
        if (typeof window.pokerInitVisitorsAdminUi === "function") window.pokerInitVisitorsAdminUi();
        if (typeof window.pokerInitShareStatsAdminModal === "function") window.pokerInitShareStatsAdminModal();
        if (typeof window.pokerInitTrackingLinksAdminModal === "function") window.pokerInitTrackingLinksAdminModal();
        if (typeof window.pokerInitAuthDebugModal === "function") window.pokerInitAuthDebugModal();
        if (typeof window.pokerInitImageLightbox === "function") window.pokerInitImageLightbox();
        if (typeof window.pokerInitPartnershipModal === "function") window.pokerInitPartnershipModal();
      }
    } catch (eHooks) {}
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
      var target = e.target && e.target.closest
        ? e.target.closest("#adminVisitorsBtn,#visitorsAdminBroadcastBtn,#adminPushToAdminsBtn,#adminPushToAllChatSubsBtn,#adminAuthDebugBtn,#adminShareStatsBtn,#adminTrackingLinksBtn,#adminReportBtn,#adminBroadcastReportsBtn,#partnershipOpenBtn,.hall-photo-album__btn,.hall-shame-board__thumb-btn,.video-lessons__mtt-grid,.video-lessons__coach-student-gallery,.video-lessons__coach-reviews-grid,a.chat-msg__document-link--view,button[data-chat-pdf-download],button[data-chat-pdf-share],[data-open-image-lightbox],[data-open-pdf-viewer]")
        : null;
      if (!target || !document.getElementById("globalModalsFragmentHost")) return;
      var needsAdminScripts = !!(target.closest && target.closest("#adminVisitorsBtn,#visitorsAdminBroadcastBtn,#adminPushToAdminsBtn,#adminPushToAllChatSubsBtn,#adminAuthDebugBtn,#adminShareStatsBtn,#adminTrackingLinksBtn,#adminReportBtn,#adminBroadcastReportsBtn"));
      var scriptsReady = needsAdminScripts && typeof window.pokerLoadDomainScripts === "function"
        ? window.pokerLoadDomainScripts("admin")
        : Promise.resolve(true);
      var originalTarget = e.target;
      e.preventDefault();
      e.stopPropagation();
      scriptsReady.then(function () {
        return window.pokerEnsureGlobalModalsHtml();
      }).then(function () {
        try {
          if (originalTarget && originalTarget.dispatchEvent) {
            originalTarget.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
          } else {
            target.click();
          }
        } catch (eClick) {}
      });
    },
    true
  );
})();
