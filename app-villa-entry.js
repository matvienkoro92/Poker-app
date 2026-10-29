/* The arrival screen opens before the optional profile bundle is downloaded. */
(function(){
  'use strict';
  window.pokerVillaLoadingMarkup=function(){
    return '<header class="villa-loading__header"><span class="villa-loading__brand">TWO ACES <i>♠</i></span><button type="button" data-hall-close aria-label="Закрыть загрузку виллы">✕</button></header>'+
      '<section class="villa-loading" aria-busy="true"><div class="villa-loading__eyebrow">ВАШ ДОМ У ОКЕАНА</div><h2 id="playerHallTitle">Вилла</h2><div class="villa-loading__coordinates" aria-hidden="true">PRIVATE RESIDENCE · TWO ACES</div>'+
      '<div class="villa-loading__aerial" aria-hidden="true"><div class="villa-loading__orbit"></div><div class="villa-loading__map"><img src="./assets/player-hall/coastal-house-map-v8-thumb.webp" alt="" width="720" height="420" fetchpriority="high"><div class="villa-loading__indicator" aria-hidden="true"><span class="villa-loading__spinner">♠</span><span>Загрузка…</span></div><span class="villa-loading__water"></span><span class="villa-loading__water villa-loading__water--pool"></span><span class="villa-loading__scan"></span><span class="villa-loading__light villa-loading__light--home"></span><span class="villa-loading__light villa-loading__light--lounge"></span><span class="villa-loading__light villa-loading__light--garage"></span><svg class="villa-loading__route" viewBox="0 0 100 58.33"><path d="M47 53V44L44 36V24H72V32L68 41"/></svg></div><span class="villa-loading__north">N<br>↑</span><span class="villa-loading__caption">ВИД СВЕРХУ / РЕЗИДЕНЦИЯ</span></div>'+
      '<div class="villa-loading__welcome"><span class="villa-loading__key" aria-hidden="true">♠</span><p class="villa-loading__status" role="status">Загружаем виллу…</p><p class="villa-loading__hint">Ваше место силы уже близко</p><div class="villa-loading__track" aria-hidden="true"><span></span></div><div class="villa-loading__destinations" aria-hidden="true"><span>Дом</span><i></i><span>Лаунж</span><i></i><span>Гараж</span></div></div></section>';
  };
  window.pokerShowVillaLoading=function(){
    var shell=window.pokerVillaDialog;
    if(!shell){shell=document.createElement('dialog');window.pokerVillaDialog=shell;document.body.appendChild(shell);}
    shell.className='player-hall-dialog player-hall-dialog--pending';
    shell.setAttribute('aria-labelledby','playerHallTitle');
    shell.innerHTML=window.pokerVillaLoadingMarkup();
    if(!shell.open)shell.showModal();
    return shell;
  };
  window.pokerFailVillaLoading=function(shell,message){
    if(!shell||!shell.open)return;
    var status=shell.querySelector('.villa-loading__status');
    if(status){status.textContent=message;status.setAttribute('role','alert');}
    var section=shell.querySelector('.villa-loading');
    if(section){section.setAttribute('aria-busy','false');var retry=document.createElement('button');retry.type='button';retry.className='villa-loading__retry';retry.dataset.villaLoadRetry='';retry.textContent='Попробовать ещё раз';section.appendChild(retry);}
  };
  document.addEventListener('click',function(e){
    var close=e.target.closest('[data-hall-close]'),retry=e.target.closest('[data-villa-load-retry]'),shell=window.pokerVillaDialog;
    if(!shell||!shell.open||!shell.classList.contains('player-hall-dialog--pending'))return;
    if(close&&shell.contains(close))shell.close();
    if(retry&&shell.contains(retry)){shell.close();var entry=document.querySelector('.bottom-nav__item[data-view-target="player-hall"]');if(entry)entry.click();}
  });
})();
