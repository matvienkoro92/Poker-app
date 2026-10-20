'use strict';
// Same source as Admin → bonus issues: no second payment or balance transaction.
const crypto=require('node:crypto'),redis=require('./redis');
const {BONUS_LEDGER_ALL_KEY,BONUS_LEDGER_ENTRY_PREFIX}=require('./bonus-ledger');
const REVIEWS='poker_app:bonus_issue_reviews';
const pending=new Map();
let generation=0;
const cache=new Map(),stamp=v=>typeof v==='number'?v:Date.parse(v||'');
const inside=(v,p)=>Number.isFinite(stamp(v))&&(p.start===null||(stamp(v)>=p.start&&stamp(v)<p.end));
const version=raw=>crypto.createHash('sha256').update(raw||'').digest('hex');
async function run(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'deposit-spin-returns'});if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Не удалось загрузить крутки');return rows;}
function snapshot(entries,reviews,profiles,period){const rows=[],returns=[];
 for(const e of entries){if(e.operation_type!=='admin_debit'||e.direction!=='debit')continue;const raw=reviews[e.id]||'',review=raw?JSON.parse(raw):null,user=profiles[e.user_id]||{};const returned=review?.status==='plus'?Math.round(Number(review.amount)*100):0;
  if(review&&(!['plus','minus'].includes(review.status)||!Number.isSafeInteger(returned)||returned<0))throw Error('Некорректная запись возврата крутки');
  const row={key:e.id,userId:e.user_id,name:user.name||e.user_id,playerId:user.playerId||'',title:e.tournament_title||e.comment||'Крутка',issuedAt:e.created_at,issuedAmount:Math.round(Number(e.amount)*100),issueManager:e.admin_id||'',amount:returned,outcome:review?.status||'',returnedAt:review?.verifiedAt||null,createdBy:review?.adminId||'',reviewVersion:version(raw)};
  if(inside(e.created_at,period)||(review&&inside(review.verifiedAt,period)))rows.push(row);
  if(returned>0&&inside(review.verifiedAt,period))returns.push({...row,createdAt:stamp(review.verifiedAt)});
 }return {rows,returns,returned:returns.reduce((s,r)=>s+r.amount,0)};
}
async function loadSnapshot(period){
 const key=JSON.stringify(period),found=cache.get(key);if(found&&found.until>Date.now())return found.value;
 if(pending.has(key))return pending.get(key);
 const task=buildSnapshot(period,key,generation);pending.set(key,task);
 try{return await task;}finally{if(pending.get(key)===task)pending.delete(key);}
}
async function buildSnapshot(period,key,startedGeneration){
 const entries=[],ids=(await run([['LRANGE',BONUS_LEDGER_ALL_KEY,0,30000]]))[0].result;
 if(!Array.isArray(ids))throw Error('Не удалось загрузить историю круток');
 if(ids.length>30000)throw Error('История круток слишком велика; уточните индекс перед сверкой');
 // Read batches in one pipeline instead of two sequential round trips per 300 records.
 const commands=[];for(let i=0;i<ids.length;i+=300)commands.push(['MGET',...ids.slice(i,i+300).map(id=>BONUS_LEDGER_ENTRY_PREFIX+id)]);
 for(let offset=0;offset<commands.length;offset+=20){const chunk=commands.slice(offset,offset+20),results=await run(chunk);results.forEach((row,i)=>{
  const vals=row.result;if(!Array.isArray(vals)||vals.length!==chunk[i].length-1)throw Error('Не удалось загрузить историю круток');
  for(const raw of vals){if(!raw)throw Error('В истории круток отсутствует операция');const e=JSON.parse(raw);if(e.operation_type==='admin_debit'&&e.direction==='debit')entries.push(e);}
 });}
 const reviews={},reviewCommands=[];for(let i=0;i<entries.length;i+=300)reviewCommands.push(['HMGET',REVIEWS,...entries.slice(i,i+300).map(e=>e.id)]);
 for(let offset=0;offset<reviewCommands.length;offset+=20){const chunk=reviewCommands.slice(offset,offset+20),results=await run(chunk);results.forEach((row,i)=>{
  const values=row.result,command=chunk[i];if(!Array.isArray(values)||values.length!==command.length-2)throw Error('Не удалось загрузить возвраты');
  values.forEach((raw,j)=>reviews[command[j+2]]=raw||'');
 });}
 const relevant=entries.filter(e=>inside(e.created_at,period)||(reviews[e.id]&&inside(JSON.parse(reviews[e.id]).verifiedAt,period))),users=[...new Set(relevant.map(e=>e.user_id))],profiles={};
 for(let i=0;i<users.length;i+=300){const chunk=users.slice(i,i+300),links=(await run([['HMGET','poker_app:id_to_user',...chunk]]))[0].result||[];const all=[...new Set(chunk.concat(links.filter(Boolean)))];const fields=['poker_app:visitor_chat_display_names','poker_app:pokerplus_user_ids','poker_app:pokerplus_profiles'],values=await run(fields.map(k=>['HMGET',k,...all]));chunk.forEach((id,j)=>{const at=all.indexOf(id),linked=all.indexOf(links[j]);const value=n=>values[n].result?.[at]||values[n].result?.[linked]||'';let p={};try{p=JSON.parse(value(2)||'{}');}catch(_){}profiles[id]={name:p.nickname||p.nick||value(0)||id,playerId:String(value(1)||'')};});}
 const result=snapshot(relevant,reviews,profiles,period);if(startedGeneration===generation)cache.set(key,{value:result,until:Date.now()+15000});if(cache.size>20)cache.delete(cache.keys().next().value);return result;
}
async function saveReturn({operationId,amount,reviewVersion},actor,now=Date.now()){
 if(!/^bonus_[A-Za-z0-9_-]+$/.test(String(operationId||'')))throw Object.assign(Error('Укажите выдачу крутки'),{status:400});
 if(!Number.isSafeInteger(amount)||amount<0||amount>10000000000)throw Object.assign(Error('Укажите сумму возврата в пределах 100 000 000 ₽'),{status:400});
 const values=await run([['GET',BONUS_LEDGER_ENTRY_PREFIX+operationId],['HGET',REVIEWS,operationId]]),entry=values[0].result?JSON.parse(values[0].result):null,raw=values[1].result||'';
 if(!entry||entry.id!==operationId||entry.operation_type!=='admin_debit'||entry.direction!=='debit')throw Object.assign(Error('Выдача крутки не найдена'),{status:404});
 const old=raw?JSON.parse(raw):null,status=amount?'plus':'minus';if(old?.status===status&&Math.round(Number(old.amount||0)*100)===amount)return old;
 if(reviewVersion!==version(raw))throw Object.assign(Error('Возврат изменён другим менеджером. Обновите крутки.'),{status:409});
 const review={verifiedAt:new Date(now).toISOString(),adminId:String(actor),status,amount:amount/100,edits:(old?.edits||[]).concat(old?[{at:new Date(now).toISOString(),by:String(actor),before:{amount:old.amount,status:old.status,verifiedAt:old.verifiedAt,adminId:old.adminId}}]:[])};
 const lua="local old=redis.call('HGET',KEYS[1],ARGV[1]) or ''; if old~=ARGV[2] then return 0 end; redis.call('HSET',KEYS[1],ARGV[1],ARGV[3]); return 1";
 if(Number((await run([['EVAL',lua,1,REVIEWS,operationId,raw,JSON.stringify(review)]]))[0].result)!==1)throw Object.assign(Error('Возврат изменён другим менеджером. Обновите крутки.'),{status:409});generation++;cache.clear();pending.clear();return review;
}
function mergeReturns(view,s){view.statistics.spinReturnsAvailable=true;view.statistics.spinReturned=s.returned;view.statistics.returned+=s.returned;for(const r of s.returns){const id=String(r.createdBy||'unknown'),plain=id.replace(/^tg_/,'');let m=view.statistics.managers.find(m=>String(m.id).replace(/^tg_/,'')===plain);if(!m){m={id,name:({'2144406710':'Аня','1897001087':'Вика'})[plain]||'Администратор',deposits:0,returned:0,reserved:0,outgoing:0,destinations:[]};view.statistics.managers.push(m);}m.returned+=r.amount;}return view;}
module.exports={snapshot,loadSnapshot,saveReturn,mergeReturns};
