'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {readReport,accountReport}=require('../lib/review-activity-report');
test('club totals reconcile legacy records, comments-only users and duplicate SCAN entries',async()=>{
  const states={
    a:{actions:10,bonusEarned:80,spinBonusEarned:50,spinsEarned:1,spinsAvailable:0,extraSpinsEarned:1},
    b:{actions:14,bonusEarned:0,spinsEarned:2,spinsAvailable:2},
    c:{actions:1,bonusEarned:10,spinsEarned:0}
  };
  let page=0;
  const report=await readReport(async commands=>commands.map(([op])=>{assert.equal(op,'HSCAN');return {result:page++?['0',['b',JSON.stringify(states.b),'c',JSON.stringify(states.c)]]:['99',['a',JSON.stringify(states.a),'b',JSON.stringify(states.b)]]};}));
  assert.deepEqual(report.totals,{publicationBonus:40,commentBonus:0,spinBonus:50,bonusTotal:90,publications:4,comments:21,spinsEarned:3,extraSpinsEarned:1,spinsAvailable:2});
  assert.equal(Object.keys(report.accounts).length,3);
});
test('empty store is a valid zero report; Redis error is not a zero report',async()=>{
  assert.equal((await readReport(async()=>[{result:['0',[]]}])).totals.bonusTotal,0);
  await assert.rejects(readReport(async()=>[{error:'offline'}]),/unavailable/);
  await assert.rejects(readReport(async()=>[]),/unavailable/);
});
test('unfinished scan and inconsistent accounting fail rather than showing partial totals',async()=>{
  await assert.rejects(readReport(async()=>[{result:['1',[]]}],()=>0),/incomplete/);
  assert.throws(()=>accountReport({actions:0,bonusEarned:10}),/invalid_activity_report/);
  assert.throws(()=>accountReport({actions:1,bonusEarned:10,spinBonusEarned:50}),/invalid_activity_state/);
});
