(function(){
 'use strict';
 const MONTHS=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
 const ART={ring:'./assets/player-hall/honors/ring-v1.webp',belt:'./assets/player-hall/honors/belt-v1.webp'};
 // Personal artwork is used only for the exact winner/month pair it depicts.
 const RINGS={
  '01.2026':['Waaar','01'], '02.2026':['ПокерМанки','02'],
  '03.2026':['Waaar','03'], '04.2026':['FrankL','04'],
  '05.2026':['Em13!!','05'], '06.2026':['Waaar','06'],
  '07.2026':['Waaar','07'], '08.2026':['Waaar','08'],
  '09.2026':['ПокерМанки','09'], '10.2026':['Luck_is_Suck','10']
 };
 function ringArt(w,key){const art=RINGS[key],src=w&&art&&w.nick===art[0]?'./assets/player-hall/honors/personal/ring-2026-'+art[1]+'-v3.webp':ART.ring;return src+'?v=20261111-light-rings-v4';}
 // A previous missing-asset response must not leave the collection permanently broken.
 document.addEventListener('error',function(event){const image=event.target;if(!(image instanceof HTMLImageElement)||!image.closest('.home-honor-rings,.honors-ring-shelf,.honors-personal-ring'))return;if(image.dataset.honorsRetried){image.hidden=true;const note=document.createElement('span');note.className='honors-ring-image-error';note.textContent='Перстень не загрузился';image.after(note);return;}image.dataset.honorsRetried='true';const url=new URL(image.src,location.href);url.searchParams.set('ring_retry',String(Date.now()));image.src=url.href;},true);
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let dialog,data,year,month,tab='journal',request=0,opener;
 const label=k=>MONTHS[Number(k.slice(0,2))-1]+' '+k.slice(3);
 const titles=n=>n+' '+(n%100>=11&&n%100<=14?'званий':n%10===1?'звание':n%10>=2&&n%10<=4?'звания':'званий');
 const own=w=>w.accountId&&w.accountId===data.accountId;
 function shell(body){return '<header class="honors-header"><span>POKER21 <b>КЛУБНЫЙ ЖУРНАЛ</b></span><button type="button" data-honors-close aria-label="Закрыть журнал">×</button></header>'+body;}
 function changeMonth(step){
  const index=data.issues.findIndex(i=>i.month===month),next=data.issues[index+step];if(!next)return;
  month=next.month;year=Number(month.slice(3));render();dialog.querySelector('.honors-reader')?.focus({preventScroll:true});
 }
 const achievementDescriptions={
  'Король турниров':'Больше всего первых мест в турнирах за месяц.',
  'Герой дня':'Больше всего званий «Герой дня» за месяц.',
  'Топ занос':'Самый крупный разовый выигрыш месяца.',
  'Скрудж Макдак':'Самая большая сумма призовых за месяц.',
  'Заносы от 50 до 100к':'Больше всего выигрышей от 50 000 до 99 999 ₽.',
  'Заносы от 100к':'Больше всего выигрышей от 100 000 ₽.',
  'Золотой шар':'Больше всего успешных суперударов в бильярде за месяц.',
  'Король нард':'Первое место в месячном рейтинге нард.'
 };
 function achievementResult(w,title){
  const result=w.achievements?.find(a=>a.title===title);
  if(!result)return '<p>'+esc(achievementDescriptions[title]||'')+'</p>';
  const details=result.details||[];
  return '<p class="honors-achievement-value">'+esc(result.valueText)+'</p>'+(details.length?'<details class="honors-achievement-details"><summary>Какие результаты · '+details.length+'</summary><ul>'+details.map(d=>'<li><strong>'+esc(d.title)+'</strong><span>'+esc([d.meta,d.note].filter(Boolean).join(' · '))+'</span></li>').join('')+'</ul></details>':'');
 }
 function journal(issue){
  const index=data.issues.findIndex(i=>i.month===month);
  return '<article class="honors-reader honors-reader--editorial" tabindex="-1"><div class="honors-reader__navigation"><button type="button" data-honors-step="-1" aria-label="Предыдущий месяц" '+(index<=0?'disabled':'')+'>‹</button><h1 id="clubHonorsTitle" aria-live="polite">'+esc(label(month))+'</h1><button type="button" data-honors-step="1" aria-label="Следующий месяц" '+(index>=data.issues.length-1?'disabled':'')+'>›</button></div>'+(!issue.final?'<p class="honors-reader__pending">Текущий лидер · итоги месяца ещё не подведены</p>':'')+(issue.winners.length>1?'<p class="honors-reader__pending">Совместное первое место</p>':'')+issue.winners.map((w,i)=>{
   return '<section class="honors-player honors-player--editorial"><div class="honors-editorial-cover"><div class="honors-editorial-cover__edition"><span>POKER21 / CLUB JOURNAL</span><span>№ '+month.slice(0,2)+' · '+year+'</span></div><h2 class="honors-editorial-cover__title">ИГРОК<span>МЕСЯЦА</span></h2><div class="honors-hologram" data-honors-hologram="'+i+'"><div class="honors-hologram__beam" aria-hidden="true"></div><span class="honors-hologram__status" role="status">Проявляем персонажа…</span></div><div class="honors-editorial-cover__count"><strong>'+String(w.awards).padStart(2,'0')+'</strong><span>из 8<br>категорий</span></div><div class="honors-editorial-cover__signature"><span>'+ (own(w)?'ВАШ ВЫПУСК':issue.final?'ПОБЕДИТЕЛЬ МЕСЯЦА':'ЛИДЕР МЕСЯЦА')+'</span><h3>'+esc(w.nick)+'</h3></div><span class="honors-editorial-cover__spine" aria-hidden="true">КЛУБНАЯ КОЛЛЕКЦИЯ / '+esc(month)+'</span></div><div class="honors-editorial-story"><div class="honors-editorial-story__heading"><span>ИТОГИ МЕСЯЦА</span><span>'+month.slice(0,2)+' / '+year+'</span></div><div class="honors-month-stats"><div><strong>'+Number(w.prizes).toLocaleString('ru-RU',{maximumFractionDigits:0})+' ₽</strong><span>Призовые</span></div><div><strong>'+w.awards+' <small>/ 8</small></strong><span>Категорий выиграно</span></div></div><h3>Ачивки <span>'+w.awards+'</span></h3><ul class="honors-player__achievements">'+w.categories.map((title,n)=>'<li><span aria-hidden="true">'+String(n+1).padStart(2,'0')+'</span><div><strong>'+esc(title)+'</strong>'+achievementResult(w,title)+'</div></li>').join('')+'</ul><div class="honors-editorial-story__folio"><span>POKER21 · ИСТОРИЯ КЛУБА</span><span>'+month.slice(0,2)+' / '+year+'</span></div></div></section>';
  }).join('')+(!issue.winners.length?'<p class="honors-empty">В этом месяце пока нет результатов.</p>':'')+'</article>';
 }
 async function journalCharacter(w){
  await window.pokerEnsureLazyDomains?.(['profile'],{styles:false,scripts:true});
  if(w.figure&&window.pokerPrepareHallCharacter)return window.pokerPrepareHallCharacter(w.figure);
  if(!w.accountId)throw Error('Персонаж пока не настроен');
  const response=await window.pokerSocialRequest('player-hall',{action:'showcase',targetId:w.accountId});
  const look=response.showcase?.garage?.loadout,G=window.PokerGarage;
  if(!look||!G)throw Error('Персонаж пока не настроен');
  const base=new Image();const ready=new Promise((resolve,reject)=>{base.onload=resolve;base.onerror=reject;});base.src=G.characterBasePath;
  await Promise.all([ready,G.loadWardrobe(look)]);
  if(look.helmet&&look.helmet!=='none'){const helmet=G.loadHelmet(true,look.visor,true,look.helmet);if(!helmet.naturalWidth)await new Promise((resolve,reject)=>{helmet.addEventListener('load',resolve,{once:true});helmet.addEventListener('error',reject,{once:true});});}
  return G.renderCharacter(base,look).toDataURL();
 }
 function hydrateJournal(issue){
  issue.winners.forEach((w,i)=>{const node=dialog.querySelector('[data-honors-hologram="'+i+'"]');if(!node)return;
   journalCharacter(w).then(src=>{if(!node.isConnected)return;const image=new Image();image.className='honors-hologram__character';image.alt='Голограмма персонажа '+w.nick;image.src=src;const scan=document.createElement('span');scan.className='honors-hologram__scan';scan.setAttribute('aria-hidden','true');scan.style.maskImage='url("'+src+'")';scan.style.webkitMaskImage='url("'+src+'")';node.querySelector('[role="status"]')?.remove();node.append(image,scan);}).catch(()=>{if(node.isConnected)node.querySelector('[role="status"]').textContent='Не удалось загрузить персонажа. Попробуйте открыть выпуск ещё раз.';});
  });
 }

 function ringShelf(){
  const entries=data.issues.filter(issue=>issue.final&&issue.month.endsWith('.'+year)).flatMap(issue=>issue.winners.map(w=>({issue,w})));
  if(!entries.length)return '';
  return '<section class="honors-ring-shelf" aria-label="Именные перстни игроков месяца"><header><h2>Именные перстни</h2><span>'+entries.length+' · '+year+'</span></header><div class="honors-ring-shelf__track" tabindex="0" aria-label="Коллекция перстней, прокрутка по горизонтали">'+entries.map(({issue,w})=>'<button type="button" data-honors-ring-month="'+esc(issue.month)+'" aria-label="'+esc(w.nick+' · '+label(issue.month)+' · Открыть награду')+'" aria-pressed="'+(issue.month===month)+'"><img loading="lazy" src="'+esc(ringArt(w,issue.month))+'" alt=""><strong>'+esc(w.nick)+'</strong><small>'+esc(label(issue.month))+'</small></button>').join('')+'</div></section>';
 }
 function ringPrizes(issue){
  const winners=issue.final?issue.winners:[];
  return (winners.length?winners:[null]).map(w=>'<article class="honors-prize honors-prize--ring"><div class="honors-prize__art honors-personal-ring"><img src="'+ringArt(w,month)+'" alt="Перстень игрока месяца'+(w?' · '+esc(w.nick)+' · '+esc(label(month)):'')+'">'+'</div><div><span class="honors-eyebrow">ИМЕННОЙ ПЕРСТЕНЬ</span><h2>'+esc(label(month))+'</h2><b>'+(w?esc(w.nick):'Ещё не вручён')+'</b><p>'+(w?'Награда за звание «Игрок месяца». Право носить перстень сохраняется навсегда.':'Обладатель определится после подведения итогов.')+'</p>'+(w&&own(w)?'<button class="honors-action" data-honors-equip-ring="'+month+'">Надеть перстень</button><p class="honors-equip-status" role="status"></p>':'')+'</div></article>').join('');
 }
 function rewards(issue){const season=data.seasons.find(s=>s.year===year),champions=season?.winners||[];return '<div class="honors-rewards"><h1 id="clubHonorsTitle">Вещи с историей.</h1>'+ringPrizes(issue)+'<article class="honors-prize honors-prize--belt"><div class="honors-prize__art"><img src="'+ART.belt+'" alt="Чемпионский пояс из чёрной кожи с золотыми пластинами"><span class="honors-engraving">'+year+'</span></div><div><span class="honors-eyebrow">'+(season?.final?'ЧЕМПИОН ГОДА':'ГОНКА ЗА ПОЯСОМ')+'</span><h2>Двенадцать месяцев.<br>Один большой сезон.</h2><p>Пояс получает тот, у кого больше званий «Игрок месяца» за календарный год. При равенстве — совместное чемпионство.</p><b>'+champions.map(w=>esc(w.nick)+' · '+titles(w.titles)).join('<br>')+'</b><small>'+ (season?.final?'Итоги года подведены.':'Сейчас показаны лидеры. Пояс будет вручён после подведения итогов всех месяцев года.')+'</small></div></article>'+((issue.final&&issue.winners.some(own))||(season?.final&&champions.some(own))?'<button class="honors-action" data-honors-wardrobe>Открыть персонажа и примерить награду ↗</button>':'')+'<details class="honors-rules"><summary>Как определяются победители</summary><p>Первое место в каждой из восьми категорий даёт одну итоговую награду. При равном числе наград учитываются призовые за месяц; при полном равенстве звание получают оба игрока. В годовом зачёте считаются только завершённые выпуски. Даты — по Москве.</p></details></div>';}
 function render(){if(!dialog.open||!data)return;dialog.dataset.honorsTab=tab;const issue=data.issues.find(i=>i.month===month)||{month,final:false,winners:[]};dialog.innerHTML=shell('<div class="honors-controls"><label class="honors-year">Сезон <select aria-label="Год коллекции">'+data.seasons.map(s=>'<option '+(s.year===year?'selected':'')+'>'+s.year+'</option>').join('')+'</select></label><nav aria-label="Разделы коллекции">'+[['journal','Журнал'],['rewards','Награды']].map(([key,title])=>'<button data-honors-tab="'+key+'" aria-pressed="'+(key===tab)+'">'+title+'</button>').join('')+'</nav></div><div class="honors-months" aria-label="Выпуски журнала">'+MONTHS.map((name,i)=>{const key=String(i+1).padStart(2,'0')+'.'+year,found=data.issues.find(x=>x.month===key);return '<button data-honors-month="'+key+'" '+(!found?'disabled':'')+' aria-pressed="'+(month===key)+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+name.slice(0,3)+'<i>'+(found?.final?'◆':found?'◦':'·')+'</i></button>';}).join('')+'</div><main>'+ringShelf()+(tab==='journal'?journal(issue):rewards(issue))+'</main>'+(tab==='journal'?'':'<footer class="honors-footer">Результаты турниров по '+esc(data.through.split('-').reverse().join('.'))+' · Клубная коллекция</footer>'));
 if(tab==='journal')hydrateJournal(issue);
 }
 async function open(options={}){opener=document.activeElement;if(!dialog){dialog=document.createElement('dialog');dialog.className='club-honors';dialog.setAttribute('aria-label','Клубный журнал и награды');document.body.appendChild(dialog);let swipe;dialog.addEventListener('pointerdown',e=>{swipe=tab==='journal'&&e.target.closest('.honors-reader')&&!e.target.closest('button')?{x:e.clientX,y:e.clientY}:null;});dialog.addEventListener('pointercancel',()=>{swipe=null;});dialog.addEventListener('pointerup',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)changeMonth(dx<0?1:-1);});dialog.addEventListener('keydown',e=>{if(tab!=='journal'||!data||e.target.matches('select,input,textarea'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();changeMonth(e.key==='ArrowLeft'?-1:1);}});dialog.addEventListener('error',e=>{if(e.target.matches?.('.honors-player__avatar img'))e.target.remove();},true);dialog.addEventListener('close',()=>{request++;if(opener?.isConnected)opener.focus();});dialog.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-honors-equip-ring')){b.disabled=true;const status=b.nextElementSibling;status.textContent='Надеваем…';try{await window.pokerSocialRequest('club-honors',{action:'equip-ring',month:b.dataset.honorsEquipRing});status.textContent='Перстень надет и сохранён на персонаже';b.textContent='Надет';}catch(error){status.textContent=error.message;b.disabled=false;}return;}if(b.hasAttribute('data-honors-close'))return dialog.close();if(b.dataset.honorsRingMonth){const offset=dialog.querySelector('.honors-ring-shelf__track')?.scrollLeft||0;month=b.dataset.honorsRingMonth;year=Number(month.slice(3));tab='rewards';render();const track=dialog.querySelector('.honors-ring-shelf__track');if(track)track.scrollLeft=offset;dialog.querySelector('.honors-prize--ring')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}if(b.dataset.honorsStep){changeMonth(Number(b.dataset.honorsStep));return;}if(b.dataset.honorsTab){tab=b.dataset.honorsTab;render();}if(b.dataset.honorsMonth){month=b.dataset.honorsMonth;render();}if(b.hasAttribute('data-honors-retry'))open();if(b.hasAttribute('data-honors-wardrobe')){dialog.close();await window.pokerEnsureLazyDomains?.(['profile']);window.pokerOpenPlayerWardrobe?.('ring');}});dialog.addEventListener('change',e=>{if(e.target.matches('select')){year=Number(e.target.value);const issues=data.issues.filter(i=>i.month.endsWith('.'+year));month=(issues.filter(i=>i.final).at(-1)||issues.at(-1)).month;render();}});}
 const token=++request;dialog.innerHTML=shell('<p class="honors-empty" role="status">Открываем клубный журнал…</p>');if(!dialog.open)dialog.showModal();try{const next=await loadPublic();if(token!==request||!dialog.open)return;if(!next.ok)throw Error(next.error||'Не удалось загрузить журнал');data=next;year=Number(next.current.slice(3));month=(next.issues.filter(i=>i.final&&i.month.endsWith('.'+year)).at(-1)||next.issues.at(-1)).month;if(options.month&&next.issues.some(i=>i.month===options.month)){month=options.month;year=Number(month.slice(3));}if(['journal','rewards'].includes(options.tab))tab=options.tab;render();}catch(e){if(token===request&&dialog.open)dialog.innerHTML=shell('<div class="honors-empty"><p>'+esc(e.message)+'</p><button class="honors-action" data-honors-retry>Попробовать снова</button></div>');}}
 document.addEventListener('click',e=>{const button=e.target.closest('[data-club-honors-open]');if(button){e.preventDefault();open({month:button.dataset.honorsIssue,tab:button.dataset.honorsSection});}});
 let publicData,publicAt=0,publicPending;
 function loadPublic(){if(publicData&&Date.now()-publicAt<60000)return Promise.resolve(publicData);if(publicPending)return publicPending;publicPending=window.pokerSocialRequest('club-honors',{action:'get'}).then(d=>{if(!d.ok)throw Error(d.error);publicData=d;publicAt=Date.now();return d;}).finally(()=>{publicPending=null;});return publicPending;}
 const nickKey=v=>String(typeof window.normalizeWinterNick==='function'?window.normalizeWinterNick(v):v||'').trim().toLowerCase();
 window.pokerHydrateClubHonorsBadges=function(root){
  const slots=[...root.querySelectorAll('[data-club-honors-nick]')];if(!slots.length||typeof window.pokerSocialRequest!=='function')return;
  loadPublic().then(d=>slots.forEach(slot=>{if(!slot.isConnected)return;const nick=nickKey(slot.dataset.clubHonorsNick);if(!nick)return;const matches=w=>nickKey(w.nick)===nick;
   const wins=d.issues.filter(i=>i.final&&i.winners.some(matches)),latest=wins.at(-1),champion=d.seasons.filter(s=>s.final&&s.winners.some(matches)).at(-1),live=d.issues.find(i=>i.month===d.current&&!i.final&&i.winners.some(matches));
   if(!latest&&!champion&&!live){slot.replaceChildren();return;}
   const period=champion?'12.'+champion.year:(latest||live).month;
   const title=champion?'Чемпион '+champion.year:latest?'Игрок месяца'+(wins.length>1?' ×'+wins.length:''):'Текущий лидер';
   const detail=champion?'Пояс чемпиона года':label(period)+(latest&&wins.length>1?' · '+titles(wins.length):'')+(latest?'':' · Итоги впереди');
   const compact=champion?'Пояс · '+champion.year:label(period)+(!latest?' · гонка':'');
   slot.innerHTML='<button type="button" class="home-news-honor'+(!latest&&!champion?' home-news-honor--live':'')+'" data-club-honors-open data-honors-issue="'+esc(period)+'" data-honors-section="'+(champion?'rewards':'journal')+'" aria-label="'+esc(title+' · '+detail+' · Открыть журнал')+'"><img src="'+(champion?ART.belt:ART.ring)+'" alt=""><span><strong>'+esc(title)+'</strong><small> · '+esc(compact)+'</small></span></button>';
  })).catch(()=>{});
 };
 window.pokerHydrateLevelHonors=function(root){
  const slots=[...root.querySelectorAll('[data-level-honors-nick]')];if(!slots.length||typeof window.pokerSocialRequest!=='function')return Promise.resolve();
  return loadPublic().then(d=>slots.forEach(slot=>{
   if(!slot.isConnected)return;
   const id=slot.dataset.levelHonorsId,nick=nickKey(slot.dataset.levelHonorsNick);
   const months=[...new Set(d.issues.filter(i=>i.final&&i.winners.some(w=>id&&w.accountId?w.accountId===id:!!nick&&nickKey(w.nick)===nick)).map(i=>i.month))].sort((a,b)=>Number(a.slice(3))-Number(b.slice(3))||Number(a.slice(0,2))-Number(b.slice(0,2)));
   slot.replaceChildren();slot.hidden=!months.length;if(!months.length)return;
   const heading=document.createElement('strong');heading.textContent='♛ Игрок месяца';slot.append(heading);
   const years=[...new Set(months.map(m=>m.slice(3)))];for(const year of years){const line=document.createElement('span');line.textContent=months.filter(m=>m.endsWith('.'+year)).map(m=>MONTHS[Number(m.slice(0,2))-1]).join(', ')+' · '+year;slot.append(line);}
  })).catch(()=>{});
 };
 window.pokerHydrateHomeHonorRings=function(root){
  const slot=root.querySelector('[data-home-honor-rings]');if(!slot)return Promise.resolve();
  return loadPublic().then(d=>{
   if(!slot.isConnected)return;
   const season=d.current.slice(3),entries=d.issues.filter(i=>i.final&&i.month.endsWith('.'+season)).flatMap(issue=>issue.winners.map(w=>({issue,w})));
   slot.innerHTML=entries.length?'<div class="home-honor-rings__track" tabindex="0" aria-label="Перстни по месяцам, прокрутка по горизонтали">'+entries.map(({issue,w})=>'<button type="button" data-club-honors-open data-honors-section="rewards" data-honors-issue="'+esc(issue.month)+'" aria-label="'+esc(w.nick+' · '+label(issue.month)+' · Открыть перстень')+'"><img src="'+esc(ringArt(w,issue.month))+'" loading="lazy" alt=""><strong>'+esc(w.nick)+'</strong><small>'+esc(MONTHS[Number(issue.month.slice(0,2))-1])+'</small></button>').join('')+'</div>':'<button type="button" data-club-honors-open>Клубный журнал · Награды ↗</button>';
  }).catch(()=>{if(!slot.isConnected)return;slot.innerHTML='<button type="button" data-home-rings-retry>Перстни не загрузились · Повторить</button>';slot.querySelector('button').onclick=()=>window.pokerHydrateHomeHonorRings(root);});
 };
 window.pokerOpenClubHonors=open;
})();
