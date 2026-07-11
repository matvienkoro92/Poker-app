// Просмотры разделов (админ): счётчик в Redis, полоска внизу каждого экрана
(function pokerAdminSectionViews() {
  var debounceTimer = null;
  function apiBase() {
    return typeof getApiBase === "function" ? getApiBase() : "";
  }
  function ensureBars() {
    if (window.__pokerSectionViewBarsDone) return;
    window.__pokerSectionViewBarsDone = true;
    var appVersion = "";
    try {
      appVersion =
        document && document.documentElement && document.documentElement.getAttribute
          ? String(document.documentElement.getAttribute("data-app-version") || "").trim()
          : "";
    } catch (eVer) {}
    document.querySelectorAll(".view[data-view]").forEach(function (view) {
      var name = view.getAttribute("data-view");
      if (!name || view.querySelector(".admin-section-views")) return;
      var bar = document.createElement("div");
      bar.className = "admin-section-views admin-section-views--hidden";
      bar.setAttribute("data-admin-section", name);
      bar.setAttribute("aria-hidden", "true");
      var inner = document.createElement("span");
      inner.className = "admin-section-views__text";
      inner.innerHTML =
        "Просмотры: <strong class=\"admin-section-views__count\">—</strong>" +
        (appVersion ? " · Версия: <strong class=\"admin-section-views__version\">" + escapeHtml(appVersion) + "</strong>" : "");
      bar.appendChild(inner);
      view.appendChild(bar);
    });
  }
  function applyCounts(counts) {
    counts = counts || {};
    var allTimeTotal = 0;
    Object.keys(counts).forEach(function (key) {
      var value = Number(counts[key]);
      if (value === value && value > 0) allTimeTotal += value;
    });
    document.querySelectorAll(".admin-section-views[data-admin-section]").forEach(function (bar) {
      var name = bar.getAttribute("data-admin-section");
      var strong = bar.querySelector(".admin-section-views__count");
      if (!strong || !name) return;
      var n = allTimeTotal || (counts[name] != null ? Number(counts[name]) : 0);
      strong.textContent = String(n === n ? n : 0);
    });
  }
  function fetchCounts() {
    if (!window.__pokerShowAdminSectionViews) return;
    var base = apiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/section-views" + q)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || !data.counts) return;
        applyCounts(data.counts);
      })
      .catch(function () {});
  }
  window.pokerAdminRefreshSectionViewsDebounced = function () {
    if (!window.__pokerShowAdminSectionViews) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchCounts, 400);
  };
  window.pokerRecordSectionViewOpen = function (section) {
    var base = apiBase();
    if (!base || !section) return;
    try {
      if (typeof isLocalEnv === "function" && isLocalEnv() && !(document.getElementById("app") && document.getElementById("app").getAttribute("data-api-base"))) return;
    } catch (eL) {}
    try {
      if (typeof pokerTrackAnalyticsEvent === "function") pokerTrackAnalyticsEvent("section_opened", { section: section });
      var body =
        typeof pokerGuestOrAuthedPostBody === "function"
          ? pokerGuestOrAuthedPostBody({ section: section })
          : { section: section };
      fetch(base + "/api/section-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(function () {});
    } catch (ePost) {}
  };
  function recordCurrentViewOnce() {
    var section = "";
    try {
      section = document.body && document.body.getAttribute ? document.body.getAttribute("data-view") || "" : "";
    } catch (eBody) {}
    if (!section) return;
    window.pokerRecordSectionViewOpen(section);
  }
  window.pokerInitAdminSectionViewsUi = function () {
    window.__pokerShowAdminSectionViews = true;
    ensureBars();
    document.querySelectorAll(".admin-section-views").forEach(function (el) {
      el.classList.remove("admin-section-views--hidden");
      el.setAttribute("aria-hidden", "false");
    });
    fetchCounts();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(recordCurrentViewOnce, 600); });
  } else {
    setTimeout(recordCurrentViewOnce, 600);
  }
})();
