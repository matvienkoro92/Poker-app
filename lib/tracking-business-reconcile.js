'use strict';
const { createHash } = require('node:crypto');
function businessEventId(accountId, type, operationId) {
  return 'evt_business_' + createHash('sha256').update(JSON.stringify([accountId, type, operationId])).digest('hex');
}
// Historical attribution uses only a source demonstrably observed before the operation.
function sourceAt(contexts, events, at, ownRefs) {
  const touches = contexts.flatMap(c => c ? [c.first, c.last] : []).concat(
    events.filter(e => e.type === 'referral_opened').map(e => ({ ref: e.ref, at: e.at }))
  ).filter(t => t && ownRefs.has(t.ref) && Number(t.at) <= at);
  touches.sort((a, b) => Number(b.at) - Number(a.at));
  if (!touches.length) return null;
  const refs = new Set(touches.filter(t => Number(t.at) === Number(touches[0].at)).map(t => t.ref));
  return refs.size === 1 ? touches[0].ref : null;
}
function missingEvents(accountId, contexts, events, receipts, ownRefs) {
  const missing = [], seen = new Set(events.map(e => e.id));
  const spinOperations = new Set(events.filter(e => e.type === 'daily_poker_spin' && e.entity).map(e => e.entity));
  const raffles = new Set(events.filter(e => e.type === 'raffle_joined').map(e => e.entity || e.section));
  for (const receipt of receipts) {
    const { type, operationId, at, section = '' } = receipt;
    if (!operationId || !Number.isFinite(at)) continue;
    const id = businessEventId(accountId, type, operationId);
    const legacy = 'evt_daily_' + String(operationId).replace(/[^a-zA-Z0-9_-]/g, '_');
    if (seen.has(id) || (type === 'daily_poker_spin' && (seen.has(legacy) || spinOperations.has(String(operationId)))) || (type === 'raffle_joined' && raffles.has(section))) continue;
    const ref = sourceAt(contexts, events, at, ownRefs);
    if (!ref) continue; // Never invent activity before the first proven source.
    const event = { id, at, type, authenticated: true, serverConfirmed: true, reconciled: true, section,
      entity: String(operationId).slice(0, 128), ref };
    missing.push({ event, proof: receipt.proof }); seen.add(id);
    if (type === 'raffle_joined') raffles.add(section);
  }
  return missing;
}
module.exports = { businessEventId, sourceAt, missingEvents };
