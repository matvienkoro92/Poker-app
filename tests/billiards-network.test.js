const test=require('node:test'),assert=require('node:assert/strict');
test('polling retries room conflicts without reporting a connection outage',async t=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');
 t.mock.timers.enable({apis:['setTimeout']});
 let reads=0,updates=0;const errors=[],session=createSession({request:async body=>{if(body.action==='room'&&++reads===1){const e=Error('Комната обновляется');e.status=409;throw e;}return {roomId:'ABCDEFGHJK',revision:reads,ready:true};},onUpdate(){updates++;},onError(...args){errors.push(args);}});
 try{await session.start(true,'');t.mock.timers.tick(150);await new Promise(setImmediate);assert.equal(reads,1);assert.deepEqual(errors,[]);t.mock.timers.tick(650);await new Promise(setImmediate);assert.equal(reads,2);assert.equal(updates,2);}finally{session.close();t.mock.timers.reset();}
});
