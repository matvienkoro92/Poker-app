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
})();
