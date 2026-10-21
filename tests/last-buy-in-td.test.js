const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../app-last-buy-in-td-engine');
const C=require('../app-last-buy-in-chapters');
function tick(s,seconds){for(let i=0;i<Math.ceil(seconds*10);i++)E.step(s,.1);}
function emptySlot(owner,s){return E.sectors.findIndex((v,i)=>v===owner&&!s.towers.some(t=>t.slot===i));}

test('compiled map includes the real governors, prices, requirements and final stages',()=>{
 assert.equal(E.governors.length,15);assert.equal(Object.keys(E.catalog).length,135);
 assert.equal(E.catalog.hC00.name,'Arrow Turret');assert.equal(E.catalog.hC00.cost,7);
 assert.equal(E.catalog.hC00.raw.rangen1,700);assert.equal(E.catalog.hC00.raw.cool1,Math.fround(.93));
 assert.deepEqual(E.catalog.hC60.requires,['harm','osld']);
 assert.equal(E.D.waves[0].countPerLane,20);assert.equal(E.D.waves[5].unit,'nhar');
 assert.equal(E.D.waves[39].unit,'nvlk');assert.equal(E.D.units.nvlk.hp,30000);
 assert.equal(E.D.waves[40].name,'Level 41: Damage Test');assert.match(E.D.waves[41].name,/Wrath of the Testers/);
 assert.equal(E.D.units.ndog.hp,15);assert.equal(E.D.abilities.Aspo.dataa[0],4);
});
test('original routes cross other sectors before reaching the shared center',()=>{
 for(const path of E.paths){assert.equal(path.length,13);assert.ok(Math.hypot(path.at(-1)[0]-250,path.at(-1)[1]-250)<2);const quadrants=new Set(path.slice(0,-1).map(([x,y])=>(x>=250?1:0)+(y>=250?2:0)));assert.equal(quadrants.size,4);}
 assert.ok(E.slots.length>100);assert.equal(E.slots.length,E.sectors.length);
});
test('construction enforces the governor, funds, prerequisites, sector, and occupancy',()=>{
 const s=E.create({autostart:false}),index=emptySlot(0,s);assert.equal(E.build(s,index,'oC87',0),false);assert.equal(E.build(s,index,'hC02',0),false);
 assert.equal(E.build(s,index,'hC00',1),false);assert.equal(E.build(s,index,'hC00',0),true);assert.equal(s.players[0].gold,23);
 assert.equal(E.build(s,index,'hC00',0),false);assert.equal(s.players[1].gold,30);assert.equal(s.towers[0].ready,2);
 tick(s,2);assert.equal(s.towers[0].ready,0);assert.equal(E.sell(s,index),true);assert.equal(s.players[0].gold,26);
});
test('cancelled construction refunds the cost; completed sale returns half',()=>{
 const s=E.create({autostart:false}),index=emptySlot(1,s);assert.ok(E.build(s,index,'hC10',1));assert.ok(E.sell(s,index));assert.equal(s.players[1].gold,30);
});
test('secondary builders consume lumber and retain each governor restrictions',()=>{
 const s=E.create({autostart:false});assert.equal(E.commission(s,0,'ohun'),false);s.players[0].timber=1;assert.equal(E.commission(s,0,'ohun'),true);assert.equal(s.players[0].timber,0);
 assert.equal(E.commission(s,0,'ncpn'),false);assert.equal(E.commission(s,0,'ohun'),false);
});
test('initial wave has eighty real enemies; Blitz doubles it',()=>{
 for(const blitz of [false,true]){const s=E.create({blitz,autostart:false});E.start(s);assert.equal(s.pending,blitz?160:80);tick(s,.1);assert.equal(s.enemies.length,4);assert.equal(s.enemies[0].max,15);assert.equal(s.enemies[0].raw.spd,330);}
});
test('first wave is beatable with starting funds and construction time',()=>{
 const s=E.create({autostart:false});
 // Place basic towers beside the route, using only each sector's 30 starting gold.
 for(let owner=0;owner<4;owner++){
  const type=E.builders.find(b=>b.id===s.players[owner].builders[0]).units[0];
  const ids=E.sectors.flatMap((v,i)=>v===owner?[i]:[]);
  const exposure=i=>E.paths.reduce((score,path)=>score+path.slice(1).reduce((score,b,n)=>{const a=path[n],p=E.slots[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy))),d=Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);return score+(d<30?Math.sqrt(900-d*d):0);},0),0);
  ids.sort((a,b)=>exposure(b)-exposure(a));for(const i of ids)E.build(s,i,type,owner);
 }
 tick(s,10);assert.ok(E.start(s));for(let i=0;i<5000&&s.active;i++)E.step(s,.1);
 assert.equal(s.active,false);assert.equal(s.over,false);assert.equal(s.kills,80);assert.equal(s.lives,50);
 assert.equal(s.roundBonus,12);assert.ok(s.players.every(p=>p.gold>=0));
});
test('an undefended base loses and does not restart',()=>{
 const s=E.create({autostart:false});E.start(s);for(let i=0;i<5000&&!s.over;i++)E.step(s,.1);assert.equal(s.over,true);assert.equal(E.start(s),false);
});
test('snapshot resumes the same economy and field without executing saved code',()=>{
 const s=E.create({autostart:false}),index=emptySlot(0,s);E.build(s,index,'hC00',0);tick(s,3);
 const restored=E.restore(JSON.parse(JSON.stringify(E.checkpoint(s))));assert.ok(restored);assert.equal(restored.players[0].gold,23);assert.equal(restored.towers[0].type,'hC00');
 E.start(s);assert.equal(E.checkpoint(s),null);assert.equal(E.restore({version:2,players:[]}),null);
});
test('gold transfers conserve funds and reject invalid amounts',()=>{
 const s=E.create({autostart:false});assert.equal(E.give(s,0,1,-2),false);assert.equal(E.give(s,0,1,31),false);assert.equal(E.give(s,0,1,10),true);assert.deepEqual(s.players.map(p=>p.gold),[20,40,30,30]);
});
test('new mission keeps saved chapter identities and remains before the final',()=>{
 assert.equal(C[14].mode,'td');assert.equal(C[13].mode,'paint');assert.equal(C[11].boss,'Валера · Железный натс');
 const fs=require('node:fs'),story=fs.readFileSync(require.resolve('../app-last-buy-in-story.js'),'utf8');assert.match(story,/activeChapters=\[0,1,2,3,5,6,7,8,9,10,12,13,14,11\]/);
});
test('technology research uses its original price and duration',()=>{
 const s=E.create({autostart:false}),p=s.players[2];p.gold=240;p.timber=1;
 assert.ok(E.build(s,emptySlot(2,s),'hars',2));tick(s,21);assert.ok(E.research(s,2,'Rhse'));
 assert.equal(p.gold,40);assert.equal(p.research.Rhse,undefined);assert.equal(E.research(s,2,'Rhse'),false);
 tick(s,31);assert.equal(p.research.Rhse,1);assert.equal(E.research(s,2,'Rhse'),false);
});
test('air uses the separate original flight route',()=>{
 assert.equal(E.airPaths.length,4);assert.notDeepEqual(E.airPaths[0],E.paths[0]);
 for(const path of E.airPaths)assert.ok(Math.hypot(path.at(-1)[0]-250,path.at(-1)[1]-250)<2);
});
test('fortieth wave wins easy mode; normal proceeds to damage test and final testers',()=>{
 for(const difficulty of ['easy','normal']){
  const s=E.create({difficulty,autostart:false});s.wave=39;E.start(s);
  // This fixture verifies terminal progression, not a full balance playthrough.
  for(let i=0;i<200&&s.active;i++){E.step(s,.1);for(const e of s.enemies)e.hp=0;}
  assert.equal(s.active,false);assert.equal(s.won,difficulty==='easy');
  if(difficulty==='normal'){assert.ok(E.start(s));assert.equal(s.wave,41);tick(s,31);assert.equal(s.active,false);assert.ok(E.start(s));assert.equal(s.wave,42);for(let i=0;i<200&&s.active;i++){E.step(s,.1);for(const e of s.enemies)e.hp=0;}assert.equal(s.won,true);}
 }
});
test('Chilling Tower cannot reveal invisible enemies until Magic Sentry completes',()=>{
 const s=E.create({autostart:false}),p=s.players[2];p.gold=240;p.timber=1;
 E.build(s,emptySlot(2,s),'hars',2);const slot=emptySlot(2,s);E.build(s,slot,'oC14',2);tick(s,21);
 s.wave=16;E.start(s);E.step(s,.1);const e=s.enemies[0];e.x=E.slots[slot][0]+2;e.y=E.slots[slot][1]+2;e.stun=999;
 E.step(s,.1);assert.equal(e.detected,false);assert.equal(e.hp,e.max);
 assert.ok(E.research(s,2,'Rhse'));p.researching.Rhse=.01;E.step(s,.1);assert.equal(e.detected,true);assert.ok(e.hp<e.max);
});
test('passive hero abilities cannot be cast as generic damage spells',()=>{
 const s=E.create({autostart:false});s.players[0].hero={type:'Hamg',x:250,y:250,target:[250,250],level:1,xp:0,cool:0,cast:0,mana:100,maxMana:100,abilities:['AHab'],raw:E.D.units.Hamg};
 E.start(s);assert.equal(E.castSpell(s,0,0),false);assert.equal(s.players[0].hero.mana,100);
});
