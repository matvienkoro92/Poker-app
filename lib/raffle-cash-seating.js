'use strict';
const KEY = 'poker_app:raffle_cash_last_seen';
function observations(tables, now = Date.now()) {
  const {createClassifier} = require('./live-table-classification');
  const classify = createClassifier();
  const ids = new Set();
  for (const table of tables || []) {
    if (String(table.leagueId) !== '184691' || classify(table).category !== 'cash') continue;
    for (const id of Object.values(table.pos || {})) {
      const value = String(id).trim();
      if (/^\d+$/.test(value) && !/^0+$/.test(value)) ids.add(value);
    }
  }
  return ids.size ? [['HSET', KEY, ...[...ids].flatMap(id => [id, String(now)])]] : [];
}
function confirmed(winner, seen) {
  const issued = Date.parse(winner.winnerStatusAt || '');
  return winner.winnerStatus === 'ok' && Number.isFinite(issued) && Number(seen) >= issued;
}
module.exports = {KEY, observations, confirmed};

const PENDING_KEY = 'poker_app:raffle_cash_seating_pending:v1';
const WINDOW_MS = 10 * 60 * 1000;
function decision(winner, tables, now = Date.now()) {
  const monitor = winner.cashSeatingMonitor;
  if (!monitor || monitor.status === 'returned' || monitor.status === 'seated' || winner.winnerStatus !== 'ok') return 'done';
  if (monitor.status === 'returning') return 'return';
  if (winner.winnerSeatStatus === 'seated') return 'seated';
  const seated = observations(tables, now).flatMap(command => command.slice(2).filter((_, i) => i % 2 === 0));
  if (seated.includes(String(monitor.userId))) return 'seated';
  // Without complete seat data absence is unknown; never debit on an API outage.
  if (!Array.isArray(tables) || tables.some(t => String(t.leagueId) === '184691' && Number(t.playerCount) > 0 && (!t.pos || Object.values(t.pos).filter(id => /^\d+$/.test(String(id)) && !/^0+$/.test(String(id))).length < Number(t.playerCount)))) return 'wait';
  return now >= Date.parse(monitor.issuedAt) + WINDOW_MS ? 'return' : 'wait';
}
module.exports = {...module.exports, PENDING_KEY, WINDOW_MS, decision};
