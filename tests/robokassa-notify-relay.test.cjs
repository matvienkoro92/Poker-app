'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const handler=require('../services/robokassa-notify/api/robokassa-webhook');
const response=()=>({code:200,headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.code=n;return this},end(){},send(v){this.text=v}});
test('relay preserves acknowledgements and rejections, and fails closed on transport errors',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});
 for(const [status,text] of [[200,'OK123'],[403,''],[503,'']]){
  global.fetch=async(url,options)=>{
   assert.equal(String(url),'https://poker-app-ebon.vercel.app/api/robokassa-webhook');
   assert.equal(options.body.toString(),'OutSum=1100.00&InvId=123&SignatureValue=abc');
   assert.equal(options.redirect,'error');return {status,text:async()=>text};
  };
  const res=response();await handler({method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'OutSum=1100.00&InvId=123&SignatureValue=abc'},res);
  assert.equal(res.code,status);assert.equal(res.text,text);
 }
 global.fetch=async()=>{throw Error('offline')};
 const res=response();await handler({method:'GET',url:'/?InvId=123',headers:{}},res);assert.equal(res.code,503);assert.equal(res.text,undefined);
});
test('relay preserves GET query and rejects oversized or non-form requests before forwarding',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});let calls=0;
 global.fetch=async(url,options)=>{calls++;assert.equal(new URL(url).search,'?OutSum=1.000000&InvId=7&Shp_x=a%2Bb');assert.equal(options.method,'GET');return {status:403,text:async()=>''}};
 const get=response();await handler({method:'GET',url:'/?OutSum=1.000000&InvId=7&Shp_x=a%2Bb',headers:{}},get);assert.equal(get.code,403);
 for(const req of [{method:'PUT',headers:{}},{method:'POST',headers:{'content-type':'application/json'},body:'{}'},{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:'x'.repeat(16385)},{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:{InvId:['1','2']}}]){
  const res=response();await handler(req,res);assert.ok([400,405].includes(res.code));
 }
 assert.equal(calls,1);
});
