const test = require('node:test');
const assert = require('node:assert/strict');
const { pay } = require('../lib/rakeback-cash-payout');
const row = { groupId: 'test-row', kind: 'base', createdAt: 1, room: 'P21', saved: true, playerId: '123456' };
function fixture(send) {
  const store = new Map();
  return { send, redis: async cmds => cmds.map(([op,key,value,nx]) => {
    if (op === 'GET') return {result:store.get(key)||null};
    if (nx === 'NX' && store.has(key)) return {result:null};
    store.set(key,value);return {result:'OK'};
  }) };
}
test('concurrent and repeated clicks credit exactly once, even after row amount changes', async () => {
  let count=0;const deps=fixture(async()=>{count++;return {operation:{orderId:'order'}};});
  await Promise.all([pay(row,1000,'admin',deps),pay(row,1000,'admin',deps)]);
  const replay=await pay({...row,playerId:'654321'},500,'admin',deps);
  assert.equal(count,1);assert.equal(replay.status,'paid');assert.equal(replay.playerId,'123456');assert.equal(replay.amount,1000);
});
test('over-limit, zero, unsaved and non-Poker21 rows cannot pay',async()=>{
  let count=0;const deps=fixture(async()=>{count++;});
  for(const [r,a] of [[row,1001],[row,0],[row,-1],[{...row,saved:false},500],[{...row,room:'X'},500]]) await assert.rejects(pay(r,a,'admin',deps));
  assert.equal(count,0);
});
test('uncertain remote result retains permanent reservation and never retries transfer',async()=>{
  let count=0;const deps=fixture(async()=>{count++;throw Error('timeout');});
  await assert.rejects(pay(row,500,'admin',deps));
  assert.equal((await pay(row,500,'admin',deps)).status,'processing');assert.equal(count,1);
});
test('batch status uses one MGET for all requested rows', async () => {
  const {statuses}=require('../lib/rakeback-cash-payout');let calls=0;
  const result=await statuses([row,{...row,groupId:'other'}],async cmds=>{
    calls++;assert.equal(cmds.length,1);assert.equal(cmds[0][0],'MGET');assert.equal(cmds[0].length,3);
    return [{result:[JSON.stringify({status:'paid'}),null]}];
  });
  assert.equal(calls,1);assert.deepEqual(result,[{status:'paid'},null]);
});
