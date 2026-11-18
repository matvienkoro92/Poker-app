'use strict';
const redis=require('./redis');
const {STORE_KEY}=require('./telegram-deposit-withdrawals');
const {guardedFetch}=require('./telegram-group-policy');
const queue = require('./payment-notification-queue');
async function mutate(id, update){
  for(let i=0;i<8;i++){
    const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const raw=row.result||'',state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
    const changed=update(state);
    if(!changed)return false;
    state.revision=(state.revision||0)+1;
    const [saved]=await redis.pipeline([queue.saveCommand(STORE_KEY,raw,state,state.paymentFormPayments.find(p => p.providerId === 'robokassa' && p.id === id))],{throwOnError:true});
    if(Number(saved.result)===1)return true;
  }
  throw Error('Concurrent ledger update');
}
async function savePayment(payment){
  return mutate(payment.id, state=>{
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
    body:JSON.stringify({chat_id:chatId(),text,parse_mode:'HTML',link_preview_options:{is_disabled:true}})
  },'robokassa-payment');
  if(!response.ok||!(await response.json()).ok)throw Error('Telegram delivery failed');
}
async function deliver(payment){
  const key='poker21:robokassa:notify:'+payment.id;
  const owner=require('node:crypto').randomUUID();
  const [claim]=await redis.pipeline([['SET',key,owner,'NX','PX',60000]],{throwOnError:true});
  if(claim.result!=='OK')return;
  try {
    const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const current=JSON.parse(row.result||'{}').paymentFormPayments?.find(p=>p.providerId==='robokassa'&&p.id===payment.id);
    if(!current || (current.notifiedAt && !current.incomeNotificationPending))return;
    let topicFailed=false;
    try {await require('./payment-income-topic').notify(current);}
    catch {topicFailed=true;}
    if(!current.notifiedAt){
      const money=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB'}).format(require('./deposit-payment-forms').providerDisplayAmount('robokassa',current.amount)/100);
      await send('💳 <b>Робокасса</b> - '+money+'\n№'+current.id);
    }
    await queue.acknowledge(()=>mutate(current.id,state=>{
      const receipt=state.paymentFormPayments.find(p=>p.providerId==='robokassa' && p.id===current.id);
      if(!receipt || (receipt.notifiedAt && Boolean(receipt.incomeNotificationPending)===topicFailed))return false;
      receipt.notifiedAt ||= Date.now();
      if(topicFailed)receipt.incomeNotificationPending=true;
      else delete receipt.incomeNotificationPending;
      return true;
    }));
    if(topicFailed)throw Error('Income topic notification pending retry');
  } finally {
    await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,key,owner]],{throwOnError:true});
  }
}
async function retryPending(){
  const ids = await queue.takeDue(redis,STORE_KEY,'robokassa');
  let failed = false;
  for (const id of ids) {
    try { await deliver({id}); } catch { failed = true; }
  }
  if (failed) throw Error('Robokassa notifications pending');
}
module.exports={savePayment,deliver,send,retryPending};
