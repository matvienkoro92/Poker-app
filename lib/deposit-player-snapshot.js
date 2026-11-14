'use strict';
// Filter on Redis so the entire shared ledger is not transferred for one card.
const LUA=`
local raw=redis.call('GET',KEYS[1]);if not raw then return false end
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
local function matches(record)
 local parts=record.allocations
 if not parts then parts={record} end
 for _,part in ipairs(parts) do
  local room=part.depositorRoom or part.room or '';local id=part.depositorId or part.playerId or ''
  if connected[tostring(room)..'|'..tostring(id)] then return true end
 end
 return false
end
local out={playerAccounts=s.playerAccounts or {},entries={},channelOperations={},tipCashouts={}}
for _,entry in ipairs(s.entries or {}) do
 if not entry.deletedAt then
  local payments={};for _,p in ipairs(entry.payments or {}) do if matches(p) then table.insert(payments,p) end end
  if #payments>0 then table.insert(out.entries,{payments=payments}) end
 end
end
for _,row in ipairs(s.channelOperations or {}) do if matches(row) then table.insert(out.channelOperations,row) end end
for _,row in ipairs(s.tipCashouts or {}) do if matches(row) then table.insert(out.tipCashouts,row) end end
return cjson.encode(out)
`;
async function read(pokerId,pipeline){
 const [row]=await pipeline([['EVAL',LUA,1,'poker21:admin-deposits:v1',String(pokerId)]],{throwOnError:true,context:'tracking.player-deposits',timeoutMs:10000});
 if(!row?.result||row.error)throw Error('deposit_ledger_unavailable');
 const state=JSON.parse(row.result);
 for(const key of ['playerAccounts','entries','channelOperations','tipCashouts']){
  if(!Array.isArray(state[key]))state[key]=[];
 }
 return state;
}
module.exports={read,LUA};
