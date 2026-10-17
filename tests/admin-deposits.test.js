'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'), vm=require('node:vm');
const parser=require('../app-admin-deposits-parser');
const {applyOperation,view}=require('../lib/admin-deposits');
const tokens=require('../lib/admin-menu-access-token');
const entry={room:'P21',playerId:'123456',recipient:'Иван Петров',bank:'Сбербанк',phone:'+79991234567',total:1500000};
const requestId=n=>'operation_00000000_'+n;
function create(){return applyOperation(null,{action:'create',requestId:requestId(1),entry},'admin-a').state;}

test('recognizes pasted card / SBP / amounts without mistaking account digits for money',()=>{
  const a=parser.parse('Получатель: Иван Петров\nБанк: Сбербанк\n2202 2002 1234 5678\nСумма: 15 000,50 ₽');
  assert.equal(a.card,'2202200212345678');assert.equal(a.amount,1500050);assert.equal(a.recipient,'Иван Петров');
  const b=parser.parse('Иван Петров\nТ-Банк\n8 (999) 123-45-67\n10 500 руб.');
  assert.equal(b.phone,'+79991234567');assert.equal(b.amount,1050000);assert.equal(b.bank,'Т-Банк');
  assert.equal(parser.parse('2202 2002 1234 5678\n+79991234567').amount,null);
  assert.equal(parser.parse('Сумма: 10.000 ₽').amount,null);
  const c=parser.parse('Сумма 5000\nОстаток 2000');assert.equal(c.amount,null);assert.ok(c.warnings.length);
  assert.equal(parser.safeLink('javascript:alert(1)'),'');assert.equal(parser.safeLink('http://bank.test'),'');
  assert.equal(parser.money('0'),null);assert.equal(parser.money('-1'),null);assert.equal(parser.money('1,01'),101);
});
test('ledger decreases remainder, supports exact kopeks, rejects overpayment and duplicate requests',()=>{
  let state=create();const payment={action:'payment',requestId:requestId(2),entryId:requestId(1),amount:500001};
  state=applyOperation(state,payment,'admin-a').state;
  assert.equal(view(state).entries[0].remaining,999999);assert.equal(view(state).totals.paid,500001);
  const repeat=applyOperation(state,payment,'admin-a');assert.equal(repeat.duplicate,true);assert.equal(repeat.state.revision,2);
  assert.throws(()=>applyOperation(state,{...payment,amount:1},'admin-a'),/уже использован/);
  assert.throws(()=>applyOperation(state,{...payment,requestId:requestId(3),amount:1000000},'admin-b'),/больше/);
  assert.throws(()=>applyOperation(state,{action:'archive',entryId:requestId(1),requestId:requestId(4)},'admin-a'),/полностью/);
});
test('void restores balance, never erases history, and reopens archived entries',()=>{
  let state=create();state=applyOperation(state,{action:'payment',requestId:requestId(2),entryId:requestId(1),amount:entry.total},'admin-b').state;
  state=applyOperation(state,{action:'archive',requestId:requestId(3),entryId:requestId(1)},'admin-a').state;
  assert.equal(view(state).totals.total,0);
  state=applyOperation(state,{action:'void',requestId:requestId(4),entryId:requestId(1),paymentId:requestId(2)},'admin-a').state;
  assert.equal(view(state).entries[0].remaining,entry.total);assert.equal(state.entries[0].archived,false);
  assert.equal(state.entries[0].payments.length,1);assert.ok(state.entries[0].payments[0].voidedAt);
  assert.throws(()=>applyOperation(state,{action:'void',requestId:requestId(5),entryId:requestId(1),paymentId:requestId(2)},'admin-a'),/уже отменена/);
});
test('total adjustments are audited and cannot undercut paid funds',()=>{
  let state=create();state=applyOperation(state,{action:'payment',requestId:requestId(2),entryId:requestId(1),amount:500000},'admin-a').state;
  assert.throws(()=>applyOperation(state,{action:'adjust',requestId:requestId(3),entryId:requestId(1),total:499999,reason:'Ошибка'},'admin-b'),/меньше/);
  state=applyOperation(state,{action:'adjust',requestId:requestId(3),entryId:requestId(1),total:1000000,reason:'Уточнили сумму'},'admin-b').state;
  assert.equal(view(state).entries[0].remaining,500000);assert.equal(state.entries[0].changes[0].before,1500000);
  assert.throws(()=>applyOperation(state,{action:'create',requestId:requestId(4),entry},'admin-a'),/уже есть/);
});
function apiSetup(){
  let stored='',offline=false,unknown=false;
  const redis={isConfigured:()=>true,pipeline:async commands=>{
    if(offline)throw Error('offline');
    return commands.map(c=>{if(c[0]==='GET')return{result:stored||null};if(c[0]==='EVAL'){
      if(stored!==c[4])return{result:0};stored=c[5];if(unknown){unknown=false;throw Error('lost response');}return{result:1};
    }throw Error('unexpected command');});
  }};
  const mod={exports:{}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../lib/api-handlers/admin-deposits'),'utf8'),{
    module:mod,exports:mod.exports,process:{env:{BOT_TOKEN:'test-secret'}},console,
    require:id=>id==='../redis'?redis:id==='../api-auth'?{setCors(){},parseBody:r=>r.body,authRequired:(r,b)=>b.user==='admin-a'||b.user==='admin-b'?{ok:true,memberId:b.user}:{ok:false,status:403}}:id==='../admin-menu-access-token'?tokens:id==='../admin-deposits'?require('../lib/admin-deposits'):null
  });
  async function call(body,user='admin-a',scope='deposits'){
    const res={statusCode:200,setHeader(){},status(n){this.statusCode=n;return this;},json(value){this.data=value;return this;},end(){return this;}};
    await mod.exports({method:'POST',body:{...body,user,accessToken:tokens.signAccessToken(scope,user,'test-secret')}},res);return res;
  }
  return{call,fail:()=>offline=true,lose:()=>unknown=true};
}
test('API requires admin identity and the separate deposit password token',async()=>{
  const a=apiSetup();assert.equal((await a.call({action:'list'},'player')).statusCode,403);
  assert.equal((await a.call({action:'list'},'admin-a','admin')).statusCode,403);
  assert.equal((await a.call({action:'list'})).statusCode,200);
  a.fail();assert.equal((await a.call({action:'list'})).statusCode,503);
});
test('simultaneous admins cannot overspend and successful retries are counted once',async()=>{
  const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
  const pay={action:'payment',entryId:requestId(1),amount:1000000};
  const results=await Promise.all([a.call({...pay,requestId:requestId(2)}),a.call({...pay,requestId:requestId(3)},'admin-b')]);
  assert.deepEqual(results.map(r=>r.statusCode).sort(),[200,409]);
  const state=await a.call({action:'list'});assert.equal(state.data.entries[0].paid,1000000);
  a.lose();const final={...pay,requestId:requestId(4),amount:500000};
  assert.equal((await a.call(final)).statusCode,503);
  const retry=await a.call(final);assert.equal(retry.statusCode,200);assert.equal(retry.data.entries[0].paid,1500000);
  assert.equal(retry.data.entries[0].payments.length,2);
});
test('reservations freeze shared available funds until confirmation or release',()=>{
 let state=create();const reserve={action:'reserve',requestId:requestId(10),entryId:requestId(1),amount:1000000};
 state=applyOperation(state,reserve,'admin-a').state;
 assert.equal(view(state).entries[0].available,500000);assert.equal(view(state).entries[0].remaining,1500000);assert.equal(view(state).entries[0].paid,0);
 assert.equal(applyOperation(state,reserve,'admin-a').duplicate,true);
 assert.throws(()=>applyOperation(state,{...reserve,requestId:requestId(11)},'admin-b'),/доступного/);
 assert.throws(()=>applyOperation(state,{action:'payment',requestId:requestId(12),entryId:requestId(1),amount:600000},'admin-b'),/больше/);
 assert.throws(()=>applyOperation(state,{action:'adjust',requestId:requestId(13),entryId:requestId(1),total:900000,reason:'test'},'admin-b'),/меньше/);
 const confirm={action:'confirm-reservation',requestId:requestId(14),entryId:requestId(1),reservationId:requestId(10)};
 state=applyOperation(state,confirm,'admin-b').state;
 assert.equal(view(state).entries[0].paid,1000000);assert.equal(view(state).entries[0].reserved,0);assert.equal(view(state).entries[0].available,500000);
 assert.equal(applyOperation(state,confirm,'admin-b').duplicate,true);
 assert.throws(()=>applyOperation(state,{...confirm,requestId:requestId(15)},'admin-b'),/обработан/);
 state=applyOperation(state,{...reserve,requestId:requestId(16),amount:500000},'admin-a').state;
 state=applyOperation(state,{action:'release-reservation',requestId:requestId(17),entryId:requestId(1),reservationId:requestId(16)},'admin-b').state;
 assert.equal(view(state).entries[0].available,500000);assert.equal(view(state).entries[0].paid,1000000);
});
test('API reserves atomically across administrators and confirms after lost response exactly once',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 const reserve={action:'reserve',entryId:requestId(1),amount:1000000};
 const results=await Promise.all([a.call({...reserve,requestId:requestId(20)}),a.call({...reserve,requestId:requestId(21)},'admin-b')]);
 assert.deepEqual(results.map(r=>r.statusCode).sort(),[200,409]);
 const list=await a.call({action:'list'}),r=list.data.entries[0].reservations[0];
 a.lose();const confirm={action:'confirm-reservation',requestId:requestId(22),entryId:requestId(1),reservationId:r.id};
 assert.equal((await a.call(confirm)).statusCode,503);
 const retry=await a.call(confirm);assert.equal(retry.statusCode,200);assert.equal(retry.data.entries[0].paid,1000000);assert.equal(retry.data.entries[0].payments.length,1);
});
test('cash returns reduce withdrawal balance without increasing deposit statistics; audited undo restores it',()=>{
 let state=create();const returned={action:'return',requestId:requestId(30),entryId:requestId(1),amount:400000,note:'По просьбе игрока'};
 state=applyOperation(state,returned,'admin-a',1234,'Менеджер').state;
 let data=view(state);assert.equal(data.entries[0].remaining,1100000);assert.equal(data.entries[0].available,1100000);assert.equal(data.statistics.returned,400000);assert.equal(data.statistics.deposits,0);assert.equal(data.entries[0].returns[0].createdByName,'Менеджер');
 assert.equal(applyOperation(state,returned,'admin-a').duplicate,true);
 assert.throws(()=>applyOperation(state,{...returned,requestId:requestId(31),amount:1100001},'admin-b'),/больше/);
 state=applyOperation(state,{action:'reserve',requestId:requestId(32),entryId:requestId(1),amount:1000000},'admin-b').state;
 assert.throws(()=>applyOperation(state,{...returned,requestId:requestId(33),amount:100001},'admin-a'),/больше/);
 assert.throws(()=>applyOperation(state,{action:'adjust',requestId:requestId(34),entryId:requestId(1),total:1399999,reason:'test'},'admin-a'),/меньше/);
 state=applyOperation(state,{action:'void-return',requestId:requestId(35),entryId:requestId(1),returnId:requestId(30)},'admin-b').state;
 data=view(state);assert.equal(data.statistics.returned,0);assert.equal(data.entries[0].remaining,1500000);assert.equal(data.entries[0].returns.length,1);
});
test('deposit statistics retain archived payments, exclude pending reservations and expose unconnected destinations',()=>{
 let state=create();state=applyOperation(state,{action:'payment',requestId:requestId(40),entryId:requestId(1),amount:1000000},'admin-a').state;
 state=applyOperation(state,{action:'return',requestId:requestId(41),entryId:requestId(1),amount:500000},'admin-a').state;
 state=applyOperation(state,{action:'archive',requestId:requestId(42),entryId:requestId(1)},'admin-a').state;
 const data=view(state);assert.equal(data.totals.paid,0);assert.equal(data.statistics.deposits,1000000);assert.equal(data.statistics.returned,500000);assert.equal(data.statistics.destinations[0].amount,1000000);assert.ok(data.statistics.destinations.slice(1).every(d=>d.amount===null));
});
test('API simultaneous return and reservation cannot overspend and return retries count once',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 const results=await Promise.all([a.call({action:'return',requestId:requestId(50),entryId:requestId(1),amount:1000000}),a.call({action:'reserve',requestId:requestId(51),entryId:requestId(1),amount:1000000},'admin-b')]);
 assert.deepEqual(results.map(r=>r.statusCode).sort(),[200,409]);
 const list=await a.call({action:'list'});assert.equal(list.data.entries[0].available,500000);
 a.lose();const returned={action:'return',requestId:requestId(52),entryId:requestId(1),amount:500000};
 assert.equal((await a.call(returned)).statusCode,503);const retry=await a.call(returned);assert.equal(retry.statusCode,200);assert.equal(retry.data.entries[0].available,0);
});

test('recognizes conversational withdrawal amount and inline bank recipient',()=>{
 const p=parser.parse('Здравствуйте, можно вывести 8000\n+79253239894 Тинькофф Саян Баирович');
 assert.equal(p.amount,800000);assert.equal(p.recipient,'Саян Баирович');assert.equal(p.phone,'+79253239894');assert.equal(p.bank,'Тинькофф');
 const room=parser.parse('Рум: Супрема\nID: 999123');assert.equal(room.room,'Supr');assert.equal(room.playerId,'999123');
});
test('room and player ID persist while older payout cards remain readable',()=>{
 const state=create();assert.equal(view(state).entries[0].room,'P21');assert.equal(view(state).entries[0].playerId,'123456');
 assert.throws(()=>applyOperation(null,{action:'create',requestId:requestId(60),entry:{...entry,room:'other'}},'admin-a'),/Выберите рум/);
 assert.throws(()=>applyOperation(null,{action:'create',requestId:requestId(61),entry:{...entry,playerId:''}},'admin-a'),/ID/);
 delete state.entries[0].room;delete state.entries[0].playerId;
 assert.equal(view(state).entries[0].remaining,1500000);
});
