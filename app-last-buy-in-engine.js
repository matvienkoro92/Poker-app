/* Local campaign simulation. Campaign progress never enters the club record API. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./app-monkey-race-engine.js'),require('./app-cooler-flight-engine.js'));else root.LastBuyInEngine=factory(root.MonkeyRaceEngine,root.CoolerFlightEngine);})(typeof globalThis!=='undefined'?globalThis:this,function(Race,Flight){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const romaRooms=['Гардероб','Покерный зал','Коктейльный бар','Турнирный зал','VIP-галерея','Касса клуба','Служебный коридор','Хранилище · Чек и Рейз'];
const names=['Капитан Колл','Братья Чек и Рейз','Дилер Пересдача','Удав Депозит','Охранник Натс','Снайпер Слоуплей','Валера · Железный натс'];
function create(chapter){if(chapter===0)throw Error('Chapter one uses MonkeyRaceCampaign');const s={chapter,tick:0,phase:'route',health:5,hits:0,inv:0,cooldown:0,specialCooldown:0,score:0,secret:false,won:false,lost:false,x:90,y:410,vy:0,facing:1,attack:0,progress:0,enemies:[],shots:[],platforms:[],picked:0,boss:{x:310,y:395,hp:chapter===6?12:5,max:chapter===6?12:5,name:names[chapter],timer:0,warning:false},message:'',wave:0,finalPhase:0,ground:false,chairCharges:4,combo:0,particles:[],tokens:[],jumpHeight:0,jumpSpeed:0,checkpoint:0,shake:0,locks:[],gates:[]};
 if(chapter===1){s.y=410;s.world=390;s.boss.hp=s.boss.max=34;s.furniture=[];s.cashTraps=[];s.dashCooldown=0;s.superCooldown=0;s.superFlash=0;spawnWave(s);}
 if(chapter===2){s.y=420;s.world=6010;s.boss.x=5860;s.boss.y=390;s.boss.hp=s.boss.max=7;s.platforms=[{x:0,w:290,base:470,y:470}];for(let i=1;i<35;i++){const x=245+(i-1)*165,base=470-(i%3)*22;s.platforms.push({x,w:150,base,y:base,moving:i%4===2});s.tokens.push({x:x+55,y:base-55,collected:false});}s.platforms.push({x:5640,w:350,base:470,y:470});s.vents=[550,1220,2050,2680,3350,4020,4690,5360];s.gates=[{x:5590,open:false}];}
 if(chapter===3){s.x=70;s.y=350;s.world=3850;s.platforms=train(s);s.boss.hp=s.boss.max=3;s.locks=Array.from({length:7},(_,i)=>({x:430+i*490,open:false}));}
 if(chapter===4){s.flight=Flight.create(927313,9);s.x=94;s.y=270;s.boss.x=316;s.boss.y=270;s.boss.hp=s.boss.max=6;s.devices=[true,true,true];}
 if(chapter===5){s.x=55;s.y=455;s.boss.x=310;s.boss.y=85;s.enemies=[{x:330,y:365,hp:3,type:0},{x:60,y:240,hp:3,type:1},{x:325,y:165,hp:3,type:0}];s.covers=[{x:110,y:330,w:65,h:30},{x:210,y:230,w:70,h:30}];s.room=1;s.ammo=6;s.reload=0;s.timer=240*60;s.switches=0;}
 if(chapter===6){s.x=70;s.y=410;s.phase='boss';s.boss.x=280;s.boss.y=280;s.boss.hp=s.boss.max=32;s.weakUntil=0;s.telegraphs=[];}
 return s;}
function train(s){return Array.from({length:27},(_,i)=>({x:15+i*142,w:134,y:385+Math.sin(s.tick*.015+i*.55)*(40+15*(s.intensity||0)),car:i}));}
function damage(s){if(s.inv||s.won||s.lost)return;s.health--;s.hits++;s.inv=80;s.shake=10;if(s.health<=0)s.lost=true;}
function hurtBoss(s,n){if(s.boss.hp<=0)return;s.boss.hp=Math.max(0,s.boss.hp-n);s.score+=100;if(!s.boss.hp){s.won=true;s.phase='done';}}
function romaTables(room){const layouts=[[[195,340,125,62]],[[132,300,100,52],[267,395,100,52]],[[130,280,90,48],[265,340,90,48],[150,430,90,48]],[[125,285,88,46],[270,285,88,46],[195,410,105,54]],[[195,335,145,72]],[[132,305,100,52],[265,405,100,52]],[[195,350,115,58]],[[140,290,92,48],[260,400,92,48]]];return layouts[room].map(([x,y,w,h])=>({x,y,w:w*1.12,h:h*1.12}));}
function romaProps(room){const layouts=[
 [['rack',180,235,75,28],['sofa',285,455,100,32]],
 [['sofa',75,450,90,32],['trolley',285,245,55,30]],
 [['rack',40,235,50,28],['sofa',300,455,85,32]],
 [['trolley',60,455,55,30],['sofa',300,455,90,28]],
 [['sofa',75,445,90,32],['sofa',295,255,90,32]],
 [['safe',75,245,75,36],['trolley',310,305,55,30]],
 [['rack',65,250,70,28],['trolley',305,445,55,30]],
 [['safe',20,490,65,30],['trolley',370,490,55,28]]
 ];return layouts[room].map(([kind,x,y,w,h])=>({kind,x,y,w,h,cover:kind==='sofa'||kind==='safe'}));}
function roomSolids(s){return [...(s.furniture||[]),...(s.props||[])];}
function tableAt(s,x,y){return roomSolids(s).find(f=>((x-f.x)/(f.w/2+14))**2+((y-f.y)/(f.h/2+14))**2<1);}
function aroundTables(s,e,oldX,oldY){const dx=e.x-oldX,dy=e.y-oldY,n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/4));e.x=oldX;e.y=oldY;for(let i=0;i<n;i++){const x=e.x+dx/n;if(!tableAt(s,x,e.y))e.x=x;const y=e.y+dy/n;if(!tableAt(s,e.x,y))e.y=y;}}
// Find a route around solid furniture; a side nudge alone gets stuck at oval corners.
function clearTablePath(s,a,b,margin=20){const n=Math.ceil(dist(a,b)/5);for(let i=1;i<=n;i++)if(roomSolids(s).some(f=>((a.x+(b.x-a.x)*i/n-f.x)/(f.w/2+margin))**2+((a.y+(b.y-a.y)*i/n-f.y)/(f.h/2+margin))**2<1))return false;return true;}
function guardWaypoint(s,e,goal){
 if(clearTablePath(s,e,goal)){e.navPath=null;return goal;}
 if(!e.navPath||dist(goal,e.navGoal)>25){
  const step=10,cols=34,rows=29,toCell=p=>({x:clamp(Math.round((p.x-25)/step),0,cols-1),y:clamp(Math.round((p.y-205)/step),0,rows-1)}),point=n=>({x:25+(n%cols)*step,y:205+Math.floor(n/cols)*step});
  const start=toCell(e),target=toCell(goal),first=start.y*cols+start.x,last=target.y*cols+target.x,queue=[first],parents=new Map([[first,-1]]);let found=-1;
  for(let head=0;head<queue.length;head++){const id=queue[head],a=point(id);if(id===last){found=id;break;}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const x=id%cols+dx,y=Math.floor(id/cols)+dy,n=y*cols+x;if(x<0||x>=cols||y<0||y>=rows||parents.has(n))continue;const b=point(n);if(tableAt(s,b.x,b.y)||!clearTablePath(s,id===first?e:a,b,id===first?14:20))continue;parents.set(n,id);queue.push(n);}}
  e.navPath=[];if(found>=0){for(let id=found;id!==first&&id!==-1;id=parents.get(id))e.navPath.unshift(point(id));}e.navGoal={x:goal.x,y:goal.y};e.navTick=s.tick;
 }
 while(e.navPath?.length&&dist(e,e.navPath[0])<7)e.navPath.shift();
 if(e.navPath?.length){for(let i=e.navPath.length-1;i>0;i--)if(clearTablePath(s,e,e.navPath[i])){e.navPath.splice(0,i);break;}return e.navPath[0];}return e;
}
function spawnWave(s){s.wave++;s.roomName=romaRooms[s.wave-1];s.roomSkin=[0,1,2,1,3,3,0][s.wave-1];s.furniture=romaTables(s.wave-1);s.props=romaProps(s.wave-1);s.enemies=Array.from({length:2+Math.floor((s.wave-1)/2)},(_,i)=>({x:260+(i%3)*38,y:230+(i%4)*65,hp:4+Math.floor((s.wave-1)/3),type:s.wave>=3&&i===0?2:s.wave>=4?i%3:i%2,timer:i*35,stun:0}));for(const e of s.enemies)if(tableAt(s,e.x,e.y))e.x=355;s.door={x:343,y:220,open:false};s.message=s.roomName+': не подпускай охрану';}
function enterRomaRoom(s){s.shots=[];s.cashTraps=[];s.bossZones=[];s.x=65;s.y=370;s.health=Math.min(5,s.health+1);s.inv=Math.max(s.inv,90);if(s.wave<7){s.phase='route';spawnWave(s);}else{s.phase='boss';s.roomName=romaRooms[7];s.roomSkin=3;s.furniture=romaTables(7);s.props=romaProps(7);s.door={x:343,y:220,open:false};s.boss.hp=s.boss.max=34;s.enemies=[{x:300,y:270,hp:18,type:2,timer:0,stun:0},{x:340,y:425,hp:16,type:1,timer:60,stun:0}];s.secret=s.hits<2;s.message='Чек и Рейз охраняют хранилище!';}}
function projectile(s,x,y,vx,vy,enemy,kind){s.shots.push({x,y,vx,vy,enemy,life:140,kind:kind||'chip'});}
function move(s,a,speed){s.x=clamp(s.x+((a.right?1:0)-(a.left?1:0))*speed,25,s.world?s.world-25:365);s.y=clamp(s.y+((a.down?1:0)-(a.up?1:0))*speed,s.chapter===1?205:125,s.chapter===1?490:475);if(a.right)s.facing=1;if(a.left)s.facing=-1;}
function step(s,a){if(s.won||s.lost)return s;a=a||{};s.previousX=s.x;s.previousY=s.y;s.tick++;s.inv=Math.max(0,s.inv-1);if(s.chapter!==1||!['exit','room-transition'].includes(s.phase)){s.cooldown=Math.max(0,s.cooldown-1);s.specialCooldown=Math.max(0,s.specialCooldown-1);}s.attack=Math.max(0,s.attack-1);s.intensity=s.chapter===1?Math.min(1,(s.wave-1)/6):s.chapter===2?Math.min(1,s.x/5690):s.chapter===3?Math.min(1,s.picked/7):s.chapter===4?Math.min(1,s.progress/70):s.chapter===5?Math.min(1,(s.room-1)/6):Math.min(1,(s.boss.max-s.boss.hp)/s.boss.max);s.shake=Math.max(0,s.shake-1);if(s.jumpHeight||s.jumpSpeed){s.jumpHeight+=s.jumpSpeed;s.jumpSpeed-=.55;if(s.jumpHeight<0){s.jumpHeight=0;s.jumpSpeed=0;}}
 switch(s.chapter){case 1:fight(s,a);break;case 2:platform(s,a);break;case 3:snake(s,a);break;case 4:flight(s,a);break;case 5:shooter(s,a);break;case 6:final(s,a);break;}
 shots(s);if(s.health<=0)s.lost=true;return s;}
// Both brothers telegraph locked targets; bait and the super cancel their wind-ups.
function brothers(s){
 s.bossZones=s.bossZones||[];for(const z of s.bossZones){z.age++;if(z.age===z.warningTicks&&Math.hypot(s.x-z.x,s.y-z.y)<z.r&&!s.inv)damage(s);}s.bossZones=s.bossZones.filter(z=>z.age<z.warningTicks+35);
 const rage=s.enemies.reduce((n,e)=>n+Math.max(0,e.hp),0)<=17;
 for(const e of s.enemies){if(e.hp<=0)continue;e.shieldOpen=Math.max(0,(e.shieldOpen||0)-1);const bait=s.cashTraps.find(t=>t.life>0&&dist(e,t)<170);
 if(e.stun>=60||bait){if(e.skill){e.skill=null;e.shieldOpen=90;e.nextSkill=80;}continue;}
 e.nextSkill=e.nextSkill??(e.type===2?60:115);
 if(!e.skill){if(e.stun)continue;if(--e.nextSkill>0)continue;const n=e.skillCount||0;e.skillCount=n+1;const kind=e.type===2?(n%2?'sweep':'charge'):(n%2?'seizure':'fan');e.skill={kind,age:0,warningTicks:rage?44:60,target:{x:s.x,y:s.y},origin:{x:e.x,y:e.y}};}
 const k=e.skill;k.age++;e.warning=k.age<=k.warningTicks;
 if(k.kind==='charge'&&k.age>k.warningTicks&&k.age<=k.warningTicks+38){const dx=k.target.x-k.origin.x,dy=k.target.y-k.origin.y,d=Math.max(1,Math.hypot(dx,dy)),speed=rage?6.2:5.3;e.x=clamp(e.x+dx/d*speed,25,365);e.y=clamp(e.y+dy/d*speed,205,490);if(dist(s,e)<40)damage(s);}
 if(k.kind==='charge'&&k.age===k.warningTicks+39){e.shieldOpen=95;e.stun=Math.max(e.stun,32);s.shake=12;s.message='Чек остановился! Щит открыт — стреляй!';}
 if(k.kind==='sweep'&&k.age===k.warningTicks){e.shieldOpen=75;if(dist(s,e)<95)damage(s);s.message='Чек: удар щитом! Отойди от красного круга';}
 if(k.kind==='fan'&&[0,24,48].includes(k.age-k.warningTicks)){const base=Math.atan2(k.target.y-e.y,k.target.x-e.x);for(const shift of [-.32,0,.32]){const angle=base+shift;projectile(s,e.x,e.y,Math.cos(angle)*(rage?3.9:3.2),Math.sin(angle)*(rage?3.9:3.2),true,'policechip');}}
 if(k.kind==='seizure'&&k.age===1){const spots=[k.target,{x:clamp(k.target.x+(k.target.x<195?90:-90),35,355),y:clamp(k.target.y+(k.target.y<380?55:-55),285,480)}];for(const t of spots)s.bossZones.push({...t,r:39,age:0,warningTicks:rage?58:76,owner:e.type});s.message='Рейз: конфискация! Уйди из красных зон';}
 if(k.age>k.warningTicks+(k.kind==='fan'?95:k.kind==='charge'?85:65)){e.skill=null;e.nextSkill=rage?65:95;}
 }
}
function fight(s,a){
 if(!['exit','room-transition'].includes(s.phase)){s.dashCooldown=Math.max(0,(s.dashCooldown||0)-1);s.superCooldown=Math.max(0,(s.superCooldown||0)-1);}s.superFlash=Math.max(0,(s.superFlash||0)-1);
 if(s.door?.open)s.door.openProgress=Math.min(1,(s.door.openProgress||0)+1/45);
 // Feet stay within the floor plane; the club wall is scenery, never walkable.
 if(s.phase==='room-transition'){s.roomTransition--;if(!s.roomTransition)enterRomaRoom(s);return;}
 if(s.phase==='exit'){move(s,a,2.7);aroundTables(s,s,s.previousX,s.previousY);if(Math.hypot(s.x-s.door.x,s.y-s.door.y)<42&&(a.special||a.right)){s.phase='room-transition';s.roomTransition=45;s.shots=[];}return;}
 move(s,a,2.7);s.x=clamp(s.x,30,360);s.y=clamp(s.y,205,490);aroundTables(s,s,s.previousX,s.previousY);

 if(a.super&&!s.superCooldown){s.superCooldown=3600;s.superFlash=75;s.inv=Math.max(s.inv,45);s.message='120 ТЫСЯЧ!';for(const e of s.enemies){if(e.hp<=0)continue;const d=Math.max(1,dist(s,e));for(let n=-2;n<=2;n++){const angle=Math.atan2(e.y-s.y,e.x-s.x)+n*.07;projectile(s,s.x,s.y,Math.cos(angle)*8.5,Math.sin(angle)*8.5,false,'supernote');}e.stun=Math.max(e.stun,90);}}
 if(a.jump&&!s.dashCooldown){s.dashCooldown=75;s.inv=Math.max(s.inv,30);s.x=clamp(s.x+((a.left?-1:a.right?1:-s.facing)*65),30,360);aroundTables(s,s,s.previousX,s.previousY);s.message='Отмена операции!';}
 const target=s.enemies.filter(e=>e.hp>0).sort((u,v)=>dist(s,u)-dist(s,v))[0];
 if(a.attack&&!s.cooldown&&target){s.cooldown=18;s.attack=8;const d=Math.max(1,dist(s,target));s.facing=target.x>s.x?1:-1;projectile(s,s.x,s.y,(target.x-s.x)/d*7,(target.y-s.y)/d*7,false,'banknote');}
 if(a.special&&!s.specialCooldown){s.specialCooldown=210;s.cashTraps.push({x:s.x,y:s.y,life:240});s.message='Инкассация! Охрана отвлеклась на деньги';for(const e of s.enemies)if(e.hp>0&&dist(s,e)<150){const oldX=e.x,oldY=e.y;e.stun=80;e.hp--;e.x=clamp(e.x+(e.x-s.x)/Math.max(1,dist(s,e))*45,30,360);aroundTables(s,e,oldX,oldY);}}
 for(const trap of s.cashTraps)trap.life--;s.cashTraps=s.cashTraps.filter(t=>t.life>0);
 const enemyStarts=new Map(s.enemies.map(e=>[e,{x:e.x,y:e.y}]));if(s.phase==='boss')brothers(s);for(const e of s.enemies){const old=enemyStarts.get(e);aroundTables(s,e,old.x,old.y);}
 for(const e of s.enemies){if(e.hp<=0)continue;e.timer++;e.stun=Math.max(0,e.stun-1);e.warning=!!e.skill&&e.skill.age<=e.skill.warningTicks;const bait=!e.stun?s.cashTraps.find(t=>t.life>0&&dist(e,t)<170):null,goal=bait||s,d=Math.max(1,dist(e,goal));e.baiting=!!bait;e.facing=goal.x>e.x?1:-1;if(e.stun)continue;
 if(bait&&d<23){e.stun=90;e.baiting=false;e.facing=s.x>e.x?1:-1;bait.life=0;s.score+=15;continue;}
 const cadence=s.phase==='boss'?125:Math.max(105,165-(s.wave-1)*9);const cycle=e.timer%cadence;
 if(s.phase!=='boss'&&cycle<35){e.warning=true;if(cycle===1)e.target={x:s.x,y:s.y};}
 const speed=(e.type===2?.65:e.type===1?1.05:.85)*(s.phase==='boss'?1:1+(s.wave-1)*.055);
 if(cycle>=35&&(!e.skill||bait)){const oldX=e.x,oldY=e.y,target=guardWaypoint(s,e,goal),length=Math.max(1,dist(e,target));e.x=clamp(e.x+(target.x-e.x)/length*speed,25,365);e.y=clamp(e.y+(target.y-e.y)/length*speed,205,490);aroundTables(s,e,oldX,oldY);}
 if(s.phase!=='boss'&&cycle===35&&e.type===1&&e.target){const len=Math.max(1,dist(e,e.target));const angle=Math.atan2(e.target.y-e.y,e.target.x-e.x),v=2.7+(s.wave-1)*.12;for(const offset of (s.wave>=5?[-.17,0,.17]:[0]))projectile(s,e.x,e.y,Math.cos(angle+offset)*v,Math.sin(angle+offset)*v,true,'chip');}
 if(dist(s,e)<32)damage(s);
 }
 for(const e of s.enemies){const old=enemyStarts.get(e);const distance=old?Math.hypot(e.x-old.x,e.y-old.y):0;e.walking=distance>.05;e.walkDistance=(e.walkDistance||0)+distance;}
 if(s.enemies.every(e=>e.hp<=0)){if(s.phase==='boss'){s.boss.hp=0;s.won=true;s.phase='done';}else{s.phase='exit';s.door.open=true;s.shots=[];s.message='Зал свободен. Пройди в дверь справа сверху';}}
 if(s.phase==='boss')s.boss.hp=s.enemies.reduce((n,e)=>n+Math.max(0,e.hp),0);s.progress=s.wave;
}
function platform(s,a){const oldY=s.y;s.x=clamp(s.x+((a.right?1:0)-(a.left?1:0))*3.1,20,s.world-25);if(s.gates[0]&&!s.gates[0].open&&s.x>s.gates[0].x-25){s.x=s.gates[0].x-25;if(a.special){s.gates[0].open=true;s.health=Math.min(5,s.health+1);}}
 if(a.jump&&s.ground){s.vy=-11.4;s.ground=false;}s.vy+=.48;s.y+=s.vy;s.ground=false;for(const p of s.platforms){p.y=p.base+(p.moving?Math.sin(s.tick*.023)*(14+8*s.intensity):0);if(s.vy>=0&&s.x>p.x-12&&s.x<p.x+p.w+12&&oldY<=p.y+5&&s.y>=p.y){s.y=p.y;s.vy=0;s.ground=true;}}
 for(const token of s.tokens){if(!token.collected&&Math.hypot(s.x-token.x,s.y-35-token.y)<42){token.collected=true;s.score+=25;s.picked++;}}
 if(a.special&&s.phase==='route'&&!s.specialCooldown){s.specialCooldown=180;s.ventOffUntil=s.tick+110;}s.ventCycle=Math.round(160-25*s.intensity);for(const v of s.vents){if(s.tick>(s.ventOffUntil||0)&&s.tick%s.ventCycle>s.ventCycle-60&&Math.abs(s.x-v)<22&&s.y>350)damage(s);}
 if(s.x>1000&&s.checkpoint<1){s.checkpoint=1;s.health=Math.min(5,s.health+1);}if(s.x>2050&&s.checkpoint<2){s.checkpoint=2;s.health=Math.min(5,s.health+1);}
 if(s.y>565){damage(s);if(!s.lost)s.x=[70,1030,2050][s.checkpoint];s.y=290;s.vy=0;}
 s.progress=Math.floor(s.x/165);if(s.picked>=12)s.secret=true;if(s.x>5690&&s.phase==='route'){s.phase='boss';s.health=Math.min(5,s.health+2);}if(s.phase==='boss'){s.boss.timer++;s.boss.warning=s.boss.timer%115<45;if(s.boss.timer%115===45){for(let i=0;i<3;i++)projectile(s,s.boss.x-25,s.y-35-i*40,-3.5,0,true,'card');}if(a.attack&&!s.cooldown&&Math.abs(s.x-s.boss.x)<105){s.cooldown=32;s.attack=12;hurtBoss(s,1);}if(a.special&&!s.specialCooldown&&Math.abs(s.x-s.boss.x)<115){s.specialCooldown=110;s.inv=Math.max(s.inv,30);hurtBoss(s,1);}}
}
function snake(s,a){s.platforms=train(s);const oldY=s.y;s.x=clamp(s.x+((a.right?1:0)-(a.left?1:0))*3,15,s.world-30);if(a.jump&&s.ground){s.vy=-10.8;s.ground=false;}s.vy+=.45;s.y+=s.vy;s.ground=false;for(const p of s.platforms){if(s.vy>=0&&s.x>=p.x-8&&s.x<=p.x+p.w+8&&oldY<=p.y+8&&s.y>=p.y){s.y=p.y;s.vy=0;s.ground=true;}}
 if(s.y>560){damage(s);if(!s.lost)s.x=s.checkpoint||70;s.y=260;s.vy=0;}
 if(s.phase==='route'){for(const l of s.locks){if(!l.open&&a.special&&Math.abs(s.x-l.x)<60){l.open=true;s.picked++;s.score+=80;s.checkpoint=l.x;s.health=Math.min(5,s.health+1);}}if(s.picked===7&&s.x>3470){s.phase='boss';s.boss.timer=0;s.targetX=3540;s.health=Math.min(5,s.health+1);s.secret=s.hits===0;}}
 if(s.phase==='boss'){s.boss.timer++;s.boss.warning=s.boss.timer%170<95;if(s.boss.timer%170===1)s.targetX=clamp(s.x+(s.boss.hp%2?85:-85),3390,3780);if(s.boss.timer%170===95&&Math.abs(s.x-s.targetX)<65)damage(s);if(a.special&&!s.specialCooldown&&Math.abs(s.x-s.targetX)<55&&s.boss.warning){s.specialCooldown=130;hurtBoss(s,1);}}s.progress=s.picked;
}
function flight(s,a){if(a.special&&!s.specialCooldown){s.specialCooldown=240;s.inv=Math.max(s.inv,75);if(s.flight)s.flight.invulnerableUntil=s.flight.tick+75;}
 if(s.phase==='route'){const f=s.flight;const flap=(a.jump||a.up)&&f.tick-f.lastFlap>=12;Flight.step(f,flap);if(!f.alive){damage(s);if(!s.lost){f.alive=true;f.y=clamp(f.y,100,450);f.vy=0;f.obstacles=f.obstacles.filter(o=>o.x>f.x+85||o.x<f.x-85);f.invulnerableUntil=f.tick+80;}}s.x=f.x;s.y=f.y*.78+60;s.score=f.score*20;s.progress=f.passes;const supply=Math.floor(f.passes/20);if(supply>s.checkpoint){s.checkpoint=supply;s.health=Math.min(5,s.health+1);s.message="Ремкомплект: +1 здоровье";}if(f.passes>=70){s.phase='boss';s.enemies=[];s.health=Math.min(5,s.health+1);s.vy=0;s.x=85;}}
 else{if(a.jump||a.up)s.vy=-3.8;s.vy=clamp(s.vy+.18,-4.5,4.5);s.y=clamp(s.y+s.vy,110,475);s.boss.timer++;s.boss.y=265+Math.sin(s.tick*.017)*130;s.boss.warning=s.boss.timer%115<55;if(s.boss.timer%115===55){for(let i=-1;i<=1;i++)projectile(s,290,s.boss.y,-3.5,i*.7,true,'water');}if(a.attack&&!s.cooldown){s.cooldown=25;projectile(s,s.x+20,s.y,6,0,false,'water');}if(s.boss.hp===2)s.secret=s.hits<2;}
}
function shooter(s,a){if(s.phase==='duel')return;move(s,a,2.6);s.timer--;if(s.timer<=0)s.lost=true;if(a.jump&&!s.reload&&s.ammo<6)s.reload=75;if(s.reload){s.reload--;if(!s.reload)s.ammo=6;}if(a.special&&!s.specialCooldown){s.specialCooldown=220;s.inv=Math.max(s.inv,120);s.switches++;if(s.switches>=2)s.secret=true;}if(a.attack&&!s.cooldown&&!s.reload){if(!s.ammo){s.reload=75;}else{s.ammo--;s.cooldown=18;const target=s.enemies.find(e=>e.hp>0)||s.boss,d=Math.max(1,dist(s,target));projectile(s,s.x,s.y,(target.x-s.x)/d*7,(target.y-s.y)/d*7,false);}}
 for(const e of s.enemies){if(e.hp<=0)continue;if(s.tick%Math.round(150-35*s.intensity)===0){const d=Math.max(1,dist(s,e));projectile(s,e.x,e.y,(s.x-e.x)/d*2.4,(s.y-e.y)/d*2.4,true);}}
 if(s.enemies.every(e=>e.hp<=0)&&s.phase==='route'){if(s.room<7){s.room++;s.x=55;s.y=455;s.ammo=6;s.health=Math.min(5,s.health+1);s.shots=[];s.enemies=[{x:320,y:345,hp:3,type:0},{x:65,y:190,hp:3,type:1},{x:300,y:140,hp:3,type:1}];s.covers=s.room===2?[{x:75,y:290,w:90,h:28},{x:225,y:230,w:90,h:28}]:[{x:135,y:310,w:105,h:28},{x:135,y:200,w:105,h:28}];}else{s.phase='duel';s.hand=0;}}
if(s.phase==='boss'){s.boss.timer++;const beat=s.boss.timer%130;if(beat===1){s.aim={x:s.x,y:s.y};s.boss.warning=true;}if(beat===70){const d=Math.hypot(s.aim.x-s.boss.x,s.aim.y-s.boss.y);projectile(s,s.boss.x,s.boss.y,(s.aim.x-s.boss.x)/d*6,(s.aim.y-s.boss.y)/d*6,true,'snipe');s.boss.warning=false;}}}
function final(s,a){move(s,a,2.8);const phase=Math.min(3,Math.floor((s.boss.max-s.boss.hp)/(s.boss.max/4)));if(phase>s.finalPhase)s.health=Math.min(5,s.health+1);s.finalPhase=phase;s.boss.timer++;const beat=s.boss.timer%165;s.boss.warning=beat<60;
 if(beat===1)s.aim={x:s.x,y:s.y};if(beat===60){if(phase===0){for(let i=0;i<5;i++)projectile(s,75+i*60,100,0,2.7,true,'card');}else if(phase===1){for(let i=-1;i<=1;i++)projectile(s,s.aim.x+i*55,110,0,3,true,'card');}else{const d=Math.max(1,dist(s,s.boss));for(let i=-1;i<=1;i++)projectile(s,s.boss.x,s.boss.y,(s.x-s.boss.x)/d*3+i*.6,(s.y-s.boss.y)/d*3,true,'water');}}
 if(a.jump&&!s.jumpHeight)s.jumpSpeed=8;if(a.special&&!s.specialCooldown){s.specialCooldown=300;s.inv=Math.max(s.inv,90);}if(a.attack&&!s.cooldown&&!s.boss.warning&&s.finalCycleFired!==Math.floor(s.boss.timer/165)){s.cooldown=28;s.attack=12;if(phase<2){if(dist(s,s.boss)<125){hurtBoss(s,1);s.finalCycleFired=Math.floor(s.boss.timer/165);}}else{projectile(s,s.x,s.y,(s.boss.x-s.x)/Math.max(1,dist(s,s.boss))*7,(s.boss.y-s.y)/Math.max(1,dist(s,s.boss))*7,false);s.finalCycleFired=Math.floor(s.boss.timer/165);}}if(s.boss.hp<=6)s.secret=s.hits<3;
}
function shots(s){for(const p of s.shots){p.x+=p.vx;p.y+=p.vy;p.life--;if(s.chapter===1&&p.kind!=='supernote'&&(s.props||[]).some(f=>f.cover&&((p.x-f.x)/(f.w/2))**2+((p.y-f.y)/(f.h/2))**2<1)){p.life=0;continue;}if(s.covers?.some(c=>p.x>c.x&&p.x<c.x+c.w&&p.y>c.y&&p.y<c.y+c.h)){p.life=0;continue;}if(p.enemy){if(s.jumpHeight<30&&Math.hypot(p.x-s.x,p.y-(s.chapter===2?s.y-25:s.y))<22){damage(s);p.life=0;}}else{const enemy=s.enemies.find(e=>e.hp>0&&dist(e,p)<30);if(enemy){if(s.chapter===1&&enemy.type===2&&!enemy.stun&&!enemy.shieldOpen&&p.kind!=='supernote'&&p.vx*(enemy.facing|| (s.x>enemy.x?1:-1))<0){enemy.shieldHits=(enemy.shieldHits||0)+1;if(enemy.shieldHits%4!==0){p.life=0;s.message='Щит: отвлеки инкассацией или пробей очередью';continue;}}enemy.hp-=p.kind==='supernote'?2:p.kind==='chair'?2:1;enemy.stun=s.chapter===1?(s.phase==='boss'?6:20):50;if(s.chapter===1){const oldX=enemy.x,oldY=enemy.y;enemy.x=clamp(enemy.x+p.vx*2.5,25,365);enemy.y=clamp(enemy.y+p.vy*2.5,205,490);aroundTables(s,enemy,oldX,oldY);}if(p.kind==='chair')enemy.x=clamp(enemy.x+p.vx*7,30,(s.world||390)-30);s.score+=30;p.life=0;}else if(s.chapter!==1&&s.phase==='boss'&&dist(s.boss,p)<45){hurtBoss(s,1);p.life=0;}}}s.shots=s.shots.filter(p=>p.life>0&&p.x>-100&&p.x<(s.world||390)+100&&p.y>-100&&p.y<600);}
function choose(s,choice){if(s.chapter!==5||s.phase!=='duel'||s.won||s.lost)return false;const answers=['fold','call','raise'];if(choice===answers[s.hand]){s.score+=100;s.hand++;if(s.hand===3)s.phase='boss';return true;}damage(s);return false;}
function revive(s){s.lost=false;s.health=5;s.inv=180;s.vy=0;s.shots=s.shots.filter(p=>!p.enemy);if(s.chapter===2||s.chapter===3){const p=s.platforms.reduce((best,p)=>Math.abs(p.x+p.w/2-s.x)<Math.abs(best.x+best.w/2-s.x)?p:best,s.platforms[0]);if(p){s.x=clamp(s.x,p.x+15,p.x+p.w-15);s.y=p.y-40;s.ground=false;}}if(s.chapter===1){s.bossZones=[];for(const e of s.enemies){e.skill=null;e.nextSkill=90;}}if(s.timer<=0)s.timer=60*60;if(s.flight){const f=s.flight;f.alive=true;f.vy=0;f.y=clamp(f.y,100,450);f.obstacles=f.obstacles.filter(o=>Math.abs(o.x-f.x)>85);f.invulnerableUntil=f.tick+180;}return s;}
function createBoss(chapter){const s=create(chapter);s.phase='boss';s.enemies=[];if(chapter===1){s.roomName=romaRooms[7];s.roomSkin=3;s.furniture=romaTables(7);s.props=romaProps(7);s.wave=7;s.x=70;s.y=410;s.boss.hp=s.boss.max=34;s.enemies=[{x:300,y:365,hp:18,type:2,timer:0,stun:0},{x:340,y:445,hp:16,type:1,timer:60,stun:0}];}if(chapter===2){s.x=5730;s.y=430;s.gates[0].open=true;}if(chapter===3){s.x=3500;s.y=300;s.targetX=3540;s.picked=7;}if(chapter===5)s.room=7;return s;}
return {create,createBoss,step,names,choose,revive};});
