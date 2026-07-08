(function () {
  "use strict";

  if (window.__pokerClickSoundGlobalBound) return;
  window.__pokerClickSoundGlobalBound = true;

  var CLICK_SOUND_SRC = "./assets/gta-sa-menu.mp3?v=2026070602";
  var SUBSCRIBE_SOUND_SRC = "./assets/subscribe-bell-sfx.mp3?v=20260706";
  var DAILY_POKER_DEAL_SOUND_SRC = "./assets/daily-poker-here-we-go-again.mp3?v=20260706";
  var CLICK_SOUND_MUTED_KEY = "poker_click_sound_muted";
  var INTERACTIVE_SELECTOR = [
    "button",
    "a[href]",
    "summary",
    "label[for]",
    "[role=\"button\"]",
    "[role=\"menuitem\"]",
    "[role=\"tab\"]",
    "[data-view-target]",
    "[data-nav-target]",
    "[data-menu-item]",
    "[data-hall-fish-open]",
    "[data-private-cash-open]",
    "[data-sng-open]",
    "#privateCashSignupOpen",
    "#sngChampionsOpen",
    "#clubChoiceVoteOpen",
    ".bottom-nav__item",
    ".feature",
    ".feature--link",
    ".hero__link",
    ".home-mini-icon-item",
    ".home-club-choice-plaque",
    ".daily-poker__shortcut",
    ".modal-tab",
  ].join(",");
  var EXCLUDED_SELECTOR = [
    "audio",
    "video",
    "input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):not([type=\"checkbox\"]):not([type=\"radio\"])",
    "textarea",
    "select",
    "[contenteditable=\"true\"]",
    "[data-click-sound=\"off\"]",
    ".raffles-subscribe-btn",
    ".gazette-modal__subscribe-in-article-btn",
    ".rating-subscribe-btn",
    "[data-private-cash-subscribe]",
    "#dailyPokerNotifyBtn",
    "#homeTournamentNotifyBtn",
  ].join(",");
  var audioPool = [];
  var audioIndex = 0;
  var subscribeAudio = null;
  var dailyPokerDealAudio = null;
  var lastSoundAt = 0;
  var lastSoundKey = "";
  var lastSubscribeSoundAt = 0;
  var MIN_SOUND_GAP_MS = 140;
  var SAME_TARGET_GAP_MS = 430;
  var TOUCH_MOUSE_GAP_MS = 520;
  var TOUCH_TAP_MOVE_LIMIT = 12;
  var touchStartInfo = null;
  var lastTouchScrollAt = 0;

  function pokerIsClickSoundMuted() {
    try {
      if (window.__pokerClickSoundMuted === true) return true;
      if (window.__pokerClickSoundMuted === false) return false;
    } catch (eMemory) {}
    try {
      if (typeof localStorage === "undefined") return true;
      return localStorage.getItem(CLICK_SOUND_MUTED_KEY) !== "0";
    } catch (eStorage) {
      return true;
    }
  }

  function pokerSetClickSoundMuted(muted) {
    var next = !!muted;
    try {
      window.__pokerClickSoundMuted = next;
    } catch (eMemory) {}
    try {
      if (typeof localStorage !== "undefined") {
        if (next) localStorage.setItem(CLICK_SOUND_MUTED_KEY, "1");
        else localStorage.setItem(CLICK_SOUND_MUTED_KEY, "0");
      }
    } catch (eStorage) {}
    return next;
  }

  function isDisabled(el) {
    return !!(el && (el.disabled || el.getAttribute("disabled") != null || el.getAttribute("aria-disabled") === "true"));
  }

  function clickSoundTarget(event) {
    if (!event || !event.target || !event.target.closest) return null;
    if (event.target.closest(EXCLUDED_SELECTOR)) return null;
    var interactive = event.target.closest(INTERACTIVE_SELECTOR);
    if (!interactive || interactive.getAttribute("aria-hidden") === "true" || isDisabled(interactive)) return null;
    return interactive;
  }

  function getAudio() {
    if (!audioPool.length) {
      for (var i = 0; i < 4; i += 1) {
        try {
          var audio = new Audio(CLICK_SOUND_SRC);
          audio.preload = "auto";
          audio.volume = 1;
          try {
            audio.load();
          } catch (errLoad) {}
          audioPool.push(audio);
        } catch (errAudio) {}
      }
    }
    if (!audioPool.length) return null;
    var next = audioPool[audioIndex % audioPool.length];
    audioIndex += 1;
    return next;
  }

  function playPokerClickSound() {
    if (pokerIsClickSoundMuted()) return false;
    var audio = getAudio();
    if (!audio) return false;
    try {
      audio.pause();
      audio.currentTime = 0;
      var p = audio.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
      return true;
    } catch (err) {
      return false;
    }
  }

  function playPokerSubscribeSound() {
    var now = Date.now();
    if (now - lastSubscribeSoundAt < 700) return false;
    lastSubscribeSoundAt = now;
    try {
      if (!subscribeAudio) {
        subscribeAudio = new Audio(SUBSCRIBE_SOUND_SRC);
        subscribeAudio.preload = "auto";
        subscribeAudio.volume = 1;
        try {
          subscribeAudio.load();
        } catch (errLoad) {}
      }
      subscribeAudio.pause();
      subscribeAudio.currentTime = 0;
      var p = subscribeAudio.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
      return true;
    } catch (err) {
      return false;
    }
  }

  function playPokerDailyDealSound() {
    if (typeof window.playDailyPokerDealSound === "function") {
      window.playDailyPokerDealSound();
      return true;
    }
    try {
      if (!dailyPokerDealAudio) {
        dailyPokerDealAudio = new Audio(DAILY_POKER_DEAL_SOUND_SRC);
        dailyPokerDealAudio.preload = "auto";
        dailyPokerDealAudio.volume = 1;
        try {
          dailyPokerDealAudio.load();
        } catch (errLoad) {}
      }
      dailyPokerDealAudio.pause();
      dailyPokerDealAudio.currentTime = 0;
      var p = dailyPokerDealAudio.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
      return true;
    } catch (err) {
      return false;
    }
  }

  window.playPokerDailyDealSound = playPokerDailyDealSound;

  function preloadPokerClickSound() {
    getAudio();
    try {
      if (!subscribeAudio) {
        subscribeAudio = new Audio(SUBSCRIBE_SOUND_SRC);
        subscribeAudio.preload = "auto";
        subscribeAudio.volume = 1;
        subscribeAudio.load();
      }
    } catch (errSubPreload) {}
  }

  function soundKeyForEvent(event, target) {
    if (!target) return "";
    if (!target.__pokerClickSoundId) {
      target.__pokerClickSoundId = "pcs_" + Math.random().toString(36).slice(2);
    }
    var pointerId = event && event.pointerId != null ? String(event.pointerId) : "";
    var touchCount = event && event.changedTouches ? String(event.changedTouches.length || 0) : "";
    return target.__pokerClickSoundId + ":" + pointerId + ":" + touchCount;
  }

  function shouldSkipDuplicate(event, target, source) {
    var now = Date.now();
    var key = soundKeyForEvent(event, target);
    var type = event && event.type ? event.type : source || "";
    if (event && event.__pokerClickSoundPlayed) return true;
    if (event && event.detail && event.detail.__pokerClickSoundPlayed) return true;
    if ((type === "click" || source === "click") && now - lastTouchScrollAt < 700) return true;
    if (key && key === lastSoundKey && now - lastSoundAt < SAME_TARGET_GAP_MS) return true;
    if ((type === "click" || source === "click") && now - lastSoundAt < TOUCH_MOUSE_GAP_MS) return true;
    if (now - lastSoundAt < MIN_SOUND_GAP_MS) return true;
    lastSoundAt = now;
    lastSoundKey = key;
    if (event) {
      try {
        event.__pokerClickSoundPlayed = true;
      } catch (errFlag) {}
    }
    return false;
  }

  function playForEvent(event, source) {
    if (pokerIsClickSoundMuted()) return;
    var target = clickSoundTarget(event);
    if (!target || shouldSkipDuplicate(event, target, source)) return;
    playPokerClickSound();
  }

  function getTouchPoint(event, useChanged) {
    var list = event && (useChanged ? event.changedTouches : event.touches);
    var touch = list && list.length ? list[0] : null;
    if (!touch) return null;
    return { x: touch.clientX || 0, y: touch.clientY || 0, target: event.target || null };
  }

  function rememberTouchStart(event) {
    preloadPokerClickSound();
    var point = getTouchPoint(event, false);
    touchStartInfo = point
      ? { x: point.x, y: point.y, target: point.target, at: Date.now() }
      : null;
  }

  function isTouchTap(event) {
    var start = touchStartInfo;
    var end = getTouchPoint(event, true);
    touchStartInfo = null;
    if (!start || !end) return false;
    var dx = Math.abs(end.x - start.x);
    var dy = Math.abs(end.y - start.y);
    var tapped = dx <= TOUCH_TAP_MOVE_LIMIT && dy <= TOUCH_TAP_MOVE_LIMIT;
    if (!tapped) lastTouchScrollAt = Date.now();
    return tapped;
  }

  window.playPokerClickSound = playPokerClickSound;
  window.playPokerSubscribeSound = playPokerSubscribeSound;
  window.pokerIsClickSoundMuted = pokerIsClickSoundMuted;
  window.pokerSetClickSoundMuted = pokerSetClickSoundMuted;
  if (typeof window.playClickSound !== "function") window.playClickSound = playPokerClickSound;

  document.addEventListener("pointerdown", function (event) {
    if (event && event.pointerType === "touch") return;
    playForEvent(event, "pointer");
  }, true);
  document.addEventListener("touchend", function (event) {
    if (!isTouchTap(event)) return;
    playForEvent(event, "touch");
  }, { capture: true, passive: true });
  document.addEventListener("click", function (event) {
    playForEvent(event, "click");
  }, true);
  document.addEventListener("pointerover", preloadPokerClickSound, { capture: true, passive: true });
  document.addEventListener("touchstart", rememberTouchStart, { capture: true, passive: true });
  document.addEventListener("touchcancel", function () {
    touchStartInfo = null;
  }, { capture: true, passive: true });
})();
