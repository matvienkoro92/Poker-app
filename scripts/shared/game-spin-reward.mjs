export function gameSpinRewardPreview(stake,raceTo=1){
 if(!Number.isSafeInteger(stake)||stake<300)return '';
 return Number(raceTo)>1?'После завершения всего матча каждый игрок получит 1 бесплатную крутку.':'После завершения этой партии каждый игрок получит 1 бесплатную крутку.';
}
export function gameSpinRewardText(wager){
 if(!wager?.freeSpinReward)return '';
 const match=Number(wager.freeSpinReward.matchTarget)>1;
 if(wager.freeSpinReward.granted)return 'Каждому начислена 1 бесплатная крутка '+(match?'за весь матч.':'за эту партию.');
 if(['refunded','cancelled'].includes(wager.status))return '';
 return gameSpinRewardPreview(wager.stake,match?3:1);
}
export function paintGameSpinReward(container,wager,rewardKey=''){
 let block=container.querySelector('.game-spin-reward');
 if(!wager?.freeSpinReward?.granted){if(block)block.hidden=true;return;}
 const key=rewardKey||JSON.stringify([wager.stake,wager.freeSpinReward.matchTarget]);
 if(!block){block=document.createElement('div');block.className='game-spin-reward';block.setAttribute('role','status');block.innerHTML='<span class="game-spin-reward__icon" aria-hidden="true">🎁</span><strong>+1 бесплатная крутка</strong><small></small><button type="button" class="game-spin-reward__claim">Получить</button>';container.append(block);}
 block.hidden=false;
 const note=block.querySelector('small'),text=gameSpinRewardText(wager)+' Крутка уже начислена автоматически.';if(note.textContent!==text)note.textContent=text;
 if(block.dataset.reward===key)return;block.dataset.reward=key;
 const storageKey='p21-spin-reward-seen:'+key;let acknowledged=false;try{acknowledged=sessionStorage.getItem(storageKey)==='1';}catch{}
 const button=block.querySelector('button');
 function paintClaim(){button.textContent=acknowledged?'Получено ✓':'Получить';button.disabled=acknowledged;block.classList.toggle('is-claimed',acknowledged);}
 paintClaim();block.classList.remove('is-arriving');
 if(!acknowledged&&!matchMedia('(prefers-reduced-motion: reduce)').matches){void block.offsetWidth;block.classList.add('is-arriving');}
 // Presentation only: the server has already awarded the spin. Never send a claim request.
 button.onclick=()=>{if(acknowledged)return;acknowledged=true;try{sessionStorage.setItem(storageKey,'1');}catch{}block.classList.remove('is-arriving');paintClaim();};
}
