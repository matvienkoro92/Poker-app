(function () {
  "use strict";
  // Retire the large public-list caches that embedded every uploaded avatar.
  try {
    sessionStorage.removeItem("poker_home_friend_news_remote_v1:public-levels");
    sessionStorage.removeItem("poker_hall_fish_level_rows_v2");
  } catch (error) {}
  var directoryRequests = new Map();
  window.pokerLoadPublicLevelRows = function (base, maxAge) {
    var url = String(base || "").replace(/\/$/, "") + "/api/player-crm?publicLevels=1&avatarFormat=url";
    var key = "poker_public_level_rows_v1:" + url;
    if (directoryRequests.has(url)) return directoryRequests.get(url);
    try {
      if (maxAge > 0) {
        var saved = JSON.parse(localStorage.getItem(key));
        var age = saved && Date.now() - saved.at;
        if (saved && age >= 0 && age < maxAge && Array.isArray(saved.data.levelRows)) return Promise.resolve(saved.data);
      }
    } catch (_) {}
    var options = { cache: maxAge > 0 ? "default" : "no-store" };
    var response = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout(url, options, 9000) : fetch(url, options);
    var request = response.then(function (res) {
      if (!res.ok) throw new Error("public_levels_http_" + res.status);
      return res.json();
    }).then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.levelRows)) throw new Error("public_levels_invalid");
      try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), data: data })); } catch (_) {}
      return data;
    }).finally(function () { directoryRequests.delete(url); });
    directoryRequests.set(url, request);
    return request;
  };
  var pending = null, value = null, updatedAt = 0, generation = 0;
  window.pokerInvalidateTournamentBetHome = function () {
    generation += 1;
    value = null;
    pending = null;
  };
  window.pokerPublicImageSrc = function (src) {
    if (typeof src === "string" && src.indexOf("/api/avatar?") === 0) {
      var base = typeof getApiBase === "function" ? String(getApiBase() || "").replace(/\/$/, "") : "";
      return base + src;
    }
    return src;
  };
  // The plaque shows the current open event even when another tournament day is selected.
  window.pokerTournamentBetMatchesHome = function (data) {
    return !!(data && data.id && !data.createdByPlayer && data.status === "open");
  };
  // A tournament share still links only the Last Longer for that dated tournament.
  window.pokerTournamentBetMatchesSelected = function (data, selected, now) {
    selected = selected || window._tournamentDayShare;
    if (!data || !data.id || data.createdByPlayer || data.status !== "open" || !selected) return false;
    if (data.tournamentId !== "weekly-" + selected.weekday) return false;
    var created = Date.parse(data.createdAt);
    if (!Number.isFinite(created)) return false;
    var date = new Date(created + 10800000).toISOString().slice(0, 10);
    return date === selected.date && (now == null ? Date.now() : now) < Date.parse(date + "T20:00:00+03:00");
  };
  window.pokerLoadTournamentBetHome = function (force) {
    if (pending) return pending;
    if (!force && value && Date.now() - updatedAt < 60000) return Promise.resolve(value);
    var base = typeof getApiBase === "function" ? String(getApiBase() || "").replace(/\/$/, "") : "";
    var requestGeneration = generation;
    var request = fetch(base + "/api/tournament-bet?mode=home", { cache: "no-store" }).then(function (response) {
      if (!response.ok) throw new Error("Tournament summary unavailable");
      return response.json();
    }).then(function (data) {
      if (!data || data.ok !== true) throw new Error("Invalid tournament summary");
      if (requestGeneration === generation) {
        value = data;
        updatedAt = Date.now();
      }
      return data;
    }).finally(function () { if (pending === request) pending = null; });
    pending = request;
    return pending;
  };
})();
