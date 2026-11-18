'use strict';
const redis = require('../redis');
const {savePayment} = require('../mandarin-payments');
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function cents(value) {
  if (typeof value !== 'string' || !/^\d{1,9}(?:\.\d{1,2})?$/.test(value)) throw Error('Invalid amount');
  const [rub, fraction = ''] = value.split('.');
  return Number(rub) * 100 + Number(fraction.padEnd(2, '0'));
}
function verifiedPayment(invoice, id, now = Date.now(), expectedAmount) {
  if (!invoice || invoice.invoice_id?.toLowerCase() !== id || invoice.currency !== 'RUB' || invoice.isTest === true || invoice.is_test === true) throw Error('Invalid invoice');
  if (invoice.invoice_status !== 'paid') return null;
  const amount = cents(invoice.amount);
  if (!(expectedAmount === undefined ? require('../mandarin-payment-links').some(link => link.chargeAmount === amount) : amount === expectedAmount) || cents(invoice.total_paid) !== amount || cents(invoice.remaining_amount) !== 0) throw Error('Payment requires review');
  const parts = Array.isArray(invoice.payment_breakdown) ? invoice.payment_breakdown.filter(p => p.status === 'success') : [];
  if (!parts.length || parts.some(p => !['card','card2','sbp'].includes(p.method))) throw Error('Unsupported payment');
  const times = parts.map(p => {
    if (typeof p.timestamp !== 'string' || !/(?:Z|[+-]\d{2}:\d{2})$/.test(p.timestamp)) throw Error('Invalid time');
    return Date.parse(p.timestamp);
  });
  if (parts.reduce((sum, p) => sum + cents(p.amount), 0) !== amount || times.some(t => !Number.isFinite(t) || t <= 0 || t > now + 300000)) throw Error('Invalid payment');
  return {id, providerId:'mandarin', status:'confirmed', amount, confirmedAt:Math.max(...times), receivedAt:now};
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const configs = require('../mandarin-api-config').configuredLinks(process.env);
  if (!configs.length || !redis.isConfigured()) return res.status(503).json({ok:false, error:'not_configured'});
  let payload;
  try {
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw Error();
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) payload = req.body;
    else {
      let raw = req.body;
      if (raw === undefined) {
        const chunks = []; let size = 0;
        for await (const chunk of req) { size += Buffer.byteLength(chunk); if (size > 65536) throw Error(); chunks.push(Buffer.from(chunk)); }
        raw = Buffer.concat(chunks);
      }
      if (Buffer.byteLength(raw) > 65536) throw Error();
      payload = JSON.parse(String(raw));
    }
    if (!payload || !UUID.test(payload.invoice_id) || JSON.stringify(payload).length > 65536) throw Error();
  } catch { return res.status(400).end(); }
  const id = payload.invoice_id.toLowerCase();
  // The callback is only a trigger. Never trust its amount, status or timestamp.
  // Authoritative data must be accessible using our link-scoped production key.
  try {
    // Check configured link-scoped keys in parallel, bounded by one timeout.
    // The incoming callback cannot choose a credential or an expected amount.
    const results = await Promise.allSettled(configs.map(async ({link,key}) => {
      const response = await fetch('https://secure-app.mandarin.io/api/v1/public/invoices/' + id + '/check-state/', {
        headers:{'X-Api-Key':key}, redirect:'error', signal:AbortSignal.timeout(5000)
      });
      if ([401,403,404].includes(response.status)) return {status:403};
      if (!response.ok) throw Error('Provider unavailable');
      try { return {status:200, payment:verifiedPayment(await response.json(), id, Date.now(), link.chargeAmount)}; }
      catch { return {status:422}; }
    }));
    const valid = results.filter(r => r.status === 'fulfilled' && r.value.status === 200).map(r => r.value);
    if (!valid.length) return res.status(results.some(r=>r.status==='rejected') ? 503 : results.some(r=>r.value.status===422) ? 422 : 403).end();
    const payments = valid.map(r=>r.payment).filter(Boolean);
    if (payments.some(p=>p.amount!==payments[0].amount || p.confirmedAt!==payments[0].confirmedAt)) return res.status(422).end();
    if (payments.length) await savePayment(payments[0]);
    // Telegram delivery is retried by cron, independently of provider delivery.
    return res.status(200).json({ok:true});
  } catch { return res.status(503).end(); }
};
module.exports.verifiedPayment = verifiedPayment;
