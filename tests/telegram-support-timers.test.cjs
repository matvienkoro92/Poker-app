'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {create,PREFIX,key,activeKey,WAIT_MS}=require('../lib/telegram-support-timers');
const GROUP='-100123',LEAD='777',MANAGER=999;
function fixture(useQueue=false){
 const store=new Map(),calls=[],scheduled=[],due=new Map();let time=1000000,sequence=1000,failSchedule=false,failDelete=false;
 const c={id:LEAD,threadId:33,lastInboundMessageId:5,lastReply:{sourceMessageId:55,privateMessageId:88,threadId:33}};store.set(PREFIX+'client:'+GROUP+':'+LEAD,JSON.stringify(c));
 const pipeline=async cmds=>cmds.map(([cmd,...a])=>{if(cmd==='GET')return {result:store.get(a[0])||null};if(cmd==='SET'){store.set(a[0],String(a[1]));return {result:'OK'};}if(cmd==='ZADD'){due.set(String(a[2]),Number(a[1]));return {result:1};}if(cmd==='ZRANGEBYSCORE')return {result:[...due].filter(([,at])=>at<=Number(a[2])).map(([id])=>id).slice(0,20)};if(cmd==='ZREM')return {result:due.delete(String(a[1]))?1:0};if(cmd==='DEL')return {result:store.delete(a[0])?1:0};if(cmd==='EVAL'){if(store.get(a[2])===a[3])store.delete(a[2]);return {result:1};}throw Error(cmd);});
 const api=async(method,body)=>{calls.push({method,body});if(method==='deleteMessage'&&failDelete){failDelete=false;throw Error('network');}return {message_id:++sequence};};
 const service=create({pipeline,api,lock:async(_key,fn)=>fn(),schedule:useQueue?undefined:async r=>{if(failSchedule)throw Error('offline');scheduled.push({...r});},now:()=>time});
 const records=()=>[...store.entries()].filter(([k])=>k.startsWith(PREFIX+'timer:')).map(([,v])=>JSON.parse(v));
 const record=()=>records()[0];
 const cb=(action='start',r=record())=>({id:'callback',data:'support:timer:'+action+':'+r.id,from:{id:MANAGER},message:{chat:{id:GROUP,type:'supergroup'},message_id:r.controlMessageId,message_thread_id:33}});
 const leadCb=(choice='paid',r=record())=>({id:'lead-callback',data:'support:pay:'+choice+':'+r.id,from:{id:Number(LEAD)},message:{chat:{id:Number(LEAD),type:'private'},message_id:r.leadControlMessageId}});
 async function ready(){await service.offer(GROUP,c,{message_id:55});}
 async function start(){await ready();await service.callback(cb(),GROUP);}
 return {service,store,c,calls,scheduled,due,record,cb,leadCb,ready,start,advance:ms=>time+=ms,failSchedule:()=>failSchedule=true,failDelete:()=>failDelete=true};
}
test('manager explicitly starts ten minutes; duplicate clicks do not restart; lead gets exactly two choices',async()=>{
 const f=fixture();await f.ready();assert.equal(f.scheduled.length,0);await f.ready();assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 await f.service.callback(f.cb(),GROUP);const due=f.record().dueAt;assert.equal(f.scheduled.length,1);assert.equal(due-f.record().createdAt,WAIT_MS);
 const message=f.calls.find(c=>c.method==='sendMessage'&&c.body.chat_id===LEAD);assert.deepEqual(message.body.reply_markup.inline_keyboard[0].map(b=>b.text),['✅ Оплатил','❌ Отказаться']);
 f.advance(1000);await f.service.callback(f.cb(),GROUP);assert.equal(f.record().dueAt,due);assert.equal(f.scheduled.length,1);
});
test('deadline deletes only the selected delivered message once and updates statuses',async()=>{
 const f=fixture();await f.start();assert.equal(await f.service.expire(f.record().id,GROUP),false);f.advance(WAIT_MS);assert.equal(await f.service.expire(f.record().id,GROUP),true);
 assert.equal(f.record().state,'deleted');assert.deepEqual(f.calls.filter(c=>c.method==='deleteMessage').map(c=>c.body),[{chat_id:LEAD,message_id:88}]);
 await f.service.expire(f.record().id,GROUP);assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);assert.equal(f.store.has(activeKey(GROUP,LEAD)),false);
});
test('new private messages, including commands, cancel deletion; older updates do not',async()=>{
 const f=fixture();await f.start();await f.service.observe(GROUP,{chat:{id:777,type:'private'},from:{id:777},message_id:5,text:'/dep'});assert.equal(f.record().state,'active');
 await f.service.observe(GROUP,{chat:{id:777,type:'private'},from:{id:777},message_id:6,text:'/dep'});assert.equal(f.record().state,'cancelled');f.advance(WAIT_MS);await f.service.expire(f.record().id,GROUP);assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,0);
});
test('paid is the lead declaration, stops timer and never deletes requisites',async()=>{
 const f=fixture();await f.start();await f.service.leadCallback(f.leadCb(),GROUP);assert.equal(f.record().state,'paid');assert.ok(f.calls.some(c=>c.method==='editMessageText'&&c.body.chat_id===GROUP&&c.body.text.includes('нужно проверить')));
 f.advance(WAIT_MS);await f.service.expire(f.record().id,GROUP);assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,0);await f.service.leadCallback(f.leadCb('refuse'),GROUP);assert.equal(f.record().state,'paid');
});
test('refusal immediately deletes the exact requisites and is idempotent',async()=>{
 const f=fixture();await f.start();await f.service.leadCallback(f.leadCb('refuse'),GROUP);assert.equal(f.record().state,'refused');await f.service.leadCallback(f.leadCb('refuse'),GROUP);assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);
});
test('callbacks cannot be used from another lead, group, topic or control message',async()=>{
 const f=fixture();await f.start();for(const change of [b=>b.from.id=123,b=>b.message.chat.id=123,b=>b.message.message_id++]){const b=f.leadCb();change(b);assert.equal(await f.service.leadCallback(b,GROUP),false);}
 const b=f.cb();b.message.chat.id='-100999';assert.equal(await f.service.callback(b,GROUP),false);const other=f.cb();other.message.message_thread_id=34;assert.equal(await f.service.callback(other,GROUP),false);assert.equal(f.record().state,'active');
});
test('schedule failure fails closed, manager cancel and changed conversation preserve messages',async()=>{
 const f=fixture();await f.ready();f.failSchedule();await f.service.callback(f.cb(),GROUP);assert.equal(f.record().state,'ready');f.advance(WAIT_MS);await f.service.expire(f.record().id,GROUP);assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,0);
 const g=fixture();await g.start();await g.service.callback(g.cb('cancel'),GROUP);assert.equal(g.record().state,'cancelled');
 const h=fixture();await h.start();h.c.lastInboundMessageId=6;h.store.set(PREFIX+'client:'+GROUP+':'+LEAD,JSON.stringify(h.c));h.advance(WAIT_MS);await h.service.expire(h.record().id,GROUP);assert.equal(h.calls.filter(c=>c.method==='deleteMessage').length,0);
});
test('transient deletion failure retries only the same message',async()=>{
 const f=fixture();await f.start();f.advance(WAIT_MS);f.failDelete();await assert.rejects(f.service.expire(f.record().id,GROUP));assert.equal(f.record().state,'deleting');await f.service.expire(f.record().id,GROUP);assert.equal(f.record().state,'deleted');assert.ok(f.calls.filter(c=>c.method==='deleteMessage').every(c=>c.body.message_id===88));
});

test('default scheduler persists due time in Redis and minute sweep expires only due timers',async()=>{
 const f=fixture(true);await f.start();assert.equal(f.due.size,1);assert.deepEqual(await f.service.sweep(GROUP),{deleted:0,failed:0});
 f.advance(WAIT_MS);assert.deepEqual(await f.service.sweep(GROUP),{deleted:1,failed:0});assert.equal(f.due.size,0);assert.equal(f.record().state,'deleted');
 const g=fixture(true);await g.start();await g.service.leadCallback(g.leadCb(),GROUP);assert.equal(g.due.size,0);g.advance(WAIT_MS);assert.deepEqual(await g.service.sweep(GROUP),{deleted:0,failed:0});
});
