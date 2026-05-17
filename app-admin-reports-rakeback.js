(function () {
  "use strict";

  var ROOM_LABELS = {
    P21: "Покер21",
    X: "Хпокер",
    Supr: "Супрема",
    PP: "PPpoker",
  };

  function normalizeRoom(room) {
    room = String(room || "P21").trim();
    if (room === "Poker21" || room === "Покер21") return "P21";
    if (room === "XPoker" || room === "X-poker" || room === "Хпокер") return "X";
    if (room === "Suprema" || room === "Супрема") return "Supr";
    if (room === "PPPoker" || room === "PPpoker") return "PP";
    return ROOM_LABELS[room] ? room : "P21";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function createRoomOptions(activeRoom) {
    return Object.keys(ROOM_LABELS).map(function (room) {
      return '<option value="' + escapeHtml(room) + '"' + (room === activeRoom ? " selected" : "") + ">" +
        escapeHtml(ROOM_LABELS[room]) +
        "</option>";
    }).join("");
  }

  function createTemplateSeparator() {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
    tr.setAttribute("data-rakeback-generated", "1");
    td.colSpan = 7;
    td.textContent = "Пустые записи недели";
    tr.appendChild(td);
    return tr;
  }

  function createArchiveEmptyRow() {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
    tr.setAttribute("data-rakeback-generated", "1");
    td.colSpan = 7;
    td.textContent = "Архив пока пуст";
    tr.appendChild(td);
    return tr;
  }

  function createTemplateRow(room, playerId, index) {
    var tr = document.createElement("tr");
    tr.className = "admin-report-rakeback-row admin-report-rakeback-row--saved";
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-kind", "base");
    tr.setAttribute("data-rakeback-carry-forward", "1");
    tr.setAttribute("data-rakeback-saved", "1");
    tr.setAttribute("data-rakeback-room-current", room);
    tr.setAttribute("data-rakeback-player-id-current", String(playerId || "").toLowerCase());
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room disabled>' + createRoomOptions(room) + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки">' + String(index + 1) + '</span><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" readonly value="' + escapeHtml(playerId) + '" /></td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" readonly /></td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" readonly /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%" disabled /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку" hidden>✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись" hidden>+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку" hidden>×</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--color" data-rakeback-color-toggle title="Выделить цветом" aria-label="Выделить цветом" hidden><span class="admin-report-rakeback-color-dot" aria-hidden="true"></span></button>' +
      "</td>";
    return tr;
  }

  function init(config) {
    config = config || {};
    var modal = config.modal || document.getElementById("adminReportModal");
    var body = config.body || document.getElementById("adminReportRakebackTableBody");
    var searchInput = config.searchInput || document.getElementById("adminReportRakebackSearch");
    var sortSelect = config.sortSelect || document.getElementById("adminReportRakebackSort");
    var refreshBtn = config.refreshBtn || document.getElementById("adminReportRakebackRefreshBtn");
    var addBtn = config.addBtn || document.getElementById("adminReportRakebackAddBtn");
    var archiveBtn = config.archiveBtn || document.getElementById("adminReportRakebackArchiveBtn");
    var roomTabs = config.roomTabs || (modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : []);
    var totalEl = config.totalEl || document.getElementById("adminReportRakebackTotal");
    var roomTotalLabelEl = config.roomTotalLabelEl || document.getElementById("adminReportRakebackRoomTotalLabel");
    var roomTotalEl = config.roomTotalEl || document.getElementById("adminReportRakebackRoomTotal");
    var statusEl = config.statusEl || document.getElementById("adminReportRakebackStatus");
    var summaryEl = config.summaryEl || (modal ? modal.querySelector(".admin-report-rakeback-summary") : null);
    var templates = config.templates || {};
    var activeRoom = normalizeRoom(config.activeRoom || "P21");
    var archiveMode = false;
    var bound = false;

    function getTemplateIds(room) {
      var ids = templates[normalizeRoom(room)] || [];
      var seen = {};
      return (Array.isArray(ids) ? ids : []).map(function (id) {
        return String(id || "").trim();
      }).filter(function (id) {
        if (!id || seen[id]) return false;
        seen[id] = true;
        return true;
      });
    }

    function getSearchQuery() {
      return searchInput && searchInput.value ? String(searchInput.value).trim().toLowerCase() : "";
    }

    function syncRoomTabs() {
      Array.prototype.slice.call(roomTabs || []).forEach(function (tab) {
        var selected = normalizeRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }

    function syncControls() {
      [refreshBtn, addBtn].forEach(function (btn) {
        if (!btn) return;
        btn.hidden = true;
        btn.disabled = true;
        btn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      });
      if (archiveBtn) {
        archiveBtn.hidden = false;
        archiveBtn.disabled = false;
        archiveBtn.classList.toggle("admin-report-rakeback-archive-tab--active", archiveMode);
        archiveBtn.setAttribute("aria-pressed", archiveMode ? "true" : "false");
        archiveBtn.setAttribute("title", archiveMode ? "Показать текущую неделю" : "Архив");
        archiveBtn.setAttribute("aria-label", archiveMode ? "Показать текущую неделю" : "Архив");
      }
      if (sortSelect) sortSelect.disabled = false;
      if (summaryEl) summaryEl.hidden = false;
      if (statusEl) {
        statusEl.hidden = !archiveMode;
        statusEl.textContent = archiveMode ? "Архив пока пуст" : "";
      }
      if (roomTotalLabelEl) roomTotalLabelEl.textContent = archiveMode ? "Итого архив" : "Итого " + (ROOM_LABELS[activeRoom] || activeRoom);
      if (roomTotalEl) roomTotalEl.textContent = "0 / 0";
      if (totalEl) totalEl.textContent = "0 / 0";
    }

    function render() {
      if (!body) return 0;
      activeRoom = normalizeRoom(activeRoom);
      if (archiveMode) {
        var archiveFragment = document.createDocumentFragment();
        archiveFragment.appendChild(createArchiveEmptyRow());
        body.replaceChildren(archiveFragment);
        syncRoomTabs();
        syncControls();
        return 0;
      }
      var query = getSearchQuery();
      var ids = getTemplateIds(activeRoom).filter(function (id) {
        return !query || id.toLowerCase().indexOf(query) !== -1;
      });
      var fragment = document.createDocumentFragment();
      if (ids.length) fragment.appendChild(createTemplateSeparator());
      ids.forEach(function (id, index) {
        fragment.appendChild(createTemplateRow(activeRoom, id, index));
      });
      body.replaceChildren(fragment);
      syncRoomTabs();
      syncControls();
      return ids.length;
    }

    function bind() {
      if (bound) return;
      bound = true;
      Array.prototype.slice.call(roomTabs || []).forEach(function (tab) {
        tab.addEventListener("click", function () {
          activeRoom = normalizeRoom(tab.getAttribute("data-rakeback-room-tab"));
          archiveMode = false;
          render();
        });
      });
      if (searchInput) {
        searchInput.addEventListener("input", render);
        searchInput.addEventListener("keydown", function (event) {
          if (event.key !== "Escape") return;
          searchInput.value = "";
          render();
        });
      }
      if (sortSelect) sortSelect.addEventListener("change", render);
    }

    bind();
    syncControls();

    function setArchiveMode(active) {
      archiveMode = !!active;
      return render();
    }

    return {
      bind: bind,
      close: function () {},
      collectRows: function () { return []; },
      fillTable: render,
      getActiveRoom: function () { return activeRoom; },
      getUnaccountedRows: function () { return []; },
      isArchiveMode: function () { return archiveMode; },
      open: render,
      render: render,
      setArchiveMode: setArchiveMode,
      setRoom: function (room) {
        activeRoom = normalizeRoom(room);
        return render();
      },
      syncAccessControls: syncControls,
      syncTable: render,
    };
  }

  window.AdminReportRakebackTab = {
    init: init,
  };
})();
