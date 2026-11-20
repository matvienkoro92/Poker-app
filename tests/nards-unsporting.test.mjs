import test from 'node:test';
import assert from 'node:assert/strict';
import {action,createGame,expireTurn} from '../scripts/board-games/engine.mjs';
import {backgammonLegal,unsportingActions} from '../scripts/board-games/backgammon.mjs';
import {botMove} from '../scripts/board-games/bot.mjs';

function position(points,turn=0){
 const state=createGame('long',{variant:'unsporting'});
 Object.assign(state,{phase:'roll',opening:false,turn});
 state.points.fill(0);
 for(const [index,count] of Object.entries(points))state.points[index]=count;
 return state;
}
const roll=(state,a,b=a)=>assert.equal(action(state,state.turn,{type:'roll'},[a,b]),true);
const step=(state,from,to,trick)=>{
 const move=backgammonLegal(state).find(item=>item.from===from&&item.to===to&&item.trick===trick);
 assert.ok(move,JSON.stringify({from,to,trick,available:backgammonLegal(state)}));
 assert.equal(action(state,state.turn,{type:'move',...move}),true);
};
const command=(state,type,count)=>assert.equal(action(state,state.turn,{type,count}),true);

test('1–1 moves own checkers backwards including for black, or plays normally when all are on the head',()=>{
 const s=position({0:14,3:1,12:-15});roll(s,1);step(s,3,2,'backward');
 assert.equal(s.points[2],1);assert.equal(s.dice.length,3);
 const black=position({0:15,12:-14,15:-1},1);roll(black,1);step(black,15,14,'backward');
 const head=position({0:15,12:-15});roll(head,1);assert.equal(head.trick,null);step(head,0,1);
});
test('2–2 moves opponent checkers and rejects a different player or forged trick',()=>{
 const s=position({0:15,12:-14,17:-1});roll(s,2);
 assert.equal(action(s,1,{type:'move',from:17,to:19,die:2,trick:'opponent'}),false);
 assert.equal(action(s,0,{type:'move',from:17,to:19,die:2}),false);
 step(s,17,19,'opponent');assert.equal(s.points[19],-1);assert.equal(s.points[0],15);
});
test('3–3 only allows the return on the first die, and needs three full spaces',()=>{
 const s=position({0:14,5:1,12:-12,14:-1,15:-1,20:-1});roll(s,3);
 assert.ok(!backgammonLegal(s).some(m=>m.from===14&&m.trick));
 step(s,15,12,'return');assert.equal(s.points[12],-13);assert.equal(s.trick,null);
 const skip=position({0:14,5:1,12:-14,20:-1});roll(skip,3);step(skip,5,8);
 assert.ok(!backgammonLegal(skip).some(m=>m.trick==='return'));
});
test('4–4 rewinds the full previous movement turn, preserves actual rolls and passes play back',()=>{
 const s=position({0:14,4:1,12:-15});roll(s,1,2);step(s,4,5);step(s,5,7);
 assert.equal(s.turn,1);roll(s,4);
 assert.ok(unsportingActions(s).some(m=>m.type==='rewind-turn'));
 command(s,'rewind-turn');assert.equal(s.turn,0);assert.equal(s.phase,'roll');assert.equal(s.points[4],1);
 assert.equal(s.points[7],0);assert.equal(s.moves.length,0);assert.equal(s.rollHistory.length,2);
 assert.equal(action(s,0,{type:'rewind-turn'}),false);
 const first=position({0:15,12:-15});roll(first,4);assert.deepEqual(unsportingActions(first),[]);
});
test('5–5 exchanges only single opposing checkers once',()=>{
 const s=position({0:14,4:1,12:-14,9:-1});roll(s,5);step(s,4,9,'swap');
 assert.equal(s.points[4],-1);assert.equal(s.points[9],1);
 assert.ok(!backgammonLegal(s).some(m=>m.trick==='swap'));
});
test('6–6 saves individual dice after moves, accumulates and spends without rolling',()=>{
 const s=position({0:14,1:1,12:-15});roll(s,6);
 step(s,1,7);command(s,'stash-six');assert.equal(s.sixReserve[0],1);assert.equal(s.dice.length,2);
 command(s,'stash-six');command(s,'stash-six');assert.equal(s.turn,1);
 roll(s,1,2);step(s,12,13);step(s,13,15);assert.equal(s.turn,0);
 roll(s,6);for(let i=0;i<4;i++)command(s,'stash-six');
 assert.equal(s.sixReserve[0],7);
 roll(s,2,3);step(s,15,17);step(s,17,20);assert.equal(s.turn,0);
 const acceptedRolls=s.rollCount;
 assert.equal(action(s,0,{type:'use-sixes',count:5}),false);
 command(s,'use-sixes',2);assert.equal(s.rollCount,acceptedRolls);
 assert.equal(s.rollHistory.length,acceptedRolls);
 assert.equal(s.sixReserve[0],5);assert.deepEqual(s.dice,[6,6]);
 assert.equal(action(s,0,{type:'stash-six'}),false);
});
test('blocked 6–6 remains playable as a saving action, including for the computer',()=>{
 const s=position({0:15,6:-1,12:-14});roll(s,6);
 assert.deepEqual(backgammonLegal(s),[]);
 assert.deepEqual(botMove(s),{type:'stash-six'});
});

test('Strong bot uses saved sixes to finish immediately',()=>{
 const state=position({18:1,12:-15});
 state.off[0]=14;
 state.sixReserve[0]=1;
 const before=structuredClone(state);
 assert.deepEqual(botMove(state,'hard'),{type:'use-sixes',count:1});
 assert.deepEqual(state,before);
 command(state,'use-sixes',1);
 const move=botMove(state,'hard');
 assert.equal(move.to,24);
 assert.equal(action(state,state.turn,move),true);
 assert.equal(state.winner,0);
});


test('A saved six is played before the normal roll and shares the head limit',()=>{
 const state=position({0:15,12:-15});
 state.turns[0]=1;
 state.sixReserve[0]=2;
 command(state,'use-sixes',1);
 step(state,0,6);
 assert.equal(state.turn,0);
 assert.equal(state.phase,'roll');
 assert.equal(state.ply,0);
 assert.deepEqual(unsportingActions(state),[]);
 roll(state,1,2);
 assert.ok(backgammonLegal(state).every(move=>move.from!==0));
 step(state,6,7);
 step(state,7,9);
 assert.equal(state.turn,1);
 assert.equal(state.turns[0],2);
 assert.equal(state.sixReserve[0],1);
});

test('Blocked saved sixes stay in reserve and the player still gets a normal roll',()=>{
 const state=position({0:15,6:-1,12:-14});
 state.sixReserve[0]=1;
 command(state,'use-sixes',1);
 assert.equal(state.turn,0);
 assert.equal(state.phase,'roll');
 assert.equal(state.sixReserve[0],1);
 roll(state,1,2);
 assert.equal(state.phase,'moving');
 assert.equal(state.rollCount,1);
});

test('A timeout during saved sixes also rolls and completes the ordinary turn',()=>{
 const state=position({0:15,12:-15});
 state.sixReserve[0]=1;
 command(state,'use-sixes',1);
 assert.equal(expireTurn(state,()=>[1,2]),true);
 assert.equal(state.turn,1);
 assert.equal(state.ply,1);
 assert.equal(state.rollCount,1);
 assert.equal(state.moves.length,3);
 assert.deepEqual(state.missedTurns,[1,0]);
});
