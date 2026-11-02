'use strict';
const crypto = require('node:crypto');
const idle = require('../telegram-club-menu-idle');
const {restoreRoot} = require('../telegram-club-commands');
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control','no-store');
  if (!['GET','POST'].includes(req.method)) return res.status(405).json({ok:false});
  const expected = process.env.CRON_SECRET || '';
  const supplied = String(req.headers?.['x-cron-secret'] || String(req.headers?.authorization || '').replace(/^Bearer\s+/i,''));
  if (!expected || Buffer.byteLength(expected) !== Buffer.byteLength(supplied) || !crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(supplied))) return res.status(403).json({ok:false});
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
  if (!token) return res.status(503).json({ok:false});
  let body = req.body || {};
  try { if (typeof body === 'string' || Buffer.isBuffer(body)) body = JSON.parse(String(body)); }
  catch (_) { return res.status(400).json({ok:false}); }
  try {
    const edit = message => restoreRoot(message, token);
    const [result,expiry] = await Promise.all([
      (body?.id ? idle.restore(String(body.id),body.revision,edit).then(restored=>({restored:Number(restored),failed:0})) : idle.sweep(edit)).catch(()=>({restored:0,failed:1})),
      body?.id ? Promise.resolve({deleted:0,failed:0}) : require('../game-challenge-expiry').sweep({commands:require('../board-games-service').commands,token}).catch(()=>({deleted:0,failed:1}))
    ]);
    return res.status(result.failed || expiry.failed ? 503 : 200).json({ok:!result.failed&&!expiry.failed,...result,challengeMessages:expiry});
  } catch (_) { return res.status(503).json({ok:false}); }
};
