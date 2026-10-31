'use strict';
const TOTALS='poker_app:game-experience:v1:totals',RECEIPTS='poker_app:game-experience:v1:receipts';
const {rewards}=require('./game-experience-rules');
function prepare(room){
 if(room.gameXpVersion!==1||!['chess','short','long','pool8','pyramid'].includes(room.state?.discipline)||![0,1,'draw'].includes(room.state?.winner))return;
 const event=room.id+':'+(room.match?.number||1)+':'+room.match?.round;
 if(room.gameExperience?.event===event)return;
 const profiles=room.playerProfiles||[],actions=room.gameXpActions||[];
 const eligible=!!room.players?.[1]&&!!profiles[0]?.accountId&&!!profiles[1]?.accountId&&profiles[0].accountId!==profiles[1].accountId&&actions[0]>0&&actions[1]>0;
 const {participation,win}=rewards(room.wagered?room.gameXpStake:0);
 room.gameExperience={event,granted:eligible,perPlayer:[0,1].map(i=>eligible?(room.state.winner===i?win:participation):0),...(!eligible?{reason:'Опыт начисляется после партии, в которой оба игрока сделали игровые ходы.'}:{})};
}
// Executed inside the same CAS transaction as the result. No historical imports.
const LUA=`${require('./profile-game-experience-json').LUA}
local function xpNumber(v) local n=tonumber(v);if not n or n~=n or n==math.huge or n==-math.huge then return 0 end;return math.max(0,n) end
local function xpCounter(t,...)
 for _,key in ipairs({...}) do if t[key]~=nil and tonumber(t[key]) then return xpNumber(t[key]) end end
 return 0
end
local function xpProgress(points)
 local level,start=1,0
 for _,band in ipairs({{10,3000},{25,7000},{40,15000},{60,30000},{80,60000},{100,100000}}) do
  while level<band[1] do
   if points<start+band[2] then return {points=points,level=level,levelStart=start,nextStart=start+band[2]} end
   start=start+band[2];level=level+1
  end
 end
 return {points=points,level=100,levelStart=start,nextStart=start}
end
local function xpBase(profile,id)
 local t=profile.totalCounter or profile.total_counter or {}
 if type(t)~='table' then t={} end
 local mttItm=xpCounter(t,'mttItmCount','mtt_itm_count')
 local mttFirst=xpCounter(t,'mttFirstCount','mtt_1st_count','mtt_first_count','mttFirstPlaceCount','mtt_first_place_count')
 local sngItm=xpCounter(t,'sngItmCount','sng_itm_count')
 local sngFirst=xpCounter(t,'sngFirstCount','sng_1st_count','sng_first_count','sngFirstPlaceCount','sng_first_place_count')
 local bind=redis.call('HGET','poker_app:pokerplus_user_ids',id) and 500 or 0
 return xpCounter(t,'fee')+math.max(xpCounter(t,'mttCount','mtt_count'),mttItm,mttFirst)*300+math.max(0,mttItm-mttFirst)*700+mttFirst*3000+math.max(xpCounter(t,'sngCount','sng_count'),sngItm,sngFirst)*60+math.max(0,sngItm-sngFirst)*140+sngFirst*400+bind
end
local function grantGameExperience(room,family)
 local reward=room.gameExperience
 if room.gameXpVersion~=1 or not reward or reward.granted~=true then return end
 local receipt=family..':'..reward.event
 local old=redis.call('HGET','${RECEIPTS}',receipt)
 if old then room.gameExperience=cjson.decode(old);return end
 reward.progress={}
 local planned={}
 for i=1,2 do
  local id=room.playerProfiles[i].accountId
  local previous=redis.call('HGET','${TOTALS}',id) or '0'
  local current=tonumber(previous)
  local amount=tonumber(reward.perPlayer[i])
  if not current or current<0 or current~=math.floor(current) or not amount or amount<=0 or amount~=math.floor(amount) or amount>400 or current>9007199254740991-amount then error('invalid_game_experience_total') end
  local total=current+amount
  local raw=redis.call('HGET','poker_app:pokerplus_profiles',id)
  local profile={}
  if raw then local ok,value=pcall(cjson.decode,raw);if ok and type(value)=='table' then profile=value else raw='{}' end end
  local base=xpBase(profile,id)
  local beforePoints,afterPoints=base+total-reward.perPlayer[i],base+total
  if room.playerProfiles[i].level==100 then local cap=xpProgress(1000000000).levelStart;beforePoints=math.max(beforePoints,cap);afterPoints=math.max(afterPoints,cap) end
  reward.progress[i]={before=xpProgress(beforePoints),after=xpProgress(afterPoints)}
  planned[i]={id=id,total=total,profile=profileWithGameExperience(raw,total)}
 end
 local encoded=cjson.encode(reward)
 for _,item in ipairs(planned) do
  redis.call('HSET','${TOTALS}',item.id,item.total)
  redis.call('HSET','poker_app:pokerplus_profiles',item.id,item.profile)
 end
 redis.call('HSET','${RECEIPTS}',receipt,encoded)
end
`;
// Keep the durable XP total when the external poker profile is refreshed.
const SAVE_PROFILE=`${require('./profile-game-experience-json').LUA}local total=tonumber(redis.call('HGET',KEYS[2],ARGV[1]) or '0');redis.call('HSET',KEYS[1],ARGV[1],profileWithGameExperience(ARGV[2],total));return total`;
module.exports={TOTALS,RECEIPTS,rewards,prepare,LUA,SAVE_PROFILE};
