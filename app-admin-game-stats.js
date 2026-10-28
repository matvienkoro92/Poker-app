(function(){
'use strict';
let currentDialog=null;
const labels={long:'Длинные нарды',short:'Короткие нарды',chess:'Шахматы',pyramid:'Русский бильярд',pool8:'Пул'};
async function openAdminGameStats(request,options={}){
 if(!options.container&&currentDialog?.open){currentDialog.focus();return;}
 const d=document.createElement(options.container?'section':'dialog');if(!options.container)currentDialog=d;d.className='admin-game-stats';d.setAttribute('aria-labelledby','adminGameStatsTitle');
 d.innerHTML='<header><div><small>ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА</small><h2 id="adminGameStatsTitle">Статистика игр</h2></div><button data-close aria-label="Закрыть статистику">×</button></header><p>Завершённые онлайн-партии · Новосибирск, UTC+7. В серии каждая партия считается отдельно.</p><label>Период <select data-period><option value="7" selected>7 дней</option><option value="30">30 дней</option><option value="90">90 дней</option><option value="all">Всё время</option></select></label><button type="button" data-refresh>Обновить</button><p data-progress role="status">Загружаем статистику…</p><div data-total class="admin-game-stats__totals"></div><div class="admin-game-stats__scroll"><table><thead><tr><th>Дата / игра</th><th>Бесплатно</th><th>На фишки</th><th>Всего</th><th>Рейк, фишки</th></tr></thead><tbody></tbody></table></div><p data-notice></p>';
 (options.container||document.body).append(d);let closed=false,loaded=false;const events=new Map();d.querySelector('[data-close]').hidden=!!options.container;d.querySelector('[data-close]').onclick=()=>d.close();d.addEventListener('close',()=>{closed=true;if(currentDialog===d)currentDialog=null;d.remove();},{once:true});if(!options.container)d.showModal();
 const active=()=>!closed&&d.isConnected&&(!options.container||!d.closest('dialog')||d.closest('dialog').open);
 const text=(selector,value)=>d.querySelector(selector).textContent=value;
 function render(){if(!active())return;const period=d.querySelector('[data-period]').value,today=new Date(Date.now()+7*3600000).toISOString().slice(0,10),minimum=period==='all'?'0000-00-00':new Date(Date.parse(today+'T00:00:00Z')-(Number(period)-1)*86400000).toISOString().slice(0,10),days=new Map();let free=0,paid=0,rake=0;const rakeSeen=new Set();
 for(const r of events.values()){if(r.day<minimum||r.day>today)continue;if(!days.has(r.day))days.set(r.day,new Map());const games=days.get(r.day),counts=games.get(r.game)||[0,0,0];counts[r.paid?1:0]++;games.set(r.game,counts);r.paid?paid++:free++;}
 for(const r of events.values()){if(!r.rakeId||r.rakeDay<minimum||r.rakeDay>today||rakeSeen.has(r.rakeId))continue;rakeSeen.add(r.rakeId);rake+=r.rake;if(!days.has(r.rakeDay))days.set(r.rakeDay,new Map());const games=days.get(r.rakeDay),counts=games.get(r.game)||[0,0,0];counts[2]+=r.rake;games.set(r.game,counts);}
 text('[data-total]','Бесплатно: '+free+' · На фишки: '+paid+' · Всего: '+(free+paid)+' · Рейк: '+rake+' фишек');const body=d.querySelector('tbody');body.replaceChildren();
 const row=(name,counts,heading=false)=>{const tr=document.createElement('tr');if(heading)tr.className='admin-game-stats__day';for(const value of [name,counts[0],counts[1],counts[0]+counts[1],counts[2]||0]){const td=document.createElement('td');td.textContent=value;tr.append(td);}body.append(tr);};
 for(const day of [...days.keys()].sort().reverse()){const games=days.get(day),sum=[0,0,0];for(const counts of games.values()){sum[0]+=counts[0];sum[1]+=counts[1];sum[2]+=counts[2]||0;}row(day.split('-').reverse().join('.'),sum,true);for(const [game,name]of Object.entries(labels))row(name,games.get(game)||[0,0]);}
 if(!days.size)row(loaded?'За этот период партий нет':'Собираем данные…',[0,0]);
 }
 d.querySelector('[data-period]').onchange=render;
 let loading=false;
 async function load(){
 if(loading||!active())return;loading=true;d.querySelector('[data-refresh]').disabled=true;events.clear();loaded=false;
 let cursor=null,skipped=0;const visited=new Set();
 try{do{if(!active())return;const page=await request({action:'game-stats',...(cursor?{cursor}:{})});if(!active())return;for(const r of page.records||[])if(!events.has(r.id))events.set(r.id,r);skipped+=Number(page.skipped)||0;cursor=page.next;if(cursor&&visited.has(cursor))throw Error('Повтор указателя статистики');if(cursor)visited.add(cursor);text('[data-progress]','Прочитано партий: '+events.size+' · раздел '+page.source+' из '+page.sources);render();}while(cursor);loaded=true;text('[data-progress]','Статистика загружена');text('[data-notice]',skipped?'Записей без достоверной даты: '+skipped+'. Они не включены в итоги.':'Отменённые приглашения и незавершённые партии не учитываются. Рейк — только по сохранившимся подтверждённым выплатам; старые журналы хранятся 30 дней. Число партий и рейк за старые периоды могут иметь разное покрытие.');render();}catch(e){if(active()){text('[data-progress]','Не удалось загрузить статистику полностью: '+e.message);text('[data-notice]','Показанные итоги неполные. Нажмите «Обновить», чтобы повторить загрузку.');}}finally{loading=false;if(active())d.querySelector('[data-refresh]').disabled=false;}
 }
 d.querySelector('[data-refresh]').onclick=load;
 await load();
}

window.PokerAdminGameStats={open:openAdminGameStats};
})();
