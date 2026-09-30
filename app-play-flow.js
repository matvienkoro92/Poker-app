// Two full-screen parts of the Play section: tournament, then Poker21.
(function () {
  "use strict";
  var flow = null;
  var observer = null;
  var sceneObserver = null;
  var touchStart = null;
  var lastSwipeAt = 0;

  function show(panel) {
    var current = document.querySelector(".download-page--active[data-download-page='main'] [data-play-flow]") || flow;
    if (!current) return;
    panel = panel === "poker21" ? "poker21" : "tournament";
    current.dataset.playPanel = panel;
    current.querySelectorAll(".play-flow__panel").forEach(function (slide) {
      var active = slide.classList.contains("play-flow__panel--" + (panel === "poker21" ? "portal" : "tournament"));
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    current.querySelectorAll("[data-play-panel-target]").forEach(function (button) {
      if (button.dataset.playPanelTarget === panel) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function size() {
    if (!flow || !flow.isConnected) return;
    var panel = flow.querySelector(".play-flow__panel");
    if (!panel) return;
    var width = panel.clientWidth;
    var height = panel.clientHeight;
    if (!width || !height) return;
    var scene = flow.querySelector(".tournament-day-home-dual--tournament-focus");
    var zoom = scene && scene.dataset.tournamentCharacter === "gucci" ? 1.18 : 1.05;
    flow.style.setProperty("--play-tournament-width", Math.floor(Math.min(width * zoom, height * 1122 / 1402)) + "px");
    var portalRatio = width >= 600 ? 1072 / 1467 : 852 / 1846;
    flow.style.setProperty("--play-portal-width", Math.floor(Math.min(width, height * portalRatio)) + "px");
  }

  function connect() {
    if (flow && flow.isConnected) return;
    var next = document.querySelector("[data-play-flow]");
    if (!next) return;
    flow = next;
    if (observer) observer.disconnect();
    if (sceneObserver) sceneObserver.disconnect();
    if (window.ResizeObserver) {
      observer = new ResizeObserver(size);
      observer.observe(flow);
    }
    var scene = flow.querySelector(".tournament-day-home-dual--tournament-focus");
    if (scene) {
      sceneObserver = new MutationObserver(size);
      sceneObserver.observe(scene, { attributes: true, attributeFilter: ["data-tournament-character"] });
    }
    size();
    show(flow.dataset.playPanel);
  }

  window.pokerPlayFlowShow = show;
  document.addEventListener("click", function (event) {
    if (Date.now() - lastSwipeAt > 500 || !event.target.closest("[data-play-flow]")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  document.addEventListener("click", function (event) {
    var control = event.target.closest("[data-play-next], [data-play-prev], [data-play-panel-target]");
    if (!control || !control.closest("[data-play-flow]")) return;
    event.preventDefault();
    connect();
    show(control.hasAttribute("data-play-next") ? "poker21" :
      control.hasAttribute("data-play-prev") ? "tournament" : control.dataset.playPanelTarget);
  });
  document.addEventListener("touchstart", function (event) {
    var target = event.target.closest("[data-play-flow]");
    if (!target || event.touches.length !== 1 || event.target.closest("input, select, textarea")) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY, flow: target };
  }, { passive: true });
  document.addEventListener("touchend", function (event) {
    if (!touchStart || !event.changedTouches.length) return;
    var dx = event.changedTouches[0].clientX - touchStart.x;
    var dy = event.changedTouches[0].clientY - touchStart.y;
    if (touchStart.flow.isConnected && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      connect();
      lastSwipeAt = Date.now();
      if (touchStart.flow.dataset.playPanel === "tournament" && dx > 0) show("poker21");
      else if (touchStart.flow.dataset.playPanel === "poker21" && dx < 0) show("tournament");
    }
    touchStart = null;
  }, { passive: true });
  document.addEventListener("touchcancel", function () { touchStart = null; }, { passive: true });
  window.addEventListener("resize", size);
  document.addEventListener("keydown", function (event) {
    if (!event.target.closest || !event.target.closest("[data-play-flow]")) return;
    if (event.key === "ArrowRight") show("poker21");
    else if (event.key === "ArrowLeft") show("tournament");
    else return;
    event.preventDefault();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", connect, { once: true });
  else connect();
  new MutationObserver(connect).observe(document.documentElement, { childList: true, subtree: true });
})();
