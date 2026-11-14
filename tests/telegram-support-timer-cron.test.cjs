'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('timer worker requires cron secret and validates job id before accessing support',async()=>{
 const calls=[],module={exports:{}};
 vm.runInNewContext(fs.readFileSync('lib/api-handlers/cron-support-timer.js','utf8'),{module,Buffer,console,process:{env:{CRON_SECRET:'fixture',TELEGRAM_BOT_TOKEN:'bot'}},require:id=>id==='../telegram-support'?{expireTimer:async(...a)=>{calls.push(a);return true;}}:require(id)});
 const res=()=>({status(code){this.code=code;return this;},json(body){this.body=body;return this;}});
 for(const req of [{method:'GET'},{method:'POST',headers:{}},{method:'POST',headers:{'x-cron-secret':'wrong'}},{method:'POST',headers:{'x-cron-secret':'fixture'},body:{timerId:'bad'}}]){const r=res();await module.exports(req,r);assert.ok(r.code>=400);}
 assert.equal(calls.length,0);const r=res();await module.exports({method:'POST',headers:{'x-cron-secret':'fixture'},body:{timerId:'a'.repeat(24)}},r);assert.equal(r.code,200);assert.equal(calls.length,1);
});
