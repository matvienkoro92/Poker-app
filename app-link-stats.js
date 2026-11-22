(function(){'use strict';
 var token=location.hash.slice(1),links=[],root=document.getElementById('links'),status=document.getElementById('status');
 var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});},num=function(v){return v==null?'—':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(v);};
 async function request(query, signal){var response=await fetch('./api/tracking-category-access'+(query?'?'+query:''),{headers:{Authorization:'Bearer '+token},cache:'no-store',signal:signal,credentials:'omit',referrerPolicy:'no-referrer'}),data=await response.json();if(!response.ok||!data.ok){if(response.status===403){root.innerHTML='';links=[];}throw Object.assign(Error(data.error||'Не удалось загрузить статистику'),{status:response.status});}return data;}
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
 var periodParams = new URLSearchParams(location.search);
 var urlPeriod = periodParams.get('period');
 var autoBudgetPeriod = !periodParams.has('period');
 var appliedPeriod = new URLSearchParams({period:'all'});
 if (['today','7','30'].includes(urlPeriod)) appliedPeriod.set('period',urlPeriod);
 if (urlPeriod === 'month' && /^\d{4}-(0[1-9]|1[0-2])$/.test(periodParams.get('month') || '')) {
   appliedPeriod = new URLSearchParams({period:'month',month:periodParams.get('month')});
 }
 if (urlPeriod === 'range' && ['from','to'].every(function(key) {
   return /^\d{4}-\d{2}-\d{2}$/.test(periodParams.get(key) || '');
 })) {
   appliedPeriod = new URLSearchParams({period:'range',from:periodParams.get('from'),to:periodParams.get('to')});
 }
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
   var entries = expenseEntries(id);
   if (periodBounds) {
     entries = entries.filter(function(entry) {
       return entry.from <= periodBounds.to && entry.to >= periodBounds.from;
     });
   }
   if (!entries.length) return legacyBudget(id);
   if (periodBounds && (entries.some(function(entry) {
     return entry.from < periodBounds.from || entry.to > periodBounds.to;
   }) || missingExpensePeriods(periodBounds, entries).length)) return null;
   return entries.reduce(function(total, entry) { return total + Math.round(entry.amount * 100); },0) / 100;
 }
 function updateCosts(row) {
   var budget = budgetTotal(row.dataset.linkId);
   var budgetAmountLabel = row.querySelector('[data-budget-amount-label]');
   if (budgetAmountLabel) {
     budgetAmountLabel.hidden = !Number.isFinite(budget);
     budgetAmountLabel.textContent = budgetAmountLabel.hidden ? '' : 'Бюджет: ' + num(budget) + ' ₽';
   }
   row.querySelectorAll('[data-cost-label]').forEach(function(cell) {
     var count = Number(cell.dataset.count);
     var cost = Number.isFinite(budget) && count > 0 ? num(budget / count) + ' ₽' : '—';
     cell.textContent = cell.dataset.costLabel + ': ' + cost;
     cell.title = !Number.isFinite(budget) ? 'Укажи расходы за период статистики' :
       count <= 0 ? 'За период нет подтверждённого значения для расчёта' : '';
   });
 }

 function updateSubgroupTotal(section) {
   var total = section.querySelector('.matrix-subgroup-total');
   if (!total) return;
   var rows = Array.from(section.querySelectorAll('tr[data-link-id]:not([hidden])'));
   var amounts = rows.map(function(row) { return budgetTotal(row.dataset.linkId); });
   var budget = amounts.every(Number.isFinite) ? amounts.reduce(function(sum, amount) { return sum + amount; },0) : null;
   Array.from(total.cells).slice(1).forEach(function(cell, index) {
     var counts = rows.map(function(row) {
       var source = row.cells[index+1];
       return source.querySelector('[data-count]')?.dataset.count ?? source.dataset.value;
     });
     var sum = counts.length && counts.every(function(value) { return value !== '' && value != null && Number.isFinite(Number(value)); })
       ? counts.reduce(function(value, count) { return value + Number(count); },0) : null;
     cell.querySelector('strong').textContent = num(sum);
     cell.title = sum == null ? 'По части строк нет данных' : '';
     var cost = cell.querySelector('.metric-cost');
     if (cost) {
       cost.textContent = metrics[index][2] + ': ' + (sum > 0 && budget != null ? num(budget / sum) + ' ₽' : '—');
       cost.title = budget == null ? 'Нужны расходы по всем видимым ссылкам за выбранный период' : '';
     }
   });
 }
 function updateSubgroupTotals() {
   root.querySelectorAll('.link-matrix tbody').forEach(updateSubgroupTotal);
 }

 var budgetPanel = document.getElementById('budget-panel');
 var budgetToggle = document.getElementById('budget-toggle');
 var budgetForm = document.getElementById('budget-form');
 var budgetLink = document.getElementById('budget-link');
 var budgetSingleLink = document.getElementById('budget-single-link');
 var budgetSplit = document.getElementById('budget-split');
 var budgetSplitLinks = document.getElementById('budget-split-links');

 function syncBudgetSplit() {
   budgetSingleLink.hidden = budgetLink.disabled = budgetSplit.checked;
   budgetSplitLinks.hidden = budgetSplitLinks.disabled = !budgetSplit.checked;
   budgetGaps.hidden = budgetSplit.checked;
 }

 var budgetFrom = document.getElementById('budget-from');
 var budgetTo = document.getElementById('budget-to');
 var budgetAmount = document.getElementById('budget-amount');
 var budgetMessage = document.getElementById('budget-message');
 var budgetGaps = document.getElementById('budget-gaps');
 var budgetRecords = document.getElementById('budget-records');
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
   budgetMessage.textContent = '';
   var entries = expenseEntries(budgetLink.value);
   var datesValid = budgetFrom.value && budgetTo.value && budgetFrom.value <= budgetTo.value;
   var bounds = periodBounds || (datesValid ? {from:budgetFrom.value,to:budgetTo.value} :
     monthBounds(today.slice(5,7), today.slice(0,4)));
   var gaps = missingExpensePeriods(bounds, entries);
   budgetGaps.innerHTML = gaps.length ? '<h3>Расходы не указаны</h3>' + gaps.map(function(gap,index) {
     return '<button type="button" data-budget-gap="' + index + '">Заполнить ' + budgetDates(gap) + '</button>';
   }).join(' ') : '<p>Расходы указаны на все дни выбранного периода.</p>';
   budgetGaps.onclick = function(event) {
     var button = event.target.closest('[data-budget-gap]');
     if (button) setBudgetRange(gaps[Number(button.dataset.budgetGap)]);
   };
   var groups = links.filter(function(link) { return expenseEntries(link.id).length; });
   budgetRecords.innerHTML = groups.length ? '<h3>Сохранённые расходы</h3><ul>' + groups.map(function(link) {
     return expenseEntries(link.id).map(function(entry,index) {
       return '<li data-budget-record-link="' + esc(link.id) + '"><strong>' + esc(link.label) +
         '</strong><span>' + budgetDates(entry) + ' · ' + num(entry.amount) + ' ₽</span>' +
         '<button type="button" data-budget-edit="' + index + '">Изменить сумму</button></li>';
     }).join('');
   }).join('') + '</ul>' : '';
   budgetRecords.onclick = function(event) {
     var button = event.target.closest('[data-budget-edit]');
     if (!button || budgetToggle.disabled) return;
     var id = button.closest('[data-budget-record-link]').dataset.budgetRecordLink;
     budgetLink.value = id;
     budgetSplit.checked = false;
     syncBudgetSplit();
     setBudgetRange(expenseEntries(id)[Number(button.dataset.budgetEdit)]);
   };
 }
 function setBudgetRange(entry) {
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
   budgetSplitLinks.innerHTML = '<legend>Выбери ссылки</legend>' + links.map(function(link) {
     return '<label><input type="checkbox" name="split-link" value="' + esc(link.id) + '">' + esc(link.label) + '</label>';
   }).join('');
   budgetSplit.checked = false;
   syncBudgetSplit();
   var bounds = periodBounds || monthBounds(today.slice(5,7), today.slice(0,4));
   budgetFrom.value = bounds.from;
   budgetTo.value = bounds.to;
   budgetAmount.value = periodBounds ? (legacyBudget(budgetLink.value) ?? '') : '';
   refreshBudgetPanel();
 }
 budgetToggle.onclick = function() { showBudgetPanel(budgetPanel.hidden); };
 budgetLink.onchange = function() { budgetAmount.value = ''; refreshBudgetPanel(); };
 budgetSplit.onchange = function() {
   if (budgetSplit.checked && !budgetSplitLinks.querySelector(':checked')) {
     Array.from(budgetSplitLinks.querySelectorAll('input')).forEach(function(input) {
       input.checked = input.value === budgetLink.value;
     });
   }
   syncBudgetSplit();
   refreshBudgetPanel();
 };
 budgetFrom.onchange = refreshBudgetPanel;
 budgetTo.onchange = refreshBudgetPanel;
 budgetForm.addEventListener('submit', function(event) {
   event.preventDefault();
   var bounds = {from:budgetFrom.value,to:budgetTo.value};
   if (bounds.from > bounds.to) {
     budgetMessage.textContent = 'Дата окончания должна быть не раньше начала.';
     return;
   }
   var ids = budgetSplit.checked ? new FormData(budgetForm).getAll('split-link') : [budgetLink.value];
   if (budgetSplit.checked && ids.length < 2) {
     budgetMessage.textContent = 'Для разделения выбери хотя бы две ссылки.';
     return;
   }
   var cents = Math.round(budgetAmount.valueAsNumber * 100);
   if (!Number.isSafeInteger(cents)) {
     budgetMessage.textContent = 'Укажи корректную сумму.';
     return;
   }
   var share = Math.floor(cents / ids.length);
   var remainder = cents % ids.length;
   var updated = {...ledger};
   for (var index = 0; index < ids.length; index++) {
     var id = ids[index];
     var entries = expenseEntries(id).filter(function(entry) { return entry.from !== bounds.from || entry.to !== bounds.to; });
     if (entries.some(function(entry) { return entry.from <= bounds.to && entry.to >= bounds.from; })) {
       var label = links.find(function(link) { return String(link.id) === id; })?.label;
       budgetMessage.textContent = 'Даты пересекаются с сохранённой записью для «' + label +
         '». Выбери незаполненный диапазон или измени сумму существующей записи.';
       return;
     }
     entries.push({...bounds,amount:(share + (index < remainder ? 1 : 0)) / 100});
     entries.sort(function(a,b) { return a.from.localeCompare(b.from); });
     updated[id] = entries;
   }
   try { localStorage.setItem(ledgerKey, JSON.stringify(updated)); }
   catch (_) { budgetMessage.textContent = 'Браузер не смог сохранить расходы.'; return; }
   ledger = Object.assign(Object.create(null),updated);
   refreshBudgetPanel();
   var savedMessage = 'Сохранено: ' + num(cents / 100) + ' ₽ за ' + budgetDates(bounds) +
     (budgetSplit.checked ? ' · ссылки: ' + ids.length : '') + '.';
   budgetMessage.textContent = savedMessage;
   if (!periodBounds || bounds.from < periodBounds.from || bounds.to > periodBounds.to) {
     showBudgetStatistics(bounds,savedMessage);
   } else {
     root.querySelectorAll('[data-link-id]').forEach(updateCosts);
     updateSubgroupTotals();
   }
 });

 function showBudgetStatistics(bounds, message = '') {
   periodSelect.value = 'range';
   fromInput.value = bounds.from;
   toInput.value = bounds.to;
   syncPeriodForm();
   appliedPeriod = new URLSearchParams({period:'range',from:bounds.from,to:bounds.to});
   load({keepBudget:!budgetPanel.hidden,budgetMessage:message});
 }

 var metrics = [
   ['Переходы', 'totalClicks', 'Цена перехода'],
   ['Посетители', 'uniqueClicks', 'Цена лида'],
   ['Активные посетители', 'activeVisitors', 'Цена активного посетителя'],
   ['Всего открытий и нажатий', 'actionEvents', 'Цена действия']
 ];

 function linkDetails(id) {
   var note = periodStart ? '<small>Детализация за всё время</small>' : '';
   return note + '<div class="link-detail-options">' +
     '<details data-summary="' + id + '"><summary>Общая статистика</summary><div data-body></div></details>' +
     '<details data-players="' + id + '"><summary>По игрокам</summary><div data-body></div></details></div>';
 }

 var hiddenLinksKey = 'poker.link-stats.hidden-links.v1';
 var hiddenIds = new Set();
 try {
   var storedIds = JSON.parse(localStorage.getItem(hiddenLinksKey) || '[]');
   if (Array.isArray(storedIds)) hiddenIds = new Set(storedIds);
 } catch (_) {}
 var hiddenToggle = document.getElementById('hidden-links');
 var hiddenPanel = document.getElementById('hidden-links-panel');

 function saveHiddenLinks() {
   try { localStorage.setItem(hiddenLinksKey, JSON.stringify(Array.from(hiddenIds))); } catch (_) {}
 }

 function renderHiddenLinks() {
   var hidden = links.filter(function(link) { return hiddenIds.has(String(link.id)); });
   hiddenToggle.hidden = !hidden.length;
   hiddenToggle.textContent = 'Скрытые (' + hidden.length + ')';
   if (!hidden.length) hiddenPanel.hidden = true;
   hiddenToggle.setAttribute('aria-expanded', String(!hiddenPanel.hidden));
   hiddenPanel.innerHTML = hidden.map(function(link) {
     return '<div><span>' + esc(link.label) + '</span><button type="button" data-restore-link="' +
       esc(link.id) + '" aria-label="Показать: ' + esc(link.label) + '">Показать</button></div>';
   }).join('');
 }

 hiddenToggle.onclick = function() {
   hiddenPanel.hidden = !hiddenPanel.hidden;
   renderHiddenLinks();
 };
 hiddenPanel.onclick = function(event) {
   var button = event.target.closest('[data-restore-link]');
   if (!button) return;
   var id = button.dataset.restoreLink;
   hiddenIds.delete(id);
   saveHiddenLinks();
   render();
   if (hiddenPanel.hidden) {
     Array.from(root.querySelectorAll('tr[data-link-id]')).find(function(row) {
       return row.dataset.linkId === id;
     })?.querySelector('[data-link-details]').focus({preventScroll:true});
   } else hiddenPanel.querySelector('button')?.focus({preventScroll:true});
 };

 var subgroupsKey = 'poker.link-stats.subgroups.v1';
 var subgroups = Object.create(null);
 try { Object.assign(subgroups, JSON.parse(localStorage.getItem(subgroupsKey) || '{}')); } catch (_) {}
 var subgroupsToggle = document.getElementById('subgroups-toggle');
 var subgroupsPanel = document.getElementById('subgroups-panel');
 var subgroupsForm = document.getElementById('subgroups-form');
 var subgroupSelect = document.getElementById('subgroup-select');
 var subgroupNew = document.getElementById('subgroup-new');
 var subgroupName = document.getElementById('subgroup-name');

 function syncSubgroupName() {
   subgroupNew.hidden = subgroupSelect.value !== 'new';
   subgroupName.disabled = subgroupNew.hidden;
 }
 subgroupSelect.onchange = function() {
   syncSubgroupName();
   if (!subgroupNew.hidden) subgroupName.focus();
 };
 var subgroupsMessage = document.getElementById('subgroups-message');

 function showSubgroups(open) {
   subgroupsPanel.hidden = !open;
   subgroupsToggle.setAttribute('aria-expanded', String(open));
   if (!open) return;
   var names = new Set();
   document.getElementById('subgroups-links').innerHTML = '<legend>Выбери ссылки</legend>' +
     links.map(function(link) {
       var name = subgroups[link.id];
       if (name) names.add(name);
       return '<label><input type="checkbox" name="link" value="' + esc(link.id) + '"><span>' + esc(link.label) +
         (name ? '<small>' + esc(name) + '</small>' : '') + '</span></label>';
     }).join('');
   var groupOptions = Array.from(names).sort(function(a,b) { return a.localeCompare(b,'ru'); });
   subgroupSelect.replaceChildren(new Option('Выбери подгруппу',''), ...groupOptions.map(function(name) {
     return new Option(name,'group:' + name);
   }), new Option('Новая подгруппа','new'));
   subgroupSelect.options[0].disabled = true;
   subgroupSelect.value = groupOptions.length ? '' : 'new';
   subgroupName.value = '';
   syncSubgroupName();
   subgroupsMessage.textContent = '';
 }

 subgroupsToggle.onclick = function() { showSubgroups(subgroupsPanel.hidden); };
 subgroupsForm.addEventListener('submit', function(event) {
   event.preventDefault();
   var ids = new FormData(subgroupsForm).getAll('link');
   var remove = event.submitter?.value === 'remove';
   var selected = subgroupSelect.value;
   var name = selected === 'new' ? subgroupName.value.trim() : selected.slice('group:'.length);
   if (!ids.length || (!remove && !name)) {
     subgroupsMessage.textContent = !ids.length ? 'Выбери хотя бы одну ссылку.' : selected === 'new' ? 'Укажи название подгруппы.' : 'Выбери подгруппу.';
     return;
   }
   var updated = {...subgroups};
   ids.forEach(function(id) {
     if (remove) delete updated[id];
     else updated[id] = name;
   });
   try { localStorage.setItem(subgroupsKey,JSON.stringify(updated)); }
   catch (_) { subgroupsMessage.textContent = 'Браузер не смог сохранить подгруппы.'; return; }
   subgroups = Object.assign(Object.create(null),updated);
   render();
   showSubgroups(false);
   subgroupsToggle.focus({preventScroll:true});
 });

 function matrixSections(rows) {
   var groups = new Map();
   rows.forEach(function(link) {
     var name = subgroups[link.id] || '';
     if (!groups.has(name)) groups.set(name,[]);
     groups.get(name).push(link);
   });
   if (groups.size === 1 && groups.has('')) return [{name:null,rows:rows}];
   return Array.from(groups,function(group) { return {name:group[0],rows:group[1]}; })
     .sort(function(a,b) { return Number(!a.name)-Number(!b.name) || a.name.localeCompare(b.name,'ru'); });
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
   function renderRow(link) {
     var label = esc(link.label);
     return '<tr data-link-id="' + esc(link.id) + '"' + (hiddenIds.has(String(link.id)) ? ' hidden' : '') +
       '><th scope="row"><span class="matrix-link-controls"><button type="button" class="matrix-link-name" data-link-details>' +
       label + '</button><button type="button" class="matrix-link-hide" data-hide-link aria-label="Скрыть: ' +
       label + '">Скрыть</button><small data-budget-amount-label hidden></small></span></th>'  + metrics.map(function(metric) {
       return '<td>' + metricCell('', link[metric[1]], metric[2]) + '</td>';
     }).join('') + extraFields.map(function(field) {
       return '<td data-summary-field="' + field[1] + '">…</td>';
     }).join('') + '</tr>';
   }
   var sections = matrixSections(rows).map(function(section) {
     var title = section.name == null ? '' : '<tr class="matrix-subgroup"><th colspan="' +
       (1 + metrics.length + extraFields.length) + '" scope="rowgroup">' + esc(section.name || 'Без подгруппы') + '</th></tr>';
     var hidden = section.rows.every(function(link) { return hiddenIds.has(String(link.id)); });
     var total = section.name ? '<tr class="matrix-subgroup-total"><th scope="row" title="Сумма по видимым ссылкам; один посетитель может учитываться в нескольких ссылках">Итого</th>' +
       metrics.map(function(metric) { return '<td>' + metricCell('',null,metric[2]) + '</td>'; }).join('') +
       extraFields.map(function() { return '<td><strong>—</strong></td>'; }).join('') + '</tr>' : '';
     return '<tbody' + (hidden ? ' hidden' : '') + '>' + title + section.rows.map(renderRow).join('') + total + '</tbody>';
   }).join('');
   return '<div class="link-matrix" tabindex="0" role="region" aria-label="Матрица статистики ссылок">' +
     '<table>' + columns + '<thead>' + group + '<tr><th scope="col">Ссылка</th>' +
     metrics.concat(extraFields).map(function(metric) { return '<th scope="col">' + metric[0] + '</th>'; }).join('') +
     '</tr></thead>' + sections + '</table></div><div data-matrix-link-details></div>';
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
   var rows = Array.from(root.querySelectorAll('.link-matrix tr[data-link-id]:not([hidden])'));
   var index = 0;
   async function loadRows() {
     while (index < rows.length && seq === matrixRenderSeq) {
       var row = rows[index++];
       if (row.hidden) continue;
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
           cell.dataset.value = value ?? '';
         });
       } catch (error) {
         if (seq !== matrixRenderSeq) return;
         row.querySelectorAll('[data-summary-field]').forEach(function(cell) {
           cell.textContent = '—';
           cell.title = error.message;
         });
       }
       updateSubgroupTotal(row.parentElement);
     }
   }
   for (var worker = 0; worker < Math.min(rows.length, 2); worker++) loadRows();
 }

 function render() {
   var seq = ++matrixRenderSeq;
   fullMatrix.disabled = !links.length;
   subgroupsToggle.disabled = !links.length;
   renderHiddenLinks();
   var sort = document.getElementById('sort').value;
   var rows = links.slice().sort(function(a, b) {
     return sort === 'label' ? a.label.localeCompare(b.label, 'ru') : (b[sort] ?? -1) - (a[sort] ?? -1);
   });
   if (!rows.length) root.innerHTML = '<p>В этой категории пока нет ссылок.</p>';
   else {
     var budgetNote = !periodBounds && rows.some(function(link) { return expenseEntries(link.id).length; })
       ? '<p class="unknown">Стоимость за всё время рассчитана по учтённым расходам.</p>' : '';
     root.innerHTML = budgetNote + renderMatrix(rows);
     if (fullMatrix.getAttribute('aria-pressed') === 'true') loadMatrixSummaries(seq);
   }
   root.querySelectorAll('[data-link-id]').forEach(updateCosts);
   updateSubgroupTotals();
 }
 async function load(options = {}) {
   var seq = ++loadSeq;
   matrixRenderSeq++;
   fullMatrix.disabled = true;
   subgroupsToggle.disabled = true;
   showSubgroups(false);
   var refresh = document.getElementById('refresh');
   var selection = appliedPeriod;
   var period = selection.get('period');
   status.className = '';
   status.textContent = 'Загружаем…';
   root.innerHTML = '';
   links = [];
   hiddenPanel.hidden = true;
   renderHiddenLinks();
   refresh.disabled = true;
   budgetToggle.disabled = true;
   if (!options.keepBudget) showBudgetPanel(false);
   var budgetSave = budgetForm.querySelector('button[type="submit"]');
   budgetSave.disabled = true;
   try {
     if (!/^[a-f0-9]{64}(?:\.[a-f0-9]{64})?$/.test(token)) throw Error('Откройте персональную ссылку, полученную от владельца.');
     var data = await request(selection.toString(), AbortSignal.timeout(15000));
     if (seq !== loadSeq) return;
     var budgetPeriodError = false;
     if (autoBudgetPeriod && period === 'all') {
       autoBudgetPeriod = false;
       var recent = data.links.filter(function(link) { return !hiddenIds.has(String(link.id)); })
         .flatMap(function(link) { return expenseEntries(link.id); })
         .sort(function(a,b) { return b.to.localeCompare(a.to) || a.from.localeCompare(b.from); })[0];
       if (recent) {
         var initialRange = new URLSearchParams({period:'range',from:recent.from,to:recent.to});
         try {
           status.textContent = 'Загружаем статистику за даты бюджета…';
           data = await request(initialRange.toString(), AbortSignal.timeout(15000));
           if (seq !== loadSeq) return;
           selection = appliedPeriod = initialRange;
           period = 'range';
           periodSelect.value = period;
           fromInput.value = recent.from;
           toInput.value = recent.to;
           syncPeriodForm();
         } catch (error) {
           if (error.status === 403) throw error;
           budgetPeriodError = true;
         }
       }
     }
     if (seq !== loadSeq) return;
     document.getElementById('category').textContent = data.category;
     document.getElementById('recipient').textContent = 'Доступ: ' + data.name;
     var url = new URL(location.href);
     ['period','month','from','to'].forEach(function(key) { url.searchParams.delete(key); });
     selection.forEach(function(value,key) { url.searchParams.set(key,value); });
     if (url.href !== location.href) history.replaceState(history.state,'',url);
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
     if (options.keepBudget) {
       refreshBudgetPanel();
       budgetMessage.textContent = options.budgetMessage;
     }
     render();
     var incomplete = periodStart && links.some(function(link) {
       return metrics.some(function(metric) { return link[metric[1]] == null; });
     });
     status.textContent = budgetPeriodError ? 'Не удалось загрузить статистику за даты бюджета. Выбери нужные даты в фильтре «Период».' : incomplete ? 'Прочерки означают, что сохранённая история не покрывает весь период.' : '';
   } catch (error) {
     if (seq !== loadSeq) return;
     status.textContent = error.name === 'TimeoutError' ? 'Статистика не загрузилась вовремя. Нажми «Обновить», чтобы повторить.' : error.message;
     status.className = 'error';
   } finally {
     if (seq === loadSeq) {
       refresh.disabled = false;
       budgetSave.disabled = !links.length;
       if (options.keepBudget) budgetToggle.disabled = false;
     }
   }
 }
 var fields=[['С историей','visitors'],['Новые регистрации','registrations'],['Активные посетители','activeVisitors'],['Всего действий','activityCount'],['Участники розыгрышей','raffleParticipants'],['Участий','raffleCount'],['Крутили','spinners'],['Круток','spinCount'],['Poker21 привязан','poker21Linked'],['Подписаны на бота','botSubscribers'],['В чате игроков','playersChatSubscribers'],['Депозиторов','depositors'],['Пополнений','depositCount'],['Депозиты, ₽','depositAmount']];
 function bool(v){return '<span class="'+(v===true?'yes':v===false?'no':'unknown')+'">'+(v===true?'Да':v===false?'Нет':'—')+'</span>';}
 async function players(details,offset,append){var body=details.querySelector('[data-body]'),button=body.querySelector('button');if(button)button.disabled=true;try{var data=await request('id='+encodeURIComponent(details.dataset.players)+'&view=players&offset='+offset);var rows=data.rows.map(function(r){return '<tr><td>'+esc(r.nick)+'</td>'+[r.visitCount,r.activityCount].map(function(v){return '<td>'+num(v)+'</td>';}).join('')+'<td>'+bool(r.registered)+'</td><td>'+num(r.raffleCount)+'</td><td>'+num(r.spinCount)+'</td><td>'+esc(r.pokerId||'—')+'</td><td>'+num(r.heroLevel)+'</td><td>'+bool(r.bot)+'</td><td>'+bool(r.playersChat)+'</td><td>'+num(r.depositCount)+'</td><td>'+num(r.depositAmount)+'</td></tr>';}).join('');if(!append)body.innerHTML='<div class="players" tabindex="0"><table><thead><tr>'+['Игрок','Переходы','Действия','Регистрация','Розыгрыши','Крутки','Poker21 ID','Уровень','Бот','Чат','Пополнения','Депозиты CRM, ₽'].map(function(t){return '<th>'+t+'</th>';}).join('')+'</tr></thead><tbody></tbody></table></div>';body.querySelector('tbody').insertAdjacentHTML('beforeend',rows);if(button)button.remove();if(data.nextOffset!=null){var more=document.createElement('button');more.textContent='Ещё игроки';more.onclick=function(){players(details,data.nextOffset,true);};body.appendChild(more);}details.dataset.loaded='1';}catch(error){if(!append)body.textContent=error.message;else{button.disabled=false;status.textContent=error.message;}}}
 root.addEventListener('toggle',async function(event){var details=event.target;if(!details.open||details.dataset.loaded||details.dataset.loading)return;details.dataset.loading='1';var body=details.querySelector('[data-body]');body.textContent='Загрузка…';try{if(details.dataset.players){await players(details,0,false);return;}var data=await request('id='+encodeURIComponent(details.dataset.summary)+'&view=summary');body.innerHTML='<div class="summary-grid">'+fields.map(function(pair){return metricCell(pair[0],data.summary[pair[1]],periodBounds||pair[1]==='depositAmount'?'':pair[1]==='registrations'?'Цена регистрации':'Цена за единицу');}).join('')+'</div>';if(data.summary.coverageUnavailable)body.insertAdjacentHTML('afterbegin','<p class="unknown">Полноту старой истории проверить не удалось.</p>');if(data.summary.registrationUnknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Дата регистрации не установлена: '+num(data.summary.registrationUnknown)+'</p>');if(data.summary.coverage?.visitorsWithoutJourney)body.insertAdjacentHTML('afterbegin','<p class="unknown">Без подробной истории: '+num(data.summary.coverage.visitorsWithoutJourney)+' из '+num(data.summary.coverage.trackedVisitors)+' посетителей.</p>');var unknown=(data.summary.botUnknown||0)+(data.summary.playersChatUnknown||0)+(data.summary.depositUnknown||0);if(unknown)body.insertAdjacentHTML('beforeend','<p class="unknown">Часть подписок или депозитов не проверена и не включена в подтверждённые итоги.</p>');updateCosts(details.closest('article'));details.dataset.loaded='1';}catch(error){body.textContent=error.message;}finally{delete details.dataset.loading;}},true);
 root.addEventListener('click', function(event) {
   var hideButton = event.target.closest('[data-hide-link]');
   if (hideButton) {
     var row = hideButton.closest('tr[data-link-id]');
     var visible = Array.from(root.querySelectorAll('tr[data-link-id]:not([hidden])'));
     var index = visible.indexOf(row);
     var next = visible[index+1] || visible[index-1];
     hiddenIds.add(row.dataset.linkId);
     saveHiddenLinks();
     row.hidden = true;
     updateSubgroupTotal(row.parentElement);
     if (!row.parentElement.querySelector('tr[data-link-id]:not([hidden])')) row.parentElement.hidden = true;
     var openDetails = root.querySelector('[data-matrix-link-details] article');
     if (openDetails?.dataset.linkId === row.dataset.linkId) openDetails.remove();
     renderHiddenLinks();
     (next?.querySelector('[data-hide-link]') || hiddenToggle).focus({preventScroll:true});
     return;
   }
   var nameButton = event.target.closest('[data-link-details]');
   var closeButton = event.target.closest('[data-close-link-details]');
   if (!nameButton && !closeButton) return;
   var panel = root.querySelector('[data-matrix-link-details]');
   if (closeButton) {
     var id = closeButton.closest('[data-link-id]').dataset.linkId;
     panel.replaceChildren();
     Array.from(root.querySelectorAll('[data-link-details]')).find(function(button) {
       return button.closest('[data-link-id]').dataset.linkId === id;
     })?.focus();
     return;
   }
   var id = nameButton.closest('[data-link-id]').dataset.linkId;
   panel.innerHTML = '<article data-link-id="' + esc(id) + '"><header><h2>' + esc(nameButton.textContent) +
     '</h2><button type="button" data-close-link-details>Закрыть</button></header>' + linkDetails(esc(id)) + '</article>';
   panel.querySelector('summary').focus();
 });
 fullMatrix.addEventListener('click', function() {
   var expanded = fullMatrix.getAttribute('aria-pressed') !== 'true';
   fullMatrix.setAttribute('aria-pressed',String(expanded));
   render();
 });
 function syncPeriodForm() {
   var period = periodSelect.value;
   monthGroup.hidden = monthGroup.disabled = period !== 'month';
   rangeGroup.hidden = rangeGroup.disabled = period !== 'range';
   periodForm.hidden = monthGroup.hidden && rangeGroup.hidden;
 }
 periodSelect.onchange = function() {
   autoBudgetPeriod = false;
   syncPeriodForm();
   if (!periodForm.hidden) return;
   appliedPeriod = new URLSearchParams({period:periodSelect.value});
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
 periodSelect.value = appliedPeriod.get('period');
 if (periodSelect.value === 'month') {
   var selectedMonth = appliedPeriod.get('month');
   yearInput.value = selectedMonth.slice(0,4);
   monthInput.value = selectedMonth.slice(5,7);
 } else if (periodSelect.value === 'range') {
   fromInput.value = appliedPeriod.get('from');
   toInput.value = appliedPeriod.get('to');
 }
 syncPeriodForm();
 document.getElementById('sort').onchange=function(){if(links.length)render();};document.getElementById('refresh').onclick=function(){matrixSummaries.clear();load();};load();
})();
