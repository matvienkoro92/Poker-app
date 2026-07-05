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
    hallFishPlayers: {
      selector: "#headerPokerStatus, .header-greeting--status, [data-hall-fish-open]",
      domain: "hall",
      opener: "openHallFishRatingModal",
      beforeLoad: openHallFishSkeleton,
      disableDuringLoad: false,
    },
  };

  var loadingByDomain = Object.create(null);

  function setBusy(trigger, active, config) {
    if (!trigger || !trigger.setAttribute) return;
    if (active) {
      trigger.setAttribute("aria-busy", "true");
      trigger.classList.add("home-widget-lazy-loading");
      if ("disabled" in trigger && (!config || config.disableDuringLoad !== false)) trigger.disabled = true;
    } else {
      trigger.removeAttribute("aria-busy");
      trigger.classList.remove("home-widget-lazy-loading");
      if ("disabled" in trigger && (!config || config.disableDuringLoad !== false)) trigger.disabled = false;
    }
  }

  function hallFishSkeletonRows() {
    var rows = [];
    for (var i = 1; i <= 6; i += 1) {
      rows.push(
        '<div class="hall-fish-level-row hall-fish-level-row--skeleton" aria-hidden="true">' +
          '<span class="hall-fish-level-row__rank">' + i + '</span>' +
          '<span><span class="hall-fish-skeleton-line hall-fish-skeleton-line--name"></span>' +
          '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--sub"></span></span>' +
          '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--value"></span>' +
        '</div>'
      );
    }
    return '<div class="hall-fish-level-list hall-fish-level-list--skeleton" role="status" aria-live="polite" aria-label="Загрузка рейтинга">' + rows.join("") + '</div>';
  }

  function ensureHallFishSkeletonModal() {
    var modal = document.getElementById("hallFishRatingModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "hall-fish-modal hall-fish-modal--bootstrap-loading";
    modal.id = "hallFishRatingModal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="hall-fish-modal__backdrop" data-hall-fish-close></div>' +
      '<section class="hall-fish-modal__panel hall-fish-modal__panel--levels" role="dialog" aria-modal="true" aria-label="Рейтинги игроков">' +
        '<button type="button" class="hall-fish-modal__close" data-hall-fish-close aria-label="Закрыть">×</button>' +
        '<div class="hall-fish-modal__tabs" role="tablist" aria-label="Рейтинги игроков">' +
          '<button type="button" class="hall-fish-modal__tab hall-fish-modal__tab--active" data-hall-fish-tab="levels" role="tab" aria-selected="true">Игроки по уровню</button>' +
          '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="achievements" role="tab" aria-selected="false">Топы по ачивкам</button>' +
          '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="birthdays" role="tab" aria-selected="false">Клубный календарь</button>' +
        '</div>' +
        '<div class="hall-fish-modal__body" id="hallFishRatingBody">' + hallFishSkeletonRows() + '</div>' +
      '</section>';
    document.body.appendChild(modal);
    return modal;
  }

  function openHallFishSkeleton() {
    var modal = ensureHallFishSkeletonModal();
    var body = document.getElementById("hallFishRatingBody");
    if (body && !body.querySelector(".hall-fish-level-list")) body.innerHTML = hallFishSkeletonRows();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeHallFishSkeleton(event) {
    if (!event.target || !event.target.closest || !event.target.closest("[data-hall-fish-close]")) return;
    var modal = document.getElementById("hallFishRatingModal");
    if (!modal) return;
    modal.hidden = true;
    if (document.body) document.body.classList.remove("player-crm-dialog-modal-open");
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
    if (typeof config.beforeLoad === "function") config.beforeLoad(trigger);
    setBusy(trigger, true, config);
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
        setBusy(trigger, false, config);
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
  document.addEventListener("click", closeHallFishSkeleton);
  document.addEventListener("pointerover", onWidgetIntent, true);
  document.addEventListener("focusin", onWidgetIntent, true);
  document.addEventListener("touchstart", onWidgetIntent, { capture: true, passive: true });

  window.pokerOpenHomeWidgetModal = function (name) {
    if (name === "private-cash") return openWidget("privateCash", null);
    if (name === "sng-champions") return openWidget("sngChampions", null);
    if (name === "club-choice-vote") return openWidget("clubChoiceVote", null);
    if (name === "hall-fish" || name === "players") return openWidget("hallFishPlayers", null);
    return Promise.resolve(false);
  };
})();
