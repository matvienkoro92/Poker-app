// Two full-screen parts of the Play section: Tournament, then Poker21.
(function () {
  "use strict";
  var flow = null;
  var observer = null;
  var sceneObserver = null;
  var touchStart = null;
  var lastSwipeAt = 0;
  var dragFrame = 0, dragTrack = null, dragPosition = 0;
  function flushDrag() {
    if(dragFrame)cancelAnimationFrame(dragFrame);dragFrame=0;
    if(dragTrack && dragTrack.isConnected)dragTrack.style.transform='translate3d('+dragPosition+'px,0,0)';
    dragTrack=null;
  }


  var coolerSpeech = null, coolerSpeechTimer = null, coolerPose = null, coolerTarget = null;
  var greetingArt = './assets/cooler-flight/cooler-scene-greeting-v1.webp';
  var angryArt = './assets/cooler-flight/cooler-scene-angry-v1.webp';
  var hurtArt = './assets/cooler-flight/cooler-scene-hurt-v1.webp';
  var coolerPoseChange = 0;
  function changeCoolerPose(src) {
    if(!coolerPose || coolerPose.getAttribute('src')===src)return;
    var previous=coolerPose, change=++coolerPoseChange;
    var next=previous.cloneNode(false);next.src=src;next.loading='eager';
    function swap(){
      if(change!==coolerPoseChange || coolerPose!==previous || !next.naturalWidth)return;
      previous.replaceWith(next);coolerPose=next;
    }
    if(typeof next.decode==='function')next.decode().then(swap).catch(function(){});
    else if(next.complete)swap();else next.addEventListener('load',swap,{once:true});
  }
  function closeCooler() {
    coolerPoseChange++;

    clearTimeout(coolerSpeechTimer);coolerSpeechTimer=null;
    if(coolerSpeech)coolerSpeech.remove();coolerSpeech=null;
    if(coolerPose){coolerPose.parentElement.classList.remove('evening-cooler-active');coolerPose.remove();}coolerPose=null;
    if(coolerTarget)coolerTarget.setAttribute('aria-expanded','false');coolerTarget=null;
  }
  function positionCoolerSpeech() {
    if(!coolerSpeech || !coolerTarget)return;
    var rect=coolerTarget.getBoundingClientRect(),width=coolerSpeech.offsetWidth,height=coolerSpeech.offsetHeight;
    coolerSpeech.style.left=Math.max(8,Math.min(window.innerWidth-width-8,rect.left-width*.75))+'px';
    coolerSpeech.style.top=Math.max(12,Math.min(window.innerHeight-height-12,rect.top+rect.height*.2-height-10))+'px';
  }
  function inviteCooler() {
    changeCoolerPose(greetingArt);coolerSpeech.dataset.state='invite';
    coolerSpeech.innerHTML='<p>Помогите набить мне банкрол.</p><p>Сыграйте со мной в игру Кулершан.</p><div class="evening-cooler-speech__actions"><button type="button" data-cooler-choice="play">Сыграть</button><button type="button" data-cooler-choice="skip">Послать</button><button type="button" data-cooler-choice="hit">Ударить</button></div>';
    positionCoolerSpeech();
  }
  document.addEventListener('click',function(event){
    var choice=event.target.closest && event.target.closest('[data-cooler-choice]');
    if(choice && coolerSpeech && coolerSpeech.contains(choice)){
      event.preventDefault();
      if(choice.dataset.coolerChoice==='skip'){
        changeCoolerPose(angryArt);coolerSpeech.dataset.state='angry';coolerSpeech.innerHTML='<p>Игру-то понимать надо!</p>';positionCoolerSpeech();
        coolerSpeechTimer=setTimeout(function(){var target=coolerTarget;closeCooler();if(target)target.focus({preventScroll:true});},3000);
      }else if(choice.dataset.coolerChoice==='hit'){
        changeCoolerPose(hurtArt);coolerSpeech.dataset.state='hurt';coolerSpeech.innerHTML='<p>Ах ты ска! Не дорос еще с дядей Кулером тягаться!</p>';positionCoolerSpeech();
        coolerSpeechTimer=setTimeout(function(){coolerSpeechTimer=null;if(coolerSpeech && document.body.dataset.view==='download')inviteCooler();else closeCooler();},3000);
      }else{var play=choice.dataset.coolerChoice==='play';var target=coolerTarget;closeCooler();if(play && typeof window.setView==='function')window.setView('cooler-flight');else if(target)target.focus({preventScroll:true});}
      return;
    }
    var target=event.target.closest && event.target.closest('.evening-reference__cooler-hit');
    if(!target || coolerSpeechTimer)return;
    event.preventDefault();closeCooler();coolerTarget=target;target.setAttribute('aria-expanded','true');
    var scene=target.parentElement,art=scene.querySelector('img.evening-reference__art--portal-side');if(!art)return;
    coolerPose=art.cloneNode(false);coolerPose.classList.add('evening-cooler-pose');coolerPose.src=greetingArt;scene.appendChild(coolerPose);
    coolerSpeech=document.createElement('div');coolerSpeech.className='evening-cooler-speech';coolerSpeech.setAttribute('role','dialog');coolerSpeech.setAttribute('aria-label','Кулер приглашает в Кулершан');coolerSpeech.setAttribute('aria-live','polite');document.body.appendChild(coolerSpeech);
    inviteCooler();var pose=coolerPose;function showPose(){if(coolerPose===pose){scene.classList.add('evening-cooler-active');pose.classList.add('evening-cooler-pose--visible');}}if(pose.complete && pose.naturalWidth)showPose();else pose.addEventListener('load',showPose,{once:true});
    coolerSpeech.querySelector('button').focus({preventScroll:true});
    [greetingArt,hurtArt,angryArt].forEach(function(src){var image=new Image();image.src=src;});
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape' && coolerSpeech){var target=coolerTarget;closeCooler();if(target)target.focus({preventScroll:true});}});
  window.addEventListener('resize',positionCoolerSpeech);
  window.addEventListener('scroll',positionCoolerSpeech,{passive:true});
  new MutationObserver(function(){if(document.body.dataset.view!=='download')closeCooler();}).observe(document.body,{attributes:true,attributeFilter:['data-view']});

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
    flushDrag();
    closeCooler();
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
      observer = new ResizeObserver(size);
      observer.observe(flow);
    }
    var scene = flow.querySelector(".tournament-day-home-dual--tournament-focus");
    if (scene) {
      sceneObserver = new MutationObserver(size);
      sceneObserver.observe(scene, { attributes: true, attributeFilter: ["data-tournament-character"] });
    }
    flow.querySelectorAll('img').forEach(function(image){
      image.loading='eager';image.decoding='async';
      if(typeof image.decode==='function')image.decode().catch(function(){});
    });
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
