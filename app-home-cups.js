(function(){
 'use strict';
 let revision=0,detail,collection;
 const money=n=>Number(n).toLocaleString('ru-RU',{maximumFractionDigits:0})+' ₽';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // Older deployments or cached pages may request a missing thumbnail. Keep
 // the actual trophy visible by retrying its original artwork once.
 document.addEventListener('error',event=>{
  const img=event.target;
  if(img.tagName!=='IMG'||!img.closest('.home-my-cups,.home-cups-all'))return;
  const source=img.getAttribute('src')||'';
  if(/-thumb-v2\.webp(?:\?|$)/.test(source))img.src=source.replace(/-thumb-v2\.webp(?=\?|$)/,'.webp');
 },true);
 function cupThumbnail(item){return (window.PokerHallTrophies.thumbnailForItem||window.PokerHallTrophies.forItem)(item);}
 function cupTitle(item){
  const h=item.history;
  return h.date.slice(0,10)==='2026-06-25'&&window.PokerHallTrophies.family(h.tournament)==='thursday'?'Мистери за 1200р':h.tournament;
 }
 function cupGroups(items){
  const labels={mok:'МОК',addon:'Аддоник',rebuy:'Rebuy',monday:'Турнир Понедельника',tuesday:'Турнир Вторника',wednesday:'Турнир Среды',thursday:'Турнир Четверга',friday:'Турнир Пятницы',saturday:'Турнир Субботы',sunday:'Турнир Воскресенья',month:'Турнир Месяца',boss:'Big Boss',fantastic:'Fantastic Boss',crazy:'Crazy',fivehundred:'Пятихатка',classic:'Классический турнир',freeroll:'Фриролл'};
  const groups=new Map();
  items.forEach((item,index)=>{
   const title=cupTitle(item),family=window.PokerHallTrophies.family(item.history.tournament);
   const name=title==='Мистери за 1200р'?title:labels[family]||title;
   if(!groups.has(name))groups.set(name,[]);
   groups.get(name).push({item,index});
  });
  return [...groups].sort((a,b)=>a[0].localeCompare(b[0],'ru'));
 }
 function showAll(items){
  if(!collection){
   collection=document.createElement('dialog');collection.className='home-cups-all';collection.setAttribute('aria-label','Все мои кубки');document.body.append(collection);
   collection.addEventListener('click',e=>{if(e.target===collection||e.target.closest('[data-cups-close]'))collection.close();});
  }
  collection.innerHTML='<header><div><h2>Все мои кубки</h2><p>'+items.length+' · По турнирам</p></div><button type="button" data-cups-close aria-label="Закрыть">×</button></header><div class="home-cups-all__groups">'+cupGroups(items).map(([name,entries])=>'<section><h3>'+esc(name)+' <span>'+entries.length+'</span></h3><div class="home-cups-all__grid">'+entries.map(({item,index})=>'<button type="button" data-all-cup="'+index+'" aria-label="'+esc(cupTitle(item)+' · '+item.history.date.slice(0,10)+' · '+money(item.history.results[0].reward))+'"><img loading="lazy" src="'+esc(cupThumbnail(item))+'" alt=""><strong>'+money(item.history.results[0].reward)+'</strong><small>'+esc(item.history.date.slice(0,10).split('-').reverse().join('.'))+'</small></button>').join('')+'</div></section>').join('')+'</div>';
  collection.onclick=e=>{const button=e.target.closest('[data-all-cup]');if(button)show(items[Number(button.dataset.allCup)]);};
  if(!collection.open)collection.showModal();
 }
 function show(item){
  if(!detail){detail=document.createElement('dialog');detail.className='home-cup-detail';document.body.append(detail);detail.addEventListener('click',e=>{if(e.target===detail||e.target.closest('[data-cup-close]'))detail.close();});}
  const h=item.history,r=h.results[0];
  const title=cupTitle(item);
  detail.innerHTML='<button data-cup-close aria-label="Закрыть">×</button><img src="'+esc(window.PokerHallTrophies.forItem(item))+'" alt=""><h2>'+esc(title)+'</h2><p>'+esc(h.date.slice(0,10).split('-').reverse().join('.'))+' · '+r.place+'-е место</p><strong>'+money(r.reward)+'</strong>'+(window.PokerHallTrophies.family(h.tournament)==='boss'?'<p class="home-cup-detail__terms">Вход 5 000 ₽ · Нокаут</p>':window.PokerHallTrophies.family(h.tournament)==='month'?'<p class="home-cup-detail__terms">Вход 3 000 ₽</p>':'');detail.showModal();
 }
 // Reuse trophy artwork and collection dialogs in a player's prize statistics.
 window.pokerMountTournamentCups=function(details,rows){
  if(!details||!window.PokerHallTrophies)return;
  const items=(rows||[]).filter(r=>Number(r.place)===1&&Number(r.reward)>0).map(r=>{
   const date=String(r.date||''),parts=date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
   return {kind:'cups',history:{date:parts?parts[3]+'-'+parts[2]+'-'+parts[1]:date,tournament:r.tournamentLabel||r.tournament||'Турнир',results:[{place:1,reward:Number(r.reward)}]}};
  }).sort((a,b)=>b.history.results[0].reward-a.history.results[0].reward||b.history.date.localeCompare(a.history.date));
  if(!items.length)return;
  const root=document.createElement('section');root.className='home-my-cups prize-cups';root.setAttribute('aria-label','Кубки игрока');
  root.innerHTML='<header><strong>Кубки <span>'+items.length+'</span></strong><div><button type="button" class="home-my-cups__all" data-cups-all>ВСЕ</button><button type="button" data-cups-step="-1" aria-label="Кубки левее">‹</button><button type="button" data-cups-step="1" aria-label="Кубки правее">›</button></div></header><div class="home-my-cups__track" tabindex="0" aria-label="Кубки по убыванию выигрыша">'+items.map((item,i)=>'<button type="button" class="home-my-cups__item" data-cup-index="'+i+'" aria-label="'+esc(cupTitle(item)+' · '+money(item.history.results[0].reward))+'"><img loading="'+(i<6?'eager':'lazy')+'" fetchpriority="'+(i<6?'high':'low')+'" decoding="async" width="144" height="180" src="'+esc(cupThumbnail(item))+'" alt=""><span>'+money(item.history.results[0].reward)+'</span></button>').join('')+'</div>';
  root.onclick=e=>{const all=e.target.closest('[data-cups-all]'),cup=e.target.closest('[data-cup-index]'),step=e.target.closest('[data-cups-step]');if(!all&&!cup&&!step)return;e.preventDefault();e.stopPropagation();if(all)showAll(items);if(cup)show(items[Number(cup.dataset.cupIndex)]);if(step)root.querySelector('.home-my-cups__track').scrollBy({left:Number(step.dataset.cupsStep)*root.clientWidth*.75,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
  details.querySelector('.prize-cups')?.remove();details.prepend(root);
 };
 // A cold connection can fail while the app is starting. Retry this read only;
 // auth changes invalidate the old attempt before it can render another account.
 async function readCups(token){
  for(let attempt=0;attempt<3;attempt++){
   if(token!==revision)return null;
   try{return await window.pokerSocialRequest('player-hall',{action:'cups'});}
   catch(error){
    if(token!==revision)return null;
    if(attempt===2)throw error;
    await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));
   }
  }
 }
 async function load(){
  const root=document.getElementById('homeMyCups'),token=++revision;if(!root)return;root.hidden=true;root.replaceChildren();if(detail?.open)detail.close();if(collection?.open)collection.close();
  const auth=typeof pokerApiAuthJsonBody==='function'?pokerApiAuthJsonBody({}):{};
  if(!auth.initData&&!auth.pwaSession&&!auth.pwaVkSession)return;
  root.hidden=false;root.innerHTML='<header><strong>Мои кубки</strong></header><p role="status">Загружаем кубки…</p>';
  try{
   const data=await readCups(token);if(token!==revision)return;
   const items=data.items||[];root.innerHTML='<header><strong>Мои кубки'+(items.length?' <span>'+items.length+'</span>':'')+'</strong>'+(items.length?'<div><button type="button" class="home-my-cups__all" data-cups-all>ВСЕ</button><button data-cups-step="-1" aria-label="Кубки левее">‹</button><button data-cups-step="1" aria-label="Кубки правее">›</button></div>':'')+'</header>'+(items.length?'<div class="home-my-cups__track" tabindex="0" aria-label="Кубки по убыванию выигрыша">'+items.map((item,i)=>'<button class="home-my-cups__item" data-cup-index="'+i+'" aria-label="'+esc(item.history.tournament+' · '+money(item.history.results[0].reward))+'"><img loading="'+(i<6?'eager':'lazy')+'" fetchpriority="'+(i<6?'high':'low')+'" decoding="async" width="144" height="180" src="'+esc(cupThumbnail(item))+'" alt=""><span>'+money(item.history.results[0].reward)+'</span></button>').join('')+'</div>':'<p>Выиграйте первый турнир от 100 ₽, чтобы у вас появился кубок</p>');root.hidden=false;
   const track=root.querySelector('.home-my-cups__track');root.onclick=e=>{if(e.target.closest('[data-cups-all]')){showAll(items);return;}const cup=e.target.closest('[data-cup-index]'),step=e.target.closest('[data-cups-step]');if(cup)show(items[Number(cup.dataset.cupIndex)]);if(step)track.scrollBy({left:Number(step.dataset.cupsStep)*track.clientWidth*.75,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
  }catch(error){if(token!==revision)return;root.hidden=false;root.innerHTML='<header><strong>Мои кубки</strong></header><p role="status">Не удалось загрузить кубки</p><button class="home-my-cups__retry" type="button">Повторить</button>';root.querySelector('button').onclick=load;console.warn('[home-cups]',error.message);}
 }
 window.addEventListener('online',()=>{if(document.getElementById('homeMyCups')?.querySelector('.home-my-cups__retry'))load();});
 window.addEventListener('poker-auth-changed',load);window.addEventListener('poker-telegram-auth',load);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&document.getElementById('homeMyCups')?.hidden)load();});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
