"use strict";
const crypto=require('crypto');
const {redis,clean}=require('./club-social');
const PREFIX='poker_app:reviews:';
const idValid=id=>/^[a-f0-9]{24}$/.test(String(id||''));
const key=id=>PREFIX+'thread:'+id;
function fail(message,status=400){const e=new Error(message);e.status=status;throw e;}
function image(raw){const value=String(raw||'');if(!value)return '';if(value.length>450000||!/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value))fail('Добавьте изображение JPG, PNG или WebP до 330 КБ');return value;}
function newThread(body,actor,id){
  const title=clean(body.title,140),question=clean(body.question,3000);if(title.length<3||question.length<5)fail('Добавьте заголовок и конкретный вопрос');
  if(!['question','hand'].includes(body.type))fail('Неизвестный тип вопроса');
  return {id,authorId:actor.accountId,authorName:actor.name,type:body.type,title,question,context:clean(body.context,2000),outcome:body.type==='hand'?clean(body.outcome,2000):'',image:image(body.image),forCoach:body.forCoach===true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),version:0,replies:[],followers:{[actor.accountId]:true},votes:{}};
}
function publicThread(t,actor,full=true){
  const replies=t.replies.filter(r=>!r.deleted);
  const result={id:t.id,authorId:t.authorId,authorName:t.authorName,title:t.title,type:t.type,question:t.question,forCoach:t.forCoach,createdAt:t.createdAt,updatedAt:t.updatedAt,version:t.version,replyCount:replies.length,coachAnswered:replies.some(r=>r.coach),canDelete:actor.admin||actor.accountId===t.authorId,following:!!t.followers[actor.accountId]};
  if(full)Object.assign(result,{context:t.context,outcome:t.outcome,image:t.image,replies:replies.map(r=>({...r,canDelete:actor.admin||r.authorId===actor.accountId})),myVote:t.votes[actor.accountId]||'',votes:['fold','call','raise'].reduce((out,v)=>{out[v]=Object.values(t.votes).filter(x=>x===v).length;return out;},{})});
  return result;
}
async function read(id){if(!idValid(id))fail('Разбор не найден',404);const [raw]=await redis([['GET',key(id)]]);if(!raw)fail('Разбор не найден',404);const t=JSON.parse(raw);if(t.deleted)fail('Разбор удалён',404);return t;}
const CAS="if (redis.call('GET',KEYS[1]) or '') ~= ARGV[1] then return 0 end redis.call('SET',KEYS[1],ARGV[2]); for i=2,#KEYS do redis.call('ZADD',KEYS[i],ARGV[3],ARGV[4]); end return 1";
async function mutate(id,fn){
  for(let attempt=0;attempt<5;attempt++){
    const [raw]=await redis([['GET',key(id)]]);if(!raw)fail('Разбор не найден',404);
    const t=JSON.parse(raw);if(t.deleted)fail('Разбор удалён',404);
    const result=fn(t);const keys=[key(id),PREFIX+'all',...Object.keys(t.followers).filter(a=>t.followers[a]).map(a=>PREFIX+'mine:'+a)];
    const [ok]=await redis([['EVAL',CAS,keys.length,...keys,raw,JSON.stringify(t),Date.parse(t.updatedAt),id]]);
    if(Number(ok)===1)return {thread:t,result};
  }fail('Обсуждение изменилось. Попробуйте ещё раз.',409);
}
async function create(body,actor){
  if(!idValid(body.requestId))fail('Обновите форму и попробуйте снова');
  const id=crypto.createHash('sha256').update(actor.accountId+':'+body.requestId).digest('hex').slice(0,24);
  const t=newThread(body,actor,id);
  const [ok]=await redis([['EVAL',CAS,3,key(id),PREFIX+'all',PREFIX+'mine:'+actor.accountId,'',JSON.stringify(t),Date.parse(t.updatedAt),id]]);
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
async function list(actor,mine,cursor=0){
  const offset=Math.max(0,Math.min(10000,Number(cursor)||0));
  const [ids]=await redis([['ZREVRANGE',PREFIX+(mine?'mine:'+actor.accountId:'all'),offset,offset+19]]);
  if(!ids||!ids.length)return {threads:[],nextCursor:null};
  const values=await redis(ids.map(id=>['GET',key(id)]));
  const threads=values.filter(Boolean).map(x=>JSON.parse(x)).filter(t=>!t.deleted&&(!mine||t.authorId===actor.accountId||t.followers[actor.accountId]));
  const seen=threads.length?await redis(threads.map(t=>['HGET',PREFIX+'seen:'+actor.accountId,t.id])):[];
  return {threads:threads.map((t,i)=>({...publicThread(t,actor,false),unread:t.version>Number(seen[i]||0)})),nextCursor:ids.length===20?offset+20:null};
}
async function markRead(id,account,version){const t=await read(id);const v=Math.min(t.version,Math.max(0,Number(version)||0));await redis([['EVAL',"local old=tonumber(redis.call('HGET',KEYS[1],ARGV[1]) or '0'); if tonumber(ARGV[2])>old then redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]);end; return 1",1,PREFIX+'seen:'+account,id,v]]);}
module.exports={PREFIX,idValid,fail,image,newThread,publicThread,read,mutate,create,reply,list,markRead};
