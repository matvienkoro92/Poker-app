'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
const service=require('../lib/telegram-support-transfer');
function fixture(){
 const path=require.resolve('../lib/telegram-support-transfer'),local=createRequire(path),module={exports:{}},store=new Map(),calls=[];
 let collision=true,player={accountId:'ID000123',name:'Игрок',poker21Id:'421508',xpokerIds:['2335996']};
 const initial={revision:0,entries:[],requests:[],playerAccounts:[{room:'X',playerId:'2335996',profileKey:'P21|421508',nick:'Игрок'}]};
 store.set('poker21:admin-deposits:v1',JSON.stringify(initial));
 const redis={pipeline:async commands=>commands.map(([op,...a])=>{
  if(op==='GET')return {result:store.get(a[0])||null};
  if(op==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(op==='EVAL'){if(collision){collision=false;return {result:0};}if((store.get(a[2])||'')!==a[3])return {result:0};store.set(a[2],a[4]);return {result:1};}
  throw Error(op);
 })};
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?redis:local(id),Date});
 const base={client:{id:'777',name:'Игрок',threadId:10},group:'-100',token:'fixture',user:{id:2144406710},source:{from:{is_bot:true}},operatorName:()=> 'Аня',api:async(t,method,body)=>{calls.push({method,body});},readPlayerIdentity:async()=>player};
 const handle=extra=>module.exports.handle({...base,...extra});
 const command=()=>handle({m:{message_id:7,text:'/перевод P21 X 2000'}});
 const confirm=(extra={})=>handle({cb:{id:'cb',data:calls.find(c=>c.body.reply_markup?.inline_keyboard?.length)?.body.reply_markup.inline_keyboard[0][0].callback_data},...extra});
 return {handle,command,confirm,base,calls,store,get state(){return JSON.parse(store.get('poker21:admin-deposits:v1'));},setPlayer(p){player=p;}};
}
test('transfer command requires two different known rooms and a positive exact amount',()=>{
 assert.equal(service.parse('обычный ответ'),null);
 assert.deepEqual(service.parse('/перевод P21 Х 12,50'),{fromRoom:'P21',toRoom:'X',amount:1250});
 for(const text of ['/перевод','/перевод X X 100','/перевод P21 X 0','/перевод P21 X -1','/перевод P21 X 1.234','/перевод P21 X 100 лишнее'])assert.ok(service.parse(text).error);
});
test('preview does not write a transfer; confirmation writes one atomic pair with author and handles CAS/replay',async()=>{
 const f=fixture();await f.command();assert.equal(f.state.channelOperations,undefined);
 const preview=f.calls.at(-1).body;assert.match(preview.text,/421508/);assert.match(preview.text,/2335996/);assert.ok(preview.reply_markup.inline_keyboard[0][0].callback_data.length<=64);
 await f.confirm();await f.confirm();const rows=f.state.channelOperations;
 assert.equal(rows.length,2);assert.deepEqual(rows.map(r=>[r.direction,r.room,r.playerId,r.amount]),[['outgoing','P21','421508',200000],['income','X','2335996',200000]]);
 assert.equal(rows[0].transferId,rows[1].transferId);assert.equal(rows[0].createdBy,'tg_2144406710');assert.equal(rows[0].createdByName,'Аня');
 assert.ok(f.calls.every(c=>!c.body.chat_id||c.body.chat_id==='-100'));
});
test('other managers, topics, changed identity, changed links and expired drafts cannot confirm',async()=>{
 for(const change of ['actor','topic','identity','links','expired']){
  const f=fixture();await f.command();let extra={};
  if(change==='actor')extra.user={id:1897001087};
  if(change==='topic')extra.client={...f.base.client,threadId:11};
  if(change==='identity')f.setPlayer({accountId:'ID000124',poker21Id:'421508'});
  if(change==='links'){const s=f.state;s.playerAccounts=[];f.store.set('poker21:admin-deposits:v1',JSON.stringify(s));}
  if(change==='expired'){const key=[...f.store.keys()].find(k=>k.startsWith(service.PREFIX)),draft=JSON.parse(f.store.get(key));draft.expiresAt=1;f.store.set(key,JSON.stringify(draft));}
  await f.confirm(extra);assert.equal(f.state.channelOperations,undefined,change);
 }
});
test('cancel prevents writing and cancel after confirmation does not claim to undo the ledger',async()=>{
 for(const completed of [false,true]){
  const f=fixture();await f.command();const data=f.calls.at(-1).body.reply_markup.inline_keyboard[1][0].callback_data;
  if(completed)await f.confirm();
  await f.handle({cb:{id:'cancel',data}});await f.confirm();
  assert.equal((f.state.channelOperations||[]).length,completed?2:0);
  assert.ok(f.calls.some(c=>c.body.text?.includes(completed?'Перевод уже записан':'Запись перевода отменена')));
 }
});
test('unlinked or ambiguous destination never guesses another account',()=>{
 const identity={accountId:'ID000123',poker21Id:'421508',xpokerIds:['2335996']};
 assert.throws(()=>service.accounts({},identity,'P21','PP'),/ровно один/);
 const links={playerAccounts:[{room:'X',playerId:'2335996',profileKey:'P21|421508'},{room:'X',playerId:'123456789',profileKey:'P21|421508'}]};
 assert.throws(()=>service.accounts(links,identity,'P21','X'),/ровно один/);
});
