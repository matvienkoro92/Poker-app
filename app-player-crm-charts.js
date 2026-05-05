function initPlayerCrmChartsRuntime(deps) {
  deps = deps || {};
  var state = deps.state || {};
  var esc = deps.esc || function (value) { return String(value == null ? "" : value); };
  var intFmt = deps.intFmt || function (value) { return String(Number(value) || 0); };

  function renderAnalytics() {
    var el = document.getElementById("playerCrmAnalytics");
    if (!el) return;
    if (state.loading && state.loadingScope !== "data") {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка графика…</div>";
      return;
    }
    el.innerHTML = renderChartAnalytics();
  }

  var chartColors = {
    players: "#f8d98a",
    registrations: "#60a5fa",
    poker21: "#c084fc",
    bot: "#34d399",
    push: "#f472b6",
    deposits: "#f59e0b",
    crmMessages: "#a3e635",
    generalMessages: "#38bdf8",
  };

  function formatChartDate(value) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return String(value || "");
    return parts[2] + "." + parts[1];
  }

  function renderChartSummary(chart, series) {
    var datedSeries = series.filter(function (s) {
      return s.hasDates !== false && state.chartSeriesEnabled[s.key] !== false;
    });
    var rows = Array.isArray(chart.summary) ? chart.summary : [];
    var table = rows.length && datedSeries.length ? "<div class=\"player-crm__chart-summary-table-wrap\"><table class=\"player-crm__chart-summary-table\"><thead><tr><th>Дата</th>" +
      datedSeries.map(function (s) { return "<th>" + esc(s.label || s.key) + "</th>"; }).join("") +
      "<th>Итого</th></tr></thead><tbody>" +
      rows.slice(0, 20).map(function (row) {
        var total = 0;
        var cells = datedSeries.map(function (s) {
          var value = Number(row[s.key]) || 0;
          total += value;
          return "<td>" + esc(intFmt(value)) + "</td>";
        }).join("");
        return "<tr><td>" + esc(formatChartDate(row.date)) + "</td>" + cells + "<td><strong>" + esc(intFmt(total)) + "</strong></td></tr>";
      }).join("") + "</tbody></table></div>" :
      "<div class=\"player-crm__timeline-item\">" + (datedSeries.length ? "За выбранный период нет прироста с датой." : "Выберите хотя бы одну галочку, чтобы увидеть линии и сводку.") + "</div>";
    return "<div class=\"player-crm__chart-summary\"><h4>Сводка прироста по датам</h4>" + table + "</div>";
  }

  function enabledChartSeries() {
    var chart = state.chartAnalytics || {};
    var series = Array.isArray(chart.series) ? chart.series : [];
    return series.filter(function (s) {
      return s.hasDates !== false && state.chartSeriesEnabled[s.key] !== false;
    });
  }

  function renderChartTooltipContent(idx) {
    var chart = state.chartAnalytics || {};
    var labels = Array.isArray(chart.labels) ? chart.labels : [];
    var label = labels[idx];
    if (!label) return "";
    var rows = enabledChartSeries().map(function (s) {
      var color = chartColors[s.key] || "#e5e7eb";
      var value = Number((s.values || [])[idx]) || 0;
      return "<span><i style=\"--line-color:" + esc(color) + "\"></i><b>" + esc(s.label || s.key) + "</b><strong>" + esc(intFmt(value)) + "</strong></span>";
    }).join("");
    if (!rows) rows = "<em>Нет включенных линий</em>";
    return "<div class=\"player-crm__chart-tooltip-date\">" + esc(label) + "</div><div class=\"player-crm__chart-tooltip-values\">" + rows + "</div>";
  }

  function showChartTooltip(target, event) {
    var tip = document.getElementById("playerCrmChartTooltip");
    var card = target && target.closest(".player-crm__chart-card");
    if (!tip || !card) return;
    var idx = Number(target.getAttribute("data-crm-chart-point"));
    if (!Number.isFinite(idx)) return hideChartTooltip();
    var html = renderChartTooltipContent(idx);
    if (!html) return hideChartTooltip();
    tip.innerHTML = html;
    tip.hidden = false;
    var guide = card.querySelector("#playerCrmChartGuideLine");
    if (guide) {
      var bandX = Number(target.getAttribute("x")) || 0;
      var bandW = Number(target.getAttribute("width")) || 0;
      var guideX = bandX + bandW / 2;
      guide.setAttribute("x1", guideX.toFixed(1));
      guide.setAttribute("x2", guideX.toFixed(1));
      guide.removeAttribute("hidden");
    }
    var rect = card.getBoundingClientRect();
    var x = Math.max(8, Math.min(rect.width - 220, event.clientX - rect.left + 12));
    var y = Math.max(8, event.clientY - rect.top - 16);
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }

  function hideChartTooltip() {
    var tip = document.getElementById("playerCrmChartTooltip");
    if (tip) tip.hidden = true;
    var guide = document.getElementById("playerCrmChartGuideLine");
    if (guide) guide.setAttribute("hidden", "hidden");
  }


  return {
    renderAnalytics: renderAnalytics,
    renderChartAnalytics: renderChartAnalytics,
    showChartTooltip: showChartTooltip,
    hideChartTooltip: hideChartTooltip
  };
}
