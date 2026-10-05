'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {fixture,fly}=require('./helpers/cooler-flight-fixture.cjs');
const {QUEUE_KEY,GAME_URL,flush}=require('../lib/cooler-flight-record-notifications');
test('only a strictly higher daily score queues an announcement; retry cannot duplicate it',async()=>{
  for(const mode of ['first','higher','tie','lower']){
    const f=fixture();f.setTime(Date.parse('2026-10-02T12:00:00Z'));
    const run=(await f.request({action:'start'})).data,{s,taps}=fly(run.seed);
    if(mode!=='first')f.boards.set('poker_app:cooler_flight:daily:v1:2026-10-02',new Map([['Bob',(s.score+(mode==='higher'?-1:mode==='lower'?1:0))*100000000+1000]]));
    f.advance(s.tick*1000/60+1000);
    const body={action:'finish',runId:run.runId,ticks:s.tick,taps};
    assert.equal((await f.request(body)).status,200);
    assert.equal(f.hashes.get(QUEUE_KEY)?.size||0,['first','higher'].includes(mode)?1:0);
    assert.equal((await f.request(body)).status,409);
    assert.equal(f.hashes.get(QUEUE_KEY)?.size||0,['first','higher'].includes(mode)?1:0);
  }
});
test('notification has escaped name, correct prize/cutoff and game button; failures stay queued',async()=>{
 const queued=new Map([['run',JSON.stringify({name:'<Кулер>',score:25,prize:'Билет за 500 ₽',date:'2026-10-03'})]]),locks=new Map();let calls=0,fail=true;
 const commands=async list=>list.map(([op,key,...args])=>{
   if(op==='HGETALL')return Object.fromEntries(queued);
   if(op==='HGET')return queued.get(args[0])||null;
   if(op==='SET'){if(locks.has(key))return null;locks.set(key,1);return 'OK';}
   if(op==='HDEL')return queued.delete(args[0]);
   if(op==='DEL')return locks.delete(key);
   throw Error(op);
 });
 const dependencies={token:'test',eventChatId:async()=>'-123',send:async(_,opts)=>{calls++;assert.equal(opts.notificationScope,'cooler-record');assert.equal(opts.buttonUrl,GAME_URL);assert.match(opts.text,/&lt;Кулер&gt;/);assert.match(opts.text,/17:00 МСК 03.10.2026/);assert.match(opts.text,/500 ₽/);return {ok:!fail};}};
 await assert.rejects(flush(commands,dependencies));assert.equal(queued.size,1);assert.equal(locks.size,0);
 fail=false;await flush(commands,dependencies);await flush(commands,dependencies);assert.equal(calls,2);assert.equal(queued.size,0);
});
