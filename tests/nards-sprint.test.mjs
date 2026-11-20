import test from 'node:test';
import assert from 'node:assert/strict';
import {action,createGame} from '../scripts/board-games/engine.mjs';
import {backgammonLegal} from '../scripts/board-games/backgammon.mjs';

function position(points, dice, turn=0){
 const state=createGame('long',{variant:'sprint'});
 delete state.sprintShortRules;
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

test('Existing sprint rooms still allow only one checker off the head on a first double',()=>{
 const active=position({0:3,12:-3},[3,3,3,3]);
 move(active,0,3);
 assert.ok(backgammonLegal(active).length);
 assert.ok(backgammonLegal(active).every(step=>step.from!==0));
});

test('Existing sprint rooms hit on the way and on landing across the end of the board, preserving protected points',()=>{
 const state=position({22:-3,0:1,2:2,3:1},[5],1);
 move(state,22,3);
 assert.deepEqual(state.bar,[2,0]);
 assert.equal(state.points[0],0);
 assert.equal(state.points[2],2);
 assert.equal(state.points[3],-1);
});

test('Existing sprint rooms prioritize the bar and ends when the third checker is borne off',()=>{
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

test('Five-checker sprint starts with five per side and ends on the fifth bear-off',()=>{
 const state=createGame('long',{variant:'sprint',sprintCheckers:5});
 assert.deepEqual(state.points,[...Array(5).fill(1),...Array(14).fill(0),...Array(5).fill(-1)]);
 state.points.fill(0);
 state.points[23]=2;
 state.points[12]=-5;
 Object.assign(state,{phase:'moving',opening:false,dice:[1,1],roll:[1,1],off:[3,0]});
 move(state,23,24);
 assert.equal(state.winner,null);
 move(state,23,24);
 assert.equal(state.winner,0);
 assert.equal(state.off[0],5);
});


test('Three-checker sprint starts on points 22–24 and uses both opening dice',()=>{
 const state=createGame('long',{variant:'sprint'});
 assert.deepEqual(state.points,[1,1,1,...Array(18).fill(0),-1,-1,-1]);
 assert.equal(action(state,0,{type:'roll'},[3,3]),true);
 assert.equal(state.phase,'opening');
 assert.equal(action(state,0,{type:'roll'},[1,2]),true);
 assert.equal(state.turn,1);
 assert.equal(state.phase,'moving');
 assert.deepEqual(state.dice,[1,2]);
 move(state,21,19);
 move(state,22,21);
 assert.equal(state.turn,0);
});

test('New sprint rooms hit only on landing and enter the bar on the short route',()=>{
 const state=position({20:-1,19:1,17:1,16:1},[4],1);
 state.sprintShortRules=true;
 move(state,20,16);
 assert.equal(state.points[19],1);
 assert.equal(state.points[17],1);
 assert.equal(state.bar[0],1);
 assert.equal(action(state,0,{type:'roll'},[1,2]),true);
 assert.ok(backgammonLegal(state).every(move=>move.from===-1));
 move(state,-1,1);
 assert.equal(state.bar[0],0);
});
