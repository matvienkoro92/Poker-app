const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-tournament-bet'),'utf8');
const helper=source.slice(source.indexOf('  async function postWithLockRetry'),source.indexOf('  function post(payload'));
function response(status,code){return {status,clone(){return {json:async()=>({code})};}};}
test('busy event retries the unchanged cancellation request before submitting it successfully',async()=>{
 let calls=0,notices=0;const options={body:JSON.stringify({action:'cancel',eventId:'longer'})};
 const context={fetch:async(url,body)=>{assert.equal(body,options);return ++calls<3?response(409,'EVENT_BUSY'):response(200);},setTimeout:fn=>fn()};
 vm.createContext(context);vm.runInContext(helper,context);const result=await context.postWithLockRetry('/api/tournament-bet',options,()=>notices++);assert.equal(result.status,200);assert.equal(calls,3);assert.equal(notices,2);
});
test('completed, denied, wallet and uncertain network errors are never repeated',async()=>{
 for(const reply of [response(200),response(403),response(502),response(409,'ALREADY_PAID')]){
  let calls=0;const context={fetch:async()=>{calls++;return reply;},setTimeout:fn=>fn()};vm.createContext(context);vm.runInContext(helper,context);await context.postWithLockRetry('/',{});assert.equal(calls,1);
 }
});
test('busy retries are bounded',async()=>{
 let calls=0;const context={fetch:async()=>{calls++;return response(409,'EVENT_BUSY');},setTimeout:fn=>fn()};vm.createContext(context);vm.runInContext(helper,context);assert.equal((await context.postWithLockRetry('/',{})).status,409);assert.equal(calls,6);
});
