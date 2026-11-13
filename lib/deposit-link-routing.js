'use strict';
const {paymentForms}=require('./deposit-payment-forms');
// amount = player credit; chargeAmount = the amount paid on the provider page.
const links={
  prodamus:[
    {amount:100000,chargeAmount:110000,url:'https://payform.ru/4jah7zO/'},
    {amount:200000,chargeAmount:218000,url:'https://payform.ru/8tah7Dv/'}
  ],
  robokassa:[
    {amount:100000,chargeAmount:110000,url:'https://auth.robokassa.ru/merchant/Invoice/5e7le7e7QEGxdnfw3LM26w'},
    {amount:150000,chargeAmount:165000,url:'https://auth.robokassa.ru/merchant/Invoice/8L_bPcBj-Ei3Q2Nv5FfKIA'},
    {amount:200000,chargeAmount:218000,url:'https://auth.robokassa.ru/merchant/Invoice/JjnpCWNhXkmctyXfYliPCA'}
  ]
};
function issuePaymentLink(state,body,actor,now=Date.now()){
  function fail(message,status=400){throw Object.assign(Error(message),{status});}
  if(![100000,150000,200000].includes(body.amount))fail('Выберите сумму 1 000, 1 500 или 2 000 ₽');
  if(typeof body.requestId!=='string'||!/^[a-zA-Z0-9_-]{16,100}$/.test(body.requestId))fail('Обновите окно выдачи ссылки');
  if(body.unique!==undefined&&typeof body.unique!=='boolean')fail('Некорректный режим ссылки');
  if(body.unique===true)fail('Персональные ссылки отключены. Используйте обычную ссылку.');
  if((state.paymentLinkOrders||[]).some(o=>o.requestId===body.requestId))fail('Номер выдачи уже использован',409);
  const previous=(state.paymentLinkIssues||[]).find(r=>r.id===body.requestId);
  if(previous){if(previous.link.unique||previous.actor!==actor||previous.link.amount!==body.amount)fail('Номер выдачи уже использован',409);return {link:previous.link,duplicate:true};}
  // Count a callback payment once, even after a manager links it to an income record.
  const operations=state.channelOperations||[];
  const payments=(state.paymentFormPayments||[]).filter(p=>!operations.some(r=>!r.voidedAt&&r.channelId===p.providerId&&(p.providerId==='robokassa'?r.robokassaPaymentId:r.prodamusPaymentId)===p.id));
  const forms=paymentForms(now,payments,operations);
  // Owner's temporary provider mapping for all newly issued links.
  const preferredProvider=body.amount===200000?'prodamus':'robokassa';
  const candidates=Object.entries(links).filter(([id])=>id===preferredProvider).flatMap(([providerId,options])=>options.filter(o=>o.amount===body.amount).map(o=>({...o,providerId,providerName:providerId==='prodamus'?'Продамус':'Робокасса',acceptedAmount:forms.providers.find(p=>p.id===providerId).total||0})));
  if(!candidates.length)fail('Нет доступной ссылки на эту сумму',503);
  const last=state.paymentLinkRouting;
  candidates.sort((a,b)=>a.acceptedAmount-b.acceptedAmount||Number(last?.day===forms.period.start&&last.providerId===a.providerId)-Number(last?.day===forms.period.start&&last.providerId===b.providerId)||a.providerId.localeCompare(b.providerId));
  const link={...candidates[0],period:forms.period};
  state.paymentLinkRouting={day:forms.period.start,providerId:link.providerId};
  state.paymentLinkIssues=(state.paymentLinkIssues||[]).slice(-199);
  state.paymentLinkIssues.push({id:body.requestId,actor,createdAt:now,link});
  state.revision=(state.revision||0)+1;
  return {link,duplicate:false};
}
module.exports={issuePaymentLink};
