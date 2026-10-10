'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),G=require('../app-garage-catalog'),Garage=require('../lib/player-garage'),E=require('../app-monkey-race-engine'),{fixture}=require('./helpers/cooler-flight-fixture.cjs');
test('closed cosmetics cannot be forged, base choices work without history',()=>{assert.deepEqual(G.normalize({},{}),G.defaults);assert.throws(()=>Garage.choose({paint:'champagne'},{stats:{level:49}}),/не открыта/);assert.throws(()=>Garage.choose({paint:'unknown'},{stats:{best:99999}}),/не открыта/);assert.equal(G.normalize({paint:'champagne'},{level:50},true).paint,'champagne');assert.throws(()=>G.normalize({number:'<x>'},{},true),/Номер/);assert.equal(G.normalize({number:'017'},{},true).number,'А017КМ');});
test('earned equipment and targets normalize independently, stale unlocks fall back',()=>{const c=G.catalog({level:8});assert.ok(c.find(i=>i.key==='helmet:club').unlocked);assert.ok(c.find(i=>i.key==='shoes:ruby').unlocked);assert.equal(c.find(i=>i.key==='wheels:carbon').unlocked,false);assert.equal(G.normalize({paint:'champagne',target:'wheels:carbon'},{runs:0}).paint,'classic');assert.equal(G.normalize({target:'wheels:carbon'},{}).target,'wheels:carbon');});
test('new players have free combinations and no race history requirement',()=>{
 const c=G.catalog({});
 assert.equal(c.filter(i=>i.kind==='paint'&&i.unlocked).length,3);
 assert.equal(c.filter(i=>i.kind==='light'&&i.unlocked).length,2);
 for(const paint of ['classic','ruby','midnight'])for(const light of ['cyan','amber'])assert.equal(G.normalize({paint,light,number:'017'},{},true).paint,paint);
 assert.equal(c.find(i=>i.key==='wheels:silver').unlocked,false);
 assert.equal(G.catalog({level:2}).find(i=>i.key==='wheels:silver').unlocked,true);
});
test('every reward checks the exact club level and ignores race counters',()=>{
 for(const i of G.items.filter(i=>i.metric==='level'&&i.target>0)){
  assert.equal(G.catalog({level:i.target-1,best:999999,runs:9999,chips:999999}).find(x=>x.key===i.key).unlocked,false,i.key);
  assert.throws(()=>Garage.choose({[i.kind]:i.id},{stats:{level:i.target-1}}),/не открыта/);
  assert.equal(Garage.choose({[i.kind]:i.id},{stats:{level:i.target}})[i.kind],i.id);
 }
 assert.ok(G.catalog({level:100}).filter(i=>i.metric==='level').every(i=>i.unlocked));
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

test('paint covers front and side body without replacing the suit',()=>{
 assert.equal(G.greenMaterial(120,350,450,600),'paint');
 assert.equal(G.greenMaterial(330,420,450,600),'paint');
 assert.equal(G.greenMaterial(195,230,450,600),'suit');
 assert.equal(G.greenMaterial(750,445,1536,1024),'paint');
 assert.equal(G.greenMaterial(750,225,1536,1024),'suit');
 assert.equal(G.greenMaterial(750,775,1536,1024),'suit');
 assert.equal(G.greenMaterial(750,225,1536,1024,'vehicle'),'paint');
});

test('RF plates validate format, migrate old numbers and gate rare combinations',()=>{assert.equal(G.normalize({number:'17'},{},true).number,'А017КМ');assert.deepEqual(G.parsePlate('a123bc','154'),{number:'А123ВС',region:'154'});for(const number of ['А000ВС','Д123ВС','А12ВС'])assert.throws(()=>G.normalize({number},{level:100},true),/Номер/);for(const region of ['0','000','1234','xx'])assert.throws(()=>G.normalize({region},{level:100},true),/Номер/);for(const [number,level] of [['А121КМ',10],['А200КМ',20],['А123АА',30],['А555КМ',50],['А007КМ',75],['А777АА',100]]){assert.equal(G.plateLevel(number),level);assert.throws(()=>Garage.choose({number},{stats:{level:level-1}}),/уровне/);assert.equal(G.normalize({number},{level},true).number,number);}assert.equal(G.normalize({number:'А777АА'},{level:0}).number,G.defaults.number);});
test('visor position survives saved garage loadouts and old profiles default to open',()=>{const saved=Garage.choose({...G.defaults,helmet:'club',visor:'closed'},{stats:{level:10}});assert.equal(saved.visor,'closed');assert.equal(Garage.view({garage:saved},{stats:{level:10}}).loadout.visor,'closed');assert.equal(G.normalize({helmet:'club'},{level:10}).visor,'open');assert.equal(G.normalize({visor:'invalid'},{}).visor,'open');});
test('new equipment survives server save and legacy trousers inherit the previous suit',()=>{assert.equal(G.normalize({suit:'midnight'},{level:100}).pants,'midnight');const look={...G.defaults,trim:'chrome',upholstery:'diamond',cards:'sevenTwo',chips:'tournament',suit:'ruby',pants:'midnight',patch:'name',patchText:'ПокерМанки'};const saved=Garage.choose(look,{stats:{level:100}});assert.deepEqual(Garage.view({garage:saved},{stats:{level:100}}).loadout,saved);for(const k of ['trim','upholstery','cards','chips','pants','patch'])assert.equal(saved[k],look[k]);assert.equal(saved.patchText,'ПокерМанки');assert.throws(()=>Garage.choose(look,{stats:{level:1}}),/не открыта/);assert.equal(G.normalize({...G.defaults,patchText:'<script>\u0000'},{}).patchText,'script');assert.equal(G.shelfSlots({stats:{level:100},loadout:saved}).length,6);});
test('material unlocks use the approved round level thresholds',()=>{for(const [key,level] of [['upholstery:diamond',30],['upholstery:alcantara',40],['trim:black',50]]){assert.equal(G.catalog({level:level-1}).find(i=>i.key===key).unlocked,false);assert.equal(G.catalog({level}).find(i=>i.key===key).unlocked,true);const [kind,id]=key.split(':');assert.throws(()=>Garage.choose({...G.defaults,[kind]:id},{stats:{level:level-1}}),/не открыта/);assert.equal(Garage.choose({...G.defaults,[kind]:id},{stats:{level}})[kind],id);}});

test('car badges require verified achievements and allow three different earned badges',()=>{const earnedBadges=['tournament-king','millionaire','rating-top10','day-hero'];assert.throws(()=>Garage.choose({badges:['millionaire'],earnedBadges},{stats:{level:100}}),/не заработан/);const look=Garage.choose({badges:earnedBadges.slice(0,3)},{stats:{level:0,earnedBadges}});assert.deepEqual(look.badges,earnedBadges.slice(0,3));assert.throws(()=>Garage.choose({badges:earnedBadges},{stats:{earnedBadges}}),/трёх/);assert.throws(()=>Garage.choose({badges:['millionaire','millionaire']},{stats:{earnedBadges}}),/разных/);assert.deepEqual(G.normalize({badges:['millionaire']},{}).badges,[]);assert.equal(G.catalog({level:100}).find(i=>i.key==='badge:millionaire').unlocked,false);});
