(function () {
  "use strict";

  function call(fn) {
    if (typeof fn !== "function") return undefined;
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  }

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function init(config) {
    config = config || {};
    var tabs = toArray(config.tabs);
    var panels = toArray(config.panels);
    var callbacks = config.callbacks || {};
    var bound = false;

    function normalizeName(name) {
      name = String(name || "form");
      if (call(callbacks.canOpen, name) === false) return "form";
      return name;
    }

    function setActive(name) {
      var activeName = normalizeName(name);
      call(callbacks.beforeSwitch, activeName);
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute("data-admin-report-tab") === activeName;
        tab.classList.toggle("admin-report-tab--active", isActive);
      });
      panels.forEach(function (panel) {
        var isActive = panel.getAttribute("data-admin-report-panel") === activeName;
        panel.classList.toggle("admin-report-panel--active", isActive);
      });
      return activeName;
    }

    function open(name) {
      var activeName = setActive(name);
      call(callbacks.afterSwitch, activeName);
      return activeName;
    }

    function bind() {
      if (bound) return;
      bound = true;
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var name = tab.getAttribute("data-admin-report-tab") || "form";
          if (call(callbacks.canOpen, name) === false) return;
          open(name);
        });
      });
    }

    bind();

    return {
      bind: bind,
      open: open,
      setActive: setActive,
    };
  }

  window.AdminReportTabs = {
    init: init,
  };
})();
