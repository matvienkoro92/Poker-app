(function initHomeDailyPokerWonTotal() {
  "use strict";

  var output = document.getElementById("homeDailyPokerWon");
  if (!output || typeof fetch !== "function") return;
  var base = "";
  try { base = typeof getApiBase === "function" ? getApiBase() : ""; } catch (error) {}
  if (!base) return;
  var auth = "";
  try {
    if (typeof authQuerySafe === "function") auth = authQuerySafe();
    else if (typeof pokerApiAuthQuery === "function") auth = pokerApiAuthQuery("?");
  } catch (error) {}
  var joiner = auth ? "&" : "?";
  fetch(base.replace(/\/$/, "") + "/api/promo/daily-poker/winners" + auth + joiner + "limit=1&summary=1", { cache: "no-store" })
    .then(function (response) { return response.json(); })
    .then(function (data) {
      if (!data || data.ok === false) return;
      var amount = Math.max(0, Math.round(Number(data.totalPrizeRubles) || 0));
      output.innerHTML = "Выиграно уже <strong>" +
        amount.toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " ₽</strong>";
    })
    .catch(function () {});
})();
