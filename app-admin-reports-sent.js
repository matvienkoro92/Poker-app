(function () {
  "use strict";

  function call(fn) {
    if (typeof fn !== "function") return undefined;
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  }

  function init(config) {
    config = config || {};
    var callbacks = config.callbacks || {};
    var helpers = config.helpers || {};
    var sentList = config.list || document.getElementById("adminReportSentList");
    var sentReportsLoadedAt = 0;
    var sentReportsLoading = false;
    var SENT_REPORTS_CACHE_TTL_MS = config.cacheTtlMs || 5 * 60 * 1000;
    var SENT_REPORTS_HTML_CACHE_KEY = "poker:adminReportSent:currentWeekHtml:v4";
    var SENT_REPORTS_HTML_CACHE_TTL_MS = 20 * 60 * 1000;
    var POKER_NET_ERR = config.netErrorMessage || "Ошибка сети";
    var SENT_REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
    var SENT_REPORT_DAY_CUTOFF_MS = 16 * 60 * 60 * 1000;
    var escapeReportHtml = helpers.escapeReportHtml || function (value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    };
    function fallbackReportBusinessTimestampMs(value) {
      var raw = value != null ? Number(value) : Date.now();
      if (!Number.isFinite(raw)) raw = Date.now();
      var shifted = new Date(raw - SENT_REPORT_DAY_CUTOFF_MS + SENT_REPORT_MSK_SHIFT_MS);
      return Date.UTC(
        shifted.getUTCFullYear(),
        shifted.getUTCMonth(),
        shifted.getUTCDate(),
        12,
        0,
        0,
        0
      ) - SENT_REPORT_MSK_SHIFT_MS;
    }
    var reportBusinessTimestampMs = helpers.reportBusinessTimestampMs || function (value) {
      return fallbackReportBusinessTimestampMs(value);
    };
    var reportEffectiveTimestampMs = helpers.reportEffectiveTimestampMs || function (report) {
      var raw = report && report.createdAt ? Date.parse(report.createdAt) : 0;
      return Number.isFinite(raw) && raw > 0 ? reportBusinessTimestampMs(raw) : fallbackReportBusinessTimestampMs(Date.now());
    };
    var formatRuWeekdayDateFromTs = helpers.formatRuWeekdayDateFromTs || function (ts) {
      var d = new Date(ts || Date.now());
      return {
        weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "long", timeZone: "Europe/Moscow" }).format(d).replace(/^./, function (c) { return c.toUpperCase(); }),
        date: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "Europe/Moscow" }).format(d),
      };
    };
    var formatReportRubleNumber = helpers.formatReportRubleNumber || function (value) {
      var n = typeof value === "number" ? value : parseFloat(String(value != null ? value : "").replace(",", "."));
      if (!Number.isFinite(n)) n = 0;
      return Math.round(n).toLocaleString("ru-RU") + " ₽";
    };
    var getReportStoredRakebackTotal = helpers.getReportStoredRakebackTotal || function (report) {
      var v = report && report.rakeback != null ? report.rakeback : 0;
      var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
      return Number.isFinite(n) ? n : 0;
    };
    function parseReportNumber(value) {
      var n = typeof value === "number" ? value : parseFloat(String(value != null ? value : "").replace(",", "."));
      return Number.isFinite(n) ? n : 0;
    }
    function capitalizeWord(value) {
      var text = String(value || "").trim();
      return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
    }
    function parseStoredReportDateMs(report) {
      var raw = String(report && report.date || "").trim();
      if (!raw) return NaN;
      var match = raw.match(/^(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{2,4}))?$/);
      if (!match) return NaN;
      var day = Number(match[1]);
      var month = Number(match[2]);
      var year = match[3] ? Number(match[3]) : NaN;
      if (!Number.isFinite(year)) {
        var created = report && report.createdAt ? new Date(report.createdAt).getTime() : NaN;
        year = Number.isFinite(created)
          ? Number(new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", year: "numeric" }).format(new Date(created)))
          : new Date().getFullYear();
      }
      if (year < 100) year += 2000;
      if (!day || !month || month < 1 || month > 12) return NaN;
      return Date.UTC(year, month - 1, day, 12, 0, 0, 0) - SENT_REPORT_MSK_SHIFT_MS;
    }
    function getReportDayMeta(report) {
      var storedTs = parseStoredReportDateMs(report);
      if (Number.isFinite(storedTs)) {
        var storedDate = String(report && report.date || "").trim();
        var storedWeekday = capitalizeWord(report && report.weekday);
        var formatted = formatRuWeekdayDateFromTs(storedTs);
        return {
          timestamp: storedTs,
          weekday: storedWeekday || formatted.weekday || "",
          date: storedDate || formatted.date || "",
        };
      }
      var eff = reportEffectiveTimestampMs(report);
      var meta = formatRuWeekdayDateFromTs(eff);
      return {
        timestamp: eff,
        weekday: meta.weekday || "",
        date: meta.date || String(report && report.date || "").trim(),
      };
    }
    function getReportDayTimestamp(report) {
      return getReportDayMeta(report).timestamp;
    }
    function normalizeReportDetailName(name) {
      return String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
    }
    function isReportManualRakebackFieldName(name) {
      return normalizeReportDetailName(name) === "рейкбек";
    }
    function isReportAnyaSalaryFieldName(name) {
      var normalized = normalizeReportDetailName(name);
      return normalized === "аня зп" || normalized === "аня зарплата";
    }
    function getReportExtraEntries(report) {
      var entries = [];
      if (Array.isArray(report && report.extraFields)) {
        report.extraFields.forEach(function (field) {
          if (!field || !(field.name || field.amount != null && field.amount !== "")) return;
          entries.push({ name: field.name || "Доп", value: field.amount != null ? field.amount : "" });
        });
      } else if (report && (report.extraName || report.extraAmount != null)) {
        entries.push({ name: report.extraName || "Доп", value: report.extraAmount != null ? report.extraAmount : "" });
      }
      return entries;
    }
    function getReportAnyaSalaryTotal(report) {
      return getReportExtraEntries(report).reduce(function (sum, extra) {
        return isReportAnyaSalaryFieldName(extra.name) ? sum + parseReportNumber(extra.value) : sum;
      }, 0);
    }
    var buildReportDetailHtml = helpers.buildReportDetailHtml || function (report) {
      report = report || {};
      var labels = { deposit: "Депозит", cashout: "Выводы", prodamus: "Продамус", robokassa: "Робокасса", romaCrypto: "Рома крипта", botCryptoDep: "Боткрипта", botExchipDep: "Ботэксчип деп", botExchipCashout: "Ботэксчип вывод", bonuses: "Бонусы", transfers: "Переводы", ret: "Возврат", sergeyMarina: "Сергей/Марина", rakeback: "Рейкбек" };
      var depositChildren = ["cashout", "prodamus", "robokassa", "romaCrypto", "botCryptoDep", "botExchipDep", "sergeyMarina"];
      var parts = [];
      function hasReportValue(value) {
        return value != null && value !== "" && (typeof value !== "number" || value !== 0);
      }
      function buildDetailBlock(className, entries) {
        if (!entries.length) return "";
        return '<div class="admin-report-sent-detail__field-block ' + className + '">' + entries.map(function (entry) {
          return '<div class="admin-report-sent-detail__field-block-row">' +
            '<span class="admin-report-sent-detail__label">' + escapeReportHtml(entry.label) + "</span>" +
            '<span class="admin-report-sent-detail__value">' + escapeReportHtml(entry.value) + "</span>" +
          "</div>";
        }).join("") + "</div>";
      }
      var childParts = [];
      var childTotal = 0;
      depositChildren.forEach(function (key) {
        if (!hasReportValue(report[key])) return;
        childTotal += parseReportNumber(report[key]);
        childParts.push(
          '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--' + escapeReportHtml(key) + '">' +
            '<span class="admin-report-sent-detail__deposit-child-label">' + escapeReportHtml(labels[key]) + "</span>" +
            '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(report[key]) + "</span>" +
          "</div>"
        );
      });
      var anyaSalaryTotal = getReportAnyaSalaryTotal(report);
      if (anyaSalaryTotal !== 0) {
        childTotal += anyaSalaryTotal;
        childParts.push(
          '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--anya-salary">' +
            '<span class="admin-report-sent-detail__deposit-child-label">Аня ЗП</span>' +
            '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(anyaSalaryTotal)) + "</span>" +
          "</div>"
        );
      }
      if (childParts.length) {
        var depositValue = hasReportValue(report.deposit) ? parseReportNumber(report.deposit) : 0;
        childParts.push(
          '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--summary">' +
            '<span class="admin-report-sent-detail__deposit-child-label">Итого</span>' +
            '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(childTotal)) + "</span>" +
          "</div>" +
          '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--summary">' +
            '<span class="admin-report-sent-detail__deposit-child-label">Разница с депозитом</span>' +
            '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(depositValue - childTotal)) + "</span>" +
          "</div>"
        );
      }
      if (hasReportValue(report.deposit) || childParts.length) {
        parts.push(
          '<div class="admin-report-sent-detail__deposit-group">' +
            '<div class="admin-report-sent-detail__deposit-main">' +
              '<span class="admin-report-sent-detail__label">Депозит</span>' +
              '<span class="admin-report-sent-detail__value">' + escapeReportHtml(hasReportValue(report.deposit) ? report.deposit : 0) + "</span>" +
            "</div>" +
            (childParts.length ? '<div class="admin-report-sent-detail__deposit-subcolumn">' + childParts.join("") + "</div>" : "") +
          "</div>"
        );
      }
      var expenseEntries = [];
      var otherEntries = [];
      var calcEntries = [];
      var anyaEntries = [];
      function pushEntry(list, label, value, roundValue) {
        if (!hasReportValue(value)) return;
        list.push({ label: label, value: roundValue ? formatReportRubleNumber(value) : String(value) });
      }
      if (hasReportValue(report.botExchipDep) || hasReportValue(report.botExchipCashout)) {
        var exchipDep = parseReportNumber(report.botExchipDep);
        var exchipCashout = parseReportNumber(report.botExchipCashout);
        calcEntries.push({
          label: "Итого Эксчип",
          value: formatReportRubleNumber(exchipDep) + " - " + formatReportRubleNumber(exchipCashout) + " = " + formatReportRubleNumber(exchipDep - exchipCashout),
        });
      }
      pushEntry(expenseEntries, labels.bonuses, report.bonuses, false);
      pushEntry(expenseEntries, labels.rakeback, getReportStoredRakebackTotal(report), true);
      pushEntry(otherEntries, labels.botExchipCashout, report.botExchipCashout, false);
      pushEntry(otherEntries, labels.transfers, report.transfers, false);
      pushEntry(otherEntries, labels.ret, report.ret, false);
      getReportExtraEntries(report).forEach(function (extra) {
        if (isReportManualRakebackFieldName(extra.name)) return;
        var entry = { label: extra.name, value: String(extra.value) };
        if (isReportAnyaSalaryFieldName(extra.name)) anyaEntries.push(entry);
        else otherEntries.push(entry);
      });
      parts.push(buildDetailBlock("admin-report-sent-detail__field-block--calc", calcEntries));
      parts.push(buildDetailBlock("admin-report-sent-detail__field-block--danger", expenseEntries.concat(anyaEntries)));
      parts.push(buildDetailBlock("admin-report-sent-detail__field-block--other", otherEntries));
      return parts.join("");
    };
    var mergeReportExtrasIntoMap = helpers.mergeReportExtrasIntoMap || function (map, report) {
      if (!map || !report || !Array.isArray(report.extraFields)) return map;
      report.extraFields.forEach(function (field) {
        if (!field || !field.name) return;
        var n = typeof field.amount === "number" ? field.amount : parseFloat(String(field.amount || "").replace(",", "."));
        if (Number.isFinite(n)) map[field.name] = (map[field.name] || 0) + n;
      });
      return map;
    };

    function canViewSentReports() {
      return call(callbacks.canView) !== false;
    }

    function appendQueryParam(url, name, value) {
      var sep = String(url || "").indexOf("?") === -1 ? "?" : "&";
      return String(url || "") + sep + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    }

    function readSentReportsHtmlCache() {
      try {
        if (!window.localStorage) return null;
        var raw = window.localStorage.getItem(SENT_REPORTS_HTML_CACHE_KEY);
        if (!raw) return null;
        var cached = JSON.parse(raw);
        if (!cached || !cached.html || !cached.savedAt) return null;
        if (Date.now() - Number(cached.savedAt) > SENT_REPORTS_HTML_CACHE_TTL_MS) return null;
        return cached;
      } catch (e) {
        return null;
      }
    }

    function writeSentReportsHtmlCache(html) {
      try {
        if (!window.localStorage || !html) return;
        window.localStorage.setItem(SENT_REPORTS_HTML_CACHE_KEY, JSON.stringify({
          savedAt: Date.now(),
          html: String(html),
        }));
      } catch (e) {}
    }

    function clearSentReportsHtmlCache() {
      try {
        if (window.localStorage) window.localStorage.removeItem(SENT_REPORTS_HTML_CACHE_KEY);
      } catch (e) {}
    }

    function bindCachedSentReportToggles(scope) {
      scope = scope || sentList;
      if (!scope) return;
      scope.querySelectorAll(".admin-report-sent-item__head").forEach(function (head) {
        if (head.getAttribute("data-admin-report-cache-bound") === "1") return;
        head.setAttribute("data-admin-report-cache-bound", "1");
        head.addEventListener("click", function (e) {
          if (e.target.closest(".admin-report-sent-edit-btn") || e.target.closest(".admin-report-sent-delete-btn") || e.target.closest(".admin-report-week-copy-btn")) return;
          var item = head.closest(".admin-report-sent-item");
          if (!item) return;
          var detail = item.querySelector(".admin-report-sent-detail");
          var toggle = head.querySelector(".admin-report-sent-item__toggle");
          if (!detail) return;
          var isOpen = !detail.hidden;
          detail.hidden = isOpen;
          head.setAttribute("aria-expanded", !isOpen);
          if (toggle) toggle.textContent = isOpen ? "▼" : "▲";
        });
      });
    }

    function renderSentReportsHtmlCache() {
      if (!sentList) return false;
      var cached = readSentReportsHtmlCache();
      if (!cached || !cached.html) return false;
      sentList.innerHTML = cached.html;
      bindCachedSentReportToggles(sentList);
      return true;
    }

    function hasRenderedSentReportsContent() {
      if (!sentList || !String(sentList.innerHTML || "").trim()) return false;
      var text = String(sentList.textContent || "").trim();
      if (!text) return false;
      return !/Обновляю текущую неделю|Дни появятся сразу после ответа сервера|Ошибка загрузки|Не удалось загрузить/i.test(text);
    }

    function buildSentReportsLoadingShellHtml() {
      return (
        '<div class="admin-report-sent-current admin-report-sent-current--loading">' +
          '<details class="admin-report-sent-week" open>' +
            '<summary class="admin-report-sent-archive__summary">Текущая неделя</summary>' +
            '<div class="admin-report-sent-week__inner">' +
              '<details class="admin-report-sent-week-subspoiler" open>' +
                '<summary class="admin-report-sent-day-title">Итого по неделе</summary>' +
                '<div class="admin-report-sent-week-subspoiler__inner">' +
                  '<p class="admin-report-sent-period-hint">Обновляю текущую неделю…</p>' +
                "</div>" +
              "</details>" +
              '<details class="admin-report-sent-week-subspoiler">' +
                '<summary class="admin-report-sent-day-title">По дням</summary>' +
                '<div class="admin-report-sent-week-subspoiler__inner">' +
                  '<p class="admin-report-sent-period-hint">Дни появятся сразу после ответа сервера.</p>' +
                "</div>" +
              "</details>" +
            "</div>" +
          "</details>" +
        "</div>" +
        '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
          '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
          '<div class="admin-report-sent-archive__inner">' +
            '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
          "</div>" +
        "</details>"
      );
    }

  function loadSentReports(forceRefresh) {
    if (!sentList) return;
    if (!canViewSentReports()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Нет доступа к отправленным отчётам.</p>';
      return;
    }
    if (!forceRefresh && sentReportsLoading) return;
    if (!forceRefresh && sentReportsLoadedAt && sentList.innerHTML && Date.now() - sentReportsLoadedAt < SENT_REPORTS_CACHE_TTL_MS) return;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Не удалось загрузить отчёты (войдите в Telegram или PWA).</p>';
      return;
    }
    var keepRenderedContent = forceRefresh && hasRenderedSentReportsContent();
    var renderedFastCache = renderSentReportsHtmlCache();
    if (!renderedFastCache && keepRenderedContent) renderedFastCache = true;
    if (!renderedFastCache) sentList.innerHTML = buildSentReportsLoadingShellHtml();
    sentReportsLoading = true;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    var fetchReports = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout : fetch;
    function buildReportsUrl(scope) {
      var url = base.replace(/\/$/, "") + "/api/admin-report-shifts" + q;
      return scope ? appendQueryParam(url, "scope", scope) : url;
    }
    function fetchReportsForScope(scope) {
      return fetchReports(buildReportsUrl(scope), { cache: "no-store" }, 15000)
      .then(function (r) {
        if (!r || !r.ok) throw new Error("admin-report-shifts " + (r && r.status ? r.status : "failed"));
        return r.json();
      });
    }
    fetchReportsForScope("currentWeek")
      .then(function (data) {
        sentReportsLoading = false;
        if (!sentList) return;
        var items = (data && data.ok && data.reports) ? data.reports : [];
        var hasArchive = !!(data && data.hasArchive);
        if ((!Array.isArray(items) || items.length === 0) && !hasArchive) {
          sentList.innerHTML = '<p class="admin-report-sent-empty">Пока нет отправленных отчётов.</p>';
          sentReportsLoadedAt = Date.now();
          return;
        }
        var weekdayOrder = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        var weekdayOrderDesc = weekdayOrder.slice().reverse();
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
        /** Неделя отчётных дат: Пн -> Вс; реальный переход недели происходит в Пн 16:00 МСК. */
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
        var currentWeekTs = reportBusinessTimestampMs(Date.now());
        var currentWeek = weekMetaFromStart(weekStartMsForReport(currentWeekTs));

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
            var v = k === "rakeback" ? getReportStoredRakebackTotal(r) : r[k];
            if (v == null || v === "") return;
            var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
            if (!isNaN(n)) totals[k] += n;
          });
        }

        function sumReportsInWindow(allItems, fromMs, toMs) {
          var weekTotals = emptyWeekTotals();
          var extraMap = {};
          allItems.forEach(function (r) {
            var t = getReportDayTimestamp(r);
            if (!t || t < fromMs || t > toMs) return;
            addNumericToTotals(weekTotals, r);
            mergeReportExtrasIntoMap(extraMap, r);
          });
          weekTotals.extraFields = Object.keys(extraMap).sort().map(function (name) {
            var value = extraMap[name];
            if (value && value.__avg) value = value.count ? value.sum / value.count : 0;
            return { name: name, amount: value };
          }).filter(function (f) {
            return f.amount !== 0 && !isNaN(f.amount);
          });
          return weekTotals;
        }

        function buildDaysHtmlFromList(list, idPrefix) {
          if (!list || list.length === 0) return "";
          var byDay = {};
          list.forEach(function (r) {
            var meta = getReportDayMeta(r);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrderDesc.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
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
              var dispDate = getReportDayMeta(it).date || it.date || "";
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
            var meta = getReportDayMeta(r);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrderDesc.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
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
              var dispDate = getReportDayMeta(it).date || it.date || "";
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

        function groupReportsByWeek(list) {
          var grouped = {};
          (Array.isArray(list) ? list : []).forEach(function (r) {
            var eff = getReportDayTimestamp(r);
            if (!eff || eff !== eff) return;
            var ws = weekStartMsForReport(eff);
            var key = String(ws);
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(r);
          });
          return grouped;
        }
        function sortedWeekStarts(grouped) {
          return Object.keys(grouped || {}).map(function (s) {
            return Number(s);
          }).filter(function (n) {
            return n === n;
          }).sort(function (a, b) {
            return b - a;
          });
        }
        var weeksByKey = groupReportsByWeek(items);
        var currentItems = weeksByKey[String(currentWeek.start)] || [];
        function buildWeekBlock(weekStartMs, list, idPrefixBase, isCurrent) {
          var meta = weekMetaFromStart(weekStartMs);
          var totals = sumReportsInWindow(list || [], meta.start, meta.end);
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

        if (hasArchive) {
          html.push(
            '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
              '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
              '<div class="admin-report-sent-archive__inner">' +
              '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
              "</div></details>"
          );
        }

        sentList.innerHTML = html.join("");
        writeSentReportsHtmlCache(sentList.innerHTML);
        sentReportsLoadedAt = Date.now();

        var reportById = {};
        items.forEach(function (r) { reportById[r.id] = r; });
        var weekTotalsById = {};
        weekTotalsById[currentBlock.weekId] = { totals: currentBlock.totals, label: currentBlock.label };
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
            if (v != null && v !== "" && (typeof v !== "number" || v !== 0)) lines.push(weekLabels[k] + ": " + (k === "rakeback" ? formatReportRubleNumber(v) : String(v)));
          });
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

        function bindSentReportControls(scope) {
          scope = scope || sentList;
          if (!scope) return;
          scope.querySelectorAll(".admin-report-week-copy-btn").forEach(function (btn) {
            if (btn.getAttribute("data-admin-report-bound") === "1") return;
            btn.setAttribute("data-admin-report-bound", "1");
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

          scope.querySelectorAll(".admin-report-sent-item__head").forEach(function (head) {
            if (head.getAttribute("data-admin-report-bound") === "1") return;
            head.setAttribute("data-admin-report-bound", "1");
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

          scope.querySelectorAll(".admin-report-sent-edit-btn").forEach(function (editBtn) {
            if (editBtn.getAttribute("data-admin-report-bound") === "1") return;
            editBtn.setAttribute("data-admin-report-bound", "1");
            editBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var id = editBtn.getAttribute("data-report-id");
              var report = reportById[id];
              if (!report) return;
              call(callbacks.editReport, id, report);
            });
          });

          scope.querySelectorAll(".admin-report-sent-delete-btn").forEach(function (delBtn) {
            if (delBtn.getAttribute("data-admin-report-bound") === "1") return;
            delBtn.setAttribute("data-admin-report-bound", "1");
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
                    if (data && data.ok) {
                      clearSentReportsHtmlCache();
                      loadSentReports(true);
                    }
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
        }

        bindSentReportControls(sentList);
        var archiveEl = sentList.querySelector("[data-admin-report-sent-archive]");
        if (archiveEl) {
          archiveEl.addEventListener("toggle", function () {
            if (!archiveEl.open || archiveEl.getAttribute("data-admin-report-archive-built") === "1") return;
            archiveEl.setAttribute("data-admin-report-archive-built", "1");
            var inner = archiveEl.querySelector(".admin-report-sent-archive__inner");
            if (!inner) return;
            inner.innerHTML = '<p class="admin-report-sent-period-hint">Загрузка прошлых недель…</p>';
            fetchReportsForScope("archive").then(function (archiveData) {
              var archiveItems = (archiveData && archiveData.ok && Array.isArray(archiveData.reports)) ? archiveData.reports : [];
              if (!archiveItems.length) {
                inner.innerHTML = '<p class="admin-report-sent-period-hint">Прошлых недель пока нет.</p>';
                return;
              }
              archiveItems.forEach(function (report) {
                if (report && report.id) reportById[report.id] = report;
              });
              var archiveWeeksByKey = groupReportsByWeek(archiveItems);
              var archiveWeekStarts = sortedWeekStarts(archiveWeeksByKey);
              var archiveHtml = [];
              archiveWeekStarts.forEach(function (ws) {
                var block = buildWeekBlock(ws, archiveWeeksByKey[String(ws)] || [], "ar-arch-", false);
                weekTotalsById[block.weekId] = { totals: block.totals, label: block.label };
                archiveHtml.push(block.html);
              });
              inner.innerHTML = archiveHtml.join("");
              bindSentReportControls(inner);
            }).catch(function () {
              archiveEl.removeAttribute("data-admin-report-archive-built");
              if (inner) inner.innerHTML = '<p class="admin-report-sent-period-hint">Не удалось загрузить прошлые недели.</p>';
            });
          });
        }
      })
      .catch(function () {
        sentReportsLoading = false;
        if (sentList && !renderedFastCache) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
      });
  }

    function clear() {
      if (sentList) sentList.innerHTML = "";
    }

    return {
      clear: clear,
      open: loadSentReports,
      refresh: function () {
        return loadSentReports(true);
      },
      syncAccess: function () {
        return call(callbacks.syncAccess);
      },
    };
  }

  window.AdminReportSentTab = {
    init: init,
  };
})();
