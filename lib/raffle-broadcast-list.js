'use strict';

// Read the authoritative IDs, not the potentially incomplete active index.
// This endpoint needs prize metadata only, never participant hydration or settlement.
async function loadBroadcastRaffles(pipeline, now = Date.now()) {
  const result = await pipeline([['LLEN', 'poker_app:raffle_ids']], {context:'raffles.broadcast.count', timeoutMs:6500});
  const count = Number(result?.[0]?.result);
  if (!Array.isArray(result) || result[0]?.error || result[0]?.result == null || !Number.isSafeInteger(count) || count < 0 || count > 20000) throw Error('Не удалось проверить полный список розыгрышей');
  const seen = new Set(), active = [];
  for (let offset = 0; offset < count; offset += 100) {
    const page = await pipeline([['LRANGE', 'poker_app:raffle_ids', String(offset), String(Math.min(count - 1, offset + 99))]], {context:'raffles.broadcast.ids', timeoutMs:6500});
    const ids = page?.[0]?.result;
    if (!Array.isArray(ids) || ids.length !== Math.min(100, count-offset)) throw Error('Список розыгрышей изменился. Повторите попытку');
    const unique = ids.filter(id => {if (seen.has(id)) return false; seen.add(id); return true;});
    const rows = unique.length ? await pipeline(unique.map(id => ['GET', 'poker_app:raffle:' + id]), {context:'raffles.broadcast.rows', timeoutMs:6500}) : [];
    if (!Array.isArray(rows) || rows.length !== unique.length) throw Error('Не удалось прочитать розыгрыши');
    for (let i=0; i<rows.length; i++) {
      if (rows[i]?.error || !rows[i]) throw Error('Не удалось прочитать розыгрыш');
      if (rows[i].result == null) continue; // Deleted IDs can remain in the index.
      const raffle = JSON.parse(rows[i].result);
      if (!raffle || raffle.status !== 'active') continue;
      const end = new Date(raffle.endDate).getTime();
      if (Number.isFinite(end) && end <= now) continue;
      const {participants, winners, ...metadata} = raffle;
      active.push({...metadata, id: String(unique[i])});
    }
  }
  return active;
}
module.exports = {loadBroadcastRaffles};
