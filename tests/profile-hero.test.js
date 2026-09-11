'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const H=require('../lib/profile-hero'),C=require('../hero-catalog'),K=require('../lib/hero-collection');
const empty=()=>({...H.fresh(),inventory:[]});
const req=(action,extra={})=>({action,requestId:'test-request-00000001',...extra});
const item=(id,slot='body',set='club',rarity=0)=>({id,slot,set,rarity,level:71});
const claim=(s,modelId=s.pendingChoice.options[0])=>H.mutate(s,71,req('choose-reward',{choiceId:s.pendingChoice.id,modelId}));
test('only configured pilot accounts are allowed; request cannot unlock another account',async()=>{
 assert.equal(H.heroEnabled('ID400800'),true);assert.equal(H.heroEnabled('ID403173'),true);for(const id of ['ID1','ПокерМанки','',undefined]){assert.equal(await H.readHero(id),null);await assert.rejects(H.updateHero(id,req('craft',{accountId:'ID400800',modelId:'club-head'})),e=>e.status===403);}
});
test('v1 and v2 inventories migrate through layers without losing skills, looks, earned levels or dust',()=>{
 const old={version:7,highestLevel:71,skills:{strike:12},equipped:{body:'old'},inventory:[item('old','body','ember',4)],claimedLevel:50,dust:19};
 const v1=H.parse(JSON.stringify(old));assert.equal(v1.schema,4);assert.equal(v1.inventory[0].id,'old');assert.equal(v1.inventory[0].set,'final');assert.equal(v1.dust,19);assert.equal(v1.claimedLevel,50);assert.equal(H.view(v1,71).points,70);assert.deepEqual(H.parse(JSON.stringify(v1)),v1);
 const s=H.migrate({...empty(),schema:2,skills:{bonus:8,collector:5},inventory:[item('suit','body','final',4),item('phones','hand','grinder')],lookEquipped:{body:'suit',hand:'phones'},looks:[{id:'saved',items:{body:'suit',hand:'phones'}}]});
 assert.equal(s.inventory.length,9);assert.equal(s.lookEquipped.head,'phones');assert.equal(s.lookEquipped.legs,'suit-part-legs');assert.deepEqual(s.equipped,s.lookEquipped);assert.deepEqual(s.looks[0].items,s.lookEquipped);assert.equal(s.skills.bonus,8);assert.equal(H.view(s,71).lookCapacity,4);assert.equal(s.inventory.find(i=>i.slot==='feet').salvageValue,0);
});
test('same visual duplicates merge once, retain visible ID, favorites, presets, seen state and material value',()=>{
 const old={...empty(),schema:3,skills:{bonus:7},dust:8,inventory:[item('rare','eyes','club',4),{...item('visible','eyes','final',0),favorite:true},item('shoe','feet','club',1),{...item('free-shoe','feet','grinder',1),migratedPart:true,salvageValue:0}],lookEquipped:{eyes:'visible',feet:'shoe'},looks:[{id:'saved',items:{eyes:'rare',feet:'free-shoe'}}],seen:['rare']};
 const s=H.migrate(old);assert.equal(old.inventory.length,4);assert.equal(s.inventory.length,6);assert.equal(s.dust,19);assert.equal(s.looks[0].items.eyes,'visible');assert.equal(s.looks[0].items.feet,'shoe');assert.ok(s.seen.includes('visible'));assert.equal(s.skills.bonus,7);assert.equal(s.inventory.find(i=>i.id==='visible').favorite,true);assert.deepEqual(H.migrate(s),s);
});
test('one wear action updates appearance and equipment; saved looks restore only owned pieces',()=>{
 let s=empty();s.inventory=[item('top'),item('pants','legs','final'),item('shoes','feet','oldschool'),item('hat','head','grinder'),item('glasses','eyes','final')];
 for(const i of s.inventory)s=H.mutate(s,71,req('wear',{item:i.id}));assert.deepEqual(s.lookEquipped,s.equipped);s=H.mutate(s,71,req('save-look',{name:'Mix',items:{body:'foreign'}}));const saved={...s.lookEquipped};s=H.mutate(s,71,req('unequip',{slot:'head'}));assert.equal(s.lookEquipped.eyes,'glasses');s=H.mutate(s,71,req('apply-look',{look:s.looks[0].id}));assert.deepEqual(s.lookEquipped,saved);assert.deepEqual(s.equipped,saved);assert.throws(()=>H.mutate(s,71,req('wear',{item:'foreign'})),/не найден/);
});
test('level choice persists unchanged, offers three different missing models, consumes only on choice',()=>{
 let s=H.mutate(empty(),71,req('chest'),0,[0]);assert.equal(s.claimedLevel,0);assert.equal(s.inventory.length,0);assert.equal(new Set(s.pendingChoice.options).size,3);
 const pending=s.pendingChoice;s=H.mutate(H.parse(JSON.stringify(s)),71,req('chest'),0,[30]);assert.deepEqual(s.pendingChoice,pending);s=claim(s);assert.equal(s.claimedLevel,1);assert.equal(s.pendingChoice,null);assert.equal(s.inventory.length,1);
 s=H.mutate(s,71,req('chest'),0,[0]);assert.ok(s.pendingChoice.options.every(id=>!K.owned(s,id)));
});
test('forged or stale choice and old batch API cannot consume a level or grant client inventory',()=>{
 const s=H.mutate(empty(),1,req('chest'),0,[0]),before=JSON.stringify(s);
 for(const extra of [{choiceId:'foreign',modelId:s.pendingChoice.options[0]},{choiceId:s.pendingChoice.id,modelId:'waaar-yacht'},{choiceId:s.pendingChoice.id,modelId:'award-winner'}])assert.throws(()=>H.mutate(s,1,req('choose-reward',extra)),/открытой награды/);
 assert.equal(JSON.stringify(s),before);assert.throws(()=>H.mutate(s,1,req('chest',{count:10})),/одну из трёх/);
 const chosen=H.mutate(s,1,req('choose-reward',{choiceId:s.pendingChoice.id,modelId:s.pendingChoice.options[0]}));assert.throws(()=>H.mutate(chosen,1,req('chest')),/Нет наград/);assert.throws(()=>claim(chosen,'club-body'));
});
test('a pending option acquired elsewhere becomes materials, never a second item',()=>{
 let s=H.mutate(empty(),71,req('chest'),0,[0]);const id=s.pendingChoice.options[0];s.dust=20;s=H.mutate(s,71,req('craft',{modelId:id}));assert.equal(s.inventory.length,1);s=claim(s,id);assert.equal(s.inventory.length,1);assert.equal(s.dust,4);assert.equal(s.lastResult.kind,'duplicate');assert.equal(s.claimedLevel,1);
});
test('daily gifts have equal model chances unaffected by hidden skills; duplicates give fixed materials',()=>{
 const ids=new Set();for(let n=0;n<C.collectionModels().length;n++){const base={...empty(),skills:{one_time:20,river:20,bonus:20}},s=H.mutate(base,71,req('adventure'),0,[n]);ids.add(s.inventory[0].modelId);assert.equal(s.inventory[0].rarity,0);}
 assert.equal(ids.size,C.collectionModels().length);let s=H.mutate(empty(),71,req('adventure'),0,[0]);assert.throws(()=>H.mutate(s,71,req('adventure'),1000,[0]),/уже получен/);s=H.mutate(s,71,req('adventure'),86400000,[0]);assert.equal(s.inventory.length,1);assert.equal(s.dust,4);assert.deepEqual(s.lastLoot,[]);
});
test('daily gift resets at Moscow midnight',()=>{
 const now=Date.parse('2026-09-10T20:59:00Z'),s=H.mutate(empty(),1,req('adventure'),now,[0]);assert.equal(H.view(s,1,true,now).adventureAvailable,false);assert.equal(H.view(s,1,true,now+60001).adventureAvailable,true);
});
test('workshop makes exact model at server price; cannot forge price, award or duplicate',()=>{
 let s={...empty(),dust:20};s=H.mutate(s,71,req('craft',{modelId:'waaar-yacht',cost:0,award:true,title:'Fake'}));assert.equal(s.dust,0);assert.equal(s.inventory[0].modelId,'waaar-yacht');assert.equal(s.inventory[0].award,undefined);assert.equal(s.inventory[0].title,'Яхта Ваара');
 assert.throws(()=>H.mutate({...s,dust:100},71,req('craft',{modelId:'waaar-yacht'})),/уже есть/);assert.throws(()=>H.mutate(s,71,req('craft',{slot:'head'})),/конкретную/);assert.throws(()=>H.mutate(s,71,req('craft',{modelId:'award-winner'})),/конкретную/);assert.throws(()=>H.mutate(s,71,req('craft',{modelId:'club-head',cost:0})),/20/);
});
test('goals are persistent catalog IDs; completed goal survives receiving the item',()=>{
 let s=H.mutate(empty(),71,req('set-goal',{modelId:'club-head'}));assert.equal(H.view(H.parse(JSON.stringify(s)),71).goal,'club-head');assert.throws(()=>H.mutate(s,71,req('set-goal',{modelId:'foreign'})),/не найдена/);s.dust=20;s=H.mutate(s,71,req('craft',{modelId:s.goal}));assert.equal(s.goal,'club-head');assert.ok(K.owned(s,s.goal));s=H.mutate(s,71,req('set-goal',{modelId:null}));assert.equal(s.goal,null);
});
test('favorite, worn, saved and earned items are protected; legacy salvage values preserved',()=>{
 let s=empty();s.inventory=[item('rare','body','club',2)];assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare'})),/Подтвердите/);assert.equal(H.mutate(s,71,req('salvage',{item:'rare',confirm:true})).dust,4);s.inventory[0].favorite=true;assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/избранного/);s.inventory[0].favorite=false;s.looks=[{id:'x',items:{body:'rare'}}];assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/используется/);s.looks=[];s.inventory[0].award=true;assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/кубок/);
});
test('hidden skill points stay intact, retain caps and never affect real economy',()=>{
 let s={...empty(),skills:{bonus:20,collector:5}};assert.equal(H.view(s,71).points,45);assert.equal(H.view(s,71).lookCapacity,4);assert.equal(H.economy(s).liveEffects,false);assert.throws(()=>H.mutate(s,71,req('train',{skill:'bonus'})),/максимума/);assert.throws(()=>H.mutate(empty(),1,req('train',{skill:'bonus',level:99})),/Нет свободных/);
});
test('earned memories stay distinct; growing trophy collection does not block wardrobe rewards',()=>{
 let s=empty();s.inventory=Array.from({length:200},(_,n)=>({...item('award-'+n,'trophy','final'),award:true}));s.dust=20;s=H.mutate(s,71,req('craft',{modelId:'club-head'}));assert.equal(s.inventory.length,201);s.trophyCatalog=H.trophies({nickname:'ПокерМанки'},true);s=H.mutate(s,71,req('claim-trophy',{award:'winner'}));assert.equal(s.inventory.length,202);assert.throws(()=>H.mutate(s,71,req('claim-trophy',{award:'winner'})),/уже в коллекции/);assert.throws(()=>H.mutate(empty(),71,req('claim-trophy',{award:'winner',trophyCatalog:s.trophyCatalog})),/ещё не получено/);
});
test('private view contains goal and pending choice; public view excludes progression',()=>{
 const s=H.mutate(empty(),71,req('chest'));const v=H.view(s,71,false);for(const k of ['inventory','looks','dust','economy','trophyCatalog','points','goal','pendingChoice','lastResult'])assert.equal(v[k],undefined);assert.equal(H.view(s,71).pendingChoice.options.length,3);
});
test('CAS prevents concurrent reward choice; lost response retries cannot grant twice',async()=>{
 let saved=null;const redis=async commands=>commands.map(c=>{if(c[0]==='GET')return saved;if(c[0]==='HGET')return null;if(c[0]==='SMEMBERS')return [];if(c[0]==='EVAL'){if((saved||'')!==c[4])return 0;saved=c[5];return 1;}throw Error('unexpected');});const filename=path.resolve('lib/profile-hero.js'),ctx={module:{exports:{}},require:id=>id==='./club-social'?{redis}:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);const api=ctx.module.exports;
 const opened=await api.updateHero('ID400800',req('chest',{version:0}));const body=req('choose-reward',{version:opened.version,choiceId:opened.pendingChoice.id,modelId:opened.pendingChoice.options[0],requestId:'choose-request-000001'});const results=await Promise.allSettled([api.updateHero('ID400800',body),api.updateHero('ID400800',{...body,requestId:'other-request-000001'})]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal((await api.updateHero('ID400800',body)).inventory.length,opened.inventory.length+1);assert.equal(JSON.parse(saved).claimedLevel,1);
});
test('load uses bound canonical friend accounts and restores archived earned history',async()=>{
 let stored={...empty(),inventory:[{...item('award-archived','trophy','final',4),award:true,title:'Старый турнир',origin:'История',history:{tournament:'Старый турнир',date:'2026-01-01',results:[]}}]};
 const profiles={ID400800:JSON.stringify({nickname:'ПокерМанки'}),ID403173:JSON.stringify({nickname:'Waaarr'}),ID999:JSON.stringify({nickname:'Waaarr'})};
 const bound={ID400800:'bound',ID403173:'bound'};const keys=require('../lib/pokerplus');
 const redis=async commands=>commands.map(c=>c[0]==='GET'?JSON.stringify(stored):c[0]==='SMEMBERS'?['ID403173','ID999']:c[1]===keys.PROFILE_HASH_KEY?profiles[c[2]]:c[1]===keys.BIND_HASH_KEY?bound[c[2]]:null);
 const filename=path.resolve('lib/profile-hero.js'),ctx={module:{exports:{}},require:id=>id==='./club-social'?{redis}:id==='./friend-tournament-results.json'?[{nick:'ПокерМанки',tournamentId:'test',tournament:'Big Boss',date:'2026-01-01T12:00:00',place:1,reward:100},{nick:'Waaar',tournamentId:'test',tournament:'Big Boss',date:'2026-01-01T12:00:00',place:3,reward:50}]:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);const v=await ctx.module.exports.readHero('ID400800');assert.ok(v.trophyCatalog.some(a=>a.history?.kind==='shared-tournament'));assert.ok(v.trophyCatalog.some(a=>a.id==='archived'));
 delete bound.ID403173;const noFriend=await ctx.module.exports.readHero('ID400800');assert.equal(noFriend.trophyCatalog.some(a=>a.history?.kind==='shared-tournament'),false);assert.ok(noFriend.trophyCatalog.some(a=>a.id==='archived'));
});
test('base outfit is owned for free, survives migration and cannot be salvaged for materials',()=>{
 let s=H.fresh();assert.equal(s.inventory.length,5);assert.equal(s.claimedLevel,0);assert.equal(s.dust,0);for(const id of ['club-body','club-legs','club-feet']){const i=K.owned(s,id);assert.ok(i);assert.throws(()=>H.mutate(s,71,req('salvage',{item:i.id,confirm:true})),/Базовые вещи/);}
 s=H.migrate({...s,schema:3,inventory:[]});assert.equal(s.inventory.length,5);assert.equal(s.claimedLevel,0);assert.deepEqual(H.migrate(s),s);
});
test('embedded accessories migrate once for inventory and saved outfits without changing rewards',()=>{
 const original={...H.fresh(),accessoriesVersion:undefined,dust:17,claimedLevel:8,pendingChoice:{id:'pending',level:9,options:['final-head','grinder-head','final-body']},inventory:[item('suit','body','final')],lookEquipped:{body:'suit'},looks:[{id:'saved',items:{body:'suit'}}]};
 const s=H.migrate(original);for(const slot of ['patch','sleeve','pin']){assert.ok(s.lookEquipped[slot]);assert.equal(s.looks[0].items[slot],s.lookEquipped[slot]);}assert.equal(s.dust,17);assert.equal(s.claimedLevel,8);assert.deepEqual(s.pendingChoice,original.pendingChoice);assert.deepEqual(H.migrate(s),s);
 let next=H.mutate(s,71,req('unequip',{slot:'patch'}));assert.equal(H.parse(JSON.stringify(next)).lookEquipped.patch,undefined);
 next.dust=20;next=H.mutate(next,71,req('craft',{modelId:'cufflinks-silver'}));const cuff=K.owned(next,'cufflinks-silver');next=H.mutate(next,71,req('wear',{item:cuff.id}));assert.equal(next.lookEquipped.body,'suit');assert.equal(next.lookEquipped.cufflinks,cuff.id);assert.equal(next.dust,0);
});
test('legacy single last-loot ID migrates and follows duplicate remapping without resetting progress',()=>{
 const raw={...empty(),schema:3,accessoriesVersion:undefined,version:12,dust:9,claimedLevel:8,skills:{bonus:3},inventory:[item('visible','body','club',0),item('duplicate','body','club',2)],lookEquipped:{body:'visible'},lastLoot:'duplicate'};
 const s=H.parse(JSON.stringify(raw));assert.deepEqual(s.lastLoot,['visible']);assert.equal(s.version,12);assert.equal(s.claimedLevel,8);assert.equal(s.skills.bonus,3);assert.equal(s.dust,13);assert.deepEqual(H.parse(JSON.stringify(s)),s);assert.ok(H.view(s,10).inventory.some(i=>i.id==='visible'));
 const latest=H.parse(JSON.stringify({...H.fresh(),lastLoot:'single-id'}));assert.deepEqual(latest.lastLoot,['single-id']);
});
