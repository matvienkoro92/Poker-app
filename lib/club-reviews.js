"use strict";
const crypto=require('crypto');
const {splitOutcome}=require('../starting-hands/hand-share');
const {redis,clean}=require('./club-social');
const PREFIX='poker_app:reviews:';
const idValid=id=>/^[a-f0-9]{24}$/.test(String(id||''));
const key=id=>PREFIX+'thread:'+id;
function fail(message,status=400){const e=new Error(message);e.status=status;throw e;}
function image(raw){const value=String(raw||'');if(!value)return '';if(value.length>450000||!/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value))fail('Добавьте изображение JPG, PNG или WebP до 330 КБ');return value;}
function newThread(body,actor,id){
  const title=clean(body.title,140),question=clean(body.question,3000);if(title.length<3||question.length<(body.type==='hand'?1:5))fail('Добавьте заголовок и конкретный вопрос');
  if(!['question','hand'].includes(body.type))fail('Неизвестный тип вопроса');
  const cards=Array.isArray(body.cards)?body.cards.map(x=>clean(x,3)).filter(x=>/^(?:[2-9TJQKA][shdc])$/.test(x)).slice(0,2):[];
  const gameMode=body.type==='hand'&&['cash','mtt'].includes(body.gameMode)?body.gameMode:'';
  const tournamentStage=gameMode==='mtt'&&['early','middle','in_money','final_table'].includes(body.tournamentStage)?body.tournamentStage:'';
  if(gameMode==='mtt'&&!tournamentStage)fail('Выберите стадию турнира');
  const bigBlindMinor=body.type==='hand'&&Number.isSafeInteger(body.bigBlindMinor)&&body.bigBlindMinor>0?body.bigBlindMinor:null;
  const startingStackMinor=body.type==='hand'&&Number.isSafeInteger(body.startingStackMinor)&&body.startingStackMinor>=0?body.startingStackMinor:null;
  const totalPotMinor=body.type==='hand'&&Number.isSafeInteger(body.totalPotMinor)&&body.totalPotMinor>=0?body.totalPotMinor:null;
  return {id,authorId:actor.accountId,authorName:actor.name,authorNick:clean(actor.nick,80),authorAvatar:clean(actor.avatar,500),type:body.type,title,question,context:clean(body.context,2000),potTiming:body.type==='hand'&&body.potTiming==='opening'?'opening':'',outcome:body.type==='hand'?clean(body.outcome,2000):'',hideShowdown:body.type==='hand'&&body.hideShowdown===true,image:image(body.image),cards,handId:clean(body.handId,40),gameMode,tournamentStage,bigBlindMinor,startingStackMinor,totalPotMinor,forCoach:body.forCoach===true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),version:0,replies:[],followers:{},votes:{}};
}
function publicThread(t,actor,full=true){
  if(t.type==='hand'&&t.handId)t={...t,title:'Раздача '+(t.cards||[]).join(' '),image:''};
  if(t.type==='hand'&&t.hideShowdown)t={...t,context:splitOutcome(t.context).visible,outcome:'',image:'',title:'Раздача '+(t.cards||[]).join(' ')};
  const replies=t.replies.filter(r=>!r.deleted);
  const legacyAuthorAutoFollow=actor.accountId===t.authorId&&t.followers[actor.accountId]&&!t.explicitFollowers;
  const result={id:t.id,authorId:t.authorId,authorName:t.authorName,authorNick:t.authorNick||(actor.accountId===t.authorId?clean(actor.nick,80):''),authorAvatar:t.authorAvatar||'',title:t.title,type:t.type,cards:Array.isArray(t.cards)?t.cards:[],handId:t.handId||'',gameMode:t.gameMode||'',tournamentStage:t.gameMode==='mtt'&&['early','middle','in_money','final_table'].includes(t.tournamentStage)?t.tournamentStage:'',bigBlindMinor:Number.isSafeInteger(t.bigBlindMinor)?t.bigBlindMinor:null,startingStackMinor:Number.isSafeInteger(t.startingStackMinor)?t.startingStackMinor:null,totalPotMinor:Number.isSafeInteger(t.totalPotMinor)?t.totalPotMinor:null,potTiming:t.potTiming==='opening'?'opening':'',question:t.question,forCoach:t.forCoach,createdAt:t.createdAt,updatedAt:t.updatedAt,version:t.version,replyCount:replies.length,coachAnswered:replies.some(r=>r.coach),canDelete:actor.admin||actor.accountId===t.authorId,following:!!t.followers[actor.accountId]&&!legacyAuthorAutoFollow};
  if(full)Object.assign(result,{context:t.context,outcome:t.outcome,hideShowdown:t.hideShowdown===true,image:t.image,replies:replies.map(r=>({...r,canDelete:actor.admin||r.authorId===actor.accountId})),myVote:t.votes[actor.accountId]||'',votes:['fold','call','raise'].reduce((out,v)=>{out[v]=Object.values(t.votes).filter(x=>x===v).length;return out;},{})});
  return result;
}
async function read(id){if(!idValid(id))fail('Разбор не найден',404);const [raw]=await redis([['GET',key(id)]]);if(!raw)fail('Разбор не найден',404);const t=JSON.parse(raw);if(t.deleted)fail('Разбор удалён',404);return t;}
const SUMMARY_KEY = PREFIX+'badge-meta:v1';
function modeIndex(index, mode) { return index+':mode:v1:'+mode; }
function projectionWrites(thread) {
  const authors = Object.create(null);
  thread.replies.forEach((reply, index) => {
    if (!reply.deleted) authors[reply.authorId] = index + 1;
  });
  const summary = {authorId:thread.authorId,type:thread.type,deleted:!!thread.deleted,authors};
  const commands = [['HSET', SUMMARY_KEY, thread.id, JSON.stringify(summary)]];
  if (thread.type === 'hand' && ['cash','mtt'].includes(thread.gameMode)) {
    for (const index of [PREFIX+'all',PREFIX+'mine:'+thread.authorId]) {
      for (const mode of [thread.gameMode,'both']) {
        commands.push(thread.deleted ? ['ZREM',modeIndex(index,mode),thread.id] :
          ['ZADD',modeIndex(index,mode),Date.parse(thread.updatedAt),thread.id]);
      }
    }
  }
  return commands;
}
const CAS = `
if (redis.call('GET', KEYS[1]) or '') ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2])
for i=2,#KEYS do redis.call('ZADD', KEYS[i], ARGV[3], ARGV[4]) end
for _, command in ipairs(cjson.decode(ARGV[5])) do redis.call(unpack(command)) end
return 1`;
function saveCommand(thread, raw, keys) {
  return ['EVAL', CAS, keys.length, ...keys, raw, JSON.stringify(thread),
    Date.parse(thread.updatedAt), thread.id, JSON.stringify(projectionWrites(thread))];
}

async function mutate(id,fn,commit){
  for(let attempt=0;attempt<5;attempt++){
    const [raw]=await redis([['GET',key(id)]]);if(!raw)fail('Разбор не найден',404);
    const t=JSON.parse(raw);if(t.deleted)fail('Разбор удалён',404);
    const result=fn(t);const keys=[key(id),PREFIX+'all',...Array.from(new Set([t.authorId,...Object.keys(t.followers).filter(a=>t.followers[a])])).map(a=>PREFIX+'mine:'+a)];
    const [ok]=commit?[Number(await commit({thread:t,raw,keys,result}))]:await redis([saveCommand(t,raw,keys)]);
    if(Number(ok)===1)return {thread:t,result};
  }fail('Обсуждение изменилось. Попробуйте ещё раз.',409);
}
async function create(body,actor,commit){
  if(!idValid(body.requestId))fail('Обновите форму и попробуйте снова');
  const id=crypto.createHash('sha256').update(actor.accountId+':'+body.requestId).digest('hex').slice(0,24);
  const t=newThread(body,actor,id);
  const keys=[key(id),PREFIX+'all',PREFIX+'mine:'+actor.accountId];
  const [ok]=commit?[Number(await commit({thread:t,raw:'',keys}))]:await redis([saveCommand(t,'',keys)]);
  return {thread:Number(ok)===1?t:await read(id),fresh:Number(ok)===1};
}
function reply(t,body,actor){
  const text=clean(body.text,3000);if(text.length<2)fail('Напишите ответ');
  if(!idValid(body.requestId))fail('Обновите форму и попробуйте снова');
  const replyId=crypto.createHash('sha256').update(actor.accountId+':'+body.requestId).digest('hex').slice(0,24);
  const existing=t.replies.find(r=>r.id===replyId);if(existing)return {reply:existing,fresh:false};
  if(t.replies.length>=150)fail('В этом обсуждении уже 150 ответов');
  if(body.parentId&&!t.replies.some(r=>r.id===body.parentId&&!r.deleted))fail('Ответ, на который вы отвечаете, удалён');
  const r={id:replyId,text,authorId:actor.accountId,authorName:actor.name,coach:actor.coach===true,parentId:body.parentId||'',createdAt:new Date().toISOString()};
  t.replies.push(r);t.version++;t.updatedAt=r.createdAt;return {reply:r,fresh:true};
}
async function unreadCount(accountId) {
  const [count] = await redis([['EVAL', `
local ids = redis.call('ZREVRANGE', KEYS[1], 0, 19)
local unread = 0
for _, id in ipairs(ids) do
  local compact = redis.call('HGET', KEYS[3], id)
  local raw = compact or redis.call('GET', ARGV[2] .. id)
  if raw then
    local thread = cjson.decode(raw)
    if not thread.deleted and thread.type == 'hand' and tostring(thread.authorId) ~= ARGV[1] then
      local seen = tonumber(redis.call('HGET', KEYS[2], id)) or 0
      if compact then
        for author, index in pairs(thread.authors) do
          if index > seen and author ~= ARGV[1] then unread = unread + 1; break end
        end
      else
        for index, reply in ipairs(thread.replies or {}) do
          if index > seen and not reply.deleted and tostring(reply.authorId) ~= ARGV[1] then
            unread = unread + 1
            break
          end
        end
      end
    end
  end
end
return unread`, 3, PREFIX+'all', PREFIX+'seen:'+accountId, SUMMARY_KEY, accountId, PREFIX+'thread:']]);
  return Number(count) || 0;
}
async function list(actor,mine,cursor=0,pageSize=10,modes){
  const offset=Math.max(0,Math.min(10000,Number(cursor)||0));
  const index=PREFIX+(mine===true?'mine:'+actor.accountId:'all');
  if(Array.isArray(modes)){
    const selected=new Set(modes.filter(mode=>mode==='cash'||mode==='mtt'));
    if(!selected.size)return {threads:[],nextCursor:null,totalPages:1};
    const filtered = modeIndex(index, selected.size === 2 ? 'both' : selected.values().next().value);
    const [[total, ...values]] = await redis([['EVAL', `
if redis.call('EXISTS', KEYS[2]) == 0 then
  local indexed = redis.call('ZRANGE', KEYS[1], 0, -1, 'WITHSCORES')
  for i=1,#indexed,2 do
    local raw = redis.call('GET', ARGV[3] .. indexed[i])
    if raw then
      local thread = cjson.decode(raw)
      local mode = thread.gameMode
      if not thread.deleted and thread.type == 'hand' and (mode == 'cash' or mode == 'mtt')
          and (ARGV[4] == '' or tostring(thread.authorId) == ARGV[4]) then
        local key = mode == 'cash' and KEYS[4] or KEYS[5]
        redis.call('ZADD', key, indexed[i+1], indexed[i])
        redis.call('ZADD', KEYS[6], indexed[i+1], indexed[i])
      end
    end
  end
  redis.call('SET', KEYS[2], '1')
end
local page = {redis.call('ZCARD', KEYS[3])}
for _, id in ipairs(redis.call('ZREVRANGE', KEYS[3], ARGV[1], ARGV[2])) do
  local raw = redis.call('GET', ARGV[3] .. id)
  if raw then table.insert(page, raw) end
end
return page`, 6, index, index+':mode:v1:ready', filtered, modeIndex(index,'cash'), modeIndex(index,'mtt'),
      modeIndex(index,'both'), offset, offset+pageSize-1, PREFIX+'thread:', mine===true?actor.accountId:'']]);
    const page = values.map(JSON.parse);
    const seen=page.length?await redis(page.map(t=>['HGET',PREFIX+'seen:'+actor.accountId,t.id])):[];
    return {threads:page.map((t,i)=>({...publicThread(t,actor,false),unread:t.replies.some((r,index)=>index+1>Number(seen[i]||0)&&!r.deleted&&String(r.authorId)!==String(actor.accountId))})),nextCursor:offset+pageSize<total?offset+pageSize:null,totalPages:Math.max(1,Math.ceil(total/pageSize))};
  }
  const [ids,total]=await redis([['ZREVRANGE',index,offset,offset+pageSize-1],['ZCARD',index]]);
  const totalPages=Math.max(1,Math.ceil(Number(total||0)/pageSize));
  if(!ids||!ids.length)return {threads:[],nextCursor:null,totalPages};
  const values=await redis(ids.map(id=>['GET',key(id)]));
  const threads=values.filter(Boolean).map(x=>JSON.parse(x)).filter(t=>!t.deleted&&t.type==='hand'&&(mine==='others'?String(t.authorId)!==String(actor.accountId):!mine||String(t.authorId)===String(actor.accountId)));
  const seen=threads.length?await redis(threads.map(t=>['HGET',PREFIX+'seen:'+actor.accountId,t.id])):[];
  return {threads:threads.map((t,i)=>({...publicThread(t,actor,false),unread:t.replies.some((r,index)=>index+1>Number(seen[i]||0)&&!r.deleted&&String(r.authorId)!==String(actor.accountId))})),nextCursor:offset+pageSize<Number(total||0)?offset+pageSize:null,totalPages};
}
async function readVersion(id,account){const [value]=await redis([['HGET',PREFIX+'seen:'+account,id]]);return Number(value)||0;}
async function markRead(id,account,version){const t=await read(id);const v=Math.min(t.version,Math.max(0,Number(version)||0));await redis([['EVAL',"local old=tonumber(redis.call('HGET',KEYS[1],ARGV[1]) or '0'); if tonumber(ARGV[2])>old then redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]);end; return 1",1,PREFIX+'seen:'+account,id,v]]);}
module.exports={PREFIX,idValid,fail,image,newThread,publicThread,read,mutate,create,reply,list,projectionWrites,unreadCount,markRead,readVersion};
