import {createGame,step,shoot,action,validState} from './engine.mjs';
import {createSession} from './network.mjs';
import {createRoom} from './room.mjs';
import {botMove} from './solo.mjs';
import {mountCues} from './cues.mjs';
import {mountRules} from './rules-ui.mjs';
import {mountShotTools} from './shot-tools.mjs';
const $=id=>document.getElementById(id);
let state=createGame(),canonical=state,player=0,online=false,net=null,angle=0,tableView=false,last=performance.now(),acc=0,raf=0,revision=-1,playback=null,clockOffset=0,connectionError='',mode=null,botAt=0;
let room;
try{room=createRoom($('room'));}catch(_){$('connection').textContent='Не удалось открыть 3D. Попробуйте обновить страницу в браузере.';$('create').disabled=$('join').disabled=$('solo').disabled=true;}
let heroSource=window;try{if(parent!==window&&parent.location.origin===location.origin)heroSource=parent;}catch{}
const shotTools=mountShotTools({adjust:delta=>{angle=Math.atan2(Math.sin(angle+delta),Math.cos(angle+delta));}});
const rulesUI=mountRules({move:value=>move(value),room});
const equipment=mountCues({source:heroSource,room,openInitially:new URLSearchParams(location.search).get('mode')==='cues'});
async function request(body){let source=window;try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}const auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin;const r=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify({...auth,...body}),signal:AbortSignal.timeout(10000)});const d=await r.json();if(!r.ok||!d.ok)throw Error(d.error||'Сервер недоступен. Попробуйте снова.');return d;}
function status(text){$('connection').textContent=text;}
function setView(value){tableView=value;room?.setView(value?'table':'room');document.body.classList.toggle('billiards-table-view',value);$('view').textContent=value?'В комнату':'К столу';}
function stop(){online=false;mode=null;botAt=0;playback=null;net?.close();net=null;connectionError='';$('create').disabled=$('join').disabled=false;$('lobby').hidden=false;$('game').hidden=true;setView(false);}
function solo(){if(!room)return;const previous=mode==='solo'&&state.winner!==null?state:null,settings=previous?{discipline:previous.discipline,color:previous.color,breaker:1-(previous.breaker||0)}:rulesUI.settings();stop();mode='solo';state=createGame({...settings,seed:Math.floor(Math.random()*4294967296)});rulesUI.reset();shotTools.reset();canonical=state;player=0;online=true;angle=0;acc=0;state.message=state.turn===0?'Вы разбиваете пирамиду · биток можно передвинуть внутри дома':'Компьютер разбивает пирамиду';$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ОДИНОЧНАЯ ПАРТИЯ · КОМПЬЮТЕР';setView(true);last=performance.now();}
function move(value){if(mode==='solo')return action(state,player,value);return net?.move(value);}
function adopt(d){
 if(!validState(d.state))return;
 connectionError='';clockOffset=d.serverNow-Date.now();player=d.player;online=d.ready;$('roomCode').textContent=d.roomId;$('invite').hidden=d.player!==0;$('create').disabled=$('join').disabled=false;
 if(d.ready){$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ПАРТИЯ С ДРУГОМ · ОНЛАЙН';}else status('Комната '+d.roomId+' · ждём друга');
 if(d.revision===revision)return;
 revision=d.revision;canonical=d.state;playback=d.playback;
 if(playback&&validState(playback.before)&&Date.now()+clockOffset<playback.startedAt+playback.durationMs){state=structuredClone(playback.before);playback.move?action(state,state.turn,playback.move):shoot(state,playback.angle,playback.power);const elapsed=Math.max(0,Date.now()+clockOffset-playback.startedAt);for(let i=0;i<Math.floor(elapsed/1000*120)&&state.moving;i++)step(state);}else{state=canonical;playback=null;}
 if(d.ready&&!tableView)setView(true);
 acc=0;last=performance.now();
}
function start(host){const code=$('code').value.toUpperCase().replace(/\s/g,'');if(!host&&!/^[A-HJ-NP-Z2-9]{10}$/.test(code)){status('Введите код из 10 символов, который прислал друг.');return;}stop();mode='online';revision=-1;$('create').disabled=$('join').disabled=true;status(host?'Создаём комнату…':'Подключаемся…');net=createSession({request,onUpdate:adopt,onError(message,fatal){connectionError=message;online=false;status(message);if(fatal){$('create').disabled=$('join').disabled=false;}else $('hint').textContent=message;}});net.start(host,code,rulesUI.settings());}
$('solo').onclick=solo;$('create').onclick=()=>start(true);$('join').onclick=()=>start(false);$('code').onkeydown=e=>{if(e.key==='Enter')start(false);};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('roomCode').textContent);status('Код скопирован — отправьте его другу.');}catch(_){status('Код комнаты: '+$('roomCode').textContent);}};
$('view').onclick=()=>setView(!tableView);$('power').oninput=()=>{$('powerValue').textContent=$('power').value+'%';};$('shoot').onclick=()=>move({type:'shot',angle,power:Number($('power').value)/100,...rulesUI.options(state),spin:shotTools.value()});$('again').onclick=()=>mode==='solo'?solo():net?.move(null,true);$('modes').onclick=()=>{stop();status('Выберите одиночную партию или игру с другом.');};
let dragging=false;
function aim(e){if(!tableView||!online||state.turn!==player||state.moving||state.winner!==null)return;const p=room.point(e.clientX,e.clientY);if(!p)return;if(rulesUI.isPlacing(state)||state.breakPending&&e.shiftKey){if(e.type==='pointerdown'){move({type:'place',x:p.x,y:p.y});rulesUI.placed();}return;}if(e.type==='pointerdown'&&rulesUI.chooseCue(state,p))return;const id=rulesUI.options(state).cueId,b=state.balls.find(b=>b.id===id&&!b.pocket);if(!b)return;angle=Math.atan2(p.y-b.y,p.x-b.x);}
$('room').onpointerdown=e=>{dragging=true;$('room').setPointerCapture(e.pointerId);aim(e);};$('room').onpointermove=e=>{if(dragging)aim(e);};$('room').onpointerup=$('room').onpointercancel=()=>dragging=false;
$('closeRules').onclick=()=>$('rules').close();$('back').onclick=()=>{stop();if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.assign('./');};
function frame(now){
 const dt=Math.min((now-last)/1000,.1);last=now;
 if(mode==='solo'){
  acc+=dt;while(acc>=1/120&&state.moving){step(state);acc-=1/120;}if(!state.moving)acc=0;
  if(state.turn===1&&!state.moving&&state.winner===null){if(!botAt)botAt=now+650;if(now>=botAt){const value=botMove(state);if(value)action(state,1,value);botAt=0;}}else botAt=0;
 }else if(playback&&Date.now()+clockOffset>=playback.startedAt){acc+=dt;while(acc>=1/120&&state.moving){step(state);acc-=1/120;}if(Date.now()+clockOffset>=playback.startedAt+playback.durationMs){state=canonical;playback=null;}}
 const can=online&&state.turn===player&&!state.moving&&state.winner===null;
 const turnLabel=state.turn===player?'Ваш ход':mode==='solo'?'Ход компьютера':'Ход друга';
 $('status').textContent=state.moving?'Шары в движении':state.winner!==null?(state.winner===player?'Вы выиграли партию':mode==='solo'?'Победил компьютер':'Победил друг'):state.pending?((state.turn===player?'Ваш выбор':'Выбор соперника')+' · '+state.message):state.inHand?(turnLabel+' · биток с руки'+(state.handZone==='head'?' из дома':'')):state.breakPending?(state.turn===player?'Вы разбиваете пирамиду':mode==='solo'?'Компьютер разбивает пирамиду':'Друг разбивает пирамиду'):turnLabel;
 $('hint').textContent=connectionError||(!online?'':state.winner!==null?'Партия завершена':state.moving?'Дождитесь остановки шаров':state.turn!==player?(mode==='solo'?'Ход компьютера':'Ход друга'):state.inHand?'Ваш ход · коснитесь свободного места для битка':tableView?'Ваш ход · укажите направление и силу удара':'Нажмите «К столу», чтобы сделать удар');
 for(let i=0;i<2;i++){const g=state.groups[i];$('p'+(i+1)).textContent=(i===player?'Вы':mode==='solo'?'Компьютер':'Друг')+' · '+(state.discipline==='pyramid'?'пирамида':g===null?'стол открыт':g===0?'сплошные':'полосатые')+' · '+state.scores[i]+'/'+(state.discipline==='pyramid'?8:7);$('p'+(i+1)).className=state.turn===i?'active':'';}
 $('again').hidden=state.winner===null||player!==0;shotTools.render(state,can&&tableView);const display=rulesUI.render(state,{player,mode,tableView,can});if(tableView)room?.render(display,angle,can&&!state.inHand&&!state.pending);raf=requestAnimationFrame(frame);
}
const controlsObserver=new ResizeObserver(()=>{const height=$('game').getBoundingClientRect().height;if(height)document.body.style.setProperty('--billiards-controls-height',Math.ceil(height+16)+'px');});controlsObserver.observe($('game'));
raf=requestAnimationFrame(frame);
// Every new party starts with discipline and ball-set selection, including the solo shortcut.
window.PokerBilliards={inspect:()=>({mode,ready:online,tableView,equipment:equipment.inspect(),rules:rulesUI.inspect(),shotTools:shotTools.inspect(),angle,state:structuredClone(state)})};
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);controlsObserver.disconnect();stop();room?.dispose();});
