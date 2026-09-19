const test=require('node:test'),assert=require('node:assert/strict');
const opponents=require('../lib/hand-opponents');
const core=require('../lib/hand-statistics');
const e=(actorId,code,amount=0)=>({actorId,code,amount});
const board={board:['As','Kd','4c']};
function run(events){return opponents({events:events.map((event,sequence)=>({...event,sequence}))},'h');}
test('seated players and immediate folds are excluded',()=>{
 assert.deepEqual(run([e('x','3',3),e('h','10')]),[]);
 assert.deepEqual(run([e('h','3',3),e('x','10')]),[]);
});
test('early caller who folds before the contest with another opponent is excluded',()=>{
 assert.deepEqual(run([e('h','3',3),e('x','2',3),e('y','2',3),board,e('h','20',4),e('x','10'),e('y','2',4)]),['y']);
});
test('heads-up call, showdown and fold against hero count',()=>{
 assert.deepEqual(run([e('h','3',3),e('x','2',3),board,e('h','17'),e('x','17')]),['x']);
 assert.deepEqual(run([e('h','3',3),e('x','2',3),board,e('h','20',4),e('x','10')]),['x']);
 assert.deepEqual(run([e('h','3',3),e('x','3',9),e('h','10')]),['x']);
});
test('all-in raise and call identify the actual opponent',()=>{
 assert.deepEqual(run([e('h','3',3),e('x','5',30),e('h','10')]),['x']);
 assert.deepEqual(run([e('h','5',30),e('x','2',30)]),['x']);
});
test('multiway showdown keeps remaining opponents and excludes folded player',()=>{
 assert.deepEqual(run([e('h','3',3),e('x','2',3),e('y','2',3),e('z','2',3),board,e('z','10'),e('h','17'),e('x','17'),e('y','17')]),['x','y']);
});
test('search requires verified confrontation but ID search remains available',()=>{
 const row={handId:'123',opponents:[{playerId:'x',name:'Cooler'}]};
 assert.equal(core.matchesSearch(row,{opponentQuery:'cool'}),false);
 assert.equal(core.matchesSearch(row,{handQuery:'12'}),true);
 assert.equal(core.matchesSearch({...row,contestedOpponentIds:['x']},{opponentQuery:'cool'}),true);
});
