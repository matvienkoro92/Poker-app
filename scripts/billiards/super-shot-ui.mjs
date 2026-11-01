import {shoot,step} from './engine.mjs';
// This controller owns only the bonus state. The existing room, cue and controls
// render it; the settled match and personal equipment are never replaced.
export function mountSuperShot({request,after=document.getElementById('game'),enter=()=>{},exit=()=>{},wake=()=>{},hero=()=>'Герой'}){
 const entry=document.createElement('button');entry.type='button';entry.className='super-shot-entry';entry.textContent='Супер удар';entry.hidden=true;(document.getElementById('matchResult')||after).append(entry);
 const back=document.createElement('button');back.type='button';back.className='super-shot-exit';back.textContent='К результату партии';back.hidden=true;after.append(back);
 const intro=document.createElement('div');intro.className='super-shot-intro';intro.textContent='Решающий бонус удар!';intro.hidden=true;intro.setAttribute('role','status');document.body.append(intro);
 const reward=document.createElement('div');reward.className='super-shot-reward';reward.hidden=true;reward.setAttribute('role','dialog');reward.setAttribute('aria-modal','true');reward.setAttribute('aria-label','Награда за решающий удар');
 reward.innerHTML='<section class="super-shot-reward__card"><span class="super-shot-reward__eyebrow">МАСТЕРСТВО ВОЗНАГРАЖДАЕТСЯ</span><img src="./assets/player-hall/trophy-super-shot-gold.svg" alt="Золотой шар" width="160" height="160"><h2>Есть суперудар!</h2><strong data-hero></strong><div class="super-shot-reward__prizes"><b data-cash></b><b data-spins></b></div><p data-token></p><p data-trophy></p><p data-goal></p><button type="button">Забрать и продолжить</button></section>';document.body.append(reward);let previousFocus=null;
 function hideReward(){reward.hidden=true;document.body.classList.remove('billiards-reward-reveal');(previousFocus?.disabled?back:previousFocus)?.focus?.({preventScroll:true});}
 reward.querySelector('button').onclick=hideReward;
 reward.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();hideReward();}if(e.key==='Tab'){e.preventDefault();reward.querySelector('button').focus();}});
 function celebrate(){const r=offer.reward||{},wins=Number(r.wins)||0,next=[1,10,25].find(n=>n>wins);reward.querySelector('[data-hero]').textContent=hero();reward.querySelector('[data-cash]').textContent=r.cash?'+'+r.cash+' ₽ на Покер21':'Трофей мастерства';reward.querySelector('[data-spins]').textContent=r.spins?'+'+r.spins+' круток':'Решающий удар';reward.querySelector('[data-token]').textContent='+1 жетон мастерства · В коллекции: '+(r.tokens||0);reward.querySelector('[data-trophy]').textContent=wins===1?'Открыты золотой шар в витрину и кий «Решающий»':wins===10?'Открыт кий «Решающий · Золото»':wins===25?'Открыт именной кий «Решающий · Легенда»':'Успешных суперударов: '+wins;reward.querySelector('[data-goal]').textContent=next?'До '+(next===10?'золотого кия':next===25?'именного кия':'первого трофея')+' — ещё '+(next-wins)+' попаданий':'Мастер решающего удара · Коллекция киев открыта';previousFocus=document.activeElement;reward.hidden=false;document.body.classList.add('billiards-reward-reveal');reward.querySelector('button').focus({preventScroll:true});}
 let offer=null,state=null,active=false,busy=false,uncertain=null,response=null,introUntil=0,ticks=0,message='';
 function result(){message=offer?.status==='finished'?(offer.success?(offer.credited?'Решающий забит! Награда получена. Суперударов: '+(offer.reward?.wins||0)+' · Жетонов: '+(offer.reward?.tokens||0):'Шар забит! Подтвердите получение награды.'):'Не забито. Бонусная попытка завершена.'):'Забейте белый шар без фола: 300 ₽ на Покер21, 5 круток и жетон мастерства.';}
 function close(){hideReward();active=false;intro.hidden=true;back.hidden=true;document.body.classList.remove('billiards-super-shot');exit();wake();}
 function open(){if(!offer||active)return;active=true;state=structuredClone(offer.state);busy=false;uncertain=null;response=null;result();introUntil=offer.status==='ready'?performance.now()+1800:0;intro.textContent='Решающий бонус удар!';intro.hidden=!introUntil;back.hidden=false;document.body.classList.add('billiards-super-shot');enter();wake();}
 entry.onclick=open;back.onclick=close;
 function finish(){if(!response)return;offer=response.superShot;response=null;state=structuredClone(offer.state);busy=false;uncertain=null;result();if(offer.success&&offer.credited&&active){intro.hidden=true;introUntil=0;celebrate();}wake();}
 async function submit(shot){
  if(!active||busy||!offer)return;if(offer.status==='finished'&&(!offer.success||offer.credited))return;
  const event=offer.event,input=uncertain||shot;uncertain=input;busy=true;message='Проверяем удар…';wake();
  try{const d=await request({action:'super-shot',roomId:offer.roomId,event,...input});if(offer?.event!==event)return;response=d;
   if(offer.status==='ready'&&active){const preview=structuredClone(offer.state);if(shoot(preview,input.angle,input.power,{cueId:0,spin:input.spin})){state=preview;ticks=0;message='Шары в движении';wake();return;}}
   finish();
  }catch(error){if(offer?.event!==event)return;busy=false;message=error.message+' Нажмите «Проверить результат»: новая попытка не создаётся.';wake();}
 }
 return {
  observe(view){const next=view?.superShot;if(!next){entry.hidden=true;return;}entry.hidden=false;if(next.event===offer?.event)return;if(active)close();offer=next;if(next.status==='ready')open();},
  update(now){if(!active)return null;if(introUntil&&now>=introUntil){introUntil=0;intro.hidden=true;}if(state.moving){for(let i=0;i<4&&state.moving&&ticks<7200;i++,ticks++)step(state);if(!state.moving||ticks>=7200)finish();}return state;},
  shoot:submit,active:()=>active,moving:()=>active&&(!!state?.moving||!!introUntil),canAim:()=>active&&!busy&&!uncertain&&!introUntil&&offer?.status==='ready'&&!state?.moving,
  button:()=>uncertain&&!busy?'Проверить результат':offer?.status==='finished'&&offer.success&&!offer.credited?'Получить награду':'Удар',
  canSubmit:()=>active&&!busy&&!introUntil&&(offer?.status==='ready'||offer?.success&&!offer.credited),
  message:()=>message,difficulty:()=>offer?.difficulty,
  reset(){if(active)close();offer=null;state=null;uncertain=null;response=null;busy=false;entry.hidden=true;intro.hidden=true;},
  inspect:()=>({rewardVisible:!reward.hidden,event:offer?.event,status:offer?.status,active,busy,state:state?structuredClone(state):null})
 };
}
