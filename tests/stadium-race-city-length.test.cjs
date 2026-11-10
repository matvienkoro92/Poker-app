const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-race-engine.js');
test('city is exactly three times longer with a single final bridge',()=>{
 assert.equal(E.CITY_START,2*E.LAP+4300);
 assert.equal(E.FINISH-E.CITY_START,3*(3*E.LAP-E.CITY_START));
 for(let d=E.CITY_START;d<E.FINISH;d+=100){assert.equal(E.road(d).city,true);assert.equal(!!E.road(d).bridge,d>E.cityDistance(8500));}
 assert.equal(E.road(E.FINISH+4000).bridge,true);
});
test('all three city stretches have unique pickups and ramps',()=>{
 const keys=new Set();
 for(let block=0;block<3;block++){
  const start=E.CITY_START+block*5500;
  const objects=E.trackObjects(start).filter(o=>o.distance>=start&&o.distance<start+5500&&o.key.startsWith('city:'));
  assert.equal(objects.length,15);
  assert.ok(objects.some(o=>o.kind==='ramp'));
  for(const o of objects){assert.ok(!keys.has(o.key));keys.add(o.key);}
 }
});
test('old finish keeps racing and only extended finish ends the race',()=>{
 for(const sprint of [false,true]){
  const s=E.create(9,{sprint});s.countdown=0;s.speed=6;s.rivals=[];s.distance=3*E.LAP-1;
  E.step(s,{});assert.equal(s.won,false);assert.equal(s.lost,false);assert.ok(s.progress<100);
  s.distance=E.FINISH-1;E.step(s,{});assert.equal(s.won,true);assert.equal(s.progress,100);assert.equal(s.lap,sprint?1:3);
 }
});
