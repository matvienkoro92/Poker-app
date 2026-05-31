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

  function hasCoreScript() {
    try {
      return Array.prototype.some.call(document.scripts || [], function (script) {
        return script.src && script.src.indexOf("/" + coreFile) !== -1 && script.type !== "application/poker-lazy";
      });
    } catch (eScripts) {
      return false;
    }
  }

  function loadCore() {
    if (typeof window.pokerInitPlayerCrm === "function" && window.pokerInitPlayerCrm !== pokerInitPlayerCrm) {
      return Promise.resolve(true);
    }
    if (corePromise) return corePromise;
    corePromise = new Promise(function (resolve, reject) {
      if (hasCoreScript()) {
        resolve(true);
        return;
      }
      var script = document.createElement("script");
      script.src = coreSrc();
      script.async = false;
      script.onload = function () { resolve(true); };
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

  window.pokerEnsurePlayerCrmRuntime = loadCore;
  window.pokerInitPlayerCrm = pokerInitPlayerCrm;
})();
