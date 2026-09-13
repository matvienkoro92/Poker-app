const test=require('node:test'),assert=require('node:assert/strict');
const {actions,summarize}=require('../starting-hands/insights');
const h=(id,bb,extra={})=>({handId:String(id),sessionId:'a',playedAt:`2026-09-01T00:00:${String(id).padStart(2,'0')}Z`,bb,resultMinor:bb*100,bigBlindMinor:100,...extra});
test('drawdown measures peak to trough and first recovery, including initial losses',()=>{
 let s=summarize([h(1,10),h(2,-8),h(3,-5),h(4,13)]);
 assert.deepEqual(s.drawdown,{amount:13,startIndex:1,troughIndex:3,recovery:4,remaining:0});
 s=summarize([h(1,-5),h(2,2)]);assert.equal(s.drawdown.startIndex,0);assert.equal(s.drawdown.amount,5);assert.equal(s.drawdown.remaining,3);assert.equal(s.drawdown.recovery,null);
 assert.equal(summarize([]).drawdown.amount,0);
});
test('sessions and BB levels aggregate weighted bb/100 and preserve filters',()=>{
 const s=summarize([h(1,10),h(2,-2,{sessionId:'b',bigBlindMinor:200}),h(3,5)]);
 assert.equal(s.sessions.find(g=>g.key==='a').bb100,750);assert.equal(s.limits.length,2);assert.equal(s.wins.length,2);assert.equal(s.losses.length,1);
});
test('flop and showdown denominator excludes unknown showdown and preflop folds',()=>{
 const s=summarize([h(1,3,{showdown:true}),h(2,-2,{showdown:null}),h(3,1,{showdown:false}),h(4,2,{showdown:true})],{'1':{sawFlop:true},'2':{sawFlop:true},'3':{sawFlop:true}});
 assert.deepEqual(s.showdown,{loaded:3,total:4,sawFlop:3,eligible:2,count:1,profitable:1});
});
const e=(sequence,code,actorId='hero',board=[])=>({sequence,code,actorId,board});
test('action collections distinguish calls, raises, street and folded players',()=>{
 const a=actions({events:[e(0,'3','villain'),e(1,'3'),e(2,'94','table',['a','b','c']),e(3,'94','table',['a','b','c','d','e']),e(4,'2')]},'hero');
 assert.equal(a.threeBet,true);assert.equal(a.sawFlop,true);assert.equal(a.riverCall,true);
 const b=actions({events:[e(0,'3','villain'),e(1,'10'),e(2,'94','table',['a','b','c'])]},'hero');
 assert.equal(b.foldToRaise,true);assert.equal(b.sawFlop,false);
 assert.equal(actions({events:[e(0,'5','villain'),e(1,'3')]},'hero').threeBet,null);
 assert.equal(actions({events:[]},'hero'),null);
});
test('EV line replaces only calculated hands and normalizes by each blind',()=>{
 const core=require('../starting-hands/core');
 const hands=[h(1,10,{bigBlindMinor:100,ev:{status:'calculated',resultMinor:500}}),h(2,-20,{bigBlindMinor:200,ev:{status:'unresolved'}}),h(3,5,{bigBlindMinor:100,ev:{status:'not_applicable'}})];
 const s=core.profitSeries(hands,'bb');assert.equal(s.points.at(-1).allinEv,-10);assert.equal(s.evCalculated,1);assert.equal(s.evUnresolved,1);assert.equal(s.evMissing,0);
 const missing=core.profitSeries([h(1,2)],'bb');assert.equal(missing.evMissing,1);assert.equal(missing.evCalculated,0);
});
test('EV collections use deviation rather than profit, normalize blinds and exclude unavailable EV',()=>{
 const calculated=(id,actual,expected,blind=100)=>h(id,actual/blind,{resultMinor:actual,bigBlindMinor:blind,ev:{status:'calculated',resultMinor:expected}});
 const rows=[calculated(1,1000,5000),calculated(2,-1000,-5000),calculated(3,0,6000,200),calculated(4,0,-12000,200),calculated(5,0,2999),h(6,-100,{ev:{status:'unresolved',grossEv:{resultMinor:10000}}}),h(7,100),calculated(8,10000,0,0),calculated(9,0,NaN)];
 const c=summarize(rows).collections;
 assert.deepEqual(c.evBelow.map(h=>h.handId),['1','3']);
 assert.deepEqual(c.evAbove.map(h=>h.handId),['4','2']);
 assert.equal(summarize([rows[2]]).collections.evBelow.length,1);
});
