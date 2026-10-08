'use strict';
let cached = new Map();
let expiresAt = 0;
let pending;
async function getNicknames() {
  if (Date.now() < expiresAt) return cached;
  if (pending) return pending;
  pending = (async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/matvienkoro92/poker21/main/data/union-directory.json', {signal: AbortSignal.timeout(5000)});
      if (!response.ok) throw new Error('Nickname directory unavailable');
      const data = await response.json();
      if (!Array.isArray(data.players)) throw new Error('Invalid nickname directory');
      cached = new Map(data.players.filter(p => p.id != null && p.nick).map(p => [String(p.id), String(p.nick).trim()]));
      expiresAt = Date.now() + 300000;
    } catch (_) { expiresAt = Date.now() + 30000; }
    return cached;
  })();
  try { return await pending; } finally { pending = null; }
}
module.exports = {getNicknames};
