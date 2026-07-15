function initPlayerCrmRegistrationsRuntime(ctx) {
  var state = ctx.state;
  var esc = ctx.esc;
  var intFmt = ctx.intFmt;
  var dateInSelectedPeriod = ctx.dateInSelectedPeriod;
  var periodLabel = ctx.periodLabel;
  var registrationTelegramLabel = ctx.registrationTelegramLabel;
  var dateTime = ctx.dateTime || function () { return "—"; };

  function hasRegistrationMethod(row, method) {
    return !!(row && row.methods && row.methods.indexOf(method) >= 0);
  }

  function registrationModalTitle(method) {
    if (method === "both") return "Есть Telegram и email";
    return method === "telegram" ? "Только через логин Telegram" : "Только через email";
  }

  function registrationRowsByMethod(method) {
    var rows = Array.isArray(state.registeredAccounts) ? state.registeredAccounts.slice() : [];
    rows = rows.filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    rows = rows.filter(function (r) {
      var hasEmail = hasRegistrationMethod(r, "email");
      var hasTelegram = hasRegistrationMethod(r, "telegram");
      if (method === "both") return hasEmail && hasTelegram;
      if (method === "email") return hasEmail && !hasTelegram;
      if (method === "telegram") return hasTelegram && !hasEmail;
      return hasEmail || hasTelegram;
    });
    return sortRegistrationRows(rows, method);
  }

  function registrationInviteLabel(row) {
    if (!row || !row.invitedBy) return "—";
    return row.invitedByName && row.invitedByName !== row.invitedBy
      ? row.invitedByName + " · " + row.invitedBy
      : row.invitedBy;
  }

  function sortDateValue(value) {
    var ms = Date.parse(value || "");
    return Number.isFinite(ms) ? ms : null;
  }

  function registrationSortValue(row, field, method) {
    if (field === "linkedAt") return sortDateValue(row && row.linkedAt);
    if (field === "email") return String((row && row.email) || "").toLowerCase();
    if (field === "telegram") return String(registrationTelegramLabel(row) || "").toLowerCase();
    if (field === "method") return String((row && row.methods && row.methods.join(",")) || "").toLowerCase();
    return method === "email" || method === "both"
      ? String((row && (row.email || row.name || row.accountId)) || "").toLowerCase()
      : String((registrationTelegramLabel(row) || (row && (row.name || row.accountId)) || "")).toLowerCase();
  }

  function sortRegistrationRows(rows, method) {
    var field = state.registrationModalSortField || "linkedAt";
    var dir = state.registrationModalSortDir === "asc" ? 1 : -1;
    rows.sort(function (a, b) {
      var av = registrationSortValue(a, field, method);
      var bv = registrationSortValue(b, field, method);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return String(a.name || a.email || a.accountId || "").localeCompare(String(b.name || b.email || b.accountId || ""), "ru");
    });
    return rows;
  }

  function sortableTh(scope, field, label, activeField, activeDir) {
    var active = activeField === field;
    var dir = activeDir === "asc" ? "asc" : "desc";
    var mark = active ? (dir === "asc" ? "↑" : "↓") : "↕";
    return "<th aria-sort=\"" + (active ? (dir === "asc" ? "ascending" : "descending") : "none") + "\">" +
      "<button type=\"button\" class=\"player-crm__sort-btn" + (active ? " player-crm__sort-btn--active" : "") + "\" data-crm-sort-scope=\"" + esc(scope) + "\" data-crm-sort-field=\"" + esc(field) + "\" aria-label=\"" + esc("Сортировать по " + label) + "\">" +
        "<span>" + esc(label) + "</span><span class=\"player-crm__sort-mark\" aria-hidden=\"true\">" + mark + "</span>" +
      "</button></th>";
  }

  function renderRegistrationModalList(method) {
    var rows = registrationRowsByMethod(method);
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">По этому способу регистрации пока пусто.</div>";
    var visibleRows = state.showAllRegistrationModal ? rows : rows.slice(0, 15);
    var sortField = state.registrationModalSortField || "linkedAt";
    var sortDir = state.registrationModalSortDir || "desc";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__registrations-table\"><thead><tr>" +
      sortableTh("registration-modal", "linkedAt", "Дата регистрации", sortField, sortDir) + "<th>Аккаунт</th><th>Telegram-логин</th><th>Email</th><th>Имя</th><th>Пригласил</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(dateTime(r.linkedAt)) + "</td>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
          "<td>" + esc(tg || "—") + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
          "<td>" + esc(r.name || "—") + "</td>" +
          "<td>" + esc(registrationInviteLabel(r)) + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>" +
      "<div class=\"player-crm__modal-actions\">" +
        (!state.showAllRegistrationModal && rows.length > 15
          ? "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-show-all-registrations>Показать всех " + esc(intFmt(rows.length)) + "</button>"
          : "") +
        "<button type=\"button\" class=\"player-crm__primary-btn\" data-crm-export-registrations>Выгрузить</button>" +
      "</div></div>";
  }

  function renderRegistrationModal() {
    var modal = document.getElementById("playerCrmRegistrationModal");
    var titleEl = document.getElementById("playerCrmRegistrationModalTitle");
    var subtitleEl = document.getElementById("playerCrmRegistrationModalSubtitle");
    var bodyEl = document.getElementById("playerCrmRegistrationModalBody");
    if (!modal || !bodyEl) return;
    var method = state.registrationModalMethod;
    if (method !== "email" && method !== "telegram" && method !== "both") {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.visitsModalOpen && !state.botModalOpen && !state.pushModalOpen && !state.playerModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = registrationRowsByMethod(method);
    if (titleEl) titleEl.textContent = registrationModalTitle(method);
    if (subtitleEl) subtitleEl.textContent = periodLabel() + " · " + intFmt(rows.length) + " аккаунтов";
    bodyEl.innerHTML = renderRegistrationModalList(method);
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeRegistrationModal() {
    state.registrationModalMethod = "";
    state.showAllRegistrationModal = false;
    if (ctx.renderStats) ctx.renderStats();
    renderRegistrationModal();
  }

  function csvCell(value) {
    var s = value == null ? "" : String(value);
    return "\"" + s.replace(/"/g, "\"\"") + "\"";
  }

  function exportRegistrationModalRows() {
    var method = state.registrationModalMethod;
    if (method !== "email" && method !== "telegram" && method !== "both") return;
    var rows = registrationRowsByMethod(method);
    var lines = [["registeredAt", "accountId", "telegramLogin", "email", "name", "invitedBy", "inviteSource"].map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([
        dateTime(r.linkedAt) === "—" ? "" : dateTime(r.linkedAt),
        r.accountId || r.dtId || "",
        registrationTelegramLabel(r) === "—" ? "" : registrationTelegramLabel(r),
        r.email || "",
        r.name || "",
        registrationInviteLabel(r) === "—" ? "" : registrationInviteLabel(r),
        r.inviteSource || "",
      ].map(csvCell).join(","));
    });
    var blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "crm-registrations-" + method + ".csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  return {
    closeRegistrationModal: closeRegistrationModal,
    exportRegistrationModalRows: exportRegistrationModalRows,
    hasRegistrationMethod: hasRegistrationMethod,
    registrationRowsByMethod: registrationRowsByMethod,
    renderRegistrationModal: renderRegistrationModal,
  };
}

function initPlayerCrmPokerPlusRuntime(ctx) {
  var state = ctx.state;
  var esc = ctx.esc;
  var money = ctx.money;
  var intFmt = ctx.intFmt;
  var dateInSelectedPeriod = ctx.dateInSelectedPeriod;
  var periodLabel = ctx.periodLabel;
  var dateOnly = ctx.dateOnly;
  var dateTime = ctx.dateTime;
  var metric = ctx.metric;
  var noOpenDialogModals = ctx.noOpenDialogModals;
  var renderStats = ctx.renderStats || function () {};

  function filteredPokerPlusAccounts() {
    var rows = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    var min = parseInt(state.pokerPlusLevelMin, 10);
    var max = parseInt(state.pokerPlusLevelMax, 10);
    var from = state.pokerPlusDateFrom || "";
    var to = state.pokerPlusDateTo || "";
    return rows.filter(function (r) {
      var level = Number(r.level) || 0;
      var linked = dateOnly(r.linkedAt);
      if (Number.isFinite(min) && level < min) return false;
      if (Number.isFinite(max) && level > max) return false;
      if (from && (!linked || linked < from)) return false;
      if (to && (!linked || linked > to)) return false;
      return true;
    });
  }

  function sortValue(row, field) {
    if (field === "linkedAt") return pokerPlayerCrmSortDateValue(row && row.linkedAt);
    if (field === "hands") return Number(row && row.hands) || 0;
    if (field === "fee") return Number(row && row.fee) || 0;
    if (field === "level") return Number(row && row.level) || 0;
    return String((row && row.nickname) || (row && row.accountId) || "").toLowerCase();
  }

  function sortRows(rows) {
    var field = state.pokerPlusSortField || "level";
    return pokerPlayerCrmSortRows(rows, function (row) {
      return sortValue(row, field);
    }, state.pokerPlusSortDir || "desc", function (a, b) {
      return String(a.nickname || a.accountId || "").localeCompare(String(b.nickname || b.accountId || ""), "ru");
    });
  }

  function tableHead(compact) {
    var field = state.pokerPlusSortField || "level";
    var dir = state.pokerPlusSortDir || "desc";
    return "<thead><tr>" +
      pokerPlayerCrmSortableTh(esc, "pokerplus", "linkedAt", "Дата", field, dir) +
      (compact ? "" : "<th>Аккаунт</th>") + "<th>Poker21 ID</th><th>Ник</th>" +
      pokerPlayerCrmSortableTh(esc, "pokerplus", "level", "Уровень", field, dir) +
      pokerPlayerCrmSortableTh(esc, "pokerplus", "fee", "Fee", field, dir) +
      pokerPlayerCrmSortableTh(esc, "pokerplus", "hands", "Раздач", field, dir) +
      "<th>Email</th>" +
    "</tr></thead>";
  }

  function tableRow(r, compact) {
    return "<tr>" +
      "<td>" + esc(dateTime(r.linkedAt)) + "</td>" +
      (compact ? "" : "<td>" + esc(r.accountId || "—") + "</td>") +
      "<td>" + esc(r.pokerPlusUserId || "—") + "</td>" +
      "<td>" + esc(r.nickname || "—") + "</td>" +
      "<td>" + esc(r.level || "—") + "</td>" +
      "<td>" + esc(money(r.fee || 0)) + "</td>" +
      "<td>" + esc(intFmt(r.hands || 0)) + "</td>" +
      "<td>" + esc(r.email || "—") + "</td>" +
    "</tr>";
  }

  function renderPokerPlusAccounts() {
    var el = document.getElementById("playerCrmPokerPlusAccounts");
    if (!el) return;
    var all = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    var rows = filteredPokerPlusAccounts();
    if (!all.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Подтверждённых аккаунтов Poker21 пока нет.</div>";
      return;
    }
    var avgLevel = rows.length ? Math.round(rows.reduce(function (sum, r) { return sum + (Number(r.level) || 0); }, 0) / rows.length) : 0;
    var summary = "<div class=\"player-crm__metrics player-crm__metrics--registrations\">" +
      metric("Показано", intFmt(rows.length)) + metric("Всего", intFmt(all.length)) + metric("Средний уровень", avgLevel || "—") + "</div>";
    if (!rows.length) {
      el.innerHTML = summary + "<div class=\"player-crm__timeline-item\">По этим фильтрам пусто.</div>";
      return;
    }
    el.innerHTML = summary + "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__pokerplus-table\">" +
      tableHead(false) + "<tbody>" + sortRows(rows).map(function (row) { return tableRow(row, false); }).join("") + "</tbody></table></div>";
  }

  function renderPokerPlusModalList() {
    var rows = (Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : []).filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">Привязанных аккаунтов Poker21 пока нет.</div>";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__pokerplus-table player-crm__pokerplus-table--modal\">" +
      tableHead(true) + "<tbody>" + sortRows(rows).map(function (row) { return tableRow(row, true); }).join("") + "</tbody></table></div></div>";
  }

  function renderPokerPlusModal() {
    var modal = document.getElementById("playerCrmPokerPlusModal");
    var subtitleEl = document.getElementById("playerCrmPokerPlusModalSubtitle");
    var bodyEl = document.getElementById("playerCrmPokerPlusModalBody");
    if (!modal || !bodyEl) return;
    if (!state.pokerPlusModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = (Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : []).filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    if (subtitleEl) subtitleEl.textContent = periodLabel() + " · " + intFmt(rows.length) + " аккаунтов";
    bodyEl.innerHTML = renderPokerPlusModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closePokerPlusModal() {
    state.pokerPlusModalOpen = false;
    renderStats();
    renderPokerPlusModal();
  }

  return {
    closePokerPlusModal: closePokerPlusModal,
    filteredPokerPlusAccounts: filteredPokerPlusAccounts,
    renderPokerPlusAccounts: renderPokerPlusAccounts,
    renderPokerPlusModal: renderPokerPlusModal,
  };
}

function initPlayerCrmVisitsRuntime(ctx) {
  var state = ctx.state;
  var esc = ctx.esc;
  var intFmt = ctx.intFmt;
  var dateTime = ctx.dateTime;
  var dateInSelectedPeriod = ctx.dateInSelectedPeriod;
  var periodLabel = ctx.periodLabel;
  var noOpenDialogModals = ctx.noOpenDialogModals;
  var sectionLabels = {
    home: "Главная",
    "daily-poker": "Раздача дня",
    "daily-prediction": "Прогноз дня",
    "private-cash": "Приватный кеш",
    "sng-champions": "СНГ",
    "club-charter": "Устав клуба",
    "club-choice-vote": "Голосование клуба",
    "vpn-proxy": "VPN и прокси",
    "vpn-proxy-proxy": "Прокси",
    gazette: "Газета",
    chat: "Чат",
    download: "Скачать",
    "download-poker21": "Скачать Poker21",
    "download-xpoker": "Скачать Xpoker",
    "download-pppoker": "Скачать PPPoker",
    "download-supremapoker": "Скачать Supremapoker",
    cashout: "Кэшаут",
    transfers: "Переводы",
    profile: "Профиль",
    "spring-rating": "Весенний рейтинг",
    "spring-rating-league-1": "Весенний рейтинг · Лига 1",
    "spring-rating-league-2": "Весенний рейтинг · Лига 2",
    "summer-rating": "Летний рейтинг",
    "summer-rating-league-1": "Летний рейтинг · Лига 1",
    "summer-rating-league-2": "Летний рейтинг · Лига 2",
    "winter-rating": "Зимний рейтинг",
    "hall-of-fame": "Зал славы",
    "hall-of-fame-legends": "Зал славы · Легенды",
    "hall-of-fame-cups": "Зал славы · Кубки",
    "hall-of-fame-photos": "Зал славы · Фото",
    "hall-of-fame-shame": "Зал славы · Доска позора",
    raffles: "Розыгрыши",
    schedule: "Расписание",
    streams: "Стримы",
    "streams-delayed": "Стримы · отложенные",
    "video-lessons": "Видео-уроки",
    "video-lessons-reviews": "Отзывы учеников",
    "learn-play-hub": "Научиться играть",
    "poker-tasks": "Покерные задачи",
    "club-tasks": "Задания клуба",
    equilator: "Эквилятор",
    "bonus-game": "Найти Пиханину",
    "plasterer-game": "Переедь Штукатура",
    "cooler-game": "Кулер",
    "player-crm": "CRM",
  };

  function visitUniqueRows() {
    var rows = Array.isArray(state.players) ? state.players.slice() : [];
    return rows.filter(function (p) {
      return dateInSelectedPeriod((p && (p.firstSeenAt || p.registeredAt)) || "");
    });
  }

  function sortDateValue(value) {
    var ms = Date.parse(value || "");
    return Number.isFinite(ms) ? ms : null;
  }

  function visitSortValue(row, field) {
    if (field === "firstSeenAt") return sortDateValue(row && (row.firstSeenAt || row.registeredAt));
    if (field === "visits") return Number(row && row.totals && row.totals.visits) || 0;
    return String((row && (row.name || row.handle || row.accountId || row.id)) || "").toLowerCase();
  }

  function sortVisitRows(rows) {
    var field = state.visitsModalSortField || "firstSeenAt";
    var dir = state.visitsModalSortDir === "asc" ? 1 : -1;
    return rows.slice().sort(function (a, b) {
      var av = visitSortValue(a, field);
      var bv = visitSortValue(b, field);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return String(a.name || a.handle || a.accountId || a.id || "").localeCompare(String(b.name || b.handle || b.accountId || b.id || ""), "ru");
    });
  }

  function sortableTh(scope, field, label, activeField, activeDir) {
    var active = activeField === field;
    var dir = activeDir === "asc" ? "asc" : "desc";
    var mark = active ? (dir === "asc" ? "↑" : "↓") : "↕";
    return "<th aria-sort=\"" + (active ? (dir === "asc" ? "ascending" : "descending") : "none") + "\">" +
      "<button type=\"button\" class=\"player-crm__sort-btn" + (active ? " player-crm__sort-btn--active" : "") + "\" data-crm-sort-scope=\"" + esc(scope) + "\" data-crm-sort-field=\"" + esc(field) + "\" aria-label=\"" + esc("Сортировать по " + label) + "\">" +
        "<span>" + esc(label) + "</span><span class=\"player-crm__sort-mark\" aria-hidden=\"true\">" + mark + "</span>" +
      "</button></th>";
  }

  function renderVisitsModalList() {
    if (state.visitsModalMode === "sections") return renderVisitSectionsModalList();
    var rows = sortVisitRows(visitUniqueRows());
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">Уникальных пользователей за выбранный период пока нет.</div>";
    var sortField = state.visitsModalSortField || "firstSeenAt";
    var sortDir = state.visitsModalSortDir || "desc";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__visits-table\"><thead><tr>" +
      sortableTh("visits-modal", "firstSeenAt", "Первый визит", sortField, sortDir) + "<th>Игрок</th><th>Telegram</th><th>ID</th><th>Посещений</th><th>Источник</th>" +
      "</tr></thead><tbody>" + rows.map(function (p) {
        return "<tr>" +
          "<td>" + esc(dateTime(p.firstSeenAt || p.registeredAt)) + "</td>" +
          "<td><button type=\"button\" class=\"player-crm__table-link\" data-crm-open-player=\"" + esc(p.id || p.accountId || "") + "\">" + esc(p.name || "—") + "</button></td>" +
          "<td>" + esc(p.handle || "—") + "</td>" +
          "<td>" + esc(p.accountId || p.dtId || p.id || "—") + "</td>" +
          "<td>" + esc(intFmt(p.totals && p.totals.visits)) + "</td>" +
          "<td>" + esc(p.source || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function visitSectionRows() {
    var summary = state.statsSummary && state.statsSummary.visits ? state.statsSummary.visits : {};
    var rows = Array.isArray(summary.sections) ? summary.sections.slice() : [];
    rows.sort(function (a, b) {
      return (Number(b.count) || 0) - (Number(a.count) || 0) || String(a.section || "").localeCompare(String(b.section || ""), "ru");
    });
    return rows;
  }

  function sectionLabel(key) {
    key = String(key || "").trim();
    if (key === "__all_visits") return "Все разделы";
    return sectionLabels[key] || key || "—";
  }

  function renderVisitSectionsModalList() {
    var rows = visitSectionRows();
    if (!rows.length) return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__timeline-item\">За выбранный период просмотров по разделам пока нет.</div></div>";
    var total = rows.reduce(function (sum, row) { return sum + (Number(row.count) || 0); }, 0);
    var incomplete = rows.some(function (row) { return row && row.incompleteSections; });
    var exact = rows.some(function (row) { return row && row.exact; });
    return "<div class=\"player-crm__modal-content\">" +
      (incomplete
        ? "<div class=\"player-crm__notice player-crm__notice--warning\">Детальная разбивка по разделам была неполной, поэтому показан общий счётчик визитов за период.</div>"
        : "") +
      "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__visit-sections-table\"><thead><tr>" +
      (exact
        ? "<th>Раздел</th><th>Гости</th><th>Зарегистрированные</th><th>Уникальные</th><th>Открытия</th>"
        : "<th>Раздел</th><th>Просмотров</th><th>Доля</th>") +
      "</tr></thead><tbody>" + rows.map(function (row) {
        var count = Number(row.count) || 0;
        var pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return "<tr>" +
          "<td>" + esc(sectionLabel(row.section)) + "</td>" +
          (exact
            ? "<td>" + esc(intFmt(row.guestInstallations)) + "</td><td>" + esc(intFmt(row.registeredVisitors)) + "</td><td>" + esc(intFmt(row.uniqueVisitors)) + "</td><td>" + esc(intFmt(count)) + "</td>"
            : "<td>" + esc(intFmt(count)) + "</td><td>" + esc(pct) + "%</td>") +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function renderVisitsModal() {
    var modal = document.getElementById("playerCrmVisitsModal");
    var subtitleEl = document.getElementById("playerCrmVisitsModalSubtitle");
    var bodyEl = document.getElementById("playerCrmVisitsModalBody");
    if (!modal || !bodyEl) return;
    if (!state.visitsModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = state.visitsModalMode === "sections" ? visitSectionRows() : visitUniqueRows();
    var titleEl = document.getElementById("playerCrmVisitsModalTitle");
    if (titleEl) titleEl.textContent = state.visitsModalMode === "sections" ? "Посещения по разделам" : "Уникальные пользователи";
    if (subtitleEl) subtitleEl.textContent = periodLabel() + " · " + intFmt(rows.length) + (state.visitsModalMode === "sections" ? " разделов" : " пользователей");
    bodyEl.innerHTML = renderVisitsModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeVisitsModal() {
    state.visitsModalOpen = false;
    state.visitsModalMode = "users";
    if (ctx.renderStats) ctx.renderStats();
    renderVisitsModal();
  }

  return {
    closeVisitsModal: closeVisitsModal,
    renderVisitsModal: renderVisitsModal,
    visitUniqueRows: visitUniqueRows,
  };
}
