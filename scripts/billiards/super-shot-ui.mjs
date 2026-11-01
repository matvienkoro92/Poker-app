import {shoot,step} from './engine.mjs';
// This controller owns only the bonus state. The existing room, cue and controls
// render it; the settled match and personal equipment are never replaced.
export function mountSuperShot({request,after=document.getElementById('game'),enter=()=>{},exit=()=>{},wake=()=>{}}){
 const entry=document.createElement('button');entry.type='button';entry.className='super-shot-entry';entry.textContent='Супер удар';entry.hidden=true;(document.getElementById('matchResult')||after).append(entry);
 const back=document.createElement('button');back.type='button';back.className='super-shot-exit';back.textContent='К результату партии';back.hidden=true;after.append(back);
 const intro=document.createElement('div');intro.className='super-shot-intro';intro.textContent='Решающий бонус удар!';intro.hidden=true;intro.setAttribute('role','status');document.body.append(intro);
 let offer=null,state=null,active=false,busy=false,uncertain=null,response=null,introUntil=0,ticks=0,message='';
 function result(){message=offer?.status==='finished'?(offer.success?(offer.credited?'Решающий забит! Герой получил трофей. Суперударов: '+(offer.reward?.wins||0)+' · Жетонов: '+(offer.reward?.tokens||0):'Шар забит! Подтвердите получение трофея.'):'Не забито. Бонусная попытка завершена.'):'Забейте белый шар одним ударом, не уронив биток.';}
 function close(){active=false;intro.hidden=true;back.hidden=true;document.body.classList.remove('billiards-super-shot');exit();wake();}
 function open(){if(!offer||active)return;active=true;state=structuredClone(offer.state);busy=false;uncertain=null;response=null;result();introUntil=offer.status==='ready'?performance.now()+1800:0;intro.textContent='Решающий бонус удар!';intro.hidden=!introUntil;back.hidden=false;document.body.classList.add('billiards-super-shot');enter();wake();}
 entry.onclick=open;back.onclick=close;
 function finish(){if(!response)return;offer=response.superShot;response=null;state=structuredClone(offer.state);busy=false;uncertain=null;result();if(offer.success&&offer.credited&&active){intro.textContent='Решающий забит! Герой получил трофей';intro.hidden=false;introUntil=performance.now()+2400;}wake();}
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
  button:()=>uncertain&&!busy?'Проверить результат':offer?.status==='finished'&&offer.success&&!offer.credited?'Получить трофей':'Удар',
  canSubmit:()=>active&&!busy&&!introUntil&&(offer?.status==='ready'||offer?.success&&!offer.credited),
  message:()=>message,difficulty:()=>offer?.difficulty,
  reset(){if(active)close();offer=null;state=null;uncertain=null;response=null;busy=false;entry.hidden=true;intro.hidden=true;},
  inspect:()=>({event:offer?.event,status:offer?.status,active,busy,state:state?structuredClone(state):null})
 };
}
