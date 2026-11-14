'use strict';
const {createHash}=require('node:crypto');
const P='poker_app:raffle_prize_totals:v1:',TOTALS=P+'players',DIGESTS=P+'digests',READY=P+'ready';
const RAFFLE='poker_app:raffle:';
function validWinners(raffle){
 if(!raffle||raffle.status==='cancelled')return [];
 const slots=new Set(),rows=[];
 for(const w of raffle.winners||[]){
  if(['fail','missed','rerolled','cancelled','no_show'].includes(String(w.winnerStatus||'').toLowerCase())||w.winnerReadyExpired===true||w.winnerBurned===true||['missed','burned'].includes(String(w.winnerReadyState||'').toLowerCase())||['returning','returned'].includes(w.cashSeatingMonitor?.status))continue;
  if(w.winnerReadySlotId&&slots.has(w.winnerReadySlotId))continue;
  if(w.winnerReadySlotId)slots.add(w.winnerReadySlotId);
  const amount=Math.round(require('./raffle-calculation-summary').prizeAmount(raffle,w)*100);
  if(Number.isSafeInteger(amount)&&amount>0)rows.push({winner:w,amount});
 }
 return rows;
}
function identity(w){
 for(const value of [w.accountId,w.userId])if(/^ID\d{6}$/.test(String(value||'')))return String(value);
 for(const value of [w.userId,w.telegramUserId,w.telegramId]){const id=String(value||'').replace(/^tg_/,'');if(/^[1-9]\d*$/.test(id))return 'tg_'+id;}
 return '';
}
async function run(pipeline,commands){
 const rows=await pipeline(commands,{throwOnError:true,context:'raffle.prize-totals',timeoutMs:10000});
 if(!rows||rows.length!==commands.length||rows.some(r=>!r||r.error))throw Error('Prize totals storage unavailable');return rows.map(r=>r.result);
}
async function fields(pipeline,key,ids){
 const values=[];for(let i=0;i<ids.length;i+=200){const [part]=await run(pipeline,[['HMGET',key,...ids.slice(i,i+200)]]);if(!Array.isArray(part))throw Error('Identity mapping unavailable');values.push(...part);}return values;
}
async function contributions(raffles,pipeline){
 const ids=[...new Set(raffles.flatMap(r=>validWinners(r).map(row=>identity(row.winner))).filter(Boolean))],resolved=new Map(ids.map(id=>[id,id]));
 const telegram=ids.filter(id=>id.startsWith('tg_'));
 if(telegram.length){const bindings=await fields(pipeline,'poker_app:visitor_dt_ids',telegram);telegram.forEach((id,i)=>{if(/^ID\d{6}$/.test(String(bindings?.[i]||'')))resolved.set(id,String(bindings[i]));});}
 const accounts=[...new Set([...resolved.values()].filter(id=>/^ID\d{6}$/.test(id)))],redirects=new Map();
 let current=accounts;
 for(let depth=0;current.length;depth++){
  if(depth>=8)throw Error('Account redirect depth exceeded');
  const values=await fields(pipeline,'poker_app:account_redirects',current),next=[];
  current.forEach((id,i)=>{const value=values?.[i];if(!value)return;if(!/^ID\d{6}$/.test(value))throw Error('Invalid account redirect');redirects.set(id,value);next.push(value);});current=[...new Set(next)];
 }
 function canonical(id){const seen=new Set();while(redirects.has(id)){if(seen.has(id))throw Error('Account redirect cycle');seen.add(id);id=redirects.get(id);}return id;}
 return raffles.map(raffle=>{
  const totals={};for(const {winner,amount}of validWinners(raffle)){const id=canonical(resolved.get(identity(winner))||'');if(id)totals[id]=(totals[id]||0)+amount;}return totals;
 });
}
const APPLY=`
local function kind(key) local t=redis.call('TYPE',key);return type(t)=='table' and t.ok or t end
if kind(KEYS[2])~='none' and kind(KEYS[2])~='string' then return redis.error_reply('invalid_projection_type') end
for _,key in ipairs({KEYS[3],KEYS[4]}) do if kind(key)~='none' and kind(key)~='hash' then return redis.error_reply('invalid_totals_type') end end
local mode=ARGV[1];local source=redis.call('GET',KEYS[1])
if mode=='reconcile' and (not source or redis.sha1hex(source)~=ARGV[4]) then return redis.error_reply('raffle_changed') end
local old=cjson.decode(redis.call('GET',KEYS[2]) or '{}');local new=cjson.decode(ARGV[3]);local delta={}
for id,value in pairs(old) do delta[id]=(delta[id] or 0)-value end
for id,value in pairs(new) do delta[id]=(delta[id] or 0)+value end
for id,value in pairs(delta) do
 local current=tonumber(redis.call('HGET',KEYS[3],id) or '0');local total=current and current+value
 if not total or total<0 or total~=math.floor(total) or math.abs(total)>9007199254740991 then return redis.error_reply('invalid_prize_total') end
end
local command=cjson.decode(ARGV[5] or '[]');local result=1
if mode~='reconcile' then result=redis.call(unpack(command));source=mode=='delete' and nil or ARGV[2] end
for id,value in pairs(delta) do if value~=0 then redis.call('HINCRBY',KEYS[3],id,value) end end
redis.call('SET',KEYS[2],ARGV[3]);redis.call('HSET',KEYS[4],KEYS[1],source and redis.sha1hex(source) or '')
return result
`;
async function prepare(commands,options,pipeline){
 const mutations=[];
 commands.forEach((cmd,index)=>{
  const op=String(cmd[0]).toUpperCase(),key=String(cmd[1]||'');
  if(!key.startsWith(RAFFLE))return;
  if(op==='SET'&&typeof cmd[2]==='string')mutations.push({index,key,cmd,raffle:JSON.parse(cmd[2]),raw:cmd[2],mode:'set'});
  else if(op==='DEL')mutations.push({index,key,cmd,raffle:null,raw:'',mode:'delete'});
 });
 if(!mutations.length)return {commands,values:options?.values||[]};
 const maps=await contributions(mutations.map(m=>m.raffle),pipeline);
 if(!options?.atomic){
  const out=commands.slice();mutations.forEach((m,i)=>{out[m.index]=['EVAL',APPLY,4,m.key,P+'raffle:'+m.key.slice(RAFFLE.length),TOTALS,DIGESTS,m.mode,m.raw,JSON.stringify(maps[i]),'',JSON.stringify(m.cmd)];});return {commands:out,values:[]};
 }
 const latest=new Map();mutations.forEach((m,i)=>latest.set(m.key,{...m,totals:maps[i]}));
 const changes=[...latest.values()],old=await run(pipeline,changes.map(m=>['GET',P+'raffle:'+m.key.slice(RAFFLE.length)])),writes=commands.slice(),values=[...(options.values||[])];
 changes.forEach((m,i)=>{
  const key=P+'raffle:'+m.key.slice(RAFFLE.length),before=old[i]||'',previous=JSON.parse(before||'{}'),delta={};
  for(const [id,n]of Object.entries(previous))delta[id]=(delta[id]||0)-n;
  for(const [id,n]of Object.entries(m.totals))delta[id]=(delta[id]||0)+n;
  for(const [id,n]of Object.entries(delta))if(n)writes.push(['HINCRBY',TOTALS,id,n]);
  writes.push(['SET',key,JSON.stringify(m.totals)],['HSET',DIGESTS,m.key,m.mode==='delete'?'':createHash('sha1').update(m.raw).digest('hex')]);values.push({key,value:before});
 });
 return {commands:writes,values};
}
async function read(account,telegramId,pipeline){
 const ids=[...new Set([account,'tg_'+telegramId].filter(Boolean))];
 const [ready,values]=await run(pipeline,[['GET',READY],['HMGET',TOTALS,...ids]]);
 if(ready!=='1')return {available:false};
 const amounts=values.map(v=>v==null?0:Number(v));if(amounts.some(n=>!Number.isSafeInteger(n)||n<0))throw Error('Invalid prize total');
 return {available:true,amount:amounts.reduce((a,b)=>a+b,0)/100};
}
function reconcileCommand(record,totals){
 const key=RAFFLE+record.id;
 return ['EVAL',APPLY,4,key,P+'raffle:'+record.id,TOTALS,DIGESTS,'reconcile','',JSON.stringify(totals),record.sourceDigest,'[]'];
}
async function reconcile(record,pipeline){
 const [totals]=await contributions([record],pipeline);
 return run(pipeline,[reconcileCommand(record,totals)]);
}
const MARK_READY=`
local ids=redis.call('LRANGE',KEYS[1],0,-1)
for _,id in ipairs(ids) do
 local key='poker_app:raffle:'..id;local raw=redis.call('GET',key)
 if raw and redis.call('HGET',KEYS[2],key)~=redis.sha1hex(raw) then return redis.error_reply('raffle_index_incomplete') end
end
redis.call('SET',KEYS[3],'1');return 1
`;
module.exports={MARK_READY,reconcileCommand,P,TOTALS,DIGESTS,READY,validWinners,identity,contributions,prepare,read,reconcile,APPLY};
