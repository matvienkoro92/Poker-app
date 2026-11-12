const seen=new Set();
let dialog;
function playJackpotConfetti(dialog){
 dialog.querySelector('.jackpot-confetti')?.remove();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const layer=document.createElement('div');layer.className='jackpot-confetti';layer.setAttribute('aria-hidden','true');
 for(let i=0;i<24;i++){
  const piece=document.createElement('i');
  piece.style.cssText='--x:'+((i*43)%100)+'%;--drift:'+((i%2?1:-1)*(20+i%5*9))+'px;--delay:'+(i%8*.09)+'s;--spin:'+(i%2?420:-420)+'deg;background:'+['#ffe19a','#d7a94a','#8cddb6','#fff3cf'][i%4];
  layer.append(piece);
 }
 layer.addEventListener('animationend',event=>{event.target.remove();if(!layer.children.length)layer.remove();});dialog.append(layer);
}
const pips={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
function die(face){return '<span class="jackpot-die">'+Array.from({length:9},(_,i)=>'<i'+(pips[face].includes(i+1)?' class="is-pip"':'')+'></i>').join('')+'</span>';}
export function showNardsJackpot(award,name='Игрок'){
 if(!dialog){
  dialog=document.createElement('dialog');dialog.className='nards-jackpot-dialog';dialog.setAttribute('aria-labelledby','nardsJackpotTitle');
  dialog.innerHTML='<div class="jackpot-glow" aria-hidden="true">✦</div><small>ДЖЕКПОТ В НАРДАХ</small><h2 id="nardsJackpotTitle"></h2><div class="jackpot-rolls" aria-hidden="true"></div><p class="jackpot-description"></p><div class="jackpot-ticket">Билет на покерный турнир<strong>1 000 ₽</strong></div><button type="button" class="primary" autofocus>ОК</button>';
  dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>dialog.querySelector('.jackpot-confetti')?.remove());document.body.append(dialog);
 }
 dialog.dataset.celebration=String(!!award);
 dialog.querySelector('.jackpot-glow').textContent=award?'🏆':'✦';
 dialog.querySelector('small').textContent=award?'ВЫ СОРВАЛИ ДЖЕКПОТ!':'ДЖЕКПОТ В НАРДАХ';
 dialog.querySelector('h2').textContent=award?'Поздравляем!':'Три одинаковых куша подряд';
 const face=Number.isInteger(award?.face)&&award.face>=1&&award.face<=6?award.face:6;
 dialog.querySelector('.jackpot-rolls').innerHTML=Array.from({length:3},(_,i)=>'<span class="jackpot-pair" style="--pair:'+i+'">'+die(face)+die(face)+'<b>'+(i+1)+'</b></span>').join('');
 dialog.querySelector('.jackpot-description').textContent=award?'Вам выпало '+face+':'+face+' три раза подряд! Ваш выигрыш — билет на покерный турнир за 1 000 ₽.':'Выбросьте один и тот же куш три раза подряд за одну партию: например, 6:6 → 6:6 → 6:6. Считаются ваши броски.';
 if(!dialog.open)dialog.showModal();
 dialog.querySelector('.jackpot-confetti')?.remove();if(award)playJackpotConfetti(dialog);
}
export function announceNardsJackpot(award,name,{player,spectator=false}={}){
 if(spectator||player!==award?.player)return;
 if(!award?.id||seen.has(award.id))return;
 const key='nards-jackpot-seen:'+award.id;
 try{if(sessionStorage.getItem(key)){seen.add(award.id);return;}}catch{}
 // A different modal may be waiting for the player's answer. Retry on the next update.
 if(document.querySelector('dialog[open]'))return;
 showNardsJackpot(award,name);seen.add(award.id);
 try{sessionStorage.setItem(key,'1');}catch{}
}
