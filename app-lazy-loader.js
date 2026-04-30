// Domain script loader for heavy sections. Lazy script tags stay in index.html as
// inert metadata, so build/smoke tooling can still see and copy the files.
(function () {
  var lazyType = "application/poker-lazy";
  var loaded = Object.create(null);
  var loading = Object.create(null);

  function scriptKey(src) {
    return String(src || "").split("#")[0];
  }

  function collectDomainScripts(domain) {
    var name = String(domain || "").trim();
    if (!name) return [];
    var nodes = document.querySelectorAll('script[type="' + lazyType + '"][data-poker-lazy-domain]');
    var out = [];
    nodes.forEach(function (node) {
      var domains = String(node.getAttribute("data-poker-lazy-domain") || "")
        .split(/\s+/)
        .filter(Boolean);
      if (domains.indexOf(name) === -1) return;
      var src = node.getAttribute("src");
      if (src) out.push(src);
    });
    return out;
  }

  function isScriptLoaded(src) {
    var key = scriptKey(src);
    if (!key) return true;
    return !!(loaded[key] || document.querySelector('script[data-poker-loaded-src="' + key.replace(/"/g, '\\"') + '"]'));
  }

  function isDomainLoaded(domain) {
    var scripts = collectDomainScripts(domain);
    if (!scripts.length) return true;
    for (var i = 0; i < scripts.length; i++) {
      if (!isScriptLoaded(scripts[i])) return false;
    }
    return true;
  }

  function loadScript(src) {
    var key = scriptKey(src);
    if (!key) return Promise.resolve();
    if (loaded[key] || document.querySelector('script[data-poker-loaded-src="' + key.replace(/"/g, '\\"') + '"]')) {
      loaded[key] = true;
      return Promise.resolve();
    }
    if (loading[key]) return loading[key];
    loading[key] = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.setAttribute("data-poker-loaded-src", key);
      s.onload = function () {
        loaded[key] = true;
        resolve();
      };
      s.onerror = function () {
        reject(new Error("Failed to load " + src));
      };
      document.head.appendChild(s);
    });
    return loading[key];
  }

  function loadDomainScripts(domain) {
    var scripts = collectDomainScripts(domain);
    if (!scripts.length) return Promise.resolve();
    if (isDomainLoaded(domain)) return true;
    return scripts.reduce(function (chain, src) {
      return chain.then(function () {
        return loadScript(src);
      });
    }, Promise.resolve());
  }

  var viewDomains = {
    chat: ["chat"],
    "winter-rating": ["rating"],
    "spring-rating": ["rating"],
    raffles: ["raffles"],
    streams: ["media"],
    "video-lessons": ["media"],
    equilator: ["media"],
    "bonus-game": ["games"],
    "cooler-game": ["games"],
    "plasterer-game": ["games"],
    "poker-tasks": ["games"],
    "hall-of-fame": ["rating", "tournament"],
    schedule: ["tournament"],
    cashout: ["cashout"],
    "keyboard-lab": ["admin"],
  };

  function preloadDomainsOnIdle(domains) {
    var run = function () {
      domains.reduce(function (chain, domain) {
        return chain.then(function () {
          return Promise.resolve(loadDomainScripts(domain)).catch(function (err) {
            if (typeof console !== "undefined" && console.warn) console.warn("lazy preload", domain, err);
          });
        });
      }, Promise.resolve());
    };
    var ric = window.requestIdleCallback || function (cb) {
      return setTimeout(cb, 3500);
    };
    setTimeout(function () {
      ric(run, { timeout: 9000 });
    }, 3500);
  }

  function ensureViewHtmlSoft(viewName) {
    try {
      if (typeof window.pokerEnsureViewHtml !== "function") return Promise.resolve(false);
      var htmlReady = window.pokerEnsureViewHtml(viewName);
      if (htmlReady && typeof htmlReady.then === "function") return htmlReady.catch(function () { return false; });
      return Promise.resolve(!!htmlReady);
    } catch (eHtml) {
      return Promise.resolve(false);
    }
  }

  function ensureGlobalModalsSoft() {
    try {
      if (typeof window.pokerEnsureGlobalModalsHtml !== "function") return Promise.resolve(false);
      return window.pokerEnsureGlobalModalsHtml().catch(function () { return false; });
    } catch (eModals) {
      return Promise.resolve(false);
    }
  }

  function prewarmView(viewName) {
    var view = String(viewName || "").trim();
    if (!view) return;
    var htmlView = view === "spring-rating" ? "winter-rating" : view;
    try {
      var scriptsReady = window.pokerEnsureViewScripts ? window.pokerEnsureViewScripts(view) : Promise.resolve(false);
      Promise.resolve(scriptsReady)
        .then(function () {
          return ensureViewHtmlSoft(htmlView);
        })
        .catch(function () {});
    } catch (eView) {}
  }

  function prewarmHomeAction(target) {
    if (!target || !target.closest) return;
    if (target.closest("#dailyPredictionBtn")) {
      Promise.resolve(loadDomainScripts("games")).catch(function () {});
      ensureGlobalModalsSoft();
      return;
    }
    if (
      target.closest(
        "#gazetteOpenBtn,#clubCharterOpenBtn,#headerClubWelcomeBtn,#homeWelcomeTitleBtn,#siteHomeInstructionBtn,#vpnProxyOpenBtn,#romanTaskPlannerOpenBtn,#partnershipOpenBtn,#adminVisitorsBtn,#adminReportBtn,#adminBroadcastReportsBtn"
      )
    ) {
      ensureGlobalModalsSoft();
    }
  }

  function prewarmFromPointer(ev) {
    var target = ev && ev.target && ev.target.closest ? ev.target : null;
    if (!target) return;
    var nav = target.closest("[data-view-target]");
    if (nav) prewarmView(nav.getAttribute("data-view-target"));
    prewarmHomeAction(target);
  }

  window.pokerLoadDomainScripts = loadDomainScripts;
  window.pokerEnsureViewScripts = function (viewName) {
    var domains = viewDomains[String(viewName || "")] || [];
    if (!domains.length) return false;
    var allLoaded = true;
    for (var i = 0; i < domains.length; i++) {
      if (!isDomainLoaded(domains[i])) {
        allLoaded = false;
        break;
      }
    }
    if (allLoaded) return true;
    return domains.reduce(function (chain, domain) {
      return chain.then(function () {
        return loadDomainScripts(domain);
      });
    }, Promise.resolve()).then(function () {
      return true;
    });
  };

  document.addEventListener("pointerdown", prewarmFromPointer, { passive: true, capture: true });
  document.addEventListener("touchstart", prewarmFromPointer, { passive: true, capture: true });

  function loadAdminDomainSoon() {
    Promise.resolve(loadDomainScripts("admin")).catch(function (err) {
      if (typeof console !== "undefined" && console.warn) console.warn("lazy auth admin", err);
    });
  }

  window.addEventListener("poker-telegram-auth", function (ev) {
    var detail = ev && ev.detail ? ev.detail : {};
    if (detail.verified === false) return;
    loadAdminDomainSoon();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(loadAdminDomainSoon, 250);
    }, { once: true });
  } else {
    setTimeout(loadAdminDomainSoon, 250);
  }
  window.addEventListener("pageshow", function () {
    setTimeout(loadAdminDomainSoon, 250);
  });

  setTimeout(function () {
    ensureGlobalModalsSoft();
    ensureViewHtmlSoft("winter-rating");
  }, 450);
  setTimeout(function () {
    prewarmView("chat");
  }, 650);
  setTimeout(function () {
    prewarmView("spring-rating");
  }, 900);
  setTimeout(function () {
    Promise.resolve(loadDomainScripts("games")).catch(function () {});
  }, 1300);
  preloadDomainsOnIdle(["tournament"]);
  preloadDomainsOnIdle(["admin"]);
})();
