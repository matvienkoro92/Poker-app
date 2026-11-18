'use strict';
const redis = require('../redis');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'GET') return res.status(405).end();
  if (!process.env.CRON_SECRET || req.headers.authorization !== 'Bearer ' + process.env.CRON_SECRET) return res.status(403).end();
  if (!require('../mandarin-api-config').configuredLinks(process.env).length) return res.status(200).json({ok:true,skipped:true});
  if (!redis.isConfigured()) return res.status(503).end();
  try { await require('../mandarin-payments').retryPending(); return res.status(200).json({ok:true}); }
  catch { return res.status(503).json({ok:false}); }
};
