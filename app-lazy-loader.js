(function () {
  var domainPromises = Object.create(null);
  var loadedDomains = Object.create(null);
  var scriptPromises = Object.create(null);

  var DOMAIN_DEPS = {
    hall: ["rating"]
  };

  var VIEW_DOMAINS = {
    "hall-of-fame": ["hall"],
    "winter-rating": ["rating-winter"],
    "poker-tasks": ["club-tasks"],
    "player-crm": ["player-crm"],
    "admin-bonuses": ["admin-bonuses"]
  };

  var GLOBAL_MODAL_DOMAIN_SELECTORS = [
    { selector: "#headerPokerStatus,.header-greeting--status", domains: ["hall"] },
    { selector: "#adminReportBtn,#adminBroadcastReportsBtn", domains: ["admin-reports"] },
    { selector: "#adminAuthDebugBtn", domains: ["auth-debug"] },
    { selector: "#adminShareStatsBtn", domains: ["share-stats"] },
    { selector: "#adminTrackingLinksBtn", domains: ["tracking"] }
  ];

  function normalizeDomains(domains) {
    if (!domains) return [];
    var list = Array.isArray(domains) ? domains : String(domains).split(/[\s,]+/);
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var name = String(list[i] || "").trim();
      if (name && out.indexOf(name) === -1) out.push(name);
    }
    return out;
  }

  function lazyScriptDomains(script) {
    return normalizeDomains(script && script.getAttribute ? script.getAttribute("data-poker-lazy-domain") : "");
  }

  function lazyScriptsForDomain(domain) {
    var nodes = document.querySelectorAll('script[type="application/poker-lazy"][data-poker-lazy-domain][src]');
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      if (lazyScriptDomains(nodes[i]).indexOf(domain) !== -1) out.push(nodes[i]);
    }
    return out;
  }

  function loadLazyScript(sourceNode) {
    if (!sourceNode || !sourceNode.getAttribute) return Promise.resolve(true);
    if (sourceNode.getAttribute("data-poker-loaded") === "1") return Promise.resolve(true);
    var src = sourceNode.getAttribute("src");
    if (!src) return Promise.resolve(true);
    if (scriptPromises[src]) return scriptPromises[src];
    scriptPromises[src] = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.setAttribute("data-poker-lazy-loaded-from", lazyScriptDomains(sourceNode).join(" "));
      ["crossorigin", "integrity", "referrerpolicy"].forEach(function (attr) {
        var value = sourceNode.getAttribute(attr);
        if (value) script.setAttribute(attr, value);
      });
      script.onload = function () {
        sourceNode.setAttribute("data-poker-loaded", "1");
        resolve(true);
      };
      script.onerror = function () {
        delete scriptPromises[src];
        reject(new Error("Failed to load script " + src));
      };
      (document.head || document.documentElement).appendChild(script);
    });
    return scriptPromises[src];
  }

  function ensureDomain(domain) {
    domain = String(domain || "").trim();
    if (!domain) return Promise.resolve(true);
    if (loadedDomains[domain]) return Promise.resolve(true);
    if (domainPromises[domain]) return domainPromises[domain];
    var deps = normalizeDomains(DOMAIN_DEPS[domain]);
    domainPromises[domain] = ensureDomains(deps)
      .then(function () {
        var scripts = lazyScriptsForDomain(domain);
        var chain = Promise.resolve(true);
        scripts.forEach(function (script) {
          chain = chain.then(function () {
            return loadLazyScript(script);
          });
        });
        return chain;
      })
      .then(function () {
        loadedDomains[domain] = true;
        return true;
      })
      .catch(function (err) {
        delete domainPromises[domain];
        throw err;
      });
    return domainPromises[domain];
  }

  function ensureDomains(domains) {
    var list = normalizeDomains(domains);
    if (!list.length) return Promise.resolve(true);
    return Promise.all(list.map(ensureDomain)).then(function () {
      return true;
    });
  }

  function ensureDomainsMaybeAsync(domains) {
    var list = normalizeDomains(domains);
    if (!list.length) return false;
    var allLoaded = list.every(function (domain) {
      return loadedDomains[domain];
    });
    if (allLoaded) return true;
    return ensureDomains(list);
  }

  function matchesTarget(target, selector) {
    if (!target || !selector) return false;
    try {
      if (target.matches && target.matches(selector)) return true;
      if (target.closest && target.closest(selector)) return true;
    } catch (eMatches) {}
    return false;
  }

  function globalModalDomainsForTarget(target) {
    var out = [];
    for (var i = 0; i < GLOBAL_MODAL_DOMAIN_SELECTORS.length; i++) {
      var row = GLOBAL_MODAL_DOMAIN_SELECTORS[i];
      if (!matchesTarget(target, row.selector)) continue;
      out = out.concat(row.domains || []);
    }
    return normalizeDomains(out);
  }

  function resolveHallStartParam(startParam) {
    var val = String(startParam || "").trim();
    if (!val) return null;
    if (val === "blog_top15" || val === "hall_top15" || val === "hall_fame_top2026") return "top2026";
    if (val === "hall_fame" || val === "hall_fame_legends") return "legends";
    if (val === "hall_fame_cups") return "cups";
    if (val === "hall_fame_photos") return "photos";
    if (val === "hall_fame_shame") return "shame";
    return null;
  }

  if (typeof window.resolveHallFameSectionFromStartParam !== "function") {
    window.resolveHallFameSectionFromStartParam = resolveHallStartParam;
  }
  if (typeof window.navigateToHallFameSection !== "function") {
    window.navigateToHallFameSection = function (section) {
      window.__pendingHallFameSection = section || "legends";
      if (typeof setView === "function") setView("hall-of-fame");
    };
  }
  if (typeof window.navigateToHallFameBlogTop15 !== "function") {
    window.navigateToHallFameBlogTop15 = function () {
      window.navigateToHallFameSection("top2026");
    };
  }

  window.pokerEnsureScriptDomains = function (domains) {
    return ensureDomainsMaybeAsync(domains);
  };
  window.pokerEnsureViewScripts = function (viewName) {
    return ensureDomainsMaybeAsync(VIEW_DOMAINS[String(viewName || "")] || []);
  };
  window.pokerHasGlobalModalScriptsForTarget = function (target) {
    return globalModalDomainsForTarget(target).length > 0;
  };
  window.pokerEnsureGlobalModalScriptsForTarget = function (target) {
    return ensureDomainsMaybeAsync(globalModalDomainsForTarget(target));
  };
})();
