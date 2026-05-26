(function () {
  function init(scope) {
    scope = scope || {};
    with (scope) {
      function updateCalculationCashTotal() {
        if (calculationCashUpdateTimer) {
          clearTimeout(calculationCashUpdateTimer);
          calculationCashUpdateTimer = null;
        }
        var total = 0;
        if (calculationsCashInputs && calculationsCashInputs.length) {
          calculationsCashInputs.forEach(function (input) {
            total += parseReportNumber(input ? input.value : "");
          });
        }
        calculationCashTotal = total;
        if (calculationsCashTotalEl) calculationsCashTotalEl.textContent = formatReportRubleNumber(total);
        updateCalculationGrandTotal();
      }

      function scheduleCalculationCashTotal() {
        if (calculationCashUpdateTimer) clearTimeout(calculationCashUpdateTimer);
        calculationCashUpdateTimer = setTimeout(function () {
          calculationCashUpdateTimer = null;
          updateCalculationCashTotal();
        }, 80);
      }

      function getCalculationRoomWinLossTotal() {
        var total = 0;
        if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
          calculationsWinLossInputs.forEach(function (input) {
            total += parseReportNumber(input ? input.value : "");
          });
        }
        return total;
      }

      function updateCalculationGrandTotal() {
        if (calculationGrandUpdateTimer) {
          clearTimeout(calculationGrandUpdateTimer);
          calculationGrandUpdateTimer = null;
        }
        if (!calculationsGrandTotalEl) return;
        var totals = calculationWeekTotals || {};
        var roomWinLossTotal = getCalculationRoomWinLossTotal();
        var grand =
          parseReportNumber(calculationCashTotal) +
          roomWinLossTotal +
          parseReportNumber(totals.deposit) +
          parseReportNumber(totals.bonuses) +
          parseReportNumber(totals.previousRakeback) +
          parseReportNumber(totals.rakeback) -
          parseReportNumber(figuresRakeTotal) -
          parseReportNumber(totals.cashout) -
          parseReportNumber(totals.botExchipCashout);
        if (calculationsWinLossTotalEl) calculationsWinLossTotalEl.textContent = formatReportRubleNumber(roomWinLossTotal);
        if (calculationsRakeTotalEl) calculationsRakeTotalEl.textContent = formatReportNegativeDisplay(figuresRakeTotal);
        calculationsGrandTotalEl.textContent = formatReportRubleNumber(grand);
      }

      function scheduleCalculationGrandTotal() {
        if (calculationGrandUpdateTimer) clearTimeout(calculationGrandUpdateTimer);
        calculationGrandUpdateTimer = setTimeout(function () {
          calculationGrandUpdateTimer = null;
          updateCalculationGrandTotal();
        }, 80);
      }

      function getFiguresExtraAmountTotal() {
        var total = 0;
        if (!figuresExtrasEl) return total;
        figuresExtrasEl.querySelectorAll("[data-admin-report-figures-extra-amount]").forEach(function (input) {
          total += parseReportNumber(input ? input.value : "");
        });
        return total;
      }

      function getFiguresExtraRakeTotal() {
        var total = 0;
        if (!figuresExtrasEl) return total;
        figuresExtrasEl.querySelectorAll("[data-admin-report-figures-extra-rake]").forEach(function (input) {
          total += parseReportNumber(input ? input.value : "");
        });
        return total;
      }

      function getApproxFiguresRakebackAmount() {
        return -(getApproxFiguresRakebackBase() * getApproxFiguresRakebackRate() / 100);
      }

      function getApproxFiguresRakebackRate() {
        var selected = null;
        if (figuresApproxRateInputs && figuresApproxRateInputs.length) {
          figuresApproxRateInputs.forEach(function (input) {
            if (input && input.checked) selected = input;
          });
        }
        return parseReportNumber(selected ? selected.value : "30") || 30;
      }

      function getIssuedRakebackReportRakeTotal() {
        return issuedRakebackReportRakeTotal;
      }

      function getApproxFiguresRakebackBase() {
        return Math.max(
          0,
          parseReportNumber(figuresRakeTotal) -
            parseReportNumber(figuresApproxRomanRakeInput ? figuresApproxRomanRakeInput.value : "") -
            getFiguresExtraRakeTotal() -
            getIssuedRakebackReportRakeTotal()
        );
      }

      function syncFiguresExtraRow(row) {
        if (!row) return;
        var rakeInput = row.querySelector("[data-admin-report-figures-extra-rake]");
        var percentInput = row.querySelector("[data-admin-report-figures-extra-percent]");
        var amountInput = row.querySelector("[data-admin-report-figures-extra-amount]");
        if (!amountInput) return;
        var rakeRaw = rakeInput ? String(rakeInput.value || "").trim() : "";
        var percentRaw = percentInput ? String(percentInput.value || "").trim() : "";
        if (!rakeRaw && !percentRaw) return;
        var amount = parseReportNumber(rakeRaw) * parseReportNumber(percentRaw) / 100;
        amountInput.value = amount ? formatReportInputNumber(amount) : "";
      }

      function formatReportNegativeDisplay(value) {
        var n = parseReportNumber(value);
        if (!n) return formatReportRubleNumber(0);
        return formatReportRubleNumber(-Math.abs(n));
      }

      function updateFiguresTotals(options) {
        if (figuresTotalsUpdateTimer) {
          clearTimeout(figuresTotalsUpdateTimer);
          figuresTotalsUpdateTimer = null;
        }
        options = options || {};
        figuresRakeTotal = 0;
        figuresPercentTotal = 0;
        if (options.syncExtras !== false && figuresExtrasEl) {
          figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(syncFiguresExtraRow);
        }
        if (figuresRakeInputs && figuresRakeInputs.length) {
          figuresRakeInputs.forEach(function (input, index) {
            var rake = parseReportNumber(input ? input.value : "");
            var multiplier = parseReportNumber(input ? input.getAttribute("data-admin-report-figures-multiplier") : "");
            var rakeAmount = rake * (multiplier || 1);
            var rate = parseReportNumber(input ? input.getAttribute("data-admin-report-figures-rate") : "");
            var percent = -(rakeAmount * rate / 100);
            figuresRakeTotal += rakeAmount;
            figuresPercentTotal += percent;
            var out = figuresPercentOutputs && figuresPercentOutputs[index] ? figuresPercentOutputs[index] : null;
            if (out) out.textContent = formatReportRubleNumber(percent);
          });
        }
        var totals = calculationWeekTotals || {};
        if (figuresRakeTotalEl) figuresRakeTotalEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresRakeTotalMirrorEl) figuresRakeTotalMirrorEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresPercentTotalEl) figuresPercentTotalEl.textContent = formatReportRubleNumber(figuresPercentTotal);
        if (figuresPercentTotalMirrorEl) figuresPercentTotalMirrorEl.textContent = formatReportNegativeDisplay(figuresPercentTotal);
        if (figuresRakebackEl) figuresRakebackEl.textContent = formatReportNegativeDisplay(totals.rakeback);
        if (figuresBonusesEl) figuresBonusesEl.textContent = formatReportNegativeDisplay(totals.bonuses);
        if (figuresPreviousRakebackEl) figuresPreviousRakebackEl.textContent = formatReportNegativeDisplay(totals.previousRakeback);
        if (figuresSalaryEl) figuresSalaryEl.textContent = formatReportNegativeDisplay(totals.anyaSalary);
        var approxAgentsRake = getFiguresExtraRakeTotal();
        var approxIssuedRake = getIssuedRakebackReportRakeTotal();
        var approxBase = getApproxFiguresRakebackBase();
        var approxRate = getApproxFiguresRakebackRate();
        var approxRakeback = getApproxFiguresRakebackAmount();
        var includeApproxRakeback = !!(figuresApproxRakebackEnabledInput && figuresApproxRakebackEnabledInput.checked);
        if (figuresApproxRakebackEl) figuresApproxRakebackEl.textContent = includeApproxRakeback ? formatReportRubleNumber(approxRakeback) : "0";
        if (figuresApproxTotalRakeEl) figuresApproxTotalRakeEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresApproxAgentsRakeEl) figuresApproxAgentsRakeEl.textContent = formatReportRubleNumber(approxAgentsRake);
        if (figuresApproxIssuedRakeEl) figuresApproxIssuedRakeEl.textContent = formatReportRubleNumber(approxIssuedRake);
        if (figuresApproxFormulaEl) figuresApproxFormulaEl.textContent = formatReportRubleNumber(approxBase) + " × " + formatReportInputNumber(approxRate) + "% = " + formatReportRubleNumber(approxRakeback);
        if (figuresGrandTotalEl) {
          var grand =
            figuresRakeTotal +
            figuresPercentTotal -
            parseReportNumber(totals.rakeback) -
            parseReportNumber(totals.bonuses) -
            parseReportNumber(totals.previousRakeback) -
            parseReportNumber(totals.anyaSalary) -
            parseReportNumber(figuresRomanPaidInput ? figuresRomanPaidInput.value : "") +
            parseReportNumber(figuresWinLossInput ? figuresWinLossInput.value : "") -
            parseReportNumber(figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "") -
            getFiguresExtraAmountTotal() +
            (includeApproxRakeback ? approxRakeback : 0);
          figuresGrandTotalEl.textContent = formatReportRubleNumber(grand);
        }
        updateCalculationGrandTotal();
      }

      function scheduleFiguresTotals(options) {
        if (figuresTotalsUpdateTimer) clearTimeout(figuresTotalsUpdateTimer);
        figuresTotalsUpdateTimer = setTimeout(function () {
          figuresTotalsUpdateTimer = null;
          updateFiguresTotals(options || { syncExtras: false });
        }, 80);
      }

      function setCalculationTotalsText(totals) {
        totals = totals || {};
        calculationWeekTotals = totals;
        if (calculationsDepositEl) calculationsDepositEl.textContent = formatReportRubleNumber(totals.deposit);
        if (calculationsBonusesEl) calculationsBonusesEl.textContent = formatReportRubleNumber(totals.bonuses);
        if (calculationsPreviousRakebackEl) calculationsPreviousRakebackEl.textContent = formatReportRubleNumber(totals.previousRakeback);
        if (calculationsRakebackEl) calculationsRakebackEl.textContent = formatReportRubleNumber(totals.rakeback);
        if (calculationsCashoutEl) calculationsCashoutEl.textContent = formatReportNegativeDisplay(totals.cashout);
        if (calculationsBotExchipCashoutEl) calculationsBotExchipCashoutEl.textContent = formatReportNegativeDisplay(totals.botExchipCashout);
        updateCalculationGrandTotal();
        updateFiguresTotals({ syncExtras: false });
      }

      function sumCalculationReports(items, week) {
        var totals = {
          deposit: 0,
          bonuses: 0,
          previousRakeback: 0,
          rakeback: 0,
          cashout: 0,
          botExchipCashout: 0,
          anyaSalary: 0,
        };
        if (!Array.isArray(items) || !week) return totals;
        items.forEach(function (report) {
          var t = reportEffectiveTimestampMs(report);
          if (!t || t < week.start || t > week.end) return;
          totals.deposit += parseReportNumber(report && report.deposit);
          totals.bonuses += parseReportNumber(report && report.bonuses);
          totals.previousRakeback += getReportPreviousRakebackTotal(report);
          totals.rakeback += getReportStoredRakebackTotal(report);
          totals.cashout += parseReportNumber(report && report.cashout);
          totals.botExchipCashout += parseReportNumber(report && report.botExchipCashout);
          totals.anyaSalary += getReportAnyaSalaryTotal(report);
        });
        return totals;
      }

      function getCalculationArchiveReportRows(report) {
        var rows = [];
        function add(label, value, negative) {
          var numeric = parseReportNumber(value);
          rows.push({
            label: label,
            value: negative ? formatReportNegativeDisplay(numeric) : formatReportRubleNumber(numeric),
            className: negative ? "admin-report-calculations__archive-row--negative" : "admin-report-calculations__archive-row--positive",
          });
        }
        add("Депозит", report && report.deposit, false);
        add("Продамус", report && report.prodamus, false);
        add("Робокасса", report && report.robokassa, false);
        add("Рома крипта", report && report.romaCrypto, false);
        add("Бот крипта деп", report && report.botCryptoDep, false);
        add("Бот Эксчип деп", report && report.botExchipDep, false);
        add("Бонусы", report && report.bonuses, false);
        var previousRakebackTotal = getReportPreviousRakebackTotal(report);
        if (previousRakebackTotal !== 0) add("РБ прошлая", previousRakebackTotal, true);
        add("Переводы", report && report.transfers, false);
        add("Возврат", report && report.ret, false);
        add("Сергей/Марина", report && report.sergeyMarina, false);
        add("Рейкбек", getReportStoredRakebackTotal(report), false);
        add("Выводы", report && report.cashout, true);
        add("Бот Эксчип вывод", report && report.botExchipCashout, true);
        var salaryTotal = getReportAnyaSalaryTotal(report);
        if (salaryTotal !== 0) add("ЗП", salaryTotal, true);
        getReportExtraEntries(report).forEach(function (extra) {
          if (isReportManualRakebackFieldName(extra.name)) return;
          var normalizedName = normalizeReportDetailName(extra.name);
          if (isReportAnyaSalaryFieldName(normalizedName)) return;
          if (isReportPreviousRakebackFieldName(normalizedName)) return;
          rows.push({
            label: extra.name || "Доп",
            value: formatReportRubleNumber(extra.value),
            className: "admin-report-calculations__archive-row--neutral",
          });
        });
        return rows;
      }

      function renderCalculationArchiveReport(report, index) {
        var effMs = reportEffectiveTimestampMs(report);
        var dateMeta = formatRuWeekdayDateFromTs(effMs);
        var title = (dateMeta.date || report && report.date || "Без даты") + (report && report.authorName ? " · " + report.authorName : "");
        var rows = getCalculationArchiveReportRows(report).map(function (row) {
          return '<div class="admin-report-calculations__archive-report-row ' + escapeReportHtml(row.className) + '">' +
            '<span>' + escapeReportHtml(row.label) + "</span>" +
            '<output>' + escapeReportHtml(row.value) + "</output>" +
          "</div>";
        }).join("");
        var comment = report && report.comment ? (
          '<div class="admin-report-calculations__archive-comment">' +
            '<span>Комментарий</span><p>' + escapeReportHtml(report.comment) + "</p>" +
          "</div>"
        ) : "";
        return '<article class="admin-report-calculations__archive-report">' +
          '<h4>' + escapeReportHtml(String(index + 1) + ". " + title) + "</h4>" +
          '<div class="admin-report-calculations__archive-report-grid">' + rows + "</div>" +
          comment +
        "</article>";
      }

      function renderCalculationArchiveWeek(items, weekStart) {
        var week = getCalculationWeekMetaFromStart(weekStart);
        var reports = (items || []).filter(function (report) {
          var t = reportEffectiveTimestampMs(report);
          return t && t >= week.start && t <= week.end;
        }).sort(function (a, b) {
          return (reportEffectiveTimestampMs(b) || 0) - (reportEffectiveTimestampMs(a) || 0);
        });
        var totals = sumCalculationReports(reports, week);
        var totalHtml =
          '<div class="admin-report-calculations__archive-totals">' +
            '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Депозиты за неделю</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.deposit)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Бонусы</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.bonuses)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>РБ прошлая</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.previousRakeback)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Рейкбек</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.rakeback)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>Выводов игроками</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.cashout)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>Выводов Эксчип бот</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.botExchipCashout)) + "</output></div>" +
            '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>ЗП</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.anyaSalary)) + "</output></div>" +
          "</div>";
        var reportsHtml = reports.map(renderCalculationArchiveReport).join("");
        return '<details class="admin-report-calculations__archive-details">' +
          '<summary class="admin-report-calculations__archive-summary">Неделя ' + escapeReportHtml(week.label) + "</summary>" +
          '<div class="admin-report-calculations__archive-inner">' +
            totalHtml +
            (reportsHtml || '<p class="admin-report-calculations__archive-empty">За эту неделю отчетов пока нет.</p>') +
          "</div>" +
        "</details>";
      }

      function renderCalculationArchive(items) {
        if (!calculationsArchiveEl) return;
        var currentWeek = getCalculationWeekMeta();
        var minArchiveWeekStart = getCalculationArchiveMinWeekStart();
        var source = Array.isArray(items) ? items : [];
        var weekStarts = {};
        source.forEach(function (report) {
          var t = reportEffectiveTimestampMs(report);
          if (!t || t >= currentWeek.start) return;
          var weekStart = weekStartMsForReport(t);
          if (!Number.isFinite(weekStart)) return;
          if (weekStart < minArchiveWeekStart) return;
          weekStarts[String(weekStart)] = weekStart;
        });
        var sortedWeekStarts = Object.keys(weekStarts).map(function (key) {
          return weekStarts[key];
        }).sort(function (a, b) {
          return b - a;
        });
        calculationsArchiveEl.hidden = sortedWeekStarts.length === 0;
        calculationsArchiveEl.innerHTML = sortedWeekStarts.map(function (weekStart) {
          return renderCalculationArchiveWeek(source, weekStart);
        }).join("");
      }

      function appendCalculationQueryParam(url, name, value) {
        var sep = String(url || "").indexOf("?") === -1 ? "?" : "&";
        return String(url || "") + sep + encodeURIComponent(name) + "=" + encodeURIComponent(value);
      }

      function fetchCalculationReports(base, q, scope) {
        var url = base.replace(/\/$/, "") + "/api/admin-report-shifts" + q;
        if (scope) url = appendCalculationQueryParam(url, "scope", scope);
        var fetchReports = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout : fetch;
        return fetchReports(url, { cache: "no-store" }, 15000)
          .then(function (r) {
            if (!r || !r.ok) throw new Error("admin-report-shifts " + (r && r.status ? r.status : "failed"));
            return r.json();
          });
      }

      function loadCalculationArchiveReports(base, q) {
        if (!calculationsArchiveEl || calculationArchiveLoading || calculationArchiveLoaded) return;
        calculationArchiveLoading = true;
        fetchCalculationReports(base, q, "archive")
          .then(function (data) {
            calculationArchiveLoading = false;
            calculationArchiveLoaded = true;
            var items = (data && data.ok && Array.isArray(data.reports)) ? data.reports : [];
            calculationArchiveReportsCache = items;
            renderCalculationArchive(calculationArchiveReportsCache);
          })
          .catch(function () {
            calculationArchiveLoading = false;
          });
      }

      function loadCalculationsReports() {
        if (!canViewCalculationsReports()) return;
        var week = getCalculationWeekMeta();
        if (calculationsWeekLabelEl) calculationsWeekLabelEl.textContent = week.label;
        var currentCache = Array.isArray(calculationReportsCache) ? calculationReportsCache : [];
        setCalculationTotalsText(currentCache.length ? sumCalculationReports(currentCache, week) : {});
        renderCalculationArchive(calculationArchiveReportsCache);
        var base = typeof getApiBase === "function" ? getApiBase() : "";
        if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
        var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
        fetchCalculationReports(base, q, "currentWeek")
          .then(function (data) {
            var items = (data && data.ok && Array.isArray(data.reports)) ? data.reports : [];
            calculationReportsCache = Array.isArray(items) ? items : [];
            setCalculationTotalsText(sumCalculationReports(calculationReportsCache, week));
            if (data && data.hasArchive) loadCalculationArchiveReports(base, q);
            else {
              calculationArchiveLoaded = true;
              calculationArchiveReportsCache = [];
              renderCalculationArchive([]);
            }
          })
          .catch(function () {
            if (!currentCache.length) setCalculationTotalsText({});
            renderCalculationArchive(calculationArchiveReportsCache);
          });
      }

      function bindFiguresExtraInputs(scope) {
        if (!scope) return;
        scope.querySelectorAll("[data-admin-report-figures-extra-rake],[data-admin-report-figures-extra-percent],[data-admin-report-figures-extra-amount]").forEach(function (input) {
          input.addEventListener("input", function (e) {
            syncFiguresExtraRow(e.target && e.target.closest ? e.target.closest(".admin-report-calculations__field--extra") : null);
            scheduleFiguresTotals({ syncExtras: false });
          });
          input.addEventListener("change", function (e) {
            syncFiguresExtraRow(e.target && e.target.closest ? e.target.closest(".admin-report-calculations__field--extra") : null);
            updateFiguresTotals({ syncExtras: false });
          });
        });
      }

      function addFiguresExtraField() {
        if (!figuresExtrasEl) return;
        if (figuresSavedLocked) return;
        var template = figuresExtrasEl.querySelector(".admin-report-calculations__field--extra");
        if (!template) return;
        var clone = template.cloneNode(true);
        clone.querySelectorAll("input").forEach(function (input) { input.value = ""; });
        figuresExtrasEl.appendChild(clone);
        bindFiguresExtraInputs(clone);
        var nameInput = clone.querySelector("[data-admin-report-figures-extra-name]");
        if (nameInput && typeof nameInput.focus === "function") nameInput.focus();
        updateFiguresTotals();
      }

      function getCalculationGroupStatusEl(group) {
        var target = String(group || "");
        var found = null;
        if (calculationGroupStatusEls && calculationGroupStatusEls.length) {
          calculationGroupStatusEls.forEach(function (el) {
            if (!found && el && el.getAttribute("data-admin-report-calc-status") === target) found = el;
          });
        }
        return found;
      }

      function setCalculationsStatus(group, text) {
        var statusEl = getCalculationGroupStatusEl(group);
        if (!statusEl) return;
        statusEl.textContent = text || "";
        if (calculationsStatusTimer) clearTimeout(calculationsStatusTimer);
        if (text) {
          calculationsStatusTimer = setTimeout(function () {
            if (statusEl) statusEl.textContent = "";
          }, 1800);
        }
      }

      function setFiguresStatus(text) {
        if (!figuresSaveStatusEl) return;
        figuresSaveStatusEl.textContent = text || "";
        if (figuresStatusTimer) clearTimeout(figuresStatusTimer);
        if (text) {
          figuresStatusTimer = setTimeout(function () {
            if (figuresSaveStatusEl) figuresSaveStatusEl.textContent = "";
          }, 1800);
        }
      }

      function getCalculationGroupInputSelector(group) {
        if (group === "cash") return "[data-admin-report-calc-cash]";
        if (group === "rake") return "[data-admin-report-figures-rake]";
        if (group === "winloss") return "[data-admin-report-calc-winloss]";
        return "";
      }

      function setCalculationGroupButtons(group, locked) {
        if (calculationGroupSaveBtns && calculationGroupSaveBtns.length) {
          calculationGroupSaveBtns.forEach(function (btn) {
            if (btn && btn.getAttribute("data-admin-report-calc-save") === group) btn.hidden = locked;
          });
        }
        if (calculationGroupEditBtns && calculationGroupEditBtns.length) {
          calculationGroupEditBtns.forEach(function (btn) {
            if (btn && btn.getAttribute("data-admin-report-calc-edit") === group) btn.hidden = !locked;
          });
        }
      }

      function setCalculationGroupLocked(group, locked) {
        if (!group) return;
        calculationGroupLocks[group] = !!locked;
        var selector = getCalculationGroupInputSelector(group);
        if (calculationsRoot && selector) {
          calculationsRoot.querySelectorAll(selector).forEach(function (input) {
            input.readOnly = !!locked;
          });
        }
        setCalculationGroupButtons(group, !!locked);
      }

      function setCalculationsLocked(locked) {
        Object.keys(calculationGroupLocks).forEach(function (group) {
          setCalculationGroupLocked(group, locked);
        });
        if (calculationsRoot) {
          calculationsRoot.classList.toggle("admin-report-calculations--locked", Object.keys(calculationGroupLocks).every(function (group) {
            return calculationGroupLocks[group];
          }));
        }
      }

      function setFiguresLocked(locked) {
        figuresSavedLocked = !!locked;
        if (figuresRoot) {
          figuresRoot.querySelectorAll("input").forEach(function (input) {
            input.readOnly = input === figuresApproxRomanRakeInput ? false : figuresSavedLocked;
          });
        }
        if (figuresAddFieldBtn) figuresAddFieldBtn.disabled = figuresSavedLocked;
        if (figuresSaveBtn) figuresSaveBtn.hidden = figuresSavedLocked;
        if (figuresEditBtn) figuresEditBtn.hidden = !figuresSavedLocked;
      }

      function saveCalculationsDraftQuiet() {
        try {
          if (window.localStorage) {
            window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
          }
        } catch (e) {}
      }

      function collectCalculationsDraft() {
        function valuesFrom(list) {
          return Array.prototype.slice.call(list || []).map(function (input) { return input ? input.value : ""; });
        }
        var extras = [];
        if (figuresExtrasEl) {
          figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row) {
            var name = row.querySelector("[data-admin-report-figures-extra-name]");
            var rake = row.querySelector("[data-admin-report-figures-extra-rake]");
            var percent = row.querySelector("[data-admin-report-figures-extra-percent]");
            var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
            extras.push({
              name: name ? name.value : "",
              rake: rake ? rake.value : "",
              percent: percent ? percent.value : "",
              amount: amount ? amount.value : "",
            });
          });
        }
        return {
          cash: valuesFrom(calculationsCashInputs),
          roomWinLoss: valuesFrom(calculationsWinLossInputs),
          rake: valuesFrom(figuresRakeInputs),
          romanPaid: figuresRomanPaidInput ? figuresRomanPaidInput.value : "",
          winLoss: figuresWinLossInput ? figuresWinLossInput.value : "",
          agentsPaid: figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "",
          approxRakebackEnabled: !!(figuresApproxRakebackEnabledInput && figuresApproxRakebackEnabledInput.checked),
          approxRakebackRate: getApproxFiguresRakebackRate(),
          approxRomanRake: figuresApproxRomanRakeInput ? figuresApproxRomanRakeInput.value : "",
          extras: extras,
        };
      }

      function ensureFiguresExtraRows(count) {
        if (!figuresExtrasEl) return;
        var rows = Array.prototype.slice.call(figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra"));
        if (!rows.length) return;
        var target = Math.max(1, count || 1);
        while (rows.length < target) {
          var clone = rows[0].cloneNode(true);
          clone.querySelectorAll("input").forEach(function (input) { input.value = ""; });
          figuresExtrasEl.appendChild(clone);
          rows.push(clone);
          bindFiguresExtraInputs(clone);
        }
        while (rows.length > target) {
          var row = rows.pop();
          if (row && row.parentNode) row.parentNode.removeChild(row);
        }
      }

      function applyCalculationsDraft(draft) {
        if (!draft) return false;
        var cash = Array.isArray(draft.cash) ? draft.cash : [];
        if (calculationsCashInputs && calculationsCashInputs.length) {
          calculationsCashInputs.forEach(function (input, index) {
            if (input) input.value = cash[index] != null ? cash[index] : "";
          });
        }
        var roomWinLoss = Array.isArray(draft.roomWinLoss) ? draft.roomWinLoss : [];
        if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
          calculationsWinLossInputs.forEach(function (input, index) {
            if (input) input.value = roomWinLoss[index] != null ? roomWinLoss[index] : "";
          });
        }
        var rake = Array.isArray(draft.rake) ? draft.rake : [];
        if (figuresRakeInputs && figuresRakeInputs.length) {
          figuresRakeInputs.forEach(function (input, index) {
            if (input) input.value = rake[index] != null ? rake[index] : "";
          });
        }
        if (figuresRomanPaidInput) figuresRomanPaidInput.value = draft.romanPaid != null ? draft.romanPaid : "";
        if (figuresWinLossInput) figuresWinLossInput.value = draft.winLoss != null ? draft.winLoss : "";
        if (figuresAgentsPaidInput) figuresAgentsPaidInput.value = draft.agentsPaid != null ? draft.agentsPaid : "";
        if (figuresApproxRakebackEnabledInput) figuresApproxRakebackEnabledInput.checked = draft.approxRakebackEnabled === true;
        if (figuresApproxRateInputs && figuresApproxRateInputs.length) {
          var draftRate = parseReportNumber(draft.approxRakebackRate != null ? draft.approxRakebackRate : "30") || 30;
          figuresApproxRateInputs.forEach(function (input) {
            if (input) input.checked = parseReportNumber(input.value) === draftRate;
          });
        }
        if (figuresApproxRomanRakeInput) figuresApproxRomanRakeInput.value = draft.approxRomanRake != null ? draft.approxRomanRake : "";
        var extras = Array.isArray(draft.extras) ? draft.extras : [];
        ensureFiguresExtraRows(extras.length || 1);
        if (figuresExtrasEl) {
          figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row, index) {
            var extra = extras[index] || {};
            var name = row.querySelector("[data-admin-report-figures-extra-name]");
            var rake = row.querySelector("[data-admin-report-figures-extra-rake]");
            var percent = row.querySelector("[data-admin-report-figures-extra-percent]");
            var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
            if (name) name.value = extra.name != null ? extra.name : "";
            if (rake) rake.value = extra.rake != null ? extra.rake : "";
            if (percent) percent.value = extra.percent != null ? extra.percent : "";
            if (amount) amount.value = extra.amount != null ? extra.amount : "";
          });
        }
        updateCalculationCashTotal();
        updateFiguresTotals();
        setCalculationsLocked(true);
        setFiguresLocked(true);
        return true;
      }

      function loadCalculationsDraft() {
        var raw = null;
        try {
          raw = window.localStorage ? window.localStorage.getItem(getCalculationDraftKey()) : null;
        } catch (e) {}
        if (!raw) {
          setCalculationsLocked(false);
          setFiguresLocked(false);
          return false;
        }
        try {
          return applyCalculationsDraft(JSON.parse(raw));
        } catch (eParse) {
          setCalculationsLocked(false);
          setFiguresLocked(false);
          return false;
        }
      }

      function hydrateCalculationsDraftOnce() {
        if (calculationsDraftHydrated) return;
        calculationsDraftHydrated = true;
        var loaded = loadCalculationsDraft();
        if (!loaded) {
          updateCalculationCashTotal();
          updateFiguresTotals();
        }
      }

      function saveCalculationsDraft(group) {
        group = group || "cash";
        try {
          if (window.localStorage) {
            window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
          }
          setCalculationGroupLocked(group, true);
          setCalculationsStatus(group, "Сохранено");
        } catch (e) {
          setCalculationsStatus(group, "Не удалось сохранить");
        }
      }

      function editCalculationsDraft(group) {
        group = group || "cash";
        setCalculationGroupLocked(group, false);
        setCalculationsStatus(group, "Редактирование");
      }

      function saveFiguresDraft() {
        try {
          if (window.localStorage) {
            window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
          }
          setFiguresLocked(true);
          setFiguresStatus("Сохранено");
        } catch (e) {
          setFiguresStatus("Не удалось сохранить");
        }
      }

      function editFiguresDraft() {
        setFiguresLocked(false);
        setFiguresStatus("Редактирование");
      }

      function resetHydration() {
        calculationsDraftHydrated = false;
      }

      return {
        updateCalculationCashTotal: updateCalculationCashTotal,
        scheduleCalculationCashTotal: scheduleCalculationCashTotal,
        getCalculationRoomWinLossTotal: getCalculationRoomWinLossTotal,
        updateCalculationGrandTotal: updateCalculationGrandTotal,
        scheduleCalculationGrandTotal: scheduleCalculationGrandTotal,
        getFiguresExtraAmountTotal: getFiguresExtraAmountTotal,
        getFiguresExtraRakeTotal: getFiguresExtraRakeTotal,
        getApproxFiguresRakebackAmount: getApproxFiguresRakebackAmount,
        getApproxFiguresRakebackRate: getApproxFiguresRakebackRate,
        getIssuedRakebackReportRakeTotal: getIssuedRakebackReportRakeTotal,
        getApproxFiguresRakebackBase: getApproxFiguresRakebackBase,
        syncFiguresExtraRow: syncFiguresExtraRow,
        formatReportNegativeDisplay: formatReportNegativeDisplay,
        updateFiguresTotals: updateFiguresTotals,
        scheduleFiguresTotals: scheduleFiguresTotals,
        setCalculationTotalsText: setCalculationTotalsText,
        sumCalculationReports: sumCalculationReports,
        getCalculationArchiveReportRows: getCalculationArchiveReportRows,
        renderCalculationArchiveReport: renderCalculationArchiveReport,
        renderCalculationArchiveWeek: renderCalculationArchiveWeek,
        renderCalculationArchive: renderCalculationArchive,
        loadCalculationsReports: loadCalculationsReports,
        bindFiguresExtraInputs: bindFiguresExtraInputs,
        addFiguresExtraField: addFiguresExtraField,
        getCalculationGroupStatusEl: getCalculationGroupStatusEl,
        setCalculationsStatus: setCalculationsStatus,
        setFiguresStatus: setFiguresStatus,
        getCalculationGroupInputSelector: getCalculationGroupInputSelector,
        setCalculationGroupButtons: setCalculationGroupButtons,
        setCalculationGroupLocked: setCalculationGroupLocked,
        setCalculationsLocked: setCalculationsLocked,
        setFiguresLocked: setFiguresLocked,
        saveCalculationsDraftQuiet: saveCalculationsDraftQuiet,
        collectCalculationsDraft: collectCalculationsDraft,
        ensureFiguresExtraRows: ensureFiguresExtraRows,
        applyCalculationsDraft: applyCalculationsDraft,
        loadCalculationsDraft: loadCalculationsDraft,
        hydrateCalculationsDraftOnce: hydrateCalculationsDraftOnce,
        saveCalculationsDraft: saveCalculationsDraft,
        editCalculationsDraft: editCalculationsDraft,
        saveFiguresDraft: saveFiguresDraft,
        editFiguresDraft: editFiguresDraft,
        resetHydration: resetHydration
      };
    }
  }

  window.AdminReportCalculationsLogic = {
    init: init
  };
})();
