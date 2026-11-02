import {paintGameExperience} from './game-experience.mjs';
export function mountResultProgress(dialog,request){
 const first=dialog.querySelector('[data-result-stage]'),second=dialog.querySelector('[data-progress-stage]'),xp=dialog.querySelector('[data-result-experience]'),ranking=dialog.querySelector('[data-result-ranking]');let key='',model=null,response=null,failure=false,loading=false,animated=false;
 const next=dialog.querySelector('[data-result-next]');next.onclick=()=>{first.hidden=true;second.hidden=false;dialog.setAttribute('aria-labelledby','resultProgressTitle');paint(true);};
 function text(tag,value,className){const node=document.createElement(tag);node.textContent=value;if(className)node.className=className;return node;}
 function paint(replay=false){
  if(second.hidden||!model)return;
  if(model.reward){paintGameExperience(xp,model.reward,model.player,{replay});}else{xp.replaceChildren(text('p',model.draw?'За ничью опыт не начисляется.':model.matchPending?'Опыт начисляется после завершения всего матча.':model.online?'Данные о начислении опыта ещё не получены. Обновите результат.':'Опыт доступен в партиях с другими игроками.'));}
  if(ranking.dataset.resultKey===key&&ranking._response===response&&ranking._failure===failure&&ranking.childNodes.length)return;ranking.dataset.resultKey=key;ranking._response=response;ranking._failure=failure;
  ranking.replaceChildren();if(!model.online){ranking.append(text('p','Рейтинг учитывает партии с другими игроками.'));return;}
  if(!response){ranking.append(text('p',failure?'Не удалось загрузить рейтинг.':'Загружаем место в рейтинге…'));if(failure){const retry=text('button','Повторить');retry.type='button';retry.onclick=()=>fetchRanking();ranking.append(retry);}return;}
  const change=response.resultProgress,after=change?.after||response.self,before=change?.before,improved=!!(before?.rank&&after?.rank&&after.rank<before.rank);
  ranking.append(text('small',model.paid?'РЕЙТИНГ · НА ФИШКИ':'РЕЙТИНГ · БЕСПЛАТНЫЕ'));
  ranking.append(text('h3',after?.rank?(improved?'Место '+before.rank+' → '+after.rank:'Место '+after.rank+' из '+(change?.total||response.ranking?.length||after.rank)):'Пока нет места в рейтинге'));
  if(after?.rank)ranking.append(text('p','Очки рейтинга: '+Number(after.ratingScore||0).toFixed(2)));
  if(improved&&change.ladder?.length){
   const ladder=text('div','','result-rank-ladder'),oldOrder=[...change.ladder].sort((a,b)=>a.beforeRank-b.beforeRank);
   change.ladder.forEach((row,i)=>{const item=text('div','','result-rank-row'+(row.self?' is-self':''));item.append(text('b',String(row.rank)),text('span',row.name+(row.self?' · Вы':'')));ladder.append(item);if(!animated&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const delta=(oldOrder.indexOf(row)-i)*44;item.animate([{transform:'translateY('+delta+'px)'},{transform:'translateY(0)'}],{duration:1250,delay:200,easing:'cubic-bezier(.22,.7,.2,1)',fill:'backwards'});}});
   ranking.append(ladder);animated=true;
  }
 }
 async function fetchRanking(){if(!model?.online||loading)return;const current=key,options={action:'ranking',discipline:model.discipline,ratingMode:model.paid?'paid':'free',resultEvent:model.event};loading=true;failure=false;try{const value=await request(options);if(current===key)response=value;}catch{if(current===key)failure=true;}finally{if(current===key){loading=false;paint();}}}
 return {render(nextModel){model=nextModel;if(key!==model.key){key=model.key;response=null;failure=false;loading=false;animated=false;first.hidden=false;second.hidden=true;dialog.setAttribute('aria-labelledby','resultSummaryTitle');fetchRanking();}paint();},reset(){key='';model=null;response=null;first.hidden=false;second.hidden=true;}};
}
