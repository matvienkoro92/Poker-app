(function () {
  "use strict";

  var WIDGETS = {
    privateCash: {
      selector: "#privateCashSignupOpen, [data-private-cash-open]",
      domain: "home-widget-private-cash",
      opener: "openPrivateCashModal",
    },
    sngChampions: {
      selector: "[data-sng-open], #sngChampionsOpen",
      domain: "home-widget-sng",
      opener: "openSngChampionsModal",
    },
    clubChoiceVote: {
      selector: "#clubChoiceVoteOpen",
      domain: "home-widget-club-choice",
      opener: "openClubChoiceVoteModal",
    },
  };

  var loadingByDomain = Object.create(null);

  function setBusy(trigger, active) {
    if (!trigger || !trigger.setAttribute) return;
    if (active) {
      trigger.setAttribute("aria-busy", "true");
      trigger.classList.add("home-widget-lazy-loading");
      if ("disabled" in trigger) trigger.disabled = true;
    } else {
      trigger.removeAttribute("aria-busy");
      trigger.classList.remove("home-widget-lazy-loading");
      if ("disabled" in trigger) trigger.disabled = false;
    }
  }

  function ensureDomain(domain) {
    if (!domain) return Promise.resolve(true);
    if (loadingByDomain[domain]) return loadingByDomain[domain];
    var ensure = typeof window.pokerEnsureLazyDomains === "function"
      ? window.pokerEnsureLazyDomains
      : null;
    if (!ensure) return Promise.resolve(true);
    loadingByDomain[domain] = Promise.resolve(ensure([domain], { styles: true, scripts: true }))
      .catch(function (err) {
        delete loadingByDomain[domain];
        throw err;
      });
    return loadingByDomain[domain];
  }

  function callReadyOpener(config) {
    var opener = config && window[config.opener];
    if (typeof opener === "function" && opener !== config.stub) {
      return opener();
    }
    return null;
  }

  function hasReadyOpener(config) {
    var opener = config && window[config.opener];
    return typeof opener === "function" && opener !== config.stub;
  }

  function showLoadError() {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && typeof tg.showAlert === "function") tg.showAlert("Не удалось открыть раздел. Попробуйте ещё раз.");
  }

  function openWidget(key, trigger) {
    var config = WIDGETS[key];
    if (!config) return Promise.resolve(false);
    var ready = callReadyOpener(config);
    if (ready !== null) return Promise.resolve(ready);
    setBusy(trigger, true);
    window.__pokerHomeWidgetOpening = key;
    return ensureDomain(config.domain)
      .then(function () {
        var opened = callReadyOpener(config);
        if (opened === null) showLoadError();
        return opened !== null;
      })
      .catch(function (err) {
        if (typeof console !== "undefined" && console.warn) console.warn("home widget lazy load", err);
        showLoadError();
        return false;
      })
      .finally(function () {
        if (window.__pokerHomeWidgetOpening === key) window.__pokerHomeWidgetOpening = "";
        setBusy(trigger, false);
      });
  }

  function findWidgetTrigger(target) {
    if (!target || !target.closest) return null;
    var keys = Object.keys(WIDGETS);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var trigger = target.closest(WIDGETS[key].selector);
      if (trigger) return { key: key, trigger: trigger };
    }
    return null;
  }

  function prewarmWidget(key) {
    var config = WIDGETS[key];
    if (!config || hasReadyOpener(config)) return;
    ensureDomain(config.domain).catch(function () {});
  }

  function onWidgetIntent(event) {
    var found = findWidgetTrigger(event.target);
    if (found) prewarmWidget(found.key);
  }

  function onWidgetClick(event) {
    var found = findWidgetTrigger(event.target);
    if (!found) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    openWidget(found.key, found.trigger);
  }

  Object.keys(WIDGETS).forEach(function (key) {
    var config = WIDGETS[key];
    config.stub = function () {
      return openWidget(key, null);
    };
    if (typeof window[config.opener] !== "function") {
      window[config.opener] = config.stub;
    }
  });

  document.addEventListener("click", onWidgetClick, true);
  document.addEventListener("pointerover", onWidgetIntent, true);
  document.addEventListener("focusin", onWidgetIntent, true);
  document.addEventListener("touchstart", onWidgetIntent, { capture: true, passive: true });

  window.pokerOpenHomeWidgetModal = function (name) {
    if (name === "private-cash") return openWidget("privateCash", null);
    if (name === "sng-champions") return openWidget("sngChampions", null);
    if (name === "club-choice-vote") return openWidget("clubChoiceVote", null);
    return Promise.resolve(false);
  };
})();
