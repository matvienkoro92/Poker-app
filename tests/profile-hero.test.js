'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const H=require('../lib/profile-hero'),C=require('../hero-catalog');
const req=(action,extra={})=>({action,requestId:'test-request-00000001',...extra});
function item(id,slot='body',set='club',rarity=0){return {id,slot,set,rarity,level:71};}
test('only PokerMonkey is allowed; client cannot unlock another account',async()=>{
 assert.equal(H.heroEnabled('ID400800'),true);
 for(const id of ['ID403173','ID1','ПокерМанки','',undefined]){assert.equal(H.heroEnabled(id),false);assert.equal(await H.readHero(id),null);await assert.rejects(H.updateHero(id,req('chest',{accountId:'ID400800'})),e=>e.status===403);}
});
test('legacy migration preserves inventory IDs, earned level and dust; refunds old skills',()=>{
 const s=H.parse(JSON.stringify({version:7,highestLevel:71,skills:{strike:12},equipped:{body:'old'},inventory:[{id:'old',slot:'body',set:'ember',rarity:4,level:70}],claimedLevel:50,dust:19}));
 assert.equal(s.schema,3);assert.equal(s.inventory[0].id,'old');assert.equal(s.inventory[0].set,'final');assert.equal(s.dust,19);assert.equal(s.claimedLevel,50);assert.equal(H.view(s,71).points,70);assert.deepEqual(H.parse(JSON.stringify(s)),s);
});
test('skill points use server level and caps, no quizzes; effects are preview only',()=>{
 let s=H.fresh();assert.throws(()=>H.mutate(s,1,req('train',{skill:'bonus',level:99})),/Нет свободных/);
 for(let n=0;n<20;n++)s=H.mutate(s,71,req('train',{skill:'bonus'}));assert.throws(()=>H.mutate(s,71,req('train',{skill:'bonus'})),/максимума/);assert.throws(()=>H.mutate(s,71,req('train',{skill:'strike'})),/Неизвестный/);
 assert.equal(H.economy(s).bonusMultiplier,1.1);assert.equal(H.economy(s).liveEffects,false);assert.equal(H.economy(s).newMemberEligibility,'not_connected');assert.equal(H.view(H.mutate(s,71,req('reset')),71).points,70);
});
test('rarity distribution is fixed and cannot be boosted by resetting skills',()=>{
 let s=H.fresh();s.skills={one_time:20,river:20,bonus:20};const counts=[0,0,0,0,0];
 for(let n=0;n<100;n++){const a=H.mutate(s,71,req('chest'),0,[n,0,0]);const b=H.mutate(H.fresh(),71,req('chest'),0,[n,0,0]);assert.equal(a.inventory[0].rarity,b.inventory[0].rarity);counts[a.inventory[0].rarity]++;}
 assert.deepEqual(counts,[35,30,25,8,2]);
});
test('batch chests validate count, level budget and full inventory atomically',()=>{
 let s=H.mutate(H.fresh(),71,req('chest',{count:10}),0,[0,0,0]);assert.equal(s.inventory.length,10);assert.equal(s.claimedLevel,10);
 for(const count of [0,11,1.5,-1])assert.throws(()=>H.mutate(s,71,req('chest',{count})),/от 1 до 10/);
 assert.throws(()=>H.mutate({...s,claimedLevel:71},10,req('chest')),/Недостаточно/);s.inventory=Array.from({length:199},(_,i)=>item(String(i)));assert.throws(()=>H.mutate(s,71,req('chest',{count:2})),/Рюкзак полон/);assert.equal(s.claimedLevel,10);
});
test('wear changes only appearance; equip changes collection; foreign item rejected',()=>{
 let s=H.fresh();s.inventory=[item('a'),item('b','body','final',4)];s=H.mutate(s,71,req('equip',{item:'a'}));s=H.mutate(s,71,req('wear',{item:'b'}));assert.equal(s.equipped.body,'a');assert.equal(s.lookEquipped.body,'b');assert.equal(H.stats(s).style,1);assert.throws(()=>H.mutate(s,71,req('equip',{item:'foreign'})),/не найден/);
});
test('favorite, worn, saved-look and earned trophies cannot be salvaged; rare needs confirmation',()=>{
 let s=H.fresh();s.inventory=[item('rare','body','club',2)];assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare'})),/Подтвердите/);
 const removed=H.mutate(s,71,req('salvage',{item:'rare',confirm:true}));assert.equal(removed.dust,4);
 s.inventory[0].favorite=true;assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/избранного/);s.inventory[0].favorite=false;s.looks=[{id:'look',items:{body:'rare'}}];assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/используется/);s.looks=[];s.inventory[0].award=true;assert.throws(()=>H.mutate(s,71,req('salvage',{item:'rare',confirm:true})),/кубок/);
});
test('saved looks are scoped to inventory, capacity enforced; apply does not change stats',()=>{
 let s=H.fresh();s.inventory=[item('a')];s=H.mutate(s,71,req('wear',{item:'a'}));for(let n=0;n<3;n++)s=H.mutate(s,71,req('save-look',{name:'Look '+n,items:{body:'foreign'}}));assert.throws(()=>H.mutate(s,71,req('save-look',{name:'Full'})),/мест/);assert.equal(s.looks[0].items.body,'a');s.lookEquipped={};s=H.mutate(s,71,req('apply-look',{look:s.looks[0].id}));assert.equal(s.lookEquipped.body,'a');assert.deepEqual(s.equipped,{});
});
test('daily gift once per Moscow day; no gambling action or lesson required',()=>{
 const now=Date.parse('2026-09-10T20:59:00Z');const s=H.mutate(H.fresh(),1,req('adventure'),now);assert.equal(H.view(s,1,true,now).adventureAvailable,false);assert.equal(H.view(s,1,true,now+60001).adventureAvailable,true);assert.throws(()=>H.mutate(s,1,req('adventure'),now),/уже получен/);
});
test('trophies come from server achievements and cannot be forged or reclaimed',()=>{
 assert.deepEqual(H.trophies({nickname:'ПокерМанки'},false),[]);assert.equal(H.trophies({nickname:'ПокерМанки'},true).length,4);
 let s=H.fresh();assert.throws(()=>H.mutate(s,71,req('claim-trophy',{award:'winner',trophyCatalog:[{id:'winner'}]})),/ещё не получено/);s.trophyCatalog=H.trophies({nickname:'ПокерМанки'},true);s=H.mutate(s,71,req('claim-trophy',{award:'winner'}));assert.equal(s.inventory[0].award,true);assert.throws(()=>H.mutate(s,71,req('claim-trophy',{award:'winner'})),/уже в коллекции/);
});
test('crafting uses selected slot and dust; public view excludes inventory and economy',()=>{
 let s=H.fresh();s.dust=20;s=H.mutate(s,10,req('craft',{slot:'trophy'}),0,[0,0,0]);assert.equal(s.inventory[0].slot,'trophy');assert.equal(s.inventory[0].rarity,1);assert.equal(s.inventory[0].award,undefined);assert.equal(s.dust,0);const v=H.view(s,10,false);for(const k of ['inventory','looks','dust','economy','trophyCatalog','points'])assert.equal(v[k],undefined);
});
test('CAS rejects concurrent changes; repeated request gives same result',async()=>{
 let saved=null;const redis=async commands=>commands.map(c=>{if(c[0]==='GET')return saved;if(c[0]==='HGET')return null;if(c[0]==='SMEMBERS')return [];if(c[0]==='EVAL'){if((saved||'')!==c[4])return 0;saved=c[5];return 1;}throw Error('unexpected');});const filename=path.resolve('lib/profile-hero.js'),ctx={module:{exports:{}},require:id=>id==='./club-social'?{redis}:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);const api=ctx.module.exports,b=req('chest',{version:0});const results=await Promise.allSettled([api.updateHero('ID400800',b),api.updateHero('ID400800',{...b,requestId:'other-request-000001'})]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal((await api.updateHero('ID400800',b)).inventory.length,1);
});
test('v2 outfit migration preserves full appearance, presets and salvage value without capacity penalty',()=>{
 const old={...H.fresh(),schema:2,inventory:[item('suit','body','final',4),item('phones','hand','grinder')],equipped:{body:'suit',hand:'phones'},lookEquipped:{body:'suit',hand:'phones'},looks:[{id:'saved',items:{body:'suit',hand:'phones'}}]};
 let s=H.migrate(old);assert.equal(s.schema,3);assert.equal(s.inventory.length,4);assert.equal(s.lookEquipped.head,'phones');assert.equal(s.lookEquipped.legs,'suit-part-legs');assert.deepEqual(s.looks[0].items,s.lookEquipped);assert.deepEqual(H.migrate(s),s);assert.equal(old.inventory.length,2);
 s.equipped={};s.lookEquipped={};s.looks=[];s=H.mutate(s,71,req('salvage',{item:'suit-part-legs',confirm:true}));assert.equal(s.dust,0);assert.equal(H.migrate(s).inventory.length,3);
 s.inventory=Array.from({length:199},(_,n)=>item('new-'+n)).concat([{...item('part'),migratedPart:true}]);assert.equal(H.mutate(s,71,req('chest'),0,[0,0,0]).inventory.length,201);
});
test('individual clothes and accessories never replace other equipped slots; presets restore combination',()=>{
 let s=H.fresh();s.inventory=[item('top'),item('pants','legs','final'),item('shoes','feet','oldschool'),item('hat','head','grinder'),item('glasses','eyes','final')];
 for(const i of s.inventory)s=H.mutate(s,71,req('equip',{item:i.id}));s=H.mutate(s,71,req('save-look',{name:'Mix'}));const saved={...s.lookEquipped};s=H.mutate(s,71,req('unequip',{slot:'head'}));assert.equal(s.lookEquipped.eyes,'glasses');assert.equal(s.lookEquipped.legs,'pants');s=H.mutate(s,71,req('apply-look',{look:s.looks[0].id}));assert.deepEqual(s.lookEquipped,saved);
});
test('load uses bound canonical friend accounts and restores archived earned history',async()=>{
 let stored={...H.fresh(),inventory:[{...item('award-archived','trophy','final',4),award:true,title:'Старый турнир',origin:'История',history:{tournament:'Старый турнир',date:'2026-01-01',results:[]}}]};
 const profiles={ID400800:JSON.stringify({nickname:'ПокерМанки'}),ID403173:JSON.stringify({nickname:'Waaarr'}),ID999:JSON.stringify({nickname:'Waaarr'})};
 const bound={ID400800:'bound',ID403173:'bound'};const keys=require('../lib/pokerplus');
 const redis=async commands=>commands.map(c=>c[0]==='GET'?JSON.stringify(stored):c[0]==='SMEMBERS'?['ID403173','ID999']:c[1]===keys.PROFILE_HASH_KEY?profiles[c[2]]:c[1]===keys.BIND_HASH_KEY?bound[c[2]]:null);
 const filename=path.resolve('lib/profile-hero.js'),ctx={module:{exports:{}},require:id=>id==='./club-social'?{redis}:id==='./friend-tournament-results.json'?[{nick:'ПокерМанки',tournamentId:'test',tournament:'Big Boss',date:'2026-01-01T12:00:00',place:1,reward:100},{nick:'Waaar',tournamentId:'test',tournament:'Big Boss',date:'2026-01-01T12:00:00',place:3,reward:50}]:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);const v=await ctx.module.exports.readHero('ID400800');assert.ok(v.trophyCatalog.some(a=>a.history?.kind==='shared-tournament'));assert.ok(v.trophyCatalog.some(a=>a.id==='archived'));
 delete bound.ID403173;const noFriend=await ctx.module.exports.readHero('ID400800');assert.equal(noFriend.trophyCatalog.some(a=>a.history?.kind==='shared-tournament'),false);assert.ok(noFriend.trophyCatalog.some(a=>a.id==='archived'));
});
