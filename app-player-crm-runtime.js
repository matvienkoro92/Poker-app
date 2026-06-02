// Player CRM lightweight runtime gate. Heavy runtime loads with the player-crm lazy domain.
(function () {
  var corePromise = null;
  var coreFile = "app-player-crm-runtime-core.js";

  function currentVersion() {
    try {
      return document.documentElement.getAttribute("data-app-version") || "";
    } catch (eVersion) {
      return "";
    }
  }

  function coreSrc() {
    var version = currentVersion();
    return "./" + coreFile + (version ? "?v=" + encodeURIComponent(version) : "");
  }

  function findCoreScript() {
    try {
      var scripts = Array.prototype.slice.call(document.scripts || []);
      for (var i = scripts.length - 1; i >= 0; i -= 1) {
        var script = scripts[i];
        if (
          script &&
          script.src &&
          script.src.indexOf("/" + coreFile) !== -1 &&
          script.type !== "application/poker-lazy"
        ) {
          return script;
        }
      }
    } catch (eScripts) {}
    return null;
  }

  function isCoreReady() {
    return typeof window.pokerInitPlayerCrm === "function" && window.pokerInitPlayerCrm !== pokerInitPlayerCrm;
  }

  function waitForCoreReady(script) {
    if (isCoreReady()) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      var done = false;
      var startedAt = Date.now();
      function cleanup() {
        done = true;
        if (script) {
          script.removeEventListener("load", check);
          script.removeEventListener("error", fail);
        }
      }
      function check() {
        if (done) return;
        if (isCoreReady()) {
          cleanup();
          resolve(true);
          return;
        }
        if (Date.now() - startedAt > 9000) {
          cleanup();
          reject(new Error(coreFile + " loaded but did not expose CRM init"));
          return;
        }
        setTimeout(check, 40);
      }
      function fail() {
        if (done) return;
        cleanup();
        reject(new Error("Failed to load " + coreFile));
      }
      if (script) {
        script.addEventListener("load", check);
        script.addEventListener("error", fail);
      }
      check();
    });
  }

  function loadCore() {
    if (isCoreReady()) {
      return Promise.resolve(true);
    }
    if (corePromise) return corePromise;
    corePromise = new Promise(function (resolve, reject) {
      var existing = findCoreScript();
      if (existing) {
        waitForCoreReady(existing).then(resolve).catch(function (err) {
          corePromise = null;
          reject(err);
        });
        return;
      }
      var script = document.createElement("script");
      script.src = coreSrc();
      script.async = false;
      script.onload = function () {
        waitForCoreReady(script).then(resolve).catch(function (err) {
          corePromise = null;
          reject(err);
        });
      };
      script.onerror = function () {
        corePromise = null;
        reject(new Error("Failed to load " + coreFile));
      };
      (document.head || document.documentElement).appendChild(script);
    });
    return corePromise;
  }

  function runCoreInit() {
    var fn = window.pokerInitPlayerCrm;
    if (typeof fn === "function" && fn !== pokerInitPlayerCrm) return fn();
    return true;
  }

  function pokerInitPlayerCrm() {
    return loadCore().then(runCoreInit);
  }
  pokerInitPlayerCrm.__pokerPlayerCrmRuntimeGate = true;

  window.pokerEnsurePlayerCrmRuntime = loadCore;
  window.pokerInitPlayerCrm = pokerInitPlayerCrm;
})();
