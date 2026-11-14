'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const commandModule=require('../lib/telegram-player-deposit');
function fixture({beforeSupport=async()=>{}}={}){
 const store=new Map(),sent=[],mirrored=[],botMirrored=[],cleared=[];let seq=100,failMirror=false,redisBatches=0;
 const redis={isConfigured:()=>true,pipeline:async commands=>(redisBatches++,commands.map(([cmd,...a])=>{
  if(cmd==='GET')return {result:store.get(a[0])||null};
  if(cmd==='DEL'){store.delete(a[0]);return {result:1};}
  if(cmd==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(cmd==='EVAL'){const key=a[2];if((store.get(key)||'')!==a[3])return {result:0};if(a.length===4)store.delete(key);else store.set(key,a[4]);return {result:1};}
  throw Error(cmd);
 }))};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-group-policy'?{guardedFetch:async(url,o)=>{const body=JSON.parse(o.body);sent.push({method:url.split('/').at(-1),body,redisBatches});return {ok:true,json:async()=>({ok:true,result:{message_id:++seq}})};}}:id==='./telegram-support'?{clearAwaitingAmountNotice:async(...args)=>{await beforeSupport('clear');cleared.push(args);return true;},mirrorBotMessage:async(...args)=>{botMirrored.push(args);if(failMirror){failMirror=false;throw Error('mirror unavailable');}return true;},handle:async(...args)=>{await beforeSupport('handle');mirrored.push(args);return {handled:true};}}:id==='./telegram-deposit-withdrawals'?{STORE_KEY:'ledger'}:id==='./telegram-player-statistics'?require('../lib/telegram-player-statistics'):id==='./deposit-link-routing'?require('../lib/deposit-link-routing'):require(id),Date,AbortSignal};
 vm.runInNewContext(fs.readFileSync('lib/telegram-player-deposit.js','utf8'),ctx);
 const message=(text,message_id=1)=>({message:{text,message_id,chat:{id:777,type:'private'},from:{id:777}}});
 const handle=u=>ctx.module.exports.handle(u,'fixture-token');
 return {store,sent,mirrored,botMirrored,cleared,message,handle,failNextMirror(){failMirror=true;}};
}
test('private aliases and exact ruble amounts parse without changing group admin commands',()=>{
 for(const text of ['пополнить','пополнить 2000','депозит','ДЕПОЗИТ','/деп','деп','/деп 2000','деп 1 000','/деп@Poker_dvatuza_bot','/start deposit'])assert.equal(commandModule.command({message:{chat:{type:'private'},text}}),true);
 for(const text of ['/деп@other_bot','депрессия','депозиты'])assert.equal(commandModule.command({message:{chat:{type:'private'},text}}),false);
 assert.equal(commandModule.command({message:{chat:{type:'supergroup'},text:'/деп'}}),false);
 assert.equal(commandModule.amount('2 000 ₽'),200000);assert.equal(commandModule.amount('1000,50'),100050);
 for(const value of ['-1000','1e3','<script>','1000.999'])assert.equal(commandModule.amount(value),null);
});
test('bare command asks next amount; amount response issues a gross/credit link once with no income',async()=>{
 const f=fixture();await f.handle(f.message('/деп'));assert.match(f.sent[0].body.text,/На какую сумму/);assert.equal(f.botMirrored.length,1);assert.equal(f.botMirrored[0][1],777);assert.equal(f.botMirrored[0][4].awaitingAmount,true);assert.ok(f.store.has('poker_app:player-deposit:v1:waiting:777'));
 const otherForm=f.message('2000',9);otherForm.message.reply_to_message={message_id:999};assert.equal(await f.handle(otherForm),false);
 await f.handle(f.message('2000',2));const payment=f.sent.find(x=>x.body.reply_markup?.inline_keyboard);assert.match(payment.body.text,/2[\s\u00a0]000/);assert.match(payment.body.text,/2[\s\u00a0]180/);assert.match(payment.body.reply_markup.inline_keyboard[0][0].url,/^https:\/\//);
 const count=f.sent.length;await f.handle(f.message('2000',2));assert.equal(f.sent.length,count);
 assert.equal(f.cleared[0][1],777);const state=JSON.parse(f.store.get('ledger'));assert.equal(state.paymentLinkIssues.length,1);assert.equal(f.botMirrored.at(-1)[4].paymentLink.providerId,'prodamus');assert.equal(f.botMirrored.at(-1)[4].paymentLink.amount,200000);assert.equal(state.channelOperations,undefined);assert.equal(f.mirrored[0][2].includePrivateCommands,true);
});
test('direct amount and pulse button share flow; cancellation and unrelated commands stay safe',async()=>{
 const f=fixture();await f.handle(f.message('деп 1000'));assert.equal(f.sent.length,1);await f.handle(f.message('деп 1000'));assert.equal(f.sent.length,1);
 await f.handle({callback_query:{id:'button-1',data:'club:player-deposit',from:{id:777},message:{message_id:4,chat:{id:777,type:'private'}}}});
 assert.match(f.sent.at(-1).body.text,/На какую сумму/);
 assert.equal(await f.handle(f.message('/tables',5)),false);
 assert.equal(await f.handle(f.message('/отмена',6)),true);assert.match(f.sent.at(-1).body.text,/отменён/);
});
test('unconfigured amounts go to manager without invented prices; group clicks never post in group',async()=>{
 const f=fixture();await f.handle(f.message('/деп 5000'));assert.match(f.sent.at(-1).body.text,/Ожидайте, ищем реквизиты на/);assert.equal(f.store.has('ledger'),false);assert.equal(f.mirrored.length,1);
 const g=f.message('/деп');g.message.chat={id:-1001,type:'supergroup'};assert.equal(await f.handle(g),false);
 await f.handle({callback_query:{id:'group-button',data:'club:player-deposit',from:{id:777},message:{message_id:5,chat:{id:-1001,type:'supergroup'}}}});
 assert.equal(f.sent.at(-1).method,'answerCallbackQuery');assert.ok(!f.sent.some(c=>c.body.chat_id<0));
});

test('minimum deposit is 1000; low amounts do not issue links or notify managers',async()=>{
 for(const sum of [0,500,999]){const f=fixture();await f.handle(f.message('деп '+sum));assert.match(f.sent.at(-1).body.text,/Напишите сумму от 1000, например 3000/);assert.equal(f.store.has('ledger'),false);assert.equal(f.mirrored.length,0);await f.handle(f.message('1000',2));assert.ok(f.store.has('ledger'));}
});
test('3000 asks customer to wait for requisites with the exact requested amount',async()=>{
 const f=fixture();await f.handle(f.message('деп 3000'));assert.match(f.sent.at(-1).body.text,/Ожидайте, ищем реквизиты на 3[\s\u00a0]000 ₽/);assert.equal(f.store.has('ledger'),false);assert.equal(f.mirrored.length,1);
});

test('requisites waiting begins at 3000 inclusive; unsupported smaller amounts ask for a valid choice',async()=>{
 for(const sum of [3000,5000,10000]){const f=fixture();await f.handle(f.message('деп '+sum));assert.match(f.sent.at(-1).body.text,/Ожидайте, ищем реквизиты/);assert.equal(f.mirrored.length,1);}
 const f=fixture();await f.handle(f.message('деп 2500'));assert.doesNotMatch(f.sent.at(-1).body.text,/Ожидайте/);assert.match(f.sent.at(-1).body.text,/ближайшую сумму/);assert.equal(f.mirrored.length,1);assert.equal(f.store.has('ledger'),false);
});

function choose(f,value,id='choice-1',promptId){
 const waiting=JSON.parse(f.store.get('poker_app:player-deposit:v1:waiting:777')||'null');
 return {callback_query:{id,data:'club:player-deposit:amount:'+value,from:{id:777},message:{message_id:promptId||waiting?.promptMessageId||999,chat:{id:777,type:'private'}}}};
}
test('intermediate amounts offer only the closest lower and upper amounts',async()=>{
 for(const [sum,options] of [[1200,[100000,150000]],[1700,[150000,200000]],[2500,[200000,300000]],[1000.01,[100000,150000]]]){
  const f=fixture();await f.handle(f.message('деп '+sum));
  const buttons=f.sent.at(-1).body.reply_markup.inline_keyboard[0];
  assert.deepEqual(buttons.map(b=>Number(b.callback_data.split(':').at(-1))),options);assert.equal(f.store.has('ledger'),false);
 }
});
test('chosen neighbor issues the pinned provider link; choosing 3000 requests requisites',async()=>{
 for(const [sum,selected,provider] of [[1200,150000,'robokassa'],[1700,200000,'prodamus']]){
  const f=fixture();await f.handle(f.message('деп '+sum));const update=choose(f,selected);await f.handle(update);
  const state=JSON.parse(f.store.get('ledger'));assert.equal(state.paymentLinkIssues[0].link.amount,selected);assert.equal(state.paymentLinkIssues[0].link.providerId,provider);
  await f.handle(update);assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,1);
 }
 const f=fixture();await f.handle(f.message('деп 2500'));await f.handle(choose(f,300000));assert.match(f.sent.at(-1).body.text,/Ожидайте, ищем реквизиты/);assert.equal(f.store.has('ledger'),false);
});
test('selection must belong to the active prompt and offered amounts',async()=>{
 const f=fixture();await f.handle(f.message('деп 1200'));await f.handle(choose(f,200000));
 assert.equal(f.sent.at(-1).method,'answerCallbackQuery');assert.equal(f.store.has('ledger'),false);
 await f.handle(choose(f,100000,'wrong-prompt',999));assert.equal(f.store.has('ledger'),false);
 const waiting=JSON.parse(f.store.get('poker_app:player-deposit:v1:waiting:777'));waiting.expiresAt=0;f.store.set('poker_app:player-deposit:v1:waiting:777',JSON.stringify(waiting));
 await f.handle(choose(f,100000,'expired'));assert.equal(f.store.has('ledger'),false);
});

test('manager notice retries do not resend the payment link to the player',async()=>{
 const f=fixture();f.failNextMirror();const update=f.message('/dep 1000');
 await assert.rejects(f.handle(update));assert.equal(f.sent.length,1);
 await f.handle(update);assert.equal(f.sent.length,1);assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,1);
});


test('ready link reaches player before stalled manager synchronization for every pinned amount',async()=>{
 for(const sum of [1000,1500,2000]){
  let release,started;
  const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
  const f=fixture({beforeSupport:async()=>{started();await gate;}});
  const handling=f.handle(f.message('деп '+sum));
  await entered;
  try {
   assert.equal(f.sent.length,1);
   assert.ok(f.sent[0].body.reply_markup.inline_keyboard[0][0].url);
   assert.ok([...f.store.keys()].some(key=>key.endsWith(':payment-reply')),'reply persisted before support');
  } finally {release();await handling;}
  assert.equal(f.mirrored.length,1);assert.equal(f.botMirrored.length,1);
 }
});
test('failed manager preparation retries after player reply without duplicate link or ledger issuance',async()=>{
 for(const stage of ['clear','handle']){
  let fail=true;
  const f=fixture({beforeSupport:async name=>{if(fail&&name===stage){fail=false;throw Error('support unavailable');}}});
  const update=f.message('деп 1000');
  await assert.rejects(f.handle(update),/support unavailable/);
  assert.equal(f.sent.length,1,'player already has link when manager preparation fails');
  await f.handle(update);await f.handle(update);
  assert.equal(f.sent.length,1);assert.equal(f.botMirrored.length,1);
  assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,1);
 }
});
test('button-selected link retries failed manager notice without duplicating player payment reply',async()=>{
 const f=fixture();await f.handle(f.message('деп 1200'));const update=choose(f,150000);
 f.failNextMirror();await assert.rejects(f.handle(update));
 const count=()=>f.sent.filter(row=>row.body.reply_markup?.inline_keyboard?.[0]?.[0]?.url).length;
 assert.equal(count(),1);await f.handle(update);assert.equal(count(),1);
 assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,1);
});

test('bare deposit question reaches player before stalled support and remains usable',async()=>{
 let release,started;
 const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
 const f=fixture({beforeSupport:async()=>{started();await gate;}});
 const handling=f.handle(f.message('деп'));
 await entered;
 try {
  assert.equal(f.sent.length,1);assert.match(f.sent[0].body.text,/На какую сумму/);
  const waiting=JSON.parse(f.store.get('poker_app:player-deposit:v1:waiting:777'));
  assert.equal(waiting.promptMessageId,101);
 } finally {release();await handling;}
 assert.equal(f.botMirrored.length,1);assert.equal(f.botMirrored[0][4].awaitingAmount,true);
});
test('bare question retries support failure without sending the question twice',async()=>{
 let fail=true;
 const f=fixture({beforeSupport:async()=>{if(fail){fail=false;throw Error('support unavailable');}}});
 const update=f.message('деп');
 await assert.rejects(f.handle(update),/support unavailable/);
 assert.equal(f.sent.length,1);await f.handle(update);await f.handle(update);
 assert.equal(f.sent.length,1);assert.equal(f.botMirrored.length,1);
 await f.handle(f.message('1000',2));
 assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,1);
});

test('all other deposit replies precede slow manager work',async()=>{
 for(const text of ['5000','2500','500','/отмена']){
  let blocked=false,release,started;
  const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
  const f=fixture({beforeSupport:async()=>{if(blocked){started();await gate;}}});
  await f.handle(f.message('деп'));blocked=true;
  const handling=f.handle(f.message(text,2));await entered;
  try {assert.equal(f.sent.length,2,'player reply sent before support for '+text);}
  finally {release();await handling;}
 }
});
test('numeric requisites request survives support failure without duplicate reply',async()=>{
 let fail=false;
 const f=fixture({beforeSupport:async()=>{if(fail){fail=false;throw Error('support unavailable');}}});
 await f.handle(f.message('деп'));fail=true;
 const update=f.message('5000',2);
 await assert.rejects(f.handle(update),/support unavailable/);
 assert.match(f.sent.at(-1).body.text,/Ожидайте, ищем реквизиты/);
 assert.equal(f.store.has('poker_app:player-deposit:v1:waiting:777'),true);
 assert.ok(f.store.has('poker_app:player-deposit:v1:done:777:message_2:support'));
 await f.handle(update);
 assert.equal(f.sent.length,2);
 assert.equal(f.store.has('poker_app:player-deposit:v1:waiting:777'),true);
 assert.equal(f.mirrored.length,2);
});

test('every next deposit operation replies while the previous command is still synchronizing support',async()=>{
 for(const text of ['деп 1000','деп 1500','деп 2000','деп 5000','2000','5000','2500','500','/отмена','деп']){
  let release,started,first=true;
  const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
  const f=fixture({beforeSupport:async()=>{if(first){first=false;started();await gate;}}});
  const previous=f.handle(f.message('деп'));await entered;
  try {
   await f.handle(f.message(text,2));
   assert.equal(f.sent.length,2,'next reply independent of previous support: '+text);
   assert.equal(f.store.has('poker_app:player-deposit:v1:lock:777'),false);
  } finally {release();await previous;}
 }
});
test('button choices also reply while earlier support synchronization is blocked',async()=>{
 let release,started,first=true;
 const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
 const f=fixture({beforeSupport:async()=>{if(first){first=false;started();await gate;}}});
 const previous=f.handle(f.message('деп 2500'));await entered;
 try {await f.handle(choose(f,200000));assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues[0].link.amount,200000);}
 finally {release();await previous;}
});
test('retrying old support work preserves a newer amount prompt and contains no bot token',async()=>{
 let fail=true;
 const f=fixture({beforeSupport:async()=>{if(fail){fail=false;throw Error('support unavailable');}}});
 const old=f.message('деп');await assert.rejects(f.handle(old));
 const journal=f.store.get('poker_app:player-deposit:v1:done:777:message_1:support');
 assert.ok(journal);assert.equal(journal.includes('fixture-token'),false);
 await f.handle(f.message('деп',2));
 const waiting=f.store.get('poker_app:player-deposit:v1:waiting:777');
 await f.handle(old);assert.equal(f.store.get('poker_app:player-deposit:v1:waiting:777'),waiting);
 assert.equal(f.sent.length,2);
});
test('retries serialize the same event and resume only unfinished manager steps',async()=>{
 let release,started,first=true;
 const gate=new Promise(resolve=>{release=resolve;}),entered=new Promise(resolve=>{started=resolve;});
 const f=fixture({beforeSupport:async()=>{if(first){first=false;started();await gate;}}});
 const update=f.message('деп 2000'),pending=f.handle(update);await entered;
 try {await assert.rejects(f.handle(update),/event busy/);assert.equal(f.sent.length,1);}
 finally {release();await pending;}
 const g=fixture();g.failNextMirror();const second=g.message('деп 2000');
 await assert.rejects(g.handle(second));assert.equal(g.cleared.length,1);assert.equal(g.mirrored.length,1);
 await g.handle(second);assert.equal(g.cleared.length,1);assert.equal(g.mirrored.length,1);assert.equal(g.sent.length,1);
});

test('plain statistics alias does not consume a pending deposit amount prompt',async()=>{
 const f=fixture();await f.handle(f.message('пополнить'));const key='poker_app:player-deposit:v1:waiting:777',before=f.store.get(key);
 for(const word of ['stat','stats','/stat','Статистика'])assert.equal(await f.handle(f.message(word,2)),false);
 assert.equal(f.store.get(key),before);assert.match(f.sent[0].body.text,/На какую сумму/);
});

test('requisites acknowledgement needs only three Redis round trips before replying',async()=>{
 for(const text of ['пополнить 3000','депозит 5000']){
  const f=fixture();await f.handle(f.message(text));
  assert.match(f.sent[0].body.text,/Ожидайте, ищем реквизиты/);
  assert.equal(f.sent[0].redisBatches,3);
  const count=f.sent.length;await f.handle(f.message(text));assert.equal(f.sent.length,count);
 }
 const f=fixture();await f.handle(f.message('/dep'));
 // A numeric reply also validates the current prompt in the user-lock batch.
 await f.handle(f.message('3000',2));assert.match(f.sent.at(-1).body.text,/Ожидайте/);
});

test('requisites message lets the player change the amount with a plain number',async()=>{
 const f=fixture();await f.handle(f.message('пополнить 3000'));
 assert.match(f.sent.at(-1).body.text,/Если решили изменить сумму, просто напишите какую/);
 await f.handle(f.message('5000',2));assert.match(f.sent.at(-1).body.text,/5[\s\u00a0]000 ₽/);
 await f.handle(f.message('2000',3));assert.ok(f.sent.at(-1).body.reply_markup.inline_keyboard[0][0].url);
 assert.equal(f.store.has('poker_app:player-deposit:v1:waiting:777'),true);
});

test('payment link supports a new amount and plain Отмена without duplicate issuance',async()=>{
 const f=fixture();await f.handle(f.message('деп 1000'));
 assert.match(f.sent.at(-1).body.text,/После оплаты напишите ваш ID и ID клуба\./);
 assert.match(f.sent.at(-1).body.text,/Чтобы пополнить другую сумму/);
 await f.handle(f.message('1500',2));
 assert.equal(JSON.parse(f.store.get('ledger')).paymentLinkIssues.length,2);
 await f.handle(f.message('Отмена',3));assert.match(f.sent.at(-1).body.text,/Запрос пополнения отменён/);
 assert.equal(f.store.has('poker_app:player-deposit:v1:waiting:777'),false);
 assert.equal(await f.handle(f.message('2000',4)),false);
});

test('payment link below 3000 highlights the commission-free threshold',async()=>{
 for(const amount of [1000,1500,2000]){
  const f=fixture();await f.handle(f.message('деп '+amount));const body=f.sent[0].body;
  const bold=body.entities.find(e=>e.type==='bold');
  assert.equal(body.text.slice(bold.offset,bold.offset+bold.length),'✨ Чтобы пополнять без комиссии, пополняйте от 3000 и выше.');
 }
 const f=fixture();await f.handle(f.message('деп 3000'));assert.doesNotMatch(f.sent[0].body.text,/без комиссии/);
});
