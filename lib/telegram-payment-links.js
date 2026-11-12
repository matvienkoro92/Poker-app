'use strict';
const redis=require('./redis');
const policy=require('./telegram-group-policy');
const {isAdmin}=require('./api-auth');
const {issuePaymentLink}=require('./deposit-link-routing');
const {STORE_KEY}=require('./telegram-deposit-withdrawals');
const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
async function handle(update,token){
  const amount=policy.paymentLinkCommandAmount(update),m=update.message||update.business_message;
  if(!amount||!m||!token||!policy.isPaymentLinkGroup(m.chat?.id)||!m.from||m.from.is_bot||!isAdmin(m.from.id)||!Number.isSafeInteger(m.message_id)||!redis.isConfigured())return false;
  const key='poker21:payment-link-reply:'+m.chat.id+':'+m.message_id;
  const [claim]=await redis.pipeline([['SET',key,'pending','NX','EX',60]],{throwOnError:true,context:'telegram-payment-links.claim'});
  if(claim.result!=='OK')return true;
  try{
    let link;
    for(let i=0;i<8;i++){
      const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true,context:'telegram-payment-links.read'});
      const raw=row.result||'',state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
      const issued=issuePaymentLink(state,{amount,requestId:'telegram_payment_link_'+m.chat.id+'_'+m.message_id},'tg_'+m.from.id);
      if(issued.duplicate){link=issued.link;break;}
      const [saved]=await redis.pipeline([['EVAL',CAS,1,STORE_KEY,raw,JSON.stringify(state)]],{throwOnError:true,context:'telegram-payment-links.issue'});
      if(Number(saved.result)===1){link=issued.link;break;}
    }
    if(!link)throw Error('Concurrent ledger update');
    const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
    const response=await policy.guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{
      method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),
      body:JSON.stringify({chat_id:m.chat.id,text:'Пополнение игроку: '+money(link.amount)+'\n'+link.providerName+' · к оплате '+money(link.chargeAmount)+'\n\n'+link.url,reply_parameters:{message_id:m.message_id,allow_sending_without_reply:true},link_preview_options:{is_disabled:true}})
    },'payment-link-command');
    if(!response.ok||!(await response.json()).ok)throw Error('Telegram delivery failed');
    await redis.pipeline([['SET',key,'sent','EX',7*86400]],{throwOnError:true,context:'telegram-payment-links.sent'});
    return true;
  }catch(error){await redis.pipeline([['DEL',key]],{throwOnError:true,context:'telegram-payment-links.retry'});throw error;}
}
module.exports={handle};
