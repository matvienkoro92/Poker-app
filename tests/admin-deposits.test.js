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
    require:id=>id==='../redis'?redis:id==='../api-auth'?{setCors(){},parseBody:r=>r.body,authRequired:(r,b)=>b.user==='admin-a'||b.user==='admin-b'||b.user==='388008256'||b.user==='5053253480'?{ok:true,memberId:b.user}:{ok:false,status:403}}:id==='../admin-menu-access-token'?tokens:id==='../admin-deposits'?require('../lib/admin-deposits'):null
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
 const data=view(state);assert.equal(data.totals.paid,0);assert.equal(data.statistics.deposits,1000000);assert.equal(data.statistics.returned,500000);assert.equal(data.statistics.destinations[0].amount,1000000);assert.ok(data.statistics.destinations.filter(d=>['payment-links','all-friends'].includes(d.id)).every(d=>d.amount===null));
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
test('manager statistics attribute reserved deposits to the taker, track returns separately and reconcile with totals',()=>{
 let state=create();const id=requestId(1);
 state=applyOperation(state,{action:'reserve',requestId:requestId(70),entryId:id,amount:500000},'taker',1000,'Первый менеджер').state;
 state=applyOperation(state,{action:'confirm-reservation',requestId:requestId(71),entryId:id,reservationId:requestId(70)},'confirmer',2000,'Подтверждающий').state;
 state=applyOperation(state,{action:'return',requestId:requestId(72),entryId:id,amount:200000},'second',3000,'Второй менеджер').state;
 state=applyOperation(state,{action:'reserve',requestId:requestId(73),entryId:id,amount:100000},'second',4000,'Второй менеджер').state;
 let stats=view(state).statistics;assert.equal(stats.managers.length,2);
 const first=stats.managers.find(m=>m.id==='taker'),second=stats.managers.find(m=>m.id==='second');
 assert.equal(first.deposits,500000);assert.equal(first.destinations[0].amount,500000);assert.equal(second.deposits,0);assert.equal(second.returned,200000);assert.equal(second.reserved,100000);
 assert.equal(stats.managers.reduce((s,m)=>s+m.deposits,0),stats.deposits);assert.equal(stats.managers.reduce((s,m)=>s+m.returned,0),stats.returned);
 state=applyOperation(state,{action:'void',requestId:requestId(74),entryId:id,paymentId:requestId(71)},'confirmer').state;
 stats=view(state).statistics;assert.equal(stats.deposits,0);assert.equal(stats.managers.some(m=>m.id==='taker'),false);
});

test('depositor ID survives reservation confirmation and API retry',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 const reserve={action:'reserve',requestId:requestId(80),entryId:requestId(1),amount:100000,depositorId:'9007199254740993123'};
 const saved=await a.call(reserve);assert.equal(saved.data.entries[0].reservations[0].depositorId,reserve.depositorId);
 const confirmed=await a.call({action:'confirm-reservation',requestId:requestId(81),entryId:requestId(1),reservationId:requestId(80)});
 assert.equal(confirmed.data.entries[0].payments[0].depositorId,reserve.depositorId);
 assert.equal((await a.call({...reserve,requestId:requestId(82),depositorId:'<invalid>'})).statusCode,400);
});

test('USDT withdrawal recognizes thousands, preceding ID and wallet and saves without bank details',()=>{
 const raw='Вывод 15к\nС покер 21\n655861 айди\nUSDT\nTSaMfZDt41PKCjk5oxcNWBdCXZH8V8HDRe\nTron TRC20';
 const p=parser.parse(raw);assert.equal(p.amount,1500000);assert.equal(p.playerId,'655861');assert.equal(p.room,'P21');assert.equal(p.paymentType,'usdt');assert.equal(p.network,'TRC20');assert.equal(p.wallet,'TSaMfZDt41PKCjk5oxcNWBdCXZH8V8HDRe');assert.deepEqual(p.warnings,[]);
 const create={action:'create',requestId:requestId(90),entry:{...p,total:p.amount}};
 const state=applyOperation(null,create,'admin-a').state;assert.equal(state.entries[0].wallet,p.wallet);assert.equal(state.entries[0].recipient,'ID 655861');assert.equal(view(state).entries[0].remaining,1500000);
 assert.throws(()=>applyOperation(state,{...create,requestId:requestId(91)},'admin-b'),/уже есть/);
 assert.throws(()=>applyOperation(null,{...create,entry:{...create.entry,wallet:'bad-address'}},'admin-a'),/кошелёк/);
 assert.equal(parser.money('15к'),1500000);assert.equal(parser.money('1,5k'),150000);
 assert.equal(parser.parse('айди\nUSDT').playerId,'');
});

test('club IDs identify four rooms without replacing the player ID',()=>{
 for(const [club,room] of Object.entries({'758417':'P21','1786376':'X','19645':'Supr','1004444':'PP'})){
  const p=parser.parse('айди клуба '+club+'\n655861 айди\nВывод 15к');assert.equal(p.room,room);assert.equal(p.playerId,'655861');assert.equal(p.amount,1500000);
  assert.equal(parser.parse('ID клуба: '+club).playerId,'');assert.equal(parser.parse(club).room,room);
 }
 assert.equal(parser.parse('Хпокер\nID: 123456').room,'X');
 assert.equal(parser.parse('ППпокер').room,'PP');
 const conflict=parser.parse('Хпокер\nайди клуба 19645');assert.equal(conflict.room,'');assert.ok(conflict.warnings.some(w=>w.includes('не совпадают')));
});
test('recognizes compact rouble suffix after phone without consuming phone digits',()=>{
 const p=parser.parse('Айди клуба 758417 мой айди 603371 банк газпромбанк 89834425169  3000р');
 assert.equal(p.amount,300000);assert.equal(p.room,'P21');assert.equal(p.playerId,'603371');assert.equal(p.bank,'газпромбанк');assert.equal(p.phone,'+79834425169');
 assert.equal(parser.parse('+79991234567 3000р').amount,300000);
 assert.equal(parser.parse('3000р.').amount,300000);
 assert.equal(parser.parse('3000реквизит').amount,null);
});

test('single recipient name after inline phone is recognized without taking the greeting',()=>{
 const p=parser.parse('Добрый день вывод 4000руб id 347414 Тинькофф +79213169590 Вадим');
 assert.equal(p.recipient,'Вадим');assert.equal(p.amount,400000);assert.equal(p.playerId,'347414');assert.equal(p.phone,'+79213169590');
 assert.equal(parser.parse('Добрый день вывод 4000руб id 347414 Тинькофф +79213169590').recipient,'');
 assert.equal(parser.parse('Здравствуйте, можно вывести 8000\n+79253239894 Тинькофф Саян Баирович').recipient,'Саян Баирович');
});

test('unlabelled leading amount is distinct from club, player and phone numbers',()=>{
 const p=parser.parse('4000, клуб 758417, мой 892420, банк Инго, 89233283889');
 assert.equal(p.amount,400000);assert.equal(p.playerId,'892420');assert.equal(p.room,'P21');assert.equal(p.bank,'Инго');assert.equal(p.phone,'+79233283889');
 assert.equal(parser.parse('758417, клуб 758417').amount,null);
 assert.equal(parser.parse('89233283889, банк Инго').amount,null);
});

test('bare player ID and phone stay separate instead of forming a bank card',()=>{
 const p=parser.parse('Можно плиз вывести 3к\n642453 89600989957 только юмани');
 assert.equal(p.amount,300000);assert.equal(p.playerId,'642453');assert.equal(p.phone,'+79600989957');assert.equal(p.card,'');assert.equal(p.bank,'юмани');
 assert.equal(parser.parse('2202 2002 1234 5678').card,'2202200212345678');
 assert.equal(parser.parse('2202200212345678').card,'2202200212345678');
});

test('polite imperative withdrawal request separates amount, card and player ID',()=>{
 const p=parser.parse('Выведите пожалуйста 3500 на 2204 1801 2754 7347 id 253005Ъ');
 assert.equal(p.amount,350000);assert.equal(p.card,'2204180127547347');assert.equal(p.playerId,'253005');
 assert.equal(parser.parse('Выведите, пожалуйста, 3500 на карту').amount,350000);
});

test('known standalone club IDs separate adjacent amount and player ID before card detection',()=>{
 for(const [club,room] of Object.entries({'758417':'P21','1786376':'X','19645':'Supr','1004444':'PP'})){
  const p=parser.parse('Вывод 11000 '+club+' 415678 переводить на сбер 89001848485');
  assert.equal(p.amount,1100000);assert.equal(p.room,room);assert.equal(p.playerId,'415678');assert.equal(p.phone,'+79001848485');assert.equal(p.card,'');
 }
 assert.equal(parser.parse('ID 17584172').room,'');
 assert.equal(parser.parse('Вывод 3500 на 2204 1801 2754 7347 id 253005').card,'2204180127547347');
});

test('sentence context recognizes alternative banks and a local ten-digit mobile number',()=>{
 const p=parser.parse('Вывод нужен 16к на сбер и т банк 9091849816, спасибо');
 assert.equal(p.amount,1600000);assert.equal(p.phone,'+79091849816');assert.equal(p.card,'');assert.equal(p.bank,'сбер / т банк');
 assert.equal(parser.parse('Вывод 16к ID 9091849816').phone,'');
 assert.equal(parser.parse('Вывод 16к на сбер 9091849816').phone,'+79091849816');
});

test('bare six-digit player ID before club is distinct from usual withdrawal amounts',()=>{
 const p=parser.parse('4000, 676837, 758417 ОЗОН БАНК 89831399622');
 assert.equal(p.amount,400000);assert.equal(p.playerId,'676837');assert.equal(p.room,'P21');assert.equal(p.phone,'+79831399622');assert.equal(p.card,'');assert.equal(p.bank,'ОЗОН БАНК');
 for(const amount of ['4000','50000','100000']){const parsed=parser.parse(amount+', 676837, 758417 ОЗОН БАНК 89831399622');assert.equal(parsed.amount,Number(amount)*100);assert.equal(parsed.playerId,'676837');}
 assert.equal(parser.parse('4000, 758417 ОЗОН БАНК 89831399622').playerId,'');
});

test('polite withdrawal with from-ID and recipient initial recognizes all fields',()=>{
 const p=parser.parse('Ясно извините!выведите пожалуйста 6000 с 778130 на +79967261926 Т банк Мария К.');
 assert.equal(p.amount,600000);assert.equal(p.playerId,'778130');assert.equal(p.recipient,'Мария К.');assert.equal(p.phone,'+79967261926');assert.equal(p.bank,'Т банк');assert.equal(p.card,'');
});

test('deposit destination room is separate from withdrawal room and survives confirmation',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 const reserve={action:'reserve',requestId:requestId(95),entryId:requestId(1),amount:100000,depositorId:'456789',depositorRoom:'X'};
 const saved=await a.call(reserve);assert.equal(saved.statusCode,200);assert.equal(saved.data.entries[0].reservations[0].depositorRoom,'X');assert.equal(saved.data.entries[0].room,'P21');
 const confirmed=await a.call({action:'confirm-reservation',requestId:requestId(96),entryId:requestId(1),reservationId:requestId(95)});assert.equal(confirmed.data.entries[0].payments[0].depositorRoom,'X');
 assert.equal((await a.call({...reserve,requestId:requestId(97),depositorRoom:'bad'})).statusCode,400);
 assert.equal((await a.call({...reserve,requestId:requestId(98),depositorId:''})).statusCode,400);
});

test('only owner can delete a payout; removed rows and statistics disappear while audit survives',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 const operation={action:'delete',requestId:requestId(100),entryId:requestId(1)};
 assert.equal((await a.call(operation,'admin-b')).statusCode,403);
 assert.equal((await a.call({action:'list'},'admin-b')).data.permissions.canDelete,false);
 const deleted=await a.call(operation,'388008256');assert.equal(deleted.statusCode,200);assert.equal(deleted.data.entries.length,0);assert.equal(deleted.data.totals.total,0);
 assert.equal((await a.call(operation,'388008256')).statusCode,200);
 let state=create();assert.throws(()=>applyOperation(state,operation,'admin-a'),/главному/);
 state=applyOperation(state,operation,'388008256',12345,'Владелец',{canDelete:true}).state;
 assert.equal(state.entries[0].deletedBy,'388008256');assert.equal(state.entries[0].deletedAt,12345);
 assert.throws(()=>applyOperation(state,{action:'reserve',requestId:requestId(101),entryId:requestId(1),amount:100},'admin-a'),/удалён/);
 assert.equal(applyOperation(state,{action:'create',requestId:requestId(102),entry},'admin-a').state.entries.length,2);
});

test('second verified owner account receives deletion permission, managers do not',async()=>{
 const a=apiSetup();await a.call({action:'create',requestId:requestId(1),entry});
 assert.equal((await a.call({action:'list'},'5053253480')).data.permissions.canDelete,true);
 assert.equal((await a.call({action:'list'},'admin-b')).data.permissions.canDelete,false);
 assert.equal((await a.call({action:'delete',requestId:requestId(110),entryId:requestId(1)},'5053253480')).statusCode,200);
});

test('manual channels keep income and outgoing with room, player and manager and audited cancellation',()=>{
 let state=create();const op={action:'channel-operation',requestId:requestId(120),channelId:'runex',direction:'income',amount:400000,room:'X',playerId:'123456'};
 const now=Date.parse('2026-10-18T08:00:00+07:00');state=applyOperation(state,op,'admin-a',now,'Аня').state;
 state=applyOperation(state,{...op,requestId:requestId(121),direction:'outgoing',amount:100000},'admin-b',now,'Вика').state;
 let data=view(state,now);assert.equal(data.channelOperations.length,2);assert.equal(data.statistics.deposits,400000);assert.equal(data.statistics.outgoing,100000);assert.equal(data.paymentForms.providers.find(p=>p.id==='runex').total,400000);assert.equal(data.paymentForms.providers.find(p=>p.id==='runex').outgoing,100000);
 assert.equal(data.statistics.managers.find(m=>m.id==='admin-a').deposits,400000);assert.equal(data.statistics.managers.find(m=>m.id==='admin-b').outgoing,100000);
 assert.equal(applyOperation(state,op,'admin-a').duplicate,true);
 assert.throws(()=>applyOperation(state,{...op,requestId:requestId(122),room:''},'admin-a'),/рум/);
 assert.throws(()=>applyOperation(state,{...op,requestId:requestId(122),channelId:'bad'},'admin-a'),/направление/);
 state=applyOperation(state,{action:'void-channel-operation',requestId:requestId(123),operationId:requestId(120)},'admin-a',now).state;
 data=view(state,now);assert.equal(data.statistics.deposits,0);assert.equal(data.channelOperations.length,2);assert.equal(data.paymentForms.providers.find(p=>p.id==='runex').total,0);
});
test('manual channel API retries after lost response keep one entry',async()=>{
 const a=apiSetup(),op={action:'channel-operation',requestId:requestId(125),channelId:'exchip',direction:'outgoing',amount:100000,room:'PP',playerId:'789123'};
 a.lose();assert.equal((await a.call(op)).statusCode,503);const retry=await a.call(op);assert.equal(retry.statusCode,200);assert.equal(retry.data.channelOperations.length,1);assert.equal(retry.data.channelOperations[0].playerId,'789123');
 assert.equal((await a.call({...op,requestId:requestId(126),playerId:''})).statusCode,400);
});

test('transfer saves both room accounts atomically, retries once and cancels both sides',()=>{
 const body={action:'transfer',requestId:requestId(700),fromRoom:'P21',fromPlayerId:'123',toRoom:'X',toPlayerId:'456',amount:125050,note:'Между румами'};
 const now=Date.now();const state=applyOperation(null,body,'admin-a',now).state;
 assert.equal(state.channelOperations.length,2);
 assert.deepEqual(state.channelOperations.map(r=>[r.room,r.playerId,r.direction,r.amount]),[['P21','123','outgoing',125050],['X','456','income',125050]]);
 assert.equal(applyOperation(state,body,'admin-a',now).state.channelOperations.length,2);
 const result=view(state,now),channel=result.paymentForms.providers.find(p=>p.id==='transfer');
 assert.equal(channel.total,125050);assert.equal(channel.outgoing,125050);
 assert.equal(result.statistics.deposits,0);assert.equal(result.statistics.outgoing,0);
 const cancelled=applyOperation(state,{action:'void-channel-operation',operationId:state.channelOperations[0].id,requestId:requestId(701)},'admin-a',now+1).state;
 assert.ok(cancelled.channelOperations.every(r=>r.voidedAt));
 assert.equal(view(cancelled,now+1).paymentForms.providers.find(p=>p.id==='transfer').total,0);
 assert.throws(()=>applyOperation(null,{...body,toRoom:'P21',toPlayerId:'123'},'admin-a'),/должны отличаться/);
 assert.throws(()=>applyOperation(null,{...body,toRoom:''},'admin-a'),/рум/);
 assert.throws(()=>applyOperation(null,{...body,toPlayerId:''},'admin-a'),/ID/);
});
