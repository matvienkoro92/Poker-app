(function(){
 'use strict';
 var dialog,opener;
 function openGuide(button){
  if(!dialog){
   dialog=document.createElement('dialog');dialog.className='jackpot-guide-dialog jackpot-guide-dialog--poster';dialog.setAttribute('aria-labelledby','jackpotGuideDialogTitle');
   dialog.innerHTML='<header><div><p>POKER21</p><h2 id="jackpotGuideDialogTitle">Награды за комбинации</h2></div><div class="jackpot-guide-dialog__tools"><button type="button" class="jackpot-guide-dialog__zoom" data-jackpot-guide-zoom aria-pressed="false">Крупнее</button><button type="button" data-jackpot-guide-close aria-label="Закрыть таблицу">×</button></div></header><div class="jackpot-guide-dialog__poster-scroll" tabindex="0" aria-label="Таблица наград, область прокрутки"><img class="jackpot-guide-dialog__poster" width="941" height="1672" src="./assets/jackpot-virtual-rewards-pokermanki-v1.webp" alt="Poker21: таблица виртуальных наград за каре, стрит-флеш и роял-флеш для разных игровых лимитов и турниров" decoding="async"></div>';
   document.body.appendChild(dialog);
   dialog.addEventListener('click',function(e){
    if(e.target.closest('[data-jackpot-guide-close]'))dialog.close();
    else if(e.target.closest('[data-jackpot-guide-zoom]')){var zoom=dialog.querySelector('[data-jackpot-guide-zoom]'),large=zoom.getAttribute('aria-pressed')!=='true';zoom.setAttribute('aria-pressed',String(large));zoom.textContent=large?'По ширине':'Крупнее';dialog.classList.toggle('is-zoomed',large);}
    else if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}
   });
   dialog.addEventListener('close',function(){if(opener&&opener.isConnected)opener.focus({preventScroll:true});});
  }
  opener=button;if(!dialog.open)dialog.showModal();
 }
 document.addEventListener('click',function(e){var button=e.target.closest('[data-jackpot-guide-open],[data-jackpot-monkey]');if(button)openGuide(button);});
})();
