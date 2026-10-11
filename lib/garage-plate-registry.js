'use strict';
const HALL='poker_app:player_hall:', OWNERS='poker_app:garage:plate_owners';
// Claim, release and room CAS are one transaction. On an index miss, include
// pre-registry rooms so existing saved plates cannot be taken by a new owner.
const SCRIPT=`
local old=redis.call('GET',KEYS[1])
if (old or '') ~= ARGV[1] then return {0} end
local owner=redis.call('HGET',KEYS[2],ARGV[4])
if owner and owner ~= ARGV[3] then return {-1,owner} end
if not owner then
 local cursor='0'
 repeat
  local page=redis.call('SCAN',cursor,'MATCH',ARGV[6]..'ID*','COUNT',200)
  cursor=page[1]
  for _,key in ipairs(page[2]) do
   if key ~= KEYS[1] then
    local raw=redis.call('GET',key)
    if raw then
     local ok,state=pcall(cjson.decode,raw)
     if ok and type(state)=='table' and type(state.garage)=='table' then
      local g=state.garage
      if g.number and g.region and tostring(g.number)..':'..tostring(g.region)==ARGV[4] then
       return {-1,string.sub(key,string.len(ARGV[6])+1)}
      end
     end
    end
   end
  end
 until cursor=='0'
end
redis.call('HSET',KEYS[2],ARGV[4],ARGV[3])
if ARGV[5] ~= '' and ARGV[5] ~= ARGV[4] and redis.call('HGET',KEYS[2],ARGV[5]) == ARGV[3] then
 redis.call('HDEL',KEYS[2],ARGV[5])
end
redis.call('SET',KEYS[1],ARGV[2])
return {1}
`;
function plateKey(garage){return garage?.number&&garage?.region?garage.number+':'+garage.region:'';}
async function save(redis,accountId,raw,state,previous){
 const key=plateKey(state.garage),old=plateKey(previous?.garage);
 const [result]=await redis([['EVAL',SCRIPT,2,HALL+accountId,OWNERS,raw||'',JSON.stringify(state),accountId,key,old,HALL]]);
 return {ok:Number(result?.[0])===1,owner:Number(result?.[0])===-1?String(result[1]):null};
}
module.exports={save,plateKey,SCRIPT};
