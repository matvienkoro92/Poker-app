function initPlayerCrmChartsRuntime(deps) {
  deps = deps || {};
  var state = deps.state || {};
  var esc = deps.esc || function (value) { return String(value == null ? "" : value); };
  var intFmt = deps.intFmt || function (value) { return String(Number(value) || 0); };

  function renderAnalytics() {
    var el = document.getElementById("playerCrmAnalytics");
    if (!el) return;
    if ((state.loading && state.loadingScope !== "data") || (state.heavyLoading && (state.heavyLoadingScope === "chart" || !state.chartAnalytics))) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка данных…</div>";
      return;
    }
    el.innerHTML = renderChartAnalytics();
  }

  var chartColors = {
    visits: "#f8d98a",
    users: "#60a5fa",
    players: "#f8d98a",
    registeredVisitors: "#34d399",
    participations: "#fb7185",
    registrations: "#60a5fa",
    poker21: "#c084fc",
    bot: "#34d399",
    push: "#f472b6",
    deposits: "#f59e0b",
    depositAmount: "#fb923c",
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

  function renderChartAnalytics() {
    var chart = state.chartAnalytics || {};
    var labels = Array.isArray(chart.labels) ? chart.labels : [];
    var series = Array.isArray(chart.series) ? chart.series : [];
    if (!labels.length || !series.length) return "<div class=\"player-crm__timeline-item\">График появится после загрузки данных.</div>";
    var enabledSeries = series.filter(function (s) {
      return s.hasDates !== false && state.chartSeriesEnabled[s.key] !== false;
    });
    var width = 960;
    var height = 340;
    var padL = 72;
    var padR = 18;
    var padT = 20;
    var padB = 58;
    var plotW = width - padL - padR;
    var plotH = height - padT - padB;
    var max = enabledSeries.reduce(function (m, s) {
      return Math.max(m, Math.max.apply(null, (s.values || []).map(function (v) { return Number(v) || 0; })));
    }, 0);
    max = Math.max(1, max);
    function x(i) {
      return padL + (labels.length <= 1 ? 0 : (i / (labels.length - 1)) * plotW);
    }
    function y(v) {
      return padT + plotH - ((Number(v) || 0) / max) * plotH;
    }
    function points(values) {
      return labels.map(function (_, idx) { return x(idx).toFixed(1) + "," + y(values[idx] || 0).toFixed(1); }).join(" ");
    }
    var grid = [0, 0.25, 0.5, 0.75, 1].map(function (part) {
      var gy = padT + plotH - part * plotH;
      var value = Math.round(max * part);
      return "<line x1=\"" + padL + "\" y1=\"" + gy.toFixed(1) + "\" x2=\"" + (width - padR) + "\" y2=\"" + gy.toFixed(1) + "\" />" +
        "<text x=\"12\" y=\"" + (gy + 5).toFixed(1) + "\">" + esc(intFmt(value)) + "</text>";
    }).join("");
    var step = Math.max(1, Math.ceil(labels.length / 6));
    var ticks = labels.map(function (label, idx) {
      if (idx !== 0 && idx !== labels.length - 1 && idx % step !== 0) return "";
      return "<text x=\"" + x(idx).toFixed(1) + "\" y=\"" + (height - 18) + "\">" + esc(String(label).slice(5)) + "</text>";
    }).join("");
    var lines = enabledSeries.map(function (s) {
      var color = chartColors[s.key] || "#e5e7eb";
      return "<polyline points=\"" + points(s.values || []) + "\" style=\"--line-color:" + esc(color) + "\" />" +
        "<circle cx=\"" + x(labels.length - 1).toFixed(1) + "\" cy=\"" + y((s.values || [0])[labels.length - 1] || 0).toFixed(1) + "\" r=\"4\" style=\"--line-color:" + esc(color) + "\" />";
    }).join("");
    var hoverBands = labels.map(function (_, idx) {
      var left = idx === 0 ? padL : (x(idx - 0.5));
      var right = idx === labels.length - 1 ? width - padR : x(idx + 0.5);
      return "<rect data-crm-chart-point=\"" + idx + "\" x=\"" + left.toFixed(1) + "\" y=\"" + padT + "\" width=\"" + Math.max(8, right - left).toFixed(1) + "\" height=\"" + plotH + "\" />";
    }).join("");
    var legend = series.map(function (s) {
      var hasDates = s.hasDates !== false;
      var checked = hasDates && state.chartSeriesEnabled[s.key] !== false ? " checked" : "";
      var disabled = hasDates ? "" : " disabled";
      var cls = hasDates ? "player-crm__chart-toggle" : "player-crm__chart-toggle player-crm__chart-toggle--disabled";
      var color = chartColors[s.key] || "#e5e7eb";
      var hint = hasDates ? "" : " · нет даты";
      return "<label class=\"" + cls + "\"><input type=\"checkbox\" data-crm-chart-series=\"" + esc(s.key) + "\"" + checked + disabled + " />" +
        "<span class=\"player-crm__chart-swatch\" style=\"--line-color:" + esc(color) + "\"></span><span>" + esc((s.label || s.key) + hint) + "</span></label>";
    }).join("");
    return "<div class=\"player-crm__chart-card\">" +
      "<div class=\"player-crm__chart-scroll\"><svg class=\"player-crm__chart\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"CRM график по дням\">" +
        "<g class=\"player-crm__chart-grid\">" + grid + "</g>" +
        "<g class=\"player-crm__chart-lines\">" + lines + "</g>" +
        "<line class=\"player-crm__chart-guide\" id=\"playerCrmChartGuideLine\" x1=\"" + padL + "\" y1=\"" + padT + "\" x2=\"" + padL + "\" y2=\"" + (padT + plotH) + "\" hidden=\"hidden\" />" +
        "<g class=\"player-crm__chart-hover\">" + hoverBands + "</g>" +
        "<g class=\"player-crm__chart-ticks\">" + ticks + "</g>" +
      "</svg></div>" +
      "<div class=\"player-crm__chart-tooltip\" id=\"playerCrmChartTooltip\" hidden></div>" +
      "<div class=\"player-crm__chart-toggles\">" + legend + "</div>" +
      renderChartSummary(chart, series) +
    "</div>";
  }


  return {
    renderAnalytics: renderAnalytics,
    renderChartAnalytics: renderChartAnalytics,
    showChartTooltip: showChartTooltip,
    hideChartTooltip: hideChartTooltip
  };
}
