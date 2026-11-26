'use strict';
const classifySeatingTable = require('./live-table-classification').createClassifier();
const KEY = 'poker_app:raffle_cash_last_seen';
function observations(tables, now = Date.now()) {
  const ids = new Set();
  for (const table of tables || []) {
    if (String(table.leagueId) !== '184691' || classifySeatingTable(table).category !== 'cash') continue;
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
  if (winner.winnerApiSeated === true || winner.winnerSeatStatus === 'seated') return 'seated';
  const seated = observations(tables, now).flatMap(command => command.slice(2).filter((_, i) => i % 2 === 0));
  if (seated.includes(String(monitor.userId))) return 'seated';
  if (monitor.status === 'returning') return 'return';
  // Without complete seat data absence is unknown; never debit on an API outage.
  const cashTables = (Array.isArray(tables) ? tables : []).filter(table =>
    String(table.leagueId) === '184691' && classifySeatingTable(table).category === 'cash');
  if (!cashTables.length || cashTables.some(table => {
    const occupied = Object.values(table.pos || {}).filter(id => /^\d+$/.test(String(id)) && !/^0+$/.test(String(id)));
    return occupied.length < Number(table.playerCount);
  })) return 'wait';
  return now >= Date.parse(monitor.issuedAt) + WINDOW_MS ? 'return' : 'wait';
}
module.exports = {...module.exports, PENDING_KEY, WINDOW_MS, decision};

function needsFollowup(winner, now = Date.now()) {
  if (['pending','returning'].includes(winner.cashSeatingMonitor?.status)) return true;
  if (winner.cashSeatingMonitor || ['ok','fail'].includes(winner.winnerStatus) || winner.winnerReadyExpired || winner.winnerBurned) return false;
  if (['missed','burned'].includes(winner.winnerReadyState)) return false;
  return winner.winnerReadyState === 'ready' || !!winner.winnerReadyAt || Date.parse(winner.winnerReadyDeadlineAt || '') > now;
}
module.exports.needsFollowup = needsFollowup;
