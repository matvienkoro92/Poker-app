'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createCashPoll,TIMER_KEY}=require('../lib/raffle-cash-poll');
const {needsFollowup}=require('../lib/raffle-cash-seating');
function fixture() {
  let count=1, fail=false;const db=new Map(),calls=[];
  const redis=async commands=>commands.map(([op,key,...args])=>{
    if(op==='SCARD')return {result:count};
    if(op==='SET'){if(db.has(key))return {result:null};db.set(key,args[0]);return {result:'OK'};}
    if(op==='EVAL'){const [,lock,token]=args;return {result:db.get(lock)===token?Number(db.delete(lock)):0};}
    throw Error(op);
  });
  const poll=createCashPoll({redis,env:{APP_URL:'https://club.example',QSTASH_TOKEN:'test',CRON_SECRET:'test'},publish:async(url,options)=>{calls.push({url,options});return {ok:!fail};}});
  return {poll,calls,db,count:value=>count=value,fail:value=>fail=value};
}
test('one shared 30 second timer for all pending winners, no duplicates',async()=>{
  const f=fixture();assert.equal((await f.poll.schedule()).scheduled,true);
  assert.equal(f.calls[0].options.headers['Upstash-Delay'],'30s');
  assert.equal((await f.poll.schedule()).alreadyScheduled,true);assert.equal(f.calls.length,1);
  const token=f.db.get(TIMER_KEY);await f.poll.consume('stale');assert.equal(f.db.get(TIMER_KEY),token);
  await f.poll.consume(token);await f.poll.schedule();assert.equal(f.calls.length,2);
});
test('stop scheduling immediately once everyone is resolved',async()=>{
  const f=fixture();f.count(0);assert.equal(await f.poll.pending(),false);assert.equal((await f.poll.schedule()).scheduled,false);assert.equal(f.calls.length,0);
});
test('publish failure releases reservation so normal cron can repair the timer',async()=>{
  const f=fixture();f.fail(true);await assert.rejects(f.poll.schedule(),/scheduling failed/);assert.equal(f.db.has(TIMER_KEY),false);
  f.fail(false);assert.equal((await f.poll.schedule()).scheduled,true);
});
test('watch from results through readiness and payout, stop on rejection, expiry, seating or return',()=>{
  const now=Date.now();
  assert.equal(needsFollowup({winnerReadyDeadlineAt:new Date(now+60000).toISOString()},now),true);
  assert.equal(needsFollowup({winnerReadyDeadlineAt:new Date(now-1).toISOString()},now),false);
  assert.equal(needsFollowup({winnerReadyState:'ready'},now),true);
  assert.equal(needsFollowup({winnerStatus:'fail',winnerReadyState:'ready'},now),false);
  for(const status of ['pending','returning'])assert.equal(needsFollowup({cashSeatingMonitor:{status}},now),true);
  for(const status of ['seated','returned'])assert.equal(needsFollowup({cashSeatingMonitor:{status}},now),false);
});
