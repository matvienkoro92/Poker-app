'use strict';
const {timingSafeEqual} = require('node:crypto');

module.exports = async function casheraWebhook(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.CASHERA_API_KEY || !process.env.CASHERA_API_SECRET) return res.status(503).end();
  const stamp=req.headers['x-cashera-relay-time'];
  if (!/^\d{13}$/.test(stamp||'') || Math.abs(Date.now()-Number(stamp))>300000) return res.status(401).end();
  let event = req.body;
  try {
    if (event === undefined) {
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > 65536) return res.status(413).end();
        chunks.push(Buffer.from(chunk));
      }
      event = Buffer.concat(chunks);
    }
    if (typeof event === 'string' || Buffer.isBuffer(event)) event = JSON.parse(String(event));
    const signature = require('node:crypto').createHmac('sha256',JSON.stringify([process.env.CASHERA_API_KEY,process.env.CASHERA_API_SECRET]))
      .update(stamp+'\n'+JSON.stringify(event)).digest();
    const supplied=req.headers['x-cashera-relay-proof'];
    if (!/^[a-f0-9]{64}$/.test(supplied||'') || !timingSafeEqual(signature,Buffer.from(supplied,'hex'))) return res.status(401).end();
  } catch { return res.status(400).end(); }
  if (event?.event !== 'transaction.status_updated' || event.transaction?.status !== 'paid') return res.status(200).end();
  const tx = event.transaction;
  const time = Date.parse(tx.paid_at);
  if (tx.type !== 'deposit' || tx.currency !== 'RUB' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(tx.uuid) ||
      !Number.isFinite(time) || time <= 0 || time > Date.now()+300000) return res.status(422).end();

  if (!/^player_deposit3?_[1-9]\d*_\d+$/.test(tx.external_id) || ![107000,160000,213000,319000].includes(tx.amount) || tx.amount !== tx.gross_amount) return res.status(422).end();
  try {
    await require('../cashera-receipts').reconcile(tx);
    return res.status(200).end();
  } catch { return res.status(503).end(); }
};
