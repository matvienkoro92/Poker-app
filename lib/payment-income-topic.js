'use strict';
const redis=require('./redis');
const {config}=require('./telegram-support-config');
const {guardedFetch}=require('./telegram-group-policy');
const PREFIX='poker_app:telegram:income:';
const pendingKey = PREFIX+'pending';
const dueKey = PREFIX+'pending-due:v1';
const enqueue = `
redis.call('ZADD',KEYS[2],'NX',0,ARGV[1])
return redis.call('HSET',KEYS[1],ARGV[1],ARGV[2])`;
const finish = `
if ARGV[2]=='sent' then redis.call('SET',KEYS[3],'sent') end
redis.call('HDEL',KEYS[1],ARGV[1])
return redis.call('ZREM',KEYS[2],ARGV[1])`;
const take = `
if redis.call('EXISTS',KEYS[3])==0 then
  for _,id in ipairs(redis.call('HKEYS',KEYS[1])) do redis.call('ZADD',KEYS[2],'NX',0,id) end
  redis.call('SET',KEYS[3],'1')
end
local ids=redis.call('ZRANGEBYSCORE',KEYS[2],'-inf',ARGV[1],'LIMIT',0,10)
local batch={}
for _,id in ipairs(ids) do
  local raw=redis.call('HGET',KEYS[1],id)
  if raw then
    redis.call('ZADD',KEYS[2],ARGV[2],id)
    table.insert(batch,raw)
  else redis.call('ZREM',KEYS[2],id) end
end
return batch`;
async function notify(payment, queued = false){
  if(!['prodamus','robokassa','mandarin','cashera'].includes(payment.providerId)||!(['mandarin','cashera'].includes(payment.providerId)?/^[0-9a-f-]{36}$/:/^\d{1,64}$/).test(String(payment.id)))return false;
  const cfg=await config(),token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
  if(!cfg?.enabled||!token)return;
  const group=String(cfg.chatId),topicKey=PREFIX+'topic:'+group;
  const pendingId=payment.providerId+':'+payment.id;
  if (!queued) await redis.pipeline([['EVAL',enqueue,2,pendingKey,dueKey,pendingId,JSON.stringify(payment)]],{throwOnError:true});
  async function read(key){const [row]=await redis.pipeline([['GET',key]],{throwOnError:true});return row?.result;}
  async function api(method,body){
    const response=await guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:group,...body}),signal:AbortSignal.timeout(8000)},'payment-income-topic');
    const data=await response.json();
    if(!response.ok||!data.ok)throw Error(data.description||'Income topic delivery failed');
    return data.result;
  }
  const sentKey=PREFIX+'sent:'+group+':'+payment.providerId+':'+payment.id;
  const complete = sent => redis.pipeline([['EVAL',finish,3,pendingKey,dueKey,sentKey,pendingId,sent]],{throwOnError:true});
  if(await read(sentKey)){await complete('already');return true;}
  const lockKey=PREFIX+'lock:'+group;
  const lock=require('node:crypto').randomUUID();
  const [claim]=await redis.pipeline([['SET',lockKey,lock,'NX','EX',60]],{throwOnError:true});
  if(claim.result!=='OK')throw Error('Income topic busy');
  try{
    if(await read(sentKey)){await complete('already');return true;}
    let thread=Number(await read(topicKey));
    async function create(){
      const topic=await api('createForumTopic',{name:'Приходы'});
      if(!Number.isSafeInteger(topic?.message_thread_id)||topic.message_thread_id<=0)throw Error('Invalid income topic');
      thread=topic.message_thread_id;
      await redis.pipeline([['SET',topicKey,String(thread)]],{throwOnError:true});
    }
    if(!Number.isSafeInteger(thread)||thread<=0)await create();
    const amount=require('./deposit-payment-forms').providerDisplayAmount(payment.providerId,payment.amount);
    const money=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',minimumFractionDigits:0,maximumFractionDigits:2}).format(amount/100);
    const text='💳 <b>'+({prodamus:'Продамус',robokassa:'Робокасса',mandarin:'Мандарин',cashera:'Cashera'}[payment.providerId])+'</b> - '+money+'\n№'+payment.id;
    const send=()=>api('sendMessage',{message_thread_id:thread,parse_mode:'HTML',text});
    try{await send();}catch(error){
      if(/TOPIC_CLOSED/i.test(error.message)){await api('reopenForumTopic',{message_thread_id:thread});await send();}
      else if(/TOPIC_ID_INVALID|message thread not found|TOPIC_DELETED/i.test(error.message)){await create();await send();}
      else throw error;
    }
    await require('./payment-notification-queue').acknowledge(()=>complete('sent'));
    return true;
  }finally{
    await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,lockKey,lock]],{throwOnError:true});
  }
}
async function retryPending(){
  const now = Date.now();
  const [row]=await redis.pipeline([['EVAL',take,3,pendingKey,dueKey,dueKey+':initialized',now,now+60000]],{throwOnError:true});
  for(const raw of row.result){
    try{await notify(JSON.parse(raw), true);}catch{console.error('Income topic retry failed');}
  }
}
module.exports={notify,retryPending,PREFIX};
