'use strict';
// Only derived totals are written. Source games/count and target completeness are
// checked in the same Redis execution, so a simultaneous spin cannot be lost.
const LUA=`
local expected=tonumber(ARGV[2]);local current=tonumber(redis.call('HGET',KEYS[1],ARGV[1]) or '0')
if current~=expected then return 'count_changed' end
if #KEYS-2~=expected then return 'incomplete_archive' end
local total={count=0,ticket=0,bonus=0};local hands={}
for i=3,#KEYS do
 local raw=redis.call('GET',KEYS[i]);if not raw then return 'missing_game' end
 local g=cjson.decode(raw)
 if tostring(g.user_id or '')~=ARGV[1] then return 'wrong_owner' end
 total.count=total.count+1
 total.ticket=total.ticket+tonumber(g.ticket_balance_credited or 0)+tonumber(g.ticketless_streak_ticket_balance_credited or 0)
 total.bonus=total.bonus+tonumber(g.bonus_credited or 0)
 local hand='hand:'..tostring(g.hand_rank or 'unknown');hands[hand]=(hands[hand] or 0)+1
end
if ARGV[3]=='apply' then
 redis.call('DEL',KEYS[2]);redis.call('HSET',KEYS[2],'count',total.count,'ticket',total.ticket,'bonus',total.bonus,'ready','1')
 for hand,n in pairs(hands) do redis.call('HSET',KEYS[2],hand,n) end
end
return cjson.encode(total)
`;
function command(account,count,ids,apply=false){
 if(!/^ID\d{6}$/.test(account)||!Number.isSafeInteger(count)||count<0)throw Error('Invalid bootstrap account/count');
 const unique=[...new Set(ids)];
 return ['EVAL',LUA,unique.length+2,'poker_app:daily_poker_played_count',require('./daily-poker-player-totals').PREFIX+account,...unique.map(id=>'poker_app:daily_poker_game:'+id),account,String(count),apply?'apply':'dry'];
}
module.exports={LUA,command};
