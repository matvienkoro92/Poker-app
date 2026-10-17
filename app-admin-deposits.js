(function() {
  'use strict';
  var parser = window.pokerDepositParser, dialog, host, editor, status, opener;
  var data = {entries:[], totals:{total:0,paid:0,remaining:0}}, loaded = false, busy = false;
  var filter = 'active', query = '', pending = null, editing = false, timer, generation = 0;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function money(n) { return (Number(n || 0)/100).toLocaleString('ru-RU',{maximumFractionDigits:2}) + ' ₽'; }
  function inputMoney(n) { return n ? String(n/100).replace('.',',') : ''; }
  function date(n) { return new Date(n).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}); }
  function uid() { return window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'dep_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2); }
  function tell(message, error) { status.textContent = message; status.classList.toggle('is-error',!!error); }
  function icon(name) {
    var paths = {wallet:'<path d="M3 6h17v15H3zM3 6l14-3v3M16 12h5v5h-5z"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v13h5"/>',plus:'<path d="M12 4v16M4 12h16"/>',arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',check:'<path d="m5 12 4 4L19 6"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M5 7a8 8 0 0 1 14 1M19 17a8 8 0 0 1-14-1"/>'};
    return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(paths[name] || paths.wallet)+'</svg>';
  }
  function ensure() {
    if (dialog) return;
    dialog = document.createElement('dialog'); dialog.className='deposits'; dialog.setAttribute('aria-labelledby','depositsTitle');
    dialog.innerHTML='<div class="deposits__shell"><header class="deposits__header"><div class="deposits__brand">'+icon('wallet')+'</div><div><p class="deposits__eyebrow">КАССА КЛУБА · ДЛЯ АДМИНОВ</p><h2 id="depositsTitle">Депозиты и выводы</h2></div><button type="button" class="deposits__close" data-dep="close" aria-label="Закрыть">×</button></header><div class="deposits__toolbar"><p>Выберите реквизит. Скопируйте. Проведите сумму.</p><button type="button" class="deposits__primary" data-dep="new">'+icon('plus')+' Добавить вывод</button><button type="button" class="deposits__refresh" data-dep="refresh" aria-label="Обновить данные">'+icon('refresh')+'</button></div><p class="deposits__status" role="status" aria-live="polite"></p><div class="deposits__retry" hidden><span>Результат сохранения пока неизвестен. Повторите ту же операцию — сумма учтётся один раз.</span><button type="button" data-dep="retry">Проверить и повторить</button></div><main class="deposits__content"></main><section class="deposits__editor" hidden aria-labelledby="depositEditorTitle"></section><footer class="deposits__footer">Общий журнал администраторов · суммы фиксируются вручную</footer></div>';
    document.body.appendChild(dialog); host=dialog.querySelector('main'); editor=dialog.querySelector('.deposits__editor'); status=dialog.querySelector('[role="status"]');
    dialog.addEventListener('click',onClick); dialog.addEventListener('submit',onSubmit);
    dialog.addEventListener('input',function(e){
      if (e.target.matches('[data-dep-search]')) { query=e.target.value; renderCards(); }
      if (e.target.name === 'amount' && editor.querySelector('[data-dep-after]')) updateAfter();
    });
    dialog.addEventListener('cancel',function(e){ if (busy) {e.preventDefault();return;} if(editing){e.preventDefault();closeEditor();} });
    dialog.addEventListener('close',function(){clearInterval(timer);document.body.classList.remove('deposits-open');generation++;if(opener)opener.focus();});
  }
  function setBusy(value) {
    busy=value; dialog.setAttribute('aria-busy',String(value));
    dialog.querySelectorAll('button').forEach(function(b){ b.disabled=value; });
    var retry=dialog.querySelector('.deposits__retry'); retry.hidden=!pending;
  }
  async function api(body) {
    var payload=typeof pokerGuestOrAuthedPostBody === 'function' ? pokerGuestOrAuthedPostBody(body) : body;
    payload.accessToken=window.pokerAdminMenuAccessToken('deposits');
    var controller=new AbortController(), timeout=setTimeout(function(){controller.abort();},15000);
    try {
      var response=await fetch((typeof getApiBase==='function'?getApiBase():'')+'/api/admin-deposits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      var result=await response.json();
      if(!response.ok || !result.ok){var error=new Error(result.error || 'Не удалось выполнить операцию');error.status=response.status;error.code=result.code;throw error;}
      return result;
    } finally {clearTimeout(timeout);}
  }
  function handleError(error) {
    if(error.code==='password_required') {
      try {localStorage.removeItem('poker_admin_menu_access_deposits');}catch(e){}
      tell('Доступ истёк. Разблокируйте раздел, затем повторите операцию.',true);
      if(!dialog.querySelector('[data-dep="unlock"]')) status.insertAdjacentHTML('beforeend',' <button type="button" data-dep="unlock">Ввести пароль</button>');
    } else tell(error.name==='AbortError'?'Ответ не получен. Проверьте соединение и повторите.':error.message || 'Нет соединения. Повторите попытку.',true);
  }
  async function refresh(silent) {
    if(busy || (silent && editing))return;
    setBusy(true); var stamp=generation;
    if(!silent)tell('Обновляем общий журнал…');
    try {var result=await api({action:'list'});if(stamp!==generation)return;data=result;loaded=true;render();if(!silent)tell('Данные обновлены · '+date(Date.now()));}
    catch(e){if(stamp===generation){handleError(e);if(!loaded)host.innerHTML='<div class="deposits__empty"><h3>Не удалось загрузить реквизиты</h3><p>Проверьте соединение и повторите загрузку.</p><button type="button" data-dep="refresh">Повторить</button></div>';}}
    finally{setBusy(false);}
  }
  async function save(operation) {
    if(busy)return;
    if(pending && operation!==pending){tell('Сначала проверьте предыдущую операцию.',true);return;}
    operation.requestId=operation.requestId || uid(); pending=operation;setBusy(true);tell('Сохраняем…');
    try {data=await api(operation);loaded=true;pending=null;closeEditor();render();tell(operation.action==='payment'?'Депозит проведён. Остаток обновлён.':operation.action==='void'?'Операция отменена. Сумма возвращена в остаток.':'Сохранено в общем журнале.');}
    catch(e){if(e.status && e.status<500)pending=null;handleError(e);}
    finally{setBusy(false);}
  }
  async function open(target) {
    if(!window.pokerHasAdminMenuAccess('deposits'))return;
    ensure(); if(dialog.open)return; opener=target;editing=false;editor.hidden=true;host.hidden=false;dialog.querySelector('.deposits__toolbar').hidden=false;
    loaded=false; data={entries:[],totals:{total:0,paid:0,remaining:0}};
    dialog.showModal();document.body.classList.add('deposits-open');render();await refresh(false);
    clearInterval(timer);timer=setInterval(function(){if(document.visibilityState==='visible')refresh(true);},30000);
  }
  function render() {
    var counts={active:0,done:0,archive:0};data.entries.forEach(function(e){counts[e.archived?'archive':e.remaining>0?'active':'done']++;});
    var totals='<div class="deposits__totals"><div><span>Осталось выплатить</span><strong>'+money(data.totals.remaining)+'</strong><small>'+counts.active+' активных реквизитов</small></div><div><span>Уже проведено</span><strong>'+money(data.totals.paid)+'</strong><small>По реквизитам вне архива</small></div><div><span>Общая сумма выводов</span><strong>'+money(data.totals.total)+'</strong><small>Без архивных карточек</small></div></div>';
    host.innerHTML='<div class="deposits__filters"><nav aria-label="Состояние выводов">'+[['active','В работе'],['done','Закрытые'],['totals','Итого'],['archive','Архив']].map(function(t){return '<button type="button" data-dep="filter" data-filter="'+t[0]+'" aria-pressed="'+(filter===t[0])+'">'+t[1]+(t[0]==='totals'?'':' <span>'+counts[t[0]]+'</span>')+'</button>';}).join('')+'</nav><label class="deposits__search"'+(filter==='totals'?' hidden':'')+'><span class="deposits__sr">Поиск по получателю, банку или номеру</span><input data-dep-search type="search" placeholder="Имя, банк или номер…" value="'+esc(query)+'"></label></div>'+ (filter==='totals'?totals:'<div class="deposits__cards"></div>');
    renderCards();
  }
  function renderCards() {
    if(filter==='totals')return;
    var list=data.entries.filter(function(e){return (filter==='archive'?e.archived:!e.archived&&(filter==='active'?e.remaining>0:e.remaining===0))&&(!query || [e.recipient,e.bank,e.card,e.phone,e.note].join(' ').toLowerCase().includes(query.toLowerCase()));});
    var container=host.querySelector('.deposits__cards');if(!container)return;
    container.innerHTML=list.map(card).join('') || '<div class="deposits__empty"><span>'+icon('wallet')+'</span><h3>'+(query?'Ничего не найдено':filter==='active'?'Все выплаты закрыты':'Здесь пока пусто')+'</h3><p>'+(query?'Попробуйте другое имя, банк или последние цифры номера.':'Вставьте сообщение с реквизитами — подготовим карточку для работы.')+'</p>'+(!query&&filter==='active'?'<button type="button" class="deposits__primary" data-dep="new">'+icon('plus')+' Добавить вывод</button>':'')+'</div>';
  }
  function card(e) {
    var progress=Math.min(100,Math.round(e.paid/e.total*100));
    return '<article class="deposits__card" data-entry="'+esc(e.id)+'"><div class="deposits__card-head"><span class="deposits__bank">'+icon('wallet')+esc(e.bank||'Платёжная ссылка')+'</span><span class="deposits__badge '+(!e.remaining?'is-done':'')+'">'+(e.archived?'Архив':e.remaining?'К выплате':'Выплачено')+'</span></div><h3>'+esc(e.recipient)+'</h3><div class="deposits__numbers">'+(e.card?'<button type="button" data-dep="copy-card" title="Скопировать карту">'+esc(e.card.replace(/(.{4})/g,'$1 ').trim())+icon('copy')+'</button>':'')+(e.phone?'<button type="button" data-dep="copy-phone" title="Скопировать телефон">'+esc(e.phone)+icon('copy')+'</button>':'')+'</div>'+(e.note?'<p class="deposits__note">'+esc(e.note)+'</p>':'')+'<div class="deposits__remaining"><span>Остаток к выплате</span><strong>'+money(e.remaining)+'</strong></div><div class="deposits__progress" role="progressbar" aria-label="Выплачено" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+progress+'%"></i></div><div class="deposits__paid"><span>Проведено <b>'+money(e.paid)+'</b></span><span>из '+money(e.total)+'</span></div><div class="deposits__card-actions"><button type="button" data-dep="copy" class="deposits__secondary">'+icon('copy')+' Скопировать реквизиты</button>'+(!e.archived&&e.remaining?'<button type="button" data-dep="payment" class="deposits__primary">Провести депозит '+icon('arrow')+'</button>':'<span class="deposits__settled">'+icon('check')+' Выплата закрыта</span>')+'</div>'+(e.paymentLink?'<a class="deposits__link" href="'+esc(parser.safeLink(e.paymentLink))+'" target="_blank" rel="noopener noreferrer">Открыть платёжку ↗ <span>Проведено '+money(e.paid)+'</span></a>':'')+'<details class="deposits__history"><summary>История · '+e.payments.filter(function(p){return !p.voidedAt;}).length+' операций</summary><p>Добавлен '+date(e.createdAt)+' · '+esc(e.createdByName||'Администратор')+'</p>'+e.payments.slice().reverse().map(function(p){return '<div class="deposits__transaction '+(p.voidedAt?'is-void':'')+'"><div><strong>'+money(p.amount)+'</strong><small>'+date(p.createdAt)+' · '+esc(p.createdByName||'Администратор')+(p.voidedAt?' · отменено':'')+'</small>'+(p.note?'<p>'+esc(p.note)+'</p>':'')+'</div>'+(!p.voidedAt?'<button type="button" data-dep="void" data-payment="'+esc(p.id)+'">Отменить</button>':'')+'</div>';}).join('')+e.changes.map(function(c){return '<p>'+date(c.createdAt)+' · Сумма '+money(c.before)+' → '+money(c.after)+'<br>'+esc(c.reason)+'</p>';}).join('')+(e.rawText?'<details><summary>Исходное сообщение</summary><p class="deposits__raw">'+esc(e.rawText)+'</p></details>':'')+'</details><div class="deposits__card-foot">'+(!e.archived?'<button type="button" data-dep="adjust">Изменить сумму</button>':'')+(!e.archived&&!e.remaining?'<button type="button" data-dep="archive">В архив</button>':'')+'</div></article>';
  }
  function showEditor(title, body) {
    editing=true;editor.hidden=false;
    editor.innerHTML='<div class="deposits__editor-top"><div><p class="deposits__eyebrow">БЫСТРАЯ ОПЕРАЦИЯ</p><h3 id="depositEditorTitle">'+esc(title)+'</h3></div><button type="button" data-dep="editor-close" aria-label="Закрыть форму">×</button></div>'+body;
    host.hidden=true;dialog.querySelector('.deposits__toolbar').hidden=true;
    editor.scrollIntoView({block:'start'});var focus=editor.querySelector('textarea,input,button');if(focus)focus.focus();
  }
  function closeEditor() {editing=false;editor.hidden=true;host.hidden=false;dialog.querySelector('.deposits__toolbar').hidden=false;dialog.scrollTop=0;}
  function newEntry() {
    if(pending){tell('Сначала проверьте предыдущую операцию.',true);return;}
    showEditor('Добавить вывод','<form data-form="parse"><p class="deposits__intro">Вставьте реквизиты как вам прислали. Найдём карту, телефон, банк, получателя и сумму. Перед сохранением всё можно исправить.</p><label>Сообщение с реквизитами<textarea name="raw" rows="7" maxlength="5000" placeholder="Иван Петров\nСбербанк\n+7 999 123-45-67\nСумма: 15 000 ₽" required></textarea></label><button type="submit" class="deposits__primary deposits__wide">Распознать реквизиты '+icon('arrow')+'</button><button type="button" class="deposits__text-button" data-dep="manual">Заполнить вручную</button></form>');
  }
  function field(label,name,value,extra) {return '<label>'+label+'<input name="'+name+'" value="'+esc(value)+'" '+(extra||'')+'></label>';}
  function review(parsed) {
    showEditor('Проверьте реквизиты','<form data-form="create"><p class="deposits__intro">Это сумма вывода. Проведённые на эти реквизиты депозиты будут уменьшать остаток.</p>'+(parsed.warnings.length?'<div class="deposits__warning">'+parsed.warnings.map(esc).join('<br>')+'</div>':'<div class="deposits__recognized">'+icon('check')+' Данные распознаны. Проверьте перед сохранением.</div>')+'<div class="deposits__form-grid">'+field('Получатель','recipient',parsed.recipient,'required maxlength="180" autocomplete="off"')+field('Банк','bank',parsed.bank,'maxlength="180" autocomplete="off"')+field('Номер карты','card',parsed.card,'inputmode="numeric" maxlength="32" autocomplete="off"')+field('Телефон / СБП','phone',parsed.phone,'type="tel" maxlength="32" autocomplete="off"')+'</div>'+field('Сумма к выплате, ₽','total',inputMoney(parsed.amount),'required inputmode="decimal" autocomplete="off"')+field('Ссылка на платёжку · необязательно','paymentLink',parsed.paymentLink,'type="url" placeholder="https://…" maxlength="2000"')+field('Заметка · необязательно','note','','maxlength="500" placeholder="Например, ник игрока"')+'<input name="rawText" type="hidden" value="'+esc(parsed.rawText)+'"><div class="deposits__form-actions"><button type="button" class="deposits__secondary" data-dep="back-parse">Назад к сообщению</button><button type="submit" class="deposits__primary">Создать карточку '+icon('check')+'</button></div></form>');
  }
  function updateAfter() {
    var form=editor.querySelector('form'), e=data.entries.find(function(e){return e.id===form.dataset.entry;});if(!e)return;
    var value=parser.money(form.elements.amount.value);
    editor.querySelector('[data-dep-after]').textContent=value&&value<=e.remaining?'После депозита останется '+money(e.remaining-value):'Доступно к проведению: '+money(e.remaining);
  }
  function paymentEditor(e) {
    showEditor('Провести депозит','<form data-form="payment" data-entry="'+esc(e.id)+'"><div class="deposits__recipient-preview"><span>'+esc(e.bank)+'</span><h4>'+esc(e.recipient)+'</h4><p>'+esc(e.card||e.phone||'По платёжной ссылке')+'</p><strong>Остаток '+money(e.remaining)+'</strong></div>'+field('Полученная сумма, ₽','amount','','required inputmode="decimal" autocomplete="off" placeholder="0"')+'<div class="deposits__presets">'+[100000,500000,1000000].filter(function(n){return n<e.remaining;}).map(function(n){return '<button type="button" data-dep="preset" data-amount="'+n+'">'+money(n)+'</button>';}).join('')+'<button type="button" data-dep="preset" data-amount="'+e.remaining+'">Весь остаток</button></div><p class="deposits__after" data-dep-after>После ввода суммы покажем новый остаток</p>'+field('Комментарий · необязательно','note','','maxlength="300" placeholder="Ник или пометка к операции"')+'<button type="submit" class="deposits__primary deposits__wide">Подтвердить депозит '+icon('check')+'</button><p class="deposits__hint">Нажимайте после фактического поступления денег. Ошибочную операцию можно отменить в истории.</p></form>');
    editor.querySelector('[name="amount"]').focus();
  }
  async function copy(value) {
    try {
      if(navigator.clipboard && navigator.clipboard.writeText)await navigator.clipboard.writeText(value);
      else {var area=document.createElement('textarea');area.value=value;dialog.appendChild(area);area.select();if(!document.execCommand('copy'))throw new Error();area.remove();}
      tell('Скопировано. Можно отправить реквизиты.');
    }catch(e){tell('Не удалось скопировать. Выделите номер в карточке вручную.',true);}
  }
  async function onClick(event) {
    var b=event.target.closest('[data-dep]');if(!b||busy)return;
    var action=b.dataset.dep, cardNode=b.closest('[data-entry]');
    var e=cardNode?data.entries.find(function(e){return e.id===cardNode.dataset.entry;}):null;
    if(action==='close')dialog.close();
    else if(action==='editor-close')closeEditor();
    else if(action==='new')newEntry();
    else if(action==='refresh')await refresh(false);
    else if(action==='retry'&&pending)await save(pending);
    else if(action==='unlock'){dialog.close();document.getElementById('headerDepositsShortcutBtn').click();}
    else if(action==='filter'){filter=b.dataset.filter;render();}
    else if(action==='manual')review(parser.parse(''));
    else if(action==='back-parse'){var raw=editor.querySelector('[name="rawText"]').value;newEntry();editor.querySelector('[name="raw"]').value=raw;}
    else if(action==='preset'){editor.querySelector('[name="amount"]').value=inputMoney(Number(b.dataset.amount));updateAfter();}
    else if(e&&action==='copy')await copy([e.recipient,e.bank,e.card,e.phone,e.paymentLink].filter(Boolean).join('\n'));
    else if(e&&action==='copy-card')await copy(e.card);
    else if(e&&action==='copy-phone')await copy(e.phone);
    else if(e&&action==='payment')paymentEditor(e);
    else if(e&&action==='adjust')showEditor('Изменить сумму вывода','<form data-form="adjust" data-entry="'+esc(e.id)+'"><p class="deposits__intro">'+esc(e.recipient)+' · уже проведено '+money(e.paid)+'. Новая сумма не может быть меньше проведённой.</p>'+field('Новая общая сумма, ₽','total',inputMoney(e.total),'required inputmode="decimal"')+field('Причина изменения','reason','','required maxlength="300"')+'<button type="submit" class="deposits__primary deposits__wide">Сохранить сумму</button></form>');
    else if(e&&action==='archive')await save({action:'archive',entryId:e.id});
    else if(e&&action==='void'){
      var p=e.payments.find(function(p){return p.id===b.dataset.payment;});if(!p)return;
      showEditor('Отменить ошибочный депозит','<form data-form="void" data-entry="'+esc(e.id)+'" data-payment="'+esc(p.id)+'"><p class="deposits__intro">'+esc(e.recipient)+'</p><div class="deposits__recipient-preview"><strong>'+money(p.amount)+'</strong><p>Вернётся в остаток к выплате. Запись сохранится в истории.</p></div><button type="submit" class="deposits__primary deposits__wide">Подтвердить отмену</button><button type="button" class="deposits__text-button" data-dep="editor-close">Оставить как есть</button></form>');
    }
  }
  async function onSubmit(event) {
    var form=event.target.closest('[data-form]');if(!form)return;event.preventDefault();if(busy)return;
    var values=Object.fromEntries(new FormData(form).entries()), type=form.dataset.form;
    if(type==='parse'){review(parser.parse(values.raw));return;}
    if(type==='create'){
      var total=parser.money(values.total);if(!total){tell('Укажите корректную сумму к выплате.',true);return;}
      values.total=total;await save({action:'create',entry:values});
    }else if(type==='payment'){
      var amount=parser.money(values.amount), entry=data.entries.find(function(e){return e.id===form.dataset.entry;});
      if(!amount || !entry || amount>entry.remaining){tell('Введите сумму от 0,01 ₽ до текущего остатка.',true);return;}
      await save({action:'payment',entryId:entry.id,amount:amount,note:values.note});
    }else if(type==='adjust'){
      var sum=parser.money(values.total);if(!sum){tell('Проверьте новую сумму.',true);return;}
      await save({action:'adjust',entryId:form.dataset.entry,total:sum,reason:values.reason});
    }else if(type==='void')await save({action:'void',entryId:form.dataset.entry,paymentId:form.dataset.payment});
  }
  document.addEventListener('click',function(event){var target=event.target.closest('#headerDepositsShortcutBtn');if(target&&!target.hidden&&!target.disabled)open(target);});
})();
