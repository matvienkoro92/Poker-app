const test=require('node:test'),assert=require('node:assert/strict');
const G=require('../app-garage-catalog');
test('every early level has an accessible visible reward',()=>{
 for(let level=1;level<=15;level++){
  const rewards=G.items.filter(i=>i.metric==='level'&&i.target===level&&G.curatedWardrobeItem(i));
  assert.ok(rewards.length,'No reward at '+level);
  for(const i of rewards){
   assert.equal(G.catalog({level:level-1}).find(p=>p.key===i.key).unlocked,false);
   assert.equal(G.catalog({level}).find(p=>p.key===i.key).unlocked,true);
  }
 }
});
test('simple equipment arrives before prestige and Formula remains at fifty',()=>{
 const level=key=>G.items.find(i=>i.key===key).target;
 assert.equal(level('chassis:formula'),50);
 assert.equal(level('chassis:aeroPrototype'),85);
 assert.ok(level('tyres:semi')<=15);
 assert.ok(level('windshield:deflector')<=15);
 assert.ok(level('suit:monclerMaya')>=60);
 assert.ok(level('suit:lvVarsity')>=85);
 assert.ok(level('watch:rolexDayDate')>=70);
 assert.equal(level('watch:diamondRoyal'),100);
});
test('reward shelves and metadata use final catalogue levels',()=>{
 for(const [kind,table]of [['glassTint',G.glassTints],['steering',G.steeringDesigns],['headlights',G.streetHeadlights]])
  for(const [id,d]of Object.entries(table))assert.equal(d.target,G.items.find(i=>i.kind===kind&&i.id===id).target);
 for(let level=0;level<=100;level++){
  const slots=G.rewardShelfSlots({stats:{level}});
  for(const s of slots)assert.equal(s.remaining,s.selected.target-level);
  assert.ok(slots.every(s=>s.remaining>0));
 }
});
