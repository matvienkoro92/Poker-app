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
    var POKER_NET_ERR = config.netErrorMessage || "Ошибка сети";
    var escapeReportHtml = helpers.escapeReportHtml;
    var reportBusinessTimestampMs = helpers.reportBusinessTimestampMs;
    var reportEffectiveTimestampMs = helpers.reportEffectiveTimestampMs;
    var formatRuWeekdayDateFromTs = helpers.formatRuWeekdayDateFromTs;
    var buildReportDetailHtml = helpers.buildReportDetailHtml;
    var mergeReportExtrasIntoMap = helpers.mergeReportExtrasIntoMap;
    var formatReportRubleNumber = helpers.formatReportRubleNumber;
    var getReportStoredRakebackTotal = helpers.getReportStoredRakebackTotal;

    function canViewSentReports() {
      return call(callbacks.canView) !== false;
    }

  function loadSentReports(forceRefresh) {
    if (!sentList) return;
    if (!canViewSentReports()) {
      sentList.innerHTML = "";
      return;
    }
    if (!forceRefresh && sentReportsLoading) return;
    if (!forceRefresh && sentReportsLoadedAt && sentList.innerHTML && Date.now() - sentReportsLoadedAt < SENT_REPORTS_CACHE_TTL_MS) return;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Не удалось загрузить отчёты (войдите в Telegram или PWA).</p>';
      return;
    }
    sentList.innerHTML = '<p class="admin-report-sent-empty">Загрузка…</p>';
    sentReportsLoading = true;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        sentReportsLoading = false;
        if (!sentList) return;
        var items = (data && data.ok && data.reports) ? data.reports : [];
        if (!Array.isArray(items) || items.length === 0) {
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
            var t = reportEffectiveTimestampMs(r);
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
            var eff = reportEffectiveTimestampMs(r);
            var meta = formatRuWeekdayDateFromTs(eff);
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

        if (archiveWeekStarts.length > 0) {
          html.push(
            '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
              '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
              '<div class="admin-report-sent-archive__inner">' +
              '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
              "</div></details>"
          );
        }

        sentList.innerHTML = html.join("");
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
                    if (data && data.ok) loadSentReports(true);
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
            setTimeout(function () {
              var archiveHtml = [];
              archiveWeekStarts.forEach(function (ws) {
                var block = buildWeekBlock(ws, weeksByKey[String(ws)] || [], "ar-arch-", false);
                weekTotalsById[block.weekId] = { totals: block.totals, label: block.label };
                archiveHtml.push(block.html);
              });
              inner.innerHTML = archiveHtml.join("");
              bindSentReportControls(inner);
            }, 0);
          });
        }
      })
      .catch(function () {
        sentReportsLoading = false;
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
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
