'use strict';
const nicknames=require('../rating-player-id-map.json');
const xpoker=require('./deposit-xpoker-players.json').players;
function knownPlayerNick(room,id){return room==='X'?xpoker[id]||'':room==='P21'&&!xpoker[id]?String(nicknames[id]||''):'';}
function profileKeyForRoom(key){const [room,id]=String(key).split('|');return room==='P21'&&xpoker[id]?'X|'+id:key;}
const {depositPlayerAliases,groups}=require('./deposit-player-aliases');
function depositPlayerDirectory(state){
 const rows=new Map(),rooms=['P21','X','Supr','PP'];
 function add(room,id,name,at=0){id=String(id||'').trim();if(!rooms.includes(room)||!/^[a-zA-Z0-9_-]{1,64}$/.test(id))return;const key=room+'|'+id;let row=rows.get(key);if(!row){row={room,playerId:id,profileKey:key,aliases:[...new Set(depositPlayerAliases(knownPlayerNick(room,id)).concat(room==='X'&&nicknames[id]&&nicknames[id]!==knownPlayerNick(room,id)?[nicknames[id]]:[]))],nick:knownPlayerNick(room,id),name:'',lastUsedAt:0};rows.set(key,row);}if(name)row.name=String(name).trim();row.lastUsedAt=Math.max(row.lastUsedAt,at||0);}
 function deposit(record){for(const p of record.allocations||[{depositorRoom:record.depositorRoom||record.room,depositorId:record.depositorId||record.playerId}])add(p.depositorRoom,p.depositorId,'',record.createdAt);}
 for(const [id,nick] of Object.entries(nicknames))add(xpoker[id]?'X':'P21',id,nick);
 for(const [id,nick] of Object.entries(xpoker))add('X',id,nick);
 for(const e of state.entries||[]){if(e.deletedAt)continue;add(e.room,e.playerId,e.recipient);for(const p of e.payments||[])if(!p.voidedAt&&p.channelId!=='exchip')deposit(p);}
 for(const r of state.channelOperations||[])if(!r.voidedAt&&!r.transferId&&r.direction==='income'&&r.channelId!=='bonuses')deposit(r);
 // Rating-confirmed aliases can identify a single account in each room.
 // Repeated nicknames within one room remain separate profiles.
 for(const group of groups){const names=new Set(group.map(n=>n.toLowerCase()));const matched=[...rows.values()].filter(p=>names.has(p.nick.toLowerCase()));const p21=matched.filter(p=>p.room==='P21'),x=matched.filter(p=>p.room==='X');if(p21.length===1&&x.length===1)x[0].profileKey=p21[0].profileKey;}
 for(const link of state.playerAccounts||[]){
  const oldKey=profileKeyForRoom(link.profileKey),profileKey=(rows.get(oldKey)||{}).profileKey||oldKey,[baseRoom,baseId]=profileKey.split('|'),room=link.room==='P21'&&xpoker[link.playerId]&&link.profileKey===link.room+'|'+link.playerId?'X':link.room;add(baseRoom,baseId,link.nick);add(room,link.playerId,'',link.createdAt);
  const base=rows.get(profileKey),row=rows.get(room+'|'+link.playerId);if(!base||!row)continue;
  const originalNick=row.nick;row.profileKey=profileKey;row.nick=base.nick||link.nick||base.name;row.aliases=[...new Set([...(row.aliases||[]),...(base.aliases||[]),base.name,originalNick].filter(Boolean))];
 }
 return [...rows.values()].sort((a,b)=>b.lastUsedAt-a.lastUsedAt||a.room.localeCompare(b.room)||a.playerId.localeCompare(b.playerId));
}
module.exports={depositPlayerDirectory,knownPlayerNick,profileKeyForRoom};
