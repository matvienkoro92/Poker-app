'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {liveStats}=require('../lib/player-hall-extra-achievements');
const {achievementProgress,catalog}=require('../lib/player-hall');
test('all nine achievement types are available, with earned-only shelf items',()=>{
 assert.equal(achievementProgress({}).length,9);
 const items=catalog({bound:true,nick:'Test',accountId:'ID1'},[],[],{monthChampion:1,viceChampion:1,clubChoice:1,sngChampion:1},[]);
 assert.deepEqual(items.map(i=>i.id),['month-champion','vice-champion','club-choice','sng-champion']);
});
test('live awards deduplicate saved history, include team winners and exclude test tournaments',()=>{
 const profile={accountId:'ID1',nick:'Test'};
 const state={id:'a',status:'completed',completedAt:'2026-10-01',winnerId:'team',tournamentType:'team',teams:[{id:'team',memberIds:['entry']}],entries:[{id:'entry',accountId:'ID1'}],history:[{completedAt:'2026-10-01',winners:[{place:1,accountId:'ID1'}]}]};
 assert.deepEqual(liveStats(profile,{clubChoiceMonths:['2026-07']},{history:[{month:'2026-07',winners:[{nick:'Test'}]},{month:'2026-08',winners:[{accountId:'ID1'}]}]},{tournaments:[state,{...state,id:'test',isTest:true}]}),{clubChoice:2,sngChampion:1});
 assert.equal(liveStats(profile,{}, {},{history:[{completedAt:'x',winners:[{place:2,accountId:'ID1'},{place:1,accountId:'ID2',nick:'Test'}]}]}).sngChampion,0);
});
