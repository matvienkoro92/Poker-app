'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const honors=require('../lib/club-honors'),G=require('../app-garage-catalog'),rank=require('../lib/club-honors-ranking');
const row=(nick,month,reward=100)=>({nick,value:1,detailRows:[{_monthKey:month,_reward:reward}]});
test('compiled ranking matches the existing monthly ranking including ties and game categories',()=>{
 const c={window:{addEventListener(){}},document:{querySelectorAll(){return[];},getElementById(){return null;},addEventListener(){}},setTimeout(){},clearTimeout(){},localStorage:{getItem(){return null;}},location:{search:''}};vm.createContext(c);vm.runInContext(fs.readFileSync('app-hall-fame.js','utf8'),c);
 for(const month of ['10.2026','11.2026']){const data={topWin:[row('Alpha',month),row('Beta',month)],king:[row('Beta',month)],goldenBall:[row('Gamma',month)],nardsKing:[{nick:'Delta',accountId:'ID100001',monthRatings:{[month]:{value:20,rawScore:20,wins:2,losses:1}},detailRows:[]}]};assert.equal(JSON.stringify(rank.month(data,month).rows),JSON.stringify(c.hallFishPlayerMonthSpec(data,month).rows));}
});
test('Moscow boundary, unfinished years and joint annual champions',()=>{
 assert.deepEqual(honors.period(new Date('2026-12-31T21:01:00Z')),{year:2027,month:1});
 const issues=Array.from({length:12},(_,i)=>({month:String(i+1).padStart(2,'0')+'.2026',final:true,winners:[{nick:i%2?'A':'B',accountId:i%2?'ID100001':'ID100002'}]}));
 assert.equal(honors.annual(issues,2026,new Date('2026-12-30')).final,false);
 const annual=honors.annual(issues,2026,new Date('2027-01-02'));assert.equal(annual.final,true);assert.equal(annual.winners.length,2);assert.equal(annual.winners[0].titles,6);
 assert.equal(honors.annual(issues.slice(1),2026,new Date('2027-01-02')).final,false);
});
test('level and client equipment cannot unlock a ring or belt without server entitlement',()=>{
 for(const [kind,id]of [['ring','monthChampion'],['belt','yearChampion']]){assert.equal(G.catalog({level:100}).find(i=>i.kind===kind&&i.id===id).unlocked,false);assert.throws(()=>G.normalize({...G.defaults,[kind]:id},{level:100},true));assert.equal(G.savedLoadout({[kind]:id},{level:100})[kind],'none');}
 const s={level:1,earnedHonors:['month:10.2026','year:2026']};assert.equal(G.normalize({...G.defaults,ring:'monthChampion',belt:'yearChampion'},s,true).ring,'monthChampion');assert.equal(G.savedLoadout({ring:'monthChampion'},s).ring,'monthChampion');
});
function memory(){const strings=new Map(),sets=new Map();return {strings,sets,redis:async commands=>commands.map(([cmd,key,...args])=>{if(cmd==='GET')return strings.get(key)||null;if(cmd==='HGET')return 'ID100001';if(cmd==='SET'){if(args.includes('NX')&&strings.has(key))return null;strings.set(key,args[0]);return 'OK';}if(cmd==='SADD'){const s=sets.get(key)||new Set();s.add(args[0]);sets.set(key,s);return 1;}if(cmd==='SMEMBERS')return [...(sets.get(key)||[])];throw Error(cmd);})};}
test('final issues are immutable, current month earns nothing, failures cannot issue awards',async()=>{
 const m=memory(),options={redis:m.redis,commands:m.redis,now:new Date('2026-03-15T12:00:00Z'),poker:{through:'2026-03-14',data:{topWin:[row('Alpha','02.2026'),row('Alpha','03.2026')]}},readGames:async()=>[{goldenBall:[]},{nardsKing:[]}],memberProfile:async()=>({bound:true,nick:'Alpha',level:10})};
 const data=await honors.uncachedRead(options);assert.equal(data.issues.find(i=>i.month==='02.2026').winners[0].accountId,'ID100001');assert.deepEqual(await honors.entitlements('ID100001',m.redis),['month:02.2026']);
 options.poker.data.topWin=[row('Beta','02.2026')];const reread=await honors.uncachedRead(options);assert.equal(reread.issues.find(i=>i.month==='02.2026').winners[0].nick,'Alpha');
 const before=m.strings.size;await assert.rejects(()=>honors.uncachedRead({...options,readGames:async()=>{throw Error('offline');}}));assert.equal(m.strings.size,before);
});
