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
