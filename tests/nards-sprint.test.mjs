import test from 'node:test';
import assert from 'node:assert/strict';
import {action,createGame} from '../scripts/board-games/engine.mjs';
import {backgammonLegal} from '../scripts/board-games/backgammon.mjs';

function position(points, dice, turn=0){
 const state=createGame('long',{variant:'sprint'});
 Object.assign(state,{phase:'moving',opening:false,turn,dice:[...dice],roll:[...dice]});
 state.points.fill(0);
 for(const [index,count] of Object.entries(points))state.points[index]=count;
 return state;
}

function move(state,from,to){
 const step=backgammonLegal(state).find(item=>item.from===from&&item.to===to);
 assert.ok(step);
 assert.equal(action(state,state.turn,{type:'move',...step}),true);
}

test('Sprint starts on long heads and allows one checker off the head on a first double',()=>{
 const state=createGame('long',{variant:'sprint'});
 assert.deepEqual(state.points.filter(Boolean),[3,-3]);
 const active=position({0:3,12:-3},[3,3,3,3]);
 move(active,0,3);
 assert.ok(backgammonLegal(active).length);
 assert.ok(backgammonLegal(active).every(step=>step.from!==0));
});

test('Sprint hits on the way and on landing across the end of the board, preserving protected points',()=>{
 const state=position({22:-3,0:1,2:2,3:1},[5],1);
 move(state,22,3);
 assert.deepEqual(state.bar,[2,0]);
 assert.equal(state.points[0],0);
 assert.equal(state.points[2],2);
 assert.equal(state.points[3],-1);
});

test('Sprint prioritizes the bar and ends when the third checker is borne off',()=>{
 const state=position({10:2,3:-2,15:-1},[4,5]);
 state.bar[0]=1;
 assert.deepEqual(backgammonLegal(state),[{from:-1,to:4,die:5}]);
 move(state,-1,4);
 assert.equal(state.bar[0],0);
 assert.equal(state.points[4],1);

 const finish=position({23:1,17:-2},[1]);
 finish.off[0]=2;
 finish.bar[1]=1;
 move(finish,23,24);
 assert.equal(finish.winner,0);
 assert.equal(finish.off[0],3);
 assert.equal(finish.winKind,'koks');
});
