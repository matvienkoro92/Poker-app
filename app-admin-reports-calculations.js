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

    function bindList(list, eventName, handler) {
      Array.prototype.slice.call(list || []).forEach(function (item) {
        if (!item) return;
        item.addEventListener(eventName, handler);
      });
    }

    function bind() {
      if (bound) return;
      bound = true;

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

      bindList(elements.rakeInputs, "input", function () {
        call(callbacks.scheduleFiguresTotals, { syncExtras: false });
      });
      bindList(elements.rakeInputs, "change", function () {
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

      if (elements.figuresSaveBtn) {
        elements.figuresSaveBtn.addEventListener("click", function () {
          call(callbacks.saveFiguresDraft);
        });
      }

      if (elements.figuresEditBtn) {
        elements.figuresEditBtn.addEventListener("click", function () {
          call(callbacks.editFiguresDraft);
        });
      }
    }

    function open() {
      bind();
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
