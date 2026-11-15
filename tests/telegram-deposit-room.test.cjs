const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const room=require('../lib/telegram-deposit-room');
test('room labels include only available IDs',()=>{
 assert.deepEqual(room.keyboard(room.choices({})).inline_keyboard[0].map(b=>b.text),['Poker21','X-Poker']);
 assert.deepEqual(room.keyboard(room.choices({poker21Id:'421508',xpokerIds:['2335996']})).inline_keyboard[0].map(b=>b.text),['Poker21 · ID 421508','X-Poker · ID 2335996']);
});
function fixture(state){
 const mod={exports:{}},sent=[],notifications=[];let raw=state?JSON.stringify(state):null;
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-deposit-room'),'utf8'),{module:mod,require:()=>({notifyDepositRoom:async(...args)=>notifications.push(args)})});
 const run=async cmds=>cmds.map(c=>{if(c[0]==='GET')return {result:raw};if(c[0]==='EVAL'){assert.equal(c[4],raw);raw=c[5];return {result:1};}throw Error(c[0]);});
 const api=async(method,body)=>sent.push({method,body});
 const select=(index=1,chat=777)=>mod.exports.handle({cb:{id:'click',data:'club:player-deposit:room:'+index},user:{id:777},message:{message_id:10,chat:{id:chat,type:'private'}},api,run,token:'test'});
 return {sent,notifications,select};
}
test('room selection updates the same message and notifies manager; another selection is blocked',async()=>{
 const f=fixture({expiresAt:Date.now()+10000,options:room.choices({xpokerIds:['2335996']})});
 await f.select();assert.equal(f.sent[1].method,'editMessageText');assert.equal(f.sent[1].body.message_id,10);
 assert.match(f.sent[1].body.text,/X-Poker · ID 2335996/);assert.equal(f.notifications.length,1);
 await f.select(0);assert.equal(f.notifications.length,1);assert.match(f.sent.at(-1).body.text,/уже выбран/);
});
test('missing context and another private chat cannot notify managers',async()=>{
 const f=fixture();await f.select();assert.equal(f.notifications.length,0);assert.equal(f.sent.length,1);
 const g=fixture({expiresAt:Date.now()+10000,options:room.choices({})});assert.equal(await g.select(0,999),false);assert.equal(g.sent.length,0);
});
test('when ID is unknown, player is prompted for it after selecting room',async()=>{
 const f=fixture({expiresAt:Date.now()+10000,options:room.choices({})});await f.select(0);
 assert.match(f.sent[1].body.text,/Пришлите ваш ID/);
});
