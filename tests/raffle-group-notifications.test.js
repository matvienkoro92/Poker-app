const test=require('node:test'),assert=require('node:assert/strict');
const {createRaffleGroupNotifier}=require('../lib/raffle-group-notifications');
test('only active ticket raffles are announced once with direct link',async()=>{
 const store=new Map(),sent=[];const notify=createRaffleGroupNotifier({botToken:'test',eventChatId:async()=>'-1001227353220',pipeline:async commands=>commands.map(([cmd,key,value,...args])=>{if(cmd==='DEL'){store.delete(key);return {result:1}}if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,value);return {result:'OK'}}),sendTelegramMessage:async(token,payload)=>{sent.push(payload);return {ok:true}}});
 const r={id:'abc',title:'Билеты в Меджик',status:'active',prizeKind:'tournament_ticket'};
 await notify({...r,status:'draft'});await notify({...r,prizeKind:'cash'});assert.equal(sent.length,0);
 await notify(r);await notify(r);assert.equal(sent.length,1);assert.equal(sent[0].chatId,'-1001227353220');assert.equal(sent[0].notificationScope,'raffle-start');assert.match(sent[0].buttonUrl,/startapp=r_abc$/);
});
