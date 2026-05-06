function initPlayerCrmRegistrationsRuntime(ctx) {
  var state = ctx.state;
  var esc = ctx.esc;
  var intFmt = ctx.intFmt;
  var dateInSelectedPeriod = ctx.dateInSelectedPeriod;
  var periodLabel = ctx.periodLabel;
  var registrationTelegramLabel = ctx.registrationTelegramLabel;

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
      "<th>Аккаунт</th><th>Telegram-логин</th><th>Email</th><th>Имя</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
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
      if (document.body && !state.chatDialogManager && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.botModalOpen && !state.pushModalOpen && !state.playerModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
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
    var lines = [["accountId", "telegramLogin", "email", "name"].map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([
        r.accountId || r.dtId || "",
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
