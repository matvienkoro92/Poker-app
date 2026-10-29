const test=require('node:test'),assert=require('node:assert/strict');
test('black host wager settles to white guest without swapping financial identities',async()=>{
 const f=require('./helpers/board-wager-fixture.cjs')();let r=await f.service.call('m1',{action:'create',discipline:'chess',side:'1',stake:1000,requestId:'chess_color_00000001',raceTo:1});const id=r.roomId;
 r=await f.service.call('m2',{action:'join',roomId:id});assert.equal(r.state.whitePlayer,1);assert.equal(r.state.turn,1);assert.equal(f.balances.get('p1'),9000);assert.equal(f.balances.get('p2'),9000);
 r=await f.service.call('m1',{action:'move',roomId:id,revision:r.revision,move:{type:'resign'}});assert.equal(r.state.winner,1);assert.equal(r.wager.status,'paid');assert.equal(f.balances.get('p1'),9000);assert.equal(f.balances.get('p2'),10900);
});
