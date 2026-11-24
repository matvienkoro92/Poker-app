'use strict';

const tariffs = new Map([
  [100000, 107000],
  [150000, 160000],
  [200000, 213000],
  [300000, 319000]
]);

function configured() {
  return Boolean(process.env.CASHERA_API_KEY && process.env.CASHERA_API_SECRET &&
    process.env.CASHERA_CALLBACK_URL === 'https://consult-payment-notify.vercel.app/api/cashera-webhook');
}

async function createCheckout({ amount, orderId, callbackUrl = process.env.CASHERA_CALLBACK_URL }) {
  const chargeAmount = tariffs.get(amount);
  if (!chargeAmount || !orderId) throw Error('Invalid Cashera order');
  if (!configured() || callbackUrl !== process.env.CASHERA_CALLBACK_URL) {
    throw Error('Cashera checkout is not configured');
  }
  const response = await fetch('https://api.cashera.cash/api/v1/integration/transactions', {
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(8000),
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': process.env.CASHERA_API_KEY },
    body: JSON.stringify({
      external_id: orderId,
      amount: chargeAmount,
      currency: 'RUB',
      description: 'Пополнение игрового счёта на ' + amount / 100 + ' ₽',
      callback_url: callbackUrl
    })
  });
  if (!response.ok) throw Error('Cashera checkout failed: HTTP ' + response.status);
  const checkout = await response.json();
  if (checkout.external_id !== orderId || checkout.amount !== chargeAmount ||
      checkout.currency !== 'RUB' || !checkout.uuid || new URL(checkout.payment_url).protocol !== 'https:') {
    throw Error('Unexpected Cashera checkout');
  }
  const link = { transactionId: checkout.uuid, url: checkout.payment_url, amount, chargeAmount };
  const redis = require('./redis');
  const key = 'poker_app:cashera:order:' + checkout.uuid;
  const record = JSON.stringify({ orderId, amount, chargeAmount });
  const [saved] = await redis.pipeline([['SET', key, record, 'NX']], {throwOnError:true});
  if (saved.result !== 'OK') {
    const [prior] = await redis.pipeline([['GET', key]], {throwOnError:true});
    if (prior.result !== record) throw Error('Conflicting Cashera order');
  }
  return link;
}

module.exports = { createCheckout, configured, tariffs };
