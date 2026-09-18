const test=require('node:test'),assert=require('node:assert/strict');
const {mergeEv,validateEv}=require('../scripts/backfill-club-hand-ev.cjs');
const row={playerId:'123',handId:'h1',sessionId:'s1',mode:'cash',playedAt:'2026-09-07T00:00:00Z',resultMinor:-500,bigBlindMinor:100,cards:['Ah','Ad'],opponents:[{playerId:'456',name:'Player'}],position:'BTN'};
const ev={status:'calculated',method:'exact-runouts-fixed-deduction-v1',resultMinor:200.25,runouts:990};
const source={playerId:'123',method:ev.method,rows:[{...row,ev}]};
test('EV backfill preserves every existing field except EV',()=>{
 const result=mergeEv({playerId:'123',rows:[row],other:'keep'},source);assert.equal(result.changed,1);assert.deepEqual(result.data,{playerId:'123',other:'keep',rows:[{...row,ev}]});assert.equal(mergeEv(result.data,source).changed,0);
});
test('backfill rejects owner, hand count and immutable source conflicts',()=>{
 for(const bad of [{...source,playerId:'999'},{...source,rows:[]},{...source,rows:[{...row,resultMinor:2,ev}]},{...source,rows:[{...row,cards:['2h','2d'],ev}]}])assert.throws(()=>mergeEv({playerId:'123',rows:[row]},bad));
});
test('backfill rejects invalid EV and embedded private cards',()=>{
 for(const bad of [{...ev,resultMinor:NaN},{...ev,runouts:0},{...ev,method:'guess'},{status:'unresolved'},{...ev,holes:[['Ah','Kd']]},{...ev,detail:{opponents:[]}}])assert.throws(()=>validateEv(bad));
 validateEv({status:'unresolved',reason:'betting_after_allin_street',showdownEquity:{status:'calculated',share:0.5,opponents:2}});validateEv({status:'not_applicable'});validateEv({status:'unresolved',reason:'side_pot_deduction'});
 validateEv({...ev,method:'omaha-exact-2hole-3board-v1'});validateEv({...ev,method:'omaha-simulation-2hole-3board-v1',runouts:100000});
});
