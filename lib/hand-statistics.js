/* Pure calculations for a verified, completed NLH hand projection.
 * This module never accepts administrative Win columns or infers currency.
 * See docs/hand-statistics.md for the input contract. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PokerHandStatistics = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const ranks = 'AKQJT98765432';
  const modes = ['cash', 'mtt', 'sng'];
  function handClass(cards) {
    if (!Array.isArray(cards) || cards.length !== 2 || cards[0] === cards[1]) return null;
    if (!cards.every(c => typeof c === 'string' && /^[AKQJT2-9][cdhs]$/.test(c))) return null;
    const sorted = cards.slice().sort((a, b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]));
    return sorted[0][0] === sorted[1][0] ? sorted[0][0] + sorted[1][0]
      : sorted[0][0] + sorted[1][0] + (sorted[0][1] === sorted[1][1] ? 's' : 'o');
  }
  function matrix() {
    return Array.from(ranks, (a, i) => Array.from(ranks, (b, j) =>
      i === j ? a + b : i < j ? a + b + 's' : b + a + 'o'));
  }
  function validDate(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)
      && Number.isFinite(Date.parse(value))
      && new Date(value).toISOString().slice(0, 19) === value.slice(0, 19);
  }
  function aggregate(rows, options) {
    const o = options || {};
    if (!o.playerId || typeof o.playerId !== 'string' || !modes.includes(o.mode)) throw new Error('Player and mode required');
    if (!Array.isArray(rows)) throw new Error('Expected hand rows');
    if (o.cashUnit != null && !['RUB','TABLE_CHIP'].includes(o.cashUnit)) throw new Error('Invalid cash unit');
    const expectedUnit = o.mode === 'cash' ? (o.cashUnit || 'RUB') : 'CHIP';
    const from = o.from == null ? -Infinity : validDate(o.from) ? Date.parse(o.from) : NaN;
    const to = o.to == null ? Infinity : validDate(o.to) ? Date.parse(o.to) : NaN;
    if (Number.isNaN(from) || Number.isNaN(to) || from >= to) throw new Error('Invalid period');
    const groups = new Map(), excluded = {}, seen = new Map(), conflicts = new Set();
    let duplicates = 0;
    const skip = reason => { excluded[reason] = (excluded[reason] || 0) + 1; };
    rows.forEach(row => {
      if (!row || row.playerId !== o.playerId || row.mode !== o.mode) return;
      if (!validDate(row.playedAt)) { skip('date'); return; }
      const time = Date.parse(row.playedAt);
      if (time < from || time >= to) return;
      if (row.game !== 'NLH') { skip('format'); return; }
      if (row.status !== 'completed' || row.verified !== true) { skip('unverified'); return; }
      if (row.unit !== expectedUnit || row.scale !== 100 || row.netDefinition !== 'game-net-v1') { skip('units'); return; }
      if (!Number.isSafeInteger(row.resultMinor) || !Number.isSafeInteger(row.bigBlindMinor) || row.bigBlindMinor <= 0) { skip('amount'); return; }
      const label = handClass(row.cards);
      if (!label) { skip('cards'); return; }
      if (![row.source, row.sessionId, row.handId].every(v => typeof v === 'string' && v.trim())) { skip('identity'); return; }
      const key = JSON.stringify([row.source, row.mode, row.sessionId, row.handId, row.playerId]);
      const fingerprint = JSON.stringify([row.playedAt, row.cards.slice().sort(), row.resultMinor, row.bigBlindMinor]);
      if (seen.has(key)) {
        if (seen.get(key).fingerprint === fingerprint) duplicates++;
        else conflicts.add(key);
        return;
      }
      seen.set(key, {row, label, fingerprint});
    });
    seen.forEach(({row, label}, key) => {
      if (conflicts.has(key)) return;
      if (!groups.has(label)) groups.set(label, {label, count: 0, resultMinor: 0, bb: 0, wins: 0, losses: 0, even: 0, hands: []});
      const g = groups.get(label);
      if (!Number.isSafeInteger(g.resultMinor + row.resultMinor)) throw new Error('Amount exceeds safe integer range');
      g.count++; g.resultMinor += row.resultMinor; g.bb += row.resultMinor / row.bigBlindMinor;
      g[row.resultMinor > 0 ? 'wins' : row.resultMinor < 0 ? 'losses' : 'even']++;
      // Only the allowed personal projection is exposed to the UI.
      g.hands.push({handId: row.handId, sessionId: row.sessionId, playedAt: row.playedAt,
        cards: row.cards.slice(), resultMinor: row.resultMinor, bb: row.resultMinor / row.bigBlindMinor});
    });
    if (conflicts.size) excluded.conflict = conflicts.size;
    const cells = matrix().flat().map(label => {
      const g = groups.get(label);
      return g ? {...g, bb100: g.bb * 100 / g.count, smallSample: g.count < 100,
        hands: g.hands.sort((a, b) => b.playedAt.localeCompare(a.playedAt))}
        : {label, count: 0, resultMinor: null, bb: null, bb100: null, smallSample: false, wins: 0, losses: 0, even: 0, hands: []};
    });
    const count = cells.reduce((n, c) => n + c.count, 0);
    const resultMinor = cells.reduce((n, c) => {
      const next = n + (c.resultMinor || 0);
      if (!Number.isSafeInteger(next)) throw new Error('Amount exceeds safe integer range');
      return next;
    }, 0);
    const bb = cells.reduce((n, c) => n + (c.bb || 0), 0);
    return {mode: o.mode, unit: expectedUnit, scale: 100, count, resultMinor: count ? resultMinor : null,
      bb: count ? bb : null, bb100: count ? bb * 100 / count : null, cells, excluded, duplicates};
  }
  return {handClass, matrix, aggregate};
});
