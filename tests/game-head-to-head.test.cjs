'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),read=require('../lib/game-head-to-head');
test('head-to-head merges free and paid results, uses stable account IDs and preserves left/right order',async()=>{
 const rivals=require('../lib/game-rivalries'),stats=require('../lib/board-games-stats'),oldRead=rivals.read,oldMigration=stats.migrateLegacy;
 stats.migrateLegacy=async()=>({unresolved:0});rivals.read=async({base,accountId})=>{assert.equal(accountId,'ID111111');return {rivalries:[{id:'ID222222',wins:base.includes(':free:')?3:2,losses:base.includes(':free:')?1:2,pointsWon:base.includes(':free:')?6:3,pointsLost:base.includes(':free:')?2:5,draws:1},{id:'ID333333',wins:99,losses:0,draws:0}]};};
 try{const commands=async rows=>rows.map(([op])=>op==='GET'?JSON.stringify({expires:Date.now()+60000,state:{discipline:'long'},playerProfiles:[{accountId:'ID111111',name:'Одинаковое имя'},{accountId:'ID222222',name:'Одинаковое имя'}]}):JSON.stringify({wins:2,losses:1}));const result=await read({commands,roomId:'ABCDEFGHJK'});assert.deepEqual(result.headToHead,{wins:[5,3],points:[9,7],draws:2,complete:true});assert.ok(!JSON.stringify(result).includes('ID111111'));await assert.rejects(read({commands,roomId:'invalid'}),e=>e.status===400);}finally{rivals.read=oldRead;stats.migrateLegacy=oldMigration;}
});
