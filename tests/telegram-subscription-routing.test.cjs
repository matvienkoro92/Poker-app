'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createRequire}=require('node:module');
test('pending subscription input is handled before manager mirroring and tracking', {timeout:2000},async()=>{
 const path=require.resolve('../lib/api-handlers/telegram-bot-webhook'),local=createRequire(path),module={exports:{}},calls=[];
 let releaseTimer;const timerPending=new Promise(resolve=>{releaseTimer=resolve;});
 const mocks={
  '../cash-operation-guard':{handle:async()=>false},
  '../telegram-player-deposit':{handle:async()=>{calls.push('deposit');releaseTimer();return false;}},
  '../club-table-subscriptions':{handle:async update=>{calls.push('subscription:'+update.message.text);return true;}},
  '../telegram-support':{observeTimerActivity:async()=>timerPending,handle:async()=>{calls.push('support');return {handled:true};}},
  '../telegram-exchange':{action:()=>false},
  '../tracking-link-milestones':{observeUpdate:async()=>calls.push('tracking')},
  '../telegram-club-commands':{command:()=>null}
 };
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||local(id),process:{env:{TELEGRAM_BOT_WEBHOOK_SECRET:'fixture',TELEGRAM_BOT_TOKEN:'fixture'}},Buffer,console});
 const req={method:'POST',headers:{'x-telegram-bot-api-secret-token':'fixture'},body:{message:{text:'602317',message_id:7,from:{id:42},chat:{id:42,type:'private'}}}};
 const res={setHeader(){},status(value){this.code=value;return this;},json(body){this.body=body;return this;}};
 await module.exports(req,res);assert.equal(res.code,200);assert.equal(res.body.tableSubscriptions,true);assert.deepEqual(calls,['deposit','subscription:602317']);
});
test('an active subscription prompt cannot swallow plain statistics commands',async()=>{
 const path=require.resolve('../lib/api-handlers/telegram-bot-webhook'),local=createRequire(path),module={exports:{}},calls=[];
 const mocks={
  '../cash-operation-guard':{handle:async()=>false},'../telegram-player-deposit':{handle:async()=>false},
  '../club-table-subscriptions':{handle:async()=>{throw Error('Must not consume a recognized command');}},
  '../telegram-support':{observeTimerActivity:async()=>{},handle:async()=>{throw Error('Must not mirror a recognized command');}},
  '../tracking-link-milestones':{observeUpdate:async()=>{}},
  '../redis':{isConfigured:()=>false},
  '../telegram-club-commands':{command:()=> 'player-statistics',handle:async(update,token,action)=>{calls.push(action);return true;}}
 };
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||local(id),process:{env:{TELEGRAM_BOT_WEBHOOK_SECRET:'fixture',TELEGRAM_BOT_TOKEN:'fixture'}},Buffer,console});
 const req={method:'POST',headers:{'x-telegram-bot-api-secret-token':'fixture'},body:{message:{text:'статистика',message_id:7,from:{id:42},chat:{id:42,type:'private'}}}};
 const res={setHeader(){},status(value){this.code=value;return this;},json(body){this.body=body;return this;}};
 await module.exports(req,res);assert.equal(res.code,200);assert.deepEqual(calls,['player-statistics']);
});
