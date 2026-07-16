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
  var selectedPeriodRange = deps.selectedPeriodRange || function () { return null; };
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
    var audienceSummary = summary && summary.audience && typeof summary.audience === "object" ? summary.audience : null;
    var confirmedAudience = audienceSummary ? Number(audienceSummary.confirmed) || 0 : 0;
    var activeAnonymousInstallations = audienceSummary ? Number(audienceSummary.activeAnonymousInstallations) || 0 : 0;
    var estimatedRealAudience = audienceSummary ? Number(audienceSummary.estimatedReal) || 0 : confirmedAudience + activeAnonymousInstallations;
    var visitsSummary = summary && summary.visits && typeof summary.visits === "object" ? summary.visits : null;
    var exactVisits = !!(visitsSummary && visitsSummary.exact);
    var analyticsSummary = summary && summary.analytics && typeof summary.analytics === "object" ? summary.analytics : null;
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
    var firstVisitDateFullLabel = visibleFirstVisitDate && visibleFirstVisitDate.length >= 10
      ? visibleFirstVisitDate.slice(8, 10) + "." + visibleFirstVisitDate.slice(5, 7) + "." + visibleFirstVisitDate.slice(0, 4)
      : visibleFirstVisitDate;
    var exactTrackingNotice = exactVisits && firstVisitDateFullLabel
      ? "<div class=\"player-crm__notice" + (visitsIncomplete ? " player-crm__notice--warning" : "") + "\">Точная аналитика ведётся с " + esc(firstVisitDateFullLabel) + "." +
        (visitsIncomplete ? " Более ранние технические счётчики не включены." : "") + "</div>"
      : "";
    var periodWarning = summary && summary.historicalDataIncomplete && !exactVisits
      ? "<div class=\"player-crm__notice player-crm__notice--warning\">" +
        (visitsUnavailableBeforeStart && firstVisitDateLabel
          ? "Дневная статистика посещений начинается с " + esc(firstVisitDateLabel) + ", поэтому за " + esc(periodLabel()) + " дневные посещения не показываются. Общие данные за всё время остаются в периоде «За все время»."
          : visitsIncomplete && firstVisitDateLabel
          ? "За " + esc(periodLabel()) + " дневная история посещений начинается с " + esc(firstVisitDateLabel) + ", поэтому показаны только учтённые дневные посещения, а не полный месяц."
          : "За " + esc(periodLabel()) + " нет исторических дневных данных по части счётчиков, поэтому дашборд показывает нули только по датированным событиям этого периода.") +
        "</div>"
      : "";
    var dailyPokerSource = state.dailyPokerStats && typeof state.dailyPokerStats === "object" ? state.dailyPokerStats : null;
    var dailyPokerStats = dailyPokerSource;
    var dailyPokerDebitedUsers = dailyPokerSource && Array.isArray(dailyPokerSource.debitedUsers) ? dailyPokerSource.debitedUsers.slice() : [];
    if (dailyPokerSource && state.period !== "all") {
      var dailyRange = selectedPeriodRange();
      var dailyUsers = {};
      var dailySpins = 0;
      var dailyBonusAmount = 0;
      var dailyDebitedAmount = 0;
      var debitAmountsByUser = {};
      (Array.isArray(dailyPokerSource.daily) ? dailyPokerSource.daily : []).forEach(function (row) {
        var date = String(row && row.date || "");
        if (!dailyRange || date < dailyRange.from || date > dailyRange.to) return;
        (Array.isArray(row.userIds) ? row.userIds : []).forEach(function (id) { dailyUsers[String(id)] = true; });
        dailySpins += Math.max(0, Number(row.totalSpins) || 0);
        dailyBonusAmount += Math.max(0, Number(row.bonusAmount) || 0);
      });
      (Array.isArray(dailyPokerSource.dailyDebits) ? dailyPokerSource.dailyDebits : []).forEach(function (row) {
        var date = String(row && row.date || "");
        if (!dailyRange || date < dailyRange.from || date > dailyRange.to) return;
        dailyDebitedAmount += Math.max(0, Number(row.amount) || 0);
        var userId = String(row && row.userId || "");
        if (userId) debitAmountsByUser[userId] = (debitAmountsByUser[userId] || 0) + Math.max(0, Number(row.amount) || 0);
      });
      var debitProfilesById = {};
      dailyPokerDebitedUsers.forEach(function (row) { debitProfilesById[String(row && (row.id || row.userId) || "")] = row; });
      dailyPokerDebitedUsers = Object.keys(debitAmountsByUser).map(function (userId) {
        return Object.assign({}, debitProfilesById[userId] || { id: userId, displayName: userId }, { amount: debitAmountsByUser[userId] });
      }).sort(function (a, b) { return Number(b.amount || 0) - Number(a.amount || 0); });
      dailyPokerStats = {
        uniquePlayers: Object.keys(dailyUsers).length,
        totalSpins: dailySpins,
        bonusAmount: dailyBonusAmount,
        debitedAmount: dailyDebitedAmount,
      };
    }
    function dailyPokerValue(key) {
      return dailyPokerStats ? intFmt(dailyPokerStats[key]) : "—";
    }
    function compactPeopleRows(rows, amountKey, heading) {
      rows = Array.isArray(rows) ? rows.filter(function (row) { return Number(row && row[amountKey]) > 0; }) : [];
      if (!rows.length) return [];
      var result = [[heading, ""]];
      rows.slice(0, 3).forEach(function (row) {
        result.push([String(row.displayName || row.name || row.telegramUsername || row.pokerPlusNickname || row.id || "Игрок"), money(row[amountKey])]);
      });
      if (rows.length > 3) result.push(["Ещё " + intFmt(rows.length - 3), ""]);
      return result;
    }
    var raffleStats = summary && summary.raffles && typeof summary.raffles === "object" ? summary.raffles : null;
    var raffleStatsAvailable = !!(raffleStats && raffleStats.available !== false);
    var guestConversionRate = exactVisits ? Math.max(0, Number(visitsSummary.guestConversionRate) || 0) : 0;
    var guestConversionText = exactVisits
      ? String(guestConversionRate).replace(".", ",") + "%"
      : "—";
    var sessionsBeforeRegistrationText = exactVisits
      ? String(Math.max(0, Number(visitsSummary.averageSessionsBeforeRegistration) || 0)).replace(".", ",")
      : "—";
    var sessionsPerVisitorText = exactVisits && estimatedRealAudience
      ? String(Math.round((Math.max(0, Number(visitsSummary.total) || 0) / estimatedRealAudience) * 10) / 10).replace(".", ",")
      : "—";
    var periodMetrics = [
      [exactVisits ? "Уникальные посетители · " + periodLabel() : "Аудитория · оценка · " + periodLabel(), intFmt(estimatedRealAudience), null, "audience", [
        ["Из них зарегано", intFmt(confirmedAudience)],
        ["Гости", intFmt(activeAnonymousInstallations)],
        ["Новые пользователи", exactVisits ? intFmt(visitsSummary.new) : "—"],
        ["Открытий на человека", sessionsPerVisitorText],
        ["Гость → регистрация", guestConversionText],
        ["Сессий до регистрации", sessionsBeforeRegistrationText],
      ]],
      ["Зарегано · всего", intFmt(statRegistrations), null, "registration", [
        ["Только Telegram", intFmt(registrationTelegramOnlyCount), "data-crm-registrations-modal=\"telegram\""],
        ["Только email", intFmt(registrationEmailOnlyCount), "data-crm-registrations-modal=\"email\""],
        ["И Telegram, и email", intFmt(registrationBothCount), "data-crm-registrations-modal=\"both\""],
      ]],
      ["Poker21", intFmt(statPokerPlusNet), "data-crm-pokerplus-modal", "engagement", [
        ["Привязки", "+" + intFmt(statPokerPlus), null, "positive"],
        ["Отвязки", "−" + intFmt(statPokerPlusUnlinked), null, "negative"],
        ["Итого", intFmt(statPokerPlusNet), null, "total"],
      ]],
      ["Бот", intFmt(statBotNet), "data-crm-bot-modal", "engagement", [
        ["Подписки", "+" + intFmt(statBotSubscribers), null, "positive"],
        ["Отписки", "−" + intFmt(statBotUnsubscribers), null, "negative"],
        ["Итого", intFmt(statBotNet), null, "total"],
      ]],
      ["Push", intFmt(statPushNet), "data-crm-push-modal", "engagement", [
        ["Подписки", "+" + intFmt(statPushSubscribers), null, "positive"],
        ["Отписки", "−" + intFmt(statPushUnsubscribers), null, "negative"],
        ["Итого", intFmt(statPushNet), null, "total"],
      ]],
      ["Крутка дня", dailyPokerValue("uniquePlayers"), "data-crm-daily-poker-modal", "activity", [
        ["Уникальных", dailyPokerValue("uniquePlayers")],
        ["Всего", dailyPokerValue("totalSpins")],
        ["Бонусов начислено", dailyPokerStats ? money(dailyPokerStats.bonusAmount) : "—"],
        ["Бонусов списано", dailyPokerStats ? money(dailyPokerStats.debitedAmount) : "—"],
      ].concat(compactPeopleRows(dailyPokerDebitedUsers, "amount", "Кем списано"))],
      ["Розыгрыши", raffleStatsAvailable ? intFmt(raffleStats.uniqueParticipants) : "—", "data-crm-raffles-modal", "activity", [
        ["Уникальных участников", raffleStatsAvailable ? intFmt(raffleStats.uniqueParticipants) : "—"],
        ["Уникальных победителей", raffleStatsAvailable ? intFmt(raffleStats.uniqueWinners) : "—"],
        ["Выиграно и выдано", raffleStatsAvailable ? money(raffleStats.issuedPrizeAmount) : "—"],
        ["Кеш", raffleStatsAvailable ? money(raffleStats.issuedCashAmount) : "—"],
        ["Билеты", raffleStatsAvailable ? money(raffleStats.issuedTicketAmount) : "—"],
      ].concat(compactPeopleRows(raffleStatsAvailable ? raffleStats.issuedRecipients : [], "totalAmount", "Кем выдано"))],
    ];
    function periodMetricRow(it) {
      var tag = it[2] ? "button" : "div";
      var typeAttr = it[2] ? " type=\"button\"" : "";
      var actionAttr = it[2] ? " " + it[2] : "";
      var toneCls = it[3] ? " player-crm__period-metric--" + it[3] : "";
      var layoutCls = it[5] ? " player-crm__period-metric--" + it[5] : "";
      var details = Array.isArray(it[4]) && it[4].length
        ? "<div class=\"player-crm__period-metric-details\">" + it[4].map(function (row) {
            var detailTag = row[2] ? "button" : "span";
            var detailType = row[2] ? " type=\"button\"" : "";
            var detailAction = row[2] ? " " + row[2] : "";
            var detailCls = row[3] ? " class=\"player-crm__period-metric-detail--" + esc(row[3]) + "\"" : "";
            return "<" + detailTag + detailType + detailCls + detailAction + ">" + esc(row[0]) + " <b>" + esc(row[1]) + "</b></" + detailTag + ">";
          }).join("") + "</div>"
        : "";
      var detailsCls = details ? " player-crm__period-metric--has-details" : "";
      return "<" + tag + typeAttr + " class=\"player-crm__period-metric" + toneCls + layoutCls + detailsCls + "\"" + actionAttr + ">" +
        "<span>" + esc(it[0]) + "</span><strong>" + esc(it[1]) + "</strong>" + details + "</" + tag + ">";
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
        "<div class=\"player-crm__stats-grid player-crm__stats-grid--current\" style=\"display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;width:100%!important;min-width:0!important\">" + currentStats.map(currentCard).join("") + "</div>" +
      "</section>";
    var analyticsLabels = {
      home: "Главная", raffles: "Розыгрыши", rating: "Рейтинг", chat: "Чат", profile: "Профиль",
      "daily-poker": "Крутка дня", "sng-champions": "SNG", "private-cash": "Приватный кеш",
      raffle_joined: "Участие в розыгрышах", daily_poker_spin: "Крутка дня", sng_joined: "Заявки SNG",
      private_cash_applied: "Заявки в приватный кеш", club_choice_voted: "Голосование клуба",
      poker21_linked: "Привязка Poker21", subscription_enabled: "Подписки", push_enabled: "Push",
    };
    function analyticsTable(title, rows) {
      rows = Array.isArray(rows) ? rows.slice(0, 20) : [];
      if (!rows.length) return "";
      return "<section class=\"player-crm__analytics-breakdown\"><h3>" + esc(title) + "</h3>" +
        "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__analytics-table\"><thead><tr>" +
        "<th>Раздел / действие</th><th>Гости</th><th>Зарегистрированные</th><th>Уникальные</th><th>Действия</th>" +
        "</tr></thead><tbody>" + rows.map(function (row) {
          return "<tr><td>" + esc(analyticsLabels[row.name] || row.name || "—") + "</td>" +
            "<td>" + esc(intFmt(row.guestInstallations)) + "</td><td>" + esc(intFmt(row.registeredVisitors)) + "</td>" +
            "<td>" + esc(intFmt(row.uniqueVisitors)) + "</td><td>" + esc(intFmt(row.events)) + "</td></tr>";
        }).join("") + "</tbody></table></div></section>";
    }
    var journeyTables = analyticsSummary && analyticsSummary.available
      ? analyticsTable("Куда заходили", analyticsSummary.sections) + analyticsTable("В чём участвовали", analyticsSummary.activities)
      : "";
    if (currentEl) currentEl.innerHTML = currentSection;
    el.innerHTML =
      exactTrackingNotice +
      periodWarning +
      (currentEl ? "" : currentSection) +
      "<div class=\"player-crm__period-metrics player-crm__period-metrics--three\" style=\"display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;width:100%!important;min-width:0!important\" aria-label=\"Показатели за выбранный период\">" + periodMetrics.map(periodMetricRow).join("") + "</div>" +
      journeyTables;
    var anaPeriod = document.getElementById("playerCrmAnalyticsPeriod");
    if (anaPeriod) anaPeriod.textContent = chartPeriodLabel();
    return { active: players.length, botSubscribers: botSubscribers, pushSubscribers: pushSubscribers, deposits: deposits, messages: messages };
  }

  return {
    renderStats: renderStats,
  };
}
