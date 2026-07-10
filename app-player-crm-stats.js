function initPlayerCrmStatsRuntime(deps) {
  deps = deps || {};
  var state = deps.state || {};
  var esc = deps.esc || function (value) { return String(value == null ? "" : value); };
  var intFmt = deps.intFmt || function (value) { return String(value == null ? 0 : value); };
  var money = deps.money || intFmt;
  var periodData = deps.periodData || function () { return { deposits: 0, messages: 0 }; };
  var periodLabel = deps.periodLabel || function () { return ""; };
  var chartPeriodLabel = deps.chartPeriodLabel || periodLabel;
  var dateInSelectedPeriod = deps.dateInSelectedPeriod || function () { return true; };
  var playersInSelectedPeriodByDate = deps.playersInSelectedPeriodByDate || function () { return []; };
  var registrationRowsByMethod = deps.registrationRowsByMethod || function () { return []; };

  function renderStats() {
    var el = document.getElementById("playerCrmStats");
    var currentEl = document.getElementById("playerCrmCurrentStats");
    if (!el) return null;
    if (state.loading && state.loadingScope !== "chart") {
      if (currentEl) currentEl.innerHTML = "";
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка данных…</div>";
      return null;
    }
    if (state.crmError) {
      if (currentEl) currentEl.innerHTML = "";
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">" + esc(state.crmError) + "</div>";
      return null;
    }
    var players = Array.isArray(state.players) ? state.players : [];
    var pd = players.map(periodData);
    var deposits = pd.reduce(function (sum, x) { return sum + x.deposits; }, 0);
    var messages = pd.reduce(function (sum, x) { return sum + x.messages; }, 0);
    var summary = state.statsSummary && typeof state.statsSummary === "object" ? state.statsSummary : null;
    var summaryRegistrationCounts = summary && summary.registrationCounts && typeof summary.registrationCounts === "object" ? summary.registrationCounts : null;
    var periodPlayers = playersInSelectedPeriodByDate("registeredAt");
    function hasPeriodDate(value) {
      return !!value && dateInSelectedPeriod(value);
    }
    var botSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.bot) && dateInSelectedPeriod(p.botSubscribedAt); }).length;
    var pushSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.push) && dateInSelectedPeriod(p.pushSubscribedAt); }).length;
    var botUnsubscribers = players.filter(function (p) { return !(p && p.channels && p.channels.bot) && hasPeriodDate(p && p.botUnsubscribedAt); }).length;
    var pushUnsubscribers = players.filter(function (p) { return !(p && p.channels && p.channels.push) && hasPeriodDate(p && p.pushUnsubscribedAt); }).length;
    var registrations = (Array.isArray(state.registeredAccounts) ? state.registeredAccounts : []).filter(function (row) { return dateInSelectedPeriod(row && row.linkedAt); });
    var pokerPlusPeriodRows = (Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : []).filter(function (row) { return dateInSelectedPeriod(row && row.linkedAt); });
    var registrationEmailOnlyCount = registrationRowsByMethod("email").length;
    var registrationTelegramOnlyCount = registrationRowsByMethod("telegram").length;
    var registrationBothCount = registrationRowsByMethod("both").length;
    var statPlayers = summary ? Number(summary.players) || 0 : periodPlayers.length;
    var visitsSummary = summary && summary.visits && typeof summary.visits === "object" ? summary.visits : null;
    var statRegistrations = summary ? Number(summary.registrations) || 0 : registrations.length;
    var statPokerPlus = summary ? Number(summary.pokerPlus) || 0 : pokerPlusPeriodRows.length;
    var statPokerPlusUnlinked = summary ? Number(summary.pokerPlusUnlinked) || 0 : 0;
    var statPokerPlusNet = statPokerPlus - statPokerPlusUnlinked;
    var statBotSubscribers = summary ? Number(summary.bot) || 0 : botSubscribers;
    var statPushSubscribers = summary ? Number(summary.push) || 0 : pushSubscribers;
    var statBotUnsubscribers = summary ? Number(summary.botUnsub) || 0 : botUnsubscribers;
    var statPushUnsubscribers = summary ? Number(summary.pushUnsub) || 0 : pushUnsubscribers;
    var statBotNet = summary && summary.botNet != null ? Number(summary.botNet) || 0 : statBotSubscribers - statBotUnsubscribers;
    var statPushNet = summary && summary.pushNet != null ? Number(summary.pushNet) || 0 : statPushSubscribers - statPushUnsubscribers;
    var statDeposits = summary ? Number(summary.deposits) || 0 : deposits;
    var statDepositCount = summary && summary.depositCount != null ? Number(summary.depositCount) || 0 : pd.reduce(function (sum, x) { return sum + (Number(x.depositCount) || 0); }, 0);
    var current = summary && summary.current && typeof summary.current === "object" ? summary.current : null;
    function currentValue(key, fallback) {
      return current && current[key] != null ? Number(current[key]) || 0 : fallback;
    }
    var currentStats = [
      ["В базе", currentValue("players", players.length), "сейчас", "base"],
      ["Зарегано всего", currentValue("registered", Array.isArray(state.registeredAccounts) ? state.registeredAccounts.length : 0), "сейчас", "registered-total"],
      ["Poker21 всего", currentValue("pokerPlus", Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts.length : 0), "сейчас", "pokerplus-total"],
      ["Bot доступен", currentValue("botReach", players.filter(function (p) { return !!(p.channels && p.channels.bot); }).length), "сейчас", "bot-reach"],
      ["Push доступен", currentValue("pushReach", players.filter(function (p) { return !!(p.channels && p.channels.push); }).length), "сейчас", "push-reach"],
    ];
    if (summaryRegistrationCounts) {
      registrationTelegramOnlyCount = Number(summaryRegistrationCounts.telegram) || 0;
      registrationEmailOnlyCount = Number(summaryRegistrationCounts.email) || 0;
      registrationBothCount = Number(summaryRegistrationCounts.both) || 0;
    }
    var visitsIncomplete = visitsSummary && visitsSummary.incomplete;
    var visitsUnavailableBeforeStart = visitsSummary && visitsSummary.unavailableBeforeStart;
    var firstVisitDate = visitsSummary && visitsSummary.firstTrackedDate ? String(visitsSummary.firstTrackedDate) : "";
    var globalFirstVisitDate = visitsSummary && visitsSummary.globalFirstTrackedDate ? String(visitsSummary.globalFirstTrackedDate) : "";
    var visibleFirstVisitDate = firstVisitDate || globalFirstVisitDate;
    var firstVisitDateLabel = visibleFirstVisitDate && visibleFirstVisitDate.length >= 10 ? visibleFirstVisitDate.slice(8, 10) + "." + visibleFirstVisitDate.slice(5, 7) : visibleFirstVisitDate;
    var periodWarning = summary && summary.historicalDataIncomplete
      ? "<div class=\"player-crm__notice player-crm__notice--warning\">" +
        (visitsUnavailableBeforeStart && firstVisitDateLabel
          ? "Дневная статистика посещений начинается с " + esc(firstVisitDateLabel) + ", поэтому за " + esc(periodLabel()) + " дневные посещения не показываются. Общие данные за всё время остаются в периоде «За все время»."
          : visitsIncomplete && firstVisitDateLabel
          ? "За " + esc(periodLabel()) + " дневная история посещений начинается с " + esc(firstVisitDateLabel) + ", поэтому показаны только учтённые дневные посещения, а не полный месяц."
          : "За " + esc(periodLabel()) + " нет исторических дневных данных по части счётчиков, поэтому дашборд показывает нули только по датированным событиям этого периода.") +
        "</div>"
      : "";
    var periodMetrics = [
      ["Зарегано · всего", intFmt(statRegistrations)],
      ["Зарегано · только Telegram", intFmt(registrationTelegramOnlyCount), "data-crm-registrations-modal=\"telegram\""],
      ["Зарегано · только email", intFmt(registrationEmailOnlyCount), "data-crm-registrations-modal=\"email\""],
      ["Зарегано · и Telegram, и email", intFmt(registrationBothCount), "data-crm-registrations-modal=\"both\""],
      ["Poker21 · новые привязки", "+" + intFmt(statPokerPlus), "data-crm-pokerplus-modal", "plus"],
      ["Poker21 · отвязали", "−" + intFmt(statPokerPlusUnlinked), "data-crm-pokerplus-modal", "minus"],
      ["Poker21 · итого за период", intFmt(statPokerPlusNet), "data-crm-pokerplus-modal"],
      ["Бот · подписки", "+" + intFmt(statBotSubscribers), "data-crm-bot-modal", "plus"],
      ["Бот · отписки", "−" + intFmt(statBotUnsubscribers), "data-crm-bot-modal", "minus"],
      ["Бот · итого", intFmt(statBotNet), "data-crm-bot-modal"],
      ["Push · подписки", "+" + intFmt(statPushSubscribers), "data-crm-push-modal", "plus"],
      ["Push · отписки", "−" + intFmt(statPushUnsubscribers), "data-crm-push-modal", "minus"],
      ["Push · итого", intFmt(statPushNet), "data-crm-push-modal"],
      ["Депозиты · сумма", money(statDeposits)],
      ["Депозиты · количество", intFmt(statDepositCount)],
    ];
    function periodMetricRow(it) {
      var tag = it[2] ? "button" : "div";
      var typeAttr = it[2] ? " type=\"button\"" : "";
      var actionAttr = it[2] ? " " + it[2] : "";
      var toneCls = it[3] ? " player-crm__period-metric--" + it[3] : "";
      return "<" + tag + typeAttr + " class=\"player-crm__period-metric" + toneCls + "\"" + actionAttr + ">" +
        "<span>" + esc(it[0]) + "</span><strong>" + esc(it[1]) + "</strong></" + tag + ">";
    }
    function currentCard(it) {
      var tone = it[3] || String(it[0] || "").toLowerCase().replace(/[^a-zа-я0-9]+/g, "-").replace(/^-|-$/g, "");
      var toneCls = tone ? " player-crm__stat--" + esc(tone) : "";
      return "<div class=\"player-crm__stat player-crm__stat--current" + toneCls + "\"><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
        "<span class=\"player-crm__stat-hint\">" + esc(it[2] || "сейчас") + "</span>" +
        "<span class=\"player-crm__stat-value\">" + esc(intFmt(it[1])) + "</span></div>";
    }
    var currentSection =
      "<section class=\"player-crm__stats-section\" aria-label=\"Текущее состояние\">" +
        "<div class=\"player-crm__stats-section-head\"><h3>За все время</h3><span>состояние базы</span></div>" +
        "<div class=\"player-crm__stats-grid player-crm__stats-grid--current\">" + currentStats.map(currentCard).join("") + "</div>" +
      "</section>";
    if (currentEl) currentEl.innerHTML = currentSection;
    el.innerHTML =
      periodWarning +
      (currentEl ? "" : currentSection) +
      "<div class=\"player-crm__period-metrics\" aria-label=\"Показатели за выбранный период\">" + periodMetrics.map(periodMetricRow).join("") + "</div>";
    var anaPeriod = document.getElementById("playerCrmAnalyticsPeriod");
    if (anaPeriod) anaPeriod.textContent = chartPeriodLabel();
    return { active: players.length, botSubscribers: botSubscribers, pushSubscribers: pushSubscribers, deposits: deposits, messages: messages };
  }

  return {
    renderStats: renderStats,
  };
}
