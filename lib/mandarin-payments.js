'use strict';
const {randomUUID} = require('node:crypto');
const redis = require('./redis');
const {STORE_KEY} = require('./telegram-deposit-withdrawals');
const {guardedFetch} = require('./telegram-group-policy');
const queue = require('./payment-notification-queue');
async function mutate(id, update) {
  for (let i=0;i<8;i++) {
    const [row] = await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const raw = row.result || '', state = raw ? JSON.parse(raw) : {revision:0,entries:[],requests:[]};
    if (!update(state)) return false;
    state.revision = (state.revision || 0) + 1;
    const [saved] = await redis.pipeline([queue.saveCommand(STORE_KEY,raw,state,state.paymentFormPayments.find(p => p.providerId === 'mandarin' && p.id === id))],{throwOnError:true});
    if (Number(saved.result) === 1) return true;
  }
  throw Error('Concurrent ledger update');
}
async function savePayment(payment) {
  return mutate(payment.id, state => {
    const payments = state.paymentFormPayments ||= [];
    const old = payments.find(p => p.providerId === 'mandarin' && p.id === payment.id);
    if (old) { if (old.amount !== payment.amount) throw Error('Conflicting payment'); return false; }
    if (payments.length >= 20000) throw Error('Payment limit');
    payments.push(payment);
    return true;
  });
}
async function deliver(payment) {
  const lockKey = 'poker21:mandarin:notify:' + payment.id, nonce = randomUUID();
  const [claim] = await redis.pipeline([['SET',lockKey,nonce,'NX','EX',60]],{throwOnError:true});
  if (claim.result !== 'OK') return;
  try {
    const [row] = await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const current = JSON.parse(row.result || '{}').paymentFormPayments?.find(p => p.providerId === 'mandarin' && p.id === payment.id);
    if (!current) return;
    const mark = field => mutate(current.id, state => {
      const p = state.paymentFormPayments?.find(p => p.providerId === 'mandarin' && p.id === current.id);
      if (!p || p[field]) return false;
      p[field] = Date.now(); return true;
    });
    if (!current.incomeNotifiedAt) {
      try { if (await require('./payment-income-topic').notify(current)) await queue.acknowledge(()=>mark('incomeNotifiedAt')); }
      catch { console.error('Mandarin income topic pending retry'); }
    }
    if (!current.notifiedAt) {
      const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
      const chatId = process.env.MANDARIN_WITHDRAWALS_CHAT_ID || process.env.PRODAMUS_WITHDRAWALS_CHAT_ID || '';
      if (!token || !/^-\d+$/.test(chatId)) throw Error('Notifications not configured');
      const money = new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:2}).format(require('./deposit-payment-forms').providerDisplayAmount('mandarin',current.amount)/100);
      const response = await guardedFetch('https://api.telegram.org/bot' + token + '/sendMessage', {
        method:'POST', headers:{'Content-Type':'application/json'}, signal:AbortSignal.timeout(5000),
        body:JSON.stringify({chat_id:chatId,text:'💳 <b>Мандарин</b> - ' + money + '\n№' + current.id,parse_mode:'HTML',link_preview_options:{is_disabled:true}})
      },'mandarin-payment');
      if (!response.ok || !(await response.json()).ok) throw Error('Telegram delivery failed');
      await queue.acknowledge(()=>mark('notifiedAt'));
    }
  } finally {
    await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,lockKey,nonce]],{throwOnError:true});
  }
}
async function retryPending() {
  const ids = await queue.takeDue(redis, STORE_KEY, 'mandarin', Date.now());
  let failed = 0;
  for (const id of ids) {
    try { await deliver({id}); } catch { failed++; }
  }
  if (failed) throw Error('Mandarin notifications pending');
}
module.exports = {savePayment,deliver,retryPending};
