// Two full-screen parts of the Play section: Tournament, then Poker21.
(function () {
  "use strict";
  var flow = null;
  var observer = null;
  var sceneObserver = null;
  var touchStart = null;
  var lastSwipeAt = 0;

  var coolerSpeech = null;
  var coolerSpeechTimer = null;
  var coolerMotionTimer = null;
  var coolerMotionArt = null;
  var coolerMotionClones = [];
  document.addEventListener("click", function (event) {
    var target = event.target.closest && event.target.closest(".evening-reference__cooler-hit");
    if (!target) return;
    clearTimeout(coolerMotionTimer);
    coolerMotionClones.forEach(function (part) { part.remove(); });
    if (coolerMotionArt) coolerMotionArt.classList.remove("evening-cooler-motion-source");
    coolerMotionArt = target.parentElement.querySelector("img.evening-reference__art--portal-side");
    if (coolerMotionArt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      coolerMotionClones = ["head", "hand"].map(function (part) {
        var layer = coolerMotionArt.cloneNode(false);
        layer.classList.add("evening-cooler-motion-" + part);
        coolerMotionArt.after(layer);
        return layer;
      });
      coolerMotionArt.classList.add("evening-cooler-motion-source");
      coolerMotionTimer = setTimeout(function () {
        coolerMotionClones.forEach(function (part) { part.remove(); });
        if (coolerMotionArt) coolerMotionArt.classList.remove("evening-cooler-motion-source");
        coolerMotionClones = [];
        coolerMotionArt = null;
      }, 1000);
    }
    clearTimeout(coolerSpeechTimer);
    if (coolerSpeech) coolerSpeech.remove();
    coolerSpeech = document.createElement("div");
    coolerSpeech.className = "evening-cooler-speech";
    coolerSpeech.setAttribute("role", "status");
    coolerSpeech.textContent = "Игру-то понимать надо";
    document.body.appendChild(coolerSpeech);
    var rect = target.getBoundingClientRect();
    coolerSpeech.style.left = Math.max(8, Math.min(window.innerWidth - coolerSpeech.offsetWidth - 8, rect.left - coolerSpeech.offsetWidth * .65)) + "px";
    coolerSpeech.style.top = Math.max(8, rect.top + rect.height * .23 - coolerSpeech.offsetHeight - 12) + "px";
    coolerSpeechTimer = setTimeout(function () {
      if (coolerSpeech) coolerSpeech.remove();
      coolerSpeech = null;
    }, 2000);
  });

  var vpnCatDialog = null;
  var awakeVpnCat = null;
  document.addEventListener("click", function (event) {
    var cat = event.target.closest && event.target.closest(".evening-vpn-cat");
    if (!cat) return;
    if (!vpnCatDialog) {
      vpnCatDialog = document.createElement("dialog");
      vpnCatDialog.className = "evening-vpn-cat-dialog";
      vpnCatDialog.setAttribute("aria-labelledby", "vpnCatQuestion");
      vpnCatDialog.innerHTML = '<p id="vpnCatQuestion">Хочешь установить ВПН за 100 ₽/месяц?</p><div class="evening-vpn-cat-dialog__actions"><a href="https://t.me/KOTIKsVPN_bot?start=src_telegram_channel_ad" target="_blank" rel="noopener noreferrer">Да</a><button type="button">Не сейчас</button></div>';
      document.body.appendChild(vpnCatDialog);
      vpnCatDialog.querySelector("button").addEventListener("click", function () { vpnCatDialog.close(); });
      vpnCatDialog.querySelector("a").addEventListener("click", function (e) {
        var tg = window.Telegram && window.Telegram.WebApp;
        if (tg && typeof tg.openTelegramLink === "function") {
          e.preventDefault();
          tg.openTelegramLink(this.href);
        }
        vpnCatDialog.close();
      });
      vpnCatDialog.addEventListener("close", function () {
        if (awakeVpnCat) awakeVpnCat.setAttribute("aria-expanded", "false");
        awakeVpnCat = null;
      });
    }
    awakeVpnCat = cat;
    cat.setAttribute("aria-expanded", "true");
    vpnCatDialog.showModal();
  });

  function show(panel) {
    var current = document.querySelector(".download-page--active[data-download-page='main'] [data-play-flow]") || flow;
    if (!current) return;
    panel = panel === "poker21" ? "poker21" : "tournament";
    current.dataset.playPanel = panel;
    current.classList.remove("play-flow--dragging");
    current.querySelector(".play-flow__track").style.transform = "";
    current.querySelectorAll(".play-flow__panel").forEach(function (slide) {
      var active = slide.classList.contains("play-flow__panel--" + panel);
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    current.querySelectorAll("[data-play-panel-target]").forEach(function (button) {
      if (button.dataset.playPanelTarget === panel) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function placeVpnCat() {
    if (!flow) return;
    var scene = flow.querySelector(".evening-reference");
    var table = scene && scene.querySelector(".evening-reference__art--table");
    var cat = scene && scene.querySelector(".evening-vpn-cat");
    if (!table || !cat || !table.complete || !table.naturalWidth) return;
    var sceneRect = scene.getBoundingClientRect();
    var tableRect = table.getBoundingClientRect();
    if (!sceneRect.width) return;
    var scale = sceneRect.width / scene.offsetWidth;
    var top = (tableRect.bottom - sceneRect.top) / scale - cat.offsetHeight * .25;
    cat.style.setProperty("--vpn-cat-top", top + "px");
  }

  document.addEventListener("load", function (event) {
    if (event.target.matches && event.target.matches(".evening-reference__art--table")) placeVpnCat();
  }, true);

  function size() {
    if (!flow || !flow.isConnected) return;
    var panel = flow.querySelector(".play-flow__panel");
    if (!panel) return;
    var width = panel.clientWidth;
    var height = panel.clientHeight;
    if (!width || !height) return;
    var scene = flow.querySelector(".tournament-day-home-dual--tournament-focus");
    flow.style.setProperty("--play-tournament-height", height + "px");
    var zoom = scene && scene.dataset.tournamentCharacter === "gucci" ? 1.18 : 1.05;
    flow.style.setProperty("--play-tournament-width", Math.floor(scene && scene.classList.contains("evening-reference") ? width : Math.min(width * zoom, height * 1122 / 1402)) + "px");
    requestAnimationFrame(placeVpnCat);
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
    if (event.target.closest('[data-view-target="download"]')) { connect(); show("tournament"); }
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
    touchStart = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      at: Date.now(),
      flow: target,
      width: target.clientWidth,
      dragging: false
    };
  }, { passive: true });
  document.addEventListener("touchmove", function (event) {
    if (!touchStart || !touchStart.flow.isConnected || event.touches.length !== 1) return;
    var dx = event.touches[0].clientX - touchStart.x;
    var dy = event.touches[0].clientY - touchStart.y;
    if (!touchStart.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { touchStart = null; return; }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      touchStart.dragging = true;
      touchStart.flow.classList.add("play-flow--dragging");
    }
    event.preventDefault();
    var offset = touchStart.flow.dataset.playPanel === "poker21" ? -touchStart.width : 0;
    var position = Math.max(-touchStart.width, Math.min(0, offset + dx));
    touchStart.flow.querySelector(".play-flow__track").style.transform = "translateX(" + position + "px)";
  }, { passive: false });
  document.addEventListener("touchend", function (event) {
    if (!touchStart || !event.changedTouches.length) return;
    var dx = event.changedTouches[0].clientX - touchStart.x;
    if (touchStart.dragging && touchStart.flow.isConnected) {
      connect();
      lastSwipeAt = Date.now();
      var change = Math.abs(dx) >= touchStart.width * .25 ||
        (Math.abs(dx) >= 45 && Date.now() - touchStart.at < 250);
      var panel = touchStart.flow.dataset.playPanel;
      if (change && dx < 0 && panel === "tournament") panel = "poker21";
      else if (change && dx > 0 && panel === "poker21") panel = "tournament";
      show(panel);
    }
    touchStart = null;
  }, { passive: true });
  document.addEventListener("touchcancel", function () {
    if (touchStart && touchStart.dragging) show(touchStart.flow.dataset.playPanel);
    touchStart = null;
  }, { passive: true });
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
