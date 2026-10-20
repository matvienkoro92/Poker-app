'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('notification worker requires the cron secret and bot token before any delivery',async()=>{
 const module={exports:{}},env={CRON_SECRET:'secret',BOT_TOKEN:'token'};let calls=0;
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/api-handlers/cron-deposit-notifications'),'utf8'),{module,exports:module.exports,process:{env},require:()=>({retryPending:async token=>{assert.equal(token,'token');calls++;return {processed:1,sent:1};}})});
 async function call(headers={},method='GET'){const res={code:200,setHeader(){},status(n){this.code=n;return this;},json(data){this.data=data;return this;}};await module.exports({method,headers},res);return res;}
 assert.equal((await call()).code,403);assert.equal((await call({authorization:'Bearer wrong'})).code,403);assert.equal(calls,0);
 assert.equal((await call({authorization:'Bearer secret'})).data.sent,1);assert.equal(calls,1);
 delete env.BOT_TOKEN;assert.equal((await call({authorization:'Bearer secret'})).code,503);assert.equal(calls,1);
});
