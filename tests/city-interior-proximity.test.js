const test=require('node:test'),assert=require('node:assert/strict');
test('distant players do not load interiors; approaching and repeated requests share one load',async()=>{
 const {createInteriorProximity}=await import('../scripts/city-game/interior-proximity.mjs');let calls=0,finish;
 const gate=createInteriorProximity(()=>{calls++;return new Promise(resolve=>{finish=resolve;});},{x:98,z:147});
 gate.update({x:-24,z:-8});await Promise.resolve();assert.equal(calls,0);assert.equal(gate.state,'idle');
 gate.update({x:98,z:190});const first=gate.ensure();assert.equal(first,gate.ensure());await Promise.resolve();assert.equal(calls,1);assert.equal(gate.state,'loading');finish(true);await first;gate.update({x:98,z:147});await gate.ensure();assert.equal(calls,1);assert.equal(gate.state,'ready');
});
test('failed loads retain a retry delay, then permit a fresh attempt',async()=>{
 const {createInteriorProximity}=await import('../scripts/city-game/interior-proximity.mjs');let clock=0,calls=0;const gate=createInteriorProximity(async()=>{if(++calls===1)throw Error('offline');return true;},{x:0,z:0,now:()=>clock});
 assert.equal(await gate.ensure(),false);assert.equal(gate.state,'failed');await gate.ensure();assert.equal(calls,1);clock=30001;assert.equal(await gate.ensure(),true);assert.equal(calls,2);
});
test('disposing a scene before a scheduled load prevents the resource request',async()=>{
 const {createInteriorProximity}=await import('../scripts/city-game/interior-proximity.mjs');let disposed=false,calls=0;const gate=createInteriorProximity(()=>{calls++;},{x:0,z:0,disposed:()=>disposed});const pending=gate.ensure();disposed=true;await pending;await gate.ensure();assert.equal(calls,0);assert.equal(gate.state,'disposed');
});
