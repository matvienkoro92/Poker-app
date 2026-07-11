function randomId(scope, prefix) {
  try {
    if (scope.crypto && typeof scope.crypto.randomUUID === "function") {
      return prefix + scope.crypto.randomUUID().replace(/-/g, "");
    }
  } catch (e) {}
  return prefix + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 14);
}

export function createInstallationIdRuntime(root) {
  var scope = root || globalThis;
  return function getInstallationId() {
    var key = "poker_installation_id";
    try {
      var id = scope.localStorage.getItem(key);
      if (id) return id;
      var legacy = scope.localStorage.getItem("poker_visitor_id") || scope.sessionStorage.getItem("poker_visitor_id");
      id = legacy && /^w_[a-zA-Z0-9_-]+$/.test(legacy) ? legacy : randomId(scope, "ins_");
      scope.localStorage.setItem(key, id);
      return id;
    } catch (e) {
      try {
        var sessionId = scope.sessionStorage.getItem(key);
        if (sessionId) return sessionId;
        sessionId = randomId(scope, "ins_");
        scope.sessionStorage.setItem(key, sessionId);
        return sessionId;
      } catch (eSession) {
        return randomId(scope, "ins_");
      }
    }
  };
}

export function createVisitorIdRuntime(root) {
  var scope = root || globalThis;
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

export function installVisitorIdGlobal(root) {
  var scope = root || globalThis;
  var getInstallationId = createInstallationIdRuntime(scope);
  var getVisitorId = createVisitorIdRuntime(scope);
  scope.getInstallationId = getInstallationId;
  scope.getVisitorId = getVisitorId;
  return getVisitorId;
}
