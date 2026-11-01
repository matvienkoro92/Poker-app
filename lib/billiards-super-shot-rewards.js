'use strict';
const crypto=require('node:crypto');
const PROGRESS='poker_app:billiards:super-shot-rewards:v1:players',RECEIPTS='poker_app:billiards:super-shot-rewards:v1:receipts';
function normalize(raw){let p={};try{p=typeof raw==='string'?JSON.parse(raw):raw||{};}catch{}const wins=Math.max(0,Math.floor(Number(p.wins)||0)),tokens=Math.max(0,Math.floor(Number(p.tokens)||0));return {wins,tokens,badge:wins>=1,unlockedCues:[...(wins>=1?['decisive']:[]),...(wins>=10?['decisive-gold']:[]),...(wins>=25?['decisive-named']:[])],selectedEffect:['master-spark','master-trail','master-victory'].includes(p.selectedEffect)&&p.effects?.includes(p.selectedEffect)?p.selectedEffect:(p.effects?.includes('master-spark')?'master-spark':null),firstWin:p.firstWin||null,effects:Array.isArray(p.effects)?p.effects.filter(e=>['master-spark','master-trail','master-victory'].includes(e)):[]};}
const GRANT=`local prior=redis.call('HGET',KEYS[2],ARGV[2]);if prior then return redis.call('HGET',KEYS[1],ARGV[1]) end
local raw=redis.call('HGET',KEYS[1],ARGV[1]);local p=raw and cjson.decode(raw) or {wins=0,tokens=0}
p.wins=(p.wins or 0)+1;p.tokens=(p.tokens or 0)+1
p.monthWins=p.monthWins or {};if ARGV[5] then p.monthWins[ARGV[5]]=(p.monthWins[ARGV[5]] or 0)+1 end
if not p.firstWin and ARGV[3] then p.firstWin={at=tonumber(ARGV[3]),event=ARGV[4],number=1} end
local encoded=cjson.encode(p);redis.call('HSET',KEYS[1],ARGV[1],encoded);redis.call('HSET',KEYS[2],ARGV[2],ARGV[1]);return encoded`;
const BUY=`local raw=redis.call('HGET',KEYS[1],ARGV[1]);local p=raw and cjson.decode(raw) or {wins=0,tokens=0};p.effects=p.effects or {}
for _,e in ipairs(p.effects) do if e==ARGV[2] then p.selectedEffect=ARGV[2];local encoded=cjson.encode(p);redis.call('HSET',KEYS[1],ARGV[1],encoded);return encoded end end
if (p.tokens or 0)<3 then return 'insufficient' end
p.tokens=p.tokens-3;p.selectedEffect=ARGV[2];table.insert(p.effects,ARGV[2]);local encoded=cjson.encode(p);redis.call('HSET',KEYS[1],ARGV[1],encoded);return encoded`;
const commands=()=>require('./club-social').redis;
async function read(accountId,run=commands()){const [raw]=await run([['HGET',PROGRESS,accountId]]);return normalize(raw);}
async function grant({userId,sourceId},run=commands()){const event=crypto.createHash('sha256').update(userId+':'+sourceId).digest('hex');const [raw]=await run([['EVAL',GRANT,2,PROGRESS,RECEIPTS,userId,event,Date.now(),sourceId,require('./billiards-achievements').monthKey(Date.now())]]);return normalize(raw);}
async function buy(accountId,item,run=commands()){if(!['master-spark','master-trail','master-victory'].includes(item))throw Object.assign(Error('Такой награды нет.'),{status:400});const [raw]=await run([['EVAL',BUY,1,PROGRESS,accountId,item]]);if(raw==='insufficient')throw Object.assign(Error('Нужно 3 жетона мастерства.'),{status:400});return normalize(raw);}
module.exports={PROGRESS,RECEIPTS,GRANT,BUY,normalize,read,grant,buy};
