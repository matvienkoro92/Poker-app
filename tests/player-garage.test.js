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
  assert.equal(Garage.choose({[i.kind]:i.id,...(i.key==='patch:name'?{patchText:'Игрок21'}:i.key==='vinyl:name'?{vinylText:'Манки21'}:{})},{stats:{level:i.target}})[i.kind],i.id);
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
 assert.equal(slots.find(s=>s.kind==='helmet').next.target,40);
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

test('personal patch opens at level 20 and server accepts one word up to 12 characters',()=>{
 assert.equal(G.catalog({level:19}).find(i=>i.key==='patch:name').unlocked,false);
 assert.equal(G.catalog({level:20}).find(i=>i.key==='patch:name').unlocked,true);
 for(const patchText of ['Игрок21','ABCDEFGHIJKL','Я','123'])assert.equal(Garage.choose({patch:'name',patchText},{stats:{level:20}}).patchText,patchText);
 for(const patchText of ['', 'Два слова','ABCDEFGHIJKLM','<script>','Имя!'])assert.throws(()=>Garage.choose({patch:'name',patchText},{stats:{level:20}}),/одно слово/);
 assert.throws(()=>Garage.choose({patch:'name',patchText:'Игрок'},{stats:{level:19}}),/не открыта/);
});

test('steering, turbine and exhaust choices persist and twin turbines require level 60',()=>{
 const look={...G.defaults,steering:'formula',turbine:'twin',exhaust:'titanium'};
 const saved=Garage.choose(look,{stats:{level:60}});
 assert.deepEqual(Garage.view({garage:saved},{stats:{level:60}}).loadout,look);
 assert.throws(()=>Garage.choose({...G.defaults,turbine:'twin'},{stats:{level:59}}),/не открыта/);
 assert.equal(G.normalize(look,{level:0}).turbine,'classic');
 for(const kind of ['steering','turbine','exhaust'])assert.equal(G.catalog({level:100}).filter(i=>i.kind===kind).length,kind==='turbine'?5:kind==='steering'?9:3);
});

test('body hardware and lifted suspension survive server save',()=>{const look={...G.defaults,mirrors:'club',frontBumper:'sport',rearBumper:'club',sideSkirts:'sport',suspension:'high'};const saved=Garage.choose(look,{stats:{level:55}});for(const key of ['mirrors','frontBumper','rearBumper','sideSkirts','suspension'])assert.equal(Garage.view({garage:saved},{stats:{level:55}}).loadout[key],look[key]);assert.equal(G.normalize({},{}).suspension,'standard');assert.throws(()=>Garage.choose({...look,suspension:'invalid'},{stats:{level:55}}),/не открыта/);});

test('expanded catalogue has regular milestones and rejects every locked part',()=>{
 const levelItems=G.items.filter(i=>i.metric==='level');
 assert.ok(levelItems.length>=130);
 const levels=[...new Set(levelItems.map(i=>i.target))].sort((a,b)=>a-b);
 for(let n=1;n<levels.length;n++)assert.ok(levels[n]-levels[n-1]<=5,'empty progression gap at '+levels[n]);
 for(const level of [25,50,75,100])assert.ok(levelItems.filter(i=>i.target>level-25&&i.target<=level).length>=15);
 for(const kind of ['mirrors','frontBumper','rearBumper','sideSkirts','suspension','spoiler','headlights','fenders','windshield']){assert.ok(G.catalog({level:0}).filter(i=>i.kind===kind&&i.unlocked).length===1);assert.ok(G.catalog({level:100}).filter(i=>i.kind===kind&&i.unlocked).length>=5);}
 for(const i of levelItems){const look={[i.kind]:i.id,...(i.key==='patch:name'?{patchText:'Игрок21'}:i.key==='vinyl:name'?{vinylText:'Манки21'}:{})};const saved=Garage.choose(look,{stats:{level:i.target}});assert.equal(Garage.view({garage:saved},{stats:{level:i.target}}).loadout[i.kind],i.id);}
 assert.notDeepEqual(G.wheelDesign('fiveSpoke'),G.wheelDesign('splitSix'));
 assert.notDeepEqual(G.chipPalette('noir'),G.chipPalette('legend'));
});

test('reward shelves prioritize a locked level target and replace earned rewards',()=>{
 const garage={stats:{level:10},loadout:{target:'windshield:iridium'}};
 const slots=G.rewardShelfSlots(garage);assert.equal(slots.length,9);
 assert.equal(slots[0].selected.key,'windshield:iridium');assert.equal(slots[0].isTarget,true);
 assert.equal(slots[0].remaining,84);assert.equal(new Set(slots.map(s=>s.selected.key)).size,9);
 assert.ok(slots.every(s=>s.selected.metric==='level'&&s.selected.target>10));
 const unlocked=slots[1].selected;garage.stats.level=unlocked.target;
 assert.ok(G.rewardShelfSlots(garage).every(s=>s.selected.key!==unlocked.key));
 assert.deepEqual(G.rewardShelfSlots({stats:{level:100},loadout:garage.loadout}),[]);
});

test('vinyl designs unlock progressively and persist in saved loadouts',()=>{
 const designs=G.items.filter(i=>i.kind==='vinyl'&&i.id!=='none');
 assert.equal(designs.length,28);
 assert.equal(G.normalize({}, {level:0}).vinyl,'none');
 for(const design of designs){
  assert.equal(G.normalize({vinyl:design.id},{level:design.target}).vinyl,design.id);
  if(design.target>0)assert.equal(G.normalize({vinyl:design.id},{level:design.target-1}).vinyl,'none');
 }
});

test('custom vinyl validates and persists its word',()=>{const look=Garage.choose({vinyl:'name',vinylText:'Манки21'},{stats:{level:0}});assert.equal(Garage.view({garage:look},{stats:{level:0}}).loadout.vinylText,'Манки21');for(const vinylText of ['', 'два слова', '<script>', '12345678901234567'])assert.throws(()=>Garage.choose({vinyl:'name',vinylText},{stats:{level:100}}),/Винил/);});
test('street wheel designs differ and hardware choices save independently',()=>{
 const ids=['bronzeSix','deepFive','crossMesh','splitY','concaveTen','muscleFive','turbofan','triBlade','rallyMulti','splitStar'];
 assert.equal(new Set(ids.map(id=>JSON.stringify(G.wheelDesign(id)))).size,10);
 const look=Garage.choose({wheels:'bronzeSix',brakes:'ceramic',nitrous:'twin',seat:'carbon'},{stats:{level:100}});
 for(const [kind,id]of Object.entries({brakes:'ceramic',nitrous:'twin',seat:'carbon'}))assert.equal(Garage.view({garage:look},{stats:{level:100}}).loadout[kind],id);
 assert.throws(()=>Garage.choose({brakes:'ceramic'},{stats:{level:10}}),/не открыта/);
});
test('street headlights unlock and persist independently of underglow',()=>{
 assert.equal(Object.keys(G.streetHeadlights).length,16);
 for(const [id,d]of Object.entries(G.streetHeadlights)){
  assert.throws(()=>Garage.choose({headlights:id},{stats:{level:d.target-1}}),/не открыта/);
  const saved=Garage.choose({headlights:id,light:'amber'},{stats:{level:d.target}});
  const restored=Garage.view({garage:saved},{stats:{level:d.target}}).loadout;
  assert.equal(restored.headlights,id);assert.equal(restored.light,'amber');
 }
});

test('fashion separates and accessories save independently and preserve legacy trousers',()=>{
 const look={...G.defaults,suit:'velvetDinner',pants:'washedJeans',shoes:'brownLoafers',glasses:'roundGold',watch:'roseDress',necklace:'silverTag'};
 const saved=Garage.choose(look,{stats:{level:75}});
 for(const kind of ['suit','pants','shoes','glasses','watch','necklace'])assert.equal(Garage.view({garage:saved},{stats:{level:75}}).loadout[kind],look[kind]);
 assert.equal(G.normalize({suit:'leatherBiker'},{level:0},true).pants,G.defaults.pants);
 assert.equal(G.normalize({suit:'ruby'},{level:5},true).pants,'ruby');
 for(const kind of ['glasses','watch','necklace'])assert.equal(G.normalize({},{} )[kind],'none');
 assert.throws(()=>Garage.choose({...look,watch:'greenDiver'},{stats:{level:0}}),/не открыта/);
});

test('collections persist three independent pieces and derive the bonus from the worn set',()=>{
 assert.equal(G.seasonalCollections.length,11);
 assert.equal(G.items.filter(i=>i.collection).length,33);
 for(const set of G.outfitSets){
  const p=G.collectionProgress(set,{}, {level:100});
  assert.equal(p.owned,3);
  const saved=Garage.choose(set.pieces,{stats:{level:p.target}});
  assert.equal(G.activeOutfit(saved,{level:p.target}).id,set.id);
  assert.equal(G.collectionProgress(set,saved,{level:p.target}).worn,3);
  assert.equal(G.activeOutfit({...saved,shoes:'unknown'}),null);
  if(p.target){
   assert.throws(()=>Garage.choose(set.pieces,{stats:{level:p.target-1}}),/не открыта/);
   assert.equal(G.activeOutfit(saved,{level:p.target-1}),null);
  }
 }
 // Adding a forged bonus field cannot award an effect or persist extra state.
 const mixed=Garage.choose({...G.defaults,suit:'collection_tropical',bonus:'snow'},{stats:{level:100}});
 assert.equal(G.activeOutfit(mixed),null);
 assert.equal(mixed.bonus,undefined);
 for(const kind of ['suit','pants','shoes'])for(const i of G.items.filter(i=>i.kind===kind))assert.ok(G.outfitSets.some(s=>s.pieces[kind]===i.id),'Uncurated garment: '+i.key);
});

test('seasonal reward pacing offers early variety and goals across the full level range',()=>{
 const expected={tropical:0,flamingo:5,snow:10,pajama:15,duck:25,rain:35,icecream:45,banana:55,ski:65,holiday:80,space:90};
 for(const set of G.seasonalCollections){
  const p=G.collectionProgress(G.outfitSets.find(s=>s.id===set.id),{},{});
  assert.equal(p.target,expected[set.id]);
  const levels=Object.fromEntries(['suit','pants','shoes'].map(k=>[k,G.items.find(i=>i.key===k+':collection_'+set.id).target]));
  assert.equal(levels.shoes,Math.max(0,p.target-2));assert.equal(levels.pants,Math.max(0,p.target-1));assert.equal(levels.suit,p.target);
  if(p.target){assert.equal(G.collectionProgress(p,{}, {level:p.target-1}).owned,2);assert.equal(G.collectionProgress(p,{}, {level:p.target-2}).owned,1);}
 }
 for(const season of ['Лето','Пляж','Зима','Весёлое'])assert.ok(G.seasonalCollections.some(s=>s.season===season&&s.target<=20),season);
 for(const [lo,hi] of [[1,25],[26,50],[51,75],[76,100]])assert.ok(G.seasonalCollections.filter(s=>s.target>=lo&&s.target<=hi).length>=2);
 // Legacy unlocks retain their availability, including rare level 100 cosmetics.
 const old={'shoes:combatBlack':16,'shoes:desertSand':30,'pants:navyPinstripe':35,'shoes:hikingBrown':50,'pants:grayPlaid':50,'shoes:onyx':28};
 for(const [key,level]of Object.entries(old))assert.ok(G.catalog({level}).find(i=>i.key===key).unlocked);
 assert.equal(G.catalog({level:99}).find(i=>i.key==='suit:legend').unlocked,false);
 assert.equal(G.catalog({level:100}).find(i=>i.key==='suit:legend').unlocked,true);
});

test('removed striped collection cannot be selected and old saved pieces fall back',()=>{
 for(const kind of ['suit','pants','shoes']){assert.equal(G.items.some(i=>i.key===kind+':collection_sailor'),false);assert.throws(()=>Garage.choose({[kind]:'collection_sailor'},{stats:{level:100}}),/не открыта/);assert.equal(G.normalize({[kind]:'collection_sailor'},{level:100})[kind],G.defaults[kind]);}
 assert.equal(G.outfitSets.some(s=>s.id==='sailor'),false);
});

test('summer separates and hats save independently at their exact levels',()=>{
 for(const [level,suit,pants,hat]of [[0,'palmTank','sandShorts','strawSun'],[5,'flamingoTank','oceanShorts','duckBucket'],[10,'bananaTank','flamingoShorts','propellerCap']]){
  const look={...G.defaults,suit,pants,hat};
  const saved=Garage.choose(look,{stats:{level}});
  assert.equal(saved.suit,suit);assert.equal(saved.pants,pants);assert.equal(saved.hat,hat);
  if(level)assert.throws(()=>Garage.choose(look,{stats:{level:level-1}}),/не открыта/);
 }
 assert.equal(G.normalize({}, {level:0}).hat,'none');
});

test('13 hairstyles and five physiques persist without changing clothes or trusting forged IDs',()=>{
 assert.equal(G.hairStyles.length,13);assert.equal(G.bodyTypes.length,5);
 for(const [hair]of G.hairStyles)for(const [body]of G.bodyTypes){
  const saved=Garage.choose({...G.defaults,hair,body,suit:'palmTank',pants:'sandShorts'},{stats:{level:0}});
  assert.equal(saved.hair,hair);assert.equal(saved.body,body);assert.equal(saved.suit,'palmTank');assert.equal(saved.pants,'sandShorts');
 }
 for(const kind of ['hair','body'])assert.throws(()=>Garage.choose({...G.defaults,[kind]:'forged'},{stats:{level:100}}),/не открыта/);
 const old=G.normalize({suit:'classic'},{level:0});assert.equal(old.hair,'hairNatural');assert.equal(old.body,'bodyNormal');
 for(const hat of ['pokerFlatCap','pokerClassicCap'])assert.equal(Garage.choose({...G.defaults,hat},{stats:{level:0}}).hat,hat);
});

test('helmet milestones select distinct models while keeping saved IDs and unlock levels',()=>{
 const expected=[['club',3],['ruby',15],['night',25],['silver',40],['emerald',60],['legend',95]];
 assert.equal(G.items.filter(i=>i.kind==='helmet'&&i.id!=='none').length,8);
 assert.equal(new Set(Object.values(G.helmetModels)).size,7);
 for(const [helmet,level]of expected){
  const i=G.items.find(i=>i.kind==='helmet'&&i.id===helmet);assert.equal(i.target,level);
  for(const visor of ['open','closed'])assert.equal(Garage.choose({...G.defaults,helmet,visor},{stats:{level}}).helmet,helmet);
  assert.throws(()=>Garage.choose({...G.defaults,helmet},{stats:{level:level-1}}),/не открыта/);
 }
 const fs=require('fs'),path=require('path');
 for(const model of Object.values(G.helmetModels))for(const visor of ['open','closed']){
  const file=path.join(__dirname,'../assets/player-hall/helmets',model+'-'+visor+'-v1.webp');
  assert.ok(fs.statSync(file).size<100000,'Helmet sprite must stay below 100 KB');
 }
});

test('prestige watches and rings have exact level gates and save independently',()=>{
 for(const [id,[,level]]of Object.entries(G.prestigeWatches)){
  assert.throws(()=>Garage.choose({watch:id},{stats:{level:level-1}}),/не открыта/);
  assert.equal(Garage.choose({watch:id},{stats:{level}}).watch,id);
 }
 for(const [id,[,level]]of Object.entries(G.ringDesigns)){
  assert.throws(()=>Garage.choose({ring:id},{stats:{level:level-1}}),/не открыта/);
  const look=Garage.choose({ring:id,necklace:'goldChain',watch:'steelBlue'},{stats:{level}});
  assert.equal(look.ring,id);assert.equal(look.necklace,'goldChain');assert.equal(look.watch,'steelBlue');
 }
 assert.equal(G.normalize({},{}).ring,'none');
 assert.equal(G.normalize({ring:'diamondKing'},{level:10}).ring,'none');
});
test('legacy garment rewards keep their IDs and use distinct real models',()=>{
 for(const [kind,models]of Object.entries(G.rewardFashionModels)){
  assert.equal(new Set(Object.values(models)).size,Object.keys(models).length);
  for(const [id,base]of Object.entries(models)){
   assert.ok(G.fashionRows[kind].some(row=>row[0]===base));
   const reward=G.items.find(i=>i.kind===kind&&i.id===id);assert.ok(reward);
   assert.equal(G.normalize({[kind]:id},{level:reward.target},true)[kind],id);
  }
 }
});
test('prestige watch sprites stay small and every model has its own file',()=>{
 const fs=require('node:fs'),path=require('node:path'),hashes=new Set();
 for(const id of Object.keys(G.prestigeWatches)){
  const file=path.join(__dirname,'../assets/player-hall/wardrobe/summer',id+'.webp'),bytes=fs.readFileSync(file);
  assert.ok(bytes.length<100000,id+' sprite exceeds 100 KB');
  hashes.add(require('node:crypto').createHash('sha256').update(bytes).digest('hex'));
 }
 assert.equal(hashes.size,Object.keys(G.prestigeWatches).length);
});

test('wardrobe filters classify summer, legacy rewards and seasonal model variants',()=>{
 assert.equal(G.wardrobeSubcategory('suit','palmTank'),'tanks');
 assert.equal(G.wardrobeSubcategory('suit','acesTee'),'tees');
 assert.equal(G.wardrobeSubcategory('suit','charcoalHoodie'),'knits');
 assert.equal(G.wardrobeSubcategory('suit','midnight'),'blazers');
 assert.equal(G.wardrobeSubcategory('pants','sandShorts'),'shorts');
 assert.equal(G.wardrobeSubcategory('pants','washedJeans'),'jeans');
 for(const i of G.items.filter(i=>['suit','pants'].includes(i.kind)))assert.ok(G.wardrobeSubcategories[i.kind][G.wardrobeSubcategory(i.kind,i.id)],i.key);
});

test('curated brand rewards have explicit gates and retain legacy saved clothing',()=>{
 const rows=Object.entries(G.brandedPieces);assert.equal(rows.length,12);
 for(const [id,[kind,, ,level,category]]of rows){
  assert.ok(G.curatedWardrobeItem(G.item(kind,id)));
  assert.throws(()=>Garage.choose({[kind]:id},{stats:{level:level-1}}),/не открыта/);
  assert.equal(Garage.choose({[kind]:id},{stats:{level}})[kind],id);
  if(kind!=='shoes')assert.equal(G.wardrobeSubcategory(kind,id),category);
 }
 assert.equal(G.curatedWardrobeItem(G.item('suit','collection_duck')),false);
 assert.equal(G.normalize({suit:'collection_duck'},{level:100},true).suit,'collection_duck');
 assert.equal(G.curatedWardrobeItem(G.item('suit','charcoalHoodie')),true);
});

test('brand wardrobe sprites are distinct and stay below the per-item budget',()=>{
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),hashes=new Set();let total=0;
 for(const id of Object.keys(G.brandedPieces)){
  const bytes=fs.readFileSync(path.join(__dirname,'../assets/player-hall/wardrobe/branded',id+'-v1.webp'));
  assert.ok(bytes.length<160000,id+' exceeds sprite budget');total+=bytes.length;
  hashes.add(crypto.createHash('sha256').update(bytes).digest('hex'));
 }
 assert.equal(hashes.size,12);assert.ok(total<1500000);
});

test('replacement hairstyles use individual hair-only sprites within the size budget',()=>{
 const fs=require('node:fs'),path=require('node:path'),hashes=new Set();let total=0;
 assert.equal(Object.keys(G.hairOverlayFits).length,11);
 for(const [id,[width,height]]of Object.entries(G.hairOverlayFits)){
  assert.ok(G.hairStyles.some(([hair])=>hair===id));assert.ok(width>=220&&width<=320);assert.ok(height>0&&height<=240);
  const bytes=fs.readFileSync(path.join(__dirname,'../assets/player-hall/wardrobe/summer',id+'-hair-only-v2.webp'));
  assert.ok(bytes.length<160000,id+' exceeds sprite budget');total+=bytes.length;
  hashes.add(require('node:crypto').createHash('sha256').update(bytes).digest('hex'));
 }
 assert.equal(hashes.size,11);assert.ok(total<1500000);
});

test('custom wheel paint persists independently of wheel geometry and accepts any RGB color',()=>{
 for(const color of ['#000000','#ffffff','#A1B2C3','#ff00ff','#00ff00']){
  const look=Garage.choose({wheels:'classic',wheelColor:color},{stats:{level:0}});
  assert.equal(look.wheelColor,color.toLowerCase());assert.equal(look.wheels,'classic');assert.equal(G.wheelPaintColor(look),color.toLowerCase());
 }
 assert.equal(G.normalize({},{}).wheelColor,'');
 assert.equal(G.wheelPaintColor({...G.defaults,wheelColor:''}),G.item('wheels','classic').color);
 assert.throws(()=>Garage.choose({wheelColor:'red'},{stats:{level:100}}),/HEX/);
 assert.throws(()=>Garage.choose({wheelColor:'#12345g'},{stats:{level:100}}),/HEX/);
 assert.equal(G.normalize({wheelColor:'bad'},{}).wheelColor,'');
 assert.throws(()=>Garage.choose({wheels:'legend',wheelColor:'#ff00ff'},{stats:{level:0}}),/не открыта/);
});

test('plate feedback reports exact gate and supplies a currently valid example',()=>{
 for(const level of [0,9,10,19,20,29,30,49,50,74,75,99,100]){
  const info=G.plateAvailability('А777АА','154',level);
  assert.equal(info.requiredLevel,100);assert.equal(info.allowed,level>=100);
  assert.ok(G.plateLevel(info.example.number)<=level);
  assert.equal(G.normalize(info.example,{level},true).number,info.example.number);
  assert.equal(info.example.region,'154');
 }
 const mirrored=G.plateAvailability('A121KM','54',9);assert.equal(mirrored.requiredLevel,10);assert.equal(mirrored.allowed,false);
 assert.equal(G.plateAvailability('A121KM','54',10).allowed,true);
 const invalid=G.plateAvailability('000','x',0);assert.equal(invalid.allowed,false);assert.equal(invalid.requiredLevel,null);assert.equal(invalid.example.region,'54');
});

test('wheel diameter and formula wings persist independently with level gates',()=>{
 const look=Garage.choose({wheelSize:'max',wheels:'bronzeSix',frontBumper:'formulaPro'},{stats:{level:65}});assert.equal(look.wheelSize,'max');assert.equal(look.frontBumper,'formulaPro');assert.equal(look.wheels,'bronzeSix');assert.equal(Garage.choose({}, {stats:{level:0}}).wheelSize,'standard');assert.throws(()=>Garage.choose({wheelSize:'large'},{stats:{level:19}}));assert.throws(()=>Garage.choose({frontBumper:'formula'},{stats:{level:34}}));
});

test('Formula collection starts above level fifty and tyre choices save independently',()=>{for(const [kind,id,level]of [['frontBumper','formula',55],['tyreWidth','wide',52],['tyreWidth','ultra',72],['tyres','soft',55],['tyres','wet',76],['helmet','formulaCrimson',54],['helmet','formulaGold',74],['rearBumper','formulaPro',78],['spoiler','formulaPro',85],['sideSkirts','formula',58],['frontBumper','formulaElite',82]]){assert.ok(level>50);assert.throws(()=>Garage.choose({[kind]:id},{stats:{level:level-1}}));assert.equal(Garage.choose({[kind]:id},{stats:{level}})[kind],id);}const look=Garage.choose({tyreWidth:'ultra',tyres:'wet',wheelSize:'max',wheels:'bronzeSix'},{stats:{level:100}});assert.equal(look.tyreWidth,'ultra');assert.equal(look.tyres,'wet');assert.equal(look.wheelSize,'max');});
