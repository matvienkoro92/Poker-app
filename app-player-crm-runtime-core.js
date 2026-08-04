// Дашборд игроков: компактная админ-панель для массового потока в переписке.
(function () {
  var state = {
    loaded: false,
    loading: false,
    heavyLoading: false,
    heavyError: "",
    playersPending: false,
    playersScope: "summary",
    heavyLoadingScope: "",
    loadingScope: "",
    tab: "stats",
    period: "current_week",
    dateFrom: "",
    dateTo: "",
    chartPeriod: "current_week",
    chartDateFrom: "",
    chartDateTo: "",
    filter: "has_bot",
    search: "",
    selectedId: "",
    players: [],
    playersPage: 0,
    playersTotal: 0,
    playersHasMore: false,
    broadcastPlayers: [],
    broadcastAudienceLoadedAt: 0,
    broadcastAudiencePeriodKey: "",
    statsAuxiliaryLoadedKey: "",
    statsAuxiliaryLoading: false,
    statsManualRefreshAt: 0,
    dailyPokerStats: null,
    dailyPokerStatsLoading: false,
    dailyPokerStatsRangeKey: "",
    dailyPokerStatsError: "",
    dailyPokerStatsPending: false,
    dailyPokerDebitsSort: "date",
    dailyPokerModalOpen: false,
    dailyPokerModalTab: "issued",
    dailyPokerWinnersLoading: false,
    dailyPokerWinners: null,
    dailyPokerWinnersRequestKey: "",
    rafflesModalOpen: false,
    rafflesModalTab: "issued",
    raffleRecipientsLoading: false,
    raffleRecipientsRequestKey: "",
    raffleStatsLoading: false,
    raffleStatsRequestKey: "",
    raffleStatsByPeriod: {},
    raffleRecipientsSort: "tickets",
    blockedUsers: [],
    blockedSearch: "",
    registeredAccounts: [],
    registrationModalMethod: "",
    showAllRegistrationModal: false,
    pokerPlusModalOpen: false,
    generalMessagesModalOpen: false,
    showAllGeneralMessagesModal: false,
    visitsModalOpen: false, visitsModalMode: "users",
    botModalOpen: false,
    pushModalOpen: false,
    registrationMethod: "all",
    registrationSort: "name",
    pokerPlusAccounts: [],
    pokerPlusLevelMin: "",
    pokerPlusLevelMax: "",
    pokerPlusDateFrom: "",
    pokerPlusDateTo: "",
    pokerPlusSortField: "level",
    pokerPlusSortDir: "desc",
    registrationModalSortField: "linkedAt",
    registrationModalSortDir: "desc",
    botModalSortField: "botSubscribedAt",
    botModalSortDir: "desc",
    pushModalSortField: "pushSubscribedAt",
    pushModalSortDir: "desc",
    visitsModalSortField: "firstSeenAt",
    visitsModalSortDir: "desc",
    campaigns: [],
    sourceAnalytics: [],
    statsSummary: null,
    crmWarnings: [],
    weekReport: null,
    weekReportLoading: false,
    weekReportLoadedAt: 0,
    weekReportPeriodKey: "",
    weekReportRequestKey: "",
    weekReportPendingReload: false,
    periodComparison: null,
    periodComparisonLoading: false,
    periodComparisonRequestKey: "",
    chartAnalytics: null,
    chartSeriesEnabled: {
      players: true,
      registrations: true,
      poker21: true,
      bot: true,
      push: true,
      deposits: true, depositAmount: true,
      crmMessages: true,
      generalMessages: true,
    },
    chatStats: null,
    chatDialogManager: "",
    selectedManagerDialogId: "",
    playerModalOpen: false,
    permissions: null,
    pushConfigured: false,
    source: "api",
    crmError: "",
    showAllPlayers: false,
    loadStartedAt: 0,
    trackingLinks: [],
    trackingLinksLoaded: false,
    trackingLinksLoading: false,
    trackingLinksError: "",
    linkDetailsId: "",
    linkDetailsVisitors: [],
    linkDetailsVisitorsLoading: false,
    linkDetailsVisitorsError: "",
    broadcastImage: null,
    broadcastProgressTimer: null,
    broadcastProgressId: "",
    lastBroadcastProgress: null,
  };

  var esc = pokerPlayerCrmEsc;
  var money = pokerPlayerCrmMoney;
  var pct = pokerPlayerCrmPct;
  var intFmt = pokerPlayerCrmIntFmt;
  var daysLabel = pokerPlayerCrmDaysLabel;
  var isoDate = pokerPlayerCrmIsoDate;
  var localDateKey = pokerPlayerCrmLocalDateKey;

  var playerCrmPeriodSegmentsRuntime = typeof initPlayerCrmPeriodSegmentsRuntime === "function"
    ? initPlayerCrmPeriodSegmentsRuntime({
      state: state,
      esc: esc,
      isoDate: isoDate,
      localDateKey: localDateKey,
      dateOnly: dateOnly
    })
    : {};
  var setDefaultDates = playerCrmPeriodSegmentsRuntime.setDefaultDates || function () {};
  var setDefaultChartDates = playerCrmPeriodSegmentsRuntime.setDefaultChartDates || function () {};
  var normalizeDateRange = playerCrmPeriodSegmentsRuntime.normalizeDateRange || function () {};
  var normalizeChartDateRange = playerCrmPeriodSegmentsRuntime.normalizeChartDateRange || function () {};
  var periodKey = playerCrmPeriodSegmentsRuntime.periodKey || function () { return "30"; };
  var periodLabel = playerCrmPeriodSegmentsRuntime.periodLabel || function () { return ""; };
  var periodRangeLabel = playerCrmPeriodSegmentsRuntime.periodRangeLabel || function () { return ""; };
  var fixedPeriodRange = playerCrmPeriodSegmentsRuntime.fixedPeriodRange || function () { return null; };
  var selectedPeriodRange = playerCrmPeriodSegmentsRuntime.selectedPeriodRange || function () { return null; };
  var dateInSelectedPeriod = playerCrmPeriodSegmentsRuntime.dateInSelectedPeriod || function () { return true; };
  var playersInSelectedPeriodByDate = playerCrmPeriodSegmentsRuntime.playersInSelectedPeriodByDate || function () { return []; };
  var chartPeriodLabel = playerCrmPeriodSegmentsRuntime.chartPeriodLabel || function () { return ""; };
  var periodOptionsHtml = playerCrmPeriodSegmentsRuntime.periodOptionsHtml || function () { return ""; };
  var renderModalPeriodControls = playerCrmPeriodSegmentsRuntime.renderModalPeriodControls || function () { return ""; };
  var periodData = playerCrmPeriodSegmentsRuntime.periodData || function () { return { deposits: 0, depositCount: 0, messages: 0 }; };
  var segments = playerCrmPeriodSegmentsRuntime.segments || [];
  var segmentByKey = playerCrmPeriodSegmentsRuntime.segmentByKey || function (key) { return segments[0] || { key: key, label: key }; };
  var segmentPlayers = playerCrmPeriodSegmentsRuntime.segmentPlayers || function () { return []; };
  var filteredPlayers = playerCrmPeriodSegmentsRuntime.filteredPlayers || function () { return []; };
  var sortForWork = playerCrmPeriodSegmentsRuntime.sortForWork || function () { return 0; };
  var playerCrmRegistrationsRuntime = typeof initPlayerCrmRegistrationsRuntime === "function"
    ? initPlayerCrmRegistrationsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt,
      dateInSelectedPeriod: dateInSelectedPeriod,
      periodLabel: periodLabel,
      registrationTelegramLabel: registrationTelegramLabel,
      dateTime: dateTime,
      renderStats: function () { return renderStats(); }
    })
    : {};
  var hasRegistrationMethod = playerCrmRegistrationsRuntime.hasRegistrationMethod || function () { return false; }, registrationRowsByMethod = playerCrmRegistrationsRuntime.registrationRowsByMethod || function () { return []; };
  var renderRegistrationModal = playerCrmRegistrationsRuntime.renderRegistrationModal || function () {}, closeRegistrationModal = playerCrmRegistrationsRuntime.closeRegistrationModal || function () {}, exportRegistrationModalRows = playerCrmRegistrationsRuntime.exportRegistrationModalRows || function () {};
  function noOpenDialogModals() { return !state.chatDialogManager && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.visitsModalOpen && !state.botModalOpen && !state.pushModalOpen && !state.dailyPokerModalOpen && !state.playerModalOpen && !state.linkDetailsId; }
  var playerCrmVisitsRuntime = typeof initPlayerCrmVisitsRuntime === "function"
    ? initPlayerCrmVisitsRuntime({ state: state, esc: esc, intFmt: intFmt, dateTime: dateTime, dateInSelectedPeriod: dateInSelectedPeriod, periodLabel: periodLabel, noOpenDialogModals: noOpenDialogModals, renderStats: function () { return renderStats(); } })
    : {};
  var renderVisitsModal = playerCrmVisitsRuntime.renderVisitsModal || function () {}, closeVisitsModal = playerCrmVisitsRuntime.closeVisitsModal || function () {};

  var playerCrmStatsRuntime = typeof initPlayerCrmStatsRuntime === "function"
    ? initPlayerCrmStatsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt,
      money: money,
      periodData: periodData,
      periodLabel: periodLabel,
      chartPeriodLabel: chartPeriodLabel,
      dateInSelectedPeriod: dateInSelectedPeriod,
      selectedPeriodRange: selectedPeriodRange,
      playersInSelectedPeriodByDate: playersInSelectedPeriodByDate,
      registrationRowsByMethod: registrationRowsByMethod
    })
    : {};
  function renderStats() {
    var result = playerCrmStatsRuntime && typeof playerCrmStatsRuntime.renderStats === "function" ? playerCrmStatsRuntime.renderStats() : null;
    renderCrmWeekReport();
    return result;
  }

  function crmReportNumber(value) {
    var number = typeof value === "number" ? value : parseFloat(String(value == null ? "" : value).replace(",", "."));
    return isFinite(number) ? number : 0;
  }

  function crmReportMoney(value) {
    return String(Math.round(crmReportNumber(value)));
  }

  function crmReportExtraName(name) {
    return String(name || "").trim().toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ");
  }

  function crmReportIsAnyaSalary(name) {
    var normalized = crmReportExtraName(name);
    return normalized.indexOf("аня") !== -1 && (normalized.indexOf("зп") !== -1 || normalized.indexOf("зарплат") !== -1);
  }

  function crmReportIsPreviousRakeback(name) {
    var normalized = crmReportExtraName(name);
    return (normalized.indexOf("рб") !== -1 || normalized.indexOf("рейкбек") !== -1) &&
      (normalized.indexOf("прошл") !== -1 || normalized.indexOf("пред") !== -1);
  }

  function crmReportIsManualRakeback(name) {
    var normalized = crmReportExtraName(name);
    return normalized === "рб" || normalized === "рейкбек" || normalized === "rakeback";
  }

  function crmReportStoredRakeback(report) {
    return crmReportNumber(report && report.rakeback);
  }

  var CRM_REPORT_WEEKDAYS = [
    { key: "mon", label: "Пн" },
    { key: "tue", label: "Вт" },
    { key: "wed", label: "Ср" },
    { key: "thu", label: "Чт" },
    { key: "fri", label: "Пт" },
    { key: "sat", label: "Сб" },
    { key: "sun", label: "Вс" },
  ];

  function crmReportDepositManager(report) {
    var authorId = String(report && report.authorId || "").replace(/^tg_/, "").trim();
    var authorName = crmReportExtraName(report && report.authorName);
    if (authorId === "2144406710" || authorName.indexOf("аня") !== -1 || authorName.indexOf("anna") !== -1) return "anya";
    if (authorId === "1897001087" || authorName.indexOf("вика") !== -1 || authorName.indexOf("vika") !== -1) return "vika";
    return "";
  }

  function crmReportDepositWeekday(report) {
    var weekday = crmReportExtraName(report && report.weekday);
    var prefixes = [
      ["пон", "mon"], ["вто", "tue"], ["сре", "wed"], ["чет", "thu"],
      ["пят", "fri"], ["суб", "sat"], ["вос", "sun"],
    ];
    for (var i = 0; i < prefixes.length; i += 1) {
      if (weekday.indexOf(prefixes[i][0]) === 0) return prefixes[i][1];
    }
    var match = String(report && report.date || "").match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (!match) return "";
    var dayIndex = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1]), 12)).getUTCDay();
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][dayIndex] || "";
  }

  function crmReportDateKey(report) {
    var match = String(report && report.date || "").match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (match) {
      return match[3] + "-" + String(match[2]).padStart(2, "0") + "-" + String(match[1]).padStart(2, "0");
    }
    return dateOnly(report && report.createdAt);
  }

  function crmDailyPokerDebitsByManager(stats) {
    var totals = { anya: 0, vika: 0 };
    var rows = stats && Array.isArray(stats.dailyDebits) ? stats.dailyDebits : [];
    var range = selectedPeriodRange();
    rows.forEach(function (row) {
      var date = String(row && row.date || "");
      if (range && (!date || date < range.from || date > range.to)) return;
      var adminId = String(row && row.adminId || "").replace(/^tg_/, "").trim();
      var amount = crmReportNumber(row && row.amount);
      if (adminId === "2144406710") totals.anya += amount;
      if (adminId === "1897001087") totals.vika += amount;
    });
    return totals;
  }

  function crmWeekReportTotals(reports) {
    var totals = {
      deposit: 0, cashout: 0, prodamus: 0, robokassa: 0, romaCrypto: 0,
      botCryptoDep: 0, botExchipDep: 0, botExchipCashout: 0,
      bonuses: 0, transfers: 0, ret: 0, sergeyMarina: 0, rakeback: 0,
      previousRakeback: 0, extraFields: [],
      depositByManagerDay: { anya: {}, vika: {} },
      bonusesByManager: { anya: 0, vika: 0 }
    };
    var extraMap = {};
    (Array.isArray(reports) ? reports : []).forEach(function (report) {
      [
        "deposit", "cashout", "prodamus", "robokassa", "romaCrypto",
        "botCryptoDep", "botExchipDep", "botExchipCashout",
        "bonuses", "transfers", "ret", "sergeyMarina"
      ].forEach(function (key) {
        totals[key] += crmReportNumber(report && report[key]);
      });
      var depositManager = crmReportDepositManager(report);
      var depositWeekday = crmReportDepositWeekday(report);
      if (depositManager && depositWeekday) {
        totals.depositByManagerDay[depositManager][depositWeekday] =
          (totals.depositByManagerDay[depositManager][depositWeekday] || 0) + crmReportNumber(report && report.deposit);
      }
      if (depositManager) {
        totals.bonusesByManager[depositManager] += crmReportNumber(report && report.bonuses);
      }
      totals.rakeback += crmReportStoredRakeback(report);
      var extras = Array.isArray(report && report.extraFields) ? report.extraFields.slice() : [];
      if (report && (report.extraName || report.extraAmount != null)) {
        var legacyExtra = { name: report.extraName || "Доп", amount: report.extraAmount };
        var legacyName = crmReportExtraName(legacyExtra.name);
        var legacyAmount = crmReportNumber(legacyExtra.amount);
        var alreadyIncluded = extras.some(function (field) {
          return field &&
            crmReportExtraName(field.name) === legacyName &&
            crmReportNumber(field.amount != null ? field.amount : field.value) === legacyAmount;
        });
        if (!alreadyIncluded) extras.push(legacyExtra);
      }
      extras.forEach(function (field) {
        if (!field || !field.name) return;
        var amount = crmReportNumber(field.amount != null ? field.amount : field.value);
        if (crmReportIsPreviousRakeback(field.name)) totals.previousRakeback += amount;
        else if (!crmReportIsManualRakeback(field.name)) {
          var normalizedName = crmReportExtraName(field.name);
          if (!normalizedName) return;
          if (!extraMap[normalizedName]) extraMap[normalizedName] = { name: String(field.name).trim(), amount: 0 };
          extraMap[normalizedName].amount += amount;
        }
      });
    });
    totals.extraFields = Object.keys(extraMap).map(function (name) {
      return extraMap[name];
    }).filter(function (field) {
      return field.amount !== 0;
    });
    return totals;
  }

  function renderCrmWeekReport() {
    var host = document.getElementById("playerCrmWeekReport");
    if (!host) return;
    if (state.weekReportLoading && !state.weekReport) {
      host.innerHTML = '<section class="player-crm__week-report-card"><h3>Отчёт</h3><div class="player-crm__week-report-empty">Загружаю отчёт…</div></section>';
      return;
    }
    var report = state.weekReport;
    if (!report) {
      host.innerHTML = '<section class="player-crm__week-report-card"><h3>Отчёт</h3><div class="player-crm__week-report-empty">Отчётов за выбранный период пока нет.</div></section>';
      return;
    }
    function row(label, value, className, showZero) {
      if (!value && !showZero) return "";
      return '<div class="player-crm__week-report-row' + (className ? " " + className : "") + '"><span>' + esc(label) + '</span><strong>' + esc(crmReportMoney(value)) + "</strong></div>";
    }
    function returnRow(label, value) {
      var amount = Math.max(0, crmReportNumber(value));
      return '<div class="player-crm__week-report-row player-crm__week-report-row--subdetail player-crm__week-report-row--return"><span>' + esc(label) + '</span><strong>+' + esc(crmReportMoney(amount)) + "</strong></div>";
    }
    function depositColumn(managerKey, managerLabel) {
      var managerRows = report.depositByManagerDay && report.depositByManagerDay[managerKey] || {};
      var managerTotal = CRM_REPORT_WEEKDAYS.reduce(function (sum, day) {
        return sum + crmReportNumber(managerRows[day.key]);
      }, 0);
      return '<section class="player-crm__week-report-deposit-column"><h4>' + esc(managerLabel) + "</h4>" +
        CRM_REPORT_WEEKDAYS.map(function (day) {
          return '<div><span>' + esc(day.label) + '</span><strong>' + esc(crmReportMoney(managerRows[day.key] || 0)) + "</strong></div>";
        }).join("") +
        '<div class="player-crm__week-report-deposit-total"><span>Итого</span><strong>' + esc(crmReportMoney(managerTotal)) + "</strong></div>" +
      "</section>";
    }
    var depositHtml =
      '<details class="player-crm__week-report-deposit">' +
        '<summary><span>Депозит</span><strong>' + esc(crmReportMoney(report.deposit)) + "</strong></summary>" +
        '<div class="player-crm__week-report-deposit-grid">' +
          depositColumn("anya", "Аня") + depositColumn("vika", "Вика") +
        "</div>" +
      "</details>";
    var detailRows = [];
    var detailTotal = 0;
    [
      ["Выводы", "cashout"], ["Продамус", "prodamus"], ["Робокасса", "robokassa"],
      ["Рома крипта", "romaCrypto"], ["Боткрипта", "botCryptoDep"],
      ["Ботэксчип деп", "botExchipDep"], ["Сергей/Марина", "sergeyMarina"]
    ].forEach(function (item) {
      var value = crmReportNumber(report[item[1]]);
      if (!value) return;
      detailTotal += value;
      detailRows.push(row(item[0], value));
    });
    (report.extraFields || []).forEach(function (field) {
      if (!field || crmReportIsAnyaSalary(field.name)) return;
      detailTotal += crmReportNumber(field.amount);
      detailRows.push(row(field.name || "Доп", field.amount));
    });
    var anyaSalary = (report.extraFields || []).reduce(function (sum, field) {
      return sum + (field && crmReportIsAnyaSalary(field.name) ? crmReportNumber(field.amount) : 0);
    }, 0);
    if (anyaSalary) {
      detailTotal += anyaSalary;
      detailRows.push(row("Аня ЗП", anyaSalary));
    }
    var depositDifference = crmReportNumber(report.deposit) - detailTotal;
    var detailHtml = detailRows.length
      ? '<details class="player-crm__week-report-details"><summary><span>Детализация выводов</span><strong>Итого ' + esc(crmReportMoney(detailTotal)) + ' (разница ' + esc(crmReportMoney(depositDifference)) + ')</strong></summary><div class="player-crm__week-report-details-body">' +
          detailRows.join("") +
        "</div></details>"
      : "";
    var exchip = crmReportNumber(report.botExchipDep) - crmReportNumber(report.botExchipCashout);
    var runexExchipTotal = crmReportNumber(report.botCryptoDep) + exchip;
    var anyaVisible = anyaSalary ? row("Аня ЗП", anyaSalary) : "";
    var raffleStats = state.statsSummary && state.statsSummary.raffles;
    var raffleNetAmount = raffleStats && raffleStats.available !== false
      ? crmReportNumber(raffleStats.issuedPrizeAmount) - crmReportNumber(raffleStats.returnedAmount)
      : 0;
    var raffleRows = raffleStats && raffleStats.available !== false
      ? row("Розыгрыши итого", raffleNetAmount, "", true) +
        row("— Билеты", raffleStats.issuedTicketAmount, "player-crm__week-report-row--subdetail", true) +
        row("— Кеш", raffleStats.issuedCashAmount, "player-crm__week-report-row--subdetail", true) +
        returnRow("— Возврат", raffleStats.returnedAmount)
      : "";
    var dailyPokerDebited = state.dailyPokerStats && state.dailyPokerStats.bonusBalanceDebited != null
      ? crmReportNumber(state.dailyPokerStats.bonusBalanceDebited)
      : null;
    var dailyPokerDebitedRow = dailyPokerDebited == null
      ? ""
      : (function () {
          var managerTotals = crmDailyPokerDebitsByManager(state.dailyPokerStats);
          var dailyPokerNet = dailyPokerDebited - crmReportNumber(state.dailyPokerStats.bonusBalanceReturned);
          return row("Крутка дня списано", dailyPokerNet, "", true) +
            row("— Аня", managerTotals.anya, "player-crm__week-report-row--subdetail", true) +
            row("— Вика", managerTotals.vika, "player-crm__week-report-row--subdetail", true) +
            returnRow("— Возврат", state.dailyPokerStats.bonusBalanceReturned);
        })();
    var returnsTotal =
      crmReportNumber(raffleStats && raffleStats.available !== false ? raffleStats.returnedAmount : 0) +
      crmReportNumber(state.dailyPokerStats && state.dailyPokerStats.bonusBalanceReturned);
    var bonusesTotal =
      crmReportNumber(report.bonuses) +
      crmReportNumber(raffleStats && raffleStats.available !== false ? raffleStats.issuedPrizeAmount : 0) +
      crmReportNumber(dailyPokerDebited) -
      returnsTotal;
    var rakebackRows =
      row("РБ прошлая", report.previousRakeback, "", true) +
      row("Рейкбек", report.rakeback, "", true);
    var rakebackTotal = crmReportNumber(report.previousRakeback) + crmReportNumber(report.rakeback);
    host.innerHTML =
      '<section class="player-crm__week-report-card">' +
        '<div class="player-crm__week-report-head"><div><h3>Отчёт</h3></div><div class="player-crm__week-report-actions"><button type="button" class="player-crm__week-report-copy-btn" data-crm-copy-week-report aria-label="Скопировать отчёт" title="Скопировать отчёт"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg></button><button type="button" data-crm-refresh-week-report>Обновить</button></div></div>' +
        '<div class="player-crm__week-report-main">' + depositHtml + detailHtml + "</div>" +
        '<details class="player-crm__week-report-group player-crm__week-report-group--calc player-crm__week-report-calc-details">' +
          '<summary><span>Рунекс и Эксчип</span><strong>Итого ' + esc(crmReportMoney(runexExchipTotal)) + "</strong></summary>" +
          '<div class="player-crm__week-report-calc-body">' +
            row("Итого Рунекс", report.botCryptoDep, "", true) +
            '<div class="player-crm__week-report-row"><span>Итого Эксчип</span><strong>' + esc(crmReportMoney(report.botExchipDep)) + " - " + esc(crmReportMoney(report.botExchipCashout)) + " = " + esc(crmReportMoney(exchip)) + "</strong></div>" +
          "</div>" +
        "</details>" +
        '<section class="player-crm__week-report-group player-crm__week-report-group--payments">' +
          '<h4>Продамус / Робокасса</h4>' +
          '<div class="player-crm__week-report-payments-body">' +
            row("Продамус", report.prodamus, "", true) +
            row("Робокасса", report.robokassa, "", true) +
          "</div>" +
        "</section>" +
        '<div class="player-crm__week-report-group player-crm__week-report-group--sergey">' +
          row("Сергей/Марина", report.sergeyMarina, "", true) +
        "</div>" +
        '<details class="player-crm__week-report-group player-crm__week-report-group--danger player-crm__week-report-bonuses-details">' +
          '<summary><span>Бонусы и выдачи</span><strong>Итого ' + esc(crmReportMoney(bonusesTotal)) + "</strong></summary>" +
          '<div class="player-crm__week-report-bonuses-body">' +
            row("Бонусы", report.bonuses, "", true) +
            row("— Аня", report.bonusesByManager && report.bonusesByManager.anya, "player-crm__week-report-row--subdetail", true) +
            row("— Вика", report.bonusesByManager && report.bonusesByManager.vika, "player-crm__week-report-row--subdetail", true) +
            raffleRows + dailyPokerDebitedRow +
          "</div>" +
        "</details>" +
        '<details class="player-crm__week-report-group player-crm__week-report-group--rakeback player-crm__week-report-rakeback-details">' +
          '<summary><span>Рейкбек</span><strong>Итого ' + esc(crmReportMoney(rakebackTotal)) + "</strong></summary>" +
          '<div class="player-crm__week-report-rakeback-body">' + rakebackRows + "</div>" +
        "</details>" +
        (anyaVisible ? '<div class="player-crm__week-report-group player-crm__week-report-group--salary">' + anyaVisible + "</div>" : "") +
      "</section>";
  }

  function crmWeekReportCopyText() {
    var report = state.weekReport;
    if (!report) return "";
    var lines = ["ОТЧЁТ ЗА НЕДЕЛЮ", "", "Депозит: " + crmReportMoney(report.deposit), "", "ДЕПОЗИТЫ ПО ДНЯМ"];
    lines.push("День | Аня | Вика");
    var depositTotals = { anya: 0, vika: 0 };
    CRM_REPORT_WEEKDAYS.forEach(function (day) {
      var anya = crmReportNumber(report.depositByManagerDay && report.depositByManagerDay.anya && report.depositByManagerDay.anya[day.key]);
      var vika = crmReportNumber(report.depositByManagerDay && report.depositByManagerDay.vika && report.depositByManagerDay.vika[day.key]);
      depositTotals.anya += anya;
      depositTotals.vika += vika;
      lines.push(day.label + " | " + crmReportMoney(anya) + " | " + crmReportMoney(vika));
    });
    lines.push("Итого | " + crmReportMoney(depositTotals.anya) + " | " + crmReportMoney(depositTotals.vika));

    var detailRows = [];
    var detailTotal = 0;
    [
      ["Выводы", "cashout"], ["Продамус", "prodamus"], ["Робокасса", "robokassa"],
      ["Рома крипта", "romaCrypto"], ["Боткрипта", "botCryptoDep"],
      ["Ботэксчип деп", "botExchipDep"], ["Сергей/Марина", "sergeyMarina"]
    ].forEach(function (item) {
      var value = crmReportNumber(report[item[1]]);
      if (!value) return;
      detailTotal += value;
      detailRows.push(item[0] + ": " + crmReportMoney(value));
    });
    var anyaSalary = 0;
    (report.extraFields || []).forEach(function (field) {
      if (!field) return;
      var amount = crmReportNumber(field.amount);
      if (crmReportIsAnyaSalary(field.name)) {
        anyaSalary += amount;
        return;
      }
      if (!amount) return;
      detailTotal += amount;
      detailRows.push(String(field.name || "Доп") + ": " + crmReportMoney(amount));
    });
    if (anyaSalary) detailTotal += anyaSalary;
    lines.push("", "ДЕТАЛИЗАЦИЯ ВЫВОДОВ");
    lines.push.apply(lines, detailRows);
    lines.push("Итого выводов: " + crmReportMoney(detailTotal) + " (разница " + crmReportMoney(crmReportNumber(report.deposit) - detailTotal) + ")");

    var exchip = crmReportNumber(report.botExchipDep) - crmReportNumber(report.botExchipCashout);
    var runexExchipTotal = crmReportNumber(report.botCryptoDep) + exchip;
    lines.push("", "Итого Рунекс: " + crmReportMoney(report.botCryptoDep));
    lines.push("Итого Эксчип: " + crmReportMoney(report.botExchipDep) + " - " + crmReportMoney(report.botExchipCashout) + " = " + crmReportMoney(exchip));
    lines.push("Рунекс и Эксчип итого: " + crmReportMoney(runexExchipTotal));
    lines.push("", "ПРОДАМУС / РОБОКАССА");
    lines.push("Продамус: " + crmReportMoney(report.prodamus));
    lines.push("Робокасса: " + crmReportMoney(report.robokassa));
    lines.push("", "Сергей/Марина: " + crmReportMoney(report.sergeyMarina));
    lines.push("", "Бонусы: " + crmReportMoney(report.bonuses));
    lines.push("— Аня: " + crmReportMoney(report.bonusesByManager && report.bonusesByManager.anya));
    lines.push("— Вика: " + crmReportMoney(report.bonusesByManager && report.bonusesByManager.vika));
    var raffleStats = state.statsSummary && state.statsSummary.raffles;
    var raffleIssuedTotal = 0;
    if (raffleStats && raffleStats.available !== false) {
      raffleIssuedTotal = crmReportNumber(raffleStats.issuedPrizeAmount);
      lines.push("Розыгрыши итого: " + crmReportMoney(
        crmReportNumber(raffleStats.issuedPrizeAmount) - crmReportNumber(raffleStats.returnedAmount)
      ));
      lines.push("— Билеты: " + crmReportMoney(raffleStats.issuedTicketAmount));
      lines.push("— Кеш: " + crmReportMoney(raffleStats.issuedCashAmount));
      lines.push("— Возврат: +" + crmReportMoney(raffleStats.returnedAmount));
    }
    var dailyPokerDebited = 0;
    if (state.dailyPokerStats && state.dailyPokerStats.bonusBalanceDebited != null) {
      dailyPokerDebited = crmReportNumber(state.dailyPokerStats.bonusBalanceDebited);
      lines.push("Крутка дня списано: " + crmReportMoney(
        crmReportNumber(state.dailyPokerStats.bonusBalanceDebited) -
        crmReportNumber(state.dailyPokerStats.bonusBalanceReturned)
      ));
      var dailyPokerManagerTotals = crmDailyPokerDebitsByManager(state.dailyPokerStats);
      lines.push("— Аня: " + crmReportMoney(dailyPokerManagerTotals.anya));
      lines.push("— Вика: " + crmReportMoney(dailyPokerManagerTotals.vika));
      lines.push("— Возврат: +" + crmReportMoney(state.dailyPokerStats.bonusBalanceReturned));
    }
    var returnsTotal = crmReportNumber(raffleStats && raffleStats.returnedAmount) +
      crmReportNumber(state.dailyPokerStats && state.dailyPokerStats.bonusBalanceReturned);
    lines.push("Бонусы и выдачи итого: " + crmReportMoney(crmReportNumber(report.bonuses) + raffleIssuedTotal + dailyPokerDebited - returnsTotal));
    lines.push("", "РБ прошлая: " + crmReportMoney(report.previousRakeback));
    lines.push("Рейкбек: " + crmReportMoney(report.rakeback));
    if (anyaSalary) lines.push("Аня ЗП: " + crmReportMoney(anyaSalary));
    return lines.join("\n");
  }

  function copyCrmWeekReport(button) {
    var text = crmWeekReportCopyText();
    if (!text) return;
    var originalHtml = button ? button.innerHTML : "";
    function done(ok) {
      if (!button) return;
      button.classList.toggle("player-crm__week-report-copy-btn--success", !!ok);
      button.setAttribute("aria-label", ok ? "Отчёт скопирован" : "Не удалось скопировать отчёт");
      button.innerHTML = ok
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4 10-10"></path></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"></path></svg>';
      setTimeout(function () {
        if (!button || !button.isConnected) return;
        button.classList.remove("player-crm__week-report-copy-btn--success");
        button.setAttribute("aria-label", "Скопировать отчёт");
        button.innerHTML = originalHtml;
      }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(false); });
      return;
    }
    try {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      var copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      done(copied !== false);
    } catch (e) {
      done(false);
    }
  }

  function loadCrmWeekReport(force) {
    var range = selectedPeriodRange();
    var periodRequestKey = range ? range.from + "|" + range.to : "all";
    if (state.weekReportLoading) {
      if (state.weekReportRequestKey !== periodRequestKey) state.weekReportPendingReload = true;
      return;
    }
    if (!force && state.weekReportPeriodKey === periodRequestKey && state.weekReportLoadedAt && Date.now() - state.weekReportLoadedAt < 60000) {
      renderCrmWeekReport();
      return;
    }
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    state.weekReportLoading = true;
    state.weekReportRequestKey = periodRequestKey;
    state.weekReportPendingReload = false;
    renderCrmWeekReport();
    var query = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + query + "&scope=crmWeek", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("period report " + response.status);
        return response.json();
      })
      .then(function (data) {
        var reports = data && data.ok && Array.isArray(data.reports) ? data.reports : [];
        if (range) {
          reports = reports.filter(function (report) {
            var key = crmReportDateKey(report);
            return key && key >= range.from && key <= range.to;
          });
        }
        state.weekReport = reports.length ? crmWeekReportTotals(reports) : null;
        state.weekReportLoadedAt = Date.now();
        state.weekReportPeriodKey = periodRequestKey;
      })
      .catch(function () {
        state.weekReport = null;
      })
      .then(function () {
        state.weekReportLoading = false;
        renderCrmWeekReport();
        var currentRange = selectedPeriodRange();
        var currentKey = currentRange ? currentRange.from + "|" + currentRange.to : "all";
        if (state.weekReportPendingReload || currentKey !== periodRequestKey) loadCrmWeekReport(true);
      });
  }

  function renderManagerDialogsList() {
    var key = state.chatDialogManager;
    var chat = state.chatStats || {};
    var data = chat.managerDialogs && key ? chat.managerDialogs[key] : null;
    if (!data) return "";
    var rows = Array.isArray(data.dialogs) ? data.dialogs : [];
    var title = key === "vika" ? "Диалоги Вики" : key === "other" ? "Все остальные диалоги" : "Диалоги Ани";
    var empty = "<div class=\"player-crm__timeline-item\">В этом разделе пока нет диалогов.</div>";
    var body = rows.length ? rows.map(function (row) {
      var active = state.selectedManagerDialogId === row.id;
      return "<div class=\"player-crm__manager-dialog-wrap\">" +
        "<button type=\"button\" class=\"player-crm__manager-dialog" + (active ? " player-crm__manager-dialog--active" : "") + "\" data-crm-manager-dialog-id=\"" + esc(row.id || "") + "\">" +
          "<span><strong>" + esc(row.name || row.handle || row.id || "—") + "</strong><small>" + esc([row.handle, row.dtId || row.id].filter(Boolean).join(" · ")) + "</small></span>" +
          "<span>" + esc(intFmt(row.totalMessages)) + " / " + esc(intFmt(row.periodMessages)) + "</span>" +
        "</button>" +
        (active ? renderManagerConversation(row, key) : "") +
      "</div>";
    }).join("") : empty;
    return "<div class=\"player-crm__modal-content player-crm__modal-content--manager-dialogs\">" + renderModalPeriodControls() +
      "<div class=\"player-crm__manager-dialogs\" aria-label=\"" + esc(title) + "\">" + body + "</div></div>";
  }

  function renderManagerDialogModal() {
    var modal = document.getElementById("playerCrmManagerDialogModal");
    var titleEl = document.getElementById("playerCrmManagerDialogTitle");
    var subtitleEl = document.getElementById("playerCrmManagerDialogSubtitle");
    var bodyEl = document.getElementById("playerCrmManagerDialogBody");
    if (!modal || !bodyEl) return;
    var html = renderManagerDialogsList();
    if (!state.chatDialogManager || !html) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    if (titleEl) titleEl.textContent = state.chatDialogManager === "vika" ? "Диалоги Вики" : state.chatDialogManager === "other" ? "Все остальные диалоги" : "Диалоги Ани";
    if (subtitleEl) subtitleEl.textContent = "Сообщений всего / за " + periodLabel();
    bodyEl.innerHTML = html;
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeManagerDialogModal() {
    state.chatDialogManager = "";
    state.selectedManagerDialogId = "";
    renderStats();
    renderManagerDialogModal();
  }

  function managerDisplayName(key) {
    return key === "vika" ? "Вика" : "Аня";
  }

  function renderManagerConversation(row, key) {
    var messages = Array.isArray(row.messages) ? row.messages : [];
    var empty = "<div class=\"player-crm__conversation-empty\">Сообщений за выбранный период в этом диалоге нет.</div>";
    var body = messages.length ? messages.map(function (msg) {
      var mine = key !== "other" && String(msg.from || "") === (key === "vika" ? "tg_1897001087" : "tg_2144406710");
      var who = mine ? managerDisplayName(key) : (msg.fromName || msg.from || row.name || row.handle || "Игрок");
      var media = msg.image ? " [фото]" : msg.voice ? " [голосовое]" : msg.document ? " [" + (msg.documentName || "документ") + "]" : "";
      return "<div class=\"player-crm__conversation-msg" + (mine ? " player-crm__conversation-msg--manager" : "") + "\">" +
        "<span><strong>" + esc(who) + "</strong><time>" + esc(msg.time ? new Date(msg.time).toLocaleString("ru-RU") : "") + "</time></span>" +
        "<p>" + esc((msg.text || "").trim() || media.trim() || "Сообщение") + "</p>" +
      "</div>";
    }).join("") : empty;
    return "<div class=\"player-crm__conversation\">" +
      "<div class=\"player-crm__conversation-head\">Переписка: " + esc(row.name || row.handle || row.id || "—") + "</div>" +
      body +
    "</div>";
  }

  function renderChips() {
    var el = document.getElementById("playerCrmFilterChips");
    if (!el) return;
    var currentTotals = state.statsSummary && state.statsSummary.current && typeof state.statsSummary.current === "object"
      ? state.statsSummary.current
      : {};
    var totalKeys = {
      has_bot: "botReach",
      has_poker21: "pokerPlus",
      has_push: "pushSubscriptions",
    };
    var segmentChips = segments.filter(function (seg) {
      return seg.key !== "all" && seg.key !== "has_deposit";
    }).map(function (seg) {
      var totalKey = totalKeys[seg.key];
      var count = totalKey && currentTotals[totalKey] != null
        ? Math.max(0, Number(currentTotals[totalKey]) || 0)
        : segmentPlayers(seg.key).length;
      var cls = "player-crm__chip" + (state.filter === seg.key ? " player-crm__chip--active" : "");
      return "<button type=\"button\" class=\"" + cls + "\" data-crm-filter=\"" + esc(seg.key) + "\" aria-pressed=\"" + (state.filter === seg.key ? "true" : "false") + "\">" + esc(seg.label) + " · " + count + "</button>";
    }).join("");
    var blockedCount = Array.isArray(state.blockedUsers) ? state.blockedUsers.length : 0;
    var blockedCls = "player-crm__chip" + (state.filter === "blocked" ? " player-crm__chip--active" : "");
    el.innerHTML = segmentChips +
      "<button type=\"button\" class=\"" + blockedCls + "\" data-crm-filter=\"blocked\" aria-pressed=\"" + (state.filter === "blocked" ? "true" : "false") + "\">Заблокированные · " + blockedCount + "</button>";
  }

  function renderList() {
    var el = document.getElementById("playerCrmList");
    if (!el) return;
    if (state.filter === "blocked") {
      el.innerHTML = blockedRowsHtml(state.search);
      return;
    }
    if (state.heavyLoading && state.heavyLoadingScope === "players" && state.playersPage < 1) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\" role=\"status\">Загружаем игроков…</div>";
      return;
    }
    if (state.heavyError && !state.players.length) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\" role=\"alert\">" +
        "<span>" + esc(state.heavyError) + "</span>" +
        "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-retry-players>Повторить</button>" +
      "</div>";
      return;
    }
    var items = filteredPlayers().sort(sortForWork);
    var total = items.length;
    var visibleItems = state.showAllPlayers ? items : items.slice(0, 15);
    if (!items.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">По этому фильтру пока пусто.</div>";
      return;
    }
    el.innerHTML = visibleItems.map(function (p) {
      var pd = periodData(p);
      var poker21Id = String(p.pokerPlusUserId || p.p21Id || p.poker21Id || "").trim();
      var playerMeta = [p.handle, poker21Id ? "ID Poker21: " + poker21Id : "", p.source, p.manager].filter(Boolean).join(" · ");
      var cls = "player-crm__player" + (p.id === state.selectedId ? " player-crm__player--active" : "") + (p.appBlocked ? " player-crm__player--blocked" : "");
      return "<button type=\"button\" class=\"" + cls + "\" data-crm-player=\"" + esc(p.id) + "\">" +
        "<span class=\"player-crm__player-head\"><span class=\"player-crm__player-name\">" + esc(p.name) + "</span>" + (p.appBlocked ? "<span class=\"player-crm__blocked-badge\">заблокирован</span>" : "") + "</span>" +
        "<span class=\"player-crm__player-meta\">" + esc(playerMeta) + "</span>" +
        "<span class=\"player-crm__player-note\">" + esc(money(pd.deposits)) + " · сообщений " + esc(pd.messages) + "</span>" +
      "</button>";
    }).join("") + (!state.showAllPlayers && total > visibleItems.length
      ? "<button type=\"button\" class=\"player-crm__show-all\" id=\"playerCrmShowAllBtn\">Показать всех " + esc(total) + "</button>"
      : state.playersHasMore
        ? "<button type=\"button\" class=\"player-crm__show-all\" id=\"playerCrmShowAllBtn\">Показать ещё</button>"
        : "");
  }

  function blockedRowsHtml(search) {
    var q = String(search || "").trim().toLowerCase();
    var rows = Array.isArray(state.blockedUsers) ? state.blockedUsers.slice() : [];
    if (q) {
      rows = rows.filter(function (row) {
        var player = row.player || {};
        return [
          row.id,
          row.reason,
          row.targetLabel,
          row.adminName,
          (row.aliases || []).join(" "),
          player.name,
          player.handle,
          player.accountId,
          player.dtId,
        ].join(" ").toLowerCase().indexOf(q) !== -1;
      });
    }
    rows.sort(function (a, b) {
      return (Date.parse(b && b.createdAt || "") || 0) - (Date.parse(a && a.createdAt || "") || 0);
    });
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">Заблокированных игроков пока нет.</div>";
    return rows.map(function (row) {
      var player = row.player || {};
      var title = row.targetLabel || player.name || player.handle || row.id || "Игрок";
      var sub = [player.handle, player.accountId || row.id, (row.aliases || []).slice(0, 3).join(", ")].filter(Boolean).join(" · ");
      var reason = row.reason || "без причины";
      var date = row.createdAt ? new Date(row.createdAt).toLocaleString("ru-RU") : "дата неизвестна";
      return "<article class=\"player-crm__blocked-row\">" +
        "<div><strong>" + esc(title) + "</strong><span>" + esc(sub) + "</span><small>" + esc(reason) + " · " + esc(date) + "</small></div>" +
        "<div class=\"player-crm__blocked-actions\">" +
          (player.id ? "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-open-player=\"" + esc(player.id) + "\">Карточка</button>" : "") +
          "<button type=\"button\" class=\"player-crm__danger-btn\" data-crm-unblock-id=\"" + esc(row.id || "") + "\">Разблокировать</button>" +
        "</div>" +
      "</article>";
    }).join("");
  }

  function renderBlockedList() {
    var el = document.getElementById("playerCrmBlockedList");
    var summary = document.getElementById("playerCrmBlockedSummary");
    if (!el) {
      if (state.filter === "blocked") renderList();
      return;
    }
    var q = String(state.blockedSearch || "").trim().toLowerCase();
    var rows = Array.isArray(state.blockedUsers) ? state.blockedUsers.slice() : [];
    if (q) {
      rows = rows.filter(function (row) {
        var player = row.player || {};
        return [
          row.id,
          row.reason,
          row.targetLabel,
          row.adminName,
          (row.aliases || []).join(" "),
          player.name,
          player.handle,
          player.accountId,
          player.dtId,
        ].join(" ").toLowerCase().indexOf(q) !== -1;
      });
    }
    rows.sort(function (a, b) {
      return (Date.parse(b && b.createdAt || "") || 0) - (Date.parse(a && a.createdAt || "") || 0);
    });
    if (summary) summary.textContent = intFmt(rows.length) + " из " + intFmt((state.blockedUsers || []).length);
    if (!rows.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Заблокированных игроков пока нет.</div>";
      return;
    }
    el.innerHTML = rows.map(function (row) {
      var player = row.player || {};
      var title = row.targetLabel || player.name || player.handle || row.id || "Игрок";
      var sub = [player.handle, player.accountId || row.id, (row.aliases || []).slice(0, 3).join(", ")].filter(Boolean).join(" · ");
      var reason = row.reason || "без причины";
      var date = row.createdAt ? new Date(row.createdAt).toLocaleString("ru-RU") : "дата неизвестна";
      return "<article class=\"player-crm__blocked-row\">" +
        "<div><strong>" + esc(title) + "</strong><span>" + esc(sub) + "</span><small>" + esc(reason) + " · " + esc(date) + "</small></div>" +
        "<div class=\"player-crm__blocked-actions\">" +
          (player.id ? "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-open-player=\"" + esc(player.id) + "\">Карточка</button>" : "") +
          "<button type=\"button\" class=\"player-crm__danger-btn\" data-crm-unblock-id=\"" + esc(row.id || "") + "\">Разблокировать</button>" +
        "</div>" +
      "</article>";
    }).join("");
  }

  function selectedPlayer() {
    for (var i = 0; i < state.players.length; i++) {
      if (state.players[i].id === state.selectedId) return state.players[i];
    }
    return null;
  }

  function renderDetail() {
    var modal = document.getElementById("playerCrmPlayerModal");
    var titleEl = document.getElementById("playerCrmPlayerModalTitle");
    var subtitleEl = document.getElementById("playerCrmPlayerModalSubtitle");
    var el = document.getElementById("playerCrmPlayerModalBody");
    if (!modal || !el) return;
    modal.hidden = !state.playerModalOpen;
    if (!state.playerModalOpen) {
      el.innerHTML = "";
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var p = selectedPlayer();
    if (!p) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Выберите игрока слева.</div>";
      if (titleEl) titleEl.textContent = "Карточка игрока";
      if (subtitleEl) subtitleEl.textContent = "нет игрока";
      if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
      return;
    }
    var pd = periodData(p);
    if (titleEl) titleEl.textContent = "Карточка игрока";
    if (subtitleEl) subtitleEl.textContent = p.handle || p.accountId || p.id || "игрок";
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
    var avg = pd.depositCount ? Math.round(pd.deposits / pd.depositCount) : 0;
    el.innerHTML =
      "<div class=\"player-crm__modal-content player-crm__modal-content--player\">" +
      "<div class=\"player-crm__detail-head\">" +
        "<div><h3 class=\"player-crm__detail-title\">" + esc(p.name) + "</h3><div class=\"player-crm__detail-muted\">" + esc(p.handle) + " · " + esc(p.source) + " · менеджер " + esc(p.manager) + "</div></div>" +
      "</div>" +
      "<div>" + (p.tags || []).map(function (t) { return "<span class=\"player-crm__tag\">" + esc(t) + "</span>"; }).join("") + "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Депозит", money(pd.deposits)) +
        metric("Депозитов", pd.depositCount) +
        metric("Средний депозит", avg ? money(avg) : "—") +
        metric("Сообщений", pd.messages) +
      "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Последний депозит", daysLabel(p.lastDepositDays)) +
        metric("Последнее сообщение", daysLabel(p.lastMessageDays)) +
        metric("Открытия бота", pct(p.botOpenRate)) +
        metric("Открытия push", pct(p.pushOpenRate)) +
      "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Account ID", p.accountId || p.id || "—") +
        metric("DT ID", p.dtId || "—") +
        metric("Telegram", (p.telegramIds && p.telegramIds[0]) || "—") +
        metric("PokerPlus", p.pokerPlusUserId || "—") +
      "</div>" +
      (p.appBlocked ? "<div class=\"player-crm__block-warning\"><strong>Игрок заблокирован в приложении.</strong><span>" + esc((p.appBlock && p.appBlock.reason) || "Причина не указана") + "</span></div>" : "") +
      "<div class=\"player-crm__timeline-item\"><strong>Заметка:</strong> " + esc(p.note) + "</div>" +
      "<div class=\"player-crm__edit\" data-crm-edit-player=\"" + esc(p.accountId || p.id) + "\">" +
        "<h4 class=\"player-crm__edit-title\">Поля дашборда</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>Менеджер</span><input id=\"playerCrmEditManager\" value=\"" + esc(p.manager || "") + "\" /></label>" +
          "<label><span>Источник</span><input id=\"playerCrmEditSource\" value=\"" + esc(p.source || "") + "\" /></label>" +
          "<label><span>Теги через запятую</span><input id=\"playerCrmEditTags\" value=\"" + esc((p.tags || []).join(", ")) + "\" /></label>" +
        "</div>" +
        "<label class=\"player-crm__message-label\"><span>Заметка</span><textarea id=\"playerCrmEditNote\" rows=\"3\">" + esc(p.note || "") + "</textarea></label>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__primary-btn\" id=\"playerCrmSavePlayerBtn\">Сохранить карточку</button></div>" +
        "<h4 class=\"player-crm__edit-title\">Связки ID</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>DT ID</span><input id=\"playerCrmLinkDtId\" value=\"" + esc(p.dtId || "") + "\" placeholder=\"ID123456\" /></label>" +
          "<label><span>Telegram ID</span><input id=\"playerCrmLinkTelegramId\" value=\"" + esc((p.telegramIds && p.telegramIds[0]) || "") + "\" placeholder=\"tg_123456\" /></label>" +
          "<label><span>PokerPlus ID</span><input id=\"playerCrmLinkPokerPlusId\" value=\"" + esc(p.pokerPlusUserId || "") + "\" /></label>" +
          "<label><span>Имя</span><input id=\"playerCrmLinkDisplayName\" value=\"" + esc(p.name || "") + "\" /></label>" +
        "</div>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" id=\"playerCrmLinkIdentityBtn\">Связать ID</button></div>" +
        "<h4 class=\"player-crm__edit-title\">Быстрое событие</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>Тип</span><select id=\"playerCrmEventType\"><option value=\"deposit\">Депозит</option><option value=\"message\">Сообщение</option></select></label>" +
          "<label><span>Сумма</span><input id=\"playerCrmEventAmount\" type=\"number\" inputmode=\"numeric\" min=\"0\" placeholder=\"0\" /></label>" +
        "</div>" +
        "<label class=\"player-crm__message-label\"><span>Комментарий к событию</span><input id=\"playerCrmEventNote\" placeholder=\"например: импорт из кассы / написал в бот\" /></label>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" id=\"playerCrmAddEventBtn\">Добавить событие</button></div>" +
        "<h4 class=\"player-crm__edit-title\">Доступ к приложению</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>Причина блокировки</span><input id=\"playerCrmBlockReason\" value=\"" + esc((p.appBlock && p.appBlock.reason) || "") + "\" placeholder=\"мультиаккаунт / нарушение правил\" /></label>" +
        "</div>" +
        "<div class=\"player-crm__broadcast-actions\">" +
          (p.appBlocked
            ? "<button type=\"button\" class=\"player-crm__danger-btn\" id=\"playerCrmUnblockPlayerBtn\">Разблокировать игрока</button>"
            : "<button type=\"button\" class=\"player-crm__danger-btn\" id=\"playerCrmBlockPlayerBtn\">Заблокировать насовсем</button>") +
        "</div>" +
      "</div>" +
      "<div class=\"player-crm__timeline\">" +
        (p.timeline || []).map(function (row) { return "<div class=\"player-crm__timeline-item\">" + esc(row) + "</div>"; }).join("") +
        renderTouches(p) +
      "</div>" +
      "</div>";
  }

  function closePlayerModal() {
    state.playerModalOpen = false;
    state.selectedId = "";
    renderList();
    renderDetail();
  }

  function renderTouches(p) {
    if (!p || !Array.isArray(p.touches) || !p.touches.length) return "";
    return p.touches.slice(0, 5).map(function (t) {
      var at = t.at ? new Date(t.at).toLocaleString("ru-RU") : "";
      return "<div class=\"player-crm__timeline-item\"><strong>Касание</strong> · " + esc(at) + " · " + esc(t.channel || "канал") + " · " + esc(t.segment || "") + "</div>";
    }).join("");
  }

  function metric(label, value) {
    return "<div class=\"player-crm__metric\"><span>" + esc(label) + "</span><strong>" + esc(value) + "</strong></div>";
  }

  function registrationMethodLabel(methods) {
    var list = Array.isArray(methods) ? methods : [];
    var out = [];
    if (list.indexOf("email") >= 0) out.push("Почта");
    if (list.indexOf("telegram") >= 0) out.push("Telegram");
    return out.length ? out.join(" + ") : "—";
  }

  function registrationTelegramLabel(row) {
    if (!row) return "—";
    if (row.telegramUsername) return row.telegramUsername;
    if (Array.isArray(row.telegramIds) && row.telegramIds.length) return row.telegramIds.join(", ");
    return "—";
  }

  function registrationInviteLabel(row) {
    if (!row || !row.invitedBy) return "—";
    return row.invitedByName && row.invitedByName !== row.invitedBy
      ? row.invitedByName + " · " + row.invitedBy
      : row.invitedBy;
  }

  function filteredRegistrations() {
    var rows = Array.isArray(state.registeredAccounts) ? state.registeredAccounts.slice() : [];
    rows = rows.filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    if (state.registrationMethod === "email") {
      rows = rows.filter(function (r) { return r.methods && r.methods.indexOf("email") >= 0; });
    } else if (state.registrationMethod === "telegram") {
      rows = rows.filter(function (r) { return r.methods && r.methods.indexOf("telegram") >= 0; });
    }
    var sort = state.registrationSort || "name";
    rows.sort(function (a, b) {
      function val(row) {
        if (sort === "email") return row.email || "";
        if (sort === "telegram") return registrationTelegramLabel(row);
        if (sort === "method") return registrationMethodLabel(row.methods);
        return row.name || row.accountId || "";
      }
      return String(val(a)).toLowerCase().localeCompare(String(val(b)).toLowerCase(), "ru");
    });
    return rows;
  }

  function renderRegistrations() {
    var el = document.getElementById("playerCrmRegistrations");
    if (!el) return;
    var allRows = (Array.isArray(state.registeredAccounts) ? state.registeredAccounts : []).filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    var rows = filteredRegistrations();
    var emailOnlyCount = registrationRowsByMethod("email").length;
    var telegramOnlyCount = registrationRowsByMethod("telegram").length;
    var bothCount = registrationRowsByMethod("both").length;
    if (!allRows.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Зарегистрированных аккаунтов по почте или Telegram-боту пока нет.</div>";
      return;
    }
    var summary =
      "<div class=\"player-crm__metrics player-crm__metrics--registrations\">" +
        metric("Показано", intFmt(rows.length)) +
        metric("Всего", intFmt(allRows.length)) +
        metric("Только почта", intFmt(emailOnlyCount)) +
        metric("Только Telegram", intFmt(telegramOnlyCount)) +
        metric("И то и то", intFmt(bothCount)) +
      "</div>";
    if (!rows.length) {
      el.innerHTML = summary + "<div class=\"player-crm__timeline-item\">По этому фильтру пусто.</div>";
      return;
    }
    var table = "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__registrations-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Регистрация</th><th>Email</th><th>Telegram-логин</th><th>Имя</th><th>Пригласил</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
          "<td>" + esc(tg !== "—" ? tg : registrationMethodLabel(r.methods)) + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
          "<td>" + esc(tg) + "</td>" +
          "<td>" + esc(r.name || "—") + "</td>" +
          "<td>" + esc(registrationInviteLabel(r)) + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>";
    el.innerHTML = summary + table;
  }

  function dateOnly(iso) {
    var ms = Date.parse(String(iso || ""));
    return Number.isFinite(ms) ? localDateKey(new Date(ms)) : String(iso || "").slice(0, 10);
  }

  function dateTime(iso) {
    var d = iso ? new Date(iso) : null;
    if (!d || isNaN(d.getTime())) return "—";
    return d.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  var crmTableSortKeys = {
    pokerplus: ["pokerPlusSortField", "pokerPlusSortDir"],
    "registration-modal": ["registrationModalSortField", "registrationModalSortDir"],
    "bot-modal": ["botModalSortField", "botModalSortDir"],
    "push-modal": ["pushModalSortField", "pushModalSortDir"],
    "visits-modal": ["visitsModalSortField", "visitsModalSortDir"],
  };
  function setTableSort(scope, field) {
    var keys = crmTableSortKeys[scope];
    if (!keys || !field) return false;
    if (state[keys[0]] === field) state[keys[1]] = state[keys[1]] === "asc" ? "desc" : "asc";
    else { state[keys[0]] = field; state[keys[1]] = field === "name" ? "asc" : "desc"; }
    return true;
  }
  function renderSortScope(scope) {
    if (scope === "pokerplus") { renderPokerPlusAccounts(); renderPokerPlusModal(); }
    else if (scope === "registration-modal") renderRegistrationModal();
    else if (scope === "bot-modal") renderBotModal();
    else if (scope === "push-modal") renderPushModal();
    else if (scope === "visits-modal") renderVisitsModal();
  }
  var playerCrmPokerPlusRuntime = typeof initPlayerCrmPokerPlusRuntime === "function"
    ? initPlayerCrmPokerPlusRuntime({
      state: state,
      esc: esc,
      money: money,
      intFmt: intFmt,
      dateInSelectedPeriod: dateInSelectedPeriod,
      periodLabel: periodLabel,
      dateOnly: dateOnly,
      dateTime: dateTime,
      metric: metric,
      noOpenDialogModals: noOpenDialogModals,
      renderStats: function () { return renderStats(); }
    })
    : {};
  var filteredPokerPlusAccounts = playerCrmPokerPlusRuntime.filteredPokerPlusAccounts || function () { return []; };
  var renderPokerPlusAccounts = playerCrmPokerPlusRuntime.renderPokerPlusAccounts || function () {};
  var renderPokerPlusModal = playerCrmPokerPlusRuntime.renderPokerPlusModal || function () {};
  var closePokerPlusModal = playerCrmPokerPlusRuntime.closePokerPlusModal || function () {};

  function renderGeneralMessagesModalList() {
    var chat = state.chatStats || {};
    var rows = chat.generalMessages && Array.isArray(chat.generalMessages.authors) ? chat.generalMessages.authors : [];
    if (!rows.length) return renderModalPeriodControls() + "<div class=\"player-crm__timeline-item\">За выбранный период сообщений в главном чате пока нет.</div>";
    var visibleRows = state.showAllGeneralMessagesModal ? rows : rows.slice(0, 10);
    return renderModalPeriodControls() + "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Игрок</th><th>ID</th><th>Сообщений</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        return "<tr>" +
          "<td>" + esc(r.name || "—") + "</td>" +
          "<td>" + esc(r.handle || r.id || "—") + "</td>" +
          "<td>" + esc(intFmt(r.count || 0)) + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>" +
      (!state.showAllGeneralMessagesModal && rows.length > 10
        ? "<div class=\"player-crm__modal-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-show-all-general-messages>Показать всех " + esc(intFmt(rows.length)) + "</button></div>"
        : "") + "</div>";
  }

  function renderGeneralMessagesModal() {
    var modal = document.getElementById("playerCrmGeneralMessagesModal");
    var subtitleEl = document.getElementById("playerCrmGeneralMessagesModalSubtitle");
    var bodyEl = document.getElementById("playerCrmGeneralMessagesModalBody");
    if (!modal || !bodyEl) return;
    if (!state.generalMessagesModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var chat = state.chatStats || {};
    var rows = chat.generalMessages && Array.isArray(chat.generalMessages.authors) ? chat.generalMessages.authors : [];
    if (subtitleEl) subtitleEl.textContent = "Главный чат · " + periodLabel() + " · " + intFmt(rows.length) + " участников";
    bodyEl.innerHTML = renderGeneralMessagesModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeGeneralMessagesModal() {
    state.generalMessagesModalOpen = false;
    state.showAllGeneralMessagesModal = false;
    renderStats();
    renderGeneralMessagesModal();
  }

  function channelSubscribersRows(channel) {
    var rows = (Array.isArray(state.players) ? state.players.slice() : [])
      .filter(function (p) {
        var field = channel === "push" ? "pushSubscribedAt" : "botSubscribedAt";
        return !!(p.channels && p.channels[channel]) && dateInSelectedPeriod(p[field]);
      });
    return sortChannelSubscribersRows(rows, channel);
  }

  function channelSortValue(row, field) {
    if (field === "botSubscribedAt" || field === "pushSubscribedAt") return pokerPlayerCrmSortDateValue(row && row[field]);
    return String((row && (row.name || row.handle || row.id)) || "").toLowerCase();
  }

  function sortChannelSubscribersRows(rows, channel) {
    var fieldKey = channel === "push" ? "pushModalSortField" : "botModalSortField";
    var dirKey = channel === "push" ? "pushModalSortDir" : "botModalSortDir";
    var field = state[fieldKey] || (channel === "push" ? "pushSubscribedAt" : "botSubscribedAt");
    return pokerPlayerCrmSortRows(rows, function (row) {
      return channelSortValue(row, field);
    }, state[dirKey] || "desc", function (a, b) {
      return String(a.name || a.handle || a.id || "").localeCompare(String(b.name || b.handle || b.id || ""), "ru");
    });
  }

  function renderChannelSubscribersTable(rows, emptyText, dateField, dateHeader) {
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">" + esc(emptyText) + "</div>";
    var isPush = dateField === "pushSubscribedAt";
    var scope = isPush ? "push-modal" : "bot-modal";
    var sortField = state[isPush ? "pushModalSortField" : "botModalSortField"] || dateField;
    var sortDir = state[isPush ? "pushModalSortDir" : "botModalSortDir"] || "desc";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__channel-table player-crm__channel-table--modal\"><thead><tr>" +
      pokerPlayerCrmSortableTh(esc, scope, dateField, dateHeader, sortField, sortDir) + "<th>Игрок</th><th>Telegram</th><th>Источник</th>" +
      "</tr></thead><tbody>" + rows.map(function (p) {
        return "<tr>" +
          "<td>" + esc(dateTime(p[dateField])) + "</td>" +
          "<td>" + esc(p.name || "—") + "</td>" +
          "<td>" + esc(p.handle || "—") + "</td>" +
          "<td>" + esc(p.source || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function botSubscribersRows() {
    return channelSubscribersRows("bot");
  }

  function renderBotModalList() {
    return renderChannelSubscribersTable(botSubscribersRows(), "Новых подписок на бот за период пока нет.", "botSubscribedAt", "Дата подписки");
  }

  function renderBotModal() {
    var modal = document.getElementById("playerCrmBotModal");
    var subtitleEl = document.getElementById("playerCrmBotModalSubtitle");
    var bodyEl = document.getElementById("playerCrmBotModalBody");
    if (!modal || !bodyEl) return;
    if (!state.botModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = botSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = "Новые подписки · " + periodLabel() + " · " + intFmt(rows.length) + " игроков";
    bodyEl.innerHTML = renderBotModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeBotModal() {
    state.botModalOpen = false;
    renderStats();
    renderBotModal();
  }

  function pushSubscribersRows() {
    return channelSubscribersRows("push");
  }

  function renderPushModalList() {
    return renderChannelSubscribersTable(pushSubscribersRows(), "Новых push-подписок за период пока нет.", "pushSubscribedAt", "Дата привязки push");
  }

  function renderPushModal() {
    var modal = document.getElementById("playerCrmPushModal");
    var subtitleEl = document.getElementById("playerCrmPushModalSubtitle");
    var bodyEl = document.getElementById("playerCrmPushModalBody");
    if (!modal || !bodyEl) return;
    if (!state.pushModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = pushSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = "Новые подписки · " + periodLabel() + " · " + intFmt(rows.length) + " игроков";
    bodyEl.innerHTML = renderPushModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closePushModal() {
    state.pushModalOpen = false;
    renderStats();
    renderPushModal();
  }

  function renderSegments() {
    var el = document.getElementById("playerCrmSegments");
    if (!el) return;
    el.innerHTML = segments.filter(function (s) { return s.key !== "all"; }).map(function (seg) {
      var players = segmentPlayers(seg.key);
      var dep = players.reduce(function (sum, p) { return sum + periodData(p).deposits; }, 0);
      return "<article class=\"player-crm__segment-card\">" +
        "<h4>" + esc(seg.label) + "</h4>" +
        "<p>" + esc(seg.desc) + "</p>" +
        "<div class=\"player-crm__segment-actions\"><span class=\"player-crm__badge\">" + players.length + " игроков</span><span class=\"player-crm__detail-muted\">" + esc(money(dep)) + " · " + esc(periodLabel()) + "</span></div>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-use-segment=\"" + esc(seg.key) + "\">Открыть список</button><button type=\"button\" class=\"player-crm__primary-btn\" data-crm-broadcast-segment=\"" + esc(seg.key) + "\">Рассылка</button></div>" +
      "</article>";
    }).join("");
  }

  function broadcastAudiencePeriodKey() {
    var range = selectedPeriodRange();
    return range && range.from && range.to ? range.from + ":" + range.to : "all";
  }

  function broadcastSegmentPlayers(key) {
    var seg = segmentByKey(key);
    return (Array.isArray(state.broadcastPlayers) ? state.broadcastPlayers : []).filter(function (player) {
      return !seg || seg.match(player);
    });
  }

  function loadBroadcastAudience(force) {
    var key = broadcastAudiencePeriodKey();
    var fresh = state.broadcastAudienceLoadedAt && Date.now() - state.broadcastAudienceLoadedAt < 120000;
    if (!force && fresh && state.broadcastAudiencePeriodKey === key) {
      renderBroadcastOptions();
      return Promise.resolve(true);
    }
    return loadCrmHeavyData("broadcast");
  }

  function renderBroadcastOptions() {
    var sel = document.getElementById("playerCrmBroadcastSegment");
    if (sel) {
      var prev = sel.value || state.filter || "has_bot";
      sel.innerHTML = segments.map(function (seg) {
        var count = broadcastSegmentPlayers(seg.key).length;
        return "<option value=\"" + esc(seg.key) + "\">" + esc(seg.label) + " · " + esc(intFmt(count)) + "</option>";
      }).join("");
      sel.value = segmentByKey(prev).key;
    }
    updateBroadcastChannelCounts();
    updateBroadcastAudience();
  }

  function updateBroadcastChannelCounts() {
    var sel = document.getElementById("playerCrmBroadcastChannel");
    if (!sel) return;
    var players = Array.isArray(state.broadcastPlayers) ? state.broadcastPlayers : [];
    var botCount = players.filter(function (player) { return !!((player.channels || {}).bot); }).length;
    var pushCount = players.filter(function (player) { return !!((player.channels || {}).push); }).length;
    var audienceReady = !!state.broadcastAudienceLoadedAt && !state.heavyLoading;
    var labels = {
      bot: "Рассылка в бот · " + (audienceReady ? intFmt(botCount) : "…"),
      push: "Push · " + (audienceReady ? intFmt(pushCount) : "…")
    };
    Array.prototype.forEach.call(document.querySelectorAll("[data-crm-broadcast-channel]"), function (button) {
      var value = button.getAttribute("data-crm-broadcast-channel") || "bot";
      if (labels[value]) button.textContent = labels[value];
      var active = value === sel.value;
      button.classList.toggle("player-crm__broadcast-channel-tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function selectBroadcastChannel(channel) {
    var input = document.getElementById("playerCrmBroadcastChannel");
    if (!input) return;
    input.value = channel === "push" ? "push" : "bot";
    var batchNumber = document.getElementById("playerCrmBroadcastBatchNumber");
    if (batchNumber) batchNumber.value = "1";
    updateBroadcastChannelCounts();
    updateBroadcastAudience();
    syncBroadcastChannelMode();
  }

  function updateBroadcastAudience() {
    var el = document.getElementById("playerCrmBroadcastAudience");
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var channel = channelEl ? channelEl.value : "bot";
    var basePlayers = (Array.isArray(state.broadcastPlayers) ? state.broadcastPlayers : []).filter(function (player) {
      var channels = player.channels || {};
      if (channel === "push") return !!channels.push;
      if (channel === "bot_push") return !!channels.bot || !!channels.push;
      return !!channels.bot;
    });
    var filters = broadcastInnerFilterValues();
    var players = applyBroadcastInnerFilters(basePlayers, filters);
    var batch = readBroadcastBatch(players);
    if (el) {
      var filterLabel = filters.length && basePlayers.length !== players.length
        ? "после фильтров " + intFmt(players.length) + " из " + intFmt(basePlayers.length)
        : intFmt(players.length) + " получателей";
      el.textContent = filterLabel + " · " + batch.label;
    }
    renderBroadcastBatchSummary(batch);
    return players;
  }

  function broadcastInnerFilterValues() {
    var wrap = document.getElementById("playerCrmBroadcastFilters");
    if (!wrap) return [];
    return Array.prototype.slice.call(wrap.querySelectorAll("input[type=\"checkbox\"]:checked"))
      .map(function (el) { return String(el.value || "").trim(); })
      .filter(Boolean);
  }

  function broadcastDaysValue(value) {
    var n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function broadcastLastTouchMs(player) {
    var touches = Array.isArray(player && player.touches) ? player.touches : [];
    for (var i = 0; i < touches.length; i += 1) {
      var ms = Date.parse((touches[i] && (touches[i].at || touches[i].createdAt)) || "");
      if (Number.isFinite(ms)) return ms;
    }
    return 0;
  }

  function broadcastMatchesInnerFilter(player, filter) {
    var p = player || {};
    var channels = p.channels || {};
    if (filter === "bot_only") return !!channels.bot;
    if (filter === "push_no_bot") return !!channels.push && !channels.bot;
    if (filter === "has_deposit") {
      var deposits = p.deposits || {};
      var key = state.period === "custom" ? "custom" : String(state.period || "30");
      return (Number(deposits[key]) || 0) > 0 || (Number(deposits.all) || 0) > 0;
    }
    if (filter === "no_touch_24h") {
      var lastTouch = broadcastLastTouchMs(p);
      if (!lastTouch) return true;
      return Date.now() - lastTouch >= 24 * 3600000;
    }
    if (filter === "inactive_30d") {
      var values = [p.lastMessageDays, p.lastDepositDays, p.lastTouchDays].map(broadcastDaysValue).filter(function (n) { return n != null; });
      if (!values.length) return true;
      return Math.min.apply(null, values) >= 30;
    }
    return true;
  }

  function applyBroadcastInnerFilters(players, filters) {
    var selected = Array.isArray(filters) ? filters.filter(Boolean) : [];
    var list = (Array.isArray(players) ? players : []).filter(function (player) { return !(player && player.appBlocked); });
    if (!selected.length) return list;
    return list.filter(function (player) {
      return selected.every(function (filter) { return broadcastMatchesInnerFilter(player, filter); });
    });
  }

  function playerBroadcastId(player) {
    if (!player) return "";
    return String(player.accountId || player.id || "").trim();
  }

  function readPositiveIntegerInput(id, fallback, min, max) {
    var el = document.getElementById(id);
    var raw = el ? Number(el.value) : NaN;
    var value = Number.isFinite(raw) ? Math.floor(raw) : fallback;
    value = Math.max(min, value);
    if (Number.isFinite(max)) value = Math.min(max, value);
    if (el && String(el.value) !== String(value)) el.value = String(value);
    return value;
  }

  function readBroadcastBatch(players) {
    players = Array.isArray(players) ? players : [];
    var size = readPositiveIntegerInput("playerCrmBroadcastBatchSize", 100, 1, 500);
    var total = players.length;
    var totalBatches = Math.max(1, Math.ceil(total / size));
    var number = readPositiveIntegerInput("playerCrmBroadcastBatchNumber", 1, 1, totalBatches);
    var numberEl = document.getElementById("playerCrmBroadcastBatchNumber");
    if (numberEl && String(numberEl.value) !== String(number)) numberEl.value = String(number);
    var fromIndex = total ? (number - 1) * size : 0;
    var toIndex = Math.min(total, fromIndex + size);
    var ids = players.slice(fromIndex, toIndex).map(playerBroadcastId).filter(Boolean);
    var rangeLabel = total ? intFmt(fromIndex + 1) + "-" + intFmt(toIndex) : "0";
    return {
      size: size,
      number: number,
      totalBatches: totalBatches,
      fromIndex: fromIndex,
      toIndex: toIndex,
      total: total,
      count: ids.length,
      ids: ids,
      label: "пачка " + intFmt(number) + "/" + intFmt(totalBatches) + ": " + intFmt(ids.length),
      summary: "Пачка " + intFmt(number) + "/" + intFmt(totalBatches) + " · получателей " + rangeLabel + " из " + intFmt(total),
    };
  }

  function renderBroadcastBatchSummary(batch) {
    var summary = document.getElementById("playerCrmBroadcastBatchSummary");
    var prev = document.getElementById("playerCrmBroadcastBatchPrevBtn");
    var next = document.getElementById("playerCrmBroadcastBatchNextBtn");
    if (summary) summary.textContent = batch ? batch.summary : "Пачка 1/1 · получателей 0";
    if (prev) prev.disabled = !batch || batch.number <= 1;
    if (next) next.disabled = !batch || batch.number >= batch.totalBatches;
  }

  function stepBroadcastBatch(delta) {
    var players = updateBroadcastAudience();
    var batch = readBroadcastBatch(players);
    var numberEl = document.getElementById("playerCrmBroadcastBatchNumber");
    var nextNumber = Math.max(1, Math.min(batch.totalBatches, batch.number + delta));
    if (numberEl) numberEl.value = String(nextNumber);
    updateBroadcastAudience();
  }

  var CRM_LINK_TARGETS = [
    { key: "home", label: "Главная", view: "home", startapp: "home" },
    { key: "raffles", label: "Розыгрыши", view: "raffles", startapp: "raffles" },
    { key: "daily-poker", label: "Раздача дня", view: "daily-poker", startapp: "daily_poker" },
    { key: "daily-prediction", label: "Прогноз дня", view: "home", startapp: "daily_prediction" },
    { key: "private-cash", label: "Приватный кеш", view: "home", startapp: "private_cash" },
    { key: "sng-champions", label: "СНГ", view: "home", startapp: "sng_champions" },
    { key: "club-charter", label: "Устав клуба", view: "home", startapp: "club_charter" },
    { key: "club-choice-vote", label: "Голосование клуба", view: "home", startapp: "club_choice_vote" },
    { key: "vpn-proxy", label: "VPN и прокси", view: "home", startapp: "vpn_proxy" },
    { key: "vpn-proxy-proxy", label: "Прокси", view: "home", startapp: "vpn_proxy_proxy" },
    { key: "chat", label: "Чат", view: "chat", startapp: "club_chat" },
    { key: "gazette", label: "Газета", view: "home", startapp: "gazette" },
    { key: "video-lessons", label: "Видеоуроки", view: "video-lessons", startapp: "video_lessons" },
    { key: "video-lessons-reviews", label: "Отзывы учеников", view: "video-lessons", startapp: "vl_reviews_nikolay" },
    { key: "learn-play-hub", label: "Научиться играть", view: "learn-play-hub", startapp: "learn_play_hub" },
    { key: "poker-tasks", label: "Покерные задачи", view: "poker-tasks", startapp: "poker_task_mtt" },
    { key: "club-tasks", label: "Задания клуба", view: "poker-tasks", startapp: "club_tasks" },
    { key: "equilator", label: "Эквилятор", view: "equilator", startapp: "equilator" },
    { key: "winter-rating", label: "Зимний рейтинг", view: "winter-rating", startapp: "winter_rating" },
    { key: "spring-rating", label: "Весенний рейтинг", view: "spring-rating", startapp: "spring_rating" },
    { key: "spring-rating-league-1", label: "Весенний рейтинг · Лига 1", view: "spring-rating", startapp: "spring_rating_league_1" },
    { key: "spring-rating-league-2", label: "Весенний рейтинг · Лига 2", view: "spring-rating", startapp: "spring_rating_league_2" },
    { key: "summer-rating", label: "Летний рейтинг", view: "summer-rating", startapp: "summer_rating" },
    { key: "summer-rating-league-1", label: "Летний рейтинг · Лига 1", view: "summer-rating", startapp: "summer_rating_league_1" },
    { key: "summer-rating-league-2", label: "Летний рейтинг · Лига 2", view: "summer-rating", startapp: "summer_rating_league_2" },
    { key: "hall-of-fame", label: "Зал славы", view: "hall-of-fame", startapp: "hall_fame_top2026" },
    { key: "hall-of-fame-legends", label: "Зал славы · Легенды", view: "hall-of-fame", startapp: "hall_fame_legends" },
    { key: "hall-of-fame-cups", label: "Зал славы · Кубки", view: "hall-of-fame", startapp: "hall_fame_cups" },
    { key: "hall-of-fame-photos", label: "Зал славы · Фото", view: "hall-of-fame", startapp: "hall_fame_photos" },
    { key: "hall-of-fame-shame", label: "Зал славы · Доска позора", view: "hall-of-fame", startapp: "hall_fame_shame" },
    { key: "streams", label: "Стримы", view: "streams", startapp: "streams" },
    { key: "streams-delayed", label: "Стримы · отложенные", view: "streams", startapp: "streams_delayed" },
    { key: "download", label: "Скачать PWA", view: "download", startapp: "download" },
    { key: "download-poker21", label: "Скачать Poker21", view: "download", startapp: "download_poker21" },
    { key: "download-xpoker", label: "Скачать Xpoker", view: "download", startapp: "download_xpoker" },
    { key: "download-pppoker", label: "Скачать PPPoker", view: "download", startapp: "download_pppoker" },
    { key: "download-supremapoker", label: "Скачать Supremapoker", view: "download", startapp: "download_supremapoker" },
    { key: "cashout", label: "Касса", view: "cashout", startapp: "cashout" },
    { key: "transfers", label: "Переводы", view: "transfers", startapp: "transfers" },
    { key: "profile", label: "Профиль", view: "profile", startapp: "profile" },
    { key: "schedule", label: "Расписание", view: "schedule", startapp: "schedule" },
    { key: "bonus-game", label: "Игра · Найди туза", view: "bonus-game", startapp: "bonus_game" },
    { key: "plasterer-game", label: "Игра · Переедь Штукатура", view: "plasterer-game", startapp: "plasterer_game" },
    { key: "cooler-game", label: "Игра · Кулер", view: "cooler-game", startapp: "cooler_game" }
  ];

  function crmLinkTargetByKey(key) {
    key = String(key || "").trim();
    for (var i = 0; i < CRM_LINK_TARGETS.length; i++) {
      if (CRM_LINK_TARGETS[i].key === key || CRM_LINK_TARGETS[i].startapp === key || CRM_LINK_TARGETS[i].view === key) return CRM_LINK_TARGETS[i];
    }
    return CRM_LINK_TARGETS[0];
  }

  function renderCrmLinkTargetOptions() {
    var sel = document.getElementById("playerCrmLinkTarget");
    if (!sel || sel.dataset.crmLinkTargetsReady === "1") return;
    sel.innerHTML = CRM_LINK_TARGETS.map(function (target) {
      return "<option value=\"" + esc(target.key) + "\">" + esc(target.label) + "</option>";
    }).join("");
    sel.dataset.crmLinkTargetsReady = "1";
  }

  function renderBroadcastLinkTargetOptions() {
    ["playerCrmBroadcastButtonTarget", "playerCrmBroadcastButtonTarget2"].forEach(function (id) {
      var sel = document.getElementById(id);
      if (!sel || sel.dataset.crmBroadcastLinkTargetsReady === "1") return;
      sel.innerHTML = "<option value=\"\">Своя ссылка</option>" + CRM_LINK_TARGETS.map(function (target) {
        return "<option value=\"" + esc(target.key) + "\">" + esc(target.label) + "</option>";
      }).join("");
      sel.dataset.crmBroadcastLinkTargetsReady = "1";
    });
    var pushSel = document.getElementById("playerCrmBroadcastPushTarget");
    if (pushSel && pushSel.dataset.crmBroadcastLinkTargetsReady !== "1") {
      pushSel.innerHTML = CRM_LINK_TARGETS.map(function (target) {
        return "<option value=\"" + esc(target.key) + "\">" + esc(target.label) + "</option>";
      }).join("");
      pushSel.value = "raffles";
      pushSel.dataset.crmBroadcastLinkTargetsReady = "1";
    }
    var defaultButtonText = document.getElementById("playerCrmBroadcastButtonText");
    var defaultButtonTarget = document.getElementById("playerCrmBroadcastButtonTarget");
    var defaultButtonUrl = document.getElementById("playerCrmBroadcastButtonUrl");
    if (defaultButtonText && !String(defaultButtonText.value || "").trim()) {
      defaultButtonText.value = "Участвовать в розыгрыше";
    }
    if (defaultButtonTarget && !String(defaultButtonTarget.value || "").trim()) {
      defaultButtonTarget.value = "raffles";
    }
    if (defaultButtonUrl && !String(defaultButtonUrl.value || "").trim()) {
      defaultButtonUrl.value = buildCrmLinkUrl("raffles");
    }
  }

  function broadcastButtonTarget(buttonNo) {
    var sel = document.getElementById(buttonNo === 2 ? "playerCrmBroadcastButtonTarget2" : "playerCrmBroadcastButtonTarget");
    var value = sel ? String(sel.value || "").trim() : "";
    return value ? crmLinkTargetByKey(value) : null;
  }

  function syncBroadcastButtonTarget(buttonNo) {
    var target = broadcastButtonTarget(buttonNo);
    if (!target) return;
    var urlEl = document.getElementById(buttonNo === 2 ? "playerCrmBroadcastButtonUrl2" : "playerCrmBroadcastButtonUrl");
    var textEl = document.getElementById(buttonNo === 2 ? "playerCrmBroadcastButtonText2" : "playerCrmBroadcastButtonText");
    if (urlEl) urlEl.value = buildCrmLinkUrl(target.startapp);
    if (textEl && !String(textEl.value || "").trim()) textEl.value = "Открыть";
  }

  function broadcastButtonEnabled() {
    var enabledEl = document.getElementById("playerCrmBroadcastButtonEnabled");
    return !!(enabledEl && enabledEl.checked);
  }

  var CRM_BROADCAST_EMOJIS = ["🔥", "✅", "🎉", "🏆", "💰", "🤑", "👍", "👏", "🙌", "🤝", "💪", "🙏", "❤️", "⭐", "✨", "💯", "😍", "🥳", "😎", "🤩", "😉", "😊", "😂", "🤣", "🤔", "👋", "♠️", "♥️", "♦️", "♣️", "🃏", "🎲"];

  function insertBroadcastEmoji(emoji) {
    var textEl = document.getElementById("playerCrmBroadcastText");
    if (!textEl || textEl.disabled) return;
    var value = String(textEl.value || "");
    var start = typeof textEl.selectionStart === "number" ? textEl.selectionStart : value.length;
    var end = typeof textEl.selectionEnd === "number" ? textEl.selectionEnd : start;
    var next = value.slice(0, start) + emoji + value.slice(end);
    var max = Number(textEl.getAttribute("maxlength")) || 0;
    if (max && next.length > max) return;
    textEl.value = next;
    var caret = start + emoji.length;
    try {
      textEl.focus();
      textEl.selectionStart = textEl.selectionEnd = caret;
    } catch (eEmojiFocus) {}
    try {
      textEl.dispatchEvent(new Event("input", { bubbles: true }));
    } catch (eEmojiInput) {}
  }

  function insertBroadcastFormat(kind) {
    var textEl = document.getElementById("playerCrmBroadcastText");
    if (!textEl || textEl.disabled) return;
    var value = String(textEl.value || "");
    var start = typeof textEl.selectionStart === "number" ? textEl.selectionStart : value.length;
    var end = typeof textEl.selectionEnd === "number" ? textEl.selectionEnd : start;
    var selected = value.slice(start, end);
    var open = "";
    var close = "";
    var fallback = "";
    if (kind === "bold") {
      open = "<b>";
      close = "</b>";
      fallback = "жирный текст";
    } else if (kind === "italic") {
      open = "<i>";
      close = "</i>";
      fallback = "текст курсивом";
    } else if (kind === "link") {
      var enteredUrl = window.prompt ? window.prompt("Вставьте ссылку, начинающуюся с https://") : "";
      if (!enteredUrl) return;
      var normalizedUrl = "";
      try {
        var parsedUrl = new URL(String(enteredUrl).trim());
        if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") throw new Error("bad_protocol");
        normalizedUrl = parsedUrl.href;
      } catch (eUrl) {
        setBroadcastResult("Ссылка должна начинаться с https:// или http://");
        return;
      }
      open = '<a href="' + normalizedUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '">';
      close = "</a>";
      fallback = "текст ссылки";
    } else {
      return;
    }
    var inner = selected || fallback;
    var replacement = open + inner + close;
    var max = Number(textEl.getAttribute("maxlength")) || 0;
    var next = value.slice(0, start) + replacement + value.slice(end);
    if (max && next.length > max) {
      setBroadcastResult("Не хватает места: превышен лимит текста рассылки.");
      return;
    }
    textEl.value = next;
    try {
      textEl.focus();
      textEl.selectionStart = start + open.length;
      textEl.selectionEnd = start + open.length + inner.length;
      textEl.dispatchEvent(new Event("input", { bubbles: true }));
    } catch (eFormatFocus) {}
  }

  function initBroadcastFormatToolbar() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-crm-broadcast-format]"), function (button) {
      if (button.dataset.crmBroadcastFormatReady === "1") return;
      button.dataset.crmBroadcastFormatReady = "1";
      button.addEventListener("click", function () {
        insertBroadcastFormat(button.getAttribute("data-crm-broadcast-format") || "");
      });
    });
  }

  function broadcastFormattedPreviewHtml(text) {
    var source = String(text || "");
    var out = "";
    var last = 0;
    var tagRe = /<\/?(?:b|strong|i|em)>|<a\s+href="(https?:\/\/[^"]+)"\s*>|<\/a>/gi;
    var match;
    while ((match = tagRe.exec(source))) {
      out += esc(source.slice(last, match.index));
      if (match[1]) out += '<a href="' + esc(match[1]) + '" target="_blank" rel="noopener noreferrer">';
      else out += match[0].toLowerCase();
      last = tagRe.lastIndex;
    }
    return out + esc(source.slice(last));
  }

  function broadcastPlainText(text) {
    return String(text || "")
      .replace(/<\/?(?:b|strong|i|em)>/gi, "")
      .replace(/<a\s+href="[^"]+"\s*>/gi, "")
      .replace(/<\/a>/gi, "");
  }

  function initBroadcastEmojiPicker() {
    var wrap = document.getElementById("playerCrmBroadcastEmojiWrap");
    var panel = document.getElementById("playerCrmBroadcastEmojiPanel");
    var toggle = document.getElementById("playerCrmBroadcastEmojiToggle");
    if (!wrap || !panel || !toggle || panel.dataset.crmEmojiReady === "1") return;
    panel.dataset.crmEmojiReady = "1";
    panel.innerHTML = CRM_BROADCAST_EMOJIS.map(function (emoji) {
      return "<button type=\"button\" class=\"player-crm__broadcast-emoji-item\" data-crm-broadcast-emoji=\"" + esc(emoji) + "\" aria-label=\"" + esc("Вставить " + emoji) + "\">" + esc(emoji) + "</button>";
    }).join("");
    function setEmojiPanelOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Закрыть смайлы" : "Открыть смайлы");
    }
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setEmojiPanelOpen(panel.hidden);
    });
    panel.addEventListener("click", function (e) {
      var emojiBtn = e.target && e.target.closest ? e.target.closest("[data-crm-broadcast-emoji]") : null;
      if (!emojiBtn) return;
      e.preventDefault();
      insertBroadcastEmoji(emojiBtn.getAttribute("data-crm-broadcast-emoji") || "");
      setEmojiPanelOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && e.target && !wrap.contains(e.target)) setEmojiPanelOpen(false);
    });
  }

  function syncBroadcastButtonMode() {
    var enabled = broadcastButtonEnabled();
    var fields = document.getElementById("playerCrmBroadcastButtonFields");
    if (fields) fields.hidden = !enabled;
    if (!enabled) setBroadcastButton2Enabled(false);
    ["playerCrmBroadcastButtonText", "playerCrmBroadcastButtonTarget", "playerCrmBroadcastButtonUrl"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = !enabled;
    });
  }

  function syncBroadcastTextCounter() {
    var textEl = document.getElementById("playerCrmBroadcastText");
    var counter = document.getElementById("playerCrmBroadcastTextCounter");
    if (!textEl || !counter) return;
    var max = Number(textEl.getAttribute("maxlength")) || 900;
    var remaining = Math.max(0, max - String(textEl.value || "").length);
    var mod100 = remaining % 100;
    var mod10 = remaining % 10;
    var word = mod100 >= 11 && mod100 <= 19
      ? "символов"
      : (mod10 === 1 ? "символ" : (mod10 >= 2 && mod10 <= 4 ? "символа" : "символов"));
    counter.hidden = false;
    counter.textContent = "Осталось: " + remaining + " " + word;
  }

  function syncBroadcastChannelMode() {
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var isPush = !!(channelEl && channelEl.value === "push");
    Array.prototype.forEach.call(document.querySelectorAll("[data-crm-bot-only]"), function (el) {
      el.hidden = isPush || (el.id === "playerCrmBroadcastButtonFields" && !broadcastButtonEnabled()) ||
        (el.id === "playerCrmBroadcastButtonFields2" && el.hidden);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-crm-push-only]"), function (el) {
      el.hidden = !isPush;
    });
    var textEl = document.getElementById("playerCrmBroadcastText");
    if (textEl) {
      textEl.maxLength = isPush ? 180 : 900;
      if (isPush && textEl.value.length > 180) textEl.value = textEl.value.slice(0, 180);
    }
    if (!isPush) syncBroadcastButtonMode();
    syncBroadcastTextCounter();
  }

  function setBroadcastButton2Enabled(enabled) {
    var fields = document.getElementById("playerCrmBroadcastButtonFields2");
    var addButton = document.getElementById("playerCrmBroadcastAddButton2");
    if (fields) fields.hidden = !enabled;
    if (addButton) addButton.hidden = !!enabled;
    ["playerCrmBroadcastButtonText2", "playerCrmBroadcastButtonTarget2", "playerCrmBroadcastButtonUrl2"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = !enabled;
    });
  }

  function crmLinkFieldValue(id) {
    var el = document.getElementById(id);
    return el && el.value != null ? String(el.value).trim() : "";
  }

  function compactCrmLinkParams(params) {
    var out = {};
    Object.keys(params || {}).forEach(function (key) {
      var value = params[key];
      if (value == null) return;
      if (typeof value === "string" && value.trim() === "") return;
      out[key] = value;
    });
    return out;
  }

  function buildCrmLinkUrl(startParam) {
    var base = "";
    try {
      base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : "";
    } catch (e) {}
    base = String(base || "").replace(/\/$/, "");
    if (!base) return startParam || "";
    return base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(startParam || "");
  }

  function copyCrmLinkText(text) {
    if (!text) return;
    function done(ok) {
      var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgLocal && tgLocal.showAlert) tgLocal.showAlert(ok ? "Ссылка скопирована" : "Не удалось скопировать");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(false); });
      return;
    }
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done(true);
    } catch (e) {
      done(false);
    }
  }

  function setCrmLinksResult(text, isError) {
    var el = document.getElementById("playerCrmLinksResult");
    if (!el) return;
    el.classList.toggle("player-crm__notice--error", !!isError);
    el.innerHTML = text || "";
  }

  function buildCrmTrackingParams() {
    var target = crmLinkTargetByKey(crmLinkFieldValue("playerCrmLinkTarget") || "home");
    return compactCrmLinkParams({
      target_section: target.key,
      target_view: target.view,
      target_startapp: target.startapp,
      target_label: target.label,
      utm_source: crmLinkFieldValue("playerCrmLinkSource"),
      utm_medium: crmLinkFieldValue("playerCrmLinkMedium"),
      utm_campaign: crmLinkFieldValue("playerCrmLinkCampaign"),
      utm_content: crmLinkFieldValue("playerCrmLinkContent"),
      utm_term: crmLinkFieldValue("playerCrmLinkTerm"),
      lead_offer: crmLinkFieldValue("playerCrmLinkOffer"),
      lead_owner: crmLinkFieldValue("playerCrmLinkOwner"),
      lead_note: crmLinkFieldValue("playerCrmLinkNote"),
      created_from: "dashboard_links",
      created_at_client: new Date().toISOString()
    });
  }

  function clearCrmLinkForm() {
    ["playerCrmLinkLabel", "playerCrmLinkSource", "playerCrmLinkMedium", "playerCrmLinkCampaign", "playerCrmLinkContent", "playerCrmLinkTerm", "playerCrmLinkOffer", "playerCrmLinkOwner", "playerCrmLinkNote"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = "";
    });
    setCrmLinksResult("", false);
  }

  function crmLinkMetric(link, key) {
    var n = Number(link && link[key]);
    return Number.isFinite(n) ? n : 0;
  }

  function crmLinkParams(link) {
    return link && link.params && typeof link.params === "object" ? link.params : {};
  }

  function crmLinkTitle(link) {
    return (link && link.label && String(link.label).trim()) || ("ref_" + (link && link.id ? link.id : ""));
  }

  function crmLinkTargetLabel(link) {
    var params = crmLinkParams(link);
    return params.target_label || crmLinkTargetByKey(params.target_section || params.target_startapp || params.target_view).label;
  }

  function crmLinkUrl(link) {
    var id = link && link.id ? String(link.id) : "";
    return id ? buildCrmLinkUrl("ref_" + id) : "";
  }

  function renderCrmTrackingLinks() {
    renderCrmLinkTargetOptions();
    var el = document.getElementById("playerCrmLinksList");
    var summary = document.getElementById("playerCrmLinksSummary");
    if (!el) return;
    var links = Array.isArray(state.trackingLinks) ? state.trackingLinks : [];
    if (summary) summary.textContent = links.length ? intFmt(links.length) + " ссылок" : "Создание и эффективность лидов";
    if (state.trackingLinksLoading) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загружаем ссылки…</div>";
      return;
    }
    if (state.trackingLinksError) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">" + esc(state.trackingLinksError) + "</div>";
      return;
    }
    if (!links.length) {
      el.innerHTML = "<div class=\"player-crm__notice\">Пока нет ссылок. Создай первую и выбери раздел, куда должен приходить лид.</div>";
      return;
    }
    el.innerHTML = "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__links-table\"><thead><tr>" +
      "<th>Название</th><th>Раздел</th><th>Ссылка</th><th>Клики</th><th>Уник.</th><th>Активн.</th><th>Событий</th><th>Действия</th>" +
      "</tr></thead><tbody>" + links.map(function (link) {
        var url = crmLinkUrl(link);
        return "<tr>" +
          "<td><button type=\"button\" class=\"player-crm__table-link\" data-crm-link-details=\"" + esc(link.id || "") + "\">" + esc(crmLinkTitle(link)) + "</button><br><span class=\"player-crm__detail-muted\">ref_" + esc(link.id || "") + "</span></td>" +
          "<td>" + esc(crmLinkTargetLabel(link)) + "</td>" +
          "<td><button type=\"button\" class=\"player-crm__links-url-btn\" data-crm-link-copy=\"" + esc(url) + "\" title=\"Скопировать ссылку\">" + esc(url || "—") + "</button></td>" +
          "<td>" + esc(intFmt(crmLinkMetric(link, "totalClicks"))) + "</td>" +
          "<td>" + esc(intFmt(crmLinkMetric(link, "uniqueClicks"))) + "</td>" +
          "<td>" + esc(intFmt(crmLinkMetric(link, "activeVisitors"))) + "</td>" +
          "<td>" + esc(intFmt(crmLinkMetric(link, "actionEvents"))) + "</td>" +
          "<td><span class=\"player-crm__links-action-row\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-link-details=\"" + esc(link.id || "") + "\">Параметры</button><button type=\"button\" class=\"player-crm__primary-btn\" data-crm-link-copy=\"" + esc(url) + "\">Копировать</button></span></td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>";
  }

  function loadCrmTrackingLinks() {
    var base = getApiBaseSafe();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      state.trackingLinksError = "Нет сессии. Войди по email владельца дашборда.";
      state.trackingLinksLoading = false;
      renderCrmTrackingLinks();
      return;
    }
    state.trackingLinksLoading = true;
    state.trackingLinksError = "";
    renderCrmTrackingLinks();
    fetch(base + "/api/tracking-links" + authQuerySafe())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        state.trackingLinksLoading = false;
        if (!data || !data.ok || !Array.isArray(data.links)) {
          state.trackingLinks = [];
          state.trackingLinksError = (data && data.error) || "Ссылки не загрузились.";
        } else {
          state.trackingLinks = data.links;
          state.trackingLinksLoaded = true;
          state.trackingLinksError = "";
        }
        renderCrmTrackingLinks();
      })
      .catch(function () {
        state.trackingLinksLoading = false;
        state.trackingLinksError = "Ошибка сети при загрузке ссылок.";
        renderCrmTrackingLinks();
      });
  }

  function createCrmTrackingLink() {
    var btn = document.getElementById("playerCrmCreateLinkBtn");
    var base = getApiBaseSafe();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setCrmLinksResult("Нет сессии. Войди по email владельца дашборда.", true);
      return;
    }
    var params = buildCrmTrackingParams();
    var label = crmLinkFieldValue("playerCrmLinkLabel");
    if (!label) label = (params.target_label || "Раздел") + (params.utm_source ? " · " + params.utm_source : "");
    var body = postBodySafe({ label: label, params: params });
    if (btn) btn.disabled = true;
    setCrmLinksResult("Создаём ссылку…", false);
    fetch(base + "/api/tracking-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (btn) btn.disabled = false;
        if (!data || !data.ok || !data.startParam) {
          setCrmLinksResult((data && data.error) || "Не удалось создать ссылку.", true);
          return;
        }
        var url = buildCrmLinkUrl(data.startParam);
        setCrmLinksResult("<div>Ссылка создана.</div><button type=\"button\" class=\"player-crm__links-url-btn\" data-crm-link-copy=\"" + esc(url) + "\">" + esc(url || data.startParam) + "</button>", false);
        loadCrmTrackingLinks();
      })
      .catch(function () {
        if (btn) btn.disabled = false;
        setCrmLinksResult("Ошибка сети при создании ссылки.", true);
      });
  }

  function trackingActionLabel(action) {
    action = String(action || "");
    if (action.indexOf("view:") === 0) return "Экран: " + action.slice(5);
    if (action.indexOf("open:") === 0) return "Клик: " + action.slice(5);
    if (action.indexOf("landing:") === 0) return "Лендинг: " + action.slice(8);
    return action || "—";
  }

  function renderCrmLinkActivity(activity) {
    if (!activity || !activity.counts) return "нет действий";
    var keys = Object.keys(activity.counts).sort(function (a, b) { return (activity.counts[b] || 0) - (activity.counts[a] || 0); }).slice(0, 5);
    if (!keys.length) return "нет действий";
    return keys.map(function (key) { return esc(trackingActionLabel(key)) + " ×" + esc(intFmt(activity.counts[key] || 0)); }).join("<br>");
  }

  function findCrmTrackingLink(id) {
    id = String(id || "");
    var links = Array.isArray(state.trackingLinks) ? state.trackingLinks : [];
    for (var i = 0; i < links.length; i++) if (String(links[i].id || "") === id) return links[i];
    return null;
  }

  function renderCrmLinkDetailsModal() {
    var modal = document.getElementById("playerCrmLinkDetailsModal");
    var subtitleEl = document.getElementById("playerCrmLinkDetailsSubtitle");
    var bodyEl = document.getElementById("playerCrmLinkDetailsBody");
    if (!modal || !bodyEl) return;
    if (!state.linkDetailsId) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var link = findCrmTrackingLink(state.linkDetailsId) || { id: state.linkDetailsId, params: {} };
    var params = crmLinkParams(link);
    var url = crmLinkUrl(link);
    if (subtitleEl) subtitleEl.textContent = "ref_" + state.linkDetailsId + " · " + crmLinkTargetLabel(link);
    var detailItems = [
      ["Название", crmLinkTitle(link)],
      ["Ref", "ref_" + state.linkDetailsId],
      ["Раздел", crmLinkTargetLabel(link)],
      ["Ссылка", url],
      ["Создана", link.createdAt || "—"],
      ["Источник", params.utm_source || "—"],
      ["Канал", params.utm_medium || "—"],
      ["Кампания", params.utm_campaign || "—"],
      ["Креатив", params.utm_content || "—"],
      ["Аудитория", params.utm_term || "—"],
      ["Оффер", params.lead_offer || "—"],
      ["Ответственный", params.lead_owner || "—"],
      ["Клики", intFmt(crmLinkMetric(link, "totalClicks"))],
      ["Уникальные", intFmt(crmLinkMetric(link, "uniqueClicks"))],
      ["Активные", intFmt(crmLinkMetric(link, "activeVisitors"))],
      ["События", intFmt(crmLinkMetric(link, "actionEvents"))]
    ];
    var visitorsHtml = state.linkDetailsVisitorsLoading
      ? "<div class=\"player-crm__notice player-crm__notice--loading\">Загружаем переходы…</div>"
      : state.linkDetailsVisitorsError
      ? "<div class=\"player-crm__notice player-crm__notice--error\">" + esc(state.linkDetailsVisitorsError) + "</div>"
      : state.linkDetailsVisitors && state.linkDetailsVisitors.length
      ? "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__visits-table\"><thead><tr><th>Время</th><th>Visitor</th><th>Telegram</th><th>Действия</th></tr></thead><tbody>" +
        state.linkDetailsVisitors.map(function (v) {
          var parts = [];
          if (v.firstName) parts.push(v.firstName);
          if (v.username) parts.push("@" + v.username);
          return "<tr><td>" + esc(v.t || "") + "</td><td>" + esc(v.visitorId || "") + "</td><td>" + esc(parts.join(" · ") || "—") + "</td><td>" + renderCrmLinkActivity(v.activity) + "</td></tr>";
        }).join("") + "</tbody></table></div>"
      : "<div class=\"player-crm__notice\">Переходов пока нет.</div>";
    bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" +
      "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__primary-btn\" data-crm-link-copy=\"" + esc(url) + "\">Копировать ссылку</button><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-links-refresh>Обновить список</button></div>" +
      "<div class=\"player-crm__link-detail-grid\">" + detailItems.map(function (item) {
        return "<div class=\"player-crm__link-detail-item\"><small>" + esc(item[0]) + "</small><strong>" + esc(item[1]) + "</strong></div>";
      }).join("") + "</div>" +
      "<h4 class=\"player-crm__edit-title\">Параметры для отслеживания лида</h4>" +
      "<pre class=\"player-crm__link-detail-json\">" + esc(JSON.stringify(params, null, 2)) + "</pre>" +
      "<h4 class=\"player-crm__edit-title\">Переходы и действия</h4>" + visitorsHtml +
      "</div>";
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function openCrmLinkDetails(id) {
    id = String(id || "").trim();
    if (!id) return;
    state.linkDetailsId = id;
    state.linkDetailsVisitors = [];
    state.linkDetailsVisitorsError = "";
    state.linkDetailsVisitorsLoading = true;
    renderCrmLinkDetailsModal();
    var base = getApiBaseSafe();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      state.linkDetailsVisitorsLoading = false;
      state.linkDetailsVisitorsError = "Нет сессии.";
      renderCrmLinkDetailsModal();
      return;
    }
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    fetch(base + "/api/tracking-links" + q + sep + "id=" + encodeURIComponent(id) + "&visitors=1")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        state.linkDetailsVisitorsLoading = false;
        if (!data || !data.ok || !Array.isArray(data.visitors)) {
          state.linkDetailsVisitors = [];
          state.linkDetailsVisitorsError = (data && data.error) || "Переходы не загрузились.";
        } else {
          state.linkDetailsVisitors = data.visitors;
          state.linkDetailsVisitorsError = "";
        }
        renderCrmLinkDetailsModal();
      })
      .catch(function () {
        state.linkDetailsVisitorsLoading = false;
        state.linkDetailsVisitorsError = "Ошибка сети при загрузке переходов.";
        renderCrmLinkDetailsModal();
      });
  }

  function closeCrmLinkDetailsModal() {
    state.linkDetailsId = "";
    state.linkDetailsVisitors = [];
    state.linkDetailsVisitorsLoading = false;
    state.linkDetailsVisitorsError = "";
    renderCrmLinkDetailsModal();
  }
  var renderCampaigns = function () {};

  var playerCrmChartsRuntime = typeof initPlayerCrmChartsRuntime === "function"
    ? initPlayerCrmChartsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt
    })
    : {};
  var renderAnalytics = playerCrmChartsRuntime.renderAnalytics || function () {};
  var showChartTooltip = playerCrmChartsRuntime.showChartTooltip || function () {};
  var hideChartTooltip = playerCrmChartsRuntime.hideChartTooltip || function () {};

  function showChatModalLoading() {
    var html = "<div class=\"player-crm__modal-content player-crm__modal-content--manager-dialogs\">" + renderModalPeriodControls() +
      "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка данных…</div></div>";
    var generalBody = document.getElementById("playerCrmGeneralMessagesModalBody");
    var managerBody = document.getElementById("playerCrmManagerDialogBody");
    if (state.generalMessagesModalOpen && generalBody) generalBody.innerHTML = html;
    if (state.chatDialogManager && managerBody) managerBody.innerHTML = html;
  }

  function reloadCrmDataFromModal() {
    state.showAllGeneralMessagesModal = false;
    syncPeriodInputs();
    showChatModalLoading();
    loadCrmData("data");
  }

  function bars(rows, max) {
    return "<div class=\"player-crm__bar\">" + rows.map(function (row) {
      var w = max ? Math.max(4, Math.round((row.value / max) * 100)) : 0;
      return "<div class=\"player-crm__bar-row\"><span>" + esc(row.label) + "</span><span class=\"player-crm__bar-track\"><span class=\"player-crm__bar-fill\" style=\"width:" + w + "%\"></span></span><strong>" + esc(row.value) + "</strong></div>";
    }).join("") + "</div>";
  }

  function renderAll() {
    syncTabCounts();
    renderStats();
    renderChips();
    renderList();
    renderBlockedList();
    renderDetail();
    renderRegistrations();
    renderPokerPlusAccounts();
    renderSegments();
    renderBroadcastOptions();
    renderCampaigns();
    renderCrmLinkTargetOptions();
    renderCrmTrackingLinks();
    renderAnalytics();
    syncPeriodInputs();
    syncTabs();
    renderManagerDialogModal();
    renderRegistrationModal();
    renderPokerPlusModal();
    renderVisitsModal();
    renderGeneralMessagesModal();
    renderBotModal();
    renderPushModal();
    renderDailyPokerModal();
    renderCrmLinkDetailsModal();
  }

  function renderActiveTab() {
    syncTabCounts();
    syncTabs();
    if (state.tab === "players") {
      renderChips();
      renderList();
      renderDetail();
      return;
    }
    if (state.tab === "blocked") {
      renderBlockedList();
      renderChips();
      return;
    }
    if (state.tab === "broadcast") {
      renderBroadcastOptions();
      renderCampaigns();
      renderBroadcastLinkTargetOptions();
      return;
    }
    if (state.tab === "registrations") {
      renderRegistrations();
      return;
    }
    if (state.tab === "pokerplus") {
      renderPokerPlusAccounts();
      return;
    }
    if (state.tab === "segments") {
      renderSegments();
      return;
    }
    if (state.tab === "links") {
      renderCrmLinkTargetOptions();
      renderCrmTrackingLinks();
      return;
    }
    if (state.tab === "calculations") {
      openCrmCalculations();
      return;
    }
    if (state.tab === "stats") {
      renderStats();
      renderAnalytics();
      renderCrmWeekReport();
      syncPeriodInputs();
    }
  }

  function syncTabCounts() {
  }

  function syncTabs() {
    var tabs = document.querySelectorAll(".player-crm__tab[data-crm-tab]");
    var panels = document.querySelectorAll(".player-crm__tab-panel[data-crm-panel]");
    var statsStates = ["stats", "players", "blocked"];
    var playerStates = ["players", "blocked"];
    tabs.forEach(function (tab) {
      var target = tab.getAttribute("data-crm-tab");
      var level = tab.getAttribute("data-crm-nav-level") || "main";
      var active = target === state.tab;
      if (level === "main" && target === "stats") active = statsStates.indexOf(state.tab) !== -1;
      if (level === "stats" && target === "players") active = playerStates.indexOf(state.tab) !== -1;
      tab.classList.toggle("player-crm__tab--active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    var statsSubtabs = document.querySelector("[data-crm-stats-subtabs]");
    if (statsSubtabs) statsSubtabs.hidden = statsStates.indexOf(state.tab) === -1;
    panels.forEach(function (panel) {
      panel.classList.toggle("player-crm__tab-panel--active", panel.getAttribute("data-crm-panel") === state.tab);
    });
    var sharedPeriodToolbar = document.querySelector("[data-crm-shared-period-toolbar]");
    var statsPanel = document.querySelector(".player-crm__tab-panel[data-crm-panel='stats']");
    var calculationsPanel = document.querySelector(".player-crm__tab-panel[data-crm-panel='calculations']");
    if (sharedPeriodToolbar && statsPanel && calculationsPanel) {
      if (state.tab === "calculations") {
        if (sharedPeriodToolbar.parentElement !== calculationsPanel) {
          calculationsPanel.insertBefore(sharedPeriodToolbar, calculationsPanel.firstChild);
        }
      } else if (sharedPeriodToolbar.parentElement !== statsPanel) {
        statsPanel.insertBefore(sharedPeriodToolbar, statsPanel.firstChild);
      }
    }
  }

  function openCrmCalculations() {
    var host = document.getElementById("playerCrmCalculationsHost");
    if (!host) return;
    if (host.querySelector("[data-admin-report-panel='calculations']")) {
      if (typeof window.pokerMountAdminReportCalculations === "function") window.pokerMountAdminReportCalculations(host);
      return;
    }
    host.innerHTML = "<div class=\"player-crm__notice player-crm__notice--loading\">Загружаю расчёты…</div>";
    var ensureHtml = typeof window.pokerEnsureAdminReportModalHtml === "function"
      ? window.pokerEnsureAdminReportModalHtml()
      : Promise.resolve(true);
    Promise.resolve(ensureHtml)
      .then(function () {
        if (typeof window.pokerEnsureLazyDomains === "function") {
          return window.pokerEnsureLazyDomains(["admin-reports"], { styles: true, scripts: true });
        }
        return true;
      })
      .then(function () {
        if (typeof window.pokerInitAdminReportModal === "function") window.pokerInitAdminReportModal();
        if (typeof window.pokerMountAdminReportCalculations === "function" && window.pokerMountAdminReportCalculations(host)) {
          return;
        }
        host.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">Расчёты недоступны для этого аккаунта.</div>";
      })
      .catch(function () {
        host.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">Не удалось загрузить расчёты. Попробуйте открыть вкладку ещё раз.</div>";
      });
  }

  function adoptPendingShellTab() {
    var pending = String(window.__pokerPlayerCrmPendingTab || "").trim();
    if (!pending) return;
    var panels = document.querySelectorAll(".player-crm__tab-panel[data-crm-panel]");
    panels.forEach(function (panel) {
      if (panel.getAttribute("data-crm-panel") === pending) state.tab = pending;
    });
  }

  function getApiBaseSafe() {
    try {
      return typeof getApiBase === "function" ? getApiBase() : "";
    } catch (e) {
      return "";
    }
  }

  function authQuerySafe() {
    var query = "?initData=";
    try {
      query = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : query;
    } catch (e) {}
    var menuAccessToken = typeof window.pokerAdminMenuAccessToken === "function"
      ? window.pokerAdminMenuAccessToken("crm")
      : "";
    if (menuAccessToken) {
      query += (query.indexOf("?") >= 0 ? "&" : "?") + "menuAccessToken=" + encodeURIComponent(menuAccessToken);
    }
    return query;
  }

  function loadDailyPokerStats(force) {
    var base = getApiBaseSafe();
    if (!base) return;
    var statsRange = selectedPeriodRange();
    var rangeKey = statsRange && statsRange.from && statsRange.to
      ? statsRange.from + ":" + statsRange.to
      : "all";
    if (!force && state.dailyPokerStats && state.dailyPokerStatsRangeKey === rangeKey) return;
    if (state.dailyPokerStatsLoading) {
      state.dailyPokerStatsPending = true;
      return;
    }
    state.dailyPokerStatsLoading = true;
    state.dailyPokerStatsError = "";
    state.dailyPokerStatsPending = false;
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    var previousRange = comparisonRange();
    var requestFrom = statsRange && statsRange.from ? statsRange.from : "";
    var requestTo = statsRange && statsRange.to ? statsRange.to : "";
    if (previousRange && previousRange.from && (!requestFrom || previousRange.from < requestFrom)) requestFrom = previousRange.from;
    if (previousRange && previousRange.to && (!requestTo || previousRange.to > requestTo)) requestTo = previousRange.to;
    var rangeQuery = requestFrom && requestTo
      ? "&from=" + encodeURIComponent(requestFrom) + "&to=" + encodeURIComponent(requestTo)
      : "";
    if (statsRange && statsRange.from && statsRange.to) {
      rangeQuery += "&balanceFrom=" + encodeURIComponent(statsRange.from) + "&balanceTo=" + encodeURIComponent(statsRange.to);
    }
    fetch(base + "/api/promo/daily-poker/winners" + q + sep + "limit=1&summary=1" + rangeQuery, { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!data || data.ok === false) throw new Error("daily-poker-stats");
        var stats = data.spinStats && typeof data.spinStats === "object" ? data.spinStats : data;
        state.dailyPokerStats = {
          uniquePlayers: Math.max(0, Number(stats.totalUniquePlayers != null ? stats.totalUniquePlayers : data.totalUniquePlayers) || 0),
          totalSpins: Math.max(0, Number(stats.totalSpins != null ? stats.totalSpins : data.totalSpins) || 0),
          rangeTotalSpinsStart: Math.max(0, Number(data.rangeTotalSpinsStart) || 0),
          rangeTotalSpinsEnd: Math.max(0, Number(data.rangeTotalSpinsEnd != null ? data.rangeTotalSpinsEnd : (stats.totalSpins != null ? stats.totalSpins : data.totalSpins)) || 0),
          bonusBalanceStart: Math.max(0, Number(data.bonusBalanceStart) || 0),
          bonusBalanceEnd: Math.max(0, Number(data.bonusBalanceEnd) || 0),
          bonusBalanceCredited: Math.max(0, Number(data.bonusBalanceCredited) || 0),
          bonusBalanceDebited: Math.max(0, Number(data.bonusBalanceDebited) || 0),
          bonusBalanceReturned: Math.max(0, Number(data.bonusBalanceReturned) || 0),
          bonusAmount: Math.max(0, Number(data.totalBonusAmount) || 0),
          ticketAmount: Math.max(0, (Number(data.totalPrizeRubles) || 0) - (Number(data.totalBonusAmount) || 0)),
          debitedAmount: Math.max(0, Number(data.totalDebitedAmount) || 0),
          dailyDebits: Array.isArray(data.dailyDebitStats) ? data.dailyDebitStats : (Array.isArray(data.dailyDebits) ? data.dailyDebits : []),
          dailyReturns: Array.isArray(data.dailyReturnStats) ? data.dailyReturnStats : [],
          debitedUsers: Array.isArray(data.debitedUsers) ? data.debitedUsers : [],
          daily: Array.isArray(data.dailyStats) ? data.dailyStats : [],
        };
        state.dailyPokerStatsRangeKey = rangeKey;
      })
      .catch(function () {
        var currentRange = selectedPeriodRange();
        var currentRangeKey = currentRange && currentRange.from && currentRange.to
          ? currentRange.from + ":" + currentRange.to
          : "all";
        if (rangeKey !== currentRangeKey) return;
        state.dailyPokerStats = null;
        state.dailyPokerStatsRangeKey = "";
        state.dailyPokerStatsError = "Не удалось загрузить статистику «Крутки дня».";
      })
      .then(function () {
        state.dailyPokerStatsLoading = false;
        if (state.loaded) renderStats();
        var currentRange = selectedPeriodRange();
        var currentRangeKey = currentRange && currentRange.from && currentRange.to
          ? currentRange.from + ":" + currentRange.to
          : "all";
        if (state.dailyPokerStatsPending || rangeKey !== currentRangeKey) {
          state.dailyPokerStatsPending = false;
          loadDailyPokerStats(true);
        }
      });
  }

  function renderDailyPokerModal() {
    var modal = document.getElementById("playerCrmDailyPokerModal");
    var subtitleEl = document.getElementById("playerCrmDailyPokerModalSubtitle");
    var bodyEl = document.getElementById("playerCrmDailyPokerModalBody");
    if (!modal || !bodyEl) return;
    if (!state.dailyPokerModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
    if (subtitleEl) subtitleEl.textContent = periodLabel();
    if (state.dailyPokerWinnersLoading) {
      bodyEl.innerHTML = "<div class=\"player-crm__timeline-item\">Загружаю победителей…</div>";
      return;
    }
    var data = state.dailyPokerWinners;
    var winners = data && Array.isArray(data.winners) ? data.winners : [];
    var debitedUsers = data && Array.isArray(data.debitedUsers) ? data.debitedUsers.slice() : [];
    var returnedUsers = data && Array.isArray(data.returnedUsers) ? data.returnedUsers.slice() : [];
    var dailyPokerTab = state.dailyPokerModalTab === "returns" ? "returns" : "issued";
    if (!data) {
      bodyEl.innerHTML = "<div class=\"player-crm__timeline-item\">Не удалось загрузить победителей.</div>";
      return;
    }
    var winnersPrizeTotal = Math.max(0, Number(data && data.totalPrizeRubles) || winners.reduce(function (sum, winner) {
      return sum + Math.max(0, Number(winner && winner.totalPrizeAmount) || 0);
    }, 0));
    if (subtitleEl) subtitleEl.textContent = periodLabel() + (dailyPokerTab === "returns"
      ? " · возвращено " + money(data.bonusBalanceReturned || 0) + " · " + intFmt(returnedUsers.length) + " возвратов"
      : " · списано " + money(data.totalDebitedAmount || 0) + " · выиграно " + money(winnersPrizeTotal) + " · " + intFmt(winners.length) + " победителей");
    var dailyPokerTabsHtml = "<div class=\"player-crm__raffle-tabs\" role=\"tablist\" aria-label=\"Операции крутки дня\">" +
      "<button type=\"button\" role=\"tab\" data-crm-daily-poker-tab=\"issued\" aria-selected=\"" + (dailyPokerTab === "issued" ? "true" : "false") + "\" class=\"" + (dailyPokerTab === "issued" ? "is-active" : "") + "\">Выдачи <b>" + esc(intFmt(debitedUsers.length)) + "</b></button>" +
      "<button type=\"button\" role=\"tab\" data-crm-daily-poker-tab=\"returns\" aria-selected=\"" + (dailyPokerTab === "returns" ? "true" : "false") + "\" class=\"" + (dailyPokerTab === "returns" ? "is-active" : "") + "\">Возвраты <b>" + esc(intFmt(returnedUsers.length)) + "</b></button></div>";
    if (dailyPokerTab === "returns") {
      var dailyReturnsHtml = returnedUsers.length ? "<div class=\"player-crm__daily-winners-list\">" + returnedUsers.map(function (user, index) {
        var telegram = user.telegramUsername ? "@" + String(user.telegramUsername).replace(/^@+/, "") : "—";
        var pokerName = user.pokerPlusNickname || user.pokerPlusName || "—";
        var returnedDate = user.returnedAt ? dateTime(user.returnedAt) : String(user.date || "—").split("-").reverse().join(".");
        return "<article class=\"player-crm__daily-winner player-crm__raffle-recipient player-crm__daily-return\">" +
          "<b class=\"player-crm__raffle-recipient-number\">" + esc(index + 1) + "</b>" +
          "<strong class=\"player-crm__raffle-recipient-name\">" + esc(user.displayName || pokerName) + "</strong>" +
          "<span>Telegram <b>" + esc(telegram) + "</b></span>" +
          "<span>Poker21 <b>" + esc(pokerName) + (user.pokerPlusUserId ? " · " + esc(user.pokerPlusUserId) : "") + "</b></span>" +
          "<span>Выдача <b>" + esc(user.tournamentTitle || money(user.debitAmount || 0)) + "</b></span>" +
          "<span>Дата возврата <b>" + esc(returnedDate) + "</b></span>" +
          "<b class=\"player-crm__raffle-recipient-total\">+" + esc(money(user.amount || 0)) + "</b></article>";
      }).join("") + "</div>" : "<div class=\"player-crm__timeline-item\">За выбранный период возвратов нет.</div>";
      bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + dailyPokerTabsHtml + dailyReturnsHtml + "</div>";
      return;
    }
    if (!winners.length && !debitedUsers.length) {
      bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + dailyPokerTabsHtml + "<div class=\"player-crm__timeline-item\">За выбранный период выдач нет.</div></div>";
      return;
    }
    var debitSort = state.dailyPokerDebitsSort === "amount" ? "amount" : "date";
    function latestDebitDate(user) {
      return (Array.isArray(user && user.issues) ? user.issues : []).reduce(function (latest, issue) {
        var date = String(issue && issue.date || "");
        return date > latest ? date : latest;
      }, "");
    }
    debitedUsers.sort(function (a, b) {
      if (debitSort === "amount") return Number(b && b.amount || 0) - Number(a && a.amount || 0) || latestDebitDate(b).localeCompare(latestDebitDate(a));
      return latestDebitDate(b).localeCompare(latestDebitDate(a)) || Number(b && b.amount || 0) - Number(a && a.amount || 0);
    });
    var debitSortHtml = "<div class=\"player-crm__raffle-sort player-crm__daily-debits-sort\" role=\"group\" aria-label=\"Сортировка списаний\">" +
      "<span>Сортировать</span>" +
      "<button type=\"button\" data-crm-daily-debits-sort=\"date\" class=\"" + (debitSort === "date" ? "is-active" : "") + "\">По дате</button>" +
      "<button type=\"button\" data-crm-daily-debits-sort=\"amount\" class=\"" + (debitSort === "amount" ? "is-active" : "") + "\">По сумме</button></div>";
    var debitsHtml = debitedUsers.length ? "<section class=\"player-crm__daily-debits\">" + debitSortHtml + "<div class=\"player-crm__daily-winners-list\">" + debitedUsers.map(function (user, index) {
      var telegram = user.telegramUsername ? "@" + String(user.telegramUsername).replace(/^@+/, "") : "—";
      var pokerName = user.pokerPlusNickname || user.pokerPlusName || "—";
      var issues = Array.isArray(user.issues) ? user.issues : [];
      var adminNames = [];
      var issueDates = [];
      issues.forEach(function (issue) {
        var adminId = String(issue && issue.adminId || "").replace(/^tg_/, "");
        var adminName = adminId === "2144406710" ? "Аня" : adminId === "1897001087" ? "Вика" : adminId === "388008256" ? "Роман" : (adminId || "—");
        var issueDate = String(issue && issue.date || "");
        var dateParts = issueDate.split("-");
        var dateLabel = dateParts.length === 3 ? dateParts[2] + "." + dateParts[1] + "." + dateParts[0] : (issueDate || "—");
        if (adminNames.indexOf(adminName) === -1) adminNames.push(adminName);
        if (issueDates.indexOf(dateLabel) === -1) issueDates.push(dateLabel);
      });
      return "<article class=\"player-crm__daily-winner player-crm__raffle-recipient player-crm__daily-debit\">" +
        "<b class=\"player-crm__raffle-recipient-number\">" + esc(index + 1) + "</b>" +
        "<strong class=\"player-crm__raffle-recipient-name\">" + esc(user.displayName || pokerName) + "</strong>" +
        "<span>Telegram <b>" + esc(telegram) + "</b></span>" +
        "<span>Poker21 <b>" + esc(pokerName) + (user.pokerPlusUserId ? " · " + esc(user.pokerPlusUserId) : "") + "</b></span>" +
        "<span>Выдал <b>" + esc(adminNames.join(", ") || "—") + "</b></span>" +
        "<span>Дата выдачи <b>" + esc(issueDates.join(", ") || "—") + "</b></span>" +
        "<b class=\"player-crm__raffle-recipient-total\">" + esc(money(user.amount || 0)) + "</b></article>";
    }).join("") + "</div></section>" : "";
    var winnersHtml = winners.length ? "<details class=\"player-crm__daily-winners-spoiler\"><summary>Победители <b>" + esc(intFmt(winners.length)) + " · выиграно " + esc(money(winnersPrizeTotal)) + "</b></summary><div class=\"player-crm__daily-winners-list\">" + winners.map(function (winner) {
      var telegram = winner.telegramUsername ? "@" + String(winner.telegramUsername).replace(/^@+/, "") : "—";
      var pokerName = winner.pokerPlusNickname || winner.pokerPlusName || "—";
      return "<article class=\"player-crm__daily-winner\">" +
        "<div class=\"player-crm__daily-winner-head\"><strong>" + esc(winner.displayName || winner.telegramDisplayName || pokerName) + "</strong><span>" + esc(dateTime(winner.lastWonAt)) + "</span></div>" +
        "<div class=\"player-crm__daily-winner-grid\">" +
          "<span>Telegram <b>" + esc(telegram) + "</b></span>" +
          "<span>Poker21 <b>" + esc(pokerName) + (winner.pokerPlusUserId ? " · " + esc(winner.pokerPlusUserId) : "") + "</b></span>" +
          "<span>Комбинация <b>" + esc(winner.handName || "—") + "</b></span>" +
          "<span>Лучший приз <b>" + esc(winner.bestPrize || winner.prize || "—") + "</b></span>" +
          "<span>Побед <b>" + esc(intFmt(winner.winsCount || 0)) + "</b></span>" +
          "<span>Билеты <b>" + esc(money(winner.ticketTotal || 0)) + "</b></span>" +
          "<span>Бонусы <b>" + esc(money(winner.bonusTotal || 0)) + "</b></span>" +
          "<span>Всего <b>" + esc(money(winner.totalPrizeAmount || 0)) + "</b></span>" +
        "</div></article>";
    }).join("") + "</div></details>" : "";
    bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + dailyPokerTabsHtml + debitsHtml + winnersHtml + "</div>";
  }

  function loadDailyPokerWinners() {
    var base = getApiBaseSafe();
    if (!base) return;
    state.dailyPokerWinnersLoading = true;
    state.dailyPokerWinners = null;
    renderDailyPokerModal();
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    var range = selectedPeriodRange();
    var requestKey = range && range.from && range.to ? range.from + ":" + range.to : "all";
    state.dailyPokerWinnersRequestKey = requestKey;
    var rangeQuery = range && range.from && range.to ? "&from=" + encodeURIComponent(range.from) + "&to=" + encodeURIComponent(range.to) : "";
    fetch(base + "/api/promo/daily-poker/winners" + q + sep + "limit=300" + rangeQuery, { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var currentRange = selectedPeriodRange();
        var currentKey = currentRange && currentRange.from && currentRange.to ? currentRange.from + ":" + currentRange.to : "all";
        if (state.dailyPokerWinnersRequestKey === requestKey && currentKey === requestKey && data && data.ok !== false) state.dailyPokerWinners = data;
      })
      .catch(function () {})
      .then(function () {
        if (state.dailyPokerWinnersRequestKey !== requestKey) return;
        state.dailyPokerWinnersLoading = false;
        renderDailyPokerModal();
      });
  }

  function closeDailyPokerModal() {
    state.dailyPokerModalOpen = false;
    renderDailyPokerModal();
  }

  function renderRafflesModal() {
    var modal = document.getElementById("playerCrmRafflesModal");
    var titleEl = document.getElementById("playerCrmRafflesModalTitle");
    var subtitleEl = document.getElementById("playerCrmRafflesModalSubtitle");
    var bodyEl = document.getElementById("playerCrmRafflesModalBody");
    if (!modal || !bodyEl) return;
    modal.hidden = !state.rafflesModalOpen;
    if (!state.rafflesModalOpen) {
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
    var raffleStats = state.statsSummary && state.statsSummary.raffles;
    var recipients = raffleStats && Array.isArray(raffleStats.issuedRecipients) ? raffleStats.issuedRecipients.slice() : [];
    var returns = raffleStats && Array.isArray(raffleStats.returnedRecipients) ? raffleStats.returnedRecipients.slice() : [];
    var raffleTab = state.rafflesModalTab === "returns" ? "returns" : "issued";
    if (titleEl) titleEl.textContent = raffleTab === "returns" ? "Возвраты с Розыгрышей" : "Кому сколько выдано в Розыгрышах";
    var raffleSort = state.raffleRecipientsSort === "cash" || state.raffleRecipientsSort === "total"
      ? state.raffleRecipientsSort
      : "tickets";
    recipients.sort(function (a, b) {
      var amountKey = raffleSort === "cash" ? "cashAmount" : (raffleSort === "total" ? "totalAmount" : "ticketAmount");
      var amountDiff = Number(b && b[amountKey] || 0) - Number(a && a[amountKey] || 0);
      if (amountDiff) return amountDiff;
      return Number(b && b.totalAmount || 0) - Number(a && a.totalAmount || 0);
    });
    if (subtitleEl) subtitleEl.textContent = periodLabel() + (raffleTab === "returns"
      ? " · возвращено " + money(raffleStats && raffleStats.returnedAmount || 0)
      : " · выдано " + money(raffleStats && raffleStats.issuedPrizeAmount || 0));
    if (state.raffleRecipientsLoading) {
      bodyEl.innerHTML = "<div class=\"player-crm__timeline-item\">Загружаю список…</div>";
      return;
    }
    var tabsHtml = "<div class=\"player-crm__raffle-tabs\" role=\"tablist\" aria-label=\"Данные розыгрышей\">" +
      "<button type=\"button\" role=\"tab\" data-crm-raffles-tab=\"issued\" aria-selected=\"" + (raffleTab === "issued" ? "true" : "false") + "\" class=\"" + (raffleTab === "issued" ? "is-active" : "") + "\">Выдачи <b>" + esc(intFmt(recipients.length)) + "</b></button>" +
      "<button type=\"button\" role=\"tab\" data-crm-raffles-tab=\"returns\" aria-selected=\"" + (raffleTab === "returns" ? "true" : "false") + "\" class=\"" + (raffleTab === "returns" ? "is-active" : "") + "\">Возвраты <b>" + esc(intFmt(raffleStats && raffleStats.returnCount || 0)) + "</b></button></div>";
    if (raffleTab === "returns") {
      function raffleReturnsGroupHtml(title, groupReturns) {
        var groupTotal = groupReturns.reduce(function (sum, user) { return sum + Number(user && user.amount || 0); }, 0);
        var rowsHtml = groupReturns.map(function (user) {
          var telegram = user.telegramUsername ? "@" + String(user.telegramUsername).replace(/^@+/, "") : "—";
          var pokerName = user.pokerPlusNickname || "—";
          return "<article class=\"player-crm__daily-winner player-crm__raffle-recipient player-crm__raffle-return\">" +
            "<b class=\"player-crm__raffle-recipient-total\">+" + esc(money(user.amount || 0)) + "</b>" +
            "<strong class=\"player-crm__raffle-recipient-name\">" + esc(user.name || pokerName) + "</strong>" +
            "<span>Telegram <b>" + esc(telegram) + "</b></span>" +
            "<span>Poker21 <b>" + esc(pokerName) + (user.pokerPlusUserId ? " · " + esc(user.pokerPlusUserId) : "") + "</b></span>" +
            "<span>Розыгрыш <b>" + esc(user.raffleTitle || user.raffleId || "—") + "</b></span>" +
            "<span class=\"player-crm__raffle-return-kind\">" + esc(title) + " <b>" + esc(user.reason || "Возврат") + "</b></span>" +
            "<span>Дата <b>" + esc(dateTime(user.returnedAt) || "—") + "</b></span></article>";
        }).join("");
        return "<section class=\"player-crm__raffle-return-group\"><div class=\"player-crm__raffle-return-group-head\"><strong>" + esc(title) + "</strong><span>" + esc(intFmt(groupReturns.length)) + " · +" + esc(money(groupTotal)) + "</span></div>" +
          (rowsHtml ? "<div class=\"player-crm__daily-winners-list\">" + rowsHtml + "</div>" : "<div class=\"player-crm__raffle-return-group-empty\">Возвратов нет</div>") + "</section>";
      }
      var cashReturns = returns.filter(function (user) { return user && user.kind === "cash"; });
      var mttReturns = returns.filter(function (user) { return !user || user.kind !== "cash"; });
      var returnsHtml = returns.length ? "<div class=\"player-crm__raffle-return-groups\">" + raffleReturnsGroupHtml("Кеш", cashReturns) + raffleReturnsGroupHtml("МТТ", mttReturns) + "</div>" : "<div class=\"player-crm__timeline-item\">За выбранный период возвратов нет.</div>";
      bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + tabsHtml + returnsHtml + "</div>";
      return;
    }
    if (!recipients.length) {
      bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + tabsHtml + "<div class=\"player-crm__timeline-item\">За выбранный период выданных призов нет.</div></div>";
      return;
    }
    var sortHtml = "<div class=\"player-crm__raffle-sort\" role=\"group\" aria-label=\"Сортировка игроков\">" +
      "<span>Сортировать</span>" +
      "<button type=\"button\" data-crm-raffles-sort=\"tickets\" class=\"" + (raffleSort === "tickets" ? "is-active" : "") + "\">По билетам</button>" +
      "<button type=\"button\" data-crm-raffles-sort=\"cash\" class=\"" + (raffleSort === "cash" ? "is-active" : "") + "\">По кешу</button>" +
      "<button type=\"button\" data-crm-raffles-sort=\"total\" class=\"" + (raffleSort === "total" ? "is-active" : "") + "\">По общей сумме</button></div>";
    bodyEl.innerHTML = "<div class=\"player-crm__modal-content\">" + tabsHtml + sortHtml + "<div class=\"player-crm__daily-winners-list\">" + recipients.map(function (user, index) {
      var telegram = user.telegramUsername ? "@" + String(user.telegramUsername).replace(/^@+/, "") : "—";
      var pokerName = user.pokerPlusNickname || "—";
      return "<article class=\"player-crm__daily-winner player-crm__raffle-recipient\">" +
        "<b class=\"player-crm__raffle-recipient-number\">" + esc(index + 1) + "</b>" +
        "<strong class=\"player-crm__raffle-recipient-name\">" + esc(user.name || pokerName) + "</strong>" +
        "<span>Telegram <b>" + esc(telegram) + "</b></span>" +
        "<span>Poker21 <b>" + esc(pokerName) + (user.pokerPlusUserId ? " · " + esc(user.pokerPlusUserId) : "") + "</b></span>" +
        "<span class=\"player-crm__raffle-recipient-cash\">Кеш <b>" + esc(money(user.cashAmount || 0)) + "</b></span>" +
        "<span class=\"player-crm__raffle-recipient-tickets\">Билеты <b>" + esc(money(user.ticketAmount || 0)) + "</b></span>" +
        "<b class=\"player-crm__raffle-recipient-total\">" + esc(money(user.totalAmount || 0)) + "</b></article>";
    }).join("") + "</div></div>";
  }

  function loadRaffleRecipients() {
    var raffleStats = state.statsSummary && state.statsSummary.raffles;
    if (!raffleStats || raffleStats.recipientsPending !== true || state.raffleRecipientsLoading) return;
    var base = getApiBaseSafe();
    if (!base) return;
    state.raffleRecipientsLoading = true;
    var range = selectedPeriodRange();
    var requestKey = range && range.from && range.to ? range.from + ":" + range.to : "all";
    state.raffleRecipientsRequestKey = requestKey;
    renderRafflesModal();
    fetch(base + "/api/player-crm" + crmQuery({ mode: "raffles" }), { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var currentRange = selectedPeriodRange();
        var currentKey = currentRange && currentRange.from && currentRange.to ? currentRange.from + ":" + currentRange.to : "all";
        if (state.raffleRecipientsRequestKey !== requestKey || currentKey !== requestKey || !data || data.ok === false || !data.raffles) return;
        state.statsSummary.raffles = data.raffles;
      })
      .catch(function () {})
      .then(function () {
        if (state.raffleRecipientsRequestKey !== requestKey) return;
        state.raffleRecipientsLoading = false;
        renderRafflesModal();
      });
  }

  function closeRafflesModal() {
    state.rafflesModalOpen = false;
    renderRafflesModal();
  }

  function postBodySafe(extra) {
    try {
      extra = extra && typeof extra === "object" ? extra : {};
      if (typeof window.pokerAdminMenuAccessToken === "function") {
        extra.menuAccessToken = window.pokerAdminMenuAccessToken("crm");
      }
      return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra) : extra;
    } catch (e) {
      return extra;
    }
  }

  function showCrmLoading(scope) {
    state.loadingScope = scope || "all";
    state.crmError = "";
    renderStats();
    renderAnalytics();
  }

  function preserveRaffleStatsForSelectedPeriod() {
    if (!state.statsSummary || typeof state.statsSummary !== "object") return;
    var range = selectedPeriodRange();
    var key = range && range.from && range.to ? range.from + ":" + range.to : "all";
    var incoming = state.statsSummary.raffles;
    if (incoming && incoming.available !== false) {
      state.raffleStatsByPeriod[key] = incoming;
      return;
    }
    var cached = state.raffleStatsByPeriod[key];
    if (cached && cached.available !== false) state.statsSummary.raffles = cached;
  }

  function applyCrmData(data, heavyOnly) {
    if (!data || !data.ok || !Array.isArray(data.players) || data.source === "redis-error" || data.source === "no-redis") return false;
    if (!heavyOnly) {
      state.players = data.players;
      state.playersPending = data.playersPending === true;
      state.playersScope = data.playersScope || (data.playersPending === true ? "summary" : "players");
      state.blockedUsers = Array.isArray(data.blockedUsers) ? data.blockedUsers : [];
      state.registeredAccounts = Array.isArray(data.registeredAccounts) ? data.registeredAccounts : [];
      state.pokerPlusAccounts = Array.isArray(data.pokerPlusAccounts) ? data.pokerPlusAccounts : [];
      state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
      state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : [];
      state.statsSummary = data.statsSummary && typeof data.statsSummary === "object" ? data.statsSummary : null;
      preserveRaffleStatsForSelectedPeriod();
      state.crmWarnings = Array.isArray(data.crmWarnings) ? data.crmWarnings.slice() : [];
      state.permissions = data.permissions || null;
      state.pushConfigured = data.pushConfigured === true;
      state.source = data.source || "api";
      state.crmError = "";
    } else {
      state.players = data.players;
      state.playersPending = false;
      state.blockedUsers = Array.isArray(data.blockedUsers) ? data.blockedUsers : state.blockedUsers;
      state.registeredAccounts = Array.isArray(data.registeredAccounts) ? data.registeredAccounts : state.registeredAccounts;
      state.pokerPlusAccounts = Array.isArray(data.pokerPlusAccounts) ? data.pokerPlusAccounts : state.pokerPlusAccounts;
      state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : state.campaigns;
      state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : state.sourceAnalytics;
      state.statsSummary = data.statsSummary && typeof data.statsSummary === "object" ? data.statsSummary : state.statsSummary;
      preserveRaffleStatsForSelectedPeriod();
      state.crmWarnings = Array.isArray(data.crmWarnings) ? data.crmWarnings.slice() : state.crmWarnings;
      state.permissions = data.permissions || state.permissions;
      state.pushConfigured = data.pushConfigured === true || state.pushConfigured === true;
      state.source = data.source || state.source;
      state.crmError = "";
    }
    state.chartAnalytics = data.chartAnalytics || null;
    state.chatStats = data.chatStats || null;
    if (data.range && data.range.key === "custom" && !(state.period === "today" && isLocalTodayRange(data.range)) && !(state.period === "yesterday" && isLocalYesterdayRange(data.range)) && !isFixedPeriodRange(state.period, data.range)) {
      state.period = "custom";
      state.dateFrom = data.range.from || state.dateFrom;
      state.dateTo = data.range.to || state.dateTo;
    }
    if (data.chartRange && data.chartRange.key === "custom" && !(state.chartPeriod === "today" && isLocalTodayRange(data.chartRange)) && !(state.chartPeriod === "yesterday" && isLocalYesterdayRange(data.chartRange)) && !isFixedPeriodRange(state.chartPeriod, data.chartRange)) {
      state.chartPeriod = "custom";
      state.chartDateFrom = data.chartRange.from || state.chartDateFrom;
      state.chartDateTo = data.chartRange.to || state.chartDateTo;
    } else if (data.chartRange && data.chartRange.key) {
      state.chartPeriod = String(data.chartRange.key);
    }
    return true;
  }

  function loadCrmHeavyData(scope, options) {
    options = options || {};
    if (state.heavyLoading) return Promise.resolve(false);
    state.heavyLoading = true;
    state.heavyLoadingScope = scope || "heavy";
    if (scope === "players") state.heavyError = "";
    if (scope === "broadcast") updateBroadcastChannelCounts();
    renderStats();
    renderAnalytics();
    var base = getApiBaseSafe();
    if (!base) {
      state.heavyLoading = false;
      state.heavyLoadingScope = "";
      return Promise.resolve(false);
    }
    var heavyMode = scope === "chart"
      ? "chart"
      : scope === "broadcast"
        ? "send"
        : "players";
    var heavyUrl = base + "/api/player-crm" + crmQuery({
      mode: heavyMode,
      segment: heavyMode === "players" ? (options.segment || state.filter) : ""
    });
    if (heavyMode === "players") {
      heavyUrl += "&page=" + encodeURIComponent(options.page || 1) + "&limit=100";
    }
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeoutId = controller ? setTimeout(function () {
      try { controller.abort(); } catch (eAbort) {}
    }, 30000) : null;
    renderList();
    return fetch(heavyUrl, controller ? { signal: controller.signal } : undefined)
      .then(function (r) {
        return r.json().then(function (data) {
          data = data || {};
          data.__httpOk = r.ok;
          data.__status = r.status;
          return data;
        });
      })
      .then(function (data) {
        if (!data || !data.__httpOk || data.ok === false) {
          throw new Error(data && data.error || "Сервер не вернул список игроков.");
        }
        if (scope === "chart") {
          if (data && data.ok && data.chartAnalytics) {
            state.chartAnalytics = data.chartAnalytics;
            if (data.chartRange && data.chartRange.key) {
              if (data.chartRange.key === "custom") {
                state.chartDateFrom = data.chartRange.from || state.chartDateFrom;
                state.chartDateTo = data.chartRange.to || state.chartDateTo;
              } else {
                state.chartPeriod = String(data.chartRange.key);
              }
            }
          }
        } else if (scope === "broadcast" && data && data.ok && Array.isArray(data.players)) {
          state.broadcastPlayers = data.players;
          state.broadcastAudienceLoadedAt = Date.now();
          state.broadcastAudiencePeriodKey = broadcastAudiencePeriodKey();
        } else if (data && data.ok && Array.isArray(data.players)) {
          var previousPlayers = options.append ? state.players.slice() : [];
          applyCrmData(data, true);
          if (options.append) {
            var known = {};
            previousPlayers.concat(state.players).forEach(function (player) {
              if (player && player.id) known[player.id] = player;
            });
            state.players = Object.keys(known).map(function (id) { return known[id]; });
          }
          state.playersPage = Number(data.playersPage || options.page || 1);
          state.playersTotal = Number(data.playersTotal || state.players.length);
          state.playersHasMore = data.playersHasMore === true;
          state.playersScope = "players";
        }
      })
      .catch(function (error) {
        if (scope === "players") {
          state.heavyError = error && error.name === "AbortError"
            ? "Игроки загружаются слишком долго. Попробуйте ещё раз."
            : (error && error.message || "Не удалось загрузить игроков. Проверьте соединение и повторите попытку.");
        }
      })
      .then(function () {
        if (timeoutId) clearTimeout(timeoutId);
        state.heavyLoading = false;
        state.heavyLoadingScope = "";
        renderActiveTab();
        return true;
      });
  }

  function loadCrmBlockedData() {
    var base = getApiBaseSafe();
    if (!base) return;
    fetch(base + "/api/player-crm" + crmQuery({ mode: "blocked" }), { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!data || data.ok === false) return;
        state.blockedUsers = Array.isArray(data.blockedUsers) ? data.blockedUsers : [];
        renderBlockedList();
        renderChips();
      })
      .catch(function () {});
  }

  function comparisonRange() {
    var current = selectedPeriodRange();
    if (!current || (state.period !== "current_week" && state.period !== "current_month")) return null;
    var from = new Date(current.from + "T00:00:00.000Z");
    var to = new Date(current.to + "T00:00:00.000Z");
    var elapsedDays = Math.max(0, Math.round((to.getTime() - from.getTime()) / 86400000));
    if (state.period === "current_week") {
      var previousFrom = new Date(from.getTime() - 7 * 86400000);
      var previousTo = new Date(previousFrom.getTime() + elapsedDays * 86400000);
      return { from: previousFrom.toISOString().slice(0, 10), to: previousTo.toISOString().slice(0, 10), label: "Прошлая неделя" };
    }
    var year = from.getUTCFullYear();
    var month = from.getUTCMonth();
    var previousMonthFrom = new Date(Date.UTC(year, month - 1, 1));
    var previousMonthLastDay = new Date(Date.UTC(year, month, 0));
    var previousMonthTo = new Date(previousMonthFrom.getTime() + elapsedDays * 86400000);
    if (previousMonthTo > previousMonthLastDay) previousMonthTo = previousMonthLastDay;
    return {
      from: previousMonthFrom.toISOString().slice(0, 10),
      to: previousMonthTo.toISOString().slice(0, 10),
      label: "Прошлый месяц",
    };
  }

  function selectedStatsAuxiliaryKey() {
    var range = selectedPeriodRange();
    return range && range.from && range.to ? range.from + ":" + range.to : "all";
  }

  function loadStatsAuxiliary(force) {
    var key = selectedStatsAuxiliaryKey();
    if (!force && state.statsAuxiliaryLoadedKey === key) return;
    if (state.statsAuxiliaryLoading) return;
    state.statsAuxiliaryLoading = true;
    loadDailyPokerStats(!!force);
    loadCrmWeekReport(!!force);
    loadDashboardPeriodSummary()
      .then(function () {
        state.statsAuxiliaryLoadedKey = key;
      })
      .catch(function () {})
      .then(function () {
        state.statsAuxiliaryLoading = false;
      });
  }

  function loadDashboardPeriodSummary() {
    var base = getApiBaseSafe();
    if (!base) return Promise.resolve(false);
    var current = selectedPeriodRange();
    var previous = comparisonRange();
    state.raffleStatsLoading = true;
    state.periodComparisonLoading = !!previous;
    state.periodComparison = previous ? { label: previous.label, range: previous, metrics: null } : null;
    var url = base + "/api/player-crm" + crmQuery({ mode: "dashboard-summary" });
    if (previous) url += "&compareFrom=" + encodeURIComponent(previous.from) + "&compareTo=" + encodeURIComponent(previous.to);
    return fetch(url, { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!data || data.ok === false) return false;
        if (!state.statsSummary || typeof state.statsSummary !== "object") state.statsSummary = {};
        if (data.raffles) state.statsSummary.raffles = data.raffles;
        if (data.comparison && state.periodComparison) state.periodComparison.metrics = data.comparison;
        return true;
      })
      .catch(function () { return false; })
      .then(function (ok) {
        state.raffleStatsLoading = false;
        state.periodComparisonLoading = false;
        renderStats();
        renderCrmWeekReport();
        return ok;
      });
  }

  function loadActiveTabData() {
    if (state.tab === "stats") {
      loadStatsAuxiliary(false);
      return;
    }
    if (state.tab === "players" && state.playersPage < 1) {
      loadCrmHeavyData("players", { page: 1, segment: state.filter });
      return;
    }
    if (state.tab === "broadcast") loadBroadcastAudience(false);
    if (state.tab === "links" && !state.trackingLinksLoaded && !state.trackingLinksLoading) loadCrmTrackingLinks();
  }

  function loadCrmData(scope) {
    if (scope === "chart" && state.loaded) return loadCrmHeavyData(scope);
    if (state.loading && state.loadStartedAt && Date.now() - state.loadStartedAt > 95000) {
      state.loading = false;
      state.loadingScope = "";
    }
    if (state.loading) return Promise.resolve(false);
    state.loading = true;
    state.loadStartedAt = Date.now();
    showCrmLoading(scope || "all");
    var base = getApiBaseSafe();
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      state.players = [];
      state.blockedUsers = [];
      state.registeredAccounts = [];
      state.pokerPlusAccounts = [];
      state.campaigns = [];
      state.sourceAnalytics = [];
      state.chartAnalytics = null;
      state.chatStats = null;
      state.permissions = null;
      state.source = "no-auth";
      state.crmError = "Дашборд не загрузился: нет авторизации. Войди по email владельца дашборда.";
      state.loading = false;
      state.loadStartedAt = 0;
      state.loadingScope = "";
      state.loaded = true;
      renderAll();
      return Promise.resolve(true);
    }
    var controller = null;
    var timeoutId = null;
    if (typeof AbortController !== "undefined") {
      controller = new AbortController();
      timeoutId = setTimeout(function () {
        try { controller.abort(); } catch (eAbort) {}
      }, 90000);
    }
    var shouldLoadHeavy = false;
    return fetch(base + "/api/player-crm" + crmQuery({ mode: "core" }), controller ? { signal: controller.signal } : undefined)
      .then(function (r) {
        return r.json()
          .then(function (data) {
            data = data || {};
            data.__httpOk = r.ok;
            data.__status = r.status;
            return data;
          })
          .catch(function () {
            return { ok: false, __httpOk: r.ok, __status: r.status, error: "Дашборд не вернул данные." };
          });
      })
      .then(function (data) {
        if (applyCrmData(data, false)) {
          shouldLoadHeavy = data && data.heavyPending === true;
        } else {
          state.players = [];
          state.blockedUsers = [];
          state.registeredAccounts = [];
          state.pokerPlusAccounts = [];
          state.campaigns = [];
          state.sourceAnalytics = [];
          state.statsSummary = null;
          state.chartAnalytics = null;
          state.chatStats = null;
          state.permissions = null;
          state.source = data && data.__status === 403 ? "forbidden" : "empty";
          state.crmError = formatCrmLoadError(data);
        }
      })
      .catch(function (error) {
        state.players = [];
        state.blockedUsers = [];
        state.registeredAccounts = [];
        state.pokerPlusAccounts = [];
        state.campaigns = [];
        state.sourceAnalytics = [];
        state.statsSummary = null;
        state.chartAnalytics = null;
        state.chatStats = null;
        state.permissions = null;
        state.source = "error";
        state.crmError = error && error.name === "AbortError"
          ? "Дашборд не загрузился: API отвечает слишком долго. Попробуй открыть раздел ещё раз через несколько секунд."
          : "Дашборд не загрузился: ошибка сети или API.";
      })
      .then(function () {
        if (timeoutId) clearTimeout(timeoutId);
        state.loading = false;
        state.loadStartedAt = 0;
        state.loadingScope = "";
        state.loaded = true;
        renderActiveTab();
        loadActiveTabData();
        return true;
      });
  }

  function formatCrmLoadError(data) {
    data = data || {};
    if (data.__status === 403) {
      return ((data.error || "Дашборд доступен только владельцам") + ". Если ты уже вошёл под нужной почтой, выйди и войди по email ещё раз.");
    }
    var code = data.code ? " Код: " + String(data.code) + "." : "";
    var detail = data.details ? " Деталь: " + String(data.details) + "." : "";
    if (data.__status >= 500 || data.code) {
      return "Дашборд не загрузился: API упала при сборке данных." + code + detail;
    }
    return (data.error || "Дашборд не загрузился: API не вернул живые данные.") + code + detail;
  }

  var BROADCAST_IMAGE_MAX_DATA_URL = 950000;

  function setBroadcastResult(text) {
    var out = document.getElementById("playerCrmBroadcastResult");
    if (out) out.textContent = text || "";
  }

  function formatBroadcastLogTime(value) {
    var ms = Date.parse(value || "");
    if (!Number.isFinite(ms)) return "—";
    return new Date(ms).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function renderBroadcastDeliveryLog(progress) {
    var log = progress && Array.isArray(progress.deliveryLog) ? progress.deliveryLog : [];
    if (!log.length) return "";
    var rows = log.slice(-300).reverse().map(function (entry) {
      var status = entry.status === "delivered" ? "доставлено" : "ошибка";
      var channels = [
        Number(entry.sentBot) > 0 ? "bot" : "",
        Number(entry.sentPush) > 0 ? "push" : "",
      ].filter(Boolean).join(" + ") || "—";
      var time = formatBroadcastLogTime(entry.createdAt);
      return "<tr><td>" + esc(entry.userId || "—") + "</td><td>" + esc(status) + "</td><td>" + esc(channels) + "</td><td>" + esc(entry.reason || "—") + "</td><td>" + esc(time) + "</td></tr>";
    }).join("");
    return "<details class=\"player-crm__delivery-log\"><summary>История получателей: " + esc(intFmt(log.length)) + "</summary><div><table><thead><tr><th>user_id</th><th>статус</th><th>канал</th><th>причина</th><th>время</th></tr></thead><tbody>" + rows + "</tbody></table></div></details>";
  }

  function broadcastReportPlayerLabel(userId) {
    var id = String(userId || "").trim();
    var player = (Array.isArray(state.broadcastPlayers) ? state.broadcastPlayers : []).find(function (row) {
      if (!row) return false;
      return [row.id, row.accountId, row.dtId, playerBroadcastId(row)]
        .concat(Array.isArray(row.telegramIds) ? row.telegramIds : [])
        .some(function (value) { return String(value || "").trim() === id; });
    });
    if (!player) return id || "—";
    return [player.name || player.handle, player.handle && player.handle !== player.name ? player.handle : "", id]
      .filter(Boolean)
      .join(" · ");
  }

  function broadcastFailureReasonLabel(reason) {
    var value = String(reason || "").trim();
    if (value === "push_failed") return "Нет активной push-подписки или устройство отклонило уведомление";
    if (value === "no_delivery_channel") return "Нет доступного канала доставки";
    if (value === "telegram_failed") return "Telegram не принял сообщение";
    if (value === "user_blocked") return "Пользователь заблокировал бота";
    return value || "Доставка не подтверждена";
  }

  function renderBroadcastFinalReport(progress) {
    progress = progress && typeof progress === "object" ? progress : {};
    var status = String(progress.status || "").trim();
    if (status !== "done" && status !== "failed" && status !== "canceled") return "";
    var total = Math.max(0, Number(progress.total) || 0);
    var processed = Math.max(0, Number(progress.processed) || 0);
    var delivered = Math.max(0, Number(progress.delivered) || (Array.isArray(progress.sentIds) ? progress.sentIds.length : 0));
    var pending = Array.isArray(progress.pendingIds) ? progress.pendingIds.length : Math.max(0, total - delivered);
    var failedIds = Array.isArray(progress.failedIds) ? progress.failedIds : [];
    var failed = Math.max(failedIds.length, Number(progress.failed) || 0);
    var sentPush = Math.max(0, Number(progress.sentPush) || 0);
    var sentBot = Math.max(0, Number(progress.sentBot) || 0);
    var pushOpenUsers = Math.max(0, Number(progress.pushOpenUsers) || 0);
    var pushClicks = Math.max(0, Number(progress.pushClicks) || 0);
    var rate = total > 0 ? Math.round(delivered / total * 1000) / 10 : 0;
    var log = Array.isArray(progress.deliveryLog) ? progress.deliveryLog : [];
    var failedRows = log.filter(function (entry) { return entry && entry.status !== "delivered"; });
    var purgedBlockedIds = Array.isArray(progress.purgedBlockedIds) ? progress.purgedBlockedIds.map(String) : [];
    var blockedRows = failedRows.filter(function (entry) {
      return entry && entry.reason === "user_blocked" && purgedBlockedIds.indexOf(String(entry.userId || "")) === -1;
    });
    var problemsHtml = failedRows.length
      ? "<details class=\"player-crm__broadcast-report-problems\" open><summary>Кому не дошло: " + esc(intFmt(failedRows.length)) + "</summary><div>" +
        failedRows.slice(0, 300).map(function (entry) {
          return "<p><strong>" + esc(broadcastReportPlayerLabel(entry.userId)) + "</strong><span>" + esc(broadcastFailureReasonLabel(entry.reason)) + "</span></p>";
        }).join("") + "</div></details>"
      : "<div class=\"player-crm__broadcast-report-ok\">Ошибочных получателей нет.</div>";
    return "<section class=\"player-crm__broadcast-report\" aria-label=\"Отчёт о рассылке\">" +
      "<h4>Отчёт о рассылке</h4>" +
      "<div class=\"player-crm__broadcast-report-grid\">" +
        "<span><small>Аудитория</small><strong>" + esc(intFmt(total)) + "</strong></span>" +
        "<span><small>Обработано</small><strong>" + esc(intFmt(processed)) + "</strong></span>" +
        "<span><small>Доставлено</small><strong>" + esc(intFmt(delivered)) + "</strong></span>" +
        "<span><small>Доставка</small><strong>" + esc(String(rate).replace(".", ",") + "%") + "</strong></span>" +
        "<span><small>Push принято</small><strong>" + esc(intFmt(sentPush)) + "</strong></span>" +
        "<span><small>Открыли push</small><strong>" + esc(intFmt(pushOpenUsers)) + "</strong></span>" +
        "<span><small>Открытий всего</small><strong>" + esc(intFmt(pushClicks)) + "</strong></span>" +
        "<span><small>Бот принято</small><strong>" + esc(intFmt(sentBot)) + "</strong></span>" +
        "<span><small>Не дошло</small><strong>" + esc(intFmt(Math.max(failed, pending))) + "</strong></span>" +
      "</div>" +
      "<p class=\"player-crm__broadcast-report-note\">«Доставлено» означает, что push-сервис Apple/Google или Telegram принял отправку. Открытия появятся в истории после нажатий пользователей.</p>" +
      (progress.progressId || progress.jobId
        ? "<button type=\"button\" class=\"player-crm__ghost-btn player-crm__broadcast-report-refresh\" data-crm-refresh-broadcast-report>Обновить открытия</button>"
        : "") +
      (blockedRows.length && (progress.progressId || progress.jobId)
        ? "<button type=\"button\" class=\"player-crm__danger-btn player-crm__broadcast-report-refresh\" data-crm-purge-blocked-subscribers>Удалить отписавшихся: " + esc(intFmt(blockedRows.length)) + "</button>"
        : "") +
      problemsHtml +
    "</section>";
  }

  function renderBroadcastProgressResult(text, progress, allowResume) {
    var out = document.getElementById("playerCrmBroadcastResult");
    if (!out) return;
    var pendingIds = progress && Array.isArray(progress.pendingIds) ? progress.pendingIds : [];
    var failedIds = progress && Array.isArray(progress.failedIds) ? progress.failedIds : [];
    var status = String(progress && progress.status || "").trim();
    var progressId = String((progress && (progress.progressId || progress.jobId)) || state.broadcastProgressId || "").trim();
    var html = "<div>" + esc(text || "") + "</div>" + renderBroadcastFinalReport(progress);
    if (progress && progress.asyncJob && progressId && status !== "done" && status !== "canceled" && status !== "failed") {
      html += "<div class=\"player-crm__send-result-actions\">";
      if (status === "paused") {
        html += "<button type=\"button\" class=\"player-crm__primary-btn\" data-crm-resume-job>Продолжить</button>";
      } else {
        html += "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-pause-job>Пауза</button>";
      }
      html += "<button type=\"button\" class=\"player-crm__danger-btn\" data-crm-cancel-job>Отменить</button></div>";
    }
    if (allowResume && pendingIds.length) {
      html += "<div class=\"player-crm__send-result-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-resume-broadcast>Дослать оставшимся: " + esc(intFmt(pendingIds.length)) + "</button></div>";
    }
    if (failedIds.length) {
      html += "<div class=\"player-crm__send-result-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-retry-failed-broadcast>Дослать ошибочные: " + esc(intFmt(failedIds.length)) + "</button></div>";
    }
    html += renderBroadcastDeliveryLog(progress);
    out.innerHTML = html;
  }

  function broadcastImagePayload() {
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    if (channelEl && channelEl.value === "push") return {};
    if (!state.broadcastImage || (!state.broadcastImage.dataUrl && !state.broadcastImage.telegramFileId)) return {};
    return {
      imageDataUrl: state.broadcastImage.dataUrl,
      imageTelegramFileId: state.broadcastImage.telegramFileId || "",
      imageMimeType: state.broadcastImage.mimeType || "image/jpeg",
      imageName: state.broadcastImage.name || "image.jpg",
      imageSize: state.broadcastImage.size || 0,
    };
  }

  function broadcastButtonPayload() {
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    if (channelEl && channelEl.value === "push") {
      var pushTargetEl = document.getElementById("playerCrmBroadcastPushTarget");
      var target = crmLinkTargetByKey(pushTargetEl ? pushTargetEl.value : "chat");
      var openUrl = buildCrmLinkUrl(target.startapp);
      return { buttonText: "Открыть", buttonUrl: openUrl, buttons: [{ text: "Открыть", url: openUrl }] };
    }
    if (!broadcastButtonEnabled()) return {};
    var fields = [
      ["playerCrmBroadcastButtonText", "playerCrmBroadcastButtonUrl", "кнопки 1"],
    ];
    var button2Fields = document.getElementById("playerCrmBroadcastButtonFields2");
    if (button2Fields && !button2Fields.hidden) fields.push(["playerCrmBroadcastButtonText2", "playerCrmBroadcastButtonUrl2", "кнопки 2"]);
    var buttons = [];
    for (var i = 0; i < fields.length; i += 1) {
      var textEl = document.getElementById(fields[i][0]);
      var urlEl = document.getElementById(fields[i][1]);
      var buttonText = textEl ? String(textEl.value || "").trim().slice(0, 64) : "";
      var buttonUrl = urlEl ? String(urlEl.value || "").trim().slice(0, 512) : "";
      if (!buttonText && !buttonUrl) continue;
      if (!buttonText || !buttonUrl) return { error: "Заполни название и ссылку " + fields[i][2] + " или оставь оба поля пустыми." };
      if (!/^https?:\/\//i.test(buttonUrl)) return { error: "Ссылка " + fields[i][2] + " должна начинаться с http:// или https://." };
      buttons.push({ text: buttonText, url: buttonUrl });
    }
    if (!buttons.length) return { error: "Если включены кнопки, заполни хотя бы одну кнопку со ссылкой." };
    return { buttonText: buttons[0].text, buttonUrl: buttons[0].url, buttons: buttons };
  }

  function makeBroadcastProgressId() {
    return "crm_send_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
  }

  function campaignProgressQuery(progressId) {
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    return q + sep + "campaignProgressId=" + encodeURIComponent(progressId || "");
  }

  function stopBroadcastProgressPolling() {
    if (state.broadcastProgressTimer) {
      clearInterval(state.broadcastProgressTimer);
      state.broadcastProgressTimer = null;
    }
    state.broadcastProgressId = "";
  }

  function formatBroadcastProgress(progress, fallbackTotal) {
    progress = progress && typeof progress === "object" ? progress : {};
    var total = Math.max(0, Number(progress.total) || Number(fallbackTotal) || 0);
    var processed = Math.max(0, Number(progress.processed) || 0);
    var delivered = Math.max(0, Number(progress.delivered) || (Array.isArray(progress.sentIds) ? progress.sentIds.length : 0));
    var notSent = Math.max(0, Number(progress.notSent) || (Array.isArray(progress.pendingIds) ? progress.pendingIds.length : Math.max(0, total - delivered)));
    var sentBot = Math.max(0, Number(progress.sentBot) || 0);
    var sentPush = Math.max(0, Number(progress.sentPush) || 0);
    var failed = Math.max(0, Number(progress.failed) || 0);
    var perSecond = Math.max(0, Number(progress.perSecond) || 0);
    var etaSeconds = Number(progress.etaSeconds);
    var etaText = Number.isFinite(etaSeconds) && etaSeconds > 0 ? ", осталось примерно " + formatBroadcastDuration(etaSeconds) : "";
    var speedText = perSecond > 0 ? ", скорость " + perSecond.toLocaleString("ru-RU") + "/с" : "";
    var status = String(progress.status || "").trim();
    if (status === "building") return "Собираем аудиторию рассылки...";
    if (status === "queued") return "Рассылка поставлена в очередь: 0 / " + intFmt(total) + ".";
    if (status === "paused") return "Рассылка на паузе: обработано " + intFmt(processed) + " / " + intFmt(total) + ". Доставлено " + intFmt(delivered) + ", осталось " + intFmt(notSent) + ".";
    if (status === "canceled") return "Рассылка отменена: обработано " + intFmt(processed) + " / " + intFmt(total) + ". Доставлено " + intFmt(delivered) + ", не отправлено " + intFmt(notSent) + ".";
    if (status === "throttled") {
      var waitSeconds = Number(progress.retryAfterSeconds) || 0;
      if (progress.cooldownUntil) waitSeconds = Math.max(waitSeconds, Math.ceil((Date.parse(progress.cooldownUntil) - Date.now()) / 1000));
      var waitText = waitSeconds > 0 ? " Пауза " + formatBroadcastDuration(waitSeconds) + "." : " Скоро продолжим.";
      return "Telegram ограничил скорость отправки." + waitText + " Уже обработано " + intFmt(processed) + " / " + intFmt(total) + ". Доставлено " + intFmt(delivered) + ", осталось " + intFmt(notSent) + ".";
    }
    if (status === "failed") return "Рассылка остановилась: " + (progress.error || "ошибка отправки") + (progress.details ? " Детали: " + progress.details : "");
    var pctText = total > 0 ? " (" + Math.min(100, Math.round(processed / total * 100)) + "%)" : "";
    var prefix = status === "done" ? "Рассылка завершена" : "Отправляем";
    return prefix + ": обработано " + intFmt(processed) + " / " + intFmt(total) + pctText + speedText + etaText + ". Доставлено " + intFmt(delivered) + ", осталось " + intFmt(notSent) + ". Бот " + intFmt(sentBot) + ", push " + intFmt(sentPush) + ", ошибок " + intFmt(failed) + ".";
  }

  function formatBroadcastDuration(seconds) {
    var s = Math.max(0, Math.round(Number(seconds) || 0));
    var m = Math.floor(s / 60);
    var r = s % 60;
    if (m <= 0) return r + " сек";
    if (m < 60) return m + " мин " + r + " сек";
    var h = Math.floor(m / 60);
    return h + " ч " + (m % 60) + " мин";
  }

  function fetchBroadcastProgress(base, progressId) {
    if (!base || !progressId) return Promise.resolve(null);
    return fetch(base + "/api/player-crm" + campaignProgressQuery(progressId))
      .then(function (r) { return r.json(); })
      .then(function (data) { return data && data.ok && data.progress ? data.progress : null; })
      .catch(function () { return null; });
  }

  function refreshBroadcastFinalReport() {
    var progress = state.lastBroadcastProgress || {};
    var progressId = String(progress.progressId || progress.jobId || state.broadcastProgressId || "").trim();
    var base = getApiBaseSafe();
    if (!base || !progressId) {
      setBroadcastResult("Не найден ID завершённой рассылки.");
      return;
    }
    fetchBroadcastProgress(base, progressId).then(function (nextProgress) {
      if (!nextProgress) {
        setBroadcastResult("Не удалось обновить отчёт.");
        return;
      }
      state.lastBroadcastProgress = nextProgress;
      renderBroadcastProgressResult(formatBroadcastProgress(nextProgress, nextProgress.total), nextProgress, false);
    });
  }

  function purgeBlockedBroadcastSubscribers(button) {
    var progress = state.lastBroadcastProgress || {};
    var progressId = String(progress.progressId || progress.jobId || state.broadcastProgressId || "").trim();
    var blockedCount = (Array.isArray(progress.deliveryLog) ? progress.deliveryLog : []).filter(function (row) {
      return row && row.status !== "delivered" && row.reason === "user_blocked";
    }).length;
    var base = getApiBaseSafe();
    if (!base || !progressId) {
      setBroadcastResult("Не найден ID завершённой рассылки.");
      return;
    }
    if (window.confirm && !window.confirm("Удалить из будущих рассылок " + intFmt(blockedCount) + " пользователей, которые заблокировали бота?")) return;
    if (button) {
      button.disabled = true;
      button.textContent = "Удаляем…";
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({ action: "purge_blocked_campaign_subscribers", progressId: progressId })),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.ok) throw new Error(data && data.error || "Не удалось удалить отписавшихся.");
      if (data.progress) state.lastBroadcastProgress = data.progress;
      renderBroadcastProgressResult("Удалено из будущих рассылок: " + intFmt(data.removed || 0) + ".", data.progress || progress, false);
    }).catch(function (error) {
      if (button) {
        button.disabled = false;
        button.textContent = "Удалить отписавшихся: " + intFmt(blockedCount);
      }
      setBroadcastResult(error && error.message ? error.message : "Не удалось удалить отписавшихся.");
    });
  }

  function startBroadcastProgressPolling(base, progressId, totalFallback, out) {
    stopBroadcastProgressPolling();
    if (!base || !progressId) return function () {};
    state.broadcastProgressId = progressId;
    var stopped = false;
    function poll() {
      if (stopped || state.broadcastProgressId !== progressId) return;
      fetchBroadcastProgress(base, progressId)
        .then(function (progress) {
          if (stopped || state.broadcastProgressId !== progressId) return;
          if (progress && out) {
            state.lastBroadcastProgress = progress;
            renderBroadcastProgressResult(formatBroadcastProgress(progress, totalFallback), progress, progress.status === "failed");
          }
        })
        .catch(function () {});
    }
    state.broadcastProgressTimer = setInterval(poll, 1000);
    setTimeout(poll, 350);
    return function () {
      stopped = true;
      stopBroadcastProgressPolling();
    };
  }

  function processBroadcastJobStep(base, progressId) {
    if (!base || !progressId) return Promise.resolve(null);
    return fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({ action: "process_campaign_job", progressId: progressId })),
    })
      .then(function (r) { return r.json(); });
  }

  function controlBroadcastJob(command) {
    var progress = state.lastBroadcastProgress || {};
    var progressId = String(progress.progressId || progress.jobId || state.broadcastProgressId || "").trim();
    var out = document.getElementById("playerCrmBroadcastResult");
    var base = getApiBaseSafe();
    if (!base || !progressId) {
      if (out) out.textContent = "Не найден активный ID рассылки.";
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({ action: "control_campaign_job", progressId: progressId, command: command })),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok) {
          if (out) out.textContent = (data && data.error) || "Не удалось управлять рассылкой.";
          return;
        }
        var nextProgress = data.progress || null;
        if (nextProgress) {
          state.lastBroadcastProgress = nextProgress;
          renderBroadcastProgressResult(formatBroadcastProgress(nextProgress, nextProgress.total), nextProgress, false);
        }
        if (command === "pause" || command === "cancel") {
          stopBroadcastProgressPolling();
          return;
        }
        if (command === "resume") {
          var stopProgress = startBroadcastProgressPolling(base, progressId, nextProgress && nextProgress.total, out);
          driveBroadcastJob(base, progressId, nextProgress && nextProgress.total, out, stopProgress);
        }
      })
      .catch(function () {
        if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
      });
  }

  function driveBroadcastJob(base, progressId, totalFallback, out, stopProgress) {
    var stopped = false;
    function finish(progress, allowResume) {
      stopped = true;
      if (typeof stopProgress === "function") stopProgress();
      if (progress && out) {
        state.lastBroadcastProgress = progress;
        renderBroadcastProgressResult(formatBroadcastProgress(progress, totalFallback), progress, allowResume === true);
      }
      loadCrmData();
    }
    function failWithProgress(message) {
      fetchBroadcastProgress(base, progressId).then(function (progress) {
        stopped = true;
        if (typeof stopProgress === "function") stopProgress();
        if (progress) {
          state.lastBroadcastProgress = progress;
          renderBroadcastProgressResult(message + " " + formatBroadcastProgress(progress, totalFallback), progress, true);
        } else if (out) {
          out.textContent = message;
        }
      });
    }
    function step() {
      if (stopped || state.broadcastProgressId !== progressId) return;
      processBroadcastJobStep(base, progressId)
        .then(function (data) {
          if (stopped || state.broadcastProgressId !== progressId) return;
          var progress = data && data.progress ? data.progress : null;
          if (progress) {
            state.lastBroadcastProgress = progress;
            if (out) renderBroadcastProgressResult(formatBroadcastProgress(progress, totalFallback), progress, progress.status === "failed");
          }
          if (progress && (progress.status === "paused" || progress.status === "canceled")) {
            finish(progress, false);
            return;
          }
          if (!data || !data.ok) {
            failWithProgress((data && data.error) || "Рассылка остановилась.");
            return;
          }
          if (data.jobDone || (progress && progress.status === "done")) {
            finish(progress, false);
            return;
          }
          var nextDelay = 250;
          if (progress && progress.status === "throttled") {
            var waitMs = Number(progress.retryAfterSeconds) > 0 ? Number(progress.retryAfterSeconds) * 1000 : 1000;
            if (progress.cooldownUntil) waitMs = Math.max(waitMs, Date.parse(progress.cooldownUntil) - Date.now());
            nextDelay = Math.max(1000, Math.min(120000, waitMs + 250));
          }
          setTimeout(step, nextDelay);
        })
        .catch(function () {
          failWithProgress(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.");
        });
    }
    setTimeout(step, 50);
  }

  function renderBroadcastImageAttachment() {
    var nameEl = document.getElementById("playerCrmBroadcastImageName");
    var preview = document.getElementById("playerCrmBroadcastImagePreview");
    var removeBtn = document.getElementById("playerCrmBroadcastImageRemoveBtn");
    var img = state.broadcastImage || null;
    if (nameEl) {
      nameEl.textContent = img
        ? (img.name || "Картинка") + (img.size ? " · " + Math.max(1, Math.round(img.size / 1024)) + " КБ" : "")
        : "Картинка не выбрана";
    }
    if (removeBtn) removeBtn.hidden = !img;
    if (preview) {
      if (img && img.dataUrl) {
        preview.hidden = false;
        preview.innerHTML = "<img src=\"" + esc(img.dataUrl) + "\" alt=\"Прикрепленная картинка\" />";
      } else if (img && img.telegramFileId) {
        preview.hidden = false;
        preview.innerHTML = "<div class=\"player-crm__broadcast-telegram-image\">Фото из последнего поста Telegram</div>";
      } else {
        preview.hidden = true;
        preview.innerHTML = "";
      }
    }
  }

  function clearBroadcastImage() {
    state.broadcastImage = null;
    var input = document.getElementById("playerCrmBroadcastImageInput");
    if (input) input.value = "";
    renderBroadcastImageAttachment();
  }

  function insertLatestChannelPost() {
    var button = document.getElementById("playerCrmBroadcastLatestPostBtn");
    var textEl = document.getElementById("playerCrmBroadcastText");
    var base = getApiBaseSafe();
    if (!base) {
      setBroadcastResult("CRM API недоступна.");
      return;
    }
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    if (button) button.disabled = true;
    setBroadcastResult("Загружаем последний пост канала...");
    fetch(base + "/api/player-crm" + q + sep + "latestChannelPost=1")
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var post = data && data.ok && data.post ? data.post : null;
        if (!post) {
          setBroadcastResult("Последний пост канала пока не найден. Бот должен получать публикации канала.");
          return;
        }
        var text = String(post.text || "").trim();
        if (textEl) {
          var max = Number(textEl.getAttribute("maxlength")) || 900;
          textEl.value = text.slice(0, max);
          try { textEl.dispatchEvent(new Event("input", { bubbles: true })); } catch (eInput) {}
        }
        var photoFileId = String(post.photoFileId || "").trim();
        var photoDataUrl = String(post.photoDataUrl || "").trim();
        var photoMimeType = String(post.photoMimeType || "image/jpeg").trim();
        state.broadcastImage = photoFileId || photoDataUrl ? {
          dataUrl: photoDataUrl,
          telegramFileId: photoFileId,
          mimeType: photoMimeType,
          name: "Последний пост Telegram",
          size: Number(post.photoSize) || 0,
        } : null;
        var input = document.getElementById("playerCrmBroadcastImageInput");
        if (input) input.value = "";
        renderBroadcastImageAttachment();
        setBroadcastResult("Последний пост канала подставлен" + (photoFileId || photoDataUrl ? " вместе с фотографией." : "."));
      })
      .catch(function () {
        setBroadcastResult(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Не удалось загрузить последний пост.");
      })
      .finally(function () {
        if (button) button.disabled = false;
      });
  }

  function readFileDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result || "")); };
      reader.onerror = function () { reject(new Error("Картинка не прочиталась.")); };
      reader.readAsDataURL(file);
    });
  }

  function compressBroadcastImage(file, dataUrl) {
    var type = String(file && file.type || "").toLowerCase();
    if (!/^image\/(jpeg|jpg|png|webp|gif)$/.test(type)) {
      return Promise.reject(new Error("Можно прикрепить JPG, PNG, WEBP или GIF."));
    }
    if (type === "image/gif") {
      if (dataUrl.length <= BROADCAST_IMAGE_MAX_DATA_URL) return Promise.resolve({ dataUrl: dataUrl, mimeType: type, size: file.size || 0 });
      return Promise.reject(new Error("GIF слишком большой. Прикрепи картинку до 700 КБ."));
    }
    if (dataUrl.length <= BROADCAST_IMAGE_MAX_DATA_URL && (file.size || 0) <= 700000) {
      return Promise.resolve({ dataUrl: dataUrl, mimeType: type, size: file.size || 0 });
    }
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var sourceW = img.naturalWidth || img.width || 0;
        var sourceH = img.naturalHeight || img.height || 0;
        if (!sourceW || !sourceH) {
          reject(new Error("Не удалось обработать картинку."));
          return;
        }
        var sides = [1280, 1024, 800, 640];
        var qualities = [0.84, 0.74, 0.64];
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext && canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Браузер не смог сжать картинку."));
          return;
        }
        var best = "";
        var bestBytes = 0;
        for (var s = 0; s < sides.length; s++) {
          var maxSide = sides[s];
          var scale = Math.min(1, maxSide / Math.max(sourceW, sourceH));
          var targetW = Math.max(1, Math.round(sourceW * scale));
          var targetH = Math.max(1, Math.round(sourceH * scale));
          canvas.width = targetW;
          canvas.height = targetH;
          ctx.clearRect(0, 0, targetW, targetH);
          ctx.drawImage(img, 0, 0, targetW, targetH);
          for (var q = 0; q < qualities.length; q++) {
            var out = canvas.toDataURL("image/jpeg", qualities[q]);
            best = out;
            bestBytes = Math.round((out.length * 3) / 4);
            if (out.length <= BROADCAST_IMAGE_MAX_DATA_URL) {
              resolve({ dataUrl: out, mimeType: "image/jpeg", size: bestBytes });
              return;
            }
          }
        }
        if (best && best.length <= BROADCAST_IMAGE_MAX_DATA_URL * 1.08) {
          resolve({ dataUrl: best, mimeType: "image/jpeg", size: bestBytes });
          return;
        }
        reject(new Error("Картинка слишком большая. Попробуй файл поменьше."));
      };
      img.onerror = function () { reject(new Error("Картинка не открылась.")); };
      img.src = dataUrl;
    });
  }

  function handleBroadcastImageFile(file) {
    if (!file) return;
    setBroadcastResult("Готовим картинку...");
    readFileDataUrl(file)
      .then(function (dataUrl) { return compressBroadcastImage(file, dataUrl); })
      .then(function (image) {
        state.broadcastImage = {
          dataUrl: image.dataUrl,
          mimeType: image.mimeType || "image/jpeg",
          name: file.name || "image.jpg",
          size: image.size || file.size || 0,
        };
        renderBroadcastImageAttachment();
        setBroadcastResult("Картинка прикреплена.");
      })
      .catch(function (err) {
        clearBroadcastImage();
        setBroadcastResult(err && err.message ? err.message : "Не удалось прикрепить картинку.");
      });
  }

  function closeBroadcastPreview() {
    var modal = document.getElementById("playerCrmBroadcastPreviewModal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("player-crm-dialog-modal-open");
  }

  function ensureBroadcastPreviewModal() {
    var modal = document.getElementById("playerCrmBroadcastPreviewModal");
    if (modal) return modal;
    var root = document.getElementById("playerCrmView") || document.body;
    modal = document.createElement("div");
    modal.id = "playerCrmBroadcastPreviewModal";
    modal.className = "player-crm__dialog-modal player-crm__broadcast-preview-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Предпросмотр рассылки");
    modal.hidden = true;
    root.appendChild(modal);
    return modal;
  }

  function showBroadcastPreview() {
    var players = updateBroadcastAudience();
    var batch = readBroadcastBatch(players);
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var textEl = document.getElementById("playerCrmBroadcastText");
    var channel = channelEl ? channelEl.value : "bot";
    var text = textEl ? String(textEl.value || "").trim() : "";
    if (channel === "push") text = broadcastPlainText(text);
    var image = channel === "push" ? null : (state.broadcastImage || null);
    var button = broadcastButtonPayload();
    var hasButton = !!(button && !button.error && button.buttonText);
    var buttons = hasButton && Array.isArray(button.buttons) ? button.buttons : (hasButton ? [{ text: button.buttonText, url: button.buttonUrl }] : []);
    var buttonsHtml = buttons.map(function (btn) {
      return "<span class=\"player-crm__recipient-open-btn\">" + esc(btn.text || "Открыть") + "</span>";
    }).join("");
    var buttonsLinksHtml = buttons.map(function (btn, idx) {
      return "<span><em>Кнопка " + esc(String(idx + 1)) + "</em>" + esc((btn && btn.url) || "—") + "</span>";
    }).join("");
    var hasBot = channel === "bot" || channel === "bot_push";
    var hasPush = channel === "push" || channel === "bot_push";
    var pushText = text ? text.slice(0, 180) : (image ? "Фото от Два туза" : "Новое сообщение");
    var gridClass = !hasBot ? " player-crm__recipient-preview-grid--push-only" : !hasPush ? " player-crm__recipient-preview-grid--bot-only" : "";
    var botHtml = hasBot ? (
      "<div class=\"player-crm__recipient-phone\">" +
        "<div class=\"player-crm__recipient-phone-head\"><strong>Два туза</strong><span>бот</span></div>" +
        "<div class=\"player-crm__recipient-chat\">" +
          "<div class=\"player-crm__recipient-bubble\">" +
            (image && image.dataUrl
              ? "<img src=\"" + esc(image.dataUrl) + "\" alt=\"Картинка рассылки\" />"
              : image && image.telegramFileId
                ? "<div class=\"player-crm__broadcast-telegram-image\">Фото из поста Telegram</div>"
                : "") +
            (text ? "<p class=\"player-crm__recipient-bubble-text\">" + broadcastFormattedPreviewHtml(text) + "</p>" : "") +
            (hasButton ? "<div class=\"player-crm__recipient-open-buttons\">" + buttonsHtml + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</div>"
    ) : "";
    var pushHtml = hasPush ? (
      "<div class=\"player-crm__push-card\">" +
        "<span class=\"player-crm__push-icon\">2</span>" +
        "<span><strong>Два туза</strong><p>" + esc(pushText) + "</p></span>" +
      "</div>"
    ) : "";
    var modal = ensureBroadcastPreviewModal();
    modal.innerHTML =
      "<button type=\"button\" class=\"player-crm__dialog-modal-backdrop\" data-crm-broadcast-preview-close aria-label=\"Закрыть\"></button>" +
      "<div class=\"player-crm__dialog-modal-panel\">" +
        "<div class=\"player-crm__dialog-modal-head\"><div><h3>Предпросмотр</h3><span>" + esc(channelLabel(channel)) + "</span></div><button type=\"button\" class=\"player-crm__dialog-modal-close\" data-crm-broadcast-preview-close aria-label=\"Закрыть\">×</button></div>" +
        "<div class=\"player-crm__dialog-modal-body player-crm__broadcast-preview-body\">" +
          "<div class=\"player-crm__broadcast-preview-scroll\">" +
            "<div class=\"player-crm__broadcast-preview-meta\"><span>Канал<strong>" + esc(channelLabel(channel)) + "</strong></span><span>Пачка<strong>" + esc(batch.number + "/" + batch.totalBatches) + "</strong></span><span>Получателей<strong>" + esc(intFmt(batch.count)) + "</strong></span>" + (hasPush && !hasBot ? "<span>Переход<strong>" + esc(crmLinkTargetByKey((document.getElementById("playerCrmBroadcastPushTarget") || {}).value).label) + "</strong></span>" : "<span>Картинка<strong>" + (image ? "Да" : "Нет") + "</strong></span><span>Кнопки<strong>" + (hasButton ? esc(intFmt(buttons.length)) : "Нет") + "</strong></span>") + "</div>" +
            (hasButton && hasBot ? "<div class=\"player-crm__broadcast-preview-link\"><strong>Ссылки в кнопках</strong>" + buttonsLinksHtml + "</div>" : "") +
            "<div class=\"player-crm__recipient-preview-grid" + gridClass + "\">" + botHtml + pushHtml + "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    modal.hidden = false;
    document.body.classList.add("player-crm-dialog-modal-open");
  }

  function runBroadcast(action, options) {
    options = options && typeof options === "object" ? options : {};
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var textEl = document.getElementById("playerCrmBroadcastText");
    var out = document.getElementById("playerCrmBroadcastResult");
    var segment = "all";
    var channel = channelEl ? channelEl.value : "bot";
    var text = textEl ? String(textEl.value || "").trim() : "";
    if (channel === "push") text = broadcastPlainText(text);
    var resumeIds = Array.isArray(options.audienceIds) ? options.audienceIds.map(function (id) { return String(id || "").trim(); }).filter(Boolean) : [];
    var innerFilters = resumeIds.length ? [] : broadcastInnerFilterValues();
    var players = updateBroadcastAudience();
    var batch = readBroadcastBatch(players);
    var allAudienceIds = players.map(playerBroadcastId).filter(Boolean);
    var sendAllBatches = options.allBatches === true && !resumeIds.length;
    var audienceIds = resumeIds.length ? resumeIds : (sendAllBatches ? allAudienceIds : batch.ids);
    var targetCount = audienceIds.length;
    if (!text && (channel === "push" || !state.broadcastImage)) {
      if (out) out.textContent = "Нужно написать текст или прикрепить картинку.";
      return;
    }
    if (action !== "test_campaign" && !targetCount) {
      if (out) out.textContent = "В выбранной пачке нет получателей.";
      return;
    }
    if (action === "send_campaign") {
      if (state.permissions && state.permissions.canSendCampaign === false) {
        if (out) out.textContent = "У твоей роли нет права отправлять массовые рассылки.";
        return;
      }
      var sendLabel = resumeIds.length
        ? (options.failedOnly === true ? "Дослать только ошибочные: " : "Дослать рассылку оставшимся: ")
        : sendAllBatches
          ? "Отправить все пачки выбранной группы: "
          : "Отправить пачку " + batch.number + "/" + batch.totalBatches + ": ";
      var ok = options.skipConfirm === true
        ? true
        : window.confirm ? window.confirm(sendLabel + targetCount + " игроков, канал " + channelLabel(channel) + (state.broadcastImage ? ", с картинкой" : "") + "?") : false;
      if (!ok) return;
    }
    if (out) {
      out.textContent = action === "test_campaign"
        ? "Отправляем тест: 1 получатель, массовая аудитория не затрагивается..."
        : action === "send_campaign"
          ? (resumeIds.length ? (options.failedOnly === true ? "Досылаем ошибочные: " : "Досылаем оставшимся: ") : sendAllBatches ? "Отправляем все пачки: " : "Отправляем пачку " + batch.number + "/" + batch.totalBatches + ": ") + targetCount + " игроков..."
          : "Готовим пачку " + batch.number + "/" + batch.totalBatches + ": " + targetCount + " игроков...";
    }
    var base = getApiBaseSafe();
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Нет авторизации/API: живая аудитория недоступна.";
      return;
    }
    var payload = {
      action: action,
      segment: segment,
      channel: channel,
      text: text,
      period: state.period === "custom" ? "30" : state.period,
      range: requestRange(),
      innerFilters: innerFilters,
    };
    if (action !== "test_campaign") {
      payload.audienceIds = audienceIds;
      if (!resumeIds.length) {
        payload.batch = {
          number: batch.number,
          totalBatches: batch.totalBatches,
          size: batch.size,
          from: sendAllBatches ? 1 : batch.fromIndex + 1,
          to: sendAllBatches ? allAudienceIds.length : batch.toIndex,
          total: batch.total,
          allBatches: sendAllBatches,
        };
      }
    }
    if (options.resumeProgressId) {
      payload.resumeProgressId = options.resumeProgressId;
      payload.force = true;
    }
    if (options.force === true) payload.force = true;
    if (options.ackDuplicate === true) payload.ackDuplicate = true;
    var imagePayload = broadcastImagePayload();
    Object.keys(imagePayload).forEach(function (key) {
      payload[key] = imagePayload[key];
    });
    var buttonPayload = broadcastButtonPayload();
    if (buttonPayload.error) {
      if (out) out.textContent = buttonPayload.error;
      return;
    }
    Object.keys(buttonPayload).forEach(function (key) {
      payload[key] = buttonPayload[key];
    });
    var stopProgress = function () {};
    if (action === "send_campaign") {
      payload.progressId = makeBroadcastProgressId();
      payload.asyncJob = true;
      stopProgress = startBroadcastProgressPolling(base, payload.progressId, targetCount, out);
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe(payload)),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && action === "send_campaign" && data.jobQueued && payload.progressId) {
          if (data.progress) {
            state.lastBroadcastProgress = data.progress;
            renderBroadcastProgressResult(formatBroadcastProgress(data.progress, targetCount), data.progress, false);
          }
          driveBroadcastJob(base, payload.progressId, targetCount, out, stopProgress);
          return;
        }
        stopProgress();
        if (data && data.ok) {
          if (out) {
            var recipient = data.testRecipient || "тестовый получатель";
            var antispamText = data.skippedAntispam ? ", антиспам пропустил " + data.skippedAntispam : "";
            out.textContent = action === "test_campaign"
              ? "Тест отправлен: " + recipient + ", получателей " + (data.audience || 1) + ", бот " + (data.sentBot || 0) + ", push " + (data.sentPush || 0) + ", фото " + (data.hasImage ? "да" : "нет") + ", ошибок " + (data.failed || 0) + ". Массовая аудитория не затронута."
              : (action === "send_campaign" ? "Рассылка отправлена" : "Черновик рассылки готов") + ": " + data.audience + " игроков, доставлено " + (data.delivered != null ? data.delivered : (data.sentBot || data.sentPush || 0)) + ", осталось " + (data.notSent != null ? data.notSent : 0) + ", бот " + (data.sentBot || 0) + ", push " + (data.sentPush || 0) + ", фото " + (data.hasImage ? "да" : "нет") + antispamText + ", ошибок " + (data.failed || 0) + ". ID: " + (data.id || data.campaignId || "—") + ".";
            if (data.warning) out.textContent += " Предупреждение: " + data.warning;
          }
          loadCrmData();
        } else if (data && data.code === "crm_campaign_duplicate_today" && data.requiresAck && action === "send_campaign") {
          if (out) out.textContent = (data.warning || data.error || "Эта аудитория уже получала похожую рассылку сегодня.") + " Подтверди, если нужно отправить повторно.";
          var ack = window.confirm ? window.confirm((data.warning || data.error || "Эта аудитория уже получала похожую рассылку сегодня.") + "\n\nВсе равно отправить?") : false;
          if (ack) {
            runBroadcast(action, Object.assign({}, options, { ackDuplicate: true, skipConfirm: true }));
          }
        } else if (out) {
          var errorText = data && data.error ? data.error : "Не удалось подготовить рассылку.";
          if (data && data.details) errorText += " Детали: " + data.details;
          if (payload.progressId) {
            fetchBroadcastProgress(base, payload.progressId).then(function (progress) {
              if (progress) {
                state.lastBroadcastProgress = progress;
                renderBroadcastProgressResult(errorText + " " + formatBroadcastProgress(progress, targetCount), progress, true);
              } else {
                out.textContent = errorText;
              }
            });
          } else {
            out.textContent = errorText;
          }
        }
      })
      .catch(function () {
        stopProgress();
        if (!out) return;
        if (payload.progressId) {
          fetchBroadcastProgress(base, payload.progressId).then(function (progress) {
            if (progress) {
              state.lastBroadcastProgress = progress;
              renderBroadcastProgressResult((typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.") + " " + formatBroadcastProgress(progress, targetCount), progress, true);
            } else {
              out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
            }
          });
        } else {
          out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
        }
      });
  }

  function prepareBroadcast() {
    runBroadcast("prepare_campaign");
  }

  function sendBroadcastNow() {
    runBroadcast("send_campaign");
  }

  function sendBroadcastAllBatches() {
    runBroadcast("send_campaign", { allBatches: true });
  }

  function sendBroadcastTest() {
    runBroadcast("test_campaign");
  }

  function resumeBroadcastRemaining() {
    var progress = state.lastBroadcastProgress || null;
    var pendingIds = progress && Array.isArray(progress.pendingIds) ? progress.pendingIds.map(function (id) { return String(id || "").trim(); }).filter(Boolean) : [];
    if (!pendingIds.length) {
      setBroadcastResult("Оставшихся получателей нет.");
      return;
    }
    runBroadcast("send_campaign", {
      audienceIds: pendingIds,
      resumeProgressId: progress.progressId || state.broadcastProgressId || "",
    });
  }

  function retryBroadcastFailed() {
    var progress = state.lastBroadcastProgress || null;
    var failedIds = progress && Array.isArray(progress.failedIds) ? progress.failedIds.map(function (id) { return String(id || "").trim(); }).filter(Boolean) : [];
    if (!failedIds.length) {
      setBroadcastResult("Ошибочных получателей нет.");
      return;
    }
    runBroadcast("send_campaign", {
      audienceIds: failedIds,
      force: true,
      failedOnly: true,
    });
  }

  function saveSelectedPlayer() {
    var p = selectedPlayer();
    if (!p) return;
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Сохранение доступно после входа админа.";
      return;
    }
    var payload = {
      action: "save_player",
      accountId: p.accountId || p.id,
      manager: val("playerCrmEditManager"),
      source: val("playerCrmEditSource"),
      tags: val("playerCrmEditTags"),
      note: val("playerCrmEditNote"),
    };
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe(payload)),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? "Карточка сохранена." : (data && data.error ? data.error : "Не удалось сохранить.");
      if (data && data.ok) loadCrmData();
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
    });
  }

  function addSelectedEvent() {
    var p = selectedPlayer();
    if (!p) return;
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "События можно добавлять после входа админа.";
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({
        action: "record_event",
        accountId: p.accountId || p.id,
        type: val("playerCrmEventType"),
        amount: val("playerCrmEventAmount"),
        note: val("playerCrmEventNote"),
      })),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? "Событие добавлено." : (data && data.error ? data.error : "Не удалось добавить событие.");
      if (data && data.ok) loadCrmData();
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
    });
  }

  function linkSelectedIdentity() {
    var p = selectedPlayer();
    if (!p) return;
    postCrmAction({
      action: "link_identity",
      accountId: p.accountId || p.id,
      dtId: val("playerCrmLinkDtId"),
      telegramId: val("playerCrmLinkTelegramId"),
      pokerPlusId: val("playerCrmLinkPokerPlusId"),
      displayName: val("playerCrmLinkDisplayName"),
    }, "Связки ID сохранены.");
  }

  function setSelectedPlayerBlocked(blocked, explicitId, actionButton) {
    var p = selectedPlayer();
    var targetId = explicitId || (p && (p.accountId || p.id));
    if (!targetId) return;
    var reason = p ? val("playerCrmBlockReason") : "";
    if (blocked) {
      var ok = true;
      try {
        ok = !window.confirm || window.confirm("Заблокировать игрока насовсем в приложении?");
      } catch (eConfirmBlock) {
        ok = true;
      }
      if (!ok) return;
      if (!reason && window.prompt) {
        try {
          reason = String(window.prompt("Причина блокировки", "") || "").trim();
        } catch (ePromptBlock) {}
      }
    }
    if (actionButton) {
      actionButton.disabled = true;
      actionButton.textContent = blocked ? "Блокирую…" : "Разблокирую…";
    }
    postCrmAction({
      action: blocked ? "block_player" : "unblock_player",
      targetId: targetId,
      targetLabel: p && (p.name || p.handle || p.accountId || p.id),
      reason: reason,
    }, blocked ? "Игрок заблокирован." : "Игрок разблокирован.", {
      onSuccess: function () {
        if (!blocked) {
          state.blockedUsers = (state.blockedUsers || []).filter(function (row) {
            return String(row && row.id || "") !== String(targetId);
          });
          renderBlockedList();
          loadCrmBlockedData();
        } else {
          loadCrmData();
        }
      },
      onFinally: function (ok) {
        if (!actionButton || ok) return;
        actionButton.disabled = false;
        actionButton.textContent = blocked ? "Заблокировать" : "Разблокировать";
      },
    });
  }

  function postCrmAction(payload, okText, options) {
    options = options || {};
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Действие доступно после входа админа.";
      if (typeof options.onFinally === "function") options.onFinally(false, null);
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe(payload)),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? okText : (data && data.error ? data.error : "Не удалось выполнить действие.");
      if (data && data.ok) {
        if (typeof options.onSuccess === "function") options.onSuccess(data);
        else loadCrmData();
      }
      if (typeof options.onFinally === "function") options.onFinally(!!(data && data.ok), data);
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
      if (typeof options.onFinally === "function") options.onFinally(false, null);
    });
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value || "" : "";
  }

  function requestRange() { return state.period === "custom" && state.dateFrom && state.dateTo ? { from: state.dateFrom, to: state.dateTo } : state.period === "today" ? localDayRange(0) : state.period === "yesterday" ? localDayRange(-1) : null; }

  function isFixedPeriodRange(key, range) {
    var fixed = fixedPeriodRange(key);
    return !!(fixed && range && fixed.from === range.from && fixed.to === range.to);
  }

  function localDateKeyForQuery(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function localDayRange(offset) {
    var now = new Date();
    var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (Number(offset) || 0));
    var key = localDateKeyForQuery(date);
    return { from: key, to: key };
  }

  function isSameRange(range, expected) { return !!(range && expected && range.from === expected.from && range.to === expected.to); }

  function isLocalYesterdayRange(range) { return isSameRange(range, localDayRange(-1)); }

  function isLocalTodayRange(range) { return isSameRange(range, localDayRange(0)); }

  function crmQuery(extra) {
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    extra = extra && typeof extra === "object" ? extra : {};
    if (extra.mode) {
      q += sep + "mode=" + encodeURIComponent(extra.mode);
      sep = "&";
    }
    if (extra.segment) {
      q += sep + "segment=" + encodeURIComponent(extra.segment);
      sep = "&";
    }
    if (state.period === "custom") {
      setDefaultDates();
      q += sep + "from=" + encodeURIComponent(state.dateFrom) + "&to=" + encodeURIComponent(state.dateTo);
    } else if (state.period === "today") {
      var today = localDayRange(0);
      q += sep + "from=" + encodeURIComponent(today.from) + "&to=" + encodeURIComponent(today.to);
    } else if (state.period === "yesterday") {
      var yesterday = localDayRange(-1);
      q += sep + "from=" + encodeURIComponent(yesterday.from) + "&to=" + encodeURIComponent(yesterday.to);
    } else if (state.period === "all") {
      q += sep + "period=all";
    } else {
      q += sep + "period=" + encodeURIComponent(state.period || "30");
    }
    sep = "&";
    if (state.chartPeriod === "custom") {
      setDefaultChartDates();
      q += sep + "chartFrom=" + encodeURIComponent(state.chartDateFrom) + "&chartTo=" + encodeURIComponent(state.chartDateTo);
    } else if (state.chartPeriod === "today") {
      var chartToday = localDayRange(0);
      q += sep + "chartFrom=" + encodeURIComponent(chartToday.from) + "&chartTo=" + encodeURIComponent(chartToday.to);
    } else if (state.chartPeriod === "yesterday") {
      var chartYesterday = localDayRange(-1);
      q += sep + "chartFrom=" + encodeURIComponent(chartYesterday.from) + "&chartTo=" + encodeURIComponent(chartYesterday.to);
    } else if (state.chartPeriod === "all") {
      q += sep + "chartPeriod=all";
    } else {
      q += sep + "chartPeriod=" + encodeURIComponent(state.chartPeriod || "30");
    }
    return q;
  }

  var crmDateRangePicker = null;
  var crmRangeWeekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  var crmRangeMonthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  function crmPad2(n) {
    return String(n).padStart(2, "0");
  }

  function crmDateKeyFromParts(year, monthIndex, day) {
    return year + "-" + crmPad2(monthIndex + 1) + "-" + crmPad2(day);
  }

  function crmDateKeyIsValid(key) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(key || ""));
  }

  function crmDisplayDate(key) {
    var parts = String(key || "").split("-");
    if (parts.length !== 3) return "";
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  function crmMonthKeyFromDateKey(key) {
    if (crmDateKeyIsValid(key)) return String(key).slice(0, 7);
    var now = new Date();
    return crmDateKeyFromParts(now.getFullYear(), now.getMonth(), 1).slice(0, 7);
  }

  function crmAddMonths(monthKey, delta) {
    var parts = String(monthKey || "").split("-");
    var year = Number(parts[0]) || new Date().getFullYear();
    var month = Number(parts[1]) || (new Date().getMonth() + 1);
    var d = new Date(year, month - 1 + (Number(delta) || 0), 1);
    return crmDateKeyFromParts(d.getFullYear(), d.getMonth(), 1).slice(0, 7);
  }

  function crmRangeElements(scope) {
    var isChart = scope === "chart";
    return {
      button: document.getElementById(isChart ? "playerCrmChartDateRangeBtn" : "playerCrmDateRangeBtn"),
      text: document.getElementById(isChart ? "playerCrmChartDateRangeText" : "playerCrmDateRangeText"),
      popover: document.getElementById(isChart ? "playerCrmChartDateRangeCalendar" : "playerCrmDateRangeCalendar"),
    };
  }

  function crmRangeValues(scope) {
    if (scope === "chart") return { from: state.chartDateFrom || "", to: state.chartDateTo || "" };
    return { from: state.dateFrom || "", to: state.dateTo || "" };
  }

  function crmRangeLabel(scope) {
    var range = crmRangeValues(scope);
    if (range.from && range.to) return crmDisplayDate(range.from) + " — " + crmDisplayDate(range.to);
    if (range.from) return "Начало: " + crmDisplayDate(range.from);
    return "Выбрать диапазон";
  }

  function syncCrmDateRangeControl(scope) {
    var els = crmRangeElements(scope);
    var label = crmRangeLabel(scope);
    if (els.text) els.text.textContent = label;
    if (els.button) els.button.setAttribute("aria-label", label === "Выбрать диапазон" ? "Выбрать диапазон дат" : "Изменить диапазон дат: " + label);
  }

  function setCrmDateRangeExpanded(scope, expanded) {
    var els = crmRangeElements(scope);
    if (els.button) els.button.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (els.popover) els.popover.hidden = !expanded;
  }

  function closeCrmDateRangePicker(scope) {
    if (!crmDateRangePicker) return;
    if (scope && crmDateRangePicker.scope !== scope) return;
    var activeScope = crmDateRangePicker.scope;
    crmDateRangePicker = null;
    setCrmDateRangeExpanded(activeScope, false);
  }

  function renderCrmDateRangePicker() {
    if (!crmDateRangePicker) return;
    var scope = crmDateRangePicker.scope;
    var els = crmRangeElements(scope);
    var popover = els.popover;
    if (!popover) return;
    var monthParts = String(crmDateRangePicker.month || "").split("-");
    var year = Number(monthParts[0]) || new Date().getFullYear();
    var monthIndex = (Number(monthParts[1]) || (new Date().getMonth() + 1)) - 1;
    var first = new Date(year, monthIndex, 1);
    var offset = (first.getDay() + 6) % 7;
    var today = new Date();
    var todayKey = localDateKey(today);
    var currentWeekStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    currentWeekStartDate.setDate(currentWeekStartDate.getDate() - ((currentWeekStartDate.getDay() + 6) % 7));
    var currentWeekEndDate = new Date(currentWeekStartDate.getFullYear(), currentWeekStartDate.getMonth(), currentWeekStartDate.getDate() + 6);
    var currentWeekStartKey = localDateKey(currentWeekStartDate);
    var currentWeekEndKey = localDateKey(currentWeekEndDate);
    var from = crmDateRangePicker.draftFrom || "";
    var to = crmDateRangePicker.draftTo || "";
    var status = "";
    if (from && to) status = crmDisplayDate(from) + " — " + crmDisplayDate(to);
    else if (from) status = "Теперь выберите окончание";
    else status = "Выберите начало периода";
    var html = "<div class=\"player-crm__range-calendar-head\">" +
      "<button type=\"button\" class=\"player-crm__range-calendar-nav\" data-crm-range-nav=\"-1\" aria-label=\"Предыдущий месяц\">‹</button>" +
      "<strong>" + esc((crmRangeMonthNames[monthIndex] || "") + " " + year) + "</strong>" +
      "<button type=\"button\" class=\"player-crm__range-calendar-nav\" data-crm-range-nav=\"1\" aria-label=\"Следующий месяц\">›</button>" +
      "<button type=\"button\" class=\"player-crm__range-calendar-close\" data-crm-range-close aria-label=\"Закрыть календарь\">×</button>" +
      "</div>" +
      "<div class=\"player-crm__range-calendar-state\">" + esc(status) + "</div>" +
      "<div class=\"player-crm__range-calendar-weekdays\">" + crmRangeWeekdays.map(function (day) { return "<span>" + esc(day) + "</span>"; }).join("") + "</div>" +
      "<div class=\"player-crm__range-calendar-days\">";
    for (var i = 0; i < 42; i += 1) {
      var date = new Date(year, monthIndex, i - offset + 1);
      var key = crmDateKeyFromParts(date.getFullYear(), date.getMonth(), date.getDate());
      var classes = ["player-crm__range-calendar-day"];
      if (date.getMonth() !== monthIndex) classes.push("player-crm__range-calendar-day--outside");
      if (key >= currentWeekStartKey && key <= currentWeekEndKey) classes.push("player-crm__range-calendar-day--current-week");
      if (key === todayKey) classes.push("player-crm__range-calendar-day--today");
      if (from && to && key > from && key < to) classes.push("player-crm__range-calendar-day--inside");
      if (from && key === from) classes.push("player-crm__range-calendar-day--start");
      if (to && key === to) classes.push("player-crm__range-calendar-day--end");
      if (from && to && from === to && key === from) classes.push("player-crm__range-calendar-day--single");
      html += "<button type=\"button\" class=\"" + classes.join(" ") + "\" data-crm-range-day=\"" + esc(key) + "\" aria-label=\"" + esc(crmDisplayDate(key)) + "\">" + date.getDate() + "</button>";
    }
    html += "</div>";
    popover.innerHTML = html;
  }

  function openCrmDateRangePicker(scope) {
    scope = scope === "chart" ? "chart" : "stats";
    if (scope === "chart") {
      if (!state.chartDateFrom || !state.chartDateTo) setDefaultChartDates();
    } else if (!state.dateFrom || !state.dateTo) {
      setDefaultDates();
    }
    var range = crmRangeValues(scope);
    crmDateRangePicker = {
      scope: scope,
      month: crmMonthKeyFromDateKey(localDateKey(new Date())),
      draftFrom: range.from || "",
      draftTo: range.to || "",
      pending: false,
    };
    setCrmDateRangeExpanded(scope, true);
    renderCrmDateRangePicker();
    syncCrmDateRangeControl(scope);
  }

  function toggleCrmDateRangePicker(scope) {
    scope = scope === "chart" ? "chart" : "stats";
    if (crmDateRangePicker && crmDateRangePicker.scope === scope) {
      closeCrmDateRangePicker(scope);
      return;
    }
    closeCrmDateRangePicker();
    openCrmDateRangePicker(scope);
  }

  function applyCrmDateRange(scope, from, to) {
    if (!crmDateKeyIsValid(from) || !crmDateKeyIsValid(to)) return;
    if (to < from) {
      var tmp = from;
      from = to;
      to = tmp;
    }
    if (scope === "chart") {
      state.chartPeriod = "custom";
      state.chartDateFrom = from;
      state.chartDateTo = to;
      normalizeChartDateRange("to");
      syncPeriodInputs();
      closeCrmDateRangePicker("chart");
      loadCrmData("chart");
      return;
    }
    state.period = "custom";
    state.dateFrom = from;
    state.dateTo = to;
    normalizeDateRange("to");
    state.showAllPlayers = false;
    syncPeriodInputs();
    closeCrmDateRangePicker("stats");
    if (state.tab !== "calculations") loadCrmData("data");
  }

  function pickCrmDateRangeDay(scope, key) {
    if (!crmDateKeyIsValid(key)) return;
    if (!crmDateRangePicker || crmDateRangePicker.scope !== scope) openCrmDateRangePicker(scope);
    if (!crmDateRangePicker.draftFrom || !crmDateRangePicker.pending) {
      crmDateRangePicker.draftFrom = key;
      crmDateRangePicker.draftTo = "";
      crmDateRangePicker.pending = true;
      crmDateRangePicker.month = crmMonthKeyFromDateKey(key);
      renderCrmDateRangePicker();
      return;
    }
    var from = crmDateRangePicker.draftFrom;
    var to = key;
    if (to < from) {
      var tmp = from;
      from = to;
      to = tmp;
    }
    crmDateRangePicker.draftFrom = from;
    crmDateRangePicker.draftTo = to;
    crmDateRangePicker.pending = false;
    applyCrmDateRange(scope, from, to);
  }

  function moveCrmDateRangeMonth(delta) {
    if (!crmDateRangePicker) return;
    crmDateRangePicker.month = crmAddMonths(crmDateRangePicker.month, delta);
    renderCrmDateRangePicker();
  }

  function syncPeriodInputs() {
    var from = document.getElementById("playerCrmDateFrom");
    var to = document.getElementById("playerCrmDateTo");
    var periodName = document.getElementById("playerCrmPeriodName");
    var periodRange = document.getElementById("playerCrmPeriodRange");
    var chartPeriod = document.getElementById("playerCrmChartPeriodSelect");
    var chartFrom = document.getElementById("playerCrmChartDateFrom");
    var chartTo = document.getElementById("playerCrmChartDateTo");
    var calculationRange = selectedPeriodRange();
    var calculationRangeState = {
      key: String(state.period || "all"),
      from: calculationRange && calculationRange.from ? calculationRange.from : "",
      to: calculationRange && calculationRange.to ? calculationRange.to : "",
      label: periodLabel(),
      all: state.period === "all",
    };
    var previousCalculationRangeKey = window.__pokerAdminCalculationRange
      ? [window.__pokerAdminCalculationRange.key, window.__pokerAdminCalculationRange.from, window.__pokerAdminCalculationRange.to].join(":")
      : "";
    var nextCalculationRangeKey = [calculationRangeState.key, calculationRangeState.from, calculationRangeState.to].join(":");
    window.__pokerAdminCalculationRange = calculationRangeState;
    if (previousCalculationRangeKey && previousCalculationRangeKey !== nextCalculationRangeKey && state.tab === "calculations") {
      window.setTimeout(function () {
        if (typeof window.pokerRefreshAdminReportCalculations === "function") window.pokerRefreshAdminReportCalculations();
      }, 0);
    }
    document.querySelectorAll("[data-crm-period-tab]").forEach(function (button) {
      var active = button.getAttribute("data-crm-period-tab") === (state.period || "all");
      button.classList.toggle("player-crm__period-tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    document.querySelectorAll("[data-crm-chart-period-tab]").forEach(function (button) {
      var active = button.getAttribute("data-crm-chart-period-tab") === (state.chartPeriod || "current_week");
      button.classList.toggle("player-crm__period-tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (from) {
      from.value = state.dateFrom || "";
      from.max = state.dateTo || "";
    }
    if (to) {
      to.value = state.dateTo || "";
      to.min = state.dateFrom || "";
    }
    var showDates = state.period === "custom";
    document.querySelectorAll(".player-crm__date-field").forEach(function (el) {
      el.classList.toggle("player-crm__date-field--visible", showDates);
    });
    syncCrmDateRangeControl("stats");
    if (!showDates) closeCrmDateRangePicker("stats");
    if (periodName) {
      var activePeriodButton = document.querySelector("[data-crm-period-tab].player-crm__period-tab--active");
      periodName.textContent = activePeriodButton ? activePeriodButton.textContent : "Выбранный период";
    }
    if (periodRange) {
      var rangeLabel = periodRangeLabel();
      periodRange.textContent = rangeLabel;
      periodRange.hidden = !rangeLabel;
    }
    if (chartPeriod) chartPeriod.value = state.chartPeriod || "30";
    if (chartFrom) {
      chartFrom.value = state.chartDateFrom || "";
      chartFrom.max = state.chartDateTo || "";
    }
    if (chartTo) {
      chartTo.value = state.chartDateTo || "";
      chartTo.min = state.chartDateFrom || "";
    }
    var showChartDates = state.chartPeriod === "custom";
    document.querySelectorAll(".player-crm__chart-date-field").forEach(function (el) {
      el.classList.toggle("player-crm__chart-date-field--visible", showChartDates);
    });
    syncCrmDateRangeControl("chart");
    if (!showChartDates) closeCrmDateRangePicker("chart");
  }

  function openDatePicker(input) {
    if (!input) return;
    input.focus({ preventScroll: true });
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch (err) {}
    }
    input.click();
  }

  var playerCrmReportsRuntime = typeof initPlayerCrmReportsRuntime === "function"
    ? initPlayerCrmReportsRuntime({
      state: state,
      money: money,
      intFmt: intFmt,
      periodLabel: periodLabel,
      chartPeriodLabel: chartPeriodLabel,
      periodData: periodData,
      esc: esc,
      playersInSelectedPeriodByDate: playersInSelectedPeriodByDate,
      dateInSelectedPeriod: dateInSelectedPeriod,
      filteredPlayers: filteredPlayers,
      segmentByKey: segmentByKey,
      filteredRegistrations: filteredRegistrations,
      registrationRowsByMethod: registrationRowsByMethod,
      registrationTelegramLabel: registrationTelegramLabel,
      filteredPokerPlusAccounts: filteredPokerPlusAccounts,
      dateOnly: dateOnly,
      segmentPlayers: segmentPlayers,
      broadcastSegmentPlayers: broadcastSegmentPlayers,
      segments: segments
    })
    : {};
  var channelLabel = playerCrmReportsRuntime.channelLabel || function (channel) { return channel === "push" ? "push" : channel === "bot_push" ? "бот + push" : "бот"; };
  var sendCrmSectionData = playerCrmReportsRuntime.sendCrmSectionData || function () {};
  renderCampaigns = playerCrmReportsRuntime.renderCampaigns || renderCampaigns;

  function bindOnce() {
    var root = document.getElementById("playerCrmView");
    if (!root || root.dataset.crmBound === "1") return;
    root.dataset.crmBound = "1";
    root.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-crm-tab]");
      if (tab) {
        state.tab = tab.getAttribute("data-crm-tab") || "stats";
        renderActiveTab();
        if (state.tab === "players" && state.playersScope !== "players") loadCrmHeavyData("players", { page: 1 });
        if (state.tab === "blocked") loadCrmBlockedData();
        if (state.tab === "stats") loadStatsAuxiliary(false);
        if (state.tab === "broadcast") loadBroadcastAudience(false);
        if (state.tab === "links") {
          renderCrmLinkTargetOptions();
          if (!state.trackingLinksLoaded && !state.trackingLinksLoading) loadCrmTrackingLinks();
          else renderCrmTrackingLinks();
        }
        if (state.tab === "blocked") renderBlockedList();
        return;
      }
      if (e.target.closest("[data-crm-refresh-stats]")) {
        var refreshNow = Date.now();
        if (state.statsManualRefreshAt && refreshNow - state.statsManualRefreshAt < 30000) return;
        state.statsManualRefreshAt = refreshNow;
        loadDailyPokerStats(true);
        loadCrmWeekReport(true);
        loadCrmData("all");
        return;
      }
      if (e.target.closest("[data-crm-refresh-week-report]")) {
        loadCrmWeekReport(true);
        return;
      }
      var copyWeekReportButton = e.target.closest("[data-crm-copy-week-report]");
      if (copyWeekReportButton) {
        copyCrmWeekReport(copyWeekReportButton);
        return;
      }
      if (e.target.closest("[data-crm-refresh-blocked]")) {
        loadCrmBlockedData();
        return;
      }
      var sendSection = e.target.closest("[data-crm-send-section]");
      if (sendSection) {
        sendCrmSectionData(sendSection.getAttribute("data-crm-send-section") || state.tab);
        return;
      }
      var linksRefresh = e.target.closest("[data-crm-links-refresh]");
      if (linksRefresh) {
        loadCrmTrackingLinks();
        return;
      }
      if (e.target && e.target.id === "playerCrmCreateLinkBtn") {
        createCrmTrackingLink();
        return;
      }
      if (e.target && e.target.id === "playerCrmClearLinkFormBtn") {
        clearCrmLinkForm();
        return;
      }
      var linkCopy = e.target.closest("[data-crm-link-copy]");
      if (linkCopy) {
        copyCrmLinkText(linkCopy.getAttribute("data-crm-link-copy") || "");
        return;
      }
      var linkDetails = e.target.closest("[data-crm-link-details]");
      if (linkDetails) {
        openCrmLinkDetails(linkDetails.getAttribute("data-crm-link-details") || "");
        return;
      }
      if (e.target.closest("[data-crm-close-link-details-modal]")) {
        closeCrmLinkDetailsModal();
        return;
      }
      var sortButton = e.target.closest("[data-crm-sort-field]");
      if (sortButton) {
        e.preventDefault();
        if (setTableSort(sortButton.getAttribute("data-crm-sort-scope") || "", sortButton.getAttribute("data-crm-sort-field") || "")) {
          renderSortScope(sortButton.getAttribute("data-crm-sort-scope") || "");
        }
        return;
      }
      var filter = e.target.closest("[data-crm-filter]");
      if (filter) {
        state.filter = filter.getAttribute("data-crm-filter") || "all";
        if (state.filter === "blocked") loadCrmBlockedData();
        else {
          state.players = [];
          state.playersPage = 0;
          state.playersHasMore = false;
          loadCrmHeavyData("players", { page: 1, segment: state.filter });
        }
        state.selectedId = "";
        state.showAllPlayers = false;
        renderActiveTab();
        return;
      }
      if (e.target.closest("[data-crm-retry-players]")) {
        state.playersPage = 0;
        loadCrmHeavyData("players", { page: 1, segment: state.filter });
        return;
      }
      var player = e.target.closest("[data-crm-player]");
      if (player) {
        state.selectedId = player.getAttribute("data-crm-player") || "";
        state.playerModalOpen = true;
        state.tab = "players";
        renderAll();
        return;
      }
      var open = e.target.closest("[data-crm-open-player]");
      if (open) {
        state.selectedId = open.getAttribute("data-crm-open-player") || "";
        state.playerModalOpen = true;
        state.visitsModalOpen = false;
        state.tab = "players";
        renderAll();
        return;
      }
      if (e.target.closest("[data-crm-close-player-modal]")) {
        closePlayerModal();
        return;
      }
      var useSeg = e.target.closest("[data-crm-use-segment]");
      if (useSeg) {
        state.filter = useSeg.getAttribute("data-crm-use-segment") || "all";
        state.tab = "players";
        state.selectedId = "";
        state.showAllPlayers = false;
        state.players = [];
        state.playersPage = 0;
        state.playersHasMore = false;
        loadCrmHeavyData("players", { page: 1, segment: state.filter });
        renderActiveTab();
        return;
      }
      if (e.target && e.target.id === "playerCrmShowAllBtn") {
        state.showAllPlayers = true;
        if (state.playersHasMore) loadCrmHeavyData("players", { page: state.playersPage + 1, append: true });
        else renderList();
        return;
      }
      if (e.target.closest("[data-crm-close-dialog-modal]")) {
        closeManagerDialogModal();
        return;
      }
      if (e.target.closest("[data-crm-close-registration-modal]")) {
        closeRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-close-pokerplus-modal]")) {
        closePokerPlusModal();
        return;
      }
      if (e.target.closest("[data-crm-close-general-messages-modal]")) {
        closeGeneralMessagesModal();
        return;
      }
      if (e.target.closest("[data-crm-close-visits-modal]")) {
        closeVisitsModal();
        return;
      }
      if (e.target.closest("[data-crm-close-bot-modal]")) {
        closeBotModal();
        return;
      }
      if (e.target.closest("[data-crm-close-push-modal]")) {
        closePushModal();
        return;
      }
      if (e.target.closest("[data-crm-close-daily-poker-modal]")) {
        closeDailyPokerModal();
        return;
      }
      if (e.target.closest("[data-crm-close-raffles-modal]")) { closeRafflesModal(); return; }
      var dailyDebitsSortButton = e.target.closest("[data-crm-daily-debits-sort]");
      if (dailyDebitsSortButton) {
        state.dailyPokerDebitsSort = dailyDebitsSortButton.getAttribute("data-crm-daily-debits-sort") === "amount" ? "amount" : "date";
        renderDailyPokerModal();
        return;
      }
      var dailyPokerTabButton = e.target.closest("[data-crm-daily-poker-tab]");
      if (dailyPokerTabButton) {
        state.dailyPokerModalTab = dailyPokerTabButton.getAttribute("data-crm-daily-poker-tab") === "returns" ? "returns" : "issued";
        renderDailyPokerModal();
        return;
      }
      var rafflesSortButton = e.target.closest("[data-crm-raffles-sort]");
      if (rafflesSortButton) {
        var raffleSortValue = rafflesSortButton.getAttribute("data-crm-raffles-sort");
        state.raffleRecipientsSort = raffleSortValue === "cash" || raffleSortValue === "total" ? raffleSortValue : "tickets";
        renderRafflesModal();
        return;
      }
      var rafflesTabButton = e.target.closest("[data-crm-raffles-tab]");
      if (rafflesTabButton) {
        state.rafflesModalTab = rafflesTabButton.getAttribute("data-crm-raffles-tab") === "returns" ? "returns" : "issued";
        renderRafflesModal();
        return;
      }
      if (e.target.closest("[data-crm-general-messages-modal]")) {
        state.generalMessagesModalOpen = true;
        state.showAllGeneralMessagesModal = false;
        renderStats();
        renderGeneralMessagesModal();
        return;
      }
      if (e.target.closest("[data-crm-visits-modal]")) { state.visitsModalOpen = true; state.visitsModalMode = "users"; renderStats(); renderVisitsModal(); return; }
      if (e.target.closest("[data-crm-visits-sections-modal]")) { state.visitsModalOpen = true; state.visitsModalMode = "sections"; renderStats(); renderVisitsModal(); return; }
      if (e.target.closest("[data-crm-bot-modal]")) {
        state.botModalOpen = true;
        renderStats();
        renderBotModal();
        return;
      }
      if (e.target.closest("[data-crm-push-modal]")) {
        state.pushModalOpen = true;
        renderStats();
        renderPushModal();
        return;
      }
      if (e.target.closest("[data-crm-daily-poker-modal]")) {
        state.dailyPokerModalOpen = true;
        state.dailyPokerModalTab = "issued";
        renderStats();
        renderDailyPokerModal();
        loadDailyPokerWinners();
        return;
      }
      var rafflesModalButton = e.target.closest("[data-crm-raffles-modal]");
      if (rafflesModalButton) {
        e.preventDefault();
        e.stopPropagation();
        state.rafflesModalOpen = true;
        state.rafflesModalTab = rafflesModalButton.getAttribute("data-crm-raffles-modal") === "returns" ? "returns" : "issued";
        renderRafflesModal();
        loadRaffleRecipients();
        return;
      }
      if (e.target.closest("[data-crm-pokerplus-modal]")) {
        state.pokerPlusModalOpen = true;
        renderStats();
        renderPokerPlusModal();
        return;
      }
      var registrationModal = e.target.closest("[data-crm-registrations-modal]");
      if (registrationModal) {
        state.registrationModalMethod = registrationModal.getAttribute("data-crm-registrations-modal") || "";
        state.showAllRegistrationModal = false;
        renderStats();
        renderRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-show-all-registrations]")) {
        state.showAllRegistrationModal = true;
        renderRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-export-registrations]")) {
        exportRegistrationModalRows();
        return;
      }
      if (e.target.closest("[data-crm-show-all-general-messages]")) {
        state.showAllGeneralMessagesModal = true;
        renderGeneralMessagesModal();
        return;
      }
      var managerDialogs = e.target.closest("[data-crm-manager-dialogs]");
      if (managerDialogs) {
        var managerKey = managerDialogs.getAttribute("data-crm-manager-dialogs") || "";
        state.chatDialogManager = state.chatDialogManager === managerKey ? "" : managerKey;
        state.selectedManagerDialogId = "";
        renderStats();
        renderManagerDialogModal();
        return;
      }
      var managerDialog = e.target.closest("[data-crm-manager-dialog-id]");
      if (managerDialog) {
        state.selectedManagerDialogId = state.selectedManagerDialogId === managerDialog.getAttribute("data-crm-manager-dialog-id")
          ? ""
          : managerDialog.getAttribute("data-crm-manager-dialog-id");
        renderManagerDialogModal();
        return;
      }
      var rangeButton = e.target.closest("[data-crm-date-range]");
      if (rangeButton) {
        e.preventDefault();
        e.stopPropagation();
        toggleCrmDateRangePicker(rangeButton.getAttribute("data-crm-date-range") || "stats");
        return;
      }
      var rangeNav = e.target.closest("[data-crm-range-nav]");
      if (rangeNav) {
        e.preventDefault();
        e.stopPropagation();
        moveCrmDateRangeMonth(Number(rangeNav.getAttribute("data-crm-range-nav")) || 0);
        return;
      }
      var rangeDay = e.target.closest("[data-crm-range-day]");
      if (rangeDay) {
        e.preventDefault();
        e.stopPropagation();
        pickCrmDateRangeDay(crmDateRangePicker && crmDateRangePicker.scope || "stats", rangeDay.getAttribute("data-crm-range-day") || "");
        return;
      }
      if (e.target.closest("[data-crm-range-close]")) {
        e.preventDefault();
        e.stopPropagation();
        closeCrmDateRangePicker();
        return;
      }
      var datePicker = e.target.closest("[data-crm-date-picker]");
      if (datePicker) {
        e.preventDefault();
        openDatePicker(document.getElementById(datePicker.getAttribute("data-crm-date-picker") || ""));
        return;
      }
      var modalDatePicker = e.target.closest("[data-crm-modal-date-picker]");
      if (modalDatePicker) {
        e.preventDefault();
        var input = modalDatePicker.getAttribute("data-crm-modal-date-picker") === "to"
          ? modalDatePicker.closest(".player-crm__modal-period-row").querySelector("[data-crm-modal-date-to]")
          : modalDatePicker.closest(".player-crm__modal-period-row").querySelector("[data-crm-modal-date-from]");
        openDatePicker(input);
        return;
      }
      var broadSeg = e.target.closest("[data-crm-broadcast-segment]");
      if (broadSeg) {
        var seg = broadSeg.getAttribute("data-crm-broadcast-segment") || "has_bot";
        var sel = document.getElementById("playerCrmBroadcastSegment");
        if (sel) sel.value = seg;
        var batchNumber = document.getElementById("playerCrmBroadcastBatchNumber");
        if (batchNumber) batchNumber.value = "1";
        state.tab = "broadcast";
        syncTabs();
        loadBroadcastAudience(false);
        updateBroadcastAudience();
        return;
      }
      var broadcastChannelTab = e.target.closest("[data-crm-broadcast-channel]");
      if (broadcastChannelTab) {
        e.preventDefault();
        selectBroadcastChannel(broadcastChannelTab.getAttribute("data-crm-broadcast-channel") || "bot");
        return;
      }
      if (e.target.closest("[data-crm-resume-broadcast]")) {
        resumeBroadcastRemaining();
        return;
      }
      if (e.target.closest("[data-crm-retry-failed-broadcast]")) {
        retryBroadcastFailed();
        return;
      }
      if (e.target.closest("[data-crm-refresh-broadcast-report]")) {
        refreshBroadcastFinalReport();
        return;
      }
      var purgeBlockedSubscribers = e.target.closest("[data-crm-purge-blocked-subscribers]");
      if (purgeBlockedSubscribers) {
        purgeBlockedBroadcastSubscribers(purgeBlockedSubscribers);
        return;
      }
      if (e.target.closest("[data-crm-pause-job]")) {
        controlBroadcastJob("pause");
        return;
      }
      if (e.target.closest("[data-crm-resume-job]")) {
        controlBroadcastJob("resume");
        return;
      }
      if (e.target.closest("[data-crm-cancel-job]")) {
        if (!window.confirm || window.confirm("Отменить текущую рассылку? Уже отправленные сообщения останутся доставленными.")) {
          controlBroadcastJob("cancel");
        }
        return;
      }
    });

    document.addEventListener("click", function (e) {
      if (!crmDateRangePicker || !e.target || !e.target.closest) return;
      if (e.target.closest("[data-crm-date-range]") || e.target.closest("[data-crm-date-range-popover]")) return;
      closeCrmDateRangePicker();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCrmDateRangePicker();
    });

    var search = document.getElementById("playerCrmSearch");
    if (search) {
      search.addEventListener("input", function () {
        state.search = search.value || "";
        state.selectedId = "";
        state.showAllPlayers = false;
        renderList();
        renderDetail();
      });
    }
    var blockedSearch = document.getElementById("playerCrmBlockedSearch");
    if (blockedSearch) {
      blockedSearch.addEventListener("input", function () {
        state.blockedSearch = blockedSearch.value || "";
        renderBlockedList();
      });
    }
    document.querySelectorAll("[data-crm-period-tab]").forEach(function (periodButton) {
      periodButton.addEventListener("click", function () {
        state.period = periodButton.getAttribute("data-crm-period-tab") || "all";
        if (state.period === "custom") setDefaultDates();
        state.showAllPlayers = false;
        syncPeriodInputs();
        if (state.tab !== "calculations") loadCrmData("data");
        if (state.period === "custom") {
          window.requestAnimationFrame(function () {
            var rangeButton = document.getElementById("playerCrmDateRangeBtn");
            if (rangeButton && rangeButton.getAttribute("aria-expanded") !== "true") toggleCrmDateRangePicker("stats");
          });
        }
      });
    });
    document.querySelectorAll("[data-crm-chart-period-tab]").forEach(function (periodButton) {
      periodButton.addEventListener("click", function () {
        state.chartPeriod = periodButton.getAttribute("data-crm-chart-period-tab") || "current_week";
        if (state.chartPeriod === "custom") setDefaultChartDates();
        syncPeriodInputs();
        loadCrmData("chart");
        if (state.chartPeriod === "custom") {
          window.requestAnimationFrame(function () {
            var rangeButton = document.getElementById("playerCrmChartDateRangeBtn");
            if (rangeButton && rangeButton.getAttribute("aria-expanded") !== "true") toggleCrmDateRangePicker("chart");
          });
        }
      });
    });
    var dateFrom = document.getElementById("playerCrmDateFrom");
    if (dateFrom) dateFrom.addEventListener("change", function () {
      state.dateFrom = dateFrom.value || "";
      state.period = "custom";
      normalizeDateRange("from");
      state.showAllPlayers = false;
      syncPeriodInputs();
      if (state.tab !== "calculations") loadCrmData("data");
    });
    var dateTo = document.getElementById("playerCrmDateTo");
    if (dateTo) dateTo.addEventListener("change", function () {
      state.dateTo = dateTo.value || "";
      state.period = "custom";
      normalizeDateRange("to");
      state.showAllPlayers = false;
      syncPeriodInputs();
      if (state.tab !== "calculations") loadCrmData("data");
    });
    var chartPeriod = document.getElementById("playerCrmChartPeriodSelect");
    if (chartPeriod) {
      chartPeriod.addEventListener("change", function () {
        state.chartPeriod = chartPeriod.value || "30";
        if (state.chartPeriod === "custom") setDefaultChartDates();
        syncPeriodInputs();
        try {
          chartPeriod.blur();
        } catch (eChartPeriodBlur) {}
        loadCrmData("chart");
      });
    }
    var chartDateFrom = document.getElementById("playerCrmChartDateFrom");
    if (chartDateFrom) chartDateFrom.addEventListener("change", function () {
      state.chartDateFrom = chartDateFrom.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("from");
      syncPeriodInputs();
      loadCrmData("chart");
    });
    var chartDateTo = document.getElementById("playerCrmChartDateTo");
    if (chartDateTo) chartDateTo.addEventListener("change", function () {
      state.chartDateTo = chartDateTo.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("to");
      syncPeriodInputs();
      loadCrmData("chart");
    });
    var registrationMethod = document.getElementById("playerCrmRegistrationMethod");
    if (registrationMethod) registrationMethod.addEventListener("change", function () {
      state.registrationMethod = registrationMethod.value || "all";
      renderRegistrations();
    });
    var registrationSort = document.getElementById("playerCrmRegistrationSort");
    if (registrationSort) registrationSort.addEventListener("change", function () {
      state.registrationSort = registrationSort.value || "name";
      renderRegistrations();
    });
    [
      ["playerCrmPokerLevelMin", "pokerPlusLevelMin"],
      ["playerCrmPokerLevelMax", "pokerPlusLevelMax"],
      ["playerCrmPokerDateFrom", "pokerPlusDateFrom"],
      ["playerCrmPokerDateTo", "pokerPlusDateTo"],
    ].forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      if (!input) return;
      input.addEventListener("input", function () {
        state[pair[1]] = input.value || "";
        renderPokerPlusAccounts();
      });
      input.addEventListener("change", function () {
        state[pair[1]] = input.value || "";
        renderPokerPlusAccounts();
      });
    });
    root.addEventListener("change", function (e) {
      if (e.target.closest("[data-crm-modal-period]")) {
        state.period = e.target.value || "30";
        if (state.period === "custom") setDefaultDates();
        reloadCrmDataFromModal();
        return;
      }
      if (e.target.closest("[data-crm-modal-date-from]")) {
        state.dateFrom = e.target.value || "";
        state.period = "custom";
        normalizeDateRange("from");
        reloadCrmDataFromModal();
        return;
      }
      if (e.target.closest("[data-crm-modal-date-to]")) {
        state.dateTo = e.target.value || "";
        state.period = "custom";
        normalizeDateRange("to");
        reloadCrmDataFromModal();
      }
    });
    var broadcastSegment = document.getElementById("playerCrmBroadcastSegment");
    if (broadcastSegment) broadcastSegment.addEventListener("change", function () {
      var batchNumber = document.getElementById("playerCrmBroadcastBatchNumber");
      if (batchNumber) batchNumber.value = "1";
      updateBroadcastAudience();
    });
    var broadcastFilters = document.getElementById("playerCrmBroadcastFilters");
    if (broadcastFilters) broadcastFilters.addEventListener("change", function () {
      var batchNumber = document.getElementById("playerCrmBroadcastBatchNumber");
      if (batchNumber) batchNumber.value = "1";
      updateBroadcastAudience();
    });
    var broadcastBatchSize = document.getElementById("playerCrmBroadcastBatchSize");
    if (broadcastBatchSize) broadcastBatchSize.addEventListener("input", updateBroadcastAudience);
    var broadcastBatchNumber = document.getElementById("playerCrmBroadcastBatchNumber");
    if (broadcastBatchNumber) broadcastBatchNumber.addEventListener("input", updateBroadcastAudience);
    var broadcastBatchPrev = document.getElementById("playerCrmBroadcastBatchPrevBtn");
    if (broadcastBatchPrev) broadcastBatchPrev.addEventListener("click", function () { stepBroadcastBatch(-1); });
    var broadcastBatchNext = document.getElementById("playerCrmBroadcastBatchNextBtn");
    if (broadcastBatchNext) broadcastBatchNext.addEventListener("click", function () { stepBroadcastBatch(1); });
    var broadcastPreview = document.getElementById("playerCrmBroadcastPreviewBtn");
    if (broadcastPreview) broadcastPreview.addEventListener("click", showBroadcastPreview);
    initBroadcastEmojiPicker();
    initBroadcastFormatToolbar();
    renderBroadcastLinkTargetOptions();
    var broadcastButtonEnabledEl = document.getElementById("playerCrmBroadcastButtonEnabled");
    if (broadcastButtonEnabledEl) broadcastButtonEnabledEl.checked = false;
    syncBroadcastButtonMode();
    syncBroadcastChannelMode();
    var broadcastTextEl = document.getElementById("playerCrmBroadcastText");
    if (broadcastTextEl) broadcastTextEl.addEventListener("input", syncBroadcastTextCounter);
    if (broadcastButtonEnabledEl) broadcastButtonEnabledEl.addEventListener("change", syncBroadcastButtonMode);
    var broadcastAddButton2 = document.getElementById("playerCrmBroadcastAddButton2");
    if (broadcastAddButton2) broadcastAddButton2.addEventListener("click", function () { setBroadcastButton2Enabled(true); });
    var broadcastRemoveButton2 = document.getElementById("playerCrmBroadcastRemoveButton2");
    if (broadcastRemoveButton2) broadcastRemoveButton2.addEventListener("click", function () {
      ["playerCrmBroadcastButtonText2", "playerCrmBroadcastButtonUrl2"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = "";
      });
      var target = document.getElementById("playerCrmBroadcastButtonTarget2");
      if (target) target.value = "";
      setBroadcastButton2Enabled(false);
    });
    var broadcastButtonTarget = document.getElementById("playerCrmBroadcastButtonTarget");
    if (broadcastButtonTarget) broadcastButtonTarget.addEventListener("change", function () { syncBroadcastButtonTarget(1); });
    var broadcastButtonTarget2 = document.getElementById("playerCrmBroadcastButtonTarget2");
    if (broadcastButtonTarget2) broadcastButtonTarget2.addEventListener("change", function () { syncBroadcastButtonTarget(2); });
    var broadcastButtonUrl = document.getElementById("playerCrmBroadcastButtonUrl");
    if (broadcastButtonUrl) broadcastButtonUrl.addEventListener("input", function () {
      var sel = document.getElementById("playerCrmBroadcastButtonTarget");
      if (sel) sel.value = "";
    });
    var broadcastButtonUrl2 = document.getElementById("playerCrmBroadcastButtonUrl2");
    if (broadcastButtonUrl2) broadcastButtonUrl2.addEventListener("input", function () {
      var sel = document.getElementById("playerCrmBroadcastButtonTarget2");
      if (sel) sel.value = "";
    });
    var broadcastImageBtn = document.getElementById("playerCrmBroadcastImageBtn");
    var broadcastLatestPostBtn = document.getElementById("playerCrmBroadcastLatestPostBtn");
    var broadcastImageInput = document.getElementById("playerCrmBroadcastImageInput");
    var broadcastImageRemove = document.getElementById("playerCrmBroadcastImageRemoveBtn");
    if (broadcastImageBtn && broadcastImageInput) broadcastImageBtn.addEventListener("click", function () { broadcastImageInput.click(); });
    if (broadcastLatestPostBtn) broadcastLatestPostBtn.addEventListener("click", insertLatestChannelPost);
    if (broadcastImageInput) broadcastImageInput.addEventListener("change", function () {
      var file = broadcastImageInput.files && broadcastImageInput.files[0] ? broadcastImageInput.files[0] : null;
      handleBroadcastImageFile(file);
    });
    if (broadcastImageRemove) broadcastImageRemove.addEventListener("click", function () {
      clearBroadcastImage();
      setBroadcastResult("Картинка убрана.");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBroadcastPreview();
    });
    var broadcastPrepare = document.getElementById("playerCrmBroadcastPrepareBtn");
    if (broadcastPrepare) broadcastPrepare.addEventListener("click", prepareBroadcast);
    var broadcastSend = document.getElementById("playerCrmBroadcastSendBtn");
    if (broadcastSend) broadcastSend.addEventListener("click", sendBroadcastNow);
    var broadcastSendAll = document.getElementById("playerCrmBroadcastSendAllBtn");
    if (broadcastSendAll) broadcastSendAll.addEventListener("click", sendBroadcastAllBatches);
    var broadcastTest = document.getElementById("playerCrmBroadcastTestBtn");
    if (broadcastTest) broadcastTest.addEventListener("click", sendBroadcastTest);
    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-crm-broadcast-preview-close]")) {
        closeBroadcastPreview();
        return;
      }
      if (e.target && e.target.id === "playerCrmSavePlayerBtn") saveSelectedPlayer();
      if (e.target && e.target.id === "playerCrmAddEventBtn") addSelectedEvent();
      if (e.target && e.target.id === "playerCrmLinkIdentityBtn") linkSelectedIdentity();
      if (e.target && e.target.id === "playerCrmBlockPlayerBtn") setSelectedPlayerBlocked(true);
      if (e.target && e.target.id === "playerCrmUnblockPlayerBtn") setSelectedPlayerBlocked(false);
      var unblock = e.target.closest("[data-crm-unblock-id]");
      if (unblock) {
        setSelectedPlayerBlocked(false, unblock.getAttribute("data-crm-unblock-id") || "", unblock);
        return;
      }
      var chartToggle = e.target.closest("[data-crm-chart-series]");
      if (chartToggle) {
        state.chartSeriesEnabled[chartToggle.getAttribute("data-crm-chart-series") || ""] = chartToggle.checked;
        renderAnalytics();
      }
    });
    root.addEventListener("mousemove", function (e) {
      var point = e.target.closest("[data-crm-chart-point]");
      if (point) {
        showChartTooltip(point, e);
      } else if (!e.target.closest(".player-crm__chart-card")) {
        hideChartTooltip();
      }
    });
    root.addEventListener("mouseleave", hideChartTooltip);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.registrationModalMethod) closeRegistrationModal();
      if (e.key === "Escape" && state.pokerPlusModalOpen) closePokerPlusModal();
      if (e.key === "Escape" && state.generalMessagesModalOpen) closeGeneralMessagesModal();
      if (e.key === "Escape" && state.visitsModalOpen) closeVisitsModal();
      if (e.key === "Escape" && state.botModalOpen) closeBotModal();
      if (e.key === "Escape" && state.pushModalOpen) closePushModal();
      if (e.key === "Escape" && state.dailyPokerModalOpen) closeDailyPokerModal();
      if (e.key === "Escape" && state.rafflesModalOpen) closeRafflesModal();
      if (e.key === "Escape" && state.playerModalOpen) closePlayerModal();
      if (e.key === "Escape" && state.chatDialogManager) closeManagerDialogModal();
    });
  }

  var playerCrmViewportShellRuntime = typeof initPlayerCrmViewportShellRuntime === "function"
    ? initPlayerCrmViewportShellRuntime()
    : {};
  var syncCrmViewportShell = playerCrmViewportShellRuntime.syncCrmViewportShell || function () {};

  function pokerInitPlayerCrm() {
    syncCrmViewportShell();
    setTimeout(syncCrmViewportShell, 80);
    setTimeout(syncCrmViewportShell, 320);
    adoptPendingShellTab();
    bindOnce();
    syncPeriodInputs();
    if (state.loading && state.loadStartedAt && Date.now() - state.loadStartedAt > 18000) {
      state.loading = false;
      state.loadingScope = "";
    }
    if (!state.loaded) loadCrmData();
    else {
      renderAll();
      loadActiveTabData();
    }
  }

  window.pokerInitPlayerCrm = pokerInitPlayerCrm;
  window.pokerSyncPlayerCrmViewportShell = syncCrmViewportShell;
  window.addEventListener("resize", syncCrmViewportShell);
  window.addEventListener("orientationchange", function () {
    setTimeout(syncCrmViewportShell, 120);
    setTimeout(syncCrmViewportShell, 420);
  });
  if (window.visualViewport) {
    try {
      window.visualViewport.addEventListener("resize", syncCrmViewportShell);
      window.visualViewport.addEventListener("scroll", syncCrmViewportShell);
    } catch (eVvBind) {}
  }
  window.addEventListener("poker-admin-access", function () {
    if (document.body && document.body.getAttribute("data-view") === "player-crm") pokerInitPlayerCrm();
  });
  if (document.readyState !== "loading") {
    setTimeout(function () {
      if (document.getElementById("playerCrmView") && (window.__pokerPlayerCrmStandaloneOpen || (document.body && document.body.getAttribute("data-view") === "player-crm"))) pokerInitPlayerCrm();
    }, 0);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.getElementById("playerCrmView") && (window.__pokerPlayerCrmStandaloneOpen || (document.body && document.body.getAttribute("data-view") === "player-crm"))) pokerInitPlayerCrm();
    });
  }
})();
