'use strict';
const {depositPlayerDirectory}=require('./deposit-player-directory');
const actorKey=x=>String(x||'').replace(/^tg_/,'');
function recentPlayers(state,actor){
 const times=new Map();function add(r){if(!r||r.voidedAt||actorKey(r.createdBy)!==actorKey(actor))return;const parts=r.allocations||[{depositorRoom:r.depositorRoom||r.room,depositorId:r.depositorId||r.playerId}];for(const p of parts){const k=p.depositorRoom+'|'+p.depositorId;times.set(k,Math.max(times.get(k)||0,r.createdAt||0));}}
 for(const r of state.channelOperations||[])add(r);
 for(const e of state.entries||[]){if(e.deletedAt)continue;for(const p of e.payments||[])add(p);}
 return depositPlayerDirectory(state).filter(p=>times.has(p.room+'|'+p.playerId)).map(p=>({...p,lastUsedAt:times.get(p.room+'|'+p.playerId)})).sort((a,b)=>b.lastUsedAt-a.lastUsedAt);
}
module.exports={recentPlayers};
