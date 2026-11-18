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
  if(previous){if(previous.link.unique||previous.actor!==actor||previous.link.amount!==body.amount)fail('Номер выдачи уже использован',409);if(!Object.hasOwn(links,previous.link.providerId))fail('Выдача ссылок этого провайдера приостановлена. Запросите новую ссылку.',409);return {link:previous.link,duplicate:true};}
  const forms=paymentForms(now);
  const inPeriod=at=>at>=forms.period.start&&at<forms.period.end;
  const positive=n=>Number.isSafeInteger(n)&&n>0;
  // Compare actual gross receipts for every provider, not player-credit totals.
  // Callback receipts count even before assignment; linked incomes replace no
  // money and must not count a second time. Voiding an assignment isn't a refund.
  const receipts=(state.paymentFormPayments||[]).filter(p=>p.status==='confirmed'&&positive(p.amount)&&typeof p.id==='string'&&p.id.length>0);
  function acceptedAmount(providerId){
    const field=providerId+'PaymentId';
    const callbacks=receipts.filter(p=>p.providerId===providerId);
    const knownIds=new Set(callbacks.map(p=>p.id));
    const manual=(state.channelOperations||[]).filter(r=>r.channelId===providerId&&r.direction==='income'&&!r.voidedAt&&inPeriod(r.createdAt)&&!knownIds.has(r[field]));
    return callbacks.filter(p=>inPeriod(p.confirmedAt)).reduce((sum,p)=>sum+p.amount,0)+manual.reduce((sum,r)=>{const gross=r.grossAmount??r.amount;return sum+(positive(gross)?gross:0);},0);
  }
  const candidates=Object.entries(links).flatMap(([providerId,options])=>options
    .filter(option=>option.amount===body.amount)
    .map(option=>({...option,providerId,providerName:providerId==='prodamus'?'Продамус':'Робокасса',acceptedAmount:acceptedAmount(providerId)})));
  if(!candidates.length)fail('Нет доступной ссылки на эту сумму',503);
  const last=state.paymentLinkRouting;
  const issuedCounts=last?.day===forms.period.start?{...last.issuedCounts}:{};
  candidates.sort((a,b)=>a.acceptedAmount-b.acceptedAmount||(issuedCounts[a.providerId]||0)-(issuedCounts[b.providerId]||0)||Number(last?.day===forms.period.start&&last.providerId===a.providerId)-Number(last?.day===forms.period.start&&last.providerId===b.providerId)||a.providerId.localeCompare(b.providerId));
  const link={...candidates[0],period:forms.period};
  issuedCounts[link.providerId]=(issuedCounts[link.providerId]||0)+1;
  state.paymentLinkRouting={day:forms.period.start,providerId:link.providerId,issuedCounts};
  state.paymentLinkIssues=(state.paymentLinkIssues||[]).slice(-199);
  state.paymentLinkIssues.push({id:body.requestId,actor,createdAt:now,link});
  state.revision=(state.revision||0)+1;
  return {link,duplicate:false};
}
module.exports={issuePaymentLink};
