'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{Readable}=require('node:stream');
const handler=require('../services/robokassa-notify/api/prodamus-webhook');
const response=()=>({code:200,setHeader(){},status(n){this.code=n;return this},end(){},send(text){this.text=text}});
test('Prodamus relay preserves raw body, multipart type and Sign; returns verifier result',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});
 for(const contentType of ['application/x-www-form-urlencoded','multipart/form-data; boundary=provider'])for(const [status,text]of [[200,'success'],[403,''],[503,'']]){
  const raw=Buffer.from('products%5B0%5D%5Bname%5D=%D0%A2%D0%B5%D1%81%D1%82&sum=1100.00'),sign='a'.repeat(64);
  global.fetch=async(url,options)=>{assert.equal(url,'https://poker-app-ebon.vercel.app/api/prodamus-webhook');assert.deepEqual(options.body,raw);assert.equal(options.headers.sign,sign);assert.equal(options.headers['content-type'],contentType);assert.equal(options.redirect,'error');return {status,text:async()=>text}};
  const req=Readable.from([raw.subarray(0,20),raw.subarray(20)]);Object.assign(req,{method:'POST',headers:{sign,'content-type':contentType}});
  const res=response();await handler(req,res);assert.equal(res.code,status);assert.equal(res.text,text);
 }
});
test('Prodamus relay rejects malformed requests and fails closed on upstream errors',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});let calls=0;
 global.fetch=async()=>{calls++;throw Error('offline')};
 const headers={sign:'a'.repeat(64),'content-type':'application/x-www-form-urlencoded'};
 for(const req of [{method:'GET',headers},{method:'POST',headers:{}},{method:'POST',headers:{...headers,'content-type':'application/json'},body:'{}'},{method:'POST',headers,body:'x'.repeat(65537)},{method:'POST',headers,body:{sum:['1','2']}}]){
  const res=response();await handler(req,res);assert.ok([400,403,405].includes(res.code));
 }
 assert.equal(calls,0);const res=response();await handler({method:'POST',headers,body:'sum=1100.00'},res);assert.equal(res.code,503);assert.equal(res.text,undefined);assert.equal(calls,1);
});


test('Vercel parsed forms preserve bracket fields and Unicode for upstream HMAC verification',async t=>{
 const original=global.fetch;t.after(()=>{global.fetch=original});
 const fields={domain:'matro.payform.ru',order_id:'123',sum:'1100.00','products[0][name]':'Тест + /','products[0][price]':'1100.00'},sign='a'.repeat(64);
 global.fetch=async(url,options)=>{assert.deepEqual(Object.fromEntries(new URLSearchParams(options.body.toString())),fields);assert.equal(options.headers.sign,sign);return {status:403,text:async()=>''}};
 const res=response();await handler({method:'POST',headers:{sign,'content-type':'application/x-www-form-urlencoded'},body:fields},res);assert.equal(res.code,403);
});
