(function () {
  "use strict";

  var ROOM_LABELS = {
    P21: "Покер21",
    X: "Хпокер",
    Supr: "Супрема",
    PP: "PPpoker",
  };
  var RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY = "poker_admin_report_rakeback_templates_open";

  function readRakebackTemplateSpoilerOpen() {
    return false;
  }

  function saveRakebackTemplateSpoilerOpen(open) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.setItem(RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY, open ? "1" : "0");
    } catch (e) {}
  }

  function normalizeTemplateMap(source) {
    source = source || {};
    return {
      P21: Array.isArray(source.P21) ? source.P21 : [],
      X: Array.isArray(source.X) ? source.X : [],
      Supr: Array.isArray(source.Supr) ? source.Supr : [],
      PP: Array.isArray(source.PP) ? source.PP : [],
    };
  }

  function hasAnyTemplateIds(source) {
    var templates = normalizeTemplateMap(source);
    return !!(templates.P21.length || templates.X.length || templates.Supr.length || templates.PP.length);
  }

  function readWindowTemplateMap() {
    var staticData = window.AdminReportRakebackStaticData || {};
    return normalizeTemplateMap(staticData.templates || {});
  }

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

  function parseNumber(value) {
    var n = typeof value === "number" ? value : parseFloat(String(value == null ? "" : value).replace(/\s+/g, "").replace(",", "."));
    return isFinite(n) ? n : 0;
  }

  function formatInputNumber(value) {
    var n = parseNumber(value);
    if (!n) return "";
    return String(Math.round(n * 100) / 100);
  }

  function getRakebackRoomMultiplier(room) {
    room = normalizeRoom(room);
    if (room === "X") return 100;
    if (room === "Supr" || room === "PP") return 115;
    return 1;
  }

  function getReportAmount(room, roomAmount) {
    return Math.round(parseNumber(roomAmount)) * getRakebackRoomMultiplier(room);
  }

  function hasSharedDraftRowData(row) {
    if (!row) return false;
    if (String(row.playerId || row.id || "").trim()) return true;
    if (parseNumber(row.rake) !== 0) return true;
    if (parseNumber(row.percent) !== 0) return true;
    if (parseNumber(row.amount) !== 0 || parseNumber(row.roomAmount) !== 0) return true;
    return !!(row.discount15 || row.subtract15);
  }

  function getApiBaseSafe() {
    var fn = window && window["getApiBase"];
    return typeof fn === "function" ? String(fn() || "").replace(/\/$/, "") : "";
  }

  function hasApiCredentialSafe() {
    var fn = window && window["pokerApiHasCredential"];
    return typeof fn === "function" ? !!fn() : false;
  }

  function buildAuthBody(payload) {
    var fn = window && window["pokerGuestOrAuthedPostBody"];
    return typeof fn === "function" ? fn(payload || {}) : (payload || {});
  }

  function getAuthQuery() {
    var fn = window && window["pokerRafflesApiQueryLeading"];
    return typeof fn === "function" ? fn() : "?initData=";
  }

  function requestJson(url, options) {
    var winFetch = window && window["fetch"];
    var requestFetch = typeof winFetch === "function" ? winFetch.bind(window) : null;
    if (!requestFetch) return Promise.reject(new Error("fetch unavailable"));
    return requestFetch(url, options || {}).then(function (response) {
      return response.json();
    });
  }

  function createRoomOptions(activeRoom) {
    return Object.keys(ROOM_LABELS).map(function (room) {
      return '<option value="' + escapeHtml(room) + '"' + (room === activeRoom ? " selected" : "") + ">" +
        escapeHtml(ROOM_LABELS[room]) +
        "</option>";
    }).join("");
  }

  function createTemplateSeparator(open) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var btn = document.createElement("button");
    var span = document.createElement("span");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
    tr.setAttribute("data-rakeback-generated", "1");
    td.colSpan = 7;
    btn.type = "button";
    btn.className = "admin-report-rakeback-template-toggle";
    btn.setAttribute("data-rakeback-template-toggle", "");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Скрыть пустые записи недели" : "Показать пустые записи недели");
    btn.title = open ? "Скрыть шаблоны" : "Показать шаблоны";
    span.textContent = "Пустые записи недели";
    btn.appendChild(span);
    td.appendChild(btn);
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

  function syncSharedRowAmount(row) {
    if (!row) return 0;
    var roomSelect = row.querySelector("[data-rakeback-room]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    var amountEl = row.querySelector("[data-rakeback-amount]");
    var roomAmount = parseNumber(rakeInput ? rakeInput.value : "") * parseNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) roomAmount *= 0.85;
    roomAmount = Math.round(roomAmount * 100) / 100;
    row.setAttribute("data-rakeback-room-amount", String(roomAmount || 0));
    row.setAttribute("data-rakeback-amount-value", String(getReportAmount(roomSelect && roomSelect.value ? roomSelect.value : "P21", roomAmount)));
    if (amountEl) amountEl.textContent = roomAmount ? String(roomAmount) : "";
    return roomAmount;
  }

  function updateSharedRowActions(row, busy) {
    if (!row) return;
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var removeBtn = row.querySelector("[data-rakeback-remove]");
    if (saveBtn) {
      saveBtn.hidden = saved;
      saveBtn.disabled = !!busy;
    }
    if (editBtn) {
      editBtn.hidden = !saved;
      editBtn.disabled = !!busy;
    }
    if (removeBtn) removeBtn.disabled = !!busy;
  }

  function setSharedRowSaved(row, saved, busy) {
    if (!row) return;
    saved = saved !== false;
    row.classList.toggle("admin-report-rakeback-row--saved", saved);
    row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    row.querySelectorAll("input").forEach(function (input) {
      if (input.hasAttribute("data-rakeback-discount15")) {
        input.disabled = saved || !!busy;
        return;
      }
      input.readOnly = saved;
      input.disabled = !!busy;
    });
    row.querySelectorAll("select").forEach(function (select) {
      select.disabled = saved || !!busy;
    });
    updateSharedRowActions(row, busy);
  }

  function createSharedRow(data, index) {
    data = data || {};
    var room = normalizeRoom(data.room || "P21");
    var groupId = String(data.groupId || ("shell_" + Date.now() + "_" + Math.random().toString(16).slice(2))).trim();
    var saved = data.saved !== false;
    var persisted = data.persisted === true || saved;
    var tr = document.createElement("tr");
    tr.className = "admin-report-rakeback-row" + (saved ? " admin-report-rakeback-row--saved" : "");
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-shared-row", "1");
    tr.setAttribute("data-rakeback-kind", "base");
    tr.setAttribute("data-rakeback-group", groupId);
    tr.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    tr.setAttribute("data-rakeback-persisted", persisted ? "1" : "0");
    tr.setAttribute("data-rakeback-created-at", String(data.createdAt || Date.now()));
    tr.setAttribute("data-rakeback-standard-at", String(data.standardAt || data.createdAt || Date.now()));
    tr.setAttribute("data-rakeback-entry-added-at", String(data.entryAddedAt || data.createdAt || Date.now()));
    tr.setAttribute("data-rakeback-owner", data.ownerId || data.authorId || "");
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + createRoomOptions(room) + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки">' + String(index + 1) + '</span><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" value="' + escapeHtml(data.playerId || data.id || "") + '" /></td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.rake)) + '" /></td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.percent)) + '" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%"' + (data.discount15 || data.subtract15 ? " checked" : "") + ' /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку">✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку">×</button>' +
      "</td>";
    syncSharedRowAmount(tr);
    setSharedRowSaved(tr, saved, false);
    return tr;
  }

  function createTemplateRow(room, playerId, index, collapsed) {
    var tr = document.createElement("tr");
    tr.className = "admin-report-rakeback-row admin-report-rakeback-row--saved";
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-template-row", "1");
    tr.setAttribute("data-rakeback-kind", "base");
    tr.setAttribute("data-rakeback-carry-forward", "1");
    tr.setAttribute("data-rakeback-saved", "1");
    tr.setAttribute("data-rakeback-room-current", room);
    tr.setAttribute("data-rakeback-player-id-current", String(playerId || "").toLowerCase());
    if (collapsed) tr.setAttribute("data-rakeback-template-collapsed", "1");
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
    var templates = normalizeTemplateMap(config.templates || {});
    var templatesLoaded = config.templatesLoaded === true || hasAnyTemplateIds(templates);
    var templatesMayExist = config.templatesMayExist !== false || templatesLoaded;
    var templatesLoading = false;
    var templatesLoadPromise = null;
    var templatesLoadStatusTimer = null;
    var templateStreamSeq = 0;
    var activeRoom = normalizeRoom(config.activeRoom || "P21");
    var templateRowsOpen = config.templatesOpen === true || readRakebackTemplateSpoilerOpen();
    var archiveMode = false;
    var bound = false;
    var sharedRows = [];
    var sharedUpdatedAt = "";
    var saving = false;
    var loading = false;

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

    function updateTemplates(nextTemplates) {
      templates = normalizeTemplateMap(nextTemplates || readWindowTemplateMap());
      templatesLoaded = true;
      templatesMayExist = templatesMayExist || hasAnyTemplateIds(templates);
      return templates;
    }

    function loadTemplatesIfNeeded(options) {
      options = options || {};
      if (templatesLoaded) return Promise.resolve(true);
      if (templatesLoadPromise) return templatesLoadPromise;
      var loader = typeof config.loadTemplates === "function" ? config.loadTemplates : null;
      if (!loader) {
        updateTemplates(readWindowTemplateMap());
        return Promise.resolve(true);
      }
      templatesLoading = true;
      if (options.showStatus) startTemplateLoadStatusTicker();
      syncControls();
      templatesLoadPromise = Promise.resolve()
        .then(function () {
          return loader();
        })
        .then(function (data) {
          updateTemplates(data && data.templates ? data.templates : data);
          return true;
        })
        .catch(function () {
          if (options.showStatus) setStatus("Не удалось загрузить шаблоны");
          templateRowsOpen = false;
          saveRakebackTemplateSpoilerOpen(false);
          return false;
        })
        .then(function (result) {
          templatesLoading = false;
          templatesLoadPromise = null;
          stopTemplateLoadStatusTicker();
          syncControls();
          return result;
        });
      return templatesLoadPromise;
    }

    function startTemplateLoadStatusTicker() {
      var startedAt = Date.now();
      stopTemplateLoadStatusTicker();
      function tick() {
        if (!templatesLoading || templatesLoaded) return;
        var elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setStatus(elapsed > 0 ? "Загружаю шаблоны… " + elapsed + " сек" : "Загружаю шаблоны…", true);
        templatesLoadStatusTimer = setTimeout(tick, 1000);
      }
      tick();
    }

    function stopTemplateLoadStatusTicker() {
      if (!templatesLoadStatusTimer) return;
      clearTimeout(templatesLoadStatusTimer);
      templatesLoadStatusTimer = null;
    }

    function scheduleTemplateStreamStep(fn) {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(fn);
      } else {
        setTimeout(fn, 16);
      }
    }

    function streamTemplateRows(ids, startIndex, seq) {
      ids = Array.isArray(ids) ? ids : [];
      var total = ids.length;
      var index = 0;
      var batchSize = total > 240 ? 48 : 32;
      if (!body || seq !== templateStreamSeq || !templateRowsOpen || archiveMode) return;
      if (!total) {
        setStatus("Шаблонов нет");
        return;
      }
      setStatus("Загружаю шаблоны… 0 / " + total, true);
      function step() {
        if (!body || seq !== templateStreamSeq || !templateRowsOpen || archiveMode) return;
        var fragment = document.createDocumentFragment();
        var limit = Math.min(index + batchSize, total);
        while (index < limit) {
          var id = ids[index];
          if (id) fragment.appendChild(createTemplateRow(activeRoom, id, startIndex + index, false));
          index += 1;
        }
        if (fragment.childNodes.length) body.appendChild(fragment);
        setStatus("Загружаю шаблоны… " + index + " / " + total, true);
        if (index < total) {
          scheduleTemplateStreamStep(step);
          return;
        }
        setStatus("Шаблоны загружены: " + total);
      }
      scheduleTemplateStreamStep(step);
    }

    function getSearchQuery() {
      return searchInput && searchInput.value ? String(searchInput.value).trim().toLowerCase() : "";
    }

    function getSortMode() {
      return sortSelect && sortSelect.value ? String(sortSelect.value || "created") : "created";
    }

    function rowTime(row) {
      var raw = row && (row.entryAddedAt || row.standardAt || row.createdAt || row.addedAt || row.created);
      var n = typeof raw === "number" ? raw : Number(raw);
      if (isFinite(n) && n > 0) return n;
      var parsed = raw ? Date.parse(String(raw)) : NaN;
      return isFinite(parsed) ? parsed : 0;
    }

    function rowAmount(row) {
      if (!row) return 0;
      if (row.roomAmount != null && row.roomAmount !== "") return parseNumber(row.roomAmount);
      if (row.amount != null && row.amount !== "") return parseNumber(row.amount);
      return parseNumber(row.rake) * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
    }

    function sortRows(rows) {
      var mode = getSortMode();
      return rows.slice().sort(function (a, b) {
        if (mode === "rake") return parseNumber(b.rake) - parseNumber(a.rake) || rowTime(b) - rowTime(a);
        if (mode === "percent") return parseNumber(b.percent) - parseNumber(a.percent) || rowTime(b) - rowTime(a);
        if (mode === "created_percent") {
          return rowTime(b) - rowTime(a) || parseNumber(b.percent) - parseNumber(a.percent) || parseNumber(b.rake) - parseNumber(a.rake);
        }
        if (mode === "standard") return parseNumber(a.standardAt || a.createdAt) - parseNumber(b.standardAt || b.createdAt) || rowTime(b) - rowTime(a);
        if (mode === "color") return rowAmount(b) - rowAmount(a) || rowTime(b) - rowTime(a);
        return rowTime(b) - rowTime(a);
      });
    }

    function getVisibleSharedRows() {
      var query = getSearchQuery();
      return sortRows(sharedRows.filter(function (row) {
        if (normalizeRoom(row.room) !== activeRoom) return false;
        var playerId = String(row.playerId || row.id || "").trim().toLowerCase();
        return !query || playerId.indexOf(query) !== -1;
      }));
    }

    function shouldKeepRow(row, includeEmptyUnsaved) {
      if (!row) return false;
      if (hasSharedDraftRowData(row)) return true;
      return includeEmptyUnsaved && row.saved === false;
    }

    function collectRows(options) {
      options = options || {};
      if (!body) return sharedRows.slice();
      return Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]")).map(function (row) {
        var roomSelect = row.querySelector("[data-rakeback-room]");
        var idInput = row.querySelector("[data-rakeback-player-id]");
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var percentInput = row.querySelector("[data-rakeback-percent]");
        var discountInput = row.querySelector("[data-rakeback-discount15]");
        var room = normalizeRoom(roomSelect && roomSelect.value ? roomSelect.value : activeRoom);
        var rake = parseNumber(rakeInput ? rakeInput.value : "");
        var percent = parseNumber(percentInput ? percentInput.value : "");
        var roomAmount = rake * percent / 100;
        if (discountInput && discountInput.checked) roomAmount *= 0.85;
        roomAmount = Math.round(roomAmount * 100) / 100;
        var amount = getReportAmount(room, roomAmount);
        return {
          groupId: row.getAttribute("data-rakeback-group") || "",
          kind: "base",
          room: room,
          playerId: idInput && idInput.value ? String(idInput.value).trim() : "",
          rake: rake,
          rakeZero: rake === 0,
          percent: percent,
          discount15: !!(discountInput && discountInput.checked),
          saved: row.getAttribute("data-rakeback-saved") === "1",
          persisted: row.getAttribute("data-rakeback-persisted") === "1",
          ownerId: row.getAttribute("data-rakeback-owner") || "",
          createdAt: row.getAttribute("data-rakeback-created-at") || Date.now(),
          standardAt: row.getAttribute("data-rakeback-standard-at") || Date.now(),
          entryAddedAt: row.getAttribute("data-rakeback-entry-added-at") || Date.now(),
          amount: amount,
          roomAmount: roomAmount,
        };
      }).filter(function (row) {
        if (options.savedOnly && row.saved !== true) return false;
        return shouldKeepRow(row, options.includeEmptyUnsaved);
      });
    }

    function setStatus(message, hold) {
      if (!statusEl) return;
      statusEl.hidden = !message && !archiveMode;
      statusEl.textContent = message || (archiveMode ? "Архив пока пуст" : "");
      if (message && !hold) {
        setTimeout(function () {
          if (statusEl.textContent === message) {
            statusEl.hidden = !archiveMode;
            statusEl.textContent = archiveMode ? "Архив пока пуст" : "";
          }
        }, 1800);
      }
    }

    function clearTemplateStatus() {
      if (!statusEl) return;
      var text = String(statusEl.textContent || "");
      if (/шаблон/i.test(text)) setStatus("");
    }

    function normalizeDraftRows(rows) {
      return (Array.isArray(rows) ? rows : []).map(function (row) {
        row = row || {};
        var room = normalizeRoom(row.room || "P21");
        var rake = row.rake != null ? row.rake : "";
        var percent = row.percent != null ? row.percent : "";
        var roomAmount = row.roomAmount != null && row.roomAmount !== ""
          ? row.roomAmount
          : Math.round(parseNumber(rake) * parseNumber(percent) / 100 * (row.discount15 || row.subtract15 ? 0.85 : 1) * 100) / 100;
        return {
          groupId: String(row.groupId || "").trim() || ("shell_" + Date.now() + "_" + Math.random().toString(16).slice(2)),
          kind: row.kind === "addon" ? "addon" : "base",
          room: room,
          playerId: row.playerId || row.id || "",
          rake: rake,
          rakeZero: row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true,
          percent: percent,
          discount15: !!(row.discount15 || row.subtract15),
          saved: true,
          persisted: true,
          ownerId: row.ownerId || row.authorId || "",
          createdAt: row.createdAt || row.addedAt || row.created || Date.now(),
          standardAt: row.standardAt || row.orderAt || row.sortAt || row.createdAt || Date.now(),
          entryAddedAt: row.entryAddedAt || row.firstAddedAt || row.createdAt || Date.now(),
          amount: row.amount != null ? row.amount : getReportAmount(room, roomAmount),
          roomAmount: roomAmount,
        };
      }).filter(function (row) {
        return row.kind !== "addon" && hasSharedDraftRowData(row);
      });
    }

    function mergeRowsWithLocalUnsaved(serverRows, localRows) {
      var unsaved = (Array.isArray(localRows) ? localRows : []).filter(function (row) {
        return row && row.saved !== true;
      });
      var unsavedByGroup = {};
      unsaved.forEach(function (row) {
        if (row.groupId) unsavedByGroup[row.groupId] = true;
      });
      return unsaved.concat((serverRows || []).filter(function (row) {
        return !row.groupId || !unsavedByGroup[row.groupId];
      }));
    }

    function listToSet(list) {
      var set = {};
      (Array.isArray(list) ? list : []).forEach(function (item) {
        var key = String(item || "").trim();
        if (key) set[key] = true;
      });
      return set;
    }

    function getRowsForSave(localRows, patch) {
      localRows = Array.isArray(localRows) ? localRows : [];
      patch = patch || null;
      if (!patch) {
        return localRows.filter(function (row) {
          return row && row.saved === true && hasSharedDraftRowData(row);
        });
      }
      var upsertSet = listToSet(patch.upsertGroupIds);
      return localRows.filter(function (row) {
        return row && row.saved === true && hasSharedDraftRowData(row) && upsertSet[row.groupId];
      });
    }

    function findSharedDomRowByGroupId(groupId) {
      if (!body || !groupId) return null;
      var rows = Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]"));
      for (var i = 0; i < rows.length; i++) {
        if ((rows[i].getAttribute("data-rakeback-group") || "") === groupId) return rows[i];
      }
      return null;
    }

    function saveSharedDraftNow(showStatus, patch) {
      var base = getApiBaseSafe();
      if (!base || !hasApiCredentialSafe()) {
        if (showStatus) setStatus("Нет подключения для сохранения");
        return Promise.resolve(false);
      }
      var localRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
      sharedRows = localRows;
      var patchMode = !!(patch && ((patch.upsertGroupIds && patch.upsertGroupIds.length) || (patch.deleteGroupIds && patch.deleteGroupIds.length)));
      var payload = {
        action: "rakeback_draft_save",
        date: "shared",
        rakebackRows: getRowsForSave(localRows, patchMode ? patch : null),
      };
      if (patchMode) {
        payload.rakebackPatch = true;
        payload.deleteRakebackGroupIds = patch.deleteGroupIds || [];
      }
      saving = true;
      syncControls();
      return requestJson(base + "/api/admin-report-shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAuthBody(payload)),
      }).then(function (data) {
        if (data && data.ok && data.rakebackDraft) {
          sharedRows = mergeRowsWithLocalUnsaved(normalizeDraftRows(data.rakebackDraft.rows), localRows);
          sharedUpdatedAt = data.rakebackDraft.updatedAt || sharedUpdatedAt;
          render();
          if (showStatus) setStatus("Сохранено");
          return true;
        }
        if (showStatus) setStatus((data && data.error) || "Не удалось сохранить");
        return false;
      }).catch(function () {
        if (showStatus) setStatus("Не удалось сохранить");
        return false;
      }).then(function (result) {
        saving = false;
        syncControls();
        return result;
      });
    }

    function loadSharedDraft(options) {
      options = options || {};
      var base = getApiBaseSafe();
      if (!base || !hasApiCredentialSafe()) {
        if (options.showStatus) setStatus("Нет подключения для обновления");
        return Promise.resolve(false);
      }
      var q = getAuthQuery();
      q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared";
      if (sharedUpdatedAt && !options.force) q += "&knownUpdatedAt=" + encodeURIComponent(sharedUpdatedAt);
      loading = true;
      if (options.showStatus) setStatus("Обновляю…", true);
      syncControls();
      return requestJson(base + "/api/admin-report-shifts" + q).then(function (data) {
        var draft = data && data.ok ? data.rakebackDraft : null;
        if (draft && draft.notModified === true) {
          if (options.showStatus) setStatus("Уже актуально");
          return true;
        }
        sharedRows = normalizeDraftRows(draft && draft.rows);
        sharedUpdatedAt = draft && draft.updatedAt ? draft.updatedAt : sharedUpdatedAt;
        render();
        if (options.showStatus) setStatus("Обновлено");
        return true;
      }).catch(function () {
        if (options.showStatus) setStatus("Не удалось обновить");
        return false;
      }).then(function (result) {
        loading = false;
        syncControls();
        return result;
      });
    }

    function mergeSharedRowsFromDom(options) {
      options = options || {};
      var byGroup = {};
      sharedRows.forEach(function (row) {
        if (!row || !row.groupId) return;
        if (options.savedOnly && row.saved !== true) return;
        if (!shouldKeepRow(row, options.includeEmptyUnsaved)) return;
        byGroup[row.groupId] = row;
      });
      collectRows(options).forEach(function (row) {
        if (row && row.groupId) byGroup[row.groupId] = row;
      });
      return Object.keys(byGroup).map(function (key) { return byGroup[key]; }).filter(function (row) {
        return !options.savedOnly || row.saved === true;
      }).filter(function (row) {
        return shouldKeepRow(row, options.includeEmptyUnsaved);
      });
    }

    function syncRoomTabs() {
      Array.prototype.slice.call(roomTabs || []).forEach(function (tab) {
        var selected = !archiveMode && normalizeRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }

    function syncControls() {
      if (refreshBtn) {
        refreshBtn.hidden = false;
        refreshBtn.disabled = loading || saving;
        refreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      }
      if (addBtn) {
        addBtn.hidden = false;
        addBtn.disabled = archiveMode || loading || saving;
      }
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
        if (archiveMode) {
          statusEl.hidden = false;
          statusEl.textContent = "Архив пока пуст";
        } else if (!statusEl.textContent) {
          statusEl.hidden = true;
        }
      }
      if (body) {
        Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]")).forEach(function (row) {
          setSharedRowSaved(row, row.getAttribute("data-rakeback-saved") === "1", loading || saving);
        });
      }
      if (roomTotalLabelEl) roomTotalLabelEl.textContent = archiveMode ? "Итого архив" : "Итого " + (ROOM_LABELS[activeRoom] || activeRoom);
      var visibleShared = archiveMode ? [] : getVisibleSharedRows();
      var totalRake = visibleShared.reduce(function (sum, row) { return sum + parseNumber(row.rake); }, 0);
      var totalAmount = visibleShared.reduce(function (sum, row) {
        var roomAmount = row.roomAmount != null && row.roomAmount !== ""
          ? parseNumber(row.roomAmount)
          : parseNumber(row.rake) * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
        var amount = row.amount != null && row.amount !== "" ? parseNumber(row.amount) : getReportAmount(row.room, roomAmount);
        return sum + amount;
      }, 0);
      if (roomTotalEl) roomTotalEl.textContent = String(Math.round(totalRake)) + " / " + String(Math.round(totalAmount));
      if (totalEl) totalEl.textContent = String(Math.round(totalRake)) + " / " + String(Math.round(totalAmount));
    }

    function render() {
      if (!body) return 0;
      templateStreamSeq += 1;
      var streamSeq = templateStreamSeq;
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
      var ids = templatesLoaded ? getTemplateIds(activeRoom).filter(function (id) {
        return !query || id.toLowerCase().indexOf(query) !== -1;
      }) : [];
      var visibleShared = getVisibleSharedRows();
      var fragment = document.createDocumentFragment();
      visibleShared.forEach(function (row, index) {
        fragment.appendChild(createSharedRow(row, index));
      });
      if (!templateRowsOpen) clearTemplateStatus();
      if (templatesMayExist || templatesLoading || ids.length) fragment.appendChild(createTemplateSeparator(templateRowsOpen));
      if (templateRowsOpen && !templatesLoaded) {
        loadTemplatesIfNeeded({ showStatus: true }).then(function () {
          render();
        });
      }
      if (templateRowsOpen && templatesLoaded) {
        setStatus("Загружаю шаблоны… 0 / " + ids.length, true);
      }
      body.replaceChildren(fragment);
      if (templateRowsOpen && templatesLoaded) {
        streamTemplateRows(ids, visibleShared.length, streamSeq);
      }
      syncRoomTabs();
      syncControls();
      return (templateRowsOpen ? ids.length : 0) + visibleShared.length;
    }

    function bind() {
      if (bound) return;
      bound = true;
      function addSharedRowFromButton(event) {
        if (event) {
          if (typeof event.preventDefault === "function") event.preventDefault();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          else if (typeof event.stopPropagation === "function") event.stopPropagation();
        }
        if (archiveMode) return;
        var now = Date.now();
        var row = {
          groupId: "shell_" + now + "_" + Math.random().toString(16).slice(2),
          kind: "base",
          room: activeRoom,
          playerId: "",
          rake: 0,
          rakeZero: true,
          percent: 0,
          discount15: false,
          saved: false,
          persisted: false,
          createdAt: now,
          standardAt: now,
          entryAddedAt: now,
        };
        sharedRows.unshift(row);
        render();
        var firstInput = body && body.querySelector("[data-rakeback-shared-row] [data-rakeback-player-id]");
        if (firstInput && typeof firstInput.focus === "function") firstInput.focus();
      }
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
      if (refreshBtn) {
        refreshBtn.onclick = function () {
          loadSharedDraft({ force: true, showStatus: true });
        };
      }
      if (addBtn) {
        addBtn.onclick = null;
        if (addBtn.dataset.adminReportRakebackShellAddBound !== "1") {
          addBtn.dataset.adminReportRakebackShellAddBound = "1";
          addBtn.addEventListener("click", addSharedRowFromButton, true);
        }
      }
      if (body) {
        body.addEventListener("input", function (event) {
          var row = event.target && event.target.closest ? event.target.closest("[data-rakeback-shared-row]") : null;
          if (!row) return;
          syncSharedRowAmount(row);
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
          if (row.getAttribute("data-rakeback-saved") !== "1") setStatus("Нажмите ✓, чтобы сохранить", true);
        });
        body.addEventListener("change", function (event) {
          var row = event.target && event.target.closest ? event.target.closest("[data-rakeback-shared-row]") : null;
          if (!row) return;
          syncSharedRowAmount(row);
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
          if (event.target && event.target.matches && event.target.matches("[data-rakeback-room]")) render();
          if (row.getAttribute("data-rakeback-saved") !== "1") setStatus("Нажмите ✓, чтобы сохранить", true);
        });
        body.addEventListener("click", function (event) {
          var templateToggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-template-toggle]") : null;
          if (templateToggle) {
            event.preventDefault();
            templateRowsOpen = templateToggle.getAttribute("aria-expanded") !== "true";
            saveRakebackTemplateSpoilerOpen(templateRowsOpen);
            if (templateRowsOpen && !templatesLoaded) {
              render();
              return;
            }
            render();
            return;
          }
          var saveBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-save]") : null;
          if (saveBtn) {
            event.preventDefault();
            var saveRow = saveBtn.closest("[data-rakeback-shared-row]");
            if (!saveRow) return;
            syncSharedRowAmount(saveRow);
            var idInput = saveRow.querySelector("[data-rakeback-player-id]");
            if (!idInput || !String(idInput.value || "").trim()) {
              setStatus("Заполните ID игрока", true);
              if (idInput && typeof idInput.focus === "function") idInput.focus();
              return;
            }
            var saveGroupId = saveRow.getAttribute("data-rakeback-group") || "";
            var wasPersisted = saveRow.getAttribute("data-rakeback-persisted") === "1";
            setSharedRowSaved(saveRow, true, false);
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            saveSharedDraftNow(true, { upsertGroupIds: [saveGroupId] }).then(function (ok) {
              if (ok) return;
              var failedRow = findSharedDomRowByGroupId(saveGroupId);
              if (!failedRow) return;
              failedRow.setAttribute("data-rakeback-persisted", wasPersisted ? "1" : "0");
              setSharedRowSaved(failedRow, false, false);
              sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            });
            return;
          }
          var editBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-edit]") : null;
          if (editBtn) {
            event.preventDefault();
            var editRow = editBtn.closest("[data-rakeback-shared-row]");
            if (!editRow) return;
            setSharedRowSaved(editRow, false, false);
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            setStatus("Редактирование включено", true);
            var editInput = editRow.querySelector("[data-rakeback-rake]") || editRow.querySelector("[data-rakeback-player-id]");
            if (editInput && typeof editInput.focus === "function") editInput.focus();
            return;
          }
          var removeBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-remove]") : null;
          if (!removeBtn) return;
          event.preventDefault();
          var row = removeBtn.closest("[data-rakeback-shared-row]");
          if (!row) return;
          var groupId = row.getAttribute("data-rakeback-group") || "";
          var persisted = row.getAttribute("data-rakeback-persisted") === "1";
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
            return String(item.groupId || "") !== groupId;
          });
          render();
          if (persisted) saveSharedDraftNow(true, { deleteGroupIds: [groupId] });
        });
      }
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
      collectRows: collectRows,
      fillTable: render,
      getActiveRoom: function () { return activeRoom; },
      getUnaccountedRows: function () {
        return collectRows({ savedOnly: true }).filter(function (row) {
          if (!row || !String(row.playerId || "").trim()) return false;
          return parseNumber(row.rake) !== 0 || parseNumber(row.amount) !== 0 || row.rakeZero === true;
        });
      },
      isArchiveMode: function () { return archiveMode; },
      open: render,
      loadSharedDraft: loadSharedDraft,
      render: render,
      saveSharedDraft: saveSharedDraftNow,
      setArchiveMode: setArchiveMode,
      setTemplateRowsOpen: function (open) {
        templateRowsOpen = !!open;
        saveRakebackTemplateSpoilerOpen(templateRowsOpen);
        return render();
      },
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
