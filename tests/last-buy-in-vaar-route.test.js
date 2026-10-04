const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-campaign-engine.js');
test('Vaar route varies gaps, heights and hazards and leads to three archive keys',()=>{
 const s=E.create(2);assert.equal(s.world,13850);assert.equal(s.caseKeys.length,3);assert.equal(s.districts.length,5);
 assert.ok(new Set(s.platforms.slice(1).map((p,i)=>p.x-s.platforms[i].x-s.platforms[i].w)).size>=5);
 assert.ok(new Set(s.platforms.map(p=>p.y)).size>=6);assert.ok(s.platforms.some(p=>p.lift)&&s.platforms.some(p=>p.crumble));
 assert.ok(s.streetHazards.length>=3&&s.traps.length>=3&&s.fences.length>=3);assert.ok(s.archive.x>s.world-400);
});
test('arrival alone cannot win: unlock the archive, enter and take the case',()=>{
 const s=E.create(2);s.enemies=[];s.traps=[];s.mushrooms=[];s.x=s.world-50;s.y=465;s.ground=true;
 E.step(s,{special:true});assert.equal(s.won,false);assert.equal(s.x,s.archive.x-24);
 for(const k of s.caseKeys)k.collected=true;for(let i=0;i<60;i++)E.step(s,{});assert.equal(s.archive.openTicks,60);assert.equal(s.won,false);
 for(let i=0;i<15;i++)E.step(s,{right:true});assert.ok(s.x>=s.archive.x+12);assert.equal(s.won,false);
 E.step(s,{special:true});assert.equal(s.won,true);assert.equal(s.archive.caseTaken,true);assert.equal(s.progress,100);
});
test('collected archive keys survive loss of a campaign life',()=>{const s=E.create(2);s.caseKeys[0].collected=true;s.lost=true;E.revive(s);assert.equal(s.caseKeys[0].collected,true);assert.equal(s.caseKeys[1].collected,false);});
