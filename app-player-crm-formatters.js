// Player CRM formatter bridge. The ES module owns the implementation; this
// file keeps synchronous browser globals for lazy legacy consumers.
(function () {
  function pokerPlayerCrmEsc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pokerPlayerCrmMoney(n) {
    var x = Math.round(Number(n) || 0);
    return x.toLocaleString("ru-RU") + " ₽";
  }

  function pokerPlayerCrmPct(n) {
    return Math.round(Number(n) || 0) + "%";
  }

  function pokerPlayerCrmIntFmt(n) {
    return Math.round(Number(n) || 0).toLocaleString("ru-RU");
  }

  function pokerPlayerCrmDaysLabel(n) {
    if (n == null || Number(n) >= 999) return "—";
    var d = Math.max(0, Number(n) || 0);
    if (d === 0) return "сегодня";
    if (d === 1) return "1 день";
    if (d > 1 && d < 5) return d + " дня";
    return d + " дней";
  }

  function pokerPlayerCrmIsoDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function pokerPlayerCrmLocalDateKey(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function installFallback(scope) {
    scope.pokerPlayerCrmEsc = pokerPlayerCrmEsc;
    scope.pokerPlayerCrmMoney = pokerPlayerCrmMoney;
    scope.pokerPlayerCrmPct = pokerPlayerCrmPct;
    scope.pokerPlayerCrmIntFmt = pokerPlayerCrmIntFmt;
    scope.pokerPlayerCrmDaysLabel = pokerPlayerCrmDaysLabel;
    scope.pokerPlayerCrmIsoDate = pokerPlayerCrmIsoDate;
    scope.pokerPlayerCrmLocalDateKey = pokerPlayerCrmLocalDateKey;
    return {
      esc: pokerPlayerCrmEsc,
      money: pokerPlayerCrmMoney,
      pct: pokerPlayerCrmPct,
      intFmt: pokerPlayerCrmIntFmt,
      daysLabel: pokerPlayerCrmDaysLabel,
      isoDate: pokerPlayerCrmIsoDate,
      localDateKey: pokerPlayerCrmLocalDateKey,
    };
  }

  window.pokerPlayerCrmFormattersReady = Promise.resolve(installFallback(window));
  import("./app-player-crm-formatters.module.mjs")
    .then(function (mod) {
      if (mod && typeof mod.installPlayerCrmFormattersGlobal === "function") {
        window.pokerPlayerCrmFormattersReady = Promise.resolve(mod.installPlayerCrmFormattersGlobal(window));
      }
    })
    .catch(function () {});
})();
