'use strict';
const crypto=require('node:crypto'),redis=require('./redis');
const PREFIX='poker_app:cash_guard:v1:',OWNERS=new Set(['388008256','5053253480']);
// An in-process capability; JSON input cannot request the raffle exemption.
const RAFFLE_AWARD=Symbol('confirmed-raffle-award');
const keys=['recent','receipts','pending','approved','rejected','blocked'].map(s=>PREFIX+s);
const CHECK=`
local old=redis.call('HGET',KEYS[2],ARGV[1]);if old then if old~=ARGV[2] then return 'conflict' end;return 'allowed' end
if redis.call('HEXISTS',KEYS[5],ARGV[1])==1 then return 'rejected' end
local approval=redis.call('HGET',KEYS[4],ARGV[1])
if approval and approval==ARGV[2] then
 redis.call('HSET',KEYS[2],ARGV[1],ARGV[2]);redis.call('HDEL',KEYS[4],ARGV[1]);redis.call('HDEL',KEYS[3],ARGV[1]);return 'allowed'
end
local time=redis.call('TIME');local now=tonumber(time[1])*1000+math.floor(tonumber(time[2])/1000)
redis.call('ZREMRANGEBYSCORE',KEYS[1],'-inf',now-600000)
if redis.call('EXISTS',KEYS[6])==0 and redis.call('ZCARD',KEYS[1])<4 then
 redis.call('ZADD',KEYS[1],now,ARGV[1]);redis.call('HSET',KEYS[2],ARGV[1],ARGV[2]);return 'allowed'
end
redis.call('SET',KEYS[6],'1');redis.call('HSET',KEYS[3],ARGV[1],ARGV[3]);return 'pending'
`;
const DECIDE=`
local raw=redis.call('GET',KEYS[1]);if not raw then return 'expired' end
local snapshot=cjson.decode(raw)
for _,item in ipairs(snapshot) do
 if redis.call('HGET',KEYS[2],item.id)~=item.raw then return 'changed' end
end
for _,item in ipairs(snapshot) do
 local operation=cjson.decode(item.raw)
 redis.call('HSET',KEYS[3],item.id,operation.fingerprint)
 redis.call('HDEL',KEYS[2],item.id)
end
local time=redis.call('TIME');redis.call('LPUSH',KEYS[4],cjson.encode({owner=ARGV[1],decision=ARGV[2],at=time[1],items=snapshot}));redis.call('LTRIM',KEYS[4],0,9999)
redis.call('DEL',KEYS[1]);return 'ok'
`;
async function run(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'cash-guard'});if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Cash guard storage unavailable');return rows.map(r=>r.result);}
function descriptor(input){
 const o={action:input.action||'change',operationId:String(input.operationId||''),userId:String(input.userId||''),chips:String(Number(input.chips)),agentId:String(input.agentId||'')};
 if(!o.operationId||!o.userId||!Number.isFinite(Number(o.chips))||Number(o.chips)===0)throw Error('Invalid guarded cash operation');
 const id=crypto.createHash('sha256').update(o.action+':'+o.operationId).digest('hex');
 const fingerprint=crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex');
 return {id,fingerprint,...o,reference:String(input.reference||'').slice(0,160),requestedBy:String(input.requestedBy||'').slice(0,80)};
}
async function telegram(method,body){
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;if(!token)throw Error('Cash approval bot unavailable');
 const response=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)},'');
 const result=await response.json();if(!response.ok||!result.ok)throw Error('Cash approval Telegram delivery failed');return result.result;
}
async function notify(){
 const key=PREFIX+'notice',nonce=crypto.randomUUID();const [claim]=await run([['SET',key,nonce,'NX','EX',300]]);if(claim!=='OK')return;
 try{await telegram('sendMessage',{chat_id:388008256,text:'🛑 Защита кассы: достигнут порог 5 операций за 10 минут. Следующие списания и начисления остановлены до вашего подтверждения. Выдача призов розыгрышей не блокируется.',reply_markup:{inline_keyboard:[[{text:'Проверить операции',callback_data:'cash-guard:review'}]]}});}
 catch{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",1,key,nonce]]);}
}
async function check(input){
 if(input.exemption===RAFFLE_AWARD&&input.action!=='agentTransfer'&&Number(input.chips)>0)return;
 const operation=descriptor(input),[result]=await run([['EVAL',CHECK,keys.length,...keys,operation.id,operation.fingerprint,JSON.stringify(operation)]]);
 if(result==='allowed')return;
 if(result==='pending')await notify();
 throw Object.assign(Error(result==='pending'?'Массовые операции кассы остановлены: требуется подтверждение владельца.':result==='rejected'?'Операция кассы отклонена владельцем.':'Cash guard operation conflict'),{statusCode:409,code:result==='pending'?'CASH_APPROVAL_REQUIRED':result==='rejected'?'CASH_OPERATION_REJECTED':'CASH_GUARD_CONFLICT'});
}
function pairs(raw){if(Array.isArray(raw)){const result=[];for(let i=0;i<raw.length;i+=2)result.push({id:raw[i],raw:raw[i+1]});return result;}return Object.entries(raw||{}).map(([id,value])=>({id,raw:value}));}
async function review(chatId){
 const [count,page]=await run([['HLEN',keys[2]],['HSCAN',keys[2],'0','COUNT',10]]);const items=pairs(page?.[1]||[]).slice(0,10);
 if(!items.length){await telegram('sendMessage',{chat_id:chatId,text:'Очередь подтверждений пуста. Автоматические операции остаются приостановлены. Для возобновления отправьте /cash_resume.'});return;}
 const token=crypto.randomBytes(12).toString('hex');await run([['SET',PREFIX+'review:'+token,JSON.stringify(items),'EX',900]]);
 const rows=items.map((item,i)=>{const o=JSON.parse(item.raw);return (i+1)+'. '+(Number(o.chips)>0?'+':'')+o.chips+' · ID '+o.userId+'\n'+o.reference+'\n'+o.requestedBy;});
 const sum=items.reduce((s,item)=>s+Number(JSON.parse(item.raw).chips),0);
 await telegram('sendMessage',{chat_id:chatId,text:'🛑 Подтверждение кассы\n\n'+rows.join('\n\n')+'\n\nОпераций в списке: '+items.length+'. Всего в очереди: '+Number(count)+'.\nИтог списка: '+sum+' фишек.\nРазрешение касается только этого списка. После подтверждения операции выполнятся при следующем запуске своего обработчика.',reply_markup:{inline_keyboard:[[{text:'✅ Разрешить этот список',callback_data:'cash-guard:approve:'+token}],[{text:'❌ Отклонить этот список',callback_data:'cash-guard:reject:'+token}],[{text:'Обновить список',callback_data:'cash-guard:review'}]]}});
}
async function handle(update){
 const cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
 const action=cb?.data||String(m?.text||'').trim();
 const ours=String(action).startsWith('cash-guard:')||/^\/cash_(?:review|resume)(?:@Poker_dvatuza_bot)?$/i.test(action);
 if(!ours)return false;
 if(!OWNERS.has(String(user?.id))||m?.chat?.type!=='private'||!OWNERS.has(String(m.chat.id))){if(cb)await telegram('answerCallbackQuery',{callback_query_id:cb.id,text:'Только для владельца.',show_alert:true});return true;}
 if(cb)await telegram('answerCallbackQuery',{callback_query_id:cb.id});
 if(action==='cash-guard:review'||/^\/cash_review/i.test(action)){await review(m.chat.id);return true;}
 if(/^\/cash_resume/i.test(action)){
  const [ok]=await run([['EVAL',"if redis.call('HLEN',KEYS[1])>0 or redis.call('HLEN',KEYS[2])>0 then return 0 end;redis.call('DEL',KEYS[3],KEYS[4],KEYS[5]);return 1",5,keys[2],keys[3],keys[5],keys[0],PREFIX+'notice']]);
  await telegram('sendMessage',{chat_id:m.chat.id,text:Number(ok)===1?'Автоматическая касса возобновлена. Защита перед 5-й операцией снова включена.':'Сначала завершите обработку разрешённых операций и разберите очередь через /cash_review.'});return true;
 }
 const match=String(action).match(/^cash-guard:(approve|reject):([a-f0-9]{24})$/);if(!match)return true;
 const [result]=await run([['EVAL',DECIDE,4,PREFIX+'review:'+match[2],keys[2],match[1]==='approve'?keys[3]:keys[4],PREFIX+'audit',String(user.id),match[1]]]);
 await telegram('sendMessage',{chat_id:m.chat.id,text:result==='ok'?(match[1]==='approve'?'Разрешён только показанный список операций. Новые операции по-прежнему требуют подтверждения.':'Показанный список отклонён. Списания и начисления по нему запрещены.'):'Список устарел или изменился. Запросите новый: /cash_review.'});return true;
}
module.exports={check,handle,descriptor,RAFFLE_AWARD,CHECK,DECIDE,PREFIX,keys};
