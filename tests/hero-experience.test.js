'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const H=require('../lib/profile-hero'),C=require('../hero-catalog'),K=require('../lib/hero-collection'),E=require('../lib/hero-experience');
const change=(s,action,extra={})=>H.mutate(s,71,{action,requestId:'experience-test-00001',...extra});
test('outfits only equip owned components and preserve missing slots and unrelated items',()=>{
 let s=H.fresh();K.addModel(s,'grinder-head',71,'test',0);K.addModel(s,'oldschool-body',71,'test',0);
 s=change(s,'wear',{item:K.owned(s,'oldschool-body').id});s=change(s,'wear',{item:K.owned(s,'grinder-head').id});const before=s.inventory.length,top=s.lookEquipped.body,hat=s.lookEquipped.head;
 s=change(s,'wear-outfit',{outfit:'evening-poker21'});assert.equal(s.inventory.length,before);assert.equal(s.lookEquipped.body,top);assert.equal(s.lookEquipped.head,hat);assert.equal(s.lookEquipped.scene,undefined);assert.deepEqual(s.equipped,s.lookEquipped);
 s=change(s,'wear-outfit',{outfit:'club-classic'});assert.equal(s.lookEquipped.body,K.owned(s,'club-body').id);assert.equal(s.lookEquipped.head,hat);
 assert.throws(()=>change(s,'wear-outfit',{outfit:'forged'}),/не найден/);
});
test('premium items cannot be crafted, drawn, salvaged or granted through disabled checkout',()=>{
 const s={...H.fresh(),dust:1000};for(const id of ['evening-scene','evening-entrance']){
 assert.ok(!C.collectionModels().some(m=>m.id===id));assert.throws(()=>change(s,'craft',{modelId:id}),/не изготавливается/);
 const forged={...s,pendingChoice:{id:'fake',options:[id],level:1}};assert.throws(()=>change(forged,'choose-reward',{choiceId:'fake',modelId:id}),/бесплатные/);
 K.addModel(s,id,71,'server test grant',0);assert.throws(()=>change(s,'salvage',{item:K.owned(s,id).id,confirm:true}),/Премиальные/);
 }for(const action of ['purchase','checkout','gift-purchase'])assert.throws(()=>change(s,action,{paid:true,price:0}),/не открыты/);
});
test('permanent styles count unique claimed tournaments, with separate shared-event progress',()=>{
 let s=H.fresh();const award=(id,t,kind='tournament')=>({id,award:true,slot:'trophy',set:'final',rarity:4,history:{tournamentId:t,kind,date:'2026-09-11',results:[]}});
 s.inventory.push(award('a','t1'),award('b','t1','shared-tournament'));
 assert.equal(E.progress(s).tournaments.length,1);assert.equal(E.progress(s).shared.length,1);
 s=change(s,'set-memory-style',{item:'a',style:'engraved'});assert.throws(()=>change(s,'set-memory-style',{item:'a',style:'laurel'}),/не открыт/);
 s.inventory.push(award('c','t2'),award('d','t3'));s=change(s,'set-memory-style',{item:'a',style:'laurel'});
 assert.equal(s.inventory.find(i=>i.id==='a').displayStyle,'laurel');assert.throws(()=>change(s,'set-memory-style',{item:'b',style:'laurel'}),/не открыт/);
 s.inventory=s.inventory.filter(i=>!['c','d'].includes(i.id));s=H.parse(JSON.stringify(s));assert.equal(E.progress(s).tournaments.length,3);assert.ok(E.styleOptions(s,s.inventory.find(i=>i.id==='a')).find(x=>x.id==='laurel').available);
 assert.throws(()=>change(s,'set-memory-style',{item:s.inventory[0].id,style:'engraved'}),/памятным/);
});
test('wishlist and gift drafts do not grant items and stay private',()=>{
 let s=H.fresh(),before=JSON.stringify(s.inventory);s=change(s,'shop-wishlist',{enabled:true});s=change(s,'gift-draft',{recipient:'ID403173',message:'a'.repeat(200)});
 assert.equal(JSON.stringify(s.inventory),before);assert.equal(s.giftDraft.message.length,160);assert.equal(s.dust,0);assert.equal(E.shop(s).canPurchase,false);assert.equal(E.shop(s).price,null);
 const pub=H.view(s,71,false);for(const key of ['shop','giftFriends','memoryProgress','inventory'])assert.equal(pub[key],undefined);
 s=change(s,'gift-draft',{recipient:null});assert.equal(s.giftDraft,null);assert.throws(()=>change(s,'gift-draft',{recipient:'forged'}),/Выберите/);
});
test('gift recipient is checked against server friendships before saving',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),filename=path.resolve('lib/profile-hero.js');let stored=null,friend=false;
 const redis=async commands=>commands.map(c=>{if(c[0]==='SISMEMBER')return friend?1:0;if(c[0]==='GET')return stored;if(c[0]==='HGET')return null;if(c[0]==='SMEMBERS')return [];if(c[0]==='EVAL'){stored=c[5];return 1;}throw Error(c[0]);});
 const ctx={module:{exports:{}},require:id=>id==='./club-social'?{redis}:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);const api=ctx.module.exports;
 const body={action:'gift-draft',recipient:'ID403173',message:'Привет',version:0,requestId:'gift-test-request-0001'};
 await assert.rejects(api.updateHero('ID400800',body),/списке друзей/);assert.equal(stored,null);friend=true;const result=await api.updateHero('ID400800',body);assert.equal(result.shop.giftDraft.recipient,'ID403173');assert.equal(result.inventory.length,5);
});
test('saved outfits restore earned styles without trusting client style overrides',()=>{
 let s=H.fresh();s.inventory.push({id:'earned',slot:'trophy',set:'final',rarity:4,award:true,history:{tournamentId:'t1',date:'2026-09-11',results:[]}});
 s=change(s,'wear',{item:'earned'});s=change(s,'set-memory-style',{item:'earned',style:'engraved'});s=change(s,'save-look',{name:'Гравировка',styles:{earned:'laurel'}});assert.equal(s.looks[0].styles.earned,'engraved');
 const key=H.view(s,71).lookKey;s=change(s,'set-memory-style',{item:'earned',style:'original'});assert.notEqual(H.view(s,71).lookKey,key);s=change(s,'apply-look',{look:s.looks[0].id});assert.equal(s.inventory.find(i=>i.id==='earned').displayStyle,'engraved');assert.equal(H.view(s,71).lookKey,key);
});
test('look identity ignores instance IDs and order but changes with clothes and styles',()=>{
 const s=H.fresh();const a=H.view(s,71).lookKey;let worn=change(s,'wear-outfit',{outfit:'club-classic'});assert.notEqual(H.view(worn,71).lookKey,a);
 const b=H.view(worn,71).lookKey;for(const i of worn.inventory){const old=i.id;i.id='new-'+i.id;if(worn.lookEquipped[i.slot]===old)worn.lookEquipped[i.slot]=i.id;}worn.lookEquipped=Object.fromEntries(Object.entries(worn.lookEquipped).reverse());assert.equal(H.view(worn,71).lookKey,b);assert.equal(H.view(worn,71,false).lookKey,undefined);
});
test('collection journal records exact materials and goal time, with no fabricated migration events',()=>{
 let s=H.fresh();assert.equal(H.parse(JSON.stringify(s)).activity.length,0);s=H.mutate(s,71,{action:'set-goal',modelId:'grinder-head',requestId:'goal-request-00001'},1000);s.dust=20;
 s=H.mutate(s,71,{action:'craft',modelId:'grinder-head',requestId:'craft-request-00001'},5000);assert.equal(s.activity[0].dustDelta,-20);assert.equal(s.activity[0].goalElapsedMs,4000);assert.equal(s.collectionTotals.crafted,1);assert.equal(s.lastGoalResult.completedAt,5000);
 s=H.mutate(s,71,{action:'adventure',requestId:'gift-request-00001'},6000,[0]);assert.equal(s.activity[0].kind,'duplicate');assert.equal(s.activity[0].dustDelta,4);assert.equal(s.collectionTotals.draws,1);assert.equal(s.collectionTotals.duplicates,1);
 const publicView=H.view(s,71,false);for(const key of ['activity','collectionTotals','lastGoalResult','goalStartedAt'])assert.equal(publicView[key],undefined);
});
