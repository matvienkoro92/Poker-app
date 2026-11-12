import {gameFetch} from '../shared/game-request-diagnostics.mjs';
import {ensureGameVersion} from '../shared/game-version.mjs';

const $=id=>document.getElementById(id),params=new URLSearchParams(location.search);
let source=window;
try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch{}
// The game iframe is one level below this tournament shell.
if(source!==window){window.pokerApiAuthJsonBody=body=>source.pokerApiAuthJsonBody?.(body)||body;window.getApiBase=()=>source.getApiBase?.()||location.origin;}
let linkedRoom=params.get('room'),currentId=params.get('id')||'',data=null,activeTab='bracket',ownFrame=null,watchFrame=null,offset=0,poll=0,stopped=false,loading=false,flightEpoch=-1,mutation=false,epoch=0,listAdmin=false,formRequestId='',lastPaint='',lastOwnRoom='',watchedRoom='';
const statusNames={registration:'Регистрация',drawn:'Сетка готова',running:'Идёт турнир',completed:'Турнир завершён',cancelled:'Отменён'};
const el=(tag,text,className)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(className)n.className=className;return n;};
function notice(message=''){$('tourError').textContent=message;}
async function request(body,attempt=0){
 const before=Date.now(),auth=source.pokerApiAuthJsonBody?.({})||{};
 const r=await gameFetch((source.getApiBase?.()||location.origin)+'/api/nards-tournaments',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify({...auth,...body}),signal:AbortSignal.timeout(20000)},'nards-tournaments:'+body.action);
 const d=await r.json();if(!r.ok||!d.ok){if(r.status===409&&attempt<3&&/обновляется|Позиция меняется/.test(d.error||'')){await new Promise(resolve=>setTimeout(resolve,200*(attempt+1)));return request(body,attempt+1);}const e=Error(d.error||'Не удалось загрузить турнир.');e.status=r.status;throw e;}
 if(Number.isFinite(d.serverNow))offset=d.serverNow-(before+Date.now())/2;
 return d;
}
const serverNow=()=>Date.now()+offset;
const novosibirsk=t=>new Date(t).toLocaleString('ru-RU',{timeZone:'Asia/Novosibirsk',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})+' НСК';
function duration(at){const s=Math.max(0,Math.ceil((at-serverNow())/1000));return (s>=3600?Math.floor(s/3600)+':':'')+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function showPanel(name){for(const id of ['tourListPanel','tourCreatePanel','tourDetail'])$(id).hidden=id!==name;}
function setTab(tab){
 activeTab=tab;
 for(const b of document.querySelectorAll('[data-tour-tab]'))b.setAttribute('aria-selected',String(b.dataset.tourTab===tab));
 $('tourBracketPanel').hidden=tab!=='bracket';
 $('tourGamePanel').hidden=tab!=='game';
 $('tourWatchPanel').hidden=tab!=='watch';
 // A hidden frame still runs its game loop and polls the server.
 if(tab!=='game'&&ownFrame){ownFrame.remove();ownFrame=null;}
 if(tab!=='watch'&&watchFrame){watchFrame.remove();watchFrame=null;}
 if(tab==='game')ensureOwn();
 if(tab==='watch'&&watchedRoom&&!watchFrame){
  watchFrame=gameFrame(watchedRoom,true);
  $('tourWatchFrame').replaceChildren(watchFrame);
 }
}
function updateURL(){const u=new URL(location.href);if(currentId)u.searchParams.set('id',currentId);else u.searchParams.delete('id');history.replaceState(null,'',u);}
function clearFrames(){for(const frame of [ownFrame,watchFrame])if(frame){frame.src='about:blank';frame.remove();}ownFrame=watchFrame=null;lastOwnRoom='';watchedRoom='';document.querySelector('[data-tour-tab=game]').disabled=true;document.querySelector('[data-tour-tab=watch]').disabled=true;}
function listPrizeCard(t){
 const block=el('div',null,'tour-card-prizes'),format=n=>Number(n||0).toLocaleString('ru-RU');
 const tickets=t.prizeKind==='tickets',values=t.prizeMode==='fixed'?t.prizeAmounts:t.prizeShares;
 block.append(el('small',tickets?'🎟 Призы · билеты на покер':'🏆 Призовой фонд'));
 if(tickets){
  for(const [index,amount]of (values||[]).entries())if(amount>0)block.append(el('strong',(index+1)+' место — билет за '+format(amount)+' ₽'));
 }else{
  block.append(el('strong',t.prizeFund?format(t.prizeFund)+' фишек Poker21':'Без турнирных призов'));
  if(t.prizeFund&&values?.length){
   const total=t.prizeMode==='fixed'?values.reduce((a,b)=>a+b,0):100;
   block.append(el('span',values.flatMap((amount,index)=>amount>0?[(index+1)+' место · '+format(Math.round(amount/total*100))+'%']:[]).join('  /  ')));
  }
 }
 return block;
}
async function list(){
 const gen=++epoch;clearTimeout(poll);currentId='';data=null;lastPaint='';clearFrames();setTab('bracket');updateURL();showPanel('tourListPanel');
 try{const d=await request({action:'list'});if(gen!==epoch)return;listAdmin=d.isAdmin;$('tourCreate').hidden=!listAdmin;$('tourList').replaceChildren();
  for(const t of d.tournaments){const card=el('article',null,'tour-list-card'+(t.status==='running'?' is-live':''));card.dataset.status=t.status;const active=['registration','drawn','running'].includes(t.status);
   const top=el('div',null,'tour-card-heading');
   top.append(el('span',statusNames[t.status]||t.status,'tour-card-status'),el('span',t.count+' / '+t.capacity+' игроков','tour-card-count'));
   card.append(top,el('h3',t.title));
   const meta=el('div',null,'tour-card-meta');
   meta.append(el('span',t.startsAt==null?'Старт по решению администратора':novosibirsk(t.startsAt)),el('span',t.discipline==='long'?'Длинные нарды':'Короткие нарды'));
   card.append(meta,el('p',t.entryType==='chips'?'Вход · '+Number(t.buyIn).toLocaleString('ru-RU')+' фишек Poker21':'Бесплатное участие','tour-card-entry'));
   if(t.status!=='cancelled')card.append(listPrizeCard(t));
   if(active){
    const jackpot=el('div',null,'tour-card-jackpot');
    jackpot.append(el('strong','🎲 Джекпот · билет за 1 000 ₽'),el('p','Три одинаковых куша подряд у одного игрока — билет на покерный турнир за 1 000 ₽.'),el('small','Например: 4:4 → 4:4 → 4:4. Броски соперника не прерывают серию.'));
    card.append(jackpot);
   }
   const b=el('button',t.status==='completed'?'Посмотреть результаты':t.status==='registration'&&!t.self&&t.count<t.capacity?'Зарегистрироваться':'Смотреть');b.onclick=()=>open(t.id);if(t.status==='completed'&&t.podium?.length){
    const winners=el('div',null,'tour-card-podium');
    for(const entry of t.podium){
     const row=el('div',null,'tour-card-podium__player');
     const avatar=el('span',Array.from(entry.name||'Игрок')[0].toUpperCase(),'tour-card-podium__avatar');
     if(entry.avatar){const img=el('img');img.src=entry.avatar;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.remove());avatar.append(img);}
     const info=el('div');info.append(el('small',entry.place===1?'🏆 Победитель':'🥈 Второе место'),el('strong',entry.name||'Игрок'));
     row.append(avatar,info);winners.append(row);
    }
    card.append(winners);
   }
   const actions=el('div',null,'tour-card-actions');actions.append(b);
   if(listAdmin&&['completed','cancelled'].includes(t.status)){
    const remove=el('button','Удалить из списка','tour-delete');
    remove.onclick=async()=>{if(mutation||!window.confirm('Убрать «'+t.title+'» из списка турниров? История игр и выплат сохранится.'))return;mutation=true;clearTimeout(poll);remove.disabled=true;try{await request({action:'delete',id:t.id});notice();await list();}catch(e){notice(e.message);remove.disabled=false;if(!stopped)poll=setTimeout(listRefresh,10000);}finally{mutation=false;}};
    actions.append(remove);
   }
   card.append(actions);$('tourList').append(card);}
  if(!d.tournaments.length)$('tourList').append(el('p',listAdmin?'Турниров пока нет. Создайте первый.':'Скоро здесь появятся турниры клуба.','tour-muted'));
 }catch(e){if(gen===epoch)notice(e.message);}
 if(gen===epoch&&!stopped)poll=setTimeout(listRefresh,10000);
}
async function listRefresh(){if(!currentId&&!mutation&&!$('tourCreatePanel').hidden)return; if(!currentId&&$('tourCreatePanel').hidden)await list();}
function stageName(index,count){const left=count-index;return left===1?'Финал':left===2?'Полуфинал':'1/'+2**(left-1)+' финала';}
function ownMatch(){return data?.self?.matchId&&data.rounds.flatMap(r=>r.matches).find(m=>m.id===data.self.matchId);}
function syncRoomReadyAction(match, ready, skip, voted) {
 if(!ownFrame||!match||data.self?.roomId!==match.roomId)return;
 const action=!ready.hidden?'ready':!skip.hidden?'skip-break':null;
 const payload={type:'p21-tournament-ready-state',matchId:match.id,action,disabled:mutation||!!voted,voted:!!voted};
 const key=JSON.stringify(payload);
 if(ownFrame.dataset.readyState===key)return;
 ownFrame.dataset.readyState=key;
 ownFrame.contentWindow?.postMessage(payload,location.origin);
}
function tick(){
 if(!data||document.hidden)return;const m=ownMatch();let text='',remaining='';
 const readyWindow=data.status==='running'&&data.readyUntil>serverNow()&&m?.startsAt===data.readyUntil&&data.rounds[0]?.matches.includes(m);
 if(data.status==='registration'){
  text=data.drawAt==null?'Регистрация открыта · ждём запуска администратором':'До закрытия регистрации';
  if(data.drawAt!=null)remaining=duration(data.drawAt);
 }
 else if(data.status==='cancelled')text=data.reason||'Турнир отменён';
 else if(data.status==='completed'){const winner=data.entries.find(e=>e.id===data.winnerId);text=winner?'Победитель — '+winner.name:'Турнир завершён без победителя';}
 else if(m&&m.startsAt==null)text='Вы прошли дальше · ждём победителя соседней пары';
 else if(readyWindow){
  text=data.self.ready?'Ждём готовности соперника':'Подтвердите готовность к партии';
  remaining=duration(data.readyUntil);
 }
 else if(m?.startsAt>serverNow()){
  text=data.rounds[0]?.matches.includes(m)?'До начала партии':'Перерыв · до партии';
  remaining=duration(m.startsAt);
 }else if(data.startsAt>serverNow()){
  text='До начала турнира';
  remaining=duration(data.startsAt);
 }
 else if(!m&&data.readyUntil>serverNow()&&!data.rounds[0]?.matches.some(match=>match.startedAt!=null)){
  text='До начала первых партий';
  remaining=duration(data.readyUntil);
 }
 else if(m)text='Ваша партия идёт · откройте «Моя игра»';
 const label=$('tourCountdownLabel'),value=$('tourCountdownValue');
 if(label.textContent!==text)label.textContent=text;
 if(value.textContent!==remaining)value.textContent=remaining;
 if(value.hidden!==!remaining)value.hidden=!remaining;
 const ready=$('tourReady');
 ready.hidden=!readyWindow||data.self.ready;
 ready.disabled=mutation;
 const skip=$('tourSkipBreak'),voted=m?.skipBreakVotes?.includes(data.self?.id);
 skip.hidden=!(data.status==='running'&&m?.startsAt>serverNow()&&m.playerIds.every(Boolean)&&data.rounds.slice(1).some(r=>r.matches.includes(m)));
 skip.disabled=mutation||!!voted;
 const skipLabel=voted?'Ждём соперника':'Пропустить перерыв';
 if(skip.textContent!==skipLabel)skip.textContent=skipLabel;
 $('tourCountdownRow').hidden=!text&&!remaining&&ready.hidden&&skip.hidden;
 syncRoomReadyAction(m,ready,skip,voted);
 const round=m&&data.rounds.find(r=>r.matches.includes(m));
 const index=data.rounds.indexOf(round);
 const advancement=$('tourAdvancement');
 advancement.hidden=index<=0||data.status!=='running';
 if(!advancement.hidden){
  const rival=data.entries.find(e=>e.id===m.playerIds.find(id=>id&&id!==data.self.id));
  const stage=stageName(index,data.rounds.length).toLowerCase();
  const points=round.target;
  const unit=points%10===1&&points%100!==11?'очка':'очков';
  const message=rival?'Поздравляем! Вы прошли в '+stage+'. Ваш соперник — '+rival.name+'.':'Вы прошли в '+stage+'. Соперник определится после соседнего матча.';
  const announcement=message+' Игра до '+points+' '+unit+'.';
  if(advancement.textContent!==announcement)advancement.textContent=announcement;
 }

}
$('tourSkipBreak').onclick=()=>{const match=ownMatch();if(match)mutate('skip-break',{matchId:match.id});};
$('tourReady').onclick=()=>mutate('ready');
let bracketLineObserver;
function drawBracketLines(map, cards) {
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.classList.add('tour-bracket-lines');
 svg.setAttribute('aria-hidden','true');
 map.prepend(svg);
 const draw=()=>{
  const origin=svg.getBoundingClientRect();
  const bounds=cards.map(round=>round.map(card=>card.getBoundingClientRect()));
  const paths=[];
  bounds.slice(0,-1).forEach((round,roundIndex)=>round.forEach((from,index)=>{
   const to=bounds[roundIndex+1][Math.floor(index/2)];
   if(!to||!from.width||!to.width)return;
   const x1=from.right-origin.left,x2=to.left-origin.left,middle=(x1+x2)/2;
   const y1=from.top+from.height/2-origin.top,y2=to.top+to.height/2-origin.top;
   const path=document.createElementNS(ns,'path');
   path.setAttribute('d',`M ${x1} ${y1} H ${middle} V ${y2} H ${x2}`);
   paths.push(path);
  }));
  svg.replaceChildren(...paths);
 };
 draw();
 bracketLineObserver=new ResizeObserver(draw);
 bracketLineObserver.observe(map);
}
function waitingOpponentNote(rounds,roundIndex,match,players){
 if(roundIndex===0||match.playerIds.filter(Boolean).length!==1)return 'Ожидание соперника';
 const emptySlot=match.playerIds.findIndex(id=>!id);
 const source=rounds[roundIndex-1].matches[(match.index-1)*2+emptySlot];
 if(!source||source.resolved)return 'Ожидание соперника';
 const names=source.playerIds.map(id=>players.get(id)?.name).filter(Boolean);
 return names.length===2?'Ждём победителя пары «'+names.join(' — ')+'»':
  'Ждём победителя матча №'+source.index+' ('+stageName(roundIndex-1,rounds.length).toLowerCase()+')';
}
function bracket(d){
 bracketLineObserver?.disconnect();
 const root=$('tourBracket'),panel=$('tourBracketPanel');
 if(d.rounds.length&&panel.firstElementChild!==root)panel.prepend(root);
 if(!d.rounds.length&&panel.lastElementChild!==root)panel.append(root);
 const scroll=root.querySelector('.sng-champions-modal__bracket-map-wrap')?.scrollLeft||0;root.replaceChildren();
 if(!d.rounds.length){root.append(el('p','Пары будут распределены случайно после закрытия регистрации.','tour-bracket-empty'));return;}
 // Reuse SNG Battle's map classes, lanes, connectors and grid row placement.
 const wrap=el('section',null,'sng-champions-modal__bracket-map-wrap'),map=el('div',null,'sng-champions-modal__bracket-map');wrap.setAttribute('aria-label','Турнирная сетка');map.style.setProperty('--sng-map-rows',d.rounds[0].matches.length);map.style.setProperty('--tour-rounds',d.rounds.length);
 const players=new Map(d.entries.map(e=>[e.id,e]));
 const cards=d.rounds.map(()=>[]);
 d.rounds.forEach((r,ri)=>{const round=el('section',null,'sng-champions-modal__map-round');const title=el('h3',stageName(ri,d.rounds.length)+' · до '+r.target,'sng-champions-modal__map-round-title');round.append(title);const matches=el('div',null,'sng-champions-modal__map-round-matches');
  r.matches.forEach((m,mi)=>{const span=d.rounds[0].matches.length/r.matches.length,next=ri<d.rounds.length-1,lane=Math.floor(mi/2)%8+1;
   const card=el('article',null,'sng-champions-modal__map-match'+(m.resolved?' sng-champions-modal__map-match--done':' sng-champions-modal__map-match--unplayed')+(next?' sng-champions-modal__map-match--has-next sng-champions-modal__map-match--lane-'+lane:''));
   const live=!m.resolved&&m.startedAt!=null;
   card.classList.toggle('tour-match--live',live);
   card.classList.toggle('tour-match--finished',m.resolved);
   card.style.setProperty('--sng-map-row-start',mi*span+1);card.style.setProperty('--sng-map-row-span',span);card.style.setProperty('--sng-map-connector-height',span*168+'px');
   const rows=el('div',null,'sng-champions-modal__map-players');
   m.playerIds.forEach((id,i)=>{const p=players.get(id),won=m.winnerId===id&&id,lost=m.resolved&&id&&!won,advanced=ri>0&&id&&!m.resolved&&!m.playerIds.every(Boolean);const row=el('div',null,'sng-champions-modal__map-player'+(won?' sng-champions-modal__map-player--winner':'')+(lost?' sng-champions-modal__map-player--lost':'')+(advanced?' tour-player-advanced':'')+(m.ready[i]&&!m.resolved?' sng-champions-modal__map-player--ready':''));row.append(el('span',p?p.name+(p.self?' · Вы':''):m.resolved?'Нет соперника':'Ждём пару'),el('b',id?m.scores[i]:''));rows.append(row);});card.append(rows);
   const note=m.reason==='double-no-show'?'Оба не явились':m.reason==='bye'?'Проход без игры':m.resolved?'Партия завершена':live?'Идёт партия':m.startsAt==null?waitingOpponentNote(d.rounds,ri,m,players):m.startsAt>serverNow()?(ri===0&&m.startsAt===d.readyUntil?'Подтверждение готовности':novosibirsk(m.startsAt)):'Ожидаем начала';card.append(el('small',note,'tour-match-note'));
   if(m.roomId){const b=el('button',m.id===d.self?.matchId?'Моя игра':'Смотреть ↗','tour-match-watch');b.dataset.tourRoom=m.roomId;b.onclick=()=>m.id===data.self?.matchId?setTab('game'):watch(m.roomId);card.append(b);}matches.append(card);cards[ri].push(card);
  });round.append(matches);map.append(round);
 });wrap.append(map);root.append(wrap);drawBracketLines(map,cards);wrap.scrollLeft=scroll;
}
function gameFrame(room,watching){const frame=document.createElement('iframe');frame.title=watching?'Просмотр турнирной партии':'Моя турнирная партия';frame.allow='clipboard-write';frame.src='board-games-play.html?game='+data.discipline+'&'+(watching?'watch':'room')+'='+encodeURIComponent(room)+'&tournament='+data.id+'&v=20261108-player-checkers';return frame;}
function ensureOwn(){
 const room=data?.self?.roomId||lastOwnRoom;
 if(!room)return;
 document.querySelector('[data-tour-tab=game]').disabled=false;$('tourOwnNote').textContent='';
 if(activeTab!=='game'||ownFrame&&room===lastOwnRoom)return;
 lastOwnRoom=room;ownFrame?.remove();
 const frame=ownFrame=gameFrame(room,false);
 frame.addEventListener('load',()=>{if(frame===ownFrame){delete frame.dataset.readyState;tick();}});
 $('tourOwnFrame').replaceChildren(frame);
}
function watch(room){
 if(room===data?.self?.roomId){setTab('game');return;}
 if(watchedRoom!==room){watchFrame?.remove();watchFrame=null;watchedRoom=room;}
 document.querySelector('[data-tour-tab=watch]').disabled=false;$('returnOwn').hidden=!data.self?.roomId;setTab('watch');
}
function actionButton(label,action,primary=false){const b=el('button',label,primary?'tour-primary':'');b.dataset.tourAction=action;b.onclick=()=>mutate(action);return b;}
function hideOverviewDetails(hidden){
 for(const id of ['tourTitle','tourMeta','tourPrizes'])$(id).hidden=hidden;
}
function entrantCard(entry,index,tournament){
 const name=entry.name||'Игрок',level=Number(entry.level)||0;
 const card=el('article',null,'tour-entry sng-champions-modal__entry tournament-bet-modal__entry'+(entry.self?' tournament-bet-modal__entry--mine':''));
 const avatar=el('span',null,'sng-champions-modal__entry-avatar tournament-bet-modal__avatar');
 const initial=el('span',Array.from(name)[0].toUpperCase());
 avatar.setAttribute('aria-hidden','true');avatar.append(initial);
 const art=source.pokerGetSummerRatingPlayerArt?.(name)?.src;
 const src=art||entry.avatar;
 if(src){
  const media=el('span',null,'sng-champions-modal__entry-avatar-media');
  const img=el('img',null,'sng-champions-modal__entry-avatar-img'+(art?' sng-champions-modal__entry-avatar-img--art':''));
  img.alt='';img.loading='lazy';img.decoding='async';
  img.addEventListener('error',()=>{
   if(art&&entry.avatar&&img.classList.contains('sng-champions-modal__entry-avatar-img--art')){
    img.classList.remove('sng-champions-modal__entry-avatar-img--art');img.src=entry.avatar;
   }else media.replaceWith(initial);
  });
  img.src=src;media.append(img);initial.replaceWith(media);
 }
 if(level>0)avatar.append(el('em',level));
 const main=el('div',null,'sng-champions-modal__entry-main tournament-bet-modal__entry-main');
 main.append(el('strong',name+(entry.self?' · Вы':''),'sng-champions-modal__entry-name'),
  el('span',entry.ready?'✓ Готов к игре':'✓ Участвует','sng-champions-modal__entry-status'));
 if(level>0)main.append(el('small','Уровень '+level,'sng-champions-modal__entry-meta'));
 card.append(el('span',index+1,'tournament-bet-modal__place'),avatar,main);
 if(tournament.isAdmin&&tournament.status==='registration'){
  const remove=el('button','×','tour-entry-remove');
  remove.type='button';
  remove.setAttribute('aria-label','Удалить участника '+name);
  remove.onclick=()=>{if(!mutation&&window.confirm('Удалить из турнира: '+name+'?'))mutate('remove-entry',{entryId:entry.id});};
  card.append(remove);
 }
 return card;
}
function render(d){
 hideOverviewDetails(d.status==='running');
 data=d;const tickets=d.prizeKind==='tickets',fixed=d.prizeMode==='fixed';
 const values=fixed?d.prizeAmounts:d.prizeShares||[100];
 $('tourPrizes').textContent=!tickets&&d.entryType!=='chips'&&!d.prizeFund?'Бесплатно · Без призов':(tickets?'Обычные билеты на покер. ': (d.entryType==='chips'?'Вход '+d.buyIn+' фишек · ':'Бесплатно · ')+'Призовой фонд: '+(d.prizeFund||0)+' фишек. ')+values.map((n,i)=>(i+1)+' место — '+n+(tickets?' ₽ · 1 билет':fixed?' фишек'+(d.entryType==='chips'?' при полном наборе':''):'%')).join(' · ')+(d.status==='completed'?(tickets?(d.paymentsSettled?' · Билеты выданы':' · Ожидается выдача билетов'):(d.paymentsSettled?' · Призы выплачены':' · Выплачиваем призы')):'');
 const awards=$('tourTicketAwards');awards.replaceChildren();
 for(const a of d.ticketAwards||[]){const entry=d.entries.find(e=>e.id===a.entryId),row=el('div',null,'tour-ticket-award');row.append(el('strong',(entry?.name||'Игрок')+' · '+a.place+' место'),el('span','Билет '+new Intl.NumberFormat('ru-RU').format(a.amount)+' ₽ · '+(a.issuedAt?'Выдан':'Ожидает выдачи')));
 if(d.isAdmin)row.append(el('small',a.poker21Id?'Poker21 ID: '+a.poker21Id:'Poker21 ID ещё не привязан'));
 if(d.isAdmin&&!a.issuedAt){const b=el('button','Отметить выдачу');b.onclick=async()=>{if(!window.confirm('Билет '+a.amount+' ₽ действительно выдан игроку «'+(entry?.name||'Игрок')+'»?'))return;b.disabled=true;try{render(await request({action:'issue-ticket',id:d.id,entryId:a.entryId}));notice();}catch(e){notice(e.message);b.disabled=false;}};row.append(b);}awards.append(row);}
 showPanel('tourDetail');$('tourTitle').textContent=d.title;$('tourMeta').textContent=(d.discipline==='long'?'Длинные':'Короткие')+' · '+(d.variant==='crazy'?'Бешеные':d.variant==='six-one'?'6:1 · Кафтар':'Классические')+' · '+d.entries.length+'/'+d.capacity+' · '+(d.startsAt==null?'Ручной запуск':novosibirsk(d.startsAt))+' · победа 1 / марс 2 / кокс 3';
 const paint=JSON.stringify([d.revision,d.status,d.isAdmin,d.self,d.rounds,d.entries]);
 if(paint!==lastPaint){lastPaint=paint;bracket(d);
  $('tourEntrantCount').textContent=d.entries.length;
  $('tourEntrants').replaceChildren(...d.entries.map((entry,index)=>entrantCard(entry,index,d)));
  const actions=$('tourActions'),adminActions=$('tourAdminActions');
  actions.replaceChildren();adminActions.replaceChildren();
  if(!d.self&&d.status==='registration')actions.append(actionButton((d.entryType==='chips'?'Участвовать · '+d.buyIn+' фишек':'Участвовать · бесплатно'),'join',true));
  if(d.self&&d.status==='registration')actions.append(actionButton('Отменить участие','leave'));
  if(d.self?.opponentRoomId){const b=el('button','Смотреть будущего соперника ↗');b.onclick=()=>watch(d.self.opponentRoomId);actions.append(b);}
  if(d.isAdmin&&d.status==='registration'&&d.startsAt==null){const b=actionButton('Старт','start',true);b.disabled=d.entries.length<2;adminActions.append(b);}
  if(d.isAdmin&&['registration','drawn'].includes(d.status))adminActions.append(actionButton('Отменить турнир','cancel'));
 }
 if(linkedRoom){const room=linkedRoom;linkedRoom=null;if(d.self?.roomId===room)setTab('game');}
 ensureOwn();tick();
}
async function refresh(){
 if(stopped||!currentId||mutation||loading&&flightEpoch===epoch)return;const gen=epoch;loading=true;flightEpoch=gen;
 try{const d=await request({action:'get',id:currentId});if(gen===epoch){render(d);notice();}}catch(e){if(gen===epoch)notice(e.status===409?'Синхронизируем турнир…':e.message);}finally{if(flightEpoch===gen)loading=false;if(gen===epoch&&!stopped)poll=setTimeout(refresh,3000);}
}
async function open(id){if(!/^[A-HJ-NP-Z2-9]{10}$/.test(id)){notice('Неверная ссылка на турнир.');return;}epoch++;clearTimeout(poll);clearFrames();currentId=id;data=null;lastPaint='';setTab('bracket');updateURL();showPanel('tourDetail');hideOverviewDetails(false);$('tourTitle').textContent='Загружаем турнир…';await refresh();}
async function mutate(action,fields={}){
 if(mutation)return;if(action==='cancel'&&!window.confirm('Отменить турнир?'))return;
 mutation=true;tick();epoch++;clearTimeout(poll);for(const b of document.querySelectorAll('#tourActions button, #tourAdminActions button'))b.disabled=true;
 try{const d=await request({action,id:currentId,...fields});lastPaint='';render(d);if(action==='ready'&&d.self?.roomId)setTab('game');notice();}catch(e){notice(e.message);}finally{mutation=false;tick();if(!stopped)poll=setTimeout(refresh,2000);}
}
function targets(){const root=$('tourRoundTargets'),previous=[...root.querySelectorAll('input')].map(i=>i.value);root.replaceChildren();const count=Math.ceil(Math.log2(Number($('tourForm').elements.capacity.value)));for(let i=0;i<count;i++){const label=el('label',stageName(i,count));const input=document.createElement('input');input.type='number';input.min=1;input.max=25;input.required=true;input.value=previous[i]||1;input.name='target-'+i;label.append(input);root.append(label);}}
function prizes(){
 const f=$('tourForm'),paid=f.elements.entryType.value==='chips';
 f.elements.prizeKind.querySelector('[value=tickets]').disabled=paid;
 if(paid&&f.elements.prizeKind.value==='tickets')f.elements.prizeKind.value='chips';
 const tickets=f.elements.prizeKind.value==='tickets',fixed=tickets||f.elements.prizeMode.value==='fixed',capacity=Number(f.elements.capacity.value);
 const noPrize=!tickets&&!paid&&Number(f.elements.prizeFund.value)===0;
 const distribution=$('tourPrizeDistribution');
 distribution.hidden=noPrize;
 distribution.disabled=noPrize;
 if(noPrize){
  f.elements.prizeMode.value='percent';
  f.elements.prizeFund.readOnly=false;
  $('tourBuyInLabel').hidden=true;
  $('tourPrizeFundLabel').hidden=false;
  $('tourFundingNote').textContent='При фонде 0 турнир проводится без призов.';
  f.querySelector('[type=submit]').disabled=false;
  return;
 }
 $('tourBuyInLabel').hidden=!paid;$('tourPrizeFundLabel').hidden=tickets||paid;
 f.elements.prizeFund.readOnly=fixed;
 $('tourPrizeModeLabel').hidden=tickets;$('tourPrizePlacesLabel').hidden=fixed;$('tourManualPlacesLabel').hidden=!fixed;
 f.elements.manualPrizePlaces.max=capacity;
 $('tourFundingNote').textContent=tickets?'Обычные билеты на покер, без беккинга. Номинал каждого билета задаётся в рублях. После финала администратор выдаёт билеты и отмечает выдачу здесь.':paid?'Фонд — сумма взносов фактических участников. Суммы вручную задаются для полного набора; при меньшем числе игроков призы пропорционально уменьшаются.':'Фонд списывается с вашего Poker21 при создании. В ручном режиме фонд равен сумме призов.';
 for(const o of f.elements.prizePlaces.options)o.disabled=Number(o.value)>capacity;
 if(Number(f.elements.prizePlaces.value)>capacity)f.elements.prizePlaces.value='1';
 const requested=Number(fixed?f.elements.manualPrizePlaces.value:f.elements.prizePlaces.value),count=Number.isInteger(requested)&&requested>=1&&requested<=capacity?requested:0,root=$('tourPrizeShares'),mode=tickets?'tickets':fixed?'fixed':'percent';
 const initialPool=paid?Number(f.elements.buyIn.value)*capacity:Number(f.elements.prizeFund.value);
 if(root.children.length!==count||root.dataset.mode!==mode){
  const previous=root.dataset.mode===mode?[...root.querySelectorAll('input')].map(i=>i.value):[];
  root.replaceChildren();root.dataset.mode=mode;
  const defaults={1:[100],2:[70,30],4:[50,30,10,10],8:[40,20,10,10,5,5,5,5]}[count]||Array(count).fill(0);
  for(let i=0;i<count;i++){
   const label=el('label',(i+1)+' место, '+(tickets?'номинал билета, ₽':fixed?'фишки':'%')),input=el('input');
   input.type='number';input.min=0;input.max=fixed?1000000:100;input.step=1;input.required=true;
   input.value=previous[i]??(tickets?(i===0?500:300):fixed?Math.floor((Number.isFinite(initialPool)?initialPool:0)*defaults[i]/100):defaults[i]);
   input.oninput=prizes;const amount=el('small',null,'tour-prize-amount');amount.setAttribute('data-prize-amount','');label.append(input,amount);root.append(label);
  }
 }
 const values=[...root.querySelectorAll('input')].map(i=>Number(i.value)),sum=values.reduce((a,b)=>a+b,0);
 if(fixed&&!paid&&!tickets){
  f.elements.prizeFund.value=sum;
  if(sum===0){prizes();return;}
 }
 const pool=paid?Number(f.elements.buyIn.value)*capacity:Number(f.elements.prizeFund.value);
 let valid=count>0&&values.every(n=>Number.isSafeInteger(n)&&n>=0&&n<=(fixed?1000000:100))&&(fixed?sum>0&&sum<=1000000&&(tickets||!paid||sum===pool):sum===100);
 let equal=true;for(let start=2;start<Math.min(capacity,2**Math.ceil(Math.log2(count)));start*=2){const group=Array.from({length:Math.min(start,capacity-start)},(_,i)=>values[start+i]||0);if(group.some(n=>n!==group[0]))equal=false;}
 valid=valid&&equal;
 const amounts=fixed?values.slice():values.map(n=>Math.floor(pool*n/100));
 if(!fixed&&valid)amounts[0]+=pool-amounts.reduce((a,b)=>a+b,0);
 root.querySelectorAll('[data-prize-amount]').forEach((node,i)=>{node.textContent=valid?new Intl.NumberFormat('ru-RU').format(amounts[i])+(tickets?' ₽ · 1 билет':' фишек'+(paid?' · при полном наборе':'')):'—';});
 $('tourPrizePreview').textContent=(tickets?'Билетов: '+count+'. Общий номинал: '+sum+' ₽.':fixed?'Сумма призов: '+sum+' фишек.': 'Распределено: '+sum+'%. Фонд: '+pool+' фишек.')+(!equal?' Добавьте все места одного раунда и задайте им одинаковые призы (3–4, 5–8 и далее).':!valid?' Проверьте количество мест и распределение фонда.':'');
 $('tourPrizeRules').textContent='Выбывшие в одном раунде получают одинаковые призы: 3–4 места, 5–8 места и далее. '+(tickets?'Неиспользованные билеты не выдаются.': 'Округление и доли незанятых мест получает победитель.');
 f.querySelector('[type=submit]').disabled=!valid;
}
for(const name of ['entryType','prizePlaces','manualPrizePlaces','buyIn','prizeFund','prizeKind'])$('tourForm').elements[name].oninput=prizes;
$('tourForm').elements.prizeMode.oninput=()=>{const f=$('tourForm');f.elements.manualPrizePlaces.value=f.elements.prizePlaces.value;prizes();};

function updateStartMode(){
 const form=$('tourForm'),scheduled=form.elements.startMode.value==='scheduled';
 $('tourStartTime').hidden=!scheduled;
 form.elements.startTime.disabled=!scheduled;
 form.elements.startTime.required=scheduled;
 $('tourStartNote').textContent=scheduled
  ?'В назначенное время регистрация закроется и сформируется сетка. Для старта нужны хотя бы два участника.'
  :'Администратор запускает турнир кнопкой «Старт». Регистрация открыта до запуска.';
}
$('tourForm').elements.startMode.onchange=updateStartMode;

function createForm(){if(!listAdmin)return;const start=$('tourForm').elements.startTime;if(!start.value){const now=Date.now(),date=new Date(now+3*3600000).toISOString().slice(0,10);let next=Date.parse(date+'T14:00:00+03:00');if(next<now+60000)next+=86400000;start.value=new Date(next+3*3600000).toISOString().slice(0,16);}epoch++;clearTimeout(poll);showPanel('tourCreatePanel');formRequestId=crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(20)),b=>b.toString(16).padStart(2,'0')).join('');targets();prizes();updateStartMode();}
$('tourForm').elements.capacity.onchange=()=>{targets();prizes();};
$('tourForm').elements.discipline.onchange=()=>{const form=$('tourForm');if(form.elements.discipline.value==='short')form.elements.variant.value='classic';form.elements.variant.disabled=form.elements.discipline.value==='short';};
$('tourForm').onsubmit=async event=>{event.preventDefault();if(mutation)return;mutation=true;const form=$('tourForm'),button=form.querySelector('[type=submit]');button.disabled=true;try{
 const scheduled=form.elements.startMode.value==='scheduled';
 // The form uses Moscow time regardless of the device timezone.
 const startsAt=scheduled?Date.parse(form.elements.startTime.value+'+03:00'):null;
 if(scheduled&&!Number.isFinite(startsAt))throw Error('Укажите дату и время начала турнира.');
 const d=await request({action:'create',startsAt,requestId:formRequestId,title:form.elements.title.value,capacity:Number(form.elements.capacity.value),discipline:form.elements.discipline.value,variant:form.elements.variant.value,turnSeconds:Number(form.elements.turnSeconds.value),entryType:form.elements.entryType.value,buyIn:Number(form.elements.buyIn.value),prizeFund:Number(form.elements.prizeFund.value),prizeKind:form.elements.prizeKind.value,prizeMode:form.elements.prizeKind.value==='tickets'?'fixed':form.elements.prizeMode.value,...($('tourPrizeDistribution').disabled?{}:form.elements.prizeKind.value==='tickets'||form.elements.prizeMode.value==='fixed'?{prizeAmounts:[...$('tourPrizeShares').querySelectorAll('input')].map(i=>Number(i.value))}:{prizeShares:[...$('tourPrizeShares').querySelectorAll('input')].map(i=>Number(i.value))}),roundTargets:[...$('tourRoundTargets').querySelectorAll('input')].map(i=>Number(i.value))});notice();mutation=false;await open(d.id);}catch(e){notice(e.message);}finally{mutation=false;button.disabled=false;}};
$('tourCreate').onclick=createForm;$('allTours').onclick=list;document.querySelector('[data-tour-back]').onclick=list;
for(const b of document.querySelectorAll('[data-tour-tab]'))b.onclick=()=>setTab(b.dataset.tourTab);
$('returnOwn').onclick=()=>setTab('game');
$('copyTourLink').onclick=async()=>{const url='https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=nards_tour_'+currentId;try{await navigator.clipboard.writeText(url);notice('Ссылка скопирована.');}catch{window.prompt('Ссылка на турнир',url);}};
function close(){if(parent!==window)parent.postMessage({type:'p21-nards-tournaments-close'},location.origin);else location.assign('./');}
$('closeTournament').onclick=close;
window.addEventListener('message',e=>{if(e.origin!==location.origin)return;if(e.source===source&&e.data?.type==='p21-nards-tournaments-request-close')close();if(e.data?.type==='p21-tournament-ready-action'&&e.source===ownFrame?.contentWindow){
 const match=ownMatch();
 if(match?.id!==e.data.matchId)return;
 const button=e.data.action==='ready'?$('tourReady'):e.data.action==='skip-break'?$('tourSkipBreak'):null;
 tick();
 if(button&&!button.hidden&&!button.disabled)button.click();
 return;
 }if(e.data?.type==='p21-tournament-match-won'&&e.source===ownFrame?.contentWindow){refresh();return;}if(e.data?.type==='p21-tournament-bracket'&&(e.source===ownFrame?.contentWindow||e.source===watchFrame?.contentWindow)){setTab('bracket');return;}if(e.data?.type==='p21-board-games-close'){if(e.source===watchFrame?.contentWindow)setTab(data?.self?.roomId?'game':'bracket');else if(e.source===ownFrame?.contentWindow)setTab('bracket');}});
const tickTimer=setInterval(tick,1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&currentId){clearTimeout(poll);refresh();}});
window.addEventListener('online',()=>{if(currentId){clearTimeout(poll);refresh();}else list();});
window.addEventListener('pagehide',()=>{stopped=true;epoch++;clearTimeout(poll);clearInterval(tickTimer);});
window.PokerNardsTournaments={inspect:()=>({id:currentId,tab:activeTab,data:data?structuredClone(data):null,ownRoom:lastOwnRoom})};
(async()=>{if(await ensureGameVersion()){if(currentId)await open(currentId);else await list();}})();
