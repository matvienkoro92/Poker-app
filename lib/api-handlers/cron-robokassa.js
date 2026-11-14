'use strict';

const redis = require('../redis');
const {STORE_KEY} = require('../telegram-deposit-withdrawals');
const HOUR = 3600000;
const DAY = 24 * HOUR;
const rubles = new Intl.NumberFormat('ru-RU', {style:'currency', currency:'RUB'});
const date = new Intl.DateTimeFormat('ru-RU', {timeZone:'Europe/Moscow', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'});

function shiftReport(state, start, end, manager) {
  const payments = (state.paymentFormPayments || []).filter(row =>
    row.providerId === 'robokassa' && row.status === 'confirmed' && row.confirmedAt >= start && row.confirmedAt < end);
  const deposits = (state.channelOperations || []).filter(row =>
    row.channelId === 'robokassa' && row.direction === 'income' && !row.voidedAt && row.createdAt >= start && row.createdAt < end);
  const linked = new Map(deposits.filter(row => row.robokassaPaymentId).map(row => [row.robokassaPaymentId, row]));
  const sum = rows => rows.reduce((total, row) => total + row.amount, 0);
  const money = cents => rubles.format(cents / 100);
  const unassigned = payments.filter(row => !linked.has(row.id));
  const changed = payments.filter(row => linked.has(row.id) && linked.get(row.id).amount !== row.amount);
  const manual = deposits.filter(row => !row.robokassaPaymentId);
  return [
    'Робокасса · смена '+manager+' · '+date.format(start)+' — '+date.format(end)+' МСК',
    'По уведомлениям: '+payments.length+' оплат на '+money(sum(payments)),
    'В депозитах: '+deposits.length+' записей на '+money(sum(deposits)),
    'Разница (уведомления минус депозиты): '+money(sum(payments)-sum(deposits)),
    'Без привязки к депозиту: '+unassigned.length+' на '+money(sum(unassigned)),
    'Ручные записи без номера платежа: '+manual.length+' на '+money(sum(manual)),
    'Привязанные записи с отличающейся суммой: '+changed.length,
    'Итог кабинета за смену требует отдельной сверки: https://partner.robokassa.ru/Operation'
  ].join('\n');
}

module.exports = async function(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET')return res.status(405).end();
  if(!process.env.CRON_SECRET||req.headers.authorization!=='Bearer '+process.env.CRON_SECRET)return res.status(403).end();
  const mail=require('../robokassa-mail');
  if(redis.isConfigured())try{await require('../payment-income-topic').retryPending();}catch{console.error('Income topic retries unavailable');}
  if(!process.env.ROBOKASSA_PASSWORD2&&!mail.configured())return res.status(200).json({ok:true,skipped:true,reason:'not_configured'});
  if(!redis.isConfigured())return res.status(503).end();
  try{
    const payments=require('../robokassa-payments');
    let mailResult;
    try{mailResult=await mail.poll();}catch{mailResult={ok:false};console.error('Robokassa mail polling failed');}
    const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const state=JSON.parse(row.result||'{}');
    for(const p of (state.paymentFormPayments||[]).filter(p=>p.providerId==='robokassa'&&p.status==='confirmed'&&!p.notifiedAt).slice(0,5))await payments.deliver(p);
    if(mailResult?.ok===false)return res.status(503).json({ok:false,mail:mailResult});
    const now=Date.now(),hour=new Date(now).getUTCHours(),end=Math.floor(now/HOUR)*HOUR;
    if(hour===15||hour===23){
      const key='poker21:robokassa:shift-report:'+end;
      const [claim]=await redis.pipeline([['SET',key,'claimed','NX','PX',7*DAY]],{throwOnError:true});
      if(claim.result==='OK'){
        try{await payments.send(shiftReport(state,end-(hour===15?12:8)*HOUR,end,hour===15?'Ани':'Вики'));}
        catch(error){await redis.pipeline([['DEL',key]],{throwOnError:true});throw error;}
      }
    }
    return res.status(mailResult?.ok===false?503:200).json({ok:mailResult?.ok!==false,mail:mailResult});
  }catch{return res.status(503).json({ok:false});}
};
module.exports.shiftReport=shiftReport;
