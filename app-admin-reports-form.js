(function () {
  "use strict";

  function call(fn) {
    if (typeof fn !== "function") return undefined;
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  }

  function init(config) {
    config = config || {};
    var modal = config.modal || document.getElementById("adminReportModal");
    var submitBtn = config.submitBtn || document.getElementById("adminReportSubmitBtn");
    var addExtraBtn = config.addExtraBtn || document.getElementById("adminReportAddExtraBtn");
    var callbacks = config.callbacks || {};
    var bound = false;

    function addExtraRow() {
      var tbody = document.getElementById("adminReportTableBody");
      if (!tbody) return;
      var template = tbody.querySelector(".admin-report-extra-row");
      if (!template) return;
      var clone = template.cloneNode(true);
      clone.querySelectorAll("input").forEach(function (inp) {
        inp.value = "";
      });
      tbody.insertBefore(clone, template.nextSibling);
    }

    function bind() {
      if (bound) return;
      bound = true;
      if (addExtraBtn && modal) {
        addExtraBtn.addEventListener("click", addExtraRow);
      }
      if (submitBtn) {
        submitBtn.addEventListener("click", function () {
          call(callbacks.submit);
        });
      }
    }

    bind();

    return {
      addExtraRow: addExtraRow,
      bind: bind,
      submit: function () {
        return call(callbacks.submit);
      },
    };
  }

  window.AdminReportFormTab = {
    init: init,
  };
})();
