const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-race-engine.js');
test('crossing car approaches, waits behind stop line and drives forward across the road',()=>{
 const get=t=>E.crossTrafficAt(t)[0],edge=E.roadLayout(E.crossings[0].distance).halfWidth;
 assert.ok(get(119).lateral>get(0).lateral);assert.equal(get(120).lateral,get(239).lateral);
 assert.ok(Math.abs(get(120).lateral)*E.roadWidth(get(120).distance)-2.4>edge);
 for(let tick=241;tick<600;tick++){const a=get(tick-1),b=get(tick);assert.ok(b.lateral>=a.lateral);assert.ok((b.lateral-a.lateral)*E.roadWidth(b.distance)<.35);assert.equal(b.heading,Math.PI/2);assert.ok(b.wheelDistance>=a.wheelDistance);}
 assert.equal(get(700).active,false);assert.ok(Math.abs(get(599).lateral)*E.roadWidth(get(599).distance)>edge+10);
});
test('crossing collision hits a car throughout the junction, not just at an item trigger',()=>{
 let tick=240;for(let t=241;t<600;t++)if(Math.abs(E.crossTrafficAt(t)[0].lateral)<Math.abs(E.crossTrafficAt(tick)[0].lateral))tick=t;
 const car=E.crossTrafficAt(tick)[0];
 for(const air of [false,true]){const s=E.create();s.countdown=0;s.rivals=[];s.tick=tick-1;s.distance=car.distance-4;s.lateral=car.lateral;s.speed=6;if(air){s.airDuration=120;s.air=60;}E.step(s,{driving:true});assert.equal(s.hits,air?0:1);if(!air)assert.equal(s.impact.kind,'crossing');}
});
test('side street traffic cannot collide across an upper route or teleport across its cycle reset',()=>{
 const before=E.crossTrafficAt(839)[0],after=E.crossTrafficAt(840)[0];assert.equal(before.active,false);assert.ok(Math.abs(after.lateral)>1.2);assert.equal(after.previousLateral,after.lateral);
 const player={distance:after.distance,lateral:after.lateral,tier:1};assert.equal(E.vehicleContact(player,after,player.distance,after.distance),false);
});
test('every replacement has a side street before the bridge',()=>{
 assert.equal(new Set(E.crossings.map(j=>j.distance)).size,E.crossings.length);
 assert.ok(E.crossings.every(j=>!E.road(j.distance).bridge));
});

test('junctions commit to a departure before the side street is in view',()=>{
 for(const speed of [4,6,8]){
  const s=E.create(),j=E.crossings[1];Object.assign(s,{countdown:0,rivals:[],distance:j.distance-2251,speed});
  E.step(s,{driving:true});const offset=s.crossingOffsets[j.id];assert.ok(Number.isFinite(offset));
  const eta=s.tick+Math.round((j.distance-s.distance)/s.speed);
  const lead=E.crossTrafficAt(eta,s.crossingOffsets).find(c=>c.id===j.id);
  assert.ok(Math.abs(lead.lateral)<.65,'the lead car reaches a racing lane near the predicted arrival');
  const pair=E.crossTrafficAt(eta,s.crossingOffsets).filter(c=>c.junctionId===j.id);
  assert.equal(pair.length,2);assert.equal(pair[1].side,-lead.side);
  assert.ok(Math.abs(pair[1].distance-lead.distance)*.06>2.8);
  for(let tick=0;tick<120;tick++)E.step(s,{driving:true,down:true});
  assert.equal(s.crossingOffsets[j.id],offset,'changing speed cannot retime side traffic');
 }
});
test('full race uses three different opening lines and pickup layouts',()=>{
 const signatures=[0,E.LAP,2*E.LAP].map(start=>[700,1500,2750,3400].map(d=>E.road(start+d).curve.toFixed(2)).join('/'));
 assert.equal(new Set(signatures).size,3);
 const layouts=[0,1,2].map(lap=>E.trackObjects(lap*E.LAP).filter(o=>o.key.startsWith(lap+':')&&o.distance-lap*E.LAP<4300).map(o=>o.kind).join('/'));
 assert.equal(new Set(layouts).size,3);
});

test('lifting speed after the warning clears both service and boulevard junctions',()=>{
 for(const junction of [E.crossings[1],E.crossings[2]])for(const brake of [false,true]){
  const s=E.create();Object.assign(s,{countdown:0,rivals:[],distance:junction.distance-2260,speed:6.2,lateral:.45,tick:800});
  let warnedAt=null,hit=false;
  for(let n=0;n<1200&&s.distance<junction.distance+220;n++){
   if(warnedAt===null&&s.hazardWarning?.kind==='crossing')warnedAt=s.tick;
   const feed=-E.road(s.distance).curve*.03034*(1+s.speed*.055);
   const steer=Math.max(-1,Math.min(1,feed+(.45-s.lateral)*1.5-s.heading*2));
   E.step(s,{driving:true,steer,down:brake&&warnedAt!==null&&s.tick-warnedAt<24});
   if(s.impact?.kind==='crossing')hit=true;
  }
  assert.notEqual(warnedAt,null);assert.ok(s.distance>=junction.distance+220);
  assert.equal(hit,!brake);
 }
});
