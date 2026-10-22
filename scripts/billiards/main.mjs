import {mountRanking} from './ranking-ui.mjs';
import {mountMatchup} from './matchup-ui.mjs';
import {mountSettlement} from './settlement-ui.mjs';
import {createReplayPlayer} from './replay-player.mjs';
import {mountResultPanel} from './result-panel.mjs';
import {createGame,step,shoot,action,validState,expireTurn} from './engine.mjs';
import {createSession} from './network.mjs';
import {createRoom} from './room.mjs';
import {botMove} from './solo.mjs';
import {mountTableSkins} from './table-skins.mjs';
import {mountTurnGuide} from './turn-guide.mjs';
import {mountCues,CUES} from './cues.mjs';
import {mountRules} from './rules-ui.mjs';
import {mountShotTools} from './shot-tools.mjs';
import {createMatch,recordWin,nextMatch} from './match.mjs';
import {mountLobby} from './lobby.mjs';
import {createTraining} from './training.mjs';
const $=id=>document.getElementById(id);
let state=createGame(),canonical=state,player=0,online=false,net=null,angle=0,tableView=false,last=performance.now(),acc=0,raf=0,revision=-1,playback=null,clockOffset=0,connectionError='',mode=null,botAt=0;
let playerProfiles=[null,null];const matchup=mountMatchup();
let spectating=false;
let opponentAim=null,botPlan=null,shownAim=null,renderedCue='';
let turnSeconds=null,turnDeadline=null,localClockKey='';
let series=createMatch(),canonicalSeries=series;const training=createTraining();
const replayPlayer=createReplayPlayer();let replayStart=0,replayAwaiting=false;
let room;
try{room=createRoom($('room'));}catch(_){$('connection').textContent='Не удалось открыть 3D. Попробуйте обновить страницу в браузере.';$('create').disabled=$('join').disabled=$('solo').disabled=$('training').disabled=true;}
let heroSource=window;try{if(parent!==window&&parent.location.origin===location.origin)heroSource=parent;}catch{}
const shotTools=mountShotTools({adjust:delta=>{angle=Math.atan2(Math.sin(angle+delta),Math.cos(angle+delta));}});
const turnGuide=mountTurnGuide();
const rulesUI=mountRules({move:value=>move(value),room});
const tableDock=document.createElement('section');tableDock.id='tableDock';document.querySelector('.billiards>header>div').append($('turnClock'));tableDock.append($('turnGuide'),$('game'),$('decisionOpen'),$('penaltyConfirm'));document.querySelector('main').append(tableDock);
const resultPanel=mountResultPanel(tableDock,()=>$('again').click());
let initialEntry=new URLSearchParams(location.search).get('mode')||'lobby';
try{if(parent!==window&&window.frameElement?.dataset.billiardsEntry)initialEntry=window.frameElement.dataset.billiardsEntry;}catch{}
if(!['tables','cues','lobby'].includes(initialEntry))initialEntry='lobby';
if(initialEntry!=='lobby')$('lobby').hidden=true;
const tableSkins=mountTableSkins({source:heroSource,room});
const equipment=mountCues({source:heroSource,room});
const roomToolbar=document.createElement('nav');roomToolbar.className='room-toolbar';roomToolbar.setAttribute('aria-label','Настройки бильярдной');roomToolbar.append($('cueButton'),$('tableSkinButton'),$('rulesButton'));document.querySelector('main').append(roomToolbar);
const settlement=mountSettlement(roomToolbar,()=>({state,player,mode,ready:online,playback,tableView}),value=>{move(value);if(mode==='solo'&&value.type==='draw-offer')action(state,1,{type:'draw-accept'});});
let entryOpened=false,currentEntry='';
function openEntry(entry){if(!['tables','cues','lobby'].includes(entry)||mode!==null||entryOpened&&currentEntry===entry)return;entryOpened=true;currentEntry=entry;for(const d of document.querySelectorAll('dialog[open]'))d.close();setView(false);$('lobby').hidden=entry!=='lobby';if(entry==='tables')tableSkins.open();if(entry==='cues')equipment.open();}
// Equipment opened from the villa is a separate window; closing it returns there.
for(const dialog of [$('cueDialog'),document.querySelector('.table-skin-dialog')])dialog.addEventListener('close',()=>{
 if(parent!==window&&['tables','cues'].includes(initialEntry)&&currentEntry===initialEntry)parent.postMessage({type:'p21-billiards-close'},location.origin);
});
window.addEventListener('message',event=>{if(parent!==window&&event.source===parent&&event.origin===location.origin&&event.data?.type==='p21-billiards-open-entry')openEntry(event.data.entry);});

async function request(body){let source=window;try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}const auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin,sentAt=Date.now();const r=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify({...auth,...body}),signal:AbortSignal.timeout(10000)});const d=await r.json();if(Number.isFinite(d.serverNow))d.clockSample=d.serverNow-(sentAt+Date.now())/2;if(!r.ok||!d.ok)throw Error(d.error||'Сервер недоступен. Попробуйте снова.');return d;}
mountRanking(request);
const lobby=mountLobby({launch:choice=>$(choice).click(),back:()=>{stop();lobby.reset();$('lobby').hidden=true;setView(false);if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);}});
function status(text){$('connection').textContent=text;}
function setView(value){if(mode===null)$('lobby').hidden=!value;tableView=value;room?.setView(value?'table':'room');document.body.classList.toggle('billiards-table-view',value);$('view').hidden=value;$('view').textContent=mode?'Вернуться к игре':'К столу';$('resumeGame').hidden=!mode||value;if(mode)$('game').hidden=!value;}
function stop(){settlement.close();replayPlayer.clear();opponentAim=null;botPlan=null;shownAim=null;turnSeconds=null;turnDeadline=null;localClockKey='';training.clear();online=false;mode=null;botAt=0;playback=null;net?.close();net=null;connectionError='';$('create').disabled=$('join').disabled=false;$('lobby').hidden=false;$('game').hidden=true;setView(false);$('lobby').hidden=false;}
function solo(next=false){if(!room)return;recordWin(series,state.winner);const previous=next&&mode==='solo'&&state.winner!==null?state:null,nextSeries=previous?nextMatch(series):createMatch(rulesUI.settings().raceTo),settings=previous?{discipline:previous.discipline,color:previous.color,breaker:1-(previous.breaker||0)}:rulesUI.settings();stop();mode='solo';series=nextSeries;canonicalSeries=series;state=createGame({...settings,seed:Math.floor(Math.random()*4294967296)});rulesUI.reset();shotTools.reset();canonical=state;player=0;online=true;angle=0;acc=0;state.message=state.turn===0?'Вы разбиваете пирамиду · биток можно передвинуть внутри дома':'Компьютер разбивает пирамиду';$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ОДИНОЧНАЯ ПАРТИЯ · КОМПЬЮТЕР';turnSeconds=rulesUI.settings().turnSeconds;turnDeadline=Date.now()+turnSeconds*1000;setView(true);last=performance.now();}
function startTraining(){if(!room)return;stop();mode='training';state=createGame({...rulesUI.settings(),seed:Math.floor(Math.random()*4294967296)});canonical=state;series=createMatch();rulesUI.reset();shotTools.reset();player=0;online=true;angle=0;acc=0;$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ТРЕНИРОВКА · ВЫ УПРАВЛЯЕТЕ ОБЕИМИ СТОРОНАМИ';setView(true);last=performance.now();}
function move(value){if(spectating)return;if(mode==='training')return training.move(state,value,{angle,power:Number($('power').value),rules:rulesUI.options(state),spin:shotTools.value()});if(mode==='solo')return action(state,player,value);return net?.move(value);}
function restoreTraining(replay){if(mode!=='training')return;const saved=replay?training.replay():training.restore();if(!saved)return;state=saved.state;canonical=state;player=state.turn;angle=saved.controls.angle;$('power').value=saved.controls.power;$('powerValue').textContent=saved.controls.power+'%';rulesUI.restoreControls(saved.controls.rules);shotTools.restore(saved.controls.spin);acc=0;last=performance.now();botAt=0;}

function adopt(d){
 if(!validState(d.state))return;if(Array.isArray(d.playerProfiles))playerProfiles=d.playerProfiles;opponentAim=d.aim||null;turnSeconds=d.turnSeconds||null;turnDeadline=d.turnDeadline||null;
 const wasReady=online;connectionError='';if(!playback)clockOffset=d.clockSample??d.serverNow-Date.now();spectating=d.spectator===true;document.body.classList.toggle('billiards-spectator',spectating);if(spectating)document.querySelector('.billiards>header small').textContent='ПРОСМОТР ПАРТИИ';player=spectating?0:d.player;online=d.ready;$('roomCode').textContent=d.roomId;$('inviteLink').value='https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=billiards_'+d.roomId;$('invite').hidden=d.player!==0;$('create').disabled=$('join').disabled=false;
 if(d.challengeSent)status('Вызов отправлен в чат игроков · ждём соперника');
 if(d.ready){$('lobby').hidden=true;$('game').hidden=!tableView;$('matchMode').textContent='ПАРТИЯ С ДРУГОМ · ОНЛАЙН';}else {lobby.waiting();if(!d.challengeSent)status('Ожидаем подключения друга'+(d.turnSeconds?' · '+d.turnSeconds+' с на ход':''));}
 if(d.revision===revision)return;
 revision=d.revision;canonical=d.state;canonicalSeries=d.match||createMatch();playback=d.playback;series=playback?.matchBefore?structuredClone(playback.matchBefore):structuredClone(canonicalSeries);
 if(playback&&validState(playback.before)&&(wasReady||Date.now()+clockOffset<playback.startedAt+playback.durationMs)){state=structuredClone(playback.before);replayStart=performance.now()+playback.startedAt-(Date.now()+clockOffset);replayAwaiting=true;replayPlayer.start(playback);}else{replayPlayer.clear();state=canonical;series=structuredClone(canonicalSeries);playback=null;}

 if(d.ready&&!wasReady)setView(true);
 acc=0;last=performance.now();
}
let joinPreviewBusy=false;
async function previewJoin(code){
 if(joinPreviewBusy)return;joinPreviewBusy=true;
 try{const info=await request({action:'preview',roomId:code});let dialog=$('joinConfirmation');if(!dialog){dialog=document.createElement('dialog');dialog.id='joinConfirmation';dialog.className='cue-dialog';dialog.innerHTML='<h2>Приглашение в бильярд</h2><p data-invite-info></p><button data-accept class="primary">Принять приглашение</button><button data-cancel>Отмена</button>';document.querySelector('main').append(dialog);}dialog.querySelector('[data-invite-info]').textContent=(info.discipline==='pyramid'?'Русский бильярд':'Американский пул')+' · '+(info.raceTo===3?'До 3 побед':'Одна партия')+' · '+(info.turnSeconds?info.turnSeconds+' секунд каждому на ход':'Без ограничения времени');dialog.querySelector('[data-accept]').onclick=()=>{dialog.close();$('code').value=code;start(false,false,true);};dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();dialog.showModal();}catch(e){status(e.message);}finally{joinPreviewBusy=false;}
}
function start(host,challenge=false,confirmed=false){const code=$('code').value.toUpperCase().replace(/\s/g,'');if(!host&&!/^[A-HJ-NP-Z2-9]{10}$/.test(code)){status('Введите код из 10 символов, который прислал друг.');return;}if(!host&&!confirmed){previewJoin(code);return;}stop();mode='online';revision=-1;$('create').disabled=$('join').disabled=true;status(host?'Создаём комнату…':'Подключаемся…');net=createSession({request,getAim:()=>{if(!online||state.turn!==player||state.moving||state.pending||state.inHand||playback)return null;const cue=equipment.inspect();return {angle,cueId:rulesUI.options(state).cueId,shot:state.shot,cueStyle:cue.selected,nick:cue.nick};},onUpdate:adopt,onError(message,fatal){connectionError=message;online=false;status(message);if(fatal){$('create').disabled=$('join').disabled=false;}else $('hint').textContent=message;}});net.start(host,code,{...rulesUI.settings(),challenge});}
$('challenge').onclick=()=>{if($('create').disabled)return;start(true,true);};
$('solo').onclick=()=>solo();$('training').onclick=startTraining;$('restoreShot').onclick=()=>restoreTraining(false);$('repeatShot').onclick=()=>restoreTraining(true);$('create').onclick=()=>start(true);$('join').onclick=()=>start(false);$('code').onkeydown=e=>{if(e.key==='Enter')start(false);};
$('inviteLink').onclick=()=>{$('inviteLink').select();};
$('copyInvite').onclick=async()=>{try{await navigator.clipboard.writeText($('inviteLink').value);status('Ссылка скопирована — отправьте её другу. Ожидаем подключения.');}catch(_){$('inviteLink').focus();$('inviteLink').select();status('Выделили ссылку — скопируйте её и отправьте другу.');}};
$('shareInvite').onclick=async()=>{
 const url=$('inviteLink').value;if(!url)return;
 const text='Приглашаю на бильярд в Two Aces!'+(turnSeconds?' Каждому '+turnSeconds+' секунд на ход.':'');
 try{if(navigator.share){await navigator.share({title:'Приглашение в бильярд',text,url});return;}
 const shareUrl='https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text);
 const telegram=heroSource.Telegram?.WebApp;if(telegram?.openTelegramLink)telegram.openTelegramLink(shareUrl);else window.open(shareUrl,'_blank','noopener,noreferrer');
 }catch(e){if(e.name!=='AbortError')status('Не удалось открыть отправку. Скопируйте пригласительную ссылку.');}
};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('roomCode').textContent);status('Код скопирован — отправьте его другу.');}catch(_){status('Код комнаты: '+$('roomCode').textContent);}};
$('resumeTable').onclick=()=>setView(true);$('view').onclick=()=>setView(!tableView);$('power').oninput=()=>{$('powerValue').textContent=$('power').value+'%';};$('shoot').onclick=()=>move({type:'shot',angle,power:Number($('power').value)/100,...rulesUI.options(state),spin:shotTools.value()});$('again').onclick=()=>mode==='training'?startTraining():mode==='solo'?solo(true):net?.move(null,true);$('modes').onclick=()=>{stop();status('Выберите одиночную партию или игру с другом.');};
let dragging=false;
function aim(e){if(spectating||!tableView||!online||state.turn!==player||state.moving||state.winner!==null)return;const p=room.point(e.clientX,e.clientY);if(!p)return;if(rulesUI.isPlacing(state)||state.breakPending&&e.shiftKey){if(e.type==='pointerdown'){move({type:'place',x:p.x,y:p.y});rulesUI.placed();}return;}if(e.type==='pointerdown'&&rulesUI.chooseCue(state,p))return;const id=rulesUI.options(state).cueId,b=state.balls.find(b=>b.id===id&&!b.pocket);if(!b)return;if(Math.hypot(p.x-b.x,p.y-b.y)<18)return;angle=Math.atan2(b.y-p.y,b.x-p.x);}
$('room').onselectstart=$('room').oncontextmenu=e=>e.preventDefault();
$('room').onpointerdown=e=>{e.preventDefault();window.getSelection()?.removeAllRanges();dragging=true;$('room').setPointerCapture(e.pointerId);aim(e);};$('room').onpointermove=e=>{if(dragging)aim(e);};$('room').onpointerup=$('room').onpointercancel=()=>dragging=false;
$('closeRules').onclick=()=>$('rules').close();$('back').onclick=()=>{stop();if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.assign('./');};
function frame(now){
 const dt=Math.min((now-last)/1000,.1);last=now;
 if(mode==='solo'||mode==='training'){
  acc+=dt;while(acc>=1/120&&state.moving){step(state);acc-=1/120;}if(!state.moving)acc=0;
  if(mode==='solo'&&state.turn===1&&!state.moving&&state.winner===null){if(!botAt){botPlan=botMove(state);botAt=now+(botPlan?.type==='shot'?1400:650);}if(now>=botAt){if(botPlan)action(state,1,botPlan);botAt=0;botPlan=null;}}else{botAt=0;botPlan=null;}
 }else if(playback&&replayPlayer.inspect().ready){
  // Start from the first frame only after the worker has prepared the track.
  // Network and calculation time must never consume the visible shot.
  if(replayAwaiting){replayStart=Math.max(now,replayStart);replayAwaiting=false;}
  if(now>=replayStart){
  if(state.shot===playback.before.shot&&!state.moving){playback.move?action(state,state.turn,playback.move):shoot(state,playback.angle,playback.power);}
  const elapsed=now-replayStart;
  if(replayPlayer.sample(elapsed,state)&&elapsed>=playback.durationMs){state=canonical;series=structuredClone(canonicalSeries);playback=null;replayPlayer.clear();}
  }
 }

 if(mode==='solo')recordWin(series,state.winner);if(mode==='training')player=state.turn;
 if(mode==='solo'&&turnSeconds){const key=[state.shot,state.turn,!!state.pending].join(':');if(state.moving){turnDeadline=null;localClockKey='';}else if(state.winner!==null)turnDeadline=null;else if(key!==localClockKey){localClockKey=key;turnDeadline=Date.now()+turnSeconds*1000;}else if(turnDeadline&&Date.now()>=turnDeadline){expireTurn(state);localClockKey='';}}
 const remaining=turnDeadline?Math.max(0,Math.ceil((turnDeadline-(Date.now()+(['online','spectator'].includes(mode)?clockOffset:0)))/1000)):null;
 $('turnClock').hidden=!tableView||remaining===null||state.moving||state.winner!==null;
 $('turnClock').textContent=remaining===null?'':remaining+' с · лимит '+turnSeconds+' с';
 const can=!spectating&&online&&!playback&&state.turn===player&&!state.moving&&state.winner===null&&(remaining===null||remaining>0);
 const turnLabel=mode==='training'?'Сторона '+(state.turn+1):state.turn===player?'Ваш ход':mode==='solo'?'Ход компьютера':'Ход друга';
 const heading=document.querySelector('.billiards>header h1'),headingState=!mode||!tableView?'room':spectating?'spectator':!online?'waiting':state.winner!==null?'finished':mode==='training'?'training':state.turn===player?'mine':'opponent';
 const headingText={spectator:state.winner==='draw'?'Ничья':state.winner!==null?'Победил игрок '+(state.winner+1):'Ход игрока '+(state.turn+1),room:'Бильярдная',waiting:'Ждём соперника',finished:state.winner==='draw'?'Ничья':'Партия завершена',training:'Тренировка',mine:'Ваш ход',opponent:'Ход соперника'}[headingState];
 if(heading&&(heading.dataset.turn!==headingState||heading.textContent!==headingText)){heading.dataset.turn=headingState;heading.textContent=headingText;}
 $('status').textContent=state.winner==='draw'?'Ничья по соглашению':mode==='training'&&state.winner!==null?'Сторона '+(state.winner+1)+' выиграла партию':mode!=='training'&&series.winner!==null&&state.winner!==null?(series.winner===player?'Вы выиграли '+(series.target===3?'серию':'партию'):'Победил '+(mode==='solo'?'компьютер':'друг')):state.moving?'Шары в движении':state.winner!==null?(state.winner===player?'Вы выиграли партию':mode==='solo'?'Победил компьютер':'Победил друг'):state.pending?(state.turn===player?'Выберите продолжение партии':'Ждём решения соперника'):state.inHand?(turnLabel+' · биток с руки'+(state.handZone==='head'?' из дома':'')):state.breakPending?(state.turn===player?'Вы разбиваете пирамиду':mode==='solo'?'Компьютер разбивает пирамиду':'Друг разбивает пирамиду'):turnLabel;
 $('hint').textContent=connectionError||(!online?'':state.winner==='draw'?'Партия завершена вничью':state.winner!==null?'Партия завершена':state.moving?'Дождитесь остановки шаров':state.turn!==player?(mode==='solo'?'Ход компьютера':'Ход друга'):state.inHand?'Ваш ход · коснитесь свободного места для битка':tableView?'Ваш ход · вращайте кий за заднюю часть и выберите силу':'Нажмите «К столу», чтобы сделать удар');
 for(let i=0;i<2;i++){const g=state.groups[i];$('p'+(i+1)).textContent=(mode==='training'?'Сторона '+(i+1):i===player?'Вы':mode==='solo'?'Компьютер':'Друг')+' · '+(state.discipline==='pyramid'?'пирамида':g===null?'стол открыт':g===0?'сплошные':'полосатые')+' · '+state.scores[i]+'/'+(state.discipline==='pyramid'?8:7);$('p'+(i+1)).className=state.turn===i?'active':'';}
 $('seriesScore').hidden=mode==='training'||!online||series.target===1;$('seriesScore').textContent=series.target===3?'До 3 побед · Вы '+series.wins[player]+' : '+series.wins[1-player]+' '+(mode==='solo'?'Компьютер':'Друг')+' · партия '+series.round:'Одна партия';
 $('trainingControls').hidden=mode!=='training';const repeatAvailable=training.inspect().available;$('restoreShot').disabled=$('repeatShot').disabled=!repeatAvailable;
 $('again').hidden=mode!=='training'&&(state.winner===null||player!==0);$('again').textContent=mode==='training'?'Новая расстановка':series.target===3?(series.winner!==null?'Новая серия до 3 побед':'Следующая партия'):'Новая партия';
 if(mode==='training')$('hint').textContent=state.moving?'Наблюдайте удар или верните исходную позицию':'Без компьютера: управляйте обеими сторонами и пробуйте удар заново';else if(state.winner!==null&&mode==='online'&&player!==0)$('hint').textContent='Продолжение запускает создатель комнаты';
 settlement.render();matchup.render({state,profiles:mode==='solo'?[{name:equipment.inspect().nick||'Вы'},null]:playerProfiles,player,mode,tableView,ready:online});
 resultPanel.render(state,{mode:spectating?null:mode,player,series,tableView});
 shotTools.render(state,can&&tableView);const display=rulesUI.render(state,{player,mode,tableView,can});turnGuide.render(state,{player,mode,tableView,ready:online,call:rulesUI.options(state),placing:rulesUI.isPlacing(state),penaltyPicking:rulesUI.isChoosingPenalty()});const strikePreview=playback&&Date.now()+clockOffset<playback.startedAt?{...playback.move,angle:playback.angle,cueStyle:playback.cueStyle,nick:playback.nick}:null;
 const remote=(mode==='online'&&state.turn!==player||spectating)&&opponentAim?.player===state.turn&&opponentAim.shot===state.shot?opponentAim:null;
 shownAim=strikePreview||(mode==='solo'&&state.turn===1&&botPlan?.type==='shot'?{...botPlan,cueStyle:'maple'}:remote);
 const ownCue=equipment.inspect(),cueStyle=CUES.find(c=>c.id===(shownAim?.cueStyle||ownCue.selected))||CUES[0],cueNick=shownAim?shownAim.nick||'Соперник':ownCue.nick,cueKey=cueStyle.id+':'+cueNick;
 if(renderedCue!==cueKey){room?.setCue(cueStyle,cueNick);renderedCue=cueKey;}
 const aimState=shownAim?{...display,cueId:shownAim.cueId??0}:display;
 if(tableView)room?.render(aimState,shownAim?.angle??angle,!state.moving&&!state.inHand&&!state.pending&&state.winner===null&&(can||!!shownAim));raf=requestAnimationFrame(frame);
}
const matchupObserver=new ResizeObserver(()=>{if(!tableView||matchup.element.hidden)return;const top=Math.ceil(matchup.element.getBoundingClientRect().bottom+8)+'px';if(document.body.style.getPropertyValue('--billiards-top-height')!==top){document.body.style.setProperty('--billiards-top-height',top);room?.setView('table');}});matchupObserver.observe(matchup.element);
const controlsObserver=new ResizeObserver(()=>{const height=tableDock.getBoundingClientRect().height;if(height){const next=Math.ceil(height)+'px';if(document.body.style.getPropertyValue('--billiards-controls-height')!==next){document.body.style.setProperty('--billiards-controls-height',next);if(tableView)room?.setView('table');}}});controlsObserver.observe(tableDock);
openEntry(initialEntry);document.body.classList.add('billiards-entry-ready');if(parent!==window)parent.postMessage({type:'p21-billiards-ready'},location.origin);
const watchCode=new URLSearchParams(location.search).get('watch');if(/^[A-HJ-NP-Z2-9]{10}$/.test(watchCode||'')){stop();spectating=true;mode='spectator';revision=-1;net=createSession({request,onUpdate:adopt,onError(message){connectionError=message;status(message);}});net.start(false,watchCode,{watch:true});$('lobby').hidden=true;}
const inviteCode=new URLSearchParams(location.search).get('room');if(/^[A-HJ-NP-Z2-9]{10}$/.test(inviteCode||'')){$('code').value=inviteCode;start(false);}
raf=requestAnimationFrame(frame);
// Every new party starts with discipline and ball-set selection, including the solo shortcut.
window.PokerBilliards={inspect:()=>({mode,spectating,ready:online,tableView,equipment:equipment.inspect(),rules:rulesUI.inspect(),shotTools:shotTools.inspect(),training:training.inspect(),turnSeconds,turnDeadline,replay:replayPlayer.inspect(),graphics:room?.inspect(),shownAim:shownAim?{...shownAim}:null,series:structuredClone(series),angle,state:structuredClone(state)})};
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);controlsObserver.disconnect();matchupObserver.disconnect();stop();replayPlayer.dispose();room?.dispose();});
