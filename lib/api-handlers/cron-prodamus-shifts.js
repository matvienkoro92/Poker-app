'use strict';

const redis = require('../redis');
const {STORE_KEY} = require('../telegram-deposit-withdrawals');
const HOUR = 3600000;
const DAY = 24 * HOUR;
const rubles = new Intl.NumberFormat('ru-RU', {style:'currency', currency:'RUB'});
const date = new Intl.DateTimeFormat('ru-RU', {timeZone:'Europe/Moscow', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'});

function shiftReport(state, start, end, manager) {
  const payments = (state.paymentFormPayments || []).filter(row =>
    row.providerId === 'prodamus' && row.status === 'confirmed' && row.confirmedAt >= start && row.confirmedAt < end);
  const deposits = (state.channelOperations || []).filter(row =>
    row.channelId === 'prodamus' && row.direction === 'income' && !row.voidedAt && row.createdAt >= start && row.createdAt < end);
  const linked = new Map(deposits.filter(row => row.prodamusPaymentId).map(row => [row.prodamusPaymentId, row]));
  const sum = rows => rows.reduce((total, row) => total + row.amount, 0);
  const money = cents => rubles.format(cents / 100);
  const unassigned = payments.filter(row => !linked.has(row.id));
  const changed = payments.filter(row => linked.has(row.id) && linked.get(row.id).amount !== row.amount);
  const manual = deposits.filter(row => !row.prodamusPaymentId);
  return [
    'Продамус · смена '+manager+' · '+date.format(start)+' — '+date.format(end)+' МСК',
    'По уведомлениям: '+payments.length+' оплат на '+money(sum(payments)),
    'В депозитах: '+deposits.length+' записей на '+money(sum(deposits)),
    'Разница (уведомления минус депозиты): '+money(sum(payments)-sum(deposits)),
    'Без привязки к депозиту: '+unassigned.length+' на '+money(sum(unassigned)),
    'Ручные записи без номера платежа: '+manual.length+' на '+money(sum(manual)),
    'Привязанные записи с отличающейся суммой: '+changed.length,
    'Итог кабинета за смену требует отдельной сверки: https://matro.payform.ru/paylist/'
  ].join('\n');
}

module.exports = async function(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if(req.method !== 'GET') return res.status(405).json({ok:false});
  const secret = process.env.CRON_SECRET;
  if(!secret || req.headers.authorization !== 'Bearer '+secret) return res.status(403).json({ok:false});
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
  const chatId = process.env.PRODAMUS_WITHDRAWALS_CHAT_ID || '';
  if(!token || !/^-\d+$/.test(chatId) || !redis.isConfigured()) return res.status(503).json({ok:false});

  const now = Date.now();
  const hour = new Date(now).getUTCHours();
  if(hour !== 15 && hour !== 23) return res.status(200).json({ok:true, skipped:true});
  const end = Math.floor(now / HOUR) * HOUR;
  const isAnya = hour === 15;
  const key = 'poker21:prodamus:shift-report:'+end;
  try {
    const [ledger] = await redis.pipeline([['GET', STORE_KEY]], {throwOnError:true});
    const message = shiftReport(JSON.parse(ledger.result || '{}'), end - (isAnya ? 12 : 8) * HOUR, end, isAnya ? 'Ани' : 'Вики');
    const [claim] = await redis.pipeline([['SET', key, 'claimed', 'NX', 'PX', 7 * DAY]], {throwOnError:true});
    if(claim.result !== 'OK') return res.status(200).json({ok:true, duplicate:true});
    const response = await fetch('https://api.telegram.org/bot'+token+'/sendMessage', {
      method:'POST', headers:{'Content-Type':'application/json'}, signal:AbortSignal.timeout(8000),
      body:JSON.stringify({chat_id:chatId, text:message, link_preview_options:{is_disabled:true}})
    });
    const result = await response.json();
    if(!result.ok) {
      await redis.pipeline([['DEL', key]], {throwOnError:true});
      return res.status(503).json({ok:false});
    }
    return res.status(200).json({ok:true});
  } catch {
    return res.status(503).json({ok:false});
  }
};
