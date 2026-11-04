(function(){
'use strict';
let currentDialog=null;
const labels={long:'Длинные нарды',short:'Короткие нарды',chess:'Шахматы',pyramid:'Русский бильярд',pool8:'Пул'};
async function openAdminGameStats(request,options={}){
 if(!options.container&&currentDialog?.open){currentDialog.focus();return;}
 const d=document.createElement(options.container?'section':'dialog');if(!options.container)currentDialog=d;d.className='admin-game-stats';d.setAttribute('aria-labelledby','adminGameStatsTitle');
 d.innerHTML='<header><div><small>ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА</small><h2 id="adminGameStatsTitle">Статистика игр</h2></div><button data-close aria-label="Закрыть статистику">×</button></header><p>Завершённые онлайн-партии · Новосибирск, UTC+7. В серии каждая партия считается отдельно.</p><div class="admin-game-stats__controls"><label class="admin-game-stats__period"><span>Период</span><select data-period aria-label="Период статистики игр"><option value="week" selected>Текущая неделя</option><option value="7">7 дней</option><option value="30">30 дней</option><option value="90">90 дней</option><option value="all">Всё время</option><option value="custom">Выбрать даты</option></select></label><label data-date-field hidden>С<input type="date" data-from aria-label="Начало периода"></label><label data-date-field hidden>По<input type="date" data-to aria-label="Конец периода"></label><button type="button" class="admin-game-stats__refresh" data-refresh><span aria-hidden="true">↻</span> Обновить</button></div><p data-progress role="status">Загружаем статистику…</p><div data-total class="admin-game-stats__totals"></div><div class="admin-game-stats__scroll"><table><thead><tr><th>Игра</th><th>Бесплатно</th><th>На фишки</th><th>Всего</th><th>Рейк, фишки</th></tr></thead><tbody></tbody></table></div><p data-notice></p>';
 const welcome = options.showWelcomeStats ? document.createElement('section') : null;
 if (welcome) {
  welcome.className = 'admin-bonuses__activity-totals';
  welcome.innerHTML = '<h3>Бонус новичка · выданные награды</h3><div data-welcome-summary role="status"></div>';
  d.append(welcome);
 }
 if(options.hideRake)d.querySelector('thead th:last-child').remove();
 if(options.hidePeriod){const label=document.createElement('span');label.className='admin-game-stats__period';label.textContent='Текущий месяц · '+new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric',timeZone:'Asia/Novosibirsk'}).format(new Date());d.querySelector('.admin-game-stats__period').replaceWith(label);}
 const localToday=new Date(Date.now()+7*3600000).toISOString().slice(0,10);d.querySelector('[data-from]').value=localToday.slice(0,7)+'-01';d.querySelector('[data-to]').value=localToday;
 const chosenPeriod=()=>options.period||d.querySelector('[data-period]')?.value||'week';
 (options.container||document.body).append(d);let closed=false,loaded=false;const events=new Map();d.querySelector('[data-close]').hidden=!!options.container;d.querySelector('[data-close]').onclick=()=>d.close();d.addEventListener('close',()=>{closed=true;if(currentDialog===d)currentDialog=null;d.remove();},{once:true});if(!options.container)d.showModal();
 const active=()=>!closed&&d.isConnected&&(!options.container||!d.closest('dialog')||d.closest('dialog').open);
 const text=(selector,value)=>d.querySelector(selector).textContent=value;
 function render(){if(!active())return;const period=chosenPeriod(),today=new Date(Date.now()+7*3600000).toISOString().slice(0,10),maximum=period==='custom'?d.querySelector('[data-to]').value:today,minimum=period==='custom'?d.querySelector('[data-from]').value:period==='month'?today.slice(0,7)+'-01':period==='all'?'0000-00-00':new Date(Date.parse(today+'T00:00:00Z')-(period==='week'?(new Date(today+'T00:00:00Z').getUTCDay()+6)%7:Number(period)-1)*86400000).toISOString().slice(0,10),games=new Map();let free=0,paid=0,rake=0;const rakeSeen=new Set();
 for(const r of events.values()){if(r.day<minimum||r.day>maximum)continue;const counts=games.get(r.game)||[0,0,0];counts[r.paid?1:0]++;games.set(r.game,counts);r.paid?paid++:free++;}
 if(!options.hideRake)for(const r of events.values()){if(!r.rakeId||r.rakeDay<minimum||r.rakeDay>maximum||rakeSeen.has(r.rakeId))continue;rakeSeen.add(r.rakeId);rake+=r.rake;const counts=games.get(r.game)||[0,0,0];counts[2]+=r.rake;games.set(r.game,counts);}
 text('[data-total]','Бесплатно: '+free+' · На фишки: '+paid+' · Всего: '+(free+paid)+(options.hideRake?'':' · Рейк: '+rake+' фишек'));const body=d.querySelector('tbody');body.replaceChildren();
 const row=(name,counts,heading=false)=>{const tr=document.createElement('tr');if(heading)tr.className='admin-game-stats__day';for(const value of [name,counts[0],counts[1],counts[0]+counts[1],counts[2]||0].slice(0,options.hideRake?4:5)){const td=document.createElement('td');td.textContent=value;tr.append(td);}body.append(tr);};
 for(const [game,name]of Object.entries(labels))row(name,games.get(game)||[0,0,0]);
 row('Итого',[free,paid,rake],true);
 }
 let loadVersion=0;
 if(d.querySelector('[data-period]'))d.querySelector('[data-period]').onchange=()=>{const custom=chosenPeriod()==='custom';d.querySelectorAll('[data-date-field]').forEach(el=>el.hidden=!custom);if(!custom)load();};
 async function load(){
 if(!active())return;const from=d.querySelector('[data-from]').value,to=d.querySelector('[data-to]').value;if(chosenPeriod()==='custom'&&(!from||!to||from>to)){text('[data-progress]','Укажите даты: начало не позже окончания.');return;}const version=++loadVersion,period=chosenPeriod(),current=()=>active()&&version===loadVersion;d.querySelector('[data-refresh]').disabled=true;events.clear();loaded=false;render();text('[data-progress]','Загружаем выбранный период…');text('[data-notice]','');
 let cursor=null,skipped=0;const visited=new Set();
 if (welcome) {
  const summary = welcome.querySelector('[data-welcome-summary]');
  summary.textContent = 'Загружаем бонусы за выбранный период…';
  request({action:'welcome-bonus-stats',period,...(period==='custom'?{from,to}:{})}).then(data => {
   if (!current()) return;
   if (!data.available) throw Error('Статистика недоступна');
   const {counts} = data;
   const rows = [
    ['За регистрацию', counts.register], ['За вступление в чат', counts.chat],
    ['За подписку на канал', counts.channel], ['За запуск бота', counts.bot],
    ['За привязку Poker21', counts.poker], ['Всего бонусов на крутки', data.spinBonuses],
    ['Начислено на бонусный баланс', Number(data.bonusRubles).toLocaleString('ru-RU') + ' ₽'],
   ];
   const grid = document.createElement('div');
   grid.className = 'admin-bonuses__activity-grid';
   for (const [label,value] of rows) {
    const cell = document.createElement('div');
    const name = document.createElement('span');
    const total = document.createElement('strong');
    name.textContent = label;
    total.textContent = value.toLocaleString('ru-RU');
    cell.append(name,total);
    grid.append(cell);
   }
   summary.replaceChildren(grid);
   if (data.undated) {
    const note = document.createElement('p');
    note.textContent = period === 'all' ? 'Включены начисления без даты.' : 'Начисления без даты доступны в периоде «Всё время».';
    summary.append(note);
   }
  }).catch(() => {
   if (current()) summary.textContent = 'Не удалось загрузить статистику бонусов.';
  });
 }
 try{do{if(!current())return;const page=await request({action:'game-stats',period,...(period==='custom'?{from,to}:{}),...(options.hideRake?{includeRake:false}:{}),...(cursor?{cursor}:{})});if(!current())return;for(const r of page.records||[])if(!events.has(r.id))events.set(r.id,r);skipped+=Number(page.skipped)||0;cursor=page.next;if(cursor&&visited.has(cursor))throw Error('Повтор указателя статистики');if(cursor)visited.add(cursor);text('[data-progress]',(page.preparing?'Индексируем архив · ':'')+'Прочитано партий: '+events.size+' · раздел '+page.source+' из '+page.sources);render();}while(cursor);loaded=true;text('[data-progress]','Статистика загружена');text('[data-notice]',skipped?'Записей без достоверной даты: '+skipped+'. Они не включены в итоги.':options.hideRake?'Отменённые приглашения и незавершённые партии не учитываются.':'Отменённые приглашения и незавершённые партии не учитываются. Рейк — только по сохранившимся подтверждённым выплатам; старые журналы хранятся 30 дней. Число партий и рейк за старые периоды могут иметь разное покрытие.');render();}catch(e){if(current()){text('[data-progress]','Не удалось загрузить статистику полностью: '+e.message);text('[data-notice]','Показанные итоги неполные. Нажмите «Обновить», чтобы повторить загрузку.');}}finally{if(current())d.querySelector('[data-refresh]').disabled=false;}
 }
 d.querySelector('[data-refresh]').onclick=load;
 await load();
}

window.PokerAdminGameStats={open:openAdminGameStats};
})();
