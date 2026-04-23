(function initPokerAppStateStore() {
  var listeners = [];
  var authStateValue = null;
  var state = {
    view: "",
    authStatus: "unknown",
    network: typeof navigator !== "undefined" && navigator.onLine === false ? "offline" : "online"
  };

  function emit() {
    var snapshot = {
      view: state.view,
      authStatus: state.authStatus,
      network: state.network
    };
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](snapshot);
      } catch (eListener) {}
    }
  }

  function setState(partial) {
    if (!partial || typeof partial !== "object") return;
    var changed = false;
    var nextView = partial.view;
    var nextAuthStatus = partial.authStatus;
    var nextNetwork = partial.network;

    if (nextView != null && nextView !== state.view) {
      state.view = String(nextView || "");
      changed = true;
    }
    if (nextAuthStatus != null && nextAuthStatus !== state.authStatus) {
      state.authStatus = String(nextAuthStatus || "unknown");
      changed = true;
    }
    if (nextNetwork != null && nextNetwork !== state.network) {
      state.network = String(nextNetwork || "online");
      changed = true;
    }
    if (changed) emit();
  }

  function getState() {
    return {
      view: state.view,
      authStatus: state.authStatus,
      network: state.network
    };
  }

  function subscribe(listener) {
    if (typeof listener !== "function") return function () {};
    listeners.push(listener);
    return function unsubscribe() {
      for (var i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i] === listener) listeners.splice(i, 1);
      }
    };
  }

  window.pokerAppStateStore = {
    getState: getState,
    setState: setState,
    subscribe: subscribe
  };

  subscribe(function (snapshot) {
    try {
      if (document && document.documentElement) {
        document.documentElement.setAttribute("data-app-view", snapshot.view || "");
        document.documentElement.setAttribute("data-auth-status", snapshot.authStatus || "unknown");
        document.documentElement.setAttribute("data-network", snapshot.network || "online");
      }
      if (document && document.body) {
        document.body.setAttribute("data-auth-status", snapshot.authStatus || "unknown");
        document.body.setAttribute("data-network", snapshot.network || "online");
      }
      window.__pokerChatNetworkOnline = snapshot.network !== "offline";
    } catch (eAttrs) {}
  });

  try {
    Object.defineProperty(window, "__pokerTelegramAuth", {
      configurable: true,
      enumerable: true,
      get: function () {
        return authStateValue;
      },
      set: function (value) {
        authStateValue = value;
        var status = value && value.status != null ? String(value.status) : "unknown";
        setState({ authStatus: status });
      }
    });
  } catch (eDefineAuth) {}

  function syncViewFromBody() {
    if (!document || !document.body || !document.body.getAttribute) return;
    setState({ view: String(document.body.getAttribute("data-view") || "") });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncViewFromBody);
  } else {
    syncViewFromBody();
  }

  try {
    var observer = new MutationObserver(function () {
      syncViewFromBody();
    });
    var observeBodyWhenReady = function () {
      if (!document || !document.body) return;
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-view"] });
      syncViewFromBody();
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observeBodyWhenReady);
    } else {
      observeBodyWhenReady();
    }
  } catch (eObserver) {}

  window.addEventListener("online", function () {
    setState({ network: "online" });
  });
  window.addEventListener("offline", function () {
    setState({ network: "offline" });
  });
})();
