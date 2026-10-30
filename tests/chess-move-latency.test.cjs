'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../scripts/board-games/main.mjs'),'utf8');
async function harness(){const engine=await import('../scripts/board-games/engine.mjs');let resolve,reject;const c={boardDice:{busy:false},state:engine.createGame('chess'),wager:null,spectator:false,busy:false,ready:true,mode:'online',kind:'chess',generation:1,revision:4,roomId:'ABCDEFGHJK',player:0,pollTimer:null,timeControl:null,clockRemaining:null,deadline:null,clockOffset:0,TC:require('../lib/chess-time-controls'),Date,renderClock(){},optimisticRevision:null,pendingChessMove:false,premove:null,selected:'e2',structuredClone,clearTimeout,action:engine.action,rendered:[],renderBoard(transition){c.rendered.push({ply:c.state.ply,transition});},renderControls(){},render(){},schedulePoll(){},error(message){c.message=message;},request(body){c.requestBody=body;return new Promise((a,b)=>{resolve=a;reject=b;});},adopt(d){c.state=d.state;c.revision=d.revision;c.optimisticRevision=null;}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('async function send(m)'),source.indexOf('function resetLocalClock()')),c);return {c,resolve:d=>resolve(d),reject:e=>reject(e)};}
test('chess piece moves before a delayed server response and blocks duplicate input',async()=>{const h=await harness(),move={type:'move',from:'e2',to:'e4'},pending=h.c.send(move);assert.equal(h.c.state.ply,1);assert.equal(h.c.state.turn,1);assert.equal(h.c.rendered[0].ply,1);assert.equal(h.c.busy,true);assert.equal(await h.c.send(move),false);assert.equal(h.c.requestBody.revision,4);h.resolve({state:structuredClone(h.c.state),revision:5});assert.equal(await pending,true);assert.equal(h.c.state.ply,1);assert.equal(h.c.busy,false);});
test('a rejected chess move restores the confirmed board without losing server revision',async()=>{const h=await harness(),fen=h.c.state.fen,pending=h.c.send({type:'move',from:'e2',to:'e4'});assert.notEqual(h.c.state.fen,fen);h.reject(Error('Позиция уже изменилась'));assert.equal(await pending,false);assert.equal(h.c.state.fen,fen);assert.equal(h.c.revision,4);assert.equal(h.c.optimisticRevision,null);assert.equal(h.c.busy,false);});

test('5+3 increment and clock switch are immediate and roll back on rejection',async()=>{
 const h=await harness(),before=100000;h.c.Date={now:()=>before};h.c.timeControl=h.c.TC.find('blitz-5-3');h.c.clockRemaining=[300000,280000];h.c.deadline=before+295000;
 const pending=h.c.send({type:'move',from:'e2',to:'e4'});
 assert.equal(h.c.clockRemaining[0],298000);assert.equal(h.c.clockRemaining[1],280000);assert.equal(h.c.deadline,before+280000);
 const frozen=h.c.clockRemaining[0];await new Promise(r=>setTimeout(r,15));assert.equal(h.c.clockRemaining[0],frozen);
 h.reject(Error('Ход отклонён'));await pending;assert.deepEqual(h.c.clockRemaining,[300000,280000]);assert.equal(h.c.deadline,before+295000);assert.equal(h.c.state.turn,0);
});
test('rejected move discards input queued against the optimistic position',async()=>{
 const h=await harness(),pending=h.c.send({type:'move',from:'e2',to:'e4'});
 assert.equal(h.c.pendingChessMove,true);h.c.premove={from:'g1',to:'f3'};h.c.selected='g1';
 h.reject(Error('Ход отклонён'));await pending;
 assert.equal(h.c.pendingChessMove,false);assert.equal(h.c.premove,null);assert.equal(h.c.selected,null);
});
