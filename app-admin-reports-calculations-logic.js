(function () {
  function init(scope) {
    scope = scope || {};
    with (scope) {
      var calculationArchiveRequestBase = "";
      var calculationArchiveRequestQuery = "";
      var calculationWeekStatsTotals = { raffles: 0, raffleTickets: 0, raffleCash: 0, dailyPoker: 0, raffleTicketsReturn: 0, raffleCashReturn: 0, dailyPokerReturn: 0 };
      var calculationWeekStatsAvailability = { raffles: null, dailyPoker: null };
      var calculationPeriodReportsCache = {};
      var calculationPeriodRequestSeq = 0;
      var calculationReportsRequestSeq = 0;
      var calculationDraftRequestSeq = 0;
      var figuresSaveRequestSeq = 0;
      var calculationDisplayedPeriodKey = "";
      var calculationInitialLoadRetryTimer = null;
      var calculationInitialLoadRetryCount = 0;

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
        var sentRakeback = Number(totals.sentRakeback);
        var crmRakeback = Number(totals.rakeback);
        var rakebackDifference = Number.isFinite(sentRakeback) && Number.isFinite(crmRakeback)
          ? crmRakeback - sentRakeback
          : NaN;
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
            if (out) out.textContent = input && String(input.value || "").trim() ? formatReportRubleNumber(percent) : "—";
          });
        }
        var totals = calculationWeekTotals || {};
        var sentRakeback = Number(totals.sentRakeback);
        var crmRakeback = Number(totals.rakeback);
        var rakebackDifference = Number.isFinite(sentRakeback) && Number.isFinite(crmRakeback)
          ? crmRakeback - sentRakeback
          : NaN;
        if (figuresRakeTotalEl) figuresRakeTotalEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresRakeTotalMirrorEl) figuresRakeTotalMirrorEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresPercentTotalEl) figuresPercentTotalEl.textContent = formatReportRubleNumber(figuresPercentTotal);
        if (figuresPercentTotalMirrorEl) figuresPercentTotalMirrorEl.textContent = formatReportNegativeDisplay(figuresPercentTotal);
        if (figuresRakebackEl) figuresRakebackEl.textContent = formatReportNegativeDisplay(totals.rakeback);
        var figuresRakebackSentEl = document.getElementById("adminReportFiguresRakebackSent");
        var figuresRakebackDifferenceEl = document.getElementById("adminReportFiguresRakebackDifference");
        if (figuresRakebackSentEl) figuresRakebackSentEl.textContent = Number.isFinite(sentRakeback) ? formatReportRubleNumber(sentRakeback) : "—";
        if (figuresRakebackDifferenceEl) {
          figuresRakebackDifferenceEl.textContent = Number.isFinite(rakebackDifference)
            ? (rakebackDifference > 0 ? "+" : "") + formatReportRubleNumber(rakebackDifference)
            : "—";
          figuresRakebackDifferenceEl.setAttribute("data-match", rakebackDifference === 0 ? "1" : "0");
        }
        if (figuresBonusesEl) figuresBonusesEl.textContent = formatReportNegativeDisplay(totals.bonuses);
        var figuresRafflesTicketsEl = document.getElementById("adminReportFiguresRafflesTickets");
        var figuresRafflesCashEl = document.getElementById("adminReportFiguresRafflesCash");
        var figuresDailyPokerEl = document.getElementById("adminReportFiguresDailyPoker");
        if (figuresRafflesTicketsEl) figuresRafflesTicketsEl.textContent = formatReportNegativeDisplay(calculationWeekStatsTotals.raffleTickets);
        if (figuresRafflesCashEl) figuresRafflesCashEl.textContent = formatReportNegativeDisplay(calculationWeekStatsTotals.raffleCash);
        if (figuresDailyPokerEl) figuresDailyPokerEl.textContent = formatReportNegativeDisplay(calculationWeekStatsTotals.dailyPoker);
        if (calculationWeekStatsAvailability.raffles == null) {
          if (figuresRafflesTicketsEl) figuresRafflesTicketsEl.textContent = "…";
          if (figuresRafflesCashEl) figuresRafflesCashEl.textContent = "…";
        } else if (calculationWeekStatsAvailability.raffles === false) {
          if (figuresRafflesTicketsEl) figuresRafflesTicketsEl.textContent = "Ошибка";
          if (figuresRafflesCashEl) figuresRafflesCashEl.textContent = "Ошибка";
        }
        if (calculationWeekStatsAvailability.dailyPoker == null && figuresDailyPokerEl) figuresDailyPokerEl.textContent = "…";
        else if (calculationWeekStatsAvailability.dailyPoker === false && figuresDailyPokerEl) figuresDailyPokerEl.textContent = "Ошибка";
        if (figuresPreviousRakebackEl) figuresPreviousRakebackEl.textContent = formatReportNegativeDisplay(totals.previousRakeback);
        if (figuresSalaryEl) figuresSalaryEl.textContent = formatReportNegativeDisplay(totals.anyaSalary);
        var figuresBackingReturnInput = document.getElementById("adminReportFiguresBackingReturn");
        var figuresRafflesTicketsReturnInput = document.getElementById("adminReportFiguresRafflesTicketsReturn");
        var figuresRafflesCashReturnInput = document.getElementById("adminReportFiguresRafflesCashReturn");
        var raffleTicketsReturn = parseReportNumber(calculationWeekStatsTotals.raffleTicketsReturn) + parseReportNumber(figuresRafflesTicketsReturnInput ? figuresRafflesTicketsReturnInput.value : "");
        var raffleCashReturn = parseReportNumber(calculationWeekStatsTotals.raffleCashReturn) + parseReportNumber(figuresRafflesCashReturnInput ? figuresRafflesCashReturnInput.value : "");
        var dailyPokerReturn = parseReportNumber(calculationWeekStatsTotals.dailyPokerReturn) + parseReportNumber(figuresBackingReturnInput ? figuresBackingReturnInput.value : "");
        var figuresBackingReturn = raffleTicketsReturn + raffleCashReturn + dailyPokerReturn;
        var figuresBonusesTotalEl = document.getElementById("adminReportFiguresBonusesTotal");
        var figuresBonusesExpenses =
          Math.abs(parseReportNumber(totals.bonuses)) +
          Math.abs(parseReportNumber(calculationWeekStatsTotals.raffles)) +
          Math.abs(parseReportNumber(calculationWeekStatsTotals.dailyPoker));
        var figuresBonusesNet = figuresBonusesExpenses - figuresBackingReturn;
        if (figuresBonusesTotalEl) {
          figuresBonusesTotalEl.textContent = figuresBonusesNet < 0
            ? "+" + formatReportRubleNumber(Math.abs(figuresBonusesNet))
            : formatReportNegativeDisplay(figuresBonusesNet);
        }
        var returnOutputs = document.querySelectorAll("[data-admin-report-figures-return-auto]");
        if (returnOutputs && returnOutputs.length) {
          returnOutputs.forEach(function (output) {
            var kind = output.getAttribute("data-admin-report-figures-return-auto");
            var base = kind === "raffleTickets"
              ? calculationWeekStatsTotals.raffleTicketsReturn
              : kind === "raffleCash"
                ? calculationWeekStatsTotals.raffleCashReturn
                : calculationWeekStatsTotals.dailyPokerReturn;
            var availability = kind === "dailyPoker"
              ? calculationWeekStatsAvailability.dailyPoker
              : calculationWeekStatsAvailability.raffles;
            output.textContent = availability == null
              ? "Авто: …"
              : availability === false
                ? "Авто: ошибка"
                : "Авто: " + formatReportRubleNumber(base);
          });
        }
        var figuresExpensesTotal =
          Math.abs(parseReportNumber(figuresPercentTotal)) +
          Math.abs(parseReportNumber(totals.rakeback)) +
          Math.abs(parseReportNumber(totals.bonuses)) +
          Math.abs(parseReportNumber(calculationWeekStatsTotals.raffles)) +
          Math.abs(parseReportNumber(calculationWeekStatsTotals.dailyPoker)) +
          Math.abs(parseReportNumber(totals.previousRakeback)) +
          Math.abs(parseReportNumber(totals.anyaSalary));
        var figuresRemainder = figuresRakeTotal - figuresExpensesTotal + figuresBackingReturn;
        var figuresExpensesTotalEl = document.getElementById("adminReportFiguresExpensesTotal");
        var figuresReturnsTotalEl = document.getElementById("adminReportFiguresReturnsTotal");
        var figuresRemainderEl = document.getElementById("adminReportFiguresRemainder");
        if (figuresExpensesTotalEl) figuresExpensesTotalEl.textContent = formatReportNegativeDisplay(figuresExpensesTotal);
        if (figuresReturnsTotalEl) figuresReturnsTotalEl.textContent = formatReportRubleNumber(figuresBackingReturn);
        if (figuresRemainderEl) figuresRemainderEl.textContent = formatReportRubleNumber(figuresRemainder);
        if (calculationWeekStatsAvailability.raffles !== true || calculationWeekStatsAvailability.dailyPoker !== true) {
          if (figuresBonusesTotalEl) figuresBonusesTotalEl.textContent = "—";
          if (figuresExpensesTotalEl) figuresExpensesTotalEl.textContent = "—";
          if (figuresReturnsTotalEl) figuresReturnsTotalEl.textContent = "—";
          if (figuresRemainderEl) figuresRemainderEl.textContent = "—";
        }
        if (figuresRemainderEl && figuresRemainderEl.parentElement) {
          figuresRemainderEl.parentElement.classList.toggle("admin-report-calculations__field--negative", figuresRemainder < 0);
          figuresRemainderEl.parentElement.classList.toggle("admin-report-calculations__field--positive", figuresRemainder >= 0);
        }
        var approxAgentsRake = getFiguresExtraRakeTotal();
        var approxIssuedRake = getIssuedRakebackReportRakeTotal();
        var approxBase = getApproxFiguresRakebackBase();
        var approxRate = getApproxFiguresRakebackRate();
        var approxRakeback = getApproxFiguresRakebackAmount();
        var includeApproxRakeback = !!(figuresApproxRakebackEnabledInput && figuresApproxRakebackEnabledInput.checked);
        var figuresApproxDetailEl = document.querySelector("#adminReportCalcRakeCard .admin-report-calculations__approx-detail");
        var figuresApproxRatesEl = document.querySelector("#adminReportCalcRakeCard .admin-report-calculations__rate-options");
        var figuresApproxHeaderEl = figuresApproxRakebackEl && figuresApproxRakebackEl.closest
          ? figuresApproxRakebackEl.closest(".admin-report-calculations__field--checkbox-total")
          : null;
        if (figuresApproxDetailEl) figuresApproxDetailEl.hidden = !includeApproxRakeback;
        if (figuresApproxRatesEl) figuresApproxRatesEl.hidden = !includeApproxRakeback;
        if (figuresApproxHeaderEl) figuresApproxHeaderEl.classList.toggle("admin-report-calculations__field--checkbox-total-enabled", includeApproxRakeback);
        if (figuresApproxRakebackEl) {
          figuresApproxRakebackEl.hidden = !includeApproxRakeback;
          figuresApproxRakebackEl.textContent = includeApproxRakeback ? formatReportRubleNumber(approxRakeback) : "0";
        }
        if (figuresApproxTotalRakeEl) figuresApproxTotalRakeEl.textContent = formatReportRubleNumber(figuresRakeTotal);
        if (figuresApproxAgentsRakeEl) figuresApproxAgentsRakeEl.textContent = formatReportRubleNumber(approxAgentsRake);
        if (figuresApproxIssuedRakeEl) figuresApproxIssuedRakeEl.textContent = formatReportRubleNumber(approxIssuedRake);
        if (figuresApproxFormulaEl) figuresApproxFormulaEl.textContent = formatReportRubleNumber(approxBase) + " × " + formatReportInputNumber(approxRate) + "% = " + formatReportRubleNumber(approxRakeback);
        if (figuresGrandTotalEl) {
          if (calculationWeekStatsAvailability.raffles !== true || calculationWeekStatsAvailability.dailyPoker !== true) {
            figuresGrandTotalEl.textContent = "—";
          } else {
            var grand =
              figuresRakeTotal +
              figuresPercentTotal -
              parseReportNumber(totals.rakeback) -
              parseReportNumber(totals.bonuses) -
              parseReportNumber(calculationWeekStatsTotals.raffles) -
              parseReportNumber(calculationWeekStatsTotals.dailyPoker) -
              parseReportNumber(totals.previousRakeback) -
              parseReportNumber(totals.anyaSalary) -
              parseReportNumber(figuresRomanPaidInput ? figuresRomanPaidInput.value : "") +
              parseReportNumber(figuresWinLossInput ? figuresWinLossInput.value : "") -
              parseReportNumber(figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "") -
              getFiguresExtraAmountTotal() +
              figuresBackingReturn +
              (includeApproxRakeback ? approxRakeback : 0);
            figuresGrandTotalEl.textContent = formatReportRubleNumber(grand);
          }
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

      function setCalculationTotalsWithCurrentRakeback(totals, week) {
        totals = totals || {};
        if (totals.sentRakeback == null) totals.sentRakeback = Number(totals.rakeback) || 0;
        setCalculationTotalsText(totals);
        if (!week || week.key !== "current_week" || typeof loadCurrentRakebackCalculationTotals !== "function") return;
        var expectedWeekStart = week.start;
        Promise.resolve(loadCurrentRakebackCalculationTotals()).then(function (rakebackTotals) {
          var activeWeek = getCalculationWeekMeta();
          if (!activeWeek || activeWeek.key !== "current_week" || activeWeek.start !== expectedWeekStart) return;
          var currentAmount = Number(rakebackTotals && rakebackTotals.amount);
          if (!Number.isFinite(currentAmount)) return;
          var updatedTotals = {};
          Object.keys(totals).forEach(function (key) { updatedTotals[key] = totals[key]; });
          updatedTotals.rakeback = currentAmount;
          setCalculationTotalsText(updatedTotals);
        }).catch(function () {});
      }

      function syncCalculationPeriodLabels(week) {
        var label = week && week.label ? String(week.label) : "выбранный период";
        if (calculationsWeekLabelEl) calculationsWeekLabelEl.textContent = label;
        var rakebackLabel = document.getElementById("adminReportFiguresRakebackLabel");
        if (rakebackLabel) rakebackLabel.textContent = "РБ в CRM · " + label;
      }

      function resetCalculationPeriodDisplay(week) {
        syncCalculationPeriodLabels(week);
        var nextPeriodKey = week
          ? [week.key || "current_week", week.from || "", week.to || "", week.start || "", week.end || ""].join(":")
          : "unknown";
        // Revalidation of the same period must not flash zeroes over already
        // loaded values. A real period change still starts from a clean slate.
        if (calculationDisplayedPeriodKey === nextPeriodKey) return;
        calculationDisplayedPeriodKey = nextPeriodKey;
        calculationWeekStatsAvailability = { raffles: null, dailyPoker: null };
        calculationWeekStatsTotals = { raffles: 0, raffleTickets: 0, raffleCash: 0, dailyPoker: 0, raffleTicketsReturn: 0, raffleCashReturn: 0, dailyPokerReturn: 0 };
        var poker21RakeInput = figuresRakeInputs && figuresRakeInputs[0];
        if (poker21RakeInput) {
          poker21RakeInput.value = "";
          poker21RakeInput.removeAttribute("data-manual-rake");
        }
        setCalculationTotalsText({ deposit: 0, bonuses: 0, previousRakeback: 0, rakeback: 0, sentRakeback: 0, cashout: 0, botExchipCashout: 0, anyaSalary: 0 });
      }

      function sumCalculationReports(items, week, alreadyScopedToWeek) {
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
          if (!alreadyScopedToWeek && (!t || t < week.start || t > week.end)) return;
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
        calculationsArchiveEl.innerHTML = sortedWeekStarts.length
          ? '<details class="admin-report-calculations__archive-details admin-report-calculations__archive-details--root" open data-admin-report-calculation-archive-deferred="1">' +
              '<summary class="admin-report-calculations__archive-summary"><span>Архив</span><b class="admin-report-calculations__archive-summary-action">Закрыть архив</b></summary>' +
              '<div class="admin-report-calculations__archive-inner">' + sortedWeekStarts.map(function (weekStart) {
                return renderCalculationArchiveWeek(source, weekStart);
              }).join("") + "</div>" +
            "</details>"
          : "";
      }

      function renderCalculationArchiveDeferred(hasArchive) {
        if (!calculationsArchiveEl) return;
        calculationsArchiveEl.hidden = !hasArchive;
        if (!hasArchive) {
          calculationsArchiveEl.innerHTML = "";
          return;
        }
        calculationsArchiveEl.innerHTML =
          '<details class="admin-report-calculations__archive-details" data-admin-report-calculation-archive-deferred="1">' +
            '<summary class="admin-report-calculations__archive-summary">Архив</summary>' +
            '<div class="admin-report-calculations__archive-inner">' +
              '<p class="admin-report-calculations__archive-empty">Откройте архив, чтобы загрузить прошлые недели.</p>' +
            "</div>" +
          "</details>";
      }

      function requestCalculationArchiveLoad() {
        if (!calculationArchiveRequestBase || !calculationArchiveRequestQuery) return;
        loadCalculationArchiveReports(calculationArchiveRequestBase, calculationArchiveRequestQuery);
      }

      function bindCalculationArchiveDeferredLoader() {
        if (!calculationsArchiveEl || calculationsArchiveEl.dataset.adminReportCalculationArchiveLazyBound === "1") return;
        calculationsArchiveEl.dataset.adminReportCalculationArchiveLazyBound = "1";
        calculationsArchiveEl.addEventListener("toggle", function (event) {
          var target = event.target;
          if (!target || !target.matches || !target.matches("[data-admin-report-calculation-archive-deferred]")) return;
          if (!target.open) return;
          requestCalculationArchiveLoad();
        }, true);
        calculationsArchiveEl.addEventListener("click", function (event) {
          var summary = event.target && event.target.closest ? event.target.closest("[data-admin-report-calculation-archive-deferred] > summary") : null;
          if (!summary) return;
          requestCalculationArchiveLoad();
        });
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

      function loadCalculationWeekStats(base, q, week) {
        var requestSeq = ++calculationPeriodRequestSeq;
        var businessDateShiftMs = -3 * 60 * 60 * 1000;
        var from = String(week && week.from || "") || (week && !week.all ? new Date(week.start + businessDateShiftMs).toISOString().slice(0, 10) : "");
        var to = String(week && week.to || "") || (week && !week.all ? new Date(week.end + businessDateShiftMs).toISOString().slice(0, 10) : "");
        // Use the report API for the compact raffle totals. It shares the same
        // admin authorization as this screen and returns ticket/cash issues and
        // their automatic returns without loading the full CRM population.
        var raffleUrl = base.replace(/\/$/, "") + "/api/admin-report-shifts" + q;
        raffleUrl = appendCalculationQueryParam(raffleUrl, "raffleSummary", "1");
        var calculationsAccessToken = typeof window.pokerAdminMenuAccessToken === "function"
          ? window.pokerAdminMenuAccessToken("calculations")
          : "";
        if (calculationsAccessToken) {
          raffleUrl = appendCalculationQueryParam(raffleUrl, "menuAccessToken", calculationsAccessToken);
        }
        var raffleFallbackUrl = base.replace(/\/$/, "") + "/api/player-crm" + q;
        raffleFallbackUrl = appendCalculationQueryParam(raffleFallbackUrl, "mode", "raffle-summary");
        if (calculationsAccessToken) {
          raffleFallbackUrl = appendCalculationQueryParam(raffleFallbackUrl, "menuAccessToken", calculationsAccessToken);
        }
        var dailyPokerUrl = base.replace(/\/$/, "") + "/api/promo/daily-poker/winners" + q;
        dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "limit", "1");
        dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "summary", "1");
        dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "balanceSummary", "1");
        if (from && to) {
          raffleUrl = appendCalculationQueryParam(raffleUrl, "from", from);
          raffleUrl = appendCalculationQueryParam(raffleUrl, "to", to);
          raffleFallbackUrl = appendCalculationQueryParam(raffleFallbackUrl, "from", from);
          raffleFallbackUrl = appendCalculationQueryParam(raffleFallbackUrl, "to", to);
          dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "from", from);
          dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "to", to);
          dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "balanceFrom", from);
          dailyPokerUrl = appendCalculationQueryParam(dailyPokerUrl, "balanceTo", to);
        }
        var fetchStats = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout : fetch;
        function fetchJson(url, timeoutMs) {
          return fetchStats(url, { cache: "no-store" }, timeoutMs).then(function (response) {
            if (!response || !response.ok) throw new Error("stats " + (response && response.status || "failed"));
            return response.json();
          });
        }
        var raffleRequest = fetchJson(raffleUrl, 25000).catch(function () {
          return fetchJson(raffleFallbackUrl, 25000);
        }).then(function (rafflePayload) {
          if (requestSeq !== calculationPeriodRequestSeq) return;
          var raffleStats = rafflePayload && (
            rafflePayload.raffles ||
            rafflePayload.statsSummary && rafflePayload.statsSummary.raffles
          );
          if (!raffleStats || raffleStats.available === false) throw new Error("raffle stats unavailable");
          calculationWeekStatsAvailability.raffles = true;
          calculationWeekStatsTotals.raffles = Number(raffleStats.issuedPrizeAmount) || 0;
          calculationWeekStatsTotals.raffleTickets = Number(raffleStats.issuedTicketAmount) || 0;
          calculationWeekStatsTotals.raffleCash = Number(raffleStats.issuedCashAmount) || 0;
          calculationWeekStatsTotals.raffleTicketsReturn = Math.max(0,
            (Number(raffleStats.returnedTicketAmount) || 0) -
            (Number(raffleStats.manualReturnedTicketAmount) || 0)
          );
          calculationWeekStatsTotals.raffleCashReturn = Number(
            raffleStats.returnedCashAmount != null ? raffleStats.returnedCashAmount : raffleStats.returnedAmount
          ) || 0;
          updateFiguresTotals({ syncExtras: false });
        }).catch(function () {
          if (requestSeq !== calculationPeriodRequestSeq) return;
          // Keep a previously successful value during a transient refresh
          // failure. Only an initial load with no usable value becomes Error.
          if (calculationWeekStatsAvailability.raffles !== true) calculationWeekStatsAvailability.raffles = false;
          updateFiguresTotals({ syncExtras: false });
        });
        var dailyPokerRequest = fetchJson(dailyPokerUrl, 25000).then(function (dailyPokerStats) {
          if (requestSeq !== calculationPeriodRequestSeq) return;
          calculationWeekStatsAvailability.dailyPoker = true;
          calculationWeekStatsTotals.dailyPoker = Number(dailyPokerStats && dailyPokerStats.bonusBalanceDebited) || 0;
          calculationWeekStatsTotals.dailyPokerReturn = Number(dailyPokerStats && dailyPokerStats.bonusBalanceReturned) || 0;
          updateFiguresTotals({ syncExtras: false });
        }).catch(function () {
          if (requestSeq !== calculationPeriodRequestSeq) return;
          if (calculationWeekStatsAvailability.dailyPoker !== true) calculationWeekStatsAvailability.dailyPoker = false;
          updateFiguresTotals({ syncExtras: false });
        });
        return Promise.all([raffleRequest, dailyPokerRequest]);
      }

      function fetchCalculationSummary(base, q, scope, week, forceRefresh) {
        var businessDateShiftMs = -3 * 60 * 60 * 1000;
        var from = String(week && week.from || "") || (week && !week.all ? new Date(week.start + businessDateShiftMs).toISOString().slice(0, 10) : "");
        var to = String(week && week.to || "") || (week && !week.all ? new Date(week.end + businessDateShiftMs).toISOString().slice(0, 10) : "");
        var url = base.replace(/\/$/, "") + "/api/admin-report-shifts" + q;
        url = appendCalculationQueryParam(url, "calculationSummary", "1");
        url = appendCalculationQueryParam(url, "includeRaffles", "0");
        // Report totals must not wait for the much heavier bonus-ledger range
        // aggregation. Daily Poker and raffles hydrate below after the compact
        // report payload has already rendered.
        url = appendCalculationQueryParam(url, "includeDailyPoker", "0");
        url = appendCalculationQueryParam(url, "scope", scope);
        if (forceRefresh) url = appendCalculationQueryParam(url, "refresh", "1");
        if (from && to) {
          url = appendCalculationQueryParam(url, "from", from);
          url = appendCalculationQueryParam(url, "to", to);
        }
        var fetchSummary = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout : fetch;
        return fetchSummary(url, { cache: "no-store" }, 20000).then(function (response) {
          if (!response || !response.ok) throw new Error("calculation summary failed");
          return response.json();
        });
      }

      function applyCalculationSummaryStats(data) {
        var raffleStats = data && data.raffles;
        var dailyPokerStats = data && data.dailyPoker;
        if (raffleStats || dailyPokerStats) {
          calculationWeekStatsAvailability = {
            raffles: raffleStats ? true : calculationWeekStatsAvailability.raffles,
            dailyPoker: dailyPokerStats ? true : calculationWeekStatsAvailability.dailyPoker,
          };
          calculationWeekStatsTotals = {
            raffles: raffleStats ? Number(raffleStats.issuedPrizeAmount) || 0 : calculationWeekStatsTotals.raffles,
            raffleTickets: raffleStats ? Number(raffleStats.issuedTicketAmount) || 0 : calculationWeekStatsTotals.raffleTickets,
            raffleCash: raffleStats ? Number(raffleStats.issuedCashAmount) || 0 : calculationWeekStatsTotals.raffleCash,
            dailyPoker: dailyPokerStats ? Number(dailyPokerStats.bonusBalanceDebited) || 0 : calculationWeekStatsTotals.dailyPoker,
            raffleTicketsReturn: raffleStats ? Math.max(0,
              (Number(raffleStats.returnedTicketAmount) || 0) -
              (Number(raffleStats.manualReturnedTicketAmount) || 0)
            ) : calculationWeekStatsTotals.raffleTicketsReturn,
            raffleCashReturn: raffleStats ? Number(raffleStats.returnedCashAmount != null ? raffleStats.returnedCashAmount : raffleStats.returnedAmount) || 0 : calculationWeekStatsTotals.raffleCashReturn,
            dailyPokerReturn: dailyPokerStats ? Number(dailyPokerStats.bonusBalanceReturned) || 0 : calculationWeekStatsTotals.dailyPokerReturn,
          };
        }
        var poker21Rake = data && data.poker21Rake != null ? Number(data.poker21Rake) : NaN;
        var poker21RakeInput = figuresRakeInputs && figuresRakeInputs[0];
        if (poker21RakeInput && Number.isFinite(poker21Rake) && poker21RakeInput.getAttribute("data-manual-rake") !== "1") {
          poker21RakeInput.value = formatReportInputNumber(poker21Rake);
          poker21RakeInput.setAttribute("data-auto-rake", "poker21");
        }
        updateFiguresTotals({ syncExtras: false });
      }

      function applyCalculationSummaryPayload(data) {
        if (!data || data.ok === false) return false;
        var week = getCalculationWeekMeta();
        var items = Array.isArray(data.reports) ? data.reports : [];
        applyCalculationSummaryStats(data);
        if (week && week.key && week.key !== "current_week") {
          var cacheKey = [week.key, week.from, week.to].join(":");
          calculationPeriodReportsCache[cacheKey] = items;
        } else {
          calculationReportsCache = items;
        }
        setCalculationTotalsWithCurrentRakeback(sumCalculationReports(items, week, true), week);
        return true;
      }

      function loadCalculationArchiveReports(base, q) {
        if (!calculationsArchiveEl || calculationArchiveLoading || calculationArchiveLoaded) return;
        calculationArchiveLoading = true;
        calculationsArchiveEl.hidden = false;
        calculationsArchiveEl.innerHTML =
          '<details class="admin-report-calculations__archive-details" open>' +
            '<summary class="admin-report-calculations__archive-summary">Архив</summary>' +
            '<div class="admin-report-calculations__archive-inner">' +
              '<p class="admin-report-calculations__archive-empty">Загружаю архив…</p>' +
            "</div>" +
          "</details>";
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
            renderCalculationArchiveDeferred(true);
          });
      }

      function loadCalculationsReports(forceRefresh) {
        if (!canViewCalculationsReports()) return;
        var reportsRequestSeq = ++calculationReportsRequestSeq;
        var week = getCalculationWeekMeta();
        resetCalculationPeriodDisplay(week);
        var useAllReports = !!(week && week.key && week.key !== "current_week");
        var periodCacheKey = week && [week.key, week.from, week.to].join(":");
        var cachedPeriodReports = useAllReports && periodCacheKey && calculationPeriodReportsCache
          ? calculationPeriodReportsCache[periodCacheKey]
          : null;
        var currentCache = useAllReports && Array.isArray(cachedPeriodReports)
          ? cachedPeriodReports
          : (Array.isArray(calculationReportsCache) ? calculationReportsCache : []);
        if (currentCache.length) setCalculationTotalsWithCurrentRakeback(sumCalculationReports(currentCache, week, !useAllReports), week);
        renderCalculationArchive(calculationArchiveReportsCache);
        var base = typeof getApiBase === "function" ? getApiBase() : "";
        if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (!calculationInitialLoadRetryTimer && calculationInitialLoadRetryCount < 12) {
            calculationInitialLoadRetryCount += 1;
            calculationInitialLoadRetryTimer = setTimeout(function () {
              calculationInitialLoadRetryTimer = null;
              loadCalculationsReports();
            }, calculationInitialLoadRetryCount < 4 ? 350 : 800);
          }
          return;
        }
        calculationInitialLoadRetryCount = 0;
        if (calculationInitialLoadRetryTimer) {
          clearTimeout(calculationInitialLoadRetryTimer);
          calculationInitialLoadRetryTimer = null;
        }
        var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
        calculationArchiveRequestBase = base;
        calculationArchiveRequestQuery = q;
        bindCalculationArchiveDeferredLoader();
        if (!forceRefresh && useAllReports && Array.isArray(cachedPeriodReports)) {
          fetchCalculationSummary(base, q, "all", week, forceRefresh).then(function (data) {
            if (reportsRequestSeq !== calculationReportsRequestSeq) return;
            applyCalculationSummaryStats(data);
            loadCalculationWeekStats(base, q, week);
          }).catch(function () {
            if (reportsRequestSeq !== calculationReportsRequestSeq) return;
            loadCalculationWeekStats(base, q, week);
          });
          return;
        }
        fetchCalculationSummary(base, q, useAllReports ? "all" : "currentWeek", week, forceRefresh)
          .catch(function () {
            if (reportsRequestSeq !== calculationReportsRequestSeq) return null;
            return fetchCalculationReports(base, q, useAllReports ? "all" : "currentWeek");
          })
          .then(function (data) {
            if (reportsRequestSeq !== calculationReportsRequestSeq) return null;
            applyCalculationSummaryStats(data);
            // Raffle aggregation is the slowest part of the calculation view.
            // Let the report totals render first and hydrate raffle figures in
            // the background instead of blocking the whole tab.
            loadCalculationWeekStats(base, q, week);
            var items = data && data.ok && Array.isArray(data.reports) ? data.reports : [];
            if (useAllReports || items.length) return data;
            // The authoritative week boundary is Monday 06:00 MSK. If the
            // optimized currentWeek endpoint is empty around the handover,
            // fall back to the full list and filter it below with that exact
            // boundary instead of showing false zeroes.
            return fetchCalculationReports(base, q, "all");
          })
          .then(function (data) {
            if (reportsRequestSeq !== calculationReportsRequestSeq || !data) return;
            var items = (data && data.ok && Array.isArray(data.reports)) ? data.reports : [];
            if (useAllReports && periodCacheKey) calculationPeriodReportsCache[periodCacheKey] = Array.isArray(items) ? items : [];
            else calculationReportsCache = Array.isArray(items) ? items : [];
            var activeWeek = getCalculationWeekMeta();
            var activeUsesAllReports = !!(activeWeek && activeWeek.key && activeWeek.key !== "current_week");
            var activePeriodCacheKey = activeWeek && [activeWeek.key, activeWeek.from, activeWeek.to].join(":");
            if (activeUsesAllReports === useAllReports && (!useAllReports || activePeriodCacheKey === periodCacheKey)) {
              setCalculationTotalsWithCurrentRakeback(
                sumCalculationReports(
                  useAllReports ? calculationPeriodReportsCache[periodCacheKey] : calculationReportsCache,
                  activeWeek,
                  true
                ),
                activeWeek
              );
            }
            if (data && data.hasArchive) {
              if (calculationArchiveLoaded && Array.isArray(calculationArchiveReportsCache) && calculationArchiveReportsCache.length) {
                renderCalculationArchive(calculationArchiveReportsCache);
              } else {
                calculationArchiveLoaded = false;
                renderCalculationArchiveDeferred(true);
              }
            }
            else {
              calculationArchiveLoaded = true;
              calculationArchiveReportsCache = [];
              renderCalculationArchive([]);
            }
          })
          .catch(function () {
            if (reportsRequestSeq !== calculationReportsRequestSeq) return;
            if (!currentCache.length) setCalculationTotalsWithCurrentRakeback({}, getCalculationWeekMeta());
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
        if (text) {
          setTimeout(function () {
            if (statusEl && statusEl.textContent === text) statusEl.textContent = "";
          }, 1800);
        }
      }

      function setFiguresStatus(text, tone) {
        if (!figuresSaveStatusEl) return;
        figuresSaveStatusEl.textContent = text || "";
        if (tone) figuresSaveStatusEl.setAttribute("data-tone", tone);
        else figuresSaveStatusEl.removeAttribute("data-tone");
        if (figuresStatusTimer) clearTimeout(figuresStatusTimer);
        if (text) {
          figuresStatusTimer = setTimeout(function () {
            if (figuresSaveStatusEl && figuresSaveStatusEl.textContent === text) {
              figuresSaveStatusEl.textContent = "";
              figuresSaveStatusEl.removeAttribute("data-tone");
            }
          }, tone === "error" ? 5000 : 3000);
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
        var figuresInputsRoot = calculationsRoot || figuresRoot;
        if (figuresInputsRoot) {
          figuresInputsRoot.querySelectorAll(
            "#adminReportCalcRakeCard input, #adminReportCalcFigures input"
          ).forEach(function (input) {
            var type = String(input.type || "").toLowerCase();
            if (type === "checkbox" || type === "radio") {
              input.disabled = figuresSavedLocked;
              return;
            }
            var alwaysReadonly = input.hasAttribute("data-admin-report-figures-extra-amount");
            input.readOnly = alwaysReadonly || figuresSavedLocked;
          });
        }
        if (figuresDateInput) figuresDateInput.disabled = figuresSavedLocked;
        var figuresDateButton = document.getElementById("adminReportFiguresDateButton");
        if (figuresDateButton) figuresDateButton.disabled = figuresSavedLocked;
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

      function requestServerCalculationDraft(action, draft, group) {
        var base = typeof getAdminReportApiBase === "function" ? getAdminReportApiBase() : "";
        if (!base && window.location && window.location.origin && window.location.origin !== "null") {
          base = window.location.origin;
        }
        if (typeof buildAuthBody !== "function" || typeof fetch !== "function") {
          return Promise.reject(new Error("calculation draft sync unavailable"));
        }
        var calculationRangeMeta = getCalculationWeekMeta();
        var calculationRangeStart = calculationRangeMeta.draftKey != null ? calculationRangeMeta.draftKey : calculationRangeMeta.start;
        var payload = {
          action: action,
          weekStart: String(calculationRangeStart != null ? calculationRangeStart : ""),
        };
        var calculationsAccessToken = typeof window.pokerAdminMenuAccessToken === "function"
          ? window.pokerAdminMenuAccessToken("calculations")
          : "";
        var crmAccessToken = typeof window.pokerAdminMenuAccessToken === "function"
          ? window.pokerAdminMenuAccessToken("crm")
          : "";
        var crmHost = document.getElementById("playerCrmCalculationsHost");
        var useCrmEndpoint = !!(crmAccessToken && crmHost && calculationsRoot && crmHost.contains(calculationsRoot));
        if (!calculationsAccessToken) calculationsAccessToken = crmAccessToken;
        if (calculationsAccessToken) payload.menuAccessToken = calculationsAccessToken;
        if (draft) payload.calculationDraft = draft;
        if (group) payload.calculationDraftGroup = String(group);
        var fetchDraft = typeof pokerFetchWithTimeout === "function" ? pokerFetchWithTimeout : fetch;
        return Promise.resolve().then(function () {
          var authenticatedPayload = buildAuthBody(payload);
          var endpointPaths = useCrmEndpoint
            ? ["/api/player-crm", "/api/admin-report-shifts"]
            : ["/api/admin-report-shifts"];
          var lastError = null;
          function attempt(index) {
            if (index >= endpointPaths.length) return Promise.reject(lastError || new Error("Не удалось сохранить расчёты"));
            return fetchDraft(base.replace(/\/$/, "") + endpointPaths[index], {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(authenticatedPayload),
              cache: "no-store",
            }, 15000).then(function (response) {
              if (!response) throw new Error("Сервер не ответил");
              return response.json().catch(function () { return {}; }).then(function (data) {
                if (!response.ok || !data || data.ok !== true) {
                  var error = new Error(data && data.error || ("Ошибка сохранения: " + response.status));
                  error.status = response.status;
                  throw error;
                }
                return data;
              });
            }).catch(function (error) {
              lastError = error;
              return attempt(index + 1);
            });
          }
          return attempt(0);
        });
      }

      function loadServerCalculationDraft() {
        var requestSeq = ++calculationDraftRequestSeq;
        var expectedDraftKey = getCalculationDraftKey();
        return requestServerCalculationDraft("calculation_draft_load").then(function (data) {
          if (requestSeq !== calculationDraftRequestSeq || getCalculationDraftKey() !== expectedDraftKey) return false;
          var stored = data && data.calculationDraft;
          var draft = stored && stored.draft;
          if (!draft || typeof draft !== "object") {
            var localRaw = null;
            try {
              localRaw = window.localStorage ? window.localStorage.getItem(getCalculationDraftKey()) : null;
              draft = localRaw ? JSON.parse(localRaw) : null;
            } catch (eLocal) {
              draft = null;
            }
            if (!draft || typeof draft !== "object") return false;
            return saveServerCalculationDraft(draft).then(function () { return true; });
          }
          try {
            if (window.localStorage) window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(draft));
          } catch (e) {}
          return applyCalculationsDraft(draft);
        }).catch(function () {
          return false;
        });
      }

      function saveServerCalculationDraft(draft, group) {
        return requestServerCalculationDraft("calculation_draft_save", draft, group);
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
          figuresDate: figuresDateInput ? figuresDateInput.value : "",
          cash: valuesFrom(calculationsCashInputs),
          roomWinLoss: valuesFrom(calculationsWinLossInputs),
          rake: valuesFrom(figuresRakeInputs),
          manualPoker21Rake: !!(figuresRakeInputs && figuresRakeInputs[0] && figuresRakeInputs[0].getAttribute("data-manual-rake") === "1"),
          romanPaid: figuresRomanPaidInput ? figuresRomanPaidInput.value : "",
          winLoss: figuresWinLossInput ? figuresWinLossInput.value : "",
          agentsPaid: figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "",
          backingReturn: (document.getElementById("adminReportFiguresBackingReturn") || {}).value || "",
          raffleTicketsReturn: (document.getElementById("adminReportFiguresRafflesTicketsReturn") || {}).value || "",
          raffleCashReturn: (document.getElementById("adminReportFiguresRafflesCashReturn") || {}).value || "",
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
        if (figuresDateInput) figuresDateInput.value = draft.figuresDate || localCalculationDateValue();
        if (figuresDateInput) figuresDateInput.dispatchEvent(new Event("change"));
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
            if (!input) return;
            if (index === 0 && input.getAttribute("data-auto-rake") === "poker21") {
              if (draft.manualPoker21Rake === true) {
                input.value = rake[index] != null ? rake[index] : "";
                input.setAttribute("data-manual-rake", "1");
              } else {
                input.removeAttribute("data-manual-rake");
              }
              return;
            }
            input.value = rake[index] != null ? rake[index] : "";
          });
        }
        if (figuresRomanPaidInput) figuresRomanPaidInput.value = draft.romanPaid != null ? draft.romanPaid : "";
        if (figuresWinLossInput) figuresWinLossInput.value = draft.winLoss != null ? draft.winLoss : "";
        if (figuresAgentsPaidInput) figuresAgentsPaidInput.value = draft.agentsPaid != null ? draft.agentsPaid : "";
        var figuresBackingReturnInput = document.getElementById("adminReportFiguresBackingReturn");
        if (figuresBackingReturnInput) figuresBackingReturnInput.value = draft.backingReturn != null ? draft.backingReturn : "";
        var figuresRafflesTicketsReturnInput = document.getElementById("adminReportFiguresRafflesTicketsReturn");
        if (figuresRafflesTicketsReturnInput) figuresRafflesTicketsReturnInput.value = draft.raffleTicketsReturn != null ? draft.raffleTicketsReturn : "";
        var figuresRafflesCashReturnInput = document.getElementById("adminReportFiguresRafflesCashReturn");
        if (figuresRafflesCashReturnInput) figuresRafflesCashReturnInput.value = draft.raffleCashReturn != null ? draft.raffleCashReturn : "";
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
          if (figuresDateInput && !figuresDateInput.value) figuresDateInput.value = localCalculationDateValue();
          if (figuresDateInput) figuresDateInput.dispatchEvent(new Event("change"));
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

      function localCalculationDateValue() {
        var now = new Date();
        var offset = now.getTimezoneOffset() * 60000;
        return new Date(now.getTime() - offset).toISOString().slice(0, 10);
      }

      function hydrateCalculationsDraftOnce() {
        if (calculationsDraftHydrated) return;
        calculationsDraftHydrated = true;
        var loaded = loadCalculationsDraft();
        if (!loaded) {
          updateCalculationCashTotal();
          updateFiguresTotals();
        }
        loadServerCalculationDraft();
      }

      function saveCalculationsDraft(group) {
        group = group || "cash";
        var draft = collectCalculationsDraft();
        var expectedDraftKey = getCalculationDraftKey();
        try {
          if (window.localStorage) {
            window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(draft));
          }
        } catch (e) {
          setCalculationsStatus(group, "Локально не сохранено");
        }
        setCalculationsStatus(group, "Сохраняю…");
        saveServerCalculationDraft(draft, group).then(function () {
          if (getCalculationDraftKey() !== expectedDraftKey) return;
          setCalculationGroupLocked(group, true);
          setCalculationsStatus(group, "Сохранено");
        }).catch(function () {
          setCalculationsStatus(group, "Не удалось сохранить на сервере");
        });
      }

      function editCalculationsDraft(group) {
        group = group || "cash";
        setCalculationGroupLocked(group, false);
        setCalculationsStatus(group, "Редактирование");
      }

      function saveFiguresDraft() {
        var saveSeq = ++figuresSaveRequestSeq;
        var draft = collectCalculationsDraft();
        var expectedDraftKey = getCalculationDraftKey();
        try {
          if (window.localStorage) {
            window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(draft));
          }
        } catch (e) {
          setFiguresStatus("Локально не сохранено");
        }
        setFiguresStatus("Сохраняю…", "loading");
        var timeoutPromise = new Promise(function (_, reject) {
          setTimeout(function () {
            reject(new Error("calculation draft save timeout"));
          }, 12000);
        });
        return Promise.race([saveServerCalculationDraft(draft, "figures"), timeoutPromise]).then(function () {
          if (saveSeq !== figuresSaveRequestSeq) return;
          if (getCalculationDraftKey() !== expectedDraftKey) return;
          setFiguresLocked(true);
          setFiguresStatus("Сохранено");
        }).catch(function (error) {
          if (saveSeq !== figuresSaveRequestSeq) return;
          var message = error && error.message ? String(error.message) : "Не удалось сохранить — повторите";
          if (message === "calculation draft save timeout") message = "Сервер долго не отвечает — повторите";
          setFiguresStatus(message, "error");
        });
      }

      function editFiguresDraft() {
        setFiguresLocked(false);
        setFiguresStatus("Редактирование");
      }

      function resetHydration() {
        calculationsDraftHydrated = false;
        calculationDraftRequestSeq += 1;
        calculationReportsRequestSeq += 1;
        calculationPeriodRequestSeq += 1;
        calculationDisplayedPeriodKey = "";
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
        applyCalculationSummaryPayload: applyCalculationSummaryPayload,
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
