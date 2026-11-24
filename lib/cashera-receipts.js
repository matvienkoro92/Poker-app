'use strict';
const redis = require('./redis');
const {STORE_KEY} = require('./telegram-deposit-withdrawals');

async function reconcile(tx) {
  const time = Date.parse(tx.paid_at);
  const run = commands => redis.pipeline(commands, {throwOnError:true});
  const [row] = await run([['GET', 'poker_app:cashera:order:'+tx.uuid]]);
  if (!row.result) throw Error('Unknown order');
  const order = JSON.parse(row.result);
  if (tx.external_id !== order.orderId || tx.amount !== order.chargeAmount || tx.gross_amount !== order.chargeAmount) throw Error('Mismatching receipt');
  for (let attempt = 0; attempt < 8; attempt++) {
    const [ledger] = await run([['GET', STORE_KEY]]);
    const raw = ledger.result || '';
    const state = raw ? JSON.parse(raw) : {revision:0,entries:[],requests:[]};
    const payments = state.paymentFormPayments ||= [];
    if (payments.some(p => p.providerId === 'cashera' && p.id === tx.uuid)) return;
    const receipt = {providerId:'cashera',id:tx.uuid,orderId:order.orderId,status:'confirmed',amount:tx.amount,displayAmount:order.amount,confirmedAt:time,receivedAt:Date.now()};
    payments.push(receipt);
    state.revision = (state.revision || 0)+1;
    const [saved] = await run([require('./payment-notification-queue').saveCommand(STORE_KEY,raw,state,receipt)]);
    if (Number(saved.result) === 1) {
      await require('./cashera-notifications').deliver(tx.uuid);
      return;
    }
  }
  throw Error("Ledger busy");
}

module.exports = {reconcile};
