'use strict';
const PREFIX = 'poker_app:raffle_seating_penalties:v1:';
function identityKeys(accountId, poker21Id) {
  return [accountId && PREFIX + 'account:' + String(accountId).trim(), poker21Id && PREFIX + 'poker21:' + String(poker21Id).trim()].filter(Boolean);
}
async function penaltyCount(redis, accountId, poker21Id) {
  const keys = identityKeys(accountId, poker21Id);
  if (!keys.length) return 0;
  const rows = await redis([['SUNION', ...keys]], {throwOnError:true});
  if (!Array.isArray(rows?.[0]?.result)) throw new Error('Не удалось проверить штрафы розыгрышей');
  return new Set(rows[0].result).size;
}
async function recordPenalty(redis, winner) {
  const monitor = winner.cashSeatingMonitor;
  if (monitor?.status !== 'returned') return;
  const keys = identityKeys(winner.accountId || winner.account_id || winner.dtId || winner.userId, monitor.userId);
  if (!keys.length || !monitor.idempotencyKey) throw new Error('Missing penalty identity');
  const rows = await redis(keys.map(key => ['SADD', key, monitor.idempotencyKey]), {throwOnError:true});
  if (!rows || rows.some(row => row.error)) throw new Error('Penalty was not saved');
}
function requiredLevel(base, personal, count) {
  return Math.max(Number(base) || 0, Number(personal) || 0) + Math.max(0, Number(count) || 0);
}
module.exports = {identityKeys, penaltyCount, recordPenalty, requiredLevel};
