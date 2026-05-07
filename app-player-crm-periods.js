function initPlayerCrmPeriodSegmentsRuntime(deps) {
  deps = deps || {};
  var state = deps.state || {};
  var esc = deps.esc || function (value) { return String(value == null ? "" : value); };
  var isoDate = deps.isoDate || function (value) { return String(value || ""); };
  var localDateKey = deps.localDateKey || function (value) { return String(value || "").slice(0, 10); };
  var dateOnly = deps.dateOnly || function (value) { return String(value || "").slice(0, 10); };

  function setDefaultDates() {
    var to = new Date();
    var from = new Date();
    from.setDate(from.getDate() - 29);
    if (!state.dateTo) state.dateTo = isoDate(to);
    if (!state.dateFrom) state.dateFrom = isoDate(from);
  }

  function setDefaultChartDates() {
    var to = new Date();
    var from = new Date();
    from.setDate(from.getDate() - 29);
    if (!state.chartDateTo) state.chartDateTo = isoDate(to);
    if (!state.chartDateFrom) state.chartDateFrom = isoDate(from);
  }

  function normalizeDateRange(changed) {
    if (!state.dateFrom || !state.dateTo) return;
    if (state.dateFrom <= state.dateTo) return;
    if (changed === "from") state.dateTo = state.dateFrom;
    else state.dateFrom = state.dateTo;
  }

  function normalizeChartDateRange(changed) {
    if (!state.chartDateFrom || !state.chartDateTo) return;
    if (state.chartDateFrom <= state.chartDateTo) return;
    if (changed === "from") state.chartDateTo = state.chartDateFrom;
    else state.chartDateFrom = state.chartDateTo;
  }

  function periodKey() {
    if (state.period === "all") return "all";
    return state.period === "custom" ? "custom" : String(state.period || "30");
  }

  function periodText(key) {
    if (key === "today") return "сегодня";
    if (key === "yesterday") return "вчера";
    if (key === "month_2026_02") return "февраль";
    if (key === "month_2026_03") return "март";
    if (key === "month_2026_04") return "апрель";
    if (key === "month_2026_05") return "май";
    if (key === "period_2026_02_04") return "февраль — апрель";
    if (key === "current_week") return "текущая неделя";
    if (key === "last_week") return "прошлая неделя";
    if (key === "current_month") return "текущий месяц";
    if (key === "last_month") return "прошлый месяц";
    return "";
  }

  function periodLabel() {
    if (state.period === "all") return "за все время";
    if (state.period === "custom") {
      return state.dateFrom && state.dateTo ? state.dateFrom + " — " + state.dateTo : "выбранные даты";
    }
    var text = periodText(state.period);
    if (text) return text;
    return state.period + " дней";
  }

  function displayDate(iso) {
    var parts = String(iso || "").split("-");
    if (parts.length !== 3) return String(iso || "");
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  function periodRangeLabel() {
    if (state.period === "all") return "Весь период";
    var range = selectedPeriodRange();
    if (!range || !range.from || !range.to) return "";
    return displayDate(range.from) + " — " + displayDate(range.to);
  }

  function fixedPeriodRange(key) {
    var ranges = {
      month_2026_02: { from: "2026-02-01", to: "2026-02-28" },
      month_2026_03: { from: "2026-03-01", to: "2026-03-31" },
      month_2026_04: { from: "2026-04-01", to: "2026-04-30" },
      month_2026_05: { from: "2026-05-01", to: "2026-05-31" },
      period_2026_02_04: { from: "2026-02-01", to: "2026-04-30" },
    };
    return ranges[key] || null;
  }

  function selectedPeriodRange() {
    if (state.period === "all") return null;
    if (state.period === "custom") {
      return state.dateFrom && state.dateTo ? { from: state.dateFrom, to: state.dateTo } : null;
    }
    var fixed = fixedPeriodRange(state.period);
    if (fixed) return fixed;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (state.period === "today") {
      return { from: localDateKey(today), to: localDateKey(today) };
    }
    if (state.period === "yesterday") {
      var yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return { from: localDateKey(yesterday), to: localDateKey(yesterday) };
    }
    if (state.period === "current_week") {
      var day = today.getDay() || 7;
      var currentWeekFrom = new Date(today);
      currentWeekFrom.setDate(today.getDate() - day + 1);
      return { from: localDateKey(currentWeekFrom), to: localDateKey(today) };
    }
    if (state.period === "last_week") {
      var lastDay = today.getDay() || 7;
      var lastWeekTo = new Date(today);
      lastWeekTo.setDate(today.getDate() - lastDay);
      var lastWeekFrom = new Date(lastWeekTo);
      lastWeekFrom.setDate(lastWeekTo.getDate() - 6);
      return { from: localDateKey(lastWeekFrom), to: localDateKey(lastWeekTo) };
    }
    if (state.period === "current_month") {
      return { from: localDateKey(new Date(today.getFullYear(), today.getMonth(), 1)), to: localDateKey(today) };
    }
    if (state.period === "last_month") {
      return {
        from: localDateKey(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        to: localDateKey(new Date(today.getFullYear(), today.getMonth(), 0)),
      };
    }
    var days = Math.max(1, Number(state.period) || 30);
    var from = new Date(today);
    from.setDate(today.getDate() - days + 1);
    return { from: localDateKey(from), to: localDateKey(today) };
  }

  function dateInSelectedPeriod(iso) {
    if (state.period === "all") return true;
    var range = selectedPeriodRange();
    var d = dateOnly(iso);
    return !!(range && d && d >= range.from && d <= range.to);
  }

  function playersInSelectedPeriodByDate(field) {
    return (Array.isArray(state.players) ? state.players : []).filter(function (p) {
      return dateInSelectedPeriod(p && p[field]);
    });
  }

  function chartPeriodLabel() {
    if (state.chartPeriod === "all") return "за все время";
    if (state.chartPeriod === "custom") {
      return state.chartDateFrom && state.chartDateTo ? state.chartDateFrom + " — " + state.chartDateTo : "выбранные даты";
    }
    var text = periodText(state.chartPeriod);
    if (text) return text;
    return state.chartPeriod + " дней";
  }

  function periodOptionsHtml(current) {
    var options = [
      ["all", "За все время"],
      ["custom", "Даты"],
      ["today", "Сегодня"],
      ["yesterday", "Вчера"],
      ["month_2026_02", "Февраль"],
      ["month_2026_03", "Март"],
      ["month_2026_04", "Апрель"],
      ["month_2026_05", "Май"],
      ["period_2026_02_04", "Февраль — апрель"],
      ["last_month", "Прошлый месяц"],
      ["current_month", "Текущий месяц"],
      ["last_week", "Прошлая неделя"],
      ["current_week", "Текущая неделя"],
      ["90", "90 дней"],
      ["30", "30 дней"],
      ["7", "7 дней"],
    ];
    return options.map(function (it) {
      return "<option value=\"" + esc(it[0]) + "\"" + (String(current || "30") === it[0] ? " selected" : "") + ">" + esc(it[1]) + "</option>";
    }).join("");
  }

  function renderModalPeriodControls() {
    var showDates = state.period === "custom";
    return "<div class=\"player-crm__modal-period-row\" aria-label=\"Период модалки\">" +
      "<label class=\"player-crm__period\"><span>Период</span><select data-crm-modal-period>" + periodOptionsHtml(state.period || "30") + "</select></label>" +
      "<label class=\"player-crm__period player-crm__modal-date-field" + (showDates ? " player-crm__modal-date-field--visible" : "") + "\"><span>С</span><span class=\"player-crm__date-control\">" +
        "<input type=\"date\" inputmode=\"none\" value=\"" + esc(state.dateFrom || "") + "\" max=\"" + esc(state.dateTo || "") + "\" data-crm-modal-date-from />" +
        "<button type=\"button\" class=\"player-crm__date-picker-btn\" data-crm-modal-date-picker=\"from\" aria-label=\"Выбрать дату начала\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z\"></path></svg></button>" +
      "</span></label>" +
      "<label class=\"player-crm__period player-crm__modal-date-field" + (showDates ? " player-crm__modal-date-field--visible" : "") + "\"><span>По</span><span class=\"player-crm__date-control\">" +
        "<input type=\"date\" inputmode=\"none\" value=\"" + esc(state.dateTo || "") + "\" min=\"" + esc(state.dateFrom || "") + "\" data-crm-modal-date-to />" +
        "<button type=\"button\" class=\"player-crm__date-picker-btn\" data-crm-modal-date-picker=\"to\" aria-label=\"Выбрать дату окончания\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z\"></path></svg></button>" +
      "</span></label>" +
    "</div>";
  }

  function periodData(p) {
    var k = periodKey();
    return {
      deposits: p.deposits && p.deposits[k] != null ? p.deposits[k] : 0,
      depositCount: p.depositCount && p.depositCount[k] != null ? p.depositCount[k] : 0,
      messages: p.messages && p.messages[k] != null ? p.messages[k] : 0,
    };
  }

  var segments = [
    { key: "all", label: "Все", desc: "Вся живая база CRM.", match: function () { return true; } },
    { key: "has_bot", label: "Подписан на бот", desc: "Игрок связан с Telegram-ботом и доступен для бот-рассылки.", match: function (p) { return !!(p.channels && p.channels.bot); } },
    { key: "has_deposit", label: "Есть депозит", desc: "Есть депозит в CRM-журнале за выбранный период.", match: function (p) { return periodData(p).deposits > 0; } },
    { key: "active_30", label: "Активность CRM", desc: "Есть депозит или сообщение в CRM за выбранный период.", match: function (p) { var pd = periodData(p); return pd.deposits > 0 || pd.messages > 0; } },
    { key: "has_push", label: "Есть push", desc: "Можно достать игрока push-уведомлением.", match: function (p) { return !!(p.channels && p.channels.push); } },
  ];

  function hasTag(p, tag) {
    return (p.tags || []).map(function (t) { return String(t).toLowerCase(); }).indexOf(String(tag).toLowerCase()) >= 0;
  }

  function segmentByKey(key) {
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].key === key) return segments[i];
    }
    return segments[0];
  }

  function segmentPlayers(key) {
    var seg = segmentByKey(key);
    return state.players.filter(function (p) {
      return !seg || seg.match(p);
    });
  }

  function filteredPlayers() {
    var q = String(state.search || "").trim().toLowerCase();
    return segmentPlayers(state.filter).filter(function (p) {
      if (!q) return true;
      var hay = [p.name, p.handle, p.source, p.manager, p.note].concat(p.tags || []).join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  function sortForWork(a, b) {
    function score(p) {
      var s = 0;
      if (!(p.channels && (p.channels.bot || p.channels.push))) s += 35;
      if (hasTag(p, "VIP")) s += 25;
      if (p.lastTouchDays == null || Number(p.lastTouchDays) >= 7) s += 20;
      s -= Math.min(20, p.lastReplyDays || 0);
      return s;
    }
    return score(b) - score(a);
  }


  return {
    setDefaultDates: setDefaultDates,
    setDefaultChartDates: setDefaultChartDates,
    normalizeDateRange: normalizeDateRange,
    normalizeChartDateRange: normalizeChartDateRange,
    periodKey: periodKey,
    periodLabel: periodLabel,
    periodRangeLabel: periodRangeLabel,
    fixedPeriodRange: fixedPeriodRange,
    selectedPeriodRange: selectedPeriodRange,
    dateInSelectedPeriod: dateInSelectedPeriod,
    playersInSelectedPeriodByDate: playersInSelectedPeriodByDate,
    chartPeriodLabel: chartPeriodLabel,
    periodOptionsHtml: periodOptionsHtml,
    renderModalPeriodControls: renderModalPeriodControls,
    periodData: periodData,
    segments: segments,
    segmentByKey: segmentByKey,
    segmentPlayers: segmentPlayers,
    filteredPlayers: filteredPlayers,
    sortForWork: sortForWork
  };
}
