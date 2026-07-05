(function () {
  "use strict";

  if (window.__pokerClickSoundGlobalBound) return;
  window.__pokerClickSoundGlobalBound = true;

  var CLICK_SOUND_SRC = "./assets/gta-sa-menu.mp3?v=20260706";
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
  ].join(",");
  var audioPool = [];
  var audioIndex = 0;
  var lastPointerSoundAt = 0;
  var lastTouchSoundAt = 0;

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

  function preloadPokerClickSound() {
    getAudio();
  }

  function playForEvent(event, source) {
    if (!clickSoundTarget(event)) return;
    var now = Date.now();
    if (source === "touch") {
      if (now - lastPointerSoundAt < 360) return;
      lastTouchSoundAt = now;
      lastPointerSoundAt = now;
    } else if (source === "pointer") {
      if (now - lastTouchSoundAt < 360) return;
      lastPointerSoundAt = now;
    } else if (now - Math.max(lastPointerSoundAt, lastTouchSoundAt) < 360) {
      return;
    }
    playPokerClickSound();
  }

  window.playPokerClickSound = playPokerClickSound;
  if (typeof window.playClickSound !== "function") window.playClickSound = playPokerClickSound;

  document.addEventListener("pointerdown", function (event) {
    playForEvent(event, "pointer");
  }, true);
  document.addEventListener("touchend", function (event) {
    playForEvent(event, "touch");
  }, { capture: true, passive: true });
  document.addEventListener("click", function (event) {
    playForEvent(event, "click");
  }, true);
  document.addEventListener("pointerover", preloadPokerClickSound, { capture: true, passive: true });
  document.addEventListener("touchstart", preloadPokerClickSound, { capture: true, passive: true });
})();
