(function () {
  var domainPromises = Object.create(null);
  var loadedScriptDomains = Object.create(null);
  var loadedStyleDomains = Object.create(null);
  var scriptPromises = Object.create(null);
  var stylePromises = Object.create(null);
  var profileFriendsPreviewPrewarmPromise = null;
  var profileAchievementScriptsPrefetched = false;

  var DOMAIN_DEPS = {
    "home-widget-club-choice": ["home-widget-modals"],
    "home-widget-private-cash": ["home-widget-modals"],
    "home-widget-sng": ["home-widget-modals"],
    "rating-winter": ["rating-common"],
    "rating-spring": ["rating-common"],
    "rating-summer": ["rating-common"],
    "streams": ["peer-media"]
  };

  var VIEW_DOMAINS = {
    "home": ["home-updates", "tournament"],
    "chat": ["chat"],
    "winter-rating": ["rating-common", "rating-winter"],
    "spring-rating": ["rating-common", "rating-spring"],
    "summer-rating": ["rating-common", "rating-summer"],
    "raffles": ["raffles"],
    "daily-poker": ["daily-poker"],
    "learn-play-hub": ["learning"],
    "bonus-game": ["learning"],
    "cooler-game": ["learning"],
    "plasterer-game": ["learning"],
    "poker-tasks": ["club-tasks"],
    "hall-of-fame": ["hall"],
    "schedule": ["tournament"],
    "download": ["cashout"],
    "profile": ["profile"],
    "streams": ["streams"],
    "cashout": ["cashout"],
    "transfers": ["transfers"],
    "video-lessons": ["video-lessons"],
    "equilator": ["equilator"],
    "player-crm": ["player-crm"],
    "admin-bonuses": ["admin-bonuses"]
  };

  var GLOBAL_MODAL_DOMAIN_SELECTORS = [
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

  function lazyStyleDomains(style) {
    return normalizeDomains(style && style.getAttribute ? style.getAttribute("data-poker-lazy-domain") : "");
  }

  function lazyStylesForDomain(domain) {
    var nodes = document.querySelectorAll('link[type="application/poker-lazy-style"][data-poker-lazy-domain][href]');
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      if (lazyStyleDomains(nodes[i]).indexOf(domain) !== -1) out.push(nodes[i]);
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

  function loadLazyStyle(sourceNode) {
    if (!sourceNode || !sourceNode.getAttribute) return Promise.resolve(true);
    if (sourceNode.getAttribute("data-poker-loaded") === "1") return Promise.resolve(true);
    var href = sourceNode.getAttribute("href");
    if (!href) return Promise.resolve(true);
    if (stylePromises[href]) return stylePromises[href];
    stylePromises[href] = new Promise(function (resolve, reject) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-poker-lazy-loaded-from", lazyStyleDomains(sourceNode).join(" "));
      ["crossorigin", "integrity", "referrerpolicy", "media"].forEach(function (attr) {
        var value = sourceNode.getAttribute(attr);
        if (value) link.setAttribute(attr, value);
      });
      link.onload = function () {
        sourceNode.setAttribute("data-poker-loaded", "1");
        resolve(true);
      };
      link.onerror = function () {
        delete stylePromises[href];
        reject(new Error("Failed to load stylesheet " + href));
      };
      (document.head || document.documentElement).appendChild(link);
    });
    return stylePromises[href];
  }

  function ensureDomain(domain, opts) {
    domain = String(domain || "").trim();
    opts = opts || {};
    var loadStyles = opts.styles !== false;
    var loadScripts = opts.scripts !== false;
    if (!domain) return Promise.resolve(true);
    if ((!loadStyles || loadedStyleDomains[domain]) && (!loadScripts || loadedScriptDomains[domain])) return Promise.resolve(true);
    var promiseKey = domain + "|s:" + (loadStyles ? "1" : "0") + "|j:" + (loadScripts ? "1" : "0");
    if (domainPromises[promiseKey]) return domainPromises[promiseKey];
    var deps = normalizeDomains(DOMAIN_DEPS[domain]);
    domainPromises[promiseKey] = ensureDomains(deps, opts)
      .then(function () {
        var chain = Promise.resolve(true);
        if (loadStyles && !loadedStyleDomains[domain]) {
          lazyStylesForDomain(domain).forEach(function (style) {
            chain = chain.then(function () {
              return loadLazyStyle(style);
            });
          });
        }
        if (loadScripts && !loadedScriptDomains[domain]) {
          lazyScriptsForDomain(domain).forEach(function (script) {
            chain = chain.then(function () {
              return loadLazyScript(script);
            });
          });
        }
        return chain;
      })
      .then(function () {
        if (loadStyles) loadedStyleDomains[domain] = true;
        if (loadScripts) loadedScriptDomains[domain] = true;
        return true;
      })
      .catch(function (err) {
        delete domainPromises[promiseKey];
        throw err;
      });
    return domainPromises[promiseKey];
  }

  function ensureDomains(domains, opts) {
    var list = normalizeDomains(domains);
    if (!list.length) return Promise.resolve(true);
    return Promise.all(list.map(function (domain) {
      return ensureDomain(domain, opts);
    })).then(function () {
      return true;
    });
  }

  function ensureDomainsMaybeAsync(domains, opts) {
    var list = normalizeDomains(domains);
    opts = opts || {};
    var loadStyles = opts.styles !== false;
    var loadScripts = opts.scripts !== false;
    if (!list.length) return false;
    var allLoaded = list.every(function (domain) {
      return (!loadStyles || loadedStyleDomains[domain]) && (!loadScripts || loadedScriptDomains[domain]);
    });
    if (allLoaded) return true;
    return ensureDomains(list, opts);
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
    if (val === "hall_fame" || val === "blog_top15" || val === "hall_top15" || val === "hall_fame_top2026") return "top2026";
    if (val === "hall_fame_legends") return "legends";
    if (val === "hall_fame_cups") return "cups";
    if (val === "hall_fame_photos") return "photos";
    if (val === "hall_fame_shame") return "shame";
    if (/^hall_fame_achievements(?:_[A-Za-z0-9_-]+)?$/.test(val)) return "achievements";
    return null;
  }

  function shouldSkipIntentPrewarm() {
    try {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!connection) return false;
      if (connection.saveData) return true;
      return /(^|-)2g$/i.test(String(connection.effectiveType || ""));
    } catch (eConnection) {
      return false;
    }
  }

  function profileFriendsPrewarmViewerId() {
    var candidates = [];
    try { candidates.push(sessionStorage.getItem("poker_dt_id")); } catch (eSessionProfileFriendsPrewarm) {}
    try { candidates.push(localStorage.getItem("poker_dt_id")); } catch (eLocalProfileFriendsPrewarm) {}
    for (var i = 0; i < candidates.length; i++) {
      var value = String(candidates[i] || "").trim().toUpperCase();
      if (/^ID\d{6}$/.test(value)) return value;
    }
    return "";
  }

  function prewarmProfileFriendsPreview() {
    if (profileFriendsPreviewPrewarmPromise) return profileFriendsPreviewPrewarmPromise;
    if (typeof getApiBase !== "function") return Promise.resolve(false);
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return Promise.resolve(false);
    var viewer = profileFriendsPrewarmViewerId();
    if (!viewer) return Promise.resolve(false);
    var base = getApiBase();
    if (!base) return Promise.resolve(false);
    var query = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    profileFriendsPreviewPrewarmPromise = fetch(base + "/api/friends" + query + "&preview=1", { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!data || data.ok !== true || !Array.isArray(data.friends)) return false;
        try {
          localStorage.setItem("poker_profile_friends_preview_v1:" + viewer, JSON.stringify({
            ok: true,
            preview: true,
            friends: data.friends.slice(0, 3),
            friendCount: Math.max(0, Number(data.friendCount != null ? data.friendCount : data.friends.length) || 0),
            incomingCount: Math.max(0, Number(data.incomingCount) || 0),
            cachedAt: Date.now(),
          }));
        } catch (eProfileFriendsPrewarmCache) {}
        return true;
      })
      .catch(function () { return false; });
    return profileFriendsPreviewPrewarmPromise;
  }

  function prefetchProfileAchievementScripts() {
    if (profileAchievementScriptsPrefetched) return;
    profileAchievementScriptsPrefetched = true;
    var domains = ["chat", "rating-winter", "rating-spring", "rating-summer"];
    var seen = Object.create(null);
    domains.forEach(function (domain) {
      lazyScriptsForDomain(domain).forEach(function (sourceNode) {
        var src = sourceNode && sourceNode.getAttribute ? sourceNode.getAttribute("src") : "";
        if (!src || seen[src]) return;
        seen[src] = true;
        try {
          var link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "script";
          link.href = src;
          link.setAttribute("data-poker-profile-prefetch", domain);
          (document.head || document.documentElement).appendChild(link);
        } catch (eProfileAchievementPrefetch) {}
      });
    });
  }

  function viewIntentTarget(target) {
    if (!target || !target.closest) return "";
    var el = target.closest("[data-view-target]");
    if (!el) return "";
    return String(el.getAttribute("data-view-target") || "").trim();
  }

  function prewarmViewFromIntent(event) {
    if (shouldSkipIntentPrewarm()) return;
    var viewName = viewIntentTarget(event && event.target);
    if (!viewName || viewName === "home") return;
    var domains = VIEW_DOMAINS[viewName];
    if (!domains || !domains.length) return;
    var key = "view:" + viewName;
    if (window.__pokerViewIntentPrewarmed && window.__pokerViewIntentPrewarmed[key]) return;
    window.__pokerViewIntentPrewarmed = window.__pokerViewIntentPrewarmed || Object.create(null);
    window.__pokerViewIntentPrewarmed[key] = true;
    var ready = ensureDomainsMaybeAsync(domains, { styles: true, scripts: true });
    if (ready && typeof ready.catch === "function") ready.catch(function () {});
    try {
      if (typeof window.pokerEnsureViewHtml === "function") {
        var htmlViewName = (viewName === "spring-rating" || viewName === "summer-rating") ? "winter-rating" : viewName;
        var htmlReady = window.pokerEnsureViewHtml(htmlViewName);
        if (htmlReady && typeof htmlReady.catch === "function") htmlReady.catch(function () {});
      }
    } catch (eHtmlPrewarm) {}
  }

  document.addEventListener("pointerover", prewarmViewFromIntent, true);
  document.addEventListener("focusin", prewarmViewFromIntent, true);
  document.addEventListener("touchstart", prewarmViewFromIntent, { capture: true, passive: true });

  if (typeof window.resolveHallFameSectionFromStartParam !== "function") {
    window.resolveHallFameSectionFromStartParam = resolveHallStartParam;
  }
  if (typeof window.navigateToHallFameSection !== "function") {
    window.navigateToHallFameSection = function (section) {
      window.__pendingHallFameSection = section || "top2026";
      if (section === "achievements") {
        try {
          var qs = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
          var startParam = typeof pokerStartAppQueryFromUrlSearchParams === "function" ? pokerStartAppQueryFromUrlSearchParams(qs) : qs.get("startapp") || "";
          var match = String(startParam || "").trim().match(/^hall_fame_achievements(?:_([A-Za-z0-9_-]+))?$/);
          window.__pendingHallFishAchievementTab = match ? (match[1] || "big50") : "big50";
        } catch (eHallAchievementPending) {}
      }
      if (typeof setView === "function") setView("hall-of-fame");
    };
  }
  if (typeof window.navigateToHallFameBlogTop15 !== "function") {
    window.navigateToHallFameBlogTop15 = function () {
      window.navigateToHallFameSection("top2026");
    };
  }

  window.pokerEnsureScriptDomains = function (domains) {
    return ensureDomainsMaybeAsync(domains, { styles: false, scripts: true });
  };
  window.pokerEnsureStyleDomains = function (domains) {
    return ensureDomainsMaybeAsync(domains, { styles: true, scripts: false });
  };
  window.pokerEnsureLazyDomains = function (domains, opts) {
    return ensureDomainsMaybeAsync(domains, opts || { styles: true, scripts: true });
  };
  function prefetchRafflesData() {
    if (typeof getApiBase !== "function" || typeof pokerRafflesApiQueryLeading !== "function") return;
    var base = getApiBase();
    var query = pokerRafflesApiQueryLeading();
    if (!base || query === "?initData=" || /localhost|127\.0\.0\.1/.test(base)) return;
    var key = base + query;
    var previous = window.__pokerRafflesPrefetch;
    if (previous && previous.key === key && Date.now() - previous.at < 30000) return;
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 15000);
    var entry = { key: key, at: Date.now() };
    entry.promise = fetch(base + "/api/raffles" + query + "&scope=active&_t=" + entry.at, { signal: controller.signal })
      .then(function (response) { return response.ok ? response : null; })
      .catch(function () { return null; })
      .finally(function () { clearTimeout(timer); });
    window.__pokerRafflesPrefetch = entry;
  }

  window.pokerEnsureViewScripts = function (viewName) {
    if (String(viewName) === "raffles") prefetchRafflesData();
    return ensureDomainsMaybeAsync(VIEW_DOMAINS[String(viewName || "")] || [], { styles: true, scripts: true });
  };
  window.pokerEnsureViewStyles = function (viewName) {
    return ensureDomainsMaybeAsync(VIEW_DOMAINS[String(viewName || "")] || [], { styles: true, scripts: false });
  };
  window.pokerPrewarmLikelyViewAssets = function () {
    if (window.__pokerLikelyViewAssetsPrewarmed) return;
    window.__pokerLikelyViewAssetsPrewarmed = true;
    prewarmProfileFriendsPreview();
    prefetchProfileAchievementScripts();
    // Styles are warmed by pointer/focus/touch intent, not speculatively at startup.
  };
  window.addEventListener("poker-telegram-auth", function () {
    profileFriendsPreviewPrewarmPromise = null;
    prewarmProfileFriendsPreview();
  });
  window.pokerHasGlobalModalScriptsForTarget = function (target) {
    return globalModalDomainsForTarget(target).length > 0;
  };
  window.pokerEnsureGlobalModalScriptsForTarget = function (target) {
    return ensureDomainsMaybeAsync(globalModalDomainsForTarget(target), { styles: true, scripts: true });
  };
})();
