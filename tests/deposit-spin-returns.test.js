'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {snapshot,mergeReturns}=require('../lib/deposit-spin-returns');
const period={start:Date.parse('2026-10-19T03:00Z'),end:Date.parse('2026-10-20T03:00Z')};
const entry=(extra={})=>({id:'bonus_123_abc',user_id:'u1',operation_type:'admin_debit',direction:'debit',amount:1000,created_at:'2026-10-19T10:00Z',admin_id:'tg_1897001087',...extra});
test('old issue returned in current shift is listed; totals use return time and cents once',()=>{
 const e=entry({created_at:'2026-10-18T10:00Z'}),review=JSON.stringify({status:'plus',amount:8310,verifiedAt:'2026-10-20T00:00Z',adminId:'tg_1897001087'});
 const result=snapshot([e],{[e.id]:review},{u1:{name:'Игрок',playerId:'875394'}},period);assert.equal(result.rows.length,1);assert.equal(result.returned,831000);assert.equal(result.rows[0].playerId,'875394');
 const changed=snapshot([e],{[e.id]:review.replace('8310','8910')},{},period);assert.equal(changed.returned,891000);
 assert.equal(snapshot([e],{[e.id]:review.replace('2026-10-20T00:00Z','2026-10-20T03:00Z')},{},period).rows.length,0);
});
test('issued-in-period rows keep prior review visible without counting it as a return today',()=>{
 const e=entry(),review=JSON.stringify({status:'plus',amount:600,verifiedAt:'2026-10-18T12:00Z',adminId:'tg_1897001087'});const s=snapshot([e],{[e.id]:review},{},period);assert.equal(s.rows.length,1);assert.equal(s.returned,0);assert.equal(s.rows[0].amount,60000);
 assert.equal(snapshot([entry({operation_type:'promo_reward',direction:'credit'})],{},{},period).rows.length,0);
});
test('spin returns are separate from deposits and join the recording manager',()=>{
 const s=snapshot([entry()],{'bonus_123_abc':JSON.stringify({status:'plus',amount:8910,verifiedAt:'2026-10-19T18:00Z',adminId:'tg_1897001087'})},{},period),v={statistics:{returned:10000,deposits:100000,managers:[]}};
 mergeReturns(v,s);assert.equal(v.statistics.returned,901000);assert.equal(v.statistics.spinReturned,891000);assert.equal(v.statistics.deposits,100000);assert.equal(v.statistics.managers[0].name,'Вика');
});
function mocked(){let review='',writes=0;const module={exports:{}};const redis={pipeline:async cmds=>cmds.map(c=>{if(c[0]==='GET')return {result:JSON.stringify(entry())};if(c[0]==='HGET')return {result:review};if(c[0]==='EVAL'){assert.equal(c[5],review);review=c[6];writes++;return {result:1};}throw Error('Unexpected '+c[0]);})};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/deposit-spin-returns'),'utf8'),{module,exports:module.exports,require:id=>id==='./redis'?redis:id==='./bonus-ledger'?{BONUS_LEDGER_ALL_KEY:'all',BONUS_LEDGER_ENTRY_PREFIX:'entry:'}:require(id),setTimeout,clearTimeout});return {api:module.exports,read:()=>({review:JSON.parse(review||'null'),writes})};}
test('save retries do not duplicate a return; edits require the current source version',async()=>{
 const m=mocked(),empty=crypto.createHash('sha256').update('').digest('hex'),args={operationId:'bonus_123_abc',amount:891000,reviewVersion:empty};await m.api.saveReturn(args,'tg_1897001087',1000);await m.api.saveReturn(args,'tg_1897001087',2000);assert.equal(m.read().writes,1);
 await assert.rejects(()=>m.api.saveReturn({...args,amount:60000},'tg_2144406710',3000),e=>e.status===409);
 const version=crypto.createHash('sha256').update(JSON.stringify(m.read().review)).digest('hex');await m.api.saveReturn({...args,amount:60000,reviewVersion:version},'tg_1897001087',4000);assert.equal(m.read().review.amount,600);assert.equal(m.read().review.edits.length,1);assert.equal(m.read().writes,2);
 await assert.rejects(()=>m.api.saveReturn({...args,amount:-100},'admin'),e=>e.status===400);
});

test('large history uses batched pipelines and simultaneous opens share the same read',async()=>{
 const history=Array.from({length:1201},(_,i)=>entry({id:'bonus_'+i,created_at:i===1200?'2026-10-18T10:00Z':'2026-10-19T10:00Z'}));
 const calls=[],module={exports:{}};
 const redis={pipeline:async commands=>{calls.push(commands);return commands.map(c=>{
  if(c[0]==='LRANGE')return {result:history.map(e=>e.id)};
  if(c[0]==='MGET')return {result:c.slice(1).map(key=>JSON.stringify(history[Number(key.replace('entry:bonus_',''))]))};
  if(c[0]==='HMGET'&&c[1]==='poker_app:bonus_issue_reviews')return {result:c.slice(2).map(id=>id==='bonus_1200'?JSON.stringify({status:'plus',amount:600,verifiedAt:'2026-10-19T12:00Z'}):'')};
  if(c[0]==='HMGET')return {result:c.slice(2).map(()=> '')};
  throw Error('Unexpected '+c[0]);
 });}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/deposit-spin-returns'),'utf8'),{module,exports:module.exports,require:id=>id==='./redis'?redis:id==='./bonus-ledger'?{BONUS_LEDGER_ALL_KEY:'all',BONUS_LEDGER_ENTRY_PREFIX:'entry:'}:require(id)});
 const [a,b]=await Promise.all([module.exports.loadSnapshot(period),module.exports.loadSnapshot(period)]);
 assert.equal(a,b);assert.equal(a.rows.length,1201);assert.equal(a.returned,60000);
 assert.equal(calls.length,5);assert.equal(calls.filter(cmds=>cmds[0][0]==='LRANGE').length,1);
 assert.equal(calls[1].length,5);assert.equal(calls[2].length,5);
 await module.exports.loadSnapshot(period);assert.equal(calls.length,5);
});
