'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createRequire}=require('node:module');
test('pending subscription input is handled before manager mirroring and tracking',async()=>{
 const path=require.resolve('../lib/api-handlers/telegram-bot-webhook'),local=createRequire(path),module={exports:{}},calls=[];
 const mocks={
  '../cash-operation-guard':{handle:async()=>false},
  '../telegram-player-deposit':{handle:async()=>{calls.push('deposit');return false;}},
  '../club-table-subscriptions':{handle:async update=>{calls.push('subscription:'+update.message.text);return true;}},
  '../telegram-support':{handle:async()=>{calls.push('support');return {handled:true};}},
  '../tracking-link-milestones':{observeUpdate:async()=>calls.push('tracking')},
  '../telegram-club-commands':{command:()=>null}
 };
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||local(id),process:{env:{TELEGRAM_BOT_WEBHOOK_SECRET:'fixture',TELEGRAM_BOT_TOKEN:'fixture'}},Buffer,console});
 const req={method:'POST',headers:{'x-telegram-bot-api-secret-token':'fixture'},body:{message:{text:'602317',message_id:7,from:{id:42},chat:{id:42,type:'private'}}}};
 const res={setHeader(){},status(value){this.code=value;return this;},json(body){this.body=body;return this;}};
 await module.exports(req,res);assert.equal(res.code,200);assert.equal(res.body.tableSubscriptions,true);assert.deepEqual(calls,['deposit','subscription:602317']);
});
