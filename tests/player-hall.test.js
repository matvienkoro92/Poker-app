'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),{createRequire}=require('node:module');
const H=require('../lib/player-hall');
const profile={accountId:'ID1',nick:'Waaaarr',bound:true,name:'Игрок'},stats={first:5,heroes:2,total:1000001,big50:1,big100:1};
const rows=[{tournamentId:'t1',tournament:'Турнир',date:'2026-10-01T12:00:00',nick:'Waaar',place:1,reward:1200},{tournamentId:'t1',tournament:'Турнир',date:'2026-10-01T12:00:00',nick:'Друг',place:2,reward:600}];
test('hall uses verified nickname aliases and preserves exact tournament results and excludes memories',()=>{const list=H.catalog(profile,[{userId:'ID2',nick:'Друг'}],rows,stats,[]);assert.equal(list.filter(i=>i.kind==='cups').length,1);assert.equal(list.filter(i=>i.kind==='memories').length,0);assert.equal(list.find(i=>i.kind==='cups').history.results[0].reward,1200);assert.equal(H.catalog({...profile,bound:false},[],rows,stats,[]).length,0);});
test('server rejects unearned awards, duplicates, unknown lighting and more than five trophies',()=>{const items=H.catalog(profile,[],rows,stats,[]);const good={featured:[items[0].id],theme:'walnut',goal:'wins'};assert.deepEqual(H.selection(good,items,stats),good);assert.throws(()=>H.selection({...good,featured:['forged']},items,stats),/не получена/);assert.throws(()=>H.selection({...good,featured:Array(6).fill(items[0].id)},items,stats),/пяти/);for(const theme of ['walnut','midnight'])assert.equal(H.selection({...good,theme},items,{first:0}).theme,theme);assert.throws(()=>H.selection({...good,theme:'forged'},items,stats),/не открыто/);assert.throws(()=>H.selection({...good,goal:'profit'},items,stats),/цель/);});
test('earned season wall is based on archived summer, excluding September and October',()=>{const seasons=require('../lib/player-hall-seasons.json');assert.ok(Object.values(seasons).flat().length>0);assert.ok(Object.values(seasons).flat().every(i=>['winter','spring','summer'].includes(i.season)&&i.place>0&&[1,2].includes(i.league)));const summer=seasons['покерманки'].find(i=>i.season==='summer'&&i.league===1);assert.equal(summer.place,2);assert.equal(seasons.waaar.find(i=>i.season==='summer'&&i.league===1).place,1);});
function mock(file,stubs){const full=path.resolve(__dirname,'..',file),req=createRequire(full),module={exports:{}};vm.runInNewContext(fs.readFileSync(full,'utf8'),{module,exports:module.exports,require:id=>Object.hasOwn(stubs,id)?stubs[id]:req(id),console,process,Map,Set,Date});return module.exports;}
test('save is always scoped to authenticated user, public target cannot edit another room',async()=>{let target;const handler=mock('lib/api-handlers/player-hall.js',{'../club-social':{context:async()=>({accountId:'ID1',admin:true,body:{action:'save',targetId:'ID2'}})},'../account-id':{resolveAccountId:async()=>{throw Error('not allowed');}},'../player-hall':{save:async id=>{target=id;return {};}}});const res={status(n){this.code=n;return this;},json(d){this.body=d;return this;}};await handler({},res);assert.equal(target,'ID1');assert.equal(res.code,200);});
test('memory survives a rolling result feed; conflicting version and CAS cannot overwrite room',async()=>{let raw=JSON.stringify({version:3,nick:'waaar',items:[{id:'saved',kind:'cups',title:'Сохранённый кубок'}],featured:['saved']}),collision=false;const hall=mock('lib/player-hall.js',{'./club-social':{memberProfile:async()=>profile,redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:c[0]==='EVAL'?(collision?0:(raw=c[5],1)):null)},'./player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{waaar:stats},'./player-hall-seasons.json':{}});assert.ok((await hall.read('ID1',true)).items.some(i=>i.id==='saved'));await assert.rejects(()=>hall.save('ID1',{version:2}),/другой вкладке/);collision=true;await assert.rejects(()=>hall.save('ID1',{version:3,featured:['saved'],theme:'walnut',goal:'wins'}),/изменился/);collision=false;const saved=await hall.save('ID1',{version:3,featured:['saved'],theme:'walnut',goal:'wins'});assert.equal(saved.version,4);});

test('achievement progress includes locked awards with real counters',()=>{const progress=H.achievementProgress({first:0,total:250000});assert.equal(progress.length,13);assert.equal(progress.find(a=>a.id==='millionaire').value,250000);assert.equal(progress.find(a=>a.id==='millionaire').unlocked,false);assert.equal(H.achievementProgress({first:1})[0].unlocked,true);});

test('two shelves allow five earned awards each and preserve empty positions',()=>{const items=[...Array.from({length:6},(_,n)=>({id:'c'+n,kind:'cups'})),...Array.from({length:5},(_,n)=>({id:'a'+n,kind:'achievements'}))];const shelves={cups:['c0','c1','c2','c3','c4'],achievements:['a0','a1','a2','a3','a4']};const good={featured:[...shelves.cups,...shelves.achievements],shelves,theme:'walnut',goal:'wins'};assert.deepEqual(H.selection(good,items,stats),good);assert.throws(()=>H.selection({...good,featured:[...good.featured,'c5']},items,stats),/пяти/);assert.throws(()=>H.selection({...good,shelves:{...shelves,achievements:['c0',null,null,null,null]}},items,stats),/Неверные/);const sparse={...good,featured:['c0','a0'],shelves:{cups:[null,'c0',null,null,null],achievements:[null,null,null,'a0',null]}};assert.deepEqual(H.selection(sparse,items,stats),sparse);});

test('signed-in members can open save and inspect villas without admin privileges',async()=>{
 for(const action of ['get','save','showcase','presence']){
  let accessed=false;const method=action==='get'?'read':action;
  const handler=mock('lib/api-handlers/player-hall.js',{'../club-social':{context:async()=>({accountId:'ID1',admin:false,body:{action,targetId:'ID2'}})},'../account-id':{resolveAccountId:async()=> 'ID2'},'../player-hall':{[method]:async(id)=>{accessed=true;assert.equal(id,action==='save'?'ID1':'ID2');return {accountId:id};}},'../lounge-presence':{read:async()=>{accessed=true;return {};}}});
  const res={status(n){this.code=n;return this;},json(d){this.body=d;return this;}};await handler({},res);assert.equal(res.code,200);assert.equal(accessed,true);
 }
});

test('hall includes February tournament wins beyond friend-news retention',()=>{const archive=require('../lib/player-hall-tournament-results.json');const feed=require('../lib/friend-tournament-results.json');const list=H.catalog({accountId:'ID1',nick:'ПокерМанки',bound:true},[],archive,{},[]);const old=list.filter(i=>i.kind==='cups'&&i.history.date.startsWith('2026-02')&&i.history.results[0].reward>=250000);assert.ok(old.length>0);assert.ok(old.every(i=>!feed.some(r=>r.tournamentId===i.history.tournamentId)));});

test('achievement metrics distinguish verified money totals from award counts',()=>{const progress=H.achievementProgress({...stats,big100:7});assert.deepEqual(progress.find(a=>a.id==='millionaire').metric,{value:1000001,unit:'rub',label:''});assert.deepEqual(progress.find(a=>a.id==='win-100').metric,{value:7,unit:'count',label:'Заносов'});const extra=require('../lib/player-hall-extra-achievements').profileAwards({nick:'ПокерМанки'},[{nick:'ПокерМанки',reward:267750,dateLabel:'01.10.2026'}],[{place:2,title:'Лето',league:1}]);assert.equal(extra.find(a=>a.id==='top-win-2026').metric.value,267750);assert.equal(extra.find(a=>a.id==='rating-top10').metric.value,1);assert.equal(extra.find(a=>a.id==='offline-win').metric.value,120000);assert.equal(extra.find(a=>a.id==='poker21-leaderboard').metric.value,250000);});

test('garage showcase exposes only the public saved outfit, never friends or internal progress',()=>{const d={profile:{accountId:'ID123456',nick:'Игрок',name:'Имя'},saved:{garage:{paint:'ruby',badges:['millionaire']},version:4,items:[{private:true}]},garage:{stats:{level:100,earnedBadges:['millionaire']},friendBest:{name:'Secret',best:9}}};const v=H.showcaseView(d,false);assert.deepEqual(Object.keys(v).sort(),['accountId','customized','garage','name','nick','self','version']);assert.deepEqual(Object.keys(v.garage),['loadout']);assert.equal(v.garage.loadout.paint,'ruby');assert.deepEqual(v.garage.loadout.badges,['millionaire']);assert.equal(v.self,false);assert.equal(v.customized,true);assert.equal(H.showcaseView({...d,saved:{}},true).customized,false);});

test('showcase reads saved cosmetics without loading friends, lounge presence or writing room state',async()=>{const profile={accountId:'ID123456',nick:'Unbound',bound:false,level:0};let reads=0;const stub=mock('lib/player-hall.js',{'./club-social':{memberProfile:async id=>{assert.equal(id,profile.accountId);return profile;},redis:async commands=>{reads++;assert.equal(commands.length,3);assert.ok(commands.every(c=>c[0]==='GET'));assert.equal(commands[0][1],'poker_app:player_hall:ID123456');return [JSON.stringify({garage:{paint:'champagne',badges:['millionaire']}}),'{}','{}'];}},'./player-lounge':{read(){throw Error('must not load lounge');}}});const v=await stub.showcase(profile.accountId,false);assert.equal(reads,1);assert.equal(v.garage.loadout.paint,'champagne');assert.equal(v.garage.loadout.badges.length,0);assert.equal(v.customized,true);});
test('admin showcase resolves the exact target and never invokes save',async()=>{let target;const handler=mock('lib/api-handlers/player-hall.js',{'../club-social':{context:async()=>({accountId:'ID1',admin:true,body:{action:'showcase',targetId:'tg_123'}})},'../account-id':{resolveAccountId:async id=>{assert.equal(id,'tg_123');return 'ID2';}},'../player-hall':{showcase:async(id,self)=>{target=id;assert.equal(self,false);return {accountId:id};},save(){throw Error('must not save');}}});const res={status(n){this.code=n;return this;},json(d){this.body=d;return this;}};await handler({},res);assert.equal(target,'ID2');assert.equal(res.code,200);assert.equal(res.body.showcase.accountId,'ID2');});


test('occupied garage plate rejects the save and reports its owner',async()=>{
 const garage=require('../app-garage-catalog').defaults;
 const raw=JSON.stringify({version:0,nick:'waaar',items:[]});
 let claims=0;
 const hall=mock('lib/player-hall.js',{
  './club-social':{memberProfile:async id=>id==='ID2'?{nick:'Владелец номера'}:{...profile,level:100},redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:null)},
  './garage-plate-registry':{plateKey:require('../lib/garage-plate-registry').plateKey,save:async(_redis,id,_raw,state)=>{claims++;assert.equal(id,'ID1');assert.equal(state.garage.number,garage.number);return {ok:false,owner:'ID2'};}},
  './player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{waaar:stats},'./player-hall-seasons.json':{}
 });
 await assert.rejects(()=>hall.save('ID1',{version:0,featured:[],theme:'walnut',goal:'wins',garage}),e=>e.status===409&&/уже занят игроком Владелец номера/.test(e.message));
 assert.equal(claims,1);
});

test('villa UI is available to verified members and admins but not guests',()=>{
 const G=require('../app-garage-catalog');assert.equal(G.canAccessHall({status:'verified'}),true);assert.equal(G.canAccessHall({adminAccess:true}),true);assert.equal(G.canAccessHall(null),false);assert.equal(G.canAccessHall({status:'guest'}),false);
});

test('every player uses the real profile level for villa clothing and vehicle unlocks',async()=>{
 const G=require('../app-garage-catalog');
 for(const level of [1,10,29,60,100]){
  const hall=mock('lib/player-hall.js',{'./club-social':{memberProfile:async()=>({...profile,level,levelProgress:{xp:17,target:100}}),redis:async cmds=>cmds.map(c=>c[0]==='GET'?'{}':c[0]==='SMEMBERS'?[]:null)},'./player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{waaar:stats},'./player-hall-seasons.json':{}});
  for(const self of [true,false]){const data=await hall.read('ID1',self);assert.equal(data.garage.stats.level,level);assert.equal(data.levelProgress.level,level);assert.equal(data.levelProgress.xp,17);
   for(const item of data.garage.catalog.filter(i=>i.metric==='level'))assert.equal(item.unlocked,level>=item.target,item.key);
  }
  const item=G.items.find(i=>!G.characterFields.includes(i.kind)&&i.metric==='level'&&i.target===level);
  if(item)assert.equal(G.normalize({[item.kind]:item.id},{level},true)[item.kind],item.id);
 }
});

test('table XP comes from the same verified profile status as the leaderboard',async()=>{
 const cached={nickname:'Игрок',totalCounter:{fee:345678,mttCount:20,mttFirstCount:2}};
 const social=mock('lib/club-social.js',{'./redis':{pipeline:async()=>[{result:JSON.stringify(cached)},{result:'123'},{result:'Игрок'}]}});
 const p=await social.memberProfile('ID1');
 const expected=require('../lib/chat-profile-status').pokerProfileStatusFromCachedProfile(cached,{pokerPlusLinked:true});
 assert.equal(p.levelProgress.xp,Math.floor(expected.points-expected.levelStart));
 assert.equal(p.levelProgress.target,expected.nextStart-expected.levelStart);
 assert.equal(p.level,expected.level);
 const unbound=mock('lib/club-social.js',{'./redis':{pipeline:async()=>[{result:JSON.stringify(cached)},{result:null},{result:'Гость'}]}});
 assert.equal((await unbound.memberProfile('ID2')).levelProgress,null);
});

for(const existing of [null,{number:'А123ВС',region:'54',chassis:'aeroPrototype',paint:'champagne',hair:'hairNatural'}]){
 test('character save ignores occupied and supplied vehicle plates '+(existing?'with an existing car':'before any car save'),async()=>{
  let raw=JSON.stringify({version:0,nick:'waaar',items:[],...(existing?{garage:existing}:{})}),claimed=0;
  const hall=mock('lib/player-hall.js',{
   './club-social':{memberProfile:async()=>({...profile,level:100}),redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:c[0]==='EVAL'?(raw=c[5],1):null)},
   './garage-plate-registry':{plateKey:require('../lib/garage-plate-registry').plateKey,save:async()=>{claimed++;return {ok:false,owner:'ID2'};}},
   './player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{waaar:stats},'./player-hall-seasons.json':{}
  });
  const G=require('../app-garage-catalog');
  const result=await hall.save('ID1',{version:0,featured:[],theme:'walnut',goal:'wins',garageScope:'character',garage:{...G.defaults,hair:'hairBuzz',number:'А777АА',region:'77'}});
  const saved=JSON.parse(raw);assert.equal(result.version,1);assert.equal(claimed,0);assert.equal(saved.garage.hair,'hairBuzz');
  for(const key of ['number','region','chassis','paint'])assert.equal(saved.garage[key],existing?.[key]);
 });
}
test('saving vehicle settings preserves the saved character and does not reclaim an unchanged plate',async()=>{
 const G=require('../app-garage-catalog'),old={...G.defaults,hair:'hairBuzz',body:'bodyNormal',suit:'palmTank'};
 let raw=JSON.stringify({version:0,nick:'waaar',items:[],garage:old}),claimed=0;
 const hall=mock('lib/player-hall.js',{
  './club-social':{memberProfile:async()=>profile,redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:c[0]==='EVAL'?(raw=c[5],1):null)},
  './garage-plate-registry':{plateKey:require('../lib/garage-plate-registry').plateKey,save:async()=>{claimed++;return {ok:false,owner:'ID2'};}},
  './player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{waaar:stats},'./player-hall-seasons.json':{}
 });
 await hall.save('ID1',{version:0,featured:[],theme:'walnut',goal:'wins',garageScope:'vehicle',garage:{...G.defaults,vinylText:'TEST'}});
 const saved=JSON.parse(raw).garage;assert.equal(claimed,0);assert.equal(saved.vinylText,'TEST');
 for(const key of G.characterFields)assert.equal(saved[key],old[key]);
});
