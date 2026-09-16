const test=require('node:test'),assert=require('node:assert/strict');const {CACHE_TTL_SECONDS,lifetimePrizes,lifetimePrizesCacheKey}=require('../lib/daily-poker-lifetime');
test('lifetime includes older dated games and deduplicates recent list',async()=>{
 const rows=await lifetimePrizes(['ID123456'],{pipeline:async cmds=>cmds.map(([cmd,key])=>({result:cmd==='GET'?null:cmd==='SCAN'?['0',['poker_app:daily_poker_games_date:ID123456:2026-01-01']]:cmd==='LRANGE'?(key.includes('games_date')?['old','new']:['new']):'OK'})),readGames:async ids=>{assert.deepEqual(ids.sort(),['new','old']);return ids.map(id=>({result:JSON.stringify({ticketAmount:id==='old'?1000:0,bonusAmount:id==='new'?100:0})}))},prizeTotals:g=>g});assert.deepEqual(rows,{ticketAmount:1000,bonusAmount:100});
});
test('incomplete archive is not reported as a zero or partial total',async()=>{
 await assert.rejects(lifetimePrizes(['ID123456'],{pipeline:async cmds=>cmds.map(([cmd])=>({result:cmd==='GET'?null:cmd==='SCAN'?['0',[]]:['missing']})),readGames:async()=>[{result:null}],prizeTotals:()=>({})}),/Incomplete archive/);
});
test('lifetime cache is stable across linked account order and lasts one day',async()=>{
 assert.equal(lifetimePrizesCacheKey(['ID2','ID1','ID2']),lifetimePrizesCacheKey(['ID1','ID2']));
 let written;
 await lifetimePrizes(['ID1'],{pipeline:async cmds=>{written=cmds;return cmds.map(([cmd])=>({result:cmd==='GET'?null:cmd==='SCAN'?['0',[]]:cmd==='LRANGE'?[]:'OK'}));},readGames:async()=>[],prizeTotals:g=>g});
 assert.deepEqual(written,[['SET',lifetimePrizesCacheKey(['ID1']),JSON.stringify({ticketAmount:0,bonusAmount:0}),'EX',String(CACHE_TTL_SECONDS)]]);
});
