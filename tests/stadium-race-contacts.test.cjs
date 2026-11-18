const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-race-engine.js');
function car(distance,lateral=0,speed=6){return {distance,lateral,speed,heading:0,tier:0,lateralVelocity:0};}
test('rear-end collision transfers speed without teleporting into another lane',()=>{
 const a=car(105,0,8),b=car(180,0,4),hit=E.vehicleCollision(a,b,97,176);
 assert.equal(hit.axis,'z');const impact=E.separateVehicles(a,b,false,hit);
 assert.ok(impact.severity>.3);assert.ok(a.speed<8&&b.speed>4);assert.equal(a.lateral,0);assert.equal(b.lateral,0);
 assert.ok((b.distance-a.distance)*.06>=4.65);assert.ok(a.distance>97&&b.distance<185);
});
test('a glancing side touch scrubs little speed and leaves a decaying lateral impulse',()=>{
 const a=car(100,.12,7),b=car(100,-.12,7);a.previousLateral=.16;b.previousLateral=-.16;a.lateralVelocity=-.005;
 const hit=E.vehicleCollision(a,b,93,93);assert.equal(hit.axis,'x');const impact=E.separateVehicles(a,b,false,hit);
 assert.ok(a.speed>6.7);assert.ok(impact.severity<.2);assert.ok(a.contactVelocity>0);
 assert.ok(Math.abs(a.lateral-b.lateral)*E.roadWidth(100)>1.84);
});
test('swept side crossing cannot tunnel through another car',()=>{
 const a=car(100,-.4),b=car(100,0);a.previousLateral=.4;
 const hit=E.vehicleCollision(a,b,94,94);assert.ok(hit);E.separateVehicles(a,b,false,hit);
 assert.ok(a.lateral>b.lateral);assert.equal(E.vehicleContact(a,b,a.distance,b.distance),false);
});
test('head-on traffic stays immutable and stops the player without disabling separation during immunity',()=>{
 const s=E.create();s.countdown=0;s.tick=100;s.inv=100;s.rivals=[];s.speed=8;
 const traffic=E.trafficAt(100)[0],saved={...traffic};s.distance=traffic.distance-80;s.lateral=traffic.lateral;
 E.step(s,{driving:true});assert.ok(s.speed<4);assert.equal(s.hits,0);assert.ok(s.impact.strength>.5);assert.deepEqual(traffic,saved);
 assert.equal(E.vehicleContact(s,E.trafficAt(101)[0],s.distance,E.trafficAt(101)[0].distance),false);
});
test('turning cars use their rotated footprint; airborne and other decks remain separate',()=>{
 const a=car(100,.4),b=car(100,0);assert.equal(E.vehicleContact(a,b,100,100),false);
 a.heading=1;assert.equal(E.vehicleContact(a,b,100,100),true);
 b.tier=1;assert.equal(E.vehicleContact(a,b,100,100),false);b.tier=0;a.airDuration=120;a.air=60;assert.equal(E.vehicleContact(a,b,100,100),false);
});
test('road lane pitch leaves overtaking room for touring cars',()=>{
 for(const d of [0,E.cityDistance(6000),E.cityDistance(9000)]){
  const layout=E.roadLayout(d);assert.ok(Math.abs(layout.laneWidth-4.2)<1e-8);assert.ok(layout.laneWidth>2*E.vehicleHull(car(0)).x*1.8);
 }
});
test('restart clears crash effects, contact momentum and cooldowns',()=>{
 const state=E.create();state.crash={started:9};state.impact={started:9};state.contactVelocity=.02;state.contactCooldown=12;state.bumpCooldown=8;
 E.revive(state);assert.equal(state.crash,null);assert.equal(state.impact,null);assert.equal(state.contactVelocity,0);assert.equal(state.contactCooldown,0);assert.equal(state.bumpCooldown,0);
});

test('Jersey blocks contact the front bumper at the same metre clearance on both road widths',()=>{
 for(const barrier of [
  E.trackObjects(2800).find(o=>o.key==='0:3000'),
  E.trackObjects(E.cityDistance(7100)).find(o=>o.key==='city:1:7070'),
 ]){
  for(const [offset,expectedHits] of [[2.25,1],[2.62,0]]){
   const s=E.create(9);s.rivals=[];s.countdown=0;s.speed=5;
   s.distance=barrier.distance-45;
   s.lateral=barrier.lateral+offset/E.roadWidth(barrier.distance);
   E.step(s,{});
   assert.ok(s.distance<barrier.distance);
   assert.equal(s.hits,expectedHits);
  }
 }
});

test('parallel angled cars can pass mirror to mirror, and contact begins at the body',()=>{
 const a=car(500),b=car(500);
 a.heading=b.heading=Math.PI/4;
 function offset(metres){a.lateral=metres*Math.cos(a.heading)/E.roadWidth(500);a.distance=b.distance-metres*Math.sin(a.heading)/.06;}
 offset(1.9);assert.equal(E.vehicleContact(a,b),false);
 offset(1.8);assert.equal(E.vehicleContact(a,b),true);
});

test('a normal boosted ramp clears a slow rival in the same lane and lands ahead',()=>{
 const s=E.create(9,{transport:'bmw-e60'}),r=s.rivals[0];s.rivals=[r];
 Object.assign(s,{distance:3851,countdown:0,speed:9,boost:120});
 Object.assign(r,{distance:s.distance+135,lateral:0,currentSpeed:2,stun:150,targetLane:0});
 let crossed=false;
 for(let n=0;n<80;n++){
  E.step(s,{driving:true});
  if(s.air&&Math.abs(s.distance-r.distance)<10&&Math.abs(s.lateral-r.lateral)<.18){
   crossed=true;assert.ok(E.vehicleHeight(s)>1.39);
  }
 }
 assert.ok(crossed);assert.equal(s.impact,null);assert.equal(s.perfectLandings,1);assert.ok(s.distance>r.distance);
});
