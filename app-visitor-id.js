// Stable visitor identity bridge. The implementation lives in an ES module,
// with a synchronous fallback so older browser globals keep working.
(function () {
  function randomInstallationId(scope) {
    try {
      if (scope.crypto && typeof scope.crypto.randomUUID === "function") return "ins_" + scope.crypto.randomUUID().replace(/-/g, "");
    } catch (e) {}
    return "ins_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 14);
  }
  function createFallbackInstallationIdRuntime(root) {
    var scope = root || window;
    return function getInstallationId() {
      try {
        var id = scope.localStorage.getItem("poker_installation_id");
        if (id) return id;
        var legacy = scope.localStorage.getItem("poker_visitor_id") || scope.sessionStorage.getItem("poker_visitor_id");
        id = legacy && /^w_[a-zA-Z0-9_-]+$/.test(legacy) ? legacy : randomInstallationId(scope);
        scope.localStorage.setItem("poker_installation_id", id);
        return id;
      } catch (e) {
        return randomInstallationId(scope);
      }
    };
  }
  function createFallbackVisitorIdRuntime(root) {
    var scope = root || window;
    return function getVisitorId() {
      var tg = scope.Telegram && scope.Telegram.WebApp ? scope.Telegram.WebApp : null;
      if (tg && tg.initData) {
        var params = new URLSearchParams(tg.initData);
        var userStr = params.get("user");
        if (userStr) {
          try {
            var user = JSON.parse(userStr);
            if (user.id) return "tg_" + user.id;
          } catch (e) {}
        }
      }
      if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id != null) {
        return "tg_" + tg.initDataUnsafe.user.id;
      }
      try {
        var auth = scope.__pokerTelegramAuth;
        if (auth && auth.user && auth.user.id != null && (auth.status === "verified" || auth.status === "dev_skip")) {
          if (auth.user.memberId != null && String(auth.user.memberId).trim() !== "") return String(auth.user.memberId).trim();
          return "tg_" + auth.user.id;
        }
      } catch (eAuth) {}
      try {
        var id = scope.localStorage.getItem("poker_visitor_id");
        if (id) return id;
        id = scope.sessionStorage.getItem("poker_visitor_id");
        if (id) {
          try {
            scope.localStorage.setItem("poker_visitor_id", id);
          } catch (e) {}
          return id;
        }
        id = "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
        try {
          scope.localStorage.setItem("poker_visitor_id", id);
        } catch (e) {}
        scope.sessionStorage.setItem("poker_visitor_id", id);
        return id;
      } catch (e) {
        return "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
      }
    };
  }

  window.getInstallationId = createFallbackInstallationIdRuntime(window);
  window.getVisitorId = createFallbackVisitorIdRuntime(window);
  window.pokerVisitorIdReady = import("./app-visitor-id.module.mjs")
    .then(function (mod) {
      if (mod && typeof mod.installVisitorIdGlobal === "function") {
        return mod.installVisitorIdGlobal(window);
      }
      return window.getVisitorId;
    })
    .catch(function () {
      return window.getVisitorId;
    });
})();
