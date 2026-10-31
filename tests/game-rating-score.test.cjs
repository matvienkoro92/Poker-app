'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{score,rankPlayers}=require('../lib/game-rating-score');
test('rating balances winning proportion with evidence from completed games',()=>{
 assert.equal(score({wins:0,losses:0,draws:0}),0);
 assert.ok(score({wins:20,losses:5})>score({wins:100,losses:900}));
 assert.ok(score({wins:20,losses:0})>score({wins:1,losses:0}));
 assert.ok(score({wins:10,losses:1})>score({wins:10,losses:20}));
 assert.ok(score({wins:10,draws:1})>score({wins:10,losses:1}));
 for(let w=0;w<20;w++)for(let l=0;l<20;l++)for(let d=0;d<4;d++){const stats={wins:w,losses:l,draws:d},n=score(stats);assert.ok(Number.isFinite(n)&&n>=0);assert.ok(score({...stats,wins:w+1})>n);assert.ok(score({...stats,losses:l+1})<=n);assert.ok(score({...stats,draws:d+1})>n);if(w+d)assert.ok(score({wins:w*2,losses:l*2,draws:d*2})>n);}
});
test('zero-game users stay unranked and ties are deterministic without changing counters',()=>{
 const input=[{id:'A',wins:20,losses:5,draws:0},{id:'B',wins:100,losses:900,draws:0},{id:'C',wins:20,losses:5,draws:0},{id:'D',wins:0,losses:0,draws:0}],before=structuredClone(input);
 const ranked=rankPlayers(input);assert.deepEqual(ranked.map(p=>p.id),['C','A','B']);assert.equal(ranked[0].rank,1);assert.equal(ranked[1].rank,2);assert.ok(ranked[0].ratingScore>0);assert.deepEqual(input,before);
});

test('larger winning record matters more than a short unbeaten streak',()=>{assert.ok(score({wins:10,losses:10})>score({wins:5,losses:0}));assert.ok(score({wins:17,losses:16,draws:2})>score({wins:8,losses:1,draws:1}));assert.equal(score({wins:10,losses:0}),500);assert.equal(score({wins:0,losses:100}),0);});
