'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
 const keys=new Map(),messages=[];let ok=true;
 const deps={
  './redis':{pipeline:async commands=>commands.map(([cmd,key,value,...args])=>{if(cmd==='DEL'){keys.delete(key);return {result:1};}if(args.includes('NX')&&keys.has(key))return {result:null};keys.set(key,value);return {result:'OK'};})},
  './account-id':{},'./telegram-participation-gate':{},'./bot-subscription-events':{},
  './telegram-group-policy':{eventChatId:async()=>'-100123'},
  './telegram-bot-send':{sendTelegramMessage:async(token,msg)=>{messages.push(msg);return {ok};}}
 };
 const ctx={module:{exports:{}},require:id=>deps[id],URL,process:{env:{}},console:{error(){}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/tournament-bet-subscriptions'),'utf8'),ctx);
 return {api:ctx.module.exports,messages,keys,fail:()=>{ok=false},succeed:()=>{ok=true}};
}
const event={id:'tb_done',status:'settled',title:'Тракторист',winnerPaidAt:'2026-09-15T19:00:00Z',winnerPaidAmount:7100,winnerAccountId:'winner',entries:[{accountId:'winner',name:'Baldendi',stake:300},{accountId:'other',name:'Другой'}]};
test('completion announces the actual winner and payout once to the event group',async()=>{
 const s=setup();await Promise.all([s.api.notifySettled(event,'token'),s.api.notifySettled(event,'token')]);await s.api.notifySettled(event,'token');
 assert.equal(s.messages.length,1);const m=s.messages[0];assert.equal(m.chat_id,'-100123');assert.equal(m.notificationScope,'tournament-bet');
 assert.match(m.text,/Событие «Ставка на себя» завершено/);assert.match(m.text,/Тракторист/);assert.match(m.text,/Победитель: Baldendi/);assert.match(m.text,/Поставил: 300 ₽/);assert.match(m.text,/Забрал: 7\s100 ₽/);assert.match(m.text,/Участников: 2/);
 assert.equal(new URL(m.buttonUrl).searchParams.get('startapp'),'tournament_bet_tb_done');assert.equal(s.keys.get('poker_app:tournament_bet:settled_notice:tb_done'),'sent');
});
test('incomplete or unpaid events do not announce completion',async()=>{
 const s=setup();for(const change of [{status:'closed'},{winnerPaidAt:''},{winnerPaidAmount:null},{winnerAccountId:'missing'}])await s.api.notifySettled({...event,...change},'token');
 assert.equal(s.messages.length,0);assert.equal(s.keys.size,0);
});
test('failed Telegram delivery can be retried',async()=>{
 const s=setup();s.fail();await s.api.notifySettled(event,'token');assert.equal(s.keys.size,0);s.succeed();await s.api.notifySettled(event,'token');await s.api.notifySettled(event,'token');assert.equal(s.messages.length,2);
});
async function settle({already=false,payoutFails=false,saveFails=false,noticeFails=false}={}){
 const source=fs.readFileSync(require.resolve('../lib/api-handlers/tournament-bet'),'utf8');const block=source.slice(source.indexOf('    if (action === "settle")'),source.indexOf('    return res.status(400).json({ ok: false, error: "Неизвестное действие"'));
 const calls=[];const state={...event,status:already?'settled':'closed',entries:event.entries.map(x=>({...x,poker21Id:'123'}))};
 const ctx={state,action:'settle',auth:{isAdmin:true,memberId:'admin'},body:{winnerAccountId:'winner'},text:x=>x,bankFor:()=>7100,changePoker21Amount:async()=>{calls.push('pay');if(payoutFails)throw Error('payout')},saveSettledState:async()=>{calls.push('save');if(saveFails)throw Error('save')},subscriptions:{notifySettled:async()=>{calls.push('notify');if(noticeFails)throw Error('telegram')}},BOT_TOKEN:'token',history:[],context:{},mainState:{},personalStates:[],publicState:()=>({}),addEventMenu:x=>x,poker21Error:()=> 'failed',console:{error(){}},res:{status(){return this},json(){return {}}}};
 try{await vm.runInNewContext('(async()=>{'+block+'})()',ctx)}catch(e){calls.push('error')}
 return calls;
}
test('completion notice follows successful payout and state persistence',async()=>{
 assert.deepEqual(await settle(),['pay','save','notify']);assert.deepEqual(await settle({payoutFails:true}),['pay']);assert.deepEqual(await settle({saveFails:true}),['pay','save','error']);
});
test('retry of settled event never repeats payout; notification error preserves settlement',async()=>{
 assert.deepEqual(await settle({already:true}),['notify']);assert.deepEqual(await settle({noticeFails:true}),['pay','save','notify']);
});
