'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
const service=require('../lib/telegram-support-record');
function fixture(){
 const path=require.resolve('../lib/telegram-support-record'),local=createRequire(path),module={exports:{}},store=new Map(),calls=[];
 let collisions=1,player={accountId:'ID000123',name:'Игрок',poker21Id:'421508',xpokerIds:['2335996'],supremaIds:['1611851'],pppokerIds:['1234567']};
 const redis={pipeline:async commands=>commands.map(([op,...a])=>{
  if(op==='GET')return {result:store.get(a[0])||null};
  if(op==='SET'){store.set(a[0],a[1]);return {result:'OK'};}
  if(op==='EVAL'){if(collisions-->0)return {result:0};if((store.get(a[2])||'')!==a[3])return {result:0};store.set(a[2],a[4]);return {result:1};}
  throw Error(op);
 })};
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?redis:local(id),Date});
 const base={client:{id:'777',name:'Игрок',threadId:10},group:'-100',token:'test',user:{id:2144406710},source:{from:{is_bot:true}},operatorName:()=> 'Аня',api:async(t,method,body)=>{calls.push({method,body});},saveClient:async()=>{},readPlayerIdentity:async()=>player};
 const handle=extra=>module.exports.handle({...base,...extra});let messageId=1;
 const text=(value,id=messageId++)=>handle({m:{text:value,message_id:id}});
 const click=(value,extra={})=>handle({cb:{id:'cb',data:value},...extra});
 const buttons=()=>Array.from(calls.at(-1).body.reply_markup.inline_keyboard.flat());
 return {base,store,calls,handle,text,click,buttons,setPlayer(p){player=p;},get state(){return JSON.parse(store.get('poker21:admin-deposits:v1')||'null');}};
}
test('record wizard writes each approved channel with the selected bound room and author; confirmation is idempotent',async()=>{
 for(const [channel,index] of [['runex',0],['exchip',1],['r-crypto',2],['allfriends',3]]){
  const f=fixture();await f.text('/записать');assert.deepEqual(f.buttons().map(b=>b.text),['Рунекс','Эксчип бот','Рома Крипта','Алл френдс','Перевод']);
  await f.click(f.buttons()[index].callback_data);
  assert.deepEqual(f.buttons().slice(0,4).map(b=>b.text),['Poker21 · ID 421508','X-Poker · ID 2335996','Suprema · ID 1611851','PPPoker · ID 1234567']);
  await f.click(f.buttons()[2].callback_data);await f.text('1500,50');assert.equal(f.state,null);
  const confirm=f.buttons()[0].callback_data;await f.click(confirm);await f.click(confirm);
  assert.equal(f.state.channelOperations.length,1);const row=f.state.channelOperations[0];
  assert.equal(row.channelId,channel==='allfriends'?'other':channel);assert.equal(row.counterparty,channel==='allfriends'?'allfriends':undefined);
  assert.equal(row.direction,'income');assert.equal(row.room,'Supr');assert.equal(row.playerId,'1611851');assert.equal(row.amount,150050);assert.equal(row.createdBy,'tg_2144406710');assert.equal(row.createdByName,'Аня');
  assert.ok(f.calls.every(c=>!c.body.chat_id||c.body.chat_id==='-100'));
 }
});
test('expired drafts, another actor, changed binding, cancelled draft and old transfer command cannot write',async()=>{
 for(const scenario of ['expired','actor','binding','cancel']){
  const f=fixture();await f.text('/записать');await f.click(f.buttons()[0].callback_data);await f.click(f.buttons()[0].callback_data);await f.text('2000');
  const confirm=f.buttons()[0].callback_data;
  if(scenario==='expired')f.base.client.recordDrafts['2144406710'].expiresAt=1;
  if(scenario==='binding')f.setPlayer({accountId:'ID000123',poker21Id:'999999'});
  if(scenario==='cancel')await f.click(f.buttons()[1].callback_data);
  await f.click(confirm,scenario==='actor'?{user:{id:1897001087}}:{});assert.equal(f.state,null,scenario);
 }
 assert.equal(await fixture().text('/перевод P21 X 2000'),false);
 assert.equal(await fixture().text('/transfer P21 X 2000'),false);
});
test('only bound accounts are offered; no binding never invents an ID',async()=>{
 const f=fixture();f.setPlayer({accountId:'ID000123',pppokerIds:['1234567']});await f.text('/записать');await f.click(f.buttons()[0].callback_data);
 assert.deepEqual(f.buttons().map(b=>b.text),['PPPoker · ID 1234567','Отмена']);
 const g=fixture();g.setPlayer({accountId:'ID000123'});await g.text('/записать');await g.click(g.buttons()[0].callback_data);assert.match(g.calls.at(-1).body.text,/Нет привязанных ID/);
});
test('amount retries stay internal after confirmation or a newer draft; invalid sums do not write',async()=>{
 const f=fixture();await f.text('/записать');await f.click(f.buttons()[0].callback_data);await f.click(f.buttons()[0].callback_data);
 await f.text('-1');assert.equal(f.state,null);await f.text('2000',50);
 assert.equal(await f.text('2000',50),true);
 await f.click(f.buttons()[0].callback_data);await f.text('/записать',60);
 assert.equal(await f.text('2000',50),true);assert.equal(f.state.channelOperations.length,1);
});
test('transfer selects source then destination and writes a single linked pair in either direction',async()=>{
 for(const from of [0,1]){
  const f=fixture();
  f.store.set('poker21:admin-deposits:v1',JSON.stringify({revision:0,entries:[],requests:[],playerAccounts:[{room:'X',playerId:'2335996',profileKey:'P21|421508',nick:'Игрок'}]}));
  await f.text('/записать');await f.click(f.buttons().find(b=>b.text==='Перевод').callback_data);
  assert.match(f.calls.at(-1).body.text,/откуда/);
  await f.click(f.buttons()[from].callback_data);assert.match(f.calls.at(-1).body.text,/куда/);
  assert.ok(!f.buttons().some(b=>b.text.startsWith(from===0?'Poker21':'X-Poker')));
  await f.click(f.buttons().find(b=>b.text.startsWith(from===0?'X-Poker':'Poker21')).callback_data);
  assert.match(f.calls.at(-1).body.text,/сумму перевода/);
  await f.text('2000');assert.equal(f.buttons()[0].text,'✅ Записать перевод');assert.equal(f.state.channelOperations,undefined);
  const confirm=f.buttons()[0].callback_data;await f.click(confirm);await f.click(confirm);
  const rows=f.state.channelOperations;assert.equal(rows.length,2);assert.equal(rows[0].transferId,rows[1].transferId);
  assert.deepEqual(rows.map(r=>[r.direction,r.room,r.amount]),[['outgoing',from===0?'P21':'X',200000],['income',from===0?'X':'P21',200000]]);
 }
});
test('transfer rejects a single bound room and binding changes on either side',async()=>{
 const single=fixture();single.setPlayer({accountId:'ID000123',pppokerIds:['123']});await single.text('/записать');await single.click(single.buttons().find(b=>b.text==='Перевод').callback_data);assert.match(single.calls.at(-1).body.text,/двух разных румах/);
 for(const changed of ['source','destination']){
  const f=fixture();await f.text('/записать');await f.click(f.buttons().find(b=>b.text==='Перевод').callback_data);
  await f.click(f.buttons()[0].callback_data);await f.click(f.buttons()[0].callback_data);await f.text('2000');
  f.setPlayer({accountId:'ID000123',poker21Id:changed==='source'?'999999':'421508',xpokerIds:changed==='destination'?[]:['2335996']});
  await f.click(f.buttons()[0].callback_data);assert.equal(f.state,null);assert.match(f.calls.at(-1).body.text,/Привязка игрока изменилась/);
 }
});
