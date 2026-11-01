'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{aggregate,monthKey}=require('../lib/billiards-achievements');
test('paid billiards wins exclude draws/free; super-shots use own successful counter',()=>{
 const row=(paid,winner,at)=>JSON.stringify({finishedAt:at,room:{wagered:paid,state:{winner},playerProfiles:[{accountId:'ID000001',name:'Первый'},{accountId:'ID000002',name:'Второй'}]}});
 const d=aggregate({ID000001:JSON.stringify({wins:7,monthWins:{'10.2026':2,'11.2026':1}})},[{a:row(true,0,Date.UTC(2026,9,4)),b:row(false,0,Date.UTC(2026,9,5)),c:row(true,'draw',Date.UTC(2026,9,6)),d:row(true,1,Date.UTC(2026,10,1))}]);
 assert.equal(d.goldenBall[0].value,7);assert.equal(d.goldenBall[0].detailRows.length,3);assert.equal(d.goldenBall[0].nick,'Первый');assert.equal(d.billiardsKing.length,2);assert.equal(d.billiardsKing[0].value,1);assert.equal(d.billiardsKing[0].detailRows[0]._monthKey,'10.2026');
});
test('month boundary uses Moscow time',()=>assert.equal(monthKey(Date.UTC(2026,9,31,21,15)),'11.2026'));
test('Redis hash pairs are accepted as well as objects',()=>{const data=aggregate(['ID000001',JSON.stringify({wins:1,monthWins:{'11.2026':1}})],[]);assert.equal(data.goldenBall[0].value,1);assert.equal(data.goldenBall[0].detailRows[0]._monthKey,'11.2026');});
