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
    return new Date(d.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
  }

  function pokerPlayerCrmSortDateValue(value) {
    var ms = Date.parse(value || "");
    return Number.isFinite(ms) ? ms : null;
  }

  function pokerPlayerCrmSortRows(rows, valueFn, dir, tieFn) {
    var mul = dir === "asc" ? 1 : -1;
    return (Array.isArray(rows) ? rows.slice() : []).sort(function (a, b) {
      var av = valueFn(a);
      var bv = valueFn(b);
      if (av == null && bv == null) return tieFn ? tieFn(a, b) : 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * mul;
      if (av > bv) return 1 * mul;
      return tieFn ? tieFn(a, b) : 0;
    });
  }

  function pokerPlayerCrmSortableTh(esc, scope, field, label, activeField, activeDir) {
    var active = activeField === field;
    var dir = activeDir === "asc" ? "asc" : "desc";
    var mark = active ? (dir === "asc" ? "↑" : "↓") : "↕";
    return "<th aria-sort=\"" + (active ? (dir === "asc" ? "ascending" : "descending") : "none") + "\">" +
      "<button type=\"button\" class=\"player-crm__sort-btn" + (active ? " player-crm__sort-btn--active" : "") + "\" data-crm-sort-scope=\"" + esc(scope) + "\" data-crm-sort-field=\"" + esc(field) + "\" aria-label=\"" + esc("Сортировать по " + label) + "\">" +
        "<span>" + esc(label) + "</span><span class=\"player-crm__sort-mark\" aria-hidden=\"true\">" + mark + "</span>" +
      "</button></th>";
  }

  function installFallback(scope) {
    scope.pokerPlayerCrmEsc = pokerPlayerCrmEsc;
    scope.pokerPlayerCrmMoney = pokerPlayerCrmMoney;
    scope.pokerPlayerCrmPct = pokerPlayerCrmPct;
    scope.pokerPlayerCrmIntFmt = pokerPlayerCrmIntFmt;
    scope.pokerPlayerCrmDaysLabel = pokerPlayerCrmDaysLabel;
    scope.pokerPlayerCrmIsoDate = pokerPlayerCrmIsoDate;
    scope.pokerPlayerCrmLocalDateKey = pokerPlayerCrmLocalDateKey;
    scope.pokerPlayerCrmSortDateValue = pokerPlayerCrmSortDateValue;
    scope.pokerPlayerCrmSortRows = pokerPlayerCrmSortRows;
    scope.pokerPlayerCrmSortableTh = pokerPlayerCrmSortableTh;
    return {
      esc: pokerPlayerCrmEsc,
      money: pokerPlayerCrmMoney,
      pct: pokerPlayerCrmPct,
      intFmt: pokerPlayerCrmIntFmt,
      daysLabel: pokerPlayerCrmDaysLabel,
      isoDate: pokerPlayerCrmIsoDate,
      localDateKey: pokerPlayerCrmLocalDateKey,
      sortDateValue: pokerPlayerCrmSortDateValue,
      sortRows: pokerPlayerCrmSortRows,
      sortableTh: pokerPlayerCrmSortableTh,
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
