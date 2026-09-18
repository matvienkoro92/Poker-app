let requestNumber=0;
const waiting=new Map();
let activeHistoryPlayerId='',activeHistoryVersion='',versionCheckPending=false;
function historyRequest(action,handId,extra){return new Promise((resolve,reject)=>{
 const id=++requestNumber;
 const timer=setTimeout(()=>{waiting.delete(id);reject(new Error('timeout'));},20000);
 waiting.set(id,{resolve,reject,timer});
 parent.postMessage(Object.assign({type:'starting-hands-request',id,action,handId,handIds:Array.isArray(handId)?handId:undefined},extra||{}),location.origin);
});}
window.addEventListener('message',async event=>{
 if(event.source!==parent||event.origin!==location.origin)return;
 if(event.data?.type==='starting-hands-resume'){
  if(versionCheckPending||!activeHistoryPlayerId)return;
  versionCheckPending=true;
  try{const latest=await historyRequest('version');if(String(latest.playerId||'')!==activeHistoryPlayerId||String(latest.version||'')!==activeHistoryVersion)location.reload();}
  catch(_){}finally{versionCheckPending=false;}
  return;
 }
 if(event.data?.type!=='starting-hands-response')return;
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
  activeHistoryPlayerId=String(payload.playerId||'');activeHistoryVersion=String(payload.version||'');
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
  function moscowDateValue(value){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(value);
    const part=type=>parts.find(p=>p.type===type).value;
    return part('year')+'-'+part('month')+'-'+part('day');
  }
  function resetDateRange(){
    appliedTo=moscowDateValue(new Date());
    const first=bulk.rows.map(row=>Date.parse(row.playedAt)).filter(Number.isFinite).sort((a,b)=>a-b)[0];
    appliedFrom=first==null?appliedTo:moscowDateValue(new Date(first));
    $('date-from').value=appliedFrom;$('date-to').value=appliedTo;
    $('date-status').textContent='';
  }
  const number = n => new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n);
  const signed = n => n == null ? '—' : (n > 0 ? '+' : '') + number(n);
  const compactSigned = n => {
    if(n == null)return '—';
    const abs=Math.abs(n),divisor=abs>=1e6?1e6:abs>=1e3?1e3:1;
    return (n>0?'+':n<0?'−':'')+new Intl.NumberFormat('ru-RU',{maximumFractionDigits:divisor===1?1:1}).format(abs/divisor)+(divisor===1e6?'м':divisor===1e3?'к':'');
  };
  const sample = {playerId:payload.playerId};
  const bulk = {rows:payload.rows};
  let stackBand='',stackLoadPromise=null,stacksLoaded=false;
  resetDateRange();
  async function ensureMttStacks(){
    if(stacksLoaded)return;
    if(stackLoadPromise)return stackLoadPromise;
    const missing=bulk.rows.filter(row=>row.mode==='mtt'&&!Number.isSafeInteger(row.startingStackMinor));
    if(!missing.length){stacksLoaded=true;return;}
    const select=$('stack-filter'),status=$('stack-status');select.disabled=true;
    stackLoadPromise=(async()=>{
      let loaded=0;
      try{
        for(let offset=0;offset<missing.length;offset+=100){
          status.textContent='Загружаем стеки: '+loaded+' / '+missing.length;
          const chunk=missing.slice(offset,offset+100),response=await historyRequest('stacks',chunk.map(row=>row.handId));
          for(const row of chunk){const value=response.stacks?.[row.handId];if(Number.isSafeInteger(value)&&value>=0)row.startingStackMinor=value;}
          loaded+=chunk.length;
        }
        stacksLoaded=true;status.textContent='';
      }catch(_){status.textContent='Не удалось загрузить часть стеков';}
      finally{select.disabled=false;stackLoadPromise=null;render();}
    })();
    return stackLoadPromise;
  }
  function appendCards(target,cards){
    cards.forEach(card=>{const el=document.createElement('span');el.className='playing-card suit-'+card[1];el.textContent=(card[0]==='T'?'10':card[0])+({s:'♠',h:'♥',d:'♦',c:'♣'}[card[1]]);target.append(el);});
  }
  function unit() {return metric === 'resultMinor' ? (mode === 'cash' ? '₽' : 'фишек') : 'bb';}
  function value(c) {return metric === 'resultMinor' ? c.resultMinor == null ? null : c.resultMinor/100 : c[metric];}
  function appendEvSummary(summary,hand){
    if(hand.ev?.status!=='calculated')return;
    const chips=metric==='resultMinor',divisor=chips?100:hand.bigBlindMinor,label=chips?(mode==='cash'?'₽':'фишек'):'bb';
    const note=document.createElement('span');note.className='hand-ev-summary';
    note.textContent='All-in EV: '+signed(hand.ev.resultMinor/divisor)+' '+label+' · фактически: '+signed(hand.resultMinor/divisor)+' '+label+'.';
    const runs=document.createElement('span');runs.textContent='Перебрано исходов: '+number(hand.ev.runouts)+'.';
    note.append(document.createElement('br'),runs);summary.append(note);
  }
  const replayCache=new Map();
  async function captureHandCard(row,options){
    const box=row.getBoundingClientRect(),clone=row.cloneNode(true),originals=[row,...row.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
    originals.forEach((original,index)=>{const style=getComputedStyle(original),copy=copies[index];for(const key of style)copy.style.setProperty(key,style.getPropertyValue(key));copy.style.animation='none';copy.style.transition='none';});
    clone.querySelector('.hand-summary')?.remove();clone.open=true;clone.style.margin='0';clone.style.width=box.width+'px';clone.style.height='auto';
    if(options?.showShowdown===false)clone.querySelectorAll('.replay-showdown,.replay-result').forEach(el=>el.remove());
    const wrapper=document.createElement('div');wrapper.setAttribute('xmlns','http://www.w3.org/1999/xhtml');wrapper.style.cssText='width:'+box.width+'px;background:#050816;padding:14px;box-sizing:content-box';wrapper.append(clone);document.body.append(wrapper);wrapper.style.position='fixed';wrapper.style.left='-10000px';wrapper.style.top='0';
    const width=box.width+28,height=wrapper.getBoundingClientRect().height;wrapper.style.position='static';wrapper.style.left='0';wrapper.style.top='0';wrapper.remove();
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'"><foreignObject width="100%" height="100%">'+new XMLSerializer().serializeToString(wrapper)+'</foreignObject></svg>';
    const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
    const canvas=document.createElement('canvas'),scale=2;canvas.width=Math.ceil(width*scale);canvas.height=Math.ceil(height*scale);const ctx=canvas.getContext('2d');ctx.scale(scale,scale);ctx.drawImage(image,0,0);
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('image')),'image/png'));
  }
  function showHandShareDialog(blob,hand){
    const url=URL.createObjectURL(blob),dialog=document.createElement('dialog');dialog.className='hand-share-dialog';
    dialog.innerHTML='<button type="button" data-close aria-label="Закрыть">×</button><h2>Поделиться раздачей</h2><img alt="Карточка раздачи"><div><button type="button" data-send>Поделиться картинкой</button><a data-save>Скачать PNG</a></div><p role="status"></p>';
    dialog.querySelector('img').src=url;const save=dialog.querySelector('[data-save]');save.href=url;save.download='poker-hand-'+hand.handId+'.png';
    const file=new File([blob],'poker-hand-'+hand.handId+'.png',{type:'image/png'}),send=dialog.querySelector('[data-send]'),canShare=!!(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]}));
    if(!canShare){send.hidden=true;dialog.querySelector('p').textContent='Скачайте картинку и прикрепите её к сообщению.';}
    send.onclick=async()=>{send.disabled=true;try{await navigator.share({files:[file]});}catch(error){if(error?.name!=='AbortError')dialog.querySelector('p').textContent='Не удалось отправить. Скачайте PNG и прикрепите его к сообщению.';}finally{send.disabled=false;}};
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{URL.revokeObjectURL(url);dialog.remove();},{once:true});document.body.append(dialog);dialog.showModal();
  }
  function blobDataUrl(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||''));reader.onerror=()=>reject(new Error('image'));reader.readAsDataURL(blob);});}
  function requestId(){const bytes=new Uint8Array(12);crypto.getRandomValues(bytes);return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');}
  function publicationOptions(button){
    return new Promise(resolve=>{
      const dialog=document.createElement('dialog');dialog.className='hand-share-dialog hand-publish-dialog';
      dialog.innerHTML='<form><h2>Опубликовать раздачу?</h2><p>Опубликовать в раздел «Мои раздачи» на разбор для игроков клуба?</p><label class="hand-publish-toggle"><input type="checkbox" name="showShowdown" checked> Показать вскрытие и результат</label><label class="hand-publish-comment">Комментарий (необязательно)<textarea name="comment" maxlength="3000" rows="4" placeholder="Что хотите обсудить в этой раздаче?"></textarea></label><div><button type="button" data-cancel>Отмена</button><button type="submit">Опубликовать</button></div></form>';
      const draft=button._publishDraft;
      if(draft){dialog.querySelector('input').checked=draft.showShowdown;dialog.querySelector('textarea').value=draft.comment;}
      let result=null;
      dialog.querySelector('form').onsubmit=event=>{event.preventDefault();result={showShowdown:dialog.querySelector('input').checked,comment:dialog.querySelector('textarea').value.trim()};button._publishDraft=result;dialog.close();};
      dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();
      dialog.addEventListener('close',()=>{dialog.remove();resolve(result);},{once:true});
      document.body.append(dialog);dialog.showModal();
    });
  }
  function showPublicationSuccess(reviewId){
    const dialog=document.createElement('dialog');dialog.className='hand-share-dialog hand-publish-dialog hand-publish-success';
    dialog.innerHTML='<h2>Ваша раздача опубликована</h2><div><button type="button" data-close>Закрыть</button><button type="button" data-open>Перейти в раздел</button></div>';
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();
    dialog.querySelector('[data-open]').onclick=()=>{window.parent.postMessage({type:'starting-hands-open-review',id:reviewId||''},window.location.origin);dialog.close();};
    dialog.addEventListener('close',()=>dialog.remove(),{once:true});document.body.append(dialog);dialog.showModal();
  }
  async function publishHand(button,hand,row,renderReplay){
    if(button.disabled)return;
    button.disabled=true;
    const options=await publicationOptions(button);
    if(!options){button.disabled=false;return;}
    const original=button.textContent;button.disabled=true;button.textContent='Публикуем…';
    try{
      let replay=replayCache.get(hand.handId);if(!replay){replay=await historyRequest('replay',hand.handId);replayCache.set(hand.handId,replay);}
      let body=row.querySelector('.replay-body');if(body?.dataset.shareReady!=='1'){row.dataset.ready='1';body=body||document.createElement('div');body.className='replay-body';if(!body.isConnected)row.append(body);await renderReplay(body,hand);}
      row.open=true;
      const image=await blobDataUrl(await captureHandCard(row,options));
      if(image.length>450000)throw new Error('image-too-large');
      const cards=(replay.cards||hand.cards||[]).map(card=>window.PokerHandShare.card(card)).join(' ');
      const result=signed(hand.resultMinor/100)+' '+(mode==='cash'?'₽':'фишек');
      const response=await historyRequest('review-publish',hand.handId,{requestId:button._publishRequestId||(button._publishRequestId=requestId()),cards:replay.cards||hand.cards||[],title:'Раздача '+cards+(options.showShowdown?' · '+result:''),question:options.comment||'Как бы вы сыграли эту раздачу?',context:window.PokerHandShare.text(Object.assign({mode},hand),replay,options),hideShowdown:options.showShowdown===false,image});
      button.textContent='Опубликовано';button.dataset.published='1';
      if(response?.id)button.dataset.reviewId=response.id;
      showPublicationSuccess(response?.id);
    }catch(error){button.textContent='Не удалось';await new Promise(resolve=>setTimeout(resolve,1400));button.textContent=original;button.disabled=false;return;}
    button.disabled=true;
  }
  async function shareHand(button,hand,row,renderReplay){
    const original=button.textContent;button.disabled=true;button.textContent='Готовим…';
    try{
      let replay=replayCache.get(hand.handId);if(!replay){replay=await historyRequest('replay',hand.handId);replayCache.set(hand.handId,replay);}
      let body=row.querySelector('.replay-body');if(body?.dataset.shareReady!=='1'){row.dataset.ready='1';body=body||document.createElement('div');body.className='replay-body';if(!body.isConnected)row.append(body);await renderReplay(body,hand);}row.open=true;const blob=await captureHandCard(row);showHandShareDialog(blob,hand);
    }catch(error){if(error?.name!=='AbortError'){if(typeof console!=='undefined'&&console.warn)console.warn('hand share image',error);button.textContent='Не удалось';await new Promise(resolve=>setTimeout(resolve,1200));}}
    finally{button.disabled=false;button.textContent=original;}
  }
  function createHandCard(h,index,renderReplay){
      const row=document.createElement('details');row.className='hand-row replay';
      const summary=document.createElement('summary');summary.className='hand-summary';
      const ordinal=document.createElement('span');ordinal.className='hand-number';ordinal.textContent='#'+(index+1);
      const dateWrap=document.createElement('span'),date=document.createElement('span'),publish=document.createElement('button');dateWrap.className='hand-date-actions';date.className='hand-date';date.textContent=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(h.playedAt));publish.type='button';publish.className='hand-publish-button';publish.textContent='Опубликовать';publish.onclick=event=>{event.preventDefault();event.stopPropagation();publishHand(publish,h,row,renderReplay);};dateWrap.append(date,publish);
      const amount=document.createElement('strong');amount.textContent=signed(metric==='resultMinor'?h.resultMinor/100:h.bb)+' '+(metric==='resultMinor'?(mode==='cash'?'₽':'фишек'):'bb');
      amount.className=h.resultMinor>0?'positive':h.resultMinor<0?'negative':'';
      const meta=document.createElement('span');meta.className='meta';meta.textContent=positionLabel(h.position)+' · Сессия '+h.sessionId+' · ';appendCards(meta,h.cards);meta.append(' · Большой блайнд: '+number(h.bigBlindMinor/100)+' '+(mode==='cash'?'₽':'фишек')+' · раздача '+h.handId);
      const arrow=document.createElement('span');arrow.className='hand-arrow';arrow.textContent='⌄';arrow.setAttribute('aria-hidden','true');
      summary.setAttribute('aria-label','Раздача '+(index+1)+', '+h.cards.join(' ')+', '+signed(h.resultMinor/100)+'. Раскрыть историю');
      const actions=document.createElement('span'),share=document.createElement('button');actions.className='hand-card-actions';share.type='button';share.className='hand-share-button';share.textContent='↗';share.title='Поделиться';share.setAttribute('aria-label','Поделиться раздачей '+h.handId);share.onclick=event=>{event.preventDefault();event.stopPropagation();shareHand(share,h,row,renderReplay);};actions.append(share);
      summary.append(ordinal,dateWrap,amount,meta,actions,arrow);appendEvSummary(summary,h);row.append(summary);
      row.addEventListener('toggle',()=>{if(!row.open||row.dataset.ready)return;row.dataset.ready='1';const body=row.querySelector('.replay-body')||document.createElement('div');body.className='replay-body';row.append(body);renderReplay(body,h);});
    return row;
  }
  function renderProfitChart(data) {
    const graphUnit=metric==='resultMinor'?'resultMinor':'bb',label=graphUnit==='bb'?'bb':mode==='cash'?'₽':'фишек';
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
    const endpointFont=28,lastPoint=series.points.at(-1);
    const measure=document.createElementNS('http://www.w3.org/2000/svg','text');
    measure.setAttribute('font-size',endpointFont);measure.setAttribute('font-weight','700');svg.append(measure);
    const endpointWidth=Math.max(0,...lines.map(([key])=>{measure.textContent=signed(lastPoint[key])+' '+label;return measure.getComputedTextLength();}));measure.remove();
    const plotLeft=110,plotRight=Math.min(680,900-endpointWidth-130),plotWidth=plotRight-plotLeft,plotTop=(900-plotWidth-90)/2,plotBottom=plotTop+plotWidth;
    const x=i=>plotLeft+i/Math.max(1,data.count)*plotWidth,y=v=>plotBottom-(v-low)/(high-low)*plotWidth;
    function node(tag,attrs,text){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!=null)el.textContent=text;svg.append(el);return el;}
    const ticks=Array.from({length:5},(_,i)=>low+(high-low)*i/4).filter(v=>Math.abs(v)>(high-low)*.055);ticks.push(0);ticks.sort((a,b)=>a-b);
    for(const v of ticks){node('line',{x1:plotLeft,x2:plotRight,y1:y(v),y2:y(v),stroke:'#273449'});for(const [side,axisX,anchor] of [['left',plotLeft-10,'end'],['right',plotRight+10,'start']])node('text',{'data-profit-axis':side,x:axisX,y:y(v)+4,'text-anchor':anchor,fill:v===0?'#e4eaf1':'#e8bc68',stroke:'#0b1220','stroke-width':6,'paint-order':'stroke','font-size':axisFont,'font-weight':v===0?600:400},compactSigned(v));}
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
      const last=series.points.at(-1),font=endpointFont,gap=38;
      const endpoints=lines.filter(([key])=>document.querySelector('[data-profit-line="'+key+'"]').checked)
        .map(([key,color])=>({key,color,value:last[key],endY:y(last[key])})).sort((a,b)=>a.endY-b.endY);
      endpoints.forEach((p,i)=>{p.labelY=Math.max(plotTop+gap/2,p.endY,i?endpoints[i-1].labelY+gap:0);});
      if(endpoints.length){
        endpoints.at(-1).labelY=Math.min(plotBottom-gap/2,endpoints.at(-1).labelY);
        for(let i=endpoints.length-2;i>=0;i--)endpoints[i].labelY=Math.min(endpoints[i].labelY,endpoints[i+1].labelY-gap);
      }
      for(const p of endpoints){
        node('path',{d:'M'+plotRight+','+p.endY+' L'+(plotRight+10)+','+p.labelY+' H'+(plotRight+105),fill:'none',stroke:p.color,'stroke-width':1.5,'vector-effect':'non-scaling-stroke'});
        node('circle',{cx:plotRight,cy:p.endY,r:4,fill:p.color});
        node('text',{'data-profit-endpoint':p.key,x:plotRight+115,y:p.labelY,'dominant-baseline':'middle','text-anchor':'start',fill:p.color,'font-size':font,'font-weight':700,stroke:'#0b1220','stroke-width':7,'stroke-linejoin':'round','paint-order':'stroke'},signed(p.value)+' '+label);
      }
    }
    svg.querySelectorAll('[data-profit-axis]').forEach(tick=>svg.append(tick));
    const describe=p=>'Раздач: '+p.count+' · Общий: '+signed(p.total)+' '+label+(' · Со вскрытием: '+signed(p.showdown)+' · Без вскрытия: '+signed(p.nonShowdown)+(series.unknown?' · Не классифицировано: '+signed(p.total-p.showdown-p.nonShowdown):''))+(series.evCalculated?' · All-in EV: '+signed(p.allinEv)+' '+label:'');
    $('profit-values').textContent=data.count?describe(series.points.at(-1)):'Нет раздач по выбранным фильтрам';
    svg.onpointermove=e=>{const box=svg.getBoundingClientRect(),n=Math.max(0,Math.min(data.count,Math.round(((e.clientX-box.left)/box.width*900-plotLeft)/plotWidth*data.count)));$('profit-values').textContent=describe(series.points[n]);};
    svg.onpointerleave=()=>{$('profit-values').textContent=data.count?describe(series.points.at(-1)):'Нет раздач по выбранным фильтрам';};
  }
  const insightCacheKey='poker-hand-insights:'+payload.playerId;
  const insightSignals={};let insightsLoading=false,insightsError='';
  // Keep small derived action flags across iframe recreation; never reuse another
  // player's history or an older import's version.
  if(payload.version)try{
    const saved=JSON.parse(sessionStorage.getItem(insightCacheKey)||'null');
    if(saved?.version===payload.version&&saved.schema===2&&saved.signals&&typeof saved.signals==='object')Object.assign(insightSignals,saved.signals);
  }catch(_){}
  function saveInsightSignals(){
    if(payload.version)try{sessionStorage.setItem(insightCacheKey,JSON.stringify({schema:2,version:payload.version,signals:insightSignals}));}catch(_){}
  }
  function renderInsights(data,renderReplay){
    const root=$('hand-insights');root.replaceChildren();
    const reviewMetric=metric==='resultMinor'?'resultMinor':'bb',reviewUnit=reviewMetric==='resultMinor'?(mode==='cash'?'₽':'фишек'):'bb';
    const amount=h=>reviewMetric==='resultMinor'?h.resultMinor/100:h.bb;
    const hands=data.cells.flatMap(c=>c.hands),stats=window.PokerHandInsights.summarize(hands,insightSignals,reviewMetric);
    const add=(parent,tag,text,cls)=>{const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;parent.append(el);return el;};
    add(root,'h2','Разбор игры');
    if(!hands.length){add(root,'p','Нет раздач по выбранным фильтрам.','note');return;}
    const missing=hands.filter(h=>!Object.prototype.hasOwnProperty.call(insightSignals,h.handId));
    const load=add(root,'button',insightsLoading?'Загружаю историю действий…':'Загрузить действия для вскрытий и подборок','insight-button insight-button--loading');load.type='button';load.hidden=!missing.length;load.disabled=insightsLoading;
    if(insightsError)add(root,'p',insightsError,'note');
    function handList(parent,rows,showEv=false){
      if(!rows.length){add(parent,'p','Подходящих раздач нет.','note');return;}
      let shown=0;const more=add(parent,'button','Показать ещё','insight-button');more.type='button';
      function next(){for(const [offset,h] of rows.slice(shown,shown+30).entries()){
        const d=createHandCard(h,shown+offset,renderReplay);parent.insertBefore(d,more);
        if(showEv){
          const evAmount=reviewMetric==='resultMinor'?h.ev.resultMinor/100:h.ev.resultMinor/h.bigBlindMinor;
          const delta=amount(h)-evAmount;
          add(d,'p','Факт: '+signed(amount(h))+' '+reviewUnit+' · EV: '+signed(evAmount)+' '+reviewUnit+' · '+(delta<0?'Недобор: ':'Перебор: ')+number(Math.abs(delta))+' '+reviewUnit,delta<0?'negative':'positive');
        }
      }shown+=30;more.hidden=shown>=rows.length;}
      more.onclick=next;next();
    }
    const topTabs=add(root,'div',null,'insight-top-tabs');topTabs.setAttribute('role','tablist');topTabs.setAttribute('aria-label','Крупнейшие результаты');
    const topPanel=add(root,'div',null,'insight-top-panel');topPanel.hidden=true;topPanel.setAttribute('role','tabpanel');
    [['wins','Крупнейшие выигрыши',stats.wins],['losses','Крупнейшие проигрыши',stats.losses]].forEach(([key,title,rows])=>{
      const tab=add(topTabs,'button',title+' · '+rows.length);tab.type='button';tab.dataset.insightTop=key;tab.setAttribute('role','tab');tab.setAttribute('aria-selected','false');
      tab.onclick=()=>{const closing=tab.getAttribute('aria-selected')==='true';topTabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-selected','false'));topPanel.replaceChildren();if(closing){topPanel.hidden=true;return;}tab.setAttribute('aria-selected','true');topPanel.hidden=false;handList(topPanel,rows);};
    });
    const pokerStats=add(root,'section',null,'insight-card');add(pokerStats,'h3','Основные показатели');
    const statsGrid=add(pokerStats,'div',null,'poker-stats-grid');
    for(const [key,title,description] of [
      ['vpip','VPIP','Добровольно вложил фишки на префлопе'],['pfr','PFR','Сделал рейз на префлопе'],
      ['threeBet','3-бет','Переставил первый рейз'],['foldThreeBet','Фолд на 3-бет','Сбросил после 3-бета на свой первый рейз'],
      ['cbet','Контбет флопа','Поставил на флопе как последний префлоп-агрессор, когда до него не было ставки'],
      ['foldCbet','Фолд на контбет','Сбросил на контбет флопа без промежуточного рейза'],
      ['wwsf','WWSF','Закончил в плюс, увидев флоп'],
      ['wtsd','WTSD','Дошёл до вскрытия после просмотра флопа']]){
      const stat=stats.betting[key],cell=add(statsGrid,'div',null,'poker-stat');
      add(cell,'strong',title);add(cell,'span',stat.total?number(stat.count/stat.total*100)+'%':'—');
      add(cell,'small',stat.count+' / '+stat.total+' · '+description);
    }
    add(pokerStats,'small','По текущим фильтрам. Под процентом — срабатывания / подходящие ситуации. Неоднозначные олл-ины исключены из показателей рейзов и контбетов; в VPIP учитываются.');
    const cards=add(root,'div',null,'insight-grid');
    const showdown=add(cards,'div',null,'insight-card');add(showdown,'h3','Вскрытия');
    const sd=stats.showdown;
    add(showdown,'p',sd.eligible?'Дошёл до вскрытия: '+number(sd.count/sd.eligible*100)+'% · '+sd.count+' из '+sd.eligible+' раздач с флопом':'Дошёл до вскрытия: —');
    add(showdown,'p',sd.count?'Вскрытия в плюс: '+number(sd.profitable/sd.count*100)+'% · '+sd.profitable+' из '+sd.count:'Вскрытия в плюс: —');
    add(showdown,'small',sd.loaded===0&&sd.total?'Загружаем историю действий для расчёта вскрытий…':'Учтена история действий: '+sd.loaded+' из '+sd.total+' раздач.');
    const ns=stats.withoutShowdown;
    if(sd.loaded){
      const section=add(cards,'details',null,'insight-card');
      const caption=add(section,'summary','После флопа без вскрытия · '+ns.count);
      const percent=n=>ns.count?number(n/ns.count*100)+'%':'—';
      add(caption,'span','В плюс: '+ns.wins+' ('+percent(ns.wins)+') · в минус: '+ns.losses+' ('+percent(ns.losses)+') · в ноль: '+ns.even,'nonshowdown-outcome');
      add(caption,'span','Выиграно: '+signed(amount(ns.won))+' '+reviewUnit+' · проиграно: '+signed(amount(ns.lost))+' '+reviewUnit,'nonshowdown-outcome');
      add(caption,'span','Общий результат: '+signed(value(ns))+' '+unit(),'nonshowdown-outcome '+(value(ns)>0?'positive':value(ns)<0?'negative':''));
      add(caption,'small','Только раздачи, где ты увидел флоп. Неопределённые вскрытия исключены.');
      section.addEventListener('toggle',()=>{if(section.open&&!section.dataset.ready){section.dataset.ready='1';handList(section,ns.hands);}});
    }
    load.onclick=async()=>{
      if(insightsLoading)return;
      insightsLoading=true;insightsError='';load.disabled=true;
      try{for(let i=0;i<missing.length;i+=100){load.textContent='Загружаю действия: '+i+' / '+missing.length;const response=await historyRequest('insights',missing.slice(i,i+100).map(h=>h.handId));Object.assign(insightSignals,response.signals);if(response.version===payload.version)saveInsightSignals();}}
      catch(_){insightsError='Не удалось загрузить все действия. Уже загруженные учтены; можно повторить.';}
      finally{insightsLoading=false;render();}
    };
    if(missing.length&&!insightsLoading&&!insightsError&&!root.hidden)queueMicrotask(()=>{if(load.isConnected&&!insightsLoading)load.click();});
    const collections=add(root,'div',null,'insight-collections');add(collections,'h3','Подборки для разбора');
    for(const [key,title] of [['riverLoss','Заколлировал ривер и проиграл'],['threeBet','Сделал 3-бет'],['foldRaise','Выбросил на рейз'],['bigLoss','Проиграл больше 30 bb'],['evBelow','🔴 Недобор от EV · от 10 bb'],['evAbove','🟢 Перебор EV · от 10 bb']]){
      const rows=stats.collections[key],d=add(collections,'details',null,'insight-section');add(d,'summary',title+' · '+rows.length,key==='evBelow'?'negative':key==='evAbove'?'positive':undefined);handList(d,rows,key==='evBelow'||key==='evAbove');
    }
    add(collections,'p','Подборки EV учитывают только раздачи с рассчитанным денежным EV; сначала показаны наибольшие отклонения. Подборки по действиям учитывают загруженные истории. 3-бет — второй префлоп-рейз; неоднозначные олл-ины исключены.','note');
    for(const [title,groups,key] of [['По сессиям',stats.sessions,'sessionId'],[mode==='cash'?'По ставкам большого блайнда':'По уровням блайндов',stats.limits,'bigBlindMinor']]){
      const section=add(root,'details',null,'insight-section');add(section,'summary',title+' · '+groups.length);
      if(key==='bigBlindMinor'&&mode!=='cash')add(section,'p','В турнирах это уровни большого блайнда, а не бай-ины.','note');
      for(const g of groups.sort((a,b)=>key==='bigBlindMinor'?Number(a.key)-Number(b.key):value(b)-value(a))){
        const d=add(section,'details',null,'insight-section');
        add(d,'summary',(key==='sessionId'?'Сессия '+g.key:'Большой блайнд: '+number(Number(g.key)/100)+' '+(mode==='cash'?'₽':'фишек'))+' · '+g.count+' раздач · '+signed(value(g))+' '+unit()+' · '+signed(g.bb100)+' bb/100');
        // Materialize long session lists only when opened.
        d.addEventListener('toggle',()=>{if(d.open&&!d.dataset.ready){d.dataset.ready='1';handList(d,hands.filter(h=>String(h[key])===g.key).sort((a,b)=>b.playedAt.localeCompare(a.playedAt)));}});
      }
    }
  }

  function render() {
    if(mode==='mtt')metric='bb';
    const from=appliedFrom,to=appliedTo;
    if(from&&to&&from>to)return;
    const data = core.aggregate(bulk.rows,{playerId:sample.playerId,mode,position:positionByMode[mode],stackBand:mode==='mtt'?stackBand:'',handQuery:$('hand-search').value,opponentQuery:$('opponent-search').value,cashUnit:'TABLE_CHIP',from:from?new Date(from+'T00:00:00+03:00').toISOString():undefined,to:to?new Date(Date.parse(to+'T00:00:00+03:00')+86400000).toISOString():undefined});
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
    let replay;try {target.textContent='Загружаем действия…';replay=replayCache.get(hand.handId)||await historyRequest('replay',hand.handId);replayCache.set(hand.handId,replay);target.textContent='';} catch (_) {target.textContent='Не удалось загрузить действия. Закройте и откройте раздачу, чтобы повторить.';delete target.parentElement.dataset.ready;return;}
    const add=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;target.append(el);return el;};
    if(!replay){add('p','История действий пока не загружена.');target.dataset.shareReady='1';return;}
    appendCards(add('h4','Префлоп · ','replay-cards street-heading street-preflop'),replay.cards);
    let roundActors=new Set();
    let lastBoardLength=0;
    let currentPot=0;
    const replayInBb=metric==='bb';
    const bigBlind=hand.bigBlindMinor/100;
    const replayAmount=amount=>number(replayInBb?Number(amount)/bigBlind:Number(amount));
    const potUnit=replayInBb?'bb':mode==='cash'?'₽':'фишек';
    const potLabel=()=>replayAmount(currentPot);
    const contributionCodes=new Set(['2','3','5','18','19','20']);
    const labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
    const unknown=[];
    for(const event of replay.events){
      if(event.board.length){
        lastBoardLength=Math.max(lastBoardLength,event.board.length);roundActors.clear();
        const streetName=({3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд');
        const street=add('h4','','replay-board street-heading street-'+({3:'flop',4:'turn',5:'river'}[event.board.length]||'board'));
        const board=document.createElement('span'),pot=document.createElement('span');
        board.className='street-board-cards';board.textContent=streetName+' · ';appendCards(board,event.board);
        pot.className='street-pot';pot.textContent='· Банк: '+potLabel()+' '+potUnit;
        street.append(board,pot);continue;
      }
      if(['92','93'].includes(event.code)){if(event.code==='92'&&event.amount){currentPot+=Number(event.amount)||0;add('p','Параметр обязательных взносов: '+replayAmount(event.amount)+' '+potUnit,'note');}continue;}
      if(!labels[event.code]){unknown.push(event);continue;}
      const label=labels[event.code];
      const decision=!['18','19'].includes(event.code);
      let newRound=false;
      if(decision){if(roundActors.has(event.actorId)){newRound=true;roundActors.clear();}roundActors.add(event.actorId);}
      const action=add('p',event.actor+' · '+label+(event.amount?' · '+replayAmount(event.amount)+(replayInBb?' bb':''):''),event.actor==='Вы'?'replay-hero':'replay-action');
      if(contributionCodes.has(event.code)&&event.amount)currentPot+=Number(event.amount)||0;
      if(event.code==='10')action.classList.add('replay-fold');
      if(newRound)action.classList.add('replay-round-start');
    }
    if(hand.showdown&&lastBoardLength===4){const street=add('h4','','replay-board street-heading street-river'),board=document.createElement('span'),pot=document.createElement('span');board.className='street-board-cards';board.textContent='Ривер · нет карты';pot.className='street-pot';pot.textContent='· Банк: '+potLabel()+' '+potUnit;street.append(board,pot);}
    if(unknown.length){const more=document.createElement('details'),caption=document.createElement('summary');caption.textContent='Нераспознанные записи отчёта ('+unknown.length+')';more.append(caption);for(const event of unknown){const line=document.createElement('p');line.textContent=event.actor+' · код '+event.code+(event.amount?' · '+replayAmount(event.amount)+(replayInBb?' bb':''):'');more.append(line);}target.append(more);}
    const shown=(replay.shownOpponents||[]).filter(p=>['showdown-winner','showdown-allin'].includes(p.disclosure)&&p.playerId!==String(sample.playerId));
    if(shown.length){add('h4','Вскрытие','street-heading street-river replay-showdown');for(const p of shown)appendCards(add('p',p.actor+' · ','replay-cards replay-showdown'),p.cards);}
    add('p','Ваш результат: '+signed(replayInBb?hand.bb:hand.resultMinor/100)+' '+potUnit,'replay-result');target.dataset.shareReady='1';
  }
    renderInsights(data,renderReplay);
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    $('stack-filter-wrap').hidden=mode!=='mtt';
    $('stack-filter').value=stackBand;
    $('metric').textContent=metric==='resultMinor'?(mode==='cash'?'Рубли':'Фишки'):'bb';
    $('metric').disabled=mode==='mtt';
    $('metric').setAttribute('aria-label',mode==='mtt'?'Показатель MTT: только bb':'Показатель: '+$('metric').textContent+'. Переключить');
    document.querySelector('.date-picker summary').title='Период · МСК: '+(appliedFrom||'начало')+' — '+(appliedTo||'сегодня');
    const compactDate=value=>value?value.slice(8,10)+'.'+value.slice(5,7):'—';
    $('date-summary-text').textContent=compactDate(appliedFrom)+'–'+compactDate(appliedTo);
    $('total-count').textContent=number(data.count);
    const sortedDates=bulk.rows.filter(r=>r.mode===mode).map(r=>r.playedAt).sort();
    const labelDate=d=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow'}).format(new Date(d));
    const first=from?labelDate(from+'T00:00:00+03:00'):sortedDates.length?labelDate(sortedDates[0]):'';
    const last=to?labelDate(to+'T00:00:00+03:00'):sortedDates.length?labelDate(sortedDates[sortedDates.length-1]):'';
    $('period-range').textContent=first&&last?' за период '+first+' — '+last:'';
    $('matrix').replaceChildren(...data.cells.map(c=>{
      const v=value(c),button=document.createElement('button'),neutralLimit=metric==='resultMinor'?100:3;
      const neutral=c.count&&Number.isFinite(v)&&Math.abs(v)<neutralLimit;
      button.type='button';button.className='cell '+(!c.count?'empty':neutral?'neutral':v>0?'profit':v<0?'loss':'');
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
    const count=document.createElement('p');count.className='note hand-count-summary';count.textContent='Раздач: '+visibleStats.count+' · в плюс: '+visibleStats.wins+' · в минус: '+visibleStats.losses+' · в ноль: '+visibleStats.even;$('detail').append(count);
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
      const row=createHandCard(h,index,renderReplay);
      list.append(row);
    });shownHands+=30;moreHands.hidden=shownHands>=visibleHands.length;moreHands.textContent='Показать ещё · осталось '+Math.max(0,visibleHands.length-shownHands);
    }
    moreHands.onclick=appendHandPage;appendHandPage();$('detail').append(list,moreHands);
  }
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;if(mode==='mtt')metric='bb';render();if(mode==='mtt')ensureMttStacks();}));
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
  $('stack-filter').addEventListener('change',e=>{stackBand=e.target.value;selected=null;render();});
  $('position-results').addEventListener('click',e=>{const b=e.target.closest('[data-position]');if(b){positionByMode[mode]=positionByMode[mode]===b.dataset.position?'':b.dataset.position;render();}});
  $('reset-filters').addEventListener('click',()=>{
    $('hand-search').value='';$('opponent-search').value='';selected=null;render();
    $('hand-search').focus();
  });
  $('metric').addEventListener('click',()=>{if(mode==='mtt')return;metric=metric==='bb'?'resultMinor':'bb';render();});
  $('date-close').addEventListener('click',()=>{if($('date-status').textContent)return;document.querySelector('.date-picker').open=false;document.querySelector('.date-picker summary').focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.date-picker').open=false;}});
  $('matrix').addEventListener('click',e=>{const b=e.target.closest('[data-hand]');if(b){const hand=b.dataset.hand;selected=selected===hand?null:hand;render();$('matrix').querySelector('[data-hand="'+hand+'"]').focus({preventScroll:true});}});
  render();
}
