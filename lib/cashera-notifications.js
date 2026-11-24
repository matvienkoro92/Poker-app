'use strict';
const {randomUUID} = require('node:crypto');
const redis = require('./redis');
const queue = require('./payment-notification-queue');
const {STORE_KEY} = require('./telegram-deposit-withdrawals');
const {guardedFetch} = require('./telegram-group-policy');

const run = commands => redis.pipeline(commands, {throwOnError:true});
async function deliver(id) {
  const key = 'poker_app:cashera:notify:'+id, nonce = randomUUID();
  const [claim] = await run([['SET',key,nonce,'NX','EX',90]]);
  if (claim.result !== 'OK') return;
  try {
    const [row] = await run([['GET',STORE_KEY]]);
    const payment = JSON.parse(row.result || '{}').paymentFormPayments?.find(p => p.providerId === 'cashera' && p.id === id && p.status === 'confirmed');
    if (!payment) return;
    const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
    const money = n => (n/100).toLocaleString('ru-RU')+' ₽';
    async function send(body, scope) {
      if (!token) throw Error('Missing Telegram token');
      const response = await guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)},scope);
      if (!response.ok || !(await response.json()).ok) throw Error('Telegram delivery failed');
    }
    const tasks = {
      dialogNotifiedAt: async () => {
        const player = /^player_deposit3?_([1-9]\d*)_\d+$/.exec(payment.orderId)?.[1];
        const cfg = await require('./telegram-support-config').config();
        if (!player || !cfg?.enabled) throw Error('Player dialog unavailable');
        const prefix = require('./telegram-support').PREFIX;
        const [record] = await run([['GET',prefix+'client:'+cfg.chatId+':'+player]]);
        const client = JSON.parse(record.result || 'null');
        if (!Number.isSafeInteger(client?.threadId) || String(client.id)!==player) throw Error('Player topic unavailable');
        const [mapping] = await run([['GET',prefix+'topic:'+cfg.chatId+':'+client.threadId]]);
        if (String(mapping.result)!==player) throw Error('Player topic changed');
        await send({chat_id:cfg.chatId,message_thread_id:client.threadId,text:'✅ Cashera подтвердила оплату '+money(payment.amount)+'. К зачислению '+money(payment.displayAmount)+'.\n№'+id},'support-dialog');
      },
      incomeNotifiedAt: async () => {
        if (!await require('./payment-income-topic').notify(payment)) throw Error('Income topic unavailable');
      },
      notifiedAt: () => send({chat_id:process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID || process.env.PRODAMUS_WITHDRAWALS_CHAT_ID,text:'💳 Cashera - '+money(payment.displayAmount)+'\n№'+id},'cashera-payment')
    };
    for (const [field, task] of Object.entries(tasks)) {
      if (payment[field]) continue;
      try {
        await task();
        await queue.acknowledge(async () => {
          for (let attempt=0;attempt<8;attempt++) {
            const [latest] = await run([['GET',STORE_KEY]]);
            const state = JSON.parse(latest.result);
            const current = state.paymentFormPayments.find(p => p.providerId==='cashera' && p.id===id);
            if (current[field]) return;
            current[field] = Date.now();
            state.revision = (state.revision || 0)+1;
            const [saved] = await run([queue.saveCommand(STORE_KEY,latest.result,state,current)]);
            if (Number(saved.result)===1) return;
          }
          throw Error('Ledger busy');
        });
      } catch { console.error('Cashera notification pending',field); }
    }
  } finally {
    await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,key,nonce]]);
  }
}
async function retryPending() {
  for (const id of await queue.takeDue(redis,STORE_KEY,'cashera')) await deliver(id);
}
module.exports = {deliver,retryPending};
