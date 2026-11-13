'use strict';
const redis=require('./redis');
const {STORE_KEY}=require('./telegram-deposit-withdrawals');
const {guardedFetch}=require('./telegram-group-policy');
const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
async function mutate(update){
  for(let i=0;i<8;i++){
    const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const raw=row.result||'',state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
    const changed=update(state);
    if(!changed)return false;
    state.revision=(state.revision||0)+1;
    const [saved]=await redis.pipeline([['EVAL',CAS,1,STORE_KEY,raw,JSON.stringify(state)]],{throwOnError:true});
    if(Number(saved.result)===1)return true;
  }
  throw Error('Concurrent ledger update');
}
async function savePayment(payment){
  return mutate(state=>{
    const payments=state.paymentFormPayments||=[];
    const old=payments.find(p=>p.providerId==='robokassa'&&p.id===payment.id);
    if(old){if(old.amount!==payment.amount)throw Error('Conflicting payment');return false;}
    if(payments.length>=20000)throw Error('Payment limit');
    require('./deposit-unique-links').matchPayment(state,payment,payment.id);
    payments.push(payment);return true;
  });
}
function chatId(){return process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID||process.env.PRODAMUS_WITHDRAWALS_CHAT_ID||'';}
async function send(text){
  const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
  if(!token||!/^-[0-9]+$/.test(chatId()))throw Error('Notifications not configured');
  const response=await guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{
    method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),
    body:JSON.stringify({chat_id:chatId(),text,link_preview_options:{is_disabled:true}})
  },'robokassa-payment');
  if(!response.ok||!(await response.json()).ok)throw Error('Telegram delivery failed');
}
async function deliver(payment){
  const key='poker21:robokassa:notify:'+payment.id;
  const [claim]=await redis.pipeline([['SET',key,'claimed','NX','PX',60000]],{throwOnError:true});
  if(claim.result!=='OK')return;
  // A long-lived claim also suppresses an already delivered payment in a stale cron snapshot.
  const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
  const current=JSON.parse(row.result||'{}').paymentFormPayments?.find(p=>p.providerId==='robokassa'&&p.id===payment.id);
  if(!current||current.notifiedAt)return;
  const money=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB'}).format(current.amount/100);
  try{
    await send('Поступление через Robokassa · '+money+' · заказ №'+current.id);
    await mutate(state=>{const p=state.paymentFormPayments?.find(p=>p.providerId==='robokassa'&&p.id===current.id);if(!p||p.notifiedAt)return false;p.notifiedAt=Date.now();return true;});
  }catch(error){await redis.pipeline([['DEL',key]],{throwOnError:true});throw error;}
}
module.exports={savePayment,deliver,send};
