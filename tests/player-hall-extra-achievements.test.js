'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {liveStats}=require('../lib/player-hall-extra-achievements');
const {achievementProgress,catalog}=require('../lib/player-hall');
test('all thirteen achievement types are available, with earned-only shelf items',()=>{
 assert.equal(achievementProgress({}).length,13);
 const items=catalog({bound:true,nick:'Test',accountId:'ID1'},[],[],{monthChampion:1,viceChampion:1,clubChoice:1,sngChampion:1},[]);
 assert.deepEqual(items.map(i=>i.id),['month-champion','vice-champion','club-choice','sng-champion']);
});
test('live awards deduplicate saved history, include team winners and exclude test tournaments',()=>{
 const profile={accountId:'ID1',nick:'Test'};
 const state={id:'a',status:'completed',completedAt:'2026-10-01',winnerId:'team',tournamentType:'team',teams:[{id:'team',memberIds:['entry']}],entries:[{id:'entry',accountId:'ID1'}],history:[{completedAt:'2026-10-01',winners:[{place:1,accountId:'ID1'}]}]};
 assert.deepEqual(liveStats(profile,{clubChoiceMonths:['2026-07']},{history:[{month:'2026-07',winners:[{nick:'Test'}]},{month:'2026-08',winners:[{accountId:'ID1'}]}]},{tournaments:[state,{...state,id:'test',isTest:true}]}),{clubChoice:2,sngChampion:1});
 assert.equal(liveStats(profile,{}, {},{history:[{completedAt:'x',winners:[{place:2,accountId:'ID1'},{place:1,accountId:'ID2',nick:'Test'}]}]}).sngChampion,0);
});
test('missing profile awards use confirmed results and do not unlock for strangers',()=>{
 const {profileAwards}=require('../lib/player-hall-extra-achievements');
 const rows=Array.from({length:16},(_,n)=>({nick:n===12?'ПокерМанки':'Other',reward:300000-n*1000,dateLabel:'01.01.2026'}));
 const seasons=[{place:10,title:'Лето 2026',league:1},{place:11,title:'Весна 2026',league:1}];
 const earned=profileAwards({nick:'ПокерМанки'},rows,seasons);
 assert.deepEqual(earned.map(a=>a.id),['top-win-2026','rating-top10','offline-win','poker21-leaderboard']);
 assert.match(earned[0].origin,/13 место/);assert.match(earned[2].origin,/6 место/);
 assert.deepEqual(profileAwards({nick:'Nobody'},rows,[]),[]);
 assert.equal(profileAwards({nick:'Em13!!'},[],[])[0].id,'offline-win');
 assert.equal(profileAwards({nick:'NeCoo1er91'},[],[])[0].id,'poker21-leaderboard');
});
