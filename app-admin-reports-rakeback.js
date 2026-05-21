(function () {
  "use strict";

  var ROOM_LABELS = {
    P21: "Покер21",
    X: "Хпокер",
    Supr: "Супрема",
    PP: "PPpoker",
  };
  var RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY = "poker_admin_report_rakeback_templates_open";
  var MOSCOW_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;
  var RAKEBACK_ENTRY_DATE_CUTOFF_MS = 12 * 60 * 60 * 1000;

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

  function getRakebackRowColors() {
    var staticData = window.AdminReportRakebackStaticData || {};
    var colors = Array.isArray(staticData.rowColors) ? staticData.rowColors : [];
    if (colors.length) return colors;
    return [
      { value: "#73510b", label: "Золотой" },
      { value: "#087a48", label: "Зеленый" },
      { value: "#087878", label: "Бирюзовый" },
      { value: "#155996", label: "Синий" },
      { value: "#5b35a0", label: "Фиолетовый" },
      { value: "#8f2b2b", label: "Красный" },
    ];
  }

  function normalizeRakebackRowColor(color) {
    var staticData = window.AdminReportRakebackStaticData || {};
    var legacyMap = staticData.legacyColorMap || {};
    var raw = String(color || "").trim().toLowerCase();
    if (!raw) return "";
    if (legacyMap[raw]) return legacyMap[raw];
    var colors = getRakebackRowColors();
    for (var i = 0; i < colors.length; i += 1) {
      if (String(colors[i].value || "").toLowerCase() === raw) return colors[i].value;
    }
    return "";
  }

  function getRakebackRowColorButtons(selectedColor) {
    selectedColor = normalizeRakebackRowColor(selectedColor);
    var buttons = getRakebackRowColors().map(function (color) {
      var value = normalizeRakebackRowColor(color.value);
      var selected = value && value === selectedColor;
      return '<button type="button" class="admin-report-rakeback-color-swatch" data-rakeback-color-value="' +
        escapeHtml(value) +
        '" title="' +
        escapeHtml(color.label || "Цвет строки") +
        '" aria-label="' +
        escapeHtml(color.label || "Цвет строки") +
        '"' +
        (selected ? ' data-rakeback-color-selected="1"' : "") +
        ' style="--rakeback-swatch:' +
        escapeHtml(value) +
        '"></button>';
    });
    buttons.push('<button type="button" class="admin-report-rakeback-color-swatch admin-report-rakeback-color-swatch--clear" data-rakeback-color-value="" title="Сбросить цвет" aria-label="Сбросить цвет">×</button>');
    return buttons.join("");
  }

  function closeSharedRowColorMenus(root, exceptRow) {
    var scope = root && root.querySelectorAll ? root : document;
    Array.prototype.slice.call(scope.querySelectorAll("[data-rakeback-color-menu]")).forEach(function (menu) {
      var row = menu.closest ? menu.closest("[data-rakeback-row]") : null;
      if (exceptRow && row === exceptRow) return;
      menu.hidden = true;
    });
  }

  function applySharedRowColor(row, color) {
    if (!row) return;
    color = normalizeRakebackRowColor(color);
    if (color) {
      row.setAttribute("data-rakeback-row-color", color);
      row.style.setProperty("--rakeback-row-bg", color);
      row.style.setProperty("--rakeback-row-button-color", color);
    } else {
      row.removeAttribute("data-rakeback-row-color");
      row.style.removeProperty("--rakeback-row-bg");
      row.style.removeProperty("--rakeback-row-button-color");
    }
    var menu = row.querySelector("[data-rakeback-color-menu]");
    if (menu) {
      Array.prototype.slice.call(menu.querySelectorAll("[data-rakeback-color-value]")).forEach(function (btn) {
        btn.toggleAttribute("data-rakeback-color-selected", normalizeRakebackRowColor(btn.getAttribute("data-rakeback-color-value")) === color);
      });
    }
  }

  function getSharedRowColorOrder(row) {
    var color = normalizeRakebackRowColor(row && (row.color || row.rowColor || row.highlightColor));
    var colors = getRakebackRowColors();
    if (!color) return colors.length + 1;
    for (var i = 0; i < colors.length; i += 1) {
      if (colors[i].value === color) return i;
    }
    return colors.length + 1;
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

  function normalizeTimeValue(raw, fallback) {
    var fallbackValue = fallback != null ? fallback : Date.now();
    if (raw == null || raw === "") return fallbackValue;
    var direct = typeof raw === "number" ? raw : Number(raw);
    if (isFinite(direct) && direct > 0) return direct;
    var parsed = Date.parse(String(raw));
    return isFinite(parsed) ? parsed : fallbackValue;
  }

  function padDatePart(value) {
    value = Number(value) || 0;
    return value < 10 ? "0" + value : String(value);
  }

  function getRakebackEntryDateParts(raw) {
    var shifted = new Date(normalizeTimeValue(raw) + MOSCOW_UTC_OFFSET_MS - RAKEBACK_ENTRY_DATE_CUTOFF_MS);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
    };
  }

  function formatEntryDateLabel(raw) {
    var date = getRakebackEntryDateParts(raw);
    return padDatePart(date.day) + "." + padDatePart(date.month);
  }

  function formatEntryWeekdayLabel(raw) {
    var date = getRakebackEntryDateParts(raw);
    var weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var weekdayIndex = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
    return weekdays[weekdayIndex] || "";
  }

  function getDateInputValue(raw) {
    var date = getRakebackEntryDateParts(raw);
    return [
      date.year,
      padDatePart(date.month),
      padDatePart(date.day),
    ].join("-");
  }

  function getTimeFromDateInput(value, fallback) {
    var parts = String(value || "").split("-").map(function (part) { return Number(part); });
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return normalizeTimeValue(fallback);
    return Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0) - MOSCOW_UTC_OFFSET_MS;
  }

  function isSameEntryDate(a, b) {
    var left = getRakebackEntryDateParts(a);
    var right = getRakebackEntryDateParts(b);
    return left.year === right.year &&
      left.month === right.month &&
      left.day === right.day;
  }

  function getRakebackRoomMultiplier(room) {
    room = normalizeRoom(room);
    if (room === "X") return 100;
    if (room === "Supr" || room === "PP") return 115;
    return 1;
  }

  function usesRakebackChipUnits(room) {
    return normalizeRoom(room) !== "P21";
  }

  function getReportAmount(room, roomAmount) {
    return Math.round(parseNumber(roomAmount)) * getRakebackRoomMultiplier(room);
  }

  function hasSharedDraftRowData(row) {
    if (!row) return false;
    var carryForward = row.carryForward === true || row.templateCarryForward === true;
    var rakeZero = row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true;
    if (parseNumber(row.rake) !== 0) return true;
    if (rakeZero) return true;
    if (parseNumber(row.amount) !== 0 || parseNumber(row.roomAmount) !== 0) return true;
    if (carryForward && parseNumber(row.percent) !== 0) return true;
    if (carryForward && normalizeRakebackRowColor(row.color || row.rowColor || row.highlightColor)) return true;
    return carryForward && !!(row.discount15 || row.subtract15);
  }

  function hasNegativeSharedDraftRowValue(row) {
    if (!row) return false;
    return parseNumber(row.rake) < 0 ||
      parseNumber(row.percent) < 0 ||
      parseNumber(row.amount) < 0 ||
      parseNumber(row.roomAmount) < 0;
  }

  function getSharedRowKind(row) {
    return row && (row.kind === "addon" || row.isAddon) ? "addon" : "base";
  }

  function getSharedRowLocalKey(row) {
    if (!row) return "";
    var groupId = String(row.groupId || "").trim();
    if (!groupId) return "";
    if (getSharedRowKind(row) !== "addon") return groupId + "|base";
    return groupId + "|addon|" + String(row.createdAt || row.standardAt || row.entryAddedAt || row.playerId || "").trim();
  }

  function getSharedRowServerKey(row) {
    if (!row) return "";
    var groupId = String(row.groupId || "").trim();
    if (!groupId) return "";
    var kind = getSharedRowKind(row);
    var addonStamp = kind === "addon"
      ? String(row.createdAt || row.entryAddedAt || row.standardAt || "").trim()
      : "";
    return [
      groupId,
      kind,
      normalizeRoom(row.room || "P21"),
      String(row.playerId || row.id || "").trim(),
      String(row.reportId || "").trim(),
      String(row.reportedAt || "").trim(),
      addonStamp,
    ].join("|");
  }

  function copyTextToClipboard(text) {
    var value = String(text != null ? text : "").trim();
    if (!value) return Promise.reject(new Error("empty"));
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        if (document.execCommand("copy")) resolve();
        else reject(new Error("copy"));
      } catch (err) {
        reject(err);
      } finally {
        textarea.parentNode.removeChild(textarea);
      }
    });
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

  function createEntryDateSeparator(entryAt, totalLabel) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var stack = document.createElement("div");
    var date = document.createElement("span");
    var weekday = document.createElement("em");
    var total = document.createElement("b");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--entries";
    tr.setAttribute("data-rakeback-generated", "1");
    tr.setAttribute("data-rakeback-entry-date-separator", "1");
    td.colSpan = 7;
    stack.className = "admin-report-rakeback-date-separator__stack";
    date.className = "admin-report-rakeback-date-separator__date";
    weekday.className = "admin-report-rakeback-date-separator__weekday";
    total.className = "admin-report-rakeback-date-separator__total";
    date.textContent = formatEntryDateLabel(entryAt);
    weekday.textContent = formatEntryWeekdayLabel(entryAt);
    total.textContent = totalLabel || "0 / 0";
    stack.appendChild(date);
    stack.appendChild(weekday);
    stack.appendChild(total);
    td.appendChild(stack);
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

  function getSharedDomPreviousRake(row) {
    if (!row || row.getAttribute("data-rakeback-kind") !== "addon") return 0;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var rows = row.parentNode ? Array.prototype.slice.call(row.parentNode.querySelectorAll("[data-rakeback-shared-row]")) : [];
    var previousRake = 0;
    for (var i = 0; i < rows.length; i++) {
      var current = rows[i];
      if (current === row) break;
      if ((current.getAttribute("data-rakeback-group") || "") !== groupId) continue;
      var rakeInput = current.querySelector("[data-rakeback-rake]");
      previousRake = parseNumber(rakeInput ? rakeInput.value : "");
    }
    return previousRake;
  }

  function isLastSharedAddonDomRow(row) {
    if (!row || row.getAttribute("data-rakeback-kind") !== "addon") return true;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var rows = row.parentNode ? Array.prototype.slice.call(row.parentNode.querySelectorAll("[data-rakeback-shared-row]")) : [];
    var lastAddon = null;
    rows.forEach(function (current) {
      if ((current.getAttribute("data-rakeback-group") || "") === groupId && current.getAttribute("data-rakeback-kind") === "addon") {
        lastAddon = current;
      }
    });
    return !lastAddon || lastAddon === row;
  }

  function syncSharedRowAmount(row, previousRake) {
    if (!row) return 0;
    var roomSelect = row.querySelector("[data-rakeback-room]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    var amountEl = row.querySelector("[data-rakeback-amount]");
    var restEl = row.querySelector("[data-rakeback-rest]");
    var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
    var rake = parseNumber(rakeInput ? rakeInput.value : "");
    var baseRake = rake;
    if (row.getAttribute("data-rakeback-kind") === "addon") {
      var previous = arguments.length > 1 ? parseNumber(previousRake) : getSharedDomPreviousRake(row);
      baseRake = hasRakeInputValue ? rake - previous : 0;
      if (restEl) restEl.textContent = baseRake ? String(Math.round(baseRake * 100) / 100) : "";
    } else if (restEl) {
      restEl.textContent = "";
    }
    var roomAmount = baseRake * parseNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) roomAmount *= 0.85;
    roomAmount = Math.round(roomAmount * 100) / 100;
    row.setAttribute("data-rakeback-base-rake", String(baseRake || 0));
    row.setAttribute("data-rakeback-room-amount", String(roomAmount || 0));
    row.setAttribute("data-rakeback-amount-value", String(getReportAmount(roomSelect && roomSelect.value ? roomSelect.value : "P21", roomAmount)));
    if (amountEl) amountEl.textContent = roomAmount ? String(roomAmount) : "";
    if (restEl) restEl.classList.toggle("admin-report-rakeback-rest--negative", baseRake < 0);
    if (amountEl) amountEl.classList.toggle("admin-report-rakeback-amount--negative", roomAmount < 0);
    return roomAmount;
  }

  function getRakebackNegativeField(row) {
    if (!row) return "";
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    if (rakeInput && String(rakeInput.value || "").trim() && parseNumber(rakeInput.value) < 0) return "рейк";
    if (percentInput && String(percentInput.value || "").trim() && parseNumber(percentInput.value) < 0) return "процент";
    if (parseNumber(row.getAttribute("data-rakeback-base-rake")) < 0) return "остаток";
    if (parseNumber(row.getAttribute("data-rakeback-room-amount")) < 0 ||
      parseNumber(row.getAttribute("data-rakeback-amount-value")) < 0) return "РБ";
    return "";
  }

  function hasRakebackDomValue(row) {
    if (!row) return false;
    var amountEl = row.querySelector("[data-rakeback-amount]");
    if (amountEl && String(amountEl.textContent || "").trim()) return true;
    return parseNumber(row.getAttribute("data-rakeback-room-amount")) !== 0 ||
      parseNumber(row.getAttribute("data-rakeback-amount-value")) !== 0;
  }

  function updateSharedRowActions(row, busy) {
    if (!row) return;
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var addBtn = row.querySelector("[data-rakeback-add-addon]");
    var removeBtn = row.querySelector("[data-rakeback-remove]");
    var colorBtn = row.querySelector("[data-rakeback-color-toggle]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
    var hasPercentInputValue = !!(percentInput && String(percentInput.value || "").trim());
    var hasRakebackValue = hasRakebackDomValue(row);
    var negativeField = getRakebackNegativeField(row);
    if (saveBtn) {
      saveBtn.hidden = saved;
      saveBtn.disabled = !!busy || !!negativeField || !hasRakeInputValue || !hasPercentInputValue || !hasRakebackValue;
    }
    if (editBtn) {
      editBtn.hidden = !saved;
      editBtn.disabled = !!busy;
    }
    if (addBtn) {
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var canAdd = kind === "base" && saved && !negativeField && String(idInput && idInput.value || "").trim() && parseNumber(rakeInput ? rakeInput.value : "") > 0;
      addBtn.hidden = !canAdd;
      addBtn.disabled = !!busy || !canAdd;
    }
    if (removeBtn) {
      var removeLocked = kind === "addon" && !isLastSharedAddonDomRow(row);
      removeBtn.disabled = !!busy || removeLocked;
      removeBtn.setAttribute("title", removeLocked ? "Сначала удалите последнюю подзапись" : "Удалить строку");
      removeBtn.setAttribute("aria-label", removeLocked ? "Сначала удалите последнюю подзапись" : "Удалить строку");
    }
    if (colorBtn) {
      colorBtn.hidden = false;
      colorBtn.disabled = !!busy;
    }
  }

  function updateSharedRowDateBadge(row, baseEntryAt) {
    if (!row) return;
    var badge = row.querySelector("[data-rakeback-date-badge]");
    var label = row.querySelector("[data-rakeback-date-label]");
    var input = row.querySelector("[data-rakeback-entry-date]");
    if (!badge || !label || !input) return;
    var entryAt = normalizeTimeValue(row.getAttribute("data-rakeback-entry-added-at") || row.getAttribute("data-rakeback-created-at"));
    var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var show = kind !== "addon" || !saved || !isSameEntryDate(entryAt, baseEntryAt || entryAt);
    label.textContent = formatEntryDateLabel(entryAt);
    input.value = getDateInputValue(entryAt);
    badge.hidden = !show;
    row.setAttribute("data-rakeback-entry-date-visible", show ? "1" : "0");
  }

  function applySharedRowDateInput(row) {
    if (!row) return;
    var input = row.querySelector("[data-rakeback-entry-date]");
    if (!input) return;
    var value = getTimeFromDateInput(input.value, row.getAttribute("data-rakeback-entry-added-at") || row.getAttribute("data-rakeback-created-at"));
    row.setAttribute("data-rakeback-entry-added-at", String(value));
  }

  function setSharedRowSaved(row, saved, busy) {
    if (!row) return;
    saved = saved !== false;
    var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
    row.classList.toggle("admin-report-rakeback-row--saved", saved);
    row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    row.querySelectorAll("input").forEach(function (input) {
      if (input.hasAttribute("data-rakeback-discount15")) {
        input.disabled = saved || !!busy;
        return;
      }
      if (input.hasAttribute("data-rakeback-entry-date")) {
        input.readOnly = saved;
        input.disabled = saved || !!busy;
        return;
      }
      if (isAddon && input.hasAttribute("data-rakeback-player-id")) {
        input.readOnly = true;
        input.disabled = !!busy;
        return;
      }
      input.readOnly = saved;
      input.disabled = !!busy;
    });
    row.querySelectorAll("select").forEach(function (select) {
      select.disabled = isAddon || saved || !!busy;
    });
    updateSharedRowActions(row, busy);
  }

  function updateTemplateRowActions(row, busy) {
    if (!row) return;
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var addBtn = row.querySelector("[data-rakeback-add-addon]");
    var removeBtn = row.querySelector("[data-rakeback-remove]");
    var colorBtn = row.querySelector("[data-rakeback-color-toggle]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
    var hasRakebackValue = hasRakebackDomValue(row);
    var negativeField = getRakebackNegativeField(row);
    if (saveBtn) {
      saveBtn.hidden = !hasRakeInputValue;
      saveBtn.disabled = !!busy || !!negativeField || !hasRakeInputValue || !hasRakebackValue;
    }
    if (editBtn) editBtn.hidden = true;
    if (addBtn) addBtn.hidden = true;
    if (removeBtn) removeBtn.hidden = true;
    if (colorBtn) {
      colorBtn.hidden = false;
      colorBtn.disabled = !!busy;
    }
  }

  function createSharedRow(data, index) {
    data = data || {};
    var kind = getSharedRowKind(data);
    var room = normalizeRoom(data.room || "P21");
    var groupId = String(data.groupId || ("shell_" + Date.now() + "_" + Math.random().toString(16).slice(2))).trim();
    var saved = data.saved !== false;
    var persisted = data.persisted === true || saved;
    var entryAt = normalizeTimeValue(data.entryAddedAt || data.firstAddedAt || data.createdAt || Date.now());
    var standardAt = normalizeTimeValue(data.standardAt || data.createdAt || entryAt, entryAt);
    var createdAt = normalizeTimeValue(data.createdAt || data.addedAt || data.created || entryAt, entryAt);
    var tr = document.createElement("tr");
    tr.className = "admin-report-rakeback-row" +
      (saved ? " admin-report-rakeback-row--saved" : "") +
      (kind === "addon" ? " admin-report-rakeback-row--addon" : "");
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-shared-row", "1");
    tr.setAttribute("data-rakeback-kind", kind);
    tr.setAttribute("data-rakeback-group", groupId);
    tr.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    tr.setAttribute("data-rakeback-persisted", persisted ? "1" : "0");
    tr.setAttribute("data-rakeback-created-at", String(createdAt));
    tr.setAttribute("data-rakeback-standard-at", String(standardAt));
    tr.setAttribute("data-rakeback-entry-added-at", String(entryAt));
    tr.setAttribute("data-rakeback-owner", data.ownerId || data.authorId || "");
    tr.setAttribute("data-rakeback-report-id", data.reportId || "");
    tr.setAttribute("data-rakeback-reported-at", data.reportedAt || "");
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + createRoomOptions(room) + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки"' + (kind === "addon" ? " hidden" : "") + ">" + (kind === "addon" ? "" : String(index + 1)) + '</span><label class="admin-report-rakeback-date-badge" data-rakeback-date-badge title="Дата записи"><span data-rakeback-date-label>' + escapeHtml(formatEntryDateLabel(entryAt)) + '</span><input type="date" data-rakeback-entry-date aria-label="Дата записи" value="' + escapeHtml(getDateInputValue(entryAt)) + '" /></label><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" value="' + escapeHtml(data.playerId || data.id || "") + '" /></td>' +
      '<td>' + (kind === "addon"
        ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.rake)) + '" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток"></span></div>'
        : '<input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.rake)) + '" />') + '</td>' +
      '<td><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.percent)) + '" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%"' + (data.discount15 || data.subtract15 ? " checked" : "") + ' /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку">✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись">+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--color" data-rakeback-color-toggle title="Изменить цвет строки" aria-label="Изменить цвет строки"><span class="admin-report-rakeback-color-dot" aria-hidden="true"></span></button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку">×</button>' +
        '<div class="admin-report-rakeback-color-menu" data-rakeback-color-menu hidden>' + getRakebackRowColorButtons(data.color || data.rowColor || data.highlightColor || "") + "</div>" +
      "</td>";
    syncSharedRowAmount(tr);
    updateSharedRowDateBadge(tr, data.baseEntryAt || entryAt);
    applySharedRowColor(tr, data.color || data.rowColor || data.highlightColor || "");
    setSharedRowSaved(tr, saved, false);
    return tr;
  }

  function createTemplateRow(room, playerId, index, collapsed, defaults) {
    defaults = defaults || {};
    var defaultColor = normalizeRakebackRowColor(defaults.color || defaults.rowColor || defaults.highlightColor);
    var hasDefaults = parseNumber(defaults.percent) !== 0 || !!(defaults.discount15 || defaults.subtract15) || !!defaultColor;
    var tr = document.createElement("tr");
    tr.className = "admin-report-rakeback-row";
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-template-row", "1");
    tr.setAttribute("data-rakeback-kind", "base");
    tr.setAttribute("data-rakeback-carry-forward", "1");
    tr.setAttribute("data-rakeback-saved", "0");
    tr.setAttribute("data-rakeback-room-current", room);
    tr.setAttribute("data-rakeback-player-id-current", String(playerId || "").toLowerCase());
    if (hasDefaults) {
      tr.setAttribute("data-rakeback-template-default-saved", "1");
      tr.setAttribute("data-rakeback-template-default-percent", String(parseNumber(defaults.percent)));
      tr.setAttribute("data-rakeback-template-default-discount", defaults.discount15 || defaults.subtract15 ? "1" : "0");
      if (defaultColor) tr.setAttribute("data-rakeback-template-default-color", defaultColor);
    }
    if (collapsed) tr.setAttribute("data-rakeback-template-collapsed", "1");
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room disabled>' + createRoomOptions(room) + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки">' + String(index + 1) + '</span><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" readonly value="' + escapeHtml(playerId) + '" /></td>' +
      '<td><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" /></td>' +
      '<td><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" value="' + escapeHtml(formatInputNumber(defaults.percent)) + '" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%"' + (defaults.discount15 || defaults.subtract15 ? " checked" : "") + ' /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить шаблон или запись" aria-label="Сохранить шаблон или запись">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись" hidden>+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку" hidden>×</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--color" data-rakeback-color-toggle title="Выделить цветом" aria-label="Выделить цветом" hidden><span class="admin-report-rakeback-color-dot" aria-hidden="true"></span></button>' +
        '<div class="admin-report-rakeback-color-menu" data-rakeback-color-menu hidden>' + getRakebackRowColorButtons(defaultColor) + "</div>" +
      "</td>";
    syncSharedRowAmount(tr);
    applySharedRowColor(tr, defaultColor);
    updateTemplateRowActions(tr, false);
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
    var rakeHeaderEl = config.rakeHeaderEl || document.getElementById("adminReportRakebackRakeHeader");
    var amountHeaderEl = config.amountHeaderEl || document.getElementById("adminReportRakebackAmountHeader");
    var grandTotalBtn = config.grandTotalBtn || config.rakebackGrandTotalBtn || document.getElementById("adminReportRakebackGrandTotalBtn");
    var totalsModal = config.totalsModal || config.rakebackTotalsModal || document.getElementById("adminReportRakebackTotalsModal");
    var totalsList = config.totalsList || config.rakebackTotalsList || document.getElementById("adminReportRakebackTotalsList");
    var totalsClose = config.totalsClose || config.rakebackTotalsClose || document.getElementById("adminReportRakebackTotalsClose");
    var totalsBackdrop = config.totalsBackdrop || config.rakebackTotalsBackdrop || document.getElementById("adminReportRakebackTotalsBackdrop");
    var templates = normalizeTemplateMap(config.templates || {});
    var templatesLoaded = config.templatesLoaded === true || hasAnyTemplateIds(templates);
    var templatesMayExist = config.templatesMayExist !== false || templatesLoaded;
    var templatesLoading = false;
    var templatesLoadPromise = null;
    var templatesLoadStatusTimer = null;
    var templatesPreloadStarted = false;
    var templateStreamSeq = 0;
    var activeRoom = normalizeRoom(config.activeRoom || "P21");
    var templateRowsOpen = config.templatesOpen === true || readRakebackTemplateSpoilerOpen();
    var archiveMode = false;
    var bound = false;

    function syncRakebackHeaderLabels() {
      var suffix = !archiveMode && usesRakebackChipUnits(activeRoom) ? " (в фишках)" : "";
      if (rakeHeaderEl) rakeHeaderEl.textContent = "Рейк" + suffix;
      if (amountHeaderEl) amountHeaderEl.textContent = "РБ" + suffix;
    }

    function formatRakebackSummaryPair(rake, amount) {
      return String(Math.round(parseNumber(rake))) + " / " + String(Math.round(parseNumber(amount)));
    }

    function getRakebackSavedRowsForTotals(room) {
      return getSharedRowsForTotal(room).filter(function (row) {
        return row && row.saved === true;
      });
    }

    function getRakebackDateTotals(rows) {
      var dateMap = {};
      (Array.isArray(rows) ? rows : []).forEach(function (row, index) {
        if (!row || row.saved !== true) return;
        var stamp = normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt);
        if (!stamp) return;
        var key = getDateInputValue(stamp);
        if (!dateMap[key]) dateMap[key] = { key: key, stamp: stamp, amount: 0, finalRakeByGroup: {}, groupOrder: [] };
        var day = dateMap[key];
        day.stamp = Math.max(day.stamp, stamp);
        var groupKey = String(row.groupId || "").trim() || ("row_" + index);
        if (!Object.prototype.hasOwnProperty.call(day.finalRakeByGroup, groupKey)) day.groupOrder.push(groupKey);
        day.finalRakeByGroup[groupKey] = getReportAmount(row.room, row.rake);
        var roomAmount = row.roomAmount != null && row.roomAmount !== ""
          ? parseNumber(row.roomAmount)
          : parseNumber(row.rake) * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
        var amount = row.amount != null && row.amount !== "" ? parseNumber(row.amount) : getReportAmount(row.room, roomAmount);
        day.amount += amount;
      });
      return Object.keys(dateMap).map(function (key) {
        var day = dateMap[key];
        day.rake = day.groupOrder.reduce(function (sum, groupKey) {
          return sum + parseNumber(day.finalRakeByGroup[groupKey]);
        }, 0);
        return day;
      }).sort(function (a, b) {
        return b.stamp - a.stamp;
      });
    }

    function renderRakebackTotalsModal() {
      if (!totalsList) return;
      var roomHtml = Object.keys(ROOM_LABELS).map(function (room) {
        var totals = getRakebackTotals(getRakebackSavedRowsForTotals(room));
        return '<div class="admin-report-rakeback-totals-modal__row">' +
          '<span class="admin-report-rakeback-totals-modal__room">' + escapeHtml(ROOM_LABELS[room] || room) + "</span>" +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(totals.rake, totals.amount)) + "</span>" +
        "</div>";
      }).join("");
      var dateRows = getRakebackDateTotals(getRakebackSavedRowsForTotals());
      var dateHtml = dateRows.length ? '<div class="admin-report-rakeback-totals-modal__section-title">Итого по датам</div>' + dateRows.map(function (day) {
        return '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--date">' +
          '<span class="admin-report-rakeback-totals-modal__room">' + escapeHtml(formatEntryDateLabel(day.stamp)) + "</span>" +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(day.rake, day.amount)) + "</span>" +
        "</div>";
      }).join("") : "";
      totalsList.innerHTML = roomHtml + dateHtml;
    }

    function openRakebackTotalsModal() {
      if (!totalsModal) return;
      renderRakebackTotalsModal();
      totalsModal.hidden = false;
      if (grandTotalBtn) grandTotalBtn.setAttribute("aria-expanded", "true");
    }

    function closeRakebackTotalsModal() {
      if (!totalsModal) return;
      totalsModal.hidden = true;
      if (grandTotalBtn) grandTotalBtn.setAttribute("aria-expanded", "false");
    }
    var sharedRows = [];
    var sharedUpdatedAt = "";
    var sharedAutoLoadStarted = false;
    var sharedAutoLoadRetryCount = 0;
    var saving = false;
    var loading = false;
    var locallyDeletedRowKeys = {};
    var locallyDeletedGroupIds = {};
    var templateDefaultSaveTimers = {};

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

    function isCarryForwardTemplateRow(row) {
      if (!row || getSharedRowKind(row) === "addon") return false;
      return row.carryForward === true || row.templateCarryForward === true;
    }

    function getTemplateDefaultRow(room, playerId) {
      room = normalizeRoom(room);
      playerId = String(playerId || "").trim().toLowerCase();
      if (!playerId) return null;
      for (var i = 0; i < sharedRows.length; i += 1) {
        var row = sharedRows[i];
        if (!isCarryForwardTemplateRow(row)) continue;
        if (normalizeRoom(row.room) !== room) continue;
        if (String(row.playerId || row.id || "").trim().toLowerCase() === playerId) return row;
      }
      return null;
    }

    function getEmptyGroupTemplateServerKey(room, playerId) {
      return [
        "",
        "base",
        normalizeRoom(room || "P21"),
        String(playerId || "").trim(),
        "",
        "",
        "",
      ].join("|");
    }

    function getTemplateDefaultKey(room, playerId) {
      room = normalizeRoom(room);
      playerId = String(playerId || "").trim().toLowerCase();
      return room + "|" + playerId;
    }

    function setTemplateDefaultSaved(row, saved, percent, discount15, color) {
      if (!row) return;
      if (saved) {
        color = normalizeRakebackRowColor(color);
        row.setAttribute("data-rakeback-template-default-saved", "1");
        if (percent != null) row.setAttribute("data-rakeback-template-default-percent", String(parseNumber(percent)));
        if (discount15 != null) row.setAttribute("data-rakeback-template-default-discount", discount15 ? "1" : "0");
        if (color) row.setAttribute("data-rakeback-template-default-color", color);
        else row.removeAttribute("data-rakeback-template-default-color");
        applySharedRowColor(row, color);
      } else {
        row.removeAttribute("data-rakeback-template-default-saved");
        row.removeAttribute("data-rakeback-template-default-percent");
        row.removeAttribute("data-rakeback-template-default-discount");
        row.removeAttribute("data-rakeback-template-default-color");
      }
      row.removeAttribute("data-rakeback-template-default-dirty");
      row.removeAttribute("data-rakeback-template-default-saving");
      updateTemplateRowActions(row, loading);
    }

    function isTemplateDefaultAlreadySaved(row, draft) {
      if (!row || !draft) return false;
      if (row.getAttribute("data-rakeback-template-default-saved") !== "1") return false;
      var savedPercent = parseNumber(row.getAttribute("data-rakeback-template-default-percent"));
      var savedDiscount = row.getAttribute("data-rakeback-template-default-discount") === "1";
      var savedColor = normalizeRakebackRowColor(row.getAttribute("data-rakeback-template-default-color"));
      return savedPercent === draft.percent && savedDiscount === draft.discount15 && savedColor === draft.color;
    }

    function getTemplateRowDraft(row) {
      if (!row) return null;
      var roomSelect = row.querySelector("[data-rakeback-room]");
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var discountInput = row.querySelector("[data-rakeback-discount15]");
      return {
        room: normalizeRoom(roomSelect && roomSelect.value ? roomSelect.value : activeRoom),
        playerId: idInput && idInput.value ? String(idInput.value).trim() : "",
        hasRakeInputValue: !!(rakeInput && String(rakeInput.value || "").trim()),
        percent: parseNumber(percentInput ? percentInput.value : ""),
        discount15: !!(discountInput && discountInput.checked),
        color: normalizeRakebackRowColor(row.getAttribute("data-rakeback-row-color")),
      };
    }

    function findTemplateDomRow(room, playerId) {
      if (!body) return null;
      var key = getTemplateDefaultKey(room, playerId);
      var rows = Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-template-row]"));
      for (var i = 0; i < rows.length; i += 1) {
        var draft = getTemplateRowDraft(rows[i]);
        if (draft && getTemplateDefaultKey(draft.room, draft.playerId) === key) return rows[i];
      }
      return null;
    }

    function clearTemplateDefaultTimer(room, playerId) {
      var key = getTemplateDefaultKey(room, playerId);
      if (!templateDefaultSaveTimers[key]) return;
      clearTimeout(templateDefaultSaveTimers[key]);
      delete templateDefaultSaveTimers[key];
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

    function scheduleTemplatePreloadStep(fn) {
      if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(fn, { timeout: 900 });
      } else {
        setTimeout(fn, 180);
      }
    }

    function preloadTemplatesSoon() {
      if (templatesLoaded || templatesLoading || templatesPreloadStarted || !templatesMayExist) return;
      templatesPreloadStarted = true;
      scheduleTemplatePreloadStep(function () {
        loadTemplatesIfNeeded({ showStatus: false }).then(function () {
          if (templateRowsOpen || getSearchQuery()) render();
        });
      });
    }

    function streamTemplateRows(ids, startIndex, seq, showStatus, forceVisible) {
      ids = Array.isArray(ids) ? ids : [];
      showStatus = showStatus === true;
      forceVisible = forceVisible === true;
      var total = ids.length;
      var index = 0;
      var batchSize = total > 240 ? 96 : 80;
      if (!body || seq !== templateStreamSeq || (!templateRowsOpen && !forceVisible) || archiveMode) return;
      if (!total) {
        if (showStatus) setStatus("Шаблонов нет");
        return;
      }
      if (showStatus) setStatus("Загружаю шаблоны… 0 / " + total, true);
      function step() {
        if (!body || seq !== templateStreamSeq || (!templateRowsOpen && !forceVisible) || archiveMode) return;
        var fragment = document.createDocumentFragment();
        var limit = Math.min(index + batchSize, total);
        while (index < limit) {
          var id = ids[index];
          if (id) fragment.appendChild(createTemplateRow(activeRoom, id, startIndex + index, false, getTemplateDefaultRow(activeRoom, id)));
          index += 1;
        }
        if (fragment.childNodes.length) body.appendChild(fragment);
        if (showStatus) setStatus("Загружаю шаблоны… " + index + " / " + total, true);
        if (index < total) {
          scheduleTemplateStreamStep(step);
          return;
        }
        if (showStatus) setStatus("Шаблоны загружены: " + total);
      }
      scheduleTemplateStreamStep(step);
    }

    function getSearchQuery() {
      return searchInput && searchInput.value ? String(searchInput.value).trim().toLowerCase() : "";
    }

    function getSortMode() {
      return sortSelect && sortSelect.value ? String(sortSelect.value || "created") : "created";
    }

    function parseRowTime(row, fields) {
      row = row || {};
      for (var i = 0; i < fields.length; i++) {
        var raw = row[fields[i]];
        var n = typeof raw === "number" ? raw : Number(raw);
        if (isFinite(n) && n > 0) return n;
        var parsed = raw ? Date.parse(String(raw)) : NaN;
        if (isFinite(parsed)) return parsed;
      }
      return 0;
    }

    function rowTime(row) {
      if (getSharedRowKind(row) === "addon") {
        return parseRowTime(row, ["standardAt", "createdAt", "addedAt", "created", "entryAddedAt"]);
      }
      return parseRowTime(row, ["standardAt", "createdAt", "addedAt", "created", "entryAddedAt"]);
    }

    function rowEntryTime(row) {
      return parseRowTime(row, ["entryAddedAt", "createdAt", "standardAt", "addedAt", "created"]);
    }

    function rowEntryDay(row) {
      var time = rowEntryTime(row);
      if (!time) return 0;
      var date = new Date(time);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    }

    function compareRowsByEntryDateDesc(a, b) {
      return rowEntryDay(b) - rowEntryDay(a) || rowTime(b) - rowTime(a) || rowEntryTime(b) - rowEntryTime(a);
    }

    function compareRowsByEntryDateAsc(a, b) {
      return rowEntryDay(a) - rowEntryDay(b) || rowTime(a) - rowTime(b) || rowEntryTime(a) - rowEntryTime(b);
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
        if (mode === "rake") return parseNumber(b.rake) - parseNumber(a.rake) || compareRowsByEntryDateDesc(a, b);
        if (mode === "percent") return parseNumber(b.percent) - parseNumber(a.percent) || compareRowsByEntryDateDesc(a, b);
        if (mode === "created_percent") {
          return compareRowsByEntryDateDesc(a, b) || parseNumber(b.percent) - parseNumber(a.percent) || parseNumber(b.rake) - parseNumber(a.rake);
        }
        if (mode === "standard") return parseNumber(a.standardAt || a.createdAt) - parseNumber(b.standardAt || b.createdAt) || compareRowsByEntryDateDesc(a, b);
        if (mode === "color") return getSharedRowColorOrder(a) - getSharedRowColorOrder(b) || compareRowsByEntryDateDesc(a, b);
        return compareRowsByEntryDateDesc(a, b);
      });
    }

    function orderSharedRowsForDisplay(rows) {
      rows = Array.isArray(rows) ? rows : [];
      var addonsByGroup = {};
      var baseRows = [];
      var orphanAddons = [];
      rows.forEach(function (row) {
        if (getSharedRowKind(row) !== "addon") {
          baseRows.push(row);
          return;
        }
        var groupId = String(row.groupId || "").trim();
        if (!groupId) {
          orphanAddons.push(row);
          return;
        }
        if (!addonsByGroup[groupId]) addonsByGroup[groupId] = [];
        addonsByGroup[groupId].push(row);
      });
      Object.keys(addonsByGroup).forEach(function (groupId) {
        addonsByGroup[groupId].sort(compareRowsByEntryDateAsc);
      });
      var ordered = [];
      sortRows(baseRows).forEach(function (row) {
        var groupId = String(row.groupId || "").trim();
        ordered.push(row);
        (addonsByGroup[groupId] || []).forEach(function (addon) {
          ordered.push(addon);
        });
        delete addonsByGroup[groupId];
      });
      Object.keys(addonsByGroup).forEach(function (groupId) {
        addonsByGroup[groupId].forEach(function (addon) {
          orphanAddons.push(addon);
        });
      });
      return ordered.concat(orphanAddons.sort(compareRowsByEntryDateAsc));
    }

    function getSharedRowsForTotal(room) {
      var query = getSearchQuery();
      return orderSharedRowsForDisplay(sharedRows.filter(function (row) {
        if (isCarryForwardTemplateRow(row)) return false;
        if (room && normalizeRoom(row.room) !== normalizeRoom(room)) return false;
        var playerId = String(row.playerId || row.id || "").trim().toLowerCase();
        return !query || playerId.indexOf(query) !== -1;
      }));
    }

    function getVisibleSharedRows() {
      return getSharedRowsForTotal(activeRoom);
    }

    function getFinalRakeTotal(rows) {
      var finalRakeByGroup = {};
      var groupOrder = [];
      (Array.isArray(rows) ? rows : []).forEach(function (row, index) {
        if (!row) return;
        var key = String(row.groupId || "").trim() || ("row_" + index);
        if (!Object.prototype.hasOwnProperty.call(finalRakeByGroup, key)) groupOrder.push(key);
        finalRakeByGroup[key] = getReportAmount(row.room, row.rake);
      });
      return groupOrder.reduce(function (sum, key) {
        return sum + parseNumber(finalRakeByGroup[key]);
      }, 0);
    }

    function getRakebackTotals(rows) {
      rows = (Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.saved === true;
      });
      return {
        rake: getFinalRakeTotal(rows),
        amount: rows.reduce(function (sum, row) {
          var roomAmount = row.roomAmount != null && row.roomAmount !== ""
            ? parseNumber(row.roomAmount)
            : parseNumber(row.rake) * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
          var amount = row.amount != null && row.amount !== "" ? parseNumber(row.amount) : getReportAmount(row.room, roomAmount);
          return sum + amount;
        }, 0),
      };
    }

    function getPulledTemplateIdSet(room) {
      var set = {};
      room = normalizeRoom(room);
      sharedRows.forEach(function (row) {
        if (!row || (row.saved !== true && row.persisted !== true) || getSharedRowKind(row) === "addon") return;
        if (isCarryForwardTemplateRow(row)) return;
        if (normalizeRoom(row.room) !== room) return;
        var playerId = String(row.playerId || row.id || "").trim().toLowerCase();
        if (playerId) set[playerId] = true;
      });
      return set;
    }

    function shouldKeepRow(row, includeEmptyUnsaved) {
      if (!row) return false;
      if (hasSharedDraftRowData(row)) return true;
      return includeEmptyUnsaved && row.saved === false;
    }

    function isLocallyDeletedSharedRow(row) {
      if (!row) return false;
      var groupId = String(row.groupId || "").trim();
      if (groupId && locallyDeletedGroupIds[groupId]) return true;
      var key = getSharedRowLocalKey(row);
      return !!(key && locallyDeletedRowKeys[key]);
    }

    function filterLocallyDeletedSharedRows(rows) {
      return (Array.isArray(rows) ? rows : []).filter(function (row) {
        return !isLocallyDeletedSharedRow(row);
      });
    }

    function markSharedRowDeleted(row, kind, localKey) {
      if (!row) return;
      var groupId = row.getAttribute("data-rakeback-group") || "";
      if (kind === "addon") {
        if (localKey) locallyDeletedRowKeys[localKey] = true;
        return;
      }
      if (groupId) locallyDeletedGroupIds[groupId] = true;
    }

    function confirmSharedRowDelete(row, kind) {
      if (typeof window === "undefined" || typeof window.confirm !== "function") return true;
      var idInput = row && row.querySelector ? row.querySelector("[data-rakeback-player-id]") : null;
      var playerId = String(idInput && idInput.value || "").trim();
      var message = kind === "addon" ? "Удалить подзапись" : "Удалить запись";
      if (playerId) message += " для ID " + playerId;
      if (kind !== "addon") message += " и все ее подзаписи";
      return window.confirm(message + "?");
    }

    function collectRows(options) {
      options = options || {};
      if (!body) return sharedRows.slice();
      var previousRakeByGroup = {};
      return Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]")).map(function (row) {
        applySharedRowDateInput(row);
        var roomSelect = row.querySelector("[data-rakeback-room]");
        var idInput = row.querySelector("[data-rakeback-player-id]");
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var percentInput = row.querySelector("[data-rakeback-percent]");
        var discountInput = row.querySelector("[data-rakeback-discount15]");
        var room = normalizeRoom(roomSelect && roomSelect.value ? roomSelect.value : activeRoom);
        var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
        var rake = parseNumber(rakeInput ? rakeInput.value : "");
        var percent = parseNumber(percentInput ? percentInput.value : "");
        var groupId = row.getAttribute("data-rakeback-group") || "";
        var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
        var previousRake = kind === "addon" ? parseNumber(previousRakeByGroup[groupId]) : 0;
        var rakeDelta = kind === "addon" ? (hasRakeInputValue ? rake - previousRake : 0) : rake;
        var roomAmount = rakeDelta * percent / 100;
        if (discountInput && discountInput.checked) roomAmount *= 0.85;
        roomAmount = Math.round(roomAmount * 100) / 100;
        var amount = getReportAmount(room, roomAmount);
        if (kind !== "addon" || hasRakeInputValue) previousRakeByGroup[groupId] = rake;
        return {
          groupId: groupId,
          kind: kind,
          room: room,
          playerId: idInput && idInput.value ? String(idInput.value).trim() : "",
          rake: rake,
          rakeZero: hasRakeInputValue && rake === 0,
          percent: percent,
          discount15: !!(discountInput && discountInput.checked),
          saved: row.getAttribute("data-rakeback-saved") === "1",
          persisted: row.getAttribute("data-rakeback-persisted") === "1",
          ownerId: row.getAttribute("data-rakeback-owner") || "",
          createdAt: row.getAttribute("data-rakeback-created-at") || Date.now(),
          standardAt: row.getAttribute("data-rakeback-standard-at") || Date.now(),
          entryAddedAt: row.getAttribute("data-rakeback-entry-added-at") || Date.now(),
          reportId: row.getAttribute("data-rakeback-report-id") || "",
          reportedAt: row.getAttribute("data-rakeback-reported-at") || "",
          color: row.getAttribute("data-rakeback-row-color") || "",
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
        var carryForward = row.carryForward === true || row.templateCarryForward === true;
        return {
          groupId: String(row.groupId || "").trim() || ("shell_" + Date.now() + "_" + Math.random().toString(16).slice(2)),
          kind: row.kind === "addon" ? "addon" : "base",
          room: room,
          playerId: row.playerId || row.id || "",
          rake: rake,
          rakeZero: row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true,
          percent: percent,
          carryForward: carryForward,
          templateCarryForward: carryForward,
          discount15: !!(row.discount15 || row.subtract15),
          saved: true,
          persisted: true,
          ownerId: row.ownerId || row.authorId || "",
          createdAt: row.createdAt || row.addedAt || row.created || Date.now(),
          standardAt: row.standardAt || row.orderAt || row.sortAt || row.createdAt || Date.now(),
          entryAddedAt: row.entryAddedAt || row.firstAddedAt || row.createdAt || Date.now(),
          reportId: row.reportId || "",
          reportedAt: row.reportedAt || "",
          color: normalizeRakebackRowColor(row.color || row.rowColor || row.highlightColor),
          amount: row.amount != null ? row.amount : getReportAmount(room, roomAmount),
          roomAmount: roomAmount,
        };
      }).filter(function (row) {
        return hasSharedDraftRowData(row);
      });
    }

    function mergeServerRowWithLocalVisualState(serverRow, localRow) {
      if (!serverRow || !localRow) return serverRow;
      var serverColor = normalizeRakebackRowColor(serverRow.color || serverRow.rowColor || serverRow.highlightColor);
      if (serverColor) return serverRow;
      var localColor = normalizeRakebackRowColor(localRow.color || localRow.rowColor || localRow.highlightColor);
      if (!localColor) return serverRow;
      var merged = {};
      Object.keys(serverRow).forEach(function (key) {
        merged[key] = serverRow[key];
      });
      merged.color = localColor;
      return merged;
    }

    function mergeRowsWithLocalUnsaved(serverRows, localRows) {
      serverRows = Array.isArray(serverRows) ? serverRows : [];
      localRows = Array.isArray(localRows) ? localRows : [];
      var localByKey = {};
      localRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key) localByKey[key] = row;
      });
      var unsaved = (Array.isArray(localRows) ? localRows : []).filter(function (row) {
        return row && row.saved !== true;
      });
      var unsavedByKey = {};
      unsaved.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key) unsavedByKey[key] = true;
      });
      var serverByKey = {};
      serverRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key && !unsavedByKey[key]) serverByKey[key] = row;
      });
      var seen = {};
      var merged = unsaved.slice();
      unsaved.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key) seen[key] = true;
      });
      localRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (!key || seen[key] || !serverByKey[key]) return;
        merged.push(mergeServerRowWithLocalVisualState(serverByKey[key], row));
        seen[key] = true;
      });
      serverRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key && seen[key]) return;
        merged.push(mergeServerRowWithLocalVisualState(row, localByKey[key]));
        if (key) seen[key] = true;
      });
      return merged;
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
          return row && row.saved === true && hasSharedDraftRowData(row) && !hasNegativeSharedDraftRowValue(row);
        });
      }
      var upsertSet = listToSet(patch.upsertGroupIds);
      return localRows.filter(function (row) {
        return row && row.saved === true && hasSharedDraftRowData(row) && !hasNegativeSharedDraftRowValue(row) && upsertSet[row.groupId];
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

    function getSharedDomRowDataForKey(row) {
      if (!row) return null;
      var roomSelect = row.querySelector("[data-rakeback-room]");
      var idInput = row.querySelector("[data-rakeback-player-id]");
      return {
        groupId: row.getAttribute("data-rakeback-group") || "",
        kind: row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base",
        room: roomSelect && roomSelect.value ? roomSelect.value : activeRoom,
        playerId: idInput && idInput.value ? String(idInput.value).trim() : "",
        createdAt: row.getAttribute("data-rakeback-created-at") || "",
        standardAt: row.getAttribute("data-rakeback-standard-at") || "",
        entryAddedAt: row.getAttribute("data-rakeback-entry-added-at") || "",
        reportId: row.getAttribute("data-rakeback-report-id") || "",
        reportedAt: row.getAttribute("data-rakeback-reported-at") || "",
      };
    }

    function getSharedDomRowLocalKey(row) {
      return getSharedRowLocalKey(getSharedDomRowDataForKey(row));
    }

    function getSharedDomRowServerKey(row) {
      return getSharedRowServerKey(getSharedDomRowDataForKey(row));
    }

    function shouldCopyRakebackIdInput(input) {
      if (!input) return false;
      var row = input.closest("[data-rakeback-row]");
      if (!row) return false;
      if (!String(input.value || "").trim()) return false;
      return input.readOnly || row.getAttribute("data-rakeback-saved") === "1" || row.hasAttribute("data-rakeback-template-row");
    }

    function copyRakebackIdInput(input) {
      if (!shouldCopyRakebackIdInput(input)) return false;
      copyTextToClipboard(input.value).then(function () {
        setStatus("ID скопирован");
      }).catch(function () {
        setStatus("Не удалось скопировать ID", true);
      });
      return true;
    }

    function findSharedDomRowByLocalKey(key) {
      if (!body || !key) return null;
      var rows = Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]"));
      for (var i = 0; i < rows.length; i++) {
        if (getSharedDomRowLocalKey(rows[i]) === key) return rows[i];
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
      var patchMode = !!(patch && (
        (patch.upsertGroupIds && patch.upsertGroupIds.length) ||
        (patch.deleteGroupIds && patch.deleteGroupIds.length) ||
        (patch.deleteRowKeys && patch.deleteRowKeys.length)
      ));
      var skipRender = !!(patch && patch.skipRender);
      var payload = {
        action: "rakeback_draft_save",
        date: "shared",
        rakebackRows: getRowsForSave(localRows, patchMode ? patch : null),
      };
      if (patchMode) {
        payload.rakebackPatch = true;
        payload.deleteRakebackGroupIds = patch.deleteGroupIds || [];
        payload.deleteRakebackRowKeys = patch.deleteRowKeys || [];
      }
      saving = true;
      syncControls();
      return requestJson(base + "/api/admin-report-shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAuthBody(payload)),
      }).then(function (data) {
        if (data && data.ok && data.rakebackDraft) {
          sharedRows = mergeRowsWithLocalUnsaved(filterLocallyDeletedSharedRows(normalizeDraftRows(data.rakebackDraft.rows)), localRows);
          sharedUpdatedAt = data.rakebackDraft.updatedAt || sharedUpdatedAt;
          if (!skipRender) render();
          else syncControls();
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
      var markBusy = options.background !== true;
      var q = getAuthQuery();
      q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared";
      if (sharedUpdatedAt && !options.force) q += "&knownUpdatedAt=" + encodeURIComponent(sharedUpdatedAt);
      if (markBusy) loading = true;
      if (options.showStatus) setStatus("Обновляю…", true);
      if (markBusy) syncControls();
      return requestJson(base + "/api/admin-report-shifts" + q).then(function (data) {
        var draft = data && data.ok ? data.rakebackDraft : null;
        if (draft && draft.notModified === true) {
          if (options.showStatus) setStatus("Уже актуально");
          return true;
        }
        sharedRows = mergeRowsWithLocalUnsaved(filterLocallyDeletedSharedRows(normalizeDraftRows(draft && draft.rows)), mergeSharedRowsFromDom({ includeEmptyUnsaved: true }));
        sharedUpdatedAt = draft && draft.updatedAt ? draft.updatedAt : sharedUpdatedAt;
        render();
        if (options.showStatus) setStatus("Обновлено");
        return true;
      }).catch(function () {
        if (options.showStatus) setStatus("Не удалось обновить");
        return false;
      }).then(function (result) {
        if (markBusy) {
          loading = false;
          syncControls();
        }
        return result;
      });
    }

    function scheduleSharedDraftAutoload() {
      if (sharedAutoLoadStarted || sharedUpdatedAt || archiveMode) return;
      if (!getApiBaseSafe() || !hasApiCredentialSafe()) {
        if (sharedAutoLoadRetryCount >= 3) return;
        sharedAutoLoadRetryCount += 1;
        setTimeout(scheduleSharedDraftAutoload, sharedAutoLoadRetryCount === 1 ? 350 : 900);
        return;
      }
      sharedAutoLoadStarted = true;
      setTimeout(function () {
        loadSharedDraft({ background: true }).then(function (ok) {
          if (ok) return;
          sharedAutoLoadStarted = false;
        });
      }, 0);
    }

    function mergeSharedRowsFromDom(options) {
      options = options || {};
      var byKey = {};
      sharedRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (!row || !key) return;
        if (options.savedOnly && row.saved !== true) return;
        if (!shouldKeepRow(row, options.includeEmptyUnsaved)) return;
        byKey[key] = row;
      });
      collectRows(options).forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (row && key) byKey[key] = row;
      });
      return Object.keys(byKey).map(function (key) { return byKey[key]; }).filter(function (row) {
        return !isLocallyDeletedSharedRow(row);
      }).filter(function (row) {
        return !options.savedOnly || row.saved === true;
      }).filter(function (row) {
        return shouldKeepRow(row, options.includeEmptyUnsaved);
      });
    }

    function syncSharedGroupRows() {
      if (!body) return;
      var rows = Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row]"));
      var baseByGroup = {};
      var baseEntryByGroup = {};
      rows.forEach(function (row) {
        if (row.getAttribute("data-rakeback-kind") !== "addon") {
          var groupId = row.getAttribute("data-rakeback-group") || "";
          baseByGroup[groupId] = row;
          baseEntryByGroup[groupId] = row.getAttribute("data-rakeback-entry-added-at") || row.getAttribute("data-rakeback-created-at") || Date.now();
        }
      });
      var previousRakeByGroup = {};
      rows.forEach(function (row) {
        applySharedRowDateInput(row);
        var groupId = row.getAttribute("data-rakeback-group") || "";
        if (row.getAttribute("data-rakeback-kind") === "addon" && baseByGroup[groupId]) {
          var baseRoom = baseByGroup[groupId].querySelector("[data-rakeback-room]");
          var baseId = baseByGroup[groupId].querySelector("[data-rakeback-player-id]");
          var roomSelect = row.querySelector("[data-rakeback-room]");
          var idInput = row.querySelector("[data-rakeback-player-id]");
          if (baseRoom && roomSelect) roomSelect.value = baseRoom.value;
          if (baseId && idInput) idInput.value = baseId.value;
        }
        updateSharedRowDateBadge(row, baseEntryByGroup[groupId] || row.getAttribute("data-rakeback-entry-added-at"));
        syncSharedRowAmount(row, row.getAttribute("data-rakeback-kind") === "addon" ? previousRakeByGroup[groupId] : 0);
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
        if (row.getAttribute("data-rakeback-kind") !== "addon" || hasRakeInputValue) {
          previousRakeByGroup[groupId] = parseNumber(rakeInput ? rakeInput.value : "");
        }
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
        refreshBtn.disabled = loading;
        refreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      }
      if (addBtn) {
        addBtn.hidden = false;
        addBtn.disabled = archiveMode || loading;
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
          setSharedRowSaved(row, row.getAttribute("data-rakeback-saved") === "1", loading);
        });
        Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-template-row]")).forEach(function (row) {
          updateTemplateRowActions(row, loading);
        });
      }
      if (roomTotalLabelEl) roomTotalLabelEl.textContent = archiveMode ? "Итого архив" : "Итого " + (ROOM_LABELS[activeRoom] || activeRoom);
      syncRakebackHeaderLabels();
      var visibleShared = archiveMode ? [] : getVisibleSharedRows();
      var allShared = archiveMode ? [] : getSharedRowsForTotal();
      var roomTotals = getRakebackTotals(visibleShared);
      var allTotals = getRakebackTotals(allShared);
      if (roomTotalEl) roomTotalEl.textContent = String(Math.round(roomTotals.rake)) + " / " + String(Math.round(roomTotals.amount));
      if (totalEl) totalEl.textContent = String(Math.round(allTotals.rake)) + " / " + String(Math.round(allTotals.amount));
      if (totalsModal && !totalsModal.hidden) renderRakebackTotalsModal();
    }

    function render(options) {
      options = options || {};
      if (!body) return 0;
      var showTemplateStatus = options.showTemplateStatus === true;
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
      var pulledTemplateIds = getPulledTemplateIdSet(activeRoom);
      var showTemplateRows = templateRowsOpen || !!query;
      var ids = templatesLoaded && showTemplateRows ? getTemplateIds(activeRoom).filter(function (id) {
        id = String(id || "").trim();
        if (!id || pulledTemplateIds[id.toLowerCase()]) return false;
        return !query || id.toLowerCase().indexOf(query) !== -1;
      }) : [];
      var visibleShared = getVisibleSharedRows();
      var fragment = document.createDocumentFragment();
      var baseIndex = 0;
      var baseEntryByGroup = {};
      var dateTotalsByKey = {};
      var lastEntryDateKey = "";
      getRakebackDateTotals(visibleShared).forEach(function (day) {
        if (day && day.key) dateTotalsByKey[day.key] = day;
      });
      visibleShared.forEach(function (row, index) {
        var groupId = String(row.groupId || "").trim();
        var entryAt = normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt || Date.now());
        var entryDateKey = getDateInputValue(entryAt);
        if (entryDateKey && entryDateKey !== lastEntryDateKey) {
          var dayTotal = dateTotalsByKey[entryDateKey];
          fragment.appendChild(createEntryDateSeparator(entryAt, dayTotal ? formatRakebackSummaryPair(dayTotal.rake, dayTotal.amount) : "0 / 0"));
          lastEntryDateKey = entryDateKey;
        }
        if (getSharedRowKind(row) !== "addon") {
          baseIndex += 1;
          baseEntryByGroup[groupId] = entryAt;
        }
        var renderRow = row;
        if (getSharedRowKind(row) === "addon") {
          renderRow = {};
          Object.keys(row).forEach(function (key) { renderRow[key] = row[key]; });
          renderRow.baseEntryAt = baseEntryByGroup[groupId] || entryAt;
        }
        fragment.appendChild(createSharedRow(renderRow, Math.max(0, baseIndex - 1)));
      });
      if (!templateRowsOpen && !query) clearTemplateStatus();
      if (templatesMayExist || templatesLoading || ids.length) fragment.appendChild(createTemplateSeparator(showTemplateRows));
      if (showTemplateRows && !templatesLoaded) {
        loadTemplatesIfNeeded({ showStatus: showTemplateStatus }).then(function () {
          render({ showTemplateStatus: showTemplateStatus });
        });
      }
      if (showTemplateRows && templatesLoaded && showTemplateStatus) {
        setStatus("Загружаю шаблоны… 0 / " + ids.length, true);
      }
      body.replaceChildren(fragment);
      syncSharedGroupRows();
      if (showTemplateRows && templatesLoaded) {
        streamTemplateRows(ids, visibleShared.length, streamSeq, showTemplateStatus, showTemplateRows);
      }
      syncRoomTabs();
      syncControls();
      return (showTemplateRows ? ids.length : 0) + visibleShared.length;
    }

    function open() {
      var count = render();
      scheduleSharedDraftAutoload();
      return count;
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
        if (searchInput && searchInput.value) searchInput.value = "";
        var now = Date.now();
        var row = {
          groupId: "shell_" + now + "_" + Math.random().toString(16).slice(2),
          kind: "base",
          room: activeRoom,
          playerId: "",
          rake: 0,
          rakeZero: false,
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

      function addSharedAddonFromRow(baseRow) {
        if (!baseRow || archiveMode) return;
        syncSharedGroupRows();
        var localRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
        var baseKey = getSharedDomRowLocalKey(baseRow);
        var baseData = null;
        localRows.forEach(function (row) {
          if (!baseData && getSharedRowLocalKey(row) === baseKey) baseData = row;
        });
        if (!baseData || getSharedRowKind(baseData) === "addon") return;
        if (!String(baseData.playerId || "").trim() || parseNumber(baseData.rake) === 0) {
          setStatus("Для подзаписи нужны ID и рейк", true);
          return;
        }
        var previousAddonData = null;
        orderSharedRowsForDisplay(localRows).forEach(function (row) {
          if (String(row.groupId || "") === String(baseData.groupId || "") && getSharedRowKind(row) === "addon") {
            previousAddonData = row;
          }
        });
        var now = Date.now();
        var sourceData = previousAddonData || baseData;
        var sourceOrderAt = parseRowTime(sourceData, ["standardAt", "createdAt", "addedAt", "created", "entryAddedAt"]);
        var orderAt = previousAddonData ? Math.max(now, sourceOrderAt + 1) : now;
        var addon = {
          groupId: baseData.groupId,
          kind: "addon",
          room: baseData.room,
          playerId: baseData.playerId,
          rake: "",
          rakeZero: false,
          percent: sourceData.percent,
          discount15: sourceData.discount15,
          saved: false,
          persisted: false,
          ownerId: baseData.ownerId || "",
          createdAt: now,
          standardAt: orderAt,
          entryAddedAt: previousAddonData ? (previousAddonData.entryAddedAt || previousAddonData.createdAt || now) : now,
        };
        sharedRows = localRows.concat(addon);
        render();
        setStatus("Подзапись добавлена, нажмите ✓", true);
        var addonRow = findSharedDomRowByLocalKey(getSharedRowLocalKey(addon));
        var rakeInput = addonRow && addonRow.querySelector("[data-rakeback-rake]");
        if (rakeInput && typeof rakeInput.focus === "function") rakeInput.focus();
      }

      function clearTemplateRowDefaults(room, playerId, options) {
        options = options || {};
        var previousRows = sharedRows.slice();
        var existingDefault = getTemplateDefaultRow(room, playerId);
        var sourceRow = options.sourceRow || findTemplateDomRow(room, playerId);
        if (sourceRow) setTemplateDefaultSaved(sourceRow, false);
        sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
          if (!isCarryForwardTemplateRow(item)) return true;
          if (normalizeRoom(item.room) !== room) return true;
          return String(item.playerId || item.id || "").trim().toLowerCase() !== String(playerId || "").trim().toLowerCase();
        });
        if (!existingDefault || !existingDefault.groupId) return;
        saveSharedDraftNow(false, {
          deleteGroupIds: [existingDefault.groupId],
          deleteRowKeys: [getEmptyGroupTemplateServerKey(room, playerId)],
          skipRender: options.skipRender === true,
        }).then(function (ok) {
          if (ok) {
            if (options.showStatus) setStatus("Процент шаблона очищен");
            return;
          }
          sharedRows = previousRows;
          if (sourceRow) setTemplateDefaultSaved(sourceRow, true, existingDefault && existingDefault.percent, !!(existingDefault && existingDefault.discount15), existingDefault && (existingDefault.color || existingDefault.rowColor || existingDefault.highlightColor));
          if (!options.skipRender) render();
          setStatus("Не удалось сохранить процент", true);
        });
      }

      function saveTemplateRowDefaults(room, playerId, percent, discount15, options) {
        options = options || {};
        var previousRows = sharedRows.slice();
        var existingDefault = getTemplateDefaultRow(room, playerId);
        var sourceRow = options.sourceRow || findTemplateDomRow(room, playerId);
        var color = normalizeRakebackRowColor(options.color != null ? options.color : sourceRow && sourceRow.getAttribute("data-rakeback-row-color"));
        var now = Date.now();
        var row = {
          groupId: existingDefault && existingDefault.groupId
            ? existingDefault.groupId
            : "shell_template_default_" + now + "_" + Math.random().toString(16).slice(2),
          kind: "base",
          room: room,
          playerId: playerId,
          rake: 0,
          rakeZero: false,
          percent: percent,
          carryForward: true,
          templateCarryForward: true,
          discount15: !!discount15,
          saved: true,
          persisted: !!(existingDefault && existingDefault.persisted),
          createdAt: existingDefault && existingDefault.createdAt ? existingDefault.createdAt : now,
          standardAt: now,
          entryAddedAt: now,
          color: color,
          amount: 0,
          roomAmount: 0,
        };
        var normalizedId = String(playerId || "").trim().toLowerCase();
        sharedRows = [row].concat(mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
          if (!isCarryForwardTemplateRow(item)) return true;
          if (normalizeRoom(item.room) !== room) return true;
          return String(item.playerId || item.id || "").trim().toLowerCase() !== normalizedId;
        }));
        if (sourceRow) {
          sourceRow.setAttribute("data-rakeback-template-default-saving", "1");
          setTemplateDefaultSaved(sourceRow, true, percent, discount15, color);
        }
        if (!options.skipRender) render();
        setStatus(color && parseNumber(percent) === 0 && !discount15 ? "Цвет закреплен за шаблоном" : "Процент закреплен за шаблоном", true);
        saveSharedDraftNow(options.showStatus !== false, {
          upsertGroupIds: [row.groupId],
          deleteRowKeys: [getEmptyGroupTemplateServerKey(room, playerId)],
          skipRender: options.skipRender === true,
        }).then(function (ok) {
          if (ok) return;
          sharedRows = previousRows;
          if (sourceRow) setTemplateDefaultSaved(sourceRow, !!existingDefault, existingDefault && existingDefault.percent, !!(existingDefault && existingDefault.discount15), existingDefault && (existingDefault.color || existingDefault.rowColor || existingDefault.highlightColor));
          if (!options.skipRender) render();
          setStatus("Не удалось сохранить процент", true);
        });
      }

      function scheduleTemplateRowDefaultSave(templateRow) {
        var draft = getTemplateRowDraft(templateRow);
        if (!draft || !draft.playerId) return;
        clearTemplateDefaultTimer(draft.room, draft.playerId);
        if (getRakebackNegativeField(templateRow)) {
          templateRow.removeAttribute("data-rakeback-template-default-dirty");
          updateTemplateRowActions(templateRow, loading);
          setStatus("Отрицательные значения сохранять нельзя", true);
          return;
        }
        if (draft.hasRakeInputValue) {
          templateRow.removeAttribute("data-rakeback-template-default-dirty");
          updateTemplateRowActions(templateRow, loading);
          return;
        }
        if (isTemplateDefaultAlreadySaved(templateRow, draft)) {
          setTemplateDefaultSaved(templateRow, true, draft.percent, draft.discount15, draft.color);
          return;
        }
        templateRow.setAttribute("data-rakeback-template-default-dirty", "1");
        templateRow.removeAttribute("data-rakeback-template-default-saved");
        updateTemplateRowActions(templateRow, loading);
        setStatus("Сохраняю шаблон…", true);
        var key = getTemplateDefaultKey(draft.room, draft.playerId);
        templateDefaultSaveTimers[key] = setTimeout(function () {
          delete templateDefaultSaveTimers[key];
          var currentRow = findTemplateDomRow(draft.room, draft.playerId) || templateRow;
          var current = getTemplateRowDraft(currentRow) || draft;
          if (!current.playerId || current.hasRakeInputValue) return;
          if (current.percent === 0 && !current.discount15 && !current.color) {
            clearTemplateRowDefaults(current.room, current.playerId, {
              sourceRow: currentRow,
              skipRender: true,
            });
            return;
          }
          saveTemplateRowDefaults(current.room, current.playerId, current.percent, current.discount15, {
            color: current.color,
            sourceRow: currentRow,
            skipRender: true,
            showStatus: false,
          });
        }, 650);
      }

      function saveTemplateRowAsShared(templateRow) {
        if (!templateRow || archiveMode) return;
        syncSharedRowAmount(templateRow);
        var roomSelect = templateRow.querySelector("[data-rakeback-room]");
        var idInput = templateRow.querySelector("[data-rakeback-player-id]");
        var rakeInput = templateRow.querySelector("[data-rakeback-rake]");
        var percentInput = templateRow.querySelector("[data-rakeback-percent]");
        var discountInput = templateRow.querySelector("[data-rakeback-discount15]");
        var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
        if (!playerId) {
          setStatus("Заполните ID игрока", true);
          return;
        }
        var room = normalizeRoom(roomSelect && roomSelect.value ? roomSelect.value : activeRoom);
        clearTemplateDefaultTimer(room, playerId);
        var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
        var rake = parseNumber(rakeInput ? rakeInput.value : "");
        var percent = parseNumber(percentInput ? percentInput.value : "");
        var discount15 = !!(discountInput && discountInput.checked);
        var color = normalizeRakebackRowColor(templateRow.getAttribute("data-rakeback-row-color"));
        if (getRakebackNegativeField(templateRow)) {
          setStatus("Отрицательные значения сохранять нельзя", true);
          return;
        }
        if (!hasRakeInputValue) {
          if (percent === 0 && !discount15 && !color) {
            setStatus("Укажите рейк для записи или процент для шаблона", true);
            return;
          }
          saveTemplateRowDefaults(room, playerId, percent, discount15, { color: color });
          return;
        }
        if (!hasRakebackDomValue(templateRow)) {
          setStatus("Заполните процент, чтобы появился РБ", true);
          if (percentInput && typeof percentInput.focus === "function") percentInput.focus();
          return;
        }
        var roomAmount = Math.round(rake * percent / 100 * (discount15 ? 0.85 : 1) * 100) / 100;
        var now = Date.now();
        var row = {
          groupId: "shell_template_" + now + "_" + Math.random().toString(16).slice(2),
          kind: "base",
          room: room,
          playerId: playerId,
          rake: rake,
          rakeZero: rake === 0,
          percent: percent,
          discount15: discount15,
          saved: true,
          persisted: false,
          createdAt: now,
          standardAt: now,
          entryAddedAt: now,
          color: color,
          amount: getReportAmount(room, roomAmount),
          roomAmount: roomAmount,
        };
        var rowKey = getSharedRowLocalKey(row);
        sharedRows = [row].concat(mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
          return getSharedRowLocalKey(item) !== rowKey;
        }));
        render();
        setStatus("Шаблон сохранен в записи", true);
        saveSharedDraftNow(true, { upsertGroupIds: [row.groupId] }).then(function (ok) {
          if (ok) return;
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
            return getSharedRowLocalKey(item) !== rowKey;
          });
          render();
        });
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
      if (grandTotalBtn && grandTotalBtn.dataset.adminReportRakebackTotalsBound !== "1") {
        grandTotalBtn.dataset.adminReportRakebackTotalsBound = "1";
        grandTotalBtn.addEventListener("click", function (event) {
          event.preventDefault();
          openRakebackTotalsModal();
        });
      }
      if (totalsClose && totalsClose.dataset.adminReportRakebackTotalsCloseBound !== "1") {
        totalsClose.dataset.adminReportRakebackTotalsCloseBound = "1";
        totalsClose.addEventListener("click", closeRakebackTotalsModal);
      }
      if (totalsBackdrop && totalsBackdrop.dataset.adminReportRakebackTotalsCloseBound !== "1") {
        totalsBackdrop.dataset.adminReportRakebackTotalsCloseBound = "1";
        totalsBackdrop.addEventListener("click", closeRakebackTotalsModal);
      }
      if (body) {
        body.addEventListener("input", function (event) {
          var row = event.target && event.target.closest ? event.target.closest("[data-rakeback-shared-row],[data-rakeback-template-row]") : null;
          if (!row) return;
          if (row.hasAttribute("data-rakeback-template-row")) {
            syncSharedRowAmount(row);
            updateTemplateRowActions(row, loading);
            scheduleTemplateRowDefaultSave(row);
            return;
          }
          syncSharedGroupRows();
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
        });
        body.addEventListener("change", function (event) {
          var row = event.target && event.target.closest ? event.target.closest("[data-rakeback-shared-row],[data-rakeback-template-row]") : null;
          if (!row) return;
          if (row.hasAttribute("data-rakeback-template-row")) {
            syncSharedRowAmount(row);
            updateTemplateRowActions(row, loading);
            scheduleTemplateRowDefaultSave(row);
            return;
          }
          syncSharedGroupRows();
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
          if (event.target && event.target.matches && event.target.matches("[data-rakeback-room]")) render();
        });
        body.addEventListener("click", function (event) {
          var idCopyInput = event.target && event.target.closest ? event.target.closest("[data-rakeback-player-id]") : null;
          if (idCopyInput && copyRakebackIdInput(idCopyInput)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          var colorControl = event.target && event.target.closest ? event.target.closest("[data-rakeback-color-toggle],[data-rakeback-color-value],[data-rakeback-color-menu]") : null;
          if (!colorControl) closeSharedRowColorMenus(body);
          var colorOption = event.target && event.target.closest ? event.target.closest("[data-rakeback-color-value]") : null;
          if (colorOption) {
            event.preventDefault();
            var colorRow = colorOption.closest("[data-rakeback-shared-row],[data-rakeback-template-row]");
            if (!colorRow) return;
            var selectedColor = colorOption.getAttribute("data-rakeback-color-value") || "";
            if (colorRow.hasAttribute("data-rakeback-template-row")) {
              applySharedRowColor(colorRow, selectedColor);
              closeSharedRowColorMenus(body);
              updateTemplateRowActions(colorRow, loading);
              scheduleTemplateRowDefaultSave(colorRow);
              return;
            }
            if (getRakebackNegativeField(colorRow)) {
              closeSharedRowColorMenus(body);
              setStatus("Отрицательные значения сохранять нельзя", true);
              return;
            }
            var colorGroupId = colorRow.getAttribute("data-rakeback-group") || "";
            var savedColorRow = colorRow.getAttribute("data-rakeback-saved") === "1";
            applySharedRowColor(colorRow, selectedColor);
            closeSharedRowColorMenus(body);
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            if (getSortMode() === "color") render();
            if (savedColorRow) {
              saveSharedDraftNow(true, { upsertGroupIds: [colorGroupId] });
            } else {
              syncControls();
            }
            return;
          }
          var colorToggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-color-toggle]") : null;
          if (colorToggle) {
            event.preventDefault();
            var toggleRow = colorToggle.closest("[data-rakeback-shared-row],[data-rakeback-template-row]");
            if (!toggleRow) return;
            var menu = toggleRow.querySelector("[data-rakeback-color-menu]");
            if (!menu) return;
            var willOpen = menu.hidden;
            closeSharedRowColorMenus(body, toggleRow);
            menu.hidden = !willOpen;
            return;
          }
          var templateToggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-template-toggle]") : null;
          if (templateToggle) {
            event.preventDefault();
            templateRowsOpen = getSearchQuery() && !templateRowsOpen
              ? true
              : templateToggle.getAttribute("aria-expanded") !== "true";
            saveRakebackTemplateSpoilerOpen(templateRowsOpen);
            if (templateRowsOpen && !templatesLoaded) {
              render({ showTemplateStatus: true });
              return;
            }
            render({ showTemplateStatus: templateRowsOpen });
            return;
          }
          var saveBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-save]") : null;
          if (saveBtn) {
            event.preventDefault();
            var templateRow = saveBtn.closest("[data-rakeback-template-row]");
            if (templateRow) {
              saveTemplateRowAsShared(templateRow);
              return;
            }
            var saveRow = saveBtn.closest("[data-rakeback-shared-row]");
            if (!saveRow) return;
            syncSharedGroupRows();
            var idInput = saveRow.querySelector("[data-rakeback-player-id]");
            var rakeInput = saveRow.querySelector("[data-rakeback-rake]");
            var percentInput = saveRow.querySelector("[data-rakeback-percent]");
            if (!idInput || !String(idInput.value || "").trim()) {
              setStatus("Заполните ID игрока", true);
              if (idInput && typeof idInput.focus === "function") idInput.focus();
              return;
            }
            if (!rakeInput || !String(rakeInput.value || "").trim()) {
              setStatus("Заполните рейк", true);
              if (rakeInput && typeof rakeInput.focus === "function") rakeInput.focus();
              return;
            }
            if (!percentInput || !String(percentInput.value || "").trim() || !hasRakebackDomValue(saveRow)) {
              setStatus("Заполните процент, чтобы появился РБ", true);
              if (percentInput && typeof percentInput.focus === "function") percentInput.focus();
              return;
            }
            var negativeField = getRakebackNegativeField(saveRow);
            if (negativeField) {
              setStatus("Отрицательные значения сохранять нельзя", true);
              var negativeInput = negativeField === "рейк"
                ? rakeInput
                : negativeField === "процент"
                  ? percentInput
                  : null;
              if (negativeInput && typeof negativeInput.focus === "function") negativeInput.focus();
              return;
            }
            var saveGroupId = saveRow.getAttribute("data-rakeback-group") || "";
            var saveLocalKey = getSharedDomRowLocalKey(saveRow);
            var wasPersisted = saveRow.getAttribute("data-rakeback-persisted") === "1";
            setSharedRowSaved(saveRow, true, false);
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            saveSharedDraftNow(true, { upsertGroupIds: [saveGroupId] }).then(function (ok) {
              if (ok) return;
              var failedRow = findSharedDomRowByLocalKey(saveLocalKey) || findSharedDomRowByGroupId(saveGroupId);
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
            syncSharedGroupRows();
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            setStatus("Редактирование включено", true);
            var editInput = editRow.querySelector("[data-rakeback-rake]") || editRow.querySelector("[data-rakeback-player-id]");
            if (editInput && typeof editInput.focus === "function") editInput.focus();
            return;
          }
          var addAddonBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-add-addon]") : null;
          if (addAddonBtn) {
            event.preventDefault();
            addSharedAddonFromRow(addAddonBtn.closest("[data-rakeback-shared-row]"));
            return;
          }
          var removeBtn = event.target && event.target.closest ? event.target.closest("[data-rakeback-remove]") : null;
          if (!removeBtn) return;
          event.preventDefault();
          var row = removeBtn.closest("[data-rakeback-shared-row]");
          if (!row) return;
          var groupId = row.getAttribute("data-rakeback-group") || "";
          var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
          if (kind === "addon" && !isLastSharedAddonDomRow(row)) {
            setStatus("Сначала удалите последнюю подзапись", true);
            updateSharedRowActions(row, loading);
            return;
          }
          if (!confirmSharedRowDelete(row, kind)) return;
          var localKey = getSharedDomRowLocalKey(row);
          var serverKey = getSharedDomRowServerKey(row);
          var persisted = row.getAttribute("data-rakeback-persisted") === "1";
          markSharedRowDeleted(row, kind, localKey);
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
            if (kind === "addon") return getSharedRowLocalKey(item) !== localKey;
            return String(item.groupId || "") !== groupId;
          });
          render();
          if (persisted && kind === "addon") {
            saveSharedDraftNow(true, { upsertGroupIds: [groupId], deleteRowKeys: serverKey ? [serverKey] : [] });
          } else if (persisted) {
            saveSharedDraftNow(true, { deleteGroupIds: [groupId] });
          }
        });
      }
    }

    bind();
    syncControls();
    preloadTemplatesSoon();

    function setArchiveMode(active) {
      archiveMode = !!active;
      return render();
    }

    return {
      bind: bind,
      close: closeRakebackTotalsModal,
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
      open: open,
      loadSharedDraft: loadSharedDraft,
      render: render,
      saveSharedDraft: saveSharedDraftNow,
      setArchiveMode: setArchiveMode,
      setTemplateRowsOpen: function (open) {
        templateRowsOpen = !!open;
        saveRakebackTemplateSpoilerOpen(templateRowsOpen);
        return render({ showTemplateStatus: templateRowsOpen });
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
