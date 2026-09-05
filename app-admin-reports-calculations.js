(function () {
  "use strict";

  function call(fn) {
    if (typeof fn !== "function") return undefined;
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  }

  function init(config) {
    config = config || {};
    var callbacks = config.callbacks || {};
    var modal = config.modal || document.getElementById("adminReportModal");
    var elements = config.elements || {};
    var bound = false;
    var dateCalendarMonth = null;

    function dateKey(date) {
      var y = date.getFullYear();
      var m = String(date.getMonth() + 1).padStart(2, "0");
      var d = String(date.getDate()).padStart(2, "0");
      return y + "-" + m + "-" + d;
    }

    function parseDateKey(value) {
      var match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
    }

    function formatDateLabel(value) {
      var date = parseDateKey(value);
      if (!date) return "Выбрать дату";
      return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(date);
    }

    function syncDateButton() {
      var input = document.getElementById("adminReportFiguresDate");
      var label = document.getElementById("adminReportFiguresDateLabel");
      if (label) label.textContent = formatDateLabel(input && input.value);
    }

    function openRakebackTotalsFromCalculations(event) {
      if (event) event.preventDefault();
      var dialog = document.getElementById("adminReportRakebackTotalsModal");
      var list = document.getElementById("adminReportRakebackTotalsList");
      if (dialog) {
        if (document.body && dialog.parentNode !== document.body) document.body.appendChild(dialog);
        if (list && !String(list.innerHTML || "").trim()) {
          list.innerHTML = '<div class="admin-report-rakeback-totals-modal__section-title">Загружаем итоги…</div>';
        }
        dialog.hidden = false;
      }
      if (typeof window.pokerOpenAdminReportRakebackPlayers === "function") {
        Promise.resolve(window.pokerOpenAdminReportRakebackPlayers(event && event.currentTarget)).catch(function () {});
      }
    }

    function renderDateCalendar() {
      var calendar = document.getElementById("adminReportFiguresDateCalendar");
      var input = document.getElementById("adminReportFiguresDate");
      if (!calendar) return;
      var selected = parseDateKey(input && input.value);
      var view = dateCalendarMonth || selected || new Date();
      dateCalendarMonth = new Date(view.getFullYear(), view.getMonth(), 1);
      var monthLabel = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(dateCalendarMonth);
      var first = new Date(dateCalendarMonth.getFullYear(), dateCalendarMonth.getMonth(), 1);
      var offset = (first.getDay() + 6) % 7;
      var cursor = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
      var selectedKey = input ? input.value : "";
      var todayKey = dateKey(new Date());
      var html = '<div class="player-crm__range-calendar-head">' +
        '<button type="button" class="player-crm__range-calendar-nav" data-admin-calc-date-nav="-1" aria-label="Предыдущий месяц">‹</button>' +
        '<strong>' + monthLabel + '</strong>' +
        '<button type="button" class="player-crm__range-calendar-nav" data-admin-calc-date-nav="1" aria-label="Следующий месяц">›</button>' +
        '<button type="button" class="player-crm__range-calendar-close" data-admin-calc-date-close aria-label="Закрыть календарь">×</button>' +
        '</div><div class="player-crm__range-calendar-state">Выберите дату расчёта</div>' +
        '<div class="player-crm__range-calendar-weekdays"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>' +
        '<div class="player-crm__range-calendar-days">';
      for (var i = 0; i < 42; i += 1) {
        var key = dateKey(cursor);
        var classes = ["player-crm__range-calendar-day"];
        if (cursor.getMonth() !== dateCalendarMonth.getMonth()) classes.push("player-crm__range-calendar-day--outside");
        if (key === todayKey) classes.push("player-crm__range-calendar-day--today");
        if (key === selectedKey) classes.push("player-crm__range-calendar-day--single");
        html += '<button type="button" class="' + classes.join(" ") + '" data-admin-calc-date="' + key + '">' + cursor.getDate() + '</button>';
        cursor.setDate(cursor.getDate() + 1);
      }
      calendar.innerHTML = html + "</div>";
    }

    function closeDateCalendar() {
      var calendar = document.getElementById("adminReportFiguresDateCalendar");
      var button = document.getElementById("adminReportFiguresDateButton");
      if (calendar) calendar.hidden = true;
      if (button) button.setAttribute("aria-expanded", "false");
    }

    function bindList(list, eventName, handler) {
      Array.prototype.slice.call(list || []).forEach(function (item) {
        if (!item) return;
        item.addEventListener(eventName, handler);
      });
    }

    function bind() {
      if (bound) return;
      bound = true;

      var dateInput = document.getElementById("adminReportFiguresDate");
      var dateButton = document.getElementById("adminReportFiguresDateButton");
      var dateCalendar = document.getElementById("adminReportFiguresDateCalendar");
      if (dateInput) dateInput.addEventListener("change", syncDateButton);
      if (dateButton) dateButton.addEventListener("click", function () {
        if (dateButton.disabled) return;
        var opening = !dateCalendar || dateCalendar.hidden;
        if (opening) {
          dateCalendarMonth = parseDateKey(dateInput && dateInput.value) || new Date();
          renderDateCalendar();
          if (dateCalendar) dateCalendar.hidden = false;
        } else closeDateCalendar();
        dateButton.setAttribute("aria-expanded", opening ? "true" : "false");
      });
      if (dateCalendar) dateCalendar.addEventListener("click", function (event) {
        var nav = event.target.closest("[data-admin-calc-date-nav]");
        var day = event.target.closest("[data-admin-calc-date]");
        if (nav) {
          dateCalendarMonth = new Date(dateCalendarMonth.getFullYear(), dateCalendarMonth.getMonth() + Number(nav.getAttribute("data-admin-calc-date-nav") || 0), 1);
          renderDateCalendar();
        } else if (day && dateInput) {
          dateInput.value = day.getAttribute("data-admin-calc-date") || "";
          dateInput.dispatchEvent(new Event("change"));
          closeDateCalendar();
          call(callbacks.saveDraftQuiet);
        } else if (event.target.closest("[data-admin-calc-date-close]")) closeDateCalendar();
      });
      document.addEventListener("click", function (event) {
        if (!dateCalendar || dateCalendar.hidden || event.target.closest(".admin-report-calculations__date-picker")) return;
        closeDateCalendar();
      });
      syncDateButton();

      if (modal && modal.dataset.calculationsRakebackOverlayBound !== "1") {
        modal.dataset.calculationsRakebackOverlayBound = "1";
        function openRakebackOverlay(trigger) {
          if (!trigger) return false;
          if (typeof window.pokerOpenAdminReportRakebackPlayers === "function") {
            window.pokerOpenAdminReportRakebackPlayers(trigger);
            return true;
          }
          if (!modal.contains(trigger)) return false;
          var panel = modal.querySelector('[data-admin-report-panel="rakeback"]');
          if (panel) {
            panel.classList.add("admin-report-panel--rakeback-overlay");
            panel.setAttribute("role", "dialog");
            panel.setAttribute("aria-modal", "true");
          }
          if (typeof window.pokerOpenAdminReportRakebackOverlay === "function") {
            window.pokerOpenAdminReportRakebackOverlay();
          }
          return true;
        }
        modal.addEventListener("click", function (event) {
          var trigger = event.target && event.target.closest ? event.target.closest("[data-admin-report-open-rakeback]") : null;
          if (openRakebackOverlay(trigger)) {
            event.preventDefault();
            return;
          }
          var close = event.target && event.target.closest ? event.target.closest("[data-admin-report-rakeback-overlay-close]") : null;
          if (!close || !modal.contains(close)) return;
          var openPanel = modal.querySelector('[data-admin-report-panel="rakeback"]');
          if (openPanel) {
            openPanel.classList.remove("admin-report-panel--rakeback-overlay");
            openPanel.removeAttribute("role");
            openPanel.removeAttribute("aria-modal");
          }
        }, true);

      }

      bindList(elements.cashInputs, "input", function () {
        call(callbacks.scheduleCashTotal);
      });
      bindList(elements.cashInputs, "change", function () {
        call(callbacks.updateCashTotal);
      });

      bindList(elements.winLossInputs, "input", function () {
        call(callbacks.scheduleGrandTotal);
      });
      bindList(elements.winLossInputs, "change", function () {
        call(callbacks.updateGrandTotal);
      });

      bindList(elements.rakeInputs, "input", function (event) {
        var input = event && event.currentTarget;
        if (input && input.getAttribute("data-auto-rake") === "poker21") {
          input.setAttribute("data-manual-rake", "1");
        }
        call(callbacks.scheduleFiguresTotals, { syncExtras: false });
      });
      bindList(elements.rakeInputs, "change", function () {
        call(callbacks.updateFiguresTotals, { syncExtras: false });
      });

      bindList(elements.backingReturnInputs, "input", function () {
        call(callbacks.scheduleFiguresTotals, { syncExtras: false });
      });
      bindList(elements.backingReturnInputs, "change", function () {
        call(callbacks.updateFiguresTotals, { syncExtras: false });
      });

      [
        elements.romanPaidInput,
        elements.winLossInput,
        elements.agentsPaidInput,
        elements.approxEnabledInput,
        elements.approxRomanRakeInput,
      ].forEach(function (input) {
        if (!input) return;
        input.addEventListener("input", function () {
          call(callbacks.scheduleFiguresTotals, { syncExtras: false });
        });
        input.addEventListener("change", function () {
          call(callbacks.updateFiguresTotals, { syncExtras: false });
        });
      });

      bindList(elements.approxRateInputs, "change", function () {
        call(callbacks.updateFiguresTotals);
        call(callbacks.saveDraftQuiet);
      });

      if (elements.approxRomanRakeInput) {
        elements.approxRomanRakeInput.addEventListener("change", function () {
          call(callbacks.saveDraftQuiet);
        });
      }

      call(callbacks.bindExtraInputs, elements.extrasEl);

      if (elements.addFieldBtn) {
        elements.addFieldBtn.addEventListener("click", function () {
          call(callbacks.addExtraField);
        });
      }

      bindList(elements.groupSaveBtns, "click", function (event) {
        var btn = event.currentTarget;
        call(callbacks.saveDraft, btn ? btn.getAttribute("data-admin-report-calc-save") || "cash" : "cash");
      });

      bindList(elements.groupEditBtns, "click", function (event) {
        var btn = event.currentTarget;
        call(callbacks.editDraft, btn ? btn.getAttribute("data-admin-report-calc-edit") || "cash" : "cash");
      });

      if (elements.figuresSaveBtn && elements.figuresSaveBtn.dataset.calculationSaveBound !== "1") {
        elements.figuresSaveBtn.dataset.calculationSaveBound = "1";
        elements.figuresSaveBtn.addEventListener("click", function () {
          if (elements.figuresSaveBtn.disabled) return;
          elements.figuresSaveBtn.disabled = true;
          var saveResult;
          try {
            saveResult = call(callbacks.saveFiguresDraft);
          } catch (saveError) {
            elements.figuresSaveBtn.disabled = false;
            var saveStatus = document.getElementById("adminReportFiguresSaveStatus");
            if (saveStatus) {
              saveStatus.textContent = saveError && saveError.message
                ? String(saveError.message)
                : "Не удалось сохранить — повторите";
              saveStatus.setAttribute("data-tone", "error");
            }
            return;
          }
          Promise.resolve(saveResult).finally(function () {
            elements.figuresSaveBtn.disabled = false;
          });
        });
      }

      if (elements.figuresEditBtn && elements.figuresEditBtn.dataset.calculationEditBound !== "1") {
        elements.figuresEditBtn.dataset.calculationEditBound = "1";
        elements.figuresEditBtn.addEventListener("click", function () {
          call(callbacks.editFiguresDraft);
        });
      }
      var figuresRefreshBtn = document.getElementById("adminReportFiguresRefreshBtn");
      if (figuresRefreshBtn) {
        figuresRefreshBtn.addEventListener("click", function () {
          if (figuresRefreshBtn.disabled) return;
          var poker21RakeInput = elements.rakeInputs && elements.rakeInputs[0];
          if (poker21RakeInput) poker21RakeInput.removeAttribute("data-manual-rake");
          figuresRefreshBtn.disabled = true;
          var refreshStatus = document.getElementById("adminReportFiguresSaveStatus");
          if (refreshStatus) {
            refreshStatus.textContent = "Обновляем…";
            refreshStatus.setAttribute("data-tone", "loading");
          }
          var refreshResult = call(callbacks.loadReports, true);
          var refreshTimeout = new Promise(function (_, reject) {
            setTimeout(function () { reject(new Error("calculation refresh timeout")); }, 30000);
          });
          Promise.race([Promise.resolve(refreshResult), refreshTimeout]).then(function () {
            if (refreshStatus) {
              refreshStatus.textContent = "Обновлено";
              refreshStatus.removeAttribute("data-tone");
            }
          }).catch(function () {
            if (refreshStatus) {
              refreshStatus.textContent = "Не удалось обновить";
              refreshStatus.setAttribute("data-tone", "error");
            }
          }).finally(function () {
            figuresRefreshBtn.disabled = false;
          });
        });
      }
    }

    function open() {
      bind();
      if (elements.figuresSaveBtn) elements.figuresSaveBtn.disabled = false;
      var figuresRefreshBtn = document.getElementById("adminReportFiguresRefreshBtn");
      if (figuresRefreshBtn) figuresRefreshBtn.disabled = false;
      call(callbacks.hydrateDraftOnce);
      call(callbacks.loadReports);
    }

    return {
      bind: bind,
      open: open,
      reset: function () {
        call(callbacks.resetHydration);
      },
      root: elements.root || (modal ? modal.querySelector("[data-admin-report-panel='calculations']") : null),
    };
  }

  window.AdminReportCalculationsTab = {
    init: init,
  };
})();
