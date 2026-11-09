const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-race-engine.js');
function race(strategy,sprint=false){const s=E.create(9,{sprint});s.countdown=0;let frames=0;for(;frames<12000&&!s.won&&!s.lost;frames++){const r=E.road(s.distance),lane=r.city?.5:0,feed=-r.curve*.03034*(1+s.speed*.055);E.step(s,{driving:true,steer:strategy==='idle'?0:Math.max(-1,Math.min(1,feed+(lane-s.lateral)*1.5-s.heading*2)),down:strategy!=='idle'&&Math.abs(r.curve)>5&&s.speed>3.5,special:strategy==='nitro'&&Math.abs(r.curve)<2&&s.nitro>10});}return {...s,seconds:frames/60};}
test('full race punishes passive driving and rewards planned nitro',()=>{const idle=race('idle'),clean=race('clean'),nitro=race('nitro');assert.equal(idle.lost,true);assert.equal(idle.position,4);assert.equal(clean.won,false);assert.ok(clean.seconds<idle.seconds);assert.ok(nitro.seconds<clean.seconds);assert.equal(nitro.won,true);assert.equal(nitro.position,1);assert.ok(nitro.hits<idle.hits);assert.ok(Math.min(...nitro.rivals.map(k=>nitro.distance-k.distance))<1500);});

test('full race triples the sprint distance and remains winnable with driving controls',()=>{
 const short=E.create(9,{sprint:true}),long=E.create(9);
 assert.equal(E.LAP*3-long.startDistance,3*(E.LAP*3-short.startDistance));
 const result=race('nitro',false);
 assert.equal(result.won,true);assert.equal(result.lap,3);assert.equal(result.progress,100);
 E.revive(result);assert.equal(result.distance,0);assert.equal(result.sprint,false);
});
test('rival acceleration has finite nitro and never teleports to catch the player',()=>{
 const s=E.create(9);s.countdown=0;s.distance=20000;
 for(let tick=0;tick<120;tick++){
  const positions=s.rivals.map(k=>k.distance);E.step(s,{driving:true});
  s.rivals.forEach((k,i)=>{assert.ok(k.distance-positions[i]<=8);assert.ok(k.nitro>=0&&k.nitro<=40);});
 }
 assert.ok(s.rivals.some(k=>k.nitro<35));
});
