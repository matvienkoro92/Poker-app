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
    if (!el) return null;
    if (state.loading && state.loadingScope !== "chart") {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка данных…</div>";
      return null;
    }
    if (state.crmError) {
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
    var botSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.bot) && dateInSelectedPeriod(p.botSubscribedAt); }).length;
    var pushSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.push) && dateInSelectedPeriod(p.pushSubscribedAt); }).length;
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
    var statRegistrations = summary ? Number(summary.registrations) || 0 : registrations.length;
    var statPokerPlus = summary ? Number(summary.pokerPlus) || 0 : pokerPlusPeriodRows.length;
    var statBotSubscribers = summary ? Number(summary.bot) || 0 : botSubscribers;
    var statPushSubscribers = summary ? Number(summary.push) || 0 : pushSubscribers;
    var statDeposits = summary ? Number(summary.deposits) || 0 : deposits;
    if (summaryRegistrationCounts) {
      registrationTelegramOnlyCount = Number(summaryRegistrationCounts.telegram) || 0;
      registrationEmailOnlyCount = Number(summaryRegistrationCounts.email) || 0;
      registrationBothCount = Number(summaryRegistrationCounts.both) || 0;
    }
    var chat = state.chatStats || {};
    var pairHint = "Всего / за " + periodLabel();
    function pair(row) {
      return intFmt(row && row.total) + " / " + intFmt(row && row.period);
    }
    var stats = [
      ["Посещений", visitTotal, periodLabel(), "visits"],
      ["Зарегано", statRegistrations, periodLabel(), "registrations"],
      ["Poker21", intFmt(statPokerPlus), "привязали · " + periodLabel(), "pokerplus"],
      ["Новые подписки на бот", statBotSubscribers, periodLabel(), "bot"],
      ["Новые push-подписки", statPushSubscribers, periodLabel(), "push"],
      ["Депозиты", money(statDeposits), periodLabel()],
    ];
    var chatStats = [
      ["Сообщений в главном чате", pair(chat.generalMessages), pairHint, "generalMessages"],
      ["Личных диалогов", pair(chat.personalDialogs), pairHint],
      ["Групповых чатов", pair(chat.groupChats), pairHint],
      ["Диалогов у Ани", pair(chat.managerDialogs && chat.managerDialogs.anna), pairHint, "anna"],
      ["Диалогов у Вики", pair(chat.managerDialogs && chat.managerDialogs.vika), pairHint, "vika"],
      ["Все остальные диалоги", pair(chat.managerDialogs && chat.managerDialogs.other), pairHint, "other"],
    ];
    function statCard(it) {
      var tone = it[3] || String(it[0] || "").toLowerCase().replace(/[^a-zа-я0-9]+/g, "-").replace(/^-|-$/g, "");
      var toneCls = tone ? " player-crm__stat--" + esc(tone) : "";
      if (it[3] === "visits") {
        return "<div class=\"player-crm__stat player-crm__stat--visits" + toneCls + "\"><span class=\"player-crm__stat-label\">Посещений</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid\">" +
            "<span class=\"player-crm__stat-mini-row\"><small>Всего посещений</small><strong>" + esc(intFmt(visitTotal)) + "</strong></span>" +
            "<span class=\"player-crm__stat-mini-row\"><small>Уникальных пользователей</small><strong>" + esc(intFmt(visitUnique)) + "</strong></span>" +
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
          "<span class=\"player-crm__stat-hint\">привязали аккаунт</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "generalMessages") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.generalMessagesModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-general-messages-modal><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "bot") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.botModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-bot-modal><span class=\"player-crm__stat-label\">Новые подписки на бот</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "push") {
        return "<button type=\"button\" class=\"player-crm__stat" + toneCls + (state.pushModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-push-modal><span class=\"player-crm__stat-label\">Новые push-подписки</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      var tag = it[3] ? "button" : "div";
      var typeAttr = it[3] ? " type=\"button\"" : "";
      var managerAttr = it[3] ? " data-crm-manager-dialogs=\"" + esc(it[3]) + "\"" : "";
      var activeCls = it[3] && state.chatDialogManager === it[3] ? " player-crm__stat--active" : "";
      return "<" + tag + typeAttr + " class=\"player-crm__stat" + toneCls + activeCls + "\"" + managerAttr + "><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
        (it[2] ? "<span class=\"player-crm__stat-hint\">" + esc(it[2]) + "</span>" : "") +
        "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></" + tag + ">";
    }
    el.innerHTML =
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
