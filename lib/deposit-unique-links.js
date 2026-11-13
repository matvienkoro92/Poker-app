'use strict';
const {createHash,createHmac,randomInt}=require('node:crypto');
function fail(message,status=400){throw Object.assign(Error(message),{status});}
function canonical(value){
  if(value&&typeof value==='object')return Array.isArray(value)?'['+value.map(canonical).join(',')+']':'{'+Object.keys(value).sort().map(k=>canonical(k)+':'+canonical(value[k])).join(',')+'}';
  return JSON.stringify(String(value)).replaceAll('/','\\/');
}
function identity(body){
  const result={};
  for(const field of ['playerId','clubId','room']){
    if(typeof body[field]!=='string'||! /^[a-zA-Z0-9_-]{1,64}$/.test(body[field]))fail('Укажите рум, ID игрока и ID клуба');
    result[field]=body[field];
  }
  if(!['P21','X','Supr','PP'].includes(result.room))fail('Выберите рум игрока');
  return result;
}
function configured(provider,env=process.env){
  if(provider==='robokassa')return Boolean(env.ROBOKASSA_PASSWORD1&&env.ROBOKASSA_PASSWORD2&&env.ROBOKASSA_MERCHANT_LOGIN&&env.ROBOKASSA_LINK_DESCRIPTION&&(env.ROBOKASSA_LINK_RECEIPT_ITEM||env.ROBOKASSA_LINK_FISCAL_MODE==='shop'));
  return Boolean(env.PRODAMUS_WEBHOOK_SECRET&&env.PRODAMUS_INTEGRATION_SYS&&env.PRODAMUS_LINK_PRODUCT_NAME);
}
function buildUniqueLink(link,orderId,env=process.env){
  if(!configured(link.providerId,env))fail('Персональные ссылки этого сервиса ещё не настроены',503);
  const sum=(link.chargeAmount/100).toFixed(2);
  if(link.providerId==='robokassa'){
    const algorithm=env.ROBOKASSA_HASH_ALGORITHM||'md5';
    if(!['md5','sha256','sha512'].includes(algorithm))fail('Проверьте алгоритм подписи Робокассы',503);
    const params={MerchantLogin:env.ROBOKASSA_MERCHANT_LOGIN,OutSum:sum,InvId:orderId,Description:env.ROBOKASSA_LINK_DESCRIPTION,Culture:'ru'};
    // Supply the shop's actual fiscal item template; never invent its tax settings.
    let receipt;
    if(env.ROBOKASSA_LINK_RECEIPT_ITEM){
      let item;try{item=JSON.parse(env.ROBOKASSA_LINK_RECEIPT_ITEM);}catch{fail('Проверьте шаблон чека Робокассы',503);}
      if(!item||typeof item!=='object'||Array.isArray(item)||!item.name||!item.tax)fail('Проверьте шаблон чека Робокассы',503);
      receipt=encodeURIComponent(JSON.stringify({items:[{...item,quantity:1,sum:Number(sum)}]}));
      params.Receipt=receipt;
    }
    params.SignatureValue=createHash(algorithm).update([params.MerchantLogin,sum,orderId,...(receipt?[receipt]:[]),env.ROBOKASSA_PASSWORD1].join(':')).digest('hex');
    return 'https://auth.robokassa.ru/Merchant/Index.aspx?'+new URLSearchParams(params);
  }
  const data={do:'pay',sys:env.PRODAMUS_INTEGRATION_SYS,order_id:orderId,products:[{name:env.PRODAMUS_LINK_PRODUCT_NAME,price:sum,quantity:'1'}]};
  data.signature=createHmac('sha256',env.PRODAMUS_WEBHOOK_SECRET).update(canonical(data)).digest('hex');
  const params=new URLSearchParams();
  for(const [key,value] of Object.entries(data)){
    if(key==='products')for(const [field,v] of Object.entries(value[0]))params.set('products[0]['+field+']',v);
    else params.set(key,value);
  }
  return 'https://matro.payform.ru/?'+params;
}
function newOrderId(state){
  // 18 decimal digits fit Robokassa's signed 64-bit invoice field. Keep as a string.
  for(let i=0;i<10;i++){
    const id='8'+String(randomInt(0,100000000)).padStart(8,'0')+String(randomInt(0,1000000000)).padStart(9,'0');
    if(!(state.paymentLinkOrders||[]).some(o=>o.id===id)&&!(state.paymentFormPayments||[]).some(p=>p.id===id))return id;
  }
  fail('Не удалось создать номер заявки',503);
}
function matchPayment(state,payment,reference){
  const order=(state.paymentLinkOrders||[]).find(o=>o.id===reference&&o.providerId===payment.providerId);
  if(!order)return;
  // Keep every real payment in reconciliation, including unexpected amounts or
  // a second payment of the same order. Neither should pay the order twice.
  if(order.chargeAmount!==payment.amount){payment.orderReviewReason='Сумма отличается от заявки №'+order.id;return;}
  if(order.paymentId&&order.paymentId!==payment.id){payment.orderReviewReason='Повторная оплата заявки №'+order.id;return;}
  Object.assign(payment,{paymentLinkOrderId:order.id,playerId:order.playerId,clubId:order.clubId,room:order.room,creditAmount:order.amount});
  Object.assign(order,{status:'paid',paymentId:payment.id,paidAt:payment.confirmedAt});
}
module.exports={identity,configured,buildUniqueLink,newOrderId,matchPayment,canonical};
