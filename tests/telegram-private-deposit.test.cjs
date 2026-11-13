'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const commandModule=require('../lib/telegram-private-deposit');
function fixture(){
 const store=new Map(),sent=[],mirrored=[],botMirrored=[],cleared=[];let seq=100,failMirror=false;
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([cmd,...a])=>{
  if(cmd==='GET')return {result:store.get(a[0])||null};
  if(cmd==='DEL'){store.delete(a[0]);return {result:1};}
  if(cmd==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(cmd==='EVAL'){const key=a[2];if((store.get(key)||'')!==a[3])return {result:0};if(a.length===4)store.delete(key);else store.set(key,a[4]);return {result:1};}
  throw Error(cmd);
 })};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-group-policy'?{guardedFetch:async(url,o)=>{const body=JSON.parse(o.body);sent.push({method:url.split('/').at(-1),body});return {ok:true,json:async()=>({ok:true,result:{message_id:++seq}})};}}:id==='./telegram-support'?{clearAwaitingAmountNotice:async(...args)=>{cleared.push(args);return true;},mirrorBotMessage:async(...args)=>{botMirrored.push(args);if(failMirror){failMirror=false;throw Error('mirror unavailable');}return true;},handle:async(...args)=>{mirrored.push(args);return {handled:true};}}:id==='./telegram-deposit-withdrawals'?{STORE_KEY:'ledger'}:id==='./deposit-link-routing'?require('../lib/deposit-link-routing'):require(id),Date,AbortSignal};
 vm.runInNewContext(fs.readFileSync('lib/telegram-private-deposit.js','utf8'),ctx);
 const message=(text,message_id=1)=>({message:{text,message_id,chat:{id:777,type:'private'},from:{id:777}}});
 const handle=u=>ctx.module.exports.handle(u,'fixture-token');
 return {store,sent,mirrored,botMirrored,cleared,message,handle,failNextMirror(){failMirror=true;}};
}

test('private /dep asks amount, returns a payment link and deduplicates retries',async()=>{
 const f=fixture();await f.handle(f.message('/dep'));assert.match(f.sent[0].body.text,/На какую сумму/);
 await f.handle(f.message('2000',2));const payment=f.sent.find(x=>x.body.reply_markup?.inline_keyboard);assert.ok(payment);assert.match(payment.body.text,/К оплате/);assert.match(payment.body.reply_markup.inline_keyboard[0][0].url,/^https:/);
 const count=f.sent.length;await f.handle(f.message('2000',2));assert.equal(f.sent.length,count);
});
test('private /dep does not answer or issue links in groups',async()=>{
 const f=fixture(),u=f.message('/dep');u.message.chat.type='supergroup';u.message.chat.id=-100123;assert.equal(await f.handle(u),false);assert.equal(f.sent.length,0);assert.equal(f.store.size,0);
});
test('private deposit validates minimum amount and hands larger requests to existing manager flow',async()=>{
 const f=fixture();await f.handle(f.message('/dep 100'));assert.match(f.sent.at(-1).body.text,/от 1000/);
 await f.handle(f.message('/dep 3000',2));assert.match(f.sent.at(-1).body.text,/ищем реквизиты/);assert.equal(f.sent.filter(x=>x.body.reply_markup?.inline_keyboard).length,0);
});
