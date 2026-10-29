'use strict';
// Players keep their owner/guest seats; queues only choose compatible piece colors.
const TAKE=`
local own = tonumber(ARGV[3])
local order = {3-own}
if ARGV[4] == '1' then order[2] = own end
for _, slot in ipairs(order) do
  for attempt=1,64 do
    local entry=redis.call('RPOP',KEYS[slot])
    if not entry then break end
    local room=string.sub(entry,1,10)
    local expires=tonumber(string.sub(entry,12)) or 0
    if expires>tonumber(ARGV[2]) and room~=ARGV[1] then return room end
  end
end
redis.call('LPUSH',KEYS[own],ARGV[1]..'|'..tostring(tonumber(ARGV[2])+120000))
redis.call('EXPIRE',KEYS[own],120)
return ''`;
async function take(commands,key,roomId,preference,whitePlayer,time=Date.now()){
 const [room]=await commands([['EVAL',TAKE,2,key+':colors:v1:white',key+':colors:v1:black',roomId,time,whitePlayer===0?1:2,preference==='random'?'1':'0']]);
 return room||'';
}
module.exports={TAKE,take};
