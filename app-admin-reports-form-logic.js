(function () {
  function init(scope) {
    scope = scope || {};
    with (scope) {
      function buildPayload() {
        var d = getShiftReportDateInfo();
        var getVal = function (id) {
          var el = document.getElementById(id);
          if (!el) return 0;
          return parseReportNumber(el.value);
        };
        syncRakebackTable();
        var rakebackRows = getUnaccountedRakebackReportRows();
        var rakebackTotal = sumRakebackReportRows(rakebackRows);
        if (!isFinite(rakebackTotal)) rakebackTotal = 0;
        var manualRakebackTotal = getVal("adminReportRakeback");
        var reportRakebackTotal = manualRakebackInputTouched ? manualRakebackTotal : rakebackTotal;
        if (!isFinite(reportRakebackTotal)) reportRakebackTotal = 0;
        var extraRows = modal.querySelectorAll(".admin-report-extra-row");
        var extraFields = [];
        var extraTotal = 0;
        var extraExpenseTotal = 0;
        var extraRawTotal = 0;
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
            extraRawTotal += amount;
            if (typeof isReportPreviousRakebackFieldName === "function" && isReportPreviousRakebackFieldName(name)) {
              extraExpenseTotal += amount;
            } else {
              extraTotal += amount;
            }
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
          rakeback: Math.round(reportRakebackTotal * 100) / 100,
          rakebackRows: rakebackRows,
          extraFields: extraFields
        };
        var payload =
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody(corePayload)
            : corePayload;
        var total = payload.deposit - payload.cashout + payload.prodamus + payload.robokassa + payload.romaCrypto + payload.botCryptoDep + payload.botExchipDep - payload.botExchipCashout - payload.bonuses + payload.transfers + payload.ret + payload.sergeyMarina + payload.rakeback + extraTotal - extraExpenseTotal;
        payload.total = total;
        payload.extraName = extraFields[0] ? extraFields[0].name : "";
        payload.extraAmount = extraRawTotal;
        payload.comment = extraFields.map(function (f) { return f.name; }).filter(Boolean).join(", ");
        return payload;
      }

      function setFormVal(id, val) {
        var el = document.getElementById(id);
        if (!el) return;
        el.value = val != null && val !== "" ? String(val) : "";
      }

      function fillReportForm(report, options) {
        options = options || {};
        manualRakebackInputTouched = !!(report && report.rakeback != null && report.rakeback !== "");
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
          if (!options.skipRakeback) fillRakebackTable([], "");
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

      function submitAdminReport() {
        var winGetApiBase = window && window.getApiBase;
        var base = typeof getApiBase === "function"
          ? getApiBase()
          : (typeof winGetApiBase === "function" ? winGetApiBase() : "");
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var winCredentialCheck = window && window.pokerApiHasCredential;
        var hasCredential = typeof pokerApiHasCredential === "function"
          ? pokerApiHasCredential()
          : !!(typeof winCredentialCheck === "function" && winCredentialCheck());
        if (!base || !hasCredential) {
          if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA), чтобы отправить отчёт.");
          return;
        }
        var winFetch = window && window.fetch;
        var requestFetch = typeof winFetch === "function" ? winFetch.bind(window) : fetch;
        var payload = buildPayload();
        if (editingReportId && editingReport) {
          payload.id = editingReportId;
          payload.date = editingReport.date || payload.date;
          payload.weekday = editingReport.weekday || payload.weekday;
        }
        submitBtn.disabled = true;
        var method = editingReportId ? "PUT" : "POST";
        var url = base.replace(/\/$/, "") + "/api/admin-report-shifts";
        requestFetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            submitBtn.disabled = false;
            if (data && data.ok) {
              var accountedRakebackRows = null;
              if (!editingReportId && !rakebackModule) {
                markUnaccountedRakebackRowsAccounted(data.report && data.report.id, data.report && data.report.createdAt);
                ensureRakebackTemplateRowsFromReportedRows(payload.rakebackRows);
                syncRakebackTable();
                accountedRakebackRows = collectRakebackRows(false, false);
                saveLocalRakebackDraftRows(accountedRakebackRows);
                saveRakebackDraftRowsNow(true);
              }
              editingReportId = null;
              editingReport = null;
              if (submitBtn) submitBtn.textContent = "Отправить отчёт";
              fillReportForm(null);
              if (accountedRakebackRows) {
                fillRakebackTable(accountedRakebackRows, "");
              } else {
                loadLocalRakebackDraftRows();
              }
              if (canViewSentReports()) {
                if (sentReportsModule) sentReportsModule.refresh();
                else loadSentReports(true);
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
      }

      if (!formModule && submitBtn) {
        submitBtn.addEventListener("click", submitAdminReport);
      }

      return {
        buildPayload: buildPayload,
        setFormVal: setFormVal,
        fillReportForm: fillReportForm,
        submitAdminReport: submitAdminReport
      };
    }
  }

  window.AdminReportFormLogic = {
    init: init
  };
})();
