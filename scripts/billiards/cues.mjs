// Cosmetic equipment only: physics, aim guide and network actions never depend on cues.
export const CUES=Object.freeze([
 {id:'maple',name:'Первый удар',level:0,color:'#dec18d',grip:'#62452e',metal:'#b6a38a'},
 {id:'walnut',name:'Ореховый клуб',level:10,color:'#633a23',grip:'#453024',metal:'#d5ae60'},
 {id:'aces',name:'Два туза',level:20,color:'#124e3c',grip:'#173c30',metal:'#e7bb61'},
 {id:'ocean',name:'Океан',level:35,color:'#226b96',grip:'#203f56',metal:'#cad7df'},
 {id:'carbon',name:'Карбон',level:50,color:'#242b30',grip:'#161d21',metal:'#d6dee3'},
 {id:'ruby',name:'Рубиновый',level:65,color:'#6d1726',grip:'#3c1720',metal:'#edbf65'},
 {id:'signature',name:'Именной',level:80,color:'#eee0b2',grip:'#171b1a',metal:'#e5bf68',named:true},
 {id:'sovereign',name:'Повелитель стола',level:100,color:'#122d27',grip:'#12201c',metal:'#f4cc71'}
]);
export function availableCue(id,level){const cue=CUES.find(c=>c.id===id);return cue&&Number.isFinite(level)&&level>=cue.level?cue:CUES[0];}
export function heroFromHall(hall){if(!hall?.self||!hall.accountId)throw Error('Не удалось получить вашего героя.');const level=Number(hall.garage?.stats?.level);if(!Number.isFinite(level)||level<0)throw Error('Уровень героя пока недоступен.');return {accountId:String(hall.accountId),level:Math.floor(level),nick:String(hall.nick||hall.name||'Герой').trim().slice(0,28)};}
export function mountCues({source,room,openInitially=false}){
 const $=id=>document.getElementById(id),dialog=$('cueDialog');let hero=null,selected=CUES[0],loading=false;
 function key(){return 'p21:billiards:cue:v1:'+hero.accountId;}
 function apply(cue){selected=cue;room?.setCue(cue,hero?.nick||'');$('cueButton').textContent='Кий · '+cue.name;}
 function render(){
  const focused=document.activeElement?.dataset?.cue;
  $('cueHero').textContent=loading?'Получаем уровень героя…':hero?'Ваш герой · уровень '+hero.level:'Базовый кий доступен всем';
  $('cueList').replaceChildren();
  CUES.forEach((cue,index)=>{const unlocked=!!hero&&hero.level>=cue.level||cue.level===0,card=document.createElement('button');card.type='button';card.className='cue-card';card.dataset.cue=cue.id;card.setAttribute('aria-pressed',String(selected.id===cue.id));card.disabled=!unlocked||loading;
   const art=document.createElement('span');art.className='cue-card__art';art.style.backgroundPosition=(index/7*100)+'% center';art.setAttribute('aria-hidden','true');
   const title=document.createElement('strong');title.textContent=cue.name;const level=document.createElement('small');level.textContent=cue.level?'С '+cue.level+' уровня':'Доступен всем';const state=document.createElement('span');state.className='cue-card__state';state.textContent=!unlocked?'🔒 Ещё '+Math.max(0,cue.level-(hero?.level||0))+' ур.':selected.id===cue.id?'✓ Выбран':'Выбрать';card.append(art,title,level);
   if(cue.named){const name=document.createElement('span');name.className='cue-card__name';name.textContent=hero?.level>=cue.level?hero.nick:'Ваш ник на кие';card.append(name);}card.append(state);
   card.onclick=()=>{if(loading||!unlocked)return;apply(cue);try{if(hero)localStorage.setItem(key(),cue.id);}catch{}render();$('cueFeedback').textContent='Выбран кий «'+cue.name+'»'+(cue.named?' · '+hero.nick:'')+'.';};$('cueList').append(card);
  });
  if(focused){const card=Array.from($('cueList').children).find(c=>c.dataset.cue===focused);if(card&&!card.disabled)card.focus({preventScroll:true});}
 }
 async function refresh(){if(loading)return;loading=true;render();$('cueError').textContent='';try{if(typeof source.pokerSocialRequest!=='function')throw Error('Откройте бильярд из своего дома, чтобы получить уровень героя.');const result=await source.pokerSocialRequest('player-hall',{action:'get'});hero=heroFromHall(result.hall);let saved;try{saved=localStorage.getItem(key());}catch{}apply(availableCue(saved,hero.level));}catch(error){hero=null;apply(CUES[0]);$('cueError').textContent=error.message||'Не удалось загрузить героя.';}finally{loading=false;render();}}
 $('cueRetry').onclick=refresh;$('cueClose').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 $('cueButton').onclick=()=>{dialog.showModal();refresh();};apply(CUES[0]);render();refresh();if(openInitially)dialog.showModal();
 return {inspect:()=>({selected:selected.id,level:hero?.level??null,nick:hero?.nick||'',loading})};
}
