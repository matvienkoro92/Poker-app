'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),G=require('../app-garage-catalog'),Garage=require('../lib/player-garage'),E=require('../app-monkey-race-engine'),{fixture}=require('./helpers/cooler-flight-fixture.cjs');
test('closed cosmetics cannot be forged, base choices work without history',()=>{assert.deepEqual(G.normalize({},{}),G.defaults);assert.throws(()=>Garage.choose({paint:'champagne'},{stats:{level:49}}),/не открыта/);assert.throws(()=>Garage.choose({paint:'unknown'},{stats:{best:99999}}),/не открыта/);assert.equal(G.normalize({paint:'champagne'},{level:50},true).paint,'champagne');assert.throws(()=>G.normalize({number:'<x>'},{},true),/Номер/);assert.equal(G.normalize({number:'007'},{},true).number,'007');});
test('earned equipment and targets normalize independently, stale unlocks fall back',()=>{const c=G.catalog({level:8});assert.ok(c.find(i=>i.key==='helmet:club').unlocked);assert.ok(c.find(i=>i.key==='shoes:ruby').unlocked);assert.equal(c.find(i=>i.key==='wheels:carbon').unlocked,false);assert.equal(G.normalize({paint:'champagne',target:'wheels:carbon'},{runs:0}).paint,'classic');assert.equal(G.normalize({target:'wheels:carbon'},{}).target,'wheels:carbon');});
test('new players have free combinations and no race history requirement',()=>{
 const c=G.catalog({});
 assert.equal(c.filter(i=>i.kind==='paint'&&i.unlocked).length,3);
 assert.equal(c.filter(i=>i.kind==='light'&&i.unlocked).length,2);
 for(const paint of ['classic','ruby','midnight'])for(const light of ['cyan','amber'])assert.equal(G.normalize({paint,light,number:'007'},{},true).paint,paint);
 assert.equal(c.find(i=>i.key==='wheels:silver').unlocked,false);
 assert.equal(G.catalog({level:2}).find(i=>i.key==='wheels:silver').unlocked,true);
});
test('every reward checks the exact club level and ignores race counters',()=>{
 for(const i of G.items.filter(i=>i.target>0)){
  assert.equal(G.catalog({level:i.target-1,best:999999,runs:9999,chips:999999}).find(x=>x.key===i.key).unlocked,false,i.key);
  assert.throws(()=>Garage.choose({[i.kind]:i.id},{stats:{level:i.target-1}}),/не открыта/);
  assert.equal(Garage.choose({[i.kind]:i.id},{stats:{level:i.target}})[i.kind],i.id);
 }
 assert.ok(G.catalog({level:100}).every(i=>i.unlocked));
 assert.equal(new Set(G.items.map(i=>i.key)).size,G.items.length);
});
test('friend record uses verified garage counters and never a supplied score',async()=>{const rows=[JSON.stringify({best:400,runs:2,chips:8}),JSON.stringify({best:900})];const v=await Garage.read('ID1',async commands=>{assert.deepEqual(commands.map(x=>x[1]),['poker_app:garage:stats:ID1','poker_app:garage:stats:ID2']);return rows;},[{accountId:'ID2',nick:'Друг'}]);assert.equal(v.friendBest.best,900);assert.equal(v.stats.best,400);});
test('finish counts once, rejects fabricated points, migrates the existing authenticated best',async()=>{const f=fixture({race:true});f.hashes.set('poker_app:visitor_dt_ids',new Map([['Alice','ID123456']]));const start=(await f.request({action:'start'})).data;const s=E.create(start.seed,start.version),taps=[];while(s.alive)E.step(s,0);f.advance(s.tick*1000/60+3000);const result=await f.request({action:'finish',runId:start.runId,ticks:s.tick,taps,score:999999});assert.equal(result.status,200);assert.equal((await f.request({action:'finish',runId:start.runId,ticks:s.tick,taps})).status,409);const st=JSON.parse(f.strings.get('poker_app:garage:stats:ID123456'));assert.equal(st.runs,1);assert.equal(st.best,s.score);assert.equal(st.chips,s.perfect);f.top.set('Alice',7000);const garage=await f.request({action:'garage'});assert.equal(garage.data.stats.best,7000);assert.equal(garage.data.stats.runs,1);assert.equal((await f.request({action:'garage'},null)).status,401);});

test('shelves mirror saved choices and unlocks at each level',()=>{
 let slots=G.shelfSlots({stats:{level:0},loadout:{paint:'ruby',light:'amber'}});
 assert.equal(slots.find(s=>s.kind==='paint').selected.id,'ruby');
 assert.equal(slots.find(s=>s.kind==='paint').owned,3);
 assert.equal(slots.find(s=>s.kind==='helmet').empty,true);
 assert.equal(slots.find(s=>s.kind==='helmet').next.target,3);
 slots=G.shelfSlots({stats:{level:25},loadout:{helmet:'night',wheels:'carbon'}});
 assert.equal(slots.find(s=>s.kind==='helmet').empty,false);
 assert.equal(slots.find(s=>s.kind==='helmet').next,null);
 assert.equal(slots.find(s=>s.kind==='wheels').selected.id,'carbon');
 assert.equal(slots.find(s=>s.kind==='wheels').next.target,30);
 assert.ok(G.shelfSlots({stats:{level:100}}).every(s=>s.owned===s.total&&!s.next));
});
