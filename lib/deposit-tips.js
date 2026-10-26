'use strict';
const actorKey=id=>String(id||'').replace(/^tg_/,'');
function availableLots(state,managerId,room){
 const used=new Map();for(const row of state.tipCashouts||[])if(!row.voidedAt)for(const part of row.tipAllocations||[])used.set(part.tipId,(used.get(part.tipId)||0)+part.amount);
 return (state.tips||[]).filter(t=>!t.voidedAt&&actorKey(t.createdBy)===actorKey(managerId)&&t.room===room).map(t=>({tip:t,available:t.amount-(used.get(t.id)||0)})).filter(t=>t.available>0).sort((a,b)=>a.tip.createdAt-b.tip.createdAt||a.tip.id.localeCompare(b.tip.id));
}
function tipAccounts(state){
 const rows=new Map();for(const t of state.tips||[]){if(t.voidedAt)continue;const key=actorKey(t.createdBy)+'|'+t.room;if(!rows.has(key))rows.set(key,{managerId:t.createdBy,managerName:t.createdByName||'Менеджер',room:t.room,received:0,cashedOut:0,balance:0});rows.get(key).received+=t.amount;}
 for(const r of rows.values()){r.balance=availableLots(state,r.managerId,r.room).reduce((n,t)=>n+t.available,0);r.cashedOut=r.received-r.balance;}return [...rows.values()];
}
function allocateTips(state,managerId,room,amount){let left=amount;const allocations=[];for(const lot of availableLots(state,managerId,room)){const taken=Math.min(left,lot.available);allocations.push({tipId:lot.tip.id,amount:taken});left-=taken;if(!left)return allocations;}const e=Error('Сумма больше остатка чаевых менеджера в выбранном руме.');e.status=409;throw e;}
module.exports={actorKey,availableLots,tipAccounts,allocateTips};
