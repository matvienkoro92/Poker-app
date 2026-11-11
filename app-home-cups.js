(function(){
 'use strict';
 let revision=0,detail;
 const money=n=>Number(n).toLocaleString('ru-RU',{maximumFractionDigits:0})+' ₽';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function show(item){
  if(!detail){detail=document.createElement('dialog');detail.className='home-cup-detail';document.body.append(detail);detail.addEventListener('click',e=>{if(e.target===detail||e.target.closest('[data-cup-close]'))detail.close();});}
  const h=item.history,r=h.results[0];detail.innerHTML='<button data-cup-close aria-label="Закрыть">×</button><img src="'+esc(window.PokerHallTrophies.forItem(item))+'" alt=""><h2>'+esc(h.tournament)+'</h2><p>'+esc(h.date.slice(0,10).split('-').reverse().join('.'))+' · '+r.place+'-е место</p><strong>'+money(r.reward)+'</strong>';detail.showModal();
 }
 async function load(){
  const root=document.getElementById('homeMyCups'),token=++revision;if(!root)return;root.hidden=true;root.replaceChildren();if(detail?.open)detail.close();
  const auth=typeof pokerApiAuthJsonBody==='function'?pokerApiAuthJsonBody({}):{};
  if(!auth.initData&&!auth.pwaSession&&!auth.pwaVkSession)return;
  root.hidden=false;root.innerHTML='<header><strong>Мои кубки</strong></header><p role="status">Загружаем кубки…</p>';
  try{
   const data=await window.pokerSocialRequest('player-hall',{action:'cups'});if(token!==revision)return;
   const items=data.items||[];root.innerHTML='<header><strong>Мои кубки'+(items.length?' <span>'+items.length+'</span>':'')+'</strong>'+(items.length?'<div><button data-cups-step="-1" aria-label="Кубки левее">‹</button><button data-cups-step="1" aria-label="Кубки правее">›</button></div>':'')+'</header>'+(items.length?'<div class="home-my-cups__track" tabindex="0" aria-label="Кубки по убыванию выигрыша">'+items.map((item,i)=>'<button class="home-my-cups__item" data-cup-index="'+i+'" aria-label="'+esc(item.history.tournament+' · '+money(item.history.results[0].reward))+'"><img loading="lazy" src="'+esc(window.PokerHallTrophies.forItem(item))+'" alt=""><span>'+money(item.history.results[0].reward)+'</span></button>').join('')+'</div>':'<p>Выиграйте первый турнир от 100 ₽, чтобы у вас появился кубок</p>');root.hidden=false;
   const track=root.querySelector('.home-my-cups__track');root.onclick=e=>{const cup=e.target.closest('[data-cup-index]'),step=e.target.closest('[data-cups-step]');if(cup)show(items[Number(cup.dataset.cupIndex)]);if(step)track.scrollBy({left:Number(step.dataset.cupsStep)*track.clientWidth*.75,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
  }catch(error){if(token!==revision)return;root.hidden=false;root.innerHTML='<header><strong>Мои кубки</strong></header><p role="status">Не удалось загрузить кубки</p><button class="home-my-cups__retry" type="button">Повторить</button>';root.querySelector('button').onclick=load;console.warn('[home-cups]',error.message);}
 }
 window.addEventListener('poker-auth-changed',load);window.addEventListener('poker-telegram-auth',load);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&document.getElementById('homeMyCups')?.hidden)load();});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
