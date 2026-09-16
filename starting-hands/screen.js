let requestNumber=0;
const waiting=new Map();
function historyRequest(action,handId){return new Promise((resolve,reject)=>{
 const id=++requestNumber;
 const timer=setTimeout(()=>{waiting.delete(id);reject(new Error('timeout'));},20000);
 waiting.set(id,{resolve,reject,timer});
 parent.postMessage({type:'starting-hands-request',id,action,handId,handIds:Array.isArray(handId)?handId:undefined},location.origin);
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
  let mode = 'cash', metric = 'bb', selected = null;
  function showHistoryTab(tab){
    document.querySelectorAll('[data-history-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.historyTab===tab)));
    document.querySelectorAll('[data-history-panel]').forEach(p=>p.hidden=!p.dataset.historyPanel.split(' ').includes(tab));
    if(tab==='review')render();
  }
  document.querySelectorAll('[data-history-tab]').forEach(b=>b.addEventListener('click',()=>showHistoryTab(b.dataset.historyTab)));
  const positionByMode={cash:'',mtt:'',sng:''};
  const positionLabel=p=>p==='UNKNOWN'?'Не определена':p;
  for(const p of core.positions){const option=document.createElement('option');option.value=p;option.textContent=positionLabel(p);document.getElementById('position').append(option);}
  let appliedFrom='',appliedTo='';
  const outcomeFilters={positive:true,negative:true};
  const $ = id => document.getElementById(id);
  function resetDateRange(){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const part=type=>parts.find(p=>p.type===type).value;
    appliedTo=part('year')+'-'+part('month')+'-'+part('day');
    const monday=new Date(appliedTo+'T00:00:00Z');
    monday.setUTCDate(monday.getUTCDate()-(monday.getUTCDay()+6)%7);
    appliedFrom=monday.toISOString().slice(0,10);
    $('date-from').value=appliedFrom;$('date-to').value=appliedTo;
    $('date-status').textContent='';
  }
  resetDateRange();
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
  function renderProfitChart(data) {
    const graphUnit=metric==='resultMinor'?'resultMinor':'bb',label=graphUnit==='bb'?'bb':mode==='cash'?'ед':'фишек';
    const series=core.profitSeries(data.cells.flatMap(c=>c.hands),graphUnit),svg=$('profit-chart');svg.replaceChildren();
    const axisFont=window.innerWidth<600?28:18;
    const lines=[['nonShowdown','#fb7185'],['showdown','#60a5fa'],['total','#4ade80']];
    if(series.evCalculated)lines.push(['allinEv','#fbbf24']);
    $('profit-ev-legend').hidden=!series.evCalculated;
    $('profit-ev-legend').querySelector('span').textContent='All-in EV';
    $('profit-ev-legend').title=series.evUnresolved||series.evMissing?'All-in EV · частичный расчёт':'All-in EV';
    $('profit-ev-note').textContent=series.evCalculated?
      'All-in EV · рассчитано раздач: '+series.evCalculated+' · не разобрано '+series.evUnresolved+(series.evMissing?' · без проверки '+series.evMissing:'')+'. Точный перебор карт при фактическом удержании из банка. В неразобранных раздачах сохранён фактический результат.':
      'Для этой выборки нет рассчитанных выставлений all-in EV.';
    const vals=series.points.flatMap(p=>lines.map(([key])=>p[key]));let low=Math.min(0,...vals),high=Math.max(0,...vals);if(low===high){low-=1;high+=1;}const pad=(high-low)*.08;low-=pad;high+=pad;
    const plotLeft=110,plotRight=790,plotWidth=plotRight-plotLeft,plotTop=80,plotBottom=plotTop+plotWidth;
    const x=i=>plotLeft+i/Math.max(1,data.count)*plotWidth,y=v=>plotBottom-(v-low)/(high-low)*plotWidth;
    function node(tag,attrs,text){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!=null)el.textContent=text;svg.append(el);return el;}
    const ticks=Array.from({length:5},(_,i)=>low+(high-low)*i/4).filter(v=>Math.abs(v)>(high-low)*.055);ticks.push(0);ticks.sort((a,b)=>a-b);
    for(const v of ticks){node('line',{x1:plotLeft,x2:plotRight,y1:y(v),y2:y(v),stroke:'#273449'});for(const [side,axisX,anchor] of [['left',plotLeft-10,'end'],['right',plotRight+10,'start']])node('text',{'data-profit-axis':side,x:axisX,y:y(v)+4,'text-anchor':anchor,fill:v===0?'#e4eaf1':'#e8bc68','font-size':axisFont,'font-weight':v===0?600:400},compactSigned(v));}
    for(const axisX of [plotLeft,plotRight])node('line',{x1:axisX,x2:axisX,y1:plotTop,y2:plotBottom,stroke:'#e8bc68','stroke-width':2});
    node('line',{x1:plotLeft,x2:plotRight,y1:plotBottom,y2:plotBottom,stroke:'#8dbfff','stroke-width':2});
    for(let i=0;i<=4;i++){const n=Math.round(data.count*i/4);node('text',{x:x(n),y:plotBottom+38,'text-anchor':i===4?'end':i===0?'start':'middle',fill:'#8dbfff','font-size':axisFont},number(n));}
    node('text',{x:(plotLeft+plotRight)/2,y:plotBottom+78,'text-anchor':'middle',fill:'#8dbfff','font-size':axisFont},'Раздачи');
    const drawdown=window.PokerHandInsights.summarize(data.cells.flatMap(c=>c.hands).map(h=>({...h,bb:graphUnit==='resultMinor'?h.resultMinor/100:h.bb}))).drawdown;
    if(drawdown.amount>0){
      node('rect',{x:x(drawdown.startIndex),y:plotTop,width:Math.max(2,x(drawdown.troughIndex)-x(drawdown.startIndex)),height:plotWidth,fill:'#fb7185',opacity:.09});
    }
    node('line',{'data-profit-zero':'',x1:plotLeft,x2:plotRight,y1:y(0),y2:y(0),stroke:'#b3bfd0','stroke-width':1.5,'vector-effect':'non-scaling-stroke'});
    for(const [key,color] of lines)node('path',{'data-profit-series':key,style:document.querySelector('[data-profit-line="'+key+'"]').checked?'':'display:none',d:series.points.map((p,i)=>(i?'L':'M')+x(i).toFixed(2)+','+y(p[key]).toFixed(2)).join(' '),fill:'none',stroke:color,'stroke-width':2,'vector-effect':'non-scaling-stroke'});
    // Keep exact endpoint values readable even when several lines finish together.
    if(data.count){
      const last=series.points.at(-1),font=28,gap=38;
      const endpoints=lines.filter(([key])=>document.querySelector('[data-profit-line="'+key+'"]').checked)
        .map(([key,color])=>({key,color,value:last[key],endY:y(last[key])})).sort((a,b)=>a.endY-b.endY);
      endpoints.forEach((p,i)=>{p.labelY=Math.max(plotTop+gap/2,p.endY,i?endpoints[i-1].labelY+gap:0);});
      if(endpoints.length){
        endpoints.at(-1).labelY=Math.min(plotBottom-gap/2,endpoints.at(-1).labelY);
        for(let i=endpoints.length-2;i>=0;i--)endpoints[i].labelY=Math.min(endpoints[i].labelY,endpoints[i+1].labelY-gap);
      }
      for(const p of endpoints){
        node('path',{d:'M'+plotRight+','+p.endY+' L'+(plotRight-12)+','+p.labelY+' H'+(plotRight-22),fill:'none',stroke:p.color,'stroke-width':1.5,'vector-effect':'non-scaling-stroke'});
        node('circle',{cx:plotRight,cy:p.endY,r:4,fill:p.color});
        node('text',{'data-profit-endpoint':p.key,x:plotRight-26,y:p.labelY,'dominant-baseline':'middle','text-anchor':'end',fill:p.color,'font-size':font,'font-weight':700,stroke:'#0b1220','stroke-width':7,'stroke-linejoin':'round','paint-order':'stroke'},signed(p.value)+' '+label);
      }
    }
    const describe=p=>'Раздач: '+p.count+' · Общий: '+signed(p.total)+' '+label+(' · Со вскрытием: '+signed(p.showdown)+' · Без вскрытия: '+signed(p.nonShowdown)+(series.unknown?' · Не классифицировано: '+signed(p.total-p.showdown-p.nonShowdown):''))+(series.evCalculated?' · All-in EV: '+signed(p.allinEv)+' '+label:'');
    $('profit-values').textContent=data.count?describe(series.points.at(-1)):'Нет раздач по выбранным фильтрам';
    svg.onpointermove=e=>{const box=svg.getBoundingClientRect(),n=Math.max(0,Math.min(data.count,Math.round(((e.clientX-box.left)/box.width*900-plotLeft)/plotWidth*data.count)));$('profit-values').textContent=describe(series.points[n]);};
    svg.onpointerleave=()=>{$('profit-values').textContent=data.count?describe(series.points.at(-1)):'Нет раздач по выбранным фильтрам';};
  }
  const insightSignals={};let insightsLoading=false,insightsError='';
  function renderInsights(data,renderReplay){
    const root=$('hand-insights');root.replaceChildren();
    const reviewMetric=metric==='resultMinor'?'resultMinor':'bb',reviewUnit=reviewMetric==='resultMinor'?(mode==='cash'?'ед':'фишек'):'bb';
    const amount=h=>reviewMetric==='resultMinor'?h.resultMinor/100:h.bb;
    const hands=data.cells.flatMap(c=>c.hands),stats=window.PokerHandInsights.summarize(hands,insightSignals,reviewMetric);
    const add=(parent,tag,text,cls)=>{const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;parent.append(el);return el;};
    add(root,'h2','Разбор игры');
    add(root,'p','По текущим фильтрам · результаты и сортировка в '+reviewUnit+(metric==='bb100'?' (для отдельных раздач)':''),'note');
    if(!hands.length){add(root,'p','Нет раздач по выбранным фильтрам.','note');return;}
    function handList(parent,rows,showEv=false){
      if(!rows.length){add(parent,'p','Подходящих раздач нет.','note');return;}
      let shown=0;const more=add(parent,'button','Показать ещё','insight-button');more.type='button';
      function next(){for(const h of rows.slice(shown,shown+30)){
        const d=document.createElement('details');d.className='insight-hand';parent.insertBefore(d,more);
        const summary=add(d,'summary',null);add(summary,'strong',signed(amount(h))+' '+reviewUnit);summary.append(' · ');appendCards(summary,h.cards);
        if(showEv){
          const evAmount=reviewMetric==='resultMinor'?h.ev.resultMinor/100:h.ev.resultMinor/h.bigBlindMinor;
          const delta=amount(h)-evAmount;
          add(d,'p','Факт: '+signed(amount(h))+' '+reviewUnit+' · EV: '+signed(evAmount)+' '+reviewUnit+' · '+(delta<0?'Недобор: ':'Перебор: ')+number(Math.abs(delta))+' '+reviewUnit,delta<0?'negative':'positive');
        }
        add(summary,'span',' · '+new Date(h.playedAt).toLocaleString('ru-RU',{timeZone:'Europe/Moscow'})+' МСК');
        d.addEventListener('toggle',()=>{if(!d.open||d.dataset.ready)return;d.dataset.ready='1';renderReplay(add(d,'div',null,'replay-body'),h);});
      }shown+=30;more.hidden=shown>=rows.length;}
      more.onclick=next;next();
    }
    const cards=add(root,'div',null,'insight-grid');
    const showdown=add(cards,'div',null,'insight-card');add(showdown,'h3','Вскрытия');
    const sd=stats.showdown;
    add(showdown,'p',sd.eligible?'Дошёл до вскрытия: '+number(sd.count/sd.eligible*100)+'% · '+sd.count+' из '+sd.eligible+' раздач с флопом':'Дошёл до вскрытия: —');
    add(showdown,'p',sd.count?'Вскрытия в плюс: '+number(sd.profitable/sd.count*100)+'% · '+sd.profitable+' из '+sd.count:'Вскрытия в плюс: —');
    add(showdown,'small',sd.loaded===0&&sd.total?'Загружаем историю действий для расчёта вскрытий…':'Учтена история действий: '+sd.loaded+' из '+sd.total+' раздач. Неопределённые вскрытия исключены из доли.');
    const load=add(root,'button',insightsLoading?'Загружаю историю действий…':'Загрузить действия для вскрытий и подборок','insight-button');load.type='button';
    const missing=hands.filter(h=>!Object.prototype.hasOwnProperty.call(insightSignals,h.handId));load.hidden=!missing.length;load.disabled=insightsLoading;
    if(insightsError)add(root,'p',insightsError,'note');
    load.onclick=async()=>{
      if(insightsLoading)return;
      insightsLoading=true;insightsError='';load.disabled=true;
      try{for(let i=0;i<missing.length;i+=100){load.textContent='Загружаю действия: '+i+' / '+missing.length;const response=await historyRequest('insights',missing.slice(i,i+100).map(h=>h.handId));Object.assign(insightSignals,response.signals);}}
      catch(_){insightsError='Не удалось загрузить все действия. Уже загруженные учтены; можно повторить.';}
      finally{insightsLoading=false;render();}
    };
    if(missing.length&&!insightsLoading&&!insightsError&&!root.hidden)queueMicrotask(()=>{if(load.isConnected&&!insightsLoading)load.click();});
    const tops=add(root,'div',null,'insight-grid');
    for(const [title,rows] of [['Крупнейшие выигрыши',stats.wins],['Крупнейшие проигрыши',stats.losses]]){const box=add(tops,'details',null,'insight-card');add(box,'summary',title+' · '+rows.length);handList(box,rows);}
    const collections=add(root,'div',null,'insight-collections');add(collections,'h3','Подборки для разбора');
    for(const [key,title] of [['riverLoss','Заколлировал ривер и проиграл'],['threeBet','Сделал 3-бет'],['foldRaise','Выбросил на рейз'],['bigLoss','Проиграл больше 30 bb'],['evBelow','🔴 Недобор от EV · от 10 bb'],['evAbove','🟢 Перебор EV · от 10 bb']]){
      const rows=stats.collections[key],d=add(collections,'details',null,'insight-section');add(d,'summary',title+' · '+rows.length,key==='evBelow'?'negative':key==='evAbove'?'positive':undefined);handList(d,rows,key==='evBelow'||key==='evAbove');
    }
    add(collections,'p','Подборки EV учитывают только раздачи с рассчитанным денежным EV; сначала показаны наибольшие отклонения. Подборки по действиям учитывают загруженные истории. 3-бет — второй префлоп-рейз; неоднозначные олл-ины исключены.','note');
    for(const [title,groups,key] of [['По сессиям',stats.sessions,'sessionId'],['По лимитам',stats.limits,'bigBlindMinor']]){
      const section=add(root,'details',null,'insight-section');add(section,'summary',title+' · '+groups.length);
      if(key==='bigBlindMinor'&&mode!=='cash')add(section,'p','В турнирах это уровни большого блайнда, а не бай-ины.','note');
      for(const g of groups.sort((a,b)=>value(b)-value(a))){
        const d=add(section,'details',null,'insight-section');
        add(d,'summary',(key==='sessionId'?'Сессия '+g.key:'BB '+number(Number(g.key)/100)+' '+(mode==='cash'?'ед':'фишек'))+' · '+g.count+' раздач · '+signed(value(g))+' '+unit()+(metric==='bb100'?'':' · '+signed(g.bb100)+' bb/100'));
        // Materialize long session lists only when opened.
        d.addEventListener('toggle',()=>{if(d.open&&!d.dataset.ready){d.dataset.ready='1';handList(d,hands.filter(h=>String(h[key])===g.key).sort((a,b)=>b.playedAt.localeCompare(a.playedAt)));}});
      }
    }
  }

  function render() {
    const from=appliedFrom,to=appliedTo;
    if(from&&to&&from>to)return;
    const data = core.aggregate(bulk.rows,{playerId:sample.playerId,mode,position:positionByMode[mode],handQuery:$('hand-search').value,opponentQuery:$('opponent-search').value,cashUnit:'TABLE_CHIP',from:from?new Date(from+'T00:00:00+03:00').toISOString():undefined,to:to?new Date(Date.parse(to+'T00:00:00+03:00')+86400000).toISOString():undefined});
    document.querySelector('[data-history-tab=search]').classList.toggle('has-query',Boolean($('hand-search').value.trim()||$('opponent-search').value.trim()));
    renderProfitChart(data);
    $('position').value=positionByMode[mode];
    const allPositions=document.createElement('button');
    allPositions.type='button';allPositions.dataset.position='';
    allPositions.className='position-card position-card--all';
    allPositions.textContent='Все позиции';
    allPositions.setAttribute('aria-pressed',String(!positionByMode[mode]));
    $('position-results').replaceChildren(allPositions,...data.positions.map(p=>{
      const b=document.createElement('button');b.type='button';b.dataset.position=p.position;b.className='position-card';b.setAttribute('aria-pressed',String(positionByMode[mode]===p.position));
      const title=document.createElement('strong'),amount=document.createElement('span'),count=document.createElement('small');
      title.textContent=positionLabel(p.position);amount.textContent=signed(value(p))+' '+unit();amount.className=value(p)>0?'positive':value(p)<0?'negative':'';count.textContent=p.count+' раздач'+(p.count&&p.count<100?' · мало данных':'');b.append(title,amount,count);return b;
    }));
    const searching=!!($('hand-search').value.trim() || $('opponent-search').value.trim());
    const allHands = searching || !selected;
    const selectedCell = allHands ? {label:searching?'Найденные раздачи':positionByMode[mode]?'Все руки · '+positionLabel(positionByMode[mode]):'Все руки',count:data.count,resultMinor:data.resultMinor,bb:data.bb,bb100:data.bb100,
      wins:data.cells.reduce((n,c)=>n+c.wins,0),losses:data.cells.reduce((n,c)=>n+c.losses,0),even:data.cells.reduce((n,c)=>n+c.even,0),
      hands:data.cells.flatMap(c=>c.hands).sort((a,b)=>b.playedAt.localeCompare(a.playedAt))} : data.cells.find(c=>c.label===selected);
    $('mode-note').hidden=mode!=='sng';
    $('mode-note').textContent=mode==='cash'?'':
      (mode==='mtt'?'':'SNG · история пока не загружена.');
    async function renderReplay(target,hand){
    let replay;try {target.textContent='Загружаем действия…';replay=await historyRequest('replay',hand.handId);target.textContent='';} catch (_) {target.textContent='Не удалось загрузить действия. Закройте и откройте раздачу, чтобы повторить.';delete target.parentElement.dataset.ready;return;}
    const add=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;target.append(el);return el;};
    if(!replay){add('p','История действий пока не загружена.');return;}
    appendCards(add('p','Ваши карты: ','replay-cards'),replay.cards);
    if(hand.ev?.status==='calculated')add('p','All-in EV: '+signed(hand.ev.resultMinor/hand.bigBlindMinor)+' bb · фактически: '+signed(hand.bb)+' bb. Перебрано исходов: '+number(hand.ev.runouts)+'.','note');
    else if(hand.ev?.status==='unresolved')add('p','All-in EV не рассчитан: '+({betting_after_allin_street:'торговля продолжалась на следующих улицах',missing_final_board:'нет полного борда',side_pot_deduction:'EV после комиссии не определён из-за распределения удержаний по банкам',payout_does_not_reconcile:'выплаты не сходятся с картами и банками',special_runout:'особый порядок раздачи борда'}[hand.ev.reason]||'недостаточно подтверждённых данных')+'.','note');
    if(hand.ev?.grossEv?.status==='calculated'){
      const gross=hand.ev.grossEv;
      add('p','All-in EV до комиссии: '+signed(gross.resultMinor/hand.bigBlindMinor)+' bb · фактический результат до комиссии: '+signed(gross.actualResultMinor/hand.bigBlindMinor)+' bb.','note');
      add('p','Твои вложения: '+number(gross.contributionMinor/100)+' ед · доступные тебе банки: '+number(gross.eligiblePotMinor/100)+' ед. Чужие побочные банки исключены. Этот показатель до комиссии показан отдельно от жёлтой линии.','note');
    }
    if(hand.ev?.validation==='completed_ledger_without_final_board')add('p','EV рассчитан по картам на момент выставления и итоговому учёту взносов и выплат. Полного итогового борда в экспорте нет.','note');
    if(hand.ev?.validation==='uniquely_reconstructed_net_pots')add('p','Чистые суммы побочных банков восстановлены однозначно по выплатам их победителям.','note');
    if(hand.ev?.validation==='split_pot_chip_remainder')add('p','В выплатах учтён остаток фишки при делёжке; equity использует равные доли банка.','note');
    if(hand.ev?.showdownEquity?.status==='calculated'){
      const eq=hand.ev.showdownEquity;
      add('p','Equity при уравнивании выставления: '+number(eq.share*100)+'% · '+({0:'префлоп',3:'флоп',4:'тёрн',5:'ривер'}[eq.boardCards]||'')+' · соперников на итоговом вскрытии: '+eq.opponents+'. Фактический результат: '+signed(hand.bb)+' bb.','note');
      add('p','Доля банка против карт итоговых участников вскрытия, с учётом делёжек. Более поздние решения соперников уже известны; это отдельный ретроспективный показатель.','note');
    }else if(hand.ev?.showdownEquity?.status==='no_hero_allin')add('p','В этой раздаче олл-ин был у соперника; твоего олл-ина в истории нет.','note');
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
    const shown=(replay.shownOpponents||[]).filter(p=>['showdown-winner','showdown-allin'].includes(p.disclosure)&&p.playerId!==String(sample.playerId));
    if(shown.length){add('h4','Вскрытие','street-heading street-river');for(const p of shown)appendCards(add('p',p.actor+' · ','replay-cards'),p.cards);}
    add('p','Ваш результат: '+signed(hand.resultMinor/100)+' '+(mode==='cash'?'ед':'фишек'),'replay-result');
  }
    renderInsights(data,renderReplay);
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    $('metric').textContent=metric==='resultMinor'?'Фишки':metric==='bb100'?'bb/100':'bb';
    $('metric').setAttribute('aria-label','Показатель: '+$('metric').textContent+'. Переключить');
    document.querySelector('.date-picker summary').title='Период · МСК: '+(appliedFrom||'начало')+' — '+(appliedTo||'сегодня');
    $('total-count').textContent=number(data.count);
    const sortedDates=bulk.rows.filter(r=>r.mode===mode).map(r=>r.playedAt).sort();
    const labelDate=d=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow'}).format(new Date(d));
    const first=from?labelDate(from+'T00:00:00+03:00'):sortedDates.length?labelDate(sortedDates[0]):'';
    const last=to?labelDate(to+'T00:00:00+03:00'):sortedDates.length?labelDate(sortedDates[sortedDates.length-1]):'';
    $('period-range').textContent=first&&last?' за период '+first+' — '+last:'';
    $('matrix').replaceChildren(...data.cells.map(c=>{
      const v=value(c),button=document.createElement('button');
      button.type='button';button.className='cell '+(!c.count?'empty':v>0?'profit':v<0?'loss':'');
      if(c.count && Number.isFinite(c.bb) && Math.abs(c.bb)>30)button.classList.add('high-bb');
      button.dataset.hand=c.label;button.setAttribute('aria-pressed',String(c.label===selected));
      button.setAttribute('aria-label',c.label+': '+(c.count?signed(v)+' '+unit()+', раздач '+c.count:'нет данных'));
      const name=document.createElement('b'),amount=document.createElement('small');
      name.textContent=c.label;amount.textContent=compactSigned(v);button.title=c.label+': '+signed(v)+' '+unit();button.append(name,amount);return button;
    }));
    const cell=selectedCell;
    $('detail').innerHTML='<h2 id="detail-title" class="hand-title">'+cell.label+'<span>'+(allHands?'По текущим фильтрам':cell.label.length===2?'Карманная пара':cell.label.endsWith('s')?'Одномастная рука':'Разномастная рука')+'</span></h2>';
    if(!cell.count){
      $('detail').insertAdjacentHTML('beforeend','<div class="empty-state"><strong>Нет подтверждённых раздач</strong>'+(mode!=='sng'?'В загруженной выборке эта рука не встречалась.':'История этого формата пока не загружена.')+' Нет данных — не значит результат 0.</div>');return;
    }
    const visibleHands=cell.hands.filter(h=>h.resultMinor>0?outcomeFilters.positive:h.resultMinor<0?outcomeFilters.negative:outcomeFilters.positive&&outcomeFilters.negative);
    visibleHands.sort((a,b)=>Math.abs(metric==='resultMinor'?b.resultMinor:b.bb)-Math.abs(metric==='resultMinor'?a.resultMinor:a.bb)||Date.parse(b.playedAt)-Date.parse(a.playedAt)||a.handId.localeCompare(b.handId));
    const visibleStats={count:visibleHands.length,wins:0,losses:0,even:0,resultMinor:0,bb:0};
    visibleHands.forEach(h=>{visibleStats.resultMinor+=h.resultMinor;visibleStats.bb+=h.bb;visibleStats[h.resultMinor>0?'wins':h.resultMinor<0?'losses':'even']++;});
    visibleStats.bb100=visibleStats.count?visibleStats.bb*100/visibleStats.count:0;
    const result=document.createElement('p');result.className='big-result '+(value(visibleStats)>0?'positive':value(visibleStats)<0?'negative':'');result.textContent=signed(value(visibleStats))+' '+unit();const header=document.createElement('div');header.className='hand-detail-header';const title=$('detail-title');title.before(header);header.append(title,result);
    const count=document.createElement('p');count.className='note';count.textContent='Раздач: '+visibleStats.count+' · в плюс: '+visibleStats.wins+' · в минус: '+visibleStats.losses+' · в ноль: '+visibleStats.even;$('detail').append(count);
    const filters=document.createElement('div');filters.className='hand-outcome-filters';
    [['positive','Плюсовые'],['negative','Минусовые']].forEach(([key,text])=>{
      const label=document.createElement('label'),input=document.createElement('input');
      input.type='checkbox';input.checked=outcomeFilters[key];input.dataset.outcome=key;
      input.addEventListener('change',()=>{outcomeFilters[key]=input.checked;render();$('detail').querySelector('[data-outcome="'+key+'"]').focus({preventScroll:true});});
      label.append(input,document.createTextNode(text));filters.append(label);
    });const resultGroup=document.createElement('div');resultGroup.className='hand-result-group';header.append(resultGroup);resultGroup.append(result,filters);
    const list=document.createElement('div');list.className='hand-list';
    if(!visibleHands.length){const empty=document.createElement('p');empty.className='note';empty.textContent='Нет раздач по выбранным фильтрам.';list.append(empty);}

    let shownHands=0;
    const moreHands=document.createElement('button');moreHands.type='button';moreHands.className='insight-button';
    function appendHandPage(){
    visibleHands.slice(shownHands,shownHands+30).forEach((h,index)=>{index+=shownHands;
      const row=document.createElement('details');row.className='hand-row replay';
      const summary=document.createElement('summary');summary.className='hand-summary';
      const ordinal=document.createElement('span');ordinal.className='hand-number';ordinal.textContent='#'+(index+1);
      const date=document.createElement('span');date.textContent=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(h.playedAt));
      const amount=document.createElement('strong');amount.textContent=signed(metric==='resultMinor'?h.resultMinor/100:h.bb)+' '+(metric==='resultMinor'?(mode==='cash'?'ед':'фишек'):'bb');
      amount.className=h.resultMinor>0?'positive':h.resultMinor<0?'negative':'';
      const meta=document.createElement('span');meta.className='meta';meta.textContent=positionLabel(h.position)+' · Сессия '+h.sessionId+' · ';appendCards(meta,h.cards);meta.append(' · раздача '+h.handId);
      const arrow=document.createElement('span');arrow.className='hand-arrow';arrow.textContent='⌄';arrow.setAttribute('aria-hidden','true');
      summary.setAttribute('aria-label','Раздача '+(index+1)+', '+h.cards.join(' ')+', '+signed(h.resultMinor/100)+'. Раскрыть историю');
      summary.append(ordinal,date,amount,meta,arrow);row.append(summary);
      row.addEventListener('toggle',()=>{if(!row.open||row.dataset.ready)return;row.dataset.ready='1';const body=row.querySelector('.replay-body')||document.createElement('div');body.className='replay-body';row.append(body);renderReplay(body,h);});
      list.append(row);
    });shownHands+=30;moreHands.hidden=shownHands>=visibleHands.length;moreHands.textContent='Показать ещё · осталось '+Math.max(0,visibleHands.length-shownHands);
    }
    moreHands.onclick=appendHandPage;appendHandPage();$('detail').append(list,moreHands);
  }
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;render();}));
  ['date-from','date-to'].forEach(id=>$(id).addEventListener('change',()=>{
    const from=$('date-from').value,to=$('date-to').value;
    if(from&&to&&from>to){$('date-status').textContent='Дата окончания раньше начала';return;}
    appliedFrom=from;appliedTo=to;render();$('date-status').textContent='';
  }));
  ['hand-search','opponent-search'].forEach(id=>$(id).addEventListener('input',()=>{showHistoryTab('search');render();}));
  document.querySelector('.profit-legend').addEventListener('change',event=>{
    const toggle=event.target.closest('[data-profit-line]');if(!toggle)return;
    render();
  });
  $('position').addEventListener('change',e=>{positionByMode[mode]=e.target.value;render();});
  $('position-results').addEventListener('click',e=>{const b=e.target.closest('[data-position]');if(b){positionByMode[mode]=positionByMode[mode]===b.dataset.position?'':b.dataset.position;render();}});
  $('reset-filters').addEventListener('click',()=>{
    $('hand-search').value='';$('opponent-search').value='';selected=null;render();
    $('hand-search').focus();
  });
  $('metric').addEventListener('click',()=>{const units=['bb','resultMinor','bb100'];metric=units[(units.indexOf(metric)+1)%units.length];render();});
  $('date-close').addEventListener('click',()=>{if($('date-status').textContent)return;document.querySelector('.date-picker').open=false;document.querySelector('.date-picker summary').focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.date-picker').open=false;}});
  $('matrix').addEventListener('click',e=>{const b=e.target.closest('[data-hand]');if(b){const hand=b.dataset.hand;selected=selected===hand?null:hand;render();$('matrix').querySelector('[data-hand="'+hand+'"]').focus({preventScroll:true});}});
  render();
}
