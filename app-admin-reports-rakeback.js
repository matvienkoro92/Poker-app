(function () {
  "use strict";

  var ROOM_LABELS = {
    P21: "Покер21",
    X: "Хпокер",
    Supr: "Супрема",
    PP: "PPpoker",
  };
  var ARCHIVE_ROOM_TABS = ["P21", "X"];
  var RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY = "poker_admin_report_rakeback_templates_open";
  var RAKEBACK_PENDING_ROWS_STORAGE_KEY = "poker_admin_report_rakeback_pending_rows_v1";
  var MOSCOW_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;
  var RAKEBACK_DAY_MS = 24 * 60 * 60 * 1000;
  var REPORT_DAY_CUTOFF_MS = 6 * 60 * 60 * 1000;

  function readRakebackTemplateSpoilerOpen() {
    return false;
  }

  function saveRakebackTemplateSpoilerOpen(open) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.setItem(RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY, open ? "1" : "0");
    } catch (e) {}
  }

  function readPendingRakebackRows() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return [];
      var parsed = JSON.parse(window.localStorage.getItem(RAKEBACK_PENDING_ROWS_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writePendingRakebackRows(rows) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      var pending = (Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.persisted !== true && String(row.playerId || "").trim();
      }).slice(0, 100);
      if (pending.length) window.localStorage.setItem(RAKEBACK_PENDING_ROWS_STORAGE_KEY, JSON.stringify(pending));
      else window.localStorage.removeItem(RAKEBACK_PENDING_ROWS_STORAGE_KEY);
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
    // Keep display and round-trip parsing on the same report-day boundary.
    // Using 18:00 here while getTimeFromDateInput used 06:00 moved a row one
    // day backwards on every save/reload cycle.
    var shifted = new Date(normalizeTimeValue(raw) + MOSCOW_UTC_OFFSET_MS - REPORT_DAY_CUTOFF_MS);
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

  function getWeekStartFromDateParts(date) {
    date = date || {};
    var day = Number(date.day) || 1;
    var month = Math.max(1, Number(date.month) || 1);
    var year = Number(date.year) || new Date().getFullYear();
    var weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    var daysFromMonday = (weekdayIndex + 6) % 7;
    return Date.UTC(year, month - 1, day, 6, 0, 0, 0) - daysFromMonday * RAKEBACK_DAY_MS - MOSCOW_UTC_OFFSET_MS;
  }

  function getRakebackEntryWeekStart(raw) {
    return getWeekStartFromDateParts(getRakebackEntryDateParts(raw));
  }

  function getRakebackReportWeekStart(raw) {
    var shifted = new Date(normalizeTimeValue(raw) - REPORT_DAY_CUTOFF_MS + MOSCOW_UTC_OFFSET_MS);
    return getWeekStartFromDateParts({
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
    });
  }

  function getCurrentRakebackWeekStart() {
    var shifted = new Date(normalizeTimeValue(Date.now()) - REPORT_DAY_CUTOFF_MS + MOSCOW_UTC_OFFSET_MS);
    return getWeekStartFromDateParts({
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
    });
  }

  function formatArchiveWeekDate(weekStart, offsetDays) {
    var d = new Date(Number(weekStart) + (Number(offsetDays) || 0) * RAKEBACK_DAY_MS + MOSCOW_UTC_OFFSET_MS);
    return padDatePart(d.getUTCDate()) + "." + padDatePart(d.getUTCMonth() + 1);
  }

  function formatArchiveWeekLabel(weekStart) {
    return formatArchiveWeekDate(weekStart, 0) + "–" + formatArchiveWeekDate(weekStart, 6);
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
    return Date.UTC(parts[0], parts[1] - 1, parts[2], REPORT_DAY_CUTOFF_MS / (60 * 60 * 1000), 0, 0, 0) - MOSCOW_UTC_OFFSET_MS;
  }

  function getCurrentReportDateKey() {
    var shifted = new Date(normalizeTimeValue(Date.now()) - REPORT_DAY_CUTOFF_MS + MOSCOW_UTC_OFFSET_MS);
    return [
      shifted.getUTCFullYear(),
      padDatePart(shifted.getUTCMonth() + 1),
      padDatePart(shifted.getUTCDate()),
    ].join("-");
  }

  function normalizeReportDateKey(value) {
    var raw = String(value == null ? "" : value).trim();
    var isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) return isoMatch[1] + "-" + isoMatch[2] + "-" + isoMatch[3];
    var ruMatch = raw.match(/^(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{2,4}))?$/);
    if (ruMatch) {
      var year = ruMatch[3] ? Number(ruMatch[3]) : new Date().getFullYear();
      if (year < 100) year += 2000;
      return [year, padDatePart(ruMatch[2]), padDatePart(ruMatch[1])].join("-");
    }
    var parsed = Date.parse(raw);
    if (isFinite(parsed)) return getDateInputValue(parsed);
    return "";
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

  function normalizeRakebackRoomAmount(room, value) {
    return Math.round(parseNumber(value));
  }

  function getReportAmount(room, roomAmount) {
    return Math.round(parseNumber(roomAmount)) * getRakebackRoomMultiplier(room);
  }

  function getCurrentRakebackOwnerId() {
    var users = [];
    try {
      var resolved = typeof window !== "undefined" && typeof window.getPokerResolvedTelegramUser === "function"
        ? window.getPokerResolvedTelegramUser()
        : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      var tgUser = typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe
        ? window.Telegram.WebApp.initDataUnsafe.user
        : null;
      if (tgUser) users.push(tgUser);
    } catch (eTg) {}
    try {
      var auth = typeof window !== "undefined" ? (window.__pokerTelegramAuth || null) : null;
      if (auth) users.push(auth);
      if (auth && auth.user) users.push(auth.user);
    } catch (eAuth) {}
    try {
      var rec = typeof window !== "undefined" && typeof window.pokerReadPwaTgSessionRecord === "function"
        ? window.pokerReadPwaTgSessionRecord()
        : null;
      if (rec) users.push(rec);
      if (rec && rec.user) users.push(rec.user);
    } catch (eRec) {}
    for (var i = 0; i < users.length; i += 1) {
      var user = users[i] || {};
      var memberId = user.memberId != null ? String(user.memberId).trim() : "";
      if (memberId) return memberId;
      var rawId = user.id != null ? String(user.id).trim() : "";
      if (!rawId) continue;
      if (rawId.indexOf("tg_") === 0 || rawId.indexOf("vk_") === 0) return rawId;
      if (user.is_vk || user.vk || user.vkId != null) return "vk_" + rawId.replace(/^vk_/, "");
      return "tg_" + rawId.replace(/^tg_/, "");
    }
    return "";
  }

  function rakebackOwnerMatches(left, right) {
    left = String(left || "").trim();
    right = String(right || "").trim();
    if (!left || !right) return true;
    if (left === right) return true;
    return left.replace(/^(tg_|vk_)/, "") === right.replace(/^(tg_|vk_)/, "");
  }

  function isCurrentRakebackReportOwner(ownerId) {
    var currentOwnerId = getCurrentRakebackOwnerId();
    return rakebackOwnerMatches(ownerId, currentOwnerId);
  }

  function isRakebackRowReported(row) {
    return !!(row && (row.accounted === true || row.reportedAt || row.reportId));
  }

  function hasRakebackReportValue(row) {
    if (!row) return false;
    return parseNumber(row.rake) !== 0 ||
      parseNumber(row.roomAmount) !== 0 ||
      parseNumber(row.amount) !== 0 ||
      isRakebackRowReported(row);
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
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (data && typeof data === "object") data.__httpStatus = response.status;
        return data;
      });
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

  function createArchiveEmptyRow(message) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
    tr.setAttribute("data-rakeback-generated", "1");
    td.colSpan = 7;
    td.textContent = message || "Архив пока пуст";
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
    var room = roomSelect && roomSelect.value ? roomSelect.value : "P21";
    var roomAmount = baseRake * parseNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) roomAmount *= 0.85;
    roomAmount = normalizeRakebackRoomAmount(room, roomAmount);
    row.setAttribute("data-rakeback-base-rake", String(baseRake || 0));
    row.setAttribute("data-rakeback-room-amount", String(roomAmount || 0));
    row.setAttribute("data-rakeback-amount-value", String(getReportAmount(room, roomAmount)));
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
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var amountEl = row.querySelector("[data-rakeback-amount]");
    if (amountEl && String(amountEl.textContent || "").trim()) return true;
    if (rakeInput && String(rakeInput.value || "").trim() && parseNumber(rakeInput.value) === 0) {
      return !!(percentInput && String(percentInput.value || "").trim());
    }
    return parseNumber(row.getAttribute("data-rakeback-room-amount")) !== 0 ||
      parseNumber(row.getAttribute("data-rakeback-amount-value")) !== 0;
  }

  function getRakebackScrollContainer(source) {
    var el = source && source.nodeType === 1 ? source : null;
    if (el && typeof el.closest === "function") {
      var wrap = el.closest(".admin-report-rakeback-wrap");
      if (wrap) return wrap;
      var panel = el.closest(".admin-report-panel--active");
      if (panel && panel.scrollHeight > panel.clientHeight) return panel;
    }
    var fallbackBody = document.getElementById("adminReportRakebackTableBody");
    if (fallbackBody && typeof fallbackBody.closest === "function") {
      var bodyWrap = fallbackBody.closest(".admin-report-rakeback-wrap");
      if (bodyWrap) return bodyWrap;
    }
    return null;
  }

  function captureRakebackScroll(source) {
    var scroller = getRakebackScrollContainer(source);
    if (!scroller) return null;
    return {
      scroller: scroller,
      top: scroller.scrollTop || 0,
      left: scroller.scrollLeft || 0,
    };
  }

  function restoreRakebackScroll(snapshot) {
    if (!snapshot || !snapshot.scroller || snapshot.scroller.isConnected === false) return;
    function apply() {
      if (!snapshot.scroller || snapshot.scroller.isConnected === false) return;
      snapshot.scroller.scrollTop = snapshot.top || 0;
      snapshot.scroller.scrollLeft = snapshot.left || 0;
    }
    apply();
    if (window && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(apply);
    }
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
    label.textContent = formatEntryDateLabel(entryAt);
    input.value = getDateInputValue(entryAt);
    badge.hidden = true;
    row.setAttribute("data-rakeback-entry-date-visible", "0");
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
    row.classList.toggle("admin-report-rakeback-row--dirty", !saved);
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
    tr.setAttribute("data-rakeback-accounted", data.accounted === true || data.reportedAt || data.reportId ? "1" : "0");
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + createRoomOptions(room) + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки"' + (kind === "addon" ? " hidden" : "") + ">" + (kind === "addon" ? "" : String(index + 1)) + '</span><span class="admin-report-rakeback-date-badge" data-rakeback-date-badge title="Дата записи"><span data-rakeback-date-label>' + escapeHtml(formatEntryDateLabel(entryAt)) + '</span><input type="hidden" data-rakeback-entry-date aria-hidden="true" tabindex="-1" value="' + escapeHtml(getDateInputValue(entryAt)) + '" /></span>' + (kind === "addon" ? '<span class="admin-report-rakeback-addon-parent" data-rakeback-addon-parent title="Продолжение записи"><b data-rakeback-addon-parent-id>↳ ' + escapeHtml(data.playerId || data.id || "") + '</b><small data-rakeback-addon-index>подзапись</small></span>' : "") + '<input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" value="' + escapeHtml(data.playerId || data.id || "") + '" /></td>' +
      '<td>' + (kind === "addon"
        ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.rake)) + '" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток"></span></div>'
        : '<input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.rake)) + '" />') + '</td>' +
      '<td><input type="number" inputmode="decimal" min="0" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" value="' + escapeHtml(formatInputNumber(data.percent)) + '" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%"' + (data.discount15 || data.subtract15 ? " checked" : "") + ' /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись">+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку">✎</button>' +
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
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись" hidden>+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
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
    var periodTabs = modal ? modal.querySelectorAll("[data-rakeback-period]") : [];
    var customPeriodEl = document.getElementById("adminReportRakebackCustomPeriod");
    var periodDateFrom = document.getElementById("adminReportRakebackDateFrom");
    var periodDateTo = document.getElementById("adminReportRakebackDateTo");
    var roomTabs = config.roomTabs || (modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : []);
    var totalEl = config.totalEl || document.getElementById("adminReportRakebackTotal");
    var roomTotalLabelEl = config.roomTotalLabelEl || document.getElementById("adminReportRakebackRoomTotalLabel");
    var roomTotalEl = config.roomTotalEl || document.getElementById("adminReportRakebackRoomTotal");
    var statusEl = config.statusEl || document.getElementById("adminReportRakebackStatus");
    var filterButtons = modal ? modal.querySelectorAll("[data-rakeback-filter]") : [];
    var auditListEl = document.getElementById("adminReportRakebackAuditList");
    var undoEl = document.getElementById("adminReportRakebackUndo");
    var undoTextEl = document.getElementById("adminReportRakebackUndoText");
    var undoBtn = document.getElementById("adminReportRakebackUndoBtn");
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
    var activePeriod = "current_week";
    var activeQuickFilter = "all";
    var sharedAudit = [];
    var pendingDelete = null;
    var bound = false;

    function formatAuditAuthor(raw) {
      var value = String(raw || "").trim();
      var id = value.replace(/^tg_/, "");
      if (id === "388008256") return "Роман";
      if (id === "2144406710") return "Аня";
      if (id === "1897001087") return "Вика";
      return value || "Администратор";
    }

    function renderAudit() {
      if (!auditListEl) return;
      if (!sharedAudit.length) {
        auditListEl.textContent = "Изменений пока нет";
        return;
      }
      auditListEl.innerHTML = sharedAudit.slice(0, 80).map(function (item) {
        var at = item && item.at ? new Date(item.at) : null;
        var stamp = at && !isNaN(at.getTime()) ? at.toLocaleString("ru-RU") : "";
        return '<div class="admin-report-rakeback-audit__item"><div>' + escapeHtml(item && item.text || "Изменение") + '</div><div class="admin-report-rakeback-audit__meta">' + escapeHtml(formatAuditAuthor(item && item.by)) + (stamp ? " · " + escapeHtml(stamp) : "") + "</div></div>";
      }).join("");
    }

    function applyQuickFilter() {
      if (!body) return;
      var counts = { all: 0, with_rb: 0, without_rb: 0, changed: 0 };
      Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
        var show = true;
        var hasRb = hasRakebackDomValue(row);
        var isShared = row.hasAttribute("data-rakeback-shared-row");
        var changed = row.classList.contains("admin-report-rakeback-row--dirty") || row.hasAttribute("data-rakeback-template-default-dirty") || (isShared && row.getAttribute("data-rakeback-saved") !== "1");
        if (isShared) {
          counts.all += 1;
          counts[hasRb ? "with_rb" : "without_rb"] += 1;
        }
        if (changed) counts.changed += 1;
        if (activeQuickFilter === "with_rb") show = isShared && hasRb;
        else if (activeQuickFilter === "without_rb") show = isShared && !hasRb;
        else if (activeQuickFilter === "changed") show = changed;
        row.setAttribute("data-rakeback-filter-hidden", show ? "0" : "1");
      });
      Array.prototype.slice.call(filterButtons || []).forEach(function (button) {
        var key = button.getAttribute("data-rakeback-filter") || "all";
        var selected = key === activeQuickFilter;
        var countEl = button.querySelector("[data-rakeback-filter-count]");
        if (countEl) countEl.textContent = String(counts[key] || 0);
        button.classList.toggle("admin-report-rakeback-filter--active", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });
      Array.prototype.slice.call(body.querySelectorAll(".admin-report-rakeback-date-separator")).forEach(function (separator) {
        var next = separator.nextElementSibling;
        var hasVisibleRow = false;
        while (next && !next.classList.contains("admin-report-rakeback-date-separator")) {
          if (next.hasAttribute("data-rakeback-row") && next.getAttribute("data-rakeback-filter-hidden") !== "1") {
            hasVisibleRow = true;
            break;
          }
          next = next.nextElementSibling;
        }
        separator.hidden = activeQuickFilter !== "all" && !hasVisibleRow;
      });
    }

    function hasUnsavedChanges() {
      if (!body) return false;
      if (saving) return true;
      return !!body.querySelector(
        ".admin-report-rakeback-row--dirty,[data-rakeback-shared-row][data-rakeback-saved=\"0\"],[data-rakeback-template-default-dirty]"
      );
    }

    function confirmUnsavedLeave() {
      if (!hasUnsavedChanges()) return true;
      if (typeof window === "undefined" || typeof window.confirm !== "function") return false;
      return window.confirm("Есть несохранённые изменения. Уйти?");
    }

    function syncDuplicatePlayerIds() {
      if (!body) return;
      var groups = {};
      var rows = Array.prototype.slice.call(body.querySelectorAll("[data-rakeback-shared-row][data-rakeback-kind=\"base\"]"));
      rows.forEach(function (row) {
        row.classList.remove("admin-report-rakeback-row--duplicate");
        row.removeAttribute("data-rakeback-duplicate");
        var roomInput = row.querySelector("[data-rakeback-room]");
        var idInput = row.querySelector("[data-rakeback-player-id]");
        if (idInput) idInput.removeAttribute("title");
        var id = String(idInput && idInput.value || "").trim().toLowerCase();
        if (!id) return;
        var day = getDateInputValue(row.getAttribute("data-rakeback-entry-added-at") || row.getAttribute("data-rakeback-created-at"));
        var key = normalizeRoom(roomInput && roomInput.value || activeRoom) + "|" + day + "|" + id;
        if (!groups[key]) groups[key] = [];
        groups[key].push(row);
      });
      Object.keys(groups).forEach(function (key) {
        if (groups[key].length < 2) return;
        groups[key].forEach(function (row) {
          row.classList.add("admin-report-rakeback-row--duplicate");
          row.setAttribute("data-rakeback-duplicate", "1");
          var idInput = row.querySelector("[data-rakeback-player-id]");
          if (idInput) idInput.setAttribute("title", "Дубликат ID в этом руме и дате");
        });
      });
    }

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
      var previousRakeByGroup = {};
      var chronologicalRows = (Array.isArray(rows) ? rows : []).slice().sort(compareRowsByEntryDateAsc);
      chronologicalRows.forEach(function (row, index) {
        if (!row || (activeQuickFilter !== "changed" && row.saved !== true)) return;
        var stamp = rowEntryTime(row) || normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt);
        if (!stamp) return;
        var key = getDateInputValue(stamp);
        if (!dateMap[key]) dateMap[key] = { key: key, stamp: stamp, amount: 0, rake: 0 };
        var day = dateMap[key];
        day.stamp = Math.max(day.stamp, stamp);
        var groupKey = String(row.groupId || "").trim() || ("row_" + index);
        var currentRake = parseNumber(row.rake);
        var previousRake = previousRakeByGroup[groupKey] != null ? previousRakeByGroup[groupKey] : 0;
        var effectiveRake = getSharedRowKind(row) === "addon" ? currentRake - previousRake : currentRake;
        var roomAmount = effectiveRake * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
        day.rake += getReportAmount(row.room, effectiveRake);
        day.amount += getReportAmount(row.room, Math.round(roomAmount * 100) / 100);
        previousRakeByGroup[groupKey] = currentRake;
      });
      return Object.keys(dateMap).map(function (key) {
        return dateMap[key];
      }).sort(function (a, b) {
        return b.stamp - a.stamp;
      });
    }

    function renderRakebackTotalsModal() {
      if (!totalsList) return;
      var roomTotals = Object.keys(ROOM_LABELS).map(function (room) {
        var totals = getRakebackTotals(getRakebackSavedRowsForTotals(room));
        return { room: room, rake: totals.rake, amount: totals.amount };
      });
      var roomGrandTotal = roomTotals.reduce(function (total, item) {
        total.rake += parseNumber(item.rake);
        total.amount += parseNumber(item.amount);
        return total;
      }, { rake: 0, amount: 0 });
      var roomHtml = roomTotals.map(function (item) {
        return '<div class="admin-report-rakeback-totals-modal__row">' +
          '<span class="admin-report-rakeback-totals-modal__room">' + escapeHtml(ROOM_LABELS[item.room] || item.room) + "</span>" +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(item.rake, item.amount)) + "</span>" +
        "</div>";
      }).join("") +
        '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--grand">' +
          '<span class="admin-report-rakeback-totals-modal__room">Итого</span>' +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(roomGrandTotal.rake, roomGrandTotal.amount)) + "</span>" +
        "</div>";
      var dateRows = getRakebackDateTotals(getRakebackSavedRowsForTotals());
      var dateGrandTotal = dateRows.reduce(function (total, day) {
        total.rake += parseNumber(day.rake);
        total.amount += parseNumber(day.amount);
        return total;
      }, { rake: 0, amount: 0 });
      var dateHtml = dateRows.length ? '<div class="admin-report-rakeback-totals-modal__section-title">Итого по датам</div>' + dateRows.map(function (day) {
        return '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--date">' +
          '<span class="admin-report-rakeback-totals-modal__room">' + escapeHtml(formatEntryDateLabel(day.stamp)) + "</span>" +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(day.rake, day.amount)) + "</span>" +
        "</div>";
      }).join("") +
        '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--grand">' +
          '<span class="admin-report-rakeback-totals-modal__room">Итого</span>' +
          '<span class="admin-report-rakeback-totals-modal__amount">' + escapeHtml(formatRakebackSummaryPair(dateGrandTotal.rake, dateGrandTotal.amount)) + "</span>" +
        "</div>" : "";
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
    var sharedRows = normalizeDraftRows(readPendingRakebackRows()).map(function (row) {
      row.saved = false;
      row.persisted = false;
      return row;
    });
    var archiveWeekOpen = {};
    var archiveWeekRoomActive = {};
    var sharedUpdatedAt = "";
    var sharedCurrentSnapshotLoaded = false;
    var sharedSaveQueue = Promise.resolve();
    var sharedAutoLoadStarted = false;
    var sharedAutoLoadRetryCount = 0;
    var sharedArchiveLoaded = false;
    var sharedArchiveLoading = false;
    var sharedArchiveAvailable = false;
    var saving = false;
    var loading = false;
    var locallyDeletedRowKeys = {};
    var locallyDeletedGroupIds = {};
    var templateDefaultSaveTimers = {};
    var archiveWeekRoomOpen = {};

    function getTemplateIds(room) {
      room = normalizeRoom(room);
      var ids = (templates[room] || []).slice();
      sharedRows.forEach(function (row) {
        if (!isCarryForwardTemplateRow(row) || normalizeRoom(row.room) !== room) return;
        var playerId = String(row.playerId || row.id || "").trim();
        if (playerId) ids.push(playerId);
      });
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

    function rowWeekStart(row) {
      var time = rowEntryTime(row);
      // Week membership must use the same 06:00 MSK report cutoff as the
      // server. The 18:00 entry-date cutoff is only for the date label; using
      // it here moved Monday rows into the previous week after a server save.
      return time ? getRakebackReportWeekStart(time) : 0;
    }

    function isArchivedRakebackRow(row) {
      if (!row || isCarryForwardTemplateRow(row)) return false;
      var weekStart = rowWeekStart(row);
      return !!(weekStart && weekStart < getCurrentRakebackWeekStart());
    }

    function isCurrentRakebackRow(row) {
      if (!row || isCarryForwardTemplateRow(row)) return false;
      var weekStart = rowWeekStart(row);
      return !weekStart || weekStart >= getCurrentRakebackWeekStart();
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

    function getRakeSortValue(row, addonsByGroup) {
      if (!row) return 0;
      var groupId = String(row.groupId || "").trim();
      var values = [parseNumber(row.rake)];
      if (getSharedRowKind(row) !== "addon" && groupId && addonsByGroup && addonsByGroup[groupId]) {
        addonsByGroup[groupId].forEach(function (addon) {
          values.push(parseNumber(addon && addon.rake));
        });
      }
      return values.reduce(function (max, value) {
        return value > max ? value : max;
      }, 0);
    }

    function compareRowsForSort(a, b, addonsByGroup) {
      var mode = getSortMode();
      if (mode === "rake") return getRakeSortValue(b, addonsByGroup) - getRakeSortValue(a, addonsByGroup) || compareRowsByEntryDateDesc(a, b);
      if (mode === "percent") return parseNumber(b.percent) - parseNumber(a.percent) || compareRowsByEntryDateDesc(a, b);
      if (mode === "created_percent") {
        return compareRowsByEntryDateDesc(a, b) || parseNumber(b.percent) - parseNumber(a.percent) || parseNumber(b.rake) - parseNumber(a.rake);
      }
      if (mode === "standard") return parseNumber(a.standardAt || a.createdAt) - parseNumber(b.standardAt || b.createdAt) || compareRowsByEntryDateDesc(a, b);
      if (mode === "color") return getSharedRowColorOrder(a) - getSharedRowColorOrder(b) || compareRowsByEntryDateDesc(a, b);
      return compareRowsByEntryDateDesc(a, b);
    }

    function sortRows(rows, addonsByGroup) {
      return rows.slice().sort(function (a, b) {
        return compareRowsForSort(a, b, addonsByGroup);
      });
    }

    function orderSharedRowsForDisplay(rows) {
      rows = Array.isArray(rows) ? rows : [];
      var addonsByGroup = {};
      rows.forEach(function (row) {
        var groupId = String(row.groupId || "").trim();
        if (!groupId || getSharedRowKind(row) !== "addon") return;
        if (!addonsByGroup[groupId]) addonsByGroup[groupId] = [];
        addonsByGroup[groupId].push(row);
      });
      Object.keys(addonsByGroup).forEach(function (groupId) {
        addonsByGroup[groupId].sort(compareRowsByEntryDateAsc);
      });
      return rows.slice().sort(function (a, b) {
        var dayOrder = rowEntryDay(b) - rowEntryDay(a);
        if (dayOrder) return dayOrder;
        return compareRowsForSort(a, b, addonsByGroup);
      });
    }

    function getSharedRowsForTotal(room) {
      var query = getSearchQuery();
      return orderSharedRowsForDisplay(sharedRows.filter(function (row) {
        if (isCarryForwardTemplateRow(row)) return false;
        if (!isCurrentRakebackRow(row)) return false;
        if (room && normalizeRoom(row.room) !== normalizeRoom(room)) return false;
        var playerId = String(row.playerId || row.id || "").trim().toLowerCase();
        return !query || playerId.indexOf(query) !== -1;
      }));
    }

    function getVisibleSharedRows() {
      return getSharedRowsForTotal(activeRoom);
    }

    function dataRowMatchesQuickFilter(row) {
      if (activeQuickFilter === "with_rb") return hasRakebackReportValue(row);
      if (activeQuickFilter === "without_rb") return !hasRakebackReportValue(row);
      if (activeQuickFilter === "changed") return !!(row && row.saved !== true);
      return true;
    }

    function filterRowsForQuickTotals(rows) {
      return (Array.isArray(rows) ? rows : []).filter(dataRowMatchesQuickFilter);
    }

    function getFinalRakeTotal(rows) {
      var finalRakeByGroup = {};
      var groupOrder = [];
      (Array.isArray(rows) ? rows : []).slice().sort(compareRowsByEntryDateAsc).forEach(function (row, index) {
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
        return row && (activeQuickFilter === "changed" || row.saved === true);
      }).sort(compareRowsByEntryDateAsc);
      var previousRakeByGroup = {};
      return {
        rake: getFinalRakeTotal(rows),
        amount: rows.reduce(function (sum, row, index) {
          var groupKey = String(row.groupId || "").trim() || ("row_" + index);
          var currentRake = parseNumber(row.rake);
          var previousRake = previousRakeByGroup[groupKey] != null ? previousRakeByGroup[groupKey] : 0;
          var effectiveRake = getSharedRowKind(row) === "addon" ? currentRake - previousRake : currentRake;
          var roomAmount = effectiveRake * parseNumber(row.percent) / 100 * (row.discount15 ? 0.85 : 1);
          previousRakeByGroup[groupKey] = currentRake;
          return sum + getReportAmount(row.room, Math.round(roomAmount * 100) / 100);
        }, 0),
      };
    }

    function getArchiveRows(room) {
      var query = getSearchQuery();
      return orderSharedRowsForDisplay(sharedRows.filter(function (row) {
        if (!row || row.saved !== true || !hasRakebackReportValue(row)) return false;
        if (!rakebackRowMatchesPeriod(row)) return false;
        if (room && normalizeRoom(row.room) !== normalizeRoom(room)) return false;
        var playerId = String(row.playerId || row.id || "").trim().toLowerCase();
        return !query || playerId.indexOf(query) !== -1;
      }));
    }

    function getMoscowDateStart(offsetDays) {
      var now = new Date(Date.now() + MOSCOW_UTC_OFFSET_MS);
      return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + (offsetDays || 0)) - MOSCOW_UTC_OFFSET_MS;
    }

    function getRakebackPeriodBounds() {
      var today = getMoscowDateStart(0);
      var todayDate = new Date(today + MOSCOW_UTC_OFFSET_MS);
      var weekday = (todayDate.getUTCDay() + 6) % 7;
      var monthStart = Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth(), 1) - MOSCOW_UTC_OFFSET_MS;
      if (activePeriod === "today") return [today, today + RAKEBACK_DAY_MS - 1];
      if (activePeriod === "yesterday") return [today - RAKEBACK_DAY_MS, today - 1];
      if (activePeriod === "current_week") return [today - weekday * RAKEBACK_DAY_MS, today + RAKEBACK_DAY_MS - 1];
      if (activePeriod === "last_week") return [today - (weekday + 7) * RAKEBACK_DAY_MS, today - weekday * RAKEBACK_DAY_MS - 1];
      if (activePeriod === "current_month") return [monthStart, today + RAKEBACK_DAY_MS - 1];
      if (activePeriod === "last_month") {
        var lastMonthStart = Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth() - 1, 1) - MOSCOW_UTC_OFFSET_MS;
        return [lastMonthStart, monthStart - 1];
      }
      if (activePeriod === "custom") {
        var from = periodDateFrom && periodDateFrom.value ? Date.parse(periodDateFrom.value + "T00:00:00+03:00") : 0;
        var to = periodDateTo && periodDateTo.value ? Date.parse(periodDateTo.value + "T00:00:00+03:00") + RAKEBACK_DAY_MS - 1 : 0;
        return from || to ? [from || 0, to || Number.MAX_SAFE_INTEGER] : null;
      }
      return null;
    }

    function getNewRowEntryTime() {
      var now = Date.now();
      var bounds = getRakebackPeriodBounds();
      if (!bounds) return now;
      var from = Number(bounds[0]) || 0;
      var to = Number(bounds[1]);
      if (!isFinite(to)) to = now;
      if (now >= from && now <= to) return now;
      if (now > to) return Math.max(from, to - (RAKEBACK_DAY_MS / 2));
      return Math.min(to, from + (RAKEBACK_DAY_MS / 2));
    }

    function rakebackRowMatchesPeriod(row) {
      var bounds = getRakebackPeriodBounds();
      if (!bounds) return true;
      var stamp = rowEntryTime(row) || normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt);
      return stamp >= bounds[0] && stamp <= bounds[1];
    }

    function activePeriodNeedsArchive() {
      if (activePeriod === "all") return true;
      var bounds = getRakebackPeriodBounds();
      return !!(bounds && bounds[0] < getCurrentRakebackWeekStart());
    }

    function syncPeriodTabs() {
      Array.prototype.slice.call(periodTabs || []).forEach(function (tab) {
        var selected = tab.getAttribute("data-rakeback-period") === activePeriod;
        tab.classList.toggle("admin-report-rakeback-period__tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
      if (customPeriodEl) customPeriodEl.hidden = activePeriod !== "custom";
    }

    function getArchiveWeeks(rows) {
      var byWeek = {};
      (Array.isArray(rows) ? rows : []).forEach(function (row) {
        var weekStart = rowWeekStart(row);
        if (!weekStart) return;
        if (!byWeek[weekStart]) byWeek[weekStart] = [];
        byWeek[weekStart].push(row);
      });
      return Object.keys(byWeek).map(function (key) {
        return { weekStart: Number(key), rows: orderSharedRowsForDisplay(byWeek[key]) };
      }).sort(function (a, b) {
        return b.weekStart - a.weekStart;
      });
    }

    function getArchiveWeekKey(weekStart) {
      return String(Number(weekStart) || 0);
    }

    function getArchiveWeekRooms(rows) {
      var seen = {};
      (Array.isArray(rows) ? rows : []).forEach(function (row) {
        seen[normalizeRoom(row && row.room)] = true;
      });
      var rooms = ARCHIVE_ROOM_TABS.slice();
      Object.keys(ROOM_LABELS).forEach(function (room) {
        if (rooms.indexOf(room) === -1 && seen[room]) rooms.push(room);
      });
      return rooms;
    }

    function getArchiveRowsForRoom(rows, room) {
      room = normalizeRoom(room);
      return (Array.isArray(rows) ? rows : []).filter(function (row) {
        return normalizeRoom(row && row.room) === room;
      });
    }

    function getArchiveRoomOrder() {
      return Object.keys(ROOM_LABELS);
    }

    function formatArchiveMetric(value) {
      return String(Math.round(parseNumber(value)));
    }

    function formatArchiveWeekRange(weekStart) {
      return formatArchiveWeekDate(weekStart, 0) + " - " + formatArchiveWeekDate(weekStart, 6);
    }

    function getArchiveDateTotalsMap(rows) {
      var map = {};
      getRakebackDateTotals(rows).forEach(function (day) {
        if (day && day.key) map[day.key] = day;
      });
      return map;
    }

    function getArchiveWeekRoomTotals(rows) {
      var totals = {};
      getArchiveRoomOrder().forEach(function (room) {
        var roomRows = getArchiveRowsForRoom(rows, room);
        var roomTotals = getRakebackTotals(roomRows);
        totals[room] = {
          rake: roomTotals.rake,
          amount: roomTotals.amount,
          count: roomRows.length,
        };
      });
      return totals;
    }

    function createArchiveTableWeekSeparator(week) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var button = document.createElement("button");
      var label = document.createElement("span");
      var meta = document.createElement("small");
      var weekKey = getArchiveWeekKey(week && week.weekStart);
      var totals = getRakebackTotals(week && week.rows);
      var open = archiveWeekOpen[weekKey] === true;
      tr.className = "admin-report-rakeback-week-separator";
      tr.setAttribute("data-rakeback-generated", "1");
      td.colSpan = 7;
      button.type = "button";
      button.className = "admin-report-rakeback-week-separator__button";
      button.setAttribute("data-rakeback-week-toggle", weekKey);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      label.textContent = formatArchiveWeekRange(week && week.weekStart);
      meta.textContent = "Рейк " + formatArchiveMetric(totals.rake) + " · РБ " + formatArchiveMetric(totals.amount);
      button.appendChild(label);
      button.appendChild(meta);
      td.appendChild(button);
      tr.appendChild(td);
      return tr;
    }

    function createArchiveTableRoomTabs(week) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var wrap = document.createElement("div");
      var weekKey = getArchiveWeekKey(week && week.weekStart);
      var roomTotals = getArchiveWeekRoomTotals(week && week.rows);
      tr.className = "admin-report-rakeback-week-room-tabs";
      tr.setAttribute("data-rakeback-generated", "1");
      td.colSpan = 7;
      wrap.className = "admin-report-rakeback-week-room-tabs__grid";
      getArchiveRoomOrder().forEach(function (room) {
        var key = weekKey + "|" + room;
        var open = archiveWeekRoomOpen[key] !== false;
        var totals = roomTotals[room] || { rake: 0, amount: 0, count: 0 };
        var button = document.createElement("button");
        var label = document.createElement("span");
        var meta = document.createElement("small");
        button.type = "button";
        button.className = "admin-report-rakeback-week-room-tabs__button";
        button.setAttribute("data-rakeback-week-room-toggle", key);
        button.setAttribute("aria-expanded", open ? "true" : "false");
        button.classList.toggle("admin-report-rakeback-week-room-tabs__button--empty", !totals.count);
        label.textContent = ROOM_LABELS[room] || room;
        meta.textContent = "Рейк " + formatArchiveMetric(totals.rake) + " · РБ " + formatArchiveMetric(totals.amount);
        button.appendChild(label);
        button.appendChild(meta);
        wrap.appendChild(button);
      });
      td.appendChild(wrap);
      tr.appendChild(td);
      return tr;
    }

    function createArchiveTableWeekTotalRow(totals) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var row = document.createElement("div");
      var label = document.createElement("span");
      var value = document.createElement("span");
      tr.className = "admin-report-rakeback-week-total";
      tr.setAttribute("data-rakeback-generated", "1");
      td.colSpan = 7;
      row.className = "admin-report-rakeback-week-total__row";
      label.className = "admin-report-rakeback-week-total__label";
      value.className = "admin-report-rakeback-week-total__value";
      label.textContent = "Итого по всем румам";
      value.textContent = formatArchiveMetric(totals && totals.amount);
      row.appendChild(label);
      row.appendChild(value);
      td.appendChild(row);
      tr.appendChild(td);
      return tr;
    }

    function createArchiveTableDateSeparator(entryAt, totals) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var label = document.createElement("span");
      var meta = document.createElement("small");
      totals = totals || { rake: 0, amount: 0 };
      tr.className = "admin-report-rakeback-date-separator";
      tr.setAttribute("data-rakeback-generated", "1");
      td.colSpan = 7;
      label.textContent = formatEntryDateLabel(entryAt);
      meta.textContent = "Рейк " + formatArchiveMetric(totals.rake) + " · РБ " + formatArchiveMetric(totals.amount);
      td.appendChild(label);
      td.appendChild(meta);
      tr.appendChild(td);
      return tr;
    }

    function appendArchiveTableWeek(fragment, week) {
      var weekKey = getArchiveWeekKey(week && week.weekStart);
      var open = archiveWeekOpen[weekKey] === true;
      fragment.appendChild(createArchiveTableWeekSeparator(week));
      if (!open) return;
      fragment.appendChild(createArchiveTableRoomTabs(week));
      fragment.appendChild(createArchiveTableWeekTotalRow(getRakebackTotals(week && week.rows)));
      getArchiveRoomOrder().forEach(function (room) {
        var roomOpen = archiveWeekRoomOpen[weekKey + "|" + room] !== false;
        var rows = getArchiveRowsForRoom(week && week.rows, room);
        var dateTotals = getArchiveDateTotalsMap(rows);
        var lastDateKey = "";
        var baseIndex = 0;
        var baseEntryByGroup = {};
        if (!roomOpen) return;
        rows.forEach(function (row) {
          var groupId = String(row && row.groupId || "").trim();
          var entryAt = rowEntryTime(row) || normalizeTimeValue(row && (row.entryAddedAt || row.createdAt || row.standardAt || Date.now()));
          var dateKey = getDateInputValue(entryAt);
          var renderRow = row;
          if (dateKey && dateKey !== lastDateKey) {
            fragment.appendChild(createArchiveTableDateSeparator(entryAt, dateTotals[dateKey]));
            lastDateKey = dateKey;
          }
          if (getSharedRowKind(row) !== "addon") {
            baseIndex += 1;
            baseEntryByGroup[groupId] = entryAt;
          } else {
            renderRow = {};
            Object.keys(row || {}).forEach(function (key) { renderRow[key] = row[key]; });
            renderRow.baseEntryAt = baseEntryByGroup[groupId] || entryAt;
          }
          var domRow = createSharedRow(renderRow, Math.max(0, baseIndex - 1));
          domRow.setAttribute("data-rakeback-archive-row", "1");
          fragment.appendChild(domRow);
        });
      });
    }

    function getArchiveWeekActiveRoom(week) {
      var weekKey = getArchiveWeekKey(week && week.weekStart);
      var rooms = getArchiveWeekRooms(week && week.rows);
      var savedRoom = archiveWeekRoomActive[weekKey] ? normalizeRoom(archiveWeekRoomActive[weekKey]) : "";
      if (savedRoom && rooms.indexOf(savedRoom) !== -1) return savedRoom;
      for (var i = 0; i < rooms.length; i += 1) {
        if (getArchiveRowsForRoom(week && week.rows, rooms[i]).length) return rooms[i];
      }
      return rooms[0] || "P21";
    }

    function activateArchiveWeekRoom(details, room) {
      if (!details) return;
      room = normalizeRoom(room);
      var weekKey = details.getAttribute("data-rakeback-archive-week") || "";
      if (weekKey) archiveWeekRoomActive[weekKey] = room;
      Array.prototype.slice.call(details.querySelectorAll("[data-rakeback-archive-room-tab]")).forEach(function (tab) {
        var selected = normalizeRoom(tab.getAttribute("data-rakeback-archive-room-tab")) === room;
        tab.classList.toggle("admin-report-rakeback-archive-week__room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
      Array.prototype.slice.call(details.querySelectorAll("[data-rakeback-archive-room-panel]")).forEach(function (panel) {
        panel.hidden = normalizeRoom(panel.getAttribute("data-rakeback-archive-room-panel")) !== room;
      });
    }

    function createArchiveWeekRoomTabs(week, activeRoom) {
      var tabs = document.createElement("div");
      tabs.className = "admin-report-rakeback-archive-week__room-tabs";
      tabs.setAttribute("role", "tablist");
      tabs.setAttribute("aria-label", "Румы недели");
      getArchiveWeekRooms(week.rows).forEach(function (room) {
        var rows = getArchiveRowsForRoom(week.rows, room);
        var totals = getRakebackTotals(rows);
        var selected = room === activeRoom;
        var tab = document.createElement("button");
        tab.type = "button";
        tab.className = "admin-report-rakeback-archive-week__room-tab";
        tab.setAttribute("data-rakeback-archive-room-tab", room);
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.classList.toggle("admin-report-rakeback-archive-week__room-tab--active", selected);
        tab.classList.toggle("admin-report-rakeback-archive-week__room-tab--empty", rows.length === 0);
        tab.innerHTML =
          '<span class="admin-report-rakeback-archive-week__room-tab-label">' + escapeHtml(ROOM_LABELS[room] || room) + "</span>" +
          '<small class="admin-report-rakeback-archive-week__room-tab-total">' + escapeHtml(formatRakebackSummaryPair(totals.rake, totals.amount)) + "</small>";
        tabs.appendChild(tab);
      });
      return tabs;
    }

    function createArchiveWeekRoomPanel(week, room, activeRoom) {
      var panel = document.createElement("div");
      var rows = getArchiveRowsForRoom(week.rows, room);
      panel.className = "admin-report-rakeback-archive-week__room-panel";
      panel.setAttribute("data-rakeback-archive-room-panel", room);
      panel.setAttribute("role", "tabpanel");
      panel.hidden = room !== activeRoom;
      if (!rows.length) {
        var empty = document.createElement("div");
        empty.className = "admin-report-rakeback-archive-week__empty";
        empty.textContent = "Записей нет";
        panel.appendChild(empty);
        return panel;
      }
      var list = document.createElement("div");
      list.className = "admin-report-rakeback-archive-week__list";
      var header = document.createElement("div");
      header.className = "admin-report-rakeback-archive-week__item admin-report-rakeback-archive-week__item--head";
      header.innerHTML =
        '<span class="admin-report-rakeback-archive-week__num">№</span>' +
        '<span class="admin-report-rakeback-archive-week__date">Дата</span>' +
        '<span class="admin-report-rakeback-archive-week__room">Рум</span>' +
        '<span class="admin-report-rakeback-archive-week__id">ID</span>' +
        '<span class="admin-report-rakeback-archive-week__rake">Рейк</span>' +
        '<span class="admin-report-rakeback-archive-week__percent">%</span>' +
        '<span class="admin-report-rakeback-archive-week__amount">РБ</span>';
      list.appendChild(header);
      var baseIndex = 0;
      var previousRakeByGroup = {};
      rows.forEach(function (row) {
        var item = document.createElement("div");
        var rowRoom = ROOM_LABELS[normalizeRoom(row.room)] || row.room || "";
        var amount = row.amount != null && row.amount !== "" ? row.amount : getReportAmount(row.room, rowAmount(row));
        var kind = getSharedRowKind(row);
        var isAddon = kind === "addon";
        var groupId = String(row.groupId || "").trim();
        var currentRake = parseNumber(row.rake);
        var previousRake = groupId && previousRakeByGroup[groupId] != null ? previousRakeByGroup[groupId] : 0;
        var addonDelta = currentRake - previousRake;
        var rakeHtml = isAddon
          ? '<span class="admin-report-rakeback-archive-week__rake-main">' + escapeHtml((addonDelta >= 0 ? "+" : "") + (formatInputNumber(addonDelta) || "0")) + '</span><small class="admin-report-rakeback-archive-week__rake-sub">итого ' + escapeHtml(formatInputNumber(currentRake) || "0") + "</small>"
          : '<span class="admin-report-rakeback-archive-week__rake-main">' + escapeHtml(formatInputNumber(row.rake) || "0") + "</span>";
        if (!isAddon) baseIndex += 1;
        item.className = "admin-report-rakeback-archive-week__item" + (isAddon ? " admin-report-rakeback-archive-week__item--addon" : "");
        item.innerHTML =
          '<span class="admin-report-rakeback-archive-week__num">' + (isAddon ? '<span title="Подзапись" aria-label="Подзапись">↳</span>' : escapeHtml(String(baseIndex))) + "</span>" +
          '<span class="admin-report-rakeback-archive-week__date">' + escapeHtml(formatEntryDateLabel(rowEntryTime(row) || row.entryAddedAt || row.createdAt || row.standardAt)) + "</span>" +
          '<span class="admin-report-rakeback-archive-week__room">' + escapeHtml(rowRoom) + "</span>" +
          '<span class="admin-report-rakeback-archive-week__id">' + escapeHtml(row.playerId || row.id || "") + "</span>" +
          '<span class="admin-report-rakeback-archive-week__rake">' + rakeHtml + "</span>" +
          '<span class="admin-report-rakeback-archive-week__percent">' + escapeHtml(formatInputNumber(row.percent) || "0") + "%</span>" +
          '<span class="admin-report-rakeback-archive-week__amount">' + escapeHtml(formatInputNumber(amount) || "0") + "</span>";
        list.appendChild(item);
        if (!isAddon || row.rake != null && row.rake !== "") previousRakeByGroup[groupId] = currentRake;
      });
      panel.appendChild(list);
      return panel;
    }

    function createArchiveWeekRow(week) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var details = document.createElement("details");
      var summary = document.createElement("summary");
      var totals = getRakebackTotals(week.rows);
      var weekKey = getArchiveWeekKey(week.weekStart);
      var activeRoom = getArchiveWeekActiveRoom(week);
      var panels = document.createElement("div");
      tr.className = "admin-report-rakeback-archive-week-row";
      tr.setAttribute("data-rakeback-generated", "1");
      td.colSpan = 7;
      details.className = "admin-report-rakeback-archive-week";
      details.setAttribute("data-rakeback-archive-week", weekKey);
      if (archiveWeekOpen[weekKey] === true) details.open = true;
      details.addEventListener("toggle", function () {
        archiveWeekOpen[weekKey] = details.open;
      });
      summary.className = "admin-report-rakeback-archive-week__summary";
      summary.setAttribute("data-rakeback-archive-week-summary", "");
      summary.innerHTML =
        '<span class="admin-report-rakeback-archive-week__title">Неделя ' + escapeHtml(formatArchiveWeekLabel(week.weekStart)) + "</span>" +
        '<span class="admin-report-rakeback-archive-week__total">' + escapeHtml(formatRakebackSummaryPair(totals.rake, totals.amount)) + "</span>";
      panels.className = "admin-report-rakeback-archive-week__panels";
      getArchiveWeekRooms(week.rows).forEach(function (room) {
        panels.appendChild(createArchiveWeekRoomPanel(week, room, activeRoom));
      });
      details.appendChild(summary);
      details.appendChild(createArchiveWeekRoomTabs(week, activeRoom));
      details.appendChild(panels);
      td.appendChild(details);
      tr.appendChild(td);
      return tr;
    }

    function getConfiguredReportDateKey() {
      var value = "";
      if (typeof config.getRakebackReportDateKey === "function") value = config.getRakebackReportDateKey();
      else if (typeof config.getCurrentReportDateKey === "function") value = config.getCurrentReportDateKey();
      return normalizeReportDateKey(value) || getCurrentReportDateKey();
    }

    function getRowReportDateKey(row) {
      if (!row) return "";
      return getDateInputValue(rowEntryTime(row) || row.entryAddedAt || row.createdAt || row.standardAt || Date.now());
    }

    function getLatestReportDateKey(rows) {
      var latestStamp = 0;
      (Array.isArray(rows) ? rows : []).forEach(function (row) {
        var stamp = rowEntryTime(row) || normalizeTimeValue(row && (row.entryAddedAt || row.createdAt || row.standardAt), 0);
        if (stamp > latestStamp) latestStamp = stamp;
      });
      return latestStamp ? getDateInputValue(latestStamp) : "";
    }

    function getUnsentReportRakebackRows() {
      var rows = mergeSharedRowsFromDom({ savedOnly: true }).filter(function (row) {
        return row &&
          String(row.playerId || "").trim() &&
          isCurrentRakebackRow(row) &&
          isCurrentRakebackReportOwner(row.ownerId) &&
          !isRakebackRowReported(row) &&
          hasRakebackReportValue(row);
      });
      if (!rows.length) return rows;
      var reportDateKey = getConfiguredReportDateKey();
      var datedRows = reportDateKey ? rows.filter(function (row) {
        return getRowReportDateKey(row) === reportDateKey;
      }) : [];
      if (datedRows.length) return datedRows;
      var latestDateKey = getLatestReportDateKey(rows);
      return latestDateKey ? rows.filter(function (row) {
        return getRowReportDateKey(row) === latestDateKey;
      }) : rows;
    }

    function getPulledTemplateIdSet(room) {
      var set = {};
      room = normalizeRoom(room);
      sharedRows.forEach(function (row) {
        if (!row || (row.saved !== true && row.persisted !== true) || getSharedRowKind(row) === "addon") return;
        if (isCarryForwardTemplateRow(row)) return;
        if (!isCurrentRakebackRow(row)) return;
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

    function commitPendingDelete() {
      if (!pendingDelete) return;
      var item = pendingDelete;
      pendingDelete = null;
      if (item.timer) clearTimeout(item.timer);
      if (undoEl) undoEl.hidden = true;
      if (!item.persisted) return;
      if (item.kind === "addon") {
        saveSharedDraftNow(true, {
          upsertGroupIds: [item.groupId],
          deleteRowKeys: item.serverKey ? [item.serverKey] : [],
          auditAction: "delete",
          auditDeletedCount: 1,
        });
      } else {
        saveSharedDraftNow(true, {
          deleteGroupIds: [item.groupId],
          auditAction: "delete",
          auditDeletedCount: Math.max(1, Array.isArray(item.rows) ? item.rows.length : 1),
        });
      }
    }

    function offerDeleteUndo(item) {
      commitPendingDelete();
      pendingDelete = item;
      if (undoTextEl) undoTextEl.textContent = item.kind === "addon" ? "Подзапись удалена" : "Запись удалена";
      if (undoEl) undoEl.hidden = false;
      item.timer = setTimeout(commitPendingDelete, 7000);
    }

    function undoPendingDelete() {
      if (!pendingDelete) return;
      var item = pendingDelete;
      pendingDelete = null;
      if (item.timer) clearTimeout(item.timer);
      if (undoEl) undoEl.hidden = true;
      if (item.kind === "addon") delete locallyDeletedRowKeys[item.localKey];
      else delete locallyDeletedGroupIds[item.groupId];
      var restoredKeys = {};
      item.rows.forEach(function (row) { restoredKeys[getSharedRowLocalKey(row)] = true; });
      sharedRows = item.rows.concat(mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (row) {
        return !restoredKeys[getSharedRowLocalKey(row)];
      }));
      render();
      setStatus("Удаление отменено");
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
        roomAmount = normalizeRakebackRoomAmount(room, roomAmount);
        var amount = getReportAmount(room, roomAmount);
        if (kind !== "addon" || hasRakeInputValue) previousRakeByGroup[groupId] = rake;
        var reportedAt = row.getAttribute("data-rakeback-reported-at") || "";
        var reportId = row.getAttribute("data-rakeback-report-id") || "";
        var accounted = row.getAttribute("data-rakeback-accounted") === "1" || !!reportedAt || !!reportId;
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
          reportId: reportId,
          reportedAt: reportedAt,
          accounted: accounted,
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
        roomAmount = normalizeRakebackRoomAmount(room, roomAmount);
        var carryForward = row.carryForward === true || row.templateCarryForward === true;
        var reportedAt = row.reportedAt || "";
        var reportId = row.reportId || "";
        var createdAt = row.createdAt || row.addedAt || row.created || Date.now();
        var entryAddedAt = row.entryAddedAt || row.firstAddedAt || createdAt;
        if (!carryForward && !reportedAt && !reportId && String(row.groupId || "").indexOf("shell_template_") === 0) {
          // A newly filled template is dated when its value was entered, not
          // when the empty shell first appeared. Also repairs already stored
          // rows that inherited Monday's template date.
          entryAddedAt = createdAt;
        }
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
          createdAt: createdAt,
          standardAt: row.standardAt || row.orderAt || row.sortAt || row.createdAt || Date.now(),
          entryAddedAt: entryAddedAt,
          reportId: reportId,
          reportedAt: reportedAt,
          accounted: row.accounted === true || !!reportedAt || !!reportId,
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
        return row && (row.saved !== true || row.persisted !== true);
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

    function mergeLoadedRowsIntoExisting(loadedRows, existingRows) {
      loadedRows = Array.isArray(loadedRows) ? loadedRows : [];
      existingRows = Array.isArray(existingRows) ? existingRows : [];
      var loadedByKey = {};
      loadedRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key) loadedByKey[key] = row;
      });
      var seen = {};
      var merged = existingRows.map(function (row) {
        var key = getSharedRowLocalKey(row);
        if (!key || !loadedByKey[key]) return row;
        seen[key] = true;
        return mergeServerRowWithLocalVisualState(loadedByKey[key], row);
      });
      loadedRows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key && seen[key]) return;
        merged.push(row);
        if (key) seen[key] = true;
      });
      return merged;
    }

    function mergeRowsWithPatchedLocalUpserts(rows, localRows, patch) {
      rows = Array.isArray(rows) ? rows : [];
      localRows = Array.isArray(localRows) ? localRows : [];
      if (!patch || !patch.upsertGroupIds || !patch.upsertGroupIds.length) return rows;
      var upsertSet = listToSet(patch.upsertGroupIds);
      var presentKeys = {};
      rows.forEach(function (row) {
        var key = getSharedRowLocalKey(row);
        if (key) presentKeys[key] = true;
      });
      var missingRows = [];
      localRows.forEach(function (row) {
        var groupId = String(row && row.groupId || "").trim();
        var key = getSharedRowLocalKey(row);
        if (!groupId || !upsertSet[groupId] || !key || presentKeys[key]) return;
        if (row.saved !== true || !hasSharedDraftRowData(row) || hasNegativeSharedDraftRowValue(row)) return;
        missingRows.push(row);
        presentKeys[key] = true;
      });
      return missingRows.length ? missingRows.concat(rows) : rows;
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
      function runSave() {
        return performSharedDraftSave(showStatus, patch);
      }
      sharedSaveQueue = sharedSaveQueue.then(runSave, runSave);
      return sharedSaveQueue;
    }

    function performSharedDraftSave(showStatus, patch) {
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
      var preserveScroll = !!(patch && patch.preserveScroll);
      var payload = {
        action: "rakeback_draft_save",
        date: "shared",
        rakebackDraftScope: archiveMode ? "archive" : "currentWeek",
        allowAccountedRakebackOverwrite: archiveMode,
        rakebackRows: getRowsForSave(localRows, patchMode ? patch : null),
      };
      if (patchMode) {
        payload.rakebackPatch = true;
        payload.deleteRakebackGroupIds = patch.deleteGroupIds || [];
        payload.deleteRakebackRowKeys = patch.deleteRowKeys || [];
      }
      if (patch && patch.auditAction) {
        payload.rakebackAuditAction = patch.auditAction;
        payload.rakebackAuditDeletedCount = Number(patch.auditDeletedCount) || 0;
      }
      saving = true;
      syncControls();
      return requestJson(base + "/api/admin-report-shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAuthBody(payload)),
      }).then(function (data) {
        if (data && data.ok && data.rakebackDraft) {
          var serverRows = filterLocallyDeletedSharedRows(normalizeDraftRows(data.rakebackDraft.rows));
          var currentLocalRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          if (archiveMode) {
            sharedRows = mergeLoadedRowsIntoExisting(serverRows, currentLocalRows);
            sharedArchiveLoaded = true;
          } else {
            // Several IDs/subrows can be saved before the previous request
            // returns. Preserve the current table so an older response cannot
            // redraw it from an earlier snapshot.
            sharedRows = mergeLoadedRowsIntoExisting(serverRows, currentLocalRows);
            sharedArchiveAvailable = data.rakebackDraft.hasArchive === true || sharedArchiveAvailable;
          }
          sharedUpdatedAt = data.rakebackDraft.updatedAt || sharedUpdatedAt;
          sharedCurrentSnapshotLoaded = true;
          sharedAudit = Array.isArray(data.rakebackDraft.audit) ? data.rakebackDraft.audit : sharedAudit;
          renderAudit();
          if (!skipRender) {
            var scrollSnapshot = preserveScroll ? captureRakebackScroll(body) : null;
            render();
            restoreRakebackScroll(scrollSnapshot);
          }
          else syncControls();
          if (showStatus) setStatus("Сохранено");
          writePendingRakebackRows(sharedRows);
          return true;
        }
        writePendingRakebackRows(localRows);
        if (showStatus) {
          var authFailed = data && (data.__httpStatus === 401 || data.__httpStatus === 403);
          setStatus(authFailed
            ? "Сессия истекла. Запись не пропала — войдите заново и нажмите ✓"
            : ((data && data.error) || "Не удалось сохранить. Запись оставлена в таблице"), true);
        }
        return false;
      }).catch(function () {
        writePendingRakebackRows(localRows);
        if (showStatus) setStatus("Нет связи. Запись не пропала и сохранена на этом устройстве", true);
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
      var includeArchive = options.includeArchive === true || options.scope === "archive";
      var markBusy = options.background !== true;
      var updatedAtWhenLoadStarted = sharedUpdatedAt;
      var q = getAuthQuery();
      q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared&scope=" + encodeURIComponent(includeArchive ? "archive" : "currentWeek");
      // `updatedAt` can outlive the rows when the modal is closed and filled
      // again. Only request `notModified` while a complete current snapshot is
      // actually still present in memory.
      if (sharedUpdatedAt && sharedCurrentSnapshotLoaded && !options.force && !includeArchive) {
        q += "&knownUpdatedAt=" + encodeURIComponent(sharedUpdatedAt);
      }
      if (markBusy) loading = true;
      if (includeArchive) sharedArchiveLoading = true;
      if (options.showStatus) setStatus(includeArchive ? "Загружаю архив…" : "Обновляю…", true);
      if (includeArchive && archiveMode) render();
      else if (markBusy) syncControls();
      return requestJson(base + "/api/admin-report-shifts" + q).then(function (data) {
        var draft = data && data.ok ? data.rakebackDraft : null;
        var responseUpdatedAt = draft && draft.updatedAt ? String(draft.updatedAt) : "";
        var currentUpdatedAtMs = sharedUpdatedAt ? Date.parse(sharedUpdatedAt) : 0;
        var responseUpdatedAtMs = responseUpdatedAt ? Date.parse(responseUpdatedAt) : 0;
        var saveFinishedWhileLoading = updatedAtWhenLoadStarted !== sharedUpdatedAt;
        var staleResponse = !!(
          sharedUpdatedAt && (
            (responseUpdatedAtMs && currentUpdatedAtMs && responseUpdatedAtMs < currentUpdatedAtMs) ||
            (!responseUpdatedAt && saveFinishedWhileLoading)
          )
        );
        if (staleResponse) {
          if (options.showStatus) setStatus("Данные уже обновлены");
          return true;
        }
        if (draft && draft.notModified === true) {
          if (!sharedCurrentSnapshotLoaded) {
            return loadSharedDraft({
              background: options.background === true,
              force: true,
              showStatus: options.showStatus === true,
            });
          }
          if (options.showStatus) setStatus("Уже актуально");
          return true;
        }
        var serverRows = filterLocallyDeletedSharedRows(normalizeDraftRows(draft && draft.rows));
        var localRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
        if (includeArchive) {
          sharedRows = mergeLoadedRowsIntoExisting(serverRows, localRows);
          sharedArchiveLoaded = true;
        } else {
          sharedRows = mergeRowsWithLocalUnsaved(serverRows, localRows);
          sharedArchiveAvailable = draft && draft.hasArchive === true;
          sharedCurrentSnapshotLoaded = true;
        }
        sharedUpdatedAt = draft && draft.updatedAt ? draft.updatedAt : sharedUpdatedAt;
        sharedAudit = draft && Array.isArray(draft.audit) ? draft.audit : sharedAudit;
        renderAudit();
        render();
        if (options.showStatus) setStatus(includeArchive ? "Архив загружен" : "Обновлено");
        return true;
      }).catch(function () {
        if (options.showStatus) setStatus(includeArchive ? "Не удалось загрузить архив" : "Не удалось обновить");
        return false;
      }).then(function (result) {
        if (includeArchive) sharedArchiveLoading = false;
        if (markBusy) {
          loading = false;
        }
        if (includeArchive && archiveMode) render();
        else if (markBusy) syncControls();
        return result;
      });
    }

    function scheduleSharedDraftAutoload() {
      if (sharedAutoLoadStarted || sharedCurrentSnapshotLoaded || archiveMode) return;
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
      var previousRakeByRow = new Map();
      var previousRakeByGroup = {};
      var addonIndexByRow = new Map();
      var addonCountByGroup = {};
      rows.slice().sort(function (a, b) {
        var aTime = normalizeTimeValue(a.getAttribute("data-rakeback-entry-added-at") || a.getAttribute("data-rakeback-created-at"));
        var bTime = normalizeTimeValue(b.getAttribute("data-rakeback-entry-added-at") || b.getAttribute("data-rakeback-created-at"));
        return aTime - bTime;
      }).forEach(function (row) {
        var groupId = row.getAttribute("data-rakeback-group") || "";
        if (row.getAttribute("data-rakeback-kind") === "addon") {
          addonCountByGroup[groupId] = (addonCountByGroup[groupId] || 0) + 1;
          addonIndexByRow.set(row, addonCountByGroup[groupId]);
        }
        previousRakeByRow.set(row, previousRakeByGroup[groupId] || 0);
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var hasRakeInputValue = !!(rakeInput && String(rakeInput.value || "").trim());
        if (row.getAttribute("data-rakeback-kind") !== "addon" || hasRakeInputValue) {
          previousRakeByGroup[groupId] = parseNumber(rakeInput ? rakeInput.value : "");
        }
      });
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
          var parentLabel = row.querySelector("[data-rakeback-addon-parent]");
          if (baseId && parentLabel) {
            var parentIdLabel = parentLabel.querySelector("[data-rakeback-addon-parent-id]");
            var addonIndexLabel = parentLabel.querySelector("[data-rakeback-addon-index]");
            var addonIndex = addonIndexByRow.get(row) || 1;
            if (parentIdLabel) parentIdLabel.textContent = "↳ " + baseId.value;
            if (addonIndexLabel) addonIndexLabel.textContent = "подзапись " + addonIndex;
            parentLabel.title = "Подзапись " + addonIndex + " записи " + baseId.value + " от " + formatEntryDateLabel(baseEntryByGroup[groupId]);
          }
        }
        updateSharedRowDateBadge(row, baseEntryByGroup[groupId] || row.getAttribute("data-rakeback-entry-added-at"));
        syncSharedRowAmount(row, row.getAttribute("data-rakeback-kind") === "addon" ? previousRakeByRow.get(row) : 0);
      });
      syncDuplicatePlayerIds();
    }

    function syncRoomTabs() {
      Array.prototype.slice.call(roomTabs || []).forEach(function (tab) {
        var selected = normalizeRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }

    function syncControls() {
      syncPeriodTabs();
      if (refreshBtn) {
        refreshBtn.hidden = false;
        refreshBtn.disabled = loading;
        refreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      }
      if (addBtn) {
        addBtn.hidden = false;
        addBtn.disabled = loading;
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
          var archiveRows = getArchiveRows();
          statusEl.hidden = sharedArchiveLoading || archiveRows.length > 0;
          statusEl.textContent = sharedArchiveLoading || archiveRows.length ? "" : "Архив пока пуст";
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
      var filterSuffix = activeQuickFilter === "all" ? "" : " · фильтр";
      if (roomTotalLabelEl) roomTotalLabelEl.textContent = "Итого " + (ROOM_LABELS[activeRoom] || activeRoom) + filterSuffix;
      var grandLabelEl = summaryEl && summaryEl.querySelector(".admin-report-rakeback-summary__row--grand .admin-report-rakeback-summary__label");
      if (grandLabelEl) grandLabelEl.textContent = "Итого по всем румам" + filterSuffix;
      syncRakebackHeaderLabels();
      var visibleShared = filterRowsForQuickTotals(archiveMode ? getArchiveRows(activeRoom) : getVisibleSharedRows());
      var allShared = filterRowsForQuickTotals(archiveMode ? getArchiveRows() : getSharedRowsForTotal());
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
        var archiveRows = getArchiveRows(activeRoom);
        if (sharedArchiveLoading && !sharedArchiveLoaded) {
          archiveFragment.appendChild(createArchiveEmptyRow("Загружаю архив…"));
        } else if (archiveRows.length) {
          var archiveBaseIndex = 0;
          var archiveBaseEntryByGroup = {};
          var archiveDateTotalsByKey = {};
          var archiveLastDateKey = "";
          getRakebackDateTotals(filterRowsForQuickTotals(archiveRows)).forEach(function (day) {
            if (day && day.key) archiveDateTotalsByKey[day.key] = day;
          });
          archiveRows.forEach(function (row) {
            var groupId = String(row.groupId || "").trim();
            var entryAt = rowEntryTime(row) || normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt || Date.now());
            var entryDateKey = getDateInputValue(entryAt);
            if (entryDateKey && entryDateKey !== archiveLastDateKey) {
              var dayTotal = archiveDateTotalsByKey[entryDateKey];
              archiveFragment.appendChild(createEntryDateSeparator(entryAt, dayTotal ? formatRakebackSummaryPair(dayTotal.rake, dayTotal.amount) : "0 / 0"));
              archiveLastDateKey = entryDateKey;
            }
            if (getSharedRowKind(row) !== "addon") {
              archiveBaseIndex += 1;
              archiveBaseEntryByGroup[groupId] = entryAt;
            }
            var renderRow = row;
            if (getSharedRowKind(row) === "addon") {
              renderRow = {};
              Object.keys(row).forEach(function (key) { renderRow[key] = row[key]; });
              renderRow.baseEntryAt = archiveBaseEntryByGroup[groupId] || entryAt;
            }
            archiveFragment.appendChild(createSharedRow(renderRow, Math.max(0, archiveBaseIndex - 1)));
          });
        } else {
          archiveFragment.appendChild(createArchiveEmptyRow("За выбранный период записей нет"));
        }
        body.replaceChildren(archiveFragment);
        syncSharedGroupRows();
        syncRoomTabs();
        syncControls();
        applyQuickFilter();
        return 0;
      }
      var query = getSearchQuery();
      var pulledTemplateIds = getPulledTemplateIdSet(activeRoom);
      var showTemplateRows = templateRowsOpen || !!query;
      var hasTemplateRowsForRoom = templatesMayExist || templatesLoading || getTemplateIds(activeRoom).length > 0;
      var ids = showTemplateRows ? getTemplateIds(activeRoom).filter(function (id) {
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
      getRakebackDateTotals(filterRowsForQuickTotals(visibleShared)).forEach(function (day) {
        if (day && day.key) dateTotalsByKey[day.key] = day;
      });
      visibleShared.forEach(function (row, index) {
        var groupId = String(row.groupId || "").trim();
        var entryAt = rowEntryTime(row) || normalizeTimeValue(row.entryAddedAt || row.createdAt || row.standardAt || Date.now());
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
      if (hasTemplateRowsForRoom || ids.length) fragment.appendChild(createTemplateSeparator(showTemplateRows));
      if (showTemplateRows && !templatesLoaded && templatesMayExist) {
        loadTemplatesIfNeeded({ showStatus: showTemplateStatus }).then(function () {
          render({ showTemplateStatus: showTemplateStatus });
        });
      }
      if (showTemplateRows && ids.length && showTemplateStatus) {
        setStatus("Загружаю шаблоны… 0 / " + ids.length, true);
      }
      body.replaceChildren(fragment);
      syncSharedGroupRows();
      if (showTemplateRows && ids.length) {
        streamTemplateRows(ids, visibleShared.length, streamSeq, showTemplateStatus, showTemplateRows);
      }
      syncRoomTabs();
      syncControls();
      applyQuickFilter();
      return (showTemplateRows ? ids.length : 0) + visibleShared.length;
    }

    function fillTable(rows, legacyRakeback) {
      if (Array.isArray(rows)) {
        sharedRows = normalizeDraftRows(rows);
        sharedCurrentSnapshotLoaded = false;
        sharedAutoLoadStarted = false;
        if (!sharedRows.length && legacyRakeback != null && legacyRakeback !== "" && parseNumber(legacyRakeback) !== 0) {
          sharedRows = normalizeDraftRows([{
            kind: "base",
            room: activeRoom || "P21",
            playerId: "",
            rake: legacyRakeback,
            percent: 100,
          }]);
        }
      }
      return render();
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
        if (searchInput && searchInput.value) searchInput.value = "";
        var now = getNewRowEntryTime();
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
        if (!baseRow) return;
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
        return saveSharedDraftNow(options.showStatus !== false, {
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
        var roomAmount = normalizeRakebackRoomAmount(room, rake * percent / 100 * (discount15 ? 0.85 : 1));
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
        var scrollSnapshot = captureRakebackScroll(templateRow);
        render();
        restoreRakebackScroll(scrollSnapshot);
        setStatus("Шаблон сохранен в записи", true);
        saveSharedDraftNow(true, { upsertGroupIds: [row.groupId], preserveScroll: true }).then(function (ok) {
          if (ok) return;
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).map(function (item) {
            if (getSharedRowLocalKey(item) === rowKey) {
              item.saved = false;
              item.persisted = false;
            }
            return item;
          });
          writePendingRakebackRows(sharedRows);
          var fallbackScrollSnapshot = captureRakebackScroll(body);
          render();
          restoreRakebackScroll(fallbackScrollSnapshot);
        });
      }
      Array.prototype.slice.call(roomTabs || []).forEach(function (tab) {
        tab.addEventListener("click", function () {
          var nextRoom = normalizeRoom(tab.getAttribute("data-rakeback-room-tab"));
          if (nextRoom !== activeRoom && !confirmUnsavedLeave()) return;
          activeRoom = nextRoom;
          render();
        });
      });
      Array.prototype.slice.call(filterButtons || []).forEach(function (button) {
        button.addEventListener("click", function () {
          activeQuickFilter = button.getAttribute("data-rakeback-filter") || "all";
          render();
        });
      });
      Array.prototype.slice.call(periodTabs || []).forEach(function (tab) {
        tab.addEventListener("click", function () {
          var nextPeriod = tab.getAttribute("data-rakeback-period") || "current_week";
          if (nextPeriod !== activePeriod && !confirmUnsavedLeave()) return;
          activePeriod = nextPeriod;
          archiveMode = activePeriod !== "current_week";
          syncPeriodTabs();
          render();
          if (activePeriodNeedsArchive() && !sharedArchiveLoaded && !sharedArchiveLoading) {
            loadSharedDraft({ includeArchive: true, force: true, background: true });
          }
        });
      });
      [periodDateFrom, periodDateTo].forEach(function (input) {
        if (input) input.addEventListener("change", render);
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
          loadSharedDraft({ force: true, showStatus: true, includeArchive: activePeriodNeedsArchive() });
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
      if (undoBtn && undoBtn.dataset.rakebackUndoBound !== "1") {
        undoBtn.dataset.rakebackUndoBound = "1";
        undoBtn.addEventListener("click", undoPendingDelete);
      }
      if (modal && modal.dataset.rakebackUnloadGuardBound !== "1") {
        modal.dataset.rakebackUnloadGuardBound = "1";
        window.addEventListener("beforeunload", function (event) {
          if (!hasUnsavedChanges()) return;
          event.preventDefault();
          event.returnValue = "";
        });
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
          row.classList.add("admin-report-rakeback-row--dirty");
          syncSharedGroupRows();
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
          applyQuickFilter();
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
          row.classList.add("admin-report-rakeback-row--dirty");
          syncSharedGroupRows();
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
          syncControls();
          applyQuickFilter();
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
          var weekToggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-week-toggle]") : null;
          if (weekToggle) {
            event.preventDefault();
            var weekKey = weekToggle.getAttribute("data-rakeback-week-toggle") || "";
            if (weekKey) archiveWeekOpen[weekKey] = archiveWeekOpen[weekKey] !== true;
            render();
            return;
          }
          var weekRoomToggle = event.target && event.target.closest ? event.target.closest("[data-rakeback-week-room-toggle]") : null;
          if (weekRoomToggle) {
            event.preventDefault();
            var weekRoomKey = weekRoomToggle.getAttribute("data-rakeback-week-room-toggle") || "";
            if (weekRoomKey) archiveWeekRoomOpen[weekRoomKey] = archiveWeekRoomOpen[weekRoomKey] === false;
            render();
            return;
          }
          var archiveRoomTab = event.target && event.target.closest ? event.target.closest("[data-rakeback-archive-room-tab]") : null;
          if (archiveRoomTab) {
            event.preventDefault();
            event.stopPropagation();
            activateArchiveWeekRoom(
              archiveRoomTab.closest("[data-rakeback-archive-week]"),
              archiveRoomTab.getAttribute("data-rakeback-archive-room-tab")
            );
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
            var saveRoomInput = saveRow.querySelector("[data-rakeback-room]");
            var saveDiscountInput = saveRow.querySelector("[data-rakeback-discount15]");
            var savedPlayerId = String(idInput.value || "").trim();
            var savedRoom = normalizeRoom(saveRoomInput && saveRoomInput.value ? saveRoomInput.value : activeRoom);
            var savedPercent = parseNumber(percentInput.value);
            var savedDiscount15 = !!(saveDiscountInput && saveDiscountInput.checked);
            var savedColor = normalizeRakebackRowColor(saveRow.getAttribute("data-rakeback-row-color"));
            setSharedRowSaved(saveRow, true, false);
            sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true });
            saveSharedDraftNow(true, { upsertGroupIds: [saveGroupId] }).then(function (ok) {
              if (ok) {
                // The percentage entered into a regular rakeback row is also
                // the player's new default for future weeks.
                saveTemplateRowDefaults(savedRoom, savedPlayerId, savedPercent, savedDiscount15, {
                  color: savedColor,
                  showStatus: false,
                  skipRender: true,
                });
                return;
              }
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
          var deletedRowsSnapshot = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
            if (kind === "addon") return getSharedRowLocalKey(item) === localKey;
            return String(item.groupId || "") === groupId;
          });
          markSharedRowDeleted(row, kind, localKey);
          sharedRows = mergeSharedRowsFromDom({ includeEmptyUnsaved: true }).filter(function (item) {
            if (kind === "addon") return getSharedRowLocalKey(item) !== localKey;
            return String(item.groupId || "") !== groupId;
          });
          render();
          offerDeleteUndo({
            kind: kind,
            groupId: groupId,
            localKey: localKey,
            serverKey: serverKey,
            persisted: persisted,
            rows: deletedRowsSnapshot,
          });
        });
      }
    }

    bind();
    syncControls();
    preloadTemplatesSoon();

    function setArchiveMode(active) {
      archiveMode = !!active;
      activePeriod = archiveMode ? "all" : "current_week";
      var count = render();
      if (activePeriodNeedsArchive() && !sharedArchiveLoaded && !sharedArchiveLoading) {
        loadSharedDraft({ includeArchive: true, force: true, background: true });
      } else if (!archiveMode) {
        scheduleSharedDraftAutoload();
      }
      return count;
    }

    return {
      bind: bind,
      close: closeRakebackTotalsModal,
      collectRows: collectRows,
      fillTable: fillTable,
      getActiveRoom: function () { return activeRoom; },
      getUnaccountedRows: function () {
        return getUnsentReportRakebackRows().filter(function (row) {
          return row && String(row.playerId || "").trim();
        });
      },
      isArchiveMode: function () { return archiveMode; },
      hasUnsavedChanges: hasUnsavedChanges,
      confirmLeave: confirmUnsavedLeave,
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
