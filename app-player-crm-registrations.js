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
    rows.sort(function (a, b) {
      function val(row) {
        return method === "email" || method === "both"
          ? row.email || row.name || row.accountId || ""
          : registrationTelegramLabel(row) || row.name || row.accountId || "";
      }
      return String(val(a)).toLowerCase().localeCompare(String(val(b)).toLowerCase(), "ru");
    });
    return rows;
  }

  function renderRegistrationModalList(method) {
    var rows = registrationRowsByMethod(method);
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">По этому способу регистрации пока пусто.</div>";
    var visibleRows = state.showAllRegistrationModal ? rows : rows.slice(0, 15);
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__registrations-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Дата регистрации</th><th>Telegram-логин</th><th>Email</th><th>Имя</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
          "<td>" + esc(dateTime(r.linkedAt)) + "</td>" +
          "<td>" + esc(tg || "—") + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
          "<td>" + esc(r.name || "—") + "</td>" +
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
    var lines = [["accountId", "registeredAt", "telegramLogin", "email", "name"].map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([
        r.accountId || r.dtId || "",
        dateTime(r.linkedAt) === "—" ? "" : dateTime(r.linkedAt),
        registrationTelegramLabel(r) === "—" ? "" : registrationTelegramLabel(r),
        r.email || "",
        r.name || "",
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
    chat: "Чат",
    download: "Скачать",
    cashout: "Кэшаут",
    profile: "Профиль",
    "spring-rating": "Весенний рейтинг",
    "winter-rating": "Зимний рейтинг",
    raffles: "Розыгрыши",
    schedule: "Расписание",
    streams: "Стримы",
    "video-lessons": "Видео-уроки",
    "learn-play-hub": "Научиться играть",
    equilator: "Эквилятор",
    "bonus-game": "Найти Пиханину",
    "plasterer-game": "Переедь Штукатура",
    "player-crm": "CRM",
  };

  function visitUniqueRows() {
    var rows = Array.isArray(state.players) ? state.players.slice() : [];
    return rows.filter(function (p) {
      return dateInSelectedPeriod((p && (p.firstSeenAt || p.registeredAt)) || "");
    }).sort(function (a, b) {
      return String(a.name || a.handle || a.accountId || a.id || "").localeCompare(String(b.name || b.handle || b.accountId || b.id || ""), "ru");
    });
  }

  function renderVisitsModalList() {
    if (state.visitsModalMode === "sections") return renderVisitSectionsModalList();
    var rows = visitUniqueRows();
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">Уникальных пользователей за выбранный период пока нет.</div>";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__visits-table\"><thead><tr>" +
      "<th>Игрок</th><th>Telegram</th><th>ID</th><th>Посещений</th><th>Первый визит</th><th>Источник</th>" +
      "</tr></thead><tbody>" + rows.map(function (p) {
        return "<tr>" +
          "<td><button type=\"button\" class=\"player-crm__table-link\" data-crm-open-player=\"" + esc(p.id || p.accountId || "") + "\">" + esc(p.name || "—") + "</button></td>" +
          "<td>" + esc(p.handle || "—") + "</td>" +
          "<td>" + esc(p.accountId || p.dtId || p.id || "—") + "</td>" +
          "<td>" + esc(intFmt(p.totals && p.totals.visits)) + "</td>" +
          "<td>" + esc(dateTime(p.firstSeenAt || p.registeredAt)) + "</td>" +
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
    return sectionLabels[key] || key || "—";
  }

  function renderVisitSectionsModalList() {
    var rows = visitSectionRows();
    if (!rows.length) return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__timeline-item\">За выбранный период просмотров по разделам пока нет.</div></div>";
    var total = rows.reduce(function (sum, row) { return sum + (Number(row.count) || 0); }, 0);
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__visit-sections-table\"><thead><tr>" +
      "<th>Раздел</th><th>Просмотров</th><th>Доля</th>" +
      "</tr></thead><tbody>" + rows.map(function (row) {
        var count = Number(row.count) || 0;
        var pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return "<tr>" +
          "<td>" + esc(sectionLabel(row.section)) + "</td>" +
          "<td>" + esc(intFmt(count)) + "</td>" +
          "<td>" + esc(pct) + "%</td>" +
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
