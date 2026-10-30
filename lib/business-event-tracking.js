'use strict';

const { businessEventId } = require('./tracking-business-reconcile');
const { pipeline } = require('./redis');
const { mskDateKeyFromMs } = require('./player-crm-utils');
const { safeId } = require('./analytics-tracking');
const P = 'poker_app:attribution:v1:';
const A = 'poker_app:analytics:v1:';
const BUSINESS_TYPES = new Set(['daily_poker_spin', 'raffle_joined']);

// Return writes for the caller's transaction: never send a separate best-effort event.
// Both identity and operation ID must come from the authenticated business handler.
async function businessEventWrites({ accountId, type, operationId, at, section = '', includeAnalytics = true }) {
  if (!safeId(accountId) || !BUSINESS_TYPES.has(type) || !operationId || !Number.isFinite(at)) {
    throw new Error('invalid_business_event');
  }
  const id = businessEventId(accountId, type, operationId);
  const day = mskDateKeyFromMs(at);
  const commands = includeAnalytics ? [
    ['SADD', A + 'days', day],
    ['HSETNX', A + 'events:day:' + day, id, JSON.stringify({
      e: id, i: 'server_' + accountId, a: accountId, s: '', t: type,
      n: String(section).slice(0, 64), q: '', o: 'server', d: '', x: at,
    })],
  ] : [];
  const rows = await pipeline([['HGET', P + 'contexts', accountId]], { context: 'tracking.business-source', throwOnError: true });
  if (!rows || !rows[0] || rows[0].error) throw new Error('business_tracking_unavailable');
  const raw = rows[0].result || '';
  const values = [{ key: P + 'contexts', field: accountId, value: raw }];
  const saved = raw ? JSON.parse(raw) : null;
  const context = await require('./tracking-own-source').ownContext(saved, [accountId]);
  // Keep the authenticated event even if the login/source request has not arrived
  // yet. A later account/source link can then recover it using the real event time.
  commands.push(['HSETNX', P + 'events:' + accountId, id, JSON.stringify({
    id, at, type, authenticated: true, serverConfirmed: true,
    section: String(section).slice(0, 64), entity: String(operationId).slice(0, 128),
    ref: context ? context.last.ref : null,
  })]);
  if (context) {
    commands.push(
      ['SADD', P + 'members:' + context.first.ref, accountId],
      ['SADD', P + 'members:' + context.last.ref, accountId],
      ['HSET', P + 'accounts', accountId, '1']
    );
  }
  return { commands, values };
}
module.exports = { BUSINESS_TYPES, businessEventWrites };
