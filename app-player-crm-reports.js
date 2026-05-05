function initPlayerCrmReportsRuntime(deps) {
  deps = deps || {};
  var state = deps.state || {};
  var money = deps.money || function (value) { return String(value == null ? "" : value); };
  var intFmt = deps.intFmt || function (value) { return String(Number(value) || 0); };
  var periodLabel = deps.periodLabel || function () { return ""; };
  var chartPeriodLabel = deps.chartPeriodLabel || function () { return ""; };
  var periodData = deps.periodData || function () { return { deposits: 0, depositCount: 0, messages: 0 }; };
  var playersInSelectedPeriodByDate = deps.playersInSelectedPeriodByDate || function () { return []; };
  var dateInSelectedPeriod = deps.dateInSelectedPeriod || function () { return true; };
  var filteredPlayers = deps.filteredPlayers || function () { return []; };
  var segmentByKey = deps.segmentByKey || function (key) { return { key: key, label: key }; };
  var filteredRegistrations = deps.filteredRegistrations || function () { return []; };
  var registrationRowsByMethod = deps.registrationRowsByMethod || function () { return []; };
  var registrationTelegramLabel = deps.registrationTelegramLabel || function () { return ""; };
  var filteredPokerPlusAccounts = deps.filteredPokerPlusAccounts || function () { return []; };
  var dateOnly = deps.dateOnly || function (value) { return String(value || "").slice(0, 10); };
  var segmentPlayers = deps.segmentPlayers || function () { return []; };
  var segments = deps.segments || [];

  function channelLabel(channel) {
    if (channel === "push") return "push";
    if (channel === "bot_push") return "бот + push";
    return "бот";
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "readonly");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(ta);
    }
    return Promise.resolve();
  }

  function notifyCrmSend(message) {
    try {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.showAlert) {
        tg.showAlert(message);
        return;
      }
    } catch (eTgAlert) {}
    if (window.alert) window.alert(message);
  }

  function playerLine(p, idx) {
    return (idx + 1) + ". " + (p.name || p.handle || p.accountId || p.id || "—") +
      " · " + (p.handle || "без TG") +
      " · " + (p.source || "—");
  }

  function buildOverviewReport() {
    var players = Array.isArray(state.players) ? state.players : [];
    var pd = players.map(periodData);
    var deposits = pd.reduce(function (sum, x) { return sum + x.deposits; }, 0);
    var periodPlayers = playersInSelectedPeriodByDate("registeredAt");
    var registrations = (Array.isArray(state.registeredAccounts) ? state.registeredAccounts : []).filter(function (row) { return dateInSelectedPeriod(row && row.linkedAt); });
    var pokerPlusRows = (Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : []).filter(function (row) { return dateInSelectedPeriod(row && row.linkedAt); });
    var botSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.bot) && dateInSelectedPeriod(p.botSubscribedAt); }).length;
    var pushSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.push) && dateInSelectedPeriod(p.pushSubscribedAt); }).length;
    var chat = state.chatStats || {};
    return [
      "CRM · График",
      "Период данных: " + periodLabel(),
      "Период графика: " + chartPeriodLabel(),
      "",
      "Игроков в базе: " + intFmt(periodPlayers.length),
      "Зарегано: " + intFmt(registrations.length),
      "Poker21 привязали: " + intFmt(pokerPlusRows.length),
      "Новые подписки на бот: " + intFmt(botSubscribers),
      "Новые push-подписки: " + intFmt(pushSubscribers),
      "Депозиты: " + money(deposits),
      "Сообщений в главном чате: " + intFmt(chat.generalMessages && chat.generalMessages.period),
    ].join("\n");
  }

  function buildPlayersReport() {
    var rows = filteredPlayers();
    var visible = rows.slice(0, 15);
    return [
      "CRM · Игроки",
      "Период: " + periodLabel(),
      "Фильтр: " + (segmentByKey(state.filter).label || state.filter),
      "Найдено: " + intFmt(rows.length),
      "",
      visible.length ? visible.map(playerLine).join("\n") : "Список пуст.",
    ].join("\n");
  }

  function buildRegistrationsReport() {
    var rows = filteredRegistrations();
    var visible = rows.slice(0, 20);
    return [
      "CRM · Зарегистрированные",
      "Период: " + periodLabel(),
      "Показано: " + intFmt(rows.length),
      "Только Telegram: " + intFmt(registrationRowsByMethod("telegram").length),
      "Только email: " + intFmt(registrationRowsByMethod("email").length),
      "И то и то: " + intFmt(registrationRowsByMethod("both").length),
      "",
      visible.length ? visible.map(function (r, idx) {
        return (idx + 1) + ". " + (r.accountId || r.dtId || "—") +
          " · " + (registrationTelegramLabel(r) || "—") +
          " · " + (r.email || "—");
      }).join("\n") : "Список пуст.",
    ].join("\n");
  }

  function buildPokerPlusReport() {
    var rows = filteredPokerPlusAccounts();
    var visible = rows.slice(0, 20);
    return [
      "CRM · Poker21",
      "Период: " + periodLabel(),
      "Показано: " + intFmt(rows.length),
      "",
      visible.length ? visible.map(function (r, idx) {
        return (idx + 1) + ". " + (r.nickname || r.accountId || "—") +
          " · уровень " + (r.level || "—") +
          " · " + (dateOnly(r.linkedAt) || "без даты");
      }).join("\n") : "Список пуст.",
    ].join("\n");
  }

  function buildSegmentsReport() {
    return [
      "CRM · Сегменты",
      "Период: " + periodLabel(),
      "",
      segments.filter(function (s) { return s.key !== "all"; }).map(function (seg) {
        var players = segmentPlayers(seg.key);
        var dep = players.reduce(function (sum, p) { return sum + periodData(p).deposits; }, 0);
        return seg.label + ": " + intFmt(players.length) + " игроков · " + money(dep);
      }).join("\n"),
    ].join("\n");
  }

  function buildBroadcastReport() {
    var segEl = document.getElementById("playerCrmBroadcastSegment");
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var textEl = document.getElementById("playerCrmBroadcastText");
    var segment = segEl ? segEl.value : state.filter;
    var channel = channelEl ? channelEl.value : "bot";
    var players = segmentPlayers(segment);
    return [
      "CRM · Рассылка",
      "Группа: " + (segmentByKey(segment).label || segment),
      "Канал: " + channelLabel(channel),
      "Получателей: " + intFmt(players.length),
      "",
      "Текст:",
      String(textEl ? textEl.value : "").trim() || "—",
    ].join("\n");
  }

  function buildCrmSectionReport(section) {
    if (section === "players") return buildPlayersReport();
    if (section === "registrations") return buildRegistrationsReport();
    if (section === "pokerplus") return buildPokerPlusReport();
    if (section === "segments") return buildSegmentsReport();
    if (section === "broadcast") return buildBroadcastReport();
    return buildOverviewReport();
  }

  function sendCrmSectionData(section) {
    var text = buildCrmSectionReport(section || state.tab || "overview");
    var title = (text.split("\n")[0] || "CRM данные").trim();
    if (navigator.share) {
      navigator.share({ title: title, text: text })
        .catch(function () { return copyTextToClipboard(text).then(function () { notifyCrmSend("Данные скопированы."); }); });
      return;
    }
    copyTextToClipboard(text).then(function () {
      notifyCrmSend("Данные скопированы.");
    });
  }


  return {
    channelLabel: channelLabel,
    buildCrmSectionReport: buildCrmSectionReport,
    sendCrmSectionData: sendCrmSectionData
  };
}
