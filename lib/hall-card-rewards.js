'use strict';
const prizes=[{id:'drink',title:'Чай или кофе',text:'Один чай или американо при посещении клуба.'},{id:'discount100',title:'Скидка 100 ₽',text:'Минус 100 ₽ на один турнирный взнос от 500 ₽.'},{id:'bonus200',title:'Турнирный бонус 200 ₽',text:'Минус 200 ₽ на один турнирный взнос от 1 000 ₽.'}];
const week=7*86400000;
const playScript=`
local raw=redis.call('GET',KEYS[1]);local v
if raw then v=cjson.decode(raw) else v=cjson.decode(ARGV[1]) end
if ARGV[2]=='restart' then v=cjson.decode(ARGV[1]) end
if ARGV[2]=='choose' and v.choice==cjson.null then
 v.choice=tonumber(ARGV[3]);v.won=v.choice==v.ace;v.test=ARGV[5]=='1'
 if v.won then
  local last=tonumber(redis.call('GET',KEYS[2]) or '0')
  if v.test then local list=cjson.decode(ARGV[6]);v.reward=list[v.prize<6 and 1 or v.prize<9 and 2 or 3];v.message='Тестовый выигрыш. Реальный купон не выдан.'
  elseif tonumber(ARGV[4])-last>=${week} then
   local coupon=cjson.decode(ARGV[7]);local list=cjson.decode(ARGV[6]);coupon.prize=list[v.prize<6 and 1 or v.prize<9 and 2 or 3];v.reward=coupon.prize;v.coupon=coupon
   redis.call('SET',KEYS[2],ARGV[4],'PX',${week});redis.call('SET',KEYS[3],cjson.encode(coupon),'EX',5184000);redis.call('ZADD',KEYS[4],ARGV[4],coupon.id)
  else v.reward={id='gold',title='Золотой столик',text='Клубный приз уже получен за последние 7 дней. Сегодня — золотое оформление столика.'};v.message='Следующий клубный приз доступен после окончания недельного лимита.' end
 end
end
redis.call('SET',KEYS[1],cjson.encode(v),'EX',172800);return cjson.encode(v)`;
const redeemScript=`local raw=redis.call('GET',KEYS[1]);if not raw then return 'missing' end;local c=cjson.decode(raw);if c.redeemedAt then return 'used' end;if tonumber(c.expiresAt)<=tonumber(ARGV[1]) then return 'expired' end;c.redeemedAt=tonumber(ARGV[1]);c.redeemedBy=ARGV[2];redis.call('SET',KEYS[1],cjson.encode(c),'EX',5184000);return cjson.encode(c)`;
function publicState(v){const out={...v};delete out.prize;if(v.choice===null){delete out.ace;}return out;}
module.exports={prizes,week,playScript,redeemScript,publicState};
