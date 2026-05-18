(function () {
  function init(scope) {
    scope = scope || {};
    with (scope) {
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

      function formatRakebackCellNumber(n) {
        return parseReportNumber(n) === 0 ? "" : formatReportNumber(n);
      }

      function formatRakebackAmountCell(n) {
        return parseReportNumber(n) === 0 ? "" : formatReportRubleNumber(n);
      }

      function formatReportRubleNumber(n) {
        var num = parseReportNumber(n);
        if (!num) return "0";
        return String(Math.round(num));
      }

      var RAKEBACK_TEMPLATE_SPOILER_STORAGE_KEY = "poker_admin_report_rakeback_templates_open";

      function readRakebackTemplateSpoilerOpen() {
        return false;
      }

      function getRakebackRoomLabel(room) {
        var normalized = normalizeRakebackRoom(room);
        if (normalized === "X") return "Хпокер";
        if (normalized === "Supr") return "Супрема";
        if (normalized === "PP") return "PPpoker";
        return "Покер21";
      }

      function getRakebackRoomMultiplier(room) {
        var normalized = normalizeRakebackRoom(room);
        if (normalized === "X") return 100;
        if (normalized === "Supr" || normalized === "PP") return 115;
        return 1;
      }

      function getRakebackReportAmount(room, displayAmount) {
        var amount = Math.round(parseReportNumber(displayAmount));
        return amount * getRakebackRoomMultiplier(room);
      }

      function getRakebackReportRake(row) {
        var room = getRakebackRowRoom(row);
        return getRakebackReportAmount(room, getRakebackRowCalculationBase(row));
      }

      function getRakebackRowRawRake(row) {
        if (!row) return 0;
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        return parseReportNumber(rakeInput ? rakeInput.value : "");
      }

      function getRakebackRowFullReportRake(row) {
        if (!row) return 0;
        return getRakebackReportAmount(getRakebackRowRoom(row), getRakebackRowRawRake(row));
      }

      function addRakebackLatestGroupRake(latestByGroup, row, index) {
        if (!latestByGroup || !row) return;
        var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + (Number(index) || 0));
        latestByGroup[groupId] = row;
      }

      function sumRakebackLatestGroupRake(latestByGroup) {
        return Object.keys(latestByGroup || {}).reduce(function (sum, key) {
          return sum + getRakebackRowFullReportRake(latestByGroup[key]);
        }, 0);
      }

      function addCollectedLatestGroupRake(latestByGroup, row, index) {
        if (!latestByGroup || !row) return;
        var groupId = row.groupId || ("__row_" + (Number(index) || 0));
        latestByGroup[groupId] = row;
      }

      function getCollectedRowFullReportRake(row) {
        if (!row) return 0;
        return getRakebackReportAmount(row.room, parseReportNumber(row.rake));
      }

      function sumCollectedLatestGroupRake(latestByGroup) {
        return Object.keys(latestByGroup || {}).reduce(function (sum, key) {
          return sum + getCollectedRowFullReportRake(latestByGroup[key]);
        }, 0);
      }

      function formatRakebackRoomTotal(room, displayAmount, reportAmount) {
        var multiplier = getRakebackRoomMultiplier(room);
        if (multiplier === 1) return formatReportRubleNumber(reportAmount);
        var chips = Math.round(parseReportNumber(displayAmount));
        return formatReportRubleNumber(chips) + " фишек × " + multiplier + " = " + formatReportRubleNumber(reportAmount);
      }

      function formatRakebackSummaryPair(rake, rakeback) {
        return formatReportRubleNumber(rake) + " / " + formatReportRubleNumber(rakeback);
      }

      function copyReportText(text) {
        var value = String(text != null ? text : "").trim();
        if (!value) return Promise.reject(new Error("empty"));
        if (navigator.clipboard && navigator.clipboard.writeText) {
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

      function nextRakebackGroupId() {
        rakebackGroupSeq += 1;
        return "rb-" + Date.now().toString(36) + "-" + rakebackGroupSeq;
      }

      function getCurrentRakebackOwnerId() {
        var users = [];
        try {
          var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
          if (resolved) users.push(resolved);
        } catch (eResolved) {}
        try {
          var authUser = window.__pokerTelegramAuth && window.__pokerTelegramAuth.user ? window.__pokerTelegramAuth.user : null;
          if (authUser) users.push(authUser);
        } catch (eAuthUser) {}
        try {
          var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
          if (rec && rec.user) users.push(rec.user);
        } catch (eRec) {}
        for (var i = 0; i < users.length; i++) {
          var u = users[i] || {};
          var memberId = u.memberId != null ? String(u.memberId).trim() : "";
          if (memberId) return memberId;
          var rawId = u.id != null ? String(u.id).trim() : "";
          if (!rawId) continue;
          if (rawId.indexOf("tg_") === 0 || rawId.indexOf("vk_") === 0) return rawId;
          if (u.is_vk || u.vk || u.vkId != null) return "vk_" + rawId.replace(/^vk_/, "");
          return "tg_" + rawId.replace(/^tg_/, "");
        }
        return "";
      }

      function getRakebackRoomOptions(selected) {
        selected = normalizeRakebackRoom(selected);
        return RAKEBACK_ROOMS.map(function (room) {
          return '<option value="' + escapeReportHtml(room) + '"' + (room === selected ? " selected" : "") + ">" + escapeReportHtml(room) + "</option>";
        }).join("");
      }

      function getRakebackTotalsByDate() {
        if (!rakebackBody) return [];
        var dateMap = {};
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
          var rowStamp = getRakebackRowEntryAddedAt(row, index);
          if (!Number.isFinite(rowStamp)) return;
          var archived = isRakebackEntryArchivedByStamp(rowStamp);
          if (rakebackArchiveMode ? !archived : archived) return;
          var room = getRakebackRowRoom(row);
          var roomAmount = Math.round(getRakebackRowAmount(row));
          var rakeback = getRakebackReportAmount(room, roomAmount);
          if (rakeback === 0) return;
          var key = getRakebackMoscowDayKey(rowStamp);
          if (!dateMap[key]) dateMap[key] = { key: key, stamp: rowStamp, rakeback: 0 };
          dateMap[key].stamp = Math.max(dateMap[key].stamp, rowStamp);
          dateMap[key].rakeback += rakeback;
        });
        return Object.keys(dateMap).map(function (key) {
          return dateMap[key];
        }).sort(function (a, b) {
          return b.stamp - a.stamp;
        });
      }

      function renderRakebackTotalsModal() {
        if (!rakebackTotalsList) return;
        var roomHtml = RAKEBACK_ROOMS.map(function (room) {
          var total = rakebackRoomTotals[room] || { display: 0, report: 0, rake: 0 };
          var multiplier = getRakebackRoomMultiplier(room);
          var amount = formatRakebackSummaryPair(total.rake, total.report);
          var formula = "";
          if (multiplier !== 1 && parseReportNumber(total.display) !== 0) {
            formula = '<span class="admin-report-rakeback-totals-modal__formula">' + escapeReportHtml(formatRakebackRoomTotal(room, total.display, total.report)) + "</span>";
          }
          return '<div class="admin-report-rakeback-totals-modal__row">' +
            '<span class="admin-report-rakeback-totals-modal__room">' + escapeReportHtml(getRakebackRoomLabel(room)) + "</span>" +
            '<span class="admin-report-rakeback-totals-modal__amount">' + escapeReportHtml(amount) + "</span>" +
            formula +
          "</div>";
        }).join("");
        var dateRows = getRakebackTotalsByDate();
        var dateHtml = dateRows.length ? '<div class="admin-report-rakeback-totals-modal__section-title">Итого по датам</div>' + dateRows.map(function (day) {
          return '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--date">' +
            '<span class="admin-report-rakeback-totals-modal__room">' + escapeReportHtml(getRakebackDateSeparatorLabel(day.stamp)) + "</span>" +
            '<span class="admin-report-rakeback-totals-modal__amount">' + escapeReportHtml(formatReportRubleNumber(day.rakeback)) + "</span>" +
          "</div>";
        }).join("") : "";
        rakebackTotalsList.innerHTML = roomHtml + dateHtml;
      }

      function openRakebackTotalsModal() {
        if (!rakebackTotalsModal) return;
        renderRakebackTotalsModal();
        rakebackTotalsModal.hidden = false;
        if (rakebackGrandTotalBtn) rakebackGrandTotalBtn.setAttribute("aria-expanded", "true");
      }

      function closeRakebackTotalsModal() {
        if (!rakebackTotalsModal) return;
        rakebackTotalsModal.hidden = true;
        if (rakebackGrandTotalBtn) rakebackGrandTotalBtn.setAttribute("aria-expanded", "false");
      }

      function normalizeRakebackRowColor(color) {
        color = String(color || "").trim().toLowerCase();
        if (RAKEBACK_ROW_LEGACY_COLOR_MAP[color]) return RAKEBACK_ROW_LEGACY_COLOR_MAP[color];
        for (var i = 0; i < RAKEBACK_ROW_COLORS.length; i++) {
          if (RAKEBACK_ROW_COLORS[i].value.toLowerCase() === color) return RAKEBACK_ROW_COLORS[i].value;
        }
        return "";
      }

      function getRakebackRowColorButtons(selectedColor) {
        selectedColor = normalizeRakebackRowColor(selectedColor);
        var buttons = RAKEBACK_ROW_COLORS.map(function (color) {
          var selected = color.value === selectedColor;
          return '<button type="button" class="admin-report-rakeback-color-swatch" data-rakeback-color-value="' + escapeReportHtml(color.value) + '" title="' + escapeReportHtml(color.label) + '" aria-label="' + escapeReportHtml(color.label) + '"' + (selected ? ' data-rakeback-color-selected="1"' : "") + ' style="--rakeback-swatch:' + escapeReportHtml(color.value) + '"></button>';
        });
        buttons.push('<button type="button" class="admin-report-rakeback-color-swatch admin-report-rakeback-color-swatch--clear" data-rakeback-color-value="" title="Сбросить цвет" aria-label="Сбросить цвет">×</button>');
        return buttons.join("");
      }

      function closeRakebackColorMenus(exceptRow) {
        if (!rakebackBody) return;
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-color-menu]")).forEach(function (menu) {
          var row = menu.closest("[data-rakeback-row]");
          if (exceptRow && row === exceptRow) return;
          menu.hidden = true;
        });
      }

      function markRakebackCell(cell, copied) {
        if (!rakebackBody || !cell) return;
        var skipCellHighlight = cell.classList && cell.classList.contains("admin-report-rakeback-discount-cell");
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-cell-selected],[data-rakeback-cell-copied]")).forEach(function (td) {
          if (td === cell) return;
          td.removeAttribute("data-rakeback-cell-selected");
          td.removeAttribute("data-rakeback-cell-copied");
        });
        if (skipCellHighlight) {
          cell.removeAttribute("data-rakeback-cell-selected");
          cell.removeAttribute("data-rakeback-cell-copied");
          return;
        }
        cell.setAttribute("data-rakeback-cell-selected", "1");
        if (copied) cell.setAttribute("data-rakeback-cell-copied", "1");
        else cell.removeAttribute("data-rakeback-cell-copied");
      }

      function applyRakebackRowColor(row, color) {
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

      function normalizeRakebackRoom(room) {
        var raw = String(room || "").trim();
        var lower = raw.toLowerCase();
        if (!raw || raw === "Покер21" || lower === "poker21" || lower === "покер21" || lower === "p21") return "P21";
        if (raw === "Х" || lower === "x" || lower === "xpoker" || lower === "хпокер") return "X";
        if (raw === "Супрема" || lower === "suprema" || lower === "supr") return "Supr";
        if (lower === "pp" || lower === "pppoker") return "PP";
        return raw;
      }

      function parseRakebackTimeValue(raw) {
        if (raw == null || raw === "") return NaN;
        if (typeof raw === "number") return Number.isFinite(raw) ? raw : NaN;
        var text = String(raw).trim();
        if (!text) return NaN;
        if (/^\d+(?:\.\d+)?$/.test(text)) {
          var numeric = Number(text);
          return Number.isFinite(numeric) ? numeric : NaN;
        }
        var parsed = Date.parse(text);
        return Number.isFinite(parsed) ? parsed : NaN;
      }

      function getFirstRakebackTimeValue(values, fallback) {
        for (var i = 0; i < values.length; i++) {
          var parsed = parseRakebackTimeValue(values[i]);
          if (Number.isFinite(parsed)) return parsed;
        }
        return fallback;
      }

      function getRakebackTemplateIdsForRoom(room) {
        var normalizedRoom = normalizeRakebackRoom(room || "P21");
        if (normalizedRoom === "P21") return P21_RAKEBACK_TEMPLATE_IDS;
        if (normalizedRoom === "X") return X_RAKEBACK_TEMPLATE_IDS;
        if (normalizedRoom === "PP") return PP_RAKEBACK_TEMPLATE_IDS;
        if (normalizedRoom === "Supr") return SUPR_RAKEBACK_TEMPLATE_IDS;
        return [];
      }

      function getRakebackTemplateCreatedAt(room, playerId) {
        playerId = String(playerId || "").trim();
        if (!playerId) return NaN;
        var ids = getRakebackTemplateIdsForRoom(room);
        return ids.indexOf(playerId) !== -1 ? RAKEBACK_TEMPLATE_CREATED_AT : NaN;
      }

      function isRakebackTemplateEntryStamp(room, playerId, stamp) {
        var templateStamp = getRakebackTemplateCreatedAt(room, playerId);
        stamp = Number(stamp);
        return Number.isFinite(templateStamp) && Number.isFinite(stamp) && Math.abs(stamp - templateStamp) < 1000;
      }

      function getRakebackTemplateKey(room, playerId) {
        var normalizedRoom = normalizeRakebackRoom(room || "P21");
        var id = String(playerId || "").trim();
        return normalizedRoom && id ? normalizedRoom + "\u0000" + id : "";
      }

      function isRakebackTemplateId(room, playerId) {
        playerId = String(playerId || "").trim();
        if (!playerId) return false;
        return getRakebackTemplateIdsForRoom(room).indexOf(playerId) !== -1;
      }

      function normalizeRakebackDeletedTemplates(items) {
        var seen = {};
        var out = [];
        if (!Array.isArray(items)) return out;
        items.forEach(function (item) {
          if (!item) return;
          var room = normalizeRakebackRoom(item.room || "P21");
          var playerId = String(item.playerId || item.id || "").trim();
          var key = getRakebackTemplateKey(room, playerId);
          if (!key || seen[key]) return;
          seen[key] = true;
          out.push({
            room: room,
            playerId: playerId,
            deletedAt: item.deletedAt || Date.now(),
            deletedBy: item.deletedBy || item.ownerId || getCurrentRakebackOwnerId(),
          });
        });
        return out;
      }

      function isRakebackTemplateLikeData(data) {
        if (!data) return false;
        if (data.carryForward === true || data.templateCarryForward === true) return false;
        if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
        return parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0;
      }

      function isRakebackLazyTemplateData(data) {
        if (!data) return false;
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        if (kind === "addon") return false;
        if (data.carryForward !== true && data.templateCarryForward !== true) return false;
        if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
        if (data.accounted || data.reportedAt || data.reportId) return false;
        return parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0;
      }

      function normalizeRakebackLazyTemplateData(data) {
        if (!data) return null;
        var room = normalizeRakebackRoom(data.room || "P21");
        var playerId = String(data.playerId || data.id || "").trim();
        if (!playerId) return null;
        return {
          groupId: data.groupId || "",
          kind: "base",
          room: room,
          playerId: playerId,
          rake: "",
          percent: data.percent != null ? data.percent : "",
          carryForward: true,
          templateCarryForward: true,
          discount15: !!(data.discount15 || data.subtract15),
          ownerId: data.ownerId || data.authorId || "",
          color: data.color || data.rowColor || data.highlightColor || "",
          createdAt: data.createdAt || data.addedAt || data.created || getRakebackTemplateCreatedAt(room, playerId) || "",
          standardAt: data.standardAt || data.orderAt || data.sortAt || "",
          entryAddedAt: data.entryAddedAt || data.firstAddedAt || "",
          saved: data.saved !== false,
        };
      }

      function rememberRakebackLazyTemplateRows(rows) {
        var byKey = {};
        rakebackLazyTemplateRows.forEach(function (row) {
          var normalized = normalizeRakebackLazyTemplateData(row);
          var key = normalized ? getRakebackTemplateKey(normalized.room, normalized.playerId) : "";
          if (key) byKey[key] = normalized;
        });
        (Array.isArray(rows) ? rows : []).forEach(function (row) {
          if (!isRakebackLazyTemplateData(row)) return;
          var normalized = normalizeRakebackLazyTemplateData(row);
          var key = normalized ? getRakebackTemplateKey(normalized.room, normalized.playerId) : "";
          if (key) byKey[key] = normalized;
        });
        rakebackLazyTemplateRows = Object.keys(byKey).map(function (key) { return byKey[key]; });
      }

      function hasRakebackStoredEntryData(data) {
        if (!data) return false;
        var playerId = String(data.playerId || data.id || "").trim();
        if ((data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) && playerId) return true;
        if (data.accounted || data.reportedAt || data.reportId) return true;
        if (!playerId &&
          parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.percent) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0) return false;
        return parseReportNumber(data.rake) !== 0 ||
          parseReportNumber(data.percent) !== 0 ||
          parseReportNumber(data.roomAmount) !== 0 ||
          parseReportNumber(data.chipAmount) !== 0 ||
          parseReportNumber(data.amount) !== 0;
      }

      function getRakebackStoredRowMergeKey(data) {
        if (!data) return "";
        var room = normalizeRakebackRoom(data.room || "P21");
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        var playerId = String(data.playerId || data.id || "").trim();
        var stamp = getFirstRakebackTimeValue([data.entryAddedAt, data.firstAddedAt, data.reportedAt, data.createdAt, data.addedAt, data.created], NaN);
        var dayKey = Number.isFinite(stamp) ? getRakebackMoscowDayKey(stamp) : "";
        return [
          room,
          kind,
          playerId,
          dayKey,
          String(Math.round(parseReportNumber(data.rake) * 100) / 100),
          String(Math.round(parseReportNumber(data.percent) * 100) / 100),
          data.discount15 || data.subtract15 ? "15" : "",
          data.groupId || "",
        ].join("|");
      }

      function getRakebackDeletedRowKey(data) {
        if (!data) return "";
        var room = normalizeRakebackRoom(data.room || "P21");
        var playerId = String(data.playerId || data.id || "").trim();
        return room && playerId ? room + "\u0000" + playerId : "";
      }

      function getRakebackDeletedStoredRowKey(data) {
        if (!data) return "";
        var groupId = String(data.groupId || "").trim();
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        var room = normalizeRakebackRoom(data.room || "P21");
        var playerId = String(data.playerId || data.id || "").trim();
        if (!groupId || !room || !playerId) return "";
        return [
          groupId,
          kind,
          room,
          playerId,
          String(data.reportId || "").trim(),
          String(data.reportedAt || "").trim(),
        ].join("|");
      }

      function normalizeRakebackDeletedRows(items) {
        var seen = {};
        var out = [];
        if (!Array.isArray(items)) return out;
        items.forEach(function (item) {
          if (!item) return;
          var room = normalizeRakebackRoom(item.room || "P21");
          var playerId = String(item.playerId || item.id || "").trim();
          var groupId = String(item.groupId || "").trim();
          var kind = item.kind === "addon" || item.isAddon ? "addon" : "base";
          var key = getRakebackDeletedStoredRowKey({
            groupId: groupId,
            kind: kind,
            room: room,
            playerId: playerId,
            reportId: item.reportId || "",
            reportedAt: item.reportedAt || "",
          });
          if (!key || seen[key]) return;
          seen[key] = true;
          out.push({
            groupId: groupId,
            kind: kind,
            room: room,
            playerId: playerId,
            reportId: item.reportId || "",
            reportedAt: item.reportedAt || "",
            ownerId: item.ownerId || item.authorId || "",
            deletedAt: item.deletedAt || Date.now(),
            deletedBy: item.deletedBy || getCurrentRakebackOwnerId(),
          });
        });
        return out;
      }

      function isDeletedRakebackTemplateRow(data) {
        if (!data) return false;
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        if (kind === "addon") return false;
        if (data.accounted || data.reportedAt || data.reportId) return false;
        if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
        if (parseReportNumber(data.rake) !== 0 ||
          parseReportNumber(data.roomAmount) !== 0 ||
          parseReportNumber(data.chipAmount) !== 0 ||
          parseReportNumber(data.amount) !== 0) {
          return false;
        }
        return data.carryForward === true || data.templateCarryForward === true || isRakebackTemplateLikeData(data);
      }

      function filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows) {
        var deletedMap = {};
        normalizeRakebackDeletedTemplates(deletedTemplates).forEach(function (item) {
          var key = getRakebackDeletedRowKey(item);
          if (key) deletedMap[key] = true;
        });
        var deletedRowsMap = {};
        normalizeRakebackDeletedRows(deletedRows).forEach(function (item) {
          var key = getRakebackDeletedStoredRowKey(item);
          if (key) deletedRowsMap[key] = true;
        });
        return (Array.isArray(rows) ? rows : []).filter(function (row) {
          var storedKey = getRakebackDeletedStoredRowKey(row);
          if (storedKey && deletedRowsMap[storedKey]) return false;
          var key = getRakebackDeletedRowKey(row);
          return !key || !deletedMap[key] || !isDeletedRakebackTemplateRow(row);
        });
      }

      function isRakebackEmptyTemplateDuplicateRow(data) {
        if (!data) return false;
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        if (kind === "addon") return false;
        if (data.accounted || data.reportedAt || data.reportId) return false;
        if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
        if ((data.carryForward === true || data.templateCarryForward === true) &&
          (parseReportNumber(data.percent) !== 0 || data.discount15 === true || data.subtract15 === true)) {
          return false;
        }
        return parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0;
      }

      function dedupeRakebackTemplateRows(rows) {
        var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
        var groupHasAddon = {};
        list.forEach(function (row) {
          if (!row) return;
          var groupId = String(row.groupId || "").trim();
          if (!groupId) return;
          if (row.kind === "addon" || row.isAddon) groupHasAddon[groupId] = true;
        });
        var realByKey = {};
        list.forEach(function (row) {
          if (!row || isRakebackEmptyTemplateDuplicateRow(row)) return;
          var kind = row.kind === "addon" || row.isAddon ? "addon" : "base";
          if (kind === "addon") return;
          var key = getRakebackTemplateKey(row.room || "P21", row.playerId || row.id || "");
          if (key) realByKey[key] = true;
        });
        var templateSeen = {};
        return list.filter(function (row) {
          if (!row || !isRakebackEmptyTemplateDuplicateRow(row)) return !!row;
          var groupId = String(row.groupId || "").trim();
          if (groupId && groupHasAddon[groupId]) return true;
          var key = getRakebackTemplateKey(row.room || "P21", row.playerId || row.id || "");
          if (!key) return true;
          if (realByKey[key]) return false;
          if (templateSeen[key]) return false;
          templateSeen[key] = true;
          return true;
        });
      }

      function mergeRakebackDraftRows(serverRows, localRows) {
        var merged = dedupeRakebackTemplateRows(serverRows);
        var seen = {};
        merged.forEach(function (row) {
          var key = getRakebackStoredRowMergeKey(row);
          if (key) seen[key] = true;
        });
        (Array.isArray(localRows) ? localRows : []).forEach(function (row) {
          if (!row || !hasRakebackStoredEntryData(row)) return;
          if (row.carryForward === true || row.templateCarryForward === true) return;
          if (isRakebackTemplateLikeData(row)) return;
          var key = getRakebackStoredRowMergeKey(row);
          if (!key || seen[key]) return;
          seen[key] = true;
          merged.push(row);
        });
        return merged;
      }

      function createRakebackRow(data) {
        data = data || {};
        var tr = document.createElement("tr");
        var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
        var groupId = data.groupId || nextRakebackGroupId();
        var explicitZeroRake = data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true;
        var templateCreatedAt = getRakebackTemplateCreatedAt(data.room || "P21", data.playerId || data.id || "");
        var createdAt = getFirstRakebackTimeValue([data.createdAt, data.addedAt, data.created], Date.now());
        var createdAtIsTemplate = isRakebackTemplateEntryStamp(data.room || "P21", data.playerId || data.id || "", createdAt);
        if (Number.isFinite(templateCreatedAt) && isRakebackTemplateLikeData(data)) {
          createdAt = Math.min(createdAt, templateCreatedAt);
          createdAtIsTemplate = true;
        }
        var standardAt = getFirstRakebackTimeValue([data.standardAt, data.orderAt, data.sortAt], createdAt);
        var templateLikeData = isRakebackTemplateLikeData(data);
        var accountedData = !templateLikeData && (data.accounted || data.reportedAt || data.reportId);
        var hasInitialEntryData = !templateLikeData && (data.saved || accountedData || explicitZeroRake ||
          parseReportNumber(data.rake) !== 0 || parseReportNumber(data.roomAmount) !== 0 ||
          parseReportNumber(data.chipAmount) !== 0 || parseReportNumber(data.amount) !== 0);
        var entryAddedAt = getFirstRakebackTimeValue([data.entryAddedAt, data.firstAddedAt], NaN);
        var reportedAt = parseRakebackTimeValue(data.reportedAt);
        if (Number.isFinite(reportedAt) && (!Number.isFinite(entryAddedAt) || reportedAt < entryAddedAt)) {
          entryAddedAt = reportedAt;
        }
        if (hasInitialEntryData && !data.accounted && !data.reportedAt && !data.reportId && isRakebackTemplateEntryStamp(data.room || "P21", data.playerId || data.id || "", entryAddedAt)) {
          entryAddedAt = Date.now();
          rakebackDraftNeedsMigration = true;
        }
        if (hasInitialEntryData && !createdAtIsTemplate && Number.isFinite(createdAt) && (!Number.isFinite(entryAddedAt) || createdAt < entryAddedAt)) {
          entryAddedAt = createdAt;
        }
        if (!Number.isFinite(entryAddedAt) && hasInitialEntryData) {
          entryAddedAt = getFirstRakebackTimeValue([data.addedAt, data.reportedAt], createdAtIsTemplate ? Date.now() : createdAt);
        }
        if ((data.carryForward === true || data.templateCarryForward === true) &&
          !explicitZeroRake &&
          !accountedData &&
          parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0) {
          entryAddedAt = NaN;
        }
        if (templateLikeData) entryAddedAt = NaN;
        tr.className = "admin-report-rakeback-row" + (kind === "addon" ? " admin-report-rakeback-row--addon" : "");
        tr.setAttribute("data-rakeback-row", "");
        tr.setAttribute("data-rakeback-kind", kind);
        tr.setAttribute("data-rakeback-group", groupId);
        tr.setAttribute("data-rakeback-owner", data.ownerId || data.authorId || getCurrentRakebackOwnerId());
        tr.setAttribute("data-rakeback-created-at", String(createdAt));
        tr.setAttribute("data-rakeback-standard-at", String(standardAt));
        if (explicitZeroRake) tr.setAttribute("data-rakeback-explicit-zero-rake", "1");
        if (data.carryForward === true || data.templateCarryForward === true) tr.setAttribute("data-rakeback-carry-forward", "1");
        if (Number.isFinite(entryAddedAt)) tr.setAttribute("data-rakeback-entry-added-at", String(entryAddedAt));
        if (accountedData) {
          tr.setAttribute("data-rakeback-accounted", "1");
          if (data.reportedAt) tr.setAttribute("data-rakeback-reported-at", String(data.reportedAt));
          if (data.reportId) tr.setAttribute("data-rakeback-report-id", String(data.reportId));
          var reportedAmount = parseReportNumber(data.reportedAmount != null ? data.reportedAmount : data.amount);
          tr.setAttribute("data-rakeback-reported-amount", String(reportedAmount));
        }
        tr.innerHTML =
          '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + getRakebackRoomOptions(data.room || "P21") + "</select></td>" +
          '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки"></span><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" /></td>' +
          '<td>' +
            (kind === "addon"
              ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток"></span></div>'
              : '<input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" />') +
          '</td>' +
          '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" /></td>' +
          '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%" /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
          '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
          '<td class="admin-report-rakeback-actions">' +
            '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
            '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
            '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись">+</button>' +
            '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку">×</button>' +
            '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--color" data-rakeback-color-toggle title="Выделить цветом" aria-label="Выделить цветом"><span class="admin-report-rakeback-color-dot" aria-hidden="true"></span></button>' +
            '<div class="admin-report-rakeback-color-menu" data-rakeback-color-menu hidden>' + getRakebackRowColorButtons(data.color || data.rowColor || data.highlightColor || "") + "</div>" +
          "</td>";
        var idInput = tr.querySelector("[data-rakeback-player-id]");
        var rakeInput = tr.querySelector("[data-rakeback-rake]");
        var percentInput = tr.querySelector("[data-rakeback-percent]");
        var discountInput = tr.querySelector("[data-rakeback-discount15]");
        if (idInput) idInput.value = data.playerId != null ? String(data.playerId) : "";
        if (rakeInput) rakeInput.value = data.rake != null && data.rake !== "" ? (explicitZeroRake && parseReportNumber(data.rake) === 0 ? "0" : formatReportInputNumber(data.rake)) : "";
        if (percentInput) percentInput.value = data.percent != null && data.percent !== "" ? formatReportInputNumber(data.percent) : "";
        if (discountInput) discountInput.checked = !!(data.discount15 || data.subtract15);
        if (kind === "addon") {
          var roomSelect = tr.querySelector("[data-rakeback-room]");
          if (roomSelect) roomSelect.disabled = true;
          if (idInput) idInput.readOnly = true;
        }
        syncRakebackRowLookupAttrs(tr);
        applyRakebackRowColor(tr, data.color || data.rowColor || data.highlightColor || "");
        setRakebackRowSaved(tr, data.editing === true && !accountedData ? false : true);
        return tr;
      }

      function normalizeRakebackStoredRowData(row) {
        row = row || {};
        var room = normalizeRakebackRoom(row.room || "P21");
        return {
          groupId: row.groupId || "",
          kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
          room: room,
          playerId: row.playerId || row.id || "",
          rake: row.rake != null ? row.rake : "",
          rakeZero: row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true,
          percent: row.percent != null ? row.percent : "",
          carryForward: row.carryForward === true || row.templateCarryForward === true,
          templateCarryForward: row.templateCarryForward === true,
          discount15: !!(row.discount15 || row.subtract15),
          ownerId: row.ownerId || row.authorId || "",
          color: row.color || row.rowColor || row.highlightColor || "",
          createdAt: row.createdAt || row.addedAt || row.created || "",
          standardAt: row.standardAt || row.orderAt || row.sortAt || "",
          entryAddedAt: row.entryAddedAt || row.firstAddedAt || "",
          accounted: row.accounted || row.reportedAt || row.reportId,
          reportedAt: row.reportedAt || "",
          reportId: row.reportId || "",
          reportedAmount: row.reportedAmount != null ? row.reportedAmount : row.amount,
          roomAmount: row.roomAmount != null ? row.roomAmount : "",
          chipAmount: row.chipAmount != null ? row.chipAmount : "",
          amount: row.amount != null ? row.amount : "",
          saved: row.saved !== false,
        };
      }

      function isRakebackStoredCarryForwardPlaceholder(data) {
        if (!data || data.carryForward !== true) return false;
        if (data.accounted || data.reportedAt || data.reportId) return false;
        if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
        return parseReportNumber(data.rake) === 0 &&
          parseReportNumber(data.roomAmount) === 0 &&
          parseReportNumber(data.chipAmount) === 0 &&
          parseReportNumber(data.amount) === 0;
      }

      function getRakebackStoredRowEntryStamp(data) {
        data = normalizeRakebackStoredRowData(data);
        return getFirstRakebackTimeValue([data.entryAddedAt, data.firstAddedAt, data.reportedAt, data.createdAt], NaN);
      }

      function isRakebackStoredRowArchived(data) {
        data = normalizeRakebackStoredRowData(data);
        if (isRakebackStoredCarryForwardPlaceholder(data)) return false;
        return isRakebackEntryArchivedByStamp(getRakebackStoredRowEntryStamp(data));
      }

      function getRakebackRowRoom(row) {
        if (!row) return "P21";
        var roomSelect = row.querySelector("[data-rakeback-room]");
        return normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21");
      }

      function syncRakebackRowLookupAttrs(row) {
        if (!row) return;
        var roomSelect = row.querySelector("[data-rakeback-room]");
        var idInput = row.querySelector("[data-rakeback-player-id]");
        row.setAttribute("data-rakeback-room-current", normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21"));
        row.setAttribute("data-rakeback-player-id-current", idInput && idInput.value ? String(idInput.value).trim().toLowerCase() : "");
      }

      function getRakebackRowRoomFast(row) {
        return normalizeRakebackRoom(row && row.getAttribute("data-rakeback-room-current") || getRakebackRowRoom(row));
      }

      function getRakebackRowPlayerIdFast(row) {
        if (!row) return "";
        var cached = row.getAttribute("data-rakeback-player-id-current");
        return cached != null ? cached : getRakebackRowPlayerId(row);
      }

      function getRakebackSearchQuery() {
        return rakebackSearchInput && rakebackSearchInput.value ? String(rakebackSearchInput.value).trim().toLowerCase() : "";
      }

      function getRakebackRowPlayerId(row) {
        var idInput = row ? row.querySelector("[data-rakeback-player-id]") : null;
        return idInput && idInput.value ? String(idInput.value).trim().toLowerCase() : "";
      }

      function getRakebackSortMode() {
        return normalizeRakebackSortMode(rakebackSortSelect && rakebackSortSelect.value ? String(rakebackSortSelect.value) : DEFAULT_RAKEBACK_SORT_MODE);
      }

      function normalizeRakebackSortMode(mode) {
        mode = String(mode || DEFAULT_RAKEBACK_SORT_MODE);
        return /^(standard|created|created_percent|color|rake|percent)$/.test(mode) ? mode : DEFAULT_RAKEBACK_SORT_MODE;
      }

      function getRakebackSortStorageKey() {
        return "poker_admin_report_rakeback_sort_mode:" + (getCurrentRakebackOwnerId() || "local");
      }

      function readSavedRakebackSortMode() {
        try {
          if (!window.localStorage) return DEFAULT_RAKEBACK_SORT_MODE;
          var savedMode = normalizeRakebackSortMode(window.localStorage.getItem(getRakebackSortStorageKey()));
          return savedMode === "standard" ? DEFAULT_RAKEBACK_SORT_MODE : savedMode;
        } catch (e) {
          return DEFAULT_RAKEBACK_SORT_MODE;
        }
      }

      function saveRakebackSortMode(mode) {
        try {
          if (window.localStorage) window.localStorage.setItem(getRakebackSortStorageKey(), normalizeRakebackSortMode(mode));
        } catch (e) {}
      }

      function setRakebackSortMode(mode, saveLocal) {
        mode = normalizeRakebackSortMode(mode);
        if (rakebackSortSelect) rakebackSortSelect.value = mode;
        if (saveLocal) saveRakebackSortMode(mode);
      }

      function applySavedRakebackSortMode() {
        setRakebackSortMode(readSavedRakebackSortMode(), false);
      }

      function getRakebackRowCreatedAt(row, fallbackIndex) {
        var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-created-at") || "") : NaN;
        if (!Number.isFinite(raw)) {
          raw = Date.now() + (Number(fallbackIndex) || 0);
          if (row) row.setAttribute("data-rakeback-created-at", String(raw));
        }
        return raw;
      }

      function getRakebackRowStandardAt(row, fallbackIndex) {
        var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-standard-at") || "") : NaN;
        if (!Number.isFinite(raw)) {
          raw = getRakebackRowCreatedAt(row, fallbackIndex);
          if (row) row.setAttribute("data-rakeback-standard-at", String(raw));
        }
        return raw;
      }

      function getRakebackTopStandardAt(room) {
        if (!rakebackBody) return Date.now();
        var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
        var values = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).filter(function (row) {
          return row.getAttribute("data-rakeback-kind") !== "addon" && getRakebackRowRoom(row) === targetRoom;
        }).map(function (row, index) {
          return getRakebackRowStandardAt(row, index);
        }).filter(function (value) {
          return Number.isFinite(value);
        });
        return values.length ? Math.min.apply(Math, values) - 1 : Date.now();
      }

      function getRakebackRowEntryAddedAtForSave(row) {
        var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "") : NaN;
        return Number.isFinite(raw) ? raw : "";
      }

      function hasRakebackRowEntryTimeData(row) {
        if (!row) return false;
        if (isRakebackCarryForwardPlaceholderRow(row)) return false;
        if (Number.isFinite(parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || ""))) return true;
        return row.getAttribute("data-rakeback-saved") === "1" ||
          isRakebackRowAccounted(row);
      }

      function getRakebackRowBoundEntryAddedAt(row, fallbackIndex) {
        if (!hasRakebackRowEntryTimeData(row)) return NaN;
        return getRakebackRowEntryAddedAt(row, fallbackIndex);
      }

      function setRakebackGroupEntryAddedAt(row, stamp) {
        if (!row || !Number.isFinite(stamp)) return;
        getRakebackGroupRows(row).forEach(function (groupRow) {
          var existing = parseRakebackTimeValue(groupRow.getAttribute("data-rakeback-entry-added-at") || "");
          if (!Number.isFinite(existing)) groupRow.setAttribute("data-rakeback-entry-added-at", String(stamp));
        });
      }

      function replaceRakebackGroupEntryAddedAt(row, stamp) {
        if (!row || !Number.isFinite(stamp)) return;
        getRakebackGroupRows(row).forEach(function (groupRow) {
          groupRow.setAttribute("data-rakeback-entry-added-at", String(stamp));
        });
      }

      function ensureRakebackEntryAddedAt(row, force) {
        if (!row) return "";
        var raw = parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "");
        if (Number.isFinite(raw) && hasRakebackRowEntryTimeData(row) && !isRakebackRowAccounted(row) && isRakebackTemplateEntryStamp(getRakebackRowRoom(row), getRakebackRowPlayerId(row), raw)) {
          raw = Date.now();
          replaceRakebackGroupEntryAddedAt(row, raw);
          return raw;
        }
        if (Number.isFinite(raw)) return raw;
        if (!force) return "";
        var stamp = Date.now();
        setRakebackGroupEntryAddedAt(row, stamp);
        return stamp;
      }

      function getRakebackRowEntryAddedAt(row, fallbackIndex) {
        var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "") : NaN;
        if (Number.isFinite(raw)) return raw;
        if (hasRakebackRowEntryTimeData(row)) {
          raw = getRakebackRowCreatedAt(row, fallbackIndex);
          setRakebackGroupEntryAddedAt(row, raw);
          return raw;
        }
        return getRakebackRowCreatedAt(row, fallbackIndex);
      }

      function syncExplicitZeroRakeMarker(target) {
        if (!target || !target.matches || !target.matches("[data-rakeback-rake]")) return;
        var row = target.closest ? target.closest("[data-rakeback-row]") : null;
        if (!row) return;
        var raw = target.value != null ? String(target.value).trim() : "";
        if (raw && parseReportNumber(raw) === 0) {
          row.setAttribute("data-rakeback-explicit-zero-rake", "1");
        } else if (!raw || parseReportNumber(raw) !== 0) {
          row.removeAttribute("data-rakeback-explicit-zero-rake");
        }
      }

      function getRakebackGroupKeyRow(rows) {
        rows = Array.isArray(rows) ? rows : [];
        return rows.find(function (row) {
          return row && row.getAttribute("data-rakeback-kind") !== "addon";
        }) || rows[0] || null;
      }

      function getRakebackGroupEntryAddedAt(group, fallbackIndex) {
        if (!group || !group.rows || !group.rows.length) return NaN;
        return group.rows.reduce(function (max, row, index) {
          var value = getRakebackRowBoundEntryAddedAt(row, index + (Number(fallbackIndex) || 0));
          return Number.isFinite(value) ? Math.max(max, value) : max;
        }, -Infinity);
      }

      function getRakebackWeekStart(ts) {
        ts = Number(ts);
        if (!Number.isFinite(ts)) return NaN;
        return weekStartMsForReport(ts);
      }

      function getCurrentRakebackWeekStart() {
        var week = getCalculationWeekMeta();
        return week && Number.isFinite(week.start) ? week.start : getRakebackWeekStart(Date.now());
      }

      function formatRakebackWeekRange(weekStart) {
        weekStart = Number(weekStart);
        if (!Number.isFinite(weekStart)) return "";
        return formatReportWeekBoundary(weekStart) + " - " + formatReportWeekBoundary(weekStart + REPORT_WEEK_MS - 1);
      }

      function isRakebackEntryArchivedByStamp(stamp) {
        var weekStart = Number.isFinite(stamp) ? getRakebackWeekStart(stamp) : NaN;
        var currentWeekStart = getCurrentRakebackWeekStart();
        return Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart;
      }

      function isRakebackRowInArchive(row, fallbackIndex) {
        if (isRakebackCarryForwardPlaceholderRow(row)) return false;
        var stamp = getRakebackRowBoundEntryAddedAt(row, fallbackIndex);
        return isRakebackEntryArchivedByStamp(stamp);
      }

      function isRakebackGroupInArchive(group, fallbackIndex) {
        if (isRakebackCarryForwardPlaceholderGroup(group)) return false;
        var stamp = getRakebackGroupEntryAddedAt(group, fallbackIndex);
        return isRakebackEntryArchivedByStamp(stamp);
      }

      function isRakebackCollectedRowArchived(row) {
        var stamp = parseRakebackTimeValue(row && row.entryAddedAt);
        return isRakebackEntryArchivedByStamp(stamp);
      }

      function getRakebackMoscowDayKey(ts) {
        ts = Number(ts);
        if (!Number.isFinite(ts)) ts = Date.now();
        var shifted = new Date(ts - 13 * 60 * 60 * 1000);
        return shifted.getUTCFullYear() + "-" + String(shifted.getUTCMonth() + 1).padStart(2, "0") + "-" + String(shifted.getUTCDate()).padStart(2, "0");
      }

      function getRakebackDateSeparatorLabel(ts) {
        var key = getRakebackMoscowDayKey(ts);
        var todayKey = getRakebackMoscowDayKey(Date.now());
        var yesterdayKey = getRakebackMoscowDayKey(Date.now() - 24 * 60 * 60 * 1000);
        var parts = key.split("-");
        var date = parts.length === 3 ? parts[2] + "." + parts[1] + "." + parts[0] : key;
        if (key === todayKey) return "Сегодня · " + date;
        if (key === yesterdayKey) return "Вчера · " + date;
        return date;
      }

      function removeRakebackDateSeparators() {
        if (!rakebackBody) return;
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-date-separator],[data-rakeback-week-separator],[data-rakeback-week-room-tabs]")).forEach(function (row) {
          row.parentNode.removeChild(row);
        });
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-week-hidden]")).forEach(function (row) {
          row.hidden = false;
          row.removeAttribute("data-rakeback-week-hidden");
        });
      }

      function getRakebackDateGroupTotals(groups, dayKey) {
        var totals = { rake: 0, rakeback: 0 };
        var latestRakeByGroup = {};
        (groups || []).forEach(function (group) {
          (group && group.rows ? group.rows : []).forEach(function (row, index) {
            if (!row || row.hidden) return;
            var rowStamp = getRakebackRowEntryAddedAt(row, index);
            if (!Number.isFinite(rowStamp) || getRakebackMoscowDayKey(rowStamp) !== dayKey) return;
            var room = getRakebackRowRoom(row);
            var roomAmount = Math.round(getRakebackRowAmount(row));
            addRakebackLatestGroupRake(latestRakeByGroup, row, index);
            totals.rakeback += getRakebackReportAmount(room, roomAmount);
          });
        });
        totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
        return totals;
      }

      function getRakebackDateRowsTotals(rows, dayKey) {
        var totals = { rake: 0, rakeback: 0 };
        var latestRakeByGroup = {};
        (rows || []).forEach(function (row, index) {
          var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
          if (!Number.isFinite(rowStamp) || getRakebackMoscowDayKey(rowStamp) !== dayKey) return;
          var room = getRakebackRowRoom(row);
          var roomAmount = Math.round(getRakebackRowAmount(row));
          addRakebackLatestGroupRake(latestRakeByGroup, row, index);
          totals.rakeback += getRakebackReportAmount(room, roomAmount);
        });
        totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
        return totals;
      }

      function getRakebackWeekGroupTotals(groups, weekStart) {
        var totals = { rake: 0, rakeback: 0 };
        var latestRakeByGroup = {};
        (groups || []).forEach(function (group) {
          (group && group.rows ? group.rows : []).forEach(function (row, index) {
            var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
            if (!Number.isFinite(rowStamp) || getRakebackWeekStart(rowStamp) !== weekStart) return;
            var room = getRakebackRowRoom(row);
            var roomAmount = Math.round(getRakebackRowAmount(row));
            addRakebackLatestGroupRake(latestRakeByGroup, row, index);
            totals.rakeback += getRakebackReportAmount(room, roomAmount);
          });
        });
        totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
        return totals;
      }

      function getRakebackWeekRoomTotals(groups, weekStart) {
        var totals = {};
        var latestRakeByRoomGroup = {};
        RAKEBACK_ROOMS.forEach(function (room) {
          totals[room] = { rake: 0, rakeback: 0, count: 0 };
          latestRakeByRoomGroup[room] = {};
        });
        (groups || []).forEach(function (group) {
          (group && group.rows ? group.rows : []).forEach(function (row, index) {
            var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
            if (!Number.isFinite(rowStamp) || getRakebackWeekStart(rowStamp) !== weekStart) return;
            var room = normalizeRakebackRoom(getRakebackRowRoom(row));
            if (!totals[room]) totals[room] = { rake: 0, rakeback: 0, count: 0 };
            if (!latestRakeByRoomGroup[room]) latestRakeByRoomGroup[room] = {};
            var roomAmount = Math.round(getRakebackRowAmount(row));
            addRakebackLatestGroupRake(latestRakeByRoomGroup[room], row, index);
            totals[room].rakeback += getRakebackReportAmount(room, roomAmount);
            totals[room].count += 1;
          });
        });
        Object.keys(latestRakeByRoomGroup).forEach(function (room) {
          if (!totals[room]) totals[room] = { rake: 0, rakeback: 0, count: 0 };
          totals[room].rake = sumRakebackLatestGroupRake(latestRakeByRoomGroup[room]);
        });
        return totals;
      }

      function createRakebackDateSeparator(label, totals) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var span = document.createElement("span");
        var meta = document.createElement("small");
        tr.className = "admin-report-rakeback-date-separator";
        tr.setAttribute("data-rakeback-date-separator", "");
        td.colSpan = 7;
        span.textContent = label || "";
        totals = totals || { rake: 0, rakeback: 0 };
        meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
        td.appendChild(span);
        td.appendChild(meta);
        tr.appendChild(td);
        return tr;
      }

      function createRakebackTemplateSeparator(open) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var btn = document.createElement("button");
        var span = document.createElement("span");
        tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
        tr.setAttribute("data-rakeback-date-separator", "");
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

      function isRakebackCarryForwardPlaceholderRow(row) {
        if (!row || row.getAttribute("data-rakeback-carry-forward") !== "1") return false;
        if (isRakebackRowAccounted(row)) return false;
        if (row.getAttribute("data-rakeback-explicit-zero-rake") === "1") return false;
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
        return rake === 0 && Math.round(getRakebackRowAmount(row)) === 0;
      }

      function shouldCopyRakebackIdInput(row, input) {
        if (!row || !input) return false;
        if (row.getAttribute("data-rakeback-saved") === "1") return true;
        if (input.readOnly) return true;
        return isRakebackCarryForwardPlaceholderRow(row);
      }

      function copyRakebackIdInput(input) {
        if (!input) return false;
        var row = input.closest("[data-rakeback-row]");
        var cell = input.closest("td");
        var id = input.value ? String(input.value).trim() : "";
        if (!row || !id || !shouldCopyRakebackIdInput(row, input)) return false;
        rakebackSuppressIdClickInput = input;
        rakebackSuppressIdClickAt = Date.now();
        copyReportText(id).then(function () {
          markRakebackCell(cell, true);
          showRakebackStatusBriefly("Скопировано");
        }).catch(function () {
          showRakebackAlert("Не удалось скопировать айди.");
        });
        return true;
      }

      function isRakebackCarryForwardPlaceholderGroup(group) {
        var keyRow = getRakebackGroupKeyRow(group && group.rows ? group.rows : []);
        return isRakebackCarryForwardPlaceholderRow(keyRow);
      }

      function isRakebackTodayPlaceholderGroup(group, fallbackIndex) {
        if (!isRakebackCarryForwardPlaceholderGroup(group)) return false;
        var stamp = getRakebackGroupEntryAddedAt(group, fallbackIndex);
        return Number.isFinite(stamp) && getRakebackMoscowDayKey(stamp) === getRakebackMoscowDayKey(Date.now());
      }

      function getRakebackLazyTemplateDomData(row) {
        if (!row || !isRakebackCarryForwardPlaceholderRow(row)) return null;
        var room = getRakebackRowRoom(row);
        var playerId = getRakebackRowPlayerId(row);
        if (!playerId) return null;
        var percentInput = row.querySelector("[data-rakeback-percent]");
        var discountInput = row.querySelector("[data-rakeback-discount15]");
        return normalizeRakebackLazyTemplateData({
          groupId: row.getAttribute("data-rakeback-group") || "",
          room: room,
          playerId: playerId,
          percent: percentInput && percentInput.value ? percentInput.value : "",
          carryForward: true,
          discount15: !!(discountInput && discountInput.checked),
          ownerId: row.getAttribute("data-rakeback-owner") || "",
          color: row.getAttribute("data-rakeback-row-color") || "",
          createdAt: row.getAttribute("data-rakeback-created-at") || "",
          standardAt: row.getAttribute("data-rakeback-standard-at") || "",
          entryAddedAt: row.getAttribute("data-rakeback-entry-added-at") || "",
        });
      }

      function dehydrateRakebackLazyTemplateRows(options) {
        if (!rakebackBody) return false;
        return false;
      }

      function hydrateRakebackLazyTemplateRowsForSearch() {
        if (!rakebackBody) return false;
        var query = getRakebackSearchQuery();
        if (!query) return false;
        var deletedTemplates = getRakebackDeletedTemplateMap();
        var existing = {};
        getRakebackAllDataRows().forEach(function (row) {
          var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
          if (key) existing[key] = true;
        });
        var remaining = [];
        var hydrated = false;
        rakebackLazyTemplateRows.forEach(function (row) {
          var data = normalizeRakebackLazyTemplateData(row);
          var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
          if (!data || !key || (deletedTemplates[key] && !isRakebackTemplateId(data.room, data.playerId))) return;
          if (data.room !== activeRakebackRoom || existing[key] || String(data.playerId).toLowerCase().indexOf(query) === -1) {
            remaining.push(data);
            return;
          }
          rakebackBody.appendChild(createRakebackRow(data));
          existing[key] = true;
          hydrated = true;
        });
        rakebackLazyTemplateRows = remaining;
        return hydrated;
      }

      function ensureRakebackSearchTemplateRows() {
        if (!rakebackBody || rakebackArchiveMode) return false;
        var query = getRakebackSearchQuery();
        if (!query) return false;
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        var ids = getRakebackTemplateIdsForCurrentWeek(targetRoom, getRakebackTemplateIdsForRoom(targetRoom));
        var existing = {};
        rakebackLazyTemplateRows.forEach(function (row) {
          var data = normalizeRakebackLazyTemplateData(row);
          var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
          if (key) existing[key] = true;
        });
        getRakebackAllDataRows().forEach(function (row) {
          var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
          if (key) existing[key] = true;
        });
        var added = false;
        ids.forEach(function (playerId) {
          playerId = String(playerId || "").trim();
          var key = getRakebackTemplateKey(targetRoom, playerId);
          if (!playerId || existing[key] || playerId.toLowerCase().indexOf(query) === -1) return;
          rakebackBody.appendChild(createRakebackRow({
            kind: "base",
            room: targetRoom,
            playerId: playerId,
            carryForward: true,
            templateCarryForward: true,
            createdAt: Date.now(),
            entryAddedAt: Date.now(),
          }));
          existing[key] = true;
          added = true;
        });
        return added;
      }

      function createRakebackWeekSeparator(weekStart, totals, open) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var button = document.createElement("button");
        var label = document.createElement("span");
        var meta = document.createElement("small");
        var key = String(weekStart);
        tr.className = "admin-report-rakeback-week-separator";
        tr.setAttribute("data-rakeback-week-separator", "");
        td.colSpan = 7;
        button.type = "button";
        button.className = "admin-report-rakeback-week-separator__button";
        button.setAttribute("data-rakeback-week-toggle", key);
        button.setAttribute("aria-expanded", open ? "true" : "false");
        label.textContent = formatRakebackWeekRange(weekStart);
        totals = totals || { rake: 0, rakeback: 0 };
        meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
        button.appendChild(label);
        button.appendChild(meta);
        td.appendChild(button);
        tr.appendChild(td);
        return tr;
      }

      function createRakebackWeekRoomTabs(weekStart, roomTotals) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var wrap = document.createElement("div");
        var weekKey = String(weekStart);
        tr.className = "admin-report-rakeback-week-room-tabs";
        tr.setAttribute("data-rakeback-week-room-tabs", "");
        td.colSpan = 7;
        wrap.className = "admin-report-rakeback-week-room-tabs__grid";
        RAKEBACK_ROOMS.forEach(function (room) {
          var key = weekKey + "|" + room;
          var open = rakebackWeekRoomArchiveOpen[key] !== false;
          var totals = roomTotals && roomTotals[room] ? roomTotals[room] : { rake: 0, rakeback: 0, count: 0 };
          var button = document.createElement("button");
          var label = document.createElement("span");
          var meta = document.createElement("small");
          button.type = "button";
          button.className = "admin-report-rakeback-week-room-tabs__button";
          button.setAttribute("data-rakeback-week-room-toggle", key);
          button.setAttribute("aria-expanded", open ? "true" : "false");
          button.classList.toggle("admin-report-rakeback-week-room-tabs__button--empty", !totals.count);
          label.textContent = getRakebackRoomLabel(room);
          meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
          button.appendChild(label);
          button.appendChild(meta);
          wrap.appendChild(button);
        });
        td.appendChild(wrap);
        tr.appendChild(td);
        return tr;
      }

      function createRakebackWeekTotalRow(totals) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var row = document.createElement("div");
        var label = document.createElement("span");
        var value = document.createElement("span");
        tr.className = "admin-report-rakeback-week-total";
        tr.setAttribute("data-rakeback-week-room-tabs", "");
        td.colSpan = 7;
        row.className = "admin-report-rakeback-week-total__row";
        label.className = "admin-report-rakeback-week-total__label";
        value.className = "admin-report-rakeback-week-total__value";
        label.textContent = "Итого по всем румам";
        value.textContent = formatReportRubleNumber(totals && totals.rakeback);
        row.appendChild(label);
        row.appendChild(value);
        td.appendChild(row);
        tr.appendChild(td);
        return tr;
      }

      function insertRakebackDateSeparators() {
        var mode = getRakebackSortMode();
        if (!rakebackBody || (!rakebackArchiveMode && mode !== "created" && mode !== "created_percent" && mode !== "standard")) return;
        var dayGroups = {};
        var weekGroups = {};
        var currentWeekStart = getCurrentRakebackWeekStart();
        var visibleGroups = getRakebackVisibleGroups();
        visibleGroups.forEach(function (group, index) {
          if (!group || !group.rows || !group.rows.length) return;
          if (!rakebackArchiveMode && isRakebackCarryForwardPlaceholderGroup(group) && !isRakebackTodayPlaceholderGroup(group, index)) return;
          var stamp = getRakebackGroupEntryAddedAt(group, index);
          if (!Number.isFinite(stamp)) return;
          var weekStart = getRakebackWeekStart(stamp);
          if (Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart) {
            if (!weekGroups[String(weekStart)]) weekGroups[String(weekStart)] = { weekStart: weekStart, groups: [] };
            weekGroups[String(weekStart)].groups.push(group);
            return;
          }
          var key = getRakebackMoscowDayKey(stamp);
          if (!dayGroups[key]) {
            dayGroups[key] = { stamp: stamp, groups: [] };
          }
          dayGroups[key].groups.push(group);
        });
        var lastKey = "";
        var lastWeekKey = "";
        var handledWeekKeys = {};
        var templateGroups = [];
        visibleGroups.forEach(function (group, index) {
          if (!group || !group.rows || !group.rows.length) return;
          if (!rakebackArchiveMode && isRakebackCarryForwardPlaceholderGroup(group) && !isRakebackTodayPlaceholderGroup(group, index)) {
            templateGroups.push(group);
            return;
          }
          var stamp = getRakebackGroupEntryAddedAt(group, index);
          if (!Number.isFinite(stamp)) return;
          var weekStart = getRakebackWeekStart(stamp);
          if (Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart) {
            var weekKey = String(weekStart);
            if (handledWeekKeys[weekKey]) return;
            handledWeekKeys[weekKey] = true;
            var open = rakebackWeekArchiveOpen[weekKey] === true;
            var weekSeparator = null;
            if (weekKey !== lastWeekKey) {
              lastWeekKey = weekKey;
              weekSeparator = createRakebackWeekSeparator(weekStart, getRakebackWeekGroupTotals(weekGroups[weekKey] ? weekGroups[weekKey].groups : [], weekStart), open);
              rakebackBody.insertBefore(weekSeparator, group.rows[0]);
            }
            var weekGroupsList = weekGroups[weekKey] ? weekGroups[weekKey].groups : [];
            if (!open) {
              weekGroupsList.forEach(function (weekGroup) {
                (weekGroup.rows || []).forEach(function (row) {
                  row.hidden = true;
                  row.setAttribute("data-rakeback-week-hidden", "1");
                });
              });
              return;
            }
            var marker = document.createComment("rakeback-week-details");
            rakebackBody.insertBefore(marker, weekSeparator ? weekSeparator.nextSibling : group.rows[0]);
            var fragment = document.createDocumentFragment();
            var weekTotals = getRakebackWeekGroupTotals(weekGroupsList, weekStart);
            fragment.appendChild(createRakebackWeekRoomTabs(weekStart, getRakebackWeekRoomTotals(weekGroupsList, weekStart)));
            fragment.appendChild(createRakebackWeekTotalRow(weekTotals));
            RAKEBACK_ROOMS.forEach(function (room) {
              var roomOpen = rakebackWeekRoomArchiveOpen[weekKey + "|" + room] !== false;
              var roomRows = [];
              weekGroupsList.forEach(function (weekGroup) {
                var keyRow = getRakebackGroupKeyRow(weekGroup.rows || []);
                if (normalizeRakebackRoom(getRakebackRowRoom(keyRow)) !== room) return;
                roomRows = roomRows.concat(weekGroup.rows || []);
              });
              var lastRoomDayKey = "";
              weekGroupsList.forEach(function (weekGroup) {
                var keyRow = getRakebackGroupKeyRow(weekGroup.rows || []);
                if (normalizeRakebackRoom(getRakebackRowRoom(keyRow)) !== room) return;
                (weekGroup.rows || []).forEach(function (row) {
                  row.hidden = !roomOpen;
                  if (!roomOpen) row.setAttribute("data-rakeback-week-hidden", "1");
                  else row.removeAttribute("data-rakeback-week-hidden");
                  if (roomOpen) {
                    var rowStamp = getRakebackRowBoundEntryAddedAt(row, 0);
                    var roomDayKey = Number.isFinite(rowStamp) ? getRakebackMoscowDayKey(rowStamp) : "";
                    if (roomDayKey && roomDayKey !== lastRoomDayKey) {
                      lastRoomDayKey = roomDayKey;
                      fragment.appendChild(createRakebackDateSeparator(getRakebackDateSeparatorLabel(rowStamp), getRakebackDateRowsTotals(roomRows, roomDayKey)));
                    }
                  }
                  fragment.appendChild(row);
                });
              });
            });
            rakebackBody.insertBefore(fragment, marker);
            if (marker.parentNode) marker.parentNode.removeChild(marker);
            return;
          }
          var key = getRakebackMoscowDayKey(stamp);
          if (key === lastKey) return;
          lastKey = key;
          rakebackBody.insertBefore(createRakebackDateSeparator(getRakebackDateSeparatorLabel(stamp), getRakebackDateGroupTotals(dayGroups[key] ? dayGroups[key].groups : [], key)), group.rows[0]);
        });
        if (templateGroups.length) {
          var templateFragment = document.createDocumentFragment();
          var templateRowsOpen = readRakebackTemplateSpoilerOpen();
          templateFragment.appendChild(createRakebackTemplateSeparator(templateRowsOpen));
          templateGroups.forEach(function (group) {
            (group.rows || []).forEach(function (row) {
              row.setAttribute("data-rakeback-template-row", "1");
              if (templateRowsOpen) row.removeAttribute("data-rakeback-template-collapsed");
              else row.setAttribute("data-rakeback-template-collapsed", "1");
              templateFragment.appendChild(row);
            });
          });
          rakebackBody.appendChild(templateFragment);
        }
      }

      function getRakebackRowSortColor(row) {
        var color = normalizeRakebackRowColor(row ? row.getAttribute("data-rakeback-row-color") || "" : "");
        if (!color) return RAKEBACK_ROW_COLORS.length + 1;
        for (var i = 0; i < RAKEBACK_ROW_COLORS.length; i++) {
          if (RAKEBACK_ROW_COLORS[i].value === color) return i;
        }
        return RAKEBACK_ROW_COLORS.length + 1;
      }

      function sortRakebackRows(rows) {
        if (!rakebackBody || !rows || rows.length < 2) return rows || [];
        var mode = getRakebackSortMode();
        var groupMap = {};
        var groups = [];
        rows.forEach(function (row, index) {
          var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
          if (!groupMap[groupId]) {
            groupMap[groupId] = {
              rows: [],
              index: index,
              createdAt: getRakebackRowCreatedAt(row, index),
              standardAt: getRakebackRowStandardAt(row, index),
              entryAddedAt: getRakebackRowEntryAddedAt(row, index),
              hasEntryTime: hasRakebackRowEntryTimeData(row),
            };
            groups.push(groupMap[groupId]);
          }
          groupMap[groupId].rows.push(row);
          groupMap[groupId].createdAt = Math.min(groupMap[groupId].createdAt, getRakebackRowCreatedAt(row, index));
          groupMap[groupId].standardAt = Math.min(groupMap[groupId].standardAt, getRakebackRowStandardAt(row, index));
          groupMap[groupId].entryAddedAt = Math.max(groupMap[groupId].entryAddedAt, getRakebackRowEntryAddedAt(row, index));
          groupMap[groupId].hasEntryTime = groupMap[groupId].hasEntryTime || hasRakebackRowEntryTimeData(row);
        });
        groups.forEach(function (group, index) {
          group.keyRow = getRakebackGroupKeyRow(group.rows);
          group.createdAt = getRakebackRowCreatedAt(group.keyRow, index);
          group.entryAddedAt = getRakebackGroupEntryAddedAt(group, index);
        });
        groups.sort(function (a, b) {
          var diff = 0;
          if (mode === "color") {
            diff = getRakebackRowSortColor(a.keyRow) - getRakebackRowSortColor(b.keyRow);
            if (!diff) diff = a.standardAt - b.standardAt;
          } else if (mode === "rake") {
            diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-rake]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-rake]") || {}).value);
            if (!diff) diff = a.standardAt - b.standardAt;
          } else if (mode === "percent") {
            diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-percent]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-percent]") || {}).value);
            if (!diff) diff = a.standardAt - b.standardAt;
          } else if (mode === "standard") {
            diff = a.standardAt - b.standardAt;
          } else if (mode === "created_percent") {
            var aDayKey = getRakebackMoscowDayKey(a.entryAddedAt);
            var bDayKey = getRakebackMoscowDayKey(b.entryAddedAt);
            diff = bDayKey.localeCompare(aDayKey);
            if (!diff) diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-percent]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-percent]") || {}).value);
            if (!diff) diff = b.entryAddedAt - a.entryAddedAt;
            if (!diff) diff = a.standardAt - b.standardAt;
          } else if (mode === "created") {
            diff = b.entryAddedAt - a.entryAddedAt;
            if (!diff) diff = a.standardAt - b.standardAt;
          } else {
            diff = a.createdAt - b.createdAt;
          }
          return diff || (a.index - b.index);
        });
        var sortedRows = [];
        groups.forEach(function (group) {
          group.rows.forEach(function (row) {
            rakebackBody.appendChild(row);
            sortedRows.push(row);
          });
        });
        return sortedRows;
      }

      function getRakebackDomRows() {
        return rakebackBody ? Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")) : [];
      }

      function pushUniqueRakebackRow(rows, seen, row) {
        if (!row) return;
        if (seen && typeof seen.has === "function") {
          if (seen.has(row)) return;
          seen.add(row);
        } else if (rows.indexOf(row) !== -1) {
          return;
        }
        var key = row.getAttribute("data-rakeback-search-order");
        if (key == null || key === "") {
          key = String(rows.length);
          row.setAttribute("data-rakeback-search-order", key);
        }
        rows.push(row);
      }

      function ensureRakebackSearchOrder(rows) {
        var maxOrder = -1;
        (rows || []).forEach(function (row) {
          var order = Number(row && row.getAttribute("data-rakeback-search-order"));
          if (Number.isFinite(order)) maxOrder = Math.max(maxOrder, order);
        });
        (rows || []).forEach(function (row) {
          if (!row || row.getAttribute("data-rakeback-search-order") !== null) return;
          maxOrder += 1;
          row.setAttribute("data-rakeback-search-order", String(maxOrder));
        });
      }

      function getRakebackAllDataRows() {
        var rows = [];
        var seen = typeof WeakSet === "function" ? new WeakSet() : null;
        getRakebackDomRows().forEach(function (row) {
          pushUniqueRakebackRow(rows, seen, row);
        });
        (rakebackSearchDetachedRows || []).forEach(function (row) {
          pushUniqueRakebackRow(rows, seen, row);
        });
        (rakebackSuspendedRows || []).forEach(function (row) {
          pushUniqueRakebackRow(rows, seen, row);
        });
        ensureRakebackSearchOrder(rows);
        return rows.sort(function (a, b) {
          return Number(a.getAttribute("data-rakeback-search-order")) - Number(b.getAttribute("data-rakeback-search-order"));
        });
      }

      function getRakebackGroupsFromRows(rows) {
        var groups = [];
        var byGroup = {};
        (rows || []).forEach(function (row, index) {
          var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
          if (!byGroup[groupId]) {
            byGroup[groupId] = { groupId: groupId, rows: [], index: index };
            groups.push(byGroup[groupId]);
          }
          byGroup[groupId].rows.push(row);
        });
        return groups;
      }

      function restoreRakebackSearchDetachedRows() {
        if (!rakebackBody || !rakebackSearchDetachedRows.length) return;
        var rows = getRakebackAllDataRows();
        var fragment = document.createDocumentFragment();
        rows.forEach(function (row) {
          row.hidden = false;
          fragment.appendChild(row);
        });
        rakebackBody.appendChild(fragment);
        rakebackSearchDetachedRows = [];
      }

      function ensureRakebackVisibleAddonBaseRows() {
        if (!rakebackBody) return;
        var allRows = getRakebackAllDataRows();
        var baseByGroup = {};
        allRows.forEach(function (row) {
          if (!row || row.getAttribute("data-rakeback-kind") === "addon") return;
          var groupId = row.getAttribute("data-rakeback-group") || "";
          if (groupId && !baseByGroup[groupId]) baseByGroup[groupId] = row;
        });
        getRakebackDomRows().forEach(function (row) {
          if (!row || row.hidden || row.getAttribute("data-rakeback-kind") !== "addon") return;
          var groupId = row.getAttribute("data-rakeback-group") || "";
          var base = groupId ? baseByGroup[groupId] : null;
          if (!base || base === row) return;
          base.hidden = false;
          syncRakebackRowLookupAttrs(base);
          var rowBeforeBase = base.parentNode === rakebackBody &&
            typeof base.compareDocumentPosition === "function" &&
            typeof Node !== "undefined" &&
            (base.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_PRECEDING);
          if (base.parentNode !== rakebackBody || rowBeforeBase) {
            rakebackBody.insertBefore(base, row);
          }
        });
      }

      function suspendRakebackDomRows() {
        if (!rakebackBody) return;
        restoreRakebackSearchDetachedRows();
        removeRakebackGeneratedRows();
        var rows = getRakebackDomRows();
        if (!rows.length && !rakebackSuspendedRows.length) return;
        var allRows = getRakebackAllDataRows();
        ensureRakebackSearchOrder(rows);
        var fragment = document.createDocumentFragment();
        rows.forEach(function (row) {
          fragment.appendChild(row);
        });
        storeRakebackSuspendedRows(allRows);
      }

      function restoreRakebackSuspendedRows() {
        if (!rakebackBody || !rakebackSuspendedRows.length) return;
        var rows = rakebackSuspendedRows.slice().sort(function (a, b) {
          return Number(a.getAttribute("data-rakeback-search-order")) - Number(b.getAttribute("data-rakeback-search-order"));
        });
        var fragment = document.createDocumentFragment();
        rows.forEach(function (row) {
          fragment.appendChild(row);
        });
        rakebackBody.appendChild(fragment);
        rakebackSuspendedRows = [];
      }

      function storeRakebackSuspendedRows(rows) {
        var nextRows = [];
        var seen = typeof WeakSet === "function" ? new WeakSet() : null;
        (rows || []).forEach(function (row) {
          pushUniqueRakebackRow(nextRows, seen, row);
        });
        rakebackSuspendedRows = nextRows;
      }

      function mergeRakebackStoredRows(baseRows, nextRows) {
        var out = [];
        var byKey = {};
        function push(row) {
          if (!row) return;
          var data = normalizeRakebackStoredRowData(row);
          var key = getRakebackStoredRowMergeKey(data);
          if (key && byKey[key] != null) {
            out[byKey[key]] = data;
            return;
          }
          if (key) byKey[key] = out.length;
          out.push(data);
        }
        (baseRows || []).forEach(push);
        (nextRows || []).forEach(push);
        return out;
      }

      function deferRakebackRenderedRows() {
        if (!rakebackBody) return;
        if (rakebackActiveHydrateTimer) {
          clearTimeout(rakebackActiveHydrateTimer);
          rakebackActiveHydrateTimer = null;
        }
        var materializedRows = collectRakebackDomRowsFromNodes(getRakebackAllDataRows(), true, false);
        if (materializedRows.length) {
          rakebackDeferredRows = mergeRakebackStoredRows(rakebackDeferredRows, materializedRows);
        }
        rakebackSearchDetachedRows = [];
        rakebackSuspendedRows = [];
        removeRakebackGeneratedRows();
        rakebackBody.innerHTML = "";
      }

      function hasDeferredRowsForActiveRoom() {
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        return (rakebackDeferredRows || []).some(function (row) {
          return normalizeRakebackRoom((row && row.room) || "P21") === targetRoom;
        });
      }

      function renderRakebackDeferredRowsForActiveRoom(limit) {
        if (!rakebackBody || rakebackArchiveMode || !rakebackDeferredRows.length) return false;
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        var renderRows = [];
        var keepRows = [];
        var maxRows = Number(limit);
        rakebackDeferredRows.forEach(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          if (normalizeRakebackRoom(data.room || "P21") === targetRoom && (!Number.isFinite(maxRows) || renderRows.length < maxRows)) renderRows.push(data);
          else keepRows.push(data);
        });
        if (!renderRows.length) return false;
        var fragment = document.createDocumentFragment();
        renderRows.forEach(function (row) {
          var tr = createRakebackRow(row);
          fragment.appendChild(tr);
          if (row.saved) setRakebackRowSaved(tr, true);
        });
        rakebackDeferredRows = keepRows;
        rakebackBody.appendChild(fragment);
        return true;
      }

      function scheduleRakebackActiveRoomHydration() {
        if (rakebackActiveHydrateTimer) clearTimeout(rakebackActiveHydrateTimer);
        if (!hasDeferredRowsForActiveRoom()) return;
        rakebackActiveHydrateTimer = setTimeout(function () {
          rakebackActiveHydrateTimer = null;
          runAdminReportWhenIdle(function () {
            if (!renderRakebackDeferredRowsForActiveRoom(25)) return;
            syncRakebackTable({ skipSort: true, deferDecorations: true, fastSummary: true });
            scheduleRakebackActiveRoomHydration();
          }, 2500);
        }, 1000);
      }

      function hydrateRakebackDeferredRowsForSearch() {
        if (!rakebackBody || !rakebackDeferredRows.length) return false;
        var query = getRakebackSearchQuery();
        if (!query) return false;
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        var keepRows = [];
        var fragment = document.createDocumentFragment();
        var hydrated = false;
        rakebackDeferredRows.forEach(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          var playerId = String(data.playerId || "").toLowerCase();
          if (normalizeRakebackRoom(data.room || "P21") === targetRoom && playerId.indexOf(query) !== -1) {
            var tr = createRakebackRow(data);
            fragment.appendChild(tr);
            if (data.saved) setRakebackRowSaved(tr, true);
            hydrated = true;
          } else {
            keepRows.push(data);
          }
        });
        if (!hydrated) return false;
        rakebackDeferredRows = keepRows;
        rakebackBody.appendChild(fragment);
        return true;
      }

      function getRakebackGroupRows(row) {
        if (!rakebackBody || !row) return [];
        var groupId = row.getAttribute("data-rakeback-group") || "";
        if (!groupId) return [row];
        var rows = [row];
        var prev = row.previousElementSibling;
        while (prev && prev.hasAttribute("data-rakeback-row") && prev.getAttribute("data-rakeback-group") === groupId) {
          rows.unshift(prev);
          prev = prev.previousElementSibling;
        }
        var next = row.nextElementSibling;
        while (next && next.hasAttribute("data-rakeback-row") && next.getAttribute("data-rakeback-group") === groupId) {
          rows.push(next);
          next = next.nextElementSibling;
        }
        return rows;
      }

      function getRakebackVisibleGroups() {
        if (!rakebackBody) return [];
        var groups = [];
        var byGroup = {};
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
          var groupId = row.getAttribute("data-rakeback-group") || "";
          if (!groupId) return;
          if (!byGroup[groupId]) {
            byGroup[groupId] = { groupId: groupId, rows: [], visible: false };
            groups.push(byGroup[groupId]);
          }
          byGroup[groupId].rows.push(row);
          if (!row.hidden) byGroup[groupId].visible = true;
        });
        return groups.filter(function (group) { return group.visible; });
      }

      function syncRakebackStandardOrder() {
        if (!rakebackBody) return;
        var base = Date.now();
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
          row.setAttribute("data-rakeback-standard-at", String(base + index));
        });
      }

      function moveRakebackGroupBefore(sourceRows, targetGroup, afterTarget) {
        if (!rakebackBody || !sourceRows || !sourceRows.length || !targetGroup || !targetGroup.rows || !targetGroup.rows.length) return false;
        if (sourceRows.indexOf(targetGroup.rows[0]) !== -1) return false;
        var fragment = document.createDocumentFragment();
        sourceRows.forEach(function (row) { fragment.appendChild(row); });
        var anchor = afterTarget ? targetGroup.rows[targetGroup.rows.length - 1].nextSibling : targetGroup.rows[0];
        rakebackBody.insertBefore(fragment, anchor);
        syncRakebackStandardOrder();
        return true;
      }

      function beginRakebackRowDrag(row, pointerId, clientY) {
        if (!row || !rakebackBody || !canEditRakebackRow(row)) return;
        if (rakebackSortSelect && rakebackSortSelect.value !== "standard") setRakebackSortMode("standard", true);
        if (document.activeElement && row.contains(document.activeElement) && typeof document.activeElement.blur === "function") {
          try { document.activeElement.blur(); } catch (errBlur) {}
        }
        var groupRows = getRakebackGroupRows(row);
        rakebackDragState = {
          active: true,
          pointerId: pointerId,
          startY: clientY,
          currentY: clientY,
          groupRows: groupRows,
          moved: false,
        };
        groupRows.forEach(function (groupRow) {
          groupRow.classList.add("admin-report-rakeback-row--dragging");
        });
        document.body.classList.add("admin-report-rakeback-drag-active");
        showRakebackStatus("Перенос строки");
      }

      function finishRakebackRowDrag(saveChanges) {
        if (!rakebackDragState) return;
        var moved = rakebackDragState.moved;
        rakebackDragState.groupRows.forEach(function (row) {
          row.classList.remove("admin-report-rakeback-row--dragging");
        });
        document.body.classList.remove("admin-report-rakeback-drag-active");
        rakebackDragState = null;
        syncRakebackTable();
        if (saveChanges && moved) {
          markRakebackDraftLocalEdit();
          saveRakebackDraftRows();
          showRakebackStatusBriefly("Строка перенесена");
        } else {
          showRakebackStatus("");
        }
      }

      function updateRakebackRowDrag(clientY) {
        if (!rakebackDragState || !rakebackDragState.groupRows.length) return;
        rakebackDragState.currentY = clientY;
        var groups = getRakebackVisibleGroups();
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          if (rakebackDragState.groupRows.indexOf(group.rows[0]) !== -1) continue;
          var firstRect = group.rows[0].getBoundingClientRect();
          var lastRect = group.rows[group.rows.length - 1].getBoundingClientRect();
          var top = firstRect.top;
          var bottom = lastRect.bottom;
          if (clientY < top || clientY > bottom) continue;
          var after = clientY > (top + bottom) / 2;
          if (moveRakebackGroupBefore(rakebackDragState.groupRows, group, after)) {
            rakebackDragState.moved = true;
            syncRakebackRoomVisibility();
          }
          break;
        }
      }

      function cancelPendingRakebackDrag() {
        if (!rakebackDragState || rakebackDragState.active) return;
        if (rakebackDragState.timer) clearTimeout(rakebackDragState.timer);
        rakebackDragState = null;
      }

      function shouldStartRakebackDragFrom(target) {
        if (!target || !target.closest) return false;
        if (target.closest("[data-rakeback-color-menu],[data-rakeback-color-toggle],[data-rakeback-save],[data-rakeback-edit],[data-rakeback-add-addon],[data-rakeback-remove]")) return false;
        if (target.closest("select,textarea,input[type='checkbox']")) return false;
        return !!target.closest("[data-rakeback-row]");
      }

      function setRakebackRoomTab(room) {
        if (rakebackModule) {
          rakebackArchiveMode = false;
          activeRakebackRoom = rakebackModule.getActiveRoom ? rakebackModule.getActiveRoom() : normalizeRakebackRoom(room || activeRakebackRoom || "P21");
          rakebackModule.setRoom(room);
          activeRakebackRoom = rakebackModule.getActiveRoom ? rakebackModule.getActiveRoom() : normalizeRakebackRoom(room || activeRakebackRoom || "P21");
          return;
        }
        rakebackArchiveMode = false;
        activeRakebackRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          if (rakebackRoomTabs && rakebackRoomTabs.length) {
            rakebackRoomTabs.forEach(function (tab) {
              var selected = normalizeRakebackRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRakebackRoom;
              tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
              tab.setAttribute("aria-selected", selected ? "true" : "false");
            });
          }
          if (rakebackArchiveBtn) {
            rakebackArchiveBtn.classList.remove("admin-report-rakeback-archive-tab--active");
            rakebackArchiveBtn.setAttribute("aria-pressed", "false");
          }
          syncRakebackAddButtonAccess();
          runAdminReportAfterPaint(renderRakebackTemplateOnlyView);
          return;
        }
        deferRakebackRenderedRows();
        var seq = ++rakebackRoomSwitchSeq;
        if (rakebackRoomTabs && rakebackRoomTabs.length) {
          rakebackRoomTabs.forEach(function (tab) {
            var selected = normalizeRakebackRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRakebackRoom;
            tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
            tab.setAttribute("aria-selected", selected ? "true" : "false");
          });
        }
        if (rakebackArchiveBtn) {
          rakebackArchiveBtn.classList.remove("admin-report-rakeback-archive-tab--active");
          rakebackArchiveBtn.setAttribute("aria-pressed", "false");
        }
        syncRakebackAddButtonAccess();
        renderRakebackSummaryFromCache();
        runAdminReportAfterPaint(function () {
          if (seq !== rakebackRoomSwitchSeq) return;
          if (getRakebackSearchQuery()) {
            scheduleRakebackSearchRefresh({ immediate: true });
            return;
          }
          refreshRakebackFilterView({ fastSummary: true, deferDecorations: true });
        });
      }

      function setRakebackArchiveMode(active) {
        if (rakebackModule) {
          rakebackArchiveMode = false;
          rakebackModule.setArchiveMode(false);
          return;
        }
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          rakebackArchiveMode = false;
          renderRakebackTemplateOnlyView();
          return;
        }
        rakebackArchiveMode = !!active;
        if (rakebackRoomTabs && rakebackRoomTabs.length) {
          rakebackRoomTabs.forEach(function (tab) {
            tab.classList.remove("admin-report-rakeback-room-tab--active");
            tab.setAttribute("aria-selected", "false");
          });
        }
        if (rakebackArchiveBtn) {
          rakebackArchiveBtn.classList.toggle("admin-report-rakeback-archive-tab--active", rakebackArchiveMode);
          rakebackArchiveBtn.setAttribute("aria-pressed", rakebackArchiveMode ? "true" : "false");
        }
        syncRakebackAddButtonAccess();
        refreshRakebackVisibleView();
      }

      function syncRakebackRoomVisibility() {
        if (!rakebackBody) return;
        var searchQuery = getRakebackSearchQuery();
        var visibleIndex = 0;
        var groups = [];
        var byGroup = {};
        var visibleFragment = document.createDocumentFragment();
        var hiddenFragment = document.createDocumentFragment();
        var suspendedRows = [];
        getRakebackAllDataRows().forEach(function (row, index) {
          var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
          if (!byGroup[groupId]) {
            byGroup[groupId] = { groupId: groupId, rows: [], index: index };
            groups.push(byGroup[groupId]);
          }
          byGroup[groupId].rows.push(row);
        });
        groups.forEach(function (group, index) {
          var keyRow = getRakebackGroupKeyRow(group.rows);
          var matchesRoom = rakebackArchiveMode || getRakebackRowRoomFast(keyRow) === activeRakebackRoom;
          var matchesSearch = !searchQuery || group.rows.some(function (row) {
            return getRakebackRowPlayerIdFast(row).indexOf(searchQuery) !== -1;
          });
          var visible = false;
          if (matchesRoom && matchesSearch) {
            var archived = isRakebackGroupInArchive(group, index);
            visible = rakebackArchiveMode ? archived : !archived;
          }
          var hidden = !visible;
          group.rows.forEach(function (row) {
            row.hidden = hidden;
            if (hidden) {
              suspendedRows.push(row);
              hiddenFragment.appendChild(row);
            } else {
              visibleFragment.appendChild(row);
            }
          });
          group.rows.forEach(function (row) {
            var numberEl = row.querySelector("[data-rakeback-row-number]");
            if (numberEl) {
              var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
              var nextNumber = visible && row === keyRow && !isAddon ? String(++visibleIndex) : "";
              if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
              if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
            }
          });
        });
        rakebackBody.appendChild(visibleFragment);
        storeRakebackSuspendedRows(suspendedRows);
      }

      function syncRakebackVisibleRowNumbers() {
        if (!rakebackBody) return;
        var visibleIndex = 0;
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
          var numberEl = row.querySelector("[data-rakeback-row-number]");
          if (!numberEl) return;
          var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
          var nextNumber = !row.hidden && !isAddon ? String(++visibleIndex) : "";
          if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
          if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
        });
      }

      function scheduleRakebackTableSync(options) {
        var seq = ++rakebackDeferredSyncSeq;
        runAdminReportAfterPaint(function () {
          if (seq !== rakebackDeferredSyncSeq) return;
          syncRakebackTable(options || { skipSort: true });
        });
      }

      function removeRakebackGeneratedRows() {
        if (!rakebackBody) return;
        rakebackDecorationSeq += 1;
        if (rakebackDecorationTimer) {
          clearTimeout(rakebackDecorationTimer);
          rakebackDecorationTimer = null;
        }
        removeRakebackDateSeparators();
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-total-row]")).forEach(function (row) {
          row.parentNode.removeChild(row);
        });
      }

      function renderRakebackSummaryFromCache() {
        if (!rakebackRoomTotals) return false;
        var activeTotal = rakebackRoomTotals[activeRakebackRoom] || { display: 0, report: 0, rake: 0 };
        var total = 0;
        var rakeTotal = 0;
        RAKEBACK_ROOMS.forEach(function (room) {
          var item = rakebackRoomTotals[room] || { report: 0, rake: 0 };
          total += parseReportNumber(item.report);
          rakeTotal += parseReportNumber(item.rake);
        });
        if (rakebackSummaryEl) rakebackSummaryEl.hidden = rakebackArchiveMode;
        if (rakebackRoomTotalLabelEl) rakebackRoomTotalLabelEl.textContent = rakebackArchiveMode ? "Итого архив" : "Итого " + getRakebackRoomLabel(activeRakebackRoom);
        if (rakebackRoomTotalEl) rakebackRoomTotalEl.textContent = rakebackArchiveMode ? formatRakebackSummaryPair(rakeTotal, total) : formatRakebackSummaryPair(activeTotal.rake, activeTotal.report);
        if (rakebackTotalEl) rakebackTotalEl.textContent = formatRakebackSummaryPair(rakeTotal, total);
        showRakebackStatus("");
        return true;
      }

      function refreshRakebackVisibleView(options) {
        if (!rakebackBody) return 0;
        options = options || {};
        restoreRakebackSearchDetachedRows();
        if (rakebackSearchRefreshTimer) {
          clearTimeout(rakebackSearchRefreshTimer);
          rakebackSearchRefreshTimer = null;
        }
        removeRakebackGeneratedRows();
        dehydrateRakebackLazyTemplateRows({ keepSearchMatches: true });
        ensureRakebackSearchTemplateRows();
        hydrateRakebackLazyTemplateRowsForSearch();
        renderRakebackDeferredRowsForActiveRoom(25);
        ensureRakebackBaseRow(activeRakebackRoom);
        clearRakebackSeedRowsWhenTemplatesExist();
        syncRakebackRoomVisibility();
        ensureRakebackVisibleAddonBaseRows();
        if (options.deferDecorations) scheduleRakebackDecorations();
        else insertRakebackDateSeparators();
        syncRakebackVisibleRowNumbers();
        scheduleRakebackActiveRoomHydration();
        if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
        return updateRakebackSummaryTotals();
      }

      function scheduleRakebackDecorations() {
        if (!rakebackBody) return;
        var seq = ++rakebackDecorationSeq;
        if (rakebackDecorationTimer) clearTimeout(rakebackDecorationTimer);
        rakebackDecorationTimer = setTimeout(function () {
          rakebackDecorationTimer = null;
          runAdminReportAfterPaint(function () {
            if (seq !== rakebackDecorationSeq) return;
            insertRakebackDateSeparators();
            syncRakebackVisibleRowNumbers();
          });
        }, 80);
      }

      function refreshRakebackFilterView(options) {
        if (!rakebackBody) return 0;
        options = options || {};
        if (getRakebackSearchQuery()) {
          scheduleRakebackSearchRefresh({ immediate: true });
          if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
          return 0;
        }
        restoreRakebackSearchDetachedRows();
        if (rakebackSearchRefreshTimer) {
          clearTimeout(rakebackSearchRefreshTimer);
          rakebackSearchRefreshTimer = null;
        }
        removeRakebackGeneratedRows();
        renderRakebackDeferredRowsForActiveRoom(25);
        ensureRakebackBaseRow(activeRakebackRoom);
        clearRakebackSeedRowsWhenTemplatesExist();
        syncRakebackRoomVisibility();
        ensureRakebackVisibleAddonBaseRows();
        if (options.deferDecorations) scheduleRakebackDecorations();
        else insertRakebackDateSeparators();
        syncRakebackVisibleRowNumbers();
        scheduleRakebackActiveRoomHydration();
        if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
        return updateRakebackSummaryTotals();
      }

      function applyRakebackSearchRefresh() {
        if (!rakebackBody) return;
        removeRakebackGeneratedRows();
        var query = getRakebackSearchQuery();
        if (query) {
          ensureRakebackSearchTemplateRows();
          hydrateRakebackLazyTemplateRowsForSearch();
          hydrateRakebackDeferredRowsForSearch();
          var rows = getRakebackAllDataRows();
          var groups = getRakebackGroupsFromRows(rows);
          var visibleFragment = document.createDocumentFragment();
          var detachedFragment = document.createDocumentFragment();
          var detachedRows = [];
          var visibleIndex = 0;
          groups.forEach(function (group, index) {
            var keyRow = getRakebackGroupKeyRow(group.rows);
            var matchesRoom = rakebackArchiveMode || getRakebackRowRoomFast(keyRow) === activeRakebackRoom;
            var matchesSearch = group.rows.some(function (row) {
              return getRakebackRowPlayerIdFast(row).indexOf(query) !== -1;
            });
            var visible = false;
            if (matchesRoom && matchesSearch) {
              var archived = isRakebackGroupInArchive(group, index);
              visible = rakebackArchiveMode ? archived : !archived;
            }
            group.rows.forEach(function (row) {
              if (!visible) {
                detachedRows.push(row);
                detachedFragment.appendChild(row);
                return;
              }
              row.hidden = false;
              var numberEl = row.querySelector("[data-rakeback-row-number]");
              if (numberEl) {
                var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
                var nextNumber = row === keyRow && !isAddon ? String(++visibleIndex) : "";
                if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
                if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
              }
              visibleFragment.appendChild(row);
            });
          });
          rakebackBody.appendChild(visibleFragment);
          rakebackSearchDetachedRows = detachedRows;
          ensureRakebackVisibleAddonBaseRows();
        } else {
          restoreRakebackSearchDetachedRows();
          dehydrateRakebackLazyTemplateRows();
          ensureRakebackBaseRow(activeRakebackRoom);
          clearRakebackSeedRowsWhenTemplatesExist();
          syncRakebackRoomVisibility();
          ensureRakebackVisibleAddonBaseRows();
          insertRakebackDateSeparators();
          syncRakebackVisibleRowNumbers();
        }
        renderRakebackSummaryFromCache();
      }

      function scheduleRakebackSearchRefresh(options) {
        if (!rakebackBody) return;
        options = options || {};
        if (rakebackSearchRefreshTimer) {
          clearTimeout(rakebackSearchRefreshTimer);
          rakebackSearchRefreshTimer = null;
        }
        var delay = options.immediate ? 0 : 220;
        rakebackSearchRefreshTimer = setTimeout(function () {
          rakebackSearchRefreshTimer = null;
          runAdminReportAfterPaint(applyRakebackSearchRefresh);
        }, delay);
      }

      function showRakebackStatus(message) {
        if (!rakebackStatusEl) return;
        if (rakebackStatusClearTimer) {
          clearTimeout(rakebackStatusClearTimer);
          rakebackStatusClearTimer = null;
        }
        rakebackStatusEl.textContent = message || "";
        rakebackStatusEl.hidden = !message;
      }

      function showRakebackStatusBriefly(message) {
        showRakebackStatus(message);
        rakebackStatusClearTimer = setTimeout(function () {
          rakebackStatusClearTimer = null;
          if (rakebackStatusEl && rakebackStatusEl.textContent === message) showRakebackStatus("");
        }, 1000);
      }

      function markRakebackDraftLocalEdit() {
        rakebackDraftLocalEditUntil = Date.now() + 8000;
      }

      function showRakebackAlert(message) {
        var text = message || "";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert(text);
        showRakebackStatus(text);
      }

      function setRakebackRowSaved(row, saved) {
        if (!row) return;
        var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
        var lockPlayerId = isAddon || isRakebackCarryForwardPlaceholderRow(row);
        var canEditRow = canEditRakebackRow(row);
        row.classList.toggle("admin-report-rakeback-row--saved", !!saved);
        row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
        row.querySelectorAll("input").forEach(function (input) {
          if (input.hasAttribute("data-rakeback-discount15")) {
            input.disabled = !canEditRow || !!saved;
            return;
          }
          input.readOnly = !canEditRow || !!saved || (lockPlayerId && input.hasAttribute("data-rakeback-player-id"));
        });
        row.querySelectorAll("select").forEach(function (select) {
          select.disabled = !canEditRow || !!saved || isAddon;
        });
        updateRakebackRowActions(row);
      }

      function getRakebackTemplateIdsFromPreviousWeek(room) {
        var defaults = getRakebackTemplateDefaultsFromPreviousWeek(room);
        return Object.keys(defaults);
      }

      function getRakebackTemplateDefaultsFromPreviousWeek(room) {
        if (!rakebackBody) return {};
        var normalizedRoom = normalizeRakebackRoom(room);
        var currentWeekStart = getCurrentRakebackWeekStart();
        var previousWeekStart = Number.isFinite(currentWeekStart) ? currentWeekStart - REPORT_WEEK_MS : NaN;
        if (!Number.isFinite(previousWeekStart)) return {};
        var defaults = {};
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
          if (!row || row.getAttribute("data-rakeback-kind") === "addon") return;
          if (getRakebackRowRoom(row) !== normalizedRoom) return;
          var stamp = getRakebackRowBoundEntryAddedAt(row, index);
          if (!Number.isFinite(stamp) || getRakebackWeekStart(stamp) !== previousWeekStart) return;
          var playerId = getRakebackRowPlayerId(row);
          if (!playerId || defaults[playerId]) return;
          var percentInput = row.querySelector("[data-rakeback-percent]");
          var discountInput = row.querySelector("[data-rakeback-discount15]");
          defaults[playerId] = {
            percent: percentInput && percentInput.value ? percentInput.value : "",
            discount15: !!(discountInput && discountInput.checked),
          };
        });
        return defaults;
      }

      function getRakebackTemplateIdsForCurrentWeek(room, fallbackIds) {
        var previousWeekIds = getRakebackTemplateIdsFromPreviousWeek(room);
        var ids = previousWeekIds.slice();
        var seen = {};
        ids.forEach(function (id) { seen[id] = true; });
        (Array.isArray(fallbackIds) ? fallbackIds : []).forEach(function (id) {
          if (!id || seen[id]) return;
          seen[id] = true;
          ids.push(id);
        });
        return ids;
      }

      function ensureRakebackTemplateRows(room, playerIds, options) {
        if (!rakebackBody || !Array.isArray(playerIds) || !playerIds.length) return false;
        options = options || {};
        var normalizedRoom = normalizeRakebackRoom(room);
        var deletedTemplates = getRakebackDeletedTemplateMap();
        var previousWeekDefaults = getRakebackTemplateDefaultsFromPreviousWeek(normalizedRoom);
        var currentWeekStart = getCurrentRakebackWeekStart();
        var existingIds = {};
        rakebackLazyTemplateRows.forEach(function (row) {
          var data = normalizeRakebackLazyTemplateData(row);
          if (data && data.room === normalizedRoom && data.playerId) existingIds[data.playerId] = true;
        });
        rakebackDeferredRows.forEach(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          if (data && data.room === normalizedRoom && data.playerId && !isRakebackStoredRowArchived(data)) existingIds[data.playerId] = true;
        });
        var existingRenderedCount = 0;
        getRakebackAllDataRows().forEach(function (row, index) {
          if (getRakebackRowRoom(row) !== normalizedRoom) return;
          var stamp = getRakebackRowBoundEntryAddedAt(row, index);
          if (Number.isFinite(stamp) && Number.isFinite(currentWeekStart) && getRakebackWeekStart(stamp) < currentWeekStart) return;
          existingRenderedCount += 1;
          var idInput = row.querySelector("[data-rakeback-player-id]");
          var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
          if (playerId) existingIds[playerId] = true;
        });
        var added = false;
        var renderLimit = Number(options.limit);
        var rendered = existingRenderedCount;
        playerIds.forEach(function (playerId) {
          if (!options.includeDeletedTemplates && deletedTemplates[getRakebackTemplateKey(normalizedRoom, playerId)]) return;
          if (existingIds[playerId]) return;
          var data = {
            kind: "base",
            room: normalizedRoom,
            playerId: playerId,
            percent: previousWeekDefaults[playerId] ? previousWeekDefaults[playerId].percent : "",
            discount15: previousWeekDefaults[playerId] ? previousWeekDefaults[playerId].discount15 : false,
            carryForward: true,
            createdAt: getRakebackTemplateCreatedAt(normalizedRoom, playerId),
          };
          if (Number.isFinite(renderLimit) && rendered >= renderLimit) {
            rakebackDeferredRows.push(normalizeRakebackStoredRowData(data));
          } else {
            rakebackBody.appendChild(createRakebackRow(data));
            rendered += 1;
          }
          existingIds[playerId] = true;
          added = true;
        });
        return added;
      }

      function ensureRakebackBaseRow(room) {
        if (!rakebackBody) return;
        if (rakebackArchiveMode) return;
        var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
        var templateOptions = { limit: 25 };
        var templateIds = getRakebackTemplateIdsForCurrentWeek(targetRoom, getRakebackTemplateIdsForRoom(targetRoom));
        if (templateIds.length) ensureRakebackTemplateRows(targetRoom, templateIds, templateOptions);
        var rows = getRakebackAllDataRows();
        rows.forEach(function (row, index) {
          getRakebackRowCreatedAt(row, index);
          getRakebackRowStandardAt(row, index);
          syncRakebackRowLookupAttrs(row);
        });
        var hasRoomRow = rows.some(function (row) {
          return getRakebackRowRoom(row) === targetRoom && !isRakebackRowInArchive(row, 0);
        }) || rakebackDeferredRows.some(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          return data.room === targetRoom && !isRakebackStoredRowArchived(data);
        });
        if (hasRoomRow) return;
        if (templateIds.length) return;
      }

      function isRakebackRowFilled(row) {
        if (!row) return false;
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var percentInput = row.querySelector("[data-rakeback-percent]");
        var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
        var percent = parseReportNumber(percentInput ? percentInput.value : "");
        return rake !== 0 ||
          percent !== 0 ||
          row.getAttribute("data-rakeback-carry-forward") === "1" ||
          row.getAttribute("data-rakeback-explicit-zero-rake") === "1" ||
          isRakebackRowAccounted(row);
      }

      function hasRakebackRakeValue(row) {
        if (!row) return false;
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        return parseReportNumber(rakeInput ? rakeInput.value : "") !== 0;
      }

      function canAddRakebackAddon(row) {
        if (!row) return false;
        if (!canEditRakebackDraftRows()) return false;
        if (!isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "")) return false;
        return !!getRakebackRowPlayerId(row) && isRakebackRowFilled(row) && hasRakebackRakeValue(row);
      }

      function updateRakebackRowActions(row) {
        if (!row) return;
        var saved = row.getAttribute("data-rakeback-saved") === "1";
        var accounted = isRakebackRowAccounted(row);
        var canEditRow = canEditRakebackRow(row);
        var saveBtn = row.querySelector("[data-rakeback-save]");
        var editBtn = row.querySelector("[data-rakeback-edit]");
        var addBtn = row.querySelector("[data-rakeback-add-addon]");
        var removeBtn = row.querySelector("[data-rakeback-remove]");
        var colorBtn = row.querySelector("[data-rakeback-color-toggle]");
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          if (saveBtn) saveBtn.hidden = true;
          if (editBtn) editBtn.hidden = true;
          if (addBtn) addBtn.hidden = true;
          if (removeBtn) removeBtn.hidden = true;
          if (colorBtn) colorBtn.hidden = true;
          return;
        }
        if (saveBtn) {
          saveBtn.disabled = !canEditRow;
          saveBtn.hidden = !canEditRow || saved;
        }
        if (editBtn) editBtn.hidden = !canEditRow || !saved || accounted;
        if (addBtn) {
          var canAdd = canAddRakebackAddon(row);
          addBtn.disabled = !canAdd;
          addBtn.hidden = !canAdd;
        }
        if (removeBtn) {
          var canRemove = canRemoveRakebackRow(row);
          removeBtn.disabled = !canRemove;
          removeBtn.hidden = !canRemove;
        }
        if (colorBtn) {
          colorBtn.disabled = !canEditRow;
          colorBtn.hidden = !canEditRow;
        }
      }

      function getRakebackPreviousRake(row, groupRows) {
        if (!rakebackBody || !row || row.getAttribute("data-rakeback-kind") !== "addon") return 0;
        var groupId = row.getAttribute("data-rakeback-group") || "";
        var previousRake = 0;
        var rows = Array.isArray(groupRows) ? groupRows : getRakebackAllDataRows();
        for (var i = 0; i < rows.length; i++) {
          var current = rows[i];
          if (current === row) break;
          if (current.getAttribute("data-rakeback-group") !== groupId) continue;
          var rakeInput = current.querySelector("[data-rakeback-rake]");
          previousRake = parseReportNumber(rakeInput ? rakeInput.value : "");
        }
        return previousRake;
      }

      function getRakebackRowCalculationBase(row, previousRake) {
        if (!row) return 0;
        var rakeInput = row.querySelector("[data-rakeback-rake]");
        var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
        if (row.getAttribute("data-rakeback-kind") === "addon") {
          return Math.max(0, rake - (arguments.length > 1 ? parseReportNumber(previousRake) : getRakebackPreviousRake(row)));
        }
        return rake;
      }

      function getRakebackRowAmount(row, previousRake) {
        if (!row) return 0;
        var percentInput = row.querySelector("[data-rakeback-percent]");
        var discountInput = row.querySelector("[data-rakeback-discount15]");
        var base = arguments.length > 1 ? getRakebackRowCalculationBase(row, previousRake) : getRakebackRowCalculationBase(row);
        var amount = base * parseReportNumber(percentInput ? percentInput.value : "") / 100;
        if (discountInput && discountInput.checked) amount *= 0.85;
        return amount;
      }

      function syncRakebackRowGroupDisplay(row) {
        if (!row) return;
        var rows = getRakebackGroupRows(row);
        var base = getRakebackGroupKeyRow(rows);
        var previousRake = 0;
        rows.forEach(function (current) {
          if (current !== base && base) {
            var baseRoom = base.querySelector("[data-rakeback-room]");
            var baseId = base.querySelector("[data-rakeback-player-id]");
            var room = current.querySelector("[data-rakeback-room]");
            var id = current.querySelector("[data-rakeback-player-id]");
            if (room && baseRoom) room.value = baseRoom.value;
            if (id && baseId) id.value = baseId.value;
            syncRakebackRowLookupAttrs(current);
          }
          var rakeInput = current.querySelector("[data-rakeback-rake]");
          var amountEl = current.querySelector("[data-rakeback-amount]");
          var restEl = current.querySelector("[data-rakeback-rest]");
          var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
          var rowPreviousRake = current.getAttribute("data-rakeback-kind") === "addon" ? previousRake : 0;
          if (restEl) restEl.textContent = formatRakebackCellNumber(Math.max(0, rake - rowPreviousRake));
          if (amountEl) amountEl.textContent = formatRakebackAmountCell(getRakebackRowAmount(current, rowPreviousRake));
          updateRakebackRowActions(current);
          previousRake = rake;
        });
      }

      function isCurrentRakebackOwner(ownerId) {
        if (canManageAllRakebackRows()) return true;
        var currentOwnerId = getCurrentRakebackOwnerId();
        ownerId = String(ownerId || "").trim();
        return !ownerId || !currentOwnerId || ownerId === currentOwnerId;
      }

      function isCurrentRakebackReportOwner(ownerId) {
        // Editing the shared draft is a permission, not report ownership.
        var currentOwnerId = getCurrentRakebackOwnerId();
        ownerId = String(ownerId || "").trim();
        return !ownerId || !currentOwnerId || ownerId === currentOwnerId;
      }

      function isRakebackRowAccounted(row) {
        return !!(row && row.getAttribute("data-rakeback-accounted") === "1");
      }

      function getRakebackRowReportedAmount(row, fallbackAmount) {
        var raw = row ? row.getAttribute("data-rakeback-reported-amount") : "";
        if (raw != null && raw !== "") return parseReportNumber(raw);
        return isRakebackRowAccounted(row) ? parseReportNumber(fallbackAmount) : 0;
      }

      function canEditRakebackRow(row) {
        if (!row) return false;
        if (!canEditRakebackDraftRows()) return false;
        if (isRakebackRowAccounted(row)) return false;
        return isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "");
      }

      function canRemoveRakebackRow(row) {
        if (!row || !rakebackBody) return false;
        if (!canEditRakebackDraftRows()) return false;
        if (isRakebackRowAccounted(row)) return false;
        if (!isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "")) return false;
        if (row.getAttribute("data-rakeback-kind") !== "base") return true;
        var groupId = row.getAttribute("data-rakeback-group") || "";
        var groupRows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
        return groupRows.every(function (candidate) {
          if (candidate.getAttribute("data-rakeback-group") !== groupId) return true;
          return isCurrentRakebackOwner(candidate.getAttribute("data-rakeback-owner") || "");
        });
      }

      function collectRakebackDomRowsFromNodes(rows, includeEmpty, currentOwnerOnly) {
        var previousRakeByGroup = {};
        return (rows || []).map(function (row) {
          var roomSelect = row.querySelector("[data-rakeback-room]");
          var idInput = row.querySelector("[data-rakeback-player-id]");
          var rakeInput = row.querySelector("[data-rakeback-rake]");
          var percentInput = row.querySelector("[data-rakeback-percent]");
          var discountInput = row.querySelector("[data-rakeback-discount15]");
          var room = normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : "P21");
          var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
          var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
          var percent = parseReportNumber(percentInput ? percentInput.value : "");
          var groupId = row.getAttribute("data-rakeback-group") || "";
          var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
          var previousRake = kind === "addon" ? parseReportNumber(previousRakeByGroup[groupId]) : 0;
          var roomAmount = Math.round(getRakebackRowAmount(row, previousRake));
          var amount = getRakebackReportAmount(room, roomAmount);
          var reportedAmount = getRakebackRowReportedAmount(row, amount);
          var discount15 = !!(discountInput && discountInput.checked);
          var explicitZeroRake = row.getAttribute("data-rakeback-explicit-zero-rake") === "1";
          var carryForward = row.getAttribute("data-rakeback-carry-forward") === "1";
          var saved = row.getAttribute("data-rakeback-saved") === "1";
          var accounted = isRakebackRowAccounted(row);
          var templateDefaults = carryForward && (percent !== 0 || discount15);
          var filled = rake !== 0 || roomAmount !== 0 || explicitZeroRake || accounted || (!carryForward && percent !== 0) || templateDefaults;
          var emptyCarryForwardTemplate = carryForward && rake === 0 && roomAmount === 0 && !explicitZeroRake && !accounted;
          previousRakeByGroup[groupId] = rake;
          if (!includeEmpty && !filled) return null;
          var ownerId = row.getAttribute("data-rakeback-owner") || "";
          if (currentOwnerOnly && !isCurrentRakebackReportOwner(ownerId)) return null;
          var color = normalizeRakebackRowColor(row.getAttribute("data-rakeback-row-color") || "");
          return {
            groupId: groupId,
            kind: kind,
            room: room,
            playerId: playerId,
            rake: rake,
            rakeZero: explicitZeroRake,
            percent: percent,
            carryForward: carryForward,
            discount15: discount15,
            roomAmount: roomAmount,
            chipAmount: room === "X" ? roomAmount : null,
            amount: amount,
            reportedAmount: reportedAmount,
            saved: saved,
            color: color,
            createdAt: getRakebackRowCreatedAt(row, 0),
            standardAt: getRakebackRowStandardAt(row, 0),
            entryAddedAt: getRakebackRowEntryAddedAtForSave(row),
            accounted: accounted,
            reportedAt: row.getAttribute("data-rakeback-reported-at") || "",
            reportId: row.getAttribute("data-rakeback-report-id") || "",
            ownerId: ownerId || (emptyCarryForwardTemplate ? "" : getCurrentRakebackOwnerId()),
          };
        }).filter(Boolean);
      }

      function collectRakebackDeferredRows(includeEmpty, currentOwnerOnly) {
        return (rakebackDeferredRows || []).map(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          var room = normalizeRakebackRoom(data.room || "P21");
          var rake = parseReportNumber(data.rake);
          var percent = parseReportNumber(data.percent);
          var discount15 = !!data.discount15;
          var hasStoredRoomAmount = data.roomAmount != null && data.roomAmount !== "";
          var roomAmount = hasStoredRoomAmount ? parseReportNumber(data.roomAmount) : Math.round((rake * percent / 100) * (discount15 ? 0.85 : 1));
          var amount = data.amount != null && data.amount !== "" ? parseReportNumber(data.amount) : getRakebackReportAmount(room, roomAmount);
          var accounted = !!data.accounted;
          var templateDefaults = data.carryForward === true && (percent !== 0 || discount15);
          var filled = rake !== 0 || roomAmount !== 0 || data.rakeZero === true || accounted || (!data.carryForward && percent !== 0) || templateDefaults;
          var emptyCarryForwardTemplate = data.carryForward === true && rake === 0 && roomAmount === 0 && data.rakeZero !== true && !accounted;
          if (!includeEmpty && !filled) return null;
          if (currentOwnerOnly && !isCurrentRakebackReportOwner(data.ownerId || "")) return null;
          var createdAt = getFirstRakebackTimeValue([data.createdAt], Date.now());
          var standardAt = getFirstRakebackTimeValue([data.standardAt], createdAt);
          var entryAddedAt = getFirstRakebackTimeValue([data.entryAddedAt, data.reportedAt], createdAt);
          return {
            groupId: data.groupId || "",
            kind: data.kind === "addon" ? "addon" : "base",
            room: room,
            playerId: String(data.playerId || "").trim(),
            rake: rake,
            rakeZero: data.rakeZero === true,
            percent: percent,
            carryForward: data.carryForward === true,
            discount15: discount15,
            roomAmount: roomAmount,
            chipAmount: room === "X" ? roomAmount : null,
            amount: amount,
            reportedAmount: data.reportedAmount != null && data.reportedAmount !== "" ? parseReportNumber(data.reportedAmount) : (accounted ? amount : 0),
            saved: data.saved !== false,
            color: normalizeRakebackRowColor(data.color || ""),
            createdAt: createdAt,
            standardAt: standardAt,
            entryAddedAt: entryAddedAt,
            accounted: accounted,
            reportedAt: data.reportedAt || "",
            reportId: data.reportId || "",
            ownerId: data.ownerId || (emptyCarryForwardTemplate ? "" : getCurrentRakebackOwnerId()),
          };
        }).filter(Boolean);
      }

      function collectRakebackRows(includeEmpty, currentOwnerOnly) {
        if (rakebackModule) return includeEmpty ? [] : rakebackModule.collectRows();
        if (RAKEBACK_TEMPLATE_ONLY_MODE && !includeEmpty) return [];
        if (!rakebackBody) return collectRakebackDeferredRows(includeEmpty, currentOwnerOnly);
        var rows = collectRakebackDomRowsFromNodes(getRakebackAllDataRows(), includeEmpty, currentOwnerOnly);
        return rows.concat(collectRakebackDeferredRows(includeEmpty, currentOwnerOnly));
      }

      function sumRakebackReportRows(rows) {
        return (Array.isArray(rows) ? rows : []).reduce(function (sum, row) {
          return sum + parseReportNumber(row && row.amount);
        }, 0);
      }

      function updateRakebackSummaryTotals() {
        if (rakebackSummaryTimer) {
          clearTimeout(rakebackSummaryTimer);
          rakebackSummaryTimer = null;
        }
        var allRows = collectRakebackRows(false, false);
        var issuedLatestRakeByGroup = {};
        allRows.filter(function (row) {
          return row && !isRakebackCollectedRowArchived(row);
        }).forEach(function (row, index) {
          addCollectedLatestGroupRake(issuedLatestRakeByGroup, row, index);
        });
        issuedRakebackReportRakeTotal = sumCollectedLatestGroupRake(issuedLatestRakeByGroup);
        var collected = allRows.filter(function (row) {
          var archived = isRakebackCollectedRowArchived(row);
          return rakebackArchiveMode ? archived : !archived;
        });
        var roomTotals = {};
        var latestRakeByRoomGroup = {};
        var latestRakeByGroup = {};
        RAKEBACK_ROOMS.forEach(function (room) {
          roomTotals[room] = { display: 0, report: 0, rake: 0 };
          latestRakeByRoomGroup[room] = {};
        });
        collected.forEach(function (row, index) {
          var room = normalizeRakebackRoom(row.room);
          if (!roomTotals[room]) roomTotals[room] = { display: 0, report: 0, rake: 0 };
          if (!latestRakeByRoomGroup[room]) latestRakeByRoomGroup[room] = {};
          roomTotals[room].display += parseReportNumber(row.roomAmount != null ? row.roomAmount : row.amount);
          roomTotals[room].report += parseReportNumber(row.amount);
          addCollectedLatestGroupRake(latestRakeByRoomGroup[room], row, index);
          addCollectedLatestGroupRake(latestRakeByGroup, row, index);
        });
        Object.keys(latestRakeByRoomGroup).forEach(function (room) {
          if (!roomTotals[room]) roomTotals[room] = { display: 0, report: 0, rake: 0 };
          roomTotals[room].rake = sumCollectedLatestGroupRake(latestRakeByRoomGroup[room]);
        });
        var total = collected.reduce(function (sum, row) {
          return sum + parseReportNumber(row.amount);
        }, 0);
        var rakeTotal = sumCollectedLatestGroupRake(latestRakeByGroup);
        var reportRakebackTotal = sumRakebackReportRows(allRows.filter(function (row) {
          return row && isCurrentRakebackReportOwner(row.ownerId) && !row.accounted && hasRakebackReportValue(row) && !isRakebackCollectedRowArchived(row);
        }));
        var activeTotal = roomTotals[activeRakebackRoom] || { display: 0, report: 0, rake: 0 };
        rakebackRoomTotals = roomTotals;
        if (rakebackSummaryEl) rakebackSummaryEl.hidden = rakebackArchiveMode;
        if (rakebackRoomTotalLabelEl) rakebackRoomTotalLabelEl.textContent = rakebackArchiveMode ? "Итого архив" : "Итого " + getRakebackRoomLabel(activeRakebackRoom);
        if (rakebackRoomTotalEl) rakebackRoomTotalEl.textContent = rakebackArchiveMode ? formatRakebackSummaryPair(rakeTotal, total) : formatRakebackSummaryPair(activeTotal.rake, activeTotal.report);
        if (rakebackTotalEl) rakebackTotalEl.textContent = formatRakebackSummaryPair(rakeTotal, total);
        if (rakebackTotalInput && !manualRakebackInputTouched) rakebackTotalInput.value = String(Math.round(reportRakebackTotal) || "");
        if (rakebackTotalsModal && !rakebackTotalsModal.hidden) renderRakebackTotalsModal();
        updateFiguresTotals({ syncExtras: false });
        showRakebackStatus("");
        return reportRakebackTotal;
      }

      function scheduleRakebackSummaryTotals() {
        if (rakebackSummaryTimer) clearTimeout(rakebackSummaryTimer);
        rakebackSummaryTimer = setTimeout(function () {
          rakebackSummaryTimer = null;
          runAdminReportAfterPaint(updateRakebackSummaryTotals);
        }, 160);
      }

      function getReportStoredRakebackTotal(report) {
        if (report && report.rakeback === "" && Array.isArray(report.rakebackRows) && report.rakebackRows.length) {
          return sumRakebackReportRows(report.rakebackRows);
        }
        if (report && report.rakeback === "") return 0;
        if (report && report.rakeback != null) return parseReportNumber(report.rakeback);
        if (report && Array.isArray(report.rakebackRows) && report.rakebackRows.length) {
          return sumRakebackReportRows(report.rakebackRows);
        }
        return parseReportNumber(report && report.rakeback);
      }

      function hasRakebackReportValue(row) {
        if (!row) return false;
        return parseReportNumber(row.rake) !== 0 ||
          parseReportNumber(row.roomAmount) !== 0 ||
          parseReportNumber(row.amount) !== 0 ||
          row.rakeZero === true ||
          row.accounted === true;
      }

      function getUnaccountedRakebackReportRows() {
        if (rakebackModule) return rakebackModule.getUnaccountedRows();
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return [];
        return collectRakebackRows(false, true).filter(function (row) {
          return row && !row.accounted && hasRakebackReportValue(row) && !isRakebackCollectedRowArchived(row);
        });
      }

      function markUnaccountedRakebackRowsAccounted(reportId, reportedAtOverride) {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        if (!rakebackBody) return;
        var parsedReportedAt = parseRakebackTimeValue(reportedAtOverride);
        var reportedAt = Number.isFinite(parsedReportedAt) ? new Date(parsedReportedAt).toISOString() : new Date().toISOString();
        getRakebackAllDataRows().forEach(function (row) {
          var ownerId = row.getAttribute("data-rakeback-owner") || "";
          if (!isCurrentRakebackReportOwner(ownerId)) return;
          if (!isRakebackRowFilled(row)) return;
          if (isRakebackRowAccounted(row)) return;
          var room = getRakebackRowRoom(row);
          var currentAmount = getRakebackReportAmount(room, Math.round(getRakebackRowAmount(row)));
          row.setAttribute("data-rakeback-accounted", "1");
          row.setAttribute("data-rakeback-reported-at", reportedAt);
          row.setAttribute("data-rakeback-reported-amount", String(Math.round(currentAmount * 100) / 100));
          if (!Number.isFinite(parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || ""))) {
            row.setAttribute("data-rakeback-entry-added-at", reportedAt);
          }
          if (reportId) row.setAttribute("data-rakeback-report-id", String(reportId));
        });
        rakebackDeferredRows = rakebackDeferredRows.map(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          if (!isCurrentRakebackReportOwner(data.ownerId || "")) return data;
          if (data.accounted) return data;
          var room = normalizeRakebackRoom(data.room || "P21");
          var rake = parseReportNumber(data.rake);
          var percent = parseReportNumber(data.percent);
          var roomAmount = data.roomAmount != null && data.roomAmount !== ""
            ? parseReportNumber(data.roomAmount)
            : Math.round((rake * percent / 100) * (data.discount15 ? 0.85 : 1));
          var amount = data.amount != null && data.amount !== "" ? parseReportNumber(data.amount) : getRakebackReportAmount(room, roomAmount);
          var hasValue = rake !== 0 || roomAmount !== 0 || amount !== 0 || data.rakeZero === true;
          if (!hasValue) return data;
          data.accounted = true;
          data.reportedAt = reportedAt;
          data.reportedAmount = String(Math.round(amount * 100) / 100);
          if (!Number.isFinite(parseRakebackTimeValue(data.entryAddedAt || ""))) data.entryAddedAt = reportedAt;
          if (reportId) data.reportId = String(reportId);
          return data;
        });
      }

      function ensureRakebackTemplateRowsFromReportedRows(rows) {
        if (!rakebackBody || !Array.isArray(rows) || !rows.length) return false;
        var templateByKey = {};
        getRakebackAllDataRows().forEach(function (row) {
          if (!isRakebackCarryForwardPlaceholderRow(row)) return;
          var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
          if (key) templateByKey[key] = row;
        });
        var changed = false;
        rows.forEach(function (data) {
          if (!data) return;
          var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
          var room = normalizeRakebackRoom(data.room || "P21");
          var playerId = String(data.playerId || data.id || "").trim();
          var percent = parseReportNumber(data.percent);
          var key = getRakebackTemplateKey(room, playerId);
          if (kind === "addon" || !key || percent === 0) return;
          var templateRow = templateByKey[key];
          if (templateRow) {
            var percentInput = templateRow.querySelector("[data-rakeback-percent]");
            if (percentInput && parseReportNumber(percentInput.value) !== percent) {
              percentInput.value = formatReportInputNumber(percent);
              changed = true;
            }
            return;
          }
          var now = Date.now();
          templateRow = createRakebackRow({
            kind: "base",
            room: room,
            playerId: playerId,
            percent: percent,
            carryForward: true,
            templateCarryForward: true,
            createdAt: now,
            standardAt: getRakebackTopStandardAt(room),
          });
          rakebackBody.appendChild(templateRow);
          templateByKey[key] = templateRow;
          changed = true;
        });
        return changed;
      }

      function syncRakebackTable(options) {
        if (rakebackModule) return rakebackModule.syncTable();
        if (!rakebackBody) return 0;
        options = options || {};
        restoreRakebackSearchDetachedRows();
        removeRakebackGeneratedRows();
        dehydrateRakebackLazyTemplateRows({ keepSearchMatches: true });
        ensureRakebackSearchTemplateRows();
        hydrateRakebackLazyTemplateRowsForSearch();
        renderRakebackDeferredRowsForActiveRoom(25);
        ensureRakebackBaseRow(activeRakebackRoom);
        clearRakebackSeedRowsWhenTemplatesExist();
        var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
        rows.forEach(function (row, index) {
          getRakebackRowCreatedAt(row, index);
          getRakebackRowStandardAt(row, index);
          syncRakebackRowLookupAttrs(row);
        });
        var baseByGroup = {};
        rows.forEach(function (row) {
          var groupId = row.getAttribute("data-rakeback-group");
          if (!groupId) {
            groupId = nextRakebackGroupId();
            row.setAttribute("data-rakeback-group", groupId);
          }
          if (row.getAttribute("data-rakeback-kind") !== "addon" && !baseByGroup[groupId]) baseByGroup[groupId] = row;
        });
        var previousRakeByGroup = {};
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
            syncRakebackRowLookupAttrs(row);
          }
          var rakeInput = row.querySelector("[data-rakeback-rake]");
          var percentInput = row.querySelector("[data-rakeback-percent]");
          var amountEl = row.querySelector("[data-rakeback-amount]");
          var restEl = row.querySelector("[data-rakeback-rest]");
          var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
          var previousRake = kind === "addon" ? parseReportNumber(previousRakeByGroup[groupId]) : 0;
          if (restEl) {
            restEl.textContent = formatRakebackCellNumber(Math.max(0, rake - previousRake));
          }
          var amount = getRakebackRowAmount(row, previousRake);
          if (amountEl) amountEl.textContent = formatRakebackAmountCell(amount);
          updateRakebackRowActions(row);
          previousRakeByGroup[groupId] = rake;
        });
        if (!options.skipSort) rows = sortRakebackRows(rows);
        syncRakebackRoomVisibility();
        ensureRakebackVisibleAddonBaseRows();
        if (options.deferDecorations) scheduleRakebackDecorations();
        else insertRakebackDateSeparators();
        syncRakebackVisibleRowNumbers();
        scheduleRakebackActiveRoomHydration();
        if (options.fastSummary && renderRakebackSummaryFromCache()) {
          scheduleRakebackSummaryTotals();
          return 0;
        }
        return updateRakebackSummaryTotals();
      }

      function fillRakebackTable(rows, legacyRakeback) {
        if (!rakebackBody) return;
        if (rakebackModule) {
          rakebackModule.fillTable(rows, legacyRakeback);
          return;
        }
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          renderRakebackTemplateOnlyView();
          return;
        }
        rakebackDraftNeedsMigration = false;
        var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
        if (!list.length && legacyRakeback != null && legacyRakeback !== "" && parseReportNumber(legacyRakeback) !== 0) {
          list = [{ kind: "base", room: "P21", playerId: "", rake: legacyRakeback, percent: 100 }];
        }
        if (!list.length) {
          rakebackLazyTemplateRows = [];
          rakebackSearchDetachedRows = [];
          rakebackSuspendedRows = [];
          rakebackDeferredRows = [];
          rakebackBody.innerHTML = "";
          syncRakebackTable();
          return;
        }
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        var renderList = [];
        var deferredList = [];
        list.forEach(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          var sameRoom = normalizeRakebackRoom(data.room || "P21") === targetRoom;
          var archived = isRakebackStoredRowArchived(data);
          if ((rakebackArchiveMode ? archived : !archived) && sameRoom && renderList.length < 25) renderList.push(data);
          else deferredList.push(data);
        });
        var fragment = document.createDocumentFragment();
        renderList.forEach(function (row) {
          var tr = createRakebackRow(row);
          fragment.appendChild(tr);
          if (row.saved) setRakebackRowSaved(tr, true);
        });
        rakebackLazyTemplateRows = [];
        rakebackSearchDetachedRows = [];
        rakebackSuspendedRows = [];
        rakebackDeferredRows = deferredList;
        rakebackBody.replaceChildren(fragment);
        if (list.length > 200) {
          syncRakebackTable({ skipSort: true, deferDecorations: true, fastSummary: true });
        } else {
          syncRakebackTable();
        }
        if (rakebackDraftNeedsMigration && !editingReportId) saveRakebackDraftRowsNow(true);
      }

      function addRakebackBaseRow() {
        if (!rakebackBody) return;
        if (!canEditRakebackDraftRows()) {
          showRakebackStatusBriefly("Нет доступа к редактированию рейкбека");
          return;
        }
        if (rakebackSearchInput && rakebackSearchInput.value) rakebackSearchInput.value = "";
        rakebackDraftMutationSeq += 1;
        var now = Date.now();
        var row = createRakebackRow({
          kind: "base",
          room: activeRakebackRoom,
          createdAt: now,
          standardAt: getRakebackTopStandardAt(activeRakebackRoom),
          entryAddedAt: now,
        });
        var firstRow = rakebackBody.querySelector("[data-rakeback-row]");
        if (firstRow) rakebackBody.insertBefore(row, firstRow);
        else rakebackBody.appendChild(row);
        syncRakebackTable();
        focusRakebackRow(row);
      }

      function addRakebackAddonRow(baseRow) {
        if (!rakebackBody || !baseRow) return;
        if (!canEditRakebackDraftRows()) return;
        var groupId = baseRow.getAttribute("data-rakeback-group") || nextRakebackGroupId();
        baseRow.setAttribute("data-rakeback-group", groupId);
        var roomSelect = baseRow.querySelector("[data-rakeback-room]");
        var idInput = baseRow.querySelector("[data-rakeback-player-id]");
        var percentInput = baseRow.querySelector("[data-rakeback-percent]");
        var discountInput = baseRow.querySelector("[data-rakeback-discount15]");
        var entryAddedAt = getRakebackRowEntryAddedAtForSave(baseRow) || Date.now();
        var addon = createRakebackRow({
          kind: "addon",
          groupId: groupId,
          room: roomSelect && roomSelect.value ? roomSelect.value : "P21",
          playerId: idInput && idInput.value ? idInput.value : "",
          percent: percentInput && percentInput.value ? percentInput.value : "",
          discount15: !!(discountInput && discountInput.checked),
          entryAddedAt: entryAddedAt,
          editing: true,
        });
        var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
        var anchor = baseRow;
        rows.forEach(function (candidate) {
          if (candidate.getAttribute("data-rakeback-group") === groupId) anchor = candidate;
        });
        if (anchor.nextSibling) rakebackBody.insertBefore(addon, anchor.nextSibling);
        else rakebackBody.appendChild(addon);
        syncRakebackTable({ skipSort: true });
        markRakebackDraftLocalEdit();
        saveRakebackDraftRowsNow(true);
        var rakeInput = addon.querySelector("[data-rakeback-rake]");
        if (rakeInput && typeof rakeInput.focus === "function") rakeInput.focus();
      }

      /** Суммирует доп. строки отчёта в map по названию (без дубля с extraFields + legacy). */
      function mergeReportExtrasIntoMap(map, r) {
        if (!r || !map) return;
        function addExtra(name, raw) {
          name = name != null ? String(name).trim() : "";
          if (!name) name = "Доп.";
          if (isReportManualRakebackFieldName(name)) return;
          var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
          if (isNaN(n)) n = 0;
          if (isReportUsdtRateFieldName(name)) {
            var prev = map[name] && map[name].__avg ? map[name] : { __avg: true, sum: 0, count: 0 };
            if (n !== 0) {
              prev.sum += n;
              prev.count += 1;
            }
            map[name] = prev;
            return;
          }
          map[name] = (map[name] || 0) + n;
        }
        if (Array.isArray(r.extraFields) && r.extraFields.length > 0) {
          r.extraFields.forEach(function (f) {
            if (!f) return;
            addExtra(f.name != null ? f.name : f.extraName, f.amount != null ? f.amount : f.extraAmount);
          });
          return;
        }
        if (r.extraName || r.extraAmount != null) {
          addExtra(r.extraName, r.extraAmount);
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

      var REPORT_DAY_MS = 24 * 60 * 60 * 1000;
      var REPORT_WEEK_MS = 7 * REPORT_DAY_MS;
      var REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
      var REPORT_DAY_CUTOFF_MS = 16 * 60 * 60 * 1000;

      function reportBusinessTimestampMs(ts) {
        var raw = Number(ts);
        if (!Number.isFinite(raw)) return raw;
        var p = moscowPartsFromTs(raw - REPORT_DAY_CUTOFF_MS);
        return new Date(p.y + "-" + p.m + "-" + p.d + "T12:00:00+03:00").getTime();
      }

      function reportStoredDateTimestampMs(r) {
        var raw = String(r && r.date || "").trim();
        if (!raw) return NaN;
        var match = raw.match(/^(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{2,4}))?$/);
        if (!match) return NaN;
        var day = Number(match[1]);
        var month = Number(match[2]);
        var year = match[3] ? Number(match[3]) : NaN;
        if (!Number.isFinite(year)) {
          var created = r && r.createdAt ? new Date(r.createdAt).getTime() : NaN;
          year = Number.isFinite(created)
            ? Number(new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", year: "numeric" }).format(new Date(created)))
            : new Date().getFullYear();
        }
        if (year < 100) year += 2000;
        if (!day || !month || month < 1 || month > 12) return NaN;
        return new Date(year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0") + "T12:00:00+03:00").getTime();
      }

      /** Отчётный день переключается в 16:00 МСК: до 16:00 идёт предыдущая дата. */
      function reportEffectiveTimestampMs(r) {
        var stored = reportStoredDateTimestampMs(r);
        if (Number.isFinite(stored)) return stored;
        var raw = r && r.createdAt ? new Date(r.createdAt).getTime() : NaN;
        if (!r || !r.createdAt || raw !== raw) return raw;
        return reportBusinessTimestampMs(raw);
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

      /** Дата/день недели для новой формы: отчётный день начинается в 16:00 МСК. */
      function getShiftReportDateInfo() {
        var effTs = reportBusinessTimestampMs(Date.now());
        var meta = formatRuWeekdayDateFromTs(effTs);
        var wdl = meta.weekday.toLowerCase();
        return { label: meta.weekday + ", " + meta.date, weekday: wdl, date: meta.date, iso: new Date(effTs).toISOString() };
      }

      function getAdminReportAppVersionLabel() {
        var version = document.documentElement ? document.documentElement.getAttribute("data-app-version") : "";
        return version ? "v" + String(version).trim() : "";
      }

      function formatAdminReportDateLabel(label) {
        var version = getAdminReportAppVersionLabel();
        return version ? String(label || "").trim() + " · " + version : String(label || "").trim();
      }

      function mskDateFromReportTs(ts) {
        return new Date(ts + REPORT_MSK_SHIFT_MS);
      }

      /** Неделя отчётных дат: Пн -> Вс; реальный переход недели происходит в Пн 16:00 МСК. */
      function weekStartMsForReport(ts) {
        var msk = mskDateFromReportTs(ts);
        var y = msk.getUTCFullYear();
        var m = msk.getUTCMonth();
        var d = msk.getUTCDate();
        var wd = msk.getUTCDay();
        var daysFromMonday = (wd + 6) % 7;
        var mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * REPORT_DAY_MS;
        return mondayStartMskMs - REPORT_MSK_SHIFT_MS;
      }

      function formatReportWeekBoundary(ms) {
        return new Intl.DateTimeFormat("ru-RU", {
          timeZone: "Europe/Moscow",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(ms));
      }

      function getCalculationWeekMeta() {
        var info = getShiftReportDateInfo();
        var baseTs = info && info.iso ? new Date(info.iso).getTime() : Date.now();
        if (baseTs !== baseTs) baseTs = Date.now();
        var start = weekStartMsForReport(baseTs);
        var end = start + REPORT_WEEK_MS - 1;
        return {
          start: start,
          end: end,
          label: formatReportWeekBoundary(start) + " – " + formatReportWeekBoundary(end),
        };
      }

      function getCalculationWeekMetaFromStart(start) {
        start = Number(start);
        if (!Number.isFinite(start)) return getCalculationWeekMeta();
        return {
          start: start,
          end: start + REPORT_WEEK_MS - 1,
          label: formatReportWeekBoundary(start) + " – " + formatReportWeekBoundary(start + REPORT_WEEK_MS - 1),
        };
      }

      function getCalculationArchiveMinWeekStart() {
        return weekStartMsForReport(Date.UTC(2026, 4, 13, 9, 0, 0));
      }

      function getCalculationDraftKey() {
        var week = getCalculationWeekMeta();
        return "poker_admin_report_calculations_draft:" + String(week.start || "current");
      }

      function getRakebackDraftKey() {
        return "poker_admin_report_rakeback_draft:shared";
      }

      function getLegacyRakebackDraftKey() {
        var info = getShiftReportDateInfo();
        return "poker_admin_report_rakeback_draft:" + String(info.date || "today");
      }

      function readRakebackDraftData() {
        if (rakebackModule) return { rows: [], deletedTemplates: [], deletedRows: [] };
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return { rows: [], deletedTemplates: [], deletedRows: [] };
        try {
          var raw = window.localStorage ? window.localStorage.getItem(getRakebackDraftKey()) : "";
          if (!raw && window.localStorage) raw = window.localStorage.getItem(getLegacyRakebackDraftKey());
          if (!raw) return { rows: [], deletedTemplates: [], deletedRows: [] };
          var parsed = JSON.parse(raw);
          var deletedTemplates = normalizeRakebackDeletedTemplates(parsed && parsed.deletedTemplates);
          var deletedRows = normalizeRakebackDeletedRows(parsed && parsed.deletedRows);
          var rows = parsed && Array.isArray(parsed.rows) ? dedupeRakebackTemplateRows(parsed.rows.filter(hasRakebackStoredEntryData)) : [];
          return {
            rows: dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows)),
            deletedTemplates: deletedTemplates,
            deletedRows: deletedRows,
            updatedAt: parsed && parsed.updatedAt ? String(parsed.updatedAt) : "",
          };
        } catch (e) {
          return { rows: [], deletedTemplates: [], deletedRows: [] };
        }
      }

      function readRakebackDraftRows() {
        return readRakebackDraftData().rows;
      }

      function readRakebackDeletedTemplates() {
        return readRakebackDraftData().deletedTemplates;
      }

      function readRakebackDeletedRows() {
        return readRakebackDraftData().deletedRows || [];
      }

      function clearStaleRakebackLocalDraftAfterTemplateReset() {
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return false;
        if (!canSyncSharedRakebackDraft()) return false;
        var data = readRakebackDraftData();
        var hasRows = !!(data.rows && data.rows.length);
        var hasDeletes = !!((data.deletedTemplates && data.deletedTemplates.length) || (data.deletedRows && data.deletedRows.length));
        if (hasRows || !hasDeletes) return false;
        var updatedAt = parseRakebackTimeValue(data.updatedAt);
        if (Number.isFinite(updatedAt) && updatedAt >= RAKEBACK_TEMPLATE_RESET_AT) return false;
        clearRakebackDraftRows();
        return true;
      }

      function getRakebackDeletedTemplateMap() {
        if (rakebackModule) return {};
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return {};
        var map = {};
        readRakebackDeletedTemplates().forEach(function (item) {
          var key = getRakebackTemplateKey(item.room, item.playerId);
          if (key) map[key] = true;
        });
        return map;
      }

      function getAdminReportApiBase() {
        return typeof getApiBase === "function" ? getApiBase() : "";
      }

      function buildAuthBody(payload) {
        return typeof pokerGuestOrAuthedPostBody === "function"
          ? pokerGuestOrAuthedPostBody(payload)
          : payload;
      }

      function saveLocalRakebackDraftRows(rows, deletedTemplates, updatedAt, deletedRows) {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        try {
          if (!window.localStorage) return;
          var normalizedDeleted = normalizeRakebackDeletedTemplates(deletedTemplates != null ? deletedTemplates : readRakebackDeletedTemplates());
          var normalizedDeletedRows = normalizeRakebackDeletedRows(deletedRows != null ? deletedRows : readRakebackDeletedRows());
          var filteredRows = dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows || [], normalizedDeleted, normalizedDeletedRows));
          var normalizedUpdatedAt = updatedAt ? String(updatedAt) : "";
          if ((filteredRows && filteredRows.length) || normalizedDeleted.length || normalizedDeletedRows.length) {
            window.localStorage.setItem(getRakebackDraftKey(), JSON.stringify({
              rows: filteredRows || [],
              deletedTemplates: normalizedDeleted,
              deletedRows: normalizedDeletedRows,
              updatedAt: normalizedUpdatedAt,
              savedAt: Date.now()
            }));
          } else {
            window.localStorage.removeItem(getRakebackDraftKey());
          }
        } catch (e) {}
      }

      function rememberDeletedRakebackTemplates(rows) {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        var current = readRakebackDeletedTemplates();
        var currentDeletedRows = readRakebackDeletedRows();
        var byKey = {};
        var deletedRowsByKey = {};
        current.forEach(function (item) {
          var key = getRakebackTemplateKey(item.room, item.playerId);
          if (key) byKey[key] = item;
        });
        currentDeletedRows.forEach(function (item) {
          var key = getRakebackDeletedStoredRowKey(item);
          if (key) deletedRowsByKey[key] = item;
        });
        Array.prototype.slice.call(rows || []).forEach(function (row) {
          var room = getRakebackRowRoom(row);
          var playerId = getRakebackRowPlayerId(row);
          var groupId = row.getAttribute("data-rakeback-group") || "";
          var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
          var reportId = row.getAttribute("data-rakeback-report-id") || "";
          var reportedAt = row.getAttribute("data-rakeback-reported-at") || "";
          var ownerId = row.getAttribute("data-rakeback-owner") || "";
          var deletedRowKey = getRakebackDeletedStoredRowKey({
            groupId: groupId,
            kind: kind,
            room: room,
            playerId: playerId,
            reportId: reportId,
            reportedAt: reportedAt,
          });
          if (deletedRowKey && !deletedRowsByKey[deletedRowKey]) {
            deletedRowsByKey[deletedRowKey] = {
              groupId: groupId,
              kind: kind,
              room: normalizeRakebackRoom(room),
              playerId: playerId,
              reportId: reportId,
              reportedAt: reportedAt,
              ownerId: ownerId,
              deletedAt: Date.now(),
              deletedBy: getCurrentRakebackOwnerId(),
            };
          }
          var key = getRakebackTemplateKey(room, playerId);
          if (!key || byKey[key]) return;
          byKey[key] = {
            room: normalizeRakebackRoom(room),
            playerId: playerId,
            deletedAt: Date.now(),
            deletedBy: getCurrentRakebackOwnerId(),
          };
        });
        rakebackLazyTemplateRows = rakebackLazyTemplateRows.filter(function (row) {
          var data = normalizeRakebackLazyTemplateData(row);
          var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
          return !key || !byKey[key];
        });
        rakebackDeferredRows = rakebackDeferredRows.filter(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          var templateKey = getRakebackTemplateKey(data.room, data.playerId);
          var storedKey = getRakebackDeletedStoredRowKey(data);
          if (storedKey && deletedRowsByKey[storedKey]) return false;
          return !templateKey || !byKey[templateKey];
        });
        saveLocalRakebackDraftRows(
          collectRakebackRows(false),
          Object.keys(byKey).map(function (key) { return byKey[key]; }),
          "",
          Object.keys(deletedRowsByKey).map(function (key) { return deletedRowsByKey[key]; })
        );
      }

      function saveRakebackDraftRowsNow(force) {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        if (editingReportId) return;
        if (!canEditRakebackDraftRows()) return;
        if (loadingRakebackDraft && !force) return;
        if (rakebackDraftSaveTimer) {
          clearTimeout(rakebackDraftSaveTimer);
          rakebackDraftSaveTimer = null;
        }
        if (rakebackDraftSaveIdle) {
          cancelAdminReportIdle(rakebackDraftSaveIdle);
          rakebackDraftSaveIdle = null;
        }
        rakebackDraftMutationSeq += 1;
        var rows = collectRakebackRows(false);
        var deletedTemplates = readRakebackDeletedTemplates();
        var deletedRows = readRakebackDeletedRows();
        saveLocalRakebackDraftRows(rows, deletedTemplates, "", deletedRows);
        var base = getAdminReportApiBase();
        if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
        savingRakebackDraft = true;
        var payload = buildAuthBody({
          action: "rakeback_draft_save",
          date: "shared",
          rakebackRows: rows,
          deletedTemplates: deletedTemplates,
          deletedRows: deletedRows,
          allowAccountedRakebackOverwrite: canManageAllRakebackRows(),
        });
        fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data && data.ok && data.rakebackDraft && Array.isArray(data.rakebackDraft.rows)) {
              rakebackDraftLocalEditUntil = 0;
              saveLocalRakebackDraftRows(data.rakebackDraft.rows, data.rakebackDraft.deletedTemplates || deletedTemplates, data.rakebackDraft.updatedAt, data.rakebackDraft.deletedRows || deletedRows);
            }
          })
          .catch(function () {
            showRakebackStatusBriefly("Не удалось сохранить черновик");
          })
          .then(function () {
            savingRakebackDraft = false;
          });
      }

      function saveRakebackDraftRows() {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        if (!canEditRakebackDraftRows()) return;
        rakebackDraftMutationSeq += 1;
        if (rakebackDraftSaveTimer) clearTimeout(rakebackDraftSaveTimer);
        if (rakebackDraftSaveIdle) {
          cancelAdminReportIdle(rakebackDraftSaveIdle);
          rakebackDraftSaveIdle = null;
        }
        var seq = rakebackDraftMutationSeq;
        rakebackDraftSaveTimer = setTimeout(function () {
          rakebackDraftSaveTimer = null;
          rakebackDraftSaveIdle = runAdminReportWhenIdle(function () {
            rakebackDraftSaveIdle = null;
            if (seq !== rakebackDraftMutationSeq) return;
            saveRakebackDraftRowsNow();
          }, 2000);
        }, 700);
      }

      function focusRakebackRow(row) {
        if (!row) return;
        var focusTarget = row.querySelector("[data-rakeback-player-id]:not([readonly]),[data-rakeback-rake]:not([readonly]),[data-rakeback-percent]:not([readonly])");
        setTimeout(function () {
          try {
            if (typeof row.scrollIntoView === "function") row.scrollIntoView({ block: "nearest", inline: "nearest" });
          } catch (eScroll) {}
          if (focusTarget && typeof focusTarget.focus === "function") {
            try {
              focusTarget.focus({ preventScroll: true });
            } catch (eFocus) {
              focusTarget.focus();
            }
          }
        }, 0);
      }

      function clearRakebackDraftRows() {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        try {
          if (window.localStorage) window.localStorage.removeItem(getRakebackDraftKey());
        } catch (e) {}
      }

      function loadSharedRakebackDraftRows(options) {
        options = options || {};
        if (rakebackModule) {
          rakebackModule.render();
          return;
        }
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          renderRakebackTemplateOnlyView();
          if (options.showStatus) showRakebackStatusBriefly("Показаны пустые шаблоны");
          return;
        }
        if (rakebackDraftLoadIdle) {
          cancelAdminReportIdle(rakebackDraftLoadIdle);
          rakebackDraftLoadIdle = null;
        }
        var focusedInRakeback = rakebackBody && document.activeElement && rakebackBody.contains(document.activeElement);
        var focusedInRakebackControl = focusedInRakeback && document.activeElement && document.activeElement.matches && document.activeElement.matches("input,select,textarea");
        if (!options.force && focusedInRakebackControl) return;
        if (!options.force && focusedInRakeback && Date.now() < rakebackDraftLocalEditUntil) return;
        if (rakebackDraftSaveTimer || savingRakebackDraft) return;
        var base = getAdminReportApiBase();
        if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          fillRakebackTable(readRakebackDraftRows(), "");
          if (options.showStatus) showRakebackStatusBriefly("Нет подключения для обновления");
          return;
        }
        if (options.showStatus) showRakebackStatus("Обновляю…");
        if (rakebackRefreshBtn) rakebackRefreshBtn.disabled = true;
        var localDraft = readRakebackDraftData();
        var visibleRowsBeforeRefresh = [];
        if (!(localDraft.rows || []).length && (rakebackBody && rakebackBody.querySelector("[data-rakeback-row]"))) {
          visibleRowsBeforeRefresh = collectRakebackRows(false);
        }
        var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
        q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared";
        var shouldUploadLocalDraft = false;
        var loadMutationSeq = rakebackDraftMutationSeq;
        var canEditDraft = canEditRakebackDraftRows();
        loadingRakebackDraft = true;
        fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (loadMutationSeq !== rakebackDraftMutationSeq) return;
            var serverDraft = data && data.ok && data.rakebackDraft ? data.rakebackDraft : null;
            var hasServerDraft = !!serverDraft && serverDraft.notModified !== true;
            var serverRows = hasServerDraft && Array.isArray(serverDraft.rows) ? serverDraft.rows : [];
            var serverHasDeletedTemplates = hasServerDraft && Array.isArray(serverDraft.deletedTemplates);
            var serverHasDeletedRows = hasServerDraft && Array.isArray(serverDraft.deletedRows);
            var serverDeletedTemplates = serverHasDeletedTemplates ? normalizeRakebackDeletedTemplates(serverDraft.deletedTemplates) : [];
            var serverDeletedRows = serverHasDeletedRows ? normalizeRakebackDeletedRows(serverDraft.deletedRows) : [];
            var localRows = localDraft.rows || [];
            if (!localRows.length && visibleRowsBeforeRefresh.length) localRows = visibleRowsBeforeRefresh;
            var deletedTemplates = serverHasDeletedTemplates ? serverDeletedTemplates : (localDraft.deletedTemplates || []);
            var deletedRows = serverHasDeletedRows ? serverDeletedRows : (localDraft.deletedRows || []);
            var serverUpdatedAt = parseRakebackTimeValue(serverDraft && serverDraft.updatedAt);
            var serverHistoryResetAt = parseRakebackTimeValue(serverDraft && serverDraft.historyResetAt);
            var localUpdatedAt = parseRakebackTimeValue(localDraft.updatedAt);
            var shouldMergeLocalRows = canEditDraft && !Number.isFinite(serverHistoryResetAt) && (
              !Number.isFinite(serverUpdatedAt) ||
              (Number.isFinite(localUpdatedAt) && localUpdatedAt > serverUpdatedAt)
            );
            var rows = hasServerDraft
              ? (shouldMergeLocalRows ? mergeRakebackDraftRows(serverRows, localRows) : serverRows)
              : (canEditDraft ? localRows : []);
            var rowsBeforeCleanup = rows.length;
            rows = dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows));
            shouldUploadLocalDraft = canEditDraft && (
              rows.length !== rowsBeforeCleanup ||
              (shouldMergeLocalRows && (!!localRows.length || !!(localDraft.deletedTemplates || []).length || !!(localDraft.deletedRows || []).length)) ||
              (!hasServerDraft && !serverRows.length && !serverDeletedTemplates.length && !serverDeletedRows.length && (!!localRows.length || !!(localDraft.deletedTemplates || []).length || !!(localDraft.deletedRows || []).length))
            );
            saveLocalRakebackDraftRows(rows, deletedTemplates, serverDraft && serverDraft.updatedAt, deletedRows);
            fillRakebackTable(rows, "");
            rakebackDraftLocalEditUntil = 0;
            if (options.showStatus) showRakebackStatusBriefly("Обновлено");
          })
          .catch(function () {
            if (loadMutationSeq !== rakebackDraftMutationSeq) return;
            fillRakebackTable(readRakebackDraftRows(), "");
            if (options.showStatus) showRakebackStatusBriefly("Не удалось обновить");
          })
          .then(function () {
            loadingRakebackDraft = false;
            if (rakebackRefreshBtn) rakebackRefreshBtn.disabled = false;
            if (shouldUploadLocalDraft) saveRakebackDraftRowsNow(true);
          });
      }

      function scheduleSharedRakebackDraftLoad(options) {
        if (rakebackModule) return;
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return;
        if (!canSyncSharedRakebackDraft()) return;
        if (rakebackDraftLoadIdle) cancelAdminReportIdle(rakebackDraftLoadIdle);
        runAdminReportAfterPaint(function () {
          rakebackDraftLoadIdle = runAdminReportWhenIdle(function () {
            rakebackDraftLoadIdle = null;
            loadSharedRakebackDraftRows(options || { showStatus: false });
          }, 1800);
        });
      }

      function renderRakebackTemplateOnlyView() {
        if (!rakebackBody) return 0;
        if (rakebackDraftSaveTimer) {
          clearTimeout(rakebackDraftSaveTimer);
          rakebackDraftSaveTimer = null;
        }
        if (rakebackDraftSaveIdle) {
          cancelAdminReportIdle(rakebackDraftSaveIdle);
          rakebackDraftSaveIdle = null;
        }
        if (rakebackDraftLoadIdle) {
          cancelAdminReportIdle(rakebackDraftLoadIdle);
          rakebackDraftLoadIdle = null;
        }
        if (rakebackActiveHydrateTimer) {
          clearTimeout(rakebackActiveHydrateTimer);
          rakebackActiveHydrateTimer = null;
        }
        if (rakebackSearchRefreshTimer) {
          clearTimeout(rakebackSearchRefreshTimer);
          rakebackSearchRefreshTimer = null;
        }
        loadingRakebackDraft = false;
        savingRakebackDraft = false;
        rakebackArchiveMode = false;
        activeRakebackRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        rakebackLazyTemplateRows = [];
        rakebackDeferredRows = [];
        rakebackSuspendedRows = [];
        rakebackSearchDetachedRows = [];
        removeRakebackGeneratedRows();
        var ids = getRakebackTemplateIdsForCurrentWeek(activeRakebackRoom, getRakebackTemplateIdsForRoom(activeRakebackRoom));
        var templateRowsOpen = readRakebackTemplateSpoilerOpen();
        var fragment = document.createDocumentFragment();
        if (ids.length) fragment.appendChild(createRakebackTemplateSeparator(templateRowsOpen));
        if (templateRowsOpen) {
          ids.forEach(function (playerId) {
            playerId = String(playerId || "").trim();
            if (!playerId) return;
            fragment.appendChild(createRakebackRow({
              kind: "base",
              room: activeRakebackRoom,
              playerId: playerId,
              carryForward: true,
              templateCarryForward: true,
              createdAt: getRakebackTemplateCreatedAt(activeRakebackRoom, playerId),
              editing: true,
            }));
          });
        }
        rakebackBody.replaceChildren(fragment);
        syncRakebackRoomVisibility();
        syncRakebackVisibleRowNumbers();
        syncRakebackAccessControls();
        updateRakebackSummaryTotals();
        return templateRowsOpen ? ids.length : 0;
      }

      function loadLocalRakebackDraftRows() {
        if (rakebackModule) return rakebackModule.render();
        if (RAKEBACK_TEMPLATE_ONLY_MODE) return renderRakebackTemplateOnlyView();
        clearStaleRakebackLocalDraftAfterTemplateReset();
        var rows = readRakebackDraftRows();
        fillRakebackTable(rows, "");
        return rows.length;
      }

      function clearInitialRakebackSeedRows() {
        if (!rakebackBody) return false;
        var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
        if (!rows.length) return false;
        var initialEmptyRows = rows.filter(function (row) {
          if (!row || row.getAttribute("data-rakeback-kind") === "addon") return false;
          if (row.getAttribute("data-rakeback-carry-forward") === "1" ||
            row.getAttribute("data-rakeback-saved") === "1" ||
            row.getAttribute("data-rakeback-accounted") === "1") return false;
          var idInput = row.querySelector("[data-rakeback-player-id]");
          var rakeInput = row.querySelector("[data-rakeback-rake]");
          var percentInput = row.querySelector("[data-rakeback-percent]");
          var discountInput = row.querySelector("[data-rakeback-discount15]");
          return !String(idInput && idInput.value ? idInput.value : "").trim() &&
            parseReportNumber(rakeInput ? rakeInput.value : "") === 0 &&
            parseReportNumber(percentInput ? percentInput.value : "") === 0 &&
            !(discountInput && discountInput.checked);
        });
        if (!initialEmptyRows.length) return false;
        if (initialEmptyRows.length === rows.length) rakebackBody.innerHTML = "";
        else initialEmptyRows.forEach(function (row) { row.remove(); });
        return true;
      }

      function hasRakebackTemplateRowsForActiveRoom() {
        var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
        var renderedHasTemplate = getRakebackAllDataRows().some(function (row) {
          return row && getRakebackRowRoom(row) === targetRoom && row.getAttribute("data-rakeback-carry-forward") === "1";
        });
        if (renderedHasTemplate) return true;
        return rakebackDeferredRows.some(function (row) {
          var data = normalizeRakebackStoredRowData(row);
          return data.room === targetRoom && data.carryForward === true && !isRakebackStoredRowArchived(data);
        });
      }

      function clearRakebackSeedRowsWhenTemplatesExist() {
        if (!hasRakebackTemplateRowsForActiveRoom()) return false;
        return clearInitialRakebackSeedRows();
      }

      function refreshLocalRakebackView() {
        if (rakebackModule) {
          rakebackModule.open();
          return;
        }
        if (RAKEBACK_TEMPLATE_ONLY_MODE) {
          renderRakebackTemplateOnlyView();
          return;
        }
        clearStaleRakebackLocalDraftAfterTemplateReset();
        clearInitialRakebackSeedRows();
        if (rakebackSuspendedRows.length) {
          syncRakebackTable({ skipSort: true });
          return;
        }
        if (rakebackBody && rakebackBody.querySelector("[data-rakeback-row]")) {
          syncRakebackTable({ skipSort: true });
          return;
        }
        loadLocalRakebackDraftRows();
      }

      function runAdminReportAfterPaint(fn) {
        if (typeof fn !== "function") return;
        var raf = typeof window !== "undefined" ? window["requestAnimationFrame"] : null;
        if (typeof raf === "function") {
          raf(function () {
            setTimeout(fn, 0);
          });
          return;
        }
        setTimeout(fn, 0);
      }

      function runAdminReportWhenIdle(fn, timeout) {
        if (typeof fn !== "function") return null;
        var ric = typeof window !== "undefined" ? window["requestIdleCallback"] : null;
        if (typeof ric === "function") {
          return { type: "idle", id: ric(fn, { timeout: timeout || 1500 }) };
        }
        return { type: "timeout", id: setTimeout(fn, 0) };
      }

      function cancelAdminReportIdle(handle) {
        if (!handle) return;
        var cancelIdle = typeof window !== "undefined" ? window["cancelIdleCallback"] : null;
        if (handle.type === "idle" && typeof cancelIdle === "function") {
          cancelIdle(handle.id);
        } else {
          clearTimeout(handle.id);
        }
      }

      function setActiveTab(name) {
        if (tabsModule) {
          tabsModule.setActive(name);
          return;
        }
        if (!tabs || !panels) return;
        if (name === "sent" && !canViewSentReports()) name = "form";
        if (name === "calculations" && !canViewCalculationsReports()) name = "form";
        if (name !== "rakeback" && !rakebackModule) suspendRakebackDomRows();
        tabs.forEach(function (tab) {
          var isActive = tab.getAttribute("data-admin-report-tab") === name;
          tab.classList.toggle("admin-report-tab--active", isActive);
        });
        panels.forEach(function (panel) {
          var isActive = panel.getAttribute("data-admin-report-panel") === name;
          panel.classList.toggle("admin-report-panel--active", isActive);
        });
      }


      return {
        parseReportNumber: parseReportNumber,
        formatReportNumber: formatReportNumber,
        formatReportInputNumber: formatReportInputNumber,
        formatRakebackCellNumber: formatRakebackCellNumber,
        formatRakebackAmountCell: formatRakebackAmountCell,
        formatReportRubleNumber: formatReportRubleNumber,
        getRakebackRoomLabel: getRakebackRoomLabel,
        getRakebackRoomMultiplier: getRakebackRoomMultiplier,
        getRakebackReportAmount: getRakebackReportAmount,
        getRakebackReportRake: getRakebackReportRake,
        getRakebackRowRawRake: getRakebackRowRawRake,
        getRakebackRowFullReportRake: getRakebackRowFullReportRake,
        addRakebackLatestGroupRake: addRakebackLatestGroupRake,
        sumRakebackLatestGroupRake: sumRakebackLatestGroupRake,
        addCollectedLatestGroupRake: addCollectedLatestGroupRake,
        getCollectedRowFullReportRake: getCollectedRowFullReportRake,
        sumCollectedLatestGroupRake: sumCollectedLatestGroupRake,
        formatRakebackRoomTotal: formatRakebackRoomTotal,
        formatRakebackSummaryPair: formatRakebackSummaryPair,
        copyReportText: copyReportText,
        nextRakebackGroupId: nextRakebackGroupId,
        getCurrentRakebackOwnerId: getCurrentRakebackOwnerId,
        getRakebackRoomOptions: getRakebackRoomOptions,
        getRakebackTotalsByDate: getRakebackTotalsByDate,
        renderRakebackTotalsModal: renderRakebackTotalsModal,
        openRakebackTotalsModal: openRakebackTotalsModal,
        closeRakebackTotalsModal: closeRakebackTotalsModal,
        normalizeRakebackRowColor: normalizeRakebackRowColor,
        getRakebackRowColorButtons: getRakebackRowColorButtons,
        closeRakebackColorMenus: closeRakebackColorMenus,
        markRakebackCell: markRakebackCell,
        applyRakebackRowColor: applyRakebackRowColor,
        normalizeRakebackRoom: normalizeRakebackRoom,
        parseRakebackTimeValue: parseRakebackTimeValue,
        getFirstRakebackTimeValue: getFirstRakebackTimeValue,
        getRakebackTemplateIdsForRoom: getRakebackTemplateIdsForRoom,
        getRakebackTemplateCreatedAt: getRakebackTemplateCreatedAt,
        isRakebackTemplateEntryStamp: isRakebackTemplateEntryStamp,
        getRakebackTemplateKey: getRakebackTemplateKey,
        isRakebackTemplateId: isRakebackTemplateId,
        normalizeRakebackDeletedTemplates: normalizeRakebackDeletedTemplates,
        isRakebackTemplateLikeData: isRakebackTemplateLikeData,
        isRakebackLazyTemplateData: isRakebackLazyTemplateData,
        normalizeRakebackLazyTemplateData: normalizeRakebackLazyTemplateData,
        rememberRakebackLazyTemplateRows: rememberRakebackLazyTemplateRows,
        hasRakebackStoredEntryData: hasRakebackStoredEntryData,
        getRakebackStoredRowMergeKey: getRakebackStoredRowMergeKey,
        getRakebackDeletedRowKey: getRakebackDeletedRowKey,
        getRakebackDeletedStoredRowKey: getRakebackDeletedStoredRowKey,
        normalizeRakebackDeletedRows: normalizeRakebackDeletedRows,
        isDeletedRakebackTemplateRow: isDeletedRakebackTemplateRow,
        filterDeletedRakebackStoredRows: filterDeletedRakebackStoredRows,
        isRakebackEmptyTemplateDuplicateRow: isRakebackEmptyTemplateDuplicateRow,
        dedupeRakebackTemplateRows: dedupeRakebackTemplateRows,
        mergeRakebackDraftRows: mergeRakebackDraftRows,
        createRakebackRow: createRakebackRow,
        normalizeRakebackStoredRowData: normalizeRakebackStoredRowData,
        isRakebackStoredCarryForwardPlaceholder: isRakebackStoredCarryForwardPlaceholder,
        getRakebackStoredRowEntryStamp: getRakebackStoredRowEntryStamp,
        isRakebackStoredRowArchived: isRakebackStoredRowArchived,
        getRakebackRowRoom: getRakebackRowRoom,
        syncRakebackRowLookupAttrs: syncRakebackRowLookupAttrs,
        getRakebackRowRoomFast: getRakebackRowRoomFast,
        getRakebackRowPlayerIdFast: getRakebackRowPlayerIdFast,
        getRakebackSearchQuery: getRakebackSearchQuery,
        getRakebackRowPlayerId: getRakebackRowPlayerId,
        getRakebackSortMode: getRakebackSortMode,
        normalizeRakebackSortMode: normalizeRakebackSortMode,
        getRakebackSortStorageKey: getRakebackSortStorageKey,
        readSavedRakebackSortMode: readSavedRakebackSortMode,
        saveRakebackSortMode: saveRakebackSortMode,
        setRakebackSortMode: setRakebackSortMode,
        applySavedRakebackSortMode: applySavedRakebackSortMode,
        getRakebackRowCreatedAt: getRakebackRowCreatedAt,
        getRakebackRowStandardAt: getRakebackRowStandardAt,
        getRakebackTopStandardAt: getRakebackTopStandardAt,
        getRakebackRowEntryAddedAtForSave: getRakebackRowEntryAddedAtForSave,
        hasRakebackRowEntryTimeData: hasRakebackRowEntryTimeData,
        getRakebackRowBoundEntryAddedAt: getRakebackRowBoundEntryAddedAt,
        setRakebackGroupEntryAddedAt: setRakebackGroupEntryAddedAt,
        replaceRakebackGroupEntryAddedAt: replaceRakebackGroupEntryAddedAt,
        ensureRakebackEntryAddedAt: ensureRakebackEntryAddedAt,
        getRakebackRowEntryAddedAt: getRakebackRowEntryAddedAt,
        syncExplicitZeroRakeMarker: syncExplicitZeroRakeMarker,
        getRakebackGroupKeyRow: getRakebackGroupKeyRow,
        getRakebackGroupEntryAddedAt: getRakebackGroupEntryAddedAt,
        getRakebackWeekStart: getRakebackWeekStart,
        getCurrentRakebackWeekStart: getCurrentRakebackWeekStart,
        formatRakebackWeekRange: formatRakebackWeekRange,
        isRakebackEntryArchivedByStamp: isRakebackEntryArchivedByStamp,
        isRakebackRowInArchive: isRakebackRowInArchive,
        isRakebackGroupInArchive: isRakebackGroupInArchive,
        isRakebackCollectedRowArchived: isRakebackCollectedRowArchived,
        getRakebackMoscowDayKey: getRakebackMoscowDayKey,
        getRakebackDateSeparatorLabel: getRakebackDateSeparatorLabel,
        removeRakebackDateSeparators: removeRakebackDateSeparators,
        getRakebackDateGroupTotals: getRakebackDateGroupTotals,
        getRakebackDateRowsTotals: getRakebackDateRowsTotals,
        getRakebackWeekGroupTotals: getRakebackWeekGroupTotals,
        getRakebackWeekRoomTotals: getRakebackWeekRoomTotals,
        createRakebackDateSeparator: createRakebackDateSeparator,
        createRakebackTemplateSeparator: createRakebackTemplateSeparator,
        isRakebackCarryForwardPlaceholderRow: isRakebackCarryForwardPlaceholderRow,
        shouldCopyRakebackIdInput: shouldCopyRakebackIdInput,
        copyRakebackIdInput: copyRakebackIdInput,
        isRakebackCarryForwardPlaceholderGroup: isRakebackCarryForwardPlaceholderGroup,
        isRakebackTodayPlaceholderGroup: isRakebackTodayPlaceholderGroup,
        getRakebackLazyTemplateDomData: getRakebackLazyTemplateDomData,
        dehydrateRakebackLazyTemplateRows: dehydrateRakebackLazyTemplateRows,
        hydrateRakebackLazyTemplateRowsForSearch: hydrateRakebackLazyTemplateRowsForSearch,
        ensureRakebackSearchTemplateRows: ensureRakebackSearchTemplateRows,
        createRakebackWeekSeparator: createRakebackWeekSeparator,
        createRakebackWeekRoomTabs: createRakebackWeekRoomTabs,
        createRakebackWeekTotalRow: createRakebackWeekTotalRow,
        insertRakebackDateSeparators: insertRakebackDateSeparators,
        getRakebackRowSortColor: getRakebackRowSortColor,
        sortRakebackRows: sortRakebackRows,
        getRakebackDomRows: getRakebackDomRows,
        pushUniqueRakebackRow: pushUniqueRakebackRow,
        ensureRakebackSearchOrder: ensureRakebackSearchOrder,
        getRakebackAllDataRows: getRakebackAllDataRows,
        getRakebackGroupsFromRows: getRakebackGroupsFromRows,
        restoreRakebackSearchDetachedRows: restoreRakebackSearchDetachedRows,
        ensureRakebackVisibleAddonBaseRows: ensureRakebackVisibleAddonBaseRows,
        suspendRakebackDomRows: suspendRakebackDomRows,
        restoreRakebackSuspendedRows: restoreRakebackSuspendedRows,
        storeRakebackSuspendedRows: storeRakebackSuspendedRows,
        mergeRakebackStoredRows: mergeRakebackStoredRows,
        deferRakebackRenderedRows: deferRakebackRenderedRows,
        hasDeferredRowsForActiveRoom: hasDeferredRowsForActiveRoom,
        renderRakebackDeferredRowsForActiveRoom: renderRakebackDeferredRowsForActiveRoom,
        scheduleRakebackActiveRoomHydration: scheduleRakebackActiveRoomHydration,
        hydrateRakebackDeferredRowsForSearch: hydrateRakebackDeferredRowsForSearch,
        getRakebackGroupRows: getRakebackGroupRows,
        getRakebackVisibleGroups: getRakebackVisibleGroups,
        syncRakebackStandardOrder: syncRakebackStandardOrder,
        moveRakebackGroupBefore: moveRakebackGroupBefore,
        beginRakebackRowDrag: beginRakebackRowDrag,
        finishRakebackRowDrag: finishRakebackRowDrag,
        updateRakebackRowDrag: updateRakebackRowDrag,
        cancelPendingRakebackDrag: cancelPendingRakebackDrag,
        shouldStartRakebackDragFrom: shouldStartRakebackDragFrom,
        setRakebackRoomTab: setRakebackRoomTab,
        setRakebackArchiveMode: setRakebackArchiveMode,
        syncRakebackRoomVisibility: syncRakebackRoomVisibility,
        syncRakebackVisibleRowNumbers: syncRakebackVisibleRowNumbers,
        scheduleRakebackTableSync: scheduleRakebackTableSync,
        removeRakebackGeneratedRows: removeRakebackGeneratedRows,
        renderRakebackSummaryFromCache: renderRakebackSummaryFromCache,
        refreshRakebackVisibleView: refreshRakebackVisibleView,
        scheduleRakebackDecorations: scheduleRakebackDecorations,
        refreshRakebackFilterView: refreshRakebackFilterView,
        applyRakebackSearchRefresh: applyRakebackSearchRefresh,
        scheduleRakebackSearchRefresh: scheduleRakebackSearchRefresh,
        showRakebackStatus: showRakebackStatus,
        showRakebackStatusBriefly: showRakebackStatusBriefly,
        markRakebackDraftLocalEdit: markRakebackDraftLocalEdit,
        showRakebackAlert: showRakebackAlert,
        setRakebackRowSaved: setRakebackRowSaved,
        getRakebackTemplateIdsFromPreviousWeek: getRakebackTemplateIdsFromPreviousWeek,
        getRakebackTemplateDefaultsFromPreviousWeek: getRakebackTemplateDefaultsFromPreviousWeek,
        getRakebackTemplateIdsForCurrentWeek: getRakebackTemplateIdsForCurrentWeek,
        ensureRakebackTemplateRows: ensureRakebackTemplateRows,
        ensureRakebackBaseRow: ensureRakebackBaseRow,
        isRakebackRowFilled: isRakebackRowFilled,
        hasRakebackRakeValue: hasRakebackRakeValue,
        canAddRakebackAddon: canAddRakebackAddon,
        updateRakebackRowActions: updateRakebackRowActions,
        getRakebackPreviousRake: getRakebackPreviousRake,
        getRakebackRowCalculationBase: getRakebackRowCalculationBase,
        getRakebackRowAmount: getRakebackRowAmount,
        syncRakebackRowGroupDisplay: syncRakebackRowGroupDisplay,
        isCurrentRakebackOwner: isCurrentRakebackOwner,
        isCurrentRakebackReportOwner: isCurrentRakebackReportOwner,
        isRakebackRowAccounted: isRakebackRowAccounted,
        getRakebackRowReportedAmount: getRakebackRowReportedAmount,
        canEditRakebackRow: canEditRakebackRow,
        canRemoveRakebackRow: canRemoveRakebackRow,
        collectRakebackDomRowsFromNodes: collectRakebackDomRowsFromNodes,
        collectRakebackDeferredRows: collectRakebackDeferredRows,
        collectRakebackRows: collectRakebackRows,
        sumRakebackReportRows: sumRakebackReportRows,
        updateRakebackSummaryTotals: updateRakebackSummaryTotals,
        scheduleRakebackSummaryTotals: scheduleRakebackSummaryTotals,
        getReportStoredRakebackTotal: getReportStoredRakebackTotal,
        hasRakebackReportValue: hasRakebackReportValue,
        getUnaccountedRakebackReportRows: getUnaccountedRakebackReportRows,
        markUnaccountedRakebackRowsAccounted: markUnaccountedRakebackRowsAccounted,
        ensureRakebackTemplateRowsFromReportedRows: ensureRakebackTemplateRowsFromReportedRows,
        syncRakebackTable: syncRakebackTable,
        fillRakebackTable: fillRakebackTable,
        addRakebackBaseRow: addRakebackBaseRow,
        addRakebackAddonRow: addRakebackAddonRow,
        mergeReportExtrasIntoMap: mergeReportExtrasIntoMap,
        mergeRakebackRowsIntoMap: mergeRakebackRowsIntoMap,
        moscowPartsFromTs: moscowPartsFromTs,
        reportBusinessTimestampMs: reportBusinessTimestampMs,
        reportEffectiveTimestampMs: reportEffectiveTimestampMs,
        formatRuWeekdayDateFromTs: formatRuWeekdayDateFromTs,
        getShiftReportDateInfo: getShiftReportDateInfo,
        getAdminReportAppVersionLabel: getAdminReportAppVersionLabel,
        formatAdminReportDateLabel: formatAdminReportDateLabel,
        mskDateFromReportTs: mskDateFromReportTs,
        weekStartMsForReport: weekStartMsForReport,
        formatReportWeekBoundary: formatReportWeekBoundary,
        getCalculationWeekMeta: getCalculationWeekMeta,
        getCalculationWeekMetaFromStart: getCalculationWeekMetaFromStart,
        getCalculationArchiveMinWeekStart: getCalculationArchiveMinWeekStart,
        getCalculationDraftKey: getCalculationDraftKey,
        getRakebackDraftKey: getRakebackDraftKey,
        getLegacyRakebackDraftKey: getLegacyRakebackDraftKey,
        readRakebackDraftData: readRakebackDraftData,
        readRakebackDraftRows: readRakebackDraftRows,
        readRakebackDeletedTemplates: readRakebackDeletedTemplates,
        readRakebackDeletedRows: readRakebackDeletedRows,
        clearStaleRakebackLocalDraftAfterTemplateReset: clearStaleRakebackLocalDraftAfterTemplateReset,
        getRakebackDeletedTemplateMap: getRakebackDeletedTemplateMap,
        getAdminReportApiBase: getAdminReportApiBase,
        buildAuthBody: buildAuthBody,
        saveLocalRakebackDraftRows: saveLocalRakebackDraftRows,
        rememberDeletedRakebackTemplates: rememberDeletedRakebackTemplates,
        saveRakebackDraftRowsNow: saveRakebackDraftRowsNow,
        saveRakebackDraftRows: saveRakebackDraftRows,
        focusRakebackRow: focusRakebackRow,
        clearRakebackDraftRows: clearRakebackDraftRows,
        loadSharedRakebackDraftRows: loadSharedRakebackDraftRows,
        scheduleSharedRakebackDraftLoad: scheduleSharedRakebackDraftLoad,
        renderRakebackTemplateOnlyView: renderRakebackTemplateOnlyView,
        loadLocalRakebackDraftRows: loadLocalRakebackDraftRows,
        clearInitialRakebackSeedRows: clearInitialRakebackSeedRows,
        hasRakebackTemplateRowsForActiveRoom: hasRakebackTemplateRowsForActiveRoom,
        clearRakebackSeedRowsWhenTemplatesExist: clearRakebackSeedRowsWhenTemplatesExist,
        refreshLocalRakebackView: refreshLocalRakebackView,
        runAdminReportAfterPaint: runAdminReportAfterPaint,
        runAdminReportWhenIdle: runAdminReportWhenIdle,
        cancelAdminReportIdle: cancelAdminReportIdle,
        setActiveTab: setActiveTab
      };
    }
  }

  window.AdminReportLegacy = {
    init: init
  };
})();
