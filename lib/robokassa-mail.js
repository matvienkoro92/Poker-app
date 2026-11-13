'use strict';

const redis = require('./redis');
const payments = require('./robokassa-payments');
const {createHash} = require('node:crypto');

function configured(env = process.env) {
  return Boolean(env.ROBOKASSA_MAIL_USER && env.ROBOKASSA_MAIL_PASSWORD &&
    Number.isFinite(Date.parse(env.ROBOKASSA_MAIL_SINCE || '')));
}

// MIME parsing and DKIM verification receive the original, unmodified bytes.
async function parsePayment(source, receivedAt, deps = {}) {
  if (!source || source.length > 262144) return null;
  const parse = deps.parse || require('mailparser').simpleParser;
  const verify = deps.verify || require('mailauth/lib/dkim/verify').dkimVerify;
  const mail = await parse(source, {skipHtmlToText:false, skipTextToHtml:true});
  if (['from','subject'].some(name => mail.headerLines?.filter(row => row.key === name).length !== 1)) return null;
  const senders = mail.from?.value || [];
  if (senders.length !== 1 || senders[0].address?.toLowerCase() !== 'robot@robokassa.ru' ||
      mail.subject?.trim() !== 'Notification from ROBOKASSA') return null;
  const auth = await verify(source);
  const trusted = auth.results?.some(row => row.signingDomain === 'robokassa.ru' &&
    row.status?.result === 'pass' && !row.status.testing && !row.canonBodyLengthLimited &&
    ['from','subject'].every(name => String(row.signingHeaders?.keys || '').toLowerCase().split(/\s*:\s*/).includes(name)));
  if (!trusted) {
    if (auth.results?.some(row => row.status?.result === 'temperror')) throw Error('Mail signature temporarily unavailable');
    return null;
  }
  const text = mail.text || '';
  if (!/Получена оплата\s*:/u.test(text)) return null;
  const sums = [...text.matchAll(/Цена\s*:\s*(\d{1,10}\.\d{2})(?![\d.])/gu)];
  const ids = [...text.matchAll(/inv_id\s*:\s*(\d{1,19})(?!\d)/giu)];
  if (sums.length !== 1 || ids.length !== 1) return null;
  const [rub, cents] = sums[0][1].split('.');
  const amount = Number(rub) * 100 + Number(cents);
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 10000000000 ||
      !Number.isFinite(receivedAt)) return null;
  return {id:BigInt(ids[0][1]).toString(), providerId:'robokassa', status:'confirmed',
    amount, confirmedAt:receivedAt, receivedAt:Date.now(), source:'email'};
}

async function poll(env = process.env) {
  if (!configured(env)) return {skipped:true};
  const account = createHash('sha256').update(env.ROBOKASSA_MAIL_USER.toLowerCase()).digest('hex').slice(0,24);
  const prefix = 'poker21:robokassa:mail:' + account;
  const [claim] = await redis.pipeline([['SET',prefix+':lock','1','NX','PX',55000]], {throwOnError:true});
  if (claim.result !== 'OK') return {busy:true};
  const {ImapFlow} = require('imapflow');
  const client = new ImapFlow({host:'imap.yandex.ru', port:993, secure:true,
    auth:{user:env.ROBOKASSA_MAIL_USER, pass:env.ROBOKASSA_MAIL_PASSWORD},
    logger:false, disableAutoIdle:true, connectionTimeout:8000, greetingTimeout:8000, socketTimeout:10000});
  client.on('error', () => {});
  const deadline = setTimeout(() => client.close(), 40000);
  let imported = 0, rejected = 0;
  try {
    await client.connect();
    await client.mailboxOpen('INBOX', {readOnly:true});
    const cursorKey = prefix + ':uid:' + String(client.mailbox.uidValidity);
    const [cursorRow] = await redis.pipeline([['GET',cursorKey]], {throwOnError:true});
    const cursor = Number(cursorRow.result || 0);
    const since = Date.parse(env.ROBOKASSA_MAIL_SINCE);
    const uids = await client.search({from:'robot@robokassa.ru', subject:'Notification from ROBOKASSA', since:new Date(since)}, {uid:true});
    for (const uid of uids.filter(uid => uid > cursor).sort((a,b) => a-b).slice(0,5)) {
      const meta = await client.fetchOne(uid, {size:true, internalDate:true}, {uid:true});
      if (!meta) throw Error('Mail disappeared during scan');
      const received = new Date(meta.internalDate).getTime();
      let payment = null;
      if (received >= since && meta.size <= 262144) {
        const message = await client.fetchOne(uid, {source:true}, {uid:true});
        if (!message?.source) throw Error('Mail source unavailable');
        payment = await parsePayment(message.source, received);
      }
      if (payment) {await payments.savePayment(payment); imported++;}
      else rejected++;
      // Save first, advance second. A crash replays safely through invoice deduplication.
      await redis.pipeline([['SET',cursorKey,String(uid)]], {throwOnError:true});
    }
    return {imported,rejected};
  } finally {
    clearTimeout(deadline);
    client.close();
  }
}

module.exports = {configured, parsePayment, poll};
