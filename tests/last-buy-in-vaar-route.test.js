const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-campaign-engine.js');
test('Vaar route varies gaps, heights and hazards and leads to three archive keys',()=>{
 const s=E.create(2);assert.equal(s.world,9695);assert.equal(s.caseKeys.length,3);assert.equal(s.districts.length,5);
 assert.ok(new Set(s.platforms.slice(1).map((p,i)=>p.x-s.platforms[i].x-s.platforms[i].w)).size>=5);
 assert.ok(new Set(s.platforms.map(p=>p.y)).size>=6);assert.ok(s.platforms.some(p=>p.lift)&&s.platforms.some(p=>p.crumble));
 assert.ok(s.streetHazards.length>=2&&s.traps.length>=3&&s.fences.length>=3);assert.ok(s.archive.x>s.world-400);
});
test('arrival alone cannot win: unlock the archive, enter and take the case',()=>{
 const s=E.create(2);s.enemies=[];s.traps=[];s.mushrooms=[];s.x=s.world-50;s.y=465;s.ground=true;
 E.step(s,{special:true});assert.equal(s.won,false);assert.equal(s.x,s.archive.x-24);
 for(const k of s.caseKeys)k.collected=true;for(let i=0;i<60;i++)E.step(s,{});assert.equal(s.archive.openTicks,60);assert.equal(s.won,false);
 for(let i=0;i<15;i++)E.step(s,{right:true});assert.ok(s.x>=s.archive.x+12);assert.equal(s.won,false);
 E.step(s,{special:true});assert.equal(s.won,true);assert.equal(s.archive.caseTaken,true);assert.equal(s.progress,100);
});
test('collected archive keys survive loss of a campaign life',()=>{const s=E.create(2);s.caseKeys[0].collected=true;s.lost=true;E.revive(s);assert.equal(s.caseKeys[0].collected,true);assert.equal(s.caseKeys[1].collected,false);});
test('Vaar has authored traversal districts and optional elevated rewards',()=>{const s=E.create(2);assert.ok(s.platforms.some(p=>p.district===1&&p.lift));assert.ok(s.platforms.some(p=>p.district===2&&p.swing));assert.ok(s.platforms.some(p=>p.district===3&&p.fade&&p.slide));assert.equal(s.bonusPlatforms.length,4);assert.equal(s.tokens.filter(t=>t.bonus).length,12);assert.equal(s.routeSigns.length,5);assert.ok(s.platforms.some(p=>p.baseY<=305));});

test('vertical police volleys are telegraphed, hit their column and leave adjacent space safe',()=>{for(const evade of [false,true]){const s=E.create(2),health=s.health;s.enemies=[];s.traps=[];s.streetHazards=[];s.big=0;s.inv=0;s.platforms=[{x:0,y:465,baseX:0,baseY:465,w:1000}];s.shooters=[{x:250,y:530,offset:0,volley:2}];s.x=evade?300:250;s.y=465;s.ground=true;s.tick=1;E.step(s,{});assert.equal(s.shooters[0].warning,true);for(let i=0;i<80;i++)E.step(s,{});assert.equal(s.health,evade?health:health-1);}});

function isolatedRoute(){const s=E.create(2);for(const key of ['enemies','traps','streetHazards','shooters','searchlights','mushrooms','blocks','pipes','fences','tokens'])s[key]=[];s.platforms=[{x:0,y:465,baseX:0,baseY:465,w:1000}];s.x=250;s.y=465;s.ground=true;s.springs=[];return s;}
test('conveyor carries a standing player and spring launches without an extra button',()=>{const s=isolatedRoute();s.platforms[0].conveyor=-1;for(let i=0;i<20;i++)E.step(s,{});assert.equal(s.x,225);s.springs=[225];E.step(s,{});assert.equal(s.ground,false);assert.equal(s.vy,-15);});
test('timed gate warns before rising and reopens on its next cycle',()=>{const s=isolatedRoute(),f={platform:s.platforms[0],side:'right',timed:true,offset:0,w:12,h:0};s.fences=[f];s.tick=150;E.step(s,{});assert.equal(f.warning,true);assert.equal(f.open,true);s.tick=200;E.step(s,{});assert.equal(f.open,false);assert.equal(f.h,42);s.tick=270;E.step(s,{});assert.equal(f.open,true);assert.equal(f.h,0);});
test('searchlight allows escape before alarm, then triggers a dodgeable three-column volley',()=>{const s=isolatedRoute(),lamp={platform:s.platforms[0],offset:0,exposure:0,alert:0};s.searchlights=[lamp];for(let i=0;i<20;i++){s.x=500+Math.sin((s.tick+1)*.025)*80;E.step(s,{});}assert.equal(lamp.exposure,20);assert.equal(s.policeBullets.length,0);s.x=100;E.step(s,{});assert.equal(lamp.exposure,17);for(let i=0;i<28;i++){s.x=500+Math.sin((s.tick+1)*.025)*80;E.step(s,{});}assert.equal(lamp.alert,150);assert.equal(s.policeBullets.length,3);assert.equal(s.health,5);assert.equal(new Set(s.policeBullets.map(b=>b.x)).size,3);});
