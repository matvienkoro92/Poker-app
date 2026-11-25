import {drivingDirections,navigationText} from './navigation.mjs';
import {thumbstick} from '../shared/thumbstick.mjs';
import {mapPoint,mapPercent,lighthouseShore,shores,lagoon,parks,lots,roads,landmarks,lunaSite,metroNearest,missionSites} from './metropolis.mjs';
import {createRenderScheduler} from '../shared/render-scheduler.mjs';
import {create,step,interact,rescue,subject,prompt,objective,checkpoint,notice} from './engine.mjs';
import {BUILDINGS,ROAD_X,ROAD_Z,CLUB,PORT,HOME,PICKUP,VILLA,ISLAND,GARAGE_RADIO,GATE,ESTATE,roadRoute,waterfrontBasin,waterfrontWaterEdges} from './world.mjs';
import {loadCityGarage} from './garage.mjs';
import {createCityScene} from './scene.mjs';
import {createAwardInspector} from './award-inspector.mjs';
let garage=null,radioActive=false,renderLoop=null;
function syncCityRadio(active){if(radioActive===active)return;radioActive=active;window.pokerSyncGarageRadio?.(active);}
const $=id=>document.getElementById(id),SAVE='poker21-city:v1';
let saved={};try{saved=JSON.parse(localStorage.getItem(SAVE)||'{}')||{};}catch(_){}
let state=create(saved),view=null,started=false,paused=true,disposed=false,last=0,acc=0,savePhase=state.phase,showedResult=false,quality='standard',soundEnabled=saved.sound===true,lastMapTime=-Infinity;
const keys=new Set(),stick={x:0,y:0,id:null},held={gas:false,brake:false,left:false,right:false},controls=new Map(),listeners=[];let cameraDrag=null,lastCameraDrag=-10,lastHealth=100;
function on(target,event,fn,opts){target.addEventListener(event,fn,opts);listeners.push(()=>target.removeEventListener(event,fn,opts));}
function save(){try{localStorage.setItem(SAVE,JSON.stringify({...checkpoint(state),sound:soundEnabled,best:saved.best||null}));}catch(_){}}
function clearInput(){keys.clear();controls.clear();for(const [id,key] of driveButtons){held[key]=false;$(id).removeAttribute('data-held');}stick.x=stick.y=0;stick.id=null;cameraDrag=null;$('cityStick').querySelector('i').style.transform='translate(-50%,-50%)';}
function freeze(){previousCar=null;paused=true;syncCityRadio(false);clearInput();audio.silence();last=0;acc=0;}
function resume(){if(!started||state.failed||document.hidden)return;paused=false;last=0;acc=0;renderLoop?.request();}
function pause(){if(awardInspector.isOpen||!started||$('cityPauseDialog').open||$('cityResult').open||$('cityMapDialog').open)return;freeze();$('cityPauseDialog').showModal();}
function reset(){state=create({completed:state.completed});savePhase=state.phase;showedResult=false;save();$('cityResult').close();$('cityPauseDialog').close();document.body.classList.remove('city-failed');view.orbit.yaw=0;view.orbit.pitch=.24;resume();updateUI();}
const awardInspector=createAwardInspector({getInteraction:()=>view?.awards,getState:()=>state,freeze,resume});
let radioDialog=null;
function openCityRadio(){
 if(!window.pokerGarageRadioHtml)return;
 freeze();
 if(!radioDialog){radioDialog=document.createElement('dialog');radioDialog.className='city-dialog city-stereo-dialog';radioDialog.setAttribute('aria-label','Магнитофон гаража');radioDialog.innerHTML='<button type="button" data-city-radio-close aria-label="Закрыть магнитофон">×</button><img src="./assets/player-hall/garage-boombox-v1.webp" alt="Магнитофон Two Aces">'+window.pokerGarageRadioHtml();radioDialog.querySelector('[data-hall-garage]')?.remove();document.body.append(radioDialog);radioDialog.querySelector('[data-city-radio-close]').onclick=()=>radioDialog.close();radioDialog.addEventListener('close',()=>{syncCityRadio(false);resume();});}
 radioDialog.showModal();syncCityRadio(true);
}
const audio={context:null,engine:null,gain:null,enabled:false,start(){if(!soundEnabled)return;try{if(!this.context){const C=window.AudioContext||window.webkitAudioContext;this.context=new C();this.engine=this.context.createOscillator();this.gain=this.context.createGain();const filter=this.context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=420;this.engine.type='sawtooth';this.engine.frequency.value=48;this.gain.gain.value=0;this.engine.connect(filter).connect(this.gain).connect(this.context.destination);this.engine.start();}this.context.resume().catch(()=>{});}catch(_){soundEnabled=false;}},update(){if(!this.context||!this.gain)return;const active=soundEnabled&&!paused&&state.driving;this.gain.gain.setTargetAtTime(active?.018:0,this.context.currentTime,.12);this.engine.frequency.setTargetAtTime(42+Math.abs(state.car.speed)*4,this.context.currentTime,.08);},silence(){if(this.gain)this.gain.gain.value=0;},beep(f=500){if(!soundEnabled)return;this.start();if(!this.context)return;const o=this.context.createOscillator(),g=this.context.createGain(),t=this.context.currentTime;o.frequency.value=f;g.gain.setValueAtTime(.035,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);o.connect(g).connect(this.context.destination);o.start(t);o.stop(t+.18);o.onended=()=>{o.disconnect();g.disconnect();};}};
function soundUI(){const button=$('citySound');button.setAttribute('aria-pressed',String(soundEnabled));button.textContent=soundEnabled?'Выключить звук':'Включить звук';}
on($('citySound'),'click',()=>{soundEnabled=!soundEnabled;audio.start();soundUI();save();});soundUI();
on($('cityStart'),'click',()=>{if(!view)return;started=true;$('cityIntro').hidden=true;document.body.classList.add('city-started');$('cityControls').hidden=false;audio.start();resume();});
on($('cityPause'),'click',()=>{$('cityMapDialog').close();pause();});on($('cityResume'),'click',()=>{$('cityPauseDialog').close();resume();});
on($('cityPauseDialog'),'cancel',e=>{e.preventDefault();$('cityPauseDialog').close();resume();});
on($('cityRescue'),'click',()=>{rescue(state);$('cityPauseDialog').close();resume();});on($('cityRestart'),'click',reset);
on($('cityQuality'),'click',()=>{quality=quality==='standard'?'low':'standard';view.renderer.setPixelRatio(Math.min(devicePixelRatio,quality==='low'?1:1.5));view.renderer.shadowMap.enabled=quality!=='low';view.fit();$('cityQuality').textContent='Графика: '+(quality==='low'?'экономная':'стандарт');});
on($('cityMapButton'),'click',()=>{if(awardInspector.isOpen||!started||$('cityPauseDialog').open||$('cityResult').open)return;freeze();drawMap($('cityFullMap'),true);$('cityMapDialog').showModal();});
function closeMap(){$('cityMapDialog').close();resume();}on($('cityMapClose'),'click',closeMap);on($('cityMapDialog'),'cancel',e=>{e.preventDefault();closeMap();});
on($('cityResult'),'cancel',e=>e.preventDefault());on($('cityResultRestart'),'click',reset);
on($('cityResultContinue'),'click',()=>{const failed=state.failed;$('cityResult').close();if(failed){state=create(checkpoint(state));showedResult=false;document.body.classList.remove('city-failed');view.orbit.yaw=state.carrying?Math.PI:0;savePhase=state.phase;save();}else{state.win=false;showedResult=false;}resume();updateUI();});
function action(){if(paused||!started)return;if(awardInspector.open(awardInspector.near()))return;if(interact(state)){if(state.openRadio){state.openRadio=false;openCityRadio();clearInput();return;}if(state.openVilla){state.openVilla=false;returnToVilla();return;}audio.beep(state.carrying?660:420);clearInput();save();}updateUI();}
on($('cityAction'),'click',action);
on(window,'keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','ShiftLeft','ShiftRight','KeyE','KeyR','Escape'].includes(e.code))e.preventDefault();if(e.code==='Escape'&&!e.repeat){if(awardInspector.isOpen){awardInspector.close();return;}if(radioDialog?.open){radioDialog.close();return;}if($('cityPauseDialog').open){$('cityPauseDialog').close();resume();}else if($('cityMapDialog').open)closeMap();else pause();return;}if(paused)return;if(e.code==='KeyE'&&!e.repeat){action();return;}if(e.code==='KeyR'&&!e.repeat){rescue(state);return;}keys.add(e.code);});on(window,'keyup',e=>keys.delete(e.code));
const joy=$('cityStick');
on(joy,'pointerdown',e=>{if(paused||stick.id!==null)return;stick.origin={x:e.clientX,y:e.clientY};stick.id=e.pointerId;joy.setPointerCapture(e.pointerId);joyMove(e);e.preventDefault();});
function joyMove(e){if(stick.id!==e.pointerId)return;const v=thumbstick(stick.origin,e,joy.clientWidth*.34);stick.x=v.x;stick.y=v.y;joy.querySelector('i').style.transform='translate(calc(-50% + '+v.px+'px),calc(-50% + '+v.py+'px))';}
on(joy,'pointermove',joyMove);function joyEnd(e){if(e.pointerId!==stick.id)return;stick.id=null;stick.x=stick.y=0;joy.querySelector('i').style.transform='translate(-50%,-50%)';}on(joy,'pointerup',joyEnd);on(joy,'pointercancel',joyEnd);on(joy,'lostpointercapture',joyEnd);
const driveButtons=[['cityGas','gas'],['cityBrake','brake'],['cityLeft','left'],['cityRight','right']];
for(const [id,key] of driveButtons){
 const button=$(id);
 on(button,'pointerdown',event=>{
  if(paused||event.button!==0)return;
  event.preventDefault();
  button.setPointerCapture(event.pointerId);
  controls.set(event.pointerId,key);
  held[key]=true;
  button.setAttribute('data-held','');
 });
 for(const type of ['pointerup','pointercancel','lostpointercapture']){
  on(button,type,event=>{
   if(!controls.delete(event.pointerId))return;
   held[key]=Array.from(controls.values()).includes(key);
   button.toggleAttribute('data-held',held[key]);
  });
 }
}
on($('cityCanvas'),'pointerdown',e=>{if(paused||!started)return;cameraDrag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};$('cityCanvas').setPointerCapture(e.pointerId);});
on($('cityCanvas'),'pointermove',e=>{if(!cameraDrag||cameraDrag.id!==e.pointerId)return;if(Math.hypot(e.clientX-cameraDrag.startX,e.clientY-cameraDrag.startY)>8)cameraDrag.moved=true;view.orbit.yaw-=(e.clientX-cameraDrag.x)*.006;view.orbit.pitch=Math.max(-.25,Math.min(.7,view.orbit.pitch+(e.clientY-cameraDrag.y)*.004));cameraDrag.x=e.clientX;cameraDrag.y=e.clientY;lastCameraDrag=state.time;});
on($('cityCanvas'),'pointerup',e=>{const drag=cameraDrag;cameraDrag=null;if(!paused&&started&&drag?.id===e.pointerId&&!drag.moved)awardInspector.open(view.awards.pick(e.clientX,e.clientY,state));});
for(const ev of ['pointercancel','lostpointercapture'])on($('cityCanvas'),ev,e=>{if(cameraDrag?.id===e.pointerId)cameraDrag=null;});
on(window,'blur',()=>{if(started)pause();clearInput();});on(document,'visibilitychange',()=>{if(document.hidden){if(started)pause();clearInput();audio.silence();}});
on(window,'resize',()=>view?.fit());on($('cityCanvas'),'contextmenu',e=>e.preventDefault());
on($('cityCanvas'),'webglcontextlost',e=>{e.preventDefault();freeze();$('cityIntro').hidden=false;$('cityLoading').textContent='Графический контекст прерван. Перезагрузи сцену, чтобы продолжить.';$('cityStart').disabled=false;$('cityStart').textContent='Перезагрузить город';$('cityStart').onclick=()=>location.reload();});
function returnToVilla(){save();freeze();let url=new URL('./?startapp=profile&cityVilla=1',location.href);try{const candidate=new URL(garage?.returnUrl||url.href);if(candidate.origin===location.origin&&!candidate.pathname.endsWith('city-play.html'))url=candidate;}catch(_){}try{sessionStorage.setItem('poker21-city:restore-villa','1');}catch(_){}location.assign(url.href);}
on($('cityExit'),'click',e=>{e.preventDefault();returnToVilla();});
on(document.querySelector('[data-city-villa-return]'),'click',e=>{e.preventDefault();returnToVilla();});
function rememberCityPosition(){
 if(!started)return;
 try{sessionStorage.setItem('poker21-city-map-position',JSON.stringify(mapPercent(subject(state))));}catch(_){}
}
on(window,'pagehide',()=>{rememberCityPosition();save();dispose();});
window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
function input(){const f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-(state.driving?0:stick.y),r=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+(state.driving?Number(held.right)-Number(held.left):stick.x);const forward=Math.max(-1,Math.min(1,f+(state.driving&&held.gas?1:0))),turn=Math.max(-1,Math.min(1,r));const yaw=view.orbit.yaw;return {forward,turn,brake:keys.has('Space'),pedalBrake:state.driving&&held.brake,x:Math.sin(yaw)*forward-Math.cos(yaw)*turn,z:Math.cos(yaw)*forward+Math.sin(yaw)*turn,run:held.gas||keys.has('ShiftLeft')||keys.has('ShiftRight')};}
let lastUI='';
function navigationObjective(){return destination?{title:destination.title||destination.name,detail:destination.detail||(destination.approach?'Подъезд · '+destination.name:'Маршрут на карте · можно сменить пункт назначения'),target:destination.approach||destination}:objective(state);}
let cachedNavigation=null;
function navigationFrom(p,target){
 if(cachedNavigation&&cachedNavigation.tx===target.x&&cachedNavigation.tz===target.z&&Math.hypot(p.x-cachedNavigation.x,p.z-cachedNavigation.z)<1)return cachedNavigation;
 const path=roadRoute(p,target);
 cachedNavigation={x:p.x,z:p.z,tx:target.x,tz:target.z,path,text:navigationText(drivingDirections(p,path,target))};
 return cachedNavigation;
}
function updateUI(){const o=navigationObjective(),p=subject(state);
 $('cityMission').hidden=!o.target&&!state.heat&&!state.failed;
 const d=o.target?Math.round(Math.hypot(p.x-o.target.x,p.z-o.target.z)):0,distanceText=!o.target?'':state.driving?navigationFrom(p,o.target).text:'◆ '+d+' м до цели',key=[o.title,o.detail,distanceText,state.driving,Math.round(state.health),Math.round(Math.abs(state.car.speed)),state.heat,Math.floor(state.escape),(awardInspector.near()?.item.id||prompt(state)),Math.ceil(state.noticeTime)].join('|');if(key===lastUI)return;lastUI=key;
 $('cityObjective').textContent=o.title;$('cityObjectiveDetail').textContent=o.detail;$('cityDistrict').textContent=p.z<-109?landmarks.reduce((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)<Math.hypot(b.x-p.x,b.z-p.z)?a:b).name:p.z>98&&p.x<130?'ВАША ВИЛЛА / ПРИБРЕЖНЫЙ САД':p.x>140?'ПРИЧАЛ / ОСТРОВ ВИЛЛЫ':p.x>118?'МОСТ / ДОРОГА В ГОРОД':p.x>59&&p.z<0?'ПРИЧАЛ ВИЛЛЫ / НАБЕРЕЖНАЯ':p.x>59?'\u041d\u0410\u0411\u0415\u0420\u0415\u0416\u041d\u0410\u042f / POKER21':p.z>20?'ЮЖНЫЙ КВАРТАЛ / ПРОМЕНАД':'TWO ACES / КЛУБНЫЙ КВАРТАЛ';$('cityDistance').textContent=distanceText;$('cityHeat').hidden=!state.heat;$('cityHeat').querySelector('progress').value=state.escape;
 const radio=$('cityRadio');radio.classList.toggle('is-hidden',state.noticeTime<=0);radio.querySelector('p').textContent=state.notice;radio.style.bottom=state.driving?'350px':'';
 const info=document.querySelector('.city-drive-info');info.hidden=!state.driving;$('citySpeed').textContent=Math.round(Math.abs(state.car.speed)*3.6);$('cityCondition').style.width=state.health+'%';$('cityCondition').style.background=state.health<35?'#ed9a74':'#d3d9ad';$('cityConditionText').textContent='КУЗОВ '+Math.round(state.health)+'%';
 const actionText=awardInspector.near()?'Рассмотреть награду · E':prompt(state),actionButton=$('cityAction');actionButton.classList.toggle('is-ready',!!actionText);actionButton.disabled=!actionText||Math.abs(state.driving?state.car.speed:0)>2;actionButton.querySelector('span').textContent=actionText?(actionText.includes('награду')?'Осмотреть':actionText.includes('Магнитофон')?'Музыка':actionText.includes('Выйти')?'Выйти':actionText.includes('руль')?'В машину':actionText.includes('Ромой')?'Рома':actionText.includes('виллу')?'Домой':actionText.includes('Вернуть')?'Передать':actionText.includes('кейс')?'Кейс':'Действие'):'Действие';actionButton.setAttribute('aria-label',actionText||'Действие недоступно');$('cityGas').querySelector('span').textContent=state.driving?'Газ':'Бежать';$('cityBrake').hidden=!state.driving;$('cityStick').hidden=state.driving;$('citySteering').hidden=!state.driving;$('cityControls').classList.toggle('city-controls-driving',state.driving);
 if(state.phase!==savePhase){savePhase=state.phase;save();}
 if((state.win||state.failed)&&!showedResult){showedResult=true;freeze();const won=state.win;$('cityResultBadge').textContent=won?'ДОСТАВКА / ВЫПОЛНЕНО':'ДОСТАВКА / ЕЩЁ ПОПЫТКА';$('cityResultTitle').textContent=won?'Все свои на месте.':'Рома уже выезжает.';const time=Math.floor(state.elapsed);if(won){saved.best=Math.min(saved.best||Infinity,time);save();}$('cityResultText').textContent=won?'Кейс с билетами вернулся в TWO ACES. Время: '+Math.floor(time/60)+' мин '+time%60+' с. Можно остаться в городе и свободно покататься.':'Машина повреждена. Продолжение вернёт тебя к последнему этапу доставки с целой машиной.';$('cityResultContinue').textContent=won?'Остаться в городе':'Продолжить доставку';document.body.classList.toggle('city-failed',!won);$('cityResult').showModal();audio.beep(won?880:180);}
}
let destination=null;
const destinationSelect=$('cityDestination');
function destinations(label,spots){
 const group=document.createElement('optgroup');group.label=label;
 for(const spot of spots){const opt=document.createElement('option');opt.textContent=spot.number?spot.number+'. '+spot.name:spot.name;opt.value=JSON.stringify(spot);group.append(opt);}
 destinationSelect.append(group);
}
destinations('Миссии Poker21',missionSites);
destinations('Город',[...landmarks,{...GATE,name:'ВИЛЛА'},{...HOME,name:'TWO ACES'},{...PICKUP,name:'ПОРТ'},{...lunaSite,approach:metroNearest(lunaSite)}]);
on(destinationSelect,'change',()=>{destination=destinationSelect.value?JSON.parse(destinationSelect.value):null;drawMap($('cityFullMap'),true);});
const cityAtlas=new Image();
cityAtlas.onload=()=>{if($('cityMapDialog').open)drawMap($('cityFullMap'),true);};
cityAtlas.src='assets/last-buy-in/optimized/poker21-city-map-locations-v5.webp';
function drawMap(canvas,full=false){const ctx=canvas.getContext('2d'),size=canvas.width,focus=subject(state),span=full?3760:370,k=size/span,cx=full?mapPoint(320,320).x:focus.x,cz=full?mapPoint(320,320).z:focus.z,X=x=>size/2+(x-cx)*k,Z=z=>size/2+(z-cz)*k;ctx.fillStyle='#153c43';ctx.fillRect(0,0,size,size);ctx.fillStyle='#6b8275';const illustrated=full&&cityAtlas.complete&&cityAtlas.naturalWidth>0;
 if(illustrated){const corner=mapPoint(0,0);ctx.drawImage(cityAtlas,X(corner.x),Z(corner.z),640*5.6*k,640*5.6*k);}
 else for(const poly of shores){ctx.beginPath();poly.forEach((p,i)=>i?ctx.lineTo(X(p.x),Z(p.z)):ctx.moveTo(X(p.x),Z(p.z)));ctx.closePath();ctx.fill();}
 if(!illustrated){
 ctx.fillStyle='#286171';ctx.beginPath();lagoon.forEach((p,i)=>i?ctx.lineTo(X(p.x),Z(p.z)):ctx.moveTo(X(p.x),Z(p.z)));ctx.closePath();ctx.fill();
 ctx.fillStyle='#88935f';for(const park of parks)ctx.fillRect(X(park.x-park.w/2),Z(park.z-park.d/2),park.w*k,park.d*k);
 ctx.fillStyle='#9eaa9d';for(const lot of lots){if(!full&&(Math.abs(lot.x-cx)>220||Math.abs(lot.z-cz)>220))continue;ctx.fillRect(X(lot.minX),Z(lot.minZ),lot.w*k,lot.d*k);}
 }ctx.fillStyle='#6b8275';ctx.strokeStyle=illustrated?'rgba(245,225,175,.42)':'#ccc5aa';ctx.lineWidth=Math.max(1,15*k);ctx.beginPath();
 for(const {a,b,width} of roads){if(!full&&(Math.max(a.x,b.x)<cx-span/2||Math.min(a.x,b.x)>cx+span/2||Math.max(a.z,b.z)<cz-span/2||Math.min(a.z,b.z)>cz+span/2))continue;ctx.beginPath();ctx.lineWidth=Math.max(1,width*k);ctx.moveTo(X(a.x),Z(a.z));ctx.lineTo(X(b.x),Z(b.z));ctx.stroke();}
 if(!illustrated){ctx.fillStyle='#6b8275';ctx.fillRect(X(-100),Z(-110),218*k,201*k);ctx.beginPath();ctx.ellipse(X(ISLAND.x),Z(ISLAND.z),ISLAND.rx*k,ISLAND.rz*k,0,0,Math.PI*2);ctx.fill();ctx.beginPath();lighthouseShore.forEach((p,i)=>i?ctx.lineTo(X(p.x),Z(p.z)):ctx.moveTo(X(p.x),Z(p.z)));ctx.closePath();ctx.fill();ctx.fillRect(X(20),Z(85),98*k,61*k);ctx.fillStyle='#8da778';ctx.fillRect(X(ESTATE.minX),Z(ESTATE.minZ),(ESTATE.maxX-ESTATE.minX)*k,(ESTATE.maxZ-ESTATE.minZ)*k);ctx.strokeStyle='#d5ba7d';ctx.lineWidth=1;ctx.strokeRect(X(53),Z(117),66*k,56*k);ctx.fillStyle='#d7b76b';ctx.beginPath();ctx.arc(X(lunaSite.x),Z(lunaSite.z),9*k,0,Math.PI*2);ctx.stroke();}
 // Draw the local street network over the campaign illustration too.
 const rect=(x,z,w,d)=>ctx.fillRect(X(x-w/2),Z(z-d/2),w*k,d*k);
 const basin=waterfrontBasin;ctx.fillStyle='#286171';ctx.beginPath();
 for(let z=basin.minZ;z<=basin.maxZ;z+=2)ctx.lineTo(X(waterfrontWaterEdges(z).east),Z(z));
 for(let z=basin.maxZ;z>=basin.minZ;z-=2)ctx.lineTo(X(waterfrontWaterEdges(z).west),Z(z));
 ctx.closePath();ctx.fill();
 ctx.fillStyle=illustrated?'#abae9c':'#819085';
 for(const x of ROAD_X)rect(x,-9,14,208);
 for(const z of ROAD_Z)rect(-1,z,192,14);
 ctx.fillStyle='#c6b690';rect(136,70,52,14);rect(157,67,10,74);
 rect(48,160,16,10);rect(87,160,16,15);rect(40,132.5,11,55);rect(56,105,43,11);rect(72,89,11,38);
 ctx.fillRect(X(55),Z(155),32*k,10*k);
 {ctx.fillStyle='#d6c8ac';for(const b of BUILDINGS)ctx.fillRect(X(b.x-b.w/2),Z(b.z-b.d/2),b.w*k,b.d*k);for(const [b,c]of [[CLUB,'#315d52'],[PORT,'#4d686c'],[VILLA,'#e3c992']]){ctx.fillStyle=c;ctx.fillRect(X(b.x-b.w/2),Z(b.z-b.d/2),b.w*k,b.d*k);}}
 const o=navigationObjective(),p=subject(state);if(o.target){const route=navigationFrom(p,o.target).path;ctx.strokeStyle=full?'#102e39':'#ffda8d';ctx.lineWidth=full?6:2;ctx.setLineDash(full?[5,4]:[3,3]);ctx.beginPath();ctx.moveTo(X(p.x),Z(p.z));for(const v of route)ctx.lineTo(X(v.x),Z(v.z));ctx.lineTo(X(o.target.x),Z(o.target.z));ctx.stroke();if(full){ctx.lineWidth=3;ctx.strokeStyle='#ffda8d';ctx.stroke();}ctx.setLineDash([]);ctx.fillStyle='#ffe6a4';ctx.save();ctx.translate(X(o.target.x),Z(o.target.z));ctx.rotate(Math.PI/4);ctx.fillRect(-4,-4,8,8);ctx.restore();}
 ctx.fillStyle='#364955';for(const vehicle of [...state.traffic,...state.metroTraffic]){ctx.save();ctx.translate(X(vehicle.x),Z(vehicle.z));ctx.rotate(-vehicle.yaw);ctx.fillRect(-Math.max(1,1.1*k),-2.3*k,Math.max(2,2.2*k),4.6*k);ctx.restore();}
 ctx.fillStyle='#a8e8d5';ctx.beginPath();ctx.arc(X(state.car.x),Z(state.car.z),full?5:3.5,0,Math.PI*2);ctx.fill();if(state.heat){ctx.fillStyle='#f79778';ctx.font='bold '+(full?20:13)+'px Arial';ctx.fillText('★',X(state.police.x)-5,Z(state.police.z)+5);}

 ctx.font='bold '+(full?15:10)+'px Arial';ctx.fillStyle='#eff0d7';ctx.textAlign='center';ctx.fillText('N ↑',size-20,17);if(full){
  ctx.textBaseline='middle';ctx.font='bold 13px Arial';
  for(const site of missionSites){
   const x=X(site.x),z=Z(site.z);ctx.fillStyle=destination?.number===site.number?'#ae5525':'#243b37';
   ctx.strokeStyle='#f5d291';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,z,9,0,Math.PI*2);ctx.fill();ctx.stroke();
   ctx.fillStyle='white';ctx.fillText(site.number,x,z);
  }
  for(const [p,glyph] of [[VILLA,'⌂'],[lunaSite,'★']]){
   ctx.fillStyle='#164743';ctx.strokeStyle='#f5d291';ctx.beginPath();ctx.arc(X(p.x),Z(p.z),9,0,Math.PI*2);ctx.fill();ctx.stroke();
   ctx.fillStyle='#fff2af';ctx.fillText(glyph,X(p.x),Z(p.z));
  }
  ctx.textBaseline='alphabetic';
 }
 const markerX=X(p.x),markerZ=Z(p.z);
 ctx.save();ctx.fillStyle='#00768a';ctx.strokeStyle='#fff';ctx.lineWidth=full?3:2;
 ctx.beginPath();ctx.arc(markerX,markerZ,full?15:9,0,2*Math.PI);ctx.fill();ctx.stroke();
 if(full){
  const labelX=markerX>size/2?markerX-128:markerX+14,labelY=Math.min(size-32,Math.max(4,markerZ-36));
  ctx.fillStyle='#063b48';ctx.fillRect(labelX,labelY,116,32);
  ctx.font='bold 22px Arial';ctx.textAlign='center';ctx.fillStyle='white';ctx.fillText('Вы здесь',labelX+58,labelY+24);
 }
 ctx.restore();
 ctx.save();ctx.translate(X(p.x),Z(p.z));ctx.rotate(-p.yaw);ctx.fillStyle='#fff2cd';ctx.strokeStyle='#214348';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,full?9:6);ctx.lineTo(full?-6:-5,full?-6:-4);ctx.lineTo(full?6:5,full?-6:-4);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
}

const fixedStep=1/60;
let previousCar=null;
function renderDrivingState(){
 if(paused||!state.driving||!previousCar||previousCar.owner!==state.car)return state;
 const fraction=Math.min(1,acc/fixedStep),c=state.car;
 if(Math.hypot(c.x-previousCar.x,c.z-previousCar.z)>2)return state;
 return {...state,time:state.time-fixedStep+fraction*fixedStep,car:{...c,
  x:previousCar.x+(c.x-previousCar.x)*fraction,z:previousCar.z+(c.z-previousCar.z)*fraction,
  yaw:previousCar.yaw+Math.atan2(Math.sin(c.yaw-previousCar.yaw),Math.cos(c.yaw-previousCar.yaw))*fraction}};
}
function tick(t){if(disposed||!view||document.hidden)return;const dt=last?Math.min(.15,(t-last)/1000):1/60;last=t;if(!paused){acc+=dt;while(acc>=fixedStep){
 previousCar=state.driving?{owner:state.car,x:state.car.x,z:state.car.z,yaw:state.car.yaw}:null;
 step(state,input(),fixedStep);acc-=fixedStep;if(state.failed||state.win)break;}if(state.driving&&!cameraDrag&&state.time-lastCameraDrag>2){const diff=Math.atan2(Math.sin(state.car.yaw-view.orbit.yaw),Math.cos(state.car.yaw-view.orbit.yaw));view.orbit.yaw+=diff*(1-Math.exp(-dt*2));}}
 view.render(renderDrivingState(),dt,navigationObjective(),!started);updateUI();if(t-lastMapTime>=125){drawMap($('cityMinimap'));lastMapTime=t;}audio.update();syncCityRadio(!document.hidden&&(!!radioDialog?.open||(!paused&&!state.driving&&Math.hypot(state.player.x-GARAGE_RADIO.x,state.player.z-GARAGE_RADIO.z)<10)));if(lastHealth>state.health){document.body.classList.add('city-result-effect');setTimeout(()=>document.body.classList.remove('city-result-effect'),250);}lastHealth=state.health;}
function dispose(){if(disposed)return;disposed=true;syncCityRadio(false);awardInspector.dispose();radioDialog?.remove();renderLoop?.dispose();listeners.forEach(f=>f());view?.dispose();audio.context?.close().catch(()=>{});}
renderLoop=createRenderScheduler({render:tick,fps:Infinity,active:()=>!paused});
for(const event of ['pointermove','pointerup','keydown','click'])on(document,event,()=>renderLoop.request());on(window,'resize',()=>renderLoop.request());
window.PokerCity={inspect(){return {player:{...state.player},car:{...state.car},phase:state.phase,carrying:state.carrying,driving:state.driving,paused,health:state.health,heat:state.heat,escape:state.escape,elapsed:state.elapsed,completed:state.completed,objective:objective(state),prompt:prompt(state),metrics:view?.metrics,villa:view?.villa,garage:garage?{source:garage.source,owner:garage.owner,look:{...garage.look}}:null};}};
(async()=>{try{garage=await loadCityGarage();view=await createCityScene($('cityCanvas'),text=>$('cityLoading').textContent=text,garage);if(disposed){view.dispose();return;}$('cityLoading').textContent=(garage.look.transport==='bmw-e60'?'Ваш BMW M5 E60':garage.look.transport==='mustang-gt500'?'Ваш Shelby GT500':garage.owner?'Ваш сохранённый МанкиCar Two ACES':'Клубный МанкиCar · гостевой заезд')+' · WASD или джойстик';$('cityStart').textContent=saved.carrying?'Продолжить доставку':'Начать с виллы →';$('cityStart').disabled=false;renderLoop.request();}catch(error){console.error('City failed to load',error);$('cityLoading').textContent=error.userMessage||'Не удалось загрузить 3D-сцену. Проверь соединение и поддержку WebGL в браузере.';$('cityStart').textContent='Повторить загрузку';$('cityStart').disabled=false;$('cityStart').onclick=()=>location.reload();}})();
