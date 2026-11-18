'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const handler=require('../services/robokassa-notify/api/mandarin-webhook');
const id='11111111-2222-4333-8444-555555555555';
const response=()=>({setHeader(){},end(text){this.text=text}});
test('Mandarin relay forwards only invoice ID, preserves backend rejection and never acknowledges a failed save',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});
 for(const status of [200,403,422,503]){
  global.fetch=async(url,options)=>{assert.equal(url,'https://poker-app-ebon.vercel.app/api/mandarin-webhook');assert.deepEqual(JSON.parse(options.body),{invoice_id:id});assert.equal(options.redirect,'error');return {status,text:async()=>status===200?'{"ok":true}':''}};
  for(const body of [{invoice_id:id,amount:'1100',customer:{email:'discard@example.com'}},JSON.stringify({invoice_id:id})]){const res=response();await handler({method:'POST',headers:{'content-type':'application/json'},body},res);assert.equal(res.statusCode,status);}
 }
});
test('Mandarin relay rejects invalid inputs before transport and fails closed on network failure',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});let calls=0;global.fetch=async()=>{calls++;throw Error('offline')};
 for(const req of [{method:'GET'},{method:'POST',headers:{'content-type':'application/json'},body:{invoice_id:'../bad'}},{method:'POST',headers:{'content-type':'application/json'},body:'{'},{method:'POST',headers:{'content-type':'text/plain'},body:'{}'}]){const res=response();await handler(req,res);assert.ok([400,405].includes(res.statusCode));}assert.equal(calls,0);
 const res=response();await handler({method:'POST',headers:{'content-type':'application/json'},body:{invoice_id:id}},res);assert.equal(res.statusCode,503);
});
