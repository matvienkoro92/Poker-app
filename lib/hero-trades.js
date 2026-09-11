'use strict';
const crypto=require('node:crypto'),H=require('./profile-hero'),C=require('../hero-catalog'),K=require('./hero-collection'),{redis}=require('./club-social');
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
const PREFIX='poker_app:hero_trade:',INDEX='poker_app:hero_trades:',HERO='poker_app:profile_hero:',FRIENDS='poker_app:friendships:',TTL=90*86400;
function tradable(s,i){const m=i&&C.model(C.modelId(i));return !!m&&m.acquisition==='collection'&&!i.starter&&!i.award&&!i.favorite&&!Object.values(s.lookEquipped).includes(i.id)&&!Object.values(s.equipped).includes(i.id)&&!s.looks.some(l=>Object.values(l.items).includes(i.id));}
function eligible(s,other){return s.inventory.filter(i=>tradable(s,i)&&C.compatible(i,other.characterId)&&!K.owned(other,C.modelId(i)));}
function card(i){return {id:i.id,modelId:C.modelId(i),title:C.itemName(i)};}
function checkPair(a,b,give,take){const x=a.inventory.find(i=>i.id===give),y=b.inventory.find(i=>i.id===take);if(!tradable(a,x)||!tradable(b,y))fail('Вещь недоступна: проверьте владение, избранное и сохранённые образы');if(!C.compatible(x,b.characterId)||!C.compatible(y,a.characterId))fail('Вещи не подходят героям');if(K.owned(b,C.modelId(x))||K.owned(a,C.modelId(y)))fail('У получателя уже есть такая вещь');return [x,y];}
function swap(a,b,offer,now){
 a=H.migrate(a);b=H.migrate(b);const [x,y]=checkPair(a,b,offer.give.id,offer.take.id);
 if(C.modelId(x)!==offer.give.modelId||C.modelId(y)!==offer.take.modelId)fail('Состав предложения изменился');
 for(const [s,out,incoming,peer] of [[a,x,y,offer.to],[b,y,x,offer.from]]){
  const received={...incoming,originalOrigin:incoming.originalOrigin||incoming.origin,origin:'Обмен с '+peer,receivedAt:new Date(now).toISOString(),lastTradeId:offer.id};
  s.inventory=s.inventory.filter(i=>i.id!==out.id).concat(received);s.seen=s.seen.filter(id=>id!==out.id);s.version++;
  s.activity=[{id:offer.id,at:new Date(now).toISOString(),action:'trade',kind:'trade',title:C.itemName(received),givenTitle:C.itemName(out),itemId:received.id,modelId:C.modelId(received),peer,dustDelta:0},...(s.activity||[])].slice(0,200);
  if(s.goal===C.modelId(received)&&s.goalStartedAt!=null&&!s.goalCompletedAt){s.goalCompletedAt=now;s.lastGoalResult={modelId:s.goal,startedAt:s.goalStartedAt,completedAt:now};}
 }
 return [a,b];
}
const CREATE=`-- HERO_TRADE_CREATE
if redis.call('EXISTS',KEYS[1])==1 then return 2 end
if redis.call('SISMEMBER',KEYS[6],ARGV[8])~=1 or redis.call('SISMEMBER',KEYS[7],ARGV[7])~=1 then return -2 end
if (redis.call('GET',KEYS[4]) or '')~=ARGV[1] or (redis.call('GET',KEYS[5]) or '')~=ARGV[2] then return 0 end
if redis.call('ZCOUNT',KEYS[2],ARGV[6],'+inf')>=20 then return -3 end
redis.call('SET',KEYS[1],ARGV[3],'EX',ARGV[5]);redis.call('ZADD',KEYS[2],ARGV[4],KEYS[1]);redis.call('ZADD',KEYS[3],ARGV[4],KEYS[1]);redis.call('ZREMRANGEBYRANK',KEYS[2],0,-101);redis.call('ZREMRANGEBYRANK',KEYS[3],0,-101);return 1`;
const ACCEPT=`-- HERO_TRADE_ACCEPT
if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end
if redis.call('SISMEMBER',KEYS[4],ARGV[8])~=1 or redis.call('SISMEMBER',KEYS[5],ARGV[7])~=1 then return -2 end
if (redis.call('GET',KEYS[2]) or '')~=ARGV[2] or (redis.call('GET',KEYS[3]) or '')~=ARGV[3] then return 0 end
redis.call('SET',KEYS[2],ARGV[4]);redis.call('SET',KEYS[3],ARGV[5]);redis.call('SET',KEYS[1],ARGV[6],'EX',${TTL});return 1`;
const CLOSE=`-- HERO_TRADE_CLOSE
if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end
redis.call('SET',KEYS[1],ARGV[2],'EX',${TTL});return 1`;
async function mutual(a,b){const values=await redis([['SISMEMBER',FRIENDS+a,b],['SISMEMBER',FRIENDS+b,a]]);if(values.some(v=>Number(v)!==1))fail('Обмен доступен только друзьям',403);}
async function list(accountId,now=Date.now()){
 const [ids]=await redis([['ZREVRANGE',INDEX+accountId,0,99]]);const keys=(ids||[]).filter(k=>typeof k==='string'&&k.startsWith(PREFIX));const raws=keys.length?await redis(keys.map(k=>['GET',k])):[];
 const offers=raws.flatMap(raw=>{if(!raw)return [];const o=JSON.parse(raw);if(![o.from,o.to].includes(accountId))return [];return [{...o,status:o.status==='pending'&&o.expiresAt<=now?'expired':o.status}];});
 const d=await H.load(accountId),partners=[];
 for(const f of d.state.giftFriends||[]){if(!H.heroEnabled(f.userId))continue;try{await mutual(accountId,f.userId);}catch(e){if(e.status===403)continue;throw e;}const other=await H.load(f.userId);partners.push({id:f.userId,name:f.nick,characterId:other.state.characterId,give:eligible(d.state,other.state).map(card),take:eligible(other.state,d.state).map(card)});}
 return {ok:true,trades:{accountId,offers,partners},hero:H.view(d.state,d.level)};
}
async function handle(accountId,body,now=Date.now()){
 if(!H.heroEnabled(accountId))fail('Обмен пока доступен участникам пилота',403);
 if(body.action==='trade-count'){const [keys]=await redis([['ZREVRANGE',INDEX+accountId,0,99]]);const safe=(keys||[]).filter(k=>typeof k==='string'&&k.startsWith(PREFIX)),raws=safe.length?await redis(safe.map(k=>['GET',k])):[];return {ok:true,incoming:raws.filter(raw=>{if(!raw)return false;const o=JSON.parse(raw);return o.to===accountId&&o.status==='pending'&&o.expiresAt>now;}).length};}
 if(body.action==='trade-list')return list(accountId,now);
 if(!/^[-a-zA-Z0-9]{12,80}$/.test(String(body.requestId||'')))fail('Обновите страницу и повторите');
 if(body.action==='trade-create'){
  const target=String(body.targetId||'');if(target===accountId||!H.heroEnabled(target))fail('Выберите друга из пилота');await mutual(accountId,target);
  const id=crypto.createHash('sha256').update(accountId+'|'+body.requestId).digest('hex').slice(0,32),key=PREFIX+id,[old]=await redis([['GET',key]]);if(old)return list(accountId,now);
  const a=await H.load(accountId),b=await H.load(target),[x,y]=checkPair(a.state,b.state,body.giveId,body.takeId);
  const offer={id,from:accountId,to:target,fromName:C.hero(a.state.characterId).name,toName:C.hero(b.state.characterId).name,give:card(x),take:card(y),status:'pending',createdAt:now,expiresAt:now+7*86400000};
  const [saved]=await redis([['EVAL',CREATE,7,key,INDEX+accountId,INDEX+target,HERO+accountId,HERO+target,FRIENDS+accountId,FRIENDS+target,a.raw||'',b.raw||'',JSON.stringify(offer),now,TTL,now-7*86400000,accountId,target]]);
  if(Number(saved)===-2)fail('Вы больше не друзья',403);if(Number(saved)===-3)fail('Не больше 20 предложений за неделю');if(!Number(saved))fail('Коллекция изменилась. Обновите список',409);return list(accountId,now);
 }
 if(!/^[a-f0-9]{32}$/.test(String(body.offerId||'')))fail('Предложение не найдено',404);const key=PREFIX+body.offerId,[raw]=await redis([['GET',key]]);if(!raw)fail('Предложение не найдено',404);const o=JSON.parse(raw);
 if(![o.from,o.to].includes(accountId))fail('Это не ваше предложение',403);
 if(body.action==='trade-accept'&&accountId!==o.to||body.action==='trade-cancel'&&accountId!==o.from||body.action==='trade-decline'&&accountId!==o.to)fail('Это действие недоступно',403);
 if(!['trade-accept','trade-cancel','trade-decline'].includes(body.action))fail('Неизвестное действие');
 if(o.status!=='pending'){if(o.status===({'trade-accept':'accepted','trade-cancel':'cancelled','trade-decline':'declined'}[body.action]))return list(accountId,now);fail('Предложение уже закрыто',409);}
 if(o.expiresAt<=now)fail('Срок предложения истёк',409);
 if(body.action==='trade-accept'){
  if(!H.heroEnabled(o.from)||!H.heroEnabled(o.to))fail('Участник больше не в пилоте');await mutual(o.from,o.to);const a=await H.load(o.from),b=await H.load(o.to),[nextA,nextB]=swap(a.state,b.state,o,now);const done={...o,status:'accepted',completedAt:now};
  const [saved]=await redis([['EVAL',ACCEPT,5,key,HERO+o.from,HERO+o.to,FRIENDS+o.from,FRIENDS+o.to,raw,a.raw||'',b.raw||'',JSON.stringify(nextA),JSON.stringify(nextB),JSON.stringify(done),o.from,o.to]]);
  if(Number(saved)===-2)fail('Вы больше не друзья',403);if(!Number(saved))fail('Предложение или вещи изменились. Обновите список',409);
 }else{const done={...o,status:body.action==='trade-cancel'?'cancelled':'declined',completedAt:now};const [saved]=await redis([['EVAL',CLOSE,1,key,raw,JSON.stringify(done)]]);if(!Number(saved))fail('Предложение уже изменилось. Обновите список',409);}
 return list(accountId,now);
}
module.exports={handle,list,tradable,eligible,swap,CREATE,ACCEPT,CLOSE};
