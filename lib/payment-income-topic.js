'use strict';
const redis=require('./redis');
const {config}=require('./telegram-support-config');
const {guardedFetch}=require('./telegram-group-policy');
const PREFIX='poker_app:telegram:income:';
async function notify(payment){
  if(!['prodamus','robokassa'].includes(payment.providerId)||!/^\d{1,64}$/.test(String(payment.id)))return;
  const cfg=await config(),token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
  if(!cfg?.enabled||!token)return;
  const group=String(cfg.chatId),topicKey=PREFIX+'topic:'+group;
  const pendingId=payment.providerId+':'+payment.id;
  await redis.pipeline([['HSET',PREFIX+'pending',pendingId,JSON.stringify(payment)]],{throwOnError:true});
  async function read(key){const [row]=await redis.pipeline([['GET',key]],{throwOnError:true});return row?.result;}
  async function api(method,body){
    const response=await guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:group,...body}),signal:AbortSignal.timeout(8000)},'payment-income-topic');
    const data=await response.json();
    if(!response.ok||!data.ok)throw Error(data.description||'Income topic delivery failed');
    return data.result;
  }
  const sentKey=PREFIX+'sent:'+group+':'+payment.providerId+':'+payment.id;
  if(await read(sentKey)){await redis.pipeline([['HDEL',PREFIX+'pending',pendingId]],{throwOnError:true});return;}
  const lockKey=PREFIX+'lock:'+group;
  const lock=require('node:crypto').randomUUID();
  const [claim]=await redis.pipeline([['SET',lockKey,lock,'NX','EX',60]],{throwOnError:true});
  if(claim.result!=='OK')throw Error('Income topic busy');
  try{
    if(await read(sentKey)){await redis.pipeline([['HDEL',PREFIX+'pending',pendingId]],{throwOnError:true});return;}
    let thread=Number(await read(topicKey));
    async function create(){
      const topic=await api('createForumTopic',{name:'Приходы'});
      if(!Number.isSafeInteger(topic?.message_thread_id)||topic.message_thread_id<=0)throw Error('Invalid income topic');
      thread=topic.message_thread_id;
      await redis.pipeline([['SET',topicKey,String(thread)]],{throwOnError:true});
    }
    if(!Number.isSafeInteger(thread)||thread<=0)await create();
    const amount=payment.providerId==='prodamus'?require('./deposit-payment-forms').prodamusDisplayAmount(payment.amount):payment.amount;
    const money=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',minimumFractionDigits:0,maximumFractionDigits:2}).format(amount/100);
    const text='💳 <b>'+(payment.providerId==='prodamus'?'Продамус':'Робокасса')+'</b> - '+money+'\n№'+payment.id;
    const send=()=>api('sendMessage',{message_thread_id:thread,parse_mode:'HTML',text});
    try{await send();}catch(error){
      if(/TOPIC_CLOSED/i.test(error.message)){await api('reopenForumTopic',{message_thread_id:thread});await send();}
      else if(/TOPIC_ID_INVALID|message thread not found|TOPIC_DELETED/i.test(error.message)){await create();await send();}
      else throw error;
    }
    await redis.pipeline([['SET',sentKey,'sent'],['HDEL',PREFIX+'pending',pendingId]],{throwOnError:true});
  }finally{
    await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,lockKey,lock]],{throwOnError:true});
  }
}
async function retryPending(){
  const [row]=await redis.pipeline([['HVALS',PREFIX+'pending']],{throwOnError:true});
  for(const raw of (row?.result||[]).slice(0,10)){
    try{await notify(JSON.parse(raw));}catch{console.error('Income topic retry failed');}
  }
}
module.exports={notify,retryPending,PREFIX};
