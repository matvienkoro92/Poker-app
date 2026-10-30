import {mountGameBackground} from '../board-games/backgrounds.mjs';
import {mountGameChat} from '../shared/game-chat.mjs';
import {mountClothGuidance} from './cloth-guidance.mjs';
import {createReactionPocketPicker} from './reaction-pocket-picker.mjs';
import billiardsReactionTurn from '../../lib/billiards-reaction-turn.js';
import {mountGameReactions} from '../shared/game-reactions.mjs';
import {createFrameLoop} from '../shared/frame-loop.mjs';
import {mountSoundSettings} from '../shared/sound-settings.mjs';
import {mountTurnStartSound} from '../shared/turn-start-sound.mjs';
import {mountConnectionNotice} from '../shared/connection-notice.mjs';
import {mountGameResume} from '../shared/game-resume.mjs';
import {mountTurnWarning} from '../shared/turn-warning.mjs';
import {ensureGameVersion} from '../shared/game-version.mjs';
import {showInsufficientChips} from '../shared/insufficient-chips.mjs';
import {mobileGraphics,createFrameBudget} from './render-budget.mjs';
import {ensureGameParticipation} from '../shared/game-participation.mjs';
import {mountShotAudio} from './shot-audio.mjs';
import {createAimSmoother} from './aim-smoothing.mjs';
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
let chosenStake=0,wager=null,currentRoomId='',leaving=false,connectionGeneration=0,sharedEquipment=null;
let state=createGame(),canonical=state,player=0,online=false,net=null,angle=0,tableView=false,last=performance.now(),acc=0,revision=-1,playback=null,clockOffset=0,connectionError='',mode=null,botAt=0;
let playerProfiles=[null,null];const matchup=mountMatchup();
let spectating=false,frameLoop=null,uiEpoch=0,lastUiKey='',cachedDisplay=null;
const aimSmoother=createAimSmoother();const shotAudio=mountShotAudio();
let opponentAim=null,botPlan=null,shownAim=null,renderedCue='';
let turnSeconds=null,turnDeadline=null,localClockKey='';
let series=createMatch(),canonicalSeries=series;const training=createTraining();
const replayPlayer=createReplayPlayer();let replayStart=0,replayAwaiting=false,lastPlayback=null,viewingReplay=false;
let room;
try{room=createRoom($('room'));}catch(_){$('connection').textContent='Не удалось открыть 3D. Попробуйте обновить страницу в браузере.';$('create').disabled=$('join').disabled=$('solo').disabled=$('training').disabled=true;}
let heroSource=window;try{if(parent!==window&&parent.location.origin===location.origin)heroSource=parent;}catch{}
const shotTools=mountShotTools({adjust:delta=>{angle=Math.atan2(Math.sin(angle+delta),Math.cos(angle+delta));}});
const turnGuide=mountTurnGuide();
const rulesUI=mountRules({move:value=>move(value),room});
const connectionNotice=mountConnectionNotice(document.querySelector('.billiards>header'));
const clockWarning=mountTurnWarning($('turnClock'));
const turnStartSound=mountTurnStartSound();
mountSoundSettings([document.querySelector('main.billiards>header')]);
const clothGuidance=mountClothGuidance({room:()=>room});
const reactionPocketPicker=createReactionPocketPicker({project:i=>room?.projectPocket(i),turn:()=>billiardsReactionTurn({state:['online','spectator'].includes(mode)?canonical:state,match:['online','spectator'].includes(mode)?canonicalSeries:series})});
const gameChat=mountGameChat({container:document.querySelector('main.billiards>header'),request});
const gameReactions=mountGameReactions({container:document.querySelector('main.billiards>header'),request,chooseTarget:()=>{if(!tableView)setView(true);return reactionPocketPicker.pick();},projectTarget:event=>Number.isInteger(event?.pocket)?room?.projectPocket(event.pocket):null,context:()=>({active:!!mode&&state?.winner===null&&(mode==='solo'||mode==='training'||online),online:mode==='online'||mode==='spectator',spectator:spectating,roomId:currentRoomId,player,playerNames:mode==='training'?['Сторона 1','Сторона 2']:playerProfiles.map((p,i)=>p?.name||(i===player?(mode==='solo'?equipment.inspect().nick||'Вы':'Вы'):'Соперник')),reactionTurn:billiardsReactionTurn({state:['online','spectator'].includes(mode)?canonical:state,match:['online','spectator'].includes(mode)?canonicalSeries:series})})});
const tableDock=document.createElement('section');tableDock.id='tableDock';matchup.element.querySelector('[data-side="0"]').insertBefore($('turnClock'),matchup.element.querySelector('[data-side="0"] .billiards-matchup__score'));tableDock.append($('turnGuide'),$('game'),$('trainingControls'),$('decisionOpen'),$('penaltyConfirm'));document.querySelector('main').append(tableDock);
const resultPanel=mountResultPanel(tableDock,()=>$('again').click());
let initialEntry=new URLSearchParams(location.search).get('mode')||'lobby';
try{if(parent!==window&&window.frameElement?.dataset.billiardsEntry)initialEntry=window.frameElement.dataset.billiardsEntry;}catch{}
if(!['tables','cues','lobby'].includes(initialEntry))initialEntry='lobby';
if(initialEntry!=='lobby')$('lobby').hidden=true;
const tableSkins=mountTableSkins({source:heroSource,room});
const equipment=mountCues({source:heroSource,room});
const roomToolbar=document.createElement('nav');roomToolbar.className='room-toolbar';roomToolbar.setAttribute('aria-label','Настройки бильярдной');roomToolbar.append($('cueButton'),$('tableSkinButton'),$('rulesButton'),mountGameBackground({storageKey:'p21-billiards-background',onChange:theme=>{room?.setBackgroundTheme(theme);queueMicrotask(()=>frameLoop?.wake());}}));document.querySelector('main').append(roomToolbar);
const settlement=mountSettlement(roomToolbar,()=>({state,player,mode,ready:online,playback,tableView,wager}),value=>{move(value);if(mode==='solo'&&value.type==='draw-offer')action(state,1,{type:'draw-accept'});});
const leftRail=document.createElement('aside');leftRail.id='tableLeftRail';leftRail.setAttribute('aria-label','Шары и управление партией');document.querySelector('main').append(leftRail);
let entryOpened=false,currentEntry='';
function openEntry(entry){if(!['tables','cues','lobby'].includes(entry)||mode!==null||entryOpened&&currentEntry===entry)return;entryOpened=true;currentEntry=entry;for(const d of document.querySelectorAll('dialog[open]'))d.close();setView(false);$('lobby').hidden=entry!=='lobby';if(entry==='tables')tableSkins.open();if(entry==='cues')equipment.open();}
// Equipment opened from the villa is a separate window; closing it returns there.
for(const dialog of [$('cueDialog'),document.querySelector('.table-skin-dialog')])dialog.addEventListener('close',()=>{
 if(parent!==window&&['tables','cues'].includes(initialEntry)&&currentEntry===initialEntry)parent.postMessage({type:'p21-billiards-close'},location.origin);
});
window.addEventListener('message',event=>{if(parent!==window&&event.source===parent&&event.origin===location.origin&&event.data?.type==='p21-billiards-request-close'){leaveGame(true);return;}if(parent!==window&&event.source===parent&&event.origin===location.origin&&event.data?.type==='p21-billiards-open-entry')openEntry(event.data.entry);});

async function request(body,signal){if(['create','join','rematch','challenge'].includes(body.action)&&!await ensureGameVersion({roomId:body.roomId}))throw Error('Обновляем игру. Повторите вход после обновления.');let source=window;try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}const auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin,sentAt=Date.now();const r=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify({...auth,...body}),signal:signal||AbortSignal.timeout(10000)});const d=await r.json();if(signal?.aborted)throw Error('Запрос отменён');if(d.ready&&!online&&!await ensureGameVersion({roomId:d.roomId,watch:d.spectator===true}))throw Error('Обновляем игру.');if(Number.isFinite(d.serverNow))d.clockSample=d.serverNow-(sentAt+Date.now())/2;if(!r.ok||!d.ok){const e=Error(d.error||'Сервер недоступен. Попробуйте снова.');e.status=r.status;throw e;}return d;}
mountRanking(request);
const lobby=mountLobby({launch:(choice,settings)=>{chosenStake=settings?.stake||0;$(choice).click();},back:()=>leaveGame(true)});
const wagerNotice=document.createElement('p');wagerNotice.id='wagerNotice';wagerNotice.hidden=true;$('setupWaiting').prepend(wagerNotice);
const cancelWaiting=document.createElement('button');cancelWaiting.type='button';cancelWaiting.textContent='Отменить игру и вернуть фишки';cancelWaiting.hidden=true;$('setupWaiting').append(cancelWaiting);cancelWaiting.onclick=()=>leaveGame(false);
function clearCreateRequest(){try{sessionStorage.removeItem('billiards-wager-create');}catch{}}
function newCreateRequest(){return 'bw_'+Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,'0')).join('');}
function createRequest(){try{let key=sessionStorage.getItem('billiards-wager-create');if(!key){key=newCreateRequest();sessionStorage.setItem('billiards-wager-create',key);}return key;}catch{return newCreateRequest();}}
async function leaveGame(exit){
 if(leaving)return;leaving=true;
 try{
  if(!wager&&mode==='online'&&chosenStake&&!currentRoomId){let requestId='';try{requestId=sessionStorage.getItem('billiards-wager-create')||'';}catch{}if(requestId){await request({action:'cancel',requestId});clearCreateRequest();}}
  if(wager&&currentRoomId&&!['paid','refunded','cancelled'].includes(wager.status)&&!spectating){
   const waiting=['waiting','funding_host','funding_guest'].includes(wager.status);
   if(!window.confirm(waiting?'Отменить игру и вернуть ставку?':'Выйти и сдаться? Банк получит соперник за вычетом комиссии '+(wager?.feePercent??5)+'%.'))return;
   if(waiting){await request({action:'cancel',roomId:currentRoomId});clearCreateRequest();}
   else {await net?.move({type:'resign'});if(!['paid','refunded'].includes(wager?.status))throw Error('Завершение матча ещё обрабатывается. Дождитесь подтверждения.');}
  }
  stop();wager=null;currentRoomId='';lobby.reset();
  if(exit){$('lobby').hidden=true;setView(false);if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.assign('./');}
  else status('Выберите режим игры.');
 }catch(e){status(e.message);}finally{leaving=false;}
}
function status(text){showInsufficientChips(text);$('connection').textContent=text;}
function setView(value){if(mode===null)$('lobby').hidden=!value;tableView=value;if(value){leftRail.append($('ballShelves'),roomToolbar);matchup.element.prepend($('back'));$('back').textContent='←';roomToolbar.append(document.querySelector('[data-sound-settings]'),document.querySelector('[data-game-reactions]'),document.querySelector('[data-game-chat]'));}else{document.querySelector('main').append($('ballShelves'),roomToolbar);document.querySelector('.billiards>header').prepend($('back'));$('back').textContent='← Вилла';document.querySelector('.billiards>header').append(document.querySelector('[data-sound-settings]'),document.querySelector('[data-game-reactions]'),document.querySelector('[data-game-chat]'));}document.body.classList.toggle('billiards-table-view',value);if(parent!==window)parent.postMessage({type:'p21-billiards-table-view',active:value},location.origin);$('view').hidden=value;$('view').textContent=mode?'Вернуться к игре':'Сыграть';$('resumeGame').hidden=!mode||value;if(mode)$('game').hidden=!value;room?.setView(value?'table':'room');if(value&&room){frameBudget.reset();last=performance.now();frame(last);frameLoop?.wake();}}
function stop(){gameChat.reset();reactionPocketPicker.cancel();gameReactions.reset();lastPlayback=null;viewingReplay=false;turnStartSound.reset();connectionGeneration++;sharedEquipment=null;tableSkins.clearRoomEquipment();equipment.clearRoomEquipment();renderedCue='';shotAudio.reset();aimSmoother.reset();settlement.close();replayPlayer.reset();opponentAim=null;botPlan=null;shownAim=null;turnSeconds=null;turnDeadline=null;localClockKey='';training.clear();online=false;mode=null;botAt=0;playback=null;net?.close();net=null;connectionError='';$('create').disabled=$('join').disabled=false;$('lobby').hidden=false;$('game').hidden=true;setView(false);$('lobby').hidden=false;}
async function solo(next=false){if(!await ensureGameParticipation())return;if(!room)return;recordWin(series,state.winner);const previous=next&&mode==='solo'&&state.winner!==null?state:null,nextSeries=previous?nextMatch(series):createMatch(rulesUI.settings().raceTo),settings=previous?{discipline:previous.discipline,color:previous.color,callPockets:previous.callPockets!==false,breaker:1-(previous.breaker||0)}:rulesUI.settings();stop();mode='solo';series=nextSeries;canonicalSeries=series;state=createGame({...settings,seed:Math.floor(Math.random()*4294967296)});rulesUI.reset();shotTools.reset();canonical=state;player=0;online=true;angle=0;acc=0;state.message=state.turn===0?'Вы разбиваете пирамиду · биток можно передвинуть внутри дома':'Компьютер разбивает пирамиду';$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ОДИНОЧНАЯ ПАРТИЯ · КОМПЬЮТЕР';turnSeconds=rulesUI.settings().turnSeconds;turnDeadline=Date.now()+turnSeconds*1000;setView(true);last=performance.now();}
async function startTraining(){if(!await ensureGameParticipation())return;if(!room)return;stop();mode='training';state=createGame({...rulesUI.settings(),seed:Math.floor(Math.random()*4294967296)});canonical=state;series=createMatch();rulesUI.reset();shotTools.reset();player=0;online=true;angle=0;acc=0;$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ТРЕНИРОВКА · ВЫ УПРАВЛЯЕТЕ ОБЕИМИ СТОРОНАМИ';setView(true);last=performance.now();}
function move(value){if(spectating||viewingReplay)return;if(value?.type==='shot'){last=performance.now();acc=0;}frameLoop?.wake();if(mode==='training')return training.move(state,value,{angle,power:Number($('power').value),rules:rulesUI.options(state),spin:shotTools.value()});if(mode==='solo')return action(state,player,value);return net?.move(value);}
function restoreTraining(replay){if(mode!=='training')return;const saved=replay?training.replay():training.restore();if(!saved)return;state=saved.state;canonical=state;player=state.turn;angle=saved.controls.angle;$('power').value=saved.controls.power;$('powerValue').textContent=saved.controls.power+'%';rulesUI.restoreControls(saved.controls.rules,state);shotTools.restore(saved.controls.spin);acc=0;last=performance.now();botAt=0;}

let rematchReady=[false,false];
function adopt(d){rematchReady=d.rematchReady||[false,false];gameChat.observe(d);gameReactions.observe(d);frameLoop?.wake();connectionNotice.update(d.connection,d.player);
 if(d.cancelled){stop();wager=null;currentRoomId='';clearCreateRequest();lobby.reset();status('Игра отменена. Ставки возвращены на баланс Poker21.');return;}
 wager=d.wager||null;currentRoomId=d.roomId||'';
 if(wager){clearCreateRequest();wagerNotice.textContent='Ставка каждого — '+wager.stake.toLocaleString('ru-RU')+' фишек. Банк — '+wager.bank.toLocaleString('ru-RU')+'. Комиссия — '+(wager?.feePercent??5)+'%. Победителю — '+wager.payout.toLocaleString('ru-RU')+' фишек.';}
 wagerNotice.hidden=!wager;cancelWaiting.hidden=!wager||d.ready;
 if(!validState(d.state))return;const equipmentKey=JSON.stringify(d.equipment||{table:'classic',cue:'maple'})+':'+(d.equipmentOwner||'');if(sharedEquipment!==equipmentKey){sharedEquipment=equipmentKey;tableSkins.setRoomEquipment(d.equipment?.table||'classic');equipment.setRoomEquipment(d.equipment?.cue||'maple',d.equipmentOwner||d.playerProfiles?.[0]?.name||'');renderedCue='';}if(Array.isArray(d.playerProfiles))playerProfiles=d.playerProfiles;opponentAim=d.aim||null;turnSeconds=d.turnSeconds||null;turnDeadline=d.turnDeadline||null;
 const wasReady=online;connectionError='';if(!playback)clockOffset=d.clockSample??d.serverNow-Date.now();spectating=d.spectator===true;if(mode==='spectator'&&!spectating&&(d.player===0||d.player===1))mode='online';document.body.classList.toggle('billiards-spectator',spectating);document.querySelector('.billiards>header small').textContent=spectating?'ПРОСМОТР ПАРТИИ':'TWO ACES · ВИЛЛА У ОКЕАНА';player=spectating?0:d.player;online=d.ready;$('roomCode').textContent=d.roomId;$('inviteLink').value='https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=billiards_'+d.roomId;$('invite').hidden=d.player!==0;$('create').disabled=$('join').disabled=false;
 if(d.challengeSent)status('Вызов отправлен в чат игроков · ждём соперника');
 if(d.ready){status('');$('lobby').hidden=true;$('game').hidden=!tableView;$('matchMode').textContent='ПАРТИЯ С ДРУГОМ · ОНЛАЙН';}else {lobby.waiting();if(!d.challengeSent)status('Ожидаем подключения друга'+(d.turnSeconds?' · '+d.turnSeconds+' с на ход':''));}
 if(d.revision===revision)return;
 revision=d.revision;if(canonical?.seed!==d.state.seed)lastPlayback=null;viewingReplay=false;if(d.playback&&validState(d.playback.before))lastPlayback=structuredClone(d.playback);canonical=d.state;canonicalSeries=d.match||createMatch();playback=d.playback;series=playback?.matchBefore?structuredClone(playback.matchBefore):structuredClone(canonicalSeries);
 if(playback&&validState(playback.before)&&(wasReady||Date.now()+clockOffset<playback.startedAt+playback.durationMs)){state=structuredClone(playback.before);replayStart=performance.now()+playback.startedAt-(Date.now()+clockOffset);replayAwaiting=true;replayPlayer.start(playback);}else{replayPlayer.clear();state=canonical;series=structuredClone(canonicalSeries);playback=null;}

 if(d.ready&&!wasReady)setView(true);
 acc=0;last=performance.now();
}
let joinPreviewBusy=false;
async function previewJoin(code){
 if(joinPreviewBusy)return;joinPreviewBusy=true;
 try{const info=await request({action:'preview',roomId:code});if(info.participant){$('code').value=code;await start(false,false,true);return;}let dialog=$('joinConfirmation');if(!dialog){dialog=document.createElement('dialog');dialog.id='joinConfirmation';dialog.className='cue-dialog';dialog.innerHTML='<h2>Приглашение в бильярд</h2><p data-invite-info></p><button data-accept class="primary">Принять приглашение</button><button data-cancel>Отмена</button>';document.querySelector('main').append(dialog);}dialog.querySelector('h2').textContent=info.wager?'Игра на '+info.wager.stake+' фишек':'Приглашение в бильярд';dialog.querySelector('[data-accept]').textContent=info.wager?'Согласен, играть':'Принять приглашение';dialog.querySelector('[data-invite-info]').textContent=(info.wager?'Вы согласны сыграть? ':'')+(info.discipline==='pyramid'?'Русский бильярд':'Американский пул')+(info.discipline==='pool8'?(info.callPockets===false?' · Без указания луз':' · С указанием луз'):'')+' · '+(info.raceTo===3?'До 3 побед':'Одна партия')+' · '+(info.turnSeconds?info.turnSeconds+' секунд каждому на ход':'Без ограничения времени')+(info.wager?' · Ставка каждого: '+info.wager.stake+' фишек. Банк: '+info.wager.bank+'. Комиссия '+(wager?.feePercent??5)+'%, победителю '+info.wager.payout+' фишек. При входе ставка спишется с Poker21.':' · Вход 0');dialog.querySelector('[data-accept]').onclick=()=>{dialog.close();$('code').value=code;start(false,false,true);};dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();dialog.showModal();}catch(e){status(e.message);}finally{joinPreviewBusy=false;}
}
async function start(host,challenge=false,confirmed=false){if(!await ensureGameParticipation())return;const code=$('code').value.toUpperCase().replace(/\s/g,'');if(!host&&!/^[A-HJ-NP-Z2-9]{10}$/.test(code)){status('Введите код из 10 символов, который прислал друг.');return;}if(!host&&!confirmed){previewJoin(code);return;}stop();const startGeneration=connectionGeneration;mode='online';revision=-1;$('create').disabled=$('join').disabled=true;if(host){await Promise.all([equipment.ready,tableSkins.ready]);if(startGeneration!==connectionGeneration)return;}status(host?'Создаём комнату…':'Подключаемся…');net=createSession({request,getAim:()=>{if(!online||state.turn!==player||state.moving||state.pending||state.inHand||playback||!rulesUI.readyToAim(state))return null;const cue=equipment.inspect();return {angle,cueId:rulesUI.options(state).cueId,shot:state.shot,cueStyle:cue.selected,nick:cue.nick};},onUpdate:adopt,onError(message,fatal){connectionError=message;if(fatal)online=false;status(message);if(fatal){$('create').disabled=$('join').disabled=false;}else $('hint').textContent=message;}});net.start(host,code,{...rulesUI.settings(),challenge,...(host?{equipment:{cue:equipment.inspect().personalSelected,table:tableSkins.inspect().personalSelected}}:{}),...(host&&chosenStake?{stake:chosenStake,requestId:createRequest()}:{} )});}
$('challenge').onclick=()=>{if($('create').disabled)return;start(true,true);};
$('solo').onclick=()=>solo();$('training').onclick=startTraining;$('restoreShot').onclick=()=>restoreTraining(false);$('repeatShot').onclick=()=>restoreTraining(true);$('watchShot').onclick=()=>{if(viewingReplay){viewingReplay=false;playback=null;replayPlayer.clear();state=canonical;series=structuredClone(canonicalSeries);}else{if(!lastPlayback||playback||!online)return;viewingReplay=true;playback=lastPlayback;state=structuredClone(playback.before);series=structuredClone(playback.matchBefore||canonicalSeries);replayStart=performance.now();replayAwaiting=true;replayPlayer.start(playback);}lastUiKey='';frameLoop?.wake();};$('create').onclick=()=>start(true);$('join').onclick=()=>start(false);$('code').onkeydown=e=>{if(e.key==='Enter')start(false);};
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
$('resumeTable').onclick=()=>setView(true);$('view').onclick=()=>setView(!tableView);$('power').oninput=()=>{$('powerValue').textContent=$('power').value+'%';};$('shoot').onclick=()=>move({type:'shot',angle,power:Number($('power').value)/100,...rulesUI.options(state),spin:shotTools.value()});$('again').onclick=async()=>{if(mode==='training')return startTraining();if(mode==='solo')return solo(true);if(await ensureGameParticipation())net?.move(null,true);};$('modes').onclick=()=>leaveGame(false);
let dragging=false;
function aim(e){if(playback||spectating||!tableView||!online||state.turn!==player||state.moving||state.winner!==null)return;const p=room.point(e.clientX,e.clientY);if(!p)return;if(rulesUI.isPlacing(state)||state.breakPending&&e.shiftKey){if(e.type==='pointerdown'){if(move({type:'place',x:p.x,y:p.y})!==false)rulesUI.placed();}return;}if(e.type==='pointerdown'&&state.breakPending){const cue=state.balls.find(b=>b.id===0&&!b.pocket);if(cue&&Math.hypot(p.x-cue.x,p.y-cue.y)<22){rulesUI.togglePlacement();return;}}if(e.type==='pointerdown'&&rulesUI.chooseCue(state,p))return;if(!rulesUI.readyToAim(state))return;const id=rulesUI.options(state).cueId,b=state.balls.find(b=>b.id===id&&!b.pocket);if(!b)return;if(Math.hypot(p.x-b.x,p.y-b.y)<18)return;angle=Math.atan2(b.y-p.y,b.x-p.x);}
$('room').onselectstart=$('room').oncontextmenu=e=>e.preventDefault();
$('room').onpointerdown=e=>{e.preventDefault();window.getSelection()?.removeAllRanges();dragging=true;$('room').setPointerCapture(e.pointerId);aim(e);};$('room').onpointermove=e=>{if(dragging)aim(e);};$('room').onpointerup=$('room').onpointercancel=()=>dragging=false;
$('closeRules').onclick=()=>$('rules').close();$('back').onclick=()=>leaveGame(true);
function paintText(node,value){if(node.textContent!==value)node.textContent=value;}
const frameBudget=createFrameBudget(mobileGraphics().fps);
function frame(now){reactionPocketPicker.update();gameReactions.refresh();
 if(!frameBudget.ready(now,{hidden:document.hidden,active:!!mode&&(state.moving||!!playback||dragging||!!shownAim)})){if(document.hidden)last=now;return;}
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
  if(replayPlayer.sample(elapsed,state)&&elapsed>=playback.durationMs){state=canonical;series=structuredClone(canonicalSeries);playback=null;viewingReplay=false;replayPlayer.clear();}
  }
 }

 if(mode==='solo')recordWin(series,state.winner);if(mode==='training')player=state.turn;
 if(mode==='solo'&&turnSeconds){const key=[state.shot,state.turn,!!state.pending].join(':');if(state.moving){turnDeadline=null;localClockKey='';}else if(state.winner!==null)turnDeadline=null;else if(key!==localClockKey){localClockKey=key;turnDeadline=Date.now()+turnSeconds*1000;}else if(turnDeadline&&Date.now()>=turnDeadline){expireTurn(state);localClockKey='';}}
 const remaining=turnDeadline?Math.max(0,Math.ceil((turnDeadline-(Date.now()+(['online','spectator'].includes(mode)?clockOffset:0)))/1000)):null;
 const can=!spectating&&online&&!playback&&state.turn===player&&!state.moving&&state.winner===null&&(remaining===null||remaining>0);
 const uiKey=JSON.stringify([[state.seed,state.discipline,state.color,state.shot,state.turn,state.cueId,state.moving,state.winner,state.pending,state.inHand,state.handZone,state.breakPending,state.groups,state.scores,state.captured,state.missedTurns,state.drawOffer,state.drawOffered,state.lastShot,state.balls.map(b=>[b.id,b.pocket])],mode,online,tableView,spectating,!!playback,player,remaining,turnSeconds,series,wager,connectionError,playerProfiles,uiEpoch,innerWidth,innerHeight,rulesUI.inspect(),rulesUI.isPlacing(state),rulesUI.isChoosingPenalty(),shotTools.inspect(),training.inspect().available]);
 if(uiKey!==lastUiKey){
 lastUiKey=uiKey;
 $('turnClock').hidden=!tableView||remaining===null||(!viewingReplay&&state.moving)||canonical.winner!==null;
 paintText($('turnClock'),remaining===null?'':remaining+' с');
 clockWarning.update({seconds:remaining,active:!$('turnClock').hidden,sound:!spectating&&online&&state.turn===player,key:[currentRoomId,state.shot,state.turn,!!state.pending].join(':')});

 if(!state.moving&&!playback)turnStartSound.update({context:[currentRoomId,mode,series.number,series.round].join(':'),active:!!mode&&online&&!spectating&&mode!=='training'&&state.winner===null,mine:state.turn===player});
 const turnLabel=mode==='training'?'Сторона '+(state.turn+1):state.turn===player?'Ваш ход':mode==='solo'?'Ход компьютера':'Ход друга';
 const heading=document.querySelector('.billiards>header h1'),headingState=!mode||!tableView?'room':spectating?'spectator':!online?'waiting':state.winner!==null?'finished':mode==='training'?'training':state.turn===player?'mine':'opponent';
 const headingText={spectator:state.winner==='draw'?'Ничья':state.winner!==null?'Победил игрок '+(state.winner+1):'Ход игрока '+(state.turn+1),room:'Бильярдная',waiting:'Ждём соперника',finished:state.winner==='draw'?'Ничья':'Партия завершена',training:'Тренировка',mine:'Ваш ход',opponent:'Ход соперника'}[headingState];
 if(heading&&(heading.dataset.turn!==headingState||heading.textContent!==headingText)){heading.dataset.turn=headingState;heading.textContent=headingText;}
 paintText($('status'),viewingReplay?'Просмотр повтора · таймер идёт':state.winner==='draw'?'Ничья по соглашению':mode==='training'&&state.winner!==null?'Сторона '+(state.winner+1)+' выиграла партию':mode!=='training'&&series.winner!==null&&state.winner!==null?(series.winner===player?'Вы выиграли '+(series.target===3?'серию':'партию'):'Победил '+(mode==='solo'?'компьютер':'друг')):state.moving?'Шары в движении':state.winner!==null?(state.winner===player?'Вы выиграли партию':mode==='solo'?'Победил компьютер':'Победил друг'):state.pending?(state.turn===player?'Выберите продолжение партии':'Ждём решения соперника'):state.inHand?(turnLabel+' · биток с руки'+(state.handZone==='head'?' из дома':'')):state.breakPending?(state.turn===player?'Вы разбиваете пирамиду':mode==='solo'?'Компьютер разбивает пирамиду':'Друг разбивает пирамиду'):turnLabel);
 paintText($('hint'),connectionError||(!online?'':state.winner==='draw'?'Партия завершена вничью':state.winner!==null?'Партия завершена':state.moving?'Дождитесь остановки шаров':state.turn!==player?(mode==='solo'?'Ход компьютера':'Ход друга'):state.inHand?'Ваш ход · коснитесь свободного места для битка':tableView?'Ваш ход · вращайте кий за заднюю часть и выберите силу':'Нажмите «К столу», чтобы сделать удар'));
 for(let i=0;i<2;i++){const g=state.groups[i];paintText($('p'+(i+1)),(mode==='training'?'Сторона '+(i+1):i===player?'Вы':mode==='solo'?'Компьютер':'Друг')+' · '+(state.discipline==='pyramid'?'пирамида':g===null?'стол открыт':g===0?'сплошные':'полосатые')+' · '+state.scores[i]+'/'+(state.discipline==='pyramid'?8:7));const card=$('p'+(i+1)),active=state.turn===i?'active':'';if(card.className!==active)card.className=active;}
 $('seriesScore').hidden=mode==='training'||!online||series.target===1;paintText($('seriesScore'),series.target===3?'До 3 побед · Вы '+series.wins[player]+' : '+series.wins[1-player]+' '+(mode==='solo'?'Компьютер':'Друг')+' · партия '+series.round:'Одна партия');
 if(mode==='training'&&$('again').parentElement!==$('trainingControls'))$('trainingControls').append($('again'));else if(mode!=='training'&&$('again').parentElement!==$('game'))$('game').append($('again'));$('trainingControls').hidden=mode!=='training';$('restoreShot').hidden=$('repeatShot').hidden=mode!=='training';const replayParent=roomToolbar;if($('watchShot').parentElement!==replayParent)replayParent.append($('watchShot'));$('watchShot').classList.remove('spectator-replay');$('watchShot').title=viewingReplay?'К текущей партии':'Повтор удара';$('watchShot').setAttribute('aria-label',$('watchShot').title);$('watchShot').hidden=!['online','spectator'].includes(mode);$('watchShot').disabled=!lastPlayback||!!playback&&!viewingReplay||!online;paintText($('watchShot'),'📹');const repeatAvailable=training.inspect().available;$('restoreShot').disabled=$('repeatShot').disabled=!repeatAvailable;
 $('again').hidden=!!(wager&&wager.status!=='playing')||mode!=='training'&&(state.winner===null||mode==='spectator');paintText($('again'),mode==='training'?'Новая расстановка':series.target===3?(series.winner!==null?'Новая серия до 3 побед':'Следующая партия'):'Новая партия');
 if(mode==='training')paintText($('hint'),state.moving?'Наблюдайте удар или верните исходную позицию':'Без компьютера: управляйте обеими сторонами и пробуйте удар заново');else if(state.winner!==null&&mode==='online'&&player!==0)paintText($('hint'),'Продолжение запускает создатель комнаты');
 shotAudio.observe(state,tableView);settlement.render();matchup.render({state,profiles:mode==='solo'?[{name:equipment.inspect().nick||'Вы'},null]:playerProfiles,player,mode,tableView,ready:online});
 if(mode==='online'){$('again').disabled=!!rematchReady[player];paintText($('again'),rematchReady[player]?'Ждём согласия соперника':rematchReady[1-player]?'Принять новую партию':'Предложить новую партию');}else $('again').disabled=false;
 resultPanel.render(state,{mode:spectating?null:mode,player,series,tableView,wager,rematchReady});
 shotTools.render(state,can&&tableView);cachedDisplay=rulesUI.render(state,{player,mode:viewingReplay?'spectator':mode,tableView,can});turnGuide.render(state,{player,mode,tableView,ready:online,call:rulesUI.options(state),placing:rulesUI.isPlacing(state),penaltyPicking:rulesUI.isChoosingPenalty()});}
 const display={...state,cueId:cachedDisplay?.cueId??state.cueId,selectedTarget:cachedDisplay?.selectedTarget};
 const strikePreview=playback&&Date.now()+clockOffset<playback.startedAt?{...playback.move,angle:playback.angle,cueStyle:playback.cueStyle,nick:playback.nick}:null;
 const remote=(mode==='online'&&state.turn!==player||spectating)&&opponentAim?.player===state.turn&&opponentAim.shot===state.shot?opponentAim:null;
 const smoothRemote=remote?{...remote,angle:aimSmoother.sample([state.turn,state.shot,remote.cueId,remote.cueStyle].join(':'),remote.angle,dt)}:null;if(!remote||strikePreview)aimSmoother.reset();
 shownAim=strikePreview||(mode==='solo'&&state.turn===1&&botPlan?.type==='shot'?{...botPlan,cueStyle:'maple'}:smoothRemote);
 const ownCue=equipment.inspect(),cueStyle=CUES.find(c=>c.id===(sharedEquipment?ownCue.selected:shownAim?.cueStyle||ownCue.selected))||CUES[0],cueNick=sharedEquipment?ownCue.nick:shownAim?shownAim.nick||'Соперник':ownCue.nick,cueKey=cueStyle.id+':'+cueNick;
 if(renderedCue!==cueKey){room?.setCue(cueStyle,cueNick);renderedCue=cueKey;}
 const aimState=shownAim?{...display,cueId:shownAim.cueId??0}:display;
 if(tableView)room?.render(aimState,shownAim?.angle??angle,!state.moving&&!state.inHand&&!state.pending&&!rulesUI.isPlacing(state)&&state.winner===null&&(can&&rulesUI.readyToAim(state)||!!shownAim));
 clothGuidance.render(state,{active:tableView,can,placing:rulesUI.isPlacing(state),cueId:rulesUI.options(state).cueId,message:viewingReplay?'Повтор удара':(document.querySelector('#turnGuide:not([hidden]) strong')?.textContent||'')});
}
function refreshTableLayout(){if(!tableView)return;room?.setView('table');frameBudget.reset();frameLoop?.wake();}
const matchupObserver=new ResizeObserver(()=>{
 if(!tableView||matchup.element.hidden)return;
 const header=document.querySelector('.billiards>header'),cardsBottom=matchup.element.getBoundingClientRect().bottom,statusTop=Math.ceil(cardsBottom+6)+'px';
 if(document.body.style.getPropertyValue('--billiards-status-top')!==statusTop)document.body.style.setProperty('--billiards-status-top',statusTop);
 const top=Math.ceil(cardsBottom+6)+'px';
 if(document.body.style.getPropertyValue('--billiards-top-height')!==top){document.body.style.setProperty('--billiards-top-height',top);refreshTableLayout();}
});matchupObserver.observe(matchup.element);matchupObserver.observe(document.querySelector('.billiards>header'));

function reserveTableControls(){
 if(spectating){
  if(document.body.style.getPropertyValue('--billiards-controls-height')!=='0px'){document.body.style.setProperty('--billiards-controls-height','0px');if(tableView)refreshTableLayout();}
  return;
 }
 const dock=tableDock.getBoundingClientRect();if(!dock.height)return;
 const next=Math.ceil(dock.height)+'px';
 if(document.body.style.getPropertyValue('--billiards-controls-height')!==next){document.body.style.setProperty('--billiards-controls-height',next);if(tableView)refreshTableLayout();}
}
const controlsObserver=new ResizeObserver(reserveTableControls);
controlsObserver.observe(tableDock);
for(const el of tableDock.querySelectorAll('#turnGuide,#decisionOpen,#penaltyConfirm,#matchResult,#cuePickHint,.call-controls,.training-controls,#placeBreak'))controlsObserver.observe(el);

openEntry(initialEntry);document.body.classList.add('billiards-entry-ready');mountGameResume({container:$('setupMode').parentElement,request,resume:async code=>{$('code').value=code;await start(false,false,true);}});if(parent!==window)parent.postMessage({type:'p21-billiards-ready'},location.origin);
const watchCode=new URLSearchParams(location.search).get('watch');if(/^[A-HJ-NP-Z2-9]{10}$/.test(watchCode||'')){stop();spectating=true;mode='spectator';revision=-1;net=createSession({request,onUpdate:adopt,onError(message){connectionError=message;status(message);}});net.start(false,watchCode,{watch:true});$('lobby').hidden=true;}
const inviteCode=new URLSearchParams(location.search).get('room');if(/^[A-HJ-NP-Z2-9]{10}$/.test(inviteCode||'')){$('code').value=inviteCode;start(false);}
frameLoop=createFrameLoop(frame,{active:()=>!!mode&&(state.moving||!!playback||dragging||aimSmoother.moving)});
const wakeFrame=()=>frameLoop.wake(),invalidateUi=()=>{uiEpoch++;frameLoop.wake();};
for(const event of ['pointerdown','pointerup','click','input','change','keydown','close'])document.addEventListener(event,invalidateUi,true);
document.addEventListener('pointermove',wakeFrame,true);window.addEventListener('resize',invalidateUi);
const visibilityFrame=()=>{frameLoop.pause();last=performance.now();if(!document.hidden){uiEpoch++;frameLoop.wake();}};
document.addEventListener('visibilitychange',visibilityFrame);frameLoop.wake();
// Every new party starts with discipline and ball-set selection, including the solo shortcut.
window.PokerBilliards={projectBall:id=>{const b=state.balls.find(b=>b.id===id&&!b.pocket);return b?room?.projectPoint(b.x,b.y):null;},inspect:()=>({mode,spectating,ready:online,tableView,equipment:equipment.inspect(),rules:rulesUI.inspect(),shotTools:shotTools.inspect(),training:training.inspect(),turnSeconds,turnDeadline,replay:{...replayPlayer.inspect(),viewing:viewingReplay,available:!!lastPlayback},graphics:room?.inspect(),tableEquipment:tableSkins.inspect(),hostEquipment:sharedEquipment?{cue:equipment.inspect().selected,table:tableSkins.inspect().selected}:null,shownAim:shownAim?{...shownAim}:null,series:structuredClone(series),angle,state:structuredClone(state)})};
window.addEventListener('pageshow',event=>{if(event.persisted)visibilityFrame();});
window.addEventListener('pagehide',event=>{if(event.persisted){frameLoop.pause();return;}frameLoop?.dispose();for(const event of ['pointerdown','pointerup','click','input','change','keydown','close'])document.removeEventListener(event,invalidateUi,true);document.removeEventListener('pointermove',wakeFrame,true);document.removeEventListener('visibilitychange',visibilityFrame);window.removeEventListener('resize',invalidateUi);clockWarning.dispose();controlsObserver.disconnect();matchupObserver.disconnect();stop();gameReactions.dispose();gameChat.dispose();shotAudio.dispose();replayPlayer.dispose();room?.dispose();});
