'use strict';
// Keep the shared ledger on Redis; transfer only this player's linked withdrawals.
const LUA=`
local raw=redis.call('GET',KEYS[1]);if not raw then return cjson.encode({entries={},playerAccounts={}}) end
local s=cjson.decode(raw);local connected={['P21|'..ARGV[1]]=true};local changed=true
while changed do
 changed=false
 for _,link in ipairs(s.playerAccounts or {}) do
  local a=tostring(link.profileKey or '');local b=tostring(link.room or '')..'|'..tostring(link.playerId or '')
  if connected[a] or connected[b] then
   if not connected[a] then connected[a]=true;changed=true end
   if not connected[b] then connected[b]=true;changed=true end
  end
 end
end
local out={entries={},playerAccounts={}}
for _,link in ipairs(s.playerAccounts or {}) do
 if connected[tostring(link.profileKey or '')] then
  table.insert(out.playerAccounts,{profileKey=link.profileKey,room=link.room,playerId=link.playerId})
 end
end
for _,e in ipairs(s.entries or {}) do
 if not e.deletedAt and not e.archived and connected[tostring(e.room)..'|'..tostring(e.playerId)] then
  local payments={};local returns={};local paid=0;local returned=0
  for _,p in ipairs(e.payments or {}) do
   if not p.voidedAt then paid=paid+p.amount;table.insert(payments,{amount=p.amount,createdAt=p.createdAt}) end
  end
  for _,r in ipairs(e.returns or {}) do
   if not r.voidedAt then returned=returned+r.amount;table.insert(returns,{amount=r.amount}) end
  end
  if e.total-paid-returned>0 then
   table.insert(out.entries,{room=e.room,playerId=e.playerId,total=e.total,createdAt=e.createdAt,payments=payments,returns=returns})
  end
 end
end
return cjson.encode(out)
`;
function decode(raw){
 if(!raw)throw Error('Withdrawal ledger unavailable');
 const state=JSON.parse(raw);
 // Redis cjson encodes empty Lua tables as objects.
 for(const key of ['entries','playerAccounts'])if(!Array.isArray(state[key]))state[key]=[];
 for(const entry of state.entries)for(const key of ['payments','returns'])if(!Array.isArray(entry[key]))entry[key]=[];
 return state;
}
module.exports={LUA,decode};
