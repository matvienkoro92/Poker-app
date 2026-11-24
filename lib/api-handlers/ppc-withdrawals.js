'use strict';
const { createHash, timingSafeEqual } = require('node:crypto');
const redis = require('../redis');
const { STORE_KEY, allFriendsWithdrawalPages } = require('../telegram-deposit-withdrawals');
const digest = value => createHash('sha256').update(value).digest();

module.exports = async function ppcWithdrawals(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  const key = process.env.PPC_WITHDRAWALS_REPORT_KEY;
  if (req.method !== 'POST' || !key || !timingSafeEqual(digest('Bearer ' + key), digest(String(req.headers.authorization || '')))) {
    return res.status(403).end();
  }
  try {
    const [row] = await redis.pipeline([['GET', STORE_KEY]], { throwOnError: true, context: 'ppc-withdrawals' });
    if (!row || row.error) throw Error('Ledger unavailable');
    const state = row.result == null ? { entries: [] } : JSON.parse(row.result);
    return res.status(200).json({ pages: allFriendsWithdrawalPages(state) });
  } catch {
    return res.status(503).end();
  }
};
