let requestNumber=0;
const waiting=new Map();
function historyRequest(action,handId){return new Promise((resolve,reject)=>{
 const id=++requestNumber;
 const timer=setTimeout(()=>{waiting.delete(id);reject(new Error('timeout'));},20000);
 waiting.set(id,{resolve,reject,timer});
 parent.postMessage({type:'starting-hands-request',id,action,handId},location.origin);
});}
window.addEventListener('message',event=>{
 if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='starting-hands-response')return;
 const item=waiting.get(event.data.id);if(!item)return;waiting.delete(event.data.id);clearTimeout(item.timer);
 event.data.error?item.reject(new Error(event.data.error)):item.resolve(event.data.payload);
});
async function loadHistory(){
 try {const payload=await historyRequest('list');if(!payload.playerId){document.getElementById('load-status').textContent='Привяжите Poker21 в профиле, чтобы увидеть свои раздачи.';return;}document.getElementById('load-status').hidden=true;document.querySelector('main').hidden=false;startHistory(payload);}
 catch(_){document.getElementById('load-status').textContent='Не удалось загрузить историю. Вернитесь в сводку и попробуйте ещё раз.';}
}
loadHistory();
function startHistory(payload) {
  'use strict';
  const core = window.PokerHandStatistics;
  let mode = 'cash', metric = 'bb', selected = 'AJo';
  let appliedFrom='',appliedTo='';
  const outcomeFilters={positive:true,negative:true};
  const $ = id => document.getElementById(id);
  const number = n => new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n);
  const signed = n => n == null ? '—' : (n > 0 ? '+' : '') + number(n);
  const compactSigned = n => {
    if(n == null)return '—';
    const abs=Math.abs(n),divisor=abs>=1e6?1e6:abs>=1e3?1e3:1;
    return (n>0?'+':n<0?'−':'')+new Intl.NumberFormat('ru-RU',{maximumFractionDigits:divisor===1?1:1}).format(abs/divisor)+(divisor===1e6?'м':divisor===1e3?'к':'');
  };
  const sample = {playerId:payload.playerId};
  const bulk = {rows:payload.rows};
  function appendCards(target,cards){
    cards.forEach(card=>{const el=document.createElement('span');el.className='playing-card suit-'+card[1];el.textContent=(card[0]==='T'?'10':card[0])+({s:'♠',h:'♥',d:'♦',c:'♣'}[card[1]]);target.append(el);});
  }
  function unit() {return metric === 'resultMinor' ? (mode === 'cash' ? 'ед' : 'фишек') : metric === 'bb100' ? 'bb/100' : 'bb';}
  function value(c) {return metric === 'resultMinor' ? c.resultMinor == null ? null : c.resultMinor/100 : c[metric];}
  function render() {
    const from=appliedFrom,to=appliedTo;
    if(from&&to&&from>to)return;
    const data = core.aggregate(bulk.rows,{playerId:sample.playerId,mode,cashUnit:'TABLE_CHIP',from:from?new Date(from+'T00:00:00+03:00').toISOString():undefined,to:to?new Date(Date.parse(to+'T00:00:00+03:00')+86400000).toISOString():undefined});
    const selectedCell = data.cells.find(c=>c.label===selected);
    $('mode-note').hidden=mode==='cash';
    $('mode-note').textContent=mode==='cash'?'':
      (mode==='mtt'?'MTT NLH · турнирные фишки и большие блайнды. Призовые сюда не входят.':'SNG · история пока не загружена.');
    async function renderReplay(target,hand){
    let replay;try {target.textContent='Загружаем действия…';replay=await historyRequest('replay',hand.handId);target.textContent='';} catch (_) {target.textContent='Не удалось загрузить действия. Закройте и откройте раздачу, чтобы повторить.';delete target.parentElement.dataset.ready;return;}
    const add=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;target.append(el);return el;};
    if(!replay){add('p','История действий пока не загружена.');return;}
    appendCards(add('p','Ваши карты: ','replay-cards'),replay.cards);
    add('h4','Префлоп','street-heading street-preflop');
    let roundActors=new Set();
    const labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
    const unknown=[];
    for(const event of replay.events){
      if(event.board.length){roundActors.clear();appendCards(add('h4',({3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд')+' · ','replay-board street-heading street-'+({3:'flop',4:'turn',5:'river'}[event.board.length]||'board')),event.board);continue;}
      if(['92','93'].includes(event.code)){if(event.code==='92'&&event.amount)add('p','Параметр обязательных взносов: '+number(event.amount)+' '+(mode==='cash'?'ед':'фишек'),'note');continue;}
      if(!labels[event.code]){unknown.push(event);continue;}
      const label=labels[event.code];
      const decision=!['18','19'].includes(event.code);
      let newRound=false;
      if(decision){if(roundActors.has(event.actorId)){newRound=true;roundActors.clear();}roundActors.add(event.actorId);}
      const action=add('p',event.actor+' · '+label+(event.amount?' · '+number(event.amount):''),event.actor==='Вы'?'replay-hero':'replay-action');
      if(newRound)action.classList.add('replay-round-start');
    }
    if(unknown.length){const more=document.createElement('details'),caption=document.createElement('summary');caption.textContent='Нераспознанные записи отчёта ('+unknown.length+')';more.append(caption);for(const event of unknown){const line=document.createElement('p');line.textContent=event.actor+' · код '+event.code+(event.amount?' · '+number(event.amount):'');more.append(line);}target.append(more);}
    add('p','Ваш результат: '+signed(hand.resultMinor/100)+' '+(mode==='cash'?'ед':'фишек'),'replay-result');
  }
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    $('metric').value=metric;
    $('metric').options[0].textContent=mode==='cash'?'Результат, ед':'Результат, фишки';
    $('total-count').textContent=number(data.count);
    const sortedDates=bulk.rows.filter(r=>r.mode===mode).map(r=>r.playedAt).sort();
    const labelDate=d=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow'}).format(new Date(d));
    $('period-status').textContent=(data.count?'':(from||to?'За выбранные даты раздач нет. ':''))+(sortedDates.length?'Загружены раздачи: '+labelDate(sortedDates[0])+' — '+labelDate(sortedDates[sortedDates.length-1])+'.':'История этого формата пока не загружена.');
    $('matrix').replaceChildren(...data.cells.map(c=>{
      const v=value(c),button=document.createElement('button');
      button.type='button';button.className='cell '+(!c.count?'empty':v>0?'profit':v<0?'loss':'');
      button.dataset.hand=c.label;button.setAttribute('aria-pressed',String(c.label===selected));
      button.setAttribute('aria-label',c.label+': '+(c.count?signed(v)+' '+unit()+', раздач '+c.count:'нет данных'));
      const name=document.createElement('b'),amount=document.createElement('small');
      name.textContent=c.label;amount.textContent=compactSigned(v);button.title=c.label+': '+signed(v)+' '+unit();button.append(name,amount);return button;
    }));
    const cell=selectedCell;
    $('detail').innerHTML='<h2 id="detail-title" class="hand-title">'+cell.label+'<span>'+(cell.label.length===2?'Карманная пара':cell.label.endsWith('s')?'Одномастная рука':'Разномастная рука')+'</span></h2>';
    if(!cell.count){
      $('detail').insertAdjacentHTML('beforeend','<div class="empty-state"><strong>Нет подтверждённых раздач</strong>'+(mode!=='sng'?'В загруженной выборке эта рука не встречалась.':'История этого формата пока не загружена.')+' Нет данных — не значит результат 0.</div>');return;
    }
    const result=document.createElement('p');result.className='big-result '+(value(cell)>0?'positive':value(cell)<0?'negative':'');result.textContent=signed(value(cell))+' '+unit();const header=document.createElement('div');header.className='hand-detail-header';const title=$('detail-title');title.before(header);header.append(title,result);
    const count=document.createElement('p');count.className='note';count.textContent='Раздач: '+cell.count+' · в плюс: '+cell.wins+' · в минус: '+cell.losses+' · в ноль: '+cell.even;$('detail').append(count);
    const filters=document.createElement('div');filters.className='hand-outcome-filters';
    [['positive','Плюсовые'],['negative','Минусовые']].forEach(([key,text])=>{
      const label=document.createElement('label'),input=document.createElement('input');
      input.type='checkbox';input.checked=outcomeFilters[key];input.dataset.outcome=key;
      input.addEventListener('change',()=>{outcomeFilters[key]=input.checked;render();$('detail').querySelector('[data-outcome="'+key+'"]').focus({preventScroll:true});});
      label.append(input,document.createTextNode(text));filters.append(label);
    });const resultGroup=document.createElement('div');resultGroup.className='hand-result-group';header.append(resultGroup);resultGroup.append(result,filters);
    const list=document.createElement('div');list.className='hand-list';
    const visibleHands=cell.hands.filter(h=>h.resultMinor>0?outcomeFilters.positive:h.resultMinor<0?outcomeFilters.negative:outcomeFilters.positive&&outcomeFilters.negative);
    if(!visibleHands.length){const empty=document.createElement('p');empty.className='note';empty.textContent='Нет раздач по выбранным фильтрам.';list.append(empty);}

    visibleHands.forEach((h,index)=>{
      const row=document.createElement('details');row.className='hand-row replay';
      const summary=document.createElement('summary');summary.className='hand-summary';
      const ordinal=document.createElement('span');ordinal.className='hand-number';ordinal.textContent='#'+(index+1);
      const date=document.createElement('span');date.textContent=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(h.playedAt));
      const amount=document.createElement('strong');amount.textContent=signed(metric==='resultMinor'?h.resultMinor/100:h.bb)+' '+(metric==='resultMinor'?(mode==='cash'?'ед':'фишек'):'bb');
      amount.className=h.resultMinor>0?'positive':h.resultMinor<0?'negative':'';
      const meta=document.createElement('span');meta.className='meta';meta.textContent='Сессия '+h.sessionId+' · ';appendCards(meta,h.cards);meta.append(' · раздача '+h.handId);
      const arrow=document.createElement('span');arrow.className='hand-arrow';arrow.textContent='⌄';arrow.setAttribute('aria-hidden','true');
      summary.setAttribute('aria-label','Раздача '+(index+1)+', '+h.cards.join(' ')+', '+signed(h.resultMinor/100)+'. Раскрыть историю');
      summary.append(ordinal,date,amount,meta,arrow);row.append(summary);
      row.addEventListener('toggle',()=>{if(!row.open||row.dataset.ready)return;row.dataset.ready='1';const body=row.querySelector('.replay-body')||document.createElement('div');body.className='replay-body';row.append(body);renderReplay(body,h);});
      list.append(row);
    });$('detail').append(list);
  }
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;render();}));
  ['date-from','date-to'].forEach(id=>$(id).addEventListener('change',()=>{
    const from=$('date-from').value,to=$('date-to').value;
    if(from&&to&&from>to){$('date-status').textContent='Дата окончания раньше начала';return;}
    appliedFrom=from;appliedTo=to;render();$('date-status').textContent='';
  }));
  $('metric').addEventListener('change',e=>{metric=e.target.value;render();});
  $('matrix').addEventListener('click',e=>{const b=e.target.closest('[data-hand]');if(b){selected=b.dataset.hand;render();$('matrix').querySelector('[data-hand="'+selected+'"]').focus({preventScroll:true});}});
  render();
}
