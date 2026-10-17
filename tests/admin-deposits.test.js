'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'), vm=require('node:vm');
const parser=require('../app-admin-deposits-parser');
const {applyOperation,view}=require('../lib/admin-deposits');
const tokens=require('../lib/admin-menu-access-token');
const entry={recipient:'Иван Петров',bank:'Сбербанк',phone:'+79991234567',total:1500000};
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
