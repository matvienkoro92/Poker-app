(function initHomeDailyPokerWonTotal() {
  "use strict";

  function start() {
    var output = document.getElementById("homeDailyPokerWon");
    if (!output || typeof fetch !== "function") return;
    var pending = false;
    var dayMs = 24 * 60 * 60 * 1000;
    var cacheKey = "pokerHomeDailyWonTotal";
    var updatedAt = 0;

    function render(total) {
      var amount = Math.round(total).toLocaleString("ru-RU").replace(/\u00a0/g, " ");
      output.innerHTML = "Выиграно уже <strong>" + amount + " ₽</strong>";
      output.title = "Общая сумма выигрышей всех игроков за всё время";
    }

    try {
      var cached = JSON.parse(window.localStorage.getItem(cacheKey) || "null");
      if (cached && Number.isFinite(cached.total) && cached.total >= 0 &&
          Number.isFinite(cached.updatedAt) && cached.updatedAt > 0 && cached.updatedAt <= Date.now()) {
        updatedAt = cached.updatedAt;
        render(cached.total);
      }
    } catch (error) {}

    function refresh() {
      if (pending || document.hidden) return;
      if (updatedAt && Date.now() - updatedAt < dayMs) return;
      var app = document.getElementById("app");
      var base = typeof getApiBase === "function" ? getApiBase() :
        (app && app.getAttribute("data-api-base")) || window.location.origin;
      if (!base || !/^https?:\/\//i.test(base)) return;
      pending = true;
      // No date range: the public summary includes winnings for all time.
      fetch(base.replace(/\/$/, "") + "/api/promo/daily-poker/winners?limit=1&summary=1", { cache: "no-store" })
        .then(function (response) {
          if (!response.ok) throw new Error("Winnings unavailable");
          return response.json();
        })
        .then(function (data) {
          if (!data || data.ok === false || data.totalPrizeRubles == null) return;
          var total = Number(data.totalPrizeRubles);
          if (!Number.isFinite(total) || total < 0) return;
          render(total);
          updatedAt = Date.now();
          try { window.localStorage.setItem(cacheKey, JSON.stringify({ total: total, updatedAt: updatedAt })); } catch (error) {}
        })
        .catch(function () {})
        .finally(function () { pending = false; });
    }

    refresh();
    window.setInterval(refresh, dayMs);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) refresh(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
