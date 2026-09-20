"use strict";

const { pipeline } = require('./redis');
// Only an audited repair may add redirects. A shared nickname or Poker21 ID is
// never sufficient proof that two application accounts have the same owner.
const ACCOUNT_REDIRECTS_KEY = 'poker_app:account_redirects';
async function canonicalAccountId(value) {
  let id = String(value || '').trim();
  if (!/^ID\d{6}$/.test(id)) return id;
  const seen = new Set();
  for (let depth = 0; depth < 8; depth++) {
    if (seen.has(id)) throw new Error('account_redirect_cycle');
    seen.add(id);
    const rows = await pipeline([['HGET', ACCOUNT_REDIRECTS_KEY, id]], { throwOnError: true, context: 'account.canonical' });
    const next = rows[0].result;
    if (!next) return id;
    if (!/^ID\d{6}$/.test(next)) throw new Error('invalid_account_redirect');
    id = next;
  }
  throw new Error('account_redirect_depth');
}
module.exports = { ACCOUNT_REDIRECTS_KEY, canonicalAccountId };
