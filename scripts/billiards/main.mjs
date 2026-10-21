import {createGame,step,shoot,action,validState} from './engine.mjs';
import {createSession} from './network.mjs';
import {createRoom} from './room.mjs';
import {botMove} from './solo.mjs';
const $=id=>document.getElementById(id);
let state=createGame(),canonical=state,player=0,online=false,net=null,angle=0,tableView=false,last=performance.now(),acc=0,raf=0,revision=-1,playback=null,clockOffset=0,connectionError='',mode=null,botAt=0;
let room;
try{room=createRoom($('room'));}catch(_){$('connection').textContent='Не удалось открыть 3D. Попробуйте обновить страницу в браузере.';$('create').disabled=$('join').disabled=$('solo').disabled=true;}
async function request(body){let source=window;try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}const auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin;const r=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify({...auth,...body}),signal:AbortSignal.timeout(10000)});const d=await r.json();if(!r.ok||!d.ok)throw Error(d.error||'Сервер недоступен. Попробуйте снова.');return d;}
function status(text){$('connection').textContent=text;}
function setView(value){tableView=value;room?.setView(value?'table':'room');document.body.classList.toggle('billiards-table-view',value);$('view').textContent=value?'В комнату':'К столу';}
function stop(){online=false;mode=null;botAt=0;playback=null;net?.close();net=null;connectionError='';$('create').disabled=$('join').disabled=false;$('lobby').hidden=false;$('game').hidden=true;setView(false);}
function solo(){if(!room)return;stop();mode='solo';state=createGame();canonical=state;player=0;online=true;angle=0;acc=0;state.message='Вы разбиваете пирамиду · партия с компьютером';$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ОДИНОЧНАЯ ПАРТИЯ · КОМПЬЮТЕР';setView(true);last=performance.now();}
function move(value){if(mode==='solo')return action(state,player,value);return net?.move(value);}
function adopt(d){
 if(!validState(d.state))return;
 connectionError='';clockOffset=d.serverNow-Date.now();player=d.player;online=d.ready;$('roomCode').textContent=d.roomId;$('invite').hidden=d.player!==0;$('create').disabled=$('join').disabled=false;
 if(d.ready){$('lobby').hidden=true;$('game').hidden=false;$('matchMode').textContent='ПАРТИЯ С ДРУГОМ · ОНЛАЙН';}else status('Комната '+d.roomId+' · ждём друга');
 if(d.revision===revision)return;
 revision=d.revision;canonical=d.state;playback=d.playback;
 if(playback&&validState(playback.before)&&Date.now()+clockOffset<playback.startedAt+playback.durationMs){state=structuredClone(playback.before);shoot(state,playback.angle,playback.power);const elapsed=Math.max(0,Date.now()+clockOffset-playback.startedAt);for(let i=0;i<Math.floor(elapsed/1000*120)&&state.moving;i++)step(state);}else{state=canonical;playback=null;}
 if(d.ready&&!tableView)setView(true);
 acc=0;last=performance.now();
}
function start(host){const code=$('code').value.toUpperCase().replace(/\s/g,'');if(!host&&!/^[A-HJ-NP-Z2-9]{10}$/.test(code)){status('Введите код из 10 символов, который прислал друг.');return;}stop();mode='online';revision=-1;$('create').disabled=$('join').disabled=true;status(host?'Создаём комнату…':'Подключаемся…');net=createSession({request,onUpdate:adopt,onError(message,fatal){connectionError=message;online=false;status(message);if(fatal){$('create').disabled=$('join').disabled=false;}else $('hint').textContent=message;}});net.start(host,code);}
$('solo').onclick=solo;$('create').onclick=()=>start(true);$('join').onclick=()=>start(false);$('code').onkeydown=e=>{if(e.key==='Enter')start(false);};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('roomCode').textContent);status('Код скопирован — отправьте его другу.');}catch(_){status('Код комнаты: '+$('roomCode').textContent);}};
$('view').onclick=()=>setView(!tableView);$('power').oninput=()=>{$('powerValue').textContent=$('power').value+'%';};$('shoot').onclick=()=>move({type:'shot',angle,power:Number($('power').value)/100});$('again').onclick=()=>mode==='solo'?solo():net?.move(null,true);$('modes').onclick=()=>{stop();status('Выберите одиночную партию или игру с другом.');};
let dragging=false;
function aim(e){if(!tableView||!online||state.turn!==player||state.moving||state.winner!==null)return;const p=room.point(e.clientX,e.clientY);if(!p)return;if(state.inHand){if(e.type==='pointerdown')move({type:'place',x:p.x,y:p.y});return;}const b=state.balls[0];angle=Math.atan2(p.y-b.y,p.x-b.x);}
$('room').onpointerdown=e=>{dragging=true;$('room').setPointerCapture(e.pointerId);aim(e);};$('room').onpointermove=e=>{if(dragging)aim(e);};$('room').onpointerup=$('room').onpointercancel=()=>dragging=false;
$('rulesButton').onclick=()=>$('rules').showModal();$('closeRules').onclick=()=>$('rules').close();$('back').onclick=()=>{stop();if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.assign('./');};
function frame(now){
 const dt=Math.min((now-last)/1000,.1);last=now;
 if(mode==='solo'){
  acc+=dt;while(acc>=1/120&&state.moving){step(state);acc-=1/120;}if(!state.moving)acc=0;
  if(state.turn===1&&!state.moving&&state.winner===null){if(!botAt)botAt=now+650;if(now>=botAt){const value=botMove(state);if(value)action(state,1,value);botAt=0;}}else botAt=0;
 }else if(playback&&Date.now()+clockOffset>=playback.startedAt){acc+=dt;while(acc>=1/120&&state.moving){step(state);acc-=1/120;}if(Date.now()+clockOffset>=playback.startedAt+playback.durationMs){state=canonical;playback=null;}}
 const can=online&&state.turn===player&&!state.moving&&state.winner===null;
 $('shoot').disabled=!can||state.inHand||!tableView;$('status').textContent=mode==='solo'?(state.winner!==null?(state.winner===0?'Вы выиграли партию':'Победил компьютер'):state.moving?'Шары в движении':state.inHand?(state.turn===0?'Фол · установите биток':'Фол · компьютер устанавливает биток'):state.shot===0?'Вы разбиваете пирамиду':state.turn===0?'Ваш ход':'Ход компьютера'):state.message;
 $('hint').textContent=connectionError||(!online?'':state.winner!==null?'Партия завершена':state.moving?'Дождитесь остановки шаров':state.turn!==player?(mode==='solo'?'Ход компьютера':'Ход друга'):state.inHand?'Ваш ход · коснитесь свободного места для битка':tableView?'Ваш ход · укажите направление и силу удара':'Нажмите «К столу», чтобы сделать удар');
 for(let i=0;i<2;i++){const g=state.groups[i];$('p'+(i+1)).textContent=(i===player?'Вы':mode==='solo'?'Компьютер':'Друг')+' · '+(g===null?'группа не выбрана':g===0?'сплошные':'полосатые')+' · '+state.scores[i]+'/7';$('p'+(i+1)).className=state.turn===i?'active':'';}
 $('again').hidden=state.winner===null||player!==0;if(tableView)room?.render(state,angle,can&&!state.inHand);raf=requestAnimationFrame(frame);
}
const controlsObserver=new ResizeObserver(()=>{const height=$('game').getBoundingClientRect().height;if(height)document.body.style.setProperty('--billiards-controls-height',Math.ceil(height+16)+'px');});controlsObserver.observe($('game'));
raf=requestAnimationFrame(frame);
if(new URLSearchParams(location.search).get('mode')==='solo')solo();
window.PokerBilliards={inspect:()=>({mode,ready:online,tableView,state:structuredClone(state)})};
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);controlsObserver.disconnect();stop();room?.dispose();});
