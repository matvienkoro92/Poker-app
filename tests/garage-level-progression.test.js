const test=require('node:test'),assert=require('node:assert/strict');
const G=require('../app-garage-catalog');
test('every early level has an accessible visible reward',()=>{
 for(let level=1;level<=15;level++){
  const rewards=G.items.filter(i=>i.metric==='level'&&i.target===level&&G.curatedWardrobeItem(i));
  if([6,11].includes(level))continue;
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
 assert.ok(level('tyres:semi')>=13);
 assert.ok(level('windshield:deflector')>=13);
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

test('car and upgrades start at twelve while basic transport and personal items stay available',()=>{
 assert.equal(G.availableTransport('kart',11),'bicycle');
 assert.equal(G.availableTransport('kart',12),'kart');
 for(const id of ['bicycle','scooter'])assert.equal(G.availableTransport(id,1),id);
 for(const item of G.items.filter(i=>!G.characterFields.includes(i.kind)&&i.metric==='level'))assert.ok(item.target>=12,item.key);
 assert.equal(G.catalog({level:11}).find(i=>i.key==='chassis:classic').unlocked,false);
 assert.equal(G.catalog({level:12}).find(i=>i.key==='chassis:classic').unlocked,true);
 assert.throws(()=>require('../lib/player-garage').chooseScoped({}, {stats:{level:11}}, {}, 'vehicle'),/12/);
 assert.doesNotThrow(()=>require('../lib/player-garage').chooseScoped({}, {stats:{level:1}}, {}, 'character'));
});
