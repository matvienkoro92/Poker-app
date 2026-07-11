// Deduplicated installation/session/event analytics. Business identity is verified on the server.
(function () {
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  var SESSION_KEY = "poker_analytics_session_v1";
  var lastSessionFingerprint = "";
  var sectionThrottle = {};

  function randomId(prefix) {
    try {
      if (window.crypto && typeof window.crypto.randomUUID === "function") return prefix + window.crypto.randomUUID().replace(/-/g, "");
    } catch (e) {}
    return prefix + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 14);
  }

  function installationId() {
    return typeof getInstallationId === "function" ? getInstallationId() : "";
  }

  function readSession() {
    var now = Date.now();
    var current = null;
    try { current = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) {}
    if (!current || !current.id || !current.lastAt || now - Number(current.lastAt) >= SESSION_TIMEOUT_MS) {
      current = { id: randomId("ses_"), startedAt: now, lastAt: now };
    } else {
      current.lastAt = now;
    }
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(current)); } catch (eStore) {}
    return current;
  }

  function postEvent(type, details) {
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var install = installationId();
    if (!base || !install) return Promise.resolve({ ok: false });
    var session = readSession();
    var body = {
      type: type,
      installation_id: install,
      session_id: session.id,
      event_id: randomId("evt_"),
      at_ms: Date.now(),
    };
    Object.keys(details || {}).forEach(function (key) { body[key] = details[key]; });
    if (typeof pokerGuestOrAuthedPostBody === "function") body = pokerGuestOrAuthedPostBody(body);
    return fetch(base + "/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).then(function (response) { return response.json().catch(function () { return { ok: false }; }); })
      .catch(function () { return { ok: false }; });
  }

  window.pokerAnalyticsEnsureSession = function () {
    var session = readSession();
    var identity = typeof getVisitorId === "function" ? String(getVisitorId() || "") : "";
    var fingerprint = session.id + "|" + identity;
    if (fingerprint === lastSessionFingerprint) return Promise.resolve({ ok: true, skipped: true });
    lastSessionFingerprint = fingerprint;
    return postEvent("session_started", {});
  };

  window.pokerTrackAnalyticsEvent = function (type, details) {
    if (type === "section_opened") {
      var section = String(details && details.section || "");
      var key = readSession().id + "|" + section;
      var now = Date.now();
      if (sectionThrottle[key] && now - sectionThrottle[key] < 1200) return Promise.resolve({ ok: true, skipped: true });
      sectionThrottle[key] = now;
    }
    return window.pokerAnalyticsEnsureSession().then(function () { return postEvent(type, details || {}); });
  };

  window.addEventListener("poker-telegram-auth", function () {
    window.pokerAnalyticsEnsureSession();
  });
  window.addEventListener("focus", function () {
    window.pokerAnalyticsEnsureSession();
  });
})();
