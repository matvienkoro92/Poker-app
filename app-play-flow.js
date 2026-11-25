// Two full-screen parts of the Play section: Tournament, then Poker21.
(function () {
  "use strict";
  var flow = null;
  var pendingPanel = null;
  var observer = null;
  var sceneObserver = null;
  var sizeFrame = 0;
  function scheduleSize(){if(sizeFrame)return;sizeFrame=requestAnimationFrame(function(){sizeFrame=0;size();});}
  var touchStart = null;
  var lastSwipeAt = 0;
  var dragFrame = 0, dragTrack = null, dragPosition = 0;
  function flushDrag() {
    if(dragFrame)cancelAnimationFrame(dragFrame);dragFrame=0;
    if(dragTrack && dragTrack.isConnected)dragTrack.style.transform='translate3d('+dragPosition+'px,0,0)';
    dragTrack=null;
  }


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
    panel = panel === "poker21" ? "poker21" : "tournament";
    if (!current) { pendingPanel = panel; return; }
    flushDrag();
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

  function placeChairInvite() {
    var scene = flow && flow.querySelector(".evening-reference");
    var chair = scene && scene.querySelector(".evening-reference__art--chair-center");
    var invite = scene && scene.querySelector(".home-tournament-share");
    if(scene?.classList.contains('underwater-play'))return;
    if (!chair || !invite || !chair.complete || !chair.naturalWidth) return;
    var sceneRect = scene.getBoundingClientRect();
    if (!sceneRect.width) return;
    var rect = chair.getBoundingClientRect();
    var scale = sceneRect.width / scene.offsetWidth;
    invite.style.setProperty("--chair-invite-left", ((rect.left - sceneRect.left + rect.width * .23) / scale) + "px");
    invite.style.setProperty("--chair-invite-top", ((rect.top - sceneRect.top + rect.height * .1) / scale) + "px");
    invite.style.setProperty("--chair-invite-width", (rect.width * .54 / scale) + "px");
    invite.style.setProperty("--chair-invite-height", (rect.height * .32 / scale) + "px");
  }

  function placeVpnCat() {
    if (!flow) return;
    placeChairInvite();
    var scene = flow.querySelector(".evening-reference");
    var table = scene && scene.querySelector(".evening-reference__art--table");
    var cat = scene && scene.querySelector(".evening-vpn-cat");
    if(scene?.classList.contains('underwater-play'))return;
    if (!table || !cat || !table.complete || !table.naturalWidth) return;
    var sceneRect = scene.getBoundingClientRect();
    var tableRect = table.getBoundingClientRect();
    if (!sceneRect.width) return;
    var scale = sceneRect.width / scene.offsetWidth;
    var top = (tableRect.bottom - sceneRect.top) / scale - cat.offsetHeight * .9;
    cat.style.setProperty("--vpn-cat-top", top + "px");
  }

  document.addEventListener("load", function (event) {
    if (event.target.matches && event.target.matches(".evening-reference__art--table, .evening-reference__art--chair-center")) placeVpnCat();
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
      observer = new ResizeObserver(scheduleSize);
      observer.observe(flow);
    }
    var scene = flow.querySelector(".tournament-day-home-dual--tournament-focus");
    if (scene) {
      sceneObserver = new MutationObserver(scheduleSize);
      sceneObserver.observe(scene, { attributes: true, attributeFilter: ["data-tournament-character"] });
    }
    flow.querySelectorAll('img').forEach(function(image){
      var deferred=!!image.closest('.play-card-games');image.loading=deferred?'lazy':'eager';image.decoding='async';
      if(!deferred&&typeof image.decode==='function')image.decode().catch(function(){});
    });
    size();
    show(pendingPanel || flow.dataset.playPanel);
    pendingPanel = null;
  }

  window.pokerPlayFlowShow = show;
  document.addEventListener("click", function (event) {
    if (Date.now() - lastSwipeAt > 500 || !event.target.closest("[data-play-flow]")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  document.addEventListener("click", function (event) {
    var downloadLink = event.target.closest('[data-view-target="download"]');
    if (downloadLink) { connect(); show(downloadLink.dataset.downloadPanel === "poker21" ? "poker21" : "tournament"); }
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
      track: target.querySelector(".play-flow__track"),
      offset: target.dataset.playPanel === "poker21" ? -target.clientWidth : 0,
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
    dragPosition=Math.max(-touchStart.width,Math.min(0,touchStart.offset+dx));
    dragTrack=touchStart.track;
    if(!dragFrame)dragFrame=requestAnimationFrame(function(){dragFrame=0;if(dragTrack)dragTrack.style.transform='translate3d('+dragPosition+'px,0,0)';});
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
  window.addEventListener("resize", scheduleSize);
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

(function initEveningVillaGames(){
  var dialog=null,selected='',source=null;
  document.addEventListener('click',function(event){
    var trigger=event.target.closest&&event.target.closest('[data-evening-villa-game]');
    if(!trigger)return;
    var game=trigger.dataset.eveningVillaGame;
    if(!['billiards','nards','chess'].includes(game))return;
    event.preventDefault();selected=game;source=trigger;
    if(!dialog){
      dialog=document.createElement('dialog');dialog.className='evening-villa-game-dialog';
      dialog.setAttribute('aria-labelledby','eveningVillaGameTitle');
      dialog.innerHTML='<h2 id="eveningVillaGameTitle"></h2><p data-villa-game-description></p><p data-villa-game-error role="status"></p><div class="evening-villa-game-dialog__actions"><button type="button" data-villa-game-confirm>Перейти</button><button type="button" data-villa-game-cancel>Остаться</button></div>';
      document.body.appendChild(dialog);
      dialog.querySelector('[data-villa-game-cancel]').onclick=function(){dialog.close();};
      dialog.addEventListener('close',function(){if(source&&source.isConnected)source.focus({preventScroll:true});});
      dialog.querySelector('[data-villa-game-confirm]').onclick=async function(){
        var button=this;button.disabled=true;dialog.querySelector('[data-villa-game-error]').textContent='';
        try{
          if(typeof window.pokerEnsureLazyDomains==='function')await window.pokerEnsureLazyDomains(['villa'],{styles:true,scripts:true});
          if(typeof window.pokerOpenVillaGameRoom!=='function')throw Error('Не удалось загрузить комнату. Попробуйте ещё раз.');
          dialog.close();await window.pokerOpenVillaGameRoom(selected);
        }catch(e){dialog.querySelector('[data-villa-game-error]').textContent=/^Failed to load (script|stylesheet)/.test(e?.message)?'Не удалось загрузить игровую комнату. Проверьте соединение и попробуйте снова.':e?.message||'Не удалось открыть комнату.';button.textContent='Попробовать снова';if(!dialog.open)dialog.showModal();}
        finally{button.disabled=false;}
      };
    }
    dialog.querySelector('h2').textContent=game==='billiards'?'Перейти в бильярдную?':game==='nards'?'Перейти в гостиную для игры в нарды?':'Перейти в гостиную для игры в шахматы?';
    dialog.querySelector('[data-villa-game-description]').textContent='Откроется игровая комната на вашей вилле.';
    dialog.querySelector('[data-villa-game-error]').textContent='';
    dialog.querySelector('[data-villa-game-confirm]').textContent='Перейти';
    dialog.showModal();
  });
})();
