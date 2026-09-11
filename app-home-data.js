(function () {
  "use strict";
  // Retire the large public-list caches that embedded every uploaded avatar.
  try {
    sessionStorage.removeItem("poker_home_friend_news_remote_v1:public-levels");
    sessionStorage.removeItem("poker_hall_fish_level_rows_v2");
  } catch (error) {}
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
