(function(){'use strict';
 var token=location.hash.slice(1),links=[],root=document.getElementById('links'),status=document.getElementById('status');
 var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});},num=function(v){return v==null?'—':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(v);};
 async function request(query){var response=await fetch('./api/tracking-category-access'+(query?'?'+query:''),{headers:{Authorization:'Bearer '+token},cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'}),data=await response.json();if(!response.ok||!data.ok){if(response.status===403){root.innerHTML='';links=[];}throw Error(data.error||'Не удалось загрузить статистику');}return data;}
 var budgetKey = 'poker.link-stats.budget.v1';
 var budgets = Object.create(null);
 var periodSelect = document.getElementById('period');
 var periodStart = null;
 var loadSeq = 0;
 function loadBudgets() {
   budgets = Object.create(null);
   try { Object.assign(budgets, JSON.parse(localStorage.getItem(budgetKey) || '{}')); } catch (_) {}
 }
 function metricCell(label, count, costLabel) {
   var cost = costLabel ? '<small class="metric-cost" data-count="' + esc(count) + '" data-cost-label="' + esc(costLabel) + '"></small>' : '';
   return '<div>' + (label ? '<small>' + esc(label) + '</small>' : '') + '<strong>' + num(count) + '</strong>' + cost + '</div>';
 }
 function budgetRecord(id) {
   var saved = budgets[id];
   return typeof saved === 'number' ? {amount: saved, date: ''} : saved;
 }
 function moscowDate() {
   return new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 10);
 }
 function updateCosts(row) {
   var budget = budgetRecord(row.dataset.linkId)?.amount;
   row.querySelectorAll('[data-cost-label]').forEach(function(cell) {
     var count = Number(cell.dataset.count);
     var cost = budget > 0 && count > 0 ? num(budget / count) + ' ₽' : '—';
     cell.textContent = cell.dataset.costLabel + ': ' + cost;
   });
 }
 root.addEventListener('input', function(event) {
   var input = event.target;
   if (!input.matches('[data-budget], [data-budget-date]')) return;
   var row = input.closest('[data-link-id]');
   var amountInput = row.querySelector('[data-budget]');
   var dateInput = row.querySelector('[data-budget-date]');
   var amount = amountInput.valueAsNumber;
   if (!amountInput.validity.valid || !dateInput.validity.valid) return;
   if (Number.isFinite(amount)) {
     if (!dateInput.value && input === dateInput) return;
     if (!dateInput.value) dateInput.value = moscowDate();
     budgets[row.dataset.linkId] = {amount: amount, date: dateInput.value};
   } else {
     delete budgets[row.dataset.linkId];
     if (input === amountInput) dateInput.value = '';
   }
   try { localStorage.setItem(budgetKey, JSON.stringify(budgets)); } catch (_) {}
   updateCosts(row);
 });
 var metrics = [
   ['Переходы', 'totalClicks', 'Цена перехода'],
   ['Посетители', 'uniqueClicks', 'Цена лида'],
   ['Активные посетители', 'activeVisitors', 'Цена активного посетителя'],
   ['Всего открытий и нажатий', 'actionEvents', 'Цена действия']
 ];
 var matrix = document.getElementById('matrix');

 function budgetInput(link, label, showHint) {
   var budget = budgetRecord(link.id);
   return '<div class="link-budget"><label>' + label +
     '<input data-budget type="number" min="0" step="0.01" inputmode="decimal" aria-label="Бюджет ссылки ' +
     esc(link.label) + ', ₽" value="' + esc(budget?.amount) + '"></label>' +
     '<label>Дата бюджета <input data-budget-date type="date" aria-label="Дата бюджета ссылки ' +
     esc(link.label) + '" value="' + esc(budget?.date) + '"></label>' +
     (showHint ? '<small>Сохраняется в этом браузере</small>' : '') + '</div>';
 }

 function linkDetails(id) {
   var suffix = periodStart ? ' · за всё время' : '';
   return '<details data-summary="' + id + '"><summary>Общая статистика' + suffix + '</summary><div data-body></div></details>' +
     '<details data-players="' + id + '"><summary>По игрокам' + suffix + '</summary><div data-body></div></details>';
 }

 function renderMatrix(rows) {
   return '<div class="link-matrix" tabindex="0" role="region" aria-label="Матрица статистики ссылок">' +
     '<table><thead><tr><th scope="col">Ссылка</th><th scope="col" title="Бюджет сохраняется в этом браузере">Бюджет, ₽</th>' +
     metrics.map(function(metric) { return '<th scope="col">' + metric[0] + '</th>'; }).join('') +
     '</tr></thead><tbody>' + rows.map(function(link) {
       return '<tr data-link-id="' + esc(link.id) + '"><th scope="row">' + esc(link.label) + '</th><td>' +
         budgetInput(link, '', false) + '</td>' + metrics.map(function(metric) {
           return '<td>' + metricCell('', link[metric[1]], metric[2]) + '</td>';
         }).join('') + '</tr>';
     }).join('') + '</tbody></table></div>';
 }

 function render() {
   var sort = document.getElementById('sort').value;
   var rows = links.slice().sort(function(a, b) {
     return sort === 'label' ? a.label.localeCompare(b.label, 'ru') : (b[sort] ?? -1) - (a[sort] ?? -1);
   });
   if (!rows.length) root.innerHTML = '<p>В этой категории пока нет ссылок.</p>';
   else if (matrix.getAttribute('aria-pressed') === 'true') root.innerHTML = renderMatrix(rows);
   else root.innerHTML = rows.map(function(link) {
     var id = esc(link.id);
     return '<article data-link-id="' + id + '"><h2>' + esc(link.label) + '</h2>' +
       budgetInput(link, 'Бюджет ссылки, ₽ ', true) + '<div class="metrics">' +
       metrics.map(function(metric) { return metricCell(metric[0], link[metric[1]], metric[2]); }).join('') +
       '</div>' + linkDetails(id) + '</article>';
   }).join('');
   root.querySelectorAll('[data-link-id]').forEach(updateCosts);
 }
 async function load() {
   var seq = ++loadSeq;
   var refresh = document.getElementById('refresh');
   var period = periodSelect.value;
   status.className = '';
   status.textContent = 'Загружаем…';
   root.innerHTML = '';
   links = [];
   refresh.disabled = true;
   try {
     if (!/^[a-f0-9]{64}$/.test(token)) throw Error('Откройте персональную ссылку, полученную от владельца.');
     var data = await request('period=' + encodeURIComponent(period));
     if (seq !== loadSeq) return;
     document.getElementById('category').textContent = data.category;
     document.getElementById('recipient').textContent = 'Доступ: ' + data.name;
     periodStart = data.periodStart;
     budgetKey = 'poker.link-stats.budget.v1' + (periodStart ? '.' + period + '.' + periodStart : '');
     loadBudgets();
     links = data.links;
     render();
     var incomplete = periodStart && links.some(function(link) {
       return metrics.some(function(metric) { return link[metric[1]] == null; });
     });
     status.textContent = incomplete ? 'Прочерки означают, что сохранённая история не покрывает весь период.' : '';
   } catch (error) {
     if (seq !== loadSeq) return;
     status.textContent = error.message;
     status.className = 'error';
   } finally {
     if (seq === loadSeq) refresh.disabled = false;
   }
 }
 var fields=[['С историей','visitors'],['Новые регистрации','registrations'],['Активные посетители','activeVisitors'],['Всего действий','activityCount'],['Участники розыгрышей','raffleParticipants'],['Участий','raffleCount'],['Крутили','spinners'],['Круток','spinCount'],['Poker21 привязан','poker21Linked'],['Подписаны на бота','botSubscribers'],['В чате игроков','playersChatSubscribers'],['Депозиторов','depositors'],['Пополнений','depositCount'],['Депозиты, ₽','depositAmount']];
 function bool(v){return '<span class="'+(v===true?'yes':v===false?'no':'unknown')+'">'+(v===true?'Да':v===false?'Нет':'—')+'</span>';}
 async function players(details,offset,append){var body=details.querySelector('[data-body]'),button=body.querySelector('button');if(button)button.disabled=true;try{var data=await request('id='+encodeURIComponent(details.dataset.players)+'&view=players&offset='+offset);var rows=data.rows.map(function(r){return '<tr><td>'+esc(r.nick)+'</td>'+[r.visitCount,r.activityCount].map(function(v){return '<td>'+num(v)+'</td>';}).join('')+'<td>'+bool(r.registered)+'</td><td>'+num(r.raffleCount)+'</td><td>'+num(r.spinCount)+'</td><td>'+esc(r.pokerId||'—')+'</td><td>'+num(r.heroLevel)+'</td><td>'+bool(r.bot)+'</td><td>'+bool(r.playersChat)+'</td><td>'+num(r.depositCount)+'</td><td>'+num(r.depositAmount)+'</td></tr>';}).join('');if(!append)body.innerHTML='<div class="players" tabindex="0"><table><thead><tr>'+['Игрок','Переходы','Действия','Регистрация','Розыгрыши','Крутки','Poker21 ID','Уровень','Бот','Чат','Пополнения','Депозиты CRM, ₽'].map(function(t){return '<th>'+t+'</th>';}).join('')+'</tr></thead><tbody></tbody></table></div>';body.querySelector('tbody').insertAdjacentHTML('beforeend',rows);if(button)button.remove();if(data.nextOffset!=null){var more=document.createElement('button');more.textContent='Ещё игроки';more.onclick=function(){players(details,data.nextOffset,true);};body.appendChild(more);}details.dataset.loaded='1';}catch(error){if(!append)body.textContent=error.message;else{button.disabled=false;status.textContent=error.message;}}}
 root.addEventListener('toggle',async function(event){var details=event.target;if(!details.open||details.dataset.loaded||details.dataset.loading)return;details.dataset.loading='1';var body=details.querySelector('[data-body]');body.textContent='Загрузка…';try{if(details.dataset.players){await players(details,0,false);return;}var data=await request('id='+encodeURIComponent(details.dataset.summary)+'&view=summary');body.innerHTML='<div class="summary-grid">'+fields.map(function(pair){return metricCell(pair[0],data.summary[pair[1]],pair[1]==='depositAmount'?'':pair[1]==='registrations'?'Цена регистрации':'Цена за единицу');}).join('')+'</div>';if(data.summary.coverageUnavailable)body.insertAdjacentHTML('afterbegin','<p class="unknown">Полноту старой истории проверить не удалось.</p>');if(data.summary.registrationUnknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Дата регистрации не установлена: '+num(data.summary.registrationUnknown)+'</p>');if(data.summary.coverage?.visitorsWithoutJourney)body.insertAdjacentHTML('afterbegin','<p class="unknown">Без подробной истории: '+num(data.summary.coverage.visitorsWithoutJourney)+' из '+num(data.summary.coverage.trackedVisitors)+' посетителей.</p>');var unknown=(data.summary.botUnknown||0)+(data.summary.playersChatUnknown||0)+(data.summary.depositUnknown||0);if(unknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Часть подписок или депозитов не проверена и не включена в подтверждённые итоги.</p>');updateCosts(details.closest('article'));details.dataset.loaded='1';}catch(error){body.textContent=error.message;}finally{delete details.dataset.loading;}},true);
 matrix.addEventListener('click', function() {
   var enabled = matrix.getAttribute('aria-pressed') !== 'true';
   matrix.setAttribute('aria-pressed', String(enabled));
   if (links.length) render();
 });
 periodSelect.onchange=load;
 document.getElementById('sort').onchange=function(){if(links.length)render();};document.getElementById('refresh').onclick=load;load();
})();
