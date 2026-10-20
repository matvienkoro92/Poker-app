(function(){
 'use strict';
 var dialog,opener;
 function openGuide(button){
  if(!dialog){
   dialog=document.createElement('dialog');dialog.className='jackpot-guide-dialog';dialog.setAttribute('aria-labelledby','jackpotGuideDialogTitle');
   dialog.innerHTML='<header><div><p>СПРАВОЧНИК POKER21</p><h2 id="jackpotGuideDialogTitle">Комбинации и правила джекпота</h2></div><button type="button" data-jackpot-guide-close aria-label="Закрыть справочник">×</button></header><p class="jackpot-guide-dialog__intro">Три названия, которые встречаются в правилах хайхенд-джекпота.</p><dl><div><dt>Каре <span aria-hidden="true">A♠ A♥ A♦ A♣</span></dt><dd>Четыре карты одного достоинства.</dd></div><div><dt>Стрит-флеш <span aria-hidden="true">5♠ 6♠ 7♠ 8♠ 9♠</span></dt><dd>Пять последовательных карт одной масти.</dd></div><div><dt>Роял-флеш <span aria-hidden="true">10♠ J♠ Q♠ K♠ A♠</span></dt><dd>Стрит-флеш от десятки до туза.</dd></div></dl><p class="jackpot-guide-dialog__note">Название комбинации само по себе не определяет условия джекпота. Они могут различаться для холдема, омахи и турниров. Полные действующие правила следует уточнять у организатора.</p>';
   document.body.appendChild(dialog);
   dialog.addEventListener('click',function(e){if(e.target.closest('[data-jackpot-guide-close]'))dialog.close();else if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
   dialog.addEventListener('close',function(){if(opener&&opener.isConnected)opener.focus({preventScroll:true});});
  }
  opener=button;if(!dialog.open)dialog.showModal();
 }
 document.addEventListener('click',function(e){var button=e.target.closest('[data-jackpot-guide-open]');if(button){openGuide(button);return;}var monkey=e.target.closest('[data-jackpot-monkey]');if(monkey){monkey.classList.remove('is-greeting');void monkey.offsetWidth;monkey.classList.add('is-greeting');}});
 document.addEventListener('animationend',function(e){if(e.target.matches('[data-jackpot-monkey]'))e.target.classList.remove('is-greeting');});
})();
