const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-race-engine.js');
function race(strategy,sprint=true){const s=E.create(9,{sprint});s.countdown=0;let frames=0;for(;frames<12000&&!s.won&&!s.lost;frames++){const r=E.road(s.distance),lane=r.city?.5:0,feed=-r.curve*.03034*(1+s.speed*.055);E.step(s,{driving:true,steer:strategy==='idle'?0:Math.max(-1,Math.min(1,feed+(lane-s.lateral)*1.5-s.heading*2)),down:strategy!=='idle'&&Math.abs(r.curve)>5&&s.speed>3.5,special:strategy==='nitro'&&Math.abs(r.curve)<2&&s.nitro>10});}return {...s,seconds:frames/60};}
test('sprint rewards cornering and planned nitro rather than passive driving',()=>{const idle=race('idle'),clean=race('clean'),nitro=race('nitro');assert.equal(idle.lost,true);assert.equal(idle.position,4);assert.ok(clean.position<idle.position);assert.ok(nitro.seconds<clean.seconds);assert.equal(nitro.won,true);assert.equal(nitro.position,1);assert.ok(nitro.hits<idle.hits);});

test('full race triples the sprint distance and remains winnable with driving controls',()=>{
 const short=E.create(9,{sprint:true}),long=E.create(9);
 assert.equal(E.LAP*3-long.startDistance,3*(E.LAP*3-short.startDistance));
 const result=race('nitro',false);
 assert.equal(result.won,true);assert.equal(result.lap,3);assert.equal(result.progress,100);
 E.revive(result);assert.equal(result.distance,0);assert.equal(result.sprint,false);
});
