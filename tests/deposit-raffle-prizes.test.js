'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {snapshot,eligible,mergeReturns}=require('../lib/deposit-raffle-prizes');
const period={start:Date.parse('2026-10-20T03:00:00Z'),end:Date.parse('2026-10-21T03:00:00Z')};
const winner=(extra={})=>({userId:'1',p21Id:'123',name:'Игрок',winnerStatus:'ok',winnerSeatStatus:'seated',winnerStatusAt:'2026-10-20T08:00:00Z',prize:'1000 ₽',...extra});
const raffle=(w,extra={})=>({id:'r',prizeKind:'cash',title:'Кеш',winners:[w],...extra});
test('all issued prizes are listed but only seated winners are editable; previous outcomes preserved',()=>{
 const rows=snapshot([raffle(winner({winnerCashoutStatus:'plus',winnerCashoutAmount:3500,winnerCashoutAt:'2026-10-20T09:00:00Z',winnerCashoutBy:'tg_2144406710'})),raffle(winner({winnerStatus:'fail'}),{id:'fail'}),raffle(winner({winnerSeatStatus:'not_seated'}),{id:'no-seat'}),raffle(winner({prize:'2000 ₽'}),{id:'2000'}),raffle(winner({prize:'Билет 2000 ₽'}),{id:'ticket',prizeKind:'ticket'}),raffle(winner({winnerStatusAt:'2026-10-20T02:59:59Z'}),{id:'yesterday'})],period);
 assert.deepEqual(rows.rows.map(r=>r.raffleId),['r','no-seat','ticket']);assert.equal(rows.rows.find(r=>r.raffleId==='no-seat').editable,false);assert.equal(rows.returned,350000);assert.equal(rows.returns.length,1);assert.equal(rows.rows[0].amount,350000);
 const view={statistics:{returned:10000,managers:[{id:'tg_2144406710',returned:10000}]}};mergeReturns(view,rows);assert.equal(view.statistics.returned,360000);assert.equal(view.statistics.managers[0].returned,360000);
});
test('auto debited unseated winners are read-only issue/return operations and counted once',()=>{
 const w=winner({winnerSeatStatus:'not_seated',cashSeatingMonitor:{status:'returned',amount:1000,returnedAt:'2026-10-20T09:00:00Z'},winnerCashoutStatus:'plus',winnerCashoutAmount:9999});assert.equal(eligible(raffle(w),w),false);
 const s=snapshot([raffle(w),raffle(w)],period);assert.equal(s.rows.length,0);assert.equal(s.operations.length,1);assert.equal(s.operations[0].readOnly,true);assert.equal(s.operations[0].issueAmount,100000);assert.equal(s.returned,100000);assert.equal(s.returns.length,1);
 const pending=winner({winnerSeatStatus:'not_seated',cashSeatingMonitor:{status:'returning',amount:1000}});assert.equal(snapshot([raffle(pending)],period).returned,0);
});
test('returns use confirmation time; changing an amount replaces its source value without a duplicate',()=>{
 const w=winner({winnerStatusAt:'2026-10-19T08:00:00Z',winnerCashoutStatus:'plus',winnerCashoutAmount:1000,winnerCashoutAt:'2026-10-20T08:00:00Z'});assert.equal(snapshot([raffle(w)],period).rows.length,0);assert.equal(snapshot([raffle(w)],period).returned,100000);w.winnerCashoutAmount=1500;assert.equal(snapshot([raffle(w)],period).returned,150000);w.winnerCashoutStatus='minus';assert.equal(snapshot([raffle(w)],period).returned,0);
});
test('loader reads date index including the Moscow cutoff and propagates storage failures',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),calls=[],module={exports:{}};let offline=false;
 const redis={pipeline:async commands=>{calls.push(...commands);if(offline)throw Error('offline');return commands.map(([op])=>({result:op==='GET'?'1':op==='SMEMBERS'?['r']:op==='MGET'?[JSON.stringify(raffle(winner()))]:null}));}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/deposit-raffle-prizes'),'utf8'),{module,exports:module.exports,require:id=>id==='./redis'?redis:require('../lib/raffle-stats-index')});
 const result=await module.exports.loadSnapshot(period);assert.equal(result.rows.length,1);assert.ok(calls.some(c=>c[1]==='poker_app:raffle_stats_day:v3:2026-10-21'));offline=true;await assert.rejects(()=>module.exports.loadSnapshot(period),/offline/);
});

test('issued tickets are considered seated and allow direct outcome entry',()=>{
 const {issuedTicketIsSeated}=require('../lib/deposit-raffle-prizes'),w=winner({winnerSeatStatus:''}),r=raffle(w,{prizeKind:'ticket'});assert.equal(issuedTicketIsSeated(r,w),true);const row=snapshot([r],period).rows[0];assert.equal(row.editable,true);assert.equal(row.seatStatus,'seated');assert.equal(snapshot([r],period).returned,0);
 assert.equal(issuedTicketIsSeated(raffle(w),w),false);assert.equal(issuedTicketIsSeated(r,{...w,winnerSeatStatus:'not_seated'}),false);assert.equal(issuedTicketIsSeated(r,{...w,winnerStatus:'fail'}),false);assert.equal(issuedTicketIsSeated(r,{...w,cashSeatingMonitor:{status:'returned'}}),false);
 w.winnerSeatStatus='seated';w.winnerCashoutStatus='plus';w.winnerCashoutAmount=6500;w.winnerCashoutAt='2026-10-20T08:00:00Z';assert.equal(snapshot([r],period).returned,650000);
});

test('daily list follows the raffle day, not a later prize confirmation; cash returns retain their accounting date',()=>{
 const old=raffle(winner({winnerCashoutStatus:'plus',winnerCashoutAmount:500,winnerCashoutAt:'2026-10-20T09:00:00Z'}),{id:'old',endDate:'2026-10-19T12:00:00Z'});
 const today=raffle(winner({winnerStatusAt:'2026-10-21T05:00:00Z'}),{id:'today',endDate:'2026-10-20T12:00:00Z'});
 const before=raffle(winner(),{id:'before',endDate:'2026-10-20T02:59:59Z'});
 const atStart=raffle(winner(),{id:'start',endDate:'2026-10-20T03:00:00Z'});
 const atEnd=raffle(winner(),{id:'end',endDate:'2026-10-21T03:00:00Z'});
 const result=snapshot([old,today,before,atStart,atEnd],period);
 assert.deepEqual(result.rows.map(r=>r.raffleId),['today','start']);
 assert.equal(result.returned,50000);
});

test('daytime cash 5/10 prizes have a separate tab and share return accounting',()=>{
 const seated=winner({prize:'Беккинг-байин 200 ₽ на кеш 5/10',winnerCashoutStatus:'plus',winnerCashoutAmount:750,winnerCashoutAt:'2026-10-20T09:00:00Z'});
 const returned=winner({prize:'200 ₽',winnerSeatStatus:'not_seated',cashSeatingMonitor:{status:'returned',amount:200,returnedAt:'2026-10-20T09:00:00Z'}});
 const pending=winner({prize:'200 ₽',winnerSeatStatus:'not_seated'});
 const result=snapshot([raffle(seated,{id:'day'}),raffle(returned,{id:'returned'}),raffle(pending,{id:'pending'}),raffle(winner(),{id:'evening'})],period);
 assert.equal(eligible(raffle(seated),seated),true);
 assert.deepEqual(result.rows.map(r=>[r.raffleId,r.kind,r.editable]),[['day','cash_5_10',true],['pending','cash_5_10',false],['evening','cash',true]]);
 assert.equal(result.operations[0].kind,'cash_5_10');
 assert.equal(result.operations[0].issueAmount,20000);
 assert.equal(result.returned,95000);
 const view={statistics:{returned:0,managers:[]}};mergeReturns(view,result);assert.equal(view.statistics.returned,95000);
});

test('all-time fallback reads bounded pages, deduplicates IDs and never uses blocked LRANGE 0 -1',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),calls=[],mod={exports:{}},ids=Array.from({length:501},(_,i)=>'r'+i);ids[500]='r0';const redis={pipeline:async commands=>{calls.push(...commands);return commands.map(command=>{const [op,key,a,b]=command;return {result:op==='GET'?null:op==='LLEN'?ids.length:op==='LRANGE'?ids.slice(a,b+1):op==='MGET'?command.slice(1).map(id=>JSON.stringify(raffle(winner(),{id}))):null};});}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/deposit-raffle-prizes'),'utf8'),{module:mod,exports:mod.exports,require:id=>id==='./redis'?redis:require('../lib/raffle-stats-index')});const result=await mod.exports.loadSnapshot({start:null,end:null});assert.equal(result.rows.length,500);const pages=calls.filter(c=>c[0]==='LRANGE');assert.deepEqual(pages.map(c=>Array.from(c.slice(2))),[[0,499],[500,999]]);assert.ok(!calls.some(c=>c[0]==='LRANGE'&&c[3]===-1));
});
