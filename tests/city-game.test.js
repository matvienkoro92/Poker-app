const test=require('node:test'),assert=require('node:assert/strict');
const load=()=>Promise.all([import('../scripts/city-game/engine.mjs'),import('../scripts/city-game/world.mjs')]);
function walker(E,s,x,z){for(let i=0;i<2400;i++){const dx=x-s.player.x,dz=z-s.player.z,d=Math.hypot(dx,dz);if(d<.15)return;E.step(s,{x:dx/d,z:dz/d,run:true});}throw Error('Walking route blocked at '+JSON.stringify(s.player)+' aiming '+x+','+z);}
function driver(E,s,x,z,max=10){for(let i=0;i<7200;i++){const c=s.car,dx=x-c.x,dz=z-c.z,d=Math.hypot(dx,dz);if(d<2.6){for(let n=0;n<100&&Math.abs(c.speed)>.1;n++)E.step(s,{brake:true});return;}const desired=Math.atan2(dx,dz),angle=Math.atan2(Math.sin(desired-c.yaw),Math.cos(desired-c.yaw)),speed=Math.min(max,Math.max(3,d*.8),Math.abs(angle)>.6?5:max);E.step(s,{forward:c.speed<speed?1:0,turn:Math.max(-1,Math.min(1,-angle*2.5)),brake:c.speed>speed+1});if(s.failed)throw Error('Car destroyed at '+JSON.stringify(c));}throw Error('Driving route stuck '+JSON.stringify(s.car)+' aiming '+x+','+z);}
test('full delivery works through movement, driving and interaction without changing mission state',async()=>{const [E,W]=await load(),s=E.create();assert.deepEqual(s.player,{...W.START,yaw:0});walker(E,s,87,159);assert.equal(E.interact(s),true);assert.equal(s.driving,true);assert.equal(s.phase,'club');function driveTo(target){for(const p of W.roadRoute(s.car,target))driver(E,s,p.x,p.z,18);driver(E,s,target.x,target.z,12);}
function visit(target){driveTo(target);assert.equal(E.interact(s),true);walker(E,s,target.x,target.z);assert.equal(E.interact(s),true);}
function board(){walker(E,s,s.car.x+2.8,s.car.z);assert.equal(E.interact(s),true);}
visit(W.HOME);assert.equal(s.briefed,true);assert.equal(s.phase,'port');board();visit(W.PICKUP);assert.equal(s.carrying,true);assert.equal(s.heat,1);board();visit(W.HOME);assert.equal(s.heat,0);
assert.equal(s.win,true);assert.equal(s.completed,true);assert.equal(s.phase,'complete');});
test('walls, water and club walls are solid, doorway remains traversable',async()=>{const [,W]=await load();assert.equal(W.blocked(-39,-23),true);assert.equal(W.blocked(-24,-11),false);assert.equal(W.blocked(125,0),true);for(const b of W.BUILDINGS)assert.equal(W.blocked(b.x,b.z),true);});
test('interaction checks physical proximity and safe vehicle exit speed',async()=>{const [E]=await load(),s=E.create();assert.equal(s.carrying,false);assert.equal(s.phase,'car');walker(E,s,87,159);E.interact(s);for(let i=0;i<45;i++)E.step(s,{forward:1});assert.equal(E.interact(s),false);assert.equal(s.driving,true);});
test('checkpoint retains the case and completed badge while resetting damage and motion',async()=>{const [E]=await load(),s=E.create({carrying:true,completed:true});assert.equal(s.carrying,true);assert.equal(s.phase,'escape');assert.equal(s.health,100);assert.equal(s.completed,true);assert.equal(s.driving,false);assert.deepEqual(E.checkpoint(s),{carrying:true,completed:true,briefed:true});});
test('traffic stays on roads over several loops and rescue does not place a car into buildings',async()=>{const [E,W]=await load(),s=E.create();for(let i=0;i<12000;i++)E.step(s,{});for(const t of s.traffic){assert.equal(W.blocked(t.x,t.z,1.5),false);}E.rescue(s);assert.equal(W.blocked(s.car.x,s.car.z,1.6),false);assert.equal(s.car.speed,0);});

test('new villa garage and front door have reachable passages',async()=>{const [E,W]=await load(),s=E.create();assert.equal(W.blocked(W.START.x,W.START.z),false);assert.equal(W.blocked(W.CAR_START.x,W.CAR_START.z,1.6),false);walker(E,s,87,159);E.interact(s);driver(E,s,40,160);assert.ok(s.car.x<53,'the kart must physically leave the villa garage');});

test('villa rooms remain reachable around solid furniture and roof thresholds have hysteresis',async()=>{const [,W]=await load();const queue=[W.START],seen=new Set();let at=0;while(at<queue.length){const p=queue[at++];for(const [dx,dz]of [[.5,0],[-.5,0],[0,.5],[0,-.5]]){const x=p.x+dx,z=p.z+dz,key=x+','+z;if(x<79||x>115||z<124||z>170||seen.has(key)||W.blocked(x,z))continue;seen.add(key);queue.push({x,z});}}for(const [name,x,z]of [['poker',95,133],['lounge',100,147],['billiards',100.5,161],['sauna',103,129],['gym',101,136]])assert.ok(queue.some(p=>Math.hypot(p.x-x,p.z-z)<.8),name+' must be reachable');assert.equal(W.villaInteriorAt(W.START),true);assert.equal(W.villaInteriorAt({x:81.8,z:147}),false);assert.equal(W.villaInteriorAt({x:81.8,z:147},.65),true);assert.equal(W.villaInteriorAt({x:80.5,z:147},.65),false);});

test('lighthouse estate exits directly onto the mainland promenade and stays separate from the park',async()=>{const [,W]=await load();assert.equal(W.blocked(135,40),true,'water between city and island');assert.equal(W.blocked(135,70,1.6),false,'bridge carries the kart');assert.equal(W.blocked(53,144,1.6),true,'estate fence is solid');assert.equal(W.blocked(53,160,1.6),false,'gate opening is wide enough');assert.equal(W.VILLA.x<130&&W.VILLA.z>100,true);const route=[W.CAR_START,...W.roadRoute(W.CAR_START,W.HOME),W.HOME];assert.ok(route.some(p=>p.x===40&&p.z===105));for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],length=Math.hypot(b.x-a.x,b.z-a.z);for(let n=0;n<=Math.ceil(length);n++){const t=n/Math.max(1,Math.ceil(length));assert.equal(W.blocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,1.6),false,'route must stay on land and clear the fence');}}});

test('ocean lounge replaces the lighthouse and is reachable through the garden passage',async()=>{const [E,W]=await load(),s=E.create();for(const [x,z]of [[87,159],[78,159],[78,171],[103,171],[103,175],[103,181]])walker(E,s,x,z);assert.equal(W.blocked(103,181),false);assert.equal(W.landAt(113,185),true,'deck over water is a supported walking surface');assert.equal(W.SOLIDS.some(b=>b.h===15&&b.minX<109&&b.maxX>109),false,'lighthouse collider must be removed');});
test('civilian circuits stay clear of solids from the villa gate to downtown and the docks',async()=>{
 const W=await import('../scripts/city-game/world.mjs');
 const {fleet}=await import('../scripts/city-game/traffic.mjs');
 const routes=new Set(fleet.map(vehicle=>vehicle.path));
 assert.ok(routes.size>=3);
 for(const path of routes)for(const [i,a] of path.entries()){
  const b=path[(i+1)%path.length],steps=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)*2);
  for(let j=0;j<=steps;j++){
   const f=j/(steps||1),x=a.x+(b.x-a.x)*f,z=a.z+(b.z-a.z)*f;
   assert.equal(W.blocked(x,z,1.5),false,`civilian lane blocked at ${x}, ${z}`);
  }
 }
});
test('villa routes reach all metropolitan landmarks on continuous drivable land',async()=>{
 const {roadRoute,blocked,CAR_START}=await import('../scripts/city-game/world.mjs');
 const {landmarks,roads}=await import('../scripts/city-game/metropolis.mjs');
 function check(a,b){
  const steps=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2);
  for(let j=0;j<=steps;j++){const t=j/(steps||1);assert.equal(blocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,1.6),false);}
 }
 for(const {a,b} of roads)check(a,b);
 for(const landmark of landmarks){
  let previous=CAR_START;
  for(const p of roadRoute(CAR_START,landmark)){check(previous,p);previous=p;}
  assert.equal(previous.x,landmark.x);assert.equal(previous.z,landmark.z);
 }
});

test('city mission markers use the campaign order, coordinates and reachable road entrances',async()=>{
 const chapters=require('../app-last-buy-in-chapters');
 const {missionSites,mapPoint,lunaSite}=await import('../scripts/city-game/metropolis.mjs');
 const {VILLA,CAR_START,blocked,roadRoute}=await import('../scripts/city-game/world.mjs');
 assert.deepEqual(missionSites.map(s=>s.id),chapters.activeOrder);
 for(const s of missionSites){
  const [u,v]=chapters[s.id].mapPoint;
  assert.deepEqual({x:s.x,z:s.z},mapPoint(u*6.4,v*6.4));
  const route=roadRoute(CAR_START,s.approach);
  assert.ok(Math.hypot(route.at(-1).x-s.approach.x,route.at(-1).z-s.approach.z)<.01);
  assert.equal(blocked(s.approach.x,s.approach.z,1.6),false);
 }
 const villa=mapPoint(93*6.4,93*6.4);
 assert.ok(Math.hypot(VILLA.x-villa.x,VILLA.z-villa.z)<.001);
 assert.deepEqual({x:lunaSite.x,z:lunaSite.z},mapPoint(58*6.4,56.5*6.4));
});

test('every mission GPS polyline from the villa clears a car hull along every segment',async()=>{
 const {missionSites}=await import('../scripts/city-game/metropolis.mjs');
 const {CAR_START,roadRoute,blocked}=await import('../scripts/city-game/world.mjs');
 for(const site of missionSites){
  let a=CAR_START;
  for(const b of roadRoute(a,site.approach)){
   const steps=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2);
   for(let j=1;j<=steps;j++){
    const t=j/steps;
    assert.equal(blocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,1.6),false,site.name);
   }
   a=b;
  }
 }
});
