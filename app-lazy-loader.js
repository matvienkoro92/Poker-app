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
          return loadDomainScripts(domain).catch(function (err) {
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

  window.pokerLoadDomainScripts = loadDomainScripts;
  window.pokerEnsureViewScripts = function (viewName) {
    var domains = viewDomains[String(viewName || "")] || [];
    if (!domains.length) return false;
    return domains.reduce(function (chain, domain) {
      return chain.then(function () {
        return loadDomainScripts(domain);
      });
    }, Promise.resolve()).then(function () {
      return true;
    });
  };

  preloadDomainsOnIdle(["tournament"]);
})();
