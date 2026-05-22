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
    var visitRows = summary ? players : periodPlayers;
    var visitTotal = visitsSummary ? Number(visitsSummary.total) || 0 : visitRows.reduce(function (sum, p) { return sum + (Number(p && p.totals && p.totals.visits) || 0); }, 0);
    var visitUnique = visitsSummary ? Number(visitsSummary.unique) || 0 : visitRows.length;
    var visitNew = visitsSummary && visitsSummary.new != null
      ? Number(visitsSummary.new) || 0
      : players.filter(function (p) { return dateInSelectedPeriod(p && p.firstSeenAt); }).length;
    var visitRepeat = visitsSummary && visitsSummary.repeat != null ? Number(visitsSummary.repeat) || 0 : Math.max(0, visitTotal - visitUnique);
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
    var chat = state.chatStats || {};
    var chatPeriodHint = periodLabel();
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
    function periodOnly(row) {
      return intFmt(row && row.period);
    }
    var stats = [
      ["Посещений", visitTotal, periodLabel(), "visits"],
      ["Зарегано", statRegistrations, periodLabel(), "registrations"],
      ["Poker21", intFmt(statPokerPlus), "привязали · " + periodLabel(), "pokerplus"],
      ["Новые подписки на бот", statBotSubscribers, periodLabel(), "bot"],
      ["Новые push-подписки", statPushSubscribers, periodLabel(), "push"],
      ["Депозиты", money(statDeposits), periodLabel(), "deposits"],
    ];
    if (visitsUnavailableBeforeStart) stats = stats.filter(function (it) { return it[3] !== "visits"; });
    var chatStats = [
      ["Сообщений в главном чате", periodOnly(chat.generalMessages), chatPeriodHint, "generalMessages"],
      ["Личных диалогов", periodOnly(chat.personalDialogs), chatPeriodHint],
      ["Групповых чатов", periodOnly(chat.groupChats), chatPeriodHint],
      ["Диалогов у Ани", periodOnly(chat.managerDialogs && chat.managerDialogs.anna), chatPeriodHint, "anna"],
      ["Диалогов у Вики", periodOnly(chat.managerDialogs && chat.managerDialogs.vika), chatPeriodHint, "vika"],
      ["Все остальные диалоги", periodOnly(chat.managerDialogs && chat.managerDialogs.other), chatPeriodHint, "other"],
    ];
    function statCard(it) {
      var tone = it[3] || String(it[0] || "").toLowerCase().replace(/[^a-zа-я0-9]+/g, "-").replace(/^-|-$/g, "");
      var toneCls = tone ? " player-crm__stat--" + esc(tone) : "";
      if (it[3] === "visits") {
        return "<div class=\"player-crm__stat player-crm__stat--visits" + toneCls + "\"><span class=\"player-crm__stat-label\">Посещений</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid\">" +
            "<span class=\"player-crm__stat-mini-row\"><small>Посещений</small><strong>" + esc(intFmt(visitTotal)) + "</strong></span>" +
            "<button type=\"button\" data-crm-visits-modal><small>Пользователей</small><strong>" + esc(intFmt(visitUnique)) + "</strong></button>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Из них новых</small><strong>" + esc(intFmt(visitNew)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Повторные</small><strong>" + esc(intFmt(visitRepeat)) + "</strong></span>" +
            "<button type=\"button\" data-crm-visits-sections-modal><small>Разделы</small><strong>Открыть</strong></button>" +
          "</span></div>";
      }
      if (it[3] === "registrations") {
        return "<div class=\"player-crm__stat player-crm__stat--registration" + toneCls + "\"><span class=\"player-crm__stat-label\">Зарегано</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(intFmt(statRegistrations)) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid\">" +
            "<button type=\"button\" data-crm-registrations-modal=\"telegram\"><small>Только Telegram</small><strong>" + esc(intFmt(registrationTelegramOnlyCount)) + "</strong></button>" +
            "<button type=\"button\" data-crm-registrations-modal=\"email\"><small>Только email</small><strong>" + esc(intFmt(registrationEmailOnlyCount)) + "</strong></button>" +
            "<button type=\"button\" data-crm-registrations-modal=\"both\"><small>И то и то</small><strong>" + esc(intFmt(registrationBothCount)) + "</strong></button>" +
          "</span></div>";
      }
      if (it[3] === "pokerplus") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.pokerPlusModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-pokerplus-modal><span class=\"player-crm__stat-label\">Poker21</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid player-crm__stat-mini-grid--flow\">" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--plus\"><small>Новые привязали</small><strong>+" + esc(intFmt(statPokerPlus)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--minus\"><small>Отвязали</small><strong>−" + esc(intFmt(statPokerPlusUnlinked)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Итого за период</small><strong>" + esc(intFmt(statPokerPlusNet)) + "</strong></span>" +
          "</span></button>";
      }
      if (it[3] === "generalMessages") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.generalMessagesModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-general-messages-modal><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "bot") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.botModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-bot-modal><span class=\"player-crm__stat-label\">Новые подписки на бот</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid player-crm__stat-mini-grid--flow\">" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--plus\"><small>Подписки</small><strong>+" + esc(intFmt(statBotSubscribers)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--minus\"><small>Отписки</small><strong>−" + esc(intFmt(statBotUnsubscribers)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Итого</small><strong>" + esc(intFmt(statBotNet)) + "</strong></span>" +
          "</span></button>";
      }
      if (it[3] === "push") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.pushModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-push-modal><span class=\"player-crm__stat-label\">Новые push-подписки</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid player-crm__stat-mini-grid--flow\">" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--plus\"><small>Подписки</small><strong>+" + esc(intFmt(statPushSubscribers)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row player-crm__stat-mini-row--minus\"><small>Отписки</small><strong>−" + esc(intFmt(statPushUnsubscribers)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Итого</small><strong>" + esc(intFmt(statPushNet)) + "</strong></span>" +
          "</span></button>";
      }
      if (it[3] === "deposits") {
        return "<div class=\"player-crm__stat" + toneCls + "\"><span class=\"player-crm__stat-label\">Депозиты</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid player-crm__stat-mini-grid--flow\">" +
            "<span class=\"player-crm__stat-mini-row\"><small>Сумма</small><strong>" + esc(money(statDeposits)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Количество</small><strong>" + esc(intFmt(statDepositCount)) + "</strong></span>" +
          "</span></div>";
      }
      var tag = it[3] ? "button" : "div";
      var typeAttr = it[3] ? " type=\"button\"" : "";
      var managerAttr = it[3] ? " data-crm-manager-dialogs=\"" + esc(it[3]) + "\"" : "";
      var activeCls = it[3] && state.chatDialogManager === it[3] ? " player-crm__stat--active" : "";
      return "<" + tag + typeAttr + " class=\"player-crm__stat" + toneCls + activeCls + "\"" + managerAttr + "><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
        (it[2] ? "<span class=\"player-crm__stat-hint\">" + esc(it[2]) + "</span>" : "") +
        "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></" + tag + ">";
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
      "<div class=\"player-crm__stats-grid\">" + stats.map(statCard).join("") + "</div>" +
      "<section class=\"player-crm__stats-section\" aria-label=\"Чатовые показатели\">" +
        "<div class=\"player-crm__stats-section-head\"><h3>Чат</h3><span>" + esc(periodLabel()) + "</span></div>" +
        (state.heavyLoading && !state.chatStats
          ? "<div class=\"player-crm__notice player-crm__notice--loading\">Загружаем чатовую статистику…</div>"
          : "<div class=\"player-crm__stats-grid player-crm__stats-grid--chat\">" + chatStats.map(statCard).join("") + "</div>") +
      "</section>";
    var anaPeriod = document.getElementById("playerCrmAnalyticsPeriod");
    if (anaPeriod) anaPeriod.textContent = chartPeriodLabel();
    return { active: players.length, botSubscribers: botSubscribers, pushSubscribers: pushSubscribers, deposits: deposits, messages: messages };
  }

  return {
    renderStats: renderStats,
  };
}
