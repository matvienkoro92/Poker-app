// API base, tracking-link events, share stats, and visitor counters.

function isLocalEnv() {
  if (typeof window === "undefined" || !window.location) return true;
  const hostname = window.location.hostname || "";
  const protocol = window.location.protocol || "";
  if (protocol === "file:") return true;
  if (!hostname) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0") return true;
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  return false;
}

function getApiBase() {
  const app = document.getElementById("app");
  const dataBase = app && app.getAttribute("data-api-base");
  if (dataBase && dataBase.trim()) return dataBase.trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location && window.location.origin) return window.location.origin;
  return "";
}

/** Код ссылки вида ref_xxxxxxxx (8 hex) из Telegram start_param или ?startapp= / ?ref= */
function getPokerTrackingRefFromEnv() {
  try {
    var sp =
      typeof pokerReadTelegramLaunchStartParam === "function" ? pokerReadTelegramLaunchStartParam() : "";
    if (!sp) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      sp = (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) || "";
      if (!sp && tg && tg.initData) {
        try {
          var p = new URLSearchParams(tg.initData);
          sp = p.get("start_param") || "";
        } catch (e1) {}
      }
    }
    if (sp && /^ref_[a-f0-9]{8}$/i.test(String(sp).trim())) return String(sp).trim().toLowerCase();
    if (typeof location !== "undefined" && location.search) {
      var q = new URLSearchParams(location.search);
      var qsp = q.get("startapp") || q.get("ref") || "";
      if (qsp && /^ref_[a-f0-9]{8}$/i.test(String(qsp).trim())) return String(qsp).trim().toLowerCase();
    }
  } catch (e) {}
  return "";
}

function recordTrackingLinkHit(ref) {
  if (!ref) return;
  var slug = ref.replace(/^ref_/, "");
  try {
    if (sessionStorage.getItem("poker_track_ref_" + slug)) return;
  } catch (e) {}
  var base = getApiBase();
  if (!base) return;
  var visitorId = getVisitorId();
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var initData = tg && tg.initData ? tg.initData : "";
  try {
    fetch(base + "/api/tracking-link-hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: ref, visitor_id: visitorId, initData: initData || undefined }),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (data && data.recorded) {
          try {
            sessionStorage.setItem("poker_track_ref_" + slug, "1");
          } catch (e2) {}
        }
      })
      .catch(function () {});
  } catch (e3) {}
}

var pokerTrackingEventThrottle = {};
/** События после перехода по ref_-ссылке (см. sessionStorage poker_session_tracking_ref). */
function trackLinkSessionEvent(action, detail) {
  if (!action) return;
  try {
    var ref = sessionStorage.getItem("poker_session_tracking_ref");
    if (!ref) return;
    var throttleKey = action + "|" + String(detail || "");
    var now = Date.now();
    if (pokerTrackingEventThrottle[throttleKey] && now - pokerTrackingEventThrottle[throttleKey] < 1200) return;
    pokerTrackingEventThrottle[throttleKey] = now;
    var base = getApiBase();
    if (!base) return;
    var visitorId = getVisitorId();
    var tgEv = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var initDataEv = tgEv && tgEv.initData ? tgEv.initData : "";
    fetch(base + "/api/tracking-link-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: ref,
        visitor_id: visitorId,
        action: action,
        detail: detail ? String(detail).slice(0, 200) : undefined,
        initData: initDataEv || undefined,
      }),
    }).catch(function () {});
  } catch (e) {}
}

(function initTrackingLinkActivityCapture() {
  if (typeof document === "undefined" || !document.addEventListener) return;
  document.addEventListener(
    "click",
    function (ev) {
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest("#trackingLinksAdminModal") || t.closest("#trackingLinksVisitorsModal")) return;
      var el = t.closest("[data-view-target]");
      if (!el) return;
      var tgt = el.getAttribute("data-view-target");
      if (!tgt) return;
      var hint = el.getAttribute("aria-label") || el.getAttribute("title") || "";
      if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("open:" + tgt, hint);
    },
    true
  );
})();

function recordShareButtonClick(buttonId) {
  var base = getApiBase();
  if (!base) return;
  try {
    fetch(base + "/api/share-button-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buttonId: buttonId })
    }).catch(function () {});
  } catch (e) {}
}

function updateVisitorCounter() {
  const elTotal = document.getElementById("visitorTotal");
  const elUnique = document.getElementById("visitorUnique");
  const elReturning = document.getElementById("visitorReturning");
  const hasCounterEls = !!(elUnique && elReturning);

  const setDash = function () {
    if (elTotal) elTotal.textContent = "—";
    if (elUnique) elUnique.textContent = "—";
    if (elReturning) elReturning.textContent = "—";
  };

  const base = getApiBase();
  const isLocal = isLocalEnv();
  if (isLocal && !(document.getElementById("app") && document.getElementById("app").getAttribute("data-api-base"))) {
    if (hasCounterEls) setDash();
    return;
  }

  if (!base) {
    if (hasCounterEls) setDash();
    return;
  }

  const visitorId = getVisitorId();
  (function tryTrackRef() {
    var ref = getPokerTrackingRefFromEnv();
    if (ref) {
      try {
        sessionStorage.setItem("poker_session_tracking_ref", ref);
      } catch (eRef) {}
      recordTrackingLinkHit(ref);
    }
  })();
  var authLeading =
    typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
  const apiUrl =
    base +
    "/api/visit" +
    (authLeading === "?" ? "?" : authLeading + "&") +
    "visitor_id=" +
    encodeURIComponent(visitorId);
  const hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  const fetchOpts = hasCred
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody({ visitor_id: visitorId })
            : { visitor_id: visitorId }
        ),
      }
    : { method: "GET" };

  function doFetch(retryCount) {
    fetch(apiUrl, fetchOpts)
      .then(function (res) {
        if (!res.ok) return Promise.reject(new Error("visit api " + res.status));
        return res.json();
      })
      .then(function (data) {
        if (hasCounterEls) applyVisitorCounts(data, elTotal, elUnique, elReturning);
        if (data && data.dtId) sessionStorage.setItem("poker_dt_id", data.dtId);
        if (data && data.ok === false && hasCounterEls) fetchVisitorStatsOnly();
      })
      .catch(function () {
        if (hasCounterEls) setDash();
        if (retryCount > 0) {
          setTimeout(function () { doFetch(retryCount - 1); }, 1500);
        } else {
          if (hasCounterEls) {
            fetchVisitorStatsOnly();
            setTimeout(updateVisitorCounter, 5000);
          }
        }
      });
  }
  doFetch(1);
}

function applyVisitorCounts(data, elTotal, elUnique, elReturning) {
  if (data && data.ok === false) {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
    return;
  }
  if (data && typeof data.unique === "number" && typeof data.returning === "number") {
    if (elTotal) elTotal.textContent = typeof data.total === "number" ? data.total : data.unique + data.returning;
    elUnique.textContent = String(data.unique);
    elReturning.textContent = String(data.returning);
  } else {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
  }
}

function fetchVisitorStatsOnly() {
  const elTotal = document.getElementById("visitorTotal");
  const elUnique = document.getElementById("visitorUnique");
  const elReturning = document.getElementById("visitorReturning");
  if (!elUnique || !elReturning) return;
  const setDash = function () {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
  };
  const base = getApiBase();
  const isLocal = isLocalEnv();
  if (isLocal && !(document.getElementById("app") && document.getElementById("app").getAttribute("data-api-base"))) {
    setDash();
    return;
  }
  if (!base) {
    setDash();
    return;
  }
  var authLeadingSt =
    typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
  var statsUrl =
    base +
    "/api/visit" +
    (authLeadingSt === "?" ? "?stats=1" : authLeadingSt + "&stats=1");
  fetch(statsUrl)
    .then(function (res) {
      if (!res.ok) return Promise.reject(new Error("stats " + res.status));
      return res.json();
    })
    .then((data) => applyVisitorCounts(data, elTotal, elUnique, elReturning))
    .catch(function () {
      setDash();
    });
}
