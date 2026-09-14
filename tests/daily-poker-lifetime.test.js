const test=require('node:test'),assert=require('node:assert/strict');const {lifetimePrizes}=require('../lib/daily-poker-lifetime');
test('lifetime includes older dated games and deduplicates recent list',async()=>{
 const rows=await lifetimePrizes(['ID123456'],{pipeline:async cmds=>cmds.map(([cmd,key])=>({result:cmd==='GET'?null:cmd==='SCAN'?['0',['poker_app:daily_poker_games_date:ID123456:2026-01-01']]:cmd==='LRANGE'?(key.includes('games_date')?['old','new']:['new']):'OK'})),readGames:async ids=>{assert.deepEqual(ids.sort(),['new','old']);return ids.map(id=>({result:JSON.stringify({ticketAmount:id==='old'?1000:0,bonusAmount:id==='new'?100:0})}))},prizeTotals:g=>g});assert.deepEqual(rows,{ticketAmount:1000,bonusAmount:100});
});
test('incomplete archive is not reported as a zero or partial total',async()=>{
 await assert.rejects(lifetimePrizes(['ID123456'],{pipeline:async cmds=>cmds.map(([cmd])=>({result:cmd==='GET'?null:cmd==='SCAN'?['0',[]]:['missing']})),readGames:async()=>[{result:null}],prizeTotals:()=>({})}),/Incomplete archive/);
});
