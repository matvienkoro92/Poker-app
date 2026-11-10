const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadBroadcastRaffles}=require('../lib/raffle-broadcast-list');
const {enforceRedisBandwidthGuard}=require('../lib/redis-bandwidth-guard');
test('fresh broadcast scans all IDs in bounded pages without participant lookups or writes',async()=>{
 const ids=Array.from({length:582},(_,i)=>String(i));
 const pipeline=async(commands,options)=>{enforceRedisBandwidthGuard(commands,options);return commands.map(([op,key,a,b])=>{
  if(op==='LLEN')return {result:ids.length};
  if(op==='LRANGE')return {result:ids.slice(Number(a),Number(b)+1)};
  assert.equal(op,'GET');assert.match(key,/^poker_app:raffle:/);
  const id=key.split(':').at(-1);
  return {result:JSON.stringify({status:id==='581'?'active':'completed',title:'Ticket',endDate:'2099-01-01',participants:[{private:true}],winners:[],groups:[{count:1,prize:'1000 ₽'}]})};
 });};
 const rows=await loadBroadcastRaffles(pipeline);
 assert.equal(rows.length,1);assert.equal(rows[0].id,'581');assert.equal(rows[0].participants,undefined);assert.equal(rows[0].groups[0].prize,'1000 ₽');
});
test('incomplete storage response blocks broadcast instead of returning a partial list',async()=>{
 await assert.rejects(loadBroadcastRaffles(async()=>null));
 await assert.rejects(loadBroadcastRaffles(async c=>c[0][0]==='LLEN'?[{result:1}]:[{result:[]}]),/изменился/);
});
