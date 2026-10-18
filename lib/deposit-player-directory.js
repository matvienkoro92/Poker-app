'use strict';
const nicknames=require('../rating-player-id-map.json');
const {depositPlayerAliases}=require('./deposit-player-aliases');
function depositPlayerDirectory(state){
 const rows=new Map(),rooms=['P21','X','Supr','PP'];
 function add(room,id,name,at=0){id=String(id||'').trim();if(!rooms.includes(room)||!/^[a-zA-Z0-9_-]{1,64}$/.test(id))return;const key=room+'|'+id;let row=rows.get(key);if(!row){row={room,playerId:id,profileKey:key,aliases:room==='P21'?depositPlayerAliases(nicknames[id]):[],nick:room==='P21'?String(nicknames[id]||''):'',name:'',lastUsedAt:0};rows.set(key,row);}if(name)row.name=String(name).trim();row.lastUsedAt=Math.max(row.lastUsedAt,at||0);}
 function deposit(record){for(const p of record.allocations||[{depositorRoom:record.depositorRoom||record.room,depositorId:record.depositorId||record.playerId}])add(p.depositorRoom,p.depositorId,'',record.createdAt);}
 for(const [id,nick] of Object.entries(nicknames))add('P21',id,nick);
 for(const e of state.entries||[]){if(e.deletedAt)continue;add(e.room,e.playerId,e.recipient);for(const p of e.payments||[])if(!p.voidedAt)deposit(p);}
 for(const r of state.channelOperations||[])if(!r.voidedAt&&!r.transferId&&r.direction==='income'&&r.channelId!=='bonuses')deposit(r);
 for(const link of state.playerAccounts||[]){
  const [baseRoom,baseId]=link.profileKey.split('|');add(baseRoom,baseId,link.nick);add(link.room,link.playerId,'',link.createdAt);
  const base=rows.get(link.profileKey),row=rows.get(link.room+'|'+link.playerId);if(!base||!row)continue;
  row.profileKey=link.profileKey;row.nick=base.nick||link.nick||base.name;row.aliases=[...new Set([...(row.aliases||[]),...(base.aliases||[]),base.name].filter(Boolean))];
 }
 return [...rows.values()].sort((a,b)=>b.lastUsedAt-a.lastUsedAt||a.room.localeCompare(b.room)||a.playerId.localeCompare(b.playerId));
}
module.exports={depositPlayerDirectory};
