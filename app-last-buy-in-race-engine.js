/* Stadium kart racing: fixed-step simulation, shared road geometry and fair AI. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.LastBuyInRaceEngine=factory();})(globalThis,function(){
'use strict';const LAP=9800,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mobility={bicycle:{name:'Велосипед',cruise:1.2,max:1.6},scooter:{name:'Самокат',cruise:1.35,max:1.8},hoverboard:{name:'Скейт',cruise:1.25,max:1.7}};
const sections=[{end:950,curve:0,name:'Стартовая прямая'},{end:2050,curve:2.4,name:'Большая дуга'},{end:2700,curve:-2.2,name:'Связка S'},{end:3450,curve:2.2,name:'Связка S'},{end:4300,curve:0,name:'Трамплин'},{end:5350,curve:-Math.PI*Math.PI/(.0013*1050),name:'Шпилька 180° · тормози'},{end:6200,curve:.7,name:'Последний поворот'},{end:7600,curve:-.7,name:'Галерея трибун'},{end:8800,curve:.65,name:'Двойной трамплин'},{end:LAP,curve:0,name:'Финишная прямая'}];
const citySections=[{end:4800,curve:0,name:'Выезд со стадиона'},{end:6000,curve:.6,name:'Покерный бульвар'},{end:7300,curve:-Math.PI*Math.PI/(.0013*1300),name:'Разворот набережной · 180°'},{end:8500,curve:.5,name:'Портовый проезд'},{end:LAP,curve:0,name:'Мост к TWO ACES'}];
function road(distance){const x=((distance%LAP)+LAP)%LAP,city=distance>=LAP*2+4300,list=city?citySections:sections;let start=city?4300:0;for(const sec of list){if(x<sec.end){const u=clamp((x-start)/(sec.end-start),0,1);return {curve:sec.curve*Math.sin(Math.PI*u),name:sec.name,local:x,city,blend:clamp((distance-LAP*2-4300)/500,0,1),bridge:city&&x>8500,shortcut:!city&&x>4470&&x<4970||city&&x>6500&&x<7000};}start=sec.end;}return {curve:0,name:'Финиш',local:0,city,blend:city?1:0};}
// Six lanes on the boulevard, four through the technical stadium sections.
function roadWidth(d){const city=clamp((d-(LAP*2+4700))/500,0,1),bridge=clamp((d-(LAP*2+8200))/300,0,1);return 6+3*city*(1-bridge);}
function trafficAt(tick){return Array.from({length:12},(_,i)=>({id:i,tier:0,distance:LAP*2+5000+((i*347-tick*3.1)%3100+3100)%3100,lateral:[-.83,-.5,-.17][i%3]}));}
// Optional short upper routes; the renderer and simulation share these exact profiles.
const overpasses=[...Array.from({length:3},(_,lap)=>({id:'stadium-'+lap,start:lap*LAP+1600,end:lap*LAP+2450,center:-.55,halfWidth:.55,ramp:350,height:3.6,name:'Верхняя галерея'})),{id:'harbor',start:LAP*2+6250,end:LAP*2+7150,center:.55,halfWidth:.55,ramp:350,height:3.6,name:'Эстакада набережной'}];
function deckAt(distance){return overpasses.find(p=>distance>=p.start&&distance<=p.end);}
function deckHeight(distance,tier=0){if(!tier)return 0;const p=deckAt(distance);if(!p)return 0;const u=clamp(Math.min(distance-p.start,p.end-distance)/p.ramp,0,1);return p.height*u*u*(3-2*u);}
function sameDeck(a,b){return (a.tier||0)===(b.tier||0);}
function updateDeck(s,old){const p=deckAt(s.distance);if(!p){s.tier=0;s.deckId=null;return;}
 if(s.deckId!==p.id){s.deckId=p.id;s.tier=old<=p.start&&!s.air&&Math.abs(s.lateral-p.center)<.38?1:0;}
 if(s.tier){s.lateral=clamp(s.lateral,p.center-.34,p.center+.34);if(Math.abs(s.lateral-p.center)>=.339){s.lateralVelocity=0;const side=Math.sign(s.lateral-p.center);if(side*(s.heading||0)>0)s.heading=0;if(side*(s.velocityHeading||0)>0)s.velocityHeading=0;s.yawRate=0;}}
 // The ramp occupies its lane; the lower route remains open beside it.
 else if(deckHeight(s.distance,1)<2.7&&Math.abs(s.lateral-p.center)<.73){s.lateral=p.center+(p.center<0?.73:-.73);s.lateralVelocity=0;}
}
const stadiumObjects=[[600,'box',0],[1150,'chips',-.4],[1450,'chips',-.4],[2200,'box',.5],[2550,'wet',-.5],[4850,'gate',0],[5750,'barrier',.65],[5950,'barrier',-.65],[3000,'barrier',-.55],[3550,'pad',0],[3860,'ramp',0],[4050,'chips',0],[4650,'ramp',-.8],[5500,'box',-.5],[6000,'oil',.35],[6500,'pad',.45],[7100,'ramp',.45],[7500,'chips',.45],[7900,'box',0],[8400,'barrier',.4],[8900,'pad',-.4],[9250,'ramp',-.4]];
stadiumObjects.push([1300,'chips',-.4],[3200,'barrier',.65],[3370,'barrier',-.65],[3450,'shield',.6],[6700,'chips',.45],[6900,'chips',.45],[8200,'nitro',-.5]);
const cityObjects=[[4700,'pad',0],[5100,'box',.4],[5600,'barrier',-.4],[6100,'chips',.5],[6500,'ramp',-.8],[6800,'chips',-.8],[7100,'oil',.5],[7450,'box',-.4],[7700,'gate',0],[8000,'wet',.6],[7900,'pad',0],[8300,'ramp',0],[8750,'barrier',.5],[9100,'chips',-.4],[9450,'pad',0]];
let objectCacheTick=-1;const objectCache=new Map();
function trackObjects(distance,tick=0){const first=Math.max(0,Math.floor(distance/LAP));if(objectCacheTick!==tick){objectCache.clear();objectCacheTick=tick;}if(objectCache.has(first))return objectCache.get(first);const result=[];for(let lap=first;lap<=Math.min(2,first+1);lap++){const objects=lap===2?[...stadiumObjects.filter(o=>o[0]<4300),...cityObjects]:stadiumObjects;for(const [offset,kind,lateral]of objects)result.push({key:lap+':'+offset,distance:lap*LAP+offset,kind,tier:0,lateral:kind==='gate'?Math.sin(tick*.023+lap)*.65:lateral});}
 for(const p of overpasses){if(p.end<first*LAP||p.start>Math.min(3,first+2)*LAP)continue;for(const [offset,kind,tier,lateral]of [[300,'shield',1,p.center],[420,'chips',1,p.center],[520,'chips',1,p.center],[610,'nitro',1,p.center],[460,'barrier',0,p.center],[360,'chips',0,-p.center],[570,'chips',0,-p.center]])result.push({key:p.id+':'+offset+':'+tier,distance:p.start+offset,kind,tier,lateral});}
 result.sort((a,b)=>a.distance-b.distance);objectCache.set(first,result);return result;}

function rampHeight(distance,lateral,tier=0,tick=0){const ramp=trackObjects(distance,tick).find(o=>o.kind==='ramp'&&sameDeck({tier},o)&&o.distance>=distance&&o.distance-distance<=4/.06&&Math.abs(lateral-o.lateral)<.34);return ramp?1.1*(1-(ramp.distance-distance)/(4/.06)):0;}

// Physical separation is independent of damage cooldowns and shields.
function vehicleHeight(car){
 if(!(car.air>0&&car.airDuration>0))return rampHeight(car.distance,car.lateral,car.tier||0);
 const total=car.airDuration/60,t=(car.airDuration-car.air)/60;
 return Math.max(0,1.1+(.5*9.81*total*total-1.1)/total*t-.5*9.81*t*t);
}
function vehicleContact(a,b,oldA,oldB){
 if(!sameDeck(a,b))return false;
 const gap=b.distance-a.distance,previous=oldB-oldA;
 const length=80; // 4.8 m combined half-lengths in track units.
 return Math.min(gap,previous)<length&&Math.max(gap,previous)>-length&&Math.abs(a.lateral-b.lateral)*roadWidth(a.distance)<2.05&&Math.abs(vehicleHeight(a)-vehicleHeight(b))<=1.6;
}
function separateVehicles(a,b,fixed=false){
 const gap=2.08/roadWidth(a.distance),side=a.lateral===b.lateral?1:Math.sign(a.lateral-b.lateral);
 if(fixed)a.lateral=clamp(b.lateral+side*gap,-1.08,1.08);
 else {const centre=(a.lateral+b.lateral)/2,deck=a.tier?deckAt(a.distance):null,lo=deck?deck.center-.34:-1.08,hi=deck?deck.center+.34:1.08;a.lateral=clamp(centre+side*gap/2,lo+(side>0?gap:0),hi-(side<0?gap:0));b.lateral=a.lateral-side*gap;b.targetLane=b.lateral;}
 // If the shoulder limits the separation, deflect towards the open road.
 if(Math.abs(a.lateral-b.lateral)<gap-.001)a.lateral=b.lateral-side*gap;
 a.heading=clamp((a.heading||0),-.25,.25);a.velocityHeading=a.heading*.5;a.yawRate=0;a.lateralVelocity=0;
}

// Track-relative vehicle dynamics: heading, yaw inertia and tyre slip are separate.
function driveDynamics(s,a,steer,r){
 const sliding=!!s.drift,grip=s.air?.015:sliding?.045:.22;
 const wheelAngle=steer*.36/(1+s.speed*.055),yaw= s.speed*.06/2.8*Math.tan(wheelAngle)*(a.handbrake?1.7:1);
 s.yawRate=s.air?(s.yawRate||0)*.85:(s.yawRate||0)+(yaw-(s.yawRate||0))*(Math.sign(yaw)!==Math.sign(s.yawRate||0)?.32:.16);
 const roadYaw=r.curve*.00065*s.speed;
 s.heading=clamp((s.heading||0)+s.yawRate+roadYaw,-1.1,1.1);
 if(!a.handbrake&&Math.abs(steer)<.08)s.heading*=sliding?.99:.94;
 s.velocityHeading=(s.velocityHeading||0)+(s.heading-(s.velocityHeading||0))*grip;
 s.slipAngle=s.heading-s.velocityHeading;
 s.lateralVelocity=Math.sin(s.velocityHeading)*s.speed*.06/roadWidth(s.distance);
 if(s.spin){s.heading*=.95;s.lateralVelocity*=.25;}
 s.lateral=clamp(s.lateral+s.lateralVelocity,-1.25,1.25);
 s.forwardFactor=Math.max(.35,Math.cos(s.velocityHeading));
 s.gear=Math.min(6,Math.max(1,Math.floor(s.speed*21/42)+1));s.rpm=s.speed<.15?900:1800+(s.speed*21%42)/42*4700;
}
const rivalProfiles=[{name:'Колл',reaction:12,caution:.34,space:6,lane:.45,error:.06},{name:'Рейз',reaction:16,caution:.22,space:3.5,lane:-.3,error:.11},{name:'Нит',reaction:10,caution:.28,space:5,lane:0,error:.035}];
function planRival(s,k,i){
 const profile=rivalProfiles[i],city=road(k.distance).city,candidates=city?[.16,.46,.78,-.18,-.5]:[-.76,-.38,0,.38,.76];
 const obstacles=trackObjects(k.distance,s.tick).filter(o=>sameDeck(k,o)&&o.distance>k.distance&&o.distance-k.distance<420);
 const traffic=city&&!k.tier?trafficAt(s.tick):[],cars=[...s.rivals.filter(other=>other!==k),s];
 let best=k.lateral,lowest=Infinity;
 for(const lane of candidates){let cost=Math.abs(lane-k.lateral)*.65+(city&&lane<0?1.5:0)+Math.abs(lane-profile.lane)*.18;
  for(const o of obstacles){if(Math.abs(lane-o.lateral)<.36)cost+=['barrier','gate','oil','wet'].includes(o.kind)?7: -.35;}
  for(const c of traffic)if(c.distance>k.distance-50&&c.distance-k.distance<650&&Math.abs(lane-c.lateral)<.3)cost+=12;
  for(const c of cars)if(sameDeck(k,c)&&c.distance>k.distance-25&&c.distance-k.distance<210&&Math.abs(lane-c.lateral)<.3)cost+=profile.space;
  if(cost<lowest){lowest=cost;best=lane;}
 }k.targetLane=clamp(best+Math.sin(Math.floor(s.tick/180)*2.17+i)*profile.error,-.85,.85);
}
function rivalImpact(k,kind){if(k.inv||k.air)return;k.inv=120;k.stun=45;k.currentSpeed=(k.currentSpeed||k.speed)*.45;k.crashKind=kind;k.hits=(k.hits||0)+1;}
function create(chapter=9,options={}){return {chapter,transport:options.transport||'kart',mode:'race',sprint:!!options.sprint,startDistance:options.sprint?LAP*2:0,heading:0,yawRate:0,velocityHeading:0,slipAngle:0,tier:0,deckId:null,world:0,tick:0,health:3,hits:0,inv:0,score:0,picked:0,progress:0,phase:'race',boss:{name:null,hp:0,max:0},previous:{},won:false,lost:false,message:'',distance:options.sprint?LAP*2:0,lateral:0,lateralVelocity:0,steering:0,speed:0,lap:1,position:4,countdown:180,boost:0,boostChain:0,drift:0,driftSide:0,driftMeter:0,spin:0,air:0,shield:0,item:null,itemRoll:0,notice:'',noticeTicks:0,lapTimes:[],lapStarted:180,rivals:[{name:'Колл',distance:(options.sprint?LAP*2:0)+55,lateral:-.55,speed:5.75,stun:0,boost:0,itemAt:options.sprint?Math.floor(LAP*2/2300):0},{name:'Рейз',distance:(options.sprint?LAP*2:0)+110,lateral:.5,speed:5.85,stun:0,boost:0,itemAt:options.sprint?Math.floor(LAP*2/2300):0},{name:'Нит',distance:(options.sprint?LAP*2:0)+165,lateral:0,speed:5.95,stun:0,boost:0,itemAt:options.sprint?Math.floor(LAP*2/2300):0}],traps:[],enemyShots:[],used:new Set(),nitro:100,boosts:0,shortcuts:0,airDuration:0,jumps:0,perfectLandings:0,routeZone:'stadium',cupSecured:false,hazardWarning:null};}
function notice(s,t){s.notice=t;s.noticeTicks=100;}
function hit(s,kind='crash'){if(s.inv||s.air)return;if(s.shield){s.shield=0;s.shieldImpact=24;s.inv=45;notice(s,'ЩИТ СПАС КАРТ');return;}s.crash={kind,started:s.tick,duration:45,chips:Math.min(2,s.picked),side:s.lateral>=0?-1:1};s.spin=45;s.inv=120;s.speed*=.45;s.boost=0;s.drift=0;s.driftArmed=false;s.driftMeter=0;s.lateralVelocity=(s.lateralVelocity||0)*.2;s.hits++;s.picked=Math.max(0,s.picked-2);notice(s,'СТОЛКНОВЕНИЕ');}
function collect(s,old,a){for(const o of trackObjects(old,s.tick)){if(old>o.distance||s.distance<o.distance||s.used.has(o.key)||!sameDeck(s,o))continue;const aligned=Math.abs(s.lateral-o.lateral)<(['pad','gate','wet'].includes(o.kind)?.42:o.kind==='ramp'?.34:.29);if(!aligned)continue;if(o.kind==='box'&&(s.item||s.itemRoll))continue;s.used.add(o.key);if(o.kind==='box'&&!s.item&&!s.itemRoll){s.itemRoll=30;const pool=s.position>=3?['rocket','turbo','shield']:['trap','shield','turbo'];s.nextItem=pool[Math.floor(s.tick/13)%pool.length];notice(s,'ПРЕДМЕТ НАЙДЕН');}if(o.kind==='shield'){s.shield=Math.max(s.shield,360);notice(s,'ЩИТ · ЗАЩИТА НА 6 СЕКУНД');}if(o.kind==='nitro'){s.boost=Math.max(s.boost,90);s.boosts++;notice(s,'ЗАРЯД · УСКОРЕНИЕ');}if(o.kind==='chips'){s.picked=Math.min(10,s.picked+2);s.score+=100;notice(s,s.picked===10?'10 ФИШЕК · ПРЕДМЕТЫ УСИЛЕНЫ':'+2 ФИШКИ');}if(o.kind==='pad'){s.boost=Math.max(s.boost,120);s.boosts++;notice(s,'ТУРБОПОЛОСА');}if(o.kind==='ramp'&&s.speed>(mobility[s.transport]?1:4)&&!s.air){s.airDuration=clamp(Math.round(28+s.speed*3+(a.jump?15:0)),40,72);s.air=s.airDuration;s.jumps++;s.drift=0;s.driftMeter=0;notice(s,a.jump?'ВЫСОКИЙ ПРЫЖОК!':'ТРАМПЛИН');}if(o.kind==='wet'&&!s.air){s.speed*=.65;s.boost=0;notice(s,'ЛУЖА · ПОТЕРЯ СКОРОСТИ');}if((o.kind==='barrier'||o.kind==='oil'||o.kind==='gate')&&!s.air){hit(s,o.kind);notice(s,o.kind==='oil'?'МАСЛО · СМЕНИ ЛИНИЮ':'ОГРАЖДЕНИЕ');}}}
function useItem(s,a){if(!s.item)return;const item=s.item,strong=s.picked===10;s.item=null;if(item==='turbo'){s.boost=Math.max(s.boost,strong?230:150);notice(s,'ТУРБО!');}if(item==='shield'&&s.shield){s.enemyShots.push({tier:s.tier||0,distance:s.distance+35,lateral:s.lateral,enemy:false,life:180,target:s.rivals.filter(r=>r.distance>s.distance&&sameDeck(s,r)).sort((a,b)=>a.distance-b.distance)[0],pulse:true});s.shield=0;return;}if(item==='shield'){s.shield=strong?720:480;notice(s,strong?'ЩИТ · 12 СЕКУНД':'ЩИТ · 8 СЕКУНД');}if(item==='rocket'){const target=s.rivals.filter(r=>r.distance>s.distance&&sameDeck(s,r)).sort((a,b)=>a.distance-b.distance)[0];s.enemyShots.push({tier:s.tier||0,distance:s.distance+30,lateral:s.lateral,target,enemy:false,life:180,power:strong?220:150});notice(s,target?'РАКЕТА ПО СОПЕРНИКУ':'РАКЕТА ВПЕРЁД · РАСЧИСТИ ТРАССУ');}if(item==='trap'){s.traps.push({tier:s.tier||0,distance:s.distance+(a.up?140:-35),lateral:s.lateral,enemy:false});notice(s,a.up?'ЛОВУШКА ВПЕРЕДИ':'ЛОВУШКА ПОЗАДИ');}}
function step(s,a={}){if(s.won||s.lost)return s;s.tick++;const pressed=k=>a[k]&&!s.previous[k];s.noticeTicks=Math.max(0,s.noticeTicks-1);if(s.countdown){if(s.countdown<25&&pressed('special'))s.startBoost=true;s.countdown--;if(!s.countdown&&s.startBoost){s.boost=100;notice(s,'ИДЕАЛЬНЫЙ СТАРТ');}s.previous={...a};return s;}for(const k of ['boost','inv','spin','air','shield','bumpCooldown','shieldImpact'])s[k]=Math.max(0,s[k]-1);if(s.itemRoll&&!--s.itemRoll)s.item=s.nextItem;const rawSteer=Number.isFinite(a.steer)?clamp(a.steer,-1,1):(a.right?1:0)-(a.left?1:0);const currentSteer=s.steering||0,targetSteer=a.driving?rawSteer*(.55+.45*rawSteer*rawSteer):rawSteer,steerResponse=a.driving?(rawSteer===0?.3:Math.sign(rawSteer)!==Math.sign(currentSteer)?.26:.14):(rawSteer===0?.38:Math.sign(rawSteer)!==Math.sign(currentSteer)?.4:.28);s.steering=currentSteer+(targetSteer-currentSteer)*steerResponse;if(Math.abs(s.steering)<.001)s.steering=0;const steer=s.steering,r=road(s.distance),old=s.distance;
if(a.driving){
 const gripLoss=!mobility[s.transport]&&!s.spin&&!s.air&&s.speed>3&&(a.handbrake&&Math.abs(steer)>.2||s.speed>7&&Math.abs(steer)>.72&&Math.abs(r.curve)>.5);
 if(gripLoss){s.drift=1;s.driftSide=Math.sign(steer);s.driftMeter=Math.min(100,s.driftMeter+1);}
 else if(s.drift){s.driftMeter=Math.max(0,s.driftMeter-4);if(s.driftMeter===0||Math.abs(steer)<.12||s.spin||s.air)s.drift=0;}
 if(a.handbrake&&!s.air){s.speed*=.975;s.boost=0;}
 s.nitro=clamp(s.nitro??100,0,100);if(a.special&&s.nitro>0&&!a.handbrake&&!s.spin){s.boost=Math.max(s.boost,2);s.nitro=Math.max(0,s.nitro-.5);}else s.nitro=Math.min(100,s.nitro+(s.drift?.12:.015));
}else{
if(pressed('jump'))s.driftArmed=true;if(!a.jump)s.driftArmed=false;if(s.driftArmed&&Math.abs(steer)>.2&&s.speed>(mobility[s.transport]?.8:2)&&!s.spin&&!s.air){s.driftArmed=false;s.drift=1;s.driftSide=Math.sign(steer);s.driftMeter=0;s.boostChain=0;}
if(s.drift){if(!a.jump||s.spin||s.air){s.drift=0;s.driftMeter=0;}else{s.driftMeter+=1.7;if(pressed('special')){if(s.driftMeter>=60&&s.driftMeter<=100&&s.boostChain<3){s.boostChain++;s.boost=Math.max(s.boost,65+s.boostChain*25);s.boosts++;s.score+=100*s.boostChain;s.driftMeter=0;notice(s,'ДРИФТ ×'+s.boostChain+' · ТУРБО');if(s.boostChain===3)s.drift=0;}else{s.drift=0;notice(s,'РАНО · ДОЖДИСЬ ЗОЛОТОЙ ЗОНЫ');}}if(s.driftMeter>100){s.drift=0;s.driftMeter=0;notice(s,'ПЕРЕГРЕВ · НАЧНИ ДРИФТ СНОВА');}}}
}
if(pressed('attack')){if(s.shield&&!s.item){s.item='shield';}useItem(s,a);}
const vehicle=mobility[s.transport],target=vehicle?(s.spin?.5:a.down?.7:Math.min(vehicle.max,vehicle.cruise+s.picked*.015+(s.boost?.3:0))):s.spin?1.6:a.down?(a.driving?0:2.8):5.8+s.picked*.055+(s.boost?3.4:0);s.speed+=(target-s.speed)*(a.down?.075:s.spin?.07:.035);
// Grip follows speed; counter-steering changes momentum rather than teleporting lanes.
if(a.driving&&!vehicle)driveDynamics(s,a,steer,r);else{
const pace=.8+clamp(s.speed/8,0,1)*.24,turn=steer*(s.spin?.007:s.air?.01:a.down?.03:s.drift?.021:.022)*pace,slide=s.drift?s.driftSide*.004:0,curve=s.spin||s.air?0:clamp(r.curve,-2,2)*s.speed*.00055;
const desired=turn+slide-curve,response=s.spin?.2:s.air?.1:s.drift?.18:rawSteer===0?.38:.26;s.lateralVelocity=(s.lateralVelocity||0)+(desired-(s.lateralVelocity||0))*response;s.lateral+=s.lateralVelocity;s.lateral=clamp(s.lateral,-1.25,1.25);
}
if(a.driving&&!s.air&&Math.abs(s.lateral)>1.16&&s.speed>3&&!s.inv){hit(s,'wall');s.lateral=Math.sign(s.lateral)*1.08;s.heading=-Math.sign(s.lateral)*Math.min(.3,Math.abs(s.heading||0));s.velocityHeading=s.heading*.5;}
if(Math.abs(s.lateral)>1){s.speed*=.975;s.boost=Math.max(0,s.boost-3);}if(Math.abs(s.lateral)>1.12){s.lateral*=.98;s.speed*=.985;if(Math.sign(s.lateralVelocity)===Math.sign(s.lateral))s.lateralVelocity*=.3;}
const shortcut=r.shortcut&&s.lateral<-.72&&s.boost>0;if(shortcut){s.speed=Math.max(s.speed,8);if(!s.shortcutActive){s.shortcuts++;notice(s,'СРЕЗКА ЧЕРЕЗ ВНУТРЕННИЙ СЕКТОР');}}s.shortcutActive=shortcut;if(vehicle)s.speed=Math.min(s.speed,vehicle.max/(shortcut?1.25:1));s.distance+=s.speed*(shortcut?1.25:1)*(a.driving&&!vehicle?(s.forwardFactor||1):1);if(s.air===1){s.boost=Math.max(s.boost,Math.round(s.airDuration*1.7));s.score+=Math.round(s.airDuration*3);s.perfectLandings++;notice(s,'ПРИЗЕМЛЕНИЕ · ТУРБО');}
updateDeck(s,old);collect(s,old,a);
if(road(s.distance).city&&!s.tier){for(const car of trafficAt(s.tick)){const before=trafficAt(s.tick-1)[car.id];if(Math.abs(car.distance-before.distance)>100)continue;if(vehicleContact(s,car,old,before.distance)){hit(s,'traffic');separateVehicles(s,car,true);}}}

const ahead=trackObjects(s.distance,s.tick).find(o=>sameDeck(s,o)&&['barrier','oil','gate','wet'].includes(o.kind)&&o.distance-s.distance>0&&o.distance-s.distance<600&&!s.used.has(o.key));s.hazardWarning=ahead?{kind:ahead.kind,lateral:ahead.lateral,distance:ahead.distance-s.distance}:null;
const zone=r.city?(r.bridge?'bridge':'city'):'stadium';if(zone!==s.routeZone){s.routeZone=zone;notice(s,zone==='city'?'ВЫЕЗД В ГОРОД · К МОСТУ':zone==='bridge'?'МИССЛИК ЖДЁТ У МОСТА':'СТАДИОН');}

for(const [i,k]of s.rivals.entries()){k.air=Math.max(0,(k.air||0)-1);k.stun=Math.max(0,k.stun-1);k.boost=Math.max(0,k.boost-1);const kr=road(k.distance),oldDistance=k.distance;k.inv=Math.max(0,(k.inv||0)-1);
 if(k.targetLane===undefined||s.tick%rivalProfiles[i].reaction===0)planRival(s,k,i);
 const upcoming=Math.max(Math.abs(kr.curve),Math.abs(road(k.distance+180).curve));
 // Limited nitro on clear straights, never a distance-based catch-up teleport.
 k.nitro=k.nitro??(s.sprint?0:40);
 const clear=!k.stun&&!k.air&&upcoming<.8&&!trackObjects(k.distance,s.tick).some(o=>sameDeck(k,o)&&['barrier','gate','oil','wet'].includes(o.kind)&&o.distance>k.distance&&o.distance-k.distance<300&&Math.abs(o.lateral-k.lateral)<.35);
 if(clear&&k.nitro>.5){k.boost=Math.max(k.boost,2);k.nitro-=.5;}else k.nitro=Math.min(40,k.nitro+.01);
 const targetSpeed=k.stun?2:Math.max(3.25,k.speed-upcoming*rivalProfiles[i].caution)+(k.boost?1.7:0);
 k.currentSpeed=(k.currentSpeed??k.speed)+(targetSpeed-(k.currentSpeed??k.speed))*.06;k.distance+=k.currentSpeed;
 const lateralBefore=k.lateral;k.lateral+=clamp((k.targetLane-k.lateral)*.035,-.018,.018);k.heading=Math.atan2((k.lateral-lateralBefore)*roadWidth(k.distance),Math.max(.01,k.currentSpeed*.06));
 updateDeck(k,oldDistance);
 for(const o of trackObjects(oldDistance,s.tick))if(!s.used.has(o.key)&&sameDeck(k,o)&&oldDistance<=o.distance&&k.distance>=o.distance&&Math.abs(k.lateral-o.lateral)<.29){if(o.kind==='ramp'&&!k.air){k.airDuration=48;k.air=48;}if(!k.air){if(o.kind==='wet'){k.currentSpeed*=.65;k.boost=0;}if(['gate','barrier','oil'].includes(o.kind))rivalImpact(k,o.kind);}}
 if(kr.city&&!k.tier){for(const car of trafficAt(s.tick)){const previous=trafficAt(s.tick-1)[car.id];if(Math.abs(car.distance-previous.distance)>100)continue;if(vehicleContact(k,car,oldDistance,previous.distance)){rivalImpact(k,'traffic');separateVehicles(k,car,true);k.targetLane=k.lateral;}}}
 const zone=Math.floor(k.distance/2300);if(zone>k.itemAt){k.itemAt=zone;if(i===0)k.boost=70;if(i===1)s.traps.push({tier:k.tier||0,distance:k.distance-40,lateral:k.lateral,enemy:true});if(i===2&&s.distance<k.distance&&k.distance-s.distance<700){s.enemyShots.push({tier:k.tier||0,distance:k.distance-50,lateral:s.lateral,enemy:true,life:180});notice(s,'РАКЕТА НИТА! ЩИТ ИЛИ СМЕНИ ЛИНИЮ');}}
if(vehicleContact(s,k,old,oldDistance)){separateVehicles(s,k);if(!s.bumpCooldown){s.speed*=.8;k.currentSpeed=(k.currentSpeed||k.speed)*.85;s.bumpCooldown=40;s.bumpAt=s.tick;}}
for(const t of s.traps)if(sameDeck(k,t)&&!t.enemy&&!t.used&&Math.abs(k.distance-t.distance)<24&&Math.abs(k.lateral-t.lateral)<.3){k.stun=120;t.used=true;s.score+=150;}}
for(const t of s.traps)if(sameDeck(s,t)&&t.enemy&&!t.used&&Math.abs(t.distance-s.distance)<24&&Math.abs(t.lateral-s.lateral)<.27){hit(s,'trap');t.used=true;}s.traps=s.traps.filter(t=>!t.used&&t.distance>s.distance-700);
for(const p of s.enemyShots){if(p.tier&&!deckAt(p.distance))p.tier=0;p.life--;if(!p.enemy)for(const o of trackObjects(p.distance,s.tick))if(sameDeck(p,o)&&['oil','barrier','gate'].includes(o.kind)&&!s.used.has(o.key)&&Math.abs(o.distance-p.distance)<30&&Math.abs(o.lateral-p.lateral)<.35){s.used.add(o.key);p.life=0;s.score+=75;notice(s,'ПРЕПЯТСТВИЕ УБРАНО');}for(const t of s.traps)if(sameDeck(p,t)&&!t.used&&Math.abs(t.distance-p.distance)<30&&Math.abs(t.lateral-p.lateral)<.3){t.used=true;p.life=0;s.score+=50;}if(!p.life)continue;if(p.enemy){p.distance-=4;if(sameDeck(p,s)&&Math.abs(p.distance-s.distance)<25&&Math.abs(p.lateral-s.lateral)<.25){hit(s,'rocket');p.life=0;}}else{p.distance+=11;if(p.target)p.lateral+=(p.target.lateral-p.lateral)*.07;if(p.target&&sameDeck(p,p.target)&&p.distance>=p.target.distance){p.target.stun=p.power||150;p.life=0;s.score+=200;}}}s.enemyShots=s.enemyShots.filter(p=>p.life>0);
const lap=Math.min(3,Math.floor(s.distance/LAP)+1);if(!s.sprint&&lap>s.lap){s.lapTimes.push(s.tick-s.lapStarted);s.lapStarted=s.tick;notice(s,lap===3?'ПОСЛЕДНИЙ КРУГ!':'КРУГ 2 · ДЕРЖИ ТЕМП');}s.lap=s.sprint?1:lap;s.position=1+s.rivals.filter(k=>k.distance>s.distance).length;s.progress=Math.min(100,Math.floor((s.distance-s.startDistance)/(LAP*3-s.startDistance)*100));if(s.distance>=LAP*3){s.lapTimes.push(s.tick-s.lapStarted);s.finishPosition=s.position;s.cupSecured=s.position===1;if(s.position===1){s.won=true;s.score+=1500+s.boosts*25;s.message='БИЛЕТЫ СНОВА У НАС';}else{s.lost=true;s.health=0;s.message='Финиш: '+s.position+' место. Билеты забирает победитель.';}}s.previous={...a};return s;}
function revive(s){const score=s.score;Object.assign(s,create(s.chapter,{transport:s.transport,sprint:s.sprint}));s.score=score;return s;}
return {create,step,revive,road,LAP,sections,trackObjects,mobility,overpasses,deckAt,deckHeight,updateDeck,rampHeight,roadWidth,trafficAt,driveDynamics,planRival,rivalProfiles,vehicleContact,vehicleHeight};});
