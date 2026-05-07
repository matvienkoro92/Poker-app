function initAdminReportModal() {
  var btn = document.getElementById("adminReportBtn");
  var modal = document.getElementById("adminReportModal");
  var closeBtn = document.getElementById("adminReportModalClose");
  var backdrop = document.getElementById("adminReportModalBackdrop");
  var dateEl = document.getElementById("adminReportDate");
  var tabs = modal ? modal.querySelectorAll(".admin-report-tab") : null;
  var panels = modal ? modal.querySelectorAll(".admin-report-panel") : null;
  var submitBtn = document.getElementById("adminReportSubmitBtn");
  var sentList = document.getElementById("adminReportSentList");
  var formBody = document.getElementById("adminReportFormBody");
  var rakebackBody = document.getElementById("adminReportRakebackTableBody");
  var rakebackAddBtn = document.getElementById("adminReportRakebackAddBtn");
  var rakebackRoomTabs = modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : null;
  var rakebackTotalEl = document.getElementById("adminReportRakebackTotal");
  var rakebackTotalInput = document.getElementById("adminReportRakeback");
  var rakebackStatusEl = document.getElementById("adminReportRakebackStatus");
  var editingReportId = null;
  var editingReport = null;
  var rakebackGroupSeq = 0;
  var activeRakebackRoom = "P21";
  if (!btn || !modal) return;
  if (btn.dataset.adminReportBound === "1") return;
  btn.dataset.adminReportBound = "1";

  var VIKA_AUTHOR_ID = "tg_1897001087";
  var VIKA_TELEGRAM_NUM = 1897001087;

  function canViewSentReports() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && (auth.adminAccess === true || auth.adminReportAccess === true)) return true;
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && (rec.adminAccess === true || rec.adminReportAccess === true)) return true;
    } catch (eAuth) {}
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        users.push(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } catch (eTg) {}
    try {
      var authUser = window.__pokerTelegramAuth && window.__pokerTelegramAuth.user ? window.__pokerTelegramAuth.user : null;
      if (authUser) users.push(authUser);
    } catch (eAuthUser) {}
    try {
      var recUser = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (recUser && recUser.user) users.push(recUser.user);
    } catch (eRecUser) {}
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var id = u.id != null ? String(u.id).replace(/^tg_/, "").trim() : "";
      if (id === "388008256" || id === "2144406710" || id === "1897001087") return true;
      var username = u.username != null ? String(u.username).replace(/^@+/, "").trim().toLowerCase() : "";
      if (username === "roman1787443" || username === "roman1_matvienko") return true;
      var email = u.email != null ? String(u.email).trim().toLowerCase() : "";
      if (email === "matvienkoro92@gmail.com") return true;
    }
    return false;
  }

  function syncSentReportsAccess() {
    var allowed = canViewSentReports();
    if (tabs && tabs.length) {
      tabs.forEach(function (tab) {
        if (tab.getAttribute("data-admin-report-tab") === "sent") tab.hidden = !allowed;
      });
    }
    if (panels && panels.length) {
      panels.forEach(function (panel) {
        if (panel.getAttribute("data-admin-report-panel") === "sent") panel.hidden = !allowed;
      });
    }
    if (!allowed && sentList) sentList.innerHTML = "";
    return allowed;
  }

  function parseReportNumber(raw) {
    var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  function formatReportNumber(n) {
    var num = parseReportNumber(n);
    if (!num) return "0";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded).replace(".", ",");
  }

  function formatReportInputNumber(n) {
    var num = parseReportNumber(n);
    if (!num) return "";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded);
  }

  function nextRakebackGroupId() {
    rakebackGroupSeq += 1;
    return "rb-" + Date.now().toString(36) + "-" + rakebackGroupSeq;
  }

  function getRakebackRoomOptions(selected) {
    selected = normalizeRakebackRoom(selected);
    var rooms = ["P21", "X", "Supr", "PP"];
    return rooms.map(function (room) {
      return '<option value="' + escapeReportHtml(room) + '"' + (room === selected ? " selected" : "") + ">" + escapeReportHtml(room) + "</option>";
    }).join("");
  }

  function normalizeRakebackRoom(room) {
    var raw = String(room || "").trim();
    var lower = raw.toLowerCase();
    if (!raw || raw === "Покер21" || lower === "poker21" || lower === "покер21" || lower === "p21") return "P21";
    if (raw === "Х" || lower === "x" || lower === "xpoker" || lower === "хпокер") return "X";
    if (raw === "Супрема" || lower === "suprema" || lower === "supr") return "Supr";
    if (lower === "pp" || lower === "pppoker") return "PP";
    return raw;
  }

  function createRakebackRow(data) {
    data = data || {};
    var tr = document.createElement("tr");
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    var groupId = data.groupId || nextRakebackGroupId();
    tr.className = "admin-report-rakeback-row" + (kind === "addon" ? " admin-report-rakeback-row--addon" : "");
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-kind", kind);
    tr.setAttribute("data-rakeback-group", groupId);
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + getRakebackRoomOptions(data.room || "P21") + "</select></td>" +
      '<td><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" /></td>' +
      '<td>' +
        (kind === "addon"
          ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" placeholder="0" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток">0</span></div>'
          : '<input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" placeholder="0" />') +
      '</td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" placeholder="0" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%" /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount>0</span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись">+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку">×</button>' +
      "</td>";
    var idInput = tr.querySelector("[data-rakeback-player-id]");
    var rakeInput = tr.querySelector("[data-rakeback-rake]");
    var percentInput = tr.querySelector("[data-rakeback-percent]");
    var discountInput = tr.querySelector("[data-rakeback-discount15]");
    if (idInput) idInput.value = data.playerId != null ? String(data.playerId) : "";
    if (rakeInput) rakeInput.value = data.rake != null && data.rake !== "" ? String(data.rake) : "";
    if (percentInput) percentInput.value = data.percent != null && data.percent !== "" ? String(data.percent) : "";
    if (discountInput) discountInput.checked = !!(data.discount15 || data.subtract15);
    if (kind === "addon") {
      var roomSelect = tr.querySelector("[data-rakeback-room]");
      if (roomSelect) roomSelect.disabled = true;
      if (idInput) idInput.readOnly = true;
    }
    return tr;
  }

  function getRakebackRowRoom(row) {
    if (!row) return "P21";
    var roomSelect = row.querySelector("[data-rakeback-room]");
    return normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21");
  }

  function setRakebackRoomTab(room) {
    activeRakebackRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    if (rakebackRoomTabs && rakebackRoomTabs.length) {
      rakebackRoomTabs.forEach(function (tab) {
        var selected = normalizeRakebackRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRakebackRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }
    syncRakebackTable();
  }

  function syncRakebackRoomVisibility() {
    if (!rakebackBody) return;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      row.hidden = getRakebackRowRoom(row) !== activeRakebackRoom;
    });
  }

  function showRakebackStatus(message) {
    if (!rakebackStatusEl) return;
    rakebackStatusEl.textContent = message || "";
    rakebackStatusEl.hidden = !message;
  }

  function setRakebackRowSaved(row, saved) {
    if (!row) return;
    var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
    row.classList.toggle("admin-report-rakeback-row--saved", !!saved);
    row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    row.querySelectorAll("input").forEach(function (input) {
      if (input.hasAttribute("data-rakeback-discount15")) {
        input.disabled = !!saved;
        return;
      }
      input.readOnly = !!saved || (isAddon && input.hasAttribute("data-rakeback-player-id"));
    });
    row.querySelectorAll("select").forEach(function (select) {
      select.disabled = !!saved || isAddon;
    });
    updateRakebackRowActions(row);
  }

  function ensureRakebackBaseRow(room) {
    if (!rakebackBody) return;
    var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    var hasRoomRow = rows.some(function (row) {
      return getRakebackRowRoom(row) === targetRoom;
    });
    if (hasRoomRow) return;
    rakebackBody.appendChild(createRakebackRow({ kind: "base", room: targetRoom }));
  }

  function isRakebackRowFilled(row) {
    if (!row) return false;
    var idInput = row.querySelector("[data-rakeback-player-id]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var id = idInput && idInput.value ? String(idInput.value).trim() : "";
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    var percent = parseReportNumber(percentInput ? percentInput.value : "");
    return !!id || rake !== 0 || percent !== 0;
  }

  function hasRakebackRakeValue(row) {
    if (!row) return false;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    return parseReportNumber(rakeInput ? rakeInput.value : "") !== 0;
  }

  function canAddRakebackAddon(row) {
    if (!row) return false;
    return row.getAttribute("data-rakeback-saved") === "1" && isRakebackRowFilled(row) && hasRakebackRakeValue(row);
  }

  function updateRakebackRowActions(row) {
    if (!row) return;
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var filled = isRakebackRowFilled(row);
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var addBtn = row.querySelector("[data-rakeback-add-addon]");
    if (saveBtn) {
      saveBtn.disabled = !filled;
      saveBtn.hidden = saved || !filled;
    }
    if (editBtn) editBtn.hidden = !saved;
    if (addBtn) {
      var canAdd = canAddRakebackAddon(row);
      addBtn.disabled = !canAdd;
      addBtn.hidden = !canAdd;
    }
  }

  function getRakebackPreviousRake(row) {
    if (!rakebackBody || !row || row.getAttribute("data-rakeback-kind") !== "addon") return 0;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var previousRake = 0;
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    for (var i = 0; i < rows.length; i++) {
      var current = rows[i];
      if (current === row) break;
      if (current.getAttribute("data-rakeback-group") !== groupId) continue;
      var rakeInput = current.querySelector("[data-rakeback-rake]");
      previousRake = parseReportNumber(rakeInput ? rakeInput.value : "");
    }
    return previousRake;
  }

  function getRakebackRowCalculationBase(row) {
    if (!row) return 0;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    if (row.getAttribute("data-rakeback-kind") === "addon") return rake - getRakebackPreviousRake(row);
    return rake;
  }

  function getRakebackRowAmount(row) {
    if (!row) return 0;
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    var amount = getRakebackRowCalculationBase(row) * parseReportNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) amount *= 0.85;
    return amount;
  }

  function collectRakebackRows(includeEmpty) {
    if (!rakebackBody) return [];
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    return rows.map(function (row) {
      var roomSelect = row.querySelector("[data-rakeback-room]");
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var discountInput = row.querySelector("[data-rakeback-discount15]");
      var room = normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : "P21");
      var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      var percent = parseReportNumber(percentInput ? percentInput.value : "");
      var amount = getRakebackRowAmount(row);
      var discount15 = !!(discountInput && discountInput.checked);
      var filled = !!playerId || rake !== 0 || percent !== 0 || amount !== 0;
      if (!includeEmpty && !filled) return null;
      return {
        groupId: row.getAttribute("data-rakeback-group") || "",
        kind: row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base",
        room: room,
        playerId: playerId,
        rake: rake,
        percent: percent,
        discount15: discount15,
        amount: Math.round(amount * 100) / 100,
        saved: row.getAttribute("data-rakeback-saved") === "1",
      };
    }).filter(Boolean);
  }

  function syncRakebackTable() {
    if (!rakebackBody) return 0;
    ensureRakebackBaseRow(activeRakebackRoom);
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-total-row]")).forEach(function (row) {
      row.parentNode.removeChild(row);
    });
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    var baseByGroup = {};
    rows.forEach(function (row) {
      var groupId = row.getAttribute("data-rakeback-group");
      if (!groupId) {
        groupId = nextRakebackGroupId();
        row.setAttribute("data-rakeback-group", groupId);
      }
      if (row.getAttribute("data-rakeback-kind") !== "addon" && !baseByGroup[groupId]) baseByGroup[groupId] = row;
    });
    rows.forEach(function (row) {
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
      var base = baseByGroup[groupId];
      if (kind === "addon" && base) {
        var baseRoom = base.querySelector("[data-rakeback-room]");
        var baseId = base.querySelector("[data-rakeback-player-id]");
        var room = row.querySelector("[data-rakeback-room]");
        var id = row.querySelector("[data-rakeback-player-id]");
        if (room && baseRoom) room.value = baseRoom.value;
        if (id && baseId) id.value = baseId.value;
      }
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var amountEl = row.querySelector("[data-rakeback-amount]");
      var restEl = row.querySelector("[data-rakeback-rest]");
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      if (restEl) {
        var previousRake = getRakebackPreviousRake(row);
        restEl.textContent = formatReportNumber(rake - previousRake);
      }
      var amount = getRakebackRowAmount(row);
      if (amountEl) amountEl.textContent = formatReportNumber(amount);
      updateRakebackRowActions(row);
    });
    syncRakebackRoomVisibility();
    var collected = collectRakebackRows(false);
    var total = collected.reduce(function (sum, row) {
      return sum + parseReportNumber(row.amount);
    }, 0);
    if (rakebackTotalEl) rakebackTotalEl.textContent = formatReportNumber(total);
    if (rakebackTotalInput) rakebackTotalInput.value = formatReportInputNumber(total);
    showRakebackStatus("");
    return total;
  }

  function fillRakebackTable(rows, legacyRakeback) {
    if (!rakebackBody) return;
    rakebackBody.innerHTML = "";
    var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
    if (!list.length && legacyRakeback != null && legacyRakeback !== "" && parseReportNumber(legacyRakeback) !== 0) {
      list = [{ kind: "base", room: "P21", playerId: "", rake: legacyRakeback, percent: 100 }];
    }
    if (!list.length) {
      rakebackBody.appendChild(createRakebackRow({ kind: "base" }));
      syncRakebackTable();
      return;
    }
    list.forEach(function (row) {
      var tr = createRakebackRow({
        groupId: row.groupId || "",
        kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
        room: normalizeRakebackRoom(row.room || "P21"),
        playerId: row.playerId || row.id || "",
        rake: row.rake != null ? row.rake : "",
        percent: row.percent != null ? row.percent : "",
        discount15: !!(row.discount15 || row.subtract15),
      });
      rakebackBody.appendChild(tr);
      if (row.saved) setRakebackRowSaved(tr, true);
    });
    syncRakebackTable();
  }

  function addRakebackBaseRow() {
    if (!rakebackBody) return;
    rakebackBody.appendChild(createRakebackRow({ kind: "base", room: activeRakebackRoom }));
    syncRakebackTable();
  }

  function addRakebackAddonRow(baseRow) {
    if (!rakebackBody || !baseRow) return;
    var groupId = baseRow.getAttribute("data-rakeback-group") || nextRakebackGroupId();
    baseRow.setAttribute("data-rakeback-group", groupId);
    var roomSelect = baseRow.querySelector("[data-rakeback-room]");
    var idInput = baseRow.querySelector("[data-rakeback-player-id]");
    var addon = createRakebackRow({
      kind: "addon",
      groupId: groupId,
      room: roomSelect && roomSelect.value ? roomSelect.value : "P21",
      playerId: idInput && idInput.value ? idInput.value : "",
    });
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    var anchor = baseRow;
    rows.forEach(function (candidate) {
      if (candidate.getAttribute("data-rakeback-group") === groupId) anchor = candidate;
    });
    if (anchor.nextSibling) rakebackBody.insertBefore(addon, anchor.nextSibling);
    else rakebackBody.appendChild(addon);
    syncRakebackTable();
    var rakeInput = addon.querySelector("[data-rakeback-rake]");
    if (rakeInput && typeof rakeInput.focus === "function") rakeInput.focus();
  }

  /** Суммирует доп. строки отчёта в map по названию (без дубля с extraFields + legacy). */
  function mergeReportExtrasIntoMap(map, r) {
    if (!r || !map) return;
    if (Array.isArray(r.extraFields) && r.extraFields.length > 0) {
      r.extraFields.forEach(function (f) {
        if (!f) return;
        var name = f.name != null ? f.name : f.extraName;
        name = name != null ? String(name).trim() : "";
        if (!name) name = "Доп.";
        var raw = f.amount != null ? f.amount : f.extraAmount;
        var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
        if (isNaN(n)) n = 0;
        map[name] = (map[name] || 0) + n;
      });
      return;
    }
    if (r.extraName || r.extraAmount != null) {
      var legName = r.extraName ? String(r.extraName).trim() : "";
      if (!legName) legName = "Доп.";
      var raw = r.extraAmount;
      var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
      if (isNaN(n)) n = 0;
      map[legName] = (map[legName] || 0) + n;
    }
  }

  function mergeRakebackRowsIntoMap(map, r) {
    if (!r || !map || !Array.isArray(r.rakebackRows)) return;
    r.rakebackRows.forEach(function (row) {
      if (!row) return;
      var room = row.room != null ? String(row.room).trim() : "";
      var playerId = row.playerId != null ? String(row.playerId).trim() : "";
      if (!room && !playerId) return;
      var key = room + "\u0000" + playerId;
      if (!map[key]) map[key] = { room: room, playerId: playerId, rake: 0, amount: 0 };
      map[key].rake += parseReportNumber(row.rake);
      map[key].amount += parseReportNumber(row.amount);
    });
  }

  function moscowPartsFromTs(ts) {
    var d = new Date(ts);
    var f = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });
    var parts = f.formatToParts(d);
    var o = {};
    parts.forEach(function (p) {
      if (p.type !== "literal") o[p.type] = p.value;
    });
    return { y: o.year, m: o.month, d: o.day, h: parseInt(o.hour, 10) || 0 };
  }

  function prevMoscowCalendarDay(y, m, dayStr) {
    var dt = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(dayStr, 10)));
    dt.setUTCDate(dt.getUTCDate() - 1);
    return {
      y: dt.getUTCFullYear(),
      m: String(dt.getUTCMonth() + 1).padStart(2, "0"),
      d: String(dt.getUTCDate()).padStart(2, "0"),
    };
  }

  /** Отчёты Вики: 00:00–02:59 МСК → дата смены = предыдущий календарный день (до 03:00). */
  function reportEffectiveTimestampMs(r) {
    var raw = r && r.createdAt ? new Date(r.createdAt).getTime() : NaN;
    if (!r || !r.createdAt || raw !== raw) return raw;
    if (String(r.authorId || "") !== VIKA_AUTHOR_ID) return raw;
    var p = moscowPartsFromTs(raw);
    if (p.h >= 3) return raw;
    var pd = prevMoscowCalendarDay(String(p.y), p.m, p.d);
    return new Date(pd.y + "-" + pd.m + "-" + pd.d + "T12:00:00+03:00").getTime();
  }

  function formatRuWeekdayDateFromTs(ts) {
    if (ts !== ts) return { weekday: "", date: "" };
    var cap = function (s) {
      if (!s) return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    var wd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", weekday: "long" }).format(new Date(ts));
    var dd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ts));
    return { weekday: cap(wd), date: dd };
  }

  function getTodayInfo() {
    var now = new Date();
    var weekday = now.toLocaleDateString("ru-RU", { weekday: "long" });
    var date = now.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
    return { label: weekday.charAt(0).toUpperCase() + weekday.slice(1) + ", " + date, weekday: weekday, date: date, iso: now.toISOString() };
  }

  /** Дата/день недели для новой формы: у Вики ночью (до 03:00 МСК) — «вчера». */
  function getShiftReportDateInfo() {
    var resolved =
      typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
    var uid = resolved && resolved.id != null ? resolved.id : null;
    if (uid !== VIKA_TELEGRAM_NUM) return getTodayInfo();
    var now = Date.now();
    var p = moscowPartsFromTs(now);
    if (p.h >= 3) return getTodayInfo();
    var pd = prevMoscowCalendarDay(String(p.y), p.m, p.d);
    var effTs = new Date(pd.y + "-" + pd.m + "-" + pd.d + "T12:00:00+03:00").getTime();
    var meta = formatRuWeekdayDateFromTs(effTs);
    var wdl = meta.weekday.toLowerCase();
    return { label: meta.weekday + ", " + meta.date, weekday: wdl, date: meta.date, iso: new Date(effTs).toISOString() };
  }

  function getRakebackDraftKey() {
    var info = getShiftReportDateInfo();
    return "poker_admin_report_rakeback_draft:" + String(info.date || "today");
  }

  function readRakebackDraftRows() {
    try {
      var raw = window.localStorage ? window.localStorage.getItem(getRakebackDraftKey()) : "";
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return parsed && Array.isArray(parsed.rows) ? parsed.rows : [];
    } catch (e) {
      return [];
    }
  }

  function saveRakebackDraftRows() {
    if (editingReportId) return;
    try {
      if (!window.localStorage) return;
      var rows = collectRakebackRows(false);
      if (rows.length) {
        window.localStorage.setItem(getRakebackDraftKey(), JSON.stringify({ rows: rows, savedAt: Date.now() }));
      } else {
        window.localStorage.removeItem(getRakebackDraftKey());
      }
    } catch (e) {}
  }

  function clearRakebackDraftRows() {
    try {
      if (window.localStorage) window.localStorage.removeItem(getRakebackDraftKey());
    } catch (e) {}
  }

  function setActiveTab(name) {
    if (!tabs || !panels) return;
    if (name === "sent" && !canViewSentReports()) name = "form";
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-admin-report-tab") === name;
      tab.classList.toggle("admin-report-tab--active", isActive);
    });
    panels.forEach(function (panel) {
      var isActive = panel.getAttribute("data-admin-report-panel") === name;
      panel.classList.toggle("admin-report-panel--active", isActive);
    });
  }

  function escapeReportHtml(s) {
    if (s == null || s === undefined) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function buildReportDetailHtml(it) {
    var labels = { deposit: "Депозит", cashout: "Выводы", prodamus: "Продамус", robokassa: "Робокасса", romaCrypto: "Рома крипта", botCryptoDep: "Бот крипта деп", botExchipDep: "Бот эксчип деп", botExchipCashout: "Бот эксчип вывод", bonuses: "Бонусы", transfers: "Переводы", ret: "Возврат", sergeyMarina: "Сергей/Марина", rakeback: "Рейкбек" };
    var keys = ["deposit", "cashout", "prodamus", "robokassa", "romaCrypto", "botCryptoDep", "botExchipDep", "botExchipCashout", "bonuses", "transfers", "ret", "sergeyMarina", "rakeback"];
    var parts = [];
    keys.forEach(function (k) {
      var v = it[k];
      if (v != null && v !== "" && (typeof v !== "number" || v !== 0)) {
        parts.push("<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">" + escapeReportHtml(labels[k]) + "</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(v) + "</span></div>");
      }
    });
    if (Array.isArray(it.rakebackRows) && it.rakebackRows.length) {
      it.rakebackRows.forEach(function (row) {
        if (!row) return;
        var room = row.room != null ? String(row.room).trim() : "";
        var playerId = row.playerId != null ? String(row.playerId).trim() : "";
        if (!room && !playerId) return;
        var label = (row.weekTotal ? "Итого по неделе: " : "Рейкбек: ") + [room, playerId].filter(Boolean).join(" · ");
        var baseAmount = parseReportNumber(row.rake) * parseReportNumber(row.percent) / 100;
        var amount = row.amount != null ? parseReportNumber(row.amount) : (row.discount15 || row.subtract15 ? baseAmount * 0.85 : baseAmount);
        var value = row.weekTotal
          ? formatReportNumber(amount)
          : formatReportNumber(row.rake) + " × " + formatReportNumber(row.percent) + "%" + (row.discount15 || row.subtract15 ? " -15%" : "") + " = " + formatReportNumber(amount);
        parts.push("<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">" + escapeReportHtml(label) + "</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(value) + "</span></div>");
      });
    }
    if (it.extraFields && it.extraFields.length) {
      it.extraFields.forEach(function (f) {
        if (f.name || f.amount != null && f.amount !== "") {
          parts.push("<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">" + escapeReportHtml(f.name || "Доп") + "</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(f.amount != null ? f.amount : "") + "</span></div>");
        }
      });
    } else if (it.extraName || it.extraAmount != null) {
      parts.push("<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">" + escapeReportHtml(it.extraName || "Доп") + "</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(it.extraAmount != null ? it.extraAmount : "") + "</span></div>");
    }
    // Раньше здесь была строка с общим итогом по смене ("Итого, ₽").
    // По просьбе убираем её из детального вида отчёта.
    return parts.join("");
  }

  function loadSentReports() {
    if (!sentList) return;
    if (!canViewSentReports()) {
      sentList.innerHTML = "";
      return;
    }
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Не удалось загрузить отчёты (войдите в Telegram или PWA).</p>';
      return;
    }
    sentList.innerHTML = '<p class="admin-report-sent-empty">Загрузка…</p>';
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!sentList) return;
        var items = (data && data.ok && data.reports) ? data.reports : [];
        if (!Array.isArray(items) || items.length === 0) {
          sentList.innerHTML = '<p class="admin-report-sent-empty">Пока нет отправленных отчётов.</p>';
          return;
        }
        var weekdayOrder = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        var DAY_MS = 24 * 60 * 60 * 1000;
        var WEEK_MS = 7 * DAY_MS;
        var MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
        function mskDateFromTs(ts) {
          return new Date(ts + MSK_SHIFT_MS);
        }
        function formatRuMonthDay(ms, withMonth) {
          return new Intl.DateTimeFormat("ru-RU", {
            timeZone: "Europe/Moscow",
            day: "numeric",
            month: withMonth ? "long" : undefined,
          }).format(new Date(ms));
        }
        function weekLabelFromStartMs(weekStartMs) {
          var weekEndDateMs = weekStartMs + (6 * DAY_MS);
          var fromMonth = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", month: "long" }).format(new Date(weekStartMs));
          var toMonth = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", month: "long" }).format(new Date(weekEndDateMs));
          var fromDay = formatRuMonthDay(weekStartMs, false);
          var toDay = formatRuMonthDay(weekEndDateMs, false);
          if (fromMonth === toMonth) return fromDay + "–" + toDay + " " + toMonth;
          return formatRuMonthDay(weekStartMs, true) + " – " + formatRuMonthDay(weekEndDateMs, true);
        }
        function weekCompactLabelFromStartMs(weekStartMs) {
          var weekEndDateMs = weekStartMs + (6 * DAY_MS);
          var fromCompact = formatRuMonthDay(weekStartMs, true).replace(/\s+/g, "");
          var toCompact = formatRuMonthDay(weekEndDateMs, true).replace(/\s+/g, "");
          return fromCompact + "-" + toCompact;
        }
        /** Календарная неделя отчётов: Пн 00:00 МСК -> Вс 23:59:59 МСК. */
        function weekStartMsForReport(ts) {
          var msk = mskDateFromTs(ts);
          var y = msk.getUTCFullYear();
          var m = msk.getUTCMonth();
          var d = msk.getUTCDate();
          var wd = msk.getUTCDay(); // 0=Вс..6=Сб
          var daysFromMonday = (wd + 6) % 7;
          var mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * DAY_MS;
          return mondayStartMskMs - MSK_SHIFT_MS;
        }
        function weekMetaFromStart(weekStartMs) {
          return {
            start: weekStartMs,
            end: weekStartMs + WEEK_MS - 1,
            label: weekLabelFromStartMs(weekStartMs),
            key: "w-" + String(weekStartMs),
          };
        }
        var currentWeek = weekMetaFromStart(weekStartMsForReport(Date.now()));

        function emptyWeekTotals() {
          return {
            deposit: 0, cashout: 0, prodamus: 0, robokassa: 0, romaCrypto: 0,
            botCryptoDep: 0, botExchipDep: 0, botExchipCashout: 0,
            bonuses: 0, transfers: 0, ret: 0, sergeyMarina: 0, rakeback: 0
          };
        }

        function addNumericToTotals(totals, r) {
          Object.keys(totals).forEach(function (k) {
            if (k === "extraFields") return;
            var v = r[k];
            if (v == null || v === "") return;
            var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
            if (!isNaN(n)) totals[k] += n;
          });
        }

        function sumReportsInWindow(allItems, fromMs, toMs) {
          var weekTotals = emptyWeekTotals();
          var extraMap = {};
          var rakebackMap = {};
          allItems.forEach(function (r) {
            var t = reportEffectiveTimestampMs(r);
            if (!t || t < fromMs || t > toMs) return;
            addNumericToTotals(weekTotals, r);
            mergeReportExtrasIntoMap(extraMap, r);
            mergeRakebackRowsIntoMap(rakebackMap, r);
          });
          weekTotals.extraFields = Object.keys(extraMap).sort().map(function (name) {
            return { name: name, amount: extraMap[name] };
          }).filter(function (f) {
            return f.amount !== 0 && !isNaN(f.amount);
          });
          weekTotals.rakebackRows = Object.keys(rakebackMap).sort().map(function (key) {
            var row = rakebackMap[key];
            return {
              room: row.room,
              playerId: row.playerId,
              rake: Math.round(row.rake * 100) / 100,
              amount: Math.round(row.amount * 100) / 100,
              weekTotal: true,
            };
          }).filter(function (row) {
            return row.amount !== 0 && !isNaN(row.amount);
          });
          return weekTotals;
        }

        function buildDaysHtmlFromList(list, idPrefix) {
          if (!list || list.length === 0) return "";
          var byDay = {};
          list.forEach(function (r) {
            var eff = reportEffectiveTimestampMs(r);
            var meta = formatRuWeekdayDateFromTs(eff);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrder.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
          Object.keys(byDay).forEach(function (d) {
            if (weekdayOrder.indexOf(d) === -1) daysToRender.push(d);
          });
          var parts = [];
          daysToRender.forEach(function (day) {
            var listDay = byDay[day];
            if (!listDay || listDay.length === 0) return;
            listDay.sort(function (a, b) {
              var ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              var tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return tb - ta;
            });
            parts.push("<div class=\"admin-report-sent-day\"><div class=\"admin-report-sent-day-title\">" + escapeReportHtml(day) + "</div>");
            listDay.forEach(function (it, idx) {
              var who = it.authorName || "";
              var comment = it.comment || "";
              var id = idPrefix + (it.id || day + "-" + idx);
              var detailHtml = buildReportDetailHtml(it);
              var reportId = (it.id || "").toString();
              var effMs = reportEffectiveTimestampMs(it);
              var dispDate = formatRuWeekdayDateFromTs(effMs).date || it.date || "";
              parts.push("<div class=\"admin-report-sent-item\" data-report-id=\"" + escapeReportHtml(reportId) + "\"><div class=\"admin-report-sent-item__head\" role=\"button\" tabindex=\"0\" aria-expanded=\"false\" aria-controls=\"" + id + "-detail\"><span class=\"admin-report-sent-item__date\">" + escapeReportHtml(dispDate) + "</span><span class=\"admin-report-sent-item__who\">" + escapeReportHtml(who) + "</span><span class=\"admin-report-sent-item__actions\"><button type=\"button\" class=\"admin-report-sent-edit-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Редактировать\">✎</button><button type=\"button\" class=\"admin-report-sent-delete-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Удалить\">✕</button></span><span class=\"admin-report-sent-item__toggle\" aria-hidden=\"true\">▼</span></div><div class=\"admin-report-sent-detail\" id=\"" + id + "-detail\" hidden><div class=\"admin-report-sent-detail__inner\">" + (comment ? "<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">Комментарий</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(comment) + "</span></div>" : "") + detailHtml + "</div></div></div>");
            });
            parts.push("</div>");
          });
          return parts.join("");
        }
        function buildDaysSpoilersHtmlFromList(list, idPrefix) {
          if (!list || list.length === 0) return '<p class="admin-report-sent-period-hint">В этой неделе отчётов по дням пока нет.</p>';
          var byDay = {};
          list.forEach(function (r) {
            var eff = reportEffectiveTimestampMs(r);
            var meta = formatRuWeekdayDateFromTs(eff);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrder.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
          Object.keys(byDay).forEach(function (d) {
            if (weekdayOrder.indexOf(d) === -1) daysToRender.push(d);
          });
          var parts = [];
          daysToRender.forEach(function (day) {
            var listDay = byDay[day];
            if (!listDay || listDay.length === 0) return;
            listDay.sort(function (a, b) {
              var ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              var tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return tb - ta;
            });
            parts.push('<details class="admin-report-sent-day-spoiler">');
            parts.push('<summary class="admin-report-sent-day-title">' + escapeReportHtml(day) + "</summary>");
            parts.push('<div class="admin-report-sent-day-spoiler__inner">');
            listDay.forEach(function (it, idx) {
              var who = it.authorName || "";
              var comment = it.comment || "";
              var id = idPrefix + (it.id || day + "-" + idx);
              var detailHtml = buildReportDetailHtml(it);
              var reportId = (it.id || "").toString();
              var effMs = reportEffectiveTimestampMs(it);
              var dispDate = formatRuWeekdayDateFromTs(effMs).date || it.date || "";
              parts.push("<div class=\"admin-report-sent-item\" data-report-id=\"" + escapeReportHtml(reportId) + "\"><div class=\"admin-report-sent-item__head\" role=\"button\" tabindex=\"0\" aria-expanded=\"false\" aria-controls=\"" + id + "-detail\"><span class=\"admin-report-sent-item__date\">" + escapeReportHtml(dispDate) + "</span><span class=\"admin-report-sent-item__who\">" + escapeReportHtml(who) + "</span><span class=\"admin-report-sent-item__actions\"><button type=\"button\" class=\"admin-report-sent-edit-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Редактировать\">✎</button><button type=\"button\" class=\"admin-report-sent-delete-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Удалить\">✕</button></span><span class=\"admin-report-sent-item__toggle\" aria-hidden=\"true\">▼</span></div><div class=\"admin-report-sent-detail\" id=\"" + id + "-detail\" hidden><div class=\"admin-report-sent-detail__inner\">" + (comment ? "<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">Комментарий</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(comment) + "</span></div>" : "") + detailHtml + "</div></div></div>");
            });
            parts.push("</div></details>");
          });
          return parts.join("");
        }

        function buildWeekTotalRow(weekTotals, label, weekId) {
          var hasNumeric = Object.keys(weekTotals).some(function (k) {
            if (k === "extraFields") return false;
            return typeof weekTotals[k] === "number" && weekTotals[k] !== 0;
          });
          var hasExtra = weekTotals.extraFields && weekTotals.extraFields.length > 0;
          if (!hasNumeric && !hasExtra) return "";
          var weekDetail = buildReportDetailHtml(weekTotals);
          return (
            '<div class="admin-report-sent-day admin-report-sent-week-total">' +
              '<div class="admin-report-sent-item admin-report-sent-item--week">' +
                '<div class="admin-report-sent-item__head" role="button" tabindex="0" aria-expanded="false" aria-controls="' + weekId + '-detail">' +
                  '<span class="admin-report-sent-item__date">Итого за неделю ' + escapeReportHtml(label) + "</span>" +
                  '<button type="button" class="admin-report-week-copy-btn" data-week-id="' + escapeReportHtml(weekId) + '" title="Скопировать итог за неделю">⧉</button>' +
                  '<span class="admin-report-sent-item__toggle" aria-hidden="true">▼</span>' +
                "</div>" +
                '<div class="admin-report-sent-detail" id="' + weekId + '-detail" hidden>' +
                  '<div class="admin-report-sent-detail__inner">' + weekDetail + "</div>" +
                "</div>" +
              "</div>" +
            "</div>"
          );
        }

        var weeksByKey = {};
        items.forEach(function (r) {
          var eff = reportEffectiveTimestampMs(r);
          if (!eff || eff !== eff) return;
          var ws = weekStartMsForReport(eff);
          var key = String(ws);
          if (!weeksByKey[key]) weeksByKey[key] = [];
          weeksByKey[key].push(r);
        });
        var weekStartsDesc = Object.keys(weeksByKey).map(function (s) {
          return Number(s);
        }).filter(function (n) {
          return n === n;
        }).sort(function (a, b) {
          return b - a;
        });
        var currentItems = weeksByKey[String(currentWeek.start)] || [];
        var archiveWeekStarts = weekStartsDesc.filter(function (ws) {
          return ws !== currentWeek.start;
        });
        function buildWeekBlock(weekStartMs, list, idPrefixBase, isCurrent) {
          var meta = weekMetaFromStart(weekStartMs);
          var totals = sumReportsInWindow(items, meta.start, meta.end);
          var detailsHtml = buildDaysSpoilersHtmlFromList(list, idPrefixBase + meta.key + "-");
          var totalDetailHtml = buildReportDetailHtml(totals);
          return {
            html:
              '<details class="admin-report-sent-week"' + (isCurrent ? " open" : "") + ">" +
                '<summary class="admin-report-sent-archive__summary">Неделя ' + escapeReportHtml(weekCompactLabelFromStartMs(meta.start)) + "</summary>" +
                '<div class="admin-report-sent-week__inner">' +
                  '<details class="admin-report-sent-week-subspoiler"' + (isCurrent ? " open" : "") + ">" +
                    '<summary class="admin-report-sent-day-title">Итого по неделе' +
                      '<button type="button" class="admin-report-week-copy-btn" data-week-id="' + escapeReportHtml("ar-week-" + meta.key) + '" title="Скопировать итог за неделю">⧉</button>' +
                    "</summary>" +
                    '<div class="admin-report-sent-week-subspoiler__inner">' +
                      (totalDetailHtml ? '<div class="admin-report-sent-detail__inner">' + totalDetailHtml + "</div>" : '<p class="admin-report-sent-period-hint">Итогов за неделю пока нет.</p>') +
                    "</div>" +
                  "</details>" +
                  '<details class="admin-report-sent-week-subspoiler">' +
                    '<summary class="admin-report-sent-day-title">По дням</summary>' +
                    '<div class="admin-report-sent-week-subspoiler__inner">' + detailsHtml + "</div>" +
                  "</details>" +
                "</div>" +
              "</details>",
            weekId: "ar-week-" + meta.key,
            totals: totals,
            label: meta.label,
          };
        }

        var currentBlock = buildWeekBlock(currentWeek.start, currentItems, "ar-cur-", true);
        var html = [];
        html.push('<div class="admin-report-sent-current">');
        html.push(currentBlock.html);
        html.push("</div>");

        if (archiveWeekStarts.length > 0) {
          var archiveHtml = [];
          html.push(
            '<details class="admin-report-sent-archive">' +
              '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
              '<div class="admin-report-sent-archive__inner">' +
              (function () {
                archiveWeekStarts.forEach(function (ws) {
                  var block = buildWeekBlock(ws, weeksByKey[String(ws)] || [], "ar-arch-", false);
                  archiveHtml.push(block.html);
                });
                return archiveHtml.join("");
              })() +
              "</div></details>"
          );
        }

        sentList.innerHTML = html.join("");

        var reportById = {};
        items.forEach(function (r) { reportById[r.id] = r; });
        var weekTotalsById = {};
        weekTotalsById[currentBlock.weekId] = { totals: currentBlock.totals, label: currentBlock.label };
        archiveWeekStarts.forEach(function (ws) {
          var meta = weekMetaFromStart(ws);
          weekTotalsById["ar-week-" + meta.key] = {
            totals: sumReportsInWindow(items, meta.start, meta.end),
            label: meta.label,
          };
        });
        var weekLabels = {
          deposit: "Депозит",
          cashout: "Выводы",
          prodamus: "Продамус",
          robokassa: "Робокасса",
          romaCrypto: "Рома крипта",
          botCryptoDep: "Бот крипта деп",
          botExchipDep: "Бот эксчип деп",
          botExchipCashout: "Бот эксчип вывод",
          bonuses: "Бонусы",
          transfers: "Переводы",
          ret: "Возврат",
          sergeyMarina: "Сергей/Марина",
          rakeback: "Рейкбек",
        };
        var weekKeys = ["deposit", "cashout", "prodamus", "robokassa", "romaCrypto", "botCryptoDep", "botExchipDep", "botExchipCashout", "bonuses", "transfers", "ret", "sergeyMarina", "rakeback"];

        function copyTextToClipboard(text) {
          if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "true");
          ta.style.position = "fixed";
          ta.style.top = "-1000px";
          ta.style.left = "-1000px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (e) {}
          try {
            document.body.removeChild(ta);
          } catch (e2) {}
        }

        function weekTotalsToText(totals, label) {
          var lines = [];
          if (!totals) return "";
          lines.push("Итого за неделю " + label);
          weekKeys.forEach(function (k) {
            var v = totals[k];
            if (v != null && v !== "" && (typeof v !== "number" || v !== 0)) lines.push(weekLabels[k] + ": " + String(v));
          });
          if (totals.rakebackRows && totals.rakebackRows.length) {
            totals.rakebackRows.forEach(function (row) {
              if (!row) return;
              var label = [row.room, row.playerId].filter(Boolean).join(" · ");
              if (!label) return;
              lines.push("Итого по неделе рейкбек " + label + ": " + formatReportNumber(row.amount));
            });
          }
          if (totals.extraFields && totals.extraFields.length) {
            totals.extraFields.forEach(function (f) {
              if (!f) return;
              var name = f.name != null ? String(f.name).trim() : "";
              if (!name) name = "Доп.";
              var a = f.amount != null ? f.amount : "";
              if (a === "" || a === "—") return;
              lines.push(name + ": " + String(a));
            });
          }
          return lines.join("\n");
        }

        sentList.querySelectorAll(".admin-report-week-copy-btn").forEach(function (btn) {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var weekId = btn.getAttribute("data-week-id") || "";
            var info = weekTotalsById[weekId];
            if (!info || !info.totals) return;
            var text = weekTotalsToText(info.totals, info.label);
            copyTextToClipboard(text);
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert("Скопировано");
          });
        });

        sentList.querySelectorAll(".admin-report-sent-item__head").forEach(function (head) {
          head.addEventListener("click", function (e) {
            if (e.target.closest(".admin-report-sent-edit-btn") || e.target.closest(".admin-report-sent-delete-btn")) return;
            var item = head.closest(".admin-report-sent-item");
            if (!item) return;
            var detail = item.querySelector(".admin-report-sent-detail");
            var toggle = head.querySelector(".admin-report-sent-item__toggle");
            var isOpen = !detail.hidden;
            detail.hidden = isOpen;
            head.setAttribute("aria-expanded", !isOpen);
            if (toggle) toggle.textContent = isOpen ? "▼" : "▲";
          });
        });
        sentList.querySelectorAll(".admin-report-sent-edit-btn").forEach(function (editBtn) {
          editBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = editBtn.getAttribute("data-report-id");
            var report = reportById[id];
            if (!report) return;
            editingReportId = id;
            editingReport = report;
            fillReportForm(report);
            if (submitBtn) submitBtn.textContent = "Сохранить";
            setActiveTab("form");
            if (dateEl) {
              var effEd = reportEffectiveTimestampMs(report);
              var metaEd = formatRuWeekdayDateFromTs(effEd);
              dateEl.textContent = metaEd.weekday && metaEd.date ? metaEd.weekday + ", " + metaEd.date : (report.weekday || "") + ", " + (report.date || "");
            }
          });
        });
        sentList.querySelectorAll(".admin-report-sent-delete-btn").forEach(function (delBtn) {
          delBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = delBtn.getAttribute("data-report-id");
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            function doDelete(reportId) {
              var base = typeof getApiBase === "function" ? getApiBase() : "";
              if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
                if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA), чтобы удалить отчёт.");
                return;
              }
              var delBody =
                typeof pokerGuestOrAuthedPostBody === "function"
                  ? pokerGuestOrAuthedPostBody({ action: "delete", id: reportId })
                  : { action: "delete", id: reportId };
              fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(delBody)
              })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                  if (data && data.ok) loadSentReports();
                  else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не удалось удалить.");
                })
                .catch(function () {
                  if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
                });
            }
            if (typeof confirm === "function") {
              if (confirm("Удалить этот отчёт?")) doDelete(id);
            } else if (tg && tg.showConfirm) {
              tg.showConfirm("Удалить этот отчёт?", function (ok) { if (ok) doDelete(id); });
            }
          });
        });
      })
      .catch(function () {
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
      });
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
    var mayViewSent = syncSentReportsAccess();
    editingReportId = null;
    editingReport = null;
    if (submitBtn) submitBtn.textContent = "Отправить отчёт";
    var info = getShiftReportDateInfo();
    if (dateEl) dateEl.textContent = info.label;
    setActiveTab("form");
    fillReportForm(null);
    if (mayViewSent) loadSentReports();
  }
  btn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (tabs && tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-admin-report-tab") || "form";
        if (name === "sent" && !canViewSentReports()) return;
        setActiveTab(name);
        if (name === "sent") loadSentReports();
      });
    });
  }
  var addExtraBtn = document.getElementById("adminReportAddExtraBtn");
  if (addExtraBtn && modal) {
    addExtraBtn.addEventListener("click", function () {
      var tbody = document.getElementById("adminReportTableBody");
      if (!tbody) return;
      var template = tbody.querySelector(".admin-report-extra-row");
      if (!template) return;
      var clone = template.cloneNode(true);
      clone.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
      tbody.insertBefore(clone, template.nextSibling);
    });
  }
  if (rakebackAddBtn) {
    rakebackAddBtn.addEventListener("click", addRakebackBaseRow);
  }
  if (rakebackRoomTabs && rakebackRoomTabs.length) {
    rakebackRoomTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setRakebackRoomTab(tab.getAttribute("data-rakeback-room-tab"));
      });
    });
  }
  if (rakebackBody) {
    rakebackBody.addEventListener("input", function () {
      syncRakebackTable();
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("change", function () {
      syncRakebackTable();
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("click", function (e) {
      var saveBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-save]") : null;
      if (saveBtn) {
        var saveRow = saveBtn.closest("[data-rakeback-row]");
        if (!saveRow || !isRakebackRowFilled(saveRow)) return;
        syncRakebackTable();
        setRakebackRowSaved(saveRow, true);
        saveRakebackDraftRows();
        showRakebackStatus("Запись добавлена");
        return;
      }
      var editBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-edit]") : null;
      if (editBtn) {
        setRakebackRowSaved(editBtn.closest("[data-rakeback-row]"), false);
        saveRakebackDraftRows();
        showRakebackStatus("");
        return;
      }
      var addAddonBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-add-addon]") : null;
      if (addAddonBtn) {
        var addonBaseRow = addAddonBtn.closest("[data-rakeback-row]");
        if (!canAddRakebackAddon(addonBaseRow)) return;
        addRakebackAddonRow(addonBaseRow);
        saveRakebackDraftRows();
        showRakebackStatus("Подзапись добавлена");
        return;
      }
      var removeBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-remove]") : null;
      if (!removeBtn) return;
      var row = removeBtn.closest("[data-rakeback-row]");
      if (!row) return;
      var removeConfirmed = removeBtn.getAttribute("data-rakeback-remove-confirmed") === "1";
      if (removeConfirmed) {
        removeBtn.removeAttribute("data-rakeback-remove-confirmed");
      } else if (typeof confirm === "function") {
        removeConfirmed = confirm("Удалить эту запись?");
      } else if (tg && tg.showConfirm) {
        tg.showConfirm("Удалить эту запись?", function (ok) {
          if (!ok) return;
          removeBtn.setAttribute("data-rakeback-remove-confirmed", "1");
          removeBtn.click();
        });
        return;
      } else {
        removeConfirmed = true;
      }
      if (!removeConfirmed) return;
      var dataRows = rakebackBody.querySelectorAll("[data-rakeback-row]");
      var groupId = row.getAttribute("data-rakeback-group") || "";
      if (row.getAttribute("data-rakeback-kind") === "base") {
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (candidate) {
          if (candidate.getAttribute("data-rakeback-group") === groupId && candidate !== row) {
            candidate.parentNode.removeChild(candidate);
          }
        });
      }
      if (dataRows.length <= 1) {
        row.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
        var select = row.querySelector("select");
        if (select) select.value = "P21";
      } else {
        row.parentNode.removeChild(row);
      }
      syncRakebackTable();
      saveRakebackDraftRows();
    });
  }
  if (modal) {
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || !e.target || !e.target.matches || !e.target.matches("input.admin-report-input,input.admin-report-rakeback-input")) return;
      e.preventDefault();
      var activePanel = modal.querySelector(".admin-report-panel--active");
      if (!activePanel) return;
      var inputs = activePanel.querySelectorAll("input.admin-report-input:not([readonly]),input.admin-report-rakeback-input:not([readonly])");
      var idx = -1;
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] === e.target) { idx = i; break; }
      }
      if (idx < 0) return;
      if (idx + 1 < inputs.length) {
        inputs[idx + 1].focus();
      } else if (submitBtn) {
        submitBtn.focus();
      }
    });
  }
  function buildPayload() {
    var d = getShiftReportDateInfo();
    var getVal = function (id) {
      var el = document.getElementById(id);
      if (!el) return 0;
      return parseReportNumber(el.value);
    };
    var rakebackTotal = syncRakebackTable();
    var rakebackRows = collectRakebackRows(false);
    var extraRows = modal.querySelectorAll(".admin-report-extra-row");
    var extraFields = [];
    var extraTotal = 0;
    extraRows.forEach(function (row) {
      var nameInput = row.querySelector(".admin-report-extra-name");
      var amountInput = row.querySelector(".admin-report-extra-amount");
      var name = nameInput && nameInput.value ? String(nameInput.value).trim() : "";
      var amount = 0;
      if (amountInput) {
        var v = parseFloat(String(amountInput.value || "").replace(",", "."));
        amount = isNaN(v) ? 0 : v;
      }
      if (name || amount) {
        extraFields.push({ name: name, amount: amount });
        extraTotal += amount;
      }
    });
    var corePayload = {
      iso: d.iso,
      date: d.date,
      weekday: d.weekday.charAt(0).toUpperCase() + d.weekday.slice(1),
      deposit: getVal("adminReportDeposit"),
      cashout: getVal("adminReportCashout"),
      prodamus: getVal("adminReportProdamus"),
      robokassa: getVal("adminReportRobokassa"),
      romaCrypto: getVal("adminReportRomaCrypto"),
      botCryptoDep: getVal("adminReportBotCryptoDep"),
      botExchipDep: getVal("adminReportBotExchipDep"),
      botExchipCashout: getVal("adminReportBotExchipCashout"),
      bonuses: getVal("adminReportBonuses"),
      transfers: getVal("adminReportTransfers"),
      ret: getVal("adminReportReturn"),
      sergeyMarina: getVal("adminReportSergeyMarina"),
      rakeback: Math.round(rakebackTotal * 100) / 100,
      rakebackRows: rakebackRows,
      extraFields: extraFields
    };
    var payload =
      typeof pokerGuestOrAuthedPostBody === "function"
        ? pokerGuestOrAuthedPostBody(corePayload)
        : corePayload;
    var total = payload.deposit - payload.cashout + payload.prodamus + payload.robokassa + payload.romaCrypto + payload.botCryptoDep + payload.botExchipDep - payload.botExchipCashout - payload.bonuses + payload.transfers + payload.ret + payload.sergeyMarina + payload.rakeback + extraTotal;
    payload.total = total;
    payload.extraName = extraFields[0] ? extraFields[0].name : "";
    payload.extraAmount = extraTotal;
    payload.comment = extraFields.map(function (f) { return f.name; }).filter(Boolean).join(", ");
    return payload;
  }

  function setFormVal(id, val) {
    var el = document.getElementById(id);
    if (!el) return;
    el.value = val != null && val !== "" ? String(val) : "";
  }

  function fillReportForm(report) {
    if (!report) {
      setFormVal("adminReportDeposit", "");
      setFormVal("adminReportCashout", "");
      setFormVal("adminReportProdamus", "");
      setFormVal("adminReportRobokassa", "");
      setFormVal("adminReportRomaCrypto", "");
      setFormVal("adminReportBotCryptoDep", "");
      setFormVal("adminReportBotExchipDep", "");
      setFormVal("adminReportBotExchipCashout", "");
      setFormVal("adminReportBonuses", "");
      setFormVal("adminReportTransfers", "");
      setFormVal("adminReportReturn", "");
      setFormVal("adminReportSergeyMarina", "");
      setFormVal("adminReportRakeback", "");
      fillRakebackTable(readRakebackDraftRows(), "");
      var tbody = document.getElementById("adminReportTableBody");
      if (tbody) {
        var extras = tbody.querySelectorAll(".admin-report-extra-row");
        extras.forEach(function (row, i) {
          if (i === 0) {
            row.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
          } else {
            row.parentNode.removeChild(row);
          }
        });
      }
      return;
    }
    setFormVal("adminReportDeposit", report.deposit);
    setFormVal("adminReportCashout", report.cashout);
    setFormVal("adminReportProdamus", report.prodamus);
    setFormVal("adminReportRobokassa", report.robokassa);
    setFormVal("adminReportRomaCrypto", report.romaCrypto);
    setFormVal("adminReportBotCryptoDep", report.botCryptoDep);
    setFormVal("adminReportBotExchipDep", report.botExchipDep);
    setFormVal("adminReportBotExchipCashout", report.botExchipCashout);
    setFormVal("adminReportBonuses", report.bonuses);
    setFormVal("adminReportTransfers", report.transfers);
    setFormVal("adminReportReturn", report.ret);
    setFormVal("adminReportSergeyMarina", report.sergeyMarina);
    setFormVal("adminReportRakeback", report.rakeback != null ? report.rakeback : "");
    fillRakebackTable(report.rakebackRows, report.rakeback);
    var tbody = document.getElementById("adminReportTableBody");
    if (tbody) {
      var template = tbody.querySelector(".admin-report-extra-row");
      var extras = tbody.querySelectorAll(".admin-report-extra-row");
      extras.forEach(function (row, i) {
        if (i === 0) {
          var nameInput = row.querySelector(".admin-report-extra-name");
          var amountInput = row.querySelector(".admin-report-extra-amount");
          if (report.extraFields && report.extraFields[0]) {
            if (nameInput) nameInput.value = report.extraFields[0].name != null ? report.extraFields[0].name : "";
            if (amountInput) amountInput.value = report.extraFields[0].amount != null ? report.extraFields[0].amount : "";
          } else {
            if (nameInput) nameInput.value = "";
            if (amountInput) amountInput.value = "";
          }
        } else {
          row.parentNode.removeChild(row);
        }
      });
      if (report.extraFields && report.extraFields.length > 1) {
        for (var j = 1; j < report.extraFields.length; j++) {
          var clone = template.cloneNode(true);
          clone.querySelector(".admin-report-extra-name").value = report.extraFields[j].name != null ? report.extraFields[j].name : "";
          clone.querySelector(".admin-report-extra-amount").value = report.extraFields[j].amount != null ? report.extraFields[j].amount : "";
          tbody.insertBefore(clone, template.nextSibling);
        }
      }
    }
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA), чтобы отправить отчёт.");
        return;
      }
      var payload = buildPayload();
      if (editingReportId && editingReport) {
        payload.id = editingReportId;
        payload.date = editingReport.date || payload.date;
        payload.weekday = editingReport.weekday || payload.weekday;
      }
      submitBtn.disabled = true;
      var method = editingReportId ? "PUT" : "POST";
      var url = base.replace(/\/$/, "") + "/api/admin-report-shifts";
      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          submitBtn.disabled = false;
          if (data && data.ok) {
            editingReportId = null;
            editingReport = null;
            if (submitBtn) submitBtn.textContent = "Отправить отчёт";
            clearRakebackDraftRows();
            fillReportForm(null);
            if (canViewSentReports()) {
              loadSentReports();
              setActiveTab("sent");
            } else if (tg && tg.showAlert) {
              tg.showAlert("Отчёт отправлен.");
            }
          } else {
            if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка отправки.");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }
}
window.pokerInitAdminReportModal = initAdminReportModal;
initAdminReportModal();

function initBroadcastReportsModal() {
  var btn = document.getElementById("adminBroadcastReportsBtn");
  var modal = document.getElementById("broadcastReportsModal");
  var closeBtn = document.getElementById("broadcastReportsModalClose");
  var backdrop = document.getElementById("broadcastReportsModalBackdrop");
  if (!btn || !modal) return;
  if (btn.dataset.broadcastReportsBound === "1") return;
  btn.dataset.broadcastReportsBound = "1";
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
  }
  btn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}
window.pokerInitBroadcastReportsModal = initBroadcastReportsModal;
initBroadcastReportsModal();
