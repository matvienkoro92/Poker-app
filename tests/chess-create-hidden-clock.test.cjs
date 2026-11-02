const test=require('node:test'),assert=require('node:assert/strict');
test('rapid chess ignores hidden nards turn time from older clients',async()=>{
 let room;const service=require('../lib/board-games-room')({load:async()=>room,create:async(id,value)=>{room=value;return true;},cas:async()=>true,random:()=> 'ABCDEFGHJK'});
 const view=await service.call('host',{action:'create',discipline:'chess',timeControl:'rapid-10',turnSeconds:45,side:'random',raceTo:1});
 assert.equal(view.roomId,'ABCDEFGHJK');assert.equal(view.timeControl.id,'rapid-10');assert.deepEqual(view.clockRemaining,[600000,600000]);assert.equal(view.turnSeconds,60);
});
