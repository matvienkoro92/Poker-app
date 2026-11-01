'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{transition}=require('../lib/game-rating-transition');
const event=(winner=0,extras={})=>({room:{playerProfiles:[{accountId:'a'},{accountId:'b'}],state:{winner,discipline:'long',endReason:'borne-off',...extras}}});
test('result rank movement removes this game for both players while retaining other leaderboard rows',()=>{
 const rows=[{id:'a',name:'A',wins:2,losses:0},{id:'b',name:'B',wins:1,losses:1},{id:'c',name:'C',wins:1,losses:2}];
 const r=transition({rows,event:event(),accountId:'a'});assert.equal(r.before.rank,2);assert.equal(r.after.rank,1);assert.equal(r.ladder[0].name,'A');assert.equal(r.ladder[1].name,'B');assert.equal(r.ladder[0].beforeRank,2);assert.equal(rows[0].wins,2);
});
test('paid koks and buy-in coefficients are removed exactly, including the losing side',()=>{
 const rows=[{id:'a',wins:2,losses:0,weightedWins:4.5,weightedLosses:0},{id:'b',wins:1,losses:1,weightedWins:1,weightedLosses:2}];
 const r=transition({rows,event:event(0,{winKind:'koks'}),accountId:'a',mode:'paid',stake:400});const score=require('../lib/game-rating-score').score({weightedWins:1.5,weightedLosses:0});assert.equal(r.before.ratingScore,Math.round(score*100)/100);assert.ok(r.after.ratingScore>r.before.ratingScore);
});
test('draws leave rating unchanged; first decisive result enters the table without an invented previous rank',()=>{
 const rows=[{id:'a',wins:1,losses:0},{id:'b',wins:0,losses:1}];let r=transition({rows,event:event('draw'),accountId:'a'});assert.deepEqual(r.before,r.after);assert.equal(r.ladder.length,0);
 r=transition({rows,event:event(),accountId:'a'});assert.equal(r.before.rank,null);assert.equal(r.after.rank,1);assert.equal(r.ladder.length,0);
 assert.equal(transition({rows,event:event(),accountId:'outsider'}),null);
});
for(const mode of ['free','paid'])test(mode+': rating read API returns the result-specific transition from its recorded receipt',async()=>{
 const stats=require('../lib/board-games-stats'),base=stats.PREFIX+'long:'+mode+':',eventId='ABCDEFGHJK:1:1';
 const record=event(0,{winKind:'koks'});record.room.id='ABCDEFGHJK';record.room.gameXpStake=400;record.room.wagered=mode==='paid';
 const players=Object.fromEntries([{id:'a',name:'A',wins:2,losses:0},{id:'b',name:'B',wins:1,losses:1}].map(r=>[r.id,JSON.stringify(r)]));
 const commands=async rows=>rows.map(([op,key,arg])=>{if(op==='HGETALL')return key===base+'players'?players:key===base+'results'?{[eventId]:JSON.stringify(record)}:{};if(op==='HGET')return key===base+'results'&&arg===eventId?JSON.stringify(record):key===base+'players'?players[arg]||null:null;if(op==='LRANGE')return [];if(op==='GET')return key.endsWith('backfill-complete')?'1':null;throw Error(op);});
 const data=await stats.read({commands,discipline:'long',accountId:'a',mode,migration:false,resultEvent:eventId});assert.equal(data.resultProgress.after.rank,data.self.rank);assert.equal(data.resultProgress.after.ratingScore,data.self.ratingScore);assert.equal(data.resultProgress.before.ratingScore,9.09);assert.ok(data.resultProgress.after.ratingScore>9.09);
 const foreign=await stats.read({commands,discipline:'long',accountId:'outsider',mode,migration:false,resultEvent:eventId});assert.equal(foreign.resultProgress,undefined);
});
