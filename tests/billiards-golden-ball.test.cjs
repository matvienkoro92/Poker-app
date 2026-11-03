'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const engine=()=>import('../scripts/billiards/engine.mjs');
async function pot(s,id,foul=false){const E=await engine();s.breakPending=false;assert.ok(E.shoot(s,0,.05));for(const b of s.balls){b.vx=b.vy=b.rollX=b.rollY=b.side=0;}s.balls.find(b=>b.id===id).pocket=true;s.sunk=[id];s.firstHit=foul?null:1;s.pyramidLegal=true;E.step(s);}
test('golden ball is deterministic, pyramid only and ordinary mode stays unchanged',async()=>{
 const E=await engine();for(let seed=1;seed<50;seed++){const a=E.createGame({discipline:'pyramid',goldenBall:true,seed});assert.ok(a.goldenBallId>=1&&a.goldenBallId<=15);assert.equal(a.goldenBallId,E.createGame({discipline:'pyramid',goldenBall:true,seed}).goldenBallId);assert.ok(E.validState(a));}
 assert.equal(E.createGame({discipline:'pool8',goldenBall:true}).goldenBall,false);assert.equal(E.createGame({discipline:'pyramid'}).goldenBallId,null);
});
test('legal golden pot gives two points and wins at eight without duplicate ball captures',async()=>{
 const E=await engine(),s=E.createGame({discipline:'pyramid',goldenBall:true,seed:123});const others=s.balls.filter(b=>b.id!==s.goldenBallId&&b.id!==0).slice(0,6);s.captured[0]=others.map(b=>b.id);for(const b of others)b.pocket=true;s.scores=[6,0];await pot(s,s.goldenBallId);assert.deepEqual(s.scores,[8,0]);assert.equal(s.captured[0].length,7);assert.equal(s.winner,0);assert.equal(s.goldenBallOwner,0);assert.ok(E.validState(s));
});
test('foul does not award golden bonus; penalty removal is one point and partial rerack preserves target',async()=>{
 const E=await engine(),s=E.createGame({discipline:'pyramid',goldenBall:true,seed:123}),id=s.goldenBallId;await pot(s,id,true);assert.deepEqual(s.scores,[0,0]);assert.equal(s.balls.find(b=>b.id===id).pocket,false);assert.equal(s.goldenBallOwner,null);s.pending.illegalBreak=true;assert.ok(E.action(s,1,{type:'decision',choice:'rerack-self',ballId:id}));assert.deepEqual(s.scores,[0,1]);assert.equal(s.goldenBallId,id);assert.equal(s.goldenBallOwner,null);assert.ok(E.validState(s));
});
test('ordinary pyramid still counts one per ball',async()=>{const E=await engine(),s=E.createGame({discipline:'pyramid'});await pot(s,2);assert.deepEqual(s.scores,[1,0]);});
test('host setting and server target survive guests, spectators and rematch',async()=>{
 const rooms=new Map(),base=require('../lib/billiards-room')({profile:async()=>({name:'Player',level:1}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{rooms.set(id,structuredClone(r));return true;}});
 await assert.rejects(base.call('a',{action:'create',discipline:'pool8',goldenBall:true}),e=>e.status===400);
 await assert.rejects(base.call('a',{action:'create',discipline:'pyramid',goldenBall:'yes'}),e=>e.status===400);
 const host=await base.call('a',{action:'create',discipline:'pyramid',goldenBall:true,goldenBallId:999});const id=host.state.goldenBallId;
 for(const [member,action]of [['b','join'],['c','watch']]){const v=await base.call(member,{action,roomId:host.roomId,goldenBall:false,goldenBallId:999});assert.equal(v.state.goldenBallId,id);assert.equal(v.state.goldenBall,true);}
 const r=rooms.get(host.roomId);r.state.winner=0;r.match.winner=0;r.match.wins=[1,0];r.match.creditedRound=r.match.round;
 await base.call('a',{action:'rematch',roomId:r.id,revision:r.revision});const current=rooms.get(r.id);const next=await base.call('b',{action:'rematch',accept:true,roomId:r.id,revision:current.revision});assert.equal(next.state.goldenBall,true);assert.ok(next.state.goldenBallId>=1&&next.state.goldenBallId<=15);assert.equal(next.state.goldenBallOwner,null);assert.deepEqual(next.state.scores,[0,0]);
});
test('paid table stores the golden format in its durable wager settings',async()=>{
 const f=require('./helpers/billiards-wager-fixture.cjs')();
 const h=await f.service.call('m1',{action:'create',discipline:'pyramid',goldenBall:true,stake:100,requestId:'golden_paid_000001'});
 assert.equal(h.state.goldenBall,true);assert.equal(f.journals.get(h.roomId).settings.goldenBall,true);
 const g=await f.call('m2','join',h.roomId,{goldenBall:false});assert.equal(g.state.goldenBallId,h.state.goldenBallId);
});
