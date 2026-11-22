(function(){'use strict';
 var token=location.hash.slice(1),links=[],root=document.getElementById('links'),status=document.getElementById('status');
 var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});},num=function(v){return v==null?'—':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(v);};
 async function request(query){var response=await fetch('./api/tracking-category-access'+(query?'?'+query:''),{headers:{Authorization:'Bearer '+token},cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'}),data=await response.json();if(!response.ok||!data.ok){if(response.status===403){root.innerHTML='';links=[];}throw Error(data.error||'Не удалось загрузить статистику');}return data;}
 var budgetKey = 'poker.link-stats.budget.v1';
 var budgets = Object.create(null);
 var ledgerKey = 'poker.link-stats.expenses.v1';
 var ledger = Object.create(null);
 var periodBounds = null;
 try { Object.assign(ledger, JSON.parse(localStorage.getItem(ledgerKey) || '{}')); } catch (_) {}
 var periodSelect = document.getElementById('period');
 var periodForm = document.getElementById('period-form');
 var monthGroup = document.getElementById('period-month');
 var rangeGroup = document.getElementById('period-range');
 var monthInput = document.getElementById('period-month-number');
 var yearInput = document.getElementById('period-year');
 var fromInput = document.getElementById('period-from');
 var toInput = document.getElementById('period-to');
 var appliedPeriod = new URLSearchParams({period:'all'});
 var monthFormat = new Intl.DateTimeFormat('ru-RU',{month:'long',timeZone:'UTC'});
 for (var month = 1; month <= 12; month++) {
   monthInput.add(new Option(monthFormat.format(new Date(Date.UTC(2024,month-1,1))),String(month).padStart(2,'0')));
 }
 var today = moscowDate();
 monthInput.value = today.slice(5,7);
 yearInput.value = today.slice(0,4);
 fromInput.value = today.slice(0,7) + '-01';
 toInput.value = today;
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
 function moscowDate(time = Date.now()) {
   return new Date(time + 3 * 3600000).toISOString().slice(0, 10);
 }
 function shiftDate(date, days) {
   return new Date(Date.parse(date + 'T00:00:00Z') + days * 86400000).toISOString().slice(0,10);
 }
 function expenseEntries(id) {
   return Array.isArray(ledger[id]) ? ledger[id] : [];
 }
 function missingExpensePeriods(bounds, entries) {
   var gaps = [];
   var next = bounds.from;
   entries.forEach(function(entry) {
     if (entry.to < next || entry.from > bounds.to) return;
     if (entry.from > next) gaps.push({from:next, to:shiftDate(entry.from,-1)});
     if (entry.to >= next) next = shiftDate(entry.to,1);
   });
   if (next <= bounds.to) gaps.push({from:next, to:bounds.to});
   return gaps;
 }
 function legacyBudget(id) {
   var saved = budgets[id];
   return typeof saved === 'number' ? saved : saved?.amount;
 }
 function budgetTotal(id) {
   var legacy = legacyBudget(id);
   if (!periodBounds) return legacy;
   var entries = expenseEntries(id).filter(function(entry) {
     return entry.from <= periodBounds.to && entry.to >= periodBounds.from;
   });
   if (!entries.length) return legacy;
   if (entries.some(function(entry) { return entry.from < periodBounds.from || entry.to > periodBounds.to; }) ||
       missingExpensePeriods(periodBounds, entries).length) return null;
   return entries.reduce(function(total, entry) { return total + Math.round(entry.amount * 100); },0) / 100;
 }
 function updateCosts(row) {
   var budget = budgetTotal(row.dataset.linkId);
   row.querySelectorAll('[data-cost-label]').forEach(function(cell) {
     var count = Number(cell.dataset.count);
     var cost = Number.isFinite(budget) && count > 0 ? num(budget / count) + ' ₽' : '—';
     cell.textContent = cell.dataset.costLabel + ': ' + cost;
   });
 }

 var budgetPanel = document.getElementById('budget-panel');
 var budgetToggle = document.getElementById('budget-toggle');
 var budgetForm = document.getElementById('budget-form');
 var budgetLink = document.getElementById('budget-link');
 var budgetMode = document.getElementById('budget-mode');
 var budgetMonth = document.getElementById('budget-month');
 var budgetYear = document.getElementById('budget-year');
 var budgetFrom = document.getElementById('budget-from');
 var budgetTo = document.getElementById('budget-to');
 var budgetAmount = document.getElementById('budget-amount');
 var budgetMessage = document.getElementById('budget-message');
 var budgetGaps = document.getElementById('budget-gaps');
 var budgetRecords = document.getElementById('budget-records');
 budgetMonth.innerHTML = monthInput.innerHTML;
 function monthBounds(month, year) {
   var start = String(year).padStart(4,'0') + '-' + month + '-01';
   return {from:start, to:shiftDate(month === '12'
     ? String(Number(year)+1).padStart(4,'0') + '-01-01'
     : start.slice(0,5) + String(Number(month)+1).padStart(2,'0') + '-01', -1)};
 }
 function formatBudgetDate(value) {
   return value.split('-').reverse().join('.');
 }
 function budgetDates(entry) {
   return formatBudgetDate(entry.from) + ' — ' + formatBudgetDate(entry.to);
 }
 function refreshBudgetPanel() {
   var monthFields = document.getElementById('budget-month-fields');
   var rangeFields = document.getElementById('budget-range-fields');
   monthFields.hidden = monthFields.disabled = budgetMode.value !== 'month';
   rangeFields.hidden = rangeFields.disabled = budgetMode.value !== 'range';
   budgetMessage.textContent = '';
   var entries = expenseEntries(budgetLink.value);
   var bounds = periodBounds;
   if (!bounds && budgetMode.value === 'month' && budgetYear.validity.valid) {
     bounds = monthBounds(budgetMonth.value,budgetYear.valueAsNumber);
   }
   if (!bounds) bounds = monthBounds(today.slice(5,7), today.slice(0,4));
   var gaps = missingExpensePeriods(bounds, entries);
   budgetGaps.innerHTML = gaps.length ? '<h3>Расходы не указаны</h3>' + gaps.map(function(gap,index) {
     return '<button type="button" data-budget-gap="' + index + '">Заполнить ' + budgetDates(gap) + '</button>';
   }).join(' ') : '<p>Расходы указаны на все дни выбранного периода.</p>';
   budgetGaps.onclick = function(event) {
     var button = event.target.closest('[data-budget-gap]');
     if (button) setBudgetRange(gaps[Number(button.dataset.budgetGap)]);
   };
   budgetRecords.innerHTML = entries.length ? '<h3>Сохранённые расходы</h3><ul>' + entries.map(function(entry,index) {
     return '<li><span>' + budgetDates(entry) + ' · ' + num(entry.amount) + ' ₽</span> ' +
       '<button type="button" data-budget-edit="' + index + '">Изменить сумму</button></li>';
   }).join('') + '</ul>' : '';
   budgetRecords.onclick = function(event) {
     var button = event.target.closest('[data-budget-edit]');
     if (button) setBudgetRange(entries[Number(button.dataset.budgetEdit)]);
   };
 }
 function setBudgetRange(entry) {
   budgetMode.value = 'range';
   budgetFrom.value = entry.from;
   budgetTo.value = entry.to;
   budgetAmount.value = entry.amount ?? '';
   refreshBudgetPanel();
   budgetAmount.focus();
 }
 function showBudgetPanel(open) {
   budgetPanel.hidden = !open;
   budgetToggle.setAttribute('aria-expanded', String(open));
   if (!open) return;
   var selected = budgetLink.value;
   budgetLink.replaceChildren(...links.map(function(link) { return new Option(link.label,link.id); }));
   if (links.some(function(link) { return String(link.id) === selected; })) budgetLink.value = selected;
   var bounds = periodBounds || monthBounds(today.slice(5,7), today.slice(0,4));
   var month = monthBounds(bounds.from.slice(5,7), bounds.from.slice(0,4));
   budgetMode.value = bounds.from === month.from && bounds.to === month.to ? 'month' : 'range';
   budgetMonth.value = bounds.from.slice(5,7);
   budgetYear.value = Number(bounds.from.slice(0,4));
   budgetFrom.value = bounds.from;
   budgetTo.value = bounds.to;
   budgetAmount.value = periodBounds ? (legacyBudget(budgetLink.value) ?? '') : '';
   refreshBudgetPanel();
 }
 budgetToggle.onclick = function() { showBudgetPanel(budgetPanel.hidden); };
 budgetLink.onchange = function() { budgetAmount.value = ''; refreshBudgetPanel(); };
 budgetMode.onchange = refreshBudgetPanel;
 budgetMonth.onchange = refreshBudgetPanel;
 budgetYear.onchange = refreshBudgetPanel;
 budgetForm.addEventListener('submit', function(event) {
   event.preventDefault();
   var bounds = budgetMode.value === 'month' ? monthBounds(budgetMonth.value,budgetYear.valueAsNumber) :
     {from:budgetFrom.value,to:budgetTo.value};
   if (bounds.from > bounds.to) {
     budgetMessage.textContent = 'Дата окончания должна быть не раньше начала.';
     return;
   }
   var id = budgetLink.value;
   var entries = expenseEntries(id).filter(function(entry) { return entry.from !== bounds.from || entry.to !== bounds.to; });
   if (entries.some(function(entry) { return entry.from <= bounds.to && entry.to >= bounds.from; })) {
     budgetMessage.textContent = 'Даты пересекаются с сохранённой записью. Выбери незаполненный диапазон или измени сумму существующей записи.';
     return;
   }
   entries.push({...bounds,amount:budgetAmount.valueAsNumber});
   entries.sort(function(a,b) { return a.from.localeCompare(b.from); });
   try { localStorage.setItem(ledgerKey, JSON.stringify({...ledger,[id]:entries})); }
   catch (_) { budgetMessage.textContent = 'Браузер не смог сохранить расходы.'; return; }
   ledger[id] = entries;
   showBudgetPanel(false);
   budgetToggle.focus({preventScroll:true});
   root.querySelectorAll('[data-link-id]').forEach(updateCosts);
 });

 var metrics = [
   ['Переходы', 'totalClicks', 'Цена перехода'],
   ['Посетители', 'uniqueClicks', 'Цена лида'],
   ['Активные посетители', 'activeVisitors', 'Цена активного посетителя'],
   ['Всего открытий и нажатий', 'actionEvents', 'Цена действия']
 ];
 var matrix = document.getElementById('matrix');

 function linkDetails(id) {
   var suffix = periodStart ? ' · за всё время' : '';
   return '<details data-summary="' + id + '"><summary>Общая статистика' + suffix + '</summary><div data-body></div></details>' +
     '<details data-players="' + id + '"><summary>По игрокам' + suffix + '</summary><div data-body></div></details>';
 }

 var fullMatrix = document.getElementById('matrix-full');
 var matrixSummaries = new Map();
 var matrixRenderSeq = 0;

 function renderMatrix(rows) {
   var expanded = fullMatrix.getAttribute('aria-pressed') === 'true';
   var extraFields = expanded ? fields : [];
   var group = expanded ? '<tr class="matrix-groups"><th scope="colgroup" colspan="' + (metrics.length + 1) +
     '">Основные показатели' + (periodStart ? ' · выбранный период' : '') + '</th><th scope="colgroup" colspan="' +
     extraFields.length + '">Общая статистика · за всё время</th></tr>' : '';
   var columns = expanded ? '<colgroup><col class="matrix-link-column"><col span="' + metrics.length +
     '"></colgroup><colgroup span="' + extraFields.length + '"></colgroup>' : '';
   return '<div class="link-matrix" tabindex="0" role="region" aria-label="Матрица статистики ссылок">' +
     '<table>' + columns + '<thead>' + group + '<tr><th scope="col">Ссылка</th>' +
     metrics.concat(extraFields).map(function(metric) { return '<th scope="col">' + metric[0] + '</th>'; }).join('') +
     '</tr></thead><tbody>' + rows.map(function(link) {
       return '<tr data-link-id="' + esc(link.id) + '"><th scope="row">' + esc(link.label) + '</th>' + metrics.map(function(metric) {
         return '<td>' + metricCell('', link[metric[1]], metric[2]) + '</td>';
       }).join('') + extraFields.map(function(field) {
         return '<td data-summary-field="' + field[1] + '">…</td>';
       }).join('') + '</tr>';
     }).join('') + '</tbody></table></div>';
 }

 function fetchMatrixSummary(id) {
   if (matrixSummaries.has(id)) return matrixSummaries.get(id);
   var pending = request('view=summary&id=' + encodeURIComponent(id)).then(function(data) {
     return data.summary;
   }).catch(function(error) {
     if (matrixSummaries.get(id) === pending) matrixSummaries.delete(id);
     throw error;
   });
   matrixSummaries.set(id,pending);
   return pending;
 }

 function loadMatrixSummaries(seq) {
   var rows = Array.from(root.querySelectorAll('.link-matrix tbody tr'));
   var index = 0;
   async function loadRows() {
     while (index < rows.length && seq === matrixRenderSeq) {
       var row = rows[index++];
       try {
         var summary = await fetchMatrixSummary(row.dataset.linkId);
         if (seq !== matrixRenderSeq) return;
         row.querySelectorAll('[data-summary-field]').forEach(function(cell) {
           var key = cell.dataset.summaryField;
           var value = summary[key];
           var unknown = {botSubscribers:'botUnknown',playersChatSubscribers:'playersChatUnknown',depositors:'depositUnknown'}[key];
           if (unknown && summary[unknown]) {
             cell.title = 'Не удалось проверить: ' + num(summary[unknown]);
             if (!value) value = null;
           }
           cell.textContent = num(value);
         });
       } catch (error) {
         if (seq !== matrixRenderSeq) return;
         row.querySelectorAll('[data-summary-field]').forEach(function(cell) {
           cell.textContent = '—';
           cell.title = error.message;
         });
       }
     }
   }
   for (var worker = 0; worker < Math.min(rows.length, 2); worker++) loadRows();
 }

 function render() {
   var seq = ++matrixRenderSeq;
   var matrixEnabled = matrix.getAttribute('aria-pressed') === 'true';
   fullMatrix.hidden = !matrixEnabled;
   fullMatrix.disabled = !links.length;
   var sort = document.getElementById('sort').value;
   var rows = links.slice().sort(function(a, b) {
     return sort === 'label' ? a.label.localeCompare(b.label, 'ru') : (b[sort] ?? -1) - (a[sort] ?? -1);
   });
   if (!rows.length) root.innerHTML = '<p>В этой категории пока нет ссылок.</p>';
   else if (matrixEnabled) {
     root.innerHTML = renderMatrix(rows);
     if (fullMatrix.getAttribute('aria-pressed') === 'true') loadMatrixSummaries(seq);
   }
   else root.innerHTML = rows.map(function(link) {
     var id = esc(link.id);
     return '<article data-link-id="' + id + '"><h2>' + esc(link.label) + '</h2>' +
       '<div class="metrics">' +
       metrics.map(function(metric) { return metricCell(metric[0], link[metric[1]], metric[2]); }).join('') +
       '</div>' + linkDetails(id) + '</article>';
   }).join('');
   root.querySelectorAll('[data-link-id]').forEach(updateCosts);
 }
 async function load() {
   var seq = ++loadSeq;
   matrixRenderSeq++;
   fullMatrix.disabled = true;
   var refresh = document.getElementById('refresh');
   var selection = appliedPeriod;
   var period = selection.get('period');
   status.className = '';
   status.textContent = 'Загружаем…';
   root.innerHTML = '';
   links = [];
   refresh.disabled = true;
   budgetToggle.disabled = true;
   showBudgetPanel(false);
   try {
     if (!/^[a-f0-9]{64}(?:\.[a-f0-9]{64})?$/.test(token)) throw Error('Откройте персональную ссылку, полученную от владельца.');
     var data = await request(selection.toString());
     if (seq !== loadSeq) return;
     document.getElementById('category').textContent = data.category;
     document.getElementById('recipient').textContent = 'Доступ: ' + data.name;
     periodStart = data.periodStart;
     periodBounds = periodStart ? {
       from:moscowDate(Date.parse(periodStart)),
       to:data.periodEnd ? moscowDate(Date.parse(data.periodEnd)-1) : moscowDate()
     } : null;
     var budgetScope = data.periodEnd ? '.fixed.' + periodStart + '.' + data.periodEnd :
       periodStart ? '.' + period + '.' + periodStart : '';
     budgetKey = 'poker.link-stats.budget.v1' + budgetScope;
     loadBudgets();
     links = data.links;
     budgetToggle.disabled = !links.length;
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
 root.addEventListener('toggle',async function(event){var details=event.target;if(!details.open||details.dataset.loaded||details.dataset.loading)return;details.dataset.loading='1';var body=details.querySelector('[data-body]');body.textContent='Загрузка…';try{if(details.dataset.players){await players(details,0,false);return;}var data=await request('id='+encodeURIComponent(details.dataset.summary)+'&view=summary');body.innerHTML='<div class="summary-grid">'+fields.map(function(pair){return metricCell(pair[0],data.summary[pair[1]],periodBounds||pair[1]==='depositAmount'?'':pair[1]==='registrations'?'Цена регистрации':'Цена за единицу');}).join('')+'</div>';if(data.summary.coverageUnavailable)body.insertAdjacentHTML('afterbegin','<p class="unknown">Полноту старой истории проверить не удалось.</p>');if(data.summary.registrationUnknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Дата регистрации не установлена: '+num(data.summary.registrationUnknown)+'</p>');if(data.summary.coverage?.visitorsWithoutJourney)body.insertAdjacentHTML('afterbegin','<p class="unknown">Без подробной истории: '+num(data.summary.coverage.visitorsWithoutJourney)+' из '+num(data.summary.coverage.trackedVisitors)+' посетителей.</p>');var unknown=(data.summary.botUnknown||0)+(data.summary.playersChatUnknown||0)+(data.summary.depositUnknown||0);if(unknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Часть подписок или депозитов не проверена и не включена в подтверждённые итоги.</p>');updateCosts(details.closest('article'));details.dataset.loaded='1';}catch(error){body.textContent=error.message;}finally{delete details.dataset.loading;}},true);
 matrix.addEventListener('click', function() {
   var enabled = matrix.getAttribute('aria-pressed') !== 'true';
   matrix.setAttribute('aria-pressed', String(enabled));
   render();
 });
 fullMatrix.addEventListener('click', function() {
   var expanded = fullMatrix.getAttribute('aria-pressed') !== 'true';
   fullMatrix.setAttribute('aria-pressed',String(expanded));
   render();
 });
 periodSelect.onchange = function() {
   var period = periodSelect.value;
   monthGroup.hidden = monthGroup.disabled = period !== 'month';
   rangeGroup.hidden = rangeGroup.disabled = period !== 'range';
   periodForm.hidden = monthGroup.hidden && rangeGroup.hidden;
   if (!periodForm.hidden) return;
   appliedPeriod = new URLSearchParams({period:period});
   load();
 };
 periodForm.addEventListener('submit', function(event) {
   event.preventDefault();
   var period = periodSelect.value;
   if (period === 'month') {
     appliedPeriod = new URLSearchParams({period:period, month:String(yearInput.valueAsNumber).padStart(4,'0') + '-' + monthInput.value});
   } else if (period === 'range') {
     if (fromInput.value > toInput.value) {
       toInput.setCustomValidity('Дата окончания должна быть не раньше начала.');
       toInput.reportValidity();
       return;
     }
     appliedPeriod = new URLSearchParams({period:period, from:fromInput.value, to:toInput.value});
   } else return;
   load();
 });
 periodForm.addEventListener('input', function() { toInput.setCustomValidity(''); });
 document.getElementById('sort').onchange=function(){if(links.length)render();};document.getElementById('refresh').onclick=function(){matrixSummaries.clear();load();};load();
})();
