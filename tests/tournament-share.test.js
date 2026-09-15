const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const Module = require('node:module');
const originalLoad = Module._load;
let rate = 1, uploaded = [], deleted = [], telegramPayload;
Module._load = function(name, parent, main) {
  if (parent && parent.filename.endsWith('/api-handlers/tournament-share.js')) {
    if(name==='../redis') return {pipeline:async()=>[{result:rate},{result:1}]};
    if(name==='../app-user-blocks') return {rejectBlockedAppUser:async()=>false};
    if(name==='@vercel/blob') return {put:async(...args)=>{uploaded.push(args);return {url:'https://test.public.blob.vercel-storage.com/card.jpg'};},del:async url=>deleted.push(url)};
  }
  return originalLoad.call(this,name,parent,main);
};
const handler=require('../lib/api-handlers/tournament-share');
Module._load=originalLoad;
function signed(token) {
 const params=new URLSearchParams({auth_date:String(Math.floor(Date.now()/1000)),user:JSON.stringify({id:12345,first_name:'Test'})});
 const data=[...params].sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${k}=${v}`).join('\n');
 const secret=crypto.createHmac('sha256','WebAppData').update(token).digest();params.set('hash',crypto.createHmac('sha256',secret).update(data).digest('hex'));return params.toString();
}
function body(){return {caption:'🎟 Розыгрыш\n♠ Last Longer',entities:[{type:'text_link',offset:3,length:8,url:'https://t.me/club?startapp=r_12'}],image:'data:image/jpeg;base64,'+Buffer.from([255,216,1,2,255,217]).toString('base64')};}
async function request(bodyValue){let result;const res={setHeader(){},status(code){this.code=code;return this;},json(value){result={code:this.code,...value};return this;},end(){}};await handler({method:'POST',body:bodyValue},res);return result;}
test('validates photo, UTF-16 link ranges, caption limit and safe links',()=>{
 assert.ok(handler.validateMessage(body()));
 for(const invalid of [{...body(),caption:'a'.repeat(1025)},{...body(),image:'data:image/svg+xml;base64,AA=='},{...body(),entities:[{type:'text_link',offset:1000,length:3,url:'https://t.me/club'}]},{...body(),entities:[{type:'text_link',offset:0,length:3,url:'javascript:alert(1)'}]}]) assert.equal(handler.validateMessage(invalid),null);
});
test('prepares exactly one photo for signed user with embedded links; never sends a chat message',async()=>{
 const oldFetch=global.fetch,oldToken=process.env.TELEGRAM_BOT_TOKEN,oldBlob=process.env.BLOB_READ_WRITE_TOKEN;
 process.env.TELEGRAM_BOT_TOKEN='test:token';process.env.BLOB_READ_WRITE_TOKEN='test';
 global.fetch=async(url,options)=>{assert.match(url,/\/savePreparedInlineMessage$/);telegramPayload=JSON.parse(options.body);return {ok:true,json:async()=>({ok:true,result:{id:'prepared',expiration_date:9999999999}})};};
 try {
  assert.equal((await request(body())).code,401);assert.equal(uploaded.length,0);
  const result=await request({...body(),initData:signed('test:token'),user_id:999});assert.equal(result.id,'prepared');assert.equal(telegramPayload.user_id,12345);assert.equal(telegramPayload.result.type,'photo');assert.deepEqual(telegramPayload.result.caption_entities,body().entities);assert.equal(telegramPayload.result.input_message_content,undefined);
  rate=6;assert.equal((await request({...body(),initData:signed('test:token')})).code,429);assert.equal(uploaded.length,1);
  rate=1;global.fetch=async()=>({ok:false,json:async()=>({ok:false})});assert.equal((await request({...body(),initData:signed('test:token')})).code,503);assert.equal(deleted.length,1);
 } finally {global.fetch=oldFetch;if(oldToken===undefined)delete process.env.TELEGRAM_BOT_TOKEN;else process.env.TELEGRAM_BOT_TOKEN=oldToken;if(oldBlob===undefined)delete process.env.BLOB_READ_WRITE_TOKEN;else process.env.BLOB_READ_WRITE_TOKEN=oldBlob;}
});
