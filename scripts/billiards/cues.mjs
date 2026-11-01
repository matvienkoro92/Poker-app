import {loadNearbyCardImages} from '../shared/card-images.mjs';
import {paintEquipmentButton} from './equipment-button.mjs';
// Cosmetic equipment only: physics, aim guide and network actions never depend on cues.
import cueCatalog from '../../app-billiards-cues.js';
export const CUES=cueCatalog.cues;
export const availableCue=cueCatalog.available;
export function heroFromHall(hall){if(!hall?.self||!hall.accountId)throw Error('Не удалось получить вашего героя.');const level=Number(hall.garage?.stats?.level);if(!Number.isFinite(level)||level<0)throw Error('Уровень героя пока недоступен.');return {accountId:String(hall.accountId),level:Math.floor(level),superShot:hall.superShot||{wins:0,tokens:0,effects:[]},nick:String(hall.nick||hall.name||'Герой').trim().slice(0,28)};}
export function mountCues({source,room,openInitially=false}){
 const $=id=>document.getElementById(id),dialog=$('cueDialog');let hero=null,selected=CUES[0],loading=false,roomCue=null,roomNick='';
 const trophyInfo=document.createElement('p'),shop=document.createElement('button');trophyInfo.className='super-shot-progress';shop.type='button';shop.textContent='Эффект забития · 3 жетона';$('cueHero').after(trophyInfo,shop);
 shop.onclick=async()=>{shop.disabled=true;try{const response=await fetch((source.getApiBase?.()||location.origin)+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({...source.pokerApiAuthJsonBody?.({}),action:'super-shot-shop',item:'master-spark'})}),data=await response.json();if(!response.ok||!data.ok)throw Error(data.error||'Не удалось получить эффект.');hero.superShot=data.superShot;render();$('cueFeedback').textContent='Эффект забития открыт навсегда.';}catch(e){$('cueError').textContent=e.message;render();}};
 function key(){return 'p21:billiards:cue:v1:'+hero.accountId;}
 function paint(){const cue=roomCue||selected,nick=roomCue?roomNick:hero?.nick||'';room?.setCue(cue,nick);paintEquipmentButton($('cueButton'),roomCue?'Кий хозяина':'Кий',cue.name);$('cueButton').disabled=!!roomCue;$('cueButton').title=roomCue?'В этой комнате используется инвентарь хозяина':'';cueCatalog.paintPreview(document.querySelector('main'),cue,nick);}
 function apply(cue){selected=cue;paint();}
 function render(){
  const focused=document.activeElement?.dataset?.cue;
  $('cueSave').disabled=loading;const progress=hero?.superShot||{wins:0,tokens:0,effects:[]};trophyInfo.textContent=(progress.wins?'🏅 Мастер решающего удара · ':'')+'Суперударов: '+progress.wins+' · Жетоны мастерства: '+progress.tokens;shop.hidden=progress.effects?.includes('master-spark');shop.disabled=loading||!hero||progress.tokens<3;
  $('cueHero').textContent=loading?'Получаем уровень героя…':hero?'Ваш герой · уровень '+hero.level:'Базовый кий доступен всем';
  $('cueList').replaceChildren();
  CUES.forEach((cue,index)=>{const unlocked=cueCatalog.unlocked(cue,hero?.level??0,hero?.superShot?.wins||0),card=document.createElement('button');card.type='button';card.className='cue-card';card.dataset.cue=cue.id;card.setAttribute('aria-pressed',String(selected.id===cue.id));card.disabled=!unlocked||loading;
   const art=document.createElement('img');art.className='cue-card__art';art.dataset.cardSrc=cue.art;art.alt='Кий «'+cue.name+'»';art.loading='lazy';art.decoding='async';
   const title=document.createElement('strong');title.textContent=cue.name;const level=document.createElement('small');level.textContent=cue.superShotWins?(cue.superShotWins===1?'За первый суперудар':'За '+cue.superShotWins+' суперударов'):cue.level?'С '+cue.level+' уровня':'Доступен всем';const state=document.createElement('span');state.className='cue-card__state';state.textContent=!unlocked?(cue.superShotWins?'🔒 Ещё '+Math.max(0,cue.superShotWins-(hero?.superShot?.wins||0))+' попаданий':'🔒 Ещё '+Math.max(0,cue.level-(hero?.level||0))+' ур.'):selected.id===cue.id?'✓ Выбран':'Выбрать';card.append(art,title,level);
   if(cue.named){const name=document.createElement('span');name.className='cue-card__name';name.textContent=unlocked?hero.nick:'Ваш ник на кие';card.append(name);}card.append(state);
   card.onclick=()=>{if(loading||!unlocked)return;apply(cue);try{if(hero){localStorage.setItem(key(),cue.id);if(parent!==window)parent.postMessage({type:'p21-billiards-cue-saved'},location.origin);}}catch{}render();$('cueFeedback').textContent='Выбран кий «'+cue.name+'»'+(cue.named?' · '+hero.nick:'')+'.';};$('cueList').append(card);
  });
  loadNearbyCardImages($('cueList'));
  if(focused){const card=Array.from($('cueList').children).find(c=>c.dataset.cue===focused);if(card&&!card.disabled)card.focus({preventScroll:true});}
 }
 async function refresh(){if(loading)return;loading=true;render();$('cueError').textContent='';try{if(typeof source.pokerSocialRequest!=='function')throw Error('Откройте бильярд из своего дома, чтобы получить уровень героя.');const result=await source.pokerSocialRequest('player-hall',{action:'get'});hero=heroFromHall(result.hall);let saved;try{saved=localStorage.getItem(key());}catch{}apply(availableCue(saved,hero.level,hero.superShot.wins));}catch(error){hero=null;apply(CUES[0]);$('cueError').textContent=error.message||'Не удалось загрузить героя.';}finally{loading=false;render();}}
 $('cueSave').onclick=()=>{if(loading)return;try{if(hero)localStorage.setItem(key(),selected.id);apply(selected);if(parent!==window)parent.postMessage({type:'p21-billiards-cue-saved'},location.origin);dialog.close();}catch{$('cueError').textContent='Не удалось сохранить выбор в браузере. Разрешите хранение данных и попробуйте ещё раз.';}};
 $('cueRetry').onclick=refresh;$('cueClose').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 function open(){if(roomCue)return false;if(!dialog.open)dialog.showModal();refresh();}
 $('cueButton').onclick=open;apply(CUES[0]);render();const ready=refresh();if(openInitially)open();
 return {open,ready,setRoomEquipment(id,nick){roomCue=CUES.find(c=>c.id===id)||CUES[0];roomNick=String(nick||'').slice(0,28);if(dialog.open)dialog.close();paint();},clearRoomEquipment(){roomCue=null;roomNick='';paint();},inspect:()=>({selected:(roomCue||selected).id,personalSelected:selected.id,level:hero?.level??null,nick:roomCue?roomNick:hero?.nick||'',effect:hero?.superShot?.effects?.includes('master-spark')?'master-spark':null,loading,shared:!!roomCue})};
}
